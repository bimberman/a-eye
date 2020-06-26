import React, { useState, useEffect } from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import { Link } from 'react-router-dom';

export default function Accordion(props) {
  const [startLongPress, setStartLongPress] = useState(false);
  const [collapse, setCollapse] = useState(false);
  const [status, setStatus] = useState('Closed');
  const onEntered = () => setStatus('Opened');
  const onExited = () => setStatus('Closed');
  const toggle = () => setCollapse(!collapse);
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
    <div>
      <Button
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onClick={toggle}
        id={props.dogName}
        className='w-100 mt-4 d-flex flex-nowrap justify-content-between align-items-center btn button row mx-0'
      >
        <img src={props.imageUrl} className='col-4 rounded-circle' />
        <h4 className='col-6'>{props.dogName}</h4>
        {status === 'Opened'
          ? <p className='col-2'>&#9650;</p>
          : <p className='col-2'>&#9660;</p>}
      </Button>
      <Collapse isOpen={collapse}
        onEntered={onEntered}
        onExited={onExited}
      >
        <Card>
          <CardBody>
            <p>Breed: {props.breedName}</p>
            <p>Short Description: {props.shortDescription}</p>
          </CardBody>
          <Link className="btn btn-sm btn-light" to="/ViewInfo"
            onClick={() => props.changeCurrentBreed(props.breedName)}>
            <span>{`Learn more about ${props.breedName}s`}</span>
          </Link>
        </Card>
      </Collapse>
    </div >
  );
}
