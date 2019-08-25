import * as React from 'react';
import ViewDisplay from './viewDisplay';
import RenderSetting from './renderSetting/renderSetting';
import ColudPacking from './cloudPacking/cloudPacking';
import io from 'socket.io-client';
import { inject } from 'mobx-react';

import { Tabs, Icon } from 'antd';
import './style/viewrender.scss';
const { TabPane } = Tabs;

@inject((store: { pagePool: any }) => ({
    io: store.pagePool.io,
    setIO: store.pagePool.setIO,
  })
)

export default class ViewRender extends React.Component {

  constructor(props: any) {
    super(props);
    const socket = io('ws://127.0.0.1:7001');
    props.setIO(socket);
  }

  render() {
    return (
      <div className='card-container view-render'>
        <Tabs defaultActiveKey="1">

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
                <Icon type="cloud-download" />
                打包
              </span>
            }
            key='2'
          >
            <ColudPacking />
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

          <TabPane
            tab={
              <span>
                <Icon type='setting' />
                设置
              </span>
            }
            key='4'
          >
            <RenderSetting />
          </TabPane>

        </Tabs>
      </div>
    );
  }
}