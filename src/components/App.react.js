import React from 'react';

// components
import Header from './Header.react';
import Signup from './Signup.react';
import Success from './Success.react';
import { observer } from 'mobx-react';

const App = observer(({
  onClose,
  store,
}) => (
  <div className="jsw-container">
    <Header onClose={onClose} />

    <div className="container">
      <div className="row">
        <div className="col-xs-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-8 offset-lg-1">
          {store.isSuccessful ?
            <Success /> :
            <Signup store={store} />}
        </div>
      </div>
    </div>
  </div>
));

App.propTypes = {
  onClose: React.PropTypes.func.isRequired,
  store: React.PropTypes.object,
};

export default App;
