/**
 * 渲染编译器 逻辑层
 *    页面处理，组件渲染逻辑
 */
import {
  PageInterface, 
  PageComponent
} from '../../../../interface/components';
import RenderServiceUtils from './utils';

/**
 * 分页
 */
const __PAGE__: any = {};

/**
 * 分页排序
 */
const __PAGE_ORDER__: string[] = [];


/**
 * class RenderComponentService
 */
class RenderComponentService extends RenderServiceUtils {

  /**
   * 当前目标页面
   */
  private target: number = 0;

  /**
   * 渲染数据
   */
  public render: number = 0;

  /**
   * 目标名称
   */
  public get targetName(): string {
    return __PAGE_ORDER__[this.target];
  }

  /**
   * 返回全部页面
   */
  public get pageAll() {
    return __PAGE__;
  }


  /**
   * 添加组件
   *
   * @param component 新组件数据
   */
  public addComponent(component: PageComponent): RenderComponentService {
    const target = this.page;
    
    // 加入组件并设唯一渲染标识
    const index = target.components.push(component);
    component.tag += '-' + index;
    this.dataSynthetic(
      component.tag,
      [ 'template', 'data', 'methods', 'publicComponents' ],
      ...[ target, component ]
    );
    return this;
  }


  /**
   * 创建单个或多个页面
   * 
   * @param option 页面参数
   * @param repeat 重复创建 
   * @return RenderComponentService class
   */
  public createPages(option: PageInterface, repeat: number = 1): RenderComponentService {
    __PAGE__[option.name] = option;
    __PAGE_ORDER__.push(option.name);
    repeat--;
    repeat && this.createPages(option, repeat);
    return this;
  }


  /**
   * 设置目标页面
   * 
   * @param pageName 页面名称
   * @return RenderComponentService class
   */
  public setTargetPage(pageName: string): RenderComponentService {
    const target: number = __PAGE_ORDER__.indexOf(pageName);
    if (target === -1) throw Error('页面切换失败')
    this.target = target;
    return this;
  }


  /**
   * 获取渲染页面数据
   */
  public get page(): PageInterface {
    return __PAGE__[__PAGE_ORDER__[this.target]];
  }

  
  /**
   * 设置渲染页面数据
   * 
   * @param data 页面数据
   * @param target 目标页面 默认上一次操作的目标
   * @return RenderComponentService class
   */
  public setPage(data: PageInterface, target: string = ''): RenderComponentService {
    __PAGE__[target || __PAGE_ORDER__[this.target]] = data;
    return this;
  }


  /**
   * 重新编译渲染
   */
  public reload(cb?: Function) {
    const that = this;
    const target = that.page;
    const repage: PageInterface = {
      name: target.name,
      template: '',
      components: target.components,
      data: '',
      methods: '',
      publicComponents: ''
    };
    that.setPage(repage);
    that.dataSynthetic(
      '',
      [ 'template', 'data', 'methods', 'publicComponents' ],
      ...[ repage, ...target.components ]
    );
    that.renderData(cb);
    return that;
  }


  /**
   * 包装程序可编译的字符串
   * 
   * @param packgType 包装类型
   */
  public packging(packgType: string = 'template'): string {
    const targetPage = this.page;
    
    let VueTemplate: string = `
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
    
    return VueTemplate
      .replace('%_INNER_VUE_HTML_%', targetPage.template)
      .replace('%_DATA_%', targetPage.data)
      .replace('%_METHODS_%', targetPage.methods)
      .replace('%_COMPONENTS_%', targetPage.publicComponents)
  }


  /**
   * 渲染
   */
  renderData(cb?: Function) {
    const Fn = Function;
    new Fn(this.packging())();
    cb && cb();
  }
}

const initRender = new RenderComponentService();
initRender.createPages(
  {
    name: 'home',
    template: '',
    components: [],
    data: '',
    methods: '',
    publicComponents: ''
  }
)


export interface RCS {
  RenderComponentService: RenderComponentService;
  RenderServiceUtils: RenderServiceUtils;
};

export default initRender;