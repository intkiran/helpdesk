import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
class TicketForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      fullName: "",
      email: "",
      category: "",
      priority: "",
      status: "",
      subject: "",
      comments: "",
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

  handleRolesChange = priority => {
    let value = priority.target.value;
    let name = priority.target.name;

    console.log("handleRolesChange", priority.target.name);
    this.setState(
      prevState => {
        return {
          ...prevState,
          [name]: value
        };
      },
      () => console.log("kiran new", this.state)
    );
  };

  render() {
    return (
      <form>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            className="form-control"
            id="category"
            name="category"
            placeholder="category"
            value={this.state.category}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            className="form-control"
            id="subject"
            name="subject"
            placeholder="Subject"
            value={this.state.subject}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="comment">comment</label>
          <input
            type="text"
            className="form-control"
            id="comment"
            name="comment"
            placeholder="comment"
            value={this.state.comment}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">email</label>
          <input
            type="text"
            className="form-control"
            id="email"
            name="email"
            placeholder="email"
            value={this.state.email}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="fullName">fullName</label>
          <input
            type="text"
            className="form-control"
            id="fullName"
            name="fullName"
            placeholder="fullName"
            defaultValue={this.state.fullName}
            onChange={this.handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="roles">priority</label>
          <select
            className="form-control"
            onChange={this.handleRolesChange}
            name="priority"
            id="priority"
          >
            <option id="low">Low</option>
            <option id="medium">Medium</option>
            <option id="high">High</option>
          </select>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={this.handleSubmit}
        >
          Submit
        </button>
        <Link to="/users" className="btn btn-primary">
          Back
        </Link>
      </form>
    );
  }
}

TicketForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  ticket: PropTypes.object
};
export default TicketForm;
