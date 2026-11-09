<script setup lang="ts">
import { DOCS_SURFACE } from '../../published.mts'
const show = DOCS_SURFACE === 'dev'
</script>

<template>
  <div v-if="show" class="dev-surface-banner" role="status">
    Dev surface - unpublished products visible. Use
    <code>npm run docs:dev:prod</code> for the production gate.
  </div>
</template>
