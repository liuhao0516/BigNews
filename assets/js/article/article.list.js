$(function() {
    var form = layui.form
    $.ajax({
        type: 'get',
        url: '/my/article/cates',
        success: function(res) {
            console.log(res);
            if (res.status == 0) {

                var htmlStr = template('article_list', res)
                $('#category').html(htmlStr)
                form.render()
            }
        }
    })


    function renderPage(res) {

        var laypage = layui.laypage;
        laypage.render({
            elem: 'test1',
            count: res.total //数据总数，从服务端得到
                ,
            limit: params.pagesize,
            curr: params.pagenum,
            limits: [2, 3, 5, 10],
            groups: 5,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            jump: function(obj, first) {
                //obj包含了当前分页的所有参数，比如：
                // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                // console.log(obj.limit); //得到每页显示的条数
                params.pagenum = obj.curr
                params.pagesize = obj.limit
                    //首次不执行
                if (!first) {
                    //do something
                    getArticalList()
                }
            }
        });
    }

    var params = {

        pagenum: 1,
        pagesize: 10,
        cate_id: '',
        state: ''

    }
    getArticalList()

    function getArticalList() {
        $.ajax({
            type: 'get',
            url: '/my/article/list',
            data: params,
            success: function(res) {
                // console.log(res);
                if (res.status == 0) {
                    var htmlStr = template('category_list', res)
                    $('tbody').html(htmlStr)
                    renderPage(res)
                }
            }
        })
    }

    $('.myForm').on('submit', function(e) {
        console.log(11);

        e.preventDefault()
        params.cate_id = $('#category').val()
        params.state = $('#state').val()
        getArticalList()
    })


    $('table').on('click', '.btn-del', function() {

        // console.log(11);
        var count = $('table .btn-del').length
        console.log(count);

        var id = $(this).data('id')
        layer.confirm('确定删除吗?', { icon: 3, title: '提示' }, function(index) {

            $.ajax({
                type: 'get',
                url: '/my/article/delete/' + id,
                success: function(res) {
                    // console.log(res);
                    layer.msg(res.message)
                    if (res.status == 0) {

                        if (count = 0) {
                            params.pagenum = params.pagenum = 1 ? 1 : params.pagenum - 1
                        }
                        //do something
                        getArticalList()

                    }
                }
            })
            layer.close(index);
        })

    })



    // $('table').on('click', '.btn-change', function() {
    //     // console.log(111);
    //     // var id = $(this).data('id')
    //     window.location.href = './article_edit.html'
    // })
})