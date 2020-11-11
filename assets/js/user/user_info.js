$(function() {
    var form = layui.form
    render()

    function render() {
        $.ajax({
            type: 'get',
            url: '/my/userinfo',
            success: function(res) {

                if (res.status == 0) {
                    // console.log(res.data);

                    form.val('myForm', res.data)
                        // $('.myForm input[name=username]').val(res.data.username)
                        // $('.myForm input[name=nickname]').val(res.data.nickname)
                        // $('.myForm input[name=email]').val(res.data.email)
                }
            }
        })
    }

    form.verify({
        username: function(value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符'
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\''
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字'
            }
        }

        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        ,
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ]
    })

    $('.myForm').on('submit', function(e) {
        // 3.2 阻止默认的请求行为
        e.preventDefault()
            // 3.3 发送Ajax请求  注意带上数据
        $.ajax({
            type: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);

                // 3.4 提示用户是否成功
                layer.msg(res.message)
                    // 3.5 更新index页面中的欢迎语
                if (res.status == 0) {
                    // parent在这里表示的是父页面index
                    parent.window.getUser()
                }
            }
        })
    })


    $('.myForm .reset').on('click', function(e) {
        e.preventDefault()
        render()
    })
})