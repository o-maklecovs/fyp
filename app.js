const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');

const app = express();

app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.render('index', { title: 'hello world' }));

// change later to env variable
app.listen(5000);