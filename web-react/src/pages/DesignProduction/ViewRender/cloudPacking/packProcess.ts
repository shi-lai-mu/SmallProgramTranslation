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
  public progress(cb: (status: PackStatus, process: Process, index: number) => boolean): void {
    // 中途出错直接停止
    const process: Process[] = PackProcess.process;
    for (let i = 0, len = process.length; i < len; i++) {
      const item = process[i];
      if (item.action) {
        if (this[item.action]) {
          const runQuery = this[item.action]();
          if (typeof runQuery !== 'boolean') this.error = `执行[${item.title}]操作时发生错误：${runQuery};`;
        } else {
          this.error = `未找到[${item.title}]操作!`;
        }
        if (!cb(this.packStatus, item, i) || this.errMsg) break;
      }
    }
  }
}


export default PackProcess