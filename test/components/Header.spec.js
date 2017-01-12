import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import Header from '../../src/components/Header.react';

describe('<Header />', () => {
  it('contains the close button', () => {
    const subject = shallow(<Header onClose={() => true} />);
    expect(subject.find('button')).to.exist;
  });

  it('invokes a callback when the button is clicked', () => {
    const onClose = sinon.spy();
    const subject = shallow(<Header onClose={onClose} />);

    subject.find('button').simulate('click');
    expect(onClose.calledOnce).to.equal(true);
  });
});

