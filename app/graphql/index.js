var GraphQLSchema = require("graphql").GraphQLSchema;
var GraphQLObjectType = require("graphql").GraphQLObjectType;

var { userQuery, userMutation } = require("./UserSchemas");
var { vitalSignQuery, vitalSignMutation } = require("./VitalSignSchemas");
var { emergencyAlertQuery, emergencyAlertMutation } = require("./EmergencyAlertSchemas");
var { motivationalTipQuery, motivationalTipMutation } = require("./MotivationalTipSchemas");

const queryType = new GraphQLObjectType({
    name: "Query",
    fields: function () {
        return {
            ...userQuery,
            ...vitalSignQuery,
            ...emergencyAlertQuery,
            ...motivationalTipQuery
        };
    },
});


const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: function () {
        return {
            ...userMutation,
            ...vitalSignMutation,
            ...emergencyAlertMutation,
            ...motivationalTipMutation
        };
    },
});

module.exports = new GraphQLSchema({ query: queryType, mutation: mutation});
