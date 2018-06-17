import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import getStore from './getStore';
import App from './Components/App';
import reducers from './Reducers';
import registerServiceWorker from './registerServiceWorker';
import './index.css';


const store = getStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
