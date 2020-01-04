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
} from "react-bootstrap";

export default class Navigation extends React.Component {
  render() {
    console.log("props", this.props);
    return (
      <div>
        <Nav variant="pills" defaultActiveKey={"/" + this.props.url}>
          <Nav.Item>
            <Nav.Link href="/">Active</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/list">List</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/register">Register</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
    );
  }
}
