/* ==================================================
src/middleware/errorHandler.js
Centralized error handling
================================================== */
function errorHandler(err, req, res, next) {
console.error(err);
const status = err.status || 500;
res.status(status).json({ success: false, error: { code: status, message: err.message || 'Internal Server Error' } });
}
module.exports = errorHandler;