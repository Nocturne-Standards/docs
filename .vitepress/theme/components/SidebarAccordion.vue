<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vitepress'

/**
 * VitePress only auto-expands the active sidebar group; it never collapses
 * siblings. Caret sits over / near product <a> links — block default nav /
 * new-tab on caret interaction without stopping Vue’s toggle handler.
 */
const route = useRoute()

const PRODUCT_CARET =
  '.VPSidebar .group > .VPSidebarItem.level-0 > .items > .VPSidebarItem.level-1.collapsible:not(.collapsed):not(.has-active):not(.is-active) > .item > .caret'

function collapseInactiveProducts() {
  document.querySelectorAll<HTMLElement>(PRODUCT_CARET).forEach((el) => {
    el.click()
  })
}

function runAccordion() {
  nextTick(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(collapseInactiveProducts)
    })
  })
}

function isCaretTarget(e: Event): boolean {
  const t = e.target
  return t instanceof Element && !!t.closest('.VPSidebar .caret')
}

/** Kill link default (nav / new tab) when the hit target is the caret. */
function onCaretGuard(e: Event) {
  if (!isCaretTarget(e)) return
  e.preventDefault()
}

onMounted(() => {
  runAccordion()
  document.addEventListener('click', onCaretGuard, true)
  document.addEventListener('auxclick', onCaretGuard, true)
})

onUnmounted(() => {
  document.removeEventListener('click', onCaretGuard, true)
  document.removeEventListener('auxclick', onCaretGuard, true)
})

watch(() => route.path, runAccordion)
</script>

<template></template>
