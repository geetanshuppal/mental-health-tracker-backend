const admin = require('../firebaseAdmin');

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log(decodedToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

module.exports = verifyToken;
