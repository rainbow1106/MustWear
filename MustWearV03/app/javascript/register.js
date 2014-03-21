var widgetAPI = new Common.API.Widget();
var tvKey = new Common.API.TVKeyValue();
var idList = new Array('#getId', '#getPassword');
var divList = new Array('#idDiv', '#pwDiv');
var position = 0;
var imeId, imePw;
var Main = {

};

Main.onLoad = function() {
	// Enable key event processing
	this.enableKeys();
	widgetAPI.sendReadyEvent();

	if (localStorage.getItem("user")) {
		alert("[Wrong Access] Already got user data");
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
	$(idList[0]).addClass("focus");
	$(idList[0]).focus();
	$(divList[1]).hide();
};

Main.onUnload = function() {
	if (imeId) {
		
	}
	if (imePw) {
		imePw._blur();
	}
};
/** ************************************************************ */
function ime_init_passwd(imeobj) {
	var inputobj = imeobj.getInputObj();
	alert("start initializing: " + inputobj.id);
	imeobj.setQWERTYPos(320, 220); // IME XT9, new function
	alert("PW: setQWERTYPos!");
	imeobj.setKeyFunc(tvKey.KEY_UP, passwdObjKeyFunc);
	alert("PW: imeobj.setKeyFunc!");
	imeobj.setKeyFunc(tvKey.KEY_DOWN, passwdObjKeyFunc);
	imeobj.setEnterFunc(register);
	imeobj.setBlockSpace(true);
	imeobj.setKeySetFunc('qwerty');
	$(idList[1]).focus();
	
	alert("ime_init_passwd end...");
};
function ime_init_id(imeobj) {
	var inputobj = imeobj.getInputObj();
	alert("start initializing: " + inputobj.id);
	imeobj.setQWERTYPos(320, 220); // IME XT9, new function
	alert("ID: setQWERTYPos!");

	alert("ID: imeobj.setKeyFunc!");
	
	imeobj.setKeyFunc(tvKey.KEY_RED, function() {
		alert("ID :RED");
		location.replace("index.html");
	});
	imeobj.setKeyFunc(tvKey.KEY_YELLOW, function() {
		alert("ID :YELLOW");
		location.replace("register.html");
	});
	imeobj.setAnyKeyFunc(checkId);
	imeobj.setKeySetFunc('qwerty');
	imeobj.setEnterFunc(idOk);
	imeobj.setKeyFunc(tvKey.KEY_UP, idObjKeyFunc);
	imeobj.setKeyFunc(tvKey.KEY_DOWN, idObjKeyFunc);
	imeobj.setBlockSpace(true);
	$(idList[0]).focus();
	alert("ime_init_id end...");
};

function idObjKeyFunc(keyCode) {
	alert("idObjKeyFunc");

	switch (keyCode) {
	case tvKey.KEY_UP: // Up Key
		alert("ID :UP KEY");
		//
		$(idList[0]).removeClass("focus");
		$(divList[0]).hide();
		$(divList[1]).show();
		$(idList[1]).addClass("focus");
		$(idList[1]).focus();
		break;

	case tvKey.KEY_DOWN: // Down Key
		alert("ID :DOWN KEY");
		
		$(idList[0]).removeClass("focus");
		$(divList[0]).hide();
		$(divList[1]).show();
		$(idList[1]).addClass("focus");
		$(idList[1]).focus();
		break;

	case tvKey.KEY_RETURN:
	case tvKey.KEY_PANEL_RETURN: // return Key
		alert("ID :Return KEY");
		$(idList[0]).blur();
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
		

		$(idList[1]).removeClass("focus");
		$(divList[1]).hide();
		$(divList[0]).show();
		$(idList[0]).addClass("focus");
		$(idList[0]).focus();

		break;

	case tvKey.KEY_DOWN: // Down Key
		alert("PW :DOWN KEY");
		
		$(idList[1]).removeClass("focus");
		$(divList[1]).hide();
		$(divList[0]).show();
		$(idList[0]).addClass("focus");
		$(idList[0]).focus();
		break;

	case tvKey.KEY_RETURN:
	case tvKey.KEY_PANEL_RETURN: // return Key
		alert("PW :Return KEY");
		$(idList[1]).blur();
		break;
	default:
		alert("Unhandled key");
		break;
	}
	return false;
};
function checkId() {
	var id = $("#getId").val();

	var url = "http://finfra.com/~tv11/check.php";

	$.ajax({
		url : url,
		dataType : 'json',
		type : 'get',
		data : {
			id : id
		},
		success : function(data) {
			if (!data) {
				$("#checkId").html("중복되지 않은 아이디입니다.");
			} else {
				$("#checkId").html("중복된 아이디입니다.");
			}
		}

	});
}
function register() {
	var id = $("#getId").val();
	var password = $("#getPassword").val();

	if (id.trim() == "") {
		alert("input id");
		return;
	}

	if (id.trim().length < 5) {
		alert("too low id");
		return;
	}

	if (password.trim() == "") {
		alert("input password");
		return;
	}

	if (password.trim().length < 5) {
		alert("too short password");
		return;
	}

	var url = "http://finfra.com/~tv11/reg.php";

	$.ajax({
		url : url,
		dataType : 'json',
		type : 'post',
		data : {
			id : id,
			pw : password
		},
		success : function(data) {
			if (data) {
				alert("승인되었습니다.");
				location.replace("index.html");
			} else {
				alert("regist error");
			}
		},
		error : function() {
			alert("ajax error");
		}
	});
};

function idOk() {
	alert("OK :INPUT ID OK");
	$(idList[0]).removeClass("focus");
	$(divList[0]).hide();
	$(divList[1]).show();
	$(idList[1]).addClass("focus");
	$(idList[1]).focus();
}
/** ************************************************************************ */
Main.enableKeys = function() {
	document.getElementById("anchor").focus();
};

Main.keyDown = function() {
	
	$("#sound").html("<audio src='app/sound/click.wav' autoplay></audio>");
	
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
		break;
	case tvKey.KEY_DOWN:
		alert("DOWN");
		break;
	case tvKey.KEY_ENTER:
	case tvKey.KEY_PANEL_ENTER:
		alert("ENTER");
		break;
	default:
		alert("Unhandled key");
		break;
	}
};
