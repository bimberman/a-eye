import React from 'react';
import Accordion from './accordion';

export default class OwnedDogs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ownedDogs: [],
      selectedDog: null,
      value: ''
    };
    this.handleLongPress = this.handleLongPress.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch(`/api/owned-dogs/${this.props.userId}`)
      .then(response => response.json())
      .then(dogs => {
        this.setState({ ownedDogs: dogs });
      })
      .catch(err => console.error(err));
  }

  handleChange(e) {
    this.setState({ value: e.currentTarget.value });
  }

  getDogInfo() {
    const dogs = this.state.ownedDogs.map(dog => {
      const breed = dog.breed;
      const breedWords = breed.split(' ');
      const capitalizedWords = breedWords.map(word => word[0].toUpperCase() + word.slice(1));
      const capitalizedBreed = capitalizedWords.join(' ');
      return (
        <Accordion
          key={dog.name}
          callback={this.handleLongPress}
          getDogName={this.getDogName}
          imageUrl={dog.imageUrl}
          dogName={dog.name}
          dogId={dog.ownedDogId}
          breedName={capitalizedBreed}
          shortDescription={dog.shortDescription} />
      );
    });

    return this.state.selectedDog
      ? (
        <div>
          <div className='d-flex align-items-baseline w-100'>
            <label htmlFor='editInput'>
              <input className='input' onChange={this.handleChange} value={this.state.value} id='editInput' type='text' placeholder={this.state.selectedDog[1]} />
            </label>
            <button className='custom-button'>Update</button>
          </div>
          {dogs}
        </div>
      )
      : dogs;
  }

  handleLongPress(dogId, dogName) {
    this.setState({ selectedDog: [dogId, dogName] });
  }

  render() {
    return this.state.ownedDogs.length > 0
      ? (
        <div className='container-fluid d-flex justify-content-center flex-wrap align-content-between'>
          <div className="back-to-main p-0 text-left col-12">
            <i className="fas fa-chevron-left"
              onClick={() => this.props.changeAppView('main')}></i>
          </div>
          <div className="main-portrait-container col-9">
            <img src="./images/user-icon.png" alt=""
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
