import { definePlugin } from '@mkeeorg/federation-ui';
import { Career } from './career';

export default definePlugin({
  appName: 'career',
  navItems: [{ label: 'Career', url: '/career' }],
  routes: [
    {
      path: '/career',
      component: Career,
    },
  ],
});
