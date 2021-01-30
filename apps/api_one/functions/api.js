const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const serverless = require("serverless-http");

const schema = require('./schema/index.js')

const app = express();

app.use(bodyParser.json());

app.use(
    "/",
    graphqlHTTP({ schema: schema, graphiql: true })
);

module.exports.handler = serverless(app);