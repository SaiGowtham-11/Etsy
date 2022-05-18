const User = require('../models/userModel')
const UserType = require('./TypeDefs/userType')
const ShopType = require('./TypeDefs/shopType')
const ProductType = require('./TypeDefs/productType')
const Product = require('../models/productModel')
const graphql = require("graphql")
const {GraphQLObjectType, GraphQLString, GraphQLError, GraphQLSchema, GraphQLList, GraphQLInt, GraphQLFloat} = graphql;

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        getProducts: {
            type: new GraphQLList(ProductType),
            args: {_id: { type: GraphQLString }},
            async resolve(parent, args){
                const productList = await Product.find({})
                return productList
            }
        }
    }
})

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
        },

        addProduct: {
            type: ProductType,
            args: {
                name: { type: GraphQLString },
                image: { type: GraphQLString },
                category: { type: GraphQLString },
                description: { type: GraphQLString },
                rating: { type: GraphQLInt },
                numReviews: { type: GraphQLInt },
                price: { type: GraphQLFloat },
                countInStock: { type: GraphQLInt }
            },
            async resolve(parent, args){
                const product = {
                    name: args.name,
                    image: args.image,
                    category: args.category,
                    description: args.category,
                    rating: args.rating,
                    numReviews: args.numReviews,
                    price: args.price,
                    countInStock: args.countInStock
                }

                const newProduct = await Product.create(product)

                return newProduct

            }
        }
    }
})

module.exports = new GraphQLSchema({query: RootQuery, mutation: Mutation})