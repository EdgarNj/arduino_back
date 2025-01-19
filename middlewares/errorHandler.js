

// eslint-disable-next-line no-unused-vars
export default function errorHandler(err, req, res, next) {
  const f = req.file || req.files;


  let { status } = err;

  if (!status ) {
    status = 422;
  } else if (!status) {
    status = 500;
  }

  res.status(status)
    .json({
      status: 'error',
      message: err.message,
      errors: err.errors,
      stack: process.env.NODE_ENV !== 'production' ? err.stack : undefined,
    });
}
