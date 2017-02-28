import React from 'react';
import { connect } from 'dva';
import styles from './Login.css';
import LoginComponent from '../components/Login/Login.js';

function Login() {
  return (
    <div className={styles.normal}>
      <div className={styles.header}>
        <div className={styles.logo_box}>
          <img className={styles.logo} src={require('../assets/logo.svg')}/>
          <div className={styles.motto}>
            <img src={require('../assets/school-big.png')} />
            <img src={require('../assets/motto-big.png')} />
          </div>
        </div>
        <LoginComponent />
      </div>
      <div className={styles.footer}>
        <span className={styles.footer_in}>Copyright © 2016-{new Date().getFullYear()}</span>
        <span className={styles.footer_in}>
          Power by
          <a style={{color: '##0D3E00', marginLeft: 6}} href='http://www.ynutcm.edu.cn/' target='_blank'>云南中医学院</a>
        </span>
      </div>
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Login);
