$(function() {

    var $img = $('#image')
    var options = {

        aspectRatio: 1,
        preview: '.img-preview'
    }
    $img.cropper(options)

    $('.btn-upload').on('click', function() {
        $('#avatar').click()
    })

    $('#avatar').on('change', function() {
        // console.log(this);

        var avatar = this.files[0]
        var imgURL = URL.createObjectURL(avatar)
            // $('.cropper-box img').attr('src', imgURL)
        $img
        // .cropper('destroy').attr('src', imgURL).cropper(options)
        $img.cropper('replace', imgURL)

    })

    $('.btn-sure').on('click', function() {
        var imgData = $img.cropper('getCroppedCanvas', {
                width: 100,
                height: 100
            })
            .toDataURL();
        $.ajax({
            type: 'post',
            url: '/my/update/avatar',
            data: {
                avatar: imgData
            },
            success: function(res) {
                layer.msg(res.message)
                if (res.status === 0) {
                    parent.window.getUser()
                }
            }
        })
    })
})