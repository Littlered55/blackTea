$(document).ready(function() {
    var vm = new Vue({
        el: '#app',
        data: {
            r_menu: "Content/images/右侧菜单.png",
            flag: false,
            toShow: false,
            roomList: [],
            createpop: false,
            roomName: '',
            max_num: '',
            roomRank: false,
            roomopt: false,
            addroompop: false,
            roomid: '',
            ranklist:[]
        },
        mounted: function() {
            this.getRoom();
            // this.getMyroom();
        },

        methods: {
            // 获取自习室列表
            getRoom() {
                that = this
                $.ajax({
                    type: "get",
                    url: "http://47.98.35.180:8080/demo1/room/getroomlist",
                    async: false,
                    dataType: 'json',
                    success: function(res) {
                        console.log(res);
                        that.roomList = res.data.list;
                    }
                });
            },
            show() {
                this.flag = !this.flag
            },
            createRoomPopShow() {
                this.createpop = true;
            },
            createRoomPopHide() {
                this.createpop = false;
            },
            createRoom() {
                var iuserid = getCookie('user_id');
                that = this;
                if (this.roomName != '' && this.max_num != '') {
                    $.ajax({
                        type: "post",
                        url: "http://47.98.35.180:8080/demo1/room/createroom",
                        async: false,
                        dataType: 'json',
                        data: {
                            'iuserid': iuserid,
                            'iroomname': that.roomName,
                            'imaxnum': that.max_num
                        },
                        success: function(res) {
                            console.log(res);
                            console.log('click');
                            if (res.msg == "处理失败!") {
                                $('.pop>p').text('创建失败,已达5个！');
                                $(".pop").css('display', 'block');
                                setTimeout(function() {
                                    $(".pop").css('display', 'none');
                                }, 2000)
                            } else {
                                $('.pop>p').text('创建成功！');
                                $(".pop").css('display', 'block');
                                setTimeout(function() {
                                    $(".pop").css('display', 'none');
                                }, 2000)
                            }
                        }
                    });
                } else {
                    $('.pop>p').text('失败，名称或容量为空！');
                    $(".pop").css('display', 'block');
                    setTimeout(function() {
                        $(".pop").css('display', 'none');
                    }, 2000)
                }
                this.roomName = '';
                this.max_num = '';
                location.reload();

            },
            createBtn() {
                this.createRoomPopHide();
                this.createRoom();

            },
            roomRankHide() {
                this.roomRank = false;
            },
            roomRankShow(index) {
                this.roomRank = true;
                let that = this;
                var roomid1 = this.roomList[index].id;
                $.ajax({
                    type: "get",
                    url: "http://47.98.35.180:8080/demo1/room/rankinglist",
                    async: false,
                    dataType: 'json',
                    data: {
                        'room_id': roomid1
                    },
                    success: function(res) {
                        // console.log(res);
                        that.ranklist = res.data.list;
                    }
                });
            },
            getMyroom() {
                that = this;
                var userid = getCookie('user_id');
                $.ajax({
                    type: "get",
                    url: "http://47.98.35.180:8080/demo1/room/getroomlistwithid",
                    async: false,
                    dataType: 'json',
                    data: {
                        'user_id': userid
                    },
                    success: function(res) {
                        // console.log(res);
                        that.roomList = res.data.list;
                    }
                });
            },
            roomoptShow() {
                this.roomopt = true;
            },
            roomoptHide() {
                this.roomopt = false;
            },
            roomopt_create() {
                this.roomoptHide();
                this.createRoomPopShow();
            },
            addroomHide() {
                this.addroompop = false;
            },
            addroomShow() {
                this.addroompop = true;
            },
            roomopt_add() {
                this.roomoptHide();
                this.addroomShow();
            },
            addroom() {
                that = this;
                var userid = getCookie('user_id');
                $.ajax({
                    type: "post",
                    url: "http://47.98.35.180:8080/demo1/room/enterroom",
                    async: false,
                    dataType: 'json',
                    data: {
                        'user_id': userid,
                        'room_id': that.roomid
                    },
                    success: function(res) {
                        console.log(res);
                        console.log(that.roomid)
                        if (res.msg == "处理成功!") {
                            $('.pop>p').text('加入成功！');
                            $(".pop").css('display', 'block');
                            setTimeout(function() {
                                $(".pop").css('display', 'none');
                            }, 2000)
                        } else {
                            $('.pop>p').text('加入失败！');
                            $(".pop").css('display', 'block');
                            setTimeout(function() {
                                $(".pop").css('display', 'none');
                            }, 2000)
                        }
                    }
                });
                this.roomid = '';
            },
            add_room() {
                this.addroomHide();
                this.addroom();
            }
        }
    })
})