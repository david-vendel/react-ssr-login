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
import Login from "./pages/login";
import Register from "./pages/register";

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/register" render={props => <Register {...props} />} />
        <Route path="/login" render={props => <Login {...props} />} />
        <Route exact path="/" render={props => <Home {...props} />} />
      </Switch>
    );
  }
}

export default App;
