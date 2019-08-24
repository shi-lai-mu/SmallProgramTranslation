/**
 * 打包进度接口
 */
export interface Process {
  /**
   * 操作简称
   */
  title: string;
  /**
   * 当前状态简介
   */
  desc: string;
  /**
   * 执行函数
   */
  action: string;
  /**
   * 执行状态文字
   */
  msg?: string;
}


/**
 * 包装状态返回数据
 */
export interface PackStatus {
  /**
   * 运行状态
   */
  runStatus: boolean;
  /**
   * 进度的下标
   */
  progressIndex: number;
  /**
   * 错误内容
   */
  errMsg?: string;
}