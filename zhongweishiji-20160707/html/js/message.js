var Message = {
	init : function(){
		var _this = this;
		Base.publicHead()
		$('.message-tab li').on('tap',function(){
			_this.navTab($(this));
		})
	},
	navTab : function(_this){
		var index=_this.index();
		_this.addClass('cur').siblings().removeClass('cur');
		$('.j-list').eq(index).removeClass('hide').siblings('.j-list').addClass('hide');
	}
}
Message.init();