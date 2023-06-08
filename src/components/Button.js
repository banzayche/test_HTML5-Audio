import classNames from "classnames";
import PropTypes from "prop-types";
import './Button.scss';
import { memo } from "react";

const Button = memo((props) =>
    typeof props.href === 'string' ?
    <a  {...props} className={classNames('Button', 'Button-link', props.className)}>{props.children}</a> :
    <button {...props} className={classNames('Button', props.className)}>{props.children}</button>
);

Button.propTypes = {
  href: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.any
};

export default Button;