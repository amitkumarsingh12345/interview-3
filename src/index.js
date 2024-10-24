const express = require('express');
const path = require('path');
const chat = require('./app');
const { toDate } = require('validator');
const app = express();

app.set('view engine', 'hbs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/chat', (req, res) => {
  res.render('chat');
});

//------------------------REGISTRATION API-------------------------
app.post('/', async (req, res) => {
  try {
    const data = await chat(req.body).save();
    res.render('chat');
  } catch (err) {
    res.status(401).send({ "Msg": err.message });
  }
});

//------------------------CHAT API-------------------------
app.post('/chat', async (req, res) => {
  try {
    let data = await chat.findOne();
    data = data.time.split('');
    const hours = +(data[0] + data[1]);
    const minutes = +(data[3] + data[4]);

    const date = new Date();
    const curr_hours = date.getHours();
    const curr_mins = date.getMinutes();

    if ((curr_hours > hours) || (curr_hours == hours && curr_mins > minutes)) {
      res.render('success');
    } else {
      res.render('fail');
    }
  } catch (err) {
    res.render('chat-fail');
  }
});

app.listen(1010, () => console.log("Server Created on port 1010!!!"));
