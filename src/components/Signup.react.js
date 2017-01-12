import React from 'react';
import { observer } from 'mobx-react';

import Fieldset from './Fieldset.react';

@observer
class Signup extends React.Component {
  constructor(props, context) {
    super(props, context);

    // set store for easier access
    this.store = props.store;

    // contextual binding
    this.handleFieldsetChange = this.handleFieldsetChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFieldsetChange(event) {
    this.store[event.target.name] = event.target.value;
  }

  handleFormSubmit(event) {
    event.preventDefault();

    /**
    * We pass the variables to the function to
    * not accidentally mutate them via the UI before
    * a request is sent.
    */
    const { email, password, phone, name, company } = this.store;
    this.store.signup({
      email,
      password,
      phone,
      name,
      company,
    });
  }

  render() {
    return (
      <div>
        <div className="text-xs-center">
          <h2>Registration</h2>
          <p className="text-muted">
            <small>made with &hearts; by Rudolf Schmidt</small>
          </p>
        </div>

        <div className="card card-block">
          <form onSubmit={this.handleFormSubmit}>
            <Fieldset
              icon="mail"
              name="email"
              placeholder="Email Address"
              value={this.store.email}
              type="email"
              disabled={this.store.isLoading}
              onChange={this.handleFieldsetChange}
              error={this.store.errorOn('email')}
            />
            <Fieldset
              icon="lock"
              name="password"
              placeholder="Password"
              value={this.store.password}
              type="password"
              disabled={this.store.isLoading}
              onChange={this.handleFieldsetChange}
              error={this.store.errorOn('password')}
            />
            <Fieldset
              icon="phone_in_talk"
              name="phone"
              placeholder="Phone"
              value={this.store.phone}
              type="tel"
              disabled={this.store.isLoading}
              onChange={this.handleFieldsetChange}
              error={this.store.errorOn('phone')}
            />
            <Fieldset
              icon="account_balance"
              name="name"
              placeholder="Contact name"
              value={this.store.name}
              type="text"
              disabled={this.store.isLoading}
              onChange={this.handleFieldsetChange}
              error={this.store.errorOn('name')}
            />
            <Fieldset
              icon="business_center"
              name="company"
              placeholder="Company name"
              value={this.store.company}
              type="text"
              disabled={this.store.isLoading}
              onChange={this.handleFieldsetChange}
              error={this.store.errorOn('company')}
            />

            <button
              className="btn btn-warning btn-block"
              type="submit"
              disabled={this.store.isLoading}
            >
              REGISTER
            </button>
          </form>
        </div>

        <p className="text-xs-center text-muted">
          <small className="text-muted">Forgot password? <a href="#">Click here!</a></small>
        </p>
      </div>
    );
  }
}

Signup.propTypes = {
  store: React.PropTypes.shape({
    email: React.PropTypes.string.isRequired,
    password: React.PropTypes.string.isRequired,
    phone: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    company: React.PropTypes.string.isRequired,
    signup: React.PropTypes.func.isRequired,
    isLoading: React.PropTypes.bool.isRequired,
  }),
};

export default Signup;
