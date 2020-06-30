import React from 'react';
import { Link } from 'react-router-dom';

class MainView extends React.Component {

  render() {
    return (
      <div>
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
        <div className='d-none d-lg-block'>
          <header className='d-flex flex-nowrap align-items-center justify-content-between desktop-header'>
            <div>
              <img
                src="./images/user-icon.png"
                alt="Muscular gray dog cartoon standing up in front of red shield background"
                className='rounded-circle img-thumbnail img-fluid header-image m-2'
              />
            </div>
            <div className='d-flex justify-content-around align-items-center col-11'>
              <Link to='/MyDogs'>
                <p>My Dogs</p>
              </Link>
              <Link to='/Scan'>
                <p>Scan</p>
              </Link>
              <Link to='/Upload'>
                <p>Upload</p>
              </Link>
              <Link to='/Browse'>
                <p>Browse</p>
              </Link>
            </div>
          </header>
        </div>
      </div>
    );

  }
}

export default MainView;
