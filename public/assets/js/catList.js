layui.config({
	base : "http://127.0.0.100/public/assets/js/"
}).use(['form','layer','jquery','laypage'],function(){
	var form = layui.form(),
		layer = parent.layer === undefined ? layui.layer : parent.layer,
		laypage = layui.laypage,
		$ = layui.jquery;


	//添加栏目
        $(".catAdd_btn").click(function(){
          var index=layui.layer.open({
                title : "添加栏目",
                type : 2,
                area: ['600px', '500px'],
                content : ['catAdd.html', 'no'],
                success : function(layero, index){
                    setTimeout(function(){
                        layui.layer.tips('点击此处返回文章列表', '.layui-layer-setwin .layui-layer-close', {
                            tips: 3
                        });
                    },500)
                }
            })
        });

	//执行添加栏目
    $(".addCat").click(function(){
    	name=$('.catname').val();
        nickname=$('.nickname').val();
        pid=$('.pid').val();
    	type=$('input[name="cattype"]:checked').val();
    	keywords=$('.keyword').val();
    	description=$('.catdesc').val();
    	$.ajax({
			url:'',
			type:'post',
			data:{name:name,nickname:nickname,pid:pid,type:type,keywords:keywords,description:description},
			dataType:'json',
			success:function (data) {
				if(data['code']=1){
					layer.closeAll();
                    parent.location.reload();
                    layer.msg('添加成功！');
				}else{
					layer.msg('添加失败！');
				}
            },
            error:function () {
				layer.msg('添加失败！');
            }

        });
    	return false;
    });



	//是否展示
	form.on('switch(isShow)', function(data){
		id=$(this).attr('datapid');
		$.ajax({
			type:'post',
			url:'catShow',
			data:{id:id},
			dataType:'json',
			success:function (data) {
				if(data['code']==1){
                    var index = layer.msg('修改中，请稍候',{icon: 16,time:false,shade:0.8});
                    setTimeout(function(){
                        layer.close(index);
                        layer.msg("展示状态修改成功！");
                    },2000);
				}else{
					layer.msg('修改失败！');
				}
            },
			error:function () {
				layer.msg('修改失败！')
            }
		})

	})
 
	//操作编辑栏目
	$("body").on("click",".news_edit",function(){  //编辑
        var index=layui.layer.open({
            title : "编辑栏目",
            type : 2,
            area: ['600px', '500px'],
            content : ['catEdit/id/'+$(this).attr('data-id'), 'no'],
            success : function(layero, index){
                setTimeout(function(){
                    layui.layer.tips('点击此处关闭栏目编辑', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                },100)
            }
        })
	})

    //执行编辑栏目
    $(".editCat").click(function(){
        name=$('.catname').val();
        nickname=$('.nickname').val();
        pid=$('.pid').val();
        type=$('input[name="cattype"]:checked').val();
        keywords=$('.keyword').val();
        description=$('.catdesc').val();
        $.ajax({
            url:'catEdit',
            type:'post',
            data:{id:$('.catid').val(),name:name,nickname:nickname,pid:pid,type:type,keywords:keywords,description:description},
            dataType:'json',
            success:function (data) {
                if(data['code']==1){
                    layer.closeAll();
                    layer.msg('修改成功！');
                }else{
                    layer.msg('修改失败！');
                }
            },
            error:function () {
                layer.msg('修改失败！');
            }

        });
        return false;
    });


    $("body").on("click",".news_collect",function(){  //收藏.
        layer.alert('进入栏目。。。',{icon:6, title:'文章编辑'});
	})

	$("body").on("click",".news_del",function(){  //删除
		var _this = $(this);
		layer.confirm('确定删除此栏目吗(将会删除该栏目下所有子栏目)？',{icon:3, title:'提示信息'},function(index){
			//_this.parents("tr").remove();3
			id=_this.attr('data-id');
			$.ajax({
				type:'post',
				url:'catDel',
				dataType:'json',
				data:{id:id},
				success:function (data) {
					if(data['code']==1){
						layer.msg('删除成功！');
                        parent.location.reload();
					}else{
						layer.msg('删除失败！');
					}
                },
				error:function () {
                    layer.msg('删除失败！');
                }
			});
			layer.close(index);
		});
	})

})
