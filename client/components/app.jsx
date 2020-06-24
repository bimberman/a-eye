import React from 'react';
import MainView from './main-view';
import Loading from './loading';
import UploadPage from './upload-page';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'main',
      isLoading: 'true'
    };
    this.handleView = this.handleView.bind(this);
    this.changeAppView = this.changeAppView.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
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
      this.setState({ view: 'upload' });
      return;
    }
    if (classList.contains('browse-button')) {
      return this.setState({ view: 'browse' });
    }
  }

  componentDidMount() {
    this.setState({ isLoading: false });
  }

  // fake load to show loadscreen for now
  // componentDidMount() {
  //   setTimeout(() => this.setState({ view: 'main' }), 2000);
  // }
  changeAppView(view) {
    this.setState({ view: view });
  }

  toggleLoading() {

  }

  render() {
    const { view, isLoading } = this.state;
    let currentView = '';
    const loadingScreen = isLoading
      ? <Loading/>
      : '';
    switch (view) {
      case 'main':
        currentView = <MainView handleView={this.handleView} />;
        break;
      case 'upload':
        currentView = <UploadPage changeAppView={this.changeAppView}
          toggleLoading={this.toggleLoading}/>;
    }

    return (
      <div className={'main-container container-fluid p-5'}>
        {currentView}
        {loadingScreen}
      </div>
    );
  }
}
