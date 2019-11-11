import React from "react";
import PropTypes from "prop-types";

const UserList = ({ users }) => {
  console.log("Kiran userlist ", users);
  let ticketCounter = 0;
  return !users.length ? (
    <p className="alert alert-warning text-center">No Users found.</p>
  ) : (
    <div className="merchant-list">
      <div className="responsive-table">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Username</th>
              <th>Role</th>
              <th>confirmed</th>
              <th>Created Time</th>
              <th>Update Time</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.roles}</td>
                <td>{user.confirmed}</td>
                <td>{user.createdAt}</td>
                <td>{user.updatedAt}</td>
                <td>
                  {" "}
                  <button type="button" className="btn btn-primary">
                    <span className="fa fa-pencil" aria-hidden="true"></span>
                  </button>
                  &nbsp;&nbsp;
                  <button type="button" className="btn btn-primary">
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
export default UserList;
