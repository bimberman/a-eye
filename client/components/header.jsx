import React from 'react';
import { Button } from 'reactstrap';
import { useHistory, Link, useLocation } from 'react-router-dom';

const Header = props => {
  const history = useHistory();
  const location = useLocation();
  const { buttonCB, hasButton, buttonText, to } = props;
  const path = to || location.pathname;
  const actionButton = hasButton
    ? <Link className="btn m-2 bg-transparent border-0"
      onClick={buttonCB} type="button" to={path}>
      <h6 className="col-12 p-0 m-0 d-flex align-items-center">
        {buttonText}
      </h6>
    </Link>
    : null;
  return (
    <div>
      <div className="d-flex justify-content-start col-12 d-lg-none">
        <Button className="btn m-2 bg-transparent border-0 col-2"
          onClick={() => history.goBack()} type="button">
          <i className="fa fa-chevron-left fa-2x col-2 d-flex align-items-center"></i>
        </Button>
        <h4 className="col-12 p-0 m-0 d-flex align-items-center">
          {props.pageName}
        </h4>
        {actionButton}
      </div>

      <div className='d-none d-lg-block'>
        <header className='d-flex flex-nowrap align-items-baseline justify-content-between desktop-header'>
          <div>
            <Link to='/'>
              <img
                src="./images/user-icon.png"
                alt="Muscular gray dog cartoon standing up in front of red shield background"
                className='rounded-circle img-thumbnail img-fluid header-image m-2'
              />
            </Link>
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
};

export default Header;
