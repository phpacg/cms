<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/23
 * Time: 17:08
 */

namespace app\admin\controller;


class Img extends Base
{
    public function images(){
        return $this->fetch('images');
    }
}