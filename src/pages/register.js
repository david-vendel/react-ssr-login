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
  InputGroup,
  FormControl,
  Button,
  Form
} from "react-bootstrap";

const page = {
  title: "Register",
  url: "register"
};

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.emailRef = React.createRef();
    this.passRef = React.createRef();
    this.firstNameRef = React.createRef();
    this.surNameRef = React.createRef();
    this.submitForm = this.submitForm.bind(this);
    this.createUser = this.createUser.bind(this);

    this.state = {
      registration: ""
    };
  }

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

  submitForm(event) {
    event.preventDefault();

    console.log("submit form", this.emailRef.current.value);
    console.log("submit form", this.passRef.current.value);
    console.log("submit form", this.firstNameRef.current.value);
    console.log("submit form", this.surNameRef.current.value);

    const body = {
      email: this.emailRef.current.value,
      password: this.passRef.current.value,
      name: this.firstNameRef.current.value,
      lastname: this.surNameRef.current.value
    };

    console.log("submitted body", body);
    this.createUser(body);
  }

  createUser(body) {
    axios
      .post("https://test-api.inizio.cz/api/user", body)
      .then(response => {
        console.log("Response", response);
        this.setState({ registration: "success" });
        document.cookie = JSON.stringify({
          authorization: response.data.authorization
        });
      })
      .catch(err => {
        console.log("err", err);
        this.setState({ registration: "fail" });
      });
  }

  render() {
    return (
      <div>
        {this.head()}
        <Container>
          <Navigation url={page.url} />

          <h1>Register</h1>
          <p>Register using following form.</p>
          {this.state.registration === "fail" && (
            <div style={{ border: "1px solid red" }}>
              Registration failed, try again
            </div>
          )}
          {this.state.registration === "success" && (
            <div style={{ border: "1px solid green" }}>
              Registration successful.
            </div>
          )}
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                ref={this.emailRef}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                ref={this.passRef}
              />
            </Form.Group>

            <Form.Group controlId="formBasicName">
              <Form.Label>First name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                ref={this.firstNameRef}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicLastName">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Last name"
                ref={this.surNameRef}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit" onClick={this.submitForm}>
              Submit
            </Button>
          </Form>
        </Container>
      </div>
    );
  }
}

export default Register;
