import PropTypes from "prop-types";
import classNames from "classnames";
import styled from "styled-components";

const StyledToggle = styled.div`
  cursor: pointer;
  display: inline-block;
  margin: 10px 20px 10px 0;

  .toggle-switch {
    display: inline-block;
    background: transparent;
    box-sizing: border-box;
    border: 1px solid var(--controls);
    border-radius: 12px;
    width: 45px;
    height: 23px;
    position: relative;
    vertical-align: middle;
    transition: background 0.25s;
  }
  .toggle-switch:before, .toggle-switch:after {
    content: "";
  }
  .toggle-switch:before {
    box-sizing: border-box;
    display: block;
    background: linear-gradient(to bottom, #fff 0%, #eee 100%);
    border-radius: 50%;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25);
    width: 15px;
    height: 15px;
    position: absolute;
    top: 3px;
    left: 3px;
    transition: left 0.25s;
  }
  .Toggle:hover .toggle-switch:before {
    background: linear-gradient(to bottom, #fff 0%, #fff 100%);
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.5);
  }
  .toggle-checkbox:checked + .toggle-switch {
    background: var(--controls);
  }
  .toggle-checkbox:checked + .toggle-switch:before {
    left: 26px;
  }

  .toggle-checkbox {
    position: absolute;
    visibility: hidden;
  }
`;

const Toggle = ({checked, value, onChange, className}) =>
  <StyledToggle className={classNames('Toggle', className)}>
    <input className="toggle-checkbox" type="checkbox" checked={checked} value={value} onChange={onChange} />
    <div className="toggle-switch"></div>
  </StyledToggle>;

Toggle.propTypes = {
  checked: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  className: PropTypes.string,
  onChange: PropTypes.func
};

export default Toggle;