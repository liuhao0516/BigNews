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
})