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

    public function adminLog(){
        return $this->fetch();
    }

    public function viewAdminlog(){
        $res=db('admin_log')->select();
        echo json_encode($res);
    }

}