const adminMiddleware = (req, res, next) => {
    // Check if the user information is available in the request
    try {
        const adminRole = req.user.isAdmin;
        if (!adminRole) {
            return res.status(403).json({ message: "Forbidden. Admins only." });
        } 
        next();
    } catch (error) {
        next(error); 
    }
}

module.exports = adminMiddleware;