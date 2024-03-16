const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// BodyParser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myproject', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// Define a schema for the contact form
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  first_name: String,
  last_name: String,
  email_address: String,
  message: String,
});

// Create a model from the schema
const Contact = mongoose.model('Contact', contactSchema);

// POST route to receive form submissions
app.post('/subscribe', async (req, res) => {
  try {
    const { first_name, last_name, email_address, message } = req.body;
    const newContact = new Contact({ first_name, last_name, email_address, message });

    await newContact.save();
    res.status(201).send('Subscription successful');
  } catch (err) {
    res.status(500).send('Server error');
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
