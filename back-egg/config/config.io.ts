import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {
    io: {
      init: { },

      // 空间命名
      namespace: {
        '/': {
          connectionMiddleware: [ ],
          packetMiddleware: [],
        },
      },

      // 身份验证配置
      auth: {
        // 是否启用
        enable: true,
      },
    },
  };
  return config;
};
