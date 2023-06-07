import './PlayerContainer.scss';
import ControlButton, { controlTypes } from "./ControlButton";
import VolumeBar from "./Volume";
import Button from "./Button";
import StreamsList from "./StreamsList";
import { useState } from "react";
const PlayerContainer = () => {
  const [streamsListCollapsed, setStreamsListCollapsed] = useState(false);
  const toggleStreamsList = (e) => {
    e.preventDefault();
    setStreamsListCollapsed(!streamsListCollapsed);
  }

  return (
    <div className="Player">
      <div className='Player__controlsContainerMain'>
        <ControlButton title='Play' controlType={controlTypes.play} />

        <div className='controlsContainerMain__controlsContainerInner'>
          <div>Loading...</div>
          <div className='controlsContainerInner__nextPrevVolumeControlsContainer'>
            <div className='nextPrevVolumeControlsContainer__prevNextContainer'>
              <ControlButton title='Previous' controlType={controlTypes.prev} />
              <ControlButton title='Next' controlType={controlTypes.next} />
            </div>
            <div className='nextPrevVolumeControlsContainer__volumeContainer'>
              <ControlButton title='Volume' controlType={controlTypes.volumeOn} />
              <VolumeBar volumeValue={30}></VolumeBar>
            </div>
          </div>
        </div>

      </div>
      <Button onClick={toggleStreamsList} className='Player__showStreamsLink' href='' >{streamsListCollapsed ? 'Hide available streams <-' : 'Show available streams ->' }</Button>

      <StreamsList collapsed={streamsListCollapsed} className='Player_streamList' />
    </div>
  );
};

export default PlayerContainer;