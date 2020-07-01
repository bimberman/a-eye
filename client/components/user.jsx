import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';

const User = props => {
  const { userId, username } = props.user;
  const { cb } = props;
  const history = useHistory();
  const pawprint = props.index ? <i className="fas fa-paw text-center pb-3"></i> : '';
  return (
    <div className="d-flex flex-column align-items-center"
      onClick={() => cb(userId)}>
      {pawprint}
      <Button type="button" onClick={() => history.goBack()}
        className={'btn btn-lg btn-block my-4 border-0 button col-11'}>
        <p className="p-0 m-0 my-dogs-view">{username}</p>
      </Button>
    </div>
  );
};

export default User;
