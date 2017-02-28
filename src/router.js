import React from 'react';
import { Router, Route, IndexRoute } from 'dva/router';
import IndexPage from './routes/IndexPage';

import Login from "./routes/Login.js";

import Config from "./routes/Config.js";

import Printer from "./routes/Printer.js";

import StudentInfo from "./routes/StudentInfo.js";

import PrintHistory from "./routes/PrintHistory.js";

import Synchronization from "./routes/Synchronization.js";

import Detail from "./routes/Detail.js";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <IndexRoute component={Login}/>
      <Route path="/" component={Login} />
      <Route path="/" component={IndexPage}>
        <Route path="Config" component={Config}/>
        <Route path="Printer" component={Printer}/>
        <Route path="StudentInfo" component={StudentInfo}/>
        <Route path="PrintHistory" component={PrintHistory}/>
        <Route path="Synchronization" component={Synchronization}/>
        <Route path="Printer/Detail" component={Detail} />
      </Route>
    </Router>
  );
}

export default RouterConfig;
