const errorHandler = (err, _req, res, _next) => {
  if (!err.status) return res.status(500).json({ message: 'Internal Error' });

  const { status, message } = err;

  res.status(status).send({ message });
};

module.exports = errorHandler;