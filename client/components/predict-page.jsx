import React from 'react';
// import * as ml5 from 'ml5';

class PredictPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imagePath: '',
      imageData: null
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
    this.setState({
      imagePath: URL.createObjectURL(event.target.files[0])
    });

  }

  uploadImage(image) {

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
      })
      .catch(err => console.error(err));

  }

  render() {
    const { imagePath } = this.state;

    return (
      <div className="container-fluid">
        <div>
          <img className="preview-image"
            src={imagePath}
            ref={this.displayImageRef}/>
        </div>
        <input type="file" id="fileElem" multiple accept="image/*"
          ref={this.uploadImageRef}
          onChange={this.handleChange}
          name="image"/>

        <div className="col-md-4 col-lg-2">
          <button className="btn btn-primary btn-block"
            onClick={this.uploadImage}> Upload Image
          </button>
        </div>
      </div>
    );
  }
}

export default PredictPage;
