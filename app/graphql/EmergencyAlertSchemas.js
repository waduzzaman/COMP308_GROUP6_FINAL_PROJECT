// load required dependency 
var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLList = require("graphql").GraphQLList;
var GraphQLNonNull = require("graphql").GraphQLNonNull;
var GraphQLString = require("graphql").GraphQLString;
var EmergencyAlertModel = require("../models/EmergencyAlertModel");

// create instance
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
            if (!emergencyAlerts) 
            {
                throw new Error("There are no any emergency alert!");
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
                throw new Error("There are no any emergency alert for patient!");
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
                throw new Error("Can't access emergency alert!");
            }
            return newEmergencyAlert;
        },
    }
};

// Export Module
module.exports = {
    emergencyAlertQuery: queryType,
    emergencyAlertMutation: Mutation,
};