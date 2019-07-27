import * as React from 'react';
import { Icon } from 'antd';
import config from '../../../config/default'
const PtIcon = Icon.createFromIconfontCN({
  scriptUrl: config.iconfontUrl, // 在 iconfont.cn 上生成
});


export default class ViewDisplay extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
    this.dragOver = this.dragOver.bind(this);
  }

  onDrop(e: any) {
    e.stopPropagation();
    var data=e.dataTransfer.getData('Text');
    console.log(data)
  }

  dragOver(e: any) {
    e.preventDefault();
  }

  render() {
    return (
      <div className='view-display'>

        <header>
          <span>
            { (new Date()).getHours() }:{ (new Date()).getMinutes() }
          </span>
          <span>
            <PtIcon type='pt-wifi'/>
            <PtIcon type='pt-iconset0252'/>
          </span>
        </header>

        <div className='display-body' onDrop={this.onDrop} onDragOver={this.dragOver}>
          {/* 界面内容 */}
          <div className='page-not-data'>
            <div>
              <PtIcon type='pt-zanwu1'/>
              <span>暂无数据，从组建池内拖入本区域试试？</span>
            </div>
          </div>
        </div>
        
      </div>
    )
  }
}