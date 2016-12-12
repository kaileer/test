// 下拉刷新事件
/*listScroll.on("slideDown",function(){
	if(this.y > distance){
		// downAjax();
		upIcon.removeClass("reverse_icon")
	}
});*/

// 上拉滑动事件
listScroll.on("slideUp",function(){
	if(this.maxScrollY - this.y > distance){
		upAjax();
		upIcon.removeClass("reverse_icon")
	}
});
function upAjax(){
	var params = {};
	/*$.ajax({
		type: "post",
		url: "url",
		data: params,
		dataType: "json",
		success: function(data){*/
			var len=5;
			var content = "";
			for(var i=0;i<len;i++){
				content += '<dl>'+
								'<dt><img src="images/header.jpg" alt=""></dt>'+
								'<dd>'+
									'<h3>《松间逸趣松间逸趣趣…》</h3>'+
									'<p>作者：林家卫</p>'+
									'<p>未知：纸本设色</p>'+
									'<p>规格：35×46cm</p>'+
								'</dd>'+
							'</dl>'
			}
			$('.J_list').append(content);
			$('.J_list dt').css('height',$('.J_list dt').eq(0).width()+'px');
			listScroll.refresh();
		/*},
		error: function(xhr, type){
			$('.J_list').html('数据请求失败，请重新刷新');
		}
	})*/
}

/*function downAjax(){
	
}*/
