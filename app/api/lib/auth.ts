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

export const generateToken = (userId: string, email: string): string => {

    // iat = issued at
    //sub = subject
    const payload = {
        sub: userId,
        email,
        iat: Math.floor(Date.now() / 1000)
    }

    return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}
