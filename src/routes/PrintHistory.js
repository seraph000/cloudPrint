import React from 'react';
import { connect } from 'dva';
import styles from './PrintHistory.css';
import HistoryComponent from '../components/PrintHistory/PrintHistory.js';

function PrintHistory() {
  return (
    <div className={styles.normal}>
      <HistoryComponent />
    </div>
  );
}

export default PrintHistory;
