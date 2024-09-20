const express = require('express');
const path = require('path');
const sturec = require('./app');
const app = new express();
console.log(sturec)
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  res.render('index');
})
app.get('/login', (req, res) => {
  res.render('login');
})
app.get('/signup', (req, res) => {
  res.render('index');
})
app.get('/home', (req, res) => {
  res.render('home');
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//------------------------STUDENT SIGNUP API-------------------------

app.post('/signup', async (req, res) => {
  await sturec(req.body).save().
    then((data) => res.render('login')).
     catch((err) => res.status(401).send({ "Msg": err }));
});

//------------------------STUDENT LOGIN API-------------------------

app.post('/login', async (req, res) => {
  const stu = await sturec.findOne({email: req.body.email, password: req.body.password});
     if(stu) {
       res.render('home');
     } else {
       res.status(401).send({ "Msg": "Student Not found!!" });
     }
});

app.listen(1010, () => console.log("Server Created!!!"));

