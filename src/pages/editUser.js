import React from "react";
import { Helmet } from "react-helmet";
import Navigation from "../components/navigation";
import axios from "axios";
import _ from "lodash";

import { Icon } from "react-icons-kit";
import { arrowUp } from "react-icons-kit/icomoon/arrowUp";
import { arrowDown } from "react-icons-kit/icomoon/arrowDown";

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
  title: "Edit User",
  url: "edit-user"
};

class EditUser extends React.Component {
  constructor(props) {
    super(props);

    this.submitForm = this.submitForm.bind(this);
    this.editUser = this.editUser.bind(this);
    this.setToken = this.setToken.bind(this);
    this.getUserData = this.getUserData.bind(this);
    this.saveAuthorization = this.saveAuthorization.bind(this);
    this.copyBillingToShipping = this.copyBillingToShipping.bind(this);
    this.copyShippingToBilling = this.copyShippingToBilling.bind(this);

    this.state = {
      edit: "",
      gotData: "",
      userData: {
        shipping_address: {},
        billing_address: {
          company: {}
        }
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

  componentDidMount() {
    this.getUserData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.closeMessage !== prevProps.closeMessage) {
      this.setState({ edit: "" });
    }
  }

  setToken() {
    let token = "";
    if (document && document.cookie) {
      token = JSON.parse(document.cookie).authorization;
    }
    axios.defaults.headers.common = { Authorization: `bearer ${token}` };
  }

  saveAuthorization(data) {
    document.cookie = JSON.stringify({
      authorization: data.authorization,
      email: data.email
    });
  }

  submitForm(event) {
    event.preventDefault();

    const body = {
      shipping_address: this.state.userData.shipping_address,
      billing_address: this.state.userData.billing_address
    };

    this.editUser(body);
  }

  editUser(body) {
    this.setToken();

    axios
      .put("https://test-api.inizio.cz/api/user", body)
      .then(response => {
        this.saveAuthorization(response.data);
        this.setState({ edit: "success" });
      })
      .catch(err => {
        console.log("err", err);
        this.setState({ edit: "fail" });
      });
  }

  getUserData() {
    this.setToken();
    try {
      axios
        .get("https://test-api.inizio.cz/api/user")
        .then(response => {
          this.saveAuthorization(response.data);
          const userData = {
            shipping_address: response.data.shipping_address,
            billing_address: response.data.billing_address
          };
          this.setState({
            userData,
            gotData: "success"
          });
        })
        .catch(err => {
          console.error("err", err);
          this.setState({
            gotData: "fail"
          });
        });
    } catch (e) {
      console.warn("e", e);
    }
  }

  changeInput(event, what, billing) {
    let userData = this.state.userData;
    if (billing) {
      if (Array.isArray(what)) {
        userData.billing_address[what[0]][what[1]] = event.target.value;
      } else {
        userData.billing_address[what] = event.target.value;
      }
      this.setState({
        userData,
        edit: ""
      });
    } else {
      userData.shipping_address[what] = event.target.value;
      this.setState({
        userData,
        edit: ""
      });
    }
  }

  copyShippingToBilling() {
    let userData = this.state.userData;

    const company = userData.billing_address.company;
    userData.billing_address = _.cloneDeep(userData.shipping_address);
    userData.billing_address.company = _.cloneDeep(company);

    this.setState({ userData });
  }

  copyBillingToShipping() {
    let userData = this.state.userData;

    userData.shipping_address = _.cloneDeep(userData.billing_address);
    delete userData.shipping_address.company;

    this.setState({ userData });
  }

  render() {
    return (
      <div>
        {this.head()}

        <Container>
          <Navigation url={page.url} />

          <h1>Edit user</h1>
          {this.state.gotData === "fail" && (
            <div style={{ boder: "1px solid red" }}>
              Problem with fetching user data.
            </div>
          )}

          <h2>Shipping address</h2>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={this.state.userData.shipping_address.name}
                onChange={() => this.changeInput(event, "name")}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                value={this.state.userData.shipping_address.lastname}
                onChange={() => this.changeInput(event, "lastname")}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Street</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter street"
                value={this.state.userData.shipping_address.street}
                onChange={() => this.changeInput(event, "street")}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter city"
                value={this.state.userData.shipping_address.city}
                onChange={() => this.changeInput(event, "city")}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter country"
                value={this.state.userData.shipping_address.country}
                onChange={() => this.changeInput(event, "country")}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Zip</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter zip"
                value={this.state.userData.shipping_address.zip}
                onChange={() => this.changeInput(event, "zip")}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Button
              onClick={this.copyShippingToBilling}
              style={{ marginRight: 10 }}
            >
              Copy shipping data to billing data
              <Icon style={{ marginLeft: 5 }} icon={arrowDown} />
            </Button>

            <Button onClick={this.copyBillingToShipping}>
              Copy billing data to shipping data
              <Icon style={{ marginLeft: 5 }} icon={arrowUp} />
            </Button>

            <h2>Billing address</h2>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={this.state.userData.billing_address.name}
                onChange={() => this.changeInput(event, "name", true)}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                value={this.state.userData.billing_address.lastname}
                onChange={() => this.changeInput(event, "lastname", true)}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Street</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter street"
                value={this.state.userData.billing_address.street}
                onChange={() => this.changeInput(event, "street", true)}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter city"
                value={this.state.userData.billing_address.city}
                onChange={() => this.changeInput(event, "city", true)}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter country"
                value={this.state.userData.billing_address.country}
                onChange={() => this.changeInput(event, "country", true)}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Zip</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter zip"
                value={this.state.userData.billing_address.zip}
                onChange={() => this.changeInput(event, "zip", true)}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <h4>Company</h4>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter company name"
                value={this.state.userData.billing_address.company.name}
                onChange={() =>
                  this.changeInput(event, ["company", "name"], true)
                }
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Tax number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter company tax number"
                value={this.state.userData.billing_address.company.tax_number}
                onChange={() =>
                  this.changeInput(event, ["company", "tax_number"], true)
                }
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Vat number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter company vat number"
                value={this.state.userData.billing_address.company.vat_number}
                onChange={() =>
                  this.changeInput(event, ["company", "vat_number"], true)
                }
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            {this.props.renderActionResponse(
              this.state.edit,
              "Data saved successfully.",
              "Problem with saving data."
            )}

            <Button variant="primary" type="submit" onClick={this.submitForm}>
              Submit
            </Button>
          </Form>
        </Container>
      </div>
    );
  }
}

export default EditUser;
