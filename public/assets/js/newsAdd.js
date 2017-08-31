layui.config({
	base : "http://127.0.0.100/public/assets/js/"
}).use(['form','layer','jquery','layedit','laydate'],function(){
	var form = layui.form(),
		layer = parent.layer === undefined ? layui.layer : parent.layer,
		laypage = layui.laypage,
		layedit = layui.layedit,
		laydate = layui.laydate,
		$ = layui.jquery;

    layedit.set({
        uploadImage: {
            url: 'lay_img_upload', //接口url
            type: 'post', //默认post
        }
    });
	//创建一个编辑器
 	var editIndex = layedit.build('news_content');
 	var addNewsArray = [],addNews;
 	form.on("submit(addNews)",function(data){
 		// //是否添加过信息
	 	// if(window.sessionStorage.getItem("addNews")){
	 	// 	addNewsArray = JSON.parse(window.sessionStorage.getItem("addNews"));
	 	// }

        //显示、审核状态
 		var isShow = data.field.show=="on" ? "checked" : "",
        newsStatus = data.field.shenhe=="on" ? "审核通过" : "待审核";

        $.ajax({
			type:'post',
			url:'newsAdd',
			data:{newsName:$(".newsName").val(),catid:$('#catPid option:selected').val(),keywords:$('.keywords').val(),description:$('.description').val(),newsLook:$(".newsLook option").eq($(".newsLook").val()).text(),newsTime:$(".newsTime").val(),newsAuthor:$(".newsAuthor").val(),content:layedit.getContent(editIndex),isShow:isShow,newsStatus:newsStatus},
			dataType:'json',
			success:function (data) {
				if(data['code']==1){
                    //弹出loading
                    var index = top.layer.msg('数据提交中，请稍候',{icon: 16,time:false,shade:0.8});
                    setTimeout(function(){
                        top.layer.close(index);
                        top.layer.msg("文章添加成功！");
                        layer.closeAll("iframe");
                        //刷新父页面
                        parent.location.reload();
                    },2000);
				}else{
					layer.msg('文章添加失败！');
				}
            },
			error:function () {
				layer.msg('文章添加失败！')
            }
		})
 		return false;
 	})

})
