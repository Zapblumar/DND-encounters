const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require('../utils/auth');
const { Monsters, User, Character } = require("../model");

const resolvers = {
  Query: {
    me: async (parents, args, context) => {
      console.log(parents, args)
      if (context.user) {
        const userData = await Users.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate("character")
        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },
    user: async (username) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate("character")
    },
    character: async (parent, { _id }) => {
      return Character.findOne({ _id });
    }

  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

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
    createCharacter: async (parent, { character }, context) => {
      if (context.user) {
        const newCharacter = await Character.create({ ...character, username: context.user.username });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { character: character._id } },
          { new: true }
        );

        return newCharacter;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
  }
};

module.exports = resolvers;
