/**
 * 组建池 加载器
 */ 
const fs = require('fs');
const csjs = require('@gotoeasy/csjs');
const cache = require('./memoryStack')();

module.exports = async () => {
  
  return {
    /**
     * vue 解释器
     */
    async vueInterpreter(componentPool) {
      let VUE = {
        template: '',
        data: '',
        methods: '',
        publicComponents: '',
        style: ''
      };
      
      /**
       * 根目录
        */
      const __ROOT__ = `../${componentPool}`;

      /**
       * 组件配置
        */
      let _poolConfig = {}

      const cacheData = cache.readCache(__ROOT__);

      // 私有组件解析
      const privateComponentPath = `${__ROOT__}/components/private/`;
      
      try {
        _poolConfig = cacheData.config || await require(__ROOT__);
      } catch(e) {
        console.error(e);
        return { msg: `组件 ${componentPool} 加载失败!` };
      }

      // 私有缓存区调用
      const privateComponentCache = cacheData.privateComponent || [];

      for (const i in _poolConfig.privateComponent) {
        const PC = privateComponentCache['index.js'] ||  await require(privateComponentPath  + 'index.js');

        VUE.template += PC.vue;
        VUE.data += PC.defaultData;
        VUE.methods += PC.methods;
        VUE.publicComponents += PC.components;
        VUE.style += PC.style;

        // 私有组件 缓冲写入
        if (!privateComponentCache['index.js']) {
          if (!cacheData.privateComponent) cacheData.privateComponent = {};
          cacheData.privateComponent['index.js'] = PC;
        }
      }
      
      // 缓冲写入
      if (!cacheData.config) {
        cacheData.config = _poolConfig;
        cache.writeCache(__ROOT__, cacheData);
      }

      return JSON
        .stringify(VUE)
        .replace(/\\n|(\t|\n|↵|(\s){2}|(?<=({|}|\(|\)))\s|(?<={{)\s|\s(?=}})|\s(?=\=)|(?<=\=)\s|(?<=\:)\s|\s(?=\(\)))+/g, '');
    },

    /**
     * uni-app解释器
     */
    uniInterpreter() {

    },

  };
};