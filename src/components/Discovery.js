import Button from "./Button";
import ControlButton, { controlTypes } from "./ControlButton";
import VolumeBar from "./Volume";
import { useContext, useState } from "react";
import ThemeContext, { colorThemeSchema } from "../contexts/ThemeContext";
import "./Discovery.scss";
import Toggle from "./Toggle";
import classNames from "classnames";
import PropTypes from "prop-types";
import DiscoveryCard from "./DiscoveryCard";

const Discovery = ({ className }) => {
  const { theme, updateTheme } = useContext(ThemeContext);
  const [volume, setVolume] = useState(0.5);

  const onThemeChange = () =>
    updateTheme(
      theme === colorThemeSchema.dark
        ? colorThemeSchema.light
        : colorThemeSchema.dark
    );


  return (
    <div className={classNames("Discovery", className)}>
      <h2>Active color theme <small><i>_{theme}_</i></small></h2>

      <DiscoveryCard
        exampleUsageCode={`
        <label className="toggle">
          <Toggle
            checked={theme === colorThemeSchema.dark}
            value={theme}
            onChange={onThemeChange}
          />
          <span className="toggle-label">
            Switch to{" "}
            {theme === colorThemeSchema.dark
              ? colorThemeSchema.light
              : colorThemeSchema.dark}{" "}
            theme
          </span>
        </label>
        `}
        sectionName={'Toggle'}
        exampleName={'Toggle component usage'}
        description={'Toggle component is a user interface element that allows users to switch between two states or options. It is commonly used to represent an on/off switch or to control the visibility of content.\n' +
                       '\n' +
                       'A toggle component typically consists of a visual representation, such as a sliding button or a checkbox, and it maintains an internal state to track the current state of the toggle. When the user interacts with the toggle, it triggers an event or updates a value to reflect the new state.'}
      >
        <label className="toggle">
          <Toggle
            checked={theme === colorThemeSchema.dark}
            value={theme}
            onChange={onThemeChange}
          />
          <span className="toggle-label">
            Switch to{" "}
                    {theme === colorThemeSchema.dark
                      ? colorThemeSchema.light
                      : colorThemeSchema.dark}{" "}
                    theme
          </span>
        </label>
      </DiscoveryCard>

      <DiscoveryCard
        exampleUsageCode={`
        <Button onClick={() => alert("I'm open for new roles.")}>
          Click me
        </Button>
        `}
        sectionName={'Buttons'}
        description={'Button with onClick'}>
        <Button onClick={() => alert("I'm open for new roles.")}>
          Click me
        </Button>
      </DiscoveryCard>
      <DiscoveryCard
        exampleUsageCode={`
        <Button href="https://github.com/banzayche" target="_blank">
          Follow me
        </Button>
        `}
        description={'Button as link'}>
        <Button href="https://github.com/banzayche" target="_blank">
          Follow me
        </Button>
      </DiscoveryCard>
      <DiscoveryCard
        exampleUsageCode={`
        <Button className="Discovery-custom-button">Simple button</Button>
        `}
        description={'Button with custom className'}>
        <Button className="Discovery-custom-button">Simple button</Button>
      </DiscoveryCard>


      <DiscoveryCard
        exampleUsageCode={`
        <ControlButton
          title="Play"
          controlType={controlTypes.play}
        ></ControlButton>
        `}
        sectionName={'Controls'}
        description={'Play control'}>
        <ControlButton
          title="Play"
          controlType={controlTypes.play}
        ></ControlButton>
      </DiscoveryCard>
      <DiscoveryCard
        exampleUsageCode={`
        <ControlButton
          title="Pause"
          controlType={controlTypes.pause}
        ></ControlButton>
        `}
        description={'Pause control'}>
        <ControlButton
          title="Pause"
          controlType={controlTypes.pause}
        ></ControlButton>
      </DiscoveryCard>
      <DiscoveryCard
        exampleUsageCode={`
        <ControlButton
          title="Next"
          controlType={controlTypes.next}
        ></ControlButton>
        `}
        description={'Next control'}>
        <ControlButton
          title="Next"
          controlType={controlTypes.next}
        ></ControlButton>
      </DiscoveryCard>
      <DiscoveryCard
        exampleUsageCode={`
        <ControlButton
          title="Previous"
          controlType={controlTypes.prev}
        ></ControlButton>
        `}
        description={'Previous control'}>
        <ControlButton
          title="Previous"
          controlType={controlTypes.prev}
        ></ControlButton>
      </DiscoveryCard>
      <DiscoveryCard
        exampleUsageCode={`
        <ControlButton
          title="Volume"
          controlType={controlTypes.volumeOn}
        ></ControlButton>
        `}
        description={'Volume On control'}>
        <ControlButton
          title="Volume"
          controlType={controlTypes.volumeOn}
        ></ControlButton>
      </DiscoveryCard>
      <DiscoveryCard
        exampleUsageCode={`
        <ControlButton
          title="Volume"
          controlType={controlTypes.volumeOff}
        ></ControlButton>
        `}
        description={'Volume Off control'}>
        <ControlButton
          title="Volume"
          controlType={controlTypes.volumeOff}
        ></ControlButton>
      </DiscoveryCard>
      <DiscoveryCard
        exampleUsageCode={`
        <VolumeBar 
          volumeValue={volume} 
          onVolumeChange={(e) => setVolume(e.target.value)}
        ></VolumeBar>
        `}
        description={'Volume slider'}>
        <VolumeBar volumeValue={volume} onVolumeChange={(e) => setVolume(Number(e.target.value))}></VolumeBar>
      </DiscoveryCard>
    </div>
  );
};

Discovery.propTypes = {
  className: PropTypes.string,
};

export default Discovery;
