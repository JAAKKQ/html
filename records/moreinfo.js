fetch("../records.json")
    .then((response) => response.json())
    .then((records) => {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');

        const record = records.find((record) => record.result.id === parseInt(id));
        console.log(record);
        document.getElementById("record-title").innerHTML = `${record.result.country} (${record.result.year})`;
        document.getElementById("record-year").innerHTML = `Genre: ${record.result.genre.join(', ')}`;
        document.getElementById("record-genre").innerHTML = `Style: ${record.result.style.join(', ')}`;
        document.getElementById("record-format").innerHTML = `Format: ${record.result.format.join(', ')}`;
        document.getElementById("record-label").innerHTML = `Label: ${record.result.label.join(', ')}`;
        let songsHTML = '';
        for (let song of record.songs) {
            const { title, duration } = song;
            songsHTML += `<li> ${title} ${duration} min</li>`;
        }
        document.getElementById("record-songs").innerHTML = songsHTML;

        document.getElementById("record-prices").innerHTML = Object.entries(result.price).map(([key, value]) => {
            if (value && value.value) {
                return `<li>${key}: ${Number(value.value).toFixed(2)} ${value.currency}</li>`
            } else {
                return `<li>${key}: N/A</li>`
            }
        });

    });



const backButton = document.getElementById("back-button");
backButton.addEventListener("click", () => {
    window.location.href = "index.html";
});
