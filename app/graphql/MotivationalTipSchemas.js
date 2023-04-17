var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLList = require("graphql").GraphQLList;
var GraphQLNonNull = require("graphql").GraphQLNonNull;
var GraphQLString = require("graphql").GraphQLString;

var MotivationalTipModel = require("../models/MotivationalTipModel");


const motivationalTipType = new GraphQLObjectType({
    name: 'motivationalTip',
    fields: function () {
        return {
            _id: {
                type: GraphQLString,
            },
            message: {
                type: GraphQLString,
            }
        };
    }
});

const queryType = {
    MotivationalTips: {
        type: new GraphQLList(motivationalTipType),
        resolve: function () {
            const MotivationalTips = MotivationalTipModel.find().sort({_id:-1}).limit(1).exec();
            if (!MotivationalTips) {
                throw new Error("MotivationalTips not found");
            }
            return MotivationalTips;
        },
    }
};


const Mutation = {
    createMotivationalTip: {
        type: motivationalTipType,
        args: {
            message: {
                type: new GraphQLNonNull(GraphQLString)
            }
        },
        resolve: function (root, params) {
            const motivationalTipModel = new MotivationalTipModel(params);

            const newMotivationalTip = motivationalTipModel.save();
            if (!newMotivationalTip) {
                throw new Error("Could not enter the motivational Tip details!");
            }
            return newMotivationalTip;
        },
    }
};

module.exports = {
    motivationalTipQuery: queryType,
    motivationalTipMutation: Mutation,
};