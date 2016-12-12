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
				content += '<dl class="J_link" href="">'+
								'<dt><img src="images/header.jpg" alt=""></dt>'+
								'<dd class="text">欢迎来到白石画馆空中美术馆</dd>'+
								'<dd class="icon"></dd>'+
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

function downAjax(){
	
}
