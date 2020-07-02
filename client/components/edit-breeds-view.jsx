import React from 'react';
import EditBreed from './edit-breed';
import Header from './header';
import { Redirect } from 'react-router-dom';

export default class EditBreedsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      classifiedBreedInfo: null,
      currentOwnedDogId: null,
      redirect: null
    };
    this.editBreed = this.editBreed.bind(this);
  }

  componentDidMount() {
    this.setState({
      userId: this.props.userId,
      classifiedBreedInfo: this.props.prediction.info,
      currentOwnedDogId: this.props.currentOwnedDogId
    });
  }

  editBreed(breedId, name, apiKeyWord) {
    fetch('/api/edit-breed', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: this.state.userId,
        classifiedBreedId: this.state.classifiedBreedInfo.breedId,
        currentOwnedDogId: this.state.currentOwnedDogId,
        suggestedBreedId: breedId,
        imageUrl: this.state.classifiedBreedInfo.imageUrl,
        apiKeyWord: apiKeyWord
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
    const editBreedsView = this.props.breeds.map((breed, index) => {
      if (breed.breedId === this.props.prediction.info.breedId) return;
      const pawprint = index ? <i className="fas fa-paw text-center pb-3"></i> : '';
      return (
        <div className="d-flex flex-column justify-content-center" key={breed.breedId}>
          {pawprint}
          <EditBreed
            name={breed.name}
            breedId={breed.breedId}
            imageUrl={breed.imageUrl}
            apiKeyWord={breed.apiKeyWord}
            changeCurrentBreed={this.editBreed}>
          </EditBreed>
        </div>
      );
    });
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return <div className="d-flex align-items-center flex-column">
      <Header pageName="Edit Breeds" />
      <h5>Please select<br/>a breed from the list below</h5>
      <div className="col-11">
        {editBreedsView}
      </div>
    </div>;
  }
}
