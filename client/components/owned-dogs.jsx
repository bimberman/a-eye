import React from 'react';
import Accordion from './accordion';

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
      const breedWords = dog.breed.split(' ');
      const capitalizedWords = breedWords.map(word => word[0].toUpperCase() + word.slice(1));
      const capitalizedBreed = capitalizedWords.join(' ');
      return (
        <Accordion key={dog.name} imageUrl={dog.imageUrl} dogName={dog.name} breedName={capitalizedBreed} shortDescription={dog.shortDescription} />
      );
    });
    return dogs;
  }

  render() {
    return this.state.ownedDogs.length > 0
      ? (
        <div className='container-fluid d-flex justify-content-center flex-wrap align-content-between'>
          <div className="main-portrait-container col-9">
            <img src="./images/hello.jpg" alt=""
              className='rounded-circle img-thumbnail img-fluid' />
          </div>
          <div className='d-flex flex-column w-100'>
            {this.getDogInfo()}
          </div>
        </div>
      )
      : <h1>No Saved Dogs</h1>;
  }
}
