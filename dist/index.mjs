"use client";
import A from"react";var ut={simResolution:128,dyeResolution:1440,captureResolution:512,densityDissipation:3.5,velocityDissipation:2,pressure:.1,pressureIteration:20,curl:10,splatRadius:.5,splatForce:6e3,shading:!0,colorUpdateSpeed:10,paused:!1,backColor:{r:0,g:0,b:0},transparent:!0,id:"smokey-fluid-canvas",position:"fixed",zIndex:-9999,pointerEvents:!1,maxDpr:2,pauseOnHidden:!0,respectReducedMotion:!0,palette:null,colorIntensity:.15},_e=c=>{var s;return c?typeof c!="string"?c:(s=document.querySelector(c))!=null?s:document.getElementById(c):null},ct=c=>{let s=c.trim().replace(/^#/,"");return s.length===3&&(s=s[0]+s[0]+s[1]+s[1]+s[2]+s[2]),/^[0-9a-f]{6}$/i.test(s)?{r:parseInt(s.slice(0,2),16)/255,g:parseInt(s.slice(2,4),16)/255,b:parseInt(s.slice(4,6),16)/255}:null},lt=c=>{var a;if(c>=0||typeof document=="undefined"||typeof process!="undefined"&&((a=process.env)==null?void 0:a.NODE_ENV)==="production")return;let s=window.getComputedStyle(document.body).backgroundColor;s&&s!=="transparent"&&!/rgba\(\s*0\s*,\s*0\s*,\s*0\s*,\s*0\s*\)/.test(s)&&console.warn("[smokey-fluid-cursor] <body> has an opaque background ("+s+") and the canvas sits at z-index "+c+`, so the effect will be painted over and stay invisible.
Move the background to <html>, or give the canvas a zIndex above your background.`)},ft=()=>typeof window!="undefined"&&typeof window.matchMedia=="function"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches,se={dispose:()=>{},pause:()=>{},resume:()=>{},isPaused:()=>!0,setConfig:()=>{},splat:()=>{},canvas:null},Be=(c={})=>{var we,Pe,Ce;let s={...ut,...c};if(typeof document=="undefined")return se;let b=!1,a=(we=_e(s.canvas))!=null?we:document.getElementById(s.id);if(!a){let e=(Pe=_e(s.container))!=null?Pe:document.body;if(!e)return se;a=document.createElement("canvas"),a.id=s.id,e.appendChild(a),b=!0}s.className&&a.classList.add(...s.className.split(/\s+/));let B=s.position==="fixed"||s.position==="absolute";Object.assign(a.style,{position:s.position,...B?{top:"0",left:"0",width:"100%",height:"100%"}:{},display:"block",pointerEvents:s.pointerEvents?"auto":"none",zIndex:String(s.zIndex)}),lt(s.zIndex),N();class F{constructor(){this.id=-1;this.texcoordX=0;this.texcoordY=0;this.prevTexcoordX=0;this.prevTexcoordY=0;this.deltaX=0;this.deltaY=0;this.down=!1;this.moved=!1;this.color=[30,0,300]}}let g=[];g.push(new F);let t,p;try{({gl:t,ext:p}=m(a))}catch(e){typeof console!="undefined"&&console.warn("[smokey-fluid-cursor] WebGL is unavailable; the cursor effect is disabled.",e);let r=a,n=b;return{...se,dispose:()=>{n&&r.remove()},setConfig:o=>{o.zIndex!==void 0&&(r.style.zIndex=String(o.zIndex)),o.pointerEvents!==void 0&&(r.style.pointerEvents=o.pointerEvents?"auto":"none")},get canvas(){return r}}}p.supportLinearFiltering||(s.dyeResolution=512,s.shading=!1);function m(e){let r={alpha:!0,depth:!1,stencil:!1,antialias:!1,preserveDrawingBuffer:!1},n=e.getContext("webgl2",r),o=!!n;if(o||(n=e.getContext("webgl",r)||e.getContext("experimental-webgl",r)),!n)throw new Error("WebGL not supported");let i=null,l,u;if(o){let d=n;d.getExtension("EXT_color_buffer_float"),l=!!d.getExtension("OES_texture_float_linear"),u=d.HALF_FLOAT}else{let d=n;if(i=d.getExtension("OES_texture_half_float"),l=!!d.getExtension("OES_texture_half_float_linear"),!i)throw new Error("OES_texture_half_float not supported on WebGL1");u=i.HALF_FLOAT_OES}n.clearColor(0,0,0,1);let v=null,x=null,P=null;if(o){let d=n;v=h(d,d.RGBA16F,d.RGBA,u),x=h(d,d.RG16F,d.RG,u),P=h(d,d.R16F,d.RED,u)}else{let d=n;v=h(d,d.RGBA,d.RGBA,u),x=h(d,d.RGBA,d.RGBA,u),P=h(d,d.RGBA,d.RGBA,u)}return{gl:n,ext:{formatRGBA:v,formatRG:x,formatR:P,halfFloatTexType:u,supportLinearFiltering:l,isWebGL2:o}}}function h(e,r,n,o){if(!q(e,r,n,o)){if(e.RGBA16F!==void 0){let i=e;switch(r){case i.R16F:return h(i,i.RG16F,i.RG,o);case i.RG16F:return h(i,i.RGBA16F,i.RGBA,o);default:return null}}return null}return{internalFormat:r,format:n}}function q(e,r,n,o){let i=e.createTexture();if(!i)return!1;e.bindTexture(e.TEXTURE_2D,i),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texImage2D(e.TEXTURE_2D,0,r,4,4,0,n,o,null);let l=e.createFramebuffer();if(!l)return!1;e.bindFramebuffer(e.FRAMEBUFFER,l),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,i,0);let u=e.checkFramebufferStatus(e.FRAMEBUFFER);return e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(l),e.deleteTexture(i),u===e.FRAMEBUFFER_COMPLETE}class z{constructor(r,n){this.vertexShader=r,this.fragmentShaderSource=n,this.programs={},this.activeProgram=null,this.uniforms={}}setKeywords(r){let n=0;for(let i=0;i<r.length;i++)n+=st(r[i]);let o=this.programs[n];if(!o){let i=S(t,t.FRAGMENT_SHADER,le(this.fragmentShaderSource,r));o=ue(t,this.vertexShader,i),this.programs[n]=o}o!==this.activeProgram&&(this.uniforms=ce(t,o),this.activeProgram=o)}bind(){this.activeProgram&&t.useProgram(this.activeProgram)}}class w{constructor(r,n){this.program=ue(t,r,n),this.uniforms=ce(t,this.program)}bind(){this.program&&t.useProgram(this.program)}}function ue(e,r,n){let o=e.createProgram();return e.attachShader(o,r),e.attachShader(o,n),e.bindAttribLocation(o,0,"aPosition"),e.linkProgram(o),e.getProgramParameter(o,e.LINK_STATUS)||console.trace(e.getProgramInfoLog(o)),o}function ce(e,r){let n={},o=e.getProgramParameter(r,e.ACTIVE_UNIFORMS);for(let i=0;i<o;i++){let l=e.getActiveUniform(r,i);if(!l)continue;let u=l.name,v=e.getUniformLocation(r,u);v&&(n[u]=v)}return n}function S(e,r,n){let o=e.createShader(r);return e.shaderSource(o,n),e.compileShader(o),e.getShaderParameter(o,e.COMPILE_STATUS)||console.trace(e.getShaderInfoLog(o)),o}function le(e,r){if(!r||r.length===0)return e;let n="";return r.forEach(o=>{n+="#define "+o+`
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
}`),Ge=S(t,t.FRAGMENT_SHADER,`precision mediump float;
precision mediump sampler2D;
varying highp vec2 vUv;
uniform sampler2D uTexture;
void main () {
gl_FragColor = texture2D(uTexture, vUv);
}`),Me=S(t,t.FRAGMENT_SHADER,`precision mediump float;
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
}`,Ne=S(t,t.FRAGMENT_SHADER,`precision highp float;
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
}`),ze=S(t,t.FRAGMENT_SHADER,le(`precision highp float;
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
}`,p.supportLinearFiltering?null:["MANUAL_FILTERING"])),Oe=S(t,t.FRAGMENT_SHADER,`precision mediump float;
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
}`),Xe=S(t,t.FRAGMENT_SHADER,`precision mediump float;
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
}`),ke=S(t,t.FRAGMENT_SHADER,`precision highp float;
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
}`),He=S(t,t.FRAGMENT_SHADER,`precision mediump float;
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
}`),Ye=S(t,t.FRAGMENT_SHADER,`precision mediump float;
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
}`),E=(()=>{let e=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,e),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,1,1,-1]),t.STATIC_DRAW);let r=t.createBuffer();return t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,r),t.bufferData(t.ELEMENT_ARRAY_BUFFER,new Uint16Array([0,1,2,0,2,3]),t.STATIC_DRAW),t.vertexAttribPointer(0,2,t.FLOAT,!1,0,0),t.enableVertexAttribArray(0),(n,o=!1)=>{n==null?(t.viewport(0,0,t.drawingBufferWidth,t.drawingBufferHeight),t.bindFramebuffer(t.FRAMEBUFFER,null)):(t.viewport(0,0,n.width,n.height),t.bindFramebuffer(t.FRAMEBUFFER,n.fbo)),o&&(t.clearColor(0,0,0,1),t.clear(t.COLOR_BUFFER_BIT)),t.drawElements(t.TRIANGLES,6,t.UNSIGNED_SHORT,0)}})(),R,f,K,$,C,fe=new w(L,Ge),J=new w(L,Me),_=new w(L,Ne),D=new w(L,ze),Z=new w(L,Oe),Q=new w(L,Xe),U=new w(L,ke),O=new w(L,He),X=new w(L,Ye),k=new z(L,Ie);function ee(){let e=Fe(s.simResolution),r=Fe(s.dyeResolution),n=p.halfFloatTexType,o=p.formatRGBA,i=p.formatRG,l=p.formatR,u=p.supportLinearFiltering?t.LINEAR:t.NEAREST;t.disable(t.BLEND),R==null?R=te(r.width,r.height,o.internalFormat,o.format,n,u):R=de(R,r.width,r.height,o.internalFormat,o.format,n,u),f==null?f=te(e.width,e.height,i.internalFormat,i.format,n,u):f=de(f,e.width,e.height,i.internalFormat,i.format,n,u),K=G(e.width,e.height,l.internalFormat,l.format,n,t.NEAREST),$=G(e.width,e.height,l.internalFormat,l.format,n,t.NEAREST),C=te(e.width,e.height,l.internalFormat,l.format,n,t.NEAREST)}function G(e,r,n,o,i,l){t.activeTexture(t.TEXTURE0);let u=t.createTexture();t.bindTexture(t.TEXTURE_2D,u),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,l),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,l),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texImage2D(t.TEXTURE_2D,0,n,e,r,0,o,i,null);let v=t.createFramebuffer();t.bindFramebuffer(t.FRAMEBUFFER,v),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,u,0),t.viewport(0,0,e,r),t.clear(t.COLOR_BUFFER_BIT);let x=1/e,P=1/r;return{texture:u,fbo:v,width:e,height:r,texelSizeX:x,texelSizeY:P,attach(d){return t.activeTexture(t.TEXTURE0+d),t.bindTexture(t.TEXTURE_2D,u),d}}}function te(e,r,n,o,i,l){let u=G(e,r,n,o,i,l),v=G(e,r,n,o,i,l);return{width:e,height:r,texelSizeX:u.texelSizeX,texelSizeY:u.texelSizeY,get read(){return u},set read(x){u=x},get write(){return v},set write(x){v=x},swap(){let x=u;u=v,v=x}}}function We(e,r,n,o,i,l,u){let v=G(r,n,o,i,l,u);return fe.bind(),t.uniform1i(fe.uniforms.uTexture,e.attach(0)),E(v),v}function de(e,r,n,o,i,l,u){return e.width===r&&e.height===n||(e.read=We(e.read,r,n,o,i,l,u),e.write=G(r,n,o,i,l,u),e.width=r,e.height=n,e.texelSizeX=1/r,e.texelSizeY=1/n),e}function Ve(){let e=[];s.shading&&e.push("shading"),k.setKeywords(e)}Ve(),ee();let re=Date.now(),H=0,ne=0;function me(){let e=je();N()&&ee(),qe(e),Ke(),s.paused||$e(e),ve(null),ne=requestAnimationFrame(me)}function je(){let e=Date.now(),r=(e-re)/1e3;return r=Math.min(r,.016666),re=e,r}function N(){let e=T(a.clientWidth),r=T(a.clientHeight);return a.width!==e||a.height!==r?(a.width=e,a.height=r,!0):!1}function qe(e){H+=e*s.colorUpdateSpeed,H>=1&&(H=it(H,0,1),g.forEach(r=>{r.color=Te(Y())}))}function Ke(){g.forEach(e=>{e.moved&&(e.moved=!1,Ze(e))})}function $e(e){t.disable(t.BLEND),Q.bind(),t.uniform2f(Q.uniforms.texelSize,f.texelSizeX,f.texelSizeY),t.uniform1i(Q.uniforms.uVelocity,f.read.attach(0)),E($),U.bind(),t.uniform2f(U.uniforms.texelSize,f.texelSizeX,f.texelSizeY),t.uniform1i(U.uniforms.uVelocity,f.read.attach(0)),t.uniform1i(U.uniforms.uCurl,$.attach(1)),t.uniform1f(U.uniforms.curl,s.curl),t.uniform1f(U.uniforms.dt,e),E(f.write),f.swap(),Z.bind(),t.uniform2f(Z.uniforms.texelSize,f.texelSizeX,f.texelSizeY),t.uniform1i(Z.uniforms.uVelocity,f.read.attach(0)),E(K),J.bind(),t.uniform1i(J.uniforms.uTexture,C.read.attach(0)),t.uniform1f(J.uniforms.value,s.pressure),E(C.write),C.swap(),O.bind(),t.uniform2f(O.uniforms.texelSize,f.texelSizeX,f.texelSizeY),t.uniform1i(O.uniforms.uDivergence,K.attach(0));for(let n=0;n<s.pressureIteration;n++)t.uniform1i(O.uniforms.uPressure,C.read.attach(1)),E(C.write),C.swap();X.bind(),t.uniform2f(X.uniforms.texelSize,f.texelSizeX,f.texelSizeY),t.uniform1i(X.uniforms.uPressure,C.read.attach(0)),t.uniform1i(X.uniforms.uVelocity,f.read.attach(1)),E(f.write),f.swap(),D.bind(),t.uniform2f(D.uniforms.texelSize,f.texelSizeX,f.texelSizeY),p.supportLinearFiltering||t.uniform2f(D.uniforms.dyeTexelSize,f.texelSizeX,f.texelSizeY);let r=f.read.attach(0);t.uniform1i(D.uniforms.uVelocity,r),t.uniform1i(D.uniforms.uSource,r),t.uniform1f(D.uniforms.dt,e),t.uniform1f(D.uniforms.dissipation,s.velocityDissipation),E(f.write),f.swap(),p.supportLinearFiltering||t.uniform2f(D.uniforms.dyeTexelSize,R.texelSizeX,R.texelSizeY),t.uniform1i(D.uniforms.uVelocity,f.read.attach(0)),t.uniform1i(D.uniforms.uSource,R.read.attach(1)),t.uniform1f(D.uniforms.dissipation,s.densityDissipation),E(R.write),R.swap()}function ve(e){t.blendFunc(t.ONE,t.ONE_MINUS_SRC_ALPHA),t.enable(t.BLEND),Je(e)}function Je(e){let r=e==null?t.drawingBufferWidth:e.width,n=e==null?t.drawingBufferHeight:e.height;k.bind(),s.shading&&t.uniform2f(k.uniforms.texelSize,1/r,1/n),t.uniform1i(k.uniforms.uTexture,R.read.attach(0)),E(e)}function Ze(e){let r=e.deltaX*s.splatForce,n=e.deltaY*s.splatForce,o=nt(e.color);oe(e.texcoordX,e.texcoordY,r,n,o)}function pe(e){let r=Y();r.r*=10,r.g*=10,r.b*=10;let n=10*(Math.random()-.5),o=30*(Math.random()-.5);oe(e.texcoordX,e.texcoordY,n,o,r)}function oe(e,r,n,o,i){_.bind(),t.uniform1i(_.uniforms.uTarget,f.read.attach(0)),t.uniform1f(_.uniforms.aspectRatio,a.width/a.height),t.uniform2f(_.uniforms.point,e,r),t.uniform3f(_.uniforms.color,n,o,0),t.uniform1f(_.uniforms.radius,Qe(s.splatRadius/100)),E(f.write),f.swap(),t.uniform1i(_.uniforms.uTarget,R.read.attach(0)),t.uniform3f(_.uniforms.color,i.r,i.g,i.b),E(R.write),R.swap()}function Qe(e){let r=a.width/a.height;return r>1&&(e*=r),e}let he=e=>{let r=g[0],n=a.getBoundingClientRect(),o=T(e.clientX-n.left),i=T(e.clientY-n.top);ye(r,-1,o,i),pe(r)},xe=e=>{let r=g[0],n=a.getBoundingClientRect(),o=T(e.clientX-n.left),i=T(e.clientY-n.top),l=r.color;Ee(r,o,i,l)},be=e=>{let r=e.targetTouches,n=a.getBoundingClientRect(),o=g[0];for(let i=0;i<r.length;i++){let l=T(r[i].clientX-n.left),u=T(r[i].clientY-n.top);ye(o,r[i].identifier,l,u),pe(o)}},ge=e=>{e.preventDefault();let r=e.targetTouches,n=a.getBoundingClientRect(),o=g[0];for(let i=0;i<r.length;i++){let l=T(r[i].clientX-n.left),u=T(r[i].clientY-n.top);Ee(o,l,u,o.color)}},Re=e=>{let r=e.changedTouches,n=g[0];for(let o=0;o<r.length;o++)et(n)};window.addEventListener("mousedown",he),window.addEventListener("mousemove",xe),window.addEventListener("touchstart",be),window.addEventListener("touchmove",ge,{passive:!1}),window.addEventListener("touchend",Re);function ye(e,r,n,o){e.id=r,e.down=!0,e.moved=!1,e.texcoordX=n/a.width,e.texcoordY=1-o/a.height,e.prevTexcoordX=e.texcoordX,e.prevTexcoordY=e.texcoordY,e.deltaX=0,e.deltaY=0,e.color=Te(Y())}function Ee(e,r,n,o){e.prevTexcoordX=e.texcoordX,e.prevTexcoordY=e.texcoordY,e.texcoordX=r/a.width,e.texcoordY=1-n/a.height,e.deltaX=tt(e.texcoordX-e.prevTexcoordX),e.deltaY=rt(e.texcoordY-e.prevTexcoordY),e.moved=Math.abs(e.deltaX)>0||Math.abs(e.deltaY)>0,e.color=o}function et(e){e.down=!1}function tt(e){let r=a.width/a.height;return r<1&&(e*=r),e}function rt(e){let r=a.width/a.height;return r>1&&(e/=r),e}function Y(){let e=s.colorIntensity,r=s.palette;if(r&&r.length>0){let o=r[Math.floor(Math.random()*r.length)],i=ct(o);if(i)return{r:i.r*e,g:i.g*e,b:i.b*e}}let n=ot(Math.random(),1,1);return n.r*=e,n.g*=e,n.b*=e,n}function Te(e){return[e.r,e.g,e.b]}function nt(e){return{r:e[0],g:e[1],b:e[2]}}function ot(e,r,n){let o=0,i=0,l=0,u=Math.floor(e*6),v=e*6-u,x=n*(1-r),P=n*(1-v*r),d=n*(1-(1-v)*r);switch(u%6){case 0:o=n,i=d,l=x;break;case 1:o=P,i=n,l=x;break;case 2:o=x,i=n,l=d;break;case 3:o=x,i=P,l=n;break;case 4:o=d,i=x,l=n;break;case 5:o=n,i=x,l=P;break}return{r:o,g:i,b:l}}function it(e,r,n){let o=n-r;return o===0?r:(e-r)%o+r}function Fe(e){let r=t.drawingBufferWidth/t.drawingBufferHeight;r<1&&(r=1/r);let n=Math.round(e),o=Math.round(e*r);return t.drawingBufferWidth>t.drawingBufferHeight?{width:o,height:n}:{width:n,height:o}}function T(e){let r=Math.min(window.devicePixelRatio||1,Math.max(1,s.maxDpr));return Math.floor(e*r)}function st(e){if(e.length===0)return 0;let r=0;for(let n=0;n<e.length;n++)r=(r<<5)-r+e.charCodeAt(n),r|=0;return r}function at(){var e,r;ie||(ie=!0,j(),window.removeEventListener("mousedown",he),window.removeEventListener("mousemove",xe),window.removeEventListener("touchstart",be),window.removeEventListener("touchmove",ge),window.removeEventListener("touchend",Re),window.removeEventListener("resize",De),document.removeEventListener("visibilitychange",Se),(e=y==null?void 0:y.removeEventListener)==null||e.call(y,"change",Le),M==null||M.disconnect(),b&&(a==null||a.remove()),(r=t.getExtension("WEBGL_lose_context"))==null||r.loseContext())}let ie=!1,W=!1;function V(){W||ie||(W=!0,re=Date.now(),ne=requestAnimationFrame(me))}function j(){W=!1,cancelAnimationFrame(ne)}let Se=()=>{s.pauseOnHidden&&(document.hidden?j():I||V())},De=()=>N(),M=typeof ResizeObserver!="undefined"?new ResizeObserver(()=>N()):null;M==null||M.observe(a);let y=typeof window.matchMedia=="function"?window.matchMedia("(prefers-reduced-motion: reduce)"):null,Le=()=>{s.respectReducedMotion&&(y!=null&&y.matches?j():I||V())},I=!1;return window.addEventListener("resize",De),document.addEventListener("visibilitychange",Se),(Ce=y==null?void 0:y.addEventListener)==null||Ce.call(y,"change",Le),s.respectReducedMotion&&ft()?(I=!0,ve(null)):V(),{dispose:at,pause(){I=!0,j()},resume(){I=!1,V()},isPaused:()=>I||!W,setConfig(e){let r=e.simResolution!==void 0&&e.simResolution!==s.simResolution||e.dyeResolution!==void 0&&e.dyeResolution!==s.dyeResolution;Object.assign(s,e),e.maxDpr!==void 0&&N(),r&&ee(),e.zIndex!==void 0&&(a.style.zIndex=String(e.zIndex)),e.pointerEvents!==void 0&&(a.style.pointerEvents=e.pointerEvents?"auto":"none")},splat(e,r,n){let o=a.getBoundingClientRect(),i=T(e),l=T(r),u=n!=null?n:Y();oe(i,a.height-l,0,0,u)},get canvas(){return a}}};var Ae={Spectrum:null,Sunset:["#ff4ecd","#ff8a4e","#ffd24e"],Ocean:["#4ea8ff","#4effd2","#7c4dff"],Mono:["#ffffff"],Aurora:["#3affa3","#38d9ff","#8f7bff"],Ember:["#ff5722","#ff9100","#ffc400"],Lagoon:["#00c2a8","#00a3ff","#0057d9"],Candy:["#ff8fd0","#ffa9f0","#c79bff"],Toxic:["#b6ff00","#4dff88","#00ffc8"],Royal:["#5b2bff","#8f4dff","#c44dff"],Sakura:["#ffc2dd","#ff8fb1","#ff6f91"],Mint:["#9cffd6","#5ef2c0","#2fd6a5"],Copper:["#ff9a5a","#e2703a","#b34700"],Ultraviolet:["#7b2cff","#b429ff","#ff29f0"],Ice:["#c9f0ff","#8ad4ff","#4fb3ff"],Magma:["#ff2d2d","#ff6a00","#ffb300"],Forest:["#2f9e44","#69db7c","#a9e34b"],Dusk:["#3b3b98","#7158e2","#cd84f1"],Cyber:["#00fff0","#ff00e0","#fffb00"],Pastel:["#ffd6e0","#c7ceea","#b5ead7"]},Ue={Calm:{curl:3,splatForce:4200,splatRadius:.45,densityDissipation:4.6,velocityDissipation:2.6,pressureIteration:16,colorUpdateSpeed:6},Flow:{curl:10,splatForce:6e3,splatRadius:.5,densityDissipation:3.5,velocityDissipation:2,pressureIteration:20,colorUpdateSpeed:10},Swirl:{curl:24,splatForce:7200,splatRadius:.55,densityDissipation:3,velocityDissipation:1.6,pressureIteration:24,colorUpdateSpeed:12},Storm:{curl:40,splatForce:9500,splatRadius:.65,densityDissipation:2.2,velocityDissipation:1.2,pressureIteration:28,colorUpdateSpeed:16},Wisp:{curl:6,splatForce:3200,splatRadius:.32,densityDissipation:6.5,velocityDissipation:3.4,pressureIteration:12,colorUpdateSpeed:8}},dt=()=>{let c={};for(let[s,b]of Object.entries(Ae))for(let[a,B]of Object.entries(Ue)){let F=`${s} ${a}`;c[F]={...B,palette:b?[...b]:null,colorIntensity:b===null?.15:.18}}return c},ae=dt(),mt=Object.keys(ae),vt=Object.keys(Ae),pt=Object.keys(Ue),ht=c=>ae[c];import{jsx as Rt}from"react/jsx-runtime";var xt=["densityDissipation","velocityDissipation","pressure","pressureIteration","curl","splatRadius","splatForce","shading","colorUpdateSpeed","paused","transparent","backColor","palette","colorIntensity","zIndex","pointerEvents","maxDpr","pauseOnHidden","respectReducedMotion"],bt=c=>JSON.stringify([c==null?void 0:c.id,c==null?void 0:c.position,c==null?void 0:c.className,c==null?void 0:c.simResolution,c==null?void 0:c.dyeResolution,c==null?void 0:c.captureResolution]);function gt(c,s){let b=A.useRef(null),a=A.useRef(c);a.current=c;let B=bt(c);return A.useEffect(()=>{let F=Be({...a.current,...s!=null&&s.current?{container:s.current}:{}});return b.current=F,()=>{F.dispose(),b.current=null}},[B,s]),A.useEffect(()=>{let F=b.current;if(!F||!c)return;let g={};for(let t of xt)c[t]!==void 0&&(g[t]=c[t]);F.setConfig(g)}),b}var Dt=A.forwardRef(function({config:s,scoped:b=!1,className:a,style:B,children:F},g){let t=A.useRef(null),p=gt(s,b?t:void 0);return A.useImperativeHandle(g,()=>({dispose:()=>{var m;return(m=p.current)==null?void 0:m.dispose()},pause:()=>{var m;return(m=p.current)==null?void 0:m.pause()},resume:()=>{var m;return(m=p.current)==null?void 0:m.resume()},isPaused:()=>{var m,h;return(h=(m=p.current)==null?void 0:m.isPaused())!=null?h:!0},setConfig:m=>{var h;return(h=p.current)==null?void 0:h.setConfig(m)},splat:(m,h,q)=>{var z;return(z=p.current)==null?void 0:z.splat(m,h,q)},get canvas(){var m,h;return(h=(m=p.current)==null?void 0:m.canvas)!=null?h:null}}),[p]),b?Rt("div",{ref:t,className:a,style:{position:"relative",overflow:"hidden",...B},children:F}):null});export{Dt as SmokeyFluidCursor,pt as characterNames,ht as getPreset,Be as initFluid,vt as paletteNames,mt as presetNames,ae as presets,gt as useSmokeyFluidCursor};
