const express = require('express');
let { quotes } = require('./data');
const { getRandomElement, getIndexById } = require('./utils');

const quotesRouter = express.Router();
// Home page
quotesRouter.get('/', (req, res) => {
    res.render('home', {style: 'styles.css'});
});

// Show all/show person quote page -get all quotes (check query, fetch by person/id/quote)
// could update to /api/quotes/:person
quotesRouter.get('/all', (req, res)=>{
  let targetQuotesArr = [];
  quotes.forEach((obj)=>{
    targetQuotesArr.push(obj);
  })
  const response = {quotes: targetQuotesArr};
  res.send(response);
})

quotesRouter.get('/all/:person', (req, res)=>{
  console.log('person route passed')
  let targetQuotesArr = [];
  const author = req.params.person
  quotes.forEach((obj)=>{
    if(obj.person === author){
      targetQuotesArr.push(obj);
    }
  })
  const response = {quotes: targetQuotesArr};
  res.send(response);
})

// Show Random page - get random quote
quotesRouter.get('/random', (req, res)=>{
  console.log('random route passed')
  const randomQuote = getRandomElement(quotes);
  const response = {quote: randomQuote};
  res.send(response);
})

// New page
quotesRouter.get('/new', (req, res)=>{
  res.render('new', {
    style: 'styles.css',
    quote: {
      id: null,
      quote: "",
      person: ""
    },
    method: "POST",
    title: "Create a New Quote",
    url: "/api/quotes/new",
    submit: "Create Your Quote"
  })
});

// Create action - create new quote now with id too
quotesRouter.post('/new', (req, res)=>{
  const query = req.body;
  const quoteExists = Object.keys(query).includes('quote');
  const personExists = Object.keys(query).includes('person');
  if(quoteExists && personExists){
    const lastQuoteObj = quotes[quotes.length - 1];
    const newId = lastQuoteObj.id + 1
    let newQuoteObj = {
      id: newId,
      quote: query.quote,
      person: query.person
    }
    quotes.push(newQuoteObj)
    res.redirect('/api/quotes');
  }else{
    res.status(400).send();
  }
})

// Edit page - returns single quote obj
quotesRouter.get('/:id', (req, res)=>{
  const id = req.params.id;
  const targetIndex = getIndexById(id, quotes);
  if(targetIndex !== null){
    res.render('edit', {
      quote: quotes[targetIndex],
      style: "styles.css"
    });
  }else{
    res.status(404).send();
  }
});

// Update action
quotesRouter.put('/:id', (req, res)=>{
  const id = req.params.id;
  const targetIndex = getIndexById(id, quotes);
  const updateData = req.body;
  if(targetIndex !== null && updateData){
    const oldData = quotes[targetIndex];
    quotes[targetIndex] = {...oldData, ...updateData}
    res.render('home', {
      quote: quotes[targetIndex],
      style: 'styles.css'
    })
  }else{
    res.status(404).send();
  }
})

// Delete action
quotesRouter.delete('/:id', (req, res)=>{
  const id = req.params.id;
  const targetIndex = getIndexById(id, quotes);
  if(targetIndex){
    quotes.splice(targetIndex, 1);
    res.send(quotes);
  }else{
    res.status(404).send();
  }
});

module.exports = quotesRouter;
