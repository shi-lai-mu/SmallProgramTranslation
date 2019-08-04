import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.post('/test.js', controller.home.test);
};
