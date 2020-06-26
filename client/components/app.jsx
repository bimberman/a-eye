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
import ViewClassifyResult from './view-classify-result';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: 'false',
      breeds: [],
      view: 'main',
      userId: 1,
      currentBreed: 'Pug',
      prediction: ''
    };
    this.toggleLoading = this.toggleLoading.bind(this);
  }

  componentDidMount() {
    this.getBreeds();
    this.setState({ isLoading: false });
  }

  changeAppState(prediction) {
    this.setState({
      prediction: prediction
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
    const loadPage = this.state.isLoading
      ? (<div>
        <Loading />
      </div>)
      : '';

    return (
      <Router>
        <Switch>
          {loadPage}
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
            <UploadPage changeAppView={this.changeAppView}
              toggleLoading={this.toggleLoading} />
          </Route>
          <Route path="/Browse">
            <BreedsView breeds={this.state.breeds} />
          </Route>
          <Route path="/Loading">
            <Loading/>
          </Route>
          <Route path="/ViewInfo">
            <ViewInfo currentBreed={this.state.currentBreed}/>
          </Route>
          <Route path="/ViewClassifyResult">
            <ViewClassifyResult currentBreed={this.state.currentBreed} />
          </Route>
        </Switch>
      </Router>
    );
  }
}
