import React from 'react';
import InfoDropDown from './info-dropdown';
import { Redirect } from 'react-router-dom';

import Header from './header';

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
    const imageData = new FormData();
    const imageToUpload = this.uploadImageRef.current.files[0];
    imageData.append('image', imageToUpload, imageToUpload.name);

    toggleLoading(true);
    fetch('/api/classify', {
      method: 'POST',
      body: imageData
    })
      .then(result => result.json())
      .then(prediction => {
        // eslint-disable-next-line no-console
        console.log(prediction);
        this.setState({ prediction: prediction });
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        toggleLoading(false);
      });
  }

  render() {
    const { imagePath, prediction } = this.state;
    const { confidence, info } = prediction;
    const noDataText = 'No data found on the database';
    const redirect = prediction
      ? <Redirect to="/ViewClassifyResult" />
      : '';

    const imagePreview = imagePath
      ? (<div>
        <img src={imagePath}
          ref={this.displayImageRef}
          className={`rounded-circle img-thumbnail
            img-fluid preview-image`} />
      </div>
      )
      : '';

    return (
      <div className="container p-0 d-flex flex-wrap justify-content-center">
        <div className="back-to-main p-0 text-left col-12">
          <Header pageName="Upload"/>
          {redirect}
        </div>
        <div className="preview-image-container text-center">
          {imagePreview}
        </div>
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
      </div>
    );
  }
}

export default UploadPage;
