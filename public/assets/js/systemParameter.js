layui.config({
	base : "http://127.0.0.100/public/assets/js/"
}).use(['form','layer','jquery'],function(){
	var form = layui.form(),
		layer = parent.layer === undefined ? layui.layer : parent.layer,
		laypage = layui.laypage,
		$ = layui.jquery;

 	var systemParameter;
 	form.on("submit(systemParameter)",function(data){
 		systemParameter = '{"cmsName":"'+$(".cmsName").val()+'",';  //模版名称
 		systemParameter += '"version":"'+$(".version").val()+'",';	 //当前版本
 		systemParameter += '"author":"'+$(".author").val()+'",'; //开发作者
 		systemParameter += '"homePage":"'+$(".homePage").val()+'",'; //网站首页
 		systemParameter += '"server":"'+$(".server").val()+'",'; //服务器环境
 		systemParameter += '"dataBase":"'+$(".dataBase").val()+'",'; //数据库版本
 		systemParameter += '"maxUpload":"'+$(".maxUpload").val()+'",'; //最大上传限制
 		systemParameter += '"userRights":"'+$(".userRights").val()+'",'; //用户权限
 		systemParameter += '"description":"'+$(".description").val()+'",'; //站点描述
 		systemParameter += '"powerby":"'+$(".powerby").val()+'",'; //版权信息
 		systemParameter += '"record":"'+$(".record").val()+'",'; //网站备案号
 		systemParameter += '"keywords":"'+$(".keywords").val()+'"}'; //默认关键字
 		window.sessionStorage.setItem("systemParameter",systemParameter);
 		//弹出loading
 		var index = top.layer.msg('数据提交中，请稍候',{icon: 16,time:false,shade:0.8});
        setTimeout(function(){
            layer.close(index);
			layer.msg("系统基本参数修改成功！");
        },2000);
 		return false;
 	})


 	//加载默认数据
 	if(window.sessionStorage.getItem("systemParameter")){
 		var data = JSON.parse(window.sessionStorage.getItem("systemParameter"));
 		fillData(data);
 	}else{
 		$.ajax({
			url : "getsysConfig",
			type : "get",
			dataType : "json",
			success : function(data){
				console.log(data);
                var obj = JSON.parse(data);
				fillData(obj);
			}
		})
 	}

 	//填充数据方法
 	function fillData(data){
 		$(".version").val(data.version);
		$(".author").val(data.author);
		$(".cdnurl").val(data.cdnurl);
		$(".beian").val(data.beian);
		$(".timezone").val(data.timezone);
		$(".mail_type").val(data.mail_type);
		$(".mail_smtp_host").val(data.mail_smtp_host);
		$(".cmsName").val(data.cmsName);
		$(".mail_smtp_port").val(data.mail_smtp_port);
		$(".mail_smtp_user").val(data.mail_smtp_user);
		$(".mail_smtp_pass").val(data.mail_smtp_pass);
        $(".mail_verify_type").val(data.mail_verify_type);
        $(".mail_from").val(data.mail_from);


    }
 	
})
