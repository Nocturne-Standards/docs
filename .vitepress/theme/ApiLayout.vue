<script setup lang="ts">
import { useData } from 'vitepress'
import ApiReference from './components/ApiReference.vue'

const { frontmatter } = useData()
</script>

<template>
  <div class="api-layout">
    <header class="api-layout__bar">
      <a class="api-layout__back" href="/v1/chit/">← Chit</a>
      <div class="api-layout__titles">
        <strong>{{ frontmatter.title || 'HTTP / API' }}</strong>
        <p v-if="frontmatter.description" class="api-layout__desc">
          {{ frontmatter.description }}
        </p>
      </div>
      <a class="api-layout__spec" href="/openapi/agent-pay-facilitator.yaml"
        >OpenAPI YAML</a
      >
    </header>
    <main class="api-layout__main">
      <ApiReference />
    </main>
  </div>
</template>

<style scoped>
.api-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  background: var(--vp-c-bg, #f3f1eb);
  color: var(--vp-c-text-1, #1c2430);
}

.api-layout__bar {
  flex: 0 0 auto;
  z-index: 2;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.75rem 1.25rem;
  padding: 0.85rem 1.25rem;
  border-bottom: 1px solid var(--vp-c-divider, rgba(28, 36, 48, 0.12));
  background: var(--vp-c-bg-alt, #e8e4d9);
}

.api-layout__back,
.api-layout__spec {
  font-family: Sora, system-ui, sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--vp-c-brand-1, #1c2430);
  text-decoration: none;
  white-space: nowrap;
}

.api-layout__back:hover,
.api-layout__spec:hover {
  text-decoration: underline;
}

.api-layout__titles {
  flex: 1 1 12rem;
  min-width: 0;
}

.api-layout__titles strong {
  font-family: Literata, Georgia, serif;
  font-size: 1.125rem;
  font-weight: 700;
}

.api-layout__desc {
  margin: 0.25rem 0 0;
  font-family: Sora, system-ui, sans-serif;
  font-size: 0.8125rem;
  line-height: 1.4;
  color: var(--vp-c-text-2, #4a5568);
}

.api-layout__main {
  flex: 1 1 auto;
  min-height: 0;
  overflow: auto;
}
</style>
