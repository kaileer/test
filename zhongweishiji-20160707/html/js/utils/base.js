var device = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
var clickEvtName = device ? 'tap' : 'click';

document.addEventListener('touchmove', function(e) {
	e.preventDefault();
}, false);

var myscroll;

function scrollWrap() {
	myscroll = new IScroll('#wrapper', {
		zoom: false,
		scrollX: true,
		scrollY: true,
		mouseWheel: true,
		click: true,
		wheelAction: 'zoom',
		bounce: false
	});
}

var listScroll,
	upIcon = $("#up-icon"),
	downIcon = $("#down-icon"),
	distance = 30; //滑动距离

	listScroll = new IScroll('#wrapper', { probeType: 3, mouseWheel: true });

	listScroll.on("scroll",function(){
		var y = this.y,
			maxY = this.maxScrollY - y,
			downHasClass = downIcon.hasClass("reverse_icon"),
			upHasClass = upIcon.hasClass("reverse_icon");

		if(y >= distance){
			!downHasClass && downIcon.addClass("reverse_icon");
			return "";
		}else if(y < distance && y > 0){
			downHasClass && downIcon.removeClass("reverse_icon");
			return "";
		}

		if(maxY >= distance){
			!upHasClass && upIcon.addClass("reverse_icon");
			return "";
		}else if(maxY < distance && maxY >=0){
			upHasClass && upIcon.removeClass("reverse_icon");
			return "";
		}
	});

$('.J_link').on('click', function() {
	var href = $(this).attr('href');
	window.location.href = href;
})

$('.shop_list_video dl,.menu_video').on(clickEvtName, function() {
	var src = 'video/v0.mp4';
	// var src='<iframe frameborder="0" width="640" height="498" src="http://v.qq.com/iframe/player.html?vid=d03142ijfrv&tiny=0&auto=0" allowfullscreen></iframe>';
	var img = 'http://img2.imgtn.bdimg.com/it/u=556809797,1091274165&fm=21&gp=0.jpg';
	var html = '';

	if (src.indexOf('iframe') == -1) {
		html = '<div class="dig_video_bg"></div><video src="' + src + '" controls width="100%" poster="' + img + '" id="j_video"></video>';
		$('.dig_video').html(html).fadeIn(0);
		$('.dig_video_bg').on(clickEvtName, function() {
			$('.dig_video').fadeOut(0);
			document.getElementById('j_video').pause();
		});
		$('#j_video').on(clickEvtName, function() {
			document.getElementById('j_video').play();
		})
	} else {
		html = '<div class="dig_video_bg"></div><div class="dig_video_iframe">' + src + '</div>'
		$('.dig_video').html(html).fadeIn(0);
		$('.dig_video_bg').on(clickEvtName, function() {
			$('.dig_video').fadeOut(0);
		});
	}
})


var Base = (function() {

	function _isPhoneNumber(phone) {
		return (/^1[3|4|5|7|8][0-9]\d{8}$/.test(phone));
	};

	function _isWeiXin() {
		var userAgent = window.navigator.userAgent.toLowerCase();
		return userAgent.match(/MicroMessenger/i) ? true : false;
	};

	function _dialog(txt, fn) {
		var html = '<div class="container-dialog"><div class="bg"></div><div class="msg"><p class="txt">' + txt + '</p><div class="tfoot"> <span class="dialog_true">确定</span> <span class="dialog_close">先逛逛</span></div></div></div>';
		$('body').append(html);
		$('.dialog_close').on('click', function() {
			$(this).parents('.container-dialog').remove();
			return false;
		})
		$('.dialog_true').on(clickEvtName, fn)
	}

	function _promptBox(txt) {
		var html = '<div class="dig_box">' +
			'<div>' + txt + '</div>' +
			'</div>';
		$('body').append(html);
		setTimeout(function() {
			$('.dig_box').remove();
		}, 1500)
	}

	function _getQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return (r[2]);
		return null;
	}

	function _publicHead() {
		$('.publicHead .menuBtn').on('tap', function() {
			$(this).parent().next().toggleClass('cur');
		})
		$('.publicHead .returnBtn').on('tap', function() {
			window.history.back();
		})
	}

	function _wechatShareDilog() {
		var html = '<div class="wechat-layer j-wechat-layer hide">' +
			'<div class="txt">' +
			'点击右上角<br>进行分享' +
			'</div>' +
			'</div>'
		$('body').append(html);
	}

	function _artShare() {
		if (_isWeiXin() == true) {
			$(document).on('tap', '.j-artShare', function() {
				$('.j-wechat-layer').removeClass('hide').on('tap', function() {
					$(this).addClass('hide');
				});
			})
		}else{
			$(document).on('tap', '.j-artShare', function() {
				_promptBox('请使用浏览器自带分享方式');
			})
		}
	}

	function _isIndex(num) {
		// 是否有主页
		var isIndex = num || 0;
		if (isIndex == 1) {
			$('.artist-share .three').show().siblings().hide();
		} else {
			$('.artist-share .two').show().siblings().hide();
		}
	}

	function _isLogin() {
		// 是否登录
		return true;
	}

	return {
		isPhoneNumber: _isPhoneNumber,
		isWeiXin: _isWeiXin,
		dialog: _dialog,
		promptBox: _promptBox,
		getQueryString: _getQueryString,
		publicHead: _publicHead,
		wechatShareDilog: _wechatShareDilog,
		artShare: _artShare,
		isIndex: _isIndex,
		isLogin: _isLogin

	}
})()