export const localsMiddleware = (req, res, next) => {
  console.log(req.session);
  res.locals.loggedIn = req.session.loggedIn;
  res.locals.user = req.session.user;
  next();
};
