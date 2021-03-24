const { gql } = require("apollo-server-express");

const typeDefs = gql`
 type User {
    _id: ID
  userName: String
  userEmail: String
   character: Character

}
 
  type monsters {
  MonsterName: String
  AC: Int
  Health: Int
  }
type Character {
  _id: ID
  user: User
  race: String
  class: String
  hp: Int 
  stat: Int
  notes: [String]
}
input CharacterInput {
  race: String!
  class: String!
  hp: Int!
  stat: Int!
  notes: [String!]
}
  
  
 

type Auth {
  token: ID!
  user: User
}
 type Query {
  me: User
  user(username: String): User 
  character(_id: ID!): Character

}
type Mutation {
  login(email: String!, password: String!): Auth
  addUser(userName: String!, userEmail: String!, userPassword: String!): Auth
  createCharacter(character:CharacterInput!): User
}

`;

module.exports = typeDefs;
