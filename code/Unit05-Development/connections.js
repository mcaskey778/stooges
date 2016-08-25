// Build connection data to take advantage of the
// different users we created.
// Depending on what we are trying to do in our app,
// we will need to use the appropriate connection.

module.exports = {
  restReader: {
    host: 'localhost',
    port: 7010,
    user: 'rest-reader-user',
    password: 'training'
  },
  restWriter: {
    host: 'localhost',
    port: 7010,
    user: 'rest-writer-user',
    password: 'training'
  },
  restAdmin: {
    // configuration information
    // for rest-admin-user
  }
};
