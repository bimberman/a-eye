import React from 'react';
import EditBreed from './edit-breed';
import Header from './header';
import { Redirect } from 'react-router-dom';

export default class EditBreedsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      classifiedBreedId: null,
      imageUrl: null,
      redirect: null
    };
    this.editBreed = this.editBreed.bind(this);
  }

  componentDidMount() {
    this.setState({
      userId: this.props.userId,
      classifiedBreedId: this.props.prediction.info.breedId,
      imageUrl: this.props.prediction.info.imageUrl
    });
  }

  editBreed(breedId, name) {
    fetch('/api/edit-breed', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: 1,
        classifiedBreedId: this.state.classifiedBreedId,
        suggestedBreedId: breedId,
        imageUrl: 'dalmatian.jpg',
        apiKeyWord: 'pug'
      })
    })
      .then(res => res.json())
      .then(result => {
        this.props.changeCurrentBreed(name);
        this.props.changePredictionState({
          confidence: 1,
          imagePath: this.props.prediction.imagePath,
          info: result,
          label: result.name
        });
      })
      .catch(err => console.error(err))
      .finally(() => this.setState({ redirect: '/ViewClassifyResult' }));
  }

  render() {
    const editBreedsView = this.props.breeds.map(breed => {
      return <EditBreed key={breed.breedId}
        name={breed.name}
        breedId = {breed.breedId}
        imageUrl={breed.imageUrl}
        changeCurrentBreed={this.editBreed}
      ></EditBreed>;
    });
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return <div className="d-flex align-items-center flex-column">
      <Header pageName="Edit Breeds" />
      <h5>Please select the correct <br/>breed from the list below</h5>
      <div className="col-11">
        {editBreedsView}
      </div>
    </div>;
  }
}
