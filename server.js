const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const User = require('./models/User');
const app = express();
app.use(express.static('public'));

// Database Connection
mongoose.connect('mongodb+srv://hkthang24_db_user:4ddE4lOYojl0PvKJ@cluster0.v3h0jv7.mongodb.net/');

// Multer Storage Configuration (Storing in memory to send to DB)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

// Routes
app.get('/', (req, res) => res.render('register'));

app.post('/register', upload.single('image'), async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        profileImage: {
            data: req.file.buffer,
            contentType: req.file.mimetype
        }
    });
    await newUser.save();
    res.send('User registered and image saved to MongoDB!');
});

app.listen(3000, () => console.log('Server running on port 3000'));