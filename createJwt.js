const jwt = require("jsonwebtoken");

const JWT_SECRET_KEY = "b8b18ea0f3bed1d764c8e073a8a4aa63"; // Replace with your actual secret key

const userAddress = "TP7rcxBJp4FxJCgWKdK8Ay1rj6fTY8vRFi"; // User's address

// Create a JWT token
const token = jwt.sign({ userAddress }, JWT_SECRET_KEY, { expiresIn: "1h" });

console.log("JWT Token:", token);
