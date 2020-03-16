var listaBolsas = () => {
    return fetch("./js/dados/db.json", { method: "GET", mode: "cors" })
        .then(response => response.json())
}
