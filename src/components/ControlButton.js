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
const ControlButton = memo(({controlType, className, disabled, ...props}) => <button {...props} disabled={disabled} className={classNames(`ControlButton ${controlType}`, className)}></button>);

ControlButton.propTypes = {
  controlType: PropTypes.oneOf(Object.keys(controlTypes).map(key => controlTypes[key])).isRequired,
  className: PropTypes.string,
  title: PropTypes.string,
  disabled: PropTypes.bool
};

export default ControlButton;