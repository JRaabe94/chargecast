//#region \0rolldown/runtime.js
var e = Object.defineProperty, t = (t, n) => {
	let r = {};
	for (var i in t) e(r, i, {
		get: t[i],
		enumerable: !0
	});
	return n || e(r, Symbol.toStringTag, { value: "Module" }), r;
}, n = function(e, t) {
	return n = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
		e.__proto__ = t;
	} || function(e, t) {
		for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
	}, n(e, t);
};
function r(e, t) {
	if (typeof t != "function" && t !== null) throw TypeError("Class extends value " + String(t) + " is not a constructor or null");
	n(e, t);
	function r() {
		this.constructor = e;
	}
	e.prototype = t === null ? Object.create(t) : (r.prototype = t.prototype, new r());
}
//#endregion
//#region node_modules/zrender/lib/core/env.js
var i = function() {
	function e() {
		this.firefox = !1, this.ie = !1, this.edge = !1, this.newEdge = !1, this.weChat = !1;
	}
	return e;
}(), a = new (function() {
	function e() {
		this.browser = new i(), this.node = !1, this.wxa = !1, this.worker = !1, this.svgSupported = !1, this.touchEventsSupported = !1, this.pointerEventsSupported = !1, this.domSupported = !1, this.transformSupported = !1, this.transform3dSupported = !1, this.hasGlobalWindow = typeof window < "u";
	}
	return e;
}())();
typeof wx == "object" && typeof wx.getSystemInfoSync == "function" ? (a.wxa = !0, a.touchEventsSupported = !0) : typeof document > "u" && typeof self < "u" ? a.worker = !0 : !a.hasGlobalWindow || "Deno" in window || typeof navigator < "u" && typeof navigator.userAgent == "string" && navigator.userAgent.indexOf("Node.js") > -1 ? (a.node = !0, a.svgSupported = !0) : o(navigator.userAgent, a);
function o(e, t) {
	var n = t.browser, r = e.match(/Firefox\/([\d.]+)/), i = e.match(/MSIE\s([\d.]+)/) || e.match(/Trident\/.+?rv:(([\d.]+))/), a = e.match(/Edge?\/([\d.]+)/), o = /micromessenger/i.test(e);
	if (r && (n.firefox = !0, n.version = r[1]), i && (n.ie = !0, n.version = i[1]), a && (n.edge = !0, n.version = a[1], n.newEdge = +a[1].split(".")[0] > 18), o && (n.weChat = !0), t.svgSupported = typeof SVGRect < "u", t.touchEventsSupported = "ontouchstart" in window && !n.ie && !n.edge, t.pointerEventsSupported = "onpointerdown" in window && (n.edge || n.ie && +n.version >= 11), t.domSupported = typeof document < "u") {
		var s = document.documentElement.style;
		t.transform3dSupported = (n.ie && "transition" in s || n.edge || "WebKitCSSMatrix" in window && "m11" in new WebKitCSSMatrix() || "MozPerspective" in s) && !("OTransition" in s), t.transformSupported = t.transform3dSupported || n.ie && +n.version >= 9;
	}
}
var s = "12px sans-serif", c = 20, l = 100, u = "007LLmW'55;N0500LLLLLLLLLL00NNNLzWW\\\\WQb\\0FWLg\\bWb\\WQ\\WrWWQ000CL5LLFLL0LL**F*gLLLL5F0LF\\FFF5.5N";
function d(e) {
	var t = {};
	if (typeof JSON > "u") return t;
	for (var n = 0; n < e.length; n++) {
		var r = String.fromCharCode(n + 32);
		t[r] = (e.charCodeAt(n) - c) / l;
	}
	return t;
}
var f = d(u), p = {
	createCanvas: function() {
		return typeof document < "u" && document.createElement("canvas");
	},
	measureText: (function() {
		var e, t;
		return function(n, r) {
			if (!e) {
				var i = p.createCanvas();
				e = i && i.getContext("2d");
			}
			if (e) return t !== r && (t = e.font = r || "12px sans-serif"), e.measureText(n);
			n ||= "", r ||= "12px sans-serif";
			var a = /((?:\d+)?\.?\d*)px/.exec(r), o = a && +a[1] || 12, s = 0;
			if (r.indexOf("mono") >= 0) s = o * n.length;
			else for (var c = 0; c < n.length; c++) {
				var l = f[n[c]];
				s += l == null ? o : l * o;
			}
			return { width: s };
		};
	})(),
	loadImage: function(e, t, n) {
		var r = new Image();
		return r.onload = t, r.onerror = n, r.src = e, r;
	},
	getTime: function() {
		return Date.now ? Date.now() : +/* @__PURE__ */ new Date();
	}
}, m = ne([
	"Function",
	"RegExp",
	"Date",
	"Error",
	"CanvasGradient",
	"CanvasPattern",
	"Image",
	"Canvas"
], function(e, t) {
	return e["[object " + t + "]"] = !0, e;
}, {}), h = ne([
	"Int8",
	"Uint8",
	"Uint8Clamped",
	"Int16",
	"Uint16",
	"Int32",
	"Uint32",
	"Float32",
	"Float64"
], function(e, t) {
	return e["[object " + t + "Array]"] = !0, e;
}, {}), g = Object.prototype.toString, _ = Array.prototype, v = _.forEach, y = _.filter, b = _.slice, x = _.map, S = function() {}.constructor, C = S ? S.prototype : null, w = "__proto__", T = 2311, E = 2 ** 53 - 1;
function D() {
	return T >= E && (T = 0), T++;
}
function O() {
	var e = [...arguments];
	typeof console < "u" && console.error.apply(console, e);
}
function k(e) {
	if (typeof e != "object" || !e) return e;
	var t = e, n = g.call(e);
	if (n === "[object Array]") {
		if (!Se(e)) {
			t = [];
			for (var r = 0, i = e.length; r < i; r++) t[r] = k(e[r]);
		}
	} else if (h[n]) {
		if (!Se(e)) {
			var a = e.constructor;
			if (a.from) t = a.from(e);
			else {
				t = new a(e.length);
				for (var r = 0, i = e.length; r < i; r++) t[r] = e[r];
			}
		}
	} else if (!m[n] && !Se(e) && !ue(e)) for (var o in t = {}, e) e.hasOwnProperty(o) && o !== w && (t[o] = k(e[o]));
	return t;
}
function A(e, t, n) {
	if (!G(t) || !G(e)) return n ? k(t) : e;
	for (var r in t) if (t.hasOwnProperty(r) && r !== w) {
		var i = e[r], a = t[r];
		G(a) && G(i) && !H(a) && !H(i) && !ue(a) && !ue(i) && !ce(a) && !ce(i) && !Se(a) && !Se(i) ? A(i, a, n) : (n || !(r in e)) && (e[r] = k(t[r]));
	}
	return e;
}
function j(e, t) {
	for (var n = e[0], r = 1, i = e.length; r < i; r++) n = A(n, e[r], t);
	return n;
}
function M(e, t) {
	if (Object.assign) Object.assign(e, t);
	else for (var n in t) t.hasOwnProperty(n) && n !== w && (e[n] = t[n]);
	return e;
}
function ee(e, t, n) {
	e ||= {};
	for (var r = 0; r < n.length; r++) {
		var i = n[r];
		e[i] = t[i];
	}
	return e;
}
function N(e, t, n) {
	for (var r = z(t), i = 0, a = r.length; i < a; i++) {
		var o = r[i];
		(n ? t[o] != null : e[o] == null) && (e[o] = t[o]);
	}
	return e;
}
p.createCanvas;
function P(e, t) {
	if (e) {
		if (e.indexOf) return e.indexOf(t);
		for (var n = 0, r = e.length; n < r; n++) if (e[n] === t) return n;
	}
	return -1;
}
function te(e, t) {
	var n = e.prototype;
	function r() {}
	for (var i in r.prototype = t.prototype, e.prototype = new r(), n) n.hasOwnProperty(i) && (e.prototype[i] = n[i]);
	e.prototype.constructor = e, e.superClass = t;
}
function F(e, t, n) {
	if (e = "prototype" in e ? e.prototype : e, t = "prototype" in t ? t.prototype : t, Object.getOwnPropertyNames) for (var r = Object.getOwnPropertyNames(t), i = 0; i < r.length; i++) {
		var a = r[i];
		a !== "constructor" && (n ? t[a] != null : e[a] == null) && (e[a] = t[a]);
	}
	else N(e, t, n);
}
function I(e) {
	return !e || typeof e == "string" ? !1 : typeof e.length == "number";
}
function L(e, t, n) {
	if (e && t) {
		if (e.forEach && e.forEach === v) e.forEach(t, n);
		else if (e.length === +e.length) for (var r = 0, i = e.length; r < i; r++) t.call(n, e[r], r, e);
		else for (var a in e) e.hasOwnProperty(a) && t.call(n, e[a], a, e);
	}
}
function R(e, t, n) {
	if (!e) return [];
	if (!t) return ge(e);
	if (e.map && e.map === x) return e.map(t, n);
	for (var r = [], i = 0, a = e.length; i < a; i++) r.push(t.call(n, e[i], i, e));
	return r;
}
function ne(e, t, n, r) {
	if (e && t) {
		for (var i = 0, a = e.length; i < a; i++) n = t.call(r, n, e[i], i, e);
		return n;
	}
}
function re(e, t, n) {
	if (!e) return [];
	if (!t) return ge(e);
	if (e.filter && e.filter === y) return e.filter(t, n);
	for (var r = [], i = 0, a = e.length; i < a; i++) t.call(n, e[i], i, e) && r.push(e[i]);
	return r;
}
function ie(e, t, n) {
	if (e && t) {
		for (var r = 0, i = e.length; r < i; r++) if (t.call(n, e[r], r, e)) return e[r];
	}
}
function z(e) {
	if (!e) return [];
	if (Object.keys) return Object.keys(e);
	var t = [];
	for (var n in e) e.hasOwnProperty(n) && t.push(n);
	return t;
}
function ae(e, t) {
	var n = [...arguments].slice(2);
	return function() {
		return e.apply(t, n.concat(b.call(arguments)));
	};
}
var B = C && U(C.bind) ? C.call.bind(C.bind) : ae;
function V(e) {
	var t = [...arguments].slice(1);
	return function() {
		return e.apply(this, t.concat(b.call(arguments)));
	};
}
function H(e) {
	return Array.isArray ? Array.isArray(e) : g.call(e) === "[object Array]";
}
function U(e) {
	return typeof e == "function";
}
function W(e) {
	return typeof e == "string";
}
function oe(e) {
	return g.call(e) === "[object String]";
}
function se(e) {
	return typeof e == "number";
}
function G(e) {
	var t = typeof e;
	return t === "function" || !!e && t === "object";
}
function ce(e) {
	return !!m[g.call(e)];
}
function le(e) {
	return !!h[g.call(e)];
}
function ue(e) {
	return typeof e == "object" && typeof e.nodeType == "number" && typeof e.ownerDocument == "object";
}
function de(e) {
	return e.colorStops != null;
}
function fe(e) {
	return e.image != null;
}
function pe(e) {
	return e !== e;
}
function me() {
	for (var e = [...arguments], t = 0, n = e.length; t < n; t++) if (e[t] != null) return e[t];
}
function K(e, t) {
	return e ?? t;
}
function he(e, t, n) {
	return e ?? t ?? n;
}
function ge(e) {
	var t = [...arguments].slice(1);
	return b.apply(e, t);
}
function _e(e) {
	if (typeof e == "number") return [
		e,
		e,
		e,
		e
	];
	var t = e.length;
	return t === 2 ? [
		e[0],
		e[1],
		e[0],
		e[1]
	] : t === 3 ? [
		e[0],
		e[1],
		e[2],
		e[1]
	] : e;
}
function ve(e, t) {
	if (!e) throw Error(t);
}
function ye(e) {
	return e == null ? null : typeof e.trim == "function" ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
}
var be = "__ec_primitive__";
function xe(e) {
	e[be] = !0;
}
function Se(e) {
	return e[be];
}
var Ce = function() {
	function e() {
		this.data = {};
	}
	return e.prototype.delete = function(e) {
		var t = this.has(e);
		return t && delete this.data[e], t;
	}, e.prototype.has = function(e) {
		return this.data.hasOwnProperty(e);
	}, e.prototype.get = function(e) {
		return this.data[e];
	}, e.prototype.set = function(e, t) {
		return this.data[e] = t, this;
	}, e.prototype.keys = function() {
		return z(this.data);
	}, e.prototype.forEach = function(e) {
		var t = this.data;
		for (var n in t) t.hasOwnProperty(n) && e(t[n], n);
	}, e;
}(), we = typeof Map == "function";
function Te() {
	return we ? /* @__PURE__ */ new Map() : new Ce();
}
var Ee = function() {
	function e(t) {
		var n = H(t);
		this.data = Te();
		var r = this;
		t instanceof e ? t.each(i) : t && L(t, i);
		function i(e, t) {
			n ? r.set(e, t) : r.set(t, e);
		}
	}
	return e.prototype.hasKey = function(e) {
		return this.data.has(e);
	}, e.prototype.get = function(e) {
		return this.data.get(e);
	}, e.prototype.set = function(e, t) {
		return this.data.set(e, t), t;
	}, e.prototype.each = function(e, t) {
		this.data.forEach(function(n, r) {
			e.call(t, n, r);
		});
	}, e.prototype.keys = function() {
		var e = this.data.keys();
		return we ? Array.from(e) : e;
	}, e.prototype.removeKey = function(e) {
		this.data.delete(e);
	}, e;
}();
function q(e) {
	return new Ee(e);
}
function De(e, t) {
	for (var n = new e.constructor(e.length + t.length), r = 0; r < e.length; r++) n[r] = e[r];
	for (var i = e.length, r = 0; r < t.length; r++) n[r + i] = t[r];
	return n;
}
function Oe(e, t) {
	var n;
	if (Object.create) n = Object.create(e);
	else {
		var r = function() {};
		r.prototype = e, n = new r();
	}
	return t && M(n, t), n;
}
function ke(e) {
	var t = e.style;
	t.webkitUserSelect = "none", t.userSelect = "none", t.webkitTapHighlightColor = "rgba(0,0,0,0)", t["-webkit-touch-callout"] = "none";
}
function Ae(e, t) {
	return e.hasOwnProperty(t);
}
function je() {}
var Me = 180 / Math.PI;
//#endregion
//#region node_modules/zrender/lib/core/vector.js
function Ne(e, t) {
	return e ??= 0, t ??= 0, [e, t];
}
function Pe(e) {
	return [e[0], e[1]];
}
function Fe(e, t, n) {
	return e[0] = t, e[1] = n, e;
}
function Ie(e, t, n) {
	return e[0] = t[0] + n[0], e[1] = t[1] + n[1], e;
}
function Le(e, t, n) {
	return e[0] = t[0] - n[0], e[1] = t[1] - n[1], e;
}
function Re(e) {
	return Math.sqrt(ze(e));
}
function ze(e) {
	return e[0] * e[0] + e[1] * e[1];
}
function Be(e, t, n) {
	return e[0] = t[0] * n, e[1] = t[1] * n, e;
}
function Ve(e, t) {
	var n = Re(t);
	return n === 0 ? (e[0] = 0, e[1] = 0) : (e[0] = t[0] / n, e[1] = t[1] / n), e;
}
function He(e, t) {
	return Math.sqrt((e[0] - t[0]) * (e[0] - t[0]) + (e[1] - t[1]) * (e[1] - t[1]));
}
var Ue = He;
function We(e, t) {
	return (e[0] - t[0]) * (e[0] - t[0]) + (e[1] - t[1]) * (e[1] - t[1]);
}
var Ge = We;
function Ke(e, t, n) {
	var r = t[0], i = t[1];
	return e[0] = n[0] * r + n[2] * i + n[4], e[1] = n[1] * r + n[3] * i + n[5], e;
}
function qe(e, t, n) {
	return e[0] = Math.min(t[0], n[0]), e[1] = Math.min(t[1], n[1]), e;
}
function Je(e, t, n) {
	return e[0] = Math.max(t[0], n[0]), e[1] = Math.max(t[1], n[1]), e;
}
//#endregion
//#region node_modules/zrender/lib/mixin/Draggable.js
var Ye = function() {
	function e(e, t) {
		this.target = e, this.topTarget = t && t.topTarget;
	}
	return e;
}(), Xe = function() {
	function e(e) {
		this.handler = e, e.on("mousedown", this._dragStart, this), e.on("mousemove", this._drag, this), e.on("mouseup", this._dragEnd, this);
	}
	return e.prototype._dragStart = function(e) {
		for (var t = e.target; t && !t.draggable;) t = t.parent || t.__hostTarget;
		t && (this._draggingTarget = t, t.dragging = !0, this._x = e.offsetX, this._y = e.offsetY, this.handler.dispatchToElement(new Ye(t, e), "dragstart", e.event));
	}, e.prototype._drag = function(e) {
		var t = this._draggingTarget;
		if (t) {
			var n = e.offsetX, r = e.offsetY, i = n - this._x, a = r - this._y;
			this._x = n, this._y = r, t.drift(i, a, e), this.handler.dispatchToElement(new Ye(t, e), "drag", e.event);
			var o = this.handler.findHover(n, r, t).target, s = this._dropTarget;
			this._dropTarget = o, t !== o && (s && o !== s && this.handler.dispatchToElement(new Ye(s, e), "dragleave", e.event), o && o !== s && this.handler.dispatchToElement(new Ye(o, e), "dragenter", e.event));
		}
	}, e.prototype._dragEnd = function(e) {
		var t = this._draggingTarget;
		t && (t.dragging = !1), this.handler.dispatchToElement(new Ye(t, e), "dragend", e.event), this._dropTarget && this.handler.dispatchToElement(new Ye(this._dropTarget, e), "drop", e.event), this._draggingTarget = null, this._dropTarget = null;
	}, e;
}(), Ze = function() {
	function e(e) {
		e && (this._$eventProcessor = e);
	}
	return e.prototype.on = function(e, t, n, r) {
		this._$handlers ||= {};
		var i = this._$handlers;
		if (typeof t == "function" && (r = n, n = t, t = null), !n || !e) return this;
		var a = this._$eventProcessor;
		t != null && a && a.normalizeQuery && (t = a.normalizeQuery(t)), i[e] || (i[e] = []);
		for (var o = 0; o < i[e].length; o++) if (i[e][o].h === n) return this;
		var s = {
			h: n,
			query: t,
			ctx: r || this,
			callAtLast: n.zrEventfulCallAtLast
		}, c = i[e].length - 1, l = i[e][c];
		return l && l.callAtLast ? i[e].splice(c, 0, s) : i[e].push(s), this;
	}, e.prototype.isSilent = function(e) {
		var t = this._$handlers;
		return !t || !t[e] || !t[e].length;
	}, e.prototype.off = function(e, t) {
		var n = this._$handlers;
		if (!n) return this;
		if (!e) return this._$handlers = {}, this;
		if (t) {
			if (n[e]) {
				for (var r = [], i = 0, a = n[e].length; i < a; i++) n[e][i].h !== t && r.push(n[e][i]);
				n[e] = r;
			}
			n[e] && n[e].length === 0 && delete n[e];
		} else delete n[e];
		return this;
	}, e.prototype.trigger = function(e) {
		var t = [...arguments].slice(1);
		if (!this._$handlers) return this;
		var n = this._$handlers[e], r = this._$eventProcessor;
		if (n) for (var i = t.length, a = n.length, o = 0; o < a; o++) {
			var s = n[o];
			if (!(r && r.filter && s.query != null && !r.filter(e, s.query))) switch (i) {
				case 0:
					s.h.call(s.ctx);
					break;
				case 1:
					s.h.call(s.ctx, t[0]);
					break;
				case 2:
					s.h.call(s.ctx, t[0], t[1]);
					break;
				default: s.h.apply(s.ctx, t);
			}
		}
		return r && r.afterTrigger && r.afterTrigger(e), this;
	}, e.prototype.triggerWithContext = function(e) {
		var t = [...arguments].slice(1);
		if (!this._$handlers) return this;
		var n = this._$handlers[e], r = this._$eventProcessor;
		if (n) for (var i = t.length, a = t[i - 1], o = n.length, s = 0; s < o; s++) {
			var c = n[s];
			if (!(r && r.filter && c.query != null && !r.filter(e, c.query))) switch (i) {
				case 0:
					c.h.call(a);
					break;
				case 1:
					c.h.call(a, t[0]);
					break;
				case 2:
					c.h.call(a, t[0], t[1]);
					break;
				default: c.h.apply(a, t.slice(1, i - 1));
			}
		}
		return r && r.afterTrigger && r.afterTrigger(e), this;
	}, e;
}(), Qe = Math.log(2);
function $e(e, t, n, r, i, a) {
	var o = r + "-" + i, s = e.length;
	if (a.hasOwnProperty(o)) return a[o];
	if (t === 1) {
		var c = Math.round(Math.log((1 << s) - 1 & ~i) / Qe);
		return e[n][c];
	}
	for (var l = r | 1 << n, u = n + 1; r & 1 << u;) u++;
	for (var d = 0, f = 0, p = 0; f < s; f++) {
		var m = 1 << f;
		m & i || (d += (p % 2 ? -1 : 1) * e[n][f] * $e(e, t - 1, u, l, i | m, a), p++);
	}
	return a[o] = d, d;
}
function et(e, t) {
	var n = [
		[
			e[0],
			e[1],
			1,
			0,
			0,
			0,
			-t[0] * e[0],
			-t[0] * e[1]
		],
		[
			0,
			0,
			0,
			e[0],
			e[1],
			1,
			-t[1] * e[0],
			-t[1] * e[1]
		],
		[
			e[2],
			e[3],
			1,
			0,
			0,
			0,
			-t[2] * e[2],
			-t[2] * e[3]
		],
		[
			0,
			0,
			0,
			e[2],
			e[3],
			1,
			-t[3] * e[2],
			-t[3] * e[3]
		],
		[
			e[4],
			e[5],
			1,
			0,
			0,
			0,
			-t[4] * e[4],
			-t[4] * e[5]
		],
		[
			0,
			0,
			0,
			e[4],
			e[5],
			1,
			-t[5] * e[4],
			-t[5] * e[5]
		],
		[
			e[6],
			e[7],
			1,
			0,
			0,
			0,
			-t[6] * e[6],
			-t[6] * e[7]
		],
		[
			0,
			0,
			0,
			e[6],
			e[7],
			1,
			-t[7] * e[6],
			-t[7] * e[7]
		]
	], r = {}, i = $e(n, 8, 0, 0, 0, r);
	if (i !== 0) {
		for (var a = [], o = 0; o < 8; o++) for (var s = 0; s < 8; s++) a[s] ?? (a[s] = 0), a[s] += ((o + s) % 2 ? -1 : 1) * $e(n, 7, +(o === 0), 1 << o, 1 << s, r) / i * t[o];
		return function(e, t, n) {
			var r = t * a[6] + n * a[7] + 1;
			e[0] = (t * a[0] + n * a[1] + a[2]) / r, e[1] = (t * a[3] + n * a[4] + a[5]) / r;
		};
	}
}
//#endregion
//#region node_modules/zrender/lib/core/dom.js
var tt = "___zrEVENTSAVED", nt = [];
function rt(e, t, n, r, i) {
	return at(nt, t, r, i, !0) && at(e, n, nt[0], nt[1]);
}
function it(e, t) {
	e && n(e), t && n(t);
	function n(e) {
		var t = e[tt];
		t && (t.clearMarkers && t.clearMarkers(), delete e[tt]);
	}
}
function at(e, t, n, r, i) {
	if (t.getBoundingClientRect && a.domSupported && !ct(t)) {
		var o = t[tt] || (t[tt] = {}), s = st(ot(t, o), o, i);
		if (s) return s(e, n, r), !0;
	}
	return !1;
}
function ot(e, t) {
	var n = t.markers;
	if (n) return n;
	n = t.markers = [];
	for (var r = ["left", "right"], i = ["top", "bottom"], a = 0; a < 4; a++) {
		var o = document.createElement("div"), s = o.style, c = a % 2, l = (a >> 1) % 2;
		s.cssText = [
			"position: absolute",
			"visibility: hidden",
			"padding: 0",
			"margin: 0",
			"border-width: 0",
			"user-select: none",
			"width:0",
			"height:0",
			r[c] + ":0",
			i[l] + ":0",
			r[1 - c] + ":auto",
			i[1 - l] + ":auto",
			""
		].join("!important;"), e.appendChild(o), n.push(o);
	}
	return t.clearMarkers = function() {
		L(n, function(e) {
			e.parentNode && e.parentNode.removeChild(e);
		});
	}, n;
}
function st(e, t, n) {
	for (var r = n ? "invTrans" : "trans", i = t[r], a = t.srcCoords, o = [], s = [], c = !0, l = 0; l < 4; l++) {
		var u = e[l].getBoundingClientRect(), d = 2 * l, f = u.left, p = u.top;
		o.push(f, p), c = c && a && f === a[d] && p === a[d + 1], s.push(e[l].offsetLeft, e[l].offsetTop);
	}
	return c && i ? i : (t.srcCoords = o, t[r] = n ? et(s, o) : et(o, s));
}
function ct(e) {
	return e.nodeName.toUpperCase() === "CANVAS";
}
var lt = /([&<>"'])/g, ut = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"'": "&#39;"
};
function dt(e) {
	return e == null ? "" : (e + "").replace(lt, function(e, t) {
		return ut[t];
	});
}
//#endregion
//#region node_modules/zrender/lib/core/event.js
var ft = /^(?:mouse|pointer|contextmenu|drag|drop)|click/, pt = [], mt = a.browser.firefox && +a.browser.version.split(".")[0] < 39;
function ht(e, t, n, r) {
	return n ||= {}, r ? gt(e, t, n) : mt && t.layerX != null && t.layerX !== t.offsetX ? (n.zrX = t.layerX, n.zrY = t.layerY) : t.offsetX == null ? gt(e, t, n) : (n.zrX = t.offsetX, n.zrY = t.offsetY), n;
}
function gt(e, t, n) {
	if (a.domSupported && e.getBoundingClientRect) {
		var r = t.clientX, i = t.clientY;
		if (ct(e)) {
			var o = e.getBoundingClientRect();
			n.zrX = r - o.left, n.zrY = i - o.top;
			return;
		}
		if (at(pt, e, r, i)) {
			n.zrX = pt[0], n.zrY = pt[1];
			return;
		}
	}
	n.zrX = n.zrY = 0;
}
function _t(e) {
	return e || window.event;
}
function vt(e, t, n) {
	if (t = _t(t), t.zrX != null) return t;
	var r = t.type;
	if (r && r.indexOf("touch") >= 0) {
		var i = r === "touchend" ? t.changedTouches[0] : t.targetTouches[0];
		i && ht(e, i, t, n);
	} else {
		ht(e, t, t, n);
		var a = yt(t);
		t.zrDelta = a ? a / 120 : -(t.detail || 0) / 3;
	}
	var o = t.button;
	return t.which == null && o !== void 0 && ft.test(t.type) && (t.which = o & 1 ? 1 : o & 2 ? 3 : o & 4 ? 2 : 0), t;
}
function yt(e) {
	var t = e.wheelDelta;
	if (t) return t;
	var n = e.deltaX, r = e.deltaY;
	if (n == null || r == null) return t;
	var i = Math.abs(r === 0 ? n : r), a = r > 0 ? -1 : r < 0 ? 1 : n > 0 ? -1 : 1;
	return 3 * i * a;
}
function bt(e, t, n, r) {
	e.addEventListener(t, n, r);
}
function xt(e, t, n, r) {
	e.removeEventListener(t, n, r);
}
var St = function(e) {
	e.preventDefault(), e.stopPropagation(), e.cancelBubble = !0;
}, Ct = function() {
	function e() {
		this._track = [];
	}
	return e.prototype.recognize = function(e, t, n) {
		return this._doTrack(e, t, n), this._recognize(e);
	}, e.prototype.clear = function() {
		return this._track.length = 0, this;
	}, e.prototype._doTrack = function(e, t, n) {
		var r = e.touches;
		if (r) {
			for (var i = {
				points: [],
				touches: [],
				target: t,
				event: e
			}, a = 0, o = r.length; a < o; a++) {
				var s = r[a], c = ht(n, s, {});
				i.points.push([c.zrX, c.zrY]), i.touches.push(s);
			}
			this._track.push(i);
		}
	}, e.prototype._recognize = function(e) {
		for (var t in Et) if (Et.hasOwnProperty(t)) {
			var n = Et[t](this._track, e);
			if (n) return n;
		}
	}, e;
}();
function wt(e) {
	var t = e[1][0] - e[0][0], n = e[1][1] - e[0][1];
	return Math.sqrt(t * t + n * n);
}
function Tt(e) {
	return [(e[0][0] + e[1][0]) / 2, (e[0][1] + e[1][1]) / 2];
}
var Et = { pinch: function(e, t) {
	var n = e.length;
	if (n) {
		var r = (e[n - 1] || {}).points, i = (e[n - 2] || {}).points || r;
		if (i && i.length > 1 && r && r.length > 1) {
			var a = wt(r) / wt(i);
			!isFinite(a) && (a = 1), t.pinchScale = a;
			var o = Tt(r);
			return t.pinchX = o[0], t.pinchY = o[1], {
				type: "pinch",
				target: e[0].target,
				event: t
			};
		}
	}
} };
//#endregion
//#region node_modules/zrender/lib/core/matrix.js
function Dt() {
	return [
		1,
		0,
		0,
		1,
		0,
		0
	];
}
function Ot(e) {
	return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 1, e[4] = 0, e[5] = 0, e;
}
function kt(e, t) {
	return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4], e[5] = t[5], e;
}
function At(e, t, n) {
	var r = t[0] * n[0] + t[2] * n[1], i = t[1] * n[0] + t[3] * n[1], a = t[0] * n[2] + t[2] * n[3], o = t[1] * n[2] + t[3] * n[3], s = t[0] * n[4] + t[2] * n[5] + t[4], c = t[1] * n[4] + t[3] * n[5] + t[5];
	return e[0] = r, e[1] = i, e[2] = a, e[3] = o, e[4] = s, e[5] = c, e;
}
function jt(e, t, n) {
	return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4] + n[0], e[5] = t[5] + n[1], e;
}
function Mt(e, t, n, r) {
	r === void 0 && (r = [0, 0]);
	var i = t[0], a = t[2], o = t[4], s = t[1], c = t[3], l = t[5], u = Math.sin(n), d = Math.cos(n);
	return e[0] = i * d + s * u, e[1] = -i * u + s * d, e[2] = a * d + c * u, e[3] = -a * u + d * c, e[4] = d * (o - r[0]) + u * (l - r[1]) + r[0], e[5] = d * (l - r[1]) - u * (o - r[0]) + r[1], e;
}
function Nt(e, t, n) {
	var r = n[0], i = n[1];
	return e[0] = t[0] * r, e[1] = t[1] * i, e[2] = t[2] * r, e[3] = t[3] * i, e[4] = t[4] * r, e[5] = t[5] * i, e;
}
function Pt(e, t) {
	var n = t[0], r = t[2], i = t[4], a = t[1], o = t[3], s = t[5], c = n * o - a * r;
	return c ? (c = 1 / c, e[0] = o * c, e[1] = -a * c, e[2] = -r * c, e[3] = n * c, e[4] = (r * s - o * i) * c, e[5] = (a * i - n * s) * c, e) : null;
}
//#endregion
//#region node_modules/zrender/lib/core/Point.js
var Ft = function() {
	function e(e, t) {
		this.x = e || 0, this.y = t || 0;
	}
	return e.prototype.copy = function(e) {
		return this.x = e.x, this.y = e.y, this;
	}, e.prototype.clone = function() {
		return new e(this.x, this.y);
	}, e.prototype.set = function(e, t) {
		return this.x = e, this.y = t, this;
	}, e.prototype.equal = function(e) {
		return e.x === this.x && e.y === this.y;
	}, e.prototype.add = function(e) {
		return this.x += e.x, this.y += e.y, this;
	}, e.prototype.scale = function(e) {
		this.x *= e, this.y *= e;
	}, e.prototype.scaleAndAdd = function(e, t) {
		this.x += e.x * t, this.y += e.y * t;
	}, e.prototype.sub = function(e) {
		return this.x -= e.x, this.y -= e.y, this;
	}, e.prototype.dot = function(e) {
		return this.x * e.x + this.y * e.y;
	}, e.prototype.len = function() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}, e.prototype.lenSquare = function() {
		return this.x * this.x + this.y * this.y;
	}, e.prototype.normalize = function() {
		var e = this.len();
		return this.x /= e, this.y /= e, this;
	}, e.prototype.distance = function(e) {
		var t = this.x - e.x, n = this.y - e.y;
		return Math.sqrt(t * t + n * n);
	}, e.prototype.distanceSquare = function(e) {
		var t = this.x - e.x, n = this.y - e.y;
		return t * t + n * n;
	}, e.prototype.negate = function() {
		return this.x = -this.x, this.y = -this.y, this;
	}, e.prototype.transform = function(e) {
		if (e) {
			var t = this.x, n = this.y;
			return this.x = e[0] * t + e[2] * n + e[4], this.y = e[1] * t + e[3] * n + e[5], this;
		}
	}, e.prototype.toArray = function(e) {
		return e[0] = this.x, e[1] = this.y, e;
	}, e.prototype.fromArray = function(e) {
		this.x = e[0], this.y = e[1];
	}, e.set = function(e, t, n) {
		e.x = t, e.y = n;
	}, e.copy = function(e, t) {
		e.x = t.x, e.y = t.y;
	}, e.len = function(e) {
		return Math.sqrt(e.x * e.x + e.y * e.y);
	}, e.lenSquare = function(e) {
		return e.x * e.x + e.y * e.y;
	}, e.dot = function(e, t) {
		return e.x * t.x + e.y * t.y;
	}, e.add = function(e, t, n) {
		e.x = t.x + n.x, e.y = t.y + n.y;
	}, e.sub = function(e, t, n) {
		e.x = t.x - n.x, e.y = t.y - n.y;
	}, e.scale = function(e, t, n) {
		e.x = t.x * n, e.y = t.y * n;
	}, e.scaleAndAdd = function(e, t, n, r) {
		e.x = t.x + n.x * r, e.y = t.y + n.y * r;
	}, e.lerp = function(e, t, n, r) {
		var i = 1 - r;
		e.x = i * t.x + r * n.x, e.y = i * t.y + r * n.y;
	}, e;
}(), It = Math.min, Lt = Math.max, Rt = Math.abs, zt = ["x", "y"], Bt = ["width", "height"], Vt = new Ft(), Ht = new Ft(), Ut = new Ft(), Wt = new Ft(), Gt = nn(), Kt = Gt.minTv, qt = Gt.maxTv, Jt = [0, 0], J = function() {
	function e(e, t, n, r) {
		Yt(this, e, t, n, r);
	}
	return e.set = function(e, t, n, r, i) {
		return r < 0 && (t += r, r = -r), i < 0 && (n += i, i = -i), e.x = t, e.y = n, e.width = r, e.height = i, e;
	}, e.prototype.union = function(e) {
		var t = It(e.x, this.x), n = It(e.y, this.y);
		this.width = isFinite(this.x) && isFinite(this.width) ? Lt(e.x + e.width, this.x + this.width) - t : e.width, this.height = isFinite(this.y) && isFinite(this.height) ? Lt(e.y + e.height, this.y + this.height) - n : e.height, this.x = t, this.y = n;
	}, e.prototype.applyTransform = function(t) {
		e.applyTransform(this, this, t);
	}, e.prototype.calculateTransform = function(e) {
		return Zt(Dt(), this, e);
	}, e.prototype.intersect = function(t, n, r) {
		return e.intersect(this, t, n, r);
	}, e.intersect = function(t, n, r, i) {
		r && Ft.set(r, 0, 0);
		var a = i && i.outIntersectRect || null, o = i && i.clamp;
		if (a && (a.x = a.y = a.width = a.height = NaN), !t || !n) return !1;
		t instanceof e || (t = Yt(Qt, t.x, t.y, t.width, t.height)), n instanceof e || (n = Yt($t, n.x, n.y, n.width, n.height));
		var s = !!r;
		Gt.reset(i, s);
		var c = Gt.touchThreshold, l = t.x + c, u = t.x + t.width - c, d = t.y + c, f = t.y + t.height - c, p = n.x + c, m = n.x + n.width - c, h = n.y + c, g = n.y + n.height - c;
		if (l > u || d > f || p > m || h > g) return !1;
		var _ = !(u < p || m < l || f < h || g < d);
		return (s || a) && (Jt[0] = Infinity, Jt[1] = 0, tn(l, u, p, m, 0, s, a, o), tn(d, f, h, g, 1, s, a, o), s && Ft.copy(r, _ ? Gt.useDir ? Gt.dirMinTv : Kt : qt)), _;
	}, e.contain = function(e, t, n) {
		return t >= e.x && t <= e.x + e.width && n >= e.y && n <= e.y + e.height;
	}, e.prototype.contain = function(t, n) {
		return e.contain(this, t, n);
	}, e.prototype.clone = function() {
		return new e(this.x, this.y, this.width, this.height);
	}, e.prototype.copy = function(e) {
		Xt(this, e);
	}, e.prototype.plain = function() {
		return {
			x: this.x,
			y: this.y,
			width: this.width,
			height: this.height
		};
	}, e.prototype.isFinite = function() {
		return isFinite(this.x) && isFinite(this.y) && isFinite(this.width) && isFinite(this.height);
	}, e.prototype.isZero = function() {
		return this.width === 0 || this.height === 0;
	}, e.create = function(t) {
		return new e(t ? t.x : 0, t ? t.y : 0, t ? t.width : 0, t ? t.height : 0);
	}, e.copy = function(e, t) {
		return e.x = t.x, e.y = t.y, e.width = t.width, e.height = t.height, e;
	}, e.applyTransform = function(e, t, n) {
		if (!n) {
			e !== t && Xt(e, t);
			return;
		}
		if (n[1] < 1e-5 && n[1] > -1e-5 && n[2] < 1e-5 && n[2] > -1e-5) {
			var r = n[0], i = n[3], a = n[4], o = n[5];
			e.x = t.x * r + a, e.y = t.y * i + o, e.width = t.width * r, e.height = t.height * i, e.width < 0 && (e.x += e.width, e.width = -e.width), e.height < 0 && (e.y += e.height, e.height = -e.height);
			return;
		}
		Vt.x = Ut.x = t.x, Vt.y = Wt.y = t.y, Ht.x = Wt.x = t.x + t.width, Ht.y = Ut.y = t.y + t.height, Vt.transform(n), Wt.transform(n), Ht.transform(n), Ut.transform(n), e.x = It(Vt.x, Ht.x, Ut.x, Wt.x), e.y = It(Vt.y, Ht.y, Ut.y, Wt.y);
		var s = Lt(Vt.x, Ht.x, Ut.x, Wt.x), c = Lt(Vt.y, Ht.y, Ut.y, Wt.y);
		e.width = s - e.x, e.height = c - e.y;
	}, e.calculateTransform = function(e, t, n) {
		var r = n.width / t.width, i = n.height / t.height;
		return e = Ot(e || []), jt(e, e, Fe(en, -t.x, -t.y)), Nt(e, e, Fe(en, r, i)), jt(e, e, Fe(en, n.x, n.y)), e;
	}, e;
}();
J.create;
var Yt = J.set, Xt = J.copy, Zt = J.calculateTransform;
J.applyTransform, J.contain;
var Qt = new J(0, 0, 0, 0), $t = new J(0, 0, 0, 0), en = [];
function tn(e, t, n, r, i, a, o, s) {
	var c = Rt(t - n), l = Rt(r - e), u = It(c, l), d = zt[i], f = zt[1 - i], p = Bt[i];
	t < n || r < e ? c < l ? (a && (qt[d] = -c), s && (o[d] = t, o[p] = 0)) : (a && (qt[d] = l), s && (o[d] = e, o[p] = 0)) : (o && (o[d] = Lt(e, n), o[p] = It(t, r) - o[d]), a && (u < Jt[0] || Gt.useDir) && (Jt[0] = It(u, Jt[0]), (c < l || !Gt.bidirectional) && (Kt[d] = c, Kt[f] = 0, Gt.useDir && Gt.calcDirMTV()), (c >= l || !Gt.bidirectional) && (Kt[d] = -l, Kt[f] = 0, Gt.useDir && Gt.calcDirMTV())));
}
function nn() {
	var e = 0, t = new Ft(), n = new Ft(), r = {
		minTv: new Ft(),
		maxTv: new Ft(),
		useDir: !1,
		dirMinTv: new Ft(),
		touchThreshold: 0,
		bidirectional: !0,
		negativeSize: !1,
		reset: function(i, a) {
			r.touchThreshold = 0, i && i.touchThreshold != null && (r.touchThreshold = Lt(0, i.touchThreshold)), r.negativeSize = !1, a && (r.minTv.set(Infinity, Infinity), r.maxTv.set(0, 0), r.useDir = !1, i && i.direction != null && (r.useDir = !0, r.dirMinTv.copy(r.minTv), n.copy(r.minTv), e = i.direction, r.bidirectional = i.bidirectional == null || !!i.bidirectional, r.bidirectional || t.set(Math.cos(e), Math.sin(e))));
		},
		calcDirMTV: function() {
			var a = r.minTv, o = r.dirMinTv, s = a.y * a.y + a.x * a.x, c = Math.sin(e), l = Math.cos(e), u = c * a.y + l * a.x;
			if (i(u)) {
				i(a.x) && i(a.y) && o.set(0, 0);
				return;
			}
			if (n.x = s * l / u, n.y = s * c / u, i(n.x) && i(n.y)) {
				o.set(0, 0);
				return;
			}
			(r.bidirectional || t.dot(n) > 0) && n.len() < o.len() && o.copy(n);
		}
	};
	function i(e) {
		return Rt(e) < 1e-10;
	}
	return r;
}
//#endregion
//#region node_modules/zrender/lib/Handler.js
var rn = "silent";
function an(e, t, n) {
	return {
		type: e,
		event: n,
		target: t.target,
		topTarget: t.topTarget,
		cancelBubble: !1,
		offsetX: n.zrX,
		offsetY: n.zrY,
		gestureEvent: n.gestureEvent,
		pinchX: n.pinchX,
		pinchY: n.pinchY,
		pinchScale: n.pinchScale,
		wheelDelta: n.zrDelta,
		zrByTouch: n.zrByTouch,
		which: n.which,
		stop: on
	};
}
function on() {
	St(this.event);
}
var sn = function(e) {
	r(t, e);
	function t() {
		var t = e !== null && e.apply(this, arguments) || this;
		return t.handler = null, t;
	}
	return t.prototype.dispose = function() {}, t.prototype.setCursor = function() {}, t;
}(Ze), cn = function() {
	function e(e, t) {
		this.x = e, this.y = t;
	}
	return e;
}(), ln = [
	"click",
	"dblclick",
	"mousewheel",
	"mouseout",
	"mouseup",
	"mousedown",
	"mousemove",
	"contextmenu"
], un = new J(0, 0, 0, 0), dn = function(e) {
	r(t, e);
	function t(t, n, r, i, a) {
		var o = e.call(this) || this;
		return o._hovered = new cn(0, 0), o.storage = t, o.painter = n, o.painterRoot = i, o._pointerSize = a, r ||= new sn(), o.proxy = null, o.setHandlerProxy(r), o._draggingMgr = new Xe(o), o;
	}
	return t.prototype.setHandlerProxy = function(e) {
		this.proxy && this.proxy.dispose(), e && (L(ln, function(t) {
			e.on && e.on(t, this[t], this);
		}, this), e.handler = this), this.proxy = e;
	}, t.prototype.mousemove = function(e) {
		var t = e.zrX, n = e.zrY, r = mn(this, t, n), i = this._hovered, a = i.target;
		a && !a.__zr && (i = this.findHover(i.x, i.y), a = i.target);
		var o = this._hovered = r ? new cn(t, n) : this.findHover(t, n), s = o.target, c = this.proxy;
		c.setCursor && c.setCursor(s ? s.cursor : "default"), a && s !== a && this.dispatchToElement(i, "mouseout", e), this.dispatchToElement(o, "mousemove", e), s && s !== a && this.dispatchToElement(o, "mouseover", e);
	}, t.prototype.mouseout = function(e) {
		var t = e.zrEventControl;
		t !== "only_globalout" && this.dispatchToElement(this._hovered, "mouseout", e), t !== "no_globalout" && this.trigger("globalout", {
			type: "globalout",
			event: e
		});
	}, t.prototype.resize = function() {
		this._hovered = new cn(0, 0);
	}, t.prototype.dispatch = function(e, t) {
		var n = this[e];
		n && n.call(this, t);
	}, t.prototype.dispose = function() {
		this.proxy.dispose(), this.storage = null, this.proxy = null, this.painter = null;
	}, t.prototype.setCursorStyle = function(e) {
		var t = this.proxy;
		t.setCursor && t.setCursor(e);
	}, t.prototype.dispatchToElement = function(e, t, n) {
		e ||= {};
		var r = e.target;
		if (!(r && r.silent)) {
			for (var i = "on" + t, a = an(t, e, n); r && (r[i] && (a.cancelBubble = !!r[i].call(r, a)), r.trigger(t, a), r = r.__hostTarget ? r.__hostTarget : r.parent, !a.cancelBubble););
			a.cancelBubble || (this.trigger(t, a), this.painter && this.painter.eachOtherLayer && this.painter.eachOtherLayer(function(e) {
				typeof e[i] == "function" && e[i].call(e, a), e.trigger && e.trigger(t, a);
			}));
		}
	}, t.prototype.findHover = function(e, t, n) {
		var r = this.storage.getDisplayList(), i = new cn(e, t);
		if (pn(r, i, e, t, n), this._pointerSize && !i.target) {
			for (var a = [], o = this._pointerSize, s = o / 2, c = new J(e - s, t - s, o, o), l = r.length - 1; l >= 0; l--) {
				var u = r[l];
				u !== n && !u.ignore && !u.ignoreCoarsePointer && (!u.parent || !u.parent.ignoreCoarsePointer) && (un.copy(u.getBoundingRect()), u.transform && un.applyTransform(u.transform), un.intersect(c) && a.push(u));
			}
			if (a.length) {
				for (var d = 4, f = Math.PI / 12, p = Math.PI * 2, m = 0; m < s; m += d) for (var h = 0; h < p; h += f) if (pn(a, i, e + m * Math.cos(h), t + m * Math.sin(h), n), i.target) return i;
			}
		}
		return i;
	}, t.prototype.processGesture = function(e, t) {
		this._gestureMgr ||= new Ct();
		var n = this._gestureMgr;
		t === "start" && n.clear();
		var r = n.recognize(e, this.findHover(e.zrX, e.zrY, null).target, this.proxy.dom);
		if (t === "end" && n.clear(), r) {
			var i = r.type;
			e.gestureEvent = i;
			var a = new cn();
			a.target = r.target, this.dispatchToElement(a, i, r.event);
		}
	}, t;
}(Ze);
L([
	"click",
	"mousedown",
	"mouseup",
	"mousewheel",
	"dblclick",
	"contextmenu"
], function(e) {
	dn.prototype[e] = function(t) {
		var n = t.zrX, r = t.zrY, i = mn(this, n, r), a, o;
		if ((e !== "mouseup" || !i) && (a = this.findHover(n, r), o = a.target), e === "mousedown") this._downEl = o, this._downPoint = [t.zrX, t.zrY], this._upEl = o;
		else if (e === "mouseup") this._upEl = o;
		else if (e === "click") {
			if (this._downEl !== this._upEl || !this._downPoint || Ue(this._downPoint, [t.zrX, t.zrY]) > 4) return;
			this._downPoint = null;
		}
		this.dispatchToElement(a, e, t);
	};
});
function fn(e, t, n) {
	if (e[e.rectHover ? "rectContain" : "contain"](t, n)) {
		for (var r = e, i = void 0, a = !1; r;) {
			if (r.ignoreClip && (a = !0), !a) {
				var o = r.getClipPath();
				if (o && !o.contain(t, n)) return !1;
			}
			r.silent && (i = !0);
			var s = r.__hostTarget;
			r = s ? r.ignoreHostSilent ? null : s : r.parent;
		}
		return !i || rn;
	}
	return !1;
}
function pn(e, t, n, r, i) {
	for (var a = e.length - 1; a >= 0; a--) {
		var o = e[a], s = void 0;
		if (o !== i && !o.ignore && (s = fn(o, n, r)) && (!t.topTarget && (t.topTarget = o), s !== rn)) {
			t.target = o;
			break;
		}
	}
}
function mn(e, t, n) {
	var r = e.painter;
	return t < 0 || t > r.getWidth() || n < 0 || n > r.getHeight();
}
//#endregion
//#region node_modules/zrender/lib/core/timsort.js
var hn = 32, gn = 7;
function _n(e) {
	for (var t = 0; e >= hn;) t |= e & 1, e >>= 1;
	return e + t;
}
function vn(e, t, n, r) {
	var i = t + 1;
	if (i === n) return 1;
	if (r(e[i++], e[t]) < 0) {
		for (; i < n && r(e[i], e[i - 1]) < 0;) i++;
		yn(e, t, i);
	} else for (; i < n && r(e[i], e[i - 1]) >= 0;) i++;
	return i - t;
}
function yn(e, t, n) {
	for (n--; t < n;) {
		var r = e[t];
		e[t++] = e[n], e[n--] = r;
	}
}
function bn(e, t, n, r, i) {
	for (r === t && r++; r < n; r++) {
		for (var a = e[r], o = t, s = r, c; o < s;) c = o + s >>> 1, i(a, e[c]) < 0 ? s = c : o = c + 1;
		var l = r - o;
		switch (l) {
			case 3: e[o + 3] = e[o + 2];
			case 2: e[o + 2] = e[o + 1];
			case 1:
				e[o + 1] = e[o];
				break;
			default: for (; l > 0;) e[o + l] = e[o + l - 1], l--;
		}
		e[o] = a;
	}
}
function xn(e, t, n, r, i, a) {
	var o = 0, s = 0, c = 1;
	if (a(e, t[n + i]) > 0) {
		for (s = r - i; c < s && a(e, t[n + i + c]) > 0;) o = c, c = (c << 1) + 1, c <= 0 && (c = s);
		c > s && (c = s), o += i, c += i;
	} else {
		for (s = i + 1; c < s && a(e, t[n + i - c]) <= 0;) o = c, c = (c << 1) + 1, c <= 0 && (c = s);
		c > s && (c = s);
		var l = o;
		o = i - c, c = i - l;
	}
	for (o++; o < c;) {
		var u = o + (c - o >>> 1);
		a(e, t[n + u]) > 0 ? o = u + 1 : c = u;
	}
	return c;
}
function Sn(e, t, n, r, i, a) {
	var o = 0, s = 0, c = 1;
	if (a(e, t[n + i]) < 0) {
		for (s = i + 1; c < s && a(e, t[n + i - c]) < 0;) o = c, c = (c << 1) + 1, c <= 0 && (c = s);
		c > s && (c = s);
		var l = o;
		o = i - c, c = i - l;
	} else {
		for (s = r - i; c < s && a(e, t[n + i + c]) >= 0;) o = c, c = (c << 1) + 1, c <= 0 && (c = s);
		c > s && (c = s), o += i, c += i;
	}
	for (o++; o < c;) {
		var u = o + (c - o >>> 1);
		a(e, t[n + u]) < 0 ? c = u : o = u + 1;
	}
	return c;
}
function Cn(e, t) {
	var n = gn, r, i, a = 0, o = [];
	r = [], i = [];
	function s(e, t) {
		r[a] = e, i[a] = t, a += 1;
	}
	function c() {
		for (; a > 1;) {
			var e = a - 2;
			if (e >= 1 && i[e - 1] <= i[e] + i[e + 1] || e >= 2 && i[e - 2] <= i[e] + i[e - 1]) i[e - 1] < i[e + 1] && e--;
			else if (i[e] > i[e + 1]) break;
			u(e);
		}
	}
	function l() {
		for (; a > 1;) {
			var e = a - 2;
			e > 0 && i[e - 1] < i[e + 1] && e--, u(e);
		}
	}
	function u(n) {
		var o = r[n], s = i[n], c = r[n + 1], l = i[n + 1];
		i[n] = s + l, n === a - 3 && (r[n + 1] = r[n + 2], i[n + 1] = i[n + 2]), a--;
		var u = Sn(e[c], e, o, s, 0, t);
		o += u, s -= u, s !== 0 && (l = xn(e[o + s - 1], e, c, l, l - 1, t), l !== 0 && (s <= l ? d(o, s, c, l) : f(o, s, c, l)));
	}
	function d(r, i, a, s) {
		var c = 0;
		for (c = 0; c < i; c++) o[c] = e[r + c];
		var l = 0, u = a, d = r;
		if (e[d++] = e[u++], --s === 0) {
			for (c = 0; c < i; c++) e[d + c] = o[l + c];
			return;
		}
		if (i === 1) {
			for (c = 0; c < s; c++) e[d + c] = e[u + c];
			e[d + s] = o[l];
			return;
		}
		for (var f = n, p, m, h;;) {
			p = 0, m = 0, h = !1;
			do
				if (t(e[u], o[l]) < 0) {
					if (e[d++] = e[u++], m++, p = 0, --s === 0) {
						h = !0;
						break;
					}
				} else if (e[d++] = o[l++], p++, m = 0, --i === 1) {
					h = !0;
					break;
				}
			while ((p | m) < f);
			if (h) break;
			do {
				if (p = Sn(e[u], o, l, i, 0, t), p !== 0) {
					for (c = 0; c < p; c++) e[d + c] = o[l + c];
					if (d += p, l += p, i -= p, i <= 1) {
						h = !0;
						break;
					}
				}
				if (e[d++] = e[u++], --s === 0) {
					h = !0;
					break;
				}
				if (m = xn(o[l], e, u, s, 0, t), m !== 0) {
					for (c = 0; c < m; c++) e[d + c] = e[u + c];
					if (d += m, u += m, s -= m, s === 0) {
						h = !0;
						break;
					}
				}
				if (e[d++] = o[l++], --i === 1) {
					h = !0;
					break;
				}
				f--;
			} while (p >= gn || m >= gn);
			if (h) break;
			f < 0 && (f = 0), f += 2;
		}
		if (n = f, n < 1 && (n = 1), i === 1) {
			for (c = 0; c < s; c++) e[d + c] = e[u + c];
			e[d + s] = o[l];
		} else if (i === 0) throw Error();
		else for (c = 0; c < i; c++) e[d + c] = o[l + c];
	}
	function f(r, i, a, s) {
		var c = 0;
		for (c = 0; c < s; c++) o[c] = e[a + c];
		var l = r + i - 1, u = s - 1, d = a + s - 1, f = 0, p = 0;
		if (e[d--] = e[l--], --i === 0) {
			for (f = d - (s - 1), c = 0; c < s; c++) e[f + c] = o[c];
			return;
		}
		if (s === 1) {
			for (d -= i, l -= i, p = d + 1, f = l + 1, c = i - 1; c >= 0; c--) e[p + c] = e[f + c];
			e[d] = o[u];
			return;
		}
		for (var m = n;;) {
			var h = 0, g = 0, _ = !1;
			do
				if (t(o[u], e[l]) < 0) {
					if (e[d--] = e[l--], h++, g = 0, --i === 0) {
						_ = !0;
						break;
					}
				} else if (e[d--] = o[u--], g++, h = 0, --s === 1) {
					_ = !0;
					break;
				}
			while ((h | g) < m);
			if (_) break;
			do {
				if (h = i - Sn(o[u], e, r, i, i - 1, t), h !== 0) {
					for (d -= h, l -= h, i -= h, p = d + 1, f = l + 1, c = h - 1; c >= 0; c--) e[p + c] = e[f + c];
					if (i === 0) {
						_ = !0;
						break;
					}
				}
				if (e[d--] = o[u--], --s === 1) {
					_ = !0;
					break;
				}
				if (g = s - xn(e[l], o, 0, s, s - 1, t), g !== 0) {
					for (d -= g, u -= g, s -= g, p = d + 1, f = u + 1, c = 0; c < g; c++) e[p + c] = o[f + c];
					if (s <= 1) {
						_ = !0;
						break;
					}
				}
				if (e[d--] = e[l--], --i === 0) {
					_ = !0;
					break;
				}
				m--;
			} while (h >= gn || g >= gn);
			if (_) break;
			m < 0 && (m = 0), m += 2;
		}
		if (n = m, n < 1 && (n = 1), s === 1) {
			for (d -= i, l -= i, p = d + 1, f = l + 1, c = i - 1; c >= 0; c--) e[p + c] = e[f + c];
			e[d] = o[u];
		} else if (s === 0) throw Error();
		else for (f = d - (s - 1), c = 0; c < s; c++) e[f + c] = o[c];
	}
	return {
		mergeRuns: c,
		forceMergeRuns: l,
		pushRun: s
	};
}
function wn(e, t, n, r) {
	n ||= 0, r ||= e.length;
	var i = r - n;
	if (!(i < 2)) {
		var a = 0;
		if (i < hn) {
			a = vn(e, n, r, t), bn(e, n, r, n + a, t);
			return;
		}
		var o = Cn(e, t), s = _n(i);
		do {
			if (a = vn(e, n, r, t), a < s) {
				var c = i;
				c > s && (c = s), bn(e, n, n + c, n + a, t), a = c;
			}
			o.pushRun(n, a), o.mergeRuns(), i -= a, n += a;
		} while (i !== 0);
		o.forceMergeRuns();
	}
}
//#endregion
//#region node_modules/zrender/lib/Storage.js
var Tn = !1;
function En() {
	Tn || (Tn = !0, console.warn("z / z2 / zlevel of displayable is invalid, which may cause unexpected errors"));
}
function Dn(e, t) {
	return e.zlevel === t.zlevel ? e.z === t.z ? e.z2 - t.z2 : e.z - t.z : e.zlevel - t.zlevel;
}
var On = function() {
	function e() {
		this._roots = [], this._displayList = [], this._displayListLen = 0, this.displayableSortFunc = Dn;
	}
	return e.prototype.traverse = function(e, t) {
		for (var n = 0; n < this._roots.length; n++) this._roots[n].traverse(e, t);
	}, e.prototype.getDisplayList = function(e, t) {
		t ||= !1;
		var n = this._displayList;
		return (e || !n.length) && this.updateDisplayList(t), n;
	}, e.prototype.updateDisplayList = function(e) {
		this._displayListLen = 0;
		for (var t = this._roots, n = this._displayList, r = 0, i = t.length; r < i; r++) this._updateAndAddDisplayable(t[r], null, e);
		n.length = this._displayListLen, wn(n, Dn);
	}, e.prototype._updateAndAddDisplayable = function(e, t, n) {
		if (!e.ignore || n) {
			e.beforeUpdate(), e.update(), e.afterUpdate();
			var r = e.getClipPath(), i = t && t.length, a = 0, o = e.__clipPaths;
			if (!e.ignoreClip && (i || r)) {
				if (o ||= e.__clipPaths = [], i) for (var s = 0; s < t.length; s++) o[a++] = t[s];
				for (var c = r, l = e; c;) c.parent = l, c.updateTransform(), o[a++] = c, l = c, c = c.getClipPath();
			}
			if (o && (o.length = a), e.childrenRef) {
				for (var u = e.childrenRef(), d = 0; d < u.length; d++) {
					var f = u[d];
					e.__dirty && (f.__dirty |= 1), this._updateAndAddDisplayable(f, o, n);
				}
				e.__dirty = 0;
			} else {
				var p = e;
				isNaN(p.z) && (En(), p.z = 0), isNaN(p.z2) && (En(), p.z2 = 0), isNaN(p.zlevel) && (En(), p.zlevel = 0), this._displayList[this._displayListLen++] = p;
			}
			var m = e.getDecalElement && e.getDecalElement();
			m && this._updateAndAddDisplayable(m, o, n);
			var h = e.getTextGuideLine();
			h && this._updateAndAddDisplayable(h, o, n);
			var g = e.getTextContent();
			g && this._updateAndAddDisplayable(g, o, n);
		}
	}, e.prototype.addRoot = function(e) {
		e.__zr && e.__zr.storage === this || this._roots.push(e);
	}, e.prototype.delRoot = function(e) {
		if (e instanceof Array) {
			for (var t = 0, n = e.length; t < n; t++) this.delRoot(e[t]);
			return;
		}
		var r = P(this._roots, e);
		r >= 0 && this._roots.splice(r, 1);
	}, e.prototype.delAllRoots = function() {
		this._roots = [], this._displayList = [], this._displayListLen = 0;
	}, e.prototype.getRoots = function() {
		return this._roots;
	}, e.prototype.dispose = function() {
		this._displayList = null, this._roots = null;
	}, e;
}(), kn = a.hasGlobalWindow && (window.requestAnimationFrame && window.requestAnimationFrame.bind(window) || window.msRequestAnimationFrame && window.msRequestAnimationFrame.bind(window) || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame) || function(e) {
	return setTimeout(e, 16);
}, An = {
	linear: function(e) {
		return e;
	},
	quadraticIn: function(e) {
		return e * e;
	},
	quadraticOut: function(e) {
		return e * (2 - e);
	},
	quadraticInOut: function(e) {
		return (e *= 2) < 1 ? .5 * e * e : -.5 * (--e * (e - 2) - 1);
	},
	cubicIn: function(e) {
		return e * e * e;
	},
	cubicOut: function(e) {
		return --e * e * e + 1;
	},
	cubicInOut: function(e) {
		return (e *= 2) < 1 ? .5 * e * e * e : .5 * ((e -= 2) * e * e + 2);
	},
	quarticIn: function(e) {
		return e * e * e * e;
	},
	quarticOut: function(e) {
		return 1 - --e * e * e * e;
	},
	quarticInOut: function(e) {
		return (e *= 2) < 1 ? .5 * e * e * e * e : -.5 * ((e -= 2) * e * e * e - 2);
	},
	quinticIn: function(e) {
		return e * e * e * e * e;
	},
	quinticOut: function(e) {
		return --e * e * e * e * e + 1;
	},
	quinticInOut: function(e) {
		return (e *= 2) < 1 ? .5 * e * e * e * e * e : .5 * ((e -= 2) * e * e * e * e + 2);
	},
	sinusoidalIn: function(e) {
		return 1 - Math.cos(e * Math.PI / 2);
	},
	sinusoidalOut: function(e) {
		return Math.sin(e * Math.PI / 2);
	},
	sinusoidalInOut: function(e) {
		return .5 * (1 - Math.cos(Math.PI * e));
	},
	exponentialIn: function(e) {
		return e === 0 ? 0 : 1024 ** (e - 1);
	},
	exponentialOut: function(e) {
		return e === 1 ? 1 : 1 - 2 ** (-10 * e);
	},
	exponentialInOut: function(e) {
		return e === 0 ? 0 : e === 1 ? 1 : (e *= 2) < 1 ? .5 * 1024 ** (e - 1) : .5 * (-(2 ** (-10 * (e - 1))) + 2);
	},
	circularIn: function(e) {
		return 1 - Math.sqrt(1 - e * e);
	},
	circularOut: function(e) {
		return Math.sqrt(1 - --e * e);
	},
	circularInOut: function(e) {
		return (e *= 2) < 1 ? -.5 * (Math.sqrt(1 - e * e) - 1) : .5 * (Math.sqrt(1 - (e -= 2) * e) + 1);
	},
	elasticIn: function(e) {
		var t, n = .1, r = .4;
		return e === 0 ? 0 : e === 1 ? 1 : (!n || n < 1 ? (n = 1, t = r / 4) : t = r * Math.asin(1 / n) / (2 * Math.PI), -(n * 2 ** (10 * --e) * Math.sin((e - t) * (2 * Math.PI) / r)));
	},
	elasticOut: function(e) {
		var t, n = .1, r = .4;
		return e === 0 ? 0 : e === 1 ? 1 : (!n || n < 1 ? (n = 1, t = r / 4) : t = r * Math.asin(1 / n) / (2 * Math.PI), n * 2 ** (-10 * e) * Math.sin((e - t) * (2 * Math.PI) / r) + 1);
	},
	elasticInOut: function(e) {
		var t, n = .1, r = .4;
		return e === 0 ? 0 : e === 1 ? 1 : (!n || n < 1 ? (n = 1, t = r / 4) : t = r * Math.asin(1 / n) / (2 * Math.PI), (e *= 2) < 1 ? -.5 * (n * 2 ** (10 * --e) * Math.sin((e - t) * (2 * Math.PI) / r)) : n * 2 ** (-10 * --e) * Math.sin((e - t) * (2 * Math.PI) / r) * .5 + 1);
	},
	backIn: function(e) {
		var t = 1.70158;
		return e * e * ((t + 1) * e - t);
	},
	backOut: function(e) {
		var t = 1.70158;
		return --e * e * ((t + 1) * e + t) + 1;
	},
	backInOut: function(e) {
		var t = 2.5949095;
		return (e *= 2) < 1 ? .5 * (e * e * ((t + 1) * e - t)) : .5 * ((e -= 2) * e * ((t + 1) * e + t) + 2);
	},
	bounceIn: function(e) {
		return 1 - An.bounceOut(1 - e);
	},
	bounceOut: function(e) {
		return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375;
	},
	bounceInOut: function(e) {
		return e < .5 ? An.bounceIn(e * 2) * .5 : An.bounceOut(e * 2 - 1) * .5 + .5;
	}
}, jn = Math.pow, Mn = Math.sqrt, Nn = 1e-8, Pn = 1e-4, Fn = Mn(3), In = 1 / 3, Ln = Ne(), Rn = Ne(), zn = Ne();
function Bn(e) {
	return e > -Nn && e < Nn;
}
function Vn(e) {
	return e > Nn || e < -Nn;
}
function Hn(e, t, n, r, i) {
	var a = 1 - i;
	return a * a * (a * e + 3 * i * t) + i * i * (i * r + 3 * a * n);
}
function Un(e, t, n, r, i) {
	var a = 1 - i;
	return 3 * (((t - e) * a + 2 * (n - t) * i) * a + (r - n) * i * i);
}
function Wn(e, t, n, r, i, a) {
	var o = r + 3 * (t - n) - e, s = 3 * (n - t * 2 + e), c = 3 * (t - e), l = e - i, u = s * s - 3 * o * c, d = s * c - 9 * o * l, f = c * c - 3 * s * l, p = 0;
	if (Bn(u) && Bn(d)) {
		if (Bn(s)) a[0] = 0;
		else {
			var m = -c / s;
			m >= 0 && m <= 1 && (a[p++] = m);
		}
	} else {
		var h = d * d - 4 * u * f;
		if (Bn(h)) {
			var g = d / u, m = -s / o + g, _ = -g / 2;
			m >= 0 && m <= 1 && (a[p++] = m), _ >= 0 && _ <= 1 && (a[p++] = _);
		} else if (h > 0) {
			var v = Mn(h), y = u * s + 1.5 * o * (-d + v), b = u * s + 1.5 * o * (-d - v);
			y = y < 0 ? -jn(-y, In) : jn(y, In), b = b < 0 ? -jn(-b, In) : jn(b, In);
			var m = (-s - (y + b)) / (3 * o);
			m >= 0 && m <= 1 && (a[p++] = m);
		} else {
			var x = (2 * u * s - 3 * o * d) / (2 * Mn(u * u * u)), S = Math.acos(x) / 3, C = Mn(u), w = Math.cos(S), m = (-s - 2 * C * w) / (3 * o), _ = (-s + C * (w + Fn * Math.sin(S))) / (3 * o), T = (-s + C * (w - Fn * Math.sin(S))) / (3 * o);
			m >= 0 && m <= 1 && (a[p++] = m), _ >= 0 && _ <= 1 && (a[p++] = _), T >= 0 && T <= 1 && (a[p++] = T);
		}
	}
	return p;
}
function Gn(e, t, n, r, i) {
	var a = 6 * n - 12 * t + 6 * e, o = 9 * t + 3 * r - 3 * e - 9 * n, s = 3 * t - 3 * e, c = 0;
	if (Bn(o)) {
		if (Vn(a)) {
			var l = -s / a;
			l >= 0 && l <= 1 && (i[c++] = l);
		}
	} else {
		var u = a * a - 4 * o * s;
		if (Bn(u)) i[0] = -a / (2 * o);
		else if (u > 0) {
			var d = Mn(u), l = (-a + d) / (2 * o), f = (-a - d) / (2 * o);
			l >= 0 && l <= 1 && (i[c++] = l), f >= 0 && f <= 1 && (i[c++] = f);
		}
	}
	return c;
}
function Kn(e, t, n, r, i, a) {
	var o = (t - e) * i + e, s = (n - t) * i + t, c = (r - n) * i + n, l = (s - o) * i + o, u = (c - s) * i + s, d = (u - l) * i + l;
	a[0] = e, a[1] = o, a[2] = l, a[3] = d, a[4] = d, a[5] = u, a[6] = c, a[7] = r;
}
function qn(e, t, n, r, i, a, o, s, c, l, u) {
	var d, f = .005, p = Infinity, m, h, g, _;
	Ln[0] = c, Ln[1] = l;
	for (var v = 0; v < 1; v += .05) Rn[0] = Hn(e, n, i, o, v), Rn[1] = Hn(t, r, a, s, v), g = Ge(Ln, Rn), g < p && (d = v, p = g);
	p = Infinity;
	for (var y = 0; y < 32 && !(f < Pn); y++) m = d - f, h = d + f, Rn[0] = Hn(e, n, i, o, m), Rn[1] = Hn(t, r, a, s, m), g = Ge(Rn, Ln), m >= 0 && g < p ? (d = m, p = g) : (zn[0] = Hn(e, n, i, o, h), zn[1] = Hn(t, r, a, s, h), _ = Ge(zn, Ln), h <= 1 && _ < p ? (d = h, p = _) : f *= .5);
	return u && (u[0] = Hn(e, n, i, o, d), u[1] = Hn(t, r, a, s, d)), Mn(p);
}
function Jn(e, t, n, r, i, a, o, s, c) {
	for (var l = e, u = t, d = 0, f = 1 / c, p = 1; p <= c; p++) {
		var m = p * f, h = Hn(e, n, i, o, m), g = Hn(t, r, a, s, m), _ = h - l, v = g - u;
		d += Math.sqrt(_ * _ + v * v), l = h, u = g;
	}
	return d;
}
function Yn(e, t, n, r) {
	var i = 1 - r;
	return i * (i * e + 2 * r * t) + r * r * n;
}
function Xn(e, t, n, r) {
	return 2 * ((1 - r) * (t - e) + r * (n - t));
}
function Zn(e, t, n, r, i) {
	var a = e - 2 * t + n, o = 2 * (t - e), s = e - r, c = 0;
	if (Bn(a)) {
		if (Vn(o)) {
			var l = -s / o;
			l >= 0 && l <= 1 && (i[c++] = l);
		}
	} else {
		var u = o * o - 4 * a * s;
		if (Bn(u)) {
			var l = -o / (2 * a);
			l >= 0 && l <= 1 && (i[c++] = l);
		} else if (u > 0) {
			var d = Mn(u), l = (-o + d) / (2 * a), f = (-o - d) / (2 * a);
			l >= 0 && l <= 1 && (i[c++] = l), f >= 0 && f <= 1 && (i[c++] = f);
		}
	}
	return c;
}
function Qn(e, t, n) {
	var r = e + n - 2 * t;
	return r === 0 ? .5 : (e - t) / r;
}
function $n(e, t, n, r, i) {
	var a = (t - e) * r + e, o = (n - t) * r + t, s = (o - a) * r + a;
	i[0] = e, i[1] = a, i[2] = s, i[3] = s, i[4] = o, i[5] = n;
}
function er(e, t, n, r, i, a, o, s, c) {
	var l, u = .005, d = Infinity;
	Ln[0] = o, Ln[1] = s;
	for (var f = 0; f < 1; f += .05) {
		Rn[0] = Yn(e, n, i, f), Rn[1] = Yn(t, r, a, f);
		var p = Ge(Ln, Rn);
		p < d && (l = f, d = p);
	}
	d = Infinity;
	for (var m = 0; m < 32 && !(u < Pn); m++) {
		var h = l - u, g = l + u;
		Rn[0] = Yn(e, n, i, h), Rn[1] = Yn(t, r, a, h);
		var p = Ge(Rn, Ln);
		if (h >= 0 && p < d) l = h, d = p;
		else {
			zn[0] = Yn(e, n, i, g), zn[1] = Yn(t, r, a, g);
			var _ = Ge(zn, Ln);
			g <= 1 && _ < d ? (l = g, d = _) : u *= .5;
		}
	}
	return c && (c[0] = Yn(e, n, i, l), c[1] = Yn(t, r, a, l)), Mn(d);
}
function tr(e, t, n, r, i, a, o) {
	for (var s = e, c = t, l = 0, u = 1 / o, d = 1; d <= o; d++) {
		var f = d * u, p = Yn(e, n, i, f), m = Yn(t, r, a, f), h = p - s, g = m - c;
		l += Math.sqrt(h * h + g * g), s = p, c = m;
	}
	return l;
}
//#endregion
//#region node_modules/zrender/lib/animation/cubicEasing.js
var nr = /cubic-bezier\(([0-9,\.e ]+)\)/;
function rr(e) {
	var t = e && nr.exec(e);
	if (t) {
		var n = t[1].split(","), r = +ye(n[0]), i = +ye(n[1]), a = +ye(n[2]), o = +ye(n[3]);
		if (isNaN(r + i + a + o)) return;
		var s = [];
		return function(e) {
			return e <= 0 ? 0 : e >= 1 ? 1 : Wn(0, r, a, 1, e, s) && Hn(0, i, o, 1, s[0]);
		};
	}
}
//#endregion
//#region node_modules/zrender/lib/animation/Clip.js
var ir = function() {
	function e(e) {
		this._inited = !1, this._startTime = 0, this._pausedTime = 0, this._paused = !1, this._life = e.life || 1e3, this._delay = e.delay || 0, this.loop = e.loop || !1, this.onframe = e.onframe || je, this.ondestroy = e.ondestroy || je, this.onrestart = e.onrestart || je, e.easing && this.setEasing(e.easing);
	}
	return e.prototype.step = function(e, t) {
		if (this._inited ||= (this._startTime = e + this._delay, !0), this._paused) {
			this._pausedTime += t;
			return;
		}
		var n = this._life, r = e - this._startTime - this._pausedTime, i = r / n;
		i < 0 && (i = 0), i = Math.min(i, 1);
		var a = this.easingFunc, o = a ? a(i) : i;
		if (this.onframe(o), i === 1) {
			if (this.loop) {
				var s = r % n;
				this._startTime = e - s, this._pausedTime = 0, this.onrestart();
			} else return !0;
		}
		return !1;
	}, e.prototype.pause = function() {
		this._paused = !0;
	}, e.prototype.resume = function() {
		this._paused = !1;
	}, e.prototype.setEasing = function(e) {
		this.easing = e, this.easingFunc = U(e) ? e : An[e] || rr(e);
	}, e;
}(), ar = function() {
	function e(e) {
		this.value = e;
	}
	return e;
}(), or = function() {
	function e() {
		this._len = 0;
	}
	return e.prototype.insert = function(e) {
		var t = new ar(e);
		return this.insertEntry(t), t;
	}, e.prototype.insertEntry = function(e) {
		this.head ? (this.tail.next = e, e.prev = this.tail, e.next = null, this.tail = e) : this.head = this.tail = e, this._len++;
	}, e.prototype.remove = function(e) {
		var t = e.prev, n = e.next;
		t ? t.next = n : this.head = n, n ? n.prev = t : this.tail = t, e.next = e.prev = null, this._len--;
	}, e.prototype.len = function() {
		return this._len;
	}, e.prototype.clear = function() {
		this.head = this.tail = null, this._len = 0;
	}, e;
}(), sr = function() {
	function e(e) {
		this._list = new or(), this._maxSize = 10, this._map = {}, this._maxSize = e;
	}
	return e.prototype.put = function(e, t) {
		var n = this._list, r = this._map, i = null;
		if (r[e] == null) {
			var a = n.len(), o = this._lastRemovedEntry;
			if (a >= this._maxSize && a > 0) {
				var s = n.head;
				n.remove(s), delete r[s.key], i = s.value, this._lastRemovedEntry = s;
			}
			o ? o.value = t : o = new ar(t), o.key = e, n.insertEntry(o), r[e] = o;
		}
		return i;
	}, e.prototype.get = function(e) {
		var t = this._map[e], n = this._list;
		if (t != null) return t !== n.tail && (n.remove(t), n.insertEntry(t)), t.value;
	}, e.prototype.clear = function() {
		this._list.clear(), this._map = {};
	}, e.prototype.len = function() {
		return this._list.len();
	}, e;
}(), cr = {
	transparent: [
		0,
		0,
		0,
		0
	],
	aliceblue: [
		240,
		248,
		255,
		1
	],
	antiquewhite: [
		250,
		235,
		215,
		1
	],
	aqua: [
		0,
		255,
		255,
		1
	],
	aquamarine: [
		127,
		255,
		212,
		1
	],
	azure: [
		240,
		255,
		255,
		1
	],
	beige: [
		245,
		245,
		220,
		1
	],
	bisque: [
		255,
		228,
		196,
		1
	],
	black: [
		0,
		0,
		0,
		1
	],
	blanchedalmond: [
		255,
		235,
		205,
		1
	],
	blue: [
		0,
		0,
		255,
		1
	],
	blueviolet: [
		138,
		43,
		226,
		1
	],
	brown: [
		165,
		42,
		42,
		1
	],
	burlywood: [
		222,
		184,
		135,
		1
	],
	cadetblue: [
		95,
		158,
		160,
		1
	],
	chartreuse: [
		127,
		255,
		0,
		1
	],
	chocolate: [
		210,
		105,
		30,
		1
	],
	coral: [
		255,
		127,
		80,
		1
	],
	cornflowerblue: [
		100,
		149,
		237,
		1
	],
	cornsilk: [
		255,
		248,
		220,
		1
	],
	crimson: [
		220,
		20,
		60,
		1
	],
	cyan: [
		0,
		255,
		255,
		1
	],
	darkblue: [
		0,
		0,
		139,
		1
	],
	darkcyan: [
		0,
		139,
		139,
		1
	],
	darkgoldenrod: [
		184,
		134,
		11,
		1
	],
	darkgray: [
		169,
		169,
		169,
		1
	],
	darkgreen: [
		0,
		100,
		0,
		1
	],
	darkgrey: [
		169,
		169,
		169,
		1
	],
	darkkhaki: [
		189,
		183,
		107,
		1
	],
	darkmagenta: [
		139,
		0,
		139,
		1
	],
	darkolivegreen: [
		85,
		107,
		47,
		1
	],
	darkorange: [
		255,
		140,
		0,
		1
	],
	darkorchid: [
		153,
		50,
		204,
		1
	],
	darkred: [
		139,
		0,
		0,
		1
	],
	darksalmon: [
		233,
		150,
		122,
		1
	],
	darkseagreen: [
		143,
		188,
		143,
		1
	],
	darkslateblue: [
		72,
		61,
		139,
		1
	],
	darkslategray: [
		47,
		79,
		79,
		1
	],
	darkslategrey: [
		47,
		79,
		79,
		1
	],
	darkturquoise: [
		0,
		206,
		209,
		1
	],
	darkviolet: [
		148,
		0,
		211,
		1
	],
	deeppink: [
		255,
		20,
		147,
		1
	],
	deepskyblue: [
		0,
		191,
		255,
		1
	],
	dimgray: [
		105,
		105,
		105,
		1
	],
	dimgrey: [
		105,
		105,
		105,
		1
	],
	dodgerblue: [
		30,
		144,
		255,
		1
	],
	firebrick: [
		178,
		34,
		34,
		1
	],
	floralwhite: [
		255,
		250,
		240,
		1
	],
	forestgreen: [
		34,
		139,
		34,
		1
	],
	fuchsia: [
		255,
		0,
		255,
		1
	],
	gainsboro: [
		220,
		220,
		220,
		1
	],
	ghostwhite: [
		248,
		248,
		255,
		1
	],
	gold: [
		255,
		215,
		0,
		1
	],
	goldenrod: [
		218,
		165,
		32,
		1
	],
	gray: [
		128,
		128,
		128,
		1
	],
	green: [
		0,
		128,
		0,
		1
	],
	greenyellow: [
		173,
		255,
		47,
		1
	],
	grey: [
		128,
		128,
		128,
		1
	],
	honeydew: [
		240,
		255,
		240,
		1
	],
	hotpink: [
		255,
		105,
		180,
		1
	],
	indianred: [
		205,
		92,
		92,
		1
	],
	indigo: [
		75,
		0,
		130,
		1
	],
	ivory: [
		255,
		255,
		240,
		1
	],
	khaki: [
		240,
		230,
		140,
		1
	],
	lavender: [
		230,
		230,
		250,
		1
	],
	lavenderblush: [
		255,
		240,
		245,
		1
	],
	lawngreen: [
		124,
		252,
		0,
		1
	],
	lemonchiffon: [
		255,
		250,
		205,
		1
	],
	lightblue: [
		173,
		216,
		230,
		1
	],
	lightcoral: [
		240,
		128,
		128,
		1
	],
	lightcyan: [
		224,
		255,
		255,
		1
	],
	lightgoldenrodyellow: [
		250,
		250,
		210,
		1
	],
	lightgray: [
		211,
		211,
		211,
		1
	],
	lightgreen: [
		144,
		238,
		144,
		1
	],
	lightgrey: [
		211,
		211,
		211,
		1
	],
	lightpink: [
		255,
		182,
		193,
		1
	],
	lightsalmon: [
		255,
		160,
		122,
		1
	],
	lightseagreen: [
		32,
		178,
		170,
		1
	],
	lightskyblue: [
		135,
		206,
		250,
		1
	],
	lightslategray: [
		119,
		136,
		153,
		1
	],
	lightslategrey: [
		119,
		136,
		153,
		1
	],
	lightsteelblue: [
		176,
		196,
		222,
		1
	],
	lightyellow: [
		255,
		255,
		224,
		1
	],
	lime: [
		0,
		255,
		0,
		1
	],
	limegreen: [
		50,
		205,
		50,
		1
	],
	linen: [
		250,
		240,
		230,
		1
	],
	magenta: [
		255,
		0,
		255,
		1
	],
	maroon: [
		128,
		0,
		0,
		1
	],
	mediumaquamarine: [
		102,
		205,
		170,
		1
	],
	mediumblue: [
		0,
		0,
		205,
		1
	],
	mediumorchid: [
		186,
		85,
		211,
		1
	],
	mediumpurple: [
		147,
		112,
		219,
		1
	],
	mediumseagreen: [
		60,
		179,
		113,
		1
	],
	mediumslateblue: [
		123,
		104,
		238,
		1
	],
	mediumspringgreen: [
		0,
		250,
		154,
		1
	],
	mediumturquoise: [
		72,
		209,
		204,
		1
	],
	mediumvioletred: [
		199,
		21,
		133,
		1
	],
	midnightblue: [
		25,
		25,
		112,
		1
	],
	mintcream: [
		245,
		255,
		250,
		1
	],
	mistyrose: [
		255,
		228,
		225,
		1
	],
	moccasin: [
		255,
		228,
		181,
		1
	],
	navajowhite: [
		255,
		222,
		173,
		1
	],
	navy: [
		0,
		0,
		128,
		1
	],
	oldlace: [
		253,
		245,
		230,
		1
	],
	olive: [
		128,
		128,
		0,
		1
	],
	olivedrab: [
		107,
		142,
		35,
		1
	],
	orange: [
		255,
		165,
		0,
		1
	],
	orangered: [
		255,
		69,
		0,
		1
	],
	orchid: [
		218,
		112,
		214,
		1
	],
	palegoldenrod: [
		238,
		232,
		170,
		1
	],
	palegreen: [
		152,
		251,
		152,
		1
	],
	paleturquoise: [
		175,
		238,
		238,
		1
	],
	palevioletred: [
		219,
		112,
		147,
		1
	],
	papayawhip: [
		255,
		239,
		213,
		1
	],
	peachpuff: [
		255,
		218,
		185,
		1
	],
	peru: [
		205,
		133,
		63,
		1
	],
	pink: [
		255,
		192,
		203,
		1
	],
	plum: [
		221,
		160,
		221,
		1
	],
	powderblue: [
		176,
		224,
		230,
		1
	],
	purple: [
		128,
		0,
		128,
		1
	],
	red: [
		255,
		0,
		0,
		1
	],
	rosybrown: [
		188,
		143,
		143,
		1
	],
	royalblue: [
		65,
		105,
		225,
		1
	],
	saddlebrown: [
		139,
		69,
		19,
		1
	],
	salmon: [
		250,
		128,
		114,
		1
	],
	sandybrown: [
		244,
		164,
		96,
		1
	],
	seagreen: [
		46,
		139,
		87,
		1
	],
	seashell: [
		255,
		245,
		238,
		1
	],
	sienna: [
		160,
		82,
		45,
		1
	],
	silver: [
		192,
		192,
		192,
		1
	],
	skyblue: [
		135,
		206,
		235,
		1
	],
	slateblue: [
		106,
		90,
		205,
		1
	],
	slategray: [
		112,
		128,
		144,
		1
	],
	slategrey: [
		112,
		128,
		144,
		1
	],
	snow: [
		255,
		250,
		250,
		1
	],
	springgreen: [
		0,
		255,
		127,
		1
	],
	steelblue: [
		70,
		130,
		180,
		1
	],
	tan: [
		210,
		180,
		140,
		1
	],
	teal: [
		0,
		128,
		128,
		1
	],
	thistle: [
		216,
		191,
		216,
		1
	],
	tomato: [
		255,
		99,
		71,
		1
	],
	turquoise: [
		64,
		224,
		208,
		1
	],
	violet: [
		238,
		130,
		238,
		1
	],
	wheat: [
		245,
		222,
		179,
		1
	],
	white: [
		255,
		255,
		255,
		1
	],
	whitesmoke: [
		245,
		245,
		245,
		1
	],
	yellow: [
		255,
		255,
		0,
		1
	],
	yellowgreen: [
		154,
		205,
		50,
		1
	]
};
function lr(e) {
	return e = Math.round(e), e < 0 ? 0 : e > 255 ? 255 : e;
}
function ur(e) {
	return e = Math.round(e), e < 0 ? 0 : e > 360 ? 360 : e;
}
function dr(e) {
	return e < 0 ? 0 : e > 1 ? 1 : e;
}
function fr(e) {
	var t = e;
	return t.length && t.charAt(t.length - 1) === "%" ? lr(parseFloat(t) / 100 * 255) : lr(parseInt(t, 10));
}
function pr(e) {
	var t = e;
	return t.length && t.charAt(t.length - 1) === "%" ? dr(parseFloat(t) / 100) : dr(parseFloat(t));
}
function mr(e, t, n) {
	return n < 0 ? n += 1 : n > 1 && --n, n * 6 < 1 ? e + (t - e) * n * 6 : n * 2 < 1 ? t : n * 3 < 2 ? e + (t - e) * (2 / 3 - n) * 6 : e;
}
function hr(e, t, n) {
	return e + (t - e) * n;
}
function gr(e, t, n, r, i) {
	return e[0] = t, e[1] = n, e[2] = r, e[3] = i, e;
}
function _r(e, t) {
	return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e;
}
var vr = new sr(20), yr = null;
function br(e, t) {
	yr && _r(yr, t), yr = vr.put(e, yr || t.slice());
}
function xr(e, t) {
	if (e) {
		t ||= [];
		var n = vr.get(e);
		if (n) return _r(t, n);
		e += "";
		var r = e.replace(/ /g, "").toLowerCase();
		if (r in cr) return _r(t, cr[r]), br(e, t), t;
		var i = r.length;
		if (r.charAt(0) === "#") {
			if (i === 4 || i === 5) {
				var a = parseInt(r.slice(1, 4), 16);
				if (!(a >= 0 && a <= 4095)) {
					gr(t, 0, 0, 0, 1);
					return;
				}
				return gr(t, (a & 3840) >> 4 | (a & 3840) >> 8, a & 240 | (a & 240) >> 4, a & 15 | (a & 15) << 4, i === 5 ? parseInt(r.slice(4), 16) / 15 : 1), br(e, t), t;
			}
			if (i === 7 || i === 9) {
				var a = parseInt(r.slice(1, 7), 16);
				if (!(a >= 0 && a <= 16777215)) {
					gr(t, 0, 0, 0, 1);
					return;
				}
				return gr(t, (a & 16711680) >> 16, (a & 65280) >> 8, a & 255, i === 9 ? parseInt(r.slice(7), 16) / 255 : 1), br(e, t), t;
			}
			return;
		}
		var o = r.indexOf("("), s = r.indexOf(")");
		if (o !== -1 && s + 1 === i) {
			var c = r.substr(0, o), l = r.substr(o + 1, s - (o + 1)).split(","), u = 1;
			switch (c) {
				case "rgba":
					if (l.length !== 4) return l.length === 3 ? gr(t, +l[0], +l[1], +l[2], 1) : gr(t, 0, 0, 0, 1);
					u = pr(l.pop());
				case "rgb":
					if (l.length >= 3) return gr(t, fr(l[0]), fr(l[1]), fr(l[2]), l.length === 3 ? u : pr(l[3])), br(e, t), t;
					gr(t, 0, 0, 0, 1);
					return;
				case "hsla":
					if (l.length !== 4) {
						gr(t, 0, 0, 0, 1);
						return;
					}
					return l[3] = pr(l[3]), Sr(l, t), br(e, t), t;
				case "hsl":
					if (l.length !== 3) {
						gr(t, 0, 0, 0, 1);
						return;
					}
					return Sr(l, t), br(e, t), t;
				default: return;
			}
		}
		gr(t, 0, 0, 0, 1);
	}
}
function Sr(e, t) {
	var n = (parseFloat(e[0]) % 360 + 360) % 360 / 360, r = pr(e[1]), i = pr(e[2]), a = i <= .5 ? i * (r + 1) : i + r - i * r, o = i * 2 - a;
	return t ||= [], gr(t, lr(mr(o, a, n + 1 / 3) * 255), lr(mr(o, a, n) * 255), lr(mr(o, a, n - 1 / 3) * 255), 1), e.length === 4 && (t[3] = e[3]), t;
}
function Cr(e) {
	if (e) {
		var t = e[0] / 255, n = e[1] / 255, r = e[2] / 255, i = Math.min(t, n, r), a = Math.max(t, n, r), o = a - i, s = (a + i) / 2, c, l;
		if (o === 0) c = 0, l = 0;
		else {
			l = s < .5 ? o / (a + i) : o / (2 - a - i);
			var u = ((a - t) / 6 + o / 2) / o, d = ((a - n) / 6 + o / 2) / o, f = ((a - r) / 6 + o / 2) / o;
			t === a ? c = f - d : n === a ? c = 1 / 3 + u - f : r === a && (c = 2 / 3 + d - u), c < 0 && (c += 1), c > 1 && --c;
		}
		var p = [
			c * 360,
			l,
			s
		];
		return e[3] != null && p.push(e[3]), p;
	}
}
function wr(e, t) {
	var n = xr(e);
	if (n) {
		for (var r = 0; r < 3; r++) t < 0 ? n[r] = n[r] * (1 - t) | 0 : n[r] = (255 - n[r]) * t + n[r] | 0, n[r] > 255 ? n[r] = 255 : n[r] < 0 && (n[r] = 0);
		return Or(n, n.length === 4 ? "rgba" : "rgb");
	}
}
function Tr(e, t, n) {
	if (t && t.length && e >= 0 && e <= 1) {
		var r = e * (t.length - 1), i = Math.floor(r), a = Math.ceil(r), o = xr(t[i]), s = xr(t[a]), c = r - i, l = Or([
			lr(hr(o[0], s[0], c)),
			lr(hr(o[1], s[1], c)),
			lr(hr(o[2], s[2], c)),
			dr(hr(o[3], s[3], c))
		], "rgba");
		return n ? {
			color: l,
			leftIndex: i,
			rightIndex: a,
			value: r
		} : l;
	}
}
function Er(e, t, n, r) {
	var i = xr(e);
	if (e) return i = Cr(i), t != null && (i[0] = ur(U(t) ? t(i[0]) : t)), n != null && (i[1] = pr(U(n) ? n(i[1]) : n)), r != null && (i[2] = pr(U(r) ? r(i[2]) : r)), Or(Sr(i), "rgba");
}
function Dr(e, t) {
	var n = xr(e);
	if (n && t != null) return n[3] = dr(t), Or(n, "rgba");
}
function Or(e, t) {
	if (e && e.length) {
		var n = e[0] + "," + e[1] + "," + e[2];
		return (t === "rgba" || t === "hsva" || t === "hsla") && (n += "," + e[3]), t + "(" + n + ")";
	}
}
function kr(e, t) {
	var n = xr(e);
	return n ? (.299 * n[0] + .587 * n[1] + .114 * n[2]) * n[3] / 255 + (1 - n[3]) * t : 0;
}
var Ar = new sr(100);
function jr(e) {
	if (W(e)) {
		var t = Ar.get(e);
		return t || (t = wr(e, -.1), Ar.put(e, t)), t;
	}
	if (de(e)) {
		var n = M({}, e);
		return n.colorStops = R(e.colorStops, function(e) {
			return {
				offset: e.offset,
				color: wr(e.color, -.1)
			};
		}), n;
	}
	return e;
}
//#endregion
//#region node_modules/zrender/lib/svg/helper.js
function Mr(e) {
	return e.type === "linear";
}
function Nr(e) {
	return e.type === "radial";
}
(function() {
	return typeof Buffer < "u" && typeof Buffer.from == "function" ? function(e) {
		return Buffer.from(e).toString("base64");
	} : typeof btoa == "function" && typeof unescape == "function" && typeof encodeURIComponent == "function" ? function(e) {
		return btoa(unescape(encodeURIComponent(e)));
	} : function(e) {
		return null;
	};
})();
//#endregion
//#region node_modules/zrender/lib/animation/Animator.js
var Pr = Array.prototype.slice;
function Fr(e, t, n) {
	return (t - e) * n + e;
}
function Ir(e, t, n, r) {
	for (var i = t.length, a = 0; a < i; a++) e[a] = Fr(t[a], n[a], r);
	return e;
}
function Lr(e, t, n, r) {
	for (var i = t.length, a = i && t[0].length, o = 0; o < i; o++) {
		e[o] || (e[o] = []);
		for (var s = 0; s < a; s++) e[o][s] = Fr(t[o][s], n[o][s], r);
	}
	return e;
}
function Rr(e, t, n, r) {
	for (var i = t.length, a = 0; a < i; a++) e[a] = t[a] + n[a] * r;
	return e;
}
function zr(e, t, n, r) {
	for (var i = t.length, a = i && t[0].length, o = 0; o < i; o++) {
		e[o] || (e[o] = []);
		for (var s = 0; s < a; s++) e[o][s] = t[o][s] + n[o][s] * r;
	}
	return e;
}
function Br(e, t) {
	for (var n = e.length, r = t.length, i = n > r ? t : e, a = Math.min(n, r), o = i[a - 1] || {
		color: [
			0,
			0,
			0,
			0
		],
		offset: 0
	}, s = a; s < Math.max(n, r); s++) i.push({
		offset: o.offset,
		color: o.color.slice()
	});
}
function Vr(e, t, n) {
	var r = e, i = t;
	if (r.push && i.push) {
		var a = r.length, o = i.length;
		if (a !== o) {
			if (a > o) r.length = o;
			else for (var s = a; s < o; s++) r.push(n === 1 ? i[s] : Pr.call(i[s]));
		}
		for (var c = r[0] && r[0].length, s = 0; s < r.length; s++) if (n === 1) isNaN(r[s]) && (r[s] = i[s]);
		else for (var l = 0; l < c; l++) isNaN(r[s][l]) && (r[s][l] = i[s][l]);
	}
}
function Hr(e) {
	if (I(e)) {
		var t = e.length;
		if (I(e[0])) {
			for (var n = [], r = 0; r < t; r++) n.push(Pr.call(e[r]));
			return n;
		}
		return Pr.call(e);
	}
	return e;
}
function Ur(e) {
	return e[0] = Math.floor(e[0]) || 0, e[1] = Math.floor(e[1]) || 0, e[2] = Math.floor(e[2]) || 0, e[3] = e[3] == null ? 1 : e[3], "rgba(" + e.join(",") + ")";
}
function Wr(e) {
	return I(e && e[0]) ? 2 : 1;
}
var Gr = 0, Kr = 1, qr = 2, Jr = 3, Yr = 4, Xr = 5, Zr = 6;
function Qr(e) {
	return e === Yr || e === Xr;
}
function $r(e) {
	return e === Kr || e === qr;
}
var ei = [
	0,
	0,
	0,
	0
], ti = function() {
	function e(e) {
		this.keyframes = [], this.discrete = !1, this._invalid = !1, this._needsSort = !1, this._lastFr = 0, this._lastFrP = 0, this.propName = e;
	}
	return e.prototype.isFinished = function() {
		return this._finished;
	}, e.prototype.setFinished = function() {
		this._finished = !0, this._additiveTrack && this._additiveTrack.setFinished();
	}, e.prototype.needsAnimate = function() {
		return this.keyframes.length >= 1;
	}, e.prototype.getAdditiveTrack = function() {
		return this._additiveTrack;
	}, e.prototype.addKeyframe = function(e, t, n) {
		this._needsSort = !0;
		var r = this.keyframes, i = r.length, a = !1, o = Zr, s = t;
		if (I(t)) {
			var c = Wr(t);
			o = c, (c === 1 && !se(t[0]) || c === 2 && !se(t[0][0])) && (a = !0);
		} else if (se(t) && !pe(t)) o = Gr;
		else if (W(t)) {
			if (!isNaN(+t)) o = Gr;
			else {
				var l = xr(t);
				l && (s = l, o = Jr);
			}
		} else if (de(t)) {
			var u = M({}, s);
			u.colorStops = R(t.colorStops, function(e) {
				return {
					offset: e.offset,
					color: xr(e.color)
				};
			}), Mr(t) ? o = Yr : Nr(t) && (o = Xr), s = u;
		}
		i === 0 ? this.valType = o : (o !== this.valType || o === Zr) && (a = !0), this.discrete = this.discrete || a;
		var d = {
			time: e,
			value: s,
			rawValue: t,
			percent: 0
		};
		return n && (d.easing = n, d.easingFunc = U(n) ? n : An[n] || rr(n)), r.push(d), d;
	}, e.prototype.prepare = function(e, t) {
		var n = this.keyframes;
		this._needsSort && n.sort(function(e, t) {
			return e.time - t.time;
		});
		for (var r = this.valType, i = n.length, a = n[i - 1], o = this.discrete, s = $r(r), c = Qr(r), l = 0; l < i; l++) {
			var u = n[l], d = u.value, f = a.value;
			u.percent = u.time / e, o || (s && l !== i - 1 ? Vr(d, f, r) : c && Br(d.colorStops, f.colorStops));
		}
		if (!o && r !== Xr && t && this.needsAnimate() && t.needsAnimate() && r === t.valType && !t._finished) {
			this._additiveTrack = t;
			for (var p = n[0].value, l = 0; l < i; l++) r === Gr ? n[l].additiveValue = n[l].value - p : r === Jr ? n[l].additiveValue = Rr([], n[l].value, p, -1) : $r(r) && (n[l].additiveValue = r === Kr ? Rr([], n[l].value, p, -1) : zr([], n[l].value, p, -1));
		}
	}, e.prototype.step = function(e, t) {
		if (!this._finished) {
			this._additiveTrack && this._additiveTrack._finished && (this._additiveTrack = null);
			var n = this._additiveTrack != null, r = n ? "additiveValue" : "value", i = this.valType, a = this.keyframes, o = a.length, s = this.propName, c = i === Jr, l, u = this._lastFr, d = Math.min, f, p;
			if (o === 1) f = p = a[0];
			else {
				if (t < 0) l = 0;
				else if (t < this._lastFrP) {
					for (l = d(u + 1, o - 1); l >= 0 && !(a[l].percent <= t); l--);
					l = d(l, o - 2);
				} else {
					for (l = u; l < o && !(a[l].percent > t); l++);
					l = d(l - 1, o - 2);
				}
				p = a[l + 1], f = a[l];
			}
			if (f && p) {
				this._lastFr = l, this._lastFrP = t;
				var m = p.percent - f.percent, h = m === 0 ? 1 : d((t - f.percent) / m, 1);
				p.easingFunc && (h = p.easingFunc(h));
				var g = n ? this._additiveValue : c ? ei : e[s];
				if (($r(i) || c) && !g && (g = this._additiveValue = []), this.discrete) e[s] = h < 1 ? f.rawValue : p.rawValue;
				else if ($r(i)) i === Kr ? Ir(g, f[r], p[r], h) : Lr(g, f[r], p[r], h);
				else if (Qr(i)) {
					var _ = f[r], v = p[r], y = i === Yr;
					e[s] = {
						type: y ? "linear" : "radial",
						x: Fr(_.x, v.x, h),
						y: Fr(_.y, v.y, h),
						colorStops: R(_.colorStops, function(e, t) {
							var n = v.colorStops[t];
							return {
								offset: Fr(e.offset, n.offset, h),
								color: Ur(Ir([], e.color, n.color, h))
							};
						}),
						global: v.global
					}, y ? (e[s].x2 = Fr(_.x2, v.x2, h), e[s].y2 = Fr(_.y2, v.y2, h)) : e[s].r = Fr(_.r, v.r, h);
				} else if (c) Ir(g, f[r], p[r], h), n || (e[s] = Ur(g));
				else {
					var b = Fr(f[r], p[r], h);
					n ? this._additiveValue = b : e[s] = b;
				}
				n && this._addToTarget(e);
			}
		}
	}, e.prototype._addToTarget = function(e) {
		var t = this.valType, n = this.propName, r = this._additiveValue;
		t === Gr ? e[n] = e[n] + r : t === Jr ? (xr(e[n], ei), Rr(ei, ei, r, 1), e[n] = Ur(ei)) : t === Kr ? Rr(e[n], e[n], r, 1) : t === qr && zr(e[n], e[n], r, 1);
	}, e;
}(), ni = function() {
	function e(e, t, n, r) {
		if (this._tracks = {}, this._trackKeys = [], this._maxTime = 0, this._started = 0, this._clip = null, this._target = e, this._loop = t, t && r) {
			O("Can' use additive animation on looped animation.");
			return;
		}
		this._additiveAnimators = r, this._allowDiscrete = n;
	}
	return e.prototype.getMaxTime = function() {
		return this._maxTime;
	}, e.prototype.getDelay = function() {
		return this._delay;
	}, e.prototype.getLoop = function() {
		return this._loop;
	}, e.prototype.getTarget = function() {
		return this._target;
	}, e.prototype.changeTarget = function(e) {
		this._target = e;
	}, e.prototype.when = function(e, t, n) {
		return this.whenWithKeys(e, t, z(t), n);
	}, e.prototype.whenWithKeys = function(e, t, n, r) {
		for (var i = this._tracks, a = 0; a < n.length; a++) {
			var o = n[a], s = i[o];
			if (!s) {
				s = i[o] = new ti(o);
				var c = void 0, l = this._getAdditiveTrack(o);
				if (l) {
					var u = l.keyframes, d = u[u.length - 1];
					c = d && d.value, l.valType === Jr && c && (c = Ur(c));
				} else c = this._target[o];
				if (c == null) continue;
				e > 0 && s.addKeyframe(0, Hr(c), r), this._trackKeys.push(o);
			}
			s.addKeyframe(e, Hr(t[o]), r);
		}
		return this._maxTime = Math.max(this._maxTime, e), this;
	}, e.prototype.pause = function() {
		this._clip.pause(), this._paused = !0;
	}, e.prototype.resume = function() {
		this._clip.resume(), this._paused = !1;
	}, e.prototype.isPaused = function() {
		return !!this._paused;
	}, e.prototype.duration = function(e) {
		return this._maxTime = e, this._force = !0, this;
	}, e.prototype._doneCallback = function() {
		this._setTracksFinished(), this._clip = null;
		var e = this._doneCbs;
		if (e) for (var t = e.length, n = 0; n < t; n++) e[n].call(this);
	}, e.prototype._abortedCallback = function() {
		this._setTracksFinished();
		var e = this.animation, t = this._abortedCbs;
		if (e && e.removeClip(this._clip), this._clip = null, t) for (var n = 0; n < t.length; n++) t[n].call(this);
	}, e.prototype._setTracksFinished = function() {
		for (var e = this._tracks, t = this._trackKeys, n = 0; n < t.length; n++) e[t[n]].setFinished();
	}, e.prototype._getAdditiveTrack = function(e) {
		var t, n = this._additiveAnimators;
		if (n) for (var r = 0; r < n.length; r++) {
			var i = n[r].getTrack(e);
			i && (t = i);
		}
		return t;
	}, e.prototype.start = function(e) {
		if (!(this._started > 0)) {
			this._started = 1;
			for (var t = this, n = [], r = this._maxTime || 0, i = 0; i < this._trackKeys.length; i++) {
				var a = this._trackKeys[i], o = this._tracks[a], s = this._getAdditiveTrack(a), c = o.keyframes, l = c.length;
				if (o.prepare(r, s), o.needsAnimate()) {
					if (!this._allowDiscrete && o.discrete) {
						var u = c[l - 1];
						u && (t._target[o.propName] = u.rawValue), o.setFinished();
					} else n.push(o);
				}
			}
			if (n.length || this._force) {
				var d = new ir({
					life: r,
					loop: this._loop,
					delay: this._delay || 0,
					onframe: function(e) {
						t._started = 2;
						var r = t._additiveAnimators;
						if (r) {
							for (var i = !1, a = 0; a < r.length; a++) if (r[a]._clip) {
								i = !0;
								break;
							}
							i || (t._additiveAnimators = null);
						}
						for (var a = 0; a < n.length; a++) n[a].step(t._target, e);
						var o = t._onframeCbs;
						if (o) for (var a = 0; a < o.length; a++) o[a](t._target, e);
					},
					ondestroy: function() {
						t._doneCallback();
					}
				});
				this._clip = d, this.animation && this.animation.addClip(d), e && d.setEasing(e);
			} else this._doneCallback();
			return this;
		}
	}, e.prototype.stop = function(e) {
		if (this._clip) {
			var t = this._clip;
			e && t.onframe(1), this._abortedCallback();
		}
	}, e.prototype.delay = function(e) {
		return this._delay = e, this;
	}, e.prototype.during = function(e) {
		return e && (this._onframeCbs ||= [], this._onframeCbs.push(e)), this;
	}, e.prototype.done = function(e) {
		return e && (this._doneCbs ||= [], this._doneCbs.push(e)), this;
	}, e.prototype.aborted = function(e) {
		return e && (this._abortedCbs ||= [], this._abortedCbs.push(e)), this;
	}, e.prototype.getClip = function() {
		return this._clip;
	}, e.prototype.getTrack = function(e) {
		return this._tracks[e];
	}, e.prototype.getTracks = function() {
		var e = this;
		return R(this._trackKeys, function(t) {
			return e._tracks[t];
		});
	}, e.prototype.stopTracks = function(e, t) {
		if (!e.length || !this._clip) return !0;
		for (var n = this._tracks, r = this._trackKeys, i = 0; i < e.length; i++) {
			var a = n[e[i]];
			a && !a.isFinished() && (t ? a.step(this._target, 1) : this._started === 1 && a.step(this._target, 0), a.setFinished());
		}
		for (var o = !0, i = 0; i < r.length; i++) if (!n[r[i]].isFinished()) {
			o = !1;
			break;
		}
		return o && this._abortedCallback(), o;
	}, e.prototype.saveTo = function(e, t, n) {
		if (e) {
			t ||= this._trackKeys;
			for (var r = 0; r < t.length; r++) {
				var i = t[r], a = this._tracks[i];
				if (a && !a.isFinished()) {
					var o = a.keyframes, s = o[n ? 0 : o.length - 1];
					s && (e[i] = Hr(s.rawValue));
				}
			}
		}
	}, e.prototype.__changeFinalValue = function(e, t) {
		t ||= z(e);
		for (var n = 0; n < t.length; n++) {
			var r = t[n], i = this._tracks[r];
			if (i) {
				var a = i.keyframes;
				if (a.length > 1) {
					var o = a.pop();
					i.addKeyframe(o.time, e[r]), i.prepare(this._maxTime, i.getAdditiveTrack());
				}
			}
		}
	}, e;
}();
//#endregion
//#region node_modules/zrender/lib/animation/Animation.js
function ri() {
	return (/* @__PURE__ */ new Date()).getTime();
}
var ii = function(e) {
	r(t, e);
	function t(t) {
		var n = e.call(this) || this;
		return n._running = !1, n._time = 0, n._pausedTime = 0, n._pauseStart = 0, n._paused = !1, t ||= {}, n.stage = t.stage || {}, n;
	}
	return t.prototype.addClip = function(e) {
		e.animation && this.removeClip(e), this._head ? (this._tail.next = e, e.prev = this._tail, e.next = null, this._tail = e) : this._head = this._tail = e, e.animation = this;
	}, t.prototype.addAnimator = function(e) {
		e.animation = this;
		var t = e.getClip();
		t && this.addClip(t);
	}, t.prototype.removeClip = function(e) {
		if (e.animation) {
			var t = e.prev, n = e.next;
			t ? t.next = n : this._head = n, n ? n.prev = t : this._tail = t, e.next = e.prev = e.animation = null;
		}
	}, t.prototype.removeAnimator = function(e) {
		var t = e.getClip();
		t && this.removeClip(t), e.animation = null;
	}, t.prototype.update = function(e) {
		for (var t = ri() - this._pausedTime, n = t - this._time, r = this._head; r;) {
			var i = r.next;
			r.step(t, n) ? (r.ondestroy(), this.removeClip(r), r = i) : r = i;
		}
		this._time = t, e || (this.trigger("frame", n), this.stage.update && this.stage.update());
	}, t.prototype._startLoop = function() {
		var e = this;
		this._running = !0;
		function t() {
			e._running && (kn(t), !e._paused && e.update());
		}
		kn(t);
	}, t.prototype.start = function() {
		this._running || (this._time = ri(), this._pausedTime = 0, this._startLoop());
	}, t.prototype.stop = function() {
		this._running = !1;
	}, t.prototype.pause = function() {
		this._paused ||= (this._pauseStart = ri(), !0);
	}, t.prototype.resume = function() {
		this._paused &&= (this._pausedTime += ri() - this._pauseStart, !1);
	}, t.prototype.clear = function() {
		for (var e = this._head; e;) {
			var t = e.next;
			e.prev = e.next = e.animation = null, e = t;
		}
		this._head = this._tail = null;
	}, t.prototype.isFinished = function() {
		return this._head == null;
	}, t.prototype.animate = function(e, t) {
		t ||= {}, this.start();
		var n = new ni(e, t.loop);
		return this.addAnimator(n), n;
	}, t;
}(Ze), ai = 300, oi = a.domSupported, si = (function() {
	var e = [
		"click",
		"dblclick",
		"mousewheel",
		"wheel",
		"mouseout",
		"mouseup",
		"mousedown",
		"mousemove",
		"contextmenu"
	], t = [
		"touchstart",
		"touchend",
		"touchmove"
	], n = {
		pointerdown: 1,
		pointerup: 1,
		pointermove: 1,
		pointerout: 1
	};
	return {
		mouse: e,
		touch: t,
		pointer: R(e, function(e) {
			var t = e.replace("mouse", "pointer");
			return n.hasOwnProperty(t) ? t : e;
		})
	};
})(), ci = {
	mouse: ["mousemove", "mouseup"],
	pointer: ["pointermove", "pointerup"]
}, li = !1;
function ui(e) {
	var t = e.pointerType;
	return t === "pen" || t === "touch";
}
function di(e) {
	e.touching = !0, e.touchTimer != null && (clearTimeout(e.touchTimer), e.touchTimer = null), e.touchTimer = setTimeout(function() {
		e.touching = !1, e.touchTimer = null;
	}, 700);
}
function fi(e) {
	e && (e.zrByTouch = !0);
}
function pi(e, t) {
	return vt(e.dom, new hi(e, t), !0);
}
function mi(e, t) {
	for (var n = t, r = !1; n && n.nodeType !== 9 && !(r = n.domBelongToZr || n !== t && n === e.painterRoot);) n = n.parentNode;
	return r;
}
var hi = function() {
	function e(e, t) {
		this.stopPropagation = je, this.stopImmediatePropagation = je, this.preventDefault = je, this.type = t.type, this.target = this.currentTarget = e.dom, this.pointerType = t.pointerType, this.clientX = t.clientX, this.clientY = t.clientY;
	}
	return e;
}(), gi = {
	mousedown: function(e) {
		e = vt(this.dom, e), this.__mayPointerCapture = [e.zrX, e.zrY], this.trigger("mousedown", e);
	},
	mousemove: function(e) {
		e = vt(this.dom, e);
		var t = this.__mayPointerCapture;
		t && (e.zrX !== t[0] || e.zrY !== t[1]) && this.__togglePointerCapture(!0), this.trigger("mousemove", e);
	},
	mouseup: function(e) {
		e = vt(this.dom, e), this.__togglePointerCapture(!1), this.trigger("mouseup", e);
	},
	mouseout: function(e) {
		e = vt(this.dom, e);
		var t = e.toElement || e.relatedTarget;
		mi(this, t) || (this.__pointerCapturing && (e.zrEventControl = "no_globalout"), this.trigger("mouseout", e));
	},
	wheel: function(e) {
		li = !0, e = vt(this.dom, e), this.trigger("mousewheel", e);
	},
	mousewheel: function(e) {
		li || (e = vt(this.dom, e), this.trigger("mousewheel", e));
	},
	touchstart: function(e) {
		e = vt(this.dom, e), fi(e), this.__lastTouchMoment = /* @__PURE__ */ new Date(), this.handler.processGesture(e, "start"), gi.mousemove.call(this, e), gi.mousedown.call(this, e);
	},
	touchmove: function(e) {
		e = vt(this.dom, e), fi(e), this.handler.processGesture(e, "change"), gi.mousemove.call(this, e);
	},
	touchend: function(e) {
		e = vt(this.dom, e), fi(e), this.handler.processGesture(e, "end"), gi.mouseup.call(this, e), +/* @__PURE__ */ new Date() - this.__lastTouchMoment < ai && gi.click.call(this, e);
	},
	pointerdown: function(e) {
		gi.mousedown.call(this, e);
	},
	pointermove: function(e) {
		ui(e) || gi.mousemove.call(this, e);
	},
	pointerup: function(e) {
		gi.mouseup.call(this, e);
	},
	pointerout: function(e) {
		ui(e) || gi.mouseout.call(this, e);
	}
};
L([
	"click",
	"dblclick",
	"contextmenu"
], function(e) {
	gi[e] = function(t) {
		t = vt(this.dom, t), this.trigger(e, t);
	};
});
var _i = {
	pointermove: function(e) {
		ui(e) || _i.mousemove.call(this, e);
	},
	pointerup: function(e) {
		_i.mouseup.call(this, e);
	},
	mousemove: function(e) {
		this.trigger("mousemove", e);
	},
	mouseup: function(e) {
		var t = this.__pointerCapturing;
		this.__togglePointerCapture(!1), this.trigger("mouseup", e), t && (e.zrEventControl = "only_globalout", this.trigger("mouseout", e));
	}
};
function vi(e, t) {
	var n = t.domHandlers;
	a.pointerEventsSupported ? L(si.pointer, function(r) {
		bi(t, r, function(t) {
			n[r].call(e, t);
		});
	}) : (a.touchEventsSupported && L(si.touch, function(r) {
		bi(t, r, function(i) {
			n[r].call(e, i), di(t);
		});
	}), L(si.mouse, function(r) {
		bi(t, r, function(i) {
			i = _t(i), t.touching || n[r].call(e, i);
		});
	}));
}
function yi(e, t) {
	a.pointerEventsSupported ? L(ci.pointer, n) : a.touchEventsSupported || L(ci.mouse, n);
	function n(n) {
		function r(r) {
			r = _t(r), mi(e, r.target) || (r = pi(e, r), t.domHandlers[n].call(e, r));
		}
		bi(t, n, r, { capture: !0 });
	}
}
function bi(e, t, n, r) {
	e.mounted[t] = n, e.listenerOpts[t] = r, bt(e.domTarget, t, n, r);
}
function xi(e) {
	var t = e.mounted;
	for (var n in t) t.hasOwnProperty(n) && xt(e.domTarget, n, t[n], e.listenerOpts[n]);
	e.mounted = {};
}
var Si = function() {
	function e(e, t) {
		this.mounted = {}, this.listenerOpts = {}, this.touching = !1, this.domTarget = e, this.domHandlers = t;
	}
	return e;
}(), Ci = function(e) {
	r(t, e);
	function t(t, n) {
		var r = e.call(this) || this;
		return r.__pointerCapturing = !1, r.dom = t, r.painterRoot = n, r._localHandlerScope = new Si(t, gi), oi && (r._globalHandlerScope = new Si(document, _i)), vi(r, r._localHandlerScope), r;
	}
	return t.prototype.dispose = function() {
		xi(this._localHandlerScope), oi && xi(this._globalHandlerScope);
	}, t.prototype.setCursor = function(e) {
		this.dom.style && (this.dom.style.cursor = e || "default");
	}, t.prototype.__togglePointerCapture = function(e) {
		if (this.__mayPointerCapture = null, oi && +this.__pointerCapturing ^ e) {
			this.__pointerCapturing = e;
			var t = this._globalHandlerScope;
			e ? yi(this, t) : xi(t);
		}
	}, t;
}(Ze), wi = 1;
a.hasGlobalWindow && (wi = Math.max(window.devicePixelRatio || window.screen && window.screen.deviceXDPI / window.screen.logicalXDPI || 1, 1));
var Ti = wi, Ei = .4, Di = "#333", Oi = "#ccc", ki = "#eee", Ai = Ot, ji = 5e-5;
function Mi(e) {
	return e > ji || e < -ji;
}
var Ni = [], Pi = [], Fi = Dt(), Ii = Math.abs, Li = function() {
	function e() {}
	return e.prototype.getLocalTransform = function(e) {
		return Ri(this, e);
	}, e.prototype.setPosition = function(e) {
		this.x = e[0], this.y = e[1];
	}, e.prototype.setScale = function(e) {
		this.scaleX = e[0], this.scaleY = e[1];
	}, e.prototype.setSkew = function(e) {
		this.skewX = e[0], this.skewY = e[1];
	}, e.prototype.setOrigin = function(e) {
		this.originX = e[0], this.originY = e[1];
	}, e.prototype.needLocalTransform = function() {
		return Mi(this.rotation) || Mi(this.x) || Mi(this.y) || Mi(this.scaleX - 1) || Mi(this.scaleY - 1) || Mi(this.skewX) || Mi(this.skewY);
	}, e.prototype.updateTransform = function() {
		var e = this.parent && this.parent.transform, t = this.needLocalTransform(), n = this.transform;
		if (!(t || e)) {
			n && (Ai(n), this.invTransform = null);
			return;
		}
		n ||= Dt(), t ? this.getLocalTransform(n) : Ai(n), e && (t ? At(n, e, n) : kt(n, e)), this.transform = n, this._resolveGlobalScaleRatio(n), this.invTransform = this.invTransform || Dt(), Pt(this.invTransform, n);
	}, e.prototype._resolveGlobalScaleRatio = function(e) {
		var t = this.globalScaleRatio;
		if (t != null && t !== 1) {
			this.getGlobalScale(Ni);
			var n = Ni[0] < 0 ? -1 : 1, r = Ni[1] < 0 ? -1 : 1, i = ((Ni[0] - n) * t + n) / Ni[0] || 0, a = ((Ni[1] - r) * t + r) / Ni[1] || 0;
			e[0] *= i, e[1] *= i, e[2] *= a, e[3] *= a;
		}
	}, e.prototype.getComputedTransform = function() {
		for (var e = this, t = []; e;) t.push(e), e = e.parent;
		for (; e = t.pop();) e.updateTransform();
		return this.transform;
	}, e.prototype.setLocalTransform = function(e) {
		if (e) {
			var t = e[0] * e[0] + e[1] * e[1], n = e[2] * e[2] + e[3] * e[3], r = Math.atan2(e[1], e[0]), i = Math.PI / 2 + r - Math.atan2(e[3], e[2]);
			n = Math.sqrt(n) * Math.cos(i), t = Math.sqrt(t), this.skewX = i, this.skewY = 0, this.rotation = -r, this.x = +e[4], this.y = +e[5], this.scaleX = t, this.scaleY = n, this.originX = 0, this.originY = 0;
		}
	}, e.prototype.decomposeTransform = function() {
		if (this.transform) {
			var e = this.parent, t = this.transform;
			e && e.transform && (e.invTransform = e.invTransform || Dt(), At(Pi, e.invTransform, t), t = Pi);
			var n = this.originX, r = this.originY;
			(n || r) && (Fi[4] = n, Fi[5] = r, At(Pi, t, Fi), Pi[4] -= n, Pi[5] -= r, t = Pi), this.setLocalTransform(t);
		}
	}, e.prototype.getGlobalScale = function(e) {
		var t = this.transform;
		return e ||= [], t ? (e[0] = Math.sqrt(t[0] * t[0] + t[1] * t[1]), e[1] = Math.sqrt(t[2] * t[2] + t[3] * t[3]), t[0] < 0 && (e[0] = -e[0]), t[3] < 0 && (e[1] = -e[1]), e) : (e[0] = 1, e[1] = 1, e);
	}, e.prototype.transformCoordToLocal = function(e, t) {
		var n = [e, t], r = this.invTransform;
		return r && Ke(n, n, r), n;
	}, e.prototype.transformCoordToGlobal = function(e, t) {
		var n = [e, t], r = this.transform;
		return r && Ke(n, n, r), n;
	}, e.prototype.getLineScale = function() {
		var e = this.transform;
		return e && Ii(e[0] - 1) > 1e-10 && Ii(e[3] - 1) > 1e-10 ? Math.sqrt(Ii(e[0] * e[3] - e[2] * e[1])) : 1;
	}, e.prototype.copyTransform = function(e) {
		Bi(this, e);
	}, e.getLocalTransform = function(e, t) {
		t ||= [];
		var n = e.originX || 0, r = e.originY || 0, i = e.scaleX, a = e.scaleY, o = e.anchorX, s = e.anchorY, c = e.rotation || 0, l = e.x, u = e.y, d = e.skewX ? Math.tan(e.skewX) : 0, f = e.skewY ? Math.tan(-e.skewY) : 0;
		if (n || r || o || s) {
			var p = n + o, m = r + s;
			t[4] = -p * i - d * m * a, t[5] = -m * a - f * p * i;
		} else t[4] = t[5] = 0;
		return t[0] = i, t[3] = a, t[1] = f * i, t[2] = d * a, c && Mt(t, t, c), t[4] += n + l, t[5] += r + u, t;
	}, e.initDefaultProps = (function() {
		var t = e.prototype;
		t.scaleX = t.scaleY = t.globalScaleRatio = 1, t.x = t.y = t.originX = t.originY = t.skewX = t.skewY = t.rotation = t.anchorX = t.anchorY = 0;
	})(), e;
}(), Ri = Li.getLocalTransform, zi = [
	"x",
	"y",
	"originX",
	"originY",
	"anchorX",
	"anchorY",
	"rotation",
	"scaleX",
	"scaleY",
	"skewX",
	"skewY"
];
function Bi(e, t) {
	return ee(e, t, zi);
}
//#endregion
//#region node_modules/zrender/lib/contain/text.js
function Vi(e) {
	Hi ||= new sr(100), e ||= "12px sans-serif";
	var t = Hi.get(e);
	return t || (t = {
		font: e,
		strWidthCache: new sr(500),
		asciiWidthMap: null,
		asciiWidthMapTried: !1,
		stWideCharWidth: p.measureText("国", e).width,
		asciiCharWidth: p.measureText("a", e).width
	}, Hi.put(e, t)), t;
}
var Hi;
function Ui(e) {
	if (!(Wi >= Gi)) {
		e ||= "12px sans-serif";
		for (var t = [], n = +/* @__PURE__ */ new Date(), r = 0; r <= 127; r++) t[r] = p.measureText(String.fromCharCode(r), e).width;
		var i = +/* @__PURE__ */ new Date() - n;
		return i > 16 ? Wi = Gi : i > 2 && Wi++, t;
	}
}
var Wi = 0, Gi = 5;
function Ki(e, t) {
	return e.asciiWidthMapTried ||= (e.asciiWidthMap = Ui(e.font), !0), 0 <= t && t <= 127 ? e.asciiWidthMap == null ? e.asciiCharWidth : e.asciiWidthMap[t] : e.stWideCharWidth;
}
function qi(e, t) {
	var n = e.strWidthCache, r = n.get(t);
	return r ?? (r = p.measureText(t, e.font).width, n.put(t, r)), r;
}
function Ji(e, t, n, r) {
	var i = qi(Vi(t), e), a = Qi(t);
	return new J(Xi(0, i, n), Zi(0, a, r), i, a);
}
function Yi(e, t, n, r) {
	var i = ((e || "") + "").split("\n");
	if (i.length === 1) return Ji(i[0], t, n, r);
	for (var a = new J(0, 0, 0, 0), o = 0; o < i.length; o++) {
		var s = Ji(i[o], t, n, r);
		o === 0 ? a.copy(s) : a.union(s);
	}
	return a;
}
function Xi(e, t, n, r) {
	return n === "right" ? r ? e += t : e -= t : n === "center" && (r ? e += t / 2 : e -= t / 2), e;
}
function Zi(e, t, n, r) {
	return n === "middle" ? r ? e += t / 2 : e -= t / 2 : n === "bottom" && (r ? e += t : e -= t), e;
}
function Qi(e) {
	return Vi(e).stWideCharWidth;
}
function $i(e, t) {
	return typeof e == "string" ? e.lastIndexOf("%") >= 0 ? parseFloat(e) / 100 * t : parseFloat(e) : e;
}
function ea(e, t, n) {
	var r = t.position || "inside", i = t.distance == null ? 5 : t.distance, a = n.height, o = n.width, s = a / 2, c = n.x, l = n.y, u = "left", d = "top";
	if (r instanceof Array) c += $i(r[0], n.width), l += $i(r[1], n.height), u = null, d = null;
	else switch (r) {
		case "left":
			c -= i, l += s, u = "right", d = "middle";
			break;
		case "right":
			c += i + o, l += s, d = "middle";
			break;
		case "top":
			c += o / 2, l -= i, u = "center", d = "bottom";
			break;
		case "bottom":
			c += o / 2, l += a + i, u = "center";
			break;
		case "inside":
			c += o / 2, l += s, u = "center", d = "middle";
			break;
		case "insideLeft":
			c += i, l += s, d = "middle";
			break;
		case "insideRight":
			c += o - i, l += s, u = "right", d = "middle";
			break;
		case "insideTop":
			c += o / 2, l += i, u = "center";
			break;
		case "insideBottom":
			c += o / 2, l += a - i, u = "center", d = "bottom";
			break;
		case "insideTopLeft":
			c += i, l += i;
			break;
		case "insideTopRight":
			c += o - i, l += i, u = "right";
			break;
		case "insideBottomLeft":
			c += i, l += a - i, d = "bottom";
			break;
		case "insideBottomRight": c += o - i, l += a - i, u = "right", d = "bottom";
	}
	return e ||= {}, e.x = c, e.y = l, e.align = u, e.verticalAlign = d, e;
}
//#endregion
//#region node_modules/zrender/lib/Element.js
var ta = "__zr_normal__", na = zi.concat(["ignore"]), ra = ne(zi, function(e, t) {
	return e[t] = !0, e;
}, { ignore: !1 }), ia = {}, aa = new J(0, 0, 0, 0), oa = [], sa = function() {
	function e(e) {
		this.id = D(), this.animators = [], this.currentStates = [], this.states = {}, this._init(e);
	}
	return e.prototype._init = function(e) {
		this.attr(e);
	}, e.prototype.drift = function(e, t, n) {
		switch (this.draggable) {
			case "horizontal":
				t = 0;
				break;
			case "vertical": e = 0;
		}
		var r = this.transform;
		r ||= this.transform = [
			1,
			0,
			0,
			1,
			0,
			0
		], r[4] += e, r[5] += t, this.decomposeTransform(), this.markRedraw();
	}, e.prototype.beforeUpdate = function() {}, e.prototype.afterUpdate = function() {}, e.prototype.update = function() {
		this.updateTransform(), this.__dirty && this.updateInnerText();
	}, e.prototype.updateInnerText = function(e) {
		var t = this._textContent;
		if (t && (!t.ignore || e)) {
			this.textConfig ||= {};
			var n = this.textConfig, r = n.local, i = t.innerTransformable, a = void 0, o = void 0, s = !1;
			i.parent = r ? this : null;
			var c = !1;
			i.copyTransform(t);
			var l = n.position != null, u = n.autoOverflowArea, d = void 0;
			if ((u || l) && (d = aa, n.layoutRect ? d.copy(n.layoutRect) : d.copy(this.getBoundingRect()), r || d.applyTransform(this.transform)), l) {
				this.calculateTextPosition ? this.calculateTextPosition(ia, n, d) : ea(ia, n, d), i.x = ia.x, i.y = ia.y, a = ia.align, o = ia.verticalAlign;
				var f = n.origin;
				if (f && n.rotation != null) {
					var p = void 0, m = void 0;
					f === "center" ? (p = d.width * .5, m = d.height * .5) : (p = $i(f[0], d.width), m = $i(f[1], d.height)), c = !0, i.originX = -i.x + p + (r ? 0 : d.x), i.originY = -i.y + m + (r ? 0 : d.y);
				}
			}
			n.rotation != null && (i.rotation = n.rotation);
			var h = n.offset;
			h && (i.x += h[0], i.y += h[1], c || (i.originX = -h[0], i.originY = -h[1]));
			var g = this._innerTextDefaultStyle ||= {};
			if (u) {
				var _ = g.overflowRect = g.overflowRect || new J(0, 0, 0, 0);
				i.getLocalTransform(oa), Pt(oa, oa), J.copy(_, d), _.applyTransform(oa);
			} else g.overflowRect = null;
			var v = n.inside == null ? typeof n.position == "string" && n.position.indexOf("inside") >= 0 : n.inside, y = void 0, b = void 0, x = void 0;
			v && this.canBeInsideText() ? (y = n.insideFill, b = n.insideStroke, (y == null || y === "auto") && (y = this.getInsideTextFill()), (b == null || b === "auto") && (b = this.getInsideTextStroke(y), x = !0)) : (y = n.outsideFill, b = n.outsideStroke, (y == null || y === "auto") && (y = this.getOutsideFill()), (b == null || b === "auto") && (b = this.getOutsideStroke(y), x = !0)), y ||= "#000", (y !== g.fill || b !== g.stroke || x !== g.autoStroke || a !== g.align || o !== g.verticalAlign) && (s = !0, g.fill = y, g.stroke = b, g.autoStroke = x, g.align = a, g.verticalAlign = o, t.setDefaultTextStyle(g)), t.__dirty |= 1, s && t.dirtyStyle(!0);
		}
	}, e.prototype.canBeInsideText = function() {
		return !0;
	}, e.prototype.getInsideTextFill = function() {
		return "#fff";
	}, e.prototype.getInsideTextStroke = function(e) {
		return "#000";
	}, e.prototype.getOutsideFill = function() {
		return this.__zr && this.__zr.isDarkMode() ? Oi : Di;
	}, e.prototype.getOutsideStroke = function(e) {
		var t = this.__zr && this.__zr.getBackgroundColor(), n = typeof t == "string" && xr(t);
		n ||= [
			255,
			255,
			255,
			1
		];
		for (var r = n[3], i = this.__zr.isDarkMode(), a = 0; a < 3; a++) n[a] = n[a] * r + (i ? 0 : 255) * (1 - r);
		return n[3] = 1, Or(n, "rgba");
	}, e.prototype.traverse = function(e, t) {}, e.prototype.attrKV = function(e, t) {
		e === "textConfig" ? this.setTextConfig(t) : e === "textContent" ? this.setTextContent(t) : e === "clipPath" ? this.setClipPath(t) : e === "extra" ? (this.extra = this.extra || {}, M(this.extra, t)) : this[e] = t;
	}, e.prototype.hide = function() {
		this.ignore = !0, this.markRedraw();
	}, e.prototype.show = function() {
		this.ignore = !1, this.markRedraw();
	}, e.prototype.attr = function(e, t) {
		if (typeof e == "string") this.attrKV(e, t);
		else if (G(e)) for (var n = z(e), r = 0; r < n.length; r++) {
			var i = n[r];
			this.attrKV(i, e[i]);
		}
		return this.markRedraw(), this;
	}, e.prototype.saveCurrentToNormalState = function(e) {
		this._innerSaveToNormal(e);
		for (var t = this._normalState, n = 0; n < this.animators.length; n++) {
			var r = this.animators[n], i = r.__fromStateTransition;
			if (!(r.getLoop() || i && i !== "__zr_normal__")) {
				var a = r.targetName, o = a ? t[a] : t;
				r.saveTo(o);
			}
		}
	}, e.prototype._innerSaveToNormal = function(e) {
		var t = this._normalState;
		t ||= this._normalState = {}, e.textConfig && !t.textConfig && (t.textConfig = this.textConfig), this._savePrimaryToNormal(e, t, na);
	}, e.prototype._savePrimaryToNormal = function(e, t, n) {
		for (var r = 0; r < n.length; r++) {
			var i = n[r];
			e[i] != null && !(i in t) && (t[i] = this[i]);
		}
	}, e.prototype.hasState = function() {
		return this.currentStates.length > 0;
	}, e.prototype.getState = function(e) {
		return this.states[e];
	}, e.prototype.ensureState = function(e) {
		var t = this.states;
		return t[e] || (t[e] = {}), t[e];
	}, e.prototype.clearStates = function(e) {
		this.useState(ta, !1, e);
	}, e.prototype.useState = function(e, t, n, r) {
		var i = e === ta;
		if (this.hasState() || !i) {
			var a = this.currentStates, o = this.stateTransition;
			if (!(P(a, e) >= 0 && (t || a.length === 1))) {
				var s;
				if (this.stateProxy && !i && (s = this.stateProxy(e)), s ||= this.states && this.states[e], !s && !i) {
					O("State " + e + " not exists.");
					return;
				}
				i || this.saveCurrentToNormalState(s);
				var c = this._textContent, l = ha(this, c, s, r);
				l && !this.__inHover && (this.__inHover = l), this._applyStateObj(e, s, this._normalState, t, _a(this, n, o), o);
				var u = this._textGuide;
				return c && c.useState(e, t, n, !!l), u && u.useState(e, t, n, !!l), i ? (this.currentStates = [], this._normalState = {}) : t ? this.currentStates.push(e) : this.currentStates = [e], this._updateAnimationTargets(), this.markRedraw(), !l && this.__inHover && (this.__inHover = 0, this.__dirty &= -2), s;
			}
		}
	}, e.prototype.useStates = function(e, t, n) {
		if (!e.length) this.clearStates();
		else {
			var r = [], i = this.currentStates, a = e.length, o = a === i.length;
			if (o) {
				for (var s = 0; s < a; s++) if (e[s] !== i[s]) {
					o = !1;
					break;
				}
			}
			if (o) return;
			for (var s = 0; s < a; s++) {
				var c = e[s], l = void 0;
				this.stateProxy && (l = this.stateProxy(c, e)), l ||= this.states[c], l && r.push(l);
			}
			var u = r[a - 1], d = this._textContent, f = ha(this, d, u, n);
			f && !this.__inHover && (this.__inHover = f);
			var p = this._mergeStates(r), m = this.stateTransition;
			this.saveCurrentToNormalState(p), this._applyStateObj(e.join(","), p, this._normalState, !1, _a(this, t, m), m);
			var h = this._textGuide;
			d && d.useStates(e, t, !!f), h && h.useStates(e, t, !!f), this._updateAnimationTargets(), this.currentStates = e.slice(), this.markRedraw(), !f && this.__inHover && (this.__inHover = 0, this.__dirty &= -2);
		}
	}, e.prototype.isSilent = function() {
		for (var e = this; e;) {
			if (e.silent) return !0;
			var t = e.__hostTarget;
			e = t ? e.ignoreHostSilent ? null : t : e.parent;
		}
		return !1;
	}, e.prototype._updateAnimationTargets = function() {
		for (var e = 0; e < this.animators.length; e++) {
			var t = this.animators[e];
			t.targetName && t.changeTarget(this[t.targetName]);
		}
	}, e.prototype.removeState = function(e) {
		var t = P(this.currentStates, e);
		if (t >= 0) {
			var n = this.currentStates.slice();
			n.splice(t, 1), this.useStates(n);
		}
	}, e.prototype.replaceState = function(e, t, n) {
		var r = this.currentStates.slice(), i = P(r, e), a = P(r, t) >= 0;
		i >= 0 ? a ? r.splice(i, 1) : r[i] = t : n && !a && r.push(t), this.useStates(r);
	}, e.prototype.toggleState = function(e, t) {
		t ? this.useState(e, !0) : this.removeState(e);
	}, e.prototype._mergeStates = function(e) {
		for (var t = {}, n, r = 0; r < e.length; r++) {
			var i = e[r];
			M(t, i), i.textConfig && (n ||= {}, M(n, i.textConfig));
		}
		return n && (t.textConfig = n), t;
	}, e.prototype._applyStateObj = function(e, t, n, r, i, a) {
		if (this.__inHover !== 1) {
			var o = !(t && r);
			t && t.textConfig ? (this.textConfig = M({}, r ? this.textConfig : n.textConfig), M(this.textConfig, t.textConfig)) : o && n.textConfig && (this.textConfig = n.textConfig);
			for (var s = {}, c = !1, l = 0; l < na.length; l++) {
				var u = na[l], d = i && ra[u];
				t && t[u] != null ? d ? (c = !0, s[u] = t[u]) : this[u] = t[u] : o && n[u] != null && (d ? (c = !0, s[u] = n[u]) : this[u] = n[u]);
			}
			if (!i) for (var l = 0; l < this.animators.length; l++) {
				var f = this.animators[l], p = f.targetName;
				f.getLoop() || f.__changeFinalValue(p ? (t || n)[p] : t || n);
			}
			c && this._transitionState(e, s, a);
		}
	}, e.prototype._attachComponent = function(e) {
		if ((!e.__zr || e.__hostTarget) && e !== this) {
			var t = this.__zr;
			t && e.addSelfToZr(t), e.__zr = t, e.__hostTarget = this;
		}
	}, e.prototype._detachComponent = function(e) {
		e.__zr && e.removeSelfFromZr(e.__zr), e.__zr = null, e.__hostTarget = null;
	}, e.prototype.getClipPath = function() {
		return this._clipPath;
	}, e.prototype.setClipPath = function(e) {
		this._clipPath && this._clipPath !== e && this.removeClipPath(), this._attachComponent(e), this._clipPath = e, this.markRedraw();
	}, e.prototype.removeClipPath = function() {
		var e = this._clipPath;
		e && (this._detachComponent(e), this._clipPath = null, this.markRedraw());
	}, e.prototype.getTextContent = function() {
		return this._textContent;
	}, e.prototype.setTextContent = function(e) {
		var t = this._textContent;
		t !== e && (t && t !== e && this.removeTextContent(), e.innerTransformable = new Li(), this._attachComponent(e), this._textContent = e, this.markRedraw());
	}, e.prototype.setTextConfig = function(e) {
		this.textConfig ||= {}, M(this.textConfig, e), this.markRedraw();
	}, e.prototype.removeTextConfig = function() {
		this.textConfig = null, this.markRedraw();
	}, e.prototype.removeTextContent = function() {
		var e = this._textContent;
		e && (e.innerTransformable = null, this._detachComponent(e), this._textContent = null, this._innerTextDefaultStyle = null, this.markRedraw());
	}, e.prototype.getTextGuideLine = function() {
		return this._textGuide;
	}, e.prototype.setTextGuideLine = function(e) {
		this._textGuide && this._textGuide !== e && this.removeTextGuideLine(), this._attachComponent(e), this._textGuide = e, this.markRedraw();
	}, e.prototype.removeTextGuideLine = function() {
		var e = this._textGuide;
		e && (this._detachComponent(e), this._textGuide = null, this.markRedraw());
	}, e.prototype.markRedraw = function() {
		this.__dirty |= 1;
		var e = this.__zr;
		e && (this.__inHover ? e.refreshHover() : e.refresh()), this.__hostTarget && this.__hostTarget.markRedraw();
	}, e.prototype.dirty = function() {
		this.markRedraw();
	}, e.prototype.addSelfToZr = function(e) {
		if (this.__zr !== e) {
			this.__zr = e;
			var t = this.animators;
			if (t) for (var n = 0; n < t.length; n++) e.animation.addAnimator(t[n]);
			this._clipPath && this._clipPath.addSelfToZr(e), this._textContent && this._textContent.addSelfToZr(e), this._textGuide && this._textGuide.addSelfToZr(e);
		}
	}, e.prototype.removeSelfFromZr = function(e) {
		if (this.__zr) {
			this.__zr = null;
			var t = this.animators;
			if (t) for (var n = 0; n < t.length; n++) e.animation.removeAnimator(t[n]);
			this._clipPath && this._clipPath.removeSelfFromZr(e), this._textContent && this._textContent.removeSelfFromZr(e), this._textGuide && this._textGuide.removeSelfFromZr(e);
		}
	}, e.prototype.animate = function(e, t, n) {
		var r = new ni(e ? this[e] : this, t, n);
		return e && (r.targetName = e), this.addAnimator(r, e), r;
	}, e.prototype.addAnimator = function(e, t) {
		var n = this.__zr, r = this;
		e.during(function() {
			r.updateDuringAnimation(t);
		}).done(function() {
			var t = r.animators, n = P(t, e);
			n >= 0 && t.splice(n, 1);
		}), this.animators.push(e), n && n.animation.addAnimator(e), n && n.wakeUp();
	}, e.prototype.updateDuringAnimation = function(e) {
		this.markRedraw();
	}, e.prototype.stopAnimation = function(e, t) {
		for (var n = this.animators, r = n.length, i = [], a = 0; a < r; a++) {
			var o = n[a];
			!e || e === o.scope ? o.stop(t) : i.push(o);
		}
		return this.animators = i, this;
	}, e.prototype.animateTo = function(e, t, n) {
		ca(this, e, t, n);
	}, e.prototype.animateFrom = function(e, t, n) {
		ca(this, e, t, n, !0);
	}, e.prototype._transitionState = function(e, t, n, r) {
		for (var i = ca(this, t, n, r), a = 0; a < i.length; a++) i[a].__fromStateTransition = e;
	}, e.prototype.getBoundingRect = function() {
		return null;
	}, e.prototype.getPaintRect = function() {
		return null;
	}, e.initDefaultProps = (function() {
		var t = e.prototype;
		t.type = "element", t.name = "", t.ignore = t.silent = t.ignoreHostSilent = t.isGroup = t.draggable = t.dragging = t.ignoreClip = !1, t.__inHover = 0, t.__dirty = 1;
		function n(e, n, r, i) {
			Object.defineProperty(t, e, {
				get: function() {
					if (!this[n]) {
						var e = this[n] = [];
						a(this, e);
					}
					return this[n];
				},
				set: function(e) {
					this[r] = e[0], this[i] = e[1], this[n] = e, a(this, e);
				}
			});
			function a(e, t) {
				Object.defineProperty(t, 0, {
					get: function() {
						return e[r];
					},
					set: function(t) {
						e[r] = t;
					}
				}), Object.defineProperty(t, 1, {
					get: function() {
						return e[i];
					},
					set: function(t) {
						e[i] = t;
					}
				});
			}
		}
		Object.defineProperty && (n("position", "_legacyPos", "x", "y"), n("scale", "_legacyScale", "scaleX", "scaleY"), n("origin", "_legacyOrigin", "originX", "originY"));
	})(), e;
}();
F(sa, Ze), F(sa, Li);
function ca(e, t, n, r, i) {
	n ||= {};
	var a = [];
	ma(e, "", e, t, n, r, a, i);
	var o = a.length, s = !1, c = n.done, l = n.aborted, u = function() {
		s = !0, o--, o <= 0 && (s ? c && c() : l && l());
	}, d = function() {
		o--, o <= 0 && (s ? c && c() : l && l());
	};
	o || c && c(), a.length > 0 && n.during && a[0].during(function(e, t) {
		n.during(t);
	});
	for (var f = 0; f < a.length; f++) {
		var p = a[f];
		u && p.done(u), d && p.aborted(d), n.force && p.duration(n.duration), p.start(n.easing);
	}
	return a;
}
function la(e, t, n) {
	for (var r = 0; r < n; r++) e[r] = t[r];
}
function ua(e) {
	return I(e[0]);
}
function da(e, t, n) {
	if (I(t[n])) {
		if (I(e[n]) || (e[n] = []), le(t[n])) {
			var r = t[n].length;
			e[n].length !== r && (e[n] = new t[n].constructor(r), la(e[n], t[n], r));
		} else {
			var i = t[n], a = e[n], o = i.length;
			if (ua(i)) for (var s = i[0].length, c = 0; c < o; c++) a[c] ? la(a[c], i[c], s) : a[c] = Array.prototype.slice.call(i[c]);
			else la(a, i, o);
			a.length = i.length;
		}
	} else e[n] = t[n];
}
function fa(e, t) {
	return e === t || I(e) && I(t) && pa(e, t);
}
function pa(e, t) {
	var n = e.length;
	if (n !== t.length) return !1;
	for (var r = 0; r < n; r++) if (e[r] !== t[r]) return !1;
	return !0;
}
function ma(e, t, n, r, i, a, o, s) {
	for (var c = z(r), l = i.duration, u = i.delay, d = i.additive, f = i.setToFinal, p = !G(a), m = e.animators, h = [], g = 0; g < c.length; g++) {
		var _ = c[g], v = r[_];
		if (v != null && n[_] != null && (p || a[_])) {
			if (G(v) && !I(v) && !de(v)) {
				if (t) {
					s || (n[_] = v, e.updateDuringAnimation(t));
					continue;
				}
				ma(e, _, n[_], v, i, a && a[_], o, s);
			} else h.push(_);
		} else s || (n[_] = v, e.updateDuringAnimation(t), h.push(_));
	}
	var y = h.length;
	if (!d && y) for (var b = 0; b < m.length; b++) {
		var x = m[b];
		if (x.targetName === t && x.stopTracks(h)) {
			var S = P(m, x);
			m.splice(S, 1);
		}
	}
	if (i.force || (h = re(h, function(e) {
		return !fa(r[e], n[e]);
	}), y = h.length), y > 0 || i.force && !o.length) {
		var C = void 0, w = void 0, T = void 0;
		if (s) {
			w = {}, f && (C = {});
			for (var b = 0; b < y; b++) {
				var _ = h[b];
				w[_] = n[_], f ? C[_] = r[_] : n[_] = r[_];
			}
		} else if (f) {
			T = {};
			for (var b = 0; b < y; b++) {
				var _ = h[b];
				T[_] = Hr(n[_]), da(n, r, _);
			}
		}
		var x = new ni(n, !1, !1, d ? re(m, function(e) {
			return e.targetName === t;
		}) : null);
		x.targetName = t, i.scope && (x.scope = i.scope), f && C && x.whenWithKeys(0, C, h), T && x.whenWithKeys(0, T, h), x.whenWithKeys(l ?? 500, s ? w : r, h).delay(u || 0), e.addAnimator(x, t), o.push(x);
	}
}
function ha(e, t, n, r) {
	return !(n && n.hoverLayer || r) || ga(e) || t && ga(t) ? 0 : 1;
}
function ga(e) {
	return e.type === "text" || e.type === "tspan";
}
function _a(e, t, n) {
	return !t && !e.__inHover && n && n.duration > 0;
}
//#endregion
//#region node_modules/zrender/lib/graphic/Group.js
var va = function(e) {
	r(t, e);
	function t(t) {
		var n = e.call(this) || this;
		return n.isGroup = !0, n._children = [], n.attr(t), n;
	}
	return t.prototype.childrenRef = function() {
		return this._children;
	}, t.prototype.children = function() {
		return this._children.slice();
	}, t.prototype.childAt = function(e) {
		return this._children[e];
	}, t.prototype.childOfName = function(e) {
		for (var t = this._children, n = 0; n < t.length; n++) if (t[n].name === e) return t[n];
	}, t.prototype.childCount = function() {
		return this._children.length;
	}, t.prototype.add = function(e) {
		return e && e !== this && e.parent !== this && (this._children.push(e), this._doAdd(e)), this;
	}, t.prototype.addBefore = function(e, t) {
		if (e && e !== this && e.parent !== this && t && t.parent === this) {
			var n = this._children, r = n.indexOf(t);
			r >= 0 && (n.splice(r, 0, e), this._doAdd(e));
		}
		return this;
	}, t.prototype.replace = function(e, t) {
		var n = P(this._children, e);
		return n >= 0 && this.replaceAt(t, n), this;
	}, t.prototype.replaceAt = function(e, t) {
		var n = this._children, r = n[t];
		if (e && e !== this && e.parent !== this && e !== r) {
			n[t] = e, r.parent = null;
			var i = this.__zr;
			i && r.removeSelfFromZr(i), this._doAdd(e);
		}
		return this;
	}, t.prototype._doAdd = function(e) {
		e.parent && e.parent.remove(e), e.parent = this;
		var t = this.__zr;
		t && t !== e.__zr && e.addSelfToZr(t), t && t.refresh();
	}, t.prototype.remove = function(e) {
		var t = this.__zr, n = this._children, r = P(n, e);
		return r < 0 ? this : (n.splice(r, 1), e.parent = null, t && e.removeSelfFromZr(t), t && t.refresh(), this);
	}, t.prototype.removeAll = function() {
		for (var e = this._children, t = this.__zr, n = 0; n < e.length; n++) {
			var r = e[n];
			t && r.removeSelfFromZr(t), r.parent = null;
		}
		return e.length = 0, this;
	}, t.prototype.eachChild = function(e, t) {
		for (var n = this._children, r = 0; r < n.length; r++) {
			var i = n[r];
			e.call(t, i, r);
		}
		return this;
	}, t.prototype.traverse = function(e, t) {
		for (var n = 0; n < this._children.length; n++) {
			var r = this._children[n], i = e.call(t, r);
			r.isGroup && !i && r.traverse(e, t);
		}
		return this;
	}, t.prototype.addSelfToZr = function(t) {
		e.prototype.addSelfToZr.call(this, t);
		for (var n = 0; n < this._children.length; n++) this._children[n].addSelfToZr(t);
	}, t.prototype.removeSelfFromZr = function(t) {
		e.prototype.removeSelfFromZr.call(this, t);
		for (var n = 0; n < this._children.length; n++) this._children[n].removeSelfFromZr(t);
	}, t.prototype.getBoundingRect = function(e) {
		for (var t = new J(0, 0, 0, 0), n = e || this._children, r = [], i = null, a = 0; a < n.length; a++) {
			var o = n[a];
			if (!(o.ignore || o.invisible)) {
				var s = o.getBoundingRect(), c = o.getLocalTransform(r);
				c ? (J.applyTransform(t, s, c), i ||= t.clone(), i.union(t)) : (i ||= s.clone(), i.union(s));
			}
		}
		return i || t;
	}, t;
}(sa);
va.prototype.type = "group";
//#endregion
//#region node_modules/zrender/lib/zrender.js
var ya = {}, ba = {};
function xa(e) {
	delete ba[e];
}
function Sa(e) {
	if (!e) return !1;
	if (typeof e == "string") return kr(e, 1) < Ei;
	if (e.colorStops) {
		for (var t = e.colorStops, n = 0, r = t.length, i = 0; i < r; i++) n += kr(t[i].color, 1);
		return n /= r, n < Ei;
	}
	return !1;
}
var Ca = function() {
	function e(e, t, n) {
		var r = this;
		this._sleepAfterStill = 10, this._stillFrameAccum = 0, this._needsRefresh = !0, this._needsRefreshHover = !1, this._darkMode = !1, n ||= {}, this.dom = t, this.id = e;
		var i = new On(), o = n.renderer || "canvas";
		ya[o] || (o = z(ya)[0]), n.useDirtyRect = n.useDirtyRect != null && n.useDirtyRect;
		var s = new ya[o](t, i, n, e), c = n.ssr || s.ssrOnly;
		this.storage = i, this.painter = s;
		var l = !a.node && !a.worker && !c ? new Ci(s.getViewportRoot(), s.root) : null, u = n.useCoarsePointer, d = u == null || u === "auto" ? a.touchEventsSupported : !!u, f = 44, p;
		d && (p = K(n.pointerSize, f)), this.handler = new dn(i, s, l, s.root, p), this.animation = new ii({ stage: { update: c ? null : function() {
			return r._flush(!1);
		} } }), c || this.animation.start();
	}
	return e.prototype.add = function(e) {
		!this._disposed && e && (this.storage.addRoot(e), e.addSelfToZr(this), this.refresh());
	}, e.prototype.remove = function(e) {
		!this._disposed && e && (this.storage.delRoot(e), e.removeSelfFromZr(this), this.refresh());
	}, e.prototype.configLayer = function(e, t) {
		this._disposed || (this.painter.configLayer && this.painter.configLayer(e, t), this.refresh());
	}, e.prototype.setBackgroundColor = function(e) {
		this._disposed || (this.painter.setBackgroundColor && this.painter.setBackgroundColor(e), this.refresh(), this._backgroundColor = e, this._darkMode = Sa(e));
	}, e.prototype.getBackgroundColor = function() {
		return this._backgroundColor;
	}, e.prototype.setDarkMode = function(e) {
		this._darkMode = e;
	}, e.prototype.isDarkMode = function() {
		return this._darkMode;
	}, e.prototype.refreshImmediately = function(e) {
		this._disposed || this._refresh({
			animUpdate: !e,
			refresh: !0,
			refreshHover: !1
		});
	}, e.prototype._refresh = function(e) {
		e.animUpdate && this.animation.update(!0), this._needsRefresh = this._needsRefreshHover = !1, this.painter.refresh({
			refresh: e.refresh,
			refreshHover: e.refreshHover
		}), this._needsRefresh = this._needsRefreshHover = !1;
	}, e.prototype.refresh = function() {
		this._disposed || (this._needsRefresh = !0, this.animation.start());
	}, e.prototype.flush = function() {
		this._disposed || this._flush(!0);
	}, e.prototype._flush = function(e) {
		var t, n = ri(), r = this._needsRefresh, i = this._needsRefreshHover;
		(r || i) && (t = !0, this._refresh({
			animUpdate: e,
			refresh: r,
			refreshHover: i
		}));
		var a = ri();
		t ? (this._stillFrameAccum = 0, this.trigger("rendered", { elapsedTime: a - n })) : this._sleepAfterStill > 0 && (this._stillFrameAccum++, this._stillFrameAccum > this._sleepAfterStill && this.animation.stop());
	}, e.prototype.setSleepAfterStill = function(e) {
		this._sleepAfterStill = e;
	}, e.prototype.wakeUp = function() {
		this._disposed || (this.animation.start(), this._stillFrameAccum = 0);
	}, e.prototype.refreshHover = function() {
		this._needsRefreshHover = !0;
	}, e.prototype.refreshHoverImmediately = function() {
		this._disposed || this._refresh({
			animUpdate: !1,
			refresh: !1,
			refreshHover: !0
		});
	}, e.prototype.resize = function(e) {
		this._disposed || (e ||= {}, this.painter.resize(e.width, e.height), this.handler.resize());
	}, e.prototype.clearAnimation = function() {
		this._disposed || this.animation.clear();
	}, e.prototype.getWidth = function() {
		if (!this._disposed) return this.painter.getWidth();
	}, e.prototype.getHeight = function() {
		if (!this._disposed) return this.painter.getHeight();
	}, e.prototype.setCursorStyle = function(e) {
		this._disposed || this.handler.setCursorStyle(e);
	}, e.prototype.findHover = function(e, t) {
		if (!this._disposed) return this.handler.findHover(e, t);
	}, e.prototype.on = function(e, t, n) {
		return this._disposed || this.handler.on(e, t, n), this;
	}, e.prototype.off = function(e, t) {
		this._disposed || this.handler.off(e, t);
	}, e.prototype.trigger = function(e, t) {
		this._disposed || this.handler.trigger(e, t);
	}, e.prototype.clear = function() {
		if (!this._disposed) {
			for (var e = this.storage.getRoots(), t = 0; t < e.length; t++) e[t] instanceof va && e[t].removeSelfFromZr(this);
			this.storage.delAllRoots(), this.painter.clear();
		}
	}, e.prototype.dispose = function() {
		this._disposed || (this.animation.stop(), this.clear(), this.storage.dispose(), this.painter.dispose(), this.handler.dispose(), this.animation = this.storage = this.painter = this.handler = null, this._disposed = !0, xa(this.id));
	}, e;
}();
function wa(e, t) {
	var n = new Ca(D(), e, t);
	return ba[n.id] = n, n;
}
function Ta(e, t) {
	ya[e] = t;
}
//#endregion
//#region node_modules/echarts/lib/util/number.js
var Ea = 1e-4, Da = 20;
function Oa(e) {
	return e.replace(/^\s+|\s+$/g, "");
}
var ka = Math.min, Aa = Math.max, ja = Math.abs, Ma = Math.round, Na = Math.floor, Pa = Math.ceil, Fa = Math.pow, Ia = Math.log, La = Math.LN10, Ra = Math.PI, za = Math.random;
function Ba(e, t, n, r) {
	var i = t[0], a = t[1], o = n[0], s = n[1], c = a - i, l = s - o;
	if (c === 0) return l === 0 ? o : (o + s) / 2;
	if (r) {
		if (c > 0) {
			if (e <= i) return o;
			if (e >= a) return s;
		} else if (e >= i) return o;
		else if (e <= a) return s;
	} else {
		if (e === i) return o;
		if (e === a) return s;
	}
	return (e - i) / c * l + o;
}
var Va = Ha;
function Ha(e, t, n) {
	switch (e) {
		case "center":
		case "middle":
			e = "50%";
			break;
		case "left":
		case "top":
			e = "0%";
			break;
		case "right":
		case "bottom": e = "100%";
	}
	return Ua(e, t, n);
}
function Ua(e, t, n) {
	return W(e) ? Wa(e) ? parseFloat(e) / 100 * t + (n || 0) : parseFloat(e) : e == null ? NaN : +e;
}
function Wa(e) {
	return !!Oa(e).match(/%$/);
}
function Y(e, t, n) {
	return isNaN(t) ? n ? "" + e : +e : (t = ka(Aa(0, t), Da), e = (+e).toFixed(t), n ? e : +e);
}
function Ga(e) {
	return e.sort(function(e, t) {
		return e - t;
	}), e;
}
function Ka(e) {
	if (e = +e, isNaN(e)) return 0;
	if (e > 1e-14) {
		for (var t = 1, n = 0; n < 15; n++, t *= 10) if (Ma(e * t) / t === e) return n;
	}
	return qa(e);
}
function qa(e) {
	var t = e.toString().toLowerCase(), n = t.indexOf("e"), r = n > 0 ? +t.slice(n + 1) : 0, i = n > 0 ? n : t.length, a = t.indexOf(".");
	return Aa(0, (a < 0 ? 0 : i - 1 - a) - r);
}
function Ja(e, t, n) {
	var r = ja(e[1] - e[0]);
	if (!isFinite(r) || r === 0) return NaN;
	var i = Ia(2 * ja(n || 1) * ja(r)) / La, a = Ia(ja(t)) / La, o = Aa(0, Pa(-i + a));
	return isFinite(o) || (o = NaN), o;
}
function Ya(e, t) {
	var n = Aa(Ka(e), Ka(t)), r = e + t;
	return n > Da ? r : Y(r, n);
}
var Xa = Fa(2, 53) - 1;
function Za(e) {
	var t = Ra * 2;
	return (e % t + t) % t;
}
function Qa(e) {
	return e > -Ea && e < Ea;
}
var $a = /^(?:(\d{4})(?:[-\/](\d{1,2})(?:[-\/](\d{1,2})(?:[T ](\d{1,2})(?::(\d{1,2})(?::(\d{1,2})(?:[.,](\d+))?)?)?(Z|[\+\-]\d\d:?\d\d)?)?)?)?)?$/;
function eo(e) {
	if (e instanceof Date) return e;
	if (W(e)) {
		var t = $a.exec(e);
		if (!t) return /* @__PURE__ */ new Date(NaN);
		if (t[8]) {
			var n = +t[4] || 0;
			return t[8].toUpperCase() !== "Z" && (n -= +t[8].slice(0, 3)), new Date(Date.UTC(+t[1], (t[2] || 1) - 1, +t[3] || 1, n, +(t[5] || 0), +t[6] || 0, t[7] ? +t[7].substring(0, 3) : 0));
		}
		return new Date(+t[1], (t[2] || 1) - 1, +t[3] || 1, +t[4] || 0, +(t[5] || 0), +t[6] || 0, t[7] ? +t[7].substring(0, 3) : 0);
	}
	return e == null ? /* @__PURE__ */ new Date(NaN) : new Date(Ma(e));
}
function to(e) {
	return Fa(10, no(e));
}
function no(e) {
	if (e === 0) return 0;
	var t = Na(Ia(e) / La);
	return e / Fa(10, t) >= 10 && t++, t;
}
function ro(e, t) {
	var n = no(e), r = Fa(10, n), i = e / r;
	return e = (t === 2 ? 1 : t ? i < 1.5 ? 1 : i < 2.5 ? 2 : i < 4 ? 3 : i < 7 ? 5 : 10 : i < 1 ? 1 : i < 2 ? 2 : i < 3 ? 3 : i < 5 ? 5 : 10) * r, Y(e, -n);
}
function io(e) {
	var t = parseFloat(e);
	return t == e && (t !== 0 || !W(e) || e.indexOf("x") <= 0) ? t : NaN;
}
function ao(e) {
	return !isNaN(io(e));
}
function oo() {
	return Ma(za() * 9);
}
function so(e, t) {
	return t === 0 ? e : so(t, e % t);
}
function co(e, t) {
	return e == null ? t : t == null ? e : e * t / so(e, t);
}
function lo(e) {
	return e != null && isFinite(e);
}
//#endregion
//#region node_modules/echarts/lib/util/log.js
var uo = "[ECharts] ", fo = {}, po = typeof console < "u" && console.warn && console.log;
function mo(e, t, n) {
	if (po) {
		if (n) {
			if (fo[t]) return;
			fo[t] = !0;
		}
		console[e](uo + t);
	}
}
function ho(e, t) {
	mo("error", e, t);
}
function go(e) {
	throw Error(e);
}
//#endregion
//#region node_modules/echarts/lib/util/model.js
function _o(e, t, n) {
	return (t - e) * n + e;
}
var vo = "series\0", yo = "\0_ec_\0";
function bo(e) {
	return e instanceof Array ? e : e == null ? [] : [e];
}
function xo(e, t, n) {
	if (e) {
		e[t] = e[t] || {}, e.emphasis = e.emphasis || {}, e.emphasis[t] = e.emphasis[t] || {};
		for (var r = 0, i = n.length; r < i; r++) {
			var a = n[r];
			!e.emphasis[t].hasOwnProperty(a) && e[t].hasOwnProperty(a) && (e.emphasis[t][a] = e[t][a]);
		}
	}
}
var So = /* @__PURE__ */ "fontStyle.fontWeight.fontSize.fontFamily.rich.tag.color.textBorderColor.textBorderWidth.width.height.lineHeight.align.verticalAlign.baseline.shadowColor.shadowBlur.shadowOffsetX.shadowOffsetY.textShadowColor.textShadowBlur.textShadowOffsetX.textShadowOffsetY.backgroundColor.borderColor.borderWidth.borderRadius.padding".split(".");
function Co(e) {
	return G(e) && !H(e) && !(e instanceof Date) ? e.value : e;
}
function wo(e) {
	return G(e) && !(e instanceof Array);
}
function To(e, t, n) {
	var r = n === "normalMerge", i = n === "replaceMerge", a = n === "replaceAll";
	e ||= [], t = (t || []).slice();
	var o = q();
	L(t, function(e, n) {
		if (!G(e)) {
			t[n] = null;
			return;
		}
	});
	var s = Eo(e, o, n);
	return (r || i) && Do(s, e, o, t), r && Oo(s, t), r || i ? ko(s, t, i) : a && Ao(s, t), jo(s), s;
}
function Eo(e, t, n) {
	var r = [];
	if (n === "replaceAll") return r;
	for (var i = 0; i < e.length; i++) {
		var a = e[i];
		a && a.id != null && t.set(a.id, i), r.push({
			existing: n === "replaceMerge" || Io(a) ? null : a,
			newOption: null,
			keyInfo: null,
			brandNew: null
		});
	}
	return r;
}
function Do(e, t, n, r) {
	L(r, function(i, a) {
		if (i && i.id != null) {
			var o = No(i.id), s = n.get(o);
			if (s != null) {
				var c = e[s];
				ve(!c.newOption, "Duplicated option on id \"" + o + "\"."), c.newOption = i, c.existing = t[s], r[a] = null;
			}
		}
	});
}
function Oo(e, t) {
	L(t, function(n, r) {
		if (n && n.name != null) for (var i = 0; i < e.length; i++) {
			var a = e[i].existing;
			if (!e[i].newOption && a && (a.id == null || n.id == null) && !Io(n) && !Io(a) && Mo("name", a, n)) {
				e[i].newOption = n, t[r] = null;
				return;
			}
		}
	});
}
function ko(e, t, n) {
	L(t, function(t) {
		if (t) {
			for (var r, i = 0; (r = e[i]) && (r.newOption || Io(r.existing) || r.existing && t.id != null && !Mo("id", t, r.existing));) i++;
			r ? (r.newOption = t, r.brandNew = n) : e.push({
				newOption: t,
				brandNew: n,
				existing: null,
				keyInfo: null
			}), i++;
		}
	});
}
function Ao(e, t) {
	L(t, function(t) {
		e.push({
			newOption: t,
			brandNew: !0,
			existing: null,
			keyInfo: null
		});
	});
}
function jo(e) {
	var t = q();
	L(e, function(e) {
		var n = e.existing;
		n && t.set(n.id, e);
	}), L(e, function(e) {
		var n = e.newOption;
		ve(!n || n.id == null || !t.get(n.id) || t.get(n.id) === e, "id duplicates: " + (n && n.id)), n && n.id != null && t.set(n.id, e), !e.keyInfo && (e.keyInfo = {});
	}), L(e, function(e, n) {
		var r = e.existing, i = e.newOption, a = e.keyInfo;
		if (G(i)) {
			if (a.name = i.name == null ? r ? r.name : vo + n : No(i.name), r) a.id = No(r.id);
			else if (i.id != null) a.id = No(i.id);
			else {
				var o = 0;
				do
					a.id = "\0" + a.name + "\0" + o++;
				while (t.get(a.id));
			}
			t.set(a.id, e);
		}
	});
}
function Mo(e, t, n) {
	var r = Po(t[e], null), i = Po(n[e], null);
	return r != null && i != null && r === i;
}
function No(e) {
	return Po(e, "");
}
function Po(e, t) {
	return e == null ? t : W(e) ? e : se(e) || oe(e) ? e + "" : t;
}
function Fo(e) {
	var t = e.name;
	return !!(t && t.indexOf(vo));
}
function Io(e) {
	return e && e.id != null && No(e.id).indexOf(yo) === 0;
}
function Lo(e, t, n) {
	L(e, function(e) {
		var r = e.newOption;
		G(r) && (e.keyInfo.mainType = t, e.keyInfo.subType = Ro(t, r, e.existing, n));
	});
}
function Ro(e, t, n, r) {
	return t.type ? t.type : n ? n.subType : r.determineSubType(e, t);
}
function zo(e, t) {
	if (t.dataIndexInside != null) return t.dataIndexInside;
	if (t.dataIndex != null) return H(t.dataIndex) ? R(t.dataIndex, function(t) {
		return e.indexOfRawIndex(t);
	}) : e.indexOfRawIndex(t.dataIndex);
	if (t.name != null) return H(t.name) ? R(t.name, function(t) {
		return e.indexOfName(t);
	}) : e.indexOfName(t.name);
}
function X() {
	var e = "__ec_inner_" + Bo++;
	return function(t) {
		return t[e] || (t[e] = {});
	};
}
var Bo = oo();
function Vo(e, t, n) {
	var r = Ho(t, n), i = r.mainTypeSpecified, a = r.queryOptionMap, o = r.others, s = n ? n.defaultMainType : null;
	return !i && s && a.set(s, {}), a.each(function(t, r) {
		var i = Wo(e, r, t, {
			useDefault: s === r,
			enableAll: n && n.enableAll != null ? n.enableAll : !0,
			enableNone: n && n.enableNone != null ? n.enableNone : !0
		});
		o[r + "Models"] = i.models, o[r + "Model"] = i.models[0];
	}), o;
}
function Ho(e, t) {
	var n;
	if (W(e)) {
		var r = {};
		r[e + "Index"] = 0, n = r;
	} else n = e;
	var i = q(), a = {}, o = !1;
	return L(n, function(e, n) {
		if (n === "dataIndex" || n === "dataIndexInside") {
			a[n] = e;
			return;
		}
		var r = n.match(/^(\w+)(Index|Id|Name)$/) || [], s = r[1], c = (r[2] || "").toLowerCase();
		if (!(!s || !c || t && t.includeMainTypes && P(t.includeMainTypes, s) < 0)) {
			o ||= !!s;
			var l = i.get(s) || i.set(s, {});
			l[c] = e;
		}
	}), {
		mainTypeSpecified: o,
		queryOptionMap: i,
		others: a
	};
}
var Uo = {
	useDefault: !0,
	enableAll: !1,
	enableNone: !1
};
function Wo(e, t, n, r) {
	r ||= Uo;
	var i = n.index, a = n.id, o = n.name, s = {
		models: null,
		specified: i != null || a != null || o != null
	};
	if (!s.specified) {
		var c = void 0;
		return s.models = r.useDefault && (c = e.getComponent(t)) ? [c] : [], s;
	}
	if (i === "none" || i === !1) {
		if (r.enableNone) return s.models = [], s;
		i = -1;
	}
	return i === "all" && (i = r.enableAll ? a = o = null : -1), s.models = e.queryComponents({
		mainType: t,
		index: i,
		id: a,
		name: o
	}), s;
}
function Go(e, t, n) {
	var r = {};
	r[t + "Id"] = e[t + "Id"], r[t + "Index"] = e[t + "Index"], r[t + "Name"] = e[t + "Name"];
	var i = {
		mainType: t,
		query: r
	};
	return n && (i.subType = n), i;
}
function Ko(e, t, n) {
	e.setAttribute ? e.setAttribute(t, n) : e[t] = n;
}
function qo(e, t) {
	return e.getAttribute ? e.getAttribute(t) : e[t];
}
function Jo(e) {
	return e === "auto" ? a.domSupported ? "html" : "richText" : e || "html";
}
function Yo(e, t, n, r, i) {
	var a = t == null || t === "auto";
	if (r == null) return r;
	if (se(r)) {
		var o = _o(n || 0, r, i);
		return Y(o, a ? Math.max(Ka(n || 0), Ka(r)) : t);
	}
	if (W(r)) return i < 1 ? n : r;
	for (var s = [], c = n, l = r, u = Math.max(c ? c.length : 0, l.length), d = 0; d < u; ++d) {
		var f = e.getDimensionInfo(d);
		if (f && f.type === "ordinal") s[d] = (i < 1 && c ? c : l)[d];
		else {
			var p = c && c[d] ? c[d] : 0, m = l[d], o = _o(p, m, i);
			s[d] = Y(o, a ? Math.max(Ka(p), Ka(m)) : t);
		}
	}
	return s;
}
(function() {
	function e() {}
	return e.prototype.reset = function(e, t, n, r) {
		return this._list = e, this._step = r ||= 1, this._idx = t, this._end = n ?? (r > 0 ? e.length : 0), this.item = null, this.key = NaN, this;
	}, e.prototype.next = function() {
		return (this._step > 0 ? this._idx < this._end : this._idx >= this._end) && (this.item = this._list[this._idx], this.key = this._idx += this._step, !0);
	}, e;
})();
function Xo() {
	return [Infinity, -Infinity];
}
function Zo(e, t) {
	ts(t) && (t < e[0] && (e[0] = t), t > e[1] && (e[1] = t));
}
function Qo(e, t) {
	ts(t) && t < e[0] && (e[0] = t);
}
function $o(e, t) {
	ts(t) && t > e[1] && (e[1] = t);
}
function es(e, t) {
	ns(t[0], t[1]) && (t[0] < e[0] && (e[0] = t[0]), t[1] > e[1] && (e[1] = t[1]));
}
function ts(e) {
	return e != null && isFinite(e);
}
function ns(e, t) {
	return ts(e) && ts(t) && e <= t;
}
function rs(e) {
	var t = e[1] - e[0];
	return isFinite(t) && t >= 0;
}
function is(e) {
	ns(e[0], e[1]) && e[0] > e[1] && (e[0] = e[1]);
}
function as() {
	var e = "__ec_once_" + os++;
	return function(t, n) {
		Ae(t, e) || (t[e] = 1, n());
	};
}
var os = oo();
function ss(e, t, n) {
	var r = q(), i = 0;
	L(e, function(a) {
		var o = t(a), s = r.get(o) || 0;
		n && n(a, s), !s && !n && (e[i++] = a), r.set(o, s + 1);
	}), n || (e.length = i);
}
function cs(e) {
	return e.value + "";
}
function ls(e) {
	return e + "";
}
function us(e, t, n) {
	var r = e.getData().count();
	return {
		progressiveRender: n.progressiveEnabled && t.incrementalPrepareRender && r >= n.threshold,
		large: e.get("large") && r >= e.get("largeThreshold"),
		modDataCount: e.get("progressiveChunkMode") === "mod" ? e.getData().count() : null
	};
}
function ds(e) {
	return { overallReset: e };
}
//#endregion
//#region node_modules/echarts/lib/util/clazz.js
var fs = ".", ps = "___EC__COMPONENT__CONTAINER___", ms = "___EC__EXTENDED_CLASS___";
function hs(e) {
	var t = {
		main: "",
		sub: ""
	};
	if (e) {
		var n = e.split(fs);
		t.main = n[0] || "", t.sub = n[1] || "";
	}
	return t;
}
function gs(e) {
	ve(/^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)?$/.test(e), "componentType \"" + e + "\" illegal");
}
function _s(e) {
	return !!(e && e[ms]);
}
function vs(e, t) {
	e.$constructor = e, e.extend = function(e) {
		var t = this, n;
		return ys(t) ? n = function(e) {
			r(t, e);
			function t() {
				return e.apply(this, arguments) || this;
			}
			return t;
		}(t) : (n = function() {
			(e.$constructor || t).apply(this, arguments);
		}, te(n, this)), M(n.prototype, e), n[ms] = !0, n.extend = this.extend, n.superCall = Cs, n.superApply = ws, n.superClass = t, n;
	};
}
function ys(e) {
	return U(e) && /^class\s/.test(Function.prototype.toString.call(e));
}
function bs(e, t) {
	e.extend = t.extend;
}
var xs = Math.round(Math.random() * 10);
function Ss(e) {
	var t = ["__\0is_clz", xs++].join("_");
	e.prototype[t] = !0, e.isInstance = function(e) {
		return !!(e && e[t]);
	};
}
function Cs(e, t) {
	var n = [...arguments].slice(2);
	return this.superClass.prototype[t].apply(e, n);
}
function ws(e, t, n) {
	return this.superClass.prototype[t].apply(e, n);
}
function Ts(e) {
	var t = {};
	e.registerClass = function(e) {
		var r = e.type || e.prototype.type;
		if (r) {
			gs(r), e.prototype.type = r;
			var i = hs(r);
			if (!i.sub) t[i.main] = e;
			else if (i.sub !== ps) {
				var a = n(i);
				a[i.sub] = e;
			}
		}
		return e;
	}, e.getClass = function(e, n, r) {
		var i = t[e];
		if (i && i[ps] && (i = n ? i[n] : null), r && !i) throw Error(n ? "Component " + e + "." + (n || "") + " is used but not imported." : e + ".type should be specified.");
		return i;
	}, e.getClassesByMainType = function(e) {
		var n = hs(e), r = [], i = t[n.main];
		return i && i[ps] ? L(i, function(e, t) {
			t !== ps && r.push(e);
		}) : r.push(i), r;
	}, e.hasClass = function(e) {
		return !!t[hs(e).main];
	}, e.getAllClassMainTypes = function() {
		var e = [];
		return L(t, function(t, n) {
			e.push(n);
		}), e;
	}, e.hasSubTypes = function(e) {
		var n = t[hs(e).main];
		return n && n[ps];
	};
	function n(e) {
		var n = t[e.main];
		return (!n || !n[ps]) && (n = t[e.main] = {}, n[ps] = !0), n;
	}
}
//#endregion
//#region node_modules/echarts/lib/model/mixin/makeStyleMapper.js
function Es(e, t) {
	for (var n = 0; n < e.length; n++) e[n][1] || (e[n][1] = e[n][0]);
	return t ||= !1, function(n, r, i) {
		for (var a = {}, o = 0; o < e.length; o++) {
			var s = e[o][1];
			if (!(r && P(r, s) >= 0 || i && P(i, s) < 0)) {
				var c = n.getShallow(s, t);
				c != null && (a[e[o][0]] = c);
			}
		}
		return a;
	};
}
var Ds = Es([
	["fill", "color"],
	["shadowBlur"],
	["shadowOffsetX"],
	["shadowOffsetY"],
	["opacity"],
	["shadowColor"]
]), Os = function() {
	function e() {}
	return e.prototype.getAreaStyle = function(e, t) {
		return Ds(this, e, t);
	}, e;
}(), ks = new sr(50);
function As(e) {
	if (typeof e == "string") {
		var t = ks.get(e);
		return t && t.image;
	}
	return e;
}
function js(e, t, n, r, i) {
	if (!e) return t;
	if (typeof e == "string") {
		if (t && t.__zrImageSrc === e || !n) return t;
		var a = ks.get(e), o = {
			hostEl: n,
			cb: r,
			cbPayload: i
		};
		return a ? (t = a.image, !Ns(t) && a.pending.push(o)) : (t = p.loadImage(e, Ms, Ms), t.__zrImageSrc = e, ks.put(e, t.__cachedImgObj = {
			image: t,
			pending: [o]
		})), t;
	}
	return e;
}
function Ms() {
	var e = this.__cachedImgObj;
	this.onload = this.onerror = this.__cachedImgObj = null;
	for (var t = 0; t < e.pending.length; t++) {
		var n = e.pending[t], r = n.cb;
		r && r(this, n.cbPayload), n.hostEl.dirty();
	}
	e.pending.length = 0;
}
function Ns(e) {
	return e && e.width && e.height;
}
//#endregion
//#region node_modules/zrender/lib/graphic/helper/parseText.js
var Ps = /\{([a-zA-Z0-9_]+)\|([^}]*)\}/g;
function Fs(e, t, n, r, i, a) {
	if (!n) {
		e.text = "", e.isTruncated = !1;
		return;
	}
	var o = (t + "").split("\n");
	a = Is(n, r, i, a);
	for (var s = !1, c = {}, l = 0, u = o.length; l < u; l++) Ls(c, o[l], a), o[l] = c.textLine, s ||= c.isTruncated;
	e.text = o.join("\n"), e.isTruncated = s;
}
function Is(e, t, n, r) {
	r ||= {};
	var i = M({}, r);
	n = K(n, "..."), i.maxIterations = K(r.maxIterations, 2);
	var a = i.minChar = K(r.minChar, 0), o = i.fontMeasureInfo = Vi(t), s = o.asciiCharWidth;
	i.placeholder = K(r.placeholder, "");
	for (var c = e = Math.max(0, e - 1), l = 0; l < a && c >= s; l++) c -= s;
	var u = qi(o, n);
	return u > c && (n = "", u = 0), c = e - u, i.ellipsis = n, i.ellipsisWidth = u, i.contentWidth = c, i.containerWidth = e, i;
}
function Ls(e, t, n) {
	var r = n.containerWidth, i = n.contentWidth, a = n.fontMeasureInfo;
	if (!r) {
		e.textLine = "", e.isTruncated = !1;
		return;
	}
	var o = qi(a, t);
	if (o <= r) {
		e.textLine = t, e.isTruncated = !1;
		return;
	}
	for (var s = 0;; s++) {
		if (o <= i || s >= n.maxIterations) {
			t += n.ellipsis;
			break;
		}
		var c = s === 0 ? Rs(t, i, a) : o > 0 ? Math.floor(t.length * i / o) : 0;
		t = t.substr(0, c), o = qi(a, t);
	}
	t === "" && (t = n.placeholder), e.textLine = t, e.isTruncated = !0;
}
function Rs(e, t, n) {
	for (var r = 0, i = 0, a = e.length; i < a && r < t; i++) r += Ki(n, e.charCodeAt(i));
	return i;
}
function zs(e, t, n, r) {
	var i = Qs(e), a = t.overflow, o = t.padding, s = o ? o[1] + o[3] : 0, c = o ? o[0] + o[2] : 0, l = t.font, u = a === "truncate", d = Qi(l), f = K(t.lineHeight, d), p = t.lineOverflow === "truncate", m = !1, h = t.width;
	h == null && n != null && (h = n - s);
	var g = t.height;
	g == null && r != null && (g = r - c);
	var _ = h != null && (a === "break" || a === "breakAll") ? i ? Js(i, t.font, h, a === "breakAll", 0).lines : [] : i ? i.split("\n") : [], v = _.length * f;
	if (g ??= v, v > g && p) {
		var y = Math.floor(g / f);
		m ||= _.length > y, _ = _.slice(0, y), v = _.length * f;
	}
	if (i && u && h != null) for (var b = Is(h, l, t.ellipsis, {
		minChar: t.truncateMinChar,
		placeholder: t.placeholder
	}), x = {}, S = 0; S < _.length; S++) Ls(x, _[S], b), _[S] = x.textLine, m ||= x.isTruncated;
	for (var C = g, w = 0, T = Vi(l), S = 0; S < _.length; S++) w = Math.max(qi(T, _[S]), w);
	h ??= w;
	var E = h;
	return C += c, E += s, {
		lines: _,
		height: g,
		outerWidth: E,
		outerHeight: C,
		lineHeight: f,
		calculatedLineHeight: d,
		contentWidth: w,
		contentHeight: v,
		width: h,
		isTruncated: m
	};
}
var Bs = function() {
	function e() {}
	return e;
}(), Vs = function() {
	function e(e) {
		this.tokens = [], e && (this.tokens = e);
	}
	return e;
}(), Hs = function() {
	function e() {
		this.width = 0, this.height = 0, this.contentWidth = 0, this.contentHeight = 0, this.outerWidth = 0, this.outerHeight = 0, this.lines = [], this.isTruncated = !1;
	}
	return e;
}();
function Us(e, t, n, r, i) {
	var a = new Hs(), o = Qs(e);
	if (!o) return a;
	var s = t.padding, c = s ? s[1] + s[3] : 0, l = s ? s[0] + s[2] : 0, u = t.width;
	u == null && n != null && (u = n - c);
	var d = t.height;
	d == null && r != null && (d = r - l);
	for (var f = t.overflow, p = (f === "break" || f === "breakAll") && u != null ? {
		width: u,
		accumWidth: 0,
		breakAll: f === "breakAll"
	} : null, m = Ps.lastIndex = 0, h; (h = Ps.exec(o)) != null;) {
		var g = h.index;
		g > m && Ws(a, o.substring(m, g), t, p), Ws(a, h[2], t, p, h[1]), m = Ps.lastIndex;
	}
	m < o.length && Ws(a, o.substring(m, o.length), t, p);
	var _ = [], v = 0, y = 0, b = f === "truncate", x = t.lineOverflow === "truncate", S = {};
	function C(e, t, n) {
		e.width = t, e.lineHeight = n, v += n, y = Math.max(y, t);
	}
	outer: for (var w = 0; w < a.lines.length; w++) {
		for (var T = a.lines[w], E = 0, D = 0, O = 0; O < T.tokens.length; O++) {
			var k = T.tokens[O], A = k.styleName && t.rich[k.styleName] || {}, j = k.textPadding = A.padding, M = j ? j[1] + j[3] : 0, ee = k.font = A.font || t.font;
			k.contentHeight = Qi(ee);
			var N = K(A.height, k.contentHeight);
			if (k.innerHeight = N, j && (N += j[0] + j[2]), k.height = N, k.lineHeight = he(A.lineHeight, t.lineHeight, N), k.align = A && A.align || i, k.verticalAlign = A && A.verticalAlign || "middle", x && d != null && v + k.lineHeight > d) {
				var P = a.lines.length;
				O > 0 ? (T.tokens = T.tokens.slice(0, O), C(T, D, E), a.lines = a.lines.slice(0, w + 1)) : a.lines = a.lines.slice(0, w), a.isTruncated = a.isTruncated || a.lines.length < P;
				break outer;
			}
			var te = A.width, F = te == null || te === "auto";
			if (typeof te == "string" && te.charAt(te.length - 1) === "%") k.percentWidth = te, _.push(k), k.contentWidth = qi(Vi(ee), k.text);
			else {
				if (F) {
					var I = A.backgroundColor, L = I && I.image;
					L && (L = As(L), Ns(L) && (k.width = Math.max(k.width, L.width * N / L.height)));
				}
				var R = b && u != null ? u - D : null;
				R != null && R < k.width ? !F || R < M ? (k.text = "", k.width = k.contentWidth = 0) : (Fs(S, k.text, R - M, ee, t.ellipsis, { minChar: t.truncateMinChar }), k.text = S.text, a.isTruncated = a.isTruncated || S.isTruncated, k.width = k.contentWidth = qi(Vi(ee), k.text)) : k.contentWidth = qi(Vi(ee), k.text);
			}
			k.width += M, D += k.width, A && (E = Math.max(E, k.lineHeight));
		}
		C(T, D, E);
	}
	a.outerWidth = a.width = K(u, y), a.outerHeight = a.height = K(d, v), a.contentHeight = v, a.contentWidth = y, a.outerWidth += c, a.outerHeight += l;
	for (var w = 0; w < _.length; w++) {
		var k = _[w], ne = k.percentWidth;
		k.width = parseInt(ne, 10) / 100 * a.width;
	}
	return a;
}
function Ws(e, t, n, r, i) {
	var a = t === "", o = i && n.rich[i] || {}, s = e.lines, c = o.font || n.font, l = !1, u, d;
	if (r) {
		var f = o.padding, p = f ? f[1] + f[3] : 0;
		if (o.width != null && o.width !== "auto") {
			var m = $i(o.width, r.width) + p;
			s.length > 0 && m + r.accumWidth > r.width && (u = t.split("\n"), l = !0), r.accumWidth = m;
		} else {
			var h = Js(t, c, r.width, r.breakAll, r.accumWidth);
			r.accumWidth = h.accumWidth + p, d = h.linesWidths, u = h.lines;
		}
	}
	u ||= t.split("\n");
	for (var g = Vi(c), _ = 0; _ < u.length; _++) {
		var v = u[_], y = new Bs();
		if (y.styleName = i, y.text = v, y.isLineHolder = !v && !a, y.width = typeof o.width == "number" ? o.width : d ? d[_] : qi(g, v), !_ && !l) {
			var b = (s[s.length - 1] || (s[0] = new Vs())).tokens, x = b.length;
			x === 1 && b[0].isLineHolder ? b[0] = y : (v || !x || a) && b.push(y);
		} else s.push(new Vs([y]));
	}
}
function Gs(e) {
	var t = e.charCodeAt(0);
	return t >= 32 && t <= 591 || t >= 880 && t <= 4351 || t >= 4608 && t <= 5119 || t >= 7680 && t <= 8303;
}
var Ks = ne(",&?/;] ".split(""), function(e, t) {
	return e[t] = !0, e;
}, {});
function qs(e) {
	return !Gs(e) || !!Ks[e];
}
function Js(e, t, n, r, i) {
	for (var a = [], o = [], s = "", c = "", l = 0, u = 0, d = Vi(t), f = 0; f < e.length; f++) {
		var p = e.charAt(f);
		if (p === "\n") {
			c && (s += c, u += l), a.push(s), o.push(u), s = "", c = "", l = 0, u = 0;
			continue;
		}
		var m = Ki(d, p.charCodeAt(0)), h = !r && !qs(p);
		if (a.length ? u + m > n : i + u + m > n) {
			u ? (s || c) && (h ? (s || (s = c, c = "", l = 0, u = l), a.push(s), o.push(u - l), c += p, l += m, s = "", u = l) : (c && (s += c, c = "", l = 0), a.push(s), o.push(u), s = p, u = m)) : h ? (a.push(c), o.push(l), c = p, l = m) : (a.push(p), o.push(m));
			continue;
		}
		u += m, h ? (c += p, l += m) : (c && (s += c, c = "", l = 0), s += p);
	}
	return c && (s += c), s && (a.push(s), o.push(u)), a.length === 1 && (u += i), {
		accumWidth: u,
		lines: a,
		linesWidths: o
	};
}
function Ys(e, t, n, r, i, a) {
	if (e.baseX = n, e.baseY = r, e.outerWidth = e.outerHeight = null, t) {
		var o = t.width * 2, s = t.height * 2;
		J.set(Xs, Xi(n, o, i), Zi(r, s, a), o, s), J.intersect(t, Xs, null, Zs);
		var c = Zs.outIntersectRect;
		e.outerWidth = c.width, e.outerHeight = c.height, e.baseX = Xi(c.x, c.width, i, !0), e.baseY = Zi(c.y, c.height, a, !0);
	}
}
var Xs = new J(0, 0, 0, 0), Zs = {
	outIntersectRect: {},
	clamp: !0
};
function Qs(e) {
	return e == null ? e = "" : e += "";
}
function $s(e) {
	var t = Qs(e.text), n = e.font;
	return ec(e, qi(Vi(n), t), Qi(n), null);
}
function ec(e, t, n, r) {
	var i = new J(Xi(e.x || 0, t, e.textAlign), Zi(e.y || 0, n, e.textBaseline), t, n), a = r ?? (tc(e) ? e.lineWidth : 0);
	return a > 0 && (i.x -= a / 2, i.y -= a / 2, i.width += a, i.height += a), i;
}
function tc(e) {
	var t = e.stroke;
	return t != null && t !== "none" && e.lineWidth > 0;
}
//#endregion
//#region node_modules/zrender/lib/graphic/Displayable.js
var nc = "__zr_style_" + Math.round(Math.random() * 10), rc = {
	shadowBlur: 0,
	shadowOffsetX: 0,
	shadowOffsetY: 0,
	shadowColor: "#000",
	opacity: 1,
	blend: "source-over"
}, ic = { style: {
	shadowBlur: !0,
	shadowOffsetX: !0,
	shadowOffsetY: !0,
	shadowColor: !0,
	opacity: !0
} };
rc[nc] = !0;
var ac = [
	"z",
	"z2",
	"invisible"
], oc = ["invisible"], sc = function(e) {
	r(t, e);
	function t(t) {
		return e.call(this, t) || this;
	}
	return t.prototype._init = function(t) {
		for (var n = z(t), r = 0; r < n.length; r++) {
			var i = n[r];
			i === "style" ? this.useStyle(t[i]) : e.prototype.attrKV.call(this, i, t[i]);
		}
		this.style || this.useStyle({});
	}, t.prototype.beforeBrush = function(e) {}, t.prototype.afterBrush = function() {}, t.prototype.innerBeforeBrush = function() {}, t.prototype.innerAfterBrush = function() {}, t.prototype.shouldBePainted = function(e, t, n, r) {
		var i = this.transform;
		if (this.ignore || this.invisible || this.style.opacity === 0 || this.culling && uc(this, e, t) || i && !i[0] && !i[3]) return !1;
		if (n && this.__clipPaths && this.__clipPaths.length) {
			for (var a = 0; a < this.__clipPaths.length; ++a) if (this.__clipPaths[a].isZeroArea()) return !1;
		}
		if (r && this.parent) for (var o = this.parent; o;) {
			if (o.ignore) return !1;
			o = o.parent;
		}
		return !0;
	}, t.prototype.contain = function(e, t) {
		return this.rectContain(e, t);
	}, t.prototype.traverse = function(e, t) {
		e.call(t, this);
	}, t.prototype.rectContain = function(e, t) {
		var n = this.transformCoordToLocal(e, t);
		return this.getBoundingRect().contain(n[0], n[1]);
	}, t.prototype.getPaintRect = function() {
		var e = this._paintRect;
		if (!this._paintRect || this.__dirty) {
			var t = this.transform, n = this.getBoundingRect(), r = this.style, i = r.shadowBlur || 0, a = r.shadowOffsetX || 0, o = r.shadowOffsetY || 0;
			e = this._paintRect ||= new J(0, 0, 0, 0), t ? J.applyTransform(e, n, t) : e.copy(n), (i || a || o) && (e.width += i * 2 + Math.abs(a), e.height += i * 2 + Math.abs(o), e.x = Math.min(e.x, e.x + a - i), e.y = Math.min(e.y, e.y + o - i));
			var s = this.dirtyRectTolerance;
			e.isZero() || (e.x = Math.floor(e.x - s), e.y = Math.floor(e.y - s), e.width = Math.ceil(e.width + 1 + s * 2), e.height = Math.ceil(e.height + 1 + s * 2));
		}
		return e;
	}, t.prototype.setPrevPaintRect = function(e) {
		e ? (this._prevPaintRect = this._prevPaintRect || new J(0, 0, 0, 0), this._prevPaintRect.copy(e)) : this._prevPaintRect = null;
	}, t.prototype.getPrevPaintRect = function() {
		return this._prevPaintRect;
	}, t.prototype.animateStyle = function(e) {
		return this.animate("style", e);
	}, t.prototype.updateDuringAnimation = function(e) {
		e === "style" ? this.dirtyStyle() : this.markRedraw();
	}, t.prototype.attrKV = function(t, n) {
		t === "style" ? this.style ? this.setStyle(n) : this.useStyle(n) : e.prototype.attrKV.call(this, t, n);
	}, t.prototype.setStyle = function(e, t) {
		return typeof e == "string" ? this.style[e] = t : M(this.style, e), this.dirtyStyle(), this;
	}, t.prototype.dirtyStyle = function(e) {
		e || this.markRedraw(), this.__dirty |= 2, this._rect &&= null;
	}, t.prototype.dirty = function() {
		this.dirtyStyle();
	}, t.prototype.styleChanged = function() {
		return !!(this.__dirty & 2);
	}, t.prototype.styleUpdated = function() {
		this.__dirty &= -3;
	}, t.prototype.createStyle = function(e) {
		return Oe(rc, e);
	}, t.prototype.useStyle = function(e) {
		e[nc] || (e = this.createStyle(e)), this.style = e, this.dirtyStyle();
	}, t.prototype._useHoverStyle = function(e) {
		this.__hoverStyle = e;
	}, t.prototype.isStyleObject = function(e) {
		return e[nc];
	}, t.prototype._innerSaveToNormal = function(t) {
		e.prototype._innerSaveToNormal.call(this, t);
		var n = this._normalState;
		t.style && !n.style && (n.style = this._mergeStyle(this.createStyle(), this.style)), this._savePrimaryToNormal(t, n, ac);
	}, t.prototype._applyStateObj = function(t, n, r, i, a, o) {
		e.prototype._applyStateObj.call(this, t, n, r, i, a, o);
		var s = !(n && i), c = this.__inHover === 1, l;
		if (n && n.style ? a ? i ? l = n.style : (l = this._mergeStyle(this.createStyle(), r.style), this._mergeStyle(l, n.style)) : (l = this._mergeStyle(this.createStyle(), i ? this.style : r.style), this._mergeStyle(l, n.style)) : s && (l = r.style), l) {
			if (a) {
				var u = this.style;
				if (this.style = this.createStyle(s ? {} : u), s) for (var d = z(u), f = 0; f < d.length; f++) {
					var p = d[f];
					p in l && (l[p] = l[p], this.style[p] = u[p]);
				}
				for (var m = z(l), f = 0; f < m.length; f++) {
					var p = m[f];
					this.style[p] = this.style[p];
				}
				this._transitionState(t, { style: l }, o, this.getAnimationStyleProps());
			} else c ? this._useHoverStyle(l) : this.useStyle(l);
		}
		if (!c) for (var h = this.__inHover ? oc : ac, f = 0; f < h.length; f++) {
			var p = h[f];
			n && n[p] != null ? this[p] = n[p] : s && r[p] != null && (this[p] = r[p]);
		}
	}, t.prototype._mergeStates = function(t) {
		for (var n = e.prototype._mergeStates.call(this, t), r, i = 0; i < t.length; i++) {
			var a = t[i];
			a.style && (r ||= {}, this._mergeStyle(r, a.style));
		}
		return r && (n.style = r), n;
	}, t.prototype._mergeStyle = function(e, t) {
		return M(e, t), e;
	}, t.prototype.getAnimationStyleProps = function() {
		return ic;
	}, t.initDefaultProps = (function() {
		var e = t.prototype;
		e.type = "displayable", e.invisible = !1, e.z = 0, e.z2 = 0, e.zlevel = 0, e.culling = !1, e.cursor = "pointer", e.rectHover = !1, e.incremental = 0, e._rect = null, e.dirtyRectTolerance = 0, e.__dirty = 3;
	})(), t;
}(sa), cc = new J(0, 0, 0, 0), lc = new J(0, 0, 0, 0);
function uc(e, t, n) {
	return cc.copy(e.getBoundingRect()), e.transform && cc.applyTransform(e.transform), lc.width = t, lc.height = n, !cc.intersect(lc);
}
//#endregion
//#region node_modules/zrender/lib/core/bbox.js
var dc = Math.min, fc = Math.max, pc = Math.sin, mc = Math.cos, hc = Math.PI * 2, gc = Ne(), _c = Ne(), vc = Ne();
function yc(e, t, n, r, i, a) {
	i[0] = dc(e, n), i[1] = dc(t, r), a[0] = fc(e, n), a[1] = fc(t, r);
}
var bc = [], xc = [];
function Sc(e, t, n, r, i, a, o, s, c, l) {
	var u = Gn, d = Hn, f = u(e, n, i, o, bc);
	c[0] = Infinity, c[1] = Infinity, l[0] = -Infinity, l[1] = -Infinity;
	for (var p = 0; p < f; p++) {
		var m = d(e, n, i, o, bc[p]);
		c[0] = dc(m, c[0]), l[0] = fc(m, l[0]);
	}
	f = u(t, r, a, s, xc);
	for (var p = 0; p < f; p++) {
		var h = d(t, r, a, s, xc[p]);
		c[1] = dc(h, c[1]), l[1] = fc(h, l[1]);
	}
	c[0] = dc(e, c[0]), l[0] = fc(e, l[0]), c[0] = dc(o, c[0]), l[0] = fc(o, l[0]), c[1] = dc(t, c[1]), l[1] = fc(t, l[1]), c[1] = dc(s, c[1]), l[1] = fc(s, l[1]);
}
function Cc(e, t, n, r, i, a, o, s) {
	var c = Qn, l = Yn, u = fc(dc(c(e, n, i), 1), 0), d = fc(dc(c(t, r, a), 1), 0), f = l(e, n, i, u), p = l(t, r, a, d);
	o[0] = dc(e, i, f), o[1] = dc(t, a, p), s[0] = fc(e, i, f), s[1] = fc(t, a, p);
}
function wc(e, t, n, r, i, a, o, s, c) {
	var l = qe, u = Je, d = Math.abs(i - a);
	if (d % hc < 1e-4 && d > 1e-4) {
		s[0] = e - n, s[1] = t - r, c[0] = e + n, c[1] = t + r;
		return;
	}
	if (gc[0] = mc(i) * n + e, gc[1] = pc(i) * r + t, _c[0] = mc(a) * n + e, _c[1] = pc(a) * r + t, l(s, gc, _c), u(c, gc, _c), i %= hc, i < 0 && (i += hc), a %= hc, a < 0 && (a += hc), i > a && !o ? a += hc : i < a && o && (i += hc), o) {
		var f = a;
		a = i, i = f;
	}
	for (var p = 0; p < a; p += Math.PI / 2) p > i && (vc[0] = mc(p) * n + e, vc[1] = pc(p) * r + t, l(s, vc, s), u(c, vc, c));
}
//#endregion
//#region node_modules/zrender/lib/core/PathProxy.js
var Z = {
	M: 1,
	L: 2,
	C: 3,
	Q: 4,
	A: 5,
	Z: 6,
	R: 7
}, Tc = [], Ec = [], Dc = [], Oc = [], kc = [], Ac = [], jc = Math.min, Mc = Math.max, Nc = Math.cos, Pc = Math.sin, Fc = Math.abs, Ic = Math.PI, Lc = Ic * 2, Rc = typeof Float32Array < "u", zc = [];
function Bc(e) {
	return Math.round(e / Ic * 1e8) / 1e8 % 2 * Ic;
}
function Vc(e, t) {
	var n = Bc(e[0]);
	n < 0 && (n += Lc);
	var r = n - e[0], i = e[1];
	i += r, !t && i - n >= Lc ? i = n + Lc : t && n - i >= Lc ? i = n - Lc : !t && n > i ? i = n + (Lc - Bc(n - i)) : t && n < i && (i = n - (Lc - Bc(i - n))), e[0] = n, e[1] = i;
}
var Hc = function() {
	function e(e) {
		this.dpr = 1, this._xi = 0, this._yi = 0, this._x0 = 0, this._y0 = 0, this._len = 0, e && (this._saveData = !1), this._saveData && (this.data = []);
	}
	return e.prototype.increaseVersion = function() {
		this._version++;
	}, e.prototype.getVersion = function() {
		return this._version;
	}, e.prototype.setScale = function(e, t, n) {
		n ||= 0, n > 0 && (this._ux = Fc(n / Ti / e) || 0, this._uy = Fc(n / Ti / t) || 0);
	}, e.prototype.setDPR = function(e) {
		this.dpr = e;
	}, e.prototype.setContext = function(e) {
		this._ctx = e;
	}, e.prototype.getContext = function() {
		return this._ctx;
	}, e.prototype.beginPath = function() {
		return this._ctx && this._ctx.beginPath(), this.reset(), this;
	}, e.prototype.reset = function() {
		this._saveData && (this._len = 0), this._pathSegLen && (this._pathSegLen = null, this._pathLen = 0), this._version++;
	}, e.prototype.moveTo = function(e, t) {
		return this._drawPendingPt(), this.addData(Z.M, e, t), this._ctx && this._ctx.moveTo(e, t), this._x0 = e, this._y0 = t, this._xi = e, this._yi = t, this;
	}, e.prototype.lineTo = function(e, t) {
		var n = Fc(e - this._xi), r = Fc(t - this._yi), i = n > this._ux || r > this._uy;
		if (this.addData(Z.L, e, t), this._ctx && i && this._ctx.lineTo(e, t), i) this._xi = e, this._yi = t, this._pendingPtDist = 0;
		else {
			var a = n * n + r * r;
			a > this._pendingPtDist && (this._pendingPtX = e, this._pendingPtY = t, this._pendingPtDist = a);
		}
		return this;
	}, e.prototype.bezierCurveTo = function(e, t, n, r, i, a) {
		return this._drawPendingPt(), this.addData(Z.C, e, t, n, r, i, a), this._ctx && this._ctx.bezierCurveTo(e, t, n, r, i, a), this._xi = i, this._yi = a, this;
	}, e.prototype.quadraticCurveTo = function(e, t, n, r) {
		return this._drawPendingPt(), this.addData(Z.Q, e, t, n, r), this._ctx && this._ctx.quadraticCurveTo(e, t, n, r), this._xi = n, this._yi = r, this;
	}, e.prototype.arc = function(e, t, n, r, i, a) {
		this._drawPendingPt(), zc[0] = r, zc[1] = i, Vc(zc, a), r = zc[0], i = zc[1];
		var o = i - r;
		return this.addData(Z.A, e, t, n, n, r, o, 0, +!a), this._ctx && this._ctx.arc(e, t, n, r, i, a), this._xi = Nc(i) * n + e, this._yi = Pc(i) * n + t, this;
	}, e.prototype.arcTo = function(e, t, n, r, i) {
		return this._drawPendingPt(), this._ctx && this._ctx.arcTo(e, t, n, r, i), this;
	}, e.prototype.rect = function(e, t, n, r) {
		return this._drawPendingPt(), this._ctx && this._ctx.rect(e, t, n, r), this.addData(Z.R, e, t, n, r), this;
	}, e.prototype.closePath = function() {
		this._drawPendingPt(), this.addData(Z.Z);
		var e = this._ctx, t = this._x0, n = this._y0;
		return e && e.closePath(), this._xi = t, this._yi = n, this;
	}, e.prototype.fill = function(e) {
		e && e.fill(), this.toStatic();
	}, e.prototype.stroke = function(e) {
		e && e.stroke(), this.toStatic();
	}, e.prototype.len = function() {
		return this._len;
	}, e.prototype.setData = function(e) {
		if (this._saveData) {
			var t = e.length;
			!(this.data && this.data.length === t) && Rc && (this.data = new Float32Array(t));
			for (var n = 0; n < t; n++) this.data[n] = e[n];
			this._len = t;
		}
	}, e.prototype.appendPath = function(e) {
		if (this._saveData) {
			e instanceof Array || (e = [e]);
			for (var t = e.length, n = 0, r = this._len, i = 0; i < t; i++) n += e[i].len();
			var a = this.data;
			if (Rc && (a instanceof Float32Array || !a) && (this.data = new Float32Array(r + n), r > 0 && a)) for (var o = 0; o < r; o++) this.data[o] = a[o];
			for (var i = 0; i < t; i++) for (var s = e[i].data, o = 0; o < s.length; o++) this.data[r++] = s[o];
			this._len = r;
		}
	}, e.prototype.addData = function(e, t, n, r, i, a, o, s, c) {
		if (this._saveData) {
			var l = this.data;
			this._len + arguments.length > l.length && (this._expandData(), l = this.data);
			for (var u = 0; u < arguments.length; u++) l[this._len++] = arguments[u];
		}
	}, e.prototype._drawPendingPt = function() {
		this._pendingPtDist > 0 && (this._ctx && this._ctx.lineTo(this._pendingPtX, this._pendingPtY), this._pendingPtDist = 0);
	}, e.prototype._expandData = function() {
		if (!(this.data instanceof Array)) {
			for (var e = [], t = 0; t < this._len; t++) e[t] = this.data[t];
			this.data = e;
		}
	}, e.prototype.toStatic = function() {
		if (this._saveData) {
			this._drawPendingPt();
			var e = this.data;
			e instanceof Array && (e.length = this._len, Rc && this._len > 11 && (this.data = new Float32Array(e)));
		}
	}, e.prototype.getBoundingRect = function() {
		Dc[0] = Dc[1] = kc[0] = kc[1] = Number.MAX_VALUE, Oc[0] = Oc[1] = Ac[0] = Ac[1] = -Number.MAX_VALUE;
		for (var e = this.data, t = 0, n = 0, r = 0, i = 0, a = 0; a < this._len;) {
			var o = e[a++], s = a === 1;
			switch (s && (t = e[a], n = e[a + 1], r = t, i = n), o) {
				case Z.M:
					t = r = e[a++], n = i = e[a++], kc[0] = r, kc[1] = i, Ac[0] = r, Ac[1] = i;
					break;
				case Z.L:
					yc(t, n, e[a], e[a + 1], kc, Ac), t = e[a++], n = e[a++];
					break;
				case Z.C:
					Sc(t, n, e[a++], e[a++], e[a++], e[a++], e[a], e[a + 1], kc, Ac), t = e[a++], n = e[a++];
					break;
				case Z.Q:
					Cc(t, n, e[a++], e[a++], e[a], e[a + 1], kc, Ac), t = e[a++], n = e[a++];
					break;
				case Z.A:
					var c = e[a++], l = e[a++], u = e[a++], d = e[a++], f = e[a++], p = e[a++] + f;
					a += 1;
					var m = !e[a++];
					s && (r = Nc(f) * u + c, i = Pc(f) * d + l), wc(c, l, u, d, f, p, m, kc, Ac), t = Nc(p) * u + c, n = Pc(p) * d + l;
					break;
				case Z.R:
					r = t = e[a++], i = n = e[a++];
					var h = e[a++], g = e[a++];
					yc(r, i, r + h, i + g, kc, Ac);
					break;
				case Z.Z: t = r, n = i;
			}
			qe(Dc, Dc, kc), Je(Oc, Oc, Ac);
		}
		return a === 0 && (Dc[0] = Dc[1] = Oc[0] = Oc[1] = 0), new J(Dc[0], Dc[1], Oc[0] - Dc[0], Oc[1] - Dc[1]);
	}, e.prototype._calculateLength = function() {
		var e = this.data, t = this._len, n = this._ux, r = this._uy, i = 0, a = 0, o = 0, s = 0;
		this._pathSegLen ||= [];
		for (var c = this._pathSegLen, l = 0, u = 0, d = 0; d < t;) {
			var f = e[d++], p = d === 1;
			p && (i = e[d], a = e[d + 1], o = i, s = a);
			var m = -1;
			switch (f) {
				case Z.M:
					i = o = e[d++], a = s = e[d++];
					break;
				case Z.L:
					var h = e[d++], g = e[d++], _ = h - i, v = g - a;
					(Fc(_) > n || Fc(v) > r || d === t - 1) && (m = Math.sqrt(_ * _ + v * v), i = h, a = g);
					break;
				case Z.C:
					var y = e[d++], b = e[d++], h = e[d++], g = e[d++], x = e[d++], S = e[d++];
					m = Jn(i, a, y, b, h, g, x, S, 10), i = x, a = S;
					break;
				case Z.Q:
					var y = e[d++], b = e[d++], h = e[d++], g = e[d++];
					m = tr(i, a, y, b, h, g, 10), i = h, a = g;
					break;
				case Z.A:
					var C = e[d++], w = e[d++], T = e[d++], E = e[d++], D = e[d++], O = e[d++], k = O + D;
					d += 1, p && (o = Nc(D) * T + C, s = Pc(D) * E + w), m = Mc(T, E) * jc(Lc, Math.abs(O)), i = Nc(k) * T + C, a = Pc(k) * E + w;
					break;
				case Z.R:
					o = i = e[d++], s = a = e[d++];
					var A = e[d++], j = e[d++];
					m = A * 2 + j * 2;
					break;
				case Z.Z:
					var _ = o - i, v = s - a;
					m = Math.sqrt(_ * _ + v * v), i = o, a = s;
			}
			m >= 0 && (c[u++] = m, l += m);
		}
		return this._pathLen = l, l;
	}, e.prototype.rebuildPath = function(e, t) {
		var n = this.data, r = this._ux, i = this._uy, a = this._len, o, s, c, l, u, d, f = t < 1, p, m, h = 0, g = 0, _, v = 0, y, b;
		if (!(f && (this._pathSegLen || this._calculateLength(), p = this._pathSegLen, m = this._pathLen, _ = t * m, !_))) lo: for (var x = 0; x < a;) {
			var S = n[x++], C = x === 1;
			switch (C && (c = n[x], l = n[x + 1], o = c, s = l), S !== Z.L && v > 0 && (e.lineTo(y, b), v = 0), S) {
				case Z.M:
					o = c = n[x++], s = l = n[x++], e.moveTo(c, l);
					break;
				case Z.L:
					u = n[x++], d = n[x++];
					var w = Fc(u - c), T = Fc(d - l);
					if (w > r || T > i) {
						if (f) {
							var E = p[g++];
							if (h + E > _) {
								var D = (_ - h) / E;
								e.lineTo(c * (1 - D) + u * D, l * (1 - D) + d * D);
								break lo;
							}
							h += E;
						}
						e.lineTo(u, d), c = u, l = d, v = 0;
					} else {
						var O = w * w + T * T;
						O > v && (y = u, b = d, v = O);
					}
					break;
				case Z.C:
					var k = n[x++], A = n[x++], j = n[x++], M = n[x++], ee = n[x++], N = n[x++];
					if (f) {
						var E = p[g++];
						if (h + E > _) {
							var D = (_ - h) / E;
							Kn(c, k, j, ee, D, Tc), Kn(l, A, M, N, D, Ec), e.bezierCurveTo(Tc[1], Ec[1], Tc[2], Ec[2], Tc[3], Ec[3]);
							break lo;
						}
						h += E;
					}
					e.bezierCurveTo(k, A, j, M, ee, N), c = ee, l = N;
					break;
				case Z.Q:
					var k = n[x++], A = n[x++], j = n[x++], M = n[x++];
					if (f) {
						var E = p[g++];
						if (h + E > _) {
							var D = (_ - h) / E;
							$n(c, k, j, D, Tc), $n(l, A, M, D, Ec), e.quadraticCurveTo(Tc[1], Ec[1], Tc[2], Ec[2]);
							break lo;
						}
						h += E;
					}
					e.quadraticCurveTo(k, A, j, M), c = j, l = M;
					break;
				case Z.A:
					var P = n[x++], te = n[x++], F = n[x++], I = n[x++], L = n[x++], R = n[x++], ne = n[x++], re = !n[x++], ie = F > I ? F : I, z = Fc(F - I) > .001, ae = L + R, B = !1;
					if (f) {
						var E = p[g++];
						h + E > _ && (ae = L + R * (_ - h) / E, B = !0), h += E;
					}
					if (z && e.ellipse ? e.ellipse(P, te, F, I, ne, L, ae, re) : e.arc(P, te, ie, L, ae, re), B) break lo;
					C && (o = Nc(L) * F + P, s = Pc(L) * I + te), c = Nc(ae) * F + P, l = Pc(ae) * I + te;
					break;
				case Z.R:
					o = c = n[x], s = l = n[x + 1], u = n[x++], d = n[x++];
					var V = n[x++], H = n[x++];
					if (f) {
						var E = p[g++];
						if (h + E > _) {
							var U = _ - h;
							e.moveTo(u, d), e.lineTo(u + jc(U, V), d), U -= V, U > 0 && e.lineTo(u + V, d + jc(U, H)), U -= H, U > 0 && e.lineTo(u + Mc(V - U, 0), d + H), U -= V, U > 0 && e.lineTo(u, d + Mc(H - U, 0));
							break lo;
						}
						h += E;
					}
					e.rect(u, d, V, H);
					break;
				case Z.Z:
					if (f) {
						var E = p[g++];
						if (h + E > _) {
							var D = (_ - h) / E;
							e.lineTo(c * (1 - D) + o * D, l * (1 - D) + s * D);
							break lo;
						}
						h += E;
					}
					e.closePath(), c = o, l = s;
			}
		}
	}, e.prototype.clone = function() {
		var t = new e(), n = this.data;
		return t.data = n.slice ? n.slice() : Array.prototype.slice.call(n), t._len = this._len, t;
	}, e.prototype.canSave = function() {
		return !!this._saveData;
	}, e.CMD = Z, e.initDefaultProps = (function() {
		var t = e.prototype;
		t._saveData = !0, t._ux = 0, t._uy = 0, t._pendingPtDist = 0, t._version = 0;
	})(), e;
}();
//#endregion
//#region node_modules/zrender/lib/contain/line.js
function Uc(e, t, n, r, i, a, o) {
	if (i === 0) return !1;
	var s = i, c = 0, l = e;
	if (o > t + s && o > r + s || o < t - s && o < r - s || a > e + s && a > n + s || a < e - s && a < n - s) return !1;
	if (e !== n) c = (t - r) / (e - n), l = (e * r - n * t) / (e - n);
	else return Math.abs(a - e) <= s / 2;
	var u = c * a - o + l;
	return u * u / (c * c + 1) <= s / 2 * s / 2;
}
//#endregion
//#region node_modules/zrender/lib/contain/cubic.js
function Wc(e, t, n, r, i, a, o, s, c, l, u) {
	if (c === 0) return !1;
	var d = c;
	return u > t + d && u > r + d && u > a + d && u > s + d || u < t - d && u < r - d && u < a - d && u < s - d || l > e + d && l > n + d && l > i + d && l > o + d || l < e - d && l < n - d && l < i - d && l < o - d ? !1 : qn(e, t, n, r, i, a, o, s, l, u, null) <= d / 2;
}
//#endregion
//#region node_modules/zrender/lib/contain/quadratic.js
function Gc(e, t, n, r, i, a, o, s, c) {
	if (o === 0) return !1;
	var l = o;
	return c > t + l && c > r + l && c > a + l || c < t - l && c < r - l && c < a - l || s > e + l && s > n + l && s > i + l || s < e - l && s < n - l && s < i - l ? !1 : er(e, t, n, r, i, a, s, c, null) <= l / 2;
}
//#endregion
//#region node_modules/zrender/lib/contain/util.js
var Kc = Math.PI * 2;
function qc(e) {
	return e %= Kc, e < 0 && (e += Kc), e;
}
//#endregion
//#region node_modules/zrender/lib/contain/arc.js
var Jc = Math.PI * 2;
function Yc(e, t, n, r, i, a, o, s, c) {
	if (o === 0) return !1;
	var l = o;
	s -= e, c -= t;
	var u = Math.sqrt(s * s + c * c);
	if (u - l > n || u + l < n) return !1;
	if (Math.abs(r - i) % Jc < 1e-4) return !0;
	if (a) {
		var d = r;
		r = qc(i), i = qc(d);
	} else r = qc(r), i = qc(i);
	r > i && (i += Jc);
	var f = Math.atan2(c, s);
	return f < 0 && (f += Jc), f >= r && f <= i || f + Jc >= r && f + Jc <= i;
}
//#endregion
//#region node_modules/zrender/lib/contain/windingLine.js
function Xc(e, t, n, r, i, a) {
	if (a > t && a > r || a < t && a < r || r === t) return 0;
	var o = (a - t) / (r - t), s = r < t ? 1 : -1;
	(o === 1 || o === 0) && (s = r < t ? .5 : -.5);
	var c = o * (n - e) + e;
	return c === i ? Infinity : c > i ? s : 0;
}
//#endregion
//#region node_modules/zrender/lib/contain/path.js
var Zc = Hc.CMD, Qc = Math.PI * 2, $c = 1e-4;
function el(e, t) {
	return Math.abs(e - t) < $c;
}
var tl = [
	-1,
	-1,
	-1
], nl = [-1, -1];
function rl() {
	var e = nl[0];
	nl[0] = nl[1], nl[1] = e;
}
function il(e, t, n, r, i, a, o, s, c, l) {
	if (l > t && l > r && l > a && l > s || l < t && l < r && l < a && l < s) return 0;
	var u = Wn(t, r, a, s, l, tl);
	if (u === 0) return 0;
	for (var d = 0, f = -1, p = void 0, m = void 0, h = 0; h < u; h++) {
		var g = tl[h], _ = g === 0 || g === 1 ? .5 : 1;
		Hn(e, n, i, o, g) < c || (f < 0 && (f = Gn(t, r, a, s, nl), nl[1] < nl[0] && f > 1 && rl(), p = Hn(t, r, a, s, nl[0]), f > 1 && (m = Hn(t, r, a, s, nl[1]))), f === 2 ? g < nl[0] ? d += p < t ? _ : -_ : g < nl[1] ? d += m < p ? _ : -_ : d += s < m ? _ : -_ : g < nl[0] ? d += p < t ? _ : -_ : d += s < p ? _ : -_);
	}
	return d;
}
function al(e, t, n, r, i, a, o, s) {
	if (s > t && s > r && s > a || s < t && s < r && s < a) return 0;
	var c = Zn(t, r, a, s, tl);
	if (c === 0) return 0;
	var l = Qn(t, r, a);
	if (l >= 0 && l <= 1) {
		for (var u = 0, d = Yn(t, r, a, l), f = 0; f < c; f++) {
			var p = tl[f] === 0 || tl[f] === 1 ? .5 : 1, m = Yn(e, n, i, tl[f]);
			m < o || (tl[f] < l ? u += d < t ? p : -p : u += a < d ? p : -p);
		}
		return u;
	}
	var p = tl[0] === 0 || tl[0] === 1 ? .5 : 1, m = Yn(e, n, i, tl[0]);
	return m < o ? 0 : a < t ? p : -p;
}
function ol(e, t, n, r, i, a, o, s) {
	if (s -= t, s > n || s < -n) return 0;
	var c = Math.sqrt(n * n - s * s);
	tl[0] = -c, tl[1] = c;
	var l = Math.abs(r - i);
	if (l < 1e-4) return 0;
	if (l >= Qc - 1e-4) {
		r = 0, i = Qc;
		var u = a ? 1 : -1;
		return o >= tl[0] + e && o <= tl[1] + e ? u : 0;
	}
	if (r > i) {
		var d = r;
		r = i, i = d;
	}
	r < 0 && (r += Qc, i += Qc);
	for (var f = 0, p = 0; p < 2; p++) {
		var m = tl[p];
		if (m + e > o) {
			var h = Math.atan2(s, m), u = a ? 1 : -1;
			h < 0 && (h = Qc + h), (h >= r && h <= i || h + Qc >= r && h + Qc <= i) && (h > Math.PI / 2 && h < Math.PI * 1.5 && (u = -u), f += u);
		}
	}
	return f;
}
function sl(e, t, n, r, i) {
	for (var a = e.data, o = e.len(), s = 0, c = 0, l = 0, u = 0, d = 0, f, p, m = 0; m < o;) {
		var h = a[m++], g = m === 1;
		switch (h === Zc.M && m > 1 && (n || (s += Xc(c, l, u, d, r, i))), g && (c = a[m], l = a[m + 1], u = c, d = l), h) {
			case Zc.M:
				u = a[m++], d = a[m++], c = u, l = d;
				break;
			case Zc.L:
				if (n) {
					if (Uc(c, l, a[m], a[m + 1], t, r, i)) return !0;
				} else s += Xc(c, l, a[m], a[m + 1], r, i) || 0;
				c = a[m++], l = a[m++];
				break;
			case Zc.C:
				if (n) {
					if (Wc(c, l, a[m++], a[m++], a[m++], a[m++], a[m], a[m + 1], t, r, i)) return !0;
				} else s += il(c, l, a[m++], a[m++], a[m++], a[m++], a[m], a[m + 1], r, i) || 0;
				c = a[m++], l = a[m++];
				break;
			case Zc.Q:
				if (n) {
					if (Gc(c, l, a[m++], a[m++], a[m], a[m + 1], t, r, i)) return !0;
				} else s += al(c, l, a[m++], a[m++], a[m], a[m + 1], r, i) || 0;
				c = a[m++], l = a[m++];
				break;
			case Zc.A:
				var _ = a[m++], v = a[m++], y = a[m++], b = a[m++], x = a[m++], S = a[m++];
				m += 1;
				var C = !!(1 - a[m++]);
				f = Math.cos(x) * y + _, p = Math.sin(x) * b + v, g ? (u = f, d = p) : s += Xc(c, l, f, p, r, i);
				var w = (r - _) * b / y + _;
				if (n) {
					if (Yc(_, v, b, x, x + S, C, t, w, i)) return !0;
				} else s += ol(_, v, b, x, x + S, C, w, i);
				c = Math.cos(x + S) * y + _, l = Math.sin(x + S) * b + v;
				break;
			case Zc.R:
				u = c = a[m++], d = l = a[m++];
				var T = a[m++], E = a[m++];
				if (f = u + T, p = d + E, n) {
					if (Uc(u, d, f, d, t, r, i) || Uc(f, d, f, p, t, r, i) || Uc(f, p, u, p, t, r, i) || Uc(u, p, u, d, t, r, i)) return !0;
				} else s += Xc(f, d, f, p, r, i), s += Xc(u, p, u, d, r, i);
				break;
			case Zc.Z:
				if (n) {
					if (Uc(c, l, u, d, t, r, i)) return !0;
				} else s += Xc(c, l, u, d, r, i);
				c = u, l = d;
		}
	}
	return !n && !el(l, d) && (s += Xc(c, l, u, d, r, i) || 0), s !== 0;
}
function cl(e, t, n) {
	return sl(e, 0, !1, t, n);
}
function ll(e, t, n, r) {
	return sl(e, t, !0, n, r);
}
//#endregion
//#region node_modules/zrender/lib/graphic/Path.js
var ul = N({
	fill: "#000",
	stroke: null,
	strokePercent: 1,
	fillOpacity: 1,
	strokeOpacity: 1,
	lineDashOffset: 0,
	lineWidth: 1,
	lineCap: "butt",
	miterLimit: 10,
	strokeNoScale: !1,
	strokeFirst: !1
}, rc), dl = { style: N({
	fill: !0,
	stroke: !0,
	strokePercent: !0,
	fillOpacity: !0,
	strokeOpacity: !0,
	lineDashOffset: !0,
	lineWidth: !0,
	miterLimit: !0
}, ic.style) }, fl = zi.concat([
	"invisible",
	"culling",
	"z",
	"z2",
	"zlevel",
	"parent"
]), pl = function(e) {
	r(t, e);
	function t(t) {
		return e.call(this, t) || this;
	}
	return t.prototype.update = function() {
		var n = this;
		e.prototype.update.call(this);
		var r = this.style;
		if (r.decal) {
			var i = this._decalEl = this._decalEl || new t();
			i.buildPath === t.prototype.buildPath && (i.buildPath = function(e) {
				n.buildPath(e, n.shape);
			}), i.silent = !0;
			var a = i.style;
			for (var o in r) a[o] !== r[o] && (a[o] = r[o]);
			a.fill = r.fill ? r.decal : null, a.decal = null, a.shadowColor = null, r.strokeFirst && (a.stroke = null);
			for (var s = 0; s < fl.length; ++s) i[fl[s]] = this[fl[s]];
			i.__dirty |= 1;
		} else this._decalEl &&= null;
	}, t.prototype.getDecalElement = function() {
		return this._decalEl;
	}, t.prototype._init = function(t) {
		var n = z(t);
		this.shape = this.getDefaultShape();
		var r = this.getDefaultStyle();
		r && this.useStyle(r);
		for (var i = 0; i < n.length; i++) {
			var a = n[i], o = t[a];
			a === "style" ? this.style ? M(this.style, o) : this.useStyle(o) : a === "shape" ? M(this.shape, o) : e.prototype.attrKV.call(this, a, o);
		}
		this.style || this.useStyle({});
	}, t.prototype.getDefaultStyle = function() {
		return null;
	}, t.prototype.getDefaultShape = function() {
		return {};
	}, t.prototype.canBeInsideText = function() {
		return this.hasFill();
	}, t.prototype.getInsideTextFill = function() {
		var e = this.style.fill;
		if (e !== "none") {
			if (W(e)) {
				var t = kr(e, 0);
				return t > .5 ? Di : t > .2 ? ki : Oi;
			}
			if (e) return Oi;
		}
		return Di;
	}, t.prototype.getInsideTextStroke = function(e) {
		var t = this.style.fill;
		if (W(t)) {
			var n = this.__zr;
			if (!!(n && n.isDarkMode()) == kr(e, 0) < .4) return t;
		}
	}, t.prototype.buildPath = function(e, t, n) {}, t.prototype.pathUpdated = function() {
		this.__dirty &= -5;
	}, t.prototype.getUpdatedPathProxy = function(e) {
		return !this.path && this.createPathProxy(), this.path.beginPath(), this.buildPath(this.path, this.shape, e), this.path;
	}, t.prototype.createPathProxy = function() {
		this.path = new Hc(!1);
	}, t.prototype.hasStroke = function() {
		var e = this.style, t = e.stroke;
		return !(t == null || t === "none" || !(e.lineWidth > 0));
	}, t.prototype.hasFill = function() {
		var e = this.style.fill;
		return e != null && e !== "none";
	}, t.prototype.getBoundingRect = function() {
		var e = this._rect, t = this.style, n = !e;
		if (n) {
			var r = !1;
			this.path || (r = !0, this.createPathProxy());
			var i = this.path;
			(r || this.__dirty & 4) && (i.beginPath(), this.buildPath(i, this.shape, !1), this.pathUpdated()), e = i.getBoundingRect();
		}
		if (this._rect = e, this.hasStroke() && this.path && this.path.len() > 0) {
			var a = this._rectStroke ||= e.clone();
			if (this.__dirty || n) {
				a.copy(e);
				var o = t.strokeNoScale ? this.getLineScale() : 1, s = t.lineWidth;
				if (!this.hasFill()) {
					var c = this.strokeContainThreshold;
					s = Math.max(s, c ?? 4);
				}
				o > 1e-10 && (a.width += s / o, a.height += s / o, a.x -= s / o / 2, a.y -= s / o / 2);
			}
			return a;
		}
		return e;
	}, t.prototype.contain = function(e, t) {
		var n = this.transformCoordToLocal(e, t), r = this.getBoundingRect(), i = this.style;
		if (e = n[0], t = n[1], r.contain(e, t)) {
			var a = this.path;
			if (this.hasStroke()) {
				var o = i.lineWidth, s = i.strokeNoScale ? this.getLineScale() : 1;
				if (s > 1e-10 && (this.hasFill() || (o = Math.max(o, this.strokeContainThreshold)), ll(a, o / s, e, t))) return !0;
			}
			if (this.hasFill()) return cl(a, e, t);
		}
		return !1;
	}, t.prototype.dirtyShape = function() {
		this.__dirty |= 4, this._rect &&= null, this._decalEl && this._decalEl.dirtyShape(), this.markRedraw();
	}, t.prototype.dirty = function() {
		this.dirtyStyle(), this.dirtyShape();
	}, t.prototype.animateShape = function(e) {
		return this.animate("shape", e);
	}, t.prototype.updateDuringAnimation = function(e) {
		e === "style" ? this.dirtyStyle() : e === "shape" ? this.dirtyShape() : this.markRedraw();
	}, t.prototype.attrKV = function(t, n) {
		t === "shape" ? this.setShape(n) : e.prototype.attrKV.call(this, t, n);
	}, t.prototype.setShape = function(e, t) {
		var n = this.shape;
		return n ||= this.shape = {}, typeof e == "string" ? n[e] = t : M(n, e), this.dirtyShape(), this;
	}, t.prototype.shapeChanged = function() {
		return !!(this.__dirty & 4);
	}, t.prototype.createStyle = function(e) {
		return Oe(ul, e);
	}, t.prototype._innerSaveToNormal = function(t) {
		e.prototype._innerSaveToNormal.call(this, t);
		var n = this._normalState;
		t.shape && !n.shape && (n.shape = M({}, this.shape));
	}, t.prototype._applyStateObj = function(t, n, r, i, a, o) {
		if (e.prototype._applyStateObj.call(this, t, n, r, i, a, o), this.__inHover !== 1) {
			var s = !(n && i), c;
			if (n && n.shape ? a ? i ? c = n.shape : (c = M({}, r.shape), M(c, n.shape)) : (c = M({}, i ? this.shape : r.shape), M(c, n.shape)) : s && (c = r.shape), c) {
				if (a) {
					this.shape = M({}, this.shape);
					for (var l = {}, u = z(c), d = 0; d < u.length; d++) {
						var f = u[d];
						typeof c[f] == "object" ? this.shape[f] = c[f] : l[f] = c[f];
					}
					this._transitionState(t, { shape: l }, o);
				} else this.shape = c, this.dirtyShape();
			}
		}
	}, t.prototype._mergeStates = function(t) {
		for (var n = e.prototype._mergeStates.call(this, t), r, i = 0; i < t.length; i++) {
			var a = t[i];
			a.shape && (r ||= {}, this._mergeStyle(r, a.shape));
		}
		return r && (n.shape = r), n;
	}, t.prototype.getAnimationStyleProps = function() {
		return dl;
	}, t.prototype.isZeroArea = function() {
		return !1;
	}, t.extend = function(e) {
		var n = function(t) {
			r(n, t);
			function n(n) {
				var r = t.call(this, n) || this;
				return e.init && e.init.call(r, n), r;
			}
			return n.prototype.getDefaultStyle = function() {
				return k(e.style);
			}, n.prototype.getDefaultShape = function() {
				return k(e.shape);
			}, n;
		}(t);
		for (var i in e) typeof e[i] == "function" && (n.prototype[i] = e[i]);
		return n;
	}, t.initDefaultProps = (function() {
		var e = t.prototype;
		e.type = "path", e.strokeContainThreshold = 5, e.segmentIgnoreThreshold = 0, e.subPixelOptimize = !1, e.autoBatch = !1, e.__dirty = 7;
	})(), t;
}(sc), ml = N({
	strokeFirst: !0,
	font: s,
	x: 0,
	y: 0,
	textAlign: "left",
	textBaseline: "top",
	miterLimit: 2
}, ul), hl = function(e) {
	r(t, e);
	function t() {
		return e !== null && e.apply(this, arguments) || this;
	}
	return t.prototype.hasStroke = function() {
		return tc(this.style);
	}, t.prototype.hasFill = function() {
		var e = this.style.fill;
		return e != null && e !== "none";
	}, t.prototype.createStyle = function(e) {
		return Oe(ml, e);
	}, t.prototype.setBoundingRect = function(e) {
		this._rect = e;
	}, t.prototype.getBoundingRect = function() {
		return this._rect ||= $s(this.style), this._rect;
	}, t.initDefaultProps = (function() {
		var e = t.prototype;
		e.dirtyRectTolerance = 10;
	})(), t;
}(sc);
hl.prototype.type = "tspan";
//#endregion
//#region node_modules/zrender/lib/graphic/Image.js
var gl = N({
	x: 0,
	y: 0
}, rc), _l = { style: N({
	x: !0,
	y: !0,
	width: !0,
	height: !0,
	sx: !0,
	sy: !0,
	sWidth: !0,
	sHeight: !0
}, ic.style) };
function vl(e) {
	return !!(e && typeof e != "string" && e.width && e.height);
}
var yl = function(e) {
	r(t, e);
	function t() {
		return e !== null && e.apply(this, arguments) || this;
	}
	return t.prototype.createStyle = function(e) {
		return Oe(gl, e);
	}, t.prototype._getSize = function(e) {
		var t = this.style, n = t[e];
		if (n != null) return n;
		var r = vl(t.image) ? t.image : this.__image;
		if (!r) return 0;
		var i = e === "width" ? "height" : "width", a = t[i];
		return a == null ? r[e] : r[e] / r[i] * a;
	}, t.prototype.getWidth = function() {
		return this._getSize("width");
	}, t.prototype.getHeight = function() {
		return this._getSize("height");
	}, t.prototype.getAnimationStyleProps = function() {
		return _l;
	}, t.prototype.getBoundingRect = function() {
		var e = this.style;
		return this._rect ||= new J(e.x || 0, e.y || 0, this.getWidth(), this.getHeight()), this._rect;
	}, t;
}(sc);
yl.prototype.type = "image";
//#endregion
//#region node_modules/zrender/lib/graphic/helper/roundRect.js
function bl(e, t) {
	var n = t.x, r = t.y, i = t.width, a = t.height, o = t.r, s, c, l, u;
	i < 0 && (n += i, i = -i), a < 0 && (r += a, a = -a), typeof o == "number" ? s = c = l = u = o : o instanceof Array ? o.length === 1 ? s = c = l = u = o[0] : o.length === 2 ? (s = l = o[0], c = u = o[1]) : o.length === 3 ? (s = o[0], c = u = o[1], l = o[2]) : (s = o[0], c = o[1], l = o[2], u = o[3]) : s = c = l = u = 0;
	var d;
	s + c > i && (d = s + c, s *= i / d, c *= i / d), l + u > i && (d = l + u, l *= i / d, u *= i / d), c + l > a && (d = c + l, c *= a / d, l *= a / d), s + u > a && (d = s + u, s *= a / d, u *= a / d), e.moveTo(n + s, r), e.lineTo(n + i - c, r), c !== 0 && e.arc(n + i - c, r + c, c, -Math.PI / 2, 0), e.lineTo(n + i, r + a - l), l !== 0 && e.arc(n + i - l, r + a - l, l, 0, Math.PI / 2), e.lineTo(n + u, r + a), u !== 0 && e.arc(n + u, r + a - u, u, Math.PI / 2, Math.PI), e.lineTo(n, r + s), s !== 0 && e.arc(n + s, r + s, s, Math.PI, Math.PI * 1.5), e.closePath();
}
//#endregion
//#region node_modules/zrender/lib/graphic/helper/subPixelOptimize.js
var xl = Math.round;
function Sl(e, t, n) {
	if (t) {
		var r = t.x1, i = t.x2, a = t.y1, o = t.y2;
		e.x1 = r, e.x2 = i, e.y1 = a, e.y2 = o;
		var s = n && n.lineWidth;
		return s ? (xl(r * 2) === xl(i * 2) && (e.x1 = e.x2 = wl(r, s, !0)), xl(a * 2) === xl(o * 2) && (e.y1 = e.y2 = wl(a, s, !0)), e) : e;
	}
}
function Cl(e, t, n) {
	if (t) {
		var r = t.x, i = t.y, a = t.width, o = t.height;
		e.x = r, e.y = i, e.width = a, e.height = o;
		var s = n && n.lineWidth;
		return s ? (e.x = wl(r, s, !0), e.y = wl(i, s, !0), e.width = Math.max(wl(r + a, s, !1) - e.x, a === 0 ? 0 : 1), e.height = Math.max(wl(i + o, s, !1) - e.y, o === 0 ? 0 : 1), e) : e;
	}
}
function wl(e, t, n) {
	if (!t) return e;
	var r = xl(e * 2);
	return (r + xl(t)) % 2 == 0 ? r / 2 : (r + (n ? 1 : -1)) / 2;
}
//#endregion
//#region node_modules/zrender/lib/graphic/shape/Rect.js
var Tl = function() {
	function e() {
		this.x = 0, this.y = 0, this.width = 0, this.height = 0;
	}
	return e;
}(), El = {}, Dl = function(e) {
	r(t, e);
	function t(t) {
		return e.call(this, t) || this;
	}
	return t.prototype.getDefaultShape = function() {
		return new Tl();
	}, t.prototype.buildPath = function(e, t) {
		var n, r, i, a;
		if (this.subPixelOptimize) {
			var o = Cl(El, t, this.style);
			n = o.x, r = o.y, i = o.width, a = o.height, o.r = t.r, t = o;
		} else n = t.x, r = t.y, i = t.width, a = t.height;
		t.r ? bl(e, t) : e.rect(n, r, i, a);
	}, t.prototype.isZeroArea = function() {
		return !this.shape.width || !this.shape.height;
	}, t;
}(pl);
Dl.prototype.type = "rect";
//#endregion
//#region node_modules/zrender/lib/graphic/Text.js
var Ol = { fill: "#000" }, kl = 2, Al = {}, jl = { style: N({
	fill: !0,
	stroke: !0,
	fillOpacity: !0,
	strokeOpacity: !0,
	lineWidth: !0,
	fontSize: !0,
	lineHeight: !0,
	width: !0,
	height: !0,
	textShadowColor: !0,
	textShadowBlur: !0,
	textShadowOffsetX: !0,
	textShadowOffsetY: !0,
	backgroundColor: !0,
	padding: !0,
	borderColor: !0,
	borderWidth: !0,
	borderRadius: !0
}, ic.style) }, Ml = function(e) {
	r(t, e);
	function t(t) {
		var n = e.call(this) || this;
		return n.type = "text", n._children = [], n._defaultStyle = Ol, n.attr(t), n;
	}
	return t.prototype.childrenRef = function() {
		return this._children;
	}, t.prototype.update = function() {
		e.prototype.update.call(this), this.styleChanged() && this._updateSubTexts();
		for (var t = 0; t < this._children.length; t++) {
			var n = this._children[t];
			n.zlevel = this.zlevel, n.z = this.z, n.z2 = this.z2, n.culling = this.culling, n.cursor = this.cursor, n.invisible = this.invisible;
		}
	}, t.prototype.updateTransform = function() {
		var t = this.innerTransformable;
		t ? (t.updateTransform(), t.transform && (this.transform = t.transform)) : e.prototype.updateTransform.call(this);
	}, t.prototype.getLocalTransform = function(t) {
		var n = this.innerTransformable;
		return n ? n.getLocalTransform(t) : e.prototype.getLocalTransform.call(this, t);
	}, t.prototype.getComputedTransform = function() {
		return this.__hostTarget && (this.__hostTarget.getComputedTransform(), this.__hostTarget.updateInnerText(!0)), e.prototype.getComputedTransform.call(this);
	}, t.prototype._updateSubTexts = function() {
		this._childCursor = 0, zl(this.style), this.style.rich ? this._updateRichTexts() : this._updatePlainTexts(), this._children.length = this._childCursor, this.styleUpdated();
	}, t.prototype.addSelfToZr = function(t) {
		e.prototype.addSelfToZr.call(this, t);
		for (var n = 0; n < this._children.length; n++) this._children[n].__zr = t;
	}, t.prototype.removeSelfFromZr = function(t) {
		e.prototype.removeSelfFromZr.call(this, t);
		for (var n = 0; n < this._children.length; n++) this._children[n].__zr = null;
	}, t.prototype.getBoundingRect = function() {
		if (this.styleChanged() && this._updateSubTexts(), !this._rect) {
			for (var e = new J(0, 0, 0, 0), t = this._children, n = [], r = null, i = 0; i < t.length; i++) {
				var a = t[i], o = a.getBoundingRect(), s = a.getLocalTransform(n);
				s ? (e.copy(o), e.applyTransform(s), r ||= e.clone(), r.union(e)) : (r ||= o.clone(), r.union(o));
			}
			this._rect = r || e;
		}
		return this._rect;
	}, t.prototype.setDefaultTextStyle = function(e) {
		this._defaultStyle = e || Ol;
	}, t.prototype.setTextContent = function(e) {}, t.prototype._mergeStyle = function(e, t) {
		if (!t) return e;
		var n = t.rich, r = e.rich || n && {};
		return M(e, t), n && r ? (this._mergeRich(r, n), e.rich = r) : r && (e.rich = r), e;
	}, t.prototype._mergeRich = function(e, t) {
		for (var n = z(t), r = 0; r < n.length; r++) {
			var i = n[r];
			e[i] = e[i] || {}, M(e[i], t[i]);
		}
	}, t.prototype.getAnimationStyleProps = function() {
		return jl;
	}, t.prototype._getOrCreateChild = function(e) {
		var t = this._children[this._childCursor];
		return (!t || !(t instanceof e)) && (t = new e()), this._children[this._childCursor++] = t, t.__zr = this.__zr, t.parent = this, t;
	}, t.prototype._updatePlainTexts = function() {
		var e = this.style, t = e.font || "12px sans-serif", n = e.padding, r = this._defaultStyle, i = e.x || 0, a = e.y || 0, o = e.align || r.align || "left", s = e.verticalAlign || r.verticalAlign || "top";
		Ys(Al, r.overflowRect, i, a, o, s), i = Al.baseX, a = Al.baseY;
		var c = zs(Wl(e), e, Al.outerWidth, Al.outerHeight), l = Gl(e), u = !!e.backgroundColor, d = c.outerHeight, f = c.outerWidth, p = c.lines, m = c.lineHeight;
		this.isTruncated = !!c.isTruncated;
		var h = i, g = Zi(a, c.contentHeight, s);
		if (l || n) {
			var _ = Xi(i, f, o), v = Zi(a, d, s);
			l && this._renderBackground(e, e, _, v, f, d);
		}
		g += m / 2, n && (h = Ul(i, o, n), s === "top" ? g += n[0] : s === "bottom" && (g -= n[2]));
		for (var y = 0, b = !1, x = !1, S = Hl("fill" in e ? e.fill : (x = !0, r.fill)), C = Vl("stroke" in e ? e.stroke : !u && (!r.autoStroke || x) ? (y = kl, b = !0, r.stroke) : null), w = e.textShadowBlur > 0, T = 0; T < p.length; T++) {
			var E = this._getOrCreateChild(hl), D = E.createStyle();
			E.useStyle(D), D.text = p[T], D.x = h, D.y = g, o && (D.textAlign = o), D.textBaseline = "middle", D.opacity = e.opacity, D.strokeFirst = !0, w && (D.shadowBlur = e.textShadowBlur || 0, D.shadowColor = e.textShadowColor || "transparent", D.shadowOffsetX = e.textShadowOffsetX || 0, D.shadowOffsetY = e.textShadowOffsetY || 0), D.stroke = C, D.fill = S, C && (D.lineWidth = e.lineWidth || y, D.lineDash = e.lineDash, D.lineDashOffset = e.lineDashOffset || 0), D.font = t, Ll(D, e), g += m, E.setBoundingRect(ec(D, c.contentWidth, c.calculatedLineHeight, b ? 0 : null));
		}
	}, t.prototype._updateRichTexts = function() {
		var e = this.style, t = this._defaultStyle, n = e.align || t.align, r = e.verticalAlign || t.verticalAlign, i = e.x || 0, a = e.y || 0;
		Ys(Al, t.overflowRect, i, a, n, r), i = Al.baseX, a = Al.baseY;
		var o = Us(Wl(e), e, Al.outerWidth, Al.outerHeight, n), s = o.width, c = o.outerWidth, l = o.outerHeight, u = e.padding;
		this.isTruncated = !!o.isTruncated;
		var d = Xi(i, c, n), f = Zi(a, l, r), p = d, m = f;
		u && (p += u[3], m += u[0]);
		var h = p + s;
		Gl(e) && this._renderBackground(e, e, d, f, c, l);
		for (var g = !!e.backgroundColor, _ = 0; _ < o.lines.length; _++) {
			for (var v = o.lines[_], y = v.tokens, b = y.length, x = v.lineHeight, S = v.width, C = 0, w = p, T = h, E = b - 1, D = void 0; C < b && (D = y[C], !D.align || D.align === "left");) this._placeToken(D, e, x, m, w, "left", g), S -= D.width, w += D.width, C++;
			for (; E >= 0 && (D = y[E], D.align === "right");) this._placeToken(D, e, x, m, T, "right", g), S -= D.width, T -= D.width, E--;
			for (w += (s - (w - p) - (h - T) - S) / 2; C <= E;) D = y[C], this._placeToken(D, e, x, m, w + D.width / 2, "center", g), w += D.width, C++;
			m += x;
		}
	}, t.prototype._placeToken = function(e, t, n, r, i, a, o) {
		var s = t.rich[e.styleName] || {};
		s.text = e.text;
		var c = e.verticalAlign, l = r + n / 2;
		c === "top" ? l = r + e.height / 2 : c === "bottom" && (l = r + n - e.height / 2), !e.isLineHolder && Gl(s) && this._renderBackground(s, t, a === "right" ? i - e.width : a === "center" ? i - e.width / 2 : i, l - e.height / 2, e.width, e.height);
		var u = !!s.backgroundColor, d = e.textPadding;
		d && (i = Ul(i, a, d), l -= e.height / 2 - d[0] - e.innerHeight / 2);
		var f = this._getOrCreateChild(hl), p = f.createStyle();
		f.useStyle(p);
		var m = this._defaultStyle, h = !1, g = 0, _ = !1, v = Hl("fill" in s ? s.fill : "fill" in t ? t.fill : (h = !0, m.fill)), y = Vl("stroke" in s ? s.stroke : "stroke" in t ? t.stroke : !u && !o && (!m.autoStroke || h) ? (g = kl, _ = !0, m.stroke) : null), b = s.textShadowBlur > 0 || t.textShadowBlur > 0;
		p.text = e.text, p.x = i, p.y = l, b && (p.shadowBlur = s.textShadowBlur || t.textShadowBlur || 0, p.shadowColor = s.textShadowColor || t.textShadowColor || "transparent", p.shadowOffsetX = s.textShadowOffsetX || t.textShadowOffsetX || 0, p.shadowOffsetY = s.textShadowOffsetY || t.textShadowOffsetY || 0), p.textAlign = a, p.textBaseline = "middle", p.font = e.font || "12px sans-serif", p.opacity = he(s.opacity, t.opacity, 1), Ll(p, s), y && (p.lineWidth = he(s.lineWidth, t.lineWidth, g), p.lineDash = K(s.lineDash, t.lineDash), p.lineDashOffset = t.lineDashOffset || 0, p.stroke = y), v && (p.fill = v), f.setBoundingRect(ec(p, e.contentWidth, e.contentHeight, _ ? 0 : null));
	}, t.prototype._renderBackground = function(e, t, n, r, i, a) {
		var o = e.backgroundColor, s = e.borderWidth, c = e.borderColor, l = o && o.image, u = o && !l, d = e.borderRadius, f = this, p, m;
		if (u || e.lineHeight || s && c) {
			p = this._getOrCreateChild(Dl), p.useStyle(p.createStyle()), p.style.fill = null;
			var h = p.shape;
			h.x = n, h.y = r, h.width = i, h.height = a, h.r = d, p.dirtyShape();
		}
		if (u) {
			var g = p.style;
			g.fill = o || null, g.fillOpacity = K(e.fillOpacity, 1);
		} else if (l) {
			m = this._getOrCreateChild(yl), m.onload = function() {
				f.dirtyStyle();
			};
			var _ = m.style;
			_.image = o.image, _.x = n, _.y = r, _.width = i, _.height = a;
		}
		if (s && c) {
			var g = p.style;
			g.lineWidth = s, g.stroke = c, g.strokeOpacity = K(e.strokeOpacity, 1), g.lineDash = e.borderDash, g.lineDashOffset = e.borderDashOffset || 0, p.strokeContainThreshold = 0, p.hasFill() && p.hasStroke() && (g.strokeFirst = !0, g.lineWidth *= 2);
		}
		var v = (p || m).style;
		v.shadowBlur = e.shadowBlur || 0, v.shadowColor = e.shadowColor || "transparent", v.shadowOffsetX = e.shadowOffsetX || 0, v.shadowOffsetY = e.shadowOffsetY || 0, v.opacity = he(e.opacity, t.opacity, 1);
	}, t.makeFont = function(e) {
		var t = "";
		return Rl(e) && (t = [
			e.fontStyle,
			e.fontWeight,
			Il(e.fontSize),
			e.fontFamily || "sans-serif"
		].join(" ")), t && ye(t) || e.textFont || e.font;
	}, t;
}(sc), Nl = {
	left: !0,
	right: 1,
	center: 1
}, Pl = {
	top: 1,
	bottom: 1,
	middle: 1
}, Fl = [
	"fontStyle",
	"fontWeight",
	"fontSize",
	"fontFamily"
];
function Il(e) {
	return typeof e == "string" && (e.indexOf("px") !== -1 || e.indexOf("rem") !== -1 || e.indexOf("em") !== -1) ? e : isNaN(+e) ? "12px" : e + "px";
}
function Ll(e, t) {
	for (var n = 0; n < Fl.length; n++) {
		var r = Fl[n], i = t[r];
		i != null && (e[r] = i);
	}
}
function Rl(e) {
	return e.fontSize != null || e.fontFamily || e.fontWeight;
}
function zl(e) {
	return Bl(e), L(e.rich, Bl), e;
}
function Bl(e) {
	if (e) {
		e.font = Ml.makeFont(e);
		var t = e.align;
		t === "middle" && (t = "center"), e.align = t == null || Nl[t] ? t : "left";
		var n = e.verticalAlign;
		n === "center" && (n = "middle"), e.verticalAlign = n == null || Pl[n] ? n : "top", e.padding &&= _e(e.padding);
	}
}
function Vl(e, t) {
	return e == null || t <= 0 || e === "transparent" || e === "none" ? null : e.image || e.colorStops ? "#000" : e;
}
function Hl(e) {
	return e == null || e === "none" ? null : e.image || e.colorStops ? "#000" : e;
}
function Ul(e, t, n) {
	return t === "right" ? e - n[1] : t === "center" ? e + n[3] / 2 - n[1] / 2 : e + n[3];
}
function Wl(e) {
	var t = e.text;
	return t != null && (t += ""), t;
}
function Gl(e) {
	return !!(e.backgroundColor || e.lineHeight || e.borderWidth && e.borderColor);
}
//#endregion
//#region node_modules/echarts/lib/util/innerStore.js
var Kl = X(), ql = function(e, t, n, r) {
	if (r) {
		var i = Kl(r);
		i.dataIndex = n, i.dataType = t, i.seriesIndex = e, i.ssrType = "chart", r.type === "group" && r.traverse(function(r) {
			var i = Kl(r);
			i.seriesIndex = e, i.dataIndex = n, i.dataType = t, i.ssrType = "chart";
		});
	}
}, Jl = q([
	"tooltip",
	"label",
	"itemName",
	"itemId",
	"itemGroupId",
	"itemChildGroupId",
	"seriesName"
]), Yl = "original", Xl = "arrayRows", Zl = "objectRows", Ql = "keyedColumns", $l = "typedArray", eu = "unknown", tu = "column", nu = [
	"getDom",
	"getZr",
	"getWidth",
	"getHeight",
	"getDevicePixelRatio",
	"dispatchAction",
	"isSSR",
	"isDisposed",
	"on",
	"off",
	"getDataURL",
	"getConnectedDataURL",
	"getOption",
	"getId",
	"updateLabelLayout"
], ru = function() {
	function e(e) {
		L(nu, function(t) {
			this[t] = B(e[t], e);
		}, this);
	}
	return e;
}();
function iu(e, t) {
	return t.mainType === "series" ? e.getViewOfSeriesModel(t) : e.getViewOfComponentModel(t);
}
//#endregion
//#region node_modules/echarts/lib/util/states.js
var au = 1, ou = {}, su = X(), cu = X(), lu = [
	"emphasis",
	"blur",
	"select"
], uu = [
	"normal",
	"emphasis",
	"blur",
	"select"
], du = "highlight", fu = "downplay", pu = "select", mu = "unselect", hu = "toggleSelect", gu = "selectchanged";
function _u(e) {
	return e != null && e !== "none";
}
function vu(e, t, n) {
	e.onHoverStateChange && (e.hoverState || 0) !== n && e.onHoverStateChange(t), e.hoverState = n;
}
function yu(e) {
	vu(e, "emphasis", 2);
}
function bu(e) {
	e.hoverState === 2 && vu(e, "normal", 0);
}
function xu(e) {
	vu(e, "blur", 1);
}
function Su(e) {
	e.hoverState === 1 && vu(e, "normal", 0);
}
function Cu(e) {
	e.selected = !0;
}
function wu(e) {
	e.selected = !1;
}
function Tu(e, t, n) {
	t(e, n);
}
function Eu(e, t, n) {
	Tu(e, t, n), e.isGroup && e.traverse(function(e) {
		Tu(e, t, n);
	});
}
function Du(e, t) {
	switch (t) {
		case "emphasis":
			e.hoverState = 2;
			break;
		case "normal":
			e.hoverState = 0;
			break;
		case "blur":
			e.hoverState = 1;
			break;
		case "select": e.selected = !0;
	}
}
function Ou(e, t, n, r) {
	for (var i = e.style, a = {}, o = 0; o < t.length; o++) {
		var s = t[o];
		a[s] = i[s] ?? (r && r[s]);
	}
	for (var o = 0; o < e.animators.length; o++) {
		var c = e.animators[o];
		c.__fromStateTransition && c.__fromStateTransition.indexOf(n) < 0 && c.targetName === "style" && c.saveTo(a, t);
	}
	return a;
}
function ku(e, t, n, r) {
	var i = n && P(n, "select") >= 0, a = !1;
	if (e instanceof pl) {
		var o = su(e), s = i && o.selectFill || o.normalFill, c = i && o.selectStroke || o.normalStroke;
		if (_u(s) || _u(c)) {
			r ||= {};
			var l = r.style || {};
			l.fill === "inherit" ? (a = !0, r = M({}, r), l = M({}, l), l.fill = s) : !_u(l.fill) && _u(s) ? (a = !0, r = M({}, r), l = M({}, l), l.fill = jr(s)) : !_u(l.stroke) && _u(c) && (a || (r = M({}, r), l = M({}, l)), l.stroke = jr(c)), r.style = l;
		}
	}
	if (r && r.z2 == null) {
		a || (r = M({}, r));
		var u = e.z2EmphasisLift;
		r.z2 = e.z2 + (u ?? 10);
	}
	return r;
}
function Au(e, t, n) {
	if (n && n.z2 == null) {
		n = M({}, n);
		var r = e.z2SelectLift;
		n.z2 = e.z2 + (r ?? 9);
	}
	return n;
}
function ju(e, t, n) {
	var r = P(e.currentStates, t) >= 0, i = e.style.opacity, a = r ? null : Ou(e, ["opacity"], t, { opacity: 1 });
	n ||= {};
	var o = n.style || {};
	return o.opacity ?? (n = M({}, n), o = M({ opacity: r ? i : a.opacity * .1 }, o), n.style = o), n;
}
function Mu(e, t) {
	var n = this.states[e];
	if (this.style) {
		if (e === "emphasis") return ku(this, e, t, n);
		if (e === "blur") return ju(this, e, n);
		if (e === "select") return Au(this, e, n);
	}
	return n;
}
function Nu(e) {
	e.stateProxy = Mu;
	var t = e.getTextContent(), n = e.getTextGuideLine();
	t && (t.stateProxy = Mu), n && (n.stateProxy = Mu);
}
function Pu(e, t) {
	!Hu(e, t) && !e.__highByOuter && Eu(e, yu);
}
function Fu(e, t) {
	!Hu(e, t) && !e.__highByOuter && Eu(e, bu);
}
function Iu(e, t) {
	e.__highByOuter |= 1 << (t || 0), Eu(e, yu);
}
function Lu(e, t) {
	!(e.__highByOuter &= ~(1 << (t || 0))) && Eu(e, bu);
}
function Ru(e) {
	Eu(e, xu);
}
function zu(e) {
	Eu(e, Su);
}
function Bu(e) {
	Eu(e, Cu);
}
function Vu(e) {
	Eu(e, wu);
}
function Hu(e, t) {
	return e.__highDownSilentOnTouch && t.zrByTouch;
}
function Uu(e) {
	var t = e.getModel(), n = [], r = [];
	t.eachComponent(function(t, i) {
		var a = cu(i), o = iu(e, i), s = t === "series";
		!s && r.push(o), a.isBlured && (o.group.traverse(function(e) {
			Su(e);
		}), s && n.push(i)), a.isBlured = !1;
	}), L(r, function(e) {
		e && e.toggleBlurSeries && e.toggleBlurSeries(n, !1, t);
	});
}
function Wu(e, t, n, r) {
	var i = r.getModel();
	n ||= "coordinateSystem";
	function a(e, t) {
		for (var n = 0; n < t.length; n++) {
			var r = e.getItemGraphicEl(t[n]);
			r && zu(r);
		}
	}
	if (e != null && t && t !== "none") {
		var o = i.getSeriesByIndex(e), s = o.coordinateSystem;
		s && s.master && (s = s.master);
		var c = [];
		i.eachSeries(function(e) {
			var i = o === e, l = e.coordinateSystem;
			if (l && l.master && (l = l.master), !(n === "series" && !i || n === "coordinateSystem" && !(l && s ? l === s : i) || t === "series" && i)) {
				if (r.getViewOfSeriesModel(e).group.traverse(function(e) {
					e.__highByOuter && i && t === "self" || xu(e);
				}), I(t)) a(e.getData(), t);
				else if (G(t)) for (var u = z(t), d = 0; d < u.length; d++) a(e.getData(u[d]), t[u[d]]);
				c.push(e), cu(e).isBlured = !0;
			}
		}), i.eachComponent(function(e, t) {
			if (e !== "series") {
				var n = r.getViewOfComponentModel(t);
				n && n.toggleBlurSeries && n.toggleBlurSeries(c, !0, i);
			}
		});
	}
}
function Gu(e, t, n) {
	if (e != null && t != null) {
		var r = n.getModel().getComponent(e, t);
		if (r) {
			cu(r).isBlured = !0;
			var i = n.getViewOfComponentModel(r);
			i && i.focusBlurEnabled && i.group.traverse(function(e) {
				xu(e);
			});
		}
	}
}
function Ku(e, t, n) {
	var r = e.seriesIndex, i = e.getData(t.dataType);
	if (i) {
		var a = zo(i, t);
		a = (H(a) ? a[0] : a) || 0;
		var o = i.getItemGraphicEl(a);
		if (!o) for (var s = i.count(), c = 0; !o && c < s;) o = i.getItemGraphicEl(c++);
		if (o) {
			var l = Kl(o);
			Wu(r, l.focus, l.blurScope, n);
		} else {
			var u = e.get(["emphasis", "focus"]), d = e.get(["emphasis", "blurScope"]);
			u != null && Wu(r, u, d, n);
		}
	}
}
function qu(e, t, n, r) {
	var i = {
		focusSelf: !1,
		dispatchers: null
	};
	if (e == null || e === "series" || t == null || n == null) return i;
	var a = r.getModel().getComponent(e, t);
	if (!a) return i;
	var o = r.getViewOfComponentModel(a);
	if (!o || !o.findHighDownDispatchers) return i;
	for (var s = o.findHighDownDispatchers(n), c, l = 0; l < s.length; l++) if (Kl(s[l]).focus === "self") {
		c = !0;
		break;
	}
	return {
		focusSelf: c,
		dispatchers: s
	};
}
function Ju(e, t, n) {
	var r = Kl(e), i = qu(r.componentMainType, r.componentIndex, r.componentHighDownName, n), a = i.dispatchers, o = i.focusSelf;
	a ? (o && Gu(r.componentMainType, r.componentIndex, n), L(a, function(e) {
		return Pu(e, t);
	})) : (Wu(r.seriesIndex, r.focus, r.blurScope, n), r.focus === "self" && Gu(r.componentMainType, r.componentIndex, n), Pu(e, t));
}
function Yu(e, t, n) {
	Uu(n);
	var r = Kl(e), i = qu(r.componentMainType, r.componentIndex, r.componentHighDownName, n).dispatchers;
	i ? L(i, function(e) {
		return Fu(e, t);
	}) : Fu(e, t);
}
function Xu(e, t, n) {
	if (ld(t)) {
		var r = t.dataType, i = zo(e.getData(r), t);
		H(i) || (i = [i]), e[t.type === "toggleSelect" ? "toggleSelect" : t.type === "select" ? "select" : "unselect"](i, r);
	}
}
function Zu(e) {
	L(e.getAllData(), function(t) {
		var n = t.data, r = t.type;
		n.eachItemGraphicEl(function(t, n) {
			e.isSelected(n, r) ? Bu(t) : Vu(t);
		});
	});
}
function Qu(e) {
	var t = [];
	return e.eachSeries(function(e) {
		L(e.getAllData(), function(n) {
			n.data;
			var r = n.type, i = e.getSelectedDataIndices();
			if (i.length > 0) {
				var a = {
					dataIndex: i,
					seriesIndex: e.seriesIndex
				};
				r != null && (a.dataType = r), t.push(a);
			}
		});
	}), t;
}
function $u(e, t, n) {
	od(e, !0), Eu(e, Nu), nd(e, t, n);
}
function ed(e) {
	od(e, !1);
}
function td(e, t, n, r) {
	r ? ed(e) : $u(e, t, n);
}
function nd(e, t, n) {
	var r = Kl(e);
	t == null ? r.focus &&= null : (r.focus = t, r.blurScope = n);
}
var rd = [
	"emphasis",
	"blur",
	"select"
], id = {
	itemStyle: "getItemStyle",
	lineStyle: "getLineStyle",
	areaStyle: "getAreaStyle"
};
function ad(e, t, n, r) {
	n ||= "itemStyle";
	for (var i = 0; i < rd.length; i++) {
		var a = rd[i], o = t.getModel([a, n]), s = e.ensureState(a);
		s.style = r ? r(o) : o[id[n]]();
	}
}
function od(e, t) {
	var n = t === !1, r = e;
	e.highDownSilentOnTouch && (r.__highDownSilentOnTouch = e.highDownSilentOnTouch), (!n || r.__highDownDispatcher) && (r.__highByOuter = r.__highByOuter || 0, r.__highDownDispatcher = !n);
}
function sd(e) {
	return !!(e && e.__highDownDispatcher);
}
function cd(e) {
	var t = ou[e];
	return t == null && au <= 32 && (t = ou[e] = au++), t;
}
function ld(e) {
	var t = e.type;
	return t === "select" || t === "unselect" || t === "toggleSelect";
}
function ud(e) {
	var t = e.type;
	return t === "highlight" || t === "downplay";
}
function dd(e) {
	var t = su(e);
	t.normalFill = e.style.fill, t.normalStroke = e.style.stroke;
	var n = e.states.select || {};
	t.selectFill = n.style && n.style.fill || null, t.selectStroke = n.style && n.style.stroke || null;
}
//#endregion
//#region node_modules/zrender/lib/tool/transformPath.js
var fd = Hc.CMD, pd = [
	[],
	[],
	[]
], md = Math.sqrt, hd = Math.atan2;
function gd(e, t) {
	if (t) {
		var n = e.data, r = e.len(), i, a, o, s, c, l, u = fd.M, d = fd.C, f = fd.L, p = fd.R, m = fd.A, h = fd.Q;
		for (o = 0, s = 0; o < r;) {
			switch (i = n[o++], s = o, a = 0, i) {
				case u:
					a = 1;
					break;
				case f:
					a = 1;
					break;
				case d:
					a = 3;
					break;
				case h:
					a = 2;
					break;
				case m:
					var g = t[4], _ = t[5], v = md(t[0] * t[0] + t[1] * t[1]), y = md(t[2] * t[2] + t[3] * t[3]), b = hd(-t[1] / y, t[0] / v);
					n[o] *= v, n[o++] += g, n[o] *= y, n[o++] += _, n[o++] *= v, n[o++] *= y, n[o++] += b, n[o++] += b, o += 2, s = o;
					break;
				case p: l[0] = n[o++], l[1] = n[o++], Ke(l, l, t), n[s++] = l[0], n[s++] = l[1], l[0] += n[o++], l[1] += n[o++], Ke(l, l, t), n[s++] = l[0], n[s++] = l[1];
			}
			for (c = 0; c < a; c++) {
				var x = pd[c];
				x[0] = n[o++], x[1] = n[o++], Ke(x, x, t), n[s++] = x[0], n[s++] = x[1];
			}
		}
		e.increaseVersion();
	}
}
//#endregion
//#region node_modules/zrender/lib/tool/path.js
var _d = Math.sqrt, vd = Math.sin, yd = Math.cos, bd = Math.PI;
function xd(e) {
	return Math.sqrt(e[0] * e[0] + e[1] * e[1]);
}
function Sd(e, t) {
	return (e[0] * t[0] + e[1] * t[1]) / (xd(e) * xd(t));
}
function Cd(e, t) {
	return (e[0] * t[1] < e[1] * t[0] ? -1 : 1) * Math.acos(Sd(e, t));
}
function wd(e, t, n, r, i, a, o, s, c, l, u) {
	var d = bd / 180 * c, f = yd(d) * (e - n) / 2 + vd(d) * (t - r) / 2, p = -1 * vd(d) * (e - n) / 2 + yd(d) * (t - r) / 2, m = f * f / (o * o) + p * p / (s * s);
	m > 1 && (o *= _d(m), s *= _d(m));
	var h = (i === a ? -1 : 1) * _d((o * o * (s * s) - o * o * (p * p) - s * s * (f * f)) / (o * o * (p * p) + s * s * (f * f))) || 0, g = h * o * p / s, _ = h * -s * f / o, v = (e + n) / 2 + yd(d) * g - vd(d) * _, y = (t + r) / 2 + vd(d) * g + yd(d) * _, b = Cd([1, 0], [(f - g) / o, (p - _) / s]), x = [(f - g) / o, (p - _) / s], S = [(-1 * f - g) / o, (-1 * p - _) / s], C = Cd(x, S);
	if (Sd(x, S) <= -1 && (C = bd), Sd(x, S) >= 1 && (C = 0), C < 0) {
		var w = Math.round(C / bd * 1e6) / 1e6;
		C = bd * 2 + w % 2 * bd;
	}
	u.addData(l, v, y, o, s, b, C, d, a);
}
var Td = /([mlvhzcqtsa])([^mlvhzcqtsa]*)/gi, Ed = /-?([0-9]*\.)?[0-9]+([eE]-?[0-9]+)?/g;
function Dd(e) {
	var t = new Hc();
	if (!e) return t;
	var n = 0, r = 0, i = n, a = r, o, s = Hc.CMD, c = e.match(Td);
	if (!c) return t;
	for (var l = 0; l < c.length; l++) {
		for (var u = c[l], d = u.charAt(0), f = void 0, p = u.match(Ed) || [], m = p.length, h = 0; h < m; h++) p[h] = parseFloat(p[h]);
		for (var g = 0; g < m;) {
			var _ = void 0, v = void 0, y = void 0, b = void 0, x = void 0, S = void 0, C = void 0, w = n, T = r, E = void 0, D = void 0;
			switch (d) {
				case "l":
					n += p[g++], r += p[g++], f = s.L, t.addData(f, n, r);
					break;
				case "L":
					n = p[g++], r = p[g++], f = s.L, t.addData(f, n, r);
					break;
				case "m":
					n += p[g++], r += p[g++], f = s.M, t.addData(f, n, r), i = n, a = r, d = "l";
					break;
				case "M":
					n = p[g++], r = p[g++], f = s.M, t.addData(f, n, r), i = n, a = r, d = "L";
					break;
				case "h":
					n += p[g++], f = s.L, t.addData(f, n, r);
					break;
				case "H":
					n = p[g++], f = s.L, t.addData(f, n, r);
					break;
				case "v":
					r += p[g++], f = s.L, t.addData(f, n, r);
					break;
				case "V":
					r = p[g++], f = s.L, t.addData(f, n, r);
					break;
				case "C":
					f = s.C, t.addData(f, p[g++], p[g++], p[g++], p[g++], p[g++], p[g++]), n = p[g - 2], r = p[g - 1];
					break;
				case "c":
					f = s.C, t.addData(f, p[g++] + n, p[g++] + r, p[g++] + n, p[g++] + r, p[g++] + n, p[g++] + r), n += p[g - 2], r += p[g - 1];
					break;
				case "S":
					_ = n, v = r, E = t.len(), D = t.data, o === s.C && (_ += n - D[E - 4], v += r - D[E - 3]), f = s.C, w = p[g++], T = p[g++], n = p[g++], r = p[g++], t.addData(f, _, v, w, T, n, r);
					break;
				case "s":
					_ = n, v = r, E = t.len(), D = t.data, o === s.C && (_ += n - D[E - 4], v += r - D[E - 3]), f = s.C, w = n + p[g++], T = r + p[g++], n += p[g++], r += p[g++], t.addData(f, _, v, w, T, n, r);
					break;
				case "Q":
					w = p[g++], T = p[g++], n = p[g++], r = p[g++], f = s.Q, t.addData(f, w, T, n, r);
					break;
				case "q":
					w = p[g++] + n, T = p[g++] + r, n += p[g++], r += p[g++], f = s.Q, t.addData(f, w, T, n, r);
					break;
				case "T":
					_ = n, v = r, E = t.len(), D = t.data, o === s.Q && (_ += n - D[E - 4], v += r - D[E - 3]), n = p[g++], r = p[g++], f = s.Q, t.addData(f, _, v, n, r);
					break;
				case "t":
					_ = n, v = r, E = t.len(), D = t.data, o === s.Q && (_ += n - D[E - 4], v += r - D[E - 3]), n += p[g++], r += p[g++], f = s.Q, t.addData(f, _, v, n, r);
					break;
				case "A":
					y = p[g++], b = p[g++], x = p[g++], S = p[g++], C = p[g++], w = n, T = r, n = p[g++], r = p[g++], f = s.A, wd(w, T, n, r, S, C, y, b, x, f, t);
					break;
				case "a": y = p[g++], b = p[g++], x = p[g++], S = p[g++], C = p[g++], w = n, T = r, n += p[g++], r += p[g++], f = s.A, wd(w, T, n, r, S, C, y, b, x, f, t);
			}
		}
		(d === "z" || d === "Z") && (f = s.Z, t.addData(f), n = i, r = a), o = f;
	}
	return t.toStatic(), t;
}
var Od = function(e) {
	r(t, e);
	function t() {
		return e !== null && e.apply(this, arguments) || this;
	}
	return t.prototype.applyTransform = function(e) {}, t;
}(pl);
function kd(e) {
	return e.setData != null;
}
function Ad(e, t) {
	var n = Dd(e), r = M({}, t);
	return r.buildPath = function(e) {
		var t = kd(e);
		if (t && e.canSave()) {
			e.appendPath(n);
			var r = e.getContext();
			r && e.rebuildPath(r, 1);
		} else {
			var r = t ? e.getContext() : e;
			r && n.rebuildPath(r, 1);
		}
	}, r.applyTransform = function(e) {
		gd(n, e), this.dirtyShape();
	}, r;
}
function jd(e, t) {
	return new Od(Ad(e, t));
}
function Md(e, t) {
	var n = Ad(e, t);
	return function(e) {
		r(t, e);
		function t(t) {
			var r = e.call(this, t) || this;
			return r.applyTransform = n.applyTransform, r.buildPath = n.buildPath, r;
		}
		return t;
	}(Od);
}
function Nd(e, t) {
	for (var n = [], r = e.length, i = 0; i < r; i++) {
		var a = e[i];
		n.push(a.getUpdatedPathProxy(!0));
	}
	var o = new pl(t);
	return o.createPathProxy(), o.buildPath = function(e) {
		if (kd(e)) {
			e.appendPath(n);
			var t = e.getContext();
			t && e.rebuildPath(t, 1);
		}
	}, o;
}
//#endregion
//#region node_modules/zrender/lib/graphic/shape/Circle.js
var Pd = function() {
	function e() {
		this.cx = 0, this.cy = 0, this.r = 0;
	}
	return e;
}(), Fd = function(e) {
	r(t, e);
	function t(t) {
		return e.call(this, t) || this;
	}
	return t.prototype.getDefaultShape = function() {
		return new Pd();
	}, t.prototype.buildPath = function(e, t) {
		e.moveTo(t.cx + t.r, t.cy), e.arc(t.cx, t.cy, t.r, 0, Math.PI * 2);
	}, t;
}(pl);
Fd.prototype.type = "circle";
//#endregion
//#region node_modules/zrender/lib/graphic/shape/Ellipse.js
var Id = function() {
	function e() {
		this.cx = 0, this.cy = 0, this.rx = 0, this.ry = 0;
	}
	return e;
}(), Ld = function(e) {
	r(t, e);
	function t(t) {
		return e.call(this, t) || this;
	}
	return t.prototype.getDefaultShape = function() {
		return new Id();
	}, t.prototype.buildPath = function(e, t) {
		var n = .5522848, r = t.cx, i = t.cy, a = t.rx, o = t.ry, s = a * n, c = o * n;
		e.moveTo(r - a, i), e.bezierCurveTo(r - a, i - c, r - s, i - o, r, i - o), e.bezierCurveTo(r + s, i - o, r + a, i - c, r + a, i), e.bezierCurveTo(r + a, i + c, r + s, i + o, r, i + o), e.bezierCurveTo(r - s, i + o, r - a, i + c, r - a, i), e.closePath();
	}, t;
}(pl);
Ld.prototype.type = "ellipse";
//#endregion
//#region node_modules/zrender/lib/graphic/helper/roundSector.js
var Rd = Math.PI, zd = Rd * 2, Bd = Math.sin, Vd = Math.cos, Hd = Math.acos, Ud = Math.atan2, Wd = Math.abs, Gd = Math.sqrt, Kd = Math.max, qd = Math.min, Jd = 1e-4;
function Yd(e, t, n, r, i, a, o, s) {
	var c = n - e, l = r - t, u = o - i, d = s - a, f = d * c - u * l;
	if (!(f * f < Jd)) return f = (u * (t - a) - d * (e - i)) / f, [e + f * c, t + f * l];
}
function Xd(e, t, n, r, i, a, o) {
	var s = e - n, c = t - r, l = (o ? a : -a) / Gd(s * s + c * c), u = l * c, d = -l * s, f = e + u, p = t + d, m = n + u, h = r + d, g = (f + m) / 2, _ = (p + h) / 2, v = m - f, y = h - p, b = v * v + y * y, x = i - a, S = f * h - m * p, C = (y < 0 ? -1 : 1) * Gd(Kd(0, x * x * b - S * S)), w = (S * y - v * C) / b, T = (-S * v - y * C) / b, E = (S * y + v * C) / b, D = (-S * v + y * C) / b, O = w - g, k = T - _, A = E - g, j = D - _;
	return O * O + k * k > A * A + j * j && (w = E, T = D), {
		cx: w,
		cy: T,
		x0: -u,
		y0: -d,
		x1: w * (i / x - 1),
		y1: T * (i / x - 1)
	};
}
function Zd(e) {
	var t;
	if (H(e)) {
		var n = e.length;
		if (!n) return e;
		t = n === 1 ? [
			e[0],
			e[0],
			0,
			0
		] : n === 2 ? [
			e[0],
			e[0],
			e[1],
			e[1]
		] : n === 3 ? e.concat(e[2]) : e;
	} else t = [
		e,
		e,
		e,
		e
	];
	return t;
}
function Qd(e, t) {
	var n, r = Kd(t.r, 0), i = Kd(t.r0 || 0, 0), a = r > 0;
	if (a || i > 0) {
		if (a || (r = i, i = 0), i > r) {
			var o = r;
			r = i, i = o;
		}
		var s = t.startAngle, c = t.endAngle;
		if (!(isNaN(s) || isNaN(c))) {
			var l = t.cx, u = t.cy, d = !!t.clockwise, f = Wd(c - s), p = f > zd && f % zd;
			if (p > Jd && (f = p), !(r > Jd)) e.moveTo(l, u);
			else if (f > zd - Jd) e.moveTo(l + r * Vd(s), u + r * Bd(s)), e.arc(l, u, r, s, c, !d), i > Jd && (e.moveTo(l + i * Vd(c), u + i * Bd(c)), e.arc(l, u, i, c, s, d));
			else {
				var m = void 0, h = void 0, g = void 0, _ = void 0, v = void 0, y = void 0, b = void 0, x = void 0, S = void 0, C = void 0, w = void 0, T = void 0, E = void 0, D = void 0, O = void 0, k = void 0, A = r * Vd(s), j = r * Bd(s), M = i * Vd(c), ee = i * Bd(c), N = f > Jd;
				if (N) {
					var P = t.cornerRadius;
					P && (n = Zd(P), m = n[0], h = n[1], g = n[2], _ = n[3]);
					var te = Wd(r - i) / 2;
					if (v = qd(te, g), y = qd(te, _), b = qd(te, m), x = qd(te, h), w = S = Kd(v, y), T = C = Kd(b, x), (S > Jd || C > Jd) && (E = r * Vd(c), D = r * Bd(c), O = i * Vd(s), k = i * Bd(s), f < Rd)) {
						var F = Yd(A, j, O, k, E, D, M, ee);
						if (F) {
							var I = A - F[0], L = j - F[1], R = E - F[0], ne = D - F[1], re = 1 / Bd(Hd((I * R + L * ne) / (Gd(I * I + L * L) * Gd(R * R + ne * ne))) / 2), ie = Gd(F[0] * F[0] + F[1] * F[1]);
							w = qd(S, (r - ie) / (re + 1)), T = qd(C, (i - ie) / (re - 1));
						}
					}
				}
				if (!N) e.moveTo(l + A, u + j);
				else if (w > Jd) {
					var z = qd(g, w), ae = qd(_, w), B = Xd(O, k, A, j, r, z, d), V = Xd(E, D, M, ee, r, ae, d);
					e.moveTo(l + B.cx + B.x0, u + B.cy + B.y0), w < S && z === ae ? e.arc(l + B.cx, u + B.cy, w, Ud(B.y0, B.x0), Ud(V.y0, V.x0), !d) : (z > 0 && e.arc(l + B.cx, u + B.cy, z, Ud(B.y0, B.x0), Ud(B.y1, B.x1), !d), e.arc(l, u, r, Ud(B.cy + B.y1, B.cx + B.x1), Ud(V.cy + V.y1, V.cx + V.x1), !d), ae > 0 && e.arc(l + V.cx, u + V.cy, ae, Ud(V.y1, V.x1), Ud(V.y0, V.x0), !d));
				} else e.moveTo(l + A, u + j), e.arc(l, u, r, s, c, !d);
				if (!(i > Jd) || !N) e.lineTo(l + M, u + ee);
				else if (T > Jd) {
					var z = qd(m, T), ae = qd(h, T), B = Xd(M, ee, E, D, i, -ae, d), V = Xd(A, j, O, k, i, -z, d);
					e.lineTo(l + B.cx + B.x0, u + B.cy + B.y0), T < C && z === ae ? e.arc(l + B.cx, u + B.cy, T, Ud(B.y0, B.x0), Ud(V.y0, V.x0), !d) : (ae > 0 && e.arc(l + B.cx, u + B.cy, ae, Ud(B.y0, B.x0), Ud(B.y1, B.x1), !d), e.arc(l, u, i, Ud(B.cy + B.y1, B.cx + B.x1), Ud(V.cy + V.y1, V.cx + V.x1), d), z > 0 && e.arc(l + V.cx, u + V.cy, z, Ud(V.y1, V.x1), Ud(V.y0, V.x0), !d));
				} else e.lineTo(l + M, u + ee), e.arc(l, u, i, c, s, d);
			}
			e.closePath();
		}
	}
}
//#endregion
//#region node_modules/zrender/lib/graphic/shape/Sector.js
var $d = function() {
	function e() {
		this.cx = 0, this.cy = 0, this.r0 = 0, this.r = 0, this.startAngle = 0, this.endAngle = Math.PI * 2, this.clockwise = !0, this.cornerRadius = 0;
	}
	return e;
}(), ef = function(e) {
	r(t, e);
	function t(t) {
		return e.call(this, t) || this;
	}
	return t.prototype.getDefaultShape = function() {
		return new $d();
	}, t.prototype.buildPath = function(e, t) {
		Qd(e, t);
	}, t.prototype.isZeroArea = function() {
		return this.shape.startAngle === this.shape.endAngle || this.shape.r === this.shape.r0;
	}, t;
}(pl);
ef.prototype.type = "sector";
//#endregion
//#region node_modules/zrender/lib/graphic/shape/Ring.js
var tf = function() {
	function e() {
		this.cx = 0, this.cy = 0, this.r = 0, this.r0 = 0;
	}
	return e;
}(), nf = function(e) {
	r(t, e);
	function t(t) {
		return e.call(this, t) || this;
	}
	return t.prototype.getDefaultShape = function() {
		return new tf();
	}, t.prototype.buildPath = function(e, t) {
		var n = t.cx, r = t.cy, i = Math.PI * 2;
		e.moveTo(n + t.r, r), e.arc(n, r, t.r, 0, i, !1), e.moveTo(n + t.r0, r), e.arc(n, r, t.r0, 0, i, !0);
	}, t;
}(pl);
nf.prototype.type = "ring";
//#endregion
//#region node_modules/zrender/lib/graphic/helper/smoothBezier.js
function rf(e, t, n, r) {
	var i = [], a = [], o = [], s = [], c, l, u, d;
	if (r) {
		u = [Infinity, Infinity], d = [-Infinity, -Infinity];
		for (var f = 0, p = e.length; f < p; f++) qe(u, u, e[f]), Je(d, d, e[f]);
		qe(u, u, r[0]), Je(d, d, r[1]);
	}
	for (var f = 0, p = e.length; f < p; f++) {
		var m = e[f];
		if (n) c = e[f ? f - 1 : p - 1], l = e[(f + 1) % p];
		else if (f === 0 || f === p - 1) {
			i.push(Pe(e[f]));
			continue;
		} else c = e[f - 1], l = e[f + 1];
		Le(a, l, c), Be(a, a, t);
		var h = He(m, c), g = He(m, l), _ = h + g;
		_ !== 0 && (h /= _, g /= _), Be(o, a, -h), Be(s, a, g);
		var v = Ie([], m, o), y = Ie([], m, s);
		r && (Je(v, v, u), qe(v, v, d), Je(y, y, u), qe(y, y, d)), i.push(v), i.push(y);
	}
	return n && i.push(i.shift()), i;
}
//#endregion
//#region node_modules/zrender/lib/graphic/helper/poly.js
function af(e, t, n) {
	var r = t.smooth, i = t.points;
	if (i && i.length >= 2) {
		if (r) {
			var a = rf(i, r, n, t.smoothConstraint);
			e.moveTo(i[0][0], i[0][1]);
			for (var o = i.length, s = 0; s < (n ? o : o - 1); s++) {
				var c = a[s * 2], l = a[s * 2 + 1], u = i[(s + 1) % o];
				e.bezierCurveTo(c[0], c[1], l[0], l[1], u[0], u[1]);
			}
		} else {
			e.moveTo(i[0][0], i[0][1]);
			for (var s = 1, d = i.length; s < d; s++) e.lineTo(i[s][0], i[s][1]);
		}
		n && e.closePath();
	}
}
//#endregion
//#region node_modules/zrender/lib/graphic/shape/Polygon.js
var of = function() {
	function e() {
		this.points = null, this.smooth = 0, this.smoothConstraint = null;
	}
	return e;
}(), sf = function(e) {
	r(t, e);
	function t(t) {
		return e.call(this, t) || this;
	}
	return t.prototype.getDefaultShape = function() {
		return new of();
	}, t.prototype.buildPath = function(e, t) {
		af(e, t, !0);
	}, t;
}(pl);
sf.prototype.type = "polygon";
//#endregion
//#region node_modules/zrender/lib/graphic/shape/Polyline.js
var cf = function() {
	function e() {
		this.points = null, this.percent = 1, this.smooth = 0, this.smoothConstraint = null;
	}
	return e;
}(), lf = function(e) {
	r(t, e);
	function t(t) {
		return e.call(this, t) || this;
	}
	return t.prototype.getDefaultStyle = function() {
		return {
			stroke: "#000",
			fill: null
		};
	}, t.prototype.getDefaultShape = function() {
		return new cf();
	}, t.prototype.buildPath = function(e, t) {
		af(e, t, !1);
	}, t;
}(pl);
lf.prototype.type = "polyline";
//#endregion
//#region node_modules/zrender/lib/graphic/shape/Line.js
var uf = {}, df = function() {
	function e() {
		this.x1 = 0, this.y1 = 0, this.x2 = 0, this.y2 = 0, this.percent = 1;
	}
	return e;
}(), ff = function(e) {
	r(t, e);
	function t(t) {
		return e.call(this, t) || this;
	}
	return t.prototype.getDefaultStyle = function() {
		return {
			stroke: "#000",
			fill: null
		};
	}, t.prototype.getDefaultShape = function() {
		return new df();
	}, t.prototype.buildPath = function(e, t) {
		var n, r, i, a;
		if (this.subPixelOptimize) {
			var o = Sl(uf, t, this.style);
			n = o.x1, r = o.y1, i = o.x2, a = o.y2;
		} else n = t.x1, r = t.y1, i = t.x2, a = t.y2;
		var s = t.percent;
		s !== 0 && (e.moveTo(n, r), s < 1 && (i = n * (1 - s) + i * s, a = r * (1 - s) + a * s), e.lineTo(i, a));
	}, t.prototype.pointAt = function(e) {
		var t = this.shape;
		return [t.x1 * (1 - e) + t.x2 * e, t.y1 * (1 - e) + t.y2 * e];
	}, t;
}(pl);
ff.prototype.type = "line";
//#endregion
//#region node_modules/zrender/lib/graphic/shape/BezierCurve.js
var pf = [], mf = function() {
	function e() {
		this.x1 = 0, this.y1 = 0, this.x2 = 0, this.y2 = 0, this.cpx1 = 0, this.cpy1 = 0, this.percent = 1;
	}
	return e;
}();
function hf(e, t, n) {
	var r = e.cpx2, i = e.cpy2;
	return r != null || i != null ? [(n ? Un : Hn)(e.x1, e.cpx1, e.cpx2, e.x2, t), (n ? Un : Hn)(e.y1, e.cpy1, e.cpy2, e.y2, t)] : [(n ? Xn : Yn)(e.x1, e.cpx1, e.x2, t), (n ? Xn : Yn)(e.y1, e.cpy1, e.y2, t)];
}
var gf = function(e) {
	r(t, e);
	function t(t) {
		return e.call(this, t) || this;
	}
	return t.prototype.getDefaultStyle = function() {
		return {
			stroke: "#000",
			fill: null
		};
	}, t.prototype.getDefaultShape = function() {
		return new mf();
	}, t.prototype.buildPath = function(e, t) {
		var n = t.x1, r = t.y1, i = t.x2, a = t.y2, o = t.cpx1, s = t.cpy1, c = t.cpx2, l = t.cpy2, u = t.percent;
		u !== 0 && (e.moveTo(n, r), c == null || l == null ? (u < 1 && ($n(n, o, i, u, pf), o = pf[1], i = pf[2], $n(r, s, a, u, pf), s = pf[1], a = pf[2]), e.quadraticCurveTo(o, s, i, a)) : (u < 1 && (Kn(n, o, c, i, u, pf), o = pf[1], c = pf[2], i = pf[3], Kn(r, s, l, a, u, pf), s = pf[1], l = pf[2], a = pf[3]), e.bezierCurveTo(o, s, c, l, i, a)));
	}, t.prototype.pointAt = function(e) {
		return hf(this.shape, e, !1);
	}, t.prototype.tangentAt = function(e) {
		var t = hf(this.shape, e, !0);
		return Ve(t, t);
	}, t;
}(pl);
gf.prototype.type = "bezier-curve";
//#endregion
//#region node_modules/zrender/lib/graphic/shape/Arc.js
var _f = function() {
	function e() {
		this.cx = 0, this.cy = 0, this.r = 0, this.startAngle = 0, this.endAngle = Math.PI * 2, this.clockwise = !0;
	}
	return e;
}(), vf = function(e) {
	r(t, e);
	function t(t) {
		return e.call(this, t) || this;
	}
	return t.prototype.getDefaultStyle = function() {
		return {
			stroke: "#000",
			fill: null
		};
	}, t.prototype.getDefaultShape = function() {
		return new _f();
	}, t.prototype.buildPath = function(e, t) {
		var n = t.cx, r = t.cy, i = Math.max(t.r, 0), a = t.startAngle, o = t.endAngle, s = t.clockwise, c = Math.cos(a), l = Math.sin(a);
		e.moveTo(c * i + n, l * i + r), e.arc(n, r, i, a, o, !s);
	}, t;
}(pl);
vf.prototype.type = "arc";
//#endregion
//#region node_modules/zrender/lib/graphic/CompoundPath.js
var yf = function(e) {
	r(t, e);
	function t() {
		var t = e !== null && e.apply(this, arguments) || this;
		return t.type = "compound", t;
	}
	return t.prototype._updatePathDirty = function() {
		for (var e = this.shape.paths, t = this.shapeChanged(), n = 0; n < e.length; n++) t ||= e[n].shapeChanged();
		t && this.dirtyShape();
	}, t.prototype.beforeBrush = function() {
		this._updatePathDirty();
		for (var e = this.shape.paths || [], t = this.getGlobalScale(), n = 0; n < e.length; n++) e[n].path || e[n].createPathProxy(), e[n].path.setScale(t[0], t[1], e[n].segmentIgnoreThreshold);
	}, t.prototype.buildPath = function(e, t) {
		for (var n = t.paths || [], r = 0; r < n.length; r++) n[r].buildPath(e, n[r].shape, !0);
	}, t.prototype.afterBrush = function() {
		for (var e = this.shape.paths || [], t = 0; t < e.length; t++) e[t].pathUpdated();
	}, t.prototype.getBoundingRect = function() {
		return this._updatePathDirty.call(this), pl.prototype.getBoundingRect.call(this);
	}, t;
}(pl), bf = function() {
	function e(e) {
		this.colorStops = e || [];
	}
	return e.prototype.addColorStop = function(e, t) {
		this.colorStops.push({
			offset: e,
			color: t
		});
	}, e;
}(), xf = function(e) {
	r(t, e);
	function t(t, n, r, i, a, o) {
		var s = e.call(this, a) || this;
		return s.x = t ?? 0, s.y = n ?? 0, s.x2 = r ?? 1, s.y2 = i ?? 0, s.type = "linear", s.global = o || !1, s;
	}
	return t;
}(bf), Sf = function(e) {
	r(t, e);
	function t(t, n, r, i, a) {
		var o = e.call(this, i) || this;
		return o.x = t ?? .5, o.y = n ?? .5, o.r = r ?? .5, o.type = "radial", o.global = a || !1, o;
	}
	return t;
}(bf), Cf = Math.min, wf = Math.max, Tf = Math.abs, Ef = [0, 0], Df = [0, 0], Of = nn(), kf = Of.minTv, Af = Of.maxTv, jf = function() {
	function e(e, t) {
		this._corners = [], this._axes = [], this._origin = [0, 0];
		for (var n = 0; n < 4; n++) this._corners[n] = new Ft();
		for (var n = 0; n < 2; n++) this._axes[n] = new Ft();
		e && this.fromBoundingRect(e, t);
	}
	return e.prototype.fromBoundingRect = function(e, t) {
		var n = this._corners, r = this._axes, i = e.x, a = e.y, o = i + e.width, s = a + e.height;
		if (n[0].set(i, a), n[1].set(o, a), n[2].set(o, s), n[3].set(i, s), t) for (var c = 0; c < 4; c++) n[c].transform(t);
		Ft.sub(r[0], n[1], n[0]), Ft.sub(r[1], n[3], n[0]), r[0].normalize(), r[1].normalize();
		for (var c = 0; c < 2; c++) this._origin[c] = r[c].dot(n[0]);
	}, e.prototype.intersect = function(e, t, n) {
		var r = !0, i = !t;
		return t && Ft.set(t, 0, 0), Of.reset(n, !i), !this._intersectCheckOneSide(this, e, i, 1) && (r = !1, i) || !this._intersectCheckOneSide(e, this, i, -1) && (r = !1, i) || !i && !Of.negativeSize && Ft.copy(t, r ? Of.useDir ? Of.dirMinTv : kf : Af), r;
	}, e.prototype._intersectCheckOneSide = function(e, t, n, r) {
		for (var i = !0, a = 0; a < 2; a++) {
			var o = e._axes[a];
			if (e._getProjMinMaxOnAxis(a, e._corners, Ef), e._getProjMinMaxOnAxis(a, t._corners, Df), Of.negativeSize || Ef[1] < Df[0] || Ef[0] > Df[1]) {
				if (i = !1, Of.negativeSize || n) return i;
				var s = Tf(Df[0] - Ef[1]), c = Tf(Ef[0] - Df[1]);
				Cf(s, c) > Af.len() && (s < c ? Ft.scale(Af, o, -s * r) : Ft.scale(Af, o, c * r));
			} else if (!n) {
				var s = Tf(Df[0] - Ef[1]), c = Tf(Ef[0] - Df[1]);
				(Of.useDir || Cf(s, c) < kf.len()) && ((s < c || !Of.bidirectional) && (Ft.scale(kf, o, s * r), Of.useDir && Of.calcDirMTV()), (s >= c || !Of.bidirectional) && (Ft.scale(kf, o, -c * r), Of.useDir && Of.calcDirMTV()));
			}
		}
		return i;
	}, e.prototype._getProjMinMaxOnAxis = function(e, t, n) {
		for (var r = this._axes[e], i = this._origin, a = t[0].dot(r) + i[e], o = a, s = a, c = 1; c < t.length; c++) {
			var l = t[c].dot(r) + i[e];
			o = Cf(l, o), s = wf(l, s);
		}
		n[0] = o + Of.touchThreshold, n[1] = s - Of.touchThreshold, Of.negativeSize = n[1] < n[0];
	}, e;
}(), Mf = [], Nf = function(e) {
	r(t, e);
	function t() {
		var t = e !== null && e.apply(this, arguments) || this;
		return t.notClear = !0, t.incremental = 1, t._displayables = [], t._temporaryDisplayables = [], t._cursor = 0, t;
	}
	return t.prototype.traverse = function(e, t) {
		e.call(t, this);
	}, t.prototype.useStyle = function() {
		this.style = {};
	}, t.prototype._useHoverStyle = function() {
		this.__hoverStyle = null;
	}, t.prototype.getCursor = function() {
		return this._cursor;
	}, t.prototype.innerAfterBrush = function() {
		this._cursor = this._displayables.length;
	}, t.prototype.clearDisplaybles = function() {
		this._displayables = [], this._temporaryDisplayables = [], this._cursor = 0, this.markRedraw(), this.notClear = !1;
	}, t.prototype.clearTemporalDisplayables = function() {
		this._temporaryDisplayables = [];
	}, t.prototype.addDisplayable = function(e, t) {
		t ? this._temporaryDisplayables.push(e) : this._displayables.push(e), this.markRedraw();
	}, t.prototype.addDisplayables = function(e, t) {
		t ||= !1;
		for (var n = 0; n < e.length; n++) this.addDisplayable(e[n], t);
	}, t.prototype.getDisplayables = function() {
		return this._displayables;
	}, t.prototype.getTemporalDisplayables = function() {
		return this._temporaryDisplayables;
	}, t.prototype.eachPendingDisplayable = function(e) {
		for (var t = this._cursor; t < this._displayables.length; t++) e && e(this._displayables[t]);
		for (var t = 0; t < this._temporaryDisplayables.length; t++) e && e(this._temporaryDisplayables[t]);
	}, t.prototype.update = function() {
		this.updateTransform();
		for (var e = this._cursor; e < this._displayables.length; e++) {
			var t = this._displayables[e];
			t.parent = this, t.update(), t.parent = null;
		}
		for (var e = 0; e < this._temporaryDisplayables.length; e++) {
			var t = this._temporaryDisplayables[e];
			t.parent = this, t.update(), t.parent = null;
		}
	}, t.prototype.getBoundingRect = function() {
		if (!this._rect) {
			for (var e = new J(Infinity, Infinity, -Infinity, -Infinity), t = 0; t < this._displayables.length; t++) {
				var n = this._displayables[t], r = n.getBoundingRect().clone();
				n.needLocalTransform() && r.applyTransform(n.getLocalTransform(Mf)), e.union(r);
			}
			this._rect = e;
		}
		return this._rect;
	}, t.prototype.contain = function(e, t) {
		var n = this.transformCoordToLocal(e, t);
		if (this.getBoundingRect().contain(n[0], n[1])) {
			for (var r = 0; r < this._displayables.length; r++) if (this._displayables[r].contain(e, t)) return !0;
		}
		return !1;
	}, t;
}(sc), Pf = X();
function Ff(e, t, n, r, i) {
	var a;
	if (t && t.ecModel) {
		var o = t.ecModel.getUpdatePayload();
		a = o && o.animation;
	}
	var s = t && t.isAnimationEnabled(), c = e === "update";
	if (s) {
		var l = void 0, u = void 0, d = void 0;
		return r ? (l = K(r.duration, 200), u = K(r.easing, "cubicOut"), d = 0) : (l = t.getShallow(c ? "animationDurationUpdate" : "animationDuration"), u = t.getShallow(c ? "animationEasingUpdate" : "animationEasing"), d = t.getShallow(c ? "animationDelayUpdate" : "animationDelay")), a && (a.duration != null && (l = a.duration), a.easing != null && (u = a.easing), a.delay != null && (d = a.delay)), U(d) && (d = d(n, i)), U(l) && (l = l(n)), {
			duration: l || 0,
			delay: d,
			easing: u
		};
	}
	return null;
}
function If(e, t, n, r, i, a, o) {
	var s = !1, c;
	U(i) ? (o = a, a = i, i = null) : G(i) && (a = i.cb, o = i.during, s = i.isFrom, c = i.removeOpt, i = i.dataIndex);
	var l = e === "leave";
	l || t.stopAnimation("leave");
	var u = Ff(e, r, i, l ? c || {} : null, r && r.getAnimationDelayParams ? r.getAnimationDelayParams(t, i) : null);
	if (u && u.duration > 0) {
		var d = u.duration, f = u.delay, p = u.easing, m = {
			duration: d,
			delay: f || 0,
			easing: p,
			done: a,
			force: !!a || !!o,
			setToFinal: !l,
			scope: e,
			during: o
		};
		s ? t.animateFrom(n, m) : t.animateTo(n, m);
	} else t.stopAnimation(), !s && t.attr(n), o && o(1), a && a();
}
function Lf(e, t, n, r, i, a) {
	If("update", e, t, n, r, i, a);
}
function Rf(e, t, n, r, i, a) {
	If("enter", e, t, n, r, i, a);
}
function zf(e) {
	if (!e.__zr) return !0;
	for (var t = 0; t < e.animators.length; t++) if (e.animators[t].scope === "leave") return !0;
	return !1;
}
function Bf(e, t, n, r, i, a) {
	zf(e) || If("leave", e, t, n, r, i, a);
}
function Vf(e, t, n, r) {
	e.removeTextContent(), e.removeTextGuideLine(), Bf(e, { style: { opacity: 0 } }, t, n, r);
}
function Hf(e, t, n) {
	function r() {
		e.parent && e.parent.remove(e);
	}
	e.isGroup ? e.traverse(function(e) {
		e.isGroup || Vf(e, t, n, r);
	}) : Vf(e, t, n, r);
}
function Uf(e) {
	Pf(e).oldStyle = e.style;
}
//#endregion
//#region node_modules/echarts/lib/util/graphic.js
var Wf = /* @__PURE__ */ t({
	Arc: () => vf,
	BezierCurve: () => gf,
	BoundingRect: () => J,
	Circle: () => Fd,
	CompoundPath: () => yf,
	Ellipse: () => Ld,
	Group: () => va,
	HOVER_LAYER_FOR_INCREMENTAL: () => 2,
	HOVER_LAYER_FROM_THRESHOLD: () => 1,
	HOVER_LAYER_NO: () => 0,
	Image: () => yl,
	IncrementalDisplayable: () => Nf,
	Line: () => ff,
	LinearGradient: () => xf,
	OrientedBoundingRect: () => jf,
	Path: () => pl,
	Point: () => Ft,
	Polygon: () => sf,
	Polyline: () => lf,
	RadialGradient: () => Sf,
	Rect: () => Dl,
	Ring: () => nf,
	Sector: () => ef,
	Text: () => Ml,
	WH: () => qf,
	XY: () => Kf,
	applyTransform: () => cp,
	calcZ2Range: () => jp,
	clipPointsByRect: () => pp,
	clipRectByRect: () => mp,
	createIcon: () => hp,
	decomposeTransform: () => Fp,
	ensureCopyRect: () => Op,
	ensureCopyTransform: () => kp,
	expandOrShrinkRect: () => bp,
	extendPath: () => Xf,
	extendShape: () => Jf,
	getCurrentCanvasPainter: () => Lp,
	getShapeClass: () => Qf,
	getTransform: () => sp,
	groupTransition: () => fp,
	initProps: () => Rf,
	isBoundingRectAxisAligned: () => Ep,
	isElementRemoved: () => zf,
	lineLineIntersect: () => _p,
	linePolygonIntersect: () => gp,
	makeImage: () => ep,
	makePath: () => $f,
	mergePath: () => np,
	payloadDisableAnimation: () => Pp,
	registerShape: () => Zf,
	removeElement: () => Bf,
	removeElementWithFadeOut: () => Hf,
	resizePath: () => rp,
	retrieveZInfo: () => Ap,
	setTooltipConfig: () => Cp,
	subPixelOptimize: () => op,
	subPixelOptimizeLine: () => ip,
	subPixelOptimizeRect: () => ap,
	transformDirection: () => lp,
	traverseElements: () => Tp,
	traverseUpdateZ: () => Mp,
	updateProps: () => Lf
}), Gf = {}, Kf = ["x", "y"], qf = ["width", "height"];
function Jf(e) {
	return pl.extend(e);
}
var Yf = Md;
function Xf(e, t) {
	return Yf(e, t);
}
function Zf(e, t) {
	Gf[e] = t;
}
function Qf(e) {
	if (Gf.hasOwnProperty(e)) return Gf[e];
}
function $f(e, t, n, r) {
	var i = jd(e, t);
	return n && (r === "center" && (n = tp(n, i.getBoundingRect())), rp(i, n)), i;
}
function ep(e, t, n) {
	var r = new yl({
		style: {
			image: e,
			x: t.x,
			y: t.y,
			width: t.width,
			height: t.height
		},
		onload: function(e) {
			if (n === "center") {
				var i = {
					width: e.width,
					height: e.height
				};
				r.setStyle(tp(t, i));
			}
		}
	});
	return r;
}
function tp(e, t) {
	var n = t.width / t.height, r = e.height * n, i;
	r <= e.width ? i = e.height : (r = e.width, i = r / n);
	var a = e.x + e.width / 2, o = e.y + e.height / 2;
	return {
		x: a - r / 2,
		y: o - i / 2,
		width: r,
		height: i
	};
}
var np = Nd;
function rp(e, t) {
	if (e.applyTransform) {
		var n = e.getBoundingRect().calculateTransform(t);
		e.applyTransform(n);
	}
}
function ip(e, t) {
	return Sl(e, e, { lineWidth: t }), e;
}
function ap(e, t) {
	return Cl(e, e, t), e;
}
var op = wl;
function sp(e, t) {
	for (var n = Ot([]); e && e !== t;) At(n, e.getLocalTransform(), n), e = e.parent;
	return n;
}
function cp(e, t, n) {
	return t && !I(t) && (t = Li.getLocalTransform(t)), n && (t = Pt([], t)), Ke([], e, t);
}
function lp(e, t, n) {
	var r = t[4] === 0 || t[5] === 0 || t[0] === 0 ? 1 : ja(2 * t[4] / t[0]), i = t[4] === 0 || t[5] === 0 || t[2] === 0 ? 1 : ja(2 * t[4] / t[2]), a = [e === "left" ? -r : e === "right" ? r : 0, e === "top" ? -i : e === "bottom" ? i : 0];
	return a = cp(a, t, n), ja(a[0]) > ja(a[1]) ? a[0] > 0 ? "right" : "left" : a[1] > 0 ? "bottom" : "top";
}
function up(e) {
	return !e.isGroup;
}
function dp(e) {
	return e.shape != null;
}
function fp(e, t, n) {
	if (!e || !t) return;
	function r(e) {
		var t = {};
		return e.traverse(function(e) {
			up(e) && e.anid && (t[e.anid] = e);
		}), t;
	}
	function i(e) {
		var t = {
			x: e.x,
			y: e.y,
			rotation: e.rotation
		};
		return dp(e) && (t.shape = k(e.shape)), t;
	}
	var a = r(e);
	t.traverse(function(e) {
		if (up(e) && e.anid) {
			var t = a[e.anid];
			if (t) {
				var r = i(e);
				e.attr(i(t)), Lf(e, r, n, Kl(e).dataIndex);
			}
		}
	});
}
function pp(e, t) {
	return R(e, function(e) {
		var n = e[0];
		n = Aa(n, t.x), n = ka(n, t.x + t.width);
		var r = e[1];
		return r = Aa(r, t.y), r = ka(r, t.y + t.height), [n, r];
	});
}
function mp(e, t) {
	var n = Aa(e.x, t.x), r = ka(e.x + e.width, t.x + t.width), i = Aa(e.y, t.y), a = ka(e.y + e.height, t.y + t.height);
	if (r >= n && a >= i) return {
		x: n,
		y: i,
		width: r - n,
		height: a - i
	};
}
function hp(e, t, n) {
	var r = M({ rectHover: !0 }, t), i = r.style = { strokeNoScale: !0 };
	if (n ||= {
		x: -1,
		y: -1,
		width: 2,
		height: 2
	}, e) return e.indexOf("image://") === 0 ? (i.image = e.slice(8), N(i, n), new yl(r)) : $f(e.replace("path://", ""), r, n, "center");
}
function gp(e, t, n, r, i) {
	for (var a = 0, o = i[i.length - 1]; a < i.length; a++) {
		var s = i[a];
		if (_p(e, t, n, r, s[0], s[1], o[0], o[1])) return !0;
		o = s;
	}
}
function _p(e, t, n, r, i, a, o, s) {
	var c = n - e, l = r - t, u = o - i, d = s - a, f = vp(u, d, c, l);
	if (yp(f)) return !1;
	var p = e - i, m = t - a, h = vp(p, m, c, l) / f;
	if (h < 0 || h > 1) return !1;
	var g = vp(p, m, u, d) / f;
	return !(g < 0 || g > 1);
}
function vp(e, t, n, r) {
	return e * r - n * t;
}
function yp(e) {
	return e <= 1e-6 && e >= -1e-6;
}
function bp(e, t, n, r, i) {
	return t == null ? e : (se(t) ? xp[0] = xp[1] = xp[2] = xp[3] = t : (xp[0] = t[0], xp[1] = t[1], xp[2] = t[2], xp[3] = t[3]), r && (xp[0] = Aa(0, xp[0]), xp[1] = Aa(0, xp[1]), xp[2] = Aa(0, xp[2]), xp[3] = Aa(0, xp[3])), n && (xp[0] = -xp[0], xp[1] = -xp[1], xp[2] = -xp[2], xp[3] = -xp[3]), Sp(e, xp, "x", "width", 3, 1, i && i[0] || 0), Sp(e, xp, "y", "height", 0, 2, i && i[1] || 0), e);
}
var xp = [
	0,
	0,
	0,
	0
];
function Sp(e, t, n, r, i, a, o) {
	var s = t[a] + t[i], c = e[r];
	e[r] += s, o = Aa(0, ka(o, c)), e[r] < o ? (e[r] = o, e[n] += t[i] >= 0 ? -t[i] : t[a] >= 0 ? c + t[a] : ja(s) > 1e-8 ? (c - o) * t[i] / s : 0) : e[n] -= t[i];
}
function Cp(e) {
	var t = e.itemTooltipOption, n = e.componentModel, r = e.itemName, i = W(t) ? { formatter: t } : t, a = n.mainType, o = n.componentIndex, s = {
		componentType: a,
		name: r,
		$vars: ["name"]
	};
	s[a + "Index"] = o;
	var c = e.formatterParamsExtra;
	c && L(z(c), function(e) {
		Ae(s, e) || (s[e] = c[e], s.$vars.push(e));
	});
	var l = Kl(e.el);
	l.componentMainType = a, l.componentIndex = o, l.tooltipConfig = {
		name: r,
		option: N({
			content: r,
			encodeHTMLContent: !0,
			formatterParams: s
		}, i)
	};
}
function wp(e, t) {
	var n;
	e.isGroup && (n = t(e)), n || e.traverse(t);
}
function Tp(e, t) {
	if (e) {
		if (H(e)) for (var n = 0; n < e.length; n++) wp(e[n], t);
		else wp(e, t);
	}
}
function Ep(e) {
	return !e || ja(e[1]) < Dp && ja(e[2]) < Dp || ja(e[0]) < Dp && ja(e[3]) < Dp;
}
var Dp = 1e-5;
function Op(e, t) {
	return e ? J.copy(e, t) : t.clone();
}
function kp(e, t) {
	return t ? kt(e || Dt(), t) : void 0;
}
function Ap(e) {
	return {
		z: e.get("z") || 0,
		zlevel: e.get("zlevel") || 0
	};
}
function jp(e) {
	var t = -Infinity, n = Infinity;
	wp(e, function(e) {
		r(e), r(e.getTextContent()), r(e.getTextGuideLine());
	});
	function r(e) {
		if (e && !e.isGroup) {
			var t = e.currentStates;
			if (t.length) for (var n = 0; n < t.length; n++) i(e.states[t[n]]);
			i(e);
		}
	}
	function i(e) {
		if (e) {
			var r = e.z2;
			r > t && (t = r), r < n && (n = r);
		}
	}
	return n > t && (n = t = 0), {
		min: n,
		max: t
	};
}
function Mp(e, t, n) {
	Np(e, t, n, -Infinity);
}
function Np(e, t, n, r) {
	if (e.ignoreModelZ) return r;
	var i = e.getTextContent(), a = e.getTextGuideLine();
	if (e.isGroup) for (var o = e.childrenRef(), s = 0; s < o.length; s++) r = Aa(Np(o[s], t, n, r), r);
	else e.z = t, e.zlevel = n, r = Aa(e.z2 || 0, r);
	if (i && (i.z = t, i.zlevel = n, isFinite(r) && (i.z2 = r + 2)), a) {
		var c = e.textGuideLineConfig;
		a.z = t, a.zlevel = n, isFinite(r) && (a.z2 = r + (c && c.showAbove ? 1 : -1));
	}
	return r;
}
function Pp(e) {
	return e.animation = { duration: 0 }, e;
}
function Fp(e, t) {
	return t ? kt(Ip.transform, t) : Ot(Ip.transform), Ip.decomposeTransform(), Bi(e, Ip), e;
}
var Ip = new Li();
Ip.transform = Dt();
function Lp(e) {
	var t = e.getZr().painter;
	return t.getType() === "canvas" ? t : null;
}
Zf("circle", Fd), Zf("ellipse", Ld), Zf("sector", ef), Zf("ring", nf), Zf("polygon", sf), Zf("polyline", lf), Zf("rect", Dl), Zf("line", ff), Zf("bezierCurve", gf), Zf("arc", vf);
//#endregion
//#region node_modules/echarts/lib/label/labelStyle.js
var Rp = {};
function zp(e, t) {
	for (var n = 0; n < lu.length; n++) {
		var r = lu[n], i = t[r], a = e.ensureState(r);
		a.style = a.style || {}, a.style.text = i;
	}
	var o = e.currentStates.slice();
	e.clearStates(!0), e.setStyle({ text: t.normal }), e.useStates(o, !0);
}
function Bp(e, t, n) {
	var r = e.labelFetcher, i = e.labelDataIndex, a = e.labelDimIndex, o = t.normal, s;
	r && (s = r.getFormattedLabel(i, "normal", null, a, o && o.get("formatter"), n == null ? null : { interpolatedValue: n })), s ??= U(e.defaultText) ? e.defaultText(i, e, n) : e.defaultText;
	for (var c = { normal: s }, l = 0; l < lu.length; l++) {
		var u = lu[l], d = t[u];
		c[u] = K(r ? r.getFormattedLabel(i, u, null, a, d && d.get("formatter")) : null, s);
	}
	return c;
}
function Vp(e, t, n, r) {
	n ||= Rp;
	for (var i = e instanceof Ml, a = !1, o = 0; o < uu.length; o++) {
		var s = t[uu[o]];
		if (s && s.getShallow("show")) {
			a = !0;
			break;
		}
	}
	var c = i ? e : e.getTextContent();
	if (a) {
		i || (c || (c = new Ml(), e.setTextContent(c)), e.stateProxy && (c.stateProxy = e.stateProxy));
		var l = Bp(n, t), u = t.normal, d = !!u.getShallow("show"), f = Up(u, r && r.normal, n, !1, !i);
		f.text = l.normal, i || e.setTextConfig(Wp(u, n, !1));
		for (var o = 0; o < lu.length; o++) {
			var p = lu[o], s = t[p];
			if (s) {
				var m = c.ensureState(p), h = !!K(s.getShallow("show"), d);
				if (h !== d && (m.ignore = !h), m.style = Up(s, r && r[p], n, !0, !i), m.style.text = l[p], !i) {
					var g = e.ensureState(p);
					g.textConfig = Wp(s, n, !0);
				}
			}
		}
		c.silent = !!u.getShallow("silent"), c.style.x != null && (f.x = c.style.x), c.style.y != null && (f.y = c.style.y), c.ignore = !d, c.useStyle(f), c.dirty(), n.enableTextSetter && (Qp(c).setLabelText = function(e) {
			var r = Bp(n, t, e);
			zp(c, r);
		});
	} else c && (c.ignore = !0);
	e.dirty();
}
function Hp(e, t) {
	t ||= "label";
	for (var n = { normal: e.getModel(t) }, r = 0; r < lu.length; r++) {
		var i = lu[r];
		n[i] = e.getModel([i, t]);
	}
	return n;
}
function Up(e, t, n, r, i) {
	var a = {};
	return Gp(a, e, n, r, i), t && M(a, t), a;
}
function Wp(e, t, n) {
	t ||= {};
	var r = {}, i, a = e.getShallow("rotate"), o = K(e.getShallow("distance"), n ? null : 5), s = e.getShallow("offset");
	return i = e.getShallow("position") || (n ? null : "inside"), i === "outside" && (i = t.defaultOutsidePosition || "top"), i != null && (r.position = i), s != null && (r.offset = s), a != null && (a *= Math.PI / 180, r.rotation = a), o != null && (r.distance = o), r.outsideFill = e.get("color") === "inherit" ? t.inheritColor || null : "auto", t.autoOverflowArea != null && (r.autoOverflowArea = t.autoOverflowArea), t.layoutRect != null && (r.layoutRect = t.layoutRect), r;
}
function Gp(e, t, n, r, i) {
	n ||= Rp;
	var a = t.ecModel, o = a && a.option.textStyle, s = Kp(t), c;
	if (s) {
		c = {};
		var l = "richInheritPlainLabel", u = K(t.get(l), a ? a.get(l) : void 0);
		for (var d in s) if (s.hasOwnProperty(d)) {
			var f = t.getModel(["rich", d]);
			Xp(c[d] = {}, f, o, t, u, n, r, i, !1, !0);
		}
	}
	c && (e.rich = c);
	var p = t.get("overflow");
	p && (e.overflow = p);
	var m = t.get("lineOverflow");
	m && (e.lineOverflow = m);
	var h = e, g = t.get("minMargin");
	if (g != null) g = se(g) ? g / 2 : 0, h.margin = [
		g,
		g,
		g,
		g
	], h.__marginType = $p.minMargin;
	else {
		var _ = t.get("textMargin");
		_ != null && (h.margin = _e(_), h.__marginType = $p.textMargin);
	}
	Xp(e, t, o, null, null, n, r, i, !0, !1);
}
function Kp(e) {
	for (var t; e && e !== e.ecModel;) {
		var n = (e.option || Rp).rich;
		if (n) {
			t ||= {};
			for (var r = z(n), i = 0; i < r.length; i++) {
				var a = r[i];
				t[a] = 1;
			}
		}
		e = e.parentModel;
	}
	return t;
}
var qp = [
	"fontStyle",
	"fontWeight",
	"fontSize",
	"fontFamily",
	"textShadowColor",
	"textShadowBlur",
	"textShadowOffsetX",
	"textShadowOffsetY"
], Jp = [
	"align",
	"lineHeight",
	"width",
	"height",
	"tag",
	"verticalAlign",
	"ellipsis"
], Yp = [
	"padding",
	"borderWidth",
	"borderRadius",
	"borderDashOffset",
	"backgroundColor",
	"borderColor",
	"shadowColor",
	"shadowBlur",
	"shadowOffsetX",
	"shadowOffsetY"
];
function Xp(e, t, n, r, i, a, o, s, c, l) {
	n = !o && n || Rp;
	var u = a && a.inheritColor, d = t.getShallow("color"), f = t.getShallow("textBorderColor"), p = K(t.getShallow("opacity"), n.opacity);
	(d === "inherit" || d === "auto") && (d = u || null), (f === "inherit" || f === "auto") && (f = u || null), s || (d ||= n.color, f ||= n.textBorderColor), d != null && (e.fill = d), f != null && (e.stroke = f);
	var m = K(t.getShallow("textBorderWidth"), n.textBorderWidth);
	m != null && (e.lineWidth = m);
	var h = K(t.getShallow("textBorderType"), n.textBorderType);
	h != null && (e.lineDash = h);
	var g = K(t.getShallow("textBorderDashOffset"), n.textBorderDashOffset);
	g != null && (e.lineDashOffset = g), !o && p == null && !l && (p = a && a.defaultOpacity), p != null && (e.opacity = p), !o && !s && e.fill == null && a.inheritColor && (e.fill = a.inheritColor);
	for (var _ = 0; _ < qp.length; _++) {
		var v = qp[_], y = i !== !1 && r ? he(t.getShallow(v), r.getShallow(v), n[v]) : K(t.getShallow(v), n[v]);
		y != null && (e[v] = y);
	}
	for (var _ = 0; _ < Jp.length; _++) {
		var v = Jp[_], y = t.getShallow(v);
		y != null && (e[v] = y);
	}
	if (e.verticalAlign == null) {
		var b = t.getShallow("baseline");
		b != null && (e.verticalAlign = b);
	}
	if (!c || !a.disableBox) {
		for (var _ = 0; _ < Yp.length; _++) {
			var v = Yp[_], y = t.getShallow(v);
			y != null && (e[v] = y);
		}
		var x = t.getShallow("borderType");
		x != null && (e.borderDash = x), (e.backgroundColor === "auto" || e.backgroundColor === "inherit") && u && (e.backgroundColor = u), (e.borderColor === "auto" || e.borderColor === "inherit") && u && (e.borderColor = u);
	}
}
function Zp(e, t) {
	var n = t && t.getModel("textStyle");
	return ye([
		e.fontStyle || n && n.getShallow("fontStyle") || "",
		e.fontWeight || n && n.getShallow("fontWeight") || "",
		(e.fontSize || n && n.getShallow("fontSize") || 12) + "px",
		e.fontFamily || n && n.getShallow("fontFamily") || "sans-serif"
	].join(" "));
}
var Qp = X(), $p = {
	minMargin: 1,
	textMargin: 2
}, em = ["textStyle", "color"], tm = [
	"fontStyle",
	"fontWeight",
	"fontSize",
	"fontFamily",
	"padding",
	"lineHeight",
	"rich",
	"width",
	"height",
	"overflow"
], nm = new Ml(), rm = function() {
	function e() {}
	return e.prototype.getTextColor = function(e) {
		var t = this.ecModel;
		return this.getShallow("color") || (!e && t ? t.get(em) : null);
	}, e.prototype.getFont = function() {
		return Zp({
			fontStyle: this.getShallow("fontStyle"),
			fontWeight: this.getShallow("fontWeight"),
			fontSize: this.getShallow("fontSize"),
			fontFamily: this.getShallow("fontFamily")
		}, this.ecModel);
	}, e.prototype.getTextRect = function(e) {
		for (var t = {
			text: e,
			verticalAlign: this.getShallow("verticalAlign") || this.getShallow("baseline")
		}, n = 0; n < tm.length; n++) t[tm[n]] = this.getShallow(tm[n]);
		return nm.useStyle(t), nm.update(), nm.getBoundingRect();
	}, e;
}(), im = [
	["lineWidth", "width"],
	["stroke", "color"],
	["opacity"],
	["shadowBlur"],
	["shadowOffsetX"],
	["shadowOffsetY"],
	["shadowColor"],
	["lineDash", "type"],
	["lineDashOffset", "dashOffset"],
	["lineCap", "cap"],
	["lineJoin", "join"],
	["miterLimit"]
], am = Es(im), om = function() {
	function e() {}
	return e.prototype.getLineStyle = function(e) {
		return am(this, e);
	}, e;
}(), sm = [
	["fill", "color"],
	["stroke", "borderColor"],
	["lineWidth", "borderWidth"],
	["opacity"],
	["shadowBlur"],
	["shadowOffsetX"],
	["shadowOffsetY"],
	["shadowColor"],
	["lineDash", "borderType"],
	["lineDashOffset", "borderDashOffset"],
	["lineCap", "borderCap"],
	["lineJoin", "borderJoin"],
	["miterLimit", "borderMiterLimit"]
], cm = Es(sm), lm = function() {
	function e() {}
	return e.prototype.getItemStyle = function(e, t) {
		return cm(this, e, t);
	}, e;
}(), um = function() {
	function e(e, t, n) {
		this.parentModel = t, this.ecModel = n, this.option = e;
	}
	return e.prototype.init = function(e, t, n) {}, e.prototype.mergeOption = function(e, t) {
		A(this.option, e, !0);
	}, e.prototype.get = function(e, t) {
		return e == null ? this.option : this._doGet(this.parsePath(e), !t && this.parentModel);
	}, e.prototype.getShallow = function(e, t) {
		var n = this.option, r = n == null ? n : n[e];
		if (r == null && !t) {
			var i = this.parentModel;
			i && (r = i.getShallow(e));
		}
		return r;
	}, e.prototype.getModel = function(t, n) {
		var r = t != null, i = r ? this.parsePath(t) : null, a = r ? this._doGet(i) : this.option;
		return n ||= this.parentModel && this.parentModel.getModel(this.resolveParentPath(i)), new e(a, n, this.ecModel);
	}, e.prototype.isEmpty = function() {
		return this.option == null;
	}, e.prototype.restoreData = function() {}, e.prototype.clone = function() {
		var e = this.constructor;
		return new e(k(this.option));
	}, e.prototype.parsePath = function(e) {
		return typeof e == "string" ? e.split(".") : e;
	}, e.prototype.resolveParentPath = function(e) {
		return e;
	}, e.prototype.isAnimationEnabled = function() {
		if (!a.node && this.option) {
			if (this.option.animation != null) return !!this.option.animation;
			if (this.parentModel) return this.parentModel.isAnimationEnabled();
		}
	}, e.prototype._doGet = function(e, t) {
		var n = this.option;
		if (!e) return n;
		for (var r = 0; r < e.length && !(e[r] && (n = n && typeof n == "object" ? n[e[r]] : null, n == null)); r++);
		return n == null && t && (n = t._doGet(this.resolveParentPath(e), t.parentModel)), n;
	}, e;
}();
vs(um), Ss(um), F(um, om), F(um, lm), F(um, Os), F(um, rm);
//#endregion
//#region node_modules/echarts/lib/util/component.js
var dm = Math.round(Math.random() * 10);
function fm(e) {
	return [e || "", dm++].join("_");
}
function pm(e) {
	var t = {};
	e.registerSubTypeDefaulter = function(e, n) {
		var r = hs(e);
		t[r.main] = n;
	}, e.determineSubType = function(n, r) {
		var i = r.type;
		if (!i) {
			var a = hs(n).main;
			e.hasSubTypes(n) && t[a] && (i = t[a](r));
		}
		return i;
	};
}
function mm(e, t) {
	e.topologicalTravel = function(e, t, r, i) {
		if (!e.length) return;
		var a = n(t), o = a.graph, s = a.noEntryList, c = {};
		for (L(e, function(e) {
			c[e] = !0;
		}); s.length;) {
			var l = s.pop(), u = o[l], d = !!c[l];
			d && (r.call(i, l, u.originalDeps.slice()), delete c[l]), L(u.successor, d ? p : f);
		}
		L(c, function() {
			throw Error("");
		});
		function f(e) {
			o[e].entryCount--, o[e].entryCount === 0 && s.push(e);
		}
		function p(e) {
			c[e] = !0, f(e);
		}
	};
	function n(e) {
		var n = {}, a = [];
		return L(e, function(o) {
			var s = r(n, o), c = i(s.originalDeps = t(o), e);
			s.entryCount = c.length, s.entryCount === 0 && a.push(o), L(c, function(e) {
				P(s.predecessor, e) < 0 && s.predecessor.push(e);
				var t = r(n, e);
				P(t.successor, e) < 0 && t.successor.push(o);
			});
		}), {
			graph: n,
			noEntryList: a
		};
	}
	function r(e, t) {
		return e[t] || (e[t] = {
			predecessor: [],
			successor: []
		}), e[t];
	}
	function i(e, t) {
		var n = [];
		return L(e, function(e) {
			P(t, e) >= 0 && n.push(e);
		}), n;
	}
}
//#endregion
//#region node_modules/echarts/lib/i18n/langEN.js
var hm = {
	time: {
		month: [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December"
		],
		monthAbbr: [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec"
		],
		dayOfWeek: [
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday"
		],
		dayOfWeekAbbr: [
			"Sun",
			"Mon",
			"Tue",
			"Wed",
			"Thu",
			"Fri",
			"Sat"
		]
	},
	legend: { selector: {
		all: "All",
		inverse: "Inv"
	} },
	toolbox: {
		brush: { title: {
			rect: "Box Select",
			polygon: "Lasso Select",
			lineX: "Horizontally Select",
			lineY: "Vertically Select",
			keep: "Keep Selections",
			clear: "Clear Selections"
		} },
		dataView: {
			title: "Data View",
			lang: [
				"Data View",
				"Close",
				"Refresh"
			]
		},
		dataZoom: { title: {
			zoom: "Zoom",
			back: "Zoom Reset"
		} },
		magicType: { title: {
			line: "Switch to Line Chart",
			bar: "Switch to Bar Chart",
			stack: "Stack",
			tiled: "Tile"
		} },
		restore: { title: "Restore" },
		saveAsImage: {
			title: "Save as Image",
			lang: ["Right Click to Save Image"]
		}
	},
	series: { typeNames: {
		pie: "Pie chart",
		bar: "Bar chart",
		line: "Line chart",
		scatter: "Scatter plot",
		effectScatter: "Ripple scatter plot",
		radar: "Radar chart",
		tree: "Tree",
		treemap: "Treemap",
		boxplot: "Boxplot",
		candlestick: "Candlestick",
		k: "K line chart",
		heatmap: "Heat map",
		map: "Map",
		parallel: "Parallel coordinate map",
		lines: "Line graph",
		graph: "Relationship graph",
		sankey: "Sankey diagram",
		funnel: "Funnel chart",
		gauge: "Gauge",
		pictorialBar: "Pictorial bar",
		themeRiver: "Theme River Map",
		sunburst: "Sunburst",
		custom: "Custom chart",
		chart: "Chart"
	} },
	aria: {
		general: {
			withTitle: "This is a chart about \"{title}\"",
			withoutTitle: "This is a chart"
		},
		series: {
			single: {
				prefix: "",
				withName: " with type {seriesType} named {seriesName}.",
				withoutName: " with type {seriesType}."
			},
			multiple: {
				prefix: ". It consists of {seriesCount} series count.",
				withName: " The {seriesId} series is a {seriesType} representing {seriesName}.",
				withoutName: " The {seriesId} series is a {seriesType}.",
				separator: {
					middle: "",
					end: ""
				}
			}
		},
		data: {
			allData: "The data is as follows: ",
			partialData: "The first {displayCnt} items are: ",
			withName: "the data for {name} is {value}",
			withoutName: "{value}",
			separator: {
				middle: ", ",
				end: ". "
			}
		}
	}
}, gm = {
	time: {
		month: [
			"一月",
			"二月",
			"三月",
			"四月",
			"五月",
			"六月",
			"七月",
			"八月",
			"九月",
			"十月",
			"十一月",
			"十二月"
		],
		monthAbbr: [
			"1月",
			"2月",
			"3月",
			"4月",
			"5月",
			"6月",
			"7月",
			"8月",
			"9月",
			"10月",
			"11月",
			"12月"
		],
		dayOfWeek: [
			"星期日",
			"星期一",
			"星期二",
			"星期三",
			"星期四",
			"星期五",
			"星期六"
		],
		dayOfWeekAbbr: [
			"日",
			"一",
			"二",
			"三",
			"四",
			"五",
			"六"
		]
	},
	legend: { selector: {
		all: "全选",
		inverse: "反选"
	} },
	toolbox: {
		brush: { title: {
			rect: "矩形选择",
			polygon: "圈选",
			lineX: "横向选择",
			lineY: "纵向选择",
			keep: "保持选择",
			clear: "清除选择"
		} },
		dataView: {
			title: "数据视图",
			lang: [
				"数据视图",
				"关闭",
				"刷新"
			]
		},
		dataZoom: { title: {
			zoom: "区域缩放",
			back: "区域缩放还原"
		} },
		magicType: { title: {
			line: "切换为折线图",
			bar: "切换为柱状图",
			stack: "切换为堆叠",
			tiled: "切换为平铺"
		} },
		restore: { title: "还原" },
		saveAsImage: {
			title: "保存为图片",
			lang: ["右键另存为图片"]
		}
	},
	series: { typeNames: {
		pie: "饼图",
		bar: "柱状图",
		line: "折线图",
		scatter: "散点图",
		effectScatter: "涟漪散点图",
		radar: "雷达图",
		tree: "树图",
		treemap: "矩形树图",
		boxplot: "箱型图",
		candlestick: "K线图",
		k: "K线图",
		heatmap: "热力图",
		map: "地图",
		parallel: "平行坐标图",
		lines: "线图",
		graph: "关系图",
		sankey: "桑基图",
		funnel: "漏斗图",
		gauge: "仪表盘图",
		pictorialBar: "象形柱图",
		themeRiver: "主题河流图",
		sunburst: "旭日图",
		custom: "自定义图表",
		chart: "图表"
	} },
	aria: {
		general: {
			withTitle: "这是一个关于“{title}”的图表。",
			withoutTitle: "这是一个图表，"
		},
		series: {
			single: {
				prefix: "",
				withName: "图表类型是{seriesType}，表示{seriesName}。",
				withoutName: "图表类型是{seriesType}。"
			},
			multiple: {
				prefix: "它由{seriesCount}个图表系列组成。",
				withName: "第{seriesId}个系列是一个表示{seriesName}的{seriesType}，",
				withoutName: "第{seriesId}个系列是一个{seriesType}，",
				separator: {
					middle: "；",
					end: "。"
				}
			}
		},
		data: {
			allData: "其数据是——",
			partialData: "其中，前{displayCnt}项是——",
			withName: "{name}的数据是{value}",
			withoutName: "{value}",
			separator: {
				middle: "，",
				end: ""
			}
		}
	}
}, _m = "ZH", vm = "EN", ym = vm, bm = {}, xm = {}, Sm = a.domSupported ? function() {
	return (document.documentElement.lang || navigator.language || navigator.browserLanguage || ym).toUpperCase().indexOf(_m) > -1 ? _m : ym;
}() : ym;
function Cm(e, t) {
	e = e.toUpperCase(), xm[e] = new um(t), bm[e] = t;
}
function wm(e) {
	if (W(e)) {
		var t = bm[e.toUpperCase()] || {};
		return e === _m || e === vm ? k(t) : A(k(t), k(bm[ym]), !1);
	}
	return A(k(e), k(bm[ym]), !1);
}
function Tm(e) {
	return xm[e];
}
function Em() {
	return xm[ym];
}
Cm(vm, hm), Cm(_m, gm);
//#endregion
//#region node_modules/echarts/lib/scale/break.js
var Dm = null;
function Om() {
	return Dm;
}
function km(e, t) {
	var n = Om(), r = t.breakOption, i = t.breakParsed;
	return !i && n && (i = n.parseAxisBreakOption(r, e)), i;
}
function Am(e) {
	var t = e.brk;
	return t ? t.breaks : [];
}
function jm(e) {
	var t = e.brk;
	return t ? t.hasBreaks() : !1;
}
//#endregion
//#region node_modules/echarts/lib/util/time.js
var Mm = 1e3, Nm = Mm * 60, Pm = Nm * 60, Fm = Pm * 24, Im = Fm * 365, Lm = {
	year: /({yyyy}|{yy})/,
	month: /({MMMM}|{MMM}|{MM}|{M})/,
	day: /({dd}|{d})/,
	hour: /({HH}|{H}|{hh}|{h})/,
	minute: /({mm}|{m})/,
	second: /({ss}|{s})/,
	millisecond: /({SSS}|{S})/
}, Rm = {
	year: "{yyyy}",
	month: "{MMM}",
	day: "{d}",
	hour: "{HH}:{mm}",
	minute: "{HH}:{mm}",
	second: "{HH}:{mm}:{ss}",
	millisecond: "{HH}:{mm}:{ss} {SSS}"
}, zm = "{yyyy}-{MM}-{dd} {HH}:{mm}:{ss} {SSS}", Bm = "{yyyy}-{MM}-{dd}", Vm = {
	year: "{yyyy}",
	month: "{yyyy}-{MM}",
	day: Bm,
	hour: Bm + " " + Rm.hour,
	minute: Bm + " " + Rm.minute,
	second: Bm + " " + Rm.second,
	millisecond: zm
}, Hm = [
	"year",
	"month",
	"day",
	"hour",
	"minute",
	"second",
	"millisecond"
], Um = [
	"year",
	"half-year",
	"quarter",
	"month",
	"week",
	"half-week",
	"day",
	"half-day",
	"quarter-day",
	"hour",
	"minute",
	"second",
	"millisecond"
];
function Wm(e) {
	return !W(e) && !U(e) ? Gm(e) : e;
}
function Gm(e) {
	e ||= {};
	var t = {}, n = !0;
	return L(Hm, function(t) {
		n &&= e[t] == null;
	}), L(Hm, function(r, i) {
		var a = e[r];
		t[r] = {};
		for (var o = null, s = i; s >= 0; s--) {
			var c = Hm[s], l = G(a) && !H(a) ? a[c] : a, u = void 0;
			H(l) ? (u = l.slice(), o = u[0] || "") : W(l) ? (o = l, u = [o]) : (o == null ? o = Rm[r] : Lm[c].test(o) || (o = t[c][c][0] + " " + o), u = [o], n && (u[1] = "{primary|" + o + "}")), t[r][c] = u;
		}
	}), t;
}
function Km(e, t) {
	return e += "", "0000".substr(0, t - e.length) + e;
}
function qm(e) {
	switch (e) {
		case "half-year":
		case "quarter": return "month";
		case "week":
		case "half-week": return "day";
		case "half-day":
		case "quarter-day": return "hour";
		default: return e;
	}
}
function Jm(e) {
	return e === qm(e);
}
function Ym(e) {
	switch (e) {
		case "year":
		case "month": return "day";
		case "millisecond": return "millisecond";
		default: return "second";
	}
}
function Xm(e, t, n, r) {
	var i = eo(e), a = i[eh(n)](), o = i[th(n)]() + 1, s = Math.floor((o - 1) / 3) + 1, c = i[nh(n)](), l = i["get" + (n ? "UTC" : "") + "Day"](), u = i[rh(n)](), d = (u - 1) % 12 + 1, f = i[ih(n)](), p = i[ah(n)](), m = i[oh(n)](), h = u >= 12 ? "pm" : "am", g = h.toUpperCase(), _ = (r instanceof um ? r : Tm(r || Sm) || Em()).getModel("time"), v = _.get("month"), y = _.get("monthAbbr"), b = _.get("dayOfWeek"), x = _.get("dayOfWeekAbbr");
	return (t || "").replace(/{a}/g, h + "").replace(/{A}/g, g + "").replace(/{yyyy}/g, a + "").replace(/{yy}/g, Km(a % 100 + "", 2)).replace(/{Q}/g, s + "").replace(/{MMMM}/g, v[o - 1]).replace(/{MMM}/g, y[o - 1]).replace(/{MM}/g, Km(o, 2)).replace(/{M}/g, o + "").replace(/{dd}/g, Km(c, 2)).replace(/{d}/g, c + "").replace(/{eeee}/g, b[l]).replace(/{ee}/g, x[l]).replace(/{e}/g, l + "").replace(/{HH}/g, Km(u, 2)).replace(/{H}/g, u + "").replace(/{hh}/g, Km(d + "", 2)).replace(/{h}/g, d + "").replace(/{mm}/g, Km(f, 2)).replace(/{m}/g, f + "").replace(/{ss}/g, Km(p, 2)).replace(/{s}/g, p + "").replace(/{SSS}/g, Km(m, 3)).replace(/{S}/g, m + "");
}
function Zm(e, t, n, r, i) {
	var a = null;
	if (W(n)) a = n;
	else if (U(n)) {
		var o = {
			time: e.time,
			level: e.time ? e.time.level : 0
		}, s = Om();
		s && s.makeAxisLabelFormatterParamBreak(o, e.break), a = n(e.value, t, o);
	} else {
		var c = e.time;
		if (c) {
			var l = n[c.lowerTimeUnit][c.upperTimeUnit];
			a = l[Math.min(c.level, l.length - 1)] || "";
		} else {
			var u = Qm(e.value, i);
			a = n[u][u][0];
		}
	}
	return Xm(new Date(e.value), a, i, r);
}
function Qm(e, t) {
	var n = eo(e), r = n[th(t)]() + 1, i = n[nh(t)](), a = n[rh(t)](), o = n[ih(t)](), s = n[ah(t)](), c = n[oh(t)]() === 0, l = c && s === 0, u = l && o === 0, d = u && a === 0, f = d && i === 1;
	return f && r === 1 ? "year" : f ? "month" : d ? "day" : u ? "hour" : l ? "minute" : c ? "second" : "millisecond";
}
function $m(e, t, n) {
	switch (t) {
		case "year": e[ch(n)](0);
		case "month": e[lh(n)](1);
		case "day": e[uh(n)](0);
		case "hour": e[dh(n)](0);
		case "minute": e[fh(n)](0);
		case "second": e[ph(n)](0);
	}
	return e;
}
function eh(e) {
	return e ? "getUTCFullYear" : "getFullYear";
}
function th(e) {
	return e ? "getUTCMonth" : "getMonth";
}
function nh(e) {
	return e ? "getUTCDate" : "getDate";
}
function rh(e) {
	return e ? "getUTCHours" : "getHours";
}
function ih(e) {
	return e ? "getUTCMinutes" : "getMinutes";
}
function ah(e) {
	return e ? "getUTCSeconds" : "getSeconds";
}
function oh(e) {
	return e ? "getUTCMilliseconds" : "getMilliseconds";
}
function sh(e) {
	return e ? "setUTCFullYear" : "setFullYear";
}
function ch(e) {
	return e ? "setUTCMonth" : "setMonth";
}
function lh(e) {
	return e ? "setUTCDate" : "setDate";
}
function uh(e) {
	return e ? "setUTCHours" : "setHours";
}
function dh(e) {
	return e ? "setUTCMinutes" : "setMinutes";
}
function fh(e) {
	return e ? "setUTCSeconds" : "setSeconds";
}
function ph(e) {
	return e ? "setUTCMilliseconds" : "setMilliseconds";
}
//#endregion
//#region node_modules/echarts/lib/util/format.js
function mh(e) {
	if (!ao(e)) return W(e) ? e : "-";
	var t = (e + "").split(".");
	return t[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, "$1,") + (t.length > 1 ? "." + t[1] : "");
}
function hh(e, t) {
	return e = (e || "").toLowerCase().replace(/-(.)/g, function(e, t) {
		return t.toUpperCase();
	}), t && e && (e = e.charAt(0).toUpperCase() + e.slice(1)), e;
}
var gh = _e;
function _h(e, t, n) {
	var r = "{yyyy}-{MM}-{dd} {HH}:{mm}:{ss}";
	function i(e) {
		return e && ye(e) ? e : "-";
	}
	function a(e) {
		return lo(e);
	}
	var o = t === "time", s = e instanceof Date;
	if (o || s) {
		var c = o ? eo(e) : e;
		if (!isNaN(+c)) return Xm(c, r, n);
		if (s) return "-";
	}
	if (t === "ordinal") return oe(e) ? i(e) : se(e) && a(e) ? e + "" : "-";
	var l = io(e);
	return a(l) ? mh(l) : oe(e) ? i(e) : typeof e == "boolean" ? e + "" : "-";
}
var vh = [
	"a",
	"b",
	"c",
	"d",
	"e",
	"f",
	"g"
], yh = function(e, t) {
	return "{" + e + (t ?? "") + "}";
};
function bh(e, t, n) {
	H(t) || (t = [t]);
	var r = t.length;
	if (!r) return "";
	for (var i = t[0].$vars || [], a = 0; a < i.length; a++) {
		var o = vh[a];
		e = e.replace(yh(o), yh(o, 0));
	}
	for (var s = 0; s < r; s++) for (var c = 0; c < i.length; c++) {
		var l = t[s][i[c]];
		e = e.replace(yh(vh[c], s), n ? dt(l) : l);
	}
	return e;
}
function xh(e, t) {
	var n = W(e) ? {
		color: e,
		extraCssText: t
	} : e || {}, r = n.color, i = n.type;
	t = n.extraCssText;
	var a = n.renderMode || "html";
	return r ? a === "html" ? i === "subItem" ? "<span style=\"display:inline-block;vertical-align:middle;margin-right:8px;margin-left:3px;border-radius:4px;width:4px;height:4px;background-color:" + dt(r) + ";" + (t || "") + "\"></span>" : "<span style=\"display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:" + dt(r) + ";" + (t || "") + "\"></span>" : {
		renderMode: a,
		content: "{" + (n.markerId || "markerX") + "|}  ",
		style: i === "subItem" ? {
			width: 4,
			height: 4,
			borderRadius: 2,
			backgroundColor: r
		} : {
			width: 10,
			height: 10,
			borderRadius: 5,
			backgroundColor: r
		}
	} : "";
}
function Sh(e, t) {
	return t ||= "transparent", W(e) ? e : G(e) && e.colorStops && (e.colorStops[0] || {}).color || t;
}
//#endregion
//#region node_modules/echarts/lib/core/CoordinateSystem.js
var Ch = {}, wh = {}, Th = function() {
	function e() {
		this._normalMasterList = [], this._nonSeriesBoxMasterList = [];
	}
	return e.prototype.create = function(e, t) {
		this._nonSeriesBoxMasterList = n(Ch, !0), this._normalMasterList = n(wh, !1);
		function n(n, r) {
			var i = [];
			return L(n, function(n, r) {
				var a = n.create(e, t);
				i = i.concat(a || []);
			}), i;
		}
	}, e.prototype.update = function(e, t) {
		L(this._normalMasterList, function(n) {
			n.update && n.update(e, t);
		});
	}, e.prototype.getCoordinateSystems = function() {
		return this._normalMasterList.concat(this._nonSeriesBoxMasterList);
	}, e.register = function(e, t) {
		if (e === "matrix" || e === "calendar") {
			Ch[e] = t;
			return;
		}
		wh[e] = t;
	}, e.get = function(e) {
		return wh[e] || Ch[e];
	}, e;
}();
function Eh(e) {
	return !!Ch[e];
}
var Dh = q();
function Oh(e) {
	var t = e.getShallow("coord", !0), n = 1;
	if (t == null) {
		var r = Dh.get(e.type);
		r && r.getCoord2 && (n = 2, t = r.getCoord2(e));
	}
	return {
		coord: t,
		from: n
	};
}
function kh(e, t) {
	var n = e.getShallow("coordinateSystem"), r = e.getShallow("coordinateSystemUsage", !0), i = 0;
	if (n) {
		var a = e.mainType === "series";
		r ??= a ? "data" : "box", r === "data" ? (i = 1, a || (i = 0)) : r === "box" && (i = 2, !a && !Eh(n) && (i = 0));
	}
	return {
		coordSysType: n,
		kind: i
	};
}
function Ah(e) {
	var t = e.targetModel, n = e.coordSysType, r = e.coordSysProvider, i = e.isDefaultDataCoordSys;
	e.allowNotFound;
	var a = kh(t, !0), o = a.kind, s = a.coordSysType;
	if (i && o !== 1 && (o = 1, s = n), o === 0 || s !== n) return 0;
	var c = r(n, t);
	return c ? (o === 1 ? t.coordinateSystem = c : t.boxCoordinateSystem = c, o) : 0;
}
//#endregion
//#region node_modules/echarts/lib/util/layout.js
var jh = L, Mh = [
	"left",
	"right",
	"top",
	"bottom",
	"width",
	"height"
], Nh = [[
	"width",
	"left",
	"right"
], [
	"height",
	"top",
	"bottom"
]];
function Ph(e, t, n, r, i) {
	var a = 0, o = 0;
	r ??= Infinity, i ??= Infinity;
	var s = 0;
	t.eachChild(function(c, l) {
		var u = c.getBoundingRect(), d = t.childAt(l + 1), f = d && d.getBoundingRect(), p, m;
		if (e === "horizontal") {
			var h = u.width + (f ? -f.x + u.x : 0);
			p = a + h, p > r || c.newline ? (a = 0, p = h, o += s + n, s = u.height) : s = Math.max(s, u.height);
		} else {
			var g = u.height + (f ? -f.y + u.y : 0);
			m = o + g, m > i || c.newline ? (a += s + n, o = 0, m = g, s = u.width) : s = Math.max(s, u.width);
		}
		c.newline || (c.x = a, c.y = o, c.markRedraw(), e === "horizontal" ? a = p + n : o = m + n);
	});
}
V(Ph, "vertical"), V(Ph, "horizontal");
function Fh(e, t) {
	return {
		left: e.getShallow("left", t),
		top: e.getShallow("top", t),
		right: e.getShallow("right", t),
		bottom: e.getShallow("bottom", t),
		width: e.getShallow("width", t),
		height: e.getShallow("height", t)
	};
}
function Ih(e, t, n) {
	n = gh(n || 0);
	var r = t.width, i = t.height, a = Va(e.left, r), o = Va(e.top, i), s = Va(e.right, r), c = Va(e.bottom, i), l = Va(e.width, r), u = Va(e.height, i), d = n[2] + n[0], f = n[1] + n[3], p = e.aspect;
	switch (isNaN(l) && (l = r - s - f - a), isNaN(u) && (u = i - c - d - o), p != null && (isNaN(l) && isNaN(u) && (p > r / i ? l = r * .8 : u = i * .8), isNaN(l) && (l = p * u), isNaN(u) && (u = l / p)), isNaN(a) && (a = r - s - l - f), isNaN(o) && (o = i - c - u - d), e.left || e.right) {
		case "center":
			a = r / 2 - l / 2 - n[3];
			break;
		case "right": a = r - l - f;
	}
	switch (e.top || e.bottom) {
		case "middle":
		case "center":
			o = i / 2 - u / 2 - n[0];
			break;
		case "bottom": o = i - u - d;
	}
	a ||= 0, o ||= 0, isNaN(l) && (l = r - f - a - (s || 0)), isNaN(u) && (u = i - d - o - (c || 0));
	var m = new J((t.x || 0) + a + n[3], (t.y || 0) + o + n[0], l, u);
	return m.margin = n, m;
}
var Lh = {
	rect: 1,
	point: 2
};
function Rh(e, t, n) {
	var r, i, a, o = e.boxCoordinateSystem, s;
	if (o) {
		var c = Oh(e), l = c.coord, u = c.from;
		if (o.dataToLayout) {
			a = Lh.rect, s = u;
			var d = o.dataToLayout(l);
			r = d.contentRect || d.rect;
		} else n && n.enableLayoutOnlyByCenter && o.dataToPoint && (a = Lh.point, s = u, i = o.dataToPoint(l));
	}
	return a ??= Lh.rect, a === Lh.rect && (r ||= {
		x: 0,
		y: 0,
		width: t.getWidth(),
		height: t.getHeight()
	}, i = [r.x + r.width / 2, r.y + r.height / 2]), {
		type: a,
		refContainer: r,
		refPoint: i,
		boxCoordFrom: s
	};
}
function zh(e) {
	var t = e.layoutMode || e.constructor.layoutMode;
	return G(t) ? t : t ? { type: t } : null;
}
function Bh(e, t, n) {
	var r = n && n.ignoreSize;
	!H(r) && (r = [r, r]);
	var i = o(Nh[0], 0), a = o(Nh[1], 1);
	c(Nh[0], e, i), c(Nh[1], e, a);
	function o(n, i) {
		var a = {}, o = 0, c = {}, l = 0, u = 2;
		if (jh(n, function(t) {
			c[t] = e[t];
		}), jh(n, function(e) {
			Ae(t, e) && (a[e] = c[e] = t[e]), s(a, e) && o++, s(c, e) && l++;
		}), r[i]) return s(t, n[1]) ? c[n[2]] = null : s(t, n[2]) && (c[n[1]] = null), c;
		if (l === u || !o) return c;
		if (o >= u) return a;
		for (var d = 0; d < n.length; d++) {
			var f = n[d];
			if (!Ae(a, f) && Ae(e, f)) {
				a[f] = e[f];
				break;
			}
		}
		return a;
	}
	function s(e, t) {
		return e[t] != null && e[t] !== "auto";
	}
	function c(e, t, n) {
		jh(e, function(e) {
			t[e] = n[e];
		});
	}
}
function Vh(e) {
	return Hh({}, e);
}
function Hh(e, t) {
	return t && e && jh(Mh, function(n) {
		Ae(t, n) && (e[n] = t[n]);
	}), e;
}
//#endregion
//#region node_modules/echarts/lib/model/Component.js
var Uh = X(), Wh = function(e) {
	r(t, e);
	function t(t, n, r) {
		var i = e.call(this, t, n, r) || this;
		return i.uid = fm("ec_cpt_model"), i;
	}
	return t.prototype.init = function(e, t, n) {
		this.mergeDefaultAndTheme(e, n);
	}, t.prototype.mergeDefaultAndTheme = function(e, t) {
		var n = zh(this), r = n ? Vh(e) : {};
		A(e, t.getTheme().get(this.mainType)), A(e, this.getDefaultOption()), n && Bh(e, r, n);
	}, t.prototype.mergeOption = function(e, t) {
		A(this.option, e, !0);
		var n = zh(this);
		n && Bh(this.option, e, n);
	}, t.prototype.optionUpdated = function(e, t) {}, t.prototype.getDefaultOption = function() {
		var e = this.constructor;
		if (!_s(e)) return e.defaultOption;
		var t = Uh(this);
		if (!t.defaultOption) {
			for (var n = [], r = e; r;) {
				var i = r.prototype.defaultOption;
				i && n.push(i), r = r.superClass;
			}
			for (var a = {}, o = n.length - 1; o >= 0; o--) a = A(a, n[o], !0);
			t.defaultOption = a;
		}
		return t.defaultOption;
	}, t.prototype.getReferringComponents = function(e, t) {
		var n = e + "Index", r = e + "Id";
		return Wo(this.ecModel, e, {
			index: this.get(n, !0),
			id: this.get(r, !0)
		}, t);
	}, t.prototype.getBoxLayoutParams = function() {
		return Fh(this, !1);
	}, t.prototype.getZLevelKey = function() {
		return "";
	}, t.prototype.setZLevel = function(e) {
		this.option.zlevel = e;
	}, t.protoInitialize = function() {
		var e = t.prototype;
		e.type = "component", e.id = "", e.name = "", e.mainType = "", e.subType = "", e.componentIndex = 0;
	}(), t;
}(um);
bs(Wh, um), Ts(Wh), pm(Wh), mm(Wh, Gh);
function Gh(e) {
	var t = [];
	return L(Wh.getClassesByMainType(e), function(e) {
		t = t.concat(e.dependencies || e.prototype.dependencies || []);
	}), t = R(t, function(e) {
		return hs(e).main;
	}), e !== "dataset" && P(t, "dataset") <= 0 && t.unshift("dataset"), t;
}
//#endregion
//#region node_modules/echarts/lib/visual/tokens.js
var Q = {
	color: {},
	darkColor: {},
	size: {}
}, Kh = Q.color = {
	theme: [
		"#5070dd",
		"#b6d634",
		"#505372",
		"#ff994d",
		"#0ca8df",
		"#ffd10a",
		"#fb628b",
		"#785db0",
		"#3fbe95"
	],
	neutral00: "#fff",
	neutral05: "#f4f7fd",
	neutral10: "#e8ebf0",
	neutral15: "#dbdee4",
	neutral20: "#cfd2d7",
	neutral25: "#c3c5cb",
	neutral30: "#b7b9be",
	neutral35: "#aaacb2",
	neutral40: "#9ea0a5",
	neutral45: "#929399",
	neutral50: "#86878c",
	neutral55: "#797b7f",
	neutral60: "#6d6e73",
	neutral65: "#616266",
	neutral70: "#54555a",
	neutral75: "#48494d",
	neutral80: "#3c3c41",
	neutral85: "#303034",
	neutral90: "#232328",
	neutral95: "#17171b",
	neutral99: "#000",
	accent05: "#eff1f9",
	accent10: "#e0e4f2",
	accent15: "#d0d6ec",
	accent20: "#c0c9e6",
	accent25: "#b1bbdf",
	accent30: "#a1aed9",
	accent35: "#91a0d3",
	accent40: "#8292cc",
	accent45: "#7285c6",
	accent50: "#6578ba",
	accent55: "#5c6da9",
	accent60: "#536298",
	accent65: "#4a5787",
	accent70: "#404c76",
	accent75: "#374165",
	accent80: "#2e3654",
	accent85: "#252b43",
	accent90: "#1b2032",
	accent95: "#121521",
	transparent: "rgba(0,0,0,0)",
	highlight: "rgba(255,231,130,0.8)"
};
for (var qh in M(Kh, {
	primary: Kh.neutral80,
	secondary: Kh.neutral70,
	tertiary: Kh.neutral60,
	quaternary: Kh.neutral50,
	disabled: Kh.neutral20,
	border: Kh.neutral30,
	borderTint: Kh.neutral20,
	borderShade: Kh.neutral40,
	background: Kh.neutral05,
	backgroundTint: "rgba(234,237,245,0.5)",
	backgroundTransparent: "rgba(255,255,255,0)",
	backgroundShade: Kh.neutral10,
	shadow: "rgba(0,0,0,0.2)",
	shadowTint: "rgba(129,130,136,0.2)",
	axisLine: Kh.neutral70,
	axisLineTint: Kh.neutral40,
	axisTick: Kh.neutral70,
	axisTickMinor: Kh.neutral60,
	axisLabel: Kh.neutral70,
	axisSplitLine: Kh.neutral15,
	axisMinorSplitLine: Kh.neutral05
}), Kh) if (Kh.hasOwnProperty(qh)) {
	var Jh = Kh[qh];
	qh === "theme" ? Q.darkColor.theme = Kh.theme.slice() : qh === "highlight" ? Q.darkColor.highlight = "rgba(255,231,130,0.4)" : qh.indexOf("accent") === 0 ? Q.darkColor[qh] = Er(Jh, null, function(e) {
		return e * .5;
	}, function(e) {
		return Math.min(1, 1.3 - e);
	}) : Q.darkColor[qh] = Er(Jh, null, function(e) {
		return e * .9;
	}, function(e) {
		return 1 - e ** 1.5;
	});
}
Q.size = {
	xxs: 2,
	xs: 5,
	s: 10,
	m: 15,
	l: 20,
	xl: 30,
	xxl: 40,
	xxxl: 50
};
//#endregion
//#region node_modules/echarts/lib/model/globalDefault.js
var Yh = "";
typeof navigator < "u" && (Yh = navigator.platform || "");
var Xh = "rgba(0, 0, 0, 0.2)", Zh = Q.color.theme[0], Qh = Er(Zh, null, null, .9), $h = {
	darkMode: "auto",
	colorBy: "series",
	color: Q.color.theme,
	gradientColor: [Qh, Zh],
	aria: { decal: { decals: [
		{
			color: Xh,
			dashArrayX: [1, 0],
			dashArrayY: [2, 5],
			symbolSize: 1,
			rotation: Math.PI / 6
		},
		{
			color: Xh,
			symbol: "circle",
			dashArrayX: [[8, 8], [
				0,
				8,
				8,
				0
			]],
			dashArrayY: [6, 0],
			symbolSize: .8
		},
		{
			color: Xh,
			dashArrayX: [1, 0],
			dashArrayY: [4, 3],
			rotation: -Math.PI / 4
		},
		{
			color: Xh,
			dashArrayX: [[6, 6], [
				0,
				6,
				6,
				0
			]],
			dashArrayY: [6, 0]
		},
		{
			color: Xh,
			dashArrayX: [[1, 0], [1, 6]],
			dashArrayY: [
				1,
				0,
				6,
				0
			],
			rotation: Math.PI / 4
		},
		{
			color: Xh,
			symbol: "triangle",
			dashArrayX: [[9, 9], [
				0,
				9,
				9,
				0
			]],
			dashArrayY: [7, 2],
			symbolSize: .75
		}
	] } },
	textStyle: {
		fontFamily: Yh.match(/^Win/) ? "Microsoft YaHei" : "sans-serif",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal"
	},
	blendMode: null,
	stateAnimation: {
		duration: 300,
		easing: "cubicOut"
	},
	animation: "auto",
	animationDuration: 1e3,
	animationDurationUpdate: 500,
	animationEasing: "cubicInOut",
	animationEasingUpdate: "cubicInOut",
	animationThreshold: 2e3,
	progressiveThreshold: 3e3,
	progressive: 400,
	hoverLayerThreshold: 3e3,
	useUTC: !1
}, eg = {
	Must: 1,
	Might: 2,
	Not: 3
}, tg = X();
function ng(e) {
	tg(e).datasetMap = q();
}
function rg(e, t, n) {
	var r = {}, i = ig(t);
	if (!i || !e) return r;
	var a = [], o = [], s = t.ecModel, c = tg(s).datasetMap, l = i.uid + "_" + n.seriesLayoutBy, u, d;
	e = e.slice(), L(e, function(t, n) {
		var i = G(t) ? t : e[n] = { name: t };
		i.type === "ordinal" && u == null && (u = n, d = m(i)), r[i.name] = [];
	});
	var f = c.get(l) || c.set(l, {
		categoryWayDim: d,
		valueWayDim: 0
	});
	L(e, function(e, t) {
		var n = e.name, i = m(e);
		if (u == null) {
			var s = f.valueWayDim;
			p(r[n], s, i), p(o, s, i), f.valueWayDim += i;
		} else if (u === t) p(r[n], 0, i), p(a, 0, i);
		else {
			var s = f.categoryWayDim;
			p(r[n], s, i), p(o, s, i), f.categoryWayDim += i;
		}
	});
	function p(e, t, n) {
		for (var r = 0; r < n; r++) e.push(t + r);
	}
	function m(e) {
		var t = e.dimsDef;
		return t ? t.length : 1;
	}
	return a.length && (r.itemName = a), o.length && (r.seriesName = o), r;
}
function ig(e) {
	if (!e.get("data", !0)) return Wo(e.ecModel, "dataset", {
		index: e.get("datasetIndex", !0),
		id: e.get("datasetId", !0)
	}, Uo).models[0];
}
function ag(e) {
	return !e.get("transform", !0) && !e.get("fromTransformResult", !0) ? [] : Wo(e.ecModel, "dataset", {
		index: e.get("fromDatasetIndex", !0),
		id: e.get("fromDatasetId", !0)
	}, Uo).models;
}
function og(e, t) {
	return sg(e.data, e.sourceFormat, e.seriesLayoutBy, e.dimensionsDefine, e.startIndex, t);
}
function sg(e, t, n, r, i, a) {
	var o, s = 5;
	if (le(e)) return eg.Not;
	var c, l;
	if (r) {
		var u = r[a];
		G(u) ? (c = u.name, l = u.type) : W(u) && (c = u);
	}
	if (l != null) return l === "ordinal" ? eg.Must : eg.Not;
	if (t === "arrayRows") {
		var d = e;
		if (n === "row") {
			for (var f = d[a], p = 0; p < (f || []).length && p < s; p++) if ((o = b(f[i + p])) != null) return o;
		} else for (var p = 0; p < d.length && p < s; p++) {
			var m = d[i + p];
			if (m && (o = b(m[a])) != null) return o;
		}
	} else if (t === "objectRows") {
		var h = e;
		if (!c) return eg.Not;
		for (var p = 0; p < h.length && p < s; p++) {
			var g = h[p];
			if (g && (o = b(g[c])) != null) return o;
		}
	} else if (t === "keyedColumns") {
		var _ = e;
		if (!c) return eg.Not;
		var f = _[c];
		if (!f || le(f)) return eg.Not;
		for (var p = 0; p < f.length && p < s; p++) if ((o = b(f[p])) != null) return o;
	} else if (t === "original") for (var v = e, p = 0; p < v.length && p < s; p++) {
		var g = v[p], y = Co(g);
		if (!H(y)) return eg.Not;
		if ((o = b(y[a])) != null) return o;
	}
	function b(e) {
		var t = W(e);
		if (e != null && isFinite(Number(e)) && e !== "") return t ? eg.Might : eg.Not;
		if (t && e !== "-") return eg.Must;
	}
	return eg.Not;
}
//#endregion
//#region node_modules/echarts/lib/model/internalComponentCreator.js
var cg = q();
function lg(e, t, n) {
	var r = cg.get(t);
	if (!r) return n;
	var i = r(e);
	return i ? n.concat(i) : n;
}
//#endregion
//#region node_modules/echarts/lib/model/mixin/palette.js
var ug = X();
X();
var dg = function() {
	function e() {}
	return e.prototype.getColorFromPalette = function(e, t, n) {
		var r = bo(this.get("color", !0)), i = this.get("colorLayer", !0);
		return pg(this, ug, r, i, e, t, n);
	}, e.prototype.clearColorPalette = function() {
		mg(this, ug);
	}, e;
}();
function fg(e, t) {
	for (var n = e.length, r = 0; r < n; r++) if (e[r].length > t) return e[r];
	return e[n - 1];
}
function pg(e, t, n, r, i, a, o) {
	a ||= e;
	var s = t(a), c = s.paletteIdx || 0, l = s.paletteNameMap = s.paletteNameMap || {};
	if (l.hasOwnProperty(i)) return l[i];
	var u = o == null || !r ? n : fg(r, o);
	if (u ||= n, u && u.length) {
		var d = u[c];
		return i && (l[i] = d), s.paletteIdx = (c + 1) % u.length, d;
	}
}
function mg(e, t) {
	t(e).paletteIdx = 0, t(e).paletteNameMap = {};
}
//#endregion
//#region node_modules/echarts/lib/model/Global.js
var hg, gg, _g, vg = "\0_ec_inner", yg = 1, bg = function(e) {
	r(t, e);
	function t() {
		return e !== null && e.apply(this, arguments) || this;
	}
	return t.prototype.init = function(e, t, n, r, i, a) {
		r ||= {}, this.option = null, this._theme = new um(r), this._locale = new um(i), this._optionManager = a;
	}, t.prototype.setOption = function(e, t, n) {
		var r = Tg(t);
		this._optionManager.setOption(e, n, r), this._resetOption(null, r);
	}, t.prototype.resetOption = function(e, t) {
		return this._resetOption(e, Tg(t));
	}, t.prototype._resetOption = function(e, t) {
		var n = !1, r = this._optionManager;
		if (!e || e === "recreate") {
			var i = r.mountOption(e === "recreate");
			!this.option || e === "recreate" ? _g(this, i) : (this.restoreData(), this._mergeOption(i, t)), n = !0;
		}
		if ((e === "timeline" || e === "media") && this.restoreData(), !e || e === "recreate" || e === "timeline") {
			var a = r.getTimelineOption(this);
			a && (n = !0, this._mergeOption(a, t));
		}
		if (!e || e === "recreate" || e === "media") {
			var o = r.getMediaOption(this);
			o.length && L(o, function(e) {
				n = !0, this._mergeOption(e, t);
			}, this);
		}
		return n;
	}, t.prototype.mergeOption = function(e) {
		this._mergeOption(e, null);
	}, t.prototype._mergeOption = function(e, t) {
		var n = this.option, r = this._componentsMap, i = this._componentsCount, a = [], o = q(), s = t && t.replaceMergeMainTypeMap;
		ng(this), L(e, function(e, t) {
			e != null && (Wh.hasClass(t) ? t && (a.push(t), o.set(t, !0)) : n[t] = n[t] == null ? k(e) : A(n[t], e, !0));
		}), s && s.each(function(e, t) {
			Wh.hasClass(t) && !o.get(t) && (a.push(t), o.set(t, !0));
		}), Wh.topologicalTravel(a, Wh.getAllClassMainTypes(), c, this);
		function c(t) {
			var a = lg(this, t, bo(e[t])), o = r.get(t), c = To(o, a, o ? s && s.get(t) ? "replaceMerge" : "normalMerge" : "replaceAll");
			Lo(c, t, Wh), n[t] = null, r.set(t, null), i.set(t, 0);
			var l = [], u = [], d = 0, f;
			L(c, function(e, n) {
				var r = e.existing, i = e.newOption;
				if (!i) r && (r.mergeOption({}, this), r.optionUpdated({}, !1));
				else {
					var a = t === "series", o = Wh.getClass(t, e.keyInfo.subType, !a);
					if (!o) return;
					if (t === "tooltip") {
						if (f) return;
						f = !0;
					}
					if (r && r.constructor === o) r.name = e.keyInfo.name, r.mergeOption(i, this), r.optionUpdated(i, !1);
					else {
						var s = M({ componentIndex: n }, e.keyInfo);
						r = new o(i, this, this, s), M(r, s), e.brandNew && (r.__requireNewView = !0), r.init(i, this, this), r.optionUpdated(null, !0);
					}
				}
				r ? (l.push(r.option), u.push(r), d++) : (l.push(void 0), u.push(void 0));
			}, this), n[t] = l, r.set(t, u), i.set(t, d), t === "series" && hg(this);
		}
		this._seriesIndices || hg(this);
	}, t.prototype.getOption = function() {
		var e = k(this.option);
		return L(e, function(t, n) {
			if (Wh.hasClass(n)) {
				for (var r = bo(t), i = r.length, a = !1, o = i - 1; o >= 0; o--) r[o] && !Io(r[o]) ? a = !0 : (r[o] = null, !a && i--);
				r.length = i, e[n] = r;
			}
		}), delete e[vg], e;
	}, t.prototype.setTheme = function(e) {
		this._theme = new um(e), this._resetOption("recreate", null);
	}, t.prototype.getTheme = function() {
		return this._theme;
	}, t.prototype.getLocaleModel = function() {
		return this._locale;
	}, t.prototype.setUpdatePayload = function(e) {
		this._payload = e;
	}, t.prototype.getUpdatePayload = function() {
		return this._payload;
	}, t.prototype.getComponent = function(e, t) {
		var n = this._componentsMap.get(e);
		if (n) {
			var r = n[t || 0];
			if (r) return r;
			if (t == null) {
				for (var i = 0; i < n.length; i++) if (n[i]) return n[i];
			}
		}
	}, t.prototype.queryComponents = function(e) {
		var t = e.mainType;
		if (!t) return [];
		var n = e.index, r = e.id, i = e.name, a = this._componentsMap.get(t);
		if (!a || !a.length) return [];
		var o;
		return n == null ? o = r == null ? i == null ? re(a, function(e) {
			return !!e;
		}) : Cg("name", i, a) : Cg("id", r, a) : (o = [], L(bo(n), function(e) {
			a[e] && o.push(a[e]);
		})), wg(o, e);
	}, t.prototype.findComponents = function(e) {
		var t = e.query, n = e.mainType, r = i(t);
		return a(wg(r ? this.queryComponents(r) : re(this._componentsMap.get(n), function(e) {
			return !!e;
		}), e));
		function i(e) {
			var t = n + "Index", r = n + "Id", i = n + "Name";
			return e && (e[t] != null || e[r] != null || e[i] != null) ? {
				mainType: n,
				index: e[t],
				id: e[r],
				name: e[i]
			} : null;
		}
		function a(t) {
			return e.filter ? re(t, e.filter) : t;
		}
	}, t.prototype.eachComponent = function(e, t, n) {
		var r = this._componentsMap;
		if (U(e)) {
			var i = t, a = e;
			r.each(function(e, t) {
				for (var n = 0; e && n < e.length; n++) {
					var r = e[n];
					r && a.call(i, t, r, r.componentIndex);
				}
			});
		} else for (var o = W(e) ? r.get(e) : G(e) ? this.findComponents(e) : null, s = 0; o && s < o.length; s++) {
			var c = o[s];
			c && t.call(n, c, c.componentIndex);
		}
	}, t.prototype.getSeriesByName = function(e) {
		var t = Po(e, null);
		return re(this._componentsMap.get("series"), function(e) {
			return !!e && t != null && e.name === t;
		});
	}, t.prototype.getSeriesByIndex = function(e) {
		return this._componentsMap.get("series")[e];
	}, t.prototype.getSeriesByType = function(e) {
		return re(this._componentsMap.get("series"), function(t) {
			return !!t && t.subType === e;
		});
	}, t.prototype.getSeries = function() {
		return re(this._componentsMap.get("series"), function(e) {
			return !!e;
		});
	}, t.prototype.getSeriesCount = function() {
		return this._componentsCount.get("series");
	}, t.prototype.eachSeries = function(e, t) {
		gg(this), L(this._seriesIndices, function(n) {
			var r = this._componentsMap.get("series")[n];
			e.call(t, r, n);
		}, this);
	}, t.prototype.eachRawSeries = function(e, t) {
		L(this._componentsMap.get("series"), function(n) {
			n && e.call(t, n, n.componentIndex);
		});
	}, t.prototype.eachSeriesByType = function(e, t, n) {
		gg(this), L(this._seriesIndices, function(r) {
			var i = this._componentsMap.get("series")[r];
			i.subType === e && t.call(n, i, r);
		}, this);
	}, t.prototype.eachRawSeriesByType = function(e, t, n) {
		return L(this.getSeriesByType(e), t, n);
	}, t.prototype.isSeriesFiltered = function(e) {
		return gg(this), this._seriesIndicesMap.get(e.componentIndex) == null;
	}, t.prototype.getCurrentSeriesIndices = function() {
		return (this._seriesIndices || []).slice();
	}, t.prototype.filterSeries = function(e, t) {
		gg(this);
		var n = [];
		L(this._seriesIndices, function(r) {
			var i = this._componentsMap.get("series")[r];
			e.call(t, i, r) && n.push(r);
		}, this), this._seriesIndices = n, this._seriesIndicesMap = q(n);
	}, t.prototype.restoreData = function(e) {
		hg(this);
		var t = this._componentsMap, n = [];
		t.each(function(e, t) {
			Wh.hasClass(t) && n.push(t);
		}), Wh.topologicalTravel(n, Wh.getAllClassMainTypes(), function(n) {
			L(t.get(n), function(t) {
				t && (n !== "series" || !xg(t, e)) && t.restoreData();
			});
		});
	}, t.internalField = function() {
		hg = function(e) {
			var t = e._seriesIndices = [];
			L(e._componentsMap.get("series"), function(e) {
				e && t.push(e.componentIndex);
			}), e._seriesIndicesMap = q(t);
		}, gg = function(e) {}, _g = function(e, t) {
			e.option = {}, e.option[vg] = yg, e._componentsMap = q({ series: [] }), e._componentsCount = q();
			var n = t.aria;
			G(n) && n.enabled == null && (n.enabled = !0), Sg(t, e._theme.option), A(t, $h, !1), e._mergeOption(t, null);
		};
	}(), t;
}(um);
function xg(e, t) {
	if (t) {
		var n = t.seriesIndex, r = t.seriesId, i = t.seriesName;
		return n != null && e.componentIndex !== n || r != null && e.id !== r || i != null && e.name !== i;
	}
}
function Sg(e, t) {
	var n = e.color && !e.colorLayer;
	L(t, function(t, r) {
		r === "colorLayer" && n || r === "color" && e.color || Wh.hasClass(r) || (typeof t == "object" ? e[r] = e[r] ? A(e[r], t, !1) : k(t) : e[r] ?? (e[r] = t));
	});
}
function Cg(e, t, n) {
	if (H(t)) {
		var r = q();
		return L(t, function(e) {
			e != null && Po(e, null) != null && r.set(e, !0);
		}), re(n, function(t) {
			return t && r.get(t[e]);
		});
	}
	var i = Po(t, null);
	return re(n, function(t) {
		return t && i != null && t[e] === i;
	});
}
function wg(e, t) {
	return t.hasOwnProperty("subType") ? re(e, function(e) {
		return e && e.subType === t.subType;
	}) : e;
}
function Tg(e) {
	var t = q();
	return e && L(bo(e.replaceMerge), function(e) {
		t.set(e, !0);
	}), { replaceMergeMainTypeMap: t };
}
F(bg, dg);
//#endregion
//#region node_modules/echarts/lib/model/OptionManager.js
var Eg = /^(min|max)?(.+)$/, Dg = function() {
	function e(e) {
		this._timelineOptions = [], this._mediaList = [], this._currentMediaIndices = [], this._api = e;
	}
	return e.prototype.setOption = function(e, t, n) {
		e && (L(bo(e.series), function(e) {
			e && e.data && le(e.data) && xe(e.data);
		}), L(bo(e.dataset), function(e) {
			e && e.source && le(e.source) && xe(e.source);
		})), e = k(e);
		var r = this._optionBackup, i = Og(e, t, !r);
		this._newBaseOption = i.baseOption, r ? (i.timelineOptions.length && (r.timelineOptions = i.timelineOptions), i.mediaList.length && (r.mediaList = i.mediaList), i.mediaDefault && (r.mediaDefault = i.mediaDefault)) : this._optionBackup = i;
	}, e.prototype.mountOption = function(e) {
		var t = this._optionBackup;
		return this._timelineOptions = t.timelineOptions, this._mediaList = t.mediaList, this._mediaDefault = t.mediaDefault, this._currentMediaIndices = [], k(e ? t.baseOption : this._newBaseOption);
	}, e.prototype.getTimelineOption = function(e) {
		var t, n = this._timelineOptions;
		if (n.length) {
			var r = e.getComponent("timeline");
			r && (t = k(n[r.getCurrentIndex()]));
		}
		return t;
	}, e.prototype.getMediaOption = function(e) {
		var t = this._api.getWidth(), n = this._api.getHeight(), r = this._mediaList, i = this._mediaDefault, a = [], o = [];
		if (!r.length && !i) return o;
		for (var s = 0, c = r.length; s < c; s++) kg(r[s].query, t, n) && a.push(s);
		return !a.length && i && (a = [-1]), a.length && !jg(a, this._currentMediaIndices) && (o = R(a, function(e) {
			return k(e === -1 ? i.option : r[e].option);
		})), this._currentMediaIndices = a, o;
	}, e;
}();
function Og(e, t, n) {
	var r = [], i, a, o = e.baseOption, s = e.timeline, c = e.options, l = e.media, u = !!e.media, d = !!(c || s || o && o.timeline);
	o ? (a = o, a.timeline || (a.timeline = s)) : ((d || u) && (e.options = e.media = null), a = e), u && H(l) && L(l, function(e) {
		e && e.option && (e.query ? r.push(e) : i ||= e);
	}), f(a), L(c, function(e) {
		return f(e);
	}), L(r, function(e) {
		return f(e.option);
	});
	function f(e) {
		L(t, function(t) {
			t(e, n);
		});
	}
	return {
		baseOption: a,
		timelineOptions: c || [],
		mediaDefault: i,
		mediaList: r
	};
}
function kg(e, t, n) {
	var r = {
		width: t,
		height: n,
		aspectratio: t / n
	}, i = !0;
	return L(e, function(e, t) {
		var n = t.match(Eg);
		if (n && n[1] && n[2]) {
			var a = n[1];
			Ag(r[n[2].toLowerCase()], e, a) || (i = !1);
		}
	}), i;
}
function Ag(e, t, n) {
	return n === "min" ? e >= t : n === "max" ? e <= t : e === t;
}
function jg(e, t) {
	return e.join(",") === t.join(",");
}
//#endregion
//#region node_modules/echarts/lib/preprocessor/helper/compatStyle.js
var Mg = L, Ng = G, Pg = [
	"areaStyle",
	"lineStyle",
	"nodeStyle",
	"linkStyle",
	"chordStyle",
	"label",
	"labelLine"
];
function Fg(e) {
	var t = e && e.itemStyle;
	if (t) for (var n = 0, r = Pg.length; n < r; n++) {
		var i = Pg[n], a = t.normal, o = t.emphasis;
		a && a[i] && (e[i] = e[i] || {}, e[i].normal ? A(e[i].normal, a[i]) : e[i].normal = a[i], a[i] = null), o && o[i] && (e[i] = e[i] || {}, e[i].emphasis ? A(e[i].emphasis, o[i]) : e[i].emphasis = o[i], o[i] = null);
	}
}
function Ig(e, t, n) {
	if (e && e[t] && (e[t].normal || e[t].emphasis)) {
		var r = e[t].normal, i = e[t].emphasis;
		r && (n ? (e[t].normal = e[t].emphasis = null, N(e[t], r)) : e[t] = r), i && (e.emphasis = e.emphasis || {}, e.emphasis[t] = i, i.focus && (e.emphasis.focus = i.focus), i.blurScope && (e.emphasis.blurScope = i.blurScope));
	}
}
function Lg(e) {
	Ig(e, "itemStyle"), Ig(e, "lineStyle"), Ig(e, "areaStyle"), Ig(e, "label"), Ig(e, "labelLine"), Ig(e, "upperLabel"), Ig(e, "edgeLabel");
}
function Rg(e, t) {
	var n = Ng(e) && e[t], r = Ng(n) && n.textStyle;
	if (r) for (var i = 0, a = So.length; i < a; i++) {
		var o = So[i];
		r.hasOwnProperty(o) && (n[o] = r[o]);
	}
}
function zg(e) {
	e && (Lg(e), Rg(e, "label"), e.emphasis && Rg(e.emphasis, "label"));
}
function Bg(e) {
	if (Ng(e)) {
		Fg(e), Lg(e), Rg(e, "label"), Rg(e, "upperLabel"), Rg(e, "edgeLabel"), e.emphasis && (Rg(e.emphasis, "label"), Rg(e.emphasis, "upperLabel"), Rg(e.emphasis, "edgeLabel"));
		var t = e.markPoint;
		t && (Fg(t), zg(t));
		var n = e.markLine;
		n && (Fg(n), zg(n));
		var r = e.markArea;
		r && zg(r);
		var i = e.data;
		if (e.type === "graph") {
			i ||= e.nodes;
			var a = e.links || e.edges;
			if (a && !le(a)) for (var o = 0; o < a.length; o++) zg(a[o]);
			L(e.categories, function(e) {
				Lg(e);
			});
		}
		if (i && !le(i)) for (var o = 0; o < i.length; o++) zg(i[o]);
		if (t = e.markPoint, t && t.data) for (var s = t.data, o = 0; o < s.length; o++) zg(s[o]);
		if (n = e.markLine, n && n.data) for (var c = n.data, o = 0; o < c.length; o++) H(c[o]) ? (zg(c[o][0]), zg(c[o][1])) : zg(c[o]);
		e.type === "gauge" ? (Rg(e, "axisLabel"), Rg(e, "title"), Rg(e, "detail")) : e.type === "treemap" ? (Ig(e.breadcrumb, "itemStyle"), L(e.levels, function(e) {
			Lg(e);
		})) : e.type === "tree" && Lg(e.leaves);
	}
}
function Vg(e) {
	return H(e) ? e : e ? [e] : [];
}
function Hg(e) {
	return (H(e) ? e[0] : e) || {};
}
function Ug(e, t) {
	Mg(Vg(e.series), function(e) {
		Ng(e) && Bg(e);
	});
	var n = [
		"xAxis",
		"yAxis",
		"radiusAxis",
		"angleAxis",
		"singleAxis",
		"parallelAxis",
		"radar"
	];
	t && n.push("valueAxis", "categoryAxis", "logAxis", "timeAxis"), Mg(n, function(t) {
		Mg(Vg(e[t]), function(e) {
			e && (Rg(e, "axisLabel"), Rg(e.axisPointer, "label"));
		});
	}), Mg(Vg(e.parallel), function(e) {
		var t = e && e.parallelAxisDefault;
		Rg(t, "axisLabel"), Rg(t && t.axisPointer, "label");
	}), Mg(Vg(e.calendar), function(e) {
		Ig(e, "itemStyle"), Rg(e, "dayLabel"), Rg(e, "monthLabel"), Rg(e, "yearLabel");
	}), Mg(Vg(e.radar), function(e) {
		Rg(e, "name"), e.name && e.axisName == null && (e.axisName = e.name, delete e.name), e.nameGap != null && e.axisNameGap == null && (e.axisNameGap = e.nameGap, delete e.nameGap);
	}), Mg(Vg(e.geo), function(e) {
		Ng(e) && (zg(e), Mg(Vg(e.regions), function(e) {
			zg(e);
		}));
	}), Mg(Vg(e.timeline), function(e) {
		zg(e), Ig(e, "label"), Ig(e, "itemStyle"), Ig(e, "controlStyle", !0);
		var t = e.data;
		H(t) && L(t, function(e) {
			G(e) && (Ig(e, "label"), Ig(e, "itemStyle"));
		});
	}), Mg(Vg(e.toolbox), function(e) {
		Ig(e, "iconStyle"), Mg(e.feature, function(e) {
			Ig(e, "iconStyle");
		});
	}), Rg(Hg(e.axisPointer), "label"), Rg(Hg(e.tooltip).axisPointer, "label");
}
//#endregion
//#region node_modules/echarts/lib/preprocessor/backwardCompat.js
function Wg(e, t) {
	for (var n = t.split(","), r = e, i = 0; i < n.length && (r &&= r[n[i]], r != null); i++);
	return r;
}
function Gg(e, t, n, r) {
	for (var i = t.split(","), a = e, o, s = 0; s < i.length - 1; s++) o = i[s], a[o] ?? (a[o] = {}), a = a[o];
	(r || a[i[s]] == null) && (a[i[s]] = n);
}
function Kg(e) {
	e && L(qg, function(t) {
		t[0] in e && !(t[1] in e) && (e[t[1]] = e[t[0]]);
	});
}
var qg = [
	["x", "left"],
	["y", "top"],
	["x2", "right"],
	["y2", "bottom"]
], Jg = [
	"grid",
	"geo",
	"parallel",
	"legend",
	"toolbox",
	"title",
	"visualMap",
	"dataZoom",
	"timeline"
], Yg = [
	["borderRadius", "barBorderRadius"],
	["borderColor", "barBorderColor"],
	["borderWidth", "barBorderWidth"]
];
function Xg(e) {
	var t = e && e.itemStyle;
	if (t) for (var n = 0; n < Yg.length; n++) {
		var r = Yg[n][1], i = Yg[n][0];
		t[r] != null && (t[i] = t[r]);
	}
}
function Zg(e) {
	e && e.alignTo === "edge" && e.margin != null && e.edgeDistance == null && (e.edgeDistance = e.margin);
}
function Qg(e) {
	e && e.downplay && !e.blur && (e.blur = e.downplay);
}
function $g(e) {
	e && e.focusNodeAdjacency != null && (e.emphasis = e.emphasis || {}, e.emphasis.focus ?? (e.emphasis.focus = "adjacency"));
}
function e_(e, t) {
	if (e) for (var n = 0; n < e.length; n++) t(e[n]), e[n] && e_(e[n].children, t);
}
function t_(e, t) {
	Ug(e, t), e.series = bo(e.series), L(e.series, function(e) {
		if (G(e)) {
			var t = e.type;
			if (t === "line") e.clipOverflow != null && (e.clip = e.clipOverflow);
			else if (t === "pie" || t === "gauge") {
				e.clockWise != null && (e.clockwise = e.clockWise), Zg(e.label);
				var n = e.data;
				if (n && !le(n)) for (var r = 0; r < n.length; r++) Zg(n[r]);
				e.hoverOffset != null && (e.emphasis = e.emphasis || {}, (e.emphasis.scaleSize = null) && (e.emphasis.scaleSize = e.hoverOffset));
			} else if (t === "gauge") {
				var i = Wg(e, "pointer.color");
				i != null && Gg(e, "itemStyle.color", i);
			} else if (t === "bar") {
				Xg(e), Xg(e.backgroundStyle), Xg(e.emphasis);
				var n = e.data;
				if (n && !le(n)) for (var r = 0; r < n.length; r++) typeof n[r] == "object" && (Xg(n[r]), Xg(n[r] && n[r].emphasis));
			} else if (t === "sunburst") {
				var a = e.highlightPolicy;
				a && (e.emphasis = e.emphasis || {}, e.emphasis.focus || (e.emphasis.focus = a)), Qg(e), e_(e.data, Qg);
			} else t === "graph" || t === "sankey" ? $g(e) : t === "map" && (e.mapType && !e.map && (e.map = e.mapType), e.mapLocation && N(e, e.mapLocation));
			e.hoverAnimation != null && (e.emphasis = e.emphasis || {}, e.emphasis && e.emphasis.scale == null && (e.emphasis.scale = e.hoverAnimation)), Kg(e);
		}
	}), e.dataRange && (e.visualMap = e.dataRange), L(Jg, function(t) {
		var n = e[t];
		n && (H(n) || (n = [n]), L(n, function(e) {
			Kg(e);
		}));
	});
}
//#endregion
//#region node_modules/echarts/lib/processor/dataStack.js
var n_ = ds(r_);
function r_(e) {
	var t = q();
	e.eachSeries(function(e) {
		var n = e.get("stack");
		if (n) {
			var r = t.get(n) || t.set(n, []), i = e.getData(), a = {
				stackResultDimension: i.getCalculationInfo("stackResultDimension"),
				stackedOverDimension: i.getCalculationInfo("stackedOverDimension"),
				stackedDimension: i.getCalculationInfo("stackedDimension"),
				stackedByDimension: i.getCalculationInfo("stackedByDimension"),
				isStackedByIndex: i.getCalculationInfo("isStackedByIndex"),
				data: i,
				seriesModel: e
			};
			if (!a.stackedDimension || !(a.isStackedByIndex || a.stackedByDimension)) return;
			r.push(a);
		}
	}), t.each(function(e) {
		e.length !== 0 && ((e[0].seriesModel.get("stackOrder") || "seriesAsc") === "seriesDesc" && e.reverse(), L(e, function(t, n) {
			t.data.setCalculationInfo("stackedOnSeries", n > 0 ? e[n - 1].seriesModel : null);
		}), i_(e));
	});
}
function i_(e) {
	L(e, function(t, n) {
		var r = [], i = [NaN, NaN], a = [t.stackResultDimension, t.stackedOverDimension], o = t.data, s = t.isStackedByIndex, c = t.seriesModel.get("stackStrategy") || "samesign";
		o.modify(a, function(a, l, u) {
			var d = o.get(t.stackedDimension, u);
			if (isNaN(d)) return i;
			var f, p;
			s ? p = o.getRawIndex(u) : f = o.get(t.stackedByDimension, u);
			for (var m = NaN, h = n - 1; h >= 0; h--) {
				var g = e[h];
				if (s || (p = g.data.rawIndexOf(g.stackedByDimension, f)), p >= 0) {
					var _ = g.data.getByRawIndex(g.stackResultDimension, p);
					if (c === "all" || c === "positive" && _ > 0 || c === "negative" && _ < 0 || c === "samesign" && d >= 0 && _ > 0 || c === "samesign" && d <= 0 && _ < 0) {
						d = Ya(d, _), m = _;
						break;
					}
				}
			}
			return r[0] = d, r[1] = m, r;
		});
	});
}
//#endregion
//#region node_modules/echarts/lib/data/Source.js
var a_ = function() {
	function e(e) {
		this.data = e.data || (e.sourceFormat === "keyedColumns" ? {} : []), this.sourceFormat = e.sourceFormat || "unknown", this.seriesLayoutBy = e.seriesLayoutBy || "column", this.startIndex = e.startIndex || 0, this.dimensionsDetectedCount = e.dimensionsDetectedCount, this.metaRawOption = e.metaRawOption;
		var t = this.dimensionsDefine = e.dimensionsDefine;
		if (t) for (var n = 0; n < t.length; n++) {
			var r = t[n];
			r.type == null && og(this, n) === eg.Must && (r.type = "ordinal");
		}
	}
	return e;
}();
function o_(e) {
	return e instanceof a_;
}
function s_(e, t, n) {
	n ||= u_(e);
	var r = t.seriesLayoutBy, i = d_(e, n, r, t.sourceHeader, t.dimensions);
	return new a_({
		data: e,
		sourceFormat: n,
		seriesLayoutBy: r,
		dimensionsDefine: i.dimensionsDefine,
		startIndex: i.startIndex,
		dimensionsDetectedCount: i.dimensionsDetectedCount,
		metaRawOption: k(t)
	});
}
function c_(e) {
	return new a_({
		data: e,
		sourceFormat: le(e) ? $l : Yl
	});
}
function l_(e) {
	return new a_({
		data: e.data,
		sourceFormat: e.sourceFormat,
		seriesLayoutBy: e.seriesLayoutBy,
		dimensionsDefine: k(e.dimensionsDefine),
		startIndex: e.startIndex,
		dimensionsDetectedCount: e.dimensionsDetectedCount
	});
}
function u_(e) {
	var t = eu;
	if (le(e)) t = $l;
	else if (H(e)) {
		e.length === 0 && (t = Xl);
		for (var n = 0, r = e.length; n < r; n++) {
			var i = e[n];
			if (i != null) {
				if (H(i) || le(i)) {
					t = Xl;
					break;
				}
				if (G(i)) {
					t = Zl;
					break;
				}
			}
		}
	} else if (G(e)) {
		for (var a in e) if (Ae(e, a) && I(e[a])) {
			t = Ql;
			break;
		}
	}
	return t;
}
function d_(e, t, n, r, i) {
	var a, o;
	if (!e) return {
		dimensionsDefine: p_(i),
		startIndex: o,
		dimensionsDetectedCount: a
	};
	if (t === "arrayRows") {
		var s = e;
		r === "auto" || r == null ? m_(function(e) {
			e != null && e !== "-" && (W(e) ? o ??= 1 : o = 0);
		}, n, s, 10) : o = se(r) ? r : +!!r, !i && o === 1 && (i = [], m_(function(e, t) {
			i[t] = e == null ? "" : e + "";
		}, n, s, Infinity)), a = i ? i.length : n === "row" ? s.length : s[0] ? s[0].length : null;
	} else if (t === "objectRows") i ||= f_(e);
	else if (t === "keyedColumns") i || (i = [], L(e, function(e, t) {
		i.push(t);
	}));
	else if (t === "original") {
		var c = Co(e[0]);
		a = H(c) && c.length || 1;
	}
	return {
		startIndex: o,
		dimensionsDefine: p_(i),
		dimensionsDetectedCount: a
	};
}
function f_(e) {
	for (var t = 0, n; t < e.length && !(n = e[t++]););
	if (n) return z(n);
}
function p_(e) {
	if (e) {
		var t = q();
		return R(e, function(e, n) {
			e = G(e) ? e : { name: e };
			var r = {
				name: e.name,
				displayName: e.displayName,
				type: e.type
			};
			if (r.name == null) return r;
			r.name += "", r.displayName ??= r.name;
			var i = t.get(r.name);
			return i ? r.name += "-" + i.count++ : t.set(r.name, { count: 1 }), r;
		});
	}
}
function m_(e, t, n, r) {
	if (t === "row") for (var i = 0; i < n.length && i < r; i++) e(n[i] ? n[i][0] : null, i);
	else for (var a = n[0] || [], i = 0; i < a.length && i < r; i++) e(a[i], i);
}
function h_(e) {
	var t = e.sourceFormat;
	return t === "objectRows" || t === "keyedColumns";
}
//#endregion
//#region node_modules/echarts/lib/data/helper/dataProvider.js
var g_, __, v_, y_, b_, x_, S_ = function() {
	function e(e, t) {
		var n = o_(e) ? e : c_(e);
		this._source = n;
		var r = this._data = n.data, i = n.sourceFormat;
		n.seriesLayoutBy, i === "typedArray" && (this._offset = 0, this._dimSize = t, this._data = r), x_(this, r, n);
	}
	return e.prototype.getSource = function() {
		return this._source;
	}, e.prototype.count = function() {
		return 0;
	}, e.prototype.getItem = function(e, t) {}, e.prototype.appendData = function(e) {}, e.prototype.clean = function() {}, e.protoInitialize = function() {
		var t = e.prototype;
		t.pure = !1, t.persistent = !0;
	}(), e.internalField = function() {
		var e;
		x_ = function(e, i, a) {
			var o = a.sourceFormat, s = a.seriesLayoutBy, c = a.startIndex, l = a.dimensionsDefine, u = b_[N_(o, s)];
			M(e, u), o === "typedArray" ? (e.getItem = t, e.count = r, e.fillStorage = n) : (e.getItem = B(E_(o, s), null, i, c, l), e.count = B(k_(o, s), null, i, c, l));
		};
		var t = function(e, t) {
			e -= this._offset, t ||= [];
			for (var n = this._data, r = this._dimSize, i = r * e, a = 0; a < r; a++) t[a] = n[i + a];
			return t;
		}, n = function(e, t, n, r) {
			for (var i = this._data, a = this._dimSize, o = 0; o < a; o++) {
				for (var s = r[o], c = s[0] == null ? Infinity : s[0], l = s[1] == null ? -Infinity : s[1], u = t - e, d = n[o], f = 0; f < u; f++) {
					var p = i[f * a + o];
					d[e + f] = p, p < c && (c = p), p > l && (l = p);
				}
				s[0] = c, s[1] = l;
			}
		}, r = function() {
			return this._data ? this._data.length / this._dimSize : 0;
		};
		b_ = (e = {}, e[Xl + "_" + tu] = {
			pure: !0,
			appendData: i
		}, e[Xl + "_row"] = {
			pure: !0,
			appendData: function() {
				throw Error("Do not support appendData when set seriesLayoutBy: \"row\".");
			}
		}, e[Zl] = {
			pure: !0,
			appendData: i
		}, e[Ql] = {
			pure: !0,
			appendData: function(e) {
				var t = this._data;
				L(e, function(e, n) {
					for (var r = t[n] || (t[n] = []), i = 0; i < (e || []).length; i++) r.push(e[i]);
				});
			}
		}, e[Yl] = { appendData: i }, e[$l] = {
			persistent: !1,
			pure: !0,
			appendData: function(e) {
				this._data = e;
			},
			clean: function() {
				this._offset += this.count(), this._data = null;
			}
		}, e);
		function i(e) {
			for (var t = 0; t < e.length; t++) this._data.push(e[t]);
		}
	}(), e;
}(), C_ = function(e) {
	H(e) || ho("series.data or dataset.source must be an array.");
};
g_ = {}, g_[Xl + "_" + tu] = C_, g_[Xl + "_row"] = C_, g_[Zl] = C_, g_[Ql] = function(e, t) {
	for (var n = 0; n < t.length; n++) t[n].name ?? ho("dimension name must not be null/undefined.");
}, g_[Yl] = C_;
var w_ = function(e, t, n, r) {
	return e[r];
}, T_ = (__ = {}, __[Xl + "_" + tu] = function(e, t, n, r) {
	return e[r + t];
}, __[Xl + "_row"] = function(e, t, n, r, i) {
	r += t;
	for (var a = i || [], o = e, s = 0; s < o.length; s++) {
		var c = o[s];
		a[s] = c ? c[r] : null;
	}
	return a;
}, __[Zl] = w_, __[Ql] = function(e, t, n, r, i) {
	for (var a = i || [], o = 0; o < n.length; o++) {
		var s = n[o].name, c = s == null ? null : e[s];
		a[o] = c ? c[r] : null;
	}
	return a;
}, __[Yl] = w_, __);
function E_(e, t) {
	return T_[N_(e, t)];
}
var D_ = function(e, t, n) {
	return e.length;
}, O_ = (v_ = {}, v_[Xl + "_" + tu] = function(e, t, n) {
	return Math.max(0, e.length - t);
}, v_[Xl + "_row"] = function(e, t, n) {
	var r = e[0];
	return r ? Math.max(0, r.length - t) : 0;
}, v_[Zl] = D_, v_[Ql] = function(e, t, n) {
	var r = n[0].name, i = r == null ? null : e[r];
	return i ? i.length : 0;
}, v_[Yl] = D_, v_);
function k_(e, t) {
	return O_[N_(e, t)];
}
var A_ = function(e, t, n) {
	return e[t];
}, j_ = (y_ = {}, y_[Xl] = A_, y_[Zl] = function(e, t, n) {
	return e[n];
}, y_[Ql] = A_, y_[Yl] = function(e, t, n) {
	var r = Co(e);
	return r instanceof Array ? r[t] : r;
}, y_[$l] = A_, y_);
function M_(e) {
	return j_[e];
}
function N_(e, t) {
	return e === "arrayRows" ? e + "_" + t : e;
}
function P_(e, t, n) {
	if (e) {
		var r = e.getRawDataItem(t);
		if (r != null) {
			var i = e.getStore(), a = i.getSource().sourceFormat;
			if (n != null) {
				var o = e.getDimensionIndex(n), s = i.getDimensionProperty(o);
				return M_(a)(r, o, s);
			}
			var c = r;
			return a === "original" && (c = Co(r)), c;
		}
	}
}
//#endregion
//#region node_modules/echarts/lib/model/mixin/dataFormat.js
var F_ = /\{@(.+?)\}/g, I_ = function() {
	function e() {}
	return e.prototype.getDataParams = function(e, t) {
		var n = this.getData(t), r = this.getRawValue(e, t), i = n.getRawIndex(e), a = n.getName(e), o = n.getRawDataItem(e), s = n.getItemVisual(e, "style"), c = s && s[n.getItemVisual(e, "drawType") || "fill"], l = s && s.stroke, u = this.mainType, d = u === "series", f = n.userOutput && n.userOutput.get();
		return {
			componentType: u,
			componentSubType: this.subType,
			componentIndex: this.componentIndex,
			seriesType: d ? this.subType : null,
			seriesIndex: this.seriesIndex,
			seriesId: d ? this.id : null,
			seriesName: d ? this.name : null,
			name: a,
			dataIndex: i,
			data: o,
			dataType: t,
			value: r,
			color: c,
			borderColor: l,
			dimensionNames: f ? f.fullDimensions : null,
			encode: f ? f.encode : null,
			$vars: [
				"seriesName",
				"name",
				"value"
			]
		};
	}, e.prototype.getFormattedLabel = function(e, t, n, r, i, a) {
		t ||= "normal";
		var o = this.getData(n), s = this.getDataParams(e, n);
		if (a && (s.value = a.interpolatedValue), r != null && H(s.value) && (s.value = s.value[r]), i ||= o.getItemModel(e).get(t === "normal" ? ["label", "formatter"] : [
			t,
			"label",
			"formatter"
		]), U(i)) return s.status = t, s.dimensionIndex = r, i(s);
		if (W(i)) return bh(i, s).replace(F_, function(t, n) {
			var r = n.length, i = n;
			i.charAt(0) === "[" && i.charAt(r - 1) === "]" && (i = +i.slice(1, r - 1));
			var s = P_(o, e, i);
			if (a && H(a.interpolatedValue)) {
				var c = o.getDimensionIndex(i);
				c >= 0 && (s = a.interpolatedValue[c]);
			}
			return s == null ? "" : s + "";
		});
	}, e.prototype.getRawValue = function(e, t) {
		return P_(this.getData(t), e);
	}, e.prototype.formatTooltip = function(e, t, n) {}, e;
}();
function L_(e) {
	var t, n;
	return G(e) ? e.type && (n = e) : t = e, {
		text: t,
		frag: n
	};
}
//#endregion
//#region node_modules/echarts/lib/core/task.js
function R_(e) {
	return new z_(e);
}
var z_ = function() {
	function e(e) {
		e ||= {}, this._reset = e.reset, this._plan = e.plan, this._count = e.count, this._onDirty = e.onDirty, this._dirty = !0;
	}
	return e.prototype.perform = function(e) {
		var t = this._upstream, n = e && e.skip;
		if (this._dirty && t) {
			var r = this.context;
			r.data = r.outputData = t.context.outputData;
		}
		this.__pipeline && (this.__pipeline.currentTask = this);
		var i;
		this._plan && !n && (i = this._plan(this.context));
		var a = l(this._modBy), o = this._modDataCount || 0, s = l(e && e.modBy), c = e && e.modDataCount || 0;
		(a !== s || o !== c) && (i = "reset");
		function l(e) {
			return !(e >= 1) && (e = 1), e;
		}
		var u;
		(this._dirty || i === "reset") && (this._dirty = !1, u = this._doReset(n)), this._modBy = s, this._modDataCount = c;
		var d = e && e.step;
		if (this._dueEnd = t ? t._outputDueEnd : this._count ? this._count(this.context) : Infinity, this._progress) {
			var f = this._dueIndex, p = Math.min(d == null ? Infinity : this._dueIndex + d, this._dueEnd);
			if (!n && (u || f < p)) {
				var m = this._progress;
				if (H(m)) for (var h = 0; h < m.length; h++) this._doProgress(m[h], f, p, s, c);
				else this._doProgress(m, f, p, s, c);
			}
			this._dueIndex = p;
			var g = this._settedOutputEnd == null ? p : this._settedOutputEnd;
			this._outputDueEnd = g;
		} else this._dueIndex = this._outputDueEnd = this._settedOutputEnd == null ? this._dueEnd : this._settedOutputEnd;
		return this.unfinished();
	}, e.prototype.dirty = function() {
		this._dirty = !0, this._onDirty && this._onDirty(this.context);
	}, e.prototype._doProgress = function(e, t, n, r, i) {
		B_.reset(t, n, r, i), this._callingProgress = e, this._callingProgress({
			start: t,
			end: n,
			count: n - t,
			next: B_.next
		}, this.context);
	}, e.prototype._doReset = function(e) {
		this._dueIndex = this._outputDueEnd = this._dueEnd = 0, this._settedOutputEnd = null;
		var t, n;
		!e && this._reset && (t = this._reset(this.context), t && t.progress && (n = t.forceFirstProgress, t = t.progress), H(t) && !t.length && (t = null)), this._progress = t, this._modBy = this._modDataCount = null;
		var r = this._downstream;
		return r && r.dirty(), n;
	}, e.prototype.unfinished = function() {
		return this._progress && this._dueIndex < this._dueEnd;
	}, e.prototype.pipe = function(e) {
		(this._downstream !== e || this._dirty) && (this._downstream = e, e._upstream = this, e.dirty());
	}, e.prototype.dispose = function() {
		this._disposed ||= (this._upstream && (this._upstream._downstream = null), this._downstream && (this._downstream._upstream = null), this._dirty = !1, !0);
	}, e.prototype.getUpstream = function() {
		return this._upstream;
	}, e.prototype.getDownstream = function() {
		return this._downstream;
	}, e.prototype.setOutputEnd = function(e) {
		this._outputDueEnd = this._settedOutputEnd = e;
	}, e;
}(), B_ = function() {
	var e, t, n, r, i, a = { reset: function(c, l, u, d) {
		t = c, e = l, n = u, r = d, i = Math.ceil(r / n), a.next = n > 1 && r > 0 ? s : o;
	} };
	return a;
	function o() {
		return t < e ? t++ : null;
	}
	function s() {
		var a = t % i * n + Math.ceil(t / i), o = t >= e ? null : a < r ? a : t;
		return t++, o;
	}
}();
//#endregion
//#region node_modules/echarts/lib/data/helper/dataValueHelper.js
function V_(e, t) {
	var n = t && t.type;
	return n === "ordinal" ? e : (n === "time" && !se(e) && e != null && e !== "-" && (e = +eo(e)), e == null || e === "" ? NaN : Number(e));
}
q({
	number: function(e) {
		return parseFloat(e);
	},
	time: function(e) {
		return +eo(e);
	},
	trim: function(e) {
		return W(e) ? ye(e) : e;
	}
});
var H_ = {
	lt: function(e, t) {
		return e < t;
	},
	lte: function(e, t) {
		return e <= t;
	},
	gt: function(e, t) {
		return e > t;
	},
	gte: function(e, t) {
		return e >= t;
	}
};
(function() {
	function e(e, t) {
		se(t) || go(""), this._opFn = H_[e], this._rvalFloat = io(t);
	}
	return e.prototype.evaluate = function(e) {
		return se(e) ? this._opFn(e, this._rvalFloat) : this._opFn(io(e), this._rvalFloat);
	}, e;
})();
var U_ = function() {
	function e(e, t) {
		var n = e === "desc";
		this._resultLT = n ? 1 : -1, t ??= n ? "min" : "max", this._incomparable = t === "min" ? -Infinity : Infinity;
	}
	return e.prototype.evaluate = function(e, t) {
		var n = se(e) ? e : io(e), r = se(t) ? t : io(t), i = isNaN(n), a = isNaN(r);
		if (i && (n = this._incomparable), a && (r = this._incomparable), i && a) {
			var o = W(e), s = W(t);
			o && (n = s ? e : 0), s && (r = o ? t : 0);
		}
		return n < r ? this._resultLT : n > r ? -this._resultLT : 0;
	}, e;
}();
(function() {
	function e(e, t) {
		this._rval = t, this._isEQ = e, this._rvalTypeof = typeof t, this._rvalFloat = io(t);
	}
	return e.prototype.evaluate = function(e) {
		var t = e === this._rval;
		if (!t) {
			var n = typeof e;
			n !== this._rvalTypeof && (n === "number" || this._rvalTypeof === "number") && (t = io(e) === this._rvalFloat);
		}
		return this._isEQ ? t : !t;
	}, e;
})();
function W_(e) {
	var t = "", n = -Infinity, r = -Infinity, i = Infinity, a = Infinity;
	return e && (e.g != null && (t += "G" + e.g, n = e.g), e.ge != null && (t += "GE" + e.ge, r = e.ge), e.l != null && (t += "L" + e.l, i = e.l), e.le != null && (t += "LE" + e.le, a = e.le)), {
		key: t,
		g: n,
		ge: r,
		l: i,
		le: a
	};
}
function G_(e, t) {
	return t > e.g && t >= e.ge && t < e.l && t <= e.le;
}
//#endregion
//#region node_modules/echarts/lib/data/helper/transform.js
var K_ = function() {
	function e() {}
	return e.prototype.getRawData = function() {
		throw Error("not supported");
	}, e.prototype.getRawDataItem = function(e) {
		throw Error("not supported");
	}, e.prototype.cloneRawData = function() {}, e.prototype.getDimensionInfo = function(e) {}, e.prototype.cloneAllDimensionInfo = function() {}, e.prototype.count = function() {}, e.prototype.retrieveValue = function(e, t) {}, e.prototype.retrieveValueFromItem = function(e, t) {}, e.prototype.convertValue = function(e, t) {
		return V_(e, t);
	}, e;
}();
function q_(e, t) {
	var n = new K_(), r = e.data, i = n.sourceFormat = e.sourceFormat, a = e.startIndex;
	e.seriesLayoutBy !== "column" && go("");
	var o = [], s = {}, c = e.dimensionsDefine;
	if (c) L(c, function(e, t) {
		var n = e.name, r = {
			index: t,
			name: n,
			displayName: e.displayName
		};
		o.push(r), n != null && (Ae(s, n) && go(""), s[n] = r);
	});
	else for (var l = 0; l < e.dimensionsDetectedCount; l++) o.push({ index: l });
	var u = E_(i, tu);
	t.__isBuiltIn && (n.getRawDataItem = function(e) {
		return u(r, a, o, e);
	}, n.getRawData = B(J_, null, e)), n.cloneRawData = B(Y_, null, e), n.count = B(k_(i, tu), null, r, a, o);
	var d = M_(i);
	n.retrieveValue = function(e, t) {
		return f(u(r, a, o, e), t);
	};
	var f = n.retrieveValueFromItem = function(e, t) {
		if (e != null) {
			var n = o[t];
			if (n) return d(e, t, n.name);
		}
	};
	return n.getDimensionInfo = B(X_, null, o, s), n.cloneAllDimensionInfo = B(Z_, null, o), n;
}
function J_(e) {
	var t = e.sourceFormat;
	return nv(t) || go(""), e.data;
}
function Y_(e) {
	var t = e.sourceFormat, n = e.data;
	if (nv(t) || go(""), t === "arrayRows") {
		for (var r = [], i = 0, a = n.length; i < a; i++) r.push(n[i].slice());
		return r;
	}
	if (t === "objectRows") {
		for (var r = [], i = 0, a = n.length; i < a; i++) r.push(M({}, n[i]));
		return r;
	}
}
function X_(e, t, n) {
	if (n != null) {
		if (se(n) || !isNaN(n) && !Ae(t, n)) return e[n];
		if (Ae(t, n)) return t[n];
	}
}
function Z_(e) {
	return k(e);
}
var Q_ = q();
function $_(e) {
	e = k(e);
	var t = e.type, n = "";
	t || go(n);
	var r = t.split(":");
	r.length !== 2 && go(n);
	var i = !1;
	r[0] === "echarts" && (t = r[1], i = !0), e.__isBuiltIn = i, Q_.set(t, e);
}
function ev(e, t, n) {
	var r = bo(e), i = r.length;
	i || go("");
	for (var a = 0, o = i; a < o; a++) {
		var s = r[a];
		t = tv(s, t, n, i === 1 ? null : a), a !== o - 1 && (t.length = Math.max(t.length, 1));
	}
	return t;
}
function tv(e, t, n, r) {
	var i = "";
	t.length || go(i), G(e) || go(i);
	var a = e.type, o = Q_.get(a);
	o || go(i);
	var s = R(t, function(e) {
		return q_(e, o);
	});
	return R(bo(o.transform({
		upstream: s[0],
		upstreamList: s,
		config: k(e.config)
	})), function(e, n) {
		var r = "";
		G(e) || go(r), e.data || go(r), nv(u_(e.data)) || go(r);
		var i, a = t[0];
		if (a && n === 0 && !e.dimensions) {
			var o = a.startIndex;
			o && (e.data = a.data.slice(0, o).concat(e.data)), i = {
				seriesLayoutBy: tu,
				sourceHeader: o,
				dimensions: a.metaRawOption.dimensions
			};
		} else i = {
			seriesLayoutBy: tu,
			sourceHeader: 0,
			dimensions: e.dimensions
		};
		return s_(e.data, i, null);
	});
}
function nv(e) {
	return e === "arrayRows" || e === "objectRows";
}
//#endregion
//#region node_modules/echarts/lib/data/DataStore.js
var rv = typeof Uint32Array > "u" ? Array : Uint32Array, iv = typeof Uint16Array > "u" ? Array : Uint16Array, av = typeof Int32Array > "u" ? Array : Int32Array, ov = typeof Float64Array > "u" ? Array : Float64Array, sv = {
	float: ov,
	int: av,
	ordinal: Array,
	number: Array,
	time: ov
}, cv;
function lv(e) {
	return e > 65535 ? rv : iv;
}
function uv(e) {
	var t = e.constructor;
	return t === Array ? e.slice() : new t(e);
}
function dv(e, t, n, r, i) {
	var a = sv[n || "float"];
	if (i) {
		var o = e[t], s = o && o.length;
		if (s !== r) {
			for (var c = new a(r), l = 0; l < s; l++) c[l] = o[l];
			e[t] = c;
		}
	} else e[t] = new a(r);
}
var fv = function() {
	function e() {
		this._chunks = [], this._rawExtent = [], this._extent = [], this._count = 0, this._rawCount = 0, this._calcDimNameToIdx = q();
	}
	return e.prototype.initData = function(e, t, n) {
		this._provider = e, this._chunks = [], this._indices = null, this.getRawIndex = this._getRawIdxIdentity;
		var r = e.getSource(), i = this.defaultDimValueGetter = cv[r.sourceFormat];
		this._dimValueGetter = n || i, this._rawExtent = [], h_(r), this._dimensions = R(t, function(e) {
			return {
				type: e.type,
				property: e.property
			};
		}), this._initDataFromProvider(0, e.count());
	}, e.prototype.getProvider = function() {
		return this._provider;
	}, e.prototype.getSource = function() {
		return this._provider.getSource();
	}, e.prototype.ensureCalculationDimension = function(e, t) {
		var n = this._calcDimNameToIdx, r = this._dimensions, i = n.get(e);
		if (i != null) {
			if (r[i].type === t) return i;
		} else i = r.length;
		return r[i] = { type: t }, n.set(e, i), this._chunks[i] = new sv[t || "float"](this._rawCount), this._rawExtent[i] = Xo(), i;
	}, e.prototype.collectOrdinalMeta = function(e, t) {
		var n = this._chunks[e], r = this._dimensions[e], i = this._rawExtent, a = r.ordinalOffset || 0, o = n.length;
		a === 0 && (i[e] = Xo());
		for (var s = i[e], c = a; c < o; c++) {
			var l = n[c] = t.parseAndCollect(n[c]);
			isNaN(l) || (s[0] = Math.min(l, s[0]), s[1] = Math.max(l, s[1]));
		}
		r.ordinalMeta = t, r.ordinalOffset = o, r.type = "ordinal";
	}, e.prototype.getOrdinalMeta = function(e) {
		return this._dimensions[e].ordinalMeta;
	}, e.prototype.getDimensionProperty = function(e) {
		var t = this._dimensions[e];
		return t && t.property;
	}, e.prototype.appendData = function(e) {
		var t = this._provider, n = this.count();
		t.appendData(e);
		var r = t.count();
		return t.persistent || (r += n), n < r && this._initDataFromProvider(n, r, !0), [n, r];
	}, e.prototype.appendValues = function(e, t) {
		for (var n = this._chunks, r = this._dimensions, i = r.length, a = this._rawExtent, o = this.count(), s = o + Math.max(e.length, t || 0), c = 0; c < i; c++) {
			var l = r[c];
			dv(n, c, l.type, s, !0);
		}
		for (var u = [], d = o; d < s; d++) for (var f = d - o, p = 0; p < i; p++) {
			var l = r[p], m = cv.arrayRows.call(this, e[f] || u, l.property, f, p);
			n[p][d] = m;
			var h = a[p];
			m < h[0] && (h[0] = m), m > h[1] && (h[1] = m);
		}
		return this._rawCount = this._count = s, {
			start: o,
			end: s
		};
	}, e.prototype._initDataFromProvider = function(e, t, n) {
		for (var r = this._provider, i = this._chunks, a = this._dimensions, o = a.length, s = this._rawExtent, c = R(a, function(e) {
			return e.property;
		}), l = 0; l < o; l++) {
			var u = a[l];
			s[l] || (s[l] = Xo()), dv(i, l, u.type, t, n);
		}
		if (r.fillStorage) r.fillStorage(e, t, i, s);
		else for (var d = [], f = e; f < t; f++) {
			d = r.getItem(f, d);
			for (var p = 0; p < o; p++) {
				var m = i[p], h = this._dimValueGetter(d, c[p], f, p);
				m[f] = h;
				var g = s[p];
				h < g[0] && (g[0] = h), h > g[1] && (g[1] = h);
			}
		}
		!r.persistent && r.clean && r.clean(), this._rawCount = this._count = t, this._extent = [];
	}, e.prototype.count = function() {
		return this._count;
	}, e.prototype.get = function(e, t) {
		if (!(t >= 0 && t < this._count)) return NaN;
		var n = this._chunks[e];
		return n ? n[this.getRawIndex(t)] : NaN;
	}, e.prototype.getValues = function(e, t) {
		var n = [], r = [];
		if (t == null) {
			t = e, e = [];
			for (var i = 0; i < this._dimensions.length; i++) r.push(i);
		} else r = e;
		for (var i = 0, a = r.length; i < a; i++) n.push(this.get(r[i], t));
		return n;
	}, e.prototype.getByRawIndex = function(e, t) {
		if (!(t >= 0 && t < this._rawCount)) return NaN;
		var n = this._chunks[e];
		return n ? n[t] : NaN;
	}, e.prototype.getSum = function(e) {
		var t = this._chunks[e], n = 0;
		if (t) for (var r = 0, i = this.count(); r < i; r++) {
			var a = this.get(e, r);
			isNaN(a) || (n += a);
		}
		return n;
	}, e.prototype.getMedian = function(e) {
		var t = [];
		this.each([e], function(e) {
			isNaN(e) || t.push(e);
		}), Ga(t);
		var n = this.count();
		return n === 0 ? 0 : n % 2 == 1 ? t[(n - 1) / 2] : (t[n / 2] + t[n / 2 - 1]) / 2;
	}, e.prototype.indexOfRawIndex = function(e) {
		if (e >= this._rawCount || e < 0) return -1;
		if (!this._indices) return e;
		var t = this._indices, n = t[e];
		if (n != null && n < this._count && n === e) return e;
		for (var r = 0, i = this._count - 1; r <= i;) {
			var a = (r + i) / 2 | 0;
			if (t[a] < e) r = a + 1;
			else if (t[a] > e) i = a - 1;
			else return a;
		}
		return -1;
	}, e.prototype.getIndices = function() {
		var e, t = this._indices;
		if (t) {
			var n = t.constructor, r = this._count;
			if (n === Array) {
				e = new n(r);
				for (var i = 0; i < r; i++) e[i] = t[i];
			} else e = new n(t.buffer, 0, r);
		} else {
			var n = lv(this._rawCount);
			e = new n(this.count());
			for (var i = 0; i < e.length; i++) e[i] = i;
		}
		return e;
	}, e.prototype.filter = function(e, t) {
		if (!this._count) return this;
		for (var n = this.clone(), r = n.count(), i = new (lv(n._rawCount))(r), a = [], o = e.length, s = 0, c = e[0], l = n._chunks, u = 0; u < r; u++) {
			var d = void 0, f = n.getRawIndex(u);
			if (o === 0) d = t(u);
			else if (o === 1) {
				var p = l[c][f];
				d = t(p, u);
			} else {
				for (var m = 0; m < o; m++) a[m] = l[e[m]][f];
				a[m] = u, d = t.apply(null, a);
			}
			d && (i[s++] = f);
		}
		return s < r && (n._indices = i), n._count = s, n._extent = [], n._updateGetRawIdx(), n;
	}, e.prototype.selectRange = function(e) {
		var t = this.clone(), n = t._count;
		if (!n) return this;
		var r = z(e), i = r.length;
		if (!i) return this;
		var a = t.count(), o = new (lv(t._rawCount))(a), s = 0, c = r[0], l = e[c][0], u = e[c][1], d = t._chunks, f = !1;
		if (!t._indices) {
			var p = 0;
			if (i === 1) {
				for (var m = d[r[0]], h = 0; h < n; h++) {
					var g = m[h];
					(g >= l && g <= u || isNaN(g)) && (o[s++] = p), p++;
				}
				f = !0;
			} else if (i === 2) {
				for (var m = d[r[0]], _ = d[r[1]], v = e[r[1]][0], y = e[r[1]][1], h = 0; h < n; h++) {
					var g = m[h], b = _[h];
					(g >= l && g <= u || isNaN(g)) && (b >= v && b <= y || isNaN(b)) && (o[s++] = p), p++;
				}
				f = !0;
			}
		}
		if (!f) {
			if (i === 1) for (var h = 0; h < a; h++) {
				var x = t.getRawIndex(h), g = d[r[0]][x];
				(g >= l && g <= u || isNaN(g)) && (o[s++] = x);
			}
			else for (var h = 0; h < a; h++) {
				for (var S = !0, x = t.getRawIndex(h), C = 0; C < i; C++) {
					var w = r[C], g = d[w][x];
					(g < e[w][0] || g > e[w][1]) && (S = !1);
				}
				S && (o[s++] = t.getRawIndex(h));
			}
		}
		return s < a && (t._indices = o), t._count = s, t._extent = [], t._updateGetRawIdx(), t;
	}, e.prototype.map = function(e, t) {
		var n = this.clone(e);
		return this._updateDims(n, e, t), n;
	}, e.prototype.modify = function(e, t) {
		this._updateDims(this, e, t);
	}, e.prototype._updateDims = function(e, t, n) {
		for (var r = e._chunks, i = [], a = t.length, o = e.count(), s = [], c = e._rawExtent, l = 0; l < t.length; l++) c[t[l]] = Xo();
		for (var u = 0; u < o; u++) {
			for (var d = e.getRawIndex(u), f = 0; f < a; f++) s[f] = r[t[f]][d];
			s[a] = u;
			var p = n && n.apply(null, s);
			if (p != null) {
				typeof p != "object" && (i[0] = p, p = i);
				for (var l = 0; l < p.length; l++) {
					var m = t[l], h = p[l], g = c[m], _ = r[m];
					_ && (_[d] = h), h < g[0] && (g[0] = h), h > g[1] && (g[1] = h);
				}
			}
		}
	}, e.prototype.lttbDownSample = function(e, t) {
		var n = this.clone([e], !0), r = n._chunks[e], i = this.count(), a = 0, o = Math.floor(1 / t), s = this.getRawIndex(0), c, l, u, d = new (lv(this._rawCount))(Math.min((Math.ceil(i / o) + 2) * 2, i));
		d[a++] = s;
		for (var f = 1; f < i - 1; f += o) {
			for (var p = Math.min(f + o, i - 1), m = Math.min(f + o * 2, i), h = (m + p) / 2, g = 0, _ = p; _ < m; _++) {
				var v = this.getRawIndex(_), y = r[v];
				isNaN(y) || (g += y);
			}
			g /= m - p;
			var b = f, x = Math.min(f + o, i), S = f - 1, C = r[s];
			c = -1, u = b;
			for (var w = -1, T = 0, _ = b; _ < x; _++) {
				var v = this.getRawIndex(_), y = r[v];
				if (isNaN(y)) {
					T++, w < 0 && (w = v);
					continue;
				}
				l = Math.abs((S - h) * (y - C) - (S - _) * (g - C)), l > c && (c = l, u = v);
			}
			T > 0 && T < x - b && (d[a++] = Math.min(w, u), u = Math.max(w, u)), d[a++] = u, s = u;
		}
		return d[a++] = this.getRawIndex(i - 1), n._count = a, n._indices = d, n.getRawIndex = this._getRawIdx, n;
	}, e.prototype.minmaxDownSample = function(e, t) {
		for (var n = this.clone([e], !0), r = n._chunks, i = Math.floor(1 / t), a = r[e], o = this.count(), s = new (lv(this._rawCount))(Math.ceil(o / i) * 2), c = 0, l = 0; l < o; l += i) {
			var u = l, d = a[this.getRawIndex(u)], f = l, p = a[this.getRawIndex(f)], m = i;
			l + i > o && (m = o - l);
			for (var h = 0; h < m; h++) {
				var g = a[this.getRawIndex(l + h)];
				g < d && (d = g, u = l + h), g > p && (p = g, f = l + h);
			}
			var _ = this.getRawIndex(u), v = this.getRawIndex(f);
			u < f ? (s[c++] = _, s[c++] = v) : (s[c++] = v, s[c++] = _);
		}
		return n._count = c, n._indices = s, n._updateGetRawIdx(), n;
	}, e.prototype.downSample = function(e, t, n, r) {
		for (var i = this.clone([e], !0), a = i._chunks, o = [], s = Math.floor(1 / t), c = a[e], l = this.count(), u = i._rawExtent[e] = Xo(), d = new (lv(this._rawCount))(Math.ceil(l / s)), f = 0, p = 0; p < l; p += s) {
			s > l - p && (s = l - p, o.length = s);
			for (var m = 0; m < s; m++) {
				var h = this.getRawIndex(p + m);
				o[m] = c[h];
			}
			var g = n(o), _ = this.getRawIndex(Math.min(p + r(o, g) || 0, l - 1));
			c[_] = g, g < u[0] && (u[0] = g), g > u[1] && (u[1] = g), d[f++] = _;
		}
		return i._count = f, i._indices = d, i._updateGetRawIdx(), i;
	}, e.prototype.each = function(e, t) {
		if (this._count) for (var n = e.length, r = this._chunks, i = 0, a = this.count(); i < a; i++) {
			var o = this.getRawIndex(i);
			switch (n) {
				case 0:
					t(i);
					break;
				case 1:
					t(r[e[0]][o], i);
					break;
				case 2:
					t(r[e[0]][o], r[e[1]][o], i);
					break;
				default:
					for (var s = 0, c = []; s < n; s++) c[s] = r[e[s]][o];
					c[s] = i, t.apply(null, c);
			}
		}
	}, e.prototype.getDataExtent = function(e, t) {
		var n = this._chunks[e], r = Xo();
		if (!n) return r;
		var i = this.count();
		if (!this._indices && !t) return this._rawExtent[e].slice();
		var a = this._extent, o = a[e] || (a[e] = {}), s = W_(t), c = s.key, l = o[c];
		if (l) return l.slice();
		for (var u = r[0], d = r[1], f = 0; f < i; f++) {
			var p = n[this.getRawIndex(f)];
			(!t || G_(s, p)) && (p < u && (u = p), p > d && (d = p));
		}
		return o[c] = [u, d];
	}, e.prototype.getRawDataItem = function(e) {
		var t = this.getRawIndex(e);
		if (this._provider.persistent) return this._provider.getItem(t);
		for (var n = [], r = this._chunks, i = 0; i < r.length; i++) n.push(r[i][t]);
		return n;
	}, e.prototype.clone = function(t, n) {
		var r = new e(), i = this._chunks, a = t && ne(t, function(e, t) {
			return e[t] = !0, e;
		}, {});
		if (a) for (var o = 0; o < i.length; o++) r._chunks[o] = a[o] ? uv(i[o]) : i[o];
		else r._chunks = i;
		return this._copyCommonProps(r), n || (r._indices = this._cloneIndices()), r._updateGetRawIdx(), r;
	}, e.prototype._copyCommonProps = function(e) {
		e._count = this._count, e._rawCount = this._rawCount, e._provider = this._provider, e._dimensions = this._dimensions, e._extent = k(this._extent), e._rawExtent = k(this._rawExtent);
	}, e.prototype._cloneIndices = function() {
		if (this._indices) {
			var e = this._indices.constructor, t = void 0;
			if (e === Array) {
				var n = this._indices.length;
				t = new e(n);
				for (var r = 0; r < n; r++) t[r] = this._indices[r];
			} else t = new e(this._indices);
			return t;
		}
		return null;
	}, e.prototype._getRawIdxIdentity = function(e) {
		return e;
	}, e.prototype._getRawIdx = function(e) {
		return e < this._count && e >= 0 ? this._indices[e] : -1;
	}, e.prototype._updateGetRawIdx = function() {
		this.getRawIndex = this._indices ? this._getRawIdx : this._getRawIdxIdentity;
	}, e.internalField = function() {
		function e(e, t, n, r) {
			return V_(e[r], this._dimensions[r]);
		}
		cv = {
			arrayRows: e,
			objectRows: function(e, t, n, r) {
				return V_(e[t], this._dimensions[r]);
			},
			keyedColumns: e,
			original: function(e, t, n, r) {
				var i = e && (e.value == null ? e : e.value);
				return V_(i instanceof Array ? i[r] : i, this._dimensions[r]);
			},
			typedArray: function(e, t, n, r) {
				return e[r];
			}
		};
	}(), e;
}(), pv = function() {
	function e(e) {
		this._sourceList = [], this._storeList = [], this._upstreamSignList = [], this._versionSignBase = 0, this._dirty = !0, this._sourceHost = e;
	}
	return e.prototype.dirty = function() {
		this._setLocalSource([], []), this._storeList = [], this._dirty = !0;
	}, e.prototype._setLocalSource = function(e, t) {
		this._sourceList = e, this._upstreamSignList = t, this._versionSignBase++, this._versionSignBase > 9e10 && (this._versionSignBase = 0);
	}, e.prototype._getVersionSign = function() {
		return this._sourceHost.uid + "_" + this._versionSignBase;
	}, e.prototype.prepareSource = function() {
		this._isDirty() && (this._createSource(), this._dirty = !1);
	}, e.prototype._createSource = function() {
		this._setLocalSource([], []);
		var e = this._sourceHost, t = this._getUpstreamSourceManagers(), n = !!t.length, r, i;
		if (mv(e)) {
			var a = e, o = void 0, s = void 0, c = void 0;
			if (n) {
				var l = t[0];
				l.prepareSource(), c = l.getSource(), o = c.data, s = c.sourceFormat, i = [l._getVersionSign()];
			} else o = a.get("data", !0), s = le(o) ? $l : Yl, i = [];
			var u = this._getSourceMetaRawOption() || {}, d = c && c.metaRawOption || {}, f = K(u.seriesLayoutBy, d.seriesLayoutBy) || null, p = K(u.sourceHeader, d.sourceHeader), m = K(u.dimensions, d.dimensions);
			r = f !== d.seriesLayoutBy || !!p != !!d.sourceHeader || m ? [s_(o, {
				seriesLayoutBy: f,
				sourceHeader: p,
				dimensions: m
			}, s)] : [];
		} else {
			var h = e;
			if (n) {
				var g = this._applyTransform(t);
				r = g.sourceList, i = g.upstreamSignList;
			} else r = [s_(h.get("source", !0), this._getSourceMetaRawOption(), null)], i = [];
		}
		this._setLocalSource(r, i);
	}, e.prototype._applyTransform = function(e) {
		var t = this._sourceHost, n = t.get("transform", !0), r = t.get("fromTransformResult", !0);
		r != null && e.length !== 1 && hv("");
		var i, a = [], o = [];
		return L(e, function(e) {
			e.prepareSource();
			var t = e.getSource(r || 0);
			r != null && !t && hv(""), a.push(t), o.push(e._getVersionSign());
		}), n ? i = ev(n, a, { datasetIndex: t.componentIndex }) : r != null && (i = [l_(a[0])]), {
			sourceList: i,
			upstreamSignList: o
		};
	}, e.prototype._isDirty = function() {
		if (this._dirty) return !0;
		for (var e = this._getUpstreamSourceManagers(), t = 0; t < e.length; t++) {
			var n = e[t];
			if (n._isDirty() || this._upstreamSignList[t] !== n._getVersionSign()) return !0;
		}
	}, e.prototype.getSource = function(e) {
		e ||= 0;
		var t = this._sourceList[e];
		if (!t) {
			var n = this._getUpstreamSourceManagers();
			return n[0] && n[0].getSource(e);
		}
		return t;
	}, e.prototype.getSharedDataStore = function(e) {
		var t = e.makeStoreSchema();
		return this._innerGetDataStore(t.dimensions, e.source, t.hash);
	}, e.prototype._innerGetDataStore = function(e, t, n) {
		var r = 0, i = this._storeList, a = i[r];
		a ||= i[r] = {};
		var o = a[n];
		if (!o) {
			var s = this._getUpstreamSourceManagers()[0];
			mv(this._sourceHost) && s ? o = s._innerGetDataStore(e, t, n) : (o = new fv(), o.initData(new S_(t, e.length), e)), a[n] = o;
		}
		return o;
	}, e.prototype._getUpstreamSourceManagers = function() {
		var e = this._sourceHost;
		if (mv(e)) {
			var t = ig(e);
			return t ? [t.getSourceManager()] : [];
		}
		return R(ag(e), function(e) {
			return e.getSourceManager();
		});
	}, e.prototype._getSourceMetaRawOption = function() {
		var e = this._sourceHost, t, n, r;
		if (mv(e)) t = e.get("seriesLayoutBy", !0), n = e.get("sourceHeader", !0), r = e.get("dimensions", !0);
		else if (!this._getUpstreamSourceManagers().length) {
			var i = e;
			t = i.get("seriesLayoutBy", !0), n = i.get("sourceHeader", !0), r = i.get("dimensions", !0);
		}
		return {
			seriesLayoutBy: t,
			sourceHeader: n,
			dimensions: r
		};
	}, e;
}();
function mv(e) {
	return e.mainType === "series";
}
function hv(e) {
	throw Error(e);
}
//#endregion
//#region node_modules/echarts/lib/component/tooltip/tooltipMarkup.js
var gv = "line-height:1";
function _v(e) {
	var t = e.lineHeight;
	return t == null ? gv : "line-height:" + dt(t + "") + "px";
}
function vv(e, t) {
	var n = e.color || Q.color.tertiary, r = e.fontSize || 12, i = e.fontWeight || "400", a = e.color || Q.color.secondary, o = e.fontSize || 14, s = e.fontWeight || "900";
	return t === "html" ? {
		nameStyle: "font-size:" + dt(r + "") + "px;color:" + dt(n) + ";font-weight:" + dt(i + ""),
		valueStyle: "font-size:" + dt(o + "") + "px;color:" + dt(a) + ";font-weight:" + dt(s + "")
	} : {
		nameStyle: {
			fontSize: r,
			fill: n,
			fontWeight: i
		},
		valueStyle: {
			fontSize: o,
			fill: a,
			fontWeight: s
		}
	};
}
var yv = [
	0,
	10,
	20,
	30
], bv = [
	"",
	"\n",
	"\n\n",
	"\n\n\n"
];
function xv(e, t) {
	return t.type = e, t;
}
function Sv(e) {
	return e.type === "section";
}
function Cv(e) {
	return Sv(e) ? Tv : Ev;
}
function wv(e) {
	if (Sv(e)) {
		var t = 0, n = e.blocks.length, r = n > 1 || n > 0 && !e.noHeader;
		return L(e.blocks, function(e) {
			var n = wv(e);
			n >= t && (t = n + +(r && (!n || Sv(e) && !e.noHeader)));
		}), t;
	}
	return 0;
}
function Tv(e, t, n, r) {
	var i = t.noHeader, a = Ov(wv(t)), o = [], s = t.blocks || [];
	ve(!s || H(s)), s ||= [];
	var c = e.orderMode;
	if (t.sortBlocks && c) {
		s = s.slice();
		var l = {
			valueAsc: "asc",
			valueDesc: "desc"
		};
		if (Ae(l, c)) {
			var u = new U_(l[c], null);
			s.sort(function(e, t) {
				return u.evaluate(e.sortParam, t.sortParam);
			});
		} else c === "seriesDesc" && s.reverse();
	}
	L(s, function(n, i) {
		var s = t.valueFormatter, c = Cv(n)(s ? M(M({}, e), { valueFormatter: s }) : e, n, i > 0 ? a.html : 0, r);
		c != null && o.push(c);
	});
	var d = e.renderMode === "richText" ? o.join(a.richText) : kv(r, o.join(""), i ? n : a.html);
	if (i) return d;
	var f = _h(t.header, "ordinal", e.useUTC), p = vv(r, e.renderMode).nameStyle, m = _v(r);
	return e.renderMode === "richText" ? Mv(e, f, p) + a.richText + d : kv(r, "<div style=\"" + p + ";" + m + ";\">" + dt(f) + "</div>" + d, n);
}
function Ev(e, t, n, r) {
	var i = e.renderMode, a = t.noName, o = t.noValue, s = !t.markerType, c = t.name, l = e.useUTC, u = t.valueFormatter || e.valueFormatter || function(e) {
		return e = H(e) ? e : [e], R(e, function(e, t) {
			return _h(e, H(p) ? p[t] : p, l);
		});
	};
	if (!(a && o)) {
		var d = s ? "" : e.markupStyleCreator.makeTooltipMarker(t.markerType, t.markerColor || Q.color.secondary, i), f = a ? "" : _h(c, "ordinal", l), p = t.valueType, m = o ? [] : u(t.value, t.rawDataIndex), h = !s || !a, g = !s && a, _ = vv(r, i), v = _.nameStyle, y = _.valueStyle;
		return i === "richText" ? (s ? "" : d) + (a ? "" : Mv(e, f, v)) + (o ? "" : Nv(e, m, h, g, y)) : kv(r, (s ? "" : d) + (a ? "" : Av(f, !s, v)) + (o ? "" : jv(m, h, g, y)), n);
	}
}
function Dv(e, t, n, r, i, a) {
	if (e) return Cv(e)({
		useUTC: i,
		renderMode: n,
		orderMode: r,
		markupStyleCreator: t,
		valueFormatter: e.valueFormatter
	}, e, 0, a);
}
function Ov(e) {
	return {
		html: yv[e],
		richText: bv[e]
	};
}
function kv(e, t, n) {
	var r = "<div style=\"clear:both\"></div>", i = "margin: " + n + "px 0 0", a = _v(e);
	return "<div style=\"" + i + ";" + a + ";\">" + t + r + "</div>";
}
function Av(e, t, n) {
	var r = t ? "margin-left:2px" : "";
	return "<span style=\"" + n + ";" + r + "\">" + dt(e) + "</span>";
}
function jv(e, t, n, r) {
	var i = t ? "float:right;margin-left:" + (n ? "10px" : "20px") : "";
	return e = H(e) ? e : [e], "<span style=\"" + i + ";" + r + "\">" + R(e, function(e) {
		return dt(e);
	}).join("&nbsp;&nbsp;") + "</span>";
}
function Mv(e, t, n) {
	return e.markupStyleCreator.wrapRichTextStyle(t, n);
}
function Nv(e, t, n, r, i) {
	var a = [i], o = r ? 10 : 20;
	return n && a.push({
		padding: [
			0,
			0,
			0,
			o
		],
		align: "right"
	}), e.markupStyleCreator.wrapRichTextStyle(H(t) ? t.join("  ") : t, a);
}
function Pv(e, t) {
	var n = e.getData().getItemVisual(t, "style")[e.visualDrawType];
	return Sh(n);
}
function Fv(e, t) {
	return e.get("padding") ?? (t === "richText" ? [8, 10] : 10);
}
var Iv = function() {
	function e() {
		this.richTextStyles = {}, this._nextStyleNameId = oo();
	}
	return e.prototype._generateStyleName = function() {
		return "__EC_aUTo_" + this._nextStyleNameId++;
	}, e.prototype.makeTooltipMarker = function(e, t, n) {
		var r = n === "richText" ? this._generateStyleName() : null, i = xh({
			color: t,
			type: e,
			renderMode: n,
			markerId: r
		});
		return W(i) ? i : (this.richTextStyles[r] = i.style, i.content);
	}, e.prototype.wrapRichTextStyle = function(e, t) {
		var n = {};
		H(t) ? L(t, function(e) {
			return M(n, e);
		}) : M(n, t);
		var r = this._generateStyleName();
		return this.richTextStyles[r] = n, "{" + r + "|" + e + "}";
	}, e;
}();
//#endregion
//#region node_modules/echarts/lib/component/tooltip/seriesFormatTooltip.js
function Lv(e) {
	var t = e.series, n = e.dataIndex, r = e.multipleSeries, i = t.getData(), a = i.mapDimensionsAll("defaultedTooltip"), o = a.length, s = t.getRawValue(n), c = H(s), l = Pv(t, n), u, d, f, p;
	if (o > 1 || c && !o) {
		var m = Rv(s, t, n, a, l);
		u = m.inlineValues, d = m.inlineValueTypes, f = m.blocks, p = m.inlineValues[0];
	} else if (o) {
		var h = i.getDimensionInfo(a[0]);
		p = u = P_(i, n, a[0]), d = h.type;
	} else p = u = c ? s[0] : s;
	var g = Fo(t), _ = g && t.name || "", v = i.getName(n), y = r ? _ : v;
	return xv("section", {
		header: _,
		noHeader: r || !g,
		sortParam: p,
		blocks: [xv("nameValue", {
			markerType: "item",
			markerColor: l,
			name: y,
			noName: !ye(y),
			value: u,
			valueType: d,
			rawDataIndex: i.getRawIndex(n)
		})].concat(f || [])
	});
}
function Rv(e, t, n, r, i) {
	var a = t.getData(), o = ne(e, function(e, t, n) {
		var r = a.getDimensionInfo(n);
		return e ||= r && r.tooltip !== !1 && r.displayName != null;
	}, !1), s = [], c = [], l = [];
	r.length ? L(r, function(e) {
		u(P_(a, n, e), e);
	}) : L(e, u);
	function u(e, t) {
		var n = a.getDimensionInfo(t);
		n && n.otherDims.tooltip !== !1 && (o ? l.push(xv("nameValue", {
			markerType: "subItem",
			markerColor: i,
			name: n.displayName,
			value: e,
			valueType: n.type
		})) : (s.push(e), c.push(n.type)));
	}
	return {
		inlineValues: s,
		inlineValueTypes: c,
		blocks: l
	};
}
//#endregion
//#region node_modules/echarts/lib/model/Series.js
var zv = X();
function Bv(e, t) {
	return e.getName(t) || e.getId(t);
}
var Vv = function(e) {
	r(t, e);
	function t() {
		var t = e !== null && e.apply(this, arguments) || this;
		return t._selectedDataIndicesMap = {}, t;
	}
	return t.prototype.init = function(e, t, n) {
		this.seriesIndex = this.componentIndex, this.dataTask = R_({
			count: Wv,
			reset: Gv
		}), this.dataTask.context = { model: this }, this.mergeDefaultAndTheme(e, n), (zv(this).sourceManager = new pv(this)).prepareSource();
		var r = this.getInitialData(e, n);
		qv(r, this), this.dataTask.context.data = r, zv(this).dataBeforeProcessed = r, Hv(this), this._initSelectedMapFromData(r);
	}, t.prototype.mergeDefaultAndTheme = function(e, t) {
		var n = zh(this), r = n ? Vh(e) : {}, i = this.subType;
		Wh.hasClass(i) && (i += "Series"), A(e, t.getTheme().get(this.subType)), A(e, this.getDefaultOption()), xo(e, "label", ["show"]), this.fillDataTextStyle(e.data), n && Bh(e, r, n);
	}, t.prototype.mergeOption = function(e, t) {
		e = A(this.option, e, !0), this.fillDataTextStyle(e.data);
		var n = zh(this);
		n && Bh(this.option, e, n);
		var r = zv(this).sourceManager;
		r.dirty(), r.prepareSource();
		var i = this.getInitialData(e, t);
		qv(i, this), this.dataTask.dirty(), this.dataTask.context.data = i, zv(this).dataBeforeProcessed = i, Hv(this), this._initSelectedMapFromData(i);
	}, t.prototype.fillDataTextStyle = function(e) {
		if (e && !le(e)) for (var t = ["show"], n = 0; n < e.length; n++) e[n] && e[n].label && xo(e[n], "label", t);
	}, t.prototype.getInitialData = function(e, t) {}, t.prototype.appendData = function(e) {
		this.getRawData().appendData(e.data);
	}, t.prototype.getData = function(e) {
		var t = Yv(this);
		if (t) {
			var n = t.context.data;
			return e == null || !n.getLinkedData ? n : n.getLinkedData(e);
		}
		return zv(this).data;
	}, t.prototype.getAllData = function() {
		var e = this.getData();
		return e && e.getLinkedDataAll ? e.getLinkedDataAll() : [{ data: e }];
	}, t.prototype.setData = function(e) {
		var t = Yv(this);
		if (t) {
			var n = t.context;
			n.outputData = e, t !== this.dataTask && (n.data = e);
		}
		zv(this).data = e;
	}, t.prototype.getEncode = function() {
		var e = this.get("encode", !0);
		if (e) return q(e);
	}, t.prototype.getSourceManager = function() {
		return zv(this).sourceManager;
	}, t.prototype.getSource = function() {
		return this.getSourceManager().getSource();
	}, t.prototype.getRawData = function() {
		return zv(this).dataBeforeProcessed;
	}, t.prototype.getColorBy = function() {
		return this.get("colorBy") || "series";
	}, t.prototype.isColorBySeries = function() {
		return this.getColorBy() === "series";
	}, t.prototype.getBaseAxis = function() {
		var e = this.coordinateSystem;
		return e && e.getBaseAxis && e.getBaseAxis();
	}, t.prototype.indicesOfNearest = function(e, t, n, r) {
		var i = this.getData(), a = this.coordinateSystem, o = a && a.getAxis(e);
		if (!a || !o) return [];
		var s = o.dataToCoord(n);
		r ??= Infinity;
		for (var c = [], l = Infinity, u = -1, d = 0, f = i.getDimensionIndex(t), p = i.getStore(), m = 0, h = p.count(); m < h; m++) {
			var g = p.get(f, m), _ = s - o.dataToCoord(g), v = Math.abs(_);
			v <= r && ((v < l || v === l && _ >= 0 && u < 0) && (l = v, u = _, d = 0), _ === u && (c[d++] = m));
		}
		return c.length = d, c;
	}, t.prototype.formatTooltip = function(e, t, n) {
		return Lv({
			series: this,
			dataIndex: e,
			multipleSeries: t
		});
	}, t.prototype.isAnimationEnabled = function() {
		var e = this.ecModel;
		if (a.node && !(e && e.ssr)) return !1;
		var t = this.getShallow("animation");
		return t && this.getData().count() > this.getShallow("animationThreshold") && (t = !1), !!t;
	}, t.prototype.restoreData = function() {
		this.dataTask.dirty();
	}, t.prototype.getColorFromPalette = function(e, t, n) {
		var r = this.ecModel, i = dg.prototype.getColorFromPalette.call(this, e, t, n);
		return i ||= r.getColorFromPalette(e, t, n), i;
	}, t.prototype.coordDimToDataDim = function(e) {
		return this.getRawData().mapDimensionsAll(e);
	}, t.prototype.getProgressive = function() {
		return this.get("progressive");
	}, t.prototype.getProgressiveThreshold = function() {
		return this.get("progressiveThreshold");
	}, t.prototype.select = function(e, t) {
		this._innerSelect(this.getData(t), e);
	}, t.prototype.unselect = function(e, t) {
		var n = this.option.selectedMap;
		if (n) {
			var r = this.option.selectedMode, i = this.getData(t);
			if (r === "series" || n === "all") {
				this.option.selectedMap = {}, this._selectedDataIndicesMap = {};
				return;
			}
			for (var a = 0; a < e.length; a++) {
				var o = e[a], s = Bv(i, o);
				n[s] = !1, this._selectedDataIndicesMap[s] = -1;
			}
		}
	}, t.prototype.toggleSelect = function(e, t) {
		for (var n = [], r = 0; r < e.length; r++) n[0] = e[r], this.isSelected(e[r], t) ? this.unselect(n, t) : this.select(n, t);
	}, t.prototype.getSelectedDataIndices = function() {
		if (this.option.selectedMap === "all") return [].slice.call(this.getData().getIndices());
		for (var e = this._selectedDataIndicesMap, t = z(e), n = [], r = 0; r < t.length; r++) {
			var i = e[t[r]];
			i >= 0 && n.push(i);
		}
		return n;
	}, t.prototype.isSelected = function(e, t) {
		var n = this.option.selectedMap;
		if (!n) return !1;
		var r = this.getData(t);
		return (n === "all" || n[Bv(r, e)]) && !r.getItemModel(e).get(["select", "disabled"]);
	}, t.prototype.isUniversalTransitionEnabled = function() {
		if (this.__universalTransitionEnabled) return !0;
		var e = this.option.universalTransition;
		return e ? e === !0 || e && e.enabled : !1;
	}, t.prototype._innerSelect = function(e, t) {
		var n, r, i = this.option, a = i.selectedMode, o = t.length;
		if (a && o) {
			if (a === "series") i.selectedMap = "all";
			else if (a === "multiple") {
				G(i.selectedMap) || (i.selectedMap = {});
				for (var s = i.selectedMap, c = 0; c < o; c++) {
					var l = t[c], u = Bv(e, l);
					s[u] = !0, this._selectedDataIndicesMap[u] = e.getRawIndex(l);
				}
			} else if (a === "single" || a === !0) {
				var d = t[o - 1], u = Bv(e, d);
				i.selectedMap = (n = {}, n[u] = !0, n), this._selectedDataIndicesMap = (r = {}, r[u] = e.getRawIndex(d), r);
			}
		}
	}, t.prototype._initSelectedMapFromData = function(e) {
		if (!this.option.selectedMap) {
			var t = [];
			e.hasItemOption && e.each(function(n) {
				var r = e.getRawDataItem(n);
				r && r.selected && t.push(n);
			}), t.length > 0 && this._innerSelect(e, t);
		}
	}, t.registerClass = function(e) {
		return Wh.registerClass(e);
	}, t.protoInitialize = function() {
		var e = t.prototype;
		e.type = "series.__base__", e.seriesIndex = 0, e.ignoreStyleOnData = !1, e.hasSymbolVisual = !1, e.defaultSymbol = "circle", e.visualStyleAccessPath = "itemStyle", e.visualDrawType = "fill";
	}(), t;
}(Wh);
F(Vv, I_), F(Vv, dg), bs(Vv, Wh);
function Hv(e) {
	var t = e.name;
	Fo(e) || (e.name = Uv(e) || t);
}
function Uv(e) {
	var t = e.getRawData(), n = t.mapDimensionsAll("seriesName"), r = [];
	return L(n, function(e) {
		var n = t.getDimensionInfo(e);
		n.displayName && r.push(n.displayName);
	}), r.join(" ");
}
function Wv(e) {
	return e.model.getRawData().count();
}
function Gv(e) {
	var t = e.model;
	return t.setData(t.getRawData().cloneShallow()), Kv;
}
function Kv(e, t) {
	t.outputData && e.end > t.outputData.count() && t.model.getRawData().cloneShallow(t.outputData);
}
function qv(e, t) {
	L(De(e.CHANGABLE_METHODS, e.DOWNSAMPLE_METHODS), function(n) {
		e.wrapMethod(n, V(Jv, t));
	});
}
function Jv(e, t) {
	var n = Yv(e);
	return n && n.setOutputEnd((t || this).count()), t;
}
function Yv(e) {
	var t = (e.ecModel || {}).scheduler, n = t && t.getPipeline(e.uid);
	if (n) {
		var r = n.currentTask;
		if (r) {
			var i = r.agentStubMap;
			i && (r = i.get(e.uid));
		}
		return r;
	}
}
//#endregion
//#region node_modules/echarts/lib/view/Component.js
var Xv = function() {
	function e() {
		this.group = new va(), this.uid = fm("viewComponent");
	}
	return e.prototype.init = function(e, t) {}, e.prototype.render = function(e, t, n, r) {}, e.prototype.dispose = function(e, t) {}, e.prototype.updateView = function(e, t, n, r) {}, e.prototype.updateLayout = function(e, t, n, r) {}, e.prototype.updateVisual = function(e, t, n, r) {}, e.prototype.toggleBlurSeries = function(e, t, n) {}, e.prototype.eachRendered = function(e) {
		var t = this.group;
		t && t.traverse(e);
	}, e;
}();
vs(Xv), Ts(Xv);
//#endregion
//#region node_modules/echarts/lib/chart/helper/createRenderPlanner.js
function Zv() {
	var e = X();
	return function(t) {
		var n = e(t), r = t.pipelineContext, i = !!n.large, a = !!n.progressiveRender, o = n.large = !!(r && r.large), s = n.progressiveRender = !!(r && r.progressiveRender);
		return (i !== o || a !== s) && "reset";
	};
}
//#endregion
//#region node_modules/echarts/lib/view/Chart.js
var Qv = X(), $v = Zv(), ey = function() {
	function e() {
		this.group = new va(), this.uid = fm("viewChart"), this.renderTask = R_({
			plan: ry,
			reset: iy
		}), this.renderTask.context = { view: this };
	}
	return e.prototype.init = function(e, t) {}, e.prototype.render = function(e, t, n, r) {}, e.prototype.highlight = function(e, t, n, r) {
		var i = e.getData(r && r.dataType);
		i && ny(i, r, "emphasis");
	}, e.prototype.downplay = function(e, t, n, r) {
		var i = e.getData(r && r.dataType);
		i && ny(i, r, "normal");
	}, e.prototype.remove = function(e, t) {
		this.group.removeAll();
	}, e.prototype.dispose = function(e, t) {}, e.prototype.updateView = function(e, t, n, r) {
		this.render(e, t, n, r);
	}, e.prototype.updateVisual = function(e, t, n, r) {
		this.render(e, t, n, r);
	}, e.prototype.eachRendered = function(e) {
		Tp(this.group, e);
	}, e.markUpdateMethod = function(e, t) {
		Qv(e).updateMethod = t;
	}, e.protoInitialize = function() {
		var t = e.prototype;
		t.type = "chart";
	}(), e;
}();
function ty(e, t, n) {
	e && sd(e) && (t === "emphasis" ? Iu : Lu)(e, n);
}
function ny(e, t, n) {
	var r = zo(e, t), i = t && t.highlightKey != null ? cd(t.highlightKey) : null;
	r == null ? e.eachItemGraphicEl(function(e) {
		ty(e, n, i);
	}) : L(bo(r), function(t) {
		ty(e.getItemGraphicEl(t), n, i);
	});
}
vs(ey, ["dispose"]), Ts(ey);
function ry(e) {
	return $v(e.model);
}
function iy(e) {
	var t = e.model, n = e.ecModel, r = e.api, i = e.payload, a = t.pipelineContext.progressiveRender, o = e.view, s = i && Qv(i).updateMethod, c = a ? "incrementalPrepareRender" : s && o[s] ? s : "render";
	return c !== "render" && o[c](t, n, r, i), ay[c];
}
var ay = {
	incrementalPrepareRender: { progress: function(e, t) {
		t.view.incrementalRender(e, t.model, t.ecModel, t.api, t.payload);
	} },
	render: {
		forceFirstProgress: !0,
		progress: function(e, t) {
			t.view.render(t.model, t.ecModel, t.api, t.payload);
		}
	}
}, oy = "\0__throttleOriginMethod", sy = "\0__throttleRate", cy = "\0__throttleType";
function ly(e, t, n) {
	var r, i = 0, a = 0, o = null, s, c, l, u;
	t ||= 0;
	function d() {
		a = (/* @__PURE__ */ new Date()).getTime(), o = null, e.apply(c, l || []);
	}
	var f = function() {
		var e = [...arguments];
		r = (/* @__PURE__ */ new Date()).getTime(), c = this, l = e;
		var f = u || t, p = u || n;
		u = null, s = r - (p ? i : a) - f, clearTimeout(o), p ? o = setTimeout(d, f) : s >= 0 ? d() : o = setTimeout(d, -s), i = r;
	};
	return f.clear = function() {
		o &&= (clearTimeout(o), null);
	}, f.debounceNextCall = function(e) {
		u = e;
	}, f;
}
function uy(e, t, n, r) {
	var i = e[t];
	if (i) {
		var a = i[oy] || i, o = i[cy];
		if (i[sy] !== n || o !== r) {
			if (n == null || !r) return e[t] = a;
			i = e[t] = ly(a, n, r === "debounce"), i[oy] = a, i[cy] = r, i[sy] = n;
		}
		return i;
	}
}
function dy(e, t) {
	var n = e[t];
	n && n[oy] && (n.clear && n.clear(), e[t] = n[oy]);
}
//#endregion
//#region node_modules/echarts/lib/visual/style.js
var fy = X(), py = {
	itemStyle: Es(sm, !0),
	lineStyle: Es(im, !0)
}, my = {
	lineStyle: "stroke",
	itemStyle: "fill"
};
function hy(e, t) {
	return e.visualStyleMapper || py[t] || (console.warn("Unknown style type '" + t + "'."), py.itemStyle);
}
function gy(e, t) {
	return e.visualDrawType || my[t] || (console.warn("Unknown style type '" + t + "'."), "fill");
}
var _y = {
	createOnAllSeries: !0,
	performRawSeries: !0,
	reset: function(e, t) {
		var n = e.getData(), r = e.visualStyleAccessPath || "itemStyle", i = e.getModel(r), a = hy(e, r)(i), o = i.getShallow("decal");
		o && (n.setVisual("decal", o), o.dirty = !0);
		var s = gy(e, r), c = a[s], l = U(c) ? c : null, u = a.fill === "auto" || a.stroke === "auto";
		if (!a[s] || l || u) {
			var d = e.getColorFromPalette(e.name, null, t.getSeriesCount());
			a[s] || (a[s] = d, n.setVisual("colorFromPalette", !0)), a.fill = a.fill === "auto" || U(a.fill) ? d : a.fill, a.stroke = a.stroke === "auto" || U(a.stroke) ? d : a.stroke;
		}
		if (n.setVisual("style", a), n.setVisual("drawType", s), !t.isSeriesFiltered(e) && l) return n.setVisual("colorFromPalette", !1), { dataEach: function(t, n) {
			var r = e.getDataParams(n), i = M({}, a);
			i[s] = l(r), t.setItemVisual(n, "style", i);
		} };
	}
}, vy = new um(), yy = {
	createOnAllSeries: !0,
	reset: function(e, t) {
		if (!e.ignoreStyleOnData) {
			var n = e.getData(), r = e.visualStyleAccessPath || "itemStyle", i = hy(e, r), a = n.getVisual("drawType");
			return { dataEach: n.hasItemOption ? function(e, t) {
				var n = e.getRawDataItem(t);
				if (n && n[r]) {
					vy.option = n[r];
					var o = i(vy);
					M(e.ensureUniqueItemVisual(t, "style"), o), vy.option.decal && (e.setItemVisual(t, "decal", vy.option.decal), vy.option.decal.dirty = !0), a in o && e.setItemVisual(t, "colorFromPalette", !1);
				}
			} : null };
		}
	}
}, by = {
	performRawSeries: !0,
	overallReset: function(e) {
		var t = q();
		e.eachSeries(function(e) {
			if (!e.isColorBySeries()) {
				var n = e.type + "-" + e.getColorBy();
				fy(e).scope = t.get(n) || t.set(n, {});
			}
		}), e.eachSeries(function(e) {
			if (!e.isColorBySeries()) {
				var t = e.getRawData(), n = {}, r = e.getData(), i = fy(e).scope, a = gy(e, e.visualStyleAccessPath || "itemStyle");
				r.each(function(e) {
					var t = r.getRawIndex(e);
					n[t] = e;
				}), t.each(function(o) {
					var s = n[o];
					if (r.getItemVisual(s, "colorFromPalette")) {
						var c = r.ensureUniqueItemVisual(s, "style"), l = t.getName(o) || o + "", u = t.count();
						c[a] = e.getColorFromPalette(l, i, u);
					}
				});
			}
		});
	}
}, xy = Math.PI;
function Sy(e, t) {
	t ||= {}, N(t, {
		text: "loading",
		textColor: Q.color.primary,
		fontSize: 12,
		fontWeight: "normal",
		fontStyle: "normal",
		fontFamily: "sans-serif",
		maskColor: "rgba(255,255,255,0.8)",
		showSpinner: !0,
		color: Q.color.theme[0],
		spinnerRadius: 10,
		lineWidth: 5,
		zlevel: 0
	});
	var n = new va(), r = new Dl({
		style: { fill: t.maskColor },
		zlevel: t.zlevel,
		z: 1e4
	});
	n.add(r);
	var i = new Ml({
		style: {
			text: t.text,
			fill: t.textColor,
			fontSize: t.fontSize,
			fontWeight: t.fontWeight,
			fontStyle: t.fontStyle,
			fontFamily: t.fontFamily
		},
		zlevel: t.zlevel,
		z: 10001
	}), a = new Dl({
		style: { fill: "none" },
		textContent: i,
		textConfig: {
			position: "right",
			distance: 10
		},
		zlevel: t.zlevel,
		z: 10001
	});
	n.add(a);
	var o;
	return t.showSpinner && (o = new vf({
		shape: {
			startAngle: -xy / 2,
			endAngle: -xy / 2 + .1,
			r: t.spinnerRadius
		},
		style: {
			stroke: t.color,
			lineCap: "round",
			lineWidth: t.lineWidth
		},
		zlevel: t.zlevel,
		z: 10001
	}), o.animateShape(!0).when(1e3, { endAngle: xy * 3 / 2 }).start("circularInOut"), o.animateShape(!0).when(1e3, { startAngle: xy * 3 / 2 }).delay(300).start("circularInOut"), n.add(o)), n.resize = function() {
		var n = i.getBoundingRect().width, s = t.showSpinner ? t.spinnerRadius : 0, c = (e.getWidth() - s * 2 - (t.showSpinner && n ? 10 : 0) - n) / 2 - (t.showSpinner && n ? 0 : 5 + n / 2) + (t.showSpinner ? 0 : n / 2) + (n ? 0 : s), l = e.getHeight() / 2;
		t.showSpinner && o.setShape({
			cx: c,
			cy: l
		}), a.setShape({
			x: c - s,
			y: l - s,
			width: s * 2,
			height: s * 2
		}), r.setShape({
			x: 0,
			y: 0,
			width: e.getWidth(),
			height: e.getHeight()
		});
	}, n.resize(), n;
}
//#endregion
//#region node_modules/echarts/lib/core/Scheduler.js
var Cy = function() {
	function e(e, t, n, r) {
		this._stageTaskMap = q(), this.ecInstance = e, this.api = t, n = this._dataProcessorHandlers = n.slice(), r = this._visualHandlers = r.slice(), this._allHandlers = n.concat(r);
	}
	return e.prototype.restoreData = function(e, t) {
		e.restoreData(t), this._stageTaskMap.each(function(e) {
			var t = e.overallTask;
			t && t.dirty();
		});
	}, e.prototype.getPerformArgs = function(e, t) {
		if (e.__pipeline) {
			var n = this._pipelineMap.get(e.__pipeline.id), r = n.context, i = !t && n.progressiveEnabled && (!r || r.progressiveRender) && e.__idxInPipeline > n.blockIndex ? n.step : null, a = r && r.modDataCount;
			return {
				step: i,
				modBy: a == null ? null : Math.ceil(a / i),
				modDataCount: a
			};
		}
	}, e.prototype.getPipeline = function(e) {
		return this._pipelineMap.get(e);
	}, e.prototype.updateStreamModes = function(e, t) {
		var n = this._pipelineMap.get(e.uid);
		e.pipelineContext = n.context = e.__preparePipelineContext ? e.__preparePipelineContext(t, n) : us(e, t, n);
	}, e.prototype.restorePipelines = function(e, t) {
		var n = this, r = n._pipelineMap = q();
		t.eachSeries(function(t) {
			var i = e.painter.type === "canvas" && t.getProgressive(), a = t.uid;
			r.set(a, {
				id: a,
				head: null,
				tail: null,
				threshold: t.getProgressiveThreshold(),
				progressiveEnabled: i && !(t.preventIncremental && t.preventIncremental()),
				blockIndex: -1,
				step: Math.round(i || 700),
				count: 0
			}), n._pipe(t, t.dataTask);
		});
	}, e.prototype.prepareStageTasks = function() {
		var e = this._stageTaskMap, t = this.api.getModel(), n = this.api;
		L(this._allHandlers, function(r) {
			var i = e.get(r.uid) || e.set(r.uid, {});
			ve(!(r.reset && r.overallReset), ""), r.reset && this._createSeriesStageTask(r, i, t, n), r.overallReset && this._createOverallStageTask(r, i, t, n);
		}, this);
	}, e.prototype.prepareView = function(e, t, n, r) {
		var i = e.renderTask, a = i.context;
		a.model = t, a.ecModel = n, a.api = r, i.__block = !e.incrementalPrepareRender, this._pipe(t, i);
	}, e.prototype.performDataProcessorTasks = function(e, t) {
		this._performStageTasks(this._dataProcessorHandlers, e, t, { block: !0 });
	}, e.prototype.performVisualTasks = function(e, t, n) {
		this._performStageTasks(this._visualHandlers, e, t, n);
	}, e.prototype._performStageTasks = function(e, t, n, r) {
		r ||= {};
		var i = !1, a = this;
		L(e, function(e, s) {
			if (!(r.visualType && r.visualType !== e.visualType)) {
				var c = a._stageTaskMap.get(e.uid), l = c.seriesTaskMap, u = c.overallTask;
				if (u) {
					var d, f = u.agentStubMap;
					f.each(function(e) {
						o(r, e) && (e.dirty(), d = !0);
					}), d && u.dirty(), a.updatePayload(u, n);
					var p = a.getPerformArgs(u, r.block);
					f.each(function(e) {
						e.perform(p);
					}), u.perform(p) && (i = !0);
				} else l && l.each(function(s, c) {
					o(r, s) && s.dirty();
					var l = a.getPerformArgs(s, r.block);
					l.skip = !e.performRawSeries && t.isSeriesFiltered(s.context.model), a.updatePayload(s, n), s.perform(l) && (i = !0);
				});
			}
		});
		function o(e, t) {
			return e.setDirty && (!e.dirtyMap || e.dirtyMap.get(t.__pipeline.id));
		}
		this.unfinished = i || this.unfinished;
	}, e.prototype.performSeriesTasks = function(e) {
		var t;
		e.eachSeries(function(e) {
			t = e.dataTask.perform() || t;
		}), this.unfinished = t || this.unfinished;
	}, e.prototype.plan = function() {
		this._pipelineMap.each(function(e) {
			var t = e.tail;
			do {
				if (t.__block) {
					e.blockIndex = t.__idxInPipeline;
					break;
				}
				t = t.getUpstream();
			} while (t);
		});
	}, e.prototype.updatePayload = function(e, t) {
		t !== "remain" && (e.context.payload = t);
	}, e.prototype._createSeriesStageTask = function(e, t, n, r) {
		var i = this, a = t.seriesTaskMap, o = t.seriesTaskMap = q(), s = e.seriesType, c = e.getTargetSeries;
		e.createOnAllSeries ? n.eachRawSeries(l) : s ? n.eachRawSeriesByType(s, l) : c && c(n, r).each(l);
		function l(t) {
			var s = t.uid, c = o.set(s, a && a.get(s) || R_({
				plan: Oy,
				reset: ky,
				count: My
			}));
			c.context = {
				model: t,
				ecModel: n,
				api: r,
				useClearVisual: e.isVisual && !e.isLayout,
				plan: e.plan,
				reset: e.reset,
				scheduler: i
			}, i._pipe(t, c);
		}
	}, e.prototype._createOverallStageTask = function(e, t, n, r) {
		var i = this, a = t.overallTask = t.overallTask || R_({ reset: wy });
		a.context = {
			ecModel: n,
			api: r,
			overallReset: e.overallReset,
			scheduler: i
		};
		var o = a.agentStubMap, s = a.agentStubMap = q(), c = e.seriesType, l = e.getTargetSeries, u = e.dirtyOnOverallProgress, d = !1;
		ve(!e.createOnAllSeries, ""), c ? n.eachRawSeriesByType(c, f) : l ? l(n, r).each(f) : L(n.getSeries(), f);
		function f(e) {
			var t = e.uid, n = s.set(t, o && o.get(t) || (d = !0, R_({
				reset: Ty,
				onDirty: Dy
			})));
			n.context = {
				model: e,
				dirtyOnOverallProgress: u
			}, n.agent = a, n.__block = u, i._pipe(e, n);
		}
		d && a.dirty();
	}, e.prototype._pipe = function(e, t) {
		var n = e.uid, r = this._pipelineMap.get(n);
		!r.head && (r.head = t), r.tail && r.tail.pipe(t), r.tail = t, t.__idxInPipeline = r.count++, t.__pipeline = r;
	}, e.wrapStageHandler = function(e, t) {
		return U(e) && (e = {
			overallReset: e,
			seriesType: Ny(e)
		}), e.uid = fm("stageHandler"), t && (e.visualType = t), e;
	}, e;
}();
function wy(e) {
	e.overallReset(e.ecModel, e.api, e.payload);
}
function Ty(e) {
	return e.dirtyOnOverallProgress && Ey;
}
function Ey() {
	this.agent.dirty(), this.getDownstream().dirty();
}
function Dy() {
	this.agent && this.agent.dirty();
}
function Oy(e) {
	return e.plan ? e.plan(e.model, e.ecModel, e.api, e.payload) : null;
}
function ky(e) {
	e.useClearVisual && e.data.clearAllVisual();
	var t = e.resetDefines = bo(e.reset(e.model, e.ecModel, e.api, e.payload));
	return t.length > 1 ? R(t, function(e, t) {
		return jy(t);
	}) : Ay;
}
var Ay = jy(0);
function jy(e) {
	return function(t, n) {
		var r = n.data, i = n.resetDefines[e];
		if (i && i.dataEach) for (var a = t.start; a < t.end; a++) i.dataEach(r, a);
		else i && i.progress && i.progress(t, r);
	};
}
function My(e) {
	return e.data.count();
}
function Ny(e) {
	Iy = null;
	try {
		e(Py, Fy);
	} catch {}
	return Iy;
}
var Py = {}, Fy = {}, Iy;
Ly(Py, bg), Ly(Fy, ru), Py.eachSeriesByType = Py.eachRawSeriesByType = function(e) {
	Iy = e;
}, Py.eachComponent = function(e) {
	e.mainType === "series" && e.subType && (Iy = e.subType);
};
function Ly(e, t) {
	for (var n in t.prototype) e[n] = je;
}
//#endregion
//#region node_modules/echarts/lib/theme/dark.js
var $ = Q.darkColor, Ry = $.background, zy = function() {
	return {
		axisLine: { lineStyle: { color: $.axisLine } },
		splitLine: { lineStyle: { color: $.axisSplitLine } },
		splitArea: { areaStyle: { color: [$.backgroundTint, $.backgroundTransparent] } },
		minorSplitLine: { lineStyle: { color: $.axisMinorSplitLine } },
		axisLabel: { color: $.axisLabel },
		axisName: {}
	};
}, By = {
	label: { color: $.secondary },
	itemStyle: { borderColor: $.borderTint },
	dividerLineStyle: { color: $.border }
}, Vy = {
	darkMode: !0,
	color: $.theme,
	backgroundColor: Ry,
	axisPointer: {
		lineStyle: { color: $.border },
		crossStyle: { color: $.borderShade },
		label: { color: $.tertiary }
	},
	legend: {
		textStyle: { color: $.secondary },
		pageTextStyle: { color: $.tertiary }
	},
	textStyle: { color: $.secondary },
	title: {
		textStyle: { color: $.primary },
		subtextStyle: { color: $.quaternary }
	},
	toolbox: {
		iconStyle: { borderColor: $.accent50 },
		feature: { dataView: {
			backgroundColor: Ry,
			textColor: $.primary,
			textareaColor: $.background,
			textareaBorderColor: $.border,
			buttonColor: $.accent50,
			buttonTextColor: $.neutral00
		} }
	},
	tooltip: {
		backgroundColor: $.neutral20,
		defaultBorderColor: $.border,
		textStyle: { color: $.tertiary }
	},
	dataZoom: {
		borderColor: $.accent10,
		textStyle: { color: $.tertiary },
		brushStyle: { color: $.backgroundTint },
		handleStyle: {
			color: $.neutral00,
			borderColor: $.accent20
		},
		moveHandleStyle: { color: $.accent40 },
		emphasis: { handleStyle: { borderColor: $.accent50 } },
		dataBackground: {
			lineStyle: { color: $.accent30 },
			areaStyle: { color: $.accent20 }
		},
		selectedDataBackground: {
			lineStyle: { color: $.accent50 },
			areaStyle: { color: $.accent30 }
		}
	},
	visualMap: {
		textStyle: { color: $.secondary },
		handleStyle: { borderColor: $.neutral30 }
	},
	timeline: {
		lineStyle: { color: $.accent10 },
		label: { color: $.tertiary },
		controlStyle: {
			color: $.accent30,
			borderColor: $.accent30
		}
	},
	calendar: {
		itemStyle: {
			color: $.neutral00,
			borderColor: $.neutral20
		},
		dayLabel: { color: $.tertiary },
		monthLabel: { color: $.secondary },
		yearLabel: { color: $.secondary }
	},
	matrix: {
		x: By,
		y: By,
		backgroundColor: { borderColor: $.axisLine },
		body: { itemStyle: { borderColor: $.borderTint } }
	},
	timeAxis: zy(),
	logAxis: zy(),
	valueAxis: zy(),
	categoryAxis: zy(),
	line: { symbol: "circle" },
	graph: { color: $.theme },
	gauge: {
		title: { color: $.secondary },
		axisLine: { lineStyle: { color: [[1, $.neutral05]] } },
		axisLabel: { color: $.axisLabel },
		detail: { color: $.primary }
	},
	candlestick: { itemStyle: {
		color: "#f64e56",
		color0: "#54ea92",
		borderColor: "#f64e56",
		borderColor0: "#54ea92"
	} },
	funnel: { itemStyle: { borderColor: $.background } },
	radar: function() {
		var e = zy();
		return e.axisName = { color: $.axisLabel }, e.axisLine.lineStyle.color = $.neutral20, e;
	}(),
	treemap: { breadcrumb: {
		itemStyle: {
			color: $.neutral20,
			textStyle: { color: $.secondary }
		},
		emphasis: { itemStyle: { color: $.neutral30 } }
	} },
	sunburst: { itemStyle: { borderColor: $.background } },
	map: {
		itemStyle: {
			borderColor: $.border,
			areaColor: $.neutral10
		},
		label: { color: $.tertiary },
		emphasis: {
			label: { color: $.primary },
			itemStyle: { areaColor: $.highlight }
		},
		select: {
			label: { color: $.primary },
			itemStyle: { areaColor: $.highlight }
		}
	},
	geo: {
		itemStyle: {
			borderColor: $.border,
			areaColor: $.neutral10
		},
		emphasis: {
			label: { color: $.primary },
			itemStyle: { areaColor: $.highlight }
		},
		select: {
			label: { color: $.primary },
			itemStyle: { color: $.highlight }
		}
	}
};
Vy.categoryAxis.splitLine.show = !1;
//#endregion
//#region node_modules/echarts/lib/util/ECEventProcessor.js
var Hy = function() {
	function e() {}
	return e.prototype.normalizeQuery = function(e) {
		var t = {}, n = {}, r = {};
		if (W(e)) {
			var i = hs(e);
			t.mainType = i.main || null, t.subType = i.sub || null;
		} else {
			var a = [
				"Index",
				"Name",
				"Id"
			], o = {
				name: 1,
				dataIndex: 1,
				dataType: 1
			};
			L(e, function(e, i) {
				for (var s = !1, c = 0; c < a.length; c++) {
					var l = a[c], u = i.lastIndexOf(l);
					if (u > 0 && u === i.length - l.length) {
						var d = i.slice(0, u);
						d !== "data" && (t.mainType = d, t[l.toLowerCase()] = e, s = !0);
					}
				}
				o.hasOwnProperty(i) && (n[i] = e, s = !0), s || (r[i] = e);
			});
		}
		return {
			cptQuery: t,
			dataQuery: n,
			otherQuery: r
		};
	}, e.prototype.filter = function(e, t) {
		var n = this.eventInfo;
		if (!n) return !0;
		var r = n.targetEl, i = n.packedEvent, a = n.model, o = n.view;
		if (!a || !o) return !0;
		var s = t.cptQuery, c = t.dataQuery;
		return l(s, a, "mainType") && l(s, a, "subType") && l(s, a, "index", "componentIndex") && l(s, a, "name") && l(s, a, "id") && l(c, i, "name") && l(c, i, "dataIndex") && l(c, i, "dataType") && (!o.filterForExposedEvent || o.filterForExposedEvent(e, t.otherQuery, r, i));
		function l(e, t, n, r) {
			return e[n] == null || t[r || n] === e[n];
		}
	}, e.prototype.afterTrigger = function() {
		this.eventInfo = null;
	}, e;
}(), Uy = [
	"symbol",
	"symbolSize",
	"symbolRotate",
	"symbolOffset"
], Wy = Uy.concat(["symbolKeepAspect"]), Gy = {
	createOnAllSeries: !0,
	performRawSeries: !0,
	reset: function(e, t) {
		var n = e.getData();
		if (e.legendIcon && n.setVisual("legendIcon", e.legendIcon), !e.hasSymbolVisual) return;
		for (var r = {}, i = {}, a = !1, o = 0; o < Uy.length; o++) {
			var s = Uy[o], c = e.get(s);
			U(c) ? (a = !0, i[s] = c) : r[s] = c;
		}
		if (r.symbol = r.symbol || e.defaultSymbol, n.setVisual(M({
			legendIcon: e.legendIcon || r.symbol,
			symbolKeepAspect: e.get("symbolKeepAspect")
		}, r)), t.isSeriesFiltered(e)) return;
		var l = z(i);
		function u(t, n) {
			for (var r = e.getRawValue(n), a = e.getDataParams(n), o = 0; o < l.length; o++) {
				var s = l[o];
				t.setItemVisual(n, s, i[s](r, a));
			}
		}
		return { dataEach: a ? u : null };
	}
}, Ky = {
	createOnAllSeries: !0,
	performRawSeries: !0,
	reset: function(e, t) {
		if (!e.hasSymbolVisual || t.isSeriesFiltered(e)) return;
		var n = e.getData();
		function r(e, t) {
			for (var n = e.getItemModel(t), r = 0; r < Wy.length; r++) {
				var i = Wy[r], a = n.getShallow(i, !0);
				a != null && e.setItemVisual(t, i, a);
			}
		}
		return { dataEach: n.hasItemOption ? r : null };
	}
};
//#endregion
//#region node_modules/echarts/lib/visual/helper.js
function qy(e, t, n) {
	switch (n) {
		case "color": return e.getItemVisual(t, "style")[e.getVisual("drawType")];
		case "opacity": return e.getItemVisual(t, "style").opacity;
		case "symbol":
		case "symbolSize":
		case "liftZ": return e.getItemVisual(t, n);
	}
}
function Jy(e, t) {
	switch (t) {
		case "color": return e.getVisual("style")[e.getVisual("drawType")];
		case "opacity": return e.getVisual("style").opacity;
		case "symbol":
		case "symbolSize":
		case "liftZ": return e.getVisual(t);
	}
}
//#endregion
//#region node_modules/echarts/lib/legacy/dataSelectAction.js
function Yy(e, t, n, r, i) {
	var a = e + t;
	n.isSilent(a) || r.eachComponent({
		mainType: "series",
		subType: "pie"
	}, function(e) {
		for (var t = e.seriesIndex, r = e.option.selectedMap, o = i.selected, s = 0; s < o.length; s++) if (o[s].seriesIndex === t) {
			var c = e.getData(), l = zo(c, i.fromActionPayload);
			n.trigger(a, {
				type: a,
				seriesId: e.id,
				name: H(l) ? c.getName(l[0]) : c.getName(l),
				selected: W(r) ? r : M({}, r)
			});
		}
	});
}
function Xy(e, t, n) {
	e.on("selectchanged", function(e) {
		var r = n.getModel();
		e.isFromClick ? (Yy("map", "selectchanged", t, r, e), Yy("pie", "selectchanged", t, r, e)) : e.fromAction === "select" ? (Yy("map", "selected", t, r, e), Yy("pie", "selected", t, r, e)) : e.fromAction === "unselect" && (Yy("map", "unselected", t, r, e), Yy("pie", "unselected", t, r, e));
	});
}
//#endregion
//#region node_modules/echarts/lib/util/event.js
function Zy(e, t, n) {
	for (var r; e && !(t(e) && (r = e, n));) e = e.__hostTarget || e.parent;
	return r;
}
//#endregion
//#region node_modules/echarts/lib/core/lifecycle.js
var Qy = new Ze(), $y = {};
function eb(e, t) {
	$y[e] = t;
}
function tb(e) {
	return $y[e];
}
//#endregion
//#region node_modules/echarts/lib/chart/custom/customSeriesRegister.js
var nb = {};
function rb(e, t) {
	nb[e] = t;
}
//#endregion
//#region node_modules/echarts/lib/util/cycleCache.js
var ib = X();
function ab(e) {
	ib(e).prepare = {};
}
function ob(e) {
	ib(e).fullUpdate = {};
}
function sb(e) {
	return ib(e).fullUpdate;
}
//#endregion
//#region node_modules/zrender/lib/core/WeakMap.js
var cb = Math.round(Math.random() * 9), lb = typeof Object.defineProperty == "function", ub = function() {
	function e() {
		this._id = "__ec_inner_" + cb++;
	}
	return e.prototype.get = function(e) {
		return this._guard(e)[this._id];
	}, e.prototype.set = function(e, t) {
		var n = this._guard(e);
		return lb ? Object.defineProperty(n, this._id, {
			value: t,
			enumerable: !1,
			configurable: !0
		}) : n[this._id] = t, this;
	}, e.prototype.delete = function(e) {
		return this.has(e) ? (delete this._guard(e)[this._id], !0) : !1;
	}, e.prototype.has = function(e) {
		return !!this._guard(e)[this._id];
	}, e.prototype._guard = function(e) {
		if (e !== Object(e)) throw TypeError("Value of WeakMap is not a non-null object.");
		return e;
	}, e;
}(), db = pl.extend({
	type: "triangle",
	shape: {
		cx: 0,
		cy: 0,
		width: 0,
		height: 0
	},
	buildPath: function(e, t) {
		var n = t.cx, r = t.cy, i = t.width / 2, a = t.height / 2;
		e.moveTo(n, r - a), e.lineTo(n + i, r + a), e.lineTo(n - i, r + a), e.closePath();
	}
}), fb = {
	line: ff,
	rect: Dl,
	roundRect: Dl,
	square: Dl,
	circle: Fd,
	diamond: pl.extend({
		type: "diamond",
		shape: {
			cx: 0,
			cy: 0,
			width: 0,
			height: 0
		},
		buildPath: function(e, t) {
			var n = t.cx, r = t.cy, i = t.width / 2, a = t.height / 2;
			e.moveTo(n, r - a), e.lineTo(n + i, r), e.lineTo(n, r + a), e.lineTo(n - i, r), e.closePath();
		}
	}),
	pin: pl.extend({
		type: "pin",
		shape: {
			x: 0,
			y: 0,
			width: 0,
			height: 0
		},
		buildPath: function(e, t) {
			var n = t.x, r = t.y, i = t.width / 5 * 3, a = Math.max(i, t.height), o = i / 2, s = o * o / (a - o), c = r - a + o + s, l = Math.asin(s / o), u = Math.cos(l) * o, d = Math.sin(l), f = Math.cos(l), p = o * .6, m = o * .7;
			e.moveTo(n - u, c + s), e.arc(n, c, o, Math.PI - l, Math.PI * 2 + l), e.bezierCurveTo(n + u - d * p, c + s + f * p, n, r - m, n, r), e.bezierCurveTo(n, r - m, n - u + d * p, c + s + f * p, n - u, c + s), e.closePath();
		}
	}),
	arrow: pl.extend({
		type: "arrow",
		shape: {
			x: 0,
			y: 0,
			width: 0,
			height: 0
		},
		buildPath: function(e, t) {
			var n = t.height, r = t.width, i = t.x, a = t.y, o = r / 3 * 2;
			e.moveTo(i, a), e.lineTo(i + o, a + n), e.lineTo(i, a + n / 4 * 3), e.lineTo(i - o, a + n), e.lineTo(i, a), e.closePath();
		}
	}),
	triangle: db
}, pb = {
	line: function(e, t, n, r, i) {
		i.x1 = e, i.y1 = t + r / 2, i.x2 = e + n, i.y2 = t + r / 2;
	},
	rect: function(e, t, n, r, i) {
		i.x = e, i.y = t, i.width = n, i.height = r;
	},
	roundRect: function(e, t, n, r, i) {
		i.x = e, i.y = t, i.width = n, i.height = r, i.r = Math.min(n, r) / 4;
	},
	square: function(e, t, n, r, i) {
		var a = Math.min(n, r);
		i.x = e, i.y = t, i.width = a, i.height = a;
	},
	circle: function(e, t, n, r, i) {
		i.cx = e + n / 2, i.cy = t + r / 2, i.r = Math.min(n, r) / 2;
	},
	diamond: function(e, t, n, r, i) {
		i.cx = e + n / 2, i.cy = t + r / 2, i.width = n, i.height = r;
	},
	pin: function(e, t, n, r, i) {
		i.x = e + n / 2, i.y = t + r / 2, i.width = n, i.height = r;
	},
	arrow: function(e, t, n, r, i) {
		i.x = e + n / 2, i.y = t + r / 2, i.width = n, i.height = r;
	},
	triangle: function(e, t, n, r, i) {
		i.cx = e + n / 2, i.cy = t + r / 2, i.width = n, i.height = r;
	}
}, mb = {};
L(fb, function(e, t) {
	mb[t] = new e();
});
var hb = pl.extend({
	type: "symbol",
	shape: {
		symbolType: "",
		x: 0,
		y: 0,
		width: 0,
		height: 0
	},
	calculateTextPosition: function(e, t, n) {
		var r = ea(e, t, n), i = this.shape;
		return i && i.symbolType === "pin" && t.position === "inside" && (r.y = n.y + n.height * .4), r;
	},
	buildPath: function(e, t, n) {
		var r = t.symbolType;
		if (r !== "none") {
			var i = mb[r];
			i ||= (r = "rect", mb[r]), pb[r](t.x, t.y, t.width, t.height, i.shape), i.buildPath(e, i.shape, n);
		}
	}
});
function gb(e, t) {
	if (this.type !== "image") {
		var n = this.style;
		this.__isEmptyBrush ? (n.stroke = e, n.fill = t || Q.color.neutral00, n.lineWidth = 2) : this.shape.symbolType === "line" ? n.stroke = e : n.fill = e, this.markRedraw();
	}
}
function _b(e, t, n, r, i, a, o) {
	var s = e.indexOf("empty") === 0;
	s && (e = e.substr(5, 1).toLowerCase() + e.substr(6));
	var c = e.indexOf("image://") === 0 ? ep(e.slice(8), new J(t, n, r, i), o ? "center" : "cover") : e.indexOf("path://") === 0 ? $f(e.slice(7), {}, new J(t, n, r, i), o ? "center" : "cover") : new hb({ shape: {
		symbolType: e,
		x: t,
		y: n,
		width: r,
		height: i
	} });
	return c.__isEmptyBrush = s, c.setColor = gb, a && c.setColor(a), c;
}
function vb(e) {
	return H(e) || (e = [+e, +e]), [e[0] || 0, e[1] || 0];
}
function yb(e, t) {
	if (e != null) return H(e) || (e = [e, e]), [Va(e[0], t[0]) || 0, Va(K(e[1], e[0]), t[1]) || 0];
}
//#endregion
//#region node_modules/zrender/lib/canvas/helper.js
function bb(e) {
	return isFinite(e);
}
function xb(e, t, n) {
	var r = t.x == null ? 0 : t.x, i = t.x2 == null ? 1 : t.x2, a = t.y == null ? 0 : t.y, o = t.y2 == null ? 0 : t.y2;
	return t.global || (r = r * n.width + n.x, i = i * n.width + n.x, a = a * n.height + n.y, o = o * n.height + n.y), r = bb(r) ? r : 0, i = bb(i) ? i : 1, a = bb(a) ? a : 0, o = bb(o) ? o : 0, e.createLinearGradient(r, a, i, o);
}
function Sb(e, t, n) {
	var r = n.width, i = n.height, a = Math.min(r, i), o = t.x == null ? .5 : t.x, s = t.y == null ? .5 : t.y, c = t.r == null ? .5 : t.r;
	return t.global || (o = o * r + n.x, s = s * i + n.y, c *= a), o = bb(o) ? o : .5, s = bb(s) ? s : .5, c = c >= 0 && bb(c) ? c : .5, e.createRadialGradient(o, s, 0, o, s, c);
}
function Cb(e, t, n) {
	for (var r = t.type === "radial" ? Sb(e, t, n) : xb(e, t, n), i = t.colorStops, a = 0; a < i.length; a++) r.addColorStop(i[a].offset, i[a].color);
	return r;
}
function wb(e, t) {
	if (e === t || !e && !t) return !1;
	if (!e || !t || e.length !== t.length) return !0;
	for (var n = 0; n < e.length; n++) if (e[n] !== t[n]) return !0;
	return !1;
}
function Tb(e) {
	return parseInt(e, 10);
}
function Eb(e, t, n) {
	var r = ["width", "height"][t], i = ["clientWidth", "clientHeight"][t], a = ["paddingLeft", "paddingTop"][t], o = ["paddingRight", "paddingBottom"][t];
	if (n[r] != null && n[r] !== "auto") return parseFloat(n[r]);
	var s = document.defaultView.getComputedStyle(e);
	return (e[i] || Tb(s[r]) || Tb(e.style[r])) - (Tb(s[a]) || 0) - (Tb(s[o]) || 0) || 0;
}
//#endregion
//#region node_modules/zrender/lib/canvas/dashStyle.js
function Db(e, t) {
	return !e || e === "solid" || !(t > 0) ? null : e === "dashed" ? [4 * t, 2 * t] : e === "dotted" ? [t] : se(e) ? [e] : H(e) ? e : null;
}
function Ob(e) {
	var t = e.style, n = t.lineDash && t.lineWidth > 0 && Db(t.lineDash, t.lineWidth), r = t.lineDashOffset;
	if (n) {
		var i = t.strokeNoScale && e.getLineScale ? e.getLineScale() : 1;
		i && i !== 1 && (n = R(n, function(e) {
			return e / i;
		}), r /= i);
	}
	return [n, r];
}
//#endregion
//#region node_modules/zrender/lib/canvas/graphic.js
var kb = new Hc(!0);
function Ab(e) {
	var t = e.stroke;
	return !(t == null || t === "none" || !(e.lineWidth > 0));
}
function jb(e) {
	return typeof e == "string" && e !== "none";
}
function Mb(e) {
	var t = e.fill;
	return t != null && t !== "none";
}
function Nb(e, t) {
	if (t.fillOpacity != null && t.fillOpacity !== 1) {
		var n = e.globalAlpha;
		e.globalAlpha = t.fillOpacity * t.opacity, e.fill(), e.globalAlpha = n;
	} else e.fill();
}
function Pb(e, t) {
	if (t.strokeOpacity != null && t.strokeOpacity !== 1) {
		var n = e.globalAlpha;
		e.globalAlpha = t.strokeOpacity * t.opacity, e.stroke(), e.globalAlpha = n;
	} else e.stroke();
}
function Fb(e, t, n) {
	var r = js(t.image, t.__image, n);
	if (Ns(r)) {
		var i = e.createPattern(r, t.repeat || "repeat");
		if (typeof DOMMatrix == "function" && i && i.setTransform) {
			var a = new DOMMatrix();
			a.translateSelf(t.x || 0, t.y || 0), a.rotateSelf(0, 0, (t.rotation || 0) * Me), a.scaleSelf(t.scaleX || 1, t.scaleY || 1), i.setTransform(a);
		}
		return i;
	}
}
function Ib(e, t, n, r, i) {
	var a, o = Ab(n), s = Mb(n), c = n.strokePercent, l = c < 1, u = !t.path;
	(!t.silent || l) && u && t.createPathProxy();
	var d = t.path || kb, f = t.__dirty;
	if (!r) {
		var p = n.fill, m = n.stroke, h = s && !!p.colorStops, g = o && !!m.colorStops, _ = s && !!p.image, v = o && !!m.image, y = void 0, b = void 0, x = void 0, S = void 0, C = void 0;
		(h || g) && (C = t.getBoundingRect()), h && (y = f ? Cb(e, p, C) : t.__canvasFillGradient, t.__canvasFillGradient = y), g && (b = f ? Cb(e, m, C) : t.__canvasStrokeGradient, t.__canvasStrokeGradient = b), _ && (x = f || !t.__canvasFillPattern ? Fb(e, p, t) : t.__canvasFillPattern, t.__canvasFillPattern = x), v && (S = f || !t.__canvasStrokePattern ? Fb(e, m, t) : t.__canvasStrokePattern, t.__canvasStrokePattern = S), h ? e.fillStyle = y : _ && (x ? e.fillStyle = x : s = !1), g ? e.strokeStyle = b : v && (S ? e.strokeStyle = S : o = !1);
	}
	var w = t.getGlobalScale();
	d.setScale(w[0], w[1], t.segmentIgnoreThreshold);
	var T, E;
	e.setLineDash && n.lineDash && (a = Ob(t), T = a[0], E = a[1]);
	var D = !0;
	(u || f & 4) && (d.setDPR(e.dpr), l ? d.setContext(null) : (d.setContext(e), D = !1), d.reset(), t.buildPath(d, t.shape, r), d.toStatic(), t.pathUpdated()), D && d.rebuildPath(e, l ? c : 1), T && (e.setLineDash(T), e.lineDashOffset = E), r ? (i.batchFill = s, i.batchStroke = o) : n.strokeFirst ? (o && Pb(e, n), s && Nb(e, n)) : (s && Nb(e, n), o && Pb(e, n)), T && e.setLineDash([]);
}
function Lb(e, t, n) {
	var r = t.__image = js(n.image, t.__image, t, t.onload);
	if (r && Ns(r)) {
		var i = n.x || 0, a = n.y || 0, o = t.getWidth(), s = t.getHeight(), c = r.width / r.height;
		if (o == null && s != null ? o = s * c : s == null && o != null ? s = o / c : o == null && s == null && (o = r.width, s = r.height), n.sWidth && n.sHeight) {
			var l = n.sx || 0, u = n.sy || 0;
			e.drawImage(r, l, u, n.sWidth, n.sHeight, i, a, o, s);
		} else if (n.sx && n.sy) {
			var l = n.sx, u = n.sy, d = o - l, f = s - u;
			e.drawImage(r, l, u, d, f, i, a, o, s);
		} else e.drawImage(r, i, a, o, s);
	}
}
function Rb(e, t, n) {
	var r, i = n.text;
	if (i != null && (i += ""), i) {
		e.font = n.font || "12px sans-serif", e.textAlign = n.textAlign, e.textBaseline = n.textBaseline;
		var a = void 0, o = void 0;
		e.setLineDash && n.lineDash && (r = Ob(t), a = r[0], o = r[1]), a && (e.setLineDash(a), e.lineDashOffset = o), n.strokeFirst ? (Ab(n) && e.strokeText(i, n.x, n.y), Mb(n) && e.fillText(i, n.x, n.y)) : (Mb(n) && e.fillText(i, n.x, n.y), Ab(n) && e.strokeText(i, n.x, n.y)), a && e.setLineDash([]);
	}
}
var zb = [
	"shadowBlur",
	"shadowOffsetX",
	"shadowOffsetY"
], Bb = [
	["lineCap", "butt"],
	["lineJoin", "miter"],
	["miterLimit", 10]
];
function Vb(e, t, n, r, i) {
	var a = !1;
	if (!r && (n ||= {}, t === n)) return !1;
	if (r || t.opacity !== n.opacity) {
		Qb(e, i), a = !0;
		var o = Math.max(Math.min(t.opacity, 1), 0);
		e.globalAlpha = isNaN(o) ? rc.opacity : o;
	}
	(r || t.blend !== n.blend) && (a ||= (Qb(e, i), !0), e.globalCompositeOperation = t.blend || rc.blend);
	for (var s = 0; s < zb.length; s++) {
		var c = zb[s];
		(r || t[c] !== n[c]) && (a ||= (Qb(e, i), !0), e[c] = e.dpr * (t[c] || 0));
	}
	return (r || t.shadowColor !== n.shadowColor) && (a ||= (Qb(e, i), !0), e.shadowColor = t.shadowColor || rc.shadowColor), a;
}
function Hb(e, t, n, r, i) {
	var a = t.style, o = r ? null : n && n.style || {};
	if (a === o) return !1;
	var s = Vb(e, a, o, r, i);
	if ((r || a.fill !== o.fill) && (s ||= (Qb(e, i), !0), jb(a.fill) && (e.fillStyle = a.fill)), (r || a.stroke !== o.stroke) && (s ||= (Qb(e, i), !0), jb(a.stroke) && (e.strokeStyle = a.stroke)), (r || a.opacity !== o.opacity) && (s ||= (Qb(e, i), !0), e.globalAlpha = a.opacity == null ? 1 : a.opacity), t.hasStroke()) {
		var c = a.lineWidth / (a.strokeNoScale && t.getLineScale ? t.getLineScale() : 1);
		e.lineWidth !== c && (s ||= (Qb(e, i), !0), e.lineWidth = c);
	}
	for (var l = 0; l < Bb.length; l++) {
		var u = Bb[l], d = u[0];
		(r || a[d] !== o[d]) && (s ||= (Qb(e, i), !0), e[d] = a[d] || u[1]);
	}
	return s;
}
function Ub(e, t, n, r, i) {
	return Vb(e, t.style, n && n.style, r, i);
}
function Wb(e, t) {
	var n = t.transform, r = e.dpr || 1;
	n ? e.setTransform(r * n[0], r * n[1], r * n[2], r * n[3], r * n[4], r * n[5]) : e.setTransform(r, 0, 0, r, 0, 0);
}
function Gb(e, t, n) {
	for (var r = !1, i = 0; i < e.length; i++) {
		var a = e[i];
		r ||= a.isZeroArea(), Wb(t, a), t.beginPath(), a.buildPath(t, a.shape), t.clip();
	}
	n.allClipped = r;
}
function Kb(e, t) {
	return e && t ? e[0] !== t[0] || e[1] !== t[1] || e[2] !== t[2] || e[3] !== t[3] || e[4] !== t[4] || e[5] !== t[5] : !(!e && !t);
}
var qb = 1, Jb = 2, Yb = 3, Xb = 4;
function Zb(e) {
	var t = Mb(e), n = Ab(e);
	return !(e.lineDash || !(+t ^ n) || t && typeof e.fill != "string" || n && typeof e.stroke != "string" || e.strokePercent < 1 || e.strokeOpacity < 1 || e.fillOpacity < 1);
}
function Qb(e, t) {
	t.batchFill && (t.batchFill = !1, e.fill()), t.batchStroke && (t.batchStroke = !1, e.stroke());
}
function $b(e, t) {
	var n = {
		inHover: !1,
		viewWidth: 0,
		viewHeight: 0,
		beforeBrushParam: {}
	};
	ex(e, t, n), tx(e, n);
}
function ex(e, t, n) {
	var r = t.transform;
	if (!t.shouldBePainted(n.viewWidth, n.viewHeight, !1, !1)) {
		t.__dirty &= -2, t.__isRendered = !1;
		return;
	}
	var i = t.__clipPaths, a = n.prevElClipPaths, o = t.style, s = !1, c = !1;
	if ((!a || wb(i, a)) && (a && (Qb(e, n), e.restore(), c = s = !0, n.prevElClipPaths = null, n.allClipped = !1, n.prevEl = null), i && i.length && (Qb(e, n), e.save(), Gb(i, e, n), s = !0, n.prevElClipPaths = i)), n.allClipped) {
		t.__dirty &= -2, t.__isRendered = !1;
		return;
	}
	t.beforeBrush && t.beforeBrush(n.beforeBrushParam), t.innerBeforeBrush();
	var l = n.prevEl;
	l || (c = s = !0);
	var u = t instanceof pl && t.autoBatch && Zb(o);
	s || Kb(r, l.transform) ? (Qb(e, n), Wb(e, t)) : u || Qb(e, n), t instanceof pl ? (n.lastDrawType !== qb && (c = !0, n.lastDrawType = qb), Hb(e, t, l, c, n), (!u || !n.batchFill && !n.batchStroke) && e.beginPath(), Ib(e, t, o, u, n)) : t instanceof hl ? (n.lastDrawType !== Yb && (c = !0, n.lastDrawType = Yb), Hb(e, t, l, c, n), Rb(e, t, o)) : t instanceof yl ? (n.lastDrawType !== Jb && (c = !0, n.lastDrawType = Jb), Ub(e, t, l, c, n), Lb(e, t, o)) : t.getTemporalDisplayables && (n.lastDrawType !== Xb && (c = !0, n.lastDrawType = Xb), nx(e, t, n)), t.innerAfterBrush(), t.afterBrush && (u && Qb(e, n), t.afterBrush()), n.prevEl = t, t.__dirty = 0, t.__isRendered = !0;
}
function tx(e, t) {
	Qb(e, t), t.prevElClipPaths && e.restore();
}
function nx(e, t, n) {
	var r = t.getDisplayables(), i = t.getTemporalDisplayables();
	e.save();
	for (var a = {
		prevElClipPaths: null,
		prevEl: null,
		allClipped: !1,
		viewWidth: n.viewWidth,
		viewHeight: n.viewHeight,
		inHover: n.inHover,
		beforeBrushParam: {}
	}, o = t.getCursor(), s = r.length; o < s; o++) {
		var c = r[o];
		c.beforeBrush && c.beforeBrush(n.beforeBrushParam), c.innerBeforeBrush(), ex(e, c, a), c.innerAfterBrush(), c.afterBrush && c.afterBrush(), a.prevEl = c;
	}
	tx(e, a);
	for (var l = 0, u = i.length; l < u; l++) {
		var c = i[l];
		c.beforeBrush && c.beforeBrush(n.beforeBrushParam), c.innerBeforeBrush(), ex(e, c, a), c.innerAfterBrush(), c.afterBrush && c.afterBrush(), a.prevEl = c;
	}
	tx(e, a), t.clearTemporalDisplayables(), t.notClear = !0, e.restore();
}
//#endregion
//#region node_modules/echarts/lib/util/decal.js
var rx = new ub(), ix = new sr(100), ax = [
	"symbol",
	"symbolSize",
	"symbolKeepAspect",
	"color",
	"backgroundColor",
	"dashArrayX",
	"dashArrayY",
	"maxTileWidth",
	"maxTileHeight"
];
function ox(e, t) {
	if (e === "none") return null;
	var n = t.getDevicePixelRatio(), r = t.getZr(), i = r.painter.type === "svg";
	e.dirty && rx.delete(e);
	var a = rx.get(e);
	if (a) return a;
	var o = N(e, {
		symbol: "rect",
		symbolSize: 1,
		symbolKeepAspect: !0,
		color: "rgba(0, 0, 0, 0.2)",
		backgroundColor: null,
		dashArrayX: 5,
		dashArrayY: 5,
		rotation: 0,
		maxTileWidth: 512,
		maxTileHeight: 512
	});
	o.backgroundColor === "none" && (o.backgroundColor = null);
	var s = { repeat: "repeat" };
	return c(s), s.rotation = o.rotation, s.scaleX = s.scaleY = i ? 1 : 1 / n, rx.set(e, s), e.dirty = !1, s;
	function c(e) {
		for (var t = [n], a = !0, s = 0; s < ax.length; ++s) {
			var c = o[ax[s]];
			if (c != null && !H(c) && !W(c) && !se(c) && typeof c != "boolean") {
				a = !1;
				break;
			}
			t.push(c);
		}
		var l;
		if (a) {
			l = t.join(",") + (i ? "-svg" : "");
			var u = ix.get(l);
			u && (i ? e.svgElement = u : e.image = u);
		}
		var d = cx(o.dashArrayX), f = lx(o.dashArrayY), m = sx(o.symbol), h = ux(d), g = dx(f), _ = !i && p.createCanvas(), v = i && {
			tag: "g",
			attrs: {},
			key: "dcl",
			children: []
		}, y = x(), b;
		_ && (_.width = y.width * n, _.height = y.height * n, b = _.getContext("2d")), S(), a && ix.put(l, _ || v), e.image = _, e.svgElement = v, e.svgWidth = y.width, e.svgHeight = y.height;
		function x() {
			for (var e = 1, t = 0, n = h.length; t < n; ++t) e = co(e, h[t]);
			for (var r = 1, t = 0, n = m.length; t < n; ++t) r = co(r, m[t].length);
			e *= r;
			var i = g * h.length * m.length;
			return {
				width: Math.max(1, Math.min(e, o.maxTileWidth)),
				height: Math.max(1, Math.min(i, o.maxTileHeight))
			};
		}
		function S() {
			b && (b.clearRect(0, 0, _.width, _.height), o.backgroundColor && (b.fillStyle = o.backgroundColor, b.fillRect(0, 0, _.width, _.height)));
			for (var e = 0, t = 0; t < f.length; ++t) e += f[t];
			if (e <= 0) return;
			for (var a = -g, s = 0, c = 0, l = 0; a < y.height;) {
				if (s % 2 == 0) {
					for (var u = c / 2 % m.length, p = 0, h = 0, x = 0; p < y.width * 2;) {
						for (var S = 0, t = 0; t < d[l].length; ++t) S += d[l][t];
						if (S <= 0) break;
						if (h % 2 == 0) {
							var C = (1 - o.symbolSize) * .5, w = p + d[l][h] * C, T = a + f[s] * C, E = d[l][h] * o.symbolSize, D = f[s] * o.symbolSize, O = x / 2 % m[u].length;
							k(w, T, E, D, m[u][O]);
						}
						p += d[l][h], ++x, ++h, h === d[l].length && (h = 0);
					}
					++l, l === d.length && (l = 0);
				}
				a += f[s], ++c, ++s, s === f.length && (s = 0);
			}
			function k(e, t, a, s, c) {
				var l = i ? 1 : n, u = _b(c, e * l, t * l, a * l, s * l, o.color, o.symbolKeepAspect);
				if (i) {
					var d = r.painter.renderOneToVNode(u);
					d && v.children.push(d);
				} else $b(b, u);
			}
		}
	}
}
function sx(e) {
	if (!e || e.length === 0) return [["rect"]];
	if (W(e)) return [[e]];
	for (var t = !0, n = 0; n < e.length; ++n) if (!W(e[n])) {
		t = !1;
		break;
	}
	if (t) return sx([e]);
	for (var r = [], n = 0; n < e.length; ++n) W(e[n]) ? r.push([e[n]]) : r.push(e[n]);
	return r;
}
function cx(e) {
	if (!e || e.length === 0) return [[0, 0]];
	if (se(e)) {
		var t = Math.ceil(e);
		return [[t, t]];
	}
	for (var n = !0, r = 0; r < e.length; ++r) if (!se(e[r])) {
		n = !1;
		break;
	}
	if (n) return cx([e]);
	for (var i = [], r = 0; r < e.length; ++r) if (se(e[r])) {
		var t = Math.ceil(e[r]);
		i.push([t, t]);
	} else {
		var t = R(e[r], function(e) {
			return Math.ceil(e);
		});
		t.length % 2 == 1 ? i.push(t.concat(t)) : i.push(t);
	}
	return i;
}
function lx(e) {
	if (!e || typeof e == "object" && e.length === 0) return [0, 0];
	if (se(e)) {
		var t = Math.ceil(e);
		return [t, t];
	}
	var n = R(e, function(e) {
		return Math.ceil(e);
	});
	return e.length % 2 ? n.concat(n) : n;
}
function ux(e) {
	return R(e, function(e) {
		return dx(e);
	});
}
function dx(e) {
	for (var t = 0, n = 0; n < e.length; ++n) t += e[n];
	return e.length % 2 == 1 ? t * 2 : t;
}
//#endregion
//#region node_modules/echarts/lib/visual/decal.js
var fx = ds(px);
function px(e, t) {
	e.eachRawSeries(function(n) {
		if (!e.isSeriesFiltered(n)) {
			var r = n.getData();
			r.hasItemVisual() && r.each(function(e) {
				var n = r.getItemVisual(e, "decal");
				if (n) {
					var i = r.ensureUniqueItemVisual(e, "style");
					i.decal = ox(n, t);
				}
			});
			var i = r.getVisual("decal");
			if (i) {
				var a = r.getVisual("style");
				a.decal = ox(i, t);
			}
		}
	});
}
//#endregion
//#region node_modules/echarts/lib/core/echarts.js
var mx = 1, hx = 800, gx = 900, _x = 920, vx = 1e3, yx = 2e3, bx = 5e3, xx = 1e3, Sx = 1100, Cx = 2e3, Tx = 3e3, Ex = 4e3, Dx = 4500, Ox = 4600, kx = 5e3, Ax = 6e3, jx = 7e3, Mx = {
	PROCESSOR: {
		SERIES_FILTER: hx,
		AXIS_STATISTICS: _x,
		FILTER: vx,
		STATISTIC: bx,
		STATISTICS: bx
	},
	VISUAL: {
		LAYOUT: xx,
		PROGRESSIVE_LAYOUT: Sx,
		GLOBAL: Cx,
		CHART: Tx,
		POST_CHART_LAYOUT: Ox,
		COMPONENT: Ex,
		BRUSH: kx,
		CHART_ITEM: Dx,
		ARIA: Ax,
		DECAL: jx
	}
}, Nx = "__flagInMainProcess", Px = "__mainProcessVersion", Fx = "__pendingUpdate", Ix = "__needsUpdateStatus", Lx = /^[a-zA-Z0-9_]+$/, Rx = "__connectUpdateStatus", zx = 0, Bx = 1, Vx = 2;
function Hx(e) {
	return function() {
		var t = [...arguments];
		if (this.isDisposed()) {
			this.id;
			return;
		}
		return Wx(this, e, t);
	};
}
function Ux(e) {
	return function() {
		var t = [...arguments];
		return Wx(this, e, t);
	};
}
function Wx(e, t, n) {
	return n[0] = n[0] && n[0].toLowerCase(), Ze.prototype[t].apply(e, n);
}
var Gx = function(e) {
	r(t, e);
	function t() {
		return e !== null && e.apply(this, arguments) || this;
	}
	return t;
}(Ze), Kx = Gx.prototype;
Kx.on = Ux("on"), Kx.off = Ux("off");
var qx, Jx, Yx, Xx, Zx, Qx, $x, eS, tS, nS, rS, iS, aS, oS, sS, cS, lS, uS, dS, fS = function(e) {
	r(t, e);
	function t(t, n, r) {
		var i = e.call(this, new Hy()) || this;
		i._chartsViews = [], i._chartsMap = {}, i._componentsViews = [], i._componentsMap = {}, i._pendingActions = [], r ||= {}, i.__v_skip = !0, i._dom = t;
		var a = "canvas", o = "auto", s = !1;
		i[Px] = 1, r.ssr;
		var c = i._zr = wa(t, {
			renderer: r.renderer || a,
			devicePixelRatio: r.devicePixelRatio,
			width: r.width,
			height: r.height,
			ssr: r.ssr,
			useDirtyRect: K(r.useDirtyRect, s),
			useCoarsePointer: K(r.useCoarsePointer, o),
			pointerSize: r.pointerSize
		});
		i._ssr = r.ssr, i._throttledZrFlush = ly(B(c.flush, c), 17), i._updateTheme(n), i._locale = wm(r.locale || Sm), i._coordSysMgr = new Th();
		var l = i._api = sS(i);
		function u(e, t) {
			return e.__prio - t.__prio;
		}
		return wn(bS, u), wn(vS, u), i._scheduler = new Cy(i, l, vS, bS), i._messageCenter = new Gx(), i._initEvents(), i.resize = B(i.resize, i), c.animation.on("frame", i._onframe, i), nS(c, i), rS(c, i), xe(i), i;
	}
	return t.prototype._onframe = function() {
		if (!this._disposed) {
			var e = this._scheduler, t = this._model, n = this._api;
			if (uS(this), this[Fx]) {
				var r = this[Fx].silent;
				this[Nx] = !0, dS(this);
				try {
					qx(this), Xx.update.call(this, null, this[Fx].updateParams);
				} catch (e) {
					throw this[Nx] = !1, this[Fx] = null, e;
				}
				this._zr.flush(), this[Nx] = !1, this[Fx] = null, eS.call(this, r), tS.call(this, r);
			} else if (e.unfinished) {
				var i = mx;
				do {
					e.unfinished = !1;
					var a = p.getTime();
					e.performSeriesTasks(t), e.performDataProcessorTasks(t), Qx(this, t), e.performVisualTasks(t), oS(this, this._model, n, "remain", {}), i -= p.getTime() - a;
				} while (i > 0 && e.unfinished);
				e.unfinished || this._zr.flush();
			}
		}
	}, t.prototype.getDom = function() {
		return this._dom;
	}, t.prototype.getId = function() {
		return this.id;
	}, t.prototype.getZr = function() {
		return this._zr;
	}, t.prototype.isSSR = function() {
		return this._ssr;
	}, t.prototype.setOption = function(e, t, n) {
		if (!this[Nx]) {
			if (this._disposed) {
				this.id;
				return;
			}
			var r, i, a;
			if (G(t) && (n = t.lazyUpdate, r = t.silent, i = t.replaceMerge, a = t.transition, t = t.notMerge), this[Nx] = !0, dS(this), !this._model || t) {
				var o = new Dg(this._api), s = this._theme, c = this._model = new bg();
				c.scheduler = this._scheduler, c.ssr = this._ssr, c.init(null, null, null, s, this._locale, o);
			}
			this._model.setOption(e, { replaceMerge: i }, yS);
			var l = {
				seriesTransition: a,
				optionChanged: !0
			};
			if (n) this[Fx] = {
				silent: r,
				updateParams: l
			}, this[Nx] = !1, this.getZr().wakeUp();
			else {
				try {
					qx(this), Xx.update.call(this, null, l);
				} catch (e) {
					throw this[Fx] = null, this[Nx] = !1, e;
				}
				this._ssr || this._zr.flush(), this[Fx] = null, this[Nx] = !1, eS.call(this, r), tS.call(this, r);
			}
		}
	}, t.prototype.setTheme = function(e, t) {
		if (!this[Nx]) {
			if (this._disposed) {
				this.id;
				return;
			}
			var n = this._model;
			if (n) {
				var r = t && t.silent, i = null;
				this[Fx] && (r ??= this[Fx].silent, i = this[Fx].updateParams, this[Fx] = null), this[Nx] = !0, dS(this);
				try {
					this._updateTheme(e), n.setTheme(this._theme), qx(this), Xx.update.call(this, { type: "setTheme" }, i);
				} catch (e) {
					throw this[Nx] = !1, e;
				}
				this[Nx] = !1, eS.call(this, r), tS.call(this, r);
			}
		}
	}, t.prototype._updateTheme = function(e) {
		W(e) && (e = xS[e]), e && (e = k(e), e && t_(e, !0), this._theme = e);
	}, t.prototype.getModel = function() {
		return this._model;
	}, t.prototype.getOption = function() {
		return this._model && this._model.getOption();
	}, t.prototype.getWidth = function() {
		return this._zr.getWidth();
	}, t.prototype.getHeight = function() {
		return this._zr.getHeight();
	}, t.prototype.getDevicePixelRatio = function() {
		return this._zr.painter.dpr || a.hasGlobalWindow && window.devicePixelRatio || 1;
	}, t.prototype.getRenderedCanvas = function(e) {
		return this.renderToCanvas(e);
	}, t.prototype.renderToCanvas = function(e) {
		return e ||= {}, this._zr.painter.getRenderedCanvas({
			backgroundColor: e.backgroundColor || this._model.get("backgroundColor"),
			pixelRatio: e.pixelRatio || this.getDevicePixelRatio()
		});
	}, t.prototype.renderToSVGString = function(e) {
		return e ||= {}, this._zr.painter.renderToString({ useViewBox: e.useViewBox });
	}, t.prototype.getSvgDataURL = function() {
		var e = this._zr;
		return L(e.storage.getDisplayList(), function(e) {
			e.stopAnimation(null, !0);
		}), e.painter.toDataURL();
	}, t.prototype.getDataURL = function(e) {
		if (this._disposed) {
			this.id;
			return;
		}
		e ||= {};
		var t = e.excludeComponents, n = this._model, r = [], i = this;
		L(t, function(e) {
			n.eachComponent({ mainType: e }, function(e) {
				var t = i._componentsMap[e.__viewId];
				t.group.ignore || (r.push(t), t.group.ignore = !0);
			});
		});
		var a = this._zr.painter.getType() === "svg" ? this.getSvgDataURL() : this.renderToCanvas(e).toDataURL("image/" + (e && e.type || "png"));
		return L(r, function(e) {
			e.group.ignore = !1;
		}), a;
	}, t.prototype.getConnectedDataURL = function(e) {
		if (this._disposed) {
			this.id;
			return;
		}
		var t = e.type === "svg", n = this.group, r = Math.min, i = Math.max, a = Infinity;
		if (wS[n]) {
			var o = a, s = a, c = -a, l = -a, u = [], d = e && e.pixelRatio || this.getDevicePixelRatio();
			L(CS, function(a, d) {
				if (a.group === n) {
					var f = t ? a.getZr().painter.getSvgDom().innerHTML : a.renderToCanvas(k(e)), p = a.getDom().getBoundingClientRect();
					o = r(p.left, o), s = r(p.top, s), c = i(p.right, c), l = i(p.bottom, l), u.push({
						dom: f,
						left: p.left,
						top: p.top
					});
				}
			}), o *= d, s *= d, c *= d, l *= d;
			var f = c - o, m = l - s, h = p.createCanvas(), g = wa(h, { renderer: t ? "svg" : "canvas" });
			if (g.resize({
				width: f,
				height: m
			}), t) {
				var _ = "";
				return L(u, function(e) {
					var t = e.left - o, n = e.top - s;
					_ += "<g transform=\"translate(" + t + "," + n + ")\">" + e.dom + "</g>";
				}), g.painter.getSvgRoot().innerHTML = _, e.connectedBackgroundColor && g.painter.setBackgroundColor(e.connectedBackgroundColor), g.refreshImmediately(), g.painter.toDataURL();
			}
			return e.connectedBackgroundColor && g.add(new Dl({
				shape: {
					x: 0,
					y: 0,
					width: f,
					height: m
				},
				style: { fill: e.connectedBackgroundColor }
			})), L(u, function(e) {
				var t = new yl({ style: {
					x: e.left * d - o,
					y: e.top * d - s,
					image: e.dom
				} });
				g.add(t);
			}), g.refreshImmediately(), h.toDataURL("image/" + (e && e.type || "png"));
		}
		return this.getDataURL(e);
	}, t.prototype.convertToPixel = function(e, t, n) {
		return Zx(this, "convertToPixel", e, t, n);
	}, t.prototype.convertToLayout = function(e, t, n) {
		return Zx(this, "convertToLayout", e, t, n);
	}, t.prototype.convertFromPixel = function(e, t, n) {
		return Zx(this, "convertFromPixel", e, t, n);
	}, t.prototype.containPixel = function(e, t) {
		if (this._disposed) {
			this.id;
			return;
		}
		var n = this._model, r;
		return L(Vo(n, e), function(e, n) {
			n.indexOf("Models") >= 0 && L(e, function(e) {
				var i = e.coordinateSystem;
				if (i && i.containPoint) r ||= !!i.containPoint(t);
				else if (n === "seriesModels") {
					var a = this._chartsMap[e.__viewId];
					a && a.containPoint && (r ||= a.containPoint(t, e));
				}
			}, this);
		}, this), !!r;
	}, t.prototype.getVisual = function(e, t) {
		var n = this._model, r = Vo(n, e, { defaultMainType: "series" }), i = r.seriesModel.getData(), a = r.hasOwnProperty("dataIndexInside") ? r.dataIndexInside : r.hasOwnProperty("dataIndex") ? i.indexOfRawIndex(r.dataIndex) : null;
		return a == null ? Jy(i, t) : qy(i, a, t);
	}, t.prototype.getViewOfComponentModel = function(e) {
		return this._componentsMap[e.__viewId];
	}, t.prototype.getViewOfSeriesModel = function(e) {
		return this._chartsMap[e.__viewId];
	}, t.prototype._initEvents = function() {
		var e = this;
		L(mS, function(t) {
			var n = function(n) {
				var r = e.getModel(), i = n.target, a;
				if (t === "globalout" ? a = {} : i && Zy(i, function(e) {
					var t = Kl(e);
					if (t && t.dataIndex != null) {
						var n = t.dataModel || r.getSeriesByIndex(t.seriesIndex);
						return a = n && n.getDataParams(t.dataIndex, t.dataType, i) || {}, !0;
					}
					if (t.eventData) return a = M({}, t.eventData), !0;
				}, !0), a) {
					var o = a.componentType, s = a.componentIndex;
					(o === "markLine" || o === "markPoint" || o === "markArea") && (o = "series", s = a.seriesIndex);
					var c = o && s != null && r.getComponent(o, s), l = c && e[c.mainType === "series" ? "_chartsMap" : "_componentsMap"][c.__viewId];
					a.event = n, a.type = t, e._$eventProcessor.eventInfo = {
						targetEl: i,
						packedEvent: a,
						model: c,
						view: l
					}, e.trigger(t, a);
				}
			};
			n.zrEventfulCallAtLast = !0, e._zr.on(t, n, e);
		});
		var t = this._messageCenter;
		L(_S, function(n, r) {
			t.on(r, function(t) {
				e.trigger(r, t);
			});
		}), Xy(t, this, this._api);
	}, t.prototype.isDisposed = function() {
		return this._disposed;
	}, t.prototype.clear = function() {
		if (this._disposed) {
			this.id;
			return;
		}
		this.setOption({ series: [] }, !0);
	}, t.prototype.dispose = function() {
		if (this._disposed) {
			this.id;
			return;
		}
		this._disposed = !0, this.getDom() && Ko(this.getDom(), ES, "");
		var e = this, t = e._api, n = e._model;
		L(e._componentsViews, function(e) {
			e.dispose(n, t);
		}), L(e._chartsViews, function(e) {
			e.dispose(n, t);
		}), e._zr.dispose(), e._dom = e._model = e._chartsMap = e._componentsMap = e._chartsViews = e._componentsViews = e._scheduler = e._api = e._zr = e._throttledZrFlush = e._theme = e._coordSysMgr = e._messageCenter = null, delete CS[e.id];
	}, t.prototype.resize = function(e) {
		if (!this[Nx]) {
			if (this._disposed) {
				this.id;
				return;
			}
			this._zr.resize(e);
			var t = this._model;
			if (this._loadingFX && this._loadingFX.resize(), t) {
				var n = t.resetOption("media"), r = e && e.silent;
				this[Fx] && (r ??= this[Fx].silent, n = !0, this[Fx] = null), this[Nx] = !0, dS(this);
				try {
					n && qx(this), Xx.update.call(this, {
						type: "resize",
						animation: M({ duration: 0 }, e && e.animation)
					});
				} catch (e) {
					throw this[Nx] = !1, e;
				}
				this[Nx] = !1, eS.call(this, r), tS.call(this, r);
			}
		}
	}, t.prototype.showLoading = function(e, t) {
		if (this._disposed) {
			this.id;
			return;
		}
		if (G(e) && (t = e, e = ""), e ||= "default", this.hideLoading(), SS[e]) {
			var n = SS[e](this._api, t), r = this._zr;
			this._loadingFX = n, r.add(n);
		}
	}, t.prototype.hideLoading = function() {
		if (this._disposed) {
			this.id;
			return;
		}
		this._loadingFX && this._zr.remove(this._loadingFX), this._loadingFX = null;
	}, t.prototype.makeActionFromEvent = function(e) {
		var t = M({}, e);
		return t.type = gS[e.type], t;
	}, t.prototype.dispatchAction = function(e, t) {
		if (this._disposed) {
			this.id;
			return;
		}
		if (G(t) || (t = { silent: !!t }), hS[e.type] && this._model) {
			if (this[Nx]) {
				this._pendingActions.push(e);
				return;
			}
			var n = t.silent;
			$x.call(this, e, n);
			var r = t.flush;
			r ? this._zr.flush() : r !== !1 && a.browser.weChat && this._throttledZrFlush(), eS.call(this, n), tS.call(this, n);
		}
	}, t.prototype.updateLabelLayout = function() {
		Qy.trigger("series:layoutlabels", this._model, this._api, { updatedSeries: [] });
	}, t.prototype.appendData = function(e) {
		if (this._disposed) {
			this.id;
			return;
		}
		var t = e.seriesIndex;
		this.getModel().getSeriesByIndex(t).appendData(e), this._scheduler.unfinished = !0, this.getZr().wakeUp();
	}, t.internalField = function() {
		qx = function(e) {
			ab(e._model);
			var t = e._scheduler;
			t.restorePipelines(e._zr, e._model), t.prepareStageTasks(), Jx(e, !0), Jx(e, !1), t.plan();
		}, Jx = function(e, t) {
			for (var n = e._model, r = e._scheduler, i = t ? e._componentsViews : e._chartsViews, a = t ? e._componentsMap : e._chartsMap, o = e._zr, s = e._api, c = 0; c < i.length; c++) i[c].__alive = !1;
			t ? n.eachComponent(function(e, t) {
				e !== "series" && l(t);
			}) : n.eachSeries(l);
			function l(e) {
				var c = e.__requireNewView;
				e.__requireNewView = !1;
				var l = "_ec_" + e.id + "_" + e.type, u = !c && a[l];
				if (!u) {
					var d = hs(e.type);
					u = new (t ? Xv.getClass(d.main, d.sub) : ey.getClass(d.sub))(), u.init(n, s), a[l] = u, i.push(u), o.add(u.group);
				}
				e.__viewId = u.__id = l, u.__alive = !0, u.__model = e, u.group.__ecComponentInfo = {
					mainType: e.mainType,
					index: e.componentIndex
				}, !t && r.prepareView(u, e, n, s);
			}
			for (var c = 0; c < i.length;) {
				var u = i[c];
				u.__alive ? c++ : (!t && u.renderTask.dispose(), o.remove(u.group), u.dispose(n, s), i.splice(c, 1), a[u.__id] === u && delete a[u.__id], u.__id = u.group.__ecComponentInfo = null);
			}
		}, Yx = function(e, t, n, r, i) {
			var a = e._model;
			if (a.setUpdatePayload(n), !r) {
				L([].concat(e._componentsViews, e._chartsViews), l);
				return;
			}
			var o = Go(n, r, i), s = n.excludeSeriesId, c;
			s != null && (c = q(), L(bo(s), function(e) {
				var t = Po(e, null);
				t != null && c.set(t, !0);
			})), a && a.eachComponent(o, function(t) {
				if (!(c && c.get(t.id) != null)) {
					if (ud(n)) {
						if (t instanceof Vv) n.type === "highlight" && !n.notBlur && !t.get(["emphasis", "disabled"]) && Ku(t, n, e._api);
						else {
							var r = qu(t.mainType, t.componentIndex, n.name, e._api), i = r.focusSelf, a = r.dispatchers;
							n.type === "highlight" && i && !n.notBlur && Gu(t.mainType, t.componentIndex, e._api), a && L(a, function(e) {
								n.type === "highlight" ? Iu(e) : Lu(e);
							});
						}
					} else ld(n) && t instanceof Vv && (Xu(t, n, e._api), Zu(t), lS(e));
				}
			}, e), a && a.eachComponent(o, function(t) {
				c && c.get(t.id) != null || l(e[r === "series" ? "_chartsMap" : "_componentsMap"][t.__viewId]);
			}, e);
			function l(r) {
				r && r.__alive && r[t] && r[t](r.__model, a, e._api, n);
			}
		}, Xx = {
			prepareAndUpdate: function(e) {
				qx(this), Xx.update.call(this, e, e && { optionChanged: e.newOption != null });
			},
			update: function(e, n) {
				var r = this._model, i = this._api, a = this._zr, o = this._coordSysMgr, s = this._scheduler;
				if (r) {
					ob(r), r.setUpdatePayload(e), s.restoreData(r, e), s.performSeriesTasks(r), o.create(r, i), Qy.trigger("coordsys:aftercreate", r, i), s.performDataProcessorTasks(r, e), Qx(this, r), o.update(r, i), t(r), s.performVisualTasks(r, e);
					var c = r.get("backgroundColor") || "transparent";
					a.setBackgroundColor(c);
					var l = r.get("darkMode");
					l != null && l !== "auto" && a.setDarkMode(l), iS(this, r, i, e, n), Qy.trigger("afterupdate", r, i);
				}
			},
			updateTransform: function(e) {
				var t = this, n = t._model, r = t._api;
				if (n) {
					n.setUpdatePayload(e);
					var i = [];
					n.eachComponent(function(a, o) {
						if (a !== "series") {
							var s = t.getViewOfComponentModel(o);
							if (s && s.__alive) {
								if (s.updateTransform) {
									var c = s.updateTransform(o, n, r, e);
									c && c.update && i.push(s);
								} else i.push(s);
							}
						}
					});
					var a = q();
					n.eachSeries(function(i) {
						var o = t._chartsMap[i.__viewId], s = i.pipelineContext;
						if (o.updateTransform && !s.progressiveRender) {
							var c = o.updateTransform(i, n, r, e);
							c && c.update && a.set(i.uid, 1);
						} else a.set(i.uid, 1);
					}), t._scheduler.performVisualTasks(n, e, {
						setDirty: !0,
						dirtyMap: a
					}), oS(t, n, r, e, {}, a), Qy.trigger("afterupdate", n, r);
				}
			},
			updateView: function(e) {
				var n = this._model;
				n && (n.setUpdatePayload(e), ey.markUpdateMethod(e, "updateView"), t(n), this._scheduler.performVisualTasks(n, e, { setDirty: !0 }), iS(this, n, this._api, e, {}), Qy.trigger("afterupdate", n, this._api));
			},
			updateVisual: function(e) {
				var n = this, r = this._model;
				r && (r.setUpdatePayload(e), r.eachSeries(function(e) {
					e.getData().clearAllVisual();
				}), ey.markUpdateMethod(e, "updateVisual"), t(r), this._scheduler.performVisualTasks(r, e, {
					visualType: "visual",
					setDirty: !0
				}), r.eachComponent(function(t, i) {
					if (t !== "series") {
						var a = n.getViewOfComponentModel(i);
						a && a.__alive && a.updateVisual(i, r, n._api, e);
					}
				}), r.eachSeries(function(t) {
					n._chartsMap[t.__viewId].updateVisual(t, r, n._api, e);
				}), Qy.trigger("afterupdate", r, this._api));
			},
			updateLayout: function(e) {
				Xx.update.call(this, e);
			}
		};
		function e(e, t, n, r, i) {
			if (e._disposed) {
				e.id;
				return;
			}
			for (var a = e._model, o = e._coordSysMgr.getCoordinateSystems(), s, c = Vo(a, n), l = 0; l < o.length; l++) {
				var u = o[l];
				if (u[t] && (s = u[t](a, c, r, i)) != null) return s;
			}
		}
		Zx = e, Qx = function(e, t) {
			var n = e._chartsMap, r = e._scheduler;
			t.eachSeries(function(e) {
				r.updateStreamModes(e, n[e.__viewId]);
			});
		}, $x = function(e, t) {
			var n = this, r = this.getModel(), i = e.type, a = e.escapeConnect, o = hS[i], s = (o.update || "update").split(":"), c = s.pop(), l = s[0] != null && hs(s[0]);
			this[Nx] = !0, dS(this);
			var u = [e], d = !1;
			e.batch && (d = !0, u = R(e.batch, function(t) {
				return t = N(M({}, t), e), t.batch = null, t;
			}));
			var f = [], p, m = [], h = o.nonRefinedEventType, g = ld(e), _ = ud(e);
			if (_ && Uu(this._api), L(u, function(t) {
				var i = o.action(t, r, n._api);
				if (o.refineEvent ? m.push(i) : p = i, p ||= M({}, t), p.type = h, f.push(p), _) {
					var a = Ho(e), s = a.queryOptionMap, u = a.mainTypeSpecified ? s.keys()[0] : "series";
					Yx(n, c, t, u), lS(n);
				} else g ? (Yx(n, c, t, "series"), lS(n)) : l && Yx(n, c, t, l.main, l.sub);
			}), c !== "none" && !_ && !g && !l) try {
				this[Fx] ? (qx(this), Xx.update.call(this, e), this[Fx] = null) : Xx[c].call(this, e);
			} catch (e) {
				throw this[Nx] = !1, e;
			}
			if (p = d ? {
				type: h,
				escapeConnect: a,
				batch: f
			} : f[0], this[Nx] = !1, !t) {
				var v = void 0;
				if (o.refineEvent) {
					var y = o.refineEvent(m, e, r, this._api).eventContent;
					ve(G(y)), v = N({ type: o.refinedEventType }, y), v.fromAction = e.type, v.fromActionPayload = e, v.escapeConnect = !0;
				}
				var b = this._messageCenter;
				b.trigger(p.type, p), v && b.trigger(v.type, v);
			}
		}, eS = function(e) {
			for (var t = this._pendingActions; t.length;) {
				var n = t.shift();
				$x.call(this, n, e);
			}
		}, tS = function(e) {
			!e && this.trigger("updated");
		}, nS = function(e, t) {
			e.on("rendered", function(n) {
				t.trigger("rendered", n), e.animation.isFinished() && !t[Fx] && !t._scheduler.unfinished && !t._pendingActions.length ? t.trigger("finished") : e.refresh();
			});
		}, rS = function(e, t) {
			e.on("mouseover", function(e) {
				var n = e.target, r = Zy(n, sd);
				r && (Ju(r, e, t._api), lS(t));
			}).on("mouseout", function(e) {
				var n = e.target, r = Zy(n, sd);
				r && (Yu(r, e, t._api), lS(t));
			}).on("click", function(e) {
				var n = e.target, r = Zy(n, function(e) {
					return Kl(e).dataIndex != null;
				}, !0);
				if (r) {
					var i = r.selected ? "unselect" : "select", a = Kl(r);
					t._api.dispatchAction({
						type: i,
						dataType: a.dataType,
						dataIndexInside: a.dataIndex,
						seriesIndex: a.seriesIndex,
						isFromClick: !0
					});
				}
			});
		};
		function t(e) {
			e.clearColorPalette(), e.eachSeries(function(e) {
				e.clearColorPalette();
			});
		}
		function n(e) {
			var t = [], n = [], r = !1;
			if (e.eachComponent(function(e, i) {
				var a = i.get("zlevel") || 0, o = i.get("z") || 0, s = i.getZLevelKey();
				r ||= !!s, (e === "series" ? n : t).push({
					zlevel: a,
					z: o,
					idx: i.componentIndex,
					type: e,
					key: s
				});
			}), r) {
				var i = t.concat(n), a, o;
				wn(i, function(e, t) {
					return e.zlevel === t.zlevel ? e.z - t.z : e.zlevel - t.zlevel;
				}), L(i, function(t) {
					var n = e.getComponent(t.type, t.idx), r = t.zlevel, i = t.key;
					a != null && (r = Math.max(a, r)), i ? (r === a && i !== o && r++, o = i) : o &&= (r === a && r++, ""), a = r, n.setZLevel(r);
				});
			}
		}
		iS = function(e, t, r, i, a) {
			n(t), aS(e, t, r, i, a), L(e._chartsViews, function(e) {
				e.__alive = !1;
			}), oS(e, t, r, i, a), L(e._chartsViews, function(e) {
				e.__alive || e.remove(t, r);
			});
		}, aS = function(e, t, n, r, i, a) {
			L(a || e._componentsViews, function(e) {
				var i = e.__model;
				l(i, e), e.render(i, t, n, r), c(i, e), u(i, e);
			});
		}, oS = function(e, t, n, r, i, a) {
			var d = e._scheduler;
			i = M(i || {}, { updatedSeries: t.getSeries() }), Qy.trigger("series:beforeupdate", t, n, i);
			var f = !1;
			t.eachSeries(function(t) {
				var n = e._chartsMap[t.__viewId];
				n.__alive = !0;
				var i = n.renderTask;
				d.updatePayload(i, r), l(t, n), a && a.get(t.uid) && i.dirty(), i.perform(d.getPerformArgs(i)) && (f = !0), n.group.silent = !!t.get("silent"), s(t, n), Zu(t);
			}), d.unfinished = f || d.unfinished, Qy.trigger("series:layoutlabels", t, n, i), Qy.trigger("series:transition", t, n, i), t.eachSeries(function(t) {
				var n = e._chartsMap[t.__viewId];
				c(t, n), u(t, n);
			}), o(e, t), Qy.trigger("series:afterupdate", t, n, i);
		}, lS = function(e) {
			e[Ix] = !0, e.getZr().wakeUp();
		}, dS = function(e) {
			e[Px] = (e[Px] + 1) % 1e6;
		}, uS = function(e) {
			e[Ix] && (e.getZr().storage.traverse(function(e) {
				zf(e) || i(e);
			}), e[Ix] = !1);
		};
		function i(e) {
			for (var t = [], n = e.currentStates, r = 0; r < n.length; r++) {
				var i = n[r];
				i !== "emphasis" && i !== "blur" && i !== "select" && t.push(i);
			}
			e.selected && e.states.select && t.push("select"), e.hoverState === 2 && e.states.emphasis ? t.push("emphasis") : e.hoverState === 1 && e.states.blur && t.push("blur"), e.useStates(t);
		}
		function o(e, t) {
			var n = e._zr;
			if (n.painter.type === "canvas") {
				var r = n.storage, i = 0;
				r.traverse(function(e) {
					e.isGroup || i++;
				});
				var o = i > K(t.get("hoverLayerThreshold"), $h.hoverLayerThreshold) && !a.node && !a.worker;
				(e._usingTHL || o) && (t.eachSeries(function(t) {
					if (!t.preventUsingHoverLayer) {
						var n = e._chartsMap[t.__viewId];
						n.__alive && n.eachRendered(function(e) {
							var t = e.states.emphasis;
							t && t.hoverLayer !== 2 && (t.hoverLayer = +!!o);
						});
					}
				}), e._usingTHL = o);
			}
		}
		function s(e, t) {
			var n = e.get("blendMode") || null;
			t.eachRendered(function(e) {
				e.isGroup || (e.style.blend = n);
			});
		}
		function c(e, t) {
			if (!e.preventAutoZ) {
				var n = Ap(e);
				t.eachRendered(function(e) {
					return Mp(e, n.z, n.zlevel), !0;
				});
			}
		}
		function l(e, t) {
			t.eachRendered(function(e) {
				if (!zf(e)) {
					var t = e.getTextContent(), n = e.getTextGuideLine();
					e.stateTransition &&= null, t && t.stateTransition && (t.stateTransition = null), n && n.stateTransition && (n.stateTransition = null), e.hasState() ? (e.prevStates = e.currentStates, e.clearStates()) : e.prevStates &&= null;
				}
			});
		}
		function u(e, t) {
			var n = e.getModel("stateAnimation"), r = e.isAnimationEnabled(), a = n.get("duration"), o = a > 0 ? {
				duration: a,
				delay: n.get("delay"),
				easing: n.get("easing")
			} : null;
			t.eachRendered(function(e) {
				if (e.states && e.states.emphasis) {
					if (zf(e)) return;
					if (e instanceof pl && dd(e), e.__dirty) {
						var t = e.prevStates;
						t && e.useStates(t);
					}
					if (r) {
						e.stateTransition = o;
						var n = e.getTextContent(), a = e.getTextGuideLine();
						n && (n.stateTransition = o), a && (a.stateTransition = o);
					}
					e.__dirty && i(e);
				}
			});
		}
		sS = function(e) {
			return new (function(t) {
				r(n, t);
				function n() {
					return t !== null && t.apply(this, arguments) || this;
				}
				return n.prototype.getCoordinateSystems = function() {
					return e._coordSysMgr.getCoordinateSystems();
				}, n.prototype.getComponentByElement = function(t) {
					for (; t;) {
						var n = t.__ecComponentInfo;
						if (n != null) return e._model.getComponent(n.mainType, n.index);
						t = t.parent;
					}
				}, n.prototype.enterEmphasis = function(t, n) {
					Iu(t, n), lS(e);
				}, n.prototype.leaveEmphasis = function(t, n) {
					Lu(t, n), lS(e);
				}, n.prototype.enterBlur = function(t) {
					Ru(t), lS(e);
				}, n.prototype.leaveBlur = function(t) {
					zu(t), lS(e);
				}, n.prototype.enterSelect = function(t) {
					Bu(t), lS(e);
				}, n.prototype.leaveSelect = function(t) {
					Vu(t), lS(e);
				}, n.prototype.getModel = function() {
					return e.getModel();
				}, n.prototype.getViewOfComponentModel = function(t) {
					return e.getViewOfComponentModel(t);
				}, n.prototype.getViewOfSeriesModel = function(t) {
					return e.getViewOfSeriesModel(t);
				}, n.prototype.getECUpdateCycleVersion = function() {
					return e[Px];
				}, n.prototype.usingTHL = function() {
					return e._usingTHL;
				}, n;
			}(ru))(e);
		}, cS = function(e) {
			function t(e, t) {
				for (var n = 0; n < e.length; n++) {
					var r = e[n];
					r[Rx] = t;
				}
			}
			L(gS, function(n, r) {
				e._messageCenter.on(r, function(n) {
					if (wS[e.group] && e[Rx] !== zx) {
						if (n && n.escapeConnect) return;
						var r = e.makeActionFromEvent(n), i = [];
						L(CS, function(t) {
							t !== e && t.group === e.group && i.push(t);
						}), t(i, zx), L(i, function(e) {
							e[Rx] !== Bx && e.dispatchAction(r);
						}), t(i, Vx);
					}
				});
			});
		};
	}(), t;
}(Ze), pS = fS.prototype;
pS.on = Hx("on"), pS.off = Hx("off"), pS.one = function(e, t, n) {
	var r = this;
	function i() {
		var n = [...arguments];
		t && t.apply && t.apply(this, n), r.off(e, i);
	}
	this.on.call(this, e, i, n);
};
var mS = [
	"click",
	"dblclick",
	"mouseover",
	"mouseout",
	"mousemove",
	"mousedown",
	"mouseup",
	"globalout",
	"contextmenu"
], hS = {}, gS = {}, _S = {}, vS = [], yS = [], bS = [], xS = {}, SS = {}, CS = {}, wS = {}, TS = /* @__PURE__ */ new Date() - 0;
/* @__PURE__ */ new Date() - 0;
var ES = "_echarts_instance_";
function DS(e, t, n) {
	var r = !(n && n.ssr);
	if (r) {
		var i = OS(e);
		if (i) return i;
	}
	var a = new fS(e, t, n);
	return a.id = "ec_" + TS++, CS[a.id] = a, r && Ko(e, ES, a.id), cS(a), Qy.trigger("afterinit", a), a;
}
function OS(e) {
	return CS[qo(e, ES)];
}
function kS(e, t) {
	xS[e] = t;
}
function AS(e) {
	P(yS, e) < 0 && yS.push(e);
}
function jS(e, t) {
	BS(vS, e, t, yx);
}
function MS(e) {
	PS("afterinit", e);
}
function NS(e) {
	PS("afterupdate", e);
}
function PS(e, t) {
	Qy.on(e, t);
}
function FS(e, t, n) {
	var r, i, a, o, s;
	U(t) && (n = t, t = ""), G(e) ? (r = e.type, i = e.event, o = e.update, s = e.publishNonRefinedEvent, n ||= e.action, a = e.refineEvent) : (r = e, i = t);
	function c(e) {
		return e.toLowerCase();
	}
	i = c(i || r);
	var l = a ? c(r) : i;
	hS[r] || (ve(Lx.test(r) && Lx.test(i)), a && ve(i !== r), hS[r] = {
		actionType: r,
		refinedEventType: i,
		nonRefinedEventType: l,
		update: o,
		action: n,
		refineEvent: a
	}, _S[i] = 1, a && s && (_S[l] = 1), gS[l] = r);
}
function IS(e, t) {
	Th.register(e, t);
}
function LS(e, t) {
	BS(bS, e, t, xx, "layout", !0);
}
function RS(e, t) {
	BS(bS, e, t, Tx, "visual", !0);
}
var zS = [];
function BS(e, t, n, r, i, a) {
	if ((U(t) || G(t)) && (n = t, t = r), !(P(zS, n) >= 0)) {
		zS.push(n);
		var o = Cy.wrapStageHandler(n, i);
		o.__prio = t, o.__raw = n, e.push(o);
	}
}
function VS(e, t) {
	SS[e] = t;
}
function HS(e, t, n) {
	var r = tb("registerMap");
	r && r(e, t, n);
}
var US = $_;
RS(Cx, _y), RS(Dx, yy), RS(Dx, by), RS(Cx, Gy), RS(Dx, Ky), RS(jx, fx), AS(t_), jS(gx, n_), VS("default", Sy), FS({
	type: du,
	event: du,
	update: du
}, je), FS({
	type: fu,
	event: fu,
	update: fu
}, je), FS({
	type: pu,
	event: gu,
	update: pu,
	action: je,
	refineEvent: WS,
	publishNonRefinedEvent: !0
}), FS({
	type: mu,
	event: gu,
	update: mu,
	action: je,
	refineEvent: WS,
	publishNonRefinedEvent: !0
}), FS({
	type: hu,
	event: gu,
	update: hu,
	action: je,
	refineEvent: WS,
	publishNonRefinedEvent: !0
});
function WS(e, t, n, r) {
	return { eventContent: {
		selected: Qu(n),
		isFromClick: t.isFromClick || !1
	} };
}
kS("default", {}), kS("dark", Vy);
//#endregion
//#region node_modules/echarts/lib/data/DataDiffer.js
function GS(e) {
	return e == null ? 0 : e.length || 1;
}
function KS(e) {
	return e;
}
var qS = function() {
	function e(e, t, n, r, i, a) {
		this._old = e, this._new = t, this._oldKeyGetter = n || KS, this._newKeyGetter = r || KS, this.context = i, this._diffModeMultiple = a === "multiple";
	}
	return e.prototype.add = function(e) {
		return this._add = e, this;
	}, e.prototype.update = function(e) {
		return this._update = e, this;
	}, e.prototype.updateManyToOne = function(e) {
		return this._updateManyToOne = e, this;
	}, e.prototype.updateOneToMany = function(e) {
		return this._updateOneToMany = e, this;
	}, e.prototype.updateManyToMany = function(e) {
		return this._updateManyToMany = e, this;
	}, e.prototype.remove = function(e) {
		return this._remove = e, this;
	}, e.prototype.execute = function() {
		this[this._diffModeMultiple ? "_executeMultiple" : "_executeOneToOne"]();
	}, e.prototype._executeOneToOne = function() {
		var e = this._old, t = this._new, n = {}, r = Array(e.length), i = Array(t.length);
		this._initIndexMap(e, null, r, "_oldKeyGetter"), this._initIndexMap(t, n, i, "_newKeyGetter");
		for (var a = 0; a < e.length; a++) {
			var o = r[a], s = n[o], c = GS(s);
			if (c > 1) {
				var l = s.shift();
				s.length === 1 && (n[o] = s[0]), this._update && this._update(l, a);
			} else c === 1 ? (n[o] = null, this._update && this._update(s, a)) : this._remove && this._remove(a);
		}
		this._performRestAdd(i, n);
	}, e.prototype._executeMultiple = function() {
		var e = this._old, t = this._new, n = {}, r = {}, i = [], a = [];
		this._initIndexMap(e, n, i, "_oldKeyGetter"), this._initIndexMap(t, r, a, "_newKeyGetter");
		for (var o = 0; o < i.length; o++) {
			var s = i[o], c = n[s], l = r[s], u = GS(c), d = GS(l);
			if (u > 1 && d === 1) this._updateManyToOne && this._updateManyToOne(l, c), r[s] = null;
			else if (u === 1 && d > 1) this._updateOneToMany && this._updateOneToMany(l, c), r[s] = null;
			else if (u === 1 && d === 1) this._update && this._update(l, c), r[s] = null;
			else if (u > 1 && d > 1) this._updateManyToMany && this._updateManyToMany(l, c), r[s] = null;
			else if (u > 1) for (var f = 0; f < u; f++) this._remove && this._remove(c[f]);
			else this._remove && this._remove(c);
		}
		this._performRestAdd(a, r);
	}, e.prototype._performRestAdd = function(e, t) {
		for (var n = 0; n < e.length; n++) {
			var r = e[n], i = t[r], a = GS(i);
			if (a > 1) for (var o = 0; o < a; o++) this._add && this._add(i[o]);
			else a === 1 && this._add && this._add(i);
			t[r] = null;
		}
	}, e.prototype._initIndexMap = function(e, t, n, r) {
		for (var i = this._diffModeMultiple, a = 0; a < e.length; a++) {
			var o = "_ec_" + this[r](e[a], a);
			if (i || (n[a] = o), t) {
				var s = t[o], c = GS(s);
				c === 0 ? (t[o] = a, i && n.push(o)) : c === 1 ? t[o] = [s, a] : s.push(a);
			}
		}
	}, e;
}(), JS = function() {
	function e(e, t) {
		this._encode = e, this._schema = t;
	}
	return e.prototype.get = function() {
		return {
			fullDimensions: this._getFullDimensionNames(),
			encode: this._encode
		};
	}, e.prototype._getFullDimensionNames = function() {
		return this._cachedDimNames ||= this._schema ? this._schema.makeOutputDimensionNames() : [], this._cachedDimNames;
	}, e;
}();
function YS(e, t) {
	var n = {}, r = n.encode = {}, i = q(), a = [], o = [], s = {};
	L(e.dimensions, function(t) {
		var n = e.getDimensionInfo(t), c = n.coordDim;
		if (c) {
			var l = n.coordDimIndex;
			XS(r, c)[l] = t, n.isExtraCoord || (i.set(c, 1), QS(n.type) && (a[0] = t), XS(s, c)[l] = e.getDimensionIndex(n.name)), n.defaultTooltip && o.push(t);
		}
		Jl.each(function(e, t) {
			var i = XS(r, t), a = n.otherDims[t];
			a != null && a !== !1 && (i[a] = n.name);
		});
	});
	var c = [], l = {};
	i.each(function(e, t) {
		var n = r[t];
		l[t] = n[0], c = c.concat(n);
	}), n.dataDimsOnCoord = c, n.dataDimIndicesOnCoord = R(c, function(t) {
		return e.getDimensionInfo(t).storeDimIndex;
	}), n.encodeFirstDimNotExtra = l;
	var u = r.label;
	u && u.length && (a = u.slice());
	var d = r.tooltip;
	return d && d.length ? o = d.slice() : o.length || (o = a.slice()), r.defaultedLabel = a, r.defaultedTooltip = o, n.userOutput = new JS(s, t), n;
}
function XS(e, t) {
	return e.hasOwnProperty(t) || (e[t] = []), e[t];
}
function ZS(e) {
	return e === "category" ? "ordinal" : e === "time" ? "time" : "float";
}
function QS(e) {
	return e !== "ordinal" && e !== "time";
}
//#endregion
//#region node_modules/echarts/lib/data/SeriesDimensionDefine.js
var $S = function() {
	function e(e) {
		this.otherDims = {}, e != null && M(this, e);
	}
	return e;
}(), eC = X(), tC = {
	float: "f",
	int: "i",
	ordinal: "o",
	number: "n",
	time: "t"
}, nC = function() {
	function e(e) {
		this.dimensions = e.dimensions, this._dimOmitted = e.dimensionOmitted, this.source = e.source, this._fullDimCount = e.fullDimensionCount, this._updateDimOmitted(e.dimensionOmitted);
	}
	return e.prototype.isDimensionOmitted = function() {
		return this._dimOmitted;
	}, e.prototype._updateDimOmitted = function(e) {
		this._dimOmitted = e, e && (this._dimNameMap ||= aC(this.source));
	}, e.prototype.getSourceDimensionIndex = function(e) {
		return K(this._dimNameMap.get(e), -1);
	}, e.prototype.getSourceDimension = function(e) {
		var t = this.source.dimensionsDefine;
		if (t) return t[e];
	}, e.prototype.makeStoreSchema = function() {
		for (var e = this._fullDimCount, t = h_(this.source), n = !oC(e), r = "", i = [], a = 0, o = 0; a < e; a++) {
			var s = void 0, c = void 0, l = void 0, u = this.dimensions[o];
			if (u && u.storeDimIndex === a) s = t ? u.name : null, c = u.type, l = u.ordinalMeta, o++;
			else {
				var d = this.getSourceDimension(a);
				d && (s = t ? d.name : null, c = d.type);
			}
			i.push({
				property: s,
				type: c,
				ordinalMeta: l
			}), t && s != null && (!u || !u.isCalculationCoord) && (r += n ? s.replace(/\`/g, "`1").replace(/\$/g, "`2") : s), r += "$", r += tC[c] || "f", l && (r += l.uid), r += "$";
		}
		var f = this.source;
		return {
			dimensions: i,
			hash: [
				f.seriesLayoutBy,
				f.startIndex,
				r
			].join("$$")
		};
	}, e.prototype.makeOutputDimensionNames = function() {
		for (var e = [], t = 0, n = 0; t < this._fullDimCount; t++) {
			var r = void 0, i = this.dimensions[n];
			if (i && i.storeDimIndex === t) i.isCalculationCoord || (r = i.name), n++;
			else {
				var a = this.getSourceDimension(t);
				a && (r = a.name);
			}
			e.push(r);
		}
		return e;
	}, e.prototype.appendCalculationDimension = function(e) {
		this.dimensions.push(e), e.isCalculationCoord = !0, this._fullDimCount++, this._updateDimOmitted(!0);
	}, e;
}();
function rC(e) {
	return e instanceof nC;
}
function iC(e) {
	for (var t = q(), n = 0; n < (e || []).length; n++) {
		var r = e[n], i = G(r) ? r.name : r;
		i != null && t.get(i) == null && t.set(i, n);
	}
	return t;
}
function aC(e) {
	var t = eC(e);
	return t.dimNameMap ||= iC(e.dimensionsDefine);
}
function oC(e) {
	return e > 30;
}
//#endregion
//#region node_modules/echarts/lib/data/SeriesData.js
var sC = G, cC = R, lC = typeof Int32Array > "u" ? Array : Int32Array, uC = "e\0\0", dC = -1, fC = [
	"hasItemOption",
	"_nameList",
	"_idList",
	"_invertedIndicesMap",
	"_dimSummary",
	"userOutput",
	"_rawData",
	"_dimValueGetter",
	"_nameDimIdx",
	"_idDimIdx",
	"_nameRepeatCount"
], pC = ["_approximateExtent"], mC, hC, gC, _C, vC, yC, bC, xC = function() {
	function e(e, t) {
		this.type = "list", this._dimOmitted = !1, this._nameList = [], this._idList = [], this._visual = {}, this._layout = {}, this._itemVisuals = [], this._itemLayouts = [], this._graphicEls = [], this._approximateExtent = {}, this._calculationInfo = {}, this.hasItemOption = !1, this.TRANSFERABLE_METHODS = [
			"cloneShallow",
			"downSample",
			"minmaxDownSample",
			"lttbDownSample",
			"map"
		], this.CHANGABLE_METHODS = ["filterSelf", "selectRange"], this.DOWNSAMPLE_METHODS = [
			"downSample",
			"minmaxDownSample",
			"lttbDownSample"
		];
		var n, r = !1;
		rC(e) ? (n = e.dimensions, this._dimOmitted = e.isDimensionOmitted(), this._schema = e) : (r = !0, n = e), n ||= ["x", "y"];
		for (var i = {}, a = [], o = {}, s = !1, c = {}, l = 0; l < n.length; l++) {
			var u = n[l], d = W(u) ? new $S({ name: u }) : u instanceof $S ? u : new $S(u), f = d.name;
			d.type = d.type || "float", d.coordDim || (d.coordDim = f, d.coordDimIndex = 0);
			var p = d.otherDims = d.otherDims || {};
			a.push(f), i[f] = d, c[f] != null && (s = !0), d.createInvertedIndices && (o[f] = []), r && (d.storeDimIndex = l), p.itemName === 0 && (this._nameDimIdx = d.storeDimIndex), p.itemId === 0 && (this._idDimIdx = d.storeDimIndex);
		}
		if (this.dimensions = a, this._dimInfos = i, this._initGetDimensionInfo(s), this.hostModel = t, this._invertedIndicesMap = o, this._dimOmitted) {
			var m = this._dimIdxToName = q();
			L(a, function(e) {
				m.set(i[e].storeDimIndex, e);
			});
		}
	}
	return e.prototype.getDimension = function(e) {
		var t = this._recognizeDimIndex(e);
		if (t == null) return e;
		if (t = e, !this._dimOmitted) return this.dimensions[t];
		var n = this._dimIdxToName.get(t);
		if (n != null) return n;
		var r = this._schema.getSourceDimension(t);
		if (r) return r.name;
	}, e.prototype.getDimensionIndex = function(e) {
		var t = this._recognizeDimIndex(e);
		if (t != null) return t;
		if (e == null) return -1;
		var n = this._getDimInfo(e);
		return n ? n.storeDimIndex : this._dimOmitted ? this._schema.getSourceDimensionIndex(e) : -1;
	}, e.prototype._recognizeDimIndex = function(e) {
		if (se(e) || e != null && !isNaN(e) && !this._getDimInfo(e) && (!this._dimOmitted || this._schema.getSourceDimensionIndex(e) < 0)) return +e;
	}, e.prototype._getStoreDimIndex = function(e) {
		return this.getDimensionIndex(e);
	}, e.prototype.getDimensionInfo = function(e) {
		return this._getDimInfo(this.getDimension(e));
	}, e.prototype._initGetDimensionInfo = function(e) {
		var t = this._dimInfos;
		this._getDimInfo = e ? function(e) {
			return t.hasOwnProperty(e) ? t[e] : void 0;
		} : function(e) {
			return t[e];
		};
	}, e.prototype.getDimensionsOnCoord = function() {
		return this._dimSummary.dataDimsOnCoord.slice();
	}, e.prototype.mapDimension = function(e, t) {
		var n = this._dimSummary;
		if (t == null) return n.encodeFirstDimNotExtra[e];
		var r = n.encode[e];
		return r ? r[t] : null;
	}, e.prototype.mapDimensionsAll = function(e) {
		return (this._dimSummary.encode[e] || []).slice();
	}, e.prototype.getStore = function() {
		return this._store;
	}, e.prototype.initData = function(e, t, n) {
		var r = this, i;
		if (e instanceof fv && (i = e), !i) {
			var a = this.dimensions, o = o_(e) || I(e) ? new S_(e, a.length) : e;
			i = new fv();
			var s = cC(a, function(e) {
				return {
					type: r._dimInfos[e].type,
					property: e
				};
			});
			i.initData(o, s, n);
		}
		this._store = i, this._nameList = (t || []).slice(), this._idList = [], this._nameRepeatCount = {}, this._doInit(0, i.count()), this._dimSummary = YS(this, this._schema), this.userOutput = this._dimSummary.userOutput;
	}, e.prototype.appendData = function(e) {
		var t = this._store.appendData(e);
		this._doInit(t[0], t[1]);
	}, e.prototype.appendValues = function(e, t) {
		var n = this._store.appendValues(e, t && t.length), r = n.start, i = n.end, a = this._shouldMakeIdFromName();
		if (this._updateOrdinalMeta(), t) for (var o = r; o < i; o++) {
			var s = o - r;
			this._nameList[o] = t[s], a && bC(this, o);
		}
	}, e.prototype._updateOrdinalMeta = function() {
		for (var e = this._store, t = this.dimensions, n = 0; n < t.length; n++) {
			var r = this._dimInfos[t[n]];
			r.ordinalMeta && e.collectOrdinalMeta(r.storeDimIndex, r.ordinalMeta);
		}
	}, e.prototype._shouldMakeIdFromName = function() {
		var e = this._store.getProvider();
		return this._idDimIdx == null && e.getSource().sourceFormat !== "typedArray" && !e.fillStorage;
	}, e.prototype._doInit = function(e, t) {
		if (!(e >= t)) {
			var n = this._store.getProvider();
			this._updateOrdinalMeta();
			var r = this._nameList, i = this._idList;
			if (n.getSource().sourceFormat === "original" && !n.pure) for (var a = [], o = e; o < t; o++) {
				var s = n.getItem(o, a);
				if (!this.hasItemOption && wo(s) && (this.hasItemOption = !0), s) {
					var c = s.name;
					r[o] == null && c != null && (r[o] = Po(c, null));
					var l = s.id;
					i[o] == null && l != null && (i[o] = Po(l, null));
				}
			}
			if (this._shouldMakeIdFromName()) for (var o = e; o < t; o++) bC(this, o);
			mC(this);
		}
	}, e.prototype.getApproximateExtent = function(e, t) {
		return this._approximateExtent[e] || this._store.getDataExtent(this._getStoreDimIndex(e), t);
	}, e.prototype.setApproximateExtent = function(e, t) {
		t = this.getDimension(t), this._approximateExtent[t] = e.slice();
	}, e.prototype.getCalculationInfo = function(e) {
		return this._calculationInfo[e];
	}, e.prototype.setCalculationInfo = function(e, t) {
		sC(e) ? M(this._calculationInfo, e) : this._calculationInfo[e] = t;
	}, e.prototype.getName = function(e) {
		var t = this.getRawIndex(e), n = this._nameList[t];
		return n == null && this._nameDimIdx != null && (n = gC(this, this._nameDimIdx, t)), n ??= "", n;
	}, e.prototype._getCategory = function(e, t) {
		var n = this._store.get(e, t), r = this._store.getOrdinalMeta(e);
		return r ? r.categories[n] : n;
	}, e.prototype.getId = function(e) {
		return hC(this, this.getRawIndex(e));
	}, e.prototype.count = function() {
		return this._store.count();
	}, e.prototype.get = function(e, t) {
		var n = this._store, r = this._dimInfos[e];
		if (r) return n.get(r.storeDimIndex, t);
	}, e.prototype.getByRawIndex = function(e, t) {
		var n = this._store, r = this._dimInfos[e];
		if (r) return n.getByRawIndex(r.storeDimIndex, t);
	}, e.prototype.getIndices = function() {
		return this._store.getIndices();
	}, e.prototype.getDataExtent = function(e) {
		return this._store.getDataExtent(this._getStoreDimIndex(e), null);
	}, e.prototype.getSum = function(e) {
		return this._store.getSum(this._getStoreDimIndex(e));
	}, e.prototype.getMedian = function(e) {
		return this._store.getMedian(this._getStoreDimIndex(e));
	}, e.prototype.getValues = function(e, t) {
		var n = this, r = this._store;
		return H(e) ? r.getValues(cC(e, function(e) {
			return n._getStoreDimIndex(e);
		}), t) : r.getValues(e);
	}, e.prototype.hasValue = function(e) {
		for (var t = this._dimSummary.dataDimIndicesOnCoord, n = 0, r = t.length; n < r; n++) if (isNaN(this._store.get(t[n], e))) return !1;
		return !0;
	}, e.prototype.indexOfName = function(e) {
		for (var t = 0, n = this._store.count(); t < n; t++) if (this.getName(t) === e) return t;
		return -1;
	}, e.prototype.getRawIndex = function(e) {
		return this._store.getRawIndex(e);
	}, e.prototype.indexOfRawIndex = function(e) {
		return this._store.indexOfRawIndex(e);
	}, e.prototype.rawIndexOf = function(e, t) {
		var n = e && this._invertedIndicesMap[e], r = n && n[t];
		return r == null || isNaN(r) ? dC : r;
	}, e.prototype.each = function(e, t, n) {
		U(e) && (n = t, t = e, e = []);
		var r = n || this, i = cC(_C(e), this._getStoreDimIndex, this);
		this._store.each(i, r ? B(t, r) : t);
	}, e.prototype.filterSelf = function(e, t, n) {
		U(e) && (n = t, t = e, e = []);
		var r = n || this, i = cC(_C(e), this._getStoreDimIndex, this);
		return this._store = this._store.filter(i, r ? B(t, r) : t), this;
	}, e.prototype.selectRange = function(e) {
		var t = this, n = {}, r = z(e), i = [];
		return L(r, function(r) {
			var a = t._getStoreDimIndex(r);
			n[a] = e[r], i.push(a);
		}), this._store = this._store.selectRange(n), this;
	}, e.prototype.mapArray = function(e, t, n) {
		U(e) && (n = t, t = e, e = []), n ||= this;
		var r = [];
		return this.each(e, function() {
			r.push(t && t.apply(this, arguments));
		}, n), r;
	}, e.prototype.map = function(e, t, n, r) {
		var i = n || r || this, a = cC(_C(e), this._getStoreDimIndex, this), o = yC(this);
		return o._store = this._store.map(a, i ? B(t, i) : t), o;
	}, e.prototype.modify = function(e, t, n, r) {
		var i = n || r || this, a = cC(_C(e), this._getStoreDimIndex, this);
		this._store.modify(a, i ? B(t, i) : t);
	}, e.prototype.downSample = function(e, t, n, r) {
		var i = yC(this);
		return i._store = this._store.downSample(this._getStoreDimIndex(e), t, n, r), i;
	}, e.prototype.minmaxDownSample = function(e, t) {
		var n = yC(this);
		return n._store = this._store.minmaxDownSample(this._getStoreDimIndex(e), t), n;
	}, e.prototype.lttbDownSample = function(e, t) {
		var n = yC(this);
		return n._store = this._store.lttbDownSample(this._getStoreDimIndex(e), t), n;
	}, e.prototype.getRawDataItem = function(e) {
		return this._store.getRawDataItem(e);
	}, e.prototype.getItemModel = function(e) {
		var t = this.hostModel;
		return new um(this.getRawDataItem(e), t, t && t.ecModel);
	}, e.prototype.diff = function(e) {
		var t = this;
		return new qS(e ? e.getStore().getIndices() : [], this.getStore().getIndices(), function(t) {
			return hC(e, t);
		}, function(e) {
			return hC(t, e);
		});
	}, e.prototype.getVisual = function(e) {
		var t = this._visual;
		return t && t[e];
	}, e.prototype.setVisual = function(e, t) {
		this._visual = this._visual || {}, sC(e) ? M(this._visual, e) : this._visual[e] = t;
	}, e.prototype.getItemVisual = function(e, t) {
		var n = this._itemVisuals[e];
		return (n && n[t]) ?? this.getVisual(t);
	}, e.prototype.hasItemVisual = function() {
		return this._itemVisuals.length > 0;
	}, e.prototype.ensureUniqueItemVisual = function(e, t) {
		var n = this._itemVisuals, r = n[e];
		r ||= n[e] = {};
		var i = r[t];
		return i ?? (i = this.getVisual(t), H(i) ? i = i.slice() : sC(i) && (i = M({}, i)), r[t] = i), i;
	}, e.prototype.setItemVisual = function(e, t, n) {
		var r = this._itemVisuals[e] || {};
		this._itemVisuals[e] = r, sC(t) ? M(r, t) : r[t] = n;
	}, e.prototype.clearAllVisual = function() {
		this._visual = {}, this._itemVisuals = [];
	}, e.prototype.setLayout = function(e, t) {
		sC(e) ? M(this._layout, e) : this._layout[e] = t;
	}, e.prototype.getLayout = function(e) {
		return this._layout[e];
	}, e.prototype.getItemLayout = function(e) {
		return this._itemLayouts[e];
	}, e.prototype.setItemLayout = function(e, t, n) {
		this._itemLayouts[e] = n ? M(this._itemLayouts[e] || {}, t) : t;
	}, e.prototype.clearItemLayouts = function() {
		this._itemLayouts.length = 0;
	}, e.prototype.setItemGraphicEl = function(e, t) {
		ql(this.hostModel && this.hostModel.seriesIndex, this.dataType, e, t), this._graphicEls[e] = t;
	}, e.prototype.getItemGraphicEl = function(e) {
		return this._graphicEls[e];
	}, e.prototype.eachItemGraphicEl = function(e, t) {
		L(this._graphicEls, function(n, r) {
			n && e && e.call(t, n, r);
		});
	}, e.prototype.cloneShallow = function(t) {
		return t ||= new e(this._schema ? this._schema : cC(this.dimensions, this._getDimInfo, this), this.hostModel), vC(t, this), t._store = this._store, t;
	}, e.prototype.wrapMethod = function(e, t) {
		var n = this[e];
		U(n) && (this.__wrappedMethods = this.__wrappedMethods || [], this.__wrappedMethods.push(e), this[e] = function() {
			var e = n.apply(this, arguments);
			return t.apply(this, [e].concat(ge(arguments)));
		});
	}, e.internalField = function() {
		mC = function(e) {
			var t = e._invertedIndicesMap;
			L(t, function(n, r) {
				var i = e._dimInfos[r], a = i.ordinalMeta, o = e._store;
				if (a) {
					n = t[r] = new lC(a.categories.length);
					for (var s = 0; s < n.length; s++) n[s] = dC;
					for (var s = 0; s < o.count(); s++) n[o.get(i.storeDimIndex, s)] = s;
				}
			});
		}, gC = function(e, t, n) {
			return Po(e._getCategory(t, n), null);
		}, hC = function(e, t) {
			var n = e._idList[t];
			return n == null && e._idDimIdx != null && (n = gC(e, e._idDimIdx, t)), n ??= uC + t, n;
		}, _C = function(e) {
			return H(e) || (e = e == null ? [] : [e]), e;
		}, yC = function(t) {
			var n = new e(t._schema ? t._schema : cC(t.dimensions, t._getDimInfo, t), t.hostModel);
			return vC(n, t), n;
		}, vC = function(e, t) {
			L(fC.concat(t.__wrappedMethods || []), function(n) {
				t.hasOwnProperty(n) && (e[n] = t[n]);
			}), e.__wrappedMethods = t.__wrappedMethods, L(pC, function(n) {
				e[n] = k(t[n]);
			}), e._calculationInfo = M({}, t._calculationInfo);
		}, bC = function(e, t) {
			var n = e._nameList, r = e._idList, i = e._nameDimIdx, a = e._idDimIdx, o = n[t], s = r[t];
			if (o == null && i != null && (n[t] = o = gC(e, i, t)), s == null && a != null && (r[t] = s = gC(e, a, t)), s == null && o != null) {
				var c = e._nameRepeatCount, l = c[o] = (c[o] || 0) + 1;
				s = o, l > 1 && (s += "__ec__" + l), r[t] = s;
			}
		};
	}(), e;
}();
//#endregion
//#region node_modules/echarts/lib/data/helper/createDimensions.js
function SC(e, t) {
	o_(e) || (e = c_(e)), t ||= {};
	var n = t.coordDimensions || [], r = t.dimensionsDefine || e.dimensionsDefine || [], i = q(), a = [], o = CC(e, n, r, t.dimensionsCount), s = t.canOmitUnusedDimensions && oC(o), c = r === e.dimensionsDefine, l = c ? aC(e) : iC(r), u = t.encodeDefine;
	!u && t.encodeDefaulter && (u = t.encodeDefaulter(e, o));
	for (var d = q(u), f = new av(o), p = 0; p < f.length; p++) f[p] = -1;
	function m(e) {
		var t = f[e];
		if (t < 0) {
			var n = r[e], i = G(n) ? n : { name: n }, o = new $S(), s = i.name;
			return s != null && l.get(s) != null && (o.name = o.displayName = s), i.type != null && (o.type = i.type), i.displayName != null && (o.displayName = i.displayName), f[e] = a.length, o.storeDimIndex = e, a.push(o), o;
		}
		return a[t];
	}
	if (!s) for (var p = 0; p < o; p++) m(p);
	d.each(function(e, t) {
		var n = bo(e).slice();
		if (n.length === 1 && !W(n[0]) && n[0] < 0) {
			d.set(t, !1);
			return;
		}
		var r = d.set(t, []);
		L(n, function(e, n) {
			var i = W(e) ? l.get(e) : e;
			i != null && i < o && (r[n] = i, g(m(i), t, n));
		});
	});
	var h = 0;
	L(n, function(e) {
		var t, n, r, i;
		if (W(e)) t = e, i = {};
		else {
			i = e, t = i.name;
			var a = i.ordinalMeta;
			i.ordinalMeta = null, i = M({}, i), i.ordinalMeta = a, n = i.dimsDef, r = i.otherDims, i.name = i.coordDim = i.coordDimIndex = i.dimsDef = i.otherDims = null;
		}
		var s = d.get(t);
		if (s !== !1) {
			if (s = bo(s), !s.length) for (var l = 0; l < (n && n.length || 1); l++) {
				for (; h < o && m(h).coordDim != null;) h++;
				h < o && s.push(h++);
			}
			L(s, function(e, a) {
				var o = m(e);
				if (c && i.type != null && (o.type = i.type), g(N(o, i), t, a), o.name == null && n) {
					var s = n[a];
					!G(s) && (s = { name: s }), o.name = o.displayName = s.name, o.defaultTooltip = s.defaultTooltip;
				}
				r && N(o.otherDims, r);
			});
		}
	});
	function g(e, t, n) {
		Jl.get(t) == null ? (e.coordDim = t, e.coordDimIndex = n, i.set(t, !0)) : e.otherDims[t] = n;
	}
	var _ = t.generateCoord, v = t.generateCoordCount, y = v != null;
	v = _ ? v || 1 : 0;
	var b = _ || "value";
	function x(e) {
		e.name ??= e.coordDim;
	}
	if (s) L(a, function(e) {
		x(e);
	}), a.sort(function(e, t) {
		return e.storeDimIndex - t.storeDimIndex;
	});
	else for (var S = 0; S < o; S++) {
		var C = m(S);
		C.coordDim ?? (C.coordDim = wC(b, i, y), C.coordDimIndex = 0, (!_ || v <= 0) && (C.isExtraCoord = !0), v--), x(C), C.type == null && (og(e, S) === eg.Must || C.isExtraCoord && (C.otherDims.itemName != null || C.otherDims.seriesName != null)) && (C.type = "ordinal");
	}
	return ss(a, function(e) {
		return e.name;
	}, function(e, t) {
		t > 0 && (e.name += t - 1);
	}), new nC({
		source: e,
		dimensions: a,
		fullDimensionCount: o,
		dimensionOmitted: s
	});
}
function CC(e, t, n, r) {
	var i = Math.max(e.dimensionsDetectedCount || 1, t.length, n.length, r || 0);
	return L(t, function(e) {
		var t;
		G(e) && (t = e.dimsDef) && (i = Math.max(i, t.length));
	}), i;
}
function wC(e, t, n) {
	if (n || t.hasKey(e)) {
		for (var r = 0; t.hasKey(e + r);) r++;
		e += r;
	}
	return t.set(e, !0), e;
}
//#endregion
//#region node_modules/echarts/lib/model/referHelper.js
var TC = function() {
	function e(e) {
		this.coordSysDims = [], this.axisMap = q(), this.categoryAxisMap = q(), this.coordSysName = e;
	}
	return e;
}();
function EC(e) {
	var t = e.get("coordinateSystem"), n = new TC(t), r = DC[t];
	if (r) return r(e, n, n.axisMap, n.categoryAxisMap), n;
}
var DC = {
	cartesian2d: function(e, t, n, r) {
		var i = e.getReferringComponents("xAxis", Uo).models[0], a = e.getReferringComponents("yAxis", Uo).models[0];
		t.coordSysDims = ["x", "y"], n.set("x", i), n.set("y", a), OC(i) && (r.set("x", i), t.firstCategoryDimIndex = 0), OC(a) && (r.set("y", a), t.firstCategoryDimIndex ??= 1);
	},
	singleAxis: function(e, t, n, r) {
		var i = e.getReferringComponents("singleAxis", Uo).models[0];
		t.coordSysDims = ["single"], n.set("single", i), OC(i) && (r.set("single", i), t.firstCategoryDimIndex = 0);
	},
	polar: function(e, t, n, r) {
		var i = e.getReferringComponents("polar", Uo).models[0], a = i.findAxisModel("radiusAxis"), o = i.findAxisModel("angleAxis");
		t.coordSysDims = ["radius", "angle"], n.set("radius", a), n.set("angle", o), OC(a) && (r.set("radius", a), t.firstCategoryDimIndex = 0), OC(o) && (r.set("angle", o), t.firstCategoryDimIndex ??= 1);
	},
	geo: function(e, t, n, r) {
		t.coordSysDims = ["lng", "lat"];
	},
	parallel: function(e, t, n, r) {
		var i = e.ecModel, a = i.getComponent("parallel", e.get("parallelIndex")), o = t.coordSysDims = a.dimensions.slice();
		L(a.parallelAxisIndex, function(e, a) {
			var s = i.getComponent("parallelAxis", e), c = o[a];
			n.set(c, s), OC(s) && (r.set(c, s), t.firstCategoryDimIndex ??= a);
		});
	},
	matrix: function(e, t, n, r) {
		var i = e.getReferringComponents("matrix", Uo).models[0];
		t.coordSysDims = ["x", "y"];
		var a = i.getDimensionModel("x"), o = i.getDimensionModel("y");
		n.set("x", a), n.set("y", o), r.set("x", a), r.set("y", o);
	}
};
function OC(e) {
	return e.get("type") === "category";
}
//#endregion
//#region node_modules/echarts/lib/data/helper/dataStackHelper.js
function kC(e, t, n) {
	n ||= {};
	var r = n.byIndex, i = n.stackedCoordDimension, a, o, s;
	AC(t) ? a = t : (o = t.schema, a = o.dimensions, s = t.store);
	var c = !!(e && e.get("stack")), l, u, d, f, p = !0;
	function m(e) {
		return e.type !== "ordinal" && e.type !== "time";
	}
	if (L(a, function(e, t) {
		W(e) && (a[t] = e = { name: e }), m(e) || (p = !1);
	}), L(a, function(e, t) {
		c && !e.isExtraCoord && (!r && !l && e.ordinalMeta && (l = e), !u && m(e) && (!p || e.coordDim !== "x" && e.coordDim !== "angle") && (!i || i === e.coordDim) && (u = e));
	}), u && !r && !l && (r = !0), u) {
		d = "__\0ecstackresult_" + e.id, f = "__\0ecstackedover_" + e.id, l && (l.createInvertedIndices = !0);
		var h = u.coordDim, g = u.type, _ = 0;
		L(a, function(e) {
			e.coordDim === h && _++;
		});
		var v = {
			name: d,
			coordDim: h,
			coordDimIndex: _,
			type: g,
			isExtraCoord: !0,
			isCalculationCoord: !0,
			storeDimIndex: a.length
		}, y = {
			name: f,
			coordDim: f,
			coordDimIndex: _ + 1,
			type: g,
			isExtraCoord: !0,
			isCalculationCoord: !0,
			storeDimIndex: a.length + 1
		};
		o ? (s && (v.storeDimIndex = s.ensureCalculationDimension(f, g), y.storeDimIndex = s.ensureCalculationDimension(d, g)), o.appendCalculationDimension(v), o.appendCalculationDimension(y)) : (a.push(v), a.push(y));
	}
	return {
		stackedDimension: u && u.name,
		stackedByDimension: l && l.name,
		isStackedByIndex: r,
		stackedOverDimension: f,
		stackResultDimension: d
	};
}
function AC(e) {
	return !rC(e.schema);
}
function jC(e, t) {
	return !!t && t === e.getCalculationInfo("stackedDimension");
}
function MC(e, t) {
	return jC(e, t) ? e.getCalculationInfo("stackResultDimension") : t;
}
//#endregion
//#region node_modules/echarts/lib/chart/helper/createSeriesData.js
function NC(e, t) {
	var n = e.get("coordinateSystem"), r = Th.get(n), i;
	return t && t.coordSysDims && (i = R(t.coordSysDims, function(e) {
		var n = { name: e }, r = t.axisMap.get(e);
		return r && (n.type = ZS(r.get("type"))), n;
	})), i ||= r && (r.getDimensionsInfo ? r.getDimensionsInfo() : r.dimensions.slice()) || ["x", "y"], i;
}
function PC(e, t, n) {
	var r, i;
	return n && L(e, function(e, a) {
		var o = e.coordDim, s = n.categoryAxisMap.get(o);
		s && (r ??= a, e.ordinalMeta = s.getOrdinalMeta(), t && (e.createInvertedIndices = !0)), e.otherDims.itemName != null && (i = !0);
	}), !i && r != null && (e[r].otherDims.itemName = 0), r;
}
function FC(e, t, n) {
	n ||= {};
	var r = t.getSourceManager(), i, a = !1;
	e ? (a = !0, i = c_(e)) : (i = r.getSource(), a = i.sourceFormat === Yl);
	var o = EC(t), s = NC(t, o), c = n.useEncodeDefaulter, l = U(c) ? c : c ? V(rg, s, t) : null, u = {
		coordDimensions: s,
		generateCoord: n.generateCoord,
		encodeDefine: t.getEncode(),
		encodeDefaulter: l,
		canOmitUnusedDimensions: !a
	}, d = SC(i, u), f = PC(d.dimensions, n.createInvertedIndices, o), p = a ? null : r.getSharedDataStore(d), m = kC(t, {
		schema: d,
		store: p
	}), h = new xC(d, t);
	h.setCalculationInfo(m);
	var g = f != null && IC(i) ? function(e, t, n, r) {
		return r === f ? n : this.defaultDimValueGetter(e, t, n, r);
	} : null;
	return h.hasItemOption = !1, h.initData(a ? i : p, null, g), h;
}
function IC(e) {
	if (e.sourceFormat === "original") return !H(Co(LC(e.data || [])));
}
function LC(e) {
	for (var t = 0; t < e.length && e[t] == null;) t++;
	return e[t];
}
//#endregion
//#region node_modules/echarts/lib/scale/Scale.js
var RC = function() {
	function e() {}
	return e.prototype.isBlank = function() {
		return this._isBlank;
	}, e.prototype.setBlank = function(e) {
		this._isBlank = e;
	}, e;
}();
Ts(RC);
//#endregion
//#region node_modules/echarts/lib/data/OrdinalMeta.js
var zC = 0, BC = function() {
	function e(e) {
		this.categories = e.categories || [], this._needCollect = e.needCollect, this._deduplication = e.deduplication, this.uid = ++zC, this._onCollect = e.onCollect;
	}
	return e.createByAxisModel = function(t) {
		var n = t.option, r = n.data, i = r && R(r, VC);
		return new e({
			categories: i,
			needCollect: !i,
			deduplication: n.dedplication !== !1
		});
	}, e.prototype.getOrdinal = function(e) {
		return this._getOrCreateMap().get(e);
	}, e.prototype.parseAndCollect = function(e) {
		var t, n = this._needCollect;
		if (!W(e) && !n) return e;
		if (n && !this._deduplication) return t = this.categories.length, this.categories[t] = e, this._onCollect && this._onCollect(e, t), t;
		var r = this._getOrCreateMap();
		return t = r.get(e), t ?? (n ? (t = this.categories.length, this.categories[t] = e, r.set(e, t), this._onCollect && this._onCollect(e, t)) : t = NaN), t;
	}, e.prototype._getOrCreateMap = function() {
		return this._map ||= q(this.categories);
	}, e;
}();
function VC(e) {
	return G(e) && e.value != null ? e.value : e + "";
}
var HC = z({
	needTransform: 1,
	normalize: 1,
	scale: 1,
	transformIn: 1,
	transformOut: 1,
	contain: 1,
	getExtent: 1,
	getExtentUnsafe: 1,
	setExtent: 1,
	setExtent2: 1,
	getFilter: 1,
	sanitize: 1,
	getDefaultStartValue: 1,
	freeze: 1
});
function UC(e, t, n) {
	var r;
	e ||= {};
	var i = Om();
	if (i) {
		var a = i.createBreakScaleMapper(t, n);
		a.hasBreaks() && (L(HC, function(t) {
			a[t] && (e[t] = B(a[t], a));
		}), r = a);
	}
	return r ?? XC(e, n), {
		brk: r,
		mapper: e
	};
}
function WC(e, t) {
	L(HC, function(n) {
		e[n] = t[n];
	});
}
function GC(e, t) {
	e.freeze = je;
}
function KC(e) {
	return e.getExtentUnsafe(0, 2);
}
function qC(e, t) {
	return e.getExtentUnsafe(1, t) || e.getExtentUnsafe(0, t);
}
function JC(e) {
	var t = qC(e, 3);
	return t[1] - t[0];
}
function YC(e) {
	var t = e.getExtentUnsafe(0, 3);
	return t[1] - t[0];
}
function XC(e, t) {
	var n = e || {}, r = [];
	return n._extents = r, r[0] = t ? t.slice() : Xo(), M(n, ZC), n;
}
var ZC = {
	needTransform: function() {
		return !1;
	},
	normalize: function(e) {
		var t = this._extents[1] || this._extents[0];
		return t[1] === t[0] ? .5 : (e - t[0]) / (t[1] - t[0]);
	},
	scale: function(e) {
		var t = this._extents[1] || this._extents[0];
		return e * (t[1] - t[0]) + t[0];
	},
	transformIn: function(e) {
		return e;
	},
	transformOut: function(e) {
		return e;
	},
	contain: function(e) {
		var t = qC(this, null);
		return e >= t[0] && e <= t[1];
	},
	getExtent: function() {
		return this._extents[0].slice();
	},
	getExtentUnsafe: function(e) {
		return this._extents[e];
	},
	setExtent: function(e, t) {
		QC(this._extents, 0, e, t);
	},
	setExtent2: function(e, t, n) {
		var r = this._extents;
		r[e] || (r[e] = r[0].slice()), QC(r, e, t, n);
	},
	freeze: function() {}
};
function QC(e, t, n, r) {
	ns(n, r) && (e[t][0] = n, e[t][1] = r);
}
//#endregion
//#region node_modules/echarts/lib/scale/helper.js
function $C(e) {
	return ew(e) || nw(e);
}
function ew(e) {
	return e.type === "interval";
}
function tw(e) {
	return e.type === "time";
}
function nw(e) {
	return e.type === "log";
}
function rw(e) {
	return e.type === "ordinal";
}
function iw(e) {
	var t = no(e), n = Fa(10, t), r = Ma(e / n);
	return r ? r === 2 ? r = 3 : r === 3 ? r = 5 : r *= 2 : r = 1, Y(r * n, -t);
}
function aw(e) {
	return Ka(e) + 2;
}
function ow(e, t) {
	return Ia(e) / Ia(t);
}
function sw(e, t, n) {
	var r = n && n.lookup;
	if (r) {
		for (var i = 0; i < r.from.length; i++) if (e === r.from[i]) return r.to[i];
	}
	return Fa(t, e);
}
function cw(e, t, n) {
	var r = e.slice();
	if (r[0] === r[1]) {
		var i = n && n.ctnShp;
		if (r[0] !== 0) {
			var a = ja(r[0]);
			t[1] || (r[1] += a / 2), r[0] -= a / 2;
		} else i && (r[0] = -1), r[1] = 1;
	}
	return (!ts(r[0]) || !ts(r[1])) && (r[0] = 0, r[1] = 1), r[1] < r[0] && r.reverse(), r;
}
function lw(e, t) {
	return [e[0] !== t[0], e[1] !== t[1]];
}
function uw(e, t) {
	return e ||= t, Ma(Aa(e, 1));
}
function dw(e, t, n) {
	var r = KC(e), i = r[0], a = e.count(), o = Math.max((t || 0) + 1, 1);
	i !== 0 && o > 1 && a / o > 2 && (i = Math.round(Math.ceil(i / o) * o)), i !== r[0] && c(r[0], !0, !0);
	for (var s = i; s <= r[1]; s += o) c(s, !1, s === r[0] || s === r[1]);
	s - o !== r[1] && c(r[1], !0, !0);
	function c(e, t, r) {
		n({
			value: e,
			offInterval: t
		}, r);
	}
}
//#endregion
//#region node_modules/echarts/lib/scale/Ordinal.js
var fw = function(e) {
	r(t, e);
	function t(n) {
		var r = e.call(this) || this;
		r.type = "ordinal", r.parse = t.parse, WC(r, t.decoratedMethods);
		var i = n.ordinalMeta;
		i ||= new BC({}), H(i) && (i = new BC({ categories: R(i, function(e) {
			return G(e) ? e.value : e;
		}) })), r._ordinalMeta = i;
		var a = UC(null, null, n.extent || [0, i.categories.length - 1]);
		return r._mapper = a.mapper, GC(r, a.mapper), r;
	}
	return t.parse = function(e) {
		return e == null ? e = NaN : W(e) ? (e = this._ordinalMeta.getOrdinal(e), e ??= NaN) : e = Ma(e), e;
	}, t.prototype.getTicks = function() {
		var e = [];
		return dw(this, 0, function(t) {
			e.push(t);
		}), e;
	}, t.prototype.getMinorTicks = function(e) {}, t.prototype.setSortInfo = function(e) {
		if (e == null) {
			this._ordinalNumbersByTick = this._ticksByOrdinalNumber = null;
			return;
		}
		for (var t = e.ordinalNumbers, n = this._ordinalNumbersByTick = [], r = this._ticksByOrdinalNumber = [], i = 0, a = this._ordinalMeta.categories.length, o = ka(a, t.length); i < o; ++i) {
			var s = n[i] = t[i];
			r[s] = i;
		}
		for (var c = 0; i < a; ++i) {
			for (; r[c] != null;) c++;
			n[i] = c, r[c] = i;
		}
	}, t.prototype._getTickNumber = function(e) {
		var t = this._ticksByOrdinalNumber;
		return t && e >= 0 && e < t.length ? t[e] : e;
	}, t.prototype.getRawOrdinalNumber = function(e) {
		var t = this._ordinalNumbersByTick;
		return t && e >= 0 && e < t.length ? t[e] : e;
	}, t.prototype.getLabel = function(e) {
		if (!this.isBlank()) {
			var t = this.getRawOrdinalNumber(e.value), n = this._ordinalMeta.categories[t];
			return n == null ? "" : n + "";
		}
	}, t.prototype.count = function() {
		var e = KC(this._mapper);
		return e[1] - e[0] + 1;
	}, t.prototype.getOrdinalMeta = function() {
		return this._ordinalMeta;
	}, t.type = "ordinal", t.decoratedMethods = {
		needTransform: function() {
			return this._mapper.needTransform();
		},
		contain: function(e) {
			return this._mapper.contain(this._getTickNumber(e)) && e >= 0 && e < this._ordinalMeta.categories.length;
		},
		normalize: function(e) {
			return this._mapper.normalize(this._getTickNumber(e));
		},
		scale: function(e) {
			return this.getRawOrdinalNumber(Ma(this._mapper.scale(e)));
		},
		transformIn: function(e, t) {
			return this._mapper.transformIn(this._getTickNumber(e), t);
		},
		transformOut: function(e, t) {
			return this.getRawOrdinalNumber(this._mapper.transformOut(e, t));
		},
		getExtent: function() {
			return this._mapper.getExtent();
		},
		getExtentUnsafe: function(e, t) {
			return this._mapper.getExtentUnsafe(e, t);
		},
		setExtent: function(e, t) {
			return this._mapper.setExtent(e, t);
		},
		setExtent2: function(e, t, n) {
			return this._mapper.setExtent2(e, t, n);
		}
	}, t;
}(RC);
RC.registerClass(fw);
//#endregion
//#region node_modules/echarts/lib/scale/minorTicks.js
function pw(e, t, n, r) {
	for (var i = e.getTicks({ expandToNicedExtent: !0 }), a = [], o = e.getExtent(), s = 1; s < i.length; s++) {
		var c = i[s], l = i[s - 1];
		if (!(l.break || c.break)) {
			for (var u = 0, d = [], f = (c.value - l.value) / t, p = aw(f); u < t - 1;) {
				var m = Y(l.value + (u + 1) * f, p);
				m > o[0] && m < o[1] && d.push(m), u++;
			}
			var h = Om();
			h && h.pruneTicksByBreak("auto", d, n, function(e) {
				return e;
			}, r, o), a.push(d);
		}
	}
	return a;
}
//#endregion
//#region node_modules/echarts/lib/scale/Interval.js
var mw = function(e) {
	r(t, e);
	function t(n) {
		var r = e.call(this) || this;
		return r.type = "interval", r.parse = t.parse, n ||= {}, r.brk = UC(r, km(r, n), null).brk, r._cfg = {
			interval: 0,
			intervalPrecision: 2,
			intervalCount: void 0,
			niceExtent: void 0
		}, r;
	}
	return t.parse = function(e) {
		return e == null || e === "" ? NaN : Number(e);
	}, t.prototype.getConfig = function() {
		return k(this._cfg);
	}, t.prototype.setConfig = function(e) {
		var t = KC(this);
		this._cfg = e = k(e), e.niceExtent ?? (e.niceExtent = t.slice()), e.intervalPrecision ?? (e.intervalPrecision = aw(e.interval));
	}, t.prototype.getTicks = function(e) {
		e ||= {};
		var t = this._cfg, n = t.interval, r = KC(this), i = t.niceExtent, a = t.intervalPrecision, o = Om(), s = this.brk, c = o && s, l = [];
		if (!n) return l;
		if (e.breakTicks === "only_break" && c) return o.addBreaksToTicks(l, s.breaks, r), l;
		var u = 3e3;
		r[0] < i[0] && l.push({ value: e.expandToNicedExtent ? Y(i[0] - n, a) : r[0] });
		for (var d = function(e, t) {
			return Ma((t - e) / n);
		}, f = t.intervalCount, p = i[0], m = 0;; m++) {
			if (f == null) {
				if (p > i[1] || !isFinite(p) || !isFinite(i[1])) break;
			} else {
				if (m > f) break;
				p = ka(p, i[1]), m === f && (p = i[1]);
			}
			if (l.push({ value: p }), p = Y(p + n, a), s) {
				var h = s.calcNiceTickMultiple(p, d);
				h >= 0 && (p = Y(p + h * n, a));
			}
			if (l.length > 0 && p === l[l.length - 1].value) break;
			if (l.length > u) return [];
		}
		var g = l.length ? l[l.length - 1].value : i[1];
		return r[1] > g && l.push({ value: e.expandToNicedExtent ? Y(g + n, a) : r[1] }), c && o.pruneTicksByBreak(e.pruneByBreak, l, s.breaks, function(e) {
			return e.value;
		}, t.interval, r), c && e.breakTicks !== "none" && o.addBreaksToTicks(l, s.breaks, r), l;
	}, t.prototype.getMinorTicks = function(e) {
		return pw(this, e, Am(this), this._cfg.interval);
	}, t.prototype.getLabel = function(e, t) {
		if (e == null) return "";
		var n = t && t.precision;
		return n == null ? n = Ka(e.value) || 0 : n === "auto" && (n = this._cfg.intervalPrecision), mh(Y(e.value, n, !0));
	}, t.type = "interval", t;
}(RC);
RC.registerClass(mw);
//#endregion
//#region node_modules/echarts/lib/scale/Time.js
var hw = function(e, t, n, r) {
	for (; n < r;) {
		var i = n + r >>> 1;
		e[i][1] < t ? n = i + 1 : r = i;
	}
	return n;
}, gw = function(e) {
	r(t, e);
	function t(n) {
		var r = e.call(this) || this;
		return r.type = "time", r.parse = t.parse, r._locale = n.locale, r._useUTC = n.useUTC, r._interval = 0, r.brk = UC(r, km(r, n), null).brk, r;
	}
	return t.prototype.getLabel = function(e) {
		return Xm(e.value, Vm[Ym(qm(this._minLevelUnit))] || Vm.second, this._useUTC, this._locale);
	}, t.prototype.getFormattedLabel = function(e, t, n) {
		return Zm(e, t, n, this._locale, this._useUTC);
	}, t.prototype.getTicks = function(e) {
		e ||= {};
		var t = this._interval, n = KC(this), r = Om(), i = this.brk, a = r && i, o = [];
		if (!t) return o;
		var s = this._useUTC;
		if (a && e.breakTicks === "only_break") return Om().addBreaksToTicks(o, i.breaks, n), o;
		o = Ew(this._minLevelUnit, this._approxInterval, s, n, YC(this), i);
		var c = Hm.length - 1, l = 0;
		return L(o, function(e) {
			e.time && (c = Math.min(c, P(Hm, e.time.upperTimeUnit)), l = Math.max(l, e.time.level));
		}), a && Om().pruneTicksByBreak(e.pruneByBreak, o, i.breaks, function(e) {
			return e.value;
		}, this._approxInterval, n), a && e.breakTicks !== "none" && Om().addBreaksToTicks(o, i.breaks, n, function(e) {
			for (var t = Math.max(P(Hm, Qm(e.vmin, s)), P(Hm, Qm(e.vmax, s))), n = 0, r = 0; r < Hm.length; r++) if (!vw(Hm[r], e.vmin, e.vmax, s)) {
				n = r;
				break;
			}
			var i = Math.min(n, c);
			return {
				level: l,
				lowerTimeUnit: Hm[Math.max(i, t)],
				upperTimeUnit: Hm[i]
			};
		}), o;
	}, t.prototype.getMinorTicks = function(e) {
		return pw(this, e, Am(this), this._interval);
	}, t.prototype.setTimeInterval = function(e) {
		this._interval = e.interval, this._approxInterval = e.approxInterval, this._minLevelUnit = e.minLevelUnit;
	}, t.parse = function(e) {
		return se(e) ? Math.round(e) : +eo(e);
	}, t.type = "time", t;
}(RC), _w = [
	["second", Mm],
	["minute", Nm],
	["hour", Pm],
	["quarter-day", Pm * 6],
	["half-day", Pm * 12],
	["day", Fm * 1.2],
	["half-week", Fm * 3.5],
	["week", Fm * 7],
	["month", Fm * 31],
	["quarter", Fm * 95],
	["half-year", Im / 2],
	["year", Im]
];
function vw(e, t, n, r) {
	return $m(new Date(t), e, r).getTime() === $m(new Date(n), e, r).getTime();
}
function yw(e, t) {
	return e /= Fm, e > 16 ? 16 : e > 7.5 ? 7 : e > 3.5 ? 4 : e > 1.5 ? 2 : 1;
}
function bw(e) {
	var t = 30 * Fm;
	return e /= t, e > 6 ? 6 : e > 3 ? 3 : e > 2 ? 2 : 1;
}
function xw(e) {
	return e /= Pm, e > 12 ? 12 : e > 6 ? 6 : e > 3.5 ? 4 : e > 2 ? 2 : 1;
}
function Sw(e, t) {
	return e /= t ? Nm : Mm, e > 30 ? 30 : e > 20 ? 20 : e > 15 ? 15 : e > 10 ? 10 : e > 5 ? 5 : e > 2 ? 2 : 1;
}
function Cw(e) {
	return Aa(ro(e, !0), 1);
}
function ww(e, t, n) {
	var r = Math.max(0, P(Hm, t) - 1);
	return $m(new Date(e), Hm[r], n).getTime();
}
function Tw(e, t) {
	var n = /* @__PURE__ */ new Date(0);
	n[e](1);
	var r = n.getTime();
	n[e](1 + t);
	var i = n.getTime() - r;
	return function(e, t) {
		return Math.max(0, Math.round((t - e) / i));
	};
}
function Ew(e, t, n, r, i, a) {
	var o = Um, s = 0;
	function c(e, t, n, i, o, c, l) {
		for (var u = Tw(o, e), d = t, f = new Date(d); d < n && d <= r[1] && (l.push({ value: d }), !(s++ > 3e3));) if (f[o](f[i]() + e), d = f.getTime(), a) {
			var p = a.calcNiceTickMultiple(d, u);
			p > 0 && (f[o](f[i]() + p * e), d = f.getTime());
		}
		l.push({
			value: d,
			notAdd: d > r[1]
		});
	}
	function l(e, i, a) {
		var o = [], s = !i.length;
		if (!vw(qm(e), r[0], r[1], n)) {
			s && (i = [{ value: ww(r[0], e, n) }, { value: r[1] }]);
			for (var l = 0; l < i.length - 1; l++) {
				var u = i[l].value, d = i[l + 1].value;
				if (u !== d) {
					var f = void 0, p = void 0, m = void 0, h = !1;
					switch (e) {
						case "year":
							f = Math.max(1, Math.round(t / Fm / 365)), p = eh(n), m = sh(n);
							break;
						case "half-year":
						case "quarter":
						case "month":
							f = bw(t), p = th(n), m = ch(n);
							break;
						case "week":
						case "half-week":
						case "day":
							f = yw(t, 31), p = nh(n), m = lh(n), h = !0;
							break;
						case "half-day":
						case "quarter-day":
						case "hour":
							f = xw(t), p = rh(n), m = uh(n);
							break;
						case "minute":
							f = Sw(t, !0), p = ih(n), m = dh(n);
							break;
						case "second":
							f = Sw(t, !1), p = ah(n), m = fh(n);
							break;
						case "millisecond": f = Cw(t), p = oh(n), m = ph(n);
					}
					d >= r[0] && u <= r[1] && c(f, u, d, p, m, h, o), e === "year" && a.length > 1 && l === 0 && a.unshift({ value: a[0].value - f });
				}
			}
			for (var l = 0; l < o.length; l++) a.push(o[l]);
		}
	}
	for (var u = [], d = [], f = 0, p = 0, m = 0; m < o.length; ++m) {
		var h = qm(o[m]);
		if (Jm(o[m]) && (l(o[m], u[u.length - 1] || [], d), h !== (o[m + 1] ? qm(o[m + 1]) : null))) {
			if (d.length) {
				p = f, d.sort(function(e, t) {
					return e.value - t.value;
				});
				for (var g = [], _ = 0; _ < d.length; ++_) {
					var v = d[_].value;
					(_ === 0 || d[_ - 1].value !== v) && (g.push(d[_]), v >= r[0] && v <= r[1] && f++);
				}
				var y = i / t;
				if (f > y * 1.5 && p > y / 1.5 || (u.push(g), f > y || e === o[m])) break;
			}
			d = [];
		}
	}
	for (var b = re(R(u, function(e) {
		return re(e, function(e) {
			return e.value >= r[0] && e.value <= r[1] && !e.notAdd;
		});
	}), function(e) {
		return e.length > 0;
	}), x = b.length - 1, S = [], m = 0; m < b.length; ++m) for (var C = b[m], w = 0; w < C.length; ++w) {
		var T = Qm(C[w].value, n);
		S.push({
			value: C[w].value,
			time: {
				level: x - m,
				upperTimeUnit: T,
				lowerTimeUnit: T
			}
		});
	}
	ss(S, cs, null), S.sort(function(e, t) {
		return e.value - t.value;
	});
	var E = S[0], D = S[S.length - 1], O = Qm(r[0], n), k = Qm(r[1], n);
	return (!E || E.value > r[0]) && S.unshift({
		value: r[0],
		time: {
			level: 0,
			upperTimeUnit: O,
			lowerTimeUnit: O
		},
		notNice: !0
	}), (!D || D.value < r[1]) && S.push({
		value: r[1],
		time: {
			level: 0,
			upperTimeUnit: k,
			lowerTimeUnit: k
		},
		notNice: !0
	}), S;
}
var Dw = function(e, t) {
	var n = e.getExtent();
	if (n[0] === n[1] && (n[0] -= Fm, n[1] += Fm), n[1] === -Infinity && n[0] === Infinity) {
		var r = /* @__PURE__ */ new Date();
		n[1] = +new Date(r.getFullYear(), r.getMonth(), r.getDate()), n[0] = n[1] - Fm;
	}
	e.setExtent(n[0], n[1]);
	var i = uw(t.splitNumber, 10), a = YC(e) / i, o = t.minInterval, s = t.maxInterval;
	o != null && a < o && (a = o), s != null && a > s && (a = s);
	var c = _w.length, l = Math.min(hw(_w, a, 0, c), c - 1), u = _w[l][1], d = _w[Math.max(l - 1, 0)][0];
	e.setTimeInterval({
		approxInterval: a,
		interval: u,
		minLevelUnit: d
	});
};
RC.registerClass(gw);
//#endregion
//#region node_modules/echarts/lib/scale/Log.js
var Ow = 0, kw = 1, Aw = 2, jw = function(e) {
	r(t, e);
	function t(n) {
		var r = e.call(this) || this;
		r.type = "log", r.parse = mw.parse, r.base = n.logBase || 10;
		var i = [], a = [], o = r._lookup = {
			from: i,
			to: a
		};
		i[Ow] = i[kw] = a[Ow] = a[kw] = NaN, WC(r, t.mapperMethods);
		var s = Om(), c = n.breakOption, l = { lookup: o };
		return s && s.parseAxisBreakOptionInwardTransform(c, r, { noNegative: !0 }, Aw, l), r.powStub = new mw({ breakParsed: l.original }), r.intervalStub = new mw({ breakParsed: l.transformed }), GC(r, r.intervalStub), r;
	}
	return t.prototype.getTicks = function(e) {
		var t = this.base, n = this.powStub, r = Om(), i = this.intervalStub, a = { lookup: {
			from: i.getExtent(),
			to: n.getExtent()
		} };
		return R(i.getTicks(e || {}), function(e) {
			var i = e.value, o = sw(i, t, a), s;
			if (r) {
				var c = r.getTicksBreakOutwardTransform(this, e, Am(n), this._lookup);
				c && (s = c.vBreak, o = c.tickVal);
			}
			return {
				value: o,
				break: s
			};
		}, this);
	}, t.prototype.getMinorTicks = function(e) {
		return pw(this, e, Am(this.powStub), this.intervalStub.getConfig().interval);
	}, t.prototype.getLabel = function(e, t) {
		return this.intervalStub.getLabel(e, t);
	}, t.type = "log", t.mapperMethods = {
		needTransform: function() {
			return !0;
		},
		normalize: function(e) {
			return this.intervalStub.normalize(ow(e, this.base));
		},
		scale: function(e) {
			return sw(this.intervalStub.scale(e), this.base, null);
		},
		transformIn: function(e, t) {
			return e = ow(e, this.base), t && t.depth === 2 ? e : this.intervalStub.transformIn(e, t);
		},
		transformOut: function(e, t) {
			var n = t ? t.depth : null;
			return Mw.depth = n, Nw.lookup = this._lookup, sw(n === 2 ? e : this.intervalStub.transformOut(e, Mw), this.base, Nw);
		},
		contain: function(e) {
			return this.powStub.contain(e);
		},
		setExtent: function(e, t) {
			this.setExtent2(0, e, t);
		},
		setExtent2: function(e, t, n) {
			if (!(!ns(t, n) || t <= 0 || n <= 0)) {
				var r = Pw, i = Pw;
				if (e === 0) {
					var a = this._lookup;
					r = a.to, i = a.from;
				}
				this.powStub.setExtent2(e, r[Ow] = t, r[kw] = n);
				var o = this.base;
				this.intervalStub.setExtent2(e, i[Ow] = ow(t, o), i[kw] = ow(n, o));
			}
		},
		getFilter: function() {
			return { g: 0 };
		},
		sanitize: function(e, t) {
			return ns(t[0], t[1]) && lo(e) && e <= 0 && (e = t[0]), e;
		},
		getDefaultStartValue: function() {
			return 1;
		},
		getExtent: function() {
			return this.powStub.getExtent();
		},
		getExtentUnsafe: function(e, t) {
			return t === null ? this.powStub.getExtentUnsafe(e, null) : this.intervalStub.getExtentUnsafe(e, t);
		}
	}, t;
}(RC);
RC.registerClass(jw);
var Mw = {}, Nw = {}, Pw = [], Fw = {
	value: 1,
	category: 1,
	time: 1,
	log: 1
}, Iw = X();
function Lw(e) {
	var t = e.get("type");
	return (t == null || !Ae(Fw, t) && !RC.getClass(t)) && (t = "value"), t;
}
function Rw(e, t, n) {
	var r = Om(), i;
	switch (r && (i = Yw(e, t, n)), t) {
		case "category": return new fw({
			ordinalMeta: e.getOrdinalMeta ? e.getOrdinalMeta() : e.getCategories(),
			extent: Xo()
		});
		case "time": return new gw({
			locale: e.ecModel.getLocaleModel(),
			useUTC: e.ecModel.get("useUTC"),
			breakOption: i
		});
		case "log": return new jw({
			logBase: e.get("logBase"),
			breakOption: i
		});
		case "value": return new mw({ breakOption: i });
		default: return new ((RC.getClass(t)) || mw)({});
	}
}
function zw(e, t, n) {
	var r = n ? qC(e, null) : e.getExtentUnsafe(0, null), i = r[0], a = r[1];
	return ns(i, a) ? i === t || a === t ? 2 : i < t && a > t ? 1 : 3 : 3;
}
function Bw(e) {
	Iw(e).noOnMyZero = !0;
}
function Vw(e) {
	return Iw(e).noOnMyZero;
}
function Hw(e) {
	var t = e.getLabelModel().get("formatter");
	if (e.type === "time") {
		var n = Wm(t);
		return function(t, r) {
			return e.scale.getFormattedLabel(t, r, n);
		};
	}
	if (W(t)) return function(n) {
		var r = e.scale.getLabel(n);
		return t.replace("{value}", r ?? "");
	};
	if (U(t)) {
		if (e.type === "category") return function(n, r) {
			return t(Uw(e, n), n.value - e.scale.getExtent()[0], null);
		};
		var r = Om();
		return function(n, i) {
			var a = null;
			return r && (a = r.makeAxisLabelFormatterParamBreak(a, n.break)), t(Uw(e, n), i, a);
		};
	}
	return function(t) {
		return e.scale.getLabel(t);
	};
}
function Uw(e, t) {
	var n = e.scale;
	return rw(n) ? n.getLabel(t) : t.value;
}
function Ww(e) {
	return e.get("interval") ?? "auto";
}
function Gw(e) {
	return e.type === "category" && Ww(e.getLabelModel()) === 0;
}
function Kw(e, t) {
	var n = {};
	return L(e.mapDimensionsAll(t), function(t) {
		n[MC(e, t)] = !0;
	}), z(n);
}
function qw(e) {
	return e === "middle" || e === "center";
}
function Jw(e) {
	return e.getShallow("show");
}
function Yw(e, t, n) {
	var r = e.get("breaks", !0);
	if (r != null) return !Om() || !n || !Xw(t) ? void 0 : r;
}
function Xw(e) {
	return e !== "category";
}
function Zw(e, t, n, r, i, a) {
	var o = nw(e), s = o ? e.intervalStub : e;
	if (s.setExtent(r[0], r[1]), o) {
		var c = e.powStub, l = { depth: 2 }, u = e.transformOut(r[0], l), d = e.transformOut(r[1], l), f = lw(n, r);
		t[0] && !f[0] && (u = i[0]), t[1] && !f[1] && (d = i[1]), c.setExtent(u, d);
	}
	s.setConfig(a);
}
function Qw(e, t) {
	return rw(e) ? e.getRawOrdinalNumber(t.value) : t.value;
}
function $w(e, t) {
	return rw(e) && !!t.get("boundaryGap");
}
//#endregion
//#region node_modules/echarts/lib/coord/axisModelCommonMixin.js
var eT = function() {
	function e() {}
	return e.prototype.needIncludeZero = function() {
		return !this.option.scale;
	}, e.prototype.getCoordSysModel = function() {}, e;
}();
as();
var tT = X();
X();
function nT(e, t) {
	var n = e.model, r = tT(sb(n.ecModel)).keyed, i = r && r.get(t);
	return i && i.get(n.uid);
}
function rT(e, t) {
	return oT(nT(e, t));
}
function iT(e, t) {
	var n = [];
	return aT(e.model.ecModel, function(e) {
		for (var r = 0; r < t.length; r++) t[r] && e.serByIdx[t[r].seriesIndex] && n.push(oT(e));
	}), n;
}
function aT(e, t) {
	var n = tT(sb(e)).keyed;
	n && n.each(function(e, n) {
		e.each(function(e, r) {
			t(e, n, r);
		});
	});
}
function oT(e) {
	return { liPosMinGap: e ? e.liPosMinGap : void 0 };
}
function sT(e, t) {
	var n = e.model.ecModel, r = tT(sb(n)).axSer;
	r && cT(n, r.get(e.model.uid), t);
}
function cT(e, t, n) {
	if (t) for (var r = 0; r < t.length; r++) {
		var i = t[r];
		e.isSeriesFiltered(i) || n(i);
	}
}
function lT(e, t) {
	var n = e.model, r = tT(sb(n.ecModel)).keys;
	r && L(r.get(n.uid), function(e) {
		t(e);
	});
}
function uT(e, t, n) {
	if (e) {
		var r = t.ecModel, i = tT(sb(r)), a = e.model.uid, o = i.axSer ||= q();
		(o.get(a) || o.set(a, [])).push(t);
		var s = t.subType, c = t.getBaseAxis() === e, l = fT.get(dT(s, c, n)) || fT.get(dT(s, c, null));
		if (l) {
			var u = i.keyed ||= q(), d = i.keys ||= q(), f = l.key, p = u.get(f) || u.set(f, q()), m = p.get(a);
			m || (m = p.set(a, {
				axis: e,
				sers: [],
				serByIdx: []
			}), m.metrics = l.getMetrics(e), (d.get(a) || d.set(a, [])).push(f)), m.sers.push(t), m.serByIdx[t.seriesIndex] = t;
		}
	}
}
function dT(e, t, n) {
	return e + "|&" + K(t, !0) + "|&" + (n || "");
}
var fT = q(), pT = X(), mT = 3, hT = function() {
	function e(e, t, n, r, i) {
		var a = rw(e), o = a ? t.getCategories().length : null, s;
		if (a) {
			var c = t.getCategories(!0);
			s = c && !c.length;
		}
		var l = n.slice();
		(ew(e) || nw(e) || tw(e)) && (Qo(l, _T(e, t.get("dataMin", !0))), $o(l, _T(e, t.get("dataMax", !0)))), rs(l) || (l[0] = l[1] = NaN);
		var u = [], d = [!1, !1], f = t.get("min", !0);
		f === "dataMin" ? (u[0] = l[0], d[0] = !0) : (u[0] = _T(e, U(f) ? f({
			min: l[0],
			max: l[1]
		}) : f), d[0] = u[0] != null);
		var p = t.get("max", !0);
		p === "dataMax" ? (u[1] = l[1], d[1] = !0) : (u[1] = _T(e, U(p) ? p({
			min: l[0],
			max: l[1]
		}) : p), d[1] = u[1] != null);
		var m = vT(e, t), h = a ? null : l[1] - l[0] || Math.abs(l[0]);
		u[0] ??= a ? s ? l[0] : o ? 0 : NaN : l[0] - m[0] * h, u[1] ??= a ? s ? l[1] : o ? o - 1 : NaN : l[1] + m[1] * h, !ts(u[0]) && (u[0] = NaN), !ts(u[1]) && (u[1] = NaN);
		var g = s || pe(u[0]) || pe(u[1]) || a && !o, _ = ew(e), v = _ && t.needIncludeZero && t.needIncludeZero();
		v && (u[0] > 0 && u[1] > 0 && !d[0] && (u[0] = 0), u[0] < 0 && u[1] < 0 && !d[1] && (u[1] = 0));
		var y = !1;
		u[0] > u[1] && (u.reverse(), y = !0);
		var b = _T(e, t.get("startValue", !0)), x = b != null;
		!lo(b) && r && (b = e.getDefaultStartValue ? e.getDefaultStartValue() : 0), lo(b) && (x || !_ || v) && (b < u[0] && !d[0] ? (u[0] = b, d[0] = !0) : b > u[1] && !d[1] && (u[1] = b, d[1] = !0)), gT(this._i = {
			scale: e,
			dataMM: l,
			noZoomEffMM: u,
			zoomMM: [],
			fixMM: d,
			zoomFixMM: [!1, !1],
			startValue: b,
			isBlank: g,
			incl0: v,
			tggAxInv: y,
			ctnShp: i
		}, u);
	}
	return e.prototype.makeNoZoom = function() {
		return this._i.noZoomEffMM.slice();
	}, e.prototype.makeFinal = function() {
		var e = this._i, t = e.zoomMM, n = e.noZoomEffMM, r = e.zoomFixMM, i = e.fixMM, a = {
			fixMM: i,
			zoomFixMM: r,
			isBlank: e.isBlank,
			incl0: e.incl0,
			tggAxInv: e.tggAxInv,
			ctnShp: e.ctnShp,
			effMM: n.slice()
		}, o = a.effMM;
		return t[0] != null && (o[0] = t[0], i[0] = r[0] = !0), t[1] != null && (o[1] = t[1], i[1] = r[1] = !0), gT(e, o), a;
	}, e.prototype.makeRenderInfo = function() {
		return { startValue: this._i.startValue };
	}, e.prototype.setZoomMM = function(e, t) {
		this._i.zoomMM[e] = t;
	}, e;
}();
function gT(e, t) {
	var n = e.scale, r = e.dataMM;
	n.sanitize && (t[0] = n.sanitize(t[0], r), t[1] = n.sanitize(t[1], r), is(t));
}
function _T(e, t) {
	return t == null ? null : pe(t) ? NaN : e.parse(t);
}
function vT(e, t) {
	var n;
	if (rw(e)) n = [0, 0];
	else {
		var r = t.get("boundaryGap");
		typeof r == "boolean" && (r = null), n = H(r) ? r : [r, r];
	}
	return [yT(n[0]), yT(n[1])];
}
function yT(e) {
	return $i(typeof e == "boolean" ? 0 : e, 1) || 0;
}
function bT(e) {
	var t = pT(e.scale);
	return t.extent ||= Xo(), t;
}
function xT(e, t) {
	bT(e).dimIdxInCoord = t.get(e.dim);
}
function ST(e, t) {
	var n = e.scale, r = e.model, i = e.dim;
	n.rawExtentInfo || CT(n, e, i, r, t);
}
function CT(e, t, n, r, i) {
	var a = bT(t), o = a.extent, s = !1;
	sT(t, function(r) {
		if (r.boxCoordinateSystem) {
			var i = Oh(r).coord, c = a.dimIdxInCoord;
			if (c >= 0 && H(i)) {
				var l = i[c];
				l != null && !H(l) && Zo(o, e.parse(l));
			}
		} else if (r.coordinateSystem) {
			var u = r.getData();
			if (u) {
				var d = e.getFilter ? e.getFilter() : null;
				L(Kw(u, n), function(e) {
					es(o, u.getApproximateExtent(e, d));
				});
			}
			r.__requireStartValue && r.__requireStartValue(t) && (s = !0);
		}
	});
	var c = OT(e, t, r);
	TT(e, new hT(e, r, o, s, c), i), a.extent = null;
}
function wT(e, t) {
	var n = e.scale;
	TT(n, new hT(n, e.model, t, !1, !1), mT);
}
function TT(e, t, n) {
	e.rawExtentInfo = t, t.from = n;
}
var ET = q();
function DT(e, t, n, r, i) {
	e.rawExtentInfo || wT({
		scale: e,
		model: t
	}, i || Xo());
	var a = e.rawExtentInfo.makeFinal(), o = a.effMM;
	return e.setExtent(o[0], o[1]), e.setBlank(a.isBlank), r && a.tggAxInv && n && !n.get("legacyMinMaxDontInverseAxis") && (r.inverse = !r.inverse), a;
}
function OT(e, t, n) {
	var r = $w(e, n), i = n.get("containShape", !0);
	if (i == null && !r && (i = !0), !i) return !1;
	var a = !1;
	return lT(t, function(e) {
		a = !!ET.get(e) || a;
	}), a;
}
function kT(e, t, n, r) {
	if (n.ctnShp) {
		var i;
		if (lT(e, function(t) {
			var n = ET.get(t);
			if (n) {
				var a = n(e, r);
				a && (i ||= [0, 0], Qo(i, a[0]), $o(i, a[1]), Bw(e));
			}
		}), i) {
			var a = t.getExtent();
			if (rw(t)) e.onBand || t.setExtent2(1, ka(a[0], a[0] + i[0]), Aa(a[1], a[1] + i[1]));
			else {
				var o = a.slice();
				n.zoomFixMM[0] || (o[0] = ka(o[0], t.transformOut(t.transformIn(o[0], null) + i[0], null))), n.zoomFixMM[1] || (o[1] = Aa(o[1], t.transformOut(t.transformIn(o[1], null) + i[1], null))), (o[0] < a[0] || o[1] > a[1]) && t.setExtent2(1, o[0], o[1]);
			}
		}
	}
}
//#endregion
//#region node_modules/echarts/lib/coord/axisNiceTicks.js
function AT(e, t) {
	var n = nw(e), r = n ? e.intervalStub : e, i = t.fixMinMax || [], a = n ? e.getExtent() : null, o = r.getExtent(), s = cw(o, i, t.rawExtentResult);
	r.setExtent(s[0], s[1]), s = r.getExtent();
	var c = n ? MT(r, t) : jT(r, t), l = c.intervalPrecision, u = c.interval, d = t.userInterval;
	d != null && (c.interval = d, c.intervalPrecision = aw(d)), i[0] || (s[0] = Y(Na(s[0] / u) * u, l)), i[1] || (s[1] = Y(Pa(s[1] / u) * u, l)), d != null && (c.niceExtent = s.slice()), Zw(e, i, o, s, a, c);
}
function jT(e, t) {
	var n = uw(t.splitNumber, 5), r = YC(e), i = t.minInterval, a = t.maxInterval, o = ro(r / n, !0);
	i != null && o < i && (o = i), a != null && o > a && (o = a);
	var s = aw(o), c = e.getExtent(), l = [Y(Pa(c[0] / o) * o, s), Y(Na(c[1] / o) * o, s)];
	return {
		interval: o,
		intervalPrecision: s,
		niceExtent: l
	};
}
function MT(e, t) {
	var n = uw(t.splitNumber, 10), r = e.getExtent(), i = YC(e), a = Aa(to(i), 1);
	n / i * a <= .5 && (a *= 10);
	var o = aw(a), s = [Y(Pa(r[0] / a) * a, o), Y(Na(r[1] / a) * a, o)];
	return {
		intervalPrecision: o,
		interval: a,
		niceExtent: s
	};
}
function NT(e) {
	var t = e.scale, n = e.model, r = n.axis, i = n.ecModel;
	PT(t, n, r, i, null);
}
function PT(e, t, n, r, i) {
	var a = DT(e, t, r, n, i), o = ew(e) || tw(e);
	FT(e, {
		splitNumber: t.get("splitNumber"),
		fixMinMax: a.fixMM,
		userInterval: t.get("interval"),
		minInterval: o ? t.get("minInterval") : null,
		maxInterval: o ? t.get("maxInterval") : null,
		rawExtentResult: a
	}), n && r && kT(n, e, a, r);
}
function FT(e, t) {
	IT[e.type](e, t);
}
var IT = {
	interval: AT,
	log: AT,
	time: Dw,
	ordinal: je
}, LT = [], RT = {
	registerPreprocessor: AS,
	registerProcessor: jS,
	registerPostInit: MS,
	registerPostUpdate: NS,
	registerUpdateLifecycle: PS,
	registerAction: FS,
	registerCoordinateSystem: IS,
	registerLayout: LS,
	registerVisual: RS,
	registerTransform: US,
	registerLoading: VS,
	registerMap: HS,
	registerImpl: eb,
	PRIORITY: Mx,
	ComponentModel: Wh,
	ComponentView: Xv,
	SeriesModel: Vv,
	ChartView: ey,
	registerComponentModel: function(e) {
		Wh.registerClass(e);
	},
	registerComponentView: function(e) {
		Xv.registerClass(e);
	},
	registerSeriesModel: function(e) {
		Vv.registerClass(e);
	},
	registerChartView: function(e) {
		ey.registerClass(e);
	},
	registerCustomSeries: function(e, t) {
		rb(e, t);
	},
	registerSubTypeDefaulter: function(e, t) {
		Wh.registerSubTypeDefaulter(e, t);
	},
	registerPainter: function(e, t) {
		Ta(e, t);
	}
};
function zT(e) {
	if (H(e)) {
		L(e, function(e) {
			zT(e);
		});
		return;
	}
	P(LT, e) >= 0 || (LT.push(e), U(e) && (e = { install: e }), e.install(RT));
}
//#endregion
//#region node_modules/echarts/lib/export/api/graphic.js
var BT = /* @__PURE__ */ t({
	Arc: () => vf,
	BezierCurve: () => gf,
	BoundingRect: () => J,
	Circle: () => Fd,
	CompoundPath: () => yf,
	Ellipse: () => Ld,
	Group: () => va,
	Image: () => yl,
	IncrementalDisplayable: () => Nf,
	Line: () => ff,
	LinearGradient: () => xf,
	Polygon: () => sf,
	Polyline: () => lf,
	RadialGradient: () => Sf,
	Rect: () => Dl,
	Ring: () => nf,
	Sector: () => ef,
	Text: () => Ml,
	clipPointsByRect: () => pp,
	clipRectByRect: () => mp,
	createIcon: () => hp,
	extendPath: () => Xf,
	extendShape: () => Jf,
	getShapeClass: () => Qf,
	getTransform: () => sp,
	initProps: () => Rf,
	makeImage: () => ep,
	makePath: () => $f,
	mergePath: () => np,
	registerShape: () => Zf,
	resizePath: () => rp,
	updateProps: () => Lf
}), VT = X(), HT = X(), UT = {
	estimate: 1,
	determine: 2
};
function WT(e) {
	return {
		out: { noPxChangeTryDetermine: [] },
		kind: e
	};
}
function GT(e, t) {
	var n = e.getLabelModel().get("customValues");
	if (n) {
		var r = e.scale;
		return { labels: R(qT(n, r), function(t, n) {
			return {
				formattedLabel: Hw(e)(t, n),
				rawLabel: r.getLabel(t),
				tick: t
			};
		}) };
	}
	return e.type === "category" ? JT(e, t) : ZT(e);
}
function KT(e, t, n) {
	var r = e.scale, i = e.getTickModel().get("customValues");
	return i ? { ticks: qT(i, r) } : e.type === "category" ? XT(e, t) : { ticks: r.getTicks(n) };
}
function qT(e, t) {
	var n = t.getExtent(), r = [];
	return L(e, function(e) {
		e = t.parse(e), e >= n[0] && e <= n[1] && r.push(e);
	}), ss(r, ls, null), Ga(r), R(r, function(e) {
		return { value: e };
	});
}
function JT(e, t) {
	var n = e.getLabelModel(), r = YT(e, n, t);
	return !n.get("show") || e.scale.isBlank() ? { labels: [] } : r;
}
function YT(e, t, n) {
	var r = $T(e), i = Ww(t), a = n.kind === UT.estimate;
	if (!a) {
		var o = tE(r, i);
		if (o) return o;
	}
	var s, c;
	U(i) ? s = cE(e, i, !1) : (c = i === "auto" ? rE(e, n) : i, s = cE(e, c, !1));
	var l = {
		labels: s,
		labelCategoryInterval: c
	};
	return a ? n.out.noPxChangeTryDetermine.push(function() {
		return nE(r, i, l), !0;
	}) : nE(r, i, l), l;
}
function XT(e, t) {
	var n = QT(e), r = Ww(t), i = tE(n, r);
	if (i) return i;
	var a, o;
	if ((!t.get("show") || e.scale.isBlank()) && (a = []), U(r)) a = cE(e, r, !0);
	else if (r === "auto") {
		var s = YT(e, e.getLabelModel(), WT(UT.determine));
		o = s.labelCategoryInterval, a = R(s.labels, function(e) {
			return e.tick;
		});
	} else o = r, a = cE(e, o, !0);
	return nE(n, r, {
		ticks: a,
		tickCategoryInterval: o
	});
}
function ZT(e) {
	var t = e.scale.getTicks(), n = Hw(e);
	return { labels: R(t, function(t, r) {
		return {
			formattedLabel: n(t, r),
			rawLabel: e.scale.getLabel(t),
			tick: t
		};
	}) };
}
var QT = eE("axisTick"), $T = eE("axisLabel");
function eE(e) {
	return function(t) {
		return HT(t)[e] || (HT(t)[e] = { list: [] });
	};
}
function tE(e, t) {
	for (var n = 0; n < e.list.length; n++) if (e.list[n].key === t) return e.list[n].value;
}
function nE(e, t, n) {
	return e.list.push({
		key: t,
		value: n
	}), n;
}
function rE(e, t) {
	if (t.kind === UT.estimate) {
		var n = e.calculateCategoryInterval(t);
		return t.out.noPxChangeTryDetermine.push(function() {
			return HT(e).autoInterval = n, !0;
		}), n;
	}
	return HT(e).autoInterval ?? (HT(e).autoInterval = e.calculateCategoryInterval(t));
}
function iE(e, t) {
	var n = t.kind, r = sE(e), i = Hw(e), a = (r.axisRotate - r.labelRotate) / 180 * Math.PI, o = e.scale, s = o.getExtent(), c = o.count();
	if (s[1] - s[0] < 1) return 0;
	var l = 1, u = 40;
	c > u && (l = Math.max(1, Math.floor(c / u)));
	for (var d = s[0], f = e.dataToCoord(d + 1) - e.dataToCoord(d), p = Math.abs(f * Math.cos(a)), m = Math.abs(f * Math.sin(a)), h = 0, g = 0; d <= s[1]; d += l) {
		var _ = 0, v = 0, y = Yi(i({ value: d }), r.font, "center", "top");
		_ = y.width * 1.3, v = y.height * 1.3, h = Math.max(h, _, 7), g = Math.max(g, v, 7);
	}
	var b = h / p, x = g / m;
	isNaN(b) && (b = Infinity), isNaN(x) && (x = Infinity);
	var S = Math.max(0, Math.floor(Math.min(b, x)));
	return n === UT.estimate ? (t.out.noPxChangeTryDetermine.push(B(aE, null, e, S, c)), S) : oE(e, S, c) ?? S;
}
function aE(e, t, n) {
	return oE(e, t, n) == null;
}
function oE(e, t, n) {
	var r = VT(e.model), i = e.getExtent(), a = r.lastAutoInterval, o = r.lastTickCount;
	if (a != null && o != null && Math.abs(a - t) <= 1 && Math.abs(o - n) <= 1 && a > t && r.axisExtent0 === i[0] && r.axisExtent1 === i[1]) return a;
	r.lastTickCount = n, r.lastAutoInterval = t, r.axisExtent0 = i[0], r.axisExtent1 = i[1];
}
function sE(e) {
	var t = e.getLabelModel();
	return {
		axisRotate: e.getRotate ? e.getRotate() : e.isHorizontal && !e.isHorizontal() ? 90 : 0,
		labelRotate: t.get("rotate") || 0,
		font: t.getFont()
	};
}
function cE(e, t, n) {
	var r = Hw(e), i = e.scale, a = [], o = U(t);
	return dw(i, o ? 0 : t, function(e, s) {
		var c = i.getLabel(e);
		if (o) {
			var l = !!t(e.value, c);
			if (e.offInterval = !l, !l && !s) return;
		}
		a.push(n ? e : {
			formattedLabel: r(e),
			rawLabel: c,
			tick: e
		});
	}), a;
}
//#endregion
//#region node_modules/echarts/lib/coord/axisBand.js
var lE = .8;
function uE(e, t) {
	t ||= {};
	var n = {
		w: NaN,
		w2: NaN
	}, r = e.scale, i = t.fromStat, a = t.min, o = JC(r);
	lo(o) || (o = NaN);
	var s = e.getExtent(), c = ja(s[1] - s[0]);
	return rw(r) ? dE(n, e, o, c) : i && fE(n, e, o, c, i), a != null && (n.w = lo(n.w) ? Aa(a, n.w) : a), n;
}
function dE(e, t, n, r) {
	var i = t.onBand, a = n + +!!i;
	a === 0 && (a = 1), e.w = r / a, !i && n && r && (e.w2 = e.w * n / r);
}
function fE(e, t, n, r, i) {
	var a = !1, o = -Infinity;
	L(i.key ? [rT(t, i.key)] : iT(t, i.sers || []), function(e) {
		var t = e.liPosMinGap;
		t != null && (t > 0 ? (t > o && (o = t), a = !1) : t === -2 && (a = !0));
	}), lo(n) && n > 0 && lo(o) ? (e.w = r / n * o, e.w2 = o) : a && (e.w = r * lE, e.w2 = e.w * n / r);
}
//#endregion
//#region node_modules/echarts/lib/coord/Axis.js
var pE = [0, 1], mE = function() {
	function e(e, t, n) {
		this.onBand = !1, this.inverse = !1, this.dim = e, this.scale = t, this._extent = n || [0, 0];
	}
	return e.prototype.contain = function(e) {
		var t = this._extent, n = Math.min(t[0], t[1]), r = Math.max(t[0], t[1]);
		return e >= n && e <= r;
	}, e.prototype.containData = function(e) {
		return this.scale.contain(this.scale.parse(e));
	}, e.prototype.getExtent = function() {
		return this._extent.slice();
	}, e.prototype.setExtent = function(e, t) {
		var n = this._extent;
		n[0] = e, n[1] = t;
	}, e.prototype.dataToCoord = function(e, t) {
		var n = this.scale;
		return e = n.normalize(n.parse(e)), Ba(e, pE, hE(this), t);
	}, e.prototype.coordToData = function(e, t) {
		var n = Ba(e, hE(this), pE, t);
		return this.scale.scale(n);
	}, e.prototype.pointToData = function(e, t) {}, e.prototype.getTicksCoords = function(e) {
		e ||= {};
		var t = e.tickModel || this.getTickModel(), n = R(KT(this, t, {
			breakTicks: e.breakTicks,
			pruneByBreak: e.pruneByBreak
		}).ticks, function(e) {
			return {
				coord: this.dataToCoord(Qw(this.scale, e)),
				tick: e
			};
		}, this), r = t.get("alignWithLabel"), i = gE(this, n, r);
		return R(n, function(e) {
			return {
				coord: e.coord,
				tickValue: e.tick.value,
				onBand: i
			};
		});
	}, e.prototype.getMinorTicksCoords = function() {
		if (rw(this.scale)) return [];
		var e = this.model.getModel("minorTick").get("splitNumber");
		return e > 0 && e < 100 || (e = 5), R(this.scale.getMinorTicks(e), function(e) {
			return R(e, function(e) {
				return {
					coord: this.dataToCoord(e),
					tickValue: e
				};
			}, this);
		}, this);
	}, e.prototype.getViewLabels = function(e) {
		return e ||= WT(UT.determine), GT(this, e).labels;
	}, e.prototype.getLabelModel = function() {
		return this.model.getModel("axisLabel");
	}, e.prototype.getTickModel = function() {
		return this.model.getModel("axisTick");
	}, e.prototype.getBandWidth = function() {
		return uE(this, { min: 1 }).w;
	}, e.prototype.calculateCategoryInterval = function(e) {
		return e ||= WT(UT.determine), iE(this, e);
	}, e;
}();
function hE(e) {
	var t = e.getExtent();
	if (e.onBand) {
		var n = (t[1] - t[0]) / e.scale.count() / 2;
		t[0] += n, t[1] -= n;
	}
	return t;
}
function gE(e, t, n) {
	var r = t.length;
	if (!e.onBand || n || !r) return !1;
	var i = uE(e).w;
	if (!i) return !1;
	L(t, function(e) {
		e.coord -= i / 2;
	});
	var a = e.scale.getExtent(), o = t[r - 1];
	return o.tick.offInterval && t.pop(), t.push({
		coord: o.coord + i,
		tick: { value: a[1] + 1 }
	}), !0;
}
//#endregion
//#region node_modules/echarts/lib/label/labelLayoutHelper.js
var _E = [
	"label",
	"labelLine",
	"layoutOption",
	"priority",
	"defaultAttr",
	"marginForce",
	"minMarginForce",
	"marginDefault",
	"suggestIgnore"
], vE = 1, yE = 2, bE = vE | yE;
function xE(e, t, n) {
	n ||= bE, t ? e.dirty |= n : e.dirty &= ~n;
}
function SE(e, t) {
	return t ||= bE, e.dirty == null || !!(e.dirty & t);
}
function CE(e) {
	if (e) return SE(e) && wE(e, e.label, e), e;
}
function wE(e, t, n) {
	var r = t.getComputedTransform();
	e.transform = kp(e.transform, r);
	var i = e.localRect = Op(e.localRect, t.getBoundingRect()), a = t.style, o = a.margin, s = n && n.marginForce, c = n && n.minMarginForce, l = n && n.marginDefault, u = a.__marginType;
	u == null && l && (o = l, u = $p.textMargin);
	for (var d = 0; d < 4; d++) TE[d] = u === $p.minMargin && c && c[d] != null ? c[d] : s && s[d] != null ? s[d] : o ? o[d] : 0;
	u === $p.textMargin && bp(i, TE, !1, !1);
	var f = e.rect = Op(e.rect, i);
	return r && f.applyTransform(r), u === $p.minMargin && bp(f, TE, !1, !1), e.axisAligned = Ep(r), (e.label = e.label || {}).ignore = t.ignore, xE(e, !1), xE(e, !0, yE), e;
}
var TE = [
	0,
	0,
	0,
	0
];
function EE(e, t, n) {
	return e.transform = kp(e.transform, n), e.localRect = Op(e.localRect, t), e.rect = Op(e.rect, t), n && e.rect.applyTransform(n), e.axisAligned = Ep(n), e.obb = void 0, (e.label = e.label || {}).ignore = !1, e;
}
function DE(e, t) {
	if (e) {
		e.label.x += t.x, e.label.y += t.y, e.label.markRedraw();
		var n = e.transform;
		n && (n[4] += t.x, n[5] += t.y);
		var r = e.rect;
		r && (r.x += t.x, r.y += t.y);
		var i = e.obb;
		i && i.fromBoundingRect(e.localRect, n);
	}
}
function OE(e, t) {
	for (var n = 0; n < _E.length; n++) {
		var r = _E[n];
		e[r] ?? (e[r] = t[r]);
	}
	return CE(e);
}
function kE(e) {
	var t = e.obb;
	return (!t || SE(e, yE)) && (e.obb = t ||= new jf(), t.fromBoundingRect(e.localRect, e.transform), xE(e, !1, yE)), t;
}
function AE(e) {
	var t = [];
	e.sort(function(e, t) {
		return +!!t.suggestIgnore - !!e.suggestIgnore || t.priority - e.priority;
	});
	function n(e) {
		if (!e.ignore) {
			var t = e.ensureState("emphasis");
			t.ignore ??= !1;
		}
		e.ignore = !0;
	}
	for (var r = 0; r < e.length; r++) {
		var i = CE(e[r]);
		if (!i.label.ignore) {
			for (var a = i.label, o = i.labelLine, s = !1, c = 0; c < t.length; c++) if (jE(i, t[c], null, { touchThreshold: .05 })) {
				s = !0;
				break;
			}
			s ? (n(a), o && n(o)) : t.push(i);
		}
	}
}
function jE(e, t, n, r) {
	return !e || !t || e.label && e.label.ignore || t.label && t.label.ignore || !e.rect.intersect(t.rect, n, r) ? !1 : e.axisAligned && t.axisAligned ? !0 : kE(e).intersect(kE(t), n, r);
}
//#endregion
//#region node_modules/echarts/lib/chart/line/LineSeries.js
var ME = function(e) {
	r(t, e);
	function t() {
		var n = e !== null && e.apply(this, arguments) || this;
		return n.type = t.type, n.hasSymbolVisual = !0, n;
	}
	return t.prototype.getInitialData = function(e) {
		return FC(null, this, { useEncodeDefaulter: !0 });
	}, t.prototype.getLegendIcon = function(e) {
		var t = new va(), n = _b("line", 0, e.itemHeight / 2, e.itemWidth, 0, e.lineStyle.stroke, !1);
		t.add(n), n.setStyle(e.lineStyle);
		var r = this.getData().getVisual("symbol"), i = this.getData().getVisual("symbolRotate"), a = r === "none" ? "circle" : r, o = e.itemHeight * .8, s = _b(a, (e.itemWidth - o) / 2, (e.itemHeight - o) / 2, o, o, e.itemStyle.fill);
		return t.add(s), s.setStyle(e.itemStyle), s.rotation = (e.iconRotate === "inherit" ? i : e.iconRotate || 0) * Math.PI / 180, s.setOrigin([e.itemWidth / 2, e.itemHeight / 2]), a.indexOf("empty") > -1 && (s.style.stroke = s.style.fill, s.style.fill = Q.color.neutral00, s.style.lineWidth = 2), t;
	}, t.type = "series.line", t.dependencies = ["grid", "polar"], t.defaultOption = {
		z: 3,
		coordinateSystem: "cartesian2d",
		legendHoverLink: !0,
		clip: !0,
		label: { position: "top" },
		endLabel: {
			show: !1,
			valueAnimation: !0,
			distance: 8
		},
		lineStyle: {
			width: 2,
			type: "solid"
		},
		emphasis: { scale: !0 },
		step: !1,
		smooth: !1,
		smoothMonotone: null,
		symbol: "emptyCircle",
		symbolSize: 6,
		symbolRotate: null,
		showSymbol: !0,
		showAllSymbol: "auto",
		connectNulls: !1,
		sampling: "none",
		animationEasing: "linear",
		progressive: 0,
		hoverLayerThreshold: Infinity,
		universalTransition: { divideShape: "clone" },
		triggerLineEvent: !1,
		triggerEvent: !1
	}, t;
}(Vv);
//#endregion
//#region node_modules/echarts/lib/chart/helper/labelHelper.js
function NE(e, t) {
	var n = e.mapDimensionsAll("defaultedLabel"), r = n.length;
	if (r === 1) {
		var i = P_(e, t, n[0]);
		return i == null ? null : i + "";
	}
	if (r) {
		for (var a = [], o = 0; o < n.length; o++) a.push(P_(e, t, n[o]));
		return a.join(" ");
	}
}
function PE(e, t) {
	var n = e.mapDimensionsAll("defaultedLabel");
	if (!H(t)) return t + "";
	for (var r = [], i = 0; i < n.length; i++) {
		var a = e.getDimensionIndex(n[i]);
		a >= 0 && r.push(t[a]);
	}
	return r.join(" ");
}
//#endregion
//#region node_modules/echarts/lib/chart/helper/Symbol.js
var FE = function(e) {
	r(t, e);
	function t(t, n, r, i) {
		var a = e.call(this) || this;
		return a.updateData(t, n, r, i), a;
	}
	return t.prototype._createSymbol = function(e, t, n, r, i, a) {
		this.removeAll();
		var o = _b(e, -1, -1, 2, 2, null, a);
		o.attr({
			z2: K(i, 100),
			culling: !0,
			scaleX: r[0] / 2,
			scaleY: r[1] / 2
		}), o.drift = IE, this._symbolType = e, this.add(o);
	}, t.prototype.stopSymbolAnimation = function(e) {
		this.childAt(0).stopAnimation(null, e);
	}, t.prototype.getSymbolType = function() {
		return this._symbolType;
	}, t.prototype.getSymbolPath = function() {
		return this.childAt(0);
	}, t.prototype.highlight = function() {
		Iu(this.childAt(0));
	}, t.prototype.downplay = function() {
		Lu(this.childAt(0));
	}, t.prototype.setZ = function(e, t) {
		var n = this.childAt(0);
		n.zlevel = e, n.z = t;
	}, t.prototype.setDraggable = function(e, t) {
		var n = this.childAt(0);
		n.draggable = e, n.cursor = !t && e ? "move" : n.cursor;
	}, t.prototype.updateData = function(e, n, r, i) {
		this.silent = !1;
		var a = e.getItemVisual(n, "symbol") || "circle", o = e.hostModel, s = t.getSymbolSize(e, n), c = t.getSymbolZ2(e, n), l = a !== this._symbolType, u = i && i.disableAnimation;
		if (l) {
			var d = e.getItemVisual(n, "symbolKeepAspect");
			this._createSymbol(a, e, n, s, c, d);
		} else {
			var f = this.childAt(0);
			f.silent = !1;
			var p = {
				scaleX: s[0] / 2,
				scaleY: s[1] / 2
			};
			u ? f.attr(p) : Lf(f, p, o, n), Uf(f);
		}
		if (this._updateCommon(e, n, s, r, i), l) {
			var f = this.childAt(0);
			if (!u) {
				var p = {
					scaleX: this._sizeX,
					scaleY: this._sizeY,
					style: { opacity: f.style.opacity }
				};
				f.scaleX = f.scaleY = 0, f.style.opacity = 0, Rf(f, p, o, n);
			}
		}
		u && this.childAt(0).stopAnimation("leave");
	}, t.prototype._updateCommon = function(e, t, n, r, i) {
		var a = this.childAt(0), o = e.hostModel, s, c, l, u, d, f, p, m, h;
		if (r && (s = r.emphasisItemStyle, c = r.blurItemStyle, l = r.selectItemStyle, u = r.focus, d = r.blurScope, p = r.labelStatesModels, m = r.hoverScale, h = r.cursorStyle, f = r.emphasisDisabled), !r || e.hasItemOption) {
			var g = r && r.itemModel ? r.itemModel : e.getItemModel(t), _ = g.getModel("emphasis");
			s = _.getModel("itemStyle").getItemStyle(), l = g.getModel(["select", "itemStyle"]).getItemStyle(), c = g.getModel(["blur", "itemStyle"]).getItemStyle(), u = _.get("focus"), d = _.get("blurScope"), f = _.get("disabled"), p = Hp(g), m = _.getShallow("scale"), h = g.getShallow("cursor");
		}
		var v = e.getItemVisual(t, "symbolRotate");
		a.attr("rotation", (v || 0) * Math.PI / 180 || 0);
		var y = yb(e.getItemVisual(t, "symbolOffset"), n);
		y && (a.x = y[0], a.y = y[1]), h && a.attr("cursor", h);
		var b = e.getItemVisual(t, "style"), x = b.fill;
		if (a instanceof yl) {
			var S = a.style;
			a.useStyle(M({
				image: S.image,
				x: S.x,
				y: S.y,
				width: S.width,
				height: S.height
			}, b));
		} else a.__isEmptyBrush ? a.useStyle(M({}, b)) : a.useStyle(b), a.style.decal = null, a.setColor(x, i && i.symbolInnerColor), a.style.strokeNoScale = !0;
		var C = e.getItemVisual(t, "liftZ"), w = this._z2;
		C == null ? w != null && (a.z2 = w, this._z2 = null) : w ?? (this._z2 = a.z2, a.z2 += C);
		var T = i && i.useNameLabel;
		Vp(a, p, {
			labelFetcher: o,
			labelDataIndex: t,
			defaultText: E,
			inheritColor: x,
			defaultOpacity: b.opacity
		});
		function E(t) {
			return T ? e.getName(t) : NE(e, t);
		}
		this._sizeX = n[0] / 2, this._sizeY = n[1] / 2;
		var D = a.ensureState("emphasis");
		D.style = s, a.ensureState("select").style = l, a.ensureState("blur").style = c;
		var O = m == null || m === !0 ? Math.max(1.1, 3 / this._sizeY) : isFinite(m) && m > 0 ? +m : 1;
		D.scaleX = this._sizeX * O, D.scaleY = this._sizeY * O, this.setSymbolScale(1), td(this, u, d, f);
	}, t.prototype.setSymbolScale = function(e) {
		this.scaleX = this.scaleY = e;
	}, t.prototype.fadeOut = function(e, t, n) {
		var r = this.childAt(0), i = Kl(this).dataIndex, a = n && n.animation;
		if (this.silent = r.silent = !0, n && n.fadeLabel) {
			var o = r.getTextContent();
			o && Bf(o, { style: { opacity: 0 } }, t, {
				dataIndex: i,
				removeOpt: a,
				cb: function() {
					r.removeTextContent();
				}
			});
		} else r.removeTextContent();
		Bf(r, {
			style: { opacity: 0 },
			scaleX: 0,
			scaleY: 0
		}, t, {
			dataIndex: i,
			cb: e,
			removeOpt: a
		});
	}, t.getSymbolSize = function(e, t) {
		return vb(e.getItemVisual(t, "symbolSize"));
	}, t.getSymbolZ2 = function(e, t) {
		return e.getItemVisual(t, "z2");
	}, t;
}(va);
function IE(e, t) {
	this.parent.drift(e, t);
}
//#endregion
//#region node_modules/echarts/lib/chart/helper/SymbolDraw.js
function LE(e, t, n, r) {
	return t && !isNaN(t[0]) && !isNaN(t[1]) && !(r && r.isIgnore && r.isIgnore(n)) && !(r && r.clipShape && !r.clipShape.contain(t[0], t[1])) && e.getItemVisual(n, "symbol") !== "none";
}
function RE(e) {
	return e != null && !G(e) && (e = { isIgnore: e }), e || {};
}
function zE(e) {
	var t = e.hostModel, n = t.getModel("emphasis");
	return {
		emphasisItemStyle: n.getModel("itemStyle").getItemStyle(),
		blurItemStyle: t.getModel(["blur", "itemStyle"]).getItemStyle(),
		selectItemStyle: t.getModel(["select", "itemStyle"]).getItemStyle(),
		focus: n.get("focus"),
		blurScope: n.get("blurScope"),
		emphasisDisabled: n.get("disabled"),
		hoverScale: n.get("scale"),
		labelStatesModels: Hp(t),
		cursorStyle: t.get("cursor")
	};
}
function BE(e, t, n, r, i, a, o) {
	var s = new e(t, n, r, i);
	return s.setPosition(a), t.setItemGraphicEl(n, s), o.add(s), s;
}
var VE = function() {
	function e(e) {
		this.group = new va(), this._SymbolCtor = e || FE;
	}
	return e.prototype.updateData = function(e, t) {
		this._progressiveEls = null, t = RE(t);
		var n = this.group, r = e.hostModel, i = this._data, a = this._SymbolCtor, o = t.disableAnimation, s = this._seriesScope = zE(e), c = { disableAnimation: o }, l = t.getSymbolPoint || function(t) {
			return e.getItemLayout(t);
		};
		i || n.removeAll(), e.diff(i).add(function(r) {
			var i = l(r);
			LE(e, i, r, t) && BE(a, e, r, s, c, i, n);
		}).update(function(u, d) {
			var f = i.getItemGraphicEl(d), p = l(u);
			if (!LE(e, p, u, t)) {
				n.remove(f);
				return;
			}
			var m = e.getItemVisual(u, "symbol") || "circle", h = f && f.getSymbolType && f.getSymbolType();
			if (!f || h && h !== m) n.remove(f), f = new a(e, u, s, c), f.setPosition(p);
			else {
				f.updateData(e, u, s, c);
				var g = {
					x: p[0],
					y: p[1]
				};
				o ? f.attr(g) : Lf(f, g, r);
			}
			n.add(f), e.setItemGraphicEl(u, f);
		}).remove(function(e) {
			var t = i.getItemGraphicEl(e);
			t && t.fadeOut(function() {
				n.remove(t);
			}, r);
		}).execute(), this._getSymbolPoint = l, this._data = e;
	}, e.prototype.updateLayout = function(e) {
		var t = this._data;
		if (t) for (var n = this, r = t.getStore(), i = 0, a = r.count(); i < a; i++) {
			var o = t.getItemGraphicEl(i), s = n._getSymbolPoint(i);
			LE(t, s, i, e) ? (o ||= BE(n._SymbolCtor, t, i, n._seriesScope, { disableAnimation: !0 }, s, n.group), o.stopAnimation(), o.setPosition(s), o.markRedraw()) : o && (n.group.remove(o), t.setItemGraphicEl(i, null));
		}
	}, e.prototype.incrementalPrepareUpdate = function(e) {
		this._seriesScope = zE(e), this._data = null, this.group.removeAll();
	}, e.prototype.incrementalUpdate = function(e, t, n, r) {
		this._progressiveEls = [], r = RE(r);
		function i(e) {
			e.isGroup || (e.incremental = n, e.ensureState("emphasis").hoverLayer = 2);
		}
		for (var a = e.start; a < e.end; a++) {
			var o = t.getItemLayout(a);
			if (LE(t, o, a, r)) {
				var s = new this._SymbolCtor(t, a, this._seriesScope);
				s.traverse(i), s.setPosition(o), this.group.add(s), t.setItemGraphicEl(a, s), this._progressiveEls.push(s);
			}
		}
	}, e.prototype.eachRendered = function(e) {
		Tp(this._progressiveEls || this.group, e);
	}, e.prototype.remove = function(e) {
		var t = this.group, n = this._data;
		n && e ? n.eachItemGraphicEl(function(e) {
			e.fadeOut(function() {
				t.remove(e);
			}, n.hostModel);
		}) : t.removeAll();
	}, e;
}();
//#endregion
//#region node_modules/echarts/lib/chart/line/helper.js
function HE(e, t, n) {
	var r = e.getBaseAxis(), i = e.getOtherAxis(r), a = UE(i, n), o = r.dim, s = i.dim, c = t.mapDimension(s), l = t.mapDimension(o), u = +(s === "x" || s === "radius"), d = R(e.dimensions, function(e) {
		return t.mapDimension(e);
	}), f = !1, p = t.getCalculationInfo("stackResultDimension");
	return jC(t, d[0]) && (f = !0, d[0] = p), jC(t, d[1]) && (f = !0, d[1] = p), {
		dataDimsForPoint: d,
		valueStart: a,
		valueAxisDim: s,
		baseAxisDim: o,
		stacked: !!f,
		valueDim: c,
		baseDim: l,
		baseDataOffset: u,
		stackedOverDimension: t.getCalculationInfo("stackedOverDimension")
	};
}
function UE(e, t) {
	var n = 0, r = e.scale.getExtent();
	return t === "start" ? n = r[0] : t === "end" ? n = r[1] : se(t) && !isNaN(t) ? n = t : r[0] > 0 ? n = r[0] : r[1] < 0 && (n = r[1]), n;
}
function WE(e, t, n, r) {
	var i = NaN;
	e.stacked && (i = n.get(n.getCalculationInfo("stackedOverDimension"), r)), isNaN(i) && (i = e.valueStart);
	var a = e.baseDataOffset, o = [];
	return o[a] = n.get(e.baseDim, r), o[1 - a] = i, t.dataToPoint(o);
}
function GE(e, t) {
	return !isFinite(e) || !isFinite(t);
}
//#endregion
//#region node_modules/echarts/lib/util/vendor.js
var KE = typeof Float32Array < "u" ? Float32Array : void 0;
function qE(e) {
	return JE({ ctor: KE }, e).arr;
}
function JE(e, t) {
	var n = e.arr, r = e.ctor;
	if (t > Xa && (t = Xa), !n || e.typed && n.length < t) {
		var i = void 0;
		if (r) try {
			i = new r(t), e.typed = !0, n && i.set(n);
		} catch {}
		if (!i && (i = [], e.typed = !1, n)) for (var a = 0, o = n.length; a < o; a++) i[a] = n[a];
		e.arr = i;
	}
	return e;
}
//#endregion
//#region node_modules/echarts/lib/chart/line/lineAnimationDiff.js
function YE(e, t) {
	var n = [];
	return t.diff(e).add(function(e) {
		n.push({
			cmd: "+",
			idx: e
		});
	}).update(function(e, t) {
		n.push({
			cmd: "=",
			idx: t,
			idx1: e
		});
	}).remove(function(e) {
		n.push({
			cmd: "-",
			idx: e
		});
	}).execute(), n;
}
function XE(e, t, n, r, i, a, o, s) {
	for (var c = YE(e, t), l = [], u = [], d = [], f = [], p = [], m = [], h = [], g = HE(i, t, o), _ = e.getLayout("points") || [], v = t.getLayout("points") || [], y = 0; y < c.length; y++) {
		var b = c[y], x = !0, S = void 0, C = void 0;
		switch (b.cmd) {
			case "=":
				S = b.idx * 2, C = b.idx1 * 2;
				var w = _[S], T = _[S + 1], E = v[C], D = v[C + 1];
				(isNaN(w) || isNaN(T)) && (w = E, T = D), l.push(w, T), u.push(E, D), d.push(n[S], n[S + 1]), f.push(r[C], r[C + 1]), h.push(t.getRawIndex(b.idx1));
				break;
			case "+":
				var O = b.idx, k = g.dataDimsForPoint, A = i.dataToPoint([t.get(k[0], O), t.get(k[1], O)]);
				C = O * 2, l.push(A[0], A[1]), u.push(v[C], v[C + 1]);
				var j = WE(g, i, t, O);
				d.push(j[0], j[1]), f.push(r[C], r[C + 1]), h.push(t.getRawIndex(O));
				break;
			case "-": x = !1;
		}
		x && (p.push(b), m.push(m.length));
	}
	m.sort(function(e, t) {
		return h[e] - h[t];
	});
	for (var M = l.length, ee = qE(M), N = qE(M), P = qE(M), te = qE(M), F = [], y = 0; y < m.length; y++) {
		var I = m[y], L = y * 2, R = I * 2;
		ee[L] = l[R], ee[L + 1] = l[R + 1], N[L] = u[R], N[L + 1] = u[R + 1], P[L] = d[R], P[L + 1] = d[R + 1], te[L] = f[R], te[L + 1] = f[R + 1], F[y] = p[I];
	}
	return {
		current: ee,
		next: N,
		stackedOnCurrent: P,
		stackedOnNext: te,
		status: F
	};
}
//#endregion
//#region node_modules/echarts/lib/chart/line/poly.js
var ZE = Math.min, QE = Math.max;
function $E(e, t, n, r, i, a, o, s, c) {
	for (var l, u, d, f, p, m, h = n, g = 0; g < r; g++) {
		var _ = t[h * 2], v = t[h * 2 + 1];
		if (h >= i || h < 0) break;
		if (GE(_, v)) {
			if (c) {
				h += a;
				continue;
			}
			break;
		}
		if (h === n) e[a > 0 ? "moveTo" : "lineTo"](_, v), d = _, f = v;
		else {
			var y = _ - l, b = v - u;
			if (y * y + b * b < .5) {
				h += a;
				continue;
			}
			if (o > 0) {
				for (var x = h + a, S = t[x * 2], C = t[x * 2 + 1]; S === _ && C === v && g < r;) g++, x += a, h += a, S = t[x * 2], C = t[x * 2 + 1], _ = t[h * 2], v = t[h * 2 + 1], y = _ - l, b = v - u;
				var w = g + 1;
				if (c) for (; GE(S, C) && w < r;) w++, x += a, S = t[x * 2], C = t[x * 2 + 1];
				var T = .5, E = 0, D = 0, O = void 0, k = void 0;
				if (w >= r || GE(S, C)) p = _, m = v;
				else {
					E = S - l, D = C - u;
					var A = _ - l, j = S - _, M = v - u, ee = C - v, N = void 0, P = void 0;
					if (s === "x") {
						N = Math.abs(A), P = Math.abs(j);
						var te = E > 0 ? 1 : -1;
						p = _ - te * N * o, m = v, O = _ + te * P * o, k = v;
					} else if (s === "y") {
						N = Math.abs(M), P = Math.abs(ee);
						var F = D > 0 ? 1 : -1;
						p = _, m = v - F * N * o, O = _, k = v + F * P * o;
					} else N = Math.sqrt(A * A + M * M), P = Math.sqrt(j * j + ee * ee), T = P / (P + N), p = _ - E * o * (1 - T), m = v - D * o * (1 - T), O = _ + E * o * T, k = v + D * o * T, O = ZE(O, QE(S, _)), k = ZE(k, QE(C, v)), O = QE(O, ZE(S, _)), k = QE(k, ZE(C, v)), E = O - _, D = k - v, p = _ - E * N / P, m = v - D * N / P, p = ZE(p, QE(l, _)), m = ZE(m, QE(u, v)), p = QE(p, ZE(l, _)), m = QE(m, ZE(u, v)), E = _ - p, D = v - m, O = _ + E * P / N, k = v + D * P / N;
				}
				e.bezierCurveTo(d, f, p, m, _, v), d = O, f = k;
			} else e.lineTo(_, v);
		}
		l = _, u = v, h += a;
	}
	return g;
}
var eD = function() {
	function e() {
		this.smooth = 0, this.smoothConstraint = !0;
	}
	return e;
}(), tD = function(e) {
	r(t, e);
	function t(t) {
		var n = e.call(this, t) || this;
		return n.type = "ec-polyline", n;
	}
	return t.prototype.getDefaultStyle = function() {
		return {
			stroke: Q.color.neutral99,
			fill: null
		};
	}, t.prototype.getDefaultShape = function() {
		return new eD();
	}, t.prototype.buildPath = function(e, t) {
		var n = t.points, r = 0, i = n.length / 2;
		if (t.connectNulls) {
			for (; i > 0 && GE(n[i * 2 - 2], n[i * 2 - 1]); i--);
			for (; r < i && GE(n[r * 2], n[r * 2 + 1]); r++);
		}
		for (; r < i;) r += $E(e, n, r, i, i, 1, t.smooth, t.smoothMonotone, t.connectNulls) + 1;
	}, t.prototype.getPointOn = function(e, t) {
		this.path || (this.createPathProxy(), this.buildPath(this.path, this.shape));
		for (var n = this.path.data, r = Hc.CMD, i, a, o = t === "x", s = [], c = 0; c < n.length;) {
			var l = n[c++], u = void 0, d = void 0, f = void 0, p = void 0, m = void 0, h = void 0, g = void 0;
			switch (l) {
				case r.M:
					i = n[c++], a = n[c++];
					break;
				case r.L:
					if (u = n[c++], d = n[c++], g = o ? (e - i) / (u - i) : (e - a) / (d - a), g <= 1 && g >= 0) {
						var _ = o ? (d - a) * g + a : (u - i) * g + i;
						return o ? [e, _] : [_, e];
					}
					i = u, a = d;
					break;
				case r.C:
					u = n[c++], d = n[c++], f = n[c++], p = n[c++], m = n[c++], h = n[c++];
					var v = o ? Wn(i, u, f, m, e, s) : Wn(a, d, p, h, e, s);
					if (v > 0) for (var y = 0; y < v; y++) {
						var b = s[y];
						if (b <= 1 && b >= 0) {
							var _ = o ? Hn(a, d, p, h, b) : Hn(i, u, f, m, b);
							return o ? [e, _] : [_, e];
						}
					}
					i = m, a = h;
			}
		}
	}, t;
}(pl), nD = function(e) {
	r(t, e);
	function t() {
		return e !== null && e.apply(this, arguments) || this;
	}
	return t;
}(eD), rD = function(e) {
	r(t, e);
	function t(t) {
		var n = e.call(this, t) || this;
		return n.type = "ec-polygon", n;
	}
	return t.prototype.getDefaultShape = function() {
		return new nD();
	}, t.prototype.buildPath = function(e, t) {
		var n = t.points, r = t.stackedOnPoints, i = 0, a = n.length / 2, o = t.smoothMonotone;
		if (t.connectNulls) {
			for (; a > 0 && GE(n[a * 2 - 2], n[a * 2 - 1]); a--);
			for (; i < a && GE(n[i * 2], n[i * 2 + 1]); i++);
		}
		for (; i < a;) {
			var s = $E(e, n, i, a, a, 1, t.smooth, o, t.connectNulls);
			$E(e, r, i + s - 1, s, a, -1, t.stackedOnSmooth, o, t.connectNulls), i += s + 1, e.closePath();
		}
	}, t;
}(pl);
//#endregion
//#region node_modules/echarts/lib/chart/helper/createClipPathFromCoordSys.js
function iD(e, t, n, r, i) {
	var a = e.getArea(), o = a.x, s = a.y, c = a.width, l = a.height, u = n.get(["lineStyle", "width"]) || 0;
	o -= u / 2, s -= u / 2, c += u, l += u, c = Math.ceil(c), o !== Math.floor(o) && (o = Math.floor(o), c++);
	var d = new Dl({ shape: {
		x: o,
		y: s,
		width: c,
		height: l
	} });
	if (t) {
		var f = e.getBaseAxis(), p = f.isHorizontal(), m = f.inverse;
		p ? (m && (d.shape.x += c), d.shape.width = 0) : (m || (d.shape.y += l), d.shape.height = 0);
		var h = U(i) ? function(e) {
			i(e, d);
		} : null;
		Rf(d, { shape: {
			width: c,
			height: l,
			x: o,
			y: s
		} }, n, null, r, h);
	}
	return d;
}
function aD(e, t, n) {
	var r = e.getArea(), i = Y(r.r0, 1), a = Y(r.r, 1), o = new ef({ shape: {
		cx: Y(e.cx, 1),
		cy: Y(e.cy, 1),
		r0: i,
		r: a,
		startAngle: r.startAngle,
		endAngle: r.endAngle,
		clockwise: r.clockwise
	} });
	return t && (e.getBaseAxis().dim === "angle" ? o.shape.endAngle = r.startAngle : o.shape.r = i, Rf(o, { shape: {
		endAngle: r.endAngle,
		r: a
	} }, n)), o;
}
//#endregion
//#region node_modules/echarts/lib/coord/CoordinateSystem.js
function oD(e, t) {
	return e.type === t;
}
//#endregion
//#region node_modules/echarts/lib/chart/line/LineView.js
function sD(e, t) {
	if (e.length === t.length) {
		for (var n = 0; n < e.length; n++) if (e[n] !== t[n]) return;
		return !0;
	}
}
function cD(e) {
	for (var t = Xo(), n = Xo(), r = 0; r < e.length;) {
		var i = e[r++], a = e[r++];
		GE(i, a) || (Zo(t, i), Zo(n, a));
	}
	return [t, n];
}
function lD(e, t) {
	var n = cD(e), r = n[0], i = n[1], a = cD(t), o = a[0], s = a[1];
	return Math.max(Math.abs(r[0] - o[0]), Math.abs(i[0] - s[0]), Math.abs(r[1] - o[1]), Math.abs(i[1] - s[1]));
}
function uD(e) {
	return se(e) ? e : e ? .5 : 0;
}
function dD(e, t, n) {
	if (n.valueDim == null) return [];
	for (var r = t.count(), i = qE(r * 2), a = 0; a < r; a++) {
		var o = WE(n, e, t, a);
		i[a * 2] = o[0], i[a * 2 + 1] = o[1];
	}
	return i;
}
function fD(e, t, n, r, i) {
	var a = n.getBaseAxis(), o = a.dim === "x" || a.dim === "radius" ? 0 : 1, s = [], c = 0, l = [], u = [], d = [], f = [];
	if (i) {
		for (c = 0; c < e.length; c += 2) {
			var p = t || e;
			GE(p[c], p[c + 1]) || f.push(e[c], e[c + 1]);
		}
		e = f;
	}
	for (c = 0; c < e.length - 2; c += 2) switch (d[0] = e[c + 2], d[1] = e[c + 3], u[0] = e[c], u[1] = e[c + 1], s.push(u[0], u[1]), r) {
		case "end":
			l[o] = d[o], l[1 - o] = u[1 - o], s.push(l[0], l[1]);
			break;
		case "middle":
			var m = (u[o] + d[o]) / 2, h = [];
			l[o] = h[o] = m, l[1 - o] = u[1 - o], h[1 - o] = d[1 - o], s.push(l[0], l[1]), s.push(h[0], h[1]);
			break;
		default: l[o] = u[o], l[1 - o] = d[1 - o], s.push(l[0], l[1]);
	}
	return s.push(e[c++], e[c++]), s;
}
function pD(e, t) {
	var n = [], r = e.length, i, a;
	function o(e, t, n) {
		var r = e.coord;
		return {
			coord: n,
			color: Tr((n - r) / (t.coord - r), [e.color, t.color])
		};
	}
	for (var s = 0; s < r; s++) {
		var c = e[s], l = c.coord;
		if (l < 0) i = c;
		else if (l > t) {
			a ? n.push(o(a, c, t)) : i && n.push(o(i, c, 0), o(i, c, t));
			break;
		} else i &&= (n.push(o(i, c, 0)), null), n.push(c), a = c;
	}
	return n;
}
function mD(e, t, n) {
	var r = e.getVisual("visualMeta");
	if (r && r.length && e.count() && t.type === "cartesian2d") {
		for (var i, a, o = r.length - 1; o >= 0; o--) {
			var s = e.getDimensionInfo(r[o].dimension);
			if (i = s && s.coordDim, i === "x" || i === "y") {
				a = r[o];
				break;
			}
		}
		if (a) {
			var c = t.getAxis(i), l = R(a.stops, function(e) {
				return {
					coord: c.toGlobalCoord(c.dataToCoord(e.value)),
					color: e.color
				};
			}), u = l.length, d = a.outerColors.slice();
			u && l[0].coord > l[u - 1].coord && (l.reverse(), d.reverse());
			var f = pD(l, i === "x" ? n.getWidth() : n.getHeight()), p = f.length;
			if (!p && u) return l[0].coord < 0 ? d[1] ? d[1] : l[u - 1].color : d[0] ? d[0] : l[0].color;
			var m = 10, h = f[0].coord - m, g = f[p - 1].coord + m, _ = g - h;
			if (_ < .001) return "transparent";
			L(f, function(e) {
				e.offset = (e.coord - h) / _;
			}), f.push({
				offset: p ? f[p - 1].offset : .5,
				color: d[1] || "transparent"
			}), f.unshift({
				offset: p ? f[0].offset : .5,
				color: d[0] || "transparent"
			});
			var v = new xf(0, 0, 0, 0, f, !0);
			return v[i] = h, v[i + "2"] = g, v;
		}
	}
}
function hD(e, t, n) {
	var r = e.get("showAllSymbol"), i = r === "auto";
	if (!r || i) {
		var a = n.getAxesByScale("ordinal")[0];
		if (a && !(i && gD(a, t))) {
			var o = t.mapDimension(a.dim), s = {};
			return L(a.getViewLabels(), function(e) {
				e.tick.offInterval || (s[Qw(a.scale, e.tick)] = 1);
			}), function(e) {
				return !s.hasOwnProperty(t.get(o, e));
			};
		}
	}
}
function gD(e, t) {
	var n = e.getExtent(), r = Math.abs(n[1] - n[0]) / e.scale.count();
	isNaN(r) && (r = 0);
	for (var i = t.count(), a = Math.max(1, Math.round(i / 5)), o = 0; o < i; o += a) if (FE.getSymbolSize(t, o)[+!!e.isHorizontal()] * 1.5 > r) return !1;
	return !0;
}
function _D(e) {
	for (var t = e.length / 2; t > 0 && GE(e[t * 2 - 2], e[t * 2 - 1]); t--);
	return t - 1;
}
function vD(e, t) {
	return [e[t * 2], e[t * 2 + 1]];
}
function yD(e, t, n) {
	for (var r = e.length / 2, i = n === "x" ? 0 : 1, a, o, s = 0, c = -1, l = 0; l < r; l++) if (o = e[l * 2 + i], !GE(o, e[l * 2 + 1 - i])) {
		if (l === 0) {
			a = o;
			continue;
		}
		if (a <= t && o >= t || a >= t && o <= t) {
			c = l;
			break;
		}
		s = l, a = o;
	}
	return {
		range: [s, c],
		t: (t - a) / (o - a)
	};
}
function bD(e) {
	if (e.get(["endLabel", "show"])) return !0;
	for (var t = 0; t < lu.length; t++) if (e.get([
		lu[t],
		"endLabel",
		"show"
	])) return !0;
	return !1;
}
function xD(e, t, n, r) {
	if (oD(t, "cartesian2d")) {
		var i = r.getModel("endLabel"), a = i.get("valueAnimation"), o = r.getData(), s = { lastFrameIndex: 0 }, c = bD(r) ? function(n, r) {
			e._endLabelOnDuring(n, r, o, s, a, i, t);
		} : null, l = t.getBaseAxis().isHorizontal(), u = iD(t, n, r, function() {
			var t = e._endLabel;
			t && n && s.originalX != null && t.attr({
				x: s.originalX,
				y: s.originalY
			});
		}, c);
		if (!r.get("clip", !0)) {
			var d = u.shape, f = Math.max(d.width, d.height);
			l ? (d.y -= f, d.height += f * 2) : (d.x -= f, d.width += f * 2);
		}
		return c && c(1, u), u;
	}
	return aD(t, n, r);
}
function SD(e, t) {
	var n = t.getBaseAxis(), r = n.isHorizontal(), i = n.inverse, a = r ? i ? "right" : "left" : "center", o = r ? "middle" : i ? "top" : "bottom";
	return { normal: {
		align: e.get("align") || a,
		verticalAlign: e.get("verticalAlign") || o
	} };
}
var CD = function(e) {
	r(t, e);
	function t() {
		return e !== null && e.apply(this, arguments) || this;
	}
	return t.prototype.init = function() {
		var e = new va(), t = new VE();
		this.group.add(t.group), this._symbolDraw = t, this._lineGroup = e, this._changePolyState = B(this._changePolyState, this);
	}, t.prototype.render = function(e, t, n) {
		var r = e.coordinateSystem, i = this.group, a = e.getData(), o = e.getModel("lineStyle"), s = e.getModel("areaStyle"), c = a.getLayout("points") || [], l = r.type === "polar", u = this._coordSys, d = this._symbolDraw, f = this._polyline, p = this._polygon, m = this._lineGroup, h = !t.ssr && e.get("animation"), g = !s.isEmpty(), _ = s.get("origin"), v = HE(r, a, _), y = g && dD(r, a, v), b = e.get("showSymbol"), x = e.get("connectNulls"), S = b && !l && hD(e, a, r), C = this._data;
		C && C.eachItemGraphicEl(function(e, t) {
			e.__temp && (i.remove(e), C.setItemGraphicEl(t, null));
		}), b || d.remove(), i.add(m);
		var w = !l && e.get("step"), T;
		r && r.getArea && e.get("clip", !0) && (T = r.getArea(), T.width == null ? T.r0 && (T.r0 -= .5, T.r += .5) : (T.x -= .1, T.y -= .1, T.width += .2, T.height += .2)), this._clipShapeForSymbol = T;
		var E = mD(a, r, n) || a.getVisual("style")[a.getVisual("drawType")];
		if (!(f && u.type === r.type && w === this._step)) b && d.updateData(a, {
			isIgnore: S,
			clipShape: T,
			disableAnimation: !0,
			getSymbolPoint: function(e) {
				return [c[e * 2], c[e * 2 + 1]];
			}
		}), h && this._initSymbolLabelAnimation(a, r, T), w && (y &&= fD(y, c, r, w, x), c = fD(c, null, r, w, x)), f = this._newPolyline(c), g ? p = this._newPolygon(c, y) : p &&= (m.remove(p), this._polygon = null), l || this._initOrUpdateEndLabel(e, r, Sh(E)), m.setClipPath(xD(this, r, !0, e));
		else {
			g && !p ? p = this._newPolygon(c, y) : p && !g && (m.remove(p), p = this._polygon = null), l || this._initOrUpdateEndLabel(e, r, Sh(E));
			var D = m.getClipPath();
			D ? Rf(D, { shape: xD(this, r, !1, e).shape }, e) : m.setClipPath(xD(this, r, !0, e)), b && d.updateData(a, {
				isIgnore: S,
				clipShape: T,
				disableAnimation: !0,
				getSymbolPoint: function(e) {
					return [c[e * 2], c[e * 2 + 1]];
				}
			}), (!sD(this._stackedOnPoints, y) || !sD(this._points, c)) && (h ? this._doUpdateAnimation(a, y, r, n, w, _, x) : (w && (y &&= fD(y, c, r, w, x), c = fD(c, null, r, w, x)), f.setShape({ points: c }), p && p.setShape({
				points: c,
				stackedOnPoints: y
			})));
		}
		var O = e.getModel("emphasis"), k = O.get("focus"), A = O.get("blurScope"), j = O.get("disabled");
		if (f.useStyle(N(o.getLineStyle(), {
			fill: "none",
			stroke: E,
			lineJoin: "bevel"
		})), ad(f, e, "lineStyle"), f.style.lineWidth > 0 && e.get([
			"emphasis",
			"lineStyle",
			"width"
		]) === "bolder") {
			var M = f.getState("emphasis").style;
			M.lineWidth = +f.style.lineWidth + 1;
		}
		Kl(f).seriesIndex = e.seriesIndex, td(f, k, A, j);
		var ee = uD(e.get("smooth")), P = e.get("smoothMonotone");
		if (f.setShape({
			smooth: ee,
			smoothMonotone: P,
			connectNulls: x
		}), p) {
			var te = a.getCalculationInfo("stackedOnSeries"), F = 0;
			p.useStyle(N(s.getAreaStyle(), {
				fill: E,
				opacity: .7,
				lineJoin: "bevel",
				decal: a.getVisual("style").decal
			})), te && (F = uD(te.get("smooth"))), p.setShape({
				smooth: ee,
				stackedOnSmooth: F,
				smoothMonotone: P,
				connectNulls: x
			}), ad(p, e, "areaStyle"), Kl(p).seriesIndex = e.seriesIndex, td(p, k, A, j);
		}
		var I = this._changePolyState;
		a.eachItemGraphicEl(function(e) {
			e && (e.onHoverStateChange = I);
		}), this._polyline.onHoverStateChange = I, this._data = a, this._coordSys = r, this._stackedOnPoints = y, this._points = c, this._step = w, this._valueOrigin = _;
		var L = e.get("triggerEvent"), R = e.get("triggerLineEvent"), ne = R === !0 || L === !0 || L === "line", re = R === !0 || L === !0 || L === "area";
		this.packEventData(e, f, ne), p && this.packEventData(e, p, re);
	}, t.prototype.packEventData = function(e, t, n) {
		Kl(t).eventData = n ? {
			componentType: "series",
			componentSubType: "line",
			componentIndex: e.componentIndex,
			seriesIndex: e.seriesIndex,
			seriesName: e.name,
			seriesType: "line",
			selfType: t === this._polygon ? "area" : "line"
		} : null;
	}, t.prototype.highlight = function(e, t, n, r) {
		var i = e.getData(), a = zo(i, r);
		if (this._changePolyState("emphasis"), !(a instanceof Array) && a != null && a >= 0) {
			var o = i.getLayout("points"), s = i.getItemGraphicEl(a);
			if (!s) {
				var c = o[a * 2], l = o[a * 2 + 1];
				if (GE(c, l) || this._clipShapeForSymbol && !this._clipShapeForSymbol.contain(c, l)) return;
				var u = e.get("zlevel") || 0, d = e.get("z") || 0;
				s = new FE(i, a), s.x = c, s.y = l, s.setZ(u, d);
				var f = s.getSymbolPath().getTextContent();
				f && (f.zlevel = u, f.z = d, f.z2 = this._polyline.z2 + 1), s.__temp = !0, i.setItemGraphicEl(a, s), s.stopSymbolAnimation(!0), this.group.add(s);
			}
			s.highlight();
		} else ey.prototype.highlight.call(this, e, t, n, r);
	}, t.prototype.downplay = function(e, t, n, r) {
		var i = e.getData(), a = zo(i, r);
		if (this._changePolyState("normal"), a != null && a >= 0) {
			var o = i.getItemGraphicEl(a);
			o && (o.__temp ? (i.setItemGraphicEl(a, null), this.group.remove(o)) : o.downplay());
		} else ey.prototype.downplay.call(this, e, t, n, r);
	}, t.prototype._changePolyState = function(e) {
		var t = this._polygon;
		Du(this._polyline, e), t && Du(t, e);
	}, t.prototype._newPolyline = function(e) {
		var t = this._polyline;
		return t && this._lineGroup.remove(t), t = new tD({
			shape: { points: e },
			segmentIgnoreThreshold: 2,
			z2: 10
		}), this._lineGroup.add(t), this._polyline = t, t;
	}, t.prototype._newPolygon = function(e, t) {
		var n = this._polygon;
		return n && this._lineGroup.remove(n), n = new rD({
			shape: {
				points: e,
				stackedOnPoints: t
			},
			segmentIgnoreThreshold: 2
		}), this._lineGroup.add(n), this._polygon = n, n;
	}, t.prototype._initSymbolLabelAnimation = function(e, t, n) {
		var r, i, a = t.getBaseAxis(), o = a.inverse;
		t.type === "cartesian2d" ? (r = a.isHorizontal(), i = !1) : t.type === "polar" && (r = a.dim === "angle", i = !0);
		var s = e.hostModel, c = s.get("animationDuration");
		U(c) && (c = c(null));
		var l = s.get("animationDelay") || 0, u = U(l) ? l(null) : l;
		e.eachItemGraphicEl(function(e, a) {
			var s = e;
			if (s) {
				var d = [e.x, e.y], f = void 0, p = void 0, m = void 0;
				if (n) {
					if (i) {
						var h = n, g = t.pointToCoord(d);
						r ? (f = h.startAngle, p = h.endAngle, m = -g[1] / 180 * Math.PI) : (f = h.r0, p = h.r, m = g[0]);
					} else {
						var _ = n;
						r ? (f = _.x, p = _.x + _.width, m = e.x) : (f = _.y + _.height, p = _.y, m = e.y);
					}
				}
				var v = p === f ? 0 : (m - f) / (p - f);
				o && (v = 1 - v);
				var y = U(l) ? l(a) : c * v + u, b = s.getSymbolPath(), x = b.getTextContent();
				s.attr({
					scaleX: 0,
					scaleY: 0
				}), s.animateTo({
					scaleX: 1,
					scaleY: 1
				}, {
					duration: 200,
					setToFinal: !0,
					delay: y
				}), x && x.animateFrom({ style: { opacity: 0 } }, {
					duration: 300,
					delay: y
				}), b.disableLabelAnimation = !0;
			}
		});
	}, t.prototype._initOrUpdateEndLabel = function(e, t, n) {
		var r = e.getModel("endLabel");
		if (bD(e)) {
			var i = e.getData(), a = this._polyline, o = i.getLayout("points");
			if (!o) {
				a.removeTextContent(), this._endLabel = null;
				return;
			}
			var s = this._endLabel;
			s || (s = this._endLabel = new Ml({ z2: 200 }), s.ignoreClip = !0, a.setTextContent(this._endLabel), a.disableLabelAnimation = !0);
			var c = _D(o);
			c >= 0 && (Vp(a, Hp(e, "endLabel"), {
				inheritColor: n,
				labelFetcher: e,
				labelDataIndex: c,
				defaultText: function(e, t, n) {
					return n == null ? NE(i, e) : PE(i, n);
				},
				enableTextSetter: !0
			}, SD(r, t)), a.textConfig.position = null);
		} else this._endLabel &&= (this._polyline.removeTextContent(), null);
	}, t.prototype._endLabelOnDuring = function(e, t, n, r, i, a, o) {
		var s = this._endLabel, c = this._polyline;
		if (s) {
			e < 1 && r.originalX == null && (r.originalX = s.x, r.originalY = s.y);
			var l = n.getLayout("points"), u = n.hostModel, d = u.get("connectNulls"), f = a.get("precision"), p = a.get("distance") || 0, m = o.getBaseAxis(), h = m.isHorizontal(), g = m.inverse, _ = t.shape, v = g ? h ? _.x : _.y + _.height : h ? _.x + _.width : _.y, y = (h ? p : 0) * (g ? -1 : 1), b = (h ? 0 : -p) * (g ? -1 : 1), x = h ? "x" : "y", S = yD(l, v, x), C = S.range, w = C[1] - C[0], T = void 0;
			if (w >= 1) {
				if (w > 1 && !d) {
					var E = vD(l, C[0]);
					s.attr({
						x: E[0] + y,
						y: E[1] + b
					}), i && (T = u.getRawValue(C[0]));
				} else {
					var E = c.getPointOn(v, x);
					E && s.attr({
						x: E[0] + y,
						y: E[1] + b
					});
					var D = u.getRawValue(C[0]), O = u.getRawValue(C[1]);
					i && (T = Yo(n, f, D, O, S.t));
				}
				r.lastFrameIndex = C[0];
			} else {
				var k = e === 1 || r.lastFrameIndex > 0 ? C[0] : 0, E = vD(l, k);
				i && (T = u.getRawValue(k)), s.attr({
					x: E[0] + y,
					y: E[1] + b
				});
			}
			if (i) {
				var A = Qp(s);
				typeof A.setLabelText == "function" && A.setLabelText(T);
			}
		}
	}, t.prototype._doUpdateAnimation = function(e, t, n, r, i, a, o) {
		var s = this._polyline, c = this._polygon, l = e.hostModel, u = XE(this._data, e, this._stackedOnPoints, t, this._coordSys, n, this._valueOrigin, a), d = u.current, f = u.stackedOnCurrent, p = u.next, m = u.stackedOnNext;
		if (i && (f = fD(u.stackedOnCurrent, u.current, n, i, o), d = fD(u.current, null, n, i, o), m = fD(u.stackedOnNext, u.next, n, i, o), p = fD(u.next, null, n, i, o)), lD(d, p) > 3e3 || c && lD(f, m) > 3e3) {
			s.stopAnimation(), s.setShape({ points: p }), c && (c.stopAnimation(), c.setShape({
				points: p,
				stackedOnPoints: m
			}));
			return;
		}
		s.shape.__points = u.current, s.shape.points = d;
		var h = { shape: { points: p } };
		u.current !== d && (h.shape.__points = u.next), s.stopAnimation(), Lf(s, h, l), c && (c.setShape({
			points: d,
			stackedOnPoints: f
		}), c.stopAnimation(), Lf(c, { shape: { stackedOnPoints: m } }, l), s.shape.points !== c.shape.points && (c.shape.points = s.shape.points));
		for (var g = [], _ = u.status, v = 0; v < _.length; v++) if (_[v].cmd === "=") {
			var y = e.getItemGraphicEl(_[v].idx1);
			y && g.push({
				el: y,
				ptIdx: v
			});
		}
		s.animators && s.animators.length && s.animators[0].during(function() {
			c && c.dirtyShape();
			for (var e = s.shape.__points, t = 0; t < g.length; t++) {
				var n = g[t].el, r = g[t].ptIdx * 2;
				n.x = e[r], n.y = e[r + 1], n.markRedraw();
			}
		});
	}, t.prototype.remove = function(e) {
		var t = this.group, n = this._data;
		this._lineGroup.removeAll(), this._symbolDraw.remove(!0), n && n.eachItemGraphicEl(function(e, r) {
			e.__temp && (t.remove(e), n.setItemGraphicEl(r, null));
		}), this._polyline = this._polygon = this._coordSys = this._points = this._stackedOnPoints = this._endLabel = this._data = null;
	}, t.type = "line", t;
}(ey);
//#endregion
//#region node_modules/echarts/lib/layout/points.js
function wD(e, t) {
	return {
		seriesType: e,
		plan: Zv(),
		reset: function(e) {
			var n = e.getData(), r = e.coordinateSystem, i = e.pipelineContext, a = t || i.large;
			if (r) {
				var o = R(r.dimensions, function(e) {
					return n.mapDimension(e);
				}).slice(0, 2), s = o.length, c = n.getCalculationInfo("stackResultDimension");
				jC(n, o[0]) && (o[0] = c), jC(n, o[1]) && (o[1] = c);
				var l = n.getStore(), u = n.getDimensionIndex(o[0]), d = n.getDimensionIndex(o[1]);
				return s && { progress: function(e, t) {
					for (var n = e.end - e.start, i = a && qE(n * s), o = [], c = [], f = e.start, p = 0; f < e.end; f++) {
						var m = void 0;
						if (s === 1) {
							var h = l.get(u, f);
							m = r.dataToPoint(h, null, c);
						} else o[0] = l.get(u, f), o[1] = l.get(d, f), m = r.dataToPoint(o, null, c);
						a ? (i[p++] = m[0], i[p++] = m[1]) : t.setItemLayout(f, m.slice());
					}
					a && (t.setLayout("points", i), t.setLayout("pointsRange", {
						start: e.start,
						end: e.end
					}));
				} };
			}
		}
	};
}
//#endregion
//#region node_modules/echarts/lib/processor/dataSample.js
var TD = {
	average: function(e) {
		for (var t = 0, n = 0, r = 0; r < e.length; r++) isNaN(e[r]) || (t += e[r], n++);
		return n === 0 ? NaN : t / n;
	},
	sum: function(e) {
		for (var t = 0, n = 0; n < e.length; n++) t += e[n] || 0;
		return t;
	},
	max: function(e) {
		for (var t = -Infinity, n = 0; n < e.length; n++) e[n] > t && (t = e[n]);
		return isFinite(t) ? t : NaN;
	},
	min: function(e) {
		for (var t = Infinity, n = 0; n < e.length; n++) e[n] < t && (t = e[n]);
		return isFinite(t) ? t : NaN;
	},
	nearest: function(e) {
		return e[0];
	}
}, ED = function(e) {
	return Math.round(e.length / 2);
};
function DD(e) {
	return {
		seriesType: e,
		reset: function(e, t, n) {
			var r = e.getData(), i = e.get("sampling"), a = e.coordinateSystem, o = r.count();
			if (o > 10 && a.type === "cartesian2d" && i) {
				var s = a.getBaseAxis(), c = a.getOtherAxis(s), l = s.getExtent(), u = n.getDevicePixelRatio(), d = Math.abs(l[1] - l[0]) * (u || 1), f = Math.round(o / d);
				if (isFinite(f) && f > 1) {
					i === "lttb" ? e.setData(r.lttbDownSample(r.mapDimension(c.dim), 1 / f)) : i === "minmax" && e.setData(r.minmaxDownSample(r.mapDimension(c.dim), 1 / f));
					var p = void 0;
					W(i) ? p = TD[i] : U(i) && (p = i), p && e.setData(r.downSample(r.mapDimension(c.dim), 1 / f, p, ED));
				}
			}
		}
	};
}
//#endregion
//#region node_modules/echarts/lib/chart/line/install.js
function OD(e) {
	e.registerChartView(CD), e.registerSeriesModel(ME), e.registerLayout(wD("line", !0)), e.registerVisual({
		seriesType: "line",
		reset: function(e) {
			var t = e.getData(), n = e.getModel("lineStyle").getLineStyle();
			n && !n.stroke && (n.stroke = t.getVisual("style").fill), t.setVisual("legendLineStyle", n);
		}
	}), e.registerProcessor(e.PRIORITY.PROCESSOR.STATISTIC, DD("line"));
}
//#endregion
//#region node_modules/echarts/lib/coord/cartesian/Axis2D.js
var kD = function(e) {
	r(t, e);
	function t(t, n, r, i, a) {
		var o = e.call(this, t, n, r) || this;
		return o.index = 0, o.type = i || "value", o.position = a || "bottom", o;
	}
	return t.prototype.isHorizontal = function() {
		var e = this.position;
		return e === "top" || e === "bottom";
	}, t.prototype.getGlobalExtent = function(e) {
		var t = this.getExtent();
		return t[0] = this.toGlobalCoord(t[0]), t[1] = this.toGlobalCoord(t[1]), e && t[0] > t[1] && t.reverse(), t;
	}, t.prototype.pointToData = function(e, t) {
		return this.coordToData(this.toLocalCoord(e[this.dim === "x" ? 0 : 1]), t);
	}, t.prototype.setCategorySortInfo = function(e) {
		if (this.type !== "category") return !1;
		this.model.option.categorySortInfo = e, this.scale.setSortInfo(e);
	}, t;
}(mE), AD = null;
function jD() {
	return AD;
}
//#endregion
//#region node_modules/echarts/lib/component/axis/axisAction.js
var MD = "expandAxisBreak", ND = Math.PI, PD = [
	[
		1,
		2,
		1,
		2
	],
	[
		5,
		3,
		5,
		3
	],
	[
		8,
		3,
		8,
		3
	]
], FD = [
	[
		0,
		1,
		0,
		1
	],
	[
		0,
		3,
		0,
		3
	],
	[
		0,
		3,
		0,
		3
	]
], ID = X(), LD = X(), RD = function() {
	function e(e) {
		this.recordMap = {}, this.resolveAxisNameOverlap = e;
	}
	return e.prototype.ensureRecord = function(e) {
		var t = e.axis.dim, n = e.componentIndex, r = this.recordMap, i = r[t] || (r[t] = []);
		return i[n] || (i[n] = { ready: {} });
	}, e;
}();
function zD(e, t, n, r) {
	var i = n.axis, a = t.ensureRecord(n), o = [], s, c = lO(e.axisName) && qw(e.nameLocation);
	L(r, function(e) {
		var t = CE(e);
		if (t && !t.label.ignore) {
			o.push(t);
			var n = a.transGroup;
			c && (n.transform ? Pt(BD, n.transform) : Ot(BD), t.transform && At(BD, BD, t.transform), J.copy(VD, t.localRect), VD.applyTransform(BD), s ? s.union(VD) : J.copy(s = new J(0, 0, 0, 0), VD));
		}
	});
	var l = Math.abs(a.dirVec.x) > .1 ? "x" : "y", u = a.transGroup[l];
	if (o.sort(function(e, t) {
		return Math.abs(e.label[l] - u) - Math.abs(t.label[l] - u);
	}), c && s) {
		var d = i.getExtent(), f = Math.min(d[0], d[1]), p = Math.max(d[0], d[1]) - f;
		s.union(new J(f, 0, p, 1));
	}
	a.stOccupiedRect = s, a.labelInfoList = o;
}
var BD = Dt(), VD = new J(0, 0, 0, 0), HD = function(e, t, n, r, i, a) {
	if (qw(e.nameLocation)) {
		var o = a.stOccupiedRect;
		o && UD(EE({}, o, a.transGroup.transform), r, i);
	} else WD(a.labelInfoList, a.dirVec, r, i);
};
function UD(e, t, n) {
	var r = new Ft();
	jE(e, t, r, {
		direction: Math.atan2(n.y, n.x),
		bidirectional: !1,
		touchThreshold: .05
	}) && DE(t, r);
}
function WD(e, t, n, r) {
	for (var i = Ft.dot(r, t) >= 0, a = 0, o = e.length; a < o; a++) {
		var s = e[i ? a : o - 1 - a];
		s.label.ignore || UD(s, n, r);
	}
}
var GD = function() {
	function e(e, t, n, r) {
		this.group = new va(), this._axisModel = e, this._api = t, this._local = {}, this._shared = r || new RD(HD), this._resetCfgDetermined(n);
	}
	return e.prototype.updateCfg = function(e) {
		var t = this._cfg.raw;
		t.position = e.position, t.labelOffset = e.labelOffset, this._resetCfgDetermined(t);
	}, e.prototype.__getRawCfg = function() {
		return this._cfg.raw;
	}, e.prototype._resetCfgDetermined = function(e) {
		var t = this._axisModel, n = t.getDefaultOption ? t.getDefaultOption() : {}, r = K(e.axisName, t.get("name")), i = t.get("nameMoveOverlap");
		(i == null || i === "auto") && (i = K(e.defaultNameMoveOverlap, !0));
		var a = {
			raw: e,
			position: e.position,
			rotation: e.rotation,
			nameDirection: K(e.nameDirection, 1),
			tickDirection: K(e.tickDirection, 1),
			labelDirection: K(e.labelDirection, 1),
			labelOffset: K(e.labelOffset, 0),
			silent: K(e.silent, !0),
			axisName: r,
			nameLocation: he(t.get("nameLocation"), n.nameLocation, "end"),
			shouldNameMoveOverlap: lO(r) && i,
			optionHideOverlap: t.get(["axisLabel", "hideOverlap"]),
			showMinorTicks: t.get(["minorTick", "show"])
		};
		this._cfg = a;
		var o = new va({
			x: a.position[0],
			y: a.position[1],
			rotation: a.rotation
		});
		o.updateTransform(), this._transformGroup = o;
		var s = this._shared.ensureRecord(t);
		s.transGroup = this._transformGroup, s.dirVec = new Ft(Math.cos(-a.rotation), Math.sin(-a.rotation));
	}, e.prototype.build = function(e, t) {
		var n = this;
		return e ||= {
			axisLine: !0,
			axisTickLabelEstimate: !1,
			axisTickLabelDetermine: !0,
			axisName: !0
		}, L(KD, function(r) {
			e[r] && qD[r](n._cfg, n._local, n._shared, n._axisModel, n.group, n._transformGroup, n._api, t || {});
		}), this;
	}, e.innerTextLayout = function(e, t, n) {
		var r = Za(t - e), i, a;
		return Qa(r) ? (a = n > 0 ? "top" : "bottom", i = "center") : Qa(r - ND) ? (a = n > 0 ? "bottom" : "top", i = "center") : (a = "middle", i = r > 0 && r < ND ? n > 0 ? "right" : "left" : n > 0 ? "left" : "right"), {
			rotation: r,
			textAlign: i,
			textVerticalAlign: a
		};
	}, e.makeAxisEventDataBase = function(e) {
		var t = {
			componentType: e.mainType,
			componentIndex: e.componentIndex
		};
		return t[e.mainType + "Index"] = e.componentIndex, t;
	}, e.isLabelSilent = function(e) {
		var t = e.get("tooltip");
		return e.get("silent") || !(e.get("triggerEvent") || t && t.show);
	}, e;
}(), KD = [
	"axisLine",
	"axisTickLabelEstimate",
	"axisTickLabelDetermine",
	"axisName"
], qD = {
	axisLine: function(e, t, n, r, i, a, o) {
		var s = r.get(["axisLine", "show"]);
		if (s === "auto" && (s = !0, e.raw.axisLineAutoShow != null && (s = !!e.raw.axisLineAutoShow)), s) {
			var c = r.axis.getExtent(), l = a.transform, u = [c[0], 0], d = [c[1], 0], f = u[0] > d[0];
			l && (Ke(u, u, l), Ke(d, d, l));
			var p = M({ lineCap: "round" }, r.getModel(["axisLine", "lineStyle"]).getLineStyle()), m = {
				strokeContainThreshold: e.raw.strokeContainThreshold || 5,
				silent: !0,
				z2: 1,
				style: p
			};
			if (r.get(["axisLine", "breakLine"]) && jm(r.axis.scale)) jD().buildAxisBreakLine(r, i, a, m);
			else {
				var h = new ff(M({ shape: {
					x1: u[0],
					y1: u[1],
					x2: d[0],
					y2: d[1]
				} }, m));
				ip(h.shape, h.style.lineWidth), h.anid = "line", i.add(h);
			}
			var g = r.get(["axisLine", "symbol"]);
			if (g != null) {
				var _ = r.get(["axisLine", "symbolSize"]);
				W(g) && (g = [g, g]), (W(_) || se(_)) && (_ = [_, _]);
				var v = yb(r.get(["axisLine", "symbolOffset"]) || 0, _), y = _[0], b = _[1];
				L([{
					rotate: e.rotation + Math.PI / 2,
					offset: v[0],
					r: 0
				}, {
					rotate: e.rotation - Math.PI / 2,
					offset: v[1],
					r: Math.sqrt((u[0] - d[0]) * (u[0] - d[0]) + (u[1] - d[1]) * (u[1] - d[1]))
				}], function(t, n) {
					if (g[n] !== "none" && g[n] != null) {
						var r = _b(g[n], -y / 2, -b / 2, y, b, p.stroke, !0), a = t.r + t.offset, o = f ? d : u;
						r.attr({
							rotation: t.rotate,
							x: o[0] + a * Math.cos(e.rotation),
							y: o[1] - a * Math.sin(e.rotation),
							silent: !0,
							z2: 11
						}), i.add(r);
					}
				});
			}
		}
	},
	axisTickLabelEstimate: function(e, t, n, r, i, a, o, s) {
		nO(t, i, s) && JD(e, t, n, r, i, a, o, UT.estimate);
	},
	axisTickLabelDetermine: function(e, t, n, r, i, a, o, s) {
		nO(t, i, s) && JD(e, t, n, r, i, a, o, UT.determine);
		var c = eO(e, i, a, r);
		ZD(e, t.labelLayoutList, c), tO(e, i, a, r, e.tickDirection);
	},
	axisName: function(e, t, n, r, i, a, o, s) {
		var c = n.ensureRecord(r);
		t.nameEl &&= (i.remove(t.nameEl), c.nameLayout = c.nameLocation = null);
		var l = e.axisName;
		if (lO(l)) {
			var u = e.nameLocation, d = e.nameDirection, f = r.getModel("nameTextStyle"), p = r.get("nameGap") || 0, m = r.axis.getExtent(), h = r.axis.inverse ? -1 : 1, g = new Ft(0, 0), _ = new Ft(0, 0);
			u === "start" ? (g.x = m[0] - h * p, _.x = -h) : u === "end" ? (g.x = m[1] + h * p, _.x = h) : (g.x = (m[0] + m[1]) / 2, g.y = e.labelOffset + d * p, _.y = d);
			var v = Dt();
			_.transform(Mt(v, v, e.rotation));
			var y = r.get("nameRotate");
			y != null && (y = y * ND / 180);
			var b, x;
			qw(u) ? b = GD.innerTextLayout(e.rotation, y ?? e.rotation, d) : (b = YD(e.rotation, u, y || 0, m), x = e.raw.axisNameAvailableWidth, x != null && (x = Math.abs(x / Math.sin(b.rotation)), !isFinite(x) && (x = null)));
			var S = f.getFont(), C = r.get("nameTruncate", !0) || {}, w = C.ellipsis, T = me(e.raw.nameTruncateMaxWidth, C.maxWidth, x), E = s.nameMarginLevel || 0, D = new Ml({
				x: g.x,
				y: g.y,
				rotation: b.rotation,
				silent: GD.isLabelSilent(r),
				style: Up(f, {
					text: l,
					font: S,
					overflow: "truncate",
					width: T,
					ellipsis: w,
					fill: f.getTextColor() || r.get([
						"axisLine",
						"lineStyle",
						"color"
					]),
					align: f.get("align") || b.textAlign,
					verticalAlign: f.get("verticalAlign") || b.textVerticalAlign
				}),
				z2: 1
			});
			if (Cp({
				el: D,
				componentModel: r,
				itemName: l
			}), D.__fullText = l, D.anid = "name", r.get("triggerEvent")) {
				var O = GD.makeAxisEventDataBase(r);
				O.targetType = "axisName", O.name = l, Kl(D).eventData = O;
			}
			a.add(D), D.updateTransform(), t.nameEl = D;
			var k = c.nameLayout = CE({
				label: D,
				priority: D.z2,
				defaultAttr: { ignore: D.ignore },
				marginDefault: qw(u) ? PD[E] : FD[E]
			});
			if (c.nameLocation = u, i.add(D), D.decomposeTransform(), e.shouldNameMoveOverlap && k) {
				var A = n.ensureRecord(r);
				n.resolveAxisNameOverlap(e, n, r, k, _, A);
			}
		}
	}
};
function JD(e, t, n, r, i, a, o, s) {
	iO(t) || rO(e, t, i, s, r, o);
	var c = t.labelLayoutList;
	oO(e, r, c, a), dO(r, e.rotation, c);
	var l = e.optionHideOverlap;
	XD(r, c, l), l && AE(re(c, function(e) {
		return e && !e.label.ignore;
	})), zD(e, n, r, c);
}
function YD(e, t, n, r) {
	var i = Za(n - e), a, o, s = r[0] > r[1], c = t === "start" && !s || t !== "start" && s;
	return Qa(i - ND / 2) ? (o = c ? "bottom" : "top", a = "center") : Qa(i - ND * 1.5) ? (o = c ? "top" : "bottom", a = "center") : (o = "middle", a = i < ND * 1.5 && i > ND / 2 ? c ? "left" : "right" : c ? "right" : "left"), {
		rotation: i,
		textAlign: a,
		textVerticalAlign: o
	};
}
function XD(e, t, n) {
	var r = e.axis, i = e.get(["axisLabel", "customValues"]);
	if (Gw(r)) return;
	function a(e, a, o) {
		var s = CE(t[a]), c = CE(t[o]), l = r.scale;
		if (s && c) {
			if (e == null) {
				if (!n && i) return;
				var u = ID(s.label).labelInfo.tick;
				if (tw(l) && u.notNice || rw(l) && u.offInterval) {
					QD(s.label);
					return;
				}
			}
			if (e === !1 || s.suggestIgnore) {
				QD(s.label);
				return;
			}
			if (c.suggestIgnore) {
				QD(c.label);
				return;
			}
			var d = .1;
			if (!n) {
				var f = [
					0,
					0,
					0,
					0
				];
				s = OE({ marginForce: f }, s), c = OE({ marginForce: f }, c);
			}
			jE(s, c, null, { touchThreshold: d }) && QD(e ? c.label : s.label);
		}
	}
	var o = e.get(["axisLabel", "showMinLabel"]), s = e.get(["axisLabel", "showMaxLabel"]), c = t.length;
	a(o, 0, 1), a(s, c - 1, c - 2);
}
function ZD(e, t, n) {
	e.showMinorTicks || L(t, function(e) {
		if (e && e.label.ignore) for (var t = 0; t < n.length; t++) {
			var r = n[t], i = LD(r), a = ID(e.label);
			if (i.tickValue != null && !i.onBand && i.tickValue === a.labelInfo.tick.value) {
				QD(r);
				return;
			}
		}
	});
}
function QD(e) {
	e && (e.ignore = !0);
}
function $D(e, t, n, r, i) {
	for (var a = [], o = [], s = [], c = 0; c < e.length; c++) {
		var l = e[c].coord;
		o[0] = l, o[1] = 0, s[0] = l, s[1] = n, t && (Ke(o, o, t), Ke(s, s, t));
		var u = new ff({
			shape: {
				x1: o[0],
				y1: o[1],
				x2: s[0],
				y2: s[1]
			},
			style: r,
			z2: 2,
			autoBatch: !0,
			silent: !0
		});
		ip(u.shape, u.style.lineWidth), u.anid = i + "_" + e[c].tickValue, a.push(u);
		var d = LD(u);
		d.onBand = !!e[c].onBand, d.tickValue = e[c].tickValue;
	}
	return a;
}
function eO(e, t, n, r) {
	var i = r.axis, a = r.getModel("axisTick"), o = a.get("show");
	if (o === "auto" && (o = !0, e.raw.axisTickAutoShow != null && (o = !!e.raw.axisTickAutoShow)), !o || i.scale.isBlank()) return [];
	for (var s = a.getModel("lineStyle"), c = e.tickDirection * a.get("length"), l = $D(i.getTicksCoords(), n.transform, c, N(s.getLineStyle(), { stroke: r.get([
		"axisLine",
		"lineStyle",
		"color"
	]) }), "ticks"), u = 0; u < l.length; u++) t.add(l[u]);
	return l;
}
function tO(e, t, n, r, i) {
	var a = r.axis, o = r.getModel("minorTick");
	if (e.showMinorTicks && !a.scale.isBlank()) {
		var s = a.getMinorTicksCoords();
		if (s.length) for (var c = o.getModel("lineStyle"), l = i * o.get("length"), u = N(c.getLineStyle(), N(r.getModel("axisTick").getLineStyle(), { stroke: r.get([
			"axisLine",
			"lineStyle",
			"color"
		]) })), d = 0; d < s.length; d++) for (var f = $D(s[d], n.transform, l, u, "minorticks_" + d), p = 0; p < f.length; p++) t.add(f[p]);
	}
}
function nO(e, t, n) {
	if (iO(e)) {
		var r = e.axisLabelsCreationContext.out.noPxChangeTryDetermine;
		if (n.noPxChange) {
			for (var i = !0, a = 0; a < r.length; a++) i &&= r[a]();
			if (i) return !1;
		}
		r.length && (t.remove(e.labelGroup), aO(e, null, null, null));
	}
	return !0;
}
function rO(e, t, n, r, i, a) {
	var o = i.axis, s = me(e.raw.axisLabelShow, i.get(["axisLabel", "show"])), c = new va();
	n.add(c);
	var l = WT(r);
	if (!s || o.scale.isBlank()) {
		aO(t, [], c, l);
		return;
	}
	var u = i.getModel("axisLabel"), d = o.getViewLabels(l), f = (me(e.raw.labelRotate, u.get("rotate")) || 0) * ND / 180, p = GD.innerTextLayout(e.rotation, f, e.labelDirection), m = i.getCategories && i.getCategories(!0), h = [], g = i.get("triggerEvent"), _ = Infinity, v = -Infinity;
	L(d, function(e, t) {
		var n = e.tick, r = e.formattedLabel, s = e.rawLabel, l = u, f = Qw(o.scale, n);
		if (m && m[f]) {
			var y = m[f];
			G(y) && y.textStyle && (l = new um(y.textStyle, u, i.ecModel));
		}
		var b = l.getTextColor() || i.get([
			"axisLine",
			"lineStyle",
			"color"
		]), x = l.getShallow("align", !0) || p.textAlign, S = K(l.getShallow("alignMinLabel", !0), x), C = K(l.getShallow("alignMaxLabel", !0), x), w = l.getShallow("verticalAlign", !0) || l.getShallow("baseline", !0) || p.textVerticalAlign, T = K(l.getShallow("verticalAlignMinLabel", !0), w), E = K(l.getShallow("verticalAlignMaxLabel", !0), w), D = 10 + (n.time?.level || 0);
		_ = Math.min(_, D), v = Math.max(v, D);
		var O = new Ml({
			x: 0,
			y: 0,
			rotation: 0,
			silent: GD.isLabelSilent(i),
			z2: D,
			style: Up(l, {
				text: r,
				align: t === 0 ? S : t === d.length - 1 ? C : x,
				verticalAlign: t === 0 ? T : t === d.length - 1 ? E : w,
				fill: U(b) ? b(o.type === "category" ? s : o.type === "value" ? f + "" : f, t) : b
			})
		});
		O.anid = "label_" + f;
		var k = ID(O);
		if (k.labelInfo = e, k.layoutRotation = p.rotation, Cp({
			el: O,
			componentModel: i,
			itemName: r,
			formatterParamsExtra: {
				isTruncated: function() {
					return O.isTruncated;
				},
				value: s,
				tickIndex: t
			}
		}), g) {
			var A = GD.makeAxisEventDataBase(i);
			A.targetType = "axisLabel", A.value = s, A.tickIndex = t;
			var j = e.tick.break;
			if (j) {
				var M = j.parsedBreak;
				A.break = {
					start: M.vmin,
					end: M.vmax
				};
			}
			o.type === "category" && (A.dataIndex = f), Kl(O).eventData = A, j && uO(i, a, O, j);
		}
		h.push(O), c.add(O);
	}), aO(t, R(h, function(e) {
		return {
			label: e,
			priority: ID(e).labelInfo.tick.break ? e.z2 + (v - _ + 1) : e.z2,
			defaultAttr: { ignore: e.ignore }
		};
	}), c, l);
}
function iO(e) {
	return !!e.labelLayoutList;
}
function aO(e, t, n, r) {
	e.labelLayoutList = t, e.labelGroup = n, e.axisLabelsCreationContext = r;
}
function oO(e, t, n, r) {
	var i = t.get(["axisLabel", "margin"]);
	L(n, function(n, a) {
		var o = CE(n);
		if (o) {
			var s = o.label, c = ID(s);
			o.suggestIgnore = s.ignore, s.ignore = !1, Bi(sO, cO);
			var l = t.axis;
			sO.x = l.dataToCoord(Qw(l.scale, c.labelInfo.tick)), sO.y = e.labelOffset + e.labelDirection * i, sO.rotation = c.layoutRotation, r.add(sO), sO.updateTransform(), r.remove(sO), sO.decomposeTransform(), Bi(s, sO), s.markRedraw(), xE(o, !0), CE(o);
		}
	});
}
var sO = new Dl(), cO = new Dl();
function lO(e) {
	return !!e;
}
function uO(e, t, n, r) {
	n.on("click", function(n) {
		var i = {
			type: MD,
			breaks: [{
				start: r.parsedBreak.breakOption.start,
				end: r.parsedBreak.breakOption.end
			}]
		};
		i[e.axis.dim + "AxisIndex"] = e.componentIndex, t.dispatchAction(i);
	});
}
function dO(e, t, n) {
	var r = Om();
	if (r) {
		var i = r.retrieveAxisBreakPairs(n, function(e) {
			return e && ID(e.label).labelInfo.tick.break;
		}, !0), a = e.get(["breakLabelLayout", "moveOverlap"], !0);
		(a === !0 || a === "auto") && L(i, function(r) {
			jD().adjustBreakLabelPair(e.axis.inverse, t, [CE(n[r[0]]), CE(n[r[1]])]);
		});
	}
}
//#endregion
//#region node_modules/echarts/lib/coord/cartesian/cartesianAxisHelper.js
function fO(e, t, n) {
	n ||= {};
	var r = t.axis, i = {}, a = r.getAxesOnZeroOf()[0], o = r.position, s = a ? "onZero" : o, c = r.dim, l = [
		e.x,
		e.x + e.width,
		e.y,
		e.y + e.height
	], u = {
		left: 0,
		right: 1,
		top: 0,
		bottom: 1,
		onZero: 2
	}, d = t.get("offset") || 0, f = c === "x" ? [l[2] - d, l[3] + d] : [l[0] - d, l[1] + d];
	if (a) {
		var p = a.toGlobalCoord(a.dataToCoord(0));
		f[u.onZero] = Math.max(Math.min(p, f[1]), f[0]);
	}
	i.position = [c === "y" ? f[u[s]] : l[0], c === "x" ? f[u[s]] : l[3]], i.rotation = Math.PI / 2 * (c === "x" ? 0 : 1), i.labelDirection = i.tickDirection = i.nameDirection = {
		top: -1,
		bottom: 1,
		left: -1,
		right: 1
	}[o], i.labelOffset = a ? f[u[o]] - f[u.onZero] : 0, t.get(["axisTick", "inside"]) && (i.tickDirection = -i.tickDirection), me(n.labelInside, t.get(["axisLabel", "inside"])) && (i.labelDirection = -i.labelDirection);
	var m = t.get(["axisLabel", "rotate"]);
	return i.labelRotate = s === "top" ? -m : m, i.z2 = 1, i;
}
function pO(e) {
	var t = {
		xAxisModel: null,
		yAxisModel: null
	};
	return L(t, function(n, r) {
		var i = r.replace(/Model$/, "");
		t[r] = e.getReferringComponents(i, Uo).models[0];
	}), t;
}
function mO(e, t, n, r, i, a) {
	for (var o = fO(e, n), s = !1, c = !1, l = 0; l < t.length; l++) $C(t[l].getOtherAxis(n.axis).scale) && (s = c = !0, n.axis.type === "category" && n.axis.onBand && (c = !1));
	return o.axisLineAutoShow = s, o.axisTickAutoShow = c, o.defaultNameMoveOverlap = a, new GD(n, r, o, i);
}
function hO(e, t, n) {
	var r = fO(t, n);
	e.updateCfg(r);
}
//#endregion
//#region node_modules/echarts/lib/coord/cartesian/GridModel.js
var gO = {
	left: 0,
	right: 0,
	top: 0,
	bottom: 0
}, _O = ["25%", "25%"], vO = "cartesian2d", yO = function(e) {
	r(t, e);
	function t() {
		return e !== null && e.apply(this, arguments) || this;
	}
	return t.prototype.mergeDefaultAndTheme = function(t, n) {
		var r = Vh(t.outerBounds);
		e.prototype.mergeDefaultAndTheme.apply(this, arguments), r && t.outerBounds && Bh(t.outerBounds, r);
	}, t.prototype.mergeOption = function(t, n) {
		e.prototype.mergeOption.apply(this, arguments), this.option.outerBounds && t.outerBounds && Bh(this.option.outerBounds, t.outerBounds);
	}, t.type = "grid", t.dependencies = ["xAxis", "yAxis"], t.layoutMode = "box", t.defaultOption = {
		show: !1,
		z: 0,
		left: "15%",
		top: 65,
		right: "10%",
		bottom: 80,
		containLabel: !1,
		outerBoundsMode: "auto",
		outerBounds: gO,
		outerBoundsContain: "all",
		outerBoundsClampWidth: _O[0],
		outerBoundsClampHeight: _O[1],
		backgroundColor: Q.color.transparent,
		borderWidth: 1,
		borderColor: Q.color.neutral30
	}, t;
}(Wh), bO = function(e) {
	r(t, e);
	function t() {
		return e !== null && e.apply(this, arguments) || this;
	}
	return t.prototype.getCoordSysModel = function() {
		return this.getReferringComponents("grid", Uo).models[0];
	}, t.type = "cartesian2dAxis", t;
}(Wh);
F(bO, eT);
//#endregion
//#region node_modules/echarts/lib/coord/axisDefault.js
var xO = {
	show: !0,
	z: 0,
	inverse: !1,
	name: "",
	nameLocation: "end",
	nameRotate: null,
	nameTruncate: {
		maxWidth: null,
		ellipsis: "...",
		placeholder: "."
	},
	nameTextStyle: {},
	nameGap: 15,
	silent: !1,
	triggerEvent: !1,
	tooltip: { show: !1 },
	axisPointer: {},
	axisLine: {
		show: !0,
		onZero: "auto",
		onZeroAxisIndex: null,
		lineStyle: {
			color: Q.color.axisLine,
			width: 1,
			type: "solid"
		},
		symbol: ["none", "none"],
		symbolSize: [10, 15],
		breakLine: !0
	},
	axisTick: {
		show: !0,
		inside: !1,
		length: 5,
		lineStyle: { width: 1 }
	},
	axisLabel: {
		show: !0,
		inside: !1,
		rotate: 0,
		showMinLabel: null,
		showMaxLabel: null,
		margin: 8,
		fontSize: 12,
		color: Q.color.axisLabel,
		textMargin: [0, 3]
	},
	splitLine: {
		show: !0,
		showMinLine: !0,
		showMaxLine: !0,
		lineStyle: {
			color: Q.color.axisSplitLine,
			width: 1,
			type: "solid"
		}
	},
	splitArea: {
		show: !1,
		areaStyle: { color: [Q.color.backgroundTint, Q.color.backgroundTransparent] }
	},
	breakArea: {
		show: !0,
		itemStyle: {
			color: Q.color.neutral00,
			borderColor: Q.color.border,
			borderWidth: 1,
			borderType: [3, 3],
			opacity: .6
		},
		zigzagAmplitude: 4,
		zigzagMinSpan: 4,
		zigzagMaxSpan: 20,
		zigzagZ: 100,
		expandOnClick: !0
	},
	breakLabelLayout: { moveOverlap: "auto" }
}, SO = A({
	boundaryGap: !0,
	deduplication: null,
	jitter: 0,
	jitterOverlap: !0,
	jitterMargin: 2,
	splitLine: { show: !1 },
	axisTick: {
		alignWithLabel: !1,
		interval: "auto",
		show: "auto"
	},
	axisLabel: { interval: "auto" }
}, xO), CO = A({
	boundaryGap: [0, 0],
	axisLine: { show: "auto" },
	axisTick: { show: "auto" },
	splitNumber: 5,
	minorTick: {
		show: !1,
		splitNumber: 5,
		length: 3,
		lineStyle: {}
	},
	minorSplitLine: {
		show: !1,
		lineStyle: {
			color: Q.color.axisMinorSplitLine,
			width: 1
		}
	}
}, xO), wO = {
	category: SO,
	value: CO,
	time: A({
		splitNumber: 6,
		axisLabel: { rich: { primary: { fontWeight: "bold" } } },
		splitLine: { show: !1 }
	}, CO),
	log: N({ logBase: 10 }, CO)
};
//#endregion
//#region node_modules/echarts/lib/coord/axisModelCreator.js
function TO(e, t, n, i) {
	L(Fw, function(a, o) {
		var s = A(A({}, wO[o], !0), i, !0), c = function(e) {
			r(n, e);
			function n() {
				var n = e !== null && e.apply(this, arguments) || this;
				return n.type = t + "Axis." + o, n;
			}
			return n.prototype.mergeDefaultAndTheme = function(e, t) {
				var n = zh(this), r = n ? Vh(e) : {};
				A(e, t.getTheme().get(o + "Axis")), A(e, this.getDefaultOption()), e.type = EO(e), n && Bh(e, r, n);
			}, n.prototype.optionUpdated = function() {
				this.option.type === "category" && (this.__ordinalMeta = BC.createByAxisModel(this));
			}, n.prototype.getCategories = function(e) {
				var t = this.option;
				if (t.type === "category") return e ? t.data : this.__ordinalMeta.categories;
			}, n.prototype.getOrdinalMeta = function() {
				return this.__ordinalMeta;
			}, n.prototype.updateAxisBreaks = function(e) {
				var t = jD();
				return t ? t.updateModelAxisBreak(this, e) : { breaks: [] };
			}, n.type = t + "Axis." + o, n.defaultOption = s, n;
		}(n);
		e.registerComponentModel(c);
	}), e.registerSubTypeDefaulter(t + "Axis", EO);
}
function EO(e) {
	return e.type || (e.data ? "category" : "value");
}
//#endregion
//#region node_modules/echarts/lib/coord/cartesian/Cartesian.js
var DO = function() {
	function e(e) {
		this.type = "cartesian", this._dimList = [], this._axes = {}, this.name = e || "";
	}
	return e.prototype.getAxis = function(e) {
		return this._axes[e];
	}, e.prototype.getAxes = function() {
		return R(this._dimList, function(e) {
			return this._axes[e];
		}, this);
	}, e.prototype.getAxesByScale = function(e) {
		return e = e.toLowerCase(), re(this.getAxes(), function(t) {
			return t.scale.type === e;
		});
	}, e.prototype.addAxis = function(e) {
		var t = e.dim;
		this._axes[t] = e, this._dimList.push(t);
	}, e;
}(), OO = ["x", "y"];
function kO(e) {
	return (e.type === "interval" || e.type === "time") && !jm(e);
}
var AO = function(e) {
	r(t, e);
	function t() {
		var t = e !== null && e.apply(this, arguments) || this;
		return t.type = vO, t.dimensions = OO, t;
	}
	return t.prototype.calcAffineTransform = function() {
		this._transform = this._invTransform = null;
		var e = this.getAxis("x").scale, t = this.getAxis("y").scale;
		if (kO(e) && kO(t)) {
			var n = qC(e, null), r = qC(t, null), i = this.dataToPoint([n[0], r[0]]), a = this.dataToPoint([n[1], r[1]]), o = n[1] - n[0], s = r[1] - r[0];
			if (o && s) {
				var c = (a[0] - i[0]) / o, l = (a[1] - i[1]) / s, u = i[0] - n[0] * c, d = i[1] - r[0] * l, f = this._transform = [
					c,
					0,
					0,
					l,
					u,
					d
				];
				this._invTransform = Pt([], f);
			}
		}
	}, t.prototype.getBaseAxis = function() {
		return this.getAxesByScale("ordinal")[0] || this.getAxesByScale("time")[0] || this.getAxis("x");
	}, t.prototype.containPoint = function(e) {
		var t = this.getAxis("x"), n = this.getAxis("y");
		return t.contain(t.toLocalCoord(e[0])) && n.contain(n.toLocalCoord(e[1]));
	}, t.prototype.containData = function(e) {
		return this.getAxis("x").containData(e[0]) && this.getAxis("y").containData(e[1]);
	}, t.prototype.containZone = function(e, t) {
		var n = this.dataToPoint(e), r = this.dataToPoint(t), i = this.getArea(), a = new J(n[0], n[1], r[0] - n[0], r[1] - n[1]);
		return i.intersect(a);
	}, t.prototype.dataToPoint = function(e, t, n) {
		n ||= [];
		var r = e[0], i = e[1];
		if (this._transform && r != null && isFinite(r) && i != null && isFinite(i)) return Ke(n, e, this._transform);
		var a = this.getAxis("x"), o = this.getAxis("y");
		return n[0] = a.toGlobalCoord(a.dataToCoord(r, t)), n[1] = o.toGlobalCoord(o.dataToCoord(i, t)), n;
	}, t.prototype.clampData = function(e, t) {
		var n = this.getAxis("x").scale, r = this.getAxis("y").scale, i = n.getExtent(), a = r.getExtent(), o = n.parse(e[0]), s = r.parse(e[1]);
		return t ||= [], t[0] = Math.min(Math.max(Math.min(i[0], i[1]), o), Math.max(i[0], i[1])), t[1] = Math.min(Math.max(Math.min(a[0], a[1]), s), Math.max(a[0], a[1])), t;
	}, t.prototype.pointToData = function(e, t, n) {
		if (n ||= [], this._invTransform) return Ke(n, e, this._invTransform);
		var r = this.getAxis("x"), i = this.getAxis("y");
		return n[0] = r.coordToData(r.toLocalCoord(e[0]), t), n[1] = i.coordToData(i.toLocalCoord(e[1]), t), n;
	}, t.prototype.getOtherAxis = function(e) {
		return this.getAxis(e.dim === "x" ? "y" : "x");
	}, t.prototype.getArea = function(e) {
		e ||= 0;
		var t = this.getAxis("x").getGlobalExtent(), n = this.getAxis("y").getGlobalExtent(), r = Math.min(t[0], t[1]) - e, i = Math.min(n[0], n[1]) - e;
		return new J(r, i, Math.max(t[0], t[1]) - r + e, Math.max(n[0], n[1]) - i + e);
	}, t;
}(DO);
//#endregion
//#region node_modules/echarts/lib/coord/axisAlignTicks.js
function jO(e, t) {
	var n = e.scale, r = e.model, i = DT(n, r, r.ecModel, e, null), a = nw(n), o = nw(t) ? t.intervalStub : t, s = a ? n.intervalStub : n, c = n.base, l = o.getTicks(), u = o.getTicks({ expandToNicedExtent: !0 }), d = l.length - 1, f, p, m;
	if (d === 1) f = p = 0, m = 1;
	else if (d === 2) {
		var h = ja(l[0].value - l[1].value), g = ja(l[1].value - l[2].value);
		f = p = 0, h === g ? m = 2 : (m = 1, h < g ? f = h / g : p = g / h);
	} else {
		var _ = o.getConfig().interval;
		f = (1 - (l[0].value - u[0].value) / _) % 1, p = (1 - (u[d].value - l[d].value) / _) % 1, m = d - +!!f - !!p;
	}
	var v = i.zoomFixMM, y = v[0] || v[1], b = [i.fixMM[0] || y, i.fixMM[1] || y], x = n.getExtent(), S = s.getExtent(), C = cw(S, b), w, T, E, D, O, k;
	function A(e) {
		for (var t = 50, n = 0; n < t && !e(); n++) E = a ? E * Aa(c, 2) : iw(E), D = aw(E);
	}
	function j() {
		w = Y(k - E * f, D);
	}
	function M() {
		T = Y(O + E * p, D);
	}
	function ee() {
		k = f ? Y(w + E * f, D) : w;
	}
	function N() {
		O = p ? Y(T - E * p, D) : T;
	}
	if (b[0] && b[1]) {
		w = C[0], T = C[1], E = (T - w) / (m + f + p);
		var P = e.getExtent(), te = ja(P[1] - P[0]);
		D = Ja([T, w], te, .5 / m), ee(), N(), lo(D) && (E = Y(E, D));
	} else {
		var F = C[1] - C[0];
		E = a ? Aa(to(F), 1) : ro(F / m, 2), D = aw(E), b[0] ? (w = C[0], A(function() {
			if (ee(), O = Y(k + E * m, D), M(), T >= C[1]) return !0;
		})) : b[1] ? (T = C[1], A(function() {
			if (N(), k = Y(O - E * m, D), j(), w <= C[0]) return !0;
		})) : A(function() {
			k = Y(Pa(C[0] / E) * E, D), O = Y(Na(C[1] / E) * E, D);
			var e = Ma((O - k) / E);
			if (e <= m) {
				var t = m - e, n = void 0, r = i.incl0 || a;
				if (r && C[0] === 0) n = [0, t];
				else if (r && C[1] === 0) n = [t, 0];
				else {
					var o = Na(t / 2);
					n = t % 2 == 0 ? [o, o] : w + T < C[0] + C[1] ? [o, o + 1] : [o + 1, o];
				}
				if (k = Y(k - E * n[0], D), O = Y(O + E * n[1], D), j(), M(), w <= C[0] && T >= C[1]) return !0;
			}
		});
	}
	Zw(n, b, S, [w, T], x, {
		interval: E,
		intervalCount: m,
		intervalPrecision: D,
		niceExtent: [k, O]
	});
}
//#endregion
//#region node_modules/echarts/lib/coord/cartesian/Grid.js
var MO = [[3, 1], [0, 2]], NO = function() {
	function e(e, t, n) {
		this.type = "grid", this._coordsMap = {}, this._coordsList = [], this._axesMap = {}, this._axesList = [], this.axisPointerEnabled = !0, this.dimensions = OO, this._initCartesian(e, t, n), this.model = e;
	}
	return e.prototype.getRect = function() {
		return this._rect;
	}, e.prototype.update = function(e, t) {
		var n = this._axesMap;
		L(this._axesList, function(e) {
			ST(e, 1);
			var t = e.scale;
			rw(t) && t.setSortInfo(e.model.get("categorySortInfo"));
		});
		function r(e) {
			for (var t = z(e), n = [], r = t.length - 1; r >= 0; r--) {
				var i = e[+t[r]];
				i.__alignTo ? n.push(i) : NT(i);
			}
			L(n, function(e) {
				RO(e, e.__alignTo) ? NT(e) : jO(e, e.__alignTo.scale);
			});
		}
		r(n.x), r(n.y);
		var i = {};
		L(n.x, function(e) {
			FO(n, "y", e, i);
		}), L(n.y, function(e) {
			FO(n, "x", e, i);
		}), this.resize(this.model, t);
	}, e.prototype.resize = function(e, t, n) {
		var r = Rh(e, t), i = this._rect = Ih(e.getBoxLayoutParams(), r.refContainer), a = this._axesMap, o = this._coordsList, s = e.get("containLabel");
		if (BO(a, i), !n) {
			var c = WO(i, o, a, s, t), l = void 0;
			if (s) HO ? (HO(this._axesList, i), BO(a, i)) : l = UO(i.clone(), "axisLabel", null, i, a, c, r);
			else {
				var u = KO(e, i, r), d = u.outerBoundsRect, f = u.parsedOuterBoundsContain, p = u.outerBoundsClamp;
				d && (l = UO(d, f, p, i, a, c, r));
			}
			GO(i, a, UT.determine, null, l, r), L(this._coordsList, function(e) {
				e.calcAffineTransform();
			});
		}
	}, e.prototype.getAxis = function(e, t) {
		var n = this._axesMap[e];
		if (n != null) return n[t || 0];
	}, e.prototype.getAxes = function() {
		return this._axesList.slice();
	}, e.prototype.getCartesian = function(e, t) {
		if (e != null && t != null) {
			var n = "x" + e + "y" + t;
			return this._coordsMap[n];
		}
		G(e) && (t = e.yAxisIndex, e = e.xAxisIndex);
		for (var r = 0, i = this._coordsList; r < i.length; r++) if (i[r].getAxis("x").index === e || i[r].getAxis("y").index === t) return i[r];
	}, e.prototype.getCartesians = function() {
		return this._coordsList.slice();
	}, e.prototype.convertToPixel = function(e, t, n) {
		var r = this._findConvertTarget(t);
		return r.cartesian ? r.cartesian.dataToPoint(n) : r.axis ? r.axis.toGlobalCoord(r.axis.dataToCoord(n)) : null;
	}, e.prototype.convertFromPixel = function(e, t, n) {
		var r = this._findConvertTarget(t);
		return r.cartesian ? r.cartesian.pointToData(n) : r.axis ? r.axis.coordToData(r.axis.toLocalCoord(n)) : null;
	}, e.prototype._findConvertTarget = function(e) {
		var t = e.seriesModel, n = e.xAxisModel || t && t.getReferringComponents("xAxis", Uo).models[0], r = e.yAxisModel || t && t.getReferringComponents("yAxis", Uo).models[0], i = e.gridModel, a = this._coordsList, o, s;
		return t ? (o = t.coordinateSystem, P(a, o) < 0 && (o = null)) : n && r ? o = this.getCartesian(n.componentIndex, r.componentIndex) : n ? s = this.getAxis("x", n.componentIndex) : r ? s = this.getAxis("y", r.componentIndex) : i && i.coordinateSystem === this && (o = this._coordsList[0]), {
			cartesian: o,
			axis: s
		};
	}, e.prototype.containPoint = function(e) {
		var t = this._coordsList[0];
		if (t) return t.containPoint(e);
	}, e.prototype._initCartesian = function(e, t, n) {
		var r = this, i = this, a = {
			left: !1,
			right: !1,
			top: !1,
			bottom: !1
		}, o = {
			x: {},
			y: {}
		}, s = {
			x: 0,
			y: 0
		};
		if (t.eachComponent("xAxis", c("x"), this), t.eachComponent("yAxis", c("y"), this), !s.x || !s.y) {
			this._axesMap = {}, this._axesList = [];
			return;
		}
		this._axesMap = o, L(o.x, function(t, n) {
			L(o.y, function(i, a) {
				var o = "x" + n + "y" + a, s = new AO(o);
				s.master = r, s.model = e, r._coordsMap[o] = s, r._coordsList.push(s), s.addAxis(t), s.addAxis(i);
			});
		}), LO(o.x), LO(o.y);
		function c(t) {
			return function(n, r) {
				if (PO(n, e)) {
					var c = n.get("position");
					t === "x" ? c !== "top" && c !== "bottom" && (c = a.bottom ? "top" : "bottom") : c !== "left" && c !== "right" && (c = a.left ? "right" : "left"), a[c] = !0;
					var l = Lw(n), u = new kD(t, Rw(n, l, !0), [0, 0], l, c);
					u.onBand = $w(u.scale, n), u.inverse = n.get("inverse"), n.axis = u, u.model = n, u.grid = i, u.index = r, i._axesList.push(u), o[t][r] = u, s[t]++;
				}
			};
		}
	}, e.prototype.getTooltipAxes = function(e) {
		var t = [], n = [];
		return L(this.getCartesians(), function(r) {
			var i = e != null && e !== "auto" ? r.getAxis(e) : r.getBaseAxis(), a = r.getOtherAxis(i);
			P(t, i) < 0 && t.push(i), P(n, a) < 0 && n.push(a);
		}), {
			baseAxes: t,
			otherAxes: n
		};
	}, e.create = function(t, n) {
		var r = [];
		return t.eachComponent("grid", function(i, a) {
			var o = new e(i, t, n);
			o.name = "grid_" + a, o.resize(i, n, !0), i.coordinateSystem = o, r.push(o), L(o._axesList, function(t) {
				xT(t, e.dimIdxMap);
			});
		}), t.eachSeries(function(e) {
			var t, n;
			Ah({
				targetModel: e,
				coordSysType: vO,
				coordSysProvider: r
			});
			function r() {
				var r = pO(e), i = r.xAxisModel, a = r.yAxisModel;
				return t = i.axis, n = a.axis, i.getCoordSysModel().coordinateSystem.getCartesian(i.componentIndex, a.componentIndex);
			}
			t && n && (uT(t, e, vO), uT(n, e, vO));
		}, this), r;
	}, e.dimensions = OO, e.dimIdxMap = iC(OO), e;
}();
function PO(e, t) {
	return e.getCoordSysModel() === t;
}
function FO(e, t, n, r) {
	n.getAxesOnZeroOf = function() {
		return a ? [a] : [];
	};
	var i = e[t], a, o = n.model, s = o.get(["axisLine", "onZero"]), c = o.get(["axisLine", "onZeroAxisIndex"]);
	if (!s) return;
	if (c != null) IO(s, i[c]) && (a = i[c]);
	else for (var l in i) if (Ae(i, l) && IO(s, i[l]) && !r[u(i[l])]) {
		a = i[l];
		break;
	}
	a && (r[u(a)] = !0);
	function u(e) {
		return e.dim + "_" + e.index;
	}
}
function IO(e, t) {
	if (!t) return !1;
	var n = t.scale, r = zw(n, 0, !1), i = t && t.type !== "category" && t.type !== "time" && r !== 3;
	return i && e === "auto" && Vw(t) && (i = !1), i;
}
function LO(e) {
	for (var t = z(e), n, r = [], i = t.length - 1; i >= 0; i--) {
		var a = e[+t[i]];
		$C(a.scale) && Yw(a.model, a.type, !0) == null && (a.model.get("alignTicks") && a.model.get("interval") == null ? r.push(a) : n = a);
	}
	n ||= r.pop(), n && L(r, function(e) {
		e.__alignTo = n;
	});
}
function RO(e, t) {
	return jm(e.scale) || jm(t.scale) || t.scale.getTicks().length < 2;
}
function zO(e, t) {
	var n = e.getExtent(), r = n[0] + n[1];
	e.toGlobalCoord = e.dim === "x" ? function(e) {
		return e + t;
	} : function(e) {
		return r - e + t;
	}, e.toLocalCoord = e.dim === "x" ? function(e) {
		return e - t;
	} : function(e) {
		return r - e + t;
	};
}
function BO(e, t) {
	L(e.x, function(e) {
		return VO(e, t.x, t.width);
	}), L(e.y, function(e) {
		return VO(e, t.y, t.height);
	});
}
function VO(e, t, n) {
	var r = [0, n], i = +!!e.inverse;
	e.setExtent(r[i], r[1 - i]), zO(e, t);
}
var HO;
function UO(e, t, n, r, i, a, o) {
	GO(r, i, UT.estimate, t, !1, o);
	var s = [
		0,
		0,
		0,
		0
	];
	l(0), l(1), u(r, 0, NaN), u(r, 1, NaN);
	var c = ie(s, function(e) {
		return e > 0;
	}) == null;
	return bp(r, s, !0, !0, n), BO(i, r), c;
	function l(e) {
		L(i[Kf[e]], function(t) {
			if (Jw(t.model)) {
				var n = a.ensureRecord(t.model), r = n.labelInfoList;
				if (r) for (var i = 0; i < r.length; i++) {
					var o = r[i], s = t.scale.normalize(Qw(t.scale, ID(o.label).labelInfo.tick));
					s = e === 1 ? 1 - s : s, u(o.rect, e, s), u(o.rect, 1 - e, NaN);
				}
				var c = n.nameLayout;
				if (c) {
					var s = qw(n.nameLocation) ? .5 : NaN;
					u(c.rect, e, s), u(c.rect, 1 - e, NaN);
				}
			}
		});
	}
	function u(t, n, r) {
		var i = e[Kf[n]] - t[Kf[n]], a = t[qf[n]] + t[Kf[n]] - (e[qf[n]] + e[Kf[n]]);
		i = d(i, 1 - r), a = d(a, r);
		var o = MO[n][0], c = MO[n][1];
		s[o] = Aa(s[o], i), s[c] = Aa(s[c], a);
	}
	function d(e, t) {
		return e > 0 && !pe(t) && t > 1e-4 && (e /= t), e;
	}
}
function WO(e, t, n, r, i) {
	var a = new RD(qO);
	return L(n, function(n) {
		return L(n, function(n) {
			if (Jw(n.model)) {
				var o = !r;
				n.axisBuilder = mO(e, t, n.model, i, a, o);
			}
		});
	}), a;
}
function GO(e, t, n, r, i, a) {
	var o = n === UT.determine;
	L(t, function(t) {
		return L(t, function(t) {
			Jw(t.model) && (hO(t.axisBuilder, e, t.model), t.axisBuilder.build(o ? { axisTickLabelDetermine: !0 } : { axisTickLabelEstimate: !0 }, { noPxChange: i }));
		});
	});
	var s = {
		x: 0,
		y: 0
	};
	c(0), c(1);
	function c(t) {
		s[Kf[1 - t]] = e[qf[t]] <= a.refContainer[qf[t]] * .5 ? 0 : 1 - t == 1 ? 2 : 1;
	}
	L(t, function(e, t) {
		return L(e, function(e) {
			Jw(e.model) && ((r === "all" || o) && e.axisBuilder.build({ axisName: !0 }, { nameMarginLevel: s[t] }), o && e.axisBuilder.build({ axisLine: !0 }));
		});
	});
}
function KO(e, t, n) {
	var r, i = e.get("outerBoundsMode", !0);
	i === "same" ? r = t.clone() : (i == null || i === "auto") && (r = Ih(e.get("outerBounds", !0) || gO, n.refContainer));
	var a = e.get("outerBoundsContain", !0), o = a == null || a === "auto" || P(["all", "axisLabel"], a) < 0 ? "all" : a, s = [Ua(K(e.get("outerBoundsClampWidth", !0), _O[0]), t.width), Ua(K(e.get("outerBoundsClampHeight", !0), _O[1]), t.height)];
	return {
		outerBoundsRect: r,
		parsedOuterBoundsContain: o,
		outerBoundsClamp: s
	};
}
var qO = function(e, t, n, r, i, a) {
	var o = n.axis.dim === "x" ? "y" : "x";
	HD(e, t, n, r, i, a), qw(e.nameLocation) || L(t.recordMap[o], function(e) {
		e && e.labelInfoList && e.dirVec && WD(e.labelInfoList, e.dirVec, r, i);
	});
};
//#endregion
//#region node_modules/echarts/lib/component/axisPointer/modelHelper.js
function JO(e, t) {
	var n = {
		axesInfo: {},
		seriesInvolved: !1,
		coordSysAxesInfo: {},
		coordSysMap: {}
	};
	return YO(n, e, t), n.seriesInvolved && ZO(n, e), n;
}
function YO(e, t, n) {
	var r = t.getComponent("tooltip"), i = t.getComponent("axisPointer"), a = i.get("link", !0) || [], o = [];
	L(n.getCoordinateSystems(), function(n) {
		if (!n.axisPointerEnabled) return;
		var s = ik(n.model), c = e.coordSysAxesInfo[s] = {};
		e.coordSysMap[s] = n;
		var l = n.model.getModel("tooltip", r);
		if (L(n.getAxes(), V(p, !1, null)), n.getTooltipAxes && r && l.get("show")) {
			var u = l.get("trigger") === "axis", d = l.get(["axisPointer", "type"]) === "cross", f = n.getTooltipAxes(l.get(["axisPointer", "axis"]));
			(u || d) && L(f.baseAxes, V(p, !d || "cross", u)), d && L(f.otherAxes, V(p, "cross", !1));
		}
		function p(r, s, u) {
			var d = u.model.getModel("axisPointer", i), f = d.get("show");
			if (f && (f !== "auto" || r || rk(d))) {
				s ??= d.get("triggerTooltip"), d = r ? XO(u, l, i, t, r, s) : d;
				var p = d.get("snap"), m = d.get("triggerEmphasis"), h = ik(u.model), g = s || p || u.type === "category", _ = e.axesInfo[h] = {
					key: h,
					axis: u,
					coordSys: n,
					axisPointerModel: d,
					triggerTooltip: s,
					triggerEmphasis: m,
					involveSeries: g,
					snap: p,
					useHandle: rk(d),
					seriesModels: [],
					linkGroup: null
				};
				c[h] = _, e.seriesInvolved = e.seriesInvolved || g;
				var v = QO(a, u);
				if (v != null) {
					var y = o[v] || (o[v] = { axesInfo: {} });
					y.axesInfo[h] = _, y.mapper = a[v].mapper, _.linkGroup = y;
				}
			}
		}
	});
}
function XO(e, t, n, r, i, a) {
	var o = t.getModel("axisPointer"), s = [
		"type",
		"snap",
		"lineStyle",
		"shadowStyle",
		"label",
		"animation",
		"animationDurationUpdate",
		"animationEasingUpdate",
		"z"
	], c = {};
	L(s, function(e) {
		c[e] = k(o.get(e));
	}), c.snap = e.type !== "category" && !!a, o.get("type") === "cross" && (c.type = "line");
	var l = c.label ||= {};
	if (l.show ??= !1, i === "cross" && (l.show = o.get(["label", "show"]) ?? !0, !a)) {
		var u = c.lineStyle = o.get("crossStyle");
		u && N(l, u.textStyle);
	}
	return e.model.getModel("axisPointer", new um(c, n, r));
}
function ZO(e, t) {
	t.eachSeries(function(t) {
		var n = t.coordinateSystem, r = t.get(["tooltip", "trigger"], !0), i = t.get(["tooltip", "show"], !0);
		n && n.model && r !== "none" && r !== !1 && r !== "item" && i !== !1 && t.get(["axisPointer", "show"], !0) !== !1 && L(e.coordSysAxesInfo[ik(n.model)], function(e) {
			var r = e.axis;
			n.getAxis(r.dim) === r && (e.seriesModels.push(t), e.seriesDataCount ??= 0, e.seriesDataCount += t.getData().count());
		});
	});
}
function QO(e, t) {
	for (var n = t.model, r = t.dim, i = 0; i < e.length; i++) {
		var a = e[i] || {};
		if ($O(a[r + "AxisId"], n.id) || $O(a[r + "AxisIndex"], n.componentIndex) || $O(a[r + "AxisName"], n.name)) return i;
	}
}
function $O(e, t) {
	return e === "all" || H(e) && P(e, t) >= 0 || e === t;
}
function ek(e) {
	var t = tk(e);
	if (t) {
		var n = t.axisPointerModel, r = t.axis.scale, i = n.option, a = n.get("status"), o = n.get("value");
		o != null && (o = r.parse(o));
		var s = rk(n);
		a ?? (i.status = s ? "show" : "hide");
		var c = r.getExtent();
		(o == null || o > c[1]) && (o = c[1]), o < c[0] && (o = c[0]), i.value = o, s && (i.status = t.axis.scale.isBlank() ? "hide" : "show");
	}
}
function tk(e) {
	var t = (e.ecModel.getComponent("axisPointer") || {}).coordSysAxesInfo;
	return t && t.axesInfo[ik(e)];
}
function nk(e) {
	var t = tk(e);
	return t && t.axisPointerModel;
}
function rk(e) {
	return !!e.get(["handle", "show"]);
}
function ik(e) {
	return e.type + "||" + e.id;
}
//#endregion
//#region node_modules/echarts/lib/component/axis/AxisView.js
var ak = {}, ok = function(e) {
	r(t, e);
	function t() {
		var n = e !== null && e.apply(this, arguments) || this;
		return n.type = t.type, n;
	}
	return t.prototype.render = function(t, n, r, i) {
		this.axisPointerClass && ek(t), e.prototype.render.apply(this, arguments), this._doUpdateAxisPointerClass(t, r, !0);
	}, t.prototype.updateAxisPointer = function(e, t, n, r) {
		this._doUpdateAxisPointerClass(e, n, !1);
	}, t.prototype.remove = function(e, t) {
		var n = this._axisPointer;
		n && n.remove(t);
	}, t.prototype.dispose = function(t, n) {
		this._disposeAxisPointer(n), e.prototype.dispose.apply(this, arguments);
	}, t.prototype._doUpdateAxisPointerClass = function(e, n, r) {
		var i = t.getAxisPointerClass(this.axisPointerClass);
		if (i) {
			var a = nk(e);
			a ? (this._axisPointer ||= new i()).render(e, a, n, r) : this._disposeAxisPointer(n);
		}
	}, t.prototype._disposeAxisPointer = function(e) {
		this._axisPointer && this._axisPointer.dispose(e), this._axisPointer = null;
	}, t.registerAxisPointerClass = function(e, t) {
		ak[e] = t;
	}, t.getAxisPointerClass = function(e) {
		return e && ak[e];
	}, t.type = "axis", t;
}(Xv), sk = X();
function ck(e, t, n, r) {
	var i = n.axis;
	if (!i.scale.isBlank()) {
		var a = n.getModel("splitArea"), o = a.getModel("areaStyle"), s = o.get("color"), c = r.coordinateSystem.getRect(), l = i.getTicksCoords({
			tickModel: a,
			breakTicks: "none",
			pruneByBreak: "preserve_extent_bound"
		});
		if (l.length) {
			var u = s.length, d = sk(e).splitAreaColors, f = q(), p = 0;
			if (d) for (var m = 0; m < l.length; m++) {
				var h = d.get(l[m].tickValue);
				if (h != null) {
					p = (h + (u - 1) * m) % u;
					break;
				}
			}
			var g = i.toGlobalCoord(l[0].coord), _ = o.getAreaStyle();
			s = H(s) ? s : [s];
			for (var m = 1; m < l.length; m++) {
				var v = i.toGlobalCoord(l[m].coord), y = void 0, b = void 0, x = void 0, S = void 0;
				i.isHorizontal() ? (y = g, b = c.y, x = v - y, S = c.height, g = y + x) : (y = c.x, b = g, x = c.width, S = v - b, g = b + S);
				var C = l[m - 1].tickValue;
				C != null && f.set(C, p), t.add(new Dl({
					anid: C == null ? null : "area_" + C,
					shape: {
						x: y,
						y: b,
						width: x,
						height: S
					},
					style: N({ fill: s[p] }, _),
					autoBatch: !0,
					silent: !0
				})), p = (p + 1) % u;
			}
			sk(e).splitAreaColors = f;
		}
	}
}
function lk(e) {
	sk(e).splitAreaColors = null;
}
//#endregion
//#region node_modules/echarts/lib/component/axis/CartesianAxisView.js
var uk = [
	"splitArea",
	"splitLine",
	"minorSplitLine",
	"breakArea"
], dk = function(e) {
	r(t, e);
	function t() {
		var n = e !== null && e.apply(this, arguments) || this;
		return n.type = t.type, n.axisPointerClass = "CartesianAxisPointer", n;
	}
	return t.prototype.render = function(t, n, r, i) {
		this.group.removeAll();
		var a = this._axisGroup;
		this._axisGroup = new va(), this.group.add(this._axisGroup), Jw(t) && (this._axisGroup.add(t.axis.axisBuilder.group), L(uk, function(e) {
			t.get([e, "show"]) && fk[e](this, this._axisGroup, t, t.getCoordSysModel(), r);
		}, this), i && i.type === "changeAxisOrder" && i.isInitSort || fp(a, this._axisGroup, t), e.prototype.render.call(this, t, n, r, i));
	}, t.prototype.remove = function() {
		lk(this);
	}, t.type = "cartesianAxis", t;
}(ok), fk = {
	splitLine: function(e, t, n, r, i) {
		var a = n.axis;
		if (!a.scale.isBlank()) {
			var o = n.getModel("splitLine"), s = o.getModel("lineStyle"), c = s.get("color"), l = o.get("showMinLine") !== !1, u = o.get("showMaxLine") !== !1;
			c = H(c) ? c : [c];
			for (var d = r.coordinateSystem.getRect(), f = a.isHorizontal(), p = 0, m = a.getTicksCoords({
				tickModel: o,
				breakTicks: "none",
				pruneByBreak: "preserve_extent_bound"
			}), h = [], g = [], _ = s.getLineStyle(), v = 0; v < m.length; v++) {
				var y = a.toGlobalCoord(m[v].coord);
				if (!(v === 0 && !l || v === m.length - 1 && !u)) {
					var b = m[v].tickValue;
					f ? (h[0] = y, h[1] = d.y, g[0] = y, g[1] = d.y + d.height) : (h[0] = d.x, h[1] = y, g[0] = d.x + d.width, g[1] = y);
					var x = p++ % c.length, S = new ff({
						anid: b == null ? null : "line_" + b,
						autoBatch: !0,
						shape: {
							x1: h[0],
							y1: h[1],
							x2: g[0],
							y2: g[1]
						},
						style: N({ stroke: c[x] }, _),
						silent: !0
					});
					ip(S.shape, _.lineWidth), t.add(S);
				}
			}
		}
	},
	minorSplitLine: function(e, t, n, r, i) {
		var a = n.axis, o = n.getModel("minorSplitLine").getModel("lineStyle"), s = r.coordinateSystem.getRect(), c = a.isHorizontal(), l = a.getMinorTicksCoords();
		if (l.length) for (var u = [], d = [], f = o.getLineStyle(), p = 0; p < l.length; p++) for (var m = 0; m < l[p].length; m++) {
			var h = a.toGlobalCoord(l[p][m].coord);
			c ? (u[0] = h, u[1] = s.y, d[0] = h, d[1] = s.y + s.height) : (u[0] = s.x, u[1] = h, d[0] = s.x + s.width, d[1] = h);
			var g = new ff({
				anid: "minor_line_" + l[p][m].tickValue,
				autoBatch: !0,
				shape: {
					x1: u[0],
					y1: u[1],
					x2: d[0],
					y2: d[1]
				},
				style: f,
				silent: !0
			});
			ip(g.shape, f.lineWidth), t.add(g);
		}
	},
	splitArea: function(e, t, n, r, i) {
		ck(e, t, n, r);
	},
	breakArea: function(e, t, n, r, i) {
		var a = jD(), o = n.axis.scale;
		a && o.type !== "ordinal" && a.rectCoordBuildBreakAxis(t, e, n, r.coordinateSystem.getRect(), i);
	}
}, pk = function(e) {
	r(t, e);
	function t() {
		var n = e !== null && e.apply(this, arguments) || this;
		return n.type = t.type, n;
	}
	return t.type = "xAxis", t;
}(dk), mk = function(e) {
	r(t, e);
	function t() {
		var t = e !== null && e.apply(this, arguments) || this;
		return t.type = pk.type, t;
	}
	return t.type = "yAxis", t;
}(dk), hk = function(e) {
	r(t, e);
	function t() {
		var t = e !== null && e.apply(this, arguments) || this;
		return t.type = "grid", t;
	}
	return t.prototype.render = function(e, t) {
		this.group.removeAll(), e.get("show") && this.group.add(new Dl({
			shape: e.coordinateSystem.getRect(),
			style: N({ fill: e.get("backgroundColor") }, e.getItemStyle()),
			silent: !0,
			z2: -1
		}));
	}, t.type = "grid", t;
}(Xv), gk = { offset: 0 };
function _k(e) {
	e.registerComponentView(hk), e.registerComponentModel(yO), e.registerCoordinateSystem("cartesian2d", NO), TO(e, "x", bO, gk), TO(e, "y", bO, gk), e.registerComponentView(pk), e.registerComponentView(mk), e.registerPreprocessor(function(e) {
		e.xAxis && e.yAxis && !e.grid && (e.grid = {});
	});
}
//#endregion
//#region node_modules/echarts/lib/chart/helper/LinePath.js
var vk = ff.prototype, yk = gf.prototype, bk = function() {
	function e() {
		this.x1 = 0, this.y1 = 0, this.x2 = 0, this.y2 = 0, this.percent = 1;
	}
	return e;
}();
(function(e) {
	r(t, e);
	function t() {
		return e !== null && e.apply(this, arguments) || this;
	}
	return t;
})(bk);
function xk(e) {
	return isNaN(+e.cpx1) || isNaN(+e.cpy1);
}
var Sk = function(e) {
	r(t, e);
	function t(t) {
		var n = e.call(this, t) || this;
		return n.type = "ec-line", n;
	}
	return t.prototype.getDefaultStyle = function() {
		return {
			stroke: Q.color.neutral99,
			fill: null
		};
	}, t.prototype.getDefaultShape = function() {
		return new bk();
	}, t.prototype.buildPath = function(e, t) {
		xk(t) ? vk.buildPath.call(this, e, t) : yk.buildPath.call(this, e, t);
	}, t.prototype.pointAt = function(e) {
		return xk(this.shape) ? vk.pointAt.call(this, e) : yk.pointAt.call(this, e);
	}, t.prototype.tangentAt = function(e) {
		var t = this.shape, n = xk(t) ? [t.x2 - t.x1, t.y2 - t.y1] : yk.tangentAt.call(this, e);
		return Ve(n, n);
	}, t;
}(pl), Ck = ["fromSymbol", "toSymbol"];
function wk(e) {
	return "_" + e + "Type";
}
function Tk(e, t, n) {
	var r = t.getItemVisual(n, e);
	if (!r || r === "none") return r;
	var i = t.getItemVisual(n, e + "Size"), a = t.getItemVisual(n, e + "Rotate"), o = t.getItemVisual(n, e + "Offset"), s = t.getItemVisual(n, e + "KeepAspect"), c = vb(i), l = yb(o || 0, c);
	return r + c + l + (a || "") + (s || "");
}
function Ek(e, t, n) {
	var r = t.getItemVisual(n, e);
	if (r && r !== "none") {
		var i = t.getItemVisual(n, e + "Size"), a = t.getItemVisual(n, e + "Rotate"), o = t.getItemVisual(n, e + "Offset"), s = t.getItemVisual(n, e + "KeepAspect"), c = vb(i), l = yb(o || 0, c), u = _b(r, -c[0] / 2 + l[0], -c[1] / 2 + l[1], c[0], c[1], null, s);
		return u.__specifiedRotation = a == null || isNaN(a) ? void 0 : a * Math.PI / 180 || 0, u.name = e, u;
	}
}
function Dk(e) {
	var t = new Sk({
		name: "line",
		subPixelOptimize: !0
	});
	return Ok(t.shape, e), t;
}
function Ok(e, t) {
	e.x1 = t[0][0], e.y1 = t[0][1], e.x2 = t[1][0], e.y2 = t[1][1], e.percent = 1;
	var n = t[2];
	n ? (e.cpx1 = n[0], e.cpy1 = n[1]) : (e.cpx1 = NaN, e.cpy1 = NaN);
}
var kk = function(e) {
	r(t, e);
	function t(t, n, r) {
		var i = e.call(this) || this;
		return i._createLine(t, n, r), i;
	}
	return t.prototype._createLine = function(e, t, n) {
		var r = e.hostModel, i = e.getItemLayout(t), a = e.getItemVisual(t, "z2"), o = Dk(i);
		o.shape.percent = 0, Rf(o, {
			z2: K(a, 0),
			shape: { percent: 1 }
		}, r, t), this.add(o), L(Ck, function(n) {
			var r = Ek(n, e, t);
			this.add(r), this[wk(n)] = Tk(n, e, t);
		}, this), this._updateCommonStl(e, t, n);
	}, t.prototype.updateData = function(e, t, n) {
		var r = e.hostModel, i = this.childOfName("line"), a = e.getItemLayout(t), o = { shape: {} };
		Ok(o.shape, a), Lf(i, o, r, t), L(Ck, function(n) {
			var r = Tk(n, e, t), i = wk(n);
			if (this[i] !== r) {
				this.remove(this.childOfName(n));
				var a = Ek(n, e, t);
				this.add(a);
			}
			this[i] = r;
		}, this), this._updateCommonStl(e, t, n);
	}, t.prototype.getLinePath = function() {
		return this.childAt(0);
	}, t.prototype._updateCommonStl = function(e, t, n) {
		var r = e.hostModel, i = this.childOfName("line"), a = n && n.emphasisLineStyle, o = n && n.blurLineStyle, s = n && n.selectLineStyle, c = n && n.labelStatesModels, l = n && n.emphasisDisabled, u = n && n.focus, d = n && n.blurScope;
		if (!n || e.hasItemOption) {
			var f = e.getItemModel(t), p = f.getModel("emphasis");
			a = p.getModel("lineStyle").getLineStyle(), o = f.getModel(["blur", "lineStyle"]).getLineStyle(), s = f.getModel(["select", "lineStyle"]).getLineStyle(), l = p.get("disabled"), u = p.get("focus"), d = p.get("blurScope"), c = Hp(f);
		}
		var m = e.getItemVisual(t, "style"), h = m.stroke;
		i.useStyle(m), i.style.fill = null, i.style.strokeNoScale = !0, i.ensureState("emphasis").style = a, i.ensureState("blur").style = o, i.ensureState("select").style = s, L(Ck, function(e) {
			var t = this.childOfName(e);
			if (t) {
				t.setColor(h), t.style.opacity = m.opacity;
				for (var n = 0; n < lu.length; n++) {
					var r = lu[n], a = i.getState(r);
					if (a) {
						var o = a.style || {}, s = t.ensureState(r), c = s.style ||= {};
						o.stroke != null && (c[t.__isEmptyBrush ? "stroke" : "fill"] = o.stroke), o.opacity != null && (c.opacity = o.opacity);
					}
				}
				t.markRedraw();
			}
		}, this);
		var g = r.getRawValue(t);
		Vp(this, c, {
			labelDataIndex: t,
			labelFetcher: { getFormattedLabel: function(t, n) {
				return r.getFormattedLabel(t, n, e.dataType);
			} },
			inheritColor: h || Q.color.neutral99,
			defaultOpacity: m.opacity,
			defaultText: (g == null ? e.getName(t) : isFinite(g) ? Y(g, 10) : g) + ""
		});
		var _ = this.getTextContent();
		if (_) {
			var v = c.normal;
			_.__align = _.style.align, _.__verticalAlign = _.style.verticalAlign, _.__position = v.get("position") || "middle";
			var y = v.get("distance");
			H(y) || (y = [y, y]), _.__labelDistance = y;
		}
		this.setTextConfig({
			position: null,
			local: !0,
			inside: !1
		}), td(this, u, d, l);
	}, t.prototype.highlight = function() {
		Iu(this);
	}, t.prototype.downplay = function() {
		Lu(this);
	}, t.prototype.updateLayout = function(e, t) {
		this.childOfName("line").stopAnimation(), this.setLinePoints(e.getItemLayout(t));
	}, t.prototype.setLinePoints = function(e) {
		var t = this.childOfName("line");
		Ok(t.shape, e), t.dirty();
	}, t.prototype.beforeUpdate = function() {
		var e = this, t = e.childOfName("fromSymbol"), n = e.childOfName("toSymbol"), r = e.getTextContent();
		if (!t && !n && (!r || r.ignore)) return;
		for (var i = 1, a = this.parent; a;) a.scaleX && (i /= a.scaleX), a = a.parent;
		var o = e.childOfName("line");
		if (!this.__dirty && !o.__dirty) return;
		var s = o.shape.percent, c = o.pointAt(0), l = o.pointAt(s), u = Le([], l, c);
		Ve(u, u);
		function d(e, t) {
			var n = e.__specifiedRotation;
			if (n == null) {
				var r = o.tangentAt(t);
				e.attr("rotation", (t === 1 ? -1 : 1) * Math.PI / 2 - Math.atan2(r[1], r[0]));
			} else e.attr("rotation", n);
		}
		if (t && (t.setPosition(c), d(t, 0), t.scaleX = t.scaleY = i * s, t.markRedraw()), n && (n.setPosition(l), d(n, 1), n.scaleX = n.scaleY = i * s, n.markRedraw()), r && !r.ignore) {
			r.x = r.y = 0, r.originX = r.originY = 0;
			var f = void 0, p = void 0, m = r.__labelDistance, h = m[0] * i, g = m[1] * i, _ = s / 2, v = o.tangentAt(_), y = [v[1], -v[0]], b = o.pointAt(_);
			y[1] > 0 && (y[0] = -y[0], y[1] = -y[1]);
			var x = v[0] < 0 ? -1 : 1;
			if (r.__position !== "start" && r.__position !== "end") {
				var S = -Math.atan2(v[1], v[0]);
				l[0] < c[0] && (S = Math.PI + S), r.rotation = S;
			}
			var C = void 0;
			switch (r.__position) {
				case "insideStartTop":
				case "insideMiddleTop":
				case "insideEndTop":
				case "middle":
					C = -g, p = "bottom";
					break;
				case "insideStartBottom":
				case "insideMiddleBottom":
				case "insideEndBottom":
					C = g, p = "top";
					break;
				default: C = 0, p = "middle";
			}
			switch (r.__position) {
				case "end":
					r.x = u[0] * h + l[0], r.y = u[1] * g + l[1], f = u[0] > .8 ? "left" : u[0] < -.8 ? "right" : "center", p = u[1] > .8 ? "top" : u[1] < -.8 ? "bottom" : "middle";
					break;
				case "start":
					r.x = -u[0] * h + c[0], r.y = -u[1] * g + c[1], f = u[0] > .8 ? "right" : u[0] < -.8 ? "left" : "center", p = u[1] > .8 ? "bottom" : u[1] < -.8 ? "top" : "middle";
					break;
				case "insideStartTop":
				case "insideStart":
				case "insideStartBottom":
					r.x = h * x + c[0], r.y = c[1] + C, f = v[0] < 0 ? "right" : "left", r.originX = -h * x, r.originY = -C;
					break;
				case "insideMiddleTop":
				case "insideMiddle":
				case "insideMiddleBottom":
				case "middle":
					r.x = b[0], r.y = b[1] + C, f = "center", r.originY = -C;
					break;
				case "insideEndTop":
				case "insideEnd":
				case "insideEndBottom": r.x = -h * x + l[0], r.y = l[1] + C, f = v[0] >= 0 ? "right" : "left", r.originX = h * x, r.originY = -C;
			}
			r.scaleX = r.scaleY = i, r.setStyle({
				verticalAlign: r.__verticalAlign || p,
				align: r.__align || f
			});
		}
	}, t;
}(va), Ak = function() {
	function e(e) {
		this.group = new va(), this._LineCtor = e || kk;
	}
	return e.prototype.updateData = function(e) {
		var t = this;
		this._progressiveEls = null;
		var n = this, r = n.group, i = n._lineData;
		n._lineData = e, i || r.removeAll();
		var a = Mk(e);
		e.diff(i).add(function(n) {
			t._doAdd(e, n, a);
		}).update(function(n, r) {
			t._doUpdate(i, e, r, n, a);
		}).remove(function(e) {
			r.remove(i.getItemGraphicEl(e));
		}).execute();
	}, e.prototype.updateLayout = function() {
		var e = this._lineData;
		e && e.eachItemGraphicEl(function(t, n) {
			t.updateLayout(e, n);
		}, this);
	}, e.prototype.incrementalPrepareUpdate = function(e) {
		this._seriesScope = Mk(e), this._lineData = null, this.group.removeAll();
	}, e.prototype.incrementalUpdate = function(e, t, n) {
		this._progressiveEls = [];
		function r(e) {
			!e.isGroup && !jk(e) && (e.incremental = n, e.ensureState("emphasis").hoverLayer = 2);
		}
		for (var i = e.start; i < e.end; i++) if (Pk(t.getItemLayout(i))) {
			var a = new this._LineCtor(t, i, this._seriesScope);
			a.traverse(r), this.group.add(a), t.setItemGraphicEl(i, a), this._progressiveEls.push(a);
		}
	}, e.prototype.remove = function() {
		this.group.removeAll();
	}, e.prototype.eachRendered = function(e) {
		Tp(this._progressiveEls || this.group, e);
	}, e.prototype._doAdd = function(e, t, n) {
		if (Pk(e.getItemLayout(t))) {
			var r = new this._LineCtor(e, t, n);
			e.setItemGraphicEl(t, r), this.group.add(r);
		}
	}, e.prototype._doUpdate = function(e, t, n, r, i) {
		var a = e.getItemGraphicEl(n);
		if (!Pk(t.getItemLayout(r))) {
			this.group.remove(a);
			return;
		}
		a ? a.updateData(t, r, i) : a = new this._LineCtor(t, r, i), t.setItemGraphicEl(r, a), this.group.add(a);
	}, e;
}();
function jk(e) {
	return e.animators && e.animators.length > 0;
}
function Mk(e) {
	var t = e.hostModel, n = t.getModel("emphasis");
	return {
		lineStyle: t.getModel("lineStyle").getLineStyle(),
		emphasisLineStyle: n.getModel(["lineStyle"]).getLineStyle(),
		blurLineStyle: t.getModel(["blur", "lineStyle"]).getLineStyle(),
		selectLineStyle: t.getModel(["select", "lineStyle"]).getLineStyle(),
		emphasisDisabled: n.get("disabled"),
		blurScope: n.get("blurScope"),
		focus: n.get("focus"),
		labelStatesModels: Hp(t)
	};
}
function Nk(e) {
	return isNaN(e[0]) || isNaN(e[1]);
}
function Pk(e) {
	return e && !Nk(e[0]) && !Nk(e[1]);
}
//#endregion
//#region node_modules/echarts/lib/component/axisPointer/BaseAxisPointer.js
var Fk = X(), Ik = k, Lk = B, Rk = function() {
	function e() {
		this._dragging = !1, this.animationThreshold = 15;
	}
	return e.prototype.render = function(e, t, n, r) {
		var i = t.get("value"), a = t.get("status");
		if (this._axisModel = e, this._axisPointerModel = t, this._api = n, r || this._lastValue !== i || this._lastStatus !== a) {
			this._lastValue = i, this._lastStatus = a;
			var o = this._group, s = this._handle;
			if (!a || a === "hide") {
				o && o.hide(), s && s.hide();
				return;
			}
			o && o.show(), s && s.show();
			var c = {};
			this.makeElOption(c, i, e, t, n);
			var l = c.graphicKey;
			l !== this._lastGraphicKey && this.clear(n), this._lastGraphicKey = l;
			var u = this._moveAnimation = this.determineAnimation(e, t);
			if (!o) o = this._group = new va(), this.createPointerEl(o, c, e, t), this.createLabelEl(o, c, e, t), n.getZr().add(o);
			else {
				var d = V(zk, t, u);
				this.updatePointerEl(o, c, d), this.updateLabelEl(o, c, d, t);
			}
			Uk(o, t, !0), this._renderHandle(i);
		}
	}, e.prototype.remove = function(e) {
		this.clear(e);
	}, e.prototype.dispose = function(e) {
		this.clear(e);
	}, e.prototype.determineAnimation = function(e, t) {
		var n = t.get("animation"), r = e.axis, i = r.type === "category", a = t.get("snap");
		if (!a && !i) return !1;
		if (n === "auto" || n == null) {
			var o = this.animationThreshold;
			if (i && uE(r).w > o) return !0;
			if (a) {
				var s = tk(e).seriesDataCount, c = r.getExtent();
				return Math.abs(c[0] - c[1]) / s > o;
			}
			return !1;
		}
		return n === !0;
	}, e.prototype.makeElOption = function(e, t, n, r, i) {}, e.prototype.createPointerEl = function(e, t, n, r) {
		var i = t.pointer;
		if (i) {
			var a = Fk(e).pointerEl = new Wf[i.type](Ik(t.pointer));
			e.add(a);
		}
	}, e.prototype.createLabelEl = function(e, t, n, r) {
		if (t.label) {
			var i = Fk(e).labelEl = new Ml(Ik(t.label));
			e.add(i), Vk(i, r);
		}
	}, e.prototype.updatePointerEl = function(e, t, n) {
		var r = Fk(e).pointerEl;
		r && t.pointer && (r.setStyle(t.pointer.style), n(r, { shape: t.pointer.shape }));
	}, e.prototype.updateLabelEl = function(e, t, n, r) {
		var i = Fk(e).labelEl;
		i && (i.setStyle(t.label.style), n(i, {
			x: t.label.x,
			y: t.label.y
		}), Vk(i, r));
	}, e.prototype._renderHandle = function(e) {
		if (!this._dragging && this.updateHandleTransform) {
			var t = this._axisPointerModel, n = this._api.getZr(), r = this._handle, i = t.getModel("handle"), a = t.get("status");
			if (!i.get("show") || !a || a === "hide") {
				r && n.remove(r), this._handle = null;
				return;
			}
			var o;
			this._handle || (o = !0, r = this._handle = hp(i.get("icon"), {
				cursor: "move",
				draggable: !0,
				onmousemove: function(e) {
					St(e.event);
				},
				onmousedown: Lk(this._onHandleDragMove, this, 0, 0),
				drift: Lk(this._onHandleDragMove, this),
				ondragend: Lk(this._onHandleDragEnd, this)
			}), n.add(r)), Uk(r, t, !1), r.setStyle(i.getItemStyle(null, [
				"color",
				"borderColor",
				"borderWidth",
				"opacity",
				"shadowColor",
				"shadowBlur",
				"shadowOffsetX",
				"shadowOffsetY"
			]));
			var s = i.get("size");
			H(s) || (s = [s, s]), r.scaleX = s[0] / 2, r.scaleY = s[1] / 2, uy(this, "_doDispatchAxisPointer", i.get("throttle") || 0, "fixRate"), this._moveHandleToValue(e, o);
		}
	}, e.prototype._moveHandleToValue = function(e, t) {
		zk(this._axisPointerModel, !t && this._moveAnimation, this._handle, Hk(this.getHandleTransform(e, this._axisModel, this._axisPointerModel)));
	}, e.prototype._onHandleDragMove = function(e, t) {
		var n = this._handle;
		if (n) {
			this._dragging = !0;
			var r = this.updateHandleTransform(Hk(n), [e, t], this._axisModel, this._axisPointerModel);
			this._payloadInfo = r, n.stopAnimation(), n.attr(Hk(r)), Fk(n).lastProp = null, this._doDispatchAxisPointer();
		}
	}, e.prototype._doDispatchAxisPointer = function() {
		if (this._handle) {
			var e = this._payloadInfo, t = this._axisModel;
			this._api.dispatchAction({
				type: "updateAxisPointer",
				x: e.cursorPoint[0],
				y: e.cursorPoint[1],
				tooltipOption: e.tooltipOption,
				axesInfo: [{
					axisDim: t.axis.dim,
					axisIndex: t.componentIndex
				}]
			});
		}
	}, e.prototype._onHandleDragEnd = function() {
		if (this._dragging = !1, this._handle) {
			var e = this._axisPointerModel.get("value");
			this._moveHandleToValue(e), this._api.dispatchAction({ type: "hideTip" });
		}
	}, e.prototype.clear = function(e) {
		this._lastValue = null, this._lastStatus = null;
		var t = e.getZr(), n = this._group, r = this._handle;
		t && n && (this._lastGraphicKey = null, n && t.remove(n), r && t.remove(r), this._group = null, this._handle = null, this._payloadInfo = null), dy(this, "_doDispatchAxisPointer");
	}, e.prototype.doClear = function() {}, e.prototype.buildLabel = function(e, t, n) {
		return n ||= 0, {
			x: e[n],
			y: e[1 - n],
			width: t[n],
			height: t[1 - n]
		};
	}, e;
}();
function zk(e, t, n, r) {
	Bk(Fk(n).lastProp, r) || (Fk(n).lastProp = r, t ? Lf(n, r, e) : (n.stopAnimation(), n.attr(r)));
}
function Bk(e, t) {
	if (G(e) && G(t)) {
		var n = !0;
		return L(t, function(t, r) {
			n &&= Bk(e[r], t);
		}), !!n;
	}
	return e === t;
}
function Vk(e, t) {
	e[t.get(["label", "show"]) ? "show" : "hide"]();
}
function Hk(e) {
	return {
		x: e.x || 0,
		y: e.y || 0,
		rotation: e.rotation || 0
	};
}
function Uk(e, t, n) {
	var r = t.get("z"), i = t.get("zlevel");
	e && e.traverse(function(e) {
		e.type !== "group" && (r != null && (e.z = r), i != null && (e.zlevel = i), e.silent = n);
	});
}
//#endregion
//#region node_modules/echarts/lib/component/axisPointer/viewHelper.js
function Wk(e) {
	var t = e.get("type"), n = e.getModel(t + "Style"), r;
	return t === "line" ? (r = n.getLineStyle(), r.fill = null) : t === "shadow" && (r = n.getAreaStyle(), r.stroke = null), r;
}
function Gk(e, t, n, r, i) {
	var a = qk(n.get("value"), t.axis, t.ecModel, n.get("seriesDataIndices"), {
		precision: n.get(["label", "precision"]),
		formatter: n.get(["label", "formatter"])
	}), o = n.getModel("label"), s = gh(o.get("padding") || 0), c = o.getFont(), l = Yi(a, c), u = i.position, d = l.width + s[1] + s[3], f = l.height + s[0] + s[2], p = i.align;
	p === "right" && (u[0] -= d), p === "center" && (u[0] -= d / 2);
	var m = i.verticalAlign;
	m === "bottom" && (u[1] -= f), m === "middle" && (u[1] -= f / 2), Kk(u, d, f, r);
	var h = o.get("backgroundColor");
	(!h || h === "auto") && (h = t.get([
		"axisLine",
		"lineStyle",
		"color"
	])), e.label = {
		x: u[0],
		y: u[1],
		style: Up(o, {
			text: a,
			font: c,
			fill: o.getTextColor(),
			padding: s,
			backgroundColor: h
		}),
		z2: 10
	};
}
function Kk(e, t, n, r) {
	var i = r.getWidth(), a = r.getHeight();
	e[0] = Math.min(e[0] + t, i) - t, e[1] = Math.min(e[1] + n, a) - n, e[0] = Math.max(e[0], 0), e[1] = Math.max(e[1], 0);
}
function qk(e, t, n, r, i) {
	e = t.scale.parse(e);
	var a = t.scale.getLabel({ value: e }, { precision: i.precision }), o = i.formatter;
	if (o) {
		var s = {
			value: Uw(t, { value: e }),
			axisDimension: t.dim,
			axisIndex: t.index,
			seriesData: []
		};
		L(r, function(e) {
			var t = n.getSeriesByIndex(e.seriesIndex), r = e.dataIndexInside, i = t && t.getDataParams(r);
			i && s.seriesData.push(i);
		}), W(o) ? a = o.replace("{value}", a) : U(o) && (a = o(s));
	}
	return a;
}
function Jk(e, t, n) {
	var r = Dt();
	return Mt(r, r, n.rotation), jt(r, r, n.position), cp([e.dataToCoord(t), (n.labelOffset || 0) + (n.labelDirection || 1) * (n.labelMargin || 0)], r);
}
function Yk(e, t, n, r, i, a) {
	var o = GD.innerTextLayout(n.rotation, 0, n.labelDirection);
	n.labelMargin = i.get(["label", "margin"]), Gk(t, r, i, a, {
		position: Jk(r.axis, e, n),
		align: o.textAlign,
		verticalAlign: o.textVerticalAlign
	});
}
function Xk(e, t, n) {
	return n ||= 0, {
		x1: e[n],
		y1: e[1 - n],
		x2: t[n],
		y2: t[1 - n]
	};
}
function Zk(e, t, n) {
	return n ||= 0, {
		x: e[n],
		y: e[1 - n],
		width: t[n],
		height: t[1 - n]
	};
}
function Qk(e, t, n) {
	return uE(e, {
		fromStat: { sers: R(t, function(e) {
			return n.getSeriesByIndex(e.seriesIndex);
		}) },
		min: 1
	}).w;
}
function $k(e, t, n) {
	return [Aa(ka(t[0], t[1]), e - n / 2), ka(e + n / 2, Aa(t[0], t[1]))];
}
//#endregion
//#region node_modules/echarts/lib/component/axisPointer/CartesianAxisPointer.js
var eA = function(e) {
	r(t, e);
	function t() {
		return e !== null && e.apply(this, arguments) || this;
	}
	return t.prototype.makeElOption = function(e, t, n, r, i) {
		var a = n.axis, o = a.grid, s = r.get("type"), c = a.getGlobalExtent(), l = tA(o, a).getOtherAxis(a).getGlobalExtent(), u = a.toGlobalCoord(a.dataToCoord(t, !0));
		if (s && s !== "none") {
			var d = Wk(r), f = nA[s](a, u, c, l, r.get("seriesDataIndices"), r.ecModel);
			f.style = d, e.graphicKey = f.type, e.pointer = f;
		}
		Yk(t, e, fO(o.getRect(), n), n, r, i);
	}, t.prototype.getHandleTransform = function(e, t, n) {
		var r = fO(t.axis.grid.getRect(), t, { labelInside: !1 });
		r.labelMargin = n.get(["handle", "margin"]);
		var i = Jk(t.axis, e, r);
		return {
			x: i[0],
			y: i[1],
			rotation: r.rotation + (r.labelDirection < 0 ? Math.PI : 0)
		};
	}, t.prototype.updateHandleTransform = function(e, t, n, r) {
		var i = n.axis, a = i.grid, o = i.getGlobalExtent(!0), s = tA(a, i).getOtherAxis(i).getGlobalExtent(), c = i.dim === "x" ? 0 : 1, l = [e.x, e.y];
		l[c] += t[c], l[c] = ka(o[1], l[c]), l[c] = Aa(o[0], l[c]);
		var u = (s[1] + s[0]) / 2, d = [u, u];
		return d[c] = l[c], {
			x: l[0],
			y: l[1],
			rotation: e.rotation,
			cursorPoint: d,
			tooltipOption: [{ verticalAlign: "middle" }, { align: "center" }][c]
		};
	}, t;
}(Rk);
function tA(e, t) {
	var n = {};
	return n[t.dim + "AxisIndex"] = t.index, e.getCartesian(n);
}
var nA = {
	line: function(e, t, n, r) {
		return {
			type: "Line",
			subPixelOptimize: !0,
			shape: Xk([t, r[0]], [t, r[1]], rA(e))
		};
	},
	shadow: function(e, t, n, r, i, a) {
		var o = Qk(e, i, a), s = r[1] - r[0], c = $k(t, n, o), l = c[0], u = c[1];
		return {
			type: "Rect",
			shape: Zk([l, r[0]], [u - l, s], rA(e))
		};
	}
};
function rA(e) {
	return e.dim === "x" ? 0 : 1;
}
//#endregion
//#region node_modules/echarts/lib/component/axisPointer/AxisPointerModel.js
var iA = function(e) {
	r(t, e);
	function t() {
		var n = e !== null && e.apply(this, arguments) || this;
		return n.type = t.type, n;
	}
	return t.type = "axisPointer", t.defaultOption = {
		show: "auto",
		z: 50,
		type: "line",
		snap: !1,
		triggerTooltip: !0,
		triggerEmphasis: !0,
		value: null,
		status: null,
		link: [],
		animation: null,
		animationDurationUpdate: 200,
		lineStyle: {
			color: Q.color.border,
			width: 1,
			type: "dashed"
		},
		shadowStyle: { color: Q.color.shadowTint },
		label: {
			show: !0,
			formatter: null,
			precision: "auto",
			margin: 3,
			color: Q.color.neutral00,
			padding: [
				5,
				7,
				5,
				7
			],
			backgroundColor: Q.color.accent60,
			borderColor: null,
			borderWidth: 0,
			borderRadius: 3
		},
		handle: {
			show: !1,
			icon: "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z",
			size: 45,
			margin: 50,
			color: Q.color.accent40,
			throttle: 40
		}
	}, t;
}(Wh), aA = X(), oA = L;
function sA(e, t, n) {
	if (!a.node) {
		var r = t.getZr();
		aA(r).records || (aA(r).records = {}), cA(r, t);
		var i = aA(r).records[e] || (aA(r).records[e] = {});
		i.handler = n;
	}
}
function cA(e, t) {
	if (aA(e).initialized) return;
	aA(e).initialized = !0, n("click", V(dA, "click")), n("mousemove", V(dA, "mousemove")), n("mousewheel", V(dA, "mousewheel")), n("globalout", uA);
	function n(n, r) {
		e.on(n, function(n) {
			var i = fA(t);
			oA(aA(e).records, function(e) {
				e && r(e, n, i.dispatchAction);
			}), lA(i.pendings, t);
		});
	}
}
function lA(e, t) {
	var n = e.showTip.length, r = e.hideTip.length, i;
	n ? i = e.showTip[n - 1] : r && (i = e.hideTip[r - 1]), i && (i.dispatchAction = null, t.dispatchAction(i));
}
function uA(e, t, n) {
	e.handler("leave", null, n);
}
function dA(e, t, n, r) {
	t.handler(e, n, r);
}
function fA(e) {
	var t = {
		showTip: [],
		hideTip: []
	}, n = function(r) {
		var i = t[r.type];
		i ? i.push(r) : (r.dispatchAction = n, e.dispatchAction(r));
	};
	return {
		dispatchAction: n,
		pendings: t
	};
}
function pA(e, t) {
	if (!a.node) {
		var n = t.getZr();
		(aA(n).records || {})[e] && (aA(n).records[e] = null);
	}
}
//#endregion
//#region node_modules/echarts/lib/component/axisPointer/AxisPointerView.js
var mA = function(e) {
	r(t, e);
	function t() {
		var n = e !== null && e.apply(this, arguments) || this;
		return n.type = t.type, n;
	}
	return t.prototype.render = function(e, t, n) {
		var r = t.getComponent("tooltip"), i = e.get("triggerOn") || r && r.get("triggerOn") || "mousemove|click|mousewheel";
		sA("axisPointer", n, function(e, t, n) {
			i !== "none" && (e === "leave" || i.indexOf(e) >= 0) && n({
				type: "updateAxisPointer",
				currTrigger: e,
				x: t && t.offsetX,
				y: t && t.offsetY
			});
		});
	}, t.prototype.remove = function(e, t) {
		pA("axisPointer", t);
	}, t.prototype.dispose = function(e, t) {
		pA("axisPointer", t);
	}, t.type = "axisPointer", t;
}(Xv);
//#endregion
//#region node_modules/echarts/lib/component/axisPointer/findPointFromSeries.js
function hA(e, t) {
	var n = [], r = e.seriesIndex, i;
	if (r == null || !(i = t.getSeriesByIndex(r))) return { point: [] };
	var a = i.getData(), o = zo(a, e);
	if (o == null || o < 0 || H(o)) return { point: [] };
	var s = a.getItemGraphicEl(o), c = i.coordinateSystem;
	if (i.getTooltipPosition) n = i.getTooltipPosition(o) || [];
	else if (c && c.dataToPoint) {
		if (e.isStacked) {
			var l = c.getBaseAxis(), u = c.getOtherAxis(l).dim, d = l.dim, f = +(u === "x" || u === "radius"), p = a.mapDimension(d), m = [];
			m[f] = a.get(p, o), m[1 - f] = a.get(a.getCalculationInfo("stackResultDimension"), o), n = c.dataToPoint(m) || [];
		} else n = c.dataToPoint(a.getValues(R(c.dimensions, function(e) {
			return a.mapDimension(e);
		}), o)) || [];
	} else if (s) {
		var h = s.getBoundingRect().clone();
		h.applyTransform(s.transform), n = [h.x + h.width / 2, h.y + h.height / 2];
	}
	return {
		point: n,
		el: s
	};
}
//#endregion
//#region node_modules/echarts/lib/component/axisPointer/axisTrigger.js
var gA = X();
function _A(e, t, n) {
	var r = e.currTrigger, i = [e.x, e.y], a = e, o = e.dispatchAction || B(n.dispatchAction, n), s = t.getComponent("axisPointer").coordSysAxesInfo;
	if (s) {
		DA(i) && (i = hA({
			seriesIndex: a.seriesIndex,
			dataIndex: a.dataIndex
		}, t).point);
		var c = DA(i), l = a.axesInfo, u = s.axesInfo, d = r === "leave" || DA(i), f = {}, p = {}, m = {
			list: [],
			map: {}
		}, h = {
			showPointer: V(bA, p),
			showTooltip: V(xA, m)
		};
		L(s.coordSysMap, function(e, t) {
			var n = c || e.containPoint(i);
			L(s.coordSysAxesInfo[t], function(e, t) {
				var r = e.axis, a = TA(l, e);
				if (!d && n && (!l || a)) {
					var o = a && a.value;
					o == null && !c && (o = r.pointToData(i)), o != null && vA(e, o, h, !1, f);
				}
			});
		});
		var g = {};
		return L(u, function(e, t) {
			var n = e.linkGroup;
			n && !p[t] && L(n.axesInfo, function(t, r) {
				var i = p[r];
				if (t !== e && i) {
					var a = i.value;
					n.mapper && (a = e.axis.scale.parse(n.mapper(a, EA(t), EA(e)))), g[e.key] = a;
				}
			});
		}), L(g, function(e, t) {
			vA(u[t], e, h, !0, f);
		}), SA(p, u, f), CA(m, i, e, o), wA(u, o, n), f;
	}
}
function vA(e, t, n, r, i) {
	var a = e.axis;
	if (!a.scale.isBlank() && a.containData(t)) {
		if (!e.involveSeries) {
			n.showPointer(e, t);
			return;
		}
		var o = yA(t, e), s = o.payloadBatch, c = o.snapToValue;
		s[0] && i.seriesIndex == null && M(i, s[0]), !r && e.snap && a.containData(c) && c != null && (t = c), n.showPointer(e, t, s), n.showTooltip(e, o, c);
	}
}
function yA(e, t) {
	var n = t.axis, r = n.dim, i = e, a = [], o = Number.MAX_VALUE, s = -1;
	return L(t.seriesModels, function(t, c) {
		var l = t.getData().mapDimensionsAll(r), u, d;
		if (t.getAxisTooltipData) {
			var f = t.getAxisTooltipData(l, e, n);
			d = f.dataIndices, u = f.nestestValue;
		} else {
			if (d = t.indicesOfNearest(r, l[0], e, n.type === "category" ? .5 : null), !d.length) return;
			u = t.getData().get(l[0], d[0]);
		}
		if (lo(u)) {
			var p = e - u, m = Math.abs(p);
			m <= o && ((m < o || p >= 0 && s < 0) && (o = m, s = p, i = u, a.length = 0), L(d, function(e) {
				a.push({
					seriesIndex: t.seriesIndex,
					dataIndexInside: e,
					dataIndex: t.getData().getRawIndex(e)
				});
			}));
		}
	}), {
		payloadBatch: a,
		snapToValue: i
	};
}
function bA(e, t, n, r) {
	e[t.key] = {
		value: n,
		payloadBatch: r
	};
}
function xA(e, t, n, r) {
	var i = n.payloadBatch, a = t.axis, o = a.model, s = t.axisPointerModel;
	if (t.triggerTooltip && i.length) {
		var c = t.coordSys.model, l = ik(c), u = e.map[l];
		u || (u = e.map[l] = {
			coordSysId: c.id,
			coordSysIndex: c.componentIndex,
			coordSysType: c.type,
			coordSysMainType: c.mainType,
			dataByAxis: []
		}, e.list.push(u)), u.dataByAxis.push({
			axisDim: a.dim,
			axisIndex: o.componentIndex,
			axisType: o.type,
			axisId: o.id,
			value: r,
			valueLabelOpt: {
				precision: s.get(["label", "precision"]),
				formatter: s.get(["label", "formatter"])
			},
			seriesDataIndices: i.slice()
		});
	}
}
function SA(e, t, n) {
	var r = n.axesInfo = [];
	L(t, function(t, n) {
		var i = t.axisPointerModel.option, a = e[n];
		a ? (!t.useHandle && (i.status = "show"), i.value = a.value, i.seriesDataIndices = (a.payloadBatch || []).slice()) : !t.useHandle && (i.status = "hide"), i.status === "show" && r.push({
			axisDim: t.axis.dim,
			axisIndex: t.axis.model.componentIndex,
			value: i.value
		});
	});
}
function CA(e, t, n, r) {
	if (DA(t) || !e.list.length) {
		r({ type: "hideTip" });
		return;
	}
	var i = ((e.list[0].dataByAxis[0] || {}).seriesDataIndices || [])[0] || {};
	r({
		type: "showTip",
		escapeConnect: !0,
		x: t[0],
		y: t[1],
		tooltipOption: n.tooltipOption,
		position: n.position,
		dataIndexInside: i.dataIndexInside,
		dataIndex: i.dataIndex,
		seriesIndex: i.seriesIndex,
		dataByCoordSys: e.list
	});
}
function wA(e, t, n) {
	var r = n.getZr(), i = "axisPointerLastHighlights", a = gA(r)[i] || {}, o = gA(r)[i] = {};
	L(e, function(e, t) {
		var n = e.axisPointerModel.option;
		n.status === "show" && e.triggerEmphasis && L(n.seriesDataIndices, function(e) {
			o[e.seriesIndex + "|" + e.dataIndex] = e;
		});
	});
	var s = [], c = [];
	function l(e) {
		return {
			seriesIndex: e.seriesIndex,
			dataIndex: e.dataIndex
		};
	}
	L(a, function(e, t) {
		!o[t] && c.push(l(e));
	}), L(o, function(e, t) {
		!a[t] && s.push(l(e));
	}), c.length && n.dispatchAction({
		type: "downplay",
		escapeConnect: !0,
		notBlur: !0,
		batch: c
	}), s.length && n.dispatchAction({
		type: "highlight",
		escapeConnect: !0,
		notBlur: !0,
		batch: s
	});
}
function TA(e, t) {
	for (var n = 0; n < (e || []).length; n++) {
		var r = e[n];
		if (t.axis.dim === r.axisDim && t.axis.model.componentIndex === r.axisIndex) return r;
	}
}
function EA(e) {
	var t = e.axis.model, n = {}, r = n.axisDim = e.axis.dim;
	return n.axisIndex = n[r + "AxisIndex"] = t.componentIndex, n.axisName = n[r + "AxisName"] = t.name, n.axisId = n[r + "AxisId"] = t.id, n;
}
function DA(e) {
	return !e || e[0] == null || isNaN(e[0]) || e[1] == null || isNaN(e[1]);
}
//#endregion
//#region node_modules/echarts/lib/component/axisPointer/install.js
function OA(e) {
	ok.registerAxisPointerClass("CartesianAxisPointer", eA), e.registerComponentModel(iA), e.registerComponentView(mA), e.registerPreprocessor(function(e) {
		if (e) {
			(!e.axisPointer || e.axisPointer.length === 0) && (e.axisPointer = {});
			var t = e.axisPointer.link;
			t && !H(t) && (e.axisPointer.link = [t]);
		}
	}), e.registerProcessor(e.PRIORITY.PROCESSOR.STATISTIC, { overallReset: function(e, t) {
		e.getComponent("axisPointer").coordSysAxesInfo = JO(e, t);
	} }), e.registerAction({
		type: "updateAxisPointer",
		event: "updateAxisPointer",
		update: ":updateAxisPointer"
	}, _A);
}
//#endregion
//#region node_modules/echarts/lib/component/grid/install.js
function kA(e) {
	zT(_k), zT(OA);
}
//#endregion
//#region node_modules/echarts/lib/component/tooltip/TooltipModel.js
var AA = function(e) {
	r(t, e);
	function t() {
		var n = e !== null && e.apply(this, arguments) || this;
		return n.type = t.type, n;
	}
	return t.type = "tooltip", t.dependencies = ["axisPointer"], t.defaultOption = {
		z: 60,
		show: !0,
		showContent: !0,
		trigger: "item",
		triggerOn: "mousemove|click|mousewheel",
		alwaysShowContent: !1,
		renderMode: "auto",
		confine: null,
		showDelay: 0,
		hideDelay: 100,
		transitionDuration: .4,
		displayTransition: !0,
		enterable: !1,
		backgroundColor: Q.color.neutral00,
		shadowBlur: 10,
		shadowColor: "rgba(0, 0, 0, .2)",
		shadowOffsetX: 1,
		shadowOffsetY: 2,
		borderRadius: 4,
		borderWidth: 1,
		defaultBorderColor: Q.color.border,
		padding: null,
		extraCssText: "",
		axisPointer: {
			type: "line",
			axis: "auto",
			animation: "auto",
			animationDurationUpdate: 200,
			animationEasingUpdate: "exponentialOut",
			crossStyle: {
				color: Q.color.borderShade,
				width: 1,
				type: "dashed",
				textStyle: {}
			}
		},
		textStyle: {
			color: Q.color.tertiary,
			fontSize: 14
		}
	}, t;
}(Wh);
//#endregion
//#region node_modules/echarts/lib/component/tooltip/helper.js
function jA(e) {
	var t = e.get("confine");
	return t == null ? e.get("renderMode") === "richText" : !!t;
}
function MA(e) {
	if (a.domSupported) {
		for (var t = document.documentElement.style, n = 0, r = e.length; n < r; n++) if (e[n] in t) return e[n];
	}
}
var NA = MA([
	"transform",
	"webkitTransform",
	"OTransform",
	"MozTransform",
	"msTransform"
]), PA = MA([
	"webkitTransition",
	"transition",
	"OTransition",
	"MozTransition",
	"msTransition"
]);
function FA(e, t) {
	if (!e) return t;
	t = hh(t, !0);
	var n = e.indexOf(t);
	return e = n === -1 ? t : "-" + e.slice(0, n) + "-" + t, e.toLowerCase();
}
function IA(e, t) {
	var n = e.currentStyle || document.defaultView && document.defaultView.getComputedStyle(e);
	return n ? t ? n[t] : n : null;
}
//#endregion
//#region node_modules/echarts/lib/component/tooltip/TooltipHTMLContent.js
var LA = FA(PA, "transition"), RA = FA(NA, "transform"), zA = "position:absolute;display:block;border-style:solid;white-space:nowrap;z-index:9999999;" + (a.transform3dSupported ? "will-change:transform;" : "");
function BA(e) {
	return e = e === "left" ? "right" : e === "right" ? "left" : e === "top" ? "bottom" : "top", e;
}
function VA(e, t, n) {
	if (!W(n) || n === "inside") return "";
	var r = e.get("backgroundColor"), i = e.get("borderWidth");
	t = Sh(t);
	var a = BA(n), o = Math.max(Math.round(i) * 1.5, 6), s = "", c = RA + ":", l;
	P(["left", "right"], a) > -1 ? (s += "top:50%", c += "translateY(-50%) rotate(" + (l = a === "left" ? -225 : -45) + "deg)") : (s += "left:50%", c += "translateX(-50%) rotate(" + (l = a === "top" ? 225 : 45) + "deg)");
	var u = l * Math.PI / 180, d = o + i, f = d * Math.abs(Math.cos(u)) + d * Math.abs(Math.sin(u)), p = Math.round(((f - Math.SQRT2 * i) / 2 + Math.SQRT2 * i - (f - d) / 2) * 100) / 100;
	s += ";" + a + ":-" + p + "px";
	var m = t + " solid " + i + "px;";
	return "<div style=\"" + [
		"position:absolute;width:" + o + "px;height:" + o + "px;z-index:-1;",
		s + ";" + c + ";",
		"border-bottom:" + m,
		"border-right:" + m,
		"background-color:" + r + ";"
	].join("") + "\"></div>";
}
function HA(e, t, n) {
	var r = "cubic-bezier(0.23,1,0.32,1)", i = "", o = "";
	return n && (i = " " + e / 2 + "s " + r, o = "opacity" + i + ",visibility" + i), t || (i = " " + e + "s " + r, o += (o.length ? "," : "") + (a.transformSupported ? "" + RA + i : ",left" + i + ",top" + i)), LA + ":" + o;
}
function UA(e, t, n) {
	var r = e.toFixed(0) + "px", i = t.toFixed(0) + "px";
	if (!a.transformSupported) return n ? "top:" + i + ";left:" + r + ";" : [["top", i], ["left", r]];
	var o = a.transform3dSupported, s = "translate" + (o ? "3d" : "") + "(" + r + "," + i + (o ? ",0" : "") + ")";
	return n ? "top:0;left:0;" + RA + ":" + s + ";" : [
		["top", 0],
		["left", 0],
		[NA, s]
	];
}
function WA(e) {
	var t = [], n = e.get("fontSize"), r = e.getTextColor();
	r && t.push("color:" + r), t.push("font:" + e.getFont());
	var i = K(e.get("lineHeight"), Math.round(n * 3 / 2));
	n && t.push("line-height:" + i + "px");
	var a = e.get("textShadowColor"), o = e.get("textShadowBlur") || 0, s = e.get("textShadowOffsetX") || 0, c = e.get("textShadowOffsetY") || 0;
	return a && o && t.push("text-shadow:" + s + "px " + c + "px " + o + "px " + a), L(["decoration", "align"], function(n) {
		var r = e.get(n);
		r && t.push("text-" + n + ":" + r);
	}), t.join(";");
}
function GA(e, t, n, r) {
	var i = [], a = e.get("transitionDuration"), o = e.get("backgroundColor"), s = e.get("shadowBlur"), c = e.get("shadowColor"), l = e.get("shadowOffsetX"), u = e.get("shadowOffsetY"), d = e.getModel("textStyle"), f = Fv(e, "html"), p = l + "px " + u + "px " + s + "px " + c;
	return i.push("box-shadow:" + p), t && a > 0 && i.push(HA(a, n, r)), o && i.push("background-color:" + o), L([
		"width",
		"color",
		"radius"
	], function(t) {
		var n = "border-" + t, r = hh(n), a = e.get(r);
		a != null && i.push(n + ":" + a + (t === "color" ? "" : "px"));
	}), i.push(WA(d)), f != null && i.push("padding:" + gh(f).join("px ") + "px"), i.join(";") + ";";
}
function KA(e, t, n, r, i) {
	var a = t && t.painter;
	if (n) {
		var o = a && a.getViewportRoot();
		o && rt(e, o, n, r, i);
	} else {
		e[0] = r, e[1] = i;
		var s = a && a.getViewportRootOffset();
		s && (e[0] += s.offsetLeft, e[1] += s.offsetTop);
	}
	e[2] = e[0] / t.getWidth(), e[3] = e[1] / t.getHeight();
}
var qA = function() {
	function e(e, t) {
		if (this._show = !1, this._styleCoord = [
			0,
			0,
			0,
			0
		], this._enterable = !0, this._alwaysShowContent = !1, this._firstShow = !0, this._longHide = !0, a.wxa) return null;
		var n = document.createElement("div");
		n.domBelongToZr = !0, this.el = n;
		var r = this._zr = e.getZr(), i = t.appendTo, o = i && (W(i) ? document.querySelector(i) : ue(i) ? i : U(i) && i(e.getDom()));
		KA(this._styleCoord, r, o, e.getWidth() / 2, e.getHeight() / 2), (o || e.getDom()).appendChild(n), this._api = e, this._container = o;
		var s = this;
		n.onmouseenter = function() {
			s._enterable && (clearTimeout(s._hideTimeout), s._show = !0), s._inContent = !0;
		}, n.onmousemove = function(e) {
			if (e ||= window.event, !s._enterable) {
				var t = r.handler;
				vt(r.painter.getViewportRoot(), e, !0), t.dispatch("mousemove", e);
			}
		}, n.onmouseleave = function() {
			s._inContent = !1, s._enterable && s._show && s.hideLater(s._hideDelay);
		};
	}
	return e.prototype.update = function(e) {
		if (!this._container) {
			var t = this._api.getDom(), n = IA(t, "position"), r = t.style;
			r.position !== "absolute" && n !== "absolute" && (r.position = "relative");
		}
		var i = e.get("alwaysShowContent");
		i && this._moveIfResized(), this._alwaysShowContent = i, this._enableDisplayTransition = e.get("displayTransition") && e.get("transitionDuration") > 0, this.el.className = e.get("className") || "";
	}, e.prototype.show = function(e, t) {
		clearTimeout(this._hideTimeout), clearTimeout(this._longHideTimeout);
		var n = this.el, r = n.style, i = this._styleCoord;
		n.innerHTML ? r.cssText = zA + GA(e, !this._firstShow, this._longHide, this._enableDisplayTransition) + UA(i[0], i[1], !0) + ("border-color:" + Sh(t) + ";") + (e.get("extraCssText") || "") + (";pointer-events:" + (this._enterable ? "auto" : "none")) : r.display = "none", this._show = !0, this._firstShow = !1, this._longHide = !1;
	}, e.prototype.setContent = function(e, t, n, r, i) {
		var a = this.el;
		if (e == null) {
			a.innerHTML = "";
			return;
		}
		var o = "";
		if (W(i) && n.get("trigger") === "item" && !jA(n) && (o = VA(n, r, i)), W(e)) a.innerHTML = e + o;
		else if (e) {
			a.innerHTML = "", H(e) || (e = [e]);
			for (var s = 0; s < e.length; s++) ue(e[s]) && e[s].parentNode !== a && a.appendChild(e[s]);
			if (o && a.childNodes.length) {
				var c = document.createElement("div");
				c.innerHTML = o, a.appendChild(c);
			}
		}
	}, e.prototype.setEnterable = function(e) {
		this._enterable = e;
	}, e.prototype.getSize = function() {
		var e = this.el;
		return e ? [e.offsetWidth, e.offsetHeight] : [0, 0];
	}, e.prototype.moveTo = function(e, t) {
		if (this.el) {
			var n = this._styleCoord;
			if (KA(n, this._zr, this._container, e, t), n[0] != null && n[1] != null) {
				var r = this.el.style;
				L(UA(n[0], n[1]), function(e) {
					r[e[0]] = e[1];
				});
			}
		}
	}, e.prototype._moveIfResized = function() {
		var e = this._styleCoord[2], t = this._styleCoord[3];
		this.moveTo(e * this._zr.getWidth(), t * this._zr.getHeight());
	}, e.prototype.hide = function() {
		var e = this, t = this.el.style;
		this._enableDisplayTransition ? (t.visibility = "hidden", t.opacity = "0") : t.display = "none", a.transform3dSupported && (t.willChange = ""), this._show = !1, this._longHideTimeout = setTimeout(function() {
			return e._longHide = !0;
		}, 500);
	}, e.prototype.hideLater = function(e) {
		this._show && !(this._inContent && this._enterable) && !this._alwaysShowContent && (e ? (this._hideDelay = e, this._show = !1, this._hideTimeout = setTimeout(B(this.hide, this), e)) : this.hide());
	}, e.prototype.isShow = function() {
		return this._show;
	}, e.prototype.dispose = function() {
		clearTimeout(this._hideTimeout), clearTimeout(this._longHideTimeout);
		var e = this._zr;
		it(e && e.painter && e.painter.getViewportRoot(), this._container);
		var t = this.el;
		if (t) {
			t.onmouseenter = t.onmousemove = t.onmouseleave = null;
			var n = t.parentNode;
			n && n.removeChild(t);
		}
		this.el = this._container = null;
	}, e;
}(), JA = function() {
	function e(e) {
		this._show = !1, this._styleCoord = [
			0,
			0,
			0,
			0
		], this._alwaysShowContent = !1, this._enterable = !0, this._zr = e.getZr(), ZA(this._styleCoord, this._zr, e.getWidth() / 2, e.getHeight() / 2);
	}
	return e.prototype.update = function(e) {
		var t = e.get("alwaysShowContent");
		t && this._moveIfResized(), this._alwaysShowContent = t;
	}, e.prototype.show = function() {
		this._hideTimeout && clearTimeout(this._hideTimeout), this.el.show(), this._show = !0;
	}, e.prototype.setContent = function(e, t, n, r, i) {
		var a = this;
		G(e) && go(""), this.el && this._zr.remove(this.el);
		var o = n.getModel("textStyle");
		this.el = new Ml({
			style: {
				rich: t.richTextStyles,
				text: e,
				lineHeight: 22,
				borderWidth: 1,
				borderColor: r,
				textShadowColor: o.get("textShadowColor"),
				fill: n.get(["textStyle", "color"]),
				padding: Fv(n, "richText"),
				verticalAlign: "top",
				align: "left"
			},
			z: n.get("z")
		}), L([
			"backgroundColor",
			"borderRadius",
			"shadowColor",
			"shadowBlur",
			"shadowOffsetX",
			"shadowOffsetY"
		], function(e) {
			a.el.style[e] = n.get(e);
		}), L([
			"textShadowBlur",
			"textShadowOffsetX",
			"textShadowOffsetY"
		], function(e) {
			a.el.style[e] = o.get(e) || 0;
		}), this._zr.add(this.el);
		var s = this;
		this.el.on("mouseover", function() {
			s._enterable && (clearTimeout(s._hideTimeout), s._show = !0), s._inContent = !0;
		}), this.el.on("mouseout", function() {
			s._enterable && s._show && s.hideLater(s._hideDelay), s._inContent = !1;
		});
	}, e.prototype.setEnterable = function(e) {
		this._enterable = e;
	}, e.prototype.getSize = function() {
		var e = this.el, t = this.el.getBoundingRect(), n = XA(e.style);
		return [t.width + n.left + n.right, t.height + n.top + n.bottom];
	}, e.prototype.moveTo = function(e, t) {
		var n = this.el;
		if (n) {
			var r = this._styleCoord;
			ZA(r, this._zr, e, t), e = r[0], t = r[1];
			var i = n.style, a = YA(i.borderWidth || 0), o = XA(i);
			n.x = e + a + o.left, n.y = t + a + o.top, n.markRedraw();
		}
	}, e.prototype._moveIfResized = function() {
		var e = this._styleCoord[2], t = this._styleCoord[3];
		this.moveTo(e * this._zr.getWidth(), t * this._zr.getHeight());
	}, e.prototype.hide = function() {
		this.el && this.el.hide(), this._show = !1;
	}, e.prototype.hideLater = function(e) {
		this._show && !(this._inContent && this._enterable) && !this._alwaysShowContent && (e ? (this._hideDelay = e, this._show = !1, this._hideTimeout = setTimeout(B(this.hide, this), e)) : this.hide());
	}, e.prototype.isShow = function() {
		return this._show;
	}, e.prototype.dispose = function() {
		this._zr.remove(this.el);
	}, e;
}();
function YA(e) {
	return Math.max(0, e);
}
function XA(e) {
	var t = YA(e.shadowBlur || 0), n = YA(e.shadowOffsetX || 0), r = YA(e.shadowOffsetY || 0);
	return {
		left: YA(t - n),
		right: YA(t + n),
		top: YA(t - r),
		bottom: YA(t + r)
	};
}
function ZA(e, t, n, r) {
	e[0] = n, e[1] = r, e[2] = e[0] / t.getWidth(), e[3] = e[1] / t.getHeight();
}
//#endregion
//#region node_modules/echarts/lib/component/tooltip/TooltipView.js
var QA = new Dl({ shape: {
	x: -1,
	y: -1,
	width: 2,
	height: 2
} }), $A = function(e) {
	r(t, e);
	function t() {
		var n = e !== null && e.apply(this, arguments) || this;
		return n.type = t.type, n;
	}
	return t.prototype.init = function(e, t) {
		if (!a.node && t.getDom()) {
			var n = e.getComponent("tooltip"), r = this._renderMode = Jo(n.get("renderMode"));
			this._tooltipContent = r === "richText" ? new JA(t) : new qA(t, { appendTo: n.get("appendToBody", !0) ? "body" : n.get("appendTo", !0) });
		}
	}, t.prototype.render = function(e, t, n) {
		if (!a.node && n.getDom()) {
			this.group.removeAll(), this._tooltipModel = e, this._ecModel = t, this._api = n;
			var r = this._tooltipContent;
			r.update(e), r.setEnterable(e.get("enterable")), this._initGlobalListener(), this._keepShow(), this._renderMode !== "richText" && e.get("transitionDuration") ? uy(this, "_updatePosition", 50, "fixRate") : dy(this, "_updatePosition");
		}
	}, t.prototype._initGlobalListener = function() {
		var e = this._tooltipModel.get("triggerOn");
		sA("itemTooltip", this._api, B(function(t, n, r) {
			e !== "none" && (e.indexOf(t) >= 0 ? this._tryShow(n, r) : t === "leave" && this._hide(r));
		}, this));
	}, t.prototype._keepShow = function() {
		var e = this._tooltipModel, t = this._ecModel, n = this._api, r = e.get("triggerOn");
		if (e.get("trigger") !== "axis" && (this._lastDataByCoordSys = null, this._cbParamsList = null), this._lastX != null && this._lastY != null && r !== "none" && r !== "click") {
			var i = this;
			clearTimeout(this._refreshUpdateTimeout), this._refreshUpdateTimeout = setTimeout(function() {
				!n.isDisposed() && i.manuallyShowTip(e, t, n, {
					x: i._lastX,
					y: i._lastY,
					dataByCoordSys: i._lastDataByCoordSys
				});
			});
		}
	}, t.prototype.manuallyShowTip = function(e, t, n, r) {
		if (r.from !== this.uid && !a.node && n.getDom()) {
			var i = tj(r, n);
			this._ticket = "";
			var o = r.dataByCoordSys, s = oj(r, t, n);
			if (s) {
				var c = s.el.getBoundingRect().clone();
				c.applyTransform(s.el.transform), this._tryShow({
					offsetX: c.x + c.width / 2,
					offsetY: c.y + c.height / 2,
					target: s.el,
					position: r.position,
					positionDefault: "bottom"
				}, i);
			} else if (r.tooltip && r.x != null && r.y != null) {
				var l = QA;
				l.x = r.x, l.y = r.y, l.update(), Kl(l).tooltipConfig = {
					name: null,
					option: r.tooltip
				}, this._tryShow({
					offsetX: r.x,
					offsetY: r.y,
					target: l
				}, i);
			} else if (o) this._tryShow({
				offsetX: r.x,
				offsetY: r.y,
				position: r.position,
				dataByCoordSys: o,
				tooltipOption: r.tooltipOption
			}, i);
			else if (r.seriesIndex != null) {
				if (this._manuallyAxisShowTip(e, t, n, r)) return;
				var u = hA(r, t), d = u.point[0], f = u.point[1];
				d != null && f != null && this._tryShow({
					offsetX: d,
					offsetY: f,
					target: u.el,
					position: r.position,
					positionDefault: "bottom"
				}, i);
			} else r.x != null && r.y != null && (n.dispatchAction({
				type: "updateAxisPointer",
				x: r.x,
				y: r.y
			}), this._tryShow({
				offsetX: r.x,
				offsetY: r.y,
				position: r.position,
				target: n.getZr().findHover(r.x, r.y).target
			}, i));
		}
	}, t.prototype.manuallyHideTip = function(e, t, n, r) {
		var i = this._tooltipContent;
		this._tooltipModel && i.hideLater(this._tooltipModel.get("hideDelay")), this._lastX = this._lastY = this._lastDataByCoordSys = null, this._cbParamsList = null, r.from !== this.uid && this._hide(tj(r, n));
	}, t.prototype._manuallyAxisShowTip = function(e, t, n, r) {
		var i = r.seriesIndex, a = r.dataIndex, o = t.getComponent("axisPointer").coordSysAxesInfo;
		if (i != null && a != null && o != null) {
			var s = t.getSeriesByIndex(i);
			if (s && ej([
				s.getData().getItemModel(a),
				s,
				(s.coordinateSystem || {}).model
			], this._tooltipModel).get("trigger") === "axis") return n.dispatchAction({
				type: "updateAxisPointer",
				seriesIndex: i,
				dataIndex: a,
				position: r.position
			}), !0;
		}
	}, t.prototype._tryShow = function(e, t) {
		var n = e.target;
		if (this._tooltipModel) {
			this._lastX = e.offsetX, this._lastY = e.offsetY;
			var r = e.dataByCoordSys;
			if (r && r.length) this._showAxisTooltip(r, e);
			else if (n) {
				if (Kl(n).ssrType === "legend") return;
				this._lastDataByCoordSys = null, this._cbParamsList = null;
				var i, a;
				Zy(n, function(e) {
					if (e.tooltipDisabled) return i = a = null, !0;
					i || a || (Kl(e).dataIndex == null ? Kl(e).tooltipConfig != null && (a = e) : i = e);
				}, !0), i ? this._showSeriesItemTooltip(e, i, t) : a ? this._showComponentItemTooltip(e, a, t) : this._hide(t);
			} else this._lastDataByCoordSys = null, this._cbParamsList = null, this._hide(t);
		}
	}, t.prototype._showOrMove = function(e, t) {
		var n = e.get("showDelay");
		t = B(t, this), clearTimeout(this._showTimout), n > 0 ? this._showTimout = setTimeout(t, n) : t();
	}, t.prototype._showAxisTooltip = function(e, t) {
		var n = this._ecModel, r = this._tooltipModel, i = [t.offsetX, t.offsetY], a = ej([t.tooltipOption], r), o = this._renderMode, s = [], c = xv("section", {
			blocks: [],
			noHeader: !0
		}), l = [], u = new Iv();
		L(e, function(e) {
			L(e.dataByAxis, function(e) {
				var t = n.getComponent(e.axisDim + "Axis", e.axisIndex), i = e.value, a = t.axis, d = a.scale.parse(i);
				if (t && i != null) {
					var f = qk(i, a, n, e.seriesDataIndices, e.valueLabelOpt), p = xv("section", {
						header: f,
						noHeader: !ye(f),
						sortBlocks: !0,
						blocks: []
					});
					c.blocks.push(p), L(e.seriesDataIndices, function(i) {
						var a = n.getSeriesByIndex(i.seriesIndex), c = i.dataIndexInside, m = a.getDataParams(c);
						if (!(m.dataIndex < 0)) {
							m.axisDim = e.axisDim, m.axisIndex = e.axisIndex, m.axisType = e.axisType, m.axisId = e.axisId, m.axisValue = Uw(t.axis, { value: d }), m.axisValueLabel = f, m.marker = u.makeTooltipMarker("item", Sh(m.color), o);
							var h = L_(a.formatTooltip(c, !0, null)), g = h.frag;
							if (g) {
								var _ = ej([a], r).get("valueFormatter");
								p.blocks.push(_ ? M({ valueFormatter: _ }, g) : g);
							}
							h.text && l.push(h.text), s.push(m);
						}
					});
				}
			});
		}), c.blocks.reverse(), l.reverse();
		var d = t.position, f = Dv(c, u, o, a.get("order"), n.get("useUTC"), a.get("textStyle"));
		f && l.unshift(f);
		var p = o === "richText" ? "\n\n" : "<br/>", m = l.join(p);
		this._showOrMove(a, function() {
			this._updateContentNotChangedOnAxis(e, s) ? this._updatePosition(a, d, i[0], i[1], this._tooltipContent, s) : this._showTooltipContent(a, m, s, Math.random() + "", i[0], i[1], d, null, u);
		});
	}, t.prototype._showSeriesItemTooltip = function(e, t, n) {
		var r = this._ecModel, i = Kl(t), a = i.seriesIndex, o = r.getSeriesByIndex(a), s = i.dataModel || o, c = i.dataIndex, l = i.dataType, u = s.getData(l), d = this._renderMode, f = e.positionDefault, p = ej([
			u.getItemModel(c),
			s,
			o && (o.coordinateSystem || {}).model
		], this._tooltipModel, f ? { position: f } : null), m = p.get("trigger");
		if (m == null || m === "item") {
			var h = s.getDataParams(c, l), g = new Iv();
			h.marker = g.makeTooltipMarker("item", Sh(h.color), d);
			var _ = L_(s.formatTooltip(c, !1, l)), v = p.get("order"), y = p.get("valueFormatter"), b = _.frag, x = b ? Dv(y ? M({ valueFormatter: y }, b) : b, g, d, v, r.get("useUTC"), p.get("textStyle")) : _.text, S = "item_" + s.name + "_" + c;
			this._showOrMove(p, function() {
				this._showTooltipContent(p, x, h, S, e.offsetX, e.offsetY, e.position, e.target, g);
			}), n({
				type: "showTip",
				dataIndexInside: c,
				dataIndex: u.getRawIndex(c),
				seriesIndex: a,
				from: this.uid
			});
		}
	}, t.prototype._showComponentItemTooltip = function(e, t, n) {
		var r = this._renderMode === "html", i = Kl(t), a = i.tooltipConfig.option || {}, o = a.encodeHTMLContent;
		if (W(a)) {
			var s = a;
			a = {
				content: s,
				formatter: s
			}, o = !0;
		}
		o && r && a.content && (a = k(a), a.content = dt(a.content));
		var c = [a], l = this._ecModel.getComponent(i.componentMainType, i.componentIndex);
		l && c.push(l), c.push({ formatter: a.content });
		var u = e.positionDefault, d = ej(c, this._tooltipModel, u ? { position: u } : null), f = d.get("content"), p = Math.random() + "", m = new Iv();
		this._showOrMove(d, function() {
			var n = k(d.get("formatterParams") || {});
			this._showTooltipContent(d, f, n, p, e.offsetX, e.offsetY, e.position, t, m);
		}), n({
			type: "showTip",
			from: this.uid
		});
	}, t.prototype._showTooltipContent = function(e, t, n, r, i, a, o, s, c) {
		if (this._ticket = "", e.get("showContent") && e.get("show")) {
			var l = this._tooltipContent;
			l.setEnterable(e.get("enterable"));
			var u = e.get("formatter");
			o ||= e.get("position");
			var d = t, f = this._getNearestPoint([i, a], n, e.get("trigger"), e.get("borderColor"), e.get("defaultBorderColor", !0)).color;
			if (u) {
				if (W(u)) {
					var p = e.ecModel.get("useUTC"), m = H(n) ? n[0] : n, h = m && m.axisType && m.axisType.indexOf("time") >= 0;
					d = u, h && (d = Xm(m.axisValue, d, p)), d = bh(d, n, !0);
				} else if (U(u)) {
					var g = B(function(t, r) {
						t === this._ticket && (l.setContent(r, c, e, f, o), this._updatePosition(e, o, i, a, l, n, s));
					}, this);
					this._ticket = r, d = u(n, r, g);
				} else d = u;
			}
			l.setContent(d, c, e, f, o), l.show(e, f), this._updatePosition(e, o, i, a, l, n, s);
		}
	}, t.prototype._getNearestPoint = function(e, t, n, r, i) {
		if (n === "axis" || H(t)) return { color: r || i };
		if (!H(t)) return { color: r || t.color || t.borderColor };
	}, t.prototype._updatePosition = function(e, t, n, r, i, a, o) {
		var s = this._api.getWidth(), c = this._api.getHeight();
		t ||= e.get("position");
		var l = i.getSize(), u = e.get("align"), d = e.get("verticalAlign"), f = o && o.getBoundingRect().clone();
		if (o && f.applyTransform(o.transform), U(t) && (t = t([n, r], a, i.el, f, {
			viewSize: [s, c],
			contentSize: l.slice()
		})), H(t)) n = Va(t[0], s), r = Va(t[1], c);
		else if (G(t)) {
			var p = t;
			p.width = l[0], p.height = l[1];
			var m = Ih(p, {
				width: s,
				height: c
			});
			n = m.x, r = m.y, u = null, d = null;
		} else if (W(t) && o) {
			var h = ij(t, f, l, e.get("borderWidth"));
			n = h[0], r = h[1];
		} else {
			var h = nj(n, r, i, s, c, u ? null : 20, d ? null : 20);
			n = h[0], r = h[1];
		}
		if (u && (n -= aj(u) ? l[0] / 2 : u === "right" ? l[0] : 0), d && (r -= aj(d) ? l[1] / 2 : d === "bottom" ? l[1] : 0), jA(e)) {
			var h = rj(n, r, i, s, c);
			n = h[0], r = h[1];
		}
		i.moveTo(n, r);
	}, t.prototype._updateContentNotChangedOnAxis = function(e, t) {
		var n = this._lastDataByCoordSys, r = this._cbParamsList, i = !!n && n.length === e.length;
		return i && L(n, function(n, a) {
			var o = n.dataByAxis || [], s = (e[a] || {}).dataByAxis || [];
			i &&= o.length === s.length, i && L(o, function(e, n) {
				var a = s[n] || {}, o = e.seriesDataIndices || [], c = a.seriesDataIndices || [];
				i = i && e.value === a.value && e.axisType === a.axisType && e.axisId === a.axisId && o.length === c.length, i && L(o, function(e, t) {
					var n = c[t];
					i = i && e.seriesIndex === n.seriesIndex && e.dataIndex === n.dataIndex;
				}), r && L(e.seriesDataIndices, function(e) {
					var n = e.seriesIndex, a = t[n], o = r[n];
					a && o && o.data !== a.data && (i = !1);
				});
			});
		}), this._lastDataByCoordSys = e, this._cbParamsList = t, !!i;
	}, t.prototype._hide = function(e) {
		this._lastDataByCoordSys = null, this._cbParamsList = null, e({
			type: "hideTip",
			from: this.uid
		});
	}, t.prototype.dispose = function(e, t) {
		!a.node && t.getDom() && (dy(this, "_updatePosition"), this._tooltipContent.dispose(), pA("itemTooltip", t), this._tooltipContent = null, this._tooltipModel = null, this._lastDataByCoordSys = null, this._cbParamsList = null);
	}, t.type = "tooltip", t;
}(Xv);
function ej(e, t, n) {
	var r = t.ecModel, i;
	n ? (i = new um(n, r, r), i = new um(t.option, i, r)) : i = t;
	for (var a = e.length - 1; a >= 0; a--) {
		var o = e[a];
		o && (o instanceof um && (o = o.get("tooltip", !0)), W(o) && (o = { formatter: o }), o && (i = new um(o, i, r)));
	}
	return i;
}
function tj(e, t) {
	return e.dispatchAction || B(t.dispatchAction, t);
}
function nj(e, t, n, r, i, a, o) {
	var s = n.getSize(), c = s[0], l = s[1];
	return a != null && (e + c + a + 2 > r ? e -= c + a : e += a), o != null && (t + l + o > i ? t -= l + o : t += o), [e, t];
}
function rj(e, t, n, r, i) {
	var a = n.getSize(), o = a[0], s = a[1];
	return e = Math.min(e + o, r) - o, t = Math.min(t + s, i) - s, e = Math.max(e, 0), t = Math.max(t, 0), [e, t];
}
function ij(e, t, n, r) {
	var i = n[0], a = n[1], o = Math.ceil(Math.SQRT2 * r) + 8, s = 0, c = 0, l = t.width, u = t.height;
	switch (e) {
		case "inside":
			s = t.x + l / 2 - i / 2, c = t.y + u / 2 - a / 2;
			break;
		case "top":
			s = t.x + l / 2 - i / 2, c = t.y - a - o;
			break;
		case "bottom":
			s = t.x + l / 2 - i / 2, c = t.y + u + o;
			break;
		case "left":
			s = t.x - i - o, c = t.y + u / 2 - a / 2;
			break;
		case "right": s = t.x + l + o, c = t.y + u / 2 - a / 2;
	}
	return [s, c];
}
function aj(e) {
	return e === "center" || e === "middle";
}
function oj(e, t, n) {
	var r = Ho(e).queryOptionMap, i = r.keys()[0];
	if (i && i !== "series") {
		var a = Wo(t, i, r.get(i), {
			useDefault: !1,
			enableAll: !1,
			enableNone: !1
		}).models[0];
		if (a) {
			var o = n.getViewOfComponentModel(a), s;
			if (o.group.traverse(function(t) {
				var n = Kl(t).tooltipConfig;
				if (n && n.name === e.name) return s = t, !0;
			}), s) return {
				componentMainType: i,
				componentIndex: a.componentIndex,
				el: s
			};
		}
	}
}
//#endregion
//#region node_modules/echarts/lib/component/tooltip/install.js
function sj(e) {
	zT(OA), e.registerComponentModel(AA), e.registerComponentView($A), e.registerAction({
		type: "showTip",
		event: "showTip",
		update: "tooltip:manuallyShowTip"
	}, je), e.registerAction({
		type: "hideTip",
		event: "hideTip",
		update: "tooltip:manuallyHideTip"
	}, je);
}
//#endregion
//#region node_modules/echarts/lib/component/marker/checkMarkerInSeries.js
function cj(e, t) {
	if (!e) return !1;
	for (var n = H(e) ? e : [e], r = 0; r < n.length; r++) if (n[r] && n[r][t]) return !0;
	return !1;
}
//#endregion
//#region node_modules/echarts/lib/component/marker/MarkerModel.js
function lj(e) {
	xo(e, "label", ["show"]);
}
var uj = X(), dj = function(e) {
	r(t, e);
	function t() {
		var n = e !== null && e.apply(this, arguments) || this;
		return n.type = t.type, n.createdBySelf = !1, n.preventAutoZ = !0, n;
	}
	return t.prototype.init = function(e, t, n) {
		this.mergeDefaultAndTheme(e, n), this._mergeOption(e, n, !1, !0);
	}, t.prototype.isAnimationEnabled = function() {
		if (a.node) return !1;
		var e = this.__hostSeries;
		return this.getShallow("animation") && e && e.isAnimationEnabled();
	}, t.prototype.mergeOption = function(e, t) {
		this._mergeOption(e, t, !1, !1);
	}, t.prototype._mergeOption = function(e, t, n, r) {
		var i = this.mainType;
		n || t.eachSeries(function(e) {
			var n = e.get(this.mainType, !0), a = uj(e)[i];
			if (!n || !n.data) {
				uj(e)[i] = null;
				return;
			}
			a ? a._mergeOption(n, t, !0) : (r && lj(n), L(n.data, function(e) {
				e instanceof Array ? (lj(e[0]), lj(e[1])) : lj(e);
			}), a = this.createMarkerModelFromSeries(n, this, t), M(a, {
				mainType: this.mainType,
				seriesIndex: e.seriesIndex,
				name: e.name,
				createdBySelf: !0
			}), a.__hostSeries = e), uj(e)[i] = a;
		}, this);
	}, t.prototype.formatTooltip = function(e, t, n) {
		var r = this.getData(), i = this.getRawValue(e), a = r.getName(e);
		return xv("section", {
			header: this.name,
			blocks: [xv("nameValue", {
				name: a,
				value: i,
				noName: !a,
				noValue: i == null
			})]
		});
	}, t.prototype.getData = function() {
		return this._data;
	}, t.prototype.setData = function(e) {
		this._data = e;
	}, t.prototype.getDataParams = function(e, t) {
		var n = I_.prototype.getDataParams.call(this, e, t), r = this.__hostSeries;
		return r && (n.seriesId = r.id, n.seriesName = r.name, n.seriesType = r.subType), n;
	}, t.getMarkerModelFromSeries = function(e, t) {
		return uj(e)[t];
	}, t.type = "marker", t.dependencies = [
		"series",
		"grid",
		"polar",
		"geo"
	], t;
}(Wh);
F(dj, I_.prototype);
//#endregion
//#region node_modules/echarts/lib/component/marker/markerHelper.js
function fj(e) {
	return !(isNaN(parseFloat(e.x)) && isNaN(parseFloat(e.y)));
}
function pj(e) {
	return !isNaN(parseFloat(e.x)) && !isNaN(parseFloat(e.y));
}
function mj(e, t, n, r, i, a, o) {
	var s = [], c = jC(t, i) ? t.getCalculationInfo("stackResultDimension") : i, l = Sj(t, c, e), u = t.hostModel.indicesOfNearest(n, c, l)[0];
	s[a] = t.get(r, u), s[o] = t.get(c, u);
	var d = t.get(i, u), f = Ka(t.get(i, u));
	return f = Math.min(f, 20), f >= 0 && (s[o] = +s[o].toFixed(f)), [s, d];
}
var hj = {
	min: V(mj, "min"),
	max: V(mj, "max"),
	average: V(mj, "average"),
	median: V(mj, "median")
};
function gj(e, t) {
	if (t) {
		var n = e.getData(), r = e.coordinateSystem, i = r && r.dimensions;
		if (!pj(t) && !H(t.coord) && H(i)) {
			var a = _j(t, n, r, e);
			if (t = k(t), t.type && hj[t.type] && a.baseAxis && a.valueAxis) {
				var o = P(i, a.baseAxis.dim), s = P(i, a.valueAxis.dim), c = hj[t.type](n, a.valueAxis.dim, a.baseDataDim, a.valueDataDim, o, s);
				t.coord = c[0], t.value = c[1];
			} else t.coord = [t.xAxis == null ? t.radiusAxis : t.xAxis, t.yAxis == null ? t.angleAxis : t.yAxis];
		}
		if (t.coord == null || !H(i)) {
			t.coord = [];
			var l = e.getBaseAxis();
			if (l && t.type && hj[t.type]) {
				var u = r.getOtherAxis(l);
				u && (t.value = Sj(n, n.mapDimension(u.dim), t.type));
			}
		} else for (var d = t.coord, f = 0; f < 2; f++) hj[d[f]] && (d[f] = Sj(n, n.mapDimension(i[f]), d[f]));
		return t;
	}
}
function _j(e, t, n, r) {
	var i = {};
	return e.valueIndex != null || e.valueDim != null ? (i.valueDataDim = e.valueIndex == null ? e.valueDim : t.getDimension(e.valueIndex), i.valueAxis = n.getAxis(vj(r, i.valueDataDim)), i.baseAxis = n.getOtherAxis(i.valueAxis), i.baseDataDim = t.mapDimension(i.baseAxis.dim)) : (i.baseAxis = r.getBaseAxis(), i.valueAxis = n.getOtherAxis(i.baseAxis), i.baseDataDim = t.mapDimension(i.baseAxis.dim), i.valueDataDim = t.mapDimension(i.valueAxis.dim)), i;
}
function vj(e, t) {
	var n = e.getData().getDimensionInfo(t);
	return n && n.coordDim;
}
function yj(e, t) {
	return e && e.containData && t.coord && !fj(t) ? e.containData(t.coord) : !0;
}
function bj(e, t, n) {
	return e && e.containZone && t.coord && n.coord && !fj(t) && !fj(n) ? e.containZone(t.coord, n.coord) : !0;
}
function xj(e, t) {
	return e ? function(e, n, r, i) {
		return V_(i < 2 ? e.coord && e.coord[i] : e.value, t[i]);
	} : function(e, n, r, i) {
		return V_(e.value, t[i]);
	};
}
function Sj(e, t, n) {
	if (n === "average") {
		var r = 0, i = 0;
		return e.each(t, function(e, t) {
			isNaN(e) || (r += e, i++);
		}), r / i;
	}
	return n === "median" ? e.getMedian(t) : e.getDataExtent(t)[+(n === "max")];
}
//#endregion
//#region node_modules/echarts/lib/component/marker/MarkerView.js
var Cj = X(), wj = function(e) {
	r(t, e);
	function t() {
		var n = e !== null && e.apply(this, arguments) || this;
		return n.type = t.type, n;
	}
	return t.prototype.init = function() {
		this.markerGroupMap = q();
	}, t.prototype.render = function(e, t, n) {
		var r = this, i = this.markerGroupMap;
		i.each(function(e) {
			Cj(e).keep = !1;
		}), t.eachSeries(function(e) {
			var i = dj.getMarkerModelFromSeries(e, r.type);
			i && r.renderSeries(e, i, t, n);
		}), i.each(function(e) {
			!Cj(e).keep && r.group.remove(e.group);
		}), Tj(t, i, this.type);
	}, t.prototype.markKeep = function(e) {
		Cj(e).keep = !0;
	}, t.prototype.toggleBlurSeries = function(e, t) {
		var n = this;
		L(e, function(e) {
			var r = dj.getMarkerModelFromSeries(e, n.type);
			r && r.getData().eachItemGraphicEl(function(e) {
				e && (t ? Ru(e) : zu(e));
			});
		});
	}, t.type = "marker", t;
}(Xv);
function Tj(e, t, n) {
	e.eachSeries(function(e) {
		var r = dj.getMarkerModelFromSeries(e, n), i = t.get(e.id);
		if (r && i && i.group) {
			var a = Ap(r), o = a.z, s = a.zlevel;
			Mp(i.group, o, s);
		}
	});
}
//#endregion
//#region node_modules/echarts/lib/component/marker/MarkLineModel.js
var Ej = function(e) {
	r(t, e);
	function t() {
		var n = e !== null && e.apply(this, arguments) || this;
		return n.type = t.type, n;
	}
	return t.prototype.createMarkerModelFromSeries = function(e, n, r) {
		return new t(e, n, r);
	}, t.type = "markLine", t.defaultOption = {
		z: 5,
		symbol: ["circle", "arrow"],
		symbolSize: [8, 16],
		symbolOffset: 0,
		precision: 2,
		tooltip: { trigger: "item" },
		label: {
			show: !0,
			position: "end",
			distance: 5
		},
		lineStyle: { type: "dashed" },
		emphasis: {
			label: { show: !0 },
			lineStyle: { width: 3 }
		},
		animationEasing: "linear"
	}, t;
}(dj), Dj = X(), Oj = function(e, t, n, r) {
	var i = e.getData(), a;
	if (H(r)) a = r;
	else {
		var o = r.type;
		if (o === "min" || o === "max" || o === "average" || o === "median" || r.xAxis != null || r.yAxis != null) {
			var s = void 0, c = void 0;
			if (r.yAxis != null || r.xAxis != null) s = t.getAxis(r.yAxis == null ? "x" : "y"), c = me(r.yAxis, r.xAxis);
			else {
				var l = _j(r, i, t, e);
				s = l.valueAxis, c = Sj(i, MC(i, l.valueDataDim), o);
			}
			var u = s.dim === "x" ? 0 : 1, d = 1 - u, f = k(r), p = { coord: [] };
			f.type = null, f.coord = [], f.coord[d] = -Infinity, p.coord[d] = Infinity;
			var m = n.get("precision");
			m >= 0 && se(c) && (c = +c.toFixed(Math.min(m, 20))), f.coord[u] = p.coord[u] = c, a = [
				f,
				p,
				{
					type: o,
					valueIndex: r.valueIndex,
					value: c
				}
			];
		} else a = [];
	}
	var h = [
		gj(e, a[0]),
		gj(e, a[1]),
		M({}, a[2])
	];
	return h[2].type = h[2].type || null, A(h[2], h[0]), A(h[2], h[1]), h;
};
function kj(e) {
	return !isNaN(e) && !isFinite(e);
}
function Aj(e, t, n, r) {
	var i = 1 - e, a = r.dimensions[e];
	return kj(t[i]) && kj(n[i]) && t[e] === n[e] && r.getAxis(a).containData(t[e]);
}
function jj(e, t) {
	if (e.type === "cartesian2d") {
		var n = t[0].coord, r = t[1].coord;
		if (n && r && (Aj(1, n, r, e) || Aj(0, n, r, e))) return !0;
	}
	return yj(e, t[0]) && yj(e, t[1]);
}
function Mj(e, t, n, r, i) {
	var a = r.coordinateSystem, o = e.getItemModel(t), s, c = Va(o.get("x"), i.getWidth()), l = Va(o.get("y"), i.getHeight());
	if (!isNaN(c) && !isNaN(l)) s = [c, l];
	else {
		if (r.getMarkerPosition) s = r.getMarkerPosition(e.getValues(e.dimensions, t));
		else {
			var u = a.dimensions, d = e.get(u[0], t), f = e.get(u[1], t);
			s = a.dataToPoint([d, f]);
		}
		if (oD(a, "cartesian2d")) {
			var p = a.getAxis("x"), m = a.getAxis("y"), u = a.dimensions;
			kj(e.get(u[0], t)) ? s[0] = p.toGlobalCoord(p.getExtent()[+!n]) : kj(e.get(u[1], t)) && (s[1] = m.toGlobalCoord(m.getExtent()[+!n]));
		}
		isNaN(c) || (s[0] = c), isNaN(l) || (s[1] = l);
	}
	e.setItemLayout(t, s);
}
var Nj = function(e) {
	r(t, e);
	function t() {
		var n = e !== null && e.apply(this, arguments) || this;
		return n.type = t.type, n;
	}
	return t.prototype.updateTransform = function(e, t, n) {
		t.eachSeries(function(e) {
			var t = dj.getMarkerModelFromSeries(e, "markLine");
			if (t) {
				var r = t.getData(), i = Dj(t).from, a = Dj(t).to;
				i.each(function(t) {
					Mj(i, t, !0, e, n), Mj(a, t, !1, e, n);
				}), r.each(function(e) {
					r.setItemLayout(e, [i.getItemLayout(e), a.getItemLayout(e)]);
				}), this.markerGroupMap.get(e.id).updateLayout();
			}
		}, this);
	}, t.prototype.renderSeries = function(e, t, n, r) {
		var i = e.coordinateSystem, a = e.id, o = e.getData(), s = this.markerGroupMap, c = s.get(a) || s.set(a, new Ak());
		this.group.add(c.group);
		var l = Pj(i, e, t), u = l.from, d = l.to, f = l.line;
		Dj(t).from = u, Dj(t).to = d, t.setData(f);
		var p = t.get("symbol"), m = t.get("symbolSize"), h = t.get("symbolRotate"), g = t.get("symbolOffset");
		H(p) || (p = [p, p]), H(m) || (m = [m, m]), H(h) || (h = [h, h]), H(g) || (g = [g, g]), l.from.each(function(e) {
			_(u, e, !0), _(d, e, !1);
		}), f.each(function(e) {
			var t = f.getItemModel(e), n = t.getModel("lineStyle").getLineStyle();
			f.setItemLayout(e, [u.getItemLayout(e), d.getItemLayout(e)]);
			var r = t.get("z2");
			n.stroke ??= u.getItemVisual(e, "style").fill, f.setItemVisual(e, {
				z2: K(r, 0),
				fromSymbolKeepAspect: u.getItemVisual(e, "symbolKeepAspect"),
				fromSymbolOffset: u.getItemVisual(e, "symbolOffset"),
				fromSymbolRotate: u.getItemVisual(e, "symbolRotate"),
				fromSymbolSize: u.getItemVisual(e, "symbolSize"),
				fromSymbol: u.getItemVisual(e, "symbol"),
				toSymbolKeepAspect: d.getItemVisual(e, "symbolKeepAspect"),
				toSymbolOffset: d.getItemVisual(e, "symbolOffset"),
				toSymbolRotate: d.getItemVisual(e, "symbolRotate"),
				toSymbolSize: d.getItemVisual(e, "symbolSize"),
				toSymbol: d.getItemVisual(e, "symbol"),
				style: n
			});
		}), c.updateData(f), l.line.eachItemGraphicEl(function(e) {
			Kl(e).dataModel = t, e.traverse(function(e) {
				Kl(e).dataModel = t;
			});
		});
		function _(t, n, i) {
			var a = t.getItemModel(n);
			Mj(t, n, i, e, r);
			var s = a.getModel("itemStyle").getItemStyle();
			s.fill ??= Jy(o, "color"), t.setItemVisual(n, {
				symbolKeepAspect: a.get("symbolKeepAspect"),
				symbolOffset: K(a.get("symbolOffset", !0), g[+!i]),
				symbolRotate: K(a.get("symbolRotate", !0), h[+!i]),
				symbolSize: K(a.get("symbolSize"), m[+!i]),
				symbol: K(a.get("symbol", !0), p[+!i]),
				style: s
			});
		}
		this.markKeep(c), c.group.silent = t.get("silent") || e.get("silent");
	}, t.type = "markLine", t;
}(wj);
function Pj(e, t, n) {
	var r = e ? R(e && e.dimensions, function(e) {
		var n = t.getData();
		return M(M({}, n.getDimensionInfo(n.mapDimension(e)) || {}), {
			name: e,
			ordinalMeta: null
		});
	}) : [{
		name: "value",
		type: "float"
	}], i = new xC(r, n), a = new xC(r, n), o = new xC([], n), s = R(n.get("data"), V(Oj, t, e, n));
	e && (s = re(s, V(jj, e)));
	var c = xj(!!e, r);
	return i.initData(R(s, function(e) {
		return e[0];
	}), null, c), a.initData(R(s, function(e) {
		return e[1];
	}), null, c), o.initData(R(s, function(e) {
		return e[2];
	})), o.hasItemOption = !0, {
		from: i,
		to: a,
		line: o
	};
}
//#endregion
//#region node_modules/echarts/lib/component/marker/installMarkLine.js
function Fj(e) {
	e.registerComponentModel(Ej), e.registerComponentView(Nj), e.registerPreprocessor(function(e) {
		cj(e.series, "markLine") && (e.markLine = e.markLine || {});
	});
}
//#endregion
//#region node_modules/echarts/lib/component/marker/MarkAreaModel.js
var Ij = function(e) {
	r(t, e);
	function t() {
		var n = e !== null && e.apply(this, arguments) || this;
		return n.type = t.type, n;
	}
	return t.prototype.createMarkerModelFromSeries = function(e, n, r) {
		return new t(e, n, r);
	}, t.type = "markArea", t.defaultOption = {
		z: 1,
		tooltip: { trigger: "item" },
		animation: !1,
		label: {
			show: !0,
			position: "top"
		},
		itemStyle: { borderWidth: 0 },
		emphasis: { label: {
			show: !0,
			position: "top"
		} }
	}, t;
}(dj), Lj = X(), Rj = function(e, t, n, r) {
	var i = r[0], a = r[1];
	if (i && a) {
		var o = gj(e, i), s = gj(e, a), c = o.coord, l = s.coord;
		c[0] = me(c[0], -Infinity), c[1] = me(c[1], -Infinity), l[0] = me(l[0], Infinity), l[1] = me(l[1], Infinity);
		var u = j([
			{},
			o,
			s
		]);
		return u.coord = [o.coord, s.coord], u.x0 = o.x, u.y0 = o.y, u.x1 = s.x, u.y1 = s.y, u;
	}
};
function zj(e) {
	return !isNaN(e) && !isFinite(e);
}
function Bj(e, t, n, r) {
	var i = 1 - e;
	return zj(t[i]) && zj(n[i]);
}
function Vj(e, t) {
	var n = t.coord[0], r = t.coord[1], i = {
		coord: n,
		x: t.x0,
		y: t.y0
	}, a = {
		coord: r,
		x: t.x1,
		y: t.y1
	};
	return oD(e, "cartesian2d") ? n && r && (Bj(1, n, r, e) || Bj(0, n, r, e)) ? !0 : bj(e, i, a) : yj(e, i) || yj(e, a);
}
function Hj(e, t, n, r, i) {
	var a = r.coordinateSystem, o = e.getItemModel(t), s, c = Va(o.get(n[0]), i.getWidth()), l = Va(o.get(n[1]), i.getHeight());
	if (!isNaN(c) && !isNaN(l)) s = [c, l];
	else {
		if (r.getMarkerPosition) {
			var u = e.getValues(["x0", "y0"], t), d = e.getValues(["x1", "y1"], t), f = a.clampData(u), p = a.clampData(d), m = [];
			m[0] = n[0] === "x0" ? f[0] > p[0] ? d[0] : u[0] : f[0] > p[0] ? u[0] : d[0], m[1] = n[1] === "y0" ? f[1] > p[1] ? d[1] : u[1] : f[1] > p[1] ? u[1] : d[1], s = r.getMarkerPosition(m, n, !0);
		} else {
			var h = e.get(n[0], t), g = e.get(n[1], t), _ = [h, g];
			a.clampData && a.clampData(_, _), s = a.dataToPoint(_, !0);
		}
		if (oD(a, "cartesian2d")) {
			var v = a.getAxis("x"), y = a.getAxis("y"), h = e.get(n[0], t), g = e.get(n[1], t);
			zj(h) ? s[0] = v.toGlobalCoord(v.getExtent()[n[0] === "x0" ? 0 : 1]) : zj(g) && (s[1] = y.toGlobalCoord(y.getExtent()[n[1] === "y0" ? 0 : 1]));
		}
		isNaN(c) || (s[0] = c), isNaN(l) || (s[1] = l);
	}
	return s;
}
var Uj = [
	["x0", "y0"],
	["x1", "y0"],
	["x1", "y1"],
	["x0", "y1"]
], Wj = function(e) {
	r(t, e);
	function t() {
		var n = e !== null && e.apply(this, arguments) || this;
		return n.type = t.type, n;
	}
	return t.prototype.updateTransform = function(e, t, n) {
		t.eachSeries(function(e) {
			var t = dj.getMarkerModelFromSeries(e, "markArea");
			if (t) {
				var r = t.getData();
				r.each(function(t) {
					var i = R(Uj, function(i) {
						return Hj(r, t, i, e, n);
					});
					r.setItemLayout(t, i), r.getItemGraphicEl(t).setShape("points", i);
				});
			}
		}, this);
	}, t.prototype.renderSeries = function(e, t, n, r) {
		var i = e.coordinateSystem, a = e.id, o = e.getData(), s = this.markerGroupMap, c = s.get(a) || s.set(a, { group: new va() });
		this.group.add(c.group), this.markKeep(c);
		var l = Gj(i, e, t);
		t.setData(l), l.each(function(t) {
			var n = R(Uj, function(n) {
				return Hj(l, t, n, e, r);
			}), a = i.getAxis("x").scale, s = i.getAxis("y").scale, c = a.getExtent(), u = s.getExtent(), d = [a.parse(l.get("x0", t)), a.parse(l.get("x1", t))], f = [s.parse(l.get("y0", t)), s.parse(l.get("y1", t))];
			Ga(d), Ga(f);
			var p = c[0] > d[1] || c[1] < d[0] || u[0] > f[1] || u[1] < f[0];
			l.setItemLayout(t, {
				points: n,
				allClipped: p
			});
			var m = l.getItemModel(t), h = m.getModel("itemStyle").getItemStyle(), g = m.get("z2"), _ = Jy(o, "color");
			h.fill || (h.fill = _, W(h.fill) && (h.fill = Dr(h.fill, .4))), h.stroke ||= _, l.setItemVisual(t, "style", h), l.setItemVisual(t, "z2", K(g, 0));
		}), l.diff(Lj(c).data).add(function(e) {
			var t = l.getItemLayout(e), n = l.getItemVisual(e, "z2");
			if (!t.allClipped) {
				var r = new sf({
					z2: K(n, 0),
					shape: { points: t.points }
				});
				l.setItemGraphicEl(e, r), c.group.add(r);
			}
		}).update(function(e, n) {
			var r = Lj(c).data.getItemGraphicEl(n), i = l.getItemLayout(e), a = l.getItemVisual(e, "z2");
			i.allClipped ? r && c.group.remove(r) : (r ? Lf(r, {
				z2: K(a, 0),
				shape: { points: i.points }
			}, t, e) : r = new sf({ shape: { points: i.points } }), l.setItemGraphicEl(e, r), c.group.add(r));
		}).remove(function(e) {
			var t = Lj(c).data.getItemGraphicEl(e);
			c.group.remove(t);
		}).execute(), l.eachItemGraphicEl(function(e, n) {
			var r = l.getItemModel(n), i = l.getItemVisual(n, "style");
			e.useStyle(l.getItemVisual(n, "style")), Vp(e, Hp(r), {
				labelFetcher: t,
				labelDataIndex: n,
				defaultText: l.getName(n) || "",
				inheritColor: W(i.fill) ? Dr(i.fill, 1) : Q.color.neutral99
			}), ad(e, r), td(e, null, null, r.get(["emphasis", "disabled"])), Kl(e).dataModel = t;
		}), Lj(c).data = l, c.group.silent = t.get("silent") || e.get("silent");
	}, t.type = "markArea", t;
}(wj);
function Gj(e, t, n) {
	var r, i, a = [
		"x0",
		"y0",
		"x1",
		"y1"
	];
	if (e) {
		var o = R(e && e.dimensions, function(e) {
			var n = t.getData();
			return M(M({}, n.getDimensionInfo(n.mapDimension(e)) || {}), {
				name: e,
				ordinalMeta: null
			});
		});
		i = R(a, function(e, t) {
			return {
				name: e,
				type: o[t % 2].type
			};
		}), r = new xC(i, n);
	} else i = [{
		name: "value",
		type: "float"
	}], r = new xC(i, n);
	var s = R(n.get("data"), V(Rj, t, e, n));
	e && (s = re(s, V(Vj, e)));
	var c = e ? function(e, t, n, r) {
		var a = e.coord[Math.floor(r / 2)][r % 2];
		return V_(a, i[r]);
	} : function(e, t, n, r) {
		return V_(e.value, i[r]);
	};
	return r.initData(s, null, c), r.hasItemOption = !0, r;
}
//#endregion
//#region node_modules/echarts/lib/component/marker/installMarkArea.js
function Kj(e) {
	e.registerComponentModel(Ij), e.registerComponentView(Wj), e.registerPreprocessor(function(e) {
		cj(e.series, "markArea") && (e.markArea = e.markArea || {});
	});
}
//#endregion
//#region node_modules/zrender/lib/canvas/Layer.js
function qj(e, t, n) {
	var r = p.createCanvas(), i = t.getWidth(), a = t.getHeight(), o = r.style;
	return o && (o.position = "absolute", o.left = "0", o.top = "0", o.width = i + "px", o.height = a + "px", r.setAttribute("data-zr-dom-id", e)), r.width = i * n, r.height = a * n, r;
}
function Jj(e) {
	return !e.__cursors.get(0);
}
function Yj(e) {
	var t = e.__cursors.get(0);
	return {
		startIdx: t ? t.startIdx : 0,
		endIdx: t ? t.endIdx : 0
	};
}
var Xj = function(e) {
	r(t, e);
	function t(t, n, r) {
		var i = e.call(this) || this;
		i.motionBlur = !1, i.lastFrameAlpha = .7, i.dpr = 1, i.virtual = !1, i.config = {}, i.zlevel = 0, i.zlevel2 = 0, i.maxRepaintRectCount = 5, i.__dirty = !0, i.__firstTimePaint = !0, i.__prevIdx = {
			startIdx: 0,
			endIdx: 0
		};
		var a;
		r ||= Ti, typeof t == "string" ? a = qj(t, n, r) : G(t) && (a = t, t = a.id), i.id = t, i.dom = a;
		var o = a.style;
		return o && (ke(a), a.onselectstart = function() {
			return !1;
		}, o.padding = "0", o.margin = "0", o.borderWidth = "0"), i.painter = n, i.dpr = r, i;
	}
	return t.prototype.afterBrush = function() {
		this.__prevIdx = Yj(this);
	}, t.prototype.initContext = function() {
		this.ctx = this.dom.getContext("2d"), this.ctx.dpr = this.dpr;
	}, t.prototype.setUnpainted = function() {
		this.__firstTimePaint = !0;
	}, t.prototype.createBackBuffer = function() {
		var e = this.dpr;
		this.domBack = qj("back-" + this.id, this.painter, e), this.ctxBack = this.domBack.getContext("2d"), e !== 1 && this.ctxBack.scale(e, e);
	}, t.prototype.createRepaintRects = function(e, t, n, r) {
		if (this.__firstTimePaint) return this.__firstTimePaint = !1, null;
		var i = [], a = this.maxRepaintRectCount, o = !1, s = new J(0, 0, 0, 0);
		function c(e) {
			if (e.isFinite() && !e.isZero()) {
				if (i.length === 0) {
					var t = new J(0, 0, 0, 0);
					t.copy(e), i.push(t);
				} else {
					for (var n = !1, r = Infinity, c = 0, l = 0; l < i.length; ++l) {
						var u = i[l];
						if (u.intersect(e)) {
							var d = new J(0, 0, 0, 0);
							d.copy(u), d.union(e), i[l] = d, n = !0;
							break;
						}
						if (o) {
							s.copy(e), s.union(u);
							var f = e.width * e.height, p = u.width * u.height, m = s.width * s.height - f - p;
							m < r && (r = m, c = l);
						}
					}
					if (o && (i[c].union(e), n = !0), !n) {
						var t = new J(0, 0, 0, 0);
						t.copy(e), i.push(t);
					}
					o ||= i.length >= a;
				}
			}
		}
		for (var l = Yj(this), u = l.startIdx; u < l.endIdx; ++u) {
			var d = e[u];
			if (d) {
				var f = d.shouldBePainted(n, r, !0, !0), p = d.__isRendered && (d.__dirty & 1 || !f) ? d.getPrevPaintRect() : null;
				p && c(p);
				var m = f && (d.__dirty & 1 || !d.__isRendered) ? d.getPaintRect() : null;
				m && c(m);
			}
		}
		for (var h = this.__prevIdx, u = h.startIdx; u < h.endIdx; ++u) {
			var d = t[u], f = d && d.shouldBePainted(n, r, !0, !0);
			if (d && (!f || !d.__zr) && d.__isRendered) {
				var p = d.getPrevPaintRect();
				p && c(p);
			}
		}
		var g;
		do {
			g = !1;
			for (var u = 0; u < i.length;) {
				if (i[u].isZero()) {
					i.splice(u, 1);
					continue;
				}
				for (var _ = u + 1; _ < i.length;) i[u].intersect(i[_]) ? (g = !0, i[u].union(i[_]), i.splice(_, 1)) : _++;
				u++;
			}
		} while (g);
		return this._paintRects = i, i;
	}, t.prototype.debugGetPaintRects = function() {
		return (this._paintRects || []).slice();
	}, t.prototype.resize = function(e, t) {
		var n = this.dpr, r = this.dom, i = r.style, a = this.domBack;
		i && (i.width = e + "px", i.height = t + "px"), r.width = e * n, r.height = t * n, a && (a.width = e * n, a.height = t * n, n !== 1 && this.ctxBack.scale(n, n));
	}, t.prototype.clear = function(e, t, n) {
		var r = this.dom, i = this.ctx, a = r.width, o = r.height;
		t ||= this.clearColor;
		var s = this.motionBlur && !e, c = this.lastFrameAlpha, l = this.dpr, u = this;
		s && (this.domBack || this.createBackBuffer(), this.ctxBack.globalCompositeOperation = "copy", this.ctxBack.drawImage(r, 0, 0, a / l, o / l));
		var d = this.domBack;
		function f(e, n, r, a) {
			if (i.clearRect(e, n, r, a), t && t !== "transparent") {
				var o = void 0;
				de(t) ? (o = (t.global || t.__width === r && t.__height === a) && t.__canvasGradient || Cb(i, t, {
					x: 0,
					y: 0,
					width: r,
					height: a
				}), t.__canvasGradient = o, t.__width = r, t.__height = a) : fe(t) && (t.scaleX = t.scaleX || l, t.scaleY = t.scaleY || l, o = Fb(i, t, { dirty: function() {
					u.setUnpainted(), u.painter.refresh();
				} })), i.save(), i.fillStyle = o || t, i.fillRect(e, n, r, a), i.restore();
			}
			s && (i.save(), i.globalAlpha = c, i.drawImage(d, e, n, r, a), i.restore());
		}
		!n || s ? f(0, 0, a, o) : n.length && L(n, function(e) {
			f(e.x * l, e.y * l, e.width * l, e.height * l);
		});
	}, t;
}(Ze), Zj = 1e5, Qj = 314159, $j = void 0, eM = 1, tM = 2;
function nM(e) {
	return e ? e.__builtin__ ? !0 : typeof e.resize == "function" && typeof e.refresh == "function" : !1;
}
function rM(e, t) {
	var n = document.createElement("div");
	return n.style.cssText = [
		"position:relative",
		"width:" + e + "px",
		"height:" + t + "px",
		"padding:0",
		"margin:0",
		"border-width:0"
	].join(";") + ";", n;
}
function iM(e, t, n, r) {
	var i = new Xj(e, t, t.dpr);
	return i.zlevel = n, i.zlevel2 = r, i.__builtin__ = !0, aM(i), i;
}
function aM(e) {
	e.__cursorStack = [], e.__cursors = q();
}
function oM(e) {
	return e.startIdx = e.drawIdx = e.endIdx = e.endIdxNew = 0, e.used = !1, e.first = e.last = NaN, e.notClearIdx = -1, e;
}
function sM(e, t) {
	var n = e.__cursors, r = +t;
	return n.get(r) || (e.__cursorStack.push(r), n.set(r, oM({ key: r })));
}
function cM(e, t) {
	for (var n = e.__cursorStack, r = 0; r < n.length; r++) t(e.__cursors.get(n[r]));
}
function lM(e, t) {
	var n = e.layers;
	return n[t] || (n[t] = [
		,
		,
		,
	]);
}
function uM(e, t, n) {
	for (var r = e.layerStack, i = 0; i < r.length; i++) {
		var a = r[i].zl, o = r[i].zl2, s = e.layers[a][o];
		(!n || (!(n & dM) || s.__builtin__) && (!(n & fM) || !s.__builtin__) && (!(n & pM) || s !== e.hoverlayer)) && t(s, a, o, i);
	}
}
var dM = 1, fM = 2, pM = 4, mM = dM | pM, hM = function() {
	function e(e, t, n, r) {
		this.type = "canvas", this._prevDisplayList = [], this._layerConfig = {}, this._needsManuallyCompositing = !1, this.type = "canvas", this._i = {
			layerStack: [],
			layers: []
		};
		var i = !e.nodeName || e.nodeName.toUpperCase() === "CANVAS";
		if (this._opts = n = M({}, n || {}), this.dpr = n.devicePixelRatio || Ti, this._singleCanvas = i, this.root = e, e.style && (ke(e), e.innerHTML = ""), this.storage = t, this._prevDisplayList = [], i) {
			var a = e, o = a.width, s = a.height;
			n.width != null && (o = n.width), n.height != null && (s = n.height), this.dpr = n.devicePixelRatio || 1, a.width = o * this.dpr, a.height = s * this.dpr, this._width = o, this._height = s;
			var c = iM(a, this, Qj, 0);
			c.initContext(), this._insertLayer(c, Qj, 0, !0), this._domRoot = e;
		} else {
			this._width = Eb(e, 0, n), this._height = Eb(e, 1, n);
			var l = this._domRoot = rM(this._width, this._height);
			e.appendChild(l);
		}
	}
	return e.prototype.getType = function() {
		return "canvas";
	}, e.prototype.isSingleCanvas = function() {
		return this._singleCanvas;
	}, e.prototype.getViewportRoot = function() {
		return this._domRoot;
	}, e.prototype.getViewportRootOffset = function() {
		var e = this.getViewportRoot();
		if (e) return {
			offsetLeft: e.offsetLeft || 0,
			offsetTop: e.offsetTop || 0
		};
	}, e.prototype.refresh = function(e) {
		var t = e && !G(e) ? { paintAll: !!e } : e || {}, n = K(t.refresh, !0), r = K(t.refreshHover, !1);
		if (r && (this._hoverLayerDirty = tM), !n) return r && this._paintHoverList(this.storage.getDisplayList(!1)), this;
		var i = this.storage.getDisplayList(!0);
		this._updateLayerStatus(i, t.paintAll), this._redrawId = Math.random();
		var a = this._prevDisplayList;
		this._paintList(i, a, this._redrawId);
		var o = this._backgroundColor;
		return uM(this._i, function(e, t, n, r) {
			e.refresh && e.refresh(r === 0 ? o : null);
		}, fM), this._opts.useDirtyRect && (this._prevDisplayList = i.slice()), this;
	}, e.prototype._paintHoverList = function(e) {
		var t = this._i.hoverlayer, n = this._hoverLayerDirty;
		if (this._hoverLayerDirty = $j, n !== $j && (!t && n === tM && (t = this._i.hoverlayer = this._ensureLayer(Zj)), t)) {
			t.clear();
			for (var r = {
				inHover: !0,
				viewWidth: this._width,
				viewHeight: this._height,
				beforeBrushParam: {}
			}, i, a = 0, o = e.length; a < o; a++) {
				var s = e[a];
				if (s.__inHover) {
					i || (i = t.ctx, i.save());
					var c = s.__hoverStyle, l = void 0;
					c && (l = s.style, s.style = c), ex(i, s, r), c && (s.style = l);
				}
			}
			i && (tx(i, r), i.restore());
		}
	}, e.prototype.getHoverLayer = function() {
		return this._ensureLayer(Zj);
	}, e.prototype.paintOne = function(e, t) {
		$b(e, t);
	}, e.prototype._paintList = function(e, t, n) {
		if (this._redrawId === n) {
			var r = this._doPaintList(e, t);
			if (this._needsManuallyCompositing && this._compositeManually(), r) uM(this._i, function(e) {
				e.afterBrush && e.afterBrush();
			}, mM), this._paintHoverList(e);
			else {
				var i = this;
				kn(function() {
					i._paintList(e, t, n);
				});
			}
		}
	}, e.prototype._compositeManually = function() {
		var e = this._ensureLayer(Qj).ctx, t = this._domRoot.width, n = this._domRoot.height;
		e.clearRect(0, 0, t, n), uM(this._i, function(r) {
			r.virtual && e.drawImage(r.dom, 0, 0, t, n);
		}, dM);
	}, e.prototype._doPaintList = function(e, t) {
		var n = this, r = !0;
		return uM(this._i, function(i) {
			var a = !1;
			if (cM(i, function(e) {
				(e.drawIdx < e.endIdx || e.notClearIdx >= 0) && (a = !0);
			}), a || i.__dirty) {
				var o = n._opts.useDirtyRect && !Jj(i) ? i.createRepaintRects(e, t, n._width, n._height) : null, s = n._i.layerStack[0], c = !0;
				if (i.__dirty) {
					c = !1, i.__dirty = !1;
					var l = i.zlevel === s.zl && i.zlevel2 === s.zl2 ? n._backgroundColor : null;
					i.clear(!1, l, o);
				}
				cM(i, function(t) {
					var a = n._paintPerCursor(i, t, e, o, c);
					r &&= a;
				});
			}
		}, mM), a.wxa && uM(this._i, function(e) {
			e && e.ctx && e.ctx.draw && e.ctx.draw();
		}), r;
	}, e.prototype._paintPerCursor = function(e, t, n, r, i) {
		var a = e.ctx;
		if (r) {
			if (!r.length) t.drawIdx = t.endIdx;
			else for (var o = this.dpr, s = 0; s < r.length; ++s) {
				var c = r[s];
				a.save(), a.beginPath(), a.rect(c.x * o, c.y * o, c.width * o, c.height * o), a.clip(), this._paintPerCursorInRect(e, t, n, c, i), a.restore();
			}
		} else a.save(), this._paintPerCursorInRect(e, t, n, null, i), a.restore();
		return t.drawIdx >= t.endIdx;
	}, e.prototype._paintPerCursorInRect = function(e, t, n, r, i) {
		for (var a = {
			inHover: !1,
			allClipped: !1,
			prevEl: null,
			viewWidth: this._width,
			viewHeight: this._height,
			beforeBrushParam: { contentRetained: i }
		}, o = e.ctx, s = Jj(e), c = s && p.getTime(), l = t.drawIdx, u = t.notClearIdx, d = u >= 0 ? Math.min(u, l) : l; d < t.endIdx; d++) {
			var f = n[d];
			if (!(d < l && !f.notClear)) {
				if (f.__inHover && (this._hoverLayerDirty = tM), r != null) {
					var m = f.getPaintRect();
					m && m.intersect(r) && (ex(o, f, a), f.setPrevPaintRect(m));
				} else ex(o, f, a);
				if (s && p.getTime() - c > 15) {
					d++;
					break;
				}
			}
		}
		tx(o, a), t.drawIdx = Math.max(d, l);
	}, e.prototype.getLayer = function(e, t) {
		return this._ensureLayer(e, 0, t);
	}, e.prototype._ensureLayer = function(e, t, n) {
		t ||= 0;
		var r = this._singleCanvas;
		r && !this._needsManuallyCompositing && (e = Qj, t = 0);
		var i = lM(this._i, e)[t];
		return i || (i = iM("zr_" + e + "." + t, this, e, t), this._layerConfig[e] && A(i, this._layerConfig[e], !0), (n || r && e !== Qj) && (i.virtual = !0), this._insertLayer(i, e, t, !1), i.initContext()), i;
	}, e.prototype.insertLayer = function(e, t) {
		this._insertLayer(t, e, 0, !1);
	}, e.prototype._insertLayer = function(e, t, n, r) {
		var i = this._i, a = i.layers, o = i.layerStack, s = this._domRoot, c = null;
		if (!(a[t] && a[t][n]) && nM(e)) {
			for (var l = o.length, u = 0; u < l && (o[u].zl < t || o[u].zl === t && o[u].zl2 < n);) u++;
			if (u > 0 && (c = lM(i, o[u - 1].zl)[o[u - 1].zl2]), o.splice(u, 0, {
				zl: t,
				zl2: n
			}), lM(i, t)[n] = e, !r && !e.virtual) {
				if (c) {
					var d = c.dom;
					d.nextSibling ? s.insertBefore(e.dom, d.nextSibling) : s.appendChild(e.dom);
				} else s.firstChild ? s.insertBefore(e.dom, s.firstChild) : s.appendChild(e.dom);
			}
			e.painter ||= this;
		}
	}, e.prototype.eachLayer = function(e, t) {
		return uM(this._i, function(n, r) {
			e.call(t, n, r);
		});
	}, e.prototype.eachBuiltinLayer = function(e, t) {
		return uM(this._i, function(n, r) {
			e.call(t, n, r);
		}, dM);
	}, e.prototype.eachOtherLayer = function(e, t) {
		return uM(this._i, function(n, r) {
			e.call(t, n, r);
		}, fM);
	}, e.prototype.getLayers = function() {
		var e = {};
		return uM(this._i, function(t, n, r) {
			e[t.id] = t;
		}), e;
	}, e.prototype._updateLayerStatus = function(e, t) {
		var n = this;
		if (n._singleCanvas) for (var r = 1; r < e.length; r++) {
			var i = e[r];
			if (i.zlevel !== e[r - 1].zlevel || i.incremental) {
				n._needsManuallyCompositing = !0;
				break;
			}
		}
		uM(n._i, function(e) {
			e.__dirty = !1, cM(e, function(e) {
				e.used = !1, e.endIdxNew = 0, e.notClearIdx = -1;
			});
		}, mM);
		for (var a, o = null, s = null, c = !1, l = 0, u = e.length; l < u; l++) {
			var i = e[l], d = i.zlevel, f = i.incremental, p = void 0;
			if (a !== d && (a = d, c = !1), f ? (c = !0, p = 1) : p = c ? 2 : 0, (!o || d !== o.zlevel || p !== o.zlevel2) && (o = n._ensureLayer(d, p), s = null, !o.__builtin__)) {
				O("ZLevel " + d + " has been used by unknown layer " + o.id);
				continue;
			}
			if ((!s || f !== s.key) && (s = sM(o, f), !s.used)) {
				if (s.used = !0, !t && s.first === i.id) {
					var m = l - s.startIdx;
					s.startIdx = l, s.drawIdx += m, s.endIdx += m;
				} else o.__dirty = !0, s.first = i.id, s.startIdx = s.drawIdx = l, s.endIdx = l + 1;
			}
			s.endIdxNew = l + 1, i.__dirty & 1 && !i.__inHover && ((!f || !i.notClear && l < s.drawIdx) && (o.__dirty = !0), f && i.notClear && s.notClearIdx < 0 && (s.notClearIdx = l));
		}
		uM(n._i, function(t) {
			for (var r = t.__cursorStack, i = t.__cursors, a = r.length - 1; a >= 0; a--) {
				var o = i.get(r[a]);
				if (!o.used) t.__dirty = !0, i.removeKey(r[a]), r.splice(a, 1);
				else {
					var s = o.endIdxNew;
					(Jj(t) ? s < o.drawIdx : s !== o.endIdx || !s || e[s - 1].id !== o.last) && (t.__dirty = !0), o.endIdx = o.endIdxNew, o.last = s ? e[s - 1].id : NaN;
				}
			}
			t.__dirty && (cM(t, function(e) {
				e.drawIdx = e.startIdx;
			}), n._hoverLayerDirty === $j && (n._hoverLayerDirty = eM));
		}, mM);
	}, e.prototype.clear = function() {
		return uM(this._i, function(e) {
			e.clear(), aM(e);
		}, dM), this;
	}, e.prototype.setBackgroundColor = function(e) {
		this._backgroundColor = e, uM(this._i, function(e) {
			e.setUnpainted();
		});
	}, e.prototype.configLayer = function(e, t) {
		if (t) {
			var n = this._layerConfig;
			n[e] ? A(n[e], t, !0) : n[e] = t, uM(this._i, function(e, t) {
				A(e, n[t], !0);
			});
		}
	}, e.prototype.delLayer = function(e) {
		for (var t = this._i.layerStack, n = this._i.layers, r = t.length - 1; r >= 0; r--) {
			var i = t[r];
			if (i.zl === e) {
				var a = n[e][i.zl2];
				if (a.__builtin__) continue;
				if (t.splice(r, 1), n[e][i.zl2] = void 0, !a.virtual) {
					var o = a.dom.parentNode;
					o && o.removeChild(a.dom);
				}
			}
		}
	}, e.prototype.resize = function(e, t) {
		if (this._domRoot.style) {
			var n = this._domRoot;
			n.style.display = "none";
			var r = this._opts, i = this.root;
			e != null && (r.width = e), t != null && (r.height = t), e = Eb(i, 0, r), t = Eb(i, 1, r), n.style.display = "", (this._width !== e || t !== this._height) && (n.style.width = e + "px", n.style.height = t + "px", uM(this._i, function(n) {
				n.resize(e, t);
			}), this.refresh({ paintAll: !0 })), this._width = e, this._height = t;
		} else {
			if (e == null || t == null) return;
			this._width = e, this._height = t, this._ensureLayer(Qj).resize(e, t);
		}
		return this;
	}, e.prototype.clearLayer = function(e) {
		L(this._i.layers[e], function(e) {
			e && !e.__builtin__ && e.clear();
		});
	}, e.prototype.dispose = function() {
		this.root.innerHTML = "", this.root = this.storage = this._domRoot = this._i = null;
	}, e.prototype.getRenderedCanvas = function(e) {
		if (e ||= {}, this._singleCanvas && !this._compositeManually) return this._i.layers[Qj][0].dom;
		var t = new Xj("image", this, e.pixelRatio || this.dpr);
		t.initContext(), t.clear(!1, e.backgroundColor || this._backgroundColor);
		var n = t.ctx;
		if (e.pixelRatio <= this.dpr) {
			this.refresh();
			var r = t.dom.width, i = t.dom.height;
			uM(this._i, function(e) {
				e.__builtin__ ? n.drawImage(e.dom, 0, 0, r, i) : e.renderToCanvas && (n.save(), e.renderToCanvas(n), n.restore());
			});
		} else {
			for (var a = {
				inHover: !1,
				viewWidth: this._width,
				viewHeight: this._height,
				beforeBrushParam: {}
			}, o = this.storage.getDisplayList(!0), s = 0, c = o.length; s < c; s++) {
				var l = o[s];
				ex(n, l, a);
			}
			tx(n, a);
		}
		return t.dom;
	}, e.prototype.getWidth = function() {
		return this._width;
	}, e.prototype.getHeight = function() {
		return this._height;
	}, e;
}();
//#endregion
//#region node_modules/echarts/lib/renderer/installCanvasRenderer.js
function gM(e) {
	e.registerPainter("canvas", hM);
}
//#endregion
//#region echarts-entry.js
zT([
	OD,
	kA,
	sj,
	Kj,
	Fj,
	gM
]);
//#endregion
export { BT as graphic, DS as init };
