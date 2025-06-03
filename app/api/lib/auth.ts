import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;

export const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt)
}

export const comparePassword = async (enteredPassword: string, hashedPassword: string): Promise<boolean> => {
    return bcrypt.compare(enteredPassword, hashedPassword)
}


export const generateToken = (id: string): string => {
    const payload = { sub: id };

    return jwt.sign(payload, JWT_SECRET, {
        algorithm: 'HS256',
        expiresIn: '7d',
    });
}
