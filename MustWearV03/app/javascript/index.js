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
	//location.href = 'recommend.html';
	if (localStorage.getItem("user")) {
		location.replace("weather.html");
	} else {
		alert("No user data");
	}

	alert("onLoad");
	imePw = new IMEShell("getPassword", ime_init_passwd, this);
	if (!imePw) {
		alert("object for IMEShell create failed", 3);
	} else {
		alert("imePw ok", 3);
	}
	imeId = new IMEShell("getId", ime_init_id, this);
	if (!imeId) {
		alert("object for IMEShell create failed");
	} else {
		alert("imeId ok", 3);
	}

	_g_ime.init("en", "2_35_259_12", "USA", "", "us");
	document.getElementById('helpBar').innerHTML = "INPUT ID";
	$(idList[position]).addClass("focus");
	document.getElementById('getId').focus();

};

Main.onUnload = function() {
	if (imeId) {
		imeId._blur();
	}
	if (imePw) {
		imePw._blur();
	}
};
/** ************************************************************ */
function ime_init_passwd(imeobj) {
	var inputobj = imeobj.getInputObj();
	alert("start initializing: " + inputobj.id);
	imeobj.setQWERTYPos(290, 230); // IME XT9, new function
	alert("PW: setQWERTYPos!");
	imeobj.setKeyFunc(tvKey.KEY_UP, passwdObjKeyFunc);
	alert("PW: imeobj.setKeyFunc!");
	imeobj.setKeyFunc(tvKey.KEY_DOWN, passwdObjKeyFunc);
	imeobj.setEnterFunc(login);
	imeobj.setBlockSpace(true);
	imeobj.setPasswordMode(true);
	imeobj.setKeySetFunc('qwerty');
	document.getElementById('getPassword').focus();
	alert("ime_init_passwd end...");
};
function ime_init_id(imeobj) {
	var inputobj = imeobj.getInputObj();
	alert("start initializing: " + inputobj.id);
	imeobj.setQWERTYPos(290, 230); // IME XT9, new function
	alert("ID: setQWERTYPos!");
	imeobj.setKeyFunc(tvKey.KEY_UP, idObjKeyFunc);
	alert("ID: imeobj.setKeyFunc!");
	imeobj.setKeyFunc(tvKey.KEY_DOWN, idObjKeyFunc);
	
	imeobj.setKeyFunc(tvKey.KEY_YELLOW, function(){
		alert("ID :YELLOW");
		location.replace("register.html");
	});
	imeobj.setKeySetFunc('qwerty');
	imeobj.setEnterFunc(idOk);
	imeobj.setBlockSpace(true);
	imeobj.setUsetIDMode(true);
	document.getElementById('getId').focus();
	alert("ime_init_id end...");
};

function idObjKeyFunc(keyCode) {
	alert("idObjKeyFunc");

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
	return false;
};
function passwdObjKeyFunc(keyCode) {
	alert("passwdObjKeyFunc");
	switch (keyCode) {
	case tvKey.KEY_UP: // Up Key
		alert("PW :UP KEY");
		
		$(idList[position]).removeClass("focus");
		position--;
		alert(position);
		$(idList[position]).addClass("focus");
		$(idList[position]).focus();
		break;

	case tvKey.KEY_DOWN: // Down Key
		alert("PW :DOWN KEY");
		
		$(idList[position]).removeClass("focus");
		position--;
		alert(position);
		$(idList[position]).addClass("focus");
		$(idList[position]).focus();
		break;

	case tvKey.KEY_RETURN:
	case tvKey.KEY_PANEL_RETURN: // return Key
		alert("PW :Return KEY");
		$(idList[position]).blur();
		break;
	default:
		alert("Unhandled key");
		break;
	}
	return false;
};
function login() {
	alert("Login Function");

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
				alert("login success");
				localStorage.setItem("user", id);
				location.replace("weather.html");
			} else {
				alert("login failed");
			}
		},
		error : function() {
			alert("ajax error");
		}
	});

};
function idOk() {
	$(idList[position]).removeClass("focus");
	position++;
	alert(position);
	$(idList[position]).addClass("focus");
	$(idList[position]).focus();
}
/** ************************************************************************ */
Main.enableKeys = function() {
	document.getElementById("anchor").focus();
};

Main.keyDown = function() {
	
	//$("#sound").html("<audio src='app/sound/click.wav' autoplay></audio>");
	
	var keyCode = event.keyCode;
	alert("Key pressed: " + keyCode);

	switch (keyCode) {
	case tvKey.KEY_RETURN:
	case tvKey.KEY_PANEL_RETURN:
		alert("RETURN");
		event.preventDefault();
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
		break;
	case tvKey.KEY_DOWN:
		alert("DOWN");
		break;
	case tvKey.KEY_ENTER:
	case tvKey.KEY_PANEL_ENTER:
		alert("ENTER");
		$(idList[0]).focus();
		break;
	case tvKey.KEY_BLUE:
	case 22:
		alert("BLUE");

		break;
	case tvKey.KEY_RED:
	case 108:
		alert("RED");
		document.location.href = "register.html";
		break;
	case tvKey.KEY_YELLOW:
		alert("ID :YELLOW");
		location.replace("register.html");
		break;
	default:
		alert("Unhandled key");
		break;
	}
};