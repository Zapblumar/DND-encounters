const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type monsters {
  MonsterName: String
  AC: Number
  Health: Number
  }

  type Query {
    monsters: [monsters]
  }

  type Mutation {
   --add later--
  }
`;

module.exports = typeDefs;
