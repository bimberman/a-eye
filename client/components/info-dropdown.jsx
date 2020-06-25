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
    return <div>
      <Button className="btn my-2 custom-button"
        onClick={this.setIsOpen} type="button">
        <Card className="row bg-transparent border-0 d-flex flex-row">
          <div className="col-4">
            <img src={this.props.imageUrl} alt=""
              className={'rounded-circle img-thumbnail img-fluid'} />
          </div>
          <h4 className="col-6 p-0 m-0 d-flex align-items-center">
            {this.props.title}
          </h4>
          <i className="fa fa-chevron-down col-2 d-flex align-items-center"></i>
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
