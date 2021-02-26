import React, { Component, useState } from "react";

function Charactor() {
  function handleSubmit(e) {
    e.preventDefault();

    //for Tylor
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
      <h1>Name</h1>
      <form></form>
    </div>
  );
}

export default Charactor;
