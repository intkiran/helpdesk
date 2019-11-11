import React from "react";
import PropTypes from "prop-types";

class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      username: "",
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
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.onSave(this.state);
  }
  componentDidMount() {
    this.setState(this.props.user);
  }

  render() {
    const { classes } = this.props;

    return (
      <form>
        <div className="form-group">
          <label htmlFor="username">User Name</label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Username"
            value={this.state.username}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="text"
            className="form-control"
            id="password"
            placeholder="Password"
            value={this.state.password}
          />
        </div>

        <div className="form-group">
          <label htmlFor="userid">Role</label>
          <input
            type="text"
            className="form-control"
            id="userid"
            placeholder="Standard or admin"
            value={this.state.roles}
          />{" "}
          only Values standard or admin
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => this.handleSubmit()}
        >
          Submit
        </button>
      </form>
    );
    /* <form className={classes.form} onSubmit={this.submit}>
        <TextField
          required
          name="title"
          label="Title"
          className={classes.textField}
          margin="normal"
          value={this.state.title}
          onChange={this.handleInputChange}
        />
        <TextField
          required
          name="author"
          label="Author"
          className={classes.textField}
          value={this.state.author}
          onChange={this.handleInputChange}
        />
        <TextField
          required
          name="description"
          label="Description"
          multiline
          rows="10"
          className={classes.textField}
          margin="normal"
          value={this.state.description}
          onChange={this.handleInputChange}
        />
        <Button
          type="submit"
          variant="outlined"
          color="primary"
          size="large"
          className={classes.button}
        >
          Save
        </Button>
      </form> */
  }
}

UserForm.propTypes = {
  classes: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  user: PropTypes.object
};
export default UserForm;
