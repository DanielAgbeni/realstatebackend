import express from 'express';
import authRoute from './routes/auth.route.js';
import postRoute from './routes/post.route.js';
import userRoute from './routes/user.route.js';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cookieParser());
const port = 3000;

app.use('/api/auth', authRoute);
app.use('/api/post', postRoute);
app.use('/api/user', userRoute);

app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});
