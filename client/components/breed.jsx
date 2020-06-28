import React from 'react';
import { Link } from 'react-router-dom';
import InfoDropDown from './info-dropdown';

class Breed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.setIsOpen = this.setIsOpen.bind(this);
  }

  setIsOpen(e) {
    this.setState(prevState => {
      return { ...prevState, isOpen: !this.state.isOpen };
    });
  }

  render() {
    const { changeCurrentBreed } = this.props;
    return (
      <div>
        <InfoDropDown
          imageUrl={this.props.imageUrl}
          title={this.props.breed}
          description={
            <div className='text-center d-flex flex-column'>
              {this.props.shortDescription}
              <Link className="btn btn-sm btn-light" to="/ViewInfo"
                onClick={() => changeCurrentBreed(this.props.breed)}>
                <span>View more</span>
              </Link>
            </div>
          } />
      </div>
    );
  }

}

export default Breed;
