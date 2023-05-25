import Button from "./Button";
import ControlButton, { controlTypes } from "./ControlButton";

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

      <h2>Control Buttons</h2>
      <p>
        Play button:
        <ControlButton className="Discovery-custom-button" title='Play' controlType={controlTypes.play}></ControlButton>
      </p>
      <p>
        Pause button:
        <ControlButton className="Discovery-custom-button" title='Pause' controlType={controlTypes.pause}></ControlButton>
      </p>
      <p>
        Next button:
        <ControlButton className="Discovery-custom-button" title='Next' controlType={controlTypes.next}></ControlButton>
      </p>
      <p>
        Previous button:
        <ControlButton className="Discovery-custom-button" title='Previous' controlType={controlTypes.prev}></ControlButton>
      </p>
      <p>
        Volume-on button:
        <ControlButton className="Discovery-custom-button" title='Volume' controlType={controlTypes.volumeOn}></ControlButton>
      </p>
      <p>
        Volume-off button:
        <ControlButton className="Discovery-custom-button" title='Volume' controlType={controlTypes.volumeOff}></ControlButton>
      </p>
    </div>
  );
}

export default Discovery;