import express from 'express';
import {loginController} from '../src/controllers/loginController.js';

const router = express.Router();

router.post('/login', loginController.login);

export default router;
