$(document).ready(function() {
    var vm = new Vue({
        el: '#app',
        data: {
            r_menu: "Content/images/右侧菜单.png",
            itemList: [],
            flag: false,
            toShow: false,
            name: '',
            addText: false,
            type_list: [],
            sch_id: 0,
            mschedule_name: "",
            mduration: "",
            mremark: "",
            mtype_id: 0,
            add_schedule_name: "",
            add_duration: "",
            add_remark: "",
            add_type_id: 0,
            addboxShow: false
        },
        mounted: function() {
            this.getItems();
        },
        methods: {
            show() {
                this.flag = !this.flag
            },
            getItems() {
                that = this;
                var userid = getCookie("user_id");
                $.ajax({
                    type: "get",
                    url: "http://47.98.35.180:8080/demo1/sch/getsch",
                    async: false,
                    dataType: 'json',
                    data: {
                        'user_id': userid,
                    },
                    success: function(res) {
                        console.log(res);
                        that.itemList = res.data.list;
                        // if (res.msg == "处理成功!") {
                        //     location.reload();
                        // }
                    }
                });
                $.ajax({
                    type: "get",
                    url: "http://47.98.35.180:8080/demo1/sch/schtype",
                    async: false,
                    dataType: 'json',
                    success: function(res) {
                        console.log(res);
                        that.type_list = res.data.list;
                        // if (res.msg == "处理成功!") {
                        //     location.reload();
                        // }
                    }
                });
            },
            modifysch(index) {
                $(".modifybox").css("display", "flex");
                this.mschedule_name = this.itemList[index].schedule_name;
                this.mduration = this.itemList[index].duration;
                this.mremark = this.itemList[index].remark;
                this.mtype_id = this.itemList[index].type_id;
                this.sch_id = this.itemList[index].id;

            },
            cancelclick() {
                $(".modifybox").css("display", "none");
            },
            startsch(index) {
                setCookie("sch_id", this.itemList[index].id);
                setCookie("duration", this.itemList[index].duration);
                location.href = "schedule.html";
            },
            submitlclick() {
                let that = this;
                $.ajax({
                    type: "post",
                    url: "http://47.98.35.180:8080/demo1/sch/modifysch",
                    async: false,
                    dataType: 'json',
                    data: {
                        "id": that.sch_id,
                        "schedule_name": that.mschedule_name,
                        "duration": that.mduration,
                        "remark": that.mremark,
                        "type_id": that.mtype_id
                    },
                    success: function(res) {
                        console.log(res);
                        $(".modifybox").css("display", "none");
                        if (res.status == 1) {
                            $('.pop>p').text('修改成功！');
                            $(".pop").css('display', 'block');
                            setTimeout(function() {
                                $(".pop").css('display', 'none');
                            }, 2000)
                            setTimeout(function() {
                                location.reload();
                            }, 2500)
                        } else {
                            $('.pop>p').text('修改失败！');
                            $(".pop").css('display', 'block');
                            setTimeout(function() {
                                $(".pop").css('display', 'none');
                            }, 2000)
                        }
                        // if (res.msg == "处理成功!") {
                        //     location.reload();
                        // }
                    }
                });
            },
            addShow() {
                this.addboxShow = true;
            },
            addHide() {
                this.addboxShow = false;
            },
            addItem() {
                let that = this;
                var userid = getCookie('user_id');
                $.ajax({
                    type: "post",
                    url: "http://47.98.35.180:8080/demo1/sch/createsch",
                    async: false,
                    dataType: 'json',
                    data: {
                        "user_id": userid,
                        "schedule_name": that.add_schedule_name,
                        "duration": that.add_duration,
                        "remark": that.add_remark,
                        "type_id": that.add_type_id
                    },
                    success: function(res) {
                        console.log(res);
                        if (res.msg == "处理成功!") {
                            location.reload();
                        }
                    }
                });
            },
            addItem_hide() {
                this.addItem();
                this.addHide();
            }
        }

    })
})