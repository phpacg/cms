<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/27
 * Time: 17:46
 */

namespace app\admin\controller;


class Cat extends Base
{
    public function catList(){
        return $this->fetch('catList');
    }
}