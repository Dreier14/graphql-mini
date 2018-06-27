let characters = require('./model')
const{
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLID,
} = require('graphql')
const axios = require('axios')

const Movie = new GraphQLObjectType({
    name:'Movie',
    fields: () =>{
        return{
            title: { type: GraphQLString },
            releaseDate: {
                type: GraphQLString,
                resolve: movie => movie.release_date,
             },
        }
    }
})

const Person = new GraphQLObjectType({
    name:'Person',
    fields:() => {
        return {
            id: { type: GraphQLInt },
            name: { type: GraphQLString },
            height: { type: GraphQLString },
            films:{
                type: GraphQLList(Movie),
                resolve: (person) => {
                    return !person.films.length
                    ? []
                    : person.films.map(film =>{
                        return axios.get(film).then(res => res.data)
                    })
                }
            },
            homeWorld: {
                type: HomeWorldType,
                resolve: (person) =>{
                    return axios.get(person.homeworld).then(res => res.data)
                }
            }
        }
    }
})

const HomeWorldType = new GraphQLObjectType({
    name:'HomeWorld',
    fields:() => {
        return {
            name: { type: GraphQLString },
            climate: { type: GraphQLString },
            population: { type: GraphQLString }
        }
    }
})



const Query = new GraphQLObjectType({
    name:'Query',
    fields: () => {
        return{
           people:{
               type: new GraphQLList(Person),
               resolve: () => characters,
           },
           person:{
               type: Person,
               args:{
                   id:{ type: GraphQLNonNull(GraphQLInt) }
               },
               resolve: (parentVal, args) => {
                   return characters.find(character => character.id === args.id)
                 console.log('---------------parentVal', parentVal);
                 console.log('---------------args', args);
               }          
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields: () => {
        return {
            deletePerson:{
                type: Person,
                args: { id: {type: GraphQLNonNull(GraphQLInt)}},
                resolve: (parentVal, args) => {
                    let character = characters.find(e => e.id === args.id)
                    characters = characters.filter(person => person.id !== args.id)
                    return{
                        id: character.id,
                        name: character.name
                    }
                }
            }
        }
    }
})
module.exports = new GraphQLSchema ({
    query: Query,
    mutation: Mutation

})