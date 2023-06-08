import classNames from "classnames";
import PropTypes from "prop-types";
import './ControlButton.scss';
import { memo } from "react";

export const controlTypes = {
  play: 'play',
  pause: 'pause',
  next: 'next',
  prev: 'prev',
  volumeOn: 'volumeOn',
  volumeOff: 'volumeOff'
};
const ControlButton = memo(({controlType, className,...props}) => <button {...props} className={classNames(`ControlButton ${controlType}`, className)}></button>);

ControlButton.propTypes = {
  controlType: PropTypes.oneOf(Object.keys(controlTypes).map(key => controlTypes[key])).isRequired,
  className: PropTypes.string,
  title: PropTypes.string
};

export default ControlButton;