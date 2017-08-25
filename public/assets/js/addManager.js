var $;
layui.config({
	base : "http://127.0.0.100/public/assets/js/"
}).use(['form','layer','jquery'],function(){
	var form = layui.form(),
		layer = parent.layer === undefined ? layui.layer : parent.layer,
		laypage = layui.laypage;
		$ = layui.jquery;

 	var addManagerArray = [],addManager;
 	form.on("submit(addManager)",function(data){
 		//是否添加过信息
	 	if(window.sessionStorage.getItem("addManager")){
	 		addManagerArray = JSON.parse(window.sessionStorage.getItem("addManager"));
	 	}

	 	var managerStatus,managerEndTime;
 		//会员状态
 		if(data.field.managerStatus == '0'){
            managerStatus = "正常使用";
 		}else if(data.field.managerStatus == '1'){
            managerStatus = "限制用户";
 		}

 		addManager = '{"salt":"'+ new Date().getTime() +'",';//id
 		addManager += '"username":"'+ $(".managerName").val() +'",';  //登录名
        addManager += '"nickname":"'+ $(".nickname").val() +'",';  //昵称
        addManager += '"password":"'+ $(".managerPwd").val() +'",';  //密码
        addManager += '"email":"'+ $(".managerEmail").val() +'",';	 //邮箱
 		addManager += '"loginfailure":"'+ managerStatus +'",'; //会员状态
        addManager += '"content":"'+ $(".managerDesc").val() +'",'; //会员备注
        addManager += '"createtime":"'+ new Date().getTime() +'"}';  //登录时间
 		console.log(addManager);
 		addManagerArray.unshift(JSON.parse(addManager));
 		window.sessionStorage.setItem("addManager",JSON.stringify(addManagerArray));
 		dataArr=JSON.parse(addManager);
        $.ajax({
            url:'',
            type:"POST",
            data:dataArr,
            dataType:"json",
            success:function(json){
                //弹出loading
                var index = top.layer.msg('数据提交中，请稍候',{icon: 16,time:false,shade:0.8});
                setTimeout(function(){
                    top.layer.close(index);
                    top.layer.msg("用户添加成功！");
                    layer.closeAll("iframe");
                    //刷新父页面
                    parent.location.reload();
                },2000);
                return false;
            },
            error:function(res){
                setTimeout(function(){
                    top.layer.close(index);
                    top.layer.msg("添加失败！");
                    layer.closeAll("iframe");
                    //刷新父页面
                    parent.location.reload();
                },2000);
                return false;
            }
        });
        return false;

 	})
	
})

//格式化时间
// function formatTime(_time){
//     var year = _time.getFullYear();
//     var month = _time.getMonth()+1<10 ? "0"+(_time.getMonth()+1) : _time.getMonth()+1;
//     var day = _time.getDate()<10 ? "0"+_time.getDate() : _time.getDate();
//     var hour = _time.getHours()<10 ? "0"+_time.getHours() : _time.getHours();
//     var minute = _time.getMinutes()<10 ? "0"+_time.getMinutes() : _time.getMinutes();
//     return year+"-"+month+"-"+day+" "+hour+":"+minute;
// }
