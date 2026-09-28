"use client";
import A from"react";var it={simResolution:128,dyeResolution:1440,captureResolution:512,densityDissipation:3.5,velocityDissipation:2,pressure:.1,pressureIteration:20,curl:10,splatRadius:.5,splatForce:6e3,shading:!0,colorUpdateSpeed:10,paused:!1,backColor:{r:0,g:0,b:0},transparent:!0,id:"smokey-fluid-canvas",position:"fixed",zIndex:-9999,pointerEvents:!1,maxDpr:2,pauseOnHidden:!0,respectReducedMotion:!0,palette:null,colorIntensity:.15},Be=l=>{var u;return l?typeof l!="string"?l:(u=document.querySelector(l))!=null?u:document.getElementById(l):null},ut=l=>{let u=l.trim().replace(/^#/,"");return u.length===3&&(u=u[0]+u[0]+u[1]+u[1]+u[2]+u[2]),/^[0-9a-f]{6}$/i.test(u)?{r:parseInt(u.slice(0,2),16)/255,g:parseInt(u.slice(2,4),16)/255,b:parseInt(u.slice(4,6),16)/255}:null},st=l=>{var s;if(l>=0||typeof document=="undefined"||typeof process!="undefined"&&((s=process.env)==null?void 0:s.NODE_ENV)==="production")return;let u=window.getComputedStyle(document.body).backgroundColor;u&&u!=="transparent"&&!/rgba\(\s*0\s*,\s*0\s*,\s*0\s*,\s*0\s*\)/.test(u)&&console.warn("[smokey-fluid-cursor] <body> has an opaque background ("+u+") and the canvas sits at z-index "+l+`, so the effect will be painted over and stay invisible.
Move the background to <html>, or give the canvas a zIndex above your background.`)},at=()=>typeof window!="undefined"&&typeof window.matchMedia=="function"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches,ue={dispose:()=>{},pause:()=>{},resume:()=>{},isPaused:()=>!0,setConfig:()=>{},splat:()=>{},canvas:null},Ce=(l={})=>{var Le,we,_e;let u={...it,...l};if(typeof document=="undefined")return ue;let E=!1,s=(Le=Be(u.canvas))!=null?Le:document.getElementById(u.id);if(!s){let e=(we=Be(u.container))!=null?we:document.body;if(!e)return ue;s=document.createElement("canvas"),s.id=u.id,e.appendChild(s),E=!0}u.className&&s.classList.add(...u.className.split(/\s+/));let z=u.position==="fixed"||u.position==="absolute";Object.assign(s.style,{position:u.position,...z?{top:"0",left:"0",width:"100%",height:"100%"}:{},display:"block",pointerEvents:u.pointerEvents?"auto":"none",zIndex:String(u.zIndex)}),st(u.zIndex),I();class L{constructor(){this.id=-1;this.texcoordX=0;this.texcoordY=0;this.prevTexcoordX=0;this.prevTexcoordY=0;this.deltaX=0;this.deltaY=0;this.down=!1;this.moved=!1;this.color=[30,0,300]}}let g=[];g.push(new L);let t,h;try{({gl:t,ext:h}=m(s))}catch(e){typeof console!="undefined"&&console.warn("[smokey-fluid-cursor] WebGL is unavailable; the cursor effect is disabled.",e);let r=s,n=E;return{...ue,dispose:()=>{n&&r.remove()},setConfig:o=>{o.zIndex!==void 0&&(r.style.zIndex=String(o.zIndex)),o.pointerEvents!==void 0&&(r.style.pointerEvents=o.pointerEvents?"auto":"none")},get canvas(){return r}}}h.supportLinearFiltering||(u.dyeResolution=512,u.shading=!1);function m(e){let r={alpha:!0,depth:!1,stencil:!1,antialias:!1,preserveDrawingBuffer:!1},n=e.getContext("webgl2",r),o=!!n;if(o||(n=e.getContext("webgl",r)||e.getContext("experimental-webgl",r)),!n)throw new Error("WebGL not supported");let i=null,c,a;if(o){let f=n;f.getExtension("EXT_color_buffer_float"),c=!!f.getExtension("OES_texture_float_linear"),a=f.HALF_FLOAT}else{let f=n;if(i=f.getExtension("OES_texture_half_float"),c=!!f.getExtension("OES_texture_half_float_linear"),!i)throw new Error("OES_texture_half_float not supported on WebGL1");a=i.HALF_FLOAT_OES}n.clearColor(0,0,0,1);let v=null,x=null,_=null;if(o){let f=n;v=p(f,f.RGBA16F,f.RGBA,a),x=p(f,f.RG16F,f.RG,a),_=p(f,f.R16F,f.RED,a)}else{let f=n;v=p(f,f.RGBA,f.RGBA,a),x=p(f,f.RGBA,f.RGBA,a),_=p(f,f.RGBA,f.RGBA,a)}return{gl:n,ext:{formatRGBA:v,formatRG:x,formatR:_,halfFloatTexType:a,supportLinearFiltering:c,isWebGL2:o}}}function p(e,r,n,o){if(!K(e,r,n,o)){if(e.RGBA16F!==void 0){let i=e;switch(r){case i.R16F:return p(i,i.RG16F,i.RG,o);case i.RG16F:return p(i,i.RGBA16F,i.RGBA,o);default:return null}}return null}return{internalFormat:r,format:n}}function K(e,r,n,o){let i=e.createTexture();if(!i)return!1;e.bindTexture(e.TEXTURE_2D,i),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texImage2D(e.TEXTURE_2D,0,r,4,4,0,n,o,null);let c=e.createFramebuffer();if(!c)return!1;e.bindFramebuffer(e.FRAMEBUFFER,c),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,i,0);let a=e.checkFramebufferStatus(e.FRAMEBUFFER);return e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(c),e.deleteTexture(i),a===e.FRAMEBUFFER_COMPLETE}class X{constructor(r,n){this.vertexShader=r,this.fragmentShaderSource=n,this.programs={},this.activeProgram=null,this.uniforms={}}setKeywords(r){let n=0;for(let i=0;i<r.length;i++)n+=nt(r[i]);let o=this.programs[n];if(!o){let i=F(t,t.FRAGMENT_SHADER,ce(this.fragmentShaderSource,r));o=se(t,this.vertexShader,i),this.programs[n]=o}o!==this.activeProgram&&(this.uniforms=ae(t,o),this.activeProgram=o)}bind(){this.activeProgram&&t.useProgram(this.activeProgram)}}class w{constructor(r,n){this.program=se(t,r,n),this.uniforms=ae(t,this.program)}bind(){this.program&&t.useProgram(this.program)}}function se(e,r,n){let o=e.createProgram();return e.attachShader(o,r),e.attachShader(o,n),e.bindAttribLocation(o,0,"aPosition"),e.linkProgram(o),e.getProgramParameter(o,e.LINK_STATUS)||console.trace(e.getProgramInfoLog(o)),o}function ae(e,r){let n={},o=e.getProgramParameter(r,e.ACTIVE_UNIFORMS);for(let i=0;i<o;i++){let c=e.getActiveUniform(r,i);if(!c)continue;let a=c.name,v=e.getUniformLocation(r,a);v&&(n[a]=v)}return n}function F(e,r,n){let o=e.createShader(r);return e.shaderSource(o,n),e.compileShader(o),e.getShaderParameter(o,e.COMPILE_STATUS)||console.trace(e.getShaderInfoLog(o)),o}function ce(e,r){if(!r||r.length===0)return e;let n="";return r.forEach(o=>{n+="#define "+o+`
`}),n+e}let D=F(t,t.VERTEX_SHADER,`precision highp float;
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
}`),Ae=F(t,t.FRAGMENT_SHADER,`precision mediump float;
precision mediump sampler2D;
varying highp vec2 vUv;
uniform sampler2D uTexture;
void main () {
gl_FragColor = texture2D(uTexture, vUv);
}`),Pe=F(t,t.FRAGMENT_SHADER,`precision mediump float;
precision mediump sampler2D;
varying highp vec2 vUv;
uniform sampler2D uTexture;
uniform float value;
void main () {
gl_FragColor = value * texture2D(uTexture, vUv);
}`),Ue=`precision highp float;
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
}`,Ge=F(t,t.FRAGMENT_SHADER,`precision highp float;
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
}`),Me=F(t,t.FRAGMENT_SHADER,ce(`precision highp float;
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
}`,h.supportLinearFiltering?null:["MANUAL_FILTERING"])),ze=F(t,t.FRAGMENT_SHADER,`precision mediump float;
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
}`),Ie=F(t,t.FRAGMENT_SHADER,`precision mediump float;
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
}`),Xe=F(t,t.FRAGMENT_SHADER,`precision highp float;
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
}`),Oe=F(t,t.FRAGMENT_SHADER,`precision mediump float;
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
}`),Ne=F(t,t.FRAGMENT_SHADER,`precision mediump float;
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
}`),T=(()=>{let e=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,e),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,1,1,-1]),t.STATIC_DRAW);let r=t.createBuffer();return t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,r),t.bufferData(t.ELEMENT_ARRAY_BUFFER,new Uint16Array([0,1,2,0,2,3]),t.STATIC_DRAW),t.vertexAttribPointer(0,2,t.FLOAT,!1,0,0),t.enableVertexAttribArray(0),(n,o=!1)=>{n==null?(t.viewport(0,0,t.drawingBufferWidth,t.drawingBufferHeight),t.bindFramebuffer(t.FRAMEBUFFER,null)):(t.viewport(0,0,n.width,n.height),t.bindFramebuffer(t.FRAMEBUFFER,n.fbo)),o&&(t.clearColor(0,0,0,1),t.clear(t.COLOR_BUFFER_BIT)),t.drawElements(t.TRIANGLES,6,t.UNSIGNED_SHORT,0)}})(),b,d,j,J,B,le=new w(D,Ae),$=new w(D,Pe),C=new w(D,Ge),S=new w(D,Me),Z=new w(D,ze),Q=new w(D,Ie),P=new w(D,Xe),O=new w(D,Oe),N=new w(D,Ne),H=new X(D,Ue);function ee(){let e=ye(u.simResolution),r=ye(u.dyeResolution),n=h.halfFloatTexType,o=h.formatRGBA,i=h.formatRG,c=h.formatR,a=h.supportLinearFiltering?t.LINEAR:t.NEAREST;t.disable(t.BLEND),b==null?b=te(r.width,r.height,o.internalFormat,o.format,n,a):b=de(b,r.width,r.height,o.internalFormat,o.format,n,a),d==null?d=te(e.width,e.height,i.internalFormat,i.format,n,a):d=de(d,e.width,e.height,i.internalFormat,i.format,n,a),j=U(e.width,e.height,c.internalFormat,c.format,n,t.NEAREST),J=U(e.width,e.height,c.internalFormat,c.format,n,t.NEAREST),B=te(e.width,e.height,c.internalFormat,c.format,n,t.NEAREST)}function U(e,r,n,o,i,c){t.activeTexture(t.TEXTURE0);let a=t.createTexture();t.bindTexture(t.TEXTURE_2D,a),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,c),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,c),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texImage2D(t.TEXTURE_2D,0,n,e,r,0,o,i,null);let v=t.createFramebuffer();t.bindFramebuffer(t.FRAMEBUFFER,v),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,a,0),t.viewport(0,0,e,r),t.clear(t.COLOR_BUFFER_BIT);let x=1/e,_=1/r;return{texture:a,fbo:v,width:e,height:r,texelSizeX:x,texelSizeY:_,attach(f){return t.activeTexture(t.TEXTURE0+f),t.bindTexture(t.TEXTURE_2D,a),f}}}function te(e,r,n,o,i,c){let a=U(e,r,n,o,i,c),v=U(e,r,n,o,i,c);return{width:e,height:r,texelSizeX:a.texelSizeX,texelSizeY:a.texelSizeY,get read(){return a},set read(x){a=x},get write(){return v},set write(x){v=x},swap(){let x=a;a=v,v=x}}}function He(e,r,n,o,i,c,a){let v=U(r,n,o,i,c,a);return le.bind(),t.uniform1i(le.uniforms.uTexture,e.attach(0)),T(v),v}function de(e,r,n,o,i,c,a){return e.width===r&&e.height===n||(e.read=He(e.read,r,n,o,i,c,a),e.write=U(r,n,o,i,c,a),e.width=r,e.height=n,e.texelSizeX=1/r,e.texelSizeY=1/n),e}function Ye(){let e=[];u.shading&&e.push("shading"),H.setKeywords(e)}Ye(),ee();let re=Date.now(),Y=0,ne=0;function fe(){let e=We();I()&&ee(),ke(e),Ve(),u.paused||qe(e),me(null),ne=requestAnimationFrame(fe)}function We(){let e=Date.now(),r=(e-re)/1e3;return r=Math.min(r,.016666),re=e,r}function I(){let e=y(s.clientWidth),r=y(s.clientHeight);return s.width!==e||s.height!==r?(s.width=e,s.height=r,!0):!1}function ke(e){Y+=e*u.colorUpdateSpeed,Y>=1&&(Y=rt(Y,0,1),g.forEach(r=>{r.color=Te(W())}))}function Ve(){g.forEach(e=>{e.moved&&(e.moved=!1,je(e))})}function qe(e){t.disable(t.BLEND),Q.bind(),t.uniform2f(Q.uniforms.texelSize,d.texelSizeX,d.texelSizeY),t.uniform1i(Q.uniforms.uVelocity,d.read.attach(0)),T(J),P.bind(),t.uniform2f(P.uniforms.texelSize,d.texelSizeX,d.texelSizeY),t.uniform1i(P.uniforms.uVelocity,d.read.attach(0)),t.uniform1i(P.uniforms.uCurl,J.attach(1)),t.uniform1f(P.uniforms.curl,u.curl),t.uniform1f(P.uniforms.dt,e),T(d.write),d.swap(),Z.bind(),t.uniform2f(Z.uniforms.texelSize,d.texelSizeX,d.texelSizeY),t.uniform1i(Z.uniforms.uVelocity,d.read.attach(0)),T(j),$.bind(),t.uniform1i($.uniforms.uTexture,B.read.attach(0)),t.uniform1f($.uniforms.value,u.pressure),T(B.write),B.swap(),O.bind(),t.uniform2f(O.uniforms.texelSize,d.texelSizeX,d.texelSizeY),t.uniform1i(O.uniforms.uDivergence,j.attach(0));for(let n=0;n<u.pressureIteration;n++)t.uniform1i(O.uniforms.uPressure,B.read.attach(1)),T(B.write),B.swap();N.bind(),t.uniform2f(N.uniforms.texelSize,d.texelSizeX,d.texelSizeY),t.uniform1i(N.uniforms.uPressure,B.read.attach(0)),t.uniform1i(N.uniforms.uVelocity,d.read.attach(1)),T(d.write),d.swap(),S.bind(),t.uniform2f(S.uniforms.texelSize,d.texelSizeX,d.texelSizeY),h.supportLinearFiltering||t.uniform2f(S.uniforms.dyeTexelSize,d.texelSizeX,d.texelSizeY);let r=d.read.attach(0);t.uniform1i(S.uniforms.uVelocity,r),t.uniform1i(S.uniforms.uSource,r),t.uniform1f(S.uniforms.dt,e),t.uniform1f(S.uniforms.dissipation,u.velocityDissipation),T(d.write),d.swap(),h.supportLinearFiltering||t.uniform2f(S.uniforms.dyeTexelSize,b.texelSizeX,b.texelSizeY),t.uniform1i(S.uniforms.uVelocity,d.read.attach(0)),t.uniform1i(S.uniforms.uSource,b.read.attach(1)),t.uniform1f(S.uniforms.dissipation,u.densityDissipation),T(b.write),b.swap()}function me(e){t.blendFunc(t.ONE,t.ONE_MINUS_SRC_ALPHA),t.enable(t.BLEND),Ke(e)}function Ke(e){let r=e==null?t.drawingBufferWidth:e.width,n=e==null?t.drawingBufferHeight:e.height;H.bind(),u.shading&&t.uniform2f(H.uniforms.texelSize,1/r,1/n),t.uniform1i(H.uniforms.uTexture,b.read.attach(0)),T(e)}function je(e){let r=e.deltaX*u.splatForce,n=e.deltaY*u.splatForce,o=et(e.color);oe(e.texcoordX,e.texcoordY,r,n,o)}function ve(e){let r=W();r.r*=10,r.g*=10,r.b*=10;let n=10*(Math.random()-.5),o=30*(Math.random()-.5);oe(e.texcoordX,e.texcoordY,n,o,r)}function oe(e,r,n,o,i){C.bind(),t.uniform1i(C.uniforms.uTarget,d.read.attach(0)),t.uniform1f(C.uniforms.aspectRatio,s.width/s.height),t.uniform2f(C.uniforms.point,e,r),t.uniform3f(C.uniforms.color,n,o,0),t.uniform1f(C.uniforms.radius,Je(u.splatRadius/100)),T(d.write),d.swap(),t.uniform1i(C.uniforms.uTarget,b.read.attach(0)),t.uniform3f(C.uniforms.color,i.r,i.g,i.b),T(b.write),b.swap()}function Je(e){let r=s.width/s.height;return r>1&&(e*=r),e}let he=e=>{let r=g[0],n=s.getBoundingClientRect(),o=y(e.clientX-n.left),i=y(e.clientY-n.top);Re(r,-1,o,i),ve(r)},pe=e=>{let r=g[0],n=s.getBoundingClientRect(),o=y(e.clientX-n.left),i=y(e.clientY-n.top),c=r.color;Ee(r,o,i,c)},xe=e=>{let r=e.targetTouches,n=s.getBoundingClientRect(),o=g[0];for(let i=0;i<r.length;i++){let c=y(r[i].clientX-n.left),a=y(r[i].clientY-n.top);Re(o,r[i].identifier,c,a),ve(o)}},ge=e=>{e.preventDefault();let r=e.targetTouches,n=s.getBoundingClientRect(),o=g[0];for(let i=0;i<r.length;i++){let c=y(r[i].clientX-n.left),a=y(r[i].clientY-n.top);Ee(o,c,a,o.color)}},be=e=>{let r=e.changedTouches,n=g[0];for(let o=0;o<r.length;o++)$e(n)};window.addEventListener("mousedown",he),window.addEventListener("mousemove",pe),window.addEventListener("touchstart",xe),window.addEventListener("touchmove",ge,{passive:!1}),window.addEventListener("touchend",be);function Re(e,r,n,o){e.id=r,e.down=!0,e.moved=!1,e.texcoordX=n/s.width,e.texcoordY=1-o/s.height,e.prevTexcoordX=e.texcoordX,e.prevTexcoordY=e.texcoordY,e.deltaX=0,e.deltaY=0,e.color=Te(W())}function Ee(e,r,n,o){e.prevTexcoordX=e.texcoordX,e.prevTexcoordY=e.texcoordY,e.texcoordX=r/s.width,e.texcoordY=1-n/s.height,e.deltaX=Ze(e.texcoordX-e.prevTexcoordX),e.deltaY=Qe(e.texcoordY-e.prevTexcoordY),e.moved=Math.abs(e.deltaX)>0||Math.abs(e.deltaY)>0,e.color=o}function $e(e){e.down=!1}function Ze(e){let r=s.width/s.height;return r<1&&(e*=r),e}function Qe(e){let r=s.width/s.height;return r>1&&(e/=r),e}function W(){let e=u.colorIntensity,r=u.palette;if(r&&r.length>0){let o=r[Math.floor(Math.random()*r.length)],i=ut(o);if(i)return{r:i.r*e,g:i.g*e,b:i.b*e}}let n=tt(Math.random(),1,1);return n.r*=e,n.g*=e,n.b*=e,n}function Te(e){return[e.r,e.g,e.b]}function et(e){return{r:e[0],g:e[1],b:e[2]}}function tt(e,r,n){let o=0,i=0,c=0,a=Math.floor(e*6),v=e*6-a,x=n*(1-r),_=n*(1-v*r),f=n*(1-(1-v)*r);switch(a%6){case 0:o=n,i=f,c=x;break;case 1:o=_,i=n,c=x;break;case 2:o=x,i=n,c=f;break;case 3:o=x,i=_,c=n;break;case 4:o=f,i=x,c=n;break;case 5:o=n,i=x,c=_;break}return{r:o,g:i,b:c}}function rt(e,r,n){let o=n-r;return o===0?r:(e-r)%o+r}function ye(e){let r=t.drawingBufferWidth/t.drawingBufferHeight;r<1&&(r=1/r);let n=Math.round(e),o=Math.round(e*r);return t.drawingBufferWidth>t.drawingBufferHeight?{width:o,height:n}:{width:n,height:o}}function y(e){let r=Math.min(window.devicePixelRatio||1,Math.max(1,u.maxDpr));return Math.floor(e*r)}function nt(e){if(e.length===0)return 0;let r=0;for(let n=0;n<e.length;n++)r=(r<<5)-r+e.charCodeAt(n),r|=0;return r}function ot(){var e,r;ie||(ie=!0,q(),window.removeEventListener("mousedown",he),window.removeEventListener("mousemove",pe),window.removeEventListener("touchstart",xe),window.removeEventListener("touchmove",ge),window.removeEventListener("touchend",be),window.removeEventListener("resize",Se),document.removeEventListener("visibilitychange",Fe),(e=R==null?void 0:R.removeEventListener)==null||e.call(R,"change",De),G==null||G.disconnect(),E&&(s==null||s.remove()),(r=t.getExtension("WEBGL_lose_context"))==null||r.loseContext())}let ie=!1,k=!1;function V(){k||ie||(k=!0,re=Date.now(),ne=requestAnimationFrame(fe))}function q(){k=!1,cancelAnimationFrame(ne)}let Fe=()=>{u.pauseOnHidden&&(document.hidden?q():M||V())},Se=()=>I(),G=typeof ResizeObserver!="undefined"?new ResizeObserver(()=>I()):null;G==null||G.observe(s);let R=typeof window.matchMedia=="function"?window.matchMedia("(prefers-reduced-motion: reduce)"):null,De=()=>{u.respectReducedMotion&&(R!=null&&R.matches?q():M||V())},M=!1;return window.addEventListener("resize",Se),document.addEventListener("visibilitychange",Fe),(_e=R==null?void 0:R.addEventListener)==null||_e.call(R,"change",De),u.respectReducedMotion&&at()?(M=!0,me(null)):V(),{dispose:ot,pause(){M=!0,q()},resume(){M=!1,V()},isPaused:()=>M||!k,setConfig(e){let r=e.simResolution!==void 0&&e.simResolution!==u.simResolution||e.dyeResolution!==void 0&&e.dyeResolution!==u.dyeResolution;Object.assign(u,e),e.maxDpr!==void 0&&I(),r&&ee(),e.zIndex!==void 0&&(s.style.zIndex=String(e.zIndex)),e.pointerEvents!==void 0&&(s.style.pointerEvents=e.pointerEvents?"auto":"none")},splat(e,r,n){let o=s.getBoundingClientRect(),i=y(e),c=y(r),a=n!=null?n:W();oe(i,s.height-c,0,0,a)},get canvas(){return s}}};import{jsx as ft}from"react/jsx-runtime";var ct=["densityDissipation","velocityDissipation","pressure","pressureIteration","curl","splatRadius","splatForce","shading","colorUpdateSpeed","paused","transparent","backColor","palette","colorIntensity","zIndex","pointerEvents","maxDpr","pauseOnHidden","respectReducedMotion"],lt=l=>JSON.stringify([l==null?void 0:l.id,l==null?void 0:l.position,l==null?void 0:l.className,l==null?void 0:l.simResolution,l==null?void 0:l.dyeResolution,l==null?void 0:l.captureResolution]);function dt(l,u){let E=A.useRef(null),s=A.useRef(l);s.current=l;let z=lt(l);return A.useEffect(()=>{let L=Ce({...s.current,...u!=null&&u.current?{container:u.current}:{}});return E.current=L,()=>{L.dispose(),E.current=null}},[z,u]),A.useEffect(()=>{let L=E.current;if(!L||!l)return;let g={};for(let t of ct)l[t]!==void 0&&(g[t]=l[t]);L.setConfig(g)}),E}var xt=A.forwardRef(function({config:u,scoped:E=!1,className:s,style:z,children:L},g){let t=A.useRef(null),h=dt(u,E?t:void 0);return A.useImperativeHandle(g,()=>({dispose:()=>{var m;return(m=h.current)==null?void 0:m.dispose()},pause:()=>{var m;return(m=h.current)==null?void 0:m.pause()},resume:()=>{var m;return(m=h.current)==null?void 0:m.resume()},isPaused:()=>{var m,p;return(p=(m=h.current)==null?void 0:m.isPaused())!=null?p:!0},setConfig:m=>{var p;return(p=h.current)==null?void 0:p.setConfig(m)},splat:(m,p,K)=>{var X;return(X=h.current)==null?void 0:X.splat(m,p,K)},get canvas(){var m,p;return(p=(m=h.current)==null?void 0:m.canvas)!=null?p:null}}),[h]),E?ft("div",{ref:t,className:s,style:{position:"relative",overflow:"hidden",...z},children:L}):null});export{xt as SmokeyFluidCursor,Ce as initFluid,dt as useSmokeyFluidCursor};
