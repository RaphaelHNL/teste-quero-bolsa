var listaBolsas = () => {
    return fetch("./dados/db.json", { method: "GET", mode: "cors" })
        .then(response => response.json())
}
