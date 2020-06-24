import React from 'react';

class Loading extends React.Component {
  render() {
    return (
      <div className={`loading-container d-flex
      justify-content-center align-items-center`}>
        <div className="loading-img-container">
          <img src="./images/dog.gif" alt=""
            className="loading-gif img-thumbnail rounded-circle" />
        </div>
      </div>
    );
  }

}

export default Loading;
