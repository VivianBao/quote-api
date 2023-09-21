const express = require('express');
const methodOverride = require('method-override');
const app = express();
const quotesRouter = require('./quotes');
const { engine } = require('express-handlebars');

const PORT = process.env.PORT || 4001;

// set up static files reading
app.use(express.static('public'));

// override with POST having ?_method=DELETE or ?_method=PUT
//reminder: put before routes
app.use(methodOverride("_method"));

// INITIALIZE BODY-PARSER AND ADD IT TO APP
//reminder: put before routes
const bodyParser = require('body-parser');

// The following line must appear AFTER const app = express() and before your routes!
app.use(bodyParser.urlencoded({ extended: true }));

// set up template engine-handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// set up routes
app.use('/api/quotes', quotesRouter);

app.get('/', (req, res) => {
    res.render('home', {style: 'styles.css'});
});


app.listen(PORT, ()=>{
  console.log(`Server is listening on ${PORT}`);
});
