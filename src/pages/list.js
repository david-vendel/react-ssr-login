import React from "react";
import { Helmet } from "react-helmet";
import Navigation from "../components/navigation";
import axios from "axios";

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
  title: "List",
  url: "list"
};

class List extends React.Component {
  head() {
    return (
      <Helmet>
        <title>{page.title}</title>
      </Helmet>
    );
  }
  componentDidMount() {
    console.log("cdm");
    axios.get("https://test-api.inizio.cz/api/products").then(response => {
      console.log("response", response);
    });
  }

  render() {
    return (
      <div>
        {this.head()}

        <Container>
          <Navigation url={page.url} />

          <h1>List</h1>
          <p>list..</p>
        </Container>
      </div>
    );
  }
}

export default List;
