const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require('../utils/auth');
const { monsters, User, Character } = require("../model");

const resolvers = {
  Query: {
    me: async (parents, args, context) => {
      console.log(parents, args)
      if (context.user) {
        const userData = await Users.findOne({ _id: context.user._id })
          .select('-__v -password')
        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },

    user: async (username) => {
      return User.findOne({ username })
        .select('-__v -password')

    },

  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ userEmail: email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
    createCharacter: (parent, { character }, context) => {
      if (!context.user) throw new AuthenticationError('You are not login');

      return Character.create({ ...character, user: context.user._id })
    },
  }
};

module.exports = resolvers;
