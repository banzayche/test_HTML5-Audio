import './PlayerContainer.scss';
import ControlButton, { controlTypes } from "./ControlButton";
import VolumeBar from "./Volume";
import Button from "./Button";
const PlayerContainer = () => {
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
      <Button className='Player__showStreamsLink' href='' >Show available streams -&gt;</Button>
    </div>
  );
};

export default PlayerContainer;