<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/28
 * Time: 17:04
 */

namespace app\admin\model;


use think\Model;

class Category extends Model
{
    public function catetree(){
        $cateres=$this->select();
        $res = $this->sort($cateres);
        return $res;

    }

    public function sort($data,$pid=0,$level=0){
        static $arr= array();
        foreach ($data as $k => $v){
            if ($v['pid']==$pid){
                $v['level']=$level;
                $arr[]=$v;
                $this->sort($data,$v['id'],$level+1);
            }
        }
        return $arr;
    }

}