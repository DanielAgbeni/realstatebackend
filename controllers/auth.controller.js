import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();
export const register = async (req, res) => {
	const { username, email, password } = req.body;
	try {
		// hashing password
		const hashedPassword = await bcrypt.hash(password, 10);
		console.log(username, email, hashedPassword);
		// creating user and save to db
		const newUser = await prisma.user.create({
			data: {
				username,
				email,
				password: hashedPassword,
			},
		});
		console.log(newUser);
		res.status(201).json({ message: 'User created successfully' });
		res.json(newUser);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Error creating user' });
	}
};
export const login = async (req, res) => {
	const { username, password } = req.body;
	try {
		const user = await prisma.user.findUnique({
			where: {
				username: username,
			},
		});
		// console.log(user);
		if (!user)
			return res.status(401).json({ message: 'Invalid username or password' });
		// Checkif password iscorrect
		const isPassword = await bcrypt.compare(password, user.password);
		if (!isPassword)
			return res.status(401).json({ message: 'Invalid username or password' });
		// Generate cookie token and send to the user
		// console.log(process.env.JWT_SECRET_KEY);
		const age = 1000 * 60 * 60 * 24 * 7;
		const token = jwt.sign(
			{
				id: user.id,
			},
			process.env.JWT_SECRET_KEY,
			{ expiresIn: age },
		);

		res
			.cookie('token', token, {
				httpOnly: true,
				// secure: true,
				maxAge: age,
			})
			.status(200)
			.json({ message: 'Login Sucessfull' });
		// res.setHeader('Set-Cookie', 'test=' + 'myValue').json('Sucess');
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Error logging in user' });
	}
};

export const logout = (req, res) => {
	res.clearCookie('token').status(200).json({ message: 'Logout Sucessful' });
};
