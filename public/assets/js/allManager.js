layui.config({
	base : "http://127.0.0.100/public/assets/js/"
}).use(['form','layer','jquery','laypage'],function(){
	var form = layui.form(),
		layer = parent.layer === undefined ? layui.layer : parent.layer,
		laypage = layui.laypage,
		$ = layui.jquery;

	//加载页面数据
	var usersData = '';
	$.get("viewManager", function(data){
		usersData = JSON.parse(data);
		if(window.sessionStorage.getItem("addUser")){
			var addUser = window.sessionStorage.getItem("addUser");
			usersData = JSON.parse(addUser).concat(usersData);
		}
		//执行加载数据的方法
		usersList();
	})



    //查看管理员日志
    $(".view_admin_log").click(function(){
        var index = layui.layer.open({
            title : "管理员日志",
            type : 2,
            content : "adminLog.html",
            success : function(layero, index){
                setTimeout(function(){view_admin_log
                    layui.layer.tips('点击此处返回会员列表', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                },500)
            }
        })
        //改变窗口大小时，重置弹窗的高度，防止超出可视区域（如F12调出debug的操作）
        $(window).resize(function(){
            layui.layer.full(index);
        })
        layui.layer.full(index);
    })


    //角色组
    $(".view_admin_group").click(function(){
        var index = layui.layer.open({
            title : "角色组",
            type : 2,
            content : "adminGroup.html",
            success : function(layero, index){
                setTimeout(function(){view_admin_log
                    layui.layer.tips('点击此处返回会员列表', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                },500)
            }
        })
        //改变窗口大小时，重置弹窗的高度，防止超出可视区域（如F12调出debug的操作）
        $(window).resize(function(){
            layui.layer.full(index);
        })
        layui.layer.full(index);
    })

    //规则管理
    $(".view_admin_rule").click(function(){
        var index = layui.layer.open({
            title : "规则管理",
            type : 2,
            content : "adminRule.html",
            success : function(layero, index){
                setTimeout(function(){view_admin_log
                    layui.layer.tips('点击此处返回会员列表', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                },500)
            }
        })
        //改变窗口大小时，重置弹窗的高度，防止超出可视区域（如F12调出debug的操作）
        $(window).resize(function(){
            layui.layer.full(index);
        })
        layui.layer.full(index);
    })



    //添加
    $(".usersAdd_btn").click(function(){
        var index = layui.layer.open({
            title : "添加会员",
            type : 2,
            content : "addManager.html",
            success : function(layero, index){
                setTimeout(function(){
                    layui.layer.tips('点击此处返回会员列表', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                },500)
            }
        })
        //改变窗口大小时，重置弹窗的高度，防止超出可视区域（如F12调出debug的操作）
        $(window).resize(function(){
            layui.layer.full(index);
        })
        layui.layer.full(index);
    })





    //编辑管理员操作
	$("body").on("click",".users_edit",function(){  //编辑
		layer.alert('管理员暂时不做编辑页面，后面直接添加弹窗编辑！',{icon:6, title:'管理员编辑'});
	})


	//删除管理员操作
	$("body").on("click",".users_del",function(){  //删除
		var _this = $(this);
		layer.confirm('确定删除此用户？',{icon:3, title:'提示信息'},function(index){
            $.ajax({
                url:'delManager',
                type:"POST",
                data:{'id':_this.attr("data-id")},
                dataType:"json",
                success:function(json){
                    //弹出loading
                    var index = top.layer.msg('正在删除',{icon: 16,time:false,shade:0.8});
                    setTimeout(function(){
                        top.layer.close(index);
                        top.layer.msg("用户删除成功！");
                        _this.parents("tr").remove();
                        for(var i=0;i<usersData.length;i++){
                            if(usersData[i].usersId == _this.attr("data-id")){
                                usersData.splice(i,1);
                                usersList(usersData);
                            }
                        }
                        layer.close(index);
                    },2000);
                    return false;
                },
                error:function(res){
                    setTimeout(function(){
                        top.layer.close(index);
                        top.layer.msg("删除失败！");
                    },2000);
                    return false;
                }
            });

		});
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
			    	+  '<td>'+currData[i].username+'</td>'
			    	+  '<td>'+currData[i].email+'</td>'
			    	+  '<td>'+currData[i].nickname+'</td>'
			    	+  '<td>'+currData[i].content+'</td>'
			    	+  '<td>'+currData[i].status+'</td>'
			    	+  '<td>'+js_date_time(currData[i].createtime)+'</td>'
			    	+  '<td>'
					+    '<a class="layui-btn layui-btn-mini users_edit"><i class="iconfont icon-edit"></i> 编辑</a>'
					+    '<a class="layui-btn layui-btn-danger layui-btn-mini users_del" data-id="'+data[i].id+'"><i class="layui-icon">&#xe640;</i> 删除</a>'
			        +  '</td>'
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