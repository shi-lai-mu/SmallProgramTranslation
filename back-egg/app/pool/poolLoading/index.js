/**
 * 组建池 加载器
 */ 
const fs = require('fs');
const csjs = require('@gotoeasy/csjs');
const cache = require('./memoryStack')();
const defaultFilesData = require('./defaultFile'); // 多线操作

module.exports = async (user) => {
  // const _HASH_ = Math.random().toString(16).replace('.', ''); 多线操作
  const _HASH_ = '';
  

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
     * 
     * @param {pageData} pages 页面数据
     */
    async uniInterpreter(pages) {
      const that = this;
      // 基础目录创建
      /**
       * 多线操作
       */
      // const mainPath = await that.mkdir(['', '/public', '/src']);
      // // 创建基础文件
      // const defaultFilesTree = [];
      // for (const fileName in defaultFilesData) {
      //   defaultFilesTree.push({
      //     name: fileName,
      //     content: defaultFilesData[fileName],
      //   })
      // }
      // const fileWrite = await that.writeFiles(defaultFilesTree);
      /**
       * 单线操作
       */
      // 销毁src文件夹
      await that.clearFiles();
      // 重建src文件夹
      await that.mkdir(['/src/pages', '/src/components', '/src/static']);
      
      let configPages = '';
      // 页面遍历
      for (const pageName in pages) {
        const pageData = pages[pageName];
        const pagePath = `src/pages/${pageData.name}`;
        await that.mkdir(pagePath);
        const pageFiles = [{
          name: `${pagePath}/${pageData.name}.vue`,
          content: '',
        }];
        // 配置内添加页面
        configPages += `{"path": "pages/${pageData.name}", "style": { "navigationBarTitleText": "${pageData.name}" }},`
        // 组件遍历
        for (const component of pageData.components) {
          // console.log(component.name);writeFileslog
          const privateComponentPath = `app/pool/${component.name}/components/private/`;
          const fileData = fs.readFileSync(privateComponentPath  + 'index.vue').toString();
          pageFiles[0].content += fileData;
        };
        await this.writeFiles(pageFiles);
      }

      // 生成页面路径文件
      fs.writeFileSync('hash/src/pages.json', defaultFilesData['pages.json'].replace('__pages__', configPages.substr(0, configPages.length - 1)));

      // 尝试运行

    },


    /**
     * 创建文件夹
     * 
     * @param {string|array} mkdirName 文件夹名
     */
    async mkdir(mkdirName) {
      return new Promise((reslove, reject) => {
        const root = 'hash/' + _HASH_;
        if (typeof mkdirName === 'string') {
          !fs.existsSync(root + mkdirName) &&
            fs.mkdir(root + mkdirName, 0775, err => !err ? reslove(mkdirName) : reject(err));
        } else {
          function mkdir(i = 0) {
            if (i === mkdirName.length) return reslove(mkdirName);
            !fs.existsSync(root + mkdirName[i]) &&
              fs.mkdir(root + mkdirName[i], 0775, err => !err ? mkdir(++i) : reject(err));
          }
          mkdir();
        }
      });
    },


    /**
     * 写文件
     * 
     * @param {array} files 文件名及内容 [{ name: fileName, content: fileContent }, ...]
     */
    async writeFiles(files) {
      const root = 'hash/' + _HASH_ + '/';
      files.forEach(item => {
        fs.writeFileSync(root + item.name, item.content);
      });
    },


    /**
     * 删除目录
     */
    async clearFiles() {
      const files = ['src/pages', 'src/components', 'src/static'];
      files.forEach(dir => {
        delFile('hash/' + dir);
      });

      function delFile(name) {
        if(!fs.existsSync(name)) return;
        const data = fs.readdirSync(name);
        data.forEach(fileName => {
          const path = `${name}/${fileName}`;
          fs.statSync(path).isFile()
            ? fs.unlinkSync(path)
            : delFile(path)
          ;
        });
        fs.rmdirSync(name);
      }
    }
  };
};