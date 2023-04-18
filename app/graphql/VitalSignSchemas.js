// load required dependency
var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLList = require("graphql").GraphQLList;
var GraphQLNonNull = require("graphql").GraphQLNonNull;
var GraphQLString = require("graphql").GraphQLString;
var VitalSignModel = require("../models/VitalSignModel");

// Create Instance
const vitalSignType = new GraphQLObjectType({
    name: 'vitalSign',
    fields: function() {
        return {
            _id: {
                type: GraphQLString,
            },
            bodyTemperature: {
                type: GraphQLString,
            },
            heartRate: {
                type: GraphQLString,
            },
            bloodPressure: {
                type: GraphQLString,
            },
            respiratoryRate: {
                type: GraphQLString,
            },
            weight: {
                type: GraphQLString,
            },
            patient: {
                type: GraphQLString
            },
        };
    }
});

const queryType = {
    vitalSigns: {
        type: new GraphQLList(vitalSignType),
        resolve: function () {
            const vitalSigns = VitalSignModel.find().exec();
            if(!vitalSigns) 
            {
                throw new Error("There are no any Vital signs");
            }
            return vitalSigns;
        },
    },

    vitalSign: {
        type: new GraphQLList(vitalSignType),
        args: {
            patient: 
            {
                type: new GraphQLNonNull(GraphQLString),
            },
        },
        resolve: function (root, params) {
            const vitalSign = VitalSignModel.find({patient : params.patient}).exec();
            console.log(vitalSign)
            if(!vitalSign) 
            {
                throw new Error("Patient don't have Vital signs");
            }
            return vitalSign;
        },
    }
};

const Mutation = {
    createVitalSign: {
        type: vitalSignType,
        args: {
            bodyTemperature: {
                type: new GraphQLNonNull(GraphQLString)
            },
            heartRate: {
                type: GraphQLString
            },
            bloodPressure: {
                type: GraphQLString
            },
            respiratoryRate: {
                type: GraphQLString
            },
            weight: {
                type: GraphQLString
            },
            patient: {
                type: GraphQLString
            },
        },
        resolve: function (root, params) {
            const vitalSignModel = new VitalSignModel(params);

            const newVitalSign = vitalSignModel.save();
            if(!newVitalSign) {
                throw new Error("Can't access Vital Sign details!");
            }
            return newVitalSign;
        },
    }
};
// Export Module
module.exports = {
    vitalSignQuery: queryType,
    vitalSignMutation: Mutation,
};