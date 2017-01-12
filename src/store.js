/* eslint-disable no-unused-vars */
import { observable, computed, action } from 'mobx';

export const SIGNUP_URL = 'http://dev.muenchenerjobs.de/api/v1/signup';

const requestHandler = {
  /**
  * Sends a HTTP POST request to a designated url.
  *
  * Responses in the 2xx range will resolve the promise.
  * Responses in the 4xx range withh reject the promise.
  *
  * @param url {String} The url to make the request to
  * @param data {Object} The Data to send
  *
  * @return {Promise}
  */
  post(url, data) {
    return fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  },
};

/**
* The basic store implementation. It handles the state of the app as well as
* taking care of the actions the user can perform. Those are `signup` and `login`.
*/
export default class Store {
  @observable pendingRequestCount = 0;
  @observable email = '';
  @observable password = '';
  @observable phone = '';
  @observable name = '';
  @observable company = '';
  @observable errors = [];
  @observable employer = null;

  /**
  * Takes a requestHandler object or defaults to the build-in handler.
  */
  constructor(handler = requestHandler) {
    this.requestHandler = handler;
  }

  /**
  * Returns whether the store is currently loading
  *
  * @returns {Boolean} true or false
  */
  @computed get isLoading() {
    return this.pendingRequestCount > 0;
  }

  /**
   * Returns whether the signup was successful
   *
   * @returns {Boolean} true or false
   */
  @computed get isSuccessful() {
    return this.errors.length === 0 && this.employer !== null;
  }

  /**
  * Get the error object for a given field name.
  *
  * @example
  *   errorOn('email')
  *
  *   {
  *     resource: 'Account',
  *     field: 'email',
  *     code: 'blank',
  *     message: 'E-Mail is a required field',
  *   }
  *
  * @params field {String} The field to get the error for
  * @returns {Object} The error
  */
  errorOn(field) {
    return this.errors.find(item => item.field === field);
  }

  /**
  * Performs a signup and then logs the user in.
  *
  * @param email {String} The user email
  * @param password {String} The user password
  */
  @action signup({
    email,
    password,
    phone,
    name,
    company,
  }) {
    this.pendingRequestCount++;

    return this.requestHandler.post(SIGNUP_URL, {
      email,
      password,
      phone,
      name,
      company,
    }).then((response) => {
      this.pendingRequestCount--;
      this.errors = [];
      this.employer = null;

      if (response.ok) {
        if (typeof response.json().employer === 'object') {
          this.employer = response.json().employer;
        }
      } else {
        if (typeof response.json().errors === 'object') {
          this.errors = response.json().errors;
        }
      }
    }).catch((error) => {
      this.pendingRequestCount--;
      throw error;
    });
  }
}
