import React from 'react';
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
    this.uploadImage = this.uploadImage.bind(this);
  }

  previewImage(e) {
    const imagePath = event.target.files[0]
      ? URL.createObjectURL(event.target.files[0])
      : '';
    this.setState({
      imagePath: imagePath
    });
  }

  uploadImage(image) {
    const { toggleLoading, changePredictionState } = this.props;
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
        prediction.imagePath = this.state.imagePath;
        prediction.imageName = imageToUpload.name;
        changePredictionState(prediction);
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        toggleLoading(false);
        this.setState({ gotResult: true });
      });
  }

  render() {
    const { imagePath, gotResult } = this.state;

    const redirect = gotResult
      ? <Redirect to="/ViewClassifyResult" />
      : '';

    const imagePreview = imagePath
      ? (
        <div>
          <img src={imagePath}
            ref={this.displayImageRef}
            className={`rounded-circle img-thumbnail
                        img-fluid preview-image`} />
        </div>
      )
      : '';

    return (
      <div>
        <div className="container p-0 d-flex flex-wrap justify-content-center d-lg-none">
          <div className="back-to-main p-0 text-left col-12">
            <Header pageName="Upload" />
            {redirect}
          </div>
          <div className="preview-image-container text-center">
            {imagePreview}
          </div>
          <div className="col-md-4 col-lg-2">
            <input type="file" accept="image/*"
              ref={this.uploadImageRef}
              onChange={this.previewImage}
              name="image"
              className="image-input" />

            <button className="btn btn-block button"
              disabled={!imagePath}
              onClick={this.uploadImage}> Classify Image
            </button>
          </div>
        </div>
        <div className='d-none d-lg-block'>
          <Header />
          <div className="preview-image-container my-2 mx-auto">
            {imagePreview}
          </div>
          <div className="col-md-4 col-lg-2 mx-auto">
            <input type="file" accept="image/*"
              ref={this.uploadImageRef}
              onChange={this.previewImage}
              name="image"
              className="image-input my-2 mx-auto"
            />

            <button className="btn btn-block button"
              disabled={!imagePath}
              onClick={this.uploadImage}> Classify Image
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default UploadPage;
