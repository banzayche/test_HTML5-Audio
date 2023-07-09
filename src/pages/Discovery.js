import { useContext, useState } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import styled from "styled-components";

import CustomButton from "../components/ui-kit/CustomButton";
import ControlButton, { controlTypes } from "../components/ui-kit/ControlButton";
import VolumeBar from "../components/ui-kit/Volume";
import Toggle from "../components/ui-kit/Toggle";
import ThemeContext, { colorThemeSchema } from "../contexts/ThemeContext";
import DiscoveryCard from "../components/DiscoveryCard";
import DiscoverySection from "../components/DiscoverySection";
import { themeMixin } from "../index";

const StyledDiscovery = styled.div`
  ${themeMixin};
  height: 100%;
  padding: 50px 40px 100px 40px;
  overflow: auto;
`;

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
    <StyledDiscovery className={classNames("Discovery", className)}>
      <DiscoverySection sectionName="Toggle" description={'Toggle component is a user interface element that allows users to switch between two states or options. It is commonly used to represent an on/off switch or to control the visibility of content.\n' +
        '\n' +
        'A toggle component typically consists of a visual representation, such as a sliding button or a checkbox, and it maintains an internal state to track the current state of the toggle. When the user interacts with the toggle, it triggers an event or updates a value to reflect the new state.'}
      >
        <DiscoveryCard
          theme={theme}
          exampleUsageCode={`
        <label className="toggle">
          <Toggle
            checked={theme === colorThemeSchema.dark}
            value={theme}
            onChange={onThemeChange}
          />
          <span className="toggle-label">
            Switch to {theme === colorThemeSchema.dark
                      ? colorThemeSchema.light
                      : colorThemeSchema.dark} theme
          </span>
        </label>
        `}
          exampleName="Toggle component">
          <label className="toggle">
            <Toggle
              checked={theme === colorThemeSchema.dark}
              value={theme}
              onChange={onThemeChange}
            />
            <span className="toggle-label">
            Switch to {theme === colorThemeSchema.dark
              ? colorThemeSchema.light
              : colorThemeSchema.dark} theme
          </span>
          </label>
        </DiscoveryCard>
      </DiscoverySection>

      <DiscoverySection
        description={'Buttons section in our components library provides an examples of using Button component in designed way.'}
        sectionName="Buttons">
        <DiscoveryCard
          theme={theme}
          exampleName="Button with action"
          exampleUsageCode={`
        <Button onClick={() => alert("I'm open for new roles.")}>
          Click me
        </Button>
        `}>
          <CustomButton onClick={() => alert("I'm open for new roles.")}>
            Click me
          </CustomButton>
        </DiscoveryCard>
        <DiscoveryCard
          theme={theme}
          exampleName="Link button"
          exampleUsageCode={`
        <Button href="https://github.com/banzayche" target="_blank">
          Follow me
        </Button>
        `}>
          <CustomButton href="https://github.com/banzayche" target="_blank">
            Follow me
          </CustomButton>
        </DiscoveryCard>
        <DiscoveryCard
          theme={theme}
          exampleName="Simple example of button"
          exampleUsageCode={`
        <Button className="Discovery-custom-button">Simple button</Button>
        `}>
          <CustomButton className="Discovery-custom-button">Simple button</CustomButton>
        </DiscoveryCard>
      </DiscoverySection>


      <DiscoverySection
        description={'The Audio Player Controls section in our components library provides a set of reusable UI components specifically designed for controlling audio playback. These components offer a user-friendly interface to enhance the audio playback experience and enable users to interact with audio content in various ways.'}
        sectionName="Controls"
      >
        <DiscoveryCard
          theme={theme}
          exampleName="Play button"
          exampleUsageCode={`
          <ControlButton
            title="Play"
            controlType={controlTypes.play}
          ></ControlButton>
          `}>
          <ControlButton
            title="Play"
            controlType={controlTypes.play}
          ></ControlButton>
        </DiscoveryCard>
        <DiscoveryCard
          theme={theme}
          exampleName="Pause button"
          exampleUsageCode={`
          <ControlButton
            title="Pause"
            controlType={controlTypes.pause}
          ></ControlButton>
          `}>
          <ControlButton
            title="Pause"
            controlType={controlTypes.pause}
          ></ControlButton>
        </DiscoveryCard>
        <DiscoveryCard
          theme={theme}
          exampleName="Next track button"
          exampleUsageCode={`
          <ControlButton
            title="Next"
            controlType={controlTypes.next}
          ></ControlButton>
          `}>
          <ControlButton
            title="Next"
            controlType={controlTypes.next}
          ></ControlButton>
        </DiscoveryCard>
        <DiscoveryCard
          theme={theme}
          exampleName="Previous track button"
          exampleUsageCode={`
          <ControlButton
            title="Previous"
            controlType={controlTypes.prev}
          ></ControlButton>
          `}>
          <ControlButton
            title="Previous"
            controlType={controlTypes.prev}
          ></ControlButton>
        </DiscoveryCard>
        <DiscoveryCard
          theme={theme}
          exampleName="Volume on button"
          exampleUsageCode={`
          <ControlButton
            title="Volume"
            controlType={controlTypes.volumeOn}
          ></ControlButton>
          `}>
          <ControlButton
            title="Volume"
            controlType={controlTypes.volumeOn}
          ></ControlButton>
        </DiscoveryCard>
        <DiscoveryCard
          theme={theme}
          exampleName="Volume muted button"
          exampleUsageCode={`
          <ControlButton
            title="Volume"
            controlType={controlTypes.volumeOff}
          ></ControlButton>
          `}>
          <ControlButton
            title="Volume"
            controlType={controlTypes.volumeOff}
          ></ControlButton>
        </DiscoveryCard>
        <DiscoveryCard
          theme={theme}
          exampleName="Volume bar"
          exampleUsageCode={`
        <VolumeBar 
          volumeValue={volume} 
          onVolumeChange={(e) => setVolume(e.target.value)}
        ></VolumeBar>
        `}>
          <VolumeBar volumeValue={volume} onVolumeChange={(e) => setVolume(Number(e.target.value))}></VolumeBar>
        </DiscoveryCard>
      </DiscoverySection>
    </StyledDiscovery>
  );
};

Discovery.propTypes = {
  className: PropTypes.string,
};

export default Discovery;
