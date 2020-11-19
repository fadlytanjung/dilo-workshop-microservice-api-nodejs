const success = (res, data, message = '') => {
  const response = {
    status: 'success',
    data,
    message
  };
  res.send(response)
};

const error = (res, message = '') => {
  const response = {
    status: 'error',
    data: null,
    message
  };
  res.send(response)
};


module.exports = {
  success,
  error
};