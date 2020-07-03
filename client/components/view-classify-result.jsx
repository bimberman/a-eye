import React from 'react';
import Header from './header';
import InfoDropDown from './info-dropdown';
import { Link } from 'react-router-dom';
import Save from './save';

class ViewClassifyResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrls: '',
      breedId: props.prediction.info.breedId,
      value: '',
      // ownedDogId: '',
      savedDog: null
    };
    this.fetchInfo = this.fetchInfo.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.setOwnedDogId = this.setOwnedDogId.bind(this);
  }

  componentDidMount() {
    const { info } = this.props.prediction;

    if (Object.entries(info).length !== 0) {
      this.fetchInfo(info.apiKeyWord);
    }
  }

  // setOwnedDogId(newOwnedDogId) {
  //   this.setState({ ownedDogId: newOwnedDogId });
  // }

  fetchInfo(breed) {
    fetch(`https://dog.ceo/api/breed/${breed}/images/random/3`)
      .then(res => res.json())
      .then(data => this.setState({
        imageUrls: data.message
      }))
      .catch(err => console.error(err));
  }

  handleChange(e) {
    this.setState({ value: e.currentTarget.value });
  }

  render() {
    const { info, confidence, label, imagePath, imageName } = this.props.prediction;
    const noDataText = 'No data found in the database.';
    let relatedImages;
    if (this.state.imageUrls && this.state.imageUrls !== 'Breed not found (master breed does not exist)') {
      relatedImages = this.state.imageUrls.map((url, index) => {
        return (
          <img src={url} key={index}
            className={`img-thumbnail
             img-fluid view-info-image col-12 col-lg-4`} />
        );
      });
    }

    const predictionText = (
      <div>
        <p>{info.name || noDataText}</p>
        <p>Confidence: {`${(confidence * 100).toFixed(2)}%`}</p>
      </div>
    );

    const result = (
      <div className="d-flex flex-wrap justify-content-center col-11">
        <div className="preview-image-container text-center">
          <img src={imagePath}
            className={`rounded-circle img-thumbnail
            img-fluid preview-image`} />
        </div>

        <div className="col-12 text-center">
          <Link className="btn btn-sm btn-light"
            to="/Upload">
            <span>Try new image</span>
          </Link>
          <form
            onSubmit={e => e.preventDefault()}
            className='d-flex align-items-center'>
            <input className='form-control btn-light' type='text' placeholder='Name' onChange={this.handleChange} value={this.state.value} />

            <Save breedId={info.breedId}
              name={this.state.value}
              userId={this.props.userId}
              imageName={imageName}
              apiKeyWord={info.apiKeyWord}
              currentOwnedDogId={this.props.currentOwnedDogId} />
          </form>
        </div>

        <h2 className="mt-2 gray">
          {predictionText}
        </h2>

        <InfoDropDown title={label}
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
          description={relatedImages || noDataText}
          imageUrl={info.imageUrl || './images/user-icon.png'}>
        </InfoDropDown>

      </div>
    );
    return (
      <div>
        <div className="container p-0 d-flex flex-wrap justify-content-center d-lg-none">
          <div className="back-to-main p-0 text-left col-12">
            <Header pageName="Prediction"
              hasButton={true}
              buttonText="Edit Breed"
              to={'/edit-breed'} />
          </div>
          {result}
        </div>

        <div className='d-none d-lg-block'>
          <Header pageName="Prediction"
            hasButton={true}
            buttonText="Edit Breed"
            to={'/edit-breed'} />
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
                <form
                  onSubmit={e => e.preventDefault()}
                  className='row d-flex flex-nowrap align-items-center'
                >
                  <input className='form-control btn-light' type='text' placeholder='Name' onChange={this.handleChange} value={this.state.value} />

                  <Save breedId={info.breedId}
                    name={this.state.value}
                    userId={this.props.userId}
                    imageName={imageName}
                    apiKeyWord={info.apiKeyWord}
                    currentOwnedDogId={this.props.currentOwnedDogId}/>
                </form>
              </div>
            </div>
            <div className="text-center">
              <button className="btn btn-sm btn-light m-2"
                onClick={() => this.fetchInfo(info.apiKeyWord)}>
                <span>Fetch new photos</span>
              </button>

              <div className="d-flex col-12 justify-content-around card flex-row">
                {relatedImages}
              </div>

            </div >
          </div>
        </div>
      </div>
    );
  }
}

export default ViewClassifyResult;
