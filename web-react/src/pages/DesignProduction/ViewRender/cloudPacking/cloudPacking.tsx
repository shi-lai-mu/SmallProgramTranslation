import React from 'react'
import { Button, Steps, Divider } from 'antd'
import io from 'socket.io-client'
import { inject } from 'mobx-react'

import { ColudPackgingInterface } from '../../../../interface/status'

import PackProcess from './packProcess'
import '../style/cloudPacking.scss'
const { Step } = Steps;

@inject((store: { pagePool: any }) => {
  return {
    pageData: store.pagePool.page
  }
})

export default class ColudPackging extends React.Component<any, any> {

  state: ColudPackgingInterface = {
    status: false,
    packStatus: 'process',
    packingCurrent: 0,
    errMsg: '',
  }

  constructor(props: any) {
    super(props)
    const socket = io('ws://127.0.0.1:7001')
    socket.emit('test', { s: 123456 })
  }

  /**
   * 云打包
   */
  coludPacking = () => {
    const that = this;
    that.setState({
      status: !that.state.status
    })
    const PaPr = new PackProcess(that.props.pageData)
    let step = that.state.packingCurrent
    // 执行打包过程
    PaPr.progress(status => {
      !status.errMsg && ++step
      that.setState({
        packStatus: status.errMsg ? 'error' : 'process',
        packingCurrent: step,
        status: !status.errMsg,
        errMsg: status.errMsg,
      })
      console.log(status)
      return true
    })
  }

  render() {
    const {
      coludPacking,
    } = this;

    const {
      status,
      packingCurrent,
      packStatus,
      errMsg,
    } = this.state;

    return (
      <div className="cloud-packing">
        <h2>云打包 [测试版]</h2>
        <Button
          type={!errMsg ? 'primary' : 'danger'}
          icon="download"
          onClick={coludPacking}
          loading={status}
          style={{ display: 'block', margin: '0 auto' }}
        >{!errMsg ? '开始' : errMsg}</Button>
        <Divider>进度</Divider>


        <Steps direction="vertical" size="small" current={packingCurrent} status={packStatus}>
          {
            PackProcess.process.map((item, index) => (
              <Step title={item.title} description={packingCurrent === index ? item.desc : ''} key={`packProcess-${index}`} />
            ))
          }
        </Steps>
      </div>
    )
  }
}