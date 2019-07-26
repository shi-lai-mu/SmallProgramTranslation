import * as React from 'react';
import { Icon } from 'antd';
const MyIcon = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1318652_ot70tp1az5.js', // 在 iconfont.cn 上生成
});


export default class ViewDisplay extends React.Component {
  render() {
    return (
      <div className='view-display'>

        <header>
          <span>
            { (new Date()).getHours() }:{ (new Date()).getMinutes() }
          </span>
          <span>
            <MyIcon type='pt-wifi'/>
            <MyIcon type='pt-iconset0252'/>
          </span>
        </header>

        <div className='display-body'>
          sad
        </div>
        
      </div>
    )
  }
}