 $(document).ready(function() {
 	var temperatures = [];
 	var icons = [];
 	var now = new Date();
 	window.onload = getLocation();
 	window.onload = setTimeGradient(now.getHours());
 	window.onload = $('#slider').val(0);


 	//set gradient opacity for time of day
 	function setTimeGradient(hours) {

 		var bgid;
 		hrs = hours;
 		$('#time').text(timeProcesser(hrs));



 		if (localStorage.getItem("firstTime") === null) {
 			bgid = "";
 			localStorage.setItem("firstTime", "1");
 		} else {
 			bgid = localStorage.getItem("bgid");
 		}



 		if (hrs == 12 || hrs == 36) {

 			$('.backgroundHolder').removeClass('backgroundHolder').addClass('backgroundHolder').prop('id', 'bg1');
 			localStorage.setItem("bgid", "bg1");

 		}
 		if (hrs == 11 || hrs == 13 || hrs == 35 || hrs == 39) {

 			$('.backgroundHolder').removeClass('backgroundHolder').addClass('backgroundHolder').prop('id', 'bg2');
 			localStorage.setItem("bgid", "bg2");
 		}
 		if (hrs == 10 || hrs == 14 || hrs == 34 || hrs == 38) {
 			$('.backgroundHolder').removeClass('backgroundHolder').addClass('backgroundHolder').prop('id', 'bg3');
 			localStorage.setItem("bgid", "bg3");
 		}
 		if (hrs == 9 || hrs == 15 || hrs == 33 || hrs == 39) {
 			$('.backgroundHolder').removeClass('backgroundHolder').addClass('backgroundHolder').prop('id', 'bg4');
 			localStorage.setItem("bgid", "bg4");
 		}
 		if (hrs == 8 || hrs == 16 || hrs == 32 || hrs == 40) {
 			$('.backgroundHolder').removeClass('backgroundHolder').addClass('backgroundHolder').prop('id', 'bg5');
 			localStorage.setItem("bgid", "bg5");
 		}
 		if (hrs == 7 || hrs == 17 || hrs == 31 || hrs == 41) {
 			$('.backgroundHolder').removeClass('backgroundHolder').addClass('backgroundHolder').prop('id', 'bg6');
 			localStorage.setItem("bgid", "bg6");
 		}
 		if (hrs == 6 || hrs == 18 || hrs == 30 || hrs == 42) {
 			$('.backgroundHolder').removeClass('backgroundHolder').addClass('backgroundHolder').prop('id', 'bg7');
 			localStorage.setItem("bgid", "bg7");
 		}
 		if (hrs == 5 || hrs == 19 || hrs == 29 || hrs == 43) {
 			$('.backgroundHolder').removeClass('backgroundHolder').addClass('backgroundHolder').prop('id', 'bg8');
 			localStorage.setItem("bgid", "bg8");
 		}
 		if (hrs == 4 || hrs == 20 || hrs == 28 || hrs == 44) {
 			$('.backgroundHolder').removeClass('backgroundHolder').addClass('backgroundHolder').prop('id', 'bg9');
 			localStorage.setItem("bgid", "bg9");
 		}
 		if (hrs == 3 || hrs == 21 || hrs == 27 || hrs == 45) {
 			$('.backgroundHolder').removeClass('backgroundHolder').addClass('backgroundHolder').prop('id', 'bg10');
 			localStorage.setItem("bgid", "bg10");

 		}
 		if (hrs == 2 || hrs == 22 || hrs == 26 || hrs == 46) {
 			$('.backgroundHolder').removeClass('backgroundHolder').addClass('backgroundHolder').prop('id', 'bg11');
 			localStorage.setItem("bgid", "bg11");
 		}
 		if (hrs == 1 || hrs == 23 || hrs == 25 || hrs == 47) {
 			$('.backgroundHolder').removeClass('backgroundHolder').addClass('backgroundHolder').prop('id', 'bg12');
 			localStorage.setItem("bgid", "bg12");
 		}
 		if (hrs === 0 || hrs == 24 || hrs == 48) {
 			$('.backgroundHolder').removeClass('backgroundHolder').addClass('backgroundHolder').prop('id', 'bg13');
 			localStorage.setItem("bgid", "bg13");
 		}

 	}





 	///get location automatically and get weather
 	function getLocation() {
		console.log("getLocation");

 		if (navigator.geolocation) {
 			navigator.geolocation.getCurrentPosition(getWeather);
 		}
 	}





 	navigator.geolocation.watchPosition(function(position) {

 		},
 		function(error) {
 			if (error.code == error.PERMISSION_DENIED)
 				$('#fetch').css({
 					"visibility": "visible"
 				});
 		});







 	function getWeather(position) {

 		//if location is obtained, turn on css display elements
 		$('#degrees').css({
 			"visibility": "visible"
 		});
 		$('#slider1').css({
 			"visibility": "visible"
 		});
 		$('#time').css({
 			"visibility": "visible"
 		});
 		$('.tempColorHolder').css({
 			"visibility": "visible"
 		});

 		var ForecastIO = require(['forecast.io'], function(ForecastIO) {
 			var currentTemp;
 			var lat = position.coords.latitude;
 			var longi = position.coords.longitude;


 			var locations = [{
 					latitude: lat,
 					longitude: longi
 				},

 			];


 			//GET HOURLY CONDITIONS FOR TODAY

 			var forecast = new ForecastIO({
 				PROXY_SCRIPT: 'proxy.php'
 			});


 			forecast.getForecastToday(locations, function(conditions) {

 				//make value arrays for temp and icon

 				//build values for hours already passed
 				for (i = 0; i <= 23 - conditions.length; i++) {
 					temperatures.push(conditions[0].getTemperature());
 				}

 				for (i = 0; i < conditions.length; i++) {
 					temperatures.push(conditions[i].getTemperature());
 				}

 				//build values for hours already passed
 				for (i = 0; i <= 23 - conditions.length; i++) {
 					icons.push(conditions[0].getIcon());
 				}

 				for (i = 0; i < conditions.length; i++) {
 					icons.push(conditions[i].getIcon());
 				}


 				currentTemp = conditions[0].getTemperature();
 				icon = conditions[0].getIcon();

 				setTempColor(Math.round(currentTemp));
 				setCurrentIcon(icon);

 			});
 		});

 	}


 	///code for slider


 	$('input[id="slider"]').change(function() {

 		var adjustedTime = getAdjustedTime($('#slider').val());

 		setTimeGradient(adjustedTime);
 		setTempColor(temperatures[$('#slider').val()]);
 		setCurrentIcon(icons[$('#slider').val()]);

 	});

 	


 	function setCurrentIcon(icon) {
 		iconString = icon + "";
 		$('#icon').html('<img src="images/' + iconString + '.png">');

 	}

 	//set font color to black or white so it stands out better vs light or dark backgrounds
 	function setTempColor(currentTemp) {
 		temperature = Math.round(currentTemp);

 		if (temperature > 30) {
 			$('#temperature').css({
 				"color": "#fff"
 			})
 			$('#time').css({
 				"color": "#fff"
 			})
 			$('#degrees').css({
 				"color": "#fff"
 			})
 		}

 		$('#temperature').html("<p>" + temperature + "</p>");

 		var hexBg;

 		if (temperature > 2) {
 			hexBg = "05005C"
 		}
 		if (temperature > 4) {
 			hexBg = "07025F"
 		}
 		if (temperature > 6) {
 			hexBg = "090562"
 		}
 		if (temperature > 8) {
 			hexBg = "0B0865"
 		}
 		if (temperature > 10) {
 			hexBg = "0E0A69"
 		}
 		if (temperature > 12) {
 			hexBg = "100D6C"
 		}
 		if (temperature > 14) {
 			hexBg = "12106F"
 		}
 		if (temperature > 16) {
 			hexBg = "151373"
 		}
 		if (temperature > 18) {
 			hexBg = "171576"
 		}
 		if (temperature > 20) {
 			hexBg = "191879"
 		}
 		if (temperature > 22) {
 			hexBg = "1B1B7D"
 		}
 		if (temperature > 24) {
 			hexBg = "202083"
 		}
 		if (temperature > 26) {
 			hexBg = "222387"
 		}
 		if (temperature > 28) {
 			hexBg = "25268A"
 		}
 		if (temperature > 30) {
 			hexBg = "27298D"
 		}
 		if (temperature > 32) {
 			hexBg = "292B91"
 		}
 		if (temperature > 34) {
 			hexBg = "2B2E94"
 		}
 		if (temperature > 36) {
 			hexBg = "2E3197"
 		}
 		if (temperature > 38) {
 			hexBg = "30339B"
 		}
 		if (temperature > 40) {
 			hexBg = "32369E"
 		}
 		if (temperature > 42) {
 			hexBg = "3539A1"
 		}
 		if (temperature > 44) {
 			hexBg = "373CA5"
 		}
 		if (temperature > 46) {
 			hexBg = "393EA8"
 		}
 		if (temperature > 48) {
 			hexBg = "3B41AB"
 		}
 		if (temperature > 50) {
 			hexBg = "3E44AF"
 		}
 		if (temperature > 52) {
 			hexBg = "4047B2"
 		}
 		if (temperature > 54) {
 			hexBg = "4249B5"
 		}
 		if (temperature > 56) {
 			hexBg = "454CB9"
 		}
 		if (temperature > 58) {
 			hexBg = "474FBC"
 		}
 		if (temperature > 60) {
 			hexBg = "4952BF"
 		}
 		if (temperature > 62) {
 			hexBg = "4B54C3"
 		}
 		if (temperature > 64) {
 			hexBg = "4E57C6"
 		}
 		if (temperature > 66) {
 			hexBg = "505AC9"
 		}
 		if (temperature > 68) {
 			hexBg = "525CCD"
 		}
 		if (temperature > 70) {
 			hexBg = "555FD0"
 		}
 		if (temperature > 72) {
 			hexBg = "5762D3"
 		}
 		if (temperature > 74) {
 			hexBg = "5965D7"
 		}
 		if (temperature > 76) {
 			hexBg = "5B67DA"
 		}
 		if (temperature > 78) {
 			hexBg = "5E6ADD"
 		}
 		if (temperature > 80) {
 			hexBg = "606DE1"
 		}
 		if (temperature > 82) {
 			hexBg = "6270E4"
 		}
 		if (temperature > 85) {
 			hexBg = "6572E7"
 		}
 		if (temperature > 89) {
 			hexBg = "6775EB"
 		}
 		if (temperature > 92) {
 			hexBg = "6978EE"
 		}
 		if (temperature > 94) {
 			hexBg = "6B7BF1"
 		}
 		if (temperature > 96) {
 			hexBg = "6E7DF5"
 		}
 		if (temperature > 98) {
 			hexBg = "7080F8"
 		}
 		if (temperature > 100) {
 			hexBg = "7283FB"
 		}

 		$(".tempColorHolder").css({
 			"background-color": "#" + hexBg
 		});

 	}

 	function timeProcesser(number) {
 		var formatted = "";

 		if (number == 12 || number == 36) {
 			formatted = "Noon"
 			return formatted;

 		}
 		if (number === 0 || number == 24) {
 			formatted = "Midnight"
 			return formatted;

 		}

 		if (number < 12) {
 			formatted = (number) + ":00 AM"
 		}
 		if (number > 12) {
 			formatted = (number - 12) + ":00 PM"
 		}
 		if (number > 24) {
 			formatted = (number - 24) + ":00 AM"
 		}
 		if (number > 36) {
 			formatted = (number - 36) + ":00 PM"
 		}



 		return formatted;
 	}


 	function getAdjustedTime(sliderValue) {
 		var now = new Date();
 		var baseHour = now.getHours();

 		var adjustedHour = parseInt(baseHour) + parseInt(sliderValue);
 		return adjustedHour;
 	}

 });