const mongoose = require('mongoose');
require('dotenv/config');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database connected!');
  })
  .catch((error) => {
    console.log('error', error);
    process.exit();
  });