import React from 'react';
import * as ml5 from 'ml5';

class PredictPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modelLoaded: false
    };
    this.imageRef = React.createRef();
  }

  sendLogits(image) {
    const input = image.current;
    const logits = this.extractor.infer(input);
    // eslint-disable-next-line no-console
    console.log(logits);
    fetch('/api/classify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        logits: Array.from(logits.dataSync()),
        shape: logits.shape
      })
    });
  }

  componentDidMount() {
    this.extractor = ml5.featureExtractor('MobileNet', this.setState({ modelLoaded: true }));
  }

  render() {
    const { modelLoaded } = this.state;
    const disabled = !modelLoaded;
    return (
      <div>
        <img src="/images/pug.jpg" ref={this.imageRef}
          className='container-fluid'/>

        <div className="col-md-4 col-lg-2">
          <button className="btn btn-primary btn-block"
            onClick={() => this.sendLogits(this.imageRef)}
            disabled={disabled}> Classify Image
          </button>
        </div>
      </div>
    );
  }
}

export default PredictPage;
