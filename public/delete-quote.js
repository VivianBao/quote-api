const findButton = document.getElementById('find-quote');
const newQuoteContainer = document.getElementById('new-quote');

findButton.addEventListener('click', () => {
  const id = document.getElementById('id').value;
  const quote = document.getElementById('quote').value;
  const person = document.getElementById('person').value;

  fetch(`/api/quotes?id=${id}&quote=${quote}&person=${person}`, {
    method: 'DELETE',
  })
  .then(response => response.json())
  // .then(({quote}) => {
  //   const foundQuote = document.createElement('div');
  //   foundQuote.innerHTML = `
  //   <h3>Select the quote you want to delete:</h3>
  //   <div class="quote-text">${quote.quote}</div>
  //   <div class="attribution">- ${quote.person}</div>
  //   <p>Go to the <a href="index.html">home page</a> to request and view all quotes.</p>
  //   `
  //   newQuoteContainer.appendChild(newQuote);
  // });
});
