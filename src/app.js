import express from 'express';
import bp from 'body-parser';
import { successResponder, errorResponder } from './responders';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import authService from './services/authentication';
// import testRoutes from './routes/test';
import routes from './routes';


// import config from 'config'
// console.log("config", config)

const app = express();
const port = 3001;

app.use(cors());
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());

app.use('/', routes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
