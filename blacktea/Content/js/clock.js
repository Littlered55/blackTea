$(document).ready(function() {
    var vm = new Vue({
        el: "#app",
        data: {
            isGetup: false,
            flag: true
        },
        methods: {
            getClock() {
                var userid = getCookie("user_id");
                let that = this;
                $.ajax({
                    type: "post",
                    url: "http://47.98.35.180:8080/demo1/clockin/createclockin",
                    async: false,
                    dataType: 'json',
                    data: {
                        'user_id': userid,
                        'isGetup': that.isGetup
                    },
                    success: function(res) {
                        console.log(res);
                        if (res.status == 1) {
                            location.href = 'personal.html';
                        } else {
                            $('.pop>p').text('您已打过卡！');
                            $(".pop").css('display', 'block');
                            setTimeout(function() {
                                $(".pop").css('display', 'none');
                                location.href = 'personal.html';
                            }, 1000)

                        }

                    }
                });
            },
            getupClock() {
                this.isGetup = true;
                // console.log("up");
                // console.log(this.isGetup);

            },
            gobedClock() {
                this.isGetup = false;
                // console.log("sleep");
                // console.log(this.isGetup);

            },
            upClock() {
                this.getupClock();
                this.getClock();
            },
            sleepClock() {
                this.gobedClock();
                this.getClock();
            }
        }
    });
});