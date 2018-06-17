import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import getStore from './getStore';
import Todos from './Containers/Todos';
import registerServiceWorker from './registerServiceWorker';
import './index.css';


const store = getStore();

ReactDOM.render(
  <Provider store={store}>
    <Todos />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
