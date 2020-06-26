import React from 'react';
import MainView from './main-view';
import OwnedDogs from './owned-dogs';
import Loading from './loading';
import UploadPage from './upload-page';
import BreedsView from './breeds-view';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'main',
      isLoading: 'true',
      userId: 1
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
    this.getBreeds();
  }

  changeAppView(view) {
    this.setState({ view: view });
  }

  toggleLoading(status) {
    this.setState({ isLoading: status });
  }

  getBreeds() {
    fetch('/api/breeds')
      .then(res => res.json())
      .then(data => this.setState(prevState => {
        return { ...prevState, breeds: data };
      }));
  }

  render() {
    const { view, isLoading } = this.state;
    let currentView = '';
    const loadingScreen = isLoading
      ? <Loading />
      : '';
    switch (view) {
      case 'main':
        currentView = <MainView handleView={this.handleView} />;
        break;
      case 'upload':
        currentView = <UploadPage changeAppView={this.changeAppView}
          toggleLoading={this.toggleLoading} />;
        break;
      case 'my-dogs':
        currentView = <OwnedDogs userId={this.state.userId} changeAppView={this.changeAppView} />;
        break;
      case 'loading':
        currentView = <Loading />;
        break;
      case 'browse':
        currentView = <BreedsView breeds={this.state.breeds} />;
        break;
    }

    return (
      <div className={'main-container container-fluid p-5 text-center'}>
        {currentView}
        {loadingScreen}
      </div>
    );
  }
}
