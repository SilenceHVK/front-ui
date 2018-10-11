'use strict';

(function () {
    var Draw = {};

    /**
     * 初始化 Draw 对象
     * @param {String} canvas 
     * @param {Number} width 
     * @param {Number} height 
     */
    Draw.init = function (canvas, width, height) {
        this.canvas = document.querySelector(canvas);
        if (this.canvas) {
            this.context = this.canvas.getContext('2d');
            this.canvas.width = width;
            this.canvas.height = height;
            // 绘制灰太狼的头部
            this.drawHeader();
            // 绘制灰太狼的面部特征
            this.drawFacialFeatures();
            // 绘制灰太狼的手臂和围巾
            this.drawArm();
            // 绘制灰太狼的身体
            this.drawBody();
            // 绘制灰太狼的腿
            this.drawThigh();
        }
    };

    /**
     * 绘制灰太狼的头部
     */
    Draw.drawHeader = function () {
        var context = this.context;
        context.beginPath();
        context.lineWidth = 2;
        context.strokeStyle = 'gray';
        context.moveTo(33, 43);
        /**
         * quadraticCurveTo() 方法通过使用表示二次贝塞尔曲线的指定控制点，向当前路径添加一个点。
         * context.quadraticCurveTo(cpx,cpy,x,y);
         * cpx  贝塞尔控制点的 x 坐标
         * cpy  贝塞尔控制点的 y 坐标
         * x    结束点的 x 坐标
         * y    结束点的 y 坐标
         */
        context.quadraticCurveTo(55, 40, 120, 73);
        context.moveTo(33, 43);
        context.lineTo(68, 142);
        context.moveTo(33, 43);
        context.quadraticCurveTo(73, 92, 89, 130);
        context.quadraticCurveTo(75, 127, 81, 136);
        context.lineTo(73, 136);
        context.lineTo(73, 139);
        context.quadraticCurveTo(36, 164, 24, 213);
        /**
         * bezierCurveTo() 方法通过使用表示三次贝塞尔曲线的指定控制点，向当前路径添加一个点。
         * context.bezierCurveTo(cp1x,cp1y,cp2x,cp2y,x,y);
         * cp1x 第一个贝塞尔控制点的 x 坐标
         * cp1y 第一个贝塞尔控制点的 y 坐标
         * cp2x 第二个贝塞尔控制点的 x 坐标
         * cp2y 第二个贝塞尔控制点的 2 坐标
         * x    结束点的 x 坐标
         * y    结束点的 y 坐标
         */
        context.bezierCurveTo(52, 215, 49, 223, 41, 233);
        context.quadraticCurveTo(61, 235, 76, 243);
        context.bezierCurveTo(88, 350, 290, 350, 309, 252);
        context.quadraticCurveTo(320, 239, 353, 234);
        context.bezierCurveTo(338, 223, 354, 215, 371, 214);
        context.quadraticCurveTo(360, 169, 325, 144);
        context.lineTo(333, 121);
        context.quadraticCurveTo(317, 100, 341, 97);
        context.lineTo(361, 43);
        context.quadraticCurveTo(307, 48, 266, 75);
        context.moveTo(361, 43);
        context.quadraticCurveTo(332, 72, 304, 133);
        context.quadraticCurveTo(318, 127, 313, 134);
        context.quadraticCurveTo(323, 132, 318, 140);
        context.quadraticCurveTo(324, 136, 325, 144);
        context.moveTo(266, 75);
        context.quadraticCurveTo(265, 90, 243, 94);
        context.lineTo(133, 112);
        context.quadraticCurveTo(90, 116, 107, 91);
        context.quadraticCurveTo(147, 29, 223, 27);
        context.quadraticCurveTo(272, 38, 266, 75);
        context.moveTo(107, 91);
        context.quadraticCurveTo(111, 110, 144, 100);
        context.lineTo(244, 80);
        context.quadraticCurveTo(264, 76, 267, 61);
        context.moveTo(196, 30);
        context.lineTo(176, 51);
        context.quadraticCurveTo(224, 43, 240, 66);
        context.quadraticCurveTo(252, 55, 264, 53);
        context.moveTo(186, 38);
        context.lineTo(198, 37);
        context.moveTo(186, 38);
        context.lineTo(198, 37);
        context.moveTo(176, 43);
        context.lineTo(190, 43);
        context.moveTo(186, 53);
        context.lineTo(194, 45);
        context.moveTo(200, 45);
        context.lineTo(196, 54);
        context.moveTo(210, 47);
        context.lineTo(205, 54);
        context.moveTo(219, 49);
        context.lineTo(213, 54);
        context.moveTo(229, 50);
        context.lineTo(222, 59);
        context.moveTo(237, 52);
        context.lineTo(232, 65);
        context.moveTo(244, 56);
        context.lineTo(250, 66);
        context.moveTo(252, 52);
        context.lineTo(261, 62);
        context.stroke();
        context.beginPath();
        context.lineWidth = 10;
        context.moveTo(99, 123);
        context.lineTo(169, 164);
        context.moveTo(220, 172);
        context.lineTo(291, 130);
        context.stroke();
    };

    /**
     * 绘制灰太狼的面部特征
     */
    Draw.drawFacialFeatures = function () {
        var context = this.context;
        context.beginPath();
        context.lineWidth = 2;
        context.moveTo(88, 168);
        context.lineTo(174, 188);
        context.moveTo(212, 180);
        context.lineTo(297, 199);
        context.moveTo(87, 173);
        context.lineTo(126, 286);
        context.moveTo(80, 204);
        context.lineTo(108, 191);
        context.moveTo(91, 220);
        context.lineTo(111, 211);
        context.moveTo(96, 236);
        context.lineTo(114, 226);
        context.moveTo(106, 248);
        context.lineTo(119, 243);
        context.moveTo(106, 267);
        context.lineTo(124, 259);
        context.moveTo(117, 276);
        context.lineTo(126, 272);
        context.moveTo(106, 171);
        context.bezierCurveTo(109, 200, 142, 204, 159, 185);
        context.moveTo(230, 184);
        context.bezierCurveTo(233, 210, 267, 218, 284, 197);
        context.moveTo(123, 253);
        context.quadraticCurveTo(193, 275, 272, 253);
        context.bezierCurveTo(260, 300, 120, 290, 123, 253);
        context.stroke();
        //眼睛 嘴巴 伤疤
        context.beginPath();
        context.lineWidth = 1;
        context.moveTo(125, 260);
        context.lineTo(134, 263);
        context.lineTo(136, 259);
        context.lineTo(139, 265);
        context.lineTo(155, 270);
        context.moveTo(237, 270);
        context.lineTo(252, 266);
        context.lineTo(254, 258);
        context.lineTo(258, 264);
        context.lineTo(268, 261);
        context.stroke();
        context.beginPath();
        context.lineWidth = 2;
        context.fillStyle = 'black';
        context.save();
        context.translate(133, 179);
        context.rotate(Math.PI * 2 / 20);
        context.arc(0, 0, 5, 3, Math.PI * 2, true);
        context.fill();
        context.restore();
        context.beginPath();
        context.save();
        context.translate(254, 190);
        context.rotate(Math.PI * 2 / 20);
        context.arc(0, 0, 5, 3, Math.PI * 2, true);
        context.fill();
        context.restore();
        context.beginPath();
        context.moveTo(190, 212);
        context.bezierCurveTo(150, 214, 150, 246, 190, 246);
        context.bezierCurveTo(230, 246, 230, 214, 190, 212);
        context.fill();
    };

    /**
     * 绘制灰太狼的手臂和围巾
     */
    Draw.drawArm = function () {
        var context = this.context;
        context.beginPath();
        context.moveTo(119, 306);
        context.quadraticCurveTo(132, 334, 205, 363);//围巾左角 边
        context.quadraticCurveTo(256, 334, 264, 310);
        context.moveTo(110, 300);
        context.quadraticCurveTo(86, 334, 81, 370);
        context.quadraticCurveTo(67, 371, 66, 394);
        context.bezierCurveTo(60, 418, 71, 427, 76, 421);
        context.moveTo(76, 399);
        context.bezierCurveTo(70, 419, 85, 434, 89, 421);
        context.quadraticCurveTo(79, 414, 85, 399);
        context.moveTo(89, 421);
        context.bezierCurveTo(98, 430, 102, 430, 99, 400);
        context.moveTo(101, 410);
        context.quadraticCurveTo(119, 419, 112, 400);
        context.bezierCurveTo(105, 388, 114, 378, 101, 371);
        context.moveTo(100, 376);
        context.quadraticCurveTo(109, 324, 126, 315);
        context.moveTo(280, 299);
        context.quadraticCurveTo(310, 340, 312, 371);
        context.quadraticCurveTo(326, 376, 326, 398);
        context.bezierCurveTo(330, 415, 326, 426, 318, 420);
        context.moveTo(317, 399);
        context.bezierCurveTo(323, 419, 313, 433, 305, 422);
        context.moveTo(309, 400);
        context.bezierCurveTo(310, 425, 291, 442, 292, 403);
        context.moveTo(292, 410);
        context.bezierCurveTo(284, 416, 274, 413, 282, 397);
        context.quadraticCurveTo(280, 375, 293, 371);
        context.moveTo(294, 376);
        context.quadraticCurveTo(289, 338, 267, 314);
        context.stroke();
    }

    /**
     * 绘制灰太狼的身体
     */
    Draw.drawBody = function () {
        var context = this.context;
        context.beginPath();
        context.lineWidth = 3;
        context.moveTo(127, 319);
        context.bezierCurveTo(90, 470, 310, 460, 262, 317);
        context.moveTo(188, 389);
        context.lineTo(197, 399);
        context.moveTo(190, 402);
        context.lineTo(195, 391);
        context.stroke();
        context.beginPath();
        context.save();
        context.translate(194, 396);
        context.arc(0, 0, 10, 1, Math.PI * 2, false);
        context.restore();
        context.stroke();
    };

    /**
     * 绘制灰太狼的腿
     */
    Draw.drawThigh = function () {
        var context = this.context;
        context.beginPath();
        context.lineWidth = 2;
        context.moveTo(144, 406);
        context.lineTo(127, 434);
        context.lineTo(136, 449);
        context.moveTo(152, 417);
        context.lineTo(142, 434);
        context.moveTo(139, 431);
        context.lineTo(151, 450);
        context.bezierCurveTo(110, 441, 90, 464, 105, 476);
        context.lineTo(156, 476);
        context.bezierCurveTo(175, 473, 170, 459, 151, 450);
        context.moveTo(126, 455);
        context.quadraticCurveTo(106, 456, 108, 474);
        context.moveTo(139, 457);
        context.quadraticCurveTo(121, 459, 125, 474);
        context.moveTo(244, 416);
        context.lineTo(252, 433);
        context.moveTo(255, 430);
        context.lineTo(245, 450);
        context.moveTo(254, 406);
        context.lineTo(269, 433);
        context.lineTo(261, 448);
        context.bezierCurveTo(218, 456, 220, 472, 234, 475);
        context.lineTo(289, 475);
        context.bezierCurveTo(304, 467, 302, 452, 261, 448);
        context.moveTo(255, 457);
        context.quadraticCurveTo(275, 461, 268, 474);
        context.moveTo(270, 455);
        context.quadraticCurveTo(291, 462, 285, 474);
        context.moveTo(198, 428);
        context.quadraticCurveTo(203, 453, 228, 458);
        context.moveTo(236, 453);
        context.bezierCurveTo(213, 440, 214, 437, 248, 448);
        context.bezierCurveTo(230, 430, 230, 428, 251, 433);
        context.moveTo(275, 450);
        context.quadraticCurveTo(287, 432, 287, 416);
        context.quadraticCurveTo(270, 420, 255, 412);
        context.stroke();
    };

    window.draw = Draw;
})();

window.onload = function () {
    window.draw.init('#canvas', 400, 500);
}