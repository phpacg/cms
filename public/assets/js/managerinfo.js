var $form;
var form;
var $;
layui.config({
	base : "http://127.0.0.100/public/assets/js/"
}).use(['form','layer','upload','laydate'],function(){
	form = layui.form();
	var layer = parent.layer === undefined ? layui.layer : parent.layer;
		$ = layui.jquery;
		$form = $('form');

    //提交个人资料
    form.on("submit(changeUser)",function(data){

        $.ajax({
            type:'post',
            url:'',
            data:{
                nickname:$('.nickname').val(),email:$('.managerEmail').val(),status:$('.managerStatus').val(),content:$('.managerDesc').val(),password:$('.managerPwd').val()
            },
            dataType:'json',
            success:function (data) {
                if(data['code']==1){
                    layer.msg(data['msg']);
                }else{
                    layer.msg(data['msg']);
                }

            },
            error:function () {
                layer.msg('修改失败！');
            },
        });

    	return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    })



})

