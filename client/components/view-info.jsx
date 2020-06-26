import React from 'react';
import InfoDropDown from './info-dropdown';
import Header from './header';

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
    const { info } = this.state;
    const noDataText = 'No data found on the database.';
    return (
      <div>
        <Header pageName="Breeds" />
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
