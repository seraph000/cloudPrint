import React from 'react';
import styles from './Detail.css';
import {connect} from 'dva';
import { Table, Button, Card, Input, Form, Row, Col, DatePicker, Select, Breadcrumb } from 'antd';
const FormItem = Form.Item;
const createForm = Form.create;
const {RangePicker} = DatePicker;
const Option = Select.Option;

function Detail({ dispatch, form, result: Printers, deviceId,
   Entities: dataSource, PageIndex: current, PageSize: pageSize, TotalItemCount: total, loading }) {

  function _onChange(pagination, filters, sorter) {
    form.validateFields((errors, values) => {
      if (errors) {
          return;
      }else{
        if(values.time.length > 0) {
          values.startDate = values.time[0].format('YYYY-MM-DD');
          values.endDate = values.time[1].format('YYYY-MM-DD');
          delete values.time;
        }
        if(sorter.order) {
          if(sorter.order == "ascend") {
            values.SortDateTime = true;
          }else {
            values.SortDateTime = false;
          }
        }
        dispatch({
          type: 'detail/getListById',
          pageIndex: pagination.current,
          pageSize: pagination.pageSize,
          ...values
        });
      }
    });
  }

  function _search(e) {
    e.preventDefault();
    form.validateFields((errors, values) => {
      if (errors) {
          return;
      }else{
        console.log(values)
        if(values.time.length > 0) {
          values.startDate = values.time[0].format('YYYY-MM-DD');
          values.endDate = values.time[1].format('YYYY-MM-DD');
          delete values.time;
        }
        dispatch({
          type: 'detail/getListById',
          pageIndex: 1,
          pageSize: 10,
          ...values
        });
      }
    });
  }

  function _selectChange(val) {
    form.setFieldsValue({
      'time': []
    });
    dispatch({
      type: 'detail/getListById',
      deviceId: val,
      pageIndex: 1,
      pageSize: 10
    });
  }

  function _getPrinters(ls) {
    const arr = ls.map((ele, index) => {
      console.log(ele)
      return <Option key={index} value={ele.Id+''}>{ele.DeviceCode}</Option>
    });
    return arr;
  }

  const columns = [
    {
      title: '加纸时间',
      dataIndex: 'CreatedTime',
      key: 'CreatedTime',
      render: (text) => {
        return text.replace(/-/g, '/');
      },
      sorter: true
    },
    {
      title: '加纸数量',
      dataIndex: 'PageNumber',
      key: 'PageNumber',
    },
    {
      title: '本次已用纸数量',
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
      title: '预计剩余纸张数量',
      dataIndex: 'LogExpectPageNumber',
      key: 'LogExpectPageNumber',
      render: (text) => {
        if(!text) {
          return 0;
        }else {
          return text;
        }
      }
    },
    {
      title: '预计可用纸张数量',
      dataIndex: 'LogPrintNumber',
      key: 'LogPrintNumber',
      render: (text) => {
        if(!text) {
          return 0;
        }else {
          return text;
        }
      }
    },
  ];

  const pagination = {
    total: total,
    current: current,
    pageSize: pageSize,
    showSizeChanger: true,
    showQuickJumper: true,
  };

  const {getFieldDecorator} = form;
  dispatch({
    type: 'id/getId'
  });

  return (
    <div className={styles.normal}>
      <Breadcrumb separator=">" style={{marginBottom: 8}}>
        <Breadcrumb.Item>打印机管理</Breadcrumb.Item>
        <Breadcrumb.Item>打印机历史操作</Breadcrumb.Item>
      </Breadcrumb>
      <Card title='打印机历史操作表' bodyStyle={{padding: 16}}>
        <div className={styles.form}>
          <Form onSubmit={_search}>
            <Row>
              <Col span={11}>
                <FormItem wrapperCol={{offset: 0, span: 24}}>
                  {getFieldDecorator('deviceId', {
                    initialValue: deviceId.toString()
                  })(
                    <Select style={{width: '50%'}} onChange={_selectChange}>
                      {_getPrinters(Printers)}
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={11}>
                <FormItem wrapperCol={{offset: 15, span: 8}}>
                  {getFieldDecorator('time')(
                    <RangePicker />
                  )}
                </FormItem>
              </Col>
              <Col span={2}>
                <FormItem wrapperCol={{offset:0, span: 12}}>
                  <Button type="primary" style={{marginRight: 16}} htmlType="submit">搜索</Button>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </div>
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={pagination}
          rowKey={record => record.Id}
          loading={loading}
          onChange={_onChange}
        />
      </Card>
    </div>
  );
}

function mapStateToProps(state) {
  const {Entities, PageIndex, PageSize, TotalItemCount} = state.detail;
  const {result} = state.printer;
  const deviceId = state.deviceId;
  return {
    loading: state.loading.models.detail,
    Entities,
    PageIndex,
    PageSize,
    TotalItemCount,
    result,
    deviceId
  }
}

Detail = createForm()(Detail);

export default connect(mapStateToProps)(Detail);
