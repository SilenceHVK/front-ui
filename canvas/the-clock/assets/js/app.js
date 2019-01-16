'use strict';

(function(document) {
    var canvas = document.querySelector('#canvas');
    var ctx = canvas.getContext('2d');
    var width = canvas.width;
    var height = canvas.height;
    var r = width / 2;

    // 绘制 表盘
    function drawDial() {
        ctx.translate(r, r);
        ctx.beginPath();
        ctx.lineWidth = 10;
        ctx.arc(0, 0, r - 5, 0, 2 * Math.PI, false)
        ctx.stroke();

        var dialArr = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
        dialArr.forEach(function(value, index) {
            var rad = Math.PI / 180 * (30 * index);
            var x = Math.cos(rad) * (r - 40);
            var y = Math.sin(rad) * (r - 40);
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = '25px serif';
            ctx.fillText(value, x, y);
        });
        for (var i = 0; i < 60; i++) {
            var rad = Math.PI / 180 * (6 * i);
            var x = Math.cos(rad) * (r - 20);
            var y = Math.sin(rad) * (r - 20);
            ctx.beginPath();
            ctx.fillStyle = i % 5 === 0 ? '#000' : '#ccc';
            ctx.arc(x, y, 5, 0, 2 * Math.PI, false);
            ctx.fill();
        }
    }

    drawDial();
})(document);
