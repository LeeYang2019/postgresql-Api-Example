import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const comparePassword = (password: string, hash: string) => {
    return bcrypt.compare(password, hash);
}

export const hasPassword = (password: string) => {
    return bcrypt.hash(password, 5);
}

export const createJWT = (user: { id: any; username: any; }) => {
	const token = jwt.sign(
		{ id: user.id, username: user.username },
		process.env.JWT_SECRET!
	);
	return token;
};

export const protect = (req: any, res: any, next: () => void) => {
    const bearer = req.headers.authorization;
    
    //grab bearer
    if (!bearer) {
        res.status(401);
        res.send("Not authorized");
        return;
      }
    
      const [, token] = bearer.split(" ");
      if (!token) {
        console.log("here");
        res.status(401);
        res.send("Not authorized");
        return;
      }
    
      try {
        const payload = jwt.verify(token, process.env.JWT_SECRET!);
        req.user = payload;
        console.log(payload);
        next();
        return;
      } catch (e) {
        console.error(e);
        res.status(401);
        res.send("Not authorized");
        return;
      }
}