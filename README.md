# Signup Widget

This Widget provides an easy-to-use fullscreen UI for a signup.


## Usage

```javascript
/**
 * Attach the Widget to a DOMNode
 */
SignupWidget.create('app')
  .then(() => {
    console.log('Widget created');
  })
  .catch((err) => {
    console.error('An error occured: ', err);
  });
```


## Dependencies

The embedding page needs to provide the following libraries:

* [Material Icon Font](http://fonts.googleapis.com/icon?family=Material+Icons)
* [Open Sans Font](http://fonts.googleapis.com/css?family=Open+Sans:300,400,600,900,300italic,400italic)
* [Bootstrap](https://github.com/joblocal/bootstrap/tree/joblocal-bootstrap4) ^4.0.0


## Development

### Prerequisites

Ensure you have installed (globally) the following software on your system:

* [node.js](http://nodejs.org/) ^6.0.0
* [npm](http://blog.npmjs.org/post/85484771375/how-to-install-npm) ^3.9.5
* [yarn](https://yarnpkg.com/) ^0.18.1

### JavaScript Dependencies

Inside your local working directory:

```sh
$ yarn install
```

### Start the Development Server

To start the development server:

```sh
$ yarn dev
```

### Linting

```sh
$ yarn lint
```

### Testing

```sh
$ yarn test
```
