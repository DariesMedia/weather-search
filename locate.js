$(function(){

  $(".more_stats").hide();
  $(".map").html("<img src='https://www.mapquestapi.com/staticmap/v5/map?key=G4Gpr5zmanNAyWUIii9LMavfNPVbdIy8&scalebar=true|bottom&locations=Lagos&zoom=14&type=hyb&defaultMarker=marker-sm-red-green-G&size=600,400@2x&declutter=false'  />");

  
  // Search location Function
  $( "#go" ).click(function(){

    var city = $("input").val(); // Input from the user

    if (city == ""){
      alert("Invalid Name of Place");
    }else{
      // Geocode the search string
      var searchMe = "'"+"https://www.mapquestapi.com/staticmap/v5/map?key=G4Gpr5zmanNAyWUIii9LMavfNPVbdIy8&scalebar=true|bottom&locations="+city+"&zoom=14&type=hyb&defaultMarker=marker-sm-red-green-G&size=600,400@2x&declutter=false"+"'";

      // Getting a static map image by embeding into mapquest api query
      $(".map").html('"<img src='+ searchMe+'  />"');

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
        var fahrenheit = (celsius * 9/5) + 32;

        // Adding weather variables in html 
        $("#interest").text("Place of Interest: "+city);
        $("#weatherC").text("The weather condition is "+ weatherCondition);
        $("#temperature").text("Temperature: "+ temperature+"K");
        $("#pressure").text("Pressure: "+ pressure+"hPa");
        $("#windspeed").text("Wind speed: "+ windSpeed +"meter/sec"+ " at " + windDeg+"deg");
        $("#humidity").text("Humidity: "+ humidity+"%");
        // Function Converting celsius to fahrenheit
        $("#fahrenheit").click(function(){
          $(this).text("Temperature: "+ fahrenheit+"F");
          $(this).css({
            backgroundColor: "blue",
          });
        });
        // Function Converting temperature to celsius
        $("#celsius").click(function(){
          $(this).text("Temperature: "+ celsius+"C");
          $(this).css({
            backgroundColor: "blue",
          });
        });
      }).done(function() {
          console.log("Success");
        }); 
      // End of Weather api request
      $(".more_stats").show();
    }
  });  
  // End of search location function 

  $("header nav ul li:nth-child(2) a").click(function(){
    $("html, body").delay(500).animate({
      scrollTop: $("#resultsC").offset().top 
  }, 500);
  });

  $("header nav ul li:nth-child(4) a").click(function(){
    $("html, body").delay(500).animate({
      scrollTop: $("#aboutus").offset().top
  }, 500);
  });

});
