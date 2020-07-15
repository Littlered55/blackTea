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
            }],
            flag: false,
            toShow: false,
            name: '',
            addText: false,
            english: '',
            chinese: '',
            theDate: ''
        },
        mounted: function() {
            this.dayone();
        },

        methods: {

            show() {
                this.flag = !this.flag
            },
            // 删除与编辑的显示，以及删除与编辑的操作
            toshow(index) {
                this.toShow = !this.toShow;
                that = this
                $('#delete').click(function() {
                    console.log(index)
                        // 删除指定项
                    that.imgList.splice(index, 1);
                    that.toShow = !that.toShow;
                })
            },
            // 添加列表项编辑框显示
            addtext() {
                this.addText = !this.addText

            },
            // 添加
            add() {
                this.imgList.push({
                    'name': this.name,
                    'imgurl': "Content/images/电视.png"
                })
                this.name = ''
                this.addText = !this.addText
            },

            backTopersonal() {
                location.href = 'personal.html';
            },
            dayone() {
                that = this;
                $.ajax({
                    type: "get",
                    url: "http://47.98.35.180:8080/demo1/read/getEnglish",
                    async: false,
                    dataType: 'json',
                    success: function(res) {
                        console.log(res);
                        that.english = res.content;
                        that.chinese = res.note;
                        that.theDate = res.title;
                    }
                });
            }

        }
    })
})