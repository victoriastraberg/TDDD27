import React from "react";
import AuthenticationButton from "../auth_button/authentication.js";

/* Class for navigation button that is added to the nav-bar.js */
class AuthNav extends React.Component {
  render() {
    return (
      <div>
        <AuthenticationButton />
      </div>
    );
  }
}
export default AuthNav;
