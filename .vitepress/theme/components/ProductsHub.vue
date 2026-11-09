<script setup lang="ts">
import { computed } from 'vue'
import { SIDEBAR_SECTIONS, isVisible } from '../../published.mts'
import { PRODUCTS } from '../../products.mts'

const props = withDefaults(
  defineProps<{ compact?: boolean }>(),
  { compact: false },
)

const visible = computed(() => PRODUCTS.filter((p) => isVisible(p.slug)))
// Same grouping as the sidebar: Products, then Building blocks.
const sections = computed(() =>
  SIDEBAR_SECTIONS.map((s) => ({
    text: s.text,
    items: visible.value.filter((p) => (s.slugs as readonly string[]).includes(p.slug)),
  })).filter((s) => s.items.length > 0),
)
</script>

<template>
  <div class="products-hub" :data-compact="props.compact ? '1' : '0'">
    <template v-if="props.compact">
      <ul>
        <li v-for="p in visible" :key="p.slug">
          <a :href="`/v1/${p.slug}/`">{{ p.title }}</a>
        </li>
        <li>
          <a href="/v1/deployments/">Deployments</a>
        </li>
      </ul>
    </template>
    <template v-else>
      <template v-for="s in sections" :key="s.text">
        <h3 class="products-hub__kind">{{ s.text }}</h3>
        <section v-for="p in s.items" :key="p.slug" class="products-hub__item">
          <h4>
            <a :href="`/v1/${p.slug}/`">{{ p.title }}</a>
          </h4>
          <p>{{ p.oneLiner }}</p>
        </section>
      </template>
      <section class="products-hub__item">
        <h4>
          <a href="/v1/deployments/">Deployments</a>
        </h4>
        <p>Where a version lives, and where a product address belongs.</p>
      </section>
    </template>
  </div>
</template>

<style scoped>
.products-hub__item h4 {
  margin-bottom: 0.25rem;
}
.products-hub__item p {
  margin-top: 0;
  color: var(--vp-c-text-2);
}
</style>
