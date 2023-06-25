const express = require('express');
const cors = require('cors');
const app = express();

const mongoose = require('mongoose')
const User = require('./models/User.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const imageDownloader = require('image-downloader')

require('dotenv').config();

const bcryptSalt = bcrypt.genSaltSync(10)
const jwtSecret = 'dsuhfuersgtfueskrhirfetgfh';

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  "credentials" : true,
  "origin" : "http://localhost:5173"
}));
app.use('/uploads', express.static(__dirname + '/uploads'))

mongoose.connect(process.env.MONGO_URL);

app.get('/test', (req, res) => {
  res.json('Hello World!');
});

app.post('/register', async (req, res) => {
  const {name, email, password} = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password:bcrypt.hashSync(password, bcryptSalt)
    });
    res.json(userDoc)
  } catch (error) {
    res.status(422).json(error)
  }
});

app.post('/login', async (req,res) => {
  const {email, password} = req.body;
  const userDoc = await User.findOne({email});
  if(userDoc) {
    const passok = bcrypt.compareSync(password, userDoc.password)
    if(passok) {
      jwt.sign({email:userDoc.email, id: userDoc._id}, jwtSecret, {}, (err, token) => {
        if(err) throw  err;
        res.cookie('token', token).json(userDoc)

      });
    }
    else {
      res.json('incorrect Password' )
    }
  }
  else {
    res.status(422).json('User not found');
  }

});

app.get('/profile', (req, res) => {
  const {token} = req.cookies;
  if(token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData)=>{
      if(err) throw err;
      const userDoc = await User.findById(userData.id);
      res.json(userDoc)
    })
  }
  else {
    res.json(null);
  }
})

app.post('/logout', (req,res) => {
  res.cookie('token', '').json(true)
})

app.post('/upload-by-link', async (req, res) => {
  const {link} = req.body
  const newName = 'photo' + Date.now() + '.jpg'
  await imageDownloader.image({
    url: link,
    dest: __dirname + '/uploads/' + newName
  })
  res.json(newName)
})
app.listen(4000);