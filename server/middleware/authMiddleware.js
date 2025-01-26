export const setUserRole = (req, res, next) => {
  if (req.path.startsWith('/customer')) {
    req.body.role = 'customer';
  } else if (req.path.startsWith('/admin')) {
    req.body.role = 'admin';
  }
  next();
};
