import React from 'react'
import { Button, Steps, Divider } from 'antd'
import { inject } from 'mobx-react'

import { ColudPackgingInterface } from '../../../../interface/status'

import PackProcess from './packProcess'
import '../style/cloudPacking.scss'
const { Step } = Steps;

@inject((store: { pagePool: any }) => {
  return {
    pageData: store.pagePool.page,
    io: store.pagePool.io,
    getIO: store.pagePool.getIO,
  }
})

export default class ColudPackging extends React.Component<any, any> {

  state: ColudPackgingInterface = {
    status: false,
    packStatus: 'process',
    packingCurrent: -1,
    progressMsg: [],
    errMsg: '',
  }

  /**
   * 云打包
   */
  coludPacking = () => {
    const that = this;
    that.setState({
      status: !that.state.status
    })
    const PaPr = new PackProcess(that.props.pageData, that.props.getIO)
    const progressMsg: any = [];

    // 初始化打包
    let step = 0

    // 执行打包过程
    PaPr.progress((status, process, index, runQuery) => {
      !status.errMsg && ++step
      // 写入当前状态至下标
      progressMsg.push({
        status: runQuery.status,
        msg: status.errMsg || runQuery.msg
      })
      that.setState({
        packStatus: status.errMsg ? 'error' : 'process',
        packingCurrent: step,
        status: !status.errMsg,
        errMsg: status.errMsg,
        progressMsg,
      })
      return runQuery.status
    }, (index: number) => {
      console.log(index)
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
      progressMsg,
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
        >{!errMsg ? '开始' : '重试'}</Button>
        <Divider>进度</Divider>


        <Steps direction="vertical" size="small" current={packingCurrent} status={packStatus}>
          {
            PackProcess.process.map((item, index) => (
              <Step
                title={
                  `${item.title}${
                    progressMsg[index]
                      ? `...${progressMsg[index].status ? 'ok!' : 'error:'} ${progressMsg[index].msg}`
                      : packingCurrent === index
                        ? 'loading...'
                        : ''
                  }`
                }
                description={packingCurrent >= index ? item.desc : ''}
                key={`packProcess-${index}`}
              />
            ))
          }
        </Steps>
      </div>
    )
  }
}