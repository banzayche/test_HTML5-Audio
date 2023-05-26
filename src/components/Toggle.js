import PropTypes from "prop-types";
import './Toggle.scss';
import classNames from "classnames";

const Toggle = ({checked, value, onChange, className}) =>
  <div className={classNames('Toggle', className)}>
    <input className="toggle-checkbox" type="checkbox" checked={checked} value={value} onChange={onChange} />
    <div className="toggle-switch"></div>
  </div>;

Toggle.propTypes = {
  checked: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  className: PropTypes.string,
  onChange: PropTypes.func
};

export default Toggle;