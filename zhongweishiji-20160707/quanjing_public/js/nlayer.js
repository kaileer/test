fontSize();

function closeLayer() {
	$('.poplayer').removeClass('amt');
}

$('.J_link').on('click', function() {
	var href = $(this).attr('href');
	window.location.href = href;
})

$('.step1').on('tap', function() {
	$('.step1 span').removeClass('amt').parent().addClass('amt');
	setTimeout(function() {
		$('.step1').remove();
	}, 1500)
})

$('.j-help').on('tap', function(){
	$('.help-box').show().on('tap', function(){
		$(this).hide();
	})
})

function xmlcallback(obj) {
	$('.poplayer').addClass('amt');
	$('.poplayer').find('.four').click(function(){
		closeLayer();
		$('.details_pic').off();
	})
	var html='<p><i class="btn_bigimg">查看原图</i></p><h3>'+spotArr[obj]['tit']+'</h3><h3>作者：<span>'+spotArr[obj]['name']+'</span></h3>'+spotArr[obj]['size'];
	$('.pop img').attr('src','');
	$('.pop img').attr('src','hot/'+obj+'.jpg');
	$('.pop div').html(html);
	$('.pop_btn_shop').on('click',function(){
		window.location.href=btnUrl[n];
	})

	loadImg($('.details_pic img').attr('src'));
}

function fontSize() {
	var b = document.documentElement,
		a = function() {
			var a = b.getBoundingClientRect().width;
			b.style.fontSize = .0625 * (640 <= a ? 640 : a) + "px"
		},
		c = null;
	window.addEventListener("resize", function() {
		clearTimeout(c);
		c = setTimeout(a, 300);
	});
	a()
};

function loadImg(isrc) {
	var Img = new Image();
	Img.onload = function() {
		seeBigImg(this.src, this.width, this.height);
	};
	Img.src = isrc;
}

function seeBigImg(s, w, h) {
	$('.details_pic,.btn_bigimg').off().on('tap', function() {
		$('.bigImg').show();
		$('.bigImg img').attr('src', s);
		var pmW = window.innerWidth;
		var pmH = window.innerHeight;
		var imgWidth, imgHeight;
		var bi = w / h;
		if (bi >= 1) { // 判断图片的形状
			imgWidth = pmW;
			imgHeight = pmW / bi;
		} else {
			if (bi * pmH > pmW) {
				imgWidth = pmW;
				imgHeight = pmW / bi;
			} else {
				imgWidth = bi * pmH;
				imgHeight = pmH;
			}
		}
		$('.bigImg img').css({
			width: imgWidth,
			height: imgHeight
		});

		var l = (pmW - imgWidth) / 2;
		var t = (pmH - imgHeight) / 2;

		$('.bigImg img').css({
			'left': l,
			'top': t
		});
	})
	$('.bigImg').on('tap', function() {
		$('.bigImg').hide();
		$('.bigImg img').removeAttr('style').attr('src', '');
	})
}