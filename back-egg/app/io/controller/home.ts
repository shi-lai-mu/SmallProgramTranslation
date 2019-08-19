'use strict';

import { Controller } from 'egg';

export default class IoHome extends Controller {
  async test() {
    console.log(this.ctx.args[0])
  }
}