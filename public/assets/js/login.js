layui.config({
	base : "js/"
}).use(['form','layer'],function(){
	var form = layui.form(),
		layer = parent.layer === undefined ? layui.layer : parent.layer,
		$ = layui.jquery;
	//video背景
	$(window).resize(function(){
		if($(".video-player").width() > $(window).width()){
			$(".video-player").css({"height":$(window).height(),"width":"auto","left":-($(".video-player").width()-$(window).width())/2});
		}else{
			$(".video-player").css({"width":$(window).width(),"height":"auto","left":-($(".video-player").width()-$(window).width())/2});
		}
	}).resize();

	//登录按钮事件
	form.on("submit(login)",function(data){
		$.ajax({
			type:'post',
			url:'login',
			data:{
			username:$('#user').val(),password:$('#pwd').val(),code:$('#code').val()
			},
			dataType:'json',
			success:function (data) {
				if(data['code']==1){
                    top.layer.msg('登录成功！');
                    window.location.href='index';
				}else{
                    top.layer.msg(data['msg']);
				};
            },
		});
		return false;
	})
})
