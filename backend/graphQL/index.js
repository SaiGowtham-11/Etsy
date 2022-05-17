const User = require('../models/userModel')
const UserType = require('./TypeDefs/userType')
const {GraphQLObjectType, GraphQLString, GraphQLError, GraphQLSchema } = require("graphql");

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createUser: {
            type: UserType,
            args: {
                userName: { type: GraphQLString },
                userEmailId: { type: GraphQLString },
                userPassword: { type: GraphQLString }
            },
            async resolve(parent, args){
                const userExists = await User.findOne({userEmailID: args.userEmailId})
                if(userExists){
                    return new GraphQLError("User already Exists")
                }
                else{
                    const newUserObj = {
                        userName: args.userName,
                        userEmailID: args.userEmailId,
                        userPassword: args.userPassword
                    }

                    const newUser = await User.create(newUserObj);

                    return newUser
                }
            }
        }
    }
})

module.exports = new GraphQLSchema({mutation: Mutation})