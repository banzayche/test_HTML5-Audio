import CustomButton from "./CustomButton";
import PropTypes from "prop-types";
import classNames from "classnames";
import './StreamsList.scss';
import { memo, useCallback } from "react";



const StreamsList = memo(({ className, collapsed, streams, selectStream, activeStation }) => {

  const onStreamClick = useCallback(selectStream, [selectStream]);

  return (
    <div  className={classNames('StreamsList', className, {'StreamsList--collapsed': !collapsed})}>
      <ul className='StreamsList__listContainer'>
        {streams.map(stream => (
          <li key={stream.id}>
            <CustomButton className={classNames('listContainer__streamLink', {'listContainer__streamLink--active': stream.id === activeStation.id})} onClick={onStreamClick.bind(null, stream)} href=''>{stream.name}</CustomButton>
          </li>
        ))}
      </ul>
    </div>
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