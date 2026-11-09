import DefaultTheme from 'vitepress/theme'
import { defineComponent, Fragment, h } from 'vue'
import { useData } from 'vitepress'
import ApiLayout from './ApiLayout.vue'
import ApiReference from './components/ApiReference.vue'
import DocTrail from './components/DocTrail.vue'
import DevSurfaceBanner from './components/DevSurfaceBanner.vue'
import ProductsHub from './components/ProductsHub.vue'
import SidebarRailToggle from './components/SidebarRailToggle.vue'
import SiteLegal from './components/SiteLegal.vue'
import SidebarAccordion from './components/SidebarAccordion.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  // VitePress only natively switches home/doc/page/false. Named layouts like
  // frontmatter `layout: ApiLayout` must be handled here.
  Layout: defineComponent({
    name: 'ThemeLayout',
    setup(_, { slots }) {
      const { frontmatter } = useData()
      return () => {
        if (frontmatter.value.layout === 'ApiLayout') {
          return h(Fragment, null, [h(ApiLayout), h(SiteLegal)])
        }
        return h(DefaultTheme.Layout, null, {
          ...slots,
          // Fixed outside the sidebar chrome (not inside nav)
          'layout-top': () =>
            h(Fragment, null, [
              h(DevSurfaceBanner),
              h(SidebarRailToggle),
              h(SidebarAccordion),
              h(DocTrail),
            ]),
          // VitePress layout-bottom: end of page chrome (Contact / Privacy)
          'layout-bottom': () => h(SiteLegal),
        })
      }
    },
  }),
  enhanceApp({ app }) {
    app.component('ApiReference', ApiReference)
    app.component('ProductsHub', ProductsHub)
  },
}
