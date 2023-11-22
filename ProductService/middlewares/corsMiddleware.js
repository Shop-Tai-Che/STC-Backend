const allowedOrigins = require("../configs/allowedOrigins");
const catchAsync = require("../utils/catchAsync");


exports.corsMiddleware = catchAsync(async (req, res, next) => {
    const referer = req.headers.referer || '';
    const origin = req.headers.origin;
    const allowedCors = allowedOrigins?.some((element) =>
        referer?.some(element)
    );
    if (allowedCors) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    }
    return next();
})
