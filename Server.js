const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/SecondHand', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB', err);
});

// Middleware to parse JSON bodies
app.use(bodyParser.json());

app.use(express.static('public'));


app.get('/login', (req, res) => {
  // Send the login form HTML file
  res.sendFile(path.join(__dirname,'public', 'login.html'));
});


app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(username, " ", password);

  try {
    // Search for the user in the "Users" collection
    const user = await mongoose.connection.collection('Users').findOne({ username, password });

    if (user) {
      // User found, login successful
      res.status(200).json({ message: 'Login successful' });
    } else {
      // User not found or invalid credentials, login failed
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    // Internal server error
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
