import React from 'react';
import MainView from './main-view';
import OwnedDogs from './owned-dogs';
import Loading from './loading';
import UploadPage from './upload-page';
import BreedsView from './breeds-view';
import ViewInfo from './view-info';
import EditUserView from './edit-user-view';
import ViewClassifyResult from './view-classify-result';
import EditBreedsView from './edit-breeds-view';
import ChangeUserView from './change-user-view';
import Help from './help';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import ViewPhotos from './view-photos';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: 'false',
      breeds: [],
      view: 'main',
      userId: 1,
      currentBreed: 'Pug',
      currentOwnedDogId: '',
      prediction: '',
      currentDog: ''
    };
    this.toggleLoading = this.toggleLoading.bind(this);
    this.changePredictionState = this.changePredictionState.bind(this);
    this.changeCurrentBreed = this.changeCurrentBreed.bind(this);
    this.changeCurrentDog = this.changeCurrentDog.bind(this);
    this.changeUser = this.changeUser.bind(this);
    this.currentOwnedDogId = this.currentOwnedDogId.bind(this);
  }

  componentDidMount() {
    this.getBreeds();
    this.setState({
      isLoading: false
    });
  }

  changePredictionState(prediction) {
    this.setState({
      prediction: prediction
    });
  }

  changeCurrentBreed(breed) {
    this.setState({ currentBreed: breed });
  }

  currentOwnedDogId(newOwnedDogId) {
    this.setState({ currentOwnedDogId: newOwnedDogId });
  }

  changeCurrentDog(ownedDogId) {
    this.setState({ currentDog: ownedDogId });
  }

  changeUser(userId) {
    this.setState({ userId: userId });
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
          <Route exact path="/">
            <MainView />
          </Route>
          <Route path="/MyDogs">
            <OwnedDogs userId={this.state.userId}
              changeCurrentBreed={this.changeCurrentBreed}
              changeCurrentDog={this.changeCurrentDog}
            />
          </Route>
          <Route path="/Help">
            <Help />
          </Route>
          <Route path="/Upload">
            <UploadPage changePredictionState={this.changePredictionState}
              toggleLoading={this.toggleLoading} />
            {loadPage}
          </Route>
          <Route path="/Browse">
            <BreedsView breeds={this.state.breeds}
              changeCurrentBreed={this.changeCurrentBreed} />
          </Route>
          <Route path="/ViewInfo">
            <ViewInfo currentBreed={this.state.currentBreed} />
          </Route>
          <Route path="/ViewClassifyResult">
            <ViewClassifyResult
              prediction={this.state.prediction}
              userId={this.state.userId}
              currentOwnedDogId={this.currentOwnedDogId} />
          </Route>
          <Route path="/edit-user">
            <EditUserView userId={this.state.userId} />
          </Route>
          <Route path="/change-user">
            <ChangeUserView changeUser={this.changeUser}/>
          </Route>
          <Route path="/edit-breed">
            <EditBreedsView
              breeds={this.state.breeds}
              userId={this.state.userId}
              prediction={this.state.prediction}
              changeCurrentBreed={this.changeCurrentBreed}
              changePredictionState={this.changePredictionState}
              currentOwnedDogId={this.state.currentOwnedDogId}/>
          </Route>
          <Route path="/ViewPhotos">
            <ViewPhotos currentDog={this.state.currentDog}/>
          </Route>
        </Switch>
      </Router>
    );
  }
}
