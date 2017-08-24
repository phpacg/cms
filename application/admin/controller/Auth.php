<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/23
 * Time: 21:49
 */

namespace app\admin\controller;


class Auth extends Base
{
    public function authList(){
        return $this->fetch('authList');
    }
}