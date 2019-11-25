let model;
  


async function loadModel() {

    console.log('Loading model');
    model = await tf.loadLayersModel('model/model.json')
    console.log('Model Loaded');
    console.log(model);
}

function getTokens(url) {
    let urlTokens = url.split(/[, \-?:./]+/);

    urlTokens = [...new Set(urlTokens)];
    urlTokens = urlTokens.filter(word => word != 'com');

    return urlTokens;
}

let tokenCounts;
let tokenList;
let tokenIndex;
let tfifd_vector;


const url = chrome.runtime.getURL('model/tokenInfo.json');


fetch(url)
    .then((response) => response.json()) //assuming file contains json
    .then((json) => {
        console.log( "File loaded");
        tokenCounts = json.counts;
        tokenList = json.tokens;
        tokenIndex = json.indexes;

        tfifd_vector = TfIdfVectorizer('http://facebook.com', tokenList, tokenCounts);
        console.log(tfifd_vector);

        loadModel().then(
            () => {
                console.log('Model loaded')
            });
        alert('Everything completed')
    });




function TfIdfVectorizer(url, tokenList, tokenCounts) {
    
    let token; 
    let urlTokens = getTokens(url);
    let numDocs = 420464;
    
    let vector = Array(tokenList.length).fill(0);
    
    for (token of urlTokens) {
        if (token in tokenCounts) {
            console.log('Token found')

            let tf = urlTokens.filter(x => x === token).length / (urlTokens.length);
            let idf = Math.log(numDocs)/(tokenCounts[token]);
            let tfidf = tf*idf;

            idx = tokenIndex[token];
            
            console.log(token + ' has index ' + idx);

            vector[idx] = tfidf;

        } else {
            console.log(token + ' :not found')
        }
    }

    return vector;
}