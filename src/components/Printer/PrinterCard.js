import React from 'react';
import {Card, Button, Icon, Input, Form, InputNumber, notification} from 'antd';
import styles from './Printer.css';
import {edit} from '../../services/printHistory.js';
const FormItem = Form.Item;
const createForm = Form.create;
import {connect} from 'dva';
import {withRouter} from 'react-router';

class PrinterCard extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      number: 0
    };
    this._submit = this._submit.bind(this);
  }

  componentWillMount() {
    const {Id, Number, Amout, UsePage} = this.props.data;
    if(UsePage) {
      if(Amout - UsePage < 40)  {
        notification.error({
          message: '缺纸提示',
          description: Number,
        });
      }
    }else {
      if(Amout < 40) {
        notification.error({
          message: '缺纸提示',
          description: Number,
        });
      }
    }
  }

  _submit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (errors) {
          return;
      }else{
        values.Id = this.props.data.Id
        edit({
          method: 'POST',
          body: values
        }).then((data) => {
          if(data.result == 'OK') {
            notification.success({
              message: '操作提示',
              description: "添加成功",
              duration: 2
            });
          }else {
            notification.error({
              message: '错误提示',
              description: "添加失败",
              duration: 2
            });
          }
        });
      }
    });
    this.props.dispatch({
      type: 'printHistory/getList'
    });
    this.setState({
      show: false
    });
  }

  render() {
    const {Id, Number, Amout, UsePage} = this.props.data;
    const { getFieldDecorator } = this.props.form;

    return (
      <Card bodyStyle={{padding: 36}} style={{height: 164}}>
        <div className={styles.content}>
          <p className={styles.p}>打印机编号：{Number}</p>
          <p className={styles.p}>大约剩余纸张：{UsePage ? Amout - UsePage : Amout}</p>
          <div className={styles.btn_box}>
            {
              this.state.show ?
              <div>
                <Form onSubmit={this._submit} inline>
                  <FormItem>
                    {getFieldDecorator('Amout', {
                      initialValue: 160,
                      rules: [
                        { required: true, min: 1, message: '请填写正确数量', type: 'number'},
                      ],
                    })(
                      <InputNumber style={{width: 120}} step={1} placeholder="请输入纸张数量"/>
                    )}
                  </FormItem>
                  <FormItem wrapperCol={{span: 8}}>
                    <Button type="primary" style={{marginRight: 16}} htmlType="submit">保存</Button>
                  </FormItem>
                </Form>
              </div> :
              <div className={styles.btn} onClick={() => {
                this.setState({
                  show: true
                });
              }}><Icon type='plus'/>点击添加纸张</div>
            }
            <div className={styles.btn} onClick={() => {
                this.props.router.push({
                  pathname: 'printer/detail',
                  state: {
                    id: Id
                  }
                });
              }}>查看详情</div>
          </div>
        </div>
      </Card>
    );
  }
}

PrinterCard = createForm()(PrinterCard);
PrinterCard = withRouter(PrinterCard);

export default connect()(PrinterCard);
