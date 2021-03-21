const Character = require('../model/Character');

module.exports = {

  async createCharacter({ body, user }, res) {
    const char = await Character.create({ ...body, user });
    console.log(user)
    if (!char) {
      return res.status(400).json({ message: 'Something is wrong!' });
    }

    res.json(char);
  },
  async getCharacter({ character = null, params }, res) {
    const foundChar = await Character.findOne({
      $or: [{ _id: character ? character._id : params.id }, { username: params.username }],
    });

    if (!foundChar) {
      return res.status(400).json({ message: 'Cannot find a character with this id!' });
    }

    res.json(foundChar);
  }
}