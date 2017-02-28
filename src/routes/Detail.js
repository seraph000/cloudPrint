import React from 'react';
import { connect } from 'dva';
import styles from './Detail.css';
import DetailComponent from '../components/Detail/Detail.js';

function Detail() {
  return (
    <div className={styles.normal}>
      <DetailComponent />
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Detail);
