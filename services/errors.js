function errors(name, message, status) {
    const err = new Error(message);
    err.name = name;
    err.status = status;
    throw err;
  }
  
  module.exports = errors;