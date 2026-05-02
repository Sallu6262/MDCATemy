export class AppError extends Error {
    constructor(message, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const handleAsyncError = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

export const errorMiddleware = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(`[ERROR] ${req.method} ${req.originalUrl} -> ${err.message}`);
    res.status(statusCode).json({
        status: statusCode >= 500 ? "error" : "fail",
        statusCode,
        message: err.message || "Internal Server Error",
    });
};
