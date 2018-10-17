window.onload=function(){
			var ul=document.getElementsByTagName('ul')[0];
			var lis=ul.children;
			var shouye=document.getElementsByClassName('shouye')[0];
			var lanmu=document.getElementsByClassName('lanmu')[0];
			var zixun=document.getElementsByClassName('zixun')[0];
			var user=document.getElementsByClassName('user')[0];
			lis[0].onclick=function(){
				shouye.setAttribute("class","show");
				lanmu.setAttribute("class","hide");
				zixun.setAttribute("class","hide");
				user.setAttribute("class","hide");
			}
			lis[1].onclick=function(){
				shouye.setAttribute("class","hide");
				lanmu.setAttribute("class","show");
				zixun.setAttribute("class","hide");
				user.setAttribute("class","hide");
			}
			lis[2].onclick=function(){
				shouye.setAttribute("class","hide");
				lanmu.setAttribute("class","hide");
				zixun.setAttribute("class","show");
				user.setAttribute("class","hide");
			}
			lis[3].onclick=function(){
				shouye.setAttribute("class","hide");
				lanmu.setAttribute("class","hide");
				zixun.setAttribute("class","hide");
				user.setAttribute("class","show");
			}

		}
		$(function(){
			// $(".left").height($(window).innerheight());
			// $(".right").height($(window).innerheight());

			$('#container1').highcharts({
	            title: {
	                text: 'Monthly Average Temperature',
	                x: -20 //center
	            },
	            subtitle: {
	                text: 'Source: WorldClimate.com',
	                x: -20
	            },
	            xAxis: {
	                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
	                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
	            },
	            yAxis: {
	                title: {
	                    text: 'Temperature (°C)'
	                },
	                plotLines: [{
	                    value: 0,
	                    width: 1,
	                    color: '#808080'
	                }]
	            },
	            tooltip: {
	                valueSuffix: '°C'
	            },
	            legend: {
	                layout: 'vertical',
	                align: 'right',
	                verticalAlign: 'middle',
	                borderWidth: 0
	            },
	            series: [{
	                name: 'Tokyo',
	                data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
	            },{
	                name: 'Berlin',
	                data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
	            }]
	        });
		    // 栏目
		    $(".btn_suc").click(function(){
		    	var o = {};
		    	$.get("http://120.78.164.247:8099/manager/category/findAllCategory",o)
		    });
		    $.get("http://120.78.164.247:8099/manager/user/findAllUser",function(result){
		    	// console.log(result);
		    	var data = result.data;
		    	for(index in data){
		    		var data1 = data[0];
		    		var data2 = data[1];		    		
		    		var data3 = data[2];		    		
		    		var data4 = data[3];		    		
		    		var data5 = data[4];		    		
		    	}
		    	// console.log("111",data4);
		    	$(".um_1 table :nth-child(1) :nth-child(1) :nth-child(2)").text(data1.username);
	    		$(".um_1 table :nth-child(1) :nth-child(2) :nth-child(2)").text(data1.nickname);
	    		$(".um_1 table :nth-child(1) :nth-child(3) :nth-child(2)").text(data1.password);
	    		$(".um_1 table :nth-child(1) :nth-child(4) :nth-child(2)").text(data1.email);
	    		$(".um_2 table :nth-child(1) :nth-child(1) :nth-child(2)").text(data2.username);
	    		$(".um_2 table :nth-child(1) :nth-child(2) :nth-child(2)").text(data2.nickname);
	    		$(".um_2 table :nth-child(1) :nth-child(3) :nth-child(2)").text(data2.password);
	    		$(".um_2 table :nth-child(1) :nth-child(4) :nth-child(2)").text(data2.email);
	    		$(".um_3 table :nth-child(1) :nth-child(1) :nth-child(2)").text(data3.username);
	    		$(".um_3 table :nth-child(1) :nth-child(2) :nth-child(2)").text(data3.nickname);
	    		$(".um_3 table :nth-child(1) :nth-child(3) :nth-child(2)").text(data3.password);
	    		$(".um_3 table :nth-child(1) :nth-child(4) :nth-child(2)").text(data3.email);
	    		$(".um_4 table :nth-child(1) :nth-child(1) :nth-child(2)").text(data4.username);
	    		$(".um_4 table :nth-child(1) :nth-child(2) :nth-child(2)").text(data4.nickname);
	    		$(".um_4 table :nth-child(1) :nth-child(3) :nth-child(2)").text(data4.password);
	    		$(".um_4 table :nth-child(1) :nth-child(4) :nth-child(2)").text(data4.email);
	    		$(".um_5 table :nth-child(1) :nth-child(1) :nth-child(2)").text(data5.username);
	    		$(".um_5 table :nth-child(1) :nth-child(2) :nth-child(2)").text(data5.nickname);
	    		$(".um_5 table :nth-child(1) :nth-child(3) :nth-child(2)").text(data5.password);
	    		$(".um_5 table :nth-child(1) :nth-child(4) :nth-child(2)").text(data5.email);
		    });
		    $(".myClose").click(function(){
		    	$(".modal").modal("hide");
		    });
		    //新增
		    $(".btn_1").click(function(){
		    	// $.get("http://120.78.164.247:8099/manager/category/findAllCategory",function(result){
			    	// var data = result.data;
			    	// console.log(data);
			    	var obj1 = {};
			    	obj1.name = $(".ipt_1").val();
			    	obj1.comment = $(".ipt_2").val();
			    	obj1.no = $(".ipt_3").val();
			    	console.log(obj1);
			    	$(".btn_suc1").click(function(){
			    		console.log(obj1);			    		
			    		$.post("http://120.78.164.247:8099/manager/category/saveOrUpdateCategory",obj1,function(results){
			    			console.log(results)
			    		});
			    		$.get("http://120.78.164.247:8099/manager/category/findAllCategory",function(data){
			    			console.log(data);
			    		});
			    		var tr = "<tr><td><input type='checkbox'></td><td>"+obj1.name+"</td><td>"+obj1.comment+"</td><td>"+obj1.no+"</td><td><button class='xg' data-toggle='modal' data-target='.modal2'>修改</button><button class='sc'>删除</button></td></tr>";
			    		console.log(tr);
			    		$(".tb_1").append(tr);
			    	});
			    	
		   	 	// });
		    });
		    //批量删除
		    $(".btn_2").click(function(){
				var inputs = document.getElementsByTagName('input');
						var arr = [];
						arr.slice.call(inputs,0).forEach(function(item,index){
						if(item.checked){
							$(".tb_1")[0].removeChild(item.parentNode.parentNode);
						}
					})
			});
		    //删除
	    	$(".tb_1").click(function(event){
	    		var target = event.target;
	    		if(target.className=="sc"){
	    			$(".tb_1")[0].removeChild(target.parentNode.parentNode);
	    		}
	    	});
		    //修改
		    $(".xg").click(function(event){
		    	var lmname = $(".ipt_4").val();
		    	console.log(lmname);
		    	var parent = $(".ipt_5").val();
		    	var ms = $(".ipt_6").val();
		    	// console.log(event.target);
		    	var oldtr=event.target.parentNode.parentNode;
		    	console.log(oldtr);
		    	$(".btn_suc2").click(function(){
		    		var newtr = "<tr><td><input type='checkbox'></td><td>"+lmname+"</td><td>"+parent+"</td><td>"+ms+"</td><td><button class='xg' data-toggle='modal' data-target='.modal2'>修改</button class='sc'><button>删除</button></td></tr>";
		    		console.log(newtr)
		    		$(oldtr).replaceWith($(newtr));

		    	})
		    })
		    
    });
		