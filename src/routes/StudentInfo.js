import React from 'react';
import { connect } from 'dva';
import styles from './StudentInfo.css';
import StudentComponent from '../components/StudentInfo/StudentInfo.js'

function StudentInfo() {
  return (
    <div className={styles.normal}>
      <StudentComponent />
    </div>
  );
}

export default StudentInfo;
