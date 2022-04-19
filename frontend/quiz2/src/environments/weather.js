
$(document).ready(function () {
    var i = 0;
    $("#lastWeather").click(async function () {
      $.ajax({
        type: 'get',
        url: 'http://localhost:3000/index',
        async: true,
        dataType: 'json',
        success: function (data) {
          var content = data[i];
          var day = i + 1;
          var line = "<p>Weather Report: Day " + day + "</p><p>Current Temperature: " + content["temp_f"] + "&#x2109; (" + content["temp_c"] + "&#x2103;)</p><p>Wind speed: " + content["wind_mph"] + " mph (" + content["wind_kph"] + " kph) </p><p>Feels like: " + content["feelslike_f"] + "&#x2109; (" + content["feelslike_c"] + "&#x2103;)</p>";
          $("#result").empty();
          $("#result").append(line);
          if (i + 1 < data.length) {
            i = i + 1;
          }
          console.log(data);
        }
      })
    });
  
    $("#updateWeather").click(async function () {
      var location = $("#locationText").val();
      var url = 'http://localhost:3000/v1/location?location=' + location;
      $.getJSON(url, function (json) {
      });
    });
  
    $("#clrBtn").click(async function () {
      i = 0;
      $("#result").empty();
    });
  
    // $("#getweather").click(async function () {
    //   var postal = $("#code").val();
    //   weather(postal);
    // });
  
  })