import React from "react";
import PropTypes from "prop-types";
import { Button, Form, FormGroup, Label, Col, Input } from "reactstrap";
import {
  StatusTypes,
  CategoryTypes,
  PriorityTypes
} from "../../utils/constants";
import { history } from "../../utils/history";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import { Link } from "react-router-dom";

class TicketDetailsForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);

    this.state = {
      fullName: "",
      email: "",
      category: "",
      priority: "",
      status: "",
      comments: null,
      uid: "",
      subject: "",
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
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.onUpdateTicket(this.state);
  }
  handleCommentSubmit = newcomment => {
    let newcomments = [...this.state.comments];
    newcomments.push(newcomment);
    this.setState({ comments: newcomments }, () => {
      this.props.onCommentUpdate(this.state);
    });
  };

  componentDidMount() {
    this.setState(this.props.ticket);
  }

  componentWillMount() {
    this.setState(this.props.ticket);
  }

  UNSAFE_componentWillReceiveProps(ble) {
    this.setState(ble.ticket);
  }

  handlePriorityChange = priority => {
    let value = priority.target.value;
    let name = priority.target.name;
    this.setState(
      prevState => {
        return {
          ...prevState,
          [name]: value
        };
      },
      () => console.log("Updated state", this.state)
    );
  };
  closeTicket() {
    history.push("/tickets");
  }

  render() {
    return (
      <div className="ticket-container">
        <Form>
          <h5>
            Ticket Details - {this.state.subject}
            {this.props.role === "standard" && (
              <Button className="pull-right" onClick={this.handleSubmit}>
                Save
              </Button>
            )}
            <Link to="/tickets" className="btn btn-primary pull-right">
              Back
            </Link>
          </h5>

          <FormGroup sm={12} row>
            <Col sm={1}>
              <Label>Id</Label>
            </Col>
            <Col sm={5}>{this.state._id}</Col>
            <Col sm={1}>
              <Label>Status</Label>
            </Col>
            {
              <Col sm={3}>
                {this.props.role === "admin" ? (
                  <Input
                    type="select"
                    name="status"
                    value={this.state.status}
                    onChange={this.handlePriorityChange}
                  >
                    <option value="0">Open</option>
                    <option value="1">Progress</option>
                    <option value="2">Completed</option>
                    <option value="3">Closed</option>
                  </Input>
                ) : (
                  StatusTypes[this.state.status]
                )}
              </Col>
            }
          </FormGroup>
          <FormGroup sm={12} row>
            <Col sm={1}>
              <Label>Created</Label>
            </Col>
            <Col sm={5}>{this.state.fullName}</Col>
            <Col sm={1}>
              <Label>Date </Label>
            </Col>
            <Col sm={5}>{this.state.createdDate}</Col>
          </FormGroup>

          <FormGroup sm={12} row>
            <Col sm={1}>
              <Label>Category </Label>
            </Col>
            <Col sm={5}>{CategoryTypes[this.state.category]}</Col>
            <Col sm={1}>
              <Label>Priority</Label>
            </Col>
            <Col sm={5}>{PriorityTypes[this.state.priority]}</Col>
          </FormGroup>

          <FormGroup sm={12} row>
            <Col sm={1}>
              <Label>Subject</Label>
            </Col>
            <Col sm={5}>{this.state.subject}</Col>

            <Col sm={1}>
              <Label>Description</Label>
            </Col>
            <Col sm={5}>{this.state.description}</Col>
          </FormGroup>

          <FormGroup sm={12} row>
            <div sm={12} row className="comment-box">
              <CommentForm
                data={this.props.comments}
                ticket={this.props.ticket}
                onCommentSubmit={this.handleCommentSubmit}
              />
              <CommentList data={this.props.ticket} />
            </div>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

TicketDetailsForm.propTypes = {
  onUpdateTicket: PropTypes.func.isRequired,
  onCommentUpdate: PropTypes.func.isRequired,
  ticket: PropTypes.object
};
export default TicketDetailsForm;
