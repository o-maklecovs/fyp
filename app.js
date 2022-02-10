const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
const cookieParser = require('cookie-parser');
const verifyLogin = require('./src/middlewares/verifyLogin');
const dbConn = require('./src/middlewares/db_conn');

const app = express();

app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', './src/views');

app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());

app.use(dbConn);
app.use(verifyLogin);

app.get('/', (req, res) => res.render('index', { title: 'myJobs - Home' }));
app.use('/list', require('./src/routes/list'));
app.use('/job', require('./src/routes/job'));
app.use('/login', require('./src/routes/login'));
app.use('/employer', require('./src/routes/employer'));
app.use('/register', require('./src/routes/register'));
app.use('/register-employer', require('./src/routes/register_employer'));
app.use('/profile', require('./src/routes/profile'));
app.use('/saved', require('./src/routes/saved'));
app.use('/applied', require('./src/routes/applied'));
app.use('/profile-employer', require('./src/routes/profile_employer'));
app.use('/posted', require('./src/routes/posted'));
app.use('/applicants', require('./src/routes/applicants'));
app.use('/create', require('./src/routes/create'));
app.use('/edit', require('./src/routes/edit'));

// change later to env variable
app.listen(5000);