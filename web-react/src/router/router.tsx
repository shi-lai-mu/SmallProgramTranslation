import ErrorPage from '../pages/Error';
import Design from '../pages/DesignProduction';
import About from '../pages/About';

const Routers: Array<any> = [
  {
    path: '/design/',
    name: '设计区',
    isShow: true,
    component: Design,
  },
  {
    path: '/about*',
    name: '关于',
    isShow: true,
    component: About,
  },
  {
    path: '/error/*',
    name: '错误页',
    isShow: false,
    component: ErrorPage,
  }
];

export default Routers;