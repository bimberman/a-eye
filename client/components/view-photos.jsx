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

    let photos;
    if (this.state.dog) {
      photos = this.state.dog.uploadedPhotos.map(url => {
        return <img src={url} key={url}
          className={`img-thumbnail
             img-fluid`} />;
      });
    }
    return (
      <div className="d-flex justify-content-center col-12 flex-wrap">
        <div className="p-0 text-left col-12">
          <Header pageName={`${this.state.dog.name}'s photos`} />
        </div>
        <div className="col-11 card">
          {photos}
        </div>
      </div>
    );
  }
}

export default ViewPhotos;
