import React from "react";
import { Helmet } from "react-helmet";
import Navigation from "../components/navigation";
import axios from "axios";
import { Icon } from "react-icons-kit";
import { circleDown } from "react-icons-kit/icomoon/circleDown";
import { circleUp } from "react-icons-kit/icomoon/circleUp";

import { Container, Button, Form } from "react-bootstrap";

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
      forgottenPassword: false,
      emailSent: ""
    };
  }

  head() {
    return (
      <Helmet>
        <title>{page.title}</title>
      </Helmet>
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.closeMessage !== prevProps.closeMessage) {
      this.setState({ emailSent: "" });
    }
  }

  submitForm(event) {
    event.preventDefault();

    const body = {
      email: this.emailRef.current.value,
      password: this.passRef.current.value
    };

    this.loginUser(body);
  }

  loginUser(body) {
    axios
      .post("https://test-api.inizio.cz/api/user/login", body)
      .then(response => {
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
      url: "https://inizio.cz",
      email: this.emailRef2.current.value
    };
    axios
      .post("https://test-api.inizio.cz/api/user/reset-email", body)
      .then(response => {
        this.setState({ emailSent: "success" });
      })
      .catch(err => {
        console.log("err", err);
        this.setState({ emailSent: "fail" });
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

            <Button
              variant="primary"
              type="submit"
              onClick={this.submitForm}
              style={{ marginRight: 5 }}
            >
              Log in
            </Button>
            <Button
              variant="secondary"
              type="submit"
              onClick={() => {
                event.preventDefault();
                this.setState({
                  forgottenPassword: !this.state.forgottenPassword,
                  emailSent: "",
                  login: ""
                });
              }}
            >
              {this.state.forgottenPassword ? (
                <Icon icon={circleUp} style={{ marginRight: 5 }} />
              ) : (
                <Icon icon={circleDown} style={{ marginRight: 5 }} />
              )}
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

              {this.props.renderActionResponse(
                this.state.emailSent,
                "Email sent.",
                "Failed to send email."
              )}
            </Form>
          </Container>
        )}
      </div>
    );
  }
}

export default Login;
