export interface ColudPackgingInterface {
  /**
   * 是否正在进行打包
   */
  status: boolean;
  /**
   * 打包当前目标
   */
  packingCurrent: number;
  /***
   * 打包状态
   */
  packStatus?: 'wait' | 'process' | 'finish' | 'error' | undefined;
  /**
   * 错误内容
   */
  errMsg: string;
}