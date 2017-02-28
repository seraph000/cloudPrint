import React from 'react';
import styles from './PrintHistory.css';
import {connect} from 'dva';
import {Card, Table, DatePicker, Button, Breadcrumb } from 'antd';
const {RangePicker} = DatePicker;

function PrintHistory({result: dataSource, loading}) {

  const columns = [
    {
      title: '打印机编号',
      dataIndex: 'Number',
      key: 'Number',
    },
    {
      title: '累计用纸（单位：张）',
      dataIndex: 'UsePage',
      key: 'UsePage',
      render: (text) => {
        if(!text) {
          return 0;
        }else {
          return text;
        }
      }
    },
    {
      title: '累计加纸（单位：张）',
      dataIndex: 'Amout',
      key: 'Amout',
    },
  ];

  return (
    <div className={styles.normal}>
      <Breadcrumb separator=">" style={{marginBottom: 8}}>
        <Breadcrumb.Item>打印历史</Breadcrumb.Item>
      </Breadcrumb>
      <Card title='打印历史表'>
        <Table columns={columns}
           rowKey={record => record.Id}
           dataSource={dataSource}
           loading={loading}/>
      </Card>
    </div>
  );
}

function mapStateToProps(state) {
  const {result} = state.printHistory;
  return {
    result,
    loading: state.loading.models.printHistory
  }
}

export default connect(mapStateToProps)(PrintHistory);
