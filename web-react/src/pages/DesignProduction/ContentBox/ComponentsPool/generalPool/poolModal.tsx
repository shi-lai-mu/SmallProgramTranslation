import * as React from 'react';

import { Tabs, Icon } from 'antd';
const { TabPane } = Tabs;

interface PoolModalModel {
  visible?: boolean,
  target?: any,
}

export default class PoolModal extends React.Component<PoolModalModel, any> {
  render () {
    return (
      <Tabs >
        <TabPane
          tab={
            <span>
              <Icon type='setting' theme='twoTone' />
              设置
            </span>
          }
          key='PoolModal:1'
        >
          <p>{this.props.target.title}设置</p>
        </TabPane>

        <TabPane
          tab={
            <span>
              <Icon type='picture' theme='twoTone' />
              预览
            </span>
          }
          key='PoolModal:2'
        >
          <p>组件预览</p>
        </TabPane>

        <TabPane
          tab={
            <span>
              <Icon type='info-circle' theme='twoTone' />
              信息
            </span>
          }
          key='PoolModal:3'
        >
          <p>组件信息</p>
        </TabPane>
      </Tabs>
    )
  }
}