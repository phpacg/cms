<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/19
 * Time: 11:47
 */

namespace app\admin\controller;


use think\Controller;
use think\Session;

class Base extends Controller
{
    public function _initialize()
    {
        if (!Session::has('id')||!Session::has('username')){
            $this->error('您未登录，请登录','index/login');
        }
    }

}