import React, { useState } from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';

export default function Accordion(props) {
  const [collapse, setCollapse] = useState(false);
  const [status, setStatus] = useState('Closed');
  const onEntered = () => setStatus('Opened');
  const onExited = () => setStatus('Closed');
  const toggle = () => setCollapse(!collapse);
  return (
    <div>
      <Button color="primary" onClick={toggle} id={props.dogName} className='w-100 mt-4 d-flex justify-content-between button'>
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
