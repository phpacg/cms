<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/23
 * Time: 16:33
 */

namespace app\admin\controller;
use think\Request;

use app\admin\model\Category;
class Article extends Base
{
    //文章列表
    public function newsList(){
        return $this->fetch('newsList');
    }

    //添加文章
    public function newsAdd(){
        if (request()->isPost()){
          $data=input('post.');
          $res=db('article')->insert($data);
          if ($res){
              $this->success('添加成功');
          }else{
              $this->error('添加失败');
          }
        }
        $cat=new Category();
        $catres=$cat->catetree();
        $this->assign('catres',$catres);
        return $this->fetch('newsAdd');
    }

    //文章json
    public function newsJson(){
        $news=db('article')->field(['newsId','newsName','newsAuthor','newsLook','isShow','newsTime','newsStatus'])->order('newsId DESC')->select();
        $newsjson=json_encode($news);
        return $newsjson;
    }

    //layui编辑器图片上传接口
    public function lay_img_upload(){
        $file = Request::instance()->file('file');
        if(empty($file)){
            $result["code"] = "1";
            $result["msg"] = "请选择图片";
            $result['data']["src"] = '';
        }else{
            // 移动到框架应用根目录/public/uploads/ 目录下
            $info = $file->move(ROOT_PATH . 'public' . DS . 'uploads' );
            if($info){
                $name_path =str_replace('\\',"/",$info->getSaveName());
                //成功上传后 获取上传信息
                $result["code"] = '0';
                $result["msg"] = "上传成功";
                $result['data']["src"] = "/public/uploads/".$name_path;
            }else{
                // 上传失败获取错误信息
                $result["code"] = "2";
                $result["msg"] = "上传出错";
                $result['data']["src"] ='';
            }


        }

        return json_encode($result);
    }
}