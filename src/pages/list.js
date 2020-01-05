import React from "react";
import { Helmet } from "react-helmet";
import Navigation from "../components/navigation";
import axios from "axios";

import {
  Container,
  Row,
  DropdownButton,
  Dropdown,
  Card,
  Button,
  ListGroup,
  ListGroupItem,
  InputGroup,
  FormControl,
  Pagination
} from "react-bootstrap";

const page = {
  title: "List",
  url: ""
};

const sortNames = {
  default: "Default",
  for_hp: "For Hp",
  price_asc: "Ascending Price",
  price_desc: "Descending Price",
  name: "Name"
};

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      value: { min: 0, max: 1000000 },
      sort_code: "default",
      page: 1
    };
    this.changePriceFilter = this.changePriceFilter.bind(this);
    this.filterPrice = this.filterPrice.bind(this);
    this.fetchProducts = this.fetchProducts.bind(this);
    this.sort = this.sort.bind(this);
    this.renderPagination = this.renderPagination.bind(this);
    this.reportWindowSize = this.reportWindowSize.bind(this);
  }

  head() {
    return (
      <Helmet>
        <title>{page.title}</title>
      </Helmet>
    );
  }
  componentDidMount() {
    window.addEventListener("resize", _.throttle(this.reportWindowSize, 500));
    this.reportWindowSize();
    this.fetchProducts();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.reportWindowSize);
  }

  reportWindowSize() {
    this.setState({
      windowWidth: window.innerWidth
    });
  }

  fetchProducts(params = {}) {
    axios
      .get("https://test-api.inizio.cz/api/products", { params: params })
      .then(response => {
        if (response && response.data) {
          this.setState({
            products: response.data.products,
            total_pages: response.data.total_pages
          });
        }
      });
  }

  changePriceFilter(event, which) {
    event.preventDefault();
    let value = this.state.value;
    value[which] = event.target.value;
    this.setState({
      value
    });
  }

  filterPrice() {
    event.preventDefault();
    const params = {
      price_from: this.state.value.min,
      price_to: this.state.value.max,
      sort: this.state.sort_code,
      page: this.state.page
    };
    this.fetchProducts(params);
  }

  sort(sort_code) {
    this.setState({ sort_code }, () => {
      this.filterPrice();
    });
  }

  renderPagination() {
    let active = this.state.page;
    let items = [];
    if (active > this.state.total_pages) {
      active = this.state.total_pages;
      this.setState(
        {
          page: active
        },
        () => this.filterPrice()
      );
    }
    if (active >= 5) {
      items = [
        <Pagination.First
          onClick={() => {
            this.setState({ page: 1 }, () => {
              this.filterPrice();
            });
          }}
        />,
        <Pagination.Prev
          onClick={() => {
            this.setState({ page: active - 1 }, () => {
              this.filterPrice();
            });
          }}
        />,
        <Pagination.Ellipsis />
      ];
    }
    for (
      let number = Math.max(active - 3, 1);
      number <= Math.min(active + 3, this.state.total_pages);
      number++
    ) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === active}
          onClick={() => {
            this.setState({ page: number }, () => {
              this.filterPrice();
            });
          }}
        >
          {number}
        </Pagination.Item>
      );
    }
    if (active < this.state.total_pages - 3) {
      items.push(<Pagination.Ellipsis />);
      items.push(
        <Pagination.Next
          onClick={() => {
            this.setState({ page: active + 1 }, () => {
              this.filterPrice();
            });
          }}
        />
      );
      items.push(
        <Pagination.Last
          onClick={() => {
            this.setState({ page: this.state.total_pages }, () => {
              this.filterPrice();
            });
          }}
        />
      );
    }
    const paginationBasic = (
      <div>
        <br />

        <Pagination>{items}</Pagination>
        <br />
      </div>
    );

    return paginationBasic;
  }

  render() {
    return (
      <div>
        {this.head()}

        <Container>
          <Navigation url={page.url} />
          <h1>List</h1>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>Sort</InputGroup.Text>
            </InputGroup.Prepend>
            <InputGroup.Prepend>
              <DropdownButton
                id="dropdown-basic-button"
                title={sortNames[this.state.sort_code]}
              >
                <Dropdown.Item onClick={() => this.sort("default")}>
                  Default
                </Dropdown.Item>
                <Dropdown.Item onClick={() => this.sort("for_hp")}>
                  For hp
                </Dropdown.Item>
                <Dropdown.Item onClick={() => this.sort("price_asc")}>
                  Price ascending
                </Dropdown.Item>
                <Dropdown.Item onClick={() => this.sort("price_desc")}>
                  Price descending
                </Dropdown.Item>
                <Dropdown.Item onClick={() => this.sort("name")}>
                  Name
                </Dropdown.Item>
              </DropdownButton>{" "}
            </InputGroup.Prepend>

            <InputGroup.Prepend>
              <InputGroup.Text>Min price</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              type="number"
              onChange={event => this.changePriceFilter(event, "min")}
              onKeyDown={event => {
                if (event.key.toLowerCase() === "enter") {
                  this.filterPrice();
                }
              }}
            />
            <InputGroup.Prepend>
              <InputGroup.Text>Max price</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              type="number"
              onChange={event => this.changePriceFilter(event, "max")}
              onKeyDown={event => {
                if (event.key.toLowerCase() === "enter") {
                  this.filterPrice();
                }
              }}
            />

            <InputGroup.Prepend>
              <Button onClick={this.filterPrice}>Update results</Button>
            </InputGroup.Prepend>
          </InputGroup>

          {this.renderPagination()}

          <Row style={{ width: "100%", marginLeft: 0, marginRight: 0 }}>
            {Object.keys(this.state.products).map(key => {
              const product = this.state.products[key];
              return (
                <Card
                  style={{
                    width:
                      100 / Math.floor((this.state.windowWidth - 200) / 300) +
                      "%"
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={product.picture.url}
                    style={{ objectFit: "contain", maxHeight: "12rem" }}
                  />
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: product.description
                        }}
                      />
                    </Card.Text>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem>
                      Cena: {product.price_formatted}
                    </ListGroupItem>
                  </ListGroup>
                  <Card.Body>
                    <Card.Link href="#">Detail</Card.Link>
                    <Card.Link href="#">Add to cart</Card.Link>
                  </Card.Body>
                </Card>
              );
            })}
          </Row>
          {this.renderPagination()}
        </Container>
      </div>
    );
  }
}

export default List;
