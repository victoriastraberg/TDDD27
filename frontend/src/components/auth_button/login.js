import React from "react";
import { withAuth0 } from "@auth0/auth0-react";

/* Class that creates a login button that redirects user to Auth0 provided form */
class LoginButton extends React.Component {
  render() {
    const { loginWithRedirect } = this.props.auth0;
    return (
      <button
        className="btn btn-light btn-block"
        onClick={() => loginWithRedirect()}
      >
        Log In
      </button>
    );
  }
}

export default withAuth0(LoginButton);
