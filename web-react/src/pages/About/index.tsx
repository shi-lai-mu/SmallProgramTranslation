import * as React from 'react';
import DefaultLayout from '../../layout/default';
import logo from '../../assets/logo.svg';
import './index.scss';

export default class About extends React.Component {
  render() {
    return (
      <DefaultLayout>
        <div className='About'>
          <img src={logo} className='logo' alt='logo' />
          <h2>三平台小程序生成系统</h2>
          <h3>构建日期： 2019/07/14</h3>
        </div>
      </DefaultLayout>
    );
  }
}