$(function() {

    var form = layui.form
    form.verify({
        repass: function(value, item) {
            var passval = $(' .myForm .pass').val()
            if (passval !== value) {
                $('.myForm .pass, .myForm .repass').val('')
                return '密码输入不一致，请重新输入'
            }
            if ($('.myForm input[name=oldPwd]').val() === value) {
                $('.myForm .pass, .myForm .repass').val('')
                return '新密码和原密码一样'
            }
        },

        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]

        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ]

    });

    $('.myForm').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status === 0) {
                    layer.msg(res.message)
                }
            }

        })
    })

})