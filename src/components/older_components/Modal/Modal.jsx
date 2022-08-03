/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import './modal.css';

export default function Modal(ChildComponent) {
  const [isVisible, setIsVisible] = useState(true);
  if (isVisible) {
    return (
      <div className="modal-container">
        <div className="modal">
          <button className="modal-close" onClick={() => setIsVisible(false)}>
            x
          </button>
          {isVisible && <ChildComponent />}
        </div>
      </div>
    );
  }
  return (
    <div>
      <button onClick={() => setIsVisible(true)}>Testing</button>
    </div>
  );
}
