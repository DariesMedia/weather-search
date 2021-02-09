$(function(){

  $(".more_stats").hide();
  $(".map").html("<img src='https://www.mapquestapi.com/staticmap/v5/map?key=G4Gpr5zmanNAyWUIii9LMavfNPVbdIy8&scalebar=true|bottom&locations=Lagos&zoom=14&type=hyb&defaultMarker=marker-sm-red-green-G&size=600,400@2x&declutter=false'  />");

  
  // Search location Function
  $("#search").keyup(function (event) {  
    if(event.keyCode == 13) { // 13 = Enter Key
      var city = $("input").val().toUpperCase(); // Input from the user
      if (city == " "){
        
      }else{
        // Geocode the search string
        var searchMe = "'"+"https://www.mapquestapi.com/staticmap/v5/map?key=G4Gpr5zmanNAyWUIii9LMavfNPVbdIy8&scalebar=true|bottom&locations="+city+"&zoom=14&type=hyb&defaultMarker=marker-sm-red-green-G&size=600,200@2x&declutter=false"+"'";

        // Getting a static map image by embeding into mapquest api query
        $(".map").html('<img src='+ searchMe+'  />');

        // Getting Weather Parameters from api
        var jqxhr = $.getJSON( "http://api.openweathermap.org/data/2.5/weather?q="+city+"&APPID=b9f0751281511bff6a95df69b37a95bd", function(data) {

          // Varibles for all weather conditions
          var weatherCondition = data.weather[0].description;
          var temperature = data.main.temp;
          var pressure = data.main.pressure;
          var humidity = data.main.humidity;
          var windSpeed = data.wind.speed;
          var windDeg = data.wind.deg;
          var celsius = temperature - 273.15;
          celsius = Math.floor(celsius);
          var fahrenheit = (celsius * 9/5) + 32;
          fahrenheit = Math.floor(fahrenheit);

          // Adding weather variables in html 
          $("#interest").text(city + " WEATHER");
          $("#weatherC").text(weatherCondition);
          $("#temperature").text(temperature+"°K");
          $("#pressure").text(pressure+"hPa" + " Pressure");
          $("#windspeed").text(windSpeed +"meter/sec"+ " at " + windDeg+"deg" + " Wind Speed");
          $("#humidity").text(humidity+"%" + " Humidity");
          // Function Converting celsius to fahrenheit
          $("#fahrenheit").click(function(){
            $(this).text("Temperature: "+ fahrenheit+"°F");
            $(this).css({
              backgroundColor: "#0d1137",
              padding: "10px;",
              borderRadius: "10px 10px",
              color: "white",
            });
          });
          // Function Converting temperature to celsius
          $("#celsius").click(function(){
            $(this).text("Temperature: "+ celsius+"°C");
            $(this).css({
              backgroundColor: "#0d1137",
              padding: "10px;",
              borderRadius: "10px 10px",
              color: "white",
            });
          });
        }).done(function() {
            console.log("Success");
          }); 
        // End of Weather api request
        $(".more_stats").show();
      }
    }
  });  
  // End of search location function 
});
