!function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return t[r].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var r=window.webpackJsonp;window.webpackJsonp=function(n,i){for(var s,u,a=0,c=[];a<n.length;a++)u=n[a],o[u]&&c.push.apply(c,o[u]),o[u]=0;for(s in i)t[s]=i[s];for(r&&r(n,i);c.length;)c.shift().call(null,e)};var n={},o={0:0};return e.e=function(t,r){if(0===o[t])return r.call(null,e);if(void 0!==o[t])o[t].push(r);else{o[t]=[r];var n=document.getElementsByTagName("head")[0],i=document.createElement("script");i.type="text/javascript",i.charset="utf-8",i.async=!0,i.src=e.p+""+t+"."+({1:"view"}[t]||t)+".js",n.appendChild(i)}},e.m=t,e.c=n,e.p="./js/",e(0)}([function(t,e,r){"use strict";r(1)},function(t,e,r){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var o=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}();r(2),r(6);var i=function(){function t(){var e=this;n(this,t),this.container=document.querySelector(".view"),this.sources=["bbc-news","bloomberg","cnn","google-news","hacker-news","mtv-news","national-geographic","polygon","reddit-r-all","reuters","techradar","the-guardian-uk","the-new-york-times","the-telegraph","the-washington-post","time","usa-today"],document.querySelector(".nav").innerHTML=this.sources.map(function(t){return'<a href="#'+t+'">'+t+"</a>"}).join(""),window.addEventListener("hashchange",function(){e.update()},!0),this.update()}return o(t,[{key:"render",value:function(t){var e=this;this.cssLoad(),this.container.innerHTML=t.map(function(t){return'\n\t\t\t<div class="item">\n\t\t\t\t<a href="'+t.url+'">\n\t\t\t\t\t<div class="vis"><div class="img"><img src="'+(t.urlToImage||"images/no_photo.png")+'" /></div></div>\n\t\t\t\t\t<h2>'+t.title+'</h2>\n\t\t\t\t\t<div class="pubdate">'+e.dateToStr(t.publishedAt)+"</div>\n\t\t\t\t\t<p>"+(t.description||"")+"</p>\n\t\t\t\t</a>\n\t\t\t</div>"}).join("")}},{key:"getSource",value:function(){if(window.location.hash){var t=window.location.hash.substring(1);return this.sources.indexOf(t)!==-1?t:null}return null}},{key:"update",value:function(t){t=t||this.getSource()||"google-news",document.querySelector(".header h1").setAttribute("data-source",t),this.container.innerHTML="Loading data... Please wait.";var e=new s;e.get(t,this.render.bind(this))}},{key:"dateToStr",value:function(t){function e(t){return t>9?t:"0"+t}if(!t)return"";"string"!=typeof t&&"number"!=typeof t||(t=new Date(t));var r=t.getFullYear();return r+="-"+e(t.getMonth()+1),r+="-"+e(t.getDate()),r+=" "+e(t.getHours()),r+=":"+e(t.getMinutes())}},{key:"cssLoad",value:function(){r.e(1,function(){r(7)})}}]),t}(),s=function(){function t(){n(this,t),this.apikey="d3a3b4d86b5d48dd98a34ed0bcebfa07"}return o(t,[{key:"get",value:function(t,e){fetch("https://newsapi.org/v1/articles?source="+t+"&apiKey="+this.apikey).then(function(t){return t.json()}).then(function(t){console.log(t),"function"==typeof e&&e(t.articles)})}}]),t}();document.addEventListener("DOMContentLoaded",function(){new i})},function(t,e,r){"use strict";t.exports=r(3).polyfill()},function(t,e,r){(function(e,n){!function(e,r){t.exports=r()}(this,function(){"use strict";function t(t){return"function"==typeof t||"object"==typeof t&&null!==t}function o(t){return"function"==typeof t}function i(t){z=t}function s(t){W=t}function u(){return function(){return e.nextTick(l)}}function a(){return"undefined"!=typeof X?function(){X(l)}:h()}function c(){var t=0,e=new Z(l),r=document.createTextNode("");return e.observe(r,{characterData:!0}),function(){r.data=t=++t%2}}function f(){var t=new MessageChannel;return t.port1.onmessage=l,function(){return t.port2.postMessage(0)}}function h(){var t=setTimeout;return function(){return t(l,1)}}function l(){for(var t=0;t<V;t+=2){var e=rt[t],r=rt[t+1];e(r),rt[t]=void 0,rt[t+1]=void 0}V=0}function d(){try{var t=r(5);return X=t.runOnLoop||t.runOnContext,a()}catch(t){return h()}}function p(t,e){var r=arguments,n=this,o=new this.constructor(v);void 0===o[ot]&&F(o);var i=n._state;return i?!function(){var t=r[i-1];W(function(){return k(i,o,t,n._result)})}():j(n,o,t,e),o}function y(t){var e=this;if(t&&"object"==typeof t&&t.constructor===e)return t;var r=new e(v);return E(r,t),r}function v(){}function b(){return new TypeError("You cannot resolve a promise with itself")}function m(){return new TypeError("A promises callback cannot return that same promise.")}function w(t){try{return t.then}catch(t){return at.error=t,at}}function _(t,e,r,n){try{t.call(e,r,n)}catch(t){return t}}function g(t,e,r){W(function(t){var n=!1,o=_(r,e,function(r){n||(n=!0,e!==r?E(t,r):B(t,r))},function(e){n||(n=!0,P(t,e))},"Settle: "+(t._label||" unknown promise"));!n&&o&&(n=!0,P(t,o))},t)}function T(t,e){e._state===st?B(t,e._result):e._state===ut?P(t,e._result):j(e,void 0,function(e){return E(t,e)},function(e){return P(t,e)})}function A(t,e,r){e.constructor===t.constructor&&r===p&&e.constructor.resolve===y?T(t,e):r===at?P(t,at.error):void 0===r?B(t,e):o(r)?g(t,e,r):B(t,e)}function E(e,r){e===r?P(e,b()):t(r)?A(e,r,w(r)):B(e,r)}function x(t){t._onerror&&t._onerror(t._result),S(t)}function B(t,e){t._state===it&&(t._result=e,t._state=st,0!==t._subscribers.length&&W(S,t))}function P(t,e){t._state===it&&(t._state=ut,t._result=e,W(x,t))}function j(t,e,r,n){var o=t._subscribers,i=o.length;t._onerror=null,o[i]=e,o[i+st]=r,o[i+ut]=n,0===i&&t._state&&W(S,t)}function S(t){var e=t._subscribers,r=t._state;if(0!==e.length){for(var n=void 0,o=void 0,i=t._result,s=0;s<e.length;s+=3)n=e[s],o=e[s+r],n?k(r,n,o,i):o(i);t._subscribers.length=0}}function O(){this.error=null}function U(t,e){try{return t(e)}catch(t){return ct.error=t,ct}}function k(t,e,r,n){var i=o(r),s=void 0,u=void 0,a=void 0,c=void 0;if(i){if(s=U(r,n),s===ct?(c=!0,u=s.error,s=null):a=!0,e===s)return void P(e,m())}else s=n,a=!0;e._state!==it||(i&&a?E(e,s):c?P(e,u):t===st?B(e,s):t===ut&&P(e,s))}function L(t,e){try{e(function(e){E(t,e)},function(e){P(t,e)})}catch(e){P(t,e)}}function D(){return ft++}function F(t){t[ot]=ft++,t._state=void 0,t._result=void 0,t._subscribers=[]}function I(t,e){this._instanceConstructor=t,this.promise=new t(v),this.promise[ot]||F(this.promise),K(e)?(this._input=e,this.length=e.length,this._remaining=e.length,this._result=new Array(this.length),0===this.length?B(this.promise,this._result):(this.length=this.length||0,this._enumerate(),0===this._remaining&&B(this.promise,this._result))):P(this.promise,R())}function R(){return new Error("Array Methods must be provided an Array")}function C(t){return new I(this,t).promise}function M(t){var e=this;return new e(K(t)?function(r,n){for(var o=t.length,i=0;i<o;i++)e.resolve(t[i]).then(r,n)}:function(t,e){return e(new TypeError("You must pass an array to race."))})}function H(t){var e=this,r=new e(v);return P(r,t),r}function q(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}function N(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}function G(t){this[ot]=D(),this._result=this._state=void 0,this._subscribers=[],v!==t&&("function"!=typeof t&&q(),this instanceof G?L(this,t):N())}function Y(){var t=void 0;if("undefined"!=typeof n)t=n;else if("undefined"!=typeof self)t=self;else try{t=Function("return this")()}catch(t){throw new Error("polyfill failed because global object is unavailable in this environment")}var e=t.Promise;if(e){var r=null;try{r=Object.prototype.toString.call(e.resolve())}catch(t){}if("[object Promise]"===r&&!e.cast)return}t.Promise=G}var J=void 0;J=Array.isArray?Array.isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)};var K=J,V=0,X=void 0,z=void 0,W=function(t,e){rt[V]=t,rt[V+1]=e,V+=2,2===V&&(z?z(l):nt())},$="undefined"!=typeof window?window:void 0,Q=$||{},Z=Q.MutationObserver||Q.WebKitMutationObserver,tt="undefined"==typeof self&&"undefined"!=typeof e&&"[object process]"==={}.toString.call(e),et="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel,rt=new Array(1e3),nt=void 0;nt=tt?u():Z?c():et?f():void 0===$?d():h();var ot=Math.random().toString(36).substring(16),it=void 0,st=1,ut=2,at=new O,ct=new O,ft=0;return I.prototype._enumerate=function(){for(var t=this.length,e=this._input,r=0;this._state===it&&r<t;r++)this._eachEntry(e[r],r)},I.prototype._eachEntry=function(t,e){var r=this._instanceConstructor,n=r.resolve;if(n===y){var o=w(t);if(o===p&&t._state!==it)this._settledAt(t._state,e,t._result);else if("function"!=typeof o)this._remaining--,this._result[e]=t;else if(r===G){var i=new r(v);A(i,t,o),this._willSettleAt(i,e)}else this._willSettleAt(new r(function(e){return e(t)}),e)}else this._willSettleAt(n(t),e)},I.prototype._settledAt=function(t,e,r){var n=this.promise;n._state===it&&(this._remaining--,t===ut?P(n,r):this._result[e]=r),0===this._remaining&&B(n,this._result)},I.prototype._willSettleAt=function(t,e){var r=this;j(t,void 0,function(t){return r._settledAt(st,e,t)},function(t){return r._settledAt(ut,e,t)})},G.all=C,G.race=M,G.resolve=y,G.reject=H,G._setScheduler=i,G._setAsap=s,G._asap=W,G.prototype={constructor:G,then:p,catch:function(t){return this.then(null,t)}},G.polyfill=Y,G.Promise=G,G})}).call(e,r(4),function(){return this}())},function(t,e){function r(){throw new Error("setTimeout has not been defined")}function n(){throw new Error("clearTimeout has not been defined")}function o(t){if(f===setTimeout)return setTimeout(t,0);if((f===r||!f)&&setTimeout)return f=setTimeout,setTimeout(t,0);try{return f(t,0)}catch(e){try{return f.call(null,t,0)}catch(e){return f.call(this,t,0)}}}function i(t){if(h===clearTimeout)return clearTimeout(t);if((h===n||!h)&&clearTimeout)return h=clearTimeout,clearTimeout(t);try{return h(t)}catch(e){try{return h.call(null,t)}catch(e){return h.call(this,t)}}}function s(){y&&d&&(y=!1,d.length?p=d.concat(p):v=-1,p.length&&u())}function u(){if(!y){var t=o(s);y=!0;for(var e=p.length;e;){for(d=p,p=[];++v<e;)d&&d[v].run();v=-1,e=p.length}d=null,y=!1,i(t)}}function a(t,e){this.fun=t,this.array=e}function c(){}var f,h,l=t.exports={};!function(){try{f="function"==typeof setTimeout?setTimeout:r}catch(t){f=r}try{h="function"==typeof clearTimeout?clearTimeout:n}catch(t){h=n}}();var d,p=[],y=!1,v=-1;l.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)e[r-1]=arguments[r];p.push(new a(t,e)),1!==p.length||y||o(u)},a.prototype.run=function(){this.fun.apply(null,this.array)},l.title="browser",l.browser=!0,l.env={},l.argv=[],l.version="",l.versions={},l.on=c,l.addListener=c,l.once=c,l.off=c,l.removeListener=c,l.removeAllListeners=c,l.emit=c,l.binding=function(t){throw new Error("process.binding is not supported")},l.cwd=function(){return"/"},l.chdir=function(t){throw new Error("process.chdir is not supported")},l.umask=function(){return 0}},function(t,e){},function(t,e){!function(t){"use strict";function e(t){if("string"!=typeof t&&(t=String(t)),/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(t))throw new TypeError("Invalid character in header field name");return t.toLowerCase()}function r(t){return"string"!=typeof t&&(t=String(t)),t}function n(t){var e={next:function(){var e=t.shift();return{done:void 0===e,value:e}}};return b.iterable&&(e[Symbol.iterator]=function(){return e}),e}function o(t){this.map={},t instanceof o?t.forEach(function(t,e){this.append(e,t)},this):t&&Object.getOwnPropertyNames(t).forEach(function(e){this.append(e,t[e])},this)}function i(t){return t.bodyUsed?Promise.reject(new TypeError("Already read")):void(t.bodyUsed=!0)}function s(t){return new Promise(function(e,r){t.onload=function(){e(t.result)},t.onerror=function(){r(t.error)}})}function u(t){var e=new FileReader,r=s(e);return e.readAsArrayBuffer(t),r}function a(t){var e=new FileReader,r=s(e);return e.readAsText(t),r}function c(t){for(var e=new Uint8Array(t),r=new Array(e.length),n=0;n<e.length;n++)r[n]=String.fromCharCode(e[n]);return r.join("")}function f(t){if(t.slice)return t.slice(0);var e=new Uint8Array(t.byteLength);return e.set(new Uint8Array(t)),e.buffer}function h(){return this.bodyUsed=!1,this._initBody=function(t){if(this._bodyInit=t,t)if("string"==typeof t)this._bodyText=t;else if(b.blob&&Blob.prototype.isPrototypeOf(t))this._bodyBlob=t;else if(b.formData&&FormData.prototype.isPrototypeOf(t))this._bodyFormData=t;else if(b.searchParams&&URLSearchParams.prototype.isPrototypeOf(t))this._bodyText=t.toString();else if(b.arrayBuffer&&b.blob&&w(t))this._bodyArrayBuffer=f(t.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer]);else{if(!b.arrayBuffer||!ArrayBuffer.prototype.isPrototypeOf(t)&&!_(t))throw new Error("unsupported BodyInit type");this._bodyArrayBuffer=f(t)}else this._bodyText="";this.headers.get("content-type")||("string"==typeof t?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):b.searchParams&&URLSearchParams.prototype.isPrototypeOf(t)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},b.blob&&(this.blob=function(){var t=i(this);if(t)return t;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?i(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(u)}),this.text=function(){var t=i(this);if(t)return t;if(this._bodyBlob)return a(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(c(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},b.formData&&(this.formData=function(){return this.text().then(p)}),this.json=function(){return this.text().then(JSON.parse)},this}function l(t){var e=t.toUpperCase();return g.indexOf(e)>-1?e:t}function d(t,e){e=e||{};var r=e.body;if("string"==typeof t)this.url=t;else{if(t.bodyUsed)throw new TypeError("Already read");this.url=t.url,this.credentials=t.credentials,e.headers||(this.headers=new o(t.headers)),this.method=t.method,this.mode=t.mode,r||null==t._bodyInit||(r=t._bodyInit,t.bodyUsed=!0)}if(this.credentials=e.credentials||this.credentials||"omit",!e.headers&&this.headers||(this.headers=new o(e.headers)),this.method=l(e.method||this.method||"GET"),this.mode=e.mode||this.mode||null,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&r)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(r)}function p(t){var e=new FormData;return t.trim().split("&").forEach(function(t){if(t){var r=t.split("="),n=r.shift().replace(/\+/g," "),o=r.join("=").replace(/\+/g," ");e.append(decodeURIComponent(n),decodeURIComponent(o))}}),e}function y(t){var e=new o;return t.split("\r\n").forEach(function(t){var r=t.split(":"),n=r.shift().trim();if(n){var o=r.join(":").trim();e.append(n,o)}}),e}function v(t,e){e||(e={}),this.type="default",this.status="status"in e?e.status:200,this.ok=this.status>=200&&this.status<300,this.statusText="statusText"in e?e.statusText:"OK",this.headers=new o(e.headers),this.url=e.url||"",this._initBody(t)}if(!t.fetch){var b={searchParams:"URLSearchParams"in t,iterable:"Symbol"in t&&"iterator"in Symbol,blob:"FileReader"in t&&"Blob"in t&&function(){try{return new Blob,!0}catch(t){return!1}}(),formData:"FormData"in t,arrayBuffer:"ArrayBuffer"in t};if(b.arrayBuffer)var m=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],w=function(t){return t&&DataView.prototype.isPrototypeOf(t)},_=ArrayBuffer.isView||function(t){return t&&m.indexOf(Object.prototype.toString.call(t))>-1};o.prototype.append=function(t,n){t=e(t),n=r(n);var o=this.map[t];this.map[t]=o?o+","+n:n},o.prototype.delete=function(t){delete this.map[e(t)]},o.prototype.get=function(t){return t=e(t),this.has(t)?this.map[t]:null},o.prototype.has=function(t){return this.map.hasOwnProperty(e(t))},o.prototype.set=function(t,n){this.map[e(t)]=r(n)},o.prototype.forEach=function(t,e){for(var r in this.map)this.map.hasOwnProperty(r)&&t.call(e,this.map[r],r,this)},o.prototype.keys=function(){var t=[];return this.forEach(function(e,r){t.push(r)}),n(t)},o.prototype.values=function(){var t=[];return this.forEach(function(e){t.push(e)}),n(t)},o.prototype.entries=function(){var t=[];return this.forEach(function(e,r){t.push([r,e])}),n(t)},b.iterable&&(o.prototype[Symbol.iterator]=o.prototype.entries);var g=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];d.prototype.clone=function(){return new d(this,{body:this._bodyInit})},h.call(d.prototype),h.call(v.prototype),v.prototype.clone=function(){return new v(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new o(this.headers),url:this.url})},v.error=function(){var t=new v(null,{status:0,statusText:""});return t.type="error",t};var T=[301,302,303,307,308];v.redirect=function(t,e){if(T.indexOf(e)===-1)throw new RangeError("Invalid status code");return new v(null,{status:e,headers:{location:t}})},t.Headers=o,t.Request=d,t.Response=v,t.fetch=function(t,e){return new Promise(function(r,n){var o=new d(t,e),i=new XMLHttpRequest;i.onload=function(){var t={status:i.status,statusText:i.statusText,headers:y(i.getAllResponseHeaders()||"")};t.url="responseURL"in i?i.responseURL:t.headers.get("X-Request-URL");var e="response"in i?i.response:i.responseText;r(new v(e,t))},i.onerror=function(){n(new TypeError("Network request failed"))},i.ontimeout=function(){n(new TypeError("Network request failed"))},i.open(o.method,o.url,!0),"include"===o.credentials&&(i.withCredentials=!0),"responseType"in i&&b.blob&&(i.responseType="blob"),o.headers.forEach(function(t,e){i.setRequestHeader(e,t)}),i.send("undefined"==typeof o._bodyInit?null:o._bodyInit)})},t.fetch.polyfill=!0}}("undefined"!=typeof self?self:this)}]);