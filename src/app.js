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
  Button
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
      authorization: "ab"
    };
    this.knowAuth = this.knowAuth.bind(this);
    // this.loginUser = this.loginUser.bind(this);
  }

  knowAuth(authorization) {
    console.log("i know auth", authorization);
    this.setState({ authorization: authorization });
    setTimeout(() => {
      console.log("auth", this.state.authorization);
    }, 2000);
  }

  //   loginUser(email, authorization) {
  //     console.log("user logged in", email, authorization);
  //     this.setState({
  //       loggedInUser: {
  //         email: email,
  //         authorization: authorization
  //       }
  //     });
  //   }

  render() {
    return (
      <Switch>
        <Route path="/register" render={props => <Register {...props} />} />
        <Route
          path="/login"
          render={props => (
            <Login
              //   loginUser={this.loginUser}
              //   loggedInUser={this.state.loggedInUser}
              {...props}
            />
          )}
        />
        <Route path="/list" render={props => <List {...props} />} />
        <Route path="/edit-user" render={props => <EditUser {...props} />} />
        <Route
          path="/preferences"
          render={props => <Preferences {...props} />}
        />
        <Route exact path="/" render={props => <Home {...props} />} />
      </Switch>
    );
  }
}

export default App;
