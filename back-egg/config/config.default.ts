import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {
    
    // 单数据库信息配置 【生产环境部署时请反注释开发环境配置】
    mysql: {
      client: {
        // host
        host: 'api.slmblog.com',
        // 端口号
        port: '3306',
        // 用户名
        user: 'root',
        // 密码
        password: 'slm47888',
        // 数据库名
        database: 'three_compile',
      },
    },

    // CORS 跨域解决
    security: {
      csrf: {
        enable: false,
        ignoreJSON: false,
      },
      domainWhiteList: [ '*' ],
    },

    cors: {
      origin: '*',
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
      credentials: true,
    },

  } as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1563626293157_7939';

  // add your egg config in here
  config.middleware = [];

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
