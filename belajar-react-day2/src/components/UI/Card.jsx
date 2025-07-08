import React from 'react';

function Card(props) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 m-4">
      {props.children}
    </div>
  );
}

export default Card;