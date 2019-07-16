import * as React from 'react';
import { Layout, Menu, Icon } from 'antd';
import './design.scss';

const { SubMenu } = Menu;
const { Header, Footer } = Layout;

export default class DesignLayout extends React.Component {
  render() {
    return (
      <Layout className='DesignLayout' style={{ minHeight: '100vh' }}>
        <Header className='header'>
          <div className='logo' />
          <Menu
            theme='dark'
            mode='horizontal'
            defaultSelectedKeys={['3']}
            style={{ lineHeight: '64px' }}
          >
            <SubMenu
              title={
                <span className='submenu-title-wrapper'>
                  <Icon type='appstore' />
                  小程序编译平台
                </span>
              }
              key='1'
            >
              <Menu.ItemGroup title='Item 1'>
                <Menu.Item key='setting:1'>Option 1</Menu.Item>
                <Menu.Item key='setting:2'>Option 2</Menu.Item>
              </Menu.ItemGroup>
              <Menu.ItemGroup title='Item 2'>
                <Menu.Item key='setting:3'>Option 3</Menu.Item>
                <Menu.Item key='setting:4'>Option 4</Menu.Item>
              </Menu.ItemGroup>
            </SubMenu>

            <Menu.Item key='2'>
              <Icon type='bank' />
              首页
            </Menu.Item>

            <Menu.Item key='3'>
              <Icon type='experiment' />
              设计
            </Menu.Item>

            <Menu.Item key='4'>
              <Icon type='trademark' />
              关于
            </Menu.Item>

            <SubMenu
              key='5'
              style={{ float: 'right', height: '100%' }}
              title={
                <span className='submenu-title-wrapper'>
                  <Icon type='user' />
                  账号
                </span>
              }
            >
              <Menu.Item key='setting:1'>登录</Menu.Item>
              <Menu.Item key='setting:2'>注册</Menu.Item>
            </SubMenu>
          </Menu>
        </Header>
        {this.props.children}
        <Footer className="Footer">© CopyRight 2018-2019, <a href='//slmblog.com'>SLMBLOG.COM</a>, Inc.All Rights Reserved.</Footer>
      </Layout>
    );
  }
};
