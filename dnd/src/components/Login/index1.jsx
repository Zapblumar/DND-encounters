import React, { useState } from "react";
import axios from "axios";
import backgroundImage from "../../images/DnD-door.jpg";

function Login({ onUserSubmit }) {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password } = user;

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submit Form", user);

    const res = await axios.post("/user/login", {
      username,
      password,
      email,
    });
    onUserSubmit(res.data);
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log("Handle Form", user);
  };

  return (
    <section>
      <h1 data-testid="h1tag">Login</h1>
      <img
        src={backgroundImage}
        className="my-2"
        style={{ width: "100%" }}
        alt="cover"
      />
      <form id="contact-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Name:</label>
          <input type="text" name="username" onBlur={handleChange} />
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
