import express from 'express';
import cors from 'cors';
import logger from './src/middlewares/logger.js';
import loginRoutes from './routes/loginRoutes.js';
import usersRoutes from './routes/usersRoutes.js';
import {errorController} from './src/controllers/errorController.js';
import 'dotenv/config';

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());
app.use(logger);

app.use("/", loginRoutes);
app.use("/", usersRoutes);
app.use("*", errorController.error404);

app.listen(PORT, console.log(`Server running on port ${PORT}...`));
