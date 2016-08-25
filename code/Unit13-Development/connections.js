// Build connection data to take advantage of the different users we created.
// Depending on what we are trying to do in our app, we will need to use the appropriate connection.

module.exports = {
  restReader: {
    host: 'localhost',
    port: 5003,
    user: 'rest-reader-user',
    password: 'training'
  },
  restWriter: {
    host: 'localhost',
    port: 5003,
    user: 'rest-writer-user',
    password: 'training'
  },
  restAdmin: {
    host: 'localhost',
    port: 5003,
    user: 'rest-admin-user',
    password: 'training'
  }
};
