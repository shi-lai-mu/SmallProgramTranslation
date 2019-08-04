import * as React from 'react';
import { Icon } from 'antd';
import config from '../../../config/default';
import axios from 'axios';

const PtIcon = Icon.createFromIconfontCN({
  scriptUrl: config.iconfontUrl, // 在 iconfont.cn 上生成
});


export default class ViewDisplay extends React.Component<any, any> {

  state = {
    time: new Date()
  }

  constructor(props: any) {
    super(props);
    const that = this;

    // 一分钟更新一次左上角时间
    setInterval(() => {
      that.setState({
        time: new Date()
      });
    }, 60000);

    // 引入渲染所需框架
    const vue = document.createElement('script');
    vue.src = config.vueCDN;
    document.body.append(vue);
  }


  /**
   * 更新视图渲染
   */
  updateDisplay = (componentDom?: any) => {
    // const script = document.createElement('script');
    // script.id = 'vue';
    // script.src = 'http://127.0.0.1:7001/test.js';
    // document.body.append(script);
    axios
      .post('http://127.0.0.1:7001/test.js', {
        dom: componentDom
      })
      .then((res:any) => {
        if (!eval(res.data)) {
          throw Error('视图渲染失败！');
        }
      })
  }

  /**
   * 松开拖拽图层时
   */
  onDrop = (e: any) => {
    e.stopPropagation();
    var data=e.dataTransfer.getData('dom');
    this.updateDisplay(data);
  }

  dragOver = (e: any) => {
    e.preventDefault();
  }
  

  /**
   * 渲染
   */
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
