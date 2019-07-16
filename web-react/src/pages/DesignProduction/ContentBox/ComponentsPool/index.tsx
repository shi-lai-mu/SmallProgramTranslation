import * as React from 'react';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

export default class ComponentsPool extends React.Component {
  render() {
    return (
      <Tabs tabPosition='right'>
        <TabPane tab='初始模板池' key='1'>
          主模板
        </TabPane>
        <TabPane tab='局部组件池' key='2'>
          头部组件
        </TabPane>
        <TabPane tab='通用组件池' key='3'>
          Content of Tab 3
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
