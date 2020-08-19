//
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_TOKEN_EXPIRY_DURATION = 365 * 24 * 60 * 60;
const JWT_APP_SECRET = 'hello'; // TODO:

// Mocked user data
const secretPasswordHash = bcrypt.hashSync('secret', 10);
const user = {
  avatar: "https://vignette.wikia.nocookie.net/batmantheanimatedseries/images/b/b1/PP_20_-_Your_crazy_friend.jpg",
  email: 'admin@admin.com',
  password: secretPasswordHash,
  firstName: 'Bruce',
  lastName: 'Wayne',
  nickname: 'NotTheBatman',
};

const generateJWT = (json) => {
  const expiresIn = Math.floor(Date.now() / 1000) + JWT_TOKEN_EXPIRY_DURATION;
  return jwt.sign(json, JWT_APP_SECRET, { expiresIn });
};

const verifyJWT = async (token) => {
  try {
    const decodedToken = jwt.verify(token, JWT_APP_SECRET);
    if (user.email == decodedToken.email) {
      console.log(`Found ${user ? 'a' : 'no'} user for the token`);
      return { success: !!user, email: decodedToken.email };
    } else {
      console.log(`Email not found when token is decoded`);
      return { success: false };
    }
  } catch (e) {
    console.log(`Token is invalid`);
    return { success: false };
  }
};

export default { user, generateJWT, verifyJWT };
