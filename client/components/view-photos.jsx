import React from 'react';
import Header from './header';

class ViewPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dog: '',
      imageToUpload: ''
    };
    this.uploadImageRef = React.createRef();
  }

  componentDidMount() {
    fetch(`/api/gallery/${this.props.currentDog}`)
      .then(res => res.json())
      .then(data => this.setState({ dog: data }));
  }

  uploadPhoto() {
    const { dog } = this.state;
    const imageData = new FormData();
    const imageToUpload = this.uploadImageRef.current.files[0];

    imageData.append('image', imageToUpload, imageToUpload.name);

    fetch(`/api/gallery/${dog.ownedDogId}`, {
      method: 'POST',
      body: imageData
    })
      .then(result => result.json())
      .then(data => this.setState({
        dog: data,
        imageToUpload: ''
      }));
  }

  render() {
    const { dog } = this.state;
    let photos;
    let buttonText;
    let cancelButton;
    let uploadButton;
    if (dog.uploadedPhotos) {
      photos = dog.uploadedPhotos.map((url, index) => {
        return <img src={url} key={index}
          className={`img-thumbnail
             img-fluid`} />;
      });
    }
    if (this.state.imageToUpload) {
      buttonText = 'Change photo';
      cancelButton =
      <button className="btn btn-sm btn-light m-2"
        onClick={() => { this.setState({ imageToUpload: '' }); }}>
        <span>Cancel</span>
      </button>;
      uploadButton =
        <button className="btn btn-sm btn-light m-2"
          onClick={() => this.uploadPhoto()}>
          <span>Upload</span>
        </button>;
    } else {
      buttonText = 'Add a photo';
      cancelButton = '';
      uploadButton = '';
    }

    return photos
      ? (
        <div className="d-flex justify-content-center col-12 flex-wrap">
          <div className="p-0 text-left col-12">
            <Header pageName={`${dog.name}'s photos`} />
          </div>
          <input type="file" accept="image/*"
            ref={this.uploadImageRef}
            name="image"
            className="my-2 mx-auto d-none"
            // value={this.state.imageToUpload}
            onChange={() => this.setState({ imageToUpload: this.uploadImageRef.current.value })}
          />
          <div className="button-container col-12 d-flex justify-content-center">
            <button className="btn btn-sm btn-light m-2"
              onClick={() => this.uploadImageRef.current.click()}>
              <span>{buttonText}</span>
            </button>
            {uploadButton}
            {cancelButton}
          </div>
          <div className="col-11 card">
            {photos}
          </div>
        </div>
      )
      : <div className="d-flex justify-content-center col-12 flex-wrap">
        <div className="p-0 text-left col-12">
          <Header pageName={`${dog.name}'s photos`} />
        </div>
        <input type="file" accept="image/*"
          ref={this.uploadImageRef}
          name="image"
          className="my-2 mx-auto d-none"
          onChange={() => this.setState({ imageToUpload: this.uploadImageRef })}
        />
        <div className="button-container col-12 d-flex justify-content-center">
          <button className="btn btn-sm btn-light m-2"
            onClick={() => this.uploadImageRef.current.click()}>
            <span>{buttonText}</span>
          </button>
          {uploadButton}
          {cancelButton}
        </div>
        <h3>No photos saved</h3>
      </div>;
  }
}

export default ViewPhotos;
