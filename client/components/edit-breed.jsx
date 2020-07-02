import React from 'react';
import { Button, Card } from 'reactstrap';

export default function EditBreed(props) {
  const { changeCurrentBreed, name, imageUrl, breedId, apiKeyWord } = props;

  return <div className="col-12 mb-4">
    <Button className="btn my-2 custom-button"
      onClick={() => changeCurrentBreed(breedId, name, apiKeyWord)} type="button">
      <Card className="row bg-transparent border-0 d-flex flex-row">
        <div className="col-4">
          <img src={imageUrl} alt=""
            className={'rounded-circle img-thumbnail img-fluid'} />
        </div>
        <h4 className="col-6 p-0 m-0 d-flex align-items-center left-text">
          {name}
        </h4>
      </Card>
    </Button>
  </div>;
}
