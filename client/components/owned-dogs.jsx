import React from 'react';
import { UncontrolledCollapse, Button, CardBody, Card } from 'reactstrap';

export default class OwnedDogs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ownedDogs: []
    };
  }

  componentDidMount() {
    fetch(`/api/owned-dogs/${this.props.userId}`)
      .then(response => response.json())
      .then(dogs => this.setState({ ownedDogs: dogs }))
      .catch(err => console.error(err));
  }

  getDogInfo() {
    const dogs = this.state.ownedDogs.map(dog => {
      return (
        <div key={dog.name}>
          <Button color="primary" id={dog.name} className='w-100 mt-1 d-flex justify-content-between button'>
            <img src='' />
            <p>{dog.name}</p>
            <p>&#9660;</p>
          </Button>
          <UncontrolledCollapse toggler={`#${dog.name}`}>
            <Card>
              <CardBody>
                {dog.breed}
              </CardBody>
            </Card>
          </UncontrolledCollapse>
        </div >
      );
    });

    return (
      <div className='d-flex flex-column justify-content-center w-100'>
        {dogs}
      </div>
    );
  }

  render() {
    return this.state.ownedDogs.length > 0
      ? (
        <div className='container-fluid d-flex justify-content-center flex-wrap align-content-between'>
          <div className="main-portrait-container col-9">
            <img src="./images/hello.jpg" alt=""
              className='rounded-circle img-thumbnail img-fluid' />
          </div>
          {this.getDogInfo()}
        </div>
      )
      : <h1>No Owned Dogs</h1>;
  }
}
