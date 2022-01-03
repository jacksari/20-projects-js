const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// show loader 
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide loading
function complete(){
    if(!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// show new quote
function newQuote(){
    loading()
    // pick a random quote from apiQuote array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    const { author, text } = quote;
    author ? authorText.textContent = quote.author : authorText.textContent = 'Unknown';
    text.length > 120 ? quoteText.classList.add('long-quote') : quoteText.classList.remove('long-quote');
    quoteText.textContent = quote.text;
    setTimeout(() => {
        complete();
    }, 500);
}

// GET quotes from api
async function getQuotes(){
    loading()
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const resp = await fetch(apiUrl);
        apiQuotes = await resp.json();
        newQuote();
    } catch (error) {
        console.log(error);
    }
}

// Tweet Quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On load
getQuotes();
//loading();