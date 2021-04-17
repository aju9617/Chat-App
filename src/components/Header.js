import React from 'react';
import logo from './../assests/logo.png';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="chatzz" />
      </Link>
    </header>
  );
}
