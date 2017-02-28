import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import MainLayout from '../components/MainLayout/MainLayout.js';

function IndexPage({location, children}) {
  return (
    <MainLayout location={location}>
      {children}
    </MainLayout>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
