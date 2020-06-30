import React from 'react';
import InfoDropDown from './info-dropdown';
import Header from './header';

class ViewInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: '',
      imageUrls: ''
    };
  }

  componentDidMount() {
    this.fetchInfo(this.props.currentBreed);
  }

  fetchInfo(breed) {
    fetch(`/api/breeds/${breed}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ info: data });
        fetch(`https://dog.ceo/api/breed/${data.apiKeyWord}/images/random/3`)
          .then(res => res.json())
          .then(data => this.setState({ imageUrls: data.message }));
      })
      .catch(err => console.error(err));
  }

  render() {
    const { info, imageUrls } = this.state;
    const noDataText = 'No data found on the database.';
    let currentBreedImages;
    if (imageUrls) {
      currentBreedImages = imageUrls.map((url, index) => {
        return (
          <img src={url} key={index}
            className={`img-thumbnail
             img-fluid view-info-image`} />
        );
      });
    }
    return (
      <div className="d-flex flex-column align-items-center">
        <Header pageName={`${info.name} Info`} />
        <div className="d-flex flex-column justify-content-center col-11">
          <InfoDropDown title={ info.name }
            description={info.shortDescription}
            imageUrl={info.imageUrl || './images/user-icon.png'}>
          </InfoDropDown>
          <i className="fas fa-paw text-center pb-3"></i>
          <InfoDropDown title={'History'}
            description={info.historicalUsage || noDataText}
            imageUrl={info.imageUrl || './images/user-icon.png'}>
          </InfoDropDown>
          <i className="fas fa-paw text-center pb-3"></i>
          <InfoDropDown title={'Temperament'}
            description={info.temperament || noDataText}
            imageUrl={info.imageUrl || './images/user-icon.png'}>
          </InfoDropDown>
          <i className="fas fa-paw text-center pb-3"></i>
          <InfoDropDown title={'Photos'}
            description={ currentBreedImages }
            imageUrl={info.imageUrl || './images/user-icon.png'}>
          </InfoDropDown>
        </div>
      </div>
    );
  }
}

export default ViewInfo;
