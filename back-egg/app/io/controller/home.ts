'use strict';

import { Controller } from 'egg';

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
    const args = this.ctx.args[0];
    const loginTest = await (await import('../../pool/poolLoading'))();
    const targetComponent = JSON.parse(await loginTest.vueInterpreter(args));
    targetComponent.name = args;
    this.ctx.socket.emit('addComponentData', targetComponent)
  }
}