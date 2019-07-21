import { Controller } from 'egg';
const spawn = require('cross-spawn');

export default class HomeController extends Controller {
  
  public async test() {
    const { ctx } = this;
    const shell = spawn.sync('test.bat' ,{ stdio: 'inherit' })
    console.log(
      shell,
      shell.stderr
    )
    ctx.body = shell.stdout;
  }
}
