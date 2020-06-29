import React from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';

class InfoDropDown extends React.Component {
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
    return <div className="col-12 mb-4">
      <Button className="btn my-2 custom-button col-12"
        onClick={this.setIsOpen} type="button">
        <Card className="row bg-transparent border-0 d-flex flex-row">
          <div className="col-4 dropdown-img-container">
            <img src={this.props.imageUrl} alt=""
              className={'rounded-circle img-thumbnail img-fluid dropdown-img'} />
          </div>
          <h4 className="col-6 p-0 m-0 d-flex align-items-center">
            {this.props.title}
          </h4>
          {this.state.isOpen
            ? <i className="fa fa-chevron-up col-2 d-flex align-items-center"></i>
            : <i className="fa fa-chevron-down col-2 d-flex align-items-center"></i>}
        </Card>
      </Button>
      <Collapse isOpen={this.state.isOpen}>
        <Card className="custom-shadow">
          <CardBody>
            {this.props.description}
          </CardBody>
        </Card>
      </Collapse>
    </div>;
  }

}

export default InfoDropDown;
