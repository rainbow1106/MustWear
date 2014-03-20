var widgetAPI = new Common.API.Widget();
var tvKey = new Common.API.TVKeyValue();
var pop = 0;//pop-up on/off
var row = 0;//focus position 
var Main = {

};

Main.onLoad = function() {
	// Enable key event processing
	this.enableKeys();
	widgetAPI.sendReadyEvent();
	var type = sessionStorage.getItem('flag');
	;
	var url = "http://finfra.com/~tv11/detail.php";
	$("#popup").hide();
	$("#window").hide();
	$("payment").hide();
	if (type == "top") {
		var topInfo = localStorage.getItem('topArr');
		var topArr = JSON.parse(topInfo);
		alert("top- ajax");
		$
				.ajax({
					url : url,
					dataType : 'json',
					type : 'get',
					data : {
						tId : topArr[0].tid
					},
					success : function(data) {
						alert(JSON.stringify(data));
						$('#name').html(" &nbsp;  &nbsp; " + data.detail.tname);
						$('#sex').html(" &nbsp;  &nbsp; " + data.detail.sex);
						$('#style')
								.html(" &nbsp;  &nbsp; " + data.detail.style);
						$('#price')
								.html(" &nbsp;  &nbsp; " + data.detail.price);
						$('#size').html(" &nbsp;  &nbsp; " + data.detail.size);
						$('#comments').html(
								" &nbsp;  &nbsp; " + data.detail.tcomments);
						$("#firstImg").attr('src', data.detail.t_url_1);
						$("#secondImg").attr('src', data.detail.t_url_2);

					},
					error : function() {
						alert("error getDetail");
					}
				});
	} else if (type == "bot") {
		var botInfo = localStorage.getItem('botArr');
		var botArr = JSON.parse(botInfo);
		alert("bot - ajax");
		$.ajax({
			url : url,
			dataType : 'json',
			type : 'get',
			data : {
				bId : botArr[0].bid
			},
			success : function(data) {
				$('#name').html(data.detail.bname);
				$('#sex').html(data.detail.sex);
				$('#style').html(data.detail.style);
				$('#price').html(data.detail.price);
				$('#size').html(data.detail.size);
				$('#comments').html(data.detail.bcomments);
				$("#firstImg").attr('src', data.detail.b_url_1);
				$("#secondImg").attr('src', data.detail.b_url_2);
			},
			error : function() {
				alert("error getDetail");
			}
		});
	}
};

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
		if (pop == 1) {
			$("#popup").hide();
			$("#window").hide();
			$("img").css("opacity", "1");

			pop = 0;
			row = 0;
			alert("cancle :" + pop + row);
			break;
		}
		alert("RETURN");
		widgetAPI.sendReturnEvent();
		break;
	case tvKey.KEY_LEFT:
		alert("LEFT");
		if (pop == 1) {
			if (row == 0) {
				$("#buy").removeClass("focus");
				$("#cancle").addClass("focus");
				row++;
			} else {
				$("#cancle").removeClass("focus");
				$("#buy").addClass("focus");
				row--;
			}
			alert("L :" + pop + row);
		}
		break;
	case tvKey.KEY_RIGHT:
		alert("RIGHT");
		if (pop == 1) {
			if (row == 0) {
				$("#buy").removeClass("focus");
				$("#cancle").addClass("focus");
				row++;

			} else {
				$("#cancle").removeClass("focus");
				$("#buy").addClass("focus");
				row--;
			}
			alert("R :" + pop + row);
		}
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
		if (pop == 1 && row == 0) {// buy clothes
			$("#window").hide();
			$("#payment").show();
			$("#ok").addClass("focus");
			pop = 2;
		} else {//cancle pop-up
			$("#popup").hide();
			$("#window").hide();
			$("img").css("opacity", "1");
			pop = 0;
			row = 0;
			alert("cancle :" + pop + row);
		}
		break;
	case 108:
		alert("RED");
		document.location.href = "recommend.html";
		break;
	case tvKey.KEY_BLUE:
		alert("BLUE");
		pop = 1;
		$("#popup").show();
		$("#window").show();
		$("#payment").hide();
		$("img").css("opacity", "0.4");
		$("#buy").addClass("focus");
		$("#cancle").removeClass("focus");

		break;

	default:
		alert("Unhandled key");
		break;
	}
};
