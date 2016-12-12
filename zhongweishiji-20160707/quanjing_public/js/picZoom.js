var oldX, oldY, startX, startY, startWidth, startHeight, imgL, imgT;
var moveD;
var isMove = false;
var isZoom = false;
var lastClickTime = 0;

// 获取两点之间的距离
function get_distance(x1, y1, x2, y2) {
	return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2), 2);
}

function img_mousedown(e) {
	if (e.target.id != 'details_bigimg') return;

	if (e.touches.length == 1) {
		var nowTime = Math.round(new Date().getTime() / 1000);
		x = $('#details_bigimg').position().left;
		y = $('#details_bigimg').position().top;

		if (nowTime - lastClickTime < 1 && Math.abs(x - startX) < 20 && Math.abs(y - startY) < 20) {
			// 在1秒内连续点击同一地方。
			// alert('双击事件');

		}
		lastClickTime = nowTime;
	} else if (e.touches.length >= 2) {
		isMove = false;
		isZoom = true;
		x1 = e.touches[0].pageX;
		y1 = e.touches[0].pageY;
		x2 = e.touches[1].pageX;
		y2 = e.touches[1].pageY;

		startX = $('#details_bigimg').position().left;
		startY = $('#details_bigimg').position().top;
		startWidth = $('#details_bigimg').width();
		startHeight = $('#details_bigimg').height();

		moveD = get_distance(x1, y1, x2, y2);

		return;
	}

	isMove = true;
	oldX = e.touches[0].pageX;
	oldY = e.touches[0].pageY;
	startX = $('#details_bigimg').position().left;
	startY = $('#details_bigimg').position().top;
	startWidth = $('#details_bigimg').width();
	startHeight = $('#details_bigimg').height();
	e.preventDefault();
	e.stopPropagation();
	return false;
}

function img_mouseup(e) {
	if (e.target.id != 'details_bigimg') return;

	isZoom = false;
	isMove = false;
}

function img_mousemove(e) {
	if (isZoom) {
		//targetTouches changedTouches touches
		if (e.touches.length >= 2) {
			var x1, y1, x2, y2, d1;
			x1 = e.touches[0].pageX;
			y1 = e.touches[0].pageY;
			x2 = e.touches[1].pageX;
			y2 = e.touches[1].pageY;
			d1 = get_distance(x1, y1, x2, y2);
			var rate = d1 / moveD;
			var w = startWidth * rate;
			var h = startHeight * rate;
			imgL = (startWidth - w) / 2 + startX;
			imgT = (startHeight - h) / 2 + startY;

			if (w <= 200) {
				return false;
			}
			$('#details_bigimg').width(w);
			$('#details_bigimg').height(h);
			$('#details_bigimg').css('left', imgL + 'px');
			$('#details_bigimg').css('top', imgT + 'px');
		}
		return;
	}

	if (!isMove) return;
	x = e.changedTouches[0].pageX - oldX;
	y = e.changedTouches[0].pageY - oldY;
	imgL = x + startX;
	imgT = y + startY;
	var MARGIN_NUM = 20;

	if (imgL <= -startWidth + MARGIN_NUM || imgT <= -startHeight + MARGIN_NUM || imgL >= $(document).width() - MARGIN_NUM || imgT >= $(document).height() - MARGIN_NUM) {
		return false;
	}
	$('#details_bigimg').css('top', imgT + 'px');
	$('#details_bigimg').css('left', imgL + 'px');
}

document.onmousemove = function(e) {
		var e = e || event;
		e.cancelBubble = true;
		e.returnValue = false;
	}
	// 防止触发浏览器的整体拖动
document.body.addEventListener('touchmove', function(e) {
	e.preventDefault();
}, false);
document.addEventListener('touchstart', img_mousedown, false);
document.addEventListener('touchend', img_mouseup, false);
document.addEventListener('touchmove', img_mousemove, false);