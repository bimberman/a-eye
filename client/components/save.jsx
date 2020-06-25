import React from 'react';

export default class SaveDog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
    this.addDog = this.addDog.bind(this);
  }

  addDog() {
    const dog = {
      breedId: this.props.breedId,
      name: this.props.name
    };
    fetch(`/api/owned-dogs/${this.props.userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dog)
    })
      .then(result => result.json())
      .then(data => this.setState({ data }))
      .catch(err => console.error(err));
  }

  render() {
    return (this.state.data
      ? <button disabled={true} onClick={this.addDog} className='btn btn-lg btn-block my-4 button' type='button'>Save</button>
      : <button onClick={this.addDog} className='btn btn-lg btn-block my-4 button' type='button'>Save</button>
    );
  }
}
