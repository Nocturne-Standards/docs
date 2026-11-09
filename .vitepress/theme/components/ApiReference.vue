<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ApiReference } from '@scalar/api-reference'
import '@scalar/api-reference/style.css'

const ready = ref(false)
onMounted(() => {
  ready.value = true
})
</script>

<template>
  <div class="api-reference-host">
    <ApiReference
      v-if="ready"
      :configuration="{
        url: '/openapi/agent-pay-facilitator.yaml',
        theme: 'default',
        darkMode: false,
        hideDarkModeToggle: true,
        hideModels: false,
      }"
    />
  </div>
</template>

<style scoped>
.api-reference-host {
  width: 100%;
  min-height: 100%;
}
</style>
