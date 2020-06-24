import React from 'react';

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
          <p>{dog.name}</p>
          <p>{dog.breed}</p>
          <p>{dog.shortDescription}</p>
        </div>
      );
    });
    return dogs;
  }

  render() {
    return this.state.ownedDogs.length > 0
      ? this.getDogInfo()
      : <h1>No Owned Dogs</h1>;
  }
}
