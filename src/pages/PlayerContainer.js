import ControlButton, { controlTypes } from "../components/ui-kit/ControlButton";
import VolumeBar from "../components/ui-kit/Volume";
import CustomButton from "../components/ui-kit/CustomButton";
import StreamsList from "../components/StreamsList";
import { useEffect, useRef, useState } from "react";
import useStore from "../store/PlayerStore";
import { shallow } from "zustand/shallow";
import { mockedStreams } from '../streams';
import styled from "styled-components";

const StyledPlayerContainer = styled.div`
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  min-height: 555px;

  .Player {
    width: 400px;
    border: 1px solid var(--controls);
    padding: 25px;
    margin-top: -200px;


    display: flex;
    flex-direction: column;

    .controlsContainerMain {
      display: flex;
      flex-direction: row;

      .controlsContainerInner {
        padding: 0 0 0 30px;
        flex-grow: 2;

        .nextPrevVolumeControlsContainer {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;

          .prevNextContainer {
            [title='Previous'] {
              margin-right: 15px;
            }
          }

          .volumeContainer {
            display: flex;
            flex-direction: row;
            align-items: center;
          }
        }
      }
    }

    .showStreamsLink {
      opacity: 0.7;
      font-size: 12px;
      font-weight: 200;
      text-align: left;
      margin: 20px 0 0 0;
      color: inherit;
      font-style: oblique;
      display: inline-block;
      width: fit-content;
      letter-spacing: .15rem;
      transition: var(--transition);
      padding: 0;
      text-underline-offset: 5px;

      &:hover {
        opacity: 1;
      }
    }
  }
`;

const PlayerContainer = () => {
  const defaultVolume = 0.3;
  const volumeCoef = 0.01;

  const [streamsListOpened, setStreamsListOpened] = useState(true);
  const [volume, setVolume] = useState(defaultVolume);
  const [volumeSnapshot, setVolumeSnapshot] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audio = useRef(null);

  const [activeStation, setActiveStation, setStations, stationsList] = useStore(
    (state) => [
      state.activeStation,
      state.setActiveStation,
      state.setStations,
      state.stationsList,
    ],
    shallow
  );

  useEffect(() => {
    setStations(mockedStreams);
    audio.current = new Audio();
    const listener = () => {
      setIsLoading(false);
      setIsPlaying(true);
    };
    audio.current.addEventListener("canplay", listener);

    return () => {
      audio.current.pause();
      audio.current.src = '';
      audio.current.load();
      audio.current.removeEventListener("canplay", listener);
    };
  }, []);

  useEffect(() => {
    if (activeStation.src) {
      setIsLoading(true);
      setIsPlaying(false);
      audio.current.src = activeStation.src;
    }
  }, [activeStation]);

  useEffect(() => {
    if (volume > volumeCoef) {
      setVolumeSnapshot(0);
      audio.current.volume = volume;
    } else {
      audio.current.volume = 0;
    }
  }, [volume]);

  useEffect(() => {
    if (audio.current.src) {
      if (isPlaying) audio.current.play();
      else audio.current.pause();
    }
  }, [isPlaying]);

  const toggleStreamsList = (e) => {
    e.preventDefault();
    setStreamsListOpened(!streamsListOpened);
  };

  const onStationSelect = function (station, e) {
    e.preventDefault();
    setActiveStation(station);
  };

  const onVolumeChange = (event) => {
    const newVolume = Number(event.target.value);
    setVolume(newVolume);
  };

  const playPause = () => setIsPlaying(!isPlaying);

  const onMute = () => {
    if (volumeSnapshot) {
      setVolume(volumeSnapshot);
      setVolumeSnapshot(0);
    } else {
      setVolumeSnapshot(volume);
      setVolume(0);
    }
  };

  const setPrevStation = () => {
    let index =
      stationsList.findIndex((station) => station.id === activeStation.id) - 1;
    if (index === -2) return;
    if (index === -1) index = stationsList.length - 1;
    setActiveStation(stationsList[index]);
  };

  const setNextStation = () => {
    let index =
      stationsList.findIndex((station) => station.id === activeStation.id) + 1;
    if (index === 0) return;
    if (index === stationsList.length) index = 0;
    setActiveStation(stationsList[index]);
  };

  return (
    <StyledPlayerContainer className="PlayerСontainer">
      <div className="Player">
        <div className="controlsContainerMain">
          <ControlButton
            disabled={!activeStation.src || isLoading}
            onClick={playPause}
            title={isPlaying ? "Pause" : "Play"}
            controlType={isPlaying ? controlTypes.pause : controlTypes.play}
          />

          <div className="controlsContainerInner">
            <div>
              {isLoading
                ? "...Loading"
                : isPlaying || activeStation.src
                    ? activeStation.name
                    : "Chose radio station..."}
            </div>
            <div className="nextPrevVolumeControlsContainer">
              <div className="prevNextContainer">
                <ControlButton
                  disabled={!activeStation.src || isLoading}
                  onClick={setPrevStation}
                  title="Previous"
                  controlType={controlTypes.prev}
                />
                <ControlButton
                  disabled={!activeStation.src || isLoading}
                  onClick={setNextStation}
                  title="Next"
                  controlType={controlTypes.next}
                />
              </div>
              <div className="volumeContainer">
                <ControlButton
                  onClick={onMute}
                  title="Volume"
                  controlType={
                    volume <= volumeCoef
                      ? controlTypes.volumeOff
                      : controlTypes.volumeOn
                  }
                />
                <VolumeBar
                  onVolumeChange={onVolumeChange}
                  volumeValue={volume}
                ></VolumeBar>
              </div>
            </div>
          </div>
        </div>
        <CustomButton
          onClick={toggleStreamsList}
          className="showStreamsLink"
          href=''
        >
          {streamsListOpened
            ? "Hide available streams <-"
            : "Show available streams ->"}
        </CustomButton>

        <StreamsList
          activeStation={activeStation}
          selectStream={onStationSelect}
          streams={stationsList}
          collapsed={streamsListOpened}
        />
      </div>
    </StyledPlayerContainer>
  );
};

export default PlayerContainer;
