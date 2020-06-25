import React from 'react';
import MainView from './main-view';
import OwnedDogs from './owned-dogs';
import Loading from './loading';
import UploadPage from './upload-page';
import BreedsView from './breeds-view';
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
      userId: 1
    };
    this.toggleLoading = this.toggleLoading.bind(this);
  }

  componentDidMount() {
    this.getBreeds();
    this.setState({ isLoading: false });
    this.getBreeds();
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
        currentView = <OwnedDogs userId={this.state.userId} />;
        break;
      case 'loading':
        currentView = <Loading />;
        break;
      case 'browse':
        currentView = <BreedsView breeds={this.state.breeds} />;
        break;
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
