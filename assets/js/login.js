$(function() {
    $('.login a').on('click', function() {
        $('.login').hide().next().show()
    })

    $('.register a').on('click', function() {
        $('.register').hide().prev().show()
    })

    var form = layui.form
    form.verify({
        username: function(value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            // if (/^\d+\d+\d$/.test(value)) {
            //     return '用户名不能全为数字';
            // }
        },
        repass: function(value, item) {
            var passval = $('.register .myForm input[name=password]').val()
            if (passval !== value) {
                $('.register .myForm .pass,.register .myForm .repass').val('')
                return '密码输入不一致，请重新输入'
            }
        },

        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]

        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ]

    });
    $('.register .myForm').on('submit', function(e) {
        e.preventDefault()
        let data = $(this).serialize()
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: data,
            success: function(res) {
                layer.msg(res.message);
                if (res.status == 0) {
                    $('.register a').click()
                }
            }
        })
    })

    $('.login .myForm').on('submit', function(e) {
        e.preventDefault()
        let data = $(this).serialize()
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: data,
            success: function(res) {
                layer.msg(res.message)
                if (res.status == 0) {

                    location.href = './index.html'
                }
            }
        })
    })
})