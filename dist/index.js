"use client";
"use strict";var ct=Object.create;var K=Object.defineProperty;var lt=Object.getOwnPropertyDescriptor;var dt=Object.getOwnPropertyNames;var ft=Object.getPrototypeOf,mt=Object.prototype.hasOwnProperty;var vt=(s,i)=>{for(var m in i)K(s,m,{get:i[m],enumerable:!0})},Ae=(s,i,m,a)=>{if(i&&typeof i=="object"||typeof i=="function")for(let F of dt(i))!mt.call(s,F)&&F!==m&&K(s,F,{get:()=>i[F],enumerable:!(a=lt(i,F))||a.enumerable});return s};var ht=(s,i,m)=>(m=s!=null?ct(ft(s)):{},Ae(i||!s||!s.__esModule?K(m,"default",{value:s,enumerable:!0}):m,s)),pt=s=>Ae(K({},"__esModule",{value:!0}),s);var Ft={};vt(Ft,{SmokeyFluidCursor:()=>yt,initFluid:()=>ae,useSmokeyFluidCursor:()=>Ue});module.exports=pt(Ft);var P=ht(require("react"));var xt={simResolution:128,dyeResolution:1440,captureResolution:512,densityDissipation:3.5,velocityDissipation:2,pressure:.1,pressureIteration:20,curl:10,splatRadius:.5,splatForce:6e3,shading:!0,colorUpdateSpeed:10,paused:!1,backColor:{r:0,g:0,b:0},transparent:!0,id:"smokey-fluid-canvas",position:"fixed",zIndex:-9999,pointerEvents:!1,maxDpr:2,pauseOnHidden:!0,respectReducedMotion:!0,palette:null,colorIntensity:.15},Pe=s=>{var i;return s?typeof s!="string"?s:(i=document.querySelector(s))!=null?i:document.getElementById(s):null},gt=s=>{let i=s.trim().replace(/^#/,"");return i.length===3&&(i=i[0]+i[0]+i[1]+i[1]+i[2]+i[2]),/^[0-9a-f]{6}$/i.test(i)?{r:parseInt(i.slice(0,2),16)/255,g:parseInt(i.slice(2,4),16)/255,b:parseInt(i.slice(4,6),16)/255}:null},bt=s=>{var a;if(s>=0||typeof document=="undefined"||typeof process!="undefined"&&((a=process.env)==null?void 0:a.NODE_ENV)==="production")return;let i=window.getComputedStyle(document.body).backgroundColor;i&&i!=="transparent"&&!/rgba\(\s*0\s*,\s*0\s*,\s*0\s*,\s*0\s*\)/.test(i)&&console.warn("[smokey-fluid-cursor] <body> has an opaque background ("+i+") and the canvas sits at z-index "+s+`, so the effect will be painted over and stay invisible.
Move the background to <html>, or give the canvas a zIndex above your background.`)},Rt=()=>typeof window!="undefined"&&typeof window.matchMedia=="function"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches,se={dispose:()=>{},pause:()=>{},resume:()=>{},isPaused:()=>!0,setConfig:()=>{},splat:()=>{},canvas:null},ae=(s={})=>{var _e,Be,Ce;let i={...xt,...s};if(typeof document=="undefined")return se;let m=!1,a=(_e=Pe(i.canvas))!=null?_e:document.getElementById(i.id);if(!a){let e=(Be=Pe(i.container))!=null?Be:document.body;if(!e)return se;a=document.createElement("canvas"),a.id=i.id,e.appendChild(a),m=!0}i.className&&a.classList.add(...i.className.split(/\s+/));let F=i.position==="fixed"||i.position==="absolute";Object.assign(a.style,{position:i.position,...F?{top:"0",left:"0",width:"100%",height:"100%"}:{},display:"block",pointerEvents:i.pointerEvents?"auto":"none",zIndex:String(i.zIndex)}),bt(i.zIndex),I();class w{constructor(){this.id=-1;this.texcoordX=0;this.texcoordY=0;this.prevTexcoordX=0;this.prevTexcoordY=0;this.deltaX=0;this.deltaY=0;this.down=!1;this.moved=!1;this.color=[30,0,300]}}let b=[];b.push(new w);let t,p;try{({gl:t,ext:p}=v(a))}catch(e){typeof console!="undefined"&&console.warn("[smokey-fluid-cursor] WebGL is unavailable; the cursor effect is disabled.",e);let r=a,n=m;return{...se,dispose:()=>{n&&r.remove()},setConfig:o=>{o.zIndex!==void 0&&(r.style.zIndex=String(o.zIndex)),o.pointerEvents!==void 0&&(r.style.pointerEvents=o.pointerEvents?"auto":"none")},get canvas(){return r}}}p.supportLinearFiltering||(i.dyeResolution=512,i.shading=!1);function v(e){let r={alpha:!0,depth:!1,stencil:!1,antialias:!1,preserveDrawingBuffer:!1},n=e.getContext("webgl2",r),o=!!n;if(o||(n=e.getContext("webgl",r)||e.getContext("experimental-webgl",r)),!n)throw new Error("WebGL not supported");let u=null,l,c;if(o){let f=n;f.getExtension("EXT_color_buffer_float"),l=!!f.getExtension("OES_texture_float_linear"),c=f.HALF_FLOAT}else{let f=n;if(u=f.getExtension("OES_texture_half_float"),l=!!f.getExtension("OES_texture_half_float_linear"),!u)throw new Error("OES_texture_half_float not supported on WebGL1");c=u.HALF_FLOAT_OES}n.clearColor(0,0,0,1);let h=null,g=null,B=null;if(o){let f=n;h=x(f,f.RGBA16F,f.RGBA,c),g=x(f,f.RG16F,f.RG,c),B=x(f,f.R16F,f.RED,c)}else{let f=n;h=x(f,f.RGBA,f.RGBA,c),g=x(f,f.RGBA,f.RGBA,c),B=x(f,f.RGBA,f.RGBA,c)}return{gl:n,ext:{formatRGBA:h,formatRG:g,formatR:B,halfFloatTexType:c,supportLinearFiltering:l,isWebGL2:o}}}function x(e,r,n,o){if(!j(e,r,n,o)){if(e.RGBA16F!==void 0){let u=e;switch(r){case u.R16F:return x(u,u.RG16F,u.RG,o);case u.RG16F:return x(u,u.RGBA16F,u.RGBA,o);default:return null}}return null}return{internalFormat:r,format:n}}function j(e,r,n,o){let u=e.createTexture();if(!u)return!1;e.bindTexture(e.TEXTURE_2D,u),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texImage2D(e.TEXTURE_2D,0,r,4,4,0,n,o,null);let l=e.createFramebuffer();if(!l)return!1;e.bindFramebuffer(e.FRAMEBUFFER,l),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,u,0);let c=e.checkFramebufferStatus(e.FRAMEBUFFER);return e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(l),e.deleteTexture(u),c===e.FRAMEBUFFER_COMPLETE}class X{constructor(r,n){this.vertexShader=r,this.fragmentShaderSource=n,this.programs={},this.activeProgram=null,this.uniforms={}}setKeywords(r){let n=0;for(let u=0;u<r.length;u++)n+=st(r[u]);let o=this.programs[n];if(!o){let u=S(t,t.FRAGMENT_SHADER,de(this.fragmentShaderSource,r));o=ce(t,this.vertexShader,u),this.programs[n]=o}o!==this.activeProgram&&(this.uniforms=le(t,o),this.activeProgram=o)}bind(){this.activeProgram&&t.useProgram(this.activeProgram)}}class _{constructor(r,n){this.program=ce(t,r,n),this.uniforms=le(t,this.program)}bind(){this.program&&t.useProgram(this.program)}}function ce(e,r,n){let o=e.createProgram();return e.attachShader(o,r),e.attachShader(o,n),e.bindAttribLocation(o,0,"aPosition"),e.linkProgram(o),e.getProgramParameter(o,e.LINK_STATUS)||console.trace(e.getProgramInfoLog(o)),o}function le(e,r){let n={},o=e.getProgramParameter(r,e.ACTIVE_UNIFORMS);for(let u=0;u<o;u++){let l=e.getActiveUniform(r,u);if(!l)continue;let c=l.name,h=e.getUniformLocation(r,c);h&&(n[c]=h)}return n}function S(e,r,n){let o=e.createShader(r);return e.shaderSource(o,n),e.compileShader(o),e.getShaderParameter(o,e.COMPILE_STATUS)||console.trace(e.getShaderInfoLog(o)),o}function de(e,r){if(!r||r.length===0)return e;let n="";return r.forEach(o=>{n+="#define "+o+`
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
}`),T=(()=>{let e=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,e),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,1,1,-1]),t.STATIC_DRAW);let r=t.createBuffer();return t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,r),t.bufferData(t.ELEMENT_ARRAY_BUFFER,new Uint16Array([0,1,2,0,2,3]),t.STATIC_DRAW),t.vertexAttribPointer(0,2,t.FLOAT,!1,0,0),t.enableVertexAttribArray(0),(n,o=!1)=>{n==null?(t.viewport(0,0,t.drawingBufferWidth,t.drawingBufferHeight),t.bindFramebuffer(t.FRAMEBUFFER,null)):(t.viewport(0,0,n.width,n.height),t.bindFramebuffer(t.FRAMEBUFFER,n.fbo)),o&&(t.clearColor(0,0,0,1),t.clear(t.COLOR_BUFFER_BIT)),t.drawElements(t.TRIANGLES,6,t.UNSIGNED_SHORT,0)}})(),R,d,J,$,C,fe=new _(L,Me),Z=new _(L,ze),A=new _(L,Xe),D=new _(L,Oe),Q=new _(L,Ne),ee=new _(L,He),U=new _(L,Ye),O=new _(L,We),N=new _(L,ke),H=new X(L,Ie);function te(){let e=Se(i.simResolution),r=Se(i.dyeResolution),n=p.halfFloatTexType,o=p.formatRGBA,u=p.formatRG,l=p.formatR,c=p.supportLinearFiltering?t.LINEAR:t.NEAREST;t.disable(t.BLEND),R==null?R=re(r.width,r.height,o.internalFormat,o.format,n,c):R=me(R,r.width,r.height,o.internalFormat,o.format,n,c),d==null?d=re(e.width,e.height,u.internalFormat,u.format,n,c):d=me(d,e.width,e.height,u.internalFormat,u.format,n,c),J=G(e.width,e.height,l.internalFormat,l.format,n,t.NEAREST),$=G(e.width,e.height,l.internalFormat,l.format,n,t.NEAREST),C=re(e.width,e.height,l.internalFormat,l.format,n,t.NEAREST)}function G(e,r,n,o,u,l){t.activeTexture(t.TEXTURE0);let c=t.createTexture();t.bindTexture(t.TEXTURE_2D,c),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,l),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,l),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texImage2D(t.TEXTURE_2D,0,n,e,r,0,o,u,null);let h=t.createFramebuffer();t.bindFramebuffer(t.FRAMEBUFFER,h),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,c,0),t.viewport(0,0,e,r),t.clear(t.COLOR_BUFFER_BIT);let g=1/e,B=1/r;return{texture:c,fbo:h,width:e,height:r,texelSizeX:g,texelSizeY:B,attach(f){return t.activeTexture(t.TEXTURE0+f),t.bindTexture(t.TEXTURE_2D,c),f}}}function re(e,r,n,o,u,l){let c=G(e,r,n,o,u,l),h=G(e,r,n,o,u,l);return{width:e,height:r,texelSizeX:c.texelSizeX,texelSizeY:c.texelSizeY,get read(){return c},set read(g){c=g},get write(){return h},set write(g){h=g},swap(){let g=c;c=h,h=g}}}function Ve(e,r,n,o,u,l,c){let h=G(r,n,o,u,l,c);return fe.bind(),t.uniform1i(fe.uniforms.uTexture,e.attach(0)),T(h),h}function me(e,r,n,o,u,l,c){return e.width===r&&e.height===n||(e.read=Ve(e.read,r,n,o,u,l,c),e.write=G(r,n,o,u,l,c),e.width=r,e.height=n,e.texelSizeX=1/r,e.texelSizeY=1/n),e}function qe(){let e=[];i.shading&&e.push("shading"),H.setKeywords(e)}qe(),te();let ne=Date.now(),Y=0,oe=0;function ve(){let e=Ke();I()&&te(),je(e),Je(),i.paused||$e(e),he(null),oe=requestAnimationFrame(ve)}function Ke(){let e=Date.now(),r=(e-ne)/1e3;return r=Math.min(r,.016666),ne=e,r}function I(){let e=y(a.clientWidth),r=y(a.clientHeight);return a.width!==e||a.height!==r?(a.width=e,a.height=r,!0):!1}function je(e){Y+=e*i.colorUpdateSpeed,Y>=1&&(Y=ut(Y,0,1),b.forEach(r=>{r.color=Fe(W())}))}function Je(){b.forEach(e=>{e.moved&&(e.moved=!1,Qe(e))})}function $e(e){t.disable(t.BLEND),ee.bind(),t.uniform2f(ee.uniforms.texelSize,d.texelSizeX,d.texelSizeY),t.uniform1i(ee.uniforms.uVelocity,d.read.attach(0)),T($),U.bind(),t.uniform2f(U.uniforms.texelSize,d.texelSizeX,d.texelSizeY),t.uniform1i(U.uniforms.uVelocity,d.read.attach(0)),t.uniform1i(U.uniforms.uCurl,$.attach(1)),t.uniform1f(U.uniforms.curl,i.curl),t.uniform1f(U.uniforms.dt,e),T(d.write),d.swap(),Q.bind(),t.uniform2f(Q.uniforms.texelSize,d.texelSizeX,d.texelSizeY),t.uniform1i(Q.uniforms.uVelocity,d.read.attach(0)),T(J),Z.bind(),t.uniform1i(Z.uniforms.uTexture,C.read.attach(0)),t.uniform1f(Z.uniforms.value,i.pressure),T(C.write),C.swap(),O.bind(),t.uniform2f(O.uniforms.texelSize,d.texelSizeX,d.texelSizeY),t.uniform1i(O.uniforms.uDivergence,J.attach(0));for(let n=0;n<i.pressureIteration;n++)t.uniform1i(O.uniforms.uPressure,C.read.attach(1)),T(C.write),C.swap();N.bind(),t.uniform2f(N.uniforms.texelSize,d.texelSizeX,d.texelSizeY),t.uniform1i(N.uniforms.uPressure,C.read.attach(0)),t.uniform1i(N.uniforms.uVelocity,d.read.attach(1)),T(d.write),d.swap(),D.bind(),t.uniform2f(D.uniforms.texelSize,d.texelSizeX,d.texelSizeY),p.supportLinearFiltering||t.uniform2f(D.uniforms.dyeTexelSize,d.texelSizeX,d.texelSizeY);let r=d.read.attach(0);t.uniform1i(D.uniforms.uVelocity,r),t.uniform1i(D.uniforms.uSource,r),t.uniform1f(D.uniforms.dt,e),t.uniform1f(D.uniforms.dissipation,i.velocityDissipation),T(d.write),d.swap(),p.supportLinearFiltering||t.uniform2f(D.uniforms.dyeTexelSize,R.texelSizeX,R.texelSizeY),t.uniform1i(D.uniforms.uVelocity,d.read.attach(0)),t.uniform1i(D.uniforms.uSource,R.read.attach(1)),t.uniform1f(D.uniforms.dissipation,i.densityDissipation),T(R.write),R.swap()}function he(e){t.blendFunc(t.ONE,t.ONE_MINUS_SRC_ALPHA),t.enable(t.BLEND),Ze(e)}function Ze(e){let r=e==null?t.drawingBufferWidth:e.width,n=e==null?t.drawingBufferHeight:e.height;H.bind(),i.shading&&t.uniform2f(H.uniforms.texelSize,1/r,1/n),t.uniform1i(H.uniforms.uTexture,R.read.attach(0)),T(e)}function Qe(e){let r=e.deltaX*i.splatForce,n=e.deltaY*i.splatForce,o=ot(e.color);ie(e.texcoordX,e.texcoordY,r,n,o)}function pe(e){let r=W();r.r*=10,r.g*=10,r.b*=10;let n=10*(Math.random()-.5),o=30*(Math.random()-.5);ie(e.texcoordX,e.texcoordY,n,o,r)}function ie(e,r,n,o,u){A.bind(),t.uniform1i(A.uniforms.uTarget,d.read.attach(0)),t.uniform1f(A.uniforms.aspectRatio,a.width/a.height),t.uniform2f(A.uniforms.point,e,r),t.uniform3f(A.uniforms.color,n,o,0),t.uniform1f(A.uniforms.radius,et(i.splatRadius/100)),T(d.write),d.swap(),t.uniform1i(A.uniforms.uTarget,R.read.attach(0)),t.uniform3f(A.uniforms.color,u.r,u.g,u.b),T(R.write),R.swap()}function et(e){let r=a.width/a.height;return r>1&&(e*=r),e}let xe=e=>{let r=b[0],n=a.getBoundingClientRect(),o=y(e.clientX-n.left),u=y(e.clientY-n.top);Te(r,-1,o,u),pe(r)},ge=e=>{let r=b[0],n=a.getBoundingClientRect(),o=y(e.clientX-n.left),u=y(e.clientY-n.top),l=r.color;ye(r,o,u,l)},be=e=>{let r=e.targetTouches,n=a.getBoundingClientRect(),o=b[0];for(let u=0;u<r.length;u++){let l=y(r[u].clientX-n.left),c=y(r[u].clientY-n.top);Te(o,r[u].identifier,l,c),pe(o)}},Re=e=>{e.preventDefault();let r=e.targetTouches,n=a.getBoundingClientRect(),o=b[0];for(let u=0;u<r.length;u++){let l=y(r[u].clientX-n.left),c=y(r[u].clientY-n.top);ye(o,l,c,o.color)}},Ee=e=>{let r=e.changedTouches,n=b[0];for(let o=0;o<r.length;o++)tt(n)};window.addEventListener("mousedown",xe),window.addEventListener("mousemove",ge),window.addEventListener("touchstart",be),window.addEventListener("touchmove",Re,{passive:!1}),window.addEventListener("touchend",Ee);function Te(e,r,n,o){e.id=r,e.down=!0,e.moved=!1,e.texcoordX=n/a.width,e.texcoordY=1-o/a.height,e.prevTexcoordX=e.texcoordX,e.prevTexcoordY=e.texcoordY,e.deltaX=0,e.deltaY=0,e.color=Fe(W())}function ye(e,r,n,o){e.prevTexcoordX=e.texcoordX,e.prevTexcoordY=e.texcoordY,e.texcoordX=r/a.width,e.texcoordY=1-n/a.height,e.deltaX=rt(e.texcoordX-e.prevTexcoordX),e.deltaY=nt(e.texcoordY-e.prevTexcoordY),e.moved=Math.abs(e.deltaX)>0||Math.abs(e.deltaY)>0,e.color=o}function tt(e){e.down=!1}function rt(e){let r=a.width/a.height;return r<1&&(e*=r),e}function nt(e){let r=a.width/a.height;return r>1&&(e/=r),e}function W(){let e=i.colorIntensity,r=i.palette;if(r&&r.length>0){let o=r[Math.floor(Math.random()*r.length)],u=gt(o);if(u)return{r:u.r*e,g:u.g*e,b:u.b*e}}let n=it(Math.random(),1,1);return n.r*=e,n.g*=e,n.b*=e,n}function Fe(e){return[e.r,e.g,e.b]}function ot(e){return{r:e[0],g:e[1],b:e[2]}}function it(e,r,n){let o=0,u=0,l=0,c=Math.floor(e*6),h=e*6-c,g=n*(1-r),B=n*(1-h*r),f=n*(1-(1-h)*r);switch(c%6){case 0:o=n,u=f,l=g;break;case 1:o=B,u=n,l=g;break;case 2:o=g,u=n,l=f;break;case 3:o=g,u=B,l=n;break;case 4:o=f,u=g,l=n;break;case 5:o=n,u=g,l=B;break}return{r:o,g:u,b:l}}function ut(e,r,n){let o=n-r;return o===0?r:(e-r)%o+r}function Se(e){let r=t.drawingBufferWidth/t.drawingBufferHeight;r<1&&(r=1/r);let n=Math.round(e),o=Math.round(e*r);return t.drawingBufferWidth>t.drawingBufferHeight?{width:o,height:n}:{width:n,height:o}}function y(e){let r=Math.min(window.devicePixelRatio||1,Math.max(1,i.maxDpr));return Math.floor(e*r)}function st(e){if(e.length===0)return 0;let r=0;for(let n=0;n<e.length;n++)r=(r<<5)-r+e.charCodeAt(n),r|=0;return r}function at(){var e,r;ue||(ue=!0,q(),window.removeEventListener("mousedown",xe),window.removeEventListener("mousemove",ge),window.removeEventListener("touchstart",be),window.removeEventListener("touchmove",Re),window.removeEventListener("touchend",Ee),window.removeEventListener("resize",Le),document.removeEventListener("visibilitychange",De),(e=E==null?void 0:E.removeEventListener)==null||e.call(E,"change",we),M==null||M.disconnect(),m&&(a==null||a.remove()),(r=t.getExtension("WEBGL_lose_context"))==null||r.loseContext())}let ue=!1,k=!1;function V(){k||ue||(k=!0,ne=Date.now(),oe=requestAnimationFrame(ve))}function q(){k=!1,cancelAnimationFrame(oe)}let De=()=>{i.pauseOnHidden&&(document.hidden?q():z||V())},Le=()=>I(),M=typeof ResizeObserver!="undefined"?new ResizeObserver(()=>I()):null;M==null||M.observe(a);let E=typeof window.matchMedia=="function"?window.matchMedia("(prefers-reduced-motion: reduce)"):null,we=()=>{i.respectReducedMotion&&(E!=null&&E.matches?q():z||V())},z=!1;return window.addEventListener("resize",Le),document.addEventListener("visibilitychange",De),(Ce=E==null?void 0:E.addEventListener)==null||Ce.call(E,"change",we),i.respectReducedMotion&&Rt()?(z=!0,he(null)):V(),{dispose:at,pause(){z=!0,q()},resume(){z=!1,V()},isPaused:()=>z||!k,setConfig(e){let r=e.simResolution!==void 0&&e.simResolution!==i.simResolution||e.dyeResolution!==void 0&&e.dyeResolution!==i.dyeResolution;Object.assign(i,e),e.maxDpr!==void 0&&I(),r&&te(),e.zIndex!==void 0&&(a.style.zIndex=String(e.zIndex)),e.pointerEvents!==void 0&&(a.style.pointerEvents=e.pointerEvents?"auto":"none")},splat(e,r,n){let o=a.getBoundingClientRect(),u=y(e),l=y(r),c=n!=null?n:W();ie(u,a.height-l,0,0,c)},get canvas(){return a}}};var Ge=require("react/jsx-runtime"),Et=["densityDissipation","velocityDissipation","pressure","pressureIteration","curl","splatRadius","splatForce","shading","colorUpdateSpeed","paused","transparent","backColor","palette","colorIntensity","zIndex","pointerEvents","maxDpr","pauseOnHidden","respectReducedMotion"],Tt=s=>JSON.stringify([s==null?void 0:s.id,s==null?void 0:s.position,s==null?void 0:s.className,s==null?void 0:s.simResolution,s==null?void 0:s.dyeResolution,s==null?void 0:s.captureResolution]);function Ue(s,i){let m=P.default.useRef(null),a=P.default.useRef(s);a.current=s;let F=Tt(s);return P.default.useEffect(()=>{let w=ae({...a.current,...i!=null&&i.current?{container:i.current}:{}});return m.current=w,()=>{w.dispose(),m.current=null}},[F,i]),P.default.useEffect(()=>{let w=m.current;if(!w||!s)return;let b={};for(let t of Et)s[t]!==void 0&&(b[t]=s[t]);w.setConfig(b)}),m}var yt=P.default.forwardRef(function({config:i,scoped:m=!1,className:a,style:F,children:w},b){let t=P.default.useRef(null),p=Ue(i,m?t:void 0);return P.default.useImperativeHandle(b,()=>({dispose:()=>{var v;return(v=p.current)==null?void 0:v.dispose()},pause:()=>{var v;return(v=p.current)==null?void 0:v.pause()},resume:()=>{var v;return(v=p.current)==null?void 0:v.resume()},isPaused:()=>{var v,x;return(x=(v=p.current)==null?void 0:v.isPaused())!=null?x:!0},setConfig:v=>{var x;return(x=p.current)==null?void 0:x.setConfig(v)},splat:(v,x,j)=>{var X;return(X=p.current)==null?void 0:X.splat(v,x,j)},get canvas(){var v,x;return(x=(v=p.current)==null?void 0:v.canvas)!=null?x:null}}),[p]),m?(0,Ge.jsx)("div",{ref:t,className:a,style:{position:"relative",overflow:"hidden",...F},children:w}):null});0&&(module.exports={SmokeyFluidCursor,initFluid,useSmokeyFluidCursor});
