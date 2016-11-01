// 图片数据
fontSize();
var imgData = [
	{'url':'images/orientation.png'},
	{'url':'images/logo.png'},
	{'url':'images/bg.png'},
	{'url':'images/music_bg.png'},
	{'url':'images/load_bg1.png'},
	{'url':'images/logo.png'},
	{'url':'images/share.jpg'},
	{'url':'images/step1_bg1.png'},
	{'url':'images/step1_bg2.png'},
	{'url':'images/step1_bg3.png'},
	{'url':'images/step1_bg4.png'},
	{'url':'images/step1_bg5.png'},
	{'url':'images/step1_bg6.png'},
	{'url':'images/step2_bg1.png'},
	{'url':'images/step2_bg2.png'},
	{'url':'images/step2_bg3.png'},
	{'url':'images/step2_bg4.png'},
	{'url':'images/step2_bg5.png'},
	{'url':'images/step2_bg6.png'},
	{'url':'images/step3_bg1.png'},
	{'url':'images/step3_bg2.png'},
	{'url':'images/step3_bg3.png'},
	{'url':'images/step3_bg4.png'},
	{'url':'images/step3_bg5.png'},
	{'url':'images/step3_bg6.png'},
	{'url':'images/step3_bg7.png'},
	{'url':'images/step4_bg1.png'},
	{'url':'images/step4_bg2.png'},
	{'url':'images/step4_bg3.png'},
	{'url':'images/step4_bg4.png'},
	{'url':'images/step4_bg5.png'},
	{'url':'images/step4_bg6.png'},
	{'url':'images/step5_bg1.png'},
	{'url':'images/step5_bg2.png'},
	{'url':'images/step5_bg3.png'},
	{'url':'images/step5_bg4.png'},
	{'url':'images/step5_bg5.png'},
	{'url':'images/step5_bg6.png'},
	{'url':'images/step5_bg7.png'},
	{'url':'images/step5_bg8.png'},
	{'url':'images/step5_bg9.png'},
	{'url':'images/step5_bg10.png'},
	{'url':'images/step5_bg11.png'},
	{'url':'images/step5_bg12.png'},
	{'url':'images/step5_bg13.png'},
	{'url':'images/step5_bg14.png'},
	{'url':'images/step6_bg0.png'},
	{'url':'images/step6_bg1.png'},
	{'url':'images/step6_bg2.png'},
	{'url':'images/step6_bg3.png'},
	{'url':'images/step6_bg4.png'},
	{'url':'images/step6_bg5.png'},
	{'url':'images/step6_bg6.png'},
	{'url':'images/step6_bg7.png'},
	{'url':'images/step6_bg8.png'},
	{'url':'images/step6_bg9.png'},
	{'url':'images/step6_bg10.png'},
	{'url':'images/step6_bg11.png'},
	{'url':'images/step6_bg12.png'},
	{'url':'images/step6_bg13.png'},
	{'url':'images/step7_bg1.png'},
	{'url':'images/step7_bg2.png'},
	{'url':'images/step7_bg3.png'},
	{'url':'images/step7_bg4.png'},
	{'url':'images/step7_bg5.png'},
	{'url':'images/step7_bg6.png'},
	{'url':'images/step8_bg1.png'},
	{'url':'images/step8_bg2.png'},
	{'url':'images/step8_bg3.png'},
	{'url':'images/step8_bg4.png'},
	{'url':'images/step8_bg5.png'},
	{'url':'images/step8_bg6.png'},
	{'url':'images/step8_bg7.png'},
	{'url':'images/step8_bg8.png'},
	{'url':'images/step8_bg9.png'},
	{'url':'images/step9_bg1.png'},
	{'url':'images/step9_bg2.png'},
	{'url':'images/step9_bg3.png'},
	{'url':'images/step6_bg14.png'},
	{'url':'images/step6_bg15.png'},
	{'url':'images/step5_bg15.png'},
	{'url':'images/step3_bg8.png'},
	{'url':'images/step3_bg9.png'},
	{'url':'images/step3_bg10.png'},
	{'url':'images/step9_bg4.png'}
];
var urlData=[
		'images/bgSound.mp3',
		'images/btnSound.mp3',
		'images/sound.mp3',
		'images/winSound1.mp3',
		'images/winSound2.mp3',
		'images/failSound.wav'
	];
// loadImg(imgData);
loadSound(urlData);
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

function scrollWrap(){
	new IScroll('#wrapper', {
		zoom: false,
		scrollX: true,
		scrollY: true,
		mouseWheel: true,
		wheelAction: 'zoom',
		bounce:false
	});
}

if (browser.versions.android) {
	$('.orientation_set').remove();
}


$('.J_link').on(clickEvtName,function(){
	var src=$(this).attr('link');
	window.location.href=src;
});

// 定义加载音频文件的函数
function loadSound(urlData) {
	var _num=0;
	$.each(urlData,function(i){
		var request = new XMLHttpRequest(); //建立一个请求
		request.open('GET', urlData[i], true); //配置好请求类型，文件路径等
		// 一旦获取完成，对音频进行进一步操作，比如解码
		request.onload = request.onerror = function() {
	//        alert('音乐加载完毕，即将开始播放~');
			_num++;
			//console.log(_num);
			if(_num==urlData.length){
				loadImg(imgData); // load images & do callback
				setMusic();
			}
		};
		request.send();
	});
	
}
function loadImg(imgData){
	var l=imgData.length;
	var jd=0;
	$.each(imgData,function(i){
		var newImg=new Image();
		newImg.onload = newImg.onerror =function(){
			jd+=100/l;
			// $('.j_num').html(jd+'%')
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


// 加载完毕后初次运行
function afterLoad(){
	$('#loading').hide();
	$('#wrapper').css('visibility','visible').show();
	// $('.music').css('visibility','visible');
	main.init();
}
function randomsort(a, b) {  
	return Math.random()>.5 ? -1 : 1;  
//用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1  
} 
var person=[];
var man=null;
var link=['http://e.mosh.cn/34928','http://e.mosh.cn/34931','http://e.mosh.cn/34932','http://e.mosh.cn/34930','http://e.mosh.cn/34929'];
var linkNum=null;
var gameNum=5;
var is=true;
var isMusic=true;
// 主程式
var main={
		init : function(){
			this.step1();
			this.step2();
			this.step3();
			this.step4();
			this.step5();
			this.step8();

			/*$('.step6').show();
			this.step6();*/
			$(document).on(clickEvtName,'.step5_bg4',function(){
				if($('.step6').css('display')=='block'){
					$('.music').css('display','none');
				}else{
					$('.music').css('display','block');
					// $('.bgSound').get(0).play();
					// $('.music').addClass('c3_rotate_360').removeClass('stop');
					// isMusic=true;
				}
				if($('.music').css('display')=='block'){
					$('.bgSound').get(0).play();
				}
			})

		},
		step1 : function(){
			$('.step1_bg4').on(clickEvtName,function(){
				$('.step2').show();
			})
			$('.step1_bg3,.step2_bg4').on(clickEvtName,function(){
				$('.step3').show();
			})
		},
		step2 : function(){
			$('.step2_bg3').on(clickEvtName,function(){
				$('.step2').hide();
			})
		},
		step3 : function(){
			
			for(var i=0;i<$('.switch').size();i++){
				if($('.switch').eq(i).data('is')==1){
					$('.step3 .man').eq(i).addClass('high').find('span').removeClass('gray');
				}else{
					$('.step3 .man').eq(i).removeClass('high').find('span').addClass('gray');
				}
			}
			$('.step3 .high').on(clickEvtName,function(){
				var index=$(this).index()+1;
				linkNum=index-1;
				// person.push(index);
				$('.step4_bg1 img').attr('src','images/step4_bg'+index+'.png').parents('.step4').show();
				person=[];
				man=null;
				person.push($('.step4_bg1 img').attr('src'));
				man=$('.step4_bg1 img').attr('src');
			})
		},
		step4 : function(){
			$('.step4_bg2').on(clickEvtName,function(){
				$('.step4').hide();
			})
			$('.step4_bg3').on(clickEvtName,function(){
				$('.step5').show();
			})
			
		},
		step5 : function(){
			var _this=this;
			$('.step5_bg2 span').on(clickEvtName,function(){
				var $em=$(this).find('em');
				var num=$(this).parent().find('.hover').size();
				console.log(num)
				if(num<=3){
					if($em.hasClass('hover')){
						$em.removeClass('hover');
						// $('.step5_bg4').addClass('gray');
						if(num==1){
							$('.step5_bg4').addClass('gray');
						}
					}else{
						if(num<3){
							$em.addClass('hover');
							if(num==0){
								$('.step5_bg4').removeClass('gray');
							}
						}
						
					}
				}
				if(!$('.step5_bg4').hasClass('gray')){
					$('.step5_bg4').unbind().bind(clickEvtName,function(){
						if($('.step5_bg2 .hover').size()<3){
							$('.step5_bg5').show().on(clickEvtName,function(){
								$(this).hide();
							});
							return false;
						}
						for(var i=0;i<$('.step5_bg2 .hover').size();i++){
							// person.push($('.step5_bg2 .hover').parent().eq(i).index())
							person.push($('.step5_bg2 .hover').prev().eq(i).attr('src'));
						}
						$('.step6').show();
						// if(isMusic){
							$('.bgSound').get(0).pause();
						// }
						_this.step6();
					})
				}else{
					$('.step5_bg4').off();
				}
				
			})
		},
		step6 : function(){
			var _that=this;
			var _signHtml="<div id='rotateWrap'>"+"<ul class='sign_num_box'>";
			for(var i=0;i<3;i++){
				var arr=person.sort(randomsort);
				_signHtml+="<li class='sign_num_list'>"+"<ol>";
				_signHtml+="<li><img src='images/step5_bg11.png' alt='' /><span></span></li>";
				for(var j=0;j<arr.length;j++){
					// if(arr[i]==person[0]){
					// 	_signHtml+="<li class='man'><img src='"+arr[j]+"' alt='' /></li>";
					// }else{
						_signHtml+="<li><img src='"+arr[j]+"' alt='' /><span></span></li>";
					// }
					
				}
				_signHtml+="<li><img src='images/step5_bg13.png' alt='' /><span></span></li>";		
				_signHtml+="</ol></li>";
			}					
			_signHtml+="</ul></div>";
			$(".step6_bg3").append(_signHtml);
			for(var i=0;i<$('.sign_num_list img').size();i++){
				if($('.sign_num_list img').eq(i).attr('src')==man){
					$('.sign_num_list img').eq(i).addClass('man');
				}
			}
			$('.step6_bg6').on(clickEvtName,function(){
				if(gameNum==0){
					return false;
				}
				if(is){
					if(isMusic){
						$('.sound').attr('src','images/sound.mp3');
						$('.sound').get(0).play();
					}
					
					/*$('.bgSound').get(0).pause();
					$('.sound').get(0).play();
					$('.sound').get(0).addEventListener('ended', function () {
						$('.sound').get(0).play();
					}, false);*/
					_that.lottery();
					is=false;
					setTimeout(function(){
						is=true;
					},6000)
				}
			})
			
			_that.step7();

		},
		lottery : function(){
			gameNum--;
			var isWin=null;
			var winNum='';
			var mobileNum = '';
			for(var i=0;i<$('.sign_num_list .man').size();i++){
				winNum+=$('.sign_num_list .man').parent().eq(i).index();
			}
			var d_s = Math.floor(Math.random()*(100-1+1)+1);
			d_s=9
			if (d_s >= 1 && d_s <= 90) {
				isWin=false;
			}else {
				isWin=true;
			}
			if(isWin){
				mobileNum=winNum;
			}else{
				for(var i=0;i<3;i++){
					mobileNum += Math.floor(Math.random()*(4-1+1)+1);
				}
			}
			var _that=this;
			var lottery_item   = $('.sign_num_list'),
				lottery_size   = lottery_item.size(),
				lottery_height = $('.sign_num_list li').height(),
				lottery_item_height = lottery_height*4,
				lottery_i      = 0,
				lottery_timer  = {},
				lottery_switch = true,
				lottery_stop_switch = true,
				mobileNumarr=[];
			if(mobileNum.length<2){
				mobileNum='00'+mobileNum;
			}else if(mobileNum.length<3){
				mobileNum='0'+mobileNum;
			}
			console.log(mobileNum);
			lottery_item.find('ol').height(lottery_item_height);
			lottery_item.find('ol>li').height(lottery_height);
			$('.step6_bg2 img').attr('src','images/step6_bg'+gameNum+'.png')
			setTimeout(function(){
				$('.sound').get(0).pause();
				if(isWin){
					if(isMusic){
						$('.winSound1').get(0).play();
					}
					
					$('.step6_bg8').show();
					$('.step6_bg5').removeClass('foot_amt').addClass('foot_amtSmall');
					setTimeout(function(){
						$('.step8').show();
						if(gameNum==0){
							$('.step8_bg4').off().addClass('gray');
						}
						
						$('.step6_bg5').removeClass('foot_amtSmall').addClass('foot_amt');
						if($('.step8').css('display')=='block'){
							$('.music').css('display','block');
						}else{
							$('.music').css('display','none');
							// $('.bgSound').get(0).play();
							// $('.music').addClass('c3_rotate_360').removeClass('stop');
							// isMusic=true;
						}
						if($('.music').css('display')=='block'){
							$('.bgSound').get(0).play();
						}
						
					},3000)
				}else{
					if(isMusic){
						$('.failSound').get(0).play();
					}
					
					/*setTimeout(function(){
						if(isMusic){
							$('.bgSound').get(0).play();
						}
					},2000)*/
					$('.step6_bg7').on(clickEvtName,function(){
							$('.step6,.step5,.step4,.step3,.step2').hide();
							// $('.step6_bg7').addClass('hover');
							$('.step6_bg3').html('');
							$('.step6_bg5').removeClass('foot_amtSmall').addClass('foot_amt');
							$('.step5_bg2 em').removeClass('hover');
							$('.step5_bg4').addClass('gray');
							$('.step6_bg8').hide();
							lottery_stop_switch=true;
							if($('.step6').css('display')=='block'){
								$('.music').css('display','none');
							}else{
								$('.music').css('display','block');
								// $('.bgSound').get(0).play();
								// $('.music').addClass('c3_rotate_360').removeClass('stop');
								// isMusic=true;
							}
							if($('.music').css('display')=='block'){
								$('.bgSound').get(0).play();
							}
						
					})
					// $('.step6_bg5').removeClass('foot_amtSmall').addClass('foot_amt');
				}
				
				$('.step8_bg5').attr('link',link[linkNum])
				$('.step6_bg7').removeClass('hover');
				
				
			},5500)
			lotteryTimerGo();
			setTimeout(function(){
				lotterNumber();
				setTimeout(function(){
					setTimeout(function(){
						lottery_switch = true;
					},1000)
				},1000);
			},5000);
			function lotteryTimerGo(){
				setTimeout(function(){
					lotteryRoll(lottery_i);
					lottery_i++;
					console.log(lottery_i);
					lottery_i >= lottery_size ? lottery_i = 0 : lotteryTimerGo();
				},500)
			}
			function lotteryRoll(j){
				var i = 0,
					_this = lottery_item.eq(j),
					_thisOl = _this.find('ol');
				lottery_timer[j] = setInterval(function(){
					i-=40;
					i < - lottery_item_height + lottery_height ? i=0 : i;
					_thisOl.css('top',i);
					
					if(lottery_stop_switch){
						if(j == lottery_i && parseInt(_thisOl.css('top')) + mobileNumarr[j] * lottery_height >= 0){
							// setTimeout(function(){
								lottery_i++;
								_thisOl.css('top', parseInt(mobileNumarr[j]) * -lottery_height+lottery_height*0.84);
								clearInterval(lottery_timer[j]);
								if(j==lottery_size-1){
									lottery_stop_switch=false;
								}
								if(gameNum<=0 && isWin==false){
									$('.step6_bg6').off()
									setTimeout(function(){
										$('.step9').show();
										$('.step6_bg6').off();
										$('.step6_bg7').off();
										setTimeout(function(){
											if($('.step9').css('display')=='block'){
												$('.music').css('display','block');
												
											}else{
												$('.music').css('display','none');
											}
											if($('.music').css('display')=='block'){
												$('.bgSound').get(0).play();
											}
										},500)
									},2000)
									
								}
							// },300);
						}
					}	
				},50);
			}
			function lotterNumber(){
				for(var i = 0; i < mobileNum.length; i++){
					mobileNumarr.push(mobileNum.charAt(i));
				};
				lottery_stop_switch = true;
			}
			$('.step8_bg4').on(clickEvtName,function(){
				$(this).parent().hide();
				if($('.step8').css('display')=='block'){
					$('.music').css('display','block');
				}else{
					$('.music').css('display','none');
					// $('.bgSound').get(0).play();
					// $('.music').addClass('c3_rotate_360').removeClass('stop');
					// isMusic=true;
				}
				if($('.music').css('display')=='block'){
					$('.bgSound').get(0).play();
				}
				$('.step6_bg6').removeClass('hover');
				// $('.step6_bg7').removeClass('hover');
				$('.step6_bg8').hide();
				$('.step6_bg5').removeClass('foot_amtSmall').addClass('foot_amt');
				lottery_stop_switch=true;
				// _that.lottery();
				// _that.step6();
				$('.step6_bg7').on(clickEvtName,function(){
						$('.step6,.step5,.step4,.step3,.step2').hide();
						// $('.step6_bg7').addClass('hover');
						$('.step6_bg3').html('');
						$('.step6_bg5').removeClass('foot_amtSmall').addClass('foot_amt');
						$('.step5_bg2 em').removeClass('hover');
						$('.step5_bg4').addClass('gray');
						$('.step6_bg8').hide();
						lottery_stop_switch=true;
					
				})
			})

		},
		step7 : function(){
			$('.step7_bg3').on(clickEvtName,function(){
				$(this).parent().hide();
			})
		},
		step8 : function(){
			$('.step8_bg3').on(clickEvtName,function(){
				$('.step7').show();
			})
			$('.step8_bg6').on(clickEvtName,function(){
				$('.step10').show().on(clickEvtName,function(){
					$(this).hide();
				});
			})
			$('.step9_bg4').on(clickEvtName,function(){
				$('.step11').show().on(clickEvtName,function(){
					$(this).hide();
				});
			})

		},
		step9 : function(){
			
		},
		game : function(){
			
		}
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

/* 音乐 */
var _musicOn = true;
function setMusic(){
    // 背景音乐设置
    var _musicSwith = true,
        _musciIcon  = $('.music'),
        _music      = 'c3_rotate_360'
    _appBgm     = $('.bgSound').get(0);
    _musciIcon.css('visibility','visible');
    _appBgm.play();
    _musciIcon.on(clickEvtName,function(e){
        e.preventDefault();
        if(_musicSwith){
            _appBgm.pause();
            $(this).removeClass(_music).addClass('stop');
            _musicSwith = false;
            isMusic=false;
        }else{
            _appBgm.play();
            $(this).addClass(_music).removeClass('stop');
            _musicSwith = true;
            isMusic=true;
        }
    });
    // 设置自动播放
    _appBgm.addEventListener('ended', function () {
        setTimeout(function () { _appBgm.play(); }, 300);
    }, false);

    /*$(window).on('touchstart',function(){
        if(_musicOn){
            _musicOn = false;
            _appBgm.play();
            _musciIcon.fadeIn();
        }
    })*/
}


