const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SALT_ROUNDS = 10;

const createHashedPassword = async (password) => {
    const hashedpassword = await bcrypt.hash(password, SALT_ROUNDS);
    return hashedpassword;
}

const verifyPassword = async (password, hash) => {
    const isValid = await bcrypt.compare(password, hash);
    return isValid;
}

const createJwtToken = (payload) => {
    const token = jwt.sign(payload, process.env.SECRET, {expiresIn: '1d'});
    return token;
}

const verifyJwtToken = (token) => {
    const verifiedToken = jwt.verify(token, process.env.SECRET);
    return verifiedToken;
}

module.exports = {
    createHashedPassword,
    verifyPassword,
    createJwtToken,
    verifyJwtToken
}