layui.config({
	base : "http://127.0.0.100/public/assets/js/"
}).use(['form','layer','jquery','laypage'],function(){
	var form = layui.form(),
		layer = parent.layer === undefined ? layui.layer : parent.layer,
		laypage = layui.laypage,
		$ = layui.jquery;

	//加载页面数据
	var usersData = '';
	$.get("viewAdminlog", function(data){
		usersData = JSON.parse(data);
		if(window.sessionStorage.getItem("addUser")){
			var addUser = window.sessionStorage.getItem("addUser");
			usersData = JSON.parse(addUser).concat(usersData);
		}
		//执行加载数据的方法
		usersList();
	})


	//数据读取处理
	function usersList(){
		//渲染数据
		function renderDate(data,curr){
			var dataHtml = '';
			currData = usersData.concat().splice(curr*nums-nums, nums);
			if(currData.length != 0){
				for(var i=0;i<currData.length;i++){
					dataHtml += '<tr>'
			    	+  '<td>'+currData[i].id+'</td>'
			    	+  '<td>'+currData[i].admin_id+'</td>'
			    	+  '<td>'+currData[i].username+'</td>'
			    	+  '<td>'+currData[i].url+'</td>'
			    	+  '<td>'+currData[i].title+'</td>'
			    	+  '<td>'+currData[i].content+'</td>'
			    	+  '<td>'+currData[i].ip+'</td>'
                    +  '<td>'+js_date_time(currData[i].createtime)+'</td>'
			    	+'</tr>';
				}
			}else{
				dataHtml = '<tr><td colspan="8">暂无数据</td></tr>';
			}
		    return dataHtml;
		}

		//分页
		var nums = 10; //每页出现的数据量
		laypage({
			cont : "page",
			pages : Math.ceil(usersData.length/nums),
			jump : function(obj){
				$(".users_content").html(renderDate(usersData,obj.curr));
				$('.users_list thead input[type="checkbox"]').prop("checked",false);
		    	form.render();
			}
		})
	}

	//时间戳转换年月日
    function js_date_time(unixtime) {
        var timestr = new Date(parseInt(unixtime) * 1000);
        var datetime = timestr.toLocaleString();
        return datetime;
    }
        
})