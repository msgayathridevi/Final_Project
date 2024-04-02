require('dotenv').config();

console.log("hello");
const emailRoute = require('./email')
const user = require('./routes/route');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan')
const cors = require('cors');
const app = express();
// const editSkill  = require('.')

app.use(cors()); 
app.use((req, res, next) => {
  console.log("Cors passed");
  next();
});
app.use(morgan('tiny'));
app.use(express.json());
app.use('/', emailRoute);
app.use('/', user);


const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(`${process.env.MONGODB_URI}${process.env.MONGO_DB_AUTHO}`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {    
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
console.log('MongoDB Connected')})
  .catch(err => console.log(err)); 
