const fetchButton = document.getElementById('find-quote');
const foundQuoteContainer = document.getElementById('found-quote');


// find quote(s) --> endpoint fetch an array of quote obj
fetchButton.addEventListener('click', () => {
  const query = {
    // id: document.getElementById('delete-id')?.value,
    // quote: document.getElementById('delete-quote')?.value,
    person: document.getElementById('delete-person')?.value
  };
  // add values (if exist) to query bug: multiple query
  let queryString = '';
  Object.keys(query).forEach((keyName)=> {
    if(query[keyName]){
      queryString = queryString.concat(`${keyName}=${query[keyName]}`);
    };
  });
  // get with query endpoint
  fetch(`/api/quotes?${queryString}`)
  .then(response => response.json())
  // get an array of quote obj
  .then((res) => {
    console.log(res);
    res.quotes.forEach((quote)=>{
      const foundQuote = document.createElement('div');
      foundQuote.innerHTML = `
      <h3>Select the quote you want to delete:</h3>
      <div class="quote-text">${quote.quote}</div>
      <div class="attribution">- ${quote.person}</div>
      <button class="delete-quote">Delete Quote</button>
      `
      foundQuoteContainer.appendChild(foundQuote);
      // const deleteButton = document.getElementById('delete-quote');
      // add event listener for delete
      // deleteQuote(quote.id);
    });
  });
});

const deleteQuote = (id) => {
  deleteButton.addEventListener('click', () => {
    fetch(`/api/quotes?id=${id}`, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(({quote}) => {
      foundQuoteContainer.innerHTML = '';
      const deleteMsg = document.createElement('div');
      deleteMsg.innerHTML = "<p>Quote removed!</p>";
      foundQuoteContainer.appendChild(deleteMsg);
    })
  })
}
