import React from "react";
import { Helmet } from "react-helmet";
import Navigation from "../components/navigation";
import axios from "axios";
import _ from "lodash";

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

    // this.nameRef = React.createRef();
    // this.lastNameRef = React.createRef();
    // this.streetRef = React.createRef();
    // this.cityRef = React.createRef();
    // this.countryRef = React.createRef();
    // this.zipRef = React.createRef();

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

  setToken() {
    let token = "";
    if (document && document.cookie) {
      token = JSON.parse(document.cookie).authorization;
    }

    console.log("token", token);
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

    console.log("submitted body", body);
    this.editUser(body);
  }

  editUser(body) {
    this.setToken();

    axios
      .put("https://test-api.inizio.cz/api/user", body)
      .then(response => {
        console.log("Response", response);
        this.saveAuthorization(response.data);
        this.setState({ edit: "success" });
      })
      .catch(err => {
        console.log("err", err);
        this.setState({ edit: "fail" });
      });
  }

  getUserData() {
    console.log("getUserData");
    this.setToken();

    console.log("getUserData");
    try {
      axios
        .get("https://test-api.inizio.cz/api/user")
        .then(response => {
          console.log("getUserData response", response);
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
      console.log("event.target.value", event.target.value);
      if (Array.isArray(what)) {
        userData.billing_address[what[0]][what[1]] = event.target.value;
      } else {
        userData.billing_address[what] = event.target.value;
      }
      this.setState({
        userData
      });
    } else {
      userData.shipping_address[what] = event.target.value;
      this.setState({
        userData
      });
    }
  }

  copyShippingToBilling() {
    let userData = this.state.userData;
    console.log("userData", userData);

    const company = userData.billing_address.company;
    userData.billing_address = _.cloneDeep(userData.shipping_address);
    userData.billing_address.company = _.cloneDeep(company);
    console.log("userData", userData);

    this.setState({ userData });
  }

  copyBillingToShipping() {
    let userData = this.state.userData;
    console.log("userData", userData);

    userData.shipping_address = _.cloneDeep(userData.billing_address);
    delete userData.shipping_address.company;
    console.log("userData", userData);

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

            <Button onClick={this.copyShippingToBilling}>
              Copy shipping data to billing data
            </Button>
            <Button onClick={this.copyBillingToShipping}>
              Copy billing data to shipping data
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

            {this.state.edit === "success" && (
              <div style={{ border: "1px solid green" }}>
                Data saved successfully.
              </div>
            )}

            {this.state.edit === "fail" && (
              <div style={{ border: "1px solid red" }}>
                Problem with saving data.
              </div>
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
