import React from 'react';
import MainView from './main-view';
import OwnedDogs from './owned-dogs';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'main',
      userId: 5
    };
    this.handleView = this.handleView.bind(this);
  }

  handleView(e) {
    const { classList } = e.target;
    if (classList.contains('my-dogs-button')) {
      return this.setState({ view: 'my-dogs' });
    }
    if (classList.contains('scan-button')) {
      return this.setState({ view: 'scan' });
    }
    if (classList.contains('upload-button')) {
      return this.setState({ view: 'upload' });
    }
    if (classList.contains('browse-button')) {
      return this.setState({ view: 'browse' });
    }
  }

  render() {
    const { view } = this.state;
    let currentView = '';

    switch (view) {
      case 'main':
        currentView = <MainView handleView={this.handleView} />;
        break;
      case 'my-dogs':
        currentView = <OwnedDogs userId={this.state.userId} />;
        break;
    }

    return (
      <div className={'main-container container-fluid p-5'}>
        {currentView}
      </div>
    );
  }
}
