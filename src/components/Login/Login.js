import React,{Component,PropTypes} from 'react';
import { Form, Input, Button, Checkbox, notification, message, Card} from 'antd';
import {withRouter} from 'react-router';
const FormItem = Form.Item;
const createForm = Form.create;
import {login} from '../../services/account.js';
import reactCookie from 'react-cookie';

import styles from './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
	  	LoginName:void 0,
	  	LoginPassword:void 0
	  };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
          return;
      }else{
          login({
              method: 'POST',
              body: values
          }).then(data => {
              if(data.result) {
                let username = values.LoginName;
                reactCookie.save("username", username);
                this.props.router.push('synchronization');
              } else {
                notification.error({
                  message: '错误提示',
                  description: '账号或密码错误'
                });
              }
          }, error => {
              notification.error({
                message: '错误提示',
                description: error.message,
              });
          });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Card className={styles.login_container} bodyStyle={{padding: 0}}>
        <div className={styles.title_box}>
          <h3>欢迎进入</h3>
          <h2>云南中医学院云打印管理系统</h2>
        </div>
        <div className={styles.login_content}>
          <Form horizontal onSubmit={this.handleSubmit} className={styles.form_box}>
              <FormItem label="账号">
              {getFieldDecorator('LoginName', {
                rules: [
                  { required: true, message: '请填写用户名', type: 'string' },
                  { min: 5, message: '用户名至少为5个字符'}
                ],
              })(
                <Input placeholder="请输入账户名"/>
              )}
            </FormItem>

            <FormItem label="密码">
              {getFieldDecorator('LoginPassword', {
                rules: [
                  { required: true, message: '请填写密码', type: 'string' },
                ],
              })(
                <Input type="password" placeholder="请输入密码"/>
              )}
            </FormItem>
            <FormItem>
              <Button className="ant-col-24" type="primary" htmlType="submit">登录</Button>
            </FormItem>
          </Form>
        </div>
      </Card>
    );
  }
}

Login.contextTypes = {
    router: React.PropTypes.object.isRequired
}

Login = createForm()(Login);

export default withRouter(Login);
