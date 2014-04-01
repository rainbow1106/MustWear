var widgetAPI = new Common.API.Widget();
var tvKey = new Common.API.TVKeyValue();
var position = {
	x : 0,
	y : 0
};
var closetList = [];
var popupPosition = {
	x : 1,
	y : 2
};
var insPosition = 0;// 0:input 1:confirm 2:cancel
var sexSet = [ '남성', '여성', '공용' ];
var styleSet = [ '포멀', '캐주얼', '스포츠' ];
var topArr;
var botArr;

var preX;

var imeCsName, imeInsertCloset;

var Main = {

};

Main.onLoad = function() {
	// Enable key event processing
	this.enableKeys();
	widgetAPI.sendReadyEvent();
	getWeather();
	setDefault();

};

function ime_init_csName(imeobj) {
	var inputobj = imeobj.getInputObj();
	alert("start initializing: " + inputobj.id);
	imeobj.setQWERTYPos(290, 230); // IME XT9, new function
	alert("ID: setQWERTYPos!");

	// //////////////

	//	
	imeobj.setKeyFunc(tvKey.KEY_RETURN, function() {
		alert("IME RETURN");
		imeCsName._blur();
		$("#popupCodiName").blur();
		$('#window').css('top','50px');
		document.getElementById("anchor").focus();
	});
	// //////////

	imeobj.setKeySetFunc('qwerty');

	imeobj.setEnterFunc(function() {
		imeCsName._blur();
		$('#popupCodiName').blur();
		$('#window').css('top','50px');
		document.getElementById('anchor').focus();
	});
	imeobj.setBlockSpace(true);

	alert("ime_init_id end...");
};
function ime_ins_closet(imeobj) {
	var inputobj = imeobj.getInputObj();
	alert("start initializing: " + inputobj.id);
	imeobj.setQWERTYPos(570, 230); // IME XT9, new function
	imeobj.setKeyFunc(tvKey.KEY_RETURN, function() {
		alert("IME RETURN");
		imeInsertCloset._blur();
		$("#insCloset").blur();
		$("#insCloset").addClass("inputfocus");
		document.getElementById("anchor").focus();
	});
	imeobj.setEnterFunc(function() {
		imeInsertCloset._blur();
		$("#insCloset").blur();
		$("#insClosetBtn").addClass("focus");
		$("#insCloset").removeClass("inputfocus");
		insPosition=1;
		document.getElementById("anchor").focus();
	});
	imeobj.setKeySetFunc('qwerty');
	_g_ime.init("ko", "1_35_259_11", "KOR", "", "kr");
	alert("ime_ins_closet end...");
};

function getWeather() {

	alert("getWeather()");

	var weatheCode = localStorage.getItem('weatherCode');

	weatheCode = parseInt(weatheCode);

	switch (weatheCode) {
	case 0: {
		$('#weatherInfo').html('어어어엄청 추워요 단디 입어요.');
		break;
	}
	case 1: {
		$('#weatherInfo').html('추워요.');
		break;
	}
	case 2: {
		$('#weatherInfo').html('쌀쌀해요.');
		break;
	}
	case 3: {
		$('#weatherInfo').html('포근해요');
		break;
	}
	case 4: {
		$('#weatherInfo').html('더워요.');
		break;
	}
	case 5: {
		$('#weatherInfo').html('어어어어엄청 덥습니다. ');
		break;
	}
	}
}

function idObjKeyFunc(keyCode) {
	alert("idObjKeyFunc() start()");

	switch (keyCode) {
	case tvKey.KEY_UP: // Up Key
		alert("ID :UP KEY");
		$(idList[position]).removeClass("focus");
		position++;
		alert(position);
		$(idList[position]).addClass("focus");
		$(idList[position]).focus();
		break;

	case tvKey.KEY_DOWN: // Down Key
		alert("ID :DOWN KEY");
		$(idList[position]).removeClass("focus");
		position++;
		alert(position);
		$(idList[position]).addClass("focus");
		$(idList[position]).focus();
		break;

	case tvKey.KEY_RETURN:
	case tvKey.KEY_PANEL_RETURN: // return Key
		alert("ID :Return KEY");
		$(idList[position]).blur();
		break;
	case tvKey.KEY_YELLOW:
		alert("ID :YELLOW");
		location.replace("register.html");
		break;
	default:
		alert("Unhandled key");
		break;
	}

	alert("idObjKeyFunc() end");

	return false;
};

function getCodi() {
	alert("getCodi()");
	var sexSet = localStorage.getItem("sexSet");
	var styleSet = localStorage.getItem("styleSet");

	var sexSet = JSON.parse(sexSet);
	var styleSet = JSON.parse(styleSet);

	var sex;
	if (sexSet[0] == '남성') {
		sex = 'male';
	} else if (sexSet[0] == '여성') {
		sex = 'female';
	} else {
		sex = 'uni';
	}

	var style;

	if (styleSet[0] == '포멀') {
		style = 'formal';
	} else if (styleSet[0] == '캐주얼') {
		style = 'casual';
	} else {
		style = 'sports';
	}

	alert(sex + "   " + style);

	var url = "http://finfra.com/~tv11/recommend.php";

	$.ajax({
		url : url,
		dataType : 'json',
		type : 'get',
		data : {
			sex : sex,
			style : style,
			weatherCode : localStorage.getItem('weatherCode')
		},
		success : function(data) {
			alert('ajax success');

			var topArr = data.detailTop;
			var botArr = data.detailBot;

			if (topArr) {
				var topArr = shuffleArray(topArr);
				localStorage.setItem('topArr', JSON.stringify(topArr));

				$('#topName').html(topArr[0].tname);

				$('#topView').attr('src', topArr[0].t_url_1);

				sessionStorage.setItem('tid', topArr[0].tid);

			} else {

				localStorage.removeItem('topArr');

				sessionStorage.removeItem('tid');

				$('#topName').html("해당 의류가 없습니다.");
				$('#topView').attr('src', 'app/image/apple.jpg');

			}

			if (botArr) {
				var botArr = shuffleArray(botArr);
				localStorage.setItem('botArr', JSON.stringify(botArr));

				$('#botName').html(botArr[0].bname);
				$('#botView').attr('src', botArr[0].b_url_1);

				sessionStorage.setItem('bid', botArr[0].bid);

			} else {
				localStorage.removeItem('botArr');
				sessionStorage.removeItem('bid');
				$('#botName').html("해당 의류가 없습니다.");
				$('#botView').attr('src', 'app/image/apple.jpg');
			}
		},

		error : function(xhr, ajaxOption, thrownError) {
			alert(xhr.status);
			alert(thrownError);
		}
	});
}

function shuffleArray(arr) {
	var newArr = [];
	var len = arr.length;
	for ( var i = 0; i < len; i++) {
		var point = Math.floor(Math.random() * (len - i));
		var p = parseInt(point);
		newArr.push(arr[p]);
		arr.splice(p, 1);
	}

	arr = newArr;
	return arr;
}
function logout() {
	localStorage.clear();
	sesstionStorage.clear();
	document.location.replace("index.html");
}
function nextItem(arr) {

	alert("nextItem()");
	var tem = arr[0];
	arr.splice(0, 1);
	arr.push(tem);

	return arr;
}

function movePopup(direction) {

	alert('movePopup() start');
	alert('position is (' + popupPosition.x + ", " + popupPosition.y + ")");
	$('#input div').css('background-color', 'rgba(100,100,100,0.2)');

	switch (direction) {

	case 1: {
		popupPosition.y--;
		if (popupPosition.y == -1) {
			popupPosition.y = 2;
		}
		break;
	}
	case 2: {
		popupPosition.x++;
		if (popupPosition.x == 2) {
			popupPosition.x = 0;
		}
		break;
	}
	case 3: {
		popupPosition.y++;
		if (popupPosition.y == 3) {
			popupPosition.y = 0;
		}
		break;
	}
	case 4: {
		popupPosition.x--;
		if (popupPosition.x == -1) {
			popupPosition.x = 1;
		}
		break;
	}
	}

	switch (popupPosition.x) {
	case 0: {
		switch (popupPosition.y) {
		case 0: {
			$('#popupClosetName').css('background-color',
					'rgba(100,100,100,0.5)');
			break;
		}
		case 1: {
			$('#popupCodiNameDiv').css('background-color',
					'rgba(100,100,100,0.5)');
			break;
		}
		case 2: {
			$('#cancel').css('background-color', 'rgba(100,100,100,0.5)');
			break;
		}
		}
		break;
	}
	case 1: {
		switch (popupPosition.y) {
		case 0: {
			$('#addClosetButton').css('background-color',
					'rgba(100,100,100,0.5)');
			break;
		}
		case 1: {
			$('#popupCodiNameDiv').css('background-color',
					'rgba(100,100,100,0.5)');
			break;
		}
		case 2: {
			$('#saveCodi').css('background-color', 'rgba(100,100,100,0.5)');

			break;
		}
		}
		break;
	}

	}

}
function moveDiv(direction) {
	$(".movingDiv").css('background-color', 'rgba(255, 255, 255, 0.2)');
	if (direction == 1) {
		if (position.x == 1) {
			position.x = 0;
			$('#green').remove();
		} else {
			$('#red')
					.after(
							'<font id="green"><img class = "helpBarIcon" src="app/image/green.png">상세정보  </font>');
			position.x = 1;
		}
	} else {
		if (position.y == 1) {
			position.y = 0;
		} else {
			position.y = 1;
		}
	}

	if (position.x == 0) {

		if (position.y == 0) {
			$('#sexSelector').css('background-color',
					'rgba(255, 255, 255, 0.5)');

			alert($('#sexSelector').html());
		} else {

			$('#styleSelector').css('background-color',
					'rgba(255, 255, 255, 0.5)');
			alert($('#styleSelector').html());
		}
	} else {
		if (position.y == 0) {
			$('#topContainer').css('background-color',
					'rgba(255, 255, 255, 0.5)');
			alert($('#topContainer').html());
		} else {
			$('#botContainer').css('background-color',
					'rgba(255, 255, 255, 0.5)');
			alert($('#botContainer').html());
		}
	}
}
Main.onUnload = function() {

};

Main.enableKeys = function() {
	document.getElementById("anchor").focus();
};

function setDefault() {

	alert('setDefault() start');

	// // hide other windows

	$('#popup').hide();
	$("#confirm").hide();
	$('#window').hide();
	$('#insertCloset').hide();
	var sexSet = localStorage.getItem('sexSet');
	var styleSet = localStorage.getItem('styleSet');
	var topArr = localStorage.getItem('topArr');
	var botArr = localStorage.getItem('botArr');

	if (sexSet == null) {
		sexSet = [ '남성', '여성', '공용' ];
		localStorage.setItem('sexSet', JSON.stringify(sexSet));
		$('#sexSelector').html(sexSet[0]);
	}
	if (styleSet == null) {
		styleSet = [ '포멀', '캐주얼', '스포츠' ];
		localStorage.setItem('styleSet', JSON.stringify(styleSet));
		$('#styleSelector').html(styleSet[0]);
	}

	sexSet = localStorage.getItem("sexSet");
	styleSet = localStorage.getItem("styleSet");

	sexSet = JSON.parse(sexSet);
	styleSet = JSON.parse(styleSet);

	$('#sexSelector').html(sexSet[0]);
	$('#styleSelector').html(styleSet[0]);
	var sex;

	if (sexSet[0] == '남성') {
		sex = 'male';
	} else if (sexSet[0] == '여성') {
		sex = 'female';
	} else {
		sex = 'uni';
	}

	var style;

	if (styleSet[0] == '포멀') {
		style = 'formal';
	} else if (styleSet[0] == '캐주얼') {
		style = 'casual';
	} else {
		style = 'sprots';
	}

	alert(sex + "   " + style);

	var tid = sessionStorage.getItem('tid');
	var bid = sessionStorage.getItem('bid');

	if (tid==null && bid==null) {
		alert("첫 로그인시");
		getCodi();
	} else {

		if (topArr) {
			topArr = JSON.parse(topArr);

			localStorage.setItem('topArr', JSON.stringify(topArr));

			$('#topName').html(topArr[0].tname);
			$('#topView').attr('src', topArr[0].t_url_1);
			sessionStorage.setItem('tid', topArr[0].tid);
		} else {
			localStorage.removeItem('topArr');

			$('#topName').html("해당 의류가 없습니다.");
			$('#topView').attr('src', 'app/image/apple.jpg');
			sessionStorage.removeItem('tid');
		}

		if (botArr) {
			botArr = JSON.parse(botArr);

			localStorage.setItem('botArr', JSON.stringify(botArr));

			$('#botName').html(botArr[0].bname);
			$('#botView').attr('src', botArr[0].b_url_1);
			sessionStorage.setItem('bid', botArr[0].bid);
		} else {
			localStorage.removeItem('botArr');
			$('#botName').html("해당 의류가 없습니다.");
			$('#botView').attr('src', 'app/image/apple.jpg');
			sessionStorage.removeItem('bid');
		}
	}

	var arr = $('#selector div');
	$(arr[1]).css('background-color', 'rgba(255,255,255,0.5)');

	// //////////////////////////////////
	imeCsName = new IMEShell('popupCodiName', ime_init_csName, this);
	if (imeCsName == null) {
		alert("IME fail");
	}

	imeInsertCloset = new IMEShell("insCloset", ime_ins_closet, this);
	_g_ime.init("en", "2_35_259_12", "USA", "", "us");

	// /////////////////////////////////
	alert('setDefault() end');

}
Main.keyDown = function() {

	var keyCode = event.keyCode;
	alert("Key pressed: " + keyCode);

	switch (keyCode) {
	case tvKey.KEY_RETURN:
		if(position.x==3){
			$('#popup').hide();
			position.x=preX;
		}
		break;
	case tvKey.KEY_PANEL_RETURN:
		alert("RETURN");
		widgetAPI.sendReturnEvent();
		break;
	case tvKey.KEY_LEFT:
		alert("LEFT");
		if (position.x == 3) {
			movePopup(4);
		} else if (position.x == 5) {
			if (insPosition == 1) {
				$("#insClosetBtn").removeClass("focus");
				$("#insClosetCancle").addClass("focus");
				insPosition = 2;
			} else if (insPosition == 2) {
				$("#insClosetBtn").addClass("focus");
				$("#insClosetCancle").removeClass("focus");
				insPosition = 1;
			}
		} else {
			moveDiv(1);
		}
		break;
	case tvKey.KEY_RIGHT:
		alert("RIGHT");
		if (position.x == 3) {
			movePopup(2);
		} else if (position.x == 5) {
			if (insPosition == 1) {
				$("#insClosetBtn").removeClass("focus");
				$("#insClosetCancle").addClass("focus");
				insPosition = 2;
			} else if (insPosition == 2) {
				$("#insClosetBtn").addClass("focus");
				$("#insClosetCancle").removeClass("focus");
				insPosition = 1;
			}
		} else {
			moveDiv(1);
		}
		break;
	case tvKey.KEY_UP:
		alert("UP");
		if (position.x == 3) {
			movePopup(1);
		} else if (position.x == 5) {
			if (insPosition > 0) {
				$("#insClosetBtn").removeClass("focus");
				$("#insClosetCancle").removeClass("focus");
				$("#insCloset").addClass("inputfocus");
				insPosition=0;
			}
		} else {
			moveDiv(2);
		}
		break;
	case tvKey.KEY_DOWN:
		alert("DOWN");
		if (position.x == 3) {
			movePopup(3);
		} else if (position.x == 5) {
			if (insPosition == 0) {
				$("#insClosetBtn").addClass("focus");
				$("#insClosetCancle").removeClass("focus");
				$("#insCloset").removeClass("inputfocus");
				insPosition=1;
			}
		} else {
			moveDiv(2);
		}
		break;
	case tvKey.KEY_ENTER:
	case tvKey.KEY_PANEL_ENTER:
		alert("ENTER");
		if (position.x == 0) {
			if (position.y == 0) {
				sexSet = JSON.parse(localStorage.getItem('sexSet'));
				sexSet = nextItem(sexSet);
				$('#sexSelector').html(sexSet[0]);
				localStorage.setItem('sexSet', JSON.stringify(sexSet));
				getCodi();
			} else {
				styleSet = JSON.parse(localStorage.getItem('styleSet'));
				styleSet = nextItem(styleSet);
				$('#styleSelector').html(styleSet[0]);
				localStorage.setItem('styleSet', JSON.stringify(styleSet));
				getCodi();
			}
		} else if (position.x == 1) {
			if (position.y == 0) {
				topArr = localStorage.getItem('topArr');
				if (topArr) {
					topArr = JSON.parse(topArr);
					topArr = nextItem(topArr);

					localStorage.setItem('topArr', JSON.stringify(topArr));

					$('#topName').html(topArr[0].tname);
					$('#topView').attr('src', topArr[0].t_url_1);
					// /////////////
					sessionStorage.setItem('tid', topArr[0].tid);
					// //////////////
				}
			} else {
				botArr = localStorage.getItem('botArr');
				if (botArr) {
					botArr = JSON.parse(botArr);
					botArr = nextItem(botArr);

					localStorage.setItem('botArr', JSON.stringify(botArr));

					$('#botName').html(botArr[0].bname);
					$('#botView').attr('src', botArr[0].b_url_1);

					sessionStorage.setItem('bid', botArr[0].bid);
				}
			}
		} else if (position.x == 3) {
			// refer popupPosition
			excutePopup();
		} else if (position.x == 4) {
			$('#popup').hide();
			position.x = preX;
		} else if (position.x == 5) {
			if (insPosition == 0) {
				// focus input & IME
				
				$("#insCloset").focus();
				imeInsertCloset._focus();
				
				
			} else if (insPosition == 1) {
				// add closet 
				position.x =3;
				
				var csName = $('#insCloset').html();
				
				add_closet();
				refreshClosetList();
			

				$("#insertCloset").hide();//hide insCloset
				$("#window").show();// show window
				$("#insClosetBtn").removeClass("focus");
				$("#insClosetCancle").removeClass("focus");//reset insertCloset
				
			} else if (insPosition == 2) {
				position.x =3;
				$("#insertCloset").hide();//hide insCloset
				$("#window").show();// show window
				$("#insClosetBtn").removeClass("focus");
				$("#insClosetCancle").removeClass("focus");//reset insertCloset
			}
			insPosition=0;
		}
		break;
	case tvKey.KEY_BLUE:
		alert("BLUE");
		alert("x is "+position.x);
		if(position.x==0 || position.x == 1){
			document.location.href = 'closet.html';	
		}
		break;
	case tvKey.KEY_YELLOW:
		alert("YELLOW");

		alert("x is "+position.x);
		if(position.x==0 || position.x == 1){
			if ((sessionStorage.getItem('tid') != null) && (sessionStorage.getItem('bid') != null)) {
				saveCodi();
			}else{
				alertMsg("불 완전한 코디셋 입니다.");
			}
		}
		break;
	case tvKey.KEY_RED:
		alert("RED");

		alert("x is "+position.x);
		if(position.x==0 || position.x == 1){
			document.location.href = "weather.html";
		}
		break;
	case tvKey.KEY_GREEN:

		alert("x is "+position.x);
		alert("GREEN");
		alert(position.x + "&" + position.y);
		if (position.x == 1) {

			alert(sessionStorage.getItem('tid') + " tid!!!!!");
			alert(sessionStorage.getItem('bid') + " bid!!!!!");
			if (position.y == 0) {
				// top detail
				alert(sessionStorage.getItem('tid'));
				if (sessionStorage.getItem('tid') != null) {

					sessionStorage.setItem('flag', 'top');
					document.location.href = "detail.html";

				}else{	
					alertMsg("상의 정보가 없습니다.");
				}

			} else if (position.y == 1) {
				// bot detail
				alert(sessionStorage.getItem('bid'));
				if (sessionStorage.getItem('bid') != null) {
					sessionStorage.setItem('flag', 'bot');
					document.location.href = "detail.html";

				}else{	
					alertMsg("하의 정보가 없습니다.");
				}
			}
		}
		break;
	default:
		alert("Unhandled key");
		break;
	}
};

function refreshClosetList(){
	alert("refreshClosetList() start");
	
	
	var userId = localStorage.getItem('user');

	var url = 'http://finfra.com/~tv11/closet.php';

	$.ajax({
		async : false,
		url : url,
		dataType : 'json',
		type : 'get',
		data : {
			id : userId
		},
		success : function(data) {
			closetList = data.closet;
			
			alert('refresh ajax success!!!');
			
			if(closetList.length>0){
				
				
				
				$('#popupClosetName').html(closetList[0].cname);
				sessionStorage.setItem('cid',closetList[0].cid);
			}

		},
		error : function() {
			alert('ajax error');
		}

	});

	
	alert("refreshClosetList() end");
}

function saveCodi() {

	alert('saveCodi() start');

	preX = position.x;
	position.x = 3;

	
	$('#popup').show();
	$('#window').show();
	$('#confirm').hide();
	$('#insertCloset').hide();
	
	topArr = localStorage.getItem('topArr');
	topArr = JSON.parse(topArr);
	$('#popupTopName').html(topArr[0].tname);
	$('#popupTopView').attr('src', topArr[0].t_url_1);

	botArr = localStorage.getItem('botArr');
	botArr = JSON.parse(botArr);
	$('#popupBotName').html(botArr[0].bname);
	$('#popupBotView').attr('src', botArr[0].b_url_1);

	// find user and find user's closetList

	var userId = localStorage.getItem('user');

	var url = 'http://finfra.com/~tv11/closet.php';

	$.ajax({
		async : false,
		url : url,
		dataType : 'json',
		type : 'get',
		data : {
			id : userId
		},
		success : function(data) {
			closetList = data.closet;

			if (closetList.length > 0) {
				
				var len = closetList.length;
				var cid = sessionStorage.getItem('cid');
				if( cid != null){
					for(var i=0;i<len;i++){
						if(closetList[0].cid != cid){
							closetList = nextItem(closetList);
						}
					}
				}
				
				
				sessionStorage.setItem('cid', closetList[0].cid);
				$('#popupClosetName').html(closetList[0].cname);
				
				
			}
		},
		error : function() {
			alert('ajax error');
		}

	});

	var d = new Date();
	var str = (d.getMonth() + 1) + "월" + d.getDate() + "일" + (d.getHours() + 9)
			+ "시" + d.getMinutes() + "분의 코디";

	$('#popupCodiName').val(str);
	


	
	popupPosition.x = 0;
	popupPosition.y = 2;
	
	$('#input div').css('background-color', 'rgba(100,100,100,0.2)');
	$('#cancel').css('background-color', 'rgba(100,100,100,0.6)');
	alert('saveCodi() end');

}

function excutePopup() {
	if (popupPosition.x == 0) {
		if (popupPosition.y == 0) {
			// closetName
			closetList = nextItem(closetList);
			$('#popupClosetName').html(closetList[0].cname);
			sessionStorage.setItem('cid', closetList[0].cid);

		} else if (popupPosition.y == 1) {
			// codi Name
			
			
			$('#window').css('top','-110px');
			imeCsName._focus();
			$('#popupCodiName').focus();

		} else {
			// cancel
			$('#popup').hide();
			position.x = preX;
		}
	} else if (popupPosition.x == 1) {
		if (popupPosition.y == 0) {
			// addCloset

			$("#insertCloset").show();
			$('#window').hide();
			$("#insCloset").addClass("inputfocus");
			
			var str=null;
			
			if(closetList!=null){
				str= "옷장"+(closetList.length+1);
			}else if(closetList==null){
				str = "옷장1";
			}
			 
			
			$('#insCloset').val(str);
			
			$("#insCloset").focus();
			imeInsertCloset._focus();
			position.x = 5;
		} else if (popupPosition.y == 1) {
			// codi Name
			
			$('#window').css('top','-110px');
			imeCsName._focus();
			$('#popupCodiName').focus();

		} else {
			// saVe

			var url = "http://finfra.com/~tv11/ins_cody.php";

			var cid = sessionStorage.getItem('cid');
			var tid = topArr[0].tid;
			var bid = botArr[0].bid;
			var csName = $("#popupCodiName").val();

			$.ajax({
				url : url,
				dataType : 'json',
				type : 'get',
				data : {
					cId : cid,
					tId : tid,
					bId : bid,
					csName : csName
				},
				success : function(data) {
					if (data) {
						// when return value is true
						alert('codiSave success');
						// ////////////
						$('#window').hide();
						
						// ///////////
						var str = $('#popupClosetName').html() + "에 저장되었습니다.";
						alertMsg(str);
						position.x = 4;
						
						setTimeout(function(){
							$('#popup').hide();
							position.x = preX;
						},1000);
						
					} else {
						alert("saveCodi failed");
						$('#popup').hide();
					}
				}
			});
		}
	}
};

function add_closet() {

	alert('add_closet() start');
	
	var cName = $('#insCloset').val();
	if (cName != null) {
		var url = 'http://finfra.com/~tv11/ins_closet.php';

		$.ajax({
			async:false,
			url : url,
			dataType : 'json',
			type : 'get',
			data : {
				mId : localStorage.getItem('user'),
				cName : cName
			},
			success : function(data) {

				alert(data);

				sessionStorage.removeItem('cid');

				alert('add_closet success!!!!!!!!!!!!!!!!!!!!');
			},
			error : function() {
				alert('add_closet ajax error');
			}

		});

		
	} else {
		alert('closet name = NULL');
	}
	
	alert('add_closet() end');
};
function alertMsg(msg) {
	$("#confirm").html(msg);
	$('#popup').show();
	$("#confirm").show();
	setTimeout(function() {
		$('#popup').hide();
		$("#confirm").hide();
	}, 1250);

};
