/**
 * 组件识别定位
 */
export default class RenderServiceUtils {

  /**
   * 数据合成 包含识别标识
   * [所有数据都将合入第一个数据内]
   * 
   * @param data 若干数据
   * @param tag 合成标识
   * @return 合成后的数据
   */
  public dataSynthetic(tag: string, ...data: string[]): (string|undefined) {
    let dataTarget: (string|undefined) = data.shift();

    dataTarget === undefined && this.error('组件合并时出错,目标为undefined!');

    data.forEach((newData: string) => {
      dataTarget += `/* ===== synthetic ${tag} start ==== */`;
      dataTarget += newData;
      dataTarget += `/* ===== synthetic ${tag} end ==== */`;
    })

    return dataTarget;
  }


  /**
   * 内置警告调试
   * @param msg 警告内容
   */
  public warn(msg: string): void {
    console.warn(msg);
  }

  /**
   * 内置错误调试
   * @param msg 错误内容
   */
  public error(msg: string): void {
    throw Error(msg);
  }
}
