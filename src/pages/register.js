import React from "react";
import { Helmet } from "react-helmet";
import Navigation from "../components/navigation";
import axios from "axios";

import { Container, Button, Form } from "react-bootstrap";

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
    this.lastNameRef = React.createRef();
    this.submitForm = this.submitForm.bind(this);
    this.createUser = this.createUser.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
    this.validateFields = this.validateFields.bind(this);

    this.state = {
      registered: "",
      errors: {
        email: "",
        password: "",
        name: "",
        lastname: ""
      }
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
      this.setState({ registered: "" });
    }
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  validateFields() {
    this.setState({
      errors: {
        email: "",
        password: "",
        name: "",
        lastname: ""
      }
    });

    let willReturn = false;

    if (!this.validateEmail(this.emailRef.current.value)) {
      let errors = this.state.errors;
      errors["email"] = "Email is not valid";
      this.setState({
        errors
      });
      willReturn = true;
    }

    if (this.passRef.current.value.length < 8) {
      let errors = this.state.errors;
      errors["password"] = "Password must be at least 8 characters long.";
      this.setState({
        errors
      });
      willReturn = true;
    }

    if (this.firstNameRef.current.value.length === 0) {
      let errors = this.state.errors;
      errors["firstname"] = "First name is required";
      this.setState({
        errors
      });
      willReturn = true;
    }

    if (this.lastNameRef.current.value.length === 0) {
      let errors = this.state.errors;
      errors["lastname"] = "Last name is required";
      this.setState({
        errors
      });
      willReturn = true;
    }

    return willReturn;
  }

  submitForm(event) {
    event.preventDefault();

    const willReturn = this.validateFields();

    if (willReturn) {
      return;
    }

    const body = {
      email: this.emailRef.current.value,
      password: this.passRef.current.value,
      name: this.firstNameRef.current.value,
      lastname: this.lastNameRef.current.value
    };

    this.createUser(body);
  }

  createUser(body) {
    axios
      .post("https://test-api.inizio.cz/api/user", body)
      .then(response => {
        this.setState({ registered: "success" });
        document.cookie = JSON.stringify({
          authorization: response.data.authorization,
          email: response.data.email
        });
      })
      .catch(err => {
        console.log("err", err.response);
        let errors = this.state.errors;
        errors["registration"] = JSON.stringify(
          Object.values(err.response.data.data)
        );
        this.setState({
          errors,
          registered: "fail"
        });
      });
  }

  renderErrors(what) {
    console.error("render errors", what, this.state.errors);
    if (this.state.errors[what]) {
      return (
        <div style={{ border: "1px solid red" }}>{this.state.errors[what]}</div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.head()}
        <Container>
          <Navigation url={page.url} />

          <h1>Register</h1>
          <p>Register using following form.</p>

          {this.props.renderActionResponse(
            this.state.registered,
            "Registration successful. You can log in now.",
            "Registration failed, try again"
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
              {this.renderErrors("email")}
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                ref={this.passRef}
              />
              {this.renderErrors("password")}
            </Form.Group>

            <Form.Group controlId="formBasicName">
              <Form.Label>First name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                ref={this.firstNameRef}
              />
              <Form.Text className="text-muted"></Form.Text>
              {this.renderErrors("firstname")}
            </Form.Group>

            <Form.Group controlId="formBasicLastName">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Last name"
                ref={this.lastNameRef}
              />
              <Form.Text className="text-muted"></Form.Text>
              {this.renderErrors("lastname")}
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
