const express = require('express')
const { ApolloServer } = require('apollo-server-express')

const app = express()
const port = 3000

/** Apollo server **/
const typeDefs = require('./graphql/schema')
const resolvers = require('./graphql/resolvers')

const server = new ApolloServer({ cors: true, typeDefs, resolvers })
server.applyMiddleware({ app });

app.listen({ port }, () => console.log(`Example app listening at http://localhost:${port}`))
