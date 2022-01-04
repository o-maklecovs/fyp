const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');

const app = express();

app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.render('index', { title: 'myJobs - Home' }));
app.use('/list', require('./routes/list'));
app.use('/job', require('./routes/job'));
app.use('/login', require('./routes/login'));
app.use('/employer', require('./routes/employer'));
app.use('/register', require('./routes/register'));
app.use('/register-employer', require('./routes/register_employer'));
app.use('/profile', require('./routes/profile'));
app.use('/saved', require('./routes/saved'));
app.use('/applied', require('./routes/applied'));
app.use('/profile-employer', require('./routes/profile_employer'));
app.use('/posted', require('./routes/posted'));
app.use('/applicants', require('./routes/applicants'));
app.use('/create', require('./routes/create'));

// change later to env variable
app.listen(5000);