$(document).ready(function() {
    var vm = new Vue({
        el: "#app",
        data: {
            sch_id: 0,
            finish_id: 0,
            sumtime: 1,
            duration: 0,
            minute: 0,
            second: 0,
            pause: 0,
            message: "恭喜完成专注",
            pausemsg: "暂停",
            flag: true
        },
        created: function() {
            this.setSch_id();
            this.setDuration();
        },
        mounted() {
            let that = this; // 声明一个变量指向Vue实例this，保证作用域一致
            this.timer = setInterval(() => {
                if (that.sumtime > 0 && that.pause == 0) {
                    that.sumtime = that.sumtime - 1;
                    that.duration = that.duration + 1;
                    that.minute = Math.floor(that.sumtime / 60);
                    that.second = that.sumtime % 60;
                }
            }, 1000);
        },
        watch: {
            sumtime(val) {
                let that = this;
                if (val == 0) {
                    var newduration = Math.floor(this.duration / 60);
                    $.ajax({
                        type: "post",
                        url: "http://47.98.35.180:8080/demo1/sch/finishsch",
                        async: false,
                        dataType: 'json',
                        data: {
                            'id': that.finish_id,
                            'duration': newduration
                        },
                        success: function(res) {
                            console.log(res);
                            if (res.status == 1) {
                                $(".mesbox").css("display", "flex");
                                setTimeout(function() {
                                    location.href = "index.html";
                                }, 1000);
                            }
                            // if (res.msg == "处理成功!") {
                            //     location.reload();
                            // }
                        }
                    });
                }
            }
        },
        methods: {
            setSch_id() {
                this.sch_id = getCookie("sch_id");
                let that = this;
                $.ajax({
                    type: "post",
                    url: "http://47.98.35.180:8080/demo1/sch/startsch",
                    async: false,
                    dataType: 'json',
                    data: {
                        'sch_id': that.sch_id,
                    },
                    success: function(res) {
                        console.log(res);
                        if (res.status == 1) {
                            that.finish_id = res.data.data.id;
                        }
                        // if (res.msg == "处理成功!") {
                        //     location.reload();
                        // }
                    }
                });
            },
            setDuration() {
                this.minute = parseInt(getCookie("duration"));
                this.sumtime = this.minute * 60;
            },
            adfinish() {
                let that = this;
                var newduration = Math.floor(this.duration / 60);
                $.ajax({
                    type: "post",
                    url: "http://47.98.35.180:8080/demo1/sch/finishsch",
                    async: false,
                    dataType: 'json',
                    data: {
                        'id': that.finish_id,
                        'duration': newduration
                    },
                    success: function(res) {
                        console.log(res);
                        if (res.status == 1) {
                            $(".mesbox").css("display", "flex");
                            setTimeout(function() {
                                location.href = "index.html";
                            }, 1000);
                        }
                        // if (res.msg == "处理成功!") {
                        //     location.reload();
                        // }
                    }
                });
            },
            pausesch() {
                if (this.pause == 0) {
                    this.pause = 1;
                    this.pausemsg = "开始";
                } else {
                    this.pause = 0;
                    this.pausemsg = "暂停";
                }
            }
        }
    });
});