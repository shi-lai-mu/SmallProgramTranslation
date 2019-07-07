import * as React from 'react';
import { Button } from 'antd';

export default class GeneralPool extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
  }

  render () {
    return (
      <div>
        <Button type='primary'>测试编译</Button>
      </div>
    )
  }
}