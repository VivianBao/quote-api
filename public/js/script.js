const fetchAllButton = document.getElementById('fetch-quotes');
const fetchRandomButton = document.getElementById('fetch-random');
const fetchByAuthorButton = document.getElementById('fetch-by-author');
const quoteContainer = document.getElementById('quote-container');

const resetQuotes = () => {
  quoteContainer.innerHTML = '';
}

const renderError = response => {
  quoteContainer.innerHTML = `<p>Your request returned an error from the server: </p>
<p>Code: ${response.status}</p>
<p>${response.statusText}</p>`;
}

const renderQuotes = (quotes = []) => {
  resetQuotes();
  if (quotes.length > 0) {
    quotes.forEach(quote => {
      const singleQuoteContentHTML = `
        <div class="quote-text">${quote.quote}</div>
        <div class="attribution">- ${quote.person}</div>`
      const buttonsHTML = `
        <a class="icon" href="/api/quotes/${quote.id}"><i class="fa-regular fa-pen-to-square fa-lg"></i></a>
        <div id="open-dialog-${quote.id}" class="icon"><i class="fa-regular fa-trash-can fa-lg"></i></div>`

      // edit & delete btns
      const buttonsContainer = document.createElement('div');
      buttonsContainer.className = "buttons-container";
      buttonsContainer.innerHTML = buttonsHTML;
      // quote info
      const quoteInfoContainer = document.createElement('div');
      quoteInfoContainer.className = "quote-info-container";
      quoteInfoContainer.innerHTML = singleQuoteContentHTML;
      // add single quote
      const newQuote = document.createElement('div');
      newQuote.className = 'single-quote';
      newQuote.appendChild(quoteInfoContainer);
      newQuote.appendChild(buttonsContainer);
      quoteContainer.appendChild(newQuote);

      // add delete alert
      const deleteAlert = document.createElement('dialog');
      deleteAlert.innerHTML = `
      <div class="confirm-dialog">
      <h3>Are you sure you want to delete this quote?</h3>
      <form method="dialog">
      ${singleQuoteContentHTML}
      <div class="buttons-container">
      <button id="delete-${quote.id}">Delete</button>
      <button>Return</button>
      </div>
      </form>
      </div>`
      document.body.appendChild(deleteAlert);

      // add click event to open dialog button
      const openDialogButton = document.getElementById(`open-dialog-${quote.id}`);
      openDialogButton.addEventListener('click', ()=> {deleteAlert.show();})

      //add click event to delete button
      const deleteButton = document.getElementById(`delete-${quote.id}`);
      handleClickOnDelete(deleteButton, quote.id);
    });
  } else {
    quoteContainer.innerHTML = '<p>Your request returned no quotes.</p>';
  }
};

const successfulDeleteDialog = () => {
  const deleteDialog = document.createElement('dialog');
  deleteDialog.innerHTML = `
  <div class="success-dialog">
  <h3>Quote Deleted!</h3>
  <form method="dialog">
  <div class="buttons-container">
  <button>Ok</button>
  </div>
  </form>
  </div>`
  document.body.appendChild(deleteDialog);
  deleteDialog.show();
}

const handleClickOnDelete = (nodeElement, id) => {
  nodeElement.addEventListener('click', ()=>{
    fetch(`/api/quotes/${id}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        successfulDeleteDialog();
        resetQuotes();
        return response.json();
      } else {
        renderError(response);
      }
    })
    .then(quotes => {
      renderQuotes(quotes);
    })
  })
}

fetchAllButton.addEventListener('click', () => {
  fetch('/api/quotes/all')
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      renderError(response);
    }
  })
  .then(response => {
    renderQuotes(response.quotes);
  });
});

fetchRandomButton.addEventListener('click', () => {
  console.log('click on random')
  fetch('/api/quotes/random')
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      renderError(response);
    }
  })
  .then(response => {
    renderQuotes([response.quote]);
  });
});

fetchByAuthorButton.addEventListener('click', () => {
  const author = document.getElementById('author').value;
  fetch(`/api/quotes/all/${author}`)
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      renderError(response);
    }
  })
  .then(response => {
    renderQuotes(response.quotes);
  });
});
