import React from 'react';
import Header from './header';
import { Link } from 'react-router-dom';
import InfoDropDown from './info-dropdown';

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
    const { changeCurrentBreed } = this.props;
    const breedsView = this.state.breeds.map((breed, index) => {
      const pawprint = index ? <i className="fas fa-paw text-center pb-3"></i> : '';
      return (
        <div className="d-flex flex-column justify-content-center" key={breed.breedId}>
          {pawprint}
          <InfoDropDown
            title={breed.name}
            description={
              <div className='text-center d-flex flex-column'>
                {breed.shortDescription}
                <Link className="btn btn-sm btn-light" to="/ViewInfo"
                  onClick={() => changeCurrentBreed(breed.name)}>
                  <span>View more</span>
                </Link>
              </div>
            }
            imageUrl={breed.imageUrl}
          ></InfoDropDown>
        </div>
      );
    });
    return <div className="d-flex align-items-center flex-column">
      <Header pageName="Breeds"/>
      <div className="col-11">
        {breedsView}
      </div>
    </div>;
  }

}

export default BreedsView;
