var widgetAPI = new Common.API.Widget();
var tvKey = new Common.API.TVKeyValue();

var position = {
	x : 0,
	y : 0
};
var closetY;
var codisetY;

var Main = {

};

Main.onLoad = function() {
	// ////////////////////////////////////////
	localStorage.setItem('user', 'lee');
	// ////////////////////////////////////////

	alert(localStorage.getItem('user'));
	// Enable key event processing

	this.enableKeys();
	widgetAPI.sendReadyEvent();

	setDefault();

};

function setDefault() {

	alert('setDefault() start');
	// 기본 옷장리스트 구현

	alert("////////////////////////////////////////////");
	alert(localStorage.getItem('topArr'));
	alert("////////////////////////////////////////////");

	var cid = sessionStorage.getItem('cid');
	var csid = sessionStorage.getItem('csid');

	alert("cid is " + cid + " csid is " + csid);

	getClosetList();

	if (cid != null) {

		var closetIndex = -1;

		var arr = $('#closetView div');

		alert("arr is " + arr);

		for ( var i = 0; i < arr.length; i++) {

			alert("index is " + i);

			if (arr[i].id == cid) {
				alert('found it!!!!!!!!!!');
				closetIndex = i;
				break;
			}

		}

		position.x = 0;
		position.y = closetIndex + 1;

		movePosition(1);

		if (csid != null) {

			var codisetArr = $('#codiView div');

			alert("codisetArr is " + codisetArr);

			var codisetIndex = -1;

			for ( var i = 0; i < codisetArr.length; i++) {
				alert(i);

				if (codisetArr[i].id == csid) {
					codisetIndex = i;
					break;
				}
			}

			position.x = 1;
			closetY = position.y;

			position.y = codisetIndex + 1;

			movePosition(1);

		}

	} else {// cid가 null일때

		position.x = 0;
		position.y = 1;// 포지션 초기화

		movePosition(1);
		// 포커스 주고 세션에 해당 cid저장 cid로 코디셋리스트 뿌리기

	}

	setHelpbar();

	alert('setDefault() end');
}
function movePosition(direction) {

	alert("movePostion()");
	switch (position.x) {
	case 0: {
		// x index is 0 (closetList)
		switch (direction) {
		case 1: {
			// top
			position.y--;
			var arr = $('#closetView div');
			var col = arr.length;
			if (position.y == -1) {
				position.y = col - 1;
			}

			arr.css('background-color', 'rgba(255, 255, 255, 0.1)');

			$(arr[position.y]).css('background-color',
					'rgba(255, 255, 255, 0.5)');

			getCodisetList(arr[position.y].id);

			sessionStorage.setItem('cid', arr[position.y].id);

			alert('saved cid is ' + arr[position.y].id);
			break;
		}
		case 2: {
			// /right

			var arr = $('#codiView div');

			if (arr.length > 0) {
				closetY = position.y;

				position.x = 1;
				position.y = 0;

				$(arr[position.y]).css('background-color',
						'rgba(255, 255, 255, 0.5)');
				getCodiView(arr[position.y].id);

				var arr2 = $('#codiView div');

				sessionStorage.setItem('csid', arr2[0].id);

				setHelpbar();

			}

			break;
		}
		case 3: {
			// botttom
			position.y++;
			var arr = $('#closetView div');
			var max = arr.length - 1;
			if (position.y == max + 1) {
				position.y = 0;
			}
			arr.css('background-color', 'rgba(255, 255, 255, 0.1)');

			var selectedItem = arr[parseInt(position.y)];
			alert(selectedItem + "--" + position.y);
			$(arr[position.y]).css('background-color',
					'rgba(255, 255, 255, 0.5)');

			getCodisetList(arr[position.y].id);

			sessionStorage.setItem('cid', arr[position.y].id);

			alert('saved cid is ' + arr[position.y].id);

			break;
		}
		case 4: {
			// left
			break;
		}
		}
		break;
	}
	case 1: {
		// x index is 1(codisetList)
		switch (direction) {
		case 1: {
			// top

			position.y--;
			var arr = $('#codiView div');
			var max = arr.length - 1;
			if (position.y == -1) {
				position.y = max;
			}

			arr.css('background-color', 'rgba(255, 255, 255, 0.1)');
			$(arr[position.y]).css('background-color',
					'rgba(255, 255, 255, 0.5)');

			getCodiView(arr[position.y].id);

			sessionStorage.setItem('csid', arr[position.y].id);

			break;
		}
		case 2: {
			// right
			position.x = 2;
			codisetY = position.y;
			position.y = 0;

			var arr = $('#itemView .movingDiv');
			$(arr[position.y]).css('background-color',
					'rgba(255, 255, 255, 0.5)');

			setHelpbar();

			break;
		}
		case 3: {
			// bottom

			position.y++;
			var arr = $('#codiView div');
			var max = arr.length - 1;
			if (position.y == max + 1) {
				position.y = 0;
			}

			arr.css('background-color', 'rgba(255, 255, 255, 0.1)');
			$(arr[position.y]).css('background-color',
					'rgba(255, 255, 255, 0.5)');

			getCodiView(arr[position.y].id);

			alert("--------------------------" + arr[position.y].id);

			sessionStorage.setItem('csid', arr[position.y].id);

			break;
		}
		case 4: {
			// left
			position.x = 0;
			position.y = closetY;

			var arr = $('#codiView div');
			arr.css('background-color', 'rgba(255, 255, 255, 0.1)');

			initItemView();

			sessionStorage.removeItem('csid');

			setHelpbar();

			break;
		}
		}

		break;
	}
	case 2: {
		// x index id 2(itemView)
		switch (direction) {
		case 1: {
			// top
			position.y--;
			if (position.y == -1) {
				position.y = 1;
			}
			var arr = $('#itemView .movingDiv');
			arr.css('background-color', 'rgba(255, 255, 255, 0.1)');
			$(arr[position.y]).css('background-color',
					'rgba(255, 255, 255, 0.5)');
			break;
		}
		case 2: {
			// right
			break;
		}
		case 3: {
			// bottom
			position.y++;
			if (position.y == 2) {
				position.y = 0;
			}
			var arr = $('#itemView .movingDiv');
			arr.css('background-color', 'rgba(255, 255, 255, 0.1)');
			$(arr[position.y]).css('background-color',
					'rgba(255, 255, 255, 0.5)');
			break;
		}
		case 4: {
			// left
			var arr = $('#itemView .movingDiv');
			arr.css('background-color', 'rgba(255, 255, 255, 0.1)');

			position.x = 1;
			position.y = codisetY;

			setHelpbar();

			break;
		}
		}
		break;
	}
	}
}
function getCodiView(csid) {

	var url = "http://finfra.com/~tv11/clothes.php"
	var tid;
	var bid;
	$.ajax({
		async : false,
		url : url,
		dataType : 'json',
		data : {
			csId : csid
		},
		success : function(data) {
			tid = data.clothes.tid;
			bid = data.clothes.bid;

			alert("tid " + tid + " bid " + bid);
		},
		error : function() {
			alert("get tid bid error");
		}
	});

	var url = "http://finfra.com/~tv11/detail.php";

	$.ajax({
		url : url,
		dataType : 'json',
		type : 'get',
		data : {
			tId : tid
		},
		success : function(data) {
			$('#topView').attr('src', data.detail.t_url_1);
			$('#topName').html(data.detail.tname);
			var str = data.detail.tcomments + "(가격 : " + data.detail.price
					+ ")";
			$('#topDetail').html(str);
			sessionStorage.setItem('tid', tid);
		},
		error : function() {
			alert("ajax error(tid)");
		}
	});
	$.ajax({
		url : url,
		dataType : 'json',
		type : 'get',
		data : {
			bId : bid
		},
		success : function(data) {
			$('#botView').attr('src', data.detail.b_url_1);
			$('#botName').html(data.detail.bname);

			var str = data.detail.bcomments + "(가격 : " + data.detail.price
					+ ")";
			$('#botDetail').html(str);
			sessionStorage.setItem('bid', bid);
		},
		error : function() {
			alert("ajax error(bid)");
		}
	});
}
function getCodisetList(cid) {
	alert('getCodiset()');

	var url = 'http://finfra.com/~tv11/codyset.php';

	$.ajax({
		async : false,
		url : url,
		dataType : 'json',
		type : 'get',
		data : {
			cId : cid
		},
		success : function(data) {
			var arr = data.codyset;

			$('#codiView').empty();
			if (arr) {
				for ( var i = 0; i < arr.length; i++) {
					var codi = $('<div/>', {
						id : arr[i].csid,
						text : arr[i].csname,
						class : 'listItem movingDiv'
					});

					$('#codiView').append(codi);
				}
			}

		},
	});
}
function getClosetList() {

	alert('getCloset()');
	$('#closetView').empty();
	var url = 'http://finfra.com/~tv11/closet.php';

	$.ajax({
		async : false,
		url : url,
		dataType : 'json',
		type : 'get',
		data : {
			id : localStorage.getItem('user')
		},
		success : function(data) {
			var arr = data.closet;

			if (arr.length > 0) {
				for ( var i = 0; i < arr.length; i++) {
					var item = $('<div/>', {
						id : arr[i].cid,
						text : arr[i].cname,
						class : 'listItem movingDiv'
					});

					$('#closetView').append(item);
				}

				sessionStorage.setItem('cid', arr[0].cid);

			}
		},
		error : function() {
			alert('ajax error');
		}

	});

}

function add_closet() {

	alert('add_closet() start');
	var cName = "new closet";

	var url = 'http://finfra.com/~tv11/ins_closet.php';

	$.ajax({
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

			setDefault();
		},
		error : function() {
			alert('add_closet ajax error');
		}

	});

	alert('add_closet() end');
}
function mod_closet() {

	alert('modi_closet() start()');

	var cname = "modified name";
	var cid;
	// //////////////////////////

	// //////////////////////////

	var arr = $('#closetView div');

	cid = $(arr[position.y]).attr('id');
	alert('cid is ' + cid);

	var url = 'http://finfra.com/~tv11/mod_closet.php';

	$.ajax({
		url : url,
		dataType : 'json',
		type : 'get',
		data : {
			cName : cname,
			cId : cid
		},
		success : function(data) {
			if (data) {
				setDefault();
			} else {
				alert('fail');
			}
		},
		error : function() {
			alert('mod_closet ajax error');
		}
	});

	alert('mod_closet() end');
}

function del_closet() {

	alert('del_closet() start');

	var url = "http://finfra.com/~tv11/del_closet.php";

	// //////////////////////////
	// 확인창 구현 필요 확인 후 삭제 필요
	// //////////////////////////

	var arr = $('#closetView div');
	alert(arr);
	var cid = $(arr[position.y]).attr('id');

	alert("selected cid is " + cid + " for del");

	$.ajax({
		async : false,
		url : url,
		dataType : 'json',
		type : 'get',
		data : {
			cId : cid
		},
		success : function(data) {

			alert(data);
			if (data) {

				alert('del_closet() success');
				sessionStorage.removeItem('cid');

				setDefault();

			} else {
				alert('del_closet() fail');
			}
		},
		error : function() {
			alert('ajax error');
		}
	});

	alert('del_closet() end');
}
Main.onUnload = function() {

};

Main.enableKeys = function() {
	document.getElementById("anchor").focus();
};

function mod_codiset() {

	var url = 'http://finfra.com/~tv11/mod_cody.php';

	$.ajax({
		async : false,
		url : url,
		dataType : 'json',
		type : 'get',
		data : {
			csName : "new codiset name",
			csId : sessionStorage.getItem('csid')
		},
		success : function(data) {
			if (data) {
				alert("success " + data);

				setDefault();

			} else {
				alert('mod_codiset() fail');
			}
		},
		error : function() {
			alert('mod_codiset() ajax error');
		}
	});

	alert('mod_codiset() end');
}
function setHelpbar() { // position.x 값을 참조하여 맞는 헬프바 아이콘 구현

	alert("setHelpBar() start");

	alert("x value is" + position.x);

	$('#green').remove();
	$('#yellow').remove();
	$('#blue').remove();

	var yellow, green, blue;

	if (position.x == 0) {
		green = $('<font id="green"><img class="helpBarIcon">옷장 추가  </font>');
		yellow = $('<font id="yellow"><img class="helpBarIcon">옷장 수정  </font>');
		blue = $('<font id="blue"><img class="helpBarIcon">옷장 삭제  </font>');

		$('#helpBar').append(green);
		$('#helpBar').append(yellow);
		$('#helpBar').append(blue);

		$('#yellow img').attr('src', 'app/image/yellow.png');
		$('#blue img').attr('src', 'app/image/blue.png');
		$('#green img').attr('src', 'app/image/green.png');

	} else if (position.x == 1) {
		yellow = $('<font id="yellow"><img class="helpBarIcon">코디셋 수정  </font>');
		blue = $('<font id="blue"><img class="helpBarIcon">코디셋 삭제  </font>');

		$('#helpBar').append(yellow);
		$('#helpBar').append(blue);

		$('#yellow img').attr('src', 'app/image/yellow.png');
		$('#blue img').attr('src', 'app/image/blue.png');

	} else if (position.x == 2) {
		green = $('<font id="green"><img class="helpBarIcon">상세정보  </font>');

		$('#helpBar').append(green);

		$('#green img').attr('src', 'app/image/green.png');

	} else {

	}

	alert("setHelpBar() end");
}

function del_codiset() {

	alert('del_codiset() start');

	var arr = $('#codiView div');
	var csid = $(arr[position.y]).attr('id');

	var url = "http://finfra.com/~tv11/del_cody.php";

	$.ajax({
		url : url,
		dataType : 'json',
		type : 'get',
		data : {
			csId : csid
		},
		success : function(data) {
			if (data) {
				alert(data);
				alert('del_codiset() success');

				initItemView();
				sessionStorage.removeItem('csid');

				setDefault();

			} else {
				alert('del_codiset() fail');
			}
		}
	});
	alert('del_codiset() end');
}

function initItemView() {

	$('#topName').html("");
	$('#topView').remove();
	$('#topDetail').html("");

	var newEle = $('<img class="clothView" id="topView">');
	$('#topName').after(newEle);
	$('#topView').css({
		'float' : 'left',
		'width' : '40%',
		'height' : 'width',
		'margin' : '2% 2% 0 2%',
		'border-radius' : '30px'
	});

	$('#botName').html("");
	$('#botView').remove();
	$('#botDetail').html("");

	var newEle = $('<img class="clothView" id="botView">');
	$('#botName').after(newEle);
	$('#botView').css({
		'float' : 'right',
		'width' : '40%',
		'height' : 'width',
		'margin' : '2% 2% 0 2%',
		'border-radius' : '30px'
	});

}
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
		movePosition(4);
		break;
	case tvKey.KEY_RIGHT:
		alert("RIGHT");
		movePosition(2);
		break;
	case tvKey.KEY_UP:
		alert("UP");
		movePosition(1);
		break;
	case tvKey.KEY_DOWN:
		alert("DOWN");
		movePosition(3);
		break;
	case tvKey.KEY_ENTER:
	case tvKey.KEY_PANEL_ENTER:
		alert("ENTER");
		break;
	case tvKey.KEY_GREEN: // green
		alert("GREEN");

		if (position.x == 0) {
			add_closet();
		}
		break;
	case tvKey.KEY_YELLOW: // yellow
		alert("YELLOW");
		if (position.x == 0) {
			mod_closet();
		} else if (position.x == 1) {
			mod_codiset();
		}
		break;
	case tvKey.KEY_BLUE: // blue
		alert('BLUE');
		if (position.x == 0) {
			del_closet();
		} else if (position.x == 1) {
			del_codiset();
		}
		break;
	default:
		alert("Unhandled key");
		break;
	}
};
