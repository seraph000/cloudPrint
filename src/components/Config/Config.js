import React,{Component,PropTypes} from 'react';
import { Form, Input, Button, Checkbox, notification, message, Card, InputNumber, Breadcrumb} from 'antd';
import {getPrice, editPrice} from '../../services/config.js';
const FormItem = Form.Item;
const createForm = Form.create;

import styles from './Config.css';

class Config extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Id: void 0,
      price: void 0
	  };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    getPrice({
      method: "get"
    }).then((data) => {
      this.setState({
        Id: data.result.Id,
        price: data.result.Value
      });
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (errors) {
          return;
      }else{
        values.Id = this.state.Id;
        editPrice({
          method: 'POST',
          body: values
        }).then((data) => {
          if(data.success) {
            notification.success({
              message: '操作提示',
              description: "修改成功",
              duration: 2
            });
          }else {
            notification.error({
              message: '错误提示',
              description: "修改失败",
              duration: 2
            });
          }
        })
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div className={styles.normal}>
        <Breadcrumb separator=">" style={{marginBottom: 8}}>
          <Breadcrumb.Item>价格设置</Breadcrumb.Item>
        </Breadcrumb>
        <Card title='价格设置'>
          <div>
            <Form horizontal onSubmit={this.handleSubmit}>
                <FormItem label="单价设置" labelCol={{ span: 4}} wrapperCol={{span: 8}}>
                {getFieldDecorator('Value', {
                  initialValue: parseFloat(this.state.price),
                  rules: [
                    //{ required: true, message: '请填写正确单价', type: 'string'},
                    {
                      validator: (rule, value, callback) => {
                        if(isNaN(value)) {
                          callback('请填写数字');
                        }
                        else if(value.toString().replace(/(^\s*)|(\s*$)/g,"") == '') {
                          callback('请填写正确单价');
                        }
                        else if(parseFloat(value) <= 0) {
                          callback('单价应大于0');
                        }
                        else if (value.toString().split('.').length > 1) {
                          if(value.toString().split('.')[1].length ==0 || value.toString().split('.')[1].length > 2) {
                            callback('请填写正确单价');
                          } else {
                            callback();
                          }
                        } else {
                          callback();
                        }
                      }
                    }
                  ],
                  getValueFromEvent: (e) => {
                    return e.target.value.replace(/(^\s*)|(\s*$)/g,"");
                  }
                })(
                  <Input style={{width: 360}} placeholder="请输入单价"/>
                )}
              </FormItem>
              <FormItem wrapperCol={{offset:4, span: 8}}>
                <Button type="primary" style={{marginRight: 16}} htmlType="submit">保存</Button>
                {/*<Button type="ghost">取消</Button>*/}
              </FormItem>
            </Form>
          </div>
        </Card>
      </div>
    );
  }
}

Config = createForm()(Config);

export default Config;
