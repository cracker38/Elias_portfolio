export function notFound(req, res) {
  res.status(404).json({ error: 'Route not found.' });
}

export function errorHandler(err, req, res, next) {
  console.error(err);
  const status = err.status || 500;
  const message =
    status === 500 ? 'Unexpected server error.' : err.message || 'Request failed.';
  res.status(status).json({ error: message });
}
