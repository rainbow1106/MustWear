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
	var url = "http://finfra.com/~tv11/detail.php";
	$("#popup").hide();
	$("#window").hide();
	$("payment").hide();
	if (type == "top") {
		//alert("top- ajax");
		$
				.ajax({
					url : url,
					dataType : 'json',
					type : 'get',
					data : {
						tId : sessionStorage.getItem('tid')
					},
					success : function(data) {
						//alert(JSON.stringify(data));
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
						//alert("error getDetail");
					}
				});
	} else if (type == "bot") {
		//alert("bot - ajax");
		$.ajax({
			url : url,
			dataType : 'json',
			type : 'get',
			data : {
				bId : sessionStorage.getItem('bid')
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
				//alert("error getDetail");
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
	//alert("Key pressed: " + keyCode);
	switch (keyCode) {
	case tvKey.KEY_RETURN:
	case tvKey.KEY_PANEL_RETURN:
		
		if (pop == 1) {
			$("#popup").hide();
			$("#window").hide();
			$("img").css("opacity", "1");

			pop = 0;
			row = 0;
			//alert("cancle :" + pop + row);
			event.preventDefault();
			break;
		}else{
			
			history.back();
		}
		//alert("RETURN");
//		widgetAPI.sendReturnEvent();
		event.preventDefault();
		break;
	case tvKey.KEY_LEFT:
		//alert("LEFT");
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
			//alert("L :" + pop + row);
		}
		break;
	case tvKey.KEY_RIGHT:
		//alert("RIGHT");
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
			//alert("R :" + pop + row);
		}
		break;
	case tvKey.KEY_UP:
		//alert("UP");
		event.preventDefault();
		break;
	case tvKey.KEY_DOWN:
		//alert("DOWN");
		event.preventDefault();
		break;
	case tvKey.KEY_ENTER:
	case tvKey.KEY_PANEL_ENTER:
		//alert("ENTER");
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
			//alert("cancle :" + pop + row);
		}
		break;
	case tvKey.KEY_RED:
		//alert("RED");
	
		break;
	case tvKey.KEY_BLUE:
		//alert("BLUE");
		pop = 1;
		$("#popup").show();
		$("#window").show();
		$("#payment").hide();
		$("img").css("opacity", "0.4");
		$("#buy").addClass("focus");
		$("#cancle").removeClass("focus");

		break;

	default:
		//alert("Unhandled key");
		break;
	}
	//$("#sound").Play();
};
getAbsPath = function(linkString)
{
	//alert("**************linkString 2012**********"  + linkString );
	var Abs_path = "";
	var rootPath = window.location.href.substring(0, location.href.lastIndexOf("/")+1);
	//alert("**************rootPath* 2012**********"  + rootPath );
	// For 2012 platform
	if (unescape(window.location.toString()).indexOf("localhost") == -1)
	{	
	//alert("test 1");
		if (unescape(window.location.toString()).indexOf("file://C") != -1)
		{ // For PC-SDK
		//alert("test 12");
		Abs_path = unescape(rootPath).split("file://")[1].replace("C/","C:/")+linkString;
		//alert("**************Abs_path* 2012**********"  + Abs_path );
		}
		else
		{ // For Real-Device
		//alert("test 13");
		Abs_path = unescape(rootPath).split("file://")[1]+linkString;
		}
	}
	else // For 2010, 2011 platform
	{
		if (unescape(window.location.toString()).indexOf("C:") != -1)
		{ 
		// For PC-SDK
		//alert("test 14");
		Abs_path = "/" + unescape(rootPath).split("file://localhost/C:\\")[1].replace(/\\/g,"/")+linkString;
		//alert("**************Abs_path 2011***********"  + Abs_path );
		}
		else 
		{ 
		// For Real-Device
		//alert("test 15");
		Abs_path = "/" + unescape(rootPath).split("file://localhost/")[1]+linkString;
		}
	}
	return Abs_path;
}