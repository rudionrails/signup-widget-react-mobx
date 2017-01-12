import React from 'react';

const Header = ({
  onClose,
}) => (
  <div className="jsw-header">
    <nav className="navbar navbar flex-items-xs-center">
      <div className="pull-xs-right">
        <button
          className="jsw-header__btn-close"
          type="button"
          onClick={onClose}
        >
          &times;
        </button>
      </div>
    </nav>
  </div>
);

Header.propTypes = {
  onClose: React.PropTypes.func.isRequired,
};

export default Header;
