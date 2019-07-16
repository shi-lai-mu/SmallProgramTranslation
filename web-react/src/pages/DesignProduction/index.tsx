import * as React from 'react';
import DesignLayout from './layout/design'
import {Row, Col } from 'antd';
import ViewRender from './ViewRender';

/**
 * 设计区 主页
 */
export default class DesignProduction extends React.Component {
  render () {
    return (
      <DesignLayout>
      <Row className='row-box'>
        <Col span={18} push={6}>
          4567489
        </Col>
        <Col span={6} pull={18} className='view-render-box'>
          <ViewRender />
        </Col>
      </Row>
      </DesignLayout>
    );
  }
}
