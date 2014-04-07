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
	
	if (localStorage.getItem("user")) {
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
	imeobj.setQWERTYPos(290, 230); // IME XT9, new function
	//alert("PW: setQWERTYPos!");
	imeobj.setKeyFunc(tvKey.KEY_RETURN, function() {
		//alert("IME RETURN");
		imePw._blur();
		$("#getPassword").blur();
		document.getElementById("anchor").focus();
		$("#getPassword").addClass("focus");
		$("#form").addClass("centre");
	});
	imeobj.setEnterFunc(login);
	imeobj.setBlockSpace(true);
	imeobj.setPasswordMode(true);
	imeobj.setKeySetFunc('qwerty');
	//alert("ime_init_passwd end...");
};
function ime_init_id(imeobj) {
	var inputobj = imeobj.getInputObj();
	//alert("start initializing: " + inputobj.id);
	imeobj.setQWERTYPos(290, 230); // IME XT9, new function
	//alert("ID: setQWERTYPos!");
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
		position=1;
	});
	imeobj.setBlockSpace(true);
	imeobj.setUsetIDMode(true);
	//alert("ime_init_id end...");
};

function login() {
	//alert("Login Function");

	var id = $("#getId").val();
	var pw = $("#getPassword").val();
	if (id.trim() == "") {
		alertMsg("아이디를 입력 해 주세요");
		return;
	}
	if (pw.trim() == "") {
		alertMsg("비밀번호 를 입력 해 주세요");
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
				//alert("login success");
				localStorage.setItem("user", id);
				location.replace("weather.html");
			} else {
				alertMsg("로그인 실패! :아이디/비밀번호를 확인 하세요");
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

	// $("#sound").html("<audio src='app/sound/click.wav' autoplay></audio>");

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
			position =1;
			$("#getPassword").addClass("focus");
			$("#getId").removeClass("focus");
		} else if (position == 1) {
			position =0;
			$("#getId").addClass("focus");
			$("#getPassword").removeClass("focus");			
		}
		break;
	case tvKey.KEY_DOWN:
		//alert("DOWN");
		if (position == 0) {
			position =1;
			$("#getPassword").addClass("focus");
			$("#getId").removeClass("focus");
		} else if (position == 1) {
			position =0;
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
	case tvKey.KEY_BLUE:
	case 22:
		//alert("BLUE");
		break;
	case tvKey.KEY_RED:
	case 108:
		//alert("RED");
		document.location.href = "register.html";
		break;
	case tvKey.KEY_YELLOW:
		//alert("ID :YELLOW");
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