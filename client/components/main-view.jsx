import React from 'react';
import { Link } from 'react-router-dom';

class MainView extends React.Component {

  render() {
    return (
      <div className={`container-fluid d-flex justify-content-center
      flex-wrap align-content-between`}>
        <h2 className="m-2 p-2">Doginator 3000</h2>
        <div className="main-portrait-container col-9">
          <Link type="button" to="/edit-user">
            <img src="./images/frenchie.jpg" alt=""
              className={`rounded-circle img-thumbnail
            img-fluid main-portrait`} />
          </Link>
        </div>

        <div className='main-buttons-container d-flex justify-content-center flex-wrap col-11'>
          <Link type="button" to="/MyDogs"
            className={'btn btn-lg btn-block my-4 button'}>
            <p className="p-0 m-0 my-dogs-view">My Dogs</p>
          </Link>
          <i className="fas fa-paw"></i>
          <Link type="button" to="/Scan"
            className={'btn btn-lg btn-block my-4 button'}>
            <p className="p-0 m-0 scan-view">Scan</p>
          </Link>
          <i className="fas fa-paw"></i>
          <Link type="button" to="/Upload"
            className={'btn btn-lg btn-block my-4 button'}>
            <p className="p-0 m-0 upload-view">Upload</p>
          </Link>
          <i className="fas fa-paw"></i>
          <Link type="button" to="/Browse"
            className={'btn btn-lg btn-block my-4 button'}>
            <p className="p-0 m-0 browse-view">Browse</p>
          </Link>
        </div>
      </div>
    );

  }
}

export default MainView;
