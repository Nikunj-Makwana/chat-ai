import { getDb } from '../../../lib/mongodb';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    try {
        const db = await getDb();

        const existingUser = await db.collection('users').findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const result = await db.collection('users').insertOne({ name, email, password });
        const user = { _id: result.insertedId, name, email };

        const token = jwt.sign({ userId: user._id, email: user.email, name: user.name }, SECRET_KEY, { expiresIn: '1d' });

        return res.status(200).json({
            message: 'User signed up successfully',
            user,
            token
        });
    } catch (error) {
        console.error('Signup error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
