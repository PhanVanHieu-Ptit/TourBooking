function message(data = [], status = true, message = "") {
  if (!Array.isArray(data))
    throw new Error('data must be an array');
  if (typeof status != 'boolean')
    throw new Error('status must be a boolean');
  if (typeof message != 'string')
    throw new Error('message must be a string');
  return { data, status, message };
}

module.exports = message;