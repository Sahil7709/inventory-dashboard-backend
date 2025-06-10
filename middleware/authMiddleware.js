const jwt = require('jsonwebtoken');
const User = require('../models/user');

const protect = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("Authorization header:", authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log("❌ Authorization header is missing or malformed");
        return res.status(401).json({ message: 'No token, not authorized' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        console.log("❌ Token is missing after Bearer");
        return res.status(401).json({ message: 'Token missing' });
    }

    try {
        console.log("✅ Incoming token:", token);

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("✅ Decoded token:", decoded);

        req.user = await User.findById(decoded.id).select('-password');

        if (!req.user) {
            console.log("❌ User not found from decoded token");
            return res.status(401).json({ message: 'User not found' });
        }

        next();
    } catch (error) {
        console.log("❌ JWT verification failed:", error.message);
        return res.status(401).json({ message: 'Token invalid or expired' });
    }
};


module.exports = { protect };