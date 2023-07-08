import classNames from "classnames";
import PropTypes from "prop-types";
import './Button.scss';
import { memo } from "react";

const CustomButton = memo(({href, className, children, isLink}) =>
    typeof href === 'string' || isLink ?
    <a className={classNames('Button', 'Button-link', className)}>{children}</a> :
    <button className={classNames('Button', className)}>{children}</button>
);

CustomButton.propTypes = {
  href: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.any,
  isLink: PropTypes.bool
};

export default CustomButton;