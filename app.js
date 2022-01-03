const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');

const app = express();

app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.render('index', { title: 'myJobs' }));
app.get('/login', (req, res) => res.render('login', { title: 'myJobs - Login' }));

// /jobs get controller will be expanded
// TODO: change "jobs in your area" to "jobs in [selected city]"
app.get('/list', (req, res) => res.render('list', { title: 'myJobs - Jobs your area' }));

app.get('/job', (req, res) => res.render('job', { title: 'myJobs - Job title' }));

// change later to env variable
app.listen(5000);