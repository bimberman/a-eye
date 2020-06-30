import React from 'react';
import { Button } from 'reactstrap';

export default class EditableButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      text: null
    };
    this.handleButtonPress = this.handleButtonPress.bind(this);
    this.handleButtonRelease = this.handleButtonRelease.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.buttonPressTimer = null;
    this.handleBlur = this.handleBlur.bind(this);
  }

  componentDidMount() {
    this.setState({ text: this.props.text });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.text !== this.props.text) {
      this.setState({ text: this.props.text });
    }
  }

  handleButtonPress(e) {
    this.buttonPressTimer = setTimeout(() => this.setState({ isEdit: true }), 300);
  }

  handleChange(e) {
    this.setState({
      text: e.target.value
    });
  }

  handleBlur(e) {
    this.setState({ isEdit: false });
  }

  handleButtonRelease() {
    clearTimeout(this.buttonPressTimer);
  }

  render() {
    const { text } = this.state;

    return this.state.isEdit
      ? (
        <Button className="btn btn-lg custom-button col-12 my-4"
          type="button"
          name="email"
          onTouchStart={this.handleButtonPress}
          onTouchEnd={this.handleButtonRelease}
          onMouseDown={this.handleButtonPress}
          onMouseUp={this.handleButtonRelease}
          onMouseLeave={this.handleButtonRelease}>
          <input placeholder={this.state.text}
            onChange={this.handleChange}
            className="m-0 p-0"
            onBlur={this.handleBlur} />
        </Button>
      )
      : (
        <Button className="btn btn-lg custom-button col-12 my-4"
          type="button"
          name="email"
          onTouchStart={this.handleButtonPress}
          onTouchEnd={this.handleButtonRelease}
          onMouseDown={this.handleButtonPress}
          onMouseUp={this.handleButtonRelease}
          onMouseLeave={this.handleButtonRelease}>
          <p className="m-0 p-0">{text}</p>
        </Button>
      );
  }
}
