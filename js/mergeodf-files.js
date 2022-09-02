/*! For license information please see mergeodf-files.js.LICENSE.txt */
(()=>{var e,r,n={79753:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getRootUrl=t.generateFilePath=t.imagePath=t.generateUrl=t.generateOcsUrl=t.generateRemoteUrl=t.linkTo=void 0,r(32359);t.linkTo=(e,t)=>i(e,"",t);t.generateRemoteUrl=e=>window.location.protocol+"//"+window.location.host+(e=>o()+"/remote.php/"+e)(e);t.generateOcsUrl=(e,t,r)=>{const i=1===Object.assign({ocsVersion:2},r||{}).ocsVersion?1:2;return window.location.protocol+"//"+window.location.host+o()+"/ocs/v"+i+".php"+n(e,t,r)};const n=(e,t,r)=>{const n=Object.assign({escape:!0},r||{});return"/"!==e.charAt(0)&&(e="/"+e),i=(i=t||{})||{},e.replace(/{([^{}]*)}/g,(function(e,t){var r=i[t];return n.escape?"string"==typeof r||"number"==typeof r?encodeURIComponent(r.toString()):encodeURIComponent(e):"string"==typeof r||"number"==typeof r?r.toString():e}));var i};t.generateUrl=(e,t,r)=>{const i=Object.assign({noRewrite:!1},r||{});return!0!==OC.config.modRewriteWorking||i.noRewrite?o()+"/index.php"+n(e,t,r):o()+n(e,t,r)};t.imagePath=(e,t)=>-1===t.indexOf(".")?i(e,"img",t+".svg"):i(e,"img",t);const i=(e,t,r)=>{const n=-1!==OC.coreApps.indexOf(e);let i=o();return"php"!==r.substring(r.length-3)||n?"php"===r.substring(r.length-3)||n?(i+="settings"!==e&&"core"!==e&&"search"!==e||"ajax"!==t?"/":"/index.php/",n||(i+="apps/"),""!==e&&(i+=e+="/"),t&&(i+=t+"/"),i+=r):(i=OC.appswebroots[e],t&&(i+="/"+t+"/"),"/"!==i.substring(i.length-1)&&(i+="/"),i+=r):(i+="/index.php/apps/"+e,"index.php"!==r&&(i+="/",t&&(i+=encodeURI(t+"/")),i+=r)),i};t.generateFilePath=i;const o=()=>OC.webroot;t.getRootUrl=o},12310:(e,t,r)=>{"use strict";var n=r(35642).charAt;e.exports=function(e,t,r){return t+(r?n(e,t).length:1)}},96943:(e,t,r)=>{var n=r(57199);e.exports=function(e){if(!n(e))throw TypeError(String(e)+" is not an object");return e}},33893:(e,t,r)=>{var n=r(18947),i=r(79917),o=r(3242),a=function(e){return function(t,r,a){var s,l=n(t),c=i(l.length),u=o(a,c);if(e&&r!=r){for(;c>u;)if((s=l[u++])!=s)return!0}else for(;c>u;u++)if((e||u in l)&&l[u]===r)return e||u||0;return!e&&-1}};e.exports={includes:a(!0),indexOf:a(!1)}},61672:e=>{var t={}.toString;e.exports=function(e){return t.call(e).slice(8,-1)}},22530:(e,t,r)=>{var n=r(90918),i=r(39652),o=r(63369),a=r(54769);e.exports=function(e,t){for(var r=i(t),s=a.f,l=o.f,c=0;c<r.length;c++){var u=r[c];n(e,u)||s(e,u,l(t,u))}}},78816:(e,t,r)=>{var n=r(19300),i=r(54769),o=r(33535);e.exports=n?function(e,t,r){return i.f(e,t,o(1,r))}:function(e,t,r){return e[t]=r,e}},33535:e=>{e.exports=function(e,t){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}}},19300:(e,t,r)=>{var n=r(83349);e.exports=!n((function(){return 7!=Object.defineProperty({},1,{get:function(){return 7}})[1]}))},25085:(e,t,r)=>{var n=r(43005),i=r(57199),o=n.document,a=i(o)&&i(o.createElement);e.exports=function(e){return a?o.createElement(e):{}}},73785:(e,t,r)=>{var n=r(22679);e.exports=n("navigator","userAgent")||""},50218:(e,t,r)=>{var n,i,o=r(43005),a=r(73785),s=o.process,l=s&&s.versions,c=l&&l.v8;c?i=(n=c.split("."))[0]<4?1:n[0]+n[1]:a&&(!(n=a.match(/Edge\/(\d+)/))||n[1]>=74)&&(n=a.match(/Chrome\/(\d+)/))&&(i=n[1]),e.exports=i&&+i},38063:e=>{e.exports=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"]},30935:(e,t,r)=>{var n=r(43005),i=r(63369).f,o=r(78816),a=r(35140),s=r(79398),l=r(22530),c=r(94049);e.exports=function(e,t){var r,u,p,f,d,g=e.target,h=e.global,v=e.stat;if(r=h?n:v?n[g]||s(g,{}):(n[g]||{}).prototype)for(u in t){if(f=t[u],p=e.noTargetGet?(d=i(r,u))&&d.value:r[u],!c(h?u:g+(v?".":"#")+u,e.forced)&&void 0!==p){if(typeof f==typeof p)continue;l(f,p)}(e.sham||p&&p.sham)&&o(f,"sham",!0),a(r,u,f,e)}}},83349:e=>{e.exports=function(e){try{return!!e()}catch(e){return!0}}},93748:(e,t,r)=>{"use strict";r(80500);var n=r(35140),i=r(45960),o=r(83349),a=r(58064),s=r(78816),l=a("species"),c=RegExp.prototype;e.exports=function(e,t,r,u){var p=a(e),f=!o((function(){var t={};return t[p]=function(){return 7},7!=""[e](t)})),d=f&&!o((function(){var t=!1,r=/a/;return"split"===e&&((r={}).constructor={},r.constructor[l]=function(){return r},r.flags="",r[p]=/./[p]),r.exec=function(){return t=!0,null},r[p](""),!t}));if(!f||!d||r){var g=/./[p],h=t(p,""[e],(function(e,t,r,n,o){var a=t.exec;return a===i||a===c.exec?f&&!o?{done:!0,value:g.call(t,r,n)}:{done:!0,value:e.call(r,t,n)}:{done:!1}}));n(String.prototype,e,h[0]),n(c,p,h[1])}u&&s(c[p],"sham",!0)}},22679:(e,t,r)=>{var n=r(21146),i=r(43005),o=function(e){return"function"==typeof e?e:void 0};e.exports=function(e,t){return arguments.length<2?o(n[e])||o(i[e]):n[e]&&n[e][t]||i[e]&&i[e][t]}},70572:(e,t,r)=>{var n=r(44561),i=Math.floor,o="".replace,a=/\$([$&'`]|\d{1,2}|<[^>]*>)/g,s=/\$([$&'`]|\d{1,2})/g;e.exports=function(e,t,r,l,c,u){var p=r+e.length,f=l.length,d=s;return void 0!==c&&(c=n(c),d=a),o.call(u,d,(function(n,o){var a;switch(o.charAt(0)){case"$":return"$";case"&":return e;case"`":return t.slice(0,r);case"'":return t.slice(p);case"<":a=c[o.slice(1,-1)];break;default:var s=+o;if(0===s)return n;if(s>f){var u=i(s/10);return 0===u?n:u<=f?void 0===l[u-1]?o.charAt(1):l[u-1]+o.charAt(1):n}a=l[s-1]}return void 0===a?"":a}))}},43005:(e,t,r)=>{var n=function(e){return e&&e.Math==Math&&e};e.exports=n("object"==typeof globalThis&&globalThis)||n("object"==typeof window&&window)||n("object"==typeof self&&self)||n("object"==typeof r.g&&r.g)||function(){return this}()||Function("return this")()},90918:(e,t,r)=>{var n=r(44561),i={}.hasOwnProperty;e.exports=Object.hasOwn||function(e,t){return i.call(n(e),t)}},51418:e=>{e.exports={}},14922:(e,t,r)=>{var n=r(22679);e.exports=n("document","documentElement")},3723:(e,t,r)=>{var n=r(19300),i=r(83349),o=r(25085);e.exports=!n&&!i((function(){return 7!=Object.defineProperty(o("div"),"a",{get:function(){return 7}}).a}))},23833:(e,t,r)=>{var n=r(83349),i=r(61672),o="".split;e.exports=n((function(){return!Object("z").propertyIsEnumerable(0)}))?function(e){return"String"==i(e)?o.call(e,""):Object(e)}:Object},739:(e,t,r)=>{var n=r(57454),i=Function.toString;"function"!=typeof n.inspectSource&&(n.inspectSource=function(e){return i.call(e)}),e.exports=n.inspectSource},11864:(e,t,r)=>{var n,i,o,a=r(18442),s=r(43005),l=r(57199),c=r(78816),u=r(90918),p=r(57454),f=r(82051),d=r(51418),g="Object already initialized",h=s.WeakMap;if(a||p.state){var v=p.state||(p.state=new h),m=v.get,y=v.has,O=v.set;n=function(e,t){if(y.call(v,e))throw new TypeError(g);return t.facade=e,O.call(v,e,t),t},i=function(e){return m.call(v,e)||{}},o=function(e){return y.call(v,e)}}else{var b=f("state");d[b]=!0,n=function(e,t){if(u(e,b))throw new TypeError(g);return t.facade=e,c(e,b,t),t},i=function(e){return u(e,b)?e[b]:{}},o=function(e){return u(e,b)}}e.exports={set:n,get:i,has:o,enforce:function(e){return o(e)?i(e):n(e,{})},getterFor:function(e){return function(t){var r;if(!l(t)||(r=i(t)).type!==e)throw TypeError("Incompatible receiver, "+e+" required");return r}}}},94049:(e,t,r)=>{var n=r(83349),i=/#|\.prototype\./,o=function(e,t){var r=s[a(e)];return r==c||r!=l&&("function"==typeof t?n(t):!!t)},a=o.normalize=function(e){return String(e).replace(i,".").toLowerCase()},s=o.data={},l=o.NATIVE="N",c=o.POLYFILL="P";e.exports=o},57199:e=>{e.exports=function(e){return"object"==typeof e?null!==e:"function"==typeof e}},58057:e=>{e.exports=!1},19950:(e,t,r)=>{var n=r(50218),i=r(83349);e.exports=!!Object.getOwnPropertySymbols&&!i((function(){var e=Symbol();return!String(e)||!(Object(e)instanceof Symbol)||!Symbol.sham&&n&&n<41}))},18442:(e,t,r)=>{var n=r(43005),i=r(739),o=n.WeakMap;e.exports="function"==typeof o&&/native code/.test(i(o))},2863:(e,t,r)=>{var n,i=r(96943),o=r(14229),a=r(38063),s=r(51418),l=r(14922),c=r(25085),u=r(82051),p=u("IE_PROTO"),f=function(){},d=function(e){return"<script>"+e+"</"+"script>"},g=function(){try{n=document.domain&&new ActiveXObject("htmlfile")}catch(e){}var e,t;g=n?function(e){e.write(d("")),e.close();var t=e.parentWindow.Object;return e=null,t}(n):((t=c("iframe")).style.display="none",l.appendChild(t),t.src=String("javascript:"),(e=t.contentWindow.document).open(),e.write(d("document.F=Object")),e.close(),e.F);for(var r=a.length;r--;)delete g.prototype[a[r]];return g()};s[p]=!0,e.exports=Object.create||function(e,t){var r;return null!==e?(f.prototype=i(e),r=new f,f.prototype=null,r[p]=e):r=g(),void 0===t?r:o(r,t)}},14229:(e,t,r)=>{var n=r(19300),i=r(54769),o=r(96943),a=r(30967);e.exports=n?Object.defineProperties:function(e,t){o(e);for(var r,n=a(t),s=n.length,l=0;s>l;)i.f(e,r=n[l++],t[r]);return e}},54769:(e,t,r)=>{var n=r(19300),i=r(3723),o=r(96943),a=r(87509),s=Object.defineProperty;t.f=n?s:function(e,t,r){if(o(e),t=a(t,!0),o(r),i)try{return s(e,t,r)}catch(e){}if("get"in r||"set"in r)throw TypeError("Accessors not supported");return"value"in r&&(e[t]=r.value),e}},63369:(e,t,r)=>{var n=r(19300),i=r(91183),o=r(33535),a=r(18947),s=r(87509),l=r(90918),c=r(3723),u=Object.getOwnPropertyDescriptor;t.f=n?u:function(e,t){if(e=a(e),t=s(t,!0),c)try{return u(e,t)}catch(e){}if(l(e,t))return o(!i.f.call(e,t),e[t])}},32787:(e,t,r)=>{var n=r(32307),i=r(38063).concat("length","prototype");t.f=Object.getOwnPropertyNames||function(e){return n(e,i)}},32659:(e,t)=>{t.f=Object.getOwnPropertySymbols},32307:(e,t,r)=>{var n=r(90918),i=r(18947),o=r(33893).indexOf,a=r(51418);e.exports=function(e,t){var r,s=i(e),l=0,c=[];for(r in s)!n(a,r)&&n(s,r)&&c.push(r);for(;t.length>l;)n(s,r=t[l++])&&(~o(c,r)||c.push(r));return c}},30967:(e,t,r)=>{var n=r(32307),i=r(38063);e.exports=Object.keys||function(e){return n(e,i)}},91183:(e,t)=>{"use strict";var r={}.propertyIsEnumerable,n=Object.getOwnPropertyDescriptor,i=n&&!r.call({1:2},1);t.f=i?function(e){var t=n(this,e);return!!t&&t.enumerable}:r},39652:(e,t,r)=>{var n=r(22679),i=r(32787),o=r(32659),a=r(96943);e.exports=n("Reflect","ownKeys")||function(e){var t=i.f(a(e)),r=o.f;return r?t.concat(r(e)):t}},21146:(e,t,r)=>{var n=r(43005);e.exports=n},35140:(e,t,r)=>{var n=r(43005),i=r(78816),o=r(90918),a=r(79398),s=r(739),l=r(11864),c=l.get,u=l.enforce,p=String(String).split("String");(e.exports=function(e,t,r,s){var l,c=!!s&&!!s.unsafe,f=!!s&&!!s.enumerable,d=!!s&&!!s.noTargetGet;"function"==typeof r&&("string"!=typeof t||o(r,"name")||i(r,"name",t),(l=u(r)).source||(l.source=p.join("string"==typeof t?t:""))),e!==n?(c?!d&&e[t]&&(f=!0):delete e[t],f?e[t]=r:i(e,t,r)):f?e[t]=r:a(t,r)})(Function.prototype,"toString",(function(){return"function"==typeof this&&c(this).source||s(this)}))},60681:(e,t,r)=>{var n=r(61672),i=r(45960);e.exports=function(e,t){var r=e.exec;if("function"==typeof r){var o=r.call(e,t);if("object"!=typeof o)throw TypeError("RegExp exec method returned something other than an Object or null");return o}if("RegExp"!==n(e))throw TypeError("RegExp#exec called on incompatible receiver");return i.call(e,t)}},45960:(e,t,r)=>{"use strict";var n,i,o=r(63807),a=r(95618),s=r(67857),l=r(2863),c=r(11864).get,u=r(24),p=r(27040),f=RegExp.prototype.exec,d=s("native-string-replace",String.prototype.replace),g=f,h=(n=/a/,i=/b*/g,f.call(n,"a"),f.call(i,"a"),0!==n.lastIndex||0!==i.lastIndex),v=a.UNSUPPORTED_Y||a.BROKEN_CARET,m=void 0!==/()??/.exec("")[1];(h||m||v||u||p)&&(g=function(e){var t,r,n,i,a,s,u,p=this,y=c(p),O=y.raw;if(O)return O.lastIndex=p.lastIndex,t=g.call(O,e),p.lastIndex=O.lastIndex,t;var b=y.groups,_=v&&p.sticky,x=o.call(p),P=p.source,C=0,A=e;if(_&&(-1===(x=x.replace("y","")).indexOf("g")&&(x+="g"),A=String(e).slice(p.lastIndex),p.lastIndex>0&&(!p.multiline||p.multiline&&"\n"!==e[p.lastIndex-1])&&(P="(?: "+P+")",A=" "+A,C++),r=new RegExp("^(?:"+P+")",x)),m&&(r=new RegExp("^"+P+"$(?!\\s)",x)),h&&(n=p.lastIndex),i=f.call(_?r:p,A),_?i?(i.input=i.input.slice(C),i[0]=i[0].slice(C),i.index=p.lastIndex,p.lastIndex+=i[0].length):p.lastIndex=0:h&&i&&(p.lastIndex=p.global?i.index+i[0].length:n),m&&i&&i.length>1&&d.call(i[0],r,(function(){for(a=1;a<arguments.length-2;a++)void 0===arguments[a]&&(i[a]=void 0)})),i&&b)for(i.groups=s=l(null),a=0;a<b.length;a++)s[(u=b[a])[0]]=i[u[1]];return i}),e.exports=g},63807:(e,t,r)=>{"use strict";var n=r(96943);e.exports=function(){var e=n(this),t="";return e.global&&(t+="g"),e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),e.dotAll&&(t+="s"),e.unicode&&(t+="u"),e.sticky&&(t+="y"),t}},95618:(e,t,r)=>{var n=r(83349),i=function(e,t){return RegExp(e,t)};t.UNSUPPORTED_Y=n((function(){var e=i("a","y");return e.lastIndex=2,null!=e.exec("abcd")})),t.BROKEN_CARET=n((function(){var e=i("^r","gy");return e.lastIndex=2,null!=e.exec("str")}))},24:(e,t,r)=>{var n=r(83349);e.exports=n((function(){var e=RegExp(".","string".charAt(0));return!(e.dotAll&&e.exec("\n")&&"s"===e.flags)}))},27040:(e,t,r)=>{var n=r(83349);e.exports=n((function(){var e=RegExp("(?<a>b)","string".charAt(5));return"b"!==e.exec("b").groups.a||"bc"!=="b".replace(e,"$<a>c")}))},1992:e=>{e.exports=function(e){if(null==e)throw TypeError("Can't call method on "+e);return e}},79398:(e,t,r)=>{var n=r(43005),i=r(78816);e.exports=function(e,t){try{i(n,e,t)}catch(r){n[e]=t}return t}},82051:(e,t,r)=>{var n=r(67857),i=r(38814),o=n("keys");e.exports=function(e){return o[e]||(o[e]=i(e))}},57454:(e,t,r)=>{var n=r(43005),i=r(79398),o="__core-js_shared__",a=n[o]||i(o,{});e.exports=a},67857:(e,t,r)=>{var n=r(58057),i=r(57454);(e.exports=function(e,t){return i[e]||(i[e]=void 0!==t?t:{})})("versions",[]).push({version:"3.15.0",mode:n?"pure":"global",copyright:"© 2021 Denis Pushkarev (zloirock.ru)"})},35642:(e,t,r)=>{var n=r(84064),i=r(1992),o=function(e){return function(t,r){var o,a,s=String(i(t)),l=n(r),c=s.length;return l<0||l>=c?e?"":void 0:(o=s.charCodeAt(l))<55296||o>56319||l+1===c||(a=s.charCodeAt(l+1))<56320||a>57343?e?s.charAt(l):o:e?s.slice(l,l+2):a-56320+(o-55296<<10)+65536}};e.exports={codeAt:o(!1),charAt:o(!0)}},3242:(e,t,r)=>{var n=r(84064),i=Math.max,o=Math.min;e.exports=function(e,t){var r=n(e);return r<0?i(r+t,0):o(r,t)}},18947:(e,t,r)=>{var n=r(23833),i=r(1992);e.exports=function(e){return n(i(e))}},84064:e=>{var t=Math.ceil,r=Math.floor;e.exports=function(e){return isNaN(e=+e)?0:(e>0?r:t)(e)}},79917:(e,t,r)=>{var n=r(84064),i=Math.min;e.exports=function(e){return e>0?i(n(e),9007199254740991):0}},44561:(e,t,r)=>{var n=r(1992);e.exports=function(e){return Object(n(e))}},87509:(e,t,r)=>{var n=r(57199);e.exports=function(e,t){if(!n(e))return e;var r,i;if(t&&"function"==typeof(r=e.toString)&&!n(i=r.call(e)))return i;if("function"==typeof(r=e.valueOf)&&!n(i=r.call(e)))return i;if(!t&&"function"==typeof(r=e.toString)&&!n(i=r.call(e)))return i;throw TypeError("Can't convert object to primitive value")}},38814:e=>{var t=0,r=Math.random();e.exports=function(e){return"Symbol("+String(void 0===e?"":e)+")_"+(++t+r).toString(36)}},93558:(e,t,r)=>{var n=r(19950);e.exports=n&&!Symbol.sham&&"symbol"==typeof Symbol.iterator},58064:(e,t,r)=>{var n=r(43005),i=r(67857),o=r(90918),a=r(38814),s=r(19950),l=r(93558),c=i("wks"),u=n.Symbol,p=l?u:u&&u.withoutSetter||a;e.exports=function(e){return o(c,e)&&(s||"string"==typeof c[e])||(s&&o(u,e)?c[e]=u[e]:c[e]=p("Symbol."+e)),c[e]}},80500:(e,t,r)=>{"use strict";var n=r(30935),i=r(45960);n({target:"RegExp",proto:!0,forced:/./.exec!==i},{exec:i})},32359:(e,t,r)=>{"use strict";var n=r(93748),i=r(83349),o=r(96943),a=r(79917),s=r(84064),l=r(1992),c=r(12310),u=r(70572),p=r(60681),f=r(58064)("replace"),d=Math.max,g=Math.min,h="$0"==="a".replace(/./,"$0"),v=!!/./[f]&&""===/./[f]("a","$0");n("replace",(function(e,t,r){var n=v?"$":"$0";return[function(e,r){var n=l(this),i=null==e?void 0:e[f];return void 0!==i?i.call(e,n,r):t.call(String(n),e,r)},function(e,i){if("string"==typeof i&&-1===i.indexOf(n)&&-1===i.indexOf("$<")){var l=r(t,this,e,i);if(l.done)return l.value}var f=o(this),h=String(e),v="function"==typeof i;v||(i=String(i));var m=f.global;if(m){var y=f.unicode;f.lastIndex=0}for(var O=[];;){var b=p(f,h);if(null===b)break;if(O.push(b),!m)break;""===String(b[0])&&(f.lastIndex=c(h,a(f.lastIndex),y))}for(var _,x="",P=0,C=0;C<O.length;C++){b=O[C];for(var A=String(b[0]),E=d(g(s(b.index),h.length),0),T=[],S=1;S<b.length;S++)T.push(void 0===(_=b[S])?_:String(_));var R=b.groups;if(v){var w=[A].concat(T,E,h);void 0!==R&&w.push(R);var I=String(i.apply(void 0,w))}else I=u(A,h,E,T,R,i);E>=P&&(x+=h.slice(P,E)+I,P=E+A.length)}return x+h.slice(P)}]}),!!i((function(){var e=/./;return e.exec=function(){var e=[];return e.groups={a:"7"},e},"7"!=="".replace(e,"$<a>")}))||!h||v)},5225:(e,t,r)=>{"use strict";r.d(t,{Z:()=>f});var n,i=r(10387),o=r(28074);function a(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function s(e){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var l={"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;","'":"&apos;"},c=function(e){e._client.getPropertyBody=function(e,t){var r,n=this.parseClarkNotation(e);if(r=this.xmlNamespaces[n.namespace]?this.xmlNamespaces[n.namespace]+":"+n.name:"x:"+n.name+' xmlns:x="'+n.namespace+'"',Array.isArray(t)){var i="";for(var o in t)Object.prototype.hasOwnProperty.call(t[o],"type")&&Object.prototype.hasOwnProperty.call(t[o],"data")?i+=this.getPropertyBody(t[o].type,t[o].data):i+=this.getPropertyBody(o,t[o]);return"      <"+r+">"+i+"</"+r+">"}if("object"===s(t)){var a="";if(Object.prototype.hasOwnProperty.call(t,"type")&&Object.prototype.hasOwnProperty.call(t,"data"))return this.getPropertyBody(t.type,t.data);for(var c in t)a+=this.getPropertyBody(c,t[c]);return"      <"+r+">"+a+"</"+r+">"}return"d:resourcetype"!==r&&(t=(""+t).replace(/[<>&"']/g,(function(e){return l[e]}))),"      <"+r+">"+t+"</"+r+">"},e._client._renderPropSet=function(e){var t="  <d:set>\n   <d:prop>\n";for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t+=this.getPropertyBody(r,e[r]));return t+="    </d:prop>\n",t+="  </d:set>\n"}},u=function(e){for(var t=[],r=0;r<e.length;r++){var n={mask:0,permissions:0};for(var i in e[r].children){var o=e[r].children[i];if(o.nodeName)switch(o.nodeName.split(":")[1]||""){case"acl-mapping-id":n.mappingId=o.textContent||o.text;break;case"acl-mapping-type":n.mappingType=o.textContent||o.text;break;case"acl-mapping-display-name":n.mappingDisplayName=o.textContent||o.text;break;case"acl-mask":n.mask=parseInt(o.textContent||o.text,10);break;case"acl-permissions":n.permissions=parseInt(o.textContent||o.text,10)}}t.push(n)}return t},p={attach:function(e){(n=e.filesClient).addFileInfoParser((function(e){var t={},r=e.propStat[0].properties,n=r[i.Z.GROUP_FOLDER_ID];void 0!==n&&(t.mergeODFId=n);var o=r[i.Z.PROPERTY_ACL_ENABLED];void 0!==o&&(t.aclEnabled=!!o);var a=r[i.Z.PROPERTY_ACL_CAN_MANAGE];void 0!==a&&(t.aclCanManage=!!a);var s=r[i.Z.PROPERTY_ACL_LIST]||[],l=r[i.Z.PROPERTY_INHERITED_ACL_LIST]||[];return t.acl=u(s),t.inheritedAcls=u(l),t.acl.map((function(e){var r=t.inheritedAcls.find((function(t){return t.mappingType===e.mappingType&&t.mappingId===e.mappingId}));return r&&(e.permissions=e.permissions&e.mask|r.permissions&~e.mask),e})),t})),c(n)}};!function(e){Object.assign(e.Files.Client,i.Z)}(window.OC),OC.Plugins.register("OCA.Files.FileList",p);const f=new(function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t,r,s;return t=e,(r=[{key:"propFind",value:function(e){return n.getFileInfo(e.path+"/"+e.name,{properties:[i.Z.PROPERTY_ACL_LIST,i.Z.PROPERTY_INHERITED_ACL_LIST,i.Z.GROUP_FOLDER_ID,i.Z.PROPERTY_ACL_ENABLED,i.Z.PROPERTY_ACL_CAN_MANAGE]}).then((function(e,t){if(t){var r={},n={};for(var i in t.acl){var a=new o.Z;a.fromValues(t.acl[i].mappingType,t.acl[i].mappingId,t.acl[i].mappingDisplayName,t.acl[i].mask,t.acl[i].permissions),r[a.getUniqueMappingIdentifier()]=a}for(var s in t.inheritedAcls){var l=new o.Z;l.fromValues(t.inheritedAcls[s].mappingType,t.inheritedAcls[s].mappingId,t.inheritedAcls[s].mappingDisplayName,t.inheritedAcls[s].mask,t.inheritedAcls[s].permissions,!0);var c=l.getUniqueMappingIdentifier();n[c]=l,null==r[c]&&(r[c]=l)}return{acls:Object.values(r),inheritedAclsById:n,aclEnabled:t.aclEnabled,aclCanManage:t.aclCanManage,mergeODFId:t.mergeODFId}}return null}))}},{key:"propPatch",value:function(e,t){var r=[];for(var o in t)r.push({type:i.Z.PROPERTY_ACL_ENTRY,data:t[o].getProperties()});var a={};return a[i.Z.PROPERTY_ACL_LIST]=r,n._client.propPatch(n._client.baseUrl+e.path.replace("#","%23")+"/"+encodeURIComponent(e.name),a)}}])&&a(t.prototype,r),s&&a(t,s),Object.defineProperty(t,"prototype",{writable:!1}),e}())},10387:(e,t,r)=>{"use strict";r.d(t,{Z:()=>n});const n={PROPERTY_ACL_LIST:"{"+OC.Files.Client.NS_NEXTCLOUD+"}acl-list",PROPERTY_ACL_ENTRY:"{"+OC.Files.Client.NS_NEXTCLOUD+"}acl",PROPERTY_ACL_MAPPING_TYPE:"{"+OC.Files.Client.NS_NEXTCLOUD+"}acl-mapping-type",PROPERTY_ACL_MAPPING_ID:"{"+OC.Files.Client.NS_NEXTCLOUD+"}acl-mapping-id",PROPERTY_ACL_MASK:"{"+OC.Files.Client.NS_NEXTCLOUD+"}acl-mask",PROPERTY_ACL_PERMISSIONS:"{"+OC.Files.Client.NS_NEXTCLOUD+"}acl-permissions",PROPERTY_ACL_ENABLED:"{"+OC.Files.Client.NS_NEXTCLOUD+"}acl-enabled",PROPERTY_ACL_CAN_MANAGE:"{"+OC.Files.Client.NS_NEXTCLOUD+"}acl-can-manage",PROPERTY_INHERITED_ACL_LIST:"{"+OC.Files.Client.NS_NEXTCLOUD+"}inherited-acl-list",GROUP_FOLDER_ID:"{"+OC.Files.Client.NS_NEXTCLOUD+"}merge-odf-id"}},28074:(e,t,r)=>{"use strict";r.d(t,{Z:()=>o});var n=r(10387);function i(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var o=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t,r,o;return t=e,(r=[{key:"fromProperties",value:function(e){this.mappingType=e[n.Z.PROPERTY_ACL_MAPPING_TYPE],this.mappingId=e[n.Z.PROPERTY_ACL_MAPPING_ID],this.mask=e[n.Z.PROPERTY_ACL_MASK],this.permissions=e[n.Z.PROPERTY_ACL_PERMISSIONS]}},{key:"fromValues",value:function(e,t,r){var n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:31,o=arguments.length>5&&void 0!==arguments[5]&&arguments[5];this.mappingType=e,this.mappingId=t,this.mappingDisplayName=r,this.mask=n,this.permissions=i,this.inherited=o}},{key:"getProperties",value:function(){var e={};return e[n.Z.PROPERTY_ACL_MAPPING_TYPE]=this.mappingType,e[n.Z.PROPERTY_ACL_MAPPING_ID]=this.mappingId,e[n.Z.PROPERTY_ACL_MASK]=this.mask,e[n.Z.PROPERTY_ACL_PERMISSIONS]=this.permissions,e}},{key:"getUniqueMappingIdentifier",value:function(){return this.mappingType+":"+this.mappingId}},{key:"clone",value:function(){var t=this,r=new e;return Object.getOwnPropertyNames(this).forEach((function(e){r[e]=t[e]})),r}}])&&i(t.prototype,r),o&&i(t,o),Object.defineProperty(t,"prototype",{writable:!1}),e}()}},i={};function o(e){var t=i[e];if(void 0!==t)return t.exports;var r=i[e]={id:e,exports:{}};return n[e].call(r.exports,r,r.exports,o),r.exports}o.m=n,o.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return o.d(t,{a:t}),t},o.d=(e,t)=>{for(var r in t)o.o(t,r)&&!o.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},o.f={},o.e=e=>Promise.all(Object.keys(o.f).reduce(((t,r)=>(o.f[r](e,t),t)),[])),o.u=e=>"mergeodf-"+e+".js?v="+{"vendors-node_modules_nextcloud_vue_dist_ncvuecomponents_js-node_modules_css-loader_dist_runti-78a4de":"ff91a3c8b59af7bc2f66",sharing:"3e1502824519beea21b6"}[e],o.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),e={},r="mergeodf:",o.l=(t,n,i,a)=>{if(e[t])e[t].push(n);else{var s,l;if(void 0!==i)for(var c=document.getElementsByTagName("script"),u=0;u<c.length;u++){var p=c[u];if(p.getAttribute("src")==t||p.getAttribute("data-webpack")==r+i){s=p;break}}s||(l=!0,(s=document.createElement("script")).charset="utf-8",s.timeout=120,o.nc&&s.setAttribute("nonce",o.nc),s.setAttribute("data-webpack",r+i),s.src=t),e[t]=[n];var f=(r,n)=>{s.onerror=s.onload=null,clearTimeout(d);var i=e[t];if(delete e[t],s.parentNode&&s.parentNode.removeChild(s),i&&i.forEach((e=>e(n))),r)return r(n)},d=setTimeout(f.bind(null,void 0,{type:"timeout",target:s}),12e4);s.onerror=f.bind(null,s.onerror),s.onload=f.bind(null,s.onload),l&&document.head.appendChild(s)}},o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.p="/apps/mergeodf/js/",(()=>{o.b=document.baseURI||self.location.href;var e={files:0};o.f.j=(t,r)=>{var n=o.o(e,t)?e[t]:void 0;if(0!==n)if(n)r.push(n[2]);else{var i=new Promise(((r,i)=>n=e[t]=[r,i]));r.push(n[2]=i);var a=o.p+o.u(t),s=new Error;o.l(a,(r=>{if(o.o(e,t)&&(0!==(n=e[t])&&(e[t]=void 0),n)){var i=r&&("load"===r.type?"missing":r.type),a=r&&r.target&&r.target.src;s.message="Loading chunk "+t+" failed.\n("+i+": "+a+")",s.name="ChunkLoadError",s.type=i,s.request=a,n[1](s)}}),"chunk-"+t,t)}};var t=(t,r)=>{var n,i,[a,s,l]=r,c=0;if(a.some((t=>0!==e[t]))){for(n in s)o.o(s,n)&&(o.m[n]=s[n]);if(l)l(o)}for(t&&t(r);c<a.length;c++)i=a[c],o.o(e,i)&&e[i]&&e[i][0](),e[i]=0},r=self.webpackChunkmergeodf=self.webpackChunkmergeodf||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})(),(()=>{"use strict";var e=o(79753);o(5225);o.nc=btoa(OC.requestToken),o.p=OC.linkTo("mergeodf","js/"),window.addEventListener("DOMContentLoaded",(function(){var t,r;OCA.Theming?OC.MimeType._mimeTypeIcons["dir-mergeodf"]=(0,e.generateUrl)("/apps/theming/img/mergeodf/folder-group.svg?v="+OCA.Theming.cacheBuster):OC.MimeType._mimeTypeIcons["dir-mergeodf"]=(0,e.imagePath)("mergeodf","folder-group"),null!==(t=OCA)&&void 0!==t&&null!==(r=t.Sharing)&&void 0!==r&&r.ShareTabSections&&Promise.all([o.e("vendors-node_modules_nextcloud_vue_dist_ncvuecomponents_js-node_modules_css-loader_dist_runti-78a4de"),o.e("sharing")]).then(o.bind(o,363)).then((function(e){OCA.Sharing.ShareTabSections.registerSection((function(t,r){if("mergeodf"===r.mountType)return e.default}))}))}))})(),function(e){e.Files.MergeODFPlugin={name:"MergeODF",mergeodfFileList:null,attach:function(){var e=this;$("#app-content-mergeodflist").on("show.plugin-mergeodf",(function(t){e.showFileList($(t.target))})),$("#app-content-mergeodflist").on("hide.plugin-mergeodf",(function(){e.hideFileList()}))},detach:function(){this.mergeodfFileList&&(this.mergeodfFileList.destroy(),e.Files.fileActions.off("setDefault.plugin-mergeodf",this._onActionsUpdated),e.Files.fileActions.off("registerAction.plugin-mergeodf",this._onActionsUpdated),$("#app-content-mergeodflist").off(".plugin-mergeodf"),this.mergeodfFileList=null)},showFileList:function(e){return this.mergeodfFileList||(this.mergeodfFileList=this._createMergeODFFileList(e)),this.mergeodfFileList},hideFileList:function(){this.mergeodfFileList&&this.mergeodfFileList.$fileList.empty()},_createMergeODFFileList:function(t){var r=this._createFileActions();return new e.Files.MergeODFFileList(t,{fileActions:r,shown:!0})},_createFileActions:function(){var t=new e.Files.FileActions;return t.registerDefaultActions(),t.merge(e.Files.fileActions),this._globalActionsInitialized||(this._onActionsUpdated=_.bind(this._onActionsUpdated,this),e.Files.fileActions.on("setDefault.plugin-mergeodf",this._onActionsUpdated),e.Files.fileActions.on("registerAction.plugin-mergeodf",this._onActionsUpdated),this._globalActionsInitialized=!0),t.register("dir","Open",OC.PERMISSION_READ,"",(function(t,r){e.Files.App.setActiveView("files",{silent:!0}),e.Files.App.fileList.changeDirectory(OC.joinPaths(r.$file.attr("data-path"),t),!0,!0)})),t.setDefault("dir","Open"),t},_onActionsUpdated:function(e){e.action?this.mergeodfFileList.fileActions.registerAction(e.action):e.defaultAction&&this.mergeodfFileList.fileActions.setDefault(e.defaultAction.mime,e.defaultAction.name)}}}(OCA),OC.Plugins.register("OCA.Files.App",OCA.Files.MergeODFPlugin),$(document).ready((function(){!function(e){var r=function(e,t){this.initialize(e,t)};r.prototype=_.extend({},e.Files.FileList.prototype,{id:"mergeodflist",appName:t("mergeodf","MergeODF"),_clientSideSort:!0,_allowSelection:!1,initialize:function(t,r){e.Files.FileList.prototype.initialize.apply(this,arguments),this.initialized||(OC.Plugins.attach("OCA.Files.MergeODFFileList",this),$.ajax({url:OC.generateUrl("/apps/mergeodf/folderlist"),type:"GET",dataType:"json"}).done((function(){})))},updateEmptyContent:function(){var t=this.getCurrentDirectory();"/"===t?(this.$el.find("#emptycontent").toggleClass("hidden",!this.isEmpty),this.$el.find("#filestable thead th").toggleClass("hidden",this.isEmpty)):e.Files.FileList.prototype.updateEmptyContent.apply(this,arguments)},getDirectoryPermissions:function(){return OC.PERMISSION_READ|OC.PERMISSION_DELETE},updateStorageStatistics:function(){},reload:function(){this.showMask(),this._reloadCall&&this._reloadCall.abort(),this._setCurrentDir("/",!1),this._reloadCall=$.ajax({url:OC.generateUrl("/apps/mergeodf/folderlist"),type:"GET",dataType:"json"});var e=this.reloadCallback.bind(this);return this._reloadCall.then(e,e)},reloadCallback:function(e){return delete this._reloadCall,this.hideMask(),!!e.files&&(this.setFiles(e.files.sort(this._sortComparator)),!0)}}),e.Files.MergeODFFileList=r}(OCA)}))})();
//# sourceMappingURL=mergeodf-files.js.map?v=19227f5f49e3becf73fc