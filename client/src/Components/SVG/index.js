import React, { PureComponent } from 'react';
import PropTypes                from 'prop-types';
import InlineSVG                from 'svg-inline-react';


export default class InlineSvg extends PureComponent {
  static propTypes = {
    type: PropTypes.string.isRequired
  }

  shouldComponentUpdate() {
    return false;
  }

  static getIcon(props) {
    switch (props.type) {
      case 'loader':
        return <InlineSVG { ...props } src={ require("../../Images/Loading/loader.svg") } />;

      default:
        return null;
    }
  }

  render() {
    return this.constructor.getIcon(this.props);
  }
}
