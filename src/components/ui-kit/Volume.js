import { memo, useCallback } from 'react';
import PropTypes from "prop-types";
import classNames from "classnames";
import styled from "styled-components";

const StyledVolume = styled.input.attrs({
  type: "range",
  min: 0,
  max: 1,
  step: '0.01'
})`
  &[type="range"] {
    display: inline-block;
    -webkit-appearance: none;
    background-color: var(--dark-mode-text);
    height: 1px;
    border-radius: 5px;
    outline: 0;
    width: 70px;

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      background-color: var(--controls);
      width: 10px;
      height: 10px;
      border-radius: 50%;
      border: 1px solid white;
      cursor: pointer;
      transition: var(--transition);

      &:hover {
        background-color: white;
        border: 1px solid var(--controls);
      }
      &:active {
        transform: scale(1.2);
      }
    }
  }
`;

const VolumeBar = memo(({volumeValue, className, onVolumeChange, ...props}) => {
  const handleVolumeChange = useCallback(onVolumeChange, [onVolumeChange]);

  return (
      <StyledVolume
        {...props}
        className={classNames(`VolumeBar`, className)}
        value={volumeValue}
        onChange={handleVolumeChange}
      />
  );
});

VolumeBar.propTypes = {
  volumeValue: PropTypes.number.isRequired,
  className: PropTypes.string,
  title: PropTypes.string,
  onVolumeChange: PropTypes.func
};

export default VolumeBar;