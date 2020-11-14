$(function() {

    // selector: '#mytextarea',

    // language: 'zh_CN', //注意大小写
    initEditor();



    var $img = $('#image')
    var options = {

        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }
    $img.cropper(options)
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
            }
        }
    })

    $('.btn-upload').on('click', function() {
        $('#avatar').click()
    })

    $('#avatar').on('change', function() {
        // console.log(this);

        var avatar = this.files[0]
        var imgURL = URL.createObjectURL(avatar)
            // $('.cropper-box img').attr('src', imgURL)
            // $img
            // .cropper('destroy').attr('src', imgURL).cropper(options)
        $img.cropper('replace', imgURL)

    })

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
                    url: '/my/article/add',
                    data: articleData, // FormData数据 二进制
                    contentType: false, // 不需要加请求头 'application/x-www-form-url'
                    processData: false,
                    success: function(res) {
                        console.log(res);

                    }
                })
            })
    })
})