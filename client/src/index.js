import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import getStore from './getStore';
import Todos from './Pages/Todos';
import registerServiceWorker from './registerServiceWorker';
import './Styles/main.css';
import './Styles/variables.css';


const store = getStore();

ReactDOM.render(
  <Provider store={store}>
    <Todos />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
