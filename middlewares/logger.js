//I used this to log the request and response details
module.exports = (req, res, next) => {
  console.log(`[${req.method}] ${req.path}`);
  next(); // Pass control to the next middleware or route
};
