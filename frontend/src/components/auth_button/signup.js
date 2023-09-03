import React from "react";
import { withAuth0 } from "@auth0/auth0-react";

/* Class that provides the login form with Auth0s sign-up alternative */
class SignupButton extends React.Component {
  render() {
    const { loginWithRedirect } = this.props.auth0;

    return (
      <button
        className="btn btn-primary btn-block"
        onClick={() =>
          loginWithRedirect({
            screen_hint: "signup",
          })
        }
      >
        Sign Up
      </button>
    );
  }
}

export default withAuth0(SignupButton);
