import React from 'react';
//import './Button82.css';

function Button82({ onClick }) {
  return (
    <button className="button-82-pushable" onClick={onClick}>
      <span className="button-82-shadow"></span>
      <span className="button-82-edge"></span>
      <span className="button-82-front text">
        Logout
      </span>
    </button>
  );
}

export default Button82;
