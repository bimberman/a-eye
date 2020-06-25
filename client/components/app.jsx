import React from 'react';
import MainView from './main-view';
import OwnedDogs from './owned-dogs';
import Loading from './loading';
import UploadPage from './upload-page';
import BreedsView from './breeds-view';
import ViewInfo from './view-info';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      breeds: [],
      view: 'main',
      isLoading: 'true',
      userId: 1,
      currentBreed: 'Pug'
    };
    this.toggleLoading = this.toggleLoading.bind(this);
  }

  componentDidMount() {
    this.getBreeds();
    this.setState({ isLoading: false });
    this.getBreeds();
  }

  changeAppView(view, currentBreed) {
    this.setState({
      view: view,
      currentBreed: currentBreed
    });
  }
        
  toggleLoading(status) {
    this.setState({ isLoading: status });
  }

  getBreeds() {
    if (!this.state.breeds.length) {
      fetch('/api/breeds')
        .then(res => res.json())
        .then(data => this.setState(prevState => {
          return { ...prevState, breeds: data };
        }));
    }
  }

  render() {
    const { view, isLoading, currentBreed } = this.state;
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
        currentView = <OwnedDogs userId={this.state.userId} />;
        break;
      case 'browse':
        currentView = <BreedsView breeds={this.state.breeds}
          changeAppView={this.changeAppView}/>;
        break;
      case 'view-info':
        currentView = <ViewInfo currentBreed={currentBreed}
          changeAppView={this.changeAppView}/>;
    }

    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <MainView />
          </Route>
          <Route path="/MyDogs">
            <OwnedDogs userId={this.state.userId} />
          </Route>
          <Route path="/Scan">
            <div>
              <h2>Scan</h2>
            </div>
          </Route>
          <Route path="/Upload">
            <UploadPage changeAppView={this.changeAppView} />
          </Route>
          <Route path="/Browse">
            <BreedsView breeds={this.state.breeds} />
          </Route>
          <Route path="/Loading">
            <Loading />
          </Route>
        </Switch>
      </Router>
    );
  }
}
