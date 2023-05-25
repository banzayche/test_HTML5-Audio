import { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import classNames from "classnames";
import './Volume.scss';

const VolumeBar = ({volumeValue, className, ...props}) => {
  const [volume, setVolume] = useState(100);

  useEffect(() => {
    setVolume(volumeValue);
  }, [volumeValue]);
  const handleVolumeChange = (event) => {
    const newVolume = Number(event.target.value);
    setVolume(newVolume);
  };

  return (
    <>
      <input
        {...props}
        className={classNames(`VolumeBar`, className)}
        type="range"
        min={0}
        max={100}
        value={volume}
        onChange={handleVolumeChange}
      />
    </>
  );
};

VolumeBar.propTypes = {
  volumeValue: PropTypes.number.isRequired,
  className: PropTypes.string,
  title: PropTypes.string
};

export default VolumeBar;