<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/23
 * Time: 15:30
 */

namespace app\admin\controller;


class System extends Base
{
    //后台主页
    public function main(){
        return $this->fetch('main');
    }
    //系统设置页面
    public function systemParameter(){
        return $this->fetch('systemParameter');
    }

    //取系统配置项
    public function getsysConfig(){
        $res=db('config')->field(['name','value'])->select();
        $data = '{';
        foreach ($res as $v){
          $data = $data.'"'.$v['name'].'":"'.$v['value'].'",';
        }
        return $data.'"hello":"world"'.'}';
//        return json_encode($res);
    }

    //友情链接列表
    public function linksList(){
        return $this->fetch('linksList');
    }

    //友情链接添加页面
    public function linksAdd(){
        return $this->fetch('linksAdd');
    }
}