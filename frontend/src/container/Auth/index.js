import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../../components/spinner";

import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  FormFeedback,
  Alert
} from "reactstrap";
import * as actions from "../../store/actions/index";

class Auth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      submitted: false,
      loading: false,
      error: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });

    const { username, password } = this.state;
    if (!(username && password)) return;

    this.props.onAuth(username, password);
  }
  render() {
    const { username, password, submitted, error } = this.state;
    let spinnerIcon = null;
    if (this.props.loading) {
      spinnerIcon = <Spinner />;
    }

    let errorMessage = null;

    if (this.props.error) {
      errorMessage = (
        <Alert color="danger" isOpen="true" fade={false}>
          {this.props.error}
        </Alert>
      );
    }
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.handleSubmit}>
                      {spinnerIcon}
                      <h1>HelpDesk Login</h1>

                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          invalid={submitted && !username}
                          type="text"
                          placeholder="Username"
                          autoComplete="username"
                          name="username"
                          value={username}
                          onChange={this.handleChange}
                        />
                        {submitted && !username && (
                          <FormFeedback>Username is required</FormFeedback>
                        )}
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          invalid={submitted && !password}
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          name="password"
                          value={password}
                          onChange={this.handleChange}
                        />
                        {submitted && !password && (
                          <FormFeedback>Password is required</FormFeedback>
                        )}
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4">
                            Login
                          </Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">
                            Forgot password?
                          </Button>
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Col>{errorMessage}</Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                {/*<Card
                    className="text-white bg-primary py-5 d-md-down-none"
                    style={{ width: "44%" }}
                  >
                    <CardBody className="text-center">
                      <div>
                        <h2>Sign up</h2>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua.
                        </p>
                        <Link to="/register">
                          <Button
                            color="primary"
                            className="mt-3"
                            active
                            tabIndex={-1}
                          >
                            Register Now!
                          </Button>
                        </Link>
                      </div>
                    </CardBody>
                 </Card>*/}
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
const mapStateToProps = state => {
  const props = {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null
  };
  console.log("kiran auth mapstateprops", props);
  return props;
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password) => dispatch(actions.auth(email, password))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
