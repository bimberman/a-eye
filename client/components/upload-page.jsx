import React from 'react';
// import * as ml5 from 'ml5';

class UploadPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imagePath: ''
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
        toggleLoading('true');
      })
      .catch(err => console.error(err));

  }

  render() {
    const { imagePath } = this.state;
    const { changeAppView } = this.props;
    const imagePreview = imagePath
      ? (<img className="preview-image"
        src={imagePath}
        ref={this.displayImageRef} />)
      : '';

    return (
      <div className="container col-10 p-0">
        <div className="back-to-main p-0">
          <i className="fas fa-chevron-left"
            onClick={() => changeAppView('main')}></i>
        </div>
        <div className="preview-image-container">
          {imagePreview}
        </div>
        <input type="file" id="fileElem" accept="image/*"
          ref={this.uploadImageRef}
          onChange={this.handleChange}
          name="image" />

        <div className="col-md-4 col-lg-2">
          <button className="btn btn-primary btn-block"
            disabled={!imagePath}
            onClick={this.uploadImage}> Classify Image
          </button>
        </div>
      </div>
    );
  }
}

export default UploadPage;
