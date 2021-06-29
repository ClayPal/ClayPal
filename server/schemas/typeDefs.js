const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    skeetScore: [SkeetScore]
    trapScore: [TrapScore]
  }

  type SkeetScore {
    _id: ID
    overallScore: String
    station: [String]
    weapon: String
    date: String
  }

  type TrapScore {
    _id: ID
    overallScore: String
    station: [String]
    weapon: String
    date: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    skeetScore: User
    trapScore: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addSkeetScore(
      overallScore: String!
      station: String!
      weapon: String!
    ): User
    addTrapScore(overallScore: String!, station: String!, weapon: String!): User
  }
`;

module.exports = typeDefs;
