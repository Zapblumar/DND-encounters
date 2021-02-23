import React, { Component } from "react";
import axios from "axios";

export default class Signin extends Component {
  state = {
    userName: "",
    userPassword: "",
    userEmail: "",
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const { userName, userPassword, userEmail } = this.state;
    axios
      .post({
        url: "/signin",
        method: "POST",
        data: {
          userName,
          userPassword,
          userEmail,
        },
      })
      .then((response) => {
        console.log("data:", response.data);
      })
      .catch((error) => {
        console.log("error", error.response);
      });
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };
  render() {
    //JSX
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h3>User Name</h3>
          <input type="text" name="userName" onChange={this.onChange} />
          <h3>User Email</h3>
          <input type="text" name="userEmail" onChange={this.onChange} />
          <h3>Password</h3>
          <input type="password" name="userPassword" onChange={this.onChange} />
          <button>Signin</button>
        </form>
      </div>
    );
  }
}
