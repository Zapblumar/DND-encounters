import React, { Component, useState } from "react";

function Charactor() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newChar = [...formData.entries()].reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {});

    console.log("here", JSON.stringify(newChar));
    const res = await axios.post("/user/char", newChar);

    onUserSubmit(res.data);
  };

  //JSX
  return (
    <div>
      <h1>Create Charactor</h1>
      <form onSubmit={handleSubmit}>
        <h3>Char Name</h3>
        <input type="text" name="charname" />
        <h3>Race</h3>
        <input type="text" name="race" />
        <h3>class</h3>
        <input type="text" name="class" />
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

export default Charactor;
