"use strict";
$(function(){
	uploadImg();
});

/**
 * [uploadImg 上传头像]
 */
function uploadImg(){
    // 初始化Web Uploader
        var uploader = WebUploader.create({

            // 选完文件后，是否自动上传。
            auto: true,

            // swf文件路径
            swf: 'js/Uploader.swf',

            // 文件接收服务端。
            server: 'http://msg.52yingzheng.com/testUpload.php',

            // 选择文件的按钮。可选。
            // 内部根据当前运行是创建，可能是input元素，也可能是flash.
            pick: '#filePicker',

            // 只允许选择图片文件。
            accept: {
                title: 'Images',
                extensions: 'gif,jpg,jpeg,bmp,png',
                mimeTypes: 'image/*'
            }
        });

        // 文件上传成功，给item添加成功class, 用样式标记上传成功。
        uploader.on( 'uploadSuccess', function( file ) {
            $( '#'+file.id ).addClass('upload-state-done');
            console.log('上传完成',arguments);
            window.name = file.name;
        });

        // 文件上传失败，显示上传出错。
        uploader.on( 'uploadError', function( file ) {
            alert('上传失败');
        });

}