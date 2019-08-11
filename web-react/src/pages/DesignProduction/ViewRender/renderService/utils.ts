/**
 * 组件识别定位
 */
export default class RenderServiceUtils {

  /**
   * 数据合成 包含识别标识
   * [所有数据都将合入第一个数据内]
   * 
   * @param tag 合成标识
   * @param key 合成字段
   * @param data 若干数据
   * @return 合成后的数据
   */
  public dataSynthetic(tag: string, keys: string[], ...data: object[]): RenderServiceUtils {
    let dataTarget: any = data.shift();

    dataTarget === undefined && this.error('组件合并时出错,目标为undefined!');

    data.forEach((newData: any) => {
      keys.forEach((key: string) => {
        let pings = '/*', pinge = '*/';
        if (key === 'template') {
          pings = '<!--';
          pinge = '-->';
        }
        dataTarget[key] += `${pings} == ${tag || newData.tag} start == ${pinge}`;
        dataTarget[key] += newData[key];
        dataTarget[key] += `${pings} == ${tag || newData.tag} end == ${pinge}`;
      })
    })

    return this;
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
