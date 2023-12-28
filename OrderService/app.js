const express = require('express');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController')

const orderRoutes = require('./routes/orderRoute');

const limiter = rateLimit({
  // limiter is now become a middleware function
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try this again in an hour!',
}); // define how many requests per IP we are going to allow in a certain of time

const corsOptions = {
  origin: '*',
  credentials: false,
  optionSuccessStatus: 200
}

const app = express();
app.use(cors(corsOptions));
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
// app.use(limiter);


app.use(express.json({ limit: '10mb' }));

const allowedOrigins = ["https://h5.zdn.vn", "zbrowser://h5.zdn.vn"];
app.use((req, res, next) => {
  console.log(req.headers.origin)
  const origin = req.headers.origin || 'zbrowser://h5.zdn.vn';

  res.setHeader("Access-Control-Allow-Origin", origin);
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return next();
});

// API
app.use('/api/v1/order', orderRoutes)

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 400))
})
app.use(globalErrorHandler)

module.exports = app;
