import './PlayerContainer.scss';
import ControlButton, { controlTypes } from "./ControlButton";
import VolumeBar from "./Volume";
import Button from "./Button";
import StreamsList from "./StreamsList";
import { useEffect, useRef, useState } from "react";
import useStore from "../store/PlayerStore";
import { shallow } from "zustand/shallow";
import { v4 as uuid } from "uuid";

const mockedStreams = [{
  name: 'Buffalo',
  src: 'http://stream-uk1.radioparadise.com/mp3-192',
  id: uuid()
}, {
  name: 'Radio z Kryjivky',
  src: 'http://stream.mjoy.ua:8000/radio-z-kryjivky',
  id: uuid()
}, {
  name: 'Amsterdam Trance',
  src: 'http://sc-atr.1.fm:7700/;stream.nsv',
  id: uuid()
}, {
  name: 'MFM Station',
  src: 'http://radio.mfm.ua:8080/online128',
  id: uuid()
}];

const PlayerContainer = () => {
  const [streamsListCollapsed, setStreamsListCollapsed] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [isMuted, setIsMuted] =useState(false);
  const [isPlay, setIsPlay] = useState(false);
  const [activeStation, setActiveStation, setStations, stationsList] = useStore(
    (state) => [state.activeStation, state.setActiveStation, state.setStations, state.stationsList],
    shallow
  );
  const audio = useRef(new Audio());

  useEffect(() => {
    setStations(mockedStreams);
  }, []);

  useEffect(() => {
    if (activeStation.src) {
      audio.current.src = activeStation.src;
      audio.current.play();
      setIsPlay(!isPlay);
    }
  }, [activeStation]);

  useEffect(() => {
    if (isMuted) {
      audio.current.volume = 0;
    } else {
      audio.current.volume = volume;
    }
    console.log('volume - ', audio.current.volume);
  }, [volume, isMuted]);

  useEffect(() => {
    if (audio.current.src) {
      if (isPlay) audio.current.play();
      else audio.current.pause();
    }
  }, [isPlay]);

  const toggleStreamsList = (e) => {
    e.preventDefault();
    setStreamsListCollapsed(!streamsListCollapsed);
  }

  const setStation = function (station, e) {
    e.preventDefault();
    setActiveStation(station);
  }

  const onVolumeChange = (event) => {
    const newVolume = Number(event.target.value);
    setVolume(newVolume);
  };

  const playPause = () => setIsPlay(!isPlay)

  const onMute = () => {
    setIsMuted(!isMuted);
  }

  return (
    <div className="Player">
      <div className='Player__controlsContainerMain'>
        <ControlButton onClick={playPause} title={isPlay ? 'Play' : 'Pause'} controlType={isPlay ? controlTypes.pause : controlTypes.play} />

        <div className='controlsContainerMain__controlsContainerInner'>
          <div>{activeStation.name || 'Loading...'}</div>
          <div className='controlsContainerInner__nextPrevVolumeControlsContainer'>
            <div className='nextPrevVolumeControlsContainer__prevNextContainer'>
              <ControlButton title='Previous' controlType={controlTypes.prev} />
              <ControlButton title='Next' controlType={controlTypes.next} />
            </div>
            <div className='nextPrevVolumeControlsContainer__volumeContainer'>
              <ControlButton onClick={onMute} title='Volume' controlType={isMuted ? controlTypes.volumeOff : controlTypes.volumeOn} />
              <VolumeBar onVolumeChange={onVolumeChange} volumeValue={volume}></VolumeBar>
            </div>
          </div>
        </div>

      </div>
      <Button onClick={toggleStreamsList} className='Player__showStreamsLink' href='' >{streamsListCollapsed ? 'Hide available streams <-' : 'Show available streams ->' }</Button>

      <StreamsList activeStation={activeStation} selectStream={setStation} streams={stationsList} collapsed={streamsListCollapsed} className='Player_streamList' />
    </div>
  );
};

export default PlayerContainer;