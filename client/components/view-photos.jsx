import React from 'react';

class ViewPhotos extends React.Component {

  componentDidMount() {
    fetch(`/api/gallery/${this.props.currentDog}`)
      .then(res => res.json())
      .then(data => console.log(data));
  }

  render() {
    return <div>hello</div>;
  }
}

export default ViewPhotos;
