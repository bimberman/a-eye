import React from 'react';
import PredictPage from './predict-page';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true
    };

  }

  render() {
    return <PredictPage />;
  }
}
