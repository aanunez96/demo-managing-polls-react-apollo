const {gql} = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    user(userId: ID): [User]
    poll(pollId: ID, userId:ID): [Poll]
  }
  
  enum Roles{
    User
    Power_User
    Admin
  }
  
  type Profile{
    rol:Roles
    fullName: String
    avatar: String
  }
  
  extend type User {
  _id: ID
  profile: Profile
  }
  
  extend input CreateUserInput {
      profile: CreateUserProfileInput!
  }
  
  input CreateUserProfileInput {
     rol: Roles
     fullName: String
     avatar: String
  }
  
  type Question {
    _id:ID!
    question: String!
    possibleAnswers: [Answer]
    deleteAnswers: [Answer]
    poll: Poll
  }
  
  type Answer{
    _id: ID!
    question: Question!
    answer: String!
  }
  
  type Poll{
    _id: ID!
    latest: Question!
    questions: [Question!]
    version: Int
    answerForUser: String
  }
  
  type Mutation{
    createPoll(literalQuestion: String!, answers: [String]):ID
    
    modifyPoll(newQuestion: String, addAnswer: [String], deleteAnswer: [ID], pollID: ID!): ID
    
    answerPoll(userId: ID!, pollId: ID!, answerId: ID!): ID
    
    modifyUser(userId: ID!, fullName: String, avatar: String, rol: Roles): ID
  }
`;
module.exports = typeDefs;
// question(questionId: ID): [Question!]
// answer(answerId: ID): Answer!