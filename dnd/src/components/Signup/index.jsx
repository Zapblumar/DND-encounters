import React, { Component, useState } from "react";

function Signup() {
  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newUser = [...formData.entries()].reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {});

    console.log("here", JSON.stringify(newUser));
    fetch("/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => {
        console.log("data:", response.data);
      })
      .catch((error) => {
        console.log("error", error.response);
      });
  }
  // };
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
}

export default Signup;
