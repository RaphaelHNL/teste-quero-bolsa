
var myInit = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
    mode: 'cors',
    cache: 'default'
};

let myRequest = new Request("./js/dados/db.json", myInit);

fetch(myRequest)
    .then(response => response.json())
    .then(data => console.log(data[0]));


    