<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/19
 * Time: 11:48
 */

namespace app\admin\controller;
use think\Controller;
use think\Session;
use app\admin\model\Admin;

class Index extends Controller
{

    public function index(){
        if(!Session::has('username')){
            $this->error('您未登录，请登录','index/login');
        }
        return $this->fetch();
    }

    public function login(){
        if(request()->isPost()) {
            $username = $this->request->post('username');
            $password = $this->request->post('password');
            $code = $this->request->post('code');
            if(!captcha_check($code)){
                $this->error('验证码错误！');
            };
            $t=new Admin;
            $res=$t->isPassword($username,$password);
            if(!$res){
                $this->error('用户名或密码错误！');
            }else{
                session('username',$username);
                $this->success('登录成功！');
            }
        }

        if (Session::has('username')) {
            $this->success('您已登录', 'index/index');
        }
        return $this->fetch('login');
   	}

   	//退出登录
    public function logout(){
        session(null);
        session('username', null);
        session('id',null);
        $this->success('退出成功！', 'index/login');
    }


}