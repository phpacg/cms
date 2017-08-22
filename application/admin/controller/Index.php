<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/19
 * Time: 11:48
 */

namespace app\admin\controller;


class Index extends Base
{
    public function index(){
        return $this->fetch();
    }
}