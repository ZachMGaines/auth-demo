import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import gramController from './controllers/gram.js';
import cookieParser from 'cookie-parser';
import authController from './controllers/auth.js';
import commentController from './controllers/comments.js';

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(gramController);
app.use(authController);
app.use(commentController);


if (app) {
  console.log('hi');
}

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
