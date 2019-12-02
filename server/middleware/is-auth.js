const jwt = require('jsonwebtoken');

/**
 * Authentication middleware. Checks to see if the token coming from client matches 
 * the token that is backend. 
 * @author Joe Fong 
 * @version 1.0
 */
module.exports = (req, res, next) => {

  const authHeader = req.get('Authorization');
  
  if(!authHeader) {
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
    throw error;
  }

  var token = req.headers.authorization.split(' ')[1];
  let decodedToken; 

  /**
   * Token is decoded and verified with the initial secret given
   * to the token. 
   * 
   * The secret is very simple and not hidden in the environment configs, given that this application is meant to be 
   * deployed as a proof of concept of an improved version of the previous application. 
   */
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

  req.decodedToken = decodedToken;
  req.userId = decodedToken.userId;  
  next();
};
