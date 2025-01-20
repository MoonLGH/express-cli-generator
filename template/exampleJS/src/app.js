import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import csrf from 'csrf';
import dotenv from 'dotenv';
import { authRoutes, userRoutes,mainRoutes } from './routes';

dotenv.config();

const app = express();

// Middlewares
app.set("view engine", "ejs");
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(cookieParser()); // Cookie parsing
app.use(express.json()); // Parse JSON bodies
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.set("views", path.join(__dirname, "views"));

// Routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/', mainRoutes);

// CSRF Protection
app.use((req, res, next) => {
  req.csrfToken = csrf().create();
  res.locals.csrfToken = req.csrfToken;
  next();
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server running on port 3000');
});
