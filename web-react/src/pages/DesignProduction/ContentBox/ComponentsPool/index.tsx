import * as React from 'react';
import { Tabs } from 'antd';
import GeneralPool from './generalPool'

const { TabPane } = Tabs;

export default class ComponentsPool extends React.Component {
  render() {
    return (
      <Tabs tabPosition='right'>
        <TabPane tab='通用组件池' key='3'>
          <GeneralPool />
        </TabPane>
        <TabPane tab='局部组件池' key='2'>
          头部组件
        </TabPane>
        <TabPane tab='电商组件池' key='4'>
          Content of Tab 3
        </TabPane>
        <TabPane tab='论坛组件池' key='5'>
          Content of Tab 3
        </TabPane>
        <TabPane tab='工具组件池' key='6'>
          Content of Tab 3
        </TabPane>
        <TabPane tab='其他组件池' key='7'>
          Content of Tab 3
        </TabPane>
      </Tabs>
    );
  }
}
