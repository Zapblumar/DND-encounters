import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Nav({ handlePageChange, currentPage }) {
  const tabs = ["Home", "Signup", "Login", "Chat"];
  return (
    <header className="row ml-2">
      <h2>
        <a href="/">DND</a>
      </h2>
      <ul className="nav nav-tabs">
        {tabs.map((tab) => (
          <li className="nav-item" key={tab}>
            <a
              href={"#" + tab.toLowerCase()}
              onClick={() => handlePageChange(tab)}
              className={currentPage === tab ? "nav-link active" : "nav-link"}
            >
              {tab}
            </a>
          </li>
        ))}
      </ul>
    </header>
  );
}

export default Nav;
