<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/19
 * Time: 11:48
 */

namespace app\admin\controller;

//use app\common\helper\VerifyHelper;(验证码类生成图片的太卡，改用tp5官方)
use think\Validate;

class Index extends Base
{


    public function index(){
        return $this->fetch();
    }

    public function login(){
//
//        $username = $this->request->post('username');
//        $password = $this->request->post('password');
//        $code =$this->request->post('code');
//        //验证码验证
//        if(!captcha_check($code)){
//            $this->error(__('验证码错误'));
//        }
//
//        $rule = [
//            'username'  => 'require|length:3,30',
//            'password'  => 'require|length:3,30',
//        ];
//        $data = [
//            'username'  => $username,
//            'password'  => $password,
//        ];
//
//        $validate = new Validate($rule);
//        $result = $validate->check($data);


        return $this->fetch('login'); 
   	}

   	//退出登录
    public function logout(){
        $this->success(__('退出成功！'), 'index/login');
    }

    //验证码 composer require tp5/catpcha(生成图片耗时太久放弃使用)
//    public function verify()
//    {
//        VerifyHelper::verify();
//    }

}