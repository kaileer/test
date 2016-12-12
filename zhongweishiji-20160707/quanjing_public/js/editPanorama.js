var allHotspot = {},
	pushSwitch = true,
	nowHotspot = '';

var K = document.getElementById("krpanoSWFObject"),
	oSubmit = document.getElementById('kr-submit'),
	oPictureName = document.getElementById('kr-pictureName'),
	oW = document.getElementById('kr-width'),
	oH = document.getElementById('kr-height'),
	oAth = document.getElementById('kr-ath'),
	oAtv = document.getElementById('kr-atv'),
	oRy = document.getElementById('kr-rx'),
	oRx = document.getElementById('kr-ry'),
	oRyT = document.getElementById('kr-rx-tx'),
	oRxT = document.getElementById('kr-ry-tx')

oSubmit.onclick = function() {
	setHotspotReview(nowHotspot, oW.value, oH.value, oAth.value, oAtv.value, oRx.value, oRy.value);

	/*$.ajax({
		type: 'POST',
		url: 'json.json',
		dataType: 'json',
		data: "data=" JSON.stringify(allHotspot),
		success: function(data) {
			console.log(data);
		},
	})*/
}

oRx.onchange = oRy.onchange = oRx.onmousemove = oRy.onmousemove = changeRxRy;

$(oRxT).on('DOMMouseScroll mousewheel change input keydown', function(e){
	changeRxtRyt(e, this);
}, false);
$(oRyT).on('DOMMouseScroll mousewheel change input keydown', function(e){
	changeRxtRyt(e, this);
}, false);

oW.onfocus = function(e) {
	var oldW = oW.value,
		oldH = oH.value
	$(this).on('DOMMouseScroll mousewheel change input keydown', function(e){
		changeWidth(e, oldW, oldH);
	}, false);
}

// 同步数据
function JsHotSync(name, width, height, ath, atv, rx, ry, pictureName) {

	if (!(name in allHotspot)) {
		allHotspot[name] = {
			name: name,
			width: width,
			height: height,
			ath: ath,
			atv: atv,
			rx: rx,
			ry: ry
		}
	}

	nowHotspot = name;
	oPictureName.value = pictureName;
	oW.value = width;
	oH.value = height;
	oAth.value = ath;
	oAtv.value = atv;
	oRxT.value = oRx.value = rx;
	oRyT.value = oRy.value = ry;
	allHotspot[name].ath = ath;
	allHotspot[name].atv = atv;
};

// 数据同步至kr & 本地的对象
function setHotspotReview(name, width, height, ath, atv, rx, ry) {
	if (!nowHotspot) return;
	// 同步数据到kr
	var _hot = 'hotspot[' + name + ']';
	K.set(_hot + '.width', width);
	K.set(_hot + '.height', height);
	K.set(_hot + '.ath', ath);
	K.set(_hot + '.atv', atv);
	K.set(_hot + '.rx', rx);
	K.set(_hot + '.ry', ry);
	// 同步数据到本地
	allHotspot[name].width = width;
	allHotspot[name].height = height;
	allHotspot[name].ath = ath;
	allHotspot[name].atv = atv;
	allHotspot[name].rx = rx;
	allHotspot[name].ry = ry;

};

// 网格
var arrGridding = [];

function getGridding(name) {
	arrGridding.push(name);
};

function getQueryString(name) {
	var param = decodeURIComponent(window.location.search);
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = param.substr(1).match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
}

function changeWidth(e, oldW, oldH) {
	var h;
	var STEP = 2;
	if (e.wheelDelta > 0 || e.keyCode == 38 || e.detail <0) {
		oW.value = parseInt(oW.value) + STEP;
	} else if (e.wheelDelta < 0 || e.keyCode == 40 || e.detail >0) {
		oW.value = parseInt(oW.value) - STEP;
	}
	h = oldH * oW.value / oldW;
	oH.value = h;
	setHotspotReview(nowHotspot, oW.value, oH.value, oAth.value, oAtv.value, oRx.value, oRy.value);
}

function changeRxtRyt(e,that){
	if (e.wheelDelta > 0 || e.keyCode == 38 || e.detail <0) {
		if(that.value >= 90){
			that.value = 90;
			return false;
		}
		that.value = Number(that.value) + 0.5;
	} else if (e.wheelDelta < 0 || e.keyCode == 40 || e.detail >0) {
		if(that.value <= -90){
			that.value = -90;
			return false;
		}
		that.value = Number(that.value) - 0.5;
	}
	oRx.value = oRxT.value;
	oRy.value = oRyT.value;
	setHotspotReview(nowHotspot, oW.value, oH.value, oAth.value, oAtv.value, oRx.value, oRy.value);
}

function changeRxRy(){
	oRxT.value = oRx.value;
	oRyT.value = oRy.value;
	setHotspotReview(nowHotspot, oW.value, oH.value, oAth.value, oAtv.value, oRx.value, oRy.value);
}

document.getElementById('kr-isShow').onclick = function() {
	if (this.innerHTML == '<img src="../quanjing_public/images/edit-icon08.png" alt="">隐藏参考线') {
		for (var i = 0; i < arrGridding.length; i++) {
			K.set('hotspot[' + arrGridding[i] + '].alpha', '0');
		}
		this.innerHTML = '<img src="../quanjing_public/images/edit-icon08.png" alt="">显示参考线';
	} else {
		for (var i = 0; i < arrGridding.length; i++) {
			K.set('hotspot[' + arrGridding[i] + '].alpha', '1');
		}
		this.innerHTML = '<img src="../quanjing_public/images/edit-icon08.png" alt="">隐藏参考线';
	}

}

$('#kr-help').on('click', function() {
	$('.help-video').show();
	$('#box').addClass('amt').find('.box-hide').html('<img src="../quanjing_public/images/edit-icon01.png" alt="">显示').prev().addClass('hide');
	$('.help-video .close').on('click', function() {
		$(this).parent().hide();
		document.getElementById('j_video').pause();
	})
})

$('.box-hide').on('click', function() {
	var $this = $(this).parent();
	$this.toggleClass('amt');
	$(this).prev().toggleClass('hide');
	if ($this.hasClass('amt')) {
		$(this).html('<img src="../quanjing_public/images/edit-icon01.png" alt="">显示');
	} else {
		$(this).html('<img src="../quanjing_public/images/edit-icon01.png" alt="">隐藏');
	}
})

$('#kr-add').on('click', function() {
	window.history.go(-1);
})

/*var editPanorama = (function(window, undefined){

})(window, undefined);*/