(function () {
    function project3D(x, y, z, vars) {

        var p, d;
        x -= vars.camX;
        y -= vars.camY;
        z -= vars.camZ;
        p = Math.atan2(x, z);
        d = Math.sqrt(x * x + z * z);
        x = Math.sin(p - vars.yaw) * d;
        z = Math.cos(p - vars.yaw) * d;
        p = Math.atan2(y, z);
        d = Math.sqrt(y * y + z * z);
        y = Math.sin(p - vars.pitch) * d;
        z = Math.cos(p - vars.pitch) * d;
        var rx1 = -9;
        var ry1 = 1;
        var rx2 = 9;
        var ry2 = 1;
        var rx3 = 0;
        var ry3 = 0;
        var rx4 = x;
        var ry4 = z;
        var uc = (ry4 - ry3) * (rx2 - rx1) - (rx4 - rx3) * (ry2 - ry1);
        var ua = ((rx4 - rx3) * (ry1 - ry3) - (ry4 - ry3) * (rx1 - rx3)) / uc;
        var ub = ((rx2 - rx1) * (ry1 - ry3) - (ry2 - ry1) * (rx1 - rx3)) / uc;
        if (ua > 0 && ua < 1 && ub > 0 && ub < 1) {
            return {
                x: vars.cx + (rx1 + ua * (rx2 - rx1)) * vars.scale,
                y: vars.cy + y / z * vars.scale,
                d: Math.sqrt(x * x + y * y + z * z)
            };
        } else {
            return {
                d: -1
            };
        }
    }


    function reverseRasterize(depth, vars) {

        var vert = new Vert(),
            d, p;
        vert.x = vars.camX + (-vars.cx + vars.mx) / vars.scale * depth;
        vert.y = vars.camY + (-vars.cy + vars.my) / vars.scale * depth;
        vert.z = vars.camZ + depth;
        d = Math.sqrt((vert.y - vars.camY) * (vert.y - vars.camY) + (vert.z - vars.camZ) * (vert.z - vars.camZ));
        p = Math.atan2(vert.y - vars.camY, vert.z - vars.camZ);
        vert.y = vars.camY + Math.sin(p + vars.pitch) * d;
        vert.z = vars.camZ + Math.cos(p + vars.pitch) * d;
        d = Math.sqrt((vert.x - vars.camX) * (vert.x - vars.camX) + (vert.z - vars.camZ) * (vert.z - vars.camZ));
        p = Math.atan2(vert.x - vars.camX, vert.z - vars.camZ);
        vert.x = vars.camX + Math.sin(p + vars.yaw) * d;
        vert.z = vars.camZ + Math.cos(p + vars.yaw) * d;

        d = Math.sqrt((vert.x - vars.camX) * (vert.x - vars.camX) +
            (vert.y - vars.camY) * (vert.y - vars.camY) +
            (vert.z - vars.camZ) * (vert.z - vars.camZ));
        var x = vert.x - vars.camX;
        var y = vert.y - vars.camY;
        var z = vert.z - vars.camZ;
        var t = d / depth;
        vert.x = vars.camX + x / t;
        vert.y = vars.camY + y / t;
        vert.z = vars.camZ + z / t;
        return vert;
    }


    function rgb(col) {

        col += 0.000001;
        var r = parseInt((0.85 + Math.sin(col) * 0.15) * 16);
        var g = parseInt((0.85 + Math.cos(col) * 0.15) * 16);
        var b = parseInt((0.85 - Math.sin(col) * 0.15) * 16);
        return "#" + r.toString(16) + g.toString(16) + b.toString(16);
    }


    function Vert(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }


    function Seg(x1, y1, z1, x2, y2, z2) {
        this.a = new Vert(x1, y1, z1);
        this.b = new Vert(x2, y2, z2);
        this.oa = new Vert(x1, y1, z1);
        this.ob = new Vert(x2, y2, z2);
        this.del = 0;
    }


    function elevation(x, y, z) {

        var dist = Math.sqrt(x * x + y * y + z * z);
        if (dist && z / dist >= -1 && z / dist <= 1) return Math.acos(z / dist);
        return 0.00000001;
    }


    function process(vars) {

        if (vars.mbutton) loadMaze(vars);
        var p, d, t;
        p = Math.atan2(vars.camX, vars.camZ);
        d = Math.sqrt(vars.camX * vars.camX + vars.camZ * vars.camZ);
        //d -= Math.sin(vars.frameNo / 80) / 20;
        t = Math.cos(vars.frameNo / 250) / 400;
        vars.camX = Math.sin(p + t) * d;
        vars.camZ = Math.cos(p + t) * d;
        vars.camY = -Math.cos(vars.frameNo / 250) * 25;
        vars.yaw = Math.PI + p + t;
        vars.pitch = elevation(vars.camX, vars.camZ, vars.camY) - Math.PI / 2;

        vars.selected = -1;
        var point = reverseRasterize(10000, vars);
        for (var i = 0; i < vars.shapes.length; ++i) {
            x = vars.shapes[i].x;
            y = vars.shapes[i].y;
            z = vars.shapes[i].z;
            vars.shapes[i].selected = 0;
            var x1 = vars.shapes[i].x + vars.shapes[i].osegs[0].a.x;
            var y1 = vars.shapes[i].y + vars.shapes[i].osegs[0].a.y;
            var z1 = vars.shapes[i].z + vars.shapes[i].osegs[0].a.z;
            var x2 = vars.shapes[i].x + vars.shapes[i].osegs[1].a.x;
            var y2 = vars.shapes[i].y + vars.shapes[i].osegs[1].a.y;
            var z2 = vars.shapes[i].z + vars.shapes[i].osegs[1].a.z;
            var x3 = vars.shapes[i].x + vars.shapes[i].osegs[2].a.x;
            var y3 = vars.shapes[i].y + vars.shapes[i].osegs[2].a.y;
            var z3 = vars.shapes[i].z + vars.shapes[i].osegs[2].a.z;
            var D = -(x1 * (y2 * z3 - y3 * z2) + x2 * (y3 * z1 - y1 * z3) + x3 * (y1 * z2 - y2 * z1));
            var A = y1 * (z2 - z3) + y2 * (z3 - z1) + y3 * (z1 - z2);
            var B = z1 * (x2 - x3) + z2 * (x3 - x1) + z3 * (x1 - x2);
            var C = x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2);
            var uc = A * (vars.camX - point.x) + B * (vars.camY - point.y) + C * (vars.camZ - point.z);
            var u = uc ? (A * vars.camX + B * vars.camY + C * vars.camZ + D) / uc : -1;
            x = vars.camX + u * (point.x - vars.camX);
            y = vars.camY + u * (point.y - vars.camY);
            z = vars.camZ + u * (point.z - vars.camZ);
            a = 0;
            for (var k = 0; k < vars.shapes[i].osegs.length; ++k) {
                var v1 = [vars.shapes[i].x + vars.shapes[i].osegs[k].a.x - x,
                    vars.shapes[i].y + vars.shapes[i].osegs[k].a.y - y,
                    vars.shapes[i].z + vars.shapes[i].osegs[k].a.z - z
                ];
                var v2 = [vars.shapes[i].x + vars.shapes[i].osegs[k].b.x - x,
                    vars.shapes[i].y + vars.shapes[i].osegs[k].b.y - y,
                    vars.shapes[i].z + vars.shapes[i].osegs[k].b.z - z
                ];
                d = Math.sqrt(v1[0] * v1[0] + v1[1] * v1[1] + v1[2] * v1[2]);
                v1[0] /= d;
                v1[1] /= d;
                v1[2] /= d;
                d = Math.sqrt(v2[0] * v2[0] + v2[1] * v2[1] + v2[2] * v2[2]);
                v2[0] /= d;
                v2[1] /= d;
                v2[2] /= d;
                a += Math.acos(v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2]);
            }
            if (a >= Math.PI * 2 - .01) {
                for (var m = 0; m < i; ++m) vars.shapes[m].selected = 0;
                vars.shapes[i].selected = 1;
                vars.selected = i;
            }
        }

        for (var i = 0; i < vars.pathSegs.length; ++i) {
            vars.pathSegs[i].highlighted = 0;
        }
        if (vars.selected != -1) {
            tracePath(vars.selected, vars);
        }
    }


    function tracePath(s, vars) {
        if (!s) return 1;
        var t1 = vars.pathSegs[vars.shapes[s].pathed - 1].a.index;
        var t2 = tracePath(t1, vars);
        if (t2) {
            vars.pathSegs[vars.shapes[s].pathed - 1].highlighted = 1;
            return 1;
        }
        return 0;
    }


    function draw(vars) {

        vars.ctx.globalAlpha = 1;
        vars.ctx.fillStyle = "#000";
        vars.ctx.fillRect(0, 0, vars.canvas.width, vars.canvas.height);

        var x, y, z, pt1, pt2;

        vars.ctx.globalAlpha = 1;
        vars.ctx.fillStyle = "#f0f";
        for (var i = 0; i < vars.shapes.length; ++i) {
            if (vars.shapes[i].selected) {
                x = vars.shapes[i].x + vars.shapes[i].osegs[0].a.x;
                y = vars.shapes[i].y + vars.shapes[i].osegs[0].a.y;
                z = vars.shapes[i].z + vars.shapes[i].osegs[0].a.z;
                pt1 = project3D(x, y, z, vars);
                if (pt1.d != -1) {
                    vars.ctx.beginPath();
                    vars.ctx.moveTo(pt1.x, pt1.y);
                    for (var j = 0; j < vars.shapes[i].osegs.length; ++j) {
                        x = vars.shapes[i].x + vars.shapes[i].osegs[j].b.x;
                        y = vars.shapes[i].y + vars.shapes[i].osegs[j].b.y;
                        z = vars.shapes[i].z + vars.shapes[i].osegs[j].b.z;
                        pt2 = project3D(x, y, z, vars);
                        vars.ctx.lineTo(pt2.x, pt2.y);
                    }
                    vars.ctx.fill();
                }
            }
        }

        vars.ctx.globalAlpha = 1;
        vars.ctx.strokeStyle = "#0f8";
        for (var i = 0; i < vars.pathSegs.length; ++i) {
            if (vars.pathSegs[i].highlighted) {
                x = vars.pathSegs[i].a.x;
                y = vars.pathSegs[i].a.y;
                z = vars.pathSegs[i].a.z;
                pt1 = project3D(x, y, z, vars);
                if (pt1.d != -1) {
                    x = vars.pathSegs[i].b.x;
                    y = vars.pathSegs[i].b.y;
                    z = vars.pathSegs[i].b.z;
                    pt2 = project3D(x, y, z, vars);
                    if (pt2.d != -1) {
                        vars.ctx.lineWidth = 1 + 100 / (1 + pt1.d);
                        vars.ctx.beginPath();
                        vars.ctx.moveTo(pt1.x, pt1.y);
                        vars.ctx.lineTo(pt2.x, pt2.y);
                        vars.ctx.stroke();
                    }
                }
            }
        }
        if (vars.selected != -1) {
            x = vars.pathSegs[0].a.x;
            y = vars.pathSegs[0].a.y;
            z = vars.pathSegs[0].a.z;
            pt1 = project3D(x, y, z, vars);
            if (pt1.d != -1) {
                x = vars.pathSegs[0].a.x + 2;
                y = vars.pathSegs[0].a.y + 2 + (vars.sd == 6 ? 1 : 0);
                z = vars.pathSegs[0].a.z;
                pt2 = project3D(x, y, z, vars);
                if (pt2.d != -1) {
                    vars.ctx.lineWidth = 1 + 50 / (1 + pt1.d);
                    vars.ctx.beginPath();
                    vars.ctx.moveTo(pt1.x, pt1.y);
                    vars.ctx.lineTo(pt2.x, pt2.y);
                    vars.ctx.stroke();
                }
            }
        }

        vars.ctx.strokeStyle = "#f0f";
        vars.ctx.globalAlpha = 1;
        for (var i = 0; i < vars.shapes.length; ++i) {
            for (var j = 0; j < vars.shapes[i].segs.length; ++j) {
                x = vars.shapes[i].x + vars.shapes[i].segs[j].a.x;
                y = vars.shapes[i].y + vars.shapes[i].segs[j].a.y;
                z = vars.shapes[i].z + vars.shapes[i].segs[j].a.z;
                pt1 = project3D(x, y, z, vars);
                if (pt1.d != -1) {
                    x = vars.shapes[i].x + vars.shapes[i].segs[j].b.x;
                    y = vars.shapes[i].y + vars.shapes[i].segs[j].b.y;
                    z = vars.shapes[i].z + vars.shapes[i].segs[j].b.z;
                    pt2 = project3D(x, y, z, vars);
                    vars.ctx.lineWidth = 1 + 20 / (1 + pt1.d);
                    vars.ctx.beginPath();
                    vars.ctx.moveTo(pt1.x, pt1.y);
                    vars.ctx.lineTo(pt2.x, pt2.y);
                    vars.ctx.stroke();
                }
            }
        }
    }


    function createShape(x, y, z, sides) {

        var shape = {},
            ls = 1,
            x1, y1, z1, x2, y2, z2;
        shape.segs = [];
        shape.osegs = [];
        shape.x = x;
        shape.y = y;
        shape.z = z;
        shape.pathed = 0;
        for (var i = 0; i < sides; ++i) {
            p = Math.PI * 2 / sides * i;
            x1 = Math.sin(p) * ls;
            y1 = Math.cos(p) * ls;
            z1 = 0;
            p = Math.PI * 2 / sides * (i + 1);
            x2 = Math.sin(p) * ls;
            y2 = Math.cos(p) * ls;
            z2 = 0;
            shape.segs.push(new Seg(x1, y1, z1, x2, y2, z2));
            shape.osegs.push(new Seg(x1, y1, z1, x2, y2, z2));
        }
        return shape;
    }


    function loadMaze(vars) {

        vars.shapes = [];
        var p, sd = 6,
            ls, x, y, z, x1, y1, z1, x2, y2, z2, x3, y3, z3, x4, y4, z4, size = Math.floor(60 * (1 / sd)),
            spacing;
        vars.sd = sd;
        switch (sd) {
            case 4:
                spacing = 0.70710678118654752440084436210485 * 2;
                break;
            case 6:
                spacing = 0.86602540378443864676372317075294 * 2;
                break;
        }
        for (var m = size; m > 0; --m) {
            ls = m * spacing;
            for (var j = 0; j < sd; ++j) {
                p = Math.PI * 2 / sd * j + Math.PI / sd;
                x1 = Math.sin(p) * ls;
                y1 = Math.cos(p) * ls;
                z1 = 0;
                p = Math.PI * 2 / sd * (j + 1) + Math.PI / sd;
                x2 = Math.sin(p) * ls;
                y2 = Math.cos(p) * ls;
                z2 = 0;
                for (var k = 0; k < m; ++k) {
                    x = x1 + (x2 - x1) / m * k;
                    y = y1 + (y2 - y1) / m * k;
                    z = z1 + (z2 - z1) / m * k;
                    vars.shapes.push(createShape(x, y, z, sd));
                }
            }
        }
        vars.shapes.push(createShape(0, 0, 0, sd));

        var stepFound, d, t, t2 = 0,
            tries = 0,
            subPathLength;
        vars.pathSegs = [];
        ls = spacing;
        x1 = vars.shapes[t2].x;
        y1 = vars.shapes[t2].y;
        z1 = vars.shapes[t2].z;
        vars.shapes[t2].pathed = 0;
        do {
            stepFound = 0;
            for (var i = 0; i < sd * 2 && !stepFound; ++i) {
                t = Math.floor(Math.random() * sd);
                p = Math.PI * 2 / sd * t + Math.PI / sd;
                x2 = x1 + Math.sin(p) * ls;
                y2 = y1 + Math.cos(p) * ls;
                z2 = z1;
                for (var j = 1; j < vars.shapes.length && !stepFound; ++j) {
                    if (!vars.shapes[j].pathed) {
                        x3 = vars.shapes[j].x;
                        y3 = vars.shapes[j].y;
                        z3 = vars.shapes[j].z;
                        d = Math.sqrt((x3 - x2) * (x3 - x2) + (y3 - y2) * (y3 - y2));
                        if (d < .001) {
                            stepFound = 1;
                            subPathLength++;
                            tries = 0;
                            vars.pathSegs.push(new Seg(x1, y1, z1, x3, y3, z3));
                            vars.pathSegs[vars.pathSegs.length - 1].a.index = t2;
                            vars.pathSegs[vars.pathSegs.length - 1].b.index = j;
                            vars.shapes[t2].segs[t].del = 1;
                            vars.shapes[j].segs[(t + sd / 2) % sd].del = 1;
                            t2 = j;
                            x1 = vars.shapes[t2].x;
                            y1 = vars.shapes[t2].y;
                            z1 = vars.shapes[t2].z;
                            vars.shapes[t2].pathed = vars.pathSegs.length;
                        }
                    }
                }
            }
            if (subPathLength > 12 || tries > sd * 2) {
                subPathLength = 0;
                t2 = vars.pathSegs[Math.ceil(Math.random() * (vars.pathSegs.length - 1))].b.index;
                x1 = vars.shapes[t2].x;
                y1 = vars.shapes[t2].y;
                z1 = vars.shapes[t2].z;
            }
            tries++;
            complete = 1;
            for (var i = 1; i < vars.shapes.length && complete; ++i) {
                if (!vars.shapes[i].pathed) complete = 0;
            }
        } while (!complete);
        for (var i = 0; i < vars.shapes.length; ++i) {
            for (var j = vars.shapes[i].segs.length - 1; j >= 0; --j) {
                if (vars.shapes[i].segs[j].del) vars.shapes[i].segs.splice(j, 1);
            }
        }
        vars.shapes[0].segs.splice(0, 1);
    }


    function frame(vars) {

        if (vars === undefined) {
            var vars = {};
            vars.canvas = document.createElement("canvas");
            document.body.appendChild(vars.canvas);
            vars.ctx = vars.canvas.getContext("2d");
            vars.canvas.width = window.innerWidth;
            vars.canvas.height = window.innerHeight;
            window.addEventListener("resize", function () {
                vars.canvas.width = window.innerWidth;
                vars.canvas.height = window.innerHeight;
                vars.cx = vars.canvas.width / 2;
                vars.cy = vars.canvas.height / 2;
            }, true);
            vars.canvas.addEventListener("mousemove", function (e) {
                var rect = vars.canvas.getBoundingClientRect();
                vars.mx = Math.round((e.clientX - rect.left) / (rect.right - rect.left) * vars.canvas.width);
                vars.my = Math.round((e.clientY - rect.top) / (rect.bottom - rect.top) * vars.canvas.height);
            }, true);
            vars.canvas.addEventListener("mousedown", function (e) {
                vars.mbutton = 1;
            }, true);
            vars.canvas.addEventListener("mouseup", function (e) {
                vars.mbutton = 0;
            }, true);
            vars.canvas.addEventListener("touchstart", function (e) {
                vars.mbutton = 1;
                e.preventDefault();
                var rect = vars.canvas.getBoundingClientRect();
                vars.mx = Math.round((e.changedTouches[0].pageX - rect.left) / (rect.right - rect.left) * vars.canvas.width);
                vars.my = Math.round((e.changedTouches[0].pageY - rect.top) / (rect.bottom - rect.top) * vars.canvas.height);
            }, true);
            vars.canvas.addEventListener("touchend", function (e) {
                vars.mbutton = 0;
            }, true);
            vars.canvas.addEventListener("touchmove", function (e) {
                e.preventDefault();
                var rect = vars.canvas.getBoundingClientRect();
                vars.mx = Math.round((e.changedTouches[0].pageX - rect.left) / (rect.right - rect.left) * vars.canvas.width);
                vars.my = Math.round((e.changedTouches[0].pageY - rect.top) / (rect.bottom - rect.top) * vars.canvas.height);
            }, true);
            vars.camX = 0;
            vars.camY = 0;
            vars.camZ = -40;
            vars.pitch = 0;
            vars.yaw = 0;
            vars.cx = vars.canvas.width / 2;
            vars.cy = vars.canvas.height / 2;
            vars.scale = 600;
            vars.frameNo = 0;
            vars.mx = 0;
            vars.my = 0;
            vars.selected = -1;
            loadMaze(vars);
        }

        vars.frameNo++;
        requestAnimationFrame(function () {
            frame(vars);
        });

        process(vars);
        draw(vars);
    }

    frame();
})();