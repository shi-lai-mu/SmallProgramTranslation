'use strict';

const Controller = require('egg').Controller;
const spawn = require('cross-spawn');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
    await spawn('npm', [ '-v' ], { stdio: 'inherit' });
  }
}

module.exports = HomeController;
