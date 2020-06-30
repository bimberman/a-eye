import React from 'react';
import InfoDropDown from './info-dropdown';
import Header from './header';
import Loading from './loading';

class ViewInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: '',
      imageUrls: '',
      isLoading: false
    };
    this.fetchPhotos = this.fetchPhotos.bind(this);
  }

  componentDidMount() {
    this.fetchInfo(this.props.currentBreed);
  }

  toggleOpen() {
    this.setState({
      isOpen: !this.setState.isOpen
    });
  }

  fetchInfo(breed) {
    fetch(`/api/breeds/${breed}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ info: data });
        this.fetchPhotos(data.apiKeyWord);
      })
      .catch(err => console.error(err));
  }

  fetchPhotos(keyword) {
    this.setState({ isLoading: true });
    fetch(`https://dog.ceo/api/breed/${keyword}/images/random/3`)
      .then(res => res.json())
      .then(data => this.setState({ imageUrls: data.message }))
      .then(setTimeout(() => {
        this.setState({ isLoading: false });
      }, 1000));
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
    const photoDisplay = this.state.isLoading
      ? <Loading />
      : (
        <div className="text-center">
          <button className="btn btn-sm btn-light"
            onClick={() => this.fetchInfo(this.props.currentBreed)}>
            <span>Fetch new photos</span>
          </button>
          { currentBreedImages }
        </div >
      );
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
            description={photoDisplay}
            imageUrl={info.imageUrl || './images/user-icon.png'}>
          </InfoDropDown>
        </div>
      </div>
    );
  }
}

export default ViewInfo;
