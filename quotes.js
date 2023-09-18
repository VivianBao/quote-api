const express = require('express');
const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const quotesRouter = express.Router();

// get all quotes (if there's query, fetch by person)
quotesRouter.get('/', (req, res)=>{
  let targetQuotesArr = [];
  const queryExists = Object.keys(req.query).length > 0
  if(queryExists){
    const person = req.query.person;
    quotes.forEach((obj)=>{
      if(obj.person === person){
        targetQuotesArr.push(obj);
      }
    })
  }else{
    quotes.forEach((obj)=>{
      targetQuotesArr.push(obj);
    })
  }
  const response = {quotes: targetQuotesArr};
  res.send(response);
})

// get random quote
quotesRouter.get('/random', (req, res)=>{
  const randomQuote = getRandomElement(quotes);
  const response = {quote: randomQuote};
  res.send(response);
})

// create new quote
quotesRouter.post('/', (req, res)=>{
  const query = req.query;
  const quoteExists = Object.keys(query).includes('quote');
  const personExists = Object.keys(query).includes('person');
  if(quoteExists && personExists){
    let newQuoteObj = {
      quote: query.quote,
      person: query.person
    }
    quotes.push(newQuoteObj)
    let response = {
      quote: newQuoteObj
    };
    res.send(response);
  }else{
    res.status(400).send();
  }
})

// update quote
// find quote by id and update


// delete quote
quotesRouter.delete('/', (req, res)=>{
  // should return an array of quote obj
})

module.exports = quotesRouter;
