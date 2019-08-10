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
        html: '',
        data: '',
        methods: '',
        component: '',
      };
      
      for (let com of componentPool) {
        if (typeof com === 'string') com = JSON.parse(com);
        /**
         * 根目录
         */
        const __ROOT__ = `../${com.name}`;

        /**
         * 组件配置
         */
        let _poolConfig = {}

        const cacheData = cache.readCache(__ROOT__);
        if(cacheData.config) {
          console.log('使用了缓存');
        }

        // 私有组件解析
        const privateComponentPath = `${__ROOT__}/components/private/`;
        
        try {
          _poolConfig = cacheData.config || await require(__ROOT__);
        } catch(e) {
          console.error(e);
          return { msg: `组件 ${com.name} 加载失败!` };
        }

        // 私有缓存区调用
        const privateComponentCache = cacheData.privateComponent || [];

        for (const i in _poolConfig.privateComponent) {
          const PC = privateComponentCache['index.js'] ||  await require(privateComponentPath  + 'index.js');

          VUE.html += PC.vue;
          VUE.data += PC.defaultData;
          VUE.methods += PC.methods;
          VUE.component += PC.components;

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
      }

      let VueTemplate = `
      !(function(
          html=\`%_INNER_VUE_HTML_%\`,
          el='.display-render',
          data={%_DATA_%},
          methods={%_METHODS_%},
          components={%_COMPONENTS_%},
        ){
        document.querySelector(el).innerHTML=html;
        new Vue({el,data,methods,components});
      })();
      `;

      return csjs.miniJs(
        VueTemplate 
          .replace('%_INNER_VUE_HTML_%', VUE.html)
          .replace('%_DATA_%', VUE.data)
          .replace('%_METHODS_%', VUE.methods)
          .replace('%_COMPONENTS_%', VUE.component)
          .replace(/(\t|\n|(\s){2}|(?<=({|}|\(|\)))\s|(?<={{)\s|\s(?=}}))+/g, '')
      );
    },

    /**
     * uni-app解释器
     */
    uniInterpreter() {

    },

  };
};