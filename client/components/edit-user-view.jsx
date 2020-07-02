import React from 'react';
import Header from './header';
import EditableButton from './editable-button';
import { Link } from 'react-router-dom';

class EditUserView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userId: 1,
      username: '',
      email: ''
    };
    this.getUser = this.getUser.bind(this);
    this.changeUsername = this.changeUsername.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
  }

  componentDidMount() {
    this.getUser(this.props.userId);
  }

  componentWillUnmount() {
    this.updateUser();
  }

  updateUser() {
    fetch(`api/users/${this.state.userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        email: this.state.email
      })
    })
      .catch(err => console.error(err));
  }

  changeUsername(newUsername) {
    this.setState({ username: newUsername });
  }

  changeEmail(newEmail) {
    this.setState({ email: newEmail });
  }

  getUser(userId) {
    fetch(`/api/users/${userId}`)
      .then(response => response.json())
      .then(user => this.setState(user))
      .catch(err => console.error(err));
  }

  render() {
    const { username, email } = this.state;
    return (
      <div className="container-fluid d-flex justify-content-center
      flex-wrap align-content-between">
        <div className="p-0 text-left col-12">
          <Header pageName="Edit User" />
        </div>
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
          <EditableButton changeProp={this.changeUsername} text={username}/>
          <i className="fas fa-paw"></i>
          <EditableButton changeProp={this.changeEmail} text={email}/>
          <i className="fas fa-paw"></i>
          <Link type="button" to="/change-user"
            className={'btn btn-lg btn-block my-4 button'}>
            <p className="p-0 m-0 my-dogs-view">Change User</p>
          </Link>
        </div>
      </div>
    );
  }
}

export default EditUserView;
