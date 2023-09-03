import React, { Component, useState, useEffect } from "react";
import "./profile.css";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

/* Profile page with user information from Auth0 and ability to change the password */
function Profile() {
  const { user } = useAuth0();

  // Function for changing password
  const changePasswordHandler = () => {
    // Post function that sends the users email to Auth0s Management API which then
    // sends email to the user with information on how to change password
    var options = {
      method: "POST",
      url: "https://dev-r74wckup.eu.auth0.com/dbconnections/change_password",
      headers: {
        authorization: "Bearer ABCD",
        "content-type": "application/json",
      },
      data: {
        client_id: "jIwcnGtGvARqn7ei2f2Ky24IMGqYsKYt",
        email: user.email,
        connection: "Username-Password-Authentication",
      },
    };

    // Alert user that email is sent
    axios
      .request(options)
      .then(function (response) {
        alert(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <>
      <div className="col">
        <div className="row2">
          <div className="profile_box">
            <h1>Edit Profile</h1>
            <img src={user.picture} />
            <h3>Email:</h3>
            <input type="text" value={user.email} />
            <h3>Verified:</h3>
            <input type="text" value={user.email_verified} />
            <div className="button">
              <button className="btn btn-primary" onClick={changePasswordHandler}>
                {" "}
                Change password{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
