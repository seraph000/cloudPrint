import React from 'react';
import styles from './Printer.css';
import PrinterCard from './PrinterCard.js';
import {Row ,Col, Card, Breadcrumb} from 'antd';
import {connect} from 'dva';

function Printer({result}) {

  function getCards(ls) {
    if(ls.length > 0) {
      let arr = ls.map((ele, index) => (
        <Col className={styles.col} span={12} key={index}>
          <PrinterCard data={ele}/>
        </Col>
      ));
      return arr;
    }else {
      return '暂无数据'
    }
  }

  return (
    <div className={styles.normal}>
      <Breadcrumb separator=">" style={{marginBottom: 8}}>
        <Breadcrumb.Item>打印机管理</Breadcrumb.Item>
      </Breadcrumb>
      <Card title='打印机管理' bodyStyle={{padding: 48}}>
        <Row gutter={48}>
          {getCards(result)}
        </Row>
      </Card>
    </div>
  );
}

function mapStateToProps(state) {
  const {result} = state.printer;
  return {
    result,
  }
}

export default connect(mapStateToProps)(Printer);
