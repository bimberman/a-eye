import React, { useState, useEffect } from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';

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
      timerId = setTimeout(props.callback, 300);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [props.callback, 300, startLongPress]);

  return (
    <div>
      <Button
        color="primary"
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onClick={toggle}
        id={props.dogName}
        className='w-100 mt-4 d-flex justify-content-between button'
      >
        <img src={props.imageUrl} height={50} />
        <h4>{props.dogName}</h4>
        {status === 'Opened'
          ? <p>&#9650;</p>
          : <p>&#9660;</p>}
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
        </Card>
      </Collapse>
    </div >
  );
}
