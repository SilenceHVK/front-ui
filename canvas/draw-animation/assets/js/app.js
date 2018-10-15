!function(n,r){"object"==typeof exports&&"undefined"!=typeof module?module.exports=r():"function"==typeof define&&define.amd?define(r):n.starlings=r()}(this,function(){"use strict";return function(n,r,t,o,e,u,i,f){var a=f.onSetup;void 0===a&&(a=null);var v=f.onRepeat;void 0===v&&(v=null);var c=f.modifier;void 0===c&&(c=null);var l=f.perspective;void 0===l&&(l=1);var d=f.pixelRatio;void 0===d&&(d=1);var m=f.triangles;void 0===m&&(m=!1);var s,p,y=r.length,w=function(n,r){var t=s.createShader(n);return s.shaderSource(t,r),s.compileShader(t),t},b=function(){for(var n=0;n<o.length;n+=1){for(var r=s.createBuffer(),e=o[n],u=e.data(0,0).length,i=new Float32Array(t*y*u),f=0;f<t;f+=1)for(var a=e.data(f,t),v=f*y*u,l=0;l<y;l+=1)for(var d=0;d<u;d+=1)null!==c&&e.name===c.attribute?i[v]=c.value(i[v],a,d,l):i[v]=a[d],v+=1;s.bindBuffer(s.ARRAY_BUFFER,r),s.bufferData(s.ARRAY_BUFFER,i,s.STATIC_DRAW);var m=s.getAttribLocation(p,o[n].name);s.enableVertexAttribArray(m),s.vertexAttribPointer(m,u,s.FLOAT,!1,!1,0,0)}},A=function(){e.push({name:"uMVP",type:"mat4"});for(var n=0;n<e.length;n+=1){var r=s.getUniformLocation(p,e[n].name);e[n].location=r}},F={float:function(n,r){return s.uniform1f(n,r)},vec2:function(n,r){return s.uniform2fv(n,r)},vec3:function(n,r){return s.uniform3fv(n,r)},vec4:function(n,r){return s.uniform4fv(n,r)},mat2:function(n,r){return s.uniformMatrix2fv(n,!1,r)},mat3:function(n,r){return s.uniformMatrix3fv(n,!1,r)},mat4:function(n,r){return s.uniformMatrix4fv(n,!1,r)}},g=function(){s.clear(16640),s.useProgram(p),null!==v&&v(s,p,e);for(var n=0;n<e.length;n+=1)F[e[n].type](e[n].location,e[n].value);s.drawArrays(m?s.TRIANGLES:s.POINTS,0,y*t),requestAnimationFrame(g)},h=function(){n.width=n.clientWidth*d,n.height=n.clientHeight*d;var r=s.drawingBufferWidth,t=s.drawingBufferHeight;s.viewport(0,0,r,t),e[e.length-1].value=[l/(r/t),0,0,0,0,l,0,0,0,0,-1,-1,0,0,1,1]};s=n.getContext("webgl"),p=s.createProgram(),s.attachShader(p,w(s.VERTEX_SHADER,u)),s.attachShader(p,w(s.FRAGMENT_SHADER,i)),s.linkProgram(p),A(),h(),b(),null!==a&&a(s),g(),window.addEventListener("resize",h,!1)}});

'use strict';

var segments = [];
var points = [];

var input = document.querySelector('.input');
var output = document.querySelector('.output');

// Input
{
  (function () {
    var canvas = input.querySelector('canvas');
    var image = input.querySelector('img');

    var context = canvas.getContext('2d');
    canvas.width = canvas.clientWidth * window.devicePixelRatio;
    canvas.height = canvas.clientHeight * window.devicePixelRatio;

    context.lineWidth = window.devicePixelRatio === 1 ? 1 : 3;
    context.strokeStyle = '#FEFEFE';

    var current = [];
    var hold = false;

    var midPointBtw = function midPointBtw(p1, p2) {
      return {
        x: p1.x + (p2.x - p1.x) / 2,
        y: p1.y + (p2.y - p1.y) / 2
      };
    };

    var getCoordinatesFromEvent = function getCoordinatesFromEvent(event) {
      var touch = typeof event.changedTouches !== 'undefined';
      return {
        x: touch ? event.changedTouches[0].clientX : event.clientX,
        y: touch ? event.changedTouches[0].clientY : event.clientY
      };
    };

    var drawSegments = function drawSegments(event) {
      var coords = getCoordinatesFromEvent(event);
      current.push({
        x: coords.x * window.devicePixelRatio,
        y: coords.y * window.devicePixelRatio
      });
      context.beginPath();
      context.moveTo(current[0].x, current[0].y);
      for (var i = 0; i < current.length - 1; i += 1) {
        var midPoint = midPointBtw(current[i], current[i + 1]);
        context.quadraticCurveTo(current[i].x, current[i].y, midPoint.x, midPoint.y);
      }
      context.stroke();
    };

    var start = function start(event) {
      var coords = getCoordinatesFromEvent(event);
      hold = true;
      current = [{
        x: coords.x * window.devicePixelRatio,
        y: coords.y * window.devicePixelRatio
      }];
    };

    var move = function move(event) {
      var coords = getCoordinatesFromEvent(event);
      image.style.left = '0px';
      image.style.top = '0px';
      image.style.transform = 'translate3d(' + coords.x + 'px, ' + coords.y + 'px, 0)';
      if (hold) drawSegments(event);
    };

    var end = function end() {
      hold = false;
      segments.push(current);
    };

    canvas.addEventListener('mousedown', start);
    canvas.addEventListener('touchstart', start);

    input.addEventListener('mousemove', move);
    input.addEventListener('touchmove', move);

    canvas.addEventListener('mouseup', end);
    canvas.addEventListener('touchend', end);
  })();
}

// Output
{
  (function () {
      console.log(output);
    var canvas = output.querySelector('canvas');

    var initialize = function initialize() {
      var pixelRatio = window.devicePixelRatio;
      var multiplier = points.length;
      var duration = 0.4;
      var geometry = [{ x: 0, y: 0, z: 0 }];
      var pointSize = 4..toFixed(1);

      var step = 0;
      setTimeout(function () {
        step = 0.004;
      }, 400);

      var offset = 0.5;
      var attributes = [{
        name: 'aPositionStart',
        data: function data(i, total) {
          return [points[i].x, points[i].y, 0.2 - i / total * 0.4];
        }
      }, {
        name: 'aControlPointOne',
        data: function data(i, total) {
          return [points[i].x + getRandom(offset), points[i].y + getRandom(offset), 0.2 - i / total * 0.4 + getRandom(offset)];
        }
      }, {
        name: 'aControlPointTwo',
        data: function data(i, total) {
          return [points[i].x + getRandom(offset), points[i].y + getRandom(offset), 0.2 - i / total * 0.4 + getRandom(offset)];
        }
      }, {
        name: 'aPositionEnd',
        data: function data(i, total) {
          return [points[i].x, points[i].y, 0.2 - i / total * 0.4];
        }
      }, {
        name: 'aOffset',
        data: function data(i) {
          return [i * ((1 - duration) / (multiplier - 1))];
        }
      }, {
        name: 'aColor',
        data: function data(i, total) {
          return getHSL(i / total, 0.5, 0.5);
        }
      }];

      var uniforms = [{
        name: 'uProgress',
        type: 'float',
        value: 0.0
      }];

      var vertexShader = '\n    attribute vec3 aPositionStart;\n    attribute vec3 aControlPointOne;\n    attribute vec3 aControlPointTwo;\n    attribute vec3 aPositionEnd;\n    attribute float aOffset;\n    attribute vec3 aColor;\n\n    uniform float uProgress;\n    uniform mat4 uMVP;\n\n    varying vec3 vColor;\n\n    vec3 bezier4(vec3 a, vec3 b, vec3 c, vec3 d, float t) {\n      return mix(mix(mix(a, b, t), mix(b, c, t), t), mix(mix(b, c, t), mix(c, d, t), t), t);\n    }\n\n    float easeInOutQuint(float t){\n      return t < 0.5 ? 16.0 * t * t * t * t * t : 1.0 + 16.0 * (--t) * t * t * t * t;\n    }\n\n    void main () {\n      float tProgress = easeInOutQuint(min(1.0, max(0.0, (uProgress - aOffset)) / ' + duration + '));\n      vec3 newPosition = bezier4(aPositionStart, aControlPointOne, aControlPointTwo, aPositionEnd, tProgress);\n      gl_PointSize = ' + pointSize + ';\n      gl_Position = uMVP * vec4(newPosition, 1.0);\n      vColor = aColor;\n    }\n  ';

      var fragmentShader = '\n    precision mediump float;\n\n    varying vec3 vColor;\n\n    void main() {\n      //  vec2 pc = 2.0 * gl_PointCoord - 1.0;\n      //  gl_FragColor = vec4(vColor, 1.0 - dot(pc, pc));\n      gl_FragColor = vec4(vColor, 1.0);\n    }\n  ';

      var onSetup = function onSetup(gl) {
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
        gl.enable(gl.BLEND);
      };

      var onRepeat = function onRepeat() {
        rotateY(uniforms[uniforms.length - 1].value, 0.002);
        if (uniforms[0].value > 1) {
          uniforms[0].value = 0;
        }
        uniforms[0].value += step;
      };

      var options = {
        onSetup: onSetup,
        onRepeat: onRepeat,
        pixelRatio: pixelRatio
      };

      starlings(canvas, geometry, multiplier, attributes, uniforms, vertexShader, fragmentShader, options);
    };

    var getRandom = function getRandom(value) {
      return Math.random() * value - value / 2;
    };

    var rotateY = function rotateY(matrix, angle) {
      var sin = Math.sin(angle);
      var cos = Math.cos(angle);
      var clone = JSON.parse(JSON.stringify(matrix));

      matrix[0] = clone[0] * cos - clone[8] * sin;
      matrix[1] = clone[1] * cos - clone[9] * sin;
      matrix[2] = clone[2] * cos - clone[10] * sin;
      matrix[3] = clone[3] * cos - clone[11] * sin;
      matrix[8] = clone[0] * sin + clone[8] * cos;
      matrix[9] = clone[1] * sin + clone[9] * cos;
      matrix[10] = clone[2] * sin + clone[10] * cos;
      matrix[11] = clone[3] * sin + clone[11] * cos;
    };

    var h2r = function h2r(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * 6 * (2 / 3 - t);
      return p;
    };

    var getHSL = function getHSL(h, s, l) {
      h = (h % 1 + 1) % 1;
      s = Math.max(0, Math.min(1, s));
      l = Math.max(0, Math.min(1, l));
      if (s === 0) return [l, l, l];
      var p = l <= 0.5 ? l * (1 + s) : l + s - l * s;
      var q = 2 * l - p;
      return [h2r(q, p, h + 1 / 3), h2r(q, p, h), h2r(q, p, h - 1 / 3)];
    };

    var ratio = window.innerWidth / window.innerHeight;
    var halfWidth = window.innerWidth * devicePixelRatio / 2;
    var halfHeight = window.innerHeight * devicePixelRatio / 2;

    document.querySelector('.create').addEventListener('click', function () {
      points.length = 0;
      segments.map(function (segment) {
        return segment.map(function (point) {
          for (var i = 0; i < 100; i += 1) {
            var x = ((point.x - halfWidth) / halfWidth * ratio).toFixed(4) * 1;
            var y = ((point.y - halfHeight) / halfHeight).toFixed(4) * -1;
            points.push({ x: x, y: y });
          }
        });
      });
      input.style.opacity = '0';
      input.style.visibility = 'hidden';
      setTimeout(function () {
        output.style.opacity = '1';
        output.style.visibility = 'visible';
        initialize();
      }, 600);
    });

    document.querySelector('.reset').addEventListener('click', function () {
      input.querySelector('canvas').getContext('2d').clearRect(0, 0, window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio);
      output.style.opacity = '0';
      output.style.visibility = 'hidden';
      setTimeout(function () {
        segments.length = 0;
        points.length = 0;
        input.style.opacity = '1';
        input.style.visibility = 'visible';
      }, 600);
    });
  })();
}