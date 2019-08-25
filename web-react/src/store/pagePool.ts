import { observable, action } from 'mobx'

/**
 * 页面属性
 */
interface PageInter {
  [index: string]: componentDomInter;
}

/**
 * 组件树Dom
 */
interface componentDomInter {
  
}

/**
 * claas PagePool
 * 
 * 页面池数据
 */
class PagePool {

  /**
   * 页面数据
   */
  @observable public page: PageInter = {};

  /**
   * 设置页面数据
   */
  @action public setPage = (page: string, componentDom: componentDomInter): void => {
    this.page[page] = componentDom;
  }

  /**
   * socket.io
   */
  public io: any = {};

  /**
   * 设置页面数据
   */
  @action public setIO = (io: any): void => {
    this.io = io;
  }

  /**
   * 设置页面数据
   */
  public getIO = (io: any): void => {
    return this.io;
  }
}

export default new PagePool()