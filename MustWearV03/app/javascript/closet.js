var widgetAPI = new Common.API.Widget();
var tvKey = new Common.API.TVKeyValue();

var position = {
	x : 0,
	y : 0
};
var closetY;
var codisetY;
var pop = 0;
var loc = 0;
var imeInsertCloset, imeModifyCloset, imeModifyCodiset;
var arr;

var closetList = [];
var codisetList = [];

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
	hidePop();
	$("#confirm").hide();
	imeInsertCloset = new IMEShell("insCloset", ime_ins_closet, this);
	if (!imeInsertCloset) {
		alert("object for IMEShell create failed", 3);
	} else {
		alert("imeInsertCloset ok", 3);
	}
	imeModifyCloset = new IMEShell("modCloset", ime_mod_closet, this);
	if (!imeModifyCloset) {
		alert("object for IMEShell create failed", 3);
	} else {
		alert("imeModifyCloset ok", 3);
	}
	imeModifyCodiset = new IMEShell("modCodiset", ime_mod_codyset, this);
	if (!imeModifyCodiset) {
		alert("object for IMEShell create failed", 3);
	} else {
		alert("imeModifyCodiset ok", 3);
	}
	
	
};
function ime_ins_closet(imeobj) {
	var inputobj = imeobj.getInputObj();
	alert("start initializing: " + inputobj.id);
	imeobj.setQWERTYPos(550, 230); // IME XT9, new function
	imeobj.setKeyFunc(tvKey.KEY_RETURN, function() {
		alert("IME RETURN");
		imeInsertCloset._blur();
		$("#insCloset").blur();
		document.getElementById("anchor").focus();
		$("#insCloset").addClass("inputfocus");
	});
	imeobj.setEnterFunc(function() {
		imeInsertCloset._blur();
		$("#insCloset").blur();
		$("#insClosetBtn").addClass("focus");
		loc = 1;
		document.getElementById("anchor").focus();
	});
	imeobj.setKeySetFunc('qwerty');
	_g_ime.init("ko", "1_35_259_11", "KOR", "", "kr");
	alert("ime_ins_closet end...");
};
function ime_mod_closet(imeobj) {
	var inputobj = imeobj.getInputObj();
	alert("start initializing: " + inputobj.id);
	imeobj.setQWERTYPos(550, 230); // IME XT9, new function

	imeobj.setKeyFunc(tvKey.KEY_RETURN, function() {
		alert("IME RETURN");
		imeModifyCloset._blur();
		$("#modCloset").blur();
		document.getElementById("anchor").focus();
		$("#modCloset").addClass("inputfocus");
	});

	imeobj.setEnterFunc(function() {
		imeModifyCloset._blur();
		$("#modCloset").blur();
		$("#modClosetBtn").addClass("focus");
		loc = 1;
		document.getElementById("anchor").focus();
	});
	imeobj.setKeySetFunc('qwerty');
	_g_ime.init("ko", "1_35_259_11", "KOR", "", "kr");
	alert("ime_mod_closet end...");
};
function ime_mod_codyset(imeobj) {
	var inputobj = imeobj.getInputObj();
	alert("start initializing: " + inputobj.id);
	imeobj.setQWERTYPos(550, 230); // IME XT9, new function

	imeobj.setKeyFunc(tvKey.KEY_RETURN, function() {
		alert("IME RETURN");
		imeModifyCodiset._blur();
		$("#modCodiset").blur();
		document.getElementById("anchor").focus();
		$("#modCodiset").addClass("inputfocus");
	});
	imeobj.setEnterFunc(function() {
		imeModifyCloset._blur();
		$("#modCodiset").blur();
		$("#modCodisetBtn").addClass("focus");
		loc = 1;
		document.getElementById("anchor").focus();
	});
	imeobj.setKeySetFunc('qwerty');
	_g_ime.init("ko", "1_35_259_11", "KOR", "", "kr");
	alert("ime_mod_codyset end...");
};

function setDefault() {

	alert('setDefault() start');
	// 기본 옷장리스트 구현

	////////////////
	$('#closetView').empty();
	$('#codiView').empty();
	////////////////
	var cid = sessionStorage.getItem('cid');
	var csid = sessionStorage.getItem('csid');

	alert("cid is " + cid + " csid is " + csid);

	///  getClosetList
	getClosetList2();
	
	alert('closetList` length is '+closetList.length);
	
	if( closetList.length > 7 ){
		
		alert('((((((((((((if)))))))))) closetList.length > 7');
		if(cid != null){ // cid exist
			//finding cIndex
			alert('((((((((((((if)))))))))) cid!=null');
			
			var cIndex = -1;
			
			for(var i=0;i<closetList.length;i++){
				var closetId = closetList[i].cid;
				
				if(cid == closetId){
					cIndex = i;
					break;
				}
			}
			alert("cIndex is "+cIndex);
			if(cIndex>5){
				alert('((((((((((((if)))))))))) cIndex > 7');
				if(cIndex == (closetList.length-1)){
					//position.y=6
					alert('((((((((((((if)))))))))) cIndex == (closetList.length-1)');
					for(var i=(cIndex-6);i<(cIndex+1);i++){
						var item = $('<div/>', {
							id : closetList[i].cid,
							text : closetList[i].cname,
							class : 'listItem movingDiv'
						});

						$('#closetView').append(item);
					}
					
					position.x=0;
					position.y=6;
					
					/////////////display up
					$('#closetUp').attr('hidden',false);
					
				}else{
					alert('((((((((((((if)))))))))) else');
					
					//position.y=5
					
					for(var i=(cIndex-5);i<(cIndex+2);i++){
						var item = $('<div/>', {
							id : closetList[i].cid,
							text : closetList[i].cname,
							class : 'listItem movingDiv'
						});

						$('#closetView').append(item);
					}
					
					position.x=0;
					position.y=5;
					
					/////////////////
					$('#closetDown').attr('hidden',false);
					$('#closetUp').attr('hidden',false);
				}
				
			
			}else{ //cIndex is less than 7
				alert('((((((((((((if)))))))))) cIndex <= 5');
				
				for(var i=0;i<7;i++){
					var item = $('<div/>', {
						id : closetList[i].cid,
						text : closetList[i].cname,
						class : 'listItem movingDiv'
					});

					$('#closetView').append(item);
				}
				
				position.x=0;
				position.y=cIndex;
				
				$('#closetDown').attr('hidden',false);
				$('#closetUp').attr('hidden',true);
				
			}
			
			////////////////////////////
			var closetArr = $('#closetView div');
			$(closetArr[position.y]).css('background-color','rgba(255,255,255,0.5)');
			///////////////////////////
			
			closetY = position.y;
			if(csid != null ){ //closetLength is more than 7, cid exist, csid not exist
				alert('((((((((((((if)))))))))) csid != null');
				
				//get codisetList
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
						codisetList = data.codyset;
					}
				});
				
				if( codisetList != null){
					alert('((((((((((((if)))))))))) codisetList.length != 0');
					
					var csIndex = -1;
					for(var i=0;i<codisetList.length;i++){
						var codisetId = codisetList[i].csid;
						if(csid == codisetId){
							csIndex = i;
							break;
						}
					}
					alert('csIndex is '+csIndex);
					
					if(codisetList.length>5){
						alert('((((((((((((if)))))))))) codisetList.length > 5');
						if(csIndex>2){
							alert('((((((((((((if)))))))))) csIndex > 2');
							
							if(csIndex == (codisetList.length-1)){
								alert('((((((((((((if)))))))))) csIndex == (codisetList.length-1)');
								
								for(var i=(csIndex-4);i<(csIndex+1);i++){
									var codi = $('<div/>', {
										id : codisetList[i].csid,
										text : codisetList[i].csname,
										class : 'listItem movingDiv'
									});
									
									$('#codiView').append(codi);
								}
								
								position.x=1;
								position.y=4;
								

								$('#codiUp').attr('hidden',false);
								
							}else{
								alert('((((((((((((if)))))))))) else');
								
								for(var i=(csIndex-3);i<(csIndex+2);i++){
									var codi = $('<div/>', {
										id : codisetList[i].csid,
										text : codisetList[i].csname,
										class : 'listItem movingDiv'
									});
									
									$('#codiView').append(codi);
								
								}
								
								position.x=1;
								position.y=3;
							

								$('#codiDown').attr('hidden',false);
								$('#codiUp').attr('hidden',false);
							}
							
							
						}else{
							alert('((((((((((((if)))))))))) csIndex <= 2');
							
							for(var i=0;i<codisetList.length;i++){
								if(i == 5){break;}
								var codi = $('<div/>', {
									id : codisetList[i].csid,
									text : codisetList[i].csname,
									class : 'listItem movingDiv'
								});
								
								$('#codiView').append(codi);
							}
							
							position.x=1;
							position.y=csIndex;

							$('#codiDown').attr('hidden',false);
						}

					}else{
						alert('((((((((((((if)))))))))) codisetList.length <= 5');
						
						for(var i=0;i<codisetList.length;i++){
							
							var codi = $('<div/>', {
								id : codisetList[i].csid,
								text : codisetList[i].csname,
								class : 'listItem movingDiv'
							});
							
							$('#codiView').append(codi);
						}
						
						position.x = 1;
						position.y = csIndex;
					}
										
					
					var codiArr = $("#codiView div");
					$(codiArr[position.y]).css('background-color','rgba(255,255,255,0.5)');
					getCodiView(csid);
				}
				

			}else{ //closetLength is more than 7, cid exist, csid not exist
				alert('((((((((((((if)))))))))) csid == null');
				
				getCodisetList(cid);
			}
	
		}else{//closetLength is more than 7, cid not exist
			alert('((((((((((((if)))))))))) cid == null');
			
			//make 0to6 focus 0 call getcodisetList 0
			for(var i=0;i<7;i++){
				var item = $('<div/>', {
					id : closetList[i].cid,
					text : closetList[i].cname,
					class : 'listItem movingDiv'
				});

				$('#closetView').append(item);
			}
			
			position.x=0;
			position.y=0;
			var closetArr = $('#closetView div');
			$(closetArr[position.y]).css('background-color','rgba(255,255,255,0.5)');
		
			alert($(closetArr[position.y]).attr('id'));

			sessionStorage.setItem('cid',$(closetArr[position.y]).attr('id'));
			$('#closetDown').attr('hidden',false);
			getCodisetList($(closetArr[position.y]).attr('id'));
		}
		
		
	}else if(closetList.length<=7){ //length is less than 7
		alert('((((((((((((if)))))))))) closetList.length <= 7');
		
		if(closetList != null){
			
			for ( var i = 0; i < closetList.length; i++) {
				var item = $('<div/>', {
					id : closetList[i].cid,
					text : closetList[i].cname,
					class : 'listItem movingDiv'
				});

				$('#closetView').append(item);
			}
			
			if( cid != null){
				alert('((((((((((((if)))))))))) cid != null');
				
				//finding index of "cid"
				var closetArr = $('#closetView div');
				var cIndex = -1;
				
				alert("closetList`s length is "+closetList.length);
				for(var i=0;i<closetList.length;i++){
					var closetId = closetList[i].cid;
					alert("index is "+i+" closetId is"+closetId);
					if( cid == closetId){
						cIndex = i;
						break;
					}
				}
				//////
				alert('cIndex is '+cIndex);
				
				position.x = 0;
				position.y=cIndex;
				closetY = position.y;
				$(closetArr[position.y]).css('background-color','rgba(255,255,255,0.5)');
				
				
				if(csid != null ){
					
					alert('((((((((((((if)))))))))) csid != null');
					
					//get codisetList
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
							codisetList = data.codyset;
						}
					});
					
					if( codisetList != null){
						alert('((((((((((((if)))))))))) codisetList != null');
						
						var csIndex = -1;
						for(var i=0;i<codisetList.length;i++){
							var codisetId = codisetList[i].csid;
							if(csid == codisetId){
								csIndex = i;
								break;
							}
						}
						
						alert("csIndex is "+csIndex);
						
						if(csIndex>3){
							alert('((((((((((((if)))))))))) csIndex>3');
							
							if(csIndex == (codisetList.length-1)){
							
								alert('((((((((((((if)))))))))) csIndex == (codisetList.length-1)');
								
								for(var i=(csIndex-4);i<(csIndex+1);i++){
									var codi = $('<div/>', {
										id : codisetList[i].csid,
										text : codisetList[i].csname,
										class : 'listItem movingDiv'
									});
									
									$('#codiView').append(codi);
								}
								
								position.x=1;
								position.y=4;
								

								$('#codiUp').attr('hidden',false);
								
							}else{
								alert('((((((((((((if)))))))))) csIndex != (codisetList.length-1)');
								
								for(var i=(csIndex-3);i<(csIndex+2);i++){
									var codi = $('<div/>', {
										id : codisetList[i].csid,
										text : codisetList[i].csname,
										class : 'listItem movingDiv'
									});
									
									$('#codiView').append(codi);
								
								}
								
								position.x=1;
								position.y=3;

								$('#codiDown').attr('hidden',false);
								$('#codiUp').attr('hidden',false);
							}
							
							
						}else{
							alert('((((((((((((if)))))))))) csIndex <= 3');
							
							for(var i=0;i<codisetList.length;i++){
								if(i==5){
									break;
								}
								var codi = $('<div/>', {
									id : codisetList[i].csid,
									text : codisetList[i].csname,
									class : 'listItem movingDiv'
								});
								
								$('#codiView').append(codi);
							}
							
							position.x=1;
							position.y=csIndex;
						}
						
						
						var codiArr = $("#codiView div");
						$(codiArr[position.y]).css('background-color','rgba(255,255,255,0.5)');
						getCodiView(csid);
					}
					
				}else{
					getCodisetList($(closetArr[position.y]).attr('id'));
				}
				
				
			}else{  //cid is null csid null length is less than 7
				
				alert('((((((((((((if)))))))))) cid == null');
				
				position.x=0;
				position.y=0;
				var closetArr = $('#closetView div');
				$(closetArr[position.y]).css('background-color','rgba(255,255,255,0.5)');
				
				getCodisetList($(closetArr[position.y]).attr('id'));
				
				//set session cid
				sessionStorage.setItem('cid',$(closetArr[position.y]).attr('id'));
				}
			}
		}
	
	
	setHelpbar();
	
	alert("position.x is "+position.x+"position.y is "+position.y);
	alert('setDefault() end');

}


function movePosition(direction) {
	// move focus
	// x 0,1,2
	// y:var
	alert("movePostion() start");
	switch (position.x) {
	case 0: {
		// x index is 0 (closetList)
		switch (direction) {
		case 1: {
			// top
			position.y--;
			
			var arr;
			
			alert("closetList length is "+closetList.length);
			alert("position.y is "+position.y);
			if(closetList.length>7){
				if(position.y == 0){
					replaceClosetView(0);
				}else if(position.y == -1){
					replaceClosetView(2);
				}else{
					arr = $('#closetView div');
					
					
					//css change
					arr.css('background-color','rgba(255,255,255,0.1)');
					$(arr[position.y]).css('background-color','rgba(255,255,255,0.5)');
					
					var cid = $(arr[position.y]).attr('id');
					sessionStorage.setItem('cid',cid);
					
					alert("saved cid is "+cid);
				
				}
				
				
			}else{
				arr = $('#closetView div');
				var len = arr.length;
				if(position.y == -1){
					position.y = (len-1);
				}
				
				arr.css('background-color','rgba(255,255,255,0.1)');
				$(arr[position.y]).css('background-color','rgba(255,255,255,0.5)');
			
				var cid = $(arr[position.y]).attr('id');
				sessionStorage.setItem('cid',cid);
				
				alert("saved cid is "+cid);
		
			}
			
			var cid = sessionStorage.getItem('cid');
			if(cid != null){
				getCodisetList(cid);
			}

			$('#codiUp').attr('hidden',true);
			$('#codiDown').attr('hidden',true);
			break;
		}
		case 2: {
			// /right

			var arr = $('#codiView div');

			if (arr.length > 0) {
				if(codisetList.length>5){
					$('#codiDown').attr('hidden',false);
				}
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


			position.y++;
			
			var arr;
			
			alert("closetList length is "+closetList.length);
			alert("position.y is "+position.y);
			if(closetList.length>7){
				if(position.y == 6){
					replaceClosetView(1);
				}else if(position.y == 7){
					replaceClosetView(3);
				}else{
					arr = $('#closetView div');
					
					
					//css change
					arr.css('background-color','rgba(255,255,255,0.1)');
					$(arr[position.y]).css('background-color','rgba(255,255,255,0.5)');
					
					var cid = $(arr[position.y]).attr('id');
					sessionStorage.setItem('cid',cid);
					
					alert("saved cid is "+cid);
				
				}
				
				
			}else{
				arr = $('#closetView div');
				var len = arr.length;
				if(position.y == (len)){
					position.y = 0
				}
				
				arr.css('background-color','rgba(255,255,255,0.1)');
				$(arr[position.y]).css('background-color','rgba(255,255,255,0.5)');
			
				var cid = $(arr[position.y]).attr('id');
				sessionStorage.setItem('cid',cid);
				
				alert("saved cid is "+cid);
		
			}
			
			var cid = sessionStorage.getItem('cid');
			if(cid != null){
				getCodisetList(cid);
			}
			
			$('#codiUp').attr('hidden',true);
			$('#codiDown').attr('hidden',true);
			
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

//			position.y--;
//			var arr = $('#codiView div');
//			var max = arr.length - 1;
//			if (position.y == -1) {
//				position.y = max;
//			}
//
//			arr.css('background-color', 'rgba(255, 255, 255, 0.1)');
//			$(arr[position.y]).css('background-color',
//					'rgba(255, 255, 255, 0.5)');
//
//			getCodiView($(arr[position.y]).attr('id'));
//
//			sessionStorage.setItem('csid', $(arr[position.y]).attr('id'));
			
			position.y--;
			
			var codiArr;
			
			alert("codisetList length is "+codisetList.length);
			alert("position.y is "+position.y);
			if(codisetList.length>5){
				if(position.y == 0){
					replaceCodisetView(0);
				}else if(position.y == -1){
					replaceCodisetView(2);
				}else{
					codiArr = $('#codiView div');
					
					
					//css change
					codiArr.css('background-color','rgba(255,255,255,0.1)');
					$(codiArr[position.y]).css('background-color','rgba(255,255,255,0.5)');
					
					var csid = $(codiArr[position.y]).attr('id');
					sessionStorage.setItem('csid',csid);
					
					alert("saved csid is "+csid);
				
				}
				
				
			}else{
				codiArr = $('#codiView div');
				var len = codiArr.length;
				if(position.y == -1){
					position.y = (len-1);
				}
				
				codiArr.css('background-color','rgba(255,255,255,0.1)');
				$(codiArr[position.y]).css('background-color','rgba(255,255,255,0.5)');
			
				var csid = $(codiArr[position.y]).attr('id');
				sessionStorage.setItem('csid',csid);
				
				alert("saved csid is "+csid);
		
			}
			
			var csid = sessionStorage.getItem('csid');
			if(csid != null){
				getCodiView(csid);
			}
			

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

//			position.y++;
//			var arr = $('#codiView div');
//			var max = arr.length - 1;
//			if (position.y == max + 1) {
//				position.y = 0;
//			}
//
//			arr.css('background-color', 'rgba(255, 255, 255, 0.1)');
//			$(arr[position.y]).css('background-color',
//					'rgba(255, 255, 255, 0.5)');
//
//			getCodiView(arr[position.y].id);
//
//			alert("--------------------------" + arr[position.y].id);
//
//			sessionStorage.setItem('csid', arr[position.y].id);
			
			position.y++;
			
			var codiArr;
			
			alert("codisetList length is "+codisetList.length);
			alert("position.y is "+position.y);
			if(codisetList.length>5){
				if(position.y == 4){
					replaceCodisetView(1);
				}else if(position.y == 5){
					replaceCodisetView(3);
				}else{
					codiArr = $('#codiView div');
					
					
					//css change
					codiArr.css('background-color','rgba(255,255,255,0.1)');
					$(codiArr[position.y]).css('background-color','rgba(255,255,255,0.5)');
					
					var csid = $(codiArr[position.y]).attr('id');
					sessionStorage.setItem('csid',csid);
					
					alert("saved csid is "+csid);
				
				}
				
				
			}else{
				codiArr = $('#codiView div');
				var len = codiArr.length;
				if(position.y == (len)){
					position.y = 0
				}
				
				codiArr.css('background-color','rgba(255,255,255,0.1)');
				$(codiArr[position.y]).css('background-color','rgba(255,255,255,0.5)');
			
				var csid = $(codiArr[position.y]).attr('id');
				sessionStorage.setItem('csid',csid);
				
				alert("saved csid is "+csid);
		
			}
			
			var csid = sessionStorage.getItem('csid');
			if(csid != null){
				getCodiView(csid);
			}

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
	
	alert("x is "+position.x+" y is "+position.y);
	alert('cid is '+sessionStorage.getItem('cid')+" csid is "+sessionStorage.getItem('csid'));
	alert("movePostion() end");
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
			$('#topView').attr('hidden',false);
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
			$('#botView').attr('hidden',false);
			sessionStorage.setItem('bid', bid);
		},
		error : function() {
			alert("ajax error(bid)");
		}
	});
}
function getCodisetList(cid) {
	alert('getCodisetList() start');

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
			
			///save to global
			
			codisetList = data.codyset;
			
			$('#codiView').empty();
			if (arr!=null) {
				
				
				for ( var i = 0; i <arr.length ; i++) {
					if(i == 5){
						break;
					}
					var codi = $('<div/>', {
						id : arr[i].csid,
						text : arr[i].csname,
						class : 'listItem movingDiv'
					});

					$('#codiView').append(codi);
				}
			}

		}
	});

	alert('getCodisetList() end');

}

function getClosetList2() {

	alert('getClosetList2() start');

	
	alert(localStorage.getItem('user'));
	
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
			closetList = data.closet;
			if(closetList!=null){
				alert("getClosetList success");
			}else{
				alert("getClosetList fail");
			}
		},
		error : function() {
			alert('ajax error');
		}

	});


	alert('getClosetList2() end');
}
function getClosetList() {

	alert('getClosetList() start');

	
	alert(localStorage.getItem('user'));
	
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

			closetList = data.closet;

			if (arr != null) {
				if(arr.length<8){
					
					alert('팔보다 작다');
					for ( var i = 0; i < arr.length; i++) {
						var item = $('<div/>', {
							id : arr[i].cid,
							text : arr[i].cname,
							class : 'listItem movingDiv'
						});

						$('#closetView').append(item);
					}
				}else{
					

					alert('팔보다 크다');
					for ( var i = 0; i < 7; i++) {
						var item = $('<div/>', {
							id : arr[i].cid,
							text : arr[i].cname,
							class : 'listItem movingDiv'
						});

						$('#closetView').append(item);
					}
				}
				

				sessionStorage.setItem('cid', arr[0].cid);

			} else {
				alert("arr = NULL ")
			}
		},
		error : function() {
			alert('ajax error');
		}

	});


	alert('getClosetList() end');
}


function add_closet() {

	alert('add_closet() start');
	var cName = document.getElementById('insCloset').value;
	alert(cName);
	if (cName.length > 0) {
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
		alertMsg("["+cName+"] 이  추가 되었습니다");
		alert('add_closet() end');
	} else {
		alert('closet name = NULL');
	}

}
function mod_closet() {

	alert('modi_closet() start()');

	var cname = document.getElementById('modCloset').value;
	;
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
	alertMsg("["+cName+"] 으로 수정 되었습니다");
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

	alertMsg("["+cName+"] 을  제거 하였습니다");
	alert('del_closet() end');
}
Main.onUnload = function() {
	if (imeInsertCloset) {
		imeInsertCloset._blur();
	}
	if (imeModifyCloset) {
		imeModifyCloset._blur();
	}
	if (imeModifyCodiset) {
		imeModifyCodiset._blur();
	}
};

Main.enableKeys = function() {
	document.getElementById("anchor").focus();
};

function mod_codiset() {

	var url = 'http://finfra.com/~tv11/mod_cody.php';
	var csName = document.getElementById('modCodiset').value;
	if (csName != null) {
		$.ajax({
			async : false,
			url : url,
			dataType : 'json',
			type : 'get',
			data : {
				csName : csName,
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
		alertMsg("코디셋 이름을 ["+csName+"] 으로 수정 되었습니다");
		alert('mod_codiset() end');
	} else {
		alert('modCodiset is null');
	}

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
	$('#topView').attr('hidden',true);
	$('#topDetail').html("");


	$('#botName').html("");
	$('#botView').attr('hidden',true);
	$('#botDetail').html("");

}
Main.keyDown = function() {

	var keyCode = event.keyCode;
	alert("Key pressed: " + keyCode);

	switch (keyCode) {
	case tvKey.KEY_RETURN:
	case tvKey.KEY_PANEL_RETURN:
		alert("RETURN");
		if (pop > 0) {
			alert("close Popup")
			hidePop();
			event.preventDefault();
		} else {
			alert("close App")
		}
		
		alert("pop :" + pop + "|loc :" + loc);
		break;
	case tvKey.KEY_LEFT:
		alert("LEFT");
		if (pop == 0) {
			movePosition(4);
		} else if (pop == 1) {
			if (loc == 1) {
				loc = 2;
				$("#insClosetCancle").addClass("focus");
				$("#insClosetBtn").removeClass("focus");

			} else if (loc == 2) {
				loc = 1;
				$("#insClosetBtn").addClass("focus");
				$("#insClosetCancle").removeClass("focus");
			}
		} else if (pop == 2) {
			if (loc == 1) {
				loc = 2;
				$("#modClosetCancle").addClass("focus");
				$("#modClosetBtn").removeClass("focus");

			} else if (loc == 2) {
				loc = 1;
				$("#modClosetBtn").addClass("focus");
				$("#modClosetCancle").removeClass("focus");
			}
		} else if (pop == 3) {
			if (loc == 1) {
				loc = 2;
				$("#modCodisetCancle").addClass("focus");
				$("#modCodisetBtn").removeClass("focus");

			} else if (loc == 2) {
				loc = 1;
				$("#modCodisetBtn").addClass("focus");
				$("#modCodisetCancle").removeClass("focus");
			}
		} else if (pop == 4) {
			if (loc == 1) {
				loc = 2;
				$("#delClosetCancle").addClass("focus");
				$("#delClosetBtn").removeClass("focus");

			} else if (loc == 2) {
				loc = 1;
				$("#delClosetBtn").addClass("focus");
				$("#delClosetCancle").removeClass("focus");
			}
		} else if (pop == 5) {
			if (loc == 1) {
				loc = 2;
				$("#delCodisetCancle").addClass("focus");
				$("#delCodisetBtn").removeClass("focus");

			} else if (loc == 2) {
				loc = 1;
				$("#delCodisetBtn").addClass("focus");
				$("#delCodisetCancle").removeClass("focus");
			}
		}
		alert("pop :" + pop + "|loc :" + loc);
		break;
	case tvKey.KEY_RIGHT:
		alert("RIGHT");
		if (pop == 0) {
			movePosition(2);
		} else if (pop == 1) {
			if (loc == 1) {
				loc = 2;
				$("#insClosetCancle").addClass("focus");
				$("#insClosetBtn").removeClass("focus");
			} else if (loc == 2) {
				loc = 1;
				$("#insClosetBtn").addClass("focus");
				$("#insClosetCancle").removeClass("focus");
			}
		} else if (pop == 2) {
			if (loc == 1) {
				loc = 2;
				$("#modClosetCancle").addClass("focus");
				$("#modClosetBtn").removeClass("focus");

			} else if (loc == 2) {
				loc = 1;
				$("#modClosetBtn").addClass("focus");
				$("#modClosetCancle").removeClass("focus");
			}
		} else if (pop == 3) {
			if (loc == 1) {
				loc = 2;
				$("#modCodisetCancle").addClass("focus");
				$("#modCodisetBtn").removeClass("focus");

			} else if (loc == 2) {
				loc = 1;
				$("#modCodisetBtn").addClass("focus");
				$("#modCodisetCancle").removeClass("focus");
			}
		} else if (pop == 4) {
			if (loc == 1) {
				loc = 2;
				$("#delClosetCancle").addClass("focus");
				$("#delClosetBtn").removeClass("focus");

			} else if (loc == 2) {
				loc = 1;
				$("#delClosetBtn").addClass("focus");
				$("#delClosetCancle").removeClass("focus");
			}
		} else if (pop == 5) {
			if (loc == 1) {
				loc = 2;
				$("#delCodisetCancle").addClass("focus");
				$("#delCodisetBtn").removeClass("focus");

			} else if (loc == 2) {
				loc = 1;
				$("#delCodisetBtn").addClass("focus");
				$("#delCodisetCancle").removeClass("focus");
			}
		}
		alert("pop :" + pop + "|loc :" + loc);
		break;
	case tvKey.KEY_UP:
		alert("UP");
		if (pop == 0) {
			movePosition(1);
		} else if (pop == 1) {
			if (loc != 0) {
				loc = 0;
				$("#insClosetBtn").removeClass("focus");
				$("#insClosetCancle").removeClass("focus");
				$("#insCloset").addClass("inputfocus");
			}
		} else if (pop == 2) {
			if (loc != 0) {
				loc = 0;
				$("#modClosetBtn").removeClass("focus");
				$("#modClosetCancle").removeClass("focus");
				$("#modCloset").addClass("inputfocus");
			}
		} else if (pop == 3) {
			if (loc != 0) {
				loc = 0;
				$("#modCodisetBtn").removeClass("focus");
				$("#modCodisetCancle").removeClass("focus");
				$("#modCodiset").addClass("inputfocus");
			}
		}
		alert("pop :" + pop + "|loc :" + loc);
		break;
	case tvKey.KEY_DOWN:
		alert("DOWN");
		if (pop == 0) {
			movePosition(3);
		} else if (pop == 1) {
			if (loc == 0) {
				loc = 1;
				$("#insCloset").removeClass("inputfocus");
				$("#insClosetBtn").addClass("focus");
			}
		} else if (pop == 2) {
			if (loc == 0) {
				loc = 1;
				$("#modCloset").removeClass("inputfocus");
				$("#modClosetBtn").addClass("focus");
			}
		} else if (pop == 3) {
			if (loc == 0) {
				loc = 1;
				$("#modCodiset").removeClass("inputfocus");
				$("#modCodisetBtn").addClass("focus");
			}
		}
		alert("pop :" + pop + "|loc :" + loc);
		break;
	case tvKey.KEY_ENTER:
	case tvKey.KEY_PANEL_ENTER:
		alert("ENTER");
		if (pop == 1) {
			if (loc == 0) {
				alert("Ins :popup div->input focus");
				imeInsertCloset._focus();
				$("#insCloset").focus();
				$("#insCloset").removeClass("inputfocus");
			} else if (loc == 1) {
				add_closet();
				$("#insClosetBtn").removeClass("focus");
				$("#insClosetCancle").removeClass("focus");
				hidePop();
			} else if (loc == 2) {
				$("#insClosetBtn").removeClass("focus");
				$("#insClosetCancle").removeClass("focus");
				hidePop();
			}
		} else if (pop == 2) {
			if (loc == 0) {
				alert("Mod C:popup div->input focus");
				imeModifyCloset._focus();
				$("#modCloset").focus();
				$("#modCloset").removeClass("inputfocus");
			} else if (loc == 1) {
				mod_closet();
				hidePop();
				$("#modClosetBtn").removeClass("focus");
				$("#modClosetCancle").removeClass("focus");
			} else if (loc == 2) {
				hidePop();
				$("#modClosetBtn").removeClass("focus");
				$("#modClosetCancle").removeClass("focus");
			}
		} else if (pop == 3) {
			if (loc == 0) {
				alert("Mod CS:popup div->input focus");
				imeModifyCodiset._focus();
				$("#modCodiset").focus();
				$("#modCodiset").removeClass("inputfocus");
			} else if (loc == 1) {
				mod_codiset();
				hidePop();
				$("#modCodisetBtn").removeClass("focus");
				$("#modCodisetCancle").removeClass("focus");
			} else if (loc == 2) {
				hidePop();
				$("#modCodisetBtn").removeClass("focus");
				$("#modCodisetCancle").removeClass("focus");
			}
		} else if (pop == 4) {
			if (loc == 1) {
				$("#delClosetBtn").removeClass("focus");
				$("#delClosetCancle").removeClass("focus");
				del_closet();
				hidePop();
			} else if (loc == 2) {
				$("#delClosetBtn").removeClass("focus");
				$("#delClosetCancle").removeClass("focus");
				hidePop();
			}
		} else if (pop == 5) {
			if (loc == 1) {
				$("#delCodisetBtn").removeClass("focus");
				$("#delCodisetCancle").removeClass("focus");
				del_codiset();
				hidePop('#deleteCodiset');
			} else if (loc == 2) {
				$("#delCodisetBtn").removeClass("focus");
				$("#delCodisetCancle").removeClass("focus");
				hidePop();
			}
		}
		alert("pop :" + pop + "|loc :" + loc);
		break;
	case tvKey.KEY_GREEN: // green
		alert("GREEN");

		if (position.x == 0) {
			$("#popup").show();
			$("#insertCloset").show();
			
			var str;
			
			alert(closetList);
			
			if(closetList!=null){
				str= "옷장"+(closetList.length+1);
			}else if(closetList==null){
				str = "옷장1";
			}
			
	
			
			
			pop = 1;
			$("#insCloset").addClass("inputfocus");
			$('#insCloset').val(str);
			// 
		} else if (position.x == 2) {
			if (position.y == 0) {
				// top Item
				sessionStorage.setItem('flag', 'top');
			} else if (position.y == 1) {
				// bot Item
				sessionStorage.setItem('flag', 'bot');
			}
			document.location.href = 'detail.html';
		}
		break;
	case tvKey.KEY_YELLOW: // yellow
		alert("YELLOW");
		if (position.x == 0) {
			$("#popup").show();
			$("#modifyCloset").show();
			pop = 2;
			$("#modCloset").addClass("inputfocus");
			document.getElementById('modCloset').value = $(
					$('#closetView div')[position.y]).html();
		} else if (position.x == 1) {
			$("#popup").show();
			$("#modifyCodiset").show();
			pop = 3;
			$("#modCodiset").addClass("inputfocus");
			document.getElementById('modCodiset').value = $(
					$('#codiView div')[position.y]).html();
		}
		break;
	case tvKey.KEY_BLUE: // blue
		alert('BLUE');
		if (position.x == 0) {
			arr = $('#closetView div');
			
				if(arr.length > 0){

					$("#popup").show();
					$("#deleteCloset").show();
					pop = 4;
					loc = 1;
					$("#delClosetBtn").addClass("focus");
					$("#delCloset").html(
							"[" + $($('#closetView div')[position.y]).html()
									+ " ] 을 제거 하시겠습니까 ?");
				
				}
			} else if (position.x == 1) {
			$("#popup").show();
			$("#deleteCodiset").show();
			pop = 5;
			loc = 1;
			$("#delCodisetBtn").addClass("focus");
			$("#delCodiset").html(
					"[" + $($('#codiView div')[position.y]).html()
							+ " ] 을 제거 하시겠습니까 ?");
		}
		break;
	break;
case tvKey.KEY_RED:
	alert("RED");
	if (position.x < 3) {
		document.location.href = 'recommend.html';
	}
default:
	alert("Unhandled key");
	break;
}
};
function hidePop() {
	$("#popup").hide();
	$("#insertCloset").hide();
	$("#modifyCloset").hide();
	$("#modifyCodiset").hide();
	$("#deleteCloset").hide();
	$("#deleteCodiset").hide();

	$('#insClosetBtn').removeClass('focus');
	$('#modClosetBtn').removeClass('focus');
	$('#modCodisetBtn').removeClass('focus');
	$('#delClosetBtn').removeClass('focus');
	$('#delCodisetBtn').removeClass('focus');

	$('#insClosetCancle').removeClass('focus');
	$('#modClosetCancle').removeClass('focus');
	$('#modCodisetCancle').removeClass('focus');
	$('#delClosetCancle').removeClass('focus');
	$('#delCodisetCancle').removeClass('focus');

	pop = 0;
	loc = 0;
}
function alertMsg(msg) {
	alert("alertMsg() start");
	$("#confirm").html(msg);
	$("#confirm").show();
	setTimeout(function() {
		$("#confirm").hide();
	}, 1000);
	

	alert("alertMsg() end");
};
function replaceClosetView(direction) {  //refer up or down
	alert('replaceClosetView() start');
	
	arr = $('#closetView div');

	var cid = $(arr[position.y]).attr('id');

	var pivot = -1;

	if (direction == 0) {
		// up
		if (cid != closetList[0].cid) {
			for ( var i = 0; i < closetList.length; i++) {
				// find closetList's index

				if (cid == closetList[i].cid) {
					pivot = i;
					break;
				}
			}

			$('#closetView').empty();

			for ( var i = (pivot - 1); i < (pivot + 6); i++) {
				var item = $('<div/>', {
					id : closetList[i].cid,
					text : closetList[i].cname,
					class : 'listItem movingDiv'
				});

				$('#closetView').append(item);
			}

			arr = $('#closetView div');
			$(arr[1]).css('background-color', 'rgba(255,255,255,0.5)');
			position.y = 1;
			sessionStorage.setItem('cid', $(arr[1]).attr('id'));
			
			$('#closetUp').attr('hidden',false);
			$('#closetDown').attr('hidden',false);
			
			
		}else{
			arr = $('#closetView div');
			arr.css('background-color', 'rgba(255,255,255,0.1)');
			$(arr[position.y]).css('background-color', 'rgba(255,255,255,0.5)');
			sessionStorage.setItem('cid', $(arr[position.y]).attr('id'));
			
			$('#closetUp').attr('hidden',true);
			$('#closetDown').attr('hidden',false);
		}

	} else if (direction == 1) {
		if (cid != (closetList[closetList.length - 1].cid)) {
			for ( var i = 0; i < closetList.length; i++) {
				// find closetList's index

				if (cid == closetList[i].cid) {
					pivot = i;
					break;
				}
			}

			$('#closetView').empty();

			for ( var i = (pivot - 5); i < (pivot + 2); i++) {
				var item = $('<div/>', {
					id : closetList[i].cid,
					text : closetList[i].cname,
					class : 'listItem movingDiv'
				});

				$('#closetView').append(item);
			}

			arr = $('#closetView div');
			$(arr[5]).css('background-color', 'rgba(255,255,255,0.5)');
			position.y = 5;
			sessionStorage.setItem('cid', $(arr[5]).attr('id'));
			
			$('#closetDown').attr('hidden',false);
			$('#closetUp').attr('hidden',false);
		}else{
			
			arr = $('#closetView div');
			arr.css('background-color', 'rgba(255,255,255,0.1)');
			$(arr[position.y]).css('background-color', 'rgba(255,255,255,0.5)');
			sessionStorage.setItem('cid', $(arr[position.y]).attr('id'));
			$('#closetDown').attr('hidden',true);
			$('#closetUp').attr('hidden',false);
		}
	}else if(direction == 2){
			//in case position.y == -1
			//refresh to end of closetList
			$('#closetView').empty();
			var len = closetList.length;
			for ( var i = (len-7); i < len; i++) {

					var item = $('<div/>', {
						id : closetList[i].cid,
						text : closetList[i].cname,
						class : 'listItem movingDiv'
					});

					$('#closetView').append(item);

				}
			arr = $('#closetView div');
			$(arr[6]).css('background-color', 'rgba(255,255,255,0.5)');
			position.y = 6;
			sessionStorage.setItem('cid', $(arr[6]).attr('id'));
			
			$('#closetUp').attr('hidden',false);
			$('#closetDown').attr('hidden',true);
		}else if(direction == 3){
			//in case position.y == 7
			//refresh to end of closetList
			$('#closetView').empty();
			var len = closetList.length;
			for ( var i = 0; i < 7; i++) {

					var item = $('<div/>', {
						id : closetList[i].cid,
						text : closetList[i].cname,
						class : 'listItem movingDiv'
					});

					$('#closetView').append(item);

				}
			arr = $('#closetView div');
			$(arr[0]).css('background-color', 'rgba(255,255,255,0.5)');
			position.y = 0;
			sessionStorage.setItem('cid', $(arr[0]).attr('id'));


			$('#closetUp').attr('hidden',true);
			$('#closetDown').attr('hidden',false);
		}
	
	alert('replaceClosetView() end');
	}
	
function replaceCodisetView(direction){
	alert('replaceCodisetView() start');
	
	var csArr = $('#codiView div');
	
	var csid = $(csArr[position.y]).attr('id');
	var pivot = -1;

	if (direction == 0) {
		// up
		if (csid != codisetList[0].csid) {
			for ( var i = 0; i < codisetList.length; i++) {
				// find closetList's index

				if (csid == codisetList[i].csid) {
					pivot = i;
					break;
				}
			}

			$('#codiView').empty();

			for ( var i = (pivot - 1); i < (pivot + 4); i++) {
				var item = $('<div/>', {
					id : codisetList[i].csid,
					text : codisetList[i].csname,
					class : 'listItem movingDiv'
				});

				$('#codiView').append(item);
			}

			arr = $('#codiView div');
			$(arr[1]).css('background-color', 'rgba(255,255,255,0.5)');
			position.y = 1;
			sessionStorage.setItem('csid', $(arr[1]).attr('id'));
			
			$('#codiDown').attr('hidden',false);
			$('#codiUp').attr('hidden',false);

		}else{
			arr = $('#codiView div');
			arr.css('background-color', 'rgba(255,255,255,0.1)');
			$(arr[position.y]).css('background-color', 'rgba(255,255,255,0.5)');
			sessionStorage.setItem('csid', $(arr[position.y]).attr('id'));
			
			$('#codiDown').attr('hidden',false);
			$('#codiUp').attr('hidden',true);

		}

	} else if (direction == 1) {
		if (csid != (codisetList[codisetList.length - 1].csid)) {
			for ( var i = 0; i < codisetList.length; i++) {
				// find closetList's index

				if (csid == codisetList[i].csid) {
					pivot = i;
					break;
				}
			}

			$('#codiView').empty();

			for ( var i = (pivot - 3); i < (pivot + 2); i++) {
				var item = $('<div/>', {
					id : codisetList[i].csid,
					text : codisetList[i].csname,
					class : 'listItem movingDiv'
				});

				$('#codiView').append(item);
			}

			arr = $('#codiView div');
			$(arr[3]).css('background-color', 'rgba(255,255,255,0.5)');
			position.y = 3;
			sessionStorage.setItem('csid', $(arr[position.y]).attr('id'));

			$('#codiUp').attr('hidden',false);
			$('#codiDown').attr('hidden',false);

		}else{
			
			arr = $('#codiView div');
			arr.css('background-color', 'rgba(255,255,255,0.1)');
			$(arr[position.y]).css('background-color', 'rgba(255,255,255,0.5)');
			sessionStorage.setItem('csid', $(arr[position.y]).attr('id'));
			
			$('#codiDown').attr('hidden',true);
			$('#codiUp').attr('hidden',false);

		}
	}else if(direction == 2){
			//in case position.y == -1
			//refresh to end of closetList
			$('#codiView').empty();
			var len = codisetList.length;
			for ( var i = (len-5); i < len; i++) {

					var item = $('<div/>', {
						id : codisetList[i].csid,
						text : codisetList[i].csname,
						class : 'listItem movingDiv'
					});

					$('#codiView').append(item);

				}
			arr = $('#codiView div');
			$(arr[4]).css('background-color', 'rgba(255,255,255,0.5)');
			position.y = 4;
			sessionStorage.setItem('csid', $(arr[position.y]).attr('id'));
		
			$('#codiUp').attr('hidden',false);
			$('#codiDown').attr('hidden',true);
			
	}else if(direction == 3){
			//in case position.y == 7
			//refresh to end of closetList
			$('#codiView').empty();
			var len = codisetList.length;
			for ( var i = 0; i < 5; i++) {

					var item = $('<div/>', {
						id : codisetList[i].csid,
						text : codisetList[i].csname,
						class : 'listItem movingDiv'
					});

					$('#codiView').append(item);

				}
			arr = $('#codiView div');
			$(arr[0]).css('background-color', 'rgba(255,255,255,0.5)');
			position.y = 0;
			sessionStorage.setItem('csid', $(arr[0]).attr('id'));
			
			$('#codiDown').attr('hidden',false);
			$('#codiUp').attr('hidden',true);
		}
	
	
	alert('replaceCodisetView() end');
}	
	
