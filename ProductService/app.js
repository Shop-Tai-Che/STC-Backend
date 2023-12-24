const express = require('express');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController')
// const corsOptions = require('./configs/corsOptions');

const productRoutes = require('./routes/productRoute');
const { corsMiddleware } = require('./middlewares/corsMiddleware');

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

const allowedReferers = [
  'https://h5.zdn.vn/zapps/',
  'zbrowser://h5.zdn.vn/zapps/'
];

//app.use((req, res, next) => {
//  const referer = req.headers.referer || '';
//  const origin = req.headers.origin;
//  console.log(referer)
//  console.log(origin) 
//  const allowedCors = allowedReferers.some((element) =>
//    referer.startsWith(element)
//  );
//  console.log(allowedCors)
  //if (allowedCors) {
//  res.setHeader('Access-Control-Allow-Origin', origin);
//  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  //}
//  console.log('Request headers:', req.headers);
//  return next();
    //return res.status(200).json({"a":"a"})
//});

// API
app.use('/api/v1/product', productRoutes)

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})
app.use(globalErrorHandler)

module.exports = app;
