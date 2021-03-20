const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
  me: User
  user(username: String): User 
}
  type monsters {
  MonsterName: String
  AC: Int
  Health: Int
  }
type Character {
  charname: String
  race: String
  class: String
  hp: Int 
  stat: Int
notes: [String]
}
  
  type User {
    _id: ID
  userName: String
  userEmail: String
  userPassword: String

}

type Auth {
  token: ID!
  user: User
}
type Mutation {
  login(email: String!, password: String!): Auth
  addUser(userName: String!, userEmail: String!, userPassword: String!): Auth
}

`;

module.exports = typeDefs;
