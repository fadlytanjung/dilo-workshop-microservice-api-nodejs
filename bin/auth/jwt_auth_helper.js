
const jwt = require('jsonwebtoken');
const fs = require('fs');
const wrapper = require('../helpers/utils/wrapper');

const getToken = (headers) => {
  if (headers && headers.authorization && headers.authorization.includes('Bearer')) {
    const parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    }
  }
  return undefined;
};

const verifyToken = async (req, res, next) => {
  const result = {
    err: null,
    data: null
  };
  const key = process.env.JWT_SECRET_KEY;

  const token = getToken(req.headers);
  if (!token) {
    return wrapper.error(res, 'Invalid token!');
  }
  let decodedToken;
  try {
    decodedToken = await jwt.verify(token, key);
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return wrapper.error(res, 'Access token expired!');
    }
    return wrapper.error(res, 'Token is not valid!');
  }
  const role = decodedToken.user_claims.role;
  if (role===1) {
    result.err = new ForbiddenError('Invalid token!');
    wrapper.error(res, 'Invalid token!', ERROR.FORBIDDEN);
  }
  req.username = decodedToken.identity;
  next();
};

module.exports = {
  verifyToken
};
