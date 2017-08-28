<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/27
 * Time: 17:46
 */

namespace app\admin\controller;


use app\admin\model\Category;

class Cat extends Base
{
    public function catList(){
        $cat=new Category();
        $catres=$cat->catetree();
        $this->assign('catres',$catres);
        return view();
    }
}