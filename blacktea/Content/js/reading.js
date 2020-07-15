$(document).ready(function() {
    var vm = new Vue({
        el: '#app',
        data: {
            r_menu: "Content/images/右侧菜单.png",
            imgList: [{
                    name: "学习",
                    imgurl: "Content/images/学习.png"
                }, {
                    name: "做运动",
                    imgurl: "Content/images/运动.png"
                }, {
                    name: "听音乐",
                    imgurl: "Content/images/音乐.png"
                }, {
                    name: "看电视",
                    imgurl: "Content/images/电视.png"
                }

            ],
            flag: false,
            toShow: false,
            name: '',
            addText: false,
            book_list: [],
            myContent: "",
            imgUrl: ""

        },
        mounted: function() {
            this.getBook();
            this.getImg();
        },

        methods: {
            getBook() {
                that = this
                $.ajax({
                    type: "get",
                    url: "http://47.98.35.180:8080/demo1/read/getreadlatest",
                    async: false,
                    dataType: 'json',
                    success: function(res) {
                        console.log(res);
                        if (res.msg == "处理成功!") {
                            console.log(res);
                            that.book_list = res.data.list;
                        }
                        // console.log(that.book_list);
                    }
                });
            },
            show() {
                this.flag = !this.flag
            },
            // 删除与编辑的显示，以及删除与编辑的操作
            toshow(index) {
                this.toShow = !this.toShow;
                that = this
                $('#delete').click(function() {
                    // console.log(index)
                    // 删除指定项
                    that.imgList.splice(index, 1);
                    that.toShow = !that.toShow;
                })
            },
            // 添加列表项编辑框显示
            addtext() {
                this.addText = !this.addText

            },

            send_myContent() {
                that = this;
                var userid = getCookie("user_id");
                console.log(userid);
                // this.book_list.push({ 'content': this.myContent, 'img': 'Content/images/教室1.png', 'name': 'xiaowang', 'send_date': Date() })
                $.ajax({
                    type: "post",
                    url: "http://47.98.35.180:8080/demo1/read/createread",
                    async: false,
                    dataType: 'json',
                    data: {
                        'user_id': userid,
                        'img': this.imgUrl,
                        'content': that.myContent
                    },
                    success: function(res) {
                        // console.log(res);
                        if (res.msg == "处理成功!") {
                            location.reload();
                        }
                    }
                });
                this.myContent = '';
            },
            backTopersonal() {
                location.href = 'personal.html';
            },
            getImg() {
                $('#load').click(function() {
                    document.getElementById("load_img").click();
                });
            },
            uploadFile() {
                var myform = new FormData();
                myform.append('file', $('#load_img')[0].files[0]);
                that = this;
                $.ajax({
                    url: "http://47.98.35.180:8080/demo1/file/upload",
                    type: "POST",
                    data: myform,
                    contentType: false,
                    processData: false,
                    success: function(res) {
                        console.log(res);
                        that.imgUrl = res.data.file;
                    },
                    error: function(res) {
                        console.log(res);
                    }
                });
            }

        }
    })
})