import * as React from 'react';
import { Icon } from 'antd';
import config from '../../../config/default';
import axios from 'axios';

const PtIcon = Icon.createFromIconfontCN({
  scriptUrl: config.iconfontUrl, // 在 iconfont.cn 上生成
});

interface StateModel {
  time: any,
  targetComponentList: any[],
  vueCode: string,
}

export default class ViewDisplay extends React.Component<any, any> {

  state:StateModel = {
    time: new Date(),
    targetComponentList: [],
    vueCode: ''
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
    console.log(componentDom)
    const targetComponentList = this.state.targetComponentList
    targetComponentList.push(componentDom);
    this.setState({ targetComponentList })

    axios
      .post('http://127.0.0.1:7001/test.js', {
        dom: targetComponentList
      })
      .then((res:any) => {
        // eval(res.data)
        try {
          eval(res.data);
          this.setState({
            vueCode: res.data
          })
        } catch (e) {
          throw Error('视图渲染失: ' + e);
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
    const { time, vueCode } = this.state;
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
          <div className={ vueCode ? '' : 'page-not-data'}>
            <div className='display-render'>
              <PtIcon type='pt-zanwu1'/>
              <span>暂无数据，从组建池内拖入本区域试试？</span>
            </div>
          </div>
        </div>
        
      </div>
    )
  }
}
