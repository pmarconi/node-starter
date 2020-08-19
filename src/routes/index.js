import authMiddleware from '../middlewares/auth';
import express from 'express';
import { successResponder, errorResponder } from './../responders';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authService from './../services/authentication';

// import UserController from '../controllers/user'
import UserController from '../models/db'
import UserController2 from '../models/user'

const router = express.Router();

router.get('/noauth', (req, res) => res.send('Hello Anonymous!'));

router.post('/login', async function (req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) return errorResponder(res, 401, 'Invalid Data');

    const user = authService.user;

    const isValidUser = user.email == email;
    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword || !isValidUser)
      return errorResponder(res, 401, 'Invalid Data');

    const { password: userPassword, ...profile } = user;
    return successResponder(res, {
      profile,
      token: authService.generateJWT({ email: user.email }),
    });
  } catch (error) {
    console.log('error', error);
    return errorResponder(res, 401, 'Invalid Data');
  }
});

router.get('/', (req, res) => res.send('Hello World!'));

router.use(authMiddleware);

router.get('/auth', (req, res) => {
  const { user } = req;
  return res.send(`Hello ${user.email}!`);
});

export default router;
