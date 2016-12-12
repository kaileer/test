$(function(){
	getCode();
	$(".menuBtn").bind('click',function(){
	  $(".menuMain").toggle();
	});
})

/**
 * [getCode 获取验证码]
 */
function getCode(){
	var bState = true;
	var nCount = 60;
	var oTimer = null;
	$('.getCodeBtn').bind('click',function(){
		var $getCodeBtn = $(this);
		var bIsClick = $getCodeBtn.attr('data-isClick');
		if(bIsClick == "true"){
			console.log($(this).attr('data-isClick'));
			$getCodeBtn.attr('data-isClick','false');
			oTimer = setInterval(function(){
				if(nCount>0){
					--nCount;
					$getCodeBtn.html(nCount + 'S再次发送');
					$getCodeBtn.css({
						background: '#a3a3a3'
					})
				}
				else {
					clearInterval(oTimer);
					$getCodeBtn.attr('data-isClick','true');
					$getCodeBtn.html('获取验证码');
					$getCodeBtn.css({
						background: '#303030'
					})
					nCount = 60;
				}

			},1000);
			$.ajax({
				url: "Register/click",
				type: "post",
				aysnc:false,
				data: {

				},
				success: function(data) {

				},
				error: function(err) {

				}
			});
		}
	});
}

/**
 * [promptBox 提示框]
 * @param  {[type]} txt [提示文本]
 * @return {[type]}     [description]
 */
function promptBox(txt){
	var html='<div class="dig_box"><div>'+txt+'</div></div>';
	$('body').append(html);
	setTimeout(function(){
		$('.dig_box').remove();
	},1500)
}