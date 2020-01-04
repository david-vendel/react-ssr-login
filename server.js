import "@babel/polyfill";
import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router";
import bodyParser from "body-parser";
import { Helmet } from "react-helmet";
import App from "./src/app";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static("build/public"));

app.get("*", (req, res) => {
  const context = {};

  const content = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );

  const helmet = Helmet.renderStatic();

  const html = `
    <html>
        <head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">

            ${helmet.meta.toString()}
            ${helmet.title.toString()}
            
        </head>
        <body>
            <div id="root">
                ${content}
            </div>
            <script src="client_bundle.js"></script>
        </body>
    </html>`;

  res.send(html);
});

app.listen(PORT, () => {
  console.log(`app running ${PORT}`);
});
