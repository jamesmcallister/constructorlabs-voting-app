import React from "react";
import { Link } from "react-router-dom";

// @ts-ignore
import logo from "../images/constructor-labs-badge.png";

export const Header = props => {
  return (
    <header className="header">
      <div className="header__item">
        <Link to="/">
          <img
            className="logo"
            src={logo}
            width="120"
            alt="Constructor Labs logo"
          />
        </Link>
      </div>
      <div className="header__item">
        <nav className="nav">
          <Link className="nav__link" to="/votes">
            Votes
          </Link>
          <Link className="nav__link" to="/topics">
            topics
          </Link>
          <Link className="nav__link" to="/newtopic">
            newtopic
          </Link>
          <Link className="nav__link" to="/retros">
            Retros
          </Link>
        </nav>
      </div>
      <div className="message">{props.message}</div>
    </header>
  );
};
