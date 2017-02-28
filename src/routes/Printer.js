import React from 'react';
import { connect } from 'dva';
import styles from './Printer.css';
import PrinterComponent from '../components/Printer/Printer.js';

function Printer() {
  return (
    <div className={styles.normal}>
      <PrinterComponent />
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Printer);
