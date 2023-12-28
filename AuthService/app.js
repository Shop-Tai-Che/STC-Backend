const express = require('express');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController')
const userRoutes = require('./routes/userRoute')
const shopRoutes = require('./routes/shopRoute')

const { corsMiddleware } = require('./middlewares/corsMiddleware');
const corsOptions = require('./configs/corsOptions');

const limiter = rateLimit({
  // limiter is now become a middleware function
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try this again in an hour!',
}); // define how many requests per IP we are going to allow in a certain of time

const app = express();
app.use(cors(corsOptions));
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
// app.use(limiter);

app.use(express.json({ limit: '10mb' }));

app.use('/api/v1/user', userRoutes)
app.use('/api/v1/shop', shopRoutes)

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 400))
})
app.use(globalErrorHandler)

module.exports = app;
