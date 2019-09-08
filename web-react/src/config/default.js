const Config = {
  /**
   * 阿里图标库 symbol
   */
  iconfontUrl: '//at.alicdn.com/t/font_1318652_tpp3ksfr4lk.js',

  /**
   * VUE CDN 开发环境/生产环境
   */
  vueCDN: process.env.NODE_ENV === 'development'
   ? 'https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.js'
   : 'https://cdn.jsdelivr.net/npm/vue',

};

export default Config;