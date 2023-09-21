const express = require('express');
const app = express();
const quotesRouter = require('./quotes');
const { engine } = require('express-handlebars');
// const path = require('path');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/quotes', quotesRouter);

// template engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(PORT, ()=>{
  console.log(`Server is listening on ${PORT}`);
});
