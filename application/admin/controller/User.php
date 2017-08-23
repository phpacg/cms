<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/23
 * Time: 16:50
 */

namespace app\admin\controller;


class User extends Base
{
    //修改资料
    public function changePwd(){
        return $this->fetch('changePwd');
    }
    //所有用户列表
    public function allUsers(){
        return $this->fetch('allUsers');
    }
    //添加用户
    public function addUser(){
        return $this->fetch('addUser');
    }
    //用户信息
    public function userInfo(){
        return $this->fetch('userInfo');
    }
}