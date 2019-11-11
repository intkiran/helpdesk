import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const UserList = ({ users, onDelete }) => {
  console.log("Kiran userlist ", users, onDelete);
  return !users.length ? (
    <p className="alert alert-warning text-center">No Users found.</p>
  ) : (
    <div className="merchant-list">
      <div className="responsive-table">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
              <th>Role</th>
              <th>email</th>
              <th>confirmed</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.username}</td>
                <td>{user.roles}</td>
                <td>{user.email}</td>
                <td>{user.confirmed.toString()}</td>
                <td>
                  <Link to={`/user/${user._id}`} className="btn btn-primary">
                    <span className="fa fa-pencil" aria-hidden="true"></span>
                  </Link>
                  &nbsp;&nbsp;
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => onDelete(user._id)}
                  >
                    <span className="fa fa-remove" aria-hidden="true"></span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
UserList.propTypes = {
  _id: PropTypes.string,
  username: PropTypes.string,
  password: PropTypes.string,
  string: PropTypes.string,
  onDelete: PropTypes.func
};

export default UserList;
