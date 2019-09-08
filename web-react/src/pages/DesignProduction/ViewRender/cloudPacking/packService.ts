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
          const {name, setting} = component;
          TreeDom.push({
            name,
            setting,
          });
        });
        comCount += pageComList.length;
        that.pageDom[pageName] = TreeDom;
      });
      if (pageList.length && comCount) {
        printMsg = `页面[${pageList.length}]|组件[${comCount}]`;
      } else {
        errMsg = `页面或页面组件为空!`
      }
    } catch(err) {
      errMsg = err; 
    }
    return {
      status: !errMsg,
      msg: errMsg || printMsg
    }
  }


  /**
   * 云签收
   */
  public async emitCloud() {
    this.io.emit('busyCheck', this.pageDom);
    await new Promise((resolve, reject) => {
      this.io.on('busyCheck', (res: any) => {
        resolve(res)
      });
    })

    return {
      status: true,
      msg: 'ok'
    }
  }


  /**
   * 云打包
   */
  public async packing() {
    await new Promise((resolve, reject) => {
      console.log(this.pagePool);
      
      this.io.emit('packing', this.pagePool)
      this.io.on('packing', (res: any) => {
        resolve(res)
      })
    })

    return {
      status: true,
      msg: 'ok'
    }
  }


  /**
   * 云打包
   */
  public async download() {
    return {
      status: true,
      msg: 'ok'
    }
  }
}