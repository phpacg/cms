<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006~2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------

return [

    'template'               => [
        // 模板引擎类型 支持 php think 支持扩展
        'type'         => 'Think',
        // 模板路径
        'view_path'    => ROOT_PATH.'template'.DS.'admin'.DS,
        // 模板后缀
        'view_suffix'  => 'html',
        // 模板文件名分隔符
        'view_depr'    => DS,
        // 模板引擎普通标签开始标记
        'tpl_begin'    => '{',
        // 模板引擎普通标签结束标记
        'tpl_end'      => '}',
        // 标签库标签开始标记
        'taglib_begin' => '{',
        // 标签库标签结束标记
        'taglib_end'   => '}',
    ],

//    'captcha' => [
//        'verify_ip' => false, // 是否验证ip匹配
//        'zh' => false, // 是否使用中文验证码
//        'timeout' => 300, // 验证码的过期时间,单位秒
//        'width' => 116, // 验证码图片宽度
//        'height' => 36, // 验证码图片宽度高度
//        'prefix' => 'captcha', // 验证码session前缀
//        'detect_case' => false, // 是否区分大小写
//        'force_refresh' => true, // 验证后是否刷新验证码
//    ],



    
];
