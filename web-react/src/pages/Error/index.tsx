import * as React from 'react';

/**
 * 错误页面处理
 */
export default class ErrorPage extends React.Component {

  state = {
    code: 500,
  }

  constructor(props: any) {
    super(props);
    const split: Array<any> = window.location.hash.split('/');
    this.state = {
      code: split[2] || 501,
    }
  }

  render () {
    return (
      <span>{this.state.code}</span>
    )
  }
}
