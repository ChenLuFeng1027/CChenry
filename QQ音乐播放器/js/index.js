$(function(){

	//0.自定义滚动条
	$(".content_list").mCustomScrollbar();
	var $audio = $('audio');
	var player = new Player($audio);
	var $progressBar = $(".music_progress_bar");
	var $progressLine = $(".music_progress_line");
	var $progressDot = $(".music_progress_dot");
	var progress = Progress($progressBar,$progressLine,$progressDot);
	progress.progressClick();
	progress.progressMove();
	//1.加载歌曲列表
	getPlayerList();
	function getPlayerList(){
		$.ajax({
			url:"../source/music.json",
			dataType:"json",
			success:function(data){
				player.musicList = data;
				var $musicList = $(".content_list ul");
				$.each(data,function(index,ele){
					var $item = crateMusic(index,ele);
					$musicList.append($item);
				});
				initMusicInfo(data[0]);
			},
			error:function(e){
				console.log(e);
			}
		})
	}
	//2.初始化歌曲信息
	function initMusicInfo(music){
		//获取对应的元素
		var $musicImage = $(".song_info_pic img");
		var $musicName = $(".song_info_name a");
		var $musicSinger = $(".song_info_singer a");
		var $musicAblum = $(".song_info_ablum a");
		var $musicProgressName = $(".music_progress_name");
		var $musicProgressTime = $(".music_progress_time");
		var $musicBg = $(".mask_bg");
		//给获取到的元素赋值
		$musicImage.attr("src",music.cover);
		$musicName.text(music.name);
		$musicSinger.text(music.singer);
		$musicAblum.text(music.album);
		$musicProgressName.text(music.name+"/"+music.singer);
		$musicProgressTime.text("00:00"+"/"+music.time);
		$musicBg.css("background","url('"+music.cover+"')")
	}
	//2.初始化事件监听
	initEvents();
	function initEvents(){
		//1.监听歌曲的移入移除shijian
		$(".content_list").delegate(".list_music","mouseenter",function(){
				//显示子菜单
				$(this).find(".list_menu").stop().fadeIn(100);
				$(this).find(".list_time a").stop().fadeIn(100);
				//隐藏时长
				$(this).find(".list_time span").stop().fadeOut(100);
		});
		$(".content_list").delegate(".list_music","mouseleave",function(){
				$(this).find(".list_menu").stop().fadeOut(100);
				$(this).find(".list_time a").stop().fadeOut(100);
				$(this).find(".list_time span").stop().fadeIn(100);
		});
		
		//2.监听复选框的点击事件
		$(".content_list").delegate(".list_check","click",function(){
			$(this).toggleClass("list_checked")
		});
		//3.添加子菜单播放按钮的监听
		var $musicPlay = $(".music_play");
		$(".content_list").delegate(".list_menu_play","click",function(){
			var $item = $(this).parents(".list_music");
			// console.log($item.get(0).index);
			// console.log($item.get(0).music);
			//3.1切换播放图标
			$(this).toggleClass("list_menu_play2");
			//3.2复原其他图标
			$item.siblings().find(".list_menu_play").removeClass("list_menu_play2");
			//3.3同步地步播放按钮
			if($(this).attr("class").indexOf("list_menu_play2")!=-1){
				//当前子菜单是播放状态
				$musicPlay.addClass("music_play2");
				//让文字高亮
				$item.find("div").css("color","#fff");
				$item.siblings().find("div").css("color","rgba(255,255,255,0.5)")
			}else{
				//当前子菜单不是播放状态
				$musicPlay.removeClass("music_play2");
				//让文字不高亮
				$item.find("div").css("color","rgba(255,255,255,0.5)");
			}
			//3.4切换序号状态
			$item.find(".list_number").toggleClass("list_number2")
			$item.siblings().find(".list_number").removeClass("list_number2")
			//3.5播放音乐
			player.playMusic($item.get(0).index,$item.get(0).music);
			//3.6切换歌曲信息
			initMusicInfo($item.get(0).music);
		});
		//4.监听底部控制区域播放按钮的点击(有问题)
		$musicPlay.click(function(){
			//判断有没有播放过音乐
			if(player.currentIndex == -1){
				//没有播放过音乐
				$(".list_music").eq(0).find(".list_menu_play").trigger("click");
			}else{
				//播放过音乐
				$(".list_music").eq(player.currentIndex).find(".list_menu_play").trigger("click");
			}
		});
		//5.监听底部控制区域上一首按钮的点击(有问题)
		$(".music_pre").click(function(){
			$(".list_music").eq(player.preIndex()).find(".list_menu_play").trigger("click");
		});
		//6.监听底部控制区域下一首按钮的点击(有问题)
		$(".music_next").click(function(){
			$(".list_music").eq(player.nextIndex()).find(".list_menu_play").trigger("click");
		});
		//7.监听删除按钮的点击
		$(".content_list").delegate(".list_menu-del","click",function(){
			//找到被点击的音乐
			var $item = $(this).parents(".list_music");
			//判断当前删除的是否正则播放
			if($item.get(0).index == player.currentIndex){
				$(".music_next").trigger("click");
			}
			$item.remove();
			player.changeMusic($item.get(0).index);
			//重新排序
			$(".list_music").each(function(index,ele){
				ele.index = index;
				$(ele).find(".list_number").text(index+1);
			});
		});
		//8.监听播放的进度
		player.$audio.on("timeupdate",function(){
			// console.log(player.getMusicDuration(),player.getMusicCurrentTime());
			var duration = player.getMusicDuration();
			var currentTime = player.getMusicCurrentTime();
			var timeStr = formatDate(currentTime,duration);
			// console.log(timeStr);
			$(".music_progress_time").text(timeStr);
		});
	}
	//定义一个方法创建一条音乐
	function crateMusic(index,music){
		var $item = $("<li class=\"list_music\">\n"+
							"<div class=\"list_check\"><i></i></div>\n"+
							"<div class=\"list_number\">"+(index+1)+"</div>\n"+
							"<div class=\"list_name\">"+music.name+"\n"+
								"<div class=\"list_menu\">\n"+
									"<a href=\"javascript:;\" title=\"播放\" class=\"list_menu_play\"></a>\n"+
									"<a href=\"javascript:;\" title=\"添加\"></a>\n"+
									"<a href=\"javascript:;\" title=\"下载\"></a>\n"+
									"<a href=\"javascript:;\" title=\"分享\"></a>\n"+
								"</div>\n"+
							"</div>\n"+
							"<div class=\"list_singer\">"+music.singer+"</div>\n"+
							"<div class=\"list_time\">\n"+
								"<span>"+music.time+"</span>\n"+
								"<a href=\"javascript:;\" title=\"删除\" class=\"list_menu-del\"></a>\n"+
							"</div>\n"+
						"</li>");
		$item.get(0).index = index;
		$item.get(0).music = music;
		return $item;
	}
	//定义一个格式化时间的方法
	function formatDate(currentTime,duration){
		var endMin = parseInt(duration/60);
		var endSec = parseInt(duration%60);
		if(endMin < 10){
			endMin = "0"+endMin;
		}
		if(endSec < 10){
			endSec = "0"+endSec;
		}

		var startMin = parseInt(currentTime/60);
		var startSec = parseInt(currentTime%60);
		if(startMin < 10){
			startMin = "0"+startMin;
		}
		if(startSec < 10){
			startSec = "0"+startSec;
		}
		// if((startMin+":"+startSec)==(endMin+":"+endSec)){
		// 	$("music_next").trigger("click");
		// }
		return startMin+":"+startSec+"/"+endMin+":"+endSec;
	}
	var $welcome = $(".welcome");
	setTimeout(function(){
			$welcome.addClass("zoomOutUp");
		},5000);
});