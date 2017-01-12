import { expect } from 'chai';
import sinon from 'sinon';

import Store, { SIGNUP_URL } from '../src/store';

describe('Store', () => {
  context('attributes', () => {
    let store;

    beforeEach(() => {
      store = new Store;
    });

    it('has :email accessor', () => {
      store.email = 'some email';
      expect(store.email).to.equal('some email');
    });

    it('has :password accessor', () => {
      store.password = 'some password';
      expect(store.password).to.equal('some password');
    });

    it('has :phone accessor', () => {
      store.phone = 'some phone';
      expect(store.phone).to.equal('some phone');
    });

    it('has :name accessor', () => {
      store.name = 'some name';
      expect(store.name).to.equal('some name');
    });

    it('has :company accessor', () => {
      store.company = 'some company';
      expect(store.company).to.equal('some company');
    });
  });

  context('errorOn', () => {
    let store;

    beforeEach(() => {
      store = new Store;
    });

    it('returns undefined when not present', () => {
      expect(
        store.errorOn('email')
      ).to.be.an('undefined');
    });

    it('returns the error object when present', () => {
      const error = { field: 'email' };

      store.errors = [
        error,
      ];

      expect(
        store.errorOn('email')
      ).to.equal(error);
    });

    it('returns only the first object', () => {
      const error = {
        field: 'email',
        first: true,
      };

      store.errors = [
        error,
        {
          field: 'email',
          second: true,
        },
      ];

      expect(
        store.errorOn('email')
      ).to.eq(error);
    });
  });

  context('signup', () => {
    const requestHandler = {
      post: () => Promise.resolve(),
    };
    let store;
    let post;

    beforeEach(() => {
      store = new Store(requestHandler);
      post = sinon.spy(requestHandler, 'post');
    });

    afterEach(() => {
      post.restore();
    });

    it('sends a post to /register with :email', () => {
      const email = 'The Email';
      store.signup({ email });

      expect(
        post.calledWith(SIGNUP_URL, sinon.match({ email }))
      ).to.be.true;
    });

    it('sends a post to /register with :password', () => {
      const password = 'The Password';
      store.signup({ password });

      expect(
        post.calledWith(SIGNUP_URL, sinon.match({ password }))
      ).to.be.true;
    });

    it('sends a post to /register with :phone', () => {
      const phone = 'The Phone';
      store.signup({ phone });

      expect(
        post.calledWith(SIGNUP_URL, sinon.match({ phone }))
      ).to.be.true;
    });

    it('sends a post to /register with :name', () => {
      const name = 'The Name';
      store.signup({ name });

      expect(
        post.calledWith(SIGNUP_URL, sinon.match({ name }))
      ).to.be.true;
    });

    it('sends a post to /register with :company', () => {
      const company = 'The Company';
      store.signup({ company });

      expect(
        post.calledWith(SIGNUP_URL, sinon.match({ company }))
      ).to.be.true;
    });

    it('does not send a post to /register with :non_existing', () => {
      const nonExisting = 'Non Existing';
      store.signup({ nonExisting });

      expect(post.calledOnce).to.be.true;
      expect(post.args[0][1]).to.not.have.key('nonExisting');
    });
  });

  context('signup success', () => {
    let store;
    const response = {
      employer: {
        uid: '1',
        name: 'Max Mustermann',
        email: 'max.mustermann@joblocal.de',
        companies: [],
      },
    };
    const requestHandler = {
      post: () => Promise.resolve({
        ok: true,
        json() {
          return response;
        },
      }),
    };

    beforeEach(() => {
      store = new Store(requestHandler);
    });

    it('clears the errors', () => {
      store.errors = [
        {
          field: 'email',
        },
      ];

      return store.signup({}).then(() => {
        expect(store.errors).to.have.length(0);
      });
    });

    it('sets employer data', () => {
      store.employer = null;

      return store.signup({}).then(() => {
        expect(store.employer).to.equal(response.employer);
      });
    });

    it('returns true for isSuccessful', () => {
      store.employer = null;
      store.errors = [
        {
          field: 'email',
        },
      ];

      return store.signup({}).then(() => {
        expect(store.isSuccessful).to.be.true;
      });
    });
  });

  context('signup failure', () => {
    let store;
    const response = {
      message: 'Signup Failed',
      errors: [
        {
          resource: 'Account',
          field: 'email',
          code: 'required',
          message: 'The field email is required',
        },
      ],
    };
    const requestHandler = {
      post: () => Promise.resolve({
        ok: false,
        json() {
          return response;
        },
      }),
    };

    beforeEach(() => {
      store = new Store(requestHandler);
    });

    it('sets the returned errors', () => {
      store.errors = [];

      return store.signup({}).then(() => {
        expect(store.errors[0]).to.equal(response.errors[0]);
      });
    });

    it('sets employer data to null', () => {
      store.errors = [];
      store.employer = {
        name: 'Max Mustermann',
      };

      return store.signup({}).then(() => {
        expect(store.employer).to.be.null;
      });
    });

    it('returns false for isSuccessful', () => {
      store.errors = [];
      store.employer = {
        name: 'Max Mustermann',
      };

      return store.signup({}).then(() => {
        expect(store.isSuccessful).to.be.false;
      });
    });
  });
});

