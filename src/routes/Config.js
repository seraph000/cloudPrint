import React from 'react';
import { connect } from 'dva';
import styles from './Config.css';
import ConfigComponent from '../components/Config/Config.js';

function Config(props) {
  return (
    <div className={styles.normal}>
      <ConfigComponent />
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Config);
