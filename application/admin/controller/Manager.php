<?php

namespace app\admin\controller;


class Manager extends Base
{
    public function managerList(){

        return $this->fetch('managerList');
    }

    public function addManager(){
        if (request()->isPost()){
            $data=input('post.');
            $data['password']=md5($data['password'].$data['salt']);
            $res=db('admin')->insert($data);
            if($res){
                return 1;
            }else{
                return false;
            }
        }
        return $this->fetch('addManager');
    }

    public function viewManager(){
        $res=db('admin')->field(['id','username','email','nickname','content','status','createtime'])->select();
         echo json_encode($res);
    }

    public function delManager(){
        $id=input('post.id');
        if (request()->isPost()) {
            $res = db('admin')->where('id',$id)->delete();
            if($res!=0){
                return 1;
            }else{
                return false;
            }
        }

    }

    //管理员日志
    public function adminLog(){
        return $this->fetch();
    }

    //管理员日志返回json
    public function viewAdminlog(){
        $res=db('admin_log')->select();
        echo json_encode($res);
    }

    //修改密码
    public function changePwd(){
        if(request()->isPost()){
            $id=$this->request->post('id');
            $password=$this->request->post('password');
            $oldpwd=$this->request->post('oldpwd');
            $dbpwd=db('admin')->where('id',$id)->find();
            if(md5($oldpwd.$dbpwd['salt'])!=$dbpwd['password']){
                $this->error('初始密码错误');
            }
            $data['salt']=time();
            $data['password']=md5($password.$data['salt']);
            $res=db('admin')->where('id',$id)->update($data);
            if($res) {
                $this->success('修改成功');
            }else{
                $this->error('修改失败');
            }
        }
        return $this->fetch('changePwd');
    }

    //修改管理员资料
    public function managerInfo(){
        $res=db('admin')->where('id',session('id'))->find();
        $this->assign('res',$res);
        if (request()->isPost()){
            $data=input('post.');
            if(md5($data['password'].$res['salt'])==$res['password']){
                unset($data['password']);
                $res=db('admin')->where('id',session('id'))->update($data);
                if ($res){
                    $this->success('修改成功');
                }else{
                    $this->error('修改失败');
                }

            }else{
                $this->error('密码错误');
            }
        }
        return $this->fetch('managerInfo');
    }

}