import * as React from 'react';

import { Tabs, Icon } from 'antd';
const { TabPane } = Tabs;

export default class ViewRender extends React.Component {
  render() {
    return (
      <div className='card-container view-render'>
        <Tabs >
          <TabPane
          tab={
            <span>
              <Icon type='eye' />
              视图
            </span>
          } key='1'>
            <p>视图界面</p>
          </TabPane>
          <TabPane tab='Tab Title 2' key='2'>
            <p>设置界面</p>
          </TabPane>
          <TabPane tab='Tab Title 3' key='3'>
            <p>日志界面</p>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
