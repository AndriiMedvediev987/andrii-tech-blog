const withAuth = (req, res, next) => {
// Redirect to the login page
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;
