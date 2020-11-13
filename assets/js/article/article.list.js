$(function() {

    $.ajax({
        type: 'get',
        url: '/my/article/cates',
        success: function(res) {
            console.log(res);
            if (res.status == 0) {

                var htmlStr = template('article_list', res)
                $('#category').html(htmlStr)
                layui.form.render()
            }
        }
    })

    var laypage = layui.laypage;

    laypage.render({
        elem: 'test1' //注意，这里的 test1 是 ID，不用加 # 号
            ,
        count: 50 //数据总数，从服务端得到
            ,
        limits: [2, 3, 5, 10],
        layout: ['count', 'limit', 'prev', 'page', 'next', 'skip']
    });
})