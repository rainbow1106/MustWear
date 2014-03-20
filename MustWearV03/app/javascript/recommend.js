var widgetAPI = new Common.API.Widget();
var tvKey = new Common.API.TVKeyValue();
var position={x:0,y:0};
var sexSet =['남성','여성','공용'];
var styleSet = ['포멀','캐주얼','스포츠']; 
var topArr;
var botArr;

var Main =
{

};

Main.onLoad = function()
{
	// Enable key event processing
	this.enableKeys();
	widgetAPI.sendReadyEvent();
	getWeather();
	setDefault();
};

function getWeather(){
	
	alert("getWeather()");

	var weatheCode = localStorage.getItem('weatherCode');
	
	weatheCode = parseInt(weatheCode);
	
	switch(weatheCode){
	case 0:{
		$('#weatherInfo').html('어어어엄청 추워요 단디 입어요.');
		break;
	}
	case 1:{
		$('#weatherInfo').html('추워요.');
		break;
	}
	case 2:{
		$('#weatherInfo').html('쌀쌀해요.');
		break;
	}
	case 3:{
		$('#weatherInfo').html('포근해요');
		break;
	}
	case 4:{
		$('#weatherInfo').html('더워요.');
		break;
	}
	case 5:{
		$('#weatherInfo').html('어어어어엄청 덥습니다. ');
		break;
	}
	}
}
function getCodi(){
	alert("getCodi()");
	var sexSet = localStorage.getItem("sexSet");
	var styleSet = localStorage.getItem("styleSet");
	
	var sexSet = JSON.parse(sexSet);
	var styleSet = JSON.parse(styleSet);
	
	var sex;
	if(sexSet[0] == '남성'){
		sex = 'male';
	}else if(sexSet[0] =='여성'){
		sex = 'female';
	}else{
		sex='uni';
	}
	
	var style;
	
	if(styleSet[0] == '포멀'){
		style = 'formal';
	}else if(styleSet[0]=='캐주얼'){
		style = 'casual';
	}else{
		style = 'sports';
	}
	
	alert(sex +"   "+style);

	var url = "http://finfra.com/~tv11/recommend.php";

	$.ajax({
		url:url,
		dataType:'json',
		type:'get',
		data:{
			sex:sex,
			style:style,
			weatherCode:localStorage.getItem('weatherCode')
		},
		success:function(data){
			alert('ajax success');
			
			var topArr = data.detailTop;
			var botArr = data.detailBot;
			
			if(topArr){
				var topArr = shuffleArray(topArr);
				localStorage.setItem('topArr', JSON.stringify(topArr));
				
				$('#topName').html(topArr[0].tname);
				
				$('#topView').attr('src',topArr[0].t_url_1);
			
				sessionStorage.setItem('tid',topArr[0].tid);
				
			}else{
				
				localStorage.removeItem('topArr');
				
				sessionStorage.removeItem('tid');
				
				$('#topName').html("해당 의류가 없습니다.");
				$('#topView').attr('src','image/apple.jpg');
			
			}
			
			if(botArr){
				var botArr = shuffleArray(botArr);
				localStorage.setItem('botArr', JSON.stringify(botArr));
				
				$('#botName').html(botArr[0].bname);
				$('#botView').attr('src', botArr[0].b_url_1);
				
				sessionStorage.setItem('bid',botArr[0].bid);
				
			}else{
				localStorage.removeItem('botArr');
				sessionStorage.removeItem('bid');
				$('#botName').html("해당 의류가 없습니다.");
				$('#botView').attr('src', 'image/apple.jpg');
			}
		},
		
		error:function(xhr, ajaxOption, thrownError){
			alert(xhr.status);
			alert(thrownError);
		}
	});
}

function shuffleArray(arr){
	var newArr=[];
	var len = arr.length;
	for(var i=0; i <len; i++){
		var point = Math.floor(Math.random()*(len-i));
		var p = parseInt(point);
		newArr.push(arr[p]);
		arr.splice(p,1);
	}

	arr = newArr;
	return arr;
}
function logOut(){
	localStorage.clear();
	document.location.replace("index.html");
}
function nextItem(arr){

	alert("nextItem()");
	var tem = arr[0];
	arr.splice(0,1);
	arr.push(tem);

	return arr;
}


function moveDiv(direction){
	$(".movingDiv").css('background-color', 'rgba(255, 255, 255, 0.1)');
	if(direction == 1){
		if(position.x == 1){
			position.x = 0;
			$('#green').remove();
		}else{
			$('#red').after('<font id="green"><img class = "helpBarIcon" src="app/image/green.png">상세정보  </font>');
			position.x=1;
		}
	}else{
		if(position.y==1){
			position.y=0;
		}else{
			position.y=1;
		}
	}
	
	if(position.x==0){
		
		if(position.y==0){
			$('#sexSelector').css('background-color', 'rgba(255, 255, 255, 0.5)');
			
			alert($('#sexSelector').html());
		}else{
			
			$('#styleSelector').css('background-color', 'rgba(255, 255, 255, 0.5)');
		alert($('#styleSelector').html());
		}
	}else{
		if(position.y==0){
			$('#topContainer').css('background-color', 'rgba(255, 255, 255, 0.5)');
			alert($('#topContainer').html());
		}else{
			$('#botContainer').css('background-color', 'rgba(255, 255, 255, 0.5)');
			alert($('#botContainer').html());
		}
	}
}
Main.onUnload = function()
{

};

Main.enableKeys = function()
{
	document.getElementById("anchor").focus();
};


function setDefault(){

	
	alert('setDefault()');
	
	var sexSet = localStorage.getItem('sexSet');
	var styleSet = localStorage.getItem('styleSet');
	var topArr = localStorage.getItem('topArr');
	var botArr = localStorage.getItem('botArr');
	
	if(sexSet == null){
		sexSet =['남성','여성','공용'];
		localStorage.setItem('sexSet', JSON.stringify(sexSet));
		$('#sexSelector').html(sexSet[0]);
	}
	if(styleSet == null){
		styleSet = ['포멀','캐주얼','스포츠'];
		localStorage.setItem('styleSet',JSON.stringify(styleSet));
		$('#styleSelector').html(styleSet[0]);
	}
	
	sexSet = localStorage.getItem("sexSet");
	styleSet = localStorage.getItem("styleSet");
	
	
	sexSet = JSON.parse(sexSet);
	styleSet = JSON.parse(styleSet);
	
	
	$('#sexSelector').html(sexSet[0]);
	$('#styleSelector').html(styleSet[0]);
	var sex;
	
	if(sexSet[0] == '남성'){
		sex = 'male';
	}else if(sexSet[0] =='여성'){
		sex = 'female';
	}else{
		sex='uni';
	}
	
	var style;
	
	if(styleSet[0] == '포멀'){
		style = 'formal';
	}else if(styleSet[0]=='캐주얼'){
		style = 'casual';
	}else{
		style = 'sprots';
	}
	
	alert(sex +"   "+style);
	
	
	if( !topArr && !botArr){
		alert("첫 로그인시");
		getCodi();
	}else{
		
		
		if(topArr){
			topArr = JSON.parse(topArr);
			
			localStorage.setItem('topArr', JSON.stringify(topArr));
			
			$('#topName').html(topArr[0].tname);
			$('#topView').attr('src',topArr[0].t_url_1);
		}else{
			localStorage.removeItem('topArr');
			
			$('#topName').html("해당 의류가 없습니다.");
			$('#topView').attr('src','image/apple.jpg');
		
		}
		
		if(botArr){
			botArr = JSON.parse(botArr);
			
			localStorage.setItem('botArr', JSON.stringify(botArr));
			
			$('#botName').html(botArr[0].bname);
			$('#botView').attr('src', botArr[0].b_url_1);
		}else{
			localStorage.removeItem('botArr');
			$('#botName').html("해당 의류가 없습니다.");
			$('#botView').attr('src', 'image/apple.jpg');
		}
	}
}
Main.keyDown = function()
{
	var keyCode = event.keyCode;
	alert("Key pressed: " + keyCode);

	switch(keyCode)
	{
		case tvKey.KEY_RETURN:
			logOut();
			break;
		case tvKey.KEY_PANEL_RETURN:
			alert("RETURN");
			widgetAPI.sendReturnEvent();
			break;
		case tvKey.KEY_LEFT:
			alert("LEFT");
			moveDiv(1);
			break;
		case tvKey.KEY_RIGHT:
			alert("RIGHT");
			moveDiv(1);
			break;
		case tvKey.KEY_UP:
			alert("UP");
			moveDiv(2);
			break;
		case tvKey.KEY_DOWN:
			alert("DOWN");
			moveDiv(2);
			break;
		case tvKey.KEY_ENTER:
		case tvKey.KEY_PANEL_ENTER:
			alert("ENTER");
			if(position.x==0){
				if(position.y==0){
					sexSet = JSON.parse(localStorage.getItem('sexSet'));
					sexSet = nextItem(sexSet);
					$('#sexSelector').html(sexSet[0]);
					localStorage.setItem('sexSet',JSON.stringify(sexSet));
					getCodi();
				}else{
					styleSet = JSON.parse(localStorage.getItem('styleSet'));
					styleSet = nextItem(styleSet);
					$('#styleSelector').html(styleSet[0]);
					localStorage.setItem('styleSet',JSON.stringify(styleSet));
					getCodi();
				}
			}else{
				if(position.y==0){
					topArr = localStorage.getItem('topArr');
					if(topArr){
						topArr = JSON.parse(topArr);
						topArr = nextItem(topArr);
						
						localStorage.setItem('topArr', JSON.stringify(topArr));
						
						$('#topName').html(topArr[0].tname);
						$('#topView').attr('src',topArr[0].t_url_1);
					}
				}else{
					botArr = localStorage.getItem('botArr');
					if(botArr){
						botArr = JSON.parse(botArr);
						botArr = nextItem(botArr);
						
						localStorage.setItem('botArr', JSON.stringify(botArr));
						
						$('#botName').html(botArr[0].bname);
						$('#botView').attr('src',botArr[0].b_url_1);
					}
				}
			}
			break;
		case 22:
			alert("BLUE");
			document.location.href='closet.html';
			break;
		case 21:
			alert("YELLOW");
				
			break;
		case 108:
			alert("RED");
			document.location.href="weather.html";
			break;
		case 20:
			alert("GREEN");
			if(position.x == 1){
				if(position.y==0){
					//top detail
					if(sessionStorage.getItem('tid') != null){

						sessionStorage.setItem('flag','top');
						document.location.href="detail.html";
						
					}
				
				}else if(position.y==1){
					//bot detail
					
					if(sessionStorage.getItem('bid') != null){
						sessionStorage.setItem('flag','bot');
						document.location.href="detail.html";
						
					}
				}
			}
			break;
		default:
			alert("Unhandled key");
			break;
	}
};
