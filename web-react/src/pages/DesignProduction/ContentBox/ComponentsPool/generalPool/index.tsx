import * as React from 'react';
import { Button } from 'antd';
import axios from 'axios';

export default class GeneralPool extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.compileTest = this.compileTest.bind(this);
  }

  compileTest() {
    axios.get('http://127.0.0.1:7001/test').then(res => {
      console.log(res.data)
    })
  }

  render () {
    return (
      <div style={{padding: '20px', boxSizing: 'border-box'}}>
        <Button type='primary' onClick={this.compileTest}>测试编译</Button>
      </div>
    )
  }
}