import React from 'react';
import { shallow } from 'enzyme';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme());

import Fieldset from '../../src/components/Fieldset.react';

describe('<Fieldset />', () => {
  const initialProps = {
    icon: 'The Icon',
    value: 'The Value',
    placeholder: 'The Placeholder',
    type: 'The Type',
    name: 'The Name',
    onChange: () => {},
  };

  it('renders the Icon', () => {
    const icon = shallow(<Fieldset {...initialProps} />)
      .findWhere(n => n.hasClass('material-icons'));

    expect(icon.text()).to.equal(initialProps.icon);
  });

  context('the Input', () => {
    let input;

    beforeEach(() => {
      input = shallow(<Fieldset {...initialProps} />)
        .find('input');
    });

    it('renders', () => {
      expect(input).to.have.length(1);
    });

    it('has properties', () => {
      expect(input.props().value).to.equal(initialProps.value);
      expect(input.props().placeholder).to.equal(initialProps.placeholder);
      expect(input.props().type).to.equal(initialProps.type);
      expect(input.props().name).to.equal(initialProps.name);
    });

    it('has events', () => {
      expect(input.props().onChange).to.equal(initialProps.onChange);
    });
  });

  context('the Input disabled state', () => {
    it('shows when true', () => {
      const input = shallow(<Fieldset {...initialProps} disabled />)
        .find('input');

      expect(input.props().disabled).to.be.disabled;
    });

    it('does not show when false', () => {
      const input = shallow(<Fieldset {...initialProps} disabled={false} />)
        .find('input');

      expect(input.props().disabled).to.not.be.disabled;
    });
  });

  context('errors', () => {
    const errorProps = {
      field: 'my-field',
      message: 'The error message',
    };

    it('does not show error classes by default', () => {
      const fieldset = shallow(<Fieldset {...initialProps} />);

      expect(fieldset.find('.jsw-error')).to.have.length(0);
      expect(fieldset.find('.jsw-error__icon')).to.have.length(0);
      expect(fieldset.find('.jsw-error__input')).to.have.length(0);
      expect(fieldset.find('.jsw-error__message')).to.have.length(0);
    });

    it('shows error classes when present', () => {
      const fieldset = shallow(<Fieldset {...initialProps} error={errorProps} />);

      expect(fieldset.find('.jsw-error')).to.have.length(1);
      expect(fieldset.find('.jsw-error')).to.have.length(1);
      expect(fieldset.find('.jsw-error__icon')).to.have.length(1);
      expect(fieldset.find('.jsw-error__input')).to.have.length(1);
      expect(fieldset.find('.jsw-error__message')).to.have.length(1);
    });

    it('shows the message when present', () => {
      const fieldset = shallow(<Fieldset {...initialProps} error={errorProps} />);

      expect(fieldset).to.contain.text(errorProps.message);
    });
  });
});

