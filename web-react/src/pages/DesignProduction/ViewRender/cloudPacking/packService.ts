import { PageComponent } from '../../../../interface/components';

interface PageDom {
  [key: string]: TreeDom[];
}

interface TreeDom {
  name: PageComponent['name'];
  setting: PageComponent['setting'];
}

export default class packService {
  [key: string]: any;


  /**
   * 可传输的page数据
   */
  private pageDom: PageDom = {};


  /**
   * 检查TREE完整性
   */
  public checkTreeDom(): { status: boolean; msg: string; } {
    let errMsg: (string | false) = false;
    let printMsg: string = '';

    try {
      const that = this,
        pagePool: any = that.pagePool,
        pageList: string[] = Object.keys(pagePool);
      // 计数
      let comCount = 0;
  
      pageList.forEach((pageName: string) => {
        const pageComList: PageComponent[] = Object.values(pagePool[pageName].components),
          TreeDom: TreeDom[] = [];
  
        pageComList.forEach((component: PageComponent) => {
          console.log(component)
          const {name, setting} = component;
          TreeDom.push({
            name,
            setting,
          });
        });
        comCount += pageComList.length;
        that.pageDom[pageName] = TreeDom;
      });
      printMsg = `页面[${pageList.length}]|组件[${comCount}]`;
    } catch(err) {
      errMsg = err; 
    }
    return {
      status: !errMsg,
      msg: errMsg || printMsg
    }
  }
}