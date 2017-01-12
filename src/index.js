import React from 'react';
import ReactDOM from 'react-dom';

/**
 * This is somewhat magic, but simply applied by the scss-loader (webpack.config.js).
 *
 * @see https://github.com/jtangelder/sass-loader
 * @see http://webpack.github.io/docs/using-loaders.html
 */
import './assets/stylesheets/app.scss';

import App from './components/App.react';
import Store from './store';

/**
 * Prepare the exported functions from here on.
 */
let container;

/**
* Destroys the widget instance
*
* @returns {Promise}
*/
function destroy() {
  if (!container) throw new Error('Widget not created');

  return new Promise(resolve => {
    /**
     * We transition the React container out and then resolve the promise
     */
    const DOMNode = ReactDOM.findDOMNode(container);
    DOMNode.firstChild.classList.remove('jsw-container--appear');

    setTimeout(() => resolve(), 300);
  }).then(() => {
    /**
     * Unmount the whole app and unset the variables
     */
    ReactDOM.unmountComponentAtNode(container);
    container = undefined;
  });
}

/**
* Creates the widget instance
*
* @param id {String} The DOM id where the app will attach to
* @returns {Promise}
*/
function create(id) {
  if (container) throw new Error('Widget already created');
  container = document.getElementById(id);

  return new Promise(resolve => {
    ReactDOM.render(
      <App store={new Store} onClose={destroy} />,
      container,
      () => resolve()
    );
  }).then(() => {
    const DOMNode = ReactDOM.findDOMNode(container);

    /**
     * Use setTimeout to place the operation into the
     * event loop (outside the stack) --R
     */
    setTimeout(() => {
      DOMNode.firstChild.classList.add('jsw-container--appear');
    }, 17);
  });
}

const SignupWidget = Object.freeze({
  create,
  destroy,
});

/**
 * Make the library globally accessible via `SignupWidget` in
 * the browser. For NodeJS, just export the CommonJS module.
 */
if (typeof window !== 'undefined') {
  Object.assign(window, {
    SignupWidget,
  });
}

export default SignupWidget;
