import React from 'react';

export default class SaveDog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
    this.addDog = this.addDog.bind(this);
  }

  addDog(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!this.props.name) return;
    const dog = {
      breedId: this.props.breedId,
      name: this.props.name,
      imageName: this.props.imageName,
      apiKeyWord: this.props.apiKeyWord
    };
    fetch(`/api/owned-dogs/${this.props.userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dog)
    })
      .then(result => result.json())
      .then(data => {
        this.props.currentOwnedDogId(data.ownedDogId);
        this.setState({ data });
      })
      .catch(err => console.error(err));
  }

  render() {
    return (this.state.data
      ? <button disabled={true} className='btn btn-secondary my-4' type='button'>Saved</button>
      : <button onClick={this.addDog} className='btn btn-secondary my-4' type='button'>Save</button>
    );
  }
}
