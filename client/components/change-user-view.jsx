import React from 'react';
import Header from './header';
import User from './user';
// import { Link, useHistory } from 'react-router-dom';

export default class ChangeUserView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
    // this.getUsers = this.getUsers.bind(this);
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers() {
    fetch('/api/users')
      .then(response => response.json())
      .then(users => this.setState({ users: users }))
      .catch(err => console.error(err));
  }

  render() {
    const editUsersView = this.state.users.map((user, index) => {
      return <User user={user}
        index={index}
        cb={this.props.changeUser}
        key={user.userId}/>;
    });
    return <div className="d-flex align-items-center flex-column">
      <Header pageName="Change User" />
      <h5>Please select<br />a user from the list below</h5>
      <div className="col-11">
        {editUsersView}
      </div>
    </div>;
  }
}
