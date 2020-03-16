var listaBolsas = () => {
    return fetch('https://api-teste-quero-bolsa.herokuapp.com/', { method: "GET", mode: "cors" })
        .then(response => response.json())
}
