import ErrorPage from '../pages/Error';


const Routers: Array<any> = [
  {
    path: '/Error/*',
    name: 'errorPage',
    component: ErrorPage,
  }
];

export default Routers;