const express= require('express');
const app = express();
const mongoose = require('mongoose');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const DB = require('./db');

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', async (req, res) => {

    let user = await DB.find({});
    try{
      res.render('index', { user });
    } catch {
      console.log(err);
    }
  }
)

app.post('/form', (req, res) => {
  const user = new DB({
    name: req.body.name,
    email: req.body.email,
    city: req.body.city,
    mobile: req.body.mobile
  });

  user.save() 
    .then((data) => {
      console.log(data);
      res.redirect('/');
    })
    .catch(err => {
      console.log(err);
    })
  
})

app.get('/form/:id', (req, res) => {
  let id = req.params.id;

  console.log(id);
  DB.findById(id)
    .then(user => {
      res.render('form', { user })
    })
    .catch(err => {
      console.log(err);
    })
  
})

app.post('/form/:id', (req, res) => {
  let id = req.params.id;
  DB.findById(id)
    .then(user => {
      user.name = req.body.name,
      user.email = req.body.email,
      user.city = req.body.city,
      user.mobile = req.body.mobile

      user.save();
      res.redirect('/');
    })
    .catch(err => console.log(err))
})

app.get('/form', (req, res) => {
  res.render('form', { user: '' });
})

app.get('/:id', (req, res) => {
  const id = req.params.id;

  DB.findByIdAndRemove(id)
    .then(() => {
      res.redirect('/');
    })
    .catch(err => {
      console.log(err);
    })
})

mongoose.connect('mongodb://localhost/employes', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log('connected');
})

app.listen(5000);