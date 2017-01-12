import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import App from '../../src/components/App.react';

describe('<App />', () => {
  context('on initialize', () => {
    const store = {
      isSuccessful: false,
    };
    const app = shallow(<App onClose={() => true} store={store} />);

    it('renders a <Signup />', () => {
      expect(
        app.find('Signup')
      ).to.have.length(1);
    });
  });

  context('on signup', () => {
    const store = {
      isSuccessful: true,
    };
    const app = shallow(<App onClose={() => true} store={store} />);

    it('renders a <Success />', () => {
      expect(
        app.find('Success')
      ).to.have.length(1);
    });
  });
});
