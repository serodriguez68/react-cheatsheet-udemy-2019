import React from 'react';
import { Link } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";

const Header = () => {
    return (
      <div className="ui secondary pointin menu">
          <Link to='/' className="item">Streamy</Link>
          <div className="right menu">
              <Link to='/' className="item">All Streams</Link>
              <GoogleAuth />
          </div>
      </div>
    );
};

export default Header;