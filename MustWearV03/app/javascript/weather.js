
var widgetAPI = new Common.API.Widget();
var tvKey = new Common.API.TVKeyValue();

var Main = {

};

Main.onLoad = function() {

	// Enable key event processing
	this.enableKeys();
	widgetAPI.sendReadyEvent();
	setDefault();
};


function logout() {
	localStorage.clear();
	sessionStorage.clear();
	document.location.replace("index.html");
}

function setDefault(){
	$('#loading').show();
	getWeatherCode();
	drawLineGraph();
}
function drawLineGraph() {
	//alert("drawLineGraph()");

	var hourlyUrl = "http://api.wunderground.com/api/aea78f3b39ccafc6/hourly/lang:KR/q/autoip.json";

	$
			.ajax({
				url : hourlyUrl,
				dataType : 'json',
				type : 'get',
				success : function(data) {

					//alert('success');
					var tempArr = [];
					for ( var i = 0; i < 7; i++) {
						var hour = data.hourly_forecast[i * 2].FCTTIME.hour;
						var day = data.hourly_forecast[i * 2].FCTTIME.weekday_name;
						var date = day + " " + hour + "";

						var temp = parseFloat(data.hourly_forecast[i * 2].temp.metric);
						var ins = {
							"date" : date,
							"temp" : temp
						};
						tempArr.push(ins);
					}

					for ( var i = 0; i < tempArr.length; i++) {
						//alert((i + 1) + "---" + tempArr[i].date + " "+ tempArr[i].temp);
					}

					var lineChartData = {
						labels : [ tempArr[0].date+"시", tempArr[1].date+"시",
								tempArr[2].date+"시", tempArr[3].date+"시",
								tempArr[4].date+"시", tempArr[5].date+"시",
								tempArr[6].date+"시" ],
						datasets : [ {
							fillColor : "rgba(220,220,220,0.5)",
							strokeColor : "rgba(220,220,220,1)",
							pointColor : "rgba(220,220,220,1)",
							pointStrokeColor : "#fff",
							data : [ tempArr[0].temp, tempArr[1].temp,
									tempArr[2].temp, tempArr[3].temp,
									tempArr[4].temp, tempArr[5].temp,
									tempArr[6].temp ]
						} ]

					};

					var barOption = {

						// Boolean - If we show the scale above the chart data
						scaleOverlay : false,

						// Boolean - If we want to override with a hard coded
						// scale
						scaleOverride : false,

						// ** Required if scaleOverride is true **
						// Number - The number of steps in a hard coded scale
						scaleSteps : null,
						// Number - The value jump in the hard coded scale
						scaleStepWidth : null,
						// Number - The scale starting value
						scaleStartValue : null,

						// String - Colour of the scale line
						scaleLineColor : "rgba(0,0,0,.1)",

						// Number - Pixel width of the scale line
						scaleLineWidth : 2,

						// Boolean - Whether to show labels on the scale
						scaleShowLabels : true,

						// Interpolated JS string - can access value
						scaleLabel : "<%=value%>",

						// String - Scale label font declaration for the scale
						// label
						scaleFontFamily : "'Arial'",

						// Number - Scale label font size in pixels
						scaleFontSize : 24,

						// String - Scale label font weight style
						scaleFontStyle : "normal",

						// String - Scale label font colour
						scaleFontColor : "#000",

						// /Boolean - Whether grid lines are shown across the
						// chart
						scaleShowGridLines : true,

						// String - Colour of the grid lines
						scaleGridLineColor : "rgba(0,0,0,.2)",

						// Number - Width of the grid lines
						scaleGridLineWidth : 1,

						// Boolean - Whether the line is curved between points
						bezierCurve : false,

						// Boolean - Whether to show a dot for each point
						pointDot : true,

						// Number - Radius of each point dot in pixels
						pointDotRadius : 3,

						// Number - Pixel width of point dot stroke
						pointDotStrokeWidth : 1,

						// Boolean - Whether to show a stroke for datasets
						datasetStroke : true,

						// Number - Pixel width of dataset stroke
						datasetStrokeWidth : 2,

						// Boolean - Whether to fill the dataset with a colour
						datasetFill : false,

						// Boolean - Whether to animate the chart
						animation : true,

						// Number - Number of animation steps
						animationSteps : 60,

						// String - Animation easing effect
						animationEasing : "easeOutQuart",

						// Function - Fires when the animation is complete
						onAnimationComplete : null

					};

					var myLine = new Chart(document.getElementById("canvas")
							.getContext("2d")).Line(lineChartData, barOption);

					setCode(tempArr);
				},
				error : function() {
					//alert("ajax error");
				},
				complete:function(){
					$('#loading').hide();
				}
			});
};
function getWeatherCode() {
	//alert("getWeatherCode()");
	var conditionUrl = "http://api.wunderground.com/api/aea78f3b39ccafc6/conditions/lang:KR/q/autoip.json";

	$.ajax({
		url : conditionUrl,
		dataType : 'json',
		type : 'get',
		success : function(data) {
			//alert("success");
			var location;
			var temp;
			var wind;
			var condition = "";
			var feelsLikeTem;
			var iconUrl;

			var now = new Date();

			var nowTime = now.getFullYear()+"년"+(now.getMonth() + 1) + "월"
					+ now.getDate() + "일" + (now.getHours() + 9) + "시"
					+ now.getMinutes() + "분";
			//alert("time-" + nowTime);

			location = data.current_observation.display_location.city;
			temp = data.current_observation.temp_c;
			wind = data.current_observation.wind_kph;
			condtion = data.current_observation.weather;
			feelsLikeTem = data.current_observation.feelslike_c;
			iconUrl = data.current_observation.icon_url;

			wind = parseFloat(wind);
			wind = wind * 1000 / 3600;

			$("#temp").html(temp + "°C");
			$("#location").html(location);
			$("#time").html(nowTime + "기준");
			$("#feelsLikeTemp").html("체감온도" + feelsLikeTem + "°C");
			$("#wind").html("풍속" + wind.toFixed(2) + "m/s");
			$("#condition").html(condtion);
			$('#image').attr("src", iconUrl);

		},
		error : function() {
			//alert("ajax error");
		}
	});
};

function setCode(tempArr) {

	//alert("setCode()");
	var highTemp = parseFloat(tempArr[0].temp);
	var lowTemp = parseFloat(tempArr[0].temp);

	for ( var i = 1; i < 5; i++) {
		//alert(tempArr[i].temp);
		var tem = parseFloat(tempArr[i].temp);

		if (highTemp < tem) {
			highTemp = tem;
		} else if (lowTemp > tem) {
			lowTemp = tem;
		}
	}

	//alert("highTemp-" + highTemp + " lowTemp-" + lowTemp);
	var dayTemp = (highTemp * 0.4) + (lowTemp * 0.6);
	//alert(dayTemp);
	var weatherCode;
	if (dayTemp < -10) {
		weatherCode = 0;
	} else if (dayTemp < -5) {
		weatherCode = 1;
	} else if (dayTemp < 5) {
		weatherCode = 2;
	} else if (dayTemp < 15) {
		weatherCode = 3;
	} else if (dayTemp < 25) {
		weatherCode = 4;
	} else {
		weatherCode = 5;
	}

	localStorage.setItem("weatherCode", weatherCode);
	//alert("weatherCode is " + weatherCode);
}

Main.onUnload = function() {

};

Main.enableKeys = function() {
	document.getElementById("anchor").focus();
};

Main.keyDown = function() {
	
	//$("#sound").html("<audio src='app/sound/click.wav' autoplay></audio>");
	
	var keyCode = event.keyCode;
	//alert("Key pressed: " + keyCode);

	switch (keyCode) {
	case tvKey.KEY_RETURN:
	case tvKey.KEY_PANEL_RETURN:
		//alert("RETURN");
		
		event.preventDefault();
		break;
	case tvKey.KEY_LEFT:
		//alert("LEFT");
		break;
	case tvKey.KEY_RIGHT:
		//alert("RIGHT");
		break;
	case tvKey.KEY_UP:
		//alert("UP");
		break;
	case tvKey.KEY_DOWN:
		//alert("DOWN");
		break;
	case tvKey.KEY_ENTER:
	case tvKey.KEY_PANEL_ENTER:
		//alert("ENTER");
		document.location.href = "recommend.html";
		break;
	case tvKey.KEY_BLUE:
		//alert("BLUE");
		
		break;
	case 31:
		//alert("info");
		logout();
		break;
	default:
		//alert("Unhandled key");
		break;
	}
};
