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
// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));


app.get('/login', (req, res) => {
  // Send the login form HTML file
  res.sendFile(path.join(__dirname,'routes', 'login.html'));

});

//if successfully logged in
app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Home.html'));
});

app.get('/scripts', (req, res) => {
  res.sendStatus(401).sendFile(path.join(__dirname,'routes', 'login.html'))
});



app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Search for the user in the "Users" collection
    const user = await mongoose.connection.collection('Users').findOne({ username: username, password: password });

    if (user) {
      // User found, login successful
      res.redirect('/home');
    } else {
      // User not found or invalid credentials, login failed
      res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (error) {
    // Internal server error
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
    console.log("exceptional case!");
  }
});

// Define the user schema
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  gender: { type: String, required: true }
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;


app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

app.post('/signup', async (req, res) => {
  const { fullName, username, email, phone, password, gender } = req.body;
  console.log(req.body);
  // Validate the data (optional)

  try {
    // Create a new user document
    const newUser = new User({
      fullName,
      username,
      email,
      phone,
      password,
      gender
    });

    // Save the new user to MongoDB
    await newUser.save();

    // Redirect the user to a success page or any other page
    res.redirect('/login');
  } catch (error) {
    // Handle errors
    console.error('Error creating user:', error);
    res.status(500).send('Internal server error');
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
