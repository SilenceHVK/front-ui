'use strict';

(function (document) {
    var canvas = document.querySelector('#canvas');
    var ctx = canvas.getContext('2d');
    var width = canvas.width;
    var height = canvas.height;
    var r = width / 2;

    console.log(r);

    // 绘制 表盘
    function drawDial() {
        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = 10;
        ctx.arc(r, r, r - 5, 0, 2 * Math.PI, false);
        ctx.stroke();
    }

    // 绘制时钟刻度
    function drawClock() {
    }

    drawDial();
})(document);
