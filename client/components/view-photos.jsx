import React from 'react';
import Header from './header';

class ViewPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dog: ''
    };
  }

  componentDidMount() {
    fetch(`/api/gallery/${this.props.currentDog}`)
      .then(res => res.json())
      .then(data => this.setState({ dog: data }));
  }

  render() {
    const { dog } = this.state;
    let photos;
    if (dog.uploadedPhotos) {
      photos = dog.uploadedPhotos.map(url => {
        return <img src={url} key={url}
          className={`img-thumbnail
             img-fluid`} />;
      });
    }
    return photos
      ? (
        <div className="d-flex justify-content-center col-12 flex-wrap">
          <div className="p-0 text-left col-12">
            <Header pageName={`${dog.name}'s photos`} />
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
        <h3>No photos saved</h3>
      </div>;
  }
}

export default ViewPhotos;
