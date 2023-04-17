var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLList = require("graphql").GraphQLList;
var GraphQLNonNull = require("graphql").GraphQLNonNull;
var GraphQLString = require("graphql").GraphQLString;
var GraphQLInt = require("graphql").GraphQLInt;
var UserModel = require("../models/UserModel");
const config = require('../../config/config');
const jwtExpirySeconds = 300;
const jwtKey = config.secretKey;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");


const userType = new GraphQLObjectType({
    name: 'user',
    fields: function() {
        return {
            _id: {
                type: GraphQLString,
            },
            email: {
                type: GraphQLString,
            },
            password: {
                type: GraphQLString,
            },
            firstName: {
                type: GraphQLString,
            },
            lastName: {
                type: GraphQLString,
            },
            userCategory: {
                type: GraphQLString,
            },
            phoneNumber: {
                type: GraphQLString,
            },
            token: {
                type: GraphQLString,
            },
        };
    }
});


const queryType = {
    users: {
        type: new GraphQLList(userType),
        resolve: function () {
            const users = UserModel.find().exec();
            if(!users) {
                throw new Error("users not found");
            }
            return users;
        },
    },

    user: {
        type: userType,
        args: {
            id: {
                type: new GraphQLNonNull(GraphQLString),
            },
        },
        resolve: function (root, params) {
            const user = UserModel.findById(params.id).exec();
            if(!user) {
                throw new Error("user not found");
            }
            return user;
        },
    },
};

const Mutation = {
    signUp: {
        type: userType,
        args: {
            email: {
                type: new GraphQLNonNull(GraphQLString),
            },
            firstName: {
                type: new GraphQLNonNull(GraphQLString),
            },
            lastName: {
                type: new GraphQLNonNull(GraphQLString),
            },
            password: {
                type: new GraphQLNonNull(GraphQLString),
            },
            userCategory: {
                type: new GraphQLNonNull(GraphQLString),
            },
            phoneNumber: {
                type: new GraphQLNonNull(GraphQLString),
            }
        },
        resolve: async (root, params) => {
            const hashed = await bcrypt.hashSync(params.password, 10);

            const userModel = new UserModel({
                ...params,
                password: hashed,
            });

            const newuser = userModel.save();
            if(!newuser) {
                throw new Error("Could not save the user!");
            }
            return newuser;
        },
    },

    authenticate: {
        type: userType,
        args: {
            email: {
                type: new GraphQLNonNull(GraphQLString),
            },
            password: {
                type: new GraphQLNonNull(GraphQLString),
            }
        },
        resolve: async (root, params) => {

            const user = await UserModel.findOne({
                email: params.email
            }).exec();
            if(!user){
                throw new Error("Login failed!");
            }

            const valid = await bcrypt.compareSync(params.password, user.password);

            if(!valid) {
                throw new Error("Password did not match!");
            }
            return { token: jwt.sign({ _id: user._id, userCategory: user.userCategory, name: user.firstName }, jwtKey, 
                {algorithm: 'HS256', expiresIn: jwtExpirySeconds }), _id: user.id};
        },
    },

    updateuser: {
        type: userType,
        args: {
            id: {
                name: "id",
                type: new GraphQLNonNull(GraphQLString),
            },
            email: {
                type: GraphQLString,
            },
            firstName: {
                type: GraphQLString,
            },
            lastName: {
                type: GraphQLString,
            },
            phoneNumber: {
                type: GraphQLString,
            }
        },
        resolve(root, params) {

            return UserModel.findByIdAndUpdate(
                params.id,
                {
                    email: params.email,
                    firstName: params.firstName,
                    lastName: params.lastName,                   
                    phoneNumber: params.phoneNumber,
                },
                function(err) {
                    if(err) return next(err);
                }
            );
        },
    },

    deleteuser: {
        type: userType,
        args: {
            id: {
                type: new GraphQLNonNull(GraphQLString),
            },
        },
        resolve(root, params) {
            const deleteuser = UserModel.findByIdAndRemove(params.id).exec();
            if(!deleteuser){
                throw new Error("Could not delete the user!");
            }
            return deleteuser;
        },
    },



};

module.exports = {
    userQuery: queryType,
    userMutation: Mutation,
};