const { monsters } = require("../models");

const resolvers = {
  Query: {
    monsters: async () => {
      return monsters.find();
    },
    monsters: async (parent, { title }) => {
      return monsters.findOne({ title });
    },
  },
  Mutation: {
    addMonsters: async (parent, args) => {
      const monsters = await monsters.create(args);
      return monsters;
    },
  },
};

module.exports = resolvers;
