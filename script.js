function escapeHtml(text) {
    var map = {
        '&': '&amp;',
        '<': '<',
        '>': '>',
        '\"': '"',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

function showWelcomeMessage() {
    var oldContent = document.getElementById("countriesGrid");
    oldContent.innerHTML = '<div style="font-size: 1.2em; padding: 20px; text-align: center;">Welcome to Country Search Engine, Hope you are having a nice day &#128516;</div>';
}

function searchCountry() {
    var oldContent = document.getElementById("countriesGrid");
    oldContent.textContent = ""; // Clear welcome message on search start
    const countryName = document.getElementById('countrySearch').value;
    var url = `https://restcountries.com/v3.1/name/${countryName}`;

    fetch(url)
        .then(response =>  response.json())
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
            <div class="country-info-text">
                <strong>Country Name:</strong> ${country.name.common}<br>
                <strong>Currencies:</strong> ${currencies}<br>
                <strong>Region:</strong> ${country.region}<br>
                <strong>Capital:</strong> ${capital}<br>
                <strong>Population:</strong> ${population}<br>
                <strong>Area:</strong> ${area}<br>
                <strong>Timezones:</strong> ${timezones}<br>
                <strong>Languages:</strong> ${languages}
            </div>
            ${country.name.common}'s Flag <br> <img src="${flagUrl}" alt="Flag of ${country.name.common}">
        `;
        oldContent.appendChild(newDiv);
    });
}

// Show welcome message on page load
window.onload = function() {
    showWelcomeMessage();
};
