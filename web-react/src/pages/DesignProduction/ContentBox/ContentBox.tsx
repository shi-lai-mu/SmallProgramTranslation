import * as React from 'react';
import { Tabs } from 'antd';
import './ContentBox.scss';
import ComponentsPool from './ComponentsPool/ComponentsPool'

const { TabPane } = Tabs;

export default class ContentBox extends React.Component {
  render() {
    return (
      <Tabs
        type='editable-card'
        className='content-box'
        hideAdd
        animated
      >
        <TabPane tab='组建池' key='1'>
          <ComponentsPool />
        </TabPane>
        <TabPane tab='我的收藏' key='2'>
          Content of Tab 2
        </TabPane>
        <TabPane tab='自定义组件' key='3'>
          Content of Tab 3
        </TabPane>
      </Tabs>
    )
  }
}