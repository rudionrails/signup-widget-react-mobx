import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Signup from '../../src/components/Signup.react';

describe('<Signup />', () => {
  let store = {
    email: '',
    password: '',
    phone: '',
    name: '',
    company: '',
    isLoading: false,
    signup() {},
    errorOn() {},
  };
  let subject;

  beforeEach(() => {
    subject = shallow(<Signup store={store} />);
  });

  context('the Form', () => {
    let form;

    beforeEach(() => {
      form = subject.find('form');
    });

    it('rendered', () => {
      expect(form).to.have.length(1);
    });

    it('renders a <Fieldset /> for email', () => {
      expect(
        form.find('Fieldset')
            .filterWhere(n => n.props().name === 'email')
      ).to.have.length(1);
    });

    it('renders a <Fieldset /> for password', () => {
      expect(
        form.find('Fieldset')
            .filterWhere(n => n.props().name === 'password')
      ).to.have.length(1);
    });

    it('renders a <Fieldset /> for phone', () => {
      expect(
        form.find('Fieldset')
          .filterWhere(n => n.props().name === 'phone')
      ).to.have.length(1);
    });

    it('renders a <Fieldset /> for name', () => {
      expect(
        form.find('Fieldset')
          .filterWhere(n => n.props().name === 'name')
      ).to.have.length(1);
    });

    it('renders a <Fieldset /> for company', () => {
      expect(
        form.find('Fieldset')
          .filterWhere(n => n.props().name === 'company')
      ).to.have.length(1);
    });
  });

  context('the Fields', () => {
    it('changes the passed store property for <Fieldset name="email" />', () => {
      const email = subject.find('Fieldset')
        .filterWhere(n => n.props().name === 'email');

      // TODO: find a better way to simulate change events
      email.simulate('change', {
        target: { name: 'email', value: 'asd' },
      });

      expect(
        store.email
      ).to.equal('asd');
    });

    it('changes the passed store property for <Fieldset name="password" />', () => {
      const password = subject.find('Fieldset')
        .filterWhere(n => n.props().name === 'password');

      // TODO: find a better way to simulate change events
      password.simulate('change', {
        target: { name: 'password', value: 'asd' },
      });

      expect(
        store.password
      ).to.equal('asd');
    });

    it('changes the passed store property for <Fieldset name="phone" />', () => {
      const phone = subject.find('Fieldset')
        .filterWhere(n => n.props().name === 'phone');

      // TODO: find a better way to simulate change events
      phone.simulate('change', {
        target: { name: 'phone', value: 'asd' },
      });

      expect(
        store.phone
      ).to.equal('asd');
    });

    it('changes the passed store property for <Fieldset name="name" />', () => {
      const name = subject.find('Fieldset')
        .filterWhere(n => n.props().name === 'name');

      // TODO: find a better way to simulate change events
      name.simulate('change', {
        target: { name: 'name', value: 'asd' },
      });

      expect(
        store.name
      ).to.equal('asd');
    });

    it('changes the passed store property for <Fieldset name="company" />', () => {
      const company = subject.find('Fieldset')
        .filterWhere(n => n.props().name === 'company');

      // TODO: find a better way to simulate change events
      company.simulate('change', {
        target: { name: 'company', value: 'asd' },
      });

      expect(
        store.company
      ).to.equal('asd');
    });
  });
});
