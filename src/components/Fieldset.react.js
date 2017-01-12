import React from 'react';
import classNames from 'classnames';

/**
 * Creates a fieldset component to use in a form.
 */
const Fieldset = ({
  value,
  placeholder,
  icon,
  type,
  name,
  disabled,
  error,
  onChange,
}) => (
  <fieldset className={classNames('form-group', { 'jsw-error': error })}>
    <div className="input-group">
      <div className={classNames('input-group-addon', { 'jsw-error__icon': error })}>
        <i className="material-icons">{icon}</i>
      </div>

      <input
        className={classNames('form-control', { 'jsw-error__input': error })}
        placeholder={placeholder}
        type={type}
        name={name}
        value={value}
        disabled={disabled}
        onChange={onChange}
      />
    </div>

    {error &&
      <div className="jsw-error__message">{error.message}</div>}
  </fieldset>
);

Fieldset.propTypes = {
  value: React.PropTypes.string.isRequired,
  placeholder: React.PropTypes.string.isRequired,
  icon: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  disabled: React.PropTypes.bool,
  onChange: React.PropTypes.func.isRequired,

  error: React.PropTypes.shape({
    field: React.PropTypes.string.isRequired,
    resource: React.PropTypes.string,
    message: React.PropTypes.string,
    code: React.PropTypes.string,
  }),
};

export default Fieldset;
