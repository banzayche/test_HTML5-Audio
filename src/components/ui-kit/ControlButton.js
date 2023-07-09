import { memo } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import pauseImg from '../../assets/pause.png';
import nextImg from '../../assets/next.png';
import prevImg from '../../assets/prev.png';
import volumeImg from '../../assets/volume.png';
import mutedImg from '../../assets/muted.png';
import playImg from '../../assets/play.png';

const playPauseMixin = css`
  width: 50px;
  height: 50px;
  border:1px solid var(--controls);
  border-radius:0;
  background-repeat: no-repeat;
  transition: var(--transition);
  background-size: 100% 100%;
  cursor:pointer;
`;

const nextPrevMixin = css`
  height: 25px;
  width:25px;
  background-size:100% 100%;
  cursor: pointer;
  border: none;
  transition: var(--transition);
`;

const volumeMixin = css`
  height: 25px;
  width: 25px;
  cursor: pointer;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  border: none;
  transition: var(--transition);
`;

const StyledButton = styled.button`
  background-color: transparent;

  &[disabled] {
    cursor: not-allowed !important;
  }

  &:active {
    transform: scale(.9,.9);
  }

  &.play{
    ${playPauseMixin};
    background-image: url(${playImg});

    &:hover:not([disabled]) {
      border-radius:50%;
    }
  }
  
  &.pause{
    ${playPauseMixin};
    background-image: url(${pauseImg});
    border-radius:50%;
  }
  
  &.next{
    ${nextPrevMixin};
    background-image: url(${nextImg});
  }
  &.prev{
    ${nextPrevMixin};
    background-image: url(${prevImg});
  }

  &.volumeOn{
    ${volumeMixin};
    background-image: url(${volumeImg});
  }
  &.volumeOff{
    ${volumeMixin};
    background-image: url(${mutedImg});
  }
`;

export const controlTypes = {
  play: 'play',
  pause: 'pause',
  next: 'next',
  prev: 'prev',
  volumeOn: 'volumeOn',
  volumeOff: 'volumeOff'
};
const ControlButton = memo(({controlType, className, disabled, ...props}) =>
  <StyledButton {...props} disabled={disabled} className={classNames(`ControlButton ${controlType}`, className)}></StyledButton>);

ControlButton.propTypes = {
  controlType: PropTypes.oneOf(Object.keys(controlTypes).map(key => controlTypes[key])).isRequired,
  className: PropTypes.string,
  title: PropTypes.string,
  disabled: PropTypes.bool
};

export default ControlButton;