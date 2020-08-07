import authService from '../services/authentication';
import { errorResponder } from '../responders';

const authMiddleware = function (req, res, next) {
  const authorization = req.headers.authorization;
  if (authorization) {
    authService.verifyJWT(authorization).then(({ success, email }) => {
      if (!success) {
        return errorResponder(res, 401, 'Unauthorized');
      }
      req.user = authService.user;
      next();
    });
  } else {
    return errorResponder(res, 401, 'Unauthorized');
  }
};

export default authMiddleware;
