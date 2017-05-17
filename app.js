 // AJAX request
 const getDataFromApi = (searchTermCity, searchTermState, callback) => {
     let settings = {
         url: `https://api.wunderground.com/api/0bb3c0d8c3ed1468/conditions/q/${searchTermState}/${searchTermCity}.json`,
         format: 'json',
         type: 'GET',
         success: callback
     };
     $.ajax(settings);
 };

 // Render Results
 const displayWunderGroundData = (data) => {
     let resultElement = '';
     if (data.response) {
         // JSON object traversal
         let windSpeed = data.current_observation.wind_mph;
         let windGusts = data.current_observation.wind_gust_mph;
         let windString = data.current_observation.wind_string;
         let conditionString = data.current_observation.weather;
         let weatherIcon = data.current_observation.icon_url;
         let clearToJump = `https://scontent-dft4-2.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/14553153_176777539455544_2049394605073367040_n.jpg`;
         let clearToDrink = `https://cdn0.vox-cdn.com/thumbor/xScrnYpOjnGQN5lbP_QiE6SGvdQ=/0x69:540x474/1200x900/filters:focal(0x69:540x474)/cdn0.vox-cdn.com/uploads/chorus_image/image/48786051/Bad_Weather_Brewing_credit_FB.0.0.jpg`;

         if (windSpeed > "23" && windGusts > "23") {
             resultElement +=
                 `<div class="row">
                    <div class="col-6">
                      <div class="box">
                        <img class="clear-to-jump-img" src=${clearToJump} alt="rain" height="42" width="42">
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="box">
                        <span class="clear-to-jump-text">Think you're good to go, bro!</span>
                      </div>
                    </div>
                  </div>`;
         } else {
             resultElement +=
                 `<div class="row">
                    <div class="col-6">
                      <div class="box">
                        <img class="clear-to-drink-img" src=${clearToDrink} alt="sun" height="42" width="42">
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="box">
                        <span class="clear-to-drink-text">Better to drink on the ground and wish you were in the sky then to be in sky wishing you were on the ground :)</span>
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
