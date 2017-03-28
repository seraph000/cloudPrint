import React from 'react';
import { Menu, Icon, Dropdown, Modal } from 'antd';
const SubMenu = Menu.SubMenu;
import { Link } from 'dva/router';
import styles from './MainLayout.css';
import { connect } from 'dva';
import MyModal from './MyModal.js';
import reactCookie from 'react-cookie';

const drop =
  <Menu>
    <Menu.Item key="1">
      <MyModal record={{}}>
        修改密码
      </MyModal>
    </Menu.Item>
    <Menu.Item key="2">
      <Link to='/'>
        退出登录
      </Link>
    </Menu.Item>
  </Menu>;

function Header({ location, routes, params }) {
  const username = reactCookie.load('username');
  let key = location.pathname;
  if(location.pathname == '/printer/detail') {
    key = '/printer';
  }
  return (
    <div className={styles.header}>
      <div className={styles.logo_box}>
        <img className={styles.logo} src={require('../../assets/logo.svg')}/>
        <div className={styles.school_box}>
          <img src={require('../../assets/school-little.png')}/>
          <img src={require('../../assets/motto-little.png')}/>
        </div>
      </div>
      <div className={styles.menu_box}>
        <Menu
          selectedKeys={[key.toLowerCase()]}
          mode="horizontal"
        >
          <Menu.Item key="/synchronization">
            <Link to='/synchronization' />数据同步情况
          </Menu.Item>
          <Menu.Item key="/printer">
            <Link to='/printer' />打印机管理
          </Menu.Item>
          <Menu.Item key="/printhistory">
            <Link to='/printhistory' />打印历史
          </Menu.Item>
          <Menu.Item key="/config">
            <Link to='/config' />配置
          </Menu.Item>
          <Menu.Item key="/studentinfo">
            <Link to='/studentinfo' />学生打印信息
          </Menu.Item>
        </Menu>
      </div>
      <div className={styles.drop_box}>
        <Dropdown overlay={drop}>
          <a className="ant-dropdown-link">
            {username} <Icon type="down" />
          </a>
        </Dropdown>
      </div>
    </div>
  );
}

export default Header;
