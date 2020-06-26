import React from 'react';
import Header from './header';
import InfoDropDown from './info-dropdown';

class ViewClassifyResult extends React.Component {
  render() {
    const { info, confidence } = this.props.prediction;
    const noDataText = 'No data found in the database.';
    const predictionText = (
      <div>
        <p>Confidence: {`%${(confidence * 100).toFixed(2)}`}</p>
        <p>{info.shortDescription || noDataText}</p>
      </div>
    );
    const result = (
      <div>
        <button className="btn btn-sm btn-light"
          onClick={this.resetImage}>
          <span>Try new image</span>
        </button>
        <InfoDropDown title={prediction.label}
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
