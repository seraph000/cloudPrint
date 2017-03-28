import React from 'react';
import styles from './Synchronization.css';
import {Card, Table, Button, Input, Form, Row, Col, DatePicker, Select, Breadcrumb } from 'antd';
import {connect} from 'dva';
const FormItem = Form.Item;
const createForm = Form.create;
const {RangePicker} = DatePicker;
const Option = Select.Option;

function Synchronization({ dispatch, form,
  Entities: dataSource, PageIndex: current, PageSize: pageSize, TotalItemCount: total, loading }) {

    function _onChange(pagination, filters, sorter) {
      form.validateFields((errors, values) => {
        if (errors) {
            return;
        }else{
          if(values.time) {
            if(values.time.length > 0) {
              values.startDate = values.time[0].format('YYYY-MM-DD');
              values.endDate = values.time[1].format('YYYY-MM-DD');
              delete values.time;
            }
          }
          if(sorter.order) {
            if(sorter.order == "ascend") {
              values.SortDateTime = true;
            }else {
              values.SortDateTime = false;
            }
          }
          dispatch({
            type: 'synchronization/getList',
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
          if(values.time.length > 0) {
            values.startDate = values.time[0].format('YYYY-MM-DD');
            values.endDate = values.time[1].format('YYYY-MM-DD');
            delete values.time;
          }
          dispatch({
            type: 'synchronization/getList',
            pageIndex: 1,
            pageSize: 10,
            ...values
          });
        }
      });
    }

  function _reset() {
    form.resetFields();
  }

  const columns = [
    {
      title: '操作时间',
      dataIndex: 'CreateTime',
      key: 'CreateTime',
      render: (text) => (
        text.replace(/-/g, '/')
      ),
      sorter: true
    },
    {
      title: '操作方式',
      dataIndex: 'OperationType',
      key: 'OperationType',
      render: (text) => {
        switch (text) {
          case 1:
            return '新增';
          case 2:
            return '删除';
          case 0:
            return '修改';
        }
      }
    },
    {
      title: '操作表名',
      dataIndex: 'OperationTable',
      key: 'OperationTable',
    },
    {
      title: '操作条数（单位：条）',
      dataIndex: 'OPerationTotal',
      key: 'OPerationTotal',
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
  const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

  return (
    <div className={styles.normal}>
      <Breadcrumb separator=">" style={{marginBottom: 8}}>
        <Breadcrumb.Item>数据同步情况</Breadcrumb.Item>
      </Breadcrumb>
      <Card title='数据同步情况表' bodyStyle={{padding: 16}}>
        <div className={styles.form}>
          <Form horizontal onSubmit={_search}>
            <Row>
              <Col span={8}>
                <FormItem label="操作表名" {...formItemLayout}>
                  {getFieldDecorator('operationTable')(
                    <Input />
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="操作方式" {...formItemLayout}>
                  {getFieldDecorator('operationType')(
                    <Select>
                      <Option value='0'>修改</Option>
                      <Option value='1'>新增</Option>
                      <Option value='2'>删除</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="时间段" {...formItemLayout}>
                  {getFieldDecorator('time')(
                    <RangePicker />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={8}></Col>
              <Col span={8}></Col>
              <Col span={8}>
                <FormItem wrapperCol={{offset:6, span: 18}}>
                  <Button type="primary" style={{marginRight: 16}} htmlType="submit">搜索</Button>
                  <Button type="ghost" onClick={_reset}>清空</Button>
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
  const {Entities, PageIndex, PageSize, TotalItemCount} = state.synchronization;
  return {
    loading: state.loading.models.synchronization,
    Entities,
    PageIndex,
    PageSize,
    TotalItemCount
  }
}

Synchronization = createForm()(Synchronization);

export default connect(mapStateToProps)(Synchronization);
