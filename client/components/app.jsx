import React from 'react';
import MainView from './main-view';
import OwnedDogs from './owned-dogs';
import Loading from './loading';
import UploadPage from './upload-page';
import BreedsView from './breeds-view';
import ViewInfo from './view-info';
import ViewClassifyResult from './view-classify-result';
import EditBreedsView from './edit-breeds-view';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: 'false',
      breeds: [],
      view: 'main',
      userId: 1,
      currentBreed: 'Pug',
      prediction: {
        confidence: 1,
        imagePath: '/images/dalmatian.jpg',
        info: {
          breedId: 1,
          historicalUsage: 'Dalmatians have a job description unique among AKC breeds: coach dog. Their traditional occupation was to trot beside horse-drawn coaches, and to guard the horses and rig when otherwise unattended. Dals were alongside the caravans of the Romani people, commonly known as gypsies, during their ceaseless wanderings around Europe. This association with the peripatetic Romani helps explain why Dal origins are so difficult to pin down—as with the gypsies themselves, the world was their home.',
          imageUrl: '/images/dalmatian.jpg',
          longDescription: 'The Dalmatian is a distinctively spotted dog; poised and alert; strong, muscular and active; free of shyness; intelligent in expression; symmetrical in outline; and without exaggeration or coarseness. The Dalmatian is capable of great endurance, combined with fair amount of speed. Deviations from the described ideal should be penalized in direct proportion to the degree of the deviation.',
          name: 'Dalmatian',
          shortDescription: 'Dalmatians have a white coat with black or liver color spots. They typically standing between 19 and 23 inches at the shoulder.',
          temperament: 'Reserved and dignified, Dals can be aloof with strangers and are dependable watchdogs. With their preferred humans, Dals are bright, loyal, and loving house dogs. They are strong, active athletes with great stamina—a wonderful partner for runners and hikers.',
          apiKeyWord: 'dalmatian'
        },
        label: 'Dalmatian'
      }
    };
    this.toggleLoading = this.toggleLoading.bind(this);
    this.changePredictionState = this.changePredictionState.bind(this);
    this.changeCurrentBreed = this.changeCurrentBreed.bind(this);
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
            <OwnedDogs userId={this.state.userId} />
          </Route>
          <Route path="/Scan">
            <div>
              <h2>Scan</h2>
            </div>
          </Route>
          <Route path="/Upload">
            <UploadPage changePredictionState={this.changePredictionState}
              toggleLoading={this.toggleLoading} />
            {loadPage}
          </Route>
          <Route path="/Browse">
            <BreedsView breeds={this.state.breeds}
              changeCurrentBreed={this.changeCurrentBreed}/>
          </Route>
          <Route path="/ViewInfo">
            <ViewInfo currentBreed={this.state.currentBreed}/>
          </Route>
          <Route path="/ViewClassifyResult">
            <ViewClassifyResult prediction={this.state.prediction} />
          </Route>
          <Route path="/edit-breed">
            <EditBreedsView breeds={this.state.breeds}
              prediction={this.state.prediction}
              changeCurrentBreed={this.changeCurrentBreed}
              changePredictionState={this.changePredictionState}/>
          </Route>
        </Switch>
      </Router>
    );
  }
}
