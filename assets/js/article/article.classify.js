$(function() {

    renderData()

    function renderData() {
        $.ajax({
            type: 'get',
            url: '/my/article/cates',
            success: function(res) {
                // console.log(res);
                if (res.status === 0) {
                    var htmlStr = template('categoryList', res)
                    $('tbody').html(htmlStr)
                }
            }
        })
    }

    $('tbody').on('click', '.btn-delete', function() {

        var id = $(this).attr('data-id')
        console.log(id);

        layer.confirm('确定删除此分类?', { icon: 3, title: '提示' }, function(index) {
            //do something

            $.ajax({
                type: 'get',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status === 0) {
                        layer.close(index);
                        renderData()
                    }
                }
            })

        });

    })

    var addData
    $('body').on('click', '.btn-add', function() {
        // console.log(11);

        addData = layer.open({
            type: 1,
            title: '添加文章类别',
            content: $('#add').html(),
            area: '550px',
        });
    });

    var form = layui.form;
    form.verify({
        username: function(value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '分类名称和分类别名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '分类名称和分类别名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '分类名称和分类别名不能全为数字';
            }
        }
    })

    $('body').on('submit', '.addForm', function(e) {
        // console.log(11);
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);
                if (res.status === 0) {
                    layer.close(addData)
                    renderData()
                }
            }
        })

    })

    var updateData;
    $('tbody').on('click', '.btn-edit', function() {

        var id = $(this).data('id')
        updateData = layer.open({
            type: 1,
            title: '更新文章分类',
            content: $('#update').html(),
            area: '500px'
        })
        $.ajax({
            type: 'get',
            url: '/my/article/cates/' + id,
            success: function(res) {
                console.log(res.data);

                if (res.status === 0) {
                    // console.log(11);
                    form.val('editForm', res.data)
                }
            }
        })

    })


    $('body').on('submit', '.updateForm', function(e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);

                if (res.status == 0) {
                    layer.close(updateData)
                    renderData()
                }
            }
        })
    })
})