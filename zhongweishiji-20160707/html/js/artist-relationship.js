var myScroll;
var Artist = {
	/*
	初始化
	 */
	init: function() {
		var _this = this;
		$('.j-commentGood').on('tap', function() {
			// 显示隐藏点赞评论
			_this.showComment($(this));
		})
		$(document).on('touchstart', function() {
			$('.j-commentGood').next().removeClass('cur');
		})
		$('.j-praise').on('tap', function() {
			// 点赞
			_this.clickPraise($(this));
		})
		$('.j-comment').on('tap', function(e) {
			// 获取评论框焦点
			var that = $(this);
			e.stopPropagation();
			_this.writeComment();
			$('.j-sub').off().on('tap', function() {
				// 提交评论
				_this.submitComment(that);
			})
		})
		$('.j-artist-video').on('tap', function() {
			var src = $(this).find('img').attr('data-url'),
				img = $(this).find('img').attr('src')
			_this.playVideo(src, img);
		})
		_this.isHideCommentText();
		_this.loadList();
		_this.isPraise();
		_this.initPhotoSwipeFromDOM('.j-pic');
		Base.wechatShareDilog();
		Base.artShare();
	},
	/*
	上拉加载更多艺术家状态
	 */
	myScroll: function() {
		upIcon = $("#up-icon"),
			distance = 30; //滑动距离
		myScroll = new IScroll('#wrapper', {
			probeType: 3,
			mouseWheel: true,
			click :true
		});
		// 上拉滑动事件
		myScroll.on("slideUp", function() {
			if (this.maxScrollY - this.y > distance) {
				upAjax();
			}
		});

		function upAjax() {
			var params = {};
			/*$.ajax({
				type: "post",
				url: "url",
				data: params,
				dataType: "json",
				success: function(data){*/
			var len = 5;
			var content = "";
			myScroll.refresh();
			/*}
			})*/
		}
		if (Base.getQueryString('id') != null) {
			myScroll.scrollTo(0, -$('#' + Base.getQueryString('id')).offset().top);
		}

	},
	/*
		点击图片状态显示图集
	 */
	clickPic: function(that) {
		var $picBox = that.parent();
		var $picList = $picBox.find('span');
		var html = '<div class="artist-container"><div class="swiper-wrapper">';
			for (var i = 0; i < $picList.length; i++) {
				html += '<div class="swiper-slide"><img src="' + $picList.eq(i).find('img').attr('src').split('@')[0] + '" alt=""></div>'
			}
			html += '</div></div>';
		$('body').append(html);

		var swiper = new Swiper('.artist-container', {
			paginationClickable: true,
			loop: false
		});
		swiper.slideTo(that.index(), 0, false);
		$('.artist-container').css({
			'z-index': '5'
		}).click(function() {
			$(this).css({
				'z-index': '-1'
			})
			$('.artist-container').remove();
			swiper = null;
		});
	},
	/*
		显示隐藏评论点赞条
	 */
	showComment: function(that) {
		that.next().toggleClass('cur');
	},
	/*
		点赞功能
	 */
	clickPraise: function(that) {
		var _this = this;
		/*var data = {
			
		};
		$.ajax({
			type: "post",
			url: '/Artcircles/like/4',
			dataType: json,
			data: data,
			cache: false,
			success: function(data) {
				if (data.like) {
					that.removeClass('cur').html('取消赞');
					_this.isPraise(that);
				} else if (data.canclelike) {
					that.addClass('cur').html('<img src="images/artist_icon02.png" alt="">赞');
					_this.isPraise(that);
				} else {

				}
			}
		});*/
		that.parent().removeClass('cur');
		if (that.hasClass('cur') == true) {
			that.removeClass('cur').html('取消赞');
			that.parents('.artist-list').find('.j-redHeart').html('1')
			_this.isPraise(that);
			return false;
		} else {
			that.addClass('cur').html('<img width="21" height="18" src="images/artist_icon02.png" alt="">赞');
			that.parents('.artist-list').find('.j-redHeart').html('0')
			_this.isPraise(that);
			return false;
		}

	},
	/*
		评论文本的展示与收起
	 */
	isHideCommentText: function() {
		var $commentText = $('.j-commentText');
		for (var i = 0; i < $commentText.size(); i++) {
			if ($commentText.eq(i).height() > 70) {
				$commentText.eq(i).addClass('txt').next().removeClass('hide')
			}
		}
		$('.j-commentMore').off().on('tap', function() {
			if ($(this).hasClass('cur') == true) {
				$(this).removeClass('cur').html('展开').prev().addClass('txt');
				myScroll.refresh();
				return false;
			} else {
				$(this).addClass('cur').html('收起').prev().removeClass('txt');
				myScroll.refresh();
				return false;
			}
		})
	},
	/*
		写评论的输入框
	 */
	writeComment: function() {
		$('.artist-footer').removeClass('hide').find('input').focus();
		$('#scroller').on('tap', function(e) {
			e.stopPropagation();
			$('.artist-footer').addClass('hide').find('input').blur();
		})
		$('.artist-commentGood dd').removeClass('cur');
	},
	/*
		提交评论
	 */
	submitComment: function(that) {
		var _this = this;
		if (Base.isLogin() == false) {
			return false;
		}
		var text = $.trim($('.j-text').val());
		if (text == '') {
			$('.j-text').val('');
			return false;
		}
		/*$.ajax({
			type: "post",
			url: '',
			dataType: json,
			data: data,
			cache: false,
			success: function(data) {
				if(data){*/
		var $addPosition = that.parents('.artist-list').find('.j-redHeart').parent();
		var $replyBox = that.parents('.artist-list').find('.artist-reply-box');
		var html = '<div class="list j-list">' +
			'<dl>' +
			'<dt><img width="21" height="21" src="images/header.jpg" alt=""></dt>' +
			'<dd>' +
			'<h3>赛季</h3>' +
			'<p class="j-commentText">' + text + '</p>' +
			'<em class="more j-commentMore hide">展开</em>' +
			'<p class="time">2016-08-11 14:32</p>' +
			'</dd>' +
			'</dl>' +
			'</div>'

		$addPosition.after(html);
		$('.j-text').val('').parent().addClass('hide').find('input').blur();
		$replyBox.removeClass('hide');
		_this.isHideCommentText();
		_this.isPraiseComment(that);
		myScroll.refresh();
		/*	}
			}
		});*/
	},
	/*
		加载更多评论
	 */
	loadList: function(artistList) {
		var _this = this;
		var SHOWLISTNUM = 2;
		var redHeartHeight = null;
		var $artistList = artistList || $('.artist-list');
		for (var i = 0; i < $artistList.size(); i++) {
			if ($artistList.eq(i).find('.j-list').size() > SHOWLISTNUM) {
				redHeartHeight = $artistList.eq(i).find('.j-redHeart').parent().hasClass('hide') ? 0 : 41;
				$artistList.eq(i).find('.j-list-more').removeClass('hide').addClass('cur')
					.off().on('tap', function() {
						if ($(this).hasClass('cur') == true) {
							$(this).removeClass('cur');
							$(this).parents('.artist-reply').height('auto');
							myScroll.refresh();
							return false;
						} else {
							$(this).addClass('cur');
							$(this).parents('.artist-reply').height($(this).parents('.artist-reply').find('.j-list').eq(0).height() + $(this).parents('.artist-reply').find('.j-list').eq(1).height() + redHeartHeight);
							myScroll.refresh();
							return false;
						}
					});
				$artistList.eq(i).find('.artist-reply').height($artistList.eq(i).find('.j-list').eq(0).height() + $artistList.eq(i).find('.j-list').eq(1).height() + redHeartHeight);
			} else {
				$artistList.eq(i).find('.j-list-more').addClass('hide');
				$artistList.eq(i).find('.artist-reply').height('auto');
			}
		}

	},
	/*
		是否显示评论块，（没评论的时候不显示）
	 */
	isPraiseComment: function(that) {
		var _this = this;
		var getListNum = that.parents('.artist-list').find('.j-list').size();
		var $redHeart = that.parents('.artist-list').find('.j-redHeart').parent();
		var $reply = that.parents('.artist-list').find('.artist-reply-box');
		var $listMore = that.parents('.artist-list').find('.j-list-more');
		var getListNums = null;
		var $redHearts = null;
		if (that.length > 1) {
			for (var i = 0; i < that.length; i++) {
				getListNums = that.eq(i).parents('.artist-list').find('.j-list').size();
				$redHearts = that.eq(i).parents('.artist-list').find('.j-redHeart').parent();
				$replys = that.eq(i).parents('.artist-list').find('.artist-reply-box');
				if (getListNums <= 0 && $redHearts.hasClass('hide') == true) {
					$replys.addClass('hide').find('.artist-reply').addClass('cur');
				} else {
					if (getListNums <= 0) {
						$replys.removeClass('hide').find('.artist-reply').addClass('cur');
						$redHearts.removeClass('list');
					} else if (getListNums > 2) {
						$listMore.removeClass('hide');
						$replys.removeClass('hide').find('.artist-reply').removeClass('cur');
						_this.loadList(that.parents('.artist-list'));
					} else if (getListNums > 0 && getListNums <= 2) {
						$replys.removeClass('hide').find('.artist-reply').addClass('cur');
					} else {
						$replys.removeClass('hide').find('.artist-reply').removeClass('cur');
					}

				}
			}
			return false;
		}
		if (getListNum <= 0 && $redHeart.hasClass('hide') == true) {
			$reply.addClass('hide').find('.artist-reply').addClass('cur');
		} else {
			if (getListNum <= 0) {
				$reply.removeClass('hide').find('.artist-reply').addClass('cur');
				$redHeart.removeClass('list');
			} else if (getListNum > 2) {
				$listMore.removeClass('hide');
				$reply.removeClass('hide').find('.artist-reply').removeClass('cur');
				_this.loadList(that.parents('.artist-list'));
			} else if (getListNum > 0 && getListNum <= 2) {
				$reply.removeClass('hide').find('.artist-reply').addClass('cur');
			} else {
				$reply.removeClass('hide').find('.artist-reply').removeClass('cur');
			}
		}

	},
	/*
		显示隐藏点赞之后的红心以及数量
	 */
	isPraise: function(that) {
		var that = that || $('.j-redHeart');
		var $redHeart = that.parents('.artist-list').find('.j-redHeart');
		var getListNum = that.parents('.artist-list').find('.j-list');
		var praiseNum = parseInt($redHeart.html());
		var praiseNums = null;
		var $redHearts = null;
		if (that.length > 1) {
			for (var i = 0; i < that.length; i++) {
				praiseNums = parseInt(that.eq(i).parents('.artist-list').find('.j-redHeart').html());
				$redHearts = that.eq(i).parents('.artist-list').find('.j-redHeart')
				if (praiseNums <= 0) {
					$redHearts.parent().addClass('hide');
				} else {
					$redHearts.parent().removeClass('hide');
					that.eq(i).parents('.artist-list').find('.j-praise').removeClass('cur').html('取消赞');
				}
			}
		} else {
			if (praiseNum <= 0) {
				$redHeart.parent().addClass('hide');

			} else {
				if (getListNum > 0) {
					$redHeart.parent().addClass('list');
				}
				$redHeart.parent().removeClass('hide');
			}
		}

		this.isPraiseComment(that);

	},
	/*
		播放视频
	 */
	playVideo: function(src, img) {
		$('#j-video').attr({
			'src': src,
			'poster': img
		});
		$('.dig-video').show();
		$('.dig-video-bg').on('tap', function() {
			$('.dig-video').hide();
			$('#j-video').attr({
				'src': '',
				'poster': ''
			});
		});
		$('#j-video').on('tap', function() {
			document.getElementById('j-video').play();
		})
	},
	/*
		显示图集并加载功能
	 */
	initPhotoSwipeFromDOM: function(gallerySelector) {
		// parse slide data (url, title, size ...) from DOM elements
		// (children of gallerySelector)
		var parseThumbnailElements = function(el) {
			var thumbElements = el.childNodes,
				numNodes = thumbElements.length,
				items = [],
				figureEl,
				linkEl,
				size,
				item;

			for (var i = 0; i < numNodes; i++) {

				figureEl = thumbElements[i]; // <figure> element

				// include only element nodes
				if (figureEl.nodeType !== 1) {
					continue;
				}

				linkEl = figureEl.children[0]; // <a> element

				size = linkEl.getAttribute('data-size').split('x');

				// create slide object
				item = {
					src: linkEl.getAttribute('href'),
					w: parseInt(size[0], 10),
					h: parseInt(size[1], 10)
				};



				if (figureEl.children.length > 1) {
					// <figcaption> content
					item.title = figureEl.children[1].innerHTML;
				}

				if (linkEl.children.length > 0) {
					// <img> thumbnail element, retrieving thumbnail url
					item.msrc = linkEl.children[0].getAttribute('src');
				}

				item.el = figureEl; // save link to element for getThumbBoundsFn
				items.push(item);
			}

			return items;
		};

		// find nearest parent element
		var closest = function closest(el, fn) {
			return el && (fn(el) ? el : closest(el.parentNode, fn));
		};

		// triggers when user clicks on thumbnail
		var onThumbnailsClick = function(e) {
			e = e || window.event;
			e.preventDefault ? e.preventDefault() : e.returnValue = false;

			var eTarget = e.target || e.srcElement;

			// find root element of slide
			var clickedListItem = closest(eTarget, function(el) {
				return (el.tagName && el.tagName.toUpperCase() === 'SPAN');
			});

			if (!clickedListItem) {
				return;
			}

			// find index of clicked item by looping through all child nodes
			// alternatively, you may define index via data- attribute
			var clickedGallery = clickedListItem.parentNode,
				childNodes = clickedListItem.parentNode.childNodes,
				numChildNodes = childNodes.length,
				nodeIndex = 0,
				index;

			for (var i = 0; i < numChildNodes; i++) {
				if (childNodes[i].nodeType !== 1) {
					continue;
				}

				if (childNodes[i] === clickedListItem) {
					index = nodeIndex;
					break;
				}
				nodeIndex++;
			}



			if (index >= 0) {
				// open PhotoSwipe if valid index found
				openPhotoSwipe(index, clickedGallery);
			}
			return false;
		};

		var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
			var pswpElement = document.querySelectorAll('.pswp')[0],
				gallery,
				options,
				items;

			items = parseThumbnailElements(galleryElement);

			// define options (if needed)
			options = {

				// define gallery index (for URL)
				galleryUID: galleryElement.getAttribute('data-pswp-uid'),
				history: false,
				fullscreenEl: false,
				loop: false,
				getThumbBoundsFn: function(index) {
					// See Options -> getThumbBoundsFn section of documentation for more info
					var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
						pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
						rect = thumbnail.getBoundingClientRect();

					return {
						x: rect.left,
						y: rect.top + pageYScroll,
						w: rect.width
					};
				}

			};

			// PhotoSwipe opened from URL
			if (fromURL) {
				if (options.galleryPIDs) {
					// parse real index when custom PIDs are used
					// http://photoswipe.com/documentation/faq.html#custom-pid-in-url
					for (var j = 0; j < items.length; j++) {
						if (items[j].pid == index) {
							options.index = j;
							break;
						}
					}
				} else {
					// in URL indexes start from 1
					options.index = parseInt(index, 10) - 1;
				}
			} else {
				options.index = parseInt(index, 10);
			}

			// exit if index not found
			if (isNaN(options.index)) {
				return;
			}

			if (disableAnimation) {
				options.showAnimationDuration = 0;
			}

			// Pass data to PhotoSwipe and initialize it
			gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
			gallery.init();
		};

		// loop through all gallery elements and bind events
		var galleryElements = document.querySelectorAll(gallerySelector);

		for (var i = 0, l = galleryElements.length; i < l; i++) {
			galleryElements[i].setAttribute('data-pswp-uid', i + 1);
			galleryElements[i].onclick = onThumbnailsClick;
		}
	}
}
Artist.init();