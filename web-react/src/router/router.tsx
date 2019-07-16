import ErrorPage from '../pages/Error';
import Design from '../pages/DesignProduction';

const Routers: Array<any> = [
  {
    path: '/Design/',
    name: '设计区',
    component: Design,
  },
  {
    path: '/Error/*',
    name: '错误页',
    component: ErrorPage,
  }
];

export default Routers;