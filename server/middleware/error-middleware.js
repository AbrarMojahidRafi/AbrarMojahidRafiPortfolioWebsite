const errorMiddleware = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'BACKEND ERROR';
    const extraDetails = err.details || 'ERROR FROM BACKEND';

    return res.status(statusCode).send({ message, extraDetails });
}

module.exports = errorMiddleware;
