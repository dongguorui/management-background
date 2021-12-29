import { defineConfig } from 'umi';

export default defineConfig({
  hash: true,
  // theme: './theme.js',
  targets: {
    ie: 11,
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [{ path: '/', component: '@/pages/index' }],
  fastRefresh: {},
});
