import authMiddleware from '../middlewares/auth';
import express from 'express';

const router = express.Router();

router.get('/noauth', (req, res) => res.send('Hello Anonymous!'));

router.use(authMiddleware);

router.get('/auth', (req, res) => res.send('Hello User!'));

export default router;
