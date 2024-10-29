// controllers/userController.js
const admin = require('../firebaseAdmin');

const getProfile = (req, res) => {
  res.send({
    message: `Welcome, ${req.user.email}. You are authenticated!`,
  });
};

const getUserData = async (req, res) => {
  try {
    const userRecord = await admin.auth().getUser(req.user.uid);
    res.send(userRecord);
  } catch (error) {
    res.status(500).send({ error: 'Error fetching user data' });
  }
};

const VerifiedUser = async (req, res) => {
    try {
       return res.status(200).send({ success: 'User Verified'});
    } catch (error) {
      res.status(500).send({ error: 'Error fetching user data' });
    }
  };

module.exports = { getProfile, getUserData  , VerifiedUser};
