window.__require = function t(e, n, o) {
function r(a, s) {
if (!n[a]) {
if (!e[a]) {
var p = a.split("/");
p = p[p.length - 1];
if (!e[p]) {
var u = "function" == typeof __require && __require;
if (!s && u) return u(p, !0);
if (i) return i(p, !0);
throw new Error("Cannot find module '" + a + "'");
}
a = p;
}
var c = n[a] = {
exports: {}
};
e[a][0].call(c.exports, function(t) {
return r(e[a][1][t] || t);
}, c, c.exports, t, e, n, o);
}
return n[a].exports;
}
for (var i = "function" == typeof __require && __require, a = 0; a < o.length; a++) r(o[a]);
return r;
}({
DBEvent: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "6f1fdwWe5FGxao8hDMwhA4W", "DBEvent");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.EDBEventAction = n.EDBEventType = void 0;
(function(t) {
t.value = "value";
t.keymod = "keymod";
})(n.EDBEventType || (n.EDBEventType = {}));
(function(t) {
t.Init = "init";
t.Add = "add";
t.Update = "update";
t.Remove = "remove";
})(n.EDBEventAction || (n.EDBEventAction = {}));
cc._RF.pop();
}, {} ],
DBHandler: [ function(t, e) {
"use strict";
cc._RF.push(e, "fff75WOt01Fwr2fWg9ARkAI", "DBHandler");
cc._RF.pop();
}, {} ],
DBHelper: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "fa4baaXHddCQ78ANWW5Lozk", "DBHelper");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.DBProperty = n.DBHelper = n.EDBOperator = void 0;
var o = t("./DBValue");
(function(t) {
t.update = "update";
t.set = "set";
t.remove = "__remove__";
})(n.EDBOperator || (n.EDBOperator = {}));
var r = function() {
function t() {}
t.genToken = function(t, e) {
return t.mUID + "_" + (e instanceof cc.Component ? e.uuid : e);
};
t.bind = function(t, e, n) {
t.data || (t.data = {});
t.data[e] || (t.data[e] = {});
t.data[e][n.token] = n;
};
t.unbindAll = function(t) {
for (var e in t.data) if (t.data[e]) {
var n = t.data[e];
for (var o in n) n[o] && n[o].unbind();
}
t.data = {};
};
return t;
}();
n.DBHelper = r;
n.DBProperty = function(t, e) {
return function(n, r) {
n.mTempProtorype || (n.mTempProtorype = {});
n.mTempProtorype[r] = function() {
return "function" == typeof t ? void 0 !== e ? new t(function() {
return "function" == typeof e ? new e() : new o.DBValueAny(e);
}) : new t() : new o.DBValueAny(t);
};
};
};
cc._RF.pop();
}, {
"./DBValue": "DBValue"
} ],
DBModel: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "ae6e1jvlERI2a7Twxcw6bS7", "DBModel");
var o, r = this && this.__extends || (o = function(t, e) {
return (o = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
})(t, e);
}, function(t, e) {
o(t, e);
function n() {
this.constructor = t;
}
t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
});
Object.defineProperty(n, "__esModule", {
value: !0
});
n.DBModel = n.DBModelT = void 0;
var i = t("./DBValue"), a = t("./DBHelper"), s = t("./DBEvent"), p = function(t) {
r(e, t);
function e() {
var e = t.call(this) || this;
e.mKeymodListener = {};
e.mEventKeymod = [];
e.mEventPool = [];
e.mEventKeymodPool = [];
e.mData = {};
if (e.mTempProtorype) {
var n = function(t) {
if (o.mTempProtorype.hasOwnProperty(t)) {
var n = o.mTempProtorype[t]();
o.mData[t] = n;
Object.defineProperty(o, t, {
get: function() {
return e.mData[t];
},
set: function(e) {
cc.warn("Model: couldn't set '" + t + "' to " + e + "', you shoudle use xxx.parse({" + t + ": " + e + "})");
},
enumerable: !0,
configurable: !0
});
}
}, o = this;
for (var r in e.mTempProtorype) n(r);
}
return e;
}
e.prototype.bindKeymod = function(t, e, n) {
var o = this._bindKeyMod(t, e);
this._buildKeymodEvent(s.EDBEventAction.Init, e);
n && a.DBHelper.bind(n, s.EDBEventType.keymod, o);
return o;
};
e.prototype.unbindKeymod = function(t) {
delete this.mKeymodListener[t];
};
e.prototype._bindKeyMod = function(t, e) {
var n = a.DBHelper.genToken(this, t);
this.mKeymodListener[n] = {
key: t,
token: n,
callfunc: e
};
return {
token: n,
unbind: this.unbindKeymod.bind(this, n)
};
};
e.prototype._buildKeymodEvent = function(t, e) {
for (var n = Object.keys(this.mData), o = n.length, r = 0; r < n.length; r++) {
var i = n[r];
this.mData.hasOwnProperty(i) && e({
value: this.mData[i],
attr: i,
action: t,
progress: {
cur: r + 1,
all: o,
isfirst: 0 === r,
islast: r === length - 1
}
});
}
};
e.prototype.parse = function(t) {
if (this._parse(t, this, a.EDBOperator.update, 0)) {
for (var e = 0, n = this.mEventPool; e < n.length; e++) n[e].emit();
this.mEventPool = [];
for (var o = 0, r = this.mEventKeymodPool; o < r.length; o++) r[o].emitKeymod();
this.mEventKeymodPool = [];
}
};
e.prototype._parse = function(t, e, n, o) {
var r = !1;
for (var i in t) if (t.hasOwnProperty(i)) {
var p = t[i], u = n;
if ((l = i).indexOf("$") >= 0) {
var c = i.split("$");
if (c.length >= 2) {
l = c[0];
u = c[1];
}
}
this.parseValue(l, p, u, e, o + 1) && (r = !0);
}
if (n === a.EDBOperator.set) for (var l in this.mData) if (this.mData.hasOwnProperty(l) && !t.hasOwnProperty(l)) {
this.parseValue(l, a.EDBOperator.remove, n, e, o + 1);
r = !0;
}
if (r) {
this.mEvent = this._buildEvent(s.EDBEventAction.Update);
e.mEventPool.push(this);
}
this.mEventKeymod.length > 0 && e.mEventKeymodPool.push(this);
return r;
};
e.prototype.hasPrototype = function(t) {
return this.mTempProtorype && this.mTempProtorype.hasOwnProperty(t);
};
e.prototype.getPrototype = function(t) {
return this.mTempProtorype && this.mTempProtorype[t]();
};
e.prototype.parseValue = function(t, n, o, r, p) {
var u = this.mData[t];
if (this.isValueEquals(u, n)) return !1;
if (this.hasPrototype(t)) if (n === a.EDBOperator.remove) {
if (u) {
u instanceof e ? u._parse({}, r, a.EDBOperator.set, p) : u instanceof i.DBValueT && u.parse(null, !1) && r.mEventPool.push(u);
this.mEventKeymod.push({
value: u,
attr: t,
action: s.EDBEventAction.Remove,
progress: null
});
}
} else if (u) {
var c = !1;
u instanceof e ? c = u._parse(n, r, o, p) : u instanceof i.DBValueT && (c = u.parse(n, !1)) && r.mEventPool.push(u);
c && this.mEventKeymod.push({
value: u,
attr: t,
action: s.EDBEventAction.Update,
progress: null
});
} else {
(u = this.getPrototype(t)) instanceof e ? u._parse(n, r, o, p) : u instanceof i.DBValueT && u.parse(n, !1) && r.mEventPool.push(u);
this.mData[t] = u;
this.mEventKeymod.push({
value: u,
attr: t,
action: s.EDBEventAction.Add,
progress: null
});
} else if (n === a.EDBOperator.remove) {
delete this.mData[t];
delete this[t];
} else {
this.mData[t] = n;
this[t] = n;
}
return !0;
};
e.prototype.equals = function(t) {
if ("object" == typeof t) {
for (var e in t) if (t.hasOwnProperty(e)) {
var n = t[e], o = this.mData[e];
if (!this.isValueEquals(o, n)) return !1;
}
return !0;
}
return this.mData === t;
};
e.prototype.isValueEquals = function(t, e) {
return t instanceof i.DBValueT ? t.equals(e) : t === e;
};
e.prototype.toData = function() {
var t = {};
for (var n in this.mData) if (this.mData.hasOwnProperty(n)) {
var o = this.mData[n];
o instanceof e ? t[n] = o.toData() : o instanceof i.DBValueT ? t[n] = o.getMetaData() : t[n] = o;
}
return t;
};
e.prototype.emitKeymod = function() {
var t = this.mEventKeymod.length;
if (!(t <= 0)) {
for (var e = 0; e < t; e++) (o = this.mEventKeymod[e]).progress = {
cur: e + 1,
all: t,
isfirst: 0 === e,
islast: e === t - 1
};
for (var n in this.mKeymodListener) if (this.mKeymodListener.hasOwnProperty(n)) {
var o;
if ((o = this.mKeymodListener[n]).key instanceof cc.Component && !cc.isValid(o.key)) {
this.unbindKeymod(n);
continue;
}
for (var r = 0, i = this.mEventKeymod; r < i.length; r++) {
var a = i[r];
o.callfunc(a);
}
}
this.mEventKeymod = [];
}
};
return e;
}(i.DBValueT);
n.DBModelT = p;
var u = function(t) {
r(e, t);
function e() {
return null !== t && t.apply(this, arguments) || this;
}
return e;
}(p);
n.DBModel = u;
cc._RF.pop();
}, {
"./DBEvent": "DBEvent",
"./DBHelper": "DBHelper",
"./DBValue": "DBValue"
} ],
DBObject: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "bcc411m93BC77heIAI0cAkn", "DBObject");
var o, r = this && this.__extends || (o = function(t, e) {
return (o = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
})(t, e);
}, function(t, e) {
o(t, e);
function n() {
this.constructor = t;
}
t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
});
Object.defineProperty(n, "__esModule", {
value: !0
});
n.DBObjectT = void 0;
var i = function(t) {
r(e, t);
function e(e) {
var n = t.call(this) || this;
n.mWildPrototype = e;
return n;
}
e.prototype.hasPrototype = function() {
return !0;
};
e.prototype.getPrototype = function(t) {
return this.mTempProtorype && this.mTempProtorype.hasOwnProperty(t) ? this.mTempProtorype[t]() : this.mWildPrototype();
};
e.prototype.getModel = function(t) {
null == this.mData[t] && (this.mData[t] = this.getPrototype(t));
return this.mData[t];
};
e.prototype.getAllModel = function() {
return this.mData;
};
return e;
}(t("./DBModel").DBModelT);
n.DBObjectT = i;
cc._RF.pop();
}, {
"./DBModel": "DBModel"
} ],
DBValue: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "2d6c1nCiKJO8IwoRdU49OcX", "DBValue");
var o, r = this && this.__extends || (o = function(t, e) {
return (o = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
})(t, e);
}, function(t, e) {
o(t, e);
function n() {
this.constructor = t;
}
t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
});
Object.defineProperty(n, "__esModule", {
value: !0
});
n.DBValueBoolean = n.DBValueNumber = n.DBValueString = n.DBValueAny = n.DBValueT = void 0;
var i = t("./DBHelper"), a = t("./DBEvent"), s = function() {
function t(e) {
this.mData = null;
this.mListener = {};
this.mEvent = null;
this.mData = e;
this.mUID = (++t.sUID).toString();
}
t.prototype.getMetaData = function() {
return this.mData;
};
t.prototype.parse = function(t, e) {
void 0 === e && (e = !0);
if (this.mData != t) {
var n = null === t ? a.EDBEventAction.Remove : null === this.mData ? a.EDBEventAction.Add : a.EDBEventAction.Update;
this.mData = t;
this.mEvent = this._buildEvent(n);
e && this.emit();
return !0;
}
return !1;
};
t.prototype.isVaild = function() {
return null !== this.mData;
};
t.prototype.toJSON = function() {
return this.mData;
};
t.prototype.equals = function(t) {
return this.mData === t;
};
t.prototype.bind = function(t, e, n) {
var o = this._bind(t, e);
e(this._buildEvent(a.EDBEventAction.Init));
n && i.DBHelper.bind(n, a.EDBEventType.value, o);
return o;
};
t.prototype.unbind = function(t) {
delete this.mListener[t];
};
t.prototype._buildEvent = function(t) {
return {
action: t,
value: this.mData
};
};
t.prototype._bind = function(t, e) {
var n = i.DBHelper.genToken(this, t);
this.mListener[n] = {
key: t,
token: n,
callfunc: e
};
return {
token: n,
unbind: this.unbind.bind(this, n)
};
};
t.prototype.emit = function() {
if (this.mEvent) {
for (var t in this.mListener) if (this.mListener.hasOwnProperty(t)) {
var e = this.mListener[t];
if (e.key instanceof cc.Component && !cc.isValid(e.key)) {
this.unbind(t);
continue;
}
e.callfunc(this.mEvent);
}
this.mEvent = null;
}
};
t.sUID = 1;
return t;
}();
n.DBValueT = s;
var p = function(t) {
r(e, t);
function e() {
return null !== t && t.apply(this, arguments) || this;
}
return e;
}(s);
n.DBValueAny = p;
var u = function(t) {
r(e, t);
function e() {
return null !== t && t.apply(this, arguments) || this;
}
return e;
}(s);
n.DBValueString = u;
var c = function(t) {
r(e, t);
function e() {
return null !== t && t.apply(this, arguments) || this;
}
return e;
}(s);
n.DBValueNumber = c;
var l = function(t) {
r(e, t);
function e() {
return null !== t && t.apply(this, arguments) || this;
}
return e;
}(s);
n.DBValueBoolean = l;
cc._RF.pop();
}, {
"./DBEvent": "DBEvent",
"./DBHelper": "DBHelper"
} ],
Helloworld: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "e1b90/rohdEk4SdmmEZANaD", "Helloworld");
var o, r = this && this.__extends || (o = function(t, e) {
return (o = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
})(t, e);
}, function(t, e) {
o(t, e);
function n() {
this.constructor = t;
}
t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
}), i = this && this.__decorate || function(t, e, n, o) {
var r, i = arguments.length, a = i < 3 ? e : null === o ? o = Object.getOwnPropertyDescriptor(e, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, n, o); else for (var s = t.length - 1; s >= 0; s--) (r = t[s]) && (a = (i < 3 ? r(a) : i > 3 ? r(e, n, a) : r(e, n)) || a);
return i > 3 && a && Object.defineProperty(e, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var a = t("../lib/databinding/DBValue"), s = cc._decorator, p = s.ccclass, u = s.property, c = function(t) {
r(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.label = null;
e.text = "hello";
return e;
}
e.prototype.start = function() {
this.label.string = this.text;
var t = new a.DBValueNumber(1);
t.parse(2);
t.bind(this, function(t) {
cc.log("event:", t);
});
t.parse(4);
};
i([ u(cc.Label) ], e.prototype, "label", void 0);
i([ u ], e.prototype, "text", void 0);
return i([ p ], e);
}(cc.Component);
n.default = c;
cc._RF.pop();
}, {
"../lib/databinding/DBValue": "DBValue"
} ],
PekingSpellLabel: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "6571ezjsW1Fx6txXTIwvuoO", "PekingSpellLabel");
var o, r = this && this.__extends || (o = function(t, e) {
return (o = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
})(t, e);
}, function(t, e) {
o(t, e);
function n() {
this.constructor = t;
}
t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
}), i = this && this.__decorate || function(t, e, n, o) {
var r, i = arguments.length, a = i < 3 ? e : null === o ? o = Object.getOwnPropertyDescriptor(e, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, n, o); else for (var s = t.length - 1; s >= 0; s--) (r = t[s]) && (a = (i < 3 ? r(a) : i > 3 ? r(e, n, a) : r(e, n)) || a);
return i > 3 && a && Object.defineProperty(e, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var a = cc._decorator, s = a.ccclass, p = a.property, u = a.executeInEditMode, c = a.requireComponent, l = function() {
function t() {
this.font = null;
this.fontSize = 40;
this.fixY = 0;
}
i([ p({
type: cc.Font,
tooltip: "字体"
}) ], t.prototype, "font", void 0);
i([ p({
tooltip: "字体字号"
}) ], t.prototype, "fontSize", void 0);
i([ p() ], t.prototype, "fixY", void 0);
return i([ s("LabelConfig") ], t);
}(), f = function(t) {
r(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e._string = "";
e.normal = new l();
e.spell = new l();
e.nodePool = new cc.NodePool();
e.enChar = new RegExp(/^[a-z]$/);
return e;
}
Object.defineProperty(e.prototype, "string", {
get: function() {
return this._string;
},
set: function(t) {
if (t !== this._string) {
this._string = t;
this.refresh();
}
},
enumerable: !1,
configurable: !0
});
e.prototype.start = function() {
var t = this.node.getComponent(cc.Layout);
t.type = cc.Layout.Type.HORIZONTAL;
t.resizeMode = cc.Layout.ResizeMode.CONTAINER;
};
e.prototype.refresh = function() {
var t = this.node.children;
if (t.length < this.string.length) for (var e = this.string.length - t.length, n = 0; n < e; n++) (o = this.getNode()).parent = this.node; else if (t.length > this.string.length) for (n = this.string.length; n < t.length; n++) {
var o = t[n];
this.putNode(o);
}
var r = 0;
for (n = 0; n < this.string.length; n++) {
this.setLabel(this.string[n], t[n]);
r = Math.max(r, t[n].height);
}
this.node.height = r;
};
e.prototype.setLabel = function(t, e) {
var n = this.isEnChar(t) ? this.spell : this.normal, o = e.getComponent(cc.Label);
o.string = t;
o.font = n.font;
o.fontSize = n.fontSize;
e.y = n.fixY;
};
e.prototype.isEnChar = function(t) {
return this.enChar.test(t);
};
e.prototype.getNode = function() {
var t = this.nodePool.get();
if (!t) {
(t = new cc.Node()).addComponent(cc.Label);
t._objFlags |= cc.Object.Flags.DontSave | cc.Object.Flags.HideInHierarchy | cc.Object.Flags.LockedInEditor;
}
return t;
};
e.prototype.putNode = function(t) {
this.nodePool.put(t);
};
e.prototype.onDestroy = function() {
this.nodePool.clear();
};
i([ p() ], e.prototype, "_string", void 0);
i([ p() ], e.prototype, "string", null);
i([ p({
type: l,
tooltip: "默认配置"
}) ], e.prototype, "normal", void 0);
i([ p({
type: l,
tooltip: "拼音配置"
}) ], e.prototype, "spell", void 0);
return i([ s, u, c(cc.Layout) ], e);
}(cc.Component);
n.default = f;
cc._RF.pop();
}, {} ]
}, {}, [ "Helloworld", "PekingSpellLabel", "DBEvent", "DBHandler", "DBHelper", "DBModel", "DBObject", "DBValue" ]);