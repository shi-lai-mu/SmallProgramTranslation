import * as React from 'react';
import { Layout, Menu, Icon } from 'antd';
import RouterConfig from '../router/router';
import { Link, withRouter } from 'react-router-dom';
import './default.scss';

const { SubMenu } = Menu;
const { Header, Footer } = Layout;

class DesignLayout extends React.Component {

  state = {
    defaultSelectedKeys: 1
  }

  constructor(props) {
    super(props);

    // 顶部导航 选中状态 判断
    const { path } = this.props.match;
    for (const index in RouterConfig) {
      console.log(path, RouterConfig[index])
      if (path === RouterConfig[index].path) {
        this.state = {
          defaultSelectedKeys: index
        }
        break;
      }
    }
  }
  
  render() {
    return (
      <Layout className='DesignLayout' style={{ minHeight: '100vh' }}>
        <Header className='header'>
          <div className='logo' />
          <Menu
            theme='dark'
            mode='horizontal'
            defaultSelectedKeys={[this.state.defaultSelectedKeys]}
            style={{ lineHeight: '64px' }}
          >
            <SubMenu
              title={
                <span className='submenu-title-wrapper'>
                  <Icon type='appstore' />
                  小程序编译平台
                </span>
              }
              key='SubMenu:1'
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

            {
              // 可见路由遍历
              RouterConfig.map((element, index) => element.isShow && (
                <Menu.Item key={ index }>
                  <Link to={ element.path }>
                    <Icon type='bank' />
                    { element.name }
                  </Link>
                </Menu.Item>
              ))
            }

            <SubMenu
              key='SubMenu:2'
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
        <div className="page">
          {this.props.children}
        </div>
        <Footer className="footer">© CopyRight 2018-2019, <a href='//slmblog.com'>SLMBLOG.COM</a>, Inc.All Rights Reserved.</Footer>
      </Layout>
    );
  }
};

export default withRouter(DesignLayout)