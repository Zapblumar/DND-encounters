import axios from "axios";
import React, { Component, useState } from "react";

const Signup = ({ onUserSubmit }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newUser = [...formData.entries()].reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {});

    console.log("here", JSON.stringify(newUser));
    const res = await axios.post("/user/signup", newUser);

    onUserSubmit(res.data);
  };

  //JSX
  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <h3>User Name</h3>
        <input type="text" name="username" />
        <h3>User Email</h3>
        <input type="text" name="email" />
        <h3>Password</h3>
        <input type="password" name="password" />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
