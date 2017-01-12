import React from 'react';
import { shallow } from 'enzyme';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme());

import Success from '../../src/components/Success.react';

describe('<Success />', () => {
  context('the Card', () => {
    it('renders the Alert-success', () => {
      const card = shallow(<Success />);

      expect(card.find('.alert-success')).to.have.length(1);
    });

    it('renders the Card', () => {
      const card = shallow(<Success />);

      expect(card.find('.card')).to.have.length(1);
    });

    it('renders the Card block', () => {
      const card = shallow(<Success />);

      expect(card.find('.card-block')).to.have.length(1);
    });

    it('renders the Card text', () => {
      const card = shallow(<Success />);

      expect(card.find('.card-text')).to.have.length(1);
    });

    it('renders the Card muted text', () => {
      const card = shallow(<Success />);

      expect(card.find('.text-muted')).to.have.length(1);
    });

    it('centers the Card content', () => {
      const card = shallow(<Success />)
          .findWhere(n => n.hasClass('card'));
      expect(card.find('.text-xs-center')).to.have.length(1);
    });
  });

  context('the Icon', () => {
    it('renders the Icon', () => {
      const icon = shallow(<Success />)
          .findWhere(n => n.hasClass('material-icons'));
      expect(icon.text()).to.equal('check_circle');
    });

    it('pulls the Card icon to the left', () => {
      const layout = shallow(<Success />)
          .findWhere(n => n.hasClass('material-icons'));
      expect(layout.find('.pull-xs-left')).to.have.length(1);
    });
  });
});
