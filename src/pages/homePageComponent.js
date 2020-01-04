import React from "react";

class Home extends React.Component {
  exampleMethod() {
    console.log("JS is running");
  }

  render() {
    return (
      <div>
        <h1>My home page</h1>
        <p>Some content..</p>
        <button onClick={() => this.exampleMethod()}>Console log</button>
      </div>
    );
  }
}

export default Home;
