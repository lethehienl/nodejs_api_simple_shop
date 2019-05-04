const express= require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products'); 
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');

mongoose.connect(
    'mongodb+srv://lethehienl:' +
    process.env.MOGO_ATLAS_PW +
    '@cluster0-m5uzt.mongodb.net/test?retryWrites=true', {
//     useMongoClient: true,
      useNewUrlParser: true
    }
);
mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/users', userRoutes);
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With', 'Content-type, Accept, Authorization');
  if(req.method ===  'OPTIONS'){
    res.header('Access-Control-Allow-Methods', 'POST, PUT, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status= 404;
  next(error);
});

app.use((error, req, res, next)=> {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;