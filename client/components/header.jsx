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
    <div className="d-flex justify-content-start col-12">
      <Button className="btn m-2 bg-transparent border-0 col-2"
        onClick={() => history.goBack()} type="button">
        <i className="fa fa-chevron-left fa-2x col-2 d-flex align-items-center"></i>
      </Button>
      <h4 className="col-5 p-0 m-0 d-flex align-items-center text-center">
        {props.pageName}
      </h4>
      {actionButton}
    </div>
  );
};

export default Header;
