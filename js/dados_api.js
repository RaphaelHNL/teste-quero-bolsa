fetch("./js/db.json", { method: "get" })
        .then(response => response.json())
        .then(data => { return Object.keys(res = data.message).map(k => k) }

        )