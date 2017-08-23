<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/23
 * Time: 17:03
 */

namespace app\admin\controller;


class Message extends Base
{
    public function message(){
        return $this->fetch('message');
    }
    public function messageReply(){
        return $this->fetch('messageReply');
    }
}