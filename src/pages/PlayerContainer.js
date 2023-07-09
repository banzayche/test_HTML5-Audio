import "./PlayerContainer.scss";
import ControlButton, { controlTypes } from "../components/ui-kit/ControlButton";
import VolumeBar from "../components/ui-kit/Volume";
import CustomButton from "../components/ui-kit/CustomButton";
import StreamsList from "../components/StreamsList";
import { useEffect, useRef, useState } from "react";
import useStore from "../store/PlayerStore";
import { shallow } from "zustand/shallow";
import { v4 as uuid } from "uuid";

const mockedStreams = [
  {
    name: "Galgalatz 91.8 FM",
    src: "https://glzwizzlv.bynetcdn.com/glglz_mp3?",
    id: uuid()
  }, {
    name: "Buffalo",
    src: "http://stream-uk1.radioparadise.com/mp3-192",
    id: uuid(),
  }, {
    name: "ECO99FM",
    src: "http://eco01.livecdn.biz/ecolive/99fm_aac/icecast.audio",
    id: uuid(),
  }, {
    name: "Radio z Kryjivky",
    src: "http://stream.mjoy.ua:8000/radio-z-kryjivky",
    id: uuid(),
  }, {
    name: "Amsterdam Trance",
    src: "http://sc-atr.1.fm:7700/;stream.nsv",
    id: uuid(),
  }, {
    name: "MFM Station",
    src: "http://radio.mfm.ua:8080/online128",
    id: uuid(),
  }, {
    name: "House Nation UK live",
    src: "https://streaming.radio.co/s06bd9d805/listen",
    id: uuid(),
  }, {
    name: "MoveDaHouse",
    src: "https://uk7.internet-radio.com/proxy/movedahouse?mp=/stream;",
    id: uuid(),
  }, {
    name: "Tokyo Deep and Electronic",
    src: "https://uk5.internet-radio.com/proxy/mmr?mp=/stream;",
    id: uuid(),
  }, {
    name: "Psyndora Psytrance",
    src: "https://cast.magicstreams.gr:9111/stream/1/",
    id: uuid(),
  }
];

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
    <div className="Player__container">
      <div className="Player">
        <div className="Player__controlsContainerMain">
          <ControlButton
            disabled={!activeStation.src || isLoading}
            onClick={playPause}
            title={isPlaying ? "Pause" : "Play"}
            controlType={isPlaying ? controlTypes.pause : controlTypes.play}
          />

          <div className="controlsContainerMain__controlsContainerInner">
            <div>
              {isLoading
                ? "...Loading"
                : isPlaying
                  ? activeStation.name
                  : "Chose radio station..."}
            </div>
            <div className="controlsContainerInner__nextPrevVolumeControlsContainer">
              <div className="nextPrevVolumeControlsContainer__prevNextContainer">
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
              <div className="nextPrevVolumeControlsContainer__volumeContainer">
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
          className="Player__showStreamsLink"
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
          className="Player_streamList"
        />
      </div>
    </div>
  );
};

export default PlayerContainer;
