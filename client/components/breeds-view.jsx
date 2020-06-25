import React from 'react';
import Breed from './breed';

class BreedsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breeds: []
    };
  }

  componentDidMount() {
    this.setState(prevState => {
      return { ...prevState, breeds: this.props.breeds };
    });
  }

  render() {
    const { changeAppView } = this.props;
    const breedsView = this.state.breeds.map(breed => {
      return <Breed key={breed.breedId}
        breed={breed.name}
        shortDescription={breed.shortDescription}
        longDescription={breed.longDescription}
        imageUrl={breed.imageUrl}
        temperament={breed.temperament}
        historicalUsage={breed.historicalUsage}
        changeAppView={changeAppView}
      ></Breed>;
    });
    return <div>
      <div className="back-to-main p-0 text-left col-12">
        <i className="fas fa-chevron-left"
          onClick={() => changeAppView('main')}></i>
      </div>
      {breedsView}
    </div>;
  }

}

export default BreedsView;
