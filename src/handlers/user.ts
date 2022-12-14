import prisma from '../db';
import { comparePassword, createJWT, hasPassword } from '../modules/auth';

export const createNewUser = async (req: any, res: any, next: (e: any) => void) => {
	const { username, password } = req.body;
	try {
		const user = await prisma.user.create({
			data: {
				username: username,
				password: await hasPassword(password),
			},
		});
	
		const token = createJWT(user);
		res.json({ token });
	} catch (error: any) {
		error.type = 'input';
		next(error)
	}
};

export const signin = async (req: any, res: any) => {
	const { username, password } = req.body;
	const user = await prisma.user.findUnique({ where: { username } });
	const isValid = await comparePassword(password, user!.password);
	if (!isValid) {
		res.status(401).json({ message: 'nope' });
		return;
	}
	const token = createJWT(user!);
	res.json({ token });
};

