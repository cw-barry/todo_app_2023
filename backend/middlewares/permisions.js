exports.isLogin = (req, res, next) => {
  if (req?.user) next();
  else {
    res.errorStatusCode = 403;
    throw new Error('No Permission: Must login First.');
  }
};

exports.isAdmin = (req, res, next) => {
  if (req?.user && req?.user?.isAdmin) next();
  else {
    res.errorStatusCode = 403;
    throw new Error('No Permission: Only admins can perform this task');
  }
};
