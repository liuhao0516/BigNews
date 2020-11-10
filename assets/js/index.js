$(function() {

    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        // headers: {

        //     "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjIyMDgsInVzZXJuYW1lIjoiZWRjcmZ2IiwicGFzc3dvcmQiOiIiLCJuaWNrbmFtZSI6Ijg4OCIsImVtYWlsIjoibGxsa2tsa2tAMTYzLmNvbSIsInVzZXJfcGljIjoiIiwiaWF0IjoxNjA0OTk2NzkzLCJleHAiOjE2MDUwMzI3OTN9.KI2KQpDMazDG_pS5QyHZ5rbtatGfQnbQ7KK4d3CiksU"
        // },

        success: function(res) {
            console.log(res);

            if (res.status == 0) {

                // $('.userInfo .welcome').html(`欢迎&nbsp;&nbsp;${res.data.nickname||res.data.username}`)
                $('.userInfo .welcome').html(`欢迎&nbsp;&nbsp;${res.data.nickname?res.data.nickname:res.data.username}`)
                if (!res.data.user_pic) {
                    if (!res.data.nickname) {

                        $('.userInfo .txt-avatar,.layui-header .txt-avatar').text(res.data.username.slice(0, 1).toUpperCase())
                    } else {
                        $('.userInfo .txt-avatar,.layui-header .txt-avatar').text(res.data.nickname.slice(0, 1).toUpperCase())
                    }
                } else {
                    $('.userInfo .txt-avatar,.layui-header .txt-avatar').hide().next().show().attr('src', res.data.user_pic)
                }
            }


        }
    })
    $('.layui-header .layui-nav-item').on('click', function() {
        layer.confirm('确定退出?', { icon: 3, title: '提示' }, function(index) {

            window.localStorage.removeItem('token')
            location.href = './login.html'
            layer.close(index);
        });


    })


})