var widgetAPI = new Common.API.Widget();
var tvKey = new Common.API.TVKeyValue();
var idList = new Array('#getId', '#getPassword');
var position = 0;
var imeId, imePw;
var msg;
var Main = {

};

Main.onLoad = function() {
	// Enable key event processing
	this.enableKeys();
	widgetAPI.sendReadyEvent();

	if (localStorage.getItem("user")) {
		//alert("[Wrong Access] Already got user data");
		location.replace("weather.html");
	} else {
		//alert("No user data");
	}

	//alert("onLoad");
	imePw = new IMEShell("getPassword", ime_init_passwd, this);
	if (!imePw) {
		//alert("object for IMEShell create failed", 3);
	} else {
		//alert("imePw ok", 3);
	}
	imeId = new IMEShell("getId", ime_init_id, this);
	if (!imeId) {
		//alert("object for IMEShell create failed");
	} else {
		//alert("imeId ok", 3);
	}
	_g_ime.init("en", "2_35_259_12", "USA", "", "us");
	$("#getId").addClass("focus");
	$("#form").addClass("centre");
	$('#popup').hide();
	$("#confirm").hide();
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
	//alert("start initializing: " + inputobj.id);
	imeobj.setQWERTYPos(390, 230); // IME XT9, new function
	//alert("PW: setQWERTYPos!");
	imeobj.setKeyFunc(tvKey.KEY_RETURN, function() {
		//alert("IME RETURN");
		imePw._blur();
		$("#getPassword").blur();
		document.getElementById("anchor").focus();
		$("#getPassword").addClass("focus");
		$("#form").addClass("centre");
	});
	imeobj.setEnterFunc(register);
	imeobj.setBlockSpace(true);
	imeobj.setPasswordMode(true);
	imeobj.setKeySetFunc('qwerty');
	//alert("ime_init_passwd end...");
};
function ime_init_id(imeobj) {
	var inputobj = imeobj.getInputObj();
	//alert("start initializing: " + inputobj.id);
	imeobj.setQWERTYPos(390, 230); // IME XT9, new function
	//alert("ID: setQWERTYPos!");
	imeobj.setAnyKeyFunc(checkId);
	imeobj.setKeyFunc(tvKey.KEY_RETURN, function() {
		//alert("IME RETURN");
		imeId._blur();
		$("#getId").blur();
		document.getElementById("anchor").focus();
		$("#getId").addClass("focus");
		$("#form").addClass("centre");

	});
	imeobj.setEnterFunc(function() {
		imeId._blur();
		$("#getId").blur();
		$("#getPassword").focus();
		imePw._focus();
		$("#getPassword").addClass("focus");
		$("#getId").removeClass("focus");
		document.getElementById("anchor").focus();
		position = 1;

	});
	imeobj.setBlockSpace(true);
	imeobj.setUsetIDMode(true);
	//alert("ime_init_id end...");
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
				if (id.trim() <= 5) {
					$("#checkId").html("아이디를 입력 해 주세요 5자 이상.");
				} else {
					$("#checkId").html("중복되지 않은 아이디입니다.");
				}
			} else {
				$("#checkId").html("중복된 아이디 입니다.");
			}

		}

	});
	//alert($("#checkId").html());
}
function register() {
	var id = $("#getId").val();
	var password = $("#getPassword").val();

	if (id.trim() == "") {
		alertMsg("아이디를 입력 해 주세요");
		return;
	}

	if (id.trim().length < 5) {
		alertMsg("아이디 를 5자 이상 입력 해주세요");
		return;
	}

	if (password.trim() == "") {
		alertMsg("비밀번호를 입력 해 주세요");
		return;
	}

	if (password.trim().length < 5) {
		alertMsg("비밀번호를 5자 이상 입력 해 주세요");
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
				alertMsg("가입 되었습니다.");
				location.replace("index.html");
			} else {
				//alert("regist error");
			}
		},
		error : function() {
			//alert("ajax error");
		}
	});
};

/** ************************************************************************ */
Main.enableKeys = function() {
	document.getElementById("anchor").focus();
};

Main.keyDown = function() {
	var keyCode = event.keyCode;
	//alert("Key pressed: " + keyCode);

	switch (keyCode) {
	case tvKey.KEY_RETURN:
	case tvKey.KEY_PANEL_RETURN:
		//alert("RETURN");
		event.preventDefault();
		widgetAPI.sendReturnEvent();
		break;
	case tvKey.KEY_LEFT:
		//alert("LEFT");
		break;
	case tvKey.KEY_RIGHT:
		//alert("RIGHT");
		break;
	case tvKey.KEY_UP:
		//alert("UP");
		if (position == 0) {
			position = 1;
			$("#getPassword").addClass("focus");
			$("#getId").removeClass("focus");
		} else if (position == 1) {
			position = 0;
			$("#getId").addClass("focus");
			$("#getPassword").removeClass("focus");
		}
		break;
	case tvKey.KEY_DOWN:
		//alert("DOWN");
		if (position == 0) {
			position = 1;
			$("#getPassword").addClass("focus");
			$("#getId").removeClass("focus");
		} else if (position == 1) {
			position = 0;
			$("#getId").addClass("focus");
			$("#getPassword").removeClass("focus");
		}
		break;
	case tvKey.KEY_ENTER:
	case tvKey.KEY_PANEL_ENTER:
		//alert("ENTER");
		if (position == 0) {
			$("#getId").focus();
			imeId._focus();
			$("#form").removeClass("centre");
		} else if (position == 1) {
			$("#getPassword").focus();
			imePw._focus();
			$("#form").removeClass("centre");
		}
		break;
	case tvKey.KEY_RED:
	case 108:
		//alert("RED");
		document.location.href = "index.html";
		break;
	default:
		//alert("Unhandled key");
		break;
	}
};

function alertMsg(msg) {
	imePw._blur();
	$("#confirm").html(msg);
	$('#popup').show();
	$("#confirm").show();
	setTimeout(function() {
		$('#popup').hide();
		$("#confirm").hide();
		imePw._focus();
	}, 1250);

};
