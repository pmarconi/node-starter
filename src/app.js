import express from 'express';
import bp from 'body-parser';
import { successResponder, errorResponder } from './responders';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authService from './services/authentication';
import TestRoutes from './routes';

// import config from 'config'
// console.log("config", config)

const app = express();
const port = 3000;

app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());

app.post('/login', async function (req, res) {
  const { email, password } = req.body;

  if (!email || !password) return errorResponder(res, 401, 'Invalid Data');

  const user = authService.user;

  const isValidUser = user.email == email;
  const isValidPassword = bcrypt.compareSync(password, user.password);
  if (!isValidPassword || !isValidUser)
    return errorResponder(res, 401, 'Invalid Data');
  return successResponder(res, {
    profile: { email: user.email },
    token: authService.generateJWT({ email: user.email }),
  });
});

app.get('/', (req, res) => res.send('Hello World!'));

// TEST ROUTES
// http://localhost:3000/test/auth 
// http://localhost:3000/test/noauth 
app.use('/test', TestRoutes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
