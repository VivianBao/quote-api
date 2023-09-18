const fetchButton = document.getElementById('find-quote');
const foundQuoteContainer = document.getElementById('found-quote');

// find quote(s)
fetchButton.addEventListener('click', () => {
  const query = {
    id: document.getElementById('id')?.value,
    quote: document.getElementById('quote')?.value,
    person: document.getElementById('person')?.value
  }

  // add values (if exist) to query
  let queryString = '';
  query.forEach((prop) => {
    if(prop?.value){
      queryString.concat(`${prop.id}=${prop.value}`);
    }
  })

  fetch(`/api/quotes?${queryString}`)
  .then(response => response.json())
  .then(({quote}) => {
    const foundQuote = document.createElement('div');
    foundQuote.innerHTML = `
    <h3>Select the quote you want to delete:</h3>
    <div class="quote-text">${quote.quote}</div>
    <div class="attribution">- ${quote.person}</div>
    <button class="delete-quote">Delete Quote</button>
    `
    foundQuoteContainer.appendChild(foundQuote);
  });
});

// delete quote
deleteButton.addEventListener('click', () ={

})
