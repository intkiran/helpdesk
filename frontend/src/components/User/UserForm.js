import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { history } from "../../utils/history";
import { Button, Form, FormGroup, Label, Input, Col } from "reactstrap";

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
  goBack() {
    history.push("/users");
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
    let userTitle = "New user";
    if (this.state.username) {
      userTitle = "Edit User - " + this.state.firstName;
    }
    return (
      <Form className="ticket-container">
        <h5>{userTitle}</h5>

        <FormGroup className="col-6" row>
          <Label sm={4}>User Name</Label>
          <Col sm={6}>
            <Input
              type="text"
              name="username"
              placeholder="Username"
              value={this.state.username}
              onChange={this.handleInputChange}
            />
          </Col>
        </FormGroup>
        <FormGroup className="col-6" row>
          <Label sm={4}>First Name</Label>
          <Col sm={6}>
            <Input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First Name"
              value={this.state.firstName}
              onChange={this.handleInputChange}
            />
          </Col>
        </FormGroup>
        <FormGroup className="col-6" row>
          <Label sm={4}>Last Name</Label>
          <Col sm={6}>
            <Input
              type="text"
              className="form-control"
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              value={this.state.lastName}
              onChange={this.handleInputChange}
            />
          </Col>
        </FormGroup>
        <FormGroup className="col-6" row>
          <Label sm={4}>Email</Label>
          <Col sm={6}>
            <Input
              type="text"
              className="form-control"
              id="email"
              name="email"
              placeholder="email"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
          </Col>
        </FormGroup>
        <FormGroup className="col-6" row>
          <Label sm={4}>Email</Label>
          <Col sm={6}>
            <Input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Password"
              defaultValue={this.state.password}
              onChange={this.handleInputChange}
            />
          </Col>
        </FormGroup>
        <FormGroup className="col-6" row>
          <Label sm={4}>roles</Label>
          <Col sm={6}>
            <Input
              type="select"
              className="form-control"
              onChange={this.handleRolesChange}
              name="roles"
              id="roles"
            >
              <option id="standard">Standard</option>
              <option id="admin">Admin</option>
            </Input>
          </Col>
        </FormGroup>
        <div className="col-12 text-center">
          <Button
            className="center-block btn-success"
            onClick={this.handleSubmit}
          >
            Submit
          </Button>
          <Link to="/users" className="btn btn-primary">
            Back
          </Link>
        </div>
      </Form>
    );
  }
}

UserForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  user: PropTypes.object
};

export default UserForm;
