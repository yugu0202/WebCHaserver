(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __objRest = (source, exclude) => {
    var target = {};
    for (var prop in source)
      if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
        target[prop] = source[prop];
    if (source != null && __getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(source)) {
        if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
          target[prop] = source[prop];
      }
    return target;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // vendor/topbar.js
  var require_topbar = __commonJS({
    "vendor/topbar.js"(exports, module) {
      (function(window2, document2) {
        "use strict";
        (function() {
          var lastTime = 0;
          var vendors = ["ms", "moz", "webkit", "o"];
          for (var x = 0; x < vendors.length && !window2.requestAnimationFrame; ++x) {
            window2.requestAnimationFrame = window2[vendors[x] + "RequestAnimationFrame"];
            window2.cancelAnimationFrame = window2[vendors[x] + "CancelAnimationFrame"] || window2[vendors[x] + "CancelRequestAnimationFrame"];
          }
          if (!window2.requestAnimationFrame)
            window2.requestAnimationFrame = function(callback, element) {
              var currTime = (/* @__PURE__ */ new Date()).getTime();
              var timeToCall = Math.max(0, 16 - (currTime - lastTime));
              var id = window2.setTimeout(function() {
                callback(currTime + timeToCall);
              }, timeToCall);
              lastTime = currTime + timeToCall;
              return id;
            };
          if (!window2.cancelAnimationFrame)
            window2.cancelAnimationFrame = function(id) {
              clearTimeout(id);
            };
        })();
        var canvas, currentProgress, showing, progressTimerId = null, fadeTimerId = null, delayTimerId = null, addEvent = function(elem, type, handler) {
          if (elem.addEventListener)
            elem.addEventListener(type, handler, false);
          else if (elem.attachEvent)
            elem.attachEvent("on" + type, handler);
          else
            elem["on" + type] = handler;
        }, options = {
          autoRun: true,
          barThickness: 3,
          barColors: {
            0: "rgba(26,  188, 156, .9)",
            ".25": "rgba(52,  152, 219, .9)",
            ".50": "rgba(241, 196, 15,  .9)",
            ".75": "rgba(230, 126, 34,  .9)",
            "1.0": "rgba(211, 84,  0,   .9)"
          },
          shadowBlur: 10,
          shadowColor: "rgba(0,   0,   0,   .6)",
          className: null
        }, repaint = function() {
          canvas.width = window2.innerWidth;
          canvas.height = options.barThickness * 5;
          var ctx = canvas.getContext("2d");
          ctx.shadowBlur = options.shadowBlur;
          ctx.shadowColor = options.shadowColor;
          var lineGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
          for (var stop in options.barColors)
            lineGradient.addColorStop(stop, options.barColors[stop]);
          ctx.lineWidth = options.barThickness;
          ctx.beginPath();
          ctx.moveTo(0, options.barThickness / 2);
          ctx.lineTo(
            Math.ceil(currentProgress * canvas.width),
            options.barThickness / 2
          );
          ctx.strokeStyle = lineGradient;
          ctx.stroke();
        }, createCanvas = function() {
          canvas = document2.createElement("canvas");
          var style = canvas.style;
          style.position = "fixed";
          style.top = style.left = style.right = style.margin = style.padding = 0;
          style.zIndex = 100001;
          style.display = "none";
          if (options.className)
            canvas.classList.add(options.className);
          document2.body.appendChild(canvas);
          addEvent(window2, "resize", repaint);
        }, topbar2 = {
          config: function(opts) {
            for (var key in opts)
              if (options.hasOwnProperty(key))
                options[key] = opts[key];
          },
          show: function(delay) {
            if (showing)
              return;
            if (delay) {
              if (delayTimerId)
                return;
              delayTimerId = setTimeout(() => topbar2.show(), delay);
            } else {
              showing = true;
              if (fadeTimerId !== null)
                window2.cancelAnimationFrame(fadeTimerId);
              if (!canvas)
                createCanvas();
              canvas.style.opacity = 1;
              canvas.style.display = "block";
              topbar2.progress(0);
              if (options.autoRun) {
                (function loop() {
                  progressTimerId = window2.requestAnimationFrame(loop);
                  topbar2.progress(
                    "+" + 0.05 * Math.pow(1 - Math.sqrt(currentProgress), 2)
                  );
                })();
              }
            }
          },
          progress: function(to) {
            if (typeof to === "undefined")
              return currentProgress;
            if (typeof to === "string") {
              to = (to.indexOf("+") >= 0 || to.indexOf("-") >= 0 ? currentProgress : 0) + parseFloat(to);
            }
            currentProgress = to > 1 ? 1 : to;
            repaint();
            return currentProgress;
          },
          hide: function() {
            clearTimeout(delayTimerId);
            delayTimerId = null;
            if (!showing)
              return;
            showing = false;
            if (progressTimerId != null) {
              window2.cancelAnimationFrame(progressTimerId);
              progressTimerId = null;
            }
            (function loop() {
              if (topbar2.progress("+.1") >= 1) {
                canvas.style.opacity -= 0.05;
                if (canvas.style.opacity <= 0.05) {
                  canvas.style.display = "none";
                  fadeTimerId = null;
                  return;
                }
              }
              fadeTimerId = window2.requestAnimationFrame(loop);
            })();
          }
        };
        if (typeof module === "object" && typeof module.exports === "object") {
          module.exports = topbar2;
        } else if (typeof define === "function" && define.amd) {
          define(function() {
            return topbar2;
          });
        } else {
          this.topbar = topbar2;
        }
      }).call(exports, window, document);
    }
  });

  // ../deps/phoenix/priv/static/phoenix.mjs
  var closure = (value) => {
    if (typeof value === "function") {
      return value;
    } else {
      let closure22 = function() {
        return value;
      };
      return closure22;
    }
  };
  var globalSelf = typeof self !== "undefined" ? self : null;
  var phxWindow = typeof window !== "undefined" ? window : null;
  var global = globalSelf || phxWindow || global;
  var DEFAULT_VSN = "2.0.0";
  var SOCKET_STATES = { connecting: 0, open: 1, closing: 2, closed: 3 };
  var DEFAULT_TIMEOUT = 1e4;
  var WS_CLOSE_NORMAL = 1e3;
  var CHANNEL_STATES = {
    closed: "closed",
    errored: "errored",
    joined: "joined",
    joining: "joining",
    leaving: "leaving"
  };
  var CHANNEL_EVENTS = {
    close: "phx_close",
    error: "phx_error",
    join: "phx_join",
    reply: "phx_reply",
    leave: "phx_leave"
  };
  var TRANSPORTS = {
    longpoll: "longpoll",
    websocket: "websocket"
  };
  var XHR_STATES = {
    complete: 4
  };
  var Push = class {
    constructor(channel2, event, payload, timeout) {
      this.channel = channel2;
      this.event = event;
      this.payload = payload || function() {
        return {};
      };
      this.receivedResp = null;
      this.timeout = timeout;
      this.timeoutTimer = null;
      this.recHooks = [];
      this.sent = false;
    }
    resend(timeout) {
      this.timeout = timeout;
      this.reset();
      this.send();
    }
    send() {
      if (this.hasReceived("timeout")) {
        return;
      }
      this.startTimeout();
      this.sent = true;
      this.channel.socket.push({
        topic: this.channel.topic,
        event: this.event,
        payload: this.payload(),
        ref: this.ref,
        join_ref: this.channel.joinRef()
      });
    }
    receive(status, callback) {
      if (this.hasReceived(status)) {
        callback(this.receivedResp.response);
      }
      this.recHooks.push({ status, callback });
      return this;
    }
    reset() {
      this.cancelRefEvent();
      this.ref = null;
      this.refEvent = null;
      this.receivedResp = null;
      this.sent = false;
    }
    matchReceive({ status, response, _ref }) {
      this.recHooks.filter((h) => h.status === status).forEach((h) => h.callback(response));
    }
    cancelRefEvent() {
      if (!this.refEvent) {
        return;
      }
      this.channel.off(this.refEvent);
    }
    cancelTimeout() {
      clearTimeout(this.timeoutTimer);
      this.timeoutTimer = null;
    }
    startTimeout() {
      if (this.timeoutTimer) {
        this.cancelTimeout();
      }
      this.ref = this.channel.socket.makeRef();
      this.refEvent = this.channel.replyEventName(this.ref);
      this.channel.on(this.refEvent, (payload) => {
        this.cancelRefEvent();
        this.cancelTimeout();
        this.receivedResp = payload;
        this.matchReceive(payload);
      });
      this.timeoutTimer = setTimeout(() => {
        this.trigger("timeout", {});
      }, this.timeout);
    }
    hasReceived(status) {
      return this.receivedResp && this.receivedResp.status === status;
    }
    trigger(status, response) {
      this.channel.trigger(this.refEvent, { status, response });
    }
  };
  var Timer = class {
    constructor(callback, timerCalc) {
      this.callback = callback;
      this.timerCalc = timerCalc;
      this.timer = null;
      this.tries = 0;
    }
    reset() {
      this.tries = 0;
      clearTimeout(this.timer);
    }
    scheduleTimeout() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.tries = this.tries + 1;
        this.callback();
      }, this.timerCalc(this.tries + 1));
    }
  };
  var Channel = class {
    constructor(topic, params, socket2) {
      this.state = CHANNEL_STATES.closed;
      this.topic = topic;
      this.params = closure(params || {});
      this.socket = socket2;
      this.bindings = [];
      this.bindingRef = 0;
      this.timeout = this.socket.timeout;
      this.joinedOnce = false;
      this.joinPush = new Push(this, CHANNEL_EVENTS.join, this.params, this.timeout);
      this.pushBuffer = [];
      this.stateChangeRefs = [];
      this.rejoinTimer = new Timer(() => {
        if (this.socket.isConnected()) {
          this.rejoin();
        }
      }, this.socket.rejoinAfterMs);
      this.stateChangeRefs.push(this.socket.onError(() => this.rejoinTimer.reset()));
      this.stateChangeRefs.push(this.socket.onOpen(() => {
        this.rejoinTimer.reset();
        if (this.isErrored()) {
          this.rejoin();
        }
      }));
      this.joinPush.receive("ok", () => {
        this.state = CHANNEL_STATES.joined;
        this.rejoinTimer.reset();
        this.pushBuffer.forEach((pushEvent) => pushEvent.send());
        this.pushBuffer = [];
      });
      this.joinPush.receive("error", () => {
        this.state = CHANNEL_STATES.errored;
        if (this.socket.isConnected()) {
          this.rejoinTimer.scheduleTimeout();
        }
      });
      this.onClose(() => {
        this.rejoinTimer.reset();
        if (this.socket.hasLogger())
          this.socket.log("channel", `close ${this.topic} ${this.joinRef()}`);
        this.state = CHANNEL_STATES.closed;
        this.socket.remove(this);
      });
      this.onError((reason) => {
        if (this.socket.hasLogger())
          this.socket.log("channel", `error ${this.topic}`, reason);
        if (this.isJoining()) {
          this.joinPush.reset();
        }
        this.state = CHANNEL_STATES.errored;
        if (this.socket.isConnected()) {
          this.rejoinTimer.scheduleTimeout();
        }
      });
      this.joinPush.receive("timeout", () => {
        if (this.socket.hasLogger())
          this.socket.log("channel", `timeout ${this.topic} (${this.joinRef()})`, this.joinPush.timeout);
        let leavePush = new Push(this, CHANNEL_EVENTS.leave, closure({}), this.timeout);
        leavePush.send();
        this.state = CHANNEL_STATES.errored;
        this.joinPush.reset();
        if (this.socket.isConnected()) {
          this.rejoinTimer.scheduleTimeout();
        }
      });
      this.on(CHANNEL_EVENTS.reply, (payload, ref) => {
        this.trigger(this.replyEventName(ref), payload);
      });
    }
    join(timeout = this.timeout) {
      if (this.joinedOnce) {
        throw new Error("tried to join multiple times. 'join' can only be called a single time per channel instance");
      } else {
        this.timeout = timeout;
        this.joinedOnce = true;
        this.rejoin();
        return this.joinPush;
      }
    }
    onClose(callback) {
      this.on(CHANNEL_EVENTS.close, callback);
    }
    onError(callback) {
      return this.on(CHANNEL_EVENTS.error, (reason) => callback(reason));
    }
    on(event, callback) {
      let ref = this.bindingRef++;
      this.bindings.push({ event, ref, callback });
      return ref;
    }
    off(event, ref) {
      this.bindings = this.bindings.filter((bind) => {
        return !(bind.event === event && (typeof ref === "undefined" || ref === bind.ref));
      });
    }
    canPush() {
      return this.socket.isConnected() && this.isJoined();
    }
    push(event, payload, timeout = this.timeout) {
      payload = payload || {};
      if (!this.joinedOnce) {
        throw new Error(`tried to push '${event}' to '${this.topic}' before joining. Use channel.join() before pushing events`);
      }
      let pushEvent = new Push(this, event, function() {
        return payload;
      }, timeout);
      if (this.canPush()) {
        pushEvent.send();
      } else {
        pushEvent.startTimeout();
        this.pushBuffer.push(pushEvent);
      }
      return pushEvent;
    }
    leave(timeout = this.timeout) {
      this.rejoinTimer.reset();
      this.joinPush.cancelTimeout();
      this.state = CHANNEL_STATES.leaving;
      let onClose = () => {
        if (this.socket.hasLogger())
          this.socket.log("channel", `leave ${this.topic}`);
        this.trigger(CHANNEL_EVENTS.close, "leave");
      };
      let leavePush = new Push(this, CHANNEL_EVENTS.leave, closure({}), timeout);
      leavePush.receive("ok", () => onClose()).receive("timeout", () => onClose());
      leavePush.send();
      if (!this.canPush()) {
        leavePush.trigger("ok", {});
      }
      return leavePush;
    }
    onMessage(_event, payload, _ref) {
      return payload;
    }
    isMember(topic, event, payload, joinRef) {
      if (this.topic !== topic) {
        return false;
      }
      if (joinRef && joinRef !== this.joinRef()) {
        if (this.socket.hasLogger())
          this.socket.log("channel", "dropping outdated message", { topic, event, payload, joinRef });
        return false;
      } else {
        return true;
      }
    }
    joinRef() {
      return this.joinPush.ref;
    }
    rejoin(timeout = this.timeout) {
      if (this.isLeaving()) {
        return;
      }
      this.socket.leaveOpenTopic(this.topic);
      this.state = CHANNEL_STATES.joining;
      this.joinPush.resend(timeout);
    }
    trigger(event, payload, ref, joinRef) {
      let handledPayload = this.onMessage(event, payload, ref, joinRef);
      if (payload && !handledPayload) {
        throw new Error("channel onMessage callbacks must return the payload, modified or unmodified");
      }
      let eventBindings = this.bindings.filter((bind) => bind.event === event);
      for (let i = 0; i < eventBindings.length; i++) {
        let bind = eventBindings[i];
        bind.callback(handledPayload, ref, joinRef || this.joinRef());
      }
    }
    replyEventName(ref) {
      return `chan_reply_${ref}`;
    }
    isClosed() {
      return this.state === CHANNEL_STATES.closed;
    }
    isErrored() {
      return this.state === CHANNEL_STATES.errored;
    }
    isJoined() {
      return this.state === CHANNEL_STATES.joined;
    }
    isJoining() {
      return this.state === CHANNEL_STATES.joining;
    }
    isLeaving() {
      return this.state === CHANNEL_STATES.leaving;
    }
  };
  var Ajax = class {
    static request(method, endPoint, accept, body, timeout, ontimeout, callback) {
      if (global.XDomainRequest) {
        let req = new global.XDomainRequest();
        return this.xdomainRequest(req, method, endPoint, body, timeout, ontimeout, callback);
      } else {
        let req = new global.XMLHttpRequest();
        return this.xhrRequest(req, method, endPoint, accept, body, timeout, ontimeout, callback);
      }
    }
    static xdomainRequest(req, method, endPoint, body, timeout, ontimeout, callback) {
      req.timeout = timeout;
      req.open(method, endPoint);
      req.onload = () => {
        let response = this.parseJSON(req.responseText);
        callback && callback(response);
      };
      if (ontimeout) {
        req.ontimeout = ontimeout;
      }
      req.onprogress = () => {
      };
      req.send(body);
      return req;
    }
    static xhrRequest(req, method, endPoint, accept, body, timeout, ontimeout, callback) {
      req.open(method, endPoint, true);
      req.timeout = timeout;
      req.setRequestHeader("Content-Type", accept);
      req.onerror = () => callback && callback(null);
      req.onreadystatechange = () => {
        if (req.readyState === XHR_STATES.complete && callback) {
          let response = this.parseJSON(req.responseText);
          callback(response);
        }
      };
      if (ontimeout) {
        req.ontimeout = ontimeout;
      }
      req.send(body);
      return req;
    }
    static parseJSON(resp) {
      if (!resp || resp === "") {
        return null;
      }
      try {
        return JSON.parse(resp);
      } catch (e) {
        console && console.log("failed to parse JSON response", resp);
        return null;
      }
    }
    static serialize(obj, parentKey) {
      let queryStr = [];
      for (var key in obj) {
        if (!Object.prototype.hasOwnProperty.call(obj, key)) {
          continue;
        }
        let paramKey = parentKey ? `${parentKey}[${key}]` : key;
        let paramVal = obj[key];
        if (typeof paramVal === "object") {
          queryStr.push(this.serialize(paramVal, paramKey));
        } else {
          queryStr.push(encodeURIComponent(paramKey) + "=" + encodeURIComponent(paramVal));
        }
      }
      return queryStr.join("&");
    }
    static appendParams(url, params) {
      if (Object.keys(params).length === 0) {
        return url;
      }
      let prefix = url.match(/\?/) ? "&" : "?";
      return `${url}${prefix}${this.serialize(params)}`;
    }
  };
  var arrayBufferToBase64 = (buffer) => {
    let binary = "";
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };
  var LongPoll = class {
    constructor(endPoint) {
      this.endPoint = null;
      this.token = null;
      this.skipHeartbeat = true;
      this.reqs = /* @__PURE__ */ new Set();
      this.awaitingBatchAck = false;
      this.currentBatch = null;
      this.currentBatchTimer = null;
      this.batchBuffer = [];
      this.onopen = function() {
      };
      this.onerror = function() {
      };
      this.onmessage = function() {
      };
      this.onclose = function() {
      };
      this.pollEndpoint = this.normalizeEndpoint(endPoint);
      this.readyState = SOCKET_STATES.connecting;
      this.poll();
    }
    normalizeEndpoint(endPoint) {
      return endPoint.replace("ws://", "http://").replace("wss://", "https://").replace(new RegExp("(.*)/" + TRANSPORTS.websocket), "$1/" + TRANSPORTS.longpoll);
    }
    endpointURL() {
      return Ajax.appendParams(this.pollEndpoint, { token: this.token });
    }
    closeAndRetry(code, reason, wasClean) {
      this.close(code, reason, wasClean);
      this.readyState = SOCKET_STATES.connecting;
    }
    ontimeout() {
      this.onerror("timeout");
      this.closeAndRetry(1005, "timeout", false);
    }
    isActive() {
      return this.readyState === SOCKET_STATES.open || this.readyState === SOCKET_STATES.connecting;
    }
    poll() {
      this.ajax("GET", "application/json", null, () => this.ontimeout(), (resp) => {
        if (resp) {
          var { status, token, messages } = resp;
          this.token = token;
        } else {
          status = 0;
        }
        switch (status) {
          case 200:
            messages.forEach((msg) => {
              setTimeout(() => this.onmessage({ data: msg }), 0);
            });
            this.poll();
            break;
          case 204:
            this.poll();
            break;
          case 410:
            this.readyState = SOCKET_STATES.open;
            this.onopen({});
            this.poll();
            break;
          case 403:
            this.onerror(403);
            this.close(1008, "forbidden", false);
            break;
          case 0:
          case 500:
            this.onerror(500);
            this.closeAndRetry(1011, "internal server error", 500);
            break;
          default:
            throw new Error(`unhandled poll status ${status}`);
        }
      });
    }
    send(body) {
      if (typeof body !== "string") {
        body = arrayBufferToBase64(body);
      }
      if (this.currentBatch) {
        this.currentBatch.push(body);
      } else if (this.awaitingBatchAck) {
        this.batchBuffer.push(body);
      } else {
        this.currentBatch = [body];
        this.currentBatchTimer = setTimeout(() => {
          this.batchSend(this.currentBatch);
          this.currentBatch = null;
        }, 0);
      }
    }
    batchSend(messages) {
      this.awaitingBatchAck = true;
      this.ajax("POST", "application/x-ndjson", messages.join("\n"), () => this.onerror("timeout"), (resp) => {
        this.awaitingBatchAck = false;
        if (!resp || resp.status !== 200) {
          this.onerror(resp && resp.status);
          this.closeAndRetry(1011, "internal server error", false);
        } else if (this.batchBuffer.length > 0) {
          this.batchSend(this.batchBuffer);
          this.batchBuffer = [];
        }
      });
    }
    close(code, reason, wasClean) {
      for (let req of this.reqs) {
        req.abort();
      }
      this.readyState = SOCKET_STATES.closed;
      let opts = Object.assign({ code: 1e3, reason: void 0, wasClean: true }, { code, reason, wasClean });
      this.batchBuffer = [];
      clearTimeout(this.currentBatchTimer);
      this.currentBatchTimer = null;
      if (typeof CloseEvent !== "undefined") {
        this.onclose(new CloseEvent("close", opts));
      } else {
        this.onclose(opts);
      }
    }
    ajax(method, contentType, body, onCallerTimeout, callback) {
      let req;
      let ontimeout = () => {
        this.reqs.delete(req);
        onCallerTimeout();
      };
      req = Ajax.request(method, this.endpointURL(), contentType, body, this.timeout, ontimeout, (resp) => {
        this.reqs.delete(req);
        if (this.isActive()) {
          callback(resp);
        }
      });
      this.reqs.add(req);
    }
  };
  var serializer_default = {
    HEADER_LENGTH: 1,
    META_LENGTH: 4,
    KINDS: { push: 0, reply: 1, broadcast: 2 },
    encode(msg, callback) {
      if (msg.payload.constructor === ArrayBuffer) {
        return callback(this.binaryEncode(msg));
      } else {
        let payload = [msg.join_ref, msg.ref, msg.topic, msg.event, msg.payload];
        return callback(JSON.stringify(payload));
      }
    },
    decode(rawPayload, callback) {
      if (rawPayload.constructor === ArrayBuffer) {
        return callback(this.binaryDecode(rawPayload));
      } else {
        let [join_ref, ref, topic, event, payload] = JSON.parse(rawPayload);
        return callback({ join_ref, ref, topic, event, payload });
      }
    },
    binaryEncode(message) {
      let { join_ref, ref, event, topic, payload } = message;
      let metaLength = this.META_LENGTH + join_ref.length + ref.length + topic.length + event.length;
      let header = new ArrayBuffer(this.HEADER_LENGTH + metaLength);
      let view = new DataView(header);
      let offset = 0;
      view.setUint8(offset++, this.KINDS.push);
      view.setUint8(offset++, join_ref.length);
      view.setUint8(offset++, ref.length);
      view.setUint8(offset++, topic.length);
      view.setUint8(offset++, event.length);
      Array.from(join_ref, (char) => view.setUint8(offset++, char.charCodeAt(0)));
      Array.from(ref, (char) => view.setUint8(offset++, char.charCodeAt(0)));
      Array.from(topic, (char) => view.setUint8(offset++, char.charCodeAt(0)));
      Array.from(event, (char) => view.setUint8(offset++, char.charCodeAt(0)));
      var combined = new Uint8Array(header.byteLength + payload.byteLength);
      combined.set(new Uint8Array(header), 0);
      combined.set(new Uint8Array(payload), header.byteLength);
      return combined.buffer;
    },
    binaryDecode(buffer) {
      let view = new DataView(buffer);
      let kind = view.getUint8(0);
      let decoder = new TextDecoder();
      switch (kind) {
        case this.KINDS.push:
          return this.decodePush(buffer, view, decoder);
        case this.KINDS.reply:
          return this.decodeReply(buffer, view, decoder);
        case this.KINDS.broadcast:
          return this.decodeBroadcast(buffer, view, decoder);
      }
    },
    decodePush(buffer, view, decoder) {
      let joinRefSize = view.getUint8(1);
      let topicSize = view.getUint8(2);
      let eventSize = view.getUint8(3);
      let offset = this.HEADER_LENGTH + this.META_LENGTH - 1;
      let joinRef = decoder.decode(buffer.slice(offset, offset + joinRefSize));
      offset = offset + joinRefSize;
      let topic = decoder.decode(buffer.slice(offset, offset + topicSize));
      offset = offset + topicSize;
      let event = decoder.decode(buffer.slice(offset, offset + eventSize));
      offset = offset + eventSize;
      let data = buffer.slice(offset, buffer.byteLength);
      return { join_ref: joinRef, ref: null, topic, event, payload: data };
    },
    decodeReply(buffer, view, decoder) {
      let joinRefSize = view.getUint8(1);
      let refSize = view.getUint8(2);
      let topicSize = view.getUint8(3);
      let eventSize = view.getUint8(4);
      let offset = this.HEADER_LENGTH + this.META_LENGTH;
      let joinRef = decoder.decode(buffer.slice(offset, offset + joinRefSize));
      offset = offset + joinRefSize;
      let ref = decoder.decode(buffer.slice(offset, offset + refSize));
      offset = offset + refSize;
      let topic = decoder.decode(buffer.slice(offset, offset + topicSize));
      offset = offset + topicSize;
      let event = decoder.decode(buffer.slice(offset, offset + eventSize));
      offset = offset + eventSize;
      let data = buffer.slice(offset, buffer.byteLength);
      let payload = { status: event, response: data };
      return { join_ref: joinRef, ref, topic, event: CHANNEL_EVENTS.reply, payload };
    },
    decodeBroadcast(buffer, view, decoder) {
      let topicSize = view.getUint8(1);
      let eventSize = view.getUint8(2);
      let offset = this.HEADER_LENGTH + 2;
      let topic = decoder.decode(buffer.slice(offset, offset + topicSize));
      offset = offset + topicSize;
      let event = decoder.decode(buffer.slice(offset, offset + eventSize));
      offset = offset + eventSize;
      let data = buffer.slice(offset, buffer.byteLength);
      return { join_ref: null, ref: null, topic, event, payload: data };
    }
  };
  var Socket = class {
    constructor(endPoint, opts = {}) {
      this.stateChangeCallbacks = { open: [], close: [], error: [], message: [] };
      this.channels = [];
      this.sendBuffer = [];
      this.ref = 0;
      this.timeout = opts.timeout || DEFAULT_TIMEOUT;
      this.transport = opts.transport || global.WebSocket || LongPoll;
      this.establishedConnections = 0;
      this.defaultEncoder = serializer_default.encode.bind(serializer_default);
      this.defaultDecoder = serializer_default.decode.bind(serializer_default);
      this.closeWasClean = false;
      this.binaryType = opts.binaryType || "arraybuffer";
      this.connectClock = 1;
      if (this.transport !== LongPoll) {
        this.encode = opts.encode || this.defaultEncoder;
        this.decode = opts.decode || this.defaultDecoder;
      } else {
        this.encode = this.defaultEncoder;
        this.decode = this.defaultDecoder;
      }
      let awaitingConnectionOnPageShow = null;
      if (phxWindow && phxWindow.addEventListener) {
        phxWindow.addEventListener("pagehide", (_e) => {
          if (this.conn) {
            this.disconnect();
            awaitingConnectionOnPageShow = this.connectClock;
          }
        });
        phxWindow.addEventListener("pageshow", (_e) => {
          if (awaitingConnectionOnPageShow === this.connectClock) {
            awaitingConnectionOnPageShow = null;
            this.connect();
          }
        });
      }
      this.heartbeatIntervalMs = opts.heartbeatIntervalMs || 3e4;
      this.rejoinAfterMs = (tries) => {
        if (opts.rejoinAfterMs) {
          return opts.rejoinAfterMs(tries);
        } else {
          return [1e3, 2e3, 5e3][tries - 1] || 1e4;
        }
      };
      this.reconnectAfterMs = (tries) => {
        if (opts.reconnectAfterMs) {
          return opts.reconnectAfterMs(tries);
        } else {
          return [10, 50, 100, 150, 200, 250, 500, 1e3, 2e3][tries - 1] || 5e3;
        }
      };
      this.logger = opts.logger || null;
      this.longpollerTimeout = opts.longpollerTimeout || 2e4;
      this.params = closure(opts.params || {});
      this.endPoint = `${endPoint}/${TRANSPORTS.websocket}`;
      this.vsn = opts.vsn || DEFAULT_VSN;
      this.heartbeatTimeoutTimer = null;
      this.heartbeatTimer = null;
      this.pendingHeartbeatRef = null;
      this.reconnectTimer = new Timer(() => {
        this.teardown(() => this.connect());
      }, this.reconnectAfterMs);
    }
    getLongPollTransport() {
      return LongPoll;
    }
    replaceTransport(newTransport) {
      this.connectClock++;
      this.closeWasClean = true;
      this.reconnectTimer.reset();
      this.sendBuffer = [];
      if (this.conn) {
        this.conn.close();
        this.conn = null;
      }
      this.transport = newTransport;
    }
    protocol() {
      return location.protocol.match(/^https/) ? "wss" : "ws";
    }
    endPointURL() {
      let uri = Ajax.appendParams(Ajax.appendParams(this.endPoint, this.params()), { vsn: this.vsn });
      if (uri.charAt(0) !== "/") {
        return uri;
      }
      if (uri.charAt(1) === "/") {
        return `${this.protocol()}:${uri}`;
      }
      return `${this.protocol()}://${location.host}${uri}`;
    }
    disconnect(callback, code, reason) {
      this.connectClock++;
      this.closeWasClean = true;
      this.reconnectTimer.reset();
      this.teardown(callback, code, reason);
    }
    connect(params) {
      if (params) {
        console && console.log("passing params to connect is deprecated. Instead pass :params to the Socket constructor");
        this.params = closure(params);
      }
      if (this.conn) {
        return;
      }
      this.connectClock++;
      this.closeWasClean = false;
      this.conn = new this.transport(this.endPointURL());
      this.conn.binaryType = this.binaryType;
      this.conn.timeout = this.longpollerTimeout;
      this.conn.onopen = () => this.onConnOpen();
      this.conn.onerror = (error) => this.onConnError(error);
      this.conn.onmessage = (event) => this.onConnMessage(event);
      this.conn.onclose = (event) => this.onConnClose(event);
    }
    log(kind, msg, data) {
      this.logger(kind, msg, data);
    }
    hasLogger() {
      return this.logger !== null;
    }
    onOpen(callback) {
      let ref = this.makeRef();
      this.stateChangeCallbacks.open.push([ref, callback]);
      return ref;
    }
    onClose(callback) {
      let ref = this.makeRef();
      this.stateChangeCallbacks.close.push([ref, callback]);
      return ref;
    }
    onError(callback) {
      let ref = this.makeRef();
      this.stateChangeCallbacks.error.push([ref, callback]);
      return ref;
    }
    onMessage(callback) {
      let ref = this.makeRef();
      this.stateChangeCallbacks.message.push([ref, callback]);
      return ref;
    }
    ping(callback) {
      if (!this.isConnected()) {
        return false;
      }
      let ref = this.makeRef();
      let startTime = Date.now();
      this.push({ topic: "phoenix", event: "heartbeat", payload: {}, ref });
      let onMsgRef = this.onMessage((msg) => {
        if (msg.ref === ref) {
          this.off([onMsgRef]);
          callback(Date.now() - startTime);
        }
      });
      return true;
    }
    clearHeartbeats() {
      clearTimeout(this.heartbeatTimer);
      clearTimeout(this.heartbeatTimeoutTimer);
    }
    onConnOpen() {
      if (this.hasLogger())
        this.log("transport", `connected to ${this.endPointURL()}`);
      this.closeWasClean = false;
      this.establishedConnections++;
      this.flushSendBuffer();
      this.reconnectTimer.reset();
      this.resetHeartbeat();
      this.stateChangeCallbacks.open.forEach(([, callback]) => callback());
    }
    heartbeatTimeout() {
      if (this.pendingHeartbeatRef) {
        this.pendingHeartbeatRef = null;
        if (this.hasLogger()) {
          this.log("transport", "heartbeat timeout. Attempting to re-establish connection");
        }
        this.triggerChanError();
        this.closeWasClean = false;
        this.teardown(() => this.reconnectTimer.scheduleTimeout(), WS_CLOSE_NORMAL, "heartbeat timeout");
      }
    }
    resetHeartbeat() {
      if (this.conn && this.conn.skipHeartbeat) {
        return;
      }
      this.pendingHeartbeatRef = null;
      this.clearHeartbeats();
      this.heartbeatTimer = setTimeout(() => this.sendHeartbeat(), this.heartbeatIntervalMs);
    }
    teardown(callback, code, reason) {
      if (!this.conn) {
        return callback && callback();
      }
      this.waitForBufferDone(() => {
        if (this.conn) {
          if (code) {
            this.conn.close(code, reason || "");
          } else {
            this.conn.close();
          }
        }
        this.waitForSocketClosed(() => {
          if (this.conn) {
            this.conn.onopen = function() {
            };
            this.conn.onerror = function() {
            };
            this.conn.onmessage = function() {
            };
            this.conn.onclose = function() {
            };
            this.conn = null;
          }
          callback && callback();
        });
      });
    }
    waitForBufferDone(callback, tries = 1) {
      if (tries === 5 || !this.conn || !this.conn.bufferedAmount) {
        callback();
        return;
      }
      setTimeout(() => {
        this.waitForBufferDone(callback, tries + 1);
      }, 150 * tries);
    }
    waitForSocketClosed(callback, tries = 1) {
      if (tries === 5 || !this.conn || this.conn.readyState === SOCKET_STATES.closed) {
        callback();
        return;
      }
      setTimeout(() => {
        this.waitForSocketClosed(callback, tries + 1);
      }, 150 * tries);
    }
    onConnClose(event) {
      let closeCode = event && event.code;
      if (this.hasLogger())
        this.log("transport", "close", event);
      this.triggerChanError();
      this.clearHeartbeats();
      if (!this.closeWasClean && closeCode !== 1e3) {
        this.reconnectTimer.scheduleTimeout();
      }
      this.stateChangeCallbacks.close.forEach(([, callback]) => callback(event));
    }
    onConnError(error) {
      if (this.hasLogger())
        this.log("transport", error);
      let transportBefore = this.transport;
      let establishedBefore = this.establishedConnections;
      this.stateChangeCallbacks.error.forEach(([, callback]) => {
        callback(error, transportBefore, establishedBefore);
      });
      if (transportBefore === this.transport || establishedBefore > 0) {
        this.triggerChanError();
      }
    }
    triggerChanError() {
      this.channels.forEach((channel2) => {
        if (!(channel2.isErrored() || channel2.isLeaving() || channel2.isClosed())) {
          channel2.trigger(CHANNEL_EVENTS.error);
        }
      });
    }
    connectionState() {
      switch (this.conn && this.conn.readyState) {
        case SOCKET_STATES.connecting:
          return "connecting";
        case SOCKET_STATES.open:
          return "open";
        case SOCKET_STATES.closing:
          return "closing";
        default:
          return "closed";
      }
    }
    isConnected() {
      return this.connectionState() === "open";
    }
    remove(channel2) {
      this.off(channel2.stateChangeRefs);
      this.channels = this.channels.filter((c) => c.joinRef() !== channel2.joinRef());
    }
    off(refs) {
      for (let key in this.stateChangeCallbacks) {
        this.stateChangeCallbacks[key] = this.stateChangeCallbacks[key].filter(([ref]) => {
          return refs.indexOf(ref) === -1;
        });
      }
    }
    channel(topic, chanParams = {}) {
      let chan = new Channel(topic, chanParams, this);
      this.channels.push(chan);
      return chan;
    }
    push(data) {
      if (this.hasLogger()) {
        let { topic, event, payload, ref, join_ref } = data;
        this.log("push", `${topic} ${event} (${join_ref}, ${ref})`, payload);
      }
      if (this.isConnected()) {
        this.encode(data, (result) => this.conn.send(result));
      } else {
        this.sendBuffer.push(() => this.encode(data, (result) => this.conn.send(result)));
      }
    }
    makeRef() {
      let newRef = this.ref + 1;
      if (newRef === this.ref) {
        this.ref = 0;
      } else {
        this.ref = newRef;
      }
      return this.ref.toString();
    }
    sendHeartbeat() {
      if (this.pendingHeartbeatRef && !this.isConnected()) {
        return;
      }
      this.pendingHeartbeatRef = this.makeRef();
      this.push({ topic: "phoenix", event: "heartbeat", payload: {}, ref: this.pendingHeartbeatRef });
      this.heartbeatTimeoutTimer = setTimeout(() => this.heartbeatTimeout(), this.heartbeatIntervalMs);
    }
    flushSendBuffer() {
      if (this.isConnected() && this.sendBuffer.length > 0) {
        this.sendBuffer.forEach((callback) => callback());
        this.sendBuffer = [];
      }
    }
    onConnMessage(rawMessage) {
      this.decode(rawMessage.data, (msg) => {
        let { topic, event, payload, ref, join_ref } = msg;
        if (ref && ref === this.pendingHeartbeatRef) {
          this.clearHeartbeats();
          this.pendingHeartbeatRef = null;
          this.heartbeatTimer = setTimeout(() => this.sendHeartbeat(), this.heartbeatIntervalMs);
        }
        if (this.hasLogger())
          this.log("receive", `${payload.status || ""} ${topic} ${event} ${ref && "(" + ref + ")" || ""}`, payload);
        for (let i = 0; i < this.channels.length; i++) {
          const channel2 = this.channels[i];
          if (!channel2.isMember(topic, event, payload, join_ref)) {
            continue;
          }
          channel2.trigger(event, payload, ref, join_ref);
        }
        for (let i = 0; i < this.stateChangeCallbacks.message.length; i++) {
          let [, callback] = this.stateChangeCallbacks.message[i];
          callback(msg);
        }
      });
    }
    leaveOpenTopic(topic) {
      let dupChannel = this.channels.find((c) => c.topic === topic && (c.isJoined() || c.isJoining()));
      if (dupChannel) {
        if (this.hasLogger())
          this.log("transport", `leaving duplicate topic "${topic}"`);
        dupChannel.leave();
      }
    }
  };

  // js/client_socket.js
  var socket = new Socket("/client", { params: { token: window.userToken } });
  if (window.userToken) {
    socket.connect();
  }
  var connectButton = document.querySelector("#connect-button");
  var actionInput = document.querySelector("#action-input");
  var callButton = document.querySelector("#call-button");
  var channel = null;
  if (connectButton) {
    connectButton.addEventListener("click", (event) => {
      console.log("connect");
      channel = socket.channel("match:1");
      channel.join().receive("ok", (resp) => {
        console.log("Joined successfully", resp);
      }).receive("error", (resp) => {
        console.log("Unable to join", resp);
      });
      channel.on("result", (payload) => {
        console.log(payload);
      });
    });
    callButton.addEventListener("click", (event) => {
      console.log("Call button pressed");
      action = actionInput.value;
      actionInput.value = "";
      channel.push("call", { action });
    });
  }

  // ../deps/phoenix_html/priv/static/phoenix_html.js
  (function() {
    var PolyfillEvent = eventConstructor();
    function eventConstructor() {
      if (typeof window.CustomEvent === "function")
        return window.CustomEvent;
      function CustomEvent2(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: void 0 };
        var evt = document.createEvent("CustomEvent");
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
      }
      CustomEvent2.prototype = window.Event.prototype;
      return CustomEvent2;
    }
    function buildHiddenInput(name, value) {
      var input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      input.value = value;
      return input;
    }
    function handleClick(element, targetModifierKey) {
      var to = element.getAttribute("data-to"), method = buildHiddenInput("_method", element.getAttribute("data-method")), csrf = buildHiddenInput("_csrf_token", element.getAttribute("data-csrf")), form = document.createElement("form"), submit = document.createElement("input"), target = element.getAttribute("target");
      form.method = element.getAttribute("data-method") === "get" ? "get" : "post";
      form.action = to;
      form.style.display = "none";
      if (target)
        form.target = target;
      else if (targetModifierKey)
        form.target = "_blank";
      form.appendChild(csrf);
      form.appendChild(method);
      document.body.appendChild(form);
      submit.type = "submit";
      form.appendChild(submit);
      submit.click();
    }
    window.addEventListener("click", function(e) {
      var element = e.target;
      if (e.defaultPrevented)
        return;
      while (element && element.getAttribute) {
        var phoenixLinkEvent = new PolyfillEvent("phoenix.link.click", {
          "bubbles": true,
          "cancelable": true
        });
        if (!element.dispatchEvent(phoenixLinkEvent)) {
          e.preventDefault();
          e.stopImmediatePropagation();
          return false;
        }
        if (element.getAttribute("data-method")) {
          handleClick(element, e.metaKey || e.shiftKey);
          e.preventDefault();
          return false;
        } else {
          element = element.parentNode;
        }
      }
    }, false);
    window.addEventListener("phoenix.link.click", function(e) {
      var message = e.target.getAttribute("data-confirm");
      if (message && !window.confirm(message)) {
        e.preventDefault();
      }
    }, false);
  })();

  // ../deps/phoenix_live_view/priv/static/phoenix_live_view.esm.js
  var CONSECUTIVE_RELOADS = "consecutive-reloads";
  var MAX_RELOADS = 10;
  var RELOAD_JITTER_MIN = 5e3;
  var RELOAD_JITTER_MAX = 1e4;
  var FAILSAFE_JITTER = 3e4;
  var PHX_EVENT_CLASSES = [
    "phx-click-loading",
    "phx-change-loading",
    "phx-submit-loading",
    "phx-keydown-loading",
    "phx-keyup-loading",
    "phx-blur-loading",
    "phx-focus-loading"
  ];
  var PHX_COMPONENT = "data-phx-component";
  var PHX_LIVE_LINK = "data-phx-link";
  var PHX_TRACK_STATIC = "track-static";
  var PHX_LINK_STATE = "data-phx-link-state";
  var PHX_REF = "data-phx-ref";
  var PHX_REF_SRC = "data-phx-ref-src";
  var PHX_TRACK_UPLOADS = "track-uploads";
  var PHX_UPLOAD_REF = "data-phx-upload-ref";
  var PHX_PREFLIGHTED_REFS = "data-phx-preflighted-refs";
  var PHX_DONE_REFS = "data-phx-done-refs";
  var PHX_DROP_TARGET = "drop-target";
  var PHX_ACTIVE_ENTRY_REFS = "data-phx-active-refs";
  var PHX_LIVE_FILE_UPDATED = "phx:live-file:updated";
  var PHX_SKIP = "data-phx-skip";
  var PHX_PRUNE = "data-phx-prune";
  var PHX_PAGE_LOADING = "page-loading";
  var PHX_CONNECTED_CLASS = "phx-connected";
  var PHX_LOADING_CLASS = "phx-loading";
  var PHX_NO_FEEDBACK_CLASS = "phx-no-feedback";
  var PHX_ERROR_CLASS = "phx-error";
  var PHX_CLIENT_ERROR_CLASS = "phx-client-error";
  var PHX_SERVER_ERROR_CLASS = "phx-server-error";
  var PHX_PARENT_ID = "data-phx-parent-id";
  var PHX_MAIN = "data-phx-main";
  var PHX_ROOT_ID = "data-phx-root-id";
  var PHX_VIEWPORT_TOP = "viewport-top";
  var PHX_VIEWPORT_BOTTOM = "viewport-bottom";
  var PHX_TRIGGER_ACTION = "trigger-action";
  var PHX_FEEDBACK_FOR = "feedback-for";
  var PHX_HAS_FOCUSED = "phx-has-focused";
  var FOCUSABLE_INPUTS = ["text", "textarea", "number", "email", "password", "search", "tel", "url", "date", "time", "datetime-local", "color", "range"];
  var CHECKABLE_INPUTS = ["checkbox", "radio"];
  var PHX_HAS_SUBMITTED = "phx-has-submitted";
  var PHX_SESSION = "data-phx-session";
  var PHX_VIEW_SELECTOR = `[${PHX_SESSION}]`;
  var PHX_STICKY = "data-phx-sticky";
  var PHX_STATIC = "data-phx-static";
  var PHX_READONLY = "data-phx-readonly";
  var PHX_DISABLED = "data-phx-disabled";
  var PHX_DISABLE_WITH = "disable-with";
  var PHX_DISABLE_WITH_RESTORE = "data-phx-disable-with-restore";
  var PHX_HOOK = "hook";
  var PHX_DEBOUNCE = "debounce";
  var PHX_THROTTLE = "throttle";
  var PHX_UPDATE = "update";
  var PHX_STREAM = "stream";
  var PHX_STREAM_REF = "data-phx-stream";
  var PHX_KEY = "key";
  var PHX_PRIVATE = "phxPrivate";
  var PHX_AUTO_RECOVER = "auto-recover";
  var PHX_LV_DEBUG = "phx:live-socket:debug";
  var PHX_LV_PROFILE = "phx:live-socket:profiling";
  var PHX_LV_LATENCY_SIM = "phx:live-socket:latency-sim";
  var PHX_PROGRESS = "progress";
  var PHX_MOUNTED = "mounted";
  var LOADER_TIMEOUT = 1;
  var BEFORE_UNLOAD_LOADER_TIMEOUT = 200;
  var BINDING_PREFIX = "phx-";
  var PUSH_TIMEOUT = 3e4;
  var DEBOUNCE_TRIGGER = "debounce-trigger";
  var THROTTLED = "throttled";
  var DEBOUNCE_PREV_KEY = "debounce-prev-key";
  var DEFAULTS = {
    debounce: 300,
    throttle: 300
  };
  var DYNAMICS = "d";
  var STATIC = "s";
  var COMPONENTS = "c";
  var EVENTS = "e";
  var REPLY = "r";
  var TITLE = "t";
  var TEMPLATES = "p";
  var STREAM = "stream";
  var EntryUploader = class {
    constructor(entry, chunkSize, liveSocket2) {
      this.liveSocket = liveSocket2;
      this.entry = entry;
      this.offset = 0;
      this.chunkSize = chunkSize;
      this.chunkTimer = null;
      this.errored = false;
      this.uploadChannel = liveSocket2.channel(`lvu:${entry.ref}`, { token: entry.metadata() });
    }
    error(reason) {
      if (this.errored) {
        return;
      }
      this.errored = true;
      clearTimeout(this.chunkTimer);
      this.entry.error(reason);
    }
    upload() {
      this.uploadChannel.onError((reason) => this.error(reason));
      this.uploadChannel.join().receive("ok", (_data) => this.readNextChunk()).receive("error", (reason) => this.error(reason));
    }
    isDone() {
      return this.offset >= this.entry.file.size;
    }
    readNextChunk() {
      let reader = new window.FileReader();
      let blob = this.entry.file.slice(this.offset, this.chunkSize + this.offset);
      reader.onload = (e) => {
        if (e.target.error === null) {
          this.offset += e.target.result.byteLength;
          this.pushChunk(e.target.result);
        } else {
          return logError("Read error: " + e.target.error);
        }
      };
      reader.readAsArrayBuffer(blob);
    }
    pushChunk(chunk) {
      if (!this.uploadChannel.isJoined()) {
        return;
      }
      this.uploadChannel.push("chunk", chunk).receive("ok", () => {
        this.entry.progress(this.offset / this.entry.file.size * 100);
        if (!this.isDone()) {
          this.chunkTimer = setTimeout(() => this.readNextChunk(), this.liveSocket.getLatencySim() || 0);
        }
      }).receive("error", ({ reason }) => this.error(reason));
    }
  };
  var logError = (msg, obj) => console.error && console.error(msg, obj);
  var isCid = (cid) => {
    let type = typeof cid;
    return type === "number" || type === "string" && /^(0|[1-9]\d*)$/.test(cid);
  };
  function detectDuplicateIds() {
    let ids = /* @__PURE__ */ new Set();
    let elems = document.querySelectorAll("*[id]");
    for (let i = 0, len = elems.length; i < len; i++) {
      if (ids.has(elems[i].id)) {
        console.error(`Multiple IDs detected: ${elems[i].id}. Ensure unique element ids.`);
      } else {
        ids.add(elems[i].id);
      }
    }
  }
  var debug = (view, kind, msg, obj) => {
    if (view.liveSocket.isDebugEnabled()) {
      console.log(`${view.id} ${kind}: ${msg} - `, obj);
    }
  };
  var closure2 = (val) => typeof val === "function" ? val : function() {
    return val;
  };
  var clone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
  };
  var closestPhxBinding = (el, binding, borderEl) => {
    do {
      if (el.matches(`[${binding}]`) && !el.disabled) {
        return el;
      }
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1 && !(borderEl && borderEl.isSameNode(el) || el.matches(PHX_VIEW_SELECTOR)));
    return null;
  };
  var isObject = (obj) => {
    return obj !== null && typeof obj === "object" && !(obj instanceof Array);
  };
  var isEqualObj = (obj1, obj2) => JSON.stringify(obj1) === JSON.stringify(obj2);
  var isEmpty = (obj) => {
    for (let x in obj) {
      return false;
    }
    return true;
  };
  var maybe = (el, callback) => el && callback(el);
  var channelUploader = function(entries, onError, resp, liveSocket2) {
    entries.forEach((entry) => {
      let entryUploader = new EntryUploader(entry, resp.config.chunk_size, liveSocket2);
      entryUploader.upload();
    });
  };
  var Browser = {
    canPushState() {
      return typeof history.pushState !== "undefined";
    },
    dropLocal(localStorage, namespace, subkey) {
      return localStorage.removeItem(this.localKey(namespace, subkey));
    },
    updateLocal(localStorage, namespace, subkey, initial, func) {
      let current = this.getLocal(localStorage, namespace, subkey);
      let key = this.localKey(namespace, subkey);
      let newVal = current === null ? initial : func(current);
      localStorage.setItem(key, JSON.stringify(newVal));
      return newVal;
    },
    getLocal(localStorage, namespace, subkey) {
      return JSON.parse(localStorage.getItem(this.localKey(namespace, subkey)));
    },
    updateCurrentState(callback) {
      if (!this.canPushState()) {
        return;
      }
      history.replaceState(callback(history.state || {}), "", window.location.href);
    },
    pushState(kind, meta, to) {
      if (this.canPushState()) {
        if (to !== window.location.href) {
          if (meta.type == "redirect" && meta.scroll) {
            let currentState = history.state || {};
            currentState.scroll = meta.scroll;
            history.replaceState(currentState, "", window.location.href);
          }
          delete meta.scroll;
          history[kind + "State"](meta, "", to || null);
          let hashEl = this.getHashTargetEl(window.location.hash);
          if (hashEl) {
            hashEl.scrollIntoView();
          } else if (meta.type === "redirect") {
            window.scroll(0, 0);
          }
        }
      } else {
        this.redirect(to);
      }
    },
    setCookie(name, value) {
      document.cookie = `${name}=${value}`;
    },
    getCookie(name) {
      return document.cookie.replace(new RegExp(`(?:(?:^|.*;s*)${name}s*=s*([^;]*).*$)|^.*$`), "$1");
    },
    redirect(toURL, flash) {
      if (flash) {
        Browser.setCookie("__phoenix_flash__", flash + "; max-age=60000; path=/");
      }
      window.location = toURL;
    },
    localKey(namespace, subkey) {
      return `${namespace}-${subkey}`;
    },
    getHashTargetEl(maybeHash) {
      let hash = maybeHash.toString().substring(1);
      if (hash === "") {
        return;
      }
      return document.getElementById(hash) || document.querySelector(`a[name="${hash}"]`);
    }
  };
  var browser_default = Browser;
  var DOM = {
    byId(id) {
      return document.getElementById(id) || logError(`no id found for ${id}`);
    },
    removeClass(el, className) {
      el.classList.remove(className);
      if (el.classList.length === 0) {
        el.removeAttribute("class");
      }
    },
    all(node, query, callback) {
      if (!node) {
        return [];
      }
      let array = Array.from(node.querySelectorAll(query));
      return callback ? array.forEach(callback) : array;
    },
    childNodeLength(html) {
      let template = document.createElement("template");
      template.innerHTML = html;
      return template.content.childElementCount;
    },
    isUploadInput(el) {
      return el.type === "file" && el.getAttribute(PHX_UPLOAD_REF) !== null;
    },
    findUploadInputs(node) {
      return this.all(node, `input[type="file"][${PHX_UPLOAD_REF}]`);
    },
    findComponentNodeList(node, cid) {
      return this.filterWithinSameLiveView(this.all(node, `[${PHX_COMPONENT}="${cid}"]`), node);
    },
    isPhxDestroyed(node) {
      return node.id && DOM.private(node, "destroyed") ? true : false;
    },
    wantsNewTab(e) {
      let wantsNewTab = e.ctrlKey || e.shiftKey || e.metaKey || e.button && e.button === 1;
      let isDownload = e.target instanceof HTMLAnchorElement && e.target.hasAttribute("download");
      let isTargetBlank = e.target.hasAttribute("target") && e.target.getAttribute("target").toLowerCase() === "_blank";
      return wantsNewTab || isTargetBlank || isDownload;
    },
    isUnloadableFormSubmit(e) {
      return !e.defaultPrevented && !this.wantsNewTab(e);
    },
    isNewPageClick(e, currentLocation) {
      let href = e.target instanceof HTMLAnchorElement ? e.target.getAttribute("href") : null;
      let url;
      if (e.defaultPrevented || href === null || this.wantsNewTab(e)) {
        return false;
      }
      if (href.startsWith("mailto:") || href.startsWith("tel:")) {
        return false;
      }
      try {
        url = new URL(href);
      } catch (e2) {
        try {
          url = new URL(href, currentLocation);
        } catch (e3) {
          return true;
        }
      }
      if (url.host === currentLocation.host && url.protocol === currentLocation.protocol) {
        if (url.pathname === currentLocation.pathname && url.search === currentLocation.search) {
          return url.hash === "" && !url.href.endsWith("#");
        }
      }
      return url.protocol.startsWith("http");
    },
    markPhxChildDestroyed(el) {
      if (this.isPhxChild(el)) {
        el.setAttribute(PHX_SESSION, "");
      }
      this.putPrivate(el, "destroyed", true);
    },
    findPhxChildrenInFragment(html, parentId) {
      let template = document.createElement("template");
      template.innerHTML = html;
      return this.findPhxChildren(template.content, parentId);
    },
    isIgnored(el, phxUpdate) {
      return (el.getAttribute(phxUpdate) || el.getAttribute("data-phx-update")) === "ignore";
    },
    isPhxUpdate(el, phxUpdate, updateTypes) {
      return el.getAttribute && updateTypes.indexOf(el.getAttribute(phxUpdate)) >= 0;
    },
    findPhxSticky(el) {
      return this.all(el, `[${PHX_STICKY}]`);
    },
    findPhxChildren(el, parentId) {
      return this.all(el, `${PHX_VIEW_SELECTOR}[${PHX_PARENT_ID}="${parentId}"]`);
    },
    findParentCIDs(node, cids) {
      let initial = new Set(cids);
      let parentCids = cids.reduce((acc, cid) => {
        let selector = `[${PHX_COMPONENT}="${cid}"] [${PHX_COMPONENT}]`;
        this.filterWithinSameLiveView(this.all(node, selector), node).map((el) => parseInt(el.getAttribute(PHX_COMPONENT))).forEach((childCID) => acc.delete(childCID));
        return acc;
      }, initial);
      return parentCids.size === 0 ? new Set(cids) : parentCids;
    },
    filterWithinSameLiveView(nodes, parent) {
      if (parent.querySelector(PHX_VIEW_SELECTOR)) {
        return nodes.filter((el) => this.withinSameLiveView(el, parent));
      } else {
        return nodes;
      }
    },
    withinSameLiveView(node, parent) {
      while (node = node.parentNode) {
        if (node.isSameNode(parent)) {
          return true;
        }
        if (node.getAttribute(PHX_SESSION) !== null) {
          return false;
        }
      }
    },
    private(el, key) {
      return el[PHX_PRIVATE] && el[PHX_PRIVATE][key];
    },
    deletePrivate(el, key) {
      el[PHX_PRIVATE] && delete el[PHX_PRIVATE][key];
    },
    putPrivate(el, key, value) {
      if (!el[PHX_PRIVATE]) {
        el[PHX_PRIVATE] = {};
      }
      el[PHX_PRIVATE][key] = value;
    },
    updatePrivate(el, key, defaultVal, updateFunc) {
      let existing = this.private(el, key);
      if (existing === void 0) {
        this.putPrivate(el, key, updateFunc(defaultVal));
      } else {
        this.putPrivate(el, key, updateFunc(existing));
      }
    },
    copyPrivates(target, source) {
      if (source[PHX_PRIVATE]) {
        target[PHX_PRIVATE] = source[PHX_PRIVATE];
      }
    },
    putTitle(str) {
      let titleEl = document.querySelector("title");
      if (titleEl) {
        let { prefix, suffix } = titleEl.dataset;
        document.title = `${prefix || ""}${str}${suffix || ""}`;
      } else {
        document.title = str;
      }
    },
    debounce(el, event, phxDebounce, defaultDebounce, phxThrottle, defaultThrottle, asyncFilter, callback) {
      let debounce = el.getAttribute(phxDebounce);
      let throttle = el.getAttribute(phxThrottle);
      if (debounce === "") {
        debounce = defaultDebounce;
      }
      if (throttle === "") {
        throttle = defaultThrottle;
      }
      let value = debounce || throttle;
      switch (value) {
        case null:
          return callback();
        case "blur":
          if (this.once(el, "debounce-blur")) {
            el.addEventListener("blur", () => callback());
          }
          return;
        default:
          let timeout = parseInt(value);
          let trigger = () => throttle ? this.deletePrivate(el, THROTTLED) : callback();
          let currentCycle = this.incCycle(el, DEBOUNCE_TRIGGER, trigger);
          if (isNaN(timeout)) {
            return logError(`invalid throttle/debounce value: ${value}`);
          }
          if (throttle) {
            let newKeyDown = false;
            if (event.type === "keydown") {
              let prevKey = this.private(el, DEBOUNCE_PREV_KEY);
              this.putPrivate(el, DEBOUNCE_PREV_KEY, event.key);
              newKeyDown = prevKey !== event.key;
            }
            if (!newKeyDown && this.private(el, THROTTLED)) {
              return false;
            } else {
              callback();
              this.putPrivate(el, THROTTLED, true);
              setTimeout(() => {
                if (asyncFilter()) {
                  this.triggerCycle(el, DEBOUNCE_TRIGGER);
                }
              }, timeout);
            }
          } else {
            setTimeout(() => {
              if (asyncFilter()) {
                this.triggerCycle(el, DEBOUNCE_TRIGGER, currentCycle);
              }
            }, timeout);
          }
          let form = el.form;
          if (form && this.once(form, "bind-debounce")) {
            form.addEventListener("submit", () => {
              Array.from(new FormData(form).entries(), ([name]) => {
                let input = form.querySelector(`[name="${name}"]`);
                this.incCycle(input, DEBOUNCE_TRIGGER);
                this.deletePrivate(input, THROTTLED);
              });
            });
          }
          if (this.once(el, "bind-debounce")) {
            el.addEventListener("blur", () => this.triggerCycle(el, DEBOUNCE_TRIGGER));
          }
      }
    },
    triggerCycle(el, key, currentCycle) {
      let [cycle, trigger] = this.private(el, key);
      if (!currentCycle) {
        currentCycle = cycle;
      }
      if (currentCycle === cycle) {
        this.incCycle(el, key);
        trigger();
      }
    },
    once(el, key) {
      if (this.private(el, key) === true) {
        return false;
      }
      this.putPrivate(el, key, true);
      return true;
    },
    incCycle(el, key, trigger = function() {
    }) {
      let [currentCycle] = this.private(el, key) || [0, trigger];
      currentCycle++;
      this.putPrivate(el, key, [currentCycle, trigger]);
      return currentCycle;
    },
    maybeAddPrivateHooks(el, phxViewportTop, phxViewportBottom) {
      if (el.hasAttribute && (el.hasAttribute(phxViewportTop) || el.hasAttribute(phxViewportBottom))) {
        el.setAttribute("data-phx-hook", "Phoenix.InfiniteScroll");
      }
    },
    maybeHideFeedback(container, input, phxFeedbackFor) {
      if (!(this.private(input, PHX_HAS_FOCUSED) || this.private(input, PHX_HAS_SUBMITTED))) {
        let feedbacks = [input.name];
        if (input.name.endsWith("[]")) {
          feedbacks.push(input.name.slice(0, -2));
        }
        let selector = feedbacks.map((f) => `[${phxFeedbackFor}="${f}"]`).join(", ");
        DOM.all(container, selector, (el) => el.classList.add(PHX_NO_FEEDBACK_CLASS));
      }
    },
    resetForm(form, phxFeedbackFor) {
      Array.from(form.elements).forEach((input) => {
        let query = `[${phxFeedbackFor}="${input.id}"],
                   [${phxFeedbackFor}="${input.name}"],
                   [${phxFeedbackFor}="${input.name.replace(/\[\]$/, "")}"]`;
        this.deletePrivate(input, PHX_HAS_FOCUSED);
        this.deletePrivate(input, PHX_HAS_SUBMITTED);
        this.all(document, query, (feedbackEl) => {
          feedbackEl.classList.add(PHX_NO_FEEDBACK_CLASS);
        });
      });
    },
    showError(inputEl, phxFeedbackFor) {
      if (inputEl.id || inputEl.name) {
        this.all(inputEl.form, `[${phxFeedbackFor}="${inputEl.id}"], [${phxFeedbackFor}="${inputEl.name}"]`, (el) => {
          this.removeClass(el, PHX_NO_FEEDBACK_CLASS);
        });
      }
    },
    isPhxChild(node) {
      return node.getAttribute && node.getAttribute(PHX_PARENT_ID);
    },
    isPhxSticky(node) {
      return node.getAttribute && node.getAttribute(PHX_STICKY) !== null;
    },
    firstPhxChild(el) {
      return this.isPhxChild(el) ? el : this.all(el, `[${PHX_PARENT_ID}]`)[0];
    },
    dispatchEvent(target, name, opts = {}) {
      let bubbles = opts.bubbles === void 0 ? true : !!opts.bubbles;
      let eventOpts = { bubbles, cancelable: true, detail: opts.detail || {} };
      let event = name === "click" ? new MouseEvent("click", eventOpts) : new CustomEvent(name, eventOpts);
      target.dispatchEvent(event);
    },
    cloneNode(node, html) {
      if (typeof html === "undefined") {
        return node.cloneNode(true);
      } else {
        let cloned = node.cloneNode(false);
        cloned.innerHTML = html;
        return cloned;
      }
    },
    mergeAttrs(target, source, opts = {}) {
      let exclude = opts.exclude || [];
      let isIgnored = opts.isIgnored;
      let sourceAttrs = source.attributes;
      for (let i = sourceAttrs.length - 1; i >= 0; i--) {
        let name = sourceAttrs[i].name;
        if (exclude.indexOf(name) < 0) {
          target.setAttribute(name, source.getAttribute(name));
        }
      }
      let targetAttrs = target.attributes;
      for (let i = targetAttrs.length - 1; i >= 0; i--) {
        let name = targetAttrs[i].name;
        if (isIgnored) {
          if (name.startsWith("data-") && !source.hasAttribute(name)) {
            target.removeAttribute(name);
          }
        } else {
          if (!source.hasAttribute(name)) {
            target.removeAttribute(name);
          }
        }
      }
    },
    mergeFocusedInput(target, source) {
      if (!(target instanceof HTMLSelectElement)) {
        DOM.mergeAttrs(target, source, { exclude: ["value"] });
      }
      if (source.readOnly) {
        target.setAttribute("readonly", true);
      } else {
        target.removeAttribute("readonly");
      }
    },
    hasSelectionRange(el) {
      return el.setSelectionRange && (el.type === "text" || el.type === "textarea");
    },
    restoreFocus(focused, selectionStart, selectionEnd) {
      if (!DOM.isTextualInput(focused)) {
        return;
      }
      let wasFocused = focused.matches(":focus");
      if (focused.readOnly) {
        focused.blur();
      }
      if (!wasFocused) {
        focused.focus();
      }
      if (this.hasSelectionRange(focused)) {
        focused.setSelectionRange(selectionStart, selectionEnd);
      }
    },
    isFormInput(el) {
      return /^(?:input|select|textarea)$/i.test(el.tagName) && el.type !== "button";
    },
    syncAttrsToProps(el) {
      if (el instanceof HTMLInputElement && CHECKABLE_INPUTS.indexOf(el.type.toLocaleLowerCase()) >= 0) {
        el.checked = el.getAttribute("checked") !== null;
      }
    },
    isTextualInput(el) {
      return FOCUSABLE_INPUTS.indexOf(el.type) >= 0;
    },
    isNowTriggerFormExternal(el, phxTriggerExternal) {
      return el.getAttribute && el.getAttribute(phxTriggerExternal) !== null;
    },
    syncPendingRef(fromEl, toEl, disableWith) {
      let ref = fromEl.getAttribute(PHX_REF);
      if (ref === null) {
        return true;
      }
      let refSrc = fromEl.getAttribute(PHX_REF_SRC);
      if (DOM.isFormInput(fromEl) || fromEl.getAttribute(disableWith) !== null) {
        if (DOM.isUploadInput(fromEl)) {
          DOM.mergeAttrs(fromEl, toEl, { isIgnored: true });
        }
        DOM.putPrivate(fromEl, PHX_REF, toEl);
        return false;
      } else {
        PHX_EVENT_CLASSES.forEach((className) => {
          fromEl.classList.contains(className) && toEl.classList.add(className);
        });
        toEl.setAttribute(PHX_REF, ref);
        toEl.setAttribute(PHX_REF_SRC, refSrc);
        return true;
      }
    },
    cleanChildNodes(container, phxUpdate) {
      if (DOM.isPhxUpdate(container, phxUpdate, ["append", "prepend"])) {
        let toRemove = [];
        container.childNodes.forEach((childNode) => {
          if (!childNode.id) {
            let isEmptyTextNode = childNode.nodeType === Node.TEXT_NODE && childNode.nodeValue.trim() === "";
            if (!isEmptyTextNode) {
              logError(`only HTML element tags with an id are allowed inside containers with phx-update.

removing illegal node: "${(childNode.outerHTML || childNode.nodeValue).trim()}"

`);
            }
            toRemove.push(childNode);
          }
        });
        toRemove.forEach((childNode) => childNode.remove());
      }
    },
    replaceRootContainer(container, tagName, attrs) {
      let retainedAttrs = /* @__PURE__ */ new Set(["id", PHX_SESSION, PHX_STATIC, PHX_MAIN, PHX_ROOT_ID]);
      if (container.tagName.toLowerCase() === tagName.toLowerCase()) {
        Array.from(container.attributes).filter((attr) => !retainedAttrs.has(attr.name.toLowerCase())).forEach((attr) => container.removeAttribute(attr.name));
        Object.keys(attrs).filter((name) => !retainedAttrs.has(name.toLowerCase())).forEach((attr) => container.setAttribute(attr, attrs[attr]));
        return container;
      } else {
        let newContainer = document.createElement(tagName);
        Object.keys(attrs).forEach((attr) => newContainer.setAttribute(attr, attrs[attr]));
        retainedAttrs.forEach((attr) => newContainer.setAttribute(attr, container.getAttribute(attr)));
        newContainer.innerHTML = container.innerHTML;
        container.replaceWith(newContainer);
        return newContainer;
      }
    },
    getSticky(el, name, defaultVal) {
      let op = (DOM.private(el, "sticky") || []).find(([existingName]) => name === existingName);
      if (op) {
        let [_name, _op, stashedResult] = op;
        return stashedResult;
      } else {
        return typeof defaultVal === "function" ? defaultVal() : defaultVal;
      }
    },
    deleteSticky(el, name) {
      this.updatePrivate(el, "sticky", [], (ops) => {
        return ops.filter(([existingName, _]) => existingName !== name);
      });
    },
    putSticky(el, name, op) {
      let stashedResult = op(el);
      this.updatePrivate(el, "sticky", [], (ops) => {
        let existingIndex = ops.findIndex(([existingName]) => name === existingName);
        if (existingIndex >= 0) {
          ops[existingIndex] = [name, op, stashedResult];
        } else {
          ops.push([name, op, stashedResult]);
        }
        return ops;
      });
    },
    applyStickyOperations(el) {
      let ops = DOM.private(el, "sticky");
      if (!ops) {
        return;
      }
      ops.forEach(([name, op, _stashed]) => this.putSticky(el, name, op));
    }
  };
  var dom_default = DOM;
  var UploadEntry = class {
    static isActive(fileEl, file) {
      let isNew = file._phxRef === void 0;
      let activeRefs = fileEl.getAttribute(PHX_ACTIVE_ENTRY_REFS).split(",");
      let isActive = activeRefs.indexOf(LiveUploader.genFileRef(file)) >= 0;
      return file.size > 0 && (isNew || isActive);
    }
    static isPreflighted(fileEl, file) {
      let preflightedRefs = fileEl.getAttribute(PHX_PREFLIGHTED_REFS).split(",");
      let isPreflighted = preflightedRefs.indexOf(LiveUploader.genFileRef(file)) >= 0;
      return isPreflighted && this.isActive(fileEl, file);
    }
    constructor(fileEl, file, view) {
      this.ref = LiveUploader.genFileRef(file);
      this.fileEl = fileEl;
      this.file = file;
      this.view = view;
      this.meta = null;
      this._isCancelled = false;
      this._isDone = false;
      this._progress = 0;
      this._lastProgressSent = -1;
      this._onDone = function() {
      };
      this._onElUpdated = this.onElUpdated.bind(this);
      this.fileEl.addEventListener(PHX_LIVE_FILE_UPDATED, this._onElUpdated);
    }
    metadata() {
      return this.meta;
    }
    progress(progress) {
      this._progress = Math.floor(progress);
      if (this._progress > this._lastProgressSent) {
        if (this._progress >= 100) {
          this._progress = 100;
          this._lastProgressSent = 100;
          this._isDone = true;
          this.view.pushFileProgress(this.fileEl, this.ref, 100, () => {
            LiveUploader.untrackFile(this.fileEl, this.file);
            this._onDone();
          });
        } else {
          this._lastProgressSent = this._progress;
          this.view.pushFileProgress(this.fileEl, this.ref, this._progress);
        }
      }
    }
    cancel() {
      this._isCancelled = true;
      this._isDone = true;
      this._onDone();
    }
    isDone() {
      return this._isDone;
    }
    error(reason = "failed") {
      this.fileEl.removeEventListener(PHX_LIVE_FILE_UPDATED, this._onElUpdated);
      this.view.pushFileProgress(this.fileEl, this.ref, { error: reason });
      LiveUploader.clearFiles(this.fileEl);
    }
    onDone(callback) {
      this._onDone = () => {
        this.fileEl.removeEventListener(PHX_LIVE_FILE_UPDATED, this._onElUpdated);
        callback();
      };
    }
    onElUpdated() {
      let activeRefs = this.fileEl.getAttribute(PHX_ACTIVE_ENTRY_REFS).split(",");
      if (activeRefs.indexOf(this.ref) === -1) {
        this.cancel();
      }
    }
    toPreflightPayload() {
      return {
        last_modified: this.file.lastModified,
        name: this.file.name,
        relative_path: this.file.webkitRelativePath,
        size: this.file.size,
        type: this.file.type,
        ref: this.ref
      };
    }
    uploader(uploaders) {
      if (this.meta.uploader) {
        let callback = uploaders[this.meta.uploader] || logError(`no uploader configured for ${this.meta.uploader}`);
        return { name: this.meta.uploader, callback };
      } else {
        return { name: "channel", callback: channelUploader };
      }
    }
    zipPostFlight(resp) {
      this.meta = resp.entries[this.ref];
      if (!this.meta) {
        logError(`no preflight upload response returned with ref ${this.ref}`, { input: this.fileEl, response: resp });
      }
    }
  };
  var liveUploaderFileRef = 0;
  var LiveUploader = class {
    static genFileRef(file) {
      let ref = file._phxRef;
      if (ref !== void 0) {
        return ref;
      } else {
        file._phxRef = (liveUploaderFileRef++).toString();
        return file._phxRef;
      }
    }
    static getEntryDataURL(inputEl, ref, callback) {
      let file = this.activeFiles(inputEl).find((file2) => this.genFileRef(file2) === ref);
      callback(URL.createObjectURL(file));
    }
    static hasUploadsInProgress(formEl) {
      let active = 0;
      dom_default.findUploadInputs(formEl).forEach((input) => {
        if (input.getAttribute(PHX_PREFLIGHTED_REFS) !== input.getAttribute(PHX_DONE_REFS)) {
          active++;
        }
      });
      return active > 0;
    }
    static serializeUploads(inputEl) {
      let files = this.activeFiles(inputEl);
      let fileData = {};
      files.forEach((file) => {
        let entry = { path: inputEl.name };
        let uploadRef = inputEl.getAttribute(PHX_UPLOAD_REF);
        fileData[uploadRef] = fileData[uploadRef] || [];
        entry.ref = this.genFileRef(file);
        entry.last_modified = file.lastModified;
        entry.name = file.name || entry.ref;
        entry.relative_path = file.webkitRelativePath;
        entry.type = file.type;
        entry.size = file.size;
        fileData[uploadRef].push(entry);
      });
      return fileData;
    }
    static clearFiles(inputEl) {
      inputEl.value = null;
      inputEl.removeAttribute(PHX_UPLOAD_REF);
      dom_default.putPrivate(inputEl, "files", []);
    }
    static untrackFile(inputEl, file) {
      dom_default.putPrivate(inputEl, "files", dom_default.private(inputEl, "files").filter((f) => !Object.is(f, file)));
    }
    static trackFiles(inputEl, files, dataTransfer) {
      if (inputEl.getAttribute("multiple") !== null) {
        let newFiles = files.filter((file) => !this.activeFiles(inputEl).find((f) => Object.is(f, file)));
        dom_default.putPrivate(inputEl, "files", this.activeFiles(inputEl).concat(newFiles));
        inputEl.value = null;
      } else {
        if (dataTransfer && dataTransfer.files.length > 0) {
          inputEl.files = dataTransfer.files;
        }
        dom_default.putPrivate(inputEl, "files", files);
      }
    }
    static activeFileInputs(formEl) {
      let fileInputs = dom_default.findUploadInputs(formEl);
      return Array.from(fileInputs).filter((el) => el.files && this.activeFiles(el).length > 0);
    }
    static activeFiles(input) {
      return (dom_default.private(input, "files") || []).filter((f) => UploadEntry.isActive(input, f));
    }
    static inputsAwaitingPreflight(formEl) {
      let fileInputs = dom_default.findUploadInputs(formEl);
      return Array.from(fileInputs).filter((input) => this.filesAwaitingPreflight(input).length > 0);
    }
    static filesAwaitingPreflight(input) {
      return this.activeFiles(input).filter((f) => !UploadEntry.isPreflighted(input, f));
    }
    constructor(inputEl, view, onComplete) {
      this.view = view;
      this.onComplete = onComplete;
      this._entries = Array.from(LiveUploader.filesAwaitingPreflight(inputEl) || []).map((file) => new UploadEntry(inputEl, file, view));
      this.numEntriesInProgress = this._entries.length;
    }
    entries() {
      return this._entries;
    }
    initAdapterUpload(resp, onError, liveSocket2) {
      this._entries = this._entries.map((entry) => {
        entry.zipPostFlight(resp);
        entry.onDone(() => {
          this.numEntriesInProgress--;
          if (this.numEntriesInProgress === 0) {
            this.onComplete();
          }
        });
        return entry;
      });
      let groupedEntries = this._entries.reduce((acc, entry) => {
        let { name, callback } = entry.uploader(liveSocket2.uploaders);
        acc[name] = acc[name] || { callback, entries: [] };
        acc[name].entries.push(entry);
        return acc;
      }, {});
      for (let name in groupedEntries) {
        let { callback, entries } = groupedEntries[name];
        callback(entries, onError, resp, liveSocket2);
      }
    }
  };
  var ARIA = {
    focusMain() {
      let target = document.querySelector("main h1, main, h1");
      if (target) {
        let origTabIndex = target.tabIndex;
        target.tabIndex = -1;
        target.focus();
        target.tabIndex = origTabIndex;
      }
    },
    anyOf(instance, classes) {
      return classes.find((name) => instance instanceof name);
    },
    isFocusable(el, interactiveOnly) {
      return el instanceof HTMLAnchorElement && el.rel !== "ignore" || el instanceof HTMLAreaElement && el.href !== void 0 || !el.disabled && this.anyOf(el, [HTMLInputElement, HTMLSelectElement, HTMLTextAreaElement, HTMLButtonElement]) || el instanceof HTMLIFrameElement || (el.tabIndex > 0 || !interactiveOnly && el.tabIndex === 0 && el.getAttribute("tabindex") !== null && el.getAttribute("aria-hidden") !== "true");
    },
    attemptFocus(el, interactiveOnly) {
      if (this.isFocusable(el, interactiveOnly)) {
        try {
          el.focus();
        } catch (e) {
        }
      }
      return !!document.activeElement && document.activeElement.isSameNode(el);
    },
    focusFirstInteractive(el) {
      let child = el.firstElementChild;
      while (child) {
        if (this.attemptFocus(child, true) || this.focusFirstInteractive(child, true)) {
          return true;
        }
        child = child.nextElementSibling;
      }
    },
    focusFirst(el) {
      let child = el.firstElementChild;
      while (child) {
        if (this.attemptFocus(child) || this.focusFirst(child)) {
          return true;
        }
        child = child.nextElementSibling;
      }
    },
    focusLast(el) {
      let child = el.lastElementChild;
      while (child) {
        if (this.attemptFocus(child) || this.focusLast(child)) {
          return true;
        }
        child = child.previousElementSibling;
      }
    }
  };
  var aria_default = ARIA;
  var Hooks = {
    LiveFileUpload: {
      activeRefs() {
        return this.el.getAttribute(PHX_ACTIVE_ENTRY_REFS);
      },
      preflightedRefs() {
        return this.el.getAttribute(PHX_PREFLIGHTED_REFS);
      },
      mounted() {
        this.preflightedWas = this.preflightedRefs();
      },
      updated() {
        let newPreflights = this.preflightedRefs();
        if (this.preflightedWas !== newPreflights) {
          this.preflightedWas = newPreflights;
          if (newPreflights === "") {
            this.__view.cancelSubmit(this.el.form);
          }
        }
        if (this.activeRefs() === "") {
          this.el.value = null;
        }
        this.el.dispatchEvent(new CustomEvent(PHX_LIVE_FILE_UPDATED));
      }
    },
    LiveImgPreview: {
      mounted() {
        this.ref = this.el.getAttribute("data-phx-entry-ref");
        this.inputEl = document.getElementById(this.el.getAttribute(PHX_UPLOAD_REF));
        LiveUploader.getEntryDataURL(this.inputEl, this.ref, (url) => {
          this.url = url;
          this.el.src = url;
        });
      },
      destroyed() {
        URL.revokeObjectURL(this.url);
      }
    },
    FocusWrap: {
      mounted() {
        this.focusStart = this.el.firstElementChild;
        this.focusEnd = this.el.lastElementChild;
        this.focusStart.addEventListener("focus", () => aria_default.focusLast(this.el));
        this.focusEnd.addEventListener("focus", () => aria_default.focusFirst(this.el));
        this.el.addEventListener("phx:show-end", () => this.el.focus());
        if (window.getComputedStyle(this.el).display !== "none") {
          aria_default.focusFirst(this.el);
        }
      }
    }
  };
  var scrollTop = () => document.documentElement.scrollTop || document.body.scrollTop;
  var winHeight = () => window.innerHeight || document.documentElement.clientHeight;
  var isAtViewportTop = (el) => {
    let rect = el.getBoundingClientRect();
    return rect.top >= 0 && rect.left >= 0 && rect.top <= winHeight();
  };
  var isAtViewportBottom = (el) => {
    let rect = el.getBoundingClientRect();
    return rect.right >= 0 && rect.left >= 0 && rect.bottom <= winHeight();
  };
  var isWithinViewport = (el) => {
    let rect = el.getBoundingClientRect();
    return rect.top >= 0 && rect.left >= 0 && rect.top <= winHeight();
  };
  Hooks.InfiniteScroll = {
    mounted() {
      let scrollBefore = scrollTop();
      let topOverran = false;
      let throttleInterval = 500;
      let pendingOp = null;
      let onTopOverrun = this.throttle(throttleInterval, (topEvent, firstChild) => {
        pendingOp = () => true;
        this.liveSocket.execJSHookPush(this.el, topEvent, { id: firstChild.id, _overran: true }, () => {
          pendingOp = null;
        });
      });
      let onFirstChildAtTop = this.throttle(throttleInterval, (topEvent, firstChild) => {
        pendingOp = () => firstChild.scrollIntoView({ block: "start" });
        this.liveSocket.execJSHookPush(this.el, topEvent, { id: firstChild.id }, () => {
          pendingOp = null;
          if (!isWithinViewport(firstChild)) {
            firstChild.scrollIntoView({ block: "start" });
          }
        });
      });
      let onLastChildAtBottom = this.throttle(throttleInterval, (bottomEvent, lastChild) => {
        pendingOp = () => lastChild.scrollIntoView({ block: "end" });
        this.liveSocket.execJSHookPush(this.el, bottomEvent, { id: lastChild.id }, () => {
          pendingOp = null;
          if (!isWithinViewport(lastChild)) {
            lastChild.scrollIntoView({ block: "end" });
          }
        });
      });
      this.onScroll = (e) => {
        let scrollNow = scrollTop();
        if (pendingOp) {
          scrollBefore = scrollNow;
          return pendingOp();
        }
        let rect = this.el.getBoundingClientRect();
        let topEvent = this.el.getAttribute(this.liveSocket.binding("viewport-top"));
        let bottomEvent = this.el.getAttribute(this.liveSocket.binding("viewport-bottom"));
        let lastChild = this.el.lastElementChild;
        let firstChild = this.el.firstElementChild;
        let isScrollingUp = scrollNow < scrollBefore;
        let isScrollingDown = scrollNow > scrollBefore;
        if (isScrollingUp && topEvent && !topOverran && rect.top >= 0) {
          topOverran = true;
          onTopOverrun(topEvent, firstChild);
        } else if (isScrollingDown && topOverran && rect.top <= 0) {
          topOverran = false;
        }
        if (topEvent && isScrollingUp && isAtViewportTop(firstChild)) {
          onFirstChildAtTop(topEvent, firstChild);
        } else if (bottomEvent && isScrollingDown && isAtViewportBottom(lastChild)) {
          onLastChildAtBottom(bottomEvent, lastChild);
        }
        scrollBefore = scrollNow;
      };
      window.addEventListener("scroll", this.onScroll);
    },
    destroyed() {
      window.removeEventListener("scroll", this.onScroll);
    },
    throttle(interval, callback) {
      let lastCallAt = 0;
      let timer;
      return (...args) => {
        let now = Date.now();
        let remainingTime = interval - (now - lastCallAt);
        if (remainingTime <= 0 || remainingTime > interval) {
          if (timer) {
            clearTimeout(timer);
            timer = null;
          }
          lastCallAt = now;
          callback(...args);
        } else if (!timer) {
          timer = setTimeout(() => {
            lastCallAt = Date.now();
            timer = null;
            callback(...args);
          }, remainingTime);
        }
      };
    }
  };
  var hooks_default = Hooks;
  var DOMPostMorphRestorer = class {
    constructor(containerBefore, containerAfter, updateType) {
      let idsBefore = /* @__PURE__ */ new Set();
      let idsAfter = new Set([...containerAfter.children].map((child) => child.id));
      let elementsToModify = [];
      Array.from(containerBefore.children).forEach((child) => {
        if (child.id) {
          idsBefore.add(child.id);
          if (idsAfter.has(child.id)) {
            let previousElementId = child.previousElementSibling && child.previousElementSibling.id;
            elementsToModify.push({ elementId: child.id, previousElementId });
          }
        }
      });
      this.containerId = containerAfter.id;
      this.updateType = updateType;
      this.elementsToModify = elementsToModify;
      this.elementIdsToAdd = [...idsAfter].filter((id) => !idsBefore.has(id));
    }
    perform() {
      let container = dom_default.byId(this.containerId);
      this.elementsToModify.forEach((elementToModify) => {
        if (elementToModify.previousElementId) {
          maybe(document.getElementById(elementToModify.previousElementId), (previousElem) => {
            maybe(document.getElementById(elementToModify.elementId), (elem) => {
              let isInRightPlace = elem.previousElementSibling && elem.previousElementSibling.id == previousElem.id;
              if (!isInRightPlace) {
                previousElem.insertAdjacentElement("afterend", elem);
              }
            });
          });
        } else {
          maybe(document.getElementById(elementToModify.elementId), (elem) => {
            let isInRightPlace = elem.previousElementSibling == null;
            if (!isInRightPlace) {
              container.insertAdjacentElement("afterbegin", elem);
            }
          });
        }
      });
      if (this.updateType == "prepend") {
        this.elementIdsToAdd.reverse().forEach((elemId) => {
          maybe(document.getElementById(elemId), (elem) => container.insertAdjacentElement("afterbegin", elem));
        });
      }
    }
  };
  var DOCUMENT_FRAGMENT_NODE = 11;
  function morphAttrs(fromNode, toNode) {
    var toNodeAttrs = toNode.attributes;
    var attr;
    var attrName;
    var attrNamespaceURI;
    var attrValue;
    var fromValue;
    if (toNode.nodeType === DOCUMENT_FRAGMENT_NODE || fromNode.nodeType === DOCUMENT_FRAGMENT_NODE) {
      return;
    }
    for (var i = toNodeAttrs.length - 1; i >= 0; i--) {
      attr = toNodeAttrs[i];
      attrName = attr.name;
      attrNamespaceURI = attr.namespaceURI;
      attrValue = attr.value;
      if (attrNamespaceURI) {
        attrName = attr.localName || attrName;
        fromValue = fromNode.getAttributeNS(attrNamespaceURI, attrName);
        if (fromValue !== attrValue) {
          if (attr.prefix === "xmlns") {
            attrName = attr.name;
          }
          fromNode.setAttributeNS(attrNamespaceURI, attrName, attrValue);
        }
      } else {
        fromValue = fromNode.getAttribute(attrName);
        if (fromValue !== attrValue) {
          fromNode.setAttribute(attrName, attrValue);
        }
      }
    }
    var fromNodeAttrs = fromNode.attributes;
    for (var d = fromNodeAttrs.length - 1; d >= 0; d--) {
      attr = fromNodeAttrs[d];
      attrName = attr.name;
      attrNamespaceURI = attr.namespaceURI;
      if (attrNamespaceURI) {
        attrName = attr.localName || attrName;
        if (!toNode.hasAttributeNS(attrNamespaceURI, attrName)) {
          fromNode.removeAttributeNS(attrNamespaceURI, attrName);
        }
      } else {
        if (!toNode.hasAttribute(attrName)) {
          fromNode.removeAttribute(attrName);
        }
      }
    }
  }
  var range;
  var NS_XHTML = "http://www.w3.org/1999/xhtml";
  var doc = typeof document === "undefined" ? void 0 : document;
  var HAS_TEMPLATE_SUPPORT = !!doc && "content" in doc.createElement("template");
  var HAS_RANGE_SUPPORT = !!doc && doc.createRange && "createContextualFragment" in doc.createRange();
  function createFragmentFromTemplate(str) {
    var template = doc.createElement("template");
    template.innerHTML = str;
    return template.content.childNodes[0];
  }
  function createFragmentFromRange(str) {
    if (!range) {
      range = doc.createRange();
      range.selectNode(doc.body);
    }
    var fragment = range.createContextualFragment(str);
    return fragment.childNodes[0];
  }
  function createFragmentFromWrap(str) {
    var fragment = doc.createElement("body");
    fragment.innerHTML = str;
    return fragment.childNodes[0];
  }
  function toElement(str) {
    str = str.trim();
    if (HAS_TEMPLATE_SUPPORT) {
      return createFragmentFromTemplate(str);
    } else if (HAS_RANGE_SUPPORT) {
      return createFragmentFromRange(str);
    }
    return createFragmentFromWrap(str);
  }
  function compareNodeNames(fromEl, toEl) {
    var fromNodeName = fromEl.nodeName;
    var toNodeName = toEl.nodeName;
    var fromCodeStart, toCodeStart;
    if (fromNodeName === toNodeName) {
      return true;
    }
    fromCodeStart = fromNodeName.charCodeAt(0);
    toCodeStart = toNodeName.charCodeAt(0);
    if (fromCodeStart <= 90 && toCodeStart >= 97) {
      return fromNodeName === toNodeName.toUpperCase();
    } else if (toCodeStart <= 90 && fromCodeStart >= 97) {
      return toNodeName === fromNodeName.toUpperCase();
    } else {
      return false;
    }
  }
  function createElementNS(name, namespaceURI) {
    return !namespaceURI || namespaceURI === NS_XHTML ? doc.createElement(name) : doc.createElementNS(namespaceURI, name);
  }
  function moveChildren(fromEl, toEl) {
    var curChild = fromEl.firstChild;
    while (curChild) {
      var nextChild = curChild.nextSibling;
      toEl.appendChild(curChild);
      curChild = nextChild;
    }
    return toEl;
  }
  function syncBooleanAttrProp(fromEl, toEl, name) {
    if (fromEl[name] !== toEl[name]) {
      fromEl[name] = toEl[name];
      if (fromEl[name]) {
        fromEl.setAttribute(name, "");
      } else {
        fromEl.removeAttribute(name);
      }
    }
  }
  var specialElHandlers = {
    OPTION: function(fromEl, toEl) {
      var parentNode = fromEl.parentNode;
      if (parentNode) {
        var parentName = parentNode.nodeName.toUpperCase();
        if (parentName === "OPTGROUP") {
          parentNode = parentNode.parentNode;
          parentName = parentNode && parentNode.nodeName.toUpperCase();
        }
        if (parentName === "SELECT" && !parentNode.hasAttribute("multiple")) {
          if (fromEl.hasAttribute("selected") && !toEl.selected) {
            fromEl.setAttribute("selected", "selected");
            fromEl.removeAttribute("selected");
          }
          parentNode.selectedIndex = -1;
        }
      }
      syncBooleanAttrProp(fromEl, toEl, "selected");
    },
    INPUT: function(fromEl, toEl) {
      syncBooleanAttrProp(fromEl, toEl, "checked");
      syncBooleanAttrProp(fromEl, toEl, "disabled");
      if (fromEl.value !== toEl.value) {
        fromEl.value = toEl.value;
      }
      if (!toEl.hasAttribute("value")) {
        fromEl.removeAttribute("value");
      }
    },
    TEXTAREA: function(fromEl, toEl) {
      var newValue = toEl.value;
      if (fromEl.value !== newValue) {
        fromEl.value = newValue;
      }
      var firstChild = fromEl.firstChild;
      if (firstChild) {
        var oldValue = firstChild.nodeValue;
        if (oldValue == newValue || !newValue && oldValue == fromEl.placeholder) {
          return;
        }
        firstChild.nodeValue = newValue;
      }
    },
    SELECT: function(fromEl, toEl) {
      if (!toEl.hasAttribute("multiple")) {
        var selectedIndex = -1;
        var i = 0;
        var curChild = fromEl.firstChild;
        var optgroup;
        var nodeName;
        while (curChild) {
          nodeName = curChild.nodeName && curChild.nodeName.toUpperCase();
          if (nodeName === "OPTGROUP") {
            optgroup = curChild;
            curChild = optgroup.firstChild;
          } else {
            if (nodeName === "OPTION") {
              if (curChild.hasAttribute("selected")) {
                selectedIndex = i;
                break;
              }
              i++;
            }
            curChild = curChild.nextSibling;
            if (!curChild && optgroup) {
              curChild = optgroup.nextSibling;
              optgroup = null;
            }
          }
        }
        fromEl.selectedIndex = selectedIndex;
      }
    }
  };
  var ELEMENT_NODE = 1;
  var DOCUMENT_FRAGMENT_NODE$1 = 11;
  var TEXT_NODE = 3;
  var COMMENT_NODE = 8;
  function noop() {
  }
  function defaultGetNodeKey(node) {
    if (node) {
      return node.getAttribute && node.getAttribute("id") || node.id;
    }
  }
  function morphdomFactory(morphAttrs2) {
    return function morphdom2(fromNode, toNode, options) {
      if (!options) {
        options = {};
      }
      if (typeof toNode === "string") {
        if (fromNode.nodeName === "#document" || fromNode.nodeName === "HTML" || fromNode.nodeName === "BODY") {
          var toNodeHtml = toNode;
          toNode = doc.createElement("html");
          toNode.innerHTML = toNodeHtml;
        } else {
          toNode = toElement(toNode);
        }
      } else if (toNode.nodeType === DOCUMENT_FRAGMENT_NODE$1) {
        toNode = toNode.firstElementChild;
      }
      var getNodeKey = options.getNodeKey || defaultGetNodeKey;
      var onBeforeNodeAdded = options.onBeforeNodeAdded || noop;
      var onNodeAdded = options.onNodeAdded || noop;
      var onBeforeElUpdated = options.onBeforeElUpdated || noop;
      var onElUpdated = options.onElUpdated || noop;
      var onBeforeNodeDiscarded = options.onBeforeNodeDiscarded || noop;
      var onNodeDiscarded = options.onNodeDiscarded || noop;
      var onBeforeElChildrenUpdated = options.onBeforeElChildrenUpdated || noop;
      var skipFromChildren = options.skipFromChildren || noop;
      var addChild = options.addChild || function(parent, child) {
        return parent.appendChild(child);
      };
      var childrenOnly = options.childrenOnly === true;
      var fromNodesLookup = /* @__PURE__ */ Object.create(null);
      var keyedRemovalList = [];
      function addKeyedRemoval(key) {
        keyedRemovalList.push(key);
      }
      function walkDiscardedChildNodes(node, skipKeyedNodes) {
        if (node.nodeType === ELEMENT_NODE) {
          var curChild = node.firstChild;
          while (curChild) {
            var key = void 0;
            if (skipKeyedNodes && (key = getNodeKey(curChild))) {
              addKeyedRemoval(key);
            } else {
              onNodeDiscarded(curChild);
              if (curChild.firstChild) {
                walkDiscardedChildNodes(curChild, skipKeyedNodes);
              }
            }
            curChild = curChild.nextSibling;
          }
        }
      }
      function removeNode(node, parentNode, skipKeyedNodes) {
        if (onBeforeNodeDiscarded(node) === false) {
          return;
        }
        if (parentNode) {
          parentNode.removeChild(node);
        }
        onNodeDiscarded(node);
        walkDiscardedChildNodes(node, skipKeyedNodes);
      }
      function indexTree(node) {
        if (node.nodeType === ELEMENT_NODE || node.nodeType === DOCUMENT_FRAGMENT_NODE$1) {
          var curChild = node.firstChild;
          while (curChild) {
            var key = getNodeKey(curChild);
            if (key) {
              fromNodesLookup[key] = curChild;
            }
            indexTree(curChild);
            curChild = curChild.nextSibling;
          }
        }
      }
      indexTree(fromNode);
      function handleNodeAdded(el) {
        onNodeAdded(el);
        var curChild = el.firstChild;
        while (curChild) {
          var nextSibling = curChild.nextSibling;
          var key = getNodeKey(curChild);
          if (key) {
            var unmatchedFromEl = fromNodesLookup[key];
            if (unmatchedFromEl && compareNodeNames(curChild, unmatchedFromEl)) {
              curChild.parentNode.replaceChild(unmatchedFromEl, curChild);
              morphEl(unmatchedFromEl, curChild);
            } else {
              handleNodeAdded(curChild);
            }
          } else {
            handleNodeAdded(curChild);
          }
          curChild = nextSibling;
        }
      }
      function cleanupFromEl(fromEl, curFromNodeChild, curFromNodeKey) {
        while (curFromNodeChild) {
          var fromNextSibling = curFromNodeChild.nextSibling;
          if (curFromNodeKey = getNodeKey(curFromNodeChild)) {
            addKeyedRemoval(curFromNodeKey);
          } else {
            removeNode(curFromNodeChild, fromEl, true);
          }
          curFromNodeChild = fromNextSibling;
        }
      }
      function morphEl(fromEl, toEl, childrenOnly2) {
        var toElKey = getNodeKey(toEl);
        if (toElKey) {
          delete fromNodesLookup[toElKey];
        }
        if (!childrenOnly2) {
          if (onBeforeElUpdated(fromEl, toEl) === false) {
            return;
          }
          morphAttrs2(fromEl, toEl);
          onElUpdated(fromEl);
          if (onBeforeElChildrenUpdated(fromEl, toEl) === false) {
            return;
          }
        }
        if (fromEl.nodeName !== "TEXTAREA") {
          morphChildren(fromEl, toEl);
        } else {
          specialElHandlers.TEXTAREA(fromEl, toEl);
        }
      }
      function morphChildren(fromEl, toEl) {
        var skipFrom = skipFromChildren(fromEl);
        var curToNodeChild = toEl.firstChild;
        var curFromNodeChild = fromEl.firstChild;
        var curToNodeKey;
        var curFromNodeKey;
        var fromNextSibling;
        var toNextSibling;
        var matchingFromEl;
        outer:
          while (curToNodeChild) {
            toNextSibling = curToNodeChild.nextSibling;
            curToNodeKey = getNodeKey(curToNodeChild);
            while (!skipFrom && curFromNodeChild) {
              fromNextSibling = curFromNodeChild.nextSibling;
              if (curToNodeChild.isSameNode && curToNodeChild.isSameNode(curFromNodeChild)) {
                curToNodeChild = toNextSibling;
                curFromNodeChild = fromNextSibling;
                continue outer;
              }
              curFromNodeKey = getNodeKey(curFromNodeChild);
              var curFromNodeType = curFromNodeChild.nodeType;
              var isCompatible = void 0;
              if (curFromNodeType === curToNodeChild.nodeType) {
                if (curFromNodeType === ELEMENT_NODE) {
                  if (curToNodeKey) {
                    if (curToNodeKey !== curFromNodeKey) {
                      if (matchingFromEl = fromNodesLookup[curToNodeKey]) {
                        if (fromNextSibling === matchingFromEl) {
                          isCompatible = false;
                        } else {
                          fromEl.insertBefore(matchingFromEl, curFromNodeChild);
                          if (curFromNodeKey) {
                            addKeyedRemoval(curFromNodeKey);
                          } else {
                            removeNode(curFromNodeChild, fromEl, true);
                          }
                          curFromNodeChild = matchingFromEl;
                        }
                      } else {
                        isCompatible = false;
                      }
                    }
                  } else if (curFromNodeKey) {
                    isCompatible = false;
                  }
                  isCompatible = isCompatible !== false && compareNodeNames(curFromNodeChild, curToNodeChild);
                  if (isCompatible) {
                    morphEl(curFromNodeChild, curToNodeChild);
                  }
                } else if (curFromNodeType === TEXT_NODE || curFromNodeType == COMMENT_NODE) {
                  isCompatible = true;
                  if (curFromNodeChild.nodeValue !== curToNodeChild.nodeValue) {
                    curFromNodeChild.nodeValue = curToNodeChild.nodeValue;
                  }
                }
              }
              if (isCompatible) {
                curToNodeChild = toNextSibling;
                curFromNodeChild = fromNextSibling;
                continue outer;
              }
              if (curFromNodeKey) {
                addKeyedRemoval(curFromNodeKey);
              } else {
                removeNode(curFromNodeChild, fromEl, true);
              }
              curFromNodeChild = fromNextSibling;
            }
            if (curToNodeKey && (matchingFromEl = fromNodesLookup[curToNodeKey]) && compareNodeNames(matchingFromEl, curToNodeChild)) {
              if (!skipFrom) {
                addChild(fromEl, matchingFromEl);
              }
              morphEl(matchingFromEl, curToNodeChild);
            } else {
              var onBeforeNodeAddedResult = onBeforeNodeAdded(curToNodeChild);
              if (onBeforeNodeAddedResult !== false) {
                if (onBeforeNodeAddedResult) {
                  curToNodeChild = onBeforeNodeAddedResult;
                }
                if (curToNodeChild.actualize) {
                  curToNodeChild = curToNodeChild.actualize(fromEl.ownerDocument || doc);
                }
                addChild(fromEl, curToNodeChild);
                handleNodeAdded(curToNodeChild);
              }
            }
            curToNodeChild = toNextSibling;
            curFromNodeChild = fromNextSibling;
          }
        cleanupFromEl(fromEl, curFromNodeChild, curFromNodeKey);
        var specialElHandler = specialElHandlers[fromEl.nodeName];
        if (specialElHandler) {
          specialElHandler(fromEl, toEl);
        }
      }
      var morphedNode = fromNode;
      var morphedNodeType = morphedNode.nodeType;
      var toNodeType = toNode.nodeType;
      if (!childrenOnly) {
        if (morphedNodeType === ELEMENT_NODE) {
          if (toNodeType === ELEMENT_NODE) {
            if (!compareNodeNames(fromNode, toNode)) {
              onNodeDiscarded(fromNode);
              morphedNode = moveChildren(fromNode, createElementNS(toNode.nodeName, toNode.namespaceURI));
            }
          } else {
            morphedNode = toNode;
          }
        } else if (morphedNodeType === TEXT_NODE || morphedNodeType === COMMENT_NODE) {
          if (toNodeType === morphedNodeType) {
            if (morphedNode.nodeValue !== toNode.nodeValue) {
              morphedNode.nodeValue = toNode.nodeValue;
            }
            return morphedNode;
          } else {
            morphedNode = toNode;
          }
        }
      }
      if (morphedNode === toNode) {
        onNodeDiscarded(fromNode);
      } else {
        if (toNode.isSameNode && toNode.isSameNode(morphedNode)) {
          return;
        }
        morphEl(morphedNode, toNode, childrenOnly);
        if (keyedRemovalList) {
          for (var i = 0, len = keyedRemovalList.length; i < len; i++) {
            var elToRemove = fromNodesLookup[keyedRemovalList[i]];
            if (elToRemove) {
              removeNode(elToRemove, elToRemove.parentNode, false);
            }
          }
        }
      }
      if (!childrenOnly && morphedNode !== fromNode && fromNode.parentNode) {
        if (morphedNode.actualize) {
          morphedNode = morphedNode.actualize(fromNode.ownerDocument || doc);
        }
        fromNode.parentNode.replaceChild(morphedNode, fromNode);
      }
      return morphedNode;
    };
  }
  var morphdom = morphdomFactory(morphAttrs);
  var morphdom_esm_default = morphdom;
  var DOMPatch = class {
    static patchEl(fromEl, toEl, activeElement) {
      morphdom_esm_default(fromEl, toEl, {
        childrenOnly: false,
        onBeforeElUpdated: (fromEl2, toEl2) => {
          if (activeElement && activeElement.isSameNode(fromEl2) && dom_default.isFormInput(fromEl2)) {
            dom_default.mergeFocusedInput(fromEl2, toEl2);
            return false;
          }
        }
      });
    }
    constructor(view, container, id, html, streams, targetCID) {
      this.view = view;
      this.liveSocket = view.liveSocket;
      this.container = container;
      this.id = id;
      this.rootID = view.root.id;
      this.html = html;
      this.streams = streams;
      this.streamInserts = {};
      this.targetCID = targetCID;
      this.cidPatch = isCid(this.targetCID);
      this.pendingRemoves = [];
      this.phxRemove = this.liveSocket.binding("remove");
      this.callbacks = {
        beforeadded: [],
        beforeupdated: [],
        beforephxChildAdded: [],
        afteradded: [],
        afterupdated: [],
        afterdiscarded: [],
        afterphxChildAdded: [],
        aftertransitionsDiscarded: []
      };
    }
    before(kind, callback) {
      this.callbacks[`before${kind}`].push(callback);
    }
    after(kind, callback) {
      this.callbacks[`after${kind}`].push(callback);
    }
    trackBefore(kind, ...args) {
      this.callbacks[`before${kind}`].forEach((callback) => callback(...args));
    }
    trackAfter(kind, ...args) {
      this.callbacks[`after${kind}`].forEach((callback) => callback(...args));
    }
    markPrunableContentForRemoval() {
      let phxUpdate = this.liveSocket.binding(PHX_UPDATE);
      dom_default.all(this.container, `[${phxUpdate}=${PHX_STREAM}]`, (el) => el.innerHTML = "");
      dom_default.all(this.container, `[${phxUpdate}=append] > *, [${phxUpdate}=prepend] > *`, (el) => {
        el.setAttribute(PHX_PRUNE, "");
      });
    }
    perform() {
      let { view, liveSocket: liveSocket2, container, html } = this;
      let targetContainer = this.isCIDPatch() ? this.targetCIDContainer(html) : container;
      if (this.isCIDPatch() && !targetContainer) {
        return;
      }
      let focused = liveSocket2.getActiveElement();
      let { selectionStart, selectionEnd } = focused && dom_default.hasSelectionRange(focused) ? focused : {};
      let phxUpdate = liveSocket2.binding(PHX_UPDATE);
      let phxFeedbackFor = liveSocket2.binding(PHX_FEEDBACK_FOR);
      let disableWith = liveSocket2.binding(PHX_DISABLE_WITH);
      let phxViewportTop = liveSocket2.binding(PHX_VIEWPORT_TOP);
      let phxViewportBottom = liveSocket2.binding(PHX_VIEWPORT_BOTTOM);
      let phxTriggerExternal = liveSocket2.binding(PHX_TRIGGER_ACTION);
      let added = [];
      let trackedInputs = [];
      let updates = [];
      let appendPrependUpdates = [];
      let externalFormTriggered = null;
      let diffHTML = liveSocket2.time("premorph container prep", () => {
        return this.buildDiffHTML(container, html, phxUpdate, targetContainer);
      });
      this.trackBefore("added", container);
      this.trackBefore("updated", container, container);
      liveSocket2.time("morphdom", () => {
        this.streams.forEach(([ref, inserts, deleteIds, reset]) => {
          Object.entries(inserts).forEach(([key, [streamAt, limit]]) => {
            this.streamInserts[key] = { ref, streamAt, limit };
          });
          if (reset !== void 0) {
            dom_default.all(container, `[${PHX_STREAM_REF}="${ref}"]`, (child) => {
              this.removeStreamChildElement(child);
            });
          }
          deleteIds.forEach((id) => {
            let child = container.querySelector(`[id="${id}"]`);
            if (child) {
              this.removeStreamChildElement(child);
            }
          });
        });
        morphdom_esm_default(targetContainer, diffHTML, {
          childrenOnly: targetContainer.getAttribute(PHX_COMPONENT) === null,
          getNodeKey: (node) => {
            return dom_default.isPhxDestroyed(node) ? null : node.id;
          },
          skipFromChildren: (from) => {
            return from.getAttribute(phxUpdate) === PHX_STREAM;
          },
          addChild: (parent, child) => {
            let { ref, streamAt, limit } = this.getStreamInsert(child);
            if (ref === void 0) {
              return parent.appendChild(child);
            }
            dom_default.putSticky(child, PHX_STREAM_REF, (el) => el.setAttribute(PHX_STREAM_REF, ref));
            if (streamAt === 0) {
              parent.insertAdjacentElement("afterbegin", child);
            } else if (streamAt === -1) {
              parent.appendChild(child);
            } else if (streamAt > 0) {
              let sibling = Array.from(parent.children)[streamAt];
              parent.insertBefore(child, sibling);
            }
            let children = limit !== null && Array.from(parent.children);
            let childrenToRemove = [];
            if (limit && limit < 0 && children.length > limit * -1) {
              childrenToRemove = children.slice(0, children.length + limit);
            } else if (limit && limit >= 0 && children.length > limit) {
              childrenToRemove = children.slice(limit);
            }
            childrenToRemove.forEach((removeChild) => {
              if (!this.streamInserts[removeChild.id]) {
                this.removeStreamChildElement(removeChild);
              }
            });
          },
          onBeforeNodeAdded: (el) => {
            dom_default.maybeAddPrivateHooks(el, phxViewportTop, phxViewportBottom);
            this.trackBefore("added", el);
            return el;
          },
          onNodeAdded: (el) => {
            if (el.getAttribute) {
              this.maybeReOrderStream(el);
            }
            if (el instanceof HTMLImageElement && el.srcset) {
              el.srcset = el.srcset;
            } else if (el instanceof HTMLVideoElement && el.autoplay) {
              el.play();
            }
            if (dom_default.isNowTriggerFormExternal(el, phxTriggerExternal)) {
              externalFormTriggered = el;
            }
            if (el.getAttribute && el.getAttribute("name") && dom_default.isFormInput(el)) {
              trackedInputs.push(el);
            }
            if (dom_default.isPhxChild(el) && view.ownsElement(el) || dom_default.isPhxSticky(el) && view.ownsElement(el.parentNode)) {
              this.trackAfter("phxChildAdded", el);
            }
            added.push(el);
          },
          onNodeDiscarded: (el) => this.onNodeDiscarded(el),
          onBeforeNodeDiscarded: (el) => {
            if (el.getAttribute && el.getAttribute(PHX_PRUNE) !== null) {
              return true;
            }
            if (el.parentElement !== null && el.id && dom_default.isPhxUpdate(el.parentElement, phxUpdate, [PHX_STREAM, "append", "prepend"])) {
              return false;
            }
            if (this.maybePendingRemove(el)) {
              return false;
            }
            if (this.skipCIDSibling(el)) {
              return false;
            }
            return true;
          },
          onElUpdated: (el) => {
            if (dom_default.isNowTriggerFormExternal(el, phxTriggerExternal)) {
              externalFormTriggered = el;
            }
            updates.push(el);
            this.maybeReOrderStream(el);
          },
          onBeforeElUpdated: (fromEl, toEl) => {
            dom_default.maybeAddPrivateHooks(toEl, phxViewportTop, phxViewportBottom);
            dom_default.cleanChildNodes(toEl, phxUpdate);
            if (this.skipCIDSibling(toEl)) {
              return false;
            }
            if (dom_default.isPhxSticky(fromEl)) {
              return false;
            }
            if (dom_default.isIgnored(fromEl, phxUpdate) || fromEl.form && fromEl.form.isSameNode(externalFormTriggered)) {
              this.trackBefore("updated", fromEl, toEl);
              dom_default.mergeAttrs(fromEl, toEl, { isIgnored: true });
              updates.push(fromEl);
              dom_default.applyStickyOperations(fromEl);
              return false;
            }
            if (fromEl.type === "number" && (fromEl.validity && fromEl.validity.badInput)) {
              return false;
            }
            if (!dom_default.syncPendingRef(fromEl, toEl, disableWith)) {
              if (dom_default.isUploadInput(fromEl)) {
                this.trackBefore("updated", fromEl, toEl);
                updates.push(fromEl);
              }
              dom_default.applyStickyOperations(fromEl);
              return false;
            }
            if (dom_default.isPhxChild(toEl)) {
              let prevSession = fromEl.getAttribute(PHX_SESSION);
              dom_default.mergeAttrs(fromEl, toEl, { exclude: [PHX_STATIC] });
              if (prevSession !== "") {
                fromEl.setAttribute(PHX_SESSION, prevSession);
              }
              fromEl.setAttribute(PHX_ROOT_ID, this.rootID);
              dom_default.applyStickyOperations(fromEl);
              return false;
            }
            dom_default.copyPrivates(toEl, fromEl);
            let isFocusedFormEl = focused && fromEl.isSameNode(focused) && dom_default.isFormInput(fromEl);
            if (isFocusedFormEl && fromEl.type !== "hidden") {
              this.trackBefore("updated", fromEl, toEl);
              dom_default.mergeFocusedInput(fromEl, toEl);
              dom_default.syncAttrsToProps(fromEl);
              updates.push(fromEl);
              dom_default.applyStickyOperations(fromEl);
              trackedInputs.push(fromEl);
              return false;
            } else {
              if (dom_default.isPhxUpdate(toEl, phxUpdate, ["append", "prepend"])) {
                appendPrependUpdates.push(new DOMPostMorphRestorer(fromEl, toEl, toEl.getAttribute(phxUpdate)));
              }
              dom_default.syncAttrsToProps(toEl);
              dom_default.applyStickyOperations(toEl);
              if (toEl.getAttribute("name") && dom_default.isFormInput(toEl)) {
                trackedInputs.push(toEl);
              }
              this.trackBefore("updated", fromEl, toEl);
              return true;
            }
          }
        });
      });
      if (liveSocket2.isDebugEnabled()) {
        detectDuplicateIds();
      }
      if (appendPrependUpdates.length > 0) {
        liveSocket2.time("post-morph append/prepend restoration", () => {
          appendPrependUpdates.forEach((update) => update.perform());
        });
      }
      trackedInputs.forEach((input) => {
        dom_default.maybeHideFeedback(targetContainer, input, phxFeedbackFor);
      });
      liveSocket2.silenceEvents(() => dom_default.restoreFocus(focused, selectionStart, selectionEnd));
      dom_default.dispatchEvent(document, "phx:update");
      added.forEach((el) => this.trackAfter("added", el));
      updates.forEach((el) => this.trackAfter("updated", el));
      this.transitionPendingRemoves();
      if (externalFormTriggered) {
        liveSocket2.unload();
        externalFormTriggered.submit();
      }
      return true;
    }
    onNodeDiscarded(el) {
      if (dom_default.isPhxChild(el) || dom_default.isPhxSticky(el)) {
        this.liveSocket.destroyViewByEl(el);
      }
      this.trackAfter("discarded", el);
    }
    maybePendingRemove(node) {
      if (node.getAttribute && node.getAttribute(this.phxRemove) !== null) {
        this.pendingRemoves.push(node);
        return true;
      } else {
        return false;
      }
    }
    removeStreamChildElement(child) {
      if (!this.maybePendingRemove(child)) {
        child.remove();
        this.onNodeDiscarded(child);
      }
    }
    getStreamInsert(el) {
      let insert = el.id ? this.streamInserts[el.id] : {};
      return insert || {};
    }
    maybeReOrderStream(el) {
      let { ref, streamAt, limit } = this.getStreamInsert(el);
      if (streamAt === void 0) {
        return;
      }
      dom_default.putSticky(el, PHX_STREAM_REF, (el2) => el2.setAttribute(PHX_STREAM_REF, ref));
      if (streamAt === 0) {
        el.parentElement.insertBefore(el, el.parentElement.firstElementChild);
      } else if (streamAt > 0) {
        let children = Array.from(el.parentElement.children);
        let oldIndex = children.indexOf(el);
        if (streamAt >= children.length - 1) {
          el.parentElement.appendChild(el);
        } else {
          let sibling = children[streamAt];
          if (oldIndex > streamAt) {
            el.parentElement.insertBefore(el, sibling);
          } else {
            el.parentElement.insertBefore(el, sibling.nextElementSibling);
          }
        }
      }
    }
    transitionPendingRemoves() {
      let { pendingRemoves, liveSocket: liveSocket2 } = this;
      if (pendingRemoves.length > 0) {
        liveSocket2.transitionRemoves(pendingRemoves);
        liveSocket2.requestDOMUpdate(() => {
          pendingRemoves.forEach((el) => {
            let child = dom_default.firstPhxChild(el);
            if (child) {
              liveSocket2.destroyViewByEl(child);
            }
            el.remove();
          });
          this.trackAfter("transitionsDiscarded", pendingRemoves);
        });
      }
    }
    isCIDPatch() {
      return this.cidPatch;
    }
    skipCIDSibling(el) {
      return el.nodeType === Node.ELEMENT_NODE && el.getAttribute(PHX_SKIP) !== null;
    }
    targetCIDContainer(html) {
      if (!this.isCIDPatch()) {
        return;
      }
      let [first, ...rest] = dom_default.findComponentNodeList(this.container, this.targetCID);
      if (rest.length === 0 && dom_default.childNodeLength(html) === 1) {
        return first;
      } else {
        return first && first.parentNode;
      }
    }
    buildDiffHTML(container, html, phxUpdate, targetContainer) {
      let isCIDPatch = this.isCIDPatch();
      let isCIDWithSingleRoot = isCIDPatch && targetContainer.getAttribute(PHX_COMPONENT) === this.targetCID.toString();
      if (!isCIDPatch || isCIDWithSingleRoot) {
        return html;
      } else {
        let diffContainer = null;
        let template = document.createElement("template");
        diffContainer = dom_default.cloneNode(targetContainer);
        let [firstComponent, ...rest] = dom_default.findComponentNodeList(diffContainer, this.targetCID);
        template.innerHTML = html;
        rest.forEach((el) => el.remove());
        Array.from(diffContainer.childNodes).forEach((child) => {
          if (child.id && child.nodeType === Node.ELEMENT_NODE && child.getAttribute(PHX_COMPONENT) !== this.targetCID.toString()) {
            child.setAttribute(PHX_SKIP, "");
            child.innerHTML = "";
          }
        });
        Array.from(template.content.childNodes).forEach((el) => diffContainer.insertBefore(el, firstComponent));
        firstComponent.remove();
        return diffContainer.outerHTML;
      }
    }
    indexOf(parent, child) {
      return Array.from(parent.children).indexOf(child);
    }
  };
  var Rendered = class {
    static extract(diff) {
      let { [REPLY]: reply, [EVENTS]: events, [TITLE]: title } = diff;
      delete diff[REPLY];
      delete diff[EVENTS];
      delete diff[TITLE];
      return { diff, title, reply: reply || null, events: events || [] };
    }
    constructor(viewId, rendered) {
      this.viewId = viewId;
      this.rendered = {};
      this.mergeDiff(rendered);
    }
    parentViewId() {
      return this.viewId;
    }
    toString(onlyCids) {
      let [str, streams] = this.recursiveToString(this.rendered, this.rendered[COMPONENTS], onlyCids);
      return [str, streams];
    }
    recursiveToString(rendered, components = rendered[COMPONENTS], onlyCids) {
      onlyCids = onlyCids ? new Set(onlyCids) : null;
      let output = { buffer: "", components, onlyCids, streams: /* @__PURE__ */ new Set() };
      this.toOutputBuffer(rendered, null, output);
      return [output.buffer, output.streams];
    }
    componentCIDs(diff) {
      return Object.keys(diff[COMPONENTS] || {}).map((i) => parseInt(i));
    }
    isComponentOnlyDiff(diff) {
      if (!diff[COMPONENTS]) {
        return false;
      }
      return Object.keys(diff).length === 1;
    }
    getComponent(diff, cid) {
      return diff[COMPONENTS][cid];
    }
    mergeDiff(diff) {
      let newc = diff[COMPONENTS];
      let cache = {};
      delete diff[COMPONENTS];
      this.rendered = this.mutableMerge(this.rendered, diff);
      this.rendered[COMPONENTS] = this.rendered[COMPONENTS] || {};
      if (newc) {
        let oldc = this.rendered[COMPONENTS];
        for (let cid in newc) {
          newc[cid] = this.cachedFindComponent(cid, newc[cid], oldc, newc, cache);
        }
        for (let cid in newc) {
          oldc[cid] = newc[cid];
        }
        diff[COMPONENTS] = newc;
      }
    }
    cachedFindComponent(cid, cdiff, oldc, newc, cache) {
      if (cache[cid]) {
        return cache[cid];
      } else {
        let ndiff, stat, scid = cdiff[STATIC];
        if (isCid(scid)) {
          let tdiff;
          if (scid > 0) {
            tdiff = this.cachedFindComponent(scid, newc[scid], oldc, newc, cache);
          } else {
            tdiff = oldc[-scid];
          }
          stat = tdiff[STATIC];
          ndiff = this.cloneMerge(tdiff, cdiff);
          ndiff[STATIC] = stat;
        } else {
          ndiff = cdiff[STATIC] !== void 0 ? cdiff : this.cloneMerge(oldc[cid] || {}, cdiff);
        }
        cache[cid] = ndiff;
        return ndiff;
      }
    }
    mutableMerge(target, source) {
      if (source[STATIC] !== void 0) {
        return source;
      } else {
        this.doMutableMerge(target, source);
        return target;
      }
    }
    doMutableMerge(target, source) {
      for (let key in source) {
        let val = source[key];
        let targetVal = target[key];
        let isObjVal = isObject(val);
        if (isObjVal && val[STATIC] === void 0 && isObject(targetVal)) {
          this.doMutableMerge(targetVal, val);
        } else {
          target[key] = val;
        }
      }
    }
    cloneMerge(target, source) {
      let merged = __spreadValues(__spreadValues({}, target), source);
      for (let key in merged) {
        let val = source[key];
        let targetVal = target[key];
        if (isObject(val) && val[STATIC] === void 0 && isObject(targetVal)) {
          merged[key] = this.cloneMerge(targetVal, val);
        }
      }
      return merged;
    }
    componentToString(cid) {
      let [str, streams] = this.recursiveCIDToString(this.rendered[COMPONENTS], cid);
      return [str, streams];
    }
    pruneCIDs(cids) {
      cids.forEach((cid) => delete this.rendered[COMPONENTS][cid]);
    }
    get() {
      return this.rendered;
    }
    isNewFingerprint(diff = {}) {
      return !!diff[STATIC];
    }
    templateStatic(part, templates) {
      if (typeof part === "number") {
        return templates[part];
      } else {
        return part;
      }
    }
    toOutputBuffer(rendered, templates, output) {
      if (rendered[DYNAMICS]) {
        return this.comprehensionToBuffer(rendered, templates, output);
      }
      let { [STATIC]: statics } = rendered;
      statics = this.templateStatic(statics, templates);
      output.buffer += statics[0];
      for (let i = 1; i < statics.length; i++) {
        this.dynamicToBuffer(rendered[i - 1], templates, output);
        output.buffer += statics[i];
      }
    }
    comprehensionToBuffer(rendered, templates, output) {
      let { [DYNAMICS]: dynamics, [STATIC]: statics, [STREAM]: stream } = rendered;
      let [_ref, _inserts, deleteIds, reset] = stream || [null, {}, [], null];
      statics = this.templateStatic(statics, templates);
      let compTemplates = templates || rendered[TEMPLATES];
      for (let d = 0; d < dynamics.length; d++) {
        let dynamic = dynamics[d];
        output.buffer += statics[0];
        for (let i = 1; i < statics.length; i++) {
          this.dynamicToBuffer(dynamic[i - 1], compTemplates, output);
          output.buffer += statics[i];
        }
      }
      if (stream !== void 0 && (rendered[DYNAMICS].length > 0 || deleteIds.length > 0 || reset)) {
        delete rendered[STREAM];
        output.streams.add(stream);
      }
    }
    dynamicToBuffer(rendered, templates, output) {
      if (typeof rendered === "number") {
        let [str, streams] = this.recursiveCIDToString(output.components, rendered, output.onlyCids);
        output.buffer += str;
        output.streams = /* @__PURE__ */ new Set([...output.streams, ...streams]);
      } else if (isObject(rendered)) {
        this.toOutputBuffer(rendered, templates, output);
      } else {
        output.buffer += rendered;
      }
    }
    recursiveCIDToString(components, cid, onlyCids) {
      let component = components[cid] || logError(`no component for CID ${cid}`, components);
      let template = document.createElement("template");
      let [html, streams] = this.recursiveToString(component, components, onlyCids);
      template.innerHTML = html;
      let container = template.content;
      let skip = onlyCids && !onlyCids.has(cid);
      let [hasChildNodes, hasChildComponents] = Array.from(container.childNodes).reduce(([hasNodes, hasComponents], child, i) => {
        if (child.nodeType === Node.ELEMENT_NODE) {
          if (child.getAttribute(PHX_COMPONENT)) {
            return [hasNodes, true];
          }
          child.setAttribute(PHX_COMPONENT, cid);
          if (!child.id) {
            child.id = `${this.parentViewId()}-${cid}-${i}`;
          }
          if (skip) {
            child.setAttribute(PHX_SKIP, "");
            child.innerHTML = "";
          }
          return [true, hasComponents];
        } else {
          if (child.nodeValue.trim() !== "") {
            logError(`only HTML element tags are allowed at the root of components.

got: "${child.nodeValue.trim()}"

within:
`, template.innerHTML.trim());
            child.replaceWith(this.createSpan(child.nodeValue, cid));
            return [true, hasComponents];
          } else {
            child.remove();
            return [hasNodes, hasComponents];
          }
        }
      }, [false, false]);
      if (!hasChildNodes && !hasChildComponents) {
        logError("expected at least one HTML element tag inside a component, but the component is empty:\n", template.innerHTML.trim());
        return [this.createSpan("", cid).outerHTML, streams];
      } else if (!hasChildNodes && hasChildComponents) {
        logError("expected at least one HTML element tag directly inside a component, but only subcomponents were found. A component must render at least one HTML tag directly inside itself.", template.innerHTML.trim());
        return [template.innerHTML, streams];
      } else {
        return [template.innerHTML, streams];
      }
    }
    createSpan(text, cid) {
      let span = document.createElement("span");
      span.innerText = text;
      span.setAttribute(PHX_COMPONENT, cid);
      return span;
    }
  };
  var viewHookID = 1;
  var ViewHook = class {
    static makeID() {
      return viewHookID++;
    }
    static elementID(el) {
      return el.phxHookId;
    }
    constructor(view, el, callbacks) {
      this.__view = view;
      this.liveSocket = view.liveSocket;
      this.__callbacks = callbacks;
      this.__listeners = /* @__PURE__ */ new Set();
      this.__isDisconnected = false;
      this.el = el;
      this.el.phxHookId = this.constructor.makeID();
      for (let key in this.__callbacks) {
        this[key] = this.__callbacks[key];
      }
    }
    __mounted() {
      this.mounted && this.mounted();
    }
    __updated() {
      this.updated && this.updated();
    }
    __beforeUpdate() {
      this.beforeUpdate && this.beforeUpdate();
    }
    __destroyed() {
      this.destroyed && this.destroyed();
    }
    __reconnected() {
      if (this.__isDisconnected) {
        this.__isDisconnected = false;
        this.reconnected && this.reconnected();
      }
    }
    __disconnected() {
      this.__isDisconnected = true;
      this.disconnected && this.disconnected();
    }
    pushEvent(event, payload = {}, onReply = function() {
    }) {
      return this.__view.pushHookEvent(this.el, null, event, payload, onReply);
    }
    pushEventTo(phxTarget, event, payload = {}, onReply = function() {
    }) {
      return this.__view.withinTargets(phxTarget, (view, targetCtx) => {
        return view.pushHookEvent(this.el, targetCtx, event, payload, onReply);
      });
    }
    handleEvent(event, callback) {
      let callbackRef = (customEvent, bypass) => bypass ? event : callback(customEvent.detail);
      window.addEventListener(`phx:${event}`, callbackRef);
      this.__listeners.add(callbackRef);
      return callbackRef;
    }
    removeHandleEvent(callbackRef) {
      let event = callbackRef(null, true);
      window.removeEventListener(`phx:${event}`, callbackRef);
      this.__listeners.delete(callbackRef);
    }
    upload(name, files) {
      return this.__view.dispatchUploads(name, files);
    }
    uploadTo(phxTarget, name, files) {
      return this.__view.withinTargets(phxTarget, (view) => view.dispatchUploads(name, files));
    }
    __cleanup__() {
      this.__listeners.forEach((callbackRef) => this.removeHandleEvent(callbackRef));
    }
  };
  var focusStack = null;
  var JS = {
    exec(eventType, phxEvent, view, sourceEl, defaults) {
      let [defaultKind, defaultArgs] = defaults || [null, { callback: defaults && defaults.callback }];
      let commands = phxEvent.charAt(0) === "[" ? JSON.parse(phxEvent) : [[defaultKind, defaultArgs]];
      commands.forEach(([kind, args]) => {
        if (kind === defaultKind && defaultArgs.data) {
          args.data = Object.assign(args.data || {}, defaultArgs.data);
          args.callback = args.callback || defaultArgs.callback;
        }
        this.filterToEls(sourceEl, args).forEach((el) => {
          this[`exec_${kind}`](eventType, phxEvent, view, sourceEl, el, args);
        });
      });
    },
    isVisible(el) {
      return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length > 0);
    },
    exec_exec(eventType, phxEvent, view, sourceEl, el, [attr, to]) {
      let nodes = to ? dom_default.all(document, to) : [sourceEl];
      nodes.forEach((node) => {
        let encodedJS = node.getAttribute(attr);
        if (!encodedJS) {
          throw new Error(`expected ${attr} to contain JS command on "${to}"`);
        }
        view.liveSocket.execJS(node, encodedJS, eventType);
      });
    },
    exec_dispatch(eventType, phxEvent, view, sourceEl, el, { to, event, detail, bubbles }) {
      detail = detail || {};
      detail.dispatcher = sourceEl;
      dom_default.dispatchEvent(el, event, { detail, bubbles });
    },
    exec_push(eventType, phxEvent, view, sourceEl, el, args) {
      if (!view.isConnected()) {
        return;
      }
      let { event, data, target, page_loading, loading, value, dispatcher, callback } = args;
      let pushOpts = { loading, value, target, page_loading: !!page_loading };
      let targetSrc = eventType === "change" && dispatcher ? dispatcher : sourceEl;
      let phxTarget = target || targetSrc.getAttribute(view.binding("target")) || targetSrc;
      view.withinTargets(phxTarget, (targetView, targetCtx) => {
        if (eventType === "change") {
          let { newCid, _target } = args;
          _target = _target || (dom_default.isFormInput(sourceEl) ? sourceEl.name : void 0);
          if (_target) {
            pushOpts._target = _target;
          }
          targetView.pushInput(sourceEl, targetCtx, newCid, event || phxEvent, pushOpts, callback);
        } else if (eventType === "submit") {
          let { submitter } = args;
          targetView.submitForm(sourceEl, targetCtx, event || phxEvent, submitter, pushOpts, callback);
        } else {
          targetView.pushEvent(eventType, sourceEl, targetCtx, event || phxEvent, data, pushOpts, callback);
        }
      });
    },
    exec_navigate(eventType, phxEvent, view, sourceEl, el, { href, replace }) {
      view.liveSocket.historyRedirect(href, replace ? "replace" : "push");
    },
    exec_patch(eventType, phxEvent, view, sourceEl, el, { href, replace }) {
      view.liveSocket.pushHistoryPatch(href, replace ? "replace" : "push", sourceEl);
    },
    exec_focus(eventType, phxEvent, view, sourceEl, el) {
      window.requestAnimationFrame(() => aria_default.attemptFocus(el));
    },
    exec_focus_first(eventType, phxEvent, view, sourceEl, el) {
      window.requestAnimationFrame(() => aria_default.focusFirstInteractive(el) || aria_default.focusFirst(el));
    },
    exec_push_focus(eventType, phxEvent, view, sourceEl, el) {
      window.requestAnimationFrame(() => focusStack = el || sourceEl);
    },
    exec_pop_focus(eventType, phxEvent, view, sourceEl, el) {
      window.requestAnimationFrame(() => {
        if (focusStack) {
          focusStack.focus();
        }
        focusStack = null;
      });
    },
    exec_add_class(eventType, phxEvent, view, sourceEl, el, { names, transition, time }) {
      this.addOrRemoveClasses(el, names, [], transition, time, view);
    },
    exec_remove_class(eventType, phxEvent, view, sourceEl, el, { names, transition, time }) {
      this.addOrRemoveClasses(el, [], names, transition, time, view);
    },
    exec_transition(eventType, phxEvent, view, sourceEl, el, { time, transition }) {
      this.addOrRemoveClasses(el, [], [], transition, time, view);
    },
    exec_toggle(eventType, phxEvent, view, sourceEl, el, { display, ins, outs, time }) {
      this.toggle(eventType, view, el, display, ins, outs, time);
    },
    exec_show(eventType, phxEvent, view, sourceEl, el, { display, transition, time }) {
      this.show(eventType, view, el, display, transition, time);
    },
    exec_hide(eventType, phxEvent, view, sourceEl, el, { display, transition, time }) {
      this.hide(eventType, view, el, display, transition, time);
    },
    exec_set_attr(eventType, phxEvent, view, sourceEl, el, { attr: [attr, val] }) {
      this.setOrRemoveAttrs(el, [[attr, val]], []);
    },
    exec_remove_attr(eventType, phxEvent, view, sourceEl, el, { attr }) {
      this.setOrRemoveAttrs(el, [], [attr]);
    },
    show(eventType, view, el, display, transition, time) {
      if (!this.isVisible(el)) {
        this.toggle(eventType, view, el, display, transition, null, time);
      }
    },
    hide(eventType, view, el, display, transition, time) {
      if (this.isVisible(el)) {
        this.toggle(eventType, view, el, display, null, transition, time);
      }
    },
    toggle(eventType, view, el, display, ins, outs, time) {
      let [inClasses, inStartClasses, inEndClasses] = ins || [[], [], []];
      let [outClasses, outStartClasses, outEndClasses] = outs || [[], [], []];
      if (inClasses.length > 0 || outClasses.length > 0) {
        if (this.isVisible(el)) {
          let onStart = () => {
            this.addOrRemoveClasses(el, outStartClasses, inClasses.concat(inStartClasses).concat(inEndClasses));
            window.requestAnimationFrame(() => {
              this.addOrRemoveClasses(el, outClasses, []);
              window.requestAnimationFrame(() => this.addOrRemoveClasses(el, outEndClasses, outStartClasses));
            });
          };
          el.dispatchEvent(new Event("phx:hide-start"));
          view.transition(time, onStart, () => {
            this.addOrRemoveClasses(el, [], outClasses.concat(outEndClasses));
            dom_default.putSticky(el, "toggle", (currentEl) => currentEl.style.display = "none");
            el.dispatchEvent(new Event("phx:hide-end"));
          });
        } else {
          if (eventType === "remove") {
            return;
          }
          let onStart = () => {
            this.addOrRemoveClasses(el, inStartClasses, outClasses.concat(outStartClasses).concat(outEndClasses));
            let stickyDisplay = display || this.defaultDisplay(el);
            dom_default.putSticky(el, "toggle", (currentEl) => currentEl.style.display = stickyDisplay);
            window.requestAnimationFrame(() => {
              this.addOrRemoveClasses(el, inClasses, []);
              window.requestAnimationFrame(() => this.addOrRemoveClasses(el, inEndClasses, inStartClasses));
            });
          };
          el.dispatchEvent(new Event("phx:show-start"));
          view.transition(time, onStart, () => {
            this.addOrRemoveClasses(el, [], inClasses.concat(inEndClasses));
            el.dispatchEvent(new Event("phx:show-end"));
          });
        }
      } else {
        if (this.isVisible(el)) {
          window.requestAnimationFrame(() => {
            el.dispatchEvent(new Event("phx:hide-start"));
            dom_default.putSticky(el, "toggle", (currentEl) => currentEl.style.display = "none");
            el.dispatchEvent(new Event("phx:hide-end"));
          });
        } else {
          window.requestAnimationFrame(() => {
            el.dispatchEvent(new Event("phx:show-start"));
            let stickyDisplay = display || this.defaultDisplay(el);
            dom_default.putSticky(el, "toggle", (currentEl) => currentEl.style.display = stickyDisplay);
            el.dispatchEvent(new Event("phx:show-end"));
          });
        }
      }
    },
    addOrRemoveClasses(el, adds, removes, transition, time, view) {
      let [transition_run, transition_start, transition_end] = transition || [[], [], []];
      if (transition_run.length > 0) {
        let onStart = () => this.addOrRemoveClasses(el, transition_start.concat(transition_run), []);
        let onDone = () => this.addOrRemoveClasses(el, adds.concat(transition_end), removes.concat(transition_run).concat(transition_start));
        return view.transition(time, onStart, onDone);
      }
      window.requestAnimationFrame(() => {
        let [prevAdds, prevRemoves] = dom_default.getSticky(el, "classes", [[], []]);
        let keepAdds = adds.filter((name) => prevAdds.indexOf(name) < 0 && !el.classList.contains(name));
        let keepRemoves = removes.filter((name) => prevRemoves.indexOf(name) < 0 && el.classList.contains(name));
        let newAdds = prevAdds.filter((name) => removes.indexOf(name) < 0).concat(keepAdds);
        let newRemoves = prevRemoves.filter((name) => adds.indexOf(name) < 0).concat(keepRemoves);
        dom_default.putSticky(el, "classes", (currentEl) => {
          currentEl.classList.remove(...newRemoves);
          currentEl.classList.add(...newAdds);
          return [newAdds, newRemoves];
        });
      });
    },
    setOrRemoveAttrs(el, sets, removes) {
      let [prevSets, prevRemoves] = dom_default.getSticky(el, "attrs", [[], []]);
      let alteredAttrs = sets.map(([attr, _val]) => attr).concat(removes);
      let newSets = prevSets.filter(([attr, _val]) => !alteredAttrs.includes(attr)).concat(sets);
      let newRemoves = prevRemoves.filter((attr) => !alteredAttrs.includes(attr)).concat(removes);
      dom_default.putSticky(el, "attrs", (currentEl) => {
        newRemoves.forEach((attr) => currentEl.removeAttribute(attr));
        newSets.forEach(([attr, val]) => currentEl.setAttribute(attr, val));
        return [newSets, newRemoves];
      });
    },
    hasAllClasses(el, classes) {
      return classes.every((name) => el.classList.contains(name));
    },
    isToggledOut(el, outClasses) {
      return !this.isVisible(el) || this.hasAllClasses(el, outClasses);
    },
    filterToEls(sourceEl, { to }) {
      return to ? dom_default.all(document, to) : [sourceEl];
    },
    defaultDisplay(el) {
      return { tr: "table-row", td: "table-cell" }[el.tagName.toLowerCase()] || "block";
    }
  };
  var js_default = JS;
  var serializeForm = (form, metadata, onlyNames = []) => {
    let _a = metadata, { submitter } = _a, meta = __objRest(_a, ["submitter"]);
    let formData = new FormData(form);
    if (submitter && submitter.hasAttribute("name") && submitter.form && submitter.form === form) {
      formData.append(submitter.name, submitter.value);
    }
    let toRemove = [];
    formData.forEach((val, key, _index) => {
      if (val instanceof File) {
        toRemove.push(key);
      }
    });
    toRemove.forEach((key) => formData.delete(key));
    let params = new URLSearchParams();
    for (let [key, val] of formData.entries()) {
      if (onlyNames.length === 0 || onlyNames.indexOf(key) >= 0) {
        params.append(key, val);
      }
    }
    for (let metaKey in meta) {
      params.append(metaKey, meta[metaKey]);
    }
    return params.toString();
  };
  var View = class {
    constructor(el, liveSocket2, parentView, flash, liveReferer) {
      this.isDead = false;
      this.liveSocket = liveSocket2;
      this.flash = flash;
      this.parent = parentView;
      this.root = parentView ? parentView.root : this;
      this.el = el;
      this.id = this.el.id;
      this.ref = 0;
      this.childJoins = 0;
      this.loaderTimer = null;
      this.pendingDiffs = [];
      this.pruningCIDs = [];
      this.redirect = false;
      this.href = null;
      this.joinCount = this.parent ? this.parent.joinCount - 1 : 0;
      this.joinPending = true;
      this.destroyed = false;
      this.joinCallback = function(onDone) {
        onDone && onDone();
      };
      this.stopCallback = function() {
      };
      this.pendingJoinOps = this.parent ? null : [];
      this.viewHooks = {};
      this.uploaders = {};
      this.formSubmits = [];
      this.children = this.parent ? null : {};
      this.root.children[this.id] = {};
      this.channel = this.liveSocket.channel(`lv:${this.id}`, () => {
        return {
          redirect: this.redirect ? this.href : void 0,
          url: this.redirect ? void 0 : this.href || void 0,
          params: this.connectParams(liveReferer),
          session: this.getSession(),
          static: this.getStatic(),
          flash: this.flash
        };
      });
    }
    setHref(href) {
      this.href = href;
    }
    setRedirect(href) {
      this.redirect = true;
      this.href = href;
    }
    isMain() {
      return this.el.hasAttribute(PHX_MAIN);
    }
    connectParams(liveReferer) {
      let params = this.liveSocket.params(this.el);
      let manifest = dom_default.all(document, `[${this.binding(PHX_TRACK_STATIC)}]`).map((node) => node.src || node.href).filter((url) => typeof url === "string");
      if (manifest.length > 0) {
        params["_track_static"] = manifest;
      }
      params["_mounts"] = this.joinCount;
      params["_live_referer"] = liveReferer;
      return params;
    }
    isConnected() {
      return this.channel.canPush();
    }
    getSession() {
      return this.el.getAttribute(PHX_SESSION);
    }
    getStatic() {
      let val = this.el.getAttribute(PHX_STATIC);
      return val === "" ? null : val;
    }
    destroy(callback = function() {
    }) {
      this.destroyAllChildren();
      this.destroyed = true;
      delete this.root.children[this.id];
      if (this.parent) {
        delete this.root.children[this.parent.id][this.id];
      }
      clearTimeout(this.loaderTimer);
      let onFinished = () => {
        callback();
        for (let id in this.viewHooks) {
          this.destroyHook(this.viewHooks[id]);
        }
      };
      dom_default.markPhxChildDestroyed(this.el);
      this.log("destroyed", () => ["the child has been removed from the parent"]);
      this.channel.leave().receive("ok", onFinished).receive("error", onFinished).receive("timeout", onFinished);
    }
    setContainerClasses(...classes) {
      this.el.classList.remove(PHX_CONNECTED_CLASS, PHX_LOADING_CLASS, PHX_ERROR_CLASS, PHX_CLIENT_ERROR_CLASS, PHX_SERVER_ERROR_CLASS);
      this.el.classList.add(...classes);
    }
    showLoader(timeout) {
      clearTimeout(this.loaderTimer);
      if (timeout) {
        this.loaderTimer = setTimeout(() => this.showLoader(), timeout);
      } else {
        for (let id in this.viewHooks) {
          this.viewHooks[id].__disconnected();
        }
        this.setContainerClasses(PHX_LOADING_CLASS);
      }
    }
    execAll(binding) {
      dom_default.all(this.el, `[${binding}]`, (el) => this.liveSocket.execJS(el, el.getAttribute(binding)));
    }
    hideLoader() {
      clearTimeout(this.loaderTimer);
      this.setContainerClasses(PHX_CONNECTED_CLASS);
      this.execAll(this.binding("connected"));
    }
    triggerReconnected() {
      for (let id in this.viewHooks) {
        this.viewHooks[id].__reconnected();
      }
    }
    log(kind, msgCallback) {
      this.liveSocket.log(this, kind, msgCallback);
    }
    transition(time, onStart, onDone = function() {
    }) {
      this.liveSocket.transition(time, onStart, onDone);
    }
    withinTargets(phxTarget, callback) {
      if (phxTarget instanceof HTMLElement || phxTarget instanceof SVGElement) {
        return this.liveSocket.owner(phxTarget, (view) => callback(view, phxTarget));
      }
      if (isCid(phxTarget)) {
        let targets = dom_default.findComponentNodeList(this.el, phxTarget);
        if (targets.length === 0) {
          logError(`no component found matching phx-target of ${phxTarget}`);
        } else {
          callback(this, parseInt(phxTarget));
        }
      } else {
        let targets = Array.from(document.querySelectorAll(phxTarget));
        if (targets.length === 0) {
          logError(`nothing found matching the phx-target selector "${phxTarget}"`);
        }
        targets.forEach((target) => this.liveSocket.owner(target, (view) => callback(view, target)));
      }
    }
    applyDiff(type, rawDiff, callback) {
      this.log(type, () => ["", clone(rawDiff)]);
      let { diff, reply, events, title } = Rendered.extract(rawDiff);
      callback({ diff, reply, events });
      if (title) {
        window.requestAnimationFrame(() => dom_default.putTitle(title));
      }
    }
    onJoin(resp) {
      let { rendered, container } = resp;
      if (container) {
        let [tag, attrs] = container;
        this.el = dom_default.replaceRootContainer(this.el, tag, attrs);
      }
      this.childJoins = 0;
      this.joinPending = true;
      this.flash = null;
      browser_default.dropLocal(this.liveSocket.localStorage, window.location.pathname, CONSECUTIVE_RELOADS);
      this.applyDiff("mount", rendered, ({ diff, events }) => {
        this.rendered = new Rendered(this.id, diff);
        let [html, streams] = this.renderContainer(null, "join");
        this.dropPendingRefs();
        let forms = this.formsForRecovery(html);
        this.joinCount++;
        if (forms.length > 0) {
          forms.forEach(([form, newForm, newCid], i) => {
            this.pushFormRecovery(form, newCid, (resp2) => {
              if (i === forms.length - 1) {
                this.onJoinComplete(resp2, html, streams, events);
              }
            });
          });
        } else {
          this.onJoinComplete(resp, html, streams, events);
        }
      });
    }
    dropPendingRefs() {
      dom_default.all(document, `[${PHX_REF_SRC}="${this.id}"][${PHX_REF}]`, (el) => {
        el.removeAttribute(PHX_REF);
        el.removeAttribute(PHX_REF_SRC);
      });
    }
    onJoinComplete({ live_patch }, html, streams, events) {
      if (this.joinCount > 1 || this.parent && !this.parent.isJoinPending()) {
        return this.applyJoinPatch(live_patch, html, streams, events);
      }
      let newChildren = dom_default.findPhxChildrenInFragment(html, this.id).filter((toEl) => {
        let fromEl = toEl.id && this.el.querySelector(`[id="${toEl.id}"]`);
        let phxStatic = fromEl && fromEl.getAttribute(PHX_STATIC);
        if (phxStatic) {
          toEl.setAttribute(PHX_STATIC, phxStatic);
        }
        return this.joinChild(toEl);
      });
      if (newChildren.length === 0) {
        if (this.parent) {
          this.root.pendingJoinOps.push([this, () => this.applyJoinPatch(live_patch, html, streams, events)]);
          this.parent.ackJoin(this);
        } else {
          this.onAllChildJoinsComplete();
          this.applyJoinPatch(live_patch, html, streams, events);
        }
      } else {
        this.root.pendingJoinOps.push([this, () => this.applyJoinPatch(live_patch, html, streams, events)]);
      }
    }
    attachTrueDocEl() {
      this.el = dom_default.byId(this.id);
      this.el.setAttribute(PHX_ROOT_ID, this.root.id);
    }
    execNewMounted() {
      let phxViewportTop = this.binding(PHX_VIEWPORT_TOP);
      let phxViewportBottom = this.binding(PHX_VIEWPORT_BOTTOM);
      dom_default.all(this.el, `[${phxViewportTop}], [${phxViewportBottom}]`, (hookEl) => {
        dom_default.maybeAddPrivateHooks(hookEl, phxViewportTop, phxViewportBottom);
        this.maybeAddNewHook(hookEl);
      });
      dom_default.all(this.el, `[${this.binding(PHX_HOOK)}], [data-phx-${PHX_HOOK}]`, (hookEl) => {
        this.maybeAddNewHook(hookEl);
      });
      dom_default.all(this.el, `[${this.binding(PHX_MOUNTED)}]`, (el) => this.maybeMounted(el));
    }
    applyJoinPatch(live_patch, html, streams, events) {
      this.attachTrueDocEl();
      let patch = new DOMPatch(this, this.el, this.id, html, streams, null);
      patch.markPrunableContentForRemoval();
      this.performPatch(patch, false);
      this.joinNewChildren();
      this.execNewMounted();
      this.joinPending = false;
      this.liveSocket.dispatchEvents(events);
      this.applyPendingUpdates();
      if (live_patch) {
        let { kind, to } = live_patch;
        this.liveSocket.historyPatch(to, kind);
      }
      this.hideLoader();
      if (this.joinCount > 1) {
        this.triggerReconnected();
      }
      this.stopCallback();
    }
    triggerBeforeUpdateHook(fromEl, toEl) {
      this.liveSocket.triggerDOM("onBeforeElUpdated", [fromEl, toEl]);
      let hook = this.getHook(fromEl);
      let isIgnored = hook && dom_default.isIgnored(fromEl, this.binding(PHX_UPDATE));
      if (hook && !fromEl.isEqualNode(toEl) && !(isIgnored && isEqualObj(fromEl.dataset, toEl.dataset))) {
        hook.__beforeUpdate();
        return hook;
      }
    }
    maybeMounted(el) {
      let phxMounted = el.getAttribute(this.binding(PHX_MOUNTED));
      let hasBeenInvoked = phxMounted && dom_default.private(el, "mounted");
      if (phxMounted && !hasBeenInvoked) {
        this.liveSocket.execJS(el, phxMounted);
        dom_default.putPrivate(el, "mounted", true);
      }
    }
    maybeAddNewHook(el, force) {
      let newHook = this.addHook(el);
      if (newHook) {
        newHook.__mounted();
      }
    }
    performPatch(patch, pruneCids) {
      let removedEls = [];
      let phxChildrenAdded = false;
      let updatedHookIds = /* @__PURE__ */ new Set();
      patch.after("added", (el) => {
        this.liveSocket.triggerDOM("onNodeAdded", [el]);
        this.maybeAddNewHook(el);
        if (el.getAttribute) {
          this.maybeMounted(el);
        }
      });
      patch.after("phxChildAdded", (el) => {
        if (dom_default.isPhxSticky(el)) {
          this.liveSocket.joinRootViews();
        } else {
          phxChildrenAdded = true;
        }
      });
      patch.before("updated", (fromEl, toEl) => {
        let hook = this.triggerBeforeUpdateHook(fromEl, toEl);
        if (hook) {
          updatedHookIds.add(fromEl.id);
        }
      });
      patch.after("updated", (el) => {
        if (updatedHookIds.has(el.id)) {
          this.getHook(el).__updated();
        }
      });
      patch.after("discarded", (el) => {
        if (el.nodeType === Node.ELEMENT_NODE) {
          removedEls.push(el);
        }
      });
      patch.after("transitionsDiscarded", (els) => this.afterElementsRemoved(els, pruneCids));
      patch.perform();
      this.afterElementsRemoved(removedEls, pruneCids);
      return phxChildrenAdded;
    }
    afterElementsRemoved(elements, pruneCids) {
      let destroyedCIDs = [];
      elements.forEach((parent) => {
        let components = dom_default.all(parent, `[${PHX_COMPONENT}]`);
        let hooks = dom_default.all(parent, `[${this.binding(PHX_HOOK)}]`);
        components.concat(parent).forEach((el) => {
          let cid = this.componentID(el);
          if (isCid(cid) && destroyedCIDs.indexOf(cid) === -1) {
            destroyedCIDs.push(cid);
          }
        });
        hooks.concat(parent).forEach((hookEl) => {
          let hook = this.getHook(hookEl);
          hook && this.destroyHook(hook);
        });
      });
      if (pruneCids) {
        this.maybePushComponentsDestroyed(destroyedCIDs);
      }
    }
    joinNewChildren() {
      dom_default.findPhxChildren(this.el, this.id).forEach((el) => this.joinChild(el));
    }
    getChildById(id) {
      return this.root.children[this.id][id];
    }
    getDescendentByEl(el) {
      if (el.id === this.id) {
        return this;
      } else {
        return this.children[el.getAttribute(PHX_PARENT_ID)][el.id];
      }
    }
    destroyDescendent(id) {
      for (let parentId in this.root.children) {
        for (let childId in this.root.children[parentId]) {
          if (childId === id) {
            return this.root.children[parentId][childId].destroy();
          }
        }
      }
    }
    joinChild(el) {
      let child = this.getChildById(el.id);
      if (!child) {
        let view = new View(el, this.liveSocket, this);
        this.root.children[this.id][view.id] = view;
        view.join();
        this.childJoins++;
        return true;
      }
    }
    isJoinPending() {
      return this.joinPending;
    }
    ackJoin(_child) {
      this.childJoins--;
      if (this.childJoins === 0) {
        if (this.parent) {
          this.parent.ackJoin(this);
        } else {
          this.onAllChildJoinsComplete();
        }
      }
    }
    onAllChildJoinsComplete() {
      this.joinCallback(() => {
        this.pendingJoinOps.forEach(([view, op]) => {
          if (!view.isDestroyed()) {
            op();
          }
        });
        this.pendingJoinOps = [];
      });
    }
    update(diff, events) {
      if (this.isJoinPending() || this.liveSocket.hasPendingLink() && this.root.isMain()) {
        return this.pendingDiffs.push({ diff, events });
      }
      this.rendered.mergeDiff(diff);
      let phxChildrenAdded = false;
      if (this.rendered.isComponentOnlyDiff(diff)) {
        this.liveSocket.time("component patch complete", () => {
          let parentCids = dom_default.findParentCIDs(this.el, this.rendered.componentCIDs(diff));
          parentCids.forEach((parentCID) => {
            if (this.componentPatch(this.rendered.getComponent(diff, parentCID), parentCID)) {
              phxChildrenAdded = true;
            }
          });
        });
      } else if (!isEmpty(diff)) {
        this.liveSocket.time("full patch complete", () => {
          let [html, streams] = this.renderContainer(diff, "update");
          let patch = new DOMPatch(this, this.el, this.id, html, streams, null);
          phxChildrenAdded = this.performPatch(patch, true);
        });
      }
      this.liveSocket.dispatchEvents(events);
      if (phxChildrenAdded) {
        this.joinNewChildren();
      }
    }
    renderContainer(diff, kind) {
      return this.liveSocket.time(`toString diff (${kind})`, () => {
        let tag = this.el.tagName;
        let cids = diff ? this.rendered.componentCIDs(diff).concat(this.pruningCIDs) : null;
        let [html, streams] = this.rendered.toString(cids);
        return [`<${tag}>${html}</${tag}>`, streams];
      });
    }
    componentPatch(diff, cid) {
      if (isEmpty(diff))
        return false;
      let [html, streams] = this.rendered.componentToString(cid);
      let patch = new DOMPatch(this, this.el, this.id, html, streams, cid);
      let childrenAdded = this.performPatch(patch, true);
      return childrenAdded;
    }
    getHook(el) {
      return this.viewHooks[ViewHook.elementID(el)];
    }
    addHook(el) {
      if (ViewHook.elementID(el) || !el.getAttribute) {
        return;
      }
      let hookName = el.getAttribute(`data-phx-${PHX_HOOK}`) || el.getAttribute(this.binding(PHX_HOOK));
      if (hookName && !this.ownsElement(el)) {
        return;
      }
      let callbacks = this.liveSocket.getHookCallbacks(hookName);
      if (callbacks) {
        if (!el.id) {
          logError(`no DOM ID for hook "${hookName}". Hooks require a unique ID on each element.`, el);
        }
        let hook = new ViewHook(this, el, callbacks);
        this.viewHooks[ViewHook.elementID(hook.el)] = hook;
        return hook;
      } else if (hookName !== null) {
        logError(`unknown hook found for "${hookName}"`, el);
      }
    }
    destroyHook(hook) {
      hook.__destroyed();
      hook.__cleanup__();
      delete this.viewHooks[ViewHook.elementID(hook.el)];
    }
    applyPendingUpdates() {
      this.pendingDiffs.forEach(({ diff, events }) => this.update(diff, events));
      this.pendingDiffs = [];
      this.eachChild((child) => child.applyPendingUpdates());
    }
    eachChild(callback) {
      let children = this.root.children[this.id] || {};
      for (let id in children) {
        callback(this.getChildById(id));
      }
    }
    onChannel(event, cb) {
      this.liveSocket.onChannel(this.channel, event, (resp) => {
        if (this.isJoinPending()) {
          this.root.pendingJoinOps.push([this, () => cb(resp)]);
        } else {
          this.liveSocket.requestDOMUpdate(() => cb(resp));
        }
      });
    }
    bindChannel() {
      this.liveSocket.onChannel(this.channel, "diff", (rawDiff) => {
        this.liveSocket.requestDOMUpdate(() => {
          this.applyDiff("update", rawDiff, ({ diff, events }) => this.update(diff, events));
        });
      });
      this.onChannel("redirect", ({ to, flash }) => this.onRedirect({ to, flash }));
      this.onChannel("live_patch", (redir) => this.onLivePatch(redir));
      this.onChannel("live_redirect", (redir) => this.onLiveRedirect(redir));
      this.channel.onError((reason) => this.onError(reason));
      this.channel.onClose((reason) => this.onClose(reason));
    }
    destroyAllChildren() {
      this.eachChild((child) => child.destroy());
    }
    onLiveRedirect(redir) {
      let { to, kind, flash } = redir;
      let url = this.expandURL(to);
      this.liveSocket.historyRedirect(url, kind, flash);
    }
    onLivePatch(redir) {
      let { to, kind } = redir;
      this.href = this.expandURL(to);
      this.liveSocket.historyPatch(to, kind);
    }
    expandURL(to) {
      return to.startsWith("/") ? `${window.location.protocol}//${window.location.host}${to}` : to;
    }
    onRedirect({ to, flash }) {
      this.liveSocket.redirect(to, flash);
    }
    isDestroyed() {
      return this.destroyed;
    }
    joinDead() {
      this.isDead = true;
    }
    join(callback) {
      this.showLoader(this.liveSocket.loaderTimeout);
      this.bindChannel();
      if (this.isMain()) {
        this.stopCallback = this.liveSocket.withPageLoading({ to: this.href, kind: "initial" });
      }
      this.joinCallback = (onDone) => {
        onDone = onDone || function() {
        };
        callback ? callback(this.joinCount, onDone) : onDone();
      };
      this.liveSocket.wrapPush(this, { timeout: false }, () => {
        return this.channel.join().receive("ok", (data) => {
          if (!this.isDestroyed()) {
            this.liveSocket.requestDOMUpdate(() => this.onJoin(data));
          }
        }).receive("error", (resp) => !this.isDestroyed() && this.onJoinError(resp)).receive("timeout", () => !this.isDestroyed() && this.onJoinError({ reason: "timeout" }));
      });
    }
    onJoinError(resp) {
      if (resp.reason === "reload") {
        this.log("error", () => [`failed mount with ${resp.status}. Falling back to page request`, resp]);
        return this.onRedirect({ to: this.href });
      } else if (resp.reason === "unauthorized" || resp.reason === "stale") {
        this.log("error", () => ["unauthorized live_redirect. Falling back to page request", resp]);
        return this.onRedirect({ to: this.href });
      }
      if (resp.redirect || resp.live_redirect) {
        this.joinPending = false;
        this.channel.leave();
      }
      if (resp.redirect) {
        return this.onRedirect(resp.redirect);
      }
      if (resp.live_redirect) {
        return this.onLiveRedirect(resp.live_redirect);
      }
      this.displayError([PHX_LOADING_CLASS, PHX_ERROR_CLASS, PHX_SERVER_ERROR_CLASS]);
      this.log("error", () => ["unable to join", resp]);
      if (this.liveSocket.isConnected()) {
        this.liveSocket.reloadWithJitter(this);
      }
    }
    onClose(reason) {
      if (this.isDestroyed()) {
        return;
      }
      if (this.liveSocket.hasPendingLink() && reason !== "leave") {
        return this.liveSocket.reloadWithJitter(this);
      }
      this.destroyAllChildren();
      this.liveSocket.dropActiveElement(this);
      if (document.activeElement) {
        document.activeElement.blur();
      }
      if (this.liveSocket.isUnloaded()) {
        this.showLoader(BEFORE_UNLOAD_LOADER_TIMEOUT);
      }
    }
    onError(reason) {
      this.onClose(reason);
      if (this.liveSocket.isConnected()) {
        this.log("error", () => ["view crashed", reason]);
      }
      if (!this.liveSocket.isUnloaded()) {
        if (this.liveSocket.isConnected()) {
          this.displayError([PHX_LOADING_CLASS, PHX_ERROR_CLASS, PHX_SERVER_ERROR_CLASS]);
        } else {
          this.displayError([PHX_LOADING_CLASS, PHX_ERROR_CLASS, PHX_CLIENT_ERROR_CLASS]);
        }
      }
    }
    displayError(classes) {
      if (this.isMain()) {
        dom_default.dispatchEvent(window, "phx:page-loading-start", { detail: { to: this.href, kind: "error" } });
      }
      this.showLoader();
      this.setContainerClasses(...classes);
      this.execAll(this.binding("disconnected"));
    }
    pushWithReply(refGenerator, event, payload, onReply = function() {
    }) {
      if (!this.isConnected()) {
        return;
      }
      let [ref, [el], opts] = refGenerator ? refGenerator() : [null, [], {}];
      let onLoadingDone = function() {
      };
      if (opts.page_loading || el && el.getAttribute(this.binding(PHX_PAGE_LOADING)) !== null) {
        onLoadingDone = this.liveSocket.withPageLoading({ kind: "element", target: el });
      }
      if (typeof payload.cid !== "number") {
        delete payload.cid;
      }
      return this.liveSocket.wrapPush(this, { timeout: true }, () => {
        return this.channel.push(event, payload, PUSH_TIMEOUT).receive("ok", (resp) => {
          let finish = (hookReply) => {
            if (resp.redirect) {
              this.onRedirect(resp.redirect);
            }
            if (resp.live_patch) {
              this.onLivePatch(resp.live_patch);
            }
            if (resp.live_redirect) {
              this.onLiveRedirect(resp.live_redirect);
            }
            onLoadingDone();
            onReply(resp, hookReply);
          };
          if (resp.diff) {
            this.liveSocket.requestDOMUpdate(() => {
              this.applyDiff("update", resp.diff, ({ diff, reply, events }) => {
                if (ref !== null) {
                  this.undoRefs(ref);
                }
                this.update(diff, events);
                finish(reply);
              });
            });
          } else {
            if (ref !== null) {
              this.undoRefs(ref);
            }
            finish(null);
          }
        });
      });
    }
    undoRefs(ref) {
      if (!this.isConnected()) {
        return;
      }
      dom_default.all(document, `[${PHX_REF_SRC}="${this.id}"][${PHX_REF}="${ref}"]`, (el) => {
        let disabledVal = el.getAttribute(PHX_DISABLED);
        el.removeAttribute(PHX_REF);
        el.removeAttribute(PHX_REF_SRC);
        if (el.getAttribute(PHX_READONLY) !== null) {
          el.readOnly = false;
          el.removeAttribute(PHX_READONLY);
        }
        if (disabledVal !== null) {
          el.disabled = disabledVal === "true" ? true : false;
          el.removeAttribute(PHX_DISABLED);
        }
        PHX_EVENT_CLASSES.forEach((className) => dom_default.removeClass(el, className));
        let disableRestore = el.getAttribute(PHX_DISABLE_WITH_RESTORE);
        if (disableRestore !== null) {
          el.innerText = disableRestore;
          el.removeAttribute(PHX_DISABLE_WITH_RESTORE);
        }
        let toEl = dom_default.private(el, PHX_REF);
        if (toEl) {
          let hook = this.triggerBeforeUpdateHook(el, toEl);
          DOMPatch.patchEl(el, toEl, this.liveSocket.getActiveElement());
          if (hook) {
            hook.__updated();
          }
          dom_default.deletePrivate(el, PHX_REF);
        }
      });
    }
    putRef(elements, event, opts = {}) {
      let newRef = this.ref++;
      let disableWith = this.binding(PHX_DISABLE_WITH);
      if (opts.loading) {
        elements = elements.concat(dom_default.all(document, opts.loading));
      }
      elements.forEach((el) => {
        el.classList.add(`phx-${event}-loading`);
        el.setAttribute(PHX_REF, newRef);
        el.setAttribute(PHX_REF_SRC, this.el.id);
        let disableText = el.getAttribute(disableWith);
        if (disableText !== null) {
          if (!el.getAttribute(PHX_DISABLE_WITH_RESTORE)) {
            el.setAttribute(PHX_DISABLE_WITH_RESTORE, el.innerText);
          }
          if (disableText !== "") {
            el.innerText = disableText;
          }
          el.setAttribute("disabled", "");
        }
      });
      return [newRef, elements, opts];
    }
    componentID(el) {
      let cid = el.getAttribute && el.getAttribute(PHX_COMPONENT);
      return cid ? parseInt(cid) : null;
    }
    targetComponentID(target, targetCtx, opts = {}) {
      if (isCid(targetCtx)) {
        return targetCtx;
      }
      let cidOrSelector = target.getAttribute(this.binding("target"));
      if (isCid(cidOrSelector)) {
        return parseInt(cidOrSelector);
      } else if (targetCtx && (cidOrSelector !== null || opts.target)) {
        return this.closestComponentID(targetCtx);
      } else {
        return null;
      }
    }
    closestComponentID(targetCtx) {
      if (isCid(targetCtx)) {
        return targetCtx;
      } else if (targetCtx) {
        return maybe(targetCtx.closest(`[${PHX_COMPONENT}]`), (el) => this.ownsElement(el) && this.componentID(el));
      } else {
        return null;
      }
    }
    pushHookEvent(el, targetCtx, event, payload, onReply) {
      if (!this.isConnected()) {
        this.log("hook", () => ["unable to push hook event. LiveView not connected", event, payload]);
        return false;
      }
      let [ref, els, opts] = this.putRef([el], "hook");
      this.pushWithReply(() => [ref, els, opts], "event", {
        type: "hook",
        event,
        value: payload,
        cid: this.closestComponentID(targetCtx)
      }, (resp, reply) => onReply(reply, ref));
      return ref;
    }
    extractMeta(el, meta, value) {
      let prefix = this.binding("value-");
      for (let i = 0; i < el.attributes.length; i++) {
        if (!meta) {
          meta = {};
        }
        let name = el.attributes[i].name;
        if (name.startsWith(prefix)) {
          meta[name.replace(prefix, "")] = el.getAttribute(name);
        }
      }
      if (el.value !== void 0 && !(el instanceof HTMLFormElement)) {
        if (!meta) {
          meta = {};
        }
        meta.value = el.value;
        if (el.tagName === "INPUT" && CHECKABLE_INPUTS.indexOf(el.type) >= 0 && !el.checked) {
          delete meta.value;
        }
      }
      if (value) {
        if (!meta) {
          meta = {};
        }
        for (let key in value) {
          meta[key] = value[key];
        }
      }
      return meta;
    }
    pushEvent(type, el, targetCtx, phxEvent, meta, opts = {}, onReply) {
      this.pushWithReply(() => this.putRef([el], type, opts), "event", {
        type,
        event: phxEvent,
        value: this.extractMeta(el, meta, opts.value),
        cid: this.targetComponentID(el, targetCtx, opts)
      }, (resp, reply) => onReply && onReply(reply));
    }
    pushFileProgress(fileEl, entryRef, progress, onReply = function() {
    }) {
      this.liveSocket.withinOwners(fileEl.form, (view, targetCtx) => {
        view.pushWithReply(null, "progress", {
          event: fileEl.getAttribute(view.binding(PHX_PROGRESS)),
          ref: fileEl.getAttribute(PHX_UPLOAD_REF),
          entry_ref: entryRef,
          progress,
          cid: view.targetComponentID(fileEl.form, targetCtx)
        }, onReply);
      });
    }
    pushInput(inputEl, targetCtx, forceCid, phxEvent, opts, callback) {
      let uploads;
      let cid = isCid(forceCid) ? forceCid : this.targetComponentID(inputEl.form, targetCtx);
      let refGenerator = () => this.putRef([inputEl, inputEl.form], "change", opts);
      let formData;
      let meta = this.extractMeta(inputEl.form);
      if (inputEl.getAttribute(this.binding("change"))) {
        formData = serializeForm(inputEl.form, __spreadValues({ _target: opts._target }, meta), [inputEl.name]);
      } else {
        formData = serializeForm(inputEl.form, __spreadValues({ _target: opts._target }, meta));
      }
      if (dom_default.isUploadInput(inputEl) && inputEl.files && inputEl.files.length > 0) {
        LiveUploader.trackFiles(inputEl, Array.from(inputEl.files));
      }
      uploads = LiveUploader.serializeUploads(inputEl);
      let event = {
        type: "form",
        event: phxEvent,
        value: formData,
        uploads,
        cid
      };
      this.pushWithReply(refGenerator, "event", event, (resp) => {
        dom_default.showError(inputEl, this.liveSocket.binding(PHX_FEEDBACK_FOR));
        if (dom_default.isUploadInput(inputEl) && inputEl.getAttribute("data-phx-auto-upload") !== null) {
          if (LiveUploader.filesAwaitingPreflight(inputEl).length > 0) {
            let [ref, _els] = refGenerator();
            this.uploadFiles(inputEl.form, targetCtx, ref, cid, (_uploads) => {
              callback && callback(resp);
              this.triggerAwaitingSubmit(inputEl.form);
            });
          }
        } else {
          callback && callback(resp);
        }
      });
    }
    triggerAwaitingSubmit(formEl) {
      let awaitingSubmit = this.getScheduledSubmit(formEl);
      if (awaitingSubmit) {
        let [_el, _ref, _opts, callback] = awaitingSubmit;
        this.cancelSubmit(formEl);
        callback();
      }
    }
    getScheduledSubmit(formEl) {
      return this.formSubmits.find(([el, _ref, _opts, _callback]) => el.isSameNode(formEl));
    }
    scheduleSubmit(formEl, ref, opts, callback) {
      if (this.getScheduledSubmit(formEl)) {
        return true;
      }
      this.formSubmits.push([formEl, ref, opts, callback]);
    }
    cancelSubmit(formEl) {
      this.formSubmits = this.formSubmits.filter(([el, ref, _callback]) => {
        if (el.isSameNode(formEl)) {
          this.undoRefs(ref);
          return false;
        } else {
          return true;
        }
      });
    }
    disableForm(formEl, opts = {}) {
      let filterIgnored = (el) => {
        let userIgnored = closestPhxBinding(el, `${this.binding(PHX_UPDATE)}=ignore`, el.form);
        return !(userIgnored || closestPhxBinding(el, "data-phx-update=ignore", el.form));
      };
      let filterDisables = (el) => {
        return el.hasAttribute(this.binding(PHX_DISABLE_WITH));
      };
      let filterButton = (el) => el.tagName == "BUTTON";
      let filterInput = (el) => ["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName);
      let formElements = Array.from(formEl.elements);
      let disables = formElements.filter(filterDisables);
      let buttons = formElements.filter(filterButton).filter(filterIgnored);
      let inputs = formElements.filter(filterInput).filter(filterIgnored);
      buttons.forEach((button) => {
        button.setAttribute(PHX_DISABLED, button.disabled);
        button.disabled = true;
      });
      inputs.forEach((input) => {
        input.setAttribute(PHX_READONLY, input.readOnly);
        input.readOnly = true;
        if (input.files) {
          input.setAttribute(PHX_DISABLED, input.disabled);
          input.disabled = true;
        }
      });
      formEl.setAttribute(this.binding(PHX_PAGE_LOADING), "");
      return this.putRef([formEl].concat(disables).concat(buttons).concat(inputs), "submit", opts);
    }
    pushFormSubmit(formEl, targetCtx, phxEvent, submitter, opts, onReply) {
      let refGenerator = () => this.disableForm(formEl, opts);
      let cid = this.targetComponentID(formEl, targetCtx);
      if (LiveUploader.hasUploadsInProgress(formEl)) {
        let [ref, _els] = refGenerator();
        let push = () => this.pushFormSubmit(formEl, submitter, targetCtx, phxEvent, opts, onReply);
        return this.scheduleSubmit(formEl, ref, opts, push);
      } else if (LiveUploader.inputsAwaitingPreflight(formEl).length > 0) {
        let [ref, els] = refGenerator();
        let proxyRefGen = () => [ref, els, opts];
        this.uploadFiles(formEl, targetCtx, ref, cid, (_uploads) => {
          let meta = this.extractMeta(formEl);
          let formData = serializeForm(formEl, __spreadValues({ submitter }, meta));
          this.pushWithReply(proxyRefGen, "event", {
            type: "form",
            event: phxEvent,
            value: formData,
            cid
          }, onReply);
        });
      } else if (!(formEl.hasAttribute(PHX_REF) && formEl.classList.contains("phx-submit-loading"))) {
        let meta = this.extractMeta(formEl);
        let formData = serializeForm(formEl, __spreadValues({ submitter }, meta));
        this.pushWithReply(refGenerator, "event", {
          type: "form",
          event: phxEvent,
          value: formData,
          cid
        }, onReply);
      }
    }
    uploadFiles(formEl, targetCtx, ref, cid, onComplete) {
      let joinCountAtUpload = this.joinCount;
      let inputEls = LiveUploader.activeFileInputs(formEl);
      let numFileInputsInProgress = inputEls.length;
      inputEls.forEach((inputEl) => {
        let uploader = new LiveUploader(inputEl, this, () => {
          numFileInputsInProgress--;
          if (numFileInputsInProgress === 0) {
            onComplete();
          }
        });
        this.uploaders[inputEl] = uploader;
        let entries = uploader.entries().map((entry) => entry.toPreflightPayload());
        let payload = {
          ref: inputEl.getAttribute(PHX_UPLOAD_REF),
          entries,
          cid: this.targetComponentID(inputEl.form, targetCtx)
        };
        this.log("upload", () => ["sending preflight request", payload]);
        this.pushWithReply(null, "allow_upload", payload, (resp) => {
          this.log("upload", () => ["got preflight response", resp]);
          if (resp.error) {
            this.undoRefs(ref);
            let [entry_ref, reason] = resp.error;
            this.log("upload", () => [`error for entry ${entry_ref}`, reason]);
          } else {
            let onError = (callback) => {
              this.channel.onError(() => {
                if (this.joinCount === joinCountAtUpload) {
                  callback();
                }
              });
            };
            uploader.initAdapterUpload(resp, onError, this.liveSocket);
          }
        });
      });
    }
    dispatchUploads(name, filesOrBlobs) {
      let inputs = dom_default.findUploadInputs(this.el).filter((el) => el.name === name);
      if (inputs.length === 0) {
        logError(`no live file inputs found matching the name "${name}"`);
      } else if (inputs.length > 1) {
        logError(`duplicate live file inputs found matching the name "${name}"`);
      } else {
        dom_default.dispatchEvent(inputs[0], PHX_TRACK_UPLOADS, { detail: { files: filesOrBlobs } });
      }
    }
    pushFormRecovery(form, newCid, callback) {
      this.liveSocket.withinOwners(form, (view, targetCtx) => {
        let phxChange = this.binding("change");
        let inputs = Array.from(form.elements).filter((el) => dom_default.isFormInput(el) && el.name && !el.hasAttribute(phxChange));
        if (inputs.length === 0) {
          return;
        }
        let input = inputs.find((el) => el.type !== "hidden") || input[0];
        let phxEvent = form.getAttribute(this.binding(PHX_AUTO_RECOVER)) || form.getAttribute(this.binding("change"));
        js_default.exec("change", phxEvent, view, input, ["push", { _target: input.name, newCid, callback }]);
      });
    }
    pushLinkPatch(href, targetEl, callback) {
      let linkRef = this.liveSocket.setPendingLink(href);
      let refGen = targetEl ? () => this.putRef([targetEl], "click") : null;
      let fallback = () => this.liveSocket.redirect(window.location.href);
      let url = href.startsWith("/") ? `${location.protocol}//${location.host}${href}` : href;
      let push = this.pushWithReply(refGen, "live_patch", { url }, (resp) => {
        this.liveSocket.requestDOMUpdate(() => {
          if (resp.link_redirect) {
            this.liveSocket.replaceMain(href, null, callback, linkRef);
          } else {
            if (this.liveSocket.commitPendingLink(linkRef)) {
              this.href = href;
            }
            this.applyPendingUpdates();
            callback && callback(linkRef);
          }
        });
      });
      if (push) {
        push.receive("timeout", fallback);
      } else {
        fallback();
      }
    }
    formsForRecovery(html) {
      if (this.joinCount === 0) {
        return [];
      }
      let phxChange = this.binding("change");
      let template = document.createElement("template");
      template.innerHTML = html;
      return dom_default.all(this.el, `form[${phxChange}]`).filter((form) => form.id && this.ownsElement(form)).filter((form) => form.elements.length > 0).filter((form) => form.getAttribute(this.binding(PHX_AUTO_RECOVER)) !== "ignore").map((form) => {
        let newForm = template.content.querySelector(`form[id="${form.id}"][${phxChange}="${form.getAttribute(phxChange)}"]`);
        if (newForm) {
          return [form, newForm, this.targetComponentID(newForm)];
        } else {
          return [form, form, this.targetComponentID(form)];
        }
      }).filter(([form, newForm, newCid]) => newForm);
    }
    maybePushComponentsDestroyed(destroyedCIDs) {
      let willDestroyCIDs = destroyedCIDs.filter((cid) => {
        return dom_default.findComponentNodeList(this.el, cid).length === 0;
      });
      if (willDestroyCIDs.length > 0) {
        this.pruningCIDs.push(...willDestroyCIDs);
        this.pushWithReply(null, "cids_will_destroy", { cids: willDestroyCIDs }, () => {
          this.pruningCIDs = this.pruningCIDs.filter((cid) => willDestroyCIDs.indexOf(cid) !== -1);
          let completelyDestroyCIDs = willDestroyCIDs.filter((cid) => {
            return dom_default.findComponentNodeList(this.el, cid).length === 0;
          });
          if (completelyDestroyCIDs.length > 0) {
            this.pushWithReply(null, "cids_destroyed", { cids: completelyDestroyCIDs }, (resp) => {
              this.rendered.pruneCIDs(resp.cids);
            });
          }
        });
      }
    }
    ownsElement(el) {
      let parentViewEl = el.closest(PHX_VIEW_SELECTOR);
      return el.getAttribute(PHX_PARENT_ID) === this.id || parentViewEl && parentViewEl.id === this.id || !parentViewEl && this.isDead;
    }
    submitForm(form, targetCtx, phxEvent, submitter, opts = {}) {
      dom_default.putPrivate(form, PHX_HAS_SUBMITTED, true);
      let phxFeedback = this.liveSocket.binding(PHX_FEEDBACK_FOR);
      let inputs = Array.from(form.elements);
      inputs.forEach((input) => dom_default.putPrivate(input, PHX_HAS_SUBMITTED, true));
      this.liveSocket.blurActiveElement(this);
      this.pushFormSubmit(form, targetCtx, phxEvent, submitter, opts, () => {
        inputs.forEach((input) => dom_default.showError(input, phxFeedback));
        this.liveSocket.restorePreviouslyActiveFocus();
      });
    }
    binding(kind) {
      return this.liveSocket.binding(kind);
    }
  };
  var LiveSocket = class {
    constructor(url, phxSocket, opts = {}) {
      this.unloaded = false;
      if (!phxSocket || phxSocket.constructor.name === "Object") {
        throw new Error(`
      a phoenix Socket must be provided as the second argument to the LiveSocket constructor. For example:

          import {Socket} from "phoenix"
          import {LiveSocket} from "phoenix_live_view"
          let liveSocket = new LiveSocket("/live", Socket, {...})
      `);
      }
      this.socket = new phxSocket(url, opts);
      this.bindingPrefix = opts.bindingPrefix || BINDING_PREFIX;
      this.opts = opts;
      this.params = closure2(opts.params || {});
      this.viewLogger = opts.viewLogger;
      this.metadataCallbacks = opts.metadata || {};
      this.defaults = Object.assign(clone(DEFAULTS), opts.defaults || {});
      this.activeElement = null;
      this.prevActive = null;
      this.silenced = false;
      this.main = null;
      this.outgoingMainEl = null;
      this.clickStartedAtTarget = null;
      this.linkRef = 1;
      this.roots = {};
      this.href = window.location.href;
      this.pendingLink = null;
      this.currentLocation = clone(window.location);
      this.hooks = opts.hooks || {};
      this.uploaders = opts.uploaders || {};
      this.loaderTimeout = opts.loaderTimeout || LOADER_TIMEOUT;
      this.reloadWithJitterTimer = null;
      this.maxReloads = opts.maxReloads || MAX_RELOADS;
      this.reloadJitterMin = opts.reloadJitterMin || RELOAD_JITTER_MIN;
      this.reloadJitterMax = opts.reloadJitterMax || RELOAD_JITTER_MAX;
      this.failsafeJitter = opts.failsafeJitter || FAILSAFE_JITTER;
      this.localStorage = opts.localStorage || window.localStorage;
      this.sessionStorage = opts.sessionStorage || window.sessionStorage;
      this.boundTopLevelEvents = false;
      this.domCallbacks = Object.assign({ onNodeAdded: closure2(), onBeforeElUpdated: closure2() }, opts.dom || {});
      this.transitions = new TransitionSet();
      window.addEventListener("pagehide", (_e) => {
        this.unloaded = true;
      });
      this.socket.onOpen(() => {
        if (this.isUnloaded()) {
          window.location.reload();
        }
      });
    }
    isProfileEnabled() {
      return this.sessionStorage.getItem(PHX_LV_PROFILE) === "true";
    }
    isDebugEnabled() {
      return this.sessionStorage.getItem(PHX_LV_DEBUG) === "true";
    }
    isDebugDisabled() {
      return this.sessionStorage.getItem(PHX_LV_DEBUG) === "false";
    }
    enableDebug() {
      this.sessionStorage.setItem(PHX_LV_DEBUG, "true");
    }
    enableProfiling() {
      this.sessionStorage.setItem(PHX_LV_PROFILE, "true");
    }
    disableDebug() {
      this.sessionStorage.setItem(PHX_LV_DEBUG, "false");
    }
    disableProfiling() {
      this.sessionStorage.removeItem(PHX_LV_PROFILE);
    }
    enableLatencySim(upperBoundMs) {
      this.enableDebug();
      console.log("latency simulator enabled for the duration of this browser session. Call disableLatencySim() to disable");
      this.sessionStorage.setItem(PHX_LV_LATENCY_SIM, upperBoundMs);
    }
    disableLatencySim() {
      this.sessionStorage.removeItem(PHX_LV_LATENCY_SIM);
    }
    getLatencySim() {
      let str = this.sessionStorage.getItem(PHX_LV_LATENCY_SIM);
      return str ? parseInt(str) : null;
    }
    getSocket() {
      return this.socket;
    }
    connect() {
      if (window.location.hostname === "localhost" && !this.isDebugDisabled()) {
        this.enableDebug();
      }
      let doConnect = () => {
        if (this.joinRootViews()) {
          this.bindTopLevelEvents();
          this.socket.connect();
        } else if (this.main) {
          this.socket.connect();
        } else {
          this.bindTopLevelEvents({ dead: true });
        }
        this.joinDeadView();
      };
      if (["complete", "loaded", "interactive"].indexOf(document.readyState) >= 0) {
        doConnect();
      } else {
        document.addEventListener("DOMContentLoaded", () => doConnect());
      }
    }
    disconnect(callback) {
      clearTimeout(this.reloadWithJitterTimer);
      this.socket.disconnect(callback);
    }
    replaceTransport(transport) {
      clearTimeout(this.reloadWithJitterTimer);
      this.socket.replaceTransport(transport);
      this.connect();
    }
    execJS(el, encodedJS, eventType = null) {
      this.owner(el, (view) => js_default.exec(eventType, encodedJS, view, el));
    }
    execJSHookPush(el, phxEvent, data, callback) {
      this.withinOwners(el, (view) => {
        js_default.exec("hook", phxEvent, view, el, ["push", { data, callback }]);
      });
    }
    unload() {
      if (this.unloaded) {
        return;
      }
      if (this.main && this.isConnected()) {
        this.log(this.main, "socket", () => ["disconnect for page nav"]);
      }
      this.unloaded = true;
      this.destroyAllViews();
      this.disconnect();
    }
    triggerDOM(kind, args) {
      this.domCallbacks[kind](...args);
    }
    time(name, func) {
      if (!this.isProfileEnabled() || !console.time) {
        return func();
      }
      console.time(name);
      let result = func();
      console.timeEnd(name);
      return result;
    }
    log(view, kind, msgCallback) {
      if (this.viewLogger) {
        let [msg, obj] = msgCallback();
        this.viewLogger(view, kind, msg, obj);
      } else if (this.isDebugEnabled()) {
        let [msg, obj] = msgCallback();
        debug(view, kind, msg, obj);
      }
    }
    requestDOMUpdate(callback) {
      this.transitions.after(callback);
    }
    transition(time, onStart, onDone = function() {
    }) {
      this.transitions.addTransition(time, onStart, onDone);
    }
    onChannel(channel2, event, cb) {
      channel2.on(event, (data) => {
        let latency = this.getLatencySim();
        if (!latency) {
          cb(data);
        } else {
          setTimeout(() => cb(data), latency);
        }
      });
    }
    wrapPush(view, opts, push) {
      let latency = this.getLatencySim();
      let oldJoinCount = view.joinCount;
      if (!latency) {
        if (this.isConnected() && opts.timeout) {
          return push().receive("timeout", () => {
            if (view.joinCount === oldJoinCount && !view.isDestroyed()) {
              this.reloadWithJitter(view, () => {
                this.log(view, "timeout", () => ["received timeout while communicating with server. Falling back to hard refresh for recovery"]);
              });
            }
          });
        } else {
          return push();
        }
      }
      let fakePush = {
        receives: [],
        receive(kind, cb) {
          this.receives.push([kind, cb]);
        }
      };
      setTimeout(() => {
        if (view.isDestroyed()) {
          return;
        }
        fakePush.receives.reduce((acc, [kind, cb]) => acc.receive(kind, cb), push());
      }, latency);
      return fakePush;
    }
    reloadWithJitter(view, log) {
      clearTimeout(this.reloadWithJitterTimer);
      this.disconnect();
      let minMs = this.reloadJitterMin;
      let maxMs = this.reloadJitterMax;
      let afterMs = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
      let tries = browser_default.updateLocal(this.localStorage, window.location.pathname, CONSECUTIVE_RELOADS, 0, (count) => count + 1);
      if (tries > this.maxReloads) {
        afterMs = this.failsafeJitter;
      }
      this.reloadWithJitterTimer = setTimeout(() => {
        if (view.isDestroyed() || view.isConnected()) {
          return;
        }
        view.destroy();
        log ? log() : this.log(view, "join", () => [`encountered ${tries} consecutive reloads`]);
        if (tries > this.maxReloads) {
          this.log(view, "join", () => [`exceeded ${this.maxReloads} consecutive reloads. Entering failsafe mode`]);
        }
        if (this.hasPendingLink()) {
          window.location = this.pendingLink;
        } else {
          window.location.reload();
        }
      }, afterMs);
    }
    getHookCallbacks(name) {
      return name && name.startsWith("Phoenix.") ? hooks_default[name.split(".")[1]] : this.hooks[name];
    }
    isUnloaded() {
      return this.unloaded;
    }
    isConnected() {
      return this.socket.isConnected();
    }
    getBindingPrefix() {
      return this.bindingPrefix;
    }
    binding(kind) {
      return `${this.getBindingPrefix()}${kind}`;
    }
    channel(topic, params) {
      return this.socket.channel(topic, params);
    }
    joinDeadView() {
      let body = document.body;
      if (body && !this.isPhxView(body) && !this.isPhxView(document.firstElementChild)) {
        let view = this.newRootView(body);
        view.setHref(this.getHref());
        view.joinDead();
        if (!this.main) {
          this.main = view;
        }
        window.requestAnimationFrame(() => view.execNewMounted());
      }
    }
    joinRootViews() {
      let rootsFound = false;
      dom_default.all(document, `${PHX_VIEW_SELECTOR}:not([${PHX_PARENT_ID}])`, (rootEl) => {
        if (!this.getRootById(rootEl.id)) {
          let view = this.newRootView(rootEl);
          view.setHref(this.getHref());
          view.join();
          if (rootEl.hasAttribute(PHX_MAIN)) {
            this.main = view;
          }
        }
        rootsFound = true;
      });
      return rootsFound;
    }
    redirect(to, flash) {
      this.unload();
      browser_default.redirect(to, flash);
    }
    replaceMain(href, flash, callback = null, linkRef = this.setPendingLink(href)) {
      let liveReferer = this.currentLocation.href;
      this.outgoingMainEl = this.outgoingMainEl || this.main.el;
      let newMainEl = dom_default.cloneNode(this.outgoingMainEl, "");
      this.main.showLoader(this.loaderTimeout);
      this.main.destroy();
      this.main = this.newRootView(newMainEl, flash, liveReferer);
      this.main.setRedirect(href);
      this.transitionRemoves();
      this.main.join((joinCount, onDone) => {
        if (joinCount === 1 && this.commitPendingLink(linkRef)) {
          this.requestDOMUpdate(() => {
            dom_default.findPhxSticky(document).forEach((el) => newMainEl.appendChild(el));
            this.outgoingMainEl.replaceWith(newMainEl);
            this.outgoingMainEl = null;
            callback && requestAnimationFrame(() => callback(linkRef));
            onDone();
          });
        }
      });
    }
    transitionRemoves(elements) {
      let removeAttr = this.binding("remove");
      elements = elements || dom_default.all(document, `[${removeAttr}]`);
      elements.forEach((el) => {
        this.execJS(el, el.getAttribute(removeAttr), "remove");
      });
    }
    isPhxView(el) {
      return el.getAttribute && el.getAttribute(PHX_SESSION) !== null;
    }
    newRootView(el, flash, liveReferer) {
      let view = new View(el, this, null, flash, liveReferer);
      this.roots[view.id] = view;
      return view;
    }
    owner(childEl, callback) {
      let view = maybe(childEl.closest(PHX_VIEW_SELECTOR), (el) => this.getViewByEl(el)) || this.main;
      if (view) {
        callback(view);
      }
    }
    withinOwners(childEl, callback) {
      this.owner(childEl, (view) => callback(view, childEl));
    }
    getViewByEl(el) {
      let rootId = el.getAttribute(PHX_ROOT_ID);
      return maybe(this.getRootById(rootId), (root) => root.getDescendentByEl(el));
    }
    getRootById(id) {
      return this.roots[id];
    }
    destroyAllViews() {
      for (let id in this.roots) {
        this.roots[id].destroy();
        delete this.roots[id];
      }
      this.main = null;
    }
    destroyViewByEl(el) {
      let root = this.getRootById(el.getAttribute(PHX_ROOT_ID));
      if (root && root.id === el.id) {
        root.destroy();
        delete this.roots[root.id];
      } else if (root) {
        root.destroyDescendent(el.id);
      }
    }
    setActiveElement(target) {
      if (this.activeElement === target) {
        return;
      }
      this.activeElement = target;
      let cancel = () => {
        if (target === this.activeElement) {
          this.activeElement = null;
        }
        target.removeEventListener("mouseup", this);
        target.removeEventListener("touchend", this);
      };
      target.addEventListener("mouseup", cancel);
      target.addEventListener("touchend", cancel);
    }
    getActiveElement() {
      if (document.activeElement === document.body) {
        return this.activeElement || document.activeElement;
      } else {
        return document.activeElement || document.body;
      }
    }
    dropActiveElement(view) {
      if (this.prevActive && view.ownsElement(this.prevActive)) {
        this.prevActive = null;
      }
    }
    restorePreviouslyActiveFocus() {
      if (this.prevActive && this.prevActive !== document.body) {
        this.prevActive.focus();
      }
    }
    blurActiveElement() {
      this.prevActive = this.getActiveElement();
      if (this.prevActive !== document.body) {
        this.prevActive.blur();
      }
    }
    bindTopLevelEvents({ dead } = {}) {
      if (this.boundTopLevelEvents) {
        return;
      }
      this.boundTopLevelEvents = true;
      this.socket.onClose((event) => {
        if (event && event.code === 1e3 && this.main) {
          return this.reloadWithJitter(this.main);
        }
      });
      document.body.addEventListener("click", function() {
      });
      window.addEventListener("pageshow", (e) => {
        if (e.persisted) {
          this.getSocket().disconnect();
          this.withPageLoading({ to: window.location.href, kind: "redirect" });
          window.location.reload();
        }
      }, true);
      if (!dead) {
        this.bindNav();
      }
      this.bindClicks();
      if (!dead) {
        this.bindForms();
      }
      this.bind({ keyup: "keyup", keydown: "keydown" }, (e, type, view, targetEl, phxEvent, eventTarget) => {
        let matchKey = targetEl.getAttribute(this.binding(PHX_KEY));
        let pressedKey = e.key && e.key.toLowerCase();
        if (matchKey && matchKey.toLowerCase() !== pressedKey) {
          return;
        }
        let data = __spreadValues({ key: e.key }, this.eventMeta(type, e, targetEl));
        js_default.exec(type, phxEvent, view, targetEl, ["push", { data }]);
      });
      this.bind({ blur: "focusout", focus: "focusin" }, (e, type, view, targetEl, phxEvent, eventTarget) => {
        if (!eventTarget) {
          let data = __spreadValues({ key: e.key }, this.eventMeta(type, e, targetEl));
          js_default.exec(type, phxEvent, view, targetEl, ["push", { data }]);
        }
      });
      this.bind({ blur: "blur", focus: "focus" }, (e, type, view, targetEl, targetCtx, phxEvent, phxTarget) => {
        if (phxTarget === "window") {
          let data = this.eventMeta(type, e, targetEl);
          js_default.exec(type, phxEvent, view, targetEl, ["push", { data }]);
        }
      });
      window.addEventListener("dragover", (e) => e.preventDefault());
      window.addEventListener("drop", (e) => {
        e.preventDefault();
        let dropTargetId = maybe(closestPhxBinding(e.target, this.binding(PHX_DROP_TARGET)), (trueTarget) => {
          return trueTarget.getAttribute(this.binding(PHX_DROP_TARGET));
        });
        let dropTarget = dropTargetId && document.getElementById(dropTargetId);
        let files = Array.from(e.dataTransfer.files || []);
        if (!dropTarget || dropTarget.disabled || files.length === 0 || !(dropTarget.files instanceof FileList)) {
          return;
        }
        LiveUploader.trackFiles(dropTarget, files, e.dataTransfer);
        dropTarget.dispatchEvent(new Event("input", { bubbles: true }));
      });
      this.on(PHX_TRACK_UPLOADS, (e) => {
        let uploadTarget = e.target;
        if (!dom_default.isUploadInput(uploadTarget)) {
          return;
        }
        let files = Array.from(e.detail.files || []).filter((f) => f instanceof File || f instanceof Blob);
        LiveUploader.trackFiles(uploadTarget, files);
        uploadTarget.dispatchEvent(new Event("input", { bubbles: true }));
      });
    }
    eventMeta(eventName, e, targetEl) {
      let callback = this.metadataCallbacks[eventName];
      return callback ? callback(e, targetEl) : {};
    }
    setPendingLink(href) {
      this.linkRef++;
      this.pendingLink = href;
      return this.linkRef;
    }
    commitPendingLink(linkRef) {
      if (this.linkRef !== linkRef) {
        return false;
      } else {
        this.href = this.pendingLink;
        this.pendingLink = null;
        return true;
      }
    }
    getHref() {
      return this.href;
    }
    hasPendingLink() {
      return !!this.pendingLink;
    }
    bind(events, callback) {
      for (let event in events) {
        let browserEventName = events[event];
        this.on(browserEventName, (e) => {
          let binding = this.binding(event);
          let windowBinding = this.binding(`window-${event}`);
          let targetPhxEvent = e.target.getAttribute && e.target.getAttribute(binding);
          if (targetPhxEvent) {
            this.debounce(e.target, e, browserEventName, () => {
              this.withinOwners(e.target, (view) => {
                callback(e, event, view, e.target, targetPhxEvent, null);
              });
            });
          } else {
            dom_default.all(document, `[${windowBinding}]`, (el) => {
              let phxEvent = el.getAttribute(windowBinding);
              this.debounce(el, e, browserEventName, () => {
                this.withinOwners(el, (view) => {
                  callback(e, event, view, el, phxEvent, "window");
                });
              });
            });
          }
        });
      }
    }
    bindClicks() {
      window.addEventListener("click", (e) => this.clickStartedAtTarget = e.target);
      this.bindClick("click", "click", false);
      this.bindClick("mousedown", "capture-click", true);
    }
    bindClick(eventName, bindingName, capture) {
      let click = this.binding(bindingName);
      window.addEventListener(eventName, (e) => {
        let target = null;
        if (capture) {
          target = e.target.matches(`[${click}]`) ? e.target : e.target.querySelector(`[${click}]`);
        } else {
          let clickStartedAtTarget = this.clickStartedAtTarget || e.target;
          target = closestPhxBinding(clickStartedAtTarget, click);
          this.dispatchClickAway(e, clickStartedAtTarget);
          this.clickStartedAtTarget = null;
        }
        let phxEvent = target && target.getAttribute(click);
        if (!phxEvent) {
          if (!capture && dom_default.isNewPageClick(e, window.location)) {
            this.unload();
          }
          return;
        }
        if (target.getAttribute("href") === "#") {
          e.preventDefault();
        }
        if (target.hasAttribute(PHX_REF)) {
          return;
        }
        this.debounce(target, e, "click", () => {
          this.withinOwners(target, (view) => {
            js_default.exec("click", phxEvent, view, target, ["push", { data: this.eventMeta("click", e, target) }]);
          });
        });
      }, capture);
    }
    dispatchClickAway(e, clickStartedAt) {
      let phxClickAway = this.binding("click-away");
      dom_default.all(document, `[${phxClickAway}]`, (el) => {
        if (!(el.isSameNode(clickStartedAt) || el.contains(clickStartedAt))) {
          this.withinOwners(e.target, (view) => {
            let phxEvent = el.getAttribute(phxClickAway);
            if (js_default.isVisible(el)) {
              js_default.exec("click", phxEvent, view, el, ["push", { data: this.eventMeta("click", e, e.target) }]);
            }
          });
        }
      });
    }
    bindNav() {
      if (!browser_default.canPushState()) {
        return;
      }
      if (history.scrollRestoration) {
        history.scrollRestoration = "manual";
      }
      let scrollTimer = null;
      window.addEventListener("scroll", (_e) => {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
          browser_default.updateCurrentState((state) => Object.assign(state, { scroll: window.scrollY }));
        }, 100);
      });
      window.addEventListener("popstate", (event) => {
        if (!this.registerNewLocation(window.location)) {
          return;
        }
        let { type, id, root, scroll } = event.state || {};
        let href = window.location.href;
        dom_default.dispatchEvent(window, "phx:navigate", { detail: { href, patch: type === "patch", pop: true } });
        this.requestDOMUpdate(() => {
          if (this.main.isConnected() && (type === "patch" && id === this.main.id)) {
            this.main.pushLinkPatch(href, null, () => {
              this.maybeScroll(scroll);
            });
          } else {
            this.replaceMain(href, null, () => {
              if (root) {
                this.replaceRootHistory();
              }
              this.maybeScroll(scroll);
            });
          }
        });
      }, false);
      window.addEventListener("click", (e) => {
        let target = closestPhxBinding(e.target, PHX_LIVE_LINK);
        let type = target && target.getAttribute(PHX_LIVE_LINK);
        if (!type || !this.isConnected() || !this.main || dom_default.wantsNewTab(e)) {
          return;
        }
        let href = target.href;
        let linkState = target.getAttribute(PHX_LINK_STATE);
        e.preventDefault();
        e.stopImmediatePropagation();
        if (this.pendingLink === href) {
          return;
        }
        this.requestDOMUpdate(() => {
          if (type === "patch") {
            this.pushHistoryPatch(href, linkState, target);
          } else if (type === "redirect") {
            this.historyRedirect(href, linkState);
          } else {
            throw new Error(`expected ${PHX_LIVE_LINK} to be "patch" or "redirect", got: ${type}`);
          }
          let phxClick = target.getAttribute(this.binding("click"));
          if (phxClick) {
            this.requestDOMUpdate(() => this.execJS(target, phxClick, "click"));
          }
        });
      }, false);
    }
    maybeScroll(scroll) {
      if (typeof scroll === "number") {
        requestAnimationFrame(() => {
          window.scrollTo(0, scroll);
        });
      }
    }
    dispatchEvent(event, payload = {}) {
      dom_default.dispatchEvent(window, `phx:${event}`, { detail: payload });
    }
    dispatchEvents(events) {
      events.forEach(([event, payload]) => this.dispatchEvent(event, payload));
    }
    withPageLoading(info, callback) {
      dom_default.dispatchEvent(window, "phx:page-loading-start", { detail: info });
      let done = () => dom_default.dispatchEvent(window, "phx:page-loading-stop", { detail: info });
      return callback ? callback(done) : done;
    }
    pushHistoryPatch(href, linkState, targetEl) {
      if (!this.isConnected()) {
        return browser_default.redirect(href);
      }
      this.withPageLoading({ to: href, kind: "patch" }, (done) => {
        this.main.pushLinkPatch(href, targetEl, (linkRef) => {
          this.historyPatch(href, linkState, linkRef);
          done();
        });
      });
    }
    historyPatch(href, linkState, linkRef = this.setPendingLink(href)) {
      if (!this.commitPendingLink(linkRef)) {
        return;
      }
      browser_default.pushState(linkState, { type: "patch", id: this.main.id }, href);
      dom_default.dispatchEvent(window, "phx:navigate", { detail: { patch: true, href, pop: false } });
      this.registerNewLocation(window.location);
    }
    historyRedirect(href, linkState, flash) {
      if (!this.isConnected()) {
        return browser_default.redirect(href, flash);
      }
      if (/^\/$|^\/[^\/]+.*$/.test(href)) {
        let { protocol, host } = window.location;
        href = `${protocol}//${host}${href}`;
      }
      let scroll = window.scrollY;
      this.withPageLoading({ to: href, kind: "redirect" }, (done) => {
        this.replaceMain(href, flash, (linkRef) => {
          if (linkRef === this.linkRef) {
            browser_default.pushState(linkState, { type: "redirect", id: this.main.id, scroll }, href);
            dom_default.dispatchEvent(window, "phx:navigate", { detail: { href, patch: false, pop: false } });
            this.registerNewLocation(window.location);
          }
          done();
        });
      });
    }
    replaceRootHistory() {
      browser_default.pushState("replace", { root: true, type: "patch", id: this.main.id });
    }
    registerNewLocation(newLocation) {
      let { pathname, search } = this.currentLocation;
      if (pathname + search === newLocation.pathname + newLocation.search) {
        return false;
      } else {
        this.currentLocation = clone(newLocation);
        return true;
      }
    }
    bindForms() {
      let iterations = 0;
      let externalFormSubmitted = false;
      this.on("submit", (e) => {
        let phxSubmit = e.target.getAttribute(this.binding("submit"));
        let phxChange = e.target.getAttribute(this.binding("change"));
        if (!externalFormSubmitted && phxChange && !phxSubmit) {
          externalFormSubmitted = true;
          e.preventDefault();
          this.withinOwners(e.target, (view) => {
            view.disableForm(e.target);
            window.requestAnimationFrame(() => {
              if (dom_default.isUnloadableFormSubmit(e)) {
                this.unload();
              }
              e.target.submit();
            });
          });
        }
      }, true);
      this.on("submit", (e) => {
        let phxEvent = e.target.getAttribute(this.binding("submit"));
        if (!phxEvent) {
          if (dom_default.isUnloadableFormSubmit(e)) {
            this.unload();
          }
          return;
        }
        e.preventDefault();
        e.target.disabled = true;
        this.withinOwners(e.target, (view) => {
          js_default.exec("submit", phxEvent, view, e.target, ["push", { submitter: e.submitter }]);
        });
      }, false);
      for (let type of ["change", "input"]) {
        this.on(type, (e) => {
          let phxChange = this.binding("change");
          let input = e.target;
          let inputEvent = input.getAttribute(phxChange);
          let formEvent = input.form && input.form.getAttribute(phxChange);
          let phxEvent = inputEvent || formEvent;
          if (!phxEvent) {
            return;
          }
          if (input.type === "number" && input.validity && input.validity.badInput) {
            return;
          }
          let dispatcher = inputEvent ? input : input.form;
          let currentIterations = iterations;
          iterations++;
          let { at, type: lastType } = dom_default.private(input, "prev-iteration") || {};
          if (at === currentIterations - 1 && type !== lastType) {
            return;
          }
          dom_default.putPrivate(input, "prev-iteration", { at: currentIterations, type });
          this.debounce(input, e, type, () => {
            this.withinOwners(dispatcher, (view) => {
              dom_default.putPrivate(input, PHX_HAS_FOCUSED, true);
              if (!dom_default.isTextualInput(input)) {
                this.setActiveElement(input);
              }
              js_default.exec("change", phxEvent, view, input, ["push", { _target: e.target.name, dispatcher }]);
            });
          });
        }, false);
      }
      this.on("reset", (e) => {
        let form = e.target;
        dom_default.resetForm(form, this.binding(PHX_FEEDBACK_FOR));
        let input = Array.from(form.elements).find((el) => el.type === "reset");
        window.requestAnimationFrame(() => {
          input.dispatchEvent(new Event("input", { bubbles: true, cancelable: false }));
        });
      });
    }
    debounce(el, event, eventType, callback) {
      if (eventType === "blur" || eventType === "focusout") {
        return callback();
      }
      let phxDebounce = this.binding(PHX_DEBOUNCE);
      let phxThrottle = this.binding(PHX_THROTTLE);
      let defaultDebounce = this.defaults.debounce.toString();
      let defaultThrottle = this.defaults.throttle.toString();
      this.withinOwners(el, (view) => {
        let asyncFilter = () => !view.isDestroyed() && document.body.contains(el);
        dom_default.debounce(el, event, phxDebounce, defaultDebounce, phxThrottle, defaultThrottle, asyncFilter, () => {
          callback();
        });
      });
    }
    silenceEvents(callback) {
      this.silenced = true;
      callback();
      this.silenced = false;
    }
    on(event, callback) {
      window.addEventListener(event, (e) => {
        if (!this.silenced) {
          callback(e);
        }
      });
    }
  };
  var TransitionSet = class {
    constructor() {
      this.transitions = /* @__PURE__ */ new Set();
      this.pendingOps = [];
    }
    reset() {
      this.transitions.forEach((timer) => {
        clearTimeout(timer);
        this.transitions.delete(timer);
      });
      this.flushPendingOps();
    }
    after(callback) {
      if (this.size() === 0) {
        callback();
      } else {
        this.pushPendingOp(callback);
      }
    }
    addTransition(time, onStart, onDone) {
      onStart();
      let timer = setTimeout(() => {
        this.transitions.delete(timer);
        onDone();
        this.flushPendingOps();
      }, time);
      this.transitions.add(timer);
    }
    pushPendingOp(op) {
      this.pendingOps.push(op);
    }
    size() {
      return this.transitions.size;
    }
    flushPendingOps() {
      if (this.size() > 0) {
        return;
      }
      let op = this.pendingOps.shift();
      if (op) {
        op();
        this.flushPendingOps();
      }
    }
  };

  // js/app.js
  var import_topbar = __toESM(require_topbar());
  var csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content");
  var liveSocket = new LiveSocket("/live", Socket, {
    params: { _csrf_token: csrfToken }
  });
  import_topbar.default.config({ barColors: { 0: "#29d" }, shadowColor: "rgba(0, 0, 0, .3)" });
  window.addEventListener("phx:page-loading-start", (_info) => import_topbar.default.show(300));
  window.addEventListener("phx:page-loading-stop", (_info) => import_topbar.default.hide());
  liveSocket.connect();
  window.liveSocket = liveSocket;
})();
/**
 * @license MIT
 * topbar 2.0.0, 2023-02-04
 * https://buunguyen.github.io/topbar
 * Copyright (c) 2021 Buu Nguyen
 */
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vYXNzZXRzL3ZlbmRvci90b3BiYXIuanMiLCAiLi4vLi4vLi4vZGVwcy9waG9lbml4L2Fzc2V0cy9qcy9waG9lbml4L3V0aWxzLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peC9hc3NldHMvanMvcGhvZW5peC9jb25zdGFudHMuanMiLCAiLi4vLi4vLi4vZGVwcy9waG9lbml4L2Fzc2V0cy9qcy9waG9lbml4L3B1c2guanMiLCAiLi4vLi4vLi4vZGVwcy9waG9lbml4L2Fzc2V0cy9qcy9waG9lbml4L3RpbWVyLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peC9hc3NldHMvanMvcGhvZW5peC9jaGFubmVsLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peC9hc3NldHMvanMvcGhvZW5peC9hamF4LmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peC9hc3NldHMvanMvcGhvZW5peC9sb25ncG9sbC5qcyIsICIuLi8uLi8uLi9kZXBzL3Bob2VuaXgvYXNzZXRzL2pzL3Bob2VuaXgvcHJlc2VuY2UuanMiLCAiLi4vLi4vLi4vZGVwcy9waG9lbml4L2Fzc2V0cy9qcy9waG9lbml4L3NlcmlhbGl6ZXIuanMiLCAiLi4vLi4vLi4vZGVwcy9waG9lbml4L2Fzc2V0cy9qcy9waG9lbml4L3NvY2tldC5qcyIsICIuLi8uLi8uLi9hc3NldHMvanMvY2xpZW50X3NvY2tldC5qcyIsICIuLi8uLi8uLi9kZXBzL3Bob2VuaXhfaHRtbC9wcml2L3N0YXRpYy9waG9lbml4X2h0bWwuanMiLCAiLi4vLi4vLi4vZGVwcy9waG9lbml4X2xpdmVfdmlldy9hc3NldHMvanMvcGhvZW5peF9saXZlX3ZpZXcvY29uc3RhbnRzLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL2pzL3Bob2VuaXhfbGl2ZV92aWV3L2VudHJ5X3VwbG9hZGVyLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL2pzL3Bob2VuaXhfbGl2ZV92aWV3L3V0aWxzLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL2pzL3Bob2VuaXhfbGl2ZV92aWV3L2Jyb3dzZXIuanMiLCAiLi4vLi4vLi4vZGVwcy9waG9lbml4X2xpdmVfdmlldy9hc3NldHMvanMvcGhvZW5peF9saXZlX3ZpZXcvZG9tLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL2pzL3Bob2VuaXhfbGl2ZV92aWV3L3VwbG9hZF9lbnRyeS5qcyIsICIuLi8uLi8uLi9kZXBzL3Bob2VuaXhfbGl2ZV92aWV3L2Fzc2V0cy9qcy9waG9lbml4X2xpdmVfdmlldy9saXZlX3VwbG9hZGVyLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL2pzL3Bob2VuaXhfbGl2ZV92aWV3L2FyaWEuanMiLCAiLi4vLi4vLi4vZGVwcy9waG9lbml4X2xpdmVfdmlldy9hc3NldHMvanMvcGhvZW5peF9saXZlX3ZpZXcvaG9va3MuanMiLCAiLi4vLi4vLi4vZGVwcy9waG9lbml4X2xpdmVfdmlldy9hc3NldHMvanMvcGhvZW5peF9saXZlX3ZpZXcvZG9tX3Bvc3RfbW9ycGhfcmVzdG9yZXIuanMiLCAiLi4vLi4vLi4vZGVwcy9waG9lbml4X2xpdmVfdmlldy9hc3NldHMvbm9kZV9tb2R1bGVzL21vcnBoZG9tL2Rpc3QvbW9ycGhkb20tZXNtLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL2pzL3Bob2VuaXhfbGl2ZV92aWV3L2RvbV9wYXRjaC5qcyIsICIuLi8uLi8uLi9kZXBzL3Bob2VuaXhfbGl2ZV92aWV3L2Fzc2V0cy9qcy9waG9lbml4X2xpdmVfdmlldy9yZW5kZXJlZC5qcyIsICIuLi8uLi8uLi9kZXBzL3Bob2VuaXhfbGl2ZV92aWV3L2Fzc2V0cy9qcy9waG9lbml4X2xpdmVfdmlldy92aWV3X2hvb2suanMiLCAiLi4vLi4vLi4vZGVwcy9waG9lbml4X2xpdmVfdmlldy9hc3NldHMvanMvcGhvZW5peF9saXZlX3ZpZXcvanMuanMiLCAiLi4vLi4vLi4vZGVwcy9waG9lbml4X2xpdmVfdmlldy9hc3NldHMvanMvcGhvZW5peF9saXZlX3ZpZXcvdmlldy5qcyIsICIuLi8uLi8uLi9kZXBzL3Bob2VuaXhfbGl2ZV92aWV3L2Fzc2V0cy9qcy9waG9lbml4X2xpdmVfdmlldy9saXZlX3NvY2tldC5qcyIsICIuLi8uLi8uLi9hc3NldHMvanMvYXBwLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvKipcbiAqIEBsaWNlbnNlIE1JVFxuICogdG9wYmFyIDIuMC4wLCAyMDIzLTAyLTA0XG4gKiBodHRwczovL2J1dW5ndXllbi5naXRodWIuaW8vdG9wYmFyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjEgQnV1IE5ndXllblxuICovXG4oZnVuY3Rpb24gKHdpbmRvdywgZG9jdW1lbnQpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgLy8gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vcGF1bGlyaXNoLzE1Nzk2NzFcbiAgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgbGFzdFRpbWUgPSAwO1xuICAgIHZhciB2ZW5kb3JzID0gW1wibXNcIiwgXCJtb3pcIiwgXCJ3ZWJraXRcIiwgXCJvXCJdO1xuICAgIGZvciAodmFyIHggPSAwOyB4IDwgdmVuZG9ycy5sZW5ndGggJiYgIXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWU7ICsreCkge1xuICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSA9XG4gICAgICAgIHdpbmRvd1t2ZW5kb3JzW3hdICsgXCJSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcIl07XG4gICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgPVxuICAgICAgICB3aW5kb3dbdmVuZG9yc1t4XSArIFwiQ2FuY2VsQW5pbWF0aW9uRnJhbWVcIl0gfHxcbiAgICAgICAgd2luZG93W3ZlbmRvcnNbeF0gKyBcIkNhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZVwiXTtcbiAgICB9XG4gICAgaWYgKCF3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKVxuICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IGZ1bmN0aW9uIChjYWxsYmFjaywgZWxlbWVudCkge1xuICAgICAgICB2YXIgY3VyclRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgdmFyIHRpbWVUb0NhbGwgPSBNYXRoLm1heCgwLCAxNiAtIChjdXJyVGltZSAtIGxhc3RUaW1lKSk7XG4gICAgICAgIHZhciBpZCA9IHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBjYWxsYmFjayhjdXJyVGltZSArIHRpbWVUb0NhbGwpO1xuICAgICAgICB9LCB0aW1lVG9DYWxsKTtcbiAgICAgICAgbGFzdFRpbWUgPSBjdXJyVGltZSArIHRpbWVUb0NhbGw7XG4gICAgICAgIHJldHVybiBpZDtcbiAgICAgIH07XG4gICAgaWYgKCF3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUpXG4gICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KGlkKTtcbiAgICAgIH07XG4gIH0pKCk7XG5cbiAgdmFyIGNhbnZhcyxcbiAgICBjdXJyZW50UHJvZ3Jlc3MsXG4gICAgc2hvd2luZyxcbiAgICBwcm9ncmVzc1RpbWVySWQgPSBudWxsLFxuICAgIGZhZGVUaW1lcklkID0gbnVsbCxcbiAgICBkZWxheVRpbWVySWQgPSBudWxsLFxuICAgIGFkZEV2ZW50ID0gZnVuY3Rpb24gKGVsZW0sIHR5cGUsIGhhbmRsZXIpIHtcbiAgICAgIGlmIChlbGVtLmFkZEV2ZW50TGlzdGVuZXIpIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyLCBmYWxzZSk7XG4gICAgICBlbHNlIGlmIChlbGVtLmF0dGFjaEV2ZW50KSBlbGVtLmF0dGFjaEV2ZW50KFwib25cIiArIHR5cGUsIGhhbmRsZXIpO1xuICAgICAgZWxzZSBlbGVtW1wib25cIiArIHR5cGVdID0gaGFuZGxlcjtcbiAgICB9LFxuICAgIG9wdGlvbnMgPSB7XG4gICAgICBhdXRvUnVuOiB0cnVlLFxuICAgICAgYmFyVGhpY2tuZXNzOiAzLFxuICAgICAgYmFyQ29sb3JzOiB7XG4gICAgICAgIDA6IFwicmdiYSgyNiwgIDE4OCwgMTU2LCAuOSlcIixcbiAgICAgICAgXCIuMjVcIjogXCJyZ2JhKDUyLCAgMTUyLCAyMTksIC45KVwiLFxuICAgICAgICBcIi41MFwiOiBcInJnYmEoMjQxLCAxOTYsIDE1LCAgLjkpXCIsXG4gICAgICAgIFwiLjc1XCI6IFwicmdiYSgyMzAsIDEyNiwgMzQsICAuOSlcIixcbiAgICAgICAgXCIxLjBcIjogXCJyZ2JhKDIxMSwgODQsICAwLCAgIC45KVwiLFxuICAgICAgfSxcbiAgICAgIHNoYWRvd0JsdXI6IDEwLFxuICAgICAgc2hhZG93Q29sb3I6IFwicmdiYSgwLCAgIDAsICAgMCwgICAuNilcIixcbiAgICAgIGNsYXNzTmFtZTogbnVsbCxcbiAgICB9LFxuICAgIHJlcGFpbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBjYW52YXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgIGNhbnZhcy5oZWlnaHQgPSBvcHRpb25zLmJhclRoaWNrbmVzcyAqIDU7IC8vIG5lZWQgc3BhY2UgZm9yIHNoYWRvd1xuXG4gICAgICB2YXIgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgIGN0eC5zaGFkb3dCbHVyID0gb3B0aW9ucy5zaGFkb3dCbHVyO1xuICAgICAgY3R4LnNoYWRvd0NvbG9yID0gb3B0aW9ucy5zaGFkb3dDb2xvcjtcblxuICAgICAgdmFyIGxpbmVHcmFkaWVudCA9IGN0eC5jcmVhdGVMaW5lYXJHcmFkaWVudCgwLCAwLCBjYW52YXMud2lkdGgsIDApO1xuICAgICAgZm9yICh2YXIgc3RvcCBpbiBvcHRpb25zLmJhckNvbG9ycylcbiAgICAgICAgbGluZUdyYWRpZW50LmFkZENvbG9yU3RvcChzdG9wLCBvcHRpb25zLmJhckNvbG9yc1tzdG9wXSk7XG4gICAgICBjdHgubGluZVdpZHRoID0gb3B0aW9ucy5iYXJUaGlja25lc3M7XG4gICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICBjdHgubW92ZVRvKDAsIG9wdGlvbnMuYmFyVGhpY2tuZXNzIC8gMik7XG4gICAgICBjdHgubGluZVRvKFxuICAgICAgICBNYXRoLmNlaWwoY3VycmVudFByb2dyZXNzICogY2FudmFzLndpZHRoKSxcbiAgICAgICAgb3B0aW9ucy5iYXJUaGlja25lc3MgLyAyXG4gICAgICApO1xuICAgICAgY3R4LnN0cm9rZVN0eWxlID0gbGluZUdyYWRpZW50O1xuICAgICAgY3R4LnN0cm9rZSgpO1xuICAgIH0sXG4gICAgY3JlYXRlQ2FudmFzID0gZnVuY3Rpb24gKCkge1xuICAgICAgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgIHZhciBzdHlsZSA9IGNhbnZhcy5zdHlsZTtcbiAgICAgIHN0eWxlLnBvc2l0aW9uID0gXCJmaXhlZFwiO1xuICAgICAgc3R5bGUudG9wID0gc3R5bGUubGVmdCA9IHN0eWxlLnJpZ2h0ID0gc3R5bGUubWFyZ2luID0gc3R5bGUucGFkZGluZyA9IDA7XG4gICAgICBzdHlsZS56SW5kZXggPSAxMDAwMDE7XG4gICAgICBzdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICBpZiAob3B0aW9ucy5jbGFzc05hbWUpIGNhbnZhcy5jbGFzc0xpc3QuYWRkKG9wdGlvbnMuY2xhc3NOYW1lKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY2FudmFzKTtcbiAgICAgIGFkZEV2ZW50KHdpbmRvdywgXCJyZXNpemVcIiwgcmVwYWludCk7XG4gICAgfSxcbiAgICB0b3BiYXIgPSB7XG4gICAgICBjb25maWc6IGZ1bmN0aW9uIChvcHRzKSB7XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBvcHRzKVxuICAgICAgICAgIGlmIChvcHRpb25zLmhhc093blByb3BlcnR5KGtleSkpIG9wdGlvbnNba2V5XSA9IG9wdHNba2V5XTtcbiAgICAgIH0sXG4gICAgICBzaG93OiBmdW5jdGlvbiAoZGVsYXkpIHtcbiAgICAgICAgaWYgKHNob3dpbmcpIHJldHVybjtcbiAgICAgICAgaWYgKGRlbGF5KSB7XG4gICAgICAgICAgaWYgKGRlbGF5VGltZXJJZCkgcmV0dXJuO1xuICAgICAgICAgIGRlbGF5VGltZXJJZCA9IHNldFRpbWVvdXQoKCkgPT4gdG9wYmFyLnNob3coKSwgZGVsYXkpO1xuICAgICAgICB9IGVsc2UgIHtcbiAgICAgICAgICBzaG93aW5nID0gdHJ1ZTtcbiAgICAgICAgICBpZiAoZmFkZVRpbWVySWQgIT09IG51bGwpIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZShmYWRlVGltZXJJZCk7XG4gICAgICAgICAgaWYgKCFjYW52YXMpIGNyZWF0ZUNhbnZhcygpO1xuICAgICAgICAgIGNhbnZhcy5zdHlsZS5vcGFjaXR5ID0gMTtcbiAgICAgICAgICBjYW52YXMuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgICB0b3BiYXIucHJvZ3Jlc3MoMCk7XG4gICAgICAgICAgaWYgKG9wdGlvbnMuYXV0b1J1bikge1xuICAgICAgICAgICAgKGZ1bmN0aW9uIGxvb3AoKSB7XG4gICAgICAgICAgICAgIHByb2dyZXNzVGltZXJJZCA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7XG4gICAgICAgICAgICAgIHRvcGJhci5wcm9ncmVzcyhcbiAgICAgICAgICAgICAgICBcIitcIiArIDAuMDUgKiBNYXRoLnBvdygxIC0gTWF0aC5zcXJ0KGN1cnJlbnRQcm9ncmVzcyksIDIpXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHByb2dyZXNzOiBmdW5jdGlvbiAodG8pIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0byA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIGN1cnJlbnRQcm9ncmVzcztcbiAgICAgICAgaWYgKHR5cGVvZiB0byA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgIHRvID1cbiAgICAgICAgICAgICh0by5pbmRleE9mKFwiK1wiKSA+PSAwIHx8IHRvLmluZGV4T2YoXCItXCIpID49IDBcbiAgICAgICAgICAgICAgPyBjdXJyZW50UHJvZ3Jlc3NcbiAgICAgICAgICAgICAgOiAwKSArIHBhcnNlRmxvYXQodG8pO1xuICAgICAgICB9XG4gICAgICAgIGN1cnJlbnRQcm9ncmVzcyA9IHRvID4gMSA/IDEgOiB0bztcbiAgICAgICAgcmVwYWludCgpO1xuICAgICAgICByZXR1cm4gY3VycmVudFByb2dyZXNzO1xuICAgICAgfSxcbiAgICAgIGhpZGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KGRlbGF5VGltZXJJZCk7XG4gICAgICAgIGRlbGF5VGltZXJJZCA9IG51bGw7XG4gICAgICAgIGlmICghc2hvd2luZykgcmV0dXJuO1xuICAgICAgICBzaG93aW5nID0gZmFsc2U7XG4gICAgICAgIGlmIChwcm9ncmVzc1RpbWVySWQgIT0gbnVsbCkge1xuICAgICAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZShwcm9ncmVzc1RpbWVySWQpO1xuICAgICAgICAgIHByb2dyZXNzVGltZXJJZCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgKGZ1bmN0aW9uIGxvb3AoKSB7XG4gICAgICAgICAgaWYgKHRvcGJhci5wcm9ncmVzcyhcIisuMVwiKSA+PSAxKSB7XG4gICAgICAgICAgICBjYW52YXMuc3R5bGUub3BhY2l0eSAtPSAwLjA1O1xuICAgICAgICAgICAgaWYgKGNhbnZhcy5zdHlsZS5vcGFjaXR5IDw9IDAuMDUpIHtcbiAgICAgICAgICAgICAgY2FudmFzLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgICAgZmFkZVRpbWVySWQgPSBudWxsO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGZhZGVUaW1lcklkID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcbiAgICAgICAgfSkoKTtcbiAgICAgIH0sXG4gICAgfTtcblxuICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHRvcGJhcjtcbiAgfSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuICAgIGRlZmluZShmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdG9wYmFyO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHRoaXMudG9wYmFyID0gdG9wYmFyO1xuICB9XG59LmNhbGwodGhpcywgd2luZG93LCBkb2N1bWVudCkpO1xuIiwgIi8vIHdyYXBzIHZhbHVlIGluIGNsb3N1cmUgb3IgcmV0dXJucyBjbG9zdXJlXG5leHBvcnQgbGV0IGNsb3N1cmUgPSAodmFsdWUpID0+IHtcbiAgaWYodHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIpe1xuICAgIHJldHVybiB2YWx1ZVxuICB9IGVsc2Uge1xuICAgIGxldCBjbG9zdXJlID0gZnVuY3Rpb24gKCl7IHJldHVybiB2YWx1ZSB9XG4gICAgcmV0dXJuIGNsb3N1cmVcbiAgfVxufVxuIiwgImV4cG9ydCBjb25zdCBnbG9iYWxTZWxmID0gdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogbnVsbFxuZXhwb3J0IGNvbnN0IHBoeFdpbmRvdyA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiBudWxsXG5leHBvcnQgY29uc3QgZ2xvYmFsID0gZ2xvYmFsU2VsZiB8fCBwaHhXaW5kb3cgfHwgZ2xvYmFsXG5leHBvcnQgY29uc3QgREVGQVVMVF9WU04gPSBcIjIuMC4wXCJcbmV4cG9ydCBjb25zdCBTT0NLRVRfU1RBVEVTID0ge2Nvbm5lY3Rpbmc6IDAsIG9wZW46IDEsIGNsb3Npbmc6IDIsIGNsb3NlZDogM31cbmV4cG9ydCBjb25zdCBERUZBVUxUX1RJTUVPVVQgPSAxMDAwMFxuZXhwb3J0IGNvbnN0IFdTX0NMT1NFX05PUk1BTCA9IDEwMDBcbmV4cG9ydCBjb25zdCBDSEFOTkVMX1NUQVRFUyA9IHtcbiAgY2xvc2VkOiBcImNsb3NlZFwiLFxuICBlcnJvcmVkOiBcImVycm9yZWRcIixcbiAgam9pbmVkOiBcImpvaW5lZFwiLFxuICBqb2luaW5nOiBcImpvaW5pbmdcIixcbiAgbGVhdmluZzogXCJsZWF2aW5nXCIsXG59XG5leHBvcnQgY29uc3QgQ0hBTk5FTF9FVkVOVFMgPSB7XG4gIGNsb3NlOiBcInBoeF9jbG9zZVwiLFxuICBlcnJvcjogXCJwaHhfZXJyb3JcIixcbiAgam9pbjogXCJwaHhfam9pblwiLFxuICByZXBseTogXCJwaHhfcmVwbHlcIixcbiAgbGVhdmU6IFwicGh4X2xlYXZlXCJcbn1cblxuZXhwb3J0IGNvbnN0IFRSQU5TUE9SVFMgPSB7XG4gIGxvbmdwb2xsOiBcImxvbmdwb2xsXCIsXG4gIHdlYnNvY2tldDogXCJ3ZWJzb2NrZXRcIlxufVxuZXhwb3J0IGNvbnN0IFhIUl9TVEFURVMgPSB7XG4gIGNvbXBsZXRlOiA0XG59XG4iLCAiLyoqXG4gKiBJbml0aWFsaXplcyB0aGUgUHVzaFxuICogQHBhcmFtIHtDaGFubmVsfSBjaGFubmVsIC0gVGhlIENoYW5uZWxcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudCAtIFRoZSBldmVudCwgZm9yIGV4YW1wbGUgYFwicGh4X2pvaW5cImBcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYXlsb2FkIC0gVGhlIHBheWxvYWQsIGZvciBleGFtcGxlIGB7dXNlcl9pZDogMTIzfWBcbiAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lb3V0IC0gVGhlIHB1c2ggdGltZW91dCBpbiBtaWxsaXNlY29uZHNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHVzaCB7XG4gIGNvbnN0cnVjdG9yKGNoYW5uZWwsIGV2ZW50LCBwYXlsb2FkLCB0aW1lb3V0KXtcbiAgICB0aGlzLmNoYW5uZWwgPSBjaGFubmVsXG4gICAgdGhpcy5ldmVudCA9IGV2ZW50XG4gICAgdGhpcy5wYXlsb2FkID0gcGF5bG9hZCB8fCBmdW5jdGlvbiAoKXsgcmV0dXJuIHt9IH1cbiAgICB0aGlzLnJlY2VpdmVkUmVzcCA9IG51bGxcbiAgICB0aGlzLnRpbWVvdXQgPSB0aW1lb3V0XG4gICAgdGhpcy50aW1lb3V0VGltZXIgPSBudWxsXG4gICAgdGhpcy5yZWNIb29rcyA9IFtdXG4gICAgdGhpcy5zZW50ID0gZmFsc2VcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gdGltZW91dFxuICAgKi9cbiAgcmVzZW5kKHRpbWVvdXQpe1xuICAgIHRoaXMudGltZW91dCA9IHRpbWVvdXRcbiAgICB0aGlzLnJlc2V0KClcbiAgICB0aGlzLnNlbmQoKVxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBzZW5kKCl7XG4gICAgaWYodGhpcy5oYXNSZWNlaXZlZChcInRpbWVvdXRcIikpeyByZXR1cm4gfVxuICAgIHRoaXMuc3RhcnRUaW1lb3V0KClcbiAgICB0aGlzLnNlbnQgPSB0cnVlXG4gICAgdGhpcy5jaGFubmVsLnNvY2tldC5wdXNoKHtcbiAgICAgIHRvcGljOiB0aGlzLmNoYW5uZWwudG9waWMsXG4gICAgICBldmVudDogdGhpcy5ldmVudCxcbiAgICAgIHBheWxvYWQ6IHRoaXMucGF5bG9hZCgpLFxuICAgICAgcmVmOiB0aGlzLnJlZixcbiAgICAgIGpvaW5fcmVmOiB0aGlzLmNoYW5uZWwuam9pblJlZigpXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0geyp9IHN0YXR1c1xuICAgKiBAcGFyYW0geyp9IGNhbGxiYWNrXG4gICAqL1xuICByZWNlaXZlKHN0YXR1cywgY2FsbGJhY2spe1xuICAgIGlmKHRoaXMuaGFzUmVjZWl2ZWQoc3RhdHVzKSl7XG4gICAgICBjYWxsYmFjayh0aGlzLnJlY2VpdmVkUmVzcC5yZXNwb25zZSlcbiAgICB9XG5cbiAgICB0aGlzLnJlY0hvb2tzLnB1c2goe3N0YXR1cywgY2FsbGJhY2t9KVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHJlc2V0KCl7XG4gICAgdGhpcy5jYW5jZWxSZWZFdmVudCgpXG4gICAgdGhpcy5yZWYgPSBudWxsXG4gICAgdGhpcy5yZWZFdmVudCA9IG51bGxcbiAgICB0aGlzLnJlY2VpdmVkUmVzcCA9IG51bGxcbiAgICB0aGlzLnNlbnQgPSBmYWxzZVxuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBtYXRjaFJlY2VpdmUoe3N0YXR1cywgcmVzcG9uc2UsIF9yZWZ9KXtcbiAgICB0aGlzLnJlY0hvb2tzLmZpbHRlcihoID0+IGguc3RhdHVzID09PSBzdGF0dXMpXG4gICAgICAuZm9yRWFjaChoID0+IGguY2FsbGJhY2socmVzcG9uc2UpKVxuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBjYW5jZWxSZWZFdmVudCgpe1xuICAgIGlmKCF0aGlzLnJlZkV2ZW50KXsgcmV0dXJuIH1cbiAgICB0aGlzLmNoYW5uZWwub2ZmKHRoaXMucmVmRXZlbnQpXG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGNhbmNlbFRpbWVvdXQoKXtcbiAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0VGltZXIpXG4gICAgdGhpcy50aW1lb3V0VGltZXIgPSBudWxsXG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHN0YXJ0VGltZW91dCgpe1xuICAgIGlmKHRoaXMudGltZW91dFRpbWVyKXsgdGhpcy5jYW5jZWxUaW1lb3V0KCkgfVxuICAgIHRoaXMucmVmID0gdGhpcy5jaGFubmVsLnNvY2tldC5tYWtlUmVmKClcbiAgICB0aGlzLnJlZkV2ZW50ID0gdGhpcy5jaGFubmVsLnJlcGx5RXZlbnROYW1lKHRoaXMucmVmKVxuXG4gICAgdGhpcy5jaGFubmVsLm9uKHRoaXMucmVmRXZlbnQsIHBheWxvYWQgPT4ge1xuICAgICAgdGhpcy5jYW5jZWxSZWZFdmVudCgpXG4gICAgICB0aGlzLmNhbmNlbFRpbWVvdXQoKVxuICAgICAgdGhpcy5yZWNlaXZlZFJlc3AgPSBwYXlsb2FkXG4gICAgICB0aGlzLm1hdGNoUmVjZWl2ZShwYXlsb2FkKVxuICAgIH0pXG5cbiAgICB0aGlzLnRpbWVvdXRUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy50cmlnZ2VyKFwidGltZW91dFwiLCB7fSlcbiAgICB9LCB0aGlzLnRpbWVvdXQpXG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGhhc1JlY2VpdmVkKHN0YXR1cyl7XG4gICAgcmV0dXJuIHRoaXMucmVjZWl2ZWRSZXNwICYmIHRoaXMucmVjZWl2ZWRSZXNwLnN0YXR1cyA9PT0gc3RhdHVzXG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRyaWdnZXIoc3RhdHVzLCByZXNwb25zZSl7XG4gICAgdGhpcy5jaGFubmVsLnRyaWdnZXIodGhpcy5yZWZFdmVudCwge3N0YXR1cywgcmVzcG9uc2V9KVxuICB9XG59XG4iLCAiLyoqXG4gKlxuICogQ3JlYXRlcyBhIHRpbWVyIHRoYXQgYWNjZXB0cyBhIGB0aW1lckNhbGNgIGZ1bmN0aW9uIHRvIHBlcmZvcm1cbiAqIGNhbGN1bGF0ZWQgdGltZW91dCByZXRyaWVzLCBzdWNoIGFzIGV4cG9uZW50aWFsIGJhY2tvZmYuXG4gKlxuICogQGV4YW1wbGVcbiAqIGxldCByZWNvbm5lY3RUaW1lciA9IG5ldyBUaW1lcigoKSA9PiB0aGlzLmNvbm5lY3QoKSwgZnVuY3Rpb24odHJpZXMpe1xuICogICByZXR1cm4gWzEwMDAsIDUwMDAsIDEwMDAwXVt0cmllcyAtIDFdIHx8IDEwMDAwXG4gKiB9KVxuICogcmVjb25uZWN0VGltZXIuc2NoZWR1bGVUaW1lb3V0KCkgLy8gZmlyZXMgYWZ0ZXIgMTAwMFxuICogcmVjb25uZWN0VGltZXIuc2NoZWR1bGVUaW1lb3V0KCkgLy8gZmlyZXMgYWZ0ZXIgNTAwMFxuICogcmVjb25uZWN0VGltZXIucmVzZXQoKVxuICogcmVjb25uZWN0VGltZXIuc2NoZWR1bGVUaW1lb3V0KCkgLy8gZmlyZXMgYWZ0ZXIgMTAwMFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB0aW1lckNhbGNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGltZXIge1xuICBjb25zdHJ1Y3RvcihjYWxsYmFjaywgdGltZXJDYWxjKXtcbiAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2tcbiAgICB0aGlzLnRpbWVyQ2FsYyA9IHRpbWVyQ2FsY1xuICAgIHRoaXMudGltZXIgPSBudWxsXG4gICAgdGhpcy50cmllcyA9IDBcbiAgfVxuXG4gIHJlc2V0KCl7XG4gICAgdGhpcy50cmllcyA9IDBcbiAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lcilcbiAgfVxuXG4gIC8qKlxuICAgKiBDYW5jZWxzIGFueSBwcmV2aW91cyBzY2hlZHVsZVRpbWVvdXQgYW5kIHNjaGVkdWxlcyBjYWxsYmFja1xuICAgKi9cbiAgc2NoZWR1bGVUaW1lb3V0KCl7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZXIpXG5cbiAgICB0aGlzLnRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnRyaWVzID0gdGhpcy50cmllcyArIDFcbiAgICAgIHRoaXMuY2FsbGJhY2soKVxuICAgIH0sIHRoaXMudGltZXJDYWxjKHRoaXMudHJpZXMgKyAxKSlcbiAgfVxufVxuIiwgImltcG9ydCB7Y2xvc3VyZX0gZnJvbSBcIi4vdXRpbHNcIlxuaW1wb3J0IHtcbiAgQ0hBTk5FTF9FVkVOVFMsXG4gIENIQU5ORUxfU1RBVEVTLFxufSBmcm9tIFwiLi9jb25zdGFudHNcIlxuXG5pbXBvcnQgUHVzaCBmcm9tIFwiLi9wdXNoXCJcbmltcG9ydCBUaW1lciBmcm9tIFwiLi90aW1lclwiXG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0b3BpY1xuICogQHBhcmFtIHsoT2JqZWN0fGZ1bmN0aW9uKX0gcGFyYW1zXG4gKiBAcGFyYW0ge1NvY2tldH0gc29ja2V0XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENoYW5uZWwge1xuICBjb25zdHJ1Y3Rvcih0b3BpYywgcGFyYW1zLCBzb2NrZXQpe1xuICAgIHRoaXMuc3RhdGUgPSBDSEFOTkVMX1NUQVRFUy5jbG9zZWRcbiAgICB0aGlzLnRvcGljID0gdG9waWNcbiAgICB0aGlzLnBhcmFtcyA9IGNsb3N1cmUocGFyYW1zIHx8IHt9KVxuICAgIHRoaXMuc29ja2V0ID0gc29ja2V0XG4gICAgdGhpcy5iaW5kaW5ncyA9IFtdXG4gICAgdGhpcy5iaW5kaW5nUmVmID0gMFxuICAgIHRoaXMudGltZW91dCA9IHRoaXMuc29ja2V0LnRpbWVvdXRcbiAgICB0aGlzLmpvaW5lZE9uY2UgPSBmYWxzZVxuICAgIHRoaXMuam9pblB1c2ggPSBuZXcgUHVzaCh0aGlzLCBDSEFOTkVMX0VWRU5UUy5qb2luLCB0aGlzLnBhcmFtcywgdGhpcy50aW1lb3V0KVxuICAgIHRoaXMucHVzaEJ1ZmZlciA9IFtdXG4gICAgdGhpcy5zdGF0ZUNoYW5nZVJlZnMgPSBbXVxuXG4gICAgdGhpcy5yZWpvaW5UaW1lciA9IG5ldyBUaW1lcigoKSA9PiB7XG4gICAgICBpZih0aGlzLnNvY2tldC5pc0Nvbm5lY3RlZCgpKXsgdGhpcy5yZWpvaW4oKSB9XG4gICAgfSwgdGhpcy5zb2NrZXQucmVqb2luQWZ0ZXJNcylcbiAgICB0aGlzLnN0YXRlQ2hhbmdlUmVmcy5wdXNoKHRoaXMuc29ja2V0Lm9uRXJyb3IoKCkgPT4gdGhpcy5yZWpvaW5UaW1lci5yZXNldCgpKSlcbiAgICB0aGlzLnN0YXRlQ2hhbmdlUmVmcy5wdXNoKHRoaXMuc29ja2V0Lm9uT3BlbigoKSA9PiB7XG4gICAgICB0aGlzLnJlam9pblRpbWVyLnJlc2V0KClcbiAgICAgIGlmKHRoaXMuaXNFcnJvcmVkKCkpeyB0aGlzLnJlam9pbigpIH1cbiAgICB9KVxuICAgIClcbiAgICB0aGlzLmpvaW5QdXNoLnJlY2VpdmUoXCJva1wiLCAoKSA9PiB7XG4gICAgICB0aGlzLnN0YXRlID0gQ0hBTk5FTF9TVEFURVMuam9pbmVkXG4gICAgICB0aGlzLnJlam9pblRpbWVyLnJlc2V0KClcbiAgICAgIHRoaXMucHVzaEJ1ZmZlci5mb3JFYWNoKHB1c2hFdmVudCA9PiBwdXNoRXZlbnQuc2VuZCgpKVxuICAgICAgdGhpcy5wdXNoQnVmZmVyID0gW11cbiAgICB9KVxuICAgIHRoaXMuam9pblB1c2gucmVjZWl2ZShcImVycm9yXCIsICgpID0+IHtcbiAgICAgIHRoaXMuc3RhdGUgPSBDSEFOTkVMX1NUQVRFUy5lcnJvcmVkXG4gICAgICBpZih0aGlzLnNvY2tldC5pc0Nvbm5lY3RlZCgpKXsgdGhpcy5yZWpvaW5UaW1lci5zY2hlZHVsZVRpbWVvdXQoKSB9XG4gICAgfSlcbiAgICB0aGlzLm9uQ2xvc2UoKCkgPT4ge1xuICAgICAgdGhpcy5yZWpvaW5UaW1lci5yZXNldCgpXG4gICAgICBpZih0aGlzLnNvY2tldC5oYXNMb2dnZXIoKSkgdGhpcy5zb2NrZXQubG9nKFwiY2hhbm5lbFwiLCBgY2xvc2UgJHt0aGlzLnRvcGljfSAke3RoaXMuam9pblJlZigpfWApXG4gICAgICB0aGlzLnN0YXRlID0gQ0hBTk5FTF9TVEFURVMuY2xvc2VkXG4gICAgICB0aGlzLnNvY2tldC5yZW1vdmUodGhpcylcbiAgICB9KVxuICAgIHRoaXMub25FcnJvcihyZWFzb24gPT4ge1xuICAgICAgaWYodGhpcy5zb2NrZXQuaGFzTG9nZ2VyKCkpIHRoaXMuc29ja2V0LmxvZyhcImNoYW5uZWxcIiwgYGVycm9yICR7dGhpcy50b3BpY31gLCByZWFzb24pXG4gICAgICBpZih0aGlzLmlzSm9pbmluZygpKXsgdGhpcy5qb2luUHVzaC5yZXNldCgpIH1cbiAgICAgIHRoaXMuc3RhdGUgPSBDSEFOTkVMX1NUQVRFUy5lcnJvcmVkXG4gICAgICBpZih0aGlzLnNvY2tldC5pc0Nvbm5lY3RlZCgpKXsgdGhpcy5yZWpvaW5UaW1lci5zY2hlZHVsZVRpbWVvdXQoKSB9XG4gICAgfSlcbiAgICB0aGlzLmpvaW5QdXNoLnJlY2VpdmUoXCJ0aW1lb3V0XCIsICgpID0+IHtcbiAgICAgIGlmKHRoaXMuc29ja2V0Lmhhc0xvZ2dlcigpKSB0aGlzLnNvY2tldC5sb2coXCJjaGFubmVsXCIsIGB0aW1lb3V0ICR7dGhpcy50b3BpY30gKCR7dGhpcy5qb2luUmVmKCl9KWAsIHRoaXMuam9pblB1c2gudGltZW91dClcbiAgICAgIGxldCBsZWF2ZVB1c2ggPSBuZXcgUHVzaCh0aGlzLCBDSEFOTkVMX0VWRU5UUy5sZWF2ZSwgY2xvc3VyZSh7fSksIHRoaXMudGltZW91dClcbiAgICAgIGxlYXZlUHVzaC5zZW5kKClcbiAgICAgIHRoaXMuc3RhdGUgPSBDSEFOTkVMX1NUQVRFUy5lcnJvcmVkXG4gICAgICB0aGlzLmpvaW5QdXNoLnJlc2V0KClcbiAgICAgIGlmKHRoaXMuc29ja2V0LmlzQ29ubmVjdGVkKCkpeyB0aGlzLnJlam9pblRpbWVyLnNjaGVkdWxlVGltZW91dCgpIH1cbiAgICB9KVxuICAgIHRoaXMub24oQ0hBTk5FTF9FVkVOVFMucmVwbHksIChwYXlsb2FkLCByZWYpID0+IHtcbiAgICAgIHRoaXMudHJpZ2dlcih0aGlzLnJlcGx5RXZlbnROYW1lKHJlZiksIHBheWxvYWQpXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBKb2luIHRoZSBjaGFubmVsXG4gICAqIEBwYXJhbSB7aW50ZWdlcn0gdGltZW91dFxuICAgKiBAcmV0dXJucyB7UHVzaH1cbiAgICovXG4gIGpvaW4odGltZW91dCA9IHRoaXMudGltZW91dCl7XG4gICAgaWYodGhpcy5qb2luZWRPbmNlKXtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcInRyaWVkIHRvIGpvaW4gbXVsdGlwbGUgdGltZXMuICdqb2luJyBjYW4gb25seSBiZSBjYWxsZWQgYSBzaW5nbGUgdGltZSBwZXIgY2hhbm5lbCBpbnN0YW5jZVwiKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnRpbWVvdXQgPSB0aW1lb3V0XG4gICAgICB0aGlzLmpvaW5lZE9uY2UgPSB0cnVlXG4gICAgICB0aGlzLnJlam9pbigpXG4gICAgICByZXR1cm4gdGhpcy5qb2luUHVzaFxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIb29rIGludG8gY2hhbm5lbCBjbG9zZVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgKi9cbiAgb25DbG9zZShjYWxsYmFjayl7XG4gICAgdGhpcy5vbihDSEFOTkVMX0VWRU5UUy5jbG9zZSwgY2FsbGJhY2spXG4gIH1cblxuICAvKipcbiAgICogSG9vayBpbnRvIGNoYW5uZWwgZXJyb3JzXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAqL1xuICBvbkVycm9yKGNhbGxiYWNrKXtcbiAgICByZXR1cm4gdGhpcy5vbihDSEFOTkVMX0VWRU5UUy5lcnJvciwgcmVhc29uID0+IGNhbGxiYWNrKHJlYXNvbikpXG4gIH1cblxuICAvKipcbiAgICogU3Vic2NyaWJlcyBvbiBjaGFubmVsIGV2ZW50c1xuICAgKlxuICAgKiBTdWJzY3JpcHRpb24gcmV0dXJucyBhIHJlZiBjb3VudGVyLCB3aGljaCBjYW4gYmUgdXNlZCBsYXRlciB0b1xuICAgKiB1bnN1YnNjcmliZSB0aGUgZXhhY3QgZXZlbnQgbGlzdGVuZXJcbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogY29uc3QgcmVmMSA9IGNoYW5uZWwub24oXCJldmVudFwiLCBkb19zdHVmZilcbiAgICogY29uc3QgcmVmMiA9IGNoYW5uZWwub24oXCJldmVudFwiLCBkb19vdGhlcl9zdHVmZilcbiAgICogY2hhbm5lbC5vZmYoXCJldmVudFwiLCByZWYxKVxuICAgKiAvLyBTaW5jZSB1bnN1YnNjcmlwdGlvbiwgZG9fc3R1ZmYgd29uJ3QgZmlyZSxcbiAgICogLy8gd2hpbGUgZG9fb3RoZXJfc3R1ZmYgd2lsbCBrZWVwIGZpcmluZyBvbiB0aGUgXCJldmVudFwiXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgKiBAcmV0dXJucyB7aW50ZWdlcn0gcmVmXG4gICAqL1xuICBvbihldmVudCwgY2FsbGJhY2spe1xuICAgIGxldCByZWYgPSB0aGlzLmJpbmRpbmdSZWYrK1xuICAgIHRoaXMuYmluZGluZ3MucHVzaCh7ZXZlbnQsIHJlZiwgY2FsbGJhY2t9KVxuICAgIHJldHVybiByZWZcbiAgfVxuXG4gIC8qKlxuICAgKiBVbnN1YnNjcmliZXMgb2ZmIG9mIGNoYW5uZWwgZXZlbnRzXG4gICAqXG4gICAqIFVzZSB0aGUgcmVmIHJldHVybmVkIGZyb20gYSBjaGFubmVsLm9uKCkgdG8gdW5zdWJzY3JpYmUgb25lXG4gICAqIGhhbmRsZXIsIG9yIHBhc3Mgbm90aGluZyBmb3IgdGhlIHJlZiB0byB1bnN1YnNjcmliZSBhbGxcbiAgICogaGFuZGxlcnMgZm9yIHRoZSBnaXZlbiBldmVudC5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogLy8gVW5zdWJzY3JpYmUgdGhlIGRvX3N0dWZmIGhhbmRsZXJcbiAgICogY29uc3QgcmVmMSA9IGNoYW5uZWwub24oXCJldmVudFwiLCBkb19zdHVmZilcbiAgICogY2hhbm5lbC5vZmYoXCJldmVudFwiLCByZWYxKVxuICAgKlxuICAgKiAvLyBVbnN1YnNjcmliZSBhbGwgaGFuZGxlcnMgZnJvbSBldmVudFxuICAgKiBjaGFubmVsLm9mZihcImV2ZW50XCIpXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFxuICAgKiBAcGFyYW0ge2ludGVnZXJ9IHJlZlxuICAgKi9cbiAgb2ZmKGV2ZW50LCByZWYpe1xuICAgIHRoaXMuYmluZGluZ3MgPSB0aGlzLmJpbmRpbmdzLmZpbHRlcigoYmluZCkgPT4ge1xuICAgICAgcmV0dXJuICEoYmluZC5ldmVudCA9PT0gZXZlbnQgJiYgKHR5cGVvZiByZWYgPT09IFwidW5kZWZpbmVkXCIgfHwgcmVmID09PSBiaW5kLnJlZikpXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgY2FuUHVzaCgpeyByZXR1cm4gdGhpcy5zb2NrZXQuaXNDb25uZWN0ZWQoKSAmJiB0aGlzLmlzSm9pbmVkKCkgfVxuXG4gIC8qKlxuICAgKiBTZW5kcyBhIG1lc3NhZ2UgYGV2ZW50YCB0byBwaG9lbml4IHdpdGggdGhlIHBheWxvYWQgYHBheWxvYWRgLlxuICAgKiBQaG9lbml4IHJlY2VpdmVzIHRoaXMgaW4gdGhlIGBoYW5kbGVfaW4oZXZlbnQsIHBheWxvYWQsIHNvY2tldClgXG4gICAqIGZ1bmN0aW9uLiBpZiBwaG9lbml4IHJlcGxpZXMgb3IgaXQgdGltZXMgb3V0IChkZWZhdWx0IDEwMDAwbXMpLFxuICAgKiB0aGVuIG9wdGlvbmFsbHkgdGhlIHJlcGx5IGNhbiBiZSByZWNlaXZlZC5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogY2hhbm5lbC5wdXNoKFwiZXZlbnRcIilcbiAgICogICAucmVjZWl2ZShcIm9rXCIsIHBheWxvYWQgPT4gY29uc29sZS5sb2coXCJwaG9lbml4IHJlcGxpZWQ6XCIsIHBheWxvYWQpKVxuICAgKiAgIC5yZWNlaXZlKFwiZXJyb3JcIiwgZXJyID0+IGNvbnNvbGUubG9nKFwicGhvZW5peCBlcnJvcmVkXCIsIGVycikpXG4gICAqICAgLnJlY2VpdmUoXCJ0aW1lb3V0XCIsICgpID0+IGNvbnNvbGUubG9nKFwidGltZWQgb3V0IHB1c2hpbmdcIikpXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFxuICAgKiBAcGFyYW0ge09iamVjdH0gcGF5bG9hZFxuICAgKiBAcGFyYW0ge251bWJlcn0gW3RpbWVvdXRdXG4gICAqIEByZXR1cm5zIHtQdXNofVxuICAgKi9cbiAgcHVzaChldmVudCwgcGF5bG9hZCwgdGltZW91dCA9IHRoaXMudGltZW91dCl7XG4gICAgcGF5bG9hZCA9IHBheWxvYWQgfHwge31cbiAgICBpZighdGhpcy5qb2luZWRPbmNlKXtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgdHJpZWQgdG8gcHVzaCAnJHtldmVudH0nIHRvICcke3RoaXMudG9waWN9JyBiZWZvcmUgam9pbmluZy4gVXNlIGNoYW5uZWwuam9pbigpIGJlZm9yZSBwdXNoaW5nIGV2ZW50c2ApXG4gICAgfVxuICAgIGxldCBwdXNoRXZlbnQgPSBuZXcgUHVzaCh0aGlzLCBldmVudCwgZnVuY3Rpb24gKCl7IHJldHVybiBwYXlsb2FkIH0sIHRpbWVvdXQpXG4gICAgaWYodGhpcy5jYW5QdXNoKCkpe1xuICAgICAgcHVzaEV2ZW50LnNlbmQoKVxuICAgIH0gZWxzZSB7XG4gICAgICBwdXNoRXZlbnQuc3RhcnRUaW1lb3V0KClcbiAgICAgIHRoaXMucHVzaEJ1ZmZlci5wdXNoKHB1c2hFdmVudClcbiAgICB9XG5cbiAgICByZXR1cm4gcHVzaEV2ZW50XG4gIH1cblxuICAvKiogTGVhdmVzIHRoZSBjaGFubmVsXG4gICAqXG4gICAqIFVuc3Vic2NyaWJlcyBmcm9tIHNlcnZlciBldmVudHMsIGFuZFxuICAgKiBpbnN0cnVjdHMgY2hhbm5lbCB0byB0ZXJtaW5hdGUgb24gc2VydmVyXG4gICAqXG4gICAqIFRyaWdnZXJzIG9uQ2xvc2UoKSBob29rc1xuICAgKlxuICAgKiBUbyByZWNlaXZlIGxlYXZlIGFja25vd2xlZGdlbWVudHMsIHVzZSB0aGUgYHJlY2VpdmVgXG4gICAqIGhvb2sgdG8gYmluZCB0byB0aGUgc2VydmVyIGFjaywgaWU6XG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGNoYW5uZWwubGVhdmUoKS5yZWNlaXZlKFwib2tcIiwgKCkgPT4gYWxlcnQoXCJsZWZ0IVwiKSApXG4gICAqXG4gICAqIEBwYXJhbSB7aW50ZWdlcn0gdGltZW91dFxuICAgKiBAcmV0dXJucyB7UHVzaH1cbiAgICovXG4gIGxlYXZlKHRpbWVvdXQgPSB0aGlzLnRpbWVvdXQpe1xuICAgIHRoaXMucmVqb2luVGltZXIucmVzZXQoKVxuICAgIHRoaXMuam9pblB1c2guY2FuY2VsVGltZW91dCgpXG5cbiAgICB0aGlzLnN0YXRlID0gQ0hBTk5FTF9TVEFURVMubGVhdmluZ1xuICAgIGxldCBvbkNsb3NlID0gKCkgPT4ge1xuICAgICAgaWYodGhpcy5zb2NrZXQuaGFzTG9nZ2VyKCkpIHRoaXMuc29ja2V0LmxvZyhcImNoYW5uZWxcIiwgYGxlYXZlICR7dGhpcy50b3BpY31gKVxuICAgICAgdGhpcy50cmlnZ2VyKENIQU5ORUxfRVZFTlRTLmNsb3NlLCBcImxlYXZlXCIpXG4gICAgfVxuICAgIGxldCBsZWF2ZVB1c2ggPSBuZXcgUHVzaCh0aGlzLCBDSEFOTkVMX0VWRU5UUy5sZWF2ZSwgY2xvc3VyZSh7fSksIHRpbWVvdXQpXG4gICAgbGVhdmVQdXNoLnJlY2VpdmUoXCJva1wiLCAoKSA9PiBvbkNsb3NlKCkpXG4gICAgICAucmVjZWl2ZShcInRpbWVvdXRcIiwgKCkgPT4gb25DbG9zZSgpKVxuICAgIGxlYXZlUHVzaC5zZW5kKClcbiAgICBpZighdGhpcy5jYW5QdXNoKCkpeyBsZWF2ZVB1c2gudHJpZ2dlcihcIm9rXCIsIHt9KSB9XG5cbiAgICByZXR1cm4gbGVhdmVQdXNoXG4gIH1cblxuICAvKipcbiAgICogT3ZlcnJpZGFibGUgbWVzc2FnZSBob29rXG4gICAqXG4gICAqIFJlY2VpdmVzIGFsbCBldmVudHMgZm9yIHNwZWNpYWxpemVkIG1lc3NhZ2UgaGFuZGxpbmdcbiAgICogYmVmb3JlIGRpc3BhdGNoaW5nIHRvIHRoZSBjaGFubmVsIGNhbGxiYWNrcy5cbiAgICpcbiAgICogTXVzdCByZXR1cm4gdGhlIHBheWxvYWQsIG1vZGlmaWVkIG9yIHVubW9kaWZpZWRcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXlsb2FkXG4gICAqIEBwYXJhbSB7aW50ZWdlcn0gcmVmXG4gICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAqL1xuICBvbk1lc3NhZ2UoX2V2ZW50LCBwYXlsb2FkLCBfcmVmKXsgcmV0dXJuIHBheWxvYWQgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgaXNNZW1iZXIodG9waWMsIGV2ZW50LCBwYXlsb2FkLCBqb2luUmVmKXtcbiAgICBpZih0aGlzLnRvcGljICE9PSB0b3BpYyl7IHJldHVybiBmYWxzZSB9XG5cbiAgICBpZihqb2luUmVmICYmIGpvaW5SZWYgIT09IHRoaXMuam9pblJlZigpKXtcbiAgICAgIGlmKHRoaXMuc29ja2V0Lmhhc0xvZ2dlcigpKSB0aGlzLnNvY2tldC5sb2coXCJjaGFubmVsXCIsIFwiZHJvcHBpbmcgb3V0ZGF0ZWQgbWVzc2FnZVwiLCB7dG9waWMsIGV2ZW50LCBwYXlsb2FkLCBqb2luUmVmfSlcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgam9pblJlZigpeyByZXR1cm4gdGhpcy5qb2luUHVzaC5yZWYgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcmVqb2luKHRpbWVvdXQgPSB0aGlzLnRpbWVvdXQpe1xuICAgIGlmKHRoaXMuaXNMZWF2aW5nKCkpeyByZXR1cm4gfVxuICAgIHRoaXMuc29ja2V0LmxlYXZlT3BlblRvcGljKHRoaXMudG9waWMpXG4gICAgdGhpcy5zdGF0ZSA9IENIQU5ORUxfU1RBVEVTLmpvaW5pbmdcbiAgICB0aGlzLmpvaW5QdXNoLnJlc2VuZCh0aW1lb3V0KVxuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0cmlnZ2VyKGV2ZW50LCBwYXlsb2FkLCByZWYsIGpvaW5SZWYpe1xuICAgIGxldCBoYW5kbGVkUGF5bG9hZCA9IHRoaXMub25NZXNzYWdlKGV2ZW50LCBwYXlsb2FkLCByZWYsIGpvaW5SZWYpXG4gICAgaWYocGF5bG9hZCAmJiAhaGFuZGxlZFBheWxvYWQpeyB0aHJvdyBuZXcgRXJyb3IoXCJjaGFubmVsIG9uTWVzc2FnZSBjYWxsYmFja3MgbXVzdCByZXR1cm4gdGhlIHBheWxvYWQsIG1vZGlmaWVkIG9yIHVubW9kaWZpZWRcIikgfVxuXG4gICAgbGV0IGV2ZW50QmluZGluZ3MgPSB0aGlzLmJpbmRpbmdzLmZpbHRlcihiaW5kID0+IGJpbmQuZXZlbnQgPT09IGV2ZW50KVxuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGV2ZW50QmluZGluZ3MubGVuZ3RoOyBpKyspe1xuICAgICAgbGV0IGJpbmQgPSBldmVudEJpbmRpbmdzW2ldXG4gICAgICBiaW5kLmNhbGxiYWNrKGhhbmRsZWRQYXlsb2FkLCByZWYsIGpvaW5SZWYgfHwgdGhpcy5qb2luUmVmKCkpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICByZXBseUV2ZW50TmFtZShyZWYpeyByZXR1cm4gYGNoYW5fcmVwbHlfJHtyZWZ9YCB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBpc0Nsb3NlZCgpeyByZXR1cm4gdGhpcy5zdGF0ZSA9PT0gQ0hBTk5FTF9TVEFURVMuY2xvc2VkIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGlzRXJyb3JlZCgpeyByZXR1cm4gdGhpcy5zdGF0ZSA9PT0gQ0hBTk5FTF9TVEFURVMuZXJyb3JlZCB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBpc0pvaW5lZCgpeyByZXR1cm4gdGhpcy5zdGF0ZSA9PT0gQ0hBTk5FTF9TVEFURVMuam9pbmVkIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGlzSm9pbmluZygpeyByZXR1cm4gdGhpcy5zdGF0ZSA9PT0gQ0hBTk5FTF9TVEFURVMuam9pbmluZyB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBpc0xlYXZpbmcoKXsgcmV0dXJuIHRoaXMuc3RhdGUgPT09IENIQU5ORUxfU1RBVEVTLmxlYXZpbmcgfVxufVxuIiwgImltcG9ydCB7XG4gIGdsb2JhbCxcbiAgWEhSX1NUQVRFU1xufSBmcm9tIFwiLi9jb25zdGFudHNcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBamF4IHtcblxuICBzdGF0aWMgcmVxdWVzdChtZXRob2QsIGVuZFBvaW50LCBhY2NlcHQsIGJvZHksIHRpbWVvdXQsIG9udGltZW91dCwgY2FsbGJhY2spe1xuICAgIGlmKGdsb2JhbC5YRG9tYWluUmVxdWVzdCl7XG4gICAgICBsZXQgcmVxID0gbmV3IGdsb2JhbC5YRG9tYWluUmVxdWVzdCgpIC8vIElFOCwgSUU5XG4gICAgICByZXR1cm4gdGhpcy54ZG9tYWluUmVxdWVzdChyZXEsIG1ldGhvZCwgZW5kUG9pbnQsIGJvZHksIHRpbWVvdXQsIG9udGltZW91dCwgY2FsbGJhY2spXG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCByZXEgPSBuZXcgZ2xvYmFsLlhNTEh0dHBSZXF1ZXN0KCkgLy8gSUU3KywgRmlyZWZveCwgQ2hyb21lLCBPcGVyYSwgU2FmYXJpXG4gICAgICByZXR1cm4gdGhpcy54aHJSZXF1ZXN0KHJlcSwgbWV0aG9kLCBlbmRQb2ludCwgYWNjZXB0LCBib2R5LCB0aW1lb3V0LCBvbnRpbWVvdXQsIGNhbGxiYWNrKVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyB4ZG9tYWluUmVxdWVzdChyZXEsIG1ldGhvZCwgZW5kUG9pbnQsIGJvZHksIHRpbWVvdXQsIG9udGltZW91dCwgY2FsbGJhY2spe1xuICAgIHJlcS50aW1lb3V0ID0gdGltZW91dFxuICAgIHJlcS5vcGVuKG1ldGhvZCwgZW5kUG9pbnQpXG4gICAgcmVxLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgIGxldCByZXNwb25zZSA9IHRoaXMucGFyc2VKU09OKHJlcS5yZXNwb25zZVRleHQpXG4gICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhyZXNwb25zZSlcbiAgICB9XG4gICAgaWYob250aW1lb3V0KXsgcmVxLm9udGltZW91dCA9IG9udGltZW91dCB9XG5cbiAgICAvLyBXb3JrIGFyb3VuZCBidWcgaW4gSUU5IHRoYXQgcmVxdWlyZXMgYW4gYXR0YWNoZWQgb25wcm9ncmVzcyBoYW5kbGVyXG4gICAgcmVxLm9ucHJvZ3Jlc3MgPSAoKSA9PiB7IH1cblxuICAgIHJlcS5zZW5kKGJvZHkpXG4gICAgcmV0dXJuIHJlcVxuICB9XG5cbiAgc3RhdGljIHhoclJlcXVlc3QocmVxLCBtZXRob2QsIGVuZFBvaW50LCBhY2NlcHQsIGJvZHksIHRpbWVvdXQsIG9udGltZW91dCwgY2FsbGJhY2spe1xuICAgIHJlcS5vcGVuKG1ldGhvZCwgZW5kUG9pbnQsIHRydWUpXG4gICAgcmVxLnRpbWVvdXQgPSB0aW1lb3V0XG4gICAgcmVxLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgYWNjZXB0KVxuICAgIHJlcS5vbmVycm9yID0gKCkgPT4gY2FsbGJhY2sgJiYgY2FsbGJhY2sobnVsbClcbiAgICByZXEub25yZWFkeXN0YXRlY2hhbmdlID0gKCkgPT4ge1xuICAgICAgaWYocmVxLnJlYWR5U3RhdGUgPT09IFhIUl9TVEFURVMuY29tcGxldGUgJiYgY2FsbGJhY2spe1xuICAgICAgICBsZXQgcmVzcG9uc2UgPSB0aGlzLnBhcnNlSlNPTihyZXEucmVzcG9uc2VUZXh0KVxuICAgICAgICBjYWxsYmFjayhyZXNwb25zZSlcbiAgICAgIH1cbiAgICB9XG4gICAgaWYob250aW1lb3V0KXsgcmVxLm9udGltZW91dCA9IG9udGltZW91dCB9XG5cbiAgICByZXEuc2VuZChib2R5KVxuICAgIHJldHVybiByZXFcbiAgfVxuXG4gIHN0YXRpYyBwYXJzZUpTT04ocmVzcCl7XG4gICAgaWYoIXJlc3AgfHwgcmVzcCA9PT0gXCJcIil7IHJldHVybiBudWxsIH1cblxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gSlNPTi5wYXJzZShyZXNwKVxuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgY29uc29sZSAmJiBjb25zb2xlLmxvZyhcImZhaWxlZCB0byBwYXJzZSBKU09OIHJlc3BvbnNlXCIsIHJlc3ApXG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBzZXJpYWxpemUob2JqLCBwYXJlbnRLZXkpe1xuICAgIGxldCBxdWVyeVN0ciA9IFtdXG4gICAgZm9yKHZhciBrZXkgaW4gb2JqKXtcbiAgICAgIGlmKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKXsgY29udGludWUgfVxuICAgICAgbGV0IHBhcmFtS2V5ID0gcGFyZW50S2V5ID8gYCR7cGFyZW50S2V5fVske2tleX1dYCA6IGtleVxuICAgICAgbGV0IHBhcmFtVmFsID0gb2JqW2tleV1cbiAgICAgIGlmKHR5cGVvZiBwYXJhbVZhbCA9PT0gXCJvYmplY3RcIil7XG4gICAgICAgIHF1ZXJ5U3RyLnB1c2godGhpcy5zZXJpYWxpemUocGFyYW1WYWwsIHBhcmFtS2V5KSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXJ5U3RyLnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KHBhcmFtS2V5KSArIFwiPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KHBhcmFtVmFsKSlcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHF1ZXJ5U3RyLmpvaW4oXCImXCIpXG4gIH1cblxuICBzdGF0aWMgYXBwZW5kUGFyYW1zKHVybCwgcGFyYW1zKXtcbiAgICBpZihPYmplY3Qua2V5cyhwYXJhbXMpLmxlbmd0aCA9PT0gMCl7IHJldHVybiB1cmwgfVxuXG4gICAgbGV0IHByZWZpeCA9IHVybC5tYXRjaCgvXFw/LykgPyBcIiZcIiA6IFwiP1wiXG4gICAgcmV0dXJuIGAke3VybH0ke3ByZWZpeH0ke3RoaXMuc2VyaWFsaXplKHBhcmFtcyl9YFxuICB9XG59XG4iLCAiaW1wb3J0IHtcbiAgU09DS0VUX1NUQVRFUyxcbiAgVFJBTlNQT1JUU1xufSBmcm9tIFwiLi9jb25zdGFudHNcIlxuXG5pbXBvcnQgQWpheCBmcm9tIFwiLi9hamF4XCJcblxubGV0IGFycmF5QnVmZmVyVG9CYXNlNjQgPSAoYnVmZmVyKSA9PiB7XG4gIGxldCBiaW5hcnkgPSBcIlwiXG4gIGxldCBieXRlcyA9IG5ldyBVaW50OEFycmF5KGJ1ZmZlcilcbiAgbGV0IGxlbiA9IGJ5dGVzLmJ5dGVMZW5ndGhcbiAgZm9yKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKXsgYmluYXJ5ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnl0ZXNbaV0pIH1cbiAgcmV0dXJuIGJ0b2EoYmluYXJ5KVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb25nUG9sbCB7XG5cbiAgY29uc3RydWN0b3IoZW5kUG9pbnQpe1xuICAgIHRoaXMuZW5kUG9pbnQgPSBudWxsXG4gICAgdGhpcy50b2tlbiA9IG51bGxcbiAgICB0aGlzLnNraXBIZWFydGJlYXQgPSB0cnVlXG4gICAgdGhpcy5yZXFzID0gbmV3IFNldCgpXG4gICAgdGhpcy5hd2FpdGluZ0JhdGNoQWNrID0gZmFsc2VcbiAgICB0aGlzLmN1cnJlbnRCYXRjaCA9IG51bGxcbiAgICB0aGlzLmN1cnJlbnRCYXRjaFRpbWVyID0gbnVsbFxuICAgIHRoaXMuYmF0Y2hCdWZmZXIgPSBbXVxuICAgIHRoaXMub25vcGVuID0gZnVuY3Rpb24gKCl7IH0gLy8gbm9vcFxuICAgIHRoaXMub25lcnJvciA9IGZ1bmN0aW9uICgpeyB9IC8vIG5vb3BcbiAgICB0aGlzLm9ubWVzc2FnZSA9IGZ1bmN0aW9uICgpeyB9IC8vIG5vb3BcbiAgICB0aGlzLm9uY2xvc2UgPSBmdW5jdGlvbiAoKXsgfSAvLyBub29wXG4gICAgdGhpcy5wb2xsRW5kcG9pbnQgPSB0aGlzLm5vcm1hbGl6ZUVuZHBvaW50KGVuZFBvaW50KVxuICAgIHRoaXMucmVhZHlTdGF0ZSA9IFNPQ0tFVF9TVEFURVMuY29ubmVjdGluZ1xuICAgIHRoaXMucG9sbCgpXG4gIH1cblxuICBub3JtYWxpemVFbmRwb2ludChlbmRQb2ludCl7XG4gICAgcmV0dXJuIChlbmRQb2ludFxuICAgICAgLnJlcGxhY2UoXCJ3czovL1wiLCBcImh0dHA6Ly9cIilcbiAgICAgIC5yZXBsYWNlKFwid3NzOi8vXCIsIFwiaHR0cHM6Ly9cIilcbiAgICAgIC5yZXBsYWNlKG5ldyBSZWdFeHAoXCIoLiopXFwvXCIgKyBUUkFOU1BPUlRTLndlYnNvY2tldCksIFwiJDEvXCIgKyBUUkFOU1BPUlRTLmxvbmdwb2xsKSlcbiAgfVxuXG4gIGVuZHBvaW50VVJMKCl7XG4gICAgcmV0dXJuIEFqYXguYXBwZW5kUGFyYW1zKHRoaXMucG9sbEVuZHBvaW50LCB7dG9rZW46IHRoaXMudG9rZW59KVxuICB9XG5cbiAgY2xvc2VBbmRSZXRyeShjb2RlLCByZWFzb24sIHdhc0NsZWFuKXtcbiAgICB0aGlzLmNsb3NlKGNvZGUsIHJlYXNvbiwgd2FzQ2xlYW4pXG4gICAgdGhpcy5yZWFkeVN0YXRlID0gU09DS0VUX1NUQVRFUy5jb25uZWN0aW5nXG4gIH1cblxuICBvbnRpbWVvdXQoKXtcbiAgICB0aGlzLm9uZXJyb3IoXCJ0aW1lb3V0XCIpXG4gICAgdGhpcy5jbG9zZUFuZFJldHJ5KDEwMDUsIFwidGltZW91dFwiLCBmYWxzZSlcbiAgfVxuXG4gIGlzQWN0aXZlKCl7IHJldHVybiB0aGlzLnJlYWR5U3RhdGUgPT09IFNPQ0tFVF9TVEFURVMub3BlbiB8fCB0aGlzLnJlYWR5U3RhdGUgPT09IFNPQ0tFVF9TVEFURVMuY29ubmVjdGluZyB9XG5cbiAgcG9sbCgpe1xuICAgIHRoaXMuYWpheChcIkdFVFwiLCBcImFwcGxpY2F0aW9uL2pzb25cIiwgbnVsbCwgKCkgPT4gdGhpcy5vbnRpbWVvdXQoKSwgcmVzcCA9PiB7XG4gICAgICBpZihyZXNwKXtcbiAgICAgICAgdmFyIHtzdGF0dXMsIHRva2VuLCBtZXNzYWdlc30gPSByZXNwXG4gICAgICAgIHRoaXMudG9rZW4gPSB0b2tlblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RhdHVzID0gMFxuICAgICAgfVxuXG4gICAgICBzd2l0Y2goc3RhdHVzKXtcbiAgICAgICAgY2FzZSAyMDA6XG4gICAgICAgICAgbWVzc2FnZXMuZm9yRWFjaChtc2cgPT4ge1xuICAgICAgICAgICAgLy8gVGFza3MgYXJlIHdoYXQgdGhpbmdzIGxpa2UgZXZlbnQgaGFuZGxlcnMsIHNldFRpbWVvdXQgY2FsbGJhY2tzLFxuICAgICAgICAgICAgLy8gcHJvbWlzZSByZXNvbHZlcyBhbmQgbW9yZSBhcmUgcnVuIHdpdGhpbi5cbiAgICAgICAgICAgIC8vIEluIG1vZGVybiBicm93c2VycywgdGhlcmUgYXJlIHR3byBkaWZmZXJlbnQga2luZHMgb2YgdGFza3MsXG4gICAgICAgICAgICAvLyBtaWNyb3Rhc2tzIGFuZCBtYWNyb3Rhc2tzLlxuICAgICAgICAgICAgLy8gTWljcm90YXNrcyBhcmUgbWFpbmx5IHVzZWQgZm9yIFByb21pc2VzLCB3aGlsZSBtYWNyb3Rhc2tzIGFyZVxuICAgICAgICAgICAgLy8gdXNlZCBmb3IgZXZlcnl0aGluZyBlbHNlLlxuICAgICAgICAgICAgLy8gTWljcm90YXNrcyBhbHdheXMgaGF2ZSBwcmlvcml0eSBvdmVyIG1hY3JvdGFza3MuIElmIHRoZSBKUyBlbmdpbmVcbiAgICAgICAgICAgIC8vIGlzIGxvb2tpbmcgZm9yIGEgdGFzayB0byBydW4sIGl0IHdpbGwgYWx3YXlzIHRyeSB0byBlbXB0eSB0aGVcbiAgICAgICAgICAgIC8vIG1pY3JvdGFzayBxdWV1ZSBiZWZvcmUgYXR0ZW1wdGluZyB0byBydW4gYW55dGhpbmcgZnJvbSB0aGVcbiAgICAgICAgICAgIC8vIG1hY3JvdGFzayBxdWV1ZS5cbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyBGb3IgdGhlIFdlYlNvY2tldCB0cmFuc3BvcnQsIG1lc3NhZ2VzIGFsd2F5cyBhcnJpdmUgaW4gdGhlaXIgb3duXG4gICAgICAgICAgICAvLyBldmVudC4gVGhpcyBtZWFucyB0aGF0IGlmIGFueSBwcm9taXNlcyBhcmUgcmVzb2x2ZWQgZnJvbSB3aXRoaW4sXG4gICAgICAgICAgICAvLyB0aGVpciBjYWxsYmFja3Mgd2lsbCBhbHdheXMgZmluaXNoIGV4ZWN1dGlvbiBieSB0aGUgdGltZSB0aGVcbiAgICAgICAgICAgIC8vIG5leHQgbWVzc2FnZSBldmVudCBoYW5kbGVyIGlzIHJ1bi5cbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyBJbiBvcmRlciB0byBlbXVsYXRlIHRoaXMgYmVoYXZpb3VyLCB3ZSBuZWVkIHRvIG1ha2Ugc3VyZSBlYWNoXG4gICAgICAgICAgICAvLyBvbm1lc3NhZ2UgaGFuZGxlciBpcyBydW4gd2l0aGluIGl0cyBvd24gbWFjcm90YXNrLlxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLm9ubWVzc2FnZSh7ZGF0YTogbXNnfSksIDApXG4gICAgICAgICAgfSlcbiAgICAgICAgICB0aGlzLnBvbGwoKVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgMjA0OlxuICAgICAgICAgIHRoaXMucG9sbCgpXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSA0MTA6XG4gICAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gU09DS0VUX1NUQVRFUy5vcGVuXG4gICAgICAgICAgdGhpcy5vbm9wZW4oe30pXG4gICAgICAgICAgdGhpcy5wb2xsKClcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDQwMzpcbiAgICAgICAgICB0aGlzLm9uZXJyb3IoNDAzKVxuICAgICAgICAgIHRoaXMuY2xvc2UoMTAwOCwgXCJmb3JiaWRkZW5cIiwgZmFsc2UpXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICBjYXNlIDUwMDpcbiAgICAgICAgICB0aGlzLm9uZXJyb3IoNTAwKVxuICAgICAgICAgIHRoaXMuY2xvc2VBbmRSZXRyeSgxMDExLCBcImludGVybmFsIHNlcnZlciBlcnJvclwiLCA1MDApXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgZGVmYXVsdDogdGhyb3cgbmV3IEVycm9yKGB1bmhhbmRsZWQgcG9sbCBzdGF0dXMgJHtzdGF0dXN9YClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgLy8gd2UgY29sbGVjdCBhbGwgcHVzaGVzIHdpdGhpbiB0aGUgY3VycmVudCBldmVudCBsb29wIGJ5XG4gIC8vIHNldFRpbWVvdXQgMCwgd2hpY2ggb3B0aW1pemVzIGJhY2stdG8tYmFjayBwcm9jZWR1cmFsXG4gIC8vIHB1c2hlcyBhZ2FpbnN0IGFuIGVtcHR5IGJ1ZmZlclxuXG4gIHNlbmQoYm9keSl7XG4gICAgaWYodHlwZW9mKGJvZHkpICE9PSBcInN0cmluZ1wiKXsgYm9keSA9IGFycmF5QnVmZmVyVG9CYXNlNjQoYm9keSkgfVxuICAgIGlmKHRoaXMuY3VycmVudEJhdGNoKXtcbiAgICAgIHRoaXMuY3VycmVudEJhdGNoLnB1c2goYm9keSlcbiAgICB9IGVsc2UgaWYodGhpcy5hd2FpdGluZ0JhdGNoQWNrKXtcbiAgICAgIHRoaXMuYmF0Y2hCdWZmZXIucHVzaChib2R5KVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmN1cnJlbnRCYXRjaCA9IFtib2R5XVxuICAgICAgdGhpcy5jdXJyZW50QmF0Y2hUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmJhdGNoU2VuZCh0aGlzLmN1cnJlbnRCYXRjaClcbiAgICAgICAgdGhpcy5jdXJyZW50QmF0Y2ggPSBudWxsXG4gICAgICB9LCAwKVxuICAgIH1cbiAgfVxuXG4gIGJhdGNoU2VuZChtZXNzYWdlcyl7XG4gICAgdGhpcy5hd2FpdGluZ0JhdGNoQWNrID0gdHJ1ZVxuICAgIHRoaXMuYWpheChcIlBPU1RcIiwgXCJhcHBsaWNhdGlvbi94LW5kanNvblwiLCBtZXNzYWdlcy5qb2luKFwiXFxuXCIpLCAoKSA9PiB0aGlzLm9uZXJyb3IoXCJ0aW1lb3V0XCIpLCByZXNwID0+IHtcbiAgICAgIHRoaXMuYXdhaXRpbmdCYXRjaEFjayA9IGZhbHNlXG4gICAgICBpZighcmVzcCB8fCByZXNwLnN0YXR1cyAhPT0gMjAwKXtcbiAgICAgICAgdGhpcy5vbmVycm9yKHJlc3AgJiYgcmVzcC5zdGF0dXMpXG4gICAgICAgIHRoaXMuY2xvc2VBbmRSZXRyeSgxMDExLCBcImludGVybmFsIHNlcnZlciBlcnJvclwiLCBmYWxzZSlcbiAgICAgIH0gZWxzZSBpZih0aGlzLmJhdGNoQnVmZmVyLmxlbmd0aCA+IDApe1xuICAgICAgICB0aGlzLmJhdGNoU2VuZCh0aGlzLmJhdGNoQnVmZmVyKVxuICAgICAgICB0aGlzLmJhdGNoQnVmZmVyID0gW11cbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgY2xvc2UoY29kZSwgcmVhc29uLCB3YXNDbGVhbil7XG4gICAgZm9yKGxldCByZXEgb2YgdGhpcy5yZXFzKXsgcmVxLmFib3J0KCkgfVxuICAgIHRoaXMucmVhZHlTdGF0ZSA9IFNPQ0tFVF9TVEFURVMuY2xvc2VkXG4gICAgbGV0IG9wdHMgPSBPYmplY3QuYXNzaWduKHtjb2RlOiAxMDAwLCByZWFzb246IHVuZGVmaW5lZCwgd2FzQ2xlYW46IHRydWV9LCB7Y29kZSwgcmVhc29uLCB3YXNDbGVhbn0pXG4gICAgdGhpcy5iYXRjaEJ1ZmZlciA9IFtdXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuY3VycmVudEJhdGNoVGltZXIpXG4gICAgdGhpcy5jdXJyZW50QmF0Y2hUaW1lciA9IG51bGxcbiAgICBpZih0eXBlb2YoQ2xvc2VFdmVudCkgIT09IFwidW5kZWZpbmVkXCIpe1xuICAgICAgdGhpcy5vbmNsb3NlKG5ldyBDbG9zZUV2ZW50KFwiY2xvc2VcIiwgb3B0cykpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub25jbG9zZShvcHRzKVxuICAgIH1cbiAgfVxuXG4gIGFqYXgobWV0aG9kLCBjb250ZW50VHlwZSwgYm9keSwgb25DYWxsZXJUaW1lb3V0LCBjYWxsYmFjayl7XG4gICAgbGV0IHJlcVxuICAgIGxldCBvbnRpbWVvdXQgPSAoKSA9PiB7XG4gICAgICB0aGlzLnJlcXMuZGVsZXRlKHJlcSlcbiAgICAgIG9uQ2FsbGVyVGltZW91dCgpXG4gICAgfVxuICAgIHJlcSA9IEFqYXgucmVxdWVzdChtZXRob2QsIHRoaXMuZW5kcG9pbnRVUkwoKSwgY29udGVudFR5cGUsIGJvZHksIHRoaXMudGltZW91dCwgb250aW1lb3V0LCByZXNwID0+IHtcbiAgICAgIHRoaXMucmVxcy5kZWxldGUocmVxKVxuICAgICAgaWYodGhpcy5pc0FjdGl2ZSgpKXsgY2FsbGJhY2socmVzcCkgfVxuICAgIH0pXG4gICAgdGhpcy5yZXFzLmFkZChyZXEpXG4gIH1cbn1cbiIsICIvKipcbiAqIEluaXRpYWxpemVzIHRoZSBQcmVzZW5jZVxuICogQHBhcmFtIHtDaGFubmVsfSBjaGFubmVsIC0gVGhlIENoYW5uZWxcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzIC0gVGhlIG9wdGlvbnMsXG4gKiAgICAgICAgZm9yIGV4YW1wbGUgYHtldmVudHM6IHtzdGF0ZTogXCJzdGF0ZVwiLCBkaWZmOiBcImRpZmZcIn19YFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcmVzZW5jZSB7XG5cbiAgY29uc3RydWN0b3IoY2hhbm5lbCwgb3B0cyA9IHt9KXtcbiAgICBsZXQgZXZlbnRzID0gb3B0cy5ldmVudHMgfHwge3N0YXRlOiBcInByZXNlbmNlX3N0YXRlXCIsIGRpZmY6IFwicHJlc2VuY2VfZGlmZlwifVxuICAgIHRoaXMuc3RhdGUgPSB7fVxuICAgIHRoaXMucGVuZGluZ0RpZmZzID0gW11cbiAgICB0aGlzLmNoYW5uZWwgPSBjaGFubmVsXG4gICAgdGhpcy5qb2luUmVmID0gbnVsbFxuICAgIHRoaXMuY2FsbGVyID0ge1xuICAgICAgb25Kb2luOiBmdW5jdGlvbiAoKXsgfSxcbiAgICAgIG9uTGVhdmU6IGZ1bmN0aW9uICgpeyB9LFxuICAgICAgb25TeW5jOiBmdW5jdGlvbiAoKXsgfVxuICAgIH1cblxuICAgIHRoaXMuY2hhbm5lbC5vbihldmVudHMuc3RhdGUsIG5ld1N0YXRlID0+IHtcbiAgICAgIGxldCB7b25Kb2luLCBvbkxlYXZlLCBvblN5bmN9ID0gdGhpcy5jYWxsZXJcblxuICAgICAgdGhpcy5qb2luUmVmID0gdGhpcy5jaGFubmVsLmpvaW5SZWYoKVxuICAgICAgdGhpcy5zdGF0ZSA9IFByZXNlbmNlLnN5bmNTdGF0ZSh0aGlzLnN0YXRlLCBuZXdTdGF0ZSwgb25Kb2luLCBvbkxlYXZlKVxuXG4gICAgICB0aGlzLnBlbmRpbmdEaWZmcy5mb3JFYWNoKGRpZmYgPT4ge1xuICAgICAgICB0aGlzLnN0YXRlID0gUHJlc2VuY2Uuc3luY0RpZmYodGhpcy5zdGF0ZSwgZGlmZiwgb25Kb2luLCBvbkxlYXZlKVxuICAgICAgfSlcbiAgICAgIHRoaXMucGVuZGluZ0RpZmZzID0gW11cbiAgICAgIG9uU3luYygpXG4gICAgfSlcblxuICAgIHRoaXMuY2hhbm5lbC5vbihldmVudHMuZGlmZiwgZGlmZiA9PiB7XG4gICAgICBsZXQge29uSm9pbiwgb25MZWF2ZSwgb25TeW5jfSA9IHRoaXMuY2FsbGVyXG5cbiAgICAgIGlmKHRoaXMuaW5QZW5kaW5nU3luY1N0YXRlKCkpe1xuICAgICAgICB0aGlzLnBlbmRpbmdEaWZmcy5wdXNoKGRpZmYpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnN0YXRlID0gUHJlc2VuY2Uuc3luY0RpZmYodGhpcy5zdGF0ZSwgZGlmZiwgb25Kb2luLCBvbkxlYXZlKVxuICAgICAgICBvblN5bmMoKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBvbkpvaW4oY2FsbGJhY2speyB0aGlzLmNhbGxlci5vbkpvaW4gPSBjYWxsYmFjayB9XG5cbiAgb25MZWF2ZShjYWxsYmFjayl7IHRoaXMuY2FsbGVyLm9uTGVhdmUgPSBjYWxsYmFjayB9XG5cbiAgb25TeW5jKGNhbGxiYWNrKXsgdGhpcy5jYWxsZXIub25TeW5jID0gY2FsbGJhY2sgfVxuXG4gIGxpc3QoYnkpeyByZXR1cm4gUHJlc2VuY2UubGlzdCh0aGlzLnN0YXRlLCBieSkgfVxuXG4gIGluUGVuZGluZ1N5bmNTdGF0ZSgpe1xuICAgIHJldHVybiAhdGhpcy5qb2luUmVmIHx8ICh0aGlzLmpvaW5SZWYgIT09IHRoaXMuY2hhbm5lbC5qb2luUmVmKCkpXG4gIH1cblxuICAvLyBsb3dlci1sZXZlbCBwdWJsaWMgc3RhdGljIEFQSVxuXG4gIC8qKlxuICAgKiBVc2VkIHRvIHN5bmMgdGhlIGxpc3Qgb2YgcHJlc2VuY2VzIG9uIHRoZSBzZXJ2ZXJcbiAgICogd2l0aCB0aGUgY2xpZW50J3Mgc3RhdGUuIEFuIG9wdGlvbmFsIGBvbkpvaW5gIGFuZCBgb25MZWF2ZWAgY2FsbGJhY2sgY2FuXG4gICAqIGJlIHByb3ZpZGVkIHRvIHJlYWN0IHRvIGNoYW5nZXMgaW4gdGhlIGNsaWVudCdzIGxvY2FsIHByZXNlbmNlcyBhY3Jvc3NcbiAgICogZGlzY29ubmVjdHMgYW5kIHJlY29ubmVjdHMgd2l0aCB0aGUgc2VydmVyLlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJlc2VuY2V9XG4gICAqL1xuICBzdGF0aWMgc3luY1N0YXRlKGN1cnJlbnRTdGF0ZSwgbmV3U3RhdGUsIG9uSm9pbiwgb25MZWF2ZSl7XG4gICAgbGV0IHN0YXRlID0gdGhpcy5jbG9uZShjdXJyZW50U3RhdGUpXG4gICAgbGV0IGpvaW5zID0ge31cbiAgICBsZXQgbGVhdmVzID0ge31cblxuICAgIHRoaXMubWFwKHN0YXRlLCAoa2V5LCBwcmVzZW5jZSkgPT4ge1xuICAgICAgaWYoIW5ld1N0YXRlW2tleV0pe1xuICAgICAgICBsZWF2ZXNba2V5XSA9IHByZXNlbmNlXG4gICAgICB9XG4gICAgfSlcbiAgICB0aGlzLm1hcChuZXdTdGF0ZSwgKGtleSwgbmV3UHJlc2VuY2UpID0+IHtcbiAgICAgIGxldCBjdXJyZW50UHJlc2VuY2UgPSBzdGF0ZVtrZXldXG4gICAgICBpZihjdXJyZW50UHJlc2VuY2Upe1xuICAgICAgICBsZXQgbmV3UmVmcyA9IG5ld1ByZXNlbmNlLm1ldGFzLm1hcChtID0+IG0ucGh4X3JlZilcbiAgICAgICAgbGV0IGN1clJlZnMgPSBjdXJyZW50UHJlc2VuY2UubWV0YXMubWFwKG0gPT4gbS5waHhfcmVmKVxuICAgICAgICBsZXQgam9pbmVkTWV0YXMgPSBuZXdQcmVzZW5jZS5tZXRhcy5maWx0ZXIobSA9PiBjdXJSZWZzLmluZGV4T2YobS5waHhfcmVmKSA8IDApXG4gICAgICAgIGxldCBsZWZ0TWV0YXMgPSBjdXJyZW50UHJlc2VuY2UubWV0YXMuZmlsdGVyKG0gPT4gbmV3UmVmcy5pbmRleE9mKG0ucGh4X3JlZikgPCAwKVxuICAgICAgICBpZihqb2luZWRNZXRhcy5sZW5ndGggPiAwKXtcbiAgICAgICAgICBqb2luc1trZXldID0gbmV3UHJlc2VuY2VcbiAgICAgICAgICBqb2luc1trZXldLm1ldGFzID0gam9pbmVkTWV0YXNcbiAgICAgICAgfVxuICAgICAgICBpZihsZWZ0TWV0YXMubGVuZ3RoID4gMCl7XG4gICAgICAgICAgbGVhdmVzW2tleV0gPSB0aGlzLmNsb25lKGN1cnJlbnRQcmVzZW5jZSlcbiAgICAgICAgICBsZWF2ZXNba2V5XS5tZXRhcyA9IGxlZnRNZXRhc1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBqb2luc1trZXldID0gbmV3UHJlc2VuY2VcbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiB0aGlzLnN5bmNEaWZmKHN0YXRlLCB7am9pbnM6IGpvaW5zLCBsZWF2ZXM6IGxlYXZlc30sIG9uSm9pbiwgb25MZWF2ZSlcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBVc2VkIHRvIHN5bmMgYSBkaWZmIG9mIHByZXNlbmNlIGpvaW4gYW5kIGxlYXZlXG4gICAqIGV2ZW50cyBmcm9tIHRoZSBzZXJ2ZXIsIGFzIHRoZXkgaGFwcGVuLiBMaWtlIGBzeW5jU3RhdGVgLCBgc3luY0RpZmZgXG4gICAqIGFjY2VwdHMgb3B0aW9uYWwgYG9uSm9pbmAgYW5kIGBvbkxlYXZlYCBjYWxsYmFja3MgdG8gcmVhY3QgdG8gYSB1c2VyXG4gICAqIGpvaW5pbmcgb3IgbGVhdmluZyBmcm9tIGEgZGV2aWNlLlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJlc2VuY2V9XG4gICAqL1xuICBzdGF0aWMgc3luY0RpZmYoc3RhdGUsIGRpZmYsIG9uSm9pbiwgb25MZWF2ZSl7XG4gICAgbGV0IHtqb2lucywgbGVhdmVzfSA9IHRoaXMuY2xvbmUoZGlmZilcbiAgICBpZighb25Kb2luKXsgb25Kb2luID0gZnVuY3Rpb24gKCl7IH0gfVxuICAgIGlmKCFvbkxlYXZlKXsgb25MZWF2ZSA9IGZ1bmN0aW9uICgpeyB9IH1cblxuICAgIHRoaXMubWFwKGpvaW5zLCAoa2V5LCBuZXdQcmVzZW5jZSkgPT4ge1xuICAgICAgbGV0IGN1cnJlbnRQcmVzZW5jZSA9IHN0YXRlW2tleV1cbiAgICAgIHN0YXRlW2tleV0gPSB0aGlzLmNsb25lKG5ld1ByZXNlbmNlKVxuICAgICAgaWYoY3VycmVudFByZXNlbmNlKXtcbiAgICAgICAgbGV0IGpvaW5lZFJlZnMgPSBzdGF0ZVtrZXldLm1ldGFzLm1hcChtID0+IG0ucGh4X3JlZilcbiAgICAgICAgbGV0IGN1ck1ldGFzID0gY3VycmVudFByZXNlbmNlLm1ldGFzLmZpbHRlcihtID0+IGpvaW5lZFJlZnMuaW5kZXhPZihtLnBoeF9yZWYpIDwgMClcbiAgICAgICAgc3RhdGVba2V5XS5tZXRhcy51bnNoaWZ0KC4uLmN1ck1ldGFzKVxuICAgICAgfVxuICAgICAgb25Kb2luKGtleSwgY3VycmVudFByZXNlbmNlLCBuZXdQcmVzZW5jZSlcbiAgICB9KVxuICAgIHRoaXMubWFwKGxlYXZlcywgKGtleSwgbGVmdFByZXNlbmNlKSA9PiB7XG4gICAgICBsZXQgY3VycmVudFByZXNlbmNlID0gc3RhdGVba2V5XVxuICAgICAgaWYoIWN1cnJlbnRQcmVzZW5jZSl7IHJldHVybiB9XG4gICAgICBsZXQgcmVmc1RvUmVtb3ZlID0gbGVmdFByZXNlbmNlLm1ldGFzLm1hcChtID0+IG0ucGh4X3JlZilcbiAgICAgIGN1cnJlbnRQcmVzZW5jZS5tZXRhcyA9IGN1cnJlbnRQcmVzZW5jZS5tZXRhcy5maWx0ZXIocCA9PiB7XG4gICAgICAgIHJldHVybiByZWZzVG9SZW1vdmUuaW5kZXhPZihwLnBoeF9yZWYpIDwgMFxuICAgICAgfSlcbiAgICAgIG9uTGVhdmUoa2V5LCBjdXJyZW50UHJlc2VuY2UsIGxlZnRQcmVzZW5jZSlcbiAgICAgIGlmKGN1cnJlbnRQcmVzZW5jZS5tZXRhcy5sZW5ndGggPT09IDApe1xuICAgICAgICBkZWxldGUgc3RhdGVba2V5XVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIHN0YXRlXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJlc2VuY2VzLCB3aXRoIHNlbGVjdGVkIG1ldGFkYXRhLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJlc2VuY2VzXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNob29zZXJcbiAgICpcbiAgICogQHJldHVybnMge1ByZXNlbmNlfVxuICAgKi9cbiAgc3RhdGljIGxpc3QocHJlc2VuY2VzLCBjaG9vc2VyKXtcbiAgICBpZighY2hvb3Nlcil7IGNob29zZXIgPSBmdW5jdGlvbiAoa2V5LCBwcmVzKXsgcmV0dXJuIHByZXMgfSB9XG5cbiAgICByZXR1cm4gdGhpcy5tYXAocHJlc2VuY2VzLCAoa2V5LCBwcmVzZW5jZSkgPT4ge1xuICAgICAgcmV0dXJuIGNob29zZXIoa2V5LCBwcmVzZW5jZSlcbiAgICB9KVxuICB9XG5cbiAgLy8gcHJpdmF0ZVxuXG4gIHN0YXRpYyBtYXAob2JqLCBmdW5jKXtcbiAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqKS5tYXAoa2V5ID0+IGZ1bmMoa2V5LCBvYmpba2V5XSkpXG4gIH1cblxuICBzdGF0aWMgY2xvbmUob2JqKXsgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2JqKSkgfVxufVxuIiwgIi8qIFRoZSBkZWZhdWx0IHNlcmlhbGl6ZXIgZm9yIGVuY29kaW5nIGFuZCBkZWNvZGluZyBtZXNzYWdlcyAqL1xuaW1wb3J0IHtcbiAgQ0hBTk5FTF9FVkVOVFNcbn0gZnJvbSBcIi4vY29uc3RhbnRzXCJcblxuZXhwb3J0IGRlZmF1bHQge1xuICBIRUFERVJfTEVOR1RIOiAxLFxuICBNRVRBX0xFTkdUSDogNCxcbiAgS0lORFM6IHtwdXNoOiAwLCByZXBseTogMSwgYnJvYWRjYXN0OiAyfSxcblxuICBlbmNvZGUobXNnLCBjYWxsYmFjayl7XG4gICAgaWYobXNnLnBheWxvYWQuY29uc3RydWN0b3IgPT09IEFycmF5QnVmZmVyKXtcbiAgICAgIHJldHVybiBjYWxsYmFjayh0aGlzLmJpbmFyeUVuY29kZShtc2cpKVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgcGF5bG9hZCA9IFttc2cuam9pbl9yZWYsIG1zZy5yZWYsIG1zZy50b3BpYywgbXNnLmV2ZW50LCBtc2cucGF5bG9hZF1cbiAgICAgIHJldHVybiBjYWxsYmFjayhKU09OLnN0cmluZ2lmeShwYXlsb2FkKSlcbiAgICB9XG4gIH0sXG5cbiAgZGVjb2RlKHJhd1BheWxvYWQsIGNhbGxiYWNrKXtcbiAgICBpZihyYXdQYXlsb2FkLmNvbnN0cnVjdG9yID09PSBBcnJheUJ1ZmZlcil7XG4gICAgICByZXR1cm4gY2FsbGJhY2sodGhpcy5iaW5hcnlEZWNvZGUocmF3UGF5bG9hZCkpXG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBbam9pbl9yZWYsIHJlZiwgdG9waWMsIGV2ZW50LCBwYXlsb2FkXSA9IEpTT04ucGFyc2UocmF3UGF5bG9hZClcbiAgICAgIHJldHVybiBjYWxsYmFjayh7am9pbl9yZWYsIHJlZiwgdG9waWMsIGV2ZW50LCBwYXlsb2FkfSlcbiAgICB9XG4gIH0sXG5cbiAgLy8gcHJpdmF0ZVxuXG4gIGJpbmFyeUVuY29kZShtZXNzYWdlKXtcbiAgICBsZXQge2pvaW5fcmVmLCByZWYsIGV2ZW50LCB0b3BpYywgcGF5bG9hZH0gPSBtZXNzYWdlXG4gICAgbGV0IG1ldGFMZW5ndGggPSB0aGlzLk1FVEFfTEVOR1RIICsgam9pbl9yZWYubGVuZ3RoICsgcmVmLmxlbmd0aCArIHRvcGljLmxlbmd0aCArIGV2ZW50Lmxlbmd0aFxuICAgIGxldCBoZWFkZXIgPSBuZXcgQXJyYXlCdWZmZXIodGhpcy5IRUFERVJfTEVOR1RIICsgbWV0YUxlbmd0aClcbiAgICBsZXQgdmlldyA9IG5ldyBEYXRhVmlldyhoZWFkZXIpXG4gICAgbGV0IG9mZnNldCA9IDBcblxuICAgIHZpZXcuc2V0VWludDgob2Zmc2V0KyssIHRoaXMuS0lORFMucHVzaCkgLy8ga2luZFxuICAgIHZpZXcuc2V0VWludDgob2Zmc2V0KyssIGpvaW5fcmVmLmxlbmd0aClcbiAgICB2aWV3LnNldFVpbnQ4KG9mZnNldCsrLCByZWYubGVuZ3RoKVxuICAgIHZpZXcuc2V0VWludDgob2Zmc2V0KyssIHRvcGljLmxlbmd0aClcbiAgICB2aWV3LnNldFVpbnQ4KG9mZnNldCsrLCBldmVudC5sZW5ndGgpXG4gICAgQXJyYXkuZnJvbShqb2luX3JlZiwgY2hhciA9PiB2aWV3LnNldFVpbnQ4KG9mZnNldCsrLCBjaGFyLmNoYXJDb2RlQXQoMCkpKVxuICAgIEFycmF5LmZyb20ocmVmLCBjaGFyID0+IHZpZXcuc2V0VWludDgob2Zmc2V0KyssIGNoYXIuY2hhckNvZGVBdCgwKSkpXG4gICAgQXJyYXkuZnJvbSh0b3BpYywgY2hhciA9PiB2aWV3LnNldFVpbnQ4KG9mZnNldCsrLCBjaGFyLmNoYXJDb2RlQXQoMCkpKVxuICAgIEFycmF5LmZyb20oZXZlbnQsIGNoYXIgPT4gdmlldy5zZXRVaW50OChvZmZzZXQrKywgY2hhci5jaGFyQ29kZUF0KDApKSlcblxuICAgIHZhciBjb21iaW5lZCA9IG5ldyBVaW50OEFycmF5KGhlYWRlci5ieXRlTGVuZ3RoICsgcGF5bG9hZC5ieXRlTGVuZ3RoKVxuICAgIGNvbWJpbmVkLnNldChuZXcgVWludDhBcnJheShoZWFkZXIpLCAwKVxuICAgIGNvbWJpbmVkLnNldChuZXcgVWludDhBcnJheShwYXlsb2FkKSwgaGVhZGVyLmJ5dGVMZW5ndGgpXG5cbiAgICByZXR1cm4gY29tYmluZWQuYnVmZmVyXG4gIH0sXG5cbiAgYmluYXJ5RGVjb2RlKGJ1ZmZlcil7XG4gICAgbGV0IHZpZXcgPSBuZXcgRGF0YVZpZXcoYnVmZmVyKVxuICAgIGxldCBraW5kID0gdmlldy5nZXRVaW50OCgwKVxuICAgIGxldCBkZWNvZGVyID0gbmV3IFRleHREZWNvZGVyKClcbiAgICBzd2l0Y2goa2luZCl7XG4gICAgICBjYXNlIHRoaXMuS0lORFMucHVzaDogcmV0dXJuIHRoaXMuZGVjb2RlUHVzaChidWZmZXIsIHZpZXcsIGRlY29kZXIpXG4gICAgICBjYXNlIHRoaXMuS0lORFMucmVwbHk6IHJldHVybiB0aGlzLmRlY29kZVJlcGx5KGJ1ZmZlciwgdmlldywgZGVjb2RlcilcbiAgICAgIGNhc2UgdGhpcy5LSU5EUy5icm9hZGNhc3Q6IHJldHVybiB0aGlzLmRlY29kZUJyb2FkY2FzdChidWZmZXIsIHZpZXcsIGRlY29kZXIpXG4gICAgfVxuICB9LFxuXG4gIGRlY29kZVB1c2goYnVmZmVyLCB2aWV3LCBkZWNvZGVyKXtcbiAgICBsZXQgam9pblJlZlNpemUgPSB2aWV3LmdldFVpbnQ4KDEpXG4gICAgbGV0IHRvcGljU2l6ZSA9IHZpZXcuZ2V0VWludDgoMilcbiAgICBsZXQgZXZlbnRTaXplID0gdmlldy5nZXRVaW50OCgzKVxuICAgIGxldCBvZmZzZXQgPSB0aGlzLkhFQURFUl9MRU5HVEggKyB0aGlzLk1FVEFfTEVOR1RIIC0gMSAvLyBwdXNoZXMgaGF2ZSBubyByZWZcbiAgICBsZXQgam9pblJlZiA9IGRlY29kZXIuZGVjb2RlKGJ1ZmZlci5zbGljZShvZmZzZXQsIG9mZnNldCArIGpvaW5SZWZTaXplKSlcbiAgICBvZmZzZXQgPSBvZmZzZXQgKyBqb2luUmVmU2l6ZVxuICAgIGxldCB0b3BpYyA9IGRlY29kZXIuZGVjb2RlKGJ1ZmZlci5zbGljZShvZmZzZXQsIG9mZnNldCArIHRvcGljU2l6ZSkpXG4gICAgb2Zmc2V0ID0gb2Zmc2V0ICsgdG9waWNTaXplXG4gICAgbGV0IGV2ZW50ID0gZGVjb2Rlci5kZWNvZGUoYnVmZmVyLnNsaWNlKG9mZnNldCwgb2Zmc2V0ICsgZXZlbnRTaXplKSlcbiAgICBvZmZzZXQgPSBvZmZzZXQgKyBldmVudFNpemVcbiAgICBsZXQgZGF0YSA9IGJ1ZmZlci5zbGljZShvZmZzZXQsIGJ1ZmZlci5ieXRlTGVuZ3RoKVxuICAgIHJldHVybiB7am9pbl9yZWY6IGpvaW5SZWYsIHJlZjogbnVsbCwgdG9waWM6IHRvcGljLCBldmVudDogZXZlbnQsIHBheWxvYWQ6IGRhdGF9XG4gIH0sXG5cbiAgZGVjb2RlUmVwbHkoYnVmZmVyLCB2aWV3LCBkZWNvZGVyKXtcbiAgICBsZXQgam9pblJlZlNpemUgPSB2aWV3LmdldFVpbnQ4KDEpXG4gICAgbGV0IHJlZlNpemUgPSB2aWV3LmdldFVpbnQ4KDIpXG4gICAgbGV0IHRvcGljU2l6ZSA9IHZpZXcuZ2V0VWludDgoMylcbiAgICBsZXQgZXZlbnRTaXplID0gdmlldy5nZXRVaW50OCg0KVxuICAgIGxldCBvZmZzZXQgPSB0aGlzLkhFQURFUl9MRU5HVEggKyB0aGlzLk1FVEFfTEVOR1RIXG4gICAgbGV0IGpvaW5SZWYgPSBkZWNvZGVyLmRlY29kZShidWZmZXIuc2xpY2Uob2Zmc2V0LCBvZmZzZXQgKyBqb2luUmVmU2l6ZSkpXG4gICAgb2Zmc2V0ID0gb2Zmc2V0ICsgam9pblJlZlNpemVcbiAgICBsZXQgcmVmID0gZGVjb2Rlci5kZWNvZGUoYnVmZmVyLnNsaWNlKG9mZnNldCwgb2Zmc2V0ICsgcmVmU2l6ZSkpXG4gICAgb2Zmc2V0ID0gb2Zmc2V0ICsgcmVmU2l6ZVxuICAgIGxldCB0b3BpYyA9IGRlY29kZXIuZGVjb2RlKGJ1ZmZlci5zbGljZShvZmZzZXQsIG9mZnNldCArIHRvcGljU2l6ZSkpXG4gICAgb2Zmc2V0ID0gb2Zmc2V0ICsgdG9waWNTaXplXG4gICAgbGV0IGV2ZW50ID0gZGVjb2Rlci5kZWNvZGUoYnVmZmVyLnNsaWNlKG9mZnNldCwgb2Zmc2V0ICsgZXZlbnRTaXplKSlcbiAgICBvZmZzZXQgPSBvZmZzZXQgKyBldmVudFNpemVcbiAgICBsZXQgZGF0YSA9IGJ1ZmZlci5zbGljZShvZmZzZXQsIGJ1ZmZlci5ieXRlTGVuZ3RoKVxuICAgIGxldCBwYXlsb2FkID0ge3N0YXR1czogZXZlbnQsIHJlc3BvbnNlOiBkYXRhfVxuICAgIHJldHVybiB7am9pbl9yZWY6IGpvaW5SZWYsIHJlZjogcmVmLCB0b3BpYzogdG9waWMsIGV2ZW50OiBDSEFOTkVMX0VWRU5UUy5yZXBseSwgcGF5bG9hZDogcGF5bG9hZH1cbiAgfSxcblxuICBkZWNvZGVCcm9hZGNhc3QoYnVmZmVyLCB2aWV3LCBkZWNvZGVyKXtcbiAgICBsZXQgdG9waWNTaXplID0gdmlldy5nZXRVaW50OCgxKVxuICAgIGxldCBldmVudFNpemUgPSB2aWV3LmdldFVpbnQ4KDIpXG4gICAgbGV0IG9mZnNldCA9IHRoaXMuSEVBREVSX0xFTkdUSCArIDJcbiAgICBsZXQgdG9waWMgPSBkZWNvZGVyLmRlY29kZShidWZmZXIuc2xpY2Uob2Zmc2V0LCBvZmZzZXQgKyB0b3BpY1NpemUpKVxuICAgIG9mZnNldCA9IG9mZnNldCArIHRvcGljU2l6ZVxuICAgIGxldCBldmVudCA9IGRlY29kZXIuZGVjb2RlKGJ1ZmZlci5zbGljZShvZmZzZXQsIG9mZnNldCArIGV2ZW50U2l6ZSkpXG4gICAgb2Zmc2V0ID0gb2Zmc2V0ICsgZXZlbnRTaXplXG4gICAgbGV0IGRhdGEgPSBidWZmZXIuc2xpY2Uob2Zmc2V0LCBidWZmZXIuYnl0ZUxlbmd0aClcblxuICAgIHJldHVybiB7am9pbl9yZWY6IG51bGwsIHJlZjogbnVsbCwgdG9waWM6IHRvcGljLCBldmVudDogZXZlbnQsIHBheWxvYWQ6IGRhdGF9XG4gIH1cbn1cbiIsICJpbXBvcnQge1xuICBnbG9iYWwsXG4gIHBoeFdpbmRvdyxcbiAgQ0hBTk5FTF9FVkVOVFMsXG4gIERFRkFVTFRfVElNRU9VVCxcbiAgREVGQVVMVF9WU04sXG4gIFNPQ0tFVF9TVEFURVMsXG4gIFRSQU5TUE9SVFMsXG4gIFdTX0NMT1NFX05PUk1BTFxufSBmcm9tIFwiLi9jb25zdGFudHNcIlxuXG5pbXBvcnQge1xuICBjbG9zdXJlXG59IGZyb20gXCIuL3V0aWxzXCJcblxuaW1wb3J0IEFqYXggZnJvbSBcIi4vYWpheFwiXG5pbXBvcnQgQ2hhbm5lbCBmcm9tIFwiLi9jaGFubmVsXCJcbmltcG9ydCBMb25nUG9sbCBmcm9tIFwiLi9sb25ncG9sbFwiXG5pbXBvcnQgU2VyaWFsaXplciBmcm9tIFwiLi9zZXJpYWxpemVyXCJcbmltcG9ydCBUaW1lciBmcm9tIFwiLi90aW1lclwiXG5cbi8qKiBJbml0aWFsaXplcyB0aGUgU29ja2V0ICpcbiAqXG4gKiBGb3IgSUU4IHN1cHBvcnQgdXNlIGFuIEVTNS1zaGltIChodHRwczovL2dpdGh1Yi5jb20vZXMtc2hpbXMvZXM1LXNoaW0pXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGVuZFBvaW50IC0gVGhlIHN0cmluZyBXZWJTb2NrZXQgZW5kcG9pbnQsIGllLCBgXCJ3czovL2V4YW1wbGUuY29tL3NvY2tldFwiYCxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgXCJ3c3M6Ly9leGFtcGxlLmNvbVwiYFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBcIi9zb2NrZXRcImAgKGluaGVyaXRlZCBob3N0ICYgcHJvdG9jb2wpXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdHNdIC0gT3B0aW9uYWwgY29uZmlndXJhdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdHMudHJhbnNwb3J0XSAtIFRoZSBXZWJzb2NrZXQgVHJhbnNwb3J0LCBmb3IgZXhhbXBsZSBXZWJTb2NrZXQgb3IgUGhvZW5peC5Mb25nUG9sbC5cbiAqXG4gKiBEZWZhdWx0cyB0byBXZWJTb2NrZXQgd2l0aCBhdXRvbWF0aWMgTG9uZ1BvbGwgZmFsbGJhY2suXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0cy5lbmNvZGVdIC0gVGhlIGZ1bmN0aW9uIHRvIGVuY29kZSBvdXRnb2luZyBtZXNzYWdlcy5cbiAqXG4gKiBEZWZhdWx0cyB0byBKU09OIGVuY29kZXIuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdHMuZGVjb2RlXSAtIFRoZSBmdW5jdGlvbiB0byBkZWNvZGUgaW5jb21pbmcgbWVzc2FnZXMuXG4gKlxuICogRGVmYXVsdHMgdG8gSlNPTjpcbiAqXG4gKiBgYGBqYXZhc2NyaXB0XG4gKiAocGF5bG9hZCwgY2FsbGJhY2spID0+IGNhbGxiYWNrKEpTT04ucGFyc2UocGF5bG9hZCkpXG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gW29wdHMudGltZW91dF0gLSBUaGUgZGVmYXVsdCB0aW1lb3V0IGluIG1pbGxpc2Vjb25kcyB0byB0cmlnZ2VyIHB1c2ggdGltZW91dHMuXG4gKlxuICogRGVmYXVsdHMgYERFRkFVTFRfVElNRU9VVGBcbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0cy5oZWFydGJlYXRJbnRlcnZhbE1zXSAtIFRoZSBtaWxsaXNlYyBpbnRlcnZhbCB0byBzZW5kIGEgaGVhcnRiZWF0IG1lc3NhZ2VcbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0cy5yZWNvbm5lY3RBZnRlck1zXSAtIFRoZSBvcHRpb25hbCBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIG1pbGxpc2VjXG4gKiBzb2NrZXQgcmVjb25uZWN0IGludGVydmFsLlxuICpcbiAqIERlZmF1bHRzIHRvIHN0ZXBwZWQgYmFja29mZiBvZjpcbiAqXG4gKiBgYGBqYXZhc2NyaXB0XG4gKiBmdW5jdGlvbih0cmllcyl7XG4gKiAgIHJldHVybiBbMTAsIDUwLCAxMDAsIDE1MCwgMjAwLCAyNTAsIDUwMCwgMTAwMCwgMjAwMF1bdHJpZXMgLSAxXSB8fCA1MDAwXG4gKiB9XG4gKiBgYGBgXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRzLnJlam9pbkFmdGVyTXNdIC0gVGhlIG9wdGlvbmFsIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgbWlsbGlzZWNcbiAqIHJlam9pbiBpbnRlcnZhbCBmb3IgaW5kaXZpZHVhbCBjaGFubmVscy5cbiAqXG4gKiBgYGBqYXZhc2NyaXB0XG4gKiBmdW5jdGlvbih0cmllcyl7XG4gKiAgIHJldHVybiBbMTAwMCwgMjAwMCwgNTAwMF1bdHJpZXMgLSAxXSB8fCAxMDAwMFxuICogfVxuICogYGBgYFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRzLmxvZ2dlcl0gLSBUaGUgb3B0aW9uYWwgZnVuY3Rpb24gZm9yIHNwZWNpYWxpemVkIGxvZ2dpbmcsIGllOlxuICpcbiAqIGBgYGphdmFzY3JpcHRcbiAqIGZ1bmN0aW9uKGtpbmQsIG1zZywgZGF0YSkge1xuICogICBjb25zb2xlLmxvZyhgJHtraW5kfTogJHttc2d9YCwgZGF0YSlcbiAqIH1cbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0cy5sb25ncG9sbGVyVGltZW91dF0gLSBUaGUgbWF4aW11bSB0aW1lb3V0IG9mIGEgbG9uZyBwb2xsIEFKQVggcmVxdWVzdC5cbiAqXG4gKiBEZWZhdWx0cyB0byAyMHMgKGRvdWJsZSB0aGUgc2VydmVyIGxvbmcgcG9sbCB0aW1lcikuXG4gKlxuICogQHBhcmFtIHsoT2JqZWN0fGZ1bmN0aW9uKX0gW29wdHMucGFyYW1zXSAtIFRoZSBvcHRpb25hbCBwYXJhbXMgdG8gcGFzcyB3aGVuIGNvbm5lY3RpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0cy5iaW5hcnlUeXBlXSAtIFRoZSBiaW5hcnkgdHlwZSB0byB1c2UgZm9yIGJpbmFyeSBXZWJTb2NrZXQgZnJhbWVzLlxuICpcbiAqIERlZmF1bHRzIHRvIFwiYXJyYXlidWZmZXJcIlxuICpcbiAqIEBwYXJhbSB7dnNufSBbb3B0cy52c25dIC0gVGhlIHNlcmlhbGl6ZXIncyBwcm90b2NvbCB2ZXJzaW9uIHRvIHNlbmQgb24gY29ubmVjdC5cbiAqXG4gKiBEZWZhdWx0cyB0byBERUZBVUxUX1ZTTi5cbiovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTb2NrZXQge1xuICBjb25zdHJ1Y3RvcihlbmRQb2ludCwgb3B0cyA9IHt9KXtcbiAgICB0aGlzLnN0YXRlQ2hhbmdlQ2FsbGJhY2tzID0ge29wZW46IFtdLCBjbG9zZTogW10sIGVycm9yOiBbXSwgbWVzc2FnZTogW119XG4gICAgdGhpcy5jaGFubmVscyA9IFtdXG4gICAgdGhpcy5zZW5kQnVmZmVyID0gW11cbiAgICB0aGlzLnJlZiA9IDBcbiAgICB0aGlzLnRpbWVvdXQgPSBvcHRzLnRpbWVvdXQgfHwgREVGQVVMVF9USU1FT1VUXG4gICAgdGhpcy50cmFuc3BvcnQgPSBvcHRzLnRyYW5zcG9ydCB8fCBnbG9iYWwuV2ViU29ja2V0IHx8IExvbmdQb2xsXG4gICAgdGhpcy5lc3RhYmxpc2hlZENvbm5lY3Rpb25zID0gMFxuICAgIHRoaXMuZGVmYXVsdEVuY29kZXIgPSBTZXJpYWxpemVyLmVuY29kZS5iaW5kKFNlcmlhbGl6ZXIpXG4gICAgdGhpcy5kZWZhdWx0RGVjb2RlciA9IFNlcmlhbGl6ZXIuZGVjb2RlLmJpbmQoU2VyaWFsaXplcilcbiAgICB0aGlzLmNsb3NlV2FzQ2xlYW4gPSBmYWxzZVxuICAgIHRoaXMuYmluYXJ5VHlwZSA9IG9wdHMuYmluYXJ5VHlwZSB8fCBcImFycmF5YnVmZmVyXCJcbiAgICB0aGlzLmNvbm5lY3RDbG9jayA9IDFcbiAgICBpZih0aGlzLnRyYW5zcG9ydCAhPT0gTG9uZ1BvbGwpe1xuICAgICAgdGhpcy5lbmNvZGUgPSBvcHRzLmVuY29kZSB8fCB0aGlzLmRlZmF1bHRFbmNvZGVyXG4gICAgICB0aGlzLmRlY29kZSA9IG9wdHMuZGVjb2RlIHx8IHRoaXMuZGVmYXVsdERlY29kZXJcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbmNvZGUgPSB0aGlzLmRlZmF1bHRFbmNvZGVyXG4gICAgICB0aGlzLmRlY29kZSA9IHRoaXMuZGVmYXVsdERlY29kZXJcbiAgICB9XG4gICAgbGV0IGF3YWl0aW5nQ29ubmVjdGlvbk9uUGFnZVNob3cgPSBudWxsXG4gICAgaWYocGh4V2luZG93ICYmIHBoeFdpbmRvdy5hZGRFdmVudExpc3RlbmVyKXtcbiAgICAgIHBoeFdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicGFnZWhpZGVcIiwgX2UgPT4ge1xuICAgICAgICBpZih0aGlzLmNvbm4pe1xuICAgICAgICAgIHRoaXMuZGlzY29ubmVjdCgpXG4gICAgICAgICAgYXdhaXRpbmdDb25uZWN0aW9uT25QYWdlU2hvdyA9IHRoaXMuY29ubmVjdENsb2NrXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICBwaHhXaW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBhZ2VzaG93XCIsIF9lID0+IHtcbiAgICAgICAgaWYoYXdhaXRpbmdDb25uZWN0aW9uT25QYWdlU2hvdyA9PT0gdGhpcy5jb25uZWN0Q2xvY2spe1xuICAgICAgICAgIGF3YWl0aW5nQ29ubmVjdGlvbk9uUGFnZVNob3cgPSBudWxsXG4gICAgICAgICAgdGhpcy5jb25uZWN0KClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgdGhpcy5oZWFydGJlYXRJbnRlcnZhbE1zID0gb3B0cy5oZWFydGJlYXRJbnRlcnZhbE1zIHx8IDMwMDAwXG4gICAgdGhpcy5yZWpvaW5BZnRlck1zID0gKHRyaWVzKSA9PiB7XG4gICAgICBpZihvcHRzLnJlam9pbkFmdGVyTXMpe1xuICAgICAgICByZXR1cm4gb3B0cy5yZWpvaW5BZnRlck1zKHRyaWVzKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFsxMDAwLCAyMDAwLCA1MDAwXVt0cmllcyAtIDFdIHx8IDEwMDAwXG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMucmVjb25uZWN0QWZ0ZXJNcyA9ICh0cmllcykgPT4ge1xuICAgICAgaWYob3B0cy5yZWNvbm5lY3RBZnRlck1zKXtcbiAgICAgICAgcmV0dXJuIG9wdHMucmVjb25uZWN0QWZ0ZXJNcyh0cmllcylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBbMTAsIDUwLCAxMDAsIDE1MCwgMjAwLCAyNTAsIDUwMCwgMTAwMCwgMjAwMF1bdHJpZXMgLSAxXSB8fCA1MDAwXG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMubG9nZ2VyID0gb3B0cy5sb2dnZXIgfHwgbnVsbFxuICAgIHRoaXMubG9uZ3BvbGxlclRpbWVvdXQgPSBvcHRzLmxvbmdwb2xsZXJUaW1lb3V0IHx8IDIwMDAwXG4gICAgdGhpcy5wYXJhbXMgPSBjbG9zdXJlKG9wdHMucGFyYW1zIHx8IHt9KVxuICAgIHRoaXMuZW5kUG9pbnQgPSBgJHtlbmRQb2ludH0vJHtUUkFOU1BPUlRTLndlYnNvY2tldH1gXG4gICAgdGhpcy52c24gPSBvcHRzLnZzbiB8fCBERUZBVUxUX1ZTTlxuICAgIHRoaXMuaGVhcnRiZWF0VGltZW91dFRpbWVyID0gbnVsbFxuICAgIHRoaXMuaGVhcnRiZWF0VGltZXIgPSBudWxsXG4gICAgdGhpcy5wZW5kaW5nSGVhcnRiZWF0UmVmID0gbnVsbFxuICAgIHRoaXMucmVjb25uZWN0VGltZXIgPSBuZXcgVGltZXIoKCkgPT4ge1xuICAgICAgdGhpcy50ZWFyZG93bigoKSA9PiB0aGlzLmNvbm5lY3QoKSlcbiAgICB9LCB0aGlzLnJlY29ubmVjdEFmdGVyTXMpXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgTG9uZ1BvbGwgdHJhbnNwb3J0IHJlZmVyZW5jZVxuICAgKi9cbiAgZ2V0TG9uZ1BvbGxUcmFuc3BvcnQoKXsgcmV0dXJuIExvbmdQb2xsIH1cblxuICAvKipcbiAgICogRGlzY29ubmVjdHMgYW5kIHJlcGxhY2VzIHRoZSBhY3RpdmUgdHJhbnNwb3J0XG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG5ld1RyYW5zcG9ydCAtIFRoZSBuZXcgdHJhbnNwb3J0IGNsYXNzIHRvIGluc3RhbnRpYXRlXG4gICAqXG4gICAqL1xuICByZXBsYWNlVHJhbnNwb3J0KG5ld1RyYW5zcG9ydCl7XG4gICAgdGhpcy5jb25uZWN0Q2xvY2srK1xuICAgIHRoaXMuY2xvc2VXYXNDbGVhbiA9IHRydWVcbiAgICB0aGlzLnJlY29ubmVjdFRpbWVyLnJlc2V0KClcbiAgICB0aGlzLnNlbmRCdWZmZXIgPSBbXVxuICAgIGlmKHRoaXMuY29ubil7XG4gICAgICB0aGlzLmNvbm4uY2xvc2UoKVxuICAgICAgdGhpcy5jb25uID0gbnVsbFxuICAgIH1cbiAgICB0aGlzLnRyYW5zcG9ydCA9IG5ld1RyYW5zcG9ydFxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHNvY2tldCBwcm90b2NvbFxuICAgKlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKi9cbiAgcHJvdG9jb2woKXsgcmV0dXJuIGxvY2F0aW9uLnByb3RvY29sLm1hdGNoKC9eaHR0cHMvKSA/IFwid3NzXCIgOiBcIndzXCIgfVxuXG4gIC8qKlxuICAgKiBUaGUgZnVsbHkgcXVhbGlmaWVkIHNvY2tldCB1cmxcbiAgICpcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICovXG4gIGVuZFBvaW50VVJMKCl7XG4gICAgbGV0IHVyaSA9IEFqYXguYXBwZW5kUGFyYW1zKFxuICAgICAgQWpheC5hcHBlbmRQYXJhbXModGhpcy5lbmRQb2ludCwgdGhpcy5wYXJhbXMoKSksIHt2c246IHRoaXMudnNufSlcbiAgICBpZih1cmkuY2hhckF0KDApICE9PSBcIi9cIil7IHJldHVybiB1cmkgfVxuICAgIGlmKHVyaS5jaGFyQXQoMSkgPT09IFwiL1wiKXsgcmV0dXJuIGAke3RoaXMucHJvdG9jb2woKX06JHt1cml9YCB9XG5cbiAgICByZXR1cm4gYCR7dGhpcy5wcm90b2NvbCgpfTovLyR7bG9jYXRpb24uaG9zdH0ke3VyaX1gXG4gIH1cblxuICAvKipcbiAgICogRGlzY29ubmVjdHMgdGhlIHNvY2tldFxuICAgKlxuICAgKiBTZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0Nsb3NlRXZlbnQjU3RhdHVzX2NvZGVzIGZvciB2YWxpZCBzdGF0dXMgY29kZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gT3B0aW9uYWwgY2FsbGJhY2sgd2hpY2ggaXMgY2FsbGVkIGFmdGVyIHNvY2tldCBpcyBkaXNjb25uZWN0ZWQuXG4gICAqIEBwYXJhbSB7aW50ZWdlcn0gY29kZSAtIEEgc3RhdHVzIGNvZGUgZm9yIGRpc2Nvbm5lY3Rpb24gKE9wdGlvbmFsKS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHJlYXNvbiAtIEEgdGV4dHVhbCBkZXNjcmlwdGlvbiBvZiB0aGUgcmVhc29uIHRvIGRpc2Nvbm5lY3QuIChPcHRpb25hbClcbiAgICovXG4gIGRpc2Nvbm5lY3QoY2FsbGJhY2ssIGNvZGUsIHJlYXNvbil7XG4gICAgdGhpcy5jb25uZWN0Q2xvY2srK1xuICAgIHRoaXMuY2xvc2VXYXNDbGVhbiA9IHRydWVcbiAgICB0aGlzLnJlY29ubmVjdFRpbWVyLnJlc2V0KClcbiAgICB0aGlzLnRlYXJkb3duKGNhbGxiYWNrLCBjb2RlLCByZWFzb24pXG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyAtIFRoZSBwYXJhbXMgdG8gc2VuZCB3aGVuIGNvbm5lY3RpbmcsIGZvciBleGFtcGxlIGB7dXNlcl9pZDogdXNlclRva2VufWBcbiAgICpcbiAgICogUGFzc2luZyBwYXJhbXMgdG8gY29ubmVjdCBpcyBkZXByZWNhdGVkOyBwYXNzIHRoZW0gaW4gdGhlIFNvY2tldCBjb25zdHJ1Y3RvciBpbnN0ZWFkOlxuICAgKiBgbmV3IFNvY2tldChcIi9zb2NrZXRcIiwge3BhcmFtczoge3VzZXJfaWQ6IHVzZXJUb2tlbn19KWAuXG4gICAqL1xuICBjb25uZWN0KHBhcmFtcyl7XG4gICAgaWYocGFyYW1zKXtcbiAgICAgIGNvbnNvbGUgJiYgY29uc29sZS5sb2coXCJwYXNzaW5nIHBhcmFtcyB0byBjb25uZWN0IGlzIGRlcHJlY2F0ZWQuIEluc3RlYWQgcGFzcyA6cGFyYW1zIHRvIHRoZSBTb2NrZXQgY29uc3RydWN0b3JcIilcbiAgICAgIHRoaXMucGFyYW1zID0gY2xvc3VyZShwYXJhbXMpXG4gICAgfVxuICAgIGlmKHRoaXMuY29ubil7IHJldHVybiB9XG5cbiAgICB0aGlzLmNvbm5lY3RDbG9jaysrXG4gICAgdGhpcy5jbG9zZVdhc0NsZWFuID0gZmFsc2VcbiAgICB0aGlzLmNvbm4gPSBuZXcgdGhpcy50cmFuc3BvcnQodGhpcy5lbmRQb2ludFVSTCgpKVxuICAgIHRoaXMuY29ubi5iaW5hcnlUeXBlID0gdGhpcy5iaW5hcnlUeXBlXG4gICAgdGhpcy5jb25uLnRpbWVvdXQgPSB0aGlzLmxvbmdwb2xsZXJUaW1lb3V0XG4gICAgdGhpcy5jb25uLm9ub3BlbiA9ICgpID0+IHRoaXMub25Db25uT3BlbigpXG4gICAgdGhpcy5jb25uLm9uZXJyb3IgPSBlcnJvciA9PiB0aGlzLm9uQ29ubkVycm9yKGVycm9yKVxuICAgIHRoaXMuY29ubi5vbm1lc3NhZ2UgPSBldmVudCA9PiB0aGlzLm9uQ29ubk1lc3NhZ2UoZXZlbnQpXG4gICAgdGhpcy5jb25uLm9uY2xvc2UgPSBldmVudCA9PiB0aGlzLm9uQ29ubkNsb3NlKGV2ZW50KVxuICB9XG5cbiAgLyoqXG4gICAqIExvZ3MgdGhlIG1lc3NhZ2UuIE92ZXJyaWRlIGB0aGlzLmxvZ2dlcmAgZm9yIHNwZWNpYWxpemVkIGxvZ2dpbmcuIG5vb3BzIGJ5IGRlZmF1bHRcbiAgICogQHBhcmFtIHtzdHJpbmd9IGtpbmRcbiAgICogQHBhcmFtIHtzdHJpbmd9IG1zZ1xuICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgKi9cbiAgbG9nKGtpbmQsIG1zZywgZGF0YSl7IHRoaXMubG9nZ2VyKGtpbmQsIG1zZywgZGF0YSkgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgYSBsb2dnZXIgaGFzIGJlZW4gc2V0IG9uIHRoaXMgc29ja2V0LlxuICAgKi9cbiAgaGFzTG9nZ2VyKCl7IHJldHVybiB0aGlzLmxvZ2dlciAhPT0gbnVsbCB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBjYWxsYmFja3MgZm9yIGNvbm5lY3Rpb24gb3BlbiBldmVudHNcbiAgICpcbiAgICogQGV4YW1wbGUgc29ja2V0Lm9uT3BlbihmdW5jdGlvbigpeyBjb25zb2xlLmluZm8oXCJ0aGUgc29ja2V0IHdhcyBvcGVuZWRcIikgfSlcbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICovXG4gIG9uT3BlbihjYWxsYmFjayl7XG4gICAgbGV0IHJlZiA9IHRoaXMubWFrZVJlZigpXG4gICAgdGhpcy5zdGF0ZUNoYW5nZUNhbGxiYWNrcy5vcGVuLnB1c2goW3JlZiwgY2FsbGJhY2tdKVxuICAgIHJldHVybiByZWZcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgY2FsbGJhY2tzIGZvciBjb25uZWN0aW9uIGNsb3NlIGV2ZW50c1xuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgKi9cbiAgb25DbG9zZShjYWxsYmFjayl7XG4gICAgbGV0IHJlZiA9IHRoaXMubWFrZVJlZigpXG4gICAgdGhpcy5zdGF0ZUNoYW5nZUNhbGxiYWNrcy5jbG9zZS5wdXNoKFtyZWYsIGNhbGxiYWNrXSlcbiAgICByZXR1cm4gcmVmXG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGNhbGxiYWNrcyBmb3IgY29ubmVjdGlvbiBlcnJvciBldmVudHNcbiAgICpcbiAgICogQGV4YW1wbGUgc29ja2V0Lm9uRXJyb3IoZnVuY3Rpb24oZXJyb3IpeyBhbGVydChcIkFuIGVycm9yIG9jY3VycmVkXCIpIH0pXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAqL1xuICBvbkVycm9yKGNhbGxiYWNrKXtcbiAgICBsZXQgcmVmID0gdGhpcy5tYWtlUmVmKClcbiAgICB0aGlzLnN0YXRlQ2hhbmdlQ2FsbGJhY2tzLmVycm9yLnB1c2goW3JlZiwgY2FsbGJhY2tdKVxuICAgIHJldHVybiByZWZcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgY2FsbGJhY2tzIGZvciBjb25uZWN0aW9uIG1lc3NhZ2UgZXZlbnRzXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAqL1xuICBvbk1lc3NhZ2UoY2FsbGJhY2spe1xuICAgIGxldCByZWYgPSB0aGlzLm1ha2VSZWYoKVxuICAgIHRoaXMuc3RhdGVDaGFuZ2VDYWxsYmFja3MubWVzc2FnZS5wdXNoKFtyZWYsIGNhbGxiYWNrXSlcbiAgICByZXR1cm4gcmVmXG4gIH1cblxuICAvKipcbiAgICogUGluZ3MgdGhlIHNlcnZlciBhbmQgaW52b2tlcyB0aGUgY2FsbGJhY2sgd2l0aCB0aGUgUlRUIGluIG1pbGxpc2Vjb25kc1xuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHBpbmcgd2FzIHB1c2hlZCBvciBmYWxzZSBpZiB1bmFibGUgdG8gYmUgcHVzaGVkLlxuICAgKi9cbiAgcGluZyhjYWxsYmFjayl7XG4gICAgaWYoIXRoaXMuaXNDb25uZWN0ZWQoKSl7IHJldHVybiBmYWxzZSB9XG4gICAgbGV0IHJlZiA9IHRoaXMubWFrZVJlZigpXG4gICAgbGV0IHN0YXJ0VGltZSA9IERhdGUubm93KClcbiAgICB0aGlzLnB1c2goe3RvcGljOiBcInBob2VuaXhcIiwgZXZlbnQ6IFwiaGVhcnRiZWF0XCIsIHBheWxvYWQ6IHt9LCByZWY6IHJlZn0pXG4gICAgbGV0IG9uTXNnUmVmID0gdGhpcy5vbk1lc3NhZ2UobXNnID0+IHtcbiAgICAgIGlmKG1zZy5yZWYgPT09IHJlZil7XG4gICAgICAgIHRoaXMub2ZmKFtvbk1zZ1JlZl0pXG4gICAgICAgIGNhbGxiYWNrKERhdGUubm93KCkgLSBzdGFydFRpbWUpXG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuXG4gIGNsZWFySGVhcnRiZWF0cygpe1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmhlYXJ0YmVhdFRpbWVyKVxuICAgIGNsZWFyVGltZW91dCh0aGlzLmhlYXJ0YmVhdFRpbWVvdXRUaW1lcilcbiAgfVxuXG4gIG9uQ29ubk9wZW4oKXtcbiAgICBpZih0aGlzLmhhc0xvZ2dlcigpKSB0aGlzLmxvZyhcInRyYW5zcG9ydFwiLCBgY29ubmVjdGVkIHRvICR7dGhpcy5lbmRQb2ludFVSTCgpfWApXG4gICAgdGhpcy5jbG9zZVdhc0NsZWFuID0gZmFsc2VcbiAgICB0aGlzLmVzdGFibGlzaGVkQ29ubmVjdGlvbnMrK1xuICAgIHRoaXMuZmx1c2hTZW5kQnVmZmVyKClcbiAgICB0aGlzLnJlY29ubmVjdFRpbWVyLnJlc2V0KClcbiAgICB0aGlzLnJlc2V0SGVhcnRiZWF0KClcbiAgICB0aGlzLnN0YXRlQ2hhbmdlQ2FsbGJhY2tzLm9wZW4uZm9yRWFjaCgoWywgY2FsbGJhY2tdKSA9PiBjYWxsYmFjaygpKVxuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuXG4gIGhlYXJ0YmVhdFRpbWVvdXQoKXtcbiAgICBpZih0aGlzLnBlbmRpbmdIZWFydGJlYXRSZWYpe1xuICAgICAgdGhpcy5wZW5kaW5nSGVhcnRiZWF0UmVmID0gbnVsbFxuICAgICAgaWYodGhpcy5oYXNMb2dnZXIoKSl7IHRoaXMubG9nKFwidHJhbnNwb3J0XCIsIFwiaGVhcnRiZWF0IHRpbWVvdXQuIEF0dGVtcHRpbmcgdG8gcmUtZXN0YWJsaXNoIGNvbm5lY3Rpb25cIikgfVxuICAgICAgdGhpcy50cmlnZ2VyQ2hhbkVycm9yKClcbiAgICAgIHRoaXMuY2xvc2VXYXNDbGVhbiA9IGZhbHNlXG4gICAgICB0aGlzLnRlYXJkb3duKCgpID0+IHRoaXMucmVjb25uZWN0VGltZXIuc2NoZWR1bGVUaW1lb3V0KCksIFdTX0NMT1NFX05PUk1BTCwgXCJoZWFydGJlYXQgdGltZW91dFwiKVxuICAgIH1cbiAgfVxuXG4gIHJlc2V0SGVhcnRiZWF0KCl7XG4gICAgaWYodGhpcy5jb25uICYmIHRoaXMuY29ubi5za2lwSGVhcnRiZWF0KXsgcmV0dXJuIH1cbiAgICB0aGlzLnBlbmRpbmdIZWFydGJlYXRSZWYgPSBudWxsXG4gICAgdGhpcy5jbGVhckhlYXJ0YmVhdHMoKVxuICAgIHRoaXMuaGVhcnRiZWF0VGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMuc2VuZEhlYXJ0YmVhdCgpLCB0aGlzLmhlYXJ0YmVhdEludGVydmFsTXMpXG4gIH1cblxuICB0ZWFyZG93bihjYWxsYmFjaywgY29kZSwgcmVhc29uKXtcbiAgICBpZighdGhpcy5jb25uKXtcbiAgICAgIHJldHVybiBjYWxsYmFjayAmJiBjYWxsYmFjaygpXG4gICAgfVxuXG4gICAgdGhpcy53YWl0Rm9yQnVmZmVyRG9uZSgoKSA9PiB7XG4gICAgICBpZih0aGlzLmNvbm4pe1xuICAgICAgICBpZihjb2RlKXsgdGhpcy5jb25uLmNsb3NlKGNvZGUsIHJlYXNvbiB8fCBcIlwiKSB9IGVsc2UgeyB0aGlzLmNvbm4uY2xvc2UoKSB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMud2FpdEZvclNvY2tldENsb3NlZCgoKSA9PiB7XG4gICAgICAgIGlmKHRoaXMuY29ubil7XG4gICAgICAgICAgdGhpcy5jb25uLm9ub3BlbiA9IGZ1bmN0aW9uICgpeyB9IC8vIG5vb3BcbiAgICAgICAgICB0aGlzLmNvbm4ub25lcnJvciA9IGZ1bmN0aW9uICgpeyB9IC8vIG5vb3BcbiAgICAgICAgICB0aGlzLmNvbm4ub25tZXNzYWdlID0gZnVuY3Rpb24gKCl7IH0gLy8gbm9vcFxuICAgICAgICAgIHRoaXMuY29ubi5vbmNsb3NlID0gZnVuY3Rpb24gKCl7IH0gLy8gbm9vcFxuICAgICAgICAgIHRoaXMuY29ubiA9IG51bGxcbiAgICAgICAgfVxuXG4gICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKClcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIHdhaXRGb3JCdWZmZXJEb25lKGNhbGxiYWNrLCB0cmllcyA9IDEpe1xuICAgIGlmKHRyaWVzID09PSA1IHx8ICF0aGlzLmNvbm4gfHwgIXRoaXMuY29ubi5idWZmZXJlZEFtb3VudCl7XG4gICAgICBjYWxsYmFjaygpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMud2FpdEZvckJ1ZmZlckRvbmUoY2FsbGJhY2ssIHRyaWVzICsgMSlcbiAgICB9LCAxNTAgKiB0cmllcylcbiAgfVxuXG4gIHdhaXRGb3JTb2NrZXRDbG9zZWQoY2FsbGJhY2ssIHRyaWVzID0gMSl7XG4gICAgaWYodHJpZXMgPT09IDUgfHwgIXRoaXMuY29ubiB8fCB0aGlzLmNvbm4ucmVhZHlTdGF0ZSA9PT0gU09DS0VUX1NUQVRFUy5jbG9zZWQpe1xuICAgICAgY2FsbGJhY2soKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLndhaXRGb3JTb2NrZXRDbG9zZWQoY2FsbGJhY2ssIHRyaWVzICsgMSlcbiAgICB9LCAxNTAgKiB0cmllcylcbiAgfVxuXG4gIG9uQ29ubkNsb3NlKGV2ZW50KXtcbiAgICBsZXQgY2xvc2VDb2RlID0gZXZlbnQgJiYgZXZlbnQuY29kZVxuICAgIGlmKHRoaXMuaGFzTG9nZ2VyKCkpIHRoaXMubG9nKFwidHJhbnNwb3J0XCIsIFwiY2xvc2VcIiwgZXZlbnQpXG4gICAgdGhpcy50cmlnZ2VyQ2hhbkVycm9yKClcbiAgICB0aGlzLmNsZWFySGVhcnRiZWF0cygpXG4gICAgaWYoIXRoaXMuY2xvc2VXYXNDbGVhbiAmJiBjbG9zZUNvZGUgIT09IDEwMDApe1xuICAgICAgdGhpcy5yZWNvbm5lY3RUaW1lci5zY2hlZHVsZVRpbWVvdXQoKVxuICAgIH1cbiAgICB0aGlzLnN0YXRlQ2hhbmdlQ2FsbGJhY2tzLmNsb3NlLmZvckVhY2goKFssIGNhbGxiYWNrXSkgPT4gY2FsbGJhY2soZXZlbnQpKVxuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBvbkNvbm5FcnJvcihlcnJvcil7XG4gICAgaWYodGhpcy5oYXNMb2dnZXIoKSkgdGhpcy5sb2coXCJ0cmFuc3BvcnRcIiwgZXJyb3IpXG4gICAgbGV0IHRyYW5zcG9ydEJlZm9yZSA9IHRoaXMudHJhbnNwb3J0XG4gICAgbGV0IGVzdGFibGlzaGVkQmVmb3JlID0gdGhpcy5lc3RhYmxpc2hlZENvbm5lY3Rpb25zXG4gICAgdGhpcy5zdGF0ZUNoYW5nZUNhbGxiYWNrcy5lcnJvci5mb3JFYWNoKChbLCBjYWxsYmFja10pID0+IHtcbiAgICAgIGNhbGxiYWNrKGVycm9yLCB0cmFuc3BvcnRCZWZvcmUsIGVzdGFibGlzaGVkQmVmb3JlKVxuICAgIH0pXG4gICAgaWYodHJhbnNwb3J0QmVmb3JlID09PSB0aGlzLnRyYW5zcG9ydCB8fCBlc3RhYmxpc2hlZEJlZm9yZSA+IDApe1xuICAgICAgdGhpcy50cmlnZ2VyQ2hhbkVycm9yKClcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRyaWdnZXJDaGFuRXJyb3IoKXtcbiAgICB0aGlzLmNoYW5uZWxzLmZvckVhY2goY2hhbm5lbCA9PiB7XG4gICAgICBpZighKGNoYW5uZWwuaXNFcnJvcmVkKCkgfHwgY2hhbm5lbC5pc0xlYXZpbmcoKSB8fCBjaGFubmVsLmlzQ2xvc2VkKCkpKXtcbiAgICAgICAgY2hhbm5lbC50cmlnZ2VyKENIQU5ORUxfRVZFTlRTLmVycm9yKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICovXG4gIGNvbm5lY3Rpb25TdGF0ZSgpe1xuICAgIHN3aXRjaCh0aGlzLmNvbm4gJiYgdGhpcy5jb25uLnJlYWR5U3RhdGUpe1xuICAgICAgY2FzZSBTT0NLRVRfU1RBVEVTLmNvbm5lY3Rpbmc6IHJldHVybiBcImNvbm5lY3RpbmdcIlxuICAgICAgY2FzZSBTT0NLRVRfU1RBVEVTLm9wZW46IHJldHVybiBcIm9wZW5cIlxuICAgICAgY2FzZSBTT0NLRVRfU1RBVEVTLmNsb3Npbmc6IHJldHVybiBcImNsb3NpbmdcIlxuICAgICAgZGVmYXVsdDogcmV0dXJuIFwiY2xvc2VkXCJcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBpc0Nvbm5lY3RlZCgpeyByZXR1cm4gdGhpcy5jb25uZWN0aW9uU3RhdGUoKSA9PT0gXCJvcGVuXCIgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKlxuICAgKiBAcGFyYW0ge0NoYW5uZWx9XG4gICAqL1xuICByZW1vdmUoY2hhbm5lbCl7XG4gICAgdGhpcy5vZmYoY2hhbm5lbC5zdGF0ZUNoYW5nZVJlZnMpXG4gICAgdGhpcy5jaGFubmVscyA9IHRoaXMuY2hhbm5lbHMuZmlsdGVyKGMgPT4gYy5qb2luUmVmKCkgIT09IGNoYW5uZWwuam9pblJlZigpKVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYG9uT3BlbmAsIGBvbkNsb3NlYCwgYG9uRXJyb3IsYCBhbmQgYG9uTWVzc2FnZWAgcmVnaXN0cmF0aW9ucy5cbiAgICpcbiAgICogQHBhcmFtIHtyZWZzfSAtIGxpc3Qgb2YgcmVmcyByZXR1cm5lZCBieSBjYWxscyB0b1xuICAgKiAgICAgICAgICAgICAgICAgYG9uT3BlbmAsIGBvbkNsb3NlYCwgYG9uRXJyb3IsYCBhbmQgYG9uTWVzc2FnZWBcbiAgICovXG4gIG9mZihyZWZzKXtcbiAgICBmb3IobGV0IGtleSBpbiB0aGlzLnN0YXRlQ2hhbmdlQ2FsbGJhY2tzKXtcbiAgICAgIHRoaXMuc3RhdGVDaGFuZ2VDYWxsYmFja3Nba2V5XSA9IHRoaXMuc3RhdGVDaGFuZ2VDYWxsYmFja3Nba2V5XS5maWx0ZXIoKFtyZWZdKSA9PiB7XG4gICAgICAgIHJldHVybiByZWZzLmluZGV4T2YocmVmKSA9PT0gLTFcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYXRlcyBhIG5ldyBjaGFubmVsIGZvciB0aGUgZ2l2ZW4gdG9waWNcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRvcGljXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjaGFuUGFyYW1zIC0gUGFyYW1ldGVycyBmb3IgdGhlIGNoYW5uZWxcbiAgICogQHJldHVybnMge0NoYW5uZWx9XG4gICAqL1xuICBjaGFubmVsKHRvcGljLCBjaGFuUGFyYW1zID0ge30pe1xuICAgIGxldCBjaGFuID0gbmV3IENoYW5uZWwodG9waWMsIGNoYW5QYXJhbXMsIHRoaXMpXG4gICAgdGhpcy5jaGFubmVscy5wdXNoKGNoYW4pXG4gICAgcmV0dXJuIGNoYW5cbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgKi9cbiAgcHVzaChkYXRhKXtcbiAgICBpZih0aGlzLmhhc0xvZ2dlcigpKXtcbiAgICAgIGxldCB7dG9waWMsIGV2ZW50LCBwYXlsb2FkLCByZWYsIGpvaW5fcmVmfSA9IGRhdGFcbiAgICAgIHRoaXMubG9nKFwicHVzaFwiLCBgJHt0b3BpY30gJHtldmVudH0gKCR7am9pbl9yZWZ9LCAke3JlZn0pYCwgcGF5bG9hZClcbiAgICB9XG5cbiAgICBpZih0aGlzLmlzQ29ubmVjdGVkKCkpe1xuICAgICAgdGhpcy5lbmNvZGUoZGF0YSwgcmVzdWx0ID0+IHRoaXMuY29ubi5zZW5kKHJlc3VsdCkpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2VuZEJ1ZmZlci5wdXNoKCgpID0+IHRoaXMuZW5jb2RlKGRhdGEsIHJlc3VsdCA9PiB0aGlzLmNvbm4uc2VuZChyZXN1bHQpKSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBuZXh0IG1lc3NhZ2UgcmVmLCBhY2NvdW50aW5nIGZvciBvdmVyZmxvd3NcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICovXG4gIG1ha2VSZWYoKXtcbiAgICBsZXQgbmV3UmVmID0gdGhpcy5yZWYgKyAxXG4gICAgaWYobmV3UmVmID09PSB0aGlzLnJlZil7IHRoaXMucmVmID0gMCB9IGVsc2UgeyB0aGlzLnJlZiA9IG5ld1JlZiB9XG5cbiAgICByZXR1cm4gdGhpcy5yZWYudG9TdHJpbmcoKVxuICB9XG5cbiAgc2VuZEhlYXJ0YmVhdCgpe1xuICAgIGlmKHRoaXMucGVuZGluZ0hlYXJ0YmVhdFJlZiAmJiAhdGhpcy5pc0Nvbm5lY3RlZCgpKXsgcmV0dXJuIH1cbiAgICB0aGlzLnBlbmRpbmdIZWFydGJlYXRSZWYgPSB0aGlzLm1ha2VSZWYoKVxuICAgIHRoaXMucHVzaCh7dG9waWM6IFwicGhvZW5peFwiLCBldmVudDogXCJoZWFydGJlYXRcIiwgcGF5bG9hZDoge30sIHJlZjogdGhpcy5wZW5kaW5nSGVhcnRiZWF0UmVmfSlcbiAgICB0aGlzLmhlYXJ0YmVhdFRpbWVvdXRUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5oZWFydGJlYXRUaW1lb3V0KCksIHRoaXMuaGVhcnRiZWF0SW50ZXJ2YWxNcylcbiAgfVxuXG4gIGZsdXNoU2VuZEJ1ZmZlcigpe1xuICAgIGlmKHRoaXMuaXNDb25uZWN0ZWQoKSAmJiB0aGlzLnNlbmRCdWZmZXIubGVuZ3RoID4gMCl7XG4gICAgICB0aGlzLnNlbmRCdWZmZXIuZm9yRWFjaChjYWxsYmFjayA9PiBjYWxsYmFjaygpKVxuICAgICAgdGhpcy5zZW5kQnVmZmVyID0gW11cbiAgICB9XG4gIH1cblxuICBvbkNvbm5NZXNzYWdlKHJhd01lc3NhZ2Upe1xuICAgIHRoaXMuZGVjb2RlKHJhd01lc3NhZ2UuZGF0YSwgbXNnID0+IHtcbiAgICAgIGxldCB7dG9waWMsIGV2ZW50LCBwYXlsb2FkLCByZWYsIGpvaW5fcmVmfSA9IG1zZ1xuICAgICAgaWYocmVmICYmIHJlZiA9PT0gdGhpcy5wZW5kaW5nSGVhcnRiZWF0UmVmKXtcbiAgICAgICAgdGhpcy5jbGVhckhlYXJ0YmVhdHMoKVxuICAgICAgICB0aGlzLnBlbmRpbmdIZWFydGJlYXRSZWYgPSBudWxsXG4gICAgICAgIHRoaXMuaGVhcnRiZWF0VGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMuc2VuZEhlYXJ0YmVhdCgpLCB0aGlzLmhlYXJ0YmVhdEludGVydmFsTXMpXG4gICAgICB9XG5cbiAgICAgIGlmKHRoaXMuaGFzTG9nZ2VyKCkpIHRoaXMubG9nKFwicmVjZWl2ZVwiLCBgJHtwYXlsb2FkLnN0YXR1cyB8fCBcIlwifSAke3RvcGljfSAke2V2ZW50fSAke3JlZiAmJiBcIihcIiArIHJlZiArIFwiKVwiIHx8IFwiXCJ9YCwgcGF5bG9hZClcblxuICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY2hhbm5lbHMubGVuZ3RoOyBpKyspe1xuICAgICAgICBjb25zdCBjaGFubmVsID0gdGhpcy5jaGFubmVsc1tpXVxuICAgICAgICBpZighY2hhbm5lbC5pc01lbWJlcih0b3BpYywgZXZlbnQsIHBheWxvYWQsIGpvaW5fcmVmKSl7IGNvbnRpbnVlIH1cbiAgICAgICAgY2hhbm5lbC50cmlnZ2VyKGV2ZW50LCBwYXlsb2FkLCByZWYsIGpvaW5fcmVmKVxuICAgICAgfVxuXG4gICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5zdGF0ZUNoYW5nZUNhbGxiYWNrcy5tZXNzYWdlLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgbGV0IFssIGNhbGxiYWNrXSA9IHRoaXMuc3RhdGVDaGFuZ2VDYWxsYmFja3MubWVzc2FnZVtpXVxuICAgICAgICBjYWxsYmFjayhtc2cpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGxlYXZlT3BlblRvcGljKHRvcGljKXtcbiAgICBsZXQgZHVwQ2hhbm5lbCA9IHRoaXMuY2hhbm5lbHMuZmluZChjID0+IGMudG9waWMgPT09IHRvcGljICYmIChjLmlzSm9pbmVkKCkgfHwgYy5pc0pvaW5pbmcoKSkpXG4gICAgaWYoZHVwQ2hhbm5lbCl7XG4gICAgICBpZih0aGlzLmhhc0xvZ2dlcigpKSB0aGlzLmxvZyhcInRyYW5zcG9ydFwiLCBgbGVhdmluZyBkdXBsaWNhdGUgdG9waWMgXCIke3RvcGljfVwiYClcbiAgICAgIGR1cENoYW5uZWwubGVhdmUoKVxuICAgIH1cbiAgfVxufVxuIiwgIi8vIE5PVEU6IFRoZSBjb250ZW50cyBvZiB0aGlzIGZpbGUgd2lsbCBvbmx5IGJlIGV4ZWN1dGVkIGlmXG4vLyB5b3UgdW5jb21tZW50IGl0cyBlbnRyeSBpbiBcImFzc2V0cy9qcy9hcHAuanNcIi5cblxuLy8gQnJpbmcgaW4gUGhvZW5peCBjaGFubmVscyBjbGllbnQgbGlicmFyeTpcbmltcG9ydCB7IFNvY2tldCB9IGZyb20gXCJwaG9lbml4XCI7XG5cbi8vIEFuZCBjb25uZWN0IHRvIHRoZSBwYXRoIGluIFwibGliL3dlYmNoYXNlcnZlcl93ZWIvZW5kcG9pbnQuZXhcIi4gV2UgcGFzcyB0aGVcbi8vIHRva2VuIGZvciBhdXRoZW50aWNhdGlvbi4gUmVhZCBiZWxvdyBob3cgaXQgc2hvdWxkIGJlIHVzZWQuXG5sZXQgc29ja2V0ID0gbmV3IFNvY2tldChcIi9jbGllbnRcIiwgeyBwYXJhbXM6IHsgdG9rZW46IHdpbmRvdy51c2VyVG9rZW4gfSB9KTtcblxuLy8gV2hlbiB5b3UgY29ubmVjdCwgeW91J2xsIG9mdGVuIG5lZWQgdG8gYXV0aGVudGljYXRlIHRoZSBjbGllbnQuXG4vLyBGb3IgZXhhbXBsZSwgaW1hZ2luZSB5b3UgaGF2ZSBhbiBhdXRoZW50aWNhdGlvbiBwbHVnLCBgTXlBdXRoYCxcbi8vIHdoaWNoIGF1dGhlbnRpY2F0ZXMgdGhlIHNlc3Npb24gYW5kIGFzc2lnbnMgYSBgOmN1cnJlbnRfdXNlcmAuXG4vLyBJZiB0aGUgY3VycmVudCB1c2VyIGV4aXN0cyB5b3UgY2FuIGFzc2lnbiB0aGUgdXNlcidzIHRva2VuIGluXG4vLyB0aGUgY29ubmVjdGlvbiBmb3IgdXNlIGluIHRoZSBsYXlvdXQuXG4vL1xuLy8gSW4geW91ciBcImxpYi93ZWJjaGFzZXJ2ZXJfd2ViL3JvdXRlci5leFwiOlxuLy9cbi8vICAgICBwaXBlbGluZSA6YnJvd3NlciBkb1xuLy8gICAgICAgLi4uXG4vLyAgICAgICBwbHVnIE15QXV0aFxuLy8gICAgICAgcGx1ZyA6cHV0X3VzZXJfdG9rZW5cbi8vICAgICBlbmRcbi8vXG4vLyAgICAgZGVmcCBwdXRfdXNlcl90b2tlbihjb25uLCBfKSBkb1xuLy8gICAgICAgaWYgY3VycmVudF91c2VyID0gY29ubi5hc3NpZ25zWzpjdXJyZW50X3VzZXJdIGRvXG4vLyAgICAgICAgIHRva2VuID0gUGhvZW5peC5Ub2tlbi5zaWduKGNvbm4sIFwidXNlciBzb2NrZXRcIiwgY3VycmVudF91c2VyLmlkKVxuLy8gICAgICAgICBhc3NpZ24oY29ubiwgOnVzZXJfdG9rZW4sIHRva2VuKVxuLy8gICAgICAgZWxzZVxuLy8gICAgICAgICBjb25uXG4vLyAgICAgICBlbmRcbi8vICAgICBlbmRcbi8vXG4vLyBOb3cgeW91IG5lZWQgdG8gcGFzcyB0aGlzIHRva2VuIHRvIEphdmFTY3JpcHQuIFlvdSBjYW4gZG8gc29cbi8vIGluc2lkZSBhIHNjcmlwdCB0YWcgaW4gXCJsaWIvd2ViY2hhc2VydmVyX3dlYi90ZW1wbGF0ZXMvbGF5b3V0L2FwcC5odG1sLmhlZXhcIjpcbi8vXG4vLyAgICAgPHNjcmlwdD53aW5kb3cudXNlclRva2VuID0gXCI8JT0gYXNzaWduc1s6dXNlcl90b2tlbl0gJT5cIjs8L3NjcmlwdD5cbi8vXG4vLyBZb3Ugd2lsbCBuZWVkIHRvIHZlcmlmeSB0aGUgdXNlciB0b2tlbiBpbiB0aGUgXCJjb25uZWN0LzNcIiBmdW5jdGlvblxuLy8gaW4gXCJsaWIvd2ViY2hhc2VydmVyX3dlYi9jaGFubmVscy91c2VyX3NvY2tldC5leFwiOlxuLy9cbi8vICAgICBkZWYgY29ubmVjdCgle1widG9rZW5cIiA9PiB0b2tlbn0sIHNvY2tldCwgX2Nvbm5lY3RfaW5mbykgZG9cbi8vICAgICAgICMgbWF4X2FnZTogMTIwOTYwMCBpcyBlcXVpdmFsZW50IHRvIHR3byB3ZWVrcyBpbiBzZWNvbmRzXG4vLyAgICAgICBjYXNlIFBob2VuaXguVG9rZW4udmVyaWZ5KHNvY2tldCwgXCJ1c2VyIHNvY2tldFwiLCB0b2tlbiwgbWF4X2FnZTogMV8yMDlfNjAwKSBkb1xuLy8gICAgICAgICB7Om9rLCB1c2VyX2lkfSAtPlxuLy8gICAgICAgICAgIHs6b2ssIGFzc2lnbihzb2NrZXQsIDp1c2VyLCB1c2VyX2lkKX1cbi8vXG4vLyAgICAgICAgIHs6ZXJyb3IsIHJlYXNvbn0gLT5cbi8vICAgICAgICAgICA6ZXJyb3Jcbi8vICAgICAgIGVuZFxuLy8gICAgIGVuZFxuLy9cbi8vIEZpbmFsbHksIGNvbm5lY3QgdG8gdGhlIHNvY2tldDpcbmlmICh3aW5kb3cudXNlclRva2VuKSB7XG4gIHNvY2tldC5jb25uZWN0KCk7XG59XG5cbi8vIE5vdyB0aGF0IHlvdSBhcmUgY29ubmVjdGVkLCB5b3UgY2FuIGpvaW4gY2hhbm5lbHMgd2l0aCBhIHRvcGljLlxuLy8gTGV0J3MgYXNzdW1lIHlvdSBoYXZlIGEgY2hhbm5lbCB3aXRoIGEgdG9waWMgbmFtZWQgYHJvb21gIGFuZCB0aGVcbi8vIHN1YnRvcGljIGlzIGl0cyBpZCAtIGluIHRoaXMgY2FzZSA0MjpcblxuLy9sZXQgY2hhbm5lbCA9IHNvY2tldC5jaGFubmVsKFwicm9vbTo0MlwiLCB7fSk7XG5sZXQgY29ubmVjdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29ubmVjdC1idXR0b25cIik7XG5sZXQgYWN0aW9uSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FjdGlvbi1pbnB1dFwiKTtcbmxldCBjYWxsQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjYWxsLWJ1dHRvblwiKTtcbmxldCBjaGFubmVsID0gbnVsbDtcblxuaWYgKGNvbm5lY3RCdXR0b24pIHtcbiAgY29ubmVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgY29uc29sZS5sb2coXCJjb25uZWN0XCIpO1xuICAgIGNoYW5uZWwgPSBzb2NrZXQuY2hhbm5lbChcIm1hdGNoOjFcIik7XG4gICAgY2hhbm5lbFxuICAgICAgLmpvaW4oKVxuICAgICAgLnJlY2VpdmUoXCJva1wiLCAocmVzcCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkpvaW5lZCBzdWNjZXNzZnVsbHlcIiwgcmVzcCk7XG4gICAgICB9KVxuICAgICAgLnJlY2VpdmUoXCJlcnJvclwiLCAocmVzcCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlVuYWJsZSB0byBqb2luXCIsIHJlc3ApO1xuICAgICAgfSk7XG5cbiAgICBjaGFubmVsLm9uKFwicmVzdWx0XCIsIChwYXlsb2FkKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhwYXlsb2FkKTtcbiAgICB9KTtcblxuICB9KTtcblxuICBjYWxsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICBjb25zb2xlLmxvZyhcIkNhbGwgYnV0dG9uIHByZXNzZWRcIik7XG4gICAgYWN0aW9uID0gYWN0aW9uSW5wdXQudmFsdWU7XG4gICAgYWN0aW9uSW5wdXQudmFsdWUgPSBcIlwiO1xuICAgIGNoYW5uZWwucHVzaChcImNhbGxcIiwge2FjdGlvbjogYWN0aW9ufSk7XG4gIH0pO1xufVxuXG5cbmV4cG9ydCBkZWZhdWx0IHNvY2tldDtcbiIsICJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uKCkge1xuICB2YXIgUG9seWZpbGxFdmVudCA9IGV2ZW50Q29uc3RydWN0b3IoKTtcblxuICBmdW5jdGlvbiBldmVudENvbnN0cnVjdG9yKCkge1xuICAgIGlmICh0eXBlb2Ygd2luZG93LkN1c3RvbUV2ZW50ID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiB3aW5kb3cuQ3VzdG9tRXZlbnQ7XG4gICAgLy8gSUU8PTkgU3VwcG9ydFxuICAgIGZ1bmN0aW9uIEN1c3RvbUV2ZW50KGV2ZW50LCBwYXJhbXMpIHtcbiAgICAgIHBhcmFtcyA9IHBhcmFtcyB8fCB7YnViYmxlczogZmFsc2UsIGNhbmNlbGFibGU6IGZhbHNlLCBkZXRhaWw6IHVuZGVmaW5lZH07XG4gICAgICB2YXIgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG4gICAgICBldnQuaW5pdEN1c3RvbUV2ZW50KGV2ZW50LCBwYXJhbXMuYnViYmxlcywgcGFyYW1zLmNhbmNlbGFibGUsIHBhcmFtcy5kZXRhaWwpO1xuICAgICAgcmV0dXJuIGV2dDtcbiAgICB9XG4gICAgQ3VzdG9tRXZlbnQucHJvdG90eXBlID0gd2luZG93LkV2ZW50LnByb3RvdHlwZTtcbiAgICByZXR1cm4gQ3VzdG9tRXZlbnQ7XG4gIH1cblxuICBmdW5jdGlvbiBidWlsZEhpZGRlbklucHV0KG5hbWUsIHZhbHVlKSB7XG4gICAgdmFyIGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIGlucHV0LnR5cGUgPSBcImhpZGRlblwiO1xuICAgIGlucHV0Lm5hbWUgPSBuYW1lO1xuICAgIGlucHV0LnZhbHVlID0gdmFsdWU7XG4gICAgcmV0dXJuIGlucHV0O1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlQ2xpY2soZWxlbWVudCwgdGFyZ2V0TW9kaWZpZXJLZXkpIHtcbiAgICB2YXIgdG8gPSBlbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtdG9cIiksXG4gICAgICAgIG1ldGhvZCA9IGJ1aWxkSGlkZGVuSW5wdXQoXCJfbWV0aG9kXCIsIGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1tZXRob2RcIikpLFxuICAgICAgICBjc3JmID0gYnVpbGRIaWRkZW5JbnB1dChcIl9jc3JmX3Rva2VuXCIsIGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1jc3JmXCIpKSxcbiAgICAgICAgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb3JtXCIpLFxuICAgICAgICBzdWJtaXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiksXG4gICAgICAgIHRhcmdldCA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwidGFyZ2V0XCIpO1xuXG4gICAgZm9ybS5tZXRob2QgPSAoZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLW1ldGhvZFwiKSA9PT0gXCJnZXRcIikgPyBcImdldFwiIDogXCJwb3N0XCI7XG4gICAgZm9ybS5hY3Rpb24gPSB0bztcbiAgICBmb3JtLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblxuICAgIGlmICh0YXJnZXQpIGZvcm0udGFyZ2V0ID0gdGFyZ2V0O1xuICAgIGVsc2UgaWYgKHRhcmdldE1vZGlmaWVyS2V5KSBmb3JtLnRhcmdldCA9IFwiX2JsYW5rXCI7XG5cbiAgICBmb3JtLmFwcGVuZENoaWxkKGNzcmYpO1xuICAgIGZvcm0uYXBwZW5kQ2hpbGQobWV0aG9kKTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGZvcm0pO1xuXG4gICAgLy8gSW5zZXJ0IGEgYnV0dG9uIGFuZCBjbGljayBpdCBpbnN0ZWFkIG9mIHVzaW5nIGBmb3JtLnN1Ym1pdGBcbiAgICAvLyBiZWNhdXNlIHRoZSBgc3VibWl0YCBmdW5jdGlvbiBkb2VzIG5vdCBlbWl0IGEgYHN1Ym1pdGAgZXZlbnQuXG4gICAgc3VibWl0LnR5cGUgPSBcInN1Ym1pdFwiO1xuICAgIGZvcm0uYXBwZW5kQ2hpbGQoc3VibWl0KTtcbiAgICBzdWJtaXQuY2xpY2soKTtcbiAgfVxuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xuICAgIHZhciBlbGVtZW50ID0gZS50YXJnZXQ7XG4gICAgaWYgKGUuZGVmYXVsdFByZXZlbnRlZCkgcmV0dXJuO1xuXG4gICAgd2hpbGUgKGVsZW1lbnQgJiYgZWxlbWVudC5nZXRBdHRyaWJ1dGUpIHtcbiAgICAgIHZhciBwaG9lbml4TGlua0V2ZW50ID0gbmV3IFBvbHlmaWxsRXZlbnQoJ3Bob2VuaXgubGluay5jbGljaycsIHtcbiAgICAgICAgXCJidWJibGVzXCI6IHRydWUsIFwiY2FuY2VsYWJsZVwiOiB0cnVlXG4gICAgICB9KTtcblxuICAgICAgaWYgKCFlbGVtZW50LmRpc3BhdGNoRXZlbnQocGhvZW5peExpbmtFdmVudCkpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmIChlbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtbWV0aG9kXCIpKSB7XG4gICAgICAgIGhhbmRsZUNsaWNrKGVsZW1lbnQsIGUubWV0YUtleSB8fCBlLnNoaWZ0S2V5KTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlO1xuICAgICAgfVxuICAgIH1cbiAgfSwgZmFsc2UpO1xuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwaG9lbml4LmxpbmsuY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgIHZhciBtZXNzYWdlID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1jb25maXJtXCIpO1xuICAgIGlmKG1lc3NhZ2UgJiYgIXdpbmRvdy5jb25maXJtKG1lc3NhZ2UpKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9LCBmYWxzZSk7XG59KSgpO1xuIiwgImV4cG9ydCBjb25zdCBDT05TRUNVVElWRV9SRUxPQURTID0gXCJjb25zZWN1dGl2ZS1yZWxvYWRzXCJcbmV4cG9ydCBjb25zdCBNQVhfUkVMT0FEUyA9IDEwXG5leHBvcnQgY29uc3QgUkVMT0FEX0pJVFRFUl9NSU4gPSA1MDAwXG5leHBvcnQgY29uc3QgUkVMT0FEX0pJVFRFUl9NQVggPSAxMDAwMFxuZXhwb3J0IGNvbnN0IEZBSUxTQUZFX0pJVFRFUiA9IDMwMDAwXG5leHBvcnQgY29uc3QgUEhYX0VWRU5UX0NMQVNTRVMgPSBbXG4gIFwicGh4LWNsaWNrLWxvYWRpbmdcIiwgXCJwaHgtY2hhbmdlLWxvYWRpbmdcIiwgXCJwaHgtc3VibWl0LWxvYWRpbmdcIixcbiAgXCJwaHgta2V5ZG93bi1sb2FkaW5nXCIsIFwicGh4LWtleXVwLWxvYWRpbmdcIiwgXCJwaHgtYmx1ci1sb2FkaW5nXCIsIFwicGh4LWZvY3VzLWxvYWRpbmdcIlxuXVxuZXhwb3J0IGNvbnN0IFBIWF9DT01QT05FTlQgPSBcImRhdGEtcGh4LWNvbXBvbmVudFwiXG5leHBvcnQgY29uc3QgUEhYX0xJVkVfTElOSyA9IFwiZGF0YS1waHgtbGlua1wiXG5leHBvcnQgY29uc3QgUEhYX1RSQUNLX1NUQVRJQyA9IFwidHJhY2stc3RhdGljXCJcbmV4cG9ydCBjb25zdCBQSFhfTElOS19TVEFURSA9IFwiZGF0YS1waHgtbGluay1zdGF0ZVwiXG5leHBvcnQgY29uc3QgUEhYX1JFRiA9IFwiZGF0YS1waHgtcmVmXCJcbmV4cG9ydCBjb25zdCBQSFhfUkVGX1NSQyA9IFwiZGF0YS1waHgtcmVmLXNyY1wiXG5leHBvcnQgY29uc3QgUEhYX1RSQUNLX1VQTE9BRFMgPSBcInRyYWNrLXVwbG9hZHNcIlxuZXhwb3J0IGNvbnN0IFBIWF9VUExPQURfUkVGID0gXCJkYXRhLXBoeC11cGxvYWQtcmVmXCJcbmV4cG9ydCBjb25zdCBQSFhfUFJFRkxJR0hURURfUkVGUyA9IFwiZGF0YS1waHgtcHJlZmxpZ2h0ZWQtcmVmc1wiXG5leHBvcnQgY29uc3QgUEhYX0RPTkVfUkVGUyA9IFwiZGF0YS1waHgtZG9uZS1yZWZzXCJcbmV4cG9ydCBjb25zdCBQSFhfRFJPUF9UQVJHRVQgPSBcImRyb3AtdGFyZ2V0XCJcbmV4cG9ydCBjb25zdCBQSFhfQUNUSVZFX0VOVFJZX1JFRlMgPSBcImRhdGEtcGh4LWFjdGl2ZS1yZWZzXCJcbmV4cG9ydCBjb25zdCBQSFhfTElWRV9GSUxFX1VQREFURUQgPSBcInBoeDpsaXZlLWZpbGU6dXBkYXRlZFwiXG5leHBvcnQgY29uc3QgUEhYX1NLSVAgPSBcImRhdGEtcGh4LXNraXBcIlxuZXhwb3J0IGNvbnN0IFBIWF9QUlVORSA9IFwiZGF0YS1waHgtcHJ1bmVcIlxuZXhwb3J0IGNvbnN0IFBIWF9QQUdFX0xPQURJTkcgPSBcInBhZ2UtbG9hZGluZ1wiXG5leHBvcnQgY29uc3QgUEhYX0NPTk5FQ1RFRF9DTEFTUyA9IFwicGh4LWNvbm5lY3RlZFwiXG5leHBvcnQgY29uc3QgUEhYX0xPQURJTkdfQ0xBU1MgPSBcInBoeC1sb2FkaW5nXCJcbmV4cG9ydCBjb25zdCBQSFhfTk9fRkVFREJBQ0tfQ0xBU1MgPSBcInBoeC1uby1mZWVkYmFja1wiXG5leHBvcnQgY29uc3QgUEhYX0VSUk9SX0NMQVNTID0gXCJwaHgtZXJyb3JcIlxuZXhwb3J0IGNvbnN0IFBIWF9DTElFTlRfRVJST1JfQ0xBU1MgPSBcInBoeC1jbGllbnQtZXJyb3JcIlxuZXhwb3J0IGNvbnN0IFBIWF9TRVJWRVJfRVJST1JfQ0xBU1MgPSBcInBoeC1zZXJ2ZXItZXJyb3JcIlxuZXhwb3J0IGNvbnN0IFBIWF9QQVJFTlRfSUQgPSBcImRhdGEtcGh4LXBhcmVudC1pZFwiXG5leHBvcnQgY29uc3QgUEhYX01BSU4gPSBcImRhdGEtcGh4LW1haW5cIlxuZXhwb3J0IGNvbnN0IFBIWF9ST09UX0lEID0gXCJkYXRhLXBoeC1yb290LWlkXCJcbmV4cG9ydCBjb25zdCBQSFhfVklFV1BPUlRfVE9QID0gXCJ2aWV3cG9ydC10b3BcIlxuZXhwb3J0IGNvbnN0IFBIWF9WSUVXUE9SVF9CT1RUT00gPSBcInZpZXdwb3J0LWJvdHRvbVwiXG5leHBvcnQgY29uc3QgUEhYX1RSSUdHRVJfQUNUSU9OID0gXCJ0cmlnZ2VyLWFjdGlvblwiXG5leHBvcnQgY29uc3QgUEhYX0ZFRURCQUNLX0ZPUiA9IFwiZmVlZGJhY2stZm9yXCJcbmV4cG9ydCBjb25zdCBQSFhfSEFTX0ZPQ1VTRUQgPSBcInBoeC1oYXMtZm9jdXNlZFwiXG5leHBvcnQgY29uc3QgRk9DVVNBQkxFX0lOUFVUUyA9IFtcInRleHRcIiwgXCJ0ZXh0YXJlYVwiLCBcIm51bWJlclwiLCBcImVtYWlsXCIsIFwicGFzc3dvcmRcIiwgXCJzZWFyY2hcIiwgXCJ0ZWxcIiwgXCJ1cmxcIiwgXCJkYXRlXCIsIFwidGltZVwiLCBcImRhdGV0aW1lLWxvY2FsXCIsIFwiY29sb3JcIiwgXCJyYW5nZVwiXVxuZXhwb3J0IGNvbnN0IENIRUNLQUJMRV9JTlBVVFMgPSBbXCJjaGVja2JveFwiLCBcInJhZGlvXCJdXG5leHBvcnQgY29uc3QgUEhYX0hBU19TVUJNSVRURUQgPSBcInBoeC1oYXMtc3VibWl0dGVkXCJcbmV4cG9ydCBjb25zdCBQSFhfU0VTU0lPTiA9IFwiZGF0YS1waHgtc2Vzc2lvblwiXG5leHBvcnQgY29uc3QgUEhYX1ZJRVdfU0VMRUNUT1IgPSBgWyR7UEhYX1NFU1NJT059XWBcbmV4cG9ydCBjb25zdCBQSFhfU1RJQ0tZID0gXCJkYXRhLXBoeC1zdGlja3lcIlxuZXhwb3J0IGNvbnN0IFBIWF9TVEFUSUMgPSBcImRhdGEtcGh4LXN0YXRpY1wiXG5leHBvcnQgY29uc3QgUEhYX1JFQURPTkxZID0gXCJkYXRhLXBoeC1yZWFkb25seVwiXG5leHBvcnQgY29uc3QgUEhYX0RJU0FCTEVEID0gXCJkYXRhLXBoeC1kaXNhYmxlZFwiXG5leHBvcnQgY29uc3QgUEhYX0RJU0FCTEVfV0lUSCA9IFwiZGlzYWJsZS13aXRoXCJcbmV4cG9ydCBjb25zdCBQSFhfRElTQUJMRV9XSVRIX1JFU1RPUkUgPSBcImRhdGEtcGh4LWRpc2FibGUtd2l0aC1yZXN0b3JlXCJcbmV4cG9ydCBjb25zdCBQSFhfSE9PSyA9IFwiaG9va1wiXG5leHBvcnQgY29uc3QgUEhYX0RFQk9VTkNFID0gXCJkZWJvdW5jZVwiXG5leHBvcnQgY29uc3QgUEhYX1RIUk9UVExFID0gXCJ0aHJvdHRsZVwiXG5leHBvcnQgY29uc3QgUEhYX1VQREFURSA9IFwidXBkYXRlXCJcbmV4cG9ydCBjb25zdCBQSFhfU1RSRUFNID0gXCJzdHJlYW1cIlxuZXhwb3J0IGNvbnN0IFBIWF9TVFJFQU1fUkVGID0gXCJkYXRhLXBoeC1zdHJlYW1cIlxuZXhwb3J0IGNvbnN0IFBIWF9LRVkgPSBcImtleVwiXG5leHBvcnQgY29uc3QgUEhYX1BSSVZBVEUgPSBcInBoeFByaXZhdGVcIlxuZXhwb3J0IGNvbnN0IFBIWF9BVVRPX1JFQ09WRVIgPSBcImF1dG8tcmVjb3ZlclwiXG5leHBvcnQgY29uc3QgUEhYX0xWX0RFQlVHID0gXCJwaHg6bGl2ZS1zb2NrZXQ6ZGVidWdcIlxuZXhwb3J0IGNvbnN0IFBIWF9MVl9QUk9GSUxFID0gXCJwaHg6bGl2ZS1zb2NrZXQ6cHJvZmlsaW5nXCJcbmV4cG9ydCBjb25zdCBQSFhfTFZfTEFURU5DWV9TSU0gPSBcInBoeDpsaXZlLXNvY2tldDpsYXRlbmN5LXNpbVwiXG5leHBvcnQgY29uc3QgUEhYX1BST0dSRVNTID0gXCJwcm9ncmVzc1wiXG5leHBvcnQgY29uc3QgUEhYX01PVU5URUQgPSBcIm1vdW50ZWRcIlxuZXhwb3J0IGNvbnN0IExPQURFUl9USU1FT1VUID0gMVxuZXhwb3J0IGNvbnN0IEJFRk9SRV9VTkxPQURfTE9BREVSX1RJTUVPVVQgPSAyMDBcbmV4cG9ydCBjb25zdCBCSU5ESU5HX1BSRUZJWCA9IFwicGh4LVwiXG5leHBvcnQgY29uc3QgUFVTSF9USU1FT1VUID0gMzAwMDBcbmV4cG9ydCBjb25zdCBMSU5LX0hFQURFUiA9IFwieC1yZXF1ZXN0ZWQtd2l0aFwiXG5leHBvcnQgY29uc3QgUkVTUE9OU0VfVVJMX0hFQURFUiA9IFwieC1yZXNwb25zZS11cmxcIlxuZXhwb3J0IGNvbnN0IERFQk9VTkNFX1RSSUdHRVIgPSBcImRlYm91bmNlLXRyaWdnZXJcIlxuZXhwb3J0IGNvbnN0IFRIUk9UVExFRCA9IFwidGhyb3R0bGVkXCJcbmV4cG9ydCBjb25zdCBERUJPVU5DRV9QUkVWX0tFWSA9IFwiZGVib3VuY2UtcHJldi1rZXlcIlxuZXhwb3J0IGNvbnN0IERFRkFVTFRTID0ge1xuICBkZWJvdW5jZTogMzAwLFxuICB0aHJvdHRsZTogMzAwXG59XG5cbi8vIFJlbmRlcmVkXG5leHBvcnQgY29uc3QgRFlOQU1JQ1MgPSBcImRcIlxuZXhwb3J0IGNvbnN0IFNUQVRJQyA9IFwic1wiXG5leHBvcnQgY29uc3QgQ09NUE9ORU5UUyA9IFwiY1wiXG5leHBvcnQgY29uc3QgRVZFTlRTID0gXCJlXCJcbmV4cG9ydCBjb25zdCBSRVBMWSA9IFwiclwiXG5leHBvcnQgY29uc3QgVElUTEUgPSBcInRcIlxuZXhwb3J0IGNvbnN0IFRFTVBMQVRFUyA9IFwicFwiXG5leHBvcnQgY29uc3QgU1RSRUFNID0gXCJzdHJlYW1cIlxuIiwgImltcG9ydCB7XG4gIGxvZ0Vycm9yXG59IGZyb20gXCIuL3V0aWxzXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW50cnlVcGxvYWRlciB7XG4gIGNvbnN0cnVjdG9yKGVudHJ5LCBjaHVua1NpemUsIGxpdmVTb2NrZXQpe1xuICAgIHRoaXMubGl2ZVNvY2tldCA9IGxpdmVTb2NrZXRcbiAgICB0aGlzLmVudHJ5ID0gZW50cnlcbiAgICB0aGlzLm9mZnNldCA9IDBcbiAgICB0aGlzLmNodW5rU2l6ZSA9IGNodW5rU2l6ZVxuICAgIHRoaXMuY2h1bmtUaW1lciA9IG51bGxcbiAgICB0aGlzLmVycm9yZWQgPSBmYWxzZVxuICAgIHRoaXMudXBsb2FkQ2hhbm5lbCA9IGxpdmVTb2NrZXQuY2hhbm5lbChgbHZ1OiR7ZW50cnkucmVmfWAsIHt0b2tlbjogZW50cnkubWV0YWRhdGEoKX0pXG4gIH1cblxuICBlcnJvcihyZWFzb24pe1xuICAgIGlmKHRoaXMuZXJyb3JlZCl7IHJldHVybiB9XG4gICAgdGhpcy5lcnJvcmVkID0gdHJ1ZVxuICAgIGNsZWFyVGltZW91dCh0aGlzLmNodW5rVGltZXIpXG4gICAgdGhpcy5lbnRyeS5lcnJvcihyZWFzb24pXG4gIH1cblxuICB1cGxvYWQoKXtcbiAgICB0aGlzLnVwbG9hZENoYW5uZWwub25FcnJvcihyZWFzb24gPT4gdGhpcy5lcnJvcihyZWFzb24pKVxuICAgIHRoaXMudXBsb2FkQ2hhbm5lbC5qb2luKClcbiAgICAgIC5yZWNlaXZlKFwib2tcIiwgX2RhdGEgPT4gdGhpcy5yZWFkTmV4dENodW5rKCkpXG4gICAgICAucmVjZWl2ZShcImVycm9yXCIsIHJlYXNvbiA9PiB0aGlzLmVycm9yKHJlYXNvbikpXG4gIH1cblxuICBpc0RvbmUoKXsgcmV0dXJuIHRoaXMub2Zmc2V0ID49IHRoaXMuZW50cnkuZmlsZS5zaXplIH1cblxuICByZWFkTmV4dENodW5rKCl7XG4gICAgbGV0IHJlYWRlciA9IG5ldyB3aW5kb3cuRmlsZVJlYWRlcigpXG4gICAgbGV0IGJsb2IgPSB0aGlzLmVudHJ5LmZpbGUuc2xpY2UodGhpcy5vZmZzZXQsIHRoaXMuY2h1bmtTaXplICsgdGhpcy5vZmZzZXQpXG4gICAgcmVhZGVyLm9ubG9hZCA9IChlKSA9PiB7XG4gICAgICBpZihlLnRhcmdldC5lcnJvciA9PT0gbnVsbCl7XG4gICAgICAgIHRoaXMub2Zmc2V0ICs9IGUudGFyZ2V0LnJlc3VsdC5ieXRlTGVuZ3RoXG4gICAgICAgIHRoaXMucHVzaENodW5rKGUudGFyZ2V0LnJlc3VsdClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBsb2dFcnJvcihcIlJlYWQgZXJyb3I6IFwiICsgZS50YXJnZXQuZXJyb3IpXG4gICAgICB9XG4gICAgfVxuICAgIHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihibG9iKVxuICB9XG5cbiAgcHVzaENodW5rKGNodW5rKXtcbiAgICBpZighdGhpcy51cGxvYWRDaGFubmVsLmlzSm9pbmVkKCkpeyByZXR1cm4gfVxuICAgIHRoaXMudXBsb2FkQ2hhbm5lbC5wdXNoKFwiY2h1bmtcIiwgY2h1bmspXG4gICAgICAucmVjZWl2ZShcIm9rXCIsICgpID0+IHtcbiAgICAgICAgdGhpcy5lbnRyeS5wcm9ncmVzcygodGhpcy5vZmZzZXQgLyB0aGlzLmVudHJ5LmZpbGUuc2l6ZSkgKiAxMDApXG4gICAgICAgIGlmKCF0aGlzLmlzRG9uZSgpKXtcbiAgICAgICAgICB0aGlzLmNodW5rVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMucmVhZE5leHRDaHVuaygpLCB0aGlzLmxpdmVTb2NrZXQuZ2V0TGF0ZW5jeVNpbSgpIHx8IDApXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAucmVjZWl2ZShcImVycm9yXCIsICh7cmVhc29ufSkgPT4gdGhpcy5lcnJvcihyZWFzb24pKVxuICB9XG59XG4iLCAiaW1wb3J0IHtcbiAgUEhYX1ZJRVdfU0VMRUNUT1Jcbn0gZnJvbSBcIi4vY29uc3RhbnRzXCJcblxuaW1wb3J0IEVudHJ5VXBsb2FkZXIgZnJvbSBcIi4vZW50cnlfdXBsb2FkZXJcIlxuXG5leHBvcnQgbGV0IGxvZ0Vycm9yID0gKG1zZywgb2JqKSA9PiBjb25zb2xlLmVycm9yICYmIGNvbnNvbGUuZXJyb3IobXNnLCBvYmopXG5cbmV4cG9ydCBsZXQgaXNDaWQgPSAoY2lkKSA9PiB7XG4gIGxldCB0eXBlID0gdHlwZW9mKGNpZClcbiAgcmV0dXJuIHR5cGUgPT09IFwibnVtYmVyXCIgfHwgKHR5cGUgPT09IFwic3RyaW5nXCIgJiYgL14oMHxbMS05XVxcZCopJC8udGVzdChjaWQpKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGV0ZWN0RHVwbGljYXRlSWRzKCl7XG4gIGxldCBpZHMgPSBuZXcgU2V0KClcbiAgbGV0IGVsZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIipbaWRdXCIpXG4gIGZvcihsZXQgaSA9IDAsIGxlbiA9IGVsZW1zLmxlbmd0aDsgaSA8IGxlbjsgaSsrKXtcbiAgICBpZihpZHMuaGFzKGVsZW1zW2ldLmlkKSl7XG4gICAgICBjb25zb2xlLmVycm9yKGBNdWx0aXBsZSBJRHMgZGV0ZWN0ZWQ6ICR7ZWxlbXNbaV0uaWR9LiBFbnN1cmUgdW5pcXVlIGVsZW1lbnQgaWRzLmApXG4gICAgfSBlbHNlIHtcbiAgICAgIGlkcy5hZGQoZWxlbXNbaV0uaWQpXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBsZXQgZGVidWcgPSAodmlldywga2luZCwgbXNnLCBvYmopID0+IHtcbiAgaWYodmlldy5saXZlU29ja2V0LmlzRGVidWdFbmFibGVkKCkpe1xuICAgIGNvbnNvbGUubG9nKGAke3ZpZXcuaWR9ICR7a2luZH06ICR7bXNnfSAtIGAsIG9iailcbiAgfVxufVxuXG4vLyB3cmFwcyB2YWx1ZSBpbiBjbG9zdXJlIG9yIHJldHVybnMgY2xvc3VyZVxuZXhwb3J0IGxldCBjbG9zdXJlID0gKHZhbCkgPT4gdHlwZW9mIHZhbCA9PT0gXCJmdW5jdGlvblwiID8gdmFsIDogZnVuY3Rpb24gKCl7IHJldHVybiB2YWwgfVxuXG5leHBvcnQgbGV0IGNsb25lID0gKG9iaikgPT4geyByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYmopKSB9XG5cbmV4cG9ydCBsZXQgY2xvc2VzdFBoeEJpbmRpbmcgPSAoZWwsIGJpbmRpbmcsIGJvcmRlckVsKSA9PiB7XG4gIGRvIHtcbiAgICBpZihlbC5tYXRjaGVzKGBbJHtiaW5kaW5nfV1gKSAmJiAhZWwuZGlzYWJsZWQpeyByZXR1cm4gZWwgfVxuICAgIGVsID0gZWwucGFyZW50RWxlbWVudCB8fCBlbC5wYXJlbnROb2RlXG4gIH0gd2hpbGUoZWwgIT09IG51bGwgJiYgZWwubm9kZVR5cGUgPT09IDEgJiYgISgoYm9yZGVyRWwgJiYgYm9yZGVyRWwuaXNTYW1lTm9kZShlbCkpIHx8IGVsLm1hdGNoZXMoUEhYX1ZJRVdfU0VMRUNUT1IpKSlcbiAgcmV0dXJuIG51bGxcbn1cblxuZXhwb3J0IGxldCBpc09iamVjdCA9IChvYmopID0+IHtcbiAgcmV0dXJuIG9iaiAhPT0gbnVsbCAmJiB0eXBlb2Ygb2JqID09PSBcIm9iamVjdFwiICYmICEob2JqIGluc3RhbmNlb2YgQXJyYXkpXG59XG5cbmV4cG9ydCBsZXQgaXNFcXVhbE9iaiA9IChvYmoxLCBvYmoyKSA9PiBKU09OLnN0cmluZ2lmeShvYmoxKSA9PT0gSlNPTi5zdHJpbmdpZnkob2JqMilcblxuZXhwb3J0IGxldCBpc0VtcHR5ID0gKG9iaikgPT4ge1xuICBmb3IobGV0IHggaW4gb2JqKXsgcmV0dXJuIGZhbHNlIH1cbiAgcmV0dXJuIHRydWVcbn1cblxuZXhwb3J0IGxldCBtYXliZSA9IChlbCwgY2FsbGJhY2spID0+IGVsICYmIGNhbGxiYWNrKGVsKVxuXG5leHBvcnQgbGV0IGNoYW5uZWxVcGxvYWRlciA9IGZ1bmN0aW9uIChlbnRyaWVzLCBvbkVycm9yLCByZXNwLCBsaXZlU29ja2V0KXtcbiAgZW50cmllcy5mb3JFYWNoKGVudHJ5ID0+IHtcbiAgICBsZXQgZW50cnlVcGxvYWRlciA9IG5ldyBFbnRyeVVwbG9hZGVyKGVudHJ5LCByZXNwLmNvbmZpZy5jaHVua19zaXplLCBsaXZlU29ja2V0KVxuICAgIGVudHJ5VXBsb2FkZXIudXBsb2FkKClcbiAgfSlcbn1cbiIsICJsZXQgQnJvd3NlciA9IHtcbiAgY2FuUHVzaFN0YXRlKCl7IHJldHVybiAodHlwZW9mIChoaXN0b3J5LnB1c2hTdGF0ZSkgIT09IFwidW5kZWZpbmVkXCIpIH0sXG5cbiAgZHJvcExvY2FsKGxvY2FsU3RvcmFnZSwgbmFtZXNwYWNlLCBzdWJrZXkpe1xuICAgIHJldHVybiBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSh0aGlzLmxvY2FsS2V5KG5hbWVzcGFjZSwgc3Via2V5KSlcbiAgfSxcblxuICB1cGRhdGVMb2NhbChsb2NhbFN0b3JhZ2UsIG5hbWVzcGFjZSwgc3Via2V5LCBpbml0aWFsLCBmdW5jKXtcbiAgICBsZXQgY3VycmVudCA9IHRoaXMuZ2V0TG9jYWwobG9jYWxTdG9yYWdlLCBuYW1lc3BhY2UsIHN1YmtleSlcbiAgICBsZXQga2V5ID0gdGhpcy5sb2NhbEtleShuYW1lc3BhY2UsIHN1YmtleSlcbiAgICBsZXQgbmV3VmFsID0gY3VycmVudCA9PT0gbnVsbCA/IGluaXRpYWwgOiBmdW5jKGN1cnJlbnQpXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBKU09OLnN0cmluZ2lmeShuZXdWYWwpKVxuICAgIHJldHVybiBuZXdWYWxcbiAgfSxcblxuICBnZXRMb2NhbChsb2NhbFN0b3JhZ2UsIG5hbWVzcGFjZSwgc3Via2V5KXtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLmxvY2FsS2V5KG5hbWVzcGFjZSwgc3Via2V5KSkpXG4gIH0sXG5cbiAgdXBkYXRlQ3VycmVudFN0YXRlKGNhbGxiYWNrKXtcbiAgICBpZighdGhpcy5jYW5QdXNoU3RhdGUoKSl7IHJldHVybiB9XG4gICAgaGlzdG9yeS5yZXBsYWNlU3RhdGUoY2FsbGJhY2soaGlzdG9yeS5zdGF0ZSB8fCB7fSksIFwiXCIsIHdpbmRvdy5sb2NhdGlvbi5ocmVmKVxuICB9LFxuXG4gIHB1c2hTdGF0ZShraW5kLCBtZXRhLCB0byl7XG4gICAgaWYodGhpcy5jYW5QdXNoU3RhdGUoKSl7XG4gICAgICBpZih0byAhPT0gd2luZG93LmxvY2F0aW9uLmhyZWYpe1xuICAgICAgICBpZihtZXRhLnR5cGUgPT0gXCJyZWRpcmVjdFwiICYmIG1ldGEuc2Nyb2xsKXtcbiAgICAgICAgICAvLyBJZiB3ZSdyZSByZWRpcmVjdGluZyBzdG9yZSB0aGUgY3VycmVudCBzY3JvbGxZIGZvciB0aGUgY3VycmVudCBoaXN0b3J5IHN0YXRlLlxuICAgICAgICAgIGxldCBjdXJyZW50U3RhdGUgPSBoaXN0b3J5LnN0YXRlIHx8IHt9XG4gICAgICAgICAgY3VycmVudFN0YXRlLnNjcm9sbCA9IG1ldGEuc2Nyb2xsXG4gICAgICAgICAgaGlzdG9yeS5yZXBsYWNlU3RhdGUoY3VycmVudFN0YXRlLCBcIlwiLCB3aW5kb3cubG9jYXRpb24uaHJlZilcbiAgICAgICAgfVxuXG4gICAgICAgIGRlbGV0ZSBtZXRhLnNjcm9sbCAvLyBPbmx5IHN0b3JlIHRoZSBzY3JvbGwgaW4gdGhlIHJlZGlyZWN0IGNhc2UuXG4gICAgICAgIGhpc3Rvcnlba2luZCArIFwiU3RhdGVcIl0obWV0YSwgXCJcIiwgdG8gfHwgbnVsbCkgLy8gSUUgd2lsbCBjb2VyY2UgdW5kZWZpbmVkIHRvIHN0cmluZ1xuICAgICAgICBsZXQgaGFzaEVsID0gdGhpcy5nZXRIYXNoVGFyZ2V0RWwod2luZG93LmxvY2F0aW9uLmhhc2gpXG5cbiAgICAgICAgaWYoaGFzaEVsKXtcbiAgICAgICAgICBoYXNoRWwuc2Nyb2xsSW50b1ZpZXcoKVxuICAgICAgICB9IGVsc2UgaWYobWV0YS50eXBlID09PSBcInJlZGlyZWN0XCIpe1xuICAgICAgICAgIHdpbmRvdy5zY3JvbGwoMCwgMClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlZGlyZWN0KHRvKVxuICAgIH1cbiAgfSxcblxuICBzZXRDb29raWUobmFtZSwgdmFsdWUpe1xuICAgIGRvY3VtZW50LmNvb2tpZSA9IGAke25hbWV9PSR7dmFsdWV9YFxuICB9LFxuXG4gIGdldENvb2tpZShuYW1lKXtcbiAgICByZXR1cm4gZG9jdW1lbnQuY29va2llLnJlcGxhY2UobmV3IFJlZ0V4cChgKD86KD86XnwuKjtcXHMqKSR7bmFtZX1cXHMqXFw9XFxzKihbXjtdKikuKiQpfF4uKiRgKSwgXCIkMVwiKVxuICB9LFxuXG4gIHJlZGlyZWN0KHRvVVJMLCBmbGFzaCl7XG4gICAgaWYoZmxhc2gpeyBCcm93c2VyLnNldENvb2tpZShcIl9fcGhvZW5peF9mbGFzaF9fXCIsIGZsYXNoICsgXCI7IG1heC1hZ2U9NjAwMDA7IHBhdGg9L1wiKSB9XG4gICAgd2luZG93LmxvY2F0aW9uID0gdG9VUkxcbiAgfSxcblxuICBsb2NhbEtleShuYW1lc3BhY2UsIHN1YmtleSl7IHJldHVybiBgJHtuYW1lc3BhY2V9LSR7c3Via2V5fWAgfSxcblxuICBnZXRIYXNoVGFyZ2V0RWwobWF5YmVIYXNoKXtcbiAgICBsZXQgaGFzaCA9IG1heWJlSGFzaC50b1N0cmluZygpLnN1YnN0cmluZygxKVxuICAgIGlmKGhhc2ggPT09IFwiXCIpeyByZXR1cm4gfVxuICAgIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChoYXNoKSB8fCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBhW25hbWU9XCIke2hhc2h9XCJdYClcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCcm93c2VyXG4iLCAiaW1wb3J0IHtcbiAgQ0hFQ0tBQkxFX0lOUFVUUyxcbiAgREVCT1VOQ0VfUFJFVl9LRVksXG4gIERFQk9VTkNFX1RSSUdHRVIsXG4gIEZPQ1VTQUJMRV9JTlBVVFMsXG4gIFBIWF9DT01QT05FTlQsXG4gIFBIWF9FVkVOVF9DTEFTU0VTLFxuICBQSFhfSEFTX0ZPQ1VTRUQsXG4gIFBIWF9IQVNfU1VCTUlUVEVELFxuICBQSFhfTUFJTixcbiAgUEhYX05PX0ZFRURCQUNLX0NMQVNTLFxuICBQSFhfUEFSRU5UX0lELFxuICBQSFhfUFJJVkFURSxcbiAgUEhYX1JFRixcbiAgUEhYX1JFRl9TUkMsXG4gIFBIWF9ST09UX0lELFxuICBQSFhfU0VTU0lPTixcbiAgUEhYX1NUQVRJQyxcbiAgUEhYX1VQTE9BRF9SRUYsXG4gIFBIWF9WSUVXX1NFTEVDVE9SLFxuICBQSFhfU1RJQ0tZLFxuICBUSFJPVFRMRURcbn0gZnJvbSBcIi4vY29uc3RhbnRzXCJcblxuaW1wb3J0IHtcbiAgbG9nRXJyb3Jcbn0gZnJvbSBcIi4vdXRpbHNcIlxuXG5sZXQgRE9NID0ge1xuICBieUlkKGlkKXsgcmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKSB8fCBsb2dFcnJvcihgbm8gaWQgZm91bmQgZm9yICR7aWR9YCkgfSxcblxuICByZW1vdmVDbGFzcyhlbCwgY2xhc3NOYW1lKXtcbiAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSlcbiAgICBpZihlbC5jbGFzc0xpc3QubGVuZ3RoID09PSAwKXsgZWwucmVtb3ZlQXR0cmlidXRlKFwiY2xhc3NcIikgfVxuICB9LFxuXG4gIGFsbChub2RlLCBxdWVyeSwgY2FsbGJhY2spe1xuICAgIGlmKCFub2RlKXsgcmV0dXJuIFtdIH1cbiAgICBsZXQgYXJyYXkgPSBBcnJheS5mcm9tKG5vZGUucXVlcnlTZWxlY3RvckFsbChxdWVyeSkpXG4gICAgcmV0dXJuIGNhbGxiYWNrID8gYXJyYXkuZm9yRWFjaChjYWxsYmFjaykgOiBhcnJheVxuICB9LFxuXG4gIGNoaWxkTm9kZUxlbmd0aChodG1sKXtcbiAgICBsZXQgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIilcbiAgICB0ZW1wbGF0ZS5pbm5lckhUTUwgPSBodG1sXG4gICAgcmV0dXJuIHRlbXBsYXRlLmNvbnRlbnQuY2hpbGRFbGVtZW50Q291bnRcbiAgfSxcblxuICBpc1VwbG9hZElucHV0KGVsKXsgcmV0dXJuIGVsLnR5cGUgPT09IFwiZmlsZVwiICYmIGVsLmdldEF0dHJpYnV0ZShQSFhfVVBMT0FEX1JFRikgIT09IG51bGwgfSxcblxuICBmaW5kVXBsb2FkSW5wdXRzKG5vZGUpeyByZXR1cm4gdGhpcy5hbGwobm9kZSwgYGlucHV0W3R5cGU9XCJmaWxlXCJdWyR7UEhYX1VQTE9BRF9SRUZ9XWApIH0sXG5cbiAgZmluZENvbXBvbmVudE5vZGVMaXN0KG5vZGUsIGNpZCl7XG4gICAgcmV0dXJuIHRoaXMuZmlsdGVyV2l0aGluU2FtZUxpdmVWaWV3KHRoaXMuYWxsKG5vZGUsIGBbJHtQSFhfQ09NUE9ORU5UfT1cIiR7Y2lkfVwiXWApLCBub2RlKVxuICB9LFxuXG4gIGlzUGh4RGVzdHJveWVkKG5vZGUpe1xuICAgIHJldHVybiBub2RlLmlkICYmIERPTS5wcml2YXRlKG5vZGUsIFwiZGVzdHJveWVkXCIpID8gdHJ1ZSA6IGZhbHNlXG4gIH0sXG5cbiAgd2FudHNOZXdUYWIoZSl7XG4gICAgbGV0IHdhbnRzTmV3VGFiID0gZS5jdHJsS2V5IHx8IGUuc2hpZnRLZXkgfHwgZS5tZXRhS2V5IHx8IChlLmJ1dHRvbiAmJiBlLmJ1dHRvbiA9PT0gMSlcbiAgICBsZXQgaXNEb3dubG9hZCA9IChlLnRhcmdldCBpbnN0YW5jZW9mIEhUTUxBbmNob3JFbGVtZW50ICYmIGUudGFyZ2V0Lmhhc0F0dHJpYnV0ZShcImRvd25sb2FkXCIpKVxuICAgIGxldCBpc1RhcmdldEJsYW5rID0gZS50YXJnZXQuaGFzQXR0cmlidXRlKFwidGFyZ2V0XCIpICYmIGUudGFyZ2V0LmdldEF0dHJpYnV0ZShcInRhcmdldFwiKS50b0xvd2VyQ2FzZSgpID09PSBcIl9ibGFua1wiXG4gICAgcmV0dXJuIHdhbnRzTmV3VGFiIHx8IGlzVGFyZ2V0QmxhbmsgfHwgaXNEb3dubG9hZFxuICB9LFxuXG4gIGlzVW5sb2FkYWJsZUZvcm1TdWJtaXQoZSl7XG4gICAgcmV0dXJuICFlLmRlZmF1bHRQcmV2ZW50ZWQgJiYgIXRoaXMud2FudHNOZXdUYWIoZSlcbiAgfSxcblxuICBpc05ld1BhZ2VDbGljayhlLCBjdXJyZW50TG9jYXRpb24pe1xuICAgIGxldCBocmVmID0gZS50YXJnZXQgaW5zdGFuY2VvZiBIVE1MQW5jaG9yRWxlbWVudCA/IGUudGFyZ2V0LmdldEF0dHJpYnV0ZShcImhyZWZcIikgOiBudWxsXG4gICAgbGV0IHVybFxuXG4gICAgaWYoZS5kZWZhdWx0UHJldmVudGVkIHx8IGhyZWYgPT09IG51bGwgfHwgdGhpcy53YW50c05ld1RhYihlKSl7IHJldHVybiBmYWxzZSB9XG4gICAgaWYoaHJlZi5zdGFydHNXaXRoKFwibWFpbHRvOlwiKSB8fCBocmVmLnN0YXJ0c1dpdGgoXCJ0ZWw6XCIpKXsgcmV0dXJuIGZhbHNlIH1cblxuICAgIHRyeSB7XG4gICAgICB1cmwgPSBuZXcgVVJMKGhyZWYpXG4gICAgfSBjYXRjaChlKSB7XG4gICAgICB0cnkge1xuICAgICAgICB1cmwgPSBuZXcgVVJMKGhyZWYsIGN1cnJlbnRMb2NhdGlvbilcbiAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAvLyBiYWQgVVJMLCBmYWxsYmFjayB0byBsZXQgYnJvd3NlciB0cnkgaXQgYXMgZXh0ZXJuYWxcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZih1cmwuaG9zdCA9PT0gY3VycmVudExvY2F0aW9uLmhvc3QgJiYgdXJsLnByb3RvY29sID09PSBjdXJyZW50TG9jYXRpb24ucHJvdG9jb2wpe1xuICAgICAgaWYodXJsLnBhdGhuYW1lID09PSBjdXJyZW50TG9jYXRpb24ucGF0aG5hbWUgJiYgdXJsLnNlYXJjaCA9PT0gY3VycmVudExvY2F0aW9uLnNlYXJjaCl7XG4gICAgICAgIHJldHVybiB1cmwuaGFzaCA9PT0gXCJcIiAmJiAhdXJsLmhyZWYuZW5kc1dpdGgoXCIjXCIpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB1cmwucHJvdG9jb2wuc3RhcnRzV2l0aChcImh0dHBcIilcbiAgfSxcblxuICBtYXJrUGh4Q2hpbGREZXN0cm95ZWQoZWwpe1xuICAgIGlmKHRoaXMuaXNQaHhDaGlsZChlbCkpeyBlbC5zZXRBdHRyaWJ1dGUoUEhYX1NFU1NJT04sIFwiXCIpIH1cbiAgICB0aGlzLnB1dFByaXZhdGUoZWwsIFwiZGVzdHJveWVkXCIsIHRydWUpXG4gIH0sXG5cbiAgZmluZFBoeENoaWxkcmVuSW5GcmFnbWVudChodG1sLCBwYXJlbnRJZCl7XG4gICAgbGV0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRlbXBsYXRlXCIpXG4gICAgdGVtcGxhdGUuaW5uZXJIVE1MID0gaHRtbFxuICAgIHJldHVybiB0aGlzLmZpbmRQaHhDaGlsZHJlbih0ZW1wbGF0ZS5jb250ZW50LCBwYXJlbnRJZClcbiAgfSxcblxuICBpc0lnbm9yZWQoZWwsIHBoeFVwZGF0ZSl7XG4gICAgcmV0dXJuIChlbC5nZXRBdHRyaWJ1dGUocGh4VXBkYXRlKSB8fCBlbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBoeC11cGRhdGVcIikpID09PSBcImlnbm9yZVwiXG4gIH0sXG5cbiAgaXNQaHhVcGRhdGUoZWwsIHBoeFVwZGF0ZSwgdXBkYXRlVHlwZXMpe1xuICAgIHJldHVybiBlbC5nZXRBdHRyaWJ1dGUgJiYgdXBkYXRlVHlwZXMuaW5kZXhPZihlbC5nZXRBdHRyaWJ1dGUocGh4VXBkYXRlKSkgPj0gMFxuICB9LFxuXG4gIGZpbmRQaHhTdGlja3koZWwpeyByZXR1cm4gdGhpcy5hbGwoZWwsIGBbJHtQSFhfU1RJQ0tZfV1gKSB9LFxuXG4gIGZpbmRQaHhDaGlsZHJlbihlbCwgcGFyZW50SWQpe1xuICAgIHJldHVybiB0aGlzLmFsbChlbCwgYCR7UEhYX1ZJRVdfU0VMRUNUT1J9WyR7UEhYX1BBUkVOVF9JRH09XCIke3BhcmVudElkfVwiXWApXG4gIH0sXG5cbiAgZmluZFBhcmVudENJRHMobm9kZSwgY2lkcyl7XG4gICAgbGV0IGluaXRpYWwgPSBuZXcgU2V0KGNpZHMpXG4gICAgbGV0IHBhcmVudENpZHMgPVxuICAgICAgY2lkcy5yZWR1Y2UoKGFjYywgY2lkKSA9PiB7XG4gICAgICAgIGxldCBzZWxlY3RvciA9IGBbJHtQSFhfQ09NUE9ORU5UfT1cIiR7Y2lkfVwiXSBbJHtQSFhfQ09NUE9ORU5UfV1gXG5cbiAgICAgICAgdGhpcy5maWx0ZXJXaXRoaW5TYW1lTGl2ZVZpZXcodGhpcy5hbGwobm9kZSwgc2VsZWN0b3IpLCBub2RlKVxuICAgICAgICAgIC5tYXAoZWwgPT4gcGFyc2VJbnQoZWwuZ2V0QXR0cmlidXRlKFBIWF9DT01QT05FTlQpKSlcbiAgICAgICAgICAuZm9yRWFjaChjaGlsZENJRCA9PiBhY2MuZGVsZXRlKGNoaWxkQ0lEKSlcblxuICAgICAgICByZXR1cm4gYWNjXG4gICAgICB9LCBpbml0aWFsKVxuXG4gICAgcmV0dXJuIHBhcmVudENpZHMuc2l6ZSA9PT0gMCA/IG5ldyBTZXQoY2lkcykgOiBwYXJlbnRDaWRzXG4gIH0sXG5cbiAgZmlsdGVyV2l0aGluU2FtZUxpdmVWaWV3KG5vZGVzLCBwYXJlbnQpe1xuICAgIGlmKHBhcmVudC5xdWVyeVNlbGVjdG9yKFBIWF9WSUVXX1NFTEVDVE9SKSl7XG4gICAgICByZXR1cm4gbm9kZXMuZmlsdGVyKGVsID0+IHRoaXMud2l0aGluU2FtZUxpdmVWaWV3KGVsLCBwYXJlbnQpKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbm9kZXNcbiAgICB9XG4gIH0sXG5cbiAgd2l0aGluU2FtZUxpdmVWaWV3KG5vZGUsIHBhcmVudCl7XG4gICAgd2hpbGUobm9kZSA9IG5vZGUucGFyZW50Tm9kZSl7XG4gICAgICBpZihub2RlLmlzU2FtZU5vZGUocGFyZW50KSl7IHJldHVybiB0cnVlIH1cbiAgICAgIGlmKG5vZGUuZ2V0QXR0cmlidXRlKFBIWF9TRVNTSU9OKSAhPT0gbnVsbCl7IHJldHVybiBmYWxzZSB9XG4gICAgfVxuICB9LFxuXG4gIHByaXZhdGUoZWwsIGtleSl7IHJldHVybiBlbFtQSFhfUFJJVkFURV0gJiYgZWxbUEhYX1BSSVZBVEVdW2tleV0gfSxcblxuICBkZWxldGVQcml2YXRlKGVsLCBrZXkpeyBlbFtQSFhfUFJJVkFURV0gJiYgZGVsZXRlIChlbFtQSFhfUFJJVkFURV1ba2V5XSkgfSxcblxuICBwdXRQcml2YXRlKGVsLCBrZXksIHZhbHVlKXtcbiAgICBpZighZWxbUEhYX1BSSVZBVEVdKXsgZWxbUEhYX1BSSVZBVEVdID0ge30gfVxuICAgIGVsW1BIWF9QUklWQVRFXVtrZXldID0gdmFsdWVcbiAgfSxcblxuICB1cGRhdGVQcml2YXRlKGVsLCBrZXksIGRlZmF1bHRWYWwsIHVwZGF0ZUZ1bmMpe1xuICAgIGxldCBleGlzdGluZyA9IHRoaXMucHJpdmF0ZShlbCwga2V5KVxuICAgIGlmKGV4aXN0aW5nID09PSB1bmRlZmluZWQpe1xuICAgICAgdGhpcy5wdXRQcml2YXRlKGVsLCBrZXksIHVwZGF0ZUZ1bmMoZGVmYXVsdFZhbCkpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucHV0UHJpdmF0ZShlbCwga2V5LCB1cGRhdGVGdW5jKGV4aXN0aW5nKSlcbiAgICB9XG4gIH0sXG5cbiAgY29weVByaXZhdGVzKHRhcmdldCwgc291cmNlKXtcbiAgICBpZihzb3VyY2VbUEhYX1BSSVZBVEVdKXtcbiAgICAgIHRhcmdldFtQSFhfUFJJVkFURV0gPSBzb3VyY2VbUEhYX1BSSVZBVEVdXG4gICAgfVxuICB9LFxuXG4gIHB1dFRpdGxlKHN0cil7XG4gICAgbGV0IHRpdGxlRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwidGl0bGVcIilcbiAgICBpZih0aXRsZUVsKXtcbiAgICAgIGxldCB7cHJlZml4LCBzdWZmaXh9ID0gdGl0bGVFbC5kYXRhc2V0XG4gICAgICBkb2N1bWVudC50aXRsZSA9IGAke3ByZWZpeCB8fCBcIlwifSR7c3RyfSR7c3VmZml4IHx8IFwiXCJ9YFxuICAgIH0gZWxzZSB7XG4gICAgICBkb2N1bWVudC50aXRsZSA9IHN0clxuICAgIH1cbiAgfSxcblxuICBkZWJvdW5jZShlbCwgZXZlbnQsIHBoeERlYm91bmNlLCBkZWZhdWx0RGVib3VuY2UsIHBoeFRocm90dGxlLCBkZWZhdWx0VGhyb3R0bGUsIGFzeW5jRmlsdGVyLCBjYWxsYmFjayl7XG4gICAgbGV0IGRlYm91bmNlID0gZWwuZ2V0QXR0cmlidXRlKHBoeERlYm91bmNlKVxuICAgIGxldCB0aHJvdHRsZSA9IGVsLmdldEF0dHJpYnV0ZShwaHhUaHJvdHRsZSlcblxuICAgIGlmKGRlYm91bmNlID09PSBcIlwiKXsgZGVib3VuY2UgPSBkZWZhdWx0RGVib3VuY2UgfVxuICAgIGlmKHRocm90dGxlID09PSBcIlwiKXsgdGhyb3R0bGUgPSBkZWZhdWx0VGhyb3R0bGUgfVxuICAgIGxldCB2YWx1ZSA9IGRlYm91bmNlIHx8IHRocm90dGxlXG4gICAgc3dpdGNoKHZhbHVlKXtcbiAgICAgIGNhc2UgbnVsbDogcmV0dXJuIGNhbGxiYWNrKClcblxuICAgICAgY2FzZSBcImJsdXJcIjpcbiAgICAgICAgaWYodGhpcy5vbmNlKGVsLCBcImRlYm91bmNlLWJsdXJcIikpe1xuICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJibHVyXCIsICgpID0+IGNhbGxiYWNrKCkpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuXG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGxldCB0aW1lb3V0ID0gcGFyc2VJbnQodmFsdWUpXG4gICAgICAgIGxldCB0cmlnZ2VyID0gKCkgPT4gdGhyb3R0bGUgPyB0aGlzLmRlbGV0ZVByaXZhdGUoZWwsIFRIUk9UVExFRCkgOiBjYWxsYmFjaygpXG4gICAgICAgIGxldCBjdXJyZW50Q3ljbGUgPSB0aGlzLmluY0N5Y2xlKGVsLCBERUJPVU5DRV9UUklHR0VSLCB0cmlnZ2VyKVxuICAgICAgICBpZihpc05hTih0aW1lb3V0KSl7IHJldHVybiBsb2dFcnJvcihgaW52YWxpZCB0aHJvdHRsZS9kZWJvdW5jZSB2YWx1ZTogJHt2YWx1ZX1gKSB9XG4gICAgICAgIGlmKHRocm90dGxlKXtcbiAgICAgICAgICBsZXQgbmV3S2V5RG93biA9IGZhbHNlXG4gICAgICAgICAgaWYoZXZlbnQudHlwZSA9PT0gXCJrZXlkb3duXCIpe1xuICAgICAgICAgICAgbGV0IHByZXZLZXkgPSB0aGlzLnByaXZhdGUoZWwsIERFQk9VTkNFX1BSRVZfS0VZKVxuICAgICAgICAgICAgdGhpcy5wdXRQcml2YXRlKGVsLCBERUJPVU5DRV9QUkVWX0tFWSwgZXZlbnQua2V5KVxuICAgICAgICAgICAgbmV3S2V5RG93biA9IHByZXZLZXkgIT09IGV2ZW50LmtleVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmKCFuZXdLZXlEb3duICYmIHRoaXMucHJpdmF0ZShlbCwgVEhST1RUTEVEKSl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FsbGJhY2soKVxuICAgICAgICAgICAgdGhpcy5wdXRQcml2YXRlKGVsLCBUSFJPVFRMRUQsIHRydWUpXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgaWYoYXN5bmNGaWx0ZXIoKSl7IHRoaXMudHJpZ2dlckN5Y2xlKGVsLCBERUJPVU5DRV9UUklHR0VSKSB9XG4gICAgICAgICAgICB9LCB0aW1lb3V0KVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGlmKGFzeW5jRmlsdGVyKCkpeyB0aGlzLnRyaWdnZXJDeWNsZShlbCwgREVCT1VOQ0VfVFJJR0dFUiwgY3VycmVudEN5Y2xlKSB9XG4gICAgICAgICAgfSwgdGltZW91dClcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBmb3JtID0gZWwuZm9ybVxuICAgICAgICBpZihmb3JtICYmIHRoaXMub25jZShmb3JtLCBcImJpbmQtZGVib3VuY2VcIikpe1xuICAgICAgICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoKSA9PiB7XG4gICAgICAgICAgICBBcnJheS5mcm9tKChuZXcgRm9ybURhdGEoZm9ybSkpLmVudHJpZXMoKSwgKFtuYW1lXSkgPT4ge1xuICAgICAgICAgICAgICBsZXQgaW5wdXQgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoYFtuYW1lPVwiJHtuYW1lfVwiXWApXG4gICAgICAgICAgICAgIHRoaXMuaW5jQ3ljbGUoaW5wdXQsIERFQk9VTkNFX1RSSUdHRVIpXG4gICAgICAgICAgICAgIHRoaXMuZGVsZXRlUHJpdmF0ZShpbnB1dCwgVEhST1RUTEVEKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMub25jZShlbCwgXCJiaW5kLWRlYm91bmNlXCIpKXtcbiAgICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKFwiYmx1clwiLCAoKSA9PiB0aGlzLnRyaWdnZXJDeWNsZShlbCwgREVCT1VOQ0VfVFJJR0dFUikpXG4gICAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgdHJpZ2dlckN5Y2xlKGVsLCBrZXksIGN1cnJlbnRDeWNsZSl7XG4gICAgbGV0IFtjeWNsZSwgdHJpZ2dlcl0gPSB0aGlzLnByaXZhdGUoZWwsIGtleSlcbiAgICBpZighY3VycmVudEN5Y2xlKXsgY3VycmVudEN5Y2xlID0gY3ljbGUgfVxuICAgIGlmKGN1cnJlbnRDeWNsZSA9PT0gY3ljbGUpe1xuICAgICAgdGhpcy5pbmNDeWNsZShlbCwga2V5KVxuICAgICAgdHJpZ2dlcigpXG4gICAgfVxuICB9LFxuXG4gIG9uY2UoZWwsIGtleSl7XG4gICAgaWYodGhpcy5wcml2YXRlKGVsLCBrZXkpID09PSB0cnVlKXsgcmV0dXJuIGZhbHNlIH1cbiAgICB0aGlzLnB1dFByaXZhdGUoZWwsIGtleSwgdHJ1ZSlcbiAgICByZXR1cm4gdHJ1ZVxuICB9LFxuXG4gIGluY0N5Y2xlKGVsLCBrZXksIHRyaWdnZXIgPSBmdW5jdGlvbiAoKXsgfSl7XG4gICAgbGV0IFtjdXJyZW50Q3ljbGVdID0gdGhpcy5wcml2YXRlKGVsLCBrZXkpIHx8IFswLCB0cmlnZ2VyXVxuICAgIGN1cnJlbnRDeWNsZSsrXG4gICAgdGhpcy5wdXRQcml2YXRlKGVsLCBrZXksIFtjdXJyZW50Q3ljbGUsIHRyaWdnZXJdKVxuICAgIHJldHVybiBjdXJyZW50Q3ljbGVcbiAgfSxcblxuICBtYXliZUFkZFByaXZhdGVIb29rcyhlbCwgcGh4Vmlld3BvcnRUb3AsIHBoeFZpZXdwb3J0Qm90dG9tKXtcbiAgICBpZihlbC5oYXNBdHRyaWJ1dGUgJiYgKGVsLmhhc0F0dHJpYnV0ZShwaHhWaWV3cG9ydFRvcCkgfHwgZWwuaGFzQXR0cmlidXRlKHBoeFZpZXdwb3J0Qm90dG9tKSkpe1xuICAgICAgZWwuc2V0QXR0cmlidXRlKFwiZGF0YS1waHgtaG9va1wiLCBcIlBob2VuaXguSW5maW5pdGVTY3JvbGxcIilcbiAgICB9XG4gIH0sXG5cbiAgbWF5YmVIaWRlRmVlZGJhY2soY29udGFpbmVyLCBpbnB1dCwgcGh4RmVlZGJhY2tGb3Ipe1xuICAgIGlmKCEodGhpcy5wcml2YXRlKGlucHV0LCBQSFhfSEFTX0ZPQ1VTRUQpIHx8IHRoaXMucHJpdmF0ZShpbnB1dCwgUEhYX0hBU19TVUJNSVRURUQpKSl7XG4gICAgICBsZXQgZmVlZGJhY2tzID0gW2lucHV0Lm5hbWVdXG4gICAgICBpZihpbnB1dC5uYW1lLmVuZHNXaXRoKFwiW11cIikpeyBmZWVkYmFja3MucHVzaChpbnB1dC5uYW1lLnNsaWNlKDAsIC0yKSkgfVxuICAgICAgbGV0IHNlbGVjdG9yID0gZmVlZGJhY2tzLm1hcChmID0+IGBbJHtwaHhGZWVkYmFja0Zvcn09XCIke2Z9XCJdYCkuam9pbihcIiwgXCIpXG4gICAgICBET00uYWxsKGNvbnRhaW5lciwgc2VsZWN0b3IsIGVsID0+IGVsLmNsYXNzTGlzdC5hZGQoUEhYX05PX0ZFRURCQUNLX0NMQVNTKSlcbiAgICB9XG4gIH0sXG5cbiAgcmVzZXRGb3JtKGZvcm0sIHBoeEZlZWRiYWNrRm9yKXtcbiAgICBBcnJheS5mcm9tKGZvcm0uZWxlbWVudHMpLmZvckVhY2goaW5wdXQgPT4ge1xuICAgICAgbGV0IHF1ZXJ5ID0gYFske3BoeEZlZWRiYWNrRm9yfT1cIiR7aW5wdXQuaWR9XCJdLFxuICAgICAgICAgICAgICAgICAgIFske3BoeEZlZWRiYWNrRm9yfT1cIiR7aW5wdXQubmFtZX1cIl0sXG4gICAgICAgICAgICAgICAgICAgWyR7cGh4RmVlZGJhY2tGb3J9PVwiJHtpbnB1dC5uYW1lLnJlcGxhY2UoL1xcW1xcXSQvLCBcIlwiKX1cIl1gXG5cbiAgICAgIHRoaXMuZGVsZXRlUHJpdmF0ZShpbnB1dCwgUEhYX0hBU19GT0NVU0VEKVxuICAgICAgdGhpcy5kZWxldGVQcml2YXRlKGlucHV0LCBQSFhfSEFTX1NVQk1JVFRFRClcbiAgICAgIHRoaXMuYWxsKGRvY3VtZW50LCBxdWVyeSwgZmVlZGJhY2tFbCA9PiB7XG4gICAgICAgIGZlZWRiYWNrRWwuY2xhc3NMaXN0LmFkZChQSFhfTk9fRkVFREJBQ0tfQ0xBU1MpXG4gICAgICB9KVxuICAgIH0pXG4gIH0sXG5cbiAgc2hvd0Vycm9yKGlucHV0RWwsIHBoeEZlZWRiYWNrRm9yKXtcbiAgICBpZihpbnB1dEVsLmlkIHx8IGlucHV0RWwubmFtZSl7XG4gICAgICB0aGlzLmFsbChpbnB1dEVsLmZvcm0sIGBbJHtwaHhGZWVkYmFja0Zvcn09XCIke2lucHV0RWwuaWR9XCJdLCBbJHtwaHhGZWVkYmFja0Zvcn09XCIke2lucHV0RWwubmFtZX1cIl1gLCAoZWwpID0+IHtcbiAgICAgICAgdGhpcy5yZW1vdmVDbGFzcyhlbCwgUEhYX05PX0ZFRURCQUNLX0NMQVNTKVxuICAgICAgfSlcbiAgICB9XG4gIH0sXG5cbiAgaXNQaHhDaGlsZChub2RlKXtcbiAgICByZXR1cm4gbm9kZS5nZXRBdHRyaWJ1dGUgJiYgbm9kZS5nZXRBdHRyaWJ1dGUoUEhYX1BBUkVOVF9JRClcbiAgfSxcblxuICBpc1BoeFN0aWNreShub2RlKXtcbiAgICByZXR1cm4gbm9kZS5nZXRBdHRyaWJ1dGUgJiYgbm9kZS5nZXRBdHRyaWJ1dGUoUEhYX1NUSUNLWSkgIT09IG51bGxcbiAgfSxcblxuICBmaXJzdFBoeENoaWxkKGVsKXtcbiAgICByZXR1cm4gdGhpcy5pc1BoeENoaWxkKGVsKSA/IGVsIDogdGhpcy5hbGwoZWwsIGBbJHtQSFhfUEFSRU5UX0lEfV1gKVswXVxuICB9LFxuXG4gIGRpc3BhdGNoRXZlbnQodGFyZ2V0LCBuYW1lLCBvcHRzID0ge30pe1xuICAgIGxldCBidWJibGVzID0gb3B0cy5idWJibGVzID09PSB1bmRlZmluZWQgPyB0cnVlIDogISFvcHRzLmJ1YmJsZXNcbiAgICBsZXQgZXZlbnRPcHRzID0ge2J1YmJsZXM6IGJ1YmJsZXMsIGNhbmNlbGFibGU6IHRydWUsIGRldGFpbDogb3B0cy5kZXRhaWwgfHwge319XG4gICAgbGV0IGV2ZW50ID0gbmFtZSA9PT0gXCJjbGlja1wiID8gbmV3IE1vdXNlRXZlbnQoXCJjbGlja1wiLCBldmVudE9wdHMpIDogbmV3IEN1c3RvbUV2ZW50KG5hbWUsIGV2ZW50T3B0cylcbiAgICB0YXJnZXQuZGlzcGF0Y2hFdmVudChldmVudClcbiAgfSxcblxuICBjbG9uZU5vZGUobm9kZSwgaHRtbCl7XG4gICAgaWYodHlwZW9mIChodG1sKSA9PT0gXCJ1bmRlZmluZWRcIil7XG4gICAgICByZXR1cm4gbm9kZS5jbG9uZU5vZGUodHJ1ZSlcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGNsb25lZCA9IG5vZGUuY2xvbmVOb2RlKGZhbHNlKVxuICAgICAgY2xvbmVkLmlubmVySFRNTCA9IGh0bWxcbiAgICAgIHJldHVybiBjbG9uZWRcbiAgICB9XG4gIH0sXG5cbiAgbWVyZ2VBdHRycyh0YXJnZXQsIHNvdXJjZSwgb3B0cyA9IHt9KXtcbiAgICBsZXQgZXhjbHVkZSA9IG9wdHMuZXhjbHVkZSB8fCBbXVxuICAgIGxldCBpc0lnbm9yZWQgPSBvcHRzLmlzSWdub3JlZFxuICAgIGxldCBzb3VyY2VBdHRycyA9IHNvdXJjZS5hdHRyaWJ1dGVzXG4gICAgZm9yKGxldCBpID0gc291cmNlQXR0cnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pe1xuICAgICAgbGV0IG5hbWUgPSBzb3VyY2VBdHRyc1tpXS5uYW1lXG4gICAgICBpZihleGNsdWRlLmluZGV4T2YobmFtZSkgPCAwKXsgdGFyZ2V0LnNldEF0dHJpYnV0ZShuYW1lLCBzb3VyY2UuZ2V0QXR0cmlidXRlKG5hbWUpKSB9XG4gICAgfVxuXG4gICAgbGV0IHRhcmdldEF0dHJzID0gdGFyZ2V0LmF0dHJpYnV0ZXNcbiAgICBmb3IobGV0IGkgPSB0YXJnZXRBdHRycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSl7XG4gICAgICBsZXQgbmFtZSA9IHRhcmdldEF0dHJzW2ldLm5hbWVcbiAgICAgIGlmKGlzSWdub3JlZCl7XG4gICAgICAgIGlmKG5hbWUuc3RhcnRzV2l0aChcImRhdGEtXCIpICYmICFzb3VyY2UuaGFzQXR0cmlidXRlKG5hbWUpKXsgdGFyZ2V0LnJlbW92ZUF0dHJpYnV0ZShuYW1lKSB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZighc291cmNlLmhhc0F0dHJpYnV0ZShuYW1lKSl7IHRhcmdldC5yZW1vdmVBdHRyaWJ1dGUobmFtZSkgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBtZXJnZUZvY3VzZWRJbnB1dCh0YXJnZXQsIHNvdXJjZSl7XG4gICAgLy8gc2tpcCBzZWxlY3RzIGJlY2F1c2UgRkYgd2lsbCByZXNldCBoaWdobGlnaHRlZCBpbmRleCBmb3IgYW55IHNldEF0dHJpYnV0ZVxuICAgIGlmKCEodGFyZ2V0IGluc3RhbmNlb2YgSFRNTFNlbGVjdEVsZW1lbnQpKXsgRE9NLm1lcmdlQXR0cnModGFyZ2V0LCBzb3VyY2UsIHtleGNsdWRlOiBbXCJ2YWx1ZVwiXX0pIH1cbiAgICBpZihzb3VyY2UucmVhZE9ubHkpe1xuICAgICAgdGFyZ2V0LnNldEF0dHJpYnV0ZShcInJlYWRvbmx5XCIsIHRydWUpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRhcmdldC5yZW1vdmVBdHRyaWJ1dGUoXCJyZWFkb25seVwiKVxuICAgIH1cbiAgfSxcblxuICBoYXNTZWxlY3Rpb25SYW5nZShlbCl7XG4gICAgcmV0dXJuIGVsLnNldFNlbGVjdGlvblJhbmdlICYmIChlbC50eXBlID09PSBcInRleHRcIiB8fCBlbC50eXBlID09PSBcInRleHRhcmVhXCIpXG4gIH0sXG5cbiAgcmVzdG9yZUZvY3VzKGZvY3VzZWQsIHNlbGVjdGlvblN0YXJ0LCBzZWxlY3Rpb25FbmQpe1xuICAgIGlmKCFET00uaXNUZXh0dWFsSW5wdXQoZm9jdXNlZCkpeyByZXR1cm4gfVxuICAgIGxldCB3YXNGb2N1c2VkID0gZm9jdXNlZC5tYXRjaGVzKFwiOmZvY3VzXCIpXG4gICAgaWYoZm9jdXNlZC5yZWFkT25seSl7IGZvY3VzZWQuYmx1cigpIH1cbiAgICBpZighd2FzRm9jdXNlZCl7IGZvY3VzZWQuZm9jdXMoKSB9XG4gICAgaWYodGhpcy5oYXNTZWxlY3Rpb25SYW5nZShmb2N1c2VkKSl7XG4gICAgICBmb2N1c2VkLnNldFNlbGVjdGlvblJhbmdlKHNlbGVjdGlvblN0YXJ0LCBzZWxlY3Rpb25FbmQpXG4gICAgfVxuICB9LFxuXG4gIGlzRm9ybUlucHV0KGVsKXsgcmV0dXJuIC9eKD86aW5wdXR8c2VsZWN0fHRleHRhcmVhKSQvaS50ZXN0KGVsLnRhZ05hbWUpICYmIGVsLnR5cGUgIT09IFwiYnV0dG9uXCIgfSxcblxuICBzeW5jQXR0cnNUb1Byb3BzKGVsKXtcbiAgICBpZihlbCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQgJiYgQ0hFQ0tBQkxFX0lOUFVUUy5pbmRleE9mKGVsLnR5cGUudG9Mb2NhbGVMb3dlckNhc2UoKSkgPj0gMCl7XG4gICAgICBlbC5jaGVja2VkID0gZWwuZ2V0QXR0cmlidXRlKFwiY2hlY2tlZFwiKSAhPT0gbnVsbFxuICAgIH1cbiAgfSxcblxuICBpc1RleHR1YWxJbnB1dChlbCl7IHJldHVybiBGT0NVU0FCTEVfSU5QVVRTLmluZGV4T2YoZWwudHlwZSkgPj0gMCB9LFxuXG4gIGlzTm93VHJpZ2dlckZvcm1FeHRlcm5hbChlbCwgcGh4VHJpZ2dlckV4dGVybmFsKXtcbiAgICByZXR1cm4gZWwuZ2V0QXR0cmlidXRlICYmIGVsLmdldEF0dHJpYnV0ZShwaHhUcmlnZ2VyRXh0ZXJuYWwpICE9PSBudWxsXG4gIH0sXG5cbiAgc3luY1BlbmRpbmdSZWYoZnJvbUVsLCB0b0VsLCBkaXNhYmxlV2l0aCl7XG4gICAgbGV0IHJlZiA9IGZyb21FbC5nZXRBdHRyaWJ1dGUoUEhYX1JFRilcbiAgICBpZihyZWYgPT09IG51bGwpeyByZXR1cm4gdHJ1ZSB9XG4gICAgbGV0IHJlZlNyYyA9IGZyb21FbC5nZXRBdHRyaWJ1dGUoUEhYX1JFRl9TUkMpXG5cbiAgICBpZihET00uaXNGb3JtSW5wdXQoZnJvbUVsKSB8fCBmcm9tRWwuZ2V0QXR0cmlidXRlKGRpc2FibGVXaXRoKSAhPT0gbnVsbCl7XG4gICAgICBpZihET00uaXNVcGxvYWRJbnB1dChmcm9tRWwpKXsgRE9NLm1lcmdlQXR0cnMoZnJvbUVsLCB0b0VsLCB7aXNJZ25vcmVkOiB0cnVlfSkgfVxuICAgICAgRE9NLnB1dFByaXZhdGUoZnJvbUVsLCBQSFhfUkVGLCB0b0VsKVxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfSBlbHNlIHtcbiAgICAgIFBIWF9FVkVOVF9DTEFTU0VTLmZvckVhY2goY2xhc3NOYW1lID0+IHtcbiAgICAgICAgZnJvbUVsLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpICYmIHRvRWwuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpXG4gICAgICB9KVxuICAgICAgdG9FbC5zZXRBdHRyaWJ1dGUoUEhYX1JFRiwgcmVmKVxuICAgICAgdG9FbC5zZXRBdHRyaWJ1dGUoUEhYX1JFRl9TUkMsIHJlZlNyYylcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9LFxuXG4gIGNsZWFuQ2hpbGROb2Rlcyhjb250YWluZXIsIHBoeFVwZGF0ZSl7XG4gICAgaWYoRE9NLmlzUGh4VXBkYXRlKGNvbnRhaW5lciwgcGh4VXBkYXRlLCBbXCJhcHBlbmRcIiwgXCJwcmVwZW5kXCJdKSl7XG4gICAgICBsZXQgdG9SZW1vdmUgPSBbXVxuICAgICAgY29udGFpbmVyLmNoaWxkTm9kZXMuZm9yRWFjaChjaGlsZE5vZGUgPT4ge1xuICAgICAgICBpZighY2hpbGROb2RlLmlkKXtcbiAgICAgICAgICAvLyBTa2lwIHdhcm5pbmcgaWYgaXQncyBhbiBlbXB0eSB0ZXh0IG5vZGUgKGUuZy4gYSBuZXctbGluZSlcbiAgICAgICAgICBsZXQgaXNFbXB0eVRleHROb2RlID0gY2hpbGROb2RlLm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERSAmJiBjaGlsZE5vZGUubm9kZVZhbHVlLnRyaW0oKSA9PT0gXCJcIlxuICAgICAgICAgIGlmKCFpc0VtcHR5VGV4dE5vZGUpe1xuICAgICAgICAgICAgbG9nRXJyb3IoXCJvbmx5IEhUTUwgZWxlbWVudCB0YWdzIHdpdGggYW4gaWQgYXJlIGFsbG93ZWQgaW5zaWRlIGNvbnRhaW5lcnMgd2l0aCBwaHgtdXBkYXRlLlxcblxcblwiICtcbiAgICAgICAgICAgICAgYHJlbW92aW5nIGlsbGVnYWwgbm9kZTogXCIkeyhjaGlsZE5vZGUub3V0ZXJIVE1MIHx8IGNoaWxkTm9kZS5ub2RlVmFsdWUpLnRyaW0oKX1cIlxcblxcbmApXG4gICAgICAgICAgfVxuICAgICAgICAgIHRvUmVtb3ZlLnB1c2goY2hpbGROb2RlKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgdG9SZW1vdmUuZm9yRWFjaChjaGlsZE5vZGUgPT4gY2hpbGROb2RlLnJlbW92ZSgpKVxuICAgIH1cbiAgfSxcblxuICByZXBsYWNlUm9vdENvbnRhaW5lcihjb250YWluZXIsIHRhZ05hbWUsIGF0dHJzKXtcbiAgICBsZXQgcmV0YWluZWRBdHRycyA9IG5ldyBTZXQoW1wiaWRcIiwgUEhYX1NFU1NJT04sIFBIWF9TVEFUSUMsIFBIWF9NQUlOLCBQSFhfUk9PVF9JRF0pXG4gICAgaWYoY29udGFpbmVyLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gdGFnTmFtZS50b0xvd2VyQ2FzZSgpKXtcbiAgICAgIEFycmF5LmZyb20oY29udGFpbmVyLmF0dHJpYnV0ZXMpXG4gICAgICAgIC5maWx0ZXIoYXR0ciA9PiAhcmV0YWluZWRBdHRycy5oYXMoYXR0ci5uYW1lLnRvTG93ZXJDYXNlKCkpKVxuICAgICAgICAuZm9yRWFjaChhdHRyID0+IGNvbnRhaW5lci5yZW1vdmVBdHRyaWJ1dGUoYXR0ci5uYW1lKSlcblxuICAgICAgT2JqZWN0LmtleXMoYXR0cnMpXG4gICAgICAgIC5maWx0ZXIobmFtZSA9PiAhcmV0YWluZWRBdHRycy5oYXMobmFtZS50b0xvd2VyQ2FzZSgpKSlcbiAgICAgICAgLmZvckVhY2goYXR0ciA9PiBjb250YWluZXIuc2V0QXR0cmlidXRlKGF0dHIsIGF0dHJzW2F0dHJdKSlcblxuICAgICAgcmV0dXJuIGNvbnRhaW5lclxuXG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBuZXdDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpXG4gICAgICBPYmplY3Qua2V5cyhhdHRycykuZm9yRWFjaChhdHRyID0+IG5ld0NvbnRhaW5lci5zZXRBdHRyaWJ1dGUoYXR0ciwgYXR0cnNbYXR0cl0pKVxuICAgICAgcmV0YWluZWRBdHRycy5mb3JFYWNoKGF0dHIgPT4gbmV3Q29udGFpbmVyLnNldEF0dHJpYnV0ZShhdHRyLCBjb250YWluZXIuZ2V0QXR0cmlidXRlKGF0dHIpKSlcbiAgICAgIG5ld0NvbnRhaW5lci5pbm5lckhUTUwgPSBjb250YWluZXIuaW5uZXJIVE1MXG4gICAgICBjb250YWluZXIucmVwbGFjZVdpdGgobmV3Q29udGFpbmVyKVxuICAgICAgcmV0dXJuIG5ld0NvbnRhaW5lclxuICAgIH1cbiAgfSxcblxuICBnZXRTdGlja3koZWwsIG5hbWUsIGRlZmF1bHRWYWwpe1xuICAgIGxldCBvcCA9IChET00ucHJpdmF0ZShlbCwgXCJzdGlja3lcIikgfHwgW10pLmZpbmQoKFtleGlzdGluZ05hbWUsIF0pID0+IG5hbWUgPT09IGV4aXN0aW5nTmFtZSlcbiAgICBpZihvcCl7XG4gICAgICBsZXQgW19uYW1lLCBfb3AsIHN0YXNoZWRSZXN1bHRdID0gb3BcbiAgICAgIHJldHVybiBzdGFzaGVkUmVzdWx0XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0eXBlb2YoZGVmYXVsdFZhbCkgPT09IFwiZnVuY3Rpb25cIiA/IGRlZmF1bHRWYWwoKSA6IGRlZmF1bHRWYWxcbiAgICB9XG4gIH0sXG5cbiAgZGVsZXRlU3RpY2t5KGVsLCBuYW1lKXtcbiAgICB0aGlzLnVwZGF0ZVByaXZhdGUoZWwsIFwic3RpY2t5XCIsIFtdLCBvcHMgPT4ge1xuICAgICAgcmV0dXJuIG9wcy5maWx0ZXIoKFtleGlzdGluZ05hbWUsIF9dKSA9PiBleGlzdGluZ05hbWUgIT09IG5hbWUpXG4gICAgfSlcbiAgfSxcblxuICBwdXRTdGlja3koZWwsIG5hbWUsIG9wKXtcbiAgICBsZXQgc3Rhc2hlZFJlc3VsdCA9IG9wKGVsKVxuICAgIHRoaXMudXBkYXRlUHJpdmF0ZShlbCwgXCJzdGlja3lcIiwgW10sIG9wcyA9PiB7XG4gICAgICBsZXQgZXhpc3RpbmdJbmRleCA9IG9wcy5maW5kSW5kZXgoKFtleGlzdGluZ05hbWUsIF0pID0+IG5hbWUgPT09IGV4aXN0aW5nTmFtZSlcbiAgICAgIGlmKGV4aXN0aW5nSW5kZXggPj0gMCl7XG4gICAgICAgIG9wc1tleGlzdGluZ0luZGV4XSA9IFtuYW1lLCBvcCwgc3Rhc2hlZFJlc3VsdF1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9wcy5wdXNoKFtuYW1lLCBvcCwgc3Rhc2hlZFJlc3VsdF0pXG4gICAgICB9XG4gICAgICByZXR1cm4gb3BzXG4gICAgfSlcbiAgfSxcblxuICBhcHBseVN0aWNreU9wZXJhdGlvbnMoZWwpe1xuICAgIGxldCBvcHMgPSBET00ucHJpdmF0ZShlbCwgXCJzdGlja3lcIilcbiAgICBpZighb3BzKXsgcmV0dXJuIH1cblxuICAgIG9wcy5mb3JFYWNoKChbbmFtZSwgb3AsIF9zdGFzaGVkXSkgPT4gdGhpcy5wdXRTdGlja3koZWwsIG5hbWUsIG9wKSlcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBET01cbiIsICJpbXBvcnQge1xuICBQSFhfQUNUSVZFX0VOVFJZX1JFRlMsXG4gIFBIWF9MSVZFX0ZJTEVfVVBEQVRFRCxcbiAgUEhYX1BSRUZMSUdIVEVEX1JFRlNcbn0gZnJvbSBcIi4vY29uc3RhbnRzXCJcblxuaW1wb3J0IHtcbiAgY2hhbm5lbFVwbG9hZGVyLFxuICBsb2dFcnJvclxufSBmcm9tIFwiLi91dGlsc1wiXG5cbmltcG9ydCBMaXZlVXBsb2FkZXIgZnJvbSBcIi4vbGl2ZV91cGxvYWRlclwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVwbG9hZEVudHJ5IHtcbiAgc3RhdGljIGlzQWN0aXZlKGZpbGVFbCwgZmlsZSl7XG4gICAgbGV0IGlzTmV3ID0gZmlsZS5fcGh4UmVmID09PSB1bmRlZmluZWRcbiAgICBsZXQgYWN0aXZlUmVmcyA9IGZpbGVFbC5nZXRBdHRyaWJ1dGUoUEhYX0FDVElWRV9FTlRSWV9SRUZTKS5zcGxpdChcIixcIilcbiAgICBsZXQgaXNBY3RpdmUgPSBhY3RpdmVSZWZzLmluZGV4T2YoTGl2ZVVwbG9hZGVyLmdlbkZpbGVSZWYoZmlsZSkpID49IDBcbiAgICByZXR1cm4gZmlsZS5zaXplID4gMCAmJiAoaXNOZXcgfHwgaXNBY3RpdmUpXG4gIH1cblxuICBzdGF0aWMgaXNQcmVmbGlnaHRlZChmaWxlRWwsIGZpbGUpe1xuICAgIGxldCBwcmVmbGlnaHRlZFJlZnMgPSBmaWxlRWwuZ2V0QXR0cmlidXRlKFBIWF9QUkVGTElHSFRFRF9SRUZTKS5zcGxpdChcIixcIilcbiAgICBsZXQgaXNQcmVmbGlnaHRlZCA9IHByZWZsaWdodGVkUmVmcy5pbmRleE9mKExpdmVVcGxvYWRlci5nZW5GaWxlUmVmKGZpbGUpKSA+PSAwXG4gICAgcmV0dXJuIGlzUHJlZmxpZ2h0ZWQgJiYgdGhpcy5pc0FjdGl2ZShmaWxlRWwsIGZpbGUpXG4gIH1cblxuICBjb25zdHJ1Y3RvcihmaWxlRWwsIGZpbGUsIHZpZXcpe1xuICAgIHRoaXMucmVmID0gTGl2ZVVwbG9hZGVyLmdlbkZpbGVSZWYoZmlsZSlcbiAgICB0aGlzLmZpbGVFbCA9IGZpbGVFbFxuICAgIHRoaXMuZmlsZSA9IGZpbGVcbiAgICB0aGlzLnZpZXcgPSB2aWV3XG4gICAgdGhpcy5tZXRhID0gbnVsbFxuICAgIHRoaXMuX2lzQ2FuY2VsbGVkID0gZmFsc2VcbiAgICB0aGlzLl9pc0RvbmUgPSBmYWxzZVxuICAgIHRoaXMuX3Byb2dyZXNzID0gMFxuICAgIHRoaXMuX2xhc3RQcm9ncmVzc1NlbnQgPSAtMVxuICAgIHRoaXMuX29uRG9uZSA9IGZ1bmN0aW9uICgpeyB9XG4gICAgdGhpcy5fb25FbFVwZGF0ZWQgPSB0aGlzLm9uRWxVcGRhdGVkLmJpbmQodGhpcylcbiAgICB0aGlzLmZpbGVFbC5hZGRFdmVudExpc3RlbmVyKFBIWF9MSVZFX0ZJTEVfVVBEQVRFRCwgdGhpcy5fb25FbFVwZGF0ZWQpXG4gIH1cblxuICBtZXRhZGF0YSgpeyByZXR1cm4gdGhpcy5tZXRhIH1cblxuICBwcm9ncmVzcyhwcm9ncmVzcyl7XG4gICAgdGhpcy5fcHJvZ3Jlc3MgPSBNYXRoLmZsb29yKHByb2dyZXNzKVxuICAgIGlmKHRoaXMuX3Byb2dyZXNzID4gdGhpcy5fbGFzdFByb2dyZXNzU2VudCl7XG4gICAgICBpZih0aGlzLl9wcm9ncmVzcyA+PSAxMDApe1xuICAgICAgICB0aGlzLl9wcm9ncmVzcyA9IDEwMFxuICAgICAgICB0aGlzLl9sYXN0UHJvZ3Jlc3NTZW50ID0gMTAwXG4gICAgICAgIHRoaXMuX2lzRG9uZSA9IHRydWVcbiAgICAgICAgdGhpcy52aWV3LnB1c2hGaWxlUHJvZ3Jlc3ModGhpcy5maWxlRWwsIHRoaXMucmVmLCAxMDAsICgpID0+IHtcbiAgICAgICAgICBMaXZlVXBsb2FkZXIudW50cmFja0ZpbGUodGhpcy5maWxlRWwsIHRoaXMuZmlsZSlcbiAgICAgICAgICB0aGlzLl9vbkRvbmUoKVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fbGFzdFByb2dyZXNzU2VudCA9IHRoaXMuX3Byb2dyZXNzXG4gICAgICAgIHRoaXMudmlldy5wdXNoRmlsZVByb2dyZXNzKHRoaXMuZmlsZUVsLCB0aGlzLnJlZiwgdGhpcy5fcHJvZ3Jlc3MpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY2FuY2VsKCl7XG4gICAgdGhpcy5faXNDYW5jZWxsZWQgPSB0cnVlXG4gICAgdGhpcy5faXNEb25lID0gdHJ1ZVxuICAgIHRoaXMuX29uRG9uZSgpXG4gIH1cblxuICBpc0RvbmUoKXsgcmV0dXJuIHRoaXMuX2lzRG9uZSB9XG5cbiAgZXJyb3IocmVhc29uID0gXCJmYWlsZWRcIil7XG4gICAgdGhpcy5maWxlRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihQSFhfTElWRV9GSUxFX1VQREFURUQsIHRoaXMuX29uRWxVcGRhdGVkKVxuICAgIHRoaXMudmlldy5wdXNoRmlsZVByb2dyZXNzKHRoaXMuZmlsZUVsLCB0aGlzLnJlZiwge2Vycm9yOiByZWFzb259KVxuICAgIExpdmVVcGxvYWRlci5jbGVhckZpbGVzKHRoaXMuZmlsZUVsKVxuICB9XG5cbiAgLy9wcml2YXRlXG5cbiAgb25Eb25lKGNhbGxiYWNrKXtcbiAgICB0aGlzLl9vbkRvbmUgPSAoKSA9PiB7XG4gICAgICB0aGlzLmZpbGVFbC5yZW1vdmVFdmVudExpc3RlbmVyKFBIWF9MSVZFX0ZJTEVfVVBEQVRFRCwgdGhpcy5fb25FbFVwZGF0ZWQpXG4gICAgICBjYWxsYmFjaygpXG4gICAgfVxuICB9XG5cbiAgb25FbFVwZGF0ZWQoKXtcbiAgICBsZXQgYWN0aXZlUmVmcyA9IHRoaXMuZmlsZUVsLmdldEF0dHJpYnV0ZShQSFhfQUNUSVZFX0VOVFJZX1JFRlMpLnNwbGl0KFwiLFwiKVxuICAgIGlmKGFjdGl2ZVJlZnMuaW5kZXhPZih0aGlzLnJlZikgPT09IC0xKXsgdGhpcy5jYW5jZWwoKSB9XG4gIH1cblxuICB0b1ByZWZsaWdodFBheWxvYWQoKXtcbiAgICByZXR1cm4ge1xuICAgICAgbGFzdF9tb2RpZmllZDogdGhpcy5maWxlLmxhc3RNb2RpZmllZCxcbiAgICAgIG5hbWU6IHRoaXMuZmlsZS5uYW1lLFxuICAgICAgcmVsYXRpdmVfcGF0aDogdGhpcy5maWxlLndlYmtpdFJlbGF0aXZlUGF0aCxcbiAgICAgIHNpemU6IHRoaXMuZmlsZS5zaXplLFxuICAgICAgdHlwZTogdGhpcy5maWxlLnR5cGUsXG4gICAgICByZWY6IHRoaXMucmVmXG4gICAgfVxuICB9XG5cbiAgdXBsb2FkZXIodXBsb2FkZXJzKXtcbiAgICBpZih0aGlzLm1ldGEudXBsb2FkZXIpe1xuICAgICAgbGV0IGNhbGxiYWNrID0gdXBsb2FkZXJzW3RoaXMubWV0YS51cGxvYWRlcl0gfHwgbG9nRXJyb3IoYG5vIHVwbG9hZGVyIGNvbmZpZ3VyZWQgZm9yICR7dGhpcy5tZXRhLnVwbG9hZGVyfWApXG4gICAgICByZXR1cm4ge25hbWU6IHRoaXMubWV0YS51cGxvYWRlciwgY2FsbGJhY2s6IGNhbGxiYWNrfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4ge25hbWU6IFwiY2hhbm5lbFwiLCBjYWxsYmFjazogY2hhbm5lbFVwbG9hZGVyfVxuICAgIH1cbiAgfVxuXG4gIHppcFBvc3RGbGlnaHQocmVzcCl7XG4gICAgdGhpcy5tZXRhID0gcmVzcC5lbnRyaWVzW3RoaXMucmVmXVxuICAgIGlmKCF0aGlzLm1ldGEpeyBsb2dFcnJvcihgbm8gcHJlZmxpZ2h0IHVwbG9hZCByZXNwb25zZSByZXR1cm5lZCB3aXRoIHJlZiAke3RoaXMucmVmfWAsIHtpbnB1dDogdGhpcy5maWxlRWwsIHJlc3BvbnNlOiByZXNwfSkgfVxuICB9XG59XG4iLCAiaW1wb3J0IHtcbiAgUEhYX0RPTkVfUkVGUyxcbiAgUEhYX1BSRUZMSUdIVEVEX1JFRlMsXG4gIFBIWF9VUExPQURfUkVGXG59IGZyb20gXCIuL2NvbnN0YW50c1wiXG5cbmltcG9ydCB7XG59IGZyb20gXCIuL3V0aWxzXCJcblxuaW1wb3J0IERPTSBmcm9tIFwiLi9kb21cIlxuaW1wb3J0IFVwbG9hZEVudHJ5IGZyb20gXCIuL3VwbG9hZF9lbnRyeVwiXG5cbmxldCBsaXZlVXBsb2FkZXJGaWxlUmVmID0gMFxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaXZlVXBsb2FkZXIge1xuICBzdGF0aWMgZ2VuRmlsZVJlZihmaWxlKXtcbiAgICBsZXQgcmVmID0gZmlsZS5fcGh4UmVmXG4gICAgaWYocmVmICE9PSB1bmRlZmluZWQpe1xuICAgICAgcmV0dXJuIHJlZlxuICAgIH0gZWxzZSB7XG4gICAgICBmaWxlLl9waHhSZWYgPSAobGl2ZVVwbG9hZGVyRmlsZVJlZisrKS50b1N0cmluZygpXG4gICAgICByZXR1cm4gZmlsZS5fcGh4UmVmXG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGdldEVudHJ5RGF0YVVSTChpbnB1dEVsLCByZWYsIGNhbGxiYWNrKXtcbiAgICBsZXQgZmlsZSA9IHRoaXMuYWN0aXZlRmlsZXMoaW5wdXRFbCkuZmluZChmaWxlID0+IHRoaXMuZ2VuRmlsZVJlZihmaWxlKSA9PT0gcmVmKVxuICAgIGNhbGxiYWNrKFVSTC5jcmVhdGVPYmplY3RVUkwoZmlsZSkpXG4gIH1cblxuICBzdGF0aWMgaGFzVXBsb2Fkc0luUHJvZ3Jlc3MoZm9ybUVsKXtcbiAgICBsZXQgYWN0aXZlID0gMFxuICAgIERPTS5maW5kVXBsb2FkSW5wdXRzKGZvcm1FbCkuZm9yRWFjaChpbnB1dCA9PiB7XG4gICAgICBpZihpbnB1dC5nZXRBdHRyaWJ1dGUoUEhYX1BSRUZMSUdIVEVEX1JFRlMpICE9PSBpbnB1dC5nZXRBdHRyaWJ1dGUoUEhYX0RPTkVfUkVGUykpe1xuICAgICAgICBhY3RpdmUrK1xuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIGFjdGl2ZSA+IDBcbiAgfVxuXG4gIHN0YXRpYyBzZXJpYWxpemVVcGxvYWRzKGlucHV0RWwpe1xuICAgIGxldCBmaWxlcyA9IHRoaXMuYWN0aXZlRmlsZXMoaW5wdXRFbClcbiAgICBsZXQgZmlsZURhdGEgPSB7fVxuICAgIGZpbGVzLmZvckVhY2goZmlsZSA9PiB7XG4gICAgICBsZXQgZW50cnkgPSB7cGF0aDogaW5wdXRFbC5uYW1lfVxuICAgICAgbGV0IHVwbG9hZFJlZiA9IGlucHV0RWwuZ2V0QXR0cmlidXRlKFBIWF9VUExPQURfUkVGKVxuICAgICAgZmlsZURhdGFbdXBsb2FkUmVmXSA9IGZpbGVEYXRhW3VwbG9hZFJlZl0gfHwgW11cbiAgICAgIGVudHJ5LnJlZiA9IHRoaXMuZ2VuRmlsZVJlZihmaWxlKVxuICAgICAgZW50cnkubGFzdF9tb2RpZmllZCA9IGZpbGUubGFzdE1vZGlmaWVkXG4gICAgICBlbnRyeS5uYW1lID0gZmlsZS5uYW1lIHx8IGVudHJ5LnJlZlxuICAgICAgZW50cnkucmVsYXRpdmVfcGF0aCA9IGZpbGUud2Via2l0UmVsYXRpdmVQYXRoXG4gICAgICBlbnRyeS50eXBlID0gZmlsZS50eXBlXG4gICAgICBlbnRyeS5zaXplID0gZmlsZS5zaXplXG4gICAgICBmaWxlRGF0YVt1cGxvYWRSZWZdLnB1c2goZW50cnkpXG4gICAgfSlcbiAgICByZXR1cm4gZmlsZURhdGFcbiAgfVxuXG4gIHN0YXRpYyBjbGVhckZpbGVzKGlucHV0RWwpe1xuICAgIGlucHV0RWwudmFsdWUgPSBudWxsXG4gICAgaW5wdXRFbC5yZW1vdmVBdHRyaWJ1dGUoUEhYX1VQTE9BRF9SRUYpXG4gICAgRE9NLnB1dFByaXZhdGUoaW5wdXRFbCwgXCJmaWxlc1wiLCBbXSlcbiAgfVxuXG4gIHN0YXRpYyB1bnRyYWNrRmlsZShpbnB1dEVsLCBmaWxlKXtcbiAgICBET00ucHV0UHJpdmF0ZShpbnB1dEVsLCBcImZpbGVzXCIsIERPTS5wcml2YXRlKGlucHV0RWwsIFwiZmlsZXNcIikuZmlsdGVyKGYgPT4gIU9iamVjdC5pcyhmLCBmaWxlKSkpXG4gIH1cblxuICBzdGF0aWMgdHJhY2tGaWxlcyhpbnB1dEVsLCBmaWxlcywgZGF0YVRyYW5zZmVyKXtcbiAgICBpZihpbnB1dEVsLmdldEF0dHJpYnV0ZShcIm11bHRpcGxlXCIpICE9PSBudWxsKXtcbiAgICAgIGxldCBuZXdGaWxlcyA9IGZpbGVzLmZpbHRlcihmaWxlID0+ICF0aGlzLmFjdGl2ZUZpbGVzKGlucHV0RWwpLmZpbmQoZiA9PiBPYmplY3QuaXMoZiwgZmlsZSkpKVxuICAgICAgRE9NLnB1dFByaXZhdGUoaW5wdXRFbCwgXCJmaWxlc1wiLCB0aGlzLmFjdGl2ZUZpbGVzKGlucHV0RWwpLmNvbmNhdChuZXdGaWxlcykpXG4gICAgICBpbnB1dEVsLnZhbHVlID0gbnVsbFxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBSZXNldCBpbnB1dEVsIGZpbGVzIHRvIGFsaWduIG91dHB1dCB3aXRoIHByb2dyYW1tYXRpYyBjaGFuZ2VzIChpLmUuIGRyYWcgYW5kIGRyb3ApXG4gICAgICBpZihkYXRhVHJhbnNmZXIgJiYgZGF0YVRyYW5zZmVyLmZpbGVzLmxlbmd0aCA+IDApeyBpbnB1dEVsLmZpbGVzID0gZGF0YVRyYW5zZmVyLmZpbGVzIH1cbiAgICAgIERPTS5wdXRQcml2YXRlKGlucHV0RWwsIFwiZmlsZXNcIiwgZmlsZXMpXG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGFjdGl2ZUZpbGVJbnB1dHMoZm9ybUVsKXtcbiAgICBsZXQgZmlsZUlucHV0cyA9IERPTS5maW5kVXBsb2FkSW5wdXRzKGZvcm1FbClcbiAgICByZXR1cm4gQXJyYXkuZnJvbShmaWxlSW5wdXRzKS5maWx0ZXIoZWwgPT4gZWwuZmlsZXMgJiYgdGhpcy5hY3RpdmVGaWxlcyhlbCkubGVuZ3RoID4gMClcbiAgfVxuXG4gIHN0YXRpYyBhY3RpdmVGaWxlcyhpbnB1dCl7XG4gICAgcmV0dXJuIChET00ucHJpdmF0ZShpbnB1dCwgXCJmaWxlc1wiKSB8fCBbXSkuZmlsdGVyKGYgPT4gVXBsb2FkRW50cnkuaXNBY3RpdmUoaW5wdXQsIGYpKVxuICB9XG5cbiAgc3RhdGljIGlucHV0c0F3YWl0aW5nUHJlZmxpZ2h0KGZvcm1FbCl7XG4gICAgbGV0IGZpbGVJbnB1dHMgPSBET00uZmluZFVwbG9hZElucHV0cyhmb3JtRWwpXG4gICAgcmV0dXJuIEFycmF5LmZyb20oZmlsZUlucHV0cykuZmlsdGVyKGlucHV0ID0+IHRoaXMuZmlsZXNBd2FpdGluZ1ByZWZsaWdodChpbnB1dCkubGVuZ3RoID4gMClcbiAgfVxuXG4gIHN0YXRpYyBmaWxlc0F3YWl0aW5nUHJlZmxpZ2h0KGlucHV0KXtcbiAgICByZXR1cm4gdGhpcy5hY3RpdmVGaWxlcyhpbnB1dCkuZmlsdGVyKGYgPT4gIVVwbG9hZEVudHJ5LmlzUHJlZmxpZ2h0ZWQoaW5wdXQsIGYpKVxuICB9XG5cbiAgY29uc3RydWN0b3IoaW5wdXRFbCwgdmlldywgb25Db21wbGV0ZSl7XG4gICAgdGhpcy52aWV3ID0gdmlld1xuICAgIHRoaXMub25Db21wbGV0ZSA9IG9uQ29tcGxldGVcbiAgICB0aGlzLl9lbnRyaWVzID1cbiAgICAgIEFycmF5LmZyb20oTGl2ZVVwbG9hZGVyLmZpbGVzQXdhaXRpbmdQcmVmbGlnaHQoaW5wdXRFbCkgfHwgW10pXG4gICAgICAgIC5tYXAoZmlsZSA9PiBuZXcgVXBsb2FkRW50cnkoaW5wdXRFbCwgZmlsZSwgdmlldykpXG5cbiAgICB0aGlzLm51bUVudHJpZXNJblByb2dyZXNzID0gdGhpcy5fZW50cmllcy5sZW5ndGhcbiAgfVxuXG4gIGVudHJpZXMoKXsgcmV0dXJuIHRoaXMuX2VudHJpZXMgfVxuXG4gIGluaXRBZGFwdGVyVXBsb2FkKHJlc3AsIG9uRXJyb3IsIGxpdmVTb2NrZXQpe1xuICAgIHRoaXMuX2VudHJpZXMgPVxuICAgICAgdGhpcy5fZW50cmllcy5tYXAoZW50cnkgPT4ge1xuICAgICAgICBlbnRyeS56aXBQb3N0RmxpZ2h0KHJlc3ApXG4gICAgICAgIGVudHJ5Lm9uRG9uZSgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5udW1FbnRyaWVzSW5Qcm9ncmVzcy0tXG4gICAgICAgICAgaWYodGhpcy5udW1FbnRyaWVzSW5Qcm9ncmVzcyA9PT0gMCl7IHRoaXMub25Db21wbGV0ZSgpIH1cbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIGVudHJ5XG4gICAgICB9KVxuXG4gICAgbGV0IGdyb3VwZWRFbnRyaWVzID0gdGhpcy5fZW50cmllcy5yZWR1Y2UoKGFjYywgZW50cnkpID0+IHtcbiAgICAgIGxldCB7bmFtZSwgY2FsbGJhY2t9ID0gZW50cnkudXBsb2FkZXIobGl2ZVNvY2tldC51cGxvYWRlcnMpXG4gICAgICBhY2NbbmFtZV0gPSBhY2NbbmFtZV0gfHwge2NhbGxiYWNrOiBjYWxsYmFjaywgZW50cmllczogW119XG4gICAgICBhY2NbbmFtZV0uZW50cmllcy5wdXNoKGVudHJ5KVxuICAgICAgcmV0dXJuIGFjY1xuICAgIH0sIHt9KVxuXG4gICAgZm9yKGxldCBuYW1lIGluIGdyb3VwZWRFbnRyaWVzKXtcbiAgICAgIGxldCB7Y2FsbGJhY2ssIGVudHJpZXN9ID0gZ3JvdXBlZEVudHJpZXNbbmFtZV1cbiAgICAgIGNhbGxiYWNrKGVudHJpZXMsIG9uRXJyb3IsIHJlc3AsIGxpdmVTb2NrZXQpXG4gICAgfVxuICB9XG59XG4iLCAibGV0IEFSSUEgPSB7XG4gIGZvY3VzTWFpbigpe1xuICAgIGxldCB0YXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwibWFpbiBoMSwgbWFpbiwgaDFcIilcbiAgICBpZih0YXJnZXQpe1xuICAgICAgbGV0IG9yaWdUYWJJbmRleCA9IHRhcmdldC50YWJJbmRleFxuICAgICAgdGFyZ2V0LnRhYkluZGV4ID0gLTFcbiAgICAgIHRhcmdldC5mb2N1cygpXG4gICAgICB0YXJnZXQudGFiSW5kZXggPSBvcmlnVGFiSW5kZXhcbiAgICB9XG4gIH0sXG5cbiAgYW55T2YoaW5zdGFuY2UsIGNsYXNzZXMpeyByZXR1cm4gY2xhc3Nlcy5maW5kKG5hbWUgPT4gaW5zdGFuY2UgaW5zdGFuY2VvZiBuYW1lKSB9LFxuXG4gIGlzRm9jdXNhYmxlKGVsLCBpbnRlcmFjdGl2ZU9ubHkpe1xuICAgIHJldHVybihcbiAgICAgIChlbCBpbnN0YW5jZW9mIEhUTUxBbmNob3JFbGVtZW50ICYmIGVsLnJlbCAhPT0gXCJpZ25vcmVcIikgfHxcbiAgICAgIChlbCBpbnN0YW5jZW9mIEhUTUxBcmVhRWxlbWVudCAmJiBlbC5ocmVmICE9PSB1bmRlZmluZWQpIHx8XG4gICAgICAoIWVsLmRpc2FibGVkICYmICh0aGlzLmFueU9mKGVsLCBbSFRNTElucHV0RWxlbWVudCwgSFRNTFNlbGVjdEVsZW1lbnQsIEhUTUxUZXh0QXJlYUVsZW1lbnQsIEhUTUxCdXR0b25FbGVtZW50XSkpKSB8fFxuICAgICAgKGVsIGluc3RhbmNlb2YgSFRNTElGcmFtZUVsZW1lbnQpIHx8XG4gICAgICAoZWwudGFiSW5kZXggPiAwIHx8ICghaW50ZXJhY3RpdmVPbmx5ICYmIGVsLnRhYkluZGV4ID09PSAwICYmIGVsLmdldEF0dHJpYnV0ZShcInRhYmluZGV4XCIpICE9PSBudWxsICYmIGVsLmdldEF0dHJpYnV0ZShcImFyaWEtaGlkZGVuXCIpICE9PSBcInRydWVcIikpXG4gICAgKVxuICB9LFxuXG4gIGF0dGVtcHRGb2N1cyhlbCwgaW50ZXJhY3RpdmVPbmx5KXtcbiAgICBpZih0aGlzLmlzRm9jdXNhYmxlKGVsLCBpbnRlcmFjdGl2ZU9ubHkpKXsgdHJ5eyBlbC5mb2N1cygpIH0gY2F0Y2goZSl7fSB9XG4gICAgcmV0dXJuICEhZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50LmlzU2FtZU5vZGUoZWwpXG4gIH0sXG5cbiAgZm9jdXNGaXJzdEludGVyYWN0aXZlKGVsKXtcbiAgICBsZXQgY2hpbGQgPSBlbC5maXJzdEVsZW1lbnRDaGlsZFxuICAgIHdoaWxlKGNoaWxkKXtcbiAgICAgIGlmKHRoaXMuYXR0ZW1wdEZvY3VzKGNoaWxkLCB0cnVlKSB8fCB0aGlzLmZvY3VzRmlyc3RJbnRlcmFjdGl2ZShjaGlsZCwgdHJ1ZSkpe1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuICAgICAgY2hpbGQgPSBjaGlsZC5uZXh0RWxlbWVudFNpYmxpbmdcbiAgICB9XG4gIH0sXG5cbiAgZm9jdXNGaXJzdChlbCl7XG4gICAgbGV0IGNoaWxkID0gZWwuZmlyc3RFbGVtZW50Q2hpbGRcbiAgICB3aGlsZShjaGlsZCl7XG4gICAgICBpZih0aGlzLmF0dGVtcHRGb2N1cyhjaGlsZCkgfHwgdGhpcy5mb2N1c0ZpcnN0KGNoaWxkKSl7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgICBjaGlsZCA9IGNoaWxkLm5leHRFbGVtZW50U2libGluZ1xuICAgIH1cbiAgfSxcblxuICBmb2N1c0xhc3QoZWwpe1xuICAgIGxldCBjaGlsZCA9IGVsLmxhc3RFbGVtZW50Q2hpbGRcbiAgICB3aGlsZShjaGlsZCl7XG4gICAgICBpZih0aGlzLmF0dGVtcHRGb2N1cyhjaGlsZCkgfHwgdGhpcy5mb2N1c0xhc3QoY2hpbGQpKXtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICAgIGNoaWxkID0gY2hpbGQucHJldmlvdXNFbGVtZW50U2libGluZ1xuICAgIH1cbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgQVJJQSIsICJpbXBvcnQge1xuICBQSFhfQUNUSVZFX0VOVFJZX1JFRlMsXG4gIFBIWF9MSVZFX0ZJTEVfVVBEQVRFRCxcbiAgUEhYX1BSRUZMSUdIVEVEX1JFRlMsXG4gIFBIWF9VUExPQURfUkVGXG59IGZyb20gXCIuL2NvbnN0YW50c1wiXG5cbmltcG9ydCBMaXZlVXBsb2FkZXIgZnJvbSBcIi4vbGl2ZV91cGxvYWRlclwiXG5pbXBvcnQgQVJJQSBmcm9tIFwiLi9hcmlhXCJcblxubGV0IEhvb2tzID0ge1xuICBMaXZlRmlsZVVwbG9hZDoge1xuICAgIGFjdGl2ZVJlZnMoKXsgcmV0dXJuIHRoaXMuZWwuZ2V0QXR0cmlidXRlKFBIWF9BQ1RJVkVfRU5UUllfUkVGUykgfSxcblxuICAgIHByZWZsaWdodGVkUmVmcygpeyByZXR1cm4gdGhpcy5lbC5nZXRBdHRyaWJ1dGUoUEhYX1BSRUZMSUdIVEVEX1JFRlMpIH0sXG5cbiAgICBtb3VudGVkKCl7IHRoaXMucHJlZmxpZ2h0ZWRXYXMgPSB0aGlzLnByZWZsaWdodGVkUmVmcygpIH0sXG5cbiAgICB1cGRhdGVkKCl7XG4gICAgICBsZXQgbmV3UHJlZmxpZ2h0cyA9IHRoaXMucHJlZmxpZ2h0ZWRSZWZzKClcbiAgICAgIGlmKHRoaXMucHJlZmxpZ2h0ZWRXYXMgIT09IG5ld1ByZWZsaWdodHMpe1xuICAgICAgICB0aGlzLnByZWZsaWdodGVkV2FzID0gbmV3UHJlZmxpZ2h0c1xuICAgICAgICBpZihuZXdQcmVmbGlnaHRzID09PSBcIlwiKXtcbiAgICAgICAgICB0aGlzLl9fdmlldy5jYW5jZWxTdWJtaXQodGhpcy5lbC5mb3JtKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmKHRoaXMuYWN0aXZlUmVmcygpID09PSBcIlwiKXsgdGhpcy5lbC52YWx1ZSA9IG51bGwgfVxuICAgICAgdGhpcy5lbC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChQSFhfTElWRV9GSUxFX1VQREFURUQpKVxuICAgIH1cbiAgfSxcblxuICBMaXZlSW1nUHJldmlldzoge1xuICAgIG1vdW50ZWQoKXtcbiAgICAgIHRoaXMucmVmID0gdGhpcy5lbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBoeC1lbnRyeS1yZWZcIilcbiAgICAgIHRoaXMuaW5wdXRFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuZWwuZ2V0QXR0cmlidXRlKFBIWF9VUExPQURfUkVGKSlcbiAgICAgIExpdmVVcGxvYWRlci5nZXRFbnRyeURhdGFVUkwodGhpcy5pbnB1dEVsLCB0aGlzLnJlZiwgdXJsID0+IHtcbiAgICAgICAgdGhpcy51cmwgPSB1cmxcbiAgICAgICAgdGhpcy5lbC5zcmMgPSB1cmxcbiAgICAgIH0pXG4gICAgfSxcbiAgICBkZXN0cm95ZWQoKXtcbiAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwodGhpcy51cmwpXG4gICAgfVxuICB9LFxuICBGb2N1c1dyYXA6IHtcbiAgICBtb3VudGVkKCl7XG4gICAgICB0aGlzLmZvY3VzU3RhcnQgPSB0aGlzLmVsLmZpcnN0RWxlbWVudENoaWxkXG4gICAgICB0aGlzLmZvY3VzRW5kID0gdGhpcy5lbC5sYXN0RWxlbWVudENoaWxkXG4gICAgICB0aGlzLmZvY3VzU3RhcnQuYWRkRXZlbnRMaXN0ZW5lcihcImZvY3VzXCIsICgpID0+IEFSSUEuZm9jdXNMYXN0KHRoaXMuZWwpKVxuICAgICAgdGhpcy5mb2N1c0VuZC5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNcIiwgKCkgPT4gQVJJQS5mb2N1c0ZpcnN0KHRoaXMuZWwpKVxuICAgICAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKFwicGh4OnNob3ctZW5kXCIsICgpID0+IHRoaXMuZWwuZm9jdXMoKSlcbiAgICAgIGlmKHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMuZWwpLmRpc3BsYXkgIT09IFwibm9uZVwiKXtcbiAgICAgICAgQVJJQS5mb2N1c0ZpcnN0KHRoaXMuZWwpXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmxldCBzY3JvbGxUb3AgPSAoKSA9PiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wIHx8IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wXG5sZXQgd2luSGVpZ2h0ID0gKCkgPT4gd2luZG93LmlubmVySGVpZ2h0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHRcblxubGV0IGlzQXRWaWV3cG9ydFRvcCA9IChlbCkgPT4ge1xuICBsZXQgcmVjdCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gIHJldHVybiByZWN0LnRvcCA+PSAwICYmIHJlY3QubGVmdCA+PSAwICYmIHJlY3QudG9wIDw9IHdpbkhlaWdodCgpXG59XG5cbmxldCBpc0F0Vmlld3BvcnRCb3R0b20gPSAoZWwpID0+IHtcbiAgbGV0IHJlY3QgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICByZXR1cm4gcmVjdC5yaWdodCA+PSAwICYmIHJlY3QubGVmdCA+PSAwICYmIHJlY3QuYm90dG9tIDw9IHdpbkhlaWdodCgpXG59XG5cbmxldCBpc1dpdGhpblZpZXdwb3J0ID0gKGVsKSA9PiB7XG4gIGxldCByZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgcmV0dXJuIHJlY3QudG9wID49IDAgJiYgcmVjdC5sZWZ0ID49IDAgJiYgcmVjdC50b3AgPD0gd2luSGVpZ2h0KClcbn1cblxuSG9va3MuSW5maW5pdGVTY3JvbGwgPSB7XG4gIG1vdW50ZWQoKXtcbiAgICBsZXQgc2Nyb2xsQmVmb3JlID0gc2Nyb2xsVG9wKClcbiAgICBsZXQgdG9wT3ZlcnJhbiA9IGZhbHNlXG4gICAgbGV0IHRocm90dGxlSW50ZXJ2YWwgPSA1MDBcbiAgICBsZXQgcGVuZGluZ09wID0gbnVsbFxuXG4gICAgbGV0IG9uVG9wT3ZlcnJ1biA9IHRoaXMudGhyb3R0bGUodGhyb3R0bGVJbnRlcnZhbCwgKHRvcEV2ZW50LCBmaXJzdENoaWxkKSA9PiB7XG4gICAgICBwZW5kaW5nT3AgPSAoKSA9PiB0cnVlXG4gICAgICB0aGlzLmxpdmVTb2NrZXQuZXhlY0pTSG9va1B1c2godGhpcy5lbCwgdG9wRXZlbnQsIHtpZDogZmlyc3RDaGlsZC5pZCwgX292ZXJyYW46IHRydWV9LCAoKSA9PiB7XG4gICAgICAgIHBlbmRpbmdPcCA9IG51bGxcbiAgICAgIH0pXG4gICAgfSlcblxuICAgIGxldCBvbkZpcnN0Q2hpbGRBdFRvcCA9IHRoaXMudGhyb3R0bGUodGhyb3R0bGVJbnRlcnZhbCwgKHRvcEV2ZW50LCBmaXJzdENoaWxkKSA9PiB7XG4gICAgICBwZW5kaW5nT3AgPSAoKSA9PiBmaXJzdENoaWxkLnNjcm9sbEludG9WaWV3KHtibG9jazogXCJzdGFydFwifSlcbiAgICAgIHRoaXMubGl2ZVNvY2tldC5leGVjSlNIb29rUHVzaCh0aGlzLmVsLCB0b3BFdmVudCwge2lkOiBmaXJzdENoaWxkLmlkfSwgKCkgPT4ge1xuICAgICAgICBwZW5kaW5nT3AgPSBudWxsXG4gICAgICAgIGlmKCFpc1dpdGhpblZpZXdwb3J0KGZpcnN0Q2hpbGQpKXsgZmlyc3RDaGlsZC5zY3JvbGxJbnRvVmlldyh7YmxvY2s6IFwic3RhcnRcIn0pIH1cbiAgICAgIH0pXG4gICAgfSlcblxuICAgIGxldCBvbkxhc3RDaGlsZEF0Qm90dG9tID0gdGhpcy50aHJvdHRsZSh0aHJvdHRsZUludGVydmFsLCAoYm90dG9tRXZlbnQsIGxhc3RDaGlsZCkgPT4ge1xuICAgICAgcGVuZGluZ09wID0gKCkgPT4gbGFzdENoaWxkLnNjcm9sbEludG9WaWV3KHtibG9jazogXCJlbmRcIn0pXG4gICAgICB0aGlzLmxpdmVTb2NrZXQuZXhlY0pTSG9va1B1c2godGhpcy5lbCwgYm90dG9tRXZlbnQsIHtpZDogbGFzdENoaWxkLmlkfSwgKCkgPT4ge1xuICAgICAgICBwZW5kaW5nT3AgPSBudWxsXG4gICAgICAgIGlmKCFpc1dpdGhpblZpZXdwb3J0KGxhc3RDaGlsZCkpeyBsYXN0Q2hpbGQuc2Nyb2xsSW50b1ZpZXcoe2Jsb2NrOiBcImVuZFwifSkgfVxuICAgICAgfSlcbiAgICB9KVxuXG4gICAgdGhpcy5vblNjcm9sbCA9IChlKSA9PiB7XG4gICAgICBsZXQgc2Nyb2xsTm93ID0gc2Nyb2xsVG9wKClcblxuICAgICAgaWYocGVuZGluZ09wKXtcbiAgICAgICAgc2Nyb2xsQmVmb3JlID0gc2Nyb2xsTm93XG4gICAgICAgIHJldHVybiBwZW5kaW5nT3AoKVxuICAgICAgfVxuICAgICAgbGV0IHJlY3QgPSB0aGlzLmVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICBsZXQgdG9wRXZlbnQgPSB0aGlzLmVsLmdldEF0dHJpYnV0ZSh0aGlzLmxpdmVTb2NrZXQuYmluZGluZyhcInZpZXdwb3J0LXRvcFwiKSlcbiAgICAgIGxldCBib3R0b21FdmVudCA9IHRoaXMuZWwuZ2V0QXR0cmlidXRlKHRoaXMubGl2ZVNvY2tldC5iaW5kaW5nKFwidmlld3BvcnQtYm90dG9tXCIpKVxuICAgICAgbGV0IGxhc3RDaGlsZCA9IHRoaXMuZWwubGFzdEVsZW1lbnRDaGlsZFxuICAgICAgbGV0IGZpcnN0Q2hpbGQgPSB0aGlzLmVsLmZpcnN0RWxlbWVudENoaWxkXG4gICAgICBsZXQgaXNTY3JvbGxpbmdVcCA9IHNjcm9sbE5vdyA8IHNjcm9sbEJlZm9yZVxuICAgICAgbGV0IGlzU2Nyb2xsaW5nRG93biA9IHNjcm9sbE5vdyA+IHNjcm9sbEJlZm9yZVxuXG4gICAgICAvLyBlbCBvdmVycmFuIHdoaWxlIHNjcm9sbGluZyB1cFxuICAgICAgaWYoaXNTY3JvbGxpbmdVcCAmJiB0b3BFdmVudCAmJiAhdG9wT3ZlcnJhbiAmJiByZWN0LnRvcCA+PSAwKXtcbiAgICAgICAgdG9wT3ZlcnJhbiA9IHRydWVcbiAgICAgICAgb25Ub3BPdmVycnVuKHRvcEV2ZW50LCBmaXJzdENoaWxkKVxuICAgICAgfSBlbHNlIGlmKGlzU2Nyb2xsaW5nRG93biAmJiB0b3BPdmVycmFuICYmIHJlY3QudG9wIDw9IDApe1xuICAgICAgICB0b3BPdmVycmFuID0gZmFsc2VcbiAgICAgIH1cblxuICAgICAgaWYodG9wRXZlbnQgJiYgaXNTY3JvbGxpbmdVcCAmJiBpc0F0Vmlld3BvcnRUb3AoZmlyc3RDaGlsZCkpe1xuICAgICAgICBvbkZpcnN0Q2hpbGRBdFRvcCh0b3BFdmVudCwgZmlyc3RDaGlsZClcbiAgICAgIH0gZWxzZSBpZihib3R0b21FdmVudCAmJiBpc1Njcm9sbGluZ0Rvd24gJiYgaXNBdFZpZXdwb3J0Qm90dG9tKGxhc3RDaGlsZCkpe1xuICAgICAgICBvbkxhc3RDaGlsZEF0Qm90dG9tKGJvdHRvbUV2ZW50LCBsYXN0Q2hpbGQpXG4gICAgICB9XG4gICAgICBzY3JvbGxCZWZvcmUgPSBzY3JvbGxOb3dcbiAgICB9XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgdGhpcy5vblNjcm9sbClcbiAgfSxcbiAgZGVzdHJveWVkKCl7IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIHRoaXMub25TY3JvbGwpIH0sXG5cbiAgdGhyb3R0bGUoaW50ZXJ2YWwsIGNhbGxiYWNrKXtcbiAgICBsZXQgbGFzdENhbGxBdCA9IDBcbiAgICBsZXQgdGltZXJcblxuICAgIHJldHVybiAoLi4uYXJncykgPT4ge1xuICAgICAgbGV0IG5vdyA9IERhdGUubm93KClcbiAgICAgIGxldCByZW1haW5pbmdUaW1lID0gaW50ZXJ2YWwgLSAobm93IC0gbGFzdENhbGxBdClcblxuICAgICAgaWYocmVtYWluaW5nVGltZSA8PSAwIHx8IHJlbWFpbmluZ1RpbWUgPiBpbnRlcnZhbCl7XG4gICAgICAgIGlmKHRpbWVyKSB7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxuICAgICAgICAgIHRpbWVyID0gbnVsbFxuICAgICAgICB9XG4gICAgICAgIGxhc3RDYWxsQXQgPSBub3dcbiAgICAgICAgY2FsbGJhY2soLi4uYXJncylcbiAgICAgIH0gZWxzZSBpZighdGltZXIpe1xuICAgICAgICB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGxhc3RDYWxsQXQgPSBEYXRlLm5vdygpXG4gICAgICAgICAgdGltZXIgPSBudWxsXG4gICAgICAgICAgY2FsbGJhY2soLi4uYXJncylcbiAgICAgICAgfSwgcmVtYWluaW5nVGltZSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEhvb2tzXG4iLCAiaW1wb3J0IHtcbiAgbWF5YmVcbn0gZnJvbSBcIi4vdXRpbHNcIlxuXG5pbXBvcnQgRE9NIGZyb20gXCIuL2RvbVwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERPTVBvc3RNb3JwaFJlc3RvcmVyIHtcbiAgY29uc3RydWN0b3IoY29udGFpbmVyQmVmb3JlLCBjb250YWluZXJBZnRlciwgdXBkYXRlVHlwZSl7XG4gICAgbGV0IGlkc0JlZm9yZSA9IG5ldyBTZXQoKVxuICAgIGxldCBpZHNBZnRlciA9IG5ldyBTZXQoWy4uLmNvbnRhaW5lckFmdGVyLmNoaWxkcmVuXS5tYXAoY2hpbGQgPT4gY2hpbGQuaWQpKVxuXG4gICAgbGV0IGVsZW1lbnRzVG9Nb2RpZnkgPSBbXVxuXG4gICAgQXJyYXkuZnJvbShjb250YWluZXJCZWZvcmUuY2hpbGRyZW4pLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgaWYoY2hpbGQuaWQpeyAvLyBhbGwgb2Ygb3VyIGNoaWxkcmVuIHNob3VsZCBiZSBlbGVtZW50cyB3aXRoIGlkc1xuICAgICAgICBpZHNCZWZvcmUuYWRkKGNoaWxkLmlkKVxuICAgICAgICBpZihpZHNBZnRlci5oYXMoY2hpbGQuaWQpKXtcbiAgICAgICAgICBsZXQgcHJldmlvdXNFbGVtZW50SWQgPSBjaGlsZC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nICYmIGNoaWxkLnByZXZpb3VzRWxlbWVudFNpYmxpbmcuaWRcbiAgICAgICAgICBlbGVtZW50c1RvTW9kaWZ5LnB1c2goe2VsZW1lbnRJZDogY2hpbGQuaWQsIHByZXZpb3VzRWxlbWVudElkOiBwcmV2aW91c0VsZW1lbnRJZH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuXG4gICAgdGhpcy5jb250YWluZXJJZCA9IGNvbnRhaW5lckFmdGVyLmlkXG4gICAgdGhpcy51cGRhdGVUeXBlID0gdXBkYXRlVHlwZVxuICAgIHRoaXMuZWxlbWVudHNUb01vZGlmeSA9IGVsZW1lbnRzVG9Nb2RpZnlcbiAgICB0aGlzLmVsZW1lbnRJZHNUb0FkZCA9IFsuLi5pZHNBZnRlcl0uZmlsdGVyKGlkID0+ICFpZHNCZWZvcmUuaGFzKGlkKSlcbiAgfVxuXG4gIC8vIFdlIGRvIHRoZSBmb2xsb3dpbmcgdG8gb3B0aW1pemUgYXBwZW5kL3ByZXBlbmQgb3BlcmF0aW9uczpcbiAgLy8gICAxKSBUcmFjayBpZHMgb2YgbW9kaWZpZWQgZWxlbWVudHMgJiBvZiBuZXcgZWxlbWVudHNcbiAgLy8gICAyKSBBbGwgdGhlIG1vZGlmaWVkIGVsZW1lbnRzIGFyZSBwdXQgYmFjayBpbiB0aGUgY29ycmVjdCBwb3NpdGlvbiBpbiB0aGUgRE9NIHRyZWVcbiAgLy8gICAgICBieSBzdG9yaW5nIHRoZSBpZCBvZiB0aGVpciBwcmV2aW91cyBzaWJsaW5nXG4gIC8vICAgMykgTmV3IGVsZW1lbnRzIGFyZSBnb2luZyB0byBiZSBwdXQgaW4gdGhlIHJpZ2h0IHBsYWNlIGJ5IG1vcnBoZG9tIGR1cmluZyBhcHBlbmQuXG4gIC8vICAgICAgRm9yIHByZXBlbmQsIHdlIG1vdmUgdGhlbSB0byB0aGUgZmlyc3QgcG9zaXRpb24gaW4gdGhlIGNvbnRhaW5lclxuICBwZXJmb3JtKCl7XG4gICAgbGV0IGNvbnRhaW5lciA9IERPTS5ieUlkKHRoaXMuY29udGFpbmVySWQpXG4gICAgdGhpcy5lbGVtZW50c1RvTW9kaWZ5LmZvckVhY2goZWxlbWVudFRvTW9kaWZ5ID0+IHtcbiAgICAgIGlmKGVsZW1lbnRUb01vZGlmeS5wcmV2aW91c0VsZW1lbnRJZCl7XG4gICAgICAgIG1heWJlKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRUb01vZGlmeS5wcmV2aW91c0VsZW1lbnRJZCksIHByZXZpb3VzRWxlbSA9PiB7XG4gICAgICAgICAgbWF5YmUoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudFRvTW9kaWZ5LmVsZW1lbnRJZCksIGVsZW0gPT4ge1xuICAgICAgICAgICAgbGV0IGlzSW5SaWdodFBsYWNlID0gZWxlbS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nICYmIGVsZW0ucHJldmlvdXNFbGVtZW50U2libGluZy5pZCA9PSBwcmV2aW91c0VsZW0uaWRcbiAgICAgICAgICAgIGlmKCFpc0luUmlnaHRQbGFjZSl7XG4gICAgICAgICAgICAgIHByZXZpb3VzRWxlbS5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJhZnRlcmVuZFwiLCBlbGVtKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBUaGlzIGlzIHRoZSBmaXJzdCBlbGVtZW50IGluIHRoZSBjb250YWluZXJcbiAgICAgICAgbWF5YmUoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudFRvTW9kaWZ5LmVsZW1lbnRJZCksIGVsZW0gPT4ge1xuICAgICAgICAgIGxldCBpc0luUmlnaHRQbGFjZSA9IGVsZW0ucHJldmlvdXNFbGVtZW50U2libGluZyA9PSBudWxsXG4gICAgICAgICAgaWYoIWlzSW5SaWdodFBsYWNlKXtcbiAgICAgICAgICAgIGNvbnRhaW5lci5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJhZnRlcmJlZ2luXCIsIGVsZW0pXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBpZih0aGlzLnVwZGF0ZVR5cGUgPT0gXCJwcmVwZW5kXCIpe1xuICAgICAgdGhpcy5lbGVtZW50SWRzVG9BZGQucmV2ZXJzZSgpLmZvckVhY2goZWxlbUlkID0+IHtcbiAgICAgICAgbWF5YmUoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbUlkKSwgZWxlbSA9PiBjb250YWluZXIuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYWZ0ZXJiZWdpblwiLCBlbGVtKSlcbiAgICAgIH0pXG4gICAgfVxuICB9XG59XG4iLCAidmFyIERPQ1VNRU5UX0ZSQUdNRU5UX05PREUgPSAxMTtcblxuZnVuY3Rpb24gbW9ycGhBdHRycyhmcm9tTm9kZSwgdG9Ob2RlKSB7XG4gICAgdmFyIHRvTm9kZUF0dHJzID0gdG9Ob2RlLmF0dHJpYnV0ZXM7XG4gICAgdmFyIGF0dHI7XG4gICAgdmFyIGF0dHJOYW1lO1xuICAgIHZhciBhdHRyTmFtZXNwYWNlVVJJO1xuICAgIHZhciBhdHRyVmFsdWU7XG4gICAgdmFyIGZyb21WYWx1ZTtcblxuICAgIC8vIGRvY3VtZW50LWZyYWdtZW50cyBkb250IGhhdmUgYXR0cmlidXRlcyBzbyBsZXRzIG5vdCBkbyBhbnl0aGluZ1xuICAgIGlmICh0b05vZGUubm9kZVR5cGUgPT09IERPQ1VNRU5UX0ZSQUdNRU5UX05PREUgfHwgZnJvbU5vZGUubm9kZVR5cGUgPT09IERPQ1VNRU5UX0ZSQUdNRU5UX05PREUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgYXR0cmlidXRlcyBvbiBvcmlnaW5hbCBET00gZWxlbWVudFxuICAgIGZvciAodmFyIGkgPSB0b05vZGVBdHRycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICBhdHRyID0gdG9Ob2RlQXR0cnNbaV07XG4gICAgICAgIGF0dHJOYW1lID0gYXR0ci5uYW1lO1xuICAgICAgICBhdHRyTmFtZXNwYWNlVVJJID0gYXR0ci5uYW1lc3BhY2VVUkk7XG4gICAgICAgIGF0dHJWYWx1ZSA9IGF0dHIudmFsdWU7XG5cbiAgICAgICAgaWYgKGF0dHJOYW1lc3BhY2VVUkkpIHtcbiAgICAgICAgICAgIGF0dHJOYW1lID0gYXR0ci5sb2NhbE5hbWUgfHwgYXR0ck5hbWU7XG4gICAgICAgICAgICBmcm9tVmFsdWUgPSBmcm9tTm9kZS5nZXRBdHRyaWJ1dGVOUyhhdHRyTmFtZXNwYWNlVVJJLCBhdHRyTmFtZSk7XG5cbiAgICAgICAgICAgIGlmIChmcm9tVmFsdWUgIT09IGF0dHJWYWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmIChhdHRyLnByZWZpeCA9PT0gJ3htbG5zJyl7XG4gICAgICAgICAgICAgICAgICAgIGF0dHJOYW1lID0gYXR0ci5uYW1lOyAvLyBJdCdzIG5vdCBhbGxvd2VkIHRvIHNldCBhbiBhdHRyaWJ1dGUgd2l0aCB0aGUgWE1MTlMgbmFtZXNwYWNlIHdpdGhvdXQgc3BlY2lmeWluZyB0aGUgYHhtbG5zYCBwcmVmaXhcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZnJvbU5vZGUuc2V0QXR0cmlidXRlTlMoYXR0ck5hbWVzcGFjZVVSSSwgYXR0ck5hbWUsIGF0dHJWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmcm9tVmFsdWUgPSBmcm9tTm9kZS5nZXRBdHRyaWJ1dGUoYXR0ck5hbWUpO1xuXG4gICAgICAgICAgICBpZiAoZnJvbVZhbHVlICE9PSBhdHRyVmFsdWUpIHtcbiAgICAgICAgICAgICAgICBmcm9tTm9kZS5zZXRBdHRyaWJ1dGUoYXR0ck5hbWUsIGF0dHJWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZW1vdmUgYW55IGV4dHJhIGF0dHJpYnV0ZXMgZm91bmQgb24gdGhlIG9yaWdpbmFsIERPTSBlbGVtZW50IHRoYXRcbiAgICAvLyB3ZXJlbid0IGZvdW5kIG9uIHRoZSB0YXJnZXQgZWxlbWVudC5cbiAgICB2YXIgZnJvbU5vZGVBdHRycyA9IGZyb21Ob2RlLmF0dHJpYnV0ZXM7XG5cbiAgICBmb3IgKHZhciBkID0gZnJvbU5vZGVBdHRycy5sZW5ndGggLSAxOyBkID49IDA7IGQtLSkge1xuICAgICAgICBhdHRyID0gZnJvbU5vZGVBdHRyc1tkXTtcbiAgICAgICAgYXR0ck5hbWUgPSBhdHRyLm5hbWU7XG4gICAgICAgIGF0dHJOYW1lc3BhY2VVUkkgPSBhdHRyLm5hbWVzcGFjZVVSSTtcblxuICAgICAgICBpZiAoYXR0ck5hbWVzcGFjZVVSSSkge1xuICAgICAgICAgICAgYXR0ck5hbWUgPSBhdHRyLmxvY2FsTmFtZSB8fCBhdHRyTmFtZTtcblxuICAgICAgICAgICAgaWYgKCF0b05vZGUuaGFzQXR0cmlidXRlTlMoYXR0ck5hbWVzcGFjZVVSSSwgYXR0ck5hbWUpKSB7XG4gICAgICAgICAgICAgICAgZnJvbU5vZGUucmVtb3ZlQXR0cmlidXRlTlMoYXR0ck5hbWVzcGFjZVVSSSwgYXR0ck5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKCF0b05vZGUuaGFzQXR0cmlidXRlKGF0dHJOYW1lKSkge1xuICAgICAgICAgICAgICAgIGZyb21Ob2RlLnJlbW92ZUF0dHJpYnV0ZShhdHRyTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbnZhciByYW5nZTsgLy8gQ3JlYXRlIGEgcmFuZ2Ugb2JqZWN0IGZvciBlZmZpY2VudGx5IHJlbmRlcmluZyBzdHJpbmdzIHRvIGVsZW1lbnRzLlxudmFyIE5TX1hIVE1MID0gJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWwnO1xuXG52YXIgZG9jID0gdHlwZW9mIGRvY3VtZW50ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IGRvY3VtZW50O1xudmFyIEhBU19URU1QTEFURV9TVVBQT1JUID0gISFkb2MgJiYgJ2NvbnRlbnQnIGluIGRvYy5jcmVhdGVFbGVtZW50KCd0ZW1wbGF0ZScpO1xudmFyIEhBU19SQU5HRV9TVVBQT1JUID0gISFkb2MgJiYgZG9jLmNyZWF0ZVJhbmdlICYmICdjcmVhdGVDb250ZXh0dWFsRnJhZ21lbnQnIGluIGRvYy5jcmVhdGVSYW5nZSgpO1xuXG5mdW5jdGlvbiBjcmVhdGVGcmFnbWVudEZyb21UZW1wbGF0ZShzdHIpIHtcbiAgICB2YXIgdGVtcGxhdGUgPSBkb2MuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcbiAgICB0ZW1wbGF0ZS5pbm5lckhUTUwgPSBzdHI7XG4gICAgcmV0dXJuIHRlbXBsYXRlLmNvbnRlbnQuY2hpbGROb2Rlc1swXTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRnJhZ21lbnRGcm9tUmFuZ2Uoc3RyKSB7XG4gICAgaWYgKCFyYW5nZSkge1xuICAgICAgICByYW5nZSA9IGRvYy5jcmVhdGVSYW5nZSgpO1xuICAgICAgICByYW5nZS5zZWxlY3ROb2RlKGRvYy5ib2R5KTtcbiAgICB9XG5cbiAgICB2YXIgZnJhZ21lbnQgPSByYW5nZS5jcmVhdGVDb250ZXh0dWFsRnJhZ21lbnQoc3RyKTtcbiAgICByZXR1cm4gZnJhZ21lbnQuY2hpbGROb2Rlc1swXTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRnJhZ21lbnRGcm9tV3JhcChzdHIpIHtcbiAgICB2YXIgZnJhZ21lbnQgPSBkb2MuY3JlYXRlRWxlbWVudCgnYm9keScpO1xuICAgIGZyYWdtZW50LmlubmVySFRNTCA9IHN0cjtcbiAgICByZXR1cm4gZnJhZ21lbnQuY2hpbGROb2Rlc1swXTtcbn1cblxuLyoqXG4gKiBUaGlzIGlzIGFib3V0IHRoZSBzYW1lXG4gKiB2YXIgaHRtbCA9IG5ldyBET01QYXJzZXIoKS5wYXJzZUZyb21TdHJpbmcoc3RyLCAndGV4dC9odG1sJyk7XG4gKiByZXR1cm4gaHRtbC5ib2R5LmZpcnN0Q2hpbGQ7XG4gKlxuICogQG1ldGhvZCB0b0VsZW1lbnRcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqL1xuZnVuY3Rpb24gdG9FbGVtZW50KHN0cikge1xuICAgIHN0ciA9IHN0ci50cmltKCk7XG4gICAgaWYgKEhBU19URU1QTEFURV9TVVBQT1JUKSB7XG4gICAgICAvLyBhdm9pZCByZXN0cmljdGlvbnMgb24gY29udGVudCBmb3IgdGhpbmdzIGxpa2UgYDx0cj48dGg+SGk8L3RoPjwvdHI+YCB3aGljaFxuICAgICAgLy8gY3JlYXRlQ29udGV4dHVhbEZyYWdtZW50IGRvZXNuJ3Qgc3VwcG9ydFxuICAgICAgLy8gPHRlbXBsYXRlPiBzdXBwb3J0IG5vdCBhdmFpbGFibGUgaW4gSUVcbiAgICAgIHJldHVybiBjcmVhdGVGcmFnbWVudEZyb21UZW1wbGF0ZShzdHIpO1xuICAgIH0gZWxzZSBpZiAoSEFTX1JBTkdFX1NVUFBPUlQpIHtcbiAgICAgIHJldHVybiBjcmVhdGVGcmFnbWVudEZyb21SYW5nZShzdHIpO1xuICAgIH1cblxuICAgIHJldHVybiBjcmVhdGVGcmFnbWVudEZyb21XcmFwKHN0cik7XG59XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHR3byBub2RlJ3MgbmFtZXMgYXJlIHRoZSBzYW1lLlxuICpcbiAqIE5PVEU6IFdlIGRvbid0IGJvdGhlciBjaGVja2luZyBgbmFtZXNwYWNlVVJJYCBiZWNhdXNlIHlvdSB3aWxsIG5ldmVyIGZpbmQgdHdvIEhUTUwgZWxlbWVudHMgd2l0aCB0aGUgc2FtZVxuICogICAgICAgbm9kZU5hbWUgYW5kIGRpZmZlcmVudCBuYW1lc3BhY2UgVVJJcy5cbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGFcbiAqIEBwYXJhbSB7RWxlbWVudH0gYiBUaGUgdGFyZ2V0IGVsZW1lbnRcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGNvbXBhcmVOb2RlTmFtZXMoZnJvbUVsLCB0b0VsKSB7XG4gICAgdmFyIGZyb21Ob2RlTmFtZSA9IGZyb21FbC5ub2RlTmFtZTtcbiAgICB2YXIgdG9Ob2RlTmFtZSA9IHRvRWwubm9kZU5hbWU7XG4gICAgdmFyIGZyb21Db2RlU3RhcnQsIHRvQ29kZVN0YXJ0O1xuXG4gICAgaWYgKGZyb21Ob2RlTmFtZSA9PT0gdG9Ob2RlTmFtZSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBmcm9tQ29kZVN0YXJ0ID0gZnJvbU5vZGVOYW1lLmNoYXJDb2RlQXQoMCk7XG4gICAgdG9Db2RlU3RhcnQgPSB0b05vZGVOYW1lLmNoYXJDb2RlQXQoMCk7XG5cbiAgICAvLyBJZiB0aGUgdGFyZ2V0IGVsZW1lbnQgaXMgYSB2aXJ0dWFsIERPTSBub2RlIG9yIFNWRyBub2RlIHRoZW4gd2UgbWF5XG4gICAgLy8gbmVlZCB0byBub3JtYWxpemUgdGhlIHRhZyBuYW1lIGJlZm9yZSBjb21wYXJpbmcuIE5vcm1hbCBIVE1MIGVsZW1lbnRzIHRoYXQgYXJlXG4gICAgLy8gaW4gdGhlIFwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbFwiXG4gICAgLy8gYXJlIGNvbnZlcnRlZCB0byB1cHBlciBjYXNlXG4gICAgaWYgKGZyb21Db2RlU3RhcnQgPD0gOTAgJiYgdG9Db2RlU3RhcnQgPj0gOTcpIHsgLy8gZnJvbSBpcyB1cHBlciBhbmQgdG8gaXMgbG93ZXJcbiAgICAgICAgcmV0dXJuIGZyb21Ob2RlTmFtZSA9PT0gdG9Ob2RlTmFtZS50b1VwcGVyQ2FzZSgpO1xuICAgIH0gZWxzZSBpZiAodG9Db2RlU3RhcnQgPD0gOTAgJiYgZnJvbUNvZGVTdGFydCA+PSA5NykgeyAvLyB0byBpcyB1cHBlciBhbmQgZnJvbSBpcyBsb3dlclxuICAgICAgICByZXR1cm4gdG9Ob2RlTmFtZSA9PT0gZnJvbU5vZGVOYW1lLnRvVXBwZXJDYXNlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cblxuLyoqXG4gKiBDcmVhdGUgYW4gZWxlbWVudCwgb3B0aW9uYWxseSB3aXRoIGEga25vd24gbmFtZXNwYWNlIFVSSS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSB0aGUgZWxlbWVudCBuYW1lLCBlLmcuICdkaXYnIG9yICdzdmcnXG4gKiBAcGFyYW0ge3N0cmluZ30gW25hbWVzcGFjZVVSSV0gdGhlIGVsZW1lbnQncyBuYW1lc3BhY2UgVVJJLCBpLmUuIHRoZSB2YWx1ZSBvZlxuICogaXRzIGB4bWxuc2AgYXR0cmlidXRlIG9yIGl0cyBpbmZlcnJlZCBuYW1lc3BhY2UuXG4gKlxuICogQHJldHVybiB7RWxlbWVudH1cbiAqL1xuZnVuY3Rpb24gY3JlYXRlRWxlbWVudE5TKG5hbWUsIG5hbWVzcGFjZVVSSSkge1xuICAgIHJldHVybiAhbmFtZXNwYWNlVVJJIHx8IG5hbWVzcGFjZVVSSSA9PT0gTlNfWEhUTUwgP1xuICAgICAgICBkb2MuY3JlYXRlRWxlbWVudChuYW1lKSA6XG4gICAgICAgIGRvYy5jcmVhdGVFbGVtZW50TlMobmFtZXNwYWNlVVJJLCBuYW1lKTtcbn1cblxuLyoqXG4gKiBDb3BpZXMgdGhlIGNoaWxkcmVuIG9mIG9uZSBET00gZWxlbWVudCB0byBhbm90aGVyIERPTSBlbGVtZW50XG4gKi9cbmZ1bmN0aW9uIG1vdmVDaGlsZHJlbihmcm9tRWwsIHRvRWwpIHtcbiAgICB2YXIgY3VyQ2hpbGQgPSBmcm9tRWwuZmlyc3RDaGlsZDtcbiAgICB3aGlsZSAoY3VyQ2hpbGQpIHtcbiAgICAgICAgdmFyIG5leHRDaGlsZCA9IGN1ckNoaWxkLm5leHRTaWJsaW5nO1xuICAgICAgICB0b0VsLmFwcGVuZENoaWxkKGN1ckNoaWxkKTtcbiAgICAgICAgY3VyQ2hpbGQgPSBuZXh0Q2hpbGQ7XG4gICAgfVxuICAgIHJldHVybiB0b0VsO1xufVxuXG5mdW5jdGlvbiBzeW5jQm9vbGVhbkF0dHJQcm9wKGZyb21FbCwgdG9FbCwgbmFtZSkge1xuICAgIGlmIChmcm9tRWxbbmFtZV0gIT09IHRvRWxbbmFtZV0pIHtcbiAgICAgICAgZnJvbUVsW25hbWVdID0gdG9FbFtuYW1lXTtcbiAgICAgICAgaWYgKGZyb21FbFtuYW1lXSkge1xuICAgICAgICAgICAgZnJvbUVsLnNldEF0dHJpYnV0ZShuYW1lLCAnJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmcm9tRWwucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG52YXIgc3BlY2lhbEVsSGFuZGxlcnMgPSB7XG4gICAgT1BUSU9OOiBmdW5jdGlvbihmcm9tRWwsIHRvRWwpIHtcbiAgICAgICAgdmFyIHBhcmVudE5vZGUgPSBmcm9tRWwucGFyZW50Tm9kZTtcbiAgICAgICAgaWYgKHBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgIHZhciBwYXJlbnROYW1lID0gcGFyZW50Tm9kZS5ub2RlTmFtZS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgaWYgKHBhcmVudE5hbWUgPT09ICdPUFRHUk9VUCcpIHtcbiAgICAgICAgICAgICAgICBwYXJlbnROb2RlID0gcGFyZW50Tm9kZS5wYXJlbnROb2RlO1xuICAgICAgICAgICAgICAgIHBhcmVudE5hbWUgPSBwYXJlbnROb2RlICYmIHBhcmVudE5vZGUubm9kZU5hbWUudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwYXJlbnROYW1lID09PSAnU0VMRUNUJyAmJiAhcGFyZW50Tm9kZS5oYXNBdHRyaWJ1dGUoJ211bHRpcGxlJykpIHtcbiAgICAgICAgICAgICAgICBpZiAoZnJvbUVsLmhhc0F0dHJpYnV0ZSgnc2VsZWN0ZWQnKSAmJiAhdG9FbC5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBXb3JrYXJvdW5kIGZvciBNUyBFZGdlIGJ1ZyB3aGVyZSB0aGUgJ3NlbGVjdGVkJyBhdHRyaWJ1dGUgY2FuIG9ubHkgYmVcbiAgICAgICAgICAgICAgICAgICAgLy8gcmVtb3ZlZCBpZiBzZXQgdG8gYSBub24tZW1wdHkgdmFsdWU6XG4gICAgICAgICAgICAgICAgICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1pY3Jvc29mdC5jb20vZW4tdXMvbWljcm9zb2Z0LWVkZ2UvcGxhdGZvcm0vaXNzdWVzLzEyMDg3Njc5L1xuICAgICAgICAgICAgICAgICAgICBmcm9tRWwuc2V0QXR0cmlidXRlKCdzZWxlY3RlZCcsICdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgICAgICBmcm9tRWwucmVtb3ZlQXR0cmlidXRlKCdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBXZSBoYXZlIHRvIHJlc2V0IHNlbGVjdCBlbGVtZW50J3Mgc2VsZWN0ZWRJbmRleCB0byAtMSwgb3RoZXJ3aXNlIHNldHRpbmdcbiAgICAgICAgICAgICAgICAvLyBmcm9tRWwuc2VsZWN0ZWQgdXNpbmcgdGhlIHN5bmNCb29sZWFuQXR0clByb3AgYmVsb3cgaGFzIG5vIGVmZmVjdC5cbiAgICAgICAgICAgICAgICAvLyBUaGUgY29ycmVjdCBzZWxlY3RlZEluZGV4IHdpbGwgYmUgc2V0IGluIHRoZSBTRUxFQ1Qgc3BlY2lhbCBoYW5kbGVyIGJlbG93LlxuICAgICAgICAgICAgICAgIHBhcmVudE5vZGUuc2VsZWN0ZWRJbmRleCA9IC0xO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHN5bmNCb29sZWFuQXR0clByb3AoZnJvbUVsLCB0b0VsLCAnc2VsZWN0ZWQnKTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIFRoZSBcInZhbHVlXCIgYXR0cmlidXRlIGlzIHNwZWNpYWwgZm9yIHRoZSA8aW5wdXQ+IGVsZW1lbnQgc2luY2UgaXQgc2V0c1xuICAgICAqIHRoZSBpbml0aWFsIHZhbHVlLiBDaGFuZ2luZyB0aGUgXCJ2YWx1ZVwiIGF0dHJpYnV0ZSB3aXRob3V0IGNoYW5naW5nIHRoZVxuICAgICAqIFwidmFsdWVcIiBwcm9wZXJ0eSB3aWxsIGhhdmUgbm8gZWZmZWN0IHNpbmNlIGl0IGlzIG9ubHkgdXNlZCB0byB0aGUgc2V0IHRoZVxuICAgICAqIGluaXRpYWwgdmFsdWUuICBTaW1pbGFyIGZvciB0aGUgXCJjaGVja2VkXCIgYXR0cmlidXRlLCBhbmQgXCJkaXNhYmxlZFwiLlxuICAgICAqL1xuICAgIElOUFVUOiBmdW5jdGlvbihmcm9tRWwsIHRvRWwpIHtcbiAgICAgICAgc3luY0Jvb2xlYW5BdHRyUHJvcChmcm9tRWwsIHRvRWwsICdjaGVja2VkJyk7XG4gICAgICAgIHN5bmNCb29sZWFuQXR0clByb3AoZnJvbUVsLCB0b0VsLCAnZGlzYWJsZWQnKTtcblxuICAgICAgICBpZiAoZnJvbUVsLnZhbHVlICE9PSB0b0VsLnZhbHVlKSB7XG4gICAgICAgICAgICBmcm9tRWwudmFsdWUgPSB0b0VsLnZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0b0VsLmhhc0F0dHJpYnV0ZSgndmFsdWUnKSkge1xuICAgICAgICAgICAgZnJvbUVsLnJlbW92ZUF0dHJpYnV0ZSgndmFsdWUnKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBURVhUQVJFQTogZnVuY3Rpb24oZnJvbUVsLCB0b0VsKSB7XG4gICAgICAgIHZhciBuZXdWYWx1ZSA9IHRvRWwudmFsdWU7XG4gICAgICAgIGlmIChmcm9tRWwudmFsdWUgIT09IG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICBmcm9tRWwudmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBmaXJzdENoaWxkID0gZnJvbUVsLmZpcnN0Q2hpbGQ7XG4gICAgICAgIGlmIChmaXJzdENoaWxkKSB7XG4gICAgICAgICAgICAvLyBOZWVkZWQgZm9yIElFLiBBcHBhcmVudGx5IElFIHNldHMgdGhlIHBsYWNlaG9sZGVyIGFzIHRoZVxuICAgICAgICAgICAgLy8gbm9kZSB2YWx1ZSBhbmQgdmlzZSB2ZXJzYS4gVGhpcyBpZ25vcmVzIGFuIGVtcHR5IHVwZGF0ZS5cbiAgICAgICAgICAgIHZhciBvbGRWYWx1ZSA9IGZpcnN0Q2hpbGQubm9kZVZhbHVlO1xuXG4gICAgICAgICAgICBpZiAob2xkVmFsdWUgPT0gbmV3VmFsdWUgfHwgKCFuZXdWYWx1ZSAmJiBvbGRWYWx1ZSA9PSBmcm9tRWwucGxhY2Vob2xkZXIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmaXJzdENoaWxkLm5vZGVWYWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBTRUxFQ1Q6IGZ1bmN0aW9uKGZyb21FbCwgdG9FbCkge1xuICAgICAgICBpZiAoIXRvRWwuaGFzQXR0cmlidXRlKCdtdWx0aXBsZScpKSB7XG4gICAgICAgICAgICB2YXIgc2VsZWN0ZWRJbmRleCA9IC0xO1xuICAgICAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICAgICAgLy8gV2UgaGF2ZSB0byBsb29wIHRocm91Z2ggY2hpbGRyZW4gb2YgZnJvbUVsLCBub3QgdG9FbCBzaW5jZSBub2RlcyBjYW4gYmUgbW92ZWRcbiAgICAgICAgICAgIC8vIGZyb20gdG9FbCB0byBmcm9tRWwgZGlyZWN0bHkgd2hlbiBtb3JwaGluZy5cbiAgICAgICAgICAgIC8vIEF0IHRoZSB0aW1lIHRoaXMgc3BlY2lhbCBoYW5kbGVyIGlzIGludm9rZWQsIGFsbCBjaGlsZHJlbiBoYXZlIGFscmVhZHkgYmVlbiBtb3JwaGVkXG4gICAgICAgICAgICAvLyBhbmQgYXBwZW5kZWQgdG8gLyByZW1vdmVkIGZyb20gZnJvbUVsLCBzbyB1c2luZyBmcm9tRWwgaGVyZSBpcyBzYWZlIGFuZCBjb3JyZWN0LlxuICAgICAgICAgICAgdmFyIGN1ckNoaWxkID0gZnJvbUVsLmZpcnN0Q2hpbGQ7XG4gICAgICAgICAgICB2YXIgb3B0Z3JvdXA7XG4gICAgICAgICAgICB2YXIgbm9kZU5hbWU7XG4gICAgICAgICAgICB3aGlsZShjdXJDaGlsZCkge1xuICAgICAgICAgICAgICAgIG5vZGVOYW1lID0gY3VyQ2hpbGQubm9kZU5hbWUgJiYgY3VyQ2hpbGQubm9kZU5hbWUudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgICAgICBpZiAobm9kZU5hbWUgPT09ICdPUFRHUk9VUCcpIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0Z3JvdXAgPSBjdXJDaGlsZDtcbiAgICAgICAgICAgICAgICAgICAgY3VyQ2hpbGQgPSBvcHRncm91cC5maXJzdENoaWxkO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlTmFtZSA9PT0gJ09QVElPTicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJDaGlsZC5oYXNBdHRyaWJ1dGUoJ3NlbGVjdGVkJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjdXJDaGlsZCA9IGN1ckNoaWxkLm5leHRTaWJsaW5nO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWN1ckNoaWxkICYmIG9wdGdyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJDaGlsZCA9IG9wdGdyb3VwLm5leHRTaWJsaW5nO1xuICAgICAgICAgICAgICAgICAgICAgICAgb3B0Z3JvdXAgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmcm9tRWwuc2VsZWN0ZWRJbmRleCA9IHNlbGVjdGVkSW5kZXg7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG52YXIgRUxFTUVOVF9OT0RFID0gMTtcbnZhciBET0NVTUVOVF9GUkFHTUVOVF9OT0RFJDEgPSAxMTtcbnZhciBURVhUX05PREUgPSAzO1xudmFyIENPTU1FTlRfTk9ERSA9IDg7XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5mdW5jdGlvbiBkZWZhdWx0R2V0Tm9kZUtleShub2RlKSB7XG4gIGlmIChub2RlKSB7XG4gICAgcmV0dXJuIChub2RlLmdldEF0dHJpYnV0ZSAmJiBub2RlLmdldEF0dHJpYnV0ZSgnaWQnKSkgfHwgbm9kZS5pZDtcbiAgfVxufVxuXG5mdW5jdGlvbiBtb3JwaGRvbUZhY3RvcnkobW9ycGhBdHRycykge1xuXG4gIHJldHVybiBmdW5jdGlvbiBtb3JwaGRvbShmcm9tTm9kZSwgdG9Ob2RlLCBvcHRpb25zKSB7XG4gICAgaWYgKCFvcHRpb25zKSB7XG4gICAgICBvcHRpb25zID0ge307XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB0b05vZGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICBpZiAoZnJvbU5vZGUubm9kZU5hbWUgPT09ICcjZG9jdW1lbnQnIHx8IGZyb21Ob2RlLm5vZGVOYW1lID09PSAnSFRNTCcgfHwgZnJvbU5vZGUubm9kZU5hbWUgPT09ICdCT0RZJykge1xuICAgICAgICB2YXIgdG9Ob2RlSHRtbCA9IHRvTm9kZTtcbiAgICAgICAgdG9Ob2RlID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2h0bWwnKTtcbiAgICAgICAgdG9Ob2RlLmlubmVySFRNTCA9IHRvTm9kZUh0bWw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0b05vZGUgPSB0b0VsZW1lbnQodG9Ob2RlKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRvTm9kZS5ub2RlVHlwZSA9PT0gRE9DVU1FTlRfRlJBR01FTlRfTk9ERSQxKSB7XG4gICAgICB0b05vZGUgPSB0b05vZGUuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgfVxuXG4gICAgdmFyIGdldE5vZGVLZXkgPSBvcHRpb25zLmdldE5vZGVLZXkgfHwgZGVmYXVsdEdldE5vZGVLZXk7XG4gICAgdmFyIG9uQmVmb3JlTm9kZUFkZGVkID0gb3B0aW9ucy5vbkJlZm9yZU5vZGVBZGRlZCB8fCBub29wO1xuICAgIHZhciBvbk5vZGVBZGRlZCA9IG9wdGlvbnMub25Ob2RlQWRkZWQgfHwgbm9vcDtcbiAgICB2YXIgb25CZWZvcmVFbFVwZGF0ZWQgPSBvcHRpb25zLm9uQmVmb3JlRWxVcGRhdGVkIHx8IG5vb3A7XG4gICAgdmFyIG9uRWxVcGRhdGVkID0gb3B0aW9ucy5vbkVsVXBkYXRlZCB8fCBub29wO1xuICAgIHZhciBvbkJlZm9yZU5vZGVEaXNjYXJkZWQgPSBvcHRpb25zLm9uQmVmb3JlTm9kZURpc2NhcmRlZCB8fCBub29wO1xuICAgIHZhciBvbk5vZGVEaXNjYXJkZWQgPSBvcHRpb25zLm9uTm9kZURpc2NhcmRlZCB8fCBub29wO1xuICAgIHZhciBvbkJlZm9yZUVsQ2hpbGRyZW5VcGRhdGVkID0gb3B0aW9ucy5vbkJlZm9yZUVsQ2hpbGRyZW5VcGRhdGVkIHx8IG5vb3A7XG4gICAgdmFyIHNraXBGcm9tQ2hpbGRyZW4gPSBvcHRpb25zLnNraXBGcm9tQ2hpbGRyZW4gfHwgbm9vcDtcbiAgICB2YXIgYWRkQ2hpbGQgPSBvcHRpb25zLmFkZENoaWxkIHx8IGZ1bmN0aW9uKHBhcmVudCwgY2hpbGQpeyByZXR1cm4gcGFyZW50LmFwcGVuZENoaWxkKGNoaWxkKTsgfTtcbiAgICB2YXIgY2hpbGRyZW5Pbmx5ID0gb3B0aW9ucy5jaGlsZHJlbk9ubHkgPT09IHRydWU7XG5cbiAgICAvLyBUaGlzIG9iamVjdCBpcyB1c2VkIGFzIGEgbG9va3VwIHRvIHF1aWNrbHkgZmluZCBhbGwga2V5ZWQgZWxlbWVudHMgaW4gdGhlIG9yaWdpbmFsIERPTSB0cmVlLlxuICAgIHZhciBmcm9tTm9kZXNMb29rdXAgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHZhciBrZXllZFJlbW92YWxMaXN0ID0gW107XG5cbiAgICBmdW5jdGlvbiBhZGRLZXllZFJlbW92YWwoa2V5KSB7XG4gICAgICBrZXllZFJlbW92YWxMaXN0LnB1c2goa2V5KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB3YWxrRGlzY2FyZGVkQ2hpbGROb2Rlcyhub2RlLCBza2lwS2V5ZWROb2Rlcykge1xuICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IEVMRU1FTlRfTk9ERSkge1xuICAgICAgICB2YXIgY3VyQ2hpbGQgPSBub2RlLmZpcnN0Q2hpbGQ7XG4gICAgICAgIHdoaWxlIChjdXJDaGlsZCkge1xuXG4gICAgICAgICAgdmFyIGtleSA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgIGlmIChza2lwS2V5ZWROb2RlcyAmJiAoa2V5ID0gZ2V0Tm9kZUtleShjdXJDaGlsZCkpKSB7XG4gICAgICAgICAgICAvLyBJZiB3ZSBhcmUgc2tpcHBpbmcga2V5ZWQgbm9kZXMgdGhlbiB3ZSBhZGQgdGhlIGtleVxuICAgICAgICAgICAgLy8gdG8gYSBsaXN0IHNvIHRoYXQgaXQgY2FuIGJlIGhhbmRsZWQgYXQgdGhlIHZlcnkgZW5kLlxuICAgICAgICAgICAgYWRkS2V5ZWRSZW1vdmFsKGtleSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIE9ubHkgcmVwb3J0IHRoZSBub2RlIGFzIGRpc2NhcmRlZCBpZiBpdCBpcyBub3Qga2V5ZWQuIFdlIGRvIHRoaXMgYmVjYXVzZVxuICAgICAgICAgICAgLy8gYXQgdGhlIGVuZCB3ZSBsb29wIHRocm91Z2ggYWxsIGtleWVkIGVsZW1lbnRzIHRoYXQgd2VyZSB1bm1hdGNoZWRcbiAgICAgICAgICAgIC8vIGFuZCB0aGVuIGRpc2NhcmQgdGhlbSBpbiBvbmUgZmluYWwgcGFzcy5cbiAgICAgICAgICAgIG9uTm9kZURpc2NhcmRlZChjdXJDaGlsZCk7XG4gICAgICAgICAgICBpZiAoY3VyQ2hpbGQuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgICB3YWxrRGlzY2FyZGVkQ2hpbGROb2RlcyhjdXJDaGlsZCwgc2tpcEtleWVkTm9kZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGN1ckNoaWxkID0gY3VyQ2hpbGQubmV4dFNpYmxpbmc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAqIFJlbW92ZXMgYSBET00gbm9kZSBvdXQgb2YgdGhlIG9yaWdpbmFsIERPTVxuICAgICpcbiAgICAqIEBwYXJhbSAge05vZGV9IG5vZGUgVGhlIG5vZGUgdG8gcmVtb3ZlXG4gICAgKiBAcGFyYW0gIHtOb2RlfSBwYXJlbnROb2RlIFRoZSBub2RlcyBwYXJlbnRcbiAgICAqIEBwYXJhbSAge0Jvb2xlYW59IHNraXBLZXllZE5vZGVzIElmIHRydWUgdGhlbiBlbGVtZW50cyB3aXRoIGtleXMgd2lsbCBiZSBza2lwcGVkIGFuZCBub3QgZGlzY2FyZGVkLlxuICAgICogQHJldHVybiB7dW5kZWZpbmVkfVxuICAgICovXG4gICAgZnVuY3Rpb24gcmVtb3ZlTm9kZShub2RlLCBwYXJlbnROb2RlLCBza2lwS2V5ZWROb2Rlcykge1xuICAgICAgaWYgKG9uQmVmb3JlTm9kZURpc2NhcmRlZChub2RlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAocGFyZW50Tm9kZSkge1xuICAgICAgICBwYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUpO1xuICAgICAgfVxuXG4gICAgICBvbk5vZGVEaXNjYXJkZWQobm9kZSk7XG4gICAgICB3YWxrRGlzY2FyZGVkQ2hpbGROb2Rlcyhub2RlLCBza2lwS2V5ZWROb2Rlcyk7XG4gICAgfVxuXG4gICAgLy8gLy8gVHJlZVdhbGtlciBpbXBsZW1lbnRhdGlvbiBpcyBubyBmYXN0ZXIsIGJ1dCBrZWVwaW5nIHRoaXMgYXJvdW5kIGluIGNhc2UgdGhpcyBjaGFuZ2VzIGluIHRoZSBmdXR1cmVcbiAgICAvLyBmdW5jdGlvbiBpbmRleFRyZWUocm9vdCkge1xuICAgIC8vICAgICB2YXIgdHJlZVdhbGtlciA9IGRvY3VtZW50LmNyZWF0ZVRyZWVXYWxrZXIoXG4gICAgLy8gICAgICAgICByb290LFxuICAgIC8vICAgICAgICAgTm9kZUZpbHRlci5TSE9XX0VMRU1FTlQpO1xuICAgIC8vXG4gICAgLy8gICAgIHZhciBlbDtcbiAgICAvLyAgICAgd2hpbGUoKGVsID0gdHJlZVdhbGtlci5uZXh0Tm9kZSgpKSkge1xuICAgIC8vICAgICAgICAgdmFyIGtleSA9IGdldE5vZGVLZXkoZWwpO1xuICAgIC8vICAgICAgICAgaWYgKGtleSkge1xuICAgIC8vICAgICAgICAgICAgIGZyb21Ob2Rlc0xvb2t1cFtrZXldID0gZWw7XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH1cbiAgICAvLyB9XG5cbiAgICAvLyAvLyBOb2RlSXRlcmF0b3IgaW1wbGVtZW50YXRpb24gaXMgbm8gZmFzdGVyLCBidXQga2VlcGluZyB0aGlzIGFyb3VuZCBpbiBjYXNlIHRoaXMgY2hhbmdlcyBpbiB0aGUgZnV0dXJlXG4gICAgLy9cbiAgICAvLyBmdW5jdGlvbiBpbmRleFRyZWUobm9kZSkge1xuICAgIC8vICAgICB2YXIgbm9kZUl0ZXJhdG9yID0gZG9jdW1lbnQuY3JlYXRlTm9kZUl0ZXJhdG9yKG5vZGUsIE5vZGVGaWx0ZXIuU0hPV19FTEVNRU5UKTtcbiAgICAvLyAgICAgdmFyIGVsO1xuICAgIC8vICAgICB3aGlsZSgoZWwgPSBub2RlSXRlcmF0b3IubmV4dE5vZGUoKSkpIHtcbiAgICAvLyAgICAgICAgIHZhciBrZXkgPSBnZXROb2RlS2V5KGVsKTtcbiAgICAvLyAgICAgICAgIGlmIChrZXkpIHtcbiAgICAvLyAgICAgICAgICAgICBmcm9tTm9kZXNMb29rdXBba2V5XSA9IGVsO1xuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICB9XG4gICAgLy8gfVxuXG4gICAgZnVuY3Rpb24gaW5kZXhUcmVlKG5vZGUpIHtcbiAgICAgIGlmIChub2RlLm5vZGVUeXBlID09PSBFTEVNRU5UX05PREUgfHwgbm9kZS5ub2RlVHlwZSA9PT0gRE9DVU1FTlRfRlJBR01FTlRfTk9ERSQxKSB7XG4gICAgICAgIHZhciBjdXJDaGlsZCA9IG5vZGUuZmlyc3RDaGlsZDtcbiAgICAgICAgd2hpbGUgKGN1ckNoaWxkKSB7XG4gICAgICAgICAgdmFyIGtleSA9IGdldE5vZGVLZXkoY3VyQ2hpbGQpO1xuICAgICAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgICAgIGZyb21Ob2Rlc0xvb2t1cFtrZXldID0gY3VyQ2hpbGQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gV2FsayByZWN1cnNpdmVseVxuICAgICAgICAgIGluZGV4VHJlZShjdXJDaGlsZCk7XG5cbiAgICAgICAgICBjdXJDaGlsZCA9IGN1ckNoaWxkLm5leHRTaWJsaW5nO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaW5kZXhUcmVlKGZyb21Ob2RlKTtcblxuICAgIGZ1bmN0aW9uIGhhbmRsZU5vZGVBZGRlZChlbCkge1xuICAgICAgb25Ob2RlQWRkZWQoZWwpO1xuXG4gICAgICB2YXIgY3VyQ2hpbGQgPSBlbC5maXJzdENoaWxkO1xuICAgICAgd2hpbGUgKGN1ckNoaWxkKSB7XG4gICAgICAgIHZhciBuZXh0U2libGluZyA9IGN1ckNoaWxkLm5leHRTaWJsaW5nO1xuXG4gICAgICAgIHZhciBrZXkgPSBnZXROb2RlS2V5KGN1ckNoaWxkKTtcbiAgICAgICAgaWYgKGtleSkge1xuICAgICAgICAgIHZhciB1bm1hdGNoZWRGcm9tRWwgPSBmcm9tTm9kZXNMb29rdXBba2V5XTtcbiAgICAgICAgICAvLyBpZiB3ZSBmaW5kIGEgZHVwbGljYXRlICNpZCBub2RlIGluIGNhY2hlLCByZXBsYWNlIGBlbGAgd2l0aCBjYWNoZSB2YWx1ZVxuICAgICAgICAgIC8vIGFuZCBtb3JwaCBpdCB0byB0aGUgY2hpbGQgbm9kZS5cbiAgICAgICAgICBpZiAodW5tYXRjaGVkRnJvbUVsICYmIGNvbXBhcmVOb2RlTmFtZXMoY3VyQ2hpbGQsIHVubWF0Y2hlZEZyb21FbCkpIHtcbiAgICAgICAgICAgIGN1ckNoaWxkLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKHVubWF0Y2hlZEZyb21FbCwgY3VyQ2hpbGQpO1xuICAgICAgICAgICAgbW9ycGhFbCh1bm1hdGNoZWRGcm9tRWwsIGN1ckNoaWxkKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaGFuZGxlTm9kZUFkZGVkKGN1ckNoaWxkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gcmVjdXJzaXZlbHkgY2FsbCBmb3IgY3VyQ2hpbGQgYW5kIGl0J3MgY2hpbGRyZW4gdG8gc2VlIGlmIHdlIGZpbmQgc29tZXRoaW5nIGluXG4gICAgICAgICAgLy8gZnJvbU5vZGVzTG9va3VwXG4gICAgICAgICAgaGFuZGxlTm9kZUFkZGVkKGN1ckNoaWxkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGN1ckNoaWxkID0gbmV4dFNpYmxpbmc7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xlYW51cEZyb21FbChmcm9tRWwsIGN1ckZyb21Ob2RlQ2hpbGQsIGN1ckZyb21Ob2RlS2V5KSB7XG4gICAgICAvLyBXZSBoYXZlIHByb2Nlc3NlZCBhbGwgb2YgdGhlIFwidG8gbm9kZXNcIi4gSWYgY3VyRnJvbU5vZGVDaGlsZCBpc1xuICAgICAgLy8gbm9uLW51bGwgdGhlbiB3ZSBzdGlsbCBoYXZlIHNvbWUgZnJvbSBub2RlcyBsZWZ0IG92ZXIgdGhhdCBuZWVkXG4gICAgICAvLyB0byBiZSByZW1vdmVkXG4gICAgICB3aGlsZSAoY3VyRnJvbU5vZGVDaGlsZCkge1xuICAgICAgICB2YXIgZnJvbU5leHRTaWJsaW5nID0gY3VyRnJvbU5vZGVDaGlsZC5uZXh0U2libGluZztcbiAgICAgICAgaWYgKChjdXJGcm9tTm9kZUtleSA9IGdldE5vZGVLZXkoY3VyRnJvbU5vZGVDaGlsZCkpKSB7XG4gICAgICAgICAgLy8gU2luY2UgdGhlIG5vZGUgaXMga2V5ZWQgaXQgbWlnaHQgYmUgbWF0Y2hlZCB1cCBsYXRlciBzbyB3ZSBkZWZlclxuICAgICAgICAgIC8vIHRoZSBhY3R1YWwgcmVtb3ZhbCB0byBsYXRlclxuICAgICAgICAgIGFkZEtleWVkUmVtb3ZhbChjdXJGcm9tTm9kZUtleSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gTk9URTogd2Ugc2tpcCBuZXN0ZWQga2V5ZWQgbm9kZXMgZnJvbSBiZWluZyByZW1vdmVkIHNpbmNlIHRoZXJlIGlzXG4gICAgICAgICAgLy8gICAgICAgc3RpbGwgYSBjaGFuY2UgdGhleSB3aWxsIGJlIG1hdGNoZWQgdXAgbGF0ZXJcbiAgICAgICAgICByZW1vdmVOb2RlKGN1ckZyb21Ob2RlQ2hpbGQsIGZyb21FbCwgdHJ1ZSAvKiBza2lwIGtleWVkIG5vZGVzICovKTtcbiAgICAgICAgfVxuICAgICAgICBjdXJGcm9tTm9kZUNoaWxkID0gZnJvbU5leHRTaWJsaW5nO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1vcnBoRWwoZnJvbUVsLCB0b0VsLCBjaGlsZHJlbk9ubHkpIHtcbiAgICAgIHZhciB0b0VsS2V5ID0gZ2V0Tm9kZUtleSh0b0VsKTtcblxuICAgICAgaWYgKHRvRWxLZXkpIHtcbiAgICAgICAgLy8gSWYgYW4gZWxlbWVudCB3aXRoIGFuIElEIGlzIGJlaW5nIG1vcnBoZWQgdGhlbiBpdCB3aWxsIGJlIGluIHRoZSBmaW5hbFxuICAgICAgICAvLyBET00gc28gY2xlYXIgaXQgb3V0IG9mIHRoZSBzYXZlZCBlbGVtZW50cyBjb2xsZWN0aW9uXG4gICAgICAgIGRlbGV0ZSBmcm9tTm9kZXNMb29rdXBbdG9FbEtleV07XG4gICAgICB9XG5cbiAgICAgIGlmICghY2hpbGRyZW5Pbmx5KSB7XG4gICAgICAgIC8vIG9wdGlvbmFsXG4gICAgICAgIGlmIChvbkJlZm9yZUVsVXBkYXRlZChmcm9tRWwsIHRvRWwpID09PSBmYWxzZSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHVwZGF0ZSBhdHRyaWJ1dGVzIG9uIG9yaWdpbmFsIERPTSBlbGVtZW50IGZpcnN0XG4gICAgICAgIG1vcnBoQXR0cnMoZnJvbUVsLCB0b0VsKTtcbiAgICAgICAgLy8gb3B0aW9uYWxcbiAgICAgICAgb25FbFVwZGF0ZWQoZnJvbUVsKTtcblxuICAgICAgICBpZiAob25CZWZvcmVFbENoaWxkcmVuVXBkYXRlZChmcm9tRWwsIHRvRWwpID09PSBmYWxzZSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZnJvbUVsLm5vZGVOYW1lICE9PSAnVEVYVEFSRUEnKSB7XG4gICAgICAgIG1vcnBoQ2hpbGRyZW4oZnJvbUVsLCB0b0VsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNwZWNpYWxFbEhhbmRsZXJzLlRFWFRBUkVBKGZyb21FbCwgdG9FbCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbW9ycGhDaGlsZHJlbihmcm9tRWwsIHRvRWwpIHtcbiAgICAgIHZhciBza2lwRnJvbSA9IHNraXBGcm9tQ2hpbGRyZW4oZnJvbUVsKTtcbiAgICAgIHZhciBjdXJUb05vZGVDaGlsZCA9IHRvRWwuZmlyc3RDaGlsZDtcbiAgICAgIHZhciBjdXJGcm9tTm9kZUNoaWxkID0gZnJvbUVsLmZpcnN0Q2hpbGQ7XG4gICAgICB2YXIgY3VyVG9Ob2RlS2V5O1xuICAgICAgdmFyIGN1ckZyb21Ob2RlS2V5O1xuXG4gICAgICB2YXIgZnJvbU5leHRTaWJsaW5nO1xuICAgICAgdmFyIHRvTmV4dFNpYmxpbmc7XG4gICAgICB2YXIgbWF0Y2hpbmdGcm9tRWw7XG5cbiAgICAgIC8vIHdhbGsgdGhlIGNoaWxkcmVuXG4gICAgICBvdXRlcjogd2hpbGUgKGN1clRvTm9kZUNoaWxkKSB7XG4gICAgICAgIHRvTmV4dFNpYmxpbmcgPSBjdXJUb05vZGVDaGlsZC5uZXh0U2libGluZztcbiAgICAgICAgY3VyVG9Ob2RlS2V5ID0gZ2V0Tm9kZUtleShjdXJUb05vZGVDaGlsZCk7XG5cbiAgICAgICAgLy8gd2FsayB0aGUgZnJvbU5vZGUgY2hpbGRyZW4gYWxsIHRoZSB3YXkgdGhyb3VnaFxuICAgICAgICB3aGlsZSAoIXNraXBGcm9tICYmIGN1ckZyb21Ob2RlQ2hpbGQpIHtcbiAgICAgICAgICBmcm9tTmV4dFNpYmxpbmcgPSBjdXJGcm9tTm9kZUNoaWxkLm5leHRTaWJsaW5nO1xuXG4gICAgICAgICAgaWYgKGN1clRvTm9kZUNoaWxkLmlzU2FtZU5vZGUgJiYgY3VyVG9Ob2RlQ2hpbGQuaXNTYW1lTm9kZShjdXJGcm9tTm9kZUNoaWxkKSkge1xuICAgICAgICAgICAgY3VyVG9Ob2RlQ2hpbGQgPSB0b05leHRTaWJsaW5nO1xuICAgICAgICAgICAgY3VyRnJvbU5vZGVDaGlsZCA9IGZyb21OZXh0U2libGluZztcbiAgICAgICAgICAgIGNvbnRpbnVlIG91dGVyO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGN1ckZyb21Ob2RlS2V5ID0gZ2V0Tm9kZUtleShjdXJGcm9tTm9kZUNoaWxkKTtcblxuICAgICAgICAgIHZhciBjdXJGcm9tTm9kZVR5cGUgPSBjdXJGcm9tTm9kZUNoaWxkLm5vZGVUeXBlO1xuXG4gICAgICAgICAgLy8gdGhpcyBtZWFucyBpZiB0aGUgY3VyRnJvbU5vZGVDaGlsZCBkb2VzbnQgaGF2ZSBhIG1hdGNoIHdpdGggdGhlIGN1clRvTm9kZUNoaWxkXG4gICAgICAgICAgdmFyIGlzQ29tcGF0aWJsZSA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgIGlmIChjdXJGcm9tTm9kZVR5cGUgPT09IGN1clRvTm9kZUNoaWxkLm5vZGVUeXBlKSB7XG4gICAgICAgICAgICBpZiAoY3VyRnJvbU5vZGVUeXBlID09PSBFTEVNRU5UX05PREUpIHtcbiAgICAgICAgICAgICAgLy8gQm90aCBub2RlcyBiZWluZyBjb21wYXJlZCBhcmUgRWxlbWVudCBub2Rlc1xuXG4gICAgICAgICAgICAgIGlmIChjdXJUb05vZGVLZXkpIHtcbiAgICAgICAgICAgICAgICAvLyBUaGUgdGFyZ2V0IG5vZGUgaGFzIGEga2V5IHNvIHdlIHdhbnQgdG8gbWF0Y2ggaXQgdXAgd2l0aCB0aGUgY29ycmVjdCBlbGVtZW50XG4gICAgICAgICAgICAgICAgLy8gaW4gdGhlIG9yaWdpbmFsIERPTSB0cmVlXG4gICAgICAgICAgICAgICAgaWYgKGN1clRvTm9kZUtleSAhPT0gY3VyRnJvbU5vZGVLZXkpIHtcbiAgICAgICAgICAgICAgICAgIC8vIFRoZSBjdXJyZW50IGVsZW1lbnQgaW4gdGhlIG9yaWdpbmFsIERPTSB0cmVlIGRvZXMgbm90IGhhdmUgYSBtYXRjaGluZyBrZXkgc29cbiAgICAgICAgICAgICAgICAgIC8vIGxldCdzIGNoZWNrIG91ciBsb29rdXAgdG8gc2VlIGlmIHRoZXJlIGlzIGEgbWF0Y2hpbmcgZWxlbWVudCBpbiB0aGUgb3JpZ2luYWxcbiAgICAgICAgICAgICAgICAgIC8vIERPTSB0cmVlXG4gICAgICAgICAgICAgICAgICBpZiAoKG1hdGNoaW5nRnJvbUVsID0gZnJvbU5vZGVzTG9va3VwW2N1clRvTm9kZUtleV0pKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmcm9tTmV4dFNpYmxpbmcgPT09IG1hdGNoaW5nRnJvbUVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgLy8gU3BlY2lhbCBjYXNlIGZvciBzaW5nbGUgZWxlbWVudCByZW1vdmFscy4gVG8gYXZvaWQgcmVtb3ZpbmcgdGhlIG9yaWdpbmFsXG4gICAgICAgICAgICAgICAgICAgICAgLy8gRE9NIG5vZGUgb3V0IG9mIHRoZSB0cmVlIChzaW5jZSB0aGF0IGNhbiBicmVhayBDU1MgdHJhbnNpdGlvbnMsIGV0Yy4pLFxuICAgICAgICAgICAgICAgICAgICAgIC8vIHdlIHdpbGwgaW5zdGVhZCBkaXNjYXJkIHRoZSBjdXJyZW50IG5vZGUgYW5kIHdhaXQgdW50aWwgdGhlIG5leHRcbiAgICAgICAgICAgICAgICAgICAgICAvLyBpdGVyYXRpb24gdG8gcHJvcGVybHkgbWF0Y2ggdXAgdGhlIGtleWVkIHRhcmdldCBlbGVtZW50IHdpdGggaXRzIG1hdGNoaW5nXG4gICAgICAgICAgICAgICAgICAgICAgLy8gZWxlbWVudCBpbiB0aGUgb3JpZ2luYWwgdHJlZVxuICAgICAgICAgICAgICAgICAgICAgIGlzQ29tcGF0aWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIC8vIFdlIGZvdW5kIGEgbWF0Y2hpbmcga2V5ZWQgZWxlbWVudCBzb21ld2hlcmUgaW4gdGhlIG9yaWdpbmFsIERPTSB0cmVlLlxuICAgICAgICAgICAgICAgICAgICAgIC8vIExldCdzIG1vdmUgdGhlIG9yaWdpbmFsIERPTSBub2RlIGludG8gdGhlIGN1cnJlbnQgcG9zaXRpb24gYW5kIG1vcnBoXG4gICAgICAgICAgICAgICAgICAgICAgLy8gaXQuXG5cbiAgICAgICAgICAgICAgICAgICAgICAvLyBOT1RFOiBXZSB1c2UgaW5zZXJ0QmVmb3JlIGluc3RlYWQgb2YgcmVwbGFjZUNoaWxkIGJlY2F1c2Ugd2Ugd2FudCB0byBnbyB0aHJvdWdoXG4gICAgICAgICAgICAgICAgICAgICAgLy8gdGhlIGByZW1vdmVOb2RlKClgIGZ1bmN0aW9uIGZvciB0aGUgbm9kZSB0aGF0IGlzIGJlaW5nIGRpc2NhcmRlZCBzbyB0aGF0XG4gICAgICAgICAgICAgICAgICAgICAgLy8gYWxsIGxpZmVjeWNsZSBob29rcyBhcmUgY29ycmVjdGx5IGludm9rZWRcbiAgICAgICAgICAgICAgICAgICAgICBmcm9tRWwuaW5zZXJ0QmVmb3JlKG1hdGNoaW5nRnJvbUVsLCBjdXJGcm9tTm9kZUNoaWxkKTtcblxuICAgICAgICAgICAgICAgICAgICAgIC8vIGZyb21OZXh0U2libGluZyA9IGN1ckZyb21Ob2RlQ2hpbGQubmV4dFNpYmxpbmc7XG5cbiAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VyRnJvbU5vZGVLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNpbmNlIHRoZSBub2RlIGlzIGtleWVkIGl0IG1pZ2h0IGJlIG1hdGNoZWQgdXAgbGF0ZXIgc28gd2UgZGVmZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoZSBhY3R1YWwgcmVtb3ZhbCB0byBsYXRlclxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkS2V5ZWRSZW1vdmFsKGN1ckZyb21Ob2RlS2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gTk9URTogd2Ugc2tpcCBuZXN0ZWQga2V5ZWQgbm9kZXMgZnJvbSBiZWluZyByZW1vdmVkIHNpbmNlIHRoZXJlIGlzXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICBzdGlsbCBhIGNoYW5jZSB0aGV5IHdpbGwgYmUgbWF0Y2hlZCB1cCBsYXRlclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlTm9kZShjdXJGcm9tTm9kZUNoaWxkLCBmcm9tRWwsIHRydWUgLyogc2tpcCBrZXllZCBub2RlcyAqLyk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgY3VyRnJvbU5vZGVDaGlsZCA9IG1hdGNoaW5nRnJvbUVsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBUaGUgbm9kZXMgYXJlIG5vdCBjb21wYXRpYmxlIHNpbmNlIHRoZSBcInRvXCIgbm9kZSBoYXMgYSBrZXkgYW5kIHRoZXJlXG4gICAgICAgICAgICAgICAgICAgIC8vIGlzIG5vIG1hdGNoaW5nIGtleWVkIG5vZGUgaW4gdGhlIHNvdXJjZSB0cmVlXG4gICAgICAgICAgICAgICAgICAgIGlzQ29tcGF0aWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChjdXJGcm9tTm9kZUtleSkge1xuICAgICAgICAgICAgICAgIC8vIFRoZSBvcmlnaW5hbCBoYXMgYSBrZXlcbiAgICAgICAgICAgICAgICBpc0NvbXBhdGlibGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlzQ29tcGF0aWJsZSA9IGlzQ29tcGF0aWJsZSAhPT0gZmFsc2UgJiYgY29tcGFyZU5vZGVOYW1lcyhjdXJGcm9tTm9kZUNoaWxkLCBjdXJUb05vZGVDaGlsZCk7XG4gICAgICAgICAgICAgIGlmIChpc0NvbXBhdGlibGUpIHtcbiAgICAgICAgICAgICAgICAvLyBXZSBmb3VuZCBjb21wYXRpYmxlIERPTSBlbGVtZW50cyBzbyB0cmFuc2Zvcm1cbiAgICAgICAgICAgICAgICAvLyB0aGUgY3VycmVudCBcImZyb21cIiBub2RlIHRvIG1hdGNoIHRoZSBjdXJyZW50XG4gICAgICAgICAgICAgICAgLy8gdGFyZ2V0IERPTSBub2RlLlxuICAgICAgICAgICAgICAgIC8vIE1PUlBIXG4gICAgICAgICAgICAgICAgbW9ycGhFbChjdXJGcm9tTm9kZUNoaWxkLCBjdXJUb05vZGVDaGlsZCk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSBlbHNlIGlmIChjdXJGcm9tTm9kZVR5cGUgPT09IFRFWFRfTk9ERSB8fCBjdXJGcm9tTm9kZVR5cGUgPT0gQ09NTUVOVF9OT0RFKSB7XG4gICAgICAgICAgICAgIC8vIEJvdGggbm9kZXMgYmVpbmcgY29tcGFyZWQgYXJlIFRleHQgb3IgQ29tbWVudCBub2Rlc1xuICAgICAgICAgICAgICBpc0NvbXBhdGlibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAvLyBTaW1wbHkgdXBkYXRlIG5vZGVWYWx1ZSBvbiB0aGUgb3JpZ2luYWwgbm9kZSB0b1xuICAgICAgICAgICAgICAvLyBjaGFuZ2UgdGhlIHRleHQgdmFsdWVcbiAgICAgICAgICAgICAgaWYgKGN1ckZyb21Ob2RlQ2hpbGQubm9kZVZhbHVlICE9PSBjdXJUb05vZGVDaGlsZC5ub2RlVmFsdWUpIHtcbiAgICAgICAgICAgICAgICBjdXJGcm9tTm9kZUNoaWxkLm5vZGVWYWx1ZSA9IGN1clRvTm9kZUNoaWxkLm5vZGVWYWx1ZTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGlzQ29tcGF0aWJsZSkge1xuICAgICAgICAgICAgLy8gQWR2YW5jZSBib3RoIHRoZSBcInRvXCIgY2hpbGQgYW5kIHRoZSBcImZyb21cIiBjaGlsZCBzaW5jZSB3ZSBmb3VuZCBhIG1hdGNoXG4gICAgICAgICAgICAvLyBOb3RoaW5nIGVsc2UgdG8gZG8gYXMgd2UgYWxyZWFkeSByZWN1cnNpdmVseSBjYWxsZWQgbW9ycGhDaGlsZHJlbiBhYm92ZVxuICAgICAgICAgICAgY3VyVG9Ob2RlQ2hpbGQgPSB0b05leHRTaWJsaW5nO1xuICAgICAgICAgICAgY3VyRnJvbU5vZGVDaGlsZCA9IGZyb21OZXh0U2libGluZztcbiAgICAgICAgICAgIGNvbnRpbnVlIG91dGVyO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIE5vIGNvbXBhdGlibGUgbWF0Y2ggc28gcmVtb3ZlIHRoZSBvbGQgbm9kZSBmcm9tIHRoZSBET00gYW5kIGNvbnRpbnVlIHRyeWluZyB0byBmaW5kIGFcbiAgICAgICAgICAvLyBtYXRjaCBpbiB0aGUgb3JpZ2luYWwgRE9NLiBIb3dldmVyLCB3ZSBvbmx5IGRvIHRoaXMgaWYgdGhlIGZyb20gbm9kZSBpcyBub3Qga2V5ZWRcbiAgICAgICAgICAvLyBzaW5jZSBpdCBpcyBwb3NzaWJsZSB0aGF0IGEga2V5ZWQgbm9kZSBtaWdodCBtYXRjaCB1cCB3aXRoIGEgbm9kZSBzb21ld2hlcmUgZWxzZSBpbiB0aGVcbiAgICAgICAgICAvLyB0YXJnZXQgdHJlZSBhbmQgd2UgZG9uJ3Qgd2FudCB0byBkaXNjYXJkIGl0IGp1c3QgeWV0IHNpbmNlIGl0IHN0aWxsIG1pZ2h0IGZpbmQgYVxuICAgICAgICAgIC8vIGhvbWUgaW4gdGhlIGZpbmFsIERPTSB0cmVlLiBBZnRlciBldmVyeXRoaW5nIGlzIGRvbmUgd2Ugd2lsbCByZW1vdmUgYW55IGtleWVkIG5vZGVzXG4gICAgICAgICAgLy8gdGhhdCBkaWRuJ3QgZmluZCBhIGhvbWVcbiAgICAgICAgICBpZiAoY3VyRnJvbU5vZGVLZXkpIHtcbiAgICAgICAgICAgIC8vIFNpbmNlIHRoZSBub2RlIGlzIGtleWVkIGl0IG1pZ2h0IGJlIG1hdGNoZWQgdXAgbGF0ZXIgc28gd2UgZGVmZXJcbiAgICAgICAgICAgIC8vIHRoZSBhY3R1YWwgcmVtb3ZhbCB0byBsYXRlclxuICAgICAgICAgICAgYWRkS2V5ZWRSZW1vdmFsKGN1ckZyb21Ob2RlS2V5KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gTk9URTogd2Ugc2tpcCBuZXN0ZWQga2V5ZWQgbm9kZXMgZnJvbSBiZWluZyByZW1vdmVkIHNpbmNlIHRoZXJlIGlzXG4gICAgICAgICAgICAvLyAgICAgICBzdGlsbCBhIGNoYW5jZSB0aGV5IHdpbGwgYmUgbWF0Y2hlZCB1cCBsYXRlclxuICAgICAgICAgICAgcmVtb3ZlTm9kZShjdXJGcm9tTm9kZUNoaWxkLCBmcm9tRWwsIHRydWUgLyogc2tpcCBrZXllZCBub2RlcyAqLyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY3VyRnJvbU5vZGVDaGlsZCA9IGZyb21OZXh0U2libGluZztcbiAgICAgICAgfSAvLyBFTkQ6IHdoaWxlKGN1ckZyb21Ob2RlQ2hpbGQpIHt9XG5cbiAgICAgICAgLy8gSWYgd2UgZ290IHRoaXMgZmFyIHRoZW4gd2UgZGlkIG5vdCBmaW5kIGEgY2FuZGlkYXRlIG1hdGNoIGZvclxuICAgICAgICAvLyBvdXIgXCJ0byBub2RlXCIgYW5kIHdlIGV4aGF1c3RlZCBhbGwgb2YgdGhlIGNoaWxkcmVuIFwiZnJvbVwiXG4gICAgICAgIC8vIG5vZGVzLiBUaGVyZWZvcmUsIHdlIHdpbGwganVzdCBhcHBlbmQgdGhlIGN1cnJlbnQgXCJ0b1wiIG5vZGVcbiAgICAgICAgLy8gdG8gdGhlIGVuZFxuICAgICAgICBpZiAoY3VyVG9Ob2RlS2V5ICYmIChtYXRjaGluZ0Zyb21FbCA9IGZyb21Ob2Rlc0xvb2t1cFtjdXJUb05vZGVLZXldKSAmJiBjb21wYXJlTm9kZU5hbWVzKG1hdGNoaW5nRnJvbUVsLCBjdXJUb05vZGVDaGlsZCkpIHtcbiAgICAgICAgICAvLyBNT1JQSFxuICAgICAgICAgIGlmKCFza2lwRnJvbSl7IGFkZENoaWxkKGZyb21FbCwgbWF0Y2hpbmdGcm9tRWwpOyB9XG4gICAgICAgICAgbW9ycGhFbChtYXRjaGluZ0Zyb21FbCwgY3VyVG9Ob2RlQ2hpbGQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBvbkJlZm9yZU5vZGVBZGRlZFJlc3VsdCA9IG9uQmVmb3JlTm9kZUFkZGVkKGN1clRvTm9kZUNoaWxkKTtcbiAgICAgICAgICBpZiAob25CZWZvcmVOb2RlQWRkZWRSZXN1bHQgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICBpZiAob25CZWZvcmVOb2RlQWRkZWRSZXN1bHQpIHtcbiAgICAgICAgICAgICAgY3VyVG9Ob2RlQ2hpbGQgPSBvbkJlZm9yZU5vZGVBZGRlZFJlc3VsdDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGN1clRvTm9kZUNoaWxkLmFjdHVhbGl6ZSkge1xuICAgICAgICAgICAgICBjdXJUb05vZGVDaGlsZCA9IGN1clRvTm9kZUNoaWxkLmFjdHVhbGl6ZShmcm9tRWwub3duZXJEb2N1bWVudCB8fCBkb2MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYWRkQ2hpbGQoZnJvbUVsLCBjdXJUb05vZGVDaGlsZCk7XG4gICAgICAgICAgICBoYW5kbGVOb2RlQWRkZWQoY3VyVG9Ob2RlQ2hpbGQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGN1clRvTm9kZUNoaWxkID0gdG9OZXh0U2libGluZztcbiAgICAgICAgY3VyRnJvbU5vZGVDaGlsZCA9IGZyb21OZXh0U2libGluZztcbiAgICAgIH1cblxuICAgICAgY2xlYW51cEZyb21FbChmcm9tRWwsIGN1ckZyb21Ob2RlQ2hpbGQsIGN1ckZyb21Ob2RlS2V5KTtcblxuICAgICAgdmFyIHNwZWNpYWxFbEhhbmRsZXIgPSBzcGVjaWFsRWxIYW5kbGVyc1tmcm9tRWwubm9kZU5hbWVdO1xuICAgICAgaWYgKHNwZWNpYWxFbEhhbmRsZXIpIHtcbiAgICAgICAgc3BlY2lhbEVsSGFuZGxlcihmcm9tRWwsIHRvRWwpO1xuICAgICAgfVxuICAgIH0gLy8gRU5EOiBtb3JwaENoaWxkcmVuKC4uLilcblxuICAgIHZhciBtb3JwaGVkTm9kZSA9IGZyb21Ob2RlO1xuICAgIHZhciBtb3JwaGVkTm9kZVR5cGUgPSBtb3JwaGVkTm9kZS5ub2RlVHlwZTtcbiAgICB2YXIgdG9Ob2RlVHlwZSA9IHRvTm9kZS5ub2RlVHlwZTtcblxuICAgIGlmICghY2hpbGRyZW5Pbmx5KSB7XG4gICAgICAvLyBIYW5kbGUgdGhlIGNhc2Ugd2hlcmUgd2UgYXJlIGdpdmVuIHR3byBET00gbm9kZXMgdGhhdCBhcmUgbm90XG4gICAgICAvLyBjb21wYXRpYmxlIChlLmcuIDxkaXY+IC0tPiA8c3Bhbj4gb3IgPGRpdj4gLS0+IFRFWFQpXG4gICAgICBpZiAobW9ycGhlZE5vZGVUeXBlID09PSBFTEVNRU5UX05PREUpIHtcbiAgICAgICAgaWYgKHRvTm9kZVR5cGUgPT09IEVMRU1FTlRfTk9ERSkge1xuICAgICAgICAgIGlmICghY29tcGFyZU5vZGVOYW1lcyhmcm9tTm9kZSwgdG9Ob2RlKSkge1xuICAgICAgICAgICAgb25Ob2RlRGlzY2FyZGVkKGZyb21Ob2RlKTtcbiAgICAgICAgICAgIG1vcnBoZWROb2RlID0gbW92ZUNoaWxkcmVuKGZyb21Ob2RlLCBjcmVhdGVFbGVtZW50TlModG9Ob2RlLm5vZGVOYW1lLCB0b05vZGUubmFtZXNwYWNlVVJJKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIEdvaW5nIGZyb20gYW4gZWxlbWVudCBub2RlIHRvIGEgdGV4dCBub2RlXG4gICAgICAgICAgbW9ycGhlZE5vZGUgPSB0b05vZGU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAobW9ycGhlZE5vZGVUeXBlID09PSBURVhUX05PREUgfHwgbW9ycGhlZE5vZGVUeXBlID09PSBDT01NRU5UX05PREUpIHsgLy8gVGV4dCBvciBjb21tZW50IG5vZGVcbiAgICAgICAgaWYgKHRvTm9kZVR5cGUgPT09IG1vcnBoZWROb2RlVHlwZSkge1xuICAgICAgICAgIGlmIChtb3JwaGVkTm9kZS5ub2RlVmFsdWUgIT09IHRvTm9kZS5ub2RlVmFsdWUpIHtcbiAgICAgICAgICAgIG1vcnBoZWROb2RlLm5vZGVWYWx1ZSA9IHRvTm9kZS5ub2RlVmFsdWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIG1vcnBoZWROb2RlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFRleHQgbm9kZSB0byBzb21ldGhpbmcgZWxzZVxuICAgICAgICAgIG1vcnBoZWROb2RlID0gdG9Ob2RlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG1vcnBoZWROb2RlID09PSB0b05vZGUpIHtcbiAgICAgIC8vIFRoZSBcInRvIG5vZGVcIiB3YXMgbm90IGNvbXBhdGlibGUgd2l0aCB0aGUgXCJmcm9tIG5vZGVcIiBzbyB3ZSBoYWQgdG9cbiAgICAgIC8vIHRvc3Mgb3V0IHRoZSBcImZyb20gbm9kZVwiIGFuZCB1c2UgdGhlIFwidG8gbm9kZVwiXG4gICAgICBvbk5vZGVEaXNjYXJkZWQoZnJvbU5vZGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodG9Ob2RlLmlzU2FtZU5vZGUgJiYgdG9Ob2RlLmlzU2FtZU5vZGUobW9ycGhlZE5vZGUpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgbW9ycGhFbChtb3JwaGVkTm9kZSwgdG9Ob2RlLCBjaGlsZHJlbk9ubHkpO1xuXG4gICAgICAvLyBXZSBub3cgbmVlZCB0byBsb29wIG92ZXIgYW55IGtleWVkIG5vZGVzIHRoYXQgbWlnaHQgbmVlZCB0byBiZVxuICAgICAgLy8gcmVtb3ZlZC4gV2Ugb25seSBkbyB0aGUgcmVtb3ZhbCBpZiB3ZSBrbm93IHRoYXQgdGhlIGtleWVkIG5vZGVcbiAgICAgIC8vIG5ldmVyIGZvdW5kIGEgbWF0Y2guIFdoZW4gYSBrZXllZCBub2RlIGlzIG1hdGNoZWQgdXAgd2UgcmVtb3ZlXG4gICAgICAvLyBpdCBvdXQgb2YgZnJvbU5vZGVzTG9va3VwIGFuZCB3ZSB1c2UgZnJvbU5vZGVzTG9va3VwIHRvIGRldGVybWluZVxuICAgICAgLy8gaWYgYSBrZXllZCBub2RlIGhhcyBiZWVuIG1hdGNoZWQgdXAgb3Igbm90XG4gICAgICBpZiAoa2V5ZWRSZW1vdmFsTGlzdCkge1xuICAgICAgICBmb3IgKHZhciBpPTAsIGxlbj1rZXllZFJlbW92YWxMaXN0Lmxlbmd0aDsgaTxsZW47IGkrKykge1xuICAgICAgICAgIHZhciBlbFRvUmVtb3ZlID0gZnJvbU5vZGVzTG9va3VwW2tleWVkUmVtb3ZhbExpc3RbaV1dO1xuICAgICAgICAgIGlmIChlbFRvUmVtb3ZlKSB7XG4gICAgICAgICAgICByZW1vdmVOb2RlKGVsVG9SZW1vdmUsIGVsVG9SZW1vdmUucGFyZW50Tm9kZSwgZmFsc2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghY2hpbGRyZW5Pbmx5ICYmIG1vcnBoZWROb2RlICE9PSBmcm9tTm9kZSAmJiBmcm9tTm9kZS5wYXJlbnROb2RlKSB7XG4gICAgICBpZiAobW9ycGhlZE5vZGUuYWN0dWFsaXplKSB7XG4gICAgICAgIG1vcnBoZWROb2RlID0gbW9ycGhlZE5vZGUuYWN0dWFsaXplKGZyb21Ob2RlLm93bmVyRG9jdW1lbnQgfHwgZG9jKTtcbiAgICAgIH1cbiAgICAgIC8vIElmIHdlIGhhZCB0byBzd2FwIG91dCB0aGUgZnJvbSBub2RlIHdpdGggYSBuZXcgbm9kZSBiZWNhdXNlIHRoZSBvbGRcbiAgICAgIC8vIG5vZGUgd2FzIG5vdCBjb21wYXRpYmxlIHdpdGggdGhlIHRhcmdldCBub2RlIHRoZW4gd2UgbmVlZCB0b1xuICAgICAgLy8gcmVwbGFjZSB0aGUgb2xkIERPTSBub2RlIGluIHRoZSBvcmlnaW5hbCBET00gdHJlZS4gVGhpcyBpcyBvbmx5XG4gICAgICAvLyBwb3NzaWJsZSBpZiB0aGUgb3JpZ2luYWwgRE9NIG5vZGUgd2FzIHBhcnQgb2YgYSBET00gdHJlZSB3aGljaFxuICAgICAgLy8gd2Uga25vdyBpcyB0aGUgY2FzZSBpZiBpdCBoYXMgYSBwYXJlbnQgbm9kZS5cbiAgICAgIGZyb21Ob2RlLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKG1vcnBoZWROb2RlLCBmcm9tTm9kZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1vcnBoZWROb2RlO1xuICB9O1xufVxuXG52YXIgbW9ycGhkb20gPSBtb3JwaGRvbUZhY3RvcnkobW9ycGhBdHRycyk7XG5cbmV4cG9ydCBkZWZhdWx0IG1vcnBoZG9tO1xuIiwgImltcG9ydCB7XG4gIFBIWF9DT01QT05FTlQsXG4gIFBIWF9ESVNBQkxFX1dJVEgsXG4gIFBIWF9GRUVEQkFDS19GT1IsXG4gIFBIWF9QUlVORSxcbiAgUEhYX1JPT1RfSUQsXG4gIFBIWF9TRVNTSU9OLFxuICBQSFhfU0tJUCxcbiAgUEhYX1NUQVRJQyxcbiAgUEhYX1RSSUdHRVJfQUNUSU9OLFxuICBQSFhfVVBEQVRFLFxuICBQSFhfU1RSRUFNLFxuICBQSFhfU1RSRUFNX1JFRixcbiAgUEhYX1ZJRVdQT1JUX1RPUCxcbiAgUEhYX1ZJRVdQT1JUX0JPVFRPTSxcbn0gZnJvbSBcIi4vY29uc3RhbnRzXCJcblxuaW1wb3J0IHtcbiAgZGV0ZWN0RHVwbGljYXRlSWRzLFxuICBpc0NpZFxufSBmcm9tIFwiLi91dGlsc1wiXG5cbmltcG9ydCBET00gZnJvbSBcIi4vZG9tXCJcbmltcG9ydCBET01Qb3N0TW9ycGhSZXN0b3JlciBmcm9tIFwiLi9kb21fcG9zdF9tb3JwaF9yZXN0b3JlclwiXG5pbXBvcnQgbW9ycGhkb20gZnJvbSBcIm1vcnBoZG9tXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRE9NUGF0Y2gge1xuICBzdGF0aWMgcGF0Y2hFbChmcm9tRWwsIHRvRWwsIGFjdGl2ZUVsZW1lbnQpe1xuICAgIG1vcnBoZG9tKGZyb21FbCwgdG9FbCwge1xuICAgICAgY2hpbGRyZW5Pbmx5OiBmYWxzZSxcbiAgICAgIG9uQmVmb3JlRWxVcGRhdGVkOiAoZnJvbUVsLCB0b0VsKSA9PiB7XG4gICAgICAgIGlmKGFjdGl2ZUVsZW1lbnQgJiYgYWN0aXZlRWxlbWVudC5pc1NhbWVOb2RlKGZyb21FbCkgJiYgRE9NLmlzRm9ybUlucHV0KGZyb21FbCkpe1xuICAgICAgICAgIERPTS5tZXJnZUZvY3VzZWRJbnB1dChmcm9tRWwsIHRvRWwpXG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgY29uc3RydWN0b3IodmlldywgY29udGFpbmVyLCBpZCwgaHRtbCwgc3RyZWFtcywgdGFyZ2V0Q0lEKXtcbiAgICB0aGlzLnZpZXcgPSB2aWV3XG4gICAgdGhpcy5saXZlU29ja2V0ID0gdmlldy5saXZlU29ja2V0XG4gICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXJcbiAgICB0aGlzLmlkID0gaWRcbiAgICB0aGlzLnJvb3RJRCA9IHZpZXcucm9vdC5pZFxuICAgIHRoaXMuaHRtbCA9IGh0bWxcbiAgICB0aGlzLnN0cmVhbXMgPSBzdHJlYW1zXG4gICAgdGhpcy5zdHJlYW1JbnNlcnRzID0ge31cbiAgICB0aGlzLnRhcmdldENJRCA9IHRhcmdldENJRFxuICAgIHRoaXMuY2lkUGF0Y2ggPSBpc0NpZCh0aGlzLnRhcmdldENJRClcbiAgICB0aGlzLnBlbmRpbmdSZW1vdmVzID0gW11cbiAgICB0aGlzLnBoeFJlbW92ZSA9IHRoaXMubGl2ZVNvY2tldC5iaW5kaW5nKFwicmVtb3ZlXCIpXG4gICAgdGhpcy5jYWxsYmFja3MgPSB7XG4gICAgICBiZWZvcmVhZGRlZDogW10sIGJlZm9yZXVwZGF0ZWQ6IFtdLCBiZWZvcmVwaHhDaGlsZEFkZGVkOiBbXSxcbiAgICAgIGFmdGVyYWRkZWQ6IFtdLCBhZnRlcnVwZGF0ZWQ6IFtdLCBhZnRlcmRpc2NhcmRlZDogW10sIGFmdGVycGh4Q2hpbGRBZGRlZDogW10sXG4gICAgICBhZnRlcnRyYW5zaXRpb25zRGlzY2FyZGVkOiBbXVxuICAgIH1cbiAgfVxuXG4gIGJlZm9yZShraW5kLCBjYWxsYmFjayl7IHRoaXMuY2FsbGJhY2tzW2BiZWZvcmUke2tpbmR9YF0ucHVzaChjYWxsYmFjaykgfVxuICBhZnRlcihraW5kLCBjYWxsYmFjayl7IHRoaXMuY2FsbGJhY2tzW2BhZnRlciR7a2luZH1gXS5wdXNoKGNhbGxiYWNrKSB9XG5cbiAgdHJhY2tCZWZvcmUoa2luZCwgLi4uYXJncyl7XG4gICAgdGhpcy5jYWxsYmFja3NbYGJlZm9yZSR7a2luZH1gXS5mb3JFYWNoKGNhbGxiYWNrID0+IGNhbGxiYWNrKC4uLmFyZ3MpKVxuICB9XG5cbiAgdHJhY2tBZnRlcihraW5kLCAuLi5hcmdzKXtcbiAgICB0aGlzLmNhbGxiYWNrc1tgYWZ0ZXIke2tpbmR9YF0uZm9yRWFjaChjYWxsYmFjayA9PiBjYWxsYmFjayguLi5hcmdzKSlcbiAgfVxuXG4gIG1hcmtQcnVuYWJsZUNvbnRlbnRGb3JSZW1vdmFsKCl7XG4gICAgbGV0IHBoeFVwZGF0ZSA9IHRoaXMubGl2ZVNvY2tldC5iaW5kaW5nKFBIWF9VUERBVEUpXG4gICAgRE9NLmFsbCh0aGlzLmNvbnRhaW5lciwgYFske3BoeFVwZGF0ZX09JHtQSFhfU1RSRUFNfV1gLCBlbCA9PiBlbC5pbm5lckhUTUwgPSBcIlwiKVxuICAgIERPTS5hbGwodGhpcy5jb250YWluZXIsIGBbJHtwaHhVcGRhdGV9PWFwcGVuZF0gPiAqLCBbJHtwaHhVcGRhdGV9PXByZXBlbmRdID4gKmAsIGVsID0+IHtcbiAgICAgIGVsLnNldEF0dHJpYnV0ZShQSFhfUFJVTkUsIFwiXCIpXG4gICAgfSlcbiAgfVxuXG4gIHBlcmZvcm0oKXtcbiAgICBsZXQge3ZpZXcsIGxpdmVTb2NrZXQsIGNvbnRhaW5lciwgaHRtbH0gPSB0aGlzXG4gICAgbGV0IHRhcmdldENvbnRhaW5lciA9IHRoaXMuaXNDSURQYXRjaCgpID8gdGhpcy50YXJnZXRDSURDb250YWluZXIoaHRtbCkgOiBjb250YWluZXJcbiAgICBpZih0aGlzLmlzQ0lEUGF0Y2goKSAmJiAhdGFyZ2V0Q29udGFpbmVyKXsgcmV0dXJuIH1cblxuICAgIGxldCBmb2N1c2VkID0gbGl2ZVNvY2tldC5nZXRBY3RpdmVFbGVtZW50KClcbiAgICBsZXQge3NlbGVjdGlvblN0YXJ0LCBzZWxlY3Rpb25FbmR9ID0gZm9jdXNlZCAmJiBET00uaGFzU2VsZWN0aW9uUmFuZ2UoZm9jdXNlZCkgPyBmb2N1c2VkIDoge31cbiAgICBsZXQgcGh4VXBkYXRlID0gbGl2ZVNvY2tldC5iaW5kaW5nKFBIWF9VUERBVEUpXG4gICAgbGV0IHBoeEZlZWRiYWNrRm9yID0gbGl2ZVNvY2tldC5iaW5kaW5nKFBIWF9GRUVEQkFDS19GT1IpXG4gICAgbGV0IGRpc2FibGVXaXRoID0gbGl2ZVNvY2tldC5iaW5kaW5nKFBIWF9ESVNBQkxFX1dJVEgpXG4gICAgbGV0IHBoeFZpZXdwb3J0VG9wID0gbGl2ZVNvY2tldC5iaW5kaW5nKFBIWF9WSUVXUE9SVF9UT1ApXG4gICAgbGV0IHBoeFZpZXdwb3J0Qm90dG9tID0gbGl2ZVNvY2tldC5iaW5kaW5nKFBIWF9WSUVXUE9SVF9CT1RUT00pXG4gICAgbGV0IHBoeFRyaWdnZXJFeHRlcm5hbCA9IGxpdmVTb2NrZXQuYmluZGluZyhQSFhfVFJJR0dFUl9BQ1RJT04pXG4gICAgbGV0IGFkZGVkID0gW11cbiAgICBsZXQgdHJhY2tlZElucHV0cyA9IFtdXG4gICAgbGV0IHVwZGF0ZXMgPSBbXVxuICAgIGxldCBhcHBlbmRQcmVwZW5kVXBkYXRlcyA9IFtdXG5cbiAgICBsZXQgZXh0ZXJuYWxGb3JtVHJpZ2dlcmVkID0gbnVsbFxuXG4gICAgbGV0IGRpZmZIVE1MID0gbGl2ZVNvY2tldC50aW1lKFwicHJlbW9ycGggY29udGFpbmVyIHByZXBcIiwgKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuYnVpbGREaWZmSFRNTChjb250YWluZXIsIGh0bWwsIHBoeFVwZGF0ZSwgdGFyZ2V0Q29udGFpbmVyKVxuICAgIH0pXG5cbiAgICB0aGlzLnRyYWNrQmVmb3JlKFwiYWRkZWRcIiwgY29udGFpbmVyKVxuICAgIHRoaXMudHJhY2tCZWZvcmUoXCJ1cGRhdGVkXCIsIGNvbnRhaW5lciwgY29udGFpbmVyKVxuXG4gICAgbGl2ZVNvY2tldC50aW1lKFwibW9ycGhkb21cIiwgKCkgPT4ge1xuICAgICAgdGhpcy5zdHJlYW1zLmZvckVhY2goKFtyZWYsIGluc2VydHMsIGRlbGV0ZUlkcywgcmVzZXRdKSA9PiB7XG4gICAgICAgIE9iamVjdC5lbnRyaWVzKGluc2VydHMpLmZvckVhY2goKFtrZXksIFtzdHJlYW1BdCwgbGltaXRdXSkgPT4ge1xuICAgICAgICAgIHRoaXMuc3RyZWFtSW5zZXJ0c1trZXldID0ge3JlZiwgc3RyZWFtQXQsIGxpbWl0fVxuICAgICAgICB9KVxuICAgICAgICBpZihyZXNldCAhPT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICBET00uYWxsKGNvbnRhaW5lciwgYFske1BIWF9TVFJFQU1fUkVGfT1cIiR7cmVmfVwiXWAsIGNoaWxkID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlU3RyZWFtQ2hpbGRFbGVtZW50KGNoaWxkKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgZGVsZXRlSWRzLmZvckVhY2goaWQgPT4ge1xuICAgICAgICAgIGxldCBjaGlsZCA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKGBbaWQ9XCIke2lkfVwiXWApXG4gICAgICAgICAgaWYoY2hpbGQpeyB0aGlzLnJlbW92ZVN0cmVhbUNoaWxkRWxlbWVudChjaGlsZCkgfVxuICAgICAgICB9KVxuICAgICAgfSlcblxuICAgICAgbW9ycGhkb20odGFyZ2V0Q29udGFpbmVyLCBkaWZmSFRNTCwge1xuICAgICAgICBjaGlsZHJlbk9ubHk6IHRhcmdldENvbnRhaW5lci5nZXRBdHRyaWJ1dGUoUEhYX0NPTVBPTkVOVCkgPT09IG51bGwsXG4gICAgICAgIGdldE5vZGVLZXk6IChub2RlKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIERPTS5pc1BoeERlc3Ryb3llZChub2RlKSA/IG51bGwgOiBub2RlLmlkXG4gICAgICAgIH0sXG4gICAgICAgIC8vIHNraXAgaW5kZXhpbmcgZnJvbSBjaGlsZHJlbiB3aGVuIGNvbnRhaW5lciBpcyBzdHJlYW1cbiAgICAgICAgc2tpcEZyb21DaGlsZHJlbjogKGZyb20pID0+IHsgcmV0dXJuIGZyb20uZ2V0QXR0cmlidXRlKHBoeFVwZGF0ZSkgPT09IFBIWF9TVFJFQU0gfSxcbiAgICAgICAgLy8gdGVsbCBtb3JwaGRvbSBob3cgdG8gYWRkIGEgY2hpbGRcbiAgICAgICAgYWRkQ2hpbGQ6IChwYXJlbnQsIGNoaWxkKSA9PiB7XG4gICAgICAgICAgbGV0IHtyZWYsIHN0cmVhbUF0LCBsaW1pdH0gPSB0aGlzLmdldFN0cmVhbUluc2VydChjaGlsZClcbiAgICAgICAgICBpZihyZWYgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gcGFyZW50LmFwcGVuZENoaWxkKGNoaWxkKSB9XG5cbiAgICAgICAgICBET00ucHV0U3RpY2t5KGNoaWxkLCBQSFhfU1RSRUFNX1JFRiwgZWwgPT4gZWwuc2V0QXR0cmlidXRlKFBIWF9TVFJFQU1fUkVGLCByZWYpKVxuXG4gICAgICAgICAgLy8gc3RyZWFtaW5nXG4gICAgICAgICAgaWYoc3RyZWFtQXQgPT09IDApe1xuICAgICAgICAgICAgcGFyZW50Lmluc2VydEFkamFjZW50RWxlbWVudChcImFmdGVyYmVnaW5cIiwgY2hpbGQpXG4gICAgICAgICAgfSBlbHNlIGlmKHN0cmVhbUF0ID09PSAtMSl7XG4gICAgICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoY2hpbGQpXG4gICAgICAgICAgfSBlbHNlIGlmKHN0cmVhbUF0ID4gMCl7XG4gICAgICAgICAgICBsZXQgc2libGluZyA9IEFycmF5LmZyb20ocGFyZW50LmNoaWxkcmVuKVtzdHJlYW1BdF1cbiAgICAgICAgICAgIHBhcmVudC5pbnNlcnRCZWZvcmUoY2hpbGQsIHNpYmxpbmcpXG4gICAgICAgICAgfVxuICAgICAgICAgIGxldCBjaGlsZHJlbiA9IGxpbWl0ICE9PSBudWxsICYmIEFycmF5LmZyb20ocGFyZW50LmNoaWxkcmVuKVxuICAgICAgICAgIGxldCBjaGlsZHJlblRvUmVtb3ZlID0gW11cbiAgICAgICAgICBpZihsaW1pdCAmJiBsaW1pdCA8IDAgJiYgY2hpbGRyZW4ubGVuZ3RoID4gbGltaXQgKiAtMSl7XG4gICAgICAgICAgICBjaGlsZHJlblRvUmVtb3ZlID0gY2hpbGRyZW4uc2xpY2UoMCwgY2hpbGRyZW4ubGVuZ3RoICsgbGltaXQpXG4gICAgICAgICAgfSBlbHNlIGlmKGxpbWl0ICYmIGxpbWl0ID49IDAgJiYgY2hpbGRyZW4ubGVuZ3RoID4gbGltaXQpe1xuICAgICAgICAgICAgY2hpbGRyZW5Ub1JlbW92ZSA9IGNoaWxkcmVuLnNsaWNlKGxpbWl0KVxuICAgICAgICAgIH1cbiAgICAgICAgICBjaGlsZHJlblRvUmVtb3ZlLmZvckVhY2gocmVtb3ZlQ2hpbGQgPT4ge1xuICAgICAgICAgICAgLy8gZG8gbm90IHJlbW92ZSBjaGlsZCBhcyBwYXJ0IG9mIGxpbWl0IGlmIHdlIGFyZSByZS1hZGRpbmcgaXRcbiAgICAgICAgICAgIGlmKCF0aGlzLnN0cmVhbUluc2VydHNbcmVtb3ZlQ2hpbGQuaWRdKXtcbiAgICAgICAgICAgICAgdGhpcy5yZW1vdmVTdHJlYW1DaGlsZEVsZW1lbnQocmVtb3ZlQ2hpbGQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgb25CZWZvcmVOb2RlQWRkZWQ6IChlbCkgPT4ge1xuICAgICAgICAgIERPTS5tYXliZUFkZFByaXZhdGVIb29rcyhlbCwgcGh4Vmlld3BvcnRUb3AsIHBoeFZpZXdwb3J0Qm90dG9tKVxuICAgICAgICAgIHRoaXMudHJhY2tCZWZvcmUoXCJhZGRlZFwiLCBlbClcbiAgICAgICAgICByZXR1cm4gZWxcbiAgICAgICAgfSxcbiAgICAgICAgb25Ob2RlQWRkZWQ6IChlbCkgPT4ge1xuICAgICAgICAgIGlmKGVsLmdldEF0dHJpYnV0ZSl7IHRoaXMubWF5YmVSZU9yZGVyU3RyZWFtKGVsKSB9XG5cbiAgICAgICAgICAvLyBoYWNrIHRvIGZpeCBTYWZhcmkgaGFuZGxpbmcgb2YgaW1nIHNyY3NldCBhbmQgdmlkZW8gdGFnc1xuICAgICAgICAgIGlmKGVsIGluc3RhbmNlb2YgSFRNTEltYWdlRWxlbWVudCAmJiBlbC5zcmNzZXQpe1xuICAgICAgICAgICAgZWwuc3Jjc2V0ID0gZWwuc3Jjc2V0XG4gICAgICAgICAgfSBlbHNlIGlmKGVsIGluc3RhbmNlb2YgSFRNTFZpZGVvRWxlbWVudCAmJiBlbC5hdXRvcGxheSl7XG4gICAgICAgICAgICBlbC5wbGF5KClcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYoRE9NLmlzTm93VHJpZ2dlckZvcm1FeHRlcm5hbChlbCwgcGh4VHJpZ2dlckV4dGVybmFsKSl7XG4gICAgICAgICAgICBleHRlcm5hbEZvcm1UcmlnZ2VyZWQgPSBlbFxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmKGVsLmdldEF0dHJpYnV0ZSAmJiBlbC5nZXRBdHRyaWJ1dGUoXCJuYW1lXCIpICYmIERPTS5pc0Zvcm1JbnB1dChlbCkpe1xuICAgICAgICAgICAgdHJhY2tlZElucHV0cy5wdXNoKGVsKVxuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBuZXN0ZWQgdmlldyBoYW5kbGluZ1xuICAgICAgICAgIGlmKChET00uaXNQaHhDaGlsZChlbCkgJiYgdmlldy5vd25zRWxlbWVudChlbCkpIHx8IERPTS5pc1BoeFN0aWNreShlbCkgJiYgdmlldy5vd25zRWxlbWVudChlbC5wYXJlbnROb2RlKSl7XG4gICAgICAgICAgICB0aGlzLnRyYWNrQWZ0ZXIoXCJwaHhDaGlsZEFkZGVkXCIsIGVsKVxuICAgICAgICAgIH1cbiAgICAgICAgICBhZGRlZC5wdXNoKGVsKVxuICAgICAgICB9LFxuICAgICAgICBvbk5vZGVEaXNjYXJkZWQ6IChlbCkgPT4gdGhpcy5vbk5vZGVEaXNjYXJkZWQoZWwpLFxuICAgICAgICBvbkJlZm9yZU5vZGVEaXNjYXJkZWQ6IChlbCkgPT4ge1xuICAgICAgICAgIGlmKGVsLmdldEF0dHJpYnV0ZSAmJiBlbC5nZXRBdHRyaWJ1dGUoUEhYX1BSVU5FKSAhPT0gbnVsbCl7IHJldHVybiB0cnVlIH1cbiAgICAgICAgICBpZihlbC5wYXJlbnRFbGVtZW50ICE9PSBudWxsICYmIGVsLmlkICYmXG4gICAgICAgICAgICBET00uaXNQaHhVcGRhdGUoZWwucGFyZW50RWxlbWVudCwgcGh4VXBkYXRlLCBbUEhYX1NUUkVBTSwgXCJhcHBlbmRcIiwgXCJwcmVwZW5kXCJdKSl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYodGhpcy5tYXliZVBlbmRpbmdSZW1vdmUoZWwpKXsgcmV0dXJuIGZhbHNlIH1cbiAgICAgICAgICBpZih0aGlzLnNraXBDSURTaWJsaW5nKGVsKSl7IHJldHVybiBmYWxzZSB9XG5cbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICBvbkVsVXBkYXRlZDogKGVsKSA9PiB7XG4gICAgICAgICAgaWYoRE9NLmlzTm93VHJpZ2dlckZvcm1FeHRlcm5hbChlbCwgcGh4VHJpZ2dlckV4dGVybmFsKSl7XG4gICAgICAgICAgICBleHRlcm5hbEZvcm1UcmlnZ2VyZWQgPSBlbFxuICAgICAgICAgIH1cbiAgICAgICAgICB1cGRhdGVzLnB1c2goZWwpXG4gICAgICAgICAgdGhpcy5tYXliZVJlT3JkZXJTdHJlYW0oZWwpXG4gICAgICAgIH0sXG4gICAgICAgIG9uQmVmb3JlRWxVcGRhdGVkOiAoZnJvbUVsLCB0b0VsKSA9PiB7XG4gICAgICAgICAgRE9NLm1heWJlQWRkUHJpdmF0ZUhvb2tzKHRvRWwsIHBoeFZpZXdwb3J0VG9wLCBwaHhWaWV3cG9ydEJvdHRvbSlcbiAgICAgICAgICBET00uY2xlYW5DaGlsZE5vZGVzKHRvRWwsIHBoeFVwZGF0ZSlcbiAgICAgICAgICBpZih0aGlzLnNraXBDSURTaWJsaW5nKHRvRWwpKXsgcmV0dXJuIGZhbHNlIH1cbiAgICAgICAgICBpZihET00uaXNQaHhTdGlja3koZnJvbUVsKSl7IHJldHVybiBmYWxzZSB9XG4gICAgICAgICAgaWYoRE9NLmlzSWdub3JlZChmcm9tRWwsIHBoeFVwZGF0ZSkgfHwgKGZyb21FbC5mb3JtICYmIGZyb21FbC5mb3JtLmlzU2FtZU5vZGUoZXh0ZXJuYWxGb3JtVHJpZ2dlcmVkKSkpe1xuICAgICAgICAgICAgdGhpcy50cmFja0JlZm9yZShcInVwZGF0ZWRcIiwgZnJvbUVsLCB0b0VsKVxuICAgICAgICAgICAgRE9NLm1lcmdlQXR0cnMoZnJvbUVsLCB0b0VsLCB7aXNJZ25vcmVkOiB0cnVlfSlcbiAgICAgICAgICAgIHVwZGF0ZXMucHVzaChmcm9tRWwpXG4gICAgICAgICAgICBET00uYXBwbHlTdGlja3lPcGVyYXRpb25zKGZyb21FbClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZihmcm9tRWwudHlwZSA9PT0gXCJudW1iZXJcIiAmJiAoZnJvbUVsLnZhbGlkaXR5ICYmIGZyb21FbC52YWxpZGl0eS5iYWRJbnB1dCkpeyByZXR1cm4gZmFsc2UgfVxuICAgICAgICAgIGlmKCFET00uc3luY1BlbmRpbmdSZWYoZnJvbUVsLCB0b0VsLCBkaXNhYmxlV2l0aCkpe1xuICAgICAgICAgICAgaWYoRE9NLmlzVXBsb2FkSW5wdXQoZnJvbUVsKSl7XG4gICAgICAgICAgICAgIHRoaXMudHJhY2tCZWZvcmUoXCJ1cGRhdGVkXCIsIGZyb21FbCwgdG9FbClcbiAgICAgICAgICAgICAgdXBkYXRlcy5wdXNoKGZyb21FbClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIERPTS5hcHBseVN0aWNreU9wZXJhdGlvbnMoZnJvbUVsKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gbmVzdGVkIHZpZXcgaGFuZGxpbmdcbiAgICAgICAgICBpZihET00uaXNQaHhDaGlsZCh0b0VsKSl7XG4gICAgICAgICAgICBsZXQgcHJldlNlc3Npb24gPSBmcm9tRWwuZ2V0QXR0cmlidXRlKFBIWF9TRVNTSU9OKVxuICAgICAgICAgICAgRE9NLm1lcmdlQXR0cnMoZnJvbUVsLCB0b0VsLCB7ZXhjbHVkZTogW1BIWF9TVEFUSUNdfSlcbiAgICAgICAgICAgIGlmKHByZXZTZXNzaW9uICE9PSBcIlwiKXsgZnJvbUVsLnNldEF0dHJpYnV0ZShQSFhfU0VTU0lPTiwgcHJldlNlc3Npb24pIH1cbiAgICAgICAgICAgIGZyb21FbC5zZXRBdHRyaWJ1dGUoUEhYX1JPT1RfSUQsIHRoaXMucm9vdElEKVxuICAgICAgICAgICAgRE9NLmFwcGx5U3RpY2t5T3BlcmF0aW9ucyhmcm9tRWwpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBpbnB1dCBoYW5kbGluZ1xuICAgICAgICAgIERPTS5jb3B5UHJpdmF0ZXModG9FbCwgZnJvbUVsKVxuXG4gICAgICAgICAgbGV0IGlzRm9jdXNlZEZvcm1FbCA9IGZvY3VzZWQgJiYgZnJvbUVsLmlzU2FtZU5vZGUoZm9jdXNlZCkgJiYgRE9NLmlzRm9ybUlucHV0KGZyb21FbClcbiAgICAgICAgICBpZihpc0ZvY3VzZWRGb3JtRWwgJiYgZnJvbUVsLnR5cGUgIT09IFwiaGlkZGVuXCIpe1xuICAgICAgICAgICAgdGhpcy50cmFja0JlZm9yZShcInVwZGF0ZWRcIiwgZnJvbUVsLCB0b0VsKVxuICAgICAgICAgICAgRE9NLm1lcmdlRm9jdXNlZElucHV0KGZyb21FbCwgdG9FbClcbiAgICAgICAgICAgIERPTS5zeW5jQXR0cnNUb1Byb3BzKGZyb21FbClcbiAgICAgICAgICAgIHVwZGF0ZXMucHVzaChmcm9tRWwpXG4gICAgICAgICAgICBET00uYXBwbHlTdGlja3lPcGVyYXRpb25zKGZyb21FbClcbiAgICAgICAgICAgIHRyYWNrZWRJbnB1dHMucHVzaChmcm9tRWwpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYoRE9NLmlzUGh4VXBkYXRlKHRvRWwsIHBoeFVwZGF0ZSwgW1wiYXBwZW5kXCIsIFwicHJlcGVuZFwiXSkpe1xuICAgICAgICAgICAgICBhcHBlbmRQcmVwZW5kVXBkYXRlcy5wdXNoKG5ldyBET01Qb3N0TW9ycGhSZXN0b3Jlcihmcm9tRWwsIHRvRWwsIHRvRWwuZ2V0QXR0cmlidXRlKHBoeFVwZGF0ZSkpKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBET00uc3luY0F0dHJzVG9Qcm9wcyh0b0VsKVxuICAgICAgICAgICAgRE9NLmFwcGx5U3RpY2t5T3BlcmF0aW9ucyh0b0VsKVxuICAgICAgICAgICAgaWYodG9FbC5nZXRBdHRyaWJ1dGUoXCJuYW1lXCIpICYmIERPTS5pc0Zvcm1JbnB1dCh0b0VsKSl7XG4gICAgICAgICAgICAgIHRyYWNrZWRJbnB1dHMucHVzaCh0b0VsKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy50cmFja0JlZm9yZShcInVwZGF0ZWRcIiwgZnJvbUVsLCB0b0VsKVxuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcblxuICAgIGlmKGxpdmVTb2NrZXQuaXNEZWJ1Z0VuYWJsZWQoKSl7IGRldGVjdER1cGxpY2F0ZUlkcygpIH1cblxuICAgIGlmKGFwcGVuZFByZXBlbmRVcGRhdGVzLmxlbmd0aCA+IDApe1xuICAgICAgbGl2ZVNvY2tldC50aW1lKFwicG9zdC1tb3JwaCBhcHBlbmQvcHJlcGVuZCByZXN0b3JhdGlvblwiLCAoKSA9PiB7XG4gICAgICAgIGFwcGVuZFByZXBlbmRVcGRhdGVzLmZvckVhY2godXBkYXRlID0+IHVwZGF0ZS5wZXJmb3JtKCkpXG4gICAgICB9KVxuICAgIH1cblxuICAgIHRyYWNrZWRJbnB1dHMuZm9yRWFjaChpbnB1dCA9PiB7XG4gICAgICBET00ubWF5YmVIaWRlRmVlZGJhY2sodGFyZ2V0Q29udGFpbmVyLCBpbnB1dCwgcGh4RmVlZGJhY2tGb3IpXG4gICAgfSlcblxuICAgIGxpdmVTb2NrZXQuc2lsZW5jZUV2ZW50cygoKSA9PiBET00ucmVzdG9yZUZvY3VzKGZvY3VzZWQsIHNlbGVjdGlvblN0YXJ0LCBzZWxlY3Rpb25FbmQpKVxuICAgIERPTS5kaXNwYXRjaEV2ZW50KGRvY3VtZW50LCBcInBoeDp1cGRhdGVcIilcbiAgICBhZGRlZC5mb3JFYWNoKGVsID0+IHRoaXMudHJhY2tBZnRlcihcImFkZGVkXCIsIGVsKSlcbiAgICB1cGRhdGVzLmZvckVhY2goZWwgPT4gdGhpcy50cmFja0FmdGVyKFwidXBkYXRlZFwiLCBlbCkpXG5cbiAgICB0aGlzLnRyYW5zaXRpb25QZW5kaW5nUmVtb3ZlcygpXG5cbiAgICBpZihleHRlcm5hbEZvcm1UcmlnZ2VyZWQpe1xuICAgICAgbGl2ZVNvY2tldC51bmxvYWQoKVxuICAgICAgZXh0ZXJuYWxGb3JtVHJpZ2dlcmVkLnN1Ym1pdCgpXG4gICAgfVxuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBvbk5vZGVEaXNjYXJkZWQoZWwpe1xuICAgIC8vIG5lc3RlZCB2aWV3IGhhbmRsaW5nXG4gICAgaWYoRE9NLmlzUGh4Q2hpbGQoZWwpIHx8IERPTS5pc1BoeFN0aWNreShlbCkpeyB0aGlzLmxpdmVTb2NrZXQuZGVzdHJveVZpZXdCeUVsKGVsKSB9XG4gICAgdGhpcy50cmFja0FmdGVyKFwiZGlzY2FyZGVkXCIsIGVsKVxuICB9XG5cbiAgbWF5YmVQZW5kaW5nUmVtb3ZlKG5vZGUpe1xuICAgIGlmKG5vZGUuZ2V0QXR0cmlidXRlICYmIG5vZGUuZ2V0QXR0cmlidXRlKHRoaXMucGh4UmVtb3ZlKSAhPT0gbnVsbCl7XG4gICAgICB0aGlzLnBlbmRpbmdSZW1vdmVzLnB1c2gobm9kZSlcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgfVxuXG4gIHJlbW92ZVN0cmVhbUNoaWxkRWxlbWVudChjaGlsZCl7XG4gICAgaWYoIXRoaXMubWF5YmVQZW5kaW5nUmVtb3ZlKGNoaWxkKSl7XG4gICAgICBjaGlsZC5yZW1vdmUoKVxuICAgICAgdGhpcy5vbk5vZGVEaXNjYXJkZWQoY2hpbGQpXG4gICAgfVxuICB9XG5cbiAgZ2V0U3RyZWFtSW5zZXJ0KGVsKXtcbiAgICBsZXQgaW5zZXJ0ID0gZWwuaWQgPyB0aGlzLnN0cmVhbUluc2VydHNbZWwuaWRdIDoge31cbiAgICByZXR1cm4gaW5zZXJ0IHx8IHt9XG4gIH1cblxuICBtYXliZVJlT3JkZXJTdHJlYW0oZWwpe1xuICAgIGxldCB7cmVmLCBzdHJlYW1BdCwgbGltaXR9ID0gdGhpcy5nZXRTdHJlYW1JbnNlcnQoZWwpXG4gICAgaWYoc3RyZWFtQXQgPT09IHVuZGVmaW5lZCl7IHJldHVybiB9XG5cbiAgICAvLyB3ZSBuZWVkIHRvIHRoZSBQSFhfU1RSRUFNX1JFRiBoZXJlIGFzIHdlbGwgYXMgYWRkQ2hpbGQgaXMgaW52b2tlZCBvbmx5IGZvciBwYXJlbnRzXG4gICAgRE9NLnB1dFN0aWNreShlbCwgUEhYX1NUUkVBTV9SRUYsIGVsID0+IGVsLnNldEF0dHJpYnV0ZShQSFhfU1RSRUFNX1JFRiwgcmVmKSlcblxuICAgIGlmKHN0cmVhbUF0ID09PSAwKXtcbiAgICAgIGVsLnBhcmVudEVsZW1lbnQuaW5zZXJ0QmVmb3JlKGVsLCBlbC5wYXJlbnRFbGVtZW50LmZpcnN0RWxlbWVudENoaWxkKVxuICAgIH0gZWxzZSBpZihzdHJlYW1BdCA+IDApe1xuICAgICAgbGV0IGNoaWxkcmVuID0gQXJyYXkuZnJvbShlbC5wYXJlbnRFbGVtZW50LmNoaWxkcmVuKVxuICAgICAgbGV0IG9sZEluZGV4ID0gY2hpbGRyZW4uaW5kZXhPZihlbClcbiAgICAgIGlmKHN0cmVhbUF0ID49IGNoaWxkcmVuLmxlbmd0aCAtIDEpe1xuICAgICAgICBlbC5wYXJlbnRFbGVtZW50LmFwcGVuZENoaWxkKGVsKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IHNpYmxpbmcgPSBjaGlsZHJlbltzdHJlYW1BdF1cbiAgICAgICAgaWYob2xkSW5kZXggPiBzdHJlYW1BdCl7XG4gICAgICAgICAgZWwucGFyZW50RWxlbWVudC5pbnNlcnRCZWZvcmUoZWwsIHNpYmxpbmcpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZWwucGFyZW50RWxlbWVudC5pbnNlcnRCZWZvcmUoZWwsIHNpYmxpbmcubmV4dEVsZW1lbnRTaWJsaW5nKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdHJhbnNpdGlvblBlbmRpbmdSZW1vdmVzKCl7XG4gICAgbGV0IHtwZW5kaW5nUmVtb3ZlcywgbGl2ZVNvY2tldH0gPSB0aGlzXG4gICAgaWYocGVuZGluZ1JlbW92ZXMubGVuZ3RoID4gMCl7XG4gICAgICBsaXZlU29ja2V0LnRyYW5zaXRpb25SZW1vdmVzKHBlbmRpbmdSZW1vdmVzKVxuICAgICAgbGl2ZVNvY2tldC5yZXF1ZXN0RE9NVXBkYXRlKCgpID0+IHtcbiAgICAgICAgcGVuZGluZ1JlbW92ZXMuZm9yRWFjaChlbCA9PiB7XG4gICAgICAgICAgbGV0IGNoaWxkID0gRE9NLmZpcnN0UGh4Q2hpbGQoZWwpXG4gICAgICAgICAgaWYoY2hpbGQpeyBsaXZlU29ja2V0LmRlc3Ryb3lWaWV3QnlFbChjaGlsZCkgfVxuICAgICAgICAgIGVsLnJlbW92ZSgpXG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMudHJhY2tBZnRlcihcInRyYW5zaXRpb25zRGlzY2FyZGVkXCIsIHBlbmRpbmdSZW1vdmVzKVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICBpc0NJRFBhdGNoKCl7IHJldHVybiB0aGlzLmNpZFBhdGNoIH1cblxuICBza2lwQ0lEU2libGluZyhlbCl7XG4gICAgcmV0dXJuIGVsLm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERSAmJiBlbC5nZXRBdHRyaWJ1dGUoUEhYX1NLSVApICE9PSBudWxsXG4gIH1cblxuICB0YXJnZXRDSURDb250YWluZXIoaHRtbCl7XG4gICAgaWYoIXRoaXMuaXNDSURQYXRjaCgpKXsgcmV0dXJuIH1cbiAgICBsZXQgW2ZpcnN0LCAuLi5yZXN0XSA9IERPTS5maW5kQ29tcG9uZW50Tm9kZUxpc3QodGhpcy5jb250YWluZXIsIHRoaXMudGFyZ2V0Q0lEKVxuICAgIGlmKHJlc3QubGVuZ3RoID09PSAwICYmIERPTS5jaGlsZE5vZGVMZW5ndGgoaHRtbCkgPT09IDEpe1xuICAgICAgcmV0dXJuIGZpcnN0XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmaXJzdCAmJiBmaXJzdC5wYXJlbnROb2RlXG4gICAgfVxuICB9XG5cbiAgLy8gYnVpbGRzIEhUTUwgZm9yIG1vcnBoZG9tIHBhdGNoXG4gIC8vIC0gZm9yIGZ1bGwgcGF0Y2hlcyBvZiBMaXZlVmlldyBvciBhIGNvbXBvbmVudCB3aXRoIGEgc2luZ2xlXG4gIC8vICAgcm9vdCBub2RlLCBzaW1wbHkgcmV0dXJucyB0aGUgSFRNTFxuICAvLyAtIGZvciBwYXRjaGVzIG9mIGEgY29tcG9uZW50IHdpdGggbXVsdGlwbGUgcm9vdCBub2RlcywgdGhlXG4gIC8vICAgcGFyZW50IG5vZGUgYmVjb21lcyB0aGUgdGFyZ2V0IGNvbnRhaW5lciBhbmQgbm9uLWNvbXBvbmVudFxuICAvLyAgIHNpYmxpbmdzIGFyZSBtYXJrZWQgYXMgc2tpcC5cbiAgYnVpbGREaWZmSFRNTChjb250YWluZXIsIGh0bWwsIHBoeFVwZGF0ZSwgdGFyZ2V0Q29udGFpbmVyKXtcbiAgICBsZXQgaXNDSURQYXRjaCA9IHRoaXMuaXNDSURQYXRjaCgpXG4gICAgbGV0IGlzQ0lEV2l0aFNpbmdsZVJvb3QgPSBpc0NJRFBhdGNoICYmIHRhcmdldENvbnRhaW5lci5nZXRBdHRyaWJ1dGUoUEhYX0NPTVBPTkVOVCkgPT09IHRoaXMudGFyZ2V0Q0lELnRvU3RyaW5nKClcbiAgICBpZighaXNDSURQYXRjaCB8fCBpc0NJRFdpdGhTaW5nbGVSb290KXtcbiAgICAgIHJldHVybiBodG1sXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGNvbXBvbmVudCBwYXRjaCB3aXRoIG11bHRpcGxlIENJRCByb290c1xuICAgICAgbGV0IGRpZmZDb250YWluZXIgPSBudWxsXG4gICAgICBsZXQgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIilcbiAgICAgIGRpZmZDb250YWluZXIgPSBET00uY2xvbmVOb2RlKHRhcmdldENvbnRhaW5lcilcbiAgICAgIGxldCBbZmlyc3RDb21wb25lbnQsIC4uLnJlc3RdID0gRE9NLmZpbmRDb21wb25lbnROb2RlTGlzdChkaWZmQ29udGFpbmVyLCB0aGlzLnRhcmdldENJRClcbiAgICAgIHRlbXBsYXRlLmlubmVySFRNTCA9IGh0bWxcbiAgICAgIHJlc3QuZm9yRWFjaChlbCA9PiBlbC5yZW1vdmUoKSlcbiAgICAgIEFycmF5LmZyb20oZGlmZkNvbnRhaW5lci5jaGlsZE5vZGVzKS5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgICAgLy8gd2UgY2FuIG9ubHkgc2tpcCB0cmFja2FibGUgbm9kZXMgd2l0aCBhbiBJRFxuICAgICAgICBpZihjaGlsZC5pZCAmJiBjaGlsZC5ub2RlVHlwZSA9PT0gTm9kZS5FTEVNRU5UX05PREUgJiYgY2hpbGQuZ2V0QXR0cmlidXRlKFBIWF9DT01QT05FTlQpICE9PSB0aGlzLnRhcmdldENJRC50b1N0cmluZygpKXtcbiAgICAgICAgICBjaGlsZC5zZXRBdHRyaWJ1dGUoUEhYX1NLSVAsIFwiXCIpXG4gICAgICAgICAgY2hpbGQuaW5uZXJIVE1MID0gXCJcIlxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgQXJyYXkuZnJvbSh0ZW1wbGF0ZS5jb250ZW50LmNoaWxkTm9kZXMpLmZvckVhY2goZWwgPT4gZGlmZkNvbnRhaW5lci5pbnNlcnRCZWZvcmUoZWwsIGZpcnN0Q29tcG9uZW50KSlcbiAgICAgIGZpcnN0Q29tcG9uZW50LnJlbW92ZSgpXG4gICAgICByZXR1cm4gZGlmZkNvbnRhaW5lci5vdXRlckhUTUxcbiAgICB9XG4gIH1cblxuICBpbmRleE9mKHBhcmVudCwgY2hpbGQpeyByZXR1cm4gQXJyYXkuZnJvbShwYXJlbnQuY2hpbGRyZW4pLmluZGV4T2YoY2hpbGQpIH1cbn1cbiIsICJpbXBvcnQge1xuICBDT01QT05FTlRTLFxuICBEWU5BTUlDUyxcbiAgVEVNUExBVEVTLFxuICBFVkVOVFMsXG4gIFBIWF9DT01QT05FTlQsXG4gIFBIWF9TS0lQLFxuICBSRVBMWSxcbiAgU1RBVElDLFxuICBUSVRMRSxcbiAgU1RSRUFNLFxufSBmcm9tIFwiLi9jb25zdGFudHNcIlxuXG5pbXBvcnQge1xuICBpc09iamVjdCxcbiAgbG9nRXJyb3IsXG4gIGlzQ2lkLFxufSBmcm9tIFwiLi91dGlsc1wiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlbmRlcmVkIHtcbiAgc3RhdGljIGV4dHJhY3QoZGlmZil7XG4gICAgbGV0IHtbUkVQTFldOiByZXBseSwgW0VWRU5UU106IGV2ZW50cywgW1RJVExFXTogdGl0bGV9ID0gZGlmZlxuICAgIGRlbGV0ZSBkaWZmW1JFUExZXVxuICAgIGRlbGV0ZSBkaWZmW0VWRU5UU11cbiAgICBkZWxldGUgZGlmZltUSVRMRV1cbiAgICByZXR1cm4ge2RpZmYsIHRpdGxlLCByZXBseTogcmVwbHkgfHwgbnVsbCwgZXZlbnRzOiBldmVudHMgfHwgW119XG4gIH1cblxuICBjb25zdHJ1Y3Rvcih2aWV3SWQsIHJlbmRlcmVkKXtcbiAgICB0aGlzLnZpZXdJZCA9IHZpZXdJZFxuICAgIHRoaXMucmVuZGVyZWQgPSB7fVxuICAgIHRoaXMubWVyZ2VEaWZmKHJlbmRlcmVkKVxuICB9XG5cbiAgcGFyZW50Vmlld0lkKCl7IHJldHVybiB0aGlzLnZpZXdJZCB9XG5cbiAgdG9TdHJpbmcob25seUNpZHMpe1xuICAgIGxldCBbc3RyLCBzdHJlYW1zXSA9IHRoaXMucmVjdXJzaXZlVG9TdHJpbmcodGhpcy5yZW5kZXJlZCwgdGhpcy5yZW5kZXJlZFtDT01QT05FTlRTXSwgb25seUNpZHMpXG4gICAgcmV0dXJuIFtzdHIsIHN0cmVhbXNdXG4gIH1cblxuICByZWN1cnNpdmVUb1N0cmluZyhyZW5kZXJlZCwgY29tcG9uZW50cyA9IHJlbmRlcmVkW0NPTVBPTkVOVFNdLCBvbmx5Q2lkcyl7XG4gICAgb25seUNpZHMgPSBvbmx5Q2lkcyA/IG5ldyBTZXQob25seUNpZHMpIDogbnVsbFxuICAgIGxldCBvdXRwdXQgPSB7YnVmZmVyOiBcIlwiLCBjb21wb25lbnRzOiBjb21wb25lbnRzLCBvbmx5Q2lkczogb25seUNpZHMsIHN0cmVhbXM6IG5ldyBTZXQoKX1cbiAgICB0aGlzLnRvT3V0cHV0QnVmZmVyKHJlbmRlcmVkLCBudWxsLCBvdXRwdXQpXG4gICAgcmV0dXJuIFtvdXRwdXQuYnVmZmVyLCBvdXRwdXQuc3RyZWFtc11cbiAgfVxuXG4gIGNvbXBvbmVudENJRHMoZGlmZil7IHJldHVybiBPYmplY3Qua2V5cyhkaWZmW0NPTVBPTkVOVFNdIHx8IHt9KS5tYXAoaSA9PiBwYXJzZUludChpKSkgfVxuXG4gIGlzQ29tcG9uZW50T25seURpZmYoZGlmZil7XG4gICAgaWYoIWRpZmZbQ09NUE9ORU5UU10peyByZXR1cm4gZmFsc2UgfVxuICAgIHJldHVybiBPYmplY3Qua2V5cyhkaWZmKS5sZW5ndGggPT09IDFcbiAgfVxuXG4gIGdldENvbXBvbmVudChkaWZmLCBjaWQpeyByZXR1cm4gZGlmZltDT01QT05FTlRTXVtjaWRdIH1cblxuICBtZXJnZURpZmYoZGlmZil7XG4gICAgbGV0IG5ld2MgPSBkaWZmW0NPTVBPTkVOVFNdXG4gICAgbGV0IGNhY2hlID0ge31cbiAgICBkZWxldGUgZGlmZltDT01QT05FTlRTXVxuICAgIHRoaXMucmVuZGVyZWQgPSB0aGlzLm11dGFibGVNZXJnZSh0aGlzLnJlbmRlcmVkLCBkaWZmKVxuICAgIHRoaXMucmVuZGVyZWRbQ09NUE9ORU5UU10gPSB0aGlzLnJlbmRlcmVkW0NPTVBPTkVOVFNdIHx8IHt9XG5cbiAgICBpZihuZXdjKXtcbiAgICAgIGxldCBvbGRjID0gdGhpcy5yZW5kZXJlZFtDT01QT05FTlRTXVxuXG4gICAgICBmb3IobGV0IGNpZCBpbiBuZXdjKXtcbiAgICAgICAgbmV3Y1tjaWRdID0gdGhpcy5jYWNoZWRGaW5kQ29tcG9uZW50KGNpZCwgbmV3Y1tjaWRdLCBvbGRjLCBuZXdjLCBjYWNoZSlcbiAgICAgIH1cblxuICAgICAgZm9yKGxldCBjaWQgaW4gbmV3Yyl7IG9sZGNbY2lkXSA9IG5ld2NbY2lkXSB9XG4gICAgICBkaWZmW0NPTVBPTkVOVFNdID0gbmV3Y1xuICAgIH1cbiAgfVxuXG4gIGNhY2hlZEZpbmRDb21wb25lbnQoY2lkLCBjZGlmZiwgb2xkYywgbmV3YywgY2FjaGUpe1xuICAgIGlmKGNhY2hlW2NpZF0pe1xuICAgICAgcmV0dXJuIGNhY2hlW2NpZF1cbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IG5kaWZmLCBzdGF0LCBzY2lkID0gY2RpZmZbU1RBVElDXVxuXG4gICAgICBpZihpc0NpZChzY2lkKSl7XG4gICAgICAgIGxldCB0ZGlmZlxuXG4gICAgICAgIGlmKHNjaWQgPiAwKXtcbiAgICAgICAgICB0ZGlmZiA9IHRoaXMuY2FjaGVkRmluZENvbXBvbmVudChzY2lkLCBuZXdjW3NjaWRdLCBvbGRjLCBuZXdjLCBjYWNoZSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0ZGlmZiA9IG9sZGNbLXNjaWRdXG4gICAgICAgIH1cblxuICAgICAgICBzdGF0ID0gdGRpZmZbU1RBVElDXVxuICAgICAgICBuZGlmZiA9IHRoaXMuY2xvbmVNZXJnZSh0ZGlmZiwgY2RpZmYpXG4gICAgICAgIG5kaWZmW1NUQVRJQ10gPSBzdGF0XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZGlmZiA9IGNkaWZmW1NUQVRJQ10gIT09IHVuZGVmaW5lZCA/IGNkaWZmIDogdGhpcy5jbG9uZU1lcmdlKG9sZGNbY2lkXSB8fCB7fSwgY2RpZmYpXG4gICAgICB9XG5cbiAgICAgIGNhY2hlW2NpZF0gPSBuZGlmZlxuICAgICAgcmV0dXJuIG5kaWZmXG4gICAgfVxuICB9XG5cbiAgbXV0YWJsZU1lcmdlKHRhcmdldCwgc291cmNlKXtcbiAgICBpZihzb3VyY2VbU1RBVElDXSAhPT0gdW5kZWZpbmVkKXtcbiAgICAgIHJldHVybiBzb3VyY2VcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kb011dGFibGVNZXJnZSh0YXJnZXQsIHNvdXJjZSlcbiAgICAgIHJldHVybiB0YXJnZXRcbiAgICB9XG4gIH1cblxuICBkb011dGFibGVNZXJnZSh0YXJnZXQsIHNvdXJjZSl7XG4gICAgZm9yKGxldCBrZXkgaW4gc291cmNlKXtcbiAgICAgIGxldCB2YWwgPSBzb3VyY2Vba2V5XVxuICAgICAgbGV0IHRhcmdldFZhbCA9IHRhcmdldFtrZXldXG4gICAgICBsZXQgaXNPYmpWYWwgPSBpc09iamVjdCh2YWwpXG4gICAgICBpZihpc09ialZhbCAmJiB2YWxbU1RBVElDXSA9PT0gdW5kZWZpbmVkICYmIGlzT2JqZWN0KHRhcmdldFZhbCkpe1xuICAgICAgICB0aGlzLmRvTXV0YWJsZU1lcmdlKHRhcmdldFZhbCwgdmFsKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGFyZ2V0W2tleV0gPSB2YWxcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjbG9uZU1lcmdlKHRhcmdldCwgc291cmNlKXtcbiAgICBsZXQgbWVyZ2VkID0gey4uLnRhcmdldCwgLi4uc291cmNlfVxuICAgIGZvcihsZXQga2V5IGluIG1lcmdlZCl7XG4gICAgICBsZXQgdmFsID0gc291cmNlW2tleV1cbiAgICAgIGxldCB0YXJnZXRWYWwgPSB0YXJnZXRba2V5XVxuICAgICAgaWYoaXNPYmplY3QodmFsKSAmJiB2YWxbU1RBVElDXSA9PT0gdW5kZWZpbmVkICYmIGlzT2JqZWN0KHRhcmdldFZhbCkpe1xuICAgICAgICBtZXJnZWRba2V5XSA9IHRoaXMuY2xvbmVNZXJnZSh0YXJnZXRWYWwsIHZhbClcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG1lcmdlZFxuICB9XG5cbiAgY29tcG9uZW50VG9TdHJpbmcoY2lkKXtcbiAgICBsZXQgW3N0ciwgc3RyZWFtc10gPSB0aGlzLnJlY3Vyc2l2ZUNJRFRvU3RyaW5nKHRoaXMucmVuZGVyZWRbQ09NUE9ORU5UU10sIGNpZClcbiAgICByZXR1cm4gW3N0ciwgc3RyZWFtc11cbiAgfVxuXG4gIHBydW5lQ0lEcyhjaWRzKXtcbiAgICBjaWRzLmZvckVhY2goY2lkID0+IGRlbGV0ZSB0aGlzLnJlbmRlcmVkW0NPTVBPTkVOVFNdW2NpZF0pXG4gIH1cblxuICAvLyBwcml2YXRlXG5cbiAgZ2V0KCl7IHJldHVybiB0aGlzLnJlbmRlcmVkIH1cblxuICBpc05ld0ZpbmdlcnByaW50KGRpZmYgPSB7fSl7IHJldHVybiAhIWRpZmZbU1RBVElDXSB9XG5cbiAgdGVtcGxhdGVTdGF0aWMocGFydCwgdGVtcGxhdGVzKXtcbiAgICBpZih0eXBlb2YgKHBhcnQpID09PSBcIm51bWJlclwiKSB7XG4gICAgICByZXR1cm4gdGVtcGxhdGVzW3BhcnRdXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBwYXJ0XG4gICAgfVxuICB9XG5cbiAgdG9PdXRwdXRCdWZmZXIocmVuZGVyZWQsIHRlbXBsYXRlcywgb3V0cHV0KXtcbiAgICBpZihyZW5kZXJlZFtEWU5BTUlDU10peyByZXR1cm4gdGhpcy5jb21wcmVoZW5zaW9uVG9CdWZmZXIocmVuZGVyZWQsIHRlbXBsYXRlcywgb3V0cHV0KSB9XG4gICAgbGV0IHtbU1RBVElDXTogc3RhdGljc30gPSByZW5kZXJlZFxuICAgIHN0YXRpY3MgPSB0aGlzLnRlbXBsYXRlU3RhdGljKHN0YXRpY3MsIHRlbXBsYXRlcylcblxuICAgIG91dHB1dC5idWZmZXIgKz0gc3RhdGljc1swXVxuICAgIGZvcihsZXQgaSA9IDE7IGkgPCBzdGF0aWNzLmxlbmd0aDsgaSsrKXtcbiAgICAgIHRoaXMuZHluYW1pY1RvQnVmZmVyKHJlbmRlcmVkW2kgLSAxXSwgdGVtcGxhdGVzLCBvdXRwdXQpXG4gICAgICBvdXRwdXQuYnVmZmVyICs9IHN0YXRpY3NbaV1cbiAgICB9XG4gIH1cblxuICBjb21wcmVoZW5zaW9uVG9CdWZmZXIocmVuZGVyZWQsIHRlbXBsYXRlcywgb3V0cHV0KXtcbiAgICBsZXQge1tEWU5BTUlDU106IGR5bmFtaWNzLCBbU1RBVElDXTogc3RhdGljcywgW1NUUkVBTV06IHN0cmVhbX0gPSByZW5kZXJlZFxuICAgIGxldCBbX3JlZiwgX2luc2VydHMsIGRlbGV0ZUlkcywgcmVzZXRdID0gc3RyZWFtIHx8IFtudWxsLCB7fSwgW10sIG51bGxdXG4gICAgc3RhdGljcyA9IHRoaXMudGVtcGxhdGVTdGF0aWMoc3RhdGljcywgdGVtcGxhdGVzKVxuICAgIGxldCBjb21wVGVtcGxhdGVzID0gdGVtcGxhdGVzIHx8IHJlbmRlcmVkW1RFTVBMQVRFU11cbiAgICBmb3IobGV0IGQgPSAwOyBkIDwgZHluYW1pY3MubGVuZ3RoOyBkKyspe1xuICAgICAgbGV0IGR5bmFtaWMgPSBkeW5hbWljc1tkXVxuICAgICAgb3V0cHV0LmJ1ZmZlciArPSBzdGF0aWNzWzBdXG4gICAgICBmb3IobGV0IGkgPSAxOyBpIDwgc3RhdGljcy5sZW5ndGg7IGkrKyl7XG4gICAgICAgIHRoaXMuZHluYW1pY1RvQnVmZmVyKGR5bmFtaWNbaSAtIDFdLCBjb21wVGVtcGxhdGVzLCBvdXRwdXQpXG4gICAgICAgIG91dHB1dC5idWZmZXIgKz0gc3RhdGljc1tpXVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmKHN0cmVhbSAhPT0gdW5kZWZpbmVkICYmIChyZW5kZXJlZFtEWU5BTUlDU10ubGVuZ3RoID4gMCB8fCBkZWxldGVJZHMubGVuZ3RoID4gMCB8fCByZXNldCkpe1xuICAgICAgZGVsZXRlIHJlbmRlcmVkW1NUUkVBTV1cbiAgICAgIG91dHB1dC5zdHJlYW1zLmFkZChzdHJlYW0pXG4gICAgfVxuICB9XG5cbiAgZHluYW1pY1RvQnVmZmVyKHJlbmRlcmVkLCB0ZW1wbGF0ZXMsIG91dHB1dCl7XG4gICAgaWYodHlwZW9mIChyZW5kZXJlZCkgPT09IFwibnVtYmVyXCIpe1xuICAgICAgbGV0IFtzdHIsIHN0cmVhbXNdID0gdGhpcy5yZWN1cnNpdmVDSURUb1N0cmluZyhvdXRwdXQuY29tcG9uZW50cywgcmVuZGVyZWQsIG91dHB1dC5vbmx5Q2lkcylcbiAgICAgIG91dHB1dC5idWZmZXIgKz0gc3RyXG4gICAgICBvdXRwdXQuc3RyZWFtcyA9IG5ldyBTZXQoWy4uLm91dHB1dC5zdHJlYW1zLCAuLi5zdHJlYW1zXSlcbiAgICB9IGVsc2UgaWYoaXNPYmplY3QocmVuZGVyZWQpKXtcbiAgICAgIHRoaXMudG9PdXRwdXRCdWZmZXIocmVuZGVyZWQsIHRlbXBsYXRlcywgb3V0cHV0KVxuICAgIH0gZWxzZSB7XG4gICAgICBvdXRwdXQuYnVmZmVyICs9IHJlbmRlcmVkXG4gICAgfVxuICB9XG5cbiAgcmVjdXJzaXZlQ0lEVG9TdHJpbmcoY29tcG9uZW50cywgY2lkLCBvbmx5Q2lkcyl7XG4gICAgbGV0IGNvbXBvbmVudCA9IGNvbXBvbmVudHNbY2lkXSB8fCBsb2dFcnJvcihgbm8gY29tcG9uZW50IGZvciBDSUQgJHtjaWR9YCwgY29tcG9uZW50cylcbiAgICBsZXQgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIilcbiAgICBsZXQgW2h0bWwsIHN0cmVhbXNdID0gdGhpcy5yZWN1cnNpdmVUb1N0cmluZyhjb21wb25lbnQsIGNvbXBvbmVudHMsIG9ubHlDaWRzKVxuICAgIHRlbXBsYXRlLmlubmVySFRNTCA9IGh0bWxcbiAgICBsZXQgY29udGFpbmVyID0gdGVtcGxhdGUuY29udGVudFxuICAgIGxldCBza2lwID0gb25seUNpZHMgJiYgIW9ubHlDaWRzLmhhcyhjaWQpXG5cbiAgICBsZXQgW2hhc0NoaWxkTm9kZXMsIGhhc0NoaWxkQ29tcG9uZW50c10gPVxuICAgICAgQXJyYXkuZnJvbShjb250YWluZXIuY2hpbGROb2RlcykucmVkdWNlKChbaGFzTm9kZXMsIGhhc0NvbXBvbmVudHNdLCBjaGlsZCwgaSkgPT4ge1xuICAgICAgICBpZihjaGlsZC5ub2RlVHlwZSA9PT0gTm9kZS5FTEVNRU5UX05PREUpe1xuICAgICAgICAgIGlmKGNoaWxkLmdldEF0dHJpYnV0ZShQSFhfQ09NUE9ORU5UKSl7XG4gICAgICAgICAgICByZXR1cm4gW2hhc05vZGVzLCB0cnVlXVxuICAgICAgICAgIH1cbiAgICAgICAgICBjaGlsZC5zZXRBdHRyaWJ1dGUoUEhYX0NPTVBPTkVOVCwgY2lkKVxuICAgICAgICAgIGlmKCFjaGlsZC5pZCl7IGNoaWxkLmlkID0gYCR7dGhpcy5wYXJlbnRWaWV3SWQoKX0tJHtjaWR9LSR7aX1gIH1cbiAgICAgICAgICBpZihza2lwKXtcbiAgICAgICAgICAgIGNoaWxkLnNldEF0dHJpYnV0ZShQSFhfU0tJUCwgXCJcIilcbiAgICAgICAgICAgIGNoaWxkLmlubmVySFRNTCA9IFwiXCJcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIFt0cnVlLCBoYXNDb21wb25lbnRzXVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmKGNoaWxkLm5vZGVWYWx1ZS50cmltKCkgIT09IFwiXCIpe1xuICAgICAgICAgICAgbG9nRXJyb3IoXCJvbmx5IEhUTUwgZWxlbWVudCB0YWdzIGFyZSBhbGxvd2VkIGF0IHRoZSByb290IG9mIGNvbXBvbmVudHMuXFxuXFxuXCIgK1xuICAgICAgICAgICAgICBgZ290OiBcIiR7Y2hpbGQubm9kZVZhbHVlLnRyaW0oKX1cIlxcblxcbmAgK1xuICAgICAgICAgICAgICBcIndpdGhpbjpcXG5cIiwgdGVtcGxhdGUuaW5uZXJIVE1MLnRyaW0oKSlcbiAgICAgICAgICAgIGNoaWxkLnJlcGxhY2VXaXRoKHRoaXMuY3JlYXRlU3BhbihjaGlsZC5ub2RlVmFsdWUsIGNpZCkpXG4gICAgICAgICAgICByZXR1cm4gW3RydWUsIGhhc0NvbXBvbmVudHNdXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNoaWxkLnJlbW92ZSgpXG4gICAgICAgICAgICByZXR1cm4gW2hhc05vZGVzLCBoYXNDb21wb25lbnRzXVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSwgW2ZhbHNlLCBmYWxzZV0pXG5cbiAgICBpZighaGFzQ2hpbGROb2RlcyAmJiAhaGFzQ2hpbGRDb21wb25lbnRzKXtcbiAgICAgIGxvZ0Vycm9yKFwiZXhwZWN0ZWQgYXQgbGVhc3Qgb25lIEhUTUwgZWxlbWVudCB0YWcgaW5zaWRlIGEgY29tcG9uZW50LCBidXQgdGhlIGNvbXBvbmVudCBpcyBlbXB0eTpcXG5cIixcbiAgICAgICAgdGVtcGxhdGUuaW5uZXJIVE1MLnRyaW0oKSlcbiAgICAgIHJldHVybiBbdGhpcy5jcmVhdGVTcGFuKFwiXCIsIGNpZCkub3V0ZXJIVE1MLCBzdHJlYW1zXVxuICAgIH0gZWxzZSBpZighaGFzQ2hpbGROb2RlcyAmJiBoYXNDaGlsZENvbXBvbmVudHMpe1xuICAgICAgbG9nRXJyb3IoXCJleHBlY3RlZCBhdCBsZWFzdCBvbmUgSFRNTCBlbGVtZW50IHRhZyBkaXJlY3RseSBpbnNpZGUgYSBjb21wb25lbnQsIGJ1dCBvbmx5IHN1YmNvbXBvbmVudHMgd2VyZSBmb3VuZC4gQSBjb21wb25lbnQgbXVzdCByZW5kZXIgYXQgbGVhc3Qgb25lIEhUTUwgdGFnIGRpcmVjdGx5IGluc2lkZSBpdHNlbGYuXCIsXG4gICAgICAgIHRlbXBsYXRlLmlubmVySFRNTC50cmltKCkpXG4gICAgICByZXR1cm4gW3RlbXBsYXRlLmlubmVySFRNTCwgc3RyZWFtc11cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFt0ZW1wbGF0ZS5pbm5lckhUTUwsIHN0cmVhbXNdXG4gICAgfVxuICB9XG5cbiAgY3JlYXRlU3Bhbih0ZXh0LCBjaWQpe1xuICAgIGxldCBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIilcbiAgICBzcGFuLmlubmVyVGV4dCA9IHRleHRcbiAgICBzcGFuLnNldEF0dHJpYnV0ZShQSFhfQ09NUE9ORU5ULCBjaWQpXG4gICAgcmV0dXJuIHNwYW5cbiAgfVxufVxuIiwgImxldCB2aWV3SG9va0lEID0gMVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlld0hvb2sge1xuICBzdGF0aWMgbWFrZUlEKCl7IHJldHVybiB2aWV3SG9va0lEKysgfVxuICBzdGF0aWMgZWxlbWVudElEKGVsKXsgcmV0dXJuIGVsLnBoeEhvb2tJZCB9XG5cbiAgY29uc3RydWN0b3IodmlldywgZWwsIGNhbGxiYWNrcyl7XG4gICAgdGhpcy5fX3ZpZXcgPSB2aWV3XG4gICAgdGhpcy5saXZlU29ja2V0ID0gdmlldy5saXZlU29ja2V0XG4gICAgdGhpcy5fX2NhbGxiYWNrcyA9IGNhbGxiYWNrc1xuICAgIHRoaXMuX19saXN0ZW5lcnMgPSBuZXcgU2V0KClcbiAgICB0aGlzLl9faXNEaXNjb25uZWN0ZWQgPSBmYWxzZVxuICAgIHRoaXMuZWwgPSBlbFxuICAgIHRoaXMuZWwucGh4SG9va0lkID0gdGhpcy5jb25zdHJ1Y3Rvci5tYWtlSUQoKVxuICAgIGZvcihsZXQga2V5IGluIHRoaXMuX19jYWxsYmFja3MpeyB0aGlzW2tleV0gPSB0aGlzLl9fY2FsbGJhY2tzW2tleV0gfVxuICB9XG5cbiAgX19tb3VudGVkKCl7IHRoaXMubW91bnRlZCAmJiB0aGlzLm1vdW50ZWQoKSB9XG4gIF9fdXBkYXRlZCgpeyB0aGlzLnVwZGF0ZWQgJiYgdGhpcy51cGRhdGVkKCkgfVxuICBfX2JlZm9yZVVwZGF0ZSgpeyB0aGlzLmJlZm9yZVVwZGF0ZSAmJiB0aGlzLmJlZm9yZVVwZGF0ZSgpIH1cbiAgX19kZXN0cm95ZWQoKXsgdGhpcy5kZXN0cm95ZWQgJiYgdGhpcy5kZXN0cm95ZWQoKSB9XG4gIF9fcmVjb25uZWN0ZWQoKXtcbiAgICBpZih0aGlzLl9faXNEaXNjb25uZWN0ZWQpe1xuICAgICAgdGhpcy5fX2lzRGlzY29ubmVjdGVkID0gZmFsc2VcbiAgICAgIHRoaXMucmVjb25uZWN0ZWQgJiYgdGhpcy5yZWNvbm5lY3RlZCgpXG4gICAgfVxuICB9XG4gIF9fZGlzY29ubmVjdGVkKCl7XG4gICAgdGhpcy5fX2lzRGlzY29ubmVjdGVkID0gdHJ1ZVxuICAgIHRoaXMuZGlzY29ubmVjdGVkICYmIHRoaXMuZGlzY29ubmVjdGVkKClcbiAgfVxuXG4gIHB1c2hFdmVudChldmVudCwgcGF5bG9hZCA9IHt9LCBvblJlcGx5ID0gZnVuY3Rpb24gKCl7IH0pe1xuICAgIHJldHVybiB0aGlzLl9fdmlldy5wdXNoSG9va0V2ZW50KHRoaXMuZWwsIG51bGwsIGV2ZW50LCBwYXlsb2FkLCBvblJlcGx5KVxuICB9XG5cbiAgcHVzaEV2ZW50VG8ocGh4VGFyZ2V0LCBldmVudCwgcGF5bG9hZCA9IHt9LCBvblJlcGx5ID0gZnVuY3Rpb24gKCl7IH0pe1xuICAgIHJldHVybiB0aGlzLl9fdmlldy53aXRoaW5UYXJnZXRzKHBoeFRhcmdldCwgKHZpZXcsIHRhcmdldEN0eCkgPT4ge1xuICAgICAgcmV0dXJuIHZpZXcucHVzaEhvb2tFdmVudCh0aGlzLmVsLCB0YXJnZXRDdHgsIGV2ZW50LCBwYXlsb2FkLCBvblJlcGx5KVxuICAgIH0pXG4gIH1cblxuICBoYW5kbGVFdmVudChldmVudCwgY2FsbGJhY2spe1xuICAgIGxldCBjYWxsYmFja1JlZiA9IChjdXN0b21FdmVudCwgYnlwYXNzKSA9PiBieXBhc3MgPyBldmVudCA6IGNhbGxiYWNrKGN1c3RvbUV2ZW50LmRldGFpbClcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihgcGh4OiR7ZXZlbnR9YCwgY2FsbGJhY2tSZWYpXG4gICAgdGhpcy5fX2xpc3RlbmVycy5hZGQoY2FsbGJhY2tSZWYpXG4gICAgcmV0dXJuIGNhbGxiYWNrUmVmXG4gIH1cblxuICByZW1vdmVIYW5kbGVFdmVudChjYWxsYmFja1JlZil7XG4gICAgbGV0IGV2ZW50ID0gY2FsbGJhY2tSZWYobnVsbCwgdHJ1ZSlcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihgcGh4OiR7ZXZlbnR9YCwgY2FsbGJhY2tSZWYpXG4gICAgdGhpcy5fX2xpc3RlbmVycy5kZWxldGUoY2FsbGJhY2tSZWYpXG4gIH1cblxuICB1cGxvYWQobmFtZSwgZmlsZXMpe1xuICAgIHJldHVybiB0aGlzLl9fdmlldy5kaXNwYXRjaFVwbG9hZHMobmFtZSwgZmlsZXMpXG4gIH1cblxuICB1cGxvYWRUbyhwaHhUYXJnZXQsIG5hbWUsIGZpbGVzKXtcbiAgICByZXR1cm4gdGhpcy5fX3ZpZXcud2l0aGluVGFyZ2V0cyhwaHhUYXJnZXQsIHZpZXcgPT4gdmlldy5kaXNwYXRjaFVwbG9hZHMobmFtZSwgZmlsZXMpKVxuICB9XG5cbiAgX19jbGVhbnVwX18oKXtcbiAgICB0aGlzLl9fbGlzdGVuZXJzLmZvckVhY2goY2FsbGJhY2tSZWYgPT4gdGhpcy5yZW1vdmVIYW5kbGVFdmVudChjYWxsYmFja1JlZikpXG4gIH1cbn1cbiIsICJpbXBvcnQgRE9NIGZyb20gXCIuL2RvbVwiXG5pbXBvcnQgQVJJQSBmcm9tIFwiLi9hcmlhXCJcblxubGV0IGZvY3VzU3RhY2sgPSBudWxsXG5cbmxldCBKUyA9IHtcbiAgZXhlYyhldmVudFR5cGUsIHBoeEV2ZW50LCB2aWV3LCBzb3VyY2VFbCwgZGVmYXVsdHMpe1xuICAgIGxldCBbZGVmYXVsdEtpbmQsIGRlZmF1bHRBcmdzXSA9IGRlZmF1bHRzIHx8IFtudWxsLCB7Y2FsbGJhY2s6IGRlZmF1bHRzICYmIGRlZmF1bHRzLmNhbGxiYWNrfV1cbiAgICBsZXQgY29tbWFuZHMgPSBwaHhFdmVudC5jaGFyQXQoMCkgPT09IFwiW1wiID9cbiAgICAgIEpTT04ucGFyc2UocGh4RXZlbnQpIDogW1tkZWZhdWx0S2luZCwgZGVmYXVsdEFyZ3NdXVxuXG5cblxuICAgIGNvbW1hbmRzLmZvckVhY2goKFtraW5kLCBhcmdzXSkgPT4ge1xuICAgICAgaWYoa2luZCA9PT0gZGVmYXVsdEtpbmQgJiYgZGVmYXVsdEFyZ3MuZGF0YSl7XG4gICAgICAgIGFyZ3MuZGF0YSA9IE9iamVjdC5hc3NpZ24oYXJncy5kYXRhIHx8IHt9LCBkZWZhdWx0QXJncy5kYXRhKVxuICAgICAgICBhcmdzLmNhbGxiYWNrID0gYXJncy5jYWxsYmFjayB8fCBkZWZhdWx0QXJncy5jYWxsYmFja1xuICAgICAgfVxuICAgICAgdGhpcy5maWx0ZXJUb0Vscyhzb3VyY2VFbCwgYXJncykuZm9yRWFjaChlbCA9PiB7XG4gICAgICAgIHRoaXNbYGV4ZWNfJHtraW5kfWBdKGV2ZW50VHlwZSwgcGh4RXZlbnQsIHZpZXcsIHNvdXJjZUVsLCBlbCwgYXJncylcbiAgICAgIH0pXG4gICAgfSlcbiAgfSxcblxuICBpc1Zpc2libGUoZWwpe1xuICAgIHJldHVybiAhIShlbC5vZmZzZXRXaWR0aCB8fCBlbC5vZmZzZXRIZWlnaHQgfHwgZWwuZ2V0Q2xpZW50UmVjdHMoKS5sZW5ndGggPiAwKVxuICB9LFxuXG4gIC8vIHByaXZhdGVcblxuICAvLyBjb21tYW5kc1xuXG4gIGV4ZWNfZXhlYyhldmVudFR5cGUsIHBoeEV2ZW50LCB2aWV3LCBzb3VyY2VFbCwgZWwsIFthdHRyLCB0b10pe1xuICAgIGxldCBub2RlcyA9IHRvID8gRE9NLmFsbChkb2N1bWVudCwgdG8pIDogW3NvdXJjZUVsXVxuICAgIG5vZGVzLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICBsZXQgZW5jb2RlZEpTID0gbm9kZS5nZXRBdHRyaWJ1dGUoYXR0cilcbiAgICAgIGlmKCFlbmNvZGVkSlMpeyB0aHJvdyBuZXcgRXJyb3IoYGV4cGVjdGVkICR7YXR0cn0gdG8gY29udGFpbiBKUyBjb21tYW5kIG9uIFwiJHt0b31cImApIH1cbiAgICAgIHZpZXcubGl2ZVNvY2tldC5leGVjSlMobm9kZSwgZW5jb2RlZEpTLCBldmVudFR5cGUpXG4gICAgfSlcbiAgfSxcblxuICBleGVjX2Rpc3BhdGNoKGV2ZW50VHlwZSwgcGh4RXZlbnQsIHZpZXcsIHNvdXJjZUVsLCBlbCwge3RvLCBldmVudCwgZGV0YWlsLCBidWJibGVzfSl7XG4gICAgZGV0YWlsID0gZGV0YWlsIHx8IHt9XG4gICAgZGV0YWlsLmRpc3BhdGNoZXIgPSBzb3VyY2VFbFxuICAgIERPTS5kaXNwYXRjaEV2ZW50KGVsLCBldmVudCwge2RldGFpbCwgYnViYmxlc30pXG4gIH0sXG5cbiAgZXhlY19wdXNoKGV2ZW50VHlwZSwgcGh4RXZlbnQsIHZpZXcsIHNvdXJjZUVsLCBlbCwgYXJncyl7XG4gICAgaWYoIXZpZXcuaXNDb25uZWN0ZWQoKSl7IHJldHVybiB9XG5cbiAgICBsZXQge2V2ZW50LCBkYXRhLCB0YXJnZXQsIHBhZ2VfbG9hZGluZywgbG9hZGluZywgdmFsdWUsIGRpc3BhdGNoZXIsIGNhbGxiYWNrfSA9IGFyZ3NcbiAgICBsZXQgcHVzaE9wdHMgPSB7bG9hZGluZywgdmFsdWUsIHRhcmdldCwgcGFnZV9sb2FkaW5nOiAhIXBhZ2VfbG9hZGluZ31cbiAgICBsZXQgdGFyZ2V0U3JjID0gZXZlbnRUeXBlID09PSBcImNoYW5nZVwiICYmIGRpc3BhdGNoZXIgPyBkaXNwYXRjaGVyIDogc291cmNlRWxcbiAgICBsZXQgcGh4VGFyZ2V0ID0gdGFyZ2V0IHx8IHRhcmdldFNyYy5nZXRBdHRyaWJ1dGUodmlldy5iaW5kaW5nKFwidGFyZ2V0XCIpKSB8fCB0YXJnZXRTcmNcbiAgICB2aWV3LndpdGhpblRhcmdldHMocGh4VGFyZ2V0LCAodGFyZ2V0VmlldywgdGFyZ2V0Q3R4KSA9PiB7XG4gICAgICBpZihldmVudFR5cGUgPT09IFwiY2hhbmdlXCIpe1xuICAgICAgICBsZXQge25ld0NpZCwgX3RhcmdldH0gPSBhcmdzXG4gICAgICAgIF90YXJnZXQgPSBfdGFyZ2V0IHx8IChET00uaXNGb3JtSW5wdXQoc291cmNlRWwpID8gc291cmNlRWwubmFtZSA6IHVuZGVmaW5lZClcbiAgICAgICAgaWYoX3RhcmdldCl7IHB1c2hPcHRzLl90YXJnZXQgPSBfdGFyZ2V0IH1cbiAgICAgICAgdGFyZ2V0Vmlldy5wdXNoSW5wdXQoc291cmNlRWwsIHRhcmdldEN0eCwgbmV3Q2lkLCBldmVudCB8fCBwaHhFdmVudCwgcHVzaE9wdHMsIGNhbGxiYWNrKVxuICAgICAgfSBlbHNlIGlmKGV2ZW50VHlwZSA9PT0gXCJzdWJtaXRcIil7XG4gICAgICAgIGxldCB7c3VibWl0dGVyfSA9IGFyZ3NcbiAgICAgICAgdGFyZ2V0Vmlldy5zdWJtaXRGb3JtKHNvdXJjZUVsLCB0YXJnZXRDdHgsIGV2ZW50IHx8IHBoeEV2ZW50LCBzdWJtaXR0ZXIsIHB1c2hPcHRzLCBjYWxsYmFjaylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRhcmdldFZpZXcucHVzaEV2ZW50KGV2ZW50VHlwZSwgc291cmNlRWwsIHRhcmdldEN0eCwgZXZlbnQgfHwgcGh4RXZlbnQsIGRhdGEsIHB1c2hPcHRzLCBjYWxsYmFjaylcbiAgICAgIH1cbiAgICB9KVxuICB9LFxuXG4gIGV4ZWNfbmF2aWdhdGUoZXZlbnRUeXBlLCBwaHhFdmVudCwgdmlldywgc291cmNlRWwsIGVsLCB7aHJlZiwgcmVwbGFjZX0pe1xuICAgIHZpZXcubGl2ZVNvY2tldC5oaXN0b3J5UmVkaXJlY3QoaHJlZiwgcmVwbGFjZSA/IFwicmVwbGFjZVwiIDogXCJwdXNoXCIpXG4gIH0sXG5cbiAgZXhlY19wYXRjaChldmVudFR5cGUsIHBoeEV2ZW50LCB2aWV3LCBzb3VyY2VFbCwgZWwsIHtocmVmLCByZXBsYWNlfSl7XG4gICAgdmlldy5saXZlU29ja2V0LnB1c2hIaXN0b3J5UGF0Y2goaHJlZiwgcmVwbGFjZSA/IFwicmVwbGFjZVwiIDogXCJwdXNoXCIsIHNvdXJjZUVsKVxuICB9LFxuXG4gIGV4ZWNfZm9jdXMoZXZlbnRUeXBlLCBwaHhFdmVudCwgdmlldywgc291cmNlRWwsIGVsKXtcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IEFSSUEuYXR0ZW1wdEZvY3VzKGVsKSlcbiAgfSxcblxuICBleGVjX2ZvY3VzX2ZpcnN0KGV2ZW50VHlwZSwgcGh4RXZlbnQsIHZpZXcsIHNvdXJjZUVsLCBlbCl7XG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiBBUklBLmZvY3VzRmlyc3RJbnRlcmFjdGl2ZShlbCkgfHwgQVJJQS5mb2N1c0ZpcnN0KGVsKSlcbiAgfSxcblxuICBleGVjX3B1c2hfZm9jdXMoZXZlbnRUeXBlLCBwaHhFdmVudCwgdmlldywgc291cmNlRWwsIGVsKXtcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IGZvY3VzU3RhY2sgPSBlbCB8fCBzb3VyY2VFbClcbiAgfSxcblxuICBleGVjX3BvcF9mb2N1cyhldmVudFR5cGUsIHBoeEV2ZW50LCB2aWV3LCBzb3VyY2VFbCwgZWwpe1xuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgaWYoZm9jdXNTdGFjayl7IGZvY3VzU3RhY2suZm9jdXMoKSB9XG4gICAgICBmb2N1c1N0YWNrID0gbnVsbFxuICAgIH0pXG4gIH0sXG5cbiAgZXhlY19hZGRfY2xhc3MoZXZlbnRUeXBlLCBwaHhFdmVudCwgdmlldywgc291cmNlRWwsIGVsLCB7bmFtZXMsIHRyYW5zaXRpb24sIHRpbWV9KXtcbiAgICB0aGlzLmFkZE9yUmVtb3ZlQ2xhc3NlcyhlbCwgbmFtZXMsIFtdLCB0cmFuc2l0aW9uLCB0aW1lLCB2aWV3KVxuICB9LFxuXG4gIGV4ZWNfcmVtb3ZlX2NsYXNzKGV2ZW50VHlwZSwgcGh4RXZlbnQsIHZpZXcsIHNvdXJjZUVsLCBlbCwge25hbWVzLCB0cmFuc2l0aW9uLCB0aW1lfSl7XG4gICAgdGhpcy5hZGRPclJlbW92ZUNsYXNzZXMoZWwsIFtdLCBuYW1lcywgdHJhbnNpdGlvbiwgdGltZSwgdmlldylcbiAgfSxcblxuICBleGVjX3RyYW5zaXRpb24oZXZlbnRUeXBlLCBwaHhFdmVudCwgdmlldywgc291cmNlRWwsIGVsLCB7dGltZSwgdHJhbnNpdGlvbn0pe1xuICAgIHRoaXMuYWRkT3JSZW1vdmVDbGFzc2VzKGVsLCBbXSwgW10sIHRyYW5zaXRpb24sIHRpbWUsIHZpZXcpXG4gIH0sXG5cbiAgZXhlY190b2dnbGUoZXZlbnRUeXBlLCBwaHhFdmVudCwgdmlldywgc291cmNlRWwsIGVsLCB7ZGlzcGxheSwgaW5zLCBvdXRzLCB0aW1lfSl7XG4gICAgdGhpcy50b2dnbGUoZXZlbnRUeXBlLCB2aWV3LCBlbCwgZGlzcGxheSwgaW5zLCBvdXRzLCB0aW1lKVxuICB9LFxuXG4gIGV4ZWNfc2hvdyhldmVudFR5cGUsIHBoeEV2ZW50LCB2aWV3LCBzb3VyY2VFbCwgZWwsIHtkaXNwbGF5LCB0cmFuc2l0aW9uLCB0aW1lfSl7XG4gICAgdGhpcy5zaG93KGV2ZW50VHlwZSwgdmlldywgZWwsIGRpc3BsYXksIHRyYW5zaXRpb24sIHRpbWUpXG4gIH0sXG5cbiAgZXhlY19oaWRlKGV2ZW50VHlwZSwgcGh4RXZlbnQsIHZpZXcsIHNvdXJjZUVsLCBlbCwge2Rpc3BsYXksIHRyYW5zaXRpb24sIHRpbWV9KXtcbiAgICB0aGlzLmhpZGUoZXZlbnRUeXBlLCB2aWV3LCBlbCwgZGlzcGxheSwgdHJhbnNpdGlvbiwgdGltZSlcbiAgfSxcblxuICBleGVjX3NldF9hdHRyKGV2ZW50VHlwZSwgcGh4RXZlbnQsIHZpZXcsIHNvdXJjZUVsLCBlbCwge2F0dHI6IFthdHRyLCB2YWxdfSl7XG4gICAgdGhpcy5zZXRPclJlbW92ZUF0dHJzKGVsLCBbW2F0dHIsIHZhbF1dLCBbXSlcbiAgfSxcblxuICBleGVjX3JlbW92ZV9hdHRyKGV2ZW50VHlwZSwgcGh4RXZlbnQsIHZpZXcsIHNvdXJjZUVsLCBlbCwge2F0dHJ9KXtcbiAgICB0aGlzLnNldE9yUmVtb3ZlQXR0cnMoZWwsIFtdLCBbYXR0cl0pXG4gIH0sXG5cbiAgLy8gdXRpbHMgZm9yIGNvbW1hbmRzXG5cbiAgc2hvdyhldmVudFR5cGUsIHZpZXcsIGVsLCBkaXNwbGF5LCB0cmFuc2l0aW9uLCB0aW1lKXtcbiAgICBpZighdGhpcy5pc1Zpc2libGUoZWwpKXtcbiAgICAgIHRoaXMudG9nZ2xlKGV2ZW50VHlwZSwgdmlldywgZWwsIGRpc3BsYXksIHRyYW5zaXRpb24sIG51bGwsIHRpbWUpXG4gICAgfVxuICB9LFxuXG4gIGhpZGUoZXZlbnRUeXBlLCB2aWV3LCBlbCwgZGlzcGxheSwgdHJhbnNpdGlvbiwgdGltZSl7XG4gICAgaWYodGhpcy5pc1Zpc2libGUoZWwpKXtcbiAgICAgIHRoaXMudG9nZ2xlKGV2ZW50VHlwZSwgdmlldywgZWwsIGRpc3BsYXksIG51bGwsIHRyYW5zaXRpb24sIHRpbWUpXG4gICAgfVxuICB9LFxuXG4gIHRvZ2dsZShldmVudFR5cGUsIHZpZXcsIGVsLCBkaXNwbGF5LCBpbnMsIG91dHMsIHRpbWUpe1xuICAgIGxldCBbaW5DbGFzc2VzLCBpblN0YXJ0Q2xhc3NlcywgaW5FbmRDbGFzc2VzXSA9IGlucyB8fCBbW10sIFtdLCBbXV1cbiAgICBsZXQgW291dENsYXNzZXMsIG91dFN0YXJ0Q2xhc3Nlcywgb3V0RW5kQ2xhc3Nlc10gPSBvdXRzIHx8IFtbXSwgW10sIFtdXVxuICAgIGlmKGluQ2xhc3Nlcy5sZW5ndGggPiAwIHx8IG91dENsYXNzZXMubGVuZ3RoID4gMCl7XG4gICAgICBpZih0aGlzLmlzVmlzaWJsZShlbCkpe1xuICAgICAgICBsZXQgb25TdGFydCA9ICgpID0+IHtcbiAgICAgICAgICB0aGlzLmFkZE9yUmVtb3ZlQ2xhc3NlcyhlbCwgb3V0U3RhcnRDbGFzc2VzLCBpbkNsYXNzZXMuY29uY2F0KGluU3RhcnRDbGFzc2VzKS5jb25jYXQoaW5FbmRDbGFzc2VzKSlcbiAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYWRkT3JSZW1vdmVDbGFzc2VzKGVsLCBvdXRDbGFzc2VzLCBbXSlcbiAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGhpcy5hZGRPclJlbW92ZUNsYXNzZXMoZWwsIG91dEVuZENsYXNzZXMsIG91dFN0YXJ0Q2xhc3NlcykpXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBlbC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcInBoeDpoaWRlLXN0YXJ0XCIpKVxuICAgICAgICB2aWV3LnRyYW5zaXRpb24odGltZSwgb25TdGFydCwgKCkgPT4ge1xuICAgICAgICAgIHRoaXMuYWRkT3JSZW1vdmVDbGFzc2VzKGVsLCBbXSwgb3V0Q2xhc3Nlcy5jb25jYXQob3V0RW5kQ2xhc3NlcykpXG4gICAgICAgICAgRE9NLnB1dFN0aWNreShlbCwgXCJ0b2dnbGVcIiwgY3VycmVudEVsID0+IGN1cnJlbnRFbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCIpXG4gICAgICAgICAgZWwuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJwaHg6aGlkZS1lbmRcIikpXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZihldmVudFR5cGUgPT09IFwicmVtb3ZlXCIpeyByZXR1cm4gfVxuICAgICAgICBsZXQgb25TdGFydCA9ICgpID0+IHtcbiAgICAgICAgICB0aGlzLmFkZE9yUmVtb3ZlQ2xhc3NlcyhlbCwgaW5TdGFydENsYXNzZXMsIG91dENsYXNzZXMuY29uY2F0KG91dFN0YXJ0Q2xhc3NlcykuY29uY2F0KG91dEVuZENsYXNzZXMpKVxuICAgICAgICAgIGxldCBzdGlja3lEaXNwbGF5ID0gZGlzcGxheSB8fCB0aGlzLmRlZmF1bHREaXNwbGF5KGVsKVxuICAgICAgICAgIERPTS5wdXRTdGlja3koZWwsIFwidG9nZ2xlXCIsIGN1cnJlbnRFbCA9PiBjdXJyZW50RWwuc3R5bGUuZGlzcGxheSA9IHN0aWNreURpc3BsYXkpXG4gICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmFkZE9yUmVtb3ZlQ2xhc3NlcyhlbCwgaW5DbGFzc2VzLCBbXSlcbiAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGhpcy5hZGRPclJlbW92ZUNsYXNzZXMoZWwsIGluRW5kQ2xhc3NlcywgaW5TdGFydENsYXNzZXMpKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgZWwuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJwaHg6c2hvdy1zdGFydFwiKSlcbiAgICAgICAgdmlldy50cmFuc2l0aW9uKHRpbWUsIG9uU3RhcnQsICgpID0+IHtcbiAgICAgICAgICB0aGlzLmFkZE9yUmVtb3ZlQ2xhc3NlcyhlbCwgW10sIGluQ2xhc3Nlcy5jb25jYXQoaW5FbmRDbGFzc2VzKSlcbiAgICAgICAgICBlbC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcInBoeDpzaG93LWVuZFwiKSlcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYodGhpcy5pc1Zpc2libGUoZWwpKXtcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgICAgZWwuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJwaHg6aGlkZS1zdGFydFwiKSlcbiAgICAgICAgICBET00ucHV0U3RpY2t5KGVsLCBcInRvZ2dsZVwiLCBjdXJyZW50RWwgPT4gY3VycmVudEVsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIilcbiAgICAgICAgICBlbC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcInBoeDpoaWRlLWVuZFwiKSlcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICAgIGVsLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwicGh4OnNob3ctc3RhcnRcIikpXG4gICAgICAgICAgbGV0IHN0aWNreURpc3BsYXkgPSBkaXNwbGF5IHx8IHRoaXMuZGVmYXVsdERpc3BsYXkoZWwpXG4gICAgICAgICAgRE9NLnB1dFN0aWNreShlbCwgXCJ0b2dnbGVcIiwgY3VycmVudEVsID0+IGN1cnJlbnRFbC5zdHlsZS5kaXNwbGF5ID0gc3RpY2t5RGlzcGxheSlcbiAgICAgICAgICBlbC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcInBoeDpzaG93LWVuZFwiKSlcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgYWRkT3JSZW1vdmVDbGFzc2VzKGVsLCBhZGRzLCByZW1vdmVzLCB0cmFuc2l0aW9uLCB0aW1lLCB2aWV3KXtcbiAgICBsZXQgW3RyYW5zaXRpb25fcnVuLCB0cmFuc2l0aW9uX3N0YXJ0LCB0cmFuc2l0aW9uX2VuZF0gPSB0cmFuc2l0aW9uIHx8IFtbXSwgW10sIFtdXVxuICAgIGlmKHRyYW5zaXRpb25fcnVuLmxlbmd0aCA+IDApe1xuICAgICAgbGV0IG9uU3RhcnQgPSAoKSA9PiB0aGlzLmFkZE9yUmVtb3ZlQ2xhc3NlcyhlbCwgdHJhbnNpdGlvbl9zdGFydC5jb25jYXQodHJhbnNpdGlvbl9ydW4pLCBbXSlcbiAgICAgIGxldCBvbkRvbmUgPSAoKSA9PiB0aGlzLmFkZE9yUmVtb3ZlQ2xhc3NlcyhlbCwgYWRkcy5jb25jYXQodHJhbnNpdGlvbl9lbmQpLCByZW1vdmVzLmNvbmNhdCh0cmFuc2l0aW9uX3J1bikuY29uY2F0KHRyYW5zaXRpb25fc3RhcnQpKVxuICAgICAgcmV0dXJuIHZpZXcudHJhbnNpdGlvbih0aW1lLCBvblN0YXJ0LCBvbkRvbmUpXG4gICAgfVxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgbGV0IFtwcmV2QWRkcywgcHJldlJlbW92ZXNdID0gRE9NLmdldFN0aWNreShlbCwgXCJjbGFzc2VzXCIsIFtbXSwgW11dKVxuICAgICAgbGV0IGtlZXBBZGRzID0gYWRkcy5maWx0ZXIobmFtZSA9PiBwcmV2QWRkcy5pbmRleE9mKG5hbWUpIDwgMCAmJiAhZWwuY2xhc3NMaXN0LmNvbnRhaW5zKG5hbWUpKVxuICAgICAgbGV0IGtlZXBSZW1vdmVzID0gcmVtb3Zlcy5maWx0ZXIobmFtZSA9PiBwcmV2UmVtb3Zlcy5pbmRleE9mKG5hbWUpIDwgMCAmJiBlbC5jbGFzc0xpc3QuY29udGFpbnMobmFtZSkpXG4gICAgICBsZXQgbmV3QWRkcyA9IHByZXZBZGRzLmZpbHRlcihuYW1lID0+IHJlbW92ZXMuaW5kZXhPZihuYW1lKSA8IDApLmNvbmNhdChrZWVwQWRkcylcbiAgICAgIGxldCBuZXdSZW1vdmVzID0gcHJldlJlbW92ZXMuZmlsdGVyKG5hbWUgPT4gYWRkcy5pbmRleE9mKG5hbWUpIDwgMCkuY29uY2F0KGtlZXBSZW1vdmVzKVxuXG4gICAgICBET00ucHV0U3RpY2t5KGVsLCBcImNsYXNzZXNcIiwgY3VycmVudEVsID0+IHtcbiAgICAgICAgY3VycmVudEVsLmNsYXNzTGlzdC5yZW1vdmUoLi4ubmV3UmVtb3ZlcylcbiAgICAgICAgY3VycmVudEVsLmNsYXNzTGlzdC5hZGQoLi4ubmV3QWRkcylcbiAgICAgICAgcmV0dXJuIFtuZXdBZGRzLCBuZXdSZW1vdmVzXVxuICAgICAgfSlcbiAgICB9KVxuICB9LFxuXG4gIHNldE9yUmVtb3ZlQXR0cnMoZWwsIHNldHMsIHJlbW92ZXMpe1xuICAgIGxldCBbcHJldlNldHMsIHByZXZSZW1vdmVzXSA9IERPTS5nZXRTdGlja3koZWwsIFwiYXR0cnNcIiwgW1tdLCBbXV0pXG5cbiAgICBsZXQgYWx0ZXJlZEF0dHJzID0gc2V0cy5tYXAoKFthdHRyLCBfdmFsXSkgPT4gYXR0cikuY29uY2F0KHJlbW92ZXMpO1xuICAgIGxldCBuZXdTZXRzID0gcHJldlNldHMuZmlsdGVyKChbYXR0ciwgX3ZhbF0pID0+ICFhbHRlcmVkQXR0cnMuaW5jbHVkZXMoYXR0cikpLmNvbmNhdChzZXRzKTtcbiAgICBsZXQgbmV3UmVtb3ZlcyA9IHByZXZSZW1vdmVzLmZpbHRlcigoYXR0cikgPT4gIWFsdGVyZWRBdHRycy5pbmNsdWRlcyhhdHRyKSkuY29uY2F0KHJlbW92ZXMpO1xuXG4gICAgRE9NLnB1dFN0aWNreShlbCwgXCJhdHRyc1wiLCBjdXJyZW50RWwgPT4ge1xuICAgICAgbmV3UmVtb3Zlcy5mb3JFYWNoKGF0dHIgPT4gY3VycmVudEVsLnJlbW92ZUF0dHJpYnV0ZShhdHRyKSlcbiAgICAgIG5ld1NldHMuZm9yRWFjaCgoW2F0dHIsIHZhbF0pID0+IGN1cnJlbnRFbC5zZXRBdHRyaWJ1dGUoYXR0ciwgdmFsKSlcbiAgICAgIHJldHVybiBbbmV3U2V0cywgbmV3UmVtb3Zlc11cbiAgICB9KVxuICB9LFxuXG4gIGhhc0FsbENsYXNzZXMoZWwsIGNsYXNzZXMpeyByZXR1cm4gY2xhc3Nlcy5ldmVyeShuYW1lID0+IGVsLmNsYXNzTGlzdC5jb250YWlucyhuYW1lKSkgfSxcblxuICBpc1RvZ2dsZWRPdXQoZWwsIG91dENsYXNzZXMpe1xuICAgIHJldHVybiAhdGhpcy5pc1Zpc2libGUoZWwpIHx8IHRoaXMuaGFzQWxsQ2xhc3NlcyhlbCwgb3V0Q2xhc3NlcylcbiAgfSxcblxuICBmaWx0ZXJUb0Vscyhzb3VyY2VFbCwge3RvfSl7XG4gICAgcmV0dXJuIHRvID8gRE9NLmFsbChkb2N1bWVudCwgdG8pIDogW3NvdXJjZUVsXVxuICB9LFxuXG4gIGRlZmF1bHREaXNwbGF5KGVsKXtcbiAgICByZXR1cm4ge3RyOiBcInRhYmxlLXJvd1wiLCB0ZDogXCJ0YWJsZS1jZWxsXCJ9W2VsLnRhZ05hbWUudG9Mb3dlckNhc2UoKV0gfHwgXCJibG9ja1wiXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSlNcbiIsICJpbXBvcnQge1xuICBCRUZPUkVfVU5MT0FEX0xPQURFUl9USU1FT1VULFxuICBDSEVDS0FCTEVfSU5QVVRTLFxuICBDT05TRUNVVElWRV9SRUxPQURTLFxuICBQSFhfQVVUT19SRUNPVkVSLFxuICBQSFhfQ09NUE9ORU5ULFxuICBQSFhfQ09OTkVDVEVEX0NMQVNTLFxuICBQSFhfRElTQUJMRV9XSVRILFxuICBQSFhfRElTQUJMRV9XSVRIX1JFU1RPUkUsXG4gIFBIWF9ESVNBQkxFRCxcbiAgUEhYX0xPQURJTkdfQ0xBU1MsXG4gIFBIWF9FVkVOVF9DTEFTU0VTLFxuICBQSFhfRVJST1JfQ0xBU1MsXG4gIFBIWF9DTElFTlRfRVJST1JfQ0xBU1MsXG4gIFBIWF9TRVJWRVJfRVJST1JfQ0xBU1MsXG4gIFBIWF9GRUVEQkFDS19GT1IsXG4gIFBIWF9IQVNfU1VCTUlUVEVELFxuICBQSFhfSE9PSyxcbiAgUEhYX1BBR0VfTE9BRElORyxcbiAgUEhYX1BBUkVOVF9JRCxcbiAgUEhYX1BST0dSRVNTLFxuICBQSFhfUkVBRE9OTFksXG4gIFBIWF9SRUYsXG4gIFBIWF9SRUZfU1JDLFxuICBQSFhfUk9PVF9JRCxcbiAgUEhYX1NFU1NJT04sXG4gIFBIWF9TVEFUSUMsXG4gIFBIWF9UUkFDS19TVEFUSUMsXG4gIFBIWF9UUkFDS19VUExPQURTLFxuICBQSFhfVVBEQVRFLFxuICBQSFhfVVBMT0FEX1JFRixcbiAgUEhYX1ZJRVdfU0VMRUNUT1IsXG4gIFBIWF9NQUlOLFxuICBQSFhfTU9VTlRFRCxcbiAgUFVTSF9USU1FT1VULFxuICBQSFhfVklFV1BPUlRfVE9QLFxuICBQSFhfVklFV1BPUlRfQk9UVE9NLFxufSBmcm9tIFwiLi9jb25zdGFudHNcIlxuXG5pbXBvcnQge1xuICBjbG9uZSxcbiAgY2xvc2VzdFBoeEJpbmRpbmcsXG4gIGlzRW1wdHksXG4gIGlzRXF1YWxPYmosXG4gIGxvZ0Vycm9yLFxuICBtYXliZSxcbiAgaXNDaWQsXG59IGZyb20gXCIuL3V0aWxzXCJcblxuaW1wb3J0IEJyb3dzZXIgZnJvbSBcIi4vYnJvd3NlclwiXG5pbXBvcnQgRE9NIGZyb20gXCIuL2RvbVwiXG5pbXBvcnQgRE9NUGF0Y2ggZnJvbSBcIi4vZG9tX3BhdGNoXCJcbmltcG9ydCBMaXZlVXBsb2FkZXIgZnJvbSBcIi4vbGl2ZV91cGxvYWRlclwiXG5pbXBvcnQgUmVuZGVyZWQgZnJvbSBcIi4vcmVuZGVyZWRcIlxuaW1wb3J0IFZpZXdIb29rIGZyb20gXCIuL3ZpZXdfaG9va1wiXG5pbXBvcnQgSlMgZnJvbSBcIi4vanNcIlxuXG5sZXQgc2VyaWFsaXplRm9ybSA9IChmb3JtLCBtZXRhZGF0YSwgb25seU5hbWVzID0gW10pID0+IHtcbiAgbGV0IHtzdWJtaXR0ZXIsIC4uLm1ldGF9ID0gbWV0YWRhdGFcblxuICAvLyBUT0RPOiBSZXBsYWNlIHdpdGggYG5ldyBGb3JtRGF0YShmb3JtLCBzdWJtaXR0ZXIpYCB3aGVuIHN1cHBvcnRlZCBieSBsYXRlc3QgYnJvd3NlcnMsXG4gIC8vICAgICAgIGFuZCBtZW50aW9uIGBmb3JtZGF0YS1zdWJtaXR0ZXItcG9seWZpbGxgIGluIHRoZSBkb2NzLlxuICBsZXQgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoZm9ybSlcblxuICAvLyBUT0RPOiBSZW1vdmUgd2hlbiBGb3JtRGF0YSBjb25zdHJ1Y3RvciBzdXBwb3J0cyB0aGUgc3VibWl0dGVyIGFyZ3VtZW50LlxuICBpZihzdWJtaXR0ZXIgJiYgc3VibWl0dGVyLmhhc0F0dHJpYnV0ZShcIm5hbWVcIikgJiYgc3VibWl0dGVyLmZvcm0gJiYgc3VibWl0dGVyLmZvcm0gPT09IGZvcm0pe1xuICAgIGZvcm1EYXRhLmFwcGVuZChzdWJtaXR0ZXIubmFtZSwgc3VibWl0dGVyLnZhbHVlKVxuICB9XG5cbiAgbGV0IHRvUmVtb3ZlID0gW11cblxuICBmb3JtRGF0YS5mb3JFYWNoKCh2YWwsIGtleSwgX2luZGV4KSA9PiB7XG4gICAgaWYodmFsIGluc3RhbmNlb2YgRmlsZSl7IHRvUmVtb3ZlLnB1c2goa2V5KSB9XG4gIH0pXG5cbiAgLy8gQ2xlYW51cCBhZnRlciBidWlsZGluZyBmaWxlRGF0YVxuICB0b1JlbW92ZS5mb3JFYWNoKGtleSA9PiBmb3JtRGF0YS5kZWxldGUoa2V5KSlcblxuICBsZXQgcGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpXG4gIGZvcihsZXQgW2tleSwgdmFsXSBvZiBmb3JtRGF0YS5lbnRyaWVzKCkpe1xuICAgIGlmKG9ubHlOYW1lcy5sZW5ndGggPT09IDAgfHwgb25seU5hbWVzLmluZGV4T2Yoa2V5KSA+PSAwKXtcbiAgICAgIHBhcmFtcy5hcHBlbmQoa2V5LCB2YWwpXG4gICAgfVxuICB9XG4gIGZvcihsZXQgbWV0YUtleSBpbiBtZXRhKXsgcGFyYW1zLmFwcGVuZChtZXRhS2V5LCBtZXRhW21ldGFLZXldKSB9XG5cbiAgcmV0dXJuIHBhcmFtcy50b1N0cmluZygpXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZXcge1xuICBjb25zdHJ1Y3RvcihlbCwgbGl2ZVNvY2tldCwgcGFyZW50VmlldywgZmxhc2gsIGxpdmVSZWZlcmVyKXtcbiAgICB0aGlzLmlzRGVhZCA9IGZhbHNlXG4gICAgdGhpcy5saXZlU29ja2V0ID0gbGl2ZVNvY2tldFxuICAgIHRoaXMuZmxhc2ggPSBmbGFzaFxuICAgIHRoaXMucGFyZW50ID0gcGFyZW50Vmlld1xuICAgIHRoaXMucm9vdCA9IHBhcmVudFZpZXcgPyBwYXJlbnRWaWV3LnJvb3QgOiB0aGlzXG4gICAgdGhpcy5lbCA9IGVsXG4gICAgdGhpcy5pZCA9IHRoaXMuZWwuaWRcbiAgICB0aGlzLnJlZiA9IDBcbiAgICB0aGlzLmNoaWxkSm9pbnMgPSAwXG4gICAgdGhpcy5sb2FkZXJUaW1lciA9IG51bGxcbiAgICB0aGlzLnBlbmRpbmdEaWZmcyA9IFtdXG4gICAgdGhpcy5wcnVuaW5nQ0lEcyA9IFtdXG4gICAgdGhpcy5yZWRpcmVjdCA9IGZhbHNlXG4gICAgdGhpcy5ocmVmID0gbnVsbFxuICAgIHRoaXMuam9pbkNvdW50ID0gdGhpcy5wYXJlbnQgPyB0aGlzLnBhcmVudC5qb2luQ291bnQgLSAxIDogMFxuICAgIHRoaXMuam9pblBlbmRpbmcgPSB0cnVlXG4gICAgdGhpcy5kZXN0cm95ZWQgPSBmYWxzZVxuICAgIHRoaXMuam9pbkNhbGxiYWNrID0gZnVuY3Rpb24ob25Eb25lKXsgb25Eb25lICYmIG9uRG9uZSgpIH1cbiAgICB0aGlzLnN0b3BDYWxsYmFjayA9IGZ1bmN0aW9uKCl7IH1cbiAgICB0aGlzLnBlbmRpbmdKb2luT3BzID0gdGhpcy5wYXJlbnQgPyBudWxsIDogW11cbiAgICB0aGlzLnZpZXdIb29rcyA9IHt9XG4gICAgdGhpcy51cGxvYWRlcnMgPSB7fVxuICAgIHRoaXMuZm9ybVN1Ym1pdHMgPSBbXVxuICAgIHRoaXMuY2hpbGRyZW4gPSB0aGlzLnBhcmVudCA/IG51bGwgOiB7fVxuICAgIHRoaXMucm9vdC5jaGlsZHJlblt0aGlzLmlkXSA9IHt9XG4gICAgdGhpcy5jaGFubmVsID0gdGhpcy5saXZlU29ja2V0LmNoYW5uZWwoYGx2OiR7dGhpcy5pZH1gLCAoKSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICByZWRpcmVjdDogdGhpcy5yZWRpcmVjdCA/IHRoaXMuaHJlZiA6IHVuZGVmaW5lZCxcbiAgICAgICAgdXJsOiB0aGlzLnJlZGlyZWN0ID8gdW5kZWZpbmVkIDogdGhpcy5ocmVmIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgcGFyYW1zOiB0aGlzLmNvbm5lY3RQYXJhbXMobGl2ZVJlZmVyZXIpLFxuICAgICAgICBzZXNzaW9uOiB0aGlzLmdldFNlc3Npb24oKSxcbiAgICAgICAgc3RhdGljOiB0aGlzLmdldFN0YXRpYygpLFxuICAgICAgICBmbGFzaDogdGhpcy5mbGFzaCxcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgc2V0SHJlZihocmVmKXsgdGhpcy5ocmVmID0gaHJlZiB9XG5cbiAgc2V0UmVkaXJlY3QoaHJlZil7XG4gICAgdGhpcy5yZWRpcmVjdCA9IHRydWVcbiAgICB0aGlzLmhyZWYgPSBocmVmXG4gIH1cblxuICBpc01haW4oKXsgcmV0dXJuIHRoaXMuZWwuaGFzQXR0cmlidXRlKFBIWF9NQUlOKSB9XG5cbiAgY29ubmVjdFBhcmFtcyhsaXZlUmVmZXJlcil7XG4gICAgbGV0IHBhcmFtcyA9IHRoaXMubGl2ZVNvY2tldC5wYXJhbXModGhpcy5lbClcbiAgICBsZXQgbWFuaWZlc3QgPVxuICAgICAgRE9NLmFsbChkb2N1bWVudCwgYFske3RoaXMuYmluZGluZyhQSFhfVFJBQ0tfU1RBVElDKX1dYClcbiAgICAgICAgLm1hcChub2RlID0+IG5vZGUuc3JjIHx8IG5vZGUuaHJlZikuZmlsdGVyKHVybCA9PiB0eXBlb2YgKHVybCkgPT09IFwic3RyaW5nXCIpXG5cbiAgICBpZihtYW5pZmVzdC5sZW5ndGggPiAwKXsgcGFyYW1zW1wiX3RyYWNrX3N0YXRpY1wiXSA9IG1hbmlmZXN0IH1cbiAgICBwYXJhbXNbXCJfbW91bnRzXCJdID0gdGhpcy5qb2luQ291bnRcbiAgICBwYXJhbXNbXCJfbGl2ZV9yZWZlcmVyXCJdID0gbGl2ZVJlZmVyZXJcblxuICAgIHJldHVybiBwYXJhbXNcbiAgfVxuXG4gIGlzQ29ubmVjdGVkKCl7IHJldHVybiB0aGlzLmNoYW5uZWwuY2FuUHVzaCgpIH1cblxuICBnZXRTZXNzaW9uKCl7IHJldHVybiB0aGlzLmVsLmdldEF0dHJpYnV0ZShQSFhfU0VTU0lPTikgfVxuXG4gIGdldFN0YXRpYygpe1xuICAgIGxldCB2YWwgPSB0aGlzLmVsLmdldEF0dHJpYnV0ZShQSFhfU1RBVElDKVxuICAgIHJldHVybiB2YWwgPT09IFwiXCIgPyBudWxsIDogdmFsXG4gIH1cblxuICBkZXN0cm95KGNhbGxiYWNrID0gZnVuY3Rpb24gKCl7IH0pe1xuICAgIHRoaXMuZGVzdHJveUFsbENoaWxkcmVuKClcbiAgICB0aGlzLmRlc3Ryb3llZCA9IHRydWVcbiAgICBkZWxldGUgdGhpcy5yb290LmNoaWxkcmVuW3RoaXMuaWRdXG4gICAgaWYodGhpcy5wYXJlbnQpeyBkZWxldGUgdGhpcy5yb290LmNoaWxkcmVuW3RoaXMucGFyZW50LmlkXVt0aGlzLmlkXSB9XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMubG9hZGVyVGltZXIpXG4gICAgbGV0IG9uRmluaXNoZWQgPSAoKSA9PiB7XG4gICAgICBjYWxsYmFjaygpXG4gICAgICBmb3IobGV0IGlkIGluIHRoaXMudmlld0hvb2tzKXtcbiAgICAgICAgdGhpcy5kZXN0cm95SG9vayh0aGlzLnZpZXdIb29rc1tpZF0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgRE9NLm1hcmtQaHhDaGlsZERlc3Ryb3llZCh0aGlzLmVsKVxuXG4gICAgdGhpcy5sb2coXCJkZXN0cm95ZWRcIiwgKCkgPT4gW1widGhlIGNoaWxkIGhhcyBiZWVuIHJlbW92ZWQgZnJvbSB0aGUgcGFyZW50XCJdKVxuICAgIHRoaXMuY2hhbm5lbC5sZWF2ZSgpXG4gICAgICAucmVjZWl2ZShcIm9rXCIsIG9uRmluaXNoZWQpXG4gICAgICAucmVjZWl2ZShcImVycm9yXCIsIG9uRmluaXNoZWQpXG4gICAgICAucmVjZWl2ZShcInRpbWVvdXRcIiwgb25GaW5pc2hlZClcbiAgfVxuXG4gIHNldENvbnRhaW5lckNsYXNzZXMoLi4uY2xhc3Nlcyl7XG4gICAgdGhpcy5lbC5jbGFzc0xpc3QucmVtb3ZlKFxuICAgICAgUEhYX0NPTk5FQ1RFRF9DTEFTUyxcbiAgICAgIFBIWF9MT0FESU5HX0NMQVNTLFxuICAgICAgUEhYX0VSUk9SX0NMQVNTLFxuICAgICAgUEhYX0NMSUVOVF9FUlJPUl9DTEFTUyxcbiAgICAgIFBIWF9TRVJWRVJfRVJST1JfQ0xBU1NcbiAgICApXG4gICAgdGhpcy5lbC5jbGFzc0xpc3QuYWRkKC4uLmNsYXNzZXMpXG4gIH1cblxuICBzaG93TG9hZGVyKHRpbWVvdXQpe1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmxvYWRlclRpbWVyKVxuICAgIGlmKHRpbWVvdXQpe1xuICAgICAgdGhpcy5sb2FkZXJUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5zaG93TG9hZGVyKCksIHRpbWVvdXQpXG4gICAgfSBlbHNlIHtcbiAgICAgIGZvcihsZXQgaWQgaW4gdGhpcy52aWV3SG9va3MpeyB0aGlzLnZpZXdIb29rc1tpZF0uX19kaXNjb25uZWN0ZWQoKSB9XG4gICAgICB0aGlzLnNldENvbnRhaW5lckNsYXNzZXMoUEhYX0xPQURJTkdfQ0xBU1MpXG4gICAgfVxuICB9XG5cbiAgZXhlY0FsbChiaW5kaW5nKXtcbiAgICBET00uYWxsKHRoaXMuZWwsIGBbJHtiaW5kaW5nfV1gLCBlbCA9PiB0aGlzLmxpdmVTb2NrZXQuZXhlY0pTKGVsLCBlbC5nZXRBdHRyaWJ1dGUoYmluZGluZykpKVxuICB9XG5cbiAgaGlkZUxvYWRlcigpe1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmxvYWRlclRpbWVyKVxuICAgIHRoaXMuc2V0Q29udGFpbmVyQ2xhc3NlcyhQSFhfQ09OTkVDVEVEX0NMQVNTKVxuICAgIHRoaXMuZXhlY0FsbCh0aGlzLmJpbmRpbmcoXCJjb25uZWN0ZWRcIikpXG4gIH1cblxuICB0cmlnZ2VyUmVjb25uZWN0ZWQoKXtcbiAgICBmb3IobGV0IGlkIGluIHRoaXMudmlld0hvb2tzKXsgdGhpcy52aWV3SG9va3NbaWRdLl9fcmVjb25uZWN0ZWQoKSB9XG4gIH1cblxuICBsb2coa2luZCwgbXNnQ2FsbGJhY2spe1xuICAgIHRoaXMubGl2ZVNvY2tldC5sb2codGhpcywga2luZCwgbXNnQ2FsbGJhY2spXG4gIH1cblxuICB0cmFuc2l0aW9uKHRpbWUsIG9uU3RhcnQsIG9uRG9uZSA9IGZ1bmN0aW9uKCl7fSl7XG4gICAgdGhpcy5saXZlU29ja2V0LnRyYW5zaXRpb24odGltZSwgb25TdGFydCwgb25Eb25lKVxuICB9XG5cbiAgd2l0aGluVGFyZ2V0cyhwaHhUYXJnZXQsIGNhbGxiYWNrKXtcbiAgICBpZihwaHhUYXJnZXQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCB8fCBwaHhUYXJnZXQgaW5zdGFuY2VvZiBTVkdFbGVtZW50KXtcbiAgICAgIHJldHVybiB0aGlzLmxpdmVTb2NrZXQub3duZXIocGh4VGFyZ2V0LCB2aWV3ID0+IGNhbGxiYWNrKHZpZXcsIHBoeFRhcmdldCkpXG4gICAgfVxuXG4gICAgaWYoaXNDaWQocGh4VGFyZ2V0KSl7XG4gICAgICBsZXQgdGFyZ2V0cyA9IERPTS5maW5kQ29tcG9uZW50Tm9kZUxpc3QodGhpcy5lbCwgcGh4VGFyZ2V0KVxuICAgICAgaWYodGFyZ2V0cy5sZW5ndGggPT09IDApe1xuICAgICAgICBsb2dFcnJvcihgbm8gY29tcG9uZW50IGZvdW5kIG1hdGNoaW5nIHBoeC10YXJnZXQgb2YgJHtwaHhUYXJnZXR9YClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNhbGxiYWNrKHRoaXMsIHBhcnNlSW50KHBoeFRhcmdldCkpXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCB0YXJnZXRzID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHBoeFRhcmdldCkpXG4gICAgICBpZih0YXJnZXRzLmxlbmd0aCA9PT0gMCl7IGxvZ0Vycm9yKGBub3RoaW5nIGZvdW5kIG1hdGNoaW5nIHRoZSBwaHgtdGFyZ2V0IHNlbGVjdG9yIFwiJHtwaHhUYXJnZXR9XCJgKSB9XG4gICAgICB0YXJnZXRzLmZvckVhY2godGFyZ2V0ID0+IHRoaXMubGl2ZVNvY2tldC5vd25lcih0YXJnZXQsIHZpZXcgPT4gY2FsbGJhY2sodmlldywgdGFyZ2V0KSkpXG4gICAgfVxuICB9XG5cbiAgYXBwbHlEaWZmKHR5cGUsIHJhd0RpZmYsIGNhbGxiYWNrKXtcbiAgICB0aGlzLmxvZyh0eXBlLCAoKSA9PiBbXCJcIiwgY2xvbmUocmF3RGlmZildKVxuICAgIGxldCB7ZGlmZiwgcmVwbHksIGV2ZW50cywgdGl0bGV9ID0gUmVuZGVyZWQuZXh0cmFjdChyYXdEaWZmKVxuICAgIGNhbGxiYWNrKHtkaWZmLCByZXBseSwgZXZlbnRzfSlcbiAgICBpZih0aXRsZSl7IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gRE9NLnB1dFRpdGxlKHRpdGxlKSkgfVxuICB9XG5cbiAgb25Kb2luKHJlc3Ape1xuICAgIGxldCB7cmVuZGVyZWQsIGNvbnRhaW5lcn0gPSByZXNwXG4gICAgaWYoY29udGFpbmVyKXtcbiAgICAgIGxldCBbdGFnLCBhdHRyc10gPSBjb250YWluZXJcbiAgICAgIHRoaXMuZWwgPSBET00ucmVwbGFjZVJvb3RDb250YWluZXIodGhpcy5lbCwgdGFnLCBhdHRycylcbiAgICB9XG4gICAgdGhpcy5jaGlsZEpvaW5zID0gMFxuICAgIHRoaXMuam9pblBlbmRpbmcgPSB0cnVlXG4gICAgdGhpcy5mbGFzaCA9IG51bGxcblxuICAgIEJyb3dzZXIuZHJvcExvY2FsKHRoaXMubGl2ZVNvY2tldC5sb2NhbFN0b3JhZ2UsIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSwgQ09OU0VDVVRJVkVfUkVMT0FEUylcbiAgICB0aGlzLmFwcGx5RGlmZihcIm1vdW50XCIsIHJlbmRlcmVkLCAoe2RpZmYsIGV2ZW50c30pID0+IHtcbiAgICAgIHRoaXMucmVuZGVyZWQgPSBuZXcgUmVuZGVyZWQodGhpcy5pZCwgZGlmZilcbiAgICAgIGxldCBbaHRtbCwgc3RyZWFtc10gPSB0aGlzLnJlbmRlckNvbnRhaW5lcihudWxsLCBcImpvaW5cIilcbiAgICAgIHRoaXMuZHJvcFBlbmRpbmdSZWZzKClcbiAgICAgIGxldCBmb3JtcyA9IHRoaXMuZm9ybXNGb3JSZWNvdmVyeShodG1sKVxuICAgICAgdGhpcy5qb2luQ291bnQrK1xuXG4gICAgICBpZihmb3Jtcy5sZW5ndGggPiAwKXtcbiAgICAgICAgZm9ybXMuZm9yRWFjaCgoW2Zvcm0sIG5ld0Zvcm0sIG5ld0NpZF0sIGkpID0+IHtcbiAgICAgICAgICB0aGlzLnB1c2hGb3JtUmVjb3ZlcnkoZm9ybSwgbmV3Q2lkLCByZXNwID0+IHtcbiAgICAgICAgICAgIGlmKGkgPT09IGZvcm1zLmxlbmd0aCAtIDEpe1xuICAgICAgICAgICAgICB0aGlzLm9uSm9pbkNvbXBsZXRlKHJlc3AsIGh0bWwsIHN0cmVhbXMsIGV2ZW50cylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5vbkpvaW5Db21wbGV0ZShyZXNwLCBodG1sLCBzdHJlYW1zLCBldmVudHMpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGRyb3BQZW5kaW5nUmVmcygpe1xuICAgIERPTS5hbGwoZG9jdW1lbnQsIGBbJHtQSFhfUkVGX1NSQ309XCIke3RoaXMuaWR9XCJdWyR7UEhYX1JFRn1dYCwgZWwgPT4ge1xuICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKFBIWF9SRUYpXG4gICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoUEhYX1JFRl9TUkMpXG4gICAgfSlcbiAgfVxuXG4gIG9uSm9pbkNvbXBsZXRlKHtsaXZlX3BhdGNofSwgaHRtbCwgc3RyZWFtcywgZXZlbnRzKXtcbiAgICAvLyBJbiBvcmRlciB0byBwcm92aWRlIGEgYmV0dGVyIGV4cGVyaWVuY2UsIHdlIHdhbnQgdG8gam9pblxuICAgIC8vIGFsbCBMaXZlVmlld3MgZmlyc3QgYW5kIG9ubHkgdGhlbiBhcHBseSB0aGVpciBwYXRjaGVzLlxuICAgIGlmKHRoaXMuam9pbkNvdW50ID4gMSB8fCAodGhpcy5wYXJlbnQgJiYgIXRoaXMucGFyZW50LmlzSm9pblBlbmRpbmcoKSkpe1xuICAgICAgcmV0dXJuIHRoaXMuYXBwbHlKb2luUGF0Y2gobGl2ZV9wYXRjaCwgaHRtbCwgc3RyZWFtcywgZXZlbnRzKVxuICAgIH1cblxuICAgIC8vIE9uZSBkb3duc2lkZSBvZiB0aGlzIGFwcHJvYWNoIGlzIHRoYXQgd2UgbmVlZCB0byBmaW5kIHBoeENoaWxkcmVuXG4gICAgLy8gaW4gdGhlIGh0bWwgZnJhZ21lbnQsIGluc3RlYWQgb2YgZGlyZWN0bHkgb24gdGhlIERPTS4gVGhlIGZyYWdtZW50XG4gICAgLy8gYWxzbyBkb2VzIG5vdCBpbmNsdWRlIFBIWF9TVEFUSUMsIHNvIHdlIG5lZWQgdG8gY29weSBpdCBvdmVyIGZyb21cbiAgICAvLyB0aGUgRE9NLlxuICAgIGxldCBuZXdDaGlsZHJlbiA9IERPTS5maW5kUGh4Q2hpbGRyZW5JbkZyYWdtZW50KGh0bWwsIHRoaXMuaWQpLmZpbHRlcih0b0VsID0+IHtcbiAgICAgIGxldCBmcm9tRWwgPSB0b0VsLmlkICYmIHRoaXMuZWwucXVlcnlTZWxlY3RvcihgW2lkPVwiJHt0b0VsLmlkfVwiXWApXG4gICAgICBsZXQgcGh4U3RhdGljID0gZnJvbUVsICYmIGZyb21FbC5nZXRBdHRyaWJ1dGUoUEhYX1NUQVRJQylcbiAgICAgIGlmKHBoeFN0YXRpYyl7IHRvRWwuc2V0QXR0cmlidXRlKFBIWF9TVEFUSUMsIHBoeFN0YXRpYykgfVxuICAgICAgcmV0dXJuIHRoaXMuam9pbkNoaWxkKHRvRWwpXG4gICAgfSlcblxuICAgIGlmKG5ld0NoaWxkcmVuLmxlbmd0aCA9PT0gMCl7XG4gICAgICBpZih0aGlzLnBhcmVudCl7XG4gICAgICAgIHRoaXMucm9vdC5wZW5kaW5nSm9pbk9wcy5wdXNoKFt0aGlzLCAoKSA9PiB0aGlzLmFwcGx5Sm9pblBhdGNoKGxpdmVfcGF0Y2gsIGh0bWwsIHN0cmVhbXMsIGV2ZW50cyldKVxuICAgICAgICB0aGlzLnBhcmVudC5hY2tKb2luKHRoaXMpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm9uQWxsQ2hpbGRKb2luc0NvbXBsZXRlKClcbiAgICAgICAgdGhpcy5hcHBseUpvaW5QYXRjaChsaXZlX3BhdGNoLCBodG1sLCBzdHJlYW1zLCBldmVudHMpXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucm9vdC5wZW5kaW5nSm9pbk9wcy5wdXNoKFt0aGlzLCAoKSA9PiB0aGlzLmFwcGx5Sm9pblBhdGNoKGxpdmVfcGF0Y2gsIGh0bWwsIHN0cmVhbXMsIGV2ZW50cyldKVxuICAgIH1cbiAgfVxuXG4gIGF0dGFjaFRydWVEb2NFbCgpe1xuICAgIHRoaXMuZWwgPSBET00uYnlJZCh0aGlzLmlkKVxuICAgIHRoaXMuZWwuc2V0QXR0cmlidXRlKFBIWF9ST09UX0lELCB0aGlzLnJvb3QuaWQpXG4gIH1cblxuICBleGVjTmV3TW91bnRlZCgpe1xuICAgIGxldCBwaHhWaWV3cG9ydFRvcCA9IHRoaXMuYmluZGluZyhQSFhfVklFV1BPUlRfVE9QKVxuICAgIGxldCBwaHhWaWV3cG9ydEJvdHRvbSA9IHRoaXMuYmluZGluZyhQSFhfVklFV1BPUlRfQk9UVE9NKVxuICAgIERPTS5hbGwodGhpcy5lbCwgYFske3BoeFZpZXdwb3J0VG9wfV0sIFske3BoeFZpZXdwb3J0Qm90dG9tfV1gLCBob29rRWwgPT4ge1xuICAgICAgRE9NLm1heWJlQWRkUHJpdmF0ZUhvb2tzKGhvb2tFbCwgcGh4Vmlld3BvcnRUb3AsIHBoeFZpZXdwb3J0Qm90dG9tKVxuICAgICAgdGhpcy5tYXliZUFkZE5ld0hvb2soaG9va0VsKVxuICAgIH0pXG4gICAgRE9NLmFsbCh0aGlzLmVsLCBgWyR7dGhpcy5iaW5kaW5nKFBIWF9IT09LKX1dLCBbZGF0YS1waHgtJHtQSFhfSE9PS31dYCwgaG9va0VsID0+IHtcbiAgICAgIHRoaXMubWF5YmVBZGROZXdIb29rKGhvb2tFbClcbiAgICB9KVxuICAgIERPTS5hbGwodGhpcy5lbCwgYFske3RoaXMuYmluZGluZyhQSFhfTU9VTlRFRCl9XWAsIGVsID0+IHRoaXMubWF5YmVNb3VudGVkKGVsKSlcbiAgfVxuXG4gIGFwcGx5Sm9pblBhdGNoKGxpdmVfcGF0Y2gsIGh0bWwsIHN0cmVhbXMsIGV2ZW50cyl7XG4gICAgdGhpcy5hdHRhY2hUcnVlRG9jRWwoKVxuICAgIGxldCBwYXRjaCA9IG5ldyBET01QYXRjaCh0aGlzLCB0aGlzLmVsLCB0aGlzLmlkLCBodG1sLCBzdHJlYW1zLCBudWxsKVxuICAgIHBhdGNoLm1hcmtQcnVuYWJsZUNvbnRlbnRGb3JSZW1vdmFsKClcbiAgICB0aGlzLnBlcmZvcm1QYXRjaChwYXRjaCwgZmFsc2UpXG4gICAgdGhpcy5qb2luTmV3Q2hpbGRyZW4oKVxuICAgIHRoaXMuZXhlY05ld01vdW50ZWQoKVxuXG4gICAgdGhpcy5qb2luUGVuZGluZyA9IGZhbHNlXG4gICAgdGhpcy5saXZlU29ja2V0LmRpc3BhdGNoRXZlbnRzKGV2ZW50cylcbiAgICB0aGlzLmFwcGx5UGVuZGluZ1VwZGF0ZXMoKVxuXG4gICAgaWYobGl2ZV9wYXRjaCl7XG4gICAgICBsZXQge2tpbmQsIHRvfSA9IGxpdmVfcGF0Y2hcbiAgICAgIHRoaXMubGl2ZVNvY2tldC5oaXN0b3J5UGF0Y2godG8sIGtpbmQpXG4gICAgfVxuICAgIHRoaXMuaGlkZUxvYWRlcigpXG4gICAgaWYodGhpcy5qb2luQ291bnQgPiAxKXsgdGhpcy50cmlnZ2VyUmVjb25uZWN0ZWQoKSB9XG4gICAgdGhpcy5zdG9wQ2FsbGJhY2soKVxuICB9XG5cbiAgdHJpZ2dlckJlZm9yZVVwZGF0ZUhvb2soZnJvbUVsLCB0b0VsKXtcbiAgICB0aGlzLmxpdmVTb2NrZXQudHJpZ2dlckRPTShcIm9uQmVmb3JlRWxVcGRhdGVkXCIsIFtmcm9tRWwsIHRvRWxdKVxuICAgIGxldCBob29rID0gdGhpcy5nZXRIb29rKGZyb21FbClcbiAgICBsZXQgaXNJZ25vcmVkID0gaG9vayAmJiBET00uaXNJZ25vcmVkKGZyb21FbCwgdGhpcy5iaW5kaW5nKFBIWF9VUERBVEUpKVxuICAgIGlmKGhvb2sgJiYgIWZyb21FbC5pc0VxdWFsTm9kZSh0b0VsKSAmJiAhKGlzSWdub3JlZCAmJiBpc0VxdWFsT2JqKGZyb21FbC5kYXRhc2V0LCB0b0VsLmRhdGFzZXQpKSl7XG4gICAgICBob29rLl9fYmVmb3JlVXBkYXRlKClcbiAgICAgIHJldHVybiBob29rXG4gICAgfVxuICB9XG5cbiAgbWF5YmVNb3VudGVkKGVsKXtcbiAgICBsZXQgcGh4TW91bnRlZCA9IGVsLmdldEF0dHJpYnV0ZSh0aGlzLmJpbmRpbmcoUEhYX01PVU5URUQpKVxuICAgIGxldCBoYXNCZWVuSW52b2tlZCA9IHBoeE1vdW50ZWQgJiYgRE9NLnByaXZhdGUoZWwsIFwibW91bnRlZFwiKVxuICAgIGlmKHBoeE1vdW50ZWQgJiYgIWhhc0JlZW5JbnZva2VkKXtcbiAgICAgIHRoaXMubGl2ZVNvY2tldC5leGVjSlMoZWwsIHBoeE1vdW50ZWQpXG4gICAgICBET00ucHV0UHJpdmF0ZShlbCwgXCJtb3VudGVkXCIsIHRydWUpXG4gICAgfVxuICB9XG5cbiAgbWF5YmVBZGROZXdIb29rKGVsLCBmb3JjZSl7XG4gICAgbGV0IG5ld0hvb2sgPSB0aGlzLmFkZEhvb2soZWwpXG4gICAgaWYobmV3SG9vayl7IG5ld0hvb2suX19tb3VudGVkKCkgfVxuICB9XG5cbiAgcGVyZm9ybVBhdGNoKHBhdGNoLCBwcnVuZUNpZHMpe1xuICAgIGxldCByZW1vdmVkRWxzID0gW11cbiAgICBsZXQgcGh4Q2hpbGRyZW5BZGRlZCA9IGZhbHNlXG4gICAgbGV0IHVwZGF0ZWRIb29rSWRzID0gbmV3IFNldCgpXG5cbiAgICBwYXRjaC5hZnRlcihcImFkZGVkXCIsIGVsID0+IHtcbiAgICAgIHRoaXMubGl2ZVNvY2tldC50cmlnZ2VyRE9NKFwib25Ob2RlQWRkZWRcIiwgW2VsXSlcbiAgICAgIHRoaXMubWF5YmVBZGROZXdIb29rKGVsKVxuICAgICAgaWYoZWwuZ2V0QXR0cmlidXRlKXsgdGhpcy5tYXliZU1vdW50ZWQoZWwpIH1cbiAgICB9KVxuXG4gICAgcGF0Y2guYWZ0ZXIoXCJwaHhDaGlsZEFkZGVkXCIsIGVsID0+IHtcbiAgICAgIGlmKERPTS5pc1BoeFN0aWNreShlbCkpe1xuICAgICAgICB0aGlzLmxpdmVTb2NrZXQuam9pblJvb3RWaWV3cygpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwaHhDaGlsZHJlbkFkZGVkID0gdHJ1ZVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBwYXRjaC5iZWZvcmUoXCJ1cGRhdGVkXCIsIChmcm9tRWwsIHRvRWwpID0+IHtcbiAgICAgIGxldCBob29rID0gdGhpcy50cmlnZ2VyQmVmb3JlVXBkYXRlSG9vayhmcm9tRWwsIHRvRWwpXG4gICAgICBpZihob29rKXsgdXBkYXRlZEhvb2tJZHMuYWRkKGZyb21FbC5pZCkgfVxuICAgIH0pXG5cbiAgICBwYXRjaC5hZnRlcihcInVwZGF0ZWRcIiwgZWwgPT4ge1xuICAgICAgaWYodXBkYXRlZEhvb2tJZHMuaGFzKGVsLmlkKSl7IHRoaXMuZ2V0SG9vayhlbCkuX191cGRhdGVkKCkgfVxuICAgIH0pXG5cbiAgICBwYXRjaC5hZnRlcihcImRpc2NhcmRlZFwiLCAoZWwpID0+IHtcbiAgICAgIGlmKGVsLm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERSl7IHJlbW92ZWRFbHMucHVzaChlbCkgfVxuICAgIH0pXG5cbiAgICBwYXRjaC5hZnRlcihcInRyYW5zaXRpb25zRGlzY2FyZGVkXCIsIGVscyA9PiB0aGlzLmFmdGVyRWxlbWVudHNSZW1vdmVkKGVscywgcHJ1bmVDaWRzKSlcbiAgICBwYXRjaC5wZXJmb3JtKClcbiAgICB0aGlzLmFmdGVyRWxlbWVudHNSZW1vdmVkKHJlbW92ZWRFbHMsIHBydW5lQ2lkcylcblxuICAgIHJldHVybiBwaHhDaGlsZHJlbkFkZGVkXG4gIH1cblxuICBhZnRlckVsZW1lbnRzUmVtb3ZlZChlbGVtZW50cywgcHJ1bmVDaWRzKXtcbiAgICBsZXQgZGVzdHJveWVkQ0lEcyA9IFtdXG4gICAgZWxlbWVudHMuZm9yRWFjaChwYXJlbnQgPT4ge1xuICAgICAgbGV0IGNvbXBvbmVudHMgPSBET00uYWxsKHBhcmVudCwgYFske1BIWF9DT01QT05FTlR9XWApXG4gICAgICBsZXQgaG9va3MgPSBET00uYWxsKHBhcmVudCwgYFske3RoaXMuYmluZGluZyhQSFhfSE9PSyl9XWApXG4gICAgICBjb21wb25lbnRzLmNvbmNhdChwYXJlbnQpLmZvckVhY2goZWwgPT4ge1xuICAgICAgICBsZXQgY2lkID0gdGhpcy5jb21wb25lbnRJRChlbClcbiAgICAgICAgaWYoaXNDaWQoY2lkKSAmJiBkZXN0cm95ZWRDSURzLmluZGV4T2YoY2lkKSA9PT0gLTEpeyBkZXN0cm95ZWRDSURzLnB1c2goY2lkKSB9XG4gICAgICB9KVxuICAgICAgaG9va3MuY29uY2F0KHBhcmVudCkuZm9yRWFjaChob29rRWwgPT4ge1xuICAgICAgICBsZXQgaG9vayA9IHRoaXMuZ2V0SG9vayhob29rRWwpXG4gICAgICAgIGhvb2sgJiYgdGhpcy5kZXN0cm95SG9vayhob29rKVxuICAgICAgfSlcbiAgICB9KVxuICAgIC8vIFdlIHNob3VsZCBub3QgcHJ1bmVDaWRzIG9uIGpvaW5zLiBPdGhlcndpc2UsIGluIGNhc2Ugb2ZcbiAgICAvLyByZWpvaW5zLCB3ZSBtYXkgbm90aWZ5IGNpZHMgdGhhdCBubyBsb25nZXIgYmVsb25nIHRvIHRoZVxuICAgIC8vIGN1cnJlbnQgTGl2ZVZpZXcgdG8gYmUgcmVtb3ZlZC5cbiAgICBpZihwcnVuZUNpZHMpe1xuICAgICAgdGhpcy5tYXliZVB1c2hDb21wb25lbnRzRGVzdHJveWVkKGRlc3Ryb3llZENJRHMpXG4gICAgfVxuICB9XG5cbiAgam9pbk5ld0NoaWxkcmVuKCl7XG4gICAgRE9NLmZpbmRQaHhDaGlsZHJlbih0aGlzLmVsLCB0aGlzLmlkKS5mb3JFYWNoKGVsID0+IHRoaXMuam9pbkNoaWxkKGVsKSlcbiAgfVxuXG4gIGdldENoaWxkQnlJZChpZCl7IHJldHVybiB0aGlzLnJvb3QuY2hpbGRyZW5bdGhpcy5pZF1baWRdIH1cblxuICBnZXREZXNjZW5kZW50QnlFbChlbCl7XG4gICAgaWYoZWwuaWQgPT09IHRoaXMuaWQpe1xuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuY2hpbGRyZW5bZWwuZ2V0QXR0cmlidXRlKFBIWF9QQVJFTlRfSUQpXVtlbC5pZF1cbiAgICB9XG4gIH1cblxuICBkZXN0cm95RGVzY2VuZGVudChpZCl7XG4gICAgZm9yKGxldCBwYXJlbnRJZCBpbiB0aGlzLnJvb3QuY2hpbGRyZW4pe1xuICAgICAgZm9yKGxldCBjaGlsZElkIGluIHRoaXMucm9vdC5jaGlsZHJlbltwYXJlbnRJZF0pe1xuICAgICAgICBpZihjaGlsZElkID09PSBpZCl7IHJldHVybiB0aGlzLnJvb3QuY2hpbGRyZW5bcGFyZW50SWRdW2NoaWxkSWRdLmRlc3Ryb3koKSB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgam9pbkNoaWxkKGVsKXtcbiAgICBsZXQgY2hpbGQgPSB0aGlzLmdldENoaWxkQnlJZChlbC5pZClcbiAgICBpZighY2hpbGQpe1xuICAgICAgbGV0IHZpZXcgPSBuZXcgVmlldyhlbCwgdGhpcy5saXZlU29ja2V0LCB0aGlzKVxuICAgICAgdGhpcy5yb290LmNoaWxkcmVuW3RoaXMuaWRdW3ZpZXcuaWRdID0gdmlld1xuICAgICAgdmlldy5qb2luKClcbiAgICAgIHRoaXMuY2hpbGRKb2lucysrXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgfVxuXG4gIGlzSm9pblBlbmRpbmcoKXsgcmV0dXJuIHRoaXMuam9pblBlbmRpbmcgfVxuXG4gIGFja0pvaW4oX2NoaWxkKXtcbiAgICB0aGlzLmNoaWxkSm9pbnMtLVxuXG4gICAgaWYodGhpcy5jaGlsZEpvaW5zID09PSAwKXtcbiAgICAgIGlmKHRoaXMucGFyZW50KXtcbiAgICAgICAgdGhpcy5wYXJlbnQuYWNrSm9pbih0aGlzKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5vbkFsbENoaWxkSm9pbnNDb21wbGV0ZSgpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgb25BbGxDaGlsZEpvaW5zQ29tcGxldGUoKXtcbiAgICB0aGlzLmpvaW5DYWxsYmFjaygoKSA9PiB7XG4gICAgICB0aGlzLnBlbmRpbmdKb2luT3BzLmZvckVhY2goKFt2aWV3LCBvcF0pID0+IHtcbiAgICAgICAgaWYoIXZpZXcuaXNEZXN0cm95ZWQoKSl7IG9wKCkgfVxuICAgICAgfSlcbiAgICAgIHRoaXMucGVuZGluZ0pvaW5PcHMgPSBbXVxuICAgIH0pXG4gIH1cblxuICB1cGRhdGUoZGlmZiwgZXZlbnRzKXtcbiAgICBpZih0aGlzLmlzSm9pblBlbmRpbmcoKSB8fCAodGhpcy5saXZlU29ja2V0Lmhhc1BlbmRpbmdMaW5rKCkgJiYgdGhpcy5yb290LmlzTWFpbigpKSl7XG4gICAgICByZXR1cm4gdGhpcy5wZW5kaW5nRGlmZnMucHVzaCh7ZGlmZiwgZXZlbnRzfSlcbiAgICB9XG5cbiAgICB0aGlzLnJlbmRlcmVkLm1lcmdlRGlmZihkaWZmKVxuICAgIGxldCBwaHhDaGlsZHJlbkFkZGVkID0gZmFsc2VcblxuICAgIC8vIFdoZW4gdGhlIGRpZmYgb25seSBjb250YWlucyBjb21wb25lbnQgZGlmZnMsIHRoZW4gd2FsayBjb21wb25lbnRzXG4gICAgLy8gYW5kIHBhdGNoIG9ubHkgdGhlIHBhcmVudCBjb21wb25lbnQgY29udGFpbmVycyBmb3VuZCBpbiB0aGUgZGlmZi5cbiAgICAvLyBPdGhlcndpc2UsIHBhdGNoIGVudGlyZSBMViBjb250YWluZXIuXG4gICAgaWYodGhpcy5yZW5kZXJlZC5pc0NvbXBvbmVudE9ubHlEaWZmKGRpZmYpKXtcbiAgICAgIHRoaXMubGl2ZVNvY2tldC50aW1lKFwiY29tcG9uZW50IHBhdGNoIGNvbXBsZXRlXCIsICgpID0+IHtcbiAgICAgICAgbGV0IHBhcmVudENpZHMgPSBET00uZmluZFBhcmVudENJRHModGhpcy5lbCwgdGhpcy5yZW5kZXJlZC5jb21wb25lbnRDSURzKGRpZmYpKVxuICAgICAgICBwYXJlbnRDaWRzLmZvckVhY2gocGFyZW50Q0lEID0+IHtcbiAgICAgICAgICBpZih0aGlzLmNvbXBvbmVudFBhdGNoKHRoaXMucmVuZGVyZWQuZ2V0Q29tcG9uZW50KGRpZmYsIHBhcmVudENJRCksIHBhcmVudENJRCkpeyBwaHhDaGlsZHJlbkFkZGVkID0gdHJ1ZSB9XG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH0gZWxzZSBpZighaXNFbXB0eShkaWZmKSl7XG4gICAgICB0aGlzLmxpdmVTb2NrZXQudGltZShcImZ1bGwgcGF0Y2ggY29tcGxldGVcIiwgKCkgPT4ge1xuICAgICAgICBsZXQgW2h0bWwsIHN0cmVhbXNdID0gdGhpcy5yZW5kZXJDb250YWluZXIoZGlmZiwgXCJ1cGRhdGVcIilcbiAgICAgICAgbGV0IHBhdGNoID0gbmV3IERPTVBhdGNoKHRoaXMsIHRoaXMuZWwsIHRoaXMuaWQsIGh0bWwsIHN0cmVhbXMsIG51bGwpXG4gICAgICAgIHBoeENoaWxkcmVuQWRkZWQgPSB0aGlzLnBlcmZvcm1QYXRjaChwYXRjaCwgdHJ1ZSlcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgdGhpcy5saXZlU29ja2V0LmRpc3BhdGNoRXZlbnRzKGV2ZW50cylcbiAgICBpZihwaHhDaGlsZHJlbkFkZGVkKXsgdGhpcy5qb2luTmV3Q2hpbGRyZW4oKSB9XG4gIH1cblxuICByZW5kZXJDb250YWluZXIoZGlmZiwga2luZCl7XG4gICAgcmV0dXJuIHRoaXMubGl2ZVNvY2tldC50aW1lKGB0b1N0cmluZyBkaWZmICgke2tpbmR9KWAsICgpID0+IHtcbiAgICAgIGxldCB0YWcgPSB0aGlzLmVsLnRhZ05hbWVcbiAgICAgIC8vIERvbid0IHNraXAgYW55IGNvbXBvbmVudCBpbiB0aGUgZGlmZiBub3IgYW55IG1hcmtlZCBhcyBwcnVuZWRcbiAgICAgIC8vIChhcyB0aGV5IG1heSBoYXZlIGJlZW4gYWRkZWQgYmFjaylcbiAgICAgIGxldCBjaWRzID0gZGlmZiA/IHRoaXMucmVuZGVyZWQuY29tcG9uZW50Q0lEcyhkaWZmKS5jb25jYXQodGhpcy5wcnVuaW5nQ0lEcykgOiBudWxsXG4gICAgICBsZXQgW2h0bWwsIHN0cmVhbXNdID0gdGhpcy5yZW5kZXJlZC50b1N0cmluZyhjaWRzKVxuICAgICAgcmV0dXJuIFtgPCR7dGFnfT4ke2h0bWx9PC8ke3RhZ30+YCwgc3RyZWFtc11cbiAgICB9KVxuICB9XG5cbiAgY29tcG9uZW50UGF0Y2goZGlmZiwgY2lkKXtcbiAgICBpZihpc0VtcHR5KGRpZmYpKSByZXR1cm4gZmFsc2VcbiAgICBsZXQgW2h0bWwsIHN0cmVhbXNdID0gdGhpcy5yZW5kZXJlZC5jb21wb25lbnRUb1N0cmluZyhjaWQpXG4gICAgbGV0IHBhdGNoID0gbmV3IERPTVBhdGNoKHRoaXMsIHRoaXMuZWwsIHRoaXMuaWQsIGh0bWwsIHN0cmVhbXMsIGNpZClcbiAgICBsZXQgY2hpbGRyZW5BZGRlZCA9IHRoaXMucGVyZm9ybVBhdGNoKHBhdGNoLCB0cnVlKVxuICAgIHJldHVybiBjaGlsZHJlbkFkZGVkXG4gIH1cblxuICBnZXRIb29rKGVsKXsgcmV0dXJuIHRoaXMudmlld0hvb2tzW1ZpZXdIb29rLmVsZW1lbnRJRChlbCldIH1cblxuICBhZGRIb29rKGVsKXtcbiAgICBpZihWaWV3SG9vay5lbGVtZW50SUQoZWwpIHx8ICFlbC5nZXRBdHRyaWJ1dGUpeyByZXR1cm4gfVxuICAgIGxldCBob29rTmFtZSA9IGVsLmdldEF0dHJpYnV0ZShgZGF0YS1waHgtJHtQSFhfSE9PS31gKSB8fCBlbC5nZXRBdHRyaWJ1dGUodGhpcy5iaW5kaW5nKFBIWF9IT09LKSlcbiAgICBpZihob29rTmFtZSAmJiAhdGhpcy5vd25zRWxlbWVudChlbCkpeyByZXR1cm4gfVxuICAgIGxldCBjYWxsYmFja3MgPSB0aGlzLmxpdmVTb2NrZXQuZ2V0SG9va0NhbGxiYWNrcyhob29rTmFtZSlcblxuICAgIGlmKGNhbGxiYWNrcyl7XG4gICAgICBpZighZWwuaWQpeyBsb2dFcnJvcihgbm8gRE9NIElEIGZvciBob29rIFwiJHtob29rTmFtZX1cIi4gSG9va3MgcmVxdWlyZSBhIHVuaXF1ZSBJRCBvbiBlYWNoIGVsZW1lbnQuYCwgZWwpIH1cbiAgICAgIGxldCBob29rID0gbmV3IFZpZXdIb29rKHRoaXMsIGVsLCBjYWxsYmFja3MpXG4gICAgICB0aGlzLnZpZXdIb29rc1tWaWV3SG9vay5lbGVtZW50SUQoaG9vay5lbCldID0gaG9va1xuICAgICAgcmV0dXJuIGhvb2tcbiAgICB9IGVsc2UgaWYoaG9va05hbWUgIT09IG51bGwpe1xuICAgICAgbG9nRXJyb3IoYHVua25vd24gaG9vayBmb3VuZCBmb3IgXCIke2hvb2tOYW1lfVwiYCwgZWwpXG4gICAgfVxuICB9XG5cbiAgZGVzdHJveUhvb2soaG9vayl7XG4gICAgaG9vay5fX2Rlc3Ryb3llZCgpXG4gICAgaG9vay5fX2NsZWFudXBfXygpXG4gICAgZGVsZXRlIHRoaXMudmlld0hvb2tzW1ZpZXdIb29rLmVsZW1lbnRJRChob29rLmVsKV1cbiAgfVxuXG4gIGFwcGx5UGVuZGluZ1VwZGF0ZXMoKXtcbiAgICB0aGlzLnBlbmRpbmdEaWZmcy5mb3JFYWNoKCh7ZGlmZiwgZXZlbnRzfSkgPT4gdGhpcy51cGRhdGUoZGlmZiwgZXZlbnRzKSlcbiAgICB0aGlzLnBlbmRpbmdEaWZmcyA9IFtdXG4gICAgdGhpcy5lYWNoQ2hpbGQoY2hpbGQgPT4gY2hpbGQuYXBwbHlQZW5kaW5nVXBkYXRlcygpKVxuICB9XG5cbiAgZWFjaENoaWxkKGNhbGxiYWNrKXtcbiAgICBsZXQgY2hpbGRyZW4gPSB0aGlzLnJvb3QuY2hpbGRyZW5bdGhpcy5pZF0gfHwge31cbiAgICBmb3IobGV0IGlkIGluIGNoaWxkcmVuKXsgY2FsbGJhY2sodGhpcy5nZXRDaGlsZEJ5SWQoaWQpKSB9XG4gIH1cblxuICBvbkNoYW5uZWwoZXZlbnQsIGNiKXtcbiAgICB0aGlzLmxpdmVTb2NrZXQub25DaGFubmVsKHRoaXMuY2hhbm5lbCwgZXZlbnQsIHJlc3AgPT4ge1xuICAgICAgaWYodGhpcy5pc0pvaW5QZW5kaW5nKCkpe1xuICAgICAgICB0aGlzLnJvb3QucGVuZGluZ0pvaW5PcHMucHVzaChbdGhpcywgKCkgPT4gY2IocmVzcCldKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5saXZlU29ja2V0LnJlcXVlc3RET01VcGRhdGUoKCkgPT4gY2IocmVzcCkpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGJpbmRDaGFubmVsKCl7XG4gICAgLy8gVGhlIGRpZmYgZXZlbnQgc2hvdWxkIGJlIGhhbmRsZWQgYnkgdGhlIHJlZ3VsYXIgdXBkYXRlIG9wZXJhdGlvbnMuXG4gICAgLy8gQWxsIG90aGVyIG9wZXJhdGlvbnMgYXJlIHF1ZXVlZCB0byBiZSBhcHBsaWVkIG9ubHkgYWZ0ZXIgam9pbi5cbiAgICB0aGlzLmxpdmVTb2NrZXQub25DaGFubmVsKHRoaXMuY2hhbm5lbCwgXCJkaWZmXCIsIChyYXdEaWZmKSA9PiB7XG4gICAgICB0aGlzLmxpdmVTb2NrZXQucmVxdWVzdERPTVVwZGF0ZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuYXBwbHlEaWZmKFwidXBkYXRlXCIsIHJhd0RpZmYsICh7ZGlmZiwgZXZlbnRzfSkgPT4gdGhpcy51cGRhdGUoZGlmZiwgZXZlbnRzKSlcbiAgICAgIH0pXG4gICAgfSlcbiAgICB0aGlzLm9uQ2hhbm5lbChcInJlZGlyZWN0XCIsICh7dG8sIGZsYXNofSkgPT4gdGhpcy5vblJlZGlyZWN0KHt0bywgZmxhc2h9KSlcbiAgICB0aGlzLm9uQ2hhbm5lbChcImxpdmVfcGF0Y2hcIiwgKHJlZGlyKSA9PiB0aGlzLm9uTGl2ZVBhdGNoKHJlZGlyKSlcbiAgICB0aGlzLm9uQ2hhbm5lbChcImxpdmVfcmVkaXJlY3RcIiwgKHJlZGlyKSA9PiB0aGlzLm9uTGl2ZVJlZGlyZWN0KHJlZGlyKSlcbiAgICB0aGlzLmNoYW5uZWwub25FcnJvcihyZWFzb24gPT4gdGhpcy5vbkVycm9yKHJlYXNvbikpXG4gICAgdGhpcy5jaGFubmVsLm9uQ2xvc2UocmVhc29uID0+IHRoaXMub25DbG9zZShyZWFzb24pKVxuICB9XG5cbiAgZGVzdHJveUFsbENoaWxkcmVuKCl7IHRoaXMuZWFjaENoaWxkKGNoaWxkID0+IGNoaWxkLmRlc3Ryb3koKSkgfVxuXG4gIG9uTGl2ZVJlZGlyZWN0KHJlZGlyKXtcbiAgICBsZXQge3RvLCBraW5kLCBmbGFzaH0gPSByZWRpclxuICAgIGxldCB1cmwgPSB0aGlzLmV4cGFuZFVSTCh0bylcbiAgICB0aGlzLmxpdmVTb2NrZXQuaGlzdG9yeVJlZGlyZWN0KHVybCwga2luZCwgZmxhc2gpXG4gIH1cblxuICBvbkxpdmVQYXRjaChyZWRpcil7XG4gICAgbGV0IHt0bywga2luZH0gPSByZWRpclxuICAgIHRoaXMuaHJlZiA9IHRoaXMuZXhwYW5kVVJMKHRvKVxuICAgIHRoaXMubGl2ZVNvY2tldC5oaXN0b3J5UGF0Y2godG8sIGtpbmQpXG4gIH1cblxuICBleHBhbmRVUkwodG8pe1xuICAgIHJldHVybiB0by5zdGFydHNXaXRoKFwiL1wiKSA/IGAke3dpbmRvdy5sb2NhdGlvbi5wcm90b2NvbH0vLyR7d2luZG93LmxvY2F0aW9uLmhvc3R9JHt0b31gIDogdG9cbiAgfVxuXG4gIG9uUmVkaXJlY3Qoe3RvLCBmbGFzaH0peyB0aGlzLmxpdmVTb2NrZXQucmVkaXJlY3QodG8sIGZsYXNoKSB9XG5cbiAgaXNEZXN0cm95ZWQoKXsgcmV0dXJuIHRoaXMuZGVzdHJveWVkIH1cblxuICBqb2luRGVhZCgpeyB0aGlzLmlzRGVhZCA9IHRydWUgfVxuXG4gIGpvaW4oY2FsbGJhY2spe1xuICAgIHRoaXMuc2hvd0xvYWRlcih0aGlzLmxpdmVTb2NrZXQubG9hZGVyVGltZW91dClcbiAgICB0aGlzLmJpbmRDaGFubmVsKClcbiAgICBpZih0aGlzLmlzTWFpbigpKXtcbiAgICAgIHRoaXMuc3RvcENhbGxiYWNrID0gdGhpcy5saXZlU29ja2V0LndpdGhQYWdlTG9hZGluZyh7dG86IHRoaXMuaHJlZiwga2luZDogXCJpbml0aWFsXCJ9KVxuICAgIH1cbiAgICB0aGlzLmpvaW5DYWxsYmFjayA9IChvbkRvbmUpID0+IHtcbiAgICAgIG9uRG9uZSA9IG9uRG9uZSB8fCBmdW5jdGlvbigpe31cbiAgICAgIGNhbGxiYWNrID8gY2FsbGJhY2sodGhpcy5qb2luQ291bnQsIG9uRG9uZSkgOiBvbkRvbmUoKVxuICAgIH1cbiAgICB0aGlzLmxpdmVTb2NrZXQud3JhcFB1c2godGhpcywge3RpbWVvdXQ6IGZhbHNlfSwgKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuY2hhbm5lbC5qb2luKClcbiAgICAgICAgLnJlY2VpdmUoXCJva1wiLCBkYXRhID0+IHtcbiAgICAgICAgICBpZighdGhpcy5pc0Rlc3Ryb3llZCgpKXtcbiAgICAgICAgICAgIHRoaXMubGl2ZVNvY2tldC5yZXF1ZXN0RE9NVXBkYXRlKCgpID0+IHRoaXMub25Kb2luKGRhdGEpKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnJlY2VpdmUoXCJlcnJvclwiLCByZXNwID0+ICF0aGlzLmlzRGVzdHJveWVkKCkgJiYgdGhpcy5vbkpvaW5FcnJvcihyZXNwKSlcbiAgICAgICAgLnJlY2VpdmUoXCJ0aW1lb3V0XCIsICgpID0+ICF0aGlzLmlzRGVzdHJveWVkKCkgJiYgdGhpcy5vbkpvaW5FcnJvcih7cmVhc29uOiBcInRpbWVvdXRcIn0pKVxuICAgIH0pXG4gIH1cblxuICBvbkpvaW5FcnJvcihyZXNwKXtcbiAgICBpZihyZXNwLnJlYXNvbiA9PT0gXCJyZWxvYWRcIil7XG4gICAgICB0aGlzLmxvZyhcImVycm9yXCIsICgpID0+IFtgZmFpbGVkIG1vdW50IHdpdGggJHtyZXNwLnN0YXR1c30uIEZhbGxpbmcgYmFjayB0byBwYWdlIHJlcXVlc3RgLCByZXNwXSlcbiAgICAgIHJldHVybiB0aGlzLm9uUmVkaXJlY3Qoe3RvOiB0aGlzLmhyZWZ9KVxuICAgIH0gZWxzZSBpZihyZXNwLnJlYXNvbiA9PT0gXCJ1bmF1dGhvcml6ZWRcIiB8fCByZXNwLnJlYXNvbiA9PT0gXCJzdGFsZVwiKXtcbiAgICAgIHRoaXMubG9nKFwiZXJyb3JcIiwgKCkgPT4gW1widW5hdXRob3JpemVkIGxpdmVfcmVkaXJlY3QuIEZhbGxpbmcgYmFjayB0byBwYWdlIHJlcXVlc3RcIiwgcmVzcF0pXG4gICAgICByZXR1cm4gdGhpcy5vblJlZGlyZWN0KHt0bzogdGhpcy5ocmVmfSlcbiAgICB9XG4gICAgaWYocmVzcC5yZWRpcmVjdCB8fCByZXNwLmxpdmVfcmVkaXJlY3Qpe1xuICAgICAgdGhpcy5qb2luUGVuZGluZyA9IGZhbHNlXG4gICAgICB0aGlzLmNoYW5uZWwubGVhdmUoKVxuICAgIH1cbiAgICBpZihyZXNwLnJlZGlyZWN0KXsgcmV0dXJuIHRoaXMub25SZWRpcmVjdChyZXNwLnJlZGlyZWN0KSB9XG4gICAgaWYocmVzcC5saXZlX3JlZGlyZWN0KXsgcmV0dXJuIHRoaXMub25MaXZlUmVkaXJlY3QocmVzcC5saXZlX3JlZGlyZWN0KSB9XG4gICAgdGhpcy5kaXNwbGF5RXJyb3IoW1BIWF9MT0FESU5HX0NMQVNTLCBQSFhfRVJST1JfQ0xBU1MsIFBIWF9TRVJWRVJfRVJST1JfQ0xBU1NdKVxuICAgIHRoaXMubG9nKFwiZXJyb3JcIiwgKCkgPT4gW1widW5hYmxlIHRvIGpvaW5cIiwgcmVzcF0pXG4gICAgaWYodGhpcy5saXZlU29ja2V0LmlzQ29ubmVjdGVkKCkpeyB0aGlzLmxpdmVTb2NrZXQucmVsb2FkV2l0aEppdHRlcih0aGlzKSB9XG4gIH1cblxuICBvbkNsb3NlKHJlYXNvbil7XG4gICAgaWYodGhpcy5pc0Rlc3Ryb3llZCgpKXsgcmV0dXJuIH1cbiAgICBpZih0aGlzLmxpdmVTb2NrZXQuaGFzUGVuZGluZ0xpbmsoKSAmJiByZWFzb24gIT09IFwibGVhdmVcIil7XG4gICAgICByZXR1cm4gdGhpcy5saXZlU29ja2V0LnJlbG9hZFdpdGhKaXR0ZXIodGhpcylcbiAgICB9XG4gICAgdGhpcy5kZXN0cm95QWxsQ2hpbGRyZW4oKVxuICAgIHRoaXMubGl2ZVNvY2tldC5kcm9wQWN0aXZlRWxlbWVudCh0aGlzKVxuICAgIC8vIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgY2FuIGJlIG51bGwgaW4gSW50ZXJuZXQgRXhwbG9yZXIgMTFcbiAgICBpZihkb2N1bWVudC5hY3RpdmVFbGVtZW50KXsgZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5ibHVyKCkgfVxuICAgIGlmKHRoaXMubGl2ZVNvY2tldC5pc1VubG9hZGVkKCkpe1xuICAgICAgdGhpcy5zaG93TG9hZGVyKEJFRk9SRV9VTkxPQURfTE9BREVSX1RJTUVPVVQpXG4gICAgfVxuICB9XG5cbiAgb25FcnJvcihyZWFzb24pe1xuICAgIHRoaXMub25DbG9zZShyZWFzb24pXG4gICAgaWYodGhpcy5saXZlU29ja2V0LmlzQ29ubmVjdGVkKCkpeyB0aGlzLmxvZyhcImVycm9yXCIsICgpID0+IFtcInZpZXcgY3Jhc2hlZFwiLCByZWFzb25dKSB9XG4gICAgaWYoIXRoaXMubGl2ZVNvY2tldC5pc1VubG9hZGVkKCkpe1xuICAgICAgaWYodGhpcy5saXZlU29ja2V0LmlzQ29ubmVjdGVkKCkpe1xuICAgICAgICB0aGlzLmRpc3BsYXlFcnJvcihbUEhYX0xPQURJTkdfQ0xBU1MsIFBIWF9FUlJPUl9DTEFTUywgUEhYX1NFUlZFUl9FUlJPUl9DTEFTU10pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmRpc3BsYXlFcnJvcihbUEhYX0xPQURJTkdfQ0xBU1MsIFBIWF9FUlJPUl9DTEFTUywgUEhYX0NMSUVOVF9FUlJPUl9DTEFTU10pXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZGlzcGxheUVycm9yKGNsYXNzZXMpe1xuICAgIGlmKHRoaXMuaXNNYWluKCkpeyBET00uZGlzcGF0Y2hFdmVudCh3aW5kb3csIFwicGh4OnBhZ2UtbG9hZGluZy1zdGFydFwiLCB7ZGV0YWlsOiB7dG86IHRoaXMuaHJlZiwga2luZDogXCJlcnJvclwifX0pIH1cbiAgICB0aGlzLnNob3dMb2FkZXIoKVxuICAgIHRoaXMuc2V0Q29udGFpbmVyQ2xhc3NlcyguLi5jbGFzc2VzKVxuICAgIHRoaXMuZXhlY0FsbCh0aGlzLmJpbmRpbmcoXCJkaXNjb25uZWN0ZWRcIikpXG4gIH1cblxuICBwdXNoV2l0aFJlcGx5KHJlZkdlbmVyYXRvciwgZXZlbnQsIHBheWxvYWQsIG9uUmVwbHkgPSBmdW5jdGlvbiAoKXsgfSl7XG4gICAgaWYoIXRoaXMuaXNDb25uZWN0ZWQoKSl7IHJldHVybiB9XG5cbiAgICBsZXQgW3JlZiwgW2VsXSwgb3B0c10gPSByZWZHZW5lcmF0b3IgPyByZWZHZW5lcmF0b3IoKSA6IFtudWxsLCBbXSwge31dXG4gICAgbGV0IG9uTG9hZGluZ0RvbmUgPSBmdW5jdGlvbigpeyB9XG4gICAgaWYob3B0cy5wYWdlX2xvYWRpbmcgfHwgKGVsICYmIChlbC5nZXRBdHRyaWJ1dGUodGhpcy5iaW5kaW5nKFBIWF9QQUdFX0xPQURJTkcpKSAhPT0gbnVsbCkpKXtcbiAgICAgIG9uTG9hZGluZ0RvbmUgPSB0aGlzLmxpdmVTb2NrZXQud2l0aFBhZ2VMb2FkaW5nKHtraW5kOiBcImVsZW1lbnRcIiwgdGFyZ2V0OiBlbH0pXG4gICAgfVxuXG4gICAgaWYodHlwZW9mIChwYXlsb2FkLmNpZCkgIT09IFwibnVtYmVyXCIpeyBkZWxldGUgcGF5bG9hZC5jaWQgfVxuICAgIHJldHVybiAoXG4gICAgICB0aGlzLmxpdmVTb2NrZXQud3JhcFB1c2godGhpcywge3RpbWVvdXQ6IHRydWV9LCAoKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNoYW5uZWwucHVzaChldmVudCwgcGF5bG9hZCwgUFVTSF9USU1FT1VUKS5yZWNlaXZlKFwib2tcIiwgcmVzcCA9PiB7XG4gICAgICAgICAgbGV0IGZpbmlzaCA9IChob29rUmVwbHkpID0+IHtcbiAgICAgICAgICAgIGlmKHJlc3AucmVkaXJlY3QpeyB0aGlzLm9uUmVkaXJlY3QocmVzcC5yZWRpcmVjdCkgfVxuICAgICAgICAgICAgaWYocmVzcC5saXZlX3BhdGNoKXsgdGhpcy5vbkxpdmVQYXRjaChyZXNwLmxpdmVfcGF0Y2gpIH1cbiAgICAgICAgICAgIGlmKHJlc3AubGl2ZV9yZWRpcmVjdCl7IHRoaXMub25MaXZlUmVkaXJlY3QocmVzcC5saXZlX3JlZGlyZWN0KSB9XG4gICAgICAgICAgICBvbkxvYWRpbmdEb25lKClcbiAgICAgICAgICAgIG9uUmVwbHkocmVzcCwgaG9va1JlcGx5KVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZihyZXNwLmRpZmYpe1xuICAgICAgICAgICAgdGhpcy5saXZlU29ja2V0LnJlcXVlc3RET01VcGRhdGUoKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmFwcGx5RGlmZihcInVwZGF0ZVwiLCByZXNwLmRpZmYsICh7ZGlmZiwgcmVwbHksIGV2ZW50c30pID0+IHtcbiAgICAgICAgICAgICAgICBpZihyZWYgIT09IG51bGwpeyB0aGlzLnVuZG9SZWZzKHJlZikgfVxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlKGRpZmYsIGV2ZW50cylcbiAgICAgICAgICAgICAgICBmaW5pc2gocmVwbHkpXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZihyZWYgIT09IG51bGwpeyB0aGlzLnVuZG9SZWZzKHJlZikgfVxuICAgICAgICAgICAgZmluaXNoKG51bGwpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICApXG4gIH1cblxuICB1bmRvUmVmcyhyZWYpe1xuICAgIGlmKCF0aGlzLmlzQ29ubmVjdGVkKCkpeyByZXR1cm4gfSAvLyBleGl0IGlmIGV4dGVybmFsIGZvcm0gdHJpZ2dlcmVkXG5cbiAgICBET00uYWxsKGRvY3VtZW50LCBgWyR7UEhYX1JFRl9TUkN9PVwiJHt0aGlzLmlkfVwiXVske1BIWF9SRUZ9PVwiJHtyZWZ9XCJdYCwgZWwgPT4ge1xuICAgICAgbGV0IGRpc2FibGVkVmFsID0gZWwuZ2V0QXR0cmlidXRlKFBIWF9ESVNBQkxFRClcbiAgICAgIC8vIHJlbW92ZSByZWZzXG4gICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoUEhYX1JFRilcbiAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZShQSFhfUkVGX1NSQylcbiAgICAgIC8vIHJlc3RvcmUgaW5wdXRzXG4gICAgICBpZihlbC5nZXRBdHRyaWJ1dGUoUEhYX1JFQURPTkxZKSAhPT0gbnVsbCl7XG4gICAgICAgIGVsLnJlYWRPbmx5ID0gZmFsc2VcbiAgICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKFBIWF9SRUFET05MWSlcbiAgICAgIH1cbiAgICAgIGlmKGRpc2FibGVkVmFsICE9PSBudWxsKXtcbiAgICAgICAgZWwuZGlzYWJsZWQgPSBkaXNhYmxlZFZhbCA9PT0gXCJ0cnVlXCIgPyB0cnVlIDogZmFsc2VcbiAgICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKFBIWF9ESVNBQkxFRClcbiAgICAgIH1cbiAgICAgIC8vIHJlbW92ZSBjbGFzc2VzXG4gICAgICBQSFhfRVZFTlRfQ0xBU1NFUy5mb3JFYWNoKGNsYXNzTmFtZSA9PiBET00ucmVtb3ZlQ2xhc3MoZWwsIGNsYXNzTmFtZSkpXG4gICAgICAvLyByZXN0b3JlIGRpc2FibGVzXG4gICAgICBsZXQgZGlzYWJsZVJlc3RvcmUgPSBlbC5nZXRBdHRyaWJ1dGUoUEhYX0RJU0FCTEVfV0lUSF9SRVNUT1JFKVxuICAgICAgaWYoZGlzYWJsZVJlc3RvcmUgIT09IG51bGwpe1xuICAgICAgICBlbC5pbm5lclRleHQgPSBkaXNhYmxlUmVzdG9yZVxuICAgICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoUEhYX0RJU0FCTEVfV0lUSF9SRVNUT1JFKVxuICAgICAgfVxuICAgICAgbGV0IHRvRWwgPSBET00ucHJpdmF0ZShlbCwgUEhYX1JFRilcbiAgICAgIGlmKHRvRWwpe1xuICAgICAgICBsZXQgaG9vayA9IHRoaXMudHJpZ2dlckJlZm9yZVVwZGF0ZUhvb2soZWwsIHRvRWwpXG4gICAgICAgIERPTVBhdGNoLnBhdGNoRWwoZWwsIHRvRWwsIHRoaXMubGl2ZVNvY2tldC5nZXRBY3RpdmVFbGVtZW50KCkpXG4gICAgICAgIGlmKGhvb2speyBob29rLl9fdXBkYXRlZCgpIH1cbiAgICAgICAgRE9NLmRlbGV0ZVByaXZhdGUoZWwsIFBIWF9SRUYpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHB1dFJlZihlbGVtZW50cywgZXZlbnQsIG9wdHMgPSB7fSl7XG4gICAgbGV0IG5ld1JlZiA9IHRoaXMucmVmKytcbiAgICBsZXQgZGlzYWJsZVdpdGggPSB0aGlzLmJpbmRpbmcoUEhYX0RJU0FCTEVfV0lUSClcbiAgICBpZihvcHRzLmxvYWRpbmcpeyBlbGVtZW50cyA9IGVsZW1lbnRzLmNvbmNhdChET00uYWxsKGRvY3VtZW50LCBvcHRzLmxvYWRpbmcpKX1cblxuICAgIGVsZW1lbnRzLmZvckVhY2goZWwgPT4ge1xuICAgICAgZWwuY2xhc3NMaXN0LmFkZChgcGh4LSR7ZXZlbnR9LWxvYWRpbmdgKVxuICAgICAgZWwuc2V0QXR0cmlidXRlKFBIWF9SRUYsIG5ld1JlZilcbiAgICAgIGVsLnNldEF0dHJpYnV0ZShQSFhfUkVGX1NSQywgdGhpcy5lbC5pZClcbiAgICAgIGxldCBkaXNhYmxlVGV4dCA9IGVsLmdldEF0dHJpYnV0ZShkaXNhYmxlV2l0aClcbiAgICAgIGlmKGRpc2FibGVUZXh0ICE9PSBudWxsKXtcbiAgICAgICAgaWYoIWVsLmdldEF0dHJpYnV0ZShQSFhfRElTQUJMRV9XSVRIX1JFU1RPUkUpKXtcbiAgICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoUEhYX0RJU0FCTEVfV0lUSF9SRVNUT1JFLCBlbC5pbm5lclRleHQpXG4gICAgICAgIH1cbiAgICAgICAgaWYoZGlzYWJsZVRleHQgIT09IFwiXCIpeyBlbC5pbm5lclRleHQgPSBkaXNhYmxlVGV4dCB9XG4gICAgICAgIGVsLnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIFwiXCIpXG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gW25ld1JlZiwgZWxlbWVudHMsIG9wdHNdXG4gIH1cblxuICBjb21wb25lbnRJRChlbCl7XG4gICAgbGV0IGNpZCA9IGVsLmdldEF0dHJpYnV0ZSAmJiBlbC5nZXRBdHRyaWJ1dGUoUEhYX0NPTVBPTkVOVClcbiAgICByZXR1cm4gY2lkID8gcGFyc2VJbnQoY2lkKSA6IG51bGxcbiAgfVxuXG4gIHRhcmdldENvbXBvbmVudElEKHRhcmdldCwgdGFyZ2V0Q3R4LCBvcHRzID0ge30pe1xuICAgIGlmKGlzQ2lkKHRhcmdldEN0eCkpeyByZXR1cm4gdGFyZ2V0Q3R4IH1cblxuICAgIGxldCBjaWRPclNlbGVjdG9yID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSh0aGlzLmJpbmRpbmcoXCJ0YXJnZXRcIikpXG4gICAgaWYoaXNDaWQoY2lkT3JTZWxlY3Rvcikpe1xuICAgICAgcmV0dXJuIHBhcnNlSW50KGNpZE9yU2VsZWN0b3IpXG4gICAgfSBlbHNlIGlmKHRhcmdldEN0eCAmJiAoY2lkT3JTZWxlY3RvciAhPT0gbnVsbCB8fCBvcHRzLnRhcmdldCkpe1xuICAgICAgcmV0dXJuIHRoaXMuY2xvc2VzdENvbXBvbmVudElEKHRhcmdldEN0eClcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gIH1cblxuICBjbG9zZXN0Q29tcG9uZW50SUQodGFyZ2V0Q3R4KXtcbiAgICBpZihpc0NpZCh0YXJnZXRDdHgpKXtcbiAgICAgIHJldHVybiB0YXJnZXRDdHhcbiAgICB9IGVsc2UgaWYodGFyZ2V0Q3R4KXtcbiAgICAgIHJldHVybiBtYXliZSh0YXJnZXRDdHguY2xvc2VzdChgWyR7UEhYX0NPTVBPTkVOVH1dYCksIGVsID0+IHRoaXMub3duc0VsZW1lbnQoZWwpICYmIHRoaXMuY29tcG9uZW50SUQoZWwpKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgfVxuXG4gIHB1c2hIb29rRXZlbnQoZWwsIHRhcmdldEN0eCwgZXZlbnQsIHBheWxvYWQsIG9uUmVwbHkpe1xuICAgIGlmKCF0aGlzLmlzQ29ubmVjdGVkKCkpe1xuICAgICAgdGhpcy5sb2coXCJob29rXCIsICgpID0+IFtcInVuYWJsZSB0byBwdXNoIGhvb2sgZXZlbnQuIExpdmVWaWV3IG5vdCBjb25uZWN0ZWRcIiwgZXZlbnQsIHBheWxvYWRdKVxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIGxldCBbcmVmLCBlbHMsIG9wdHNdID0gdGhpcy5wdXRSZWYoW2VsXSwgXCJob29rXCIpXG4gICAgdGhpcy5wdXNoV2l0aFJlcGx5KCgpID0+IFtyZWYsIGVscywgb3B0c10sIFwiZXZlbnRcIiwge1xuICAgICAgdHlwZTogXCJob29rXCIsXG4gICAgICBldmVudDogZXZlbnQsXG4gICAgICB2YWx1ZTogcGF5bG9hZCxcbiAgICAgIGNpZDogdGhpcy5jbG9zZXN0Q29tcG9uZW50SUQodGFyZ2V0Q3R4KVxuICAgIH0sIChyZXNwLCByZXBseSkgPT4gb25SZXBseShyZXBseSwgcmVmKSlcblxuICAgIHJldHVybiByZWZcbiAgfVxuXG4gIGV4dHJhY3RNZXRhKGVsLCBtZXRhLCB2YWx1ZSl7XG4gICAgbGV0IHByZWZpeCA9IHRoaXMuYmluZGluZyhcInZhbHVlLVwiKVxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBlbC5hdHRyaWJ1dGVzLmxlbmd0aDsgaSsrKXtcbiAgICAgIGlmKCFtZXRhKXsgbWV0YSA9IHt9IH1cbiAgICAgIGxldCBuYW1lID0gZWwuYXR0cmlidXRlc1tpXS5uYW1lXG4gICAgICBpZihuYW1lLnN0YXJ0c1dpdGgocHJlZml4KSl7IG1ldGFbbmFtZS5yZXBsYWNlKHByZWZpeCwgXCJcIildID0gZWwuZ2V0QXR0cmlidXRlKG5hbWUpIH1cbiAgICB9XG4gICAgaWYoZWwudmFsdWUgIT09IHVuZGVmaW5lZCAmJiAhKGVsIGluc3RhbmNlb2YgSFRNTEZvcm1FbGVtZW50KSl7XG4gICAgICBpZighbWV0YSl7IG1ldGEgPSB7fSB9XG4gICAgICBtZXRhLnZhbHVlID0gZWwudmFsdWVcblxuICAgICAgaWYoZWwudGFnTmFtZSA9PT0gXCJJTlBVVFwiICYmIENIRUNLQUJMRV9JTlBVVFMuaW5kZXhPZihlbC50eXBlKSA+PSAwICYmICFlbC5jaGVja2VkKXtcbiAgICAgICAgZGVsZXRlIG1ldGEudmFsdWVcbiAgICAgIH1cbiAgICB9XG4gICAgaWYodmFsdWUpe1xuICAgICAgaWYoIW1ldGEpeyBtZXRhID0ge30gfVxuICAgICAgZm9yKGxldCBrZXkgaW4gdmFsdWUpeyBtZXRhW2tleV0gPSB2YWx1ZVtrZXldIH1cbiAgICB9XG4gICAgcmV0dXJuIG1ldGFcbiAgfVxuXG5cbiAgcHVzaEV2ZW50KHR5cGUsIGVsLCB0YXJnZXRDdHgsIHBoeEV2ZW50LCBtZXRhLCBvcHRzID0ge30sIG9uUmVwbHkpe1xuICAgIHRoaXMucHVzaFdpdGhSZXBseSgoKSA9PiB0aGlzLnB1dFJlZihbZWxdLCB0eXBlLCBvcHRzKSwgXCJldmVudFwiLCB7XG4gICAgICB0eXBlOiB0eXBlLFxuICAgICAgZXZlbnQ6IHBoeEV2ZW50LFxuICAgICAgdmFsdWU6IHRoaXMuZXh0cmFjdE1ldGEoZWwsIG1ldGEsIG9wdHMudmFsdWUpLFxuICAgICAgY2lkOiB0aGlzLnRhcmdldENvbXBvbmVudElEKGVsLCB0YXJnZXRDdHgsIG9wdHMpXG4gICAgfSwgKHJlc3AsIHJlcGx5KSA9PiBvblJlcGx5ICYmIG9uUmVwbHkocmVwbHkpKVxuICB9XG5cbiAgcHVzaEZpbGVQcm9ncmVzcyhmaWxlRWwsIGVudHJ5UmVmLCBwcm9ncmVzcywgb25SZXBseSA9IGZ1bmN0aW9uICgpeyB9KXtcbiAgICB0aGlzLmxpdmVTb2NrZXQud2l0aGluT3duZXJzKGZpbGVFbC5mb3JtLCAodmlldywgdGFyZ2V0Q3R4KSA9PiB7XG4gICAgICB2aWV3LnB1c2hXaXRoUmVwbHkobnVsbCwgXCJwcm9ncmVzc1wiLCB7XG4gICAgICAgIGV2ZW50OiBmaWxlRWwuZ2V0QXR0cmlidXRlKHZpZXcuYmluZGluZyhQSFhfUFJPR1JFU1MpKSxcbiAgICAgICAgcmVmOiBmaWxlRWwuZ2V0QXR0cmlidXRlKFBIWF9VUExPQURfUkVGKSxcbiAgICAgICAgZW50cnlfcmVmOiBlbnRyeVJlZixcbiAgICAgICAgcHJvZ3Jlc3M6IHByb2dyZXNzLFxuICAgICAgICBjaWQ6IHZpZXcudGFyZ2V0Q29tcG9uZW50SUQoZmlsZUVsLmZvcm0sIHRhcmdldEN0eClcbiAgICAgIH0sIG9uUmVwbHkpXG4gICAgfSlcbiAgfVxuXG4gIHB1c2hJbnB1dChpbnB1dEVsLCB0YXJnZXRDdHgsIGZvcmNlQ2lkLCBwaHhFdmVudCwgb3B0cywgY2FsbGJhY2spe1xuICAgIGxldCB1cGxvYWRzXG4gICAgbGV0IGNpZCA9IGlzQ2lkKGZvcmNlQ2lkKSA/IGZvcmNlQ2lkIDogdGhpcy50YXJnZXRDb21wb25lbnRJRChpbnB1dEVsLmZvcm0sIHRhcmdldEN0eClcbiAgICBsZXQgcmVmR2VuZXJhdG9yID0gKCkgPT4gdGhpcy5wdXRSZWYoW2lucHV0RWwsIGlucHV0RWwuZm9ybV0sIFwiY2hhbmdlXCIsIG9wdHMpXG4gICAgbGV0IGZvcm1EYXRhXG4gICAgbGV0IG1ldGEgID0gdGhpcy5leHRyYWN0TWV0YShpbnB1dEVsLmZvcm0pXG4gICAgaWYoaW5wdXRFbC5nZXRBdHRyaWJ1dGUodGhpcy5iaW5kaW5nKFwiY2hhbmdlXCIpKSl7XG4gICAgICBmb3JtRGF0YSA9IHNlcmlhbGl6ZUZvcm0oaW5wdXRFbC5mb3JtLCB7X3RhcmdldDogb3B0cy5fdGFyZ2V0LCAuLi5tZXRhfSwgW2lucHV0RWwubmFtZV0pXG4gICAgfSBlbHNlIHtcbiAgICAgIGZvcm1EYXRhID0gc2VyaWFsaXplRm9ybShpbnB1dEVsLmZvcm0sIHtfdGFyZ2V0OiBvcHRzLl90YXJnZXQsIC4uLm1ldGF9KVxuICAgIH1cbiAgICBpZihET00uaXNVcGxvYWRJbnB1dChpbnB1dEVsKSAmJiBpbnB1dEVsLmZpbGVzICYmIGlucHV0RWwuZmlsZXMubGVuZ3RoID4gMCl7XG4gICAgICBMaXZlVXBsb2FkZXIudHJhY2tGaWxlcyhpbnB1dEVsLCBBcnJheS5mcm9tKGlucHV0RWwuZmlsZXMpKVxuICAgIH1cbiAgICB1cGxvYWRzID0gTGl2ZVVwbG9hZGVyLnNlcmlhbGl6ZVVwbG9hZHMoaW5wdXRFbClcblxuICAgIGxldCBldmVudCA9IHtcbiAgICAgIHR5cGU6IFwiZm9ybVwiLFxuICAgICAgZXZlbnQ6IHBoeEV2ZW50LFxuICAgICAgdmFsdWU6IGZvcm1EYXRhLFxuICAgICAgdXBsb2FkczogdXBsb2FkcyxcbiAgICAgIGNpZDogY2lkXG4gICAgfVxuICAgIHRoaXMucHVzaFdpdGhSZXBseShyZWZHZW5lcmF0b3IsIFwiZXZlbnRcIiwgZXZlbnQsIHJlc3AgPT4ge1xuICAgICAgRE9NLnNob3dFcnJvcihpbnB1dEVsLCB0aGlzLmxpdmVTb2NrZXQuYmluZGluZyhQSFhfRkVFREJBQ0tfRk9SKSlcbiAgICAgIGlmKERPTS5pc1VwbG9hZElucHV0KGlucHV0RWwpICYmIGlucHV0RWwuZ2V0QXR0cmlidXRlKFwiZGF0YS1waHgtYXV0by11cGxvYWRcIikgIT09IG51bGwpe1xuICAgICAgICBpZihMaXZlVXBsb2FkZXIuZmlsZXNBd2FpdGluZ1ByZWZsaWdodChpbnB1dEVsKS5sZW5ndGggPiAwKXtcbiAgICAgICAgICBsZXQgW3JlZiwgX2Vsc10gPSByZWZHZW5lcmF0b3IoKVxuICAgICAgICAgIHRoaXMudXBsb2FkRmlsZXMoaW5wdXRFbC5mb3JtLCB0YXJnZXRDdHgsIHJlZiwgY2lkLCAoX3VwbG9hZHMpID0+IHtcbiAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKHJlc3ApXG4gICAgICAgICAgICB0aGlzLnRyaWdnZXJBd2FpdGluZ1N1Ym1pdChpbnB1dEVsLmZvcm0pXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2socmVzcClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgdHJpZ2dlckF3YWl0aW5nU3VibWl0KGZvcm1FbCl7XG4gICAgbGV0IGF3YWl0aW5nU3VibWl0ID0gdGhpcy5nZXRTY2hlZHVsZWRTdWJtaXQoZm9ybUVsKVxuICAgIGlmKGF3YWl0aW5nU3VibWl0KXtcbiAgICAgIGxldCBbX2VsLCBfcmVmLCBfb3B0cywgY2FsbGJhY2tdID0gYXdhaXRpbmdTdWJtaXRcbiAgICAgIHRoaXMuY2FuY2VsU3VibWl0KGZvcm1FbClcbiAgICAgIGNhbGxiYWNrKClcbiAgICB9XG4gIH1cblxuICBnZXRTY2hlZHVsZWRTdWJtaXQoZm9ybUVsKXtcbiAgICByZXR1cm4gdGhpcy5mb3JtU3VibWl0cy5maW5kKChbZWwsIF9yZWYsIF9vcHRzLCBfY2FsbGJhY2tdKSA9PiBlbC5pc1NhbWVOb2RlKGZvcm1FbCkpXG4gIH1cblxuICBzY2hlZHVsZVN1Ym1pdChmb3JtRWwsIHJlZiwgb3B0cywgY2FsbGJhY2spe1xuICAgIGlmKHRoaXMuZ2V0U2NoZWR1bGVkU3VibWl0KGZvcm1FbCkpeyByZXR1cm4gdHJ1ZSB9XG4gICAgdGhpcy5mb3JtU3VibWl0cy5wdXNoKFtmb3JtRWwsIHJlZiwgb3B0cywgY2FsbGJhY2tdKVxuICB9XG5cbiAgY2FuY2VsU3VibWl0KGZvcm1FbCl7XG4gICAgdGhpcy5mb3JtU3VibWl0cyA9IHRoaXMuZm9ybVN1Ym1pdHMuZmlsdGVyKChbZWwsIHJlZiwgX2NhbGxiYWNrXSkgPT4ge1xuICAgICAgaWYoZWwuaXNTYW1lTm9kZShmb3JtRWwpKXtcbiAgICAgICAgdGhpcy51bmRvUmVmcyhyZWYpXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgZGlzYWJsZUZvcm0oZm9ybUVsLCBvcHRzID0ge30pe1xuICAgIGxldCBmaWx0ZXJJZ25vcmVkID0gZWwgPT4ge1xuICAgICAgbGV0IHVzZXJJZ25vcmVkID0gY2xvc2VzdFBoeEJpbmRpbmcoZWwsIGAke3RoaXMuYmluZGluZyhQSFhfVVBEQVRFKX09aWdub3JlYCwgZWwuZm9ybSlcbiAgICAgIHJldHVybiAhKHVzZXJJZ25vcmVkIHx8IGNsb3Nlc3RQaHhCaW5kaW5nKGVsLCBcImRhdGEtcGh4LXVwZGF0ZT1pZ25vcmVcIiwgZWwuZm9ybSkpXG4gICAgfVxuICAgIGxldCBmaWx0ZXJEaXNhYmxlcyA9IGVsID0+IHtcbiAgICAgIHJldHVybiBlbC5oYXNBdHRyaWJ1dGUodGhpcy5iaW5kaW5nKFBIWF9ESVNBQkxFX1dJVEgpKVxuICAgIH1cbiAgICBsZXQgZmlsdGVyQnV0dG9uID0gZWwgPT4gZWwudGFnTmFtZSA9PSBcIkJVVFRPTlwiXG5cbiAgICBsZXQgZmlsdGVySW5wdXQgPSBlbCA9PiBbXCJJTlBVVFwiLCBcIlRFWFRBUkVBXCIsIFwiU0VMRUNUXCJdLmluY2x1ZGVzKGVsLnRhZ05hbWUpXG5cbiAgICBsZXQgZm9ybUVsZW1lbnRzID0gQXJyYXkuZnJvbShmb3JtRWwuZWxlbWVudHMpXG4gICAgbGV0IGRpc2FibGVzID0gZm9ybUVsZW1lbnRzLmZpbHRlcihmaWx0ZXJEaXNhYmxlcylcbiAgICBsZXQgYnV0dG9ucyA9IGZvcm1FbGVtZW50cy5maWx0ZXIoZmlsdGVyQnV0dG9uKS5maWx0ZXIoZmlsdGVySWdub3JlZClcbiAgICBsZXQgaW5wdXRzID0gZm9ybUVsZW1lbnRzLmZpbHRlcihmaWx0ZXJJbnB1dCkuZmlsdGVyKGZpbHRlcklnbm9yZWQpXG5cbiAgICBidXR0b25zLmZvckVhY2goYnV0dG9uID0+IHtcbiAgICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoUEhYX0RJU0FCTEVELCBidXR0b24uZGlzYWJsZWQpXG4gICAgICBidXR0b24uZGlzYWJsZWQgPSB0cnVlXG4gICAgfSlcbiAgICBpbnB1dHMuZm9yRWFjaChpbnB1dCA9PiB7XG4gICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoUEhYX1JFQURPTkxZLCBpbnB1dC5yZWFkT25seSlcbiAgICAgIGlucHV0LnJlYWRPbmx5ID0gdHJ1ZVxuICAgICAgaWYoaW5wdXQuZmlsZXMpe1xuICAgICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoUEhYX0RJU0FCTEVELCBpbnB1dC5kaXNhYmxlZClcbiAgICAgICAgaW5wdXQuZGlzYWJsZWQgPSB0cnVlXG4gICAgICB9XG4gICAgfSlcbiAgICBmb3JtRWwuc2V0QXR0cmlidXRlKHRoaXMuYmluZGluZyhQSFhfUEFHRV9MT0FESU5HKSwgXCJcIilcbiAgICByZXR1cm4gdGhpcy5wdXRSZWYoW2Zvcm1FbF0uY29uY2F0KGRpc2FibGVzKS5jb25jYXQoYnV0dG9ucykuY29uY2F0KGlucHV0cyksIFwic3VibWl0XCIsIG9wdHMpXG4gIH1cblxuICBwdXNoRm9ybVN1Ym1pdChmb3JtRWwsIHRhcmdldEN0eCwgcGh4RXZlbnQsIHN1Ym1pdHRlciwgb3B0cywgb25SZXBseSl7XG4gICAgbGV0IHJlZkdlbmVyYXRvciA9ICgpID0+IHRoaXMuZGlzYWJsZUZvcm0oZm9ybUVsLCBvcHRzKVxuICAgIGxldCBjaWQgPSB0aGlzLnRhcmdldENvbXBvbmVudElEKGZvcm1FbCwgdGFyZ2V0Q3R4KVxuICAgIGlmKExpdmVVcGxvYWRlci5oYXNVcGxvYWRzSW5Qcm9ncmVzcyhmb3JtRWwpKXtcbiAgICAgIGxldCBbcmVmLCBfZWxzXSA9IHJlZkdlbmVyYXRvcigpXG4gICAgICBsZXQgcHVzaCA9ICgpID0+IHRoaXMucHVzaEZvcm1TdWJtaXQoZm9ybUVsLCBzdWJtaXR0ZXIsIHRhcmdldEN0eCwgcGh4RXZlbnQsIG9wdHMsIG9uUmVwbHkpXG4gICAgICByZXR1cm4gdGhpcy5zY2hlZHVsZVN1Ym1pdChmb3JtRWwsIHJlZiwgb3B0cywgcHVzaClcbiAgICB9IGVsc2UgaWYoTGl2ZVVwbG9hZGVyLmlucHV0c0F3YWl0aW5nUHJlZmxpZ2h0KGZvcm1FbCkubGVuZ3RoID4gMCl7XG4gICAgICBsZXQgW3JlZiwgZWxzXSA9IHJlZkdlbmVyYXRvcigpXG4gICAgICBsZXQgcHJveHlSZWZHZW4gPSAoKSA9PiBbcmVmLCBlbHMsIG9wdHNdXG4gICAgICB0aGlzLnVwbG9hZEZpbGVzKGZvcm1FbCwgdGFyZ2V0Q3R4LCByZWYsIGNpZCwgKF91cGxvYWRzKSA9PiB7XG4gICAgICAgIGxldCBtZXRhID0gdGhpcy5leHRyYWN0TWV0YShmb3JtRWwpXG4gICAgICAgIGxldCBmb3JtRGF0YSA9IHNlcmlhbGl6ZUZvcm0oZm9ybUVsLCB7c3VibWl0dGVyLCAuLi5tZXRhfSlcbiAgICAgICAgdGhpcy5wdXNoV2l0aFJlcGx5KHByb3h5UmVmR2VuLCBcImV2ZW50XCIsIHtcbiAgICAgICAgICB0eXBlOiBcImZvcm1cIixcbiAgICAgICAgICBldmVudDogcGh4RXZlbnQsXG4gICAgICAgICAgdmFsdWU6IGZvcm1EYXRhLFxuICAgICAgICAgIGNpZDogY2lkXG4gICAgICAgIH0sIG9uUmVwbHkpXG4gICAgICB9KVxuICAgIH0gZWxzZSBpZighKGZvcm1FbC5oYXNBdHRyaWJ1dGUoUEhYX1JFRikgJiYgZm9ybUVsLmNsYXNzTGlzdC5jb250YWlucyhcInBoeC1zdWJtaXQtbG9hZGluZ1wiKSkpe1xuICAgICAgbGV0IG1ldGEgPSB0aGlzLmV4dHJhY3RNZXRhKGZvcm1FbClcbiAgICAgIGxldCBmb3JtRGF0YSA9IHNlcmlhbGl6ZUZvcm0oZm9ybUVsLCB7c3VibWl0dGVyLCAuLi5tZXRhfSlcbiAgICAgIHRoaXMucHVzaFdpdGhSZXBseShyZWZHZW5lcmF0b3IsIFwiZXZlbnRcIiwge1xuICAgICAgICB0eXBlOiBcImZvcm1cIixcbiAgICAgICAgZXZlbnQ6IHBoeEV2ZW50LFxuICAgICAgICB2YWx1ZTogZm9ybURhdGEsXG4gICAgICAgIGNpZDogY2lkXG4gICAgICB9LCBvblJlcGx5KVxuICAgIH1cbiAgfVxuXG4gIHVwbG9hZEZpbGVzKGZvcm1FbCwgdGFyZ2V0Q3R4LCByZWYsIGNpZCwgb25Db21wbGV0ZSl7XG4gICAgbGV0IGpvaW5Db3VudEF0VXBsb2FkID0gdGhpcy5qb2luQ291bnRcbiAgICBsZXQgaW5wdXRFbHMgPSBMaXZlVXBsb2FkZXIuYWN0aXZlRmlsZUlucHV0cyhmb3JtRWwpXG4gICAgbGV0IG51bUZpbGVJbnB1dHNJblByb2dyZXNzID0gaW5wdXRFbHMubGVuZ3RoXG5cbiAgICAvLyBnZXQgZWFjaCBmaWxlIGlucHV0XG4gICAgaW5wdXRFbHMuZm9yRWFjaChpbnB1dEVsID0+IHtcbiAgICAgIGxldCB1cGxvYWRlciA9IG5ldyBMaXZlVXBsb2FkZXIoaW5wdXRFbCwgdGhpcywgKCkgPT4ge1xuICAgICAgICBudW1GaWxlSW5wdXRzSW5Qcm9ncmVzcy0tXG4gICAgICAgIGlmKG51bUZpbGVJbnB1dHNJblByb2dyZXNzID09PSAwKXsgb25Db21wbGV0ZSgpIH1cbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnVwbG9hZGVyc1tpbnB1dEVsXSA9IHVwbG9hZGVyXG4gICAgICBsZXQgZW50cmllcyA9IHVwbG9hZGVyLmVudHJpZXMoKS5tYXAoZW50cnkgPT4gZW50cnkudG9QcmVmbGlnaHRQYXlsb2FkKCkpXG5cbiAgICAgIGxldCBwYXlsb2FkID0ge1xuICAgICAgICByZWY6IGlucHV0RWwuZ2V0QXR0cmlidXRlKFBIWF9VUExPQURfUkVGKSxcbiAgICAgICAgZW50cmllczogZW50cmllcyxcbiAgICAgICAgY2lkOiB0aGlzLnRhcmdldENvbXBvbmVudElEKGlucHV0RWwuZm9ybSwgdGFyZ2V0Q3R4KVxuICAgICAgfVxuXG4gICAgICB0aGlzLmxvZyhcInVwbG9hZFwiLCAoKSA9PiBbXCJzZW5kaW5nIHByZWZsaWdodCByZXF1ZXN0XCIsIHBheWxvYWRdKVxuXG4gICAgICB0aGlzLnB1c2hXaXRoUmVwbHkobnVsbCwgXCJhbGxvd191cGxvYWRcIiwgcGF5bG9hZCwgcmVzcCA9PiB7XG4gICAgICAgIHRoaXMubG9nKFwidXBsb2FkXCIsICgpID0+IFtcImdvdCBwcmVmbGlnaHQgcmVzcG9uc2VcIiwgcmVzcF0pXG4gICAgICAgIGlmKHJlc3AuZXJyb3Ipe1xuICAgICAgICAgIHRoaXMudW5kb1JlZnMocmVmKVxuICAgICAgICAgIGxldCBbZW50cnlfcmVmLCByZWFzb25dID0gcmVzcC5lcnJvclxuICAgICAgICAgIHRoaXMubG9nKFwidXBsb2FkXCIsICgpID0+IFtgZXJyb3IgZm9yIGVudHJ5ICR7ZW50cnlfcmVmfWAsIHJlYXNvbl0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGV0IG9uRXJyb3IgPSAoY2FsbGJhY2spID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2hhbm5lbC5vbkVycm9yKCgpID0+IHtcbiAgICAgICAgICAgICAgaWYodGhpcy5qb2luQ291bnQgPT09IGpvaW5Db3VudEF0VXBsb2FkKXsgY2FsbGJhY2soKSB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgICB1cGxvYWRlci5pbml0QWRhcHRlclVwbG9hZChyZXNwLCBvbkVycm9yLCB0aGlzLmxpdmVTb2NrZXQpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIGRpc3BhdGNoVXBsb2FkcyhuYW1lLCBmaWxlc09yQmxvYnMpe1xuICAgIGxldCBpbnB1dHMgPSBET00uZmluZFVwbG9hZElucHV0cyh0aGlzLmVsKS5maWx0ZXIoZWwgPT4gZWwubmFtZSA9PT0gbmFtZSlcbiAgICBpZihpbnB1dHMubGVuZ3RoID09PSAwKXsgbG9nRXJyb3IoYG5vIGxpdmUgZmlsZSBpbnB1dHMgZm91bmQgbWF0Y2hpbmcgdGhlIG5hbWUgXCIke25hbWV9XCJgKSB9XG4gICAgZWxzZSBpZihpbnB1dHMubGVuZ3RoID4gMSl7IGxvZ0Vycm9yKGBkdXBsaWNhdGUgbGl2ZSBmaWxlIGlucHV0cyBmb3VuZCBtYXRjaGluZyB0aGUgbmFtZSBcIiR7bmFtZX1cImApIH1cbiAgICBlbHNlIHsgRE9NLmRpc3BhdGNoRXZlbnQoaW5wdXRzWzBdLCBQSFhfVFJBQ0tfVVBMT0FEUywge2RldGFpbDoge2ZpbGVzOiBmaWxlc09yQmxvYnN9fSkgfVxuICB9XG5cbiAgcHVzaEZvcm1SZWNvdmVyeShmb3JtLCBuZXdDaWQsIGNhbGxiYWNrKXtcbiAgICB0aGlzLmxpdmVTb2NrZXQud2l0aGluT3duZXJzKGZvcm0sICh2aWV3LCB0YXJnZXRDdHgpID0+IHtcbiAgICAgIGxldCBwaHhDaGFuZ2UgPSB0aGlzLmJpbmRpbmcoXCJjaGFuZ2VcIilcbiAgICAgIGxldCBpbnB1dHMgPSBBcnJheS5mcm9tKGZvcm0uZWxlbWVudHMpLmZpbHRlcihlbCA9PiBET00uaXNGb3JtSW5wdXQoZWwpICYmIGVsLm5hbWUgJiYgIWVsLmhhc0F0dHJpYnV0ZShwaHhDaGFuZ2UpKVxuICAgICAgaWYoaW5wdXRzLmxlbmd0aCA9PT0gMCl7IHJldHVybiB9XG5cbiAgICAgIGxldCBpbnB1dCA9IGlucHV0cy5maW5kKGVsID0+IGVsLnR5cGUgIT09IFwiaGlkZGVuXCIpIHx8IGlucHV0WzBdXG4gICAgICBsZXQgcGh4RXZlbnQgPSBmb3JtLmdldEF0dHJpYnV0ZSh0aGlzLmJpbmRpbmcoUEhYX0FVVE9fUkVDT1ZFUikpIHx8IGZvcm0uZ2V0QXR0cmlidXRlKHRoaXMuYmluZGluZyhcImNoYW5nZVwiKSlcbiAgICAgIEpTLmV4ZWMoXCJjaGFuZ2VcIiwgcGh4RXZlbnQsIHZpZXcsIGlucHV0LCBbXCJwdXNoXCIsIHtfdGFyZ2V0OiBpbnB1dC5uYW1lLCBuZXdDaWQ6IG5ld0NpZCwgY2FsbGJhY2s6IGNhbGxiYWNrfV0pXG4gICAgfSlcbiAgfVxuXG4gIHB1c2hMaW5rUGF0Y2goaHJlZiwgdGFyZ2V0RWwsIGNhbGxiYWNrKXtcbiAgICBsZXQgbGlua1JlZiA9IHRoaXMubGl2ZVNvY2tldC5zZXRQZW5kaW5nTGluayhocmVmKVxuICAgIGxldCByZWZHZW4gPSB0YXJnZXRFbCA/ICgpID0+IHRoaXMucHV0UmVmKFt0YXJnZXRFbF0sIFwiY2xpY2tcIikgOiBudWxsXG4gICAgbGV0IGZhbGxiYWNrID0gKCkgPT4gdGhpcy5saXZlU29ja2V0LnJlZGlyZWN0KHdpbmRvdy5sb2NhdGlvbi5ocmVmKVxuICAgIGxldCB1cmwgPSBocmVmLnN0YXJ0c1dpdGgoXCIvXCIpID8gYCR7bG9jYXRpb24ucHJvdG9jb2x9Ly8ke2xvY2F0aW9uLmhvc3R9JHtocmVmfWAgOiBocmVmXG5cbiAgICBsZXQgcHVzaCA9IHRoaXMucHVzaFdpdGhSZXBseShyZWZHZW4sIFwibGl2ZV9wYXRjaFwiLCB7dXJsfSwgcmVzcCA9PiB7XG4gICAgICB0aGlzLmxpdmVTb2NrZXQucmVxdWVzdERPTVVwZGF0ZSgoKSA9PiB7XG4gICAgICAgIGlmKHJlc3AubGlua19yZWRpcmVjdCl7XG4gICAgICAgICAgdGhpcy5saXZlU29ja2V0LnJlcGxhY2VNYWluKGhyZWYsIG51bGwsIGNhbGxiYWNrLCBsaW5rUmVmKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmKHRoaXMubGl2ZVNvY2tldC5jb21taXRQZW5kaW5nTGluayhsaW5rUmVmKSl7XG4gICAgICAgICAgICB0aGlzLmhyZWYgPSBocmVmXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuYXBwbHlQZW5kaW5nVXBkYXRlcygpXG4gICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2sobGlua1JlZilcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuXG4gICAgaWYocHVzaCl7XG4gICAgICBwdXNoLnJlY2VpdmUoXCJ0aW1lb3V0XCIsIGZhbGxiYWNrKVxuICAgIH0gZWxzZSB7XG4gICAgICBmYWxsYmFjaygpXG4gICAgfVxuICB9XG5cbiAgZm9ybXNGb3JSZWNvdmVyeShodG1sKXtcbiAgICBpZih0aGlzLmpvaW5Db3VudCA9PT0gMCl7IHJldHVybiBbXSB9XG5cbiAgICBsZXQgcGh4Q2hhbmdlID0gdGhpcy5iaW5kaW5nKFwiY2hhbmdlXCIpXG4gICAgbGV0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRlbXBsYXRlXCIpXG4gICAgdGVtcGxhdGUuaW5uZXJIVE1MID0gaHRtbFxuXG4gICAgcmV0dXJuIChcbiAgICAgIERPTS5hbGwodGhpcy5lbCwgYGZvcm1bJHtwaHhDaGFuZ2V9XWApXG4gICAgICAgIC5maWx0ZXIoZm9ybSA9PiBmb3JtLmlkICYmIHRoaXMub3duc0VsZW1lbnQoZm9ybSkpXG4gICAgICAgIC5maWx0ZXIoZm9ybSA9PiBmb3JtLmVsZW1lbnRzLmxlbmd0aCA+IDApXG4gICAgICAgIC5maWx0ZXIoZm9ybSA9PiBmb3JtLmdldEF0dHJpYnV0ZSh0aGlzLmJpbmRpbmcoUEhYX0FVVE9fUkVDT1ZFUikpICE9PSBcImlnbm9yZVwiKVxuICAgICAgICAubWFwKGZvcm0gPT4ge1xuICAgICAgICAgIGxldCBuZXdGb3JtID0gdGVtcGxhdGUuY29udGVudC5xdWVyeVNlbGVjdG9yKGBmb3JtW2lkPVwiJHtmb3JtLmlkfVwiXVske3BoeENoYW5nZX09XCIke2Zvcm0uZ2V0QXR0cmlidXRlKHBoeENoYW5nZSl9XCJdYClcbiAgICAgICAgICBpZihuZXdGb3JtKXtcbiAgICAgICAgICAgIHJldHVybiBbZm9ybSwgbmV3Rm9ybSwgdGhpcy50YXJnZXRDb21wb25lbnRJRChuZXdGb3JtKV1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFtmb3JtLCBmb3JtLCB0aGlzLnRhcmdldENvbXBvbmVudElEKGZvcm0pXVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmZpbHRlcigoW2Zvcm0sIG5ld0Zvcm0sIG5ld0NpZF0pID0+IG5ld0Zvcm0pXG4gICAgKVxuICB9XG5cbiAgbWF5YmVQdXNoQ29tcG9uZW50c0Rlc3Ryb3llZChkZXN0cm95ZWRDSURzKXtcbiAgICBsZXQgd2lsbERlc3Ryb3lDSURzID0gZGVzdHJveWVkQ0lEcy5maWx0ZXIoY2lkID0+IHtcbiAgICAgIHJldHVybiBET00uZmluZENvbXBvbmVudE5vZGVMaXN0KHRoaXMuZWwsIGNpZCkubGVuZ3RoID09PSAwXG4gICAgfSlcbiAgICBpZih3aWxsRGVzdHJveUNJRHMubGVuZ3RoID4gMCl7XG4gICAgICB0aGlzLnBydW5pbmdDSURzLnB1c2goLi4ud2lsbERlc3Ryb3lDSURzKVxuXG4gICAgICB0aGlzLnB1c2hXaXRoUmVwbHkobnVsbCwgXCJjaWRzX3dpbGxfZGVzdHJveVwiLCB7Y2lkczogd2lsbERlc3Ryb3lDSURzfSwgKCkgPT4ge1xuICAgICAgICAvLyBUaGUgY2lkcyBhcmUgZWl0aGVyIGJhY2sgb24gdGhlIHBhZ2Ugb3IgdGhleSB3aWxsIGJlIGZ1bGx5IHJlbW92ZWQsXG4gICAgICAgIC8vIHNvIHdlIGNhbiByZW1vdmUgdGhlbSBmcm9tIHRoZSBwcnVuaW5nQ0lEcy5cbiAgICAgICAgdGhpcy5wcnVuaW5nQ0lEcyA9IHRoaXMucHJ1bmluZ0NJRHMuZmlsdGVyKGNpZCA9PiB3aWxsRGVzdHJveUNJRHMuaW5kZXhPZihjaWQpICE9PSAtMSlcblxuICAgICAgICAvLyBTZWUgaWYgYW55IG9mIHRoZSBjaWRzIHdlIHdhbnRlZCB0byBkZXN0cm95IHdlcmUgYWRkZWQgYmFjayxcbiAgICAgICAgLy8gaWYgdGhleSB3ZXJlIGFkZGVkIGJhY2ssIHdlIGRvbid0IGFjdHVhbGx5IGRlc3Ryb3kgdGhlbS5cbiAgICAgICAgbGV0IGNvbXBsZXRlbHlEZXN0cm95Q0lEcyA9IHdpbGxEZXN0cm95Q0lEcy5maWx0ZXIoY2lkID0+IHtcbiAgICAgICAgICByZXR1cm4gRE9NLmZpbmRDb21wb25lbnROb2RlTGlzdCh0aGlzLmVsLCBjaWQpLmxlbmd0aCA9PT0gMFxuICAgICAgICB9KVxuXG4gICAgICAgIGlmKGNvbXBsZXRlbHlEZXN0cm95Q0lEcy5sZW5ndGggPiAwKXtcbiAgICAgICAgICB0aGlzLnB1c2hXaXRoUmVwbHkobnVsbCwgXCJjaWRzX2Rlc3Ryb3llZFwiLCB7Y2lkczogY29tcGxldGVseURlc3Ryb3lDSURzfSwgKHJlc3ApID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZWQucHJ1bmVDSURzKHJlc3AuY2lkcylcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIG93bnNFbGVtZW50KGVsKXtcbiAgICBsZXQgcGFyZW50Vmlld0VsID0gZWwuY2xvc2VzdChQSFhfVklFV19TRUxFQ1RPUilcbiAgICByZXR1cm4gZWwuZ2V0QXR0cmlidXRlKFBIWF9QQVJFTlRfSUQpID09PSB0aGlzLmlkIHx8XG4gICAgICAocGFyZW50Vmlld0VsICYmIHBhcmVudFZpZXdFbC5pZCA9PT0gdGhpcy5pZCkgfHxcbiAgICAgICghcGFyZW50Vmlld0VsICYmIHRoaXMuaXNEZWFkKVxuICB9XG5cbiAgc3VibWl0Rm9ybShmb3JtLCB0YXJnZXRDdHgsIHBoeEV2ZW50LCBzdWJtaXR0ZXIsIG9wdHMgPSB7fSl7XG4gICAgRE9NLnB1dFByaXZhdGUoZm9ybSwgUEhYX0hBU19TVUJNSVRURUQsIHRydWUpXG4gICAgbGV0IHBoeEZlZWRiYWNrID0gdGhpcy5saXZlU29ja2V0LmJpbmRpbmcoUEhYX0ZFRURCQUNLX0ZPUilcbiAgICBsZXQgaW5wdXRzID0gQXJyYXkuZnJvbShmb3JtLmVsZW1lbnRzKVxuICAgIGlucHV0cy5mb3JFYWNoKGlucHV0ID0+IERPTS5wdXRQcml2YXRlKGlucHV0LCBQSFhfSEFTX1NVQk1JVFRFRCwgdHJ1ZSkpXG4gICAgdGhpcy5saXZlU29ja2V0LmJsdXJBY3RpdmVFbGVtZW50KHRoaXMpXG4gICAgdGhpcy5wdXNoRm9ybVN1Ym1pdChmb3JtLCB0YXJnZXRDdHgsIHBoeEV2ZW50LCBzdWJtaXR0ZXIsIG9wdHMsICgpID0+IHtcbiAgICAgIGlucHV0cy5mb3JFYWNoKGlucHV0ID0+IERPTS5zaG93RXJyb3IoaW5wdXQsIHBoeEZlZWRiYWNrKSlcbiAgICAgIHRoaXMubGl2ZVNvY2tldC5yZXN0b3JlUHJldmlvdXNseUFjdGl2ZUZvY3VzKClcbiAgICB9KVxuICB9XG5cbiAgYmluZGluZyhraW5kKXsgcmV0dXJuIHRoaXMubGl2ZVNvY2tldC5iaW5kaW5nKGtpbmQpIH1cbn1cbiIsICIvKiogSW5pdGlhbGl6ZXMgdGhlIExpdmVTb2NrZXRcbiAqXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGVuZFBvaW50IC0gVGhlIHN0cmluZyBXZWJTb2NrZXQgZW5kcG9pbnQsIGllLCBgXCJ3c3M6Ly9leGFtcGxlLmNvbS9saXZlXCJgLFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBcIi9saXZlXCJgIChpbmhlcml0ZWQgaG9zdCAmIHByb3RvY29sKVxuICogQHBhcmFtIHtQaG9lbml4LlNvY2tldH0gc29ja2V0IC0gdGhlIHJlcXVpcmVkIFBob2VuaXggU29ja2V0IGNsYXNzIGltcG9ydGVkIGZyb20gXCJwaG9lbml4XCIuIEZvciBleGFtcGxlOlxuICpcbiAqICAgICBpbXBvcnQge1NvY2tldH0gZnJvbSBcInBob2VuaXhcIlxuICogICAgIGltcG9ydCB7TGl2ZVNvY2tldH0gZnJvbSBcInBob2VuaXhfbGl2ZV92aWV3XCJcbiAqICAgICBsZXQgbGl2ZVNvY2tldCA9IG5ldyBMaXZlU29ja2V0KFwiL2xpdmVcIiwgU29ja2V0LCB7Li4ufSlcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdHNdIC0gT3B0aW9uYWwgY29uZmlndXJhdGlvbi4gT3V0c2lkZSBvZiBrZXlzIGxpc3RlZCBiZWxvdywgYWxsXG4gKiBjb25maWd1cmF0aW9uIGlzIHBhc3NlZCBkaXJlY3RseSB0byB0aGUgUGhvZW5peCBTb2NrZXQgY29uc3RydWN0b3IuXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdHMuZGVmYXVsdHNdIC0gVGhlIG9wdGlvbmFsIGRlZmF1bHRzIHRvIHVzZSBmb3IgdmFyaW91cyBiaW5kaW5ncyxcbiAqIHN1Y2ggYXMgYHBoeC1kZWJvdW5jZWAuIFN1cHBvcnRzIHRoZSBmb2xsb3dpbmcga2V5czpcbiAqXG4gKiAgIC0gZGVib3VuY2UgLSB0aGUgbWlsbGlzZWNvbmQgcGh4LWRlYm91bmNlIHRpbWUuIERlZmF1bHRzIDMwMFxuICogICAtIHRocm90dGxlIC0gdGhlIG1pbGxpc2Vjb25kIHBoeC10aHJvdHRsZSB0aW1lLiBEZWZhdWx0cyAzMDBcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0cy5wYXJhbXNdIC0gVGhlIG9wdGlvbmFsIGZ1bmN0aW9uIGZvciBwYXNzaW5nIGNvbm5lY3QgcGFyYW1zLlxuICogVGhlIGZ1bmN0aW9uIHJlY2VpdmVzIHRoZSBlbGVtZW50IGFzc29jaWF0ZWQgd2l0aCBhIGdpdmVuIExpdmVWaWV3LiBGb3IgZXhhbXBsZTpcbiAqXG4gKiAgICAgKGVsKSA9PiB7dmlldzogZWwuZ2V0QXR0cmlidXRlKFwiZGF0YS1teS12aWV3LW5hbWVcIiwgdG9rZW46IHdpbmRvdy5teVRva2VufVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0cy5iaW5kaW5nUHJlZml4XSAtIFRoZSBvcHRpb25hbCBwcmVmaXggdG8gdXNlIGZvciBhbGwgcGh4IERPTSBhbm5vdGF0aW9ucy5cbiAqIERlZmF1bHRzIHRvIFwicGh4LVwiLlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRzLmhvb2tzXSAtIFRoZSBvcHRpb25hbCBvYmplY3QgZm9yIHJlZmVyZW5jaW5nIExpdmVWaWV3IGhvb2sgY2FsbGJhY2tzLlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRzLnVwbG9hZGVyc10gLSBUaGUgb3B0aW9uYWwgb2JqZWN0IGZvciByZWZlcmVuY2luZyBMaXZlVmlldyB1cGxvYWRlciBjYWxsYmFja3MuXG4gKiBAcGFyYW0ge2ludGVnZXJ9IFtvcHRzLmxvYWRlclRpbWVvdXRdIC0gVGhlIG9wdGlvbmFsIGRlbGF5IGluIG1pbGxpc2Vjb25kcyB0byB3YWl0IGJlZm9yZSBhcHBseVxuICogbG9hZGluZyBzdGF0ZXMuXG4gKiBAcGFyYW0ge2ludGVnZXJ9IFtvcHRzLm1heFJlbG9hZHNdIC0gVGhlIG1heGltdW0gcmVsb2FkcyBiZWZvcmUgZW50ZXJpbmcgZmFpbHNhZmUgbW9kZS5cbiAqIEBwYXJhbSB7aW50ZWdlcn0gW29wdHMucmVsb2FkSml0dGVyTWluXSAtIFRoZSBtaW5pbXVtIHRpbWUgYmV0d2VlbiBub3JtYWwgcmVsb2FkIGF0dGVtcHRzLlxuICogQHBhcmFtIHtpbnRlZ2VyfSBbb3B0cy5yZWxvYWRKaXR0ZXJNYXhdIC0gVGhlIG1heGltdW0gdGltZSBiZXR3ZWVuIG5vcm1hbCByZWxvYWQgYXR0ZW1wdHMuXG4gKiBAcGFyYW0ge2ludGVnZXJ9IFtvcHRzLmZhaWxzYWZlSml0dGVyXSAtIFRoZSB0aW1lIGJldHdlZW4gcmVsb2FkIGF0dGVtcHRzIGluIGZhaWxzYWZlIG1vZGUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0cy52aWV3TG9nZ2VyXSAtIFRoZSBvcHRpb25hbCBmdW5jdGlvbiB0byBsb2cgZGVidWcgaW5mb3JtYXRpb24uIEZvciBleGFtcGxlOlxuICpcbiAqICAgICAodmlldywga2luZCwgbXNnLCBvYmopID0+IGNvbnNvbGUubG9nKGAke3ZpZXcuaWR9ICR7a2luZH06ICR7bXNnfSAtIGAsIG9iailcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdHMubWV0YWRhdGFdIC0gVGhlIG9wdGlvbmFsIG9iamVjdCBtYXBwaW5nIGV2ZW50IG5hbWVzIHRvIGZ1bmN0aW9ucyBmb3JcbiAqIHBvcHVsYXRpbmcgZXZlbnQgbWV0YWRhdGEuIEZvciBleGFtcGxlOlxuICpcbiAqICAgICBtZXRhZGF0YToge1xuICogICAgICAgY2xpY2s6IChlLCBlbCkgPT4ge1xuICogICAgICAgICByZXR1cm4ge1xuICogICAgICAgICAgIGN0cmxLZXk6IGUuY3RybEtleSxcbiAqICAgICAgICAgICBtZXRhS2V5OiBlLm1ldGFLZXksXG4gKiAgICAgICAgICAgZGV0YWlsOiBlLmRldGFpbCB8fCAxLFxuICogICAgICAgICB9XG4gKiAgICAgICB9LFxuICogICAgICAga2V5ZG93bjogKGUsIGVsKSA9PiB7XG4gKiAgICAgICAgIHJldHVybiB7XG4gKiAgICAgICAgICAga2V5OiBlLmtleSxcbiAqICAgICAgICAgICBjdHJsS2V5OiBlLmN0cmxLZXksXG4gKiAgICAgICAgICAgbWV0YUtleTogZS5tZXRhS2V5LFxuICogICAgICAgICAgIHNoaWZ0S2V5OiBlLnNoaWZ0S2V5XG4gKiAgICAgICAgIH1cbiAqICAgICAgIH1cbiAqICAgICB9XG4gKiBAcGFyYW0ge09iamVjdH0gW29wdHMuc2Vzc2lvblN0b3JhZ2VdIC0gQW4gb3B0aW9uYWwgU3RvcmFnZSBjb21wYXRpYmxlIG9iamVjdFxuICogVXNlZnVsIHdoZW4gTGl2ZVZpZXcgd29uJ3QgaGF2ZSBhY2Nlc3MgdG8gYHNlc3Npb25TdG9yYWdlYC4gIEZvciBleGFtcGxlLCBUaGlzIGNvdWxkXG4gKiBoYXBwZW4gaWYgYSBzaXRlIGxvYWRzIGEgY3Jvc3MtZG9tYWluIExpdmVWaWV3IGluIGFuIGlmcmFtZS4gIEV4YW1wbGUgdXNhZ2U6XG4gKlxuICogICAgIGNsYXNzIEluTWVtb3J5U3RvcmFnZSB7XG4gKiAgICAgICBjb25zdHJ1Y3RvcigpIHsgdGhpcy5zdG9yYWdlID0ge30gfVxuICogICAgICAgZ2V0SXRlbShrZXlOYW1lKSB7IHJldHVybiB0aGlzLnN0b3JhZ2Vba2V5TmFtZV0gfHwgbnVsbCB9XG4gKiAgICAgICByZW1vdmVJdGVtKGtleU5hbWUpIHsgZGVsZXRlIHRoaXMuc3RvcmFnZVtrZXlOYW1lXSB9XG4gKiAgICAgICBzZXRJdGVtKGtleU5hbWUsIGtleVZhbHVlKSB7IHRoaXMuc3RvcmFnZVtrZXlOYW1lXSA9IGtleVZhbHVlIH1cbiAqICAgICB9XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRzLmxvY2FsU3RvcmFnZV0gLSBBbiBvcHRpb25hbCBTdG9yYWdlIGNvbXBhdGlibGUgb2JqZWN0XG4gKiBVc2VmdWwgZm9yIHdoZW4gTGl2ZVZpZXcgd29uJ3QgaGF2ZSBhY2Nlc3MgdG8gYGxvY2FsU3RvcmFnZWAuXG4gKiBTZWUgYG9wdHMuc2Vzc2lvblN0b3JhZ2VgIGZvciBleGFtcGxlcy5cbiovXG5cbmltcG9ydCB7XG4gIEJJTkRJTkdfUFJFRklYLFxuICBDT05TRUNVVElWRV9SRUxPQURTLFxuICBERUZBVUxUUyxcbiAgRkFJTFNBRkVfSklUVEVSLFxuICBMT0FERVJfVElNRU9VVCxcbiAgTUFYX1JFTE9BRFMsXG4gIFBIWF9ERUJPVU5DRSxcbiAgUEhYX0RST1BfVEFSR0VULFxuICBQSFhfSEFTX0ZPQ1VTRUQsXG4gIFBIWF9LRVksXG4gIFBIWF9MSU5LX1NUQVRFLFxuICBQSFhfTElWRV9MSU5LLFxuICBQSFhfTFZfREVCVUcsXG4gIFBIWF9MVl9MQVRFTkNZX1NJTSxcbiAgUEhYX0xWX1BST0ZJTEUsXG4gIFBIWF9NQUlOLFxuICBQSFhfUEFSRU5UX0lELFxuICBQSFhfVklFV19TRUxFQ1RPUixcbiAgUEhYX1JPT1RfSUQsXG4gIFBIWF9USFJPVFRMRSxcbiAgUEhYX1RSQUNLX1VQTE9BRFMsXG4gIFBIWF9TRVNTSU9OLFxuICBQSFhfRkVFREJBQ0tfRk9SLFxuICBSRUxPQURfSklUVEVSX01JTixcbiAgUkVMT0FEX0pJVFRFUl9NQVgsXG4gIFBIWF9SRUYsXG59IGZyb20gXCIuL2NvbnN0YW50c1wiXG5cbmltcG9ydCB7XG4gIGNsb25lLFxuICBjbG9zZXN0UGh4QmluZGluZyxcbiAgY2xvc3VyZSxcbiAgZGVidWcsXG4gIGlzT2JqZWN0LFxuICBtYXliZVxufSBmcm9tIFwiLi91dGlsc1wiXG5cbmltcG9ydCBCcm93c2VyIGZyb20gXCIuL2Jyb3dzZXJcIlxuaW1wb3J0IERPTSBmcm9tIFwiLi9kb21cIlxuaW1wb3J0IEhvb2tzIGZyb20gXCIuL2hvb2tzXCJcbmltcG9ydCBMaXZlVXBsb2FkZXIgZnJvbSBcIi4vbGl2ZV91cGxvYWRlclwiXG5pbXBvcnQgVmlldyBmcm9tIFwiLi92aWV3XCJcbmltcG9ydCBKUyBmcm9tIFwiLi9qc1wiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpdmVTb2NrZXQge1xuICBjb25zdHJ1Y3Rvcih1cmwsIHBoeFNvY2tldCwgb3B0cyA9IHt9KXtcbiAgICB0aGlzLnVubG9hZGVkID0gZmFsc2VcbiAgICBpZighcGh4U29ja2V0IHx8IHBoeFNvY2tldC5jb25zdHJ1Y3Rvci5uYW1lID09PSBcIk9iamVjdFwiKXtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgXG4gICAgICBhIHBob2VuaXggU29ja2V0IG11c3QgYmUgcHJvdmlkZWQgYXMgdGhlIHNlY29uZCBhcmd1bWVudCB0byB0aGUgTGl2ZVNvY2tldCBjb25zdHJ1Y3Rvci4gRm9yIGV4YW1wbGU6XG5cbiAgICAgICAgICBpbXBvcnQge1NvY2tldH0gZnJvbSBcInBob2VuaXhcIlxuICAgICAgICAgIGltcG9ydCB7TGl2ZVNvY2tldH0gZnJvbSBcInBob2VuaXhfbGl2ZV92aWV3XCJcbiAgICAgICAgICBsZXQgbGl2ZVNvY2tldCA9IG5ldyBMaXZlU29ja2V0KFwiL2xpdmVcIiwgU29ja2V0LCB7Li4ufSlcbiAgICAgIGApXG4gICAgfVxuICAgIHRoaXMuc29ja2V0ID0gbmV3IHBoeFNvY2tldCh1cmwsIG9wdHMpXG4gICAgdGhpcy5iaW5kaW5nUHJlZml4ID0gb3B0cy5iaW5kaW5nUHJlZml4IHx8IEJJTkRJTkdfUFJFRklYXG4gICAgdGhpcy5vcHRzID0gb3B0c1xuICAgIHRoaXMucGFyYW1zID0gY2xvc3VyZShvcHRzLnBhcmFtcyB8fCB7fSlcbiAgICB0aGlzLnZpZXdMb2dnZXIgPSBvcHRzLnZpZXdMb2dnZXJcbiAgICB0aGlzLm1ldGFkYXRhQ2FsbGJhY2tzID0gb3B0cy5tZXRhZGF0YSB8fCB7fVxuICAgIHRoaXMuZGVmYXVsdHMgPSBPYmplY3QuYXNzaWduKGNsb25lKERFRkFVTFRTKSwgb3B0cy5kZWZhdWx0cyB8fCB7fSlcbiAgICB0aGlzLmFjdGl2ZUVsZW1lbnQgPSBudWxsXG4gICAgdGhpcy5wcmV2QWN0aXZlID0gbnVsbFxuICAgIHRoaXMuc2lsZW5jZWQgPSBmYWxzZVxuICAgIHRoaXMubWFpbiA9IG51bGxcbiAgICB0aGlzLm91dGdvaW5nTWFpbkVsID0gbnVsbFxuICAgIHRoaXMuY2xpY2tTdGFydGVkQXRUYXJnZXQgPSBudWxsXG4gICAgdGhpcy5saW5rUmVmID0gMVxuICAgIHRoaXMucm9vdHMgPSB7fVxuICAgIHRoaXMuaHJlZiA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmXG4gICAgdGhpcy5wZW5kaW5nTGluayA9IG51bGxcbiAgICB0aGlzLmN1cnJlbnRMb2NhdGlvbiA9IGNsb25lKHdpbmRvdy5sb2NhdGlvbilcbiAgICB0aGlzLmhvb2tzID0gb3B0cy5ob29rcyB8fCB7fVxuICAgIHRoaXMudXBsb2FkZXJzID0gb3B0cy51cGxvYWRlcnMgfHwge31cbiAgICB0aGlzLmxvYWRlclRpbWVvdXQgPSBvcHRzLmxvYWRlclRpbWVvdXQgfHwgTE9BREVSX1RJTUVPVVRcbiAgICB0aGlzLnJlbG9hZFdpdGhKaXR0ZXJUaW1lciA9IG51bGxcbiAgICB0aGlzLm1heFJlbG9hZHMgPSBvcHRzLm1heFJlbG9hZHMgfHwgTUFYX1JFTE9BRFNcbiAgICB0aGlzLnJlbG9hZEppdHRlck1pbiA9IG9wdHMucmVsb2FkSml0dGVyTWluIHx8IFJFTE9BRF9KSVRURVJfTUlOXG4gICAgdGhpcy5yZWxvYWRKaXR0ZXJNYXggPSBvcHRzLnJlbG9hZEppdHRlck1heCB8fCBSRUxPQURfSklUVEVSX01BWFxuICAgIHRoaXMuZmFpbHNhZmVKaXR0ZXIgPSBvcHRzLmZhaWxzYWZlSml0dGVyIHx8IEZBSUxTQUZFX0pJVFRFUlxuICAgIHRoaXMubG9jYWxTdG9yYWdlID0gb3B0cy5sb2NhbFN0b3JhZ2UgfHwgd2luZG93LmxvY2FsU3RvcmFnZVxuICAgIHRoaXMuc2Vzc2lvblN0b3JhZ2UgPSBvcHRzLnNlc3Npb25TdG9yYWdlIHx8IHdpbmRvdy5zZXNzaW9uU3RvcmFnZVxuICAgIHRoaXMuYm91bmRUb3BMZXZlbEV2ZW50cyA9IGZhbHNlXG4gICAgdGhpcy5kb21DYWxsYmFja3MgPSBPYmplY3QuYXNzaWduKHtvbk5vZGVBZGRlZDogY2xvc3VyZSgpLCBvbkJlZm9yZUVsVXBkYXRlZDogY2xvc3VyZSgpfSwgb3B0cy5kb20gfHwge30pXG4gICAgdGhpcy50cmFuc2l0aW9ucyA9IG5ldyBUcmFuc2l0aW9uU2V0KClcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBhZ2VoaWRlXCIsIF9lID0+IHtcbiAgICAgIHRoaXMudW5sb2FkZWQgPSB0cnVlXG4gICAgfSlcbiAgICB0aGlzLnNvY2tldC5vbk9wZW4oKCkgPT4ge1xuICAgICAgaWYodGhpcy5pc1VubG9hZGVkKCkpe1xuICAgICAgICAvLyByZWxvYWQgcGFnZSBpZiBiZWluZyByZXN0b3JlZCBmcm9tIGJhY2svZm9yd2FyZCBjYWNoZSBhbmQgYnJvd3NlciBkb2VzIG5vdCBlbWl0IFwicGFnZXNob3dcIlxuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgLy8gcHVibGljXG5cbiAgaXNQcm9maWxlRW5hYmxlZCgpeyByZXR1cm4gdGhpcy5zZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFBIWF9MVl9QUk9GSUxFKSA9PT0gXCJ0cnVlXCIgfVxuXG4gIGlzRGVidWdFbmFibGVkKCl7IHJldHVybiB0aGlzLnNlc3Npb25TdG9yYWdlLmdldEl0ZW0oUEhYX0xWX0RFQlVHKSA9PT0gXCJ0cnVlXCIgfVxuXG4gIGlzRGVidWdEaXNhYmxlZCgpeyByZXR1cm4gdGhpcy5zZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFBIWF9MVl9ERUJVRykgPT09IFwiZmFsc2VcIiB9XG5cbiAgZW5hYmxlRGVidWcoKXsgdGhpcy5zZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFBIWF9MVl9ERUJVRywgXCJ0cnVlXCIpIH1cblxuICBlbmFibGVQcm9maWxpbmcoKXsgdGhpcy5zZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFBIWF9MVl9QUk9GSUxFLCBcInRydWVcIikgfVxuXG4gIGRpc2FibGVEZWJ1ZygpeyB0aGlzLnNlc3Npb25TdG9yYWdlLnNldEl0ZW0oUEhYX0xWX0RFQlVHLCBcImZhbHNlXCIpIH1cblxuICBkaXNhYmxlUHJvZmlsaW5nKCl7IHRoaXMuc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShQSFhfTFZfUFJPRklMRSkgfVxuXG4gIGVuYWJsZUxhdGVuY3lTaW0odXBwZXJCb3VuZE1zKXtcbiAgICB0aGlzLmVuYWJsZURlYnVnKClcbiAgICBjb25zb2xlLmxvZyhcImxhdGVuY3kgc2ltdWxhdG9yIGVuYWJsZWQgZm9yIHRoZSBkdXJhdGlvbiBvZiB0aGlzIGJyb3dzZXIgc2Vzc2lvbi4gQ2FsbCBkaXNhYmxlTGF0ZW5jeVNpbSgpIHRvIGRpc2FibGVcIilcbiAgICB0aGlzLnNlc3Npb25TdG9yYWdlLnNldEl0ZW0oUEhYX0xWX0xBVEVOQ1lfU0lNLCB1cHBlckJvdW5kTXMpXG4gIH1cblxuICBkaXNhYmxlTGF0ZW5jeVNpbSgpeyB0aGlzLnNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oUEhYX0xWX0xBVEVOQ1lfU0lNKSB9XG5cbiAgZ2V0TGF0ZW5jeVNpbSgpe1xuICAgIGxldCBzdHIgPSB0aGlzLnNlc3Npb25TdG9yYWdlLmdldEl0ZW0oUEhYX0xWX0xBVEVOQ1lfU0lNKVxuICAgIHJldHVybiBzdHIgPyBwYXJzZUludChzdHIpIDogbnVsbFxuICB9XG5cbiAgZ2V0U29ja2V0KCl7IHJldHVybiB0aGlzLnNvY2tldCB9XG5cbiAgY29ubmVjdCgpe1xuICAgIC8vIGVuYWJsZSBkZWJ1ZyBieSBkZWZhdWx0IGlmIG9uIGxvY2FsaG9zdCBhbmQgbm90IGV4cGxpY2l0bHkgZGlzYWJsZWRcbiAgICBpZih3aW5kb3cubG9jYXRpb24uaG9zdG5hbWUgPT09IFwibG9jYWxob3N0XCIgJiYgIXRoaXMuaXNEZWJ1Z0Rpc2FibGVkKCkpeyB0aGlzLmVuYWJsZURlYnVnKCkgfVxuICAgIGxldCBkb0Nvbm5lY3QgPSAoKSA9PiB7XG4gICAgICBpZih0aGlzLmpvaW5Sb290Vmlld3MoKSl7XG4gICAgICAgIHRoaXMuYmluZFRvcExldmVsRXZlbnRzKClcbiAgICAgICAgdGhpcy5zb2NrZXQuY29ubmVjdCgpXG4gICAgICB9IGVsc2UgaWYodGhpcy5tYWluKXtcbiAgICAgICAgdGhpcy5zb2NrZXQuY29ubmVjdCgpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmJpbmRUb3BMZXZlbEV2ZW50cyh7ZGVhZDogdHJ1ZX0pXG4gICAgICB9XG4gICAgICB0aGlzLmpvaW5EZWFkVmlldygpXG4gICAgfVxuICAgIGlmKFtcImNvbXBsZXRlXCIsIFwibG9hZGVkXCIsIFwiaW50ZXJhY3RpdmVcIl0uaW5kZXhPZihkb2N1bWVudC5yZWFkeVN0YXRlKSA+PSAwKXtcbiAgICAgIGRvQ29ubmVjdCgpXG4gICAgfSBlbHNlIHtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IGRvQ29ubmVjdCgpKVxuICAgIH1cbiAgfVxuXG4gIGRpc2Nvbm5lY3QoY2FsbGJhY2spe1xuICAgIGNsZWFyVGltZW91dCh0aGlzLnJlbG9hZFdpdGhKaXR0ZXJUaW1lcilcbiAgICB0aGlzLnNvY2tldC5kaXNjb25uZWN0KGNhbGxiYWNrKVxuICB9XG5cbiAgcmVwbGFjZVRyYW5zcG9ydCh0cmFuc3BvcnQpe1xuICAgIGNsZWFyVGltZW91dCh0aGlzLnJlbG9hZFdpdGhKaXR0ZXJUaW1lcilcbiAgICB0aGlzLnNvY2tldC5yZXBsYWNlVHJhbnNwb3J0KHRyYW5zcG9ydClcbiAgICB0aGlzLmNvbm5lY3QoKVxuICB9XG5cbiAgZXhlY0pTKGVsLCBlbmNvZGVkSlMsIGV2ZW50VHlwZSA9IG51bGwpe1xuICAgIHRoaXMub3duZXIoZWwsIHZpZXcgPT4gSlMuZXhlYyhldmVudFR5cGUsIGVuY29kZWRKUywgdmlldywgZWwpKVxuICB9XG5cbiAgLy8gcHJpdmF0ZVxuXG4gIGV4ZWNKU0hvb2tQdXNoKGVsLCBwaHhFdmVudCwgZGF0YSwgY2FsbGJhY2spe1xuICAgIHRoaXMud2l0aGluT3duZXJzKGVsLCB2aWV3ID0+IHtcbiAgICAgIEpTLmV4ZWMoXCJob29rXCIsIHBoeEV2ZW50LCB2aWV3LCBlbCwgW1wicHVzaFwiLCB7ZGF0YSwgY2FsbGJhY2t9XSlcbiAgICB9KVxuICB9XG5cbiAgdW5sb2FkKCl7XG4gICAgaWYodGhpcy51bmxvYWRlZCl7IHJldHVybiB9XG4gICAgaWYodGhpcy5tYWluICYmIHRoaXMuaXNDb25uZWN0ZWQoKSl7IHRoaXMubG9nKHRoaXMubWFpbiwgXCJzb2NrZXRcIiwgKCkgPT4gW1wiZGlzY29ubmVjdCBmb3IgcGFnZSBuYXZcIl0pIH1cbiAgICB0aGlzLnVubG9hZGVkID0gdHJ1ZVxuICAgIHRoaXMuZGVzdHJveUFsbFZpZXdzKClcbiAgICB0aGlzLmRpc2Nvbm5lY3QoKVxuICB9XG5cbiAgdHJpZ2dlckRPTShraW5kLCBhcmdzKXsgdGhpcy5kb21DYWxsYmFja3Nba2luZF0oLi4uYXJncykgfVxuXG4gIHRpbWUobmFtZSwgZnVuYyl7XG4gICAgaWYoIXRoaXMuaXNQcm9maWxlRW5hYmxlZCgpIHx8ICFjb25zb2xlLnRpbWUpeyByZXR1cm4gZnVuYygpIH1cbiAgICBjb25zb2xlLnRpbWUobmFtZSlcbiAgICBsZXQgcmVzdWx0ID0gZnVuYygpXG4gICAgY29uc29sZS50aW1lRW5kKG5hbWUpXG4gICAgcmV0dXJuIHJlc3VsdFxuICB9XG5cbiAgbG9nKHZpZXcsIGtpbmQsIG1zZ0NhbGxiYWNrKXtcbiAgICBpZih0aGlzLnZpZXdMb2dnZXIpe1xuICAgICAgbGV0IFttc2csIG9ial0gPSBtc2dDYWxsYmFjaygpXG4gICAgICB0aGlzLnZpZXdMb2dnZXIodmlldywga2luZCwgbXNnLCBvYmopXG4gICAgfSBlbHNlIGlmKHRoaXMuaXNEZWJ1Z0VuYWJsZWQoKSl7XG4gICAgICBsZXQgW21zZywgb2JqXSA9IG1zZ0NhbGxiYWNrKClcbiAgICAgIGRlYnVnKHZpZXcsIGtpbmQsIG1zZywgb2JqKVxuICAgIH1cbiAgfVxuXG4gIHJlcXVlc3RET01VcGRhdGUoY2FsbGJhY2spe1xuICAgIHRoaXMudHJhbnNpdGlvbnMuYWZ0ZXIoY2FsbGJhY2spXG4gIH1cblxuICB0cmFuc2l0aW9uKHRpbWUsIG9uU3RhcnQsIG9uRG9uZSA9IGZ1bmN0aW9uKCl7fSl7XG4gICAgdGhpcy50cmFuc2l0aW9ucy5hZGRUcmFuc2l0aW9uKHRpbWUsIG9uU3RhcnQsIG9uRG9uZSlcbiAgfVxuXG4gIG9uQ2hhbm5lbChjaGFubmVsLCBldmVudCwgY2Ipe1xuICAgIGNoYW5uZWwub24oZXZlbnQsIGRhdGEgPT4ge1xuICAgICAgbGV0IGxhdGVuY3kgPSB0aGlzLmdldExhdGVuY3lTaW0oKVxuICAgICAgaWYoIWxhdGVuY3kpe1xuICAgICAgICBjYihkYXRhKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiBjYihkYXRhKSwgbGF0ZW5jeSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgd3JhcFB1c2godmlldywgb3B0cywgcHVzaCl7XG4gICAgbGV0IGxhdGVuY3kgPSB0aGlzLmdldExhdGVuY3lTaW0oKVxuICAgIGxldCBvbGRKb2luQ291bnQgPSB2aWV3LmpvaW5Db3VudFxuICAgIGlmKCFsYXRlbmN5KXtcbiAgICAgIGlmKHRoaXMuaXNDb25uZWN0ZWQoKSAmJiBvcHRzLnRpbWVvdXQpe1xuICAgICAgICByZXR1cm4gcHVzaCgpLnJlY2VpdmUoXCJ0aW1lb3V0XCIsICgpID0+IHtcbiAgICAgICAgICBpZih2aWV3LmpvaW5Db3VudCA9PT0gb2xkSm9pbkNvdW50ICYmICF2aWV3LmlzRGVzdHJveWVkKCkpe1xuICAgICAgICAgICAgdGhpcy5yZWxvYWRXaXRoSml0dGVyKHZpZXcsICgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5sb2codmlldywgXCJ0aW1lb3V0XCIsICgpID0+IFtcInJlY2VpdmVkIHRpbWVvdXQgd2hpbGUgY29tbXVuaWNhdGluZyB3aXRoIHNlcnZlci4gRmFsbGluZyBiYWNrIHRvIGhhcmQgcmVmcmVzaCBmb3IgcmVjb3ZlcnlcIl0pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBwdXNoKClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgZmFrZVB1c2ggPSB7XG4gICAgICByZWNlaXZlczogW10sXG4gICAgICByZWNlaXZlKGtpbmQsIGNiKXsgdGhpcy5yZWNlaXZlcy5wdXNoKFtraW5kLCBjYl0pIH1cbiAgICB9XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpZih2aWV3LmlzRGVzdHJveWVkKCkpeyByZXR1cm4gfVxuICAgICAgZmFrZVB1c2gucmVjZWl2ZXMucmVkdWNlKChhY2MsIFtraW5kLCBjYl0pID0+IGFjYy5yZWNlaXZlKGtpbmQsIGNiKSwgcHVzaCgpKVxuICAgIH0sIGxhdGVuY3kpXG4gICAgcmV0dXJuIGZha2VQdXNoXG4gIH1cblxuICByZWxvYWRXaXRoSml0dGVyKHZpZXcsIGxvZyl7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMucmVsb2FkV2l0aEppdHRlclRpbWVyKVxuICAgIHRoaXMuZGlzY29ubmVjdCgpXG4gICAgbGV0IG1pbk1zID0gdGhpcy5yZWxvYWRKaXR0ZXJNaW5cbiAgICBsZXQgbWF4TXMgPSB0aGlzLnJlbG9hZEppdHRlck1heFxuICAgIGxldCBhZnRlck1zID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heE1zIC0gbWluTXMgKyAxKSkgKyBtaW5Nc1xuICAgIGxldCB0cmllcyA9IEJyb3dzZXIudXBkYXRlTG9jYWwodGhpcy5sb2NhbFN0b3JhZ2UsIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSwgQ09OU0VDVVRJVkVfUkVMT0FEUywgMCwgY291bnQgPT4gY291bnQgKyAxKVxuICAgIGlmKHRyaWVzID4gdGhpcy5tYXhSZWxvYWRzKXtcbiAgICAgIGFmdGVyTXMgPSB0aGlzLmZhaWxzYWZlSml0dGVyXG4gICAgfVxuICAgIHRoaXMucmVsb2FkV2l0aEppdHRlclRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAvLyBpZiB2aWV3IGhhcyByZWNvdmVyZWQsIHN1Y2ggYXMgdHJhbnNwb3J0IHJlcGxhY2VkLCB0aGVuIGNhbmNlbFxuICAgICAgaWYodmlldy5pc0Rlc3Ryb3llZCgpIHx8IHZpZXcuaXNDb25uZWN0ZWQoKSl7IHJldHVybiB9XG4gICAgICB2aWV3LmRlc3Ryb3koKVxuICAgICAgbG9nID8gbG9nKCkgOiB0aGlzLmxvZyh2aWV3LCBcImpvaW5cIiwgKCkgPT4gW2BlbmNvdW50ZXJlZCAke3RyaWVzfSBjb25zZWN1dGl2ZSByZWxvYWRzYF0pXG4gICAgICBpZih0cmllcyA+IHRoaXMubWF4UmVsb2Fkcyl7XG4gICAgICAgIHRoaXMubG9nKHZpZXcsIFwiam9pblwiLCAoKSA9PiBbYGV4Y2VlZGVkICR7dGhpcy5tYXhSZWxvYWRzfSBjb25zZWN1dGl2ZSByZWxvYWRzLiBFbnRlcmluZyBmYWlsc2FmZSBtb2RlYF0pXG4gICAgICB9XG4gICAgICBpZih0aGlzLmhhc1BlbmRpbmdMaW5rKCkpe1xuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSB0aGlzLnBlbmRpbmdMaW5rXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKClcbiAgICAgIH1cbiAgICB9LCBhZnRlck1zKVxuICB9XG5cbiAgZ2V0SG9va0NhbGxiYWNrcyhuYW1lKXtcbiAgICByZXR1cm4gbmFtZSAmJiBuYW1lLnN0YXJ0c1dpdGgoXCJQaG9lbml4LlwiKSA/IEhvb2tzW25hbWUuc3BsaXQoXCIuXCIpWzFdXSA6IHRoaXMuaG9va3NbbmFtZV1cbiAgfVxuXG4gIGlzVW5sb2FkZWQoKXsgcmV0dXJuIHRoaXMudW5sb2FkZWQgfVxuXG4gIGlzQ29ubmVjdGVkKCl7IHJldHVybiB0aGlzLnNvY2tldC5pc0Nvbm5lY3RlZCgpIH1cblxuICBnZXRCaW5kaW5nUHJlZml4KCl7IHJldHVybiB0aGlzLmJpbmRpbmdQcmVmaXggfVxuXG4gIGJpbmRpbmcoa2luZCl7IHJldHVybiBgJHt0aGlzLmdldEJpbmRpbmdQcmVmaXgoKX0ke2tpbmR9YCB9XG5cbiAgY2hhbm5lbCh0b3BpYywgcGFyYW1zKXsgcmV0dXJuIHRoaXMuc29ja2V0LmNoYW5uZWwodG9waWMsIHBhcmFtcykgfVxuXG4gIGpvaW5EZWFkVmlldygpe1xuICAgIGxldCBib2R5ID0gZG9jdW1lbnQuYm9keVxuICAgIGlmKGJvZHkgJiYgIXRoaXMuaXNQaHhWaWV3KGJvZHkpICYmICF0aGlzLmlzUGh4Vmlldyhkb2N1bWVudC5maXJzdEVsZW1lbnRDaGlsZCkpe1xuICAgICAgbGV0IHZpZXcgPSB0aGlzLm5ld1Jvb3RWaWV3KGJvZHkpXG4gICAgICB2aWV3LnNldEhyZWYodGhpcy5nZXRIcmVmKCkpXG4gICAgICB2aWV3LmpvaW5EZWFkKClcbiAgICAgIGlmKCF0aGlzLm1haW4peyB0aGlzLm1haW4gPSB2aWV3IH1cbiAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdmlldy5leGVjTmV3TW91bnRlZCgpKVxuICAgIH1cbiAgfVxuXG4gIGpvaW5Sb290Vmlld3MoKXtcbiAgICBsZXQgcm9vdHNGb3VuZCA9IGZhbHNlXG4gICAgRE9NLmFsbChkb2N1bWVudCwgYCR7UEhYX1ZJRVdfU0VMRUNUT1J9Om5vdChbJHtQSFhfUEFSRU5UX0lEfV0pYCwgcm9vdEVsID0+IHtcbiAgICAgIGlmKCF0aGlzLmdldFJvb3RCeUlkKHJvb3RFbC5pZCkpe1xuICAgICAgICBsZXQgdmlldyA9IHRoaXMubmV3Um9vdFZpZXcocm9vdEVsKVxuICAgICAgICB2aWV3LnNldEhyZWYodGhpcy5nZXRIcmVmKCkpXG4gICAgICAgIHZpZXcuam9pbigpXG4gICAgICAgIGlmKHJvb3RFbC5oYXNBdHRyaWJ1dGUoUEhYX01BSU4pKXsgdGhpcy5tYWluID0gdmlldyB9XG4gICAgICB9XG4gICAgICByb290c0ZvdW5kID0gdHJ1ZVxuICAgIH0pXG4gICAgcmV0dXJuIHJvb3RzRm91bmRcbiAgfVxuXG4gIHJlZGlyZWN0KHRvLCBmbGFzaCl7XG4gICAgdGhpcy51bmxvYWQoKVxuICAgIEJyb3dzZXIucmVkaXJlY3QodG8sIGZsYXNoKVxuICB9XG5cbiAgcmVwbGFjZU1haW4oaHJlZiwgZmxhc2gsIGNhbGxiYWNrID0gbnVsbCwgbGlua1JlZiA9IHRoaXMuc2V0UGVuZGluZ0xpbmsoaHJlZikpe1xuICAgIGxldCBsaXZlUmVmZXJlciA9IHRoaXMuY3VycmVudExvY2F0aW9uLmhyZWZcbiAgICB0aGlzLm91dGdvaW5nTWFpbkVsID0gdGhpcy5vdXRnb2luZ01haW5FbCB8fCB0aGlzLm1haW4uZWxcbiAgICBsZXQgbmV3TWFpbkVsID0gRE9NLmNsb25lTm9kZSh0aGlzLm91dGdvaW5nTWFpbkVsLCBcIlwiKVxuICAgIHRoaXMubWFpbi5zaG93TG9hZGVyKHRoaXMubG9hZGVyVGltZW91dClcbiAgICB0aGlzLm1haW4uZGVzdHJveSgpXG5cbiAgICB0aGlzLm1haW4gPSB0aGlzLm5ld1Jvb3RWaWV3KG5ld01haW5FbCwgZmxhc2gsIGxpdmVSZWZlcmVyKVxuICAgIHRoaXMubWFpbi5zZXRSZWRpcmVjdChocmVmKVxuICAgIHRoaXMudHJhbnNpdGlvblJlbW92ZXMoKVxuICAgIHRoaXMubWFpbi5qb2luKChqb2luQ291bnQsIG9uRG9uZSkgPT4ge1xuICAgICAgaWYoam9pbkNvdW50ID09PSAxICYmIHRoaXMuY29tbWl0UGVuZGluZ0xpbmsobGlua1JlZikpe1xuICAgICAgICB0aGlzLnJlcXVlc3RET01VcGRhdGUoKCkgPT4ge1xuICAgICAgICAgIERPTS5maW5kUGh4U3RpY2t5KGRvY3VtZW50KS5mb3JFYWNoKGVsID0+IG5ld01haW5FbC5hcHBlbmRDaGlsZChlbCkpXG4gICAgICAgICAgdGhpcy5vdXRnb2luZ01haW5FbC5yZXBsYWNlV2l0aChuZXdNYWluRWwpXG4gICAgICAgICAgdGhpcy5vdXRnb2luZ01haW5FbCA9IG51bGxcbiAgICAgICAgICBjYWxsYmFjayAmJiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gY2FsbGJhY2sobGlua1JlZikpXG4gICAgICAgICAgb25Eb25lKClcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgdHJhbnNpdGlvblJlbW92ZXMoZWxlbWVudHMpe1xuICAgIGxldCByZW1vdmVBdHRyID0gdGhpcy5iaW5kaW5nKFwicmVtb3ZlXCIpXG4gICAgZWxlbWVudHMgPSBlbGVtZW50cyB8fCBET00uYWxsKGRvY3VtZW50LCBgWyR7cmVtb3ZlQXR0cn1dYClcbiAgICBlbGVtZW50cy5mb3JFYWNoKGVsID0+IHtcbiAgICAgIHRoaXMuZXhlY0pTKGVsLCBlbC5nZXRBdHRyaWJ1dGUocmVtb3ZlQXR0ciksIFwicmVtb3ZlXCIpXG4gICAgfSlcbiAgfVxuXG4gIGlzUGh4VmlldyhlbCl7IHJldHVybiBlbC5nZXRBdHRyaWJ1dGUgJiYgZWwuZ2V0QXR0cmlidXRlKFBIWF9TRVNTSU9OKSAhPT0gbnVsbCB9XG5cbiAgbmV3Um9vdFZpZXcoZWwsIGZsYXNoLCBsaXZlUmVmZXJlcil7XG4gICAgbGV0IHZpZXcgPSBuZXcgVmlldyhlbCwgdGhpcywgbnVsbCwgZmxhc2gsIGxpdmVSZWZlcmVyKVxuICAgIHRoaXMucm9vdHNbdmlldy5pZF0gPSB2aWV3XG4gICAgcmV0dXJuIHZpZXdcbiAgfVxuXG4gIG93bmVyKGNoaWxkRWwsIGNhbGxiYWNrKXtcbiAgICBsZXQgdmlldyA9IG1heWJlKGNoaWxkRWwuY2xvc2VzdChQSFhfVklFV19TRUxFQ1RPUiksIGVsID0+IHRoaXMuZ2V0Vmlld0J5RWwoZWwpKSB8fCB0aGlzLm1haW5cbiAgICBpZih2aWV3KXsgY2FsbGJhY2sodmlldykgfVxuICB9XG5cbiAgd2l0aGluT3duZXJzKGNoaWxkRWwsIGNhbGxiYWNrKXtcbiAgICB0aGlzLm93bmVyKGNoaWxkRWwsIHZpZXcgPT4gY2FsbGJhY2sodmlldywgY2hpbGRFbCkpXG4gIH1cblxuICBnZXRWaWV3QnlFbChlbCl7XG4gICAgbGV0IHJvb3RJZCA9IGVsLmdldEF0dHJpYnV0ZShQSFhfUk9PVF9JRClcbiAgICByZXR1cm4gbWF5YmUodGhpcy5nZXRSb290QnlJZChyb290SWQpLCByb290ID0+IHJvb3QuZ2V0RGVzY2VuZGVudEJ5RWwoZWwpKVxuICB9XG5cbiAgZ2V0Um9vdEJ5SWQoaWQpeyByZXR1cm4gdGhpcy5yb290c1tpZF0gfVxuXG4gIGRlc3Ryb3lBbGxWaWV3cygpe1xuICAgIGZvcihsZXQgaWQgaW4gdGhpcy5yb290cyl7XG4gICAgICB0aGlzLnJvb3RzW2lkXS5kZXN0cm95KClcbiAgICAgIGRlbGV0ZSB0aGlzLnJvb3RzW2lkXVxuICAgIH1cbiAgICB0aGlzLm1haW4gPSBudWxsXG4gIH1cblxuICBkZXN0cm95Vmlld0J5RWwoZWwpe1xuICAgIGxldCByb290ID0gdGhpcy5nZXRSb290QnlJZChlbC5nZXRBdHRyaWJ1dGUoUEhYX1JPT1RfSUQpKVxuICAgIGlmKHJvb3QgJiYgcm9vdC5pZCA9PT0gZWwuaWQpe1xuICAgICAgcm9vdC5kZXN0cm95KClcbiAgICAgIGRlbGV0ZSB0aGlzLnJvb3RzW3Jvb3QuaWRdXG4gICAgfSBlbHNlIGlmKHJvb3Qpe1xuICAgICAgcm9vdC5kZXN0cm95RGVzY2VuZGVudChlbC5pZClcbiAgICB9XG4gIH1cblxuICBzZXRBY3RpdmVFbGVtZW50KHRhcmdldCl7XG4gICAgaWYodGhpcy5hY3RpdmVFbGVtZW50ID09PSB0YXJnZXQpeyByZXR1cm4gfVxuICAgIHRoaXMuYWN0aXZlRWxlbWVudCA9IHRhcmdldFxuICAgIGxldCBjYW5jZWwgPSAoKSA9PiB7XG4gICAgICBpZih0YXJnZXQgPT09IHRoaXMuYWN0aXZlRWxlbWVudCl7IHRoaXMuYWN0aXZlRWxlbWVudCA9IG51bGwgfVxuICAgICAgdGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHRoaXMpXG4gICAgICB0YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIHRoaXMpXG4gICAgfVxuICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCBjYW5jZWwpXG4gICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCBjYW5jZWwpXG4gIH1cblxuICBnZXRBY3RpdmVFbGVtZW50KCl7XG4gICAgaWYoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gZG9jdW1lbnQuYm9keSl7XG4gICAgICByZXR1cm4gdGhpcy5hY3RpdmVFbGVtZW50IHx8IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnRcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCBjYW4gYmUgbnVsbCBpbiBJbnRlcm5ldCBFeHBsb3JlciAxMVxuICAgICAgcmV0dXJuIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgfHwgZG9jdW1lbnQuYm9keVxuICAgIH1cbiAgfVxuXG4gIGRyb3BBY3RpdmVFbGVtZW50KHZpZXcpe1xuICAgIGlmKHRoaXMucHJldkFjdGl2ZSAmJiB2aWV3Lm93bnNFbGVtZW50KHRoaXMucHJldkFjdGl2ZSkpe1xuICAgICAgdGhpcy5wcmV2QWN0aXZlID0gbnVsbFxuICAgIH1cbiAgfVxuXG4gIHJlc3RvcmVQcmV2aW91c2x5QWN0aXZlRm9jdXMoKXtcbiAgICBpZih0aGlzLnByZXZBY3RpdmUgJiYgdGhpcy5wcmV2QWN0aXZlICE9PSBkb2N1bWVudC5ib2R5KXtcbiAgICAgIHRoaXMucHJldkFjdGl2ZS5mb2N1cygpXG4gICAgfVxuICB9XG5cbiAgYmx1ckFjdGl2ZUVsZW1lbnQoKXtcbiAgICB0aGlzLnByZXZBY3RpdmUgPSB0aGlzLmdldEFjdGl2ZUVsZW1lbnQoKVxuICAgIGlmKHRoaXMucHJldkFjdGl2ZSAhPT0gZG9jdW1lbnQuYm9keSl7IHRoaXMucHJldkFjdGl2ZS5ibHVyKCkgfVxuICB9XG5cbiAgYmluZFRvcExldmVsRXZlbnRzKHtkZWFkfSA9IHt9KXtcbiAgICBpZih0aGlzLmJvdW5kVG9wTGV2ZWxFdmVudHMpeyByZXR1cm4gfVxuXG4gICAgdGhpcy5ib3VuZFRvcExldmVsRXZlbnRzID0gdHJ1ZVxuICAgIC8vIGVudGVyIGZhaWxzYWZlIHJlbG9hZCBpZiBzZXJ2ZXIgaGFzIGdvbmUgYXdheSBpbnRlbnRpb25hbGx5LCBzdWNoIGFzIFwiZGlzY29ubmVjdFwiIGJyb2FkY2FzdFxuICAgIHRoaXMuc29ja2V0Lm9uQ2xvc2UoZXZlbnQgPT4ge1xuICAgICAgLy8gZmFpbHNhZmUgcmVsb2FkIGlmIG5vcm1hbCBjbG9zdXJlIGFuZCB3ZSBzdGlsbCBoYXZlIGEgbWFpbiBMVlxuICAgICAgaWYoZXZlbnQgJiYgZXZlbnQuY29kZSA9PT0gMTAwMCAmJiB0aGlzLm1haW4peyByZXR1cm4gdGhpcy5yZWxvYWRXaXRoSml0dGVyKHRoaXMubWFpbikgfVxuICAgIH0pXG4gICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCl7IH0pIC8vIGVuc3VyZSBhbGwgY2xpY2sgZXZlbnRzIGJ1YmJsZSBmb3IgbW9iaWxlIFNhZmFyaVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicGFnZXNob3dcIiwgZSA9PiB7XG4gICAgICBpZihlLnBlcnNpc3RlZCl7IC8vIHJlbG9hZCBwYWdlIGlmIGJlaW5nIHJlc3RvcmVkIGZyb20gYmFjay9mb3J3YXJkIGNhY2hlXG4gICAgICAgIHRoaXMuZ2V0U29ja2V0KCkuZGlzY29ubmVjdCgpXG4gICAgICAgIHRoaXMud2l0aFBhZ2VMb2FkaW5nKHt0bzogd2luZG93LmxvY2F0aW9uLmhyZWYsIGtpbmQ6IFwicmVkaXJlY3RcIn0pXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKVxuICAgICAgfVxuICAgIH0sIHRydWUpXG4gICAgaWYoIWRlYWQpeyB0aGlzLmJpbmROYXYoKSB9XG4gICAgdGhpcy5iaW5kQ2xpY2tzKClcbiAgICBpZighZGVhZCl7IHRoaXMuYmluZEZvcm1zKCkgfVxuICAgIHRoaXMuYmluZCh7a2V5dXA6IFwia2V5dXBcIiwga2V5ZG93bjogXCJrZXlkb3duXCJ9LCAoZSwgdHlwZSwgdmlldywgdGFyZ2V0RWwsIHBoeEV2ZW50LCBldmVudFRhcmdldCkgPT4ge1xuICAgICAgbGV0IG1hdGNoS2V5ID0gdGFyZ2V0RWwuZ2V0QXR0cmlidXRlKHRoaXMuYmluZGluZyhQSFhfS0VZKSlcbiAgICAgIGxldCBwcmVzc2VkS2V5ID0gZS5rZXkgJiYgZS5rZXkudG9Mb3dlckNhc2UoKSAvLyBjaHJvbWUgY2xpY2tlZCBhdXRvY29tcGxldGVzIHNlbmQgYSBrZXlkb3duIHdpdGhvdXQga2V5XG4gICAgICBpZihtYXRjaEtleSAmJiBtYXRjaEtleS50b0xvd2VyQ2FzZSgpICE9PSBwcmVzc2VkS2V5KXsgcmV0dXJuIH1cblxuICAgICAgbGV0IGRhdGEgPSB7a2V5OiBlLmtleSwgLi4udGhpcy5ldmVudE1ldGEodHlwZSwgZSwgdGFyZ2V0RWwpfVxuICAgICAgSlMuZXhlYyh0eXBlLCBwaHhFdmVudCwgdmlldywgdGFyZ2V0RWwsIFtcInB1c2hcIiwge2RhdGF9XSlcbiAgICB9KVxuICAgIHRoaXMuYmluZCh7Ymx1cjogXCJmb2N1c291dFwiLCBmb2N1czogXCJmb2N1c2luXCJ9LCAoZSwgdHlwZSwgdmlldywgdGFyZ2V0RWwsIHBoeEV2ZW50LCBldmVudFRhcmdldCkgPT4ge1xuICAgICAgaWYoIWV2ZW50VGFyZ2V0KXtcbiAgICAgICAgbGV0IGRhdGEgPSB7a2V5OiBlLmtleSwgLi4udGhpcy5ldmVudE1ldGEodHlwZSwgZSwgdGFyZ2V0RWwpfVxuICAgICAgICBKUy5leGVjKHR5cGUsIHBoeEV2ZW50LCB2aWV3LCB0YXJnZXRFbCwgW1wicHVzaFwiLCB7ZGF0YX1dKVxuICAgICAgfVxuICAgIH0pXG4gICAgdGhpcy5iaW5kKHtibHVyOiBcImJsdXJcIiwgZm9jdXM6IFwiZm9jdXNcIn0sIChlLCB0eXBlLCB2aWV3LCB0YXJnZXRFbCwgdGFyZ2V0Q3R4LCBwaHhFdmVudCwgcGh4VGFyZ2V0KSA9PiB7XG4gICAgICAvLyBibHVyIGFuZCBmb2N1cyBhcmUgdHJpZ2dlcmVkIG9uIGRvY3VtZW50IGFuZCB3aW5kb3cuIERpc2NhcmQgb25lIHRvIGF2b2lkIGR1cHNcbiAgICAgIGlmKHBoeFRhcmdldCA9PT0gXCJ3aW5kb3dcIil7XG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5ldmVudE1ldGEodHlwZSwgZSwgdGFyZ2V0RWwpXG4gICAgICAgIEpTLmV4ZWModHlwZSwgcGh4RXZlbnQsIHZpZXcsIHRhcmdldEVsLCBbXCJwdXNoXCIsIHtkYXRhfV0pXG4gICAgICB9XG4gICAgfSlcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdvdmVyXCIsIGUgPT4gZS5wcmV2ZW50RGVmYXVsdCgpKVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiZHJvcFwiLCBlID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgbGV0IGRyb3BUYXJnZXRJZCA9IG1heWJlKGNsb3Nlc3RQaHhCaW5kaW5nKGUudGFyZ2V0LCB0aGlzLmJpbmRpbmcoUEhYX0RST1BfVEFSR0VUKSksIHRydWVUYXJnZXQgPT4ge1xuICAgICAgICByZXR1cm4gdHJ1ZVRhcmdldC5nZXRBdHRyaWJ1dGUodGhpcy5iaW5kaW5nKFBIWF9EUk9QX1RBUkdFVCkpXG4gICAgICB9KVxuICAgICAgbGV0IGRyb3BUYXJnZXQgPSBkcm9wVGFyZ2V0SWQgJiYgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZHJvcFRhcmdldElkKVxuICAgICAgbGV0IGZpbGVzID0gQXJyYXkuZnJvbShlLmRhdGFUcmFuc2Zlci5maWxlcyB8fCBbXSlcbiAgICAgIGlmKCFkcm9wVGFyZ2V0IHx8IGRyb3BUYXJnZXQuZGlzYWJsZWQgfHwgZmlsZXMubGVuZ3RoID09PSAwIHx8ICEoZHJvcFRhcmdldC5maWxlcyBpbnN0YW5jZW9mIEZpbGVMaXN0KSl7IHJldHVybiB9XG5cbiAgICAgIExpdmVVcGxvYWRlci50cmFja0ZpbGVzKGRyb3BUYXJnZXQsIGZpbGVzLCBlLmRhdGFUcmFuc2ZlcilcbiAgICAgIGRyb3BUYXJnZXQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJpbnB1dFwiLCB7YnViYmxlczogdHJ1ZX0pKVxuICAgIH0pXG4gICAgdGhpcy5vbihQSFhfVFJBQ0tfVVBMT0FEUywgZSA9PiB7XG4gICAgICBsZXQgdXBsb2FkVGFyZ2V0ID0gZS50YXJnZXRcbiAgICAgIGlmKCFET00uaXNVcGxvYWRJbnB1dCh1cGxvYWRUYXJnZXQpKXsgcmV0dXJuIH1cbiAgICAgIGxldCBmaWxlcyA9IEFycmF5LmZyb20oZS5kZXRhaWwuZmlsZXMgfHwgW10pLmZpbHRlcihmID0+IGYgaW5zdGFuY2VvZiBGaWxlIHx8IGYgaW5zdGFuY2VvZiBCbG9iKVxuICAgICAgTGl2ZVVwbG9hZGVyLnRyYWNrRmlsZXModXBsb2FkVGFyZ2V0LCBmaWxlcylcbiAgICAgIHVwbG9hZFRhcmdldC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcImlucHV0XCIsIHtidWJibGVzOiB0cnVlfSkpXG4gICAgfSlcbiAgfVxuXG4gIGV2ZW50TWV0YShldmVudE5hbWUsIGUsIHRhcmdldEVsKXtcbiAgICBsZXQgY2FsbGJhY2sgPSB0aGlzLm1ldGFkYXRhQ2FsbGJhY2tzW2V2ZW50TmFtZV1cbiAgICByZXR1cm4gY2FsbGJhY2sgPyBjYWxsYmFjayhlLCB0YXJnZXRFbCkgOiB7fVxuICB9XG5cbiAgc2V0UGVuZGluZ0xpbmsoaHJlZil7XG4gICAgdGhpcy5saW5rUmVmKytcbiAgICB0aGlzLnBlbmRpbmdMaW5rID0gaHJlZlxuICAgIHJldHVybiB0aGlzLmxpbmtSZWZcbiAgfVxuXG4gIGNvbW1pdFBlbmRpbmdMaW5rKGxpbmtSZWYpe1xuICAgIGlmKHRoaXMubGlua1JlZiAhPT0gbGlua1JlZil7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ocmVmID0gdGhpcy5wZW5kaW5nTGlua1xuICAgICAgdGhpcy5wZW5kaW5nTGluayA9IG51bGxcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9XG5cbiAgZ2V0SHJlZigpeyByZXR1cm4gdGhpcy5ocmVmIH1cblxuICBoYXNQZW5kaW5nTGluaygpeyByZXR1cm4gISF0aGlzLnBlbmRpbmdMaW5rIH1cblxuICBiaW5kKGV2ZW50cywgY2FsbGJhY2spe1xuICAgIGZvcihsZXQgZXZlbnQgaW4gZXZlbnRzKXtcbiAgICAgIGxldCBicm93c2VyRXZlbnROYW1lID0gZXZlbnRzW2V2ZW50XVxuXG4gICAgICB0aGlzLm9uKGJyb3dzZXJFdmVudE5hbWUsIGUgPT4ge1xuICAgICAgICBsZXQgYmluZGluZyA9IHRoaXMuYmluZGluZyhldmVudClcbiAgICAgICAgbGV0IHdpbmRvd0JpbmRpbmcgPSB0aGlzLmJpbmRpbmcoYHdpbmRvdy0ke2V2ZW50fWApXG4gICAgICAgIGxldCB0YXJnZXRQaHhFdmVudCA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSAmJiBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoYmluZGluZylcbiAgICAgICAgaWYodGFyZ2V0UGh4RXZlbnQpe1xuICAgICAgICAgIHRoaXMuZGVib3VuY2UoZS50YXJnZXQsIGUsIGJyb3dzZXJFdmVudE5hbWUsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMud2l0aGluT3duZXJzKGUudGFyZ2V0LCB2aWV3ID0+IHtcbiAgICAgICAgICAgICAgY2FsbGJhY2soZSwgZXZlbnQsIHZpZXcsIGUudGFyZ2V0LCB0YXJnZXRQaHhFdmVudCwgbnVsbClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBET00uYWxsKGRvY3VtZW50LCBgWyR7d2luZG93QmluZGluZ31dYCwgZWwgPT4ge1xuICAgICAgICAgICAgbGV0IHBoeEV2ZW50ID0gZWwuZ2V0QXR0cmlidXRlKHdpbmRvd0JpbmRpbmcpXG4gICAgICAgICAgICB0aGlzLmRlYm91bmNlKGVsLCBlLCBicm93c2VyRXZlbnROYW1lLCAoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMud2l0aGluT3duZXJzKGVsLCB2aWV3ID0+IHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhlLCBldmVudCwgdmlldywgZWwsIHBoeEV2ZW50LCBcIndpbmRvd1wiKVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIGJpbmRDbGlja3MoKXtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4gdGhpcy5jbGlja1N0YXJ0ZWRBdFRhcmdldCA9IGUudGFyZ2V0KVxuICAgIHRoaXMuYmluZENsaWNrKFwiY2xpY2tcIiwgXCJjbGlja1wiLCBmYWxzZSlcbiAgICB0aGlzLmJpbmRDbGljayhcIm1vdXNlZG93blwiLCBcImNhcHR1cmUtY2xpY2tcIiwgdHJ1ZSlcbiAgfVxuXG4gIGJpbmRDbGljayhldmVudE5hbWUsIGJpbmRpbmdOYW1lLCBjYXB0dXJlKXtcbiAgICBsZXQgY2xpY2sgPSB0aGlzLmJpbmRpbmcoYmluZGluZ05hbWUpXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBlID0+IHtcbiAgICAgIGxldCB0YXJnZXQgPSBudWxsXG4gICAgICBpZihjYXB0dXJlKXtcbiAgICAgICAgdGFyZ2V0ID0gZS50YXJnZXQubWF0Y2hlcyhgWyR7Y2xpY2t9XWApID8gZS50YXJnZXQgOiBlLnRhcmdldC5xdWVyeVNlbGVjdG9yKGBbJHtjbGlja31dYClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBjbGlja1N0YXJ0ZWRBdFRhcmdldCA9IHRoaXMuY2xpY2tTdGFydGVkQXRUYXJnZXQgfHwgZS50YXJnZXRcbiAgICAgICAgdGFyZ2V0ID0gY2xvc2VzdFBoeEJpbmRpbmcoY2xpY2tTdGFydGVkQXRUYXJnZXQsIGNsaWNrKVxuICAgICAgICB0aGlzLmRpc3BhdGNoQ2xpY2tBd2F5KGUsIGNsaWNrU3RhcnRlZEF0VGFyZ2V0KVxuICAgICAgICB0aGlzLmNsaWNrU3RhcnRlZEF0VGFyZ2V0ID0gbnVsbFxuICAgICAgfVxuICAgICAgbGV0IHBoeEV2ZW50ID0gdGFyZ2V0ICYmIHRhcmdldC5nZXRBdHRyaWJ1dGUoY2xpY2spXG4gICAgICBpZighcGh4RXZlbnQpe1xuICAgICAgICBpZighY2FwdHVyZSAmJiBET00uaXNOZXdQYWdlQ2xpY2soZSwgd2luZG93LmxvY2F0aW9uKSl7IHRoaXMudW5sb2FkKCkgfVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYodGFyZ2V0LmdldEF0dHJpYnV0ZShcImhyZWZcIikgPT09IFwiI1wiKXsgZS5wcmV2ZW50RGVmYXVsdCgpIH1cblxuICAgICAgLy8gbm9vcCBpZiB3ZSBhcmUgaW4gdGhlIG1pZGRsZSBvZiBhd2FpdGluZyBhbiBhY2sgZm9yIHRoaXMgZWwgYWxyZWFkeVxuICAgICAgaWYodGFyZ2V0Lmhhc0F0dHJpYnV0ZShQSFhfUkVGKSl7IHJldHVybiB9XG5cbiAgICAgIHRoaXMuZGVib3VuY2UodGFyZ2V0LCBlLCBcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgdGhpcy53aXRoaW5Pd25lcnModGFyZ2V0LCB2aWV3ID0+IHtcbiAgICAgICAgICBKUy5leGVjKFwiY2xpY2tcIiwgcGh4RXZlbnQsIHZpZXcsIHRhcmdldCwgW1wicHVzaFwiLCB7ZGF0YTogdGhpcy5ldmVudE1ldGEoXCJjbGlja1wiLCBlLCB0YXJnZXQpfV0pXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH0sIGNhcHR1cmUpXG4gIH1cblxuICBkaXNwYXRjaENsaWNrQXdheShlLCBjbGlja1N0YXJ0ZWRBdCl7XG4gICAgbGV0IHBoeENsaWNrQXdheSA9IHRoaXMuYmluZGluZyhcImNsaWNrLWF3YXlcIilcbiAgICBET00uYWxsKGRvY3VtZW50LCBgWyR7cGh4Q2xpY2tBd2F5fV1gLCBlbCA9PiB7XG4gICAgICBpZighKGVsLmlzU2FtZU5vZGUoY2xpY2tTdGFydGVkQXQpIHx8IGVsLmNvbnRhaW5zKGNsaWNrU3RhcnRlZEF0KSkpe1xuICAgICAgICB0aGlzLndpdGhpbk93bmVycyhlLnRhcmdldCwgdmlldyA9PiB7XG4gICAgICAgICAgbGV0IHBoeEV2ZW50ID0gZWwuZ2V0QXR0cmlidXRlKHBoeENsaWNrQXdheSlcbiAgICAgICAgICBpZihKUy5pc1Zpc2libGUoZWwpKXtcbiAgICAgICAgICAgIEpTLmV4ZWMoXCJjbGlja1wiLCBwaHhFdmVudCwgdmlldywgZWwsIFtcInB1c2hcIiwge2RhdGE6IHRoaXMuZXZlbnRNZXRhKFwiY2xpY2tcIiwgZSwgZS50YXJnZXQpfV0pXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBiaW5kTmF2KCl7XG4gICAgaWYoIUJyb3dzZXIuY2FuUHVzaFN0YXRlKCkpeyByZXR1cm4gfVxuICAgIGlmKGhpc3Rvcnkuc2Nyb2xsUmVzdG9yYXRpb24peyBoaXN0b3J5LnNjcm9sbFJlc3RvcmF0aW9uID0gXCJtYW51YWxcIiB9XG4gICAgbGV0IHNjcm9sbFRpbWVyID0gbnVsbFxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIF9lID0+IHtcbiAgICAgIGNsZWFyVGltZW91dChzY3JvbGxUaW1lcilcbiAgICAgIHNjcm9sbFRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIEJyb3dzZXIudXBkYXRlQ3VycmVudFN0YXRlKHN0YXRlID0+IE9iamVjdC5hc3NpZ24oc3RhdGUsIHtzY3JvbGw6IHdpbmRvdy5zY3JvbGxZfSkpXG4gICAgICB9LCAxMDApXG4gICAgfSlcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBvcHN0YXRlXCIsIGV2ZW50ID0+IHtcbiAgICAgIGlmKCF0aGlzLnJlZ2lzdGVyTmV3TG9jYXRpb24od2luZG93LmxvY2F0aW9uKSl7IHJldHVybiB9XG4gICAgICBsZXQge3R5cGUsIGlkLCByb290LCBzY3JvbGx9ID0gZXZlbnQuc3RhdGUgfHwge31cbiAgICAgIGxldCBocmVmID0gd2luZG93LmxvY2F0aW9uLmhyZWZcblxuICAgICAgRE9NLmRpc3BhdGNoRXZlbnQod2luZG93LCBcInBoeDpuYXZpZ2F0ZVwiLCB7ZGV0YWlsOiB7aHJlZiwgcGF0Y2g6IHR5cGUgPT09IFwicGF0Y2hcIiwgcG9wOiB0cnVlfX0pXG4gICAgICB0aGlzLnJlcXVlc3RET01VcGRhdGUoKCkgPT4ge1xuICAgICAgICBpZih0aGlzLm1haW4uaXNDb25uZWN0ZWQoKSAmJiAodHlwZSA9PT0gXCJwYXRjaFwiICYmIGlkID09PSB0aGlzLm1haW4uaWQpKXtcbiAgICAgICAgICB0aGlzLm1haW4ucHVzaExpbmtQYXRjaChocmVmLCBudWxsLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm1heWJlU2Nyb2xsKHNjcm9sbClcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucmVwbGFjZU1haW4oaHJlZiwgbnVsbCwgKCkgPT4ge1xuICAgICAgICAgICAgaWYocm9vdCl7IHRoaXMucmVwbGFjZVJvb3RIaXN0b3J5KCkgfVxuICAgICAgICAgICAgdGhpcy5tYXliZVNjcm9sbChzY3JvbGwpXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LCBmYWxzZSlcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4ge1xuICAgICAgbGV0IHRhcmdldCA9IGNsb3Nlc3RQaHhCaW5kaW5nKGUudGFyZ2V0LCBQSFhfTElWRV9MSU5LKVxuICAgICAgbGV0IHR5cGUgPSB0YXJnZXQgJiYgdGFyZ2V0LmdldEF0dHJpYnV0ZShQSFhfTElWRV9MSU5LKVxuICAgICAgaWYoIXR5cGUgfHwgIXRoaXMuaXNDb25uZWN0ZWQoKSB8fCAhdGhpcy5tYWluIHx8IERPTS53YW50c05ld1RhYihlKSl7IHJldHVybiB9XG5cbiAgICAgIGxldCBocmVmID0gdGFyZ2V0LmhyZWZcbiAgICAgIGxldCBsaW5rU3RhdGUgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKFBIWF9MSU5LX1NUQVRFKVxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpIC8vIGRvIG5vdCBidWJibGUgY2xpY2sgdG8gcmVndWxhciBwaHgtY2xpY2sgYmluZGluZ3NcbiAgICAgIGlmKHRoaXMucGVuZGluZ0xpbmsgPT09IGhyZWYpeyByZXR1cm4gfVxuXG4gICAgICB0aGlzLnJlcXVlc3RET01VcGRhdGUoKCkgPT4ge1xuICAgICAgICBpZih0eXBlID09PSBcInBhdGNoXCIpe1xuICAgICAgICAgIHRoaXMucHVzaEhpc3RvcnlQYXRjaChocmVmLCBsaW5rU3RhdGUsIHRhcmdldClcbiAgICAgICAgfSBlbHNlIGlmKHR5cGUgPT09IFwicmVkaXJlY3RcIil7XG4gICAgICAgICAgdGhpcy5oaXN0b3J5UmVkaXJlY3QoaHJlZiwgbGlua1N0YXRlKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgZXhwZWN0ZWQgJHtQSFhfTElWRV9MSU5LfSB0byBiZSBcInBhdGNoXCIgb3IgXCJyZWRpcmVjdFwiLCBnb3Q6ICR7dHlwZX1gKVxuICAgICAgICB9XG4gICAgICAgIGxldCBwaHhDbGljayA9IHRhcmdldC5nZXRBdHRyaWJ1dGUodGhpcy5iaW5kaW5nKFwiY2xpY2tcIikpXG4gICAgICAgIGlmKHBoeENsaWNrKXtcbiAgICAgICAgICB0aGlzLnJlcXVlc3RET01VcGRhdGUoKCkgPT4gdGhpcy5leGVjSlModGFyZ2V0LCBwaHhDbGljaywgXCJjbGlja1wiKSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LCBmYWxzZSlcbiAgfVxuXG4gIG1heWJlU2Nyb2xsKHNjcm9sbCkge1xuICAgIGlmKHR5cGVvZihzY3JvbGwpID09PSBcIm51bWJlclwiKXtcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCBzY3JvbGwpXG4gICAgICB9KSAvLyB0aGUgYm9keSBuZWVkcyB0byByZW5kZXIgYmVmb3JlIHdlIHNjcm9sbC5cbiAgICB9XG4gIH1cblxuICBkaXNwYXRjaEV2ZW50KGV2ZW50LCBwYXlsb2FkID0ge30pe1xuICAgIERPTS5kaXNwYXRjaEV2ZW50KHdpbmRvdywgYHBoeDoke2V2ZW50fWAsIHtkZXRhaWw6IHBheWxvYWR9KVxuICB9XG5cbiAgZGlzcGF0Y2hFdmVudHMoZXZlbnRzKXtcbiAgICBldmVudHMuZm9yRWFjaCgoW2V2ZW50LCBwYXlsb2FkXSkgPT4gdGhpcy5kaXNwYXRjaEV2ZW50KGV2ZW50LCBwYXlsb2FkKSlcbiAgfVxuXG4gIHdpdGhQYWdlTG9hZGluZyhpbmZvLCBjYWxsYmFjayl7XG4gICAgRE9NLmRpc3BhdGNoRXZlbnQod2luZG93LCBcInBoeDpwYWdlLWxvYWRpbmctc3RhcnRcIiwge2RldGFpbDogaW5mb30pXG4gICAgbGV0IGRvbmUgPSAoKSA9PiBET00uZGlzcGF0Y2hFdmVudCh3aW5kb3csIFwicGh4OnBhZ2UtbG9hZGluZy1zdG9wXCIsIHtkZXRhaWw6IGluZm99KVxuICAgIHJldHVybiBjYWxsYmFjayA/IGNhbGxiYWNrKGRvbmUpIDogZG9uZVxuICB9XG5cbiAgcHVzaEhpc3RvcnlQYXRjaChocmVmLCBsaW5rU3RhdGUsIHRhcmdldEVsKXtcbiAgICBpZighdGhpcy5pc0Nvbm5lY3RlZCgpKXsgcmV0dXJuIEJyb3dzZXIucmVkaXJlY3QoaHJlZikgfVxuXG4gICAgdGhpcy53aXRoUGFnZUxvYWRpbmcoe3RvOiBocmVmLCBraW5kOiBcInBhdGNoXCJ9LCBkb25lID0+IHtcbiAgICAgIHRoaXMubWFpbi5wdXNoTGlua1BhdGNoKGhyZWYsIHRhcmdldEVsLCBsaW5rUmVmID0+IHtcbiAgICAgICAgdGhpcy5oaXN0b3J5UGF0Y2goaHJlZiwgbGlua1N0YXRlLCBsaW5rUmVmKVxuICAgICAgICBkb25lKClcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIGhpc3RvcnlQYXRjaChocmVmLCBsaW5rU3RhdGUsIGxpbmtSZWYgPSB0aGlzLnNldFBlbmRpbmdMaW5rKGhyZWYpKXtcbiAgICBpZighdGhpcy5jb21taXRQZW5kaW5nTGluayhsaW5rUmVmKSl7IHJldHVybiB9XG5cbiAgICBCcm93c2VyLnB1c2hTdGF0ZShsaW5rU3RhdGUsIHt0eXBlOiBcInBhdGNoXCIsIGlkOiB0aGlzLm1haW4uaWR9LCBocmVmKVxuICAgIERPTS5kaXNwYXRjaEV2ZW50KHdpbmRvdywgXCJwaHg6bmF2aWdhdGVcIiwge2RldGFpbDoge3BhdGNoOiB0cnVlLCBocmVmLCBwb3A6IGZhbHNlfX0pXG4gICAgdGhpcy5yZWdpc3Rlck5ld0xvY2F0aW9uKHdpbmRvdy5sb2NhdGlvbilcbiAgfVxuXG4gIGhpc3RvcnlSZWRpcmVjdChocmVmLCBsaW5rU3RhdGUsIGZsYXNoKXtcbiAgICAvLyBjb252ZXJ0IHRvIGZ1bGwgaHJlZiBpZiBvbmx5IHBhdGggcHJlZml4XG4gICAgaWYoIXRoaXMuaXNDb25uZWN0ZWQoKSl7IHJldHVybiBCcm93c2VyLnJlZGlyZWN0KGhyZWYsIGZsYXNoKSB9XG4gICAgaWYoL15cXC8kfF5cXC9bXlxcL10rLiokLy50ZXN0KGhyZWYpKXtcbiAgICAgIGxldCB7cHJvdG9jb2wsIGhvc3R9ID0gd2luZG93LmxvY2F0aW9uXG4gICAgICBocmVmID0gYCR7cHJvdG9jb2x9Ly8ke2hvc3R9JHtocmVmfWBcbiAgICB9XG4gICAgbGV0IHNjcm9sbCA9IHdpbmRvdy5zY3JvbGxZXG4gICAgdGhpcy53aXRoUGFnZUxvYWRpbmcoe3RvOiBocmVmLCBraW5kOiBcInJlZGlyZWN0XCJ9LCBkb25lID0+IHtcbiAgICAgIHRoaXMucmVwbGFjZU1haW4oaHJlZiwgZmxhc2gsIChsaW5rUmVmKSA9PiB7XG4gICAgICAgIGlmKGxpbmtSZWYgPT09IHRoaXMubGlua1JlZil7XG4gICAgICAgICAgQnJvd3Nlci5wdXNoU3RhdGUobGlua1N0YXRlLCB7dHlwZTogXCJyZWRpcmVjdFwiLCBpZDogdGhpcy5tYWluLmlkLCBzY3JvbGw6IHNjcm9sbH0sIGhyZWYpXG4gICAgICAgICAgRE9NLmRpc3BhdGNoRXZlbnQod2luZG93LCBcInBoeDpuYXZpZ2F0ZVwiLCB7ZGV0YWlsOiB7aHJlZiwgcGF0Y2g6IGZhbHNlLCBwb3A6IGZhbHNlfX0pXG4gICAgICAgICAgdGhpcy5yZWdpc3Rlck5ld0xvY2F0aW9uKHdpbmRvdy5sb2NhdGlvbilcbiAgICAgICAgfVxuICAgICAgICBkb25lKClcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIHJlcGxhY2VSb290SGlzdG9yeSgpe1xuICAgIEJyb3dzZXIucHVzaFN0YXRlKFwicmVwbGFjZVwiLCB7cm9vdDogdHJ1ZSwgdHlwZTogXCJwYXRjaFwiLCBpZDogdGhpcy5tYWluLmlkfSlcbiAgfVxuXG4gIHJlZ2lzdGVyTmV3TG9jYXRpb24obmV3TG9jYXRpb24pe1xuICAgIGxldCB7cGF0aG5hbWUsIHNlYXJjaH0gPSB0aGlzLmN1cnJlbnRMb2NhdGlvblxuICAgIGlmKHBhdGhuYW1lICsgc2VhcmNoID09PSBuZXdMb2NhdGlvbi5wYXRobmFtZSArIG5ld0xvY2F0aW9uLnNlYXJjaCl7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jdXJyZW50TG9jYXRpb24gPSBjbG9uZShuZXdMb2NhdGlvbilcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9XG5cbiAgYmluZEZvcm1zKCl7XG4gICAgbGV0IGl0ZXJhdGlvbnMgPSAwXG4gICAgbGV0IGV4dGVybmFsRm9ybVN1Ym1pdHRlZCA9IGZhbHNlXG5cbiAgICAvLyBkaXNhYmxlIGZvcm1zIG9uIHN1Ym1pdCB0aGF0IHRyYWNrIHBoeC1jaGFuZ2UgYnV0IHBlcmZvcm0gZXh0ZXJuYWwgc3VibWl0XG4gICAgdGhpcy5vbihcInN1Ym1pdFwiLCBlID0+IHtcbiAgICAgIGxldCBwaHhTdWJtaXQgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUodGhpcy5iaW5kaW5nKFwic3VibWl0XCIpKVxuICAgICAgbGV0IHBoeENoYW5nZSA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSh0aGlzLmJpbmRpbmcoXCJjaGFuZ2VcIikpXG4gICAgICBpZighZXh0ZXJuYWxGb3JtU3VibWl0dGVkICYmIHBoeENoYW5nZSAmJiAhcGh4U3VibWl0KXtcbiAgICAgICAgZXh0ZXJuYWxGb3JtU3VibWl0dGVkID0gdHJ1ZVxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgdGhpcy53aXRoaW5Pd25lcnMoZS50YXJnZXQsIHZpZXcgPT4ge1xuICAgICAgICAgIHZpZXcuZGlzYWJsZUZvcm0oZS50YXJnZXQpXG4gICAgICAgICAgLy8gc2FmYXJpIG5lZWRzIG5leHQgdGlja1xuICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICAgICAgaWYoRE9NLmlzVW5sb2FkYWJsZUZvcm1TdWJtaXQoZSkpeyB0aGlzLnVubG9hZCgpIH1cbiAgICAgICAgICAgIGUudGFyZ2V0LnN1Ym1pdCgpXG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9LCB0cnVlKVxuXG4gICAgdGhpcy5vbihcInN1Ym1pdFwiLCBlID0+IHtcbiAgICAgIGxldCBwaHhFdmVudCA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSh0aGlzLmJpbmRpbmcoXCJzdWJtaXRcIikpXG4gICAgICBpZighcGh4RXZlbnQpe1xuICAgICAgICBpZihET00uaXNVbmxvYWRhYmxlRm9ybVN1Ym1pdChlKSl7IHRoaXMudW5sb2FkKCkgfVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgZS50YXJnZXQuZGlzYWJsZWQgPSB0cnVlXG4gICAgICB0aGlzLndpdGhpbk93bmVycyhlLnRhcmdldCwgdmlldyA9PiB7XG4gICAgICAgIEpTLmV4ZWMoXCJzdWJtaXRcIiwgcGh4RXZlbnQsIHZpZXcsIGUudGFyZ2V0LCBbXCJwdXNoXCIsIHtzdWJtaXR0ZXI6IGUuc3VibWl0dGVyfV0pXG4gICAgICB9KVxuICAgIH0sIGZhbHNlKVxuXG4gICAgZm9yKGxldCB0eXBlIG9mIFtcImNoYW5nZVwiLCBcImlucHV0XCJdKXtcbiAgICAgIHRoaXMub24odHlwZSwgZSA9PiB7XG4gICAgICAgIGxldCBwaHhDaGFuZ2UgPSB0aGlzLmJpbmRpbmcoXCJjaGFuZ2VcIilcbiAgICAgICAgbGV0IGlucHV0ID0gZS50YXJnZXRcbiAgICAgICAgbGV0IGlucHV0RXZlbnQgPSBpbnB1dC5nZXRBdHRyaWJ1dGUocGh4Q2hhbmdlKVxuICAgICAgICBsZXQgZm9ybUV2ZW50ID0gaW5wdXQuZm9ybSAmJiBpbnB1dC5mb3JtLmdldEF0dHJpYnV0ZShwaHhDaGFuZ2UpXG4gICAgICAgIGxldCBwaHhFdmVudCA9IGlucHV0RXZlbnQgfHwgZm9ybUV2ZW50XG4gICAgICAgIGlmKCFwaHhFdmVudCl7IHJldHVybiB9XG4gICAgICAgIGlmKGlucHV0LnR5cGUgPT09IFwibnVtYmVyXCIgJiYgaW5wdXQudmFsaWRpdHkgJiYgaW5wdXQudmFsaWRpdHkuYmFkSW5wdXQpeyByZXR1cm4gfVxuXG4gICAgICAgIGxldCBkaXNwYXRjaGVyID0gaW5wdXRFdmVudCA/IGlucHV0IDogaW5wdXQuZm9ybVxuICAgICAgICBsZXQgY3VycmVudEl0ZXJhdGlvbnMgPSBpdGVyYXRpb25zXG4gICAgICAgIGl0ZXJhdGlvbnMrK1xuICAgICAgICBsZXQge2F0OiBhdCwgdHlwZTogbGFzdFR5cGV9ID0gRE9NLnByaXZhdGUoaW5wdXQsIFwicHJldi1pdGVyYXRpb25cIikgfHwge31cbiAgICAgICAgLy8gZGV0ZWN0IGR1cCBiZWNhdXNlIHNvbWUgYnJvd3NlcnMgZGlzcGF0Y2ggYm90aCBcImlucHV0XCIgYW5kIFwiY2hhbmdlXCJcbiAgICAgICAgaWYoYXQgPT09IGN1cnJlbnRJdGVyYXRpb25zIC0gMSAmJiB0eXBlICE9PSBsYXN0VHlwZSl7IHJldHVybiB9XG5cbiAgICAgICAgRE9NLnB1dFByaXZhdGUoaW5wdXQsIFwicHJldi1pdGVyYXRpb25cIiwge2F0OiBjdXJyZW50SXRlcmF0aW9ucywgdHlwZTogdHlwZX0pXG5cbiAgICAgICAgdGhpcy5kZWJvdW5jZShpbnB1dCwgZSwgdHlwZSwgKCkgPT4ge1xuICAgICAgICAgIHRoaXMud2l0aGluT3duZXJzKGRpc3BhdGNoZXIsIHZpZXcgPT4ge1xuICAgICAgICAgICAgRE9NLnB1dFByaXZhdGUoaW5wdXQsIFBIWF9IQVNfRk9DVVNFRCwgdHJ1ZSlcbiAgICAgICAgICAgIGlmKCFET00uaXNUZXh0dWFsSW5wdXQoaW5wdXQpKXtcbiAgICAgICAgICAgICAgdGhpcy5zZXRBY3RpdmVFbGVtZW50KGlucHV0KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgSlMuZXhlYyhcImNoYW5nZVwiLCBwaHhFdmVudCwgdmlldywgaW5wdXQsIFtcInB1c2hcIiwge190YXJnZXQ6IGUudGFyZ2V0Lm5hbWUsIGRpc3BhdGNoZXI6IGRpc3BhdGNoZXJ9XSlcbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgfSwgZmFsc2UpXG4gICAgfVxuICAgIHRoaXMub24oXCJyZXNldFwiLCAoZSkgPT4ge1xuICAgICAgbGV0IGZvcm0gPSBlLnRhcmdldFxuICAgICAgRE9NLnJlc2V0Rm9ybShmb3JtLCB0aGlzLmJpbmRpbmcoUEhYX0ZFRURCQUNLX0ZPUikpXG4gICAgICBsZXQgaW5wdXQgPSBBcnJheS5mcm9tKGZvcm0uZWxlbWVudHMpLmZpbmQoZWwgPT4gZWwudHlwZSA9PT0gXCJyZXNldFwiKVxuICAgICAgLy8gd2FpdCB1bnRpbCBuZXh0IHRpY2sgdG8gZ2V0IHVwZGF0ZWQgaW5wdXQgdmFsdWVcbiAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICBpbnB1dC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcImlucHV0XCIsIHtidWJibGVzOiB0cnVlLCBjYW5jZWxhYmxlOiBmYWxzZX0pKVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgZGVib3VuY2UoZWwsIGV2ZW50LCBldmVudFR5cGUsIGNhbGxiYWNrKXtcbiAgICBpZihldmVudFR5cGUgPT09IFwiYmx1clwiIHx8IGV2ZW50VHlwZSA9PT0gXCJmb2N1c291dFwiKXsgcmV0dXJuIGNhbGxiYWNrKCkgfVxuXG4gICAgbGV0IHBoeERlYm91bmNlID0gdGhpcy5iaW5kaW5nKFBIWF9ERUJPVU5DRSlcbiAgICBsZXQgcGh4VGhyb3R0bGUgPSB0aGlzLmJpbmRpbmcoUEhYX1RIUk9UVExFKVxuICAgIGxldCBkZWZhdWx0RGVib3VuY2UgPSB0aGlzLmRlZmF1bHRzLmRlYm91bmNlLnRvU3RyaW5nKClcbiAgICBsZXQgZGVmYXVsdFRocm90dGxlID0gdGhpcy5kZWZhdWx0cy50aHJvdHRsZS50b1N0cmluZygpXG5cbiAgICB0aGlzLndpdGhpbk93bmVycyhlbCwgdmlldyA9PiB7XG4gICAgICBsZXQgYXN5bmNGaWx0ZXIgPSAoKSA9PiAhdmlldy5pc0Rlc3Ryb3llZCgpICYmIGRvY3VtZW50LmJvZHkuY29udGFpbnMoZWwpXG4gICAgICBET00uZGVib3VuY2UoZWwsIGV2ZW50LCBwaHhEZWJvdW5jZSwgZGVmYXVsdERlYm91bmNlLCBwaHhUaHJvdHRsZSwgZGVmYXVsdFRocm90dGxlLCBhc3luY0ZpbHRlciwgKCkgPT4ge1xuICAgICAgICBjYWxsYmFjaygpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICBzaWxlbmNlRXZlbnRzKGNhbGxiYWNrKXtcbiAgICB0aGlzLnNpbGVuY2VkID0gdHJ1ZVxuICAgIGNhbGxiYWNrKClcbiAgICB0aGlzLnNpbGVuY2VkID0gZmFsc2VcbiAgfVxuXG4gIG9uKGV2ZW50LCBjYWxsYmFjayl7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGUgPT4ge1xuICAgICAgaWYoIXRoaXMuc2lsZW5jZWQpeyBjYWxsYmFjayhlKSB9XG4gICAgfSlcbiAgfVxufVxuXG5jbGFzcyBUcmFuc2l0aW9uU2V0IHtcbiAgY29uc3RydWN0b3IoKXtcbiAgICB0aGlzLnRyYW5zaXRpb25zID0gbmV3IFNldCgpXG4gICAgdGhpcy5wZW5kaW5nT3BzID0gW11cbiAgfVxuXG4gIHJlc2V0KCl7XG4gICAgdGhpcy50cmFuc2l0aW9ucy5mb3JFYWNoKHRpbWVyID0+IHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcilcbiAgICAgIHRoaXMudHJhbnNpdGlvbnMuZGVsZXRlKHRpbWVyKVxuICAgIH0pXG4gICAgdGhpcy5mbHVzaFBlbmRpbmdPcHMoKVxuICB9XG5cbiAgYWZ0ZXIoY2FsbGJhY2spe1xuICAgIGlmKHRoaXMuc2l6ZSgpID09PSAwKXtcbiAgICAgIGNhbGxiYWNrKClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wdXNoUGVuZGluZ09wKGNhbGxiYWNrKVxuICAgIH1cbiAgfVxuXG4gIGFkZFRyYW5zaXRpb24odGltZSwgb25TdGFydCwgb25Eb25lKXtcbiAgICBvblN0YXJ0KClcbiAgICBsZXQgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMudHJhbnNpdGlvbnMuZGVsZXRlKHRpbWVyKVxuICAgICAgb25Eb25lKClcbiAgICAgIHRoaXMuZmx1c2hQZW5kaW5nT3BzKClcbiAgICB9LCB0aW1lKVxuICAgIHRoaXMudHJhbnNpdGlvbnMuYWRkKHRpbWVyKVxuICB9XG5cbiAgcHVzaFBlbmRpbmdPcChvcCl7IHRoaXMucGVuZGluZ09wcy5wdXNoKG9wKSB9XG5cbiAgc2l6ZSgpeyByZXR1cm4gdGhpcy50cmFuc2l0aW9ucy5zaXplIH1cblxuICBmbHVzaFBlbmRpbmdPcHMoKXtcbiAgICBpZih0aGlzLnNpemUoKSA+IDApeyByZXR1cm4gfVxuICAgIGxldCBvcCA9IHRoaXMucGVuZGluZ09wcy5zaGlmdCgpXG4gICAgaWYob3Ape1xuICAgICAgb3AoKVxuICAgICAgdGhpcy5mbHVzaFBlbmRpbmdPcHMoKVxuICAgIH1cbiAgfVxufVxuIiwgIi8vIElmIHlvdSB3YW50IHRvIHVzZSBQaG9lbml4IGNoYW5uZWxzLCBydW4gYG1peCBoZWxwIHBoeC5nZW4uY2hhbm5lbGBcbi8vIHRvIGdldCBzdGFydGVkIGFuZCB0aGVuIHVuY29tbWVudCB0aGUgbGluZSBiZWxvdy5cbi8vIGltcG9ydCBcIi4vdXNlcl9zb2NrZXQuanNcIlxuaW1wb3J0IFwiLi9jbGllbnRfc29ja2V0LmpzXCJcblxuLy8gWW91IGNhbiBpbmNsdWRlIGRlcGVuZGVuY2llcyBpbiB0d28gd2F5cy5cbi8vXG4vLyBUaGUgc2ltcGxlc3Qgb3B0aW9uIGlzIHRvIHB1dCB0aGVtIGluIGFzc2V0cy92ZW5kb3IgYW5kXG4vLyBpbXBvcnQgdGhlbSB1c2luZyByZWxhdGl2ZSBwYXRoczpcbi8vXG4vLyAgICAgaW1wb3J0IFwiLi4vdmVuZG9yL3NvbWUtcGFja2FnZS5qc1wiXG4vL1xuLy8gQWx0ZXJuYXRpdmVseSwgeW91IGNhbiBgbnBtIGluc3RhbGwgc29tZS1wYWNrYWdlIC0tcHJlZml4IGFzc2V0c2AgYW5kIGltcG9ydFxuLy8gdGhlbSB1c2luZyBhIHBhdGggc3RhcnRpbmcgd2l0aCB0aGUgcGFja2FnZSBuYW1lOlxuLy9cbi8vICAgICBpbXBvcnQgXCJzb21lLXBhY2thZ2VcIlxuLy9cblxuLy8gSW5jbHVkZSBwaG9lbml4X2h0bWwgdG8gaGFuZGxlIG1ldGhvZD1QVVQvREVMRVRFIGluIGZvcm1zIGFuZCBidXR0b25zLlxuaW1wb3J0IFwicGhvZW5peF9odG1sXCI7XG4vLyBFc3RhYmxpc2ggUGhvZW5peCBTb2NrZXQgYW5kIExpdmVWaWV3IGNvbmZpZ3VyYXRpb24uXG5pbXBvcnQgeyBTb2NrZXQgfSBmcm9tIFwicGhvZW5peFwiO1xuaW1wb3J0IHsgTGl2ZVNvY2tldCB9IGZyb20gXCJwaG9lbml4X2xpdmVfdmlld1wiO1xuaW1wb3J0IHRvcGJhciBmcm9tIFwiLi4vdmVuZG9yL3RvcGJhclwiO1xuXG5sZXQgY3NyZlRva2VuID0gZG9jdW1lbnRcbiAgLnF1ZXJ5U2VsZWN0b3IoXCJtZXRhW25hbWU9J2NzcmYtdG9rZW4nXVwiKVxuICAuZ2V0QXR0cmlidXRlKFwiY29udGVudFwiKTtcbmxldCBsaXZlU29ja2V0ID0gbmV3IExpdmVTb2NrZXQoXCIvbGl2ZVwiLCBTb2NrZXQsIHtcbiAgcGFyYW1zOiB7IF9jc3JmX3Rva2VuOiBjc3JmVG9rZW4gfSxcbn0pO1xuXG4vLyBTaG93IHByb2dyZXNzIGJhciBvbiBsaXZlIG5hdmlnYXRpb24gYW5kIGZvcm0gc3VibWl0c1xudG9wYmFyLmNvbmZpZyh7IGJhckNvbG9yczogeyAwOiBcIiMyOWRcIiB9LCBzaGFkb3dDb2xvcjogXCJyZ2JhKDAsIDAsIDAsIC4zKVwiIH0pO1xud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwaHg6cGFnZS1sb2FkaW5nLXN0YXJ0XCIsIChfaW5mbykgPT4gdG9wYmFyLnNob3coMzAwKSk7XG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBoeDpwYWdlLWxvYWRpbmctc3RvcFwiLCAoX2luZm8pID0+IHRvcGJhci5oaWRlKCkpO1xuXG4vLyBjb25uZWN0IGlmIHRoZXJlIGFyZSBhbnkgTGl2ZVZpZXdzIG9uIHRoZSBwYWdlXG5saXZlU29ja2V0LmNvbm5lY3QoKTtcblxuLy8gZXhwb3NlIGxpdmVTb2NrZXQgb24gd2luZG93IGZvciB3ZWIgY29uc29sZSBkZWJ1ZyBsb2dzIGFuZCBsYXRlbmN5IHNpbXVsYXRpb246XG4vLyA+PiBsaXZlU29ja2V0LmVuYWJsZURlYnVnKClcbi8vID4+IGxpdmVTb2NrZXQuZW5hYmxlTGF0ZW5jeVNpbSgxMDAwKSAgLy8gZW5hYmxlZCBmb3IgZHVyYXRpb24gb2YgYnJvd3NlciBzZXNzaW9uXG4vLyA+PiBsaXZlU29ja2V0LmRpc2FibGVMYXRlbmN5U2ltKClcbndpbmRvdy5saXZlU29ja2V0ID0gbGl2ZVNvY2tldDtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFNQSxPQUFDLFNBQVVBLFNBQVFDLFdBQVU7QUFDM0I7QUFHQSxTQUFDLFdBQVk7QUFDWCxjQUFJLFdBQVc7QUFDZixjQUFJLFVBQVUsQ0FBQyxNQUFNLE9BQU8sVUFBVSxHQUFHO0FBQ3pDLG1CQUFTLElBQUksR0FBRyxJQUFJLFFBQVEsVUFBVSxDQUFDRCxRQUFPLHVCQUF1QixFQUFFLEdBQUc7QUFDeEUsWUFBQUEsUUFBTyx3QkFDTEEsUUFBTyxRQUFRLENBQUMsSUFBSSx1QkFBdUI7QUFDN0MsWUFBQUEsUUFBTyx1QkFDTEEsUUFBTyxRQUFRLENBQUMsSUFBSSxzQkFBc0IsS0FDMUNBLFFBQU8sUUFBUSxDQUFDLElBQUksNkJBQTZCO0FBQUEsVUFDckQ7QUFDQSxjQUFJLENBQUNBLFFBQU87QUFDVixZQUFBQSxRQUFPLHdCQUF3QixTQUFVLFVBQVUsU0FBUztBQUMxRCxrQkFBSSxZQUFXLG9CQUFJLEtBQUssR0FBRSxRQUFRO0FBQ2xDLGtCQUFJLGFBQWEsS0FBSyxJQUFJLEdBQUcsTUFBTSxXQUFXLFNBQVM7QUFDdkQsa0JBQUksS0FBS0EsUUFBTyxXQUFXLFdBQVk7QUFDckMseUJBQVMsV0FBVyxVQUFVO0FBQUEsY0FDaEMsR0FBRyxVQUFVO0FBQ2IseUJBQVcsV0FBVztBQUN0QixxQkFBTztBQUFBLFlBQ1Q7QUFDRixjQUFJLENBQUNBLFFBQU87QUFDVixZQUFBQSxRQUFPLHVCQUF1QixTQUFVLElBQUk7QUFDMUMsMkJBQWEsRUFBRTtBQUFBLFlBQ2pCO0FBQUEsUUFDSixHQUFHO0FBRUgsWUFBSSxRQUNGLGlCQUNB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
