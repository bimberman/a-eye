import React from 'react';

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
      });

  }

  render() {
    const { imagePath, prediction } = this.state;
    const { changeAppView } = this.props;
    const label = prediction.label;
    const confidence = prediction.confidences;
    const imagePreview = imagePath
      ? (<img src={imagePath}
        ref={this.displayImageRef}
        className={`rounded-circle img-thumbnail
            img-fluid preview-image`}/>)
      : '';

    const inputOrResult = prediction
      ? (
        <div>
          <p>Image is classified as {prediction.label}</p>
          <p>Confidence: {`%${(confidence[label] * 100).toFixed(2)}`}</p>
        </div>
      )
      : (
        <div>
          <input type="file" accept="image/*"
            ref={this.uploadImageRef}
            onChange={this.handleChange}
            name="image"/>
          <div className="col-md-4 col-lg-2">
            <button className="btn btn-primary btn-block"
              disabled={!imagePath}
              onClick={this.uploadImage}> Classify Image
            </button>
          </div>
        </div>

      );

    return (
      <div className="container col-10 p-0 text-center">
        <div className="back-to-main p-0 text-left">
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
