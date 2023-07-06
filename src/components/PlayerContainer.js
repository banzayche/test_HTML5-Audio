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
  const [volumeSnapshot, setVolumeSnapshot] = useState(0.05);
  const [isPlay, setIsPlay] = useState(false);
  const [activeStation, setActiveStation, setStations, stationsList] = useStore(
    (state) => [state.activeStation, state.setActiveStation, state.setStations, state.stationsList],
    shallow
  );
  const audio = useRef(new Audio());

  useEffect(() => {
    setStations(mockedStreams);
    const listener = () => setIsPlay(true);
    const pauseListener = () => setIsPlay(false);
    audio.current.addEventListener('canplay', listener);
    audio.current.addEventListener("pause", pauseListener);
    audio.current.addEventListener("play", listener);

    return () => {
      audio.current.removeEventListener('canplay', listener);
      audio.current.removeEventListener('pause', pauseListener);
      audio.current.removeEventListener('play', listener);
    }
  }, []);

  useEffect(() => {
    if (activeStation.src) {
      setIsPlay(false);
      audio.current.src = activeStation.src;
    }
  }, [activeStation]);

  useEffect(() => {
    if (volume > 0.05) {
      setVolumeSnapshot(0);
      audio.current.volume = volume;
    } else {
      audio.current.volume = volume;
    }
  }, [volume]);

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

  const onStationSelect = function (station, e) {
    e.preventDefault();
    setActiveStation(station);
  }

  const onVolumeChange = (event) => {
    const newVolume = Number(event.target.value);
    setVolume(newVolume);
  };

  const playPause = () => setIsPlay(!isPlay)

  const onMute = () => {
    if (volumeSnapshot <= 0.05) {
      setVolumeSnapshot(volume);
      setVolume(0.05)
    } else {
      setVolume(volumeSnapshot);
      setVolumeSnapshot(0.05);
    }
  }

  const setPrevStation = () => {
    let index = stationsList.findIndex(station => station.id === activeStation.id) - 1;
    if (index === -2) return;
    if (index === -1) index = stationsList.length - 1;
    setActiveStation(stationsList[index]);
  }

  const setNextStation = () => {
    let index = stationsList.findIndex(station => station.id === activeStation.id) + 1;
    if (index === 0) return;
    if (index === stationsList.length) index = 0;
    setActiveStation(stationsList[index]);
  }

  return (
    <div className="Player">
      <div className='Player__controlsContainerMain'>
        <ControlButton disabled={!activeStation.src} onClick={playPause} title={isPlay ? 'Play' : 'Pause'} controlType={isPlay ? controlTypes.pause : controlTypes.play} />

        <div className='controlsContainerMain__controlsContainerInner'>
          <div>{activeStation.name || 'Chose radio station...'}</div>
          <div className='controlsContainerInner__nextPrevVolumeControlsContainer'>
            <div className='nextPrevVolumeControlsContainer__prevNextContainer'>
              <ControlButton disabled={!activeStation.src} onClick={setPrevStation} title='Previous' controlType={controlTypes.prev} />
              <ControlButton disabled={!activeStation.src} onClick={setNextStation} title='Next' controlType={controlTypes.next} />
            </div>
            <div className='nextPrevVolumeControlsContainer__volumeContainer'>
              <ControlButton  onClick={onMute} title='Volume' controlType={volume <= 0.05 ? controlTypes.volumeOff : controlTypes.volumeOn} />
              <VolumeBar onVolumeChange={onVolumeChange} volumeValue={volume}></VolumeBar>
            </div>
          </div>
        </div>

      </div>
      <Button onClick={toggleStreamsList} className='Player__showStreamsLink' href='' >{streamsListCollapsed ? 'Hide available streams <-' : 'Show available streams ->' }</Button>

      <StreamsList activeStation={activeStation} selectStream={onStationSelect} streams={stationsList} collapsed={streamsListCollapsed} className='Player_streamList' />
    </div>
  );
};

export default PlayerContainer;