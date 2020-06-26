import React from 'react';
import { Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';

const Header = props => {
  const history = useHistory();
  return (
    <div className="d-flex justify-content-start col-12">
      <Button className="btn m-2 bg-transparent border-0"
        onClick={() => history.goBack()} type="button">
        <i className="fa fa-chevron-left fa-2x col-2 d-flex align-items-center"></i>
      </Button>
      <h4 className="col-6 p-0 m-0 d-flex align-items-center">
        {props.pageName}
      </h4>
    </div>
  );
};

export default Header;
