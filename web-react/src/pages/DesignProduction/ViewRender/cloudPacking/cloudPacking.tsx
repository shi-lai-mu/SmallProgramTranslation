import React from 'react'
import { Button, Steps, Divider } from 'antd'
import { ColudPackgingInterface } from '../../../../interface/status'
import io from 'socket.io-client'
import { inject } from 'mobx-react'
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
    this.setState({
      status: !that.state.status
    })
    const PaPr = new PackProcess()
    PaPr.progress((status, process, index)=> {
      this.setState({
        packingCurrent: ++that.state.packingCurrent
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
    } = this.state;

    return (
      <div className="cloud-packing">
        <h2>云打包 [测试版]</h2>
        <Button
          type="primary"
          icon="download"
          onClick={coludPacking}
          loading={status}
        >开始</Button>
        <Divider>进度</Divider>


        <Steps direction="vertical" size="small" current={packingCurrent} status={packStatus}>
          {
            PackProcess.process.map((item, index) => (
              <Step title={item.title} description={item.desc} key={`packProcess-${index}`} />
            ))
          }
        </Steps>
      </div>
    )
  }
}