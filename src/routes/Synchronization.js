import React from 'react';
import { connect } from 'dva';
import styles from './Synchronization.css';
import Component from '../components/Synchronization/Synchronization.js'

function Synchronization() {
  return (
    <div className={styles.normal}>
      <Component />
    </div>
  );
}

export default Synchronization;
