#!/usr/bin/env bash
# Exit codes: bin/EXIT-CODES.md (0 ok / 1 hard).
# F-001 / R-006: forbid unallowlisted *_insecure BLS calls.
#
# Production crypto uses sign / verify / sign_multisig / aggregate only.
# *_insecure is allowed only on allowlisted test/lab (or explicit live-tool /
# dual-scheme helper) paths, and each hit file must carry PreforkHostQuery
# (World B / PreFork host-query) or an F-001: rejection-test note in tests.
#
# Exact-path exception (no globs, no directory skip): a repo may list paths
# in .bls-insecure-allow at the git root. Each entry is `<path> <reason>`
# with a non-empty reason. A listed path may omit PreforkHostQuery / F-001:.
# The path must still match bls-insecure-allowlist.txt. Missing, empty, or
# comments-only file changes nothing. An entry without a reason BLOCKs.
# BLS_INSECURE_EXCEPTIONS overrides that file path (absolute; verification).
#
# Matches call sites only (`name(`) — doc comments naming the symbols are OK.
#
# Bash 3.2+ compatible (macOS /bin/bash).
set -uo pipefail

ROOT="$(git rev-parse --show-toplevel 2>/dev/null || true)"
if [[ -z "$ROOT" ]]; then
  echo "check-bls-insecure: not inside a git work tree" >&2
  exit 1
fi
cd "$ROOT"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ALLOWLIST="${BLS_INSECURE_ALLOWLIST:-$SCRIPT_DIR/bls-insecure-allowlist.txt}"
if [[ ! -f "$ALLOWLIST" ]]; then
  if [[ -n "${NOCTURNE_AGENT_KIT:-}" && -f "$NOCTURNE_AGENT_KIT/bin/bls-insecure-allowlist.txt" ]]; then
    ALLOWLIST="$NOCTURNE_AGENT_KIT/bin/bls-insecure-allowlist.txt"
  else
    echo "check-bls-insecure: allowlist missing at $ALLOWLIST" >&2
    echo "  copy bin/bls-insecure-allowlist.txt beside this script, or set BLS_INSECURE_ALLOWLIST" >&2
    exit 1
  fi
fi

if ! command -v python3 >/dev/null 2>&1; then
  echo "check-bls-insecure: python3 required" >&2
  exit 1
fi
if ! command -v rg >/dev/null 2>&1; then
  echo "check-bls-insecure: ripgrep (rg) required" >&2
  exit 1
fi

export BLS_INSECURE_ALLOWLIST_PATH="$ALLOWLIST"
if [[ -n "${BLS_INSECURE_EXCEPTIONS:-}" ]]; then
  export BLS_INSECURE_EXCEPTIONS_PATH="$BLS_INSECURE_EXCEPTIONS"
  export BLS_INSECURE_EXCEPTIONS_EXPLICIT=1
else
  export BLS_INSECURE_EXCEPTIONS_PATH="$ROOT/.bls-insecure-allow"
  export BLS_INSECURE_EXCEPTIONS_EXPLICIT=0
fi
python3 - <<'PY'
import os, re, subprocess, sys

ALLOWLIST = os.environ["BLS_INSECURE_ALLOWLIST_PATH"]
CALL_RE = re.compile(
    r"\b(sign_insecure|verify_insecure|sign_multisig_insecure|aggregate_insecure)\s*\("
)
COMMENT_RE = re.compile(r"^\s*//")


def glob_to_re(pat: str) -> re.Pattern:
    out = []
    i = 0
    while i < len(pat):
        if pat.startswith("**/", i):
            out.append("(?:.*/)?")
            i += 3
        elif pat.startswith("**", i):
            out.append(".*")
            i += 2
        elif pat[i] == "*":
            out.append("[^/]*")
            i += 1
        elif pat[i] == "?":
            out.append("[^/]")
            i += 1
        else:
            out.append(re.escape(pat[i]))
            i += 1
    return re.compile("^" + "".join(out) + "$")


patterns = []
with open(ALLOWLIST, encoding="utf-8") as f:
    for raw in f:
        line = raw.strip()
        if not line or line.startswith("#"):
            continue
        patterns.append(glob_to_re(line))


def path_allowed(path: str) -> bool:
    return any(p.match(path) for p in patterns)


def load_reasoned_exceptions():
    """Exact paths whose reason replaces PreforkHostQuery / F-001:.

    Missing, empty, or comments-only file grants nothing. A path without a
    reason, a glob, or a non-relative path is an error (fail closed).
    """
    path = os.environ["BLS_INSECURE_EXCEPTIONS_PATH"]
    explicit = os.environ.get("BLS_INSECURE_EXCEPTIONS_EXPLICIT") == "1"
    reasoned = set()
    errors = []
    if not os.path.isfile(path):
        if explicit:
            errors.append(f"BLOCKED: exception file missing at {path}")
        return reasoned, errors
    with open(path, encoding="utf-8") as f:
        for n, raw in enumerate(f, 1):
            line = raw.strip()
            if not line or line.startswith("#"):
                continue
            parts = line.split(None, 1)
            rel = parts[0]
            if rel.startswith("./"):
                rel = rel[2:]
            reason = parts[1].strip() if len(parts) == 2 else ""
            bad = None
            if not reason:
                bad = "path entry missing reason"
            elif rel.startswith("/") or ".." in rel.split("/"):
                bad = "path must be repo-relative"
            elif any(c in rel for c in "*?["):
                bad = "path must be exact, not a glob"
            if bad:
                errors.append(f"BLOCKED: .bls-insecure-allow:{n} — {bad}")
                continue
            reasoned.add(rel)
    return reasoned, errors


reasoned, exc_errors = load_reasoned_exceptions()


def file_justified(path: str) -> bool:
    if path in reasoned:
        return True
    try:
        text = open(path, encoding="utf-8", errors="replace").read()
    except OSError:
        return False
    if "PreforkHostQuery" in text:
        return True
    is_test = (
        path.endswith("_tests.rs")
        or path.endswith("/tests.rs")
        or "/tests/" in path
    )
    return is_test and "F-001:" in text


rg = subprocess.run(
    [
        "rg",
        "-n",
        "--glob",
        "*.rs",
        "--glob",
        "!.worktrees/**",
        # Claude Code worktrees nest inside the primary checkout too.
        "--glob",
        "!.claude/worktrees/**",
        "--glob",
        "!target/**",
        "--glob",
        "!vendor/**",
        "-e",
        r"\b(sign_insecure|verify_insecure|sign_multisig_insecure|aggregate_insecure)\s*\(",
        ".",
    ],
    capture_output=True,
    text=True,
)
# rg exits 1 when no matches
raw = rg.stdout or ""
hits = []
for line in raw.splitlines():
    if not line or ":" not in line:
        continue
    file, rest = line.split(":", 1)
    lineno, text = rest.split(":", 1)
    if COMMENT_RE.match(text):
        continue
    m = CALL_RE.search(text)
    if not m:
        continue
    file = file[2:] if file.startswith("./") else file
    hits.append((file, lineno, m.group(1)))

if not hits and not exc_errors:
    print("ok: check-bls-insecure — no *_insecure BLS calls")
    sys.exit(0)

violations = 0
for msg in exc_errors:
    print(msg, file=sys.stderr)
    violations = 1
for file, lineno, sym in hits:
    if not path_allowed(file):
        print(
            f"BLOCKED: {file}:{lineno}:{sym} — path not on bls-insecure allowlist",
            file=sys.stderr,
        )
        violations = 1
        continue
    if not file_justified(file):
        print(
            f"BLOCKED: {file}:{lineno}:{sym} — allowlisted but missing PreforkHostQuery (or F-001: in tests, or a reasoned .bls-insecure-allow entry)",
            file=sys.stderr,
        )
        violations = 1
        continue

if violations:
    print("", file=sys.stderr)
    print(
        "check-bls-insecure: unallowlisted or uncommented *_insecure BLS (F-001 / R-006)",
        file=sys.stderr,
    )
    print("  Production: sign/verify/sign_multisig/aggregate only.", file=sys.stderr)
    print(
        "  World B PreFork tests: allowlist path + PreforkHostQuery comment.",
        file=sys.stderr,
    )
    print(
        "  Checked-in exception: exact path + reason in .bls-insecure-allow (no globs).",
        file=sys.stderr,
    )
    sys.exit(1)

print(f"ok: check-bls-insecure — {len(hits)} hit(s) allowlisted + justified")
sys.exit(0)
PY
