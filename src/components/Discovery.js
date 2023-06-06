import Button from "./Button";
import ControlButton, { controlTypes } from "./ControlButton";
import VolumeBar from "./Volume";
import { useContext } from "react";
import ThemeContext, { colorThemeSchema } from "../contexts/ThemeContext";
import './Discovery.scss';
import Toggle from "./Toggle";
import classNames from "classnames";
import PropTypes from "prop-types";

const Discovery = ({className}) => {
  const {theme, updateTheme} = useContext(ThemeContext);

  const onThemeChange = () => updateTheme(theme === colorThemeSchema.dark ? colorThemeSchema.light : colorThemeSchema.dark);

  return (
    <div className={classNames('Discovery', className)}>
      <label className="toggle">
        <Toggle checked={theme === colorThemeSchema.dark} value={theme} onChange={onThemeChange} />
        <span className="toggle-label">Switch to {theme === colorThemeSchema.dark ? colorThemeSchema.light : colorThemeSchema.dark} theme</span>
      </label>


      <h2>Active color theme</h2>
      <p><strong><i>{theme}</i></strong></p>


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

Discovery.propTypes = {
  className: PropTypes.string
};

export default Discovery;