(function(window){
	function Progress($progressBar,$progressLine,$progressDot){
		return new Progress.prototype.init($progressBar,$progressLine,$progressDot);
	}
	Progress.prototype = {
		constructor:Progress,
		musicList:[],
		init : function($progressBar,$progressLine,$progressDot){
			this.$progressBar = $progressBar;
			this.$progressLine = $progressLine;
			this.$progressDot = $progressDot;
		},
		progressClick:function(){
			var $this = this;
			//监听背景的点击
			this.$progressBar.click(function(event){
				//获取背景距离窗口默认的位置
				var normalLeft=$(this).offset().left;
				//获取点击的位置距离窗口的位置
				var eventLeft=event.pageX;
				//设置前景的宽度
				$this.$progressLine.css("width",eventLeft-normalLeft);
				$this.$progressDot.css("left",eventLeft-normalLeft);

			})
		},
		progressMove:function(){
			var $this = this;
			//1.监听鼠标的按下事件
			this.$progressBar.mousedown(function(){
				//获取背景距离窗口默认的位置
				var normalLeft=$(this).offset().left;
			
				//2.监听鼠标的移动事件
				$(document).mousemove(function(event){
					//获取点击的位置距离窗口的位置
					var eventLeft=event.pageX;
					//设置前景的宽度
					$this.$progressLine.css("width",eventLeft-normalLeft);
					$this.$progressDot.css("left",eventLeft-normalLeft);
				});
			});
				//3.监听鼠标的抬起事件
				$(document).mouseup(function(){
					$(document).off("mousemove")
				});
			
		}
	}
	Progress.prototype.init.prototype = Progress.prototype;
	window.Progress = Progress;
})(window)