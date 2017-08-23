<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/23
 * Time: 16:33
 */

namespace app\admin\controller;


class Article extends Base
{
    //文章列表
    public function newsList(){
        return $this->fetch('newsList');
    }

    //添加文章
    public function newsAdd(){
        return $this->fetch('newsAdd');
    }
}