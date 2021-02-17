const baseURL = 'http://api.airvisual.com/v2/'; //baseURL + endpoint?key=${key}
const key = '2277dd3e-931a-4647-9939-2f1975107712';
let url; //declare url

//button
const submitButton = document.querySelector('.submitButton');

//eventListener
submitButton.addEventListener('click', fetchCountry);

function fetchCountry(e) {
    e.preventDefault();

    url = baseURL + 'nearest_city?key=' + key;

    fetch(url)
        .then(function(response){
            return response.json();
        })
        .then(function(result){
            console.log(result);
        })
        .catch(error => console.log('error', error));
}

function update(term){ //this changes searches to single all caps string
    //need conditionals set up to check if there are spaces
    // term.forEach(function(letter){
    //     if (letter === ' '){

    //     }
    // })
    term = term.toUpperCase();
    term = term.split(' ');
    term = term.join('_');
}