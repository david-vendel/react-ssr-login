import React from "react";
import { Helmet } from "react-helmet";
import Navigation from "../components/navigation";

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
} from "react-bootstrap";

const page = {
  title: "Login",
  url: "login"
};

class Login extends React.Component {
  exampleMethod() {
    console.log("JS is running");
  }

  head() {
    return (
      <Helmet>
        <title>{page.title}</title>
      </Helmet>
    );
  }

  render() {
    return (
      <div>
        {this.head()}

        <Container>
          <Navigation url={page.url} />

          <h1>Login</h1>
          <p>login..</p>
          <Button onClick={() => this.exampleMethod()}>Console LLog</Button>
        </Container>
      </div>
    );
  }
}

export default Login;
