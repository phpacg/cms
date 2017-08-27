<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/26
 * Time: 16:05
 */

namespace app\admin\model;

use think\Model;

class Admin extends Model
{

    //判断帐号密码是否匹配
    public function isPassword($username,$password){
        $res=$this->where('username',$username)->find();
        if(!$res){
            return false;
        }else{
            $password=md5($password.$res['salt']);
            if ($res['password']==$password){
                session('id',$res['id']);
                return true;
            }else{
                return false;
            }
        }
    }
}