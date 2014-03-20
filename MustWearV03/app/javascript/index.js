var widgetAPI = new Common.API.Widget();
var tvKey = new Common.API.TVKeyValue();
var idList = new Array('#getId', '#getPassword');
var position = 0;
var imeId, imePw;
var Main = {

};

Main.onLoad = function() {
	// Enable key event processing
	this.enableKeys();
	widgetAPI.sendReadyEvent();
	
	
	/////////////////////////////
	document.location.replace('weather.html');
	/////////////////////////////
	
	
	
	
	
	if (localStorage.getItem("user")) {
		location.replace("weather.html");
	} else {
		alert("No user data");
	}
	$(idList[position]).addClass("focus");
	//create IME for Id
	imeId = new IMEShell_Common();
	imeId.inputboxID = "getId";
	imeId.inputTitle = "Must wear";
	imeId.onKeyPressFunc = onKeyCallback;
	imeId.context = this;
	imeId.setBlockSpace(true);
	imeId.inputDescription = "Welcome to Mustwear! Input ID here";
	//create IME for Password
	imePw = new IMEShell_Common();
	imePw.inputboxID = "getPassword";
	imePw.inputTitle = "Must wear";
	imePw.onKeyPressFunc = onKeyCallback;
	imePw.context = this;
	imePw.setBlockSpace(true);
	imePw.inputDescription = "Welcome to Mustwear! Input Password here";

};

focusIME = function() {
	if (position == 0) {
		alert(idList[position]+"focus");
		imeId.onShow();
		alert(idList[position]+"load");
	} else {
		alert(idList[position]+"focus");
		imePw.onShow();
		alert(idList[position]+"load");
	}
};
function onKeyCallback(key, str, id) {
	id=idList[position];
	alert("["+id+" : input]");
	alert("CALLBACK onKeyCallback ===================: " + key + " ID = " + id
			+ " STR = " + str);
	switch (key) {
	case tvKey.KEY_ENTER:
	case tvKey.KEY_PANEL_ENTER: // Enter Key
		alert("ENTER");
		document.getElementById(id).value = str;
		break;
	case tvKey.KEY_RETURN:
	case tvKey.KEY_PANEL_RETURN: //return
		alert("RETURN");
		break;
	case (45): //exit
		alert("EXIT");
		break;
	default:
		alert("Unhandled key : onKeyCallback");
		break;
	}
}

Main.onUnload = function() {

};

Main.enableKeys = function() {
	document.getElementById("anchor").focus();
};

Main.keyDown = function() {
	var keyCode = event.keyCode;
	alert("Key pressed: " + keyCode);

	switch (keyCode) {
	case tvKey.KEY_RETURN:
	case tvKey.KEY_PANEL_RETURN:
		alert("RETURN");
		widgetAPI.sendReturnEvent();
		break;
	case tvKey.KEY_LEFT:
		alert("LEFT");
		break;
	case tvKey.KEY_RIGHT:
		alert("RIGHT");
		break;
	case tvKey.KEY_UP:
		alert("UP");
		if (position == 0) {
			$(idList[position]).removeClass("focus");
			position++;
			$(idList[position]).addClass("focus");

		} else {
			$(idList[position]).removeClass("focus");
			position--;
			$(idList[position]).addClass("focus");
		}

		break;
	case tvKey.KEY_DOWN:
		alert("DOWN");
		if (position == 0) {
			$(idList[position]).removeClass("focus");
			position++;
			$(idList[position]).addClass("focus");

		} else {
			$(idList[position]).removeClass("focus");
			position--;
			$(idList[position]).addClass("focus");
		}
		break;
	case tvKey.KEY_ENTER:
	case tvKey.KEY_PANEL_ENTER:
		alert("ENTER");
		focusIME();
		break;
	case tvKey.KEY_BLUE:
	case 22:
		alert("BLUE");
		var id = $("#getId").val();
		var pw = $("#getPassword").val();
		if (id.trim() == "") {
			alert("input id");
			return;
		}

		var url = "http://finfra.com/~tv11/login.php";
		$.ajax({
			url : url,
			dataType : 'json',
			type : 'post',
			data : {
				id : id,
				pw : pw
			},
			success : function(data) {
				if (data) {
					console.log("login success");
					localStorage.setItem("user", id);
					location.replace("weather.html");
				} else {
					console.log("login failed");
				}
			},
			error : function() {
				console.log("ajax error");
			}
		});
		break;
	case tvKey.KEY_RED:
	case 108:
		alert("RED");
		document.location.href = "register.html";
		break;
	default:
		alert("Unhandled key");
		break;
	}
};
