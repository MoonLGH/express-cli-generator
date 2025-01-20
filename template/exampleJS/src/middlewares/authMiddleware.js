import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  
  if (!token) return res.status(403).send('No token provided');
  
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).send('Failed to authenticate token');
    req.userId = decoded.userId;
    next();
  });
};
