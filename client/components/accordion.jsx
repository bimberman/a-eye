import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import InfoDropDown from './info-dropdown';

export default function Accordion(props) {
  const [startLongPress, setStartLongPress] = useState(false);
  const onMouseDown = () => setStartLongPress(true);
  const onMouseUp = () => setStartLongPress(false);
  const onTouchStart = () => setStartLongPress(true);
  const onTouchEnd = () => setStartLongPress(false);

  useEffect(() => {
    let timerId;
    if (startLongPress) {
      timerId = setTimeout(() => props.callback(props.dogId, props.dogName, props.breedId), 300);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [props.callback, 300, startLongPress]);

  return (
    <div
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <InfoDropDown
        id={props.dogId}
        imageUrl={props.imageUrl}
        title={props.dogName}
        description={
          <div className='text-center d-flex flex-column'>
            <p>Breed: {props.breedName}</p>
            <p>Short Description: {props.shortDescription}</p>
            <Link className="btn btn-sm btn-light" to="/ViewInfo"
              onClick={() => props.changeCurrentBreed(props.breedName)}>
              <span>{`Learn more about ${props.breedName}s`}</span>
            </Link>
            <Link className="btn btn-sm btn-light" to="/ViewPhotos"
              onClick={() => props.changeCurrentDog()}>
              <span>{`View photos of ${props.dogName}`}</span>
            </Link>
          </div>}
      />
    </div>
  );
}
