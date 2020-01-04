import React from "react";
import { Helmet } from "react-helmet";

class Home extends React.Component {
  exampleMethod() {
    console.log("JS is running");
  }

  head() {
    return (
      <Helmet>
        <title>My page title - justDVL</title>
      </Helmet>
    );
  }

  render() {
    return (
      <div>
        {this.head()}
        <h1>My home page</h1>
        <p>Some content..</p>
        <button onClick={() => this.exampleMethod()}>Console log</button>
      </div>
    );
  }
}

export default Home;
