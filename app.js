const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');

const app = express();

app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.render('index', { title: 'myJobs - Home' }));
app.get('/list', (req, res) => res.render('list', { title: 'myJobs - Jobs in your area' }));
app.get('/job', (req, res) => res.render('job', { title: 'myJobs - Job title' }));
app.get('/login', (req, res) => res.render('login', { title: 'myJobs - Login' }));
app.get('/employer', (req, res) => res.render('login_employer', { title: 'myJobs - Employer' }));
app.get('/register', (req, res) => res.render('register', { title: 'myJobs - Register' }));
app.get('/register-employer', (req, res) => res.render('register_employer', { title: 'myJobs - Register as employer' }));

// change later to env variable
app.listen(5000);