import PropTypes from "prop-types";
import classNames from "classnames";
import { memo, useCallback } from "react";
import styled from "styled-components";
import CustomButton from "./ui-kit/CustomButton";

const StyledStreamList = styled.div`
  max-height: 400px;
  overflow: auto;
  transition: max-height 0.5s ease-in;

  &.collapsed{
    max-height: 0;
    transition: max-height 0.5s ease-out,
    overflow 0.5s ease-out;
    overflow: hidden;
  }

  .listContainer {
    list-style: none;
    padding-top: 5px;
    padding-left: 0;
    height: 100%;

    .streamLink{
      text-decoration: none;
      font-style: normal;
      text-underline-offset: 5px;
      color: inherit;
      padding-left: 5px;

      &:hover {
        text-decoration: underline;
        color: var(--controls);
      }

      &.active {
        text-decoration: underline;
        color: var(--controls);
      }
    }
  }
`;

const StreamsList = memo(({ className, collapsed, streams, selectStream, activeStation }) => {
  const onStreamClick = useCallback(selectStream, [selectStream]);

  return (
    <StyledStreamList  className={classNames('StreamsList', className, {collapsed: !collapsed})}>
      <ul className='listContainer'>
        {streams.map(stream => (
          <li key={stream.id}>
            <CustomButton
              className={classNames('streamLink', {'active': stream.id === activeStation.id})}
              onClick={onStreamClick.bind(null, stream)} href=''>
              {stream.name}
            </CustomButton>
          </li>
        ))}
      </ul>
    </StyledStreamList>
  );
});

StreamsList.propTypes = {
  className: PropTypes.string,
  collapsed: PropTypes.bool,
  streams: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    src: PropTypes.string,
    id: PropTypes.string
  })),
  selectStream: PropTypes.func,
  activeStation: PropTypes.shape({
    name: PropTypes.string,
    src: PropTypes.string,
    id: PropTypes.string
  })
}

export default StreamsList;