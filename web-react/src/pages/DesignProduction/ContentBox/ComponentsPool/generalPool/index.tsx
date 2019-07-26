import * as React from 'react';
import { Button, List, Card  } from 'antd';
import axios from 'axios';

export default class GeneralPool extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.compileTest = this.compileTest.bind(this);
  }

  state = {
    data: [
      {
        title: '组建 1',
      },
      {
        title: '组建 2',
      },
      {
        title: '组建 3',
      },
      {
        title: '组建 4',
      },
      {
        title: '组建 5',
      },
      {
        title: '组建 6',
      },
    ]
  }

  compileTest() {
    axios.get('http://127.0.0.1:7001/test').then(res => {
      console.log(res.data)
    })
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
          renderItem={item => (
            <List.Item>
              <Card title={item.title}>[{item.title}] 的组建简介</Card>
            </List.Item>
          )}
        />
      </div>
    )
  }
}

// const data = [
//   {
//     title: 'Title 1',
//   },
//   {
//     title: 'Title 2',
//   },
//   {
//     title: 'Title 3',
//   },
//   {
//     title: 'Title 4',
//   },
//   {
//     title: 'Title 5',
//   },
//   {
//     title: 'Title 6',
//   },
// ];

// ReactDOM.render(
//   <List
//     grid={{
//       gutter: 16,
//       xs: 1,
//       sm: 2,
//       md: 4,
//       lg: 4,
//       xl: 6,
//       xxl: 3,
//     }}
//     dataSource={data}
//     renderItem={item => (
//       <List.Item>
//         <Card title={item.title}>Card content</Card>
//       </List.Item>
//     )}
//   />,
//   mountNode,
// );