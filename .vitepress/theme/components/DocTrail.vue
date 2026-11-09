<script setup>
import { onContentUpdated, useRoute } from 'vitepress'
import { nextTick, onMounted, onUnmounted, ref, shallowRef, watch } from 'vue'

const route = useRoute()
const items = shallowRef([])
const active = ref(0)
const target = shallowRef(null)

function titleOf(el) {
  let text = ''
  for (const node of el.childNodes) {
    if (node.nodeType === 3) text += node.textContent
    else if (
      node.nodeType === 1 &&
      !node.classList.contains('header-anchor')
    ) {
      text += node.textContent
    }
  }
  return text.replace(/\s+/g, ' ').trim()
}

function levelOf(el) {
  for (const name of el.classList) {
    if (name.startsWith('level-')) return Number(name.slice(6))
  }
  return 0
}

function scan() {
  const found = [...document.querySelectorAll('.vp-doc h2')].filter(
    (el) => el.id,
  )
  items.value = found.map((el) => ({
    id: el.id,
    title: titleOf(el),
    el,
  }))
  onScroll()
  place()
}

function place() {
  nextTick(() => {
    if (items.value.length < 2) {
      target.value = null
      return
    }
    const links = [
      ...document.querySelectorAll(
        '.VPSidebar .VPSidebarItem.is-link.is-active',
      ),
    ]
    target.value = links.sort((a, b) => levelOf(b) - levelOf(a))[0] ?? null
  })
}

function onScroll() {
  const mark = window.scrollY + 120
  let idx = 0
  items.value.forEach((item, i) => {
    const top = item.el.getBoundingClientRect().top + window.scrollY
    if (top <= mark) idx = i
  })
  active.value = idx
}

onMounted(() => {
  scan()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
onContentUpdated(scan)
watch(() => route.path, scan)
</script>

<template>
  <Teleport v-if="target" :to="target">
    <nav class="doc-outline" aria-label="On this page">
      <a
        v-for="(item, i) in items"
        :key="item.id"
        :href="'#' + item.id"
        class="doc-outline-item"
        :class="{ active: i === active }"
        :aria-current="i === active ? 'location' : undefined"
      >
        {{ item.title }}
      </a>
    </nav>
  </Teleport>
</template>
