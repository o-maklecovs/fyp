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
app.get('/profile', (req, res) => res.render('profile', { title: 'myJobs - Profile' }));
app.get('/saved', (req, res) => res.render('saved', { title: 'myJobs - Saved jobs' }));
app.get('/applied', (req, res) => res.render('applied', { title: 'myJobs - Applied jobs' }));
app.get('/profile-employer', (req, res) => res.render('profile_employer', { title: 'myJobs - Employer profile' }));
app.get('/posted', (req, res) => res.render('posted', { title: 'myJobs - Posted jobs' }));
app.get('/applicants', (req, res) => res.render('applicants', { title: 'myJobs - Applicants' }));
app.get('/create', (req, res) => res.render('create', { title: 'myJobs - Create job posting' }));
app.get('/job/edit', (req, res) => res.render('edit', { title: 'myJobs - Create job posting' }));

// change later to env variable
app.listen(5000);