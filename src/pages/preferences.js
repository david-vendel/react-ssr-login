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
  title: "Preferences ",
  url: "preferences"
};

class Preferences extends React.Component {
  constructor(props) {
    super(props);

    this.setToken = this.setToken.bind(this);
    this.saveAuthorization = this.saveAuthorization.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.changePassword = this.changePassword.bind(this);

    this.passRef = React.createRef();

    this.state = {
      changed: "",
      deleted: "",
      gotData: "",
      userData: {
        password1: "",
        password2: ""
      },
      errorMessages: [],
      errors: {
        change: ""
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

  setToken() {
    let token = "";
    if (document && document.cookie) {
      token = JSON.parse(document.cookie).authorization;
    }

    console.log("token", token);
    axios.defaults.headers.common = { Authorization: `bearer ${token}` };
  }

  saveAuthorization(data) {
    if (data && data.authorization) {
      document.cookie = JSON.stringify({
        authorization: data.authorization,
        email: data.email
      });
    }
  }

  changeInput(event, what) {
    let userData = this.state.userData;
    userData[what] = event.target.value;
    this.setState({
      userData
    });
  }

  deleteUser() {
    event.preventDefault();
    this.setToken();

    if (window.confirm("Really delete?")) {
      axios
        .delete("https://test-api.inizio.cz/api/user/delete")
        .then(response => {
          console.log("response", response);
          this.setState({ deleted: "success" });
        })
        .catch(err => {
          console.warn("err", err);
          this.setState({ deleted: "fail" });
        });
    }
  }

  changePassword() {
    event.preventDefault();
    this.setToken();

    let willReturn = false;

    this.setState({
      errors: { change: "" }
    });

    if (this.state.userData.password1 !== this.state.userData.password2) {
      let errorMessages = this.state.errorMessages;
      errorMessages.push("Passwords don't match");
      this.setState({
        errorMessages
      });
      willReturn = true;
    }

    if (this.state.userData.password1.length < 8) {
      let errorMessages = this.state.errorMessages;
      errorMessages.push("Password must be at least 8 characters long.");
      this.setState({
        errorMessages
      });
      willReturn = true;
    }

    if (willReturn) {
      return;
    }

    const body = {
      current_password: this.passRef.current.value,
      password: this.state.userData.password1
    };

    axios
      .post("https://test-api.inizio.cz/api/user/new-password", body)
      .then(response => {
        console.log("response", response);
        this.saveAuthorization(response.data);
        this.setState({
          changed: "success",
          userData: {
            password1: "",
            password2: ""
          }
        });
        this.passRef.current.value = "";
      })
      .catch(err => {
        console.warn("err", err.response);
        this.setState({
          changed: "fail"
        });
        let errors = this.state.errors;
        errors["change"] = JSON.stringify(
          Object.values(err.response.data.data)
        );
        this.setState({
          errors
        });
      });
  }

  changeInput(event, what) {
    let userData = this.state.userData;
    userData[what] = event.target.value;
    this.setState({
      userData,
      errorMessages: []
    });
  }

  renderErrors(what) {
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

          <h1>Preferences</h1>
          <h3>Delete account</h3>

          <Form>
            <Button variant="primary" type="submit" onClick={this.deleteUser}>
              Delete User Account
            </Button>
          </Form>

          {this.state.deleted === "fail" && (
            <div style={{ border: "1px solid red" }}>Deletion failed.</div>
          )}
          {this.renderErrors("registration")}

          {this.state.deleted === "success" && (
            <div style={{ border: "1px solid green" }}>
              Deletion successful. Now what?
            </div>
          )}

          <h3>Change password</h3>

          {this.state.changed === "fail" && (
            <div style={{ border: "1px solid red" }}>
              Password change failed.
            </div>
          )}
          {this.renderErrors("registration")}

          {this.state.changed === "success" && (
            <div style={{ border: "1px solid green" }}>
              Password change was successful.
            </div>
          )}

          {this.renderErrors("change")}

          <Form>
            <Form.Group controlId="formBasicPassword1">
              <Form.Label>Old password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                ref={this.passRef}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword2">
              <Form.Label>New password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={this.state.userData.password1}
                onChange={() => this.changeInput(event, "password1")}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword3">
              <Form.Label>New password again</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={this.state.userData.password2}
                onChange={() => this.changeInput(event, "password2")}
              />
            </Form.Group>

            {this.state.errorMessages && this.state.errorMessages.length > 0 && (
              <div style={{ border: "1px solid red" }}>
                {this.state.errorMessages.map(em => {
                  return <div>{em}</div>;
                })}
              </div>
            )}

            <Button
              variant="primary"
              type="submit"
              onClick={this.changePassword}
            >
              Change password
            </Button>
          </Form>
        </Container>
      </div>
    );
  }
}

export default Preferences;
