const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type Query {
    question(questionId: String): Question
  }

  type Question {
    text: String
  }
`

module.exports = typeDefs
