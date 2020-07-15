$(document).ready(function() {
    new Vue({
        el: '#app',
        data: {
            account: "",
            password: "",
            message: ""
        },
        methods: {
            login() {
                let that = this;
                if (this.account != "" && this.password != "") {
                    $.ajax({
                        type: "post",
                        url: "http://47.98.35.180:8080/demo1/user/login",
                        async: false,
                        dataType: 'json',
                        data: {
                            account: that.account,
                            password: that.password
                        },
                        success: function(res) {
                            console.log(res);
                            if (res.status == 1) {
                                setCookie("user_id", res.data.userid.id);
                                location.href = "index.html";
                            } else {
                                that.message = "用户名或密码错误";
                            }
                        }
                    });
                } else {
                    this.message = "请正确输入用户名和密码!"
                }
            }
        }
    })
})