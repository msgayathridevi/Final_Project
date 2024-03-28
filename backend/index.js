require('dotenv').config(); // Load environment variables from .env file

console.log("hello");
const userRouter = require('./routes/user.js');
const adminuser = require('./models/user');
const user = require('./routes/user');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan')
const cors = require('cors');
const app = express();

app.use(cors()); 
app.use((req, res, next) => {
  console.log("Cors passed");
  next();
});
app.use(morgan('tiny'));
app.use(express.json())
app.use('/adminuser', userRouter);
app.use('/user', user);


const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {    
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
console.log('MongoDB Connected')})
  .catch(err => console.log(err)); 

// Define a schema and model for example purposes
// const Schema = mongoose.Schema;
// const exampleSchema = new Schema({
//   name: String,
//   email: String,
//   password: String,
//   role: { type: String, enum: ['admin', 'user'] },
//   age: Number
// });
// const ExampleModel = mongoose.model('Example', exampleSchema);

// Example route to fetch data
// app.get('/data', async (req, res) => {
//   try {
//     const data = await user.find();
//     res.json(data);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

