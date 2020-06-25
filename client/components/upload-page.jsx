import React from 'react';
import InfoDropDown from './info-dropdown';

class UploadPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imagePath: '',
      prediction: ''
    };
    this.uploadImageRef = React.createRef();
    this.displayImageRef = React.createRef();
    this.previewImage = this.previewImage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.resetImage = this.resetImage.bind(this);
  }

  handleChange(e) {
    this.previewImage(e);
  }

  previewImage(e) {
    const imagePath = event.target.files[0]
      ? URL.createObjectURL(event.target.files[0])
      : '';
    this.setState({
      imagePath: imagePath
    });

  }

  resetImage() {
    this.setState({
      imagePath: '',
      prediction: ''
    });
  }

  uploadImage(image) {
    const { toggleLoading } = this.props;
    toggleLoading('true');

    const imageData = new FormData();
    const imageToUpload = this.uploadImageRef.current.files[0];
    imageData.append('image', imageToUpload, imageToUpload.name);

    fetch('/api/classify', {
      method: 'POST',
      body: imageData
    })
      .then(result => result.json())
      .then(prediction => {
        // eslint-disable-next-line no-console
        console.log(prediction);
        toggleLoading(false);
        this.setState({ prediction: prediction });
      })
      .catch(err => {
        console.error(err);
        toggleLoading(false);
        this.setState({ prediction: '' });
      });

  }

  render() {
    const { imagePath, prediction } = this.state;
    const { changeAppView } = this.props;
    const { confidence, info } = prediction;
    const noDataText = 'No data found on the database';
    let predictionText;
    let inputOrResult;

    const imagePreview = imagePath
      ? (<div>
        <img src={imagePath}
          ref={this.displayImageRef}
          className={`rounded-circle img-thumbnail
            img-fluid preview-image`} />
      </div>
      )
      : '';

    if (prediction) {
      predictionText = (
        <div>
          <p>Confidence: {`%${(confidence * 100).toFixed(2)}`}</p>
          <p>{info.shortDescription || noDataText}</p>
        </div>
      );
      inputOrResult = (
        <div>
          <button className="btn btn-sm btn-light"
            onClick={this.resetImage}>
            <span>Try new image</span>
          </button>
          <InfoDropDown title={prediction.label}
            description={predictionText}
            imageUrl={info.imageUrl || './images/user-icon.png'}>
          </InfoDropDown>

          <InfoDropDown title={'History'}
            description={info.historicalUsage || noDataText}
            imageUrl={info.imageUrl || './images/user-icon.png'}>
          </InfoDropDown>
          <InfoDropDown title={'Temper'}
            description={info.temperament || noDataText}
            imageUrl={info.imageUrl || './images/user-icon.png'}>
          </InfoDropDown>
        </div>
      );

    } else {
      inputOrResult = (
        <div className="col-md-4 col-lg-2">
          <input type="file" accept="image/*"
            ref={this.uploadImageRef}
            onChange={this.handleChange}
            name="image"
            className="image-input" />
          <button className="btn btn-block button"
            disabled={!imagePath}
            onClick={this.uploadImage}> Classify Image
          </button>
        </div>
      );
    }

    return (
      <div className="container p-0 d-flex flex-wrap justify-content-center">
        <div className="back-to-main p-0 text-left col-12">
          <i className="fas fa-chevron-left"
            onClick={() => changeAppView('main')}></i>
        </div>
        <div className="preview-image-container text-center">
          {imagePreview}
        </div>
        {inputOrResult}
      </div>
    );
  }
}

export default UploadPage;
