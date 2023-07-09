import { memo, useCallback } from 'react';
import PropTypes from "prop-types";
import classNames from "classnames";
import './Volume.scss';

const VolumeBar = memo(({volumeValue, className, onVolumeChange, ...props}) => {
  const handleVolumeChange = useCallback(onVolumeChange, [onVolumeChange]);

  return (
      <input
        {...props}
        className={classNames(`VolumeBar`, className)}
        type="range"
        min={0}
        max={1}
        step='0.01'
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