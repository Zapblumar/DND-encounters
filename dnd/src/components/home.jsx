import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import coverImage from "../images/DND_stayHome.png";

function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <img
        src={coverImage}
        className="my-2"
        style={{ width: "80%" }}
        alt="cover"
      />
    </div>
  );
}

export default Home;
