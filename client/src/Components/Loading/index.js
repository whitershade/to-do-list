import React, { Component } from 'react';
import SVG from '../SVG';
import './styles.css';


class Loading extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div styleName='loader'>
        <SVG type='loader' />
      </div>
    );
  }
}


export default Loading;
