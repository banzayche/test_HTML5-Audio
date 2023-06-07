import Button from "./Button";
import { useEffect, useState } from "react";
import {v4 as uuid} from "uuid";
import PropTypes from "prop-types";
import classNames from "classnames";
import './StreamsList.scss';

const mockedStreams = [{
  name: 'uffalo',
  src: 'http://stream-uk1.radioparadise.com/mp3-192',
  id: uuid()
}, {
  name: 'Radio Rocks',
  src: 'http://online-radioroks2.tavrmedia.ua/RadioROKS',
  id: uuid()
}, {
  name: 'Radio z Kryjivky',
  src: 'http://stream.mjoy.ua:8000/radio-z-kryjivky',
  id: uuid()
}, {
  name: 'KissFM_deep',
  src: 'http://online-kissfm.tavrmedia.ua/KissFM_deep',
  id: uuid()
}, {
  name: 'KissFM_digital',
  src: 'http://online-kissfm.tavrmedia.ua/KissFM_digital',
  id: uuid()
}, {
  name: 'KissFM_trance',
  src: 'http://online-kissfm.tavrmedia.ua/KissFM_trance',
  id: uuid()
}, {
  name: 'Amsterdam Trance',
  src: 'http://sc-atr.1.fm:7700/;stream.nsv',
  id: uuid()
}, {
  name: 'MFM Station',
  src: 'http://radio.mfm.ua:8080/online128',
  id: uuid()
}, {
  name: 'LoungeFM',
  src: 'http://cast.loungefm.com.ua/loungefm',
  id: uuid()
}, {
  name: 'Metal Voice',
  src: 'http://www.metalvoice.net:8000/listen',
  id: uuid()
}, {
  name: '12 Panks',
  src: 'http://12punks-high.rautemusik.fm/;stream.nsv',
  id: uuid()
}];

const StreamsList = ({ className, collapsed }) => {

  const [streams, setStreams] = useState([]);

  useEffect(() => {
    setStreams(mockedStreams)
  }, []);

  const selectStream = (e, id) => {
    e.preventDefault();
    console.log(id)
  };

  return (
    <div  className={classNames('StreamsList', className, {'StreamsList--collapsed': !collapsed})}>
      <ul className='StreamsList__listContainer'>
        {streams.map(stream => (
          <li key={stream.id}>
            <Button className='listContainer__streamLink' onClick={(e) => selectStream(e, stream)} href=''>{stream.name}</Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

StreamsList.propTypes = {
  className: PropTypes.string,
  collapsed: PropTypes.bool
}

export default StreamsList;