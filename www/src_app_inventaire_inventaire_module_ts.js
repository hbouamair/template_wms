(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_inventaire_inventaire_module_ts"],{

/***/ 8997:
/*!**********************************************!*\
  !*** ./node_modules/jszip/dist/jszip.min.js ***!
  \**********************************************/
/***/ ((module) => {

/*!

JSZip v3.7.1 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/master/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/master/LICENSE
*/
!function (t) {
  if (true) module.exports = t();else {}
}(function () {
  return function s(a, o, h) {
    function u(r, t) {
      if (!o[r]) {
        if (!a[r]) {
          var e = undefined;
          if (!t && e) return require(r, !0);
          if (l) return l(r, !0);
          var i = new Error("Cannot find module '" + r + "'");
          throw i.code = "MODULE_NOT_FOUND", i;
        }

        var n = o[r] = {
          exports: {}
        };
        a[r][0].call(n.exports, function (t) {
          var e = a[r][1][t];
          return u(e || t);
        }, n, n.exports, s, a, o, h);
      }

      return o[r].exports;
    }

    for (var l = undefined, t = 0; t < h.length; t++) u(h[t]);

    return u;
  }({
    1: [function (t, e, r) {
      "use strict";

      var c = t("./utils"),
          d = t("./support"),
          p = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      r.encode = function (t) {
        for (var e, r, i, n, s, a, o, h = [], u = 0, l = t.length, f = l, d = "string" !== c.getTypeOf(t); u < t.length;) f = l - u, i = d ? (e = t[u++], r = u < l ? t[u++] : 0, u < l ? t[u++] : 0) : (e = t.charCodeAt(u++), r = u < l ? t.charCodeAt(u++) : 0, u < l ? t.charCodeAt(u++) : 0), n = e >> 2, s = (3 & e) << 4 | r >> 4, a = 1 < f ? (15 & r) << 2 | i >> 6 : 64, o = 2 < f ? 63 & i : 64, h.push(p.charAt(n) + p.charAt(s) + p.charAt(a) + p.charAt(o));

        return h.join("");
      }, r.decode = function (t) {
        var e,
            r,
            i,
            n,
            s,
            a,
            o = 0,
            h = 0,
            u = "data:";
        if (t.substr(0, u.length) === u) throw new Error("Invalid base64 input, it looks like a data url.");
        var l,
            f = 3 * (t = t.replace(/[^A-Za-z0-9\+\/\=]/g, "")).length / 4;
        if (t.charAt(t.length - 1) === p.charAt(64) && f--, t.charAt(t.length - 2) === p.charAt(64) && f--, f % 1 != 0) throw new Error("Invalid base64 input, bad content length.");

        for (l = d.uint8array ? new Uint8Array(0 | f) : new Array(0 | f); o < t.length;) e = p.indexOf(t.charAt(o++)) << 2 | (n = p.indexOf(t.charAt(o++))) >> 4, r = (15 & n) << 4 | (s = p.indexOf(t.charAt(o++))) >> 2, i = (3 & s) << 6 | (a = p.indexOf(t.charAt(o++))), l[h++] = e, 64 !== s && (l[h++] = r), 64 !== a && (l[h++] = i);

        return l;
      };
    }, {
      "./support": 30,
      "./utils": 32
    }],
    2: [function (t, e, r) {
      "use strict";

      var i = t("./external"),
          n = t("./stream/DataWorker"),
          s = t("./stream/Crc32Probe"),
          a = t("./stream/DataLengthProbe");

      function o(t, e, r, i, n) {
        this.compressedSize = t, this.uncompressedSize = e, this.crc32 = r, this.compression = i, this.compressedContent = n;
      }

      o.prototype = {
        getContentWorker: function () {
          var t = new n(i.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new a("data_length")),
              e = this;
          return t.on("end", function () {
            if (this.streamInfo.data_length !== e.uncompressedSize) throw new Error("Bug : uncompressed data size mismatch");
          }), t;
        },
        getCompressedWorker: function () {
          return new n(i.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
        }
      }, o.createWorkerFrom = function (t, e, r) {
        return t.pipe(new s()).pipe(new a("uncompressedSize")).pipe(e.compressWorker(r)).pipe(new a("compressedSize")).withStreamInfo("compression", e);
      }, e.exports = o;
    }, {
      "./external": 6,
      "./stream/Crc32Probe": 25,
      "./stream/DataLengthProbe": 26,
      "./stream/DataWorker": 27
    }],
    3: [function (t, e, r) {
      "use strict";

      var i = t("./stream/GenericWorker");
      r.STORE = {
        magic: "\0\0",
        compressWorker: function (t) {
          return new i("STORE compression");
        },
        uncompressWorker: function () {
          return new i("STORE decompression");
        }
      }, r.DEFLATE = t("./flate");
    }, {
      "./flate": 7,
      "./stream/GenericWorker": 28
    }],
    4: [function (t, e, r) {
      "use strict";

      var i = t("./utils");

      var o = function () {
        for (var t, e = [], r = 0; r < 256; r++) {
          t = r;

          for (var i = 0; i < 8; i++) t = 1 & t ? 3988292384 ^ t >>> 1 : t >>> 1;

          e[r] = t;
        }

        return e;
      }();

      e.exports = function (t, e) {
        return void 0 !== t && t.length ? "string" !== i.getTypeOf(t) ? function (t, e, r, i) {
          var n = o,
              s = i + r;
          t ^= -1;

          for (var a = i; a < s; a++) t = t >>> 8 ^ n[255 & (t ^ e[a])];

          return -1 ^ t;
        }(0 | e, t, t.length, 0) : function (t, e, r, i) {
          var n = o,
              s = i + r;
          t ^= -1;

          for (var a = i; a < s; a++) t = t >>> 8 ^ n[255 & (t ^ e.charCodeAt(a))];

          return -1 ^ t;
        }(0 | e, t, t.length, 0) : 0;
      };
    }, {
      "./utils": 32
    }],
    5: [function (t, e, r) {
      "use strict";

      r.base64 = !1, r.binary = !1, r.dir = !1, r.createFolders = !0, r.date = null, r.compression = null, r.compressionOptions = null, r.comment = null, r.unixPermissions = null, r.dosPermissions = null;
    }, {}],
    6: [function (t, e, r) {
      "use strict";

      var i = null;
      i = "undefined" != typeof Promise ? Promise : t("lie"), e.exports = {
        Promise: i
      };
    }, {
      lie: 37
    }],
    7: [function (t, e, r) {
      "use strict";

      var i = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Uint32Array,
          n = t("pako"),
          s = t("./utils"),
          a = t("./stream/GenericWorker"),
          o = i ? "uint8array" : "array";

      function h(t, e) {
        a.call(this, "FlateWorker/" + t), this._pako = null, this._pakoAction = t, this._pakoOptions = e, this.meta = {};
      }

      r.magic = "\b\0", s.inherits(h, a), h.prototype.processChunk = function (t) {
        this.meta = t.meta, null === this._pako && this._createPako(), this._pako.push(s.transformTo(o, t.data), !1);
      }, h.prototype.flush = function () {
        a.prototype.flush.call(this), null === this._pako && this._createPako(), this._pako.push([], !0);
      }, h.prototype.cleanUp = function () {
        a.prototype.cleanUp.call(this), this._pako = null;
      }, h.prototype._createPako = function () {
        this._pako = new n[this._pakoAction]({
          raw: !0,
          level: this._pakoOptions.level || -1
        });
        var e = this;

        this._pako.onData = function (t) {
          e.push({
            data: t,
            meta: e.meta
          });
        };
      }, r.compressWorker = function (t) {
        return new h("Deflate", t);
      }, r.uncompressWorker = function () {
        return new h("Inflate", {});
      };
    }, {
      "./stream/GenericWorker": 28,
      "./utils": 32,
      pako: 38
    }],
    8: [function (t, e, r) {
      "use strict";

      function A(t, e) {
        var r,
            i = "";

        for (r = 0; r < e; r++) i += String.fromCharCode(255 & t), t >>>= 8;

        return i;
      }

      function i(t, e, r, i, n, s) {
        var a,
            o,
            h = t.file,
            u = t.compression,
            l = s !== O.utf8encode,
            f = I.transformTo("string", s(h.name)),
            d = I.transformTo("string", O.utf8encode(h.name)),
            c = h.comment,
            p = I.transformTo("string", s(c)),
            m = I.transformTo("string", O.utf8encode(c)),
            _ = d.length !== h.name.length,
            g = m.length !== c.length,
            b = "",
            v = "",
            y = "",
            w = h.dir,
            k = h.date,
            x = {
          crc32: 0,
          compressedSize: 0,
          uncompressedSize: 0
        };

        e && !r || (x.crc32 = t.crc32, x.compressedSize = t.compressedSize, x.uncompressedSize = t.uncompressedSize);
        var S = 0;
        e && (S |= 8), l || !_ && !g || (S |= 2048);
        var z = 0,
            C = 0;
        w && (z |= 16), "UNIX" === n ? (C = 798, z |= function (t, e) {
          var r = t;
          return t || (r = e ? 16893 : 33204), (65535 & r) << 16;
        }(h.unixPermissions, w)) : (C = 20, z |= function (t) {
          return 63 & (t || 0);
        }(h.dosPermissions)), a = k.getUTCHours(), a <<= 6, a |= k.getUTCMinutes(), a <<= 5, a |= k.getUTCSeconds() / 2, o = k.getUTCFullYear() - 1980, o <<= 4, o |= k.getUTCMonth() + 1, o <<= 5, o |= k.getUTCDate(), _ && (v = A(1, 1) + A(B(f), 4) + d, b += "up" + A(v.length, 2) + v), g && (y = A(1, 1) + A(B(p), 4) + m, b += "uc" + A(y.length, 2) + y);
        var E = "";
        return E += "\n\0", E += A(S, 2), E += u.magic, E += A(a, 2), E += A(o, 2), E += A(x.crc32, 4), E += A(x.compressedSize, 4), E += A(x.uncompressedSize, 4), E += A(f.length, 2), E += A(b.length, 2), {
          fileRecord: R.LOCAL_FILE_HEADER + E + f + b,
          dirRecord: R.CENTRAL_FILE_HEADER + A(C, 2) + E + A(p.length, 2) + "\0\0\0\0" + A(z, 4) + A(i, 4) + f + b + p
        };
      }

      var I = t("../utils"),
          n = t("../stream/GenericWorker"),
          O = t("../utf8"),
          B = t("../crc32"),
          R = t("../signature");

      function s(t, e, r, i) {
        n.call(this, "ZipFileWorker"), this.bytesWritten = 0, this.zipComment = e, this.zipPlatform = r, this.encodeFileName = i, this.streamFiles = t, this.accumulate = !1, this.contentBuffer = [], this.dirRecords = [], this.currentSourceOffset = 0, this.entriesCount = 0, this.currentFile = null, this._sources = [];
      }

      I.inherits(s, n), s.prototype.push = function (t) {
        var e = t.meta.percent || 0,
            r = this.entriesCount,
            i = this._sources.length;
        this.accumulate ? this.contentBuffer.push(t) : (this.bytesWritten += t.data.length, n.prototype.push.call(this, {
          data: t.data,
          meta: {
            currentFile: this.currentFile,
            percent: r ? (e + 100 * (r - i - 1)) / r : 100
          }
        }));
      }, s.prototype.openedSource = function (t) {
        this.currentSourceOffset = this.bytesWritten, this.currentFile = t.file.name;
        var e = this.streamFiles && !t.file.dir;

        if (e) {
          var r = i(t, e, !1, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
          this.push({
            data: r.fileRecord,
            meta: {
              percent: 0
            }
          });
        } else this.accumulate = !0;
      }, s.prototype.closedSource = function (t) {
        this.accumulate = !1;
        var e = this.streamFiles && !t.file.dir,
            r = i(t, e, !0, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
        if (this.dirRecords.push(r.dirRecord), e) this.push({
          data: function (t) {
            return R.DATA_DESCRIPTOR + A(t.crc32, 4) + A(t.compressedSize, 4) + A(t.uncompressedSize, 4);
          }(t),
          meta: {
            percent: 100
          }
        });else for (this.push({
          data: r.fileRecord,
          meta: {
            percent: 0
          }
        }); this.contentBuffer.length;) this.push(this.contentBuffer.shift());
        this.currentFile = null;
      }, s.prototype.flush = function () {
        for (var t = this.bytesWritten, e = 0; e < this.dirRecords.length; e++) this.push({
          data: this.dirRecords[e],
          meta: {
            percent: 100
          }
        });

        var r = this.bytesWritten - t,
            i = function (t, e, r, i, n) {
          var s = I.transformTo("string", n(i));
          return R.CENTRAL_DIRECTORY_END + "\0\0\0\0" + A(t, 2) + A(t, 2) + A(e, 4) + A(r, 4) + A(s.length, 2) + s;
        }(this.dirRecords.length, r, t, this.zipComment, this.encodeFileName);

        this.push({
          data: i,
          meta: {
            percent: 100
          }
        });
      }, s.prototype.prepareNextSource = function () {
        this.previous = this._sources.shift(), this.openedSource(this.previous.streamInfo), this.isPaused ? this.previous.pause() : this.previous.resume();
      }, s.prototype.registerPrevious = function (t) {
        this._sources.push(t);

        var e = this;
        return t.on("data", function (t) {
          e.processChunk(t);
        }), t.on("end", function () {
          e.closedSource(e.previous.streamInfo), e._sources.length ? e.prepareNextSource() : e.end();
        }), t.on("error", function (t) {
          e.error(t);
        }), this;
      }, s.prototype.resume = function () {
        return !!n.prototype.resume.call(this) && (!this.previous && this._sources.length ? (this.prepareNextSource(), !0) : this.previous || this._sources.length || this.generatedError ? void 0 : (this.end(), !0));
      }, s.prototype.error = function (t) {
        var e = this._sources;
        if (!n.prototype.error.call(this, t)) return !1;

        for (var r = 0; r < e.length; r++) try {
          e[r].error(t);
        } catch (t) {}

        return !0;
      }, s.prototype.lock = function () {
        n.prototype.lock.call(this);

        for (var t = this._sources, e = 0; e < t.length; e++) t[e].lock();
      }, e.exports = s;
    }, {
      "../crc32": 4,
      "../signature": 23,
      "../stream/GenericWorker": 28,
      "../utf8": 31,
      "../utils": 32
    }],
    9: [function (t, e, r) {
      "use strict";

      var u = t("../compressions"),
          i = t("./ZipFileWorker");

      r.generateWorker = function (t, a, e) {
        var o = new i(a.streamFiles, e, a.platform, a.encodeFileName),
            h = 0;

        try {
          t.forEach(function (t, e) {
            h++;

            var r = function (t, e) {
              var r = t || e,
                  i = u[r];
              if (!i) throw new Error(r + " is not a valid compression method !");
              return i;
            }(e.options.compression, a.compression),
                i = e.options.compressionOptions || a.compressionOptions || {},
                n = e.dir,
                s = e.date;

            e._compressWorker(r, i).withStreamInfo("file", {
              name: t,
              dir: n,
              date: s,
              comment: e.comment || "",
              unixPermissions: e.unixPermissions,
              dosPermissions: e.dosPermissions
            }).pipe(o);
          }), o.entriesCount = h;
        } catch (t) {
          o.error(t);
        }

        return o;
      };
    }, {
      "../compressions": 3,
      "./ZipFileWorker": 8
    }],
    10: [function (t, e, r) {
      "use strict";

      function i() {
        if (!(this instanceof i)) return new i();
        if (arguments.length) throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
        this.files = Object.create(null), this.comment = null, this.root = "", this.clone = function () {
          var t = new i();

          for (var e in this) "function" != typeof this[e] && (t[e] = this[e]);

          return t;
        };
      }

      (i.prototype = t("./object")).loadAsync = t("./load"), i.support = t("./support"), i.defaults = t("./defaults"), i.version = "3.7.1", i.loadAsync = function (t, e) {
        return new i().loadAsync(t, e);
      }, i.external = t("./external"), e.exports = i;
    }, {
      "./defaults": 5,
      "./external": 6,
      "./load": 11,
      "./object": 15,
      "./support": 30
    }],
    11: [function (t, e, r) {
      "use strict";

      var i = t("./utils"),
          n = t("./external"),
          o = t("./utf8"),
          h = t("./zipEntries"),
          s = t("./stream/Crc32Probe"),
          u = t("./nodejsUtils");

      function l(i) {
        return new n.Promise(function (t, e) {
          var r = i.decompressed.getContentWorker().pipe(new s());
          r.on("error", function (t) {
            e(t);
          }).on("end", function () {
            r.streamInfo.crc32 !== i.decompressed.crc32 ? e(new Error("Corrupted zip : CRC32 mismatch")) : t();
          }).resume();
        });
      }

      e.exports = function (t, s) {
        var a = this;
        return s = i.extend(s || {}, {
          base64: !1,
          checkCRC32: !1,
          optimizedBinaryString: !1,
          createFolders: !1,
          decodeFileName: o.utf8decode
        }), u.isNode && u.isStream(t) ? n.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")) : i.prepareContent("the loaded zip file", t, !0, s.optimizedBinaryString, s.base64).then(function (t) {
          var e = new h(s);
          return e.load(t), e;
        }).then(function (t) {
          var e = [n.Promise.resolve(t)],
              r = t.files;
          if (s.checkCRC32) for (var i = 0; i < r.length; i++) e.push(l(r[i]));
          return n.Promise.all(e);
        }).then(function (t) {
          for (var e = t.shift(), r = e.files, i = 0; i < r.length; i++) {
            var n = r[i];
            a.file(n.fileNameStr, n.decompressed, {
              binary: !0,
              optimizedBinaryString: !0,
              date: n.date,
              dir: n.dir,
              comment: n.fileCommentStr.length ? n.fileCommentStr : null,
              unixPermissions: n.unixPermissions,
              dosPermissions: n.dosPermissions,
              createFolders: s.createFolders
            });
          }

          return e.zipComment.length && (a.comment = e.zipComment), a;
        });
      };
    }, {
      "./external": 6,
      "./nodejsUtils": 14,
      "./stream/Crc32Probe": 25,
      "./utf8": 31,
      "./utils": 32,
      "./zipEntries": 33
    }],
    12: [function (t, e, r) {
      "use strict";

      var i = t("../utils"),
          n = t("../stream/GenericWorker");

      function s(t, e) {
        n.call(this, "Nodejs stream input adapter for " + t), this._upstreamEnded = !1, this._bindStream(e);
      }

      i.inherits(s, n), s.prototype._bindStream = function (t) {
        var e = this;
        (this._stream = t).pause(), t.on("data", function (t) {
          e.push({
            data: t,
            meta: {
              percent: 0
            }
          });
        }).on("error", function (t) {
          e.isPaused ? this.generatedError = t : e.error(t);
        }).on("end", function () {
          e.isPaused ? e._upstreamEnded = !0 : e.end();
        });
      }, s.prototype.pause = function () {
        return !!n.prototype.pause.call(this) && (this._stream.pause(), !0);
      }, s.prototype.resume = function () {
        return !!n.prototype.resume.call(this) && (this._upstreamEnded ? this.end() : this._stream.resume(), !0);
      }, e.exports = s;
    }, {
      "../stream/GenericWorker": 28,
      "../utils": 32
    }],
    13: [function (t, e, r) {
      "use strict";

      var n = t("readable-stream").Readable;

      function i(t, e, r) {
        n.call(this, e), this._helper = t;
        var i = this;
        t.on("data", function (t, e) {
          i.push(t) || i._helper.pause(), r && r(e);
        }).on("error", function (t) {
          i.emit("error", t);
        }).on("end", function () {
          i.push(null);
        });
      }

      t("../utils").inherits(i, n), i.prototype._read = function () {
        this._helper.resume();
      }, e.exports = i;
    }, {
      "../utils": 32,
      "readable-stream": 16
    }],
    14: [function (t, e, r) {
      "use strict";

      e.exports = {
        isNode: "undefined" != typeof Buffer,
        newBufferFrom: function (t, e) {
          if (Buffer.from && Buffer.from !== Uint8Array.from) return Buffer.from(t, e);
          if ("number" == typeof t) throw new Error('The "data" argument must not be a number');
          return new Buffer(t, e);
        },
        allocBuffer: function (t) {
          if (Buffer.alloc) return Buffer.alloc(t);
          var e = new Buffer(t);
          return e.fill(0), e;
        },
        isBuffer: function (t) {
          return Buffer.isBuffer(t);
        },
        isStream: function (t) {
          return t && "function" == typeof t.on && "function" == typeof t.pause && "function" == typeof t.resume;
        }
      };
    }, {}],
    15: [function (t, e, r) {
      "use strict";

      function s(t, e, r) {
        var i,
            n = u.getTypeOf(e),
            s = u.extend(r || {}, f);
        s.date = s.date || new Date(), null !== s.compression && (s.compression = s.compression.toUpperCase()), "string" == typeof s.unixPermissions && (s.unixPermissions = parseInt(s.unixPermissions, 8)), s.unixPermissions && 16384 & s.unixPermissions && (s.dir = !0), s.dosPermissions && 16 & s.dosPermissions && (s.dir = !0), s.dir && (t = g(t)), s.createFolders && (i = _(t)) && b.call(this, i, !0);
        var a = "string" === n && !1 === s.binary && !1 === s.base64;
        r && void 0 !== r.binary || (s.binary = !a), (e instanceof d && 0 === e.uncompressedSize || s.dir || !e || 0 === e.length) && (s.base64 = !1, s.binary = !0, e = "", s.compression = "STORE", n = "string");
        var o = null;
        o = e instanceof d || e instanceof l ? e : p.isNode && p.isStream(e) ? new m(t, e) : u.prepareContent(t, e, s.binary, s.optimizedBinaryString, s.base64);
        var h = new c(t, o, s);
        this.files[t] = h;
      }

      var n = t("./utf8"),
          u = t("./utils"),
          l = t("./stream/GenericWorker"),
          a = t("./stream/StreamHelper"),
          f = t("./defaults"),
          d = t("./compressedObject"),
          c = t("./zipObject"),
          o = t("./generate"),
          p = t("./nodejsUtils"),
          m = t("./nodejs/NodejsStreamInputAdapter"),
          _ = function (t) {
        "/" === t.slice(-1) && (t = t.substring(0, t.length - 1));
        var e = t.lastIndexOf("/");
        return 0 < e ? t.substring(0, e) : "";
      },
          g = function (t) {
        return "/" !== t.slice(-1) && (t += "/"), t;
      },
          b = function (t, e) {
        return e = void 0 !== e ? e : f.createFolders, t = g(t), this.files[t] || s.call(this, t, null, {
          dir: !0,
          createFolders: e
        }), this.files[t];
      };

      function h(t) {
        return "[object RegExp]" === Object.prototype.toString.call(t);
      }

      var i = {
        load: function () {
          throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
        },
        forEach: function (t) {
          var e, r, i;

          for (e in this.files) i = this.files[e], (r = e.slice(this.root.length, e.length)) && e.slice(0, this.root.length) === this.root && t(r, i);
        },
        filter: function (r) {
          var i = [];
          return this.forEach(function (t, e) {
            r(t, e) && i.push(e);
          }), i;
        },
        file: function (t, e, r) {
          if (1 !== arguments.length) return t = this.root + t, s.call(this, t, e, r), this;

          if (h(t)) {
            var i = t;
            return this.filter(function (t, e) {
              return !e.dir && i.test(t);
            });
          }

          var n = this.files[this.root + t];
          return n && !n.dir ? n : null;
        },
        folder: function (r) {
          if (!r) return this;
          if (h(r)) return this.filter(function (t, e) {
            return e.dir && r.test(t);
          });
          var t = this.root + r,
              e = b.call(this, t),
              i = this.clone();
          return i.root = e.name, i;
        },
        remove: function (r) {
          r = this.root + r;
          var t = this.files[r];
          if (t || ("/" !== r.slice(-1) && (r += "/"), t = this.files[r]), t && !t.dir) delete this.files[r];else for (var e = this.filter(function (t, e) {
            return e.name.slice(0, r.length) === r;
          }), i = 0; i < e.length; i++) delete this.files[e[i].name];
          return this;
        },
        generate: function (t) {
          throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
        },
        generateInternalStream: function (t) {
          var e,
              r = {};

          try {
            if ((r = u.extend(t || {}, {
              streamFiles: !1,
              compression: "STORE",
              compressionOptions: null,
              type: "",
              platform: "DOS",
              comment: null,
              mimeType: "application/zip",
              encodeFileName: n.utf8encode
            })).type = r.type.toLowerCase(), r.compression = r.compression.toUpperCase(), "binarystring" === r.type && (r.type = "string"), !r.type) throw new Error("No output type specified.");
            u.checkSupport(r.type), "darwin" !== r.platform && "freebsd" !== r.platform && "linux" !== r.platform && "sunos" !== r.platform || (r.platform = "UNIX"), "win32" === r.platform && (r.platform = "DOS");
            var i = r.comment || this.comment || "";
            e = o.generateWorker(this, r, i);
          } catch (t) {
            (e = new l("error")).error(t);
          }

          return new a(e, r.type || "string", r.mimeType);
        },
        generateAsync: function (t, e) {
          return this.generateInternalStream(t).accumulate(e);
        },
        generateNodeStream: function (t, e) {
          return (t = t || {}).type || (t.type = "nodebuffer"), this.generateInternalStream(t).toNodejsStream(e);
        }
      };
      e.exports = i;
    }, {
      "./compressedObject": 2,
      "./defaults": 5,
      "./generate": 9,
      "./nodejs/NodejsStreamInputAdapter": 12,
      "./nodejsUtils": 14,
      "./stream/GenericWorker": 28,
      "./stream/StreamHelper": 29,
      "./utf8": 31,
      "./utils": 32,
      "./zipObject": 35
    }],
    16: [function (t, e, r) {
      e.exports = t("stream");
    }, {
      stream: void 0
    }],
    17: [function (t, e, r) {
      "use strict";

      var i = t("./DataReader");

      function n(t) {
        i.call(this, t);

        for (var e = 0; e < this.data.length; e++) t[e] = 255 & t[e];
      }

      t("../utils").inherits(n, i), n.prototype.byteAt = function (t) {
        return this.data[this.zero + t];
      }, n.prototype.lastIndexOfSignature = function (t) {
        for (var e = t.charCodeAt(0), r = t.charCodeAt(1), i = t.charCodeAt(2), n = t.charCodeAt(3), s = this.length - 4; 0 <= s; --s) if (this.data[s] === e && this.data[s + 1] === r && this.data[s + 2] === i && this.data[s + 3] === n) return s - this.zero;

        return -1;
      }, n.prototype.readAndCheckSignature = function (t) {
        var e = t.charCodeAt(0),
            r = t.charCodeAt(1),
            i = t.charCodeAt(2),
            n = t.charCodeAt(3),
            s = this.readData(4);
        return e === s[0] && r === s[1] && i === s[2] && n === s[3];
      }, n.prototype.readData = function (t) {
        if (this.checkOffset(t), 0 === t) return [];
        var e = this.data.slice(this.zero + this.index, this.zero + this.index + t);
        return this.index += t, e;
      }, e.exports = n;
    }, {
      "../utils": 32,
      "./DataReader": 18
    }],
    18: [function (t, e, r) {
      "use strict";

      var i = t("../utils");

      function n(t) {
        this.data = t, this.length = t.length, this.index = 0, this.zero = 0;
      }

      n.prototype = {
        checkOffset: function (t) {
          this.checkIndex(this.index + t);
        },
        checkIndex: function (t) {
          if (this.length < this.zero + t || t < 0) throw new Error("End of data reached (data length = " + this.length + ", asked index = " + t + "). Corrupted zip ?");
        },
        setIndex: function (t) {
          this.checkIndex(t), this.index = t;
        },
        skip: function (t) {
          this.setIndex(this.index + t);
        },
        byteAt: function (t) {},
        readInt: function (t) {
          var e,
              r = 0;

          for (this.checkOffset(t), e = this.index + t - 1; e >= this.index; e--) r = (r << 8) + this.byteAt(e);

          return this.index += t, r;
        },
        readString: function (t) {
          return i.transformTo("string", this.readData(t));
        },
        readData: function (t) {},
        lastIndexOfSignature: function (t) {},
        readAndCheckSignature: function (t) {},
        readDate: function () {
          var t = this.readInt(4);
          return new Date(Date.UTC(1980 + (t >> 25 & 127), (t >> 21 & 15) - 1, t >> 16 & 31, t >> 11 & 31, t >> 5 & 63, (31 & t) << 1));
        }
      }, e.exports = n;
    }, {
      "../utils": 32
    }],
    19: [function (t, e, r) {
      "use strict";

      var i = t("./Uint8ArrayReader");

      function n(t) {
        i.call(this, t);
      }

      t("../utils").inherits(n, i), n.prototype.readData = function (t) {
        this.checkOffset(t);
        var e = this.data.slice(this.zero + this.index, this.zero + this.index + t);
        return this.index += t, e;
      }, e.exports = n;
    }, {
      "../utils": 32,
      "./Uint8ArrayReader": 21
    }],
    20: [function (t, e, r) {
      "use strict";

      var i = t("./DataReader");

      function n(t) {
        i.call(this, t);
      }

      t("../utils").inherits(n, i), n.prototype.byteAt = function (t) {
        return this.data.charCodeAt(this.zero + t);
      }, n.prototype.lastIndexOfSignature = function (t) {
        return this.data.lastIndexOf(t) - this.zero;
      }, n.prototype.readAndCheckSignature = function (t) {
        return t === this.readData(4);
      }, n.prototype.readData = function (t) {
        this.checkOffset(t);
        var e = this.data.slice(this.zero + this.index, this.zero + this.index + t);
        return this.index += t, e;
      }, e.exports = n;
    }, {
      "../utils": 32,
      "./DataReader": 18
    }],
    21: [function (t, e, r) {
      "use strict";

      var i = t("./ArrayReader");

      function n(t) {
        i.call(this, t);
      }

      t("../utils").inherits(n, i), n.prototype.readData = function (t) {
        if (this.checkOffset(t), 0 === t) return new Uint8Array(0);
        var e = this.data.subarray(this.zero + this.index, this.zero + this.index + t);
        return this.index += t, e;
      }, e.exports = n;
    }, {
      "../utils": 32,
      "./ArrayReader": 17
    }],
    22: [function (t, e, r) {
      "use strict";

      var i = t("../utils"),
          n = t("../support"),
          s = t("./ArrayReader"),
          a = t("./StringReader"),
          o = t("./NodeBufferReader"),
          h = t("./Uint8ArrayReader");

      e.exports = function (t) {
        var e = i.getTypeOf(t);
        return i.checkSupport(e), "string" !== e || n.uint8array ? "nodebuffer" === e ? new o(t) : n.uint8array ? new h(i.transformTo("uint8array", t)) : new s(i.transformTo("array", t)) : new a(t);
      };
    }, {
      "../support": 30,
      "../utils": 32,
      "./ArrayReader": 17,
      "./NodeBufferReader": 19,
      "./StringReader": 20,
      "./Uint8ArrayReader": 21
    }],
    23: [function (t, e, r) {
      "use strict";

      r.LOCAL_FILE_HEADER = "PK", r.CENTRAL_FILE_HEADER = "PK", r.CENTRAL_DIRECTORY_END = "PK", r.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK", r.ZIP64_CENTRAL_DIRECTORY_END = "PK", r.DATA_DESCRIPTOR = "PK\b";
    }, {}],
    24: [function (t, e, r) {
      "use strict";

      var i = t("./GenericWorker"),
          n = t("../utils");

      function s(t) {
        i.call(this, "ConvertWorker to " + t), this.destType = t;
      }

      n.inherits(s, i), s.prototype.processChunk = function (t) {
        this.push({
          data: n.transformTo(this.destType, t.data),
          meta: t.meta
        });
      }, e.exports = s;
    }, {
      "../utils": 32,
      "./GenericWorker": 28
    }],
    25: [function (t, e, r) {
      "use strict";

      var i = t("./GenericWorker"),
          n = t("../crc32");

      function s() {
        i.call(this, "Crc32Probe"), this.withStreamInfo("crc32", 0);
      }

      t("../utils").inherits(s, i), s.prototype.processChunk = function (t) {
        this.streamInfo.crc32 = n(t.data, this.streamInfo.crc32 || 0), this.push(t);
      }, e.exports = s;
    }, {
      "../crc32": 4,
      "../utils": 32,
      "./GenericWorker": 28
    }],
    26: [function (t, e, r) {
      "use strict";

      var i = t("../utils"),
          n = t("./GenericWorker");

      function s(t) {
        n.call(this, "DataLengthProbe for " + t), this.propName = t, this.withStreamInfo(t, 0);
      }

      i.inherits(s, n), s.prototype.processChunk = function (t) {
        if (t) {
          var e = this.streamInfo[this.propName] || 0;
          this.streamInfo[this.propName] = e + t.data.length;
        }

        n.prototype.processChunk.call(this, t);
      }, e.exports = s;
    }, {
      "../utils": 32,
      "./GenericWorker": 28
    }],
    27: [function (t, e, r) {
      "use strict";

      var i = t("../utils"),
          n = t("./GenericWorker");

      function s(t) {
        n.call(this, "DataWorker");
        var e = this;
        this.dataIsReady = !1, this.index = 0, this.max = 0, this.data = null, this.type = "", this._tickScheduled = !1, t.then(function (t) {
          e.dataIsReady = !0, e.data = t, e.max = t && t.length || 0, e.type = i.getTypeOf(t), e.isPaused || e._tickAndRepeat();
        }, function (t) {
          e.error(t);
        });
      }

      i.inherits(s, n), s.prototype.cleanUp = function () {
        n.prototype.cleanUp.call(this), this.data = null;
      }, s.prototype.resume = function () {
        return !!n.prototype.resume.call(this) && (!this._tickScheduled && this.dataIsReady && (this._tickScheduled = !0, i.delay(this._tickAndRepeat, [], this)), !0);
      }, s.prototype._tickAndRepeat = function () {
        this._tickScheduled = !1, this.isPaused || this.isFinished || (this._tick(), this.isFinished || (i.delay(this._tickAndRepeat, [], this), this._tickScheduled = !0));
      }, s.prototype._tick = function () {
        if (this.isPaused || this.isFinished) return !1;
        var t = null,
            e = Math.min(this.max, this.index + 16384);
        if (this.index >= this.max) return this.end();

        switch (this.type) {
          case "string":
            t = this.data.substring(this.index, e);
            break;

          case "uint8array":
            t = this.data.subarray(this.index, e);
            break;

          case "array":
          case "nodebuffer":
            t = this.data.slice(this.index, e);
        }

        return this.index = e, this.push({
          data: t,
          meta: {
            percent: this.max ? this.index / this.max * 100 : 0
          }
        });
      }, e.exports = s;
    }, {
      "../utils": 32,
      "./GenericWorker": 28
    }],
    28: [function (t, e, r) {
      "use strict";

      function i(t) {
        this.name = t || "default", this.streamInfo = {}, this.generatedError = null, this.extraStreamInfo = {}, this.isPaused = !0, this.isFinished = !1, this.isLocked = !1, this._listeners = {
          data: [],
          end: [],
          error: []
        }, this.previous = null;
      }

      i.prototype = {
        push: function (t) {
          this.emit("data", t);
        },
        end: function () {
          if (this.isFinished) return !1;
          this.flush();

          try {
            this.emit("end"), this.cleanUp(), this.isFinished = !0;
          } catch (t) {
            this.emit("error", t);
          }

          return !0;
        },
        error: function (t) {
          return !this.isFinished && (this.isPaused ? this.generatedError = t : (this.isFinished = !0, this.emit("error", t), this.previous && this.previous.error(t), this.cleanUp()), !0);
        },
        on: function (t, e) {
          return this._listeners[t].push(e), this;
        },
        cleanUp: function () {
          this.streamInfo = this.generatedError = this.extraStreamInfo = null, this._listeners = [];
        },
        emit: function (t, e) {
          if (this._listeners[t]) for (var r = 0; r < this._listeners[t].length; r++) this._listeners[t][r].call(this, e);
        },
        pipe: function (t) {
          return t.registerPrevious(this);
        },
        registerPrevious: function (t) {
          if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
          this.streamInfo = t.streamInfo, this.mergeStreamInfo(), this.previous = t;
          var e = this;
          return t.on("data", function (t) {
            e.processChunk(t);
          }), t.on("end", function () {
            e.end();
          }), t.on("error", function (t) {
            e.error(t);
          }), this;
        },
        pause: function () {
          return !this.isPaused && !this.isFinished && (this.isPaused = !0, this.previous && this.previous.pause(), !0);
        },
        resume: function () {
          if (!this.isPaused || this.isFinished) return !1;
          var t = this.isPaused = !1;
          return this.generatedError && (this.error(this.generatedError), t = !0), this.previous && this.previous.resume(), !t;
        },
        flush: function () {},
        processChunk: function (t) {
          this.push(t);
        },
        withStreamInfo: function (t, e) {
          return this.extraStreamInfo[t] = e, this.mergeStreamInfo(), this;
        },
        mergeStreamInfo: function () {
          for (var t in this.extraStreamInfo) this.extraStreamInfo.hasOwnProperty(t) && (this.streamInfo[t] = this.extraStreamInfo[t]);
        },
        lock: function () {
          if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
          this.isLocked = !0, this.previous && this.previous.lock();
        },
        toString: function () {
          var t = "Worker " + this.name;
          return this.previous ? this.previous + " -> " + t : t;
        }
      }, e.exports = i;
    }, {}],
    29: [function (t, e, r) {
      "use strict";

      var h = t("../utils"),
          n = t("./ConvertWorker"),
          s = t("./GenericWorker"),
          u = t("../base64"),
          i = t("../support"),
          a = t("../external"),
          o = null;
      if (i.nodestream) try {
        o = t("../nodejs/NodejsStreamOutputAdapter");
      } catch (t) {}

      function l(t, o) {
        return new a.Promise(function (e, r) {
          var i = [],
              n = t._internalType,
              s = t._outputType,
              a = t._mimeType;
          t.on("data", function (t, e) {
            i.push(t), o && o(e);
          }).on("error", function (t) {
            i = [], r(t);
          }).on("end", function () {
            try {
              var t = function (t, e, r) {
                switch (t) {
                  case "blob":
                    return h.newBlob(h.transformTo("arraybuffer", e), r);

                  case "base64":
                    return u.encode(e);

                  default:
                    return h.transformTo(t, e);
                }
              }(s, function (t, e) {
                var r,
                    i = 0,
                    n = null,
                    s = 0;

                for (r = 0; r < e.length; r++) s += e[r].length;

                switch (t) {
                  case "string":
                    return e.join("");

                  case "array":
                    return Array.prototype.concat.apply([], e);

                  case "uint8array":
                    for (n = new Uint8Array(s), r = 0; r < e.length; r++) n.set(e[r], i), i += e[r].length;

                    return n;

                  case "nodebuffer":
                    return Buffer.concat(e);

                  default:
                    throw new Error("concat : unsupported type '" + t + "'");
                }
              }(n, i), a);

              e(t);
            } catch (t) {
              r(t);
            }

            i = [];
          }).resume();
        });
      }

      function f(t, e, r) {
        var i = e;

        switch (e) {
          case "blob":
          case "arraybuffer":
            i = "uint8array";
            break;

          case "base64":
            i = "string";
        }

        try {
          this._internalType = i, this._outputType = e, this._mimeType = r, h.checkSupport(i), this._worker = t.pipe(new n(i)), t.lock();
        } catch (t) {
          this._worker = new s("error"), this._worker.error(t);
        }
      }

      f.prototype = {
        accumulate: function (t) {
          return l(this, t);
        },
        on: function (t, e) {
          var r = this;
          return "data" === t ? this._worker.on(t, function (t) {
            e.call(r, t.data, t.meta);
          }) : this._worker.on(t, function () {
            h.delay(e, arguments, r);
          }), this;
        },
        resume: function () {
          return h.delay(this._worker.resume, [], this._worker), this;
        },
        pause: function () {
          return this._worker.pause(), this;
        },
        toNodejsStream: function (t) {
          if (h.checkSupport("nodestream"), "nodebuffer" !== this._outputType) throw new Error(this._outputType + " is not supported by this method");
          return new o(this, {
            objectMode: "nodebuffer" !== this._outputType
          }, t);
        }
      }, e.exports = f;
    }, {
      "../base64": 1,
      "../external": 6,
      "../nodejs/NodejsStreamOutputAdapter": 13,
      "../support": 30,
      "../utils": 32,
      "./ConvertWorker": 24,
      "./GenericWorker": 28
    }],
    30: [function (t, e, r) {
      "use strict";

      if (r.base64 = !0, r.array = !0, r.string = !0, r.arraybuffer = "undefined" != typeof ArrayBuffer && "undefined" != typeof Uint8Array, r.nodebuffer = "undefined" != typeof Buffer, r.uint8array = "undefined" != typeof Uint8Array, "undefined" == typeof ArrayBuffer) r.blob = !1;else {
        var i = new ArrayBuffer(0);

        try {
          r.blob = 0 === new Blob([i], {
            type: "application/zip"
          }).size;
        } catch (t) {
          try {
            var n = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
            n.append(i), r.blob = 0 === n.getBlob("application/zip").size;
          } catch (t) {
            r.blob = !1;
          }
        }
      }

      try {
        r.nodestream = !!t("readable-stream").Readable;
      } catch (t) {
        r.nodestream = !1;
      }
    }, {
      "readable-stream": 16
    }],
    31: [function (t, e, s) {
      "use strict";

      for (var o = t("./utils"), h = t("./support"), r = t("./nodejsUtils"), i = t("./stream/GenericWorker"), u = new Array(256), n = 0; n < 256; n++) u[n] = 252 <= n ? 6 : 248 <= n ? 5 : 240 <= n ? 4 : 224 <= n ? 3 : 192 <= n ? 2 : 1;

      u[254] = u[254] = 1;

      function a() {
        i.call(this, "utf-8 decode"), this.leftOver = null;
      }

      function l() {
        i.call(this, "utf-8 encode");
      }

      s.utf8encode = function (t) {
        return h.nodebuffer ? r.newBufferFrom(t, "utf-8") : function (t) {
          var e,
              r,
              i,
              n,
              s,
              a = t.length,
              o = 0;

          for (n = 0; n < a; n++) 55296 == (64512 & (r = t.charCodeAt(n))) && n + 1 < a && 56320 == (64512 & (i = t.charCodeAt(n + 1))) && (r = 65536 + (r - 55296 << 10) + (i - 56320), n++), o += r < 128 ? 1 : r < 2048 ? 2 : r < 65536 ? 3 : 4;

          for (e = h.uint8array ? new Uint8Array(o) : new Array(o), n = s = 0; s < o; n++) 55296 == (64512 & (r = t.charCodeAt(n))) && n + 1 < a && 56320 == (64512 & (i = t.charCodeAt(n + 1))) && (r = 65536 + (r - 55296 << 10) + (i - 56320), n++), r < 128 ? e[s++] = r : (r < 2048 ? e[s++] = 192 | r >>> 6 : (r < 65536 ? e[s++] = 224 | r >>> 12 : (e[s++] = 240 | r >>> 18, e[s++] = 128 | r >>> 12 & 63), e[s++] = 128 | r >>> 6 & 63), e[s++] = 128 | 63 & r);

          return e;
        }(t);
      }, s.utf8decode = function (t) {
        return h.nodebuffer ? o.transformTo("nodebuffer", t).toString("utf-8") : function (t) {
          var e,
              r,
              i,
              n,
              s = t.length,
              a = new Array(2 * s);

          for (e = r = 0; e < s;) if ((i = t[e++]) < 128) a[r++] = i;else if (4 < (n = u[i])) a[r++] = 65533, e += n - 1;else {
            for (i &= 2 === n ? 31 : 3 === n ? 15 : 7; 1 < n && e < s;) i = i << 6 | 63 & t[e++], n--;

            1 < n ? a[r++] = 65533 : i < 65536 ? a[r++] = i : (i -= 65536, a[r++] = 55296 | i >> 10 & 1023, a[r++] = 56320 | 1023 & i);
          }

          return a.length !== r && (a.subarray ? a = a.subarray(0, r) : a.length = r), o.applyFromCharCode(a);
        }(t = o.transformTo(h.uint8array ? "uint8array" : "array", t));
      }, o.inherits(a, i), a.prototype.processChunk = function (t) {
        var e = o.transformTo(h.uint8array ? "uint8array" : "array", t.data);

        if (this.leftOver && this.leftOver.length) {
          if (h.uint8array) {
            var r = e;
            (e = new Uint8Array(r.length + this.leftOver.length)).set(this.leftOver, 0), e.set(r, this.leftOver.length);
          } else e = this.leftOver.concat(e);

          this.leftOver = null;
        }

        var i = function (t, e) {
          var r;

          for ((e = e || t.length) > t.length && (e = t.length), r = e - 1; 0 <= r && 128 == (192 & t[r]);) r--;

          return r < 0 ? e : 0 === r ? e : r + u[t[r]] > e ? r : e;
        }(e),
            n = e;

        i !== e.length && (h.uint8array ? (n = e.subarray(0, i), this.leftOver = e.subarray(i, e.length)) : (n = e.slice(0, i), this.leftOver = e.slice(i, e.length))), this.push({
          data: s.utf8decode(n),
          meta: t.meta
        });
      }, a.prototype.flush = function () {
        this.leftOver && this.leftOver.length && (this.push({
          data: s.utf8decode(this.leftOver),
          meta: {}
        }), this.leftOver = null);
      }, s.Utf8DecodeWorker = a, o.inherits(l, i), l.prototype.processChunk = function (t) {
        this.push({
          data: s.utf8encode(t.data),
          meta: t.meta
        });
      }, s.Utf8EncodeWorker = l;
    }, {
      "./nodejsUtils": 14,
      "./stream/GenericWorker": 28,
      "./support": 30,
      "./utils": 32
    }],
    32: [function (t, e, a) {
      "use strict";

      var o = t("./support"),
          h = t("./base64"),
          r = t("./nodejsUtils"),
          i = t("set-immediate-shim"),
          u = t("./external");

      function n(t) {
        return t;
      }

      function l(t, e) {
        for (var r = 0; r < t.length; ++r) e[r] = 255 & t.charCodeAt(r);

        return e;
      }

      a.newBlob = function (e, r) {
        a.checkSupport("blob");

        try {
          return new Blob([e], {
            type: r
          });
        } catch (t) {
          try {
            var i = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
            return i.append(e), i.getBlob(r);
          } catch (t) {
            throw new Error("Bug : can't construct the Blob.");
          }
        }
      };

      var s = {
        stringifyByChunk: function (t, e, r) {
          var i = [],
              n = 0,
              s = t.length;
          if (s <= r) return String.fromCharCode.apply(null, t);

          for (; n < s;) "array" === e || "nodebuffer" === e ? i.push(String.fromCharCode.apply(null, t.slice(n, Math.min(n + r, s)))) : i.push(String.fromCharCode.apply(null, t.subarray(n, Math.min(n + r, s)))), n += r;

          return i.join("");
        },
        stringifyByChar: function (t) {
          for (var e = "", r = 0; r < t.length; r++) e += String.fromCharCode(t[r]);

          return e;
        },
        applyCanBeUsed: {
          uint8array: function () {
            try {
              return o.uint8array && 1 === String.fromCharCode.apply(null, new Uint8Array(1)).length;
            } catch (t) {
              return !1;
            }
          }(),
          nodebuffer: function () {
            try {
              return o.nodebuffer && 1 === String.fromCharCode.apply(null, r.allocBuffer(1)).length;
            } catch (t) {
              return !1;
            }
          }()
        }
      };

      function f(t) {
        var e = 65536,
            r = a.getTypeOf(t),
            i = !0;
        if ("uint8array" === r ? i = s.applyCanBeUsed.uint8array : "nodebuffer" === r && (i = s.applyCanBeUsed.nodebuffer), i) for (; 1 < e;) try {
          return s.stringifyByChunk(t, r, e);
        } catch (t) {
          e = Math.floor(e / 2);
        }
        return s.stringifyByChar(t);
      }

      function d(t, e) {
        for (var r = 0; r < t.length; r++) e[r] = t[r];

        return e;
      }

      a.applyFromCharCode = f;
      var c = {};
      c.string = {
        string: n,
        array: function (t) {
          return l(t, new Array(t.length));
        },
        arraybuffer: function (t) {
          return c.string.uint8array(t).buffer;
        },
        uint8array: function (t) {
          return l(t, new Uint8Array(t.length));
        },
        nodebuffer: function (t) {
          return l(t, r.allocBuffer(t.length));
        }
      }, c.array = {
        string: f,
        array: n,
        arraybuffer: function (t) {
          return new Uint8Array(t).buffer;
        },
        uint8array: function (t) {
          return new Uint8Array(t);
        },
        nodebuffer: function (t) {
          return r.newBufferFrom(t);
        }
      }, c.arraybuffer = {
        string: function (t) {
          return f(new Uint8Array(t));
        },
        array: function (t) {
          return d(new Uint8Array(t), new Array(t.byteLength));
        },
        arraybuffer: n,
        uint8array: function (t) {
          return new Uint8Array(t);
        },
        nodebuffer: function (t) {
          return r.newBufferFrom(new Uint8Array(t));
        }
      }, c.uint8array = {
        string: f,
        array: function (t) {
          return d(t, new Array(t.length));
        },
        arraybuffer: function (t) {
          return t.buffer;
        },
        uint8array: n,
        nodebuffer: function (t) {
          return r.newBufferFrom(t);
        }
      }, c.nodebuffer = {
        string: f,
        array: function (t) {
          return d(t, new Array(t.length));
        },
        arraybuffer: function (t) {
          return c.nodebuffer.uint8array(t).buffer;
        },
        uint8array: function (t) {
          return d(t, new Uint8Array(t.length));
        },
        nodebuffer: n
      }, a.transformTo = function (t, e) {
        if (e = e || "", !t) return e;
        a.checkSupport(t);
        var r = a.getTypeOf(e);
        return c[r][t](e);
      }, a.getTypeOf = function (t) {
        return "string" == typeof t ? "string" : "[object Array]" === Object.prototype.toString.call(t) ? "array" : o.nodebuffer && r.isBuffer(t) ? "nodebuffer" : o.uint8array && t instanceof Uint8Array ? "uint8array" : o.arraybuffer && t instanceof ArrayBuffer ? "arraybuffer" : void 0;
      }, a.checkSupport = function (t) {
        if (!o[t.toLowerCase()]) throw new Error(t + " is not supported by this platform");
      }, a.MAX_VALUE_16BITS = 65535, a.MAX_VALUE_32BITS = -1, a.pretty = function (t) {
        var e,
            r,
            i = "";

        for (r = 0; r < (t || "").length; r++) i += "\\x" + ((e = t.charCodeAt(r)) < 16 ? "0" : "") + e.toString(16).toUpperCase();

        return i;
      }, a.delay = function (t, e, r) {
        i(function () {
          t.apply(r || null, e || []);
        });
      }, a.inherits = function (t, e) {
        function r() {}

        r.prototype = e.prototype, t.prototype = new r();
      }, a.extend = function () {
        var t,
            e,
            r = {};

        for (t = 0; t < arguments.length; t++) for (e in arguments[t]) arguments[t].hasOwnProperty(e) && void 0 === r[e] && (r[e] = arguments[t][e]);

        return r;
      }, a.prepareContent = function (r, t, i, n, s) {
        return u.Promise.resolve(t).then(function (i) {
          return o.blob && (i instanceof Blob || -1 !== ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(i))) && "undefined" != typeof FileReader ? new u.Promise(function (e, r) {
            var t = new FileReader();
            t.onload = function (t) {
              e(t.target.result);
            }, t.onerror = function (t) {
              r(t.target.error);
            }, t.readAsArrayBuffer(i);
          }) : i;
        }).then(function (t) {
          var e = a.getTypeOf(t);
          return e ? ("arraybuffer" === e ? t = a.transformTo("uint8array", t) : "string" === e && (s ? t = h.decode(t) : i && !0 !== n && (t = function (t) {
            return l(t, o.uint8array ? new Uint8Array(t.length) : new Array(t.length));
          }(t))), t) : u.Promise.reject(new Error("Can't read the data of '" + r + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"));
        });
      };
    }, {
      "./base64": 1,
      "./external": 6,
      "./nodejsUtils": 14,
      "./support": 30,
      "set-immediate-shim": 54
    }],
    33: [function (t, e, r) {
      "use strict";

      var i = t("./reader/readerFor"),
          n = t("./utils"),
          s = t("./signature"),
          a = t("./zipEntry"),
          o = (t("./utf8"), t("./support"));

      function h(t) {
        this.files = [], this.loadOptions = t;
      }

      h.prototype = {
        checkSignature: function (t) {
          if (!this.reader.readAndCheckSignature(t)) {
            this.reader.index -= 4;
            var e = this.reader.readString(4);
            throw new Error("Corrupted zip or bug: unexpected signature (" + n.pretty(e) + ", expected " + n.pretty(t) + ")");
          }
        },
        isSignature: function (t, e) {
          var r = this.reader.index;
          this.reader.setIndex(t);
          var i = this.reader.readString(4) === e;
          return this.reader.setIndex(r), i;
        },
        readBlockEndOfCentral: function () {
          this.diskNumber = this.reader.readInt(2), this.diskWithCentralDirStart = this.reader.readInt(2), this.centralDirRecordsOnThisDisk = this.reader.readInt(2), this.centralDirRecords = this.reader.readInt(2), this.centralDirSize = this.reader.readInt(4), this.centralDirOffset = this.reader.readInt(4), this.zipCommentLength = this.reader.readInt(2);
          var t = this.reader.readData(this.zipCommentLength),
              e = o.uint8array ? "uint8array" : "array",
              r = n.transformTo(e, t);
          this.zipComment = this.loadOptions.decodeFileName(r);
        },
        readBlockZip64EndOfCentral: function () {
          this.zip64EndOfCentralSize = this.reader.readInt(8), this.reader.skip(4), this.diskNumber = this.reader.readInt(4), this.diskWithCentralDirStart = this.reader.readInt(4), this.centralDirRecordsOnThisDisk = this.reader.readInt(8), this.centralDirRecords = this.reader.readInt(8), this.centralDirSize = this.reader.readInt(8), this.centralDirOffset = this.reader.readInt(8), this.zip64ExtensibleData = {};

          for (var t, e, r, i = this.zip64EndOfCentralSize - 44; 0 < i;) t = this.reader.readInt(2), e = this.reader.readInt(4), r = this.reader.readData(e), this.zip64ExtensibleData[t] = {
            id: t,
            length: e,
            value: r
          };
        },
        readBlockZip64EndOfCentralLocator: function () {
          if (this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), 1 < this.disksCount) throw new Error("Multi-volumes zip are not supported");
        },
        readLocalFiles: function () {
          var t, e;

          for (t = 0; t < this.files.length; t++) e = this.files[t], this.reader.setIndex(e.localHeaderOffset), this.checkSignature(s.LOCAL_FILE_HEADER), e.readLocalPart(this.reader), e.handleUTF8(), e.processAttributes();
        },
        readCentralDir: function () {
          var t;

          for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(s.CENTRAL_FILE_HEADER);) (t = new a({
            zip64: this.zip64
          }, this.loadOptions)).readCentralPart(this.reader), this.files.push(t);

          if (this.centralDirRecords !== this.files.length && 0 !== this.centralDirRecords && 0 === this.files.length) throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
        },
        readEndOfCentral: function () {
          var t = this.reader.lastIndexOfSignature(s.CENTRAL_DIRECTORY_END);
          if (t < 0) throw !this.isSignature(0, s.LOCAL_FILE_HEADER) ? new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html") : new Error("Corrupted zip: can't find end of central directory");
          this.reader.setIndex(t);
          var e = t;

          if (this.checkSignature(s.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === n.MAX_VALUE_16BITS || this.diskWithCentralDirStart === n.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === n.MAX_VALUE_16BITS || this.centralDirRecords === n.MAX_VALUE_16BITS || this.centralDirSize === n.MAX_VALUE_32BITS || this.centralDirOffset === n.MAX_VALUE_32BITS) {
            if (this.zip64 = !0, (t = this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR)) < 0) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
            if (this.reader.setIndex(t), this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, s.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_END), this.relativeOffsetEndOfZip64CentralDir < 0)) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
            this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral();
          }

          var r = this.centralDirOffset + this.centralDirSize;
          this.zip64 && (r += 20, r += 12 + this.zip64EndOfCentralSize);
          var i = e - r;
          if (0 < i) this.isSignature(e, s.CENTRAL_FILE_HEADER) || (this.reader.zero = i);else if (i < 0) throw new Error("Corrupted zip: missing " + Math.abs(i) + " bytes.");
        },
        prepareReader: function (t) {
          this.reader = i(t);
        },
        load: function (t) {
          this.prepareReader(t), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles();
        }
      }, e.exports = h;
    }, {
      "./reader/readerFor": 22,
      "./signature": 23,
      "./support": 30,
      "./utf8": 31,
      "./utils": 32,
      "./zipEntry": 34
    }],
    34: [function (t, e, r) {
      "use strict";

      var i = t("./reader/readerFor"),
          s = t("./utils"),
          n = t("./compressedObject"),
          a = t("./crc32"),
          o = t("./utf8"),
          h = t("./compressions"),
          u = t("./support");

      function l(t, e) {
        this.options = t, this.loadOptions = e;
      }

      l.prototype = {
        isEncrypted: function () {
          return 1 == (1 & this.bitFlag);
        },
        useUTF8: function () {
          return 2048 == (2048 & this.bitFlag);
        },
        readLocalPart: function (t) {
          var e, r;
          if (t.skip(22), this.fileNameLength = t.readInt(2), r = t.readInt(2), this.fileName = t.readData(this.fileNameLength), t.skip(r), -1 === this.compressedSize || -1 === this.uncompressedSize) throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
          if (null === (e = function (t) {
            for (var e in h) if (h.hasOwnProperty(e) && h[e].magic === t) return h[e];

            return null;
          }(this.compressionMethod))) throw new Error("Corrupted zip : compression " + s.pretty(this.compressionMethod) + " unknown (inner file : " + s.transformTo("string", this.fileName) + ")");
          this.decompressed = new n(this.compressedSize, this.uncompressedSize, this.crc32, e, t.readData(this.compressedSize));
        },
        readCentralPart: function (t) {
          this.versionMadeBy = t.readInt(2), t.skip(2), this.bitFlag = t.readInt(2), this.compressionMethod = t.readString(2), this.date = t.readDate(), this.crc32 = t.readInt(4), this.compressedSize = t.readInt(4), this.uncompressedSize = t.readInt(4);
          var e = t.readInt(2);
          if (this.extraFieldsLength = t.readInt(2), this.fileCommentLength = t.readInt(2), this.diskNumberStart = t.readInt(2), this.internalFileAttributes = t.readInt(2), this.externalFileAttributes = t.readInt(4), this.localHeaderOffset = t.readInt(4), this.isEncrypted()) throw new Error("Encrypted zip are not supported");
          t.skip(e), this.readExtraFields(t), this.parseZIP64ExtraField(t), this.fileComment = t.readData(this.fileCommentLength);
        },
        processAttributes: function () {
          this.unixPermissions = null, this.dosPermissions = null;
          var t = this.versionMadeBy >> 8;
          this.dir = !!(16 & this.externalFileAttributes), 0 == t && (this.dosPermissions = 63 & this.externalFileAttributes), 3 == t && (this.unixPermissions = this.externalFileAttributes >> 16 & 65535), this.dir || "/" !== this.fileNameStr.slice(-1) || (this.dir = !0);
        },
        parseZIP64ExtraField: function (t) {
          if (this.extraFields[1]) {
            var e = i(this.extraFields[1].value);
            this.uncompressedSize === s.MAX_VALUE_32BITS && (this.uncompressedSize = e.readInt(8)), this.compressedSize === s.MAX_VALUE_32BITS && (this.compressedSize = e.readInt(8)), this.localHeaderOffset === s.MAX_VALUE_32BITS && (this.localHeaderOffset = e.readInt(8)), this.diskNumberStart === s.MAX_VALUE_32BITS && (this.diskNumberStart = e.readInt(4));
          }
        },
        readExtraFields: function (t) {
          var e,
              r,
              i,
              n = t.index + this.extraFieldsLength;

          for (this.extraFields || (this.extraFields = {}); t.index + 4 < n;) e = t.readInt(2), r = t.readInt(2), i = t.readData(r), this.extraFields[e] = {
            id: e,
            length: r,
            value: i
          };

          t.setIndex(n);
        },
        handleUTF8: function () {
          var t = u.uint8array ? "uint8array" : "array";
          if (this.useUTF8()) this.fileNameStr = o.utf8decode(this.fileName), this.fileCommentStr = o.utf8decode(this.fileComment);else {
            var e = this.findExtraFieldUnicodePath();
            if (null !== e) this.fileNameStr = e;else {
              var r = s.transformTo(t, this.fileName);
              this.fileNameStr = this.loadOptions.decodeFileName(r);
            }
            var i = this.findExtraFieldUnicodeComment();
            if (null !== i) this.fileCommentStr = i;else {
              var n = s.transformTo(t, this.fileComment);
              this.fileCommentStr = this.loadOptions.decodeFileName(n);
            }
          }
        },
        findExtraFieldUnicodePath: function () {
          var t = this.extraFields[28789];

          if (t) {
            var e = i(t.value);
            return 1 !== e.readInt(1) ? null : a(this.fileName) !== e.readInt(4) ? null : o.utf8decode(e.readData(t.length - 5));
          }

          return null;
        },
        findExtraFieldUnicodeComment: function () {
          var t = this.extraFields[25461];

          if (t) {
            var e = i(t.value);
            return 1 !== e.readInt(1) ? null : a(this.fileComment) !== e.readInt(4) ? null : o.utf8decode(e.readData(t.length - 5));
          }

          return null;
        }
      }, e.exports = l;
    }, {
      "./compressedObject": 2,
      "./compressions": 3,
      "./crc32": 4,
      "./reader/readerFor": 22,
      "./support": 30,
      "./utf8": 31,
      "./utils": 32
    }],
    35: [function (t, e, r) {
      "use strict";

      function i(t, e, r) {
        this.name = t, this.dir = r.dir, this.date = r.date, this.comment = r.comment, this.unixPermissions = r.unixPermissions, this.dosPermissions = r.dosPermissions, this._data = e, this._dataBinary = r.binary, this.options = {
          compression: r.compression,
          compressionOptions: r.compressionOptions
        };
      }

      var s = t("./stream/StreamHelper"),
          n = t("./stream/DataWorker"),
          a = t("./utf8"),
          o = t("./compressedObject"),
          h = t("./stream/GenericWorker");
      i.prototype = {
        internalStream: function (t) {
          var e = null,
              r = "string";

          try {
            if (!t) throw new Error("No output type specified.");
            var i = "string" === (r = t.toLowerCase()) || "text" === r;
            "binarystring" !== r && "text" !== r || (r = "string"), e = this._decompressWorker();
            var n = !this._dataBinary;
            n && !i && (e = e.pipe(new a.Utf8EncodeWorker())), !n && i && (e = e.pipe(new a.Utf8DecodeWorker()));
          } catch (t) {
            (e = new h("error")).error(t);
          }

          return new s(e, r, "");
        },
        async: function (t, e) {
          return this.internalStream(t).accumulate(e);
        },
        nodeStream: function (t, e) {
          return this.internalStream(t || "nodebuffer").toNodejsStream(e);
        },
        _compressWorker: function (t, e) {
          if (this._data instanceof o && this._data.compression.magic === t.magic) return this._data.getCompressedWorker();

          var r = this._decompressWorker();

          return this._dataBinary || (r = r.pipe(new a.Utf8EncodeWorker())), o.createWorkerFrom(r, t, e);
        },
        _decompressWorker: function () {
          return this._data instanceof o ? this._data.getContentWorker() : this._data instanceof h ? this._data : new n(this._data);
        }
      };

      for (var u = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"], l = function () {
        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
      }, f = 0; f < u.length; f++) i.prototype[u[f]] = l;

      e.exports = i;
    }, {
      "./compressedObject": 2,
      "./stream/DataWorker": 27,
      "./stream/GenericWorker": 28,
      "./stream/StreamHelper": 29,
      "./utf8": 31
    }],
    36: [function (t, l, e) {
      (function (e) {
        "use strict";

        var r,
            i,
            t = e.MutationObserver || e.WebKitMutationObserver;

        if (t) {
          var n = 0,
              s = new t(u),
              a = e.document.createTextNode("");
          s.observe(a, {
            characterData: !0
          }), r = function () {
            a.data = n = ++n % 2;
          };
        } else if (e.setImmediate || void 0 === e.MessageChannel) r = "document" in e && "onreadystatechange" in e.document.createElement("script") ? function () {
          var t = e.document.createElement("script");
          t.onreadystatechange = function () {
            u(), t.onreadystatechange = null, t.parentNode.removeChild(t), t = null;
          }, e.document.documentElement.appendChild(t);
        } : function () {
          setTimeout(u, 0);
        };else {
          var o = new e.MessageChannel();
          o.port1.onmessage = u, r = function () {
            o.port2.postMessage(0);
          };
        }

        var h = [];

        function u() {
          var t, e;
          i = !0;

          for (var r = h.length; r;) {
            for (e = h, h = [], t = -1; ++t < r;) e[t]();

            r = h.length;
          }

          i = !1;
        }

        l.exports = function (t) {
          1 !== h.push(t) || i || r();
        };
      }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    }, {}],
    37: [function (t, e, r) {
      "use strict";

      var n = t("immediate");

      function u() {}

      var l = {},
          s = ["REJECTED"],
          a = ["FULFILLED"],
          i = ["PENDING"];

      function o(t) {
        if ("function" != typeof t) throw new TypeError("resolver must be a function");
        this.state = i, this.queue = [], this.outcome = void 0, t !== u && c(this, t);
      }

      function h(t, e, r) {
        this.promise = t, "function" == typeof e && (this.onFulfilled = e, this.callFulfilled = this.otherCallFulfilled), "function" == typeof r && (this.onRejected = r, this.callRejected = this.otherCallRejected);
      }

      function f(e, r, i) {
        n(function () {
          var t;

          try {
            t = r(i);
          } catch (t) {
            return l.reject(e, t);
          }

          t === e ? l.reject(e, new TypeError("Cannot resolve promise with itself")) : l.resolve(e, t);
        });
      }

      function d(t) {
        var e = t && t.then;
        if (t && ("object" == typeof t || "function" == typeof t) && "function" == typeof e) return function () {
          e.apply(t, arguments);
        };
      }

      function c(e, t) {
        var r = !1;

        function i(t) {
          r || (r = !0, l.reject(e, t));
        }

        function n(t) {
          r || (r = !0, l.resolve(e, t));
        }

        var s = p(function () {
          t(n, i);
        });
        "error" === s.status && i(s.value);
      }

      function p(t, e) {
        var r = {};

        try {
          r.value = t(e), r.status = "success";
        } catch (t) {
          r.status = "error", r.value = t;
        }

        return r;
      }

      (e.exports = o).prototype.finally = function (e) {
        if ("function" != typeof e) return this;
        var r = this.constructor;
        return this.then(function (t) {
          return r.resolve(e()).then(function () {
            return t;
          });
        }, function (t) {
          return r.resolve(e()).then(function () {
            throw t;
          });
        });
      }, o.prototype.catch = function (t) {
        return this.then(null, t);
      }, o.prototype.then = function (t, e) {
        if ("function" != typeof t && this.state === a || "function" != typeof e && this.state === s) return this;
        var r = new this.constructor(u);
        this.state !== i ? f(r, this.state === a ? t : e, this.outcome) : this.queue.push(new h(r, t, e));
        return r;
      }, h.prototype.callFulfilled = function (t) {
        l.resolve(this.promise, t);
      }, h.prototype.otherCallFulfilled = function (t) {
        f(this.promise, this.onFulfilled, t);
      }, h.prototype.callRejected = function (t) {
        l.reject(this.promise, t);
      }, h.prototype.otherCallRejected = function (t) {
        f(this.promise, this.onRejected, t);
      }, l.resolve = function (t, e) {
        var r = p(d, e);
        if ("error" === r.status) return l.reject(t, r.value);
        var i = r.value;
        if (i) c(t, i);else {
          t.state = a, t.outcome = e;

          for (var n = -1, s = t.queue.length; ++n < s;) t.queue[n].callFulfilled(e);
        }
        return t;
      }, l.reject = function (t, e) {
        t.state = s, t.outcome = e;

        for (var r = -1, i = t.queue.length; ++r < i;) t.queue[r].callRejected(e);

        return t;
      }, o.resolve = function (t) {
        if (t instanceof this) return t;
        return l.resolve(new this(u), t);
      }, o.reject = function (t) {
        var e = new this(u);
        return l.reject(e, t);
      }, o.all = function (t) {
        var r = this;
        if ("[object Array]" !== Object.prototype.toString.call(t)) return this.reject(new TypeError("must be an array"));
        var i = t.length,
            n = !1;
        if (!i) return this.resolve([]);
        var s = new Array(i),
            a = 0,
            e = -1,
            o = new this(u);

        for (; ++e < i;) h(t[e], e);

        return o;

        function h(t, e) {
          r.resolve(t).then(function (t) {
            s[e] = t, ++a !== i || n || (n = !0, l.resolve(o, s));
          }, function (t) {
            n || (n = !0, l.reject(o, t));
          });
        }
      }, o.race = function (t) {
        var e = this;
        if ("[object Array]" !== Object.prototype.toString.call(t)) return this.reject(new TypeError("must be an array"));
        var r = t.length,
            i = !1;
        if (!r) return this.resolve([]);
        var n = -1,
            s = new this(u);

        for (; ++n < r;) a = t[n], e.resolve(a).then(function (t) {
          i || (i = !0, l.resolve(s, t));
        }, function (t) {
          i || (i = !0, l.reject(s, t));
        });

        var a;
        return s;
      };
    }, {
      immediate: 36
    }],
    38: [function (t, e, r) {
      "use strict";

      var i = {};
      (0, t("./lib/utils/common").assign)(i, t("./lib/deflate"), t("./lib/inflate"), t("./lib/zlib/constants")), e.exports = i;
    }, {
      "./lib/deflate": 39,
      "./lib/inflate": 40,
      "./lib/utils/common": 41,
      "./lib/zlib/constants": 44
    }],
    39: [function (t, e, r) {
      "use strict";

      var a = t("./zlib/deflate"),
          o = t("./utils/common"),
          h = t("./utils/strings"),
          n = t("./zlib/messages"),
          s = t("./zlib/zstream"),
          u = Object.prototype.toString,
          l = 0,
          f = -1,
          d = 0,
          c = 8;

      function p(t) {
        if (!(this instanceof p)) return new p(t);
        this.options = o.assign({
          level: f,
          method: c,
          chunkSize: 16384,
          windowBits: 15,
          memLevel: 8,
          strategy: d,
          to: ""
        }, t || {});
        var e = this.options;
        e.raw && 0 < e.windowBits ? e.windowBits = -e.windowBits : e.gzip && 0 < e.windowBits && e.windowBits < 16 && (e.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new s(), this.strm.avail_out = 0;
        var r = a.deflateInit2(this.strm, e.level, e.method, e.windowBits, e.memLevel, e.strategy);
        if (r !== l) throw new Error(n[r]);

        if (e.header && a.deflateSetHeader(this.strm, e.header), e.dictionary) {
          var i;
          if (i = "string" == typeof e.dictionary ? h.string2buf(e.dictionary) : "[object ArrayBuffer]" === u.call(e.dictionary) ? new Uint8Array(e.dictionary) : e.dictionary, (r = a.deflateSetDictionary(this.strm, i)) !== l) throw new Error(n[r]);
          this._dict_set = !0;
        }
      }

      function i(t, e) {
        var r = new p(e);
        if (r.push(t, !0), r.err) throw r.msg || n[r.err];
        return r.result;
      }

      p.prototype.push = function (t, e) {
        var r,
            i,
            n = this.strm,
            s = this.options.chunkSize;
        if (this.ended) return !1;
        i = e === ~~e ? e : !0 === e ? 4 : 0, "string" == typeof t ? n.input = h.string2buf(t) : "[object ArrayBuffer]" === u.call(t) ? n.input = new Uint8Array(t) : n.input = t, n.next_in = 0, n.avail_in = n.input.length;

        do {
          if (0 === n.avail_out && (n.output = new o.Buf8(s), n.next_out = 0, n.avail_out = s), 1 !== (r = a.deflate(n, i)) && r !== l) return this.onEnd(r), !(this.ended = !0);
          0 !== n.avail_out && (0 !== n.avail_in || 4 !== i && 2 !== i) || ("string" === this.options.to ? this.onData(h.buf2binstring(o.shrinkBuf(n.output, n.next_out))) : this.onData(o.shrinkBuf(n.output, n.next_out)));
        } while ((0 < n.avail_in || 0 === n.avail_out) && 1 !== r);

        return 4 === i ? (r = a.deflateEnd(this.strm), this.onEnd(r), this.ended = !0, r === l) : 2 !== i || (this.onEnd(l), !(n.avail_out = 0));
      }, p.prototype.onData = function (t) {
        this.chunks.push(t);
      }, p.prototype.onEnd = function (t) {
        t === l && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = o.flattenChunks(this.chunks)), this.chunks = [], this.err = t, this.msg = this.strm.msg;
      }, r.Deflate = p, r.deflate = i, r.deflateRaw = function (t, e) {
        return (e = e || {}).raw = !0, i(t, e);
      }, r.gzip = function (t, e) {
        return (e = e || {}).gzip = !0, i(t, e);
      };
    }, {
      "./utils/common": 41,
      "./utils/strings": 42,
      "./zlib/deflate": 46,
      "./zlib/messages": 51,
      "./zlib/zstream": 53
    }],
    40: [function (t, e, r) {
      "use strict";

      var d = t("./zlib/inflate"),
          c = t("./utils/common"),
          p = t("./utils/strings"),
          m = t("./zlib/constants"),
          i = t("./zlib/messages"),
          n = t("./zlib/zstream"),
          s = t("./zlib/gzheader"),
          _ = Object.prototype.toString;

      function a(t) {
        if (!(this instanceof a)) return new a(t);
        this.options = c.assign({
          chunkSize: 16384,
          windowBits: 0,
          to: ""
        }, t || {});
        var e = this.options;
        e.raw && 0 <= e.windowBits && e.windowBits < 16 && (e.windowBits = -e.windowBits, 0 === e.windowBits && (e.windowBits = -15)), !(0 <= e.windowBits && e.windowBits < 16) || t && t.windowBits || (e.windowBits += 32), 15 < e.windowBits && e.windowBits < 48 && 0 == (15 & e.windowBits) && (e.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new n(), this.strm.avail_out = 0;
        var r = d.inflateInit2(this.strm, e.windowBits);
        if (r !== m.Z_OK) throw new Error(i[r]);
        this.header = new s(), d.inflateGetHeader(this.strm, this.header);
      }

      function o(t, e) {
        var r = new a(e);
        if (r.push(t, !0), r.err) throw r.msg || i[r.err];
        return r.result;
      }

      a.prototype.push = function (t, e) {
        var r,
            i,
            n,
            s,
            a,
            o,
            h = this.strm,
            u = this.options.chunkSize,
            l = this.options.dictionary,
            f = !1;
        if (this.ended) return !1;
        i = e === ~~e ? e : !0 === e ? m.Z_FINISH : m.Z_NO_FLUSH, "string" == typeof t ? h.input = p.binstring2buf(t) : "[object ArrayBuffer]" === _.call(t) ? h.input = new Uint8Array(t) : h.input = t, h.next_in = 0, h.avail_in = h.input.length;

        do {
          if (0 === h.avail_out && (h.output = new c.Buf8(u), h.next_out = 0, h.avail_out = u), (r = d.inflate(h, m.Z_NO_FLUSH)) === m.Z_NEED_DICT && l && (o = "string" == typeof l ? p.string2buf(l) : "[object ArrayBuffer]" === _.call(l) ? new Uint8Array(l) : l, r = d.inflateSetDictionary(this.strm, o)), r === m.Z_BUF_ERROR && !0 === f && (r = m.Z_OK, f = !1), r !== m.Z_STREAM_END && r !== m.Z_OK) return this.onEnd(r), !(this.ended = !0);
          h.next_out && (0 !== h.avail_out && r !== m.Z_STREAM_END && (0 !== h.avail_in || i !== m.Z_FINISH && i !== m.Z_SYNC_FLUSH) || ("string" === this.options.to ? (n = p.utf8border(h.output, h.next_out), s = h.next_out - n, a = p.buf2string(h.output, n), h.next_out = s, h.avail_out = u - s, s && c.arraySet(h.output, h.output, n, s, 0), this.onData(a)) : this.onData(c.shrinkBuf(h.output, h.next_out)))), 0 === h.avail_in && 0 === h.avail_out && (f = !0);
        } while ((0 < h.avail_in || 0 === h.avail_out) && r !== m.Z_STREAM_END);

        return r === m.Z_STREAM_END && (i = m.Z_FINISH), i === m.Z_FINISH ? (r = d.inflateEnd(this.strm), this.onEnd(r), this.ended = !0, r === m.Z_OK) : i !== m.Z_SYNC_FLUSH || (this.onEnd(m.Z_OK), !(h.avail_out = 0));
      }, a.prototype.onData = function (t) {
        this.chunks.push(t);
      }, a.prototype.onEnd = function (t) {
        t === m.Z_OK && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = c.flattenChunks(this.chunks)), this.chunks = [], this.err = t, this.msg = this.strm.msg;
      }, r.Inflate = a, r.inflate = o, r.inflateRaw = function (t, e) {
        return (e = e || {}).raw = !0, o(t, e);
      }, r.ungzip = o;
    }, {
      "./utils/common": 41,
      "./utils/strings": 42,
      "./zlib/constants": 44,
      "./zlib/gzheader": 47,
      "./zlib/inflate": 49,
      "./zlib/messages": 51,
      "./zlib/zstream": 53
    }],
    41: [function (t, e, r) {
      "use strict";

      var i = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Int32Array;
      r.assign = function (t) {
        for (var e = Array.prototype.slice.call(arguments, 1); e.length;) {
          var r = e.shift();

          if (r) {
            if ("object" != typeof r) throw new TypeError(r + "must be non-object");

            for (var i in r) r.hasOwnProperty(i) && (t[i] = r[i]);
          }
        }

        return t;
      }, r.shrinkBuf = function (t, e) {
        return t.length === e ? t : t.subarray ? t.subarray(0, e) : (t.length = e, t);
      };
      var n = {
        arraySet: function (t, e, r, i, n) {
          if (e.subarray && t.subarray) t.set(e.subarray(r, r + i), n);else for (var s = 0; s < i; s++) t[n + s] = e[r + s];
        },
        flattenChunks: function (t) {
          var e, r, i, n, s, a;

          for (e = i = 0, r = t.length; e < r; e++) i += t[e].length;

          for (a = new Uint8Array(i), e = n = 0, r = t.length; e < r; e++) s = t[e], a.set(s, n), n += s.length;

          return a;
        }
      },
          s = {
        arraySet: function (t, e, r, i, n) {
          for (var s = 0; s < i; s++) t[n + s] = e[r + s];
        },
        flattenChunks: function (t) {
          return [].concat.apply([], t);
        }
      };
      r.setTyped = function (t) {
        t ? (r.Buf8 = Uint8Array, r.Buf16 = Uint16Array, r.Buf32 = Int32Array, r.assign(r, n)) : (r.Buf8 = Array, r.Buf16 = Array, r.Buf32 = Array, r.assign(r, s));
      }, r.setTyped(i);
    }, {}],
    42: [function (t, e, r) {
      "use strict";

      var h = t("./common"),
          n = !0,
          s = !0;

      try {
        String.fromCharCode.apply(null, [0]);
      } catch (t) {
        n = !1;
      }

      try {
        String.fromCharCode.apply(null, new Uint8Array(1));
      } catch (t) {
        s = !1;
      }

      for (var u = new h.Buf8(256), i = 0; i < 256; i++) u[i] = 252 <= i ? 6 : 248 <= i ? 5 : 240 <= i ? 4 : 224 <= i ? 3 : 192 <= i ? 2 : 1;

      function l(t, e) {
        if (e < 65537 && (t.subarray && s || !t.subarray && n)) return String.fromCharCode.apply(null, h.shrinkBuf(t, e));

        for (var r = "", i = 0; i < e; i++) r += String.fromCharCode(t[i]);

        return r;
      }

      u[254] = u[254] = 1, r.string2buf = function (t) {
        var e,
            r,
            i,
            n,
            s,
            a = t.length,
            o = 0;

        for (n = 0; n < a; n++) 55296 == (64512 & (r = t.charCodeAt(n))) && n + 1 < a && 56320 == (64512 & (i = t.charCodeAt(n + 1))) && (r = 65536 + (r - 55296 << 10) + (i - 56320), n++), o += r < 128 ? 1 : r < 2048 ? 2 : r < 65536 ? 3 : 4;

        for (e = new h.Buf8(o), n = s = 0; s < o; n++) 55296 == (64512 & (r = t.charCodeAt(n))) && n + 1 < a && 56320 == (64512 & (i = t.charCodeAt(n + 1))) && (r = 65536 + (r - 55296 << 10) + (i - 56320), n++), r < 128 ? e[s++] = r : (r < 2048 ? e[s++] = 192 | r >>> 6 : (r < 65536 ? e[s++] = 224 | r >>> 12 : (e[s++] = 240 | r >>> 18, e[s++] = 128 | r >>> 12 & 63), e[s++] = 128 | r >>> 6 & 63), e[s++] = 128 | 63 & r);

        return e;
      }, r.buf2binstring = function (t) {
        return l(t, t.length);
      }, r.binstring2buf = function (t) {
        for (var e = new h.Buf8(t.length), r = 0, i = e.length; r < i; r++) e[r] = t.charCodeAt(r);

        return e;
      }, r.buf2string = function (t, e) {
        var r,
            i,
            n,
            s,
            a = e || t.length,
            o = new Array(2 * a);

        for (r = i = 0; r < a;) if ((n = t[r++]) < 128) o[i++] = n;else if (4 < (s = u[n])) o[i++] = 65533, r += s - 1;else {
          for (n &= 2 === s ? 31 : 3 === s ? 15 : 7; 1 < s && r < a;) n = n << 6 | 63 & t[r++], s--;

          1 < s ? o[i++] = 65533 : n < 65536 ? o[i++] = n : (n -= 65536, o[i++] = 55296 | n >> 10 & 1023, o[i++] = 56320 | 1023 & n);
        }

        return l(o, i);
      }, r.utf8border = function (t, e) {
        var r;

        for ((e = e || t.length) > t.length && (e = t.length), r = e - 1; 0 <= r && 128 == (192 & t[r]);) r--;

        return r < 0 ? e : 0 === r ? e : r + u[t[r]] > e ? r : e;
      };
    }, {
      "./common": 41
    }],
    43: [function (t, e, r) {
      "use strict";

      e.exports = function (t, e, r, i) {
        for (var n = 65535 & t | 0, s = t >>> 16 & 65535 | 0, a = 0; 0 !== r;) {
          for (r -= a = 2e3 < r ? 2e3 : r; s = s + (n = n + e[i++] | 0) | 0, --a;);

          n %= 65521, s %= 65521;
        }

        return n | s << 16 | 0;
      };
    }, {}],
    44: [function (t, e, r) {
      "use strict";

      e.exports = {
        Z_NO_FLUSH: 0,
        Z_PARTIAL_FLUSH: 1,
        Z_SYNC_FLUSH: 2,
        Z_FULL_FLUSH: 3,
        Z_FINISH: 4,
        Z_BLOCK: 5,
        Z_TREES: 6,
        Z_OK: 0,
        Z_STREAM_END: 1,
        Z_NEED_DICT: 2,
        Z_ERRNO: -1,
        Z_STREAM_ERROR: -2,
        Z_DATA_ERROR: -3,
        Z_BUF_ERROR: -5,
        Z_NO_COMPRESSION: 0,
        Z_BEST_SPEED: 1,
        Z_BEST_COMPRESSION: 9,
        Z_DEFAULT_COMPRESSION: -1,
        Z_FILTERED: 1,
        Z_HUFFMAN_ONLY: 2,
        Z_RLE: 3,
        Z_FIXED: 4,
        Z_DEFAULT_STRATEGY: 0,
        Z_BINARY: 0,
        Z_TEXT: 1,
        Z_UNKNOWN: 2,
        Z_DEFLATED: 8
      };
    }, {}],
    45: [function (t, e, r) {
      "use strict";

      var o = function () {
        for (var t, e = [], r = 0; r < 256; r++) {
          t = r;

          for (var i = 0; i < 8; i++) t = 1 & t ? 3988292384 ^ t >>> 1 : t >>> 1;

          e[r] = t;
        }

        return e;
      }();

      e.exports = function (t, e, r, i) {
        var n = o,
            s = i + r;
        t ^= -1;

        for (var a = i; a < s; a++) t = t >>> 8 ^ n[255 & (t ^ e[a])];

        return -1 ^ t;
      };
    }, {}],
    46: [function (t, e, r) {
      "use strict";

      var h,
          d = t("../utils/common"),
          u = t("./trees"),
          c = t("./adler32"),
          p = t("./crc32"),
          i = t("./messages"),
          l = 0,
          f = 4,
          m = 0,
          _ = -2,
          g = -1,
          b = 4,
          n = 2,
          v = 8,
          y = 9,
          s = 286,
          a = 30,
          o = 19,
          w = 2 * s + 1,
          k = 15,
          x = 3,
          S = 258,
          z = S + x + 1,
          C = 42,
          E = 113,
          A = 1,
          I = 2,
          O = 3,
          B = 4;

      function R(t, e) {
        return t.msg = i[e], e;
      }

      function T(t) {
        return (t << 1) - (4 < t ? 9 : 0);
      }

      function D(t) {
        for (var e = t.length; 0 <= --e;) t[e] = 0;
      }

      function F(t) {
        var e = t.state,
            r = e.pending;
        r > t.avail_out && (r = t.avail_out), 0 !== r && (d.arraySet(t.output, e.pending_buf, e.pending_out, r, t.next_out), t.next_out += r, e.pending_out += r, t.total_out += r, t.avail_out -= r, e.pending -= r, 0 === e.pending && (e.pending_out = 0));
      }

      function N(t, e) {
        u._tr_flush_block(t, 0 <= t.block_start ? t.block_start : -1, t.strstart - t.block_start, e), t.block_start = t.strstart, F(t.strm);
      }

      function U(t, e) {
        t.pending_buf[t.pending++] = e;
      }

      function P(t, e) {
        t.pending_buf[t.pending++] = e >>> 8 & 255, t.pending_buf[t.pending++] = 255 & e;
      }

      function L(t, e) {
        var r,
            i,
            n = t.max_chain_length,
            s = t.strstart,
            a = t.prev_length,
            o = t.nice_match,
            h = t.strstart > t.w_size - z ? t.strstart - (t.w_size - z) : 0,
            u = t.window,
            l = t.w_mask,
            f = t.prev,
            d = t.strstart + S,
            c = u[s + a - 1],
            p = u[s + a];
        t.prev_length >= t.good_match && (n >>= 2), o > t.lookahead && (o = t.lookahead);

        do {
          if (u[(r = e) + a] === p && u[r + a - 1] === c && u[r] === u[s] && u[++r] === u[s + 1]) {
            s += 2, r++;

            do {} while (u[++s] === u[++r] && u[++s] === u[++r] && u[++s] === u[++r] && u[++s] === u[++r] && u[++s] === u[++r] && u[++s] === u[++r] && u[++s] === u[++r] && u[++s] === u[++r] && s < d);

            if (i = S - (d - s), s = d - S, a < i) {
              if (t.match_start = e, o <= (a = i)) break;
              c = u[s + a - 1], p = u[s + a];
            }
          }
        } while ((e = f[e & l]) > h && 0 != --n);

        return a <= t.lookahead ? a : t.lookahead;
      }

      function j(t) {
        var e,
            r,
            i,
            n,
            s,
            a,
            o,
            h,
            u,
            l,
            f = t.w_size;

        do {
          if (n = t.window_size - t.lookahead - t.strstart, t.strstart >= f + (f - z)) {
            for (d.arraySet(t.window, t.window, f, f, 0), t.match_start -= f, t.strstart -= f, t.block_start -= f, e = r = t.hash_size; i = t.head[--e], t.head[e] = f <= i ? i - f : 0, --r;);

            for (e = r = f; i = t.prev[--e], t.prev[e] = f <= i ? i - f : 0, --r;);

            n += f;
          }

          if (0 === t.strm.avail_in) break;
          if (a = t.strm, o = t.window, h = t.strstart + t.lookahead, u = n, l = void 0, l = a.avail_in, u < l && (l = u), r = 0 === l ? 0 : (a.avail_in -= l, d.arraySet(o, a.input, a.next_in, l, h), 1 === a.state.wrap ? a.adler = c(a.adler, o, l, h) : 2 === a.state.wrap && (a.adler = p(a.adler, o, l, h)), a.next_in += l, a.total_in += l, l), t.lookahead += r, t.lookahead + t.insert >= x) for (s = t.strstart - t.insert, t.ins_h = t.window[s], t.ins_h = (t.ins_h << t.hash_shift ^ t.window[s + 1]) & t.hash_mask; t.insert && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[s + x - 1]) & t.hash_mask, t.prev[s & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = s, s++, t.insert--, !(t.lookahead + t.insert < x)););
        } while (t.lookahead < z && 0 !== t.strm.avail_in);
      }

      function Z(t, e) {
        for (var r, i;;) {
          if (t.lookahead < z) {
            if (j(t), t.lookahead < z && e === l) return A;
            if (0 === t.lookahead) break;
          }

          if (r = 0, t.lookahead >= x && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + x - 1]) & t.hash_mask, r = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), 0 !== r && t.strstart - r <= t.w_size - z && (t.match_length = L(t, r)), t.match_length >= x) {
            if (i = u._tr_tally(t, t.strstart - t.match_start, t.match_length - x), t.lookahead -= t.match_length, t.match_length <= t.max_lazy_match && t.lookahead >= x) {
              for (t.match_length--; t.strstart++, t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + x - 1]) & t.hash_mask, r = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart, 0 != --t.match_length;);

              t.strstart++;
            } else t.strstart += t.match_length, t.match_length = 0, t.ins_h = t.window[t.strstart], t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + 1]) & t.hash_mask;
          } else i = u._tr_tally(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++;
          if (i && (N(t, !1), 0 === t.strm.avail_out)) return A;
        }

        return t.insert = t.strstart < x - 1 ? t.strstart : x - 1, e === f ? (N(t, !0), 0 === t.strm.avail_out ? O : B) : t.last_lit && (N(t, !1), 0 === t.strm.avail_out) ? A : I;
      }

      function W(t, e) {
        for (var r, i, n;;) {
          if (t.lookahead < z) {
            if (j(t), t.lookahead < z && e === l) return A;
            if (0 === t.lookahead) break;
          }

          if (r = 0, t.lookahead >= x && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + x - 1]) & t.hash_mask, r = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), t.prev_length = t.match_length, t.prev_match = t.match_start, t.match_length = x - 1, 0 !== r && t.prev_length < t.max_lazy_match && t.strstart - r <= t.w_size - z && (t.match_length = L(t, r), t.match_length <= 5 && (1 === t.strategy || t.match_length === x && 4096 < t.strstart - t.match_start) && (t.match_length = x - 1)), t.prev_length >= x && t.match_length <= t.prev_length) {
            for (n = t.strstart + t.lookahead - x, i = u._tr_tally(t, t.strstart - 1 - t.prev_match, t.prev_length - x), t.lookahead -= t.prev_length - 1, t.prev_length -= 2; ++t.strstart <= n && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + x - 1]) & t.hash_mask, r = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), 0 != --t.prev_length;);

            if (t.match_available = 0, t.match_length = x - 1, t.strstart++, i && (N(t, !1), 0 === t.strm.avail_out)) return A;
          } else if (t.match_available) {
            if ((i = u._tr_tally(t, 0, t.window[t.strstart - 1])) && N(t, !1), t.strstart++, t.lookahead--, 0 === t.strm.avail_out) return A;
          } else t.match_available = 1, t.strstart++, t.lookahead--;
        }

        return t.match_available && (i = u._tr_tally(t, 0, t.window[t.strstart - 1]), t.match_available = 0), t.insert = t.strstart < x - 1 ? t.strstart : x - 1, e === f ? (N(t, !0), 0 === t.strm.avail_out ? O : B) : t.last_lit && (N(t, !1), 0 === t.strm.avail_out) ? A : I;
      }

      function M(t, e, r, i, n) {
        this.good_length = t, this.max_lazy = e, this.nice_length = r, this.max_chain = i, this.func = n;
      }

      function H() {
        this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = v, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new d.Buf16(2 * w), this.dyn_dtree = new d.Buf16(2 * (2 * a + 1)), this.bl_tree = new d.Buf16(2 * (2 * o + 1)), D(this.dyn_ltree), D(this.dyn_dtree), D(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new d.Buf16(k + 1), this.heap = new d.Buf16(2 * s + 1), D(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new d.Buf16(2 * s + 1), D(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
      }

      function G(t) {
        var e;
        return t && t.state ? (t.total_in = t.total_out = 0, t.data_type = n, (e = t.state).pending = 0, e.pending_out = 0, e.wrap < 0 && (e.wrap = -e.wrap), e.status = e.wrap ? C : E, t.adler = 2 === e.wrap ? 0 : 1, e.last_flush = l, u._tr_init(e), m) : R(t, _);
      }

      function K(t) {
        var e = G(t);
        return e === m && function (t) {
          t.window_size = 2 * t.w_size, D(t.head), t.max_lazy_match = h[t.level].max_lazy, t.good_match = h[t.level].good_length, t.nice_match = h[t.level].nice_length, t.max_chain_length = h[t.level].max_chain, t.strstart = 0, t.block_start = 0, t.lookahead = 0, t.insert = 0, t.match_length = t.prev_length = x - 1, t.match_available = 0, t.ins_h = 0;
        }(t.state), e;
      }

      function Y(t, e, r, i, n, s) {
        if (!t) return _;
        var a = 1;
        if (e === g && (e = 6), i < 0 ? (a = 0, i = -i) : 15 < i && (a = 2, i -= 16), n < 1 || y < n || r !== v || i < 8 || 15 < i || e < 0 || 9 < e || s < 0 || b < s) return R(t, _);
        8 === i && (i = 9);
        var o = new H();
        return (t.state = o).strm = t, o.wrap = a, o.gzhead = null, o.w_bits = i, o.w_size = 1 << o.w_bits, o.w_mask = o.w_size - 1, o.hash_bits = n + 7, o.hash_size = 1 << o.hash_bits, o.hash_mask = o.hash_size - 1, o.hash_shift = ~~((o.hash_bits + x - 1) / x), o.window = new d.Buf8(2 * o.w_size), o.head = new d.Buf16(o.hash_size), o.prev = new d.Buf16(o.w_size), o.lit_bufsize = 1 << n + 6, o.pending_buf_size = 4 * o.lit_bufsize, o.pending_buf = new d.Buf8(o.pending_buf_size), o.d_buf = 1 * o.lit_bufsize, o.l_buf = 3 * o.lit_bufsize, o.level = e, o.strategy = s, o.method = r, K(t);
      }

      h = [new M(0, 0, 0, 0, function (t, e) {
        var r = 65535;

        for (r > t.pending_buf_size - 5 && (r = t.pending_buf_size - 5);;) {
          if (t.lookahead <= 1) {
            if (j(t), 0 === t.lookahead && e === l) return A;
            if (0 === t.lookahead) break;
          }

          t.strstart += t.lookahead, t.lookahead = 0;
          var i = t.block_start + r;
          if ((0 === t.strstart || t.strstart >= i) && (t.lookahead = t.strstart - i, t.strstart = i, N(t, !1), 0 === t.strm.avail_out)) return A;
          if (t.strstart - t.block_start >= t.w_size - z && (N(t, !1), 0 === t.strm.avail_out)) return A;
        }

        return t.insert = 0, e === f ? (N(t, !0), 0 === t.strm.avail_out ? O : B) : (t.strstart > t.block_start && (N(t, !1), t.strm.avail_out), A);
      }), new M(4, 4, 8, 4, Z), new M(4, 5, 16, 8, Z), new M(4, 6, 32, 32, Z), new M(4, 4, 16, 16, W), new M(8, 16, 32, 32, W), new M(8, 16, 128, 128, W), new M(8, 32, 128, 256, W), new M(32, 128, 258, 1024, W), new M(32, 258, 258, 4096, W)], r.deflateInit = function (t, e) {
        return Y(t, e, v, 15, 8, 0);
      }, r.deflateInit2 = Y, r.deflateReset = K, r.deflateResetKeep = G, r.deflateSetHeader = function (t, e) {
        return t && t.state ? 2 !== t.state.wrap ? _ : (t.state.gzhead = e, m) : _;
      }, r.deflate = function (t, e) {
        var r, i, n, s;
        if (!t || !t.state || 5 < e || e < 0) return t ? R(t, _) : _;
        if (i = t.state, !t.output || !t.input && 0 !== t.avail_in || 666 === i.status && e !== f) return R(t, 0 === t.avail_out ? -5 : _);
        if (i.strm = t, r = i.last_flush, i.last_flush = e, i.status === C) if (2 === i.wrap) t.adler = 0, U(i, 31), U(i, 139), U(i, 8), i.gzhead ? (U(i, (i.gzhead.text ? 1 : 0) + (i.gzhead.hcrc ? 2 : 0) + (i.gzhead.extra ? 4 : 0) + (i.gzhead.name ? 8 : 0) + (i.gzhead.comment ? 16 : 0)), U(i, 255 & i.gzhead.time), U(i, i.gzhead.time >> 8 & 255), U(i, i.gzhead.time >> 16 & 255), U(i, i.gzhead.time >> 24 & 255), U(i, 9 === i.level ? 2 : 2 <= i.strategy || i.level < 2 ? 4 : 0), U(i, 255 & i.gzhead.os), i.gzhead.extra && i.gzhead.extra.length && (U(i, 255 & i.gzhead.extra.length), U(i, i.gzhead.extra.length >> 8 & 255)), i.gzhead.hcrc && (t.adler = p(t.adler, i.pending_buf, i.pending, 0)), i.gzindex = 0, i.status = 69) : (U(i, 0), U(i, 0), U(i, 0), U(i, 0), U(i, 0), U(i, 9 === i.level ? 2 : 2 <= i.strategy || i.level < 2 ? 4 : 0), U(i, 3), i.status = E);else {
          var a = v + (i.w_bits - 8 << 4) << 8;
          a |= (2 <= i.strategy || i.level < 2 ? 0 : i.level < 6 ? 1 : 6 === i.level ? 2 : 3) << 6, 0 !== i.strstart && (a |= 32), a += 31 - a % 31, i.status = E, P(i, a), 0 !== i.strstart && (P(i, t.adler >>> 16), P(i, 65535 & t.adler)), t.adler = 1;
        }
        if (69 === i.status) if (i.gzhead.extra) {
          for (n = i.pending; i.gzindex < (65535 & i.gzhead.extra.length) && (i.pending !== i.pending_buf_size || (i.gzhead.hcrc && i.pending > n && (t.adler = p(t.adler, i.pending_buf, i.pending - n, n)), F(t), n = i.pending, i.pending !== i.pending_buf_size));) U(i, 255 & i.gzhead.extra[i.gzindex]), i.gzindex++;

          i.gzhead.hcrc && i.pending > n && (t.adler = p(t.adler, i.pending_buf, i.pending - n, n)), i.gzindex === i.gzhead.extra.length && (i.gzindex = 0, i.status = 73);
        } else i.status = 73;
        if (73 === i.status) if (i.gzhead.name) {
          n = i.pending;

          do {
            if (i.pending === i.pending_buf_size && (i.gzhead.hcrc && i.pending > n && (t.adler = p(t.adler, i.pending_buf, i.pending - n, n)), F(t), n = i.pending, i.pending === i.pending_buf_size)) {
              s = 1;
              break;
            }

            s = i.gzindex < i.gzhead.name.length ? 255 & i.gzhead.name.charCodeAt(i.gzindex++) : 0, U(i, s);
          } while (0 !== s);

          i.gzhead.hcrc && i.pending > n && (t.adler = p(t.adler, i.pending_buf, i.pending - n, n)), 0 === s && (i.gzindex = 0, i.status = 91);
        } else i.status = 91;
        if (91 === i.status) if (i.gzhead.comment) {
          n = i.pending;

          do {
            if (i.pending === i.pending_buf_size && (i.gzhead.hcrc && i.pending > n && (t.adler = p(t.adler, i.pending_buf, i.pending - n, n)), F(t), n = i.pending, i.pending === i.pending_buf_size)) {
              s = 1;
              break;
            }

            s = i.gzindex < i.gzhead.comment.length ? 255 & i.gzhead.comment.charCodeAt(i.gzindex++) : 0, U(i, s);
          } while (0 !== s);

          i.gzhead.hcrc && i.pending > n && (t.adler = p(t.adler, i.pending_buf, i.pending - n, n)), 0 === s && (i.status = 103);
        } else i.status = 103;

        if (103 === i.status && (i.gzhead.hcrc ? (i.pending + 2 > i.pending_buf_size && F(t), i.pending + 2 <= i.pending_buf_size && (U(i, 255 & t.adler), U(i, t.adler >> 8 & 255), t.adler = 0, i.status = E)) : i.status = E), 0 !== i.pending) {
          if (F(t), 0 === t.avail_out) return i.last_flush = -1, m;
        } else if (0 === t.avail_in && T(e) <= T(r) && e !== f) return R(t, -5);

        if (666 === i.status && 0 !== t.avail_in) return R(t, -5);

        if (0 !== t.avail_in || 0 !== i.lookahead || e !== l && 666 !== i.status) {
          var o = 2 === i.strategy ? function (t, e) {
            for (var r;;) {
              if (0 === t.lookahead && (j(t), 0 === t.lookahead)) {
                if (e === l) return A;
                break;
              }

              if (t.match_length = 0, r = u._tr_tally(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++, r && (N(t, !1), 0 === t.strm.avail_out)) return A;
            }

            return t.insert = 0, e === f ? (N(t, !0), 0 === t.strm.avail_out ? O : B) : t.last_lit && (N(t, !1), 0 === t.strm.avail_out) ? A : I;
          }(i, e) : 3 === i.strategy ? function (t, e) {
            for (var r, i, n, s, a = t.window;;) {
              if (t.lookahead <= S) {
                if (j(t), t.lookahead <= S && e === l) return A;
                if (0 === t.lookahead) break;
              }

              if (t.match_length = 0, t.lookahead >= x && 0 < t.strstart && (i = a[n = t.strstart - 1]) === a[++n] && i === a[++n] && i === a[++n]) {
                s = t.strstart + S;

                do {} while (i === a[++n] && i === a[++n] && i === a[++n] && i === a[++n] && i === a[++n] && i === a[++n] && i === a[++n] && i === a[++n] && n < s);

                t.match_length = S - (s - n), t.match_length > t.lookahead && (t.match_length = t.lookahead);
              }

              if (t.match_length >= x ? (r = u._tr_tally(t, 1, t.match_length - x), t.lookahead -= t.match_length, t.strstart += t.match_length, t.match_length = 0) : (r = u._tr_tally(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++), r && (N(t, !1), 0 === t.strm.avail_out)) return A;
            }

            return t.insert = 0, e === f ? (N(t, !0), 0 === t.strm.avail_out ? O : B) : t.last_lit && (N(t, !1), 0 === t.strm.avail_out) ? A : I;
          }(i, e) : h[i.level].func(i, e);
          if (o !== O && o !== B || (i.status = 666), o === A || o === O) return 0 === t.avail_out && (i.last_flush = -1), m;
          if (o === I && (1 === e ? u._tr_align(i) : 5 !== e && (u._tr_stored_block(i, 0, 0, !1), 3 === e && (D(i.head), 0 === i.lookahead && (i.strstart = 0, i.block_start = 0, i.insert = 0))), F(t), 0 === t.avail_out)) return i.last_flush = -1, m;
        }

        return e !== f ? m : i.wrap <= 0 ? 1 : (2 === i.wrap ? (U(i, 255 & t.adler), U(i, t.adler >> 8 & 255), U(i, t.adler >> 16 & 255), U(i, t.adler >> 24 & 255), U(i, 255 & t.total_in), U(i, t.total_in >> 8 & 255), U(i, t.total_in >> 16 & 255), U(i, t.total_in >> 24 & 255)) : (P(i, t.adler >>> 16), P(i, 65535 & t.adler)), F(t), 0 < i.wrap && (i.wrap = -i.wrap), 0 !== i.pending ? m : 1);
      }, r.deflateEnd = function (t) {
        var e;
        return t && t.state ? (e = t.state.status) !== C && 69 !== e && 73 !== e && 91 !== e && 103 !== e && e !== E && 666 !== e ? R(t, _) : (t.state = null, e === E ? R(t, -3) : m) : _;
      }, r.deflateSetDictionary = function (t, e) {
        var r,
            i,
            n,
            s,
            a,
            o,
            h,
            u,
            l = e.length;
        if (!t || !t.state) return _;
        if (2 === (s = (r = t.state).wrap) || 1 === s && r.status !== C || r.lookahead) return _;

        for (1 === s && (t.adler = c(t.adler, e, l, 0)), r.wrap = 0, l >= r.w_size && (0 === s && (D(r.head), r.strstart = 0, r.block_start = 0, r.insert = 0), u = new d.Buf8(r.w_size), d.arraySet(u, e, l - r.w_size, r.w_size, 0), e = u, l = r.w_size), a = t.avail_in, o = t.next_in, h = t.input, t.avail_in = l, t.next_in = 0, t.input = e, j(r); r.lookahead >= x;) {
          for (i = r.strstart, n = r.lookahead - (x - 1); r.ins_h = (r.ins_h << r.hash_shift ^ r.window[i + x - 1]) & r.hash_mask, r.prev[i & r.w_mask] = r.head[r.ins_h], r.head[r.ins_h] = i, i++, --n;);

          r.strstart = i, r.lookahead = x - 1, j(r);
        }

        return r.strstart += r.lookahead, r.block_start = r.strstart, r.insert = r.lookahead, r.lookahead = 0, r.match_length = r.prev_length = x - 1, r.match_available = 0, t.next_in = o, t.input = h, t.avail_in = a, r.wrap = s, m;
      }, r.deflateInfo = "pako deflate (from Nodeca project)";
    }, {
      "../utils/common": 41,
      "./adler32": 43,
      "./crc32": 45,
      "./messages": 51,
      "./trees": 52
    }],
    47: [function (t, e, r) {
      "use strict";

      e.exports = function () {
        this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
      };
    }, {}],
    48: [function (t, e, r) {
      "use strict";

      e.exports = function (t, e) {
        var r, i, n, s, a, o, h, u, l, f, d, c, p, m, _, g, b, v, y, w, k, x, S, z, C;

        r = t.state, i = t.next_in, z = t.input, n = i + (t.avail_in - 5), s = t.next_out, C = t.output, a = s - (e - t.avail_out), o = s + (t.avail_out - 257), h = r.dmax, u = r.wsize, l = r.whave, f = r.wnext, d = r.window, c = r.hold, p = r.bits, m = r.lencode, _ = r.distcode, g = (1 << r.lenbits) - 1, b = (1 << r.distbits) - 1;

        t: do {
          p < 15 && (c += z[i++] << p, p += 8, c += z[i++] << p, p += 8), v = m[c & g];

          e: for (;;) {
            if (c >>>= y = v >>> 24, p -= y, 0 === (y = v >>> 16 & 255)) C[s++] = 65535 & v;else {
              if (!(16 & y)) {
                if (0 == (64 & y)) {
                  v = m[(65535 & v) + (c & (1 << y) - 1)];
                  continue e;
                }

                if (32 & y) {
                  r.mode = 12;
                  break t;
                }

                t.msg = "invalid literal/length code", r.mode = 30;
                break t;
              }

              w = 65535 & v, (y &= 15) && (p < y && (c += z[i++] << p, p += 8), w += c & (1 << y) - 1, c >>>= y, p -= y), p < 15 && (c += z[i++] << p, p += 8, c += z[i++] << p, p += 8), v = _[c & b];

              r: for (;;) {
                if (c >>>= y = v >>> 24, p -= y, !(16 & (y = v >>> 16 & 255))) {
                  if (0 == (64 & y)) {
                    v = _[(65535 & v) + (c & (1 << y) - 1)];
                    continue r;
                  }

                  t.msg = "invalid distance code", r.mode = 30;
                  break t;
                }

                if (k = 65535 & v, p < (y &= 15) && (c += z[i++] << p, (p += 8) < y && (c += z[i++] << p, p += 8)), h < (k += c & (1 << y) - 1)) {
                  t.msg = "invalid distance too far back", r.mode = 30;
                  break t;
                }

                if (c >>>= y, p -= y, (y = s - a) < k) {
                  if (l < (y = k - y) && r.sane) {
                    t.msg = "invalid distance too far back", r.mode = 30;
                    break t;
                  }

                  if (S = d, (x = 0) === f) {
                    if (x += u - y, y < w) {
                      for (w -= y; C[s++] = d[x++], --y;);

                      x = s - k, S = C;
                    }
                  } else if (f < y) {
                    if (x += u + f - y, (y -= f) < w) {
                      for (w -= y; C[s++] = d[x++], --y;);

                      if (x = 0, f < w) {
                        for (w -= y = f; C[s++] = d[x++], --y;);

                        x = s - k, S = C;
                      }
                    }
                  } else if (x += f - y, y < w) {
                    for (w -= y; C[s++] = d[x++], --y;);

                    x = s - k, S = C;
                  }

                  for (; 2 < w;) C[s++] = S[x++], C[s++] = S[x++], C[s++] = S[x++], w -= 3;

                  w && (C[s++] = S[x++], 1 < w && (C[s++] = S[x++]));
                } else {
                  for (x = s - k; C[s++] = C[x++], C[s++] = C[x++], C[s++] = C[x++], 2 < (w -= 3););

                  w && (C[s++] = C[x++], 1 < w && (C[s++] = C[x++]));
                }

                break;
              }
            }
            break;
          }
        } while (i < n && s < o);

        i -= w = p >> 3, c &= (1 << (p -= w << 3)) - 1, t.next_in = i, t.next_out = s, t.avail_in = i < n ? n - i + 5 : 5 - (i - n), t.avail_out = s < o ? o - s + 257 : 257 - (s - o), r.hold = c, r.bits = p;
      };
    }, {}],
    49: [function (t, e, r) {
      "use strict";

      var I = t("../utils/common"),
          O = t("./adler32"),
          B = t("./crc32"),
          R = t("./inffast"),
          T = t("./inftrees"),
          D = 1,
          F = 2,
          N = 0,
          U = -2,
          P = 1,
          i = 852,
          n = 592;

      function L(t) {
        return (t >>> 24 & 255) + (t >>> 8 & 65280) + ((65280 & t) << 8) + ((255 & t) << 24);
      }

      function s() {
        this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new I.Buf16(320), this.work = new I.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
      }

      function a(t) {
        var e;
        return t && t.state ? (e = t.state, t.total_in = t.total_out = e.total = 0, t.msg = "", e.wrap && (t.adler = 1 & e.wrap), e.mode = P, e.last = 0, e.havedict = 0, e.dmax = 32768, e.head = null, e.hold = 0, e.bits = 0, e.lencode = e.lendyn = new I.Buf32(i), e.distcode = e.distdyn = new I.Buf32(n), e.sane = 1, e.back = -1, N) : U;
      }

      function o(t) {
        var e;
        return t && t.state ? ((e = t.state).wsize = 0, e.whave = 0, e.wnext = 0, a(t)) : U;
      }

      function h(t, e) {
        var r, i;
        return t && t.state ? (i = t.state, e < 0 ? (r = 0, e = -e) : (r = 1 + (e >> 4), e < 48 && (e &= 15)), e && (e < 8 || 15 < e) ? U : (null !== i.window && i.wbits !== e && (i.window = null), i.wrap = r, i.wbits = e, o(t))) : U;
      }

      function u(t, e) {
        var r, i;
        return t ? (i = new s(), (t.state = i).window = null, (r = h(t, e)) !== N && (t.state = null), r) : U;
      }

      var l,
          f,
          d = !0;

      function j(t) {
        if (d) {
          var e;

          for (l = new I.Buf32(512), f = new I.Buf32(32), e = 0; e < 144;) t.lens[e++] = 8;

          for (; e < 256;) t.lens[e++] = 9;

          for (; e < 280;) t.lens[e++] = 7;

          for (; e < 288;) t.lens[e++] = 8;

          for (T(D, t.lens, 0, 288, l, 0, t.work, {
            bits: 9
          }), e = 0; e < 32;) t.lens[e++] = 5;

          T(F, t.lens, 0, 32, f, 0, t.work, {
            bits: 5
          }), d = !1;
        }

        t.lencode = l, t.lenbits = 9, t.distcode = f, t.distbits = 5;
      }

      function Z(t, e, r, i) {
        var n,
            s = t.state;
        return null === s.window && (s.wsize = 1 << s.wbits, s.wnext = 0, s.whave = 0, s.window = new I.Buf8(s.wsize)), i >= s.wsize ? (I.arraySet(s.window, e, r - s.wsize, s.wsize, 0), s.wnext = 0, s.whave = s.wsize) : (i < (n = s.wsize - s.wnext) && (n = i), I.arraySet(s.window, e, r - i, n, s.wnext), (i -= n) ? (I.arraySet(s.window, e, r - i, i, 0), s.wnext = i, s.whave = s.wsize) : (s.wnext += n, s.wnext === s.wsize && (s.wnext = 0), s.whave < s.wsize && (s.whave += n))), 0;
      }

      r.inflateReset = o, r.inflateReset2 = h, r.inflateResetKeep = a, r.inflateInit = function (t) {
        return u(t, 15);
      }, r.inflateInit2 = u, r.inflate = function (t, e) {
        var r,
            i,
            n,
            s,
            a,
            o,
            h,
            u,
            l,
            f,
            d,
            c,
            p,
            m,
            _,
            g,
            b,
            v,
            y,
            w,
            k,
            x,
            S,
            z,
            C = 0,
            E = new I.Buf8(4),
            A = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];

        if (!t || !t.state || !t.output || !t.input && 0 !== t.avail_in) return U;
        12 === (r = t.state).mode && (r.mode = 13), a = t.next_out, n = t.output, h = t.avail_out, s = t.next_in, i = t.input, o = t.avail_in, u = r.hold, l = r.bits, f = o, d = h, x = N;

        t: for (;;) switch (r.mode) {
          case P:
            if (0 === r.wrap) {
              r.mode = 13;
              break;
            }

            for (; l < 16;) {
              if (0 === o) break t;
              o--, u += i[s++] << l, l += 8;
            }

            if (2 & r.wrap && 35615 === u) {
              E[r.check = 0] = 255 & u, E[1] = u >>> 8 & 255, r.check = B(r.check, E, 2, 0), l = u = 0, r.mode = 2;
              break;
            }

            if (r.flags = 0, r.head && (r.head.done = !1), !(1 & r.wrap) || (((255 & u) << 8) + (u >> 8)) % 31) {
              t.msg = "incorrect header check", r.mode = 30;
              break;
            }

            if (8 != (15 & u)) {
              t.msg = "unknown compression method", r.mode = 30;
              break;
            }

            if (l -= 4, k = 8 + (15 & (u >>>= 4)), 0 === r.wbits) r.wbits = k;else if (k > r.wbits) {
              t.msg = "invalid window size", r.mode = 30;
              break;
            }
            r.dmax = 1 << k, t.adler = r.check = 1, r.mode = 512 & u ? 10 : 12, l = u = 0;
            break;

          case 2:
            for (; l < 16;) {
              if (0 === o) break t;
              o--, u += i[s++] << l, l += 8;
            }

            if (r.flags = u, 8 != (255 & r.flags)) {
              t.msg = "unknown compression method", r.mode = 30;
              break;
            }

            if (57344 & r.flags) {
              t.msg = "unknown header flags set", r.mode = 30;
              break;
            }

            r.head && (r.head.text = u >> 8 & 1), 512 & r.flags && (E[0] = 255 & u, E[1] = u >>> 8 & 255, r.check = B(r.check, E, 2, 0)), l = u = 0, r.mode = 3;

          case 3:
            for (; l < 32;) {
              if (0 === o) break t;
              o--, u += i[s++] << l, l += 8;
            }

            r.head && (r.head.time = u), 512 & r.flags && (E[0] = 255 & u, E[1] = u >>> 8 & 255, E[2] = u >>> 16 & 255, E[3] = u >>> 24 & 255, r.check = B(r.check, E, 4, 0)), l = u = 0, r.mode = 4;

          case 4:
            for (; l < 16;) {
              if (0 === o) break t;
              o--, u += i[s++] << l, l += 8;
            }

            r.head && (r.head.xflags = 255 & u, r.head.os = u >> 8), 512 & r.flags && (E[0] = 255 & u, E[1] = u >>> 8 & 255, r.check = B(r.check, E, 2, 0)), l = u = 0, r.mode = 5;

          case 5:
            if (1024 & r.flags) {
              for (; l < 16;) {
                if (0 === o) break t;
                o--, u += i[s++] << l, l += 8;
              }

              r.length = u, r.head && (r.head.extra_len = u), 512 & r.flags && (E[0] = 255 & u, E[1] = u >>> 8 & 255, r.check = B(r.check, E, 2, 0)), l = u = 0;
            } else r.head && (r.head.extra = null);

            r.mode = 6;

          case 6:
            if (1024 & r.flags && (o < (c = r.length) && (c = o), c && (r.head && (k = r.head.extra_len - r.length, r.head.extra || (r.head.extra = new Array(r.head.extra_len)), I.arraySet(r.head.extra, i, s, c, k)), 512 & r.flags && (r.check = B(r.check, i, c, s)), o -= c, s += c, r.length -= c), r.length)) break t;
            r.length = 0, r.mode = 7;

          case 7:
            if (2048 & r.flags) {
              if (0 === o) break t;

              for (c = 0; k = i[s + c++], r.head && k && r.length < 65536 && (r.head.name += String.fromCharCode(k)), k && c < o;);

              if (512 & r.flags && (r.check = B(r.check, i, c, s)), o -= c, s += c, k) break t;
            } else r.head && (r.head.name = null);

            r.length = 0, r.mode = 8;

          case 8:
            if (4096 & r.flags) {
              if (0 === o) break t;

              for (c = 0; k = i[s + c++], r.head && k && r.length < 65536 && (r.head.comment += String.fromCharCode(k)), k && c < o;);

              if (512 & r.flags && (r.check = B(r.check, i, c, s)), o -= c, s += c, k) break t;
            } else r.head && (r.head.comment = null);

            r.mode = 9;

          case 9:
            if (512 & r.flags) {
              for (; l < 16;) {
                if (0 === o) break t;
                o--, u += i[s++] << l, l += 8;
              }

              if (u !== (65535 & r.check)) {
                t.msg = "header crc mismatch", r.mode = 30;
                break;
              }

              l = u = 0;
            }

            r.head && (r.head.hcrc = r.flags >> 9 & 1, r.head.done = !0), t.adler = r.check = 0, r.mode = 12;
            break;

          case 10:
            for (; l < 32;) {
              if (0 === o) break t;
              o--, u += i[s++] << l, l += 8;
            }

            t.adler = r.check = L(u), l = u = 0, r.mode = 11;

          case 11:
            if (0 === r.havedict) return t.next_out = a, t.avail_out = h, t.next_in = s, t.avail_in = o, r.hold = u, r.bits = l, 2;
            t.adler = r.check = 1, r.mode = 12;

          case 12:
            if (5 === e || 6 === e) break t;

          case 13:
            if (r.last) {
              u >>>= 7 & l, l -= 7 & l, r.mode = 27;
              break;
            }

            for (; l < 3;) {
              if (0 === o) break t;
              o--, u += i[s++] << l, l += 8;
            }

            switch (r.last = 1 & u, l -= 1, 3 & (u >>>= 1)) {
              case 0:
                r.mode = 14;
                break;

              case 1:
                if (j(r), r.mode = 20, 6 !== e) break;
                u >>>= 2, l -= 2;
                break t;

              case 2:
                r.mode = 17;
                break;

              case 3:
                t.msg = "invalid block type", r.mode = 30;
            }

            u >>>= 2, l -= 2;
            break;

          case 14:
            for (u >>>= 7 & l, l -= 7 & l; l < 32;) {
              if (0 === o) break t;
              o--, u += i[s++] << l, l += 8;
            }

            if ((65535 & u) != (u >>> 16 ^ 65535)) {
              t.msg = "invalid stored block lengths", r.mode = 30;
              break;
            }

            if (r.length = 65535 & u, l = u = 0, r.mode = 15, 6 === e) break t;

          case 15:
            r.mode = 16;

          case 16:
            if (c = r.length) {
              if (o < c && (c = o), h < c && (c = h), 0 === c) break t;
              I.arraySet(n, i, s, c, a), o -= c, s += c, h -= c, a += c, r.length -= c;
              break;
            }

            r.mode = 12;
            break;

          case 17:
            for (; l < 14;) {
              if (0 === o) break t;
              o--, u += i[s++] << l, l += 8;
            }

            if (r.nlen = 257 + (31 & u), u >>>= 5, l -= 5, r.ndist = 1 + (31 & u), u >>>= 5, l -= 5, r.ncode = 4 + (15 & u), u >>>= 4, l -= 4, 286 < r.nlen || 30 < r.ndist) {
              t.msg = "too many length or distance symbols", r.mode = 30;
              break;
            }

            r.have = 0, r.mode = 18;

          case 18:
            for (; r.have < r.ncode;) {
              for (; l < 3;) {
                if (0 === o) break t;
                o--, u += i[s++] << l, l += 8;
              }

              r.lens[A[r.have++]] = 7 & u, u >>>= 3, l -= 3;
            }

            for (; r.have < 19;) r.lens[A[r.have++]] = 0;

            if (r.lencode = r.lendyn, r.lenbits = 7, S = {
              bits: r.lenbits
            }, x = T(0, r.lens, 0, 19, r.lencode, 0, r.work, S), r.lenbits = S.bits, x) {
              t.msg = "invalid code lengths set", r.mode = 30;
              break;
            }

            r.have = 0, r.mode = 19;

          case 19:
            for (; r.have < r.nlen + r.ndist;) {
              for (; g = (C = r.lencode[u & (1 << r.lenbits) - 1]) >>> 16 & 255, b = 65535 & C, !((_ = C >>> 24) <= l);) {
                if (0 === o) break t;
                o--, u += i[s++] << l, l += 8;
              }

              if (b < 16) u >>>= _, l -= _, r.lens[r.have++] = b;else {
                if (16 === b) {
                  for (z = _ + 2; l < z;) {
                    if (0 === o) break t;
                    o--, u += i[s++] << l, l += 8;
                  }

                  if (u >>>= _, l -= _, 0 === r.have) {
                    t.msg = "invalid bit length repeat", r.mode = 30;
                    break;
                  }

                  k = r.lens[r.have - 1], c = 3 + (3 & u), u >>>= 2, l -= 2;
                } else if (17 === b) {
                  for (z = _ + 3; l < z;) {
                    if (0 === o) break t;
                    o--, u += i[s++] << l, l += 8;
                  }

                  l -= _, k = 0, c = 3 + (7 & (u >>>= _)), u >>>= 3, l -= 3;
                } else {
                  for (z = _ + 7; l < z;) {
                    if (0 === o) break t;
                    o--, u += i[s++] << l, l += 8;
                  }

                  l -= _, k = 0, c = 11 + (127 & (u >>>= _)), u >>>= 7, l -= 7;
                }

                if (r.have + c > r.nlen + r.ndist) {
                  t.msg = "invalid bit length repeat", r.mode = 30;
                  break;
                }

                for (; c--;) r.lens[r.have++] = k;
              }
            }

            if (30 === r.mode) break;

            if (0 === r.lens[256]) {
              t.msg = "invalid code -- missing end-of-block", r.mode = 30;
              break;
            }

            if (r.lenbits = 9, S = {
              bits: r.lenbits
            }, x = T(D, r.lens, 0, r.nlen, r.lencode, 0, r.work, S), r.lenbits = S.bits, x) {
              t.msg = "invalid literal/lengths set", r.mode = 30;
              break;
            }

            if (r.distbits = 6, r.distcode = r.distdyn, S = {
              bits: r.distbits
            }, x = T(F, r.lens, r.nlen, r.ndist, r.distcode, 0, r.work, S), r.distbits = S.bits, x) {
              t.msg = "invalid distances set", r.mode = 30;
              break;
            }

            if (r.mode = 20, 6 === e) break t;

          case 20:
            r.mode = 21;

          case 21:
            if (6 <= o && 258 <= h) {
              t.next_out = a, t.avail_out = h, t.next_in = s, t.avail_in = o, r.hold = u, r.bits = l, R(t, d), a = t.next_out, n = t.output, h = t.avail_out, s = t.next_in, i = t.input, o = t.avail_in, u = r.hold, l = r.bits, 12 === r.mode && (r.back = -1);
              break;
            }

            for (r.back = 0; g = (C = r.lencode[u & (1 << r.lenbits) - 1]) >>> 16 & 255, b = 65535 & C, !((_ = C >>> 24) <= l);) {
              if (0 === o) break t;
              o--, u += i[s++] << l, l += 8;
            }

            if (g && 0 == (240 & g)) {
              for (v = _, y = g, w = b; g = (C = r.lencode[w + ((u & (1 << v + y) - 1) >> v)]) >>> 16 & 255, b = 65535 & C, !(v + (_ = C >>> 24) <= l);) {
                if (0 === o) break t;
                o--, u += i[s++] << l, l += 8;
              }

              u >>>= v, l -= v, r.back += v;
            }

            if (u >>>= _, l -= _, r.back += _, r.length = b, 0 === g) {
              r.mode = 26;
              break;
            }

            if (32 & g) {
              r.back = -1, r.mode = 12;
              break;
            }

            if (64 & g) {
              t.msg = "invalid literal/length code", r.mode = 30;
              break;
            }

            r.extra = 15 & g, r.mode = 22;

          case 22:
            if (r.extra) {
              for (z = r.extra; l < z;) {
                if (0 === o) break t;
                o--, u += i[s++] << l, l += 8;
              }

              r.length += u & (1 << r.extra) - 1, u >>>= r.extra, l -= r.extra, r.back += r.extra;
            }

            r.was = r.length, r.mode = 23;

          case 23:
            for (; g = (C = r.distcode[u & (1 << r.distbits) - 1]) >>> 16 & 255, b = 65535 & C, !((_ = C >>> 24) <= l);) {
              if (0 === o) break t;
              o--, u += i[s++] << l, l += 8;
            }

            if (0 == (240 & g)) {
              for (v = _, y = g, w = b; g = (C = r.distcode[w + ((u & (1 << v + y) - 1) >> v)]) >>> 16 & 255, b = 65535 & C, !(v + (_ = C >>> 24) <= l);) {
                if (0 === o) break t;
                o--, u += i[s++] << l, l += 8;
              }

              u >>>= v, l -= v, r.back += v;
            }

            if (u >>>= _, l -= _, r.back += _, 64 & g) {
              t.msg = "invalid distance code", r.mode = 30;
              break;
            }

            r.offset = b, r.extra = 15 & g, r.mode = 24;

          case 24:
            if (r.extra) {
              for (z = r.extra; l < z;) {
                if (0 === o) break t;
                o--, u += i[s++] << l, l += 8;
              }

              r.offset += u & (1 << r.extra) - 1, u >>>= r.extra, l -= r.extra, r.back += r.extra;
            }

            if (r.offset > r.dmax) {
              t.msg = "invalid distance too far back", r.mode = 30;
              break;
            }

            r.mode = 25;

          case 25:
            if (0 === h) break t;

            if (c = d - h, r.offset > c) {
              if ((c = r.offset - c) > r.whave && r.sane) {
                t.msg = "invalid distance too far back", r.mode = 30;
                break;
              }

              p = c > r.wnext ? (c -= r.wnext, r.wsize - c) : r.wnext - c, c > r.length && (c = r.length), m = r.window;
            } else m = n, p = a - r.offset, c = r.length;

            for (h < c && (c = h), h -= c, r.length -= c; n[a++] = m[p++], --c;);

            0 === r.length && (r.mode = 21);
            break;

          case 26:
            if (0 === h) break t;
            n[a++] = r.length, h--, r.mode = 21;
            break;

          case 27:
            if (r.wrap) {
              for (; l < 32;) {
                if (0 === o) break t;
                o--, u |= i[s++] << l, l += 8;
              }

              if (d -= h, t.total_out += d, r.total += d, d && (t.adler = r.check = r.flags ? B(r.check, n, d, a - d) : O(r.check, n, d, a - d)), d = h, (r.flags ? u : L(u)) !== r.check) {
                t.msg = "incorrect data check", r.mode = 30;
                break;
              }

              l = u = 0;
            }

            r.mode = 28;

          case 28:
            if (r.wrap && r.flags) {
              for (; l < 32;) {
                if (0 === o) break t;
                o--, u += i[s++] << l, l += 8;
              }

              if (u !== (4294967295 & r.total)) {
                t.msg = "incorrect length check", r.mode = 30;
                break;
              }

              l = u = 0;
            }

            r.mode = 29;

          case 29:
            x = 1;
            break t;

          case 30:
            x = -3;
            break t;

          case 31:
            return -4;

          case 32:
          default:
            return U;
        }

        return t.next_out = a, t.avail_out = h, t.next_in = s, t.avail_in = o, r.hold = u, r.bits = l, (r.wsize || d !== t.avail_out && r.mode < 30 && (r.mode < 27 || 4 !== e)) && Z(t, t.output, t.next_out, d - t.avail_out) ? (r.mode = 31, -4) : (f -= t.avail_in, d -= t.avail_out, t.total_in += f, t.total_out += d, r.total += d, r.wrap && d && (t.adler = r.check = r.flags ? B(r.check, n, d, t.next_out - d) : O(r.check, n, d, t.next_out - d)), t.data_type = r.bits + (r.last ? 64 : 0) + (12 === r.mode ? 128 : 0) + (20 === r.mode || 15 === r.mode ? 256 : 0), (0 == f && 0 === d || 4 === e) && x === N && (x = -5), x);
      }, r.inflateEnd = function (t) {
        if (!t || !t.state) return U;
        var e = t.state;
        return e.window && (e.window = null), t.state = null, N;
      }, r.inflateGetHeader = function (t, e) {
        var r;
        return t && t.state ? 0 == (2 & (r = t.state).wrap) ? U : ((r.head = e).done = !1, N) : U;
      }, r.inflateSetDictionary = function (t, e) {
        var r,
            i = e.length;
        return t && t.state ? 0 !== (r = t.state).wrap && 11 !== r.mode ? U : 11 === r.mode && O(1, e, i, 0) !== r.check ? -3 : Z(t, e, i, i) ? (r.mode = 31, -4) : (r.havedict = 1, N) : U;
      }, r.inflateInfo = "pako inflate (from Nodeca project)";
    }, {
      "../utils/common": 41,
      "./adler32": 43,
      "./crc32": 45,
      "./inffast": 48,
      "./inftrees": 50
    }],
    50: [function (t, e, r) {
      "use strict";

      var D = t("../utils/common"),
          F = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0],
          N = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78],
          U = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0],
          P = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];

      e.exports = function (t, e, r, i, n, s, a, o) {
        var h,
            u,
            l,
            f,
            d,
            c,
            p,
            m,
            _,
            g = o.bits,
            b = 0,
            v = 0,
            y = 0,
            w = 0,
            k = 0,
            x = 0,
            S = 0,
            z = 0,
            C = 0,
            E = 0,
            A = null,
            I = 0,
            O = new D.Buf16(16),
            B = new D.Buf16(16),
            R = null,
            T = 0;

        for (b = 0; b <= 15; b++) O[b] = 0;

        for (v = 0; v < i; v++) O[e[r + v]]++;

        for (k = g, w = 15; 1 <= w && 0 === O[w]; w--);

        if (w < k && (k = w), 0 === w) return n[s++] = 20971520, n[s++] = 20971520, o.bits = 1, 0;

        for (y = 1; y < w && 0 === O[y]; y++);

        for (k < y && (k = y), b = z = 1; b <= 15; b++) if (z <<= 1, (z -= O[b]) < 0) return -1;

        if (0 < z && (0 === t || 1 !== w)) return -1;

        for (B[1] = 0, b = 1; b < 15; b++) B[b + 1] = B[b] + O[b];

        for (v = 0; v < i; v++) 0 !== e[r + v] && (a[B[e[r + v]]++] = v);

        if (c = 0 === t ? (A = R = a, 19) : 1 === t ? (A = F, I -= 257, R = N, T -= 257, 256) : (A = U, R = P, -1), b = y, d = s, S = v = E = 0, l = -1, f = (C = 1 << (x = k)) - 1, 1 === t && 852 < C || 2 === t && 592 < C) return 1;

        for (;;) {
          for (p = b - S, _ = a[v] < c ? (m = 0, a[v]) : a[v] > c ? (m = R[T + a[v]], A[I + a[v]]) : (m = 96, 0), h = 1 << b - S, y = u = 1 << x; n[d + (E >> S) + (u -= h)] = p << 24 | m << 16 | _ | 0, 0 !== u;);

          for (h = 1 << b - 1; E & h;) h >>= 1;

          if (0 !== h ? (E &= h - 1, E += h) : E = 0, v++, 0 == --O[b]) {
            if (b === w) break;
            b = e[r + a[v]];
          }

          if (k < b && (E & f) !== l) {
            for (0 === S && (S = k), d += y, z = 1 << (x = b - S); x + S < w && !((z -= O[x + S]) <= 0);) x++, z <<= 1;

            if (C += 1 << x, 1 === t && 852 < C || 2 === t && 592 < C) return 1;
            n[l = E & f] = k << 24 | x << 16 | d - s | 0;
          }
        }

        return 0 !== E && (n[d + E] = b - S << 24 | 64 << 16 | 0), o.bits = k, 0;
      };
    }, {
      "../utils/common": 41
    }],
    51: [function (t, e, r) {
      "use strict";

      e.exports = {
        2: "need dictionary",
        1: "stream end",
        0: "",
        "-1": "file error",
        "-2": "stream error",
        "-3": "data error",
        "-4": "insufficient memory",
        "-5": "buffer error",
        "-6": "incompatible version"
      };
    }, {}],
    52: [function (t, e, r) {
      "use strict";

      var n = t("../utils/common"),
          o = 0,
          h = 1;

      function i(t) {
        for (var e = t.length; 0 <= --e;) t[e] = 0;
      }

      var s = 0,
          a = 29,
          u = 256,
          l = u + 1 + a,
          f = 30,
          d = 19,
          _ = 2 * l + 1,
          g = 15,
          c = 16,
          p = 7,
          m = 256,
          b = 16,
          v = 17,
          y = 18,
          w = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0],
          k = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13],
          x = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7],
          S = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
          z = new Array(2 * (l + 2));

      i(z);
      var C = new Array(2 * f);
      i(C);
      var E = new Array(512);
      i(E);
      var A = new Array(256);
      i(A);
      var I = new Array(a);
      i(I);
      var O,
          B,
          R,
          T = new Array(f);

      function D(t, e, r, i, n) {
        this.static_tree = t, this.extra_bits = e, this.extra_base = r, this.elems = i, this.max_length = n, this.has_stree = t && t.length;
      }

      function F(t, e) {
        this.dyn_tree = t, this.max_code = 0, this.stat_desc = e;
      }

      function N(t) {
        return t < 256 ? E[t] : E[256 + (t >>> 7)];
      }

      function U(t, e) {
        t.pending_buf[t.pending++] = 255 & e, t.pending_buf[t.pending++] = e >>> 8 & 255;
      }

      function P(t, e, r) {
        t.bi_valid > c - r ? (t.bi_buf |= e << t.bi_valid & 65535, U(t, t.bi_buf), t.bi_buf = e >> c - t.bi_valid, t.bi_valid += r - c) : (t.bi_buf |= e << t.bi_valid & 65535, t.bi_valid += r);
      }

      function L(t, e, r) {
        P(t, r[2 * e], r[2 * e + 1]);
      }

      function j(t, e) {
        for (var r = 0; r |= 1 & t, t >>>= 1, r <<= 1, 0 < --e;);

        return r >>> 1;
      }

      function Z(t, e, r) {
        var i,
            n,
            s = new Array(g + 1),
            a = 0;

        for (i = 1; i <= g; i++) s[i] = a = a + r[i - 1] << 1;

        for (n = 0; n <= e; n++) {
          var o = t[2 * n + 1];
          0 !== o && (t[2 * n] = j(s[o]++, o));
        }
      }

      function W(t) {
        var e;

        for (e = 0; e < l; e++) t.dyn_ltree[2 * e] = 0;

        for (e = 0; e < f; e++) t.dyn_dtree[2 * e] = 0;

        for (e = 0; e < d; e++) t.bl_tree[2 * e] = 0;

        t.dyn_ltree[2 * m] = 1, t.opt_len = t.static_len = 0, t.last_lit = t.matches = 0;
      }

      function M(t) {
        8 < t.bi_valid ? U(t, t.bi_buf) : 0 < t.bi_valid && (t.pending_buf[t.pending++] = t.bi_buf), t.bi_buf = 0, t.bi_valid = 0;
      }

      function H(t, e, r, i) {
        var n = 2 * e,
            s = 2 * r;
        return t[n] < t[s] || t[n] === t[s] && i[e] <= i[r];
      }

      function G(t, e, r) {
        for (var i = t.heap[r], n = r << 1; n <= t.heap_len && (n < t.heap_len && H(e, t.heap[n + 1], t.heap[n], t.depth) && n++, !H(e, i, t.heap[n], t.depth));) t.heap[r] = t.heap[n], r = n, n <<= 1;

        t.heap[r] = i;
      }

      function K(t, e, r) {
        var i,
            n,
            s,
            a,
            o = 0;
        if (0 !== t.last_lit) for (; i = t.pending_buf[t.d_buf + 2 * o] << 8 | t.pending_buf[t.d_buf + 2 * o + 1], n = t.pending_buf[t.l_buf + o], o++, 0 === i ? L(t, n, e) : (L(t, (s = A[n]) + u + 1, e), 0 !== (a = w[s]) && P(t, n -= I[s], a), L(t, s = N(--i), r), 0 !== (a = k[s]) && P(t, i -= T[s], a)), o < t.last_lit;);
        L(t, m, e);
      }

      function Y(t, e) {
        var r,
            i,
            n,
            s = e.dyn_tree,
            a = e.stat_desc.static_tree,
            o = e.stat_desc.has_stree,
            h = e.stat_desc.elems,
            u = -1;

        for (t.heap_len = 0, t.heap_max = _, r = 0; r < h; r++) 0 !== s[2 * r] ? (t.heap[++t.heap_len] = u = r, t.depth[r] = 0) : s[2 * r + 1] = 0;

        for (; t.heap_len < 2;) s[2 * (n = t.heap[++t.heap_len] = u < 2 ? ++u : 0)] = 1, t.depth[n] = 0, t.opt_len--, o && (t.static_len -= a[2 * n + 1]);

        for (e.max_code = u, r = t.heap_len >> 1; 1 <= r; r--) G(t, s, r);

        for (n = h; r = t.heap[1], t.heap[1] = t.heap[t.heap_len--], G(t, s, 1), i = t.heap[1], t.heap[--t.heap_max] = r, t.heap[--t.heap_max] = i, s[2 * n] = s[2 * r] + s[2 * i], t.depth[n] = (t.depth[r] >= t.depth[i] ? t.depth[r] : t.depth[i]) + 1, s[2 * r + 1] = s[2 * i + 1] = n, t.heap[1] = n++, G(t, s, 1), 2 <= t.heap_len;);

        t.heap[--t.heap_max] = t.heap[1], function (t, e) {
          var r,
              i,
              n,
              s,
              a,
              o,
              h = e.dyn_tree,
              u = e.max_code,
              l = e.stat_desc.static_tree,
              f = e.stat_desc.has_stree,
              d = e.stat_desc.extra_bits,
              c = e.stat_desc.extra_base,
              p = e.stat_desc.max_length,
              m = 0;

          for (s = 0; s <= g; s++) t.bl_count[s] = 0;

          for (h[2 * t.heap[t.heap_max] + 1] = 0, r = t.heap_max + 1; r < _; r++) p < (s = h[2 * h[2 * (i = t.heap[r]) + 1] + 1] + 1) && (s = p, m++), h[2 * i + 1] = s, u < i || (t.bl_count[s]++, a = 0, c <= i && (a = d[i - c]), o = h[2 * i], t.opt_len += o * (s + a), f && (t.static_len += o * (l[2 * i + 1] + a)));

          if (0 !== m) {
            do {
              for (s = p - 1; 0 === t.bl_count[s];) s--;

              t.bl_count[s]--, t.bl_count[s + 1] += 2, t.bl_count[p]--, m -= 2;
            } while (0 < m);

            for (s = p; 0 !== s; s--) for (i = t.bl_count[s]; 0 !== i;) u < (n = t.heap[--r]) || (h[2 * n + 1] !== s && (t.opt_len += (s - h[2 * n + 1]) * h[2 * n], h[2 * n + 1] = s), i--);
          }
        }(t, e), Z(s, u, t.bl_count);
      }

      function X(t, e, r) {
        var i,
            n,
            s = -1,
            a = e[1],
            o = 0,
            h = 7,
            u = 4;

        for (0 === a && (h = 138, u = 3), e[2 * (r + 1) + 1] = 65535, i = 0; i <= r; i++) n = a, a = e[2 * (i + 1) + 1], ++o < h && n === a || (o < u ? t.bl_tree[2 * n] += o : 0 !== n ? (n !== s && t.bl_tree[2 * n]++, t.bl_tree[2 * b]++) : o <= 10 ? t.bl_tree[2 * v]++ : t.bl_tree[2 * y]++, s = n, u = (o = 0) === a ? (h = 138, 3) : n === a ? (h = 6, 3) : (h = 7, 4));
      }

      function V(t, e, r) {
        var i,
            n,
            s = -1,
            a = e[1],
            o = 0,
            h = 7,
            u = 4;

        for (0 === a && (h = 138, u = 3), i = 0; i <= r; i++) if (n = a, a = e[2 * (i + 1) + 1], !(++o < h && n === a)) {
          if (o < u) for (; L(t, n, t.bl_tree), 0 != --o;);else 0 !== n ? (n !== s && (L(t, n, t.bl_tree), o--), L(t, b, t.bl_tree), P(t, o - 3, 2)) : o <= 10 ? (L(t, v, t.bl_tree), P(t, o - 3, 3)) : (L(t, y, t.bl_tree), P(t, o - 11, 7));
          s = n, u = (o = 0) === a ? (h = 138, 3) : n === a ? (h = 6, 3) : (h = 7, 4);
        }
      }

      i(T);
      var q = !1;

      function J(t, e, r, i) {
        P(t, (s << 1) + (i ? 1 : 0), 3), function (t, e, r, i) {
          M(t), i && (U(t, r), U(t, ~r)), n.arraySet(t.pending_buf, t.window, e, r, t.pending), t.pending += r;
        }(t, e, r, !0);
      }

      r._tr_init = function (t) {
        q || (function () {
          var t,
              e,
              r,
              i,
              n,
              s = new Array(g + 1);

          for (i = r = 0; i < a - 1; i++) for (I[i] = r, t = 0; t < 1 << w[i]; t++) A[r++] = i;

          for (A[r - 1] = i, i = n = 0; i < 16; i++) for (T[i] = n, t = 0; t < 1 << k[i]; t++) E[n++] = i;

          for (n >>= 7; i < f; i++) for (T[i] = n << 7, t = 0; t < 1 << k[i] - 7; t++) E[256 + n++] = i;

          for (e = 0; e <= g; e++) s[e] = 0;

          for (t = 0; t <= 143;) z[2 * t + 1] = 8, t++, s[8]++;

          for (; t <= 255;) z[2 * t + 1] = 9, t++, s[9]++;

          for (; t <= 279;) z[2 * t + 1] = 7, t++, s[7]++;

          for (; t <= 287;) z[2 * t + 1] = 8, t++, s[8]++;

          for (Z(z, l + 1, s), t = 0; t < f; t++) C[2 * t + 1] = 5, C[2 * t] = j(t, 5);

          O = new D(z, w, u + 1, l, g), B = new D(C, k, 0, f, g), R = new D(new Array(0), x, 0, d, p);
        }(), q = !0), t.l_desc = new F(t.dyn_ltree, O), t.d_desc = new F(t.dyn_dtree, B), t.bl_desc = new F(t.bl_tree, R), t.bi_buf = 0, t.bi_valid = 0, W(t);
      }, r._tr_stored_block = J, r._tr_flush_block = function (t, e, r, i) {
        var n,
            s,
            a = 0;
        0 < t.level ? (2 === t.strm.data_type && (t.strm.data_type = function (t) {
          var e,
              r = 4093624447;

          for (e = 0; e <= 31; e++, r >>>= 1) if (1 & r && 0 !== t.dyn_ltree[2 * e]) return o;

          if (0 !== t.dyn_ltree[18] || 0 !== t.dyn_ltree[20] || 0 !== t.dyn_ltree[26]) return h;

          for (e = 32; e < u; e++) if (0 !== t.dyn_ltree[2 * e]) return h;

          return o;
        }(t)), Y(t, t.l_desc), Y(t, t.d_desc), a = function (t) {
          var e;

          for (X(t, t.dyn_ltree, t.l_desc.max_code), X(t, t.dyn_dtree, t.d_desc.max_code), Y(t, t.bl_desc), e = d - 1; 3 <= e && 0 === t.bl_tree[2 * S[e] + 1]; e--);

          return t.opt_len += 3 * (e + 1) + 5 + 5 + 4, e;
        }(t), n = t.opt_len + 3 + 7 >>> 3, (s = t.static_len + 3 + 7 >>> 3) <= n && (n = s)) : n = s = r + 5, r + 4 <= n && -1 !== e ? J(t, e, r, i) : 4 === t.strategy || s === n ? (P(t, 2 + (i ? 1 : 0), 3), K(t, z, C)) : (P(t, 4 + (i ? 1 : 0), 3), function (t, e, r, i) {
          var n;

          for (P(t, e - 257, 5), P(t, r - 1, 5), P(t, i - 4, 4), n = 0; n < i; n++) P(t, t.bl_tree[2 * S[n] + 1], 3);

          V(t, t.dyn_ltree, e - 1), V(t, t.dyn_dtree, r - 1);
        }(t, t.l_desc.max_code + 1, t.d_desc.max_code + 1, a + 1), K(t, t.dyn_ltree, t.dyn_dtree)), W(t), i && M(t);
      }, r._tr_tally = function (t, e, r) {
        return t.pending_buf[t.d_buf + 2 * t.last_lit] = e >>> 8 & 255, t.pending_buf[t.d_buf + 2 * t.last_lit + 1] = 255 & e, t.pending_buf[t.l_buf + t.last_lit] = 255 & r, t.last_lit++, 0 === e ? t.dyn_ltree[2 * r]++ : (t.matches++, e--, t.dyn_ltree[2 * (A[r] + u + 1)]++, t.dyn_dtree[2 * N(e)]++), t.last_lit === t.lit_bufsize - 1;
      }, r._tr_align = function (t) {
        P(t, 2, 3), L(t, m, z), function (t) {
          16 === t.bi_valid ? (U(t, t.bi_buf), t.bi_buf = 0, t.bi_valid = 0) : 8 <= t.bi_valid && (t.pending_buf[t.pending++] = 255 & t.bi_buf, t.bi_buf >>= 8, t.bi_valid -= 8);
        }(t);
      };
    }, {
      "../utils/common": 41
    }],
    53: [function (t, e, r) {
      "use strict";

      e.exports = function () {
        this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
      };
    }, {}],
    54: [function (t, e, r) {
      "use strict";

      e.exports = "function" == typeof setImmediate ? setImmediate : function () {
        var t = [].slice.apply(arguments);
        t.splice(1, 0, 0), setTimeout.apply(null, t);
      };
    }, {}]
  }, {}, [10])(10);
});

/***/ }),

/***/ 8094:
/*!******************************************************************!*\
  !*** ./node_modules/read-excel-file/modules/read/coordinates.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "calculateDimensions": () => (/* binding */ calculateDimensions),
/* harmony export */   "parseCellCoordinates": () => (/* binding */ parseCellCoordinates)
/* harmony export */ });
// Maps "A1"-like coordinates to `{ row, column }` numeric coordinates.
var LETTERS = ["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
function calculateDimensions(cells) {
  var comparator = function comparator(a, b) {
    return a - b;
  };

  var allRows = cells.map(function (cell) {
    return cell.row;
  }).sort(comparator);
  var allCols = cells.map(function (cell) {
    return cell.column;
  }).sort(comparator);
  var minRow = allRows[0];
  var maxRow = allRows[allRows.length - 1];
  var minCol = allCols[0];
  var maxCol = allCols[allCols.length - 1];
  return [{
    row: minRow,
    column: minCol
  }, {
    row: maxRow,
    column: maxCol
  }];
} // Converts a letter coordinate to a digit coordinate.
// Examples: "A" -> 1, "B" -> 2, "Z" -> 26, "AA" -> 27, etc.

function columnLettersToNumber(columnLetters) {
  // `for ... of ...` would require Babel polyfill for iterating a string.
  var n = 0;
  var i = 0;

  while (i < columnLetters.length) {
    n *= 26;
    n += LETTERS.indexOf(columnLetters[i]);
    i++;
  }

  return n;
}

function parseCellCoordinates(coords) {
  // Coordinate examples: "AA2091", "R988", "B1".
  coords = coords.split(/(\d+)/);
  return [// Row.
  parseInt(coords[1]), // Column.
  columnLettersToNumber(coords[0].trim())];
}


/***/ }),

/***/ 9766:
/*!***********************************************************************!*\
  !*** ./node_modules/read-excel-file/modules/read/dropEmptyColumns.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ dropEmptyColumns)
/* harmony export */ });
function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function dropEmptyColumns(data) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$accessor = _ref.accessor,
      accessor = _ref$accessor === void 0 ? function (_) {
    return _;
  } : _ref$accessor,
      onlyTrimAtTheEnd = _ref.onlyTrimAtTheEnd;

  var i = data[0].length - 1;

  while (i >= 0) {
    var empty = true;

    for (var _iterator = _createForOfIteratorHelperLoose(data), _step; !(_step = _iterator()).done;) {
      var row = _step.value;

      if (accessor(row[i]) !== null) {
        empty = false;
        break;
      }
    }

    if (empty) {
      var j = 0;

      while (j < data.length) {
        data[j].splice(i, 1);
        j++;
      }
    } else if (onlyTrimAtTheEnd) {
      break;
    }

    i--;
  }

  return data;
}


/***/ }),

/***/ 88:
/*!********************************************************************!*\
  !*** ./node_modules/read-excel-file/modules/read/dropEmptyRows.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ dropEmptyRows)
/* harmony export */ });
function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function dropEmptyRows(data) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      rowMap = _ref.rowMap,
      _ref$accessor = _ref.accessor,
      accessor = _ref$accessor === void 0 ? function (_) {
    return _;
  } : _ref$accessor,
      onlyTrimAtTheEnd = _ref.onlyTrimAtTheEnd;

  // Drop empty rows.
  var i = data.length - 1;

  while (i >= 0) {
    // Check if the row is empty.
    var empty = true;

    for (var _iterator = _createForOfIteratorHelperLoose(data[i]), _step; !(_step = _iterator()).done;) {
      var cell = _step.value;

      if (accessor(cell) !== null) {
        empty = false;
        break;
      }
    } // Remove the empty row.


    if (empty) {
      data.splice(i, 1);

      if (rowMap) {
        rowMap.splice(i, 1);
      }
    } else if (onlyTrimAtTheEnd) {
      break;
    }

    i--;
  }

  return data;
}


/***/ }),

/***/ 8538:
/*!**************************************************************!*\
  !*** ./node_modules/read-excel-file/modules/read/getData.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getData)
/* harmony export */ });
/* harmony import */ var _dropEmptyRows__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dropEmptyRows */ 88);
/* harmony import */ var _dropEmptyColumns__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dropEmptyColumns */ 9766);
function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



function getData(sheet, options) {
  var dimensions = sheet.dimensions,
      cells = sheet.cells; // If the sheet is empty.

  if (cells.length === 0) {
    return [];
  }

  var _dimensions = _slicedToArray(dimensions, 2),
      leftTop = _dimensions[0],
      rightBottom = _dimensions[1]; // Don't discard empty rows or columns at the start.
  // https://github.com/catamphetamine/read-excel-file/issues/102
  // const colsCount = (rightBottom.column - leftTop.column) + 1
  // const rowsCount = (rightBottom.row - leftTop.row) + 1


  var colsCount = rightBottom.column;
  var rowsCount = rightBottom.row; // Initialize spreadsheet data structure.

  var data = new Array(rowsCount);
  var i = 0;

  while (i < rowsCount) {
    data[i] = new Array(colsCount);
    var j = 0;

    while (j < colsCount) {
      data[i][j] = null;
      j++;
    }

    i++;
  } // Fill in spreadsheet `data`.
  // (this code implies that `cells` aren't necessarily sorted by row and column:
  //  maybe that's not correct, this piece code was initially copy-pasted
  //  from some other library that used `XPath`)


  for (var _iterator = _createForOfIteratorHelperLoose(cells), _step; !(_step = _iterator()).done;) {
    var cell = _step.value;
    // Don't discard empty rows or columns at the start.
    // https://github.com/catamphetamine/read-excel-file/issues/102
    // const rowIndex = cell.row - leftTop.row
    // const columnIndex = cell.column - leftTop.column
    var rowIndex = cell.row - 1;
    var columnIndex = cell.column - 1; // Ignore the data in the cell if it's outside of the spreadsheet's "dimensions".

    if (columnIndex < colsCount && rowIndex < rowsCount) {
      data[rowIndex][columnIndex] = cell.value;
    }
  } // Fill in the row map.


  var rowMap = options.rowMap;

  if (rowMap) {
    var _i2 = 0;

    while (_i2 < data.length) {
      rowMap[_i2] = _i2;
      _i2++;
    }
  } // Drop empty columns or rows.


  data = (0,_dropEmptyRows__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_dropEmptyColumns__WEBPACK_IMPORTED_MODULE_1__["default"])(data, {
    onlyTrimAtTheEnd: true
  }), {
    onlyTrimAtTheEnd: true,
    rowMap: rowMap
  }); // Optionally transform data before applying `schema`.

  if (options.transformData) {
    data = options.transformData(data); // data = options.transformData(data, {
    //   dropEmptyRowsAndColumns(data) {
    //     return dropEmptyRows(dropEmptyColumns(data), { rowMap })
    //   }
    // })
  }

  return data;
}


/***/ }),

/***/ 9452:
/*!****************************************************************!*\
  !*** ./node_modules/read-excel-file/modules/read/parseCell.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ parseCell)
/* harmony export */ });
/* harmony import */ var _parseCellValue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./parseCellValue */ 823);
/* harmony import */ var _coordinates__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./coordinates */ 8094);
/* harmony import */ var _xml_xlsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../xml/xlsx */ 7907);


 // Example of a `<c/>`ell element:
//
// <c>
//    <f>string</f> — formula.
//    <v>string</v> — formula pre-computed value.
//    <is>
//       <t>string</t> — an `inlineStr` string (rather than a "common string" from a dictionary).
//       <r>
//          <rPr>
//            ...
//          </rPr>
//          <t>string</t>
//       </r>
//       <rPh sb="1" eb="1">
//          <t>string</t>
//       </rPh>
//       <phoneticPr fontId="1"/>
//    </is>
//    <extLst>
//       <ext>
//          <!--any element-->
//       </ext>
//    </extLst>
// </c>
//

function parseCell(node, sheet, xml, values, styles, properties, options) {
  var coords = (0,_coordinates__WEBPACK_IMPORTED_MODULE_0__.parseCellCoordinates)(node.getAttribute('r'));
  var valueElement = (0,_xml_xlsx__WEBPACK_IMPORTED_MODULE_1__.getCellValue)(sheet, node); // For `xpath`, `value` can be `undefined` while for native `DOMParser` it's `null`.
  // So using `value && ...` instead of `if (value !== undefined) { ... }` here
  // for uniform compatibility with both `xpath` and native `DOMParser`.

  var value = valueElement && valueElement.textContent;
  var type;

  if (node.hasAttribute('t')) {
    type = node.getAttribute('t');
  }

  return {
    row: coords[0],
    column: coords[1],
    value: (0,_parseCellValue__WEBPACK_IMPORTED_MODULE_2__["default"])(value, type, {
      getInlineStringValue: function getInlineStringValue() {
        return (0,_xml_xlsx__WEBPACK_IMPORTED_MODULE_1__.getCellInlineStringValue)(sheet, node);
      },
      getStyleId: function getStyleId() {
        return node.getAttribute('s');
      },
      styles: styles,
      values: values,
      properties: properties,
      options: options
    })
  };
}


/***/ }),

/***/ 823:
/*!*********************************************************************!*\
  !*** ./node_modules/read-excel-file/modules/read/parseCellValue.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getCellValue)
/* harmony export */ });
/* harmony import */ var _parseDate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parseDate */ 185);
function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

 // https://hexdocs.pm/xlsxir/number_styles.html

var BUILT_IN_DATE_NUMBER_FORMAT_IDS = [14, 15, 16, 17, 18, 19, 20, 21, 22, 27, 30, 36, 45, 46, 47, 50, 57];
function getCellValue(value, type, _ref) {
  var getInlineStringValue = _ref.getInlineStringValue,
      getStyleId = _ref.getStyleId,
      styles = _ref.styles,
      values = _ref.values,
      properties = _ref.properties,
      options = _ref.options;

  if (!type) {
    // Default cell type is "n" (numeric).
    // http://www.datypic.com/sc/ooxml/t-ssml_CT_Cell.html
    type = 'n';
  } // Available Excel cell types:
  // https://github.com/SheetJS/sheetjs/blob/19620da30be2a7d7b9801938a0b9b1fd3c4c4b00/docbits/52_datatype.md
  //
  // Some other document (seems to be old):
  // http://webapp.docx4java.org/OnlineDemo/ecma376/SpreadsheetML/ST_CellType.html
  //


  switch (type) {
    // If the cell contains formula string.
    case 'str':
      value = value.trim();

      if (value === '') {
        value = undefined;
      }

      break;
    // If the cell contains an "inline" (not "shared") string.

    case 'inlineStr':
      value = getInlineStringValue();

      if (value === undefined) {
        throw new Error("Unsupported \"inline string\" cell value structure"); // : ${cellNode.textContent}`)
      }

      value = value.trim();

      if (value === '') {
        value = undefined;
      }

      break;
    // If the cell contains a "shared" string.
    // "Shared" strings is a way for an Excel editor to reduce
    // the file size by storing "commonly used" strings in a dictionary
    // and then referring to such strings by their index in that dictionary.

    case 's':
      // If a cell has no value then there's no `<c/>` element for it.
      // If a `<c/>` element exists then it's not empty.
      // The `<v/>`alue is a key in the "shared strings" dictionary of the
      // XLSX file, so look it up in the `values` dictionary by the numeric key.
      value = values[parseInt(value)];
      value = value.trim();

      if (value === '') {
        value = undefined;
      }

      break;

    case 'b':
      value = value === '1' ? true : false;
      break;
    // Stub: blank stub cell that is ignored by data processing utilities.

    case 'z':
      value = undefined;
      break;
    // Error: `value` is a numeric code.
    // They also wrote: "and `w` property stores its common name".
    // It's unclear what they meant by that.

    case 'e':
      value = decodeError(value);
      break;
    // Date: a string to be parsed as a date.
    // (usually a string in "ISO 8601" format)

    case 'd':
      if (value === undefined) {
        break;
      }

      value = new Date(value);
      break;

    case 'n':
      if (value === undefined) {
        break;
      }

      value = parseFloat(value); // XLSX does have "d" type for dates, but it's not commonly used.
      // Instead, spreadsheets prefer using "n" type for dates for some reason.
      //
      // In such cases, sometimes a "date" type could be heuristically detected
      // by looking at such numeric value "format" and seeing if it's a date-specific one.
      // https://github.com/catamphetamine/read-excel-file/issues/3#issuecomment-395770777
      //
      // The list of generic numeric value "formats":
      // https://xlsxwriter.readthedocs.io/format.html#format-set-num-format
      //

      var styleId = getStyleId();

      if (styleId) {
        // styleId = parseInt(styleId)
        var style = styles[styleId];

        if (!style) {
          throw new Error("Cell style not found: ".concat(styleId));
        }

        if (BUILT_IN_DATE_NUMBER_FORMAT_IDS.indexOf(parseInt(style.numberFormat.id)) >= 0 || options.dateFormat && style.numberFormat.template === options.dateFormat || options.smartDateParser !== false && style.numberFormat.template && isDateTemplate(style.numberFormat.template)) {
          value = (0,_parseDate__WEBPACK_IMPORTED_MODULE_0__["default"])(value, properties);
        }
      }

      break;

    default:
      throw new TypeError("Cell type not supported: ".concat(type));
  } // Convert empty values to `null`.


  if (value === undefined) {
    value = null;
  }

  return value;
} // Decodes numeric error code to a string code.
// https://github.com/SheetJS/sheetjs/blob/19620da30be2a7d7b9801938a0b9b1fd3c4c4b00/docbits/52_datatype.md

function decodeError(errorCode) {
  // While the error values are determined by the application,
  // the following are some example error values that could be used:
  switch (errorCode) {
    case 0x00:
      return '#NULL!';

    case 0x07:
      return '#DIV/0!';

    case 0x0F:
      return '#VALUE!';

    case 0x17:
      return '#REF!';

    case 0x1D:
      return '#NAME?';

    case 0x24:
      return '#NUM!';

    case 0x2A:
      return '#N/A';

    case 0x2B:
      return '#GETTING_DATA';

    default:
      // Such error code doesn't exist. I made it up.
      return "#ERROR_".concat(errorCode);
  }
}

function isDateTemplate(template) {
  // Date format tokens could be in upper case or in lower case.
  // There seems to be no single standard.
  // So lowercase the template first.
  template = template.toLowerCase();
  var tokens = template.split(/\W+/);

  for (var _iterator = _createForOfIteratorHelperLoose(tokens), _step; !(_step = _iterator()).done;) {
    var token = _step.value;

    if (DATE_TEMPLATE_TOKENS.indexOf(token) < 0) {
      return false;
    }
  }

  return true;
} // These tokens could be in upper case or in lower case.
// There seems to be no single standard, so using lower case.


var DATE_TEMPLATE_TOKENS = [// Seconds (min two digits). Example: "05".
'ss', // Minutes (min two digits). Example: "05". Could also be "Months". Weird.
'mm', // Hours. Example: "1".
'h', // Hours (min two digits). Example: "01".
'hh', // "AM" part of "AM/PM". Lowercased just in case.
'am', // "PM" part of "AM/PM". Lowercased just in case.
'pm', // Day. Example: "1"
'd', // Day (min two digits). Example: "01"
'dd', // Month (numeric). Example: "1".
'm', // Month (numeric, min two digits). Example: "01". Could also be "Minutes". Weird.
'mm', // Month (shortened month name). Example: "Jan".
'mmm', // Month (full month name). Example: "January".
'mmmm', // Two-digit year. Example: "20".
'yy', // Full year. Example: "2020".
'yyyy'];


/***/ }),

/***/ 7671:
/*!*****************************************************************!*\
  !*** ./node_modules/read-excel-file/modules/read/parseCells.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ parseCells)
/* harmony export */ });
/* harmony import */ var _parseCell__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parseCell */ 9452);
/* harmony import */ var _xml_xlsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../xml/xlsx */ 7907);


function parseCells(sheet, xml, values, styles, properties, options) {
  var cells = (0,_xml_xlsx__WEBPACK_IMPORTED_MODULE_0__.getCells)(sheet);

  if (cells.length === 0) {
    return [];
  } // const mergedCells = getMergedCells(sheet)
  // for (const mergedCell of mergedCells) {
  //   const [from, to] = mergedCell.split(':').map(parseCellCoordinates)
  //   console.log('Merged Cell.', 'From:', from, 'To:', to)
  // }


  return cells.map(function (node) {
    return (0,_parseCell__WEBPACK_IMPORTED_MODULE_1__["default"])(node, sheet, xml, values, styles, properties, options);
  });
}


/***/ }),

/***/ 185:
/*!****************************************************************!*\
  !*** ./node_modules/read-excel-file/modules/read/parseDate.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ parseExcelDate)
/* harmony export */ });
// Parses an Excel Date ("serial") into a
// corresponding javascript Date in UTC+0 timezone.
// (with time equal to 00:00)
//
// Doesn't account for leap seconds.
// Therefore is not 100% correct.
// But will do, I guess, since we're
// not doing rocket science here.
//
// https://www.pcworld.com/article/3063622/software/mastering-excel-date-time-serial-numbers-networkdays-datevalue-and-more.html
// "If you need to calculate dates in your spreadsheets,
//  Excel uses its own unique system, which it calls Serial Numbers".
//
function parseExcelDate(excelSerialDate, options) {
  // https://support.microsoft.com/en-gb/help/214330/differences-between-the-1900-and-the-1904-date-system-in-excel
  if (options && options.epoch1904) {
    excelSerialDate += 1462;
  } // "Excel serial date" is just
  // the count of days since `01/01/1900`
  // (seems that it may be even fractional).
  //
  // The count of days elapsed
  // since `01/01/1900` (Excel epoch)
  // till `01/01/1970` (Unix epoch).
  // Accounts for leap years
  // (19 of them, yielding 19 extra days).


  var daysBeforeUnixEpoch = 70 * 365 + 19; // An hour, approximately, because a minute
  // may be longer than 60 seconds, see "leap seconds".

  var hour = 60 * 60 * 1000;
  return new Date(Math.round((excelSerialDate - daysBeforeUnixEpoch) * 24 * hour));
}


/***/ }),

/***/ 8366:
/*!**********************************************************************!*\
  !*** ./node_modules/read-excel-file/modules/read/parseDimensions.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ parseDimensions)
/* harmony export */ });
/* harmony import */ var _coordinates__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./coordinates */ 8094);
/* harmony import */ var _xml_xlsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../xml/xlsx */ 7907);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


 // `dimensions` defines the spreadsheet area containing all non-empty cells.
// https://docs.microsoft.com/en-us/dotnet/api/documentformat.openxml.spreadsheet.sheetdimension?view=openxml-2.8.1

function parseDimensions(sheet) {
  var dimensions = (0,_xml_xlsx__WEBPACK_IMPORTED_MODULE_0__.getDimensions)(sheet);

  if (dimensions) {
    dimensions = dimensions.split(':').map(_coordinates__WEBPACK_IMPORTED_MODULE_1__.parseCellCoordinates).map(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          row = _ref2[0],
          column = _ref2[1];

      return {
        row: row,
        column: column
      };
    }); // Sometimes there can be just a single cell as a spreadsheet's "dimensions".
    // For example, the default "dimensions" in Apache POI library is "A1",
    // meaning that only the first cell in the spreadsheet is used.
    //
    // A quote from Apache POI library:
    // "Single cell ranges are formatted like single cell references (e.g. 'A1' instead of 'A1:A1')."
    //

    if (dimensions.length === 1) {
      dimensions = [dimensions[0], dimensions[0]];
    }

    return dimensions;
  }
}


/***/ }),

/***/ 2070:
/*!*********************************************************************!*\
  !*** ./node_modules/read-excel-file/modules/read/parseFilePaths.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ parseFilePaths)
/* harmony export */ });
/* harmony import */ var _xml_xlsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../xml/xlsx */ 7907);

/**
 * Returns sheet file paths.
 * Seems that the correct place to look for the `sheetId` -> `filename` mapping
 * is `xl/_rels/workbook.xml.rels` file.
 * https://github.com/tidyverse/readxl/issues/104
 * @param  {string} content — `xl/_rels/workbook.xml.rels` file contents.
 * @param  {object} xml
 * @return {object}
 */

function parseFilePaths(content, xml) {
  // Example:
  // <Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  //   ...
  //   <Relationship
  //     Id="rId3"
  //     Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet"
  //     Target="worksheets/sheet1.xml"/>
  // </Relationships>
  var document = xml.createDocument(content);
  var filePaths = {
    sheets: {},
    sharedStrings: undefined,
    styles: undefined
  };

  var addFilePathInfo = function addFilePathInfo(relationship) {
    var filePath = relationship.getAttribute('Target');
    var fileType = relationship.getAttribute('Type');

    switch (fileType) {
      case 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles':
        filePaths.styles = getFilePath(filePath);
        break;

      case 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings':
        filePaths.sharedStrings = getFilePath(filePath);
        break;

      case 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet':
        filePaths.sheets[relationship.getAttribute('Id')] = getFilePath(filePath);
        break;
    }
  };

  (0,_xml_xlsx__WEBPACK_IMPORTED_MODULE_0__.getRelationships)(document).forEach(addFilePathInfo); // Seems like "sharedStrings.xml" is not required to exist.
  // For example, when the spreadsheet doesn't contain any strings.
  // https://github.com/catamphetamine/read-excel-file/issues/85
  // if (!filePaths.sharedStrings) {
  //   throw new Error('"sharedStrings.xml" file not found in the *.xlsx file')
  // }

  return filePaths;
}

function getFilePath(path) {
  // Normally, `path` is a relative path inside the ZIP archive,
  // like "worksheets/sheet1.xml", or "sharedStrings.xml", or "styles.xml".
  // There has been one weird case when file path was an absolute path,
  // like "/xl/worksheets/sheet1.xml" (specifically for sheets):
  // https://github.com/catamphetamine/read-excel-file/pull/95
  // Other libraries (like `xlsx`) and software (like Google Docs)
  // seem to support such absolute file paths, so this library does too.
  if (path[0] === '/') {
    return path.slice('/'.length);
  } // // Seems like a path could also be a URL.
  // // http://officeopenxml.com/anatomyofOOXML-xlsx.php
  // if (/^[a-z]+\:\/\//.test(path)) {
  //   return path
  // }


  return 'xl/' + path;
}


/***/ }),

/***/ 7750:
/*!**********************************************************************!*\
  !*** ./node_modules/read-excel-file/modules/read/parseProperties.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ parseProperties)
/* harmony export */ });
/* harmony import */ var _xml_xlsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../xml/xlsx */ 7907);
 // I guess `xl/workbook.xml` file should always be present inside the *.xlsx archive.

function parseProperties(content, xml) {
  var book = xml.createDocument(content);
  var properties = {}; // Read `<workbookPr/>` element to detect whether dates are 1900-based or 1904-based.
  // https://support.microsoft.com/en-gb/help/214330/differences-between-the-1900-and-the-1904-date-system-in-excel
  // http://webapp.docx4java.org/OnlineDemo/ecma376/SpreadsheetML/workbookPr.html

  var workbookProperties = (0,_xml_xlsx__WEBPACK_IMPORTED_MODULE_0__.getWorkbookProperties)(book);

  if (workbookProperties && workbookProperties.getAttribute('date1904') === '1') {
    properties.epoch1904 = true;
  } // Get sheets info (indexes, names, if they're available).
  // Example:
  // <sheets>
  //   <sheet
  //     xmlns:ns="http://schemas.openxmlformats.org/officeDocument/2006/relationships"
  //     name="Sheet1"
  //     sheetId="1"
  //     ns:id="rId3"/>
  // </sheets>
  // http://www.datypic.com/sc/ooxml/e-ssml_sheet-1.html


  properties.sheets = [];

  var addSheetInfo = function addSheetInfo(sheet) {
    if (sheet.getAttribute('name')) {
      properties.sheets.push({
        id: sheet.getAttribute('sheetId'),
        name: sheet.getAttribute('name'),
        relationId: sheet.getAttribute('r:id')
      });
    }
  };

  (0,_xml_xlsx__WEBPACK_IMPORTED_MODULE_0__.getSheets)(book).forEach(addSheetInfo);
  return properties;
}


/***/ }),

/***/ 1083:
/*!*************************************************************************!*\
  !*** ./node_modules/read-excel-file/modules/read/parseSharedStrings.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ parseSharedStrings)
/* harmony export */ });
/* harmony import */ var _xml_xlsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../xml/xlsx */ 7907);

function parseSharedStrings(content, xml) {
  if (!content) {
    return [];
  }

  return (0,_xml_xlsx__WEBPACK_IMPORTED_MODULE_0__.getSharedStrings)(xml.createDocument(content));
}


/***/ }),

/***/ 4059:
/*!*****************************************************************!*\
  !*** ./node_modules/read-excel-file/modules/read/parseSheet.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ parseSheet)
/* harmony export */ });
/* harmony import */ var _parseCells__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parseCells */ 7671);
/* harmony import */ var _parseDimensions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parseDimensions */ 8366);
/* harmony import */ var _coordinates__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./coordinates */ 8094);



function parseSheet(content, xml, values, styles, properties, options) {
  var sheet = xml.createDocument(content);
  var cells = (0,_parseCells__WEBPACK_IMPORTED_MODULE_0__["default"])(sheet, xml, values, styles, properties, options); // `dimensions` defines the spreadsheet area containing all non-empty cells.
  // https://docs.microsoft.com/en-us/dotnet/api/documentformat.openxml.spreadsheet.sheetdimension?view=openxml-2.8.1

  var dimensions = (0,_parseDimensions__WEBPACK_IMPORTED_MODULE_1__["default"])(sheet) || (0,_coordinates__WEBPACK_IMPORTED_MODULE_2__.calculateDimensions)(cells);
  return {
    cells: cells,
    dimensions: dimensions
  };
}


/***/ }),

/***/ 4643:
/*!******************************************************************!*\
  !*** ./node_modules/read-excel-file/modules/read/parseStyles.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ parseStyles)
/* harmony export */ });
/* harmony import */ var _xml_xlsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../xml/xlsx */ 7907);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

 // http://officeopenxml.com/SSstyles.php
// Returns an array of cell styles.
// A cell style index is its ID.

function parseStyles(content, xml) {
  if (!content) {
    return {};
  } // https://social.msdn.microsoft.com/Forums/sqlserver/en-US/708978af-b598-45c4-a598-d3518a5a09f0/howwhen-is-cellstylexfs-vs-cellxfs-applied-to-a-cell?forum=os_binaryfile
  // https://www.office-forums.com/threads/cellxfs-cellstylexfs.2163519/


  var doc = xml.createDocument(content);
  var baseStyles = (0,_xml_xlsx__WEBPACK_IMPORTED_MODULE_0__.getBaseStyles)(doc).map(parseCellStyle);
  var numberFormats = (0,_xml_xlsx__WEBPACK_IMPORTED_MODULE_0__.getNumberFormats)(doc).map(parseNumberFormatStyle).reduce(function (formats, format) {
    // Format ID is a numeric index.
    // There're some standard "built-in" formats (in Excel) up to about `100`.
    formats[format.id] = format;
    return formats;
  }, []);

  var getCellStyle = function getCellStyle(xf) {
    if (xf.hasAttribute('xfId')) {
      return _objectSpread(_objectSpread({}, baseStyles[xf.xfId]), parseCellStyle(xf, numberFormats));
    }

    return parseCellStyle(xf, numberFormats);
  };

  return (0,_xml_xlsx__WEBPACK_IMPORTED_MODULE_0__.getCellStyles)(doc).map(getCellStyle);
}

function parseNumberFormatStyle(numFmt) {
  return {
    id: numFmt.getAttribute('numFmtId'),
    template: numFmt.getAttribute('formatCode')
  };
} // http://www.datypic.com/sc/ooxml/e-ssml_xf-2.html


function parseCellStyle(xf, numFmts) {
  var style = {};

  if (xf.hasAttribute('numFmtId')) {
    var numberFormatId = xf.getAttribute('numFmtId'); // Built-in number formats don't have a `<numFmt/>` element in `styles.xml`.
    // https://hexdocs.pm/xlsxir/number_styles.html

    if (numFmts[numberFormatId]) {
      style.numberFormat = numFmts[numberFormatId];
    } else {
      style.numberFormat = {
        id: numberFormatId
      };
    }
  }

  return style;
}


/***/ }),

/***/ 3150:
/*!***************************************************************!*\
  !*** ./node_modules/read-excel-file/modules/read/readXlsx.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ readXlsx)
/* harmony export */ });
/* harmony import */ var _parseProperties__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./parseProperties */ 7750);
/* harmony import */ var _parseFilePaths__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parseFilePaths */ 2070);
/* harmony import */ var _parseStyles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./parseStyles */ 4643);
/* harmony import */ var _parseSharedStrings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parseSharedStrings */ 1083);
/* harmony import */ var _parseSheet__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./parseSheet */ 4059);
/* harmony import */ var _getData__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./getData */ 8538);
function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






 // For an introduction in reading `*.xlsx` files see "The minimum viable XLSX reader":
// https://www.brendanlong.com/the-minimum-viable-xlsx-reader.html

/**
 * Reads an (unzipped) XLSX file structure into a 2D array of cells.
 * @param  {object} contents - A list of XML files inside XLSX file (which is a zipped directory).
 * @param  {number?} options.sheet - Workbook sheet id (`1` by default).
 * @param  {string?} options.dateFormat - Date format, e.g. "mm/dd/yyyy". Values having this format template set will be parsed as dates.
 * @param  {object} contents - A list of XML files inside XLSX file (which is a zipped directory).
 * @return {object} An object of shape `{ data, cells, properties }`. `data: string[][]` is an array of rows, each row being an array of cell values. `cells: string[][]` is an array of rows, each row being an array of cells. `properties: object` is the spreadsheet properties (e.g. whether date epoch is 1904 instead of 1900).
 */

function readXlsx(contents, xml) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (!options.sheet) {
    options = _objectSpread({
      sheet: 1
    }, options);
  }

  var getXmlFileContent = function getXmlFileContent(filePath) {
    if (!contents[filePath]) {
      throw new Error("\"".concat(filePath, "\" file not found inside the *.xlsx file zip archive"));
    }

    return contents[filePath];
  }; // Some Excel editors don't want to use standard naming scheme for sheet files.
  // https://github.com/tidyverse/readxl/issues/104


  var filePaths = (0,_parseFilePaths__WEBPACK_IMPORTED_MODULE_0__["default"])(getXmlFileContent('xl/_rels/workbook.xml.rels'), xml); // Default file path for "shared strings": "xl/sharedStrings.xml".

  var values = filePaths.sharedStrings ? (0,_parseSharedStrings__WEBPACK_IMPORTED_MODULE_1__["default"])(getXmlFileContent(filePaths.sharedStrings), xml) : []; // Default file path for "styles": "xl/styles.xml".

  var styles = filePaths.styles ? (0,_parseStyles__WEBPACK_IMPORTED_MODULE_2__["default"])(getXmlFileContent(filePaths.styles), xml) : {};
  var properties = (0,_parseProperties__WEBPACK_IMPORTED_MODULE_3__["default"])(getXmlFileContent('xl/workbook.xml'), xml); // A feature for getting the list of sheets in an Excel file.
  // https://github.com/catamphetamine/read-excel-file/issues/14

  if (options.getSheets) {
    return properties.sheets.map(function (_ref) {
      var name = _ref.name;
      return {
        name: name
      };
    });
  } // Find the sheet by name, or take the first one.


  var sheetId = getSheetId(options.sheet, properties.sheets); // If the sheet wasn't found then throw an error.
  // Example: "xl/worksheets/sheet1.xml".

  if (!sheetId || !filePaths.sheets[sheetId]) {
    throw createSheetNotFoundError(options.sheet, properties.sheets);
  } // Parse sheet data.


  var sheet = (0,_parseSheet__WEBPACK_IMPORTED_MODULE_4__["default"])(getXmlFileContent(filePaths.sheets[sheetId]), xml, values, styles, properties, options); // Get spreadsheet data.

  var data = (0,_getData__WEBPACK_IMPORTED_MODULE_5__["default"])(sheet, options); // Can return properties, if required.

  if (options.properties) {
    return {
      data: data,
      properties: properties
    };
  } // Return spreadsheet data.


  return data;
}

function getSheetId(sheet, sheets) {
  if (typeof sheet === 'number') {
    var _sheet = sheets[sheet - 1];
    return _sheet && _sheet.relationId;
  }

  for (var _iterator = _createForOfIteratorHelperLoose(sheets), _step; !(_step = _iterator()).done;) {
    var _sheet2 = _step.value;

    if (_sheet2.name === sheet) {
      return _sheet2.relationId;
    }
  }
}

function createSheetNotFoundError(sheet, sheets) {
  var sheetsList = sheets && sheets.map(function (sheet, i) {
    return "\"".concat(sheet.name, "\" (#").concat(i + 1, ")");
  }).join(', ');
  return new Error("Sheet ".concat(typeof sheet === 'number' ? '#' + sheet : '"' + sheet + '"', " not found in the *.xlsx file.").concat(sheets ? ' Available sheets: ' + sheetsList + '.' : ''));
}


/***/ }),

/***/ 9770:
/*!**************************************************************************!*\
  !*** ./node_modules/read-excel-file/modules/read/readXlsxFileBrowser.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ readXlsxFile)
/* harmony export */ });
/* harmony import */ var _xml_xmlBrowser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../xml/xmlBrowser */ 706);
/* harmony import */ var _unpackXlsxFileBrowser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./unpackXlsxFileBrowser */ 2623);
/* harmony import */ var _readXlsxFileContents__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./readXlsxFileContents */ 701);



/**
 * Reads XLSX file into a 2D array of cells in a browser.
 * @param  {file} file - A file being uploaded in the browser.
 * @param  {object?} options
 * @param  {(number|string)?} options.sheet - Excel document sheet to read. Defaults to `1`. Will only read this sheet and skip others.
 * @return {Promise} Resolves to a 2D array of cells: an array of rows, each row being an array of cells.
 */

function readXlsxFile(file) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return (0,_unpackXlsxFileBrowser__WEBPACK_IMPORTED_MODULE_0__["default"])(file).then(function (entries) {
    return (0,_readXlsxFileContents__WEBPACK_IMPORTED_MODULE_1__["default"])(entries, _xml_xmlBrowser__WEBPACK_IMPORTED_MODULE_2__["default"], options);
  });
}


/***/ }),

/***/ 701:
/*!***************************************************************************!*\
  !*** ./node_modules/read-excel-file/modules/read/readXlsxFileContents.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ readXlsxFileContents)
/* harmony export */ });
/* harmony import */ var _readXlsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./readXlsx */ 3150);
/* harmony import */ var _schema_convertToJson__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./schema/convertToJson */ 9907);
/* harmony import */ var _schema_convertMapToSchema__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./schema/convertMapToSchema */ 1798);
var _excluded = ["schema", "map"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }




function readXlsxFileContents(entries, xml, _ref) {
  var schema = _ref.schema,
      map = _ref.map,
      options = _objectWithoutProperties(_ref, _excluded);

  if (!schema && map) {
    schema = (0,_schema_convertMapToSchema__WEBPACK_IMPORTED_MODULE_0__["default"])(map);
  }

  var result = (0,_readXlsx__WEBPACK_IMPORTED_MODULE_1__["default"])(entries, xml, _objectSpread(_objectSpread({}, options), {}, {
    properties: schema || options.properties
  }));

  if (schema) {
    return (0,_schema_convertToJson__WEBPACK_IMPORTED_MODULE_2__["default"])(result.data, schema, _objectSpread(_objectSpread({}, options), {}, {
      properties: result.properties
    }));
  }

  return result;
}


/***/ }),

/***/ 1798:
/*!********************************************************************************!*\
  !*** ./node_modules/read-excel-file/modules/read/schema/convertMapToSchema.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ convertMapToSchema)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function convertMapToSchema(map) {
  var schema = {};

  for (var _i = 0, _Object$keys = Object.keys(map); _i < _Object$keys.length; _i++) {
    var key = _Object$keys[_i];
    var prop = map[key];
    var type = void 0;

    if (_typeof(prop) === 'object') {
      prop = Object.keys(map[key])[0];
      type = convertMapToSchema(map[key][prop]);
    }

    schema[key] = {
      prop: prop
    };

    if (type) {
      schema[key].type = type;
    }
  }

  return schema;
}


/***/ }),

/***/ 9907:
/*!***************************************************************************!*\
  !*** ./node_modules/read-excel-file/modules/read/schema/convertToJson.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "parseValue": () => (/* binding */ parseValue),
/* harmony export */   "getBlock": () => (/* binding */ getBlock),
/* harmony export */   "parseArray": () => (/* binding */ parseArray)
/* harmony export */ });
/* harmony import */ var _parseDate__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../parseDate */ 185);
/* harmony import */ var _types_Integer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../types/Integer */ 6311);
/* harmony import */ var _types_URL__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../types/URL */ 6401);
/* harmony import */ var _types_Email__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../types/Email */ 5242);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var DEFAULT_OPTIONS = {
  isColumnOriented: false
};
/**
 * Convert 2D array to nested objects.
 * If row oriented data, row 0 is dotted key names.
 * Column oriented data is transposed.
 * @param {any[][]} data - An array of rows, each row being an array of cells.
 * @param {object} schema
 * @return {object[]}
 */

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(data, schema, options) {
  if (options) {
    options = _objectSpread(_objectSpread({}, DEFAULT_OPTIONS), options);
  } else {
    options = DEFAULT_OPTIONS;
  }

  var _options = options,
      isColumnOriented = _options.isColumnOriented,
      rowMap = _options.rowMap;
  validateSchema(schema);

  if (isColumnOriented) {
    data = transpose(data);
  }

  var columns = data[0];
  var results = [];
  var errors = [];

  for (var i = 1; i < data.length; i++) {
    var result = read(schema, data[i], i - 1, columns, errors, options);

    if (result) {
      results.push(result);
    }
  } // Correct error rows.


  if (rowMap) {
    for (var _iterator = _createForOfIteratorHelperLoose(errors), _step; !(_step = _iterator()).done;) {
      var error = _step.value;
      // Convert the `row` index in `data` to the
      // actual `row` index in the spreadsheet.
      // The `1` compensates for the header row.
      error.row = rowMap[error.row] + 1;
    }
  }

  return {
    rows: results,
    errors: errors
  };
}

function read(schema, row, rowIndex, columns, errors, options) {
  var object = {};

  var _loop = function _loop() {
    var key = _Object$keys[_i];
    var schemaEntry = schema[key];
    var isNestedSchema = _typeof(schemaEntry.type) === 'object' && !Array.isArray(schemaEntry.type);
    var rawValue = row[columns.indexOf(key)];

    if (rawValue === undefined) {
      rawValue = null;
    }

    var value = void 0;
    var error = void 0;

    if (isNestedSchema) {
      value = read(schemaEntry.type, row, rowIndex, columns, errors, options);
    } else {
      if (rawValue === null) {
        value = null;
      } else if (Array.isArray(schemaEntry.type)) {
        var notEmpty = false;
        var array = parseArray(rawValue).map(function (_value) {
          var result = parseValue(_value, schemaEntry, options);

          if (result.error) {
            value = _value;
            error = result.error;
          }

          if (result.value !== null) {
            notEmpty = true;
          }

          return result.value;
        });

        if (!error) {
          value = notEmpty ? array : null;
        }
      } else {
        var result = parseValue(rawValue, schemaEntry, options);
        error = result.error;
        value = error ? rawValue : result.value;
      }
    }

    if (!error && value === null && schemaEntry.required) {
      error = 'required';
    }

    if (error) {
      error = {
        error: error,
        row: rowIndex + 1,
        column: key,
        value: value
      };

      if (schemaEntry.type) {
        error.type = schemaEntry.type;
      }

      errors.push(error);
    } else if (value !== null) {
      object[schemaEntry.prop] = value;
    }
  };

  for (var _i = 0, _Object$keys = Object.keys(schema); _i < _Object$keys.length; _i++) {
    _loop();
  }

  if (Object.keys(object).length > 0) {
    return object;
  }

  return null;
}
/**
 * Converts textual value to a javascript typed value.
 * @param  {any} value
 * @param  {object} schemaEntry
 * @return {{ value: any, error: string }}
 */


function parseValue(value, schemaEntry, options) {
  if (value === null) {
    return {
      value: null
    };
  }

  var result;

  if (schemaEntry.parse) {
    result = parseCustomValue(value, schemaEntry.parse);
  } else if (schemaEntry.type) {
    result = parseValueOfType(value, // Supports parsing array types.
    // See `parseArray()` function for more details.
    // Example `type`: String[]
    // Input: 'Barack Obama, "String, with, colons", Donald Trump'
    // Output: ['Barack Obama', 'String, with, colons', 'Donald Trump']
    Array.isArray(schemaEntry.type) ? schemaEntry.type[0] : schemaEntry.type, options);
  } else {
    result = {
      value: value
    }; // throw new Error('Invalid schema entry: no .type and no .parse():\n\n' + JSON.stringify(schemaEntry, null, 2))
  } // If errored then return the error.


  if (result.error) {
    return result;
  }

  if (result.value !== null) {
    if (schemaEntry.oneOf && schemaEntry.oneOf.indexOf(result.value) < 0) {
      return {
        error: 'invalid'
      };
    }

    if (schemaEntry.validate) {
      try {
        schemaEntry.validate(result.value);
      } catch (error) {
        return {
          error: error.message
        };
      }
    }
  }

  return result;
}
/**
 * Converts textual value to a custom value using supplied `.parse()`.
 * @param  {any} value
 * @param  {function} parse
 * @return {{ value: any, error: string }}
 */

function parseCustomValue(value, parse) {
  try {
    value = parse(value);

    if (value === undefined) {
      return {
        value: null
      };
    }

    return {
      value: value
    };
  } catch (error) {
    return {
      error: error.message
    };
  }
}
/**
 * Converts textual value to a javascript typed value.
 * @param  {any} value
 * @param  {} type
 * @return {{ value: (string|number|Date|boolean), error: string }}
 */


function parseValueOfType(value, type, options) {
  switch (type) {
    case String:
      if (typeof value === 'string') {
        return {
          value: value
        };
      } // The global `isFinite()` function filters out:
      // * NaN
      // * -Infinity
      // * Infinity
      // All other values pass (including non-numbers).


      if (typeof value === 'number') {
        if (isFinite(value)) {
          return {
            value: String(value)
          };
        }
      }

      return {
        error: 'invalid'
      };

    case Number:
    case _types_Integer__WEBPACK_IMPORTED_MODULE_0__["default"]:
      // Convert strings to numbers.
      // Just an additional feature.
      // Won't happen when called from `readXlsx()`.
      if (typeof value === 'string') {
        var stringifiedValue = value;
        value = parseFloat(value);

        if (String(value) !== stringifiedValue) {
          return {
            error: 'invalid'
          };
        }
      } else if (typeof value !== 'number') {
        return {
          error: 'invalid'
        };
      } // The global `isFinite()` function filters out:
      // * NaN
      // * -Infinity
      // * Infinity
      // All other values pass (including non-numbers).
      // At this point, `value` can only be a number.


      if (!isFinite(value)) {
        return {
          error: 'invalid'
        };
      }

      if (type === _types_Integer__WEBPACK_IMPORTED_MODULE_0__["default"] && !(0,_types_Integer__WEBPACK_IMPORTED_MODULE_0__.isInteger)(value)) {
        return {
          error: 'invalid'
        };
      }

      return {
        value: value
      };

    case _types_URL__WEBPACK_IMPORTED_MODULE_1__["default"]:
      if (typeof value === 'string') {
        if ((0,_types_URL__WEBPACK_IMPORTED_MODULE_1__.isURL)(value)) {
          return {
            value: value
          };
        }
      }

      return {
        error: 'invalid'
      };

    case _types_Email__WEBPACK_IMPORTED_MODULE_2__["default"]:
      if (typeof value === 'string') {
        if ((0,_types_Email__WEBPACK_IMPORTED_MODULE_2__.isEmail)(value)) {
          return {
            value: value
          };
        }
      }

      return {
        error: 'invalid'
      };

    case Date:
      // XLSX has no specific format for dates.
      // Sometimes a date can be heuristically detected.
      // https://github.com/catamphetamine/read-excel-file/issues/3#issuecomment-395770777
      if (value instanceof Date) {
        return {
          value: value
        };
      }

      if (typeof value === 'number') {
        if (!isFinite(value)) {
          return {
            error: 'invalid'
          };
        }

        value = parseInt(value);
        var date = (0,_parseDate__WEBPACK_IMPORTED_MODULE_3__["default"])(value, options.properties);

        if (!date) {
          return {
            error: 'invalid'
          };
        }

        return {
          value: date
        };
      }

      return {
        error: 'invalid'
      };

    case Boolean:
      if (typeof value === 'boolean') {
        return {
          value: value
        };
      }

      return {
        error: 'invalid'
      };

    default:
      if (typeof type === 'function') {
        return parseCustomValue(value, type);
      }

      throw new Error("Unknown schema type: ".concat(type && type.name || type));
  }
}

function getBlock(string, endCharacter, startIndex) {
  var i = 0;
  var substring = '';
  var character;

  while (startIndex + i < string.length) {
    var _character = string[startIndex + i];

    if (_character === endCharacter) {
      return [substring, i];
    } else if (_character === '"') {
      var block = getBlock(string, '"', startIndex + i + 1);
      substring += block[0];
      i += '"'.length + block[1] + '"'.length;
    } else {
      substring += _character;
      i++;
    }
  }

  return [substring, i];
}
/**
 * Parses a string of comma-separated substrings into an array of substrings.
 * (the `export` is just for tests)
 * @param  {string} string — A string of comma-separated substrings.
 * @return {string[]} An array of substrings.
 */

function parseArray(string) {
  var blocks = [];
  var index = 0;

  while (index < string.length) {
    var _getBlock = getBlock(string, ',', index),
        _getBlock2 = _slicedToArray(_getBlock, 2),
        substring = _getBlock2[0],
        length = _getBlock2[1];

    index += length + ','.length;
    blocks.push(substring.trim());
  }

  return blocks;
} // Transpose a 2D array.
// https://stackoverflow.com/questions/17428587/transposing-a-2d-array-in-javascript

var transpose = function transpose(array) {
  return array[0].map(function (_, i) {
    return array.map(function (row) {
      return row[i];
    });
  });
};

function validateSchema(schema) {
  for (var _i2 = 0, _Object$keys2 = Object.keys(schema); _i2 < _Object$keys2.length; _i2++) {
    var key = _Object$keys2[_i2];
    var entry = schema[key];

    if (!entry.prop) {
      throw new Error("\"prop\" not defined for schema entry \"".concat(key, "\"."));
    }
  }
}


/***/ }),

/***/ 2623:
/*!****************************************************************************!*\
  !*** ./node_modules/read-excel-file/modules/read/unpackXlsxFileBrowser.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ unpackXlsxFile)
/* harmony export */ });
/* harmony import */ var jszip__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jszip */ 8997);
/* harmony import */ var jszip__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jszip__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Reads XLSX file in a browser.
 * @param  {file} file - A file being uploaded in the browser.
 * @return {Promise} Resolves to an object holding XLSX file entries.
 */

function unpackXlsxFile(file) {
  var files = {};
  return jszip__WEBPACK_IMPORTED_MODULE_0___default().loadAsync(file).then(function (zip) {
    var files = [];
    zip.forEach(function (relativePath, zipEntry) {
      if (!zipEntry.dir) {
        files.push(zipEntry.name);
      }
    });
    var entries = {};
    return Promise.all(files.map(function (file) {
      return zip.file(file).async('string').then(function (content) {
        return entries[file] = content;
      });
    })).then(function () {
      return entries;
    });
  });
}

/***/ }),

/***/ 5242:
/*!*************************************************************!*\
  !*** ./node_modules/read-excel-file/modules/types/Email.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Email),
/* harmony export */   "isEmail": () => (/* binding */ isEmail)
/* harmony export */ });
function Email() {}
var regexp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
function isEmail(value) {
  return regexp.test(value);
}


/***/ }),

/***/ 6311:
/*!***************************************************************!*\
  !*** ./node_modules/read-excel-file/modules/types/Integer.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Integer),
/* harmony export */   "isInteger": () => (/* binding */ isInteger)
/* harmony export */ });
function Integer() {}
function isInteger(x) {
  // https://stackoverflow.com/questions/14636536/how-to-check-if-a-variable-is-an-integer-in-javascript
  return (x | 0) === x;
}


/***/ }),

/***/ 6401:
/*!***********************************************************!*\
  !*** ./node_modules/read-excel-file/modules/types/URL.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ URL),
/* harmony export */   "isURL": () => (/* binding */ isURL)
/* harmony export */ });
function URL() {} // URL regexp explanation:
//
// /^
//
// 	(?:
// 	  // Matches optional "http(s):" or "ftp:":
// 		(?:
// 			(?:https?|ftp):
// 		)?
//
// 	  // Matches "//" (required):
// 		\/\/
// 	)
//
// 	// Matches a valid non-local IP address:
// 	(?:
// 		(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])
// 		(?:
// 			\.
// 			(?:1?\d{1,2}|2[0-4]\d|25[0-5])
// 		){2}
// 		(?:
// 			\.
// 			(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4])
// 		)
//
// 	  // Or,
// 		|
//
// 	  // Matches an alpha-numeric domain name.
// 		(?:
// 			(?:
// 				[a-z0-9\u00a1-\uffff]
// 				[a-z0-9\u00a1-\uffff_-]{0,62}
// 			)?
// 			[a-z0-9\u00a1-\uffff]
// 			\.
// 		)*
// 		(?:
// 	    // Domain zone: "com", "net", etc (required):
// 			[a-z\u00a1-\uffff]{2,}
// 		)
// 	)
//
// 	// Matches a colon and a port number:
// 	(?::\d{2,5})?
//
// 	// Matches everything after the "origin":
// 	// * pathname
// 	// * query
// 	// * hash
// 	(?:[/?#]\S*)?
//
// $/i

var regexp = /^(?:(?:(?:https?|ftp):)?\/\/)(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)*(?:[a-z\u00a1-\uffff]{2,}))(?::\d{2,5})?(?:[/?#]\S*)?$/i; // https://stackoverflow.com/questions/8667070/javascript-regular-expression-to-validate-url

function isURL(value) {
  return regexp.test(value);
}


/***/ }),

/***/ 9154:
/*!*********************************************************!*\
  !*** ./node_modules/read-excel-file/modules/xml/dom.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "findChild": () => (/* binding */ findChild),
/* harmony export */   "findChildren": () => (/* binding */ findChildren),
/* harmony export */   "forEach": () => (/* binding */ forEach),
/* harmony export */   "map": () => (/* binding */ map),
/* harmony export */   "getTagName": () => (/* binding */ getTagName)
/* harmony export */ });
function findChild(node, tagName) {
  var i = 0;

  while (i < node.childNodes.length) {
    var childNode = node.childNodes[i]; // `nodeType: 1` means "Element".
    // https://www.w3schools.com/xml/prop_element_nodetype.asp

    if (childNode.nodeType === 1 && getTagName(childNode) === tagName) {
      return childNode;
    }

    i++;
  }
}
function findChildren(node, tagName) {
  var results = [];
  var i = 0;

  while (i < node.childNodes.length) {
    var childNode = node.childNodes[i]; // `nodeType: 1` means "Element".
    // https://www.w3schools.com/xml/prop_element_nodetype.asp

    if (childNode.nodeType === 1 && getTagName(childNode) === tagName) {
      results.push(childNode);
    }

    i++;
  }

  return results;
}
function forEach(node, tagName, func) {
  // if (typeof tagName === 'function') {
  // 	func = tagName
  // 	tagName = undefined
  // }
  var i = 0;

  while (i < node.childNodes.length) {
    var childNode = node.childNodes[i];

    if (tagName) {
      // `nodeType: 1` means "Element".
      // https://www.w3schools.com/xml/prop_element_nodetype.asp
      if (childNode.nodeType === 1 && getTagName(childNode) === tagName) {
        func(childNode, i);
      }
    } else {
      func(childNode, i);
    }

    i++;
  }
}
function map(node, tagName, func) {
  var results = [];
  forEach(node, tagName, function (node, i) {
    results.push(func(node, i));
  });
  return results;
}
var NAMESPACE_REG_EXP = /.+\:/;
function getTagName(element) {
  // For some weird reason, if an element is declared as,
  // for example, `<x:sheets/>`, then its `.tagName` will be
  // "x:sheets" instead of just "sheets".
  // https://gitlab.com/catamphetamine/read-excel-file/-/issues/25
  // Its not clear how to tell it to ignore any namespaces
  // when getting `.tagName`, so just replacing anything
  // before a colon, if any.
  return element.tagName.replace(NAMESPACE_REG_EXP, '');
}


/***/ }),

/***/ 7907:
/*!**********************************************************!*\
  !*** ./node_modules/read-excel-file/modules/xml/xlsx.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getCells": () => (/* binding */ getCells),
/* harmony export */   "getMergedCells": () => (/* binding */ getMergedCells),
/* harmony export */   "getCellValue": () => (/* binding */ getCellValue),
/* harmony export */   "getCellInlineStringValue": () => (/* binding */ getCellInlineStringValue),
/* harmony export */   "getDimensions": () => (/* binding */ getDimensions),
/* harmony export */   "getBaseStyles": () => (/* binding */ getBaseStyles),
/* harmony export */   "getCellStyles": () => (/* binding */ getCellStyles),
/* harmony export */   "getNumberFormats": () => (/* binding */ getNumberFormats),
/* harmony export */   "getSharedStrings": () => (/* binding */ getSharedStrings),
/* harmony export */   "getWorkbookProperties": () => (/* binding */ getWorkbookProperties),
/* harmony export */   "getRelationships": () => (/* binding */ getRelationships),
/* harmony export */   "getSheets": () => (/* binding */ getSheets)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ 9154);

function getCells(document) {
  var worksheet = document.documentElement;
  var sheetData = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.findChild)(worksheet, 'sheetData');
  var cells = [];
  (0,_dom__WEBPACK_IMPORTED_MODULE_0__.forEach)(sheetData, 'row', function (row) {
    (0,_dom__WEBPACK_IMPORTED_MODULE_0__.forEach)(row, 'c', function (cell) {
      cells.push(cell);
    });
  });
  return cells;
}
function getMergedCells(document) {
  var worksheet = document.documentElement;
  var mergedCells = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.findChild)(worksheet, 'mergeCells');
  var mergedCellsInfo = [];

  if (mergedCells) {
    (0,_dom__WEBPACK_IMPORTED_MODULE_0__.forEach)(mergedCells, 'mergeCell', function (mergedCell) {
      mergedCellsInfo.push(mergedCell.getAttribute('ref'));
    });
  }

  return mergedCellsInfo;
}
function getCellValue(document, node) {
  return (0,_dom__WEBPACK_IMPORTED_MODULE_0__.findChild)(node, 'v');
}
function getCellInlineStringValue(document, node) {
  if (node.firstChild && (0,_dom__WEBPACK_IMPORTED_MODULE_0__.getTagName)(node.firstChild) === 'is' && node.firstChild.firstChild && (0,_dom__WEBPACK_IMPORTED_MODULE_0__.getTagName)(node.firstChild.firstChild) === 't') {
    return node.firstChild.firstChild.textContent;
  }
}
function getDimensions(document) {
  var worksheet = document.documentElement;
  var dimensions = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.findChild)(worksheet, 'dimension');

  if (dimensions) {
    return dimensions.getAttribute('ref');
  }
}
function getBaseStyles(document) {
  var styleSheet = document.documentElement;
  var cellStyleXfs = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.findChild)(styleSheet, 'cellStyleXfs');

  if (cellStyleXfs) {
    return (0,_dom__WEBPACK_IMPORTED_MODULE_0__.findChildren)(cellStyleXfs, 'xf');
  }

  return [];
}
function getCellStyles(document) {
  var styleSheet = document.documentElement;
  var cellXfs = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.findChild)(styleSheet, 'cellXfs');

  if (!cellXfs) {
    return [];
  }

  return (0,_dom__WEBPACK_IMPORTED_MODULE_0__.findChildren)(cellXfs, 'xf');
}
function getNumberFormats(document) {
  var styleSheet = document.documentElement;
  var numberFormats = [];
  var numFmts = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.findChild)(styleSheet, 'numFmts');

  if (numFmts) {
    return (0,_dom__WEBPACK_IMPORTED_MODULE_0__.findChildren)(numFmts, 'numFmt');
  }

  return [];
}
function getSharedStrings(document) {
  // An `<si/>` element can contain a `<t/>` (simplest case) or a set of `<r/>` ("rich formatting") elements having `<t/>`.
  // https://docs.microsoft.com/en-us/dotnet/api/documentformat.openxml.spreadsheet.sharedstringitem?redirectedfrom=MSDN&view=openxml-2.8.1
  // http://www.datypic.com/sc/ooxml/e-ssml_si-1.html
  var sst = document.documentElement;
  return (0,_dom__WEBPACK_IMPORTED_MODULE_0__.map)(sst, 'si', function (string) {
    var t = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.findChild)(string, 't');

    if (t) {
      return t.textContent;
    }

    var value = '';
    (0,_dom__WEBPACK_IMPORTED_MODULE_0__.forEach)(string, 'r', function (r) {
      value += (0,_dom__WEBPACK_IMPORTED_MODULE_0__.findChild)(r, 't').textContent;
    });
    return value;
  });
}
function getWorkbookProperties(document) {
  var workbook = document.documentElement;
  return (0,_dom__WEBPACK_IMPORTED_MODULE_0__.findChild)(workbook, 'workbookPr');
}
function getRelationships(document) {
  var relationships = document.documentElement;
  return (0,_dom__WEBPACK_IMPORTED_MODULE_0__.findChildren)(relationships, 'Relationship');
}
function getSheets(document) {
  var workbook = document.documentElement;
  var sheets = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.findChild)(workbook, 'sheets');
  return (0,_dom__WEBPACK_IMPORTED_MODULE_0__.findChildren)(sheets, 'sheet');
}


/***/ }),

/***/ 706:
/*!****************************************************************!*\
  !*** ./node_modules/read-excel-file/modules/xml/xmlBrowser.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  createDocument: function createDocument(content) {
    // if (!content) {
    // 	throw new Error('No *.xml content')
    // }
    // A weird bug: it won't parse XML unless it's trimmed.
    // https://github.com/catamphetamine/read-excel-file/issues/21
    return new DOMParser().parseFromString(content.trim(), 'text/xml');
  }
});


/***/ }),

/***/ 5590:
/*!*********************************************************!*\
  !*** ./src/app/inventaire/inventaire-routing.module.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InventairePageRoutingModule": () => (/* binding */ InventairePageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 8806);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 3252);
/* harmony import */ var _inventaire_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./inventaire.page */ 1907);




const routes = [
    {
        path: '',
        component: _inventaire_page__WEBPACK_IMPORTED_MODULE_0__.InventairePage
    }
];
let InventairePageRoutingModule = class InventairePageRoutingModule {
};
InventairePageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], InventairePageRoutingModule);



/***/ }),

/***/ 7703:
/*!*************************************************!*\
  !*** ./src/app/inventaire/inventaire.module.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InventairePageModule": () => (/* binding */ InventairePageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 8806);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 8267);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 8346);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 8099);
/* harmony import */ var _inventaire_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./inventaire-routing.module */ 5590);
/* harmony import */ var _inventaire_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./inventaire.page */ 1907);







let InventairePageModule = class InventairePageModule {
};
InventairePageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _inventaire_routing_module__WEBPACK_IMPORTED_MODULE_0__.InventairePageRoutingModule
        ],
        declarations: [_inventaire_page__WEBPACK_IMPORTED_MODULE_1__.InventairePage]
    })
], InventairePageModule);



/***/ }),

/***/ 1907:
/*!***********************************************!*\
  !*** ./src/app/inventaire/inventaire.page.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InventairePage": () => (/* binding */ InventairePage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 8806);
/* harmony import */ var _Users_macbookpro_Desktop_wms_mobilee_node_modules_ngtools_webpack_src_loaders_direct_resource_js_inventaire_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./inventaire.page.html */ 7672);
/* harmony import */ var _inventaire_page_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./inventaire.page.scss */ 2692);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var read_excel_file__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! read-excel-file */ 9770);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ 8099);






let InventairePage = class InventairePage {
    constructor(toastController, platform, modalController) {
        this.toastController = toastController;
        this.platform = platform;
        this.modalController = modalController;
        this.inventaireTab = [];
    }
    ngOnInit() {
    }
    error(text) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__awaiter)(this, void 0, void 0, function* () {
            const toast = yield this.toastController.create({
                message: text,
                duration: 2000,
                color: 'danger',
            });
            toast.present();
        });
    }
    succes(text) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__awaiter)(this, void 0, void 0, function* () {
            const toast = yield this.toastController.create({
                message: text,
                duration: 2000,
                color: 'success',
            });
            toast.present();
        });
    }
    excelRead(e, elem) {
        let fileReaded;
        fileReaded = e.target.files[0];
        let type = e.target.files[0].name.split('.').pop();
        const schema = {
            'Material': {
                prop: 'material',
                type: String,
                required: false
            },
            'Description': {
                prop: 'description',
                type: String,
                required: false
            },
            'Emplacement': {
                prop: 'emplacement',
                type: String,
                required: false
            },
            'Physique': {
                prop: 'physique',
                type: Number,
                required: false
            },
            'Sap': {
                prop: 'sap',
                type: Number,
                required: false
            },
            'Ecart': {
                prop: 'ecart',
                type: Number,
                required: false
            },
            'Cagette': {
                prop: 'cagette',
                type: String,
                required: false
            },
        };
        (0,read_excel_file__WEBPACK_IMPORTED_MODULE_3__["default"])(e.target.files[0], { schema }).then((data) => {
            if (data.rows) {
                for (let i of data.rows) {
                    this.inventaireTab.push(i);
                }
            }
            //  for ( let i of this.inventaireTab){
            // if(this.inventaireTab[i].physique <= this.inventaireTab[i].sap){
            //   console.log(this.inventaireTab[i].physique);
            //}
            // else{
            // console.log("its true")
            //}
            //  }
            for (let i = 0; i < this.inventaireTab.length; i++) {
                if (this.inventaireTab[i].physique < this.inventaireTab[i].sap) {
                    console.log("trop");
                }
                else {
                    console.log("c est bien");
                }
            }
        });
    }
    compareQuntite(data) {
        for (let i of data) {
            if (data[i].physique < data[i].Sap) {
                console.log("grand shit");
            }
            else {
                console.log("c bien");
            }
        }
    }
};
InventairePage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.ToastController },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.Platform },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.ModalController }
];
InventairePage = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Component)({
        selector: 'app-inventaire',
        template: _Users_macbookpro_Desktop_wms_mobilee_node_modules_ngtools_webpack_src_loaders_direct_resource_js_inventaire_page_html__WEBPACK_IMPORTED_MODULE_0__["default"],
        styles: [_inventaire_page_scss__WEBPACK_IMPORTED_MODULE_1__]
    })
], InventairePage);



/***/ }),

/***/ 7672:
/*!****************************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./src/app/inventaire/inventaire.page.html ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<ion-header>\n  <ion-toolbar>\n    <ion-title>inventaire</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content class=\"page-upload\">\n  <ion-segment\n          [(ngModel)]=\"selectedSegement\"\n          (ionChange)=\"segmentChanged($event)\"\n          value=\"CreateInv\"\n           >\n          <ion-segment-button  value=\"CreateInv\">\n       \n              <ion-icon src=\"../../assets/createInv.svg \"></ion-icon>\n              <ion-label>Create Inventaire</ion-label>\n          \n          </ion-segment-button>\n          <ion-segment-button>\n            \n              <ion-icon src=\"../../assets/listeInve.svg \"></ion-icon>\n              <ion-label>Liste des inventaire</ion-label>\n           \n          </ion-segment-button>\n         \n        </ion-segment>\n\n\n\n\n<ion-content *ngIf=\"selectedSegement == 'CreateInv'\">\n\n\n  <ion-card>\n    <ion-card-header>\n      <ion-card-subtitle>reference\n       \n      </ion-card-subtitle>\n      <ion-label>Inventaire 01 </ion-label>\n     \n      <ion-label slot=\"end\">Inventaire 01 </ion-label>\n    </ion-card-header>\n  \n    <ion-card-content>\n      \n      \n        <ion-button  class=\"upload\" (click)=\"inputFile.click()\">\n          <ion-label>Choisir un fichier &nbsp;</ion-label>   <ion-icon  src=\"../../assets/ms-excel.svg\"></ion-icon> \n        \n        <input #inputFile id=\"input-file\"  style=\"opacity:0\" type=\"file\" (change)=\"excelRead($event)\"\n        multiple/>\n      </ion-button>\n    </ion-card-content>\n  </ion-card>\n  \n\n\n\n\n \n\n\n  </ion-content>\n    \n</ion-content>\n<ion-footer>\n  <ion-toolbar class=\"qr-scan\" >\n   <ion-fab-button  (click)=\"goToBarcodeScan()\" > <ion-icon name=\"scan\"></ion-icon></ion-fab-button>\n  <span class=\"qr\">Scanner  Qr Code</span> \n  </ion-toolbar>\n</ion-footer>\n");

/***/ }),

/***/ 2692:
/*!*************************************************!*\
  !*** ./src/app/inventaire/inventaire.page.scss ***!
  \*************************************************/
/***/ ((module) => {

"use strict";
module.exports = "@font-face {\n  font-family: \"acrom\";\n  src: url('Acrom-Medium.ttf');\n}\n.page-upload ion-label {\n  font-family: acrom;\n}\n.page-upload ion-card-header ion-card-subtitle {\n  color: #B2C4CC;\n  font-size: 12px;\n}\n.page-upload ion-card-header ion-label {\n  color: #3D5A68;\n  font-size: 16px;\n}\n.page-upload .upload {\n  --background: #3D5A68;\n  width: 220px;\n  height: 50px;\n  font-size: 16px;\n  border-radius: 7px;\n}\n.page-upload .upload ion-label {\n  font-family: acrom;\n}\n.page-upload .upload ion-icon {\n  font-size: 300px;\n}\nion-footer {\n  --background: #3D5A68;\n}\nion-footer ion-toolbar {\n  padding-top: 4px;\n  text-align: -webkit-center;\n  --background:#3D5A68;\n}\nion-footer .qr {\n  color: #FFFFFF;\n  width: 10px !important;\n  font-family: acrom;\n  font-size: 10px;\n}\nion-footer ion-fab-button {\n  border-radius: 50%;\n  border: 3px solid #344C57;\n  box-shadow: 0 0 0 3px #668391;\n  --background:linear-gradient(#FFB701,#FF9302);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImludmVudGFpcmUucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksb0JBQUE7RUFDQSw0QkFBQTtBQUNKO0FBSUk7RUFDSSxrQkFBQTtBQUZSO0FBUVE7RUFDSSxjQUFBO0VBQ0EsZUFBQTtBQU5aO0FBUVE7RUFDSSxjQUFBO0VBQ0EsZUFBQTtBQU5aO0FBYUE7RUFDSSxxQkFBQTtFQUNBLFlBQUE7RUFDQSxZQUFBO0VBQ0EsZUFBQTtFQUNBLGtCQUFBO0FBWEo7QUFZSTtFQUNJLGtCQUFBO0FBVlI7QUFZSTtFQUNJLGdCQUFBO0FBVlI7QUE4QkE7RUFFRSxxQkFBQTtBQTVCRjtBQTZCRTtFQUNFLGdCQUFBO0VBQ0EsMEJBQUE7RUFDQSxvQkFBQTtBQTNCSjtBQThCRTtFQUNFLGNBQUE7RUFDQSxzQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtBQTVCSjtBQWdDRTtFQUVDLGtCQUFBO0VBRUEseUJBQUE7RUFDQyw2QkFBQTtFQUNBLDZDQUFBO0FBaENKIiwiZmlsZSI6ImludmVudGFpcmUucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGZvbnQtZmFjZSB7XG4gICAgZm9udC1mYW1pbHk6ICdhY3JvbSc7XG4gICAgc3JjOiB1cmwoJy4uLy4uL2Fzc2V0cy9mb250cy9BY3JvbS1NZWRpdW0udHRmJyk7XG4gIH1cbiAgXG5cbi5wYWdlLXVwbG9hZHtcbiAgICBpb24tbGFiZWx7XG4gICAgICAgIGZvbnQtZmFtaWx5OiBhY3JvbTtcbiAgICB9XG5cbiAgICBpb24tY2FyZC1oZWFkZXJ7XG5cblxuICAgICAgICBpb24tY2FyZC1zdWJ0aXRsZXtcbiAgICAgICAgICAgIGNvbG9yOiAjQjJDNENDO1xuICAgICAgICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgICAgICB9XG4gICAgICAgIGlvbi1sYWJlbHtcbiAgICAgICAgICAgIGNvbG9yOiAjM0Q1QTY4O1xuICAgICAgICAgICAgZm9udC1zaXplOiAxNnB4IDtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cblxuLnVwbG9hZHtcbiAgICAtLWJhY2tncm91bmQ6ICMzRDVBNjg7XG4gICAgd2lkdGg6IDIyMHB4O1xuICAgIGhlaWdodDogNTBweDtcbiAgICBmb250LXNpemU6IDE2cHg7XG4gICAgYm9yZGVyLXJhZGl1czogN3B4O1xuICAgIGlvbi1sYWJlbHtcbiAgICAgICAgZm9udC1mYW1pbHk6IGFjcm9tO1xuICAgIH1cbiAgICBpb24taWNvbnsgXG4gICAgICAgIGZvbnQtc2l6ZTogMzAwcHg7XG4gICAgfVxuICAgXG5cbn1cblxuXG5cbn1cblxuXG5cblxuXG5cblxuXG5cblxuXG5pb24tZm9vdGVye1xuXG4gIC0tYmFja2dyb3VuZCA6ICMzRDVBNjg7XG4gIGlvbi10b29sYmFye1xuICAgIHBhZGRpbmctdG9wOiA0cHg7XG4gICAgdGV4dC1hbGlnbjogLXdlYmtpdC1jZW50ZXI7XG4gICAgLS1iYWNrZ3JvdW5kOiMzRDVBNjg7XG4gIH1cbiAgXG4gIC5xcntcbiAgICBjb2xvcjojRkZGRkZGIDtcbiAgICB3aWR0aDogMTBweCAhaW1wb3J0YW50O1xuICAgIGZvbnQtZmFtaWx5OiBhY3JvbTtcbiAgICBmb250LXNpemU6IDEwcHg7XG4gIH1cbiBcblxuICBpb24tZmFiLWJ1dHRvbntcblxuICAgYm9yZGVyLXJhZGl1czogNTAlO1xuXG4gICBib3JkZXI6IDNweCBzb2xpZCAjMzQ0QzU3O1xuICAgIGJveC1zaGFkb3c6IDAgMCAwIDNweCAgIzY2ODM5MTtcbiAgICAtLWJhY2tncm91bmQ6bGluZWFyLWdyYWRpZW50KCNGRkI3MDEsI0ZGOTMwMik7XG4gIH1cbn0iXX0= */";

/***/ })

}]);
//# sourceMappingURL=src_app_inventaire_inventaire_module_ts.js.map