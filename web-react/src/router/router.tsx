import ErrorPage from '../pages/Error';
import Design from '../pages/DesignProduction';
import About from '../pages/About';

const Routers: Array<any> = [
  {
    path: '/Design/',
    name: '设计区',
    component: Design,
  },
  {
    path: '/about',
    name: '关于',
    component: About,
  },
  {
    path: '/Error/*',
    name: '错误页',
    component: ErrorPage,
  }
];

export default Routers;