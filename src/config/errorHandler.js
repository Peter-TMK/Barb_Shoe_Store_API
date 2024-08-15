// const errorHandler = (err, req, res, next) => {
//   console.log(err.message);

//   if (err.name === "CastError") {
//     return res.status(400).send({ err: "malformatted ID" });
//   }
//   if (err.name === "ValidationError" || err.status === 400) {
//     return res.status(400).send({ err: err.message });
//   }

//   res.status(500).send({ err: "Internal Server Error" });
// };

// // const errorHandler = (err, req, res, next) => {
// //   console.error(err.stack);
// //   res.status(500).json({ message: err.message });
// // };

// // app.use(errorHandler);

// module.exports = errorHandler;
////////////////////////////////////////////////////////
// Error handler middleware
function errorHandler(err, req, res, next) {
  console.error(err.stack);

  // Determine the error response status code
  const statusCode = err.status || 500;

  // Format error response
  const errorResponse = {
    status: statusCode,
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }), // Include stack trace only in development
  };

  res.status(statusCode).json(errorResponse);
}

module.exports = errorHandler;
