import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const { userName, email, password } = user;

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Submit Form", user);

    axios.post("/user/signin", {
      method: "POST",
      user: {
        userName,
        password,
        email,
      },
    });
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log("Handle Form", user);
  };

  return (
    <section>
      <h1 data-testid="h1tag">Contact me</h1>
      <form id="contact-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userName">Name:</label>
          <input type="text" name="userName" onBlur={handleChange} />
        </div>
        <div>
          <label htmlFor="email">Email address:</label>
          <input type="email" name="email" onBlur={handleChange} />
        </div>
        <div>
          <label htmlFor="password">password </label>
          <input type="password" name="password" onBlur={handleChange} />
        </div>

        <button data-testid="button" type="submit">
          Submit
        </button>
      </form>
    </section>
  );
}

export default Login;
