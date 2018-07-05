import React from "react";
import logo from "../images/constructor-labs-badge.png";

export const Header = props => {
  return (
    <header className="header">
      <div clclassNameass="header__item">
        <a href="/">
          <img
            className="logo"
            src={logo}
            width="120"
            alt="Constructor Labs logo"
          />
        </a>
      </div>
      <div className="header__item">
        <nav className="nav">
          <a className="nav__link" href="/">
            Votes
          </a>
          <a className="nav__link" href="/fullscreen">
            Fullscreen
          </a>
          <a className="nav__link" href="/retros">
            Retros
          </a>
        </nav>
      </div>
      <div>{props.message}</div>
    </header>
  );
};
