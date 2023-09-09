let fetch_query = (url) => {
    return fetch(url, {
        method: "POST",
        headers: new Headers().append("Accept", "application/json"),
        // body: formData,
    })
        .then((res) => (res.ok ? res.json() : false))
        .then((res) => res);
};

module.exports = fetch_query;
