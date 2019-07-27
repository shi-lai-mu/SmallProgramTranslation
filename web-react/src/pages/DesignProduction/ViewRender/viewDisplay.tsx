import * as React from 'react';
import { Icon } from 'antd';
import config from '../../../config/default'
const PtIcon = Icon.createFromIconfontCN({
  scriptUrl: config.iconfontUrl, // 在 iconfont.cn 上生成
});


export default class ViewDisplay extends React.Component<any, any> {

  state = {
    time: new Date(),
    html: '<div></div>'
  }

  constructor(props: any) {
    super(props);
    const that = this;
    setInterval(() => {
      that.setState({
        time: new Date()
      });
    }, 60000);
    // 引入
    let script = document.createElement('script');
    script.src = '/static/test.js';
    document.body.appendChild(script);
  }

  onDrop = (e: any) => {
    e.stopPropagation();
    var data=e.dataTransfer.getData('Text');
    console.log(data)
  }

  dragOver = (e: any) => {
    e.preventDefault();
  }
  

  render() {
    const { time } = this.state;
    return (
      <div className='view-display'>

        <header>
          <span>
            { time.getHours() }:{ time.getMinutes() }
          </span>
          <span>
            <PtIcon type='pt-wifi'/>
            <PtIcon type='pt-iconset0252'/>
          </span>
        </header>

        <div className='display-body' onDrop={this.onDrop} onDragOver={this.dragOver}>
          {/* <div dangerouslySetInnerHTML={{__html: this.state.html}}></div> */}
          <div id='app' className='page-not-data'>
            <div>
              <div dangerouslySetInnerHTML={{__html: `{{ m }}`}}></div>
              <PtIcon type='pt-zanwu1'/>
              <span>暂无数据，从组建池内拖入本区域试试？</span>
            </div>
          </div>
        </div>
        
      </div>
    )
  }
}
