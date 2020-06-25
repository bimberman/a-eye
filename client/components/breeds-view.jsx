import React from 'react';
import Breed from './breed';
import Header from './header';

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
      <Header pageName="Breeds"/>
      {breedsView}
    </div>;
  }

}

export default BreedsView;
