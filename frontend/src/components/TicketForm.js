import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, Col } from "reactstrap";
import { StatusTypes, CategoryTypes, PriorityTypes } from "../utils/constants";

class TicketForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      fullName: "",
      email: "",
      category: "1",
      priority: "1",
      status: "1",
      subject: "",
      comments: [],
      message: "",
      CrtdOn: "",
      ModOn: ""
    };
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
    console.log("ticket form ", this.state);
  }
  handleSubmit(event) {
    event.preventDefault();
    console.log("ticket form submit ", this.state);

    this.props.onSave(this.state);
  }
  componentDidMount() {
    console.log("kiran ticket form", this.props.ticket);
    this.setState(this.props.ticket);
    console.log("kiran ticket form1", this.state);
  }
  UNSAFE_componentWillReceiveProps(ble) {
    this.setState(ble.ticket);
  }

  handleSelectChange = (value, name) => {
    let newValue = null;
    if (name === "status") {
      newValue = Object.keys(StatusTypes)[
        Object.values(StatusTypes).indexOf(value)
      ];
    }
    if (name === "category") {
      newValue = Object.keys(CategoryTypes)[
        Object.values(CategoryTypes).indexOf(value)
      ];
    }
    if (name === "priority") {
      newValue = Object.keys(PriorityTypes)[
        Object.values(PriorityTypes).indexOf(value)
      ];
    }
    this.setState(
      prevState => {
        return {
          ...prevState,
          [name]: newValue
        };
      },
      () => console.log("kiran new", this.state)
    );
  };

  render() {
    return (
      <Form className="ticket-container">
        <h5>New Ticket </h5>
        <FormGroup className="col-6" row>
          <Label sm={4}>Category</Label>
          <Col sm={6}>
            <Input
              type="select"
              onChange={event =>
                this.handleSelectChange(event.target.value, "category")
              }
              name="category"
              id="category"
            >
              <option id="1">Design</option>
              <option id="2">UX</option>
              <option id="3">Development</option>
              <option id="4">Testing</option>
              <option id="5">Deployment</option>
              <option id="6">Acceptence</option>
            </Input>
          </Col>
        </FormGroup>
        <FormGroup className="col-6" row>
          <Label sm={4}>Status</Label>
          <Col sm={6}>
            <Input
              type="select"
              onChange={event =>
                this.handleSelectChange(event.target.value, "status")
              }
              name="status"
              id="status"
            >
              <option id="Open">Open</option>
              <option id="1">Progress</option>
              <option id="2">Completed</option>
              <option id="3">Closed</option>
            </Input>
          </Col>
        </FormGroup>
        <FormGroup className="col-6" row>
          <Label sm={4}>Subject</Label>
          <Col sm={6}>
            <Input
              type="text"
              id="subject"
              name="subject"
              placeholder="Subject"
              value={this.state.subject}
              onChange={this.handleInputChange}
            />
          </Col>
        </FormGroup>

        <FormGroup className="col-6" row>
          <Label sm={4}>email</Label>
          <Col sm={6}>
            <Input
              type="text"
              id="email"
              name="email"
              placeholder="email"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
          </Col>
        </FormGroup>
        <FormGroup className="col-6" row>
          <Label sm={4}>fullName</Label>
          <Col sm={6}>
            <Input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="fullName"
              defaultValue={this.state.fullName}
              onChange={this.handleInputChange}
            />
          </Col>
        </FormGroup>
        <FormGroup className="col-6" row>
          <Label sm={4}>priority</Label>
          <Col sm={6}>
            <Input
              type="select"
              onChange={event =>
                this.handleSelectChange(event.target.value, "priority")
              }
              name="priority"
              id="priority"
            >
              <option id="low">Low</option>
              <option id="medium">Medium</option>
              <option id="high">High</option>
            </Input>
          </Col>
        </FormGroup>
        <FormGroup className="col-6" row>
          <Label sm={4}>message</Label>
          <Col sm={6}>
            <Input
              type="textarea"
              id="message"
              name="message"
              placeholder="message"
              defaultValue={this.state.message}
              onChange={this.handleInputChange}
            />
          </Col>
        </FormGroup>
        <div className="col-12 text-center">
          <Button
            className="center-block btn-primary"
            onClick={this.handleSubmit}
          >
            Submit
          </Button>

          <Link to="/tickets" className="btn btn-primary">
            Back
          </Link>
        </div>
      </Form>
    );
  }
}

TicketForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  ticket: PropTypes.object
};
export default TicketForm;
