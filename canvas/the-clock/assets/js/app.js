'use strict';

(function(document) {
    var canvas = document.querySelector('#canvas');
    var ctx = canvas.getContext('2d');
    var width = canvas.width;
    var height = canvas.height;
    var r = width / 2;
    var dialArr = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];

    // 绘制 表盘
    function drawDial() {
        ctx.save();
        ctx.translate(r, r);
        ctx.beginPath();
        ctx.lineWidth = 10;
        ctx.arc(0, 0, r - 5, 0, 2 * Math.PI, false)
        ctx.stroke();

        dialArr.forEach(function(value, index) {
            var rad = Math.PI / 180 * (30 * index);
            var x = Math.cos(rad) * (r - 50);
            var y = Math.sin(rad) * (r - 50);
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = '30px serif';
            ctx.fillText(value, x, y);

        });
        for (var i = 0; i < 60; i++) {
            var rad = Math.PI / 180 * (6 * i);
            var x = Math.cos(rad) * (r - 25);
            var y = Math.sin(rad) * (r - 25);
            ctx.beginPath();
            ctx.fillStyle = i % 5 === 0 ? '#000' : '#ccc';
            ctx.arc(x, y, 5, 0, 2 * Math.PI, false);
            ctx.fill();
        }
    }

    // 绘制 时针
    function drawHour(hour, min) {
        ctx.save();
        ctx.beginPath();
        var rad = 2 * Math.PI / 12 * hour;
        var mrad = 2 * Math.PI / 12 / 60 * min;
        ctx.rotate(rad + mrad);
        ctx.lineCap = 'round';
        ctx.lineWidth = 6;
        ctx.moveTo(0, 10);
        ctx.lineTo(0, -r / 2 + 20);
        ctx.stroke();
        ctx.restore();
    }

    // 绘制 分针
    function drawMinute(min) {
        ctx.save();
        ctx.beginPath();
        var rad = 2 * Math.PI / 60 * min;
        ctx.rotate(rad);
        ctx.lineCap = 'round';
        ctx.lineWidth = 5;
        ctx.moveTo(0, 10);
        ctx.lineTo(0, -r + 90);
        ctx.stroke();
        ctx.restore();
    }
    // 绘制 分针
    function drawSecond(second) {
        ctx.save();
        ctx.beginPath();
        var rad = 2 * Math.PI / 60 * second;
        ctx.rotate(rad);
        ctx.fillStyle = '#c14543';
        ctx.moveTo(-2, 20);
        ctx.lineTo(2, 20);
        ctx.lineTo(1, -r + 45);
        ctx.lineTo(-1, -r + 45);
        ctx.fill();
        ctx.restore();
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);
        var date = new Date();
        var hour = date.getHours();
        var min = date.getMinutes();
        var second = date.getSeconds();

        drawDial();
        drawHour(hour, min);
        drawMinute(min);
        drawSecond(second);
        ctx.restore();

    }

    setInterval(draw, 1000);

})(document);
