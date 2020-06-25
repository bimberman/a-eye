import React from 'react';
import InfoDropDown from './info-dropdown';

class ViewInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: ''
    };
  }

  componentDidMount() {
    fetch(`/api/breeds/${this.props.currentBreed}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ info: data });
      })
      .catch(err => console.error(err));
  }

  render() {
    const { changeAppView } = this.props;
    const { info } = this.state;
    const noDataText = 'No data found on the database.';
    return (
      <div>
        <div className="back-to-main p-0 text-left col-12">
          <i className="fas fa-chevron-left"
            onClick={() => changeAppView('main')}></i>
        </div>
        <InfoDropDown title={ info.name }
          description={info.shortDescription}
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
  }
}

export default ViewInfo;
