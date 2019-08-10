import * as React from 'react';
import ViewDisplay from './viewDisplay';
import { Tabs, Icon } from 'antd';
import './viewrender.scss';
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
            }
            key='1'
          >
            <ViewDisplay />
          </TabPane>

          <TabPane
            tab={
              <span>
                <Icon type='control' />
                调试
              </span>
            }
            key='2'
          >
            <p>设置界面</p>
          </TabPane>

          <TabPane
            tab={
              <span>
                <Icon type='exception' />
                日志
              </span>
            }
            key='3'
          >
            <p>日志界面</p>
          </TabPane>

        </Tabs>
      </div>
    );
  }
}