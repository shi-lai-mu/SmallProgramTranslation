import * as React from 'react';
import { Icon } from 'antd';
import config from '../../../config/default';
// import axios from 'axios';
import renderService from './renderService';
import dragService from './renderService/dragService';
import { observer, inject } from 'mobx-react';

const PtIcon = Icon.createFromIconfontCN({
  scriptUrl: config.iconfontUrl, // 在 iconfont.cn 上生成
});

interface StateModel {
  time: Date;
  targetComponentList: any[];
  vueCode: string;
  style: string;
};

interface componentData {
  name: string;
  title: string;
};

@inject((store: { pagePool: any }) => ({
  storeSetPageData: store.pagePool.setPage,
  page: store.pagePool.page,
  getIO: store.pagePool.getIO,
}))

@observer
export default class ViewDisplay extends React.Component<any, any> {

  state: StateModel = {
    time: new Date(),
    targetComponentList: [],
    vueCode: '',
    style: ''
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

    // 组件更新绑定
    this.props.getIO.on('addComponentData', (res: any) => {
      // 设定标签 并添加入组件库
      res.tag = res.name;
      renderService.addComponent(res)

      try {
        const Fn = Function;
        new Fn(renderService.packging())();
        dragService.vueRenderComplete(renderService);
        this.setState({
          vueCode: res,
          style: res.style
        })
        // 数据装入store
        const name = renderService.targetName;
        this.props.storeSetPageData(name, renderService.pageAll[name]);
      } catch (e) {
        throw Error('视图渲染失: ' + e);
      }
    })
  }

  /**
   * 更新视图渲染
   */
  public updateDisplay = (componentData: componentData) => {
    this.props.getIO.emit('getComponentData', componentData.name);
  }

  /**
   * 松开拖拽图层时
   */
  private onDrop = (e: any) => {
    e.stopPropagation();
    var data=e.dataTransfer.getData('dom');
    if (data) {
      this.updateDisplay(JSON.parse(data));
    }
  }

  /**
   * 悬浮于拖放区域时
   */
  private dragOver = (e: any) => {
    e.preventDefault();
  }


  /**
   * 渲染
   */
  public render() {
    const { time, vueCode, style } = this.state;
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

        <style type="text/css">{style}</style>

        <div className='display-body' onDrop={this.onDrop} onDragOver={this.dragOver}>
          <div className={ vueCode ? 'display-box' : 'page-not-data'}>
            <div className='display-render'>
              <PtIcon type='pt-zanwu1'/>
              <span>暂无数据，从组建池内拖入本区域试试？</span>
            </div>
          </div>
        </div>

        <div className='delete-box'>
          <Icon type='delete' />
        </div>
        
      </div>
    )
  }
}
