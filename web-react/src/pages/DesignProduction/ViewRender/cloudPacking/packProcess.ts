import {
  Process,
  PackStatus
} from '../../../../interface/packProcess';
import { processData } from '../../../../config/config.pack';
import { PageInterface } from '../../../../interface/components';

import PackService from './packService';

/**
 * class PackProcess
 */
class PackProcess extends PackService {

  constructor(pagePool: PageInterface[]) {
    super();
    this.pagePool = pagePool;
  }

  [index: string]: any;

  /**
   * 页面数据
   */
  private pagePool: any;

  /**
   * 运行转台
   */
  private status: boolean = false;

  /**
   * 操作下标
   */
  private actionIndex: number = -1;

  /**
   * 错误
   */
  private errMsg: string = '';

  /**
   * 打包过程
   */
  static process: Process[] = processData;

  /**
   * 目前包装的状态
   */
  private get packStatus(): PackStatus {
    const { status, actionIndex, errMsg } = this
    return {
      runStatus: status,
      progressIndex: actionIndex,
      errMsg,
    }
  }

  /**
   * 抛出错误
   */
  private set error(errMsg: string) {
    this.errMsg = errMsg;
    this.status = false;
  }

  /**
   * 打包进度执行
   */
  public progress(
    cb: (status: PackStatus, process: Process, index: number, runQuery: { status: boolean; msg: string }) => boolean
  ): void {
    // 中途出错直接停止
    const process: Process[] = PackProcess.process;
    // 跟进进度
    for (let i = 0, len = process.length; i < len; i++) {
      const item = process[i];
      let runQuery: { status: boolean; msg: string } = {
        status: false,
        msg: ''
      };
      if (item.action !== undefined) {
        if (this[item.action]) {
          runQuery = this[item.action]();
          if (!runQuery.status) this.error = `执行[${item.title}]操作时发生错误：${runQuery.msg};`;
        } else {
          this.error = `未找到[${item.title}]操作!`;
        }
        if (!cb(this.packStatus, item, i, runQuery) || this.errMsg) break;
      }
    }
  }
}


export default PackProcess