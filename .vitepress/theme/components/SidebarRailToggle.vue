<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const KEY = 'nocturne-docs-sidebar-rail'
const rail = ref(false)

function apply(on) {
  document.documentElement.classList.toggle('sidebar-rail', !!on)
}

function toggle(e) {
  e?.preventDefault?.()
  e?.stopPropagation?.()
  rail.value = !rail.value
  localStorage.setItem(KEY, rail.value ? '1' : '0')
  apply(rail.value)
}

onMounted(() => {
  rail.value = localStorage.getItem(KEY) === '1'
  apply(rail.value)
})

onUnmounted(() => {
  document.documentElement.classList.remove('sidebar-rail')
})
</script>

<template>
  <!-- Teleport out of layout stacking contexts so .VPSidebar cannot steal clicks -->
  <Teleport to="body">
    <button
      type="button"
      class="sidebar-rail-toggle"
      :aria-pressed="rail"
      :title="rail ? 'Expand navigation' : 'Collapse navigation to icons'"
      :aria-label="rail ? 'Expand navigation' : 'Collapse navigation to icons'"
      @click="toggle"
    >
      {{ rail ? '»' : '«' }}
    </button>
  </Teleport>
</template>
