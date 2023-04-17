﻿// The server.js file is the main file of your Node.js application 
// It will load the express.js file as a module to bootstrap your Express application
//
//The process.env.NODE_ENV variable is set to the default 'development‘
//value if itdoesn 't exist.
// Set the 'NODE_ENV' variable
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
// Load the module dependencies
var mongoose = require('./config/mongoose'),
    express = require('./config/express');
const { graphqlHTTP } = require('express-graphql');
var schema = require('./app/graphql');
var cors = require("cors");
// Create a new Mongoose connection instance
var db = mongoose();
// Create a new Express application instance
var app = express();

app.use('*', cors());
app.use('/graphql', cors(), graphqlHTTP({
    schema: schema,
    rootValue: global,
    graphiql: true
}));
// Use the Express application instance to listen to the '5000' port
app.listen(5000);
// Use the module.exports property to expose our Express application instance for external usage
module.exports = app; //returns the application object
// Log the server status to the console
console.log('GraphQL Server running at http://localhost:5000/graphql');
