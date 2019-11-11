import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      roles: ""
    };
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
    console.log("user form ", this.state);
  }
  handleSubmit(event) {
    event.preventDefault();
    console.log("user form submit ", this.state);

    this.props.onSave(this.state);
  }
  componentDidMount() {
    console.log("kiran user form", this.props.user);
    this.setState(this.props.user);
    console.log("kiran user form1", this.state);
  }
  UNSAFE_componentWillReceiveProps(ble) {
    this.setState(ble.user);
  }

  handleRolesChange = roles => {
    let value = roles.target.value;
    let name = roles.target.name;

    console.log("handleRolesChange", roles.target.name);
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
          <label htmlFor="username">User Name</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            placeholder="First Name"
            value={this.state.firstName}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            placeholder="First Name"
            value={this.state.lastName}
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
          <label htmlFor="password">Password</label>
          <input
            type="text"
            className="form-control"
            id="password"
            name="password"
            placeholder="Password"
            defaultValue={this.state.password}
            onChange={this.handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="roles">Role</label>
          <select
            className="form-control"
            onChange={this.handleRolesChange}
            name="roles"
            id="roles"
          >
            <option id="standard">Standard</option>
            <option id="admin">Admin</option>
          </select>
          only Values standard or admin
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

UserForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  user: PropTypes.object
};
export default UserForm;
