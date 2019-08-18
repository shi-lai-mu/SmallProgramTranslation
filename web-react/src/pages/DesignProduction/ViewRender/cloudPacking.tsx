import React from 'react';
import './style/cloudPacking.scss';
import { Button, Steps, Divider } from 'antd';
import { ColudPackgingInterface } from '../../../interface/status';
import io from 'socket.io-client';
const { Step } = Steps;

export default class ColudPackging extends React.Component<any, any> {

  state: ColudPackgingInterface = {
    status: false,
    packStatus: 'process',
    packingCurrent: 0,
  }

  constructor(props: any) {
    super(props);
    const socket = io('ws://127.0.0.1:7001');
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
          <Step title="检查TREE完整性" description="如果我们的树准备就绪, 它将会发往云。" />
          <Step title="云签收成功" description="服务器并非繁忙状态, 且允许我们进行此操作。" />
          <Step title="编译对象指定[微信]" description="树符合指定平台编译规范, 我们即将进入编译状态!" />
          <Step title="云编译..." description="请耐心等待, 我们的服务器正在处理..." />
          <Step title="云压缩..." description="正在压缩代码..." />
          <Step title="云测试..." description="正在尝试启动您的项目, 检测它是否异常!" />
          <Step title="云打包..." description="即将处理完成!" />
          <Step title="完成啦!" description="感谢您的耐心等待, 共耗时0ms" />
        </Steps>
      </div>
    )
  }
}