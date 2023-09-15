const express = require('express');
const { quotes } = require('./data');

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


module.exports = quotesRouter;
