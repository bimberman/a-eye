import React from 'react';
import MainView from './main-view';
import Loading from './loading';
import BreedsView from './breeds-view';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'loading',
      breeds: []
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

  // fake load to show loadscreen for now
  componentDidMount() {
    this.getBreeds();
    setTimeout(() => this.setState({ view: 'main' }), 2000);
  }

  getBreeds() {
    fetch('/api/breeds')
      .then(res => res.json())
      .then(data => this.setState(prevState => {
        return { ...prevState, breeds: data };
      }));
  }

  render() {
    const { view } = this.state;
    let currentView = '';

    switch (view) {
      case 'main':
        currentView = <MainView handleView={this.handleView} />;
        break;
      case 'loading':
        currentView = <Loading/>;
        break;
      case 'browse':
        currentView = <BreedsView breeds={this.state.breeds}/>;
        break;
    }

    return (
      <div className={'main-container container-fluid p-5'}>
        {currentView}
      </div>
    );
  }
}
