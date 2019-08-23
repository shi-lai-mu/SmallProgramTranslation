import { observable, action } from 'mobx'

class Test {
  @observable public num = 0;

  @observable public list = [];

  @action public addNum = () => {
    this.num++;
  }
}

export default new Test()