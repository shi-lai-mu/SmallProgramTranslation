

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
  components: PageComponent[];
  /**
   * 公共组件层
   */
  publicComponents: '';
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


/**
 * 页面组件
 */
export interface PageComponent {
  /**
   * 组件唯一标识
   */
  tag: string;
  /**
   * 组件显示层
   */
  template: string;
  /**
   * 组件样式层
   */
  css?: string;
  /**
   * 组件组件层
   */
  component: string;
  /**
   * 组件数据层
   */
  data: string;
  /**
   * 组件逻辑层
   */
  methods: string;
}