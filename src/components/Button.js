import classNames from "classnames";
import PropTypes from "prop-types";

const Button = (props) => props.href ? (
      <a  {...props} className={classNames('Button', props.className)}>{props.children}</a>
    ) : (
    <button {...props} className={classNames('Button', props.className)}>{props.children}</button>
  );

Button.propTypes = {
  href: PropTypes.string,
};

export default Button;