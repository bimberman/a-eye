import React from 'react';
import Header from './header';
import EditableButton from './editable-button';

class UserView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userId: 1,
      username: '',
      email: ''
    };
    this.getUser = this.getUser.bind(this);
  }

  componentDidMount() {
    this.getUser(this.props.userId);
  }

  getUser(userId) {
    fetch(`/api/users/${userId}`)
      .then(response => response.json())
      .then(user => this.setState(user));
  }

  render() {
    const { username, email } = this.state;
    return (
      <div className="container-fluid d-flex justify-content-center
      flex-wrap align-content-between">
        <Header pageName="Edit User" />
        <div
          className={`container-fluid d-flex justify-content-center
                      flex-wrap align-content-between`}>
          <div className="main-portrait-container col-9 btn btn-lg btn-block">
            <img src="./images/frenchie.jpg" alt=""
              className={`rounded-circle img-thumbnail
            img-fluid main-portrait`} />
          </div>
        </div>
        <div className='main-buttons-container d-flex justify-content-center flex-wrap col-11'>
          <EditableButton text={username}/>
          <i className="fas fa-paw"></i>
          <EditableButton text={email}/>
        </div>
      </div>
    );
  }
}

export default UserView;
