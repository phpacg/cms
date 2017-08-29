<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/27
 * Time: 17:46
 */

namespace app\admin\controller;


use app\admin\model\Category;

class Cat extends Base
{
    protected $beforeActionList=[
        'delsoncat'=>['only'=>'del'],
    ];
    //栏目列表显示
    public function catList(){
        $cat=new Category();
        $catres=$cat->catetree();
        $this->assign('catres',$catres);
        return view();
    }
    //添加栏目
    public function catAdd(){
        if (request()->post()){
            $data=input('post.');
            $data['createtime']=time();
            $data['updatetime']=time();
            $data['flag']=1;
            $data['status']='normal';
            $data['image']='/assets/img/qrcode.png';
            $data['weigh']=0;
            $data['diyname']=$data['nickname'];
            $res=db('category')->insert($data);
            if (!$res){
                $this->error('未添加成功！');
            }
            $this->success('栏目添加成功');
        }
        $cat=new Category();
        $catres=$cat->catetree();
        $this->assign('catres',$catres);
        return view();
    }

    //显示是否展示功能
    public function catShow(){
            $id=input('post.id');
            $v=db('category')->where('id',$id)->field('status')->find();
            if ($v['status']==0){
                $status=1;
            }else{
                $status=0;
            }
            $res=db('category')->where('id',$id)->update(['status'=>$status]);
            if ($res){
                $this->success('修改成功');
            }
    }

    //删除栏目
    public function catDel(){
        $del=db('category')->delete(input('post.id'));
        if($del){
            $this->success('删除成功！');
        }else{
            $this->error('删除失败！');
        }
    }
    //删除子栏目(前置)
    public function delsoncat(){
        $catid=input('id');
        $cate=new Category();
        $sonids=$cate->getchildid($catid);
        if ($sonids) {
            db('category')->delete($sonids);
        }
    }

    //编辑栏目
    public  function catEdit($id){
        $cat=new Category();
        $catres=$cat->catetree();
        $this->assign('catres',$catres);
        $res=db('category')->where('id',$id)->find();
        $this->assign('res',$res);
        if (request()->post()){
            $data=input('post.');
            $id=$data['id'];
            unset($data['id']);
            $data['updatetime']=time();
            $rest=db('category')->where('id',$id)->update($data);
            if ($rest){
                $this->success('修改成功');
            }else{
                $this->error('修改失败');
            }
        }
        return view();
    }


}