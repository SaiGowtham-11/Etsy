const graphql = require("graphql")
const {GraphQLObjectType, GraphQLString} = require("graphql");
const UserType = require('../TypeDefs/userType')
const User = require('../../models/userModel')

const ShopType = new GraphQLObjectType({
    name: "Shop",
    fields: () => ({
        _id: { type: GraphQLString },
        shopName: { type: GraphQLString },
        shopImage: { type: GraphQLString },
        user: { type: UserType,
            async resolve(parent, args){
                const user = await User.findById({_id: parent._id})
                return user.user
            }
        }
    })
})

module.exports = ShopType