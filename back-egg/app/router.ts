import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.post('/test', controller.home.test);

  require('./io/router').default(app);
};
