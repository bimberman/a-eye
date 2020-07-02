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
          {currentBreedImages}
        </div >
      );
    return (
      <div>
        <div className="d-flex flex-column align-items-center d-lg-none">
          <div className="p-0 text-left col-12">
            <Header pageName={`${info.name} Info`} />
          </div>

          <div className="d-flex flex-column justify-content-center col-11">
            <InfoDropDown title={info.name}
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

        <div className='d-none d-lg-block'>
          <Header />
          <div className='container'>
            <div className='row d-flex m-2'>
              <img src={info.imageUrl} className='col' />
              <div className='col container text-center'>
                <div className='row d-flex flex-column'>
                  <h4>{info.name}</h4>
                  <p>{info.shortDescription}</p>
                </div>
                <div className='row d-flex flex-column'>
                  <h4>Temperament</h4>
                  <p>{info.temperament}</p>
                </div>
                <div className='row d-flex flex-column'>
                  <h4>Historical Usage</h4>
                  <p>{info.historicalUsage}</p>
                </div>
              </div>
            </div>
            <div className="text-center">
              <button className="btn btn-sm btn-light m-2"
                onClick={() => this.fetchInfo(this.props.currentBreed)}>
                <span>Fetch new photos</span>
              </button>

              <div className="d-flex col-12 justify-content-around card flex-row">
                {currentBreedImages}
              </div>

            </div >
          </div>
        </div>
      </div>
    );
  }
}
export default ViewInfo;
