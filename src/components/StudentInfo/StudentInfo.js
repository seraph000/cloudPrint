import React from 'react';
import styles from './StudentInfo.css';
import {connect} from 'dva';
import { Table, Button, Card, Input, Form, Row, Col, DatePicker, Select, Breadcrumb } from 'antd';
const FormItem = Form.Item;
const createForm = Form.create;
const {RangePicker} = DatePicker;
const Option = Select.Option;

function StudentInfo({ dispatch, form,
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
          type: 'studentInfo/getList',
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
          type: 'studentInfo/getList',
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
      title: '学号',
      dataIndex: 'UserNumber',
      key: 'UserNumber',
    },
    {
      title: '学生姓名',
      dataIndex: 'UserName',
      key: 'UserName',
    },
    {
      title: '打印证明名称',
      dataIndex: 'Type',
      key: 'Type',
      render: (text) => {
        switch (text) {
          case 1:
            return '学籍证明';
            break;
          case 2:
            return '成绩单';
            break;
          case 3:
            return '大学英语四级证明';
            break;
          case 4:
            return '大学英语六级证明';
            break;
        }
      }
    },
    {
      title: '打印时间',
      dataIndex: 'CreatedTime',
      key: 'CreatedTime',
      render: (text) => {
        return text.replace(/-/g, '/');
      },
      sorter: true
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
        <Breadcrumb.Item>学生打印信息</Breadcrumb.Item>
      </Breadcrumb>
      <Card title='学生打印信息表' bodyStyle={{padding: 16}}>
        <div className={styles.form}>
          <Form horizontal onSubmit={_search}>
            <Row>
              <Col span={8}>
                <FormItem label="学号" {...formItemLayout}>
                  {getFieldDecorator('userNumber')(
                    <Input />
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="学生姓名" {...formItemLayout}>
                  {getFieldDecorator('userName')(
                    <Input />
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="证明名称" {...formItemLayout}>
                  {getFieldDecorator('typeCode')(
                    <Select>
                      <Option value='1'>学籍证明</Option>
                      <Option value='2'>成绩单</Option>
                      <Option value='3'>大学英语四级证明</Option>
                      <Option value='4'>大学英语六级证明</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
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
  const {Entities, PageIndex, PageSize, TotalItemCount} = state.studentInfo;
  return {
    loading: state.loading.models.studentInfo,
    Entities,
    PageIndex,
    PageSize,
    TotalItemCount
  }
}

StudentInfo = createForm()(StudentInfo);

export default connect(mapStateToProps)(StudentInfo);
