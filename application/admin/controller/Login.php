<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/22
 * Time: 17:15
 */

namespace app\admin\controller;


class Login extends Base
{
    public function index(){
        return $this->fetch('login');
    }
    public function logout(){
        echo '退出登录';
    }
}