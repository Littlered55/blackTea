$(document).ready(function() {
    var vm = new Vue({
        el: '#app1',
        data: {
            inforText: '',
            inforSort: ''
        },
        mounted: function() {
            this.getInforText();
        },
        methods: {
            backToinfor() {
                location.href = 'infor.html';
            },
            getInforText() {
                this.inforText = getCookie("inforText");
                this.inforSort = getCookie("inforSort");

            },
            changeText() {
                userid = getCookie("user_id");
                data1 = {};
                data1[this.inforSort] = this.inforText;
                data1.id = userid;
                console.log(this.inforSort + this.inforText);
                $.ajax({
                    type: "post",
                    url: "http://47.98.35.180:8080/demo1/user/modifyuser",
                    async: false,
                    dataType: 'json',
                    data: data1,
                    success: function(res) {
                        console.log(res);
                        if (res.status == 1) {
                            location.href = 'infor.html';
                        }
                    }
                });
            }

        }
    });

})