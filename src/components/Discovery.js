import Button from "./Button";
import ControlButton, { controlTypes } from "./ControlButton";
import VolumeBar from "./Volume";

const Discovery = () => {
  return (
    <div className="Discovery">
      <h2>Logo</h2>
      <div style={{background: '#f6f6f6', display: 'inline-block'}}>
        ...
      </div>

      <h2>Buttons</h2>
      <p>
        Button with onClick:{' '}
        <Button onClick={() => alert('ouch')}>Click me</Button>
      </p>
      <p>
        A link: <Button href="https://reactjs.org/">Follow me</Button>
      </p>
      <p>
        Custom class name:{' '}
        <Button className="Discovery-custom-button">I do nothing</Button>
      </p>

      <h2>Controls</h2>
      <p>
        Play button:
        <ControlButton title='Play' controlType={controlTypes.play}></ControlButton>
      </p>
      <p>
        Pause button:
        <ControlButton title='Pause' controlType={controlTypes.pause}></ControlButton>
      </p>
      <p>
        Next button:
        <ControlButton title='Next' controlType={controlTypes.next}></ControlButton>
      </p>
      <p>
        Previous button:
        <ControlButton title='Previous' controlType={controlTypes.prev}></ControlButton>
      </p>
      <p>
        Volume-on button:
        <ControlButton title='Volume' controlType={controlTypes.volumeOn}></ControlButton>
      </p>
      <p>
        Volume-off button:
        <ControlButton title='Volume' controlType={controlTypes.volumeOff}></ControlButton>
      </p>
      <p>
        Volume:
        <VolumeBar volumeValue={30}></VolumeBar>
      </p>
    </div>
  );
}

export default Discovery;