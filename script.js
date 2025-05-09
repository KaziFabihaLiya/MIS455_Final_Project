function searchCountry() {
    const countryName = document.getElementById('countrySearch').value;
    var url = `https://restcountries.com/v3.1/name/${countryName}`;

    fetch(url)
        .then(response => response.json())
        .then(data => process(data))
        .catch(error => {
            var oldContent = document.getElementById("countriesGrid");
            oldContent.textContent = "Error fetching country data: " + error.message;
        });
}

function process(data) {
    var oldContent = document.getElementById("countriesGrid");
    oldContent.textContent = "";
    data.forEach(country => {
        var currencies = country.currencies ? Object.values(country.currencies).map(c => c.name).join(", ") : "N/A";
        var capital = country.capital ? country.capital.join(", ") : "N/A";
        var flagUrl = country.flags && country.flags.png ? country.flags.png : "";
        var languages = country.languages ? Object.values(country.languages).join(", ") : "N/A";
        var population = country.population ? country.population.toLocaleString() : "N/A";
        var area = country.area ? country.area.toLocaleString() + " km²" : "N/A";
        var timezones = country.timezones ? country.timezones.join(", ") : "N/A";
        var newDiv = document.createElement("div");
        newDiv.innerHTML = `
            Country Name: ${country.name.common} <br>
            Currencies: ${currencies} <br>
            Region: ${country.region} <br>
            Capital: ${capital} <br>
            Population: ${population} <br>
            Area: ${area} <br>
            Timezones: ${timezones} <br>
            Flag: <br><img src="${flagUrl}" alt="Flag of ${country.name.common}" width="100"><br>
            Languages: ${languages}
        `;
        oldContent.appendChild(newDiv);
    });
}
