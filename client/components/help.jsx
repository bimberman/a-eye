import React from 'react';
import Header from './header';
import { Card, CardImg, CardBody, CardText } from 'reactstrap';

class Help extends React.Component {
  render() {
    return (
      <div className="d-flex flex-column align-items-center container-fluid">
        <Header pageName="Get started" />
        <div className="d-flex flex-column justify-content-center col-11">
          <Card >
            <CardImg src={'/images/UploadDog.png'}
              className={'img-fluid'} />
            <CardBody>
              <CardText>
                Upload an image of your dog
              </CardText>
            </CardBody>
          </Card>
          <i className="fas fa-arrow-down text-center my-3"></i>
          <Card >
            <CardImg src={'/images/ClassifiedDogMobile.png'}
              className={'img-fluid'} />
            <CardBody>
              <CardText>
                {"Classify your dog's breed"}
              </CardText>
            </CardBody>
          </Card>
          <i className="fas fa-arrow-down text-center my-3"></i>
          <Card >
            <CardImg src={'/images/SavedDogMobile.png'}
              className={'img-fluid'} />
            <CardBody>
              <CardText>
                Keep track of all your dogs
              </CardText>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}

export default Help;
