 // AJAX request
 const getDataFromApi = (searchTermCity, searchTermState, callback) => {
     let settings = {
         url: `http://api.wunderground.com/api/0bb3c0d8c3ed1468/forecast/q/${searchTermState}/${searchTermCity}.json`,
         format: 'json',
         type: 'GET',
         success: callback
     };
     console.log(settings.url);
     $.ajax(settings);
 };

 // Render Results
 const displayWunderGroundData = (data) => {
     let resultElement = '';
     if (data.forecast) {

         // JSON object traversal
         console.log(data.forecast);
         let wunderObject = data.forecast.txt_forecast.forecastday[0].icon;
         let currentIcon = data.forecast.txt_forecast.forecastday[0].icon_url;
         let currentForecast = data.forecast.txt_forecast.forecastday[0].fcttext;

         // Check if wunderground set a raining icon
         if (wunderObject === "rain" || wunderObject === "tstorms") {
             resultElement +=
                 `<div class="row">
                    <div class="col-6">
                      <div class="box">
                        <img src=${currentIcon} alt="rain" height="42" width="42">
                        ${currentForecast}
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="box">
                        IF IT ISN'T ALREADY RAINING ON YOU TODAY, IT WILL BE SOON :)
                      </div>
                    </div>
                  </div>`;
         } else {
             resultElement +=
                 `<div class="row">
                    <div class="col-6">
                      <div class="box">
                        <img src=${currentIcon} alt="sun" height="42" width="42">
                        ${currentForecast}
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="box">
                        ITS NOT RAINING ON YOU TODAY....YET :(
                      </div>
                    </div>
                  </div>`;
         }
     } else {
         alert("Sorry, please check the city and state fields and try again");
     }
     $('.js-results').html(resultElement);
 };

 // Event listener for 'submit' button
 const watchSubmit = () => {
     $('.button').click((e) => {
         e.preventDefault();
         console.log('hello');
         let queryCity = $('.js-query-city').val().replace(/ /g, "_");
         let queryState = $('.js-query-state').val();
         getDataFromApi(queryCity, queryState, displayWunderGroundData);
     });
 };
 // window.addEventListener('keydown', watchSubmit);
 // Document.ready equivalent
 $(() => {
     watchSubmit();
 });
