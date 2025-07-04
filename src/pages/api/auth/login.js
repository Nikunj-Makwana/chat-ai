import { getDb } from '../../../lib/mongodb';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const db = await getDb();

    const user = await db.collection('users').findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'User not found. Please sign up to continue.' });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id, email: user.email, name: user.name }, SECRET_KEY, { expiresIn: '1d' });

    const { password: pwd, ...userWithoutPassword } = user;

    return res.status(200).json({
      message: 'Login successful',
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}
