// 数据存储
interface Point {
  x: number;
  y: number;
  el?: any;
  width?: number,
  height?: number,
  component: Point[];
}
/**
 * 组件定位信息
 */
const point: Point = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  component: [],
};

/**
 * 元素遍历缓存
 */
let elementChache: HTMLCollectionOf<Element>;

/**
 * 防抖 时间戳
 */
let outTime: number = 0;
let targetElement: (Point|undefined);

/**
 * vue渲染逻辑层接口
 */
let vueRender: any;

/**
 * 传染主窗口
 */
let mainScreen = document.getElementsByClassName('view-display');


export default {

  /**
   * 初始化位置数据
   * @param targetEl 目标元素[用于排除目标]
   */
  initPoint(targetEl?: Element): Point {
    point.component = [];
    this.each((el:any) => {
      // 存储非目标元素的位置数据
      if (targetEl !== el) {
        const { offsetLeft, offsetTop } = el;
        point.component.push({
          x: offsetLeft,
          y: offsetTop,
          component: [],
          el,
        });
      }
    });
    return point;
  },


  /**
   * vue渲染完成
   */
  vueRenderComplete(renderService?: any): void {
    const that = this;
    vueRender = vueRender || renderService;

    // 事件处理
    that.each((el: any, index: number) => {
      el.dataset.i = index;
      el.draggable = true;
      el.ondragstart = that.ondragstart.bind(that);
      el.ondragend = that.ondragend.bind(that);
      el.ondrag = that.ondrag.bind(that);
    });
  },


  /**
   * 开始拖拽
   */
  ondragstart(e: any): void {
    point.x = e.offsetX;
    point.y = e.offsetY;
    point.width = e.target.offsetWidth;
    // 划出冷却时间
    outTime = Date.now() + 1000;
    e.target.className += ' drag-move';
    mainScreen[0].className += ' drag-status';
    // e.dataTransfer.setData('dom','{"name":"loginTest","title":"组件 1"}');
  },


  /**
   * 拖拽时
   */
  ondrag(e: any): void {
    const that = this;
    e.target.style.cssText = `
      position: fixed;
      width: ${point.width}px;
      left: ${e.clientX - point.x}px;
      top: ${e.clientY - point.y}px;
    `;

    // 防抖遍历
    if (outTime < Date.now()) {
      outTime = Date.now() + 500;
      // 取得鼠标目标元素
      that.initPoint(e.target);
      for (const Item of point.component) {
        if (
          (Item.y < e.clientY && Item.x < e.clientX) &&
          (Item.y + Item.el.offsetHeight > e.clientY && Item.x + Item.el.offsetWidth > e.clientX)
        ) {
          if (targetElement) {
            targetElement.el !== Item.el && (targetElement.el.style.cssText = '');
          }
          Item.el.style.cssText = `
            margin-top: ${Item.el.offsetHeight}px;
            transition: .5;
          `;
          targetElement = Item;
          break;
        }
      }
      if (e.clientX > 500 && targetElement) {
        targetElement.el.style.cssText = '';
        targetElement = undefined;
      }
    }

  },


  /**
   * 结束拖拽
   */
  ondragend(e: any): void {
    const that = this;
    // 清除上次的目标元素
    if (targetElement) {
      targetElement.el.style.cssText = '';
      console.log(targetElement.el.dataset.i, vueRender.getPage().components)
      const components = vueRender.getPage().components;
      const target =  components.splice(e.target.dataset.i, 1);
      components.splice(targetElement.el.dataset.i, 0 , ...target);
      // 调用重新渲染
      vueRender.reload(() => {
        that.vueRenderComplete();
      });
      targetElement = undefined;
    }
    // 归位
    e.target.style.cssText = '';
    mainScreen[0].className = 'view-display';
    e.target.className = 'select-box';
  },


  /**
   * 元素可拖拽遍历
   */
  each(cb: (value: Element, index: number, array: Element[]) => void): void {
    elementChache = elementChache || document.getElementsByClassName('select-box');

    // 事件处理
    Object
      .values(elementChache)
      .forEach(cb);
  }
}