$(document).ready(function() {
    new Vue({
        el: '#app',
        data: {
            account: "",
            password: "",
            username: "",
            level: "",
            phone: "",
            remind: ""
        },
        methods: {
            toRegistrar: function() {
                that = this;
                if (this.account != '' && this.password != '' && this.username != '' && this.level != '' && this.phone != '') {
                    $.ajax({
                        type: "post",
                        url: "http://47.98.35.180:8080/demo1/user/register",
                        async: false,
                        dataType: 'json',
                        data: {
                            account: that.account,
                            password: that.password,
                            username: that.username,
                            level: that.level,
                            phone: that.phone
                        },
                        success: function(res) {
                            console.log(that.account);

                            if (res.status == 1) {
                                $(".pop").css("display", "block");
                                setTimeout(function() {
                                    $(".pop").css("display", "none");
                                    location.href = "login.html";
                                }, 2000);

                            }

                        }
                    });
                } else if (this.account == '') {
                    this.remind = "账号不能为空！"

                } else if (this.password == '') {
                    this.remind = "密码不能为空！"

                } else if (this.username == '') {
                    this.remind = "用户名不能为空！"
                } else if (this.level == '') {
                    this.remind = "年级不能为空！"
                } else if (this.phone == '') {
                    this.remind = "电话不能为空！"
                }
            }

        }
    })
})