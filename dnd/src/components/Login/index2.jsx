import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";
import backgroundImage from "../../images/DnD-door.jpg";

const Login = (props) => {
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [login, { error }] = useMutation(LOGIN_USER);
  const { username, email, password } = user;
  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("Submit Form", user);
    try {
      const { data } = await login({
        variables: { ...user },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setUser({
      userName: "",
      email: "",
      password: "",
    });
  };

  return (
    <div id="login">
      <div className="col-12 col-md-6 justify-content-center overflow-auto flex-grow-1">
        <div className="card display: table-caption">
          <h4 className="card-header">Login</h4>
          <div className="card-body">
            <form onSubmit={handleFormSubmit}>
              <input
                className="form-input"
                placeholder="Your username"
                name="userName"
                type="userName"
                id="userName"
                value={user.userName}
                onChange={handleChange}
              />
              <input
                className="form-input"
                placeholder="Your email"
                name="email"
                type="email"
                id="email"
                value={user.email}
                onChange={handleChange}
              />
              <input
                className="form-input"
                placeholder="******"
                name="password"
                type="password"
                id="password"
                value={user.password}
                onChange={handleChange}
              />
              <button className="btn" type="submit">
                Submit
              </button>
            </form>

            {error && <div>Login failed</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
