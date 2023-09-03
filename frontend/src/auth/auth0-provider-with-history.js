import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { withRouter } from "react-router-dom";

/* Auth0 class that uses react-router history to redirect in app */
class Auth0ProviderWithHistory extends React.Component {
  // Initialize Auth0 with credentials from .env
  domain = process.env.REACT_APP_AUTH0_DOMAIN;
  clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
  audience = process.env.REACT_APP_AUTH0_AUDIENCE;

  onRedirectCallback = (appState) => {
    this.props.history.push(appState?.returnTo || window.location.pathname);
  };

  render() {
    return (
      <Auth0Provider
        domain={this.domain}
        clientId={this.clientId}
        redirectUri={window.location.origin}
        onRedirectCallback={this.onRedirectCallback}
        audience={this.audience}
      >
        {this.props.children}
      </Auth0Provider>
    );
  }
}

export default withRouter(Auth0ProviderWithHistory);
