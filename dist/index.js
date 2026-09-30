"use client";
"use strict";var ht=Object.create;var q=Object.defineProperty;var xt=Object.getOwnPropertyDescriptor;var bt=Object.getOwnPropertyNames;var gt=Object.getPrototypeOf,Rt=Object.prototype.hasOwnProperty;var yt=(a,i)=>{for(var m in i)q(a,m,{get:i[m],enumerable:!0})},Ae=(a,i,m,u)=>{if(i&&typeof i=="object"||typeof i=="function")for(let g of bt(i))!Rt.call(a,g)&&g!==m&&q(a,g,{get:()=>i[g],enumerable:!(u=xt(i,g))||u.enumerable});return a};var Et=(a,i,m)=>(m=a!=null?ht(gt(a)):{},Ae(i||!a||!a.__esModule?q(m,"default",{value:a,enumerable:!0}):m,a)),Tt=a=>Ae(q({},"__esModule",{value:!0}),a);var Bt={};yt(Bt,{SmokeyFluidCursor:()=>_t,characterNames:()=>ze,getPreset:()=>Oe,initFluid:()=>ce,paletteNames:()=>Ne,presetNames:()=>Ie,presets:()=>K,useSmokeyFluidCursor:()=>Xe});module.exports=Tt(Bt);var A=Et(require("react"));var Ft={simResolution:128,dyeResolution:1440,captureResolution:512,densityDissipation:3.5,velocityDissipation:2,pressure:.1,pressureIteration:20,curl:10,splatRadius:.5,splatForce:6e3,shading:!0,colorUpdateSpeed:10,paused:!1,backColor:{r:0,g:0,b:0},transparent:!0,id:"smokey-fluid-canvas",position:"fixed",zIndex:-9999,pointerEvents:!1,maxDpr:2,pauseOnHidden:!0,respectReducedMotion:!0,palette:null,colorIntensity:.15},Ue=a=>{var i;return a?typeof a!="string"?a:(i=document.querySelector(a))!=null?i:document.getElementById(a):null},St=a=>{let i=a.trim().replace(/^#/,"");return i.length===3&&(i=i[0]+i[0]+i[1]+i[1]+i[2]+i[2]),/^[0-9a-f]{6}$/i.test(i)?{r:parseInt(i.slice(0,2),16)/255,g:parseInt(i.slice(2,4),16)/255,b:parseInt(i.slice(4,6),16)/255}:null},Dt=a=>{var u;if(a>=0||typeof document=="undefined"||typeof process!="undefined"&&((u=process.env)==null?void 0:u.NODE_ENV)==="production")return;let i=window.getComputedStyle(document.body).backgroundColor;i&&i!=="transparent"&&!/rgba\(\s*0\s*,\s*0\s*,\s*0\s*,\s*0\s*\)/.test(i)&&console.warn("[smokey-fluid-cursor] <body> has an opaque background ("+i+") and the canvas sits at z-index "+a+`, so the effect will be painted over and stay invisible.
Move the background to <html>, or give the canvas a zIndex above your background.`)},Lt=()=>typeof window!="undefined"&&typeof window.matchMedia=="function"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches,ue={dispose:()=>{},pause:()=>{},resume:()=>{},isPaused:()=>!0,setConfig:()=>{},splat:()=>{},canvas:null},ce=(a={})=>{var Ce,_e,Be;let i={...Ft,...a};if(typeof document=="undefined")return ue;let m=!1,u=(Ce=Ue(i.canvas))!=null?Ce:document.getElementById(i.id);if(!u){let e=(_e=Ue(i.container))!=null?_e:document.body;if(!e)return ue;u=document.createElement("canvas"),u.id=i.id,e.appendChild(u),m=!0}i.className&&u.classList.add(...i.className.split(/\s+/));let g=i.position==="fixed"||i.position==="absolute";Object.assign(u.style,{position:i.position,...g?{top:"0",left:"0",width:"100%",height:"100%"}:{},display:"block",pointerEvents:i.pointerEvents?"auto":"none",zIndex:String(i.zIndex)}),Dt(i.zIndex),N();class S{constructor(){this.id=-1;this.texcoordX=0;this.texcoordY=0;this.prevTexcoordX=0;this.prevTexcoordY=0;this.deltaX=0;this.deltaY=0;this.down=!1;this.moved=!1;this.color=[30,0,300]}}let R=[];R.push(new S);let t,h;try{({gl:t,ext:h}=v(u))}catch(e){typeof console!="undefined"&&console.warn("[smokey-fluid-cursor] WebGL is unavailable; the cursor effect is disabled.",e);let r=u,n=m;return{...ue,dispose:()=>{n&&r.remove()},setConfig:o=>{o.zIndex!==void 0&&(r.style.zIndex=String(o.zIndex)),o.pointerEvents!==void 0&&(r.style.pointerEvents=o.pointerEvents?"auto":"none")},get canvas(){return r}}}h.supportLinearFiltering||(i.dyeResolution=512,i.shading=!1);function v(e){let r={alpha:!0,depth:!1,stencil:!1,antialias:!1,preserveDrawingBuffer:!1},n=e.getContext("webgl2",r),o=!!n;if(o||(n=e.getContext("webgl",r)||e.getContext("experimental-webgl",r)),!n)throw new Error("WebGL not supported");let s=null,l,c;if(o){let d=n;d.getExtension("EXT_color_buffer_float"),l=!!d.getExtension("OES_texture_float_linear"),c=d.HALF_FLOAT}else{let d=n;if(s=d.getExtension("OES_texture_half_float"),l=!!d.getExtension("OES_texture_half_float_linear"),!s)throw new Error("OES_texture_half_float not supported on WebGL1");c=s.HALF_FLOAT_OES}n.clearColor(0,0,0,1);let p=null,b=null,C=null;if(o){let d=n;p=x(d,d.RGBA16F,d.RGBA,c),b=x(d,d.RG16F,d.RG,c),C=x(d,d.R16F,d.RED,c)}else{let d=n;p=x(d,d.RGBA,d.RGBA,c),b=x(d,d.RGBA,d.RGBA,c),C=x(d,d.RGBA,d.RGBA,c)}return{gl:n,ext:{formatRGBA:p,formatRG:b,formatR:C,halfFloatTexType:c,supportLinearFiltering:l,isWebGL2:o}}}function x(e,r,n,o){if(!$(e,r,n,o)){if(e.RGBA16F!==void 0){let s=e;switch(r){case s.R16F:return x(s,s.RG16F,s.RG,o);case s.RG16F:return x(s,s.RGBA16F,s.RGBA,o);default:return null}}return null}return{internalFormat:r,format:n}}function $(e,r,n,o){let s=e.createTexture();if(!s)return!1;e.bindTexture(e.TEXTURE_2D,s),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texImage2D(e.TEXTURE_2D,0,r,4,4,0,n,o,null);let l=e.createFramebuffer();if(!l)return!1;e.bindFramebuffer(e.FRAMEBUFFER,l),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,s,0);let c=e.checkFramebufferStatus(e.FRAMEBUFFER);return e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(l),e.deleteTexture(s),c===e.FRAMEBUFFER_COMPLETE}class z{constructor(r,n){this.vertexShader=r,this.fragmentShaderSource=n,this.programs={},this.activeProgram=null,this.uniforms={}}setKeywords(r){let n=0;for(let s=0;s<r.length;s++)n+=vt(r[s]);let o=this.programs[n];if(!o){let s=D(t,t.FRAGMENT_SHADER,de(this.fragmentShaderSource,r));o=le(t,this.vertexShader,s),this.programs[n]=o}o!==this.activeProgram&&(this.uniforms=fe(t,o),this.activeProgram=o)}bind(){this.activeProgram&&t.useProgram(this.activeProgram)}}class P{constructor(r,n){this.program=le(t,r,n),this.uniforms=fe(t,this.program)}bind(){this.program&&t.useProgram(this.program)}}function le(e,r,n){let o=e.createProgram();return e.attachShader(o,r),e.attachShader(o,n),e.bindAttribLocation(o,0,"aPosition"),e.linkProgram(o),e.getProgramParameter(o,e.LINK_STATUS)||console.trace(e.getProgramInfoLog(o)),o}function fe(e,r){let n={},o=e.getProgramParameter(r,e.ACTIVE_UNIFORMS);for(let s=0;s<o;s++){let l=e.getActiveUniform(r,s);if(!l)continue;let c=l.name,p=e.getUniformLocation(r,c);p&&(n[c]=p)}return n}function D(e,r,n){let o=e.createShader(r);return e.shaderSource(o,n),e.compileShader(o),e.getShaderParameter(o,e.COMPILE_STATUS)||console.trace(e.getShaderInfoLog(o)),o}function de(e,r){if(!r||r.length===0)return e;let n="";return r.forEach(o=>{n+="#define "+o+`
`}),n+e}let w=D(t,t.VERTEX_SHADER,`precision highp float;
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
}`),He=D(t,t.FRAGMENT_SHADER,`precision mediump float;
precision mediump sampler2D;
varying highp vec2 vUv;
uniform sampler2D uTexture;
void main () {
gl_FragColor = texture2D(uTexture, vUv);
}`),Ye=D(t,t.FRAGMENT_SHADER,`precision mediump float;
precision mediump sampler2D;
varying highp vec2 vUv;
uniform sampler2D uTexture;
uniform float value;
void main () {
gl_FragColor = value * texture2D(uTexture, vUv);
}`),We=`precision highp float;
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
}`,Ve=D(t,t.FRAGMENT_SHADER,`precision highp float;
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
}`),je=D(t,t.FRAGMENT_SHADER,de(`precision highp float;
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
}`,h.supportLinearFiltering?null:["MANUAL_FILTERING"])),qe=D(t,t.FRAGMENT_SHADER,`precision mediump float;
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
}`),Ke=D(t,t.FRAGMENT_SHADER,`precision mediump float;
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
}`),$e=D(t,t.FRAGMENT_SHADER,`precision highp float;
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
}`),Je=D(t,t.FRAGMENT_SHADER,`precision mediump float;
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
}`),Ze=D(t,t.FRAGMENT_SHADER,`precision mediump float;
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
}`),T=(()=>{let e=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,e),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,1,1,-1]),t.STATIC_DRAW);let r=t.createBuffer();return t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,r),t.bufferData(t.ELEMENT_ARRAY_BUFFER,new Uint16Array([0,1,2,0,2,3]),t.STATIC_DRAW),t.vertexAttribPointer(0,2,t.FLOAT,!1,0,0),t.enableVertexAttribArray(0),(n,o=!1)=>{n==null?(t.viewport(0,0,t.drawingBufferWidth,t.drawingBufferHeight),t.bindFramebuffer(t.FRAMEBUFFER,null)):(t.viewport(0,0,n.width,n.height),t.bindFramebuffer(t.FRAMEBUFFER,n.fbo)),o&&(t.clearColor(0,0,0,1),t.clear(t.COLOR_BUFFER_BIT)),t.drawElements(t.TRIANGLES,6,t.UNSIGNED_SHORT,0)}})(),y,f,J,Z,_,me=new P(w,He),Q=new P(w,Ye),B=new P(w,Ve),L=new P(w,je),ee=new P(w,qe),te=new P(w,Ke),U=new P(w,$e),O=new P(w,Je),X=new P(w,Ze),k=new z(w,We);function re(){let e=De(i.simResolution),r=De(i.dyeResolution),n=h.halfFloatTexType,o=h.formatRGBA,s=h.formatRG,l=h.formatR,c=h.supportLinearFiltering?t.LINEAR:t.NEAREST;t.disable(t.BLEND),y==null?y=ne(r.width,r.height,o.internalFormat,o.format,n,c):y=ve(y,r.width,r.height,o.internalFormat,o.format,n,c),f==null?f=ne(e.width,e.height,s.internalFormat,s.format,n,c):f=ve(f,e.width,e.height,s.internalFormat,s.format,n,c),J=G(e.width,e.height,l.internalFormat,l.format,n,t.NEAREST),Z=G(e.width,e.height,l.internalFormat,l.format,n,t.NEAREST),_=ne(e.width,e.height,l.internalFormat,l.format,n,t.NEAREST)}function G(e,r,n,o,s,l){t.activeTexture(t.TEXTURE0);let c=t.createTexture();t.bindTexture(t.TEXTURE_2D,c),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,l),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,l),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texImage2D(t.TEXTURE_2D,0,n,e,r,0,o,s,null);let p=t.createFramebuffer();t.bindFramebuffer(t.FRAMEBUFFER,p),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,c,0),t.viewport(0,0,e,r),t.clear(t.COLOR_BUFFER_BIT);let b=1/e,C=1/r;return{texture:c,fbo:p,width:e,height:r,texelSizeX:b,texelSizeY:C,attach(d){return t.activeTexture(t.TEXTURE0+d),t.bindTexture(t.TEXTURE_2D,c),d}}}function ne(e,r,n,o,s,l){let c=G(e,r,n,o,s,l),p=G(e,r,n,o,s,l);return{width:e,height:r,texelSizeX:c.texelSizeX,texelSizeY:c.texelSizeY,get read(){return c},set read(b){c=b},get write(){return p},set write(b){p=b},swap(){let b=c;c=p,p=b}}}function Qe(e,r,n,o,s,l,c){let p=G(r,n,o,s,l,c);return me.bind(),t.uniform1i(me.uniforms.uTexture,e.attach(0)),T(p),p}function ve(e,r,n,o,s,l,c){return e.width===r&&e.height===n||(e.read=Qe(e.read,r,n,o,s,l,c),e.write=G(r,n,o,s,l,c),e.width=r,e.height=n,e.texelSizeX=1/r,e.texelSizeY=1/n),e}function et(){let e=[];i.shading&&e.push("shading"),k.setKeywords(e)}et(),re();let oe=Date.now(),H=0,ie=0;function pe(){let e=tt();N()&&re(),rt(e),nt(),i.paused||ot(e),he(null),ie=requestAnimationFrame(pe)}function tt(){let e=Date.now(),r=(e-oe)/1e3;return r=Math.min(r,.016666),oe=e,r}function N(){let e=F(u.clientWidth),r=F(u.clientHeight);return u.width!==e||u.height!==r?(u.width=e,u.height=r,!0):!1}function rt(e){H+=e*i.colorUpdateSpeed,H>=1&&(H=mt(H,0,1),R.forEach(r=>{r.color=Se(Y())}))}function nt(){R.forEach(e=>{e.moved&&(e.moved=!1,st(e))})}function ot(e){t.disable(t.BLEND),te.bind(),t.uniform2f(te.uniforms.texelSize,f.texelSizeX,f.texelSizeY),t.uniform1i(te.uniforms.uVelocity,f.read.attach(0)),T(Z),U.bind(),t.uniform2f(U.uniforms.texelSize,f.texelSizeX,f.texelSizeY),t.uniform1i(U.uniforms.uVelocity,f.read.attach(0)),t.uniform1i(U.uniforms.uCurl,Z.attach(1)),t.uniform1f(U.uniforms.curl,i.curl),t.uniform1f(U.uniforms.dt,e),T(f.write),f.swap(),ee.bind(),t.uniform2f(ee.uniforms.texelSize,f.texelSizeX,f.texelSizeY),t.uniform1i(ee.uniforms.uVelocity,f.read.attach(0)),T(J),Q.bind(),t.uniform1i(Q.uniforms.uTexture,_.read.attach(0)),t.uniform1f(Q.uniforms.value,i.pressure),T(_.write),_.swap(),O.bind(),t.uniform2f(O.uniforms.texelSize,f.texelSizeX,f.texelSizeY),t.uniform1i(O.uniforms.uDivergence,J.attach(0));for(let n=0;n<i.pressureIteration;n++)t.uniform1i(O.uniforms.uPressure,_.read.attach(1)),T(_.write),_.swap();X.bind(),t.uniform2f(X.uniforms.texelSize,f.texelSizeX,f.texelSizeY),t.uniform1i(X.uniforms.uPressure,_.read.attach(0)),t.uniform1i(X.uniforms.uVelocity,f.read.attach(1)),T(f.write),f.swap(),L.bind(),t.uniform2f(L.uniforms.texelSize,f.texelSizeX,f.texelSizeY),h.supportLinearFiltering||t.uniform2f(L.uniforms.dyeTexelSize,f.texelSizeX,f.texelSizeY);let r=f.read.attach(0);t.uniform1i(L.uniforms.uVelocity,r),t.uniform1i(L.uniforms.uSource,r),t.uniform1f(L.uniforms.dt,e),t.uniform1f(L.uniforms.dissipation,i.velocityDissipation),T(f.write),f.swap(),h.supportLinearFiltering||t.uniform2f(L.uniforms.dyeTexelSize,y.texelSizeX,y.texelSizeY),t.uniform1i(L.uniforms.uVelocity,f.read.attach(0)),t.uniform1i(L.uniforms.uSource,y.read.attach(1)),t.uniform1f(L.uniforms.dissipation,i.densityDissipation),T(y.write),y.swap()}function he(e){t.blendFunc(t.ONE,t.ONE_MINUS_SRC_ALPHA),t.enable(t.BLEND),it(e)}function it(e){let r=e==null?t.drawingBufferWidth:e.width,n=e==null?t.drawingBufferHeight:e.height;k.bind(),i.shading&&t.uniform2f(k.uniforms.texelSize,1/r,1/n),t.uniform1i(k.uniforms.uTexture,y.read.attach(0)),T(e)}function st(e){let r=e.deltaX*i.splatForce,n=e.deltaY*i.splatForce,o=ft(e.color);se(e.texcoordX,e.texcoordY,r,n,o)}function xe(e){let r=Y();r.r*=10,r.g*=10,r.b*=10;let n=10*(Math.random()-.5),o=30*(Math.random()-.5);se(e.texcoordX,e.texcoordY,n,o,r)}function se(e,r,n,o,s){B.bind(),t.uniform1i(B.uniforms.uTarget,f.read.attach(0)),t.uniform1f(B.uniforms.aspectRatio,u.width/u.height),t.uniform2f(B.uniforms.point,e,r),t.uniform3f(B.uniforms.color,n,o,0),t.uniform1f(B.uniforms.radius,at(i.splatRadius/100)),T(f.write),f.swap(),t.uniform1i(B.uniforms.uTarget,y.read.attach(0)),t.uniform3f(B.uniforms.color,s.r,s.g,s.b),T(y.write),y.swap()}function at(e){let r=u.width/u.height;return r>1&&(e*=r),e}let be=e=>{let r=R[0],n=u.getBoundingClientRect(),o=F(e.clientX-n.left),s=F(e.clientY-n.top);Te(r,-1,o,s),xe(r)},ge=e=>{let r=R[0],n=u.getBoundingClientRect(),o=F(e.clientX-n.left),s=F(e.clientY-n.top),l=r.color;Fe(r,o,s,l)},Re=e=>{let r=e.targetTouches,n=u.getBoundingClientRect(),o=R[0];for(let s=0;s<r.length;s++){let l=F(r[s].clientX-n.left),c=F(r[s].clientY-n.top);Te(o,r[s].identifier,l,c),xe(o)}},ye=e=>{e.preventDefault();let r=e.targetTouches,n=u.getBoundingClientRect(),o=R[0];for(let s=0;s<r.length;s++){let l=F(r[s].clientX-n.left),c=F(r[s].clientY-n.top);Fe(o,l,c,o.color)}},Ee=e=>{let r=e.changedTouches,n=R[0];for(let o=0;o<r.length;o++)ut(n)};window.addEventListener("mousedown",be),window.addEventListener("mousemove",ge),window.addEventListener("touchstart",Re),window.addEventListener("touchmove",ye,{passive:!1}),window.addEventListener("touchend",Ee);function Te(e,r,n,o){e.id=r,e.down=!0,e.moved=!1,e.texcoordX=n/u.width,e.texcoordY=1-o/u.height,e.prevTexcoordX=e.texcoordX,e.prevTexcoordY=e.texcoordY,e.deltaX=0,e.deltaY=0,e.color=Se(Y())}function Fe(e,r,n,o){e.prevTexcoordX=e.texcoordX,e.prevTexcoordY=e.texcoordY,e.texcoordX=r/u.width,e.texcoordY=1-n/u.height,e.deltaX=ct(e.texcoordX-e.prevTexcoordX),e.deltaY=lt(e.texcoordY-e.prevTexcoordY),e.moved=Math.abs(e.deltaX)>0||Math.abs(e.deltaY)>0,e.color=o}function ut(e){e.down=!1}function ct(e){let r=u.width/u.height;return r<1&&(e*=r),e}function lt(e){let r=u.width/u.height;return r>1&&(e/=r),e}function Y(){let e=i.colorIntensity,r=i.palette;if(r&&r.length>0){let o=r[Math.floor(Math.random()*r.length)],s=St(o);if(s)return{r:s.r*e,g:s.g*e,b:s.b*e}}let n=dt(Math.random(),1,1);return n.r*=e,n.g*=e,n.b*=e,n}function Se(e){return[e.r,e.g,e.b]}function ft(e){return{r:e[0],g:e[1],b:e[2]}}function dt(e,r,n){let o=0,s=0,l=0,c=Math.floor(e*6),p=e*6-c,b=n*(1-r),C=n*(1-p*r),d=n*(1-(1-p)*r);switch(c%6){case 0:o=n,s=d,l=b;break;case 1:o=C,s=n,l=b;break;case 2:o=b,s=n,l=d;break;case 3:o=b,s=C,l=n;break;case 4:o=d,s=b,l=n;break;case 5:o=n,s=b,l=C;break}return{r:o,g:s,b:l}}function mt(e,r,n){let o=n-r;return o===0?r:(e-r)%o+r}function De(e){let r=t.drawingBufferWidth/t.drawingBufferHeight;r<1&&(r=1/r);let n=Math.round(e),o=Math.round(e*r);return t.drawingBufferWidth>t.drawingBufferHeight?{width:o,height:n}:{width:n,height:o}}function F(e){let r=Math.min(window.devicePixelRatio||1,Math.max(1,i.maxDpr));return Math.floor(e*r)}function vt(e){if(e.length===0)return 0;let r=0;for(let n=0;n<e.length;n++)r=(r<<5)-r+e.charCodeAt(n),r|=0;return r}function pt(){var e,r;ae||(ae=!0,j(),window.removeEventListener("mousedown",be),window.removeEventListener("mousemove",ge),window.removeEventListener("touchstart",Re),window.removeEventListener("touchmove",ye),window.removeEventListener("touchend",Ee),window.removeEventListener("resize",we),document.removeEventListener("visibilitychange",Le),(e=E==null?void 0:E.removeEventListener)==null||e.call(E,"change",Pe),M==null||M.disconnect(),m&&(u==null||u.remove()),(r=t.getExtension("WEBGL_lose_context"))==null||r.loseContext())}let ae=!1,W=!1;function V(){W||ae||(W=!0,oe=Date.now(),ie=requestAnimationFrame(pe))}function j(){W=!1,cancelAnimationFrame(ie)}let Le=()=>{i.pauseOnHidden&&(document.hidden?j():I||V())},we=()=>N(),M=typeof ResizeObserver!="undefined"?new ResizeObserver(()=>N()):null;M==null||M.observe(u);let E=typeof window.matchMedia=="function"?window.matchMedia("(prefers-reduced-motion: reduce)"):null,Pe=()=>{i.respectReducedMotion&&(E!=null&&E.matches?j():I||V())},I=!1;return window.addEventListener("resize",we),document.addEventListener("visibilitychange",Le),(Be=E==null?void 0:E.addEventListener)==null||Be.call(E,"change",Pe),i.respectReducedMotion&&Lt()?(I=!0,he(null)):V(),{dispose:pt,pause(){I=!0,j()},resume(){I=!1,V()},isPaused:()=>I||!W,setConfig(e){let r=e.simResolution!==void 0&&e.simResolution!==i.simResolution||e.dyeResolution!==void 0&&e.dyeResolution!==i.dyeResolution;Object.assign(i,e),e.maxDpr!==void 0&&N(),r&&re(),e.zIndex!==void 0&&(u.style.zIndex=String(e.zIndex)),e.pointerEvents!==void 0&&(u.style.pointerEvents=e.pointerEvents?"auto":"none")},splat(e,r,n){let o=u.getBoundingClientRect(),s=F(e),l=F(r),c=n!=null?n:Y();se(s,u.height-l,0,0,c)},get canvas(){return u}}};var Ge={Spectrum:null,Sunset:["#ff4ecd","#ff8a4e","#ffd24e"],Ocean:["#4ea8ff","#4effd2","#7c4dff"],Mono:["#ffffff"],Aurora:["#3affa3","#38d9ff","#8f7bff"],Ember:["#ff5722","#ff9100","#ffc400"],Lagoon:["#00c2a8","#00a3ff","#0057d9"],Candy:["#ff8fd0","#ffa9f0","#c79bff"],Toxic:["#b6ff00","#4dff88","#00ffc8"],Royal:["#5b2bff","#8f4dff","#c44dff"],Sakura:["#ffc2dd","#ff8fb1","#ff6f91"],Mint:["#9cffd6","#5ef2c0","#2fd6a5"],Copper:["#ff9a5a","#e2703a","#b34700"],Ultraviolet:["#7b2cff","#b429ff","#ff29f0"],Ice:["#c9f0ff","#8ad4ff","#4fb3ff"],Magma:["#ff2d2d","#ff6a00","#ffb300"],Forest:["#2f9e44","#69db7c","#a9e34b"],Dusk:["#3b3b98","#7158e2","#cd84f1"],Cyber:["#00fff0","#ff00e0","#fffb00"],Pastel:["#ffd6e0","#c7ceea","#b5ead7"]},Me={Calm:{curl:3,splatForce:4200,splatRadius:.45,densityDissipation:4.6,velocityDissipation:2.6,pressureIteration:16,colorUpdateSpeed:6},Flow:{curl:10,splatForce:6e3,splatRadius:.5,densityDissipation:3.5,velocityDissipation:2,pressureIteration:20,colorUpdateSpeed:10},Swirl:{curl:24,splatForce:7200,splatRadius:.55,densityDissipation:3,velocityDissipation:1.6,pressureIteration:24,colorUpdateSpeed:12},Storm:{curl:40,splatForce:9500,splatRadius:.65,densityDissipation:2.2,velocityDissipation:1.2,pressureIteration:28,colorUpdateSpeed:16},Wisp:{curl:6,splatForce:3200,splatRadius:.32,densityDissipation:6.5,velocityDissipation:3.4,pressureIteration:12,colorUpdateSpeed:8}},wt=()=>{let a={};for(let[i,m]of Object.entries(Ge))for(let[u,g]of Object.entries(Me)){let S=`${i} ${u}`;a[S]={...g,palette:m?[...m]:null,colorIntensity:m===null?.15:.18}}return a},K=wt(),Ie=Object.keys(K),Ne=Object.keys(Ge),ze=Object.keys(Me),Oe=a=>K[a];var ke=require("react/jsx-runtime"),Pt=["densityDissipation","velocityDissipation","pressure","pressureIteration","curl","splatRadius","splatForce","shading","colorUpdateSpeed","paused","transparent","backColor","palette","colorIntensity","zIndex","pointerEvents","maxDpr","pauseOnHidden","respectReducedMotion"],Ct=a=>JSON.stringify([a==null?void 0:a.id,a==null?void 0:a.position,a==null?void 0:a.className,a==null?void 0:a.simResolution,a==null?void 0:a.dyeResolution,a==null?void 0:a.captureResolution]);function Xe(a,i){let m=A.default.useRef(null),u=A.default.useRef(a);u.current=a;let g=Ct(a);return A.default.useEffect(()=>{let S=ce({...u.current,...i!=null&&i.current?{container:i.current}:{}});return m.current=S,()=>{S.dispose(),m.current=null}},[g,i]),A.default.useEffect(()=>{let S=m.current;if(!S||!a)return;let R={};for(let t of Pt)a[t]!==void 0&&(R[t]=a[t]);S.setConfig(R)}),m}var _t=A.default.forwardRef(function({config:i,scoped:m=!1,className:u,style:g,children:S},R){let t=A.default.useRef(null),h=Xe(i,m?t:void 0);return A.default.useImperativeHandle(R,()=>({dispose:()=>{var v;return(v=h.current)==null?void 0:v.dispose()},pause:()=>{var v;return(v=h.current)==null?void 0:v.pause()},resume:()=>{var v;return(v=h.current)==null?void 0:v.resume()},isPaused:()=>{var v,x;return(x=(v=h.current)==null?void 0:v.isPaused())!=null?x:!0},setConfig:v=>{var x;return(x=h.current)==null?void 0:x.setConfig(v)},splat:(v,x,$)=>{var z;return(z=h.current)==null?void 0:z.splat(v,x,$)},get canvas(){var v,x;return(x=(v=h.current)==null?void 0:v.canvas)!=null?x:null}}),[h]),m?(0,ke.jsx)("div",{ref:t,className:u,style:{position:"relative",overflow:"hidden",...g},children:S}):null});0&&(module.exports={SmokeyFluidCursor,characterNames,getPreset,initFluid,paletteNames,presetNames,presets,useSmokeyFluidCursor});
