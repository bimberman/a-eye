import React from 'react';
import { Link } from 'react-router-dom';
import Header from './header';

class MainView extends React.Component {

  render() {
    return (
      <div>
        <div className='d-none d-lg-block'>
          <Header />
        </div>
        <div className={`container-fluid d-flex justify-content-center
      flex-wrap align-content-between d-lg-none`}>
          <div className="main-portrait-container col-9">
            <img src="./images/frenchie.jpg" alt=""
              className={`rounded-circle img-thumbnail
            img-fluid main-portrait`} />
          </div>

          <div className='main-buttons-container d-flex justify-content-center flex-wrap col-11'>
            <Link type="button" to="/MyDogs"
              className={'btn btn-lg btn-block my-4 button'}>
              <p className="p-0 m-0 my-dogs-view">My Dogs</p>
            </Link>
            <i className="fas fa-paw mx-lg-2"></i>
            <Link type="button" to="/Scan"
              className={'btn btn-lg btn-block my-4 button'}>
              <p className="p-0 m-0 scan-view">Scan</p>
            </Link>
            <i className="fas fa-paw mx-lg-2"></i>
            <Link type="button" to="/Upload"
              className={'btn btn-lg btn-block my-4 button'}>
              <p className="p-0 m-0 upload-view">Upload</p>
            </Link>
            <i className="fas fa-paw mx-lg-2"></i>
            <Link type="button" to="/Browse"
              className={'btn btn-lg btn-block my-4 button'}>
              <p className="p-0 m-0 browse-view">Browse</p>
            </Link>
          </div>
        </div>
      </div>
    );

  }
}

export default MainView;
