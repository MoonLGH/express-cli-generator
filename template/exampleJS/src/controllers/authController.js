import { findUserByUsername, createUser } from '../models/userModel';
import jwt from 'jsonwebtoken';

export const login = (req, res) => {
  const { username, password } = req.body;

  findUserByUsername(username, (err, user) => {
    if (err || !user) return res.status(401).send('Unauthorized');
    
    if (password === user.password) { // Simplified for demonstration; use hashed passwords in production
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).send('Unauthorized');
    }
  });
};

export const register = (req, res) => {
  const { username, password } = req.body;

  // Check if the username already exists
  findUserByUsername(username, (err, existingUser) => {
    if (existingUser) return res.status(400).send('Username already exists');
    
    // Create new user
    createUser(username, password, (err, newUser) => {
      if (err) return res.status(500).send('Error registering user');
      res.status(201).send('User registered');
    });
  });
};
