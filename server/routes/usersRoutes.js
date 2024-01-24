import express from 'express';
import { auth } from "../src/middlewares/auth.js";
import {usersController} from '../src/controllers/usersController.js';

const router = express.Router();

router.post('/usuarios', usersController.createUser);
router.get('/usuarios', auth.checkAuthentication, usersController.getUser);

export default router;
