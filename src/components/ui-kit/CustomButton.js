import { memo } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

const mixin = css`
  color: var(--controls);
  border: 1px solid var(--controls);
  background-color: transparent;
  cursor: pointer;
  text-align: center;
  line-height: 30px;
  padding: 0 15px;
  font-size: 14px;
  font-weight: inherit;
  transition: var(--transition);

  &:active {
    transform: scale(.9,.9);
  }
`;

export const linkStyleMixin = css`
  ${mixin};
  opacity: 0.7;
  font-size: 12px;
  font-weight: 400;
  text-align: left;
  color: inherit;
  font-style: oblique;
  display: inline-block;
  width: fit-content;
  letter-spacing: .15rem;
  transition: var(--transition);
  padding: 0;
  text-underline-offset: 5px;
  border: none;

  &:hover {
    opacity: 1;
  }
`;

const StyledButton = styled.button`
  ${mixin};
`;

const StyledLink = styled.a`
  ${linkStyleMixin}
`;

const CustomButton = memo((props) =>
    typeof props.href === 'string' ?
    <StyledLink  {...props} className={classNames('Button', props.className)}>{props.children}</StyledLink> :
    <StyledButton {...props} className={classNames('Button', props.className)}>{props.children}</StyledButton>
);

CustomButton.propTypes = {
  href: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.any
};

export default CustomButton;