import * as React from 'react';
// import axios from 'axios'  ;
import { List, Card, Modal, Button  } from 'antd';
import PoolModal from './poolModal';

/**
 * 通用组件池 组件
 */

export default class GeneralPool extends React.Component<any, any> {


  state = {
    data: [
      {
        name: 'loginTest',
        title: '组件 1',
      },
      {
        name: 'Test2',
        title: '组件 2',
      },
      {
        title: '组件 3',
      },
      {
        title: '组件 4',
      },
      {
        title: '组件 5',
      },
      {
        title: '组件 6',
      },
    ],
    visible: false,
    target: {
      title: ''
    }
  }

  // constructor(props: any) {
  //   super(props);
  // }

  compileTest = () => {
    // axios.get('http://127.0.0.1:7001/test').then(res => {
    //   console.log(res.data)
    // })
  }

  dragstart = (e: any) => {
    e.dataTransfer.setData('dom',JSON.stringify(this.state.data[e.target.dataset.index]));
  }

  render () {
    return (
      <div style={{padding: '20px', boxSizing: 'border-box'}}>
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 6,
            xxl: 3,
          }}
          dataSource={this.state.data}
          renderItem={(item, key) => (
            <List.Item>
              <Card
                title={item.title}
                onDragStart={this.dragstart}
                draggable={true}
                onClick={() => this.setState({visible: true, target: item})}
                data-index={key}
              >
                [{item.title}] 的组件简介
              </Card>
            </List.Item>
          )}
        />
        <Modal
          visible={this.state.visible}
          title={'添加 ' + this.state.target.title + '?'}
          onOk={() => this.setState({visible: false})}
          onCancel={() => this.setState({visible: false})}
          footer={[
            <Button key='back' onClick={() => this.setState({visible: false})}>
              Return
            </Button>,
            <Button key='submit' type='primary'>
              Submit
            </Button>,
          ]}
        >
          <PoolModal target={this.state.target} />
        </Modal>
      </div>
    )
  }
}
