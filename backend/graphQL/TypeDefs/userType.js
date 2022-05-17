const graphql = require("graphql")
const { GraphQLString, GraphQLObjectType, GraphQLFloat, GraphQLList } = graphql

const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        _id: {type: GraphQLString},
        userName: { type: GraphQLString },
        userEmailId: { type: GraphQLString},
        userImage: { type: GraphQLString },
        userCity: { type: GraphQLString },
        userPassword: { type: GraphQLString },
        userCountry: { type: GraphQLString },
        userZipCode: { type: GraphQLString },
        userStreet: { type: GraphQLString },
        userCurrency: { type: GraphQLFloat },
        userPhoneNumber: { type: GraphQLString },
        userGender: { type: GraphQLString },
        favourites: { type: GraphQLList },
        token: { type: GraphQLString }
    })
})

module.exports = UserType