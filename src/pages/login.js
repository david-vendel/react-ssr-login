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
  Button,
  Form
} from "react-bootstrap";

const page = {
  title: "Login",
  url: "login"
};

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.emailRef = React.createRef();
    this.emailRef2 = React.createRef();
    this.passRef = React.createRef();

    this.submitForm = this.submitForm.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.sendEmail = this.sendEmail.bind(this);

    this.state = {
      login: "",
      forgottenPassword: false
    };
  }

  exampleMethod() {
    console.log("JS is running:", JSON.parse(document.cookie).authorization);
  }
  setCookie() {
    document.cookie = "cookie set";
  }

  head() {
    return (
      <Helmet>
        <title>{page.title}</title>
      </Helmet>
    );
  }

  submitForm(event) {
    event.preventDefault();

    console.log("submit form", this.emailRef.current.value);
    console.log("submit form", this.passRef.current.value);

    const body = {
      email: this.emailRef.current.value,
      password: this.passRef.current.value
    };

    console.log("submitted body", body);
    this.loginUser(body);
  }

  loginUser(body) {
    axios
      .post("https://test-api.inizio.cz/api/user/login", body)
      .then(response => {
        console.log("Response", response);
        this.setState({ login: "success" });
        // this.props.loginUser(response.data.email, response.data.authorization);
        document.cookie = JSON.stringify({
          authorization: response.data.authorization,
          email: response.data.email
        });
        window.location.href = "/";
      })
      .catch(err => {
        console.log("err", err);
        this.setState({ login: "fail" });
      });
  }

  sendEmail() {
    event.preventDefault();
    const body = {
      url: "localhost:3000/reset",
      email: this.emailRef2.current.value
    };
    axios
      .post("https://test-api.inizio.cz/api/user/reset-email", body)
      .then(response => {
        console.log("Response", response);
      })
      .catch(err => {
        console.log("err", err);
      });
  }

  render() {
    return (
      <div>
        {this.head()}

        <Container>
          <Navigation url={page.url} loggedInUser={this.props.loggedInUser} />

          <h1>Login</h1>
          <p>login..</p>
          <Button onClick={() => this.exampleMethod()}>Console LLog</Button>
          <Button onClick={() => this.setCookie()}>Cookie set</Button>

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

            <Button variant="primary" type="submit" onClick={this.submitForm}>
              Log in
            </Button>
            <Button
              variant="primary"
              type="submit"
              onClick={() => {
                event.preventDefault();
                this.setState({
                  forgottenPassword: !this.state.forgottenPassword
                });
              }}
            >
              Forgot Password?
            </Button>
          </Form>
          {this.state.login === "fail" && (
            <div style={{ border: "1px solid red" }}>Login failed.</div>
          )}
        </Container>
        {this.state.forgottenPassword && (
          <Container>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  ref={this.emailRef2}
                />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>

              <Button variant="primary" type="submit" onClick={this.sendEmail}>
                Send email
              </Button>
            </Form>
          </Container>
        )}
      </div>
    );
  }
}

export default Login;
