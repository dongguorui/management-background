import { defineConfig } from 'umi';
const proxyhost = 'http://123.12.1123.123/';

export default defineConfig({
  singular: true, //是否启用单数模式的目录
  hash: true, //是否让生成的文件包含 hash 后缀
  theme: {
    '@primary-color': '#722ed1',
  }, //配置主题，实际上是配 less 变量
  targets: {
    //兼容的浏览器最低版本，会自动引入 polyfill 和做语法转换
    ie: 11,
  },
  nodeModulesTransform: {
    //设置 node_modules 目录下依赖文件的编译方式
    type: 'none',
  },
  routes: [
    //路由
    {
      path: '/',
      component: '@/pages/page/index',
    },
  ],
  proxy: {
    //配置代理能力
    '/api': {
      target: proxyhost,
      changeOrigin: true,
    },
  },
  fastRefresh: {}, //快速刷新
});
