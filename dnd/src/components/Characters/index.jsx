import React, { Component, useState } from "react";
import axios from "axios";

function Character({ user, onCharSubmit }) {
  const [character, setCharacter] = useState({
    username: user.userName,
    race: "",
    class: "",
    hp: "",
    stat: "",
    notes: "",
  });
  const { username, race, hp, stat, notes } = character;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target, user);
    console.log(formData);
    const newChar = [...formData.entries()].reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {});

    console.log("here", JSON.stringify(newChar));
    const res = await axios.post("/user/char", newChar, user);
    setCharacter({ ...character, [e.target.name]: e.target.value });
    onCharSubmit(res.data);
  };

  //JSX
  return (
    <div className="align-items-center d-flex">
      <h1 className="boarder-right">Create Charactor</h1>
      <form onSubmit={handleSubmit}>
        <h3>Character Name</h3>
        <h3>{user.userName}</h3>
        <h3>Race</h3>
        <select name="Race">
          <option value="0" selected="selected"></option>
          <option value="1">elf</option>
          <option value="2">human</option>
          <option value="3">dwarf</option>
          <option value="4">half-elf</option>
          <option value="5">orc</option>
          <option value="6">dragonborn</option>
          <option value="7">gnome</option>
          <option value="8">tiefling</option>
          <option value="9">tabaxi</option>
          <option value="10">changeling</option>
        </select>
        <h3>class</h3>
        <select name="Class">
          <option value="0" selected="selected"></option>
          <option value="1">cleric</option>
          <option value="2">bard</option>
          <option value="3">wizard</option>
          <option value="4">druid</option>
          <option value="5">barbarian</option>
          <option value="6">monk</option>
          <option value="7">sorcerer</option>
          <option value="8">fighter</option>
          <option value="9">artificer</option>
        </select>
        <h3>HP</h3>
        <input type="text" name="hp" />
        <h3>Stats</h3>
        <input type="text" name="stats" />
        <h3>notes</h3>
        <input type="text" name="notes" />
        {/* will be array */}
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default Character;
