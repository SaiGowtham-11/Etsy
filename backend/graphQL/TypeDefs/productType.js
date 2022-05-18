const graphql = require("graphql")
const {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLFloat} = require("graphql");
const ShopType = require('../TypeDefs/shopType')
const Shop = require('../../models/shopModel')

const ProductType = new GraphQLObjectType({
    name: "Product",
    fields: () => ({
        _id: { type: GraphQLString },
        name: { type: GraphQLString },
        image: { type: GraphQLString },
        category: { type: GraphQLString },
        description: { type: GraphQLString },
        rating: { type: GraphQLInt },
        numReviews: { type: GraphQLInt },
        price: { type: GraphQLFloat },
        countInStock: { type: GraphQLInt },
        shop: { type: ShopType,
            async resolve(parent, args){
                const shop = await Shop.findById({_id: parent._id})
                return shop.shop;
            }
        }
    })

})

module.exports = ProductType