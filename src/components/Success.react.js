import React from 'react';

/**
 * Creates a success component to use in registration process.
 */
const Success = () => (
  <div className="card text-xs-center">
    <div className="alert-success p-a-1">
      <h1>
        <i className="material-icons jsw-success__icon pull-xs-left">check_circle</i>
          Thank you !
      </h1>
    </div>
    <div className="card-block">
      <p className="card-text">We've sent an email to you</p>
      <p className="text-muted">Please click the link in the message to activate your account</p>
    </div>
  </div>

);

export default Success;
