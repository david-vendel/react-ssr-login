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
  title: "Register",
  url: "register"
};

class Register extends React.Component {
  exampleMethod() {
    console.log("JS is running");
  }

  head() {
    return (
      <Helmet>
        <title>Register - justDVL</title>
      </Helmet>
    );
  }

  render() {
    return (
      <div>
        {this.head()}
        <Container>
          <Navigation url={page.url} />

          <h1>Register</h1>
          <p>register..</p>
          <Button onClick={() => this.exampleMethod()}>Console LLog</Button>
        </Container>
      </div>
    );
  }
}

export default Register;
