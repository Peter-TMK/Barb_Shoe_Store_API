const errorHandler = (err, req, res, next) => {
  console.log(err.message);

  if (err.name === "CastError") {
    return res.status(400).send({ err: "malformatted ID" });
  }
  if (err.name === "ValidationError" || err.status === 400) {
    return res.status(400).send({ err: err.message });
  }

  res.status(500).send({ err: "Internal Server Error" });
};

// const errorHandler = (err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: err.message });
// };

// app.use(errorHandler);

module.exports = errorHandler;
