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

    //修改密码
    form.on("submit(changePwd)",function(data){
        pwd=$('#oldpwd').val();
        pwd1=$('#newpwd1').val();
        pwd2=$('#newpwd2').val();
        if(pwd1.length<6||pwd2.length<6){
            layer.msg('密码长度小于6位！');
            return false;
        }
        if(pwd1!=pwd2){
            layer.msg('两次密码不一致！');
            return false;
        }

        $.ajax({
            type:'post',
            url:'',
            data:{
                oldpwd:pwd,password:$('#newpwd1').val(),id:$('#id').val()
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

    	return false; //阻止表单跳转。
    })

})

