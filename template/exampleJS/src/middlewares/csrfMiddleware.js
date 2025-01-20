import csrf from 'csrf';

const csrfProtection = csrf();

export const csrfMiddleware = (req, res, next) => {
  csrfProtection(req, res, next);
};
