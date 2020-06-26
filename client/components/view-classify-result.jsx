import React from 'react';
import Header from './header';
import InfoDropDown from './info-dropdown';
import { Link } from 'react-router-dom';

class ViewClassifyResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrls: ''
    };
  }

  componentDidMount() {
    const { info } = this.props.prediction;
    fetch(`https://dog.ceo/api/breed/${info.apiKeyWord}/images/random/3`)
      .then(res => res.json())
      .then(data => this.setState({ imageUrls: data.message }));
  }

  render() {
    const { info, confidence, label, imagePath } = this.props.prediction;
    const noDataText = 'No data found in the database.';
    let relatedImages;
    if (this.state.imageUrls) {
      relatedImages = this.state.imageUrls.map((url, index) => {
        return (
          <img src={url} key={index}
            className={`img-thumbnail
             img-fluid view-info-image`} />
        );
      });
    }
    const predictionText = (
      <div>
        <p>Confidence: {`%${(confidence * 100).toFixed(2)}`}</p>
        <p>{info.shortDescription || noDataText}</p>
      </div>
    );
    const result = (
      <div className="d-flex flex-wrap justify-content-center">
        <div className="preview-image-container text-center">
          <img src={imagePath}
            className={`rounded-circle img-thumbnail
            img-fluid preview-image`} />
        </div>

        <div className="col-12 text-center">
          <Link className="btn btn-sm btn-light"
            onClick={this.resetImage}
            to="/Upload">
            <span>Try new image</span>
          </Link>
        </div>

        <InfoDropDown title={label}
          description={predictionText}
          imageUrl={info.imageUrl || './images/user-icon.png'}>
        </InfoDropDown>

        <InfoDropDown title={'History'}
          description={info.historicalUsage || noDataText}
          imageUrl={info.imageUrl || './images/user-icon.png'}>
        </InfoDropDown>

        <InfoDropDown title={'Temper'}
          description={info.temperament || noDataText}
          imageUrl={info.imageUrl || './images/user-icon.png'}>
        </InfoDropDown>

        <InfoDropDown title={'Photos'}
          description={relatedImages}
          imageUrl={info.imageUrl || './images/user-icon.png'}>
        </InfoDropDown>

      </div>
    );
    return (
      <div className="container p-0 d-flex flex-wrap justify-content-center">
        <div className="back-to-main p-0 text-left col-12">
          <Header pageName="Result" />
        </div>
        {result}
      </div>

    );
  }
}

export default ViewClassifyResult;
