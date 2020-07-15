$(document).ready(function() {
    var vm = new Vue({
        el: '#app',
        data: {
            r_menu: "Content/images/右侧菜单.png",
            flag: false,
            toShow: false,
            countday: '',
            countduration: '',
            counttime: '',
            today: '',
            count_duration: '',
            count_time: '',
            sumduration: '',
            tenData: '',
            xdate:[],
            ydate:[]
        },
        mounted: function() {
            this.date_one();
            this.date_two();
            this.date_three();
            this.date_four();
            this.dateShow();
        },

        methods: {
            show() {
                this.flag = !this.flag
            },
            dateShow() {
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById('main'));
                let that = this;
                console.log(this.xdate);
                console.log(this.ydate);
                var x=this.xdate;
                var y=this.ydate;
                // 指定图表的配置项和数据
                var option = {
                    xAxis: {
                        type: 'category',
                        data: x
                    },
                    yAxis: {
                        type: 'category',
                        data:["00点","01点","02点","03点","04点","05点","06点","07点","08点","09点","10点","11点"]
                    },
                    series: [{
                        data: y,
                        type: 'line'
                    }]
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            },
            date_one() {
                var userid = getCookie('user_id');
                that = this;
                $.ajax({
                    type: "get",
                    url: "http://47.98.35.180:8080/demo1/sch/countall",
                    async: false,
                    dataType: 'json',
                    data: {
                        'user_id': userid
                    },
                    success: function(res) {
                        // console.log(res);
                        that.counttime = res.data.list.counttime;
                        that.countday = res.data.list.countday;
                        that.countduration = res.data.list.countduration;
                    }
                });
            },
            date_two() {
                this.today = this.formatDate(Date());
                var userid = getCookie('user_id');
                that = this;
                $.ajax({
                    type: "get",
                    url: "http://47.98.35.180:8080/demo1/sch/countday",
                    async: false,
                    dataType: 'json',
                    data: {
                        'user_id': userid
                    },
                    success: function(res) {
                        that.count_duration = res.data.list.count_duration;
                        that.count_time = res.data.list.count_time;
                    }
                });
            },
            date_three() {
                var userid = getCookie('user_id');
                that = this;
                $.ajax({
                    type: "get",
                    url: "http://47.98.35.180:8080/demo1/sch/countmonth",
                    async: false,
                    dataType: 'json',
                    data: {
                        'user_id': userid
                    },
                    success: function(res) {
                        if (res.status == 1) {
                            that.sumduration = res.data.list.sumduration;
                        }
                    }
                });
                $.ajax({
                    type: "get",
                    url: "http://47.98.35.180:8080/demo1/sch/counttenday",
                    async: false,
                    dataType: 'json',
                    data: {
                        'user_id': userid
                    },
                    success: function(res) {
                        if (res.status == 1) {
                            that.tenData = res.data.list.sumduration;
                        }
                    }
                });
            },
            date_four(){
                var userid = getCookie('user_id');
                let that = this;
                $.ajax({
                    type: "get",
                    url: "http://47.98.35.180:8080/demo1/clockin/weekclockin",
                    async: false,
                    dataType: 'json',
                    data: {
                        'user_id': userid,
                        'isGetup':true
                    },
                    success: function(res) {
                        if (res.status == 1) {
                            that.xdate=res.data.datax;
                            that.ydate=res.data.datay;
                        }
                    }
                });
            },
            formatDate(date) {
                date = new Date(Date.parse(date.replace(/-/g, "/"))); //转换成Data();
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                m = m < 10 ? '0' + m : m;
                var d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                return y + '-' + m + '-' + d;
            }
        }

    })
})