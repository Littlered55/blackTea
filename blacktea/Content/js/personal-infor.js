$(document).ready(function() {
    var vm = new Vue({
        el: '#app',
        data: {
            account: '',
            password: '',
            username: '',
            level: '',
            phone: '',
            inforText: ''
        },
        mounted: function() {
            this.getInfor();
            // this.changeIforText();
        },
        methods: {
            backToinfor() {
                location.href = 'infor.html';
            },
            backTopersonal() {
                location.href = 'personal.html';
            },
            intoInforChange(e) {

                infor_text = e.currentTarget.previousElementSibling.innerHTML
                infor_sort = e.currentTarget.parentElement.firstElementChild.innerHTML;
                console.log(infor_sort);
                console.log(infor_text);
                this.inforText = infor_text;
                this.inforSort = infor_sort;
                console.log(this.inforText);
                setCookie("inforText", this.inforText);
                setCookie("inforSort", this.inforSort);
                location.href = "infor-change.html";
            },
            getInfor() {
                that = this;
                var userid = getCookie("user_id");
                that.id = userid;
                $.ajax({
                    type: "get",
                    url: "http://47.98.35.180:8080/demo1/user/getuserinfo",
                    async: false,
                    dataType: 'json',
                    data: {
                        user_id: userid
                    },
                    success: function(res) {
                        console.log(res);
                        that.account = res.data.data.account;
                        that.password = res.data.data.password;
                        that.username = res.data.data.username;
                        that.level = res.data.data.level;
                        that.phone = res.data.data.phone;

                    }
                });
            }

        }
    });

})