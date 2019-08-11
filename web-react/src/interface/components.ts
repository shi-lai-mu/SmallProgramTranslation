

/**
 * 创建页面 接口
 */
export interface CreatePageInterface {
  /**
   * 页面名字
   */
  name: string;
  /**
   * 页面显示层
   */
  template: string;
  /**
   * 页面样式层
   */
  css?: string;
  /**
   * 页面组件层
   */
  component: string;
  /**
   * 页面数据层
   */
  data: string;
  /**
   * 页面逻辑层
   */
  methods: string;
  /**
   * 页面默认模板
   */
  defaultTemplate?: string;
  /**
   * 页面创建时间
   */
  createTime?: number;
}