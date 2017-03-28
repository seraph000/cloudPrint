import dva from 'dva';
import './index.css';
import createLoading from 'dva-loading';

// 1. Initialize
const app = dva();

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require("./models/studentInfo"));

app.model(require("./models/printer"));

app.model(require("./models/deviceId"));

app.model(require("./models/detail"));

app.model(require("./models/printHistory"));

app.model(require("./models/synchronization"));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
