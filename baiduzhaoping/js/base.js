// 图片数据
fontSize();
var imgData = [
	{'url':'images/arrow.png'},
	{'url':'images/orientation.png'},
	{'url':'images/baijiahao.png'},
	{'url':'images/bg.jpg'},
	{'url':'images/icon.png'},
	{'url':'images/step1_bg01.png'},
	{'url':'images/step1_bg02.png'},
	{'url':'images/step1_bg03.png'},
	{'url':'images/step1_bg04.png'},
	{'url':'images/step2_bg01.png'},
	{'url':'images/step2_bg02.png'},
	{'url':'images/step3_bg01.png'},
	{'url':'images/step4_bg01.png'},
	{'url':'images/step4_bg02.png'},
	{'url':'images/step4_bg03.png'},
	{'url':'images/step4_text0.png'},
	{'url':'images/step4_text1.png'},
	{'url':'images/step4_text2.png'},
	{'url':'images/step4_text3.png'},
	{'url':'images/step5_bg01.png'},
	{'url':'images/share.jpg'}
];
loadImg(imgData);
// showData();
var device = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
var clickEvtName = device ? 'tap' : 'click';

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
var browser = {
	versions: function () {
		var u = navigator.userAgent, app = navigator.appVersion;
		return { //移动终端浏览器版本信息
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
			android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
			iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
			iPad: u.indexOf('iPad') > -1 //是否iPad
		};
	}()
};

if (browser.versions.android) {
	$('.orientation_set').remove();
	$('html,body,#wrapper').css({
		height : $(window).height(),
		width : $(window).width()
	});
}    
function loadImg(imgData){
	var l=imgData.length;
	var jd=0;
	$.each(imgData,function(i){
		var newImg=new Image();
		newImg.onload = newImg.onerror =function(){
			jd+=100/l;
			$('.j_num').html((0.5 + jd) | 0);
			if(jd>99){
				setTimeout(function(){
					afterLoad();
				},200);
			}
		};
		newImg.src=imgData[i].url;
	})
}
$('.J_link').on(clickEvtName,function(){
	var src=$(this).attr('link');
	window.location.href=src;
});

// loading完后开始运行
function showData(){
	var musicUrl = $('#app_bgm').attr('src');
	loadSound(musicUrl); //调用
}

// 加载完毕后初次运行
function afterLoad(){
	$('#loading').hide();
	$('#wrapper').css('visibility','visible').addClass('active').show();
	swiperFun();
	setMusic();
	
	$('.step4_bg1 span').on('tap',function(){
		var index = $(this).index();
		$('.step4_box').show().find('img').attr('src','images/step4_text'+index+'.png');
		$(this).parent().hide();
	})
	$('.step4_box b').on('tap',function(){
		$(this).parent().hide().prev().show();

	})
}

// 定义加载音频文件的函数
function loadSound(url) {
	var request = new XMLHttpRequest(); //建立一个请求
	request.open('GET', url, true); //配置好请求类型，文件路径等
	request.onload = function() {
		// afterLoad();
		loadImg(imgData);
	};
	request.send();
	// afterLoad();
}

function scrollWrap(){
	new IScroll('#wrapper', {
		zoom: false,
		mouseWheel: true,
		bounce:false
	});
}

function swiperFun(){
	var mySwiper = new Swiper('#wrapper',{
		direction : 'vertical',
		noSwipingClass : 'stop-swiping',
		onTransitionStart:function(swiper){
			var index = swiper.activeIndex;
			if(index != 3){
				$('.step4_bg1').show();
				$('.step4_box').hide();
			}
			if(index == 4){
				$('.arrow').hide();
			}else{
				$('.arrow').show();
			}
		}
	});
}

function fontSize() {
	var b = document.documentElement, a = function() {
		var a = b.getBoundingClientRect().width;
		b.style.fontSize = .0625 * (640 <= a ? 640 : a) + "px"
	}, c = null;
	window.addEventListener("resize", function() {
		clearTimeout(c);
		c = setTimeout(a, 300)
	});
	a()
};

var _musicOn = true;
function setMusic(){
	// 背景音乐设置
	var _musicSwith = true,
		_musciIcon  = $('.music'),
		_music      = 'c3_rotate_360';
	_appBgm     = $('#app_bgm').get(0);
	_musciIcon.css('visibility','visible');
	_appBgm.play();
	_musciIcon.on(clickEvtName,function(e){
		e.preventDefault();
		if(_musicSwith){
			_appBgm.pause();
			$(this).removeClass(_music).addClass('stop');
			_musicSwith = false;
		}else{
			_appBgm.play();
			$(this).addClass(_music).removeClass('stop');
			_musicSwith = true;
		}
	});
	// 设置自动播放
	_appBgm.addEventListener('ended', function () {
		setTimeout(function () { _appBgm.play(); }, 300);
	}, false);

	$(window).on('touchstart',function(){
		if(_musicOn){
			_musicOn = false;
			_appBgm.play();
			_musciIcon.fadeIn();
		}
	})
}