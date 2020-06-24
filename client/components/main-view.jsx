import React from 'react';

class MainView extends React.Component {
  render() {
    const { handleView } = this.props;
    return (
      <div className={`container-fluid d-flex justify-content-center
      flex-wrap align-content-between`}>
        <div className="main-portrait-container col-9">
          <img src="./images/hello.jpg" alt=""
            className={`rounded-circle img-thumbnail
            img-fluid`} />
        </div>

        <div className='main-buttons-container d-flex flex-wrap'>

          <button type="button"
            className={`btn btn-primary btn-lg btn-block my-4 turqoise border-0
            my-dogs-button`}
            onClick={handleView}>
            <p className="p-0 m-0">My Dogs</p>
          </button>

          <button type="button"
            className={`btn btn-primary btn-lg btn-block my-4 turqoise border-0
            scan-button`}
            onClick={handleView}>
            <p className="p-0 m-0">Scan</p>
          </button>

          <button type="button"
            className={`btn btn-primary btn-lg btn-block my-4 turqoise border-0
            upload-button`}
            onClick={handleView}>
            <p className="p-0 m-0">Upload</p>
          </button>

          <button type="button"
            className={`btn btn-primary btn-lg btn-block my-4 turqoise border-0
            browse-button`}
            onClick={handleView}>
            <p className="p-0 m-0">Browse</p>
          </button>

        </div>
      </div>
    );

  }
}

export default MainView;
