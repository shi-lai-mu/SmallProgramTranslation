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
  [index: string]: any;

  /**
   * 页面数据
   */
  private pagePool: any;

  /**
   * socket.io
   */
  private io: any;

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

  constructor(pagePool: PageInterface[], io: any) {
    super();
    this.pagePool = pagePool;
    this.io = io;
  }

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
  public async  progress(
    cb: (status: PackStatus, process: Process, index: number, runQuery: { status: boolean; msg: string }) => boolean,
    loading?: (index: number) => void
  ) {
    // 中途出错直接停止
    const process: Process[] = PackProcess.process;
    // 跟进进度 递归异步进行
    const that: PackProcess = this;
    (async () => {
      let i: number = 0;
      let clock: any = undefined;

      async function recursive() {
        const item = process[i];
        let runQuery: { status: boolean; msg: string } = {
          status: false,
          msg: ''
        };
        clearTimeout(clock);
        if (item.action !== undefined) {
          if (that[item.action]) {
            // 操作超时判断
            clock = setTimeout(() => {
              that.error = '操作超时!';
              cb(that.packStatus, item, i, runQuery)
            }, 10000);
            loading && loading(i);
            // 同步执行操作
            runQuery = await that[item.action]();
            if (!runQuery.status) that.error = runQuery.msg;
          } else {
            that.error = `未找到[${item.title}]操作!`;
          }
          i++;
          // 如果 回调返回true 且 无错误 则 继续递归
          if (cb(that.packStatus, item, i, runQuery) && !that.errMsg) recursive();
        }
        return recursive;
      }
      return recursive();
    })();
  }
}


export default PackProcess