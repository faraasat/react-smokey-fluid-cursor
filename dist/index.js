"use client";
"use strict";var ct=Object.create;var q=Object.defineProperty;var lt=Object.getOwnPropertyDescriptor;var dt=Object.getOwnPropertyNames;var ft=Object.getPrototypeOf,mt=Object.prototype.hasOwnProperty;var vt=(a,u)=>{for(var m in u)q(a,m,{get:u[m],enumerable:!0})},Ce=(a,u,m,s)=>{if(u&&typeof u=="object"||typeof u=="function")for(let F of dt(u))!mt.call(a,F)&&F!==m&&q(a,F,{get:()=>u[F],enumerable:!(s=lt(u,F))||s.enumerable});return a};var ht=(a,u,m)=>(m=a!=null?ct(ft(a)):{},Ce(u||!a||!a.__esModule?q(m,"default",{value:a,enumerable:!0}):m,a)),pt=a=>Ce(q({},"__esModule",{value:!0}),a);var yt={};vt(yt,{SmokeyFluidCursor:()=>Tt,initFluid:()=>se,useSmokeyFluidCursor:()=>Ue});module.exports=pt(yt);var P=ht(require("react"));var xt={simResolution:128,dyeResolution:1440,captureResolution:512,densityDissipation:3.5,velocityDissipation:2,pressure:.1,pressureIteration:20,curl:10,splatRadius:.5,splatForce:6e3,shading:!0,colorUpdateSpeed:10,paused:!1,backColor:{r:0,g:0,b:0},transparent:!0,id:"smokey-fluid-canvas",position:"fixed",zIndex:-9999,pointerEvents:!1,maxDpr:2,pauseOnHidden:!0,respectReducedMotion:!0,palette:null,colorIntensity:.15},Pe=a=>{var u;return a?typeof a!="string"?a:(u=document.querySelector(a))!=null?u:document.getElementById(a):null},gt=a=>{let u=a.trim().replace(/^#/,"");return u.length===3&&(u=u[0]+u[0]+u[1]+u[1]+u[2]+u[2]),/^[0-9a-f]{6}$/i.test(u)?{r:parseInt(u.slice(0,2),16)/255,g:parseInt(u.slice(2,4),16)/255,b:parseInt(u.slice(4,6),16)/255}:null},bt=()=>typeof window!="undefined"&&typeof window.matchMedia=="function"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches,ae={dispose:()=>{},pause:()=>{},resume:()=>{},isPaused:()=>!0,setConfig:()=>{},splat:()=>{},canvas:null},se=(a={})=>{var _e,Be,Ae;let u={...xt,...a};if(typeof document=="undefined")return ae;let m=!1,s=(_e=Pe(u.canvas))!=null?_e:document.getElementById(u.id);if(!s){let e=(Be=Pe(u.container))!=null?Be:document.body;if(!e)return ae;s=document.createElement("canvas"),s.id=u.id,e.appendChild(s),m=!0}u.className&&s.classList.add(...u.className.split(/\s+/));let F=u.position==="fixed"||u.position==="absolute";Object.assign(s.style,{position:u.position,...F?{top:"0",left:"0",width:"100%",height:"100%"}:{},display:"block",pointerEvents:u.pointerEvents?"auto":"none",zIndex:String(u.zIndex)}),I();class w{constructor(){this.id=-1;this.texcoordX=0;this.texcoordY=0;this.prevTexcoordX=0;this.prevTexcoordY=0;this.deltaX=0;this.deltaY=0;this.down=!1;this.moved=!1;this.color=[30,0,300]}}let b=[];b.push(new w);let t,p;try{({gl:t,ext:p}=v(s))}catch(e){typeof console!="undefined"&&console.warn("[smokey-fluid-cursor] WebGL is unavailable; the cursor effect is disabled.",e);let r=s,n=m;return{...ae,dispose:()=>{n&&r.remove()},setConfig:i=>{i.zIndex!==void 0&&(r.style.zIndex=String(i.zIndex)),i.pointerEvents!==void 0&&(r.style.pointerEvents=i.pointerEvents?"auto":"none")},get canvas(){return r}}}p.supportLinearFiltering||(u.dyeResolution=512,u.shading=!1);function v(e){let r={alpha:!0,depth:!1,stencil:!1,antialias:!1,preserveDrawingBuffer:!1},n=e.getContext("webgl2",r),i=!!n;if(i||(n=e.getContext("webgl",r)||e.getContext("experimental-webgl",r)),!n)throw new Error("WebGL not supported");let o=null,l,c;if(i){let f=n;f.getExtension("EXT_color_buffer_float"),l=!!f.getExtension("OES_texture_float_linear"),c=f.HALF_FLOAT}else{let f=n;if(o=f.getExtension("OES_texture_half_float"),l=!!f.getExtension("OES_texture_half_float_linear"),!o)throw new Error("OES_texture_half_float not supported on WebGL1");c=o.HALF_FLOAT_OES}n.clearColor(0,0,0,1);let h=null,g=null,B=null;if(i){let f=n;h=x(f,f.RGBA16F,f.RGBA,c),g=x(f,f.RG16F,f.RG,c),B=x(f,f.R16F,f.RED,c)}else{let f=n;h=x(f,f.RGBA,f.RGBA,c),g=x(f,f.RGBA,f.RGBA,c),B=x(f,f.RGBA,f.RGBA,c)}return{gl:n,ext:{formatRGBA:h,formatRG:g,formatR:B,halfFloatTexType:c,supportLinearFiltering:l,isWebGL2:i}}}function x(e,r,n,i){if(!j(e,r,n,i)){if(e.RGBA16F!==void 0){let o=e;switch(r){case o.R16F:return x(o,o.RG16F,o.RG,i);case o.RG16F:return x(o,o.RGBA16F,o.RGBA,i);default:return null}}return null}return{internalFormat:r,format:n}}function j(e,r,n,i){let o=e.createTexture();if(!o)return!1;e.bindTexture(e.TEXTURE_2D,o),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texImage2D(e.TEXTURE_2D,0,r,4,4,0,n,i,null);let l=e.createFramebuffer();if(!l)return!1;e.bindFramebuffer(e.FRAMEBUFFER,l),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,o,0);let c=e.checkFramebufferStatus(e.FRAMEBUFFER);return e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(l),e.deleteTexture(o),c===e.FRAMEBUFFER_COMPLETE}class X{constructor(r,n){this.vertexShader=r,this.fragmentShaderSource=n,this.programs={},this.activeProgram=null,this.uniforms={}}setKeywords(r){let n=0;for(let o=0;o<r.length;o++)n+=at(r[o]);let i=this.programs[n];if(!i){let o=S(t,t.FRAGMENT_SHADER,de(this.fragmentShaderSource,r));i=ce(t,this.vertexShader,o),this.programs[n]=i}i!==this.activeProgram&&(this.uniforms=le(t,i),this.activeProgram=i)}bind(){this.activeProgram&&t.useProgram(this.activeProgram)}}class _{constructor(r,n){this.program=ce(t,r,n),this.uniforms=le(t,this.program)}bind(){this.program&&t.useProgram(this.program)}}function ce(e,r,n){let i=e.createProgram();return e.attachShader(i,r),e.attachShader(i,n),e.bindAttribLocation(i,0,"aPosition"),e.linkProgram(i),e.getProgramParameter(i,e.LINK_STATUS)||console.trace(e.getProgramInfoLog(i)),i}function le(e,r){let n={},i=e.getProgramParameter(r,e.ACTIVE_UNIFORMS);for(let o=0;o<i;o++){let l=e.getActiveUniform(r,o);if(!l)continue;let c=l.name,h=e.getUniformLocation(r,c);h&&(n[c]=h)}return n}function S(e,r,n){let i=e.createShader(r);return e.shaderSource(i,n),e.compileShader(i),e.getShaderParameter(i,e.COMPILE_STATUS)||console.trace(e.getShaderInfoLog(i)),i}function de(e,r){if(!r||r.length===0)return e;let n="";return r.forEach(i=>{n+="#define "+i+`
`}),n+e}let L=S(t,t.VERTEX_SHADER,`precision highp float;
attribute vec2 aPosition;
varying vec2 vUv;
varying vec2 vL;
varying vec2 vR;
varying vec2 vT;
varying vec2 vB;
uniform vec2 texelSize;
void main () {
vUv = aPosition * 0.5 + 0.5;
vL = vUv - vec2(texelSize.x, 0.0);
vR = vUv + vec2(texelSize.x, 0.0);
vT = vUv + vec2(0.0, texelSize.y);
vB = vUv - vec2(0.0, texelSize.y);
gl_Position = vec4(aPosition, 0.0, 1.0);
}`),Me=S(t,t.FRAGMENT_SHADER,`precision mediump float;
precision mediump sampler2D;
varying highp vec2 vUv;
uniform sampler2D uTexture;
void main () {
gl_FragColor = texture2D(uTexture, vUv);
}`),ze=S(t,t.FRAGMENT_SHADER,`precision mediump float;
precision mediump sampler2D;
varying highp vec2 vUv;
uniform sampler2D uTexture;
uniform float value;
void main () {
gl_FragColor = value * texture2D(uTexture, vUv);
}`),Ie=`precision highp float;
precision highp sampler2D;
varying vec2 vUv;
varying vec2 vL;
varying vec2 vR;
varying vec2 vT;
varying vec2 vB;
uniform sampler2D uTexture;
uniform vec2 texelSize;
void main () {
vec3 c = texture2D(uTexture, vUv).rgb;
#ifdef shading
vec3 lc = texture2D(uTexture, vL).rgb;
vec3 rc = texture2D(uTexture, vR).rgb;
vec3 tc = texture2D(uTexture, vT).rgb;
vec3 bc = texture2D(uTexture, vB).rgb;
float dx = length(rc) - length(lc);
float dy = length(tc) - length(bc);
vec3 n = normalize(vec3(dx, dy, length(texelSize)));
vec3 l = vec3(0.0, 0.0, 1.0);
float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);
c *= diffuse;
#endif
float a = max(c.r, max(c.g, c.b));
gl_FragColor = vec4(c, a);
}`,Xe=S(t,t.FRAGMENT_SHADER,`precision highp float;
precision highp sampler2D;
varying vec2 vUv;
uniform sampler2D uTarget;
uniform float aspectRatio;
uniform vec3 color;
uniform vec2 point;
uniform float radius;
void main () {
vec2 p = vUv - point.xy;
p.x *= aspectRatio;
vec3 splat = exp(-dot(p, p) / radius) * color;
vec3 base = texture2D(uTarget, vUv).xyz;
gl_FragColor = vec4(base + splat, 1.0);
}`),Oe=S(t,t.FRAGMENT_SHADER,de(`precision highp float;
precision highp sampler2D;
varying vec2 vUv;
uniform sampler2D uVelocity;
uniform sampler2D uSource;
uniform vec2 texelSize;
uniform vec2 dyeTexelSize;
uniform float dt;
uniform float dissipation;
vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
vec2 st = uv / tsize - 0.5;
vec2 iuv = floor(st);
vec2 fuv = fract(st);
vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);
return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
}
void main () {
#ifdef MANUAL_FILTERING
vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
vec4 result = bilerp(uSource, coord, dyeTexelSize);
#else
vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
vec4 result = texture2D(uSource, coord);
#endif
float decay = 1.0 + dissipation * dt;
gl_FragColor = result / decay;
}`,p.supportLinearFiltering?null:["MANUAL_FILTERING"])),Ne=S(t,t.FRAGMENT_SHADER,`precision mediump float;
precision mediump sampler2D;
varying highp vec2 vUv;
varying highp vec2 vL;
varying highp vec2 vR;
varying highp vec2 vT;
varying highp vec2 vB;
uniform sampler2D uVelocity;
void main () {
float L = texture2D(uVelocity, vL).x;
float R = texture2D(uVelocity, vR).x;
float T = texture2D(uVelocity, vT).y;
float B = texture2D(uVelocity, vB).y;
vec2 C = texture2D(uVelocity, vUv).xy;
if (vL.x < 0.0) { L = -C.x; }
if (vR.x > 1.0) { R = -C.x; }
if (vT.y > 1.0) { T = -C.y; }
if (vB.y < 0.0) { B = -C.y; }
float div = 0.5 * (R - L + T - B);
gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
}`),He=S(t,t.FRAGMENT_SHADER,`precision mediump float;
precision mediump sampler2D;
varying highp vec2 vUv;
varying highp vec2 vL;
varying highp vec2 vR;
varying highp vec2 vT;
varying highp vec2 vB;
uniform sampler2D uVelocity;
void main () {
float L = texture2D(uVelocity, vL).y;
float R = texture2D(uVelocity, vR).y;
float T = texture2D(uVelocity, vT).x;
float B = texture2D(uVelocity, vB).x;
float vorticity = R - L - T + B;
gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
}`),Ye=S(t,t.FRAGMENT_SHADER,`precision highp float;
precision highp sampler2D;
varying vec2 vUv;
varying vec2 vL;
varying vec2 vR;
varying vec2 vT;
varying vec2 vB;
uniform sampler2D uVelocity;
uniform sampler2D uCurl;
uniform float curl;
uniform float dt;
void main () {
float L = texture2D(uCurl, vL).x;
float R = texture2D(uCurl, vR).x;
float T = texture2D(uCurl, vT).x;
float B = texture2D(uCurl, vB).x;
float C = texture2D(uCurl, vUv).x;
vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
force /= length(force) + 0.0001;
force *= curl * C;
force.y *= -1.0;
vec2 velocity = texture2D(uVelocity, vUv).xy;
velocity += force * dt;
velocity = min(max(velocity, -1000.0), 1000.0);
gl_FragColor = vec4(velocity, 0.0, 1.0);
}`),We=S(t,t.FRAGMENT_SHADER,`precision mediump float;
precision mediump sampler2D;
varying highp vec2 vUv;
varying highp vec2 vL;
varying highp vec2 vR;
varying highp vec2 vT;
varying highp vec2 vB;
uniform sampler2D uPressure;
uniform sampler2D uDivergence;
void main () {
float L = texture2D(uPressure, vL).x;
float R = texture2D(uPressure, vR).x;
float T = texture2D(uPressure, vT).x;
float B = texture2D(uPressure, vB).x;
float C = texture2D(uPressure, vUv).x;
float divergence = texture2D(uDivergence, vUv).x;
float pressure = (L + R + B + T - divergence) * 0.25;
gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
}`),ke=S(t,t.FRAGMENT_SHADER,`precision mediump float;
precision mediump sampler2D;
varying highp vec2 vUv;
varying highp vec2 vL;
varying highp vec2 vR;
varying highp vec2 vT;
varying highp vec2 vB;
uniform sampler2D uPressure;
uniform sampler2D uVelocity;
void main () {
float L = texture2D(uPressure, vL).x;
float R = texture2D(uPressure, vR).x;
float T = texture2D(uPressure, vT).x;
float B = texture2D(uPressure, vB).x;
vec2 velocity = texture2D(uVelocity, vUv).xy;
velocity.xy -= vec2(R - L, T - B);
gl_FragColor = vec4(velocity, 0.0, 1.0);
}`),T=(()=>{let e=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,e),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,1,1,-1]),t.STATIC_DRAW);let r=t.createBuffer();return t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,r),t.bufferData(t.ELEMENT_ARRAY_BUFFER,new Uint16Array([0,1,2,0,2,3]),t.STATIC_DRAW),t.vertexAttribPointer(0,2,t.FLOAT,!1,0,0),t.enableVertexAttribArray(0),(n,i=!1)=>{n==null?(t.viewport(0,0,t.drawingBufferWidth,t.drawingBufferHeight),t.bindFramebuffer(t.FRAMEBUFFER,null)):(t.viewport(0,0,n.width,n.height),t.bindFramebuffer(t.FRAMEBUFFER,n.fbo)),i&&(t.clearColor(0,0,0,1),t.clear(t.COLOR_BUFFER_BIT)),t.drawElements(t.TRIANGLES,6,t.UNSIGNED_SHORT,0)}})(),R,d,J,$,A,fe=new _(L,Me),Z=new _(L,ze),C=new _(L,Xe),D=new _(L,Oe),Q=new _(L,Ne),ee=new _(L,He),U=new _(L,Ye),O=new _(L,We),N=new _(L,ke),H=new X(L,Ie);function te(){let e=Se(u.simResolution),r=Se(u.dyeResolution),n=p.halfFloatTexType,i=p.formatRGBA,o=p.formatRG,l=p.formatR,c=p.supportLinearFiltering?t.LINEAR:t.NEAREST;t.disable(t.BLEND),R==null?R=re(r.width,r.height,i.internalFormat,i.format,n,c):R=me(R,r.width,r.height,i.internalFormat,i.format,n,c),d==null?d=re(e.width,e.height,o.internalFormat,o.format,n,c):d=me(d,e.width,e.height,o.internalFormat,o.format,n,c),J=G(e.width,e.height,l.internalFormat,l.format,n,t.NEAREST),$=G(e.width,e.height,l.internalFormat,l.format,n,t.NEAREST),A=re(e.width,e.height,l.internalFormat,l.format,n,t.NEAREST)}function G(e,r,n,i,o,l){t.activeTexture(t.TEXTURE0);let c=t.createTexture();t.bindTexture(t.TEXTURE_2D,c),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,l),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,l),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texImage2D(t.TEXTURE_2D,0,n,e,r,0,i,o,null);let h=t.createFramebuffer();t.bindFramebuffer(t.FRAMEBUFFER,h),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,c,0),t.viewport(0,0,e,r),t.clear(t.COLOR_BUFFER_BIT);let g=1/e,B=1/r;return{texture:c,fbo:h,width:e,height:r,texelSizeX:g,texelSizeY:B,attach(f){return t.activeTexture(t.TEXTURE0+f),t.bindTexture(t.TEXTURE_2D,c),f}}}function re(e,r,n,i,o,l){let c=G(e,r,n,i,o,l),h=G(e,r,n,i,o,l);return{width:e,height:r,texelSizeX:c.texelSizeX,texelSizeY:c.texelSizeY,get read(){return c},set read(g){c=g},get write(){return h},set write(g){h=g},swap(){let g=c;c=h,h=g}}}function Ve(e,r,n,i,o,l,c){let h=G(r,n,i,o,l,c);return fe.bind(),t.uniform1i(fe.uniforms.uTexture,e.attach(0)),T(h),h}function me(e,r,n,i,o,l,c){return e.width===r&&e.height===n||(e.read=Ve(e.read,r,n,i,o,l,c),e.write=G(r,n,i,o,l,c),e.width=r,e.height=n,e.texelSizeX=1/r,e.texelSizeY=1/n),e}function Ke(){let e=[];u.shading&&e.push("shading"),H.setKeywords(e)}Ke(),te();let ne=Date.now(),Y=0,ie=0;function ve(){let e=qe();I()&&te(),je(e),Je(),u.paused||$e(e),he(null),ie=requestAnimationFrame(ve)}function qe(){let e=Date.now(),r=(e-ne)/1e3;return r=Math.min(r,.016666),ne=e,r}function I(){let e=y(s.clientWidth),r=y(s.clientHeight);return s.width!==e||s.height!==r?(s.width=e,s.height=r,!0):!1}function je(e){Y+=e*u.colorUpdateSpeed,Y>=1&&(Y=ut(Y,0,1),b.forEach(r=>{r.color=Fe(W())}))}function Je(){b.forEach(e=>{e.moved&&(e.moved=!1,Qe(e))})}function $e(e){t.disable(t.BLEND),ee.bind(),t.uniform2f(ee.uniforms.texelSize,d.texelSizeX,d.texelSizeY),t.uniform1i(ee.uniforms.uVelocity,d.read.attach(0)),T($),U.bind(),t.uniform2f(U.uniforms.texelSize,d.texelSizeX,d.texelSizeY),t.uniform1i(U.uniforms.uVelocity,d.read.attach(0)),t.uniform1i(U.uniforms.uCurl,$.attach(1)),t.uniform1f(U.uniforms.curl,u.curl),t.uniform1f(U.uniforms.dt,e),T(d.write),d.swap(),Q.bind(),t.uniform2f(Q.uniforms.texelSize,d.texelSizeX,d.texelSizeY),t.uniform1i(Q.uniforms.uVelocity,d.read.attach(0)),T(J),Z.bind(),t.uniform1i(Z.uniforms.uTexture,A.read.attach(0)),t.uniform1f(Z.uniforms.value,u.pressure),T(A.write),A.swap(),O.bind(),t.uniform2f(O.uniforms.texelSize,d.texelSizeX,d.texelSizeY),t.uniform1i(O.uniforms.uDivergence,J.attach(0));for(let n=0;n<u.pressureIteration;n++)t.uniform1i(O.uniforms.uPressure,A.read.attach(1)),T(A.write),A.swap();N.bind(),t.uniform2f(N.uniforms.texelSize,d.texelSizeX,d.texelSizeY),t.uniform1i(N.uniforms.uPressure,A.read.attach(0)),t.uniform1i(N.uniforms.uVelocity,d.read.attach(1)),T(d.write),d.swap(),D.bind(),t.uniform2f(D.uniforms.texelSize,d.texelSizeX,d.texelSizeY),p.supportLinearFiltering||t.uniform2f(D.uniforms.dyeTexelSize,d.texelSizeX,d.texelSizeY);let r=d.read.attach(0);t.uniform1i(D.uniforms.uVelocity,r),t.uniform1i(D.uniforms.uSource,r),t.uniform1f(D.uniforms.dt,e),t.uniform1f(D.uniforms.dissipation,u.velocityDissipation),T(d.write),d.swap(),p.supportLinearFiltering||t.uniform2f(D.uniforms.dyeTexelSize,R.texelSizeX,R.texelSizeY),t.uniform1i(D.uniforms.uVelocity,d.read.attach(0)),t.uniform1i(D.uniforms.uSource,R.read.attach(1)),t.uniform1f(D.uniforms.dissipation,u.densityDissipation),T(R.write),R.swap()}function he(e){t.blendFunc(t.ONE,t.ONE_MINUS_SRC_ALPHA),t.enable(t.BLEND),Ze(e)}function Ze(e){let r=e==null?t.drawingBufferWidth:e.width,n=e==null?t.drawingBufferHeight:e.height;H.bind(),u.shading&&t.uniform2f(H.uniforms.texelSize,1/r,1/n),t.uniform1i(H.uniforms.uTexture,R.read.attach(0)),T(e)}function Qe(e){let r=e.deltaX*u.splatForce,n=e.deltaY*u.splatForce,i=it(e.color);oe(e.texcoordX,e.texcoordY,r,n,i)}function pe(e){let r=W();r.r*=10,r.g*=10,r.b*=10;let n=10*(Math.random()-.5),i=30*(Math.random()-.5);oe(e.texcoordX,e.texcoordY,n,i,r)}function oe(e,r,n,i,o){C.bind(),t.uniform1i(C.uniforms.uTarget,d.read.attach(0)),t.uniform1f(C.uniforms.aspectRatio,s.width/s.height),t.uniform2f(C.uniforms.point,e,r),t.uniform3f(C.uniforms.color,n,i,0),t.uniform1f(C.uniforms.radius,et(u.splatRadius/100)),T(d.write),d.swap(),t.uniform1i(C.uniforms.uTarget,R.read.attach(0)),t.uniform3f(C.uniforms.color,o.r,o.g,o.b),T(R.write),R.swap()}function et(e){let r=s.width/s.height;return r>1&&(e*=r),e}let xe=e=>{let r=b[0],n=s.getBoundingClientRect(),i=y(e.clientX-n.left),o=y(e.clientY-n.top);Te(r,-1,i,o),pe(r)},ge=e=>{let r=b[0],n=s.getBoundingClientRect(),i=y(e.clientX-n.left),o=y(e.clientY-n.top),l=r.color;ye(r,i,o,l)},be=e=>{let r=e.targetTouches,n=s.getBoundingClientRect(),i=b[0];for(let o=0;o<r.length;o++){let l=y(r[o].clientX-n.left),c=y(r[o].clientY-n.top);Te(i,r[o].identifier,l,c),pe(i)}},Re=e=>{e.preventDefault();let r=e.targetTouches,n=s.getBoundingClientRect(),i=b[0];for(let o=0;o<r.length;o++){let l=y(r[o].clientX-n.left),c=y(r[o].clientY-n.top);ye(i,l,c,i.color)}},Ee=e=>{let r=e.changedTouches,n=b[0];for(let i=0;i<r.length;i++)tt(n)};window.addEventListener("mousedown",xe),window.addEventListener("mousemove",ge),window.addEventListener("touchstart",be),window.addEventListener("touchmove",Re,{passive:!1}),window.addEventListener("touchend",Ee);function Te(e,r,n,i){e.id=r,e.down=!0,e.moved=!1,e.texcoordX=n/s.width,e.texcoordY=1-i/s.height,e.prevTexcoordX=e.texcoordX,e.prevTexcoordY=e.texcoordY,e.deltaX=0,e.deltaY=0,e.color=Fe(W())}function ye(e,r,n,i){e.prevTexcoordX=e.texcoordX,e.prevTexcoordY=e.texcoordY,e.texcoordX=r/s.width,e.texcoordY=1-n/s.height,e.deltaX=rt(e.texcoordX-e.prevTexcoordX),e.deltaY=nt(e.texcoordY-e.prevTexcoordY),e.moved=Math.abs(e.deltaX)>0||Math.abs(e.deltaY)>0,e.color=i}function tt(e){e.down=!1}function rt(e){let r=s.width/s.height;return r<1&&(e*=r),e}function nt(e){let r=s.width/s.height;return r>1&&(e/=r),e}function W(){let e=u.colorIntensity,r=u.palette;if(r&&r.length>0){let i=r[Math.floor(Math.random()*r.length)],o=gt(i);if(o)return{r:o.r*e,g:o.g*e,b:o.b*e}}let n=ot(Math.random(),1,1);return n.r*=e,n.g*=e,n.b*=e,n}function Fe(e){return[e.r,e.g,e.b]}function it(e){return{r:e[0],g:e[1],b:e[2]}}function ot(e,r,n){let i=0,o=0,l=0,c=Math.floor(e*6),h=e*6-c,g=n*(1-r),B=n*(1-h*r),f=n*(1-(1-h)*r);switch(c%6){case 0:i=n,o=f,l=g;break;case 1:i=B,o=n,l=g;break;case 2:i=g,o=n,l=f;break;case 3:i=g,o=B,l=n;break;case 4:i=f,o=g,l=n;break;case 5:i=n,o=g,l=B;break}return{r:i,g:o,b:l}}function ut(e,r,n){let i=n-r;return i===0?r:(e-r)%i+r}function Se(e){let r=t.drawingBufferWidth/t.drawingBufferHeight;r<1&&(r=1/r);let n=Math.round(e),i=Math.round(e*r);return t.drawingBufferWidth>t.drawingBufferHeight?{width:i,height:n}:{width:n,height:i}}function y(e){let r=Math.min(window.devicePixelRatio||1,Math.max(1,u.maxDpr));return Math.floor(e*r)}function at(e){if(e.length===0)return 0;let r=0;for(let n=0;n<e.length;n++)r=(r<<5)-r+e.charCodeAt(n),r|=0;return r}function st(){var e,r;ue||(ue=!0,K(),window.removeEventListener("mousedown",xe),window.removeEventListener("mousemove",ge),window.removeEventListener("touchstart",be),window.removeEventListener("touchmove",Re),window.removeEventListener("touchend",Ee),window.removeEventListener("resize",Le),document.removeEventListener("visibilitychange",De),(e=E==null?void 0:E.removeEventListener)==null||e.call(E,"change",we),M==null||M.disconnect(),m&&(s==null||s.remove()),(r=t.getExtension("WEBGL_lose_context"))==null||r.loseContext())}let ue=!1,k=!1;function V(){k||ue||(k=!0,ne=Date.now(),ie=requestAnimationFrame(ve))}function K(){k=!1,cancelAnimationFrame(ie)}let De=()=>{u.pauseOnHidden&&(document.hidden?K():z||V())},Le=()=>I(),M=typeof ResizeObserver!="undefined"?new ResizeObserver(()=>I()):null;M==null||M.observe(s);let E=typeof window.matchMedia=="function"?window.matchMedia("(prefers-reduced-motion: reduce)"):null,we=()=>{u.respectReducedMotion&&(E!=null&&E.matches?K():z||V())},z=!1;return window.addEventListener("resize",Le),document.addEventListener("visibilitychange",De),(Ae=E==null?void 0:E.addEventListener)==null||Ae.call(E,"change",we),u.respectReducedMotion&&bt()?(z=!0,he(null)):V(),{dispose:st,pause(){z=!0,K()},resume(){z=!1,V()},isPaused:()=>z||!k,setConfig(e){let r=e.simResolution!==void 0&&e.simResolution!==u.simResolution||e.dyeResolution!==void 0&&e.dyeResolution!==u.dyeResolution;Object.assign(u,e),e.maxDpr!==void 0&&I(),r&&te(),e.zIndex!==void 0&&(s.style.zIndex=String(e.zIndex)),e.pointerEvents!==void 0&&(s.style.pointerEvents=e.pointerEvents?"auto":"none")},splat(e,r,n){let i=s.getBoundingClientRect(),o=y(e),l=y(r),c=n!=null?n:W();oe(o,s.height-l,0,0,c)},get canvas(){return s}}};var Ge=require("react/jsx-runtime"),Rt=["densityDissipation","velocityDissipation","pressure","pressureIteration","curl","splatRadius","splatForce","shading","colorUpdateSpeed","paused","transparent","backColor","palette","colorIntensity","zIndex","pointerEvents","maxDpr","pauseOnHidden","respectReducedMotion"],Et=a=>JSON.stringify([a==null?void 0:a.id,a==null?void 0:a.position,a==null?void 0:a.className,a==null?void 0:a.simResolution,a==null?void 0:a.dyeResolution,a==null?void 0:a.captureResolution]);function Ue(a,u){let m=P.default.useRef(null),s=P.default.useRef(a);s.current=a;let F=Et(a);return P.default.useEffect(()=>{let w=se({...s.current,...u!=null&&u.current?{container:u.current}:{}});return m.current=w,()=>{w.dispose(),m.current=null}},[F,u]),P.default.useEffect(()=>{let w=m.current;if(!w||!a)return;let b={};for(let t of Rt)a[t]!==void 0&&(b[t]=a[t]);w.setConfig(b)}),m}var Tt=P.default.forwardRef(function({config:u,scoped:m=!1,className:s,style:F,children:w},b){let t=P.default.useRef(null),p=Ue(u,m?t:void 0);return P.default.useImperativeHandle(b,()=>({dispose:()=>{var v;return(v=p.current)==null?void 0:v.dispose()},pause:()=>{var v;return(v=p.current)==null?void 0:v.pause()},resume:()=>{var v;return(v=p.current)==null?void 0:v.resume()},isPaused:()=>{var v,x;return(x=(v=p.current)==null?void 0:v.isPaused())!=null?x:!0},setConfig:v=>{var x;return(x=p.current)==null?void 0:x.setConfig(v)},splat:(v,x,j)=>{var X;return(X=p.current)==null?void 0:X.splat(v,x,j)},get canvas(){var v,x;return(x=(v=p.current)==null?void 0:v.canvas)!=null?x:null}}),[p]),m?(0,Ge.jsx)("div",{ref:t,className:s,style:{position:"relative",overflow:"hidden",...F},children:w}):null});0&&(module.exports={SmokeyFluidCursor,initFluid,useSmokeyFluidCursor});
