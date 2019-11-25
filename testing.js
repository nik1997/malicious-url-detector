// async function asyncCall() {
//     console.log('calling');
//     var result = await resolveAfter2Seconds();
//     console.log(result);
//     // expected output: 'resolved'
//   }

let model;
  
async function loadingModel() {
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

$.getJSON( "model/tokenInfo.json", function( json ) {
    console.log( "File loaded");
    tokenCounts = json.counts;
    tokenList = json.tokens;
    tokenIndex = json.indexes;

    tfifd_vector = TfIdfVectorizer('http://facebook.com', tokenList, tokenCounts);
    console.log(tfifd);
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



// TfIdfVectorizer('http://facebook.com');

// def getTokens(input):
// 	tokensBySlash = str(input.encode('utf-8')).split('/')	#get tokens after splitting by slash
// 	allTokens = []
// 	for i in tokensBySlash:
// 		tokens = str(i).split('-')	#get tokens after splitting by dash
// 		tokensByDot = []
// 		for j in range(0,len(tokens)):
// 			tempTokens = str(tokens[j]).split('.')	#get tokens after splitting by dot
// 			tokensByDot = tokensByDot + tempTokens
// 		allTokens = allTokens + tokens + tokensByDot
// 	allTokens = list(set(allTokens))	#remove redundant tokens
// 	if 'com' in allTokens:
// 		allTokens.remove('com')	#removing .com since it occurs a lot of times and it should not be included in our features
// 	return allTokens






// var test = $.getJSON(test.json); var jsontest = JSON.parse(test);
// var jsonObj = JSON.parse(fileContent)
// // console.log('Model Loaded');

// loadingModel();