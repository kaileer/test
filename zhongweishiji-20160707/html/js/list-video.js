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
				content += '<dl>'+	// "<li>"+ d.response.shopList[i].shopName +"</li>"
								'<dt><img src="" alt=""></dt>'+
								'<dd>'+
									'<h3>《松间逸趣松间逸趣趣…》</h3>'+
									'<p>作者：林家卫</p>'+
									'<div>'+
										'<span>纸本设色</span>'+
										'<s></s>'+
										'<span>35×46cm</span>'+
									'</div>'+
								'</dd>'+
							'</dl>'
			}
			$('.J_list').append(content);
			listScroll.refresh();
		/*},
		error: function(xhr, type){
			$('.J_list').html('数据请求失败，请重新刷新');
		}
	})*/
}

/*function downAjax(){
	
}*/
