import React from "react";

import {
  Container,
  Row,
  Col,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
  Alert
} from "reactstrap";

import { Switch, Route } from "react-router";

import Home from "./pages/home";
import List from "./pages/list";
import Login from "./pages/login";
import Register from "./pages/register";
import EditUser from "./pages/editUser";
import Preferences from "./pages/preferences";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authorization: "ab",
      closeMessage: 0
    };
    this.renderActionResponse = this.renderActionResponse.bind(this);
  }

  renderActionResponse(subject, successMessage, failMessage) {
    if (subject === "fail") {
      return (
        <Alert color="danger">
          {failMessage}
          <span
            style={{ float: "right", paddingRight: 6, cursor: "pointer" }}
            onClick={() =>
              this.setState({ closeMessage: this.state.closeMessage + 1 })
            }
          >
            X
          </span>
        </Alert>
      );
    }

    if (subject === "success") {
      return (
        <Alert variant="success">
          {successMessage}{" "}
          <span
            style={{ float: "right", paddingRight: 6, cursor: "pointer" }}
            onClick={() =>
              this.setState({ closeMessage: this.state.closeMessage + 1 })
            }
          >
            X
          </span>
        </Alert>
      );
    }
  }

  render() {
    return (
      <Switch>
        <Route
          path="/register"
          render={props => (
            <Register
              {...props}
              renderActionResponse={this.renderActionResponse}
              closeMessage={this.state.closeMessage}
            />
          )}
        />
        <Route
          path="/login"
          render={props => (
            <Login
              {...props}
              renderActionResponse={this.renderActionResponse}
              closeMessage={this.state.closeMessage}
            />
          )}
        />
        <Route
          path="/edit-user"
          render={props => (
            <EditUser
              {...props}
              renderActionResponse={this.renderActionResponse}
              closeMessage={this.state.closeMessage}
            />
          )}
        />
        <Route
          path="/preferences"
          render={props => (
            <Preferences
              {...props}
              renderActionResponse={this.renderActionResponse}
              closeMessage={this.state.closeMessage}
            />
          )}
        />
        <Route exact path="/" render={props => <List {...props} />} />
      </Switch>
    );
  }
}

export default App;
