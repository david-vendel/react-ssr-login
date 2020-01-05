import React from "react";
import axios from "axios";

import { Nav, Button } from "react-bootstrap";

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      authorization: ""
    };
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    if (
      document &&
      document.cookie &&
      JSON.parse(document.cookie) &&
      JSON.parse(document.cookie).email
    ) {
      this.setState({
        email: JSON.parse(document.cookie).email,
        authorization: JSON.parse(document.cookie).authorization
      });
    }
  }

  logout() {
    const token = this.state.authorization;

    axios.defaults.headers.common = { Authorization: `bearer ${token}` };

    axios.delete("https://test-api.inizio.cz/api/user");
    document.cookie = "";
    window.location.href = "/";
  }

  render() {
    return (
      <div>
        <Nav variant="pills" defaultActiveKey={"/" + this.props.url}>
          <Nav.Item>
            <Nav.Link href="/">Home</Nav.Link>
          </Nav.Item>

          {this.state.email.length === 0 && (
            <React.Fragment>
              <Nav.Item>
                <Nav.Link href="/register">Register</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/login">Login</Nav.Link>
              </Nav.Item>
            </React.Fragment>
          )}

          {this.state.email.length > 0 && (
            <React.Fragment>
              <Nav.Item>
                <Nav.Link href="/edit-user">User - {this.state.email}</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/preferences">Preferences</Nav.Link>
              </Nav.Item>
              <Nav.Item onClick={this.logout}>
                <Button>Logout</Button>
              </Nav.Item>
            </React.Fragment>
          )}
        </Nav>
      </div>
    );
  }
}
