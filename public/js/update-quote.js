// const updateButton = document.getElementById('update-quote');
// const updatedQuoteContainer = document.getElementById('udpated-quote-container');
// // update quote PUT action
// updateButton.addEventListener('click', () => {
//   fetch("/api/quotes/:id", {
//     method: "PUT"
//   })
//   .then(response => {
//     if (response.ok) {
//       return response.json();
//     } else {
//       renderError(response);
//     }
//   })
//   .then(data => {
//     // const updatedQuote = document.createElement('div');
//     // updatedQuote.className = 'single-quote';
//     // updatedQuote.innerHTML = `<div class="quote-text">${data.quote}</div>
//     // <div class="attribution">- ${quote.person}</div>`;
//     // updatedQuoteContainer.appendChild(updatedQuote);
//     console.log('new quote: ', data.quote)
//   })
// });
