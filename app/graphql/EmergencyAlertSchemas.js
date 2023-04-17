var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLList = require("graphql").GraphQLList;
var GraphQLNonNull = require("graphql").GraphQLNonNull;
var GraphQLString = require("graphql").GraphQLString;
const mongoose = require("mongoose");

var UserModel = require("../models/UserModel");
var EmergencyAlertModel = require("../models/EmergencyAlertModel");


const emergencyAlertType = new GraphQLObjectType({
    name: 'emergencyAlert',
    fields: function () {
        return {
            _id: {
                type: GraphQLString,
            },
            alertMessage: {
                type: GraphQLString,
            },
            patient: {
                type: GraphQLString,
            }
        };
    }
});

const queryType = {
    emergencyAlerts: {
        type: new GraphQLList(emergencyAlertType),
        resolve: function () {
            const emergencyAlerts = EmergencyAlertModel.find().sort({_id:-1}).limit(1).exec();
            if (!emergencyAlerts) {
                throw new Error("Emergency Alerts not found");
            }
            return emergencyAlerts;
        },
    },

    emergencyAlert: {
        type: new GraphQLList(emergencyAlertType),
        args: {
            
            patient: {
                type: new GraphQLNonNull(GraphQLString),
            },
        },
        resolve: function (root, params) {
            const emergencyAlert = EmergencyAlertModel.find({ patient: params.patient }).exec();
            if (!emergencyAlert) {
                throw new Error("Emergency Alerts not found for this patient");
            }
            return emergencyAlert;
        },
    }
};


const Mutation = {
    createEmergencyAlert: {
        type: emergencyAlertType,
        args: {
            alertMessage: {
                type: new GraphQLNonNull(GraphQLString)
            },
            patient: {
                type: GraphQLString
            }
        },
        resolve: function (root, params) {
            const emergencyAlertModel = new EmergencyAlertModel(params);

            const newEmergencyAlert = emergencyAlertModel.save();
            if (!newEmergencyAlert) {
                throw new Error("Could not enter the Emergency Alert details!");
            }
            return newEmergencyAlert;
        },
    }
};

module.exports = {
    emergencyAlertQuery: queryType,
    emergencyAlertMutation: Mutation,
};