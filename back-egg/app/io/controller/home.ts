'use strict';

import { Controller } from 'egg';

interface ComponentArgs {
  [key: string]: any;
}

export default class IoHome extends Controller {

  async test() {
    console.log(this.ctx.args[0])
  }

  async busyCheck() {
    this.ctx.socket.emit('busyCheck', 6666666666666666666)
  }

  /**
   * 通过io获取组件数据
   */
  async getComponentData() {
    const { ctx } = this,
      { socket } = ctx;

    const args = ctx.args[0];
    const loginTest = await (await import('../../pool/poolLoading'))();
    const targetComponent = JSON.parse(await loginTest.vueInterpreter(args));

    targetComponent.name = args;
    socket.component = args;
    socket.emit('addComponentData', targetComponent)
  }

  /**
   * 打包[test]
   */
  async packing() {
    const { ctx } = this,
      { socket } = ctx,
      pages: ComponentArgs = ctx.args[0];
      const poolLoading = await (await import('../../pool/poolLoading'))();

    // 页面遍历
    for (const pageName in pages) {
      // const components = pages[pageName].components;
      // 组件遍历
      const targetComponent = await poolLoading.uniInterpreter(pages[pageName]);
      console.log(targetComponent);
    }
    socket.emit('packing', 123465)
  }
}