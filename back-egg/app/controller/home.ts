import { Controller } from 'egg';
// const csjs = require('@gotoeasy/csjs');

// const spawn = require('cross-spawn');

export default class HomeController extends Controller {
  
  public async test() {
    const { ctx } = this;
    const loginTest = await (await import('../pool/poolLoading'))();
    ctx.body = await loginTest.vueInterpreter(ctx.request.body.dom);
  }
}
