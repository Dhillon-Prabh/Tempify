const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if(!authHeader) {
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
    throw error;
  }

  var token = req.headers.authorization.split(' ')[1];
  let decodedToken; 

  try {
    decodedToken = jwt.verify(token, 'secret');
  } catch(err) {
    err.statuCode = 500;
    throw err;
  }

  if(!decodedToken) {
    const error = new Error('Not authenticated.'); 
    error.statusCode = 401;
    throw error;
  }

  req.userId = decodedToken.userId;
  next();
};
