import jwt from 'jsonwebtoken';

const isAuthenticated = async (req, res, next) => {
    try {
        // Retrieve token from cookies
        const token = req.cookies.token;

        // Check if token exists
        if (!token) {
            return res.status(401).json({
                message: "Authentication token is missing",
                success: false,
            });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.id = decoded.userId; // Attach user ID to request object for further use

        next(); // Pass control to the next middleware/handler
    } catch (error) {
        // Differentiate error types for better debugging
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                message: "Invalid authentication token",
                success: false,
            });
        } else if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: "Authentication token has expired",
                success: false,
            });
        } else {
            console.error(error); // Log unexpected errors for debugging
            return res.status(500).json({
                message: "Internal Server Error",
                success: false,
            });
        }
    }
};

export default isAuthenticated;