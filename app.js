 // AJAX request
const getDataFromApi = (searchTermCity, searchTermState, callback) => {
    let settings = {
        url: `http://api.wunderground.com/api/0bb3c0d8c3ed1468/forecast/q/${searchTermState}/${searchTermCity}.json`,
        format: 'json',
        type: 'GET',
        success: callback
    };
    $.ajax(settings);
};

// Render Results
const displayWunderGroundData = (data) => {
    let resultElement = '';
    if (data.forecast) {
        // JSON object traversal
        let wunderObject = data.forecast.txt_forecast.forecastday[0].icon;
        let currentIcon = data.forecast.txt_forecast.forecastday[0].icon_url;
        let currentForecast = data.forecast.txt_forecast.forecastday[0].fcttext;

        // Check if wunderground set a raining icon
        if (wunderObject === "rain" || wunderObject === "tstorms") {
            resultElement +=
                `<img src=${currentIcon} alt="rain" height="42" width="42">
                <br>${currentForecast}
                <br>IF IT ISN'T ALREADY RAINING ON YOU TODAY, IT WILL BE SOON :)`;
        } else {
            resultElement +=
                `<img src=${currentIcon} alt="sun" height="42" width="42">
                <br>${currentForecast}
                <br>ITS NOT RAINING ON YOU TODAY....YET :(`;
        }
    } else {
        alert("Sorry, please check the city and state fields and try again");
    }
    $('.js-results').html(resultElement);
};

// Event listener for 'submit' button
const watchSubmit = () => {
    $('.js-search-form').submit((e) => {
        e.preventDefault();
        let queryCity = $('.js-search-form').find('.js-query-city').val().replace(/ /g, "_");
        let queryState = $('.js-search-form').find('.js-query-state').val();
        getDataFromApi(queryCity, queryState, displayWunderGroundData);
    });
};

// Document.ready equivalent
$(() => {
    watchSubmit();
});
