$(function() {
	
	function getCookies(key){
		var part = document.cookie.split(";");
		var kv = {};
		for(var i = 0, l = part.length; i < l; i++){
			var p = part[i];
			$_kv = p.split("=");
			var k = $.trim($_kv[0]);
			kv[k] = decodeURIComponent($_kv[1]);
		}
		return kv[key];
	}
	//回到顶部
	$(".to-top").click(function() {
		$('html,body').animate({
			scrollTop: '0px'
		}, 500);
	})

	// 头部向下滚隐藏
	var scrollValue = $(window).scrollTop(),
		outerHeight = $(".g-header").outerHeight();
	window.onscroll = function() {
		var scrollTop = $(window).scrollTop();
		if(scrollTop > 0) {
			$(".g-header").addClass("header-scroll");
//			$(".to-top").stop(true,true).fadeIn();
//			$("#logo").stop().animate({'width':'90px','margin-top':'7px'},500,'linear');
		} else {
			$(".g-header").removeClass("header-scroll");
//			$("#logo").stop().animate({'width':'130px','margin-top':'0'},500,'linear');
//			$(".to-top").stop(true,true).fadeOut()
		}
		
		//滚动到底部时才显示回到顶部按钮
		if(scrollTop+$(window).height()==$('body').height()){
			$(".to-top").stop(true,true).fadeIn();
		}else{
			$(".to-top").stop(true,true).fadeOut()
		}
		
		if(scrollTop > outerHeight && scrollTop > scrollValue) {
			$(".g-header").removeClass("header-show").addClass("header-hide")
		} else {
			scrollTop + $(window).height() < $(document).height() && $(".g-header").removeClass("header-hide").addClass("header-show");
		}
		scrollValue = scrollTop;
	}
	
	//脚部微信图标效果
	
	$("#show-weixin").mouseover(function(){
		$(this).find('.iconfont').addClass('animated rubberBand').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			$(this).removeClass('animated rubberBand')
		});
	})
	
	 //图片列表特效
	$(window).on("load scroll",function(){
		var scrollTop = $(window).scrollTop();
		var WinH = $(window).height();
		$(".img-ani").each(function(index, item) {
			if(scrollTop > $(this).offset().top - WinH * 1 && scrollTop < $(this).offset().top - WinH * 1 + WinH + WinH * 0.2) {
				$(this).addClass("view");
			} else {
				$(this).removeClass("view");
			}
		});
	})
	
	//
	var initParallaxScroll = function() {
		$(document).ready(function() {
			$window = $(window);
			$('[data-type="parallaxScroll"]').each(function() {
				var e = $(this), i = e.offset(), n = i.top, a = e.outerHeight(), o = e.data("bgheight"), r;
				if (o) {
					r = o > a ? o - a : 0
				}
				$(window).scroll(function() {
//					if (t)
//						return false;
					if ($window.scrollTop() + $window.height() > n + a / 2 && n + a > $window.scrollTop()) {
						var i = -(($window.scrollTop() + $window.height() - n) / e.data("speed"))
						  , o = i;
						if (r >= 0) {
							o = Math.abs(i) < r ? i : -r
						}
						var s = "50% " + o + "px";
						e.css({
							backgroundPosition: s+',center',
							transition: "background-position 0.3s linear"
						})
					}
				})
			});
//			var e = $("#mod-wrap-free");
//			$window.on("resize", function() {
//				var t = $window.width();
//				if (t > 1920 || t <= 768) {
//					e.css("background-size", "cover")
//				} else {
//					e.css("background-size", "1920px 650px")
//				}
//			})
		})
	}
	
	initParallaxScroll();
		// 判断是否已经点赞
	$(".btn-like").each(function(){
		var $this = $(this);
		var postID = $this.data("post-id");
		if(!postID){
			return;
		}
		var supportLS = window.localStorage !== undefined;
		var key = "red_likes";
		var ids;
		if(supportLS){
			var idsStr = window.localStorage.getItem(key);
		}else{
			var idsStr = getCookies(key);
		}
		if(idsStr){
			ids = idsStr.split(",");
			if(ids.indexOf(postID.toString()) !== -1){
				$this.addClass("liked");
				return;
			}
		}
	});
	// 点赞
	$(".btn-like").on("click", function() {
		var $this = $(this);
		var action = $this.data("action");
		var postID = $this.data("post-id");
		var supportLS = window.localStorage !== undefined;
		var key = "red_likes";
		var ids;
		if(!postID || !action) {
			return;
		}
		// 判断有没重复点赞
		if(supportLS) {
			var idsStr = window.localStorage.getItem(key);
			if(idsStr) {
				ids = idsStr.split(",");
				if(ids.indexOf(postID.toString()) !== -1) {
					layer.msg('',{
						skin: 'layer-green',//自定义layer Ui
						content:'<i class="iconfont" style="margin-right:5px;font-size:24px;font-weight:normal;">&#xe60d;</i> 你已经赞过了',
					});
					return false;
				}
				if(ids.length > 500) {
					ids.setItem(key, "");
				}
			}
		}
		
//	赞文章的异步操作,需后端接口支持
//		$.post(action, {
//			support_ls: supportLS ? 1 : 0,
//			post_id: postID
//		}, function(data) {
//			if(data.status < 0) {
//				alert(data.message);
//				return false;
//			}
//			$this.addClass("liked");
//			if(supportLS) {
//				idsStr = window.localStorage.getItem(key);
//				if(!idsStr) {
//					ids = [];
//				} else {
//					ids = idsStr.split(",");
//				}
//				ids.push(postID);
//				window.localStorage.setItem(key, ids.join(","));
//			}
//		}, "json");

/////////////////////////////////////
		$this.addClass("liked");//TODO 添加接口后取消上面的注释,并删除这部分代码
		if(supportLS) {
			idsStr = window.localStorage.getItem(key);
			if(!idsStr) {
				ids = [];
			} else {
				ids = idsStr.split(",");
			}
			ids.push(postID);
			window.localStorage.setItem(key, ids.join(","));
		}
//////////////////////////////////////		
		
		
		return false;
	});
});

/**
 * 计算滚动条宽度的方法
 */
function getScrollWidth() {
	var noScroll, scroll, oDiv = document.createElement("DIV");
	oDiv.style.cssText = "position:absolute; top:-1000px; width:100px; height:100px; overflow:hidden;";
	noScroll = document.body.appendChild(oDiv).clientWidth;
	oDiv.style.overflowY = "scroll";
	scroll = oDiv.clientWidth;
	document.body.removeChild(oDiv);
	return noScroll - scroll;
}