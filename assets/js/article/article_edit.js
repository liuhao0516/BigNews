$(function() {

    initEditor();



    var $img = $('#image')
    var options = {

        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }
    $img.cropper(options)

    $('.btn-upload').on('click', function() {
        // 4.2 弹出选择图片的对话框
        $('#avatar').click()
    })

    // 5. 实现图上的本地预览功能
    // 5.1 给文件按钮注册change事件
    $('#avatar').on('change', function() {
            // 5.2 获取选中的图片文件
            var avatar = this.files[0]

            // 5.3 生成一个图片链接
            var imgUrl = URL.createObjectURL(avatar)

            // 5.4 实现预览
            $img.cropper('replace', imgUrl)
        })
        /// 数据回显
        // 获取地址栏中的地址
    var id = location.search.slice(4)
        // console.log(id);

    var form = layui.form
    $.ajax({
        type: 'get',
        url: '/my/article/cates',
        success: function(res) {
            // console.log(res);
            if (res.status == 0) {
                var htmlStr = template('article_list', res)
                $('#classifyList').html(htmlStr)
                form.render()
                    //实现分类数据的回显
                renderId()
            }
        }
    })



    function renderId() {

        $.ajax({
            type: 'get',
            url: '/my/article/' + id,
            success: function(res) {
                console.log(res.data);

                if (res.status === 0) {
                    // console.log(11);
                    layui.form.val('myForm', {

                        Id: res.data.Id,
                        title: res.data.title,
                        cate_id: res.data.cate_id
                    })
                    tinyMCE.activeEditor.setContent(res.data.content)
                    $('#image')
                        .cropper('destroy') // 销毁旧的裁剪区域
                        .attr('src', 'http://ajax.frontend.itheima.net' + res.data.cover_img) // 重新设置图片路径
                        .cropper(options)
                }
            }
        })
    }


    $('.myForm').on('click', '.btn', function(e) {
        e.preventDefault()
        console.log(11);
        // 准备数据
        var articleData = new FormData($('.myForm')[0])

        if ($(this).hasClass('btn-pub')) {
            // 发布
            articleData.append('state', '已发布')
        } else {
            // 存为草稿
            articleData.append('state', '草稿')
        }

        // 准备图片数据
        $img.cropper('getCroppedCanvas', {
                width: 400,
                height: 280
            })
            .toBlob(function(blob) {
                articleData.append('cover_img', blob)
                articleData.append('content', tinyMCE.activeEditor.getContent())
                $.ajax({
                    type: 'post',
                    url: '/my/article/edit',
                    data: articleData, // FormData数据 二进制
                    contentType: false, // 不需要加请求头 'application/x-www-form-url'
                    processData: false,
                    success: function(res) {
                        console.log(res);
                        window.location.href = './article_list.html'
                    }
                })
            })
    })

})