import axios from "axios";
import React, { Component, useState } from "react";
import backgroundImage from "../../images/signup.jpg";

const Signup = ({ onUserSubmit }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newUser = [...formData.entries()].reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {});

    console.log("here", JSON.stringify(newUser));
    const res = await axios.post("/user/", newUser);

    onUserSubmit(res.data);
  };

  //JSX
  return (
    <div id="signup">
      <h1>Sign Up</h1>
      <img
        src={backgroundImage}
        className="my-2"
        style={{ width: "100%" }}
        alt="cover"
      />
      <form onSubmit={handleSubmit}>
        <h3>User Name</h3>
        <input type="text" name="userName" />
        <h3>User Email</h3>
        <input type="text" name="userEmail" />
        <h3>Password</h3>
        <input type="password" name="userPassword" />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
