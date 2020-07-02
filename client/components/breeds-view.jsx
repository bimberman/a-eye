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

    const desktopView = this.state.breeds.map((breed, index) => {
      const pawprint = index ? <i className="fas fa-paw text-center pb-3"></i> : '';
      return (
        <div key={breed.breedId} >
          <div className='text-center'>
            {pawprint}
          </div>
          < div className='d-flex m-2 align-items-center' >
            <img src={breed.imageUrl} className='col' />
            <div className='col'>
              <p>{breed.name}</p>
              <div className='text-center'>
                <p>{breed.shortDescription}</p>
                <Link className="btn btn-sm btn-light" to="/ViewInfo"
                  onClick={() => changeCurrentBreed(breed.name)}>
                  <span>View more</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div>
        <div className="d-flex align-items-center flex-column d-lg-none container">
          <Header pageName="Breeds" />
          <div className='w-100'>
            {breedsView}
          </div>
        </div>
        <div className='d-none d-lg-block'>
          <Header />
          {desktopView}
        </div>
      </div >
    );
  }

}

export default BreedsView;
