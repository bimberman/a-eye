import React from 'react';
import Accordion from './accordion';
import Header from './header';

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
    this.handleUpdate = this.handleUpdate.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
  }

  componentDidMount() {
    this.getDogInfo();
  }

  cancelEdit() {
    this.setState({ selectedDog: null, value: '' });
  }

  handleChange(e) {
    this.setState({ value: e.currentTarget.value });
  }

  handleUpdate(e) {
    if (this.state.value) {
      fetch(`/api/owned-dogs/${this.props.userId}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          dogId: this.state.selectedDog[0],
          name: this.state.value,
          breedId: this.state.selectedDog[2]
        })
      })
        .then(response => response.json())
        .then(dog => {
          const dogs = this.state.ownedDogs;
          this.sortByKey(dogs, 'ownedDogId');
          dogs.splice(dog.ownedDogId - 1, 1, dog);
          this.setState({ ownedDogs: dogs, selectedDog: null, value: '' });
        })
        .catch(err => console.error(err));
    } else {
      this.setState({ selectedDog: null, value: '' });
    }
  }

  sortByKey(array, key) {
    return array.sort(function (a, b) {
      var x = a[key]; var y = b[key];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }

  getDogInfo() {
    fetch(`/api/owned-dogs/${this.props.userId}`)
      .then(response => response.json())
      .then(dogs => {
        this.setState({ ownedDogs: dogs });
      })
      .catch(err => console.error(err));
  }

  renderDogInfo() {
    let dogs = this.state.ownedDogs.map(dog => {
      const breed = dog.breed;
      const breedWords = breed.split(' ');
      const capitalizedWords = breedWords.map(word => word[0].toUpperCase() + word.slice(1));
      const capitalizedBreed = capitalizedWords.join(' ');
      return (
        <Accordion
          key={dog.ownedDogId}
          callback={this.handleLongPress}
          getDogName={this.getDogName}
          imageUrl={dog.imageUrl}
          dogName={dog.name}
          dogId={dog.ownedDogId}
          breedId={dog.breedId}
          breedName={capitalizedBreed}
          shortDescription={dog.shortDescription}
          changeCurrentBreed={this.props.changeCurrentBreed}
        />
      );
    });

    dogs = this.sortByKey(dogs, 'key');

    return this.state.selectedDog
      ? (
        <div>
          <div className='d-flex align-items-baseline w-100'>
            <button onClick={this.cancelEdit} className='btn button close-button m-1'><i className="fas fa-times"></i></button>
            <label htmlFor='col-8 editInput'>
              <input className='input form-control' onChange={this.handleChange} value={this.state.value} id='editInput' type='text' placeholder={this.state.selectedDog[1]} />
            </label>
            <button onClick={this.handleUpdate} className='btn button m-1'>Update</button>
          </div>
          {dogs}
        </div >
      )
      : dogs;
  }

  handleLongPress(dogId, dogName, breedId) {
    this.setState({ selectedDog: [dogId, dogName, breedId] });
  }

  render() {
    return this.state.ownedDogs.length > 0
      ? (
        <div className='container-fluid d-flex justify-content-center flex-wrap align-content-between'>
          <div className="p-0 text-left col-12">
            <Header pageName="My Dogs" />
          </div>
          <div className="main-portrait-container col-9">
            <img src="./images/user-icon.png" alt=""
              className='rounded-circle img-thumbnail img-fluid' />
          </div>
          <div className='d-flex flex-column w-100'>
            {this.renderDogInfo()}
          </div>
        </div>
      )
      : <h1>No Saved Dogs</h1>;
  }
}
