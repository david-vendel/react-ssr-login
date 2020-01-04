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
  title: "Home",
  url: ""
};

class Home extends React.Component {
  exampleMethod() {
    console.log("JS is running");
  }

  head() {
    return (
      <Helmet>
        <title>My page title - justDVL</title>
      </Helmet>
    );
  }

  render() {
    return (
      <div>
        {this.head()}
        <Container>
          <Navigation url={page.url} />

          <h1>My home page</h1>
          <p>Some content..</p>
          <Button onClick={() => this.exampleMethod()}>Console LLog</Button>
        </Container>
      </div>
    );
  }
}

export default Home;
