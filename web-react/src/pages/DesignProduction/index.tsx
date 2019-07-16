import * as React from 'react';
import DefaultLayout from '../../layout/default'
import {Row, Col } from 'antd';
import ViewRender from './ViewRender';
import ContentBox from './ContentBox'

/**
 * 设计区 主页
 */
export default class DesignProduction extends React.Component {
  render () {
    return (
      <DefaultLayout>
        <Row className='row-box'>
          <Col span={18} push={6}>
            <ContentBox />
          </Col>
          <Col span={6} pull={18} className='view-render-box'>
            <ViewRender />
          </Col>
        </Row>
      </DefaultLayout>
    );
  }
}
