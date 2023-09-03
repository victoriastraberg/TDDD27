import React from "react";
import LoginButton from "./login.js";
import LogoutButton from "./logout.js";
import { withAuth0 } from "@auth0/auth0-react";

/* Class that creates a state button that switches state depending on login/logout */
class AuthenticationButton extends React.Component {
  render() {
    const { isAuthenticated } = this.props.auth0;

    return isAuthenticated ? <LogoutButton /> : <LoginButton />;
  }
}
export default withAuth0(AuthenticationButton);
