const express = require('express');
const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const quotesRouter = express.Router();

// get all quotes (check query, fetch by person/id/quote)
quotesRouter.get('/', (req, res)=>{
  let targetQuotesArr = [];
  const query = req.query;
  console.log(query);
  const queryExists = Object.keys(query).length > 0
  if(queryExists){
    // bug: will have duplicate if search with two query
    // Object.keys(query).forEach((keyName)=> {
    //   quotes.forEach((obj)=>{
    //    if(obj.keyName === query.keyName){
    //     targetQuotesArr.push(obj);
    //    }
    //   })
    // });
    quotes.forEach((obj)=>{
      if(obj.person === query.person){
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

// create new quote now with id too
quotesRouter.post('/', (req, res)=>{
  const query = req.query;
  const quoteExists = Object.keys(query).includes('quote');
  const personExists = Object.keys(query).includes('person');
  if(quoteExists && personExists){
    // find last index of quotes
    let newId = quotes.indexOf(quotes[quotes.length - 1]);
    let newQuoteObj = {
      id: newId,
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

quotesRouter.delete('/:id', (req, res)=>{
  const id = req.params.id;
  let targetIndex;
  quotes.forEach((quote, index) => {
    if(quote.id.toString() === id){
      targetIndex = index;
    }
  })
  if(targetIndex){
    quotes.splice(targetIndex, 1);
    res.status(204).send(quotes);
  }else{
    res.status(404).send();
  }
})

module.exports = quotesRouter;
