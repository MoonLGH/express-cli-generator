import pool from '../config/db';

// Find a user by username
export const findUserByUsername = (username, callback) => {
  pool.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    if (results.length === 0) {
      return callback(null, null); // No user found
    }
    return callback(null, results[0]); // User found
  });
};

// Create a new user
export const createUser = (username, password, callback) => {
  const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
  pool.query(sql, [username, password], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, { id: results.insertId, username });
  });
};

// Find a user by ID
export const findUserById = (id, callback) => {
  pool.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    if (results.length === 0) {
      return callback(null, null); // No user found
    }
    return callback(null, results[0]); // User found
  });
};

// Update user password (or other details)
export const updateUser = (id, updatedData, callback) => {
  const { username, password } = updatedData;
  const sql = 'UPDATE users SET username = ?, password = ? WHERE id = ?';
  pool.query(sql, [username, password, id], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, results);
  });
};

// Delete a user by ID
export const deleteUser = (id, callback) => {
  const sql = 'DELETE FROM users WHERE id = ?';
  pool.query(sql, [id], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, results);
  });
};

import { findUserByUsername, createUser, findUserById } from '../models/userModel';
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

// CREATE TABLE users (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     username VARCHAR(255) NOT NULL UNIQUE,
//     password VARCHAR(255) NOT NULL
//   );