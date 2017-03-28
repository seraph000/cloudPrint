import React from 'react';
import {Card, Button, Icon, Input, Form, InputNumber, notification} from 'antd';
import styles from './Printer.css';
import {update} from '../../services/printer.js';
const FormItem = Form.Item;
const createForm = Form.create;
import {connect} from 'dva';
import {withRouter} from 'react-router';

class PrinterCard extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      showPage: false,
      number: 0
    };
    this._submitPage = this._submitPage.bind(this);
    this._submitInk = this._submitInk.bind(this);
  }

  componentWillMount() {
    const {DeviceCode, ExpectPageNumber, PrintPageNumber} = this.props.data;
    if(ExpectPageNumber) {
      if(ExpectPageNumber < 40)  {
        notification.error({
          message: '缺纸提示',
          description: DeviceCode,
        });
      }
    }else {
      if(ExpectPageNumber == 0) {
        notification.error({
          message: '缺纸提示',
          description: DeviceCode,
        });
      }
    }

    if(PrintPageNumber) {
      if(PrintPageNumber < 40)  {
        notification.error({
          message: '缺墨提示',
          description: DeviceCode,
        });
      }
    }else {
      if(PrintPageNumber == 0) {
        notification.error({
          message: '缺墨提示',
          description: DeviceCode,
        });
      }
    }
  }

  _submitPage(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (errors) {
          return;
      }else{
        values.Id = this.props.data.Id;
        values.Type = 1;
        update({
          method: 'POST',
          body: values
        }).then((data) => {
          if(data.success) {
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
      type: 'printer/getList'
    });
    this.setState({
      showPage: false
    });
  }

  _submitInk() {
    let obj = {};
    obj.Id = this.props.data.Id;
    obj.Type = 2;
    update({
      method: 'POST',
      body: obj
    }).then((data) => {
      if(data.success) {
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
    this.props.dispatch({
      type: 'printer/getList'
    });
    this.setState({
      showInk: false
    });
  }

  render() {
    const {Id, DeviceCode, Lnk, ExpectPageNumber, PrintPageNumber} = this.props.data;
    const { getFieldDecorator } = this.props.form;

    return (
      <Card bodyStyle={{padding: 36}} style={{height: 200}}>
        <div className={styles.content}>
          <p className={styles.p}>打印机编号：{DeviceCode}</p>
          <p className={styles.p}>大约剩余纸张：{ExpectPageNumber}</p>
          <p className={styles.p}>大约可打印纸张：{PrintPageNumber}</p>
          <div className={styles.btn_box}>
            {
              this.state.showPage ?
              <div>
                <Form onSubmit={this._submitPage} inline>
                  <FormItem>
                    {getFieldDecorator('PageNumber', {
                      initialValue: 160,
                      rules: [
                        { required: true, min: 1, message: '请填写正确数量', type: 'number'},
                      ],
                    })(
                      <InputNumber step={1} placeholder="请输入纸张数量"/>
                    )}
                  </FormItem>
                  <FormItem wrapperCol={{span: 8}}>
                    <Button type="primary" style={{marginRight: 8}} htmlType="submit">保存</Button>
                  </FormItem>
                </Form>
              </div> :
              <div className={styles.btn} onClick={() => {
                this.setState({
                  showPage: true
                });
              }}><Icon type='plus'/>点击添加纸张</div>
            }
            <div className={styles.btn} onClick={this._submitInk.bind(this)}><Icon type='plus'/>点击添加墨</div>
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
