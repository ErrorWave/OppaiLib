(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function i(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(a){if(a.ep)return;a.ep=!0;const s=i(a);fetch(a.href,s)}})();function d(t,e,i,r){var a=arguments.length,s=a<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,i):r,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(t,e,i,r);else for(var p=t.length-1;p>=0;p--)(n=t[p])&&(s=(a<3?n(s):a>3?n(e,i,s):n(e,i))||s);return a>3&&s&&Object.defineProperty(e,i,s),s}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const C=t=>(e,i)=>{i!==void 0?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const nt=globalThis,pi=nt.ShadowRoot&&(nt.ShadyCSS===void 0||nt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,hi=Symbol(),zi=new WeakMap;let Zi=class{constructor(e,i,r){if(this._$cssResult$=!0,r!==hi)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=i}get styleSheet(){let e=this.o;const i=this.t;if(pi&&e===void 0){const r=i!==void 0&&i.length===1;r&&(e=zi.get(i)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),r&&zi.set(i,e))}return e}toString(){return this.cssText}};const Br=t=>new Zi(typeof t=="string"?t:t+"",void 0,hi),y=(t,...e)=>{const i=t.length===1?t[0]:e.reduce((r,a,s)=>r+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+t[s+1],t[0]);return new Zi(i,t,hi)},Ur=(t,e)=>{if(pi)t.adoptedStyleSheets=e.map(i=>i instanceof CSSStyleSheet?i:i.styleSheet);else for(const i of e){const r=document.createElement("style"),a=nt.litNonce;a!==void 0&&r.setAttribute("nonce",a),r.textContent=i.cssText,t.appendChild(r)}},Ti=pi?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let i="";for(const r of e.cssRules)i+=r.cssText;return Br(i)})(t):t;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:jr,defineProperty:Hr,getOwnPropertyDescriptor:qr,getOwnPropertyNames:Vr,getOwnPropertySymbols:Gr,getPrototypeOf:Kr}=Object,de=globalThis,Si=de.trustedTypes,Yr=Si?Si.emptyScript:"",gt=de.reactiveElementPolyfillSupport,Re=(t,e)=>t,pt={toAttribute(t,e){switch(e){case Boolean:t=t?Yr:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=t!==null;break;case Number:i=t===null?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch{i=null}}return i}},ui=(t,e)=>!jr(t,e),Ai={attribute:!0,type:String,converter:pt,reflect:!1,useDefault:!1,hasChanged:ui};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),de.litPropertyMetadata??(de.litPropertyMetadata=new WeakMap);let Te=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,i=Ai){if(i.state&&(i.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((i=Object.create(i)).wrapped=!0),this.elementProperties.set(e,i),!i.noAccessor){const r=Symbol(),a=this.getPropertyDescriptor(e,r,i);a!==void 0&&Hr(this.prototype,e,a)}}static getPropertyDescriptor(e,i,r){const{get:a,set:s}=qr(this.prototype,e)??{get(){return this[i]},set(n){this[i]=n}};return{get:a,set(n){const p=a==null?void 0:a.call(this);s==null||s.call(this,n),this.requestUpdate(e,p,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Ai}static _$Ei(){if(this.hasOwnProperty(Re("elementProperties")))return;const e=Kr(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Re("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Re("properties"))){const i=this.properties,r=[...Vr(i),...Gr(i)];for(const a of r)this.createProperty(a,i[a])}const e=this[Symbol.metadata];if(e!==null){const i=litPropertyMetadata.get(e);if(i!==void 0)for(const[r,a]of i)this.elementProperties.set(r,a)}this._$Eh=new Map;for(const[i,r]of this.elementProperties){const a=this._$Eu(i,r);a!==void 0&&this._$Eh.set(a,i)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const i=[];if(Array.isArray(e)){const r=new Set(e.flat(1/0).reverse());for(const a of r)i.unshift(Ti(a))}else e!==void 0&&i.push(Ti(e));return i}static _$Eu(e,i){const r=i.attribute;return r===!1?void 0:typeof r=="string"?r:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(i=>this.enableUpdating=i),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(i=>i(this))}addController(e){var i;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((i=e.hostConnected)==null||i.call(e))}removeController(e){var i;(i=this._$EO)==null||i.delete(e)}_$E_(){const e=new Map,i=this.constructor.elementProperties;for(const r of i.keys())this.hasOwnProperty(r)&&(e.set(r,this[r]),delete this[r]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ur(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(i=>{var r;return(r=i.hostConnected)==null?void 0:r.call(i)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(i=>{var r;return(r=i.hostDisconnected)==null?void 0:r.call(i)})}attributeChangedCallback(e,i,r){this._$AK(e,r)}_$ET(e,i){var s;const r=this.constructor.elementProperties.get(e),a=this.constructor._$Eu(e,r);if(a!==void 0&&r.reflect===!0){const n=(((s=r.converter)==null?void 0:s.toAttribute)!==void 0?r.converter:pt).toAttribute(i,r.type);this._$Em=e,n==null?this.removeAttribute(a):this.setAttribute(a,n),this._$Em=null}}_$AK(e,i){var s,n;const r=this.constructor,a=r._$Eh.get(e);if(a!==void 0&&this._$Em!==a){const p=r.getPropertyOptions(a),h=typeof p.converter=="function"?{fromAttribute:p.converter}:((s=p.converter)==null?void 0:s.fromAttribute)!==void 0?p.converter:pt;this._$Em=a;const f=h.fromAttribute(i,p.type);this[a]=f??((n=this._$Ej)==null?void 0:n.get(a))??f,this._$Em=null}}requestUpdate(e,i,r,a=!1,s){var n;if(e!==void 0){const p=this.constructor;if(a===!1&&(s=this[e]),r??(r=p.getPropertyOptions(e)),!((r.hasChanged??ui)(s,i)||r.useDefault&&r.reflect&&s===((n=this._$Ej)==null?void 0:n.get(e))&&!this.hasAttribute(p._$Eu(e,r))))return;this.C(e,i,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,i,{useDefault:r,reflect:a,wrapped:s},n){r&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,n??i??this[e]),s!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||r||(i=void 0),this._$AL.set(e,i)),a===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(i){Promise.reject(i)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var r;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[s,n]of this._$Ep)this[s]=n;this._$Ep=void 0}const a=this.constructor.elementProperties;if(a.size>0)for(const[s,n]of a){const{wrapped:p}=n,h=this[s];p!==!0||this._$AL.has(s)||h===void 0||this.C(s,void 0,n,h)}}let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),(r=this._$EO)==null||r.forEach(a=>{var s;return(s=a.hostUpdate)==null?void 0:s.call(a)}),this.update(i)):this._$EM()}catch(a){throw e=!1,this._$EM(),a}e&&this._$AE(i)}willUpdate(e){}_$AE(e){var i;(i=this._$EO)==null||i.forEach(r=>{var a;return(a=r.hostUpdated)==null?void 0:a.call(r)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(i=>this._$ET(i,this[i]))),this._$EM()}updated(e){}firstUpdated(e){}};Te.elementStyles=[],Te.shadowRootOptions={mode:"open"},Te[Re("elementProperties")]=new Map,Te[Re("finalized")]=new Map,gt==null||gt({ReactiveElement:Te}),(de.reactiveElementVersions??(de.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Wr={attribute:!0,type:String,converter:pt,reflect:!1,hasChanged:ui},Jr=(t=Wr,e,i)=>{const{kind:r,metadata:a}=i;let s=globalThis.litPropertyMetadata.get(a);if(s===void 0&&globalThis.litPropertyMetadata.set(a,s=new Map),r==="setter"&&((t=Object.create(t)).wrapped=!0),s.set(i.name,t),r==="accessor"){const{name:n}=i;return{set(p){const h=e.get.call(this);e.set.call(this,p),this.requestUpdate(n,h,t,!0,p)},init(p){return p!==void 0&&this.C(n,void 0,t,p),p}}}if(r==="setter"){const{name:n}=i;return function(p){const h=this[n];e.call(this,p),this.requestUpdate(n,h,t,!0,p)}}throw Error("Unsupported decorator location: "+r)};function m(t){return(e,i)=>typeof i=="object"?Jr(t,e,i):((r,a,s)=>{const n=a.hasOwnProperty(s);return a.constructor.createProperty(s,r),n?Object.getOwnPropertyDescriptor(a,s):void 0})(t,e,i)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function c(t){return m({...t,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const mt=(t,e,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(t,e,i),i);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function S(t,e){return(i,r,a)=>{const s=n=>{var p;return((p=n.renderRoot)==null?void 0:p.querySelector(t))??null};return mt(i,r,{get(){return s(this)}})}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let Xr;function Zr(t){return(e,i)=>mt(e,i,{get(){return(this.renderRoot??Xr??(Xr=document.createDocumentFragment())).querySelectorAll(t)}})}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function pe(t){return(e,i)=>{const{slot:r,selector:a}=t??{},s="slot"+(r?`[name=${r}]`:":not([name])");return mt(e,i,{get(){var h;const n=(h=this.renderRoot)==null?void 0:h.querySelector(s),p=(n==null?void 0:n.assignedElements(t))??[];return a===void 0?p:p.filter(f=>f.matches(a))}})}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Qr(t){return(e,i)=>{const{slot:r}=t??{},a="slot"+(r?`[name=${r}]`:":not([name])");return mt(e,i,{get(){var n;const s=(n=this.renderRoot)==null?void 0:n.querySelector(a);return(s==null?void 0:s.assignedNodes(t))??[]}})}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Me=globalThis,Ii=t=>t,ht=Me.trustedTypes,Ei=ht?ht.createPolicy("lit-html",{createHTML:t=>t}):void 0,Qi="$lit$",le=`lit$${Math.random().toFixed(9).slice(2)}$`,er="?"+le,ea=`<${er}>`,xe=document,Ne=()=>xe.createComment(""),Be=t=>t===null||typeof t!="object"&&typeof t!="function",mi=Array.isArray,ta=t=>mi(t)||typeof(t==null?void 0:t[Symbol.iterator])=="function",yt=`[ 	
\f\r]`,Le=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Li=/-->/g,Pi=/>/g,be=RegExp(`>|${yt}(?:([^\\s"'>=/]+)(${yt}*=${yt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Oi=/'/g,Di=/"/g,tr=/^(?:script|style|textarea|title)$/i,ia=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),o=ia(1),Y=Symbol.for("lit-noChange"),l=Symbol.for("lit-nothing"),Ri=new WeakMap,ge=xe.createTreeWalker(xe,129);function ir(t,e){if(!mi(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ei!==void 0?Ei.createHTML(e):e}const ra=(t,e)=>{const i=t.length-1,r=[];let a,s=e===2?"<svg>":e===3?"<math>":"",n=Le;for(let p=0;p<i;p++){const h=t[p];let f,v,u=-1,g=0;for(;g<h.length&&(n.lastIndex=g,v=n.exec(h),v!==null);)g=n.lastIndex,n===Le?v[1]==="!--"?n=Li:v[1]!==void 0?n=Pi:v[2]!==void 0?(tr.test(v[2])&&(a=RegExp("</"+v[2],"g")),n=be):v[3]!==void 0&&(n=be):n===be?v[0]===">"?(n=a??Le,u=-1):v[1]===void 0?u=-2:(u=n.lastIndex-v[2].length,f=v[1],n=v[3]===void 0?be:v[3]==='"'?Di:Oi):n===Di||n===Oi?n=be:n===Li||n===Pi?n=Le:(n=be,a=void 0);const z=n===be&&t[p+1].startsWith("/>")?" ":"";s+=n===Le?h+ea:u>=0?(r.push(f),h.slice(0,u)+Qi+h.slice(u)+le+z):h+le+(u===-2?p:z)}return[ir(t,s+(t[i]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),r]};class Ue{constructor({strings:e,_$litType$:i},r){let a;this.parts=[];let s=0,n=0;const p=e.length-1,h=this.parts,[f,v]=ra(e,i);if(this.el=Ue.createElement(f,r),ge.currentNode=this.el.content,i===2||i===3){const u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(a=ge.nextNode())!==null&&h.length<p;){if(a.nodeType===1){if(a.hasAttributes())for(const u of a.getAttributeNames())if(u.endsWith(Qi)){const g=v[n++],z=a.getAttribute(u).split(le),G=/([.?@])?(.*)/.exec(g);h.push({type:1,index:s,name:G[2],strings:z,ctor:G[1]==="."?oa:G[1]==="?"?sa:G[1]==="@"?na:ft}),a.removeAttribute(u)}else u.startsWith(le)&&(h.push({type:6,index:s}),a.removeAttribute(u));if(tr.test(a.tagName)){const u=a.textContent.split(le),g=u.length-1;if(g>0){a.textContent=ht?ht.emptyScript:"";for(let z=0;z<g;z++)a.append(u[z],Ne()),ge.nextNode(),h.push({type:2,index:++s});a.append(u[g],Ne())}}}else if(a.nodeType===8)if(a.data===er)h.push({type:2,index:s});else{let u=-1;for(;(u=a.data.indexOf(le,u+1))!==-1;)h.push({type:7,index:s}),u+=le.length-1}s++}}static createElement(e,i){const r=xe.createElement("template");return r.innerHTML=e,r}}function Ae(t,e,i=t,r){var n,p;if(e===Y)return e;let a=r!==void 0?(n=i._$Co)==null?void 0:n[r]:i._$Cl;const s=Be(e)?void 0:e._$litDirective$;return(a==null?void 0:a.constructor)!==s&&((p=a==null?void 0:a._$AO)==null||p.call(a,!1),s===void 0?a=void 0:(a=new s(t),a._$AT(t,i,r)),r!==void 0?(i._$Co??(i._$Co=[]))[r]=a:i._$Cl=a),a!==void 0&&(e=Ae(t,a._$AS(t,e.values),a,r)),e}class aa{constructor(e,i){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:i},parts:r}=this._$AD,a=((e==null?void 0:e.creationScope)??xe).importNode(i,!0);ge.currentNode=a;let s=ge.nextNode(),n=0,p=0,h=r[0];for(;h!==void 0;){if(n===h.index){let f;h.type===2?f=new qe(s,s.nextSibling,this,e):h.type===1?f=new h.ctor(s,h.name,h.strings,this,e):h.type===6&&(f=new la(s,this,e)),this._$AV.push(f),h=r[++p]}n!==(h==null?void 0:h.index)&&(s=ge.nextNode(),n++)}return ge.currentNode=xe,a}p(e){let i=0;for(const r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(e,r,i),i+=r.strings.length-2):r._$AI(e[i])),i++}}class qe{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,i,r,a){this.type=2,this._$AH=l,this._$AN=void 0,this._$AA=e,this._$AB=i,this._$AM=r,this.options=a,this._$Cv=(a==null?void 0:a.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const i=this._$AM;return i!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=i.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,i=this){e=Ae(this,e,i),Be(e)?e===l||e==null||e===""?(this._$AH!==l&&this._$AR(),this._$AH=l):e!==this._$AH&&e!==Y&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):ta(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==l&&Be(this._$AH)?this._$AA.nextSibling.data=e:this.T(xe.createTextNode(e)),this._$AH=e}$(e){var s;const{values:i,_$litType$:r}=e,a=typeof r=="number"?this._$AC(e):(r.el===void 0&&(r.el=Ue.createElement(ir(r.h,r.h[0]),this.options)),r);if(((s=this._$AH)==null?void 0:s._$AD)===a)this._$AH.p(i);else{const n=new aa(a,this),p=n.u(this.options);n.p(i),this.T(p),this._$AH=n}}_$AC(e){let i=Ri.get(e.strings);return i===void 0&&Ri.set(e.strings,i=new Ue(e)),i}k(e){mi(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let r,a=0;for(const s of e)a===i.length?i.push(r=new qe(this.O(Ne()),this.O(Ne()),this,this.options)):r=i[a],r._$AI(s),a++;a<i.length&&(this._$AR(r&&r._$AB.nextSibling,a),i.length=a)}_$AR(e=this._$AA.nextSibling,i){var r;for((r=this._$AP)==null?void 0:r.call(this,!1,!0,i);e!==this._$AB;){const a=Ii(e).nextSibling;Ii(e).remove(),e=a}}setConnected(e){var i;this._$AM===void 0&&(this._$Cv=e,(i=this._$AP)==null||i.call(this,e))}}class ft{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,i,r,a,s){this.type=1,this._$AH=l,this._$AN=void 0,this.element=e,this.name=i,this._$AM=a,this.options=s,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=l}_$AI(e,i=this,r,a){const s=this.strings;let n=!1;if(s===void 0)e=Ae(this,e,i,0),n=!Be(e)||e!==this._$AH&&e!==Y,n&&(this._$AH=e);else{const p=e;let h,f;for(e=s[0],h=0;h<s.length-1;h++)f=Ae(this,p[r+h],i,h),f===Y&&(f=this._$AH[h]),n||(n=!Be(f)||f!==this._$AH[h]),f===l?e=l:e!==l&&(e+=(f??"")+s[h+1]),this._$AH[h]=f}n&&!a&&this.j(e)}j(e){e===l?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class oa extends ft{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===l?void 0:e}}class sa extends ft{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==l)}}class na extends ft{constructor(e,i,r,a,s){super(e,i,r,a,s),this.type=5}_$AI(e,i=this){if((e=Ae(this,e,i,0)??l)===Y)return;const r=this._$AH,a=e===l&&r!==l||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,s=e!==l&&(r===l||a);a&&this.element.removeEventListener(this.name,this,r),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var i;typeof this._$AH=="function"?this._$AH.call(((i=this.options)==null?void 0:i.host)??this.element,e):this._$AH.handleEvent(e)}}class la{constructor(e,i,r){this.element=e,this.type=6,this._$AN=void 0,this._$AM=i,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(e){Ae(this,e)}}const xt=Me.litHtmlPolyfillSupport;xt==null||xt(Ue,qe),(Me.litHtmlVersions??(Me.litHtmlVersions=[])).push("3.3.3");const rr=(t,e,i)=>{const r=(i==null?void 0:i.renderBefore)??e;let a=r._$litPart$;if(a===void 0){const s=(i==null?void 0:i.renderBefore)??null;r._$litPart$=a=new qe(e.insertBefore(Ne(),s),s,void 0,i??{})}return a._$AI(t),a};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ye=globalThis;let k=class extends Te{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var i;const e=super.createRenderRoot();return(i=this.renderOptions).renderBefore??(i.renderBefore=e.firstChild),e}update(e){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=rr(i,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return Y}};var Xi;k._$litElement$=!0,k.finalized=!0,(Xi=ye.litElementHydrateSupport)==null||Xi.call(ye,{LitElement:k});const wt=ye.litElementPolyfillSupport;wt==null||wt({LitElement:k});(ye.litElementVersions??(ye.litElementVersions=[])).push("4.2.2");/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class da extends k{connectedCallback(){super.connectedCallback(),this.setAttribute("aria-hidden","true")}render(){return o`<span class="shadow"></span>`}}/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const ca=y`:host,.shadow,.shadow::before,.shadow::after{border-radius:inherit;inset:0;position:absolute;transition-duration:inherit;transition-property:inherit;transition-timing-function:inherit}:host{display:flex;pointer-events:none;transition-property:box-shadow,opacity}.shadow::before,.shadow::after{content:"";transition-property:box-shadow,opacity;--_level: var(--md-elevation-level, 0);--_shadow-color: var(--md-elevation-shadow-color, var(--md-sys-color-shadow, #000))}.shadow::before{box-shadow:0px calc(1px*(clamp(0,var(--_level),1) + clamp(0,var(--_level) - 3,1) + 2*clamp(0,var(--_level) - 4,1))) calc(1px*(2*clamp(0,var(--_level),1) + clamp(0,var(--_level) - 2,1) + clamp(0,var(--_level) - 4,1))) 0px var(--_shadow-color);opacity:.3}.shadow::after{box-shadow:0px calc(1px*(clamp(0,var(--_level),1) + clamp(0,var(--_level) - 1,1) + 2*clamp(0,var(--_level) - 2,3))) calc(1px*(3*clamp(0,var(--_level),2) + 2*clamp(0,var(--_level) - 2,3))) calc(1px*(clamp(0,var(--_level),4) + 2*clamp(0,var(--_level) - 4,1))) var(--_shadow-color);opacity:.15}
`;/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let Lt=class extends da{};Lt.styles=[ca];Lt=d([C("md-elevation")],Lt);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const ar=Symbol("attachableController");let lt;lt=new MutationObserver(t=>{var e;for(const i of t)(e=i.target[ar])==null||e.hostConnected()});class or{get htmlFor(){return this.host.getAttribute("for")}set htmlFor(e){e===null?this.host.removeAttribute("for"):this.host.setAttribute("for",e)}get control(){return this.host.hasAttribute("for")?!this.htmlFor||!this.host.isConnected?null:this.host.getRootNode().querySelector(`#${this.htmlFor}`):this.currentControl||this.host.parentElement}set control(e){e?this.attach(e):this.detach()}constructor(e,i){this.host=e,this.onControlChange=i,this.currentControl=null,e.addController(this),e[ar]=this,lt==null||lt.observe(e,{attributeFilter:["for"]})}attach(e){e!==this.currentControl&&(this.setCurrentControl(e),this.host.removeAttribute("for"))}detach(){this.setCurrentControl(null),this.host.setAttribute("for","")}hostConnected(){this.setCurrentControl(this.control)}hostDisconnected(){this.setCurrentControl(null)}setCurrentControl(e){this.onControlChange(this.currentControl,e),this.currentControl=e}}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const pa=["focusin","focusout","pointerdown"];class fi extends k{constructor(){super(...arguments),this.visible=!1,this.inward=!1,this.attachableController=new or(this,this.onControlChange.bind(this))}get htmlFor(){return this.attachableController.htmlFor}set htmlFor(e){this.attachableController.htmlFor=e}get control(){return this.attachableController.control}set control(e){this.attachableController.control=e}attach(e){this.attachableController.attach(e)}detach(){this.attachableController.detach()}connectedCallback(){super.connectedCallback(),this.setAttribute("aria-hidden","true")}handleEvent(e){var i;if(!e[Mi]){switch(e.type){default:return;case"focusin":this.visible=((i=this.control)==null?void 0:i.matches(":focus-visible"))??!1;break;case"focusout":case"pointerdown":this.visible=!1;break}e[Mi]=!0}}onControlChange(e,i){for(const r of pa)e==null||e.removeEventListener(r,this),i==null||i.addEventListener(r,this)}update(e){e.has("visible")&&this.dispatchEvent(new Event("visibility-changed")),super.update(e)}}d([m({type:Boolean,reflect:!0})],fi.prototype,"visible",void 0);d([m({type:Boolean,reflect:!0})],fi.prototype,"inward",void 0);const Mi=Symbol("handledByFocusRing");/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const ha=y`:host{animation-delay:0s,calc(var(--md-focus-ring-duration, 600ms)*.25);animation-duration:calc(var(--md-focus-ring-duration, 600ms)*.25),calc(var(--md-focus-ring-duration, 600ms)*.75);animation-timing-function:cubic-bezier(0.2, 0, 0, 1);box-sizing:border-box;color:var(--md-focus-ring-color, var(--md-sys-color-secondary, #625b71));display:none;pointer-events:none;position:absolute}:host([visible]){display:flex}:host(:not([inward])){animation-name:outward-grow,outward-shrink;border-end-end-radius:calc(var(--md-focus-ring-shape-end-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));border-end-start-radius:calc(var(--md-focus-ring-shape-end-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));border-start-end-radius:calc(var(--md-focus-ring-shape-start-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));border-start-start-radius:calc(var(--md-focus-ring-shape-start-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));inset:calc(-1*var(--md-focus-ring-outward-offset, 2px));outline:var(--md-focus-ring-width, 3px) solid currentColor}:host([inward]){animation-name:inward-grow,inward-shrink;border-end-end-radius:calc(var(--md-focus-ring-shape-end-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border-end-start-radius:calc(var(--md-focus-ring-shape-end-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border-start-end-radius:calc(var(--md-focus-ring-shape-start-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border-start-start-radius:calc(var(--md-focus-ring-shape-start-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border:var(--md-focus-ring-width, 3px) solid currentColor;inset:var(--md-focus-ring-inward-offset, 0px)}@keyframes outward-grow{from{outline-width:0}to{outline-width:var(--md-focus-ring-active-width, 8px)}}@keyframes outward-shrink{from{outline-width:var(--md-focus-ring-active-width, 8px)}}@keyframes inward-grow{from{border-width:0}to{border-width:var(--md-focus-ring-active-width, 8px)}}@keyframes inward-shrink{from{border-width:var(--md-focus-ring-active-width, 8px)}}@media(prefers-reduced-motion){:host{animation:none}}
`;/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let Pt=class extends fi{};Pt.styles=[ha];Pt=d([C("md-focus-ring")],Pt);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ne={ATTRIBUTE:1,PROPERTY:3,BOOLEAN_ATTRIBUTE:4},vi=t=>(...e)=>({_$litDirective$:t,values:e});let bi=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,i,r){this._$Ct=e,this._$AM=i,this._$Ci=r}_$AS(e,i){return this.update(e,i)}update(e,i){return this.render(...i)}};/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const W=vi(class extends bi{constructor(t){var e;if(super(t),t.type!==ne.ATTRIBUTE||t.name!=="class"||((e=t.strings)==null?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){var r,a;if(this.st===void 0){this.st=new Set,t.strings!==void 0&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(s=>s!=="")));for(const s in e)e[s]&&!((r=this.nt)!=null&&r.has(s))&&this.st.add(s);return this.render(e)}const i=t.element.classList;for(const s of this.st)s in e||(i.remove(s),this.st.delete(s));for(const s in e){const n=!!e[s];n===this.st.has(s)||(a=this.nt)!=null&&a.has(s)||(n?(i.add(s),this.st.add(s)):(i.remove(s),this.st.delete(s)))}return Y}});/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const we={STANDARD:"cubic-bezier(0.2, 0, 0, 1)",EMPHASIZED:"cubic-bezier(.3,0,0,1)",EMPHASIZED_ACCELERATE:"cubic-bezier(.3,0,.8,.15)"};/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const ua=450,Fi=225,ma=.2,fa=10,va=75,ba=.35,ga="::after",ya="forwards";var B;(function(t){t[t.INACTIVE=0]="INACTIVE",t[t.TOUCH_DELAY=1]="TOUCH_DELAY",t[t.HOLDING=2]="HOLDING",t[t.WAITING_FOR_CLICK=3]="WAITING_FOR_CLICK"})(B||(B={}));const xa=["click","contextmenu","pointercancel","pointerdown","pointerenter","pointerleave","pointerup"],wa=150,_t=window.matchMedia("(forced-colors: active)");class Ve extends k{constructor(){super(...arguments),this.disabled=!1,this.hovered=!1,this.pressed=!1,this.rippleSize="",this.rippleScale="",this.initialSize=0,this.state=B.INACTIVE,this.attachableController=new or(this,this.onControlChange.bind(this))}get htmlFor(){return this.attachableController.htmlFor}set htmlFor(e){this.attachableController.htmlFor=e}get control(){return this.attachableController.control}set control(e){this.attachableController.control=e}attach(e){this.attachableController.attach(e)}detach(){this.attachableController.detach()}connectedCallback(){super.connectedCallback(),this.setAttribute("aria-hidden","true")}render(){const e={hovered:this.hovered,pressed:this.pressed};return o`<div class="surface ${W(e)}"></div>`}update(e){e.has("disabled")&&this.disabled&&(this.hovered=!1,this.pressed=!1),super.update(e)}handlePointerenter(e){this.shouldReactToEvent(e)&&(this.hovered=!0)}handlePointerleave(e){this.shouldReactToEvent(e)&&(this.hovered=!1,this.state!==B.INACTIVE&&this.endPressAnimation())}handlePointerup(e){if(this.shouldReactToEvent(e)){if(this.state===B.HOLDING){this.state=B.WAITING_FOR_CLICK;return}if(this.state===B.TOUCH_DELAY){this.state=B.WAITING_FOR_CLICK,this.startPressAnimation(this.rippleStartEvent);return}}}async handlePointerdown(e){if(this.shouldReactToEvent(e)){if(this.rippleStartEvent=e,!this.isTouch(e)){this.state=B.WAITING_FOR_CLICK,this.startPressAnimation(e);return}this.state=B.TOUCH_DELAY,await new Promise(i=>{setTimeout(i,wa)}),this.state===B.TOUCH_DELAY&&(this.state=B.HOLDING,this.startPressAnimation(e))}}handleClick(){if(!this.disabled){if(this.state===B.WAITING_FOR_CLICK){this.endPressAnimation();return}this.state===B.INACTIVE&&(this.startPressAnimation(),this.endPressAnimation())}}handlePointercancel(e){this.shouldReactToEvent(e)&&this.endPressAnimation()}handleContextmenu(){this.disabled||this.endPressAnimation()}determineRippleSize(){const{height:e,width:i}=this.getBoundingClientRect(),r=Math.max(e,i),a=Math.max(ba*r,va),s=this.currentCSSZoom??1,n=Math.floor(r*ma/s),h=Math.sqrt(i**2+e**2)+fa;this.initialSize=n;const f=(h+a)/n;this.rippleScale=`${f/s}`,this.rippleSize=`${n}px`}getNormalizedPointerEventCoords(e){const{scrollX:i,scrollY:r}=window,{left:a,top:s}=this.getBoundingClientRect(),n=i+a,p=r+s,{pageX:h,pageY:f}=e,v=this.currentCSSZoom??1;return{x:(h-n)/v,y:(f-p)/v}}getTranslationCoordinates(e){const{height:i,width:r}=this.getBoundingClientRect(),a=this.currentCSSZoom??1,s={x:(r/a-this.initialSize)/2,y:(i/a-this.initialSize)/2};let n;return e instanceof PointerEvent?n=this.getNormalizedPointerEventCoords(e):n={x:r/a/2,y:i/a/2},n={x:n.x-this.initialSize/2,y:n.y-this.initialSize/2},{startPoint:n,endPoint:s}}startPressAnimation(e){var n;if(!this.mdRoot)return;this.pressed=!0,(n=this.growAnimation)==null||n.cancel(),this.determineRippleSize();const{startPoint:i,endPoint:r}=this.getTranslationCoordinates(e),a=`${i.x}px, ${i.y}px`,s=`${r.x}px, ${r.y}px`;this.growAnimation=this.mdRoot.animate({top:[0,0],left:[0,0],height:[this.rippleSize,this.rippleSize],width:[this.rippleSize,this.rippleSize],transform:[`translate(${a}) scale(1)`,`translate(${s}) scale(${this.rippleScale})`]},{pseudoElement:ga,duration:ua,easing:we.STANDARD,fill:ya})}async endPressAnimation(){this.rippleStartEvent=void 0,this.state=B.INACTIVE;const e=this.growAnimation;let i=1/0;if(typeof(e==null?void 0:e.currentTime)=="number"?i=e.currentTime:e!=null&&e.currentTime&&(i=e.currentTime.to("ms").value),i>=Fi){this.pressed=!1;return}await new Promise(r=>{setTimeout(r,Fi-i)}),this.growAnimation===e&&(this.pressed=!1)}shouldReactToEvent(e){if(this.disabled||!e.isPrimary||this.rippleStartEvent&&this.rippleStartEvent.pointerId!==e.pointerId)return!1;if(e.type==="pointerenter"||e.type==="pointerleave")return!this.isTouch(e);const i=e.buttons===1;return this.isTouch(e)||i}isTouch({pointerType:e}){return e==="touch"}async handleEvent(e){if(!(_t!=null&&_t.matches))switch(e.type){case"click":this.handleClick();break;case"contextmenu":this.handleContextmenu();break;case"pointercancel":this.handlePointercancel(e);break;case"pointerdown":await this.handlePointerdown(e);break;case"pointerenter":this.handlePointerenter(e);break;case"pointerleave":this.handlePointerleave(e);break;case"pointerup":this.handlePointerup(e);break}}onControlChange(e,i){for(const r of xa)e==null||e.removeEventListener(r,this),i==null||i.addEventListener(r,this)}}d([m({type:Boolean,reflect:!0})],Ve.prototype,"disabled",void 0);d([c()],Ve.prototype,"hovered",void 0);d([c()],Ve.prototype,"pressed",void 0);d([S(".surface")],Ve.prototype,"mdRoot",void 0);/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const _a=y`:host{display:flex;margin:auto;pointer-events:none}:host([disabled]){display:none}@media(forced-colors: active){:host{display:none}}:host,.surface{border-radius:inherit;position:absolute;inset:0;overflow:hidden}.surface{-webkit-tap-highlight-color:rgba(0,0,0,0)}.surface::before,.surface::after{content:"";opacity:0;position:absolute}.surface::before{background-color:var(--md-ripple-hover-color, var(--md-sys-color-on-surface, #1d1b20));inset:0;transition:opacity 15ms linear,background-color 15ms linear}.surface::after{background:radial-gradient(closest-side, var(--md-ripple-pressed-color, var(--md-sys-color-on-surface, #1d1b20)) max(100% - 70px, 65%), transparent 100%);transform-origin:center center;transition:opacity 375ms linear}.hovered::before{background-color:var(--md-ripple-hover-color, var(--md-sys-color-on-surface, #1d1b20));opacity:var(--md-ripple-hover-opacity, 0.08)}.pressed::after{opacity:var(--md-ripple-pressed-opacity, 0.12);transition-duration:105ms}
`;/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let Ot=class extends Ve{};Ot.styles=[_a];Ot=d([C("md-ripple")],Ot);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const sr=["role","ariaAtomic","ariaAutoComplete","ariaBusy","ariaChecked","ariaColCount","ariaColIndex","ariaColSpan","ariaCurrent","ariaDisabled","ariaExpanded","ariaHasPopup","ariaHidden","ariaInvalid","ariaKeyShortcuts","ariaLabel","ariaLevel","ariaLive","ariaModal","ariaMultiLine","ariaMultiSelectable","ariaOrientation","ariaPlaceholder","ariaPosInSet","ariaPressed","ariaReadOnly","ariaRequired","ariaRoleDescription","ariaRowCount","ariaRowIndex","ariaRowSpan","ariaSelected","ariaSetSize","ariaSort","ariaValueMax","ariaValueMin","ariaValueNow","ariaValueText"],$a=sr.map(nr);function $t(t){return $a.includes(t)}function nr(t){return t.replace("aria","aria-").replace(/Elements?/g,"").toLowerCase()}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Je=Symbol("privateIgnoreAttributeChangesFor");function he(t){var e;class i extends t{constructor(){super(...arguments),this[e]=new Set}attributeChangedCallback(a,s,n){if(!$t(a)){super.attributeChangedCallback(a,s,n);return}if(this[Je].has(a))return;this[Je].add(a),this.removeAttribute(a),this[Je].delete(a);const p=Rt(a);n===null?delete this.dataset[p]:this.dataset[p]=n,this.requestUpdate(Rt(a),s)}getAttribute(a){return $t(a)?super.getAttribute(Dt(a)):super.getAttribute(a)}removeAttribute(a){super.removeAttribute(a),$t(a)&&(super.removeAttribute(Dt(a)),this.requestUpdate())}}return e=Je,ka(i),i}function ka(t){for(const e of sr){const i=nr(e),r=Dt(i),a=Rt(i);t.createProperty(e,{attribute:i,noAccessor:!0}),t.createProperty(Symbol(r),{attribute:r,noAccessor:!0}),Object.defineProperty(t.prototype,e,{configurable:!0,enumerable:!0,get(){return this.dataset[a]??null},set(s){const n=this.dataset[a]??null;s!==n&&(s===null?delete this.dataset[a]:this.dataset[a]=s,this.requestUpdate(e,n))}})}}function Dt(t){return`data-${t}`}function Rt(t){return t.replace(/-\w/,e=>e[1].toUpperCase())}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const U=Symbol("internals"),kt=Symbol("privateInternals");function gi(t){class e extends t{get[U](){return this[kt]||(this[kt]=this.attachInternals()),this[kt]}}return e}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function lr(t){t.addInitializer(e=>{const i=e;i.addEventListener("click",async r=>{const{type:a,[U]:s}=i,{form:n}=s;if(!(!n||a==="button")&&(await new Promise(p=>{setTimeout(p)}),!r.defaultPrevented)){if(a==="reset"){n.reset();return}n.addEventListener("submit",p=>{Object.defineProperty(p,"submitter",{configurable:!0,enumerable:!0,get:()=>i})},{capture:!0,once:!0}),s.setFormValue(i.value),n.requestSubmit()}})})}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function Ca(t){const e=new MouseEvent("click",{bubbles:!0});return t.dispatchEvent(e),e}function za(t){return t.currentTarget!==t.target||t.composedPath()[0]!==t.target||t.target.disabled?!1:!Ta(t)}function Ta(t){const e=Mt;return e&&(t.preventDefault(),t.stopImmediatePropagation()),Sa(),e}let Mt=!1;async function Sa(){Mt=!0,await null,Mt=!1}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Aa=he(gi(k));class M extends Aa{get name(){return this.getAttribute("name")??""}set name(e){this.setAttribute("name",e)}get form(){return this[U].form}constructor(){super(),this.disabled=!1,this.softDisabled=!1,this.href="",this.download="",this.target="",this.trailingIcon=!1,this.hasIcon=!1,this.type="submit",this.value="",this.addEventListener("click",this.handleClick.bind(this))}focus(){var e;(e=this.buttonElement)==null||e.focus()}blur(){var e;(e=this.buttonElement)==null||e.blur()}render(){var a;const e=this.disabled||this.softDisabled,i=this.href?this.renderLink():this.renderButton(),r=this.href?"link":"button";return o`
      ${(a=this.renderElevationOrOutline)==null?void 0:a.call(this)}
      <div class="background"></div>
      <md-focus-ring part="focus-ring" for=${r}></md-focus-ring>
      <md-ripple
        part="ripple"
        for=${r}
        ?disabled="${e}"></md-ripple>
      ${i}
    `}renderButton(){const{ariaLabel:e,ariaHasPopup:i,ariaExpanded:r}=this;return o`<button
      id="button"
      class="button"
      ?disabled=${this.disabled}
      aria-disabled=${this.softDisabled||l}
      aria-label="${e||l}"
      aria-haspopup="${i||l}"
      aria-expanded="${r||l}">
      ${this.renderContent()}
    </button>`}renderLink(){const{ariaLabel:e,ariaHasPopup:i,ariaExpanded:r}=this;return o`<a
      id="link"
      class="button"
      aria-label="${e||l}"
      aria-haspopup="${i||l}"
      aria-expanded="${r||l}"
      aria-disabled=${this.disabled||this.softDisabled||l}
      tabindex="${this.disabled&&!this.softDisabled?-1:l}"
      href=${this.href}
      download=${this.download||l}
      target=${this.target||l}
      >${this.renderContent()}
    </a>`}renderContent(){const e=o`<slot
      name="icon"
      @slotchange="${this.handleSlotChange}"></slot>`;return o`
      <span class="touch"></span>
      ${this.trailingIcon?l:e}
      <span class="label"><slot></slot></span>
      ${this.trailingIcon?e:l}
    `}handleClick(e){if(this.softDisabled||this.disabled&&this.href){e.stopImmediatePropagation(),e.preventDefault();return}!za(e)||!this.buttonElement||(this.focus(),Ca(this.buttonElement))}handleSlotChange(){this.hasIcon=this.assignedIcons.length>0}}lr(M);M.formAssociated=!0;M.shadowRootOptions={mode:"open",delegatesFocus:!0};d([m({type:Boolean,reflect:!0})],M.prototype,"disabled",void 0);d([m({type:Boolean,attribute:"soft-disabled",reflect:!0})],M.prototype,"softDisabled",void 0);d([m()],M.prototype,"href",void 0);d([m()],M.prototype,"download",void 0);d([m()],M.prototype,"target",void 0);d([m({type:Boolean,attribute:"trailing-icon",reflect:!0})],M.prototype,"trailingIcon",void 0);d([m({type:Boolean,attribute:"has-icon",reflect:!0})],M.prototype,"hasIcon",void 0);d([m()],M.prototype,"type",void 0);d([m({reflect:!0})],M.prototype,"value",void 0);d([S(".button")],M.prototype,"buttonElement",void 0);d([pe({slot:"icon",flatten:!0})],M.prototype,"assignedIcons",void 0);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Ia extends M{renderElevationOrOutline(){return o`<md-elevation part="elevation"></md-elevation>`}}/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Ea=y`:host{--_container-color: var(--md-filled-button-container-color, var(--md-sys-color-primary, #6750a4));--_container-elevation: var(--md-filled-button-container-elevation, 0);--_container-height: var(--md-filled-button-container-height, 40px);--_container-shadow-color: var(--md-filled-button-container-shadow-color, var(--md-sys-color-shadow, #000));--_disabled-container-color: var(--md-filled-button-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-container-elevation: var(--md-filled-button-disabled-container-elevation, 0);--_disabled-container-opacity: var(--md-filled-button-disabled-container-opacity, 0.12);--_disabled-label-text-color: var(--md-filled-button-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-filled-button-disabled-label-text-opacity, 0.38);--_focus-container-elevation: var(--md-filled-button-focus-container-elevation, 0);--_focus-label-text-color: var(--md-filled-button-focus-label-text-color, var(--md-sys-color-on-primary, #fff));--_hover-container-elevation: var(--md-filled-button-hover-container-elevation, 1);--_hover-label-text-color: var(--md-filled-button-hover-label-text-color, var(--md-sys-color-on-primary, #fff));--_hover-state-layer-color: var(--md-filled-button-hover-state-layer-color, var(--md-sys-color-on-primary, #fff));--_hover-state-layer-opacity: var(--md-filled-button-hover-state-layer-opacity, 0.08);--_label-text-color: var(--md-filled-button-label-text-color, var(--md-sys-color-on-primary, #fff));--_label-text-font: var(--md-filled-button-label-text-font, var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-filled-button-label-text-line-height, var(--md-sys-typescale-label-large-line-height, 1.25rem));--_label-text-size: var(--md-filled-button-label-text-size, var(--md-sys-typescale-label-large-size, 0.875rem));--_label-text-weight: var(--md-filled-button-label-text-weight, var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)));--_pressed-container-elevation: var(--md-filled-button-pressed-container-elevation, 0);--_pressed-label-text-color: var(--md-filled-button-pressed-label-text-color, var(--md-sys-color-on-primary, #fff));--_pressed-state-layer-color: var(--md-filled-button-pressed-state-layer-color, var(--md-sys-color-on-primary, #fff));--_pressed-state-layer-opacity: var(--md-filled-button-pressed-state-layer-opacity, 0.12);--_disabled-icon-color: var(--md-filled-button-disabled-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-icon-opacity: var(--md-filled-button-disabled-icon-opacity, 0.38);--_focus-icon-color: var(--md-filled-button-focus-icon-color, var(--md-sys-color-on-primary, #fff));--_hover-icon-color: var(--md-filled-button-hover-icon-color, var(--md-sys-color-on-primary, #fff));--_icon-color: var(--md-filled-button-icon-color, var(--md-sys-color-on-primary, #fff));--_icon-size: var(--md-filled-button-icon-size, 18px);--_pressed-icon-color: var(--md-filled-button-pressed-icon-color, var(--md-sys-color-on-primary, #fff));--_container-shape-start-start: var(--md-filled-button-container-shape-start-start, var(--md-filled-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-start-end: var(--md-filled-button-container-shape-start-end, var(--md-filled-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-end: var(--md-filled-button-container-shape-end-end, var(--md-filled-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-start: var(--md-filled-button-container-shape-end-start, var(--md-filled-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_leading-space: var(--md-filled-button-leading-space, 24px);--_trailing-space: var(--md-filled-button-trailing-space, 24px);--_with-leading-icon-leading-space: var(--md-filled-button-with-leading-icon-leading-space, 16px);--_with-leading-icon-trailing-space: var(--md-filled-button-with-leading-icon-trailing-space, 24px);--_with-trailing-icon-leading-space: var(--md-filled-button-with-trailing-icon-leading-space, 24px);--_with-trailing-icon-trailing-space: var(--md-filled-button-with-trailing-icon-trailing-space, 16px)}
`;/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const La=y`md-elevation{transition-duration:280ms}:host(:is([disabled],[soft-disabled])) md-elevation{transition:none}md-elevation{--md-elevation-level: var(--_container-elevation);--md-elevation-shadow-color: var(--_container-shadow-color)}:host(:focus-within) md-elevation{--md-elevation-level: var(--_focus-container-elevation)}:host(:hover) md-elevation{--md-elevation-level: var(--_hover-container-elevation)}:host(:active) md-elevation{--md-elevation-level: var(--_pressed-container-elevation)}:host(:is([disabled],[soft-disabled])) md-elevation{--md-elevation-level: var(--_disabled-container-elevation)}
`;/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const yi=y`:host{border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end);box-sizing:border-box;cursor:pointer;display:inline-flex;gap:8px;min-height:var(--_container-height);outline:none;padding-block:calc((var(--_container-height) - max(var(--_label-text-line-height),var(--_icon-size)))/2);padding-inline-start:var(--_leading-space);padding-inline-end:var(--_trailing-space);place-content:center;place-items:center;position:relative;font-family:var(--_label-text-font);font-size:var(--_label-text-size);line-height:var(--_label-text-line-height);font-weight:var(--_label-text-weight);text-overflow:ellipsis;text-wrap:nowrap;user-select:none;-webkit-tap-highlight-color:rgba(0,0,0,0);vertical-align:top;--md-ripple-hover-color: var(--_hover-state-layer-color);--md-ripple-pressed-color: var(--_pressed-state-layer-color);--md-ripple-hover-opacity: var(--_hover-state-layer-opacity);--md-ripple-pressed-opacity: var(--_pressed-state-layer-opacity)}md-focus-ring{--md-focus-ring-shape-start-start: var(--_container-shape-start-start);--md-focus-ring-shape-start-end: var(--_container-shape-start-end);--md-focus-ring-shape-end-end: var(--_container-shape-end-end);--md-focus-ring-shape-end-start: var(--_container-shape-end-start)}:host(:is([disabled],[soft-disabled])){cursor:default;pointer-events:none}.button{border-radius:inherit;cursor:inherit;display:inline-flex;align-items:center;justify-content:center;border:none;outline:none;-webkit-appearance:none;vertical-align:middle;background:rgba(0,0,0,0);text-decoration:none;min-width:calc(64px - var(--_leading-space) - var(--_trailing-space));width:100%;z-index:0;height:100%;font:inherit;color:var(--_label-text-color);padding:0;gap:inherit;text-transform:inherit}.button::-moz-focus-inner{padding:0;border:0}:host(:hover) .button{color:var(--_hover-label-text-color)}:host(:focus-within) .button{color:var(--_focus-label-text-color)}:host(:active) .button{color:var(--_pressed-label-text-color)}.background{background:var(--_container-color);border-radius:inherit;inset:0;position:absolute}.label{overflow:hidden}:is(.button,.label,.label slot),.label ::slotted(*){text-overflow:inherit}:host(:is([disabled],[soft-disabled])) .label{color:var(--_disabled-label-text-color);opacity:var(--_disabled-label-text-opacity)}:host(:is([disabled],[soft-disabled])) .background{background:var(--_disabled-container-color);opacity:var(--_disabled-container-opacity)}@media(forced-colors: active){.background{border:1px solid CanvasText}:host(:is([disabled],[soft-disabled])){--_disabled-icon-color: GrayText;--_disabled-icon-opacity: 1;--_disabled-container-opacity: 1;--_disabled-label-text-color: GrayText;--_disabled-label-text-opacity: 1}}:host([has-icon]:not([trailing-icon])){padding-inline-start:var(--_with-leading-icon-leading-space);padding-inline-end:var(--_with-leading-icon-trailing-space)}:host([has-icon][trailing-icon]){padding-inline-start:var(--_with-trailing-icon-leading-space);padding-inline-end:var(--_with-trailing-icon-trailing-space)}::slotted([slot=icon]){display:inline-flex;position:relative;writing-mode:horizontal-tb;fill:currentColor;flex-shrink:0;color:var(--_icon-color);font-size:var(--_icon-size);inline-size:var(--_icon-size);block-size:var(--_icon-size)}:host(:hover) ::slotted([slot=icon]){color:var(--_hover-icon-color)}:host(:focus-within) ::slotted([slot=icon]){color:var(--_focus-icon-color)}:host(:active) ::slotted([slot=icon]){color:var(--_pressed-icon-color)}:host(:is([disabled],[soft-disabled])) ::slotted([slot=icon]){color:var(--_disabled-icon-color);opacity:var(--_disabled-icon-opacity)}.touch{position:absolute;top:50%;height:48px;left:0;right:0;transform:translateY(-50%)}:host([touch-target=wrapper]){margin:max(0px,(48px - var(--_container-height))/2) 0}:host([touch-target=none]) .touch{display:none}
`;/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let Ft=class extends Ia{};Ft.styles=[yi,La,Ea];Ft=d([C("md-filled-button")],Ft);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Pa extends M{}/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Oa=y`:host{--_container-height: var(--md-text-button-container-height, 40px);--_disabled-label-text-color: var(--md-text-button-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-text-button-disabled-label-text-opacity, 0.38);--_focus-label-text-color: var(--md-text-button-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_hover-label-text-color: var(--md-text-button-hover-label-text-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-color: var(--md-text-button-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-opacity: var(--md-text-button-hover-state-layer-opacity, 0.08);--_label-text-color: var(--md-text-button-label-text-color, var(--md-sys-color-primary, #6750a4));--_label-text-font: var(--md-text-button-label-text-font, var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-text-button-label-text-line-height, var(--md-sys-typescale-label-large-line-height, 1.25rem));--_label-text-size: var(--md-text-button-label-text-size, var(--md-sys-typescale-label-large-size, 0.875rem));--_label-text-weight: var(--md-text-button-label-text-weight, var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)));--_pressed-label-text-color: var(--md-text-button-pressed-label-text-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-color: var(--md-text-button-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-opacity: var(--md-text-button-pressed-state-layer-opacity, 0.12);--_disabled-icon-color: var(--md-text-button-disabled-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-icon-opacity: var(--md-text-button-disabled-icon-opacity, 0.38);--_focus-icon-color: var(--md-text-button-focus-icon-color, var(--md-sys-color-primary, #6750a4));--_hover-icon-color: var(--md-text-button-hover-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-color: var(--md-text-button-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-size: var(--md-text-button-icon-size, 18px);--_pressed-icon-color: var(--md-text-button-pressed-icon-color, var(--md-sys-color-primary, #6750a4));--_container-shape-start-start: var(--md-text-button-container-shape-start-start, var(--md-text-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-start-end: var(--md-text-button-container-shape-start-end, var(--md-text-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-end: var(--md-text-button-container-shape-end-end, var(--md-text-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-start: var(--md-text-button-container-shape-end-start, var(--md-text-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_leading-space: var(--md-text-button-leading-space, 12px);--_trailing-space: var(--md-text-button-trailing-space, 12px);--_with-leading-icon-leading-space: var(--md-text-button-with-leading-icon-leading-space, 12px);--_with-leading-icon-trailing-space: var(--md-text-button-with-leading-icon-trailing-space, 16px);--_with-trailing-icon-leading-space: var(--md-text-button-with-trailing-icon-leading-space, 16px);--_with-trailing-icon-trailing-space: var(--md-text-button-with-trailing-icon-trailing-space, 12px);--_container-color: none;--_disabled-container-color: none;--_disabled-container-opacity: 0}
`;/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let Nt=class extends Pa{};Nt.styles=[yi,Oa];Nt=d([C("md-text-button")],Nt);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Da extends M{renderElevationOrOutline(){return o`<div class="outline"></div>`}}/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Ra=y`:host{--_container-height: var(--md-outlined-button-container-height, 40px);--_disabled-label-text-color: var(--md-outlined-button-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-outlined-button-disabled-label-text-opacity, 0.38);--_disabled-outline-color: var(--md-outlined-button-disabled-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-outline-opacity: var(--md-outlined-button-disabled-outline-opacity, 0.12);--_focus-label-text-color: var(--md-outlined-button-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_hover-label-text-color: var(--md-outlined-button-hover-label-text-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-color: var(--md-outlined-button-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-opacity: var(--md-outlined-button-hover-state-layer-opacity, 0.08);--_label-text-color: var(--md-outlined-button-label-text-color, var(--md-sys-color-primary, #6750a4));--_label-text-font: var(--md-outlined-button-label-text-font, var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-outlined-button-label-text-line-height, var(--md-sys-typescale-label-large-line-height, 1.25rem));--_label-text-size: var(--md-outlined-button-label-text-size, var(--md-sys-typescale-label-large-size, 0.875rem));--_label-text-weight: var(--md-outlined-button-label-text-weight, var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)));--_outline-color: var(--md-outlined-button-outline-color, var(--md-sys-color-outline, #79747e));--_outline-width: var(--md-outlined-button-outline-width, 1px);--_pressed-label-text-color: var(--md-outlined-button-pressed-label-text-color, var(--md-sys-color-primary, #6750a4));--_pressed-outline-color: var(--md-outlined-button-pressed-outline-color, var(--md-sys-color-outline, #79747e));--_pressed-state-layer-color: var(--md-outlined-button-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-opacity: var(--md-outlined-button-pressed-state-layer-opacity, 0.12);--_disabled-icon-color: var(--md-outlined-button-disabled-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-icon-opacity: var(--md-outlined-button-disabled-icon-opacity, 0.38);--_focus-icon-color: var(--md-outlined-button-focus-icon-color, var(--md-sys-color-primary, #6750a4));--_hover-icon-color: var(--md-outlined-button-hover-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-color: var(--md-outlined-button-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-size: var(--md-outlined-button-icon-size, 18px);--_pressed-icon-color: var(--md-outlined-button-pressed-icon-color, var(--md-sys-color-primary, #6750a4));--_container-shape-start-start: var(--md-outlined-button-container-shape-start-start, var(--md-outlined-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-start-end: var(--md-outlined-button-container-shape-start-end, var(--md-outlined-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-end: var(--md-outlined-button-container-shape-end-end, var(--md-outlined-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-start: var(--md-outlined-button-container-shape-end-start, var(--md-outlined-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_leading-space: var(--md-outlined-button-leading-space, 24px);--_trailing-space: var(--md-outlined-button-trailing-space, 24px);--_with-leading-icon-leading-space: var(--md-outlined-button-with-leading-icon-leading-space, 16px);--_with-leading-icon-trailing-space: var(--md-outlined-button-with-leading-icon-trailing-space, 24px);--_with-trailing-icon-leading-space: var(--md-outlined-button-with-trailing-icon-leading-space, 24px);--_with-trailing-icon-trailing-space: var(--md-outlined-button-with-trailing-icon-trailing-space, 16px);--_container-color: none;--_disabled-container-color: none;--_disabled-container-opacity: 0}.outline{inset:0;border-style:solid;position:absolute;box-sizing:border-box;border-color:var(--_outline-color);border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end)}:host(:active) .outline{border-color:var(--_pressed-outline-color)}:host(:is([disabled],[soft-disabled])) .outline{border-color:var(--_disabled-outline-color);opacity:var(--_disabled-outline-opacity)}@media(forced-colors: active){:host(:is([disabled],[soft-disabled])) .background{border-color:GrayText}:host(:is([disabled],[soft-disabled])) .outline{opacity:1}}.outline,md-ripple{border-width:var(--_outline-width)}md-ripple{inline-size:calc(100% - 2*var(--_outline-width));block-size:calc(100% - 2*var(--_outline-width));border-style:solid;border-color:rgba(0,0,0,0)}
`;/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let Bt=class extends Da{};Bt.styles=[yi,Ra];Bt=d([C("md-outlined-button")],Bt);/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const dr=Symbol.for(""),Ma=t=>{if((t==null?void 0:t.r)===dr)return t==null?void 0:t._$litStatic$},re=(t,...e)=>({_$litStatic$:e.reduce((i,r,a)=>i+(s=>{if(s._$litStatic$!==void 0)return s._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${s}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)})(r)+t[a+1],t[0]),r:dr}),Ni=new Map,Fa=t=>(e,...i)=>{const r=i.length;let a,s;const n=[],p=[];let h,f=0,v=!1;for(;f<r;){for(h=e[f];f<r&&(s=i[f],(a=Ma(s))!==void 0);)h+=a+e[++f],v=!0;f!==r&&p.push(s),n.push(h),f++}if(f===r&&n.push(e[r]),v){const u=n.join("$$lit$$");(e=Ni.get(u))===void 0&&(n.raw=n,Ni.set(u,e=n)),i=p}return t(e,...i)},xi=Fa(o);/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function Bi(t,e=!0){return e&&getComputedStyle(t).getPropertyValue("direction").trim()==="rtl"}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Na=he(gi(k));class N extends Na{get name(){return this.getAttribute("name")??""}set name(e){this.setAttribute("name",e)}get form(){return this[U].form}get labels(){return this[U].labels}constructor(){super(),this.disabled=!1,this.softDisabled=!1,this.flipIconInRtl=!1,this.href="",this.download="",this.target="",this.ariaLabelSelected="",this.toggle=!1,this.selected=!1,this.type="submit",this.value="",this.flipIcon=Bi(this,this.flipIconInRtl),this.addEventListener("click",this.handleClick.bind(this))}willUpdate(){this.href&&(this.disabled=!1,this.softDisabled=!1)}render(){const e=this.href?re`div`:re`button`,{ariaLabel:i,ariaHasPopup:r,ariaExpanded:a}=this,s=i&&this.ariaLabelSelected,n=this.toggle?this.selected:l;let p=l;return this.href||(p=s&&this.selected?this.ariaLabelSelected:i),xi`<${e}
        class="icon-button ${W(this.getRenderClasses())}"
        id="button"
        aria-label="${p||l}"
        aria-haspopup="${!this.href&&r||l}"
        aria-expanded="${!this.href&&a||l}"
        aria-pressed="${n}"
        aria-disabled=${!this.href&&this.softDisabled||l}
        ?disabled="${!this.href&&this.disabled}"
        @click="${this.handleClickOnChild}">
        ${this.renderFocusRing()}
        ${this.renderRipple()}
        ${this.selected?l:this.renderIcon()}
        ${this.selected?this.renderSelectedIcon():l}
        ${this.href?this.renderLink():this.renderTouchTarget()}
  </${e}>`}renderLink(){const{ariaLabel:e}=this;return o`
      <a
        class="link"
        id="link"
        href="${this.href}"
        download="${this.download||l}"
        target="${this.target||l}"
        aria-label="${e||l}">
        ${this.renderTouchTarget()}
      </a>
    `}getRenderClasses(){return{"flip-icon":this.flipIcon,selected:this.toggle&&this.selected}}renderIcon(){return o`<span class="icon"><slot></slot></span>`}renderSelectedIcon(){return o`<span class="icon icon--selected"
      ><slot name="selected"><slot></slot></slot
    ></span>`}renderTouchTarget(){return o`<span class="touch"></span>`}renderFocusRing(){return o`<md-focus-ring
      part="focus-ring"
      for=${this.href?"link":"button"}></md-focus-ring>`}renderRipple(){const e=!this.href&&(this.disabled||this.softDisabled);return o`<md-ripple
      for=${this.href?"link":l}
      ?disabled="${e}"></md-ripple>`}connectedCallback(){this.flipIcon=Bi(this,this.flipIconInRtl),super.connectedCallback()}handleClick(e){if(!this.href&&this.softDisabled){e.stopImmediatePropagation(),e.preventDefault();return}}async handleClickOnChild(e){await 0,!(!this.toggle||this.disabled||this.softDisabled||e.defaultPrevented)&&(this.selected=!this.selected,this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0})))}}lr(N);N.formAssociated=!0;N.shadowRootOptions={mode:"open",delegatesFocus:!0};d([m({type:Boolean,reflect:!0})],N.prototype,"disabled",void 0);d([m({type:Boolean,attribute:"soft-disabled",reflect:!0})],N.prototype,"softDisabled",void 0);d([m({type:Boolean,attribute:"flip-icon-in-rtl"})],N.prototype,"flipIconInRtl",void 0);d([m()],N.prototype,"href",void 0);d([m()],N.prototype,"download",void 0);d([m()],N.prototype,"target",void 0);d([m({attribute:"aria-label-selected"})],N.prototype,"ariaLabelSelected",void 0);d([m({type:Boolean})],N.prototype,"toggle",void 0);d([m({type:Boolean,reflect:!0})],N.prototype,"selected",void 0);d([m()],N.prototype,"type",void 0);d([m({reflect:!0})],N.prototype,"value",void 0);d([c()],N.prototype,"flipIcon",void 0);/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Ba=y`:host{display:inline-flex;outline:none;-webkit-tap-highlight-color:rgba(0,0,0,0);height:var(--_container-height);width:var(--_container-width);justify-content:center}:host([touch-target=wrapper]){margin:max(0px,(48px - var(--_container-height))/2) max(0px,(48px - var(--_container-width))/2)}md-focus-ring{--md-focus-ring-shape-start-start: var(--_container-shape-start-start);--md-focus-ring-shape-start-end: var(--_container-shape-start-end);--md-focus-ring-shape-end-end: var(--_container-shape-end-end);--md-focus-ring-shape-end-start: var(--_container-shape-end-start)}:host(:is([disabled],[soft-disabled])){pointer-events:none}.icon-button{place-items:center;background:none;border:none;box-sizing:border-box;cursor:pointer;display:flex;place-content:center;outline:none;padding:0;position:relative;text-decoration:none;user-select:none;z-index:0;flex:1;border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end)}.icon ::slotted(*){font-size:var(--_icon-size);height:var(--_icon-size);width:var(--_icon-size);font-weight:inherit}md-ripple{z-index:-1;border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end)}.flip-icon .icon{transform:scaleX(-1)}.icon{display:inline-flex}.link{display:grid;height:100%;outline:none;place-items:center;position:absolute;width:100%}.touch{position:absolute;height:max(48px,100%);width:max(48px,100%)}:host([touch-target=none]) .touch{display:none}@media(forced-colors: active){:host(:is([disabled],[soft-disabled])){--_disabled-icon-color: GrayText;--_disabled-icon-opacity: 1}}
`;/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Ua=y`:host{--_disabled-icon-color: var(--md-icon-button-disabled-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-icon-opacity: var(--md-icon-button-disabled-icon-opacity, 0.38);--_icon-size: var(--md-icon-button-icon-size, 24px);--_selected-focus-icon-color: var(--md-icon-button-selected-focus-icon-color, var(--md-sys-color-primary, #6750a4));--_selected-hover-icon-color: var(--md-icon-button-selected-hover-icon-color, var(--md-sys-color-primary, #6750a4));--_selected-hover-state-layer-color: var(--md-icon-button-selected-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_selected-hover-state-layer-opacity: var(--md-icon-button-selected-hover-state-layer-opacity, 0.08);--_selected-icon-color: var(--md-icon-button-selected-icon-color, var(--md-sys-color-primary, #6750a4));--_selected-pressed-icon-color: var(--md-icon-button-selected-pressed-icon-color, var(--md-sys-color-primary, #6750a4));--_selected-pressed-state-layer-color: var(--md-icon-button-selected-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_selected-pressed-state-layer-opacity: var(--md-icon-button-selected-pressed-state-layer-opacity, 0.12);--_state-layer-height: var(--md-icon-button-state-layer-height, 40px);--_state-layer-shape: var(--md-icon-button-state-layer-shape, var(--md-sys-shape-corner-full, 9999px));--_state-layer-width: var(--md-icon-button-state-layer-width, 40px);--_focus-icon-color: var(--md-icon-button-focus-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-icon-color: var(--md-icon-button-hover-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-color: var(--md-icon-button-hover-state-layer-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-opacity: var(--md-icon-button-hover-state-layer-opacity, 0.08);--_icon-color: var(--md-icon-button-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-icon-color: var(--md-icon-button-pressed-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-state-layer-color: var(--md-icon-button-pressed-state-layer-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-state-layer-opacity: var(--md-icon-button-pressed-state-layer-opacity, 0.12);--_container-shape-start-start: 0;--_container-shape-start-end: 0;--_container-shape-end-end: 0;--_container-shape-end-start: 0;--_container-height: 0;--_container-width: 0;height:var(--_state-layer-height);width:var(--_state-layer-width)}:host([touch-target=wrapper]){margin:max(0px,(48px - var(--_state-layer-height))/2) max(0px,(48px - var(--_state-layer-width))/2)}md-focus-ring{--md-focus-ring-shape-start-start: var(--_state-layer-shape);--md-focus-ring-shape-start-end: var(--_state-layer-shape);--md-focus-ring-shape-end-end: var(--_state-layer-shape);--md-focus-ring-shape-end-start: var(--_state-layer-shape)}.standard{background-color:rgba(0,0,0,0);color:var(--_icon-color);--md-ripple-hover-color: var(--_hover-state-layer-color);--md-ripple-hover-opacity: var(--_hover-state-layer-opacity);--md-ripple-pressed-color: var(--_pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_pressed-state-layer-opacity)}.standard:hover{color:var(--_hover-icon-color)}.standard:focus{color:var(--_focus-icon-color)}.standard:active{color:var(--_pressed-icon-color)}.standard:is(:disabled,[aria-disabled=true]){color:var(--_disabled-icon-color)}md-ripple{border-radius:var(--_state-layer-shape)}.standard:is(:disabled,[aria-disabled=true]){opacity:var(--_disabled-icon-opacity)}.selected:not(:disabled,[aria-disabled=true]){color:var(--_selected-icon-color)}.selected:not(:disabled,[aria-disabled=true]):hover{color:var(--_selected-hover-icon-color)}.selected:not(:disabled,[aria-disabled=true]):focus{color:var(--_selected-focus-icon-color)}.selected:not(:disabled,[aria-disabled=true]):active{color:var(--_selected-pressed-icon-color)}.selected{--md-ripple-hover-color: var(--_selected-hover-state-layer-color);--md-ripple-hover-opacity: var(--_selected-hover-state-layer-opacity);--md-ripple-pressed-color: var(--_selected-pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_selected-pressed-state-layer-opacity)}
`;/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let Ut=class extends N{getRenderClasses(){return{...super.getRenderClasses(),standard:!0}}};Ut.styles=[Ba,Ua];Ut=d([C("md-icon-button")],Ut);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class E extends k{constructor(){super(...arguments),this.disabled=!1,this.error=!1,this.focused=!1,this.label="",this.noAsterisk=!1,this.populated=!1,this.required=!1,this.resizable=!1,this.supportingText="",this.errorText="",this.count=-1,this.max=-1,this.hasStart=!1,this.hasEnd=!1,this.isAnimating=!1,this.refreshErrorAlert=!1,this.disableTransitions=!1}get counterText(){const e=this.count??-1,i=this.max??-1;return e<0||i<=0?"":`${e} / ${i}`}get supportingOrErrorText(){return this.error&&this.errorText?this.errorText:this.supportingText}reannounceError(){this.refreshErrorAlert=!0}update(e){e.has("disabled")&&e.get("disabled")!==void 0&&(this.disableTransitions=!0),this.disabled&&this.focused&&(e.set("focused",!0),this.focused=!1),this.animateLabelIfNeeded({wasFocused:e.get("focused"),wasPopulated:e.get("populated")}),super.update(e)}render(){var s,n,p,h;const e=this.renderLabel(!0),i=this.renderLabel(!1),r=(s=this.renderOutline)==null?void 0:s.call(this,e),a={disabled:this.disabled,"disable-transitions":this.disableTransitions,error:this.error&&!this.disabled,focused:this.focused,"with-start":this.hasStart,"with-end":this.hasEnd,populated:this.populated,resizable:this.resizable,required:this.required,"no-label":!this.label};return o`
      <div class="field ${W(a)}">
        <div class="container-overflow">
          ${(n=this.renderBackground)==null?void 0:n.call(this)}
          <slot name="container"></slot>
          ${(p=this.renderStateLayer)==null?void 0:p.call(this)} ${(h=this.renderIndicator)==null?void 0:h.call(this)} ${r}
          <div class="container">
            <div class="start">
              <slot name="start"></slot>
            </div>
            <div class="middle">
              <div class="label-wrapper">
                ${i} ${r?l:e}
              </div>
              <div class="content">
                <slot></slot>
              </div>
            </div>
            <div class="end">
              <slot name="end"></slot>
            </div>
          </div>
        </div>
        ${this.renderSupportingText()}
      </div>
    `}updated(e){(e.has("supportingText")||e.has("errorText")||e.has("count")||e.has("max"))&&this.updateSlottedAriaDescribedBy(),this.refreshErrorAlert&&requestAnimationFrame(()=>{this.refreshErrorAlert=!1}),this.disableTransitions&&requestAnimationFrame(()=>{this.disableTransitions=!1})}renderSupportingText(){const{supportingOrErrorText:e,counterText:i}=this;if(!e&&!i)return l;const r=o`<span>${e}</span>`,a=i?o`<span class="counter">${i}</span>`:l,n=this.error&&this.errorText&&!this.refreshErrorAlert?"alert":l;return o`
      <div class="supporting-text" role=${n}>${r}${a}</div>
      <slot
        name="aria-describedby"
        @slotchange=${this.updateSlottedAriaDescribedBy}></slot>
    `}updateSlottedAriaDescribedBy(){for(const e of this.slottedAriaDescribedBy)rr(o`${this.supportingOrErrorText} ${this.counterText}`,e),e.setAttribute("hidden","")}renderLabel(e){if(!this.label)return l;let i;e?i=this.focused||this.populated||this.isAnimating:i=!this.focused&&!this.populated&&!this.isAnimating;const r={hidden:!i,floating:e,resting:!e},a=`${this.label}${this.required&&!this.noAsterisk?"*":""}`;return o`
      <span class="label ${W(r)}" aria-hidden=${!i}
        >${a}</span
      >
    `}animateLabelIfNeeded({wasFocused:e,wasPopulated:i}){var s,n,p;if(!this.label)return;e??(e=this.focused),i??(i=this.populated);const r=e||i,a=this.focused||this.populated;r!==a&&(this.isAnimating=!0,(s=this.labelAnimation)==null||s.cancel(),this.labelAnimation=(n=this.floatingLabelEl)==null?void 0:n.animate(this.getLabelKeyframes(),{duration:150,easing:we.STANDARD}),(p=this.labelAnimation)==null||p.addEventListener("finish",()=>{this.isAnimating=!1}))}getLabelKeyframes(){const{floatingLabelEl:e,restingLabelEl:i}=this;if(!e||!i)return[];const{x:r,y:a,height:s}=e.getBoundingClientRect(),{x:n,y:p,height:h}=i.getBoundingClientRect(),f=e.scrollWidth,v=i.scrollWidth,u=v/f,g=n-r,z=p-a+Math.round((h-s*u)/2),G=`translateX(${g}px) translateY(${z}px) scale(${u})`,fe="translateX(0) translateY(0) scale(1)",ve=i.clientWidth,Ce=v>ve?`${ve/u}px`:"";return this.focused||this.populated?[{transform:G,width:Ce},{transform:fe,width:Ce}]:[{transform:fe,width:Ce},{transform:G,width:Ce}]}getSurfacePositionClientRect(){return this.containerEl.getBoundingClientRect()}}d([m({type:Boolean})],E.prototype,"disabled",void 0);d([m({type:Boolean})],E.prototype,"error",void 0);d([m({type:Boolean})],E.prototype,"focused",void 0);d([m()],E.prototype,"label",void 0);d([m({type:Boolean,attribute:"no-asterisk"})],E.prototype,"noAsterisk",void 0);d([m({type:Boolean})],E.prototype,"populated",void 0);d([m({type:Boolean})],E.prototype,"required",void 0);d([m({type:Boolean})],E.prototype,"resizable",void 0);d([m({attribute:"supporting-text"})],E.prototype,"supportingText",void 0);d([m({attribute:"error-text"})],E.prototype,"errorText",void 0);d([m({type:Number})],E.prototype,"count",void 0);d([m({type:Number})],E.prototype,"max",void 0);d([m({type:Boolean,attribute:"has-start"})],E.prototype,"hasStart",void 0);d([m({type:Boolean,attribute:"has-end"})],E.prototype,"hasEnd",void 0);d([pe({slot:"aria-describedby"})],E.prototype,"slottedAriaDescribedBy",void 0);d([c()],E.prototype,"isAnimating",void 0);d([c()],E.prototype,"refreshErrorAlert",void 0);d([c()],E.prototype,"disableTransitions",void 0);d([S(".label.floating")],E.prototype,"floatingLabelEl",void 0);d([S(".label.resting")],E.prototype,"restingLabelEl",void 0);d([S(".container")],E.prototype,"containerEl",void 0);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class ja extends E{renderBackground(){return o` <div class="background"></div> `}renderStateLayer(){return o` <div class="state-layer"></div> `}renderIndicator(){return o`<div class="active-indicator"></div>`}}/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Ha=y`@layer styles{:host{--_active-indicator-color: var(--md-filled-field-active-indicator-color, var(--md-sys-color-on-surface-variant, #49454f));--_active-indicator-height: var(--md-filled-field-active-indicator-height, 1px);--_bottom-space: var(--md-filled-field-bottom-space, 16px);--_container-color: var(--md-filled-field-container-color, var(--md-sys-color-surface-container-highest, #e6e0e9));--_content-color: var(--md-filled-field-content-color, var(--md-sys-color-on-surface, #1d1b20));--_content-font: var(--md-filled-field-content-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_content-line-height: var(--md-filled-field-content-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_content-size: var(--md-filled-field-content-size, var(--md-sys-typescale-body-large-size, 1rem));--_content-space: var(--md-filled-field-content-space, 16px);--_content-weight: var(--md-filled-field-content-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_disabled-active-indicator-color: var(--md-filled-field-disabled-active-indicator-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-active-indicator-height: var(--md-filled-field-disabled-active-indicator-height, 1px);--_disabled-active-indicator-opacity: var(--md-filled-field-disabled-active-indicator-opacity, 0.38);--_disabled-container-color: var(--md-filled-field-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-container-opacity: var(--md-filled-field-disabled-container-opacity, 0.04);--_disabled-content-color: var(--md-filled-field-disabled-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-content-opacity: var(--md-filled-field-disabled-content-opacity, 0.38);--_disabled-label-text-color: var(--md-filled-field-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-filled-field-disabled-label-text-opacity, 0.38);--_disabled-leading-content-color: var(--md-filled-field-disabled-leading-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-leading-content-opacity: var(--md-filled-field-disabled-leading-content-opacity, 0.38);--_disabled-supporting-text-color: var(--md-filled-field-disabled-supporting-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-supporting-text-opacity: var(--md-filled-field-disabled-supporting-text-opacity, 0.38);--_disabled-trailing-content-color: var(--md-filled-field-disabled-trailing-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-trailing-content-opacity: var(--md-filled-field-disabled-trailing-content-opacity, 0.38);--_error-active-indicator-color: var(--md-filled-field-error-active-indicator-color, var(--md-sys-color-error, #b3261e));--_error-content-color: var(--md-filled-field-error-content-color, var(--md-sys-color-on-surface, #1d1b20));--_error-focus-active-indicator-color: var(--md-filled-field-error-focus-active-indicator-color, var(--md-sys-color-error, #b3261e));--_error-focus-content-color: var(--md-filled-field-error-focus-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-focus-label-text-color: var(--md-filled-field-error-focus-label-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-leading-content-color: var(--md-filled-field-error-focus-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-focus-supporting-text-color: var(--md-filled-field-error-focus-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-trailing-content-color: var(--md-filled-field-error-focus-trailing-content-color, var(--md-sys-color-error, #b3261e));--_error-hover-active-indicator-color: var(--md-filled-field-error-hover-active-indicator-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-content-color: var(--md-filled-field-error-hover-content-color, var(--md-sys-color-on-surface, #1d1b20));--_error-hover-label-text-color: var(--md-filled-field-error-hover-label-text-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-leading-content-color: var(--md-filled-field-error-hover-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-hover-state-layer-color: var(--md-filled-field-error-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_error-hover-state-layer-opacity: var(--md-filled-field-error-hover-state-layer-opacity, 0.08);--_error-hover-supporting-text-color: var(--md-filled-field-error-hover-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-hover-trailing-content-color: var(--md-filled-field-error-hover-trailing-content-color, var(--md-sys-color-on-error-container, #410e0b));--_error-label-text-color: var(--md-filled-field-error-label-text-color, var(--md-sys-color-error, #b3261e));--_error-leading-content-color: var(--md-filled-field-error-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-supporting-text-color: var(--md-filled-field-error-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-trailing-content-color: var(--md-filled-field-error-trailing-content-color, var(--md-sys-color-error, #b3261e));--_focus-active-indicator-color: var(--md-filled-field-focus-active-indicator-color, var(--md-sys-color-primary, #6750a4));--_focus-active-indicator-height: var(--md-filled-field-focus-active-indicator-height, 3px);--_focus-content-color: var(--md-filled-field-focus-content-color, var(--md-sys-color-on-surface, #1d1b20));--_focus-label-text-color: var(--md-filled-field-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_focus-leading-content-color: var(--md-filled-field-focus-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-supporting-text-color: var(--md-filled-field-focus-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-trailing-content-color: var(--md-filled-field-focus-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-active-indicator-color: var(--md-filled-field-hover-active-indicator-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-active-indicator-height: var(--md-filled-field-hover-active-indicator-height, 1px);--_hover-content-color: var(--md-filled-field-hover-content-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-label-text-color: var(--md-filled-field-hover-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-leading-content-color: var(--md-filled-field-hover-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-color: var(--md-filled-field-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-state-layer-opacity: var(--md-filled-field-hover-state-layer-opacity, 0.08);--_hover-supporting-text-color: var(--md-filled-field-hover-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-trailing-content-color: var(--md-filled-field-hover-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-color: var(--md-filled-field-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-font: var(--md-filled-field-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-filled-field-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_label-text-populated-line-height: var(--md-filled-field-label-text-populated-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_label-text-populated-size: var(--md-filled-field-label-text-populated-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_label-text-size: var(--md-filled-field-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_label-text-weight: var(--md-filled-field-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_leading-content-color: var(--md-filled-field-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_leading-space: var(--md-filled-field-leading-space, 16px);--_supporting-text-color: var(--md-filled-field-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_supporting-text-font: var(--md-filled-field-supporting-text-font, var(--md-sys-typescale-body-small-font, var(--md-ref-typeface-plain, Roboto)));--_supporting-text-leading-space: var(--md-filled-field-supporting-text-leading-space, 16px);--_supporting-text-line-height: var(--md-filled-field-supporting-text-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_supporting-text-size: var(--md-filled-field-supporting-text-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_supporting-text-top-space: var(--md-filled-field-supporting-text-top-space, 4px);--_supporting-text-trailing-space: var(--md-filled-field-supporting-text-trailing-space, 16px);--_supporting-text-weight: var(--md-filled-field-supporting-text-weight, var(--md-sys-typescale-body-small-weight, var(--md-ref-typeface-weight-regular, 400)));--_top-space: var(--md-filled-field-top-space, 16px);--_trailing-content-color: var(--md-filled-field-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_trailing-space: var(--md-filled-field-trailing-space, 16px);--_with-label-bottom-space: var(--md-filled-field-with-label-bottom-space, 8px);--_with-label-top-space: var(--md-filled-field-with-label-top-space, 8px);--_with-leading-content-leading-space: var(--md-filled-field-with-leading-content-leading-space, 12px);--_with-trailing-content-trailing-space: var(--md-filled-field-with-trailing-content-trailing-space, 12px);--_container-shape-start-start: var(--md-filled-field-container-shape-start-start, var(--md-filled-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-start-end: var(--md-filled-field-container-shape-start-end, var(--md-filled-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-end-end: var(--md-filled-field-container-shape-end-end, var(--md-filled-field-container-shape, var(--md-sys-shape-corner-none, 0px)));--_container-shape-end-start: var(--md-filled-field-container-shape-end-start, var(--md-filled-field-container-shape, var(--md-sys-shape-corner-none, 0px)))}.background,.state-layer{border-radius:inherit;inset:0;pointer-events:none;position:absolute}.background{background:var(--_container-color)}.state-layer{visibility:hidden}.field:not(.disabled):hover .state-layer{visibility:visible}.label.floating{position:absolute;top:var(--_with-label-top-space)}.field:not(.with-start) .label-wrapper{margin-inline-start:var(--_leading-space)}.field:not(.with-end) .label-wrapper{margin-inline-end:var(--_trailing-space)}.active-indicator{inset:auto 0 0 0;pointer-events:none;position:absolute;width:100%;z-index:1}.active-indicator::before,.active-indicator::after{border-bottom:var(--_active-indicator-height) solid var(--_active-indicator-color);inset:auto 0 0 0;content:"";position:absolute;width:100%}.active-indicator::after{opacity:0;transition:opacity 150ms cubic-bezier(0.2, 0, 0, 1)}.focused .active-indicator::after{opacity:1}.field:not(.with-start) .content ::slotted(*){padding-inline-start:var(--_leading-space)}.field:not(.with-end) .content ::slotted(*){padding-inline-end:var(--_trailing-space)}.field:not(.no-label) .content ::slotted(:not(textarea)){padding-bottom:var(--_with-label-bottom-space);padding-top:calc(var(--_with-label-top-space) + var(--_label-text-populated-line-height))}.field:not(.no-label) .content ::slotted(textarea){margin-bottom:var(--_with-label-bottom-space);margin-top:calc(var(--_with-label-top-space) + var(--_label-text-populated-line-height))}:hover .active-indicator::before{border-bottom-color:var(--_hover-active-indicator-color);border-bottom-width:var(--_hover-active-indicator-height)}.active-indicator::after{border-bottom-color:var(--_focus-active-indicator-color);border-bottom-width:var(--_focus-active-indicator-height)}:hover .state-layer{background:var(--_hover-state-layer-color);opacity:var(--_hover-state-layer-opacity)}.disabled .active-indicator::before{border-bottom-color:var(--_disabled-active-indicator-color);border-bottom-width:var(--_disabled-active-indicator-height);opacity:var(--_disabled-active-indicator-opacity)}.disabled .background{background:var(--_disabled-container-color);opacity:var(--_disabled-container-opacity)}.error .active-indicator::before{border-bottom-color:var(--_error-active-indicator-color)}.error:hover .active-indicator::before{border-bottom-color:var(--_error-hover-active-indicator-color)}.error:hover .state-layer{background:var(--_error-hover-state-layer-color);opacity:var(--_error-hover-state-layer-opacity)}.error .active-indicator::after{border-bottom-color:var(--_error-focus-active-indicator-color)}.resizable .container{bottom:var(--_focus-active-indicator-height);clip-path:inset(var(--_focus-active-indicator-height) 0 0 0)}.resizable .container>*{top:var(--_focus-active-indicator-height)}}@layer hcm{@media(forced-colors: active){.disabled .active-indicator::before{border-color:GrayText;opacity:1}}}
`;/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const cr=y`:host{display:inline-flex;resize:both}.field{display:flex;flex:1;flex-direction:column;writing-mode:horizontal-tb;max-width:100%}.container-overflow{border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-end-radius:var(--_container-shape-end-end);border-end-start-radius:var(--_container-shape-end-start);display:flex;height:100%;position:relative}.container{align-items:center;border-radius:inherit;display:flex;flex:1;max-height:100%;min-height:100%;min-width:min-content;position:relative}.field,.container-overflow{resize:inherit}.resizable:not(.disabled) .container{resize:inherit;overflow:hidden}.disabled{pointer-events:none}slot[name=container]{border-radius:inherit}slot[name=container]::slotted(*){border-radius:inherit;inset:0;pointer-events:none;position:absolute}@layer styles{.start,.middle,.end{display:flex;box-sizing:border-box;height:100%;position:relative}.start{color:var(--_leading-content-color)}.end{color:var(--_trailing-content-color)}.start,.end{align-items:center;justify-content:center}.with-start .start{margin-inline:var(--_with-leading-content-leading-space) var(--_content-space)}.with-end .end{margin-inline:var(--_content-space) var(--_with-trailing-content-trailing-space)}.middle{align-items:stretch;align-self:baseline;flex:1}.content{color:var(--_content-color);display:flex;flex:1;opacity:0;transition:opacity 83ms cubic-bezier(0.2, 0, 0, 1)}.no-label .content,.focused .content,.populated .content{opacity:1;transition-delay:67ms}:is(.disabled,.disable-transitions) .content{transition:none}.content ::slotted(*){all:unset;color:currentColor;font-family:var(--_content-font);font-size:var(--_content-size);line-height:var(--_content-line-height);font-weight:var(--_content-weight);width:100%;overflow-wrap:revert;white-space:revert}.content ::slotted(:not(textarea)){padding-top:var(--_top-space);padding-bottom:var(--_bottom-space)}.content ::slotted(textarea){margin-top:var(--_top-space);margin-bottom:var(--_bottom-space)}:hover .content{color:var(--_hover-content-color)}:hover .start{color:var(--_hover-leading-content-color)}:hover .end{color:var(--_hover-trailing-content-color)}.focused .content{color:var(--_focus-content-color)}.focused .start{color:var(--_focus-leading-content-color)}.focused .end{color:var(--_focus-trailing-content-color)}.disabled .content{color:var(--_disabled-content-color)}.disabled.no-label .content,.disabled.focused .content,.disabled.populated .content{opacity:var(--_disabled-content-opacity)}.disabled .start{color:var(--_disabled-leading-content-color);opacity:var(--_disabled-leading-content-opacity)}.disabled .end{color:var(--_disabled-trailing-content-color);opacity:var(--_disabled-trailing-content-opacity)}.error .content{color:var(--_error-content-color)}.error .start{color:var(--_error-leading-content-color)}.error .end{color:var(--_error-trailing-content-color)}.error:hover .content{color:var(--_error-hover-content-color)}.error:hover .start{color:var(--_error-hover-leading-content-color)}.error:hover .end{color:var(--_error-hover-trailing-content-color)}.error.focused .content{color:var(--_error-focus-content-color)}.error.focused .start{color:var(--_error-focus-leading-content-color)}.error.focused .end{color:var(--_error-focus-trailing-content-color)}}@layer hcm{@media(forced-colors: active){.disabled :is(.start,.content,.end){color:GrayText;opacity:1}}}@layer styles{.label{box-sizing:border-box;color:var(--_label-text-color);overflow:hidden;max-width:100%;text-overflow:ellipsis;white-space:nowrap;z-index:1;font-family:var(--_label-text-font);font-size:var(--_label-text-size);line-height:var(--_label-text-line-height);font-weight:var(--_label-text-weight);width:min-content}.label-wrapper{inset:0;pointer-events:none;position:absolute}.label.resting{position:absolute;top:var(--_top-space)}.label.floating{font-size:var(--_label-text-populated-size);line-height:var(--_label-text-populated-line-height);transform-origin:top left}.label.hidden{opacity:0}.no-label .label{display:none}.label-wrapper{inset:0;position:absolute;text-align:initial}:hover .label{color:var(--_hover-label-text-color)}.focused .label{color:var(--_focus-label-text-color)}.disabled .label{color:var(--_disabled-label-text-color)}.disabled .label:not(.hidden){opacity:var(--_disabled-label-text-opacity)}.error .label{color:var(--_error-label-text-color)}.error:hover .label{color:var(--_error-hover-label-text-color)}.error.focused .label{color:var(--_error-focus-label-text-color)}}@layer hcm{@media(forced-colors: active){.disabled .label:not(.hidden){color:GrayText;opacity:1}}}@layer styles{.supporting-text{color:var(--_supporting-text-color);display:flex;font-family:var(--_supporting-text-font);font-size:var(--_supporting-text-size);line-height:var(--_supporting-text-line-height);font-weight:var(--_supporting-text-weight);gap:16px;justify-content:space-between;padding-inline-start:var(--_supporting-text-leading-space);padding-inline-end:var(--_supporting-text-trailing-space);padding-top:var(--_supporting-text-top-space)}.supporting-text :nth-child(2){flex-shrink:0}:hover .supporting-text{color:var(--_hover-supporting-text-color)}.focus .supporting-text{color:var(--_focus-supporting-text-color)}.disabled .supporting-text{color:var(--_disabled-supporting-text-color);opacity:var(--_disabled-supporting-text-opacity)}.error .supporting-text{color:var(--_error-supporting-text-color)}.error:hover .supporting-text{color:var(--_error-hover-supporting-text-color)}.error.focus .supporting-text{color:var(--_error-focus-supporting-text-color)}}@layer hcm{@media(forced-colors: active){.disabled .supporting-text{color:GrayText;opacity:1}}}
`;/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let jt=class extends ja{};jt.styles=[cr,Ha];jt=d([C("md-filled-field")],jt);/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const qa=y`:host{--_active-indicator-color: var(--md-filled-text-field-active-indicator-color, var(--md-sys-color-on-surface-variant, #49454f));--_active-indicator-height: var(--md-filled-text-field-active-indicator-height, 1px);--_caret-color: var(--md-filled-text-field-caret-color, var(--md-sys-color-primary, #6750a4));--_container-color: var(--md-filled-text-field-container-color, var(--md-sys-color-surface-container-highest, #e6e0e9));--_disabled-active-indicator-color: var(--md-filled-text-field-disabled-active-indicator-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-active-indicator-height: var(--md-filled-text-field-disabled-active-indicator-height, 1px);--_disabled-active-indicator-opacity: var(--md-filled-text-field-disabled-active-indicator-opacity, 0.38);--_disabled-container-color: var(--md-filled-text-field-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-container-opacity: var(--md-filled-text-field-disabled-container-opacity, 0.04);--_disabled-input-text-color: var(--md-filled-text-field-disabled-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-input-text-opacity: var(--md-filled-text-field-disabled-input-text-opacity, 0.38);--_disabled-label-text-color: var(--md-filled-text-field-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-filled-text-field-disabled-label-text-opacity, 0.38);--_disabled-leading-icon-color: var(--md-filled-text-field-disabled-leading-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-leading-icon-opacity: var(--md-filled-text-field-disabled-leading-icon-opacity, 0.38);--_disabled-supporting-text-color: var(--md-filled-text-field-disabled-supporting-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-supporting-text-opacity: var(--md-filled-text-field-disabled-supporting-text-opacity, 0.38);--_disabled-trailing-icon-color: var(--md-filled-text-field-disabled-trailing-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-trailing-icon-opacity: var(--md-filled-text-field-disabled-trailing-icon-opacity, 0.38);--_error-active-indicator-color: var(--md-filled-text-field-error-active-indicator-color, var(--md-sys-color-error, #b3261e));--_error-focus-active-indicator-color: var(--md-filled-text-field-error-focus-active-indicator-color, var(--md-sys-color-error, #b3261e));--_error-focus-caret-color: var(--md-filled-text-field-error-focus-caret-color, var(--md-sys-color-error, #b3261e));--_error-focus-input-text-color: var(--md-filled-text-field-error-focus-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_error-focus-label-text-color: var(--md-filled-text-field-error-focus-label-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-leading-icon-color: var(--md-filled-text-field-error-focus-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-focus-supporting-text-color: var(--md-filled-text-field-error-focus-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-trailing-icon-color: var(--md-filled-text-field-error-focus-trailing-icon-color, var(--md-sys-color-error, #b3261e));--_error-hover-active-indicator-color: var(--md-filled-text-field-error-hover-active-indicator-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-input-text-color: var(--md-filled-text-field-error-hover-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_error-hover-label-text-color: var(--md-filled-text-field-error-hover-label-text-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-leading-icon-color: var(--md-filled-text-field-error-hover-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-hover-state-layer-color: var(--md-filled-text-field-error-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_error-hover-state-layer-opacity: var(--md-filled-text-field-error-hover-state-layer-opacity, 0.08);--_error-hover-supporting-text-color: var(--md-filled-text-field-error-hover-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-hover-trailing-icon-color: var(--md-filled-text-field-error-hover-trailing-icon-color, var(--md-sys-color-on-error-container, #410e0b));--_error-input-text-color: var(--md-filled-text-field-error-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_error-label-text-color: var(--md-filled-text-field-error-label-text-color, var(--md-sys-color-error, #b3261e));--_error-leading-icon-color: var(--md-filled-text-field-error-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-supporting-text-color: var(--md-filled-text-field-error-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-trailing-icon-color: var(--md-filled-text-field-error-trailing-icon-color, var(--md-sys-color-error, #b3261e));--_focus-active-indicator-color: var(--md-filled-text-field-focus-active-indicator-color, var(--md-sys-color-primary, #6750a4));--_focus-active-indicator-height: var(--md-filled-text-field-focus-active-indicator-height, 3px);--_focus-input-text-color: var(--md-filled-text-field-focus-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_focus-label-text-color: var(--md-filled-text-field-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_focus-leading-icon-color: var(--md-filled-text-field-focus-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-supporting-text-color: var(--md-filled-text-field-focus-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-trailing-icon-color: var(--md-filled-text-field-focus-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-active-indicator-color: var(--md-filled-text-field-hover-active-indicator-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-active-indicator-height: var(--md-filled-text-field-hover-active-indicator-height, 1px);--_hover-input-text-color: var(--md-filled-text-field-hover-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-label-text-color: var(--md-filled-text-field-hover-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-leading-icon-color: var(--md-filled-text-field-hover-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-color: var(--md-filled-text-field-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-state-layer-opacity: var(--md-filled-text-field-hover-state-layer-opacity, 0.08);--_hover-supporting-text-color: var(--md-filled-text-field-hover-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-trailing-icon-color: var(--md-filled-text-field-hover-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-color: var(--md-filled-text-field-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_input-text-font: var(--md-filled-text-field-input-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_input-text-line-height: var(--md-filled-text-field-input-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_input-text-placeholder-color: var(--md-filled-text-field-input-text-placeholder-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-prefix-color: var(--md-filled-text-field-input-text-prefix-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-size: var(--md-filled-text-field-input-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_input-text-suffix-color: var(--md-filled-text-field-input-text-suffix-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-weight: var(--md-filled-text-field-input-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_label-text-color: var(--md-filled-text-field-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-font: var(--md-filled-text-field-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-filled-text-field-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_label-text-populated-line-height: var(--md-filled-text-field-label-text-populated-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_label-text-populated-size: var(--md-filled-text-field-label-text-populated-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_label-text-size: var(--md-filled-text-field-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_label-text-weight: var(--md-filled-text-field-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_leading-icon-color: var(--md-filled-text-field-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_leading-icon-size: var(--md-filled-text-field-leading-icon-size, 24px);--_supporting-text-color: var(--md-filled-text-field-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_supporting-text-font: var(--md-filled-text-field-supporting-text-font, var(--md-sys-typescale-body-small-font, var(--md-ref-typeface-plain, Roboto)));--_supporting-text-line-height: var(--md-filled-text-field-supporting-text-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_supporting-text-size: var(--md-filled-text-field-supporting-text-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_supporting-text-weight: var(--md-filled-text-field-supporting-text-weight, var(--md-sys-typescale-body-small-weight, var(--md-ref-typeface-weight-regular, 400)));--_trailing-icon-color: var(--md-filled-text-field-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_trailing-icon-size: var(--md-filled-text-field-trailing-icon-size, 24px);--_container-shape-start-start: var(--md-filled-text-field-container-shape-start-start, var(--md-filled-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-start-end: var(--md-filled-text-field-container-shape-start-end, var(--md-filled-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-end-end: var(--md-filled-text-field-container-shape-end-end, var(--md-filled-text-field-container-shape, var(--md-sys-shape-corner-none, 0px)));--_container-shape-end-start: var(--md-filled-text-field-container-shape-end-start, var(--md-filled-text-field-container-shape, var(--md-sys-shape-corner-none, 0px)));--_icon-input-space: var(--md-filled-text-field-icon-input-space, 16px);--_leading-space: var(--md-filled-text-field-leading-space, 16px);--_trailing-space: var(--md-filled-text-field-trailing-space, 16px);--_top-space: var(--md-filled-text-field-top-space, 16px);--_bottom-space: var(--md-filled-text-field-bottom-space, 16px);--_input-text-prefix-trailing-space: var(--md-filled-text-field-input-text-prefix-trailing-space, 2px);--_input-text-suffix-leading-space: var(--md-filled-text-field-input-text-suffix-leading-space, 2px);--_with-label-top-space: var(--md-filled-text-field-with-label-top-space, 8px);--_with-label-bottom-space: var(--md-filled-text-field-with-label-bottom-space, 8px);--_focus-caret-color: var(--md-filled-text-field-focus-caret-color, var(--md-sys-color-primary, #6750a4));--_with-leading-icon-leading-space: var(--md-filled-text-field-with-leading-icon-leading-space, 12px);--_with-trailing-icon-trailing-space: var(--md-filled-text-field-with-trailing-icon-trailing-space, 12px);--md-filled-field-active-indicator-color: var(--_active-indicator-color);--md-filled-field-active-indicator-height: var(--_active-indicator-height);--md-filled-field-bottom-space: var(--_bottom-space);--md-filled-field-container-color: var(--_container-color);--md-filled-field-container-shape-end-end: var(--_container-shape-end-end);--md-filled-field-container-shape-end-start: var(--_container-shape-end-start);--md-filled-field-container-shape-start-end: var(--_container-shape-start-end);--md-filled-field-container-shape-start-start: var(--_container-shape-start-start);--md-filled-field-content-color: var(--_input-text-color);--md-filled-field-content-font: var(--_input-text-font);--md-filled-field-content-line-height: var(--_input-text-line-height);--md-filled-field-content-size: var(--_input-text-size);--md-filled-field-content-space: var(--_icon-input-space);--md-filled-field-content-weight: var(--_input-text-weight);--md-filled-field-disabled-active-indicator-color: var(--_disabled-active-indicator-color);--md-filled-field-disabled-active-indicator-height: var(--_disabled-active-indicator-height);--md-filled-field-disabled-active-indicator-opacity: var(--_disabled-active-indicator-opacity);--md-filled-field-disabled-container-color: var(--_disabled-container-color);--md-filled-field-disabled-container-opacity: var(--_disabled-container-opacity);--md-filled-field-disabled-content-color: var(--_disabled-input-text-color);--md-filled-field-disabled-content-opacity: var(--_disabled-input-text-opacity);--md-filled-field-disabled-label-text-color: var(--_disabled-label-text-color);--md-filled-field-disabled-label-text-opacity: var(--_disabled-label-text-opacity);--md-filled-field-disabled-leading-content-color: var(--_disabled-leading-icon-color);--md-filled-field-disabled-leading-content-opacity: var(--_disabled-leading-icon-opacity);--md-filled-field-disabled-supporting-text-color: var(--_disabled-supporting-text-color);--md-filled-field-disabled-supporting-text-opacity: var(--_disabled-supporting-text-opacity);--md-filled-field-disabled-trailing-content-color: var(--_disabled-trailing-icon-color);--md-filled-field-disabled-trailing-content-opacity: var(--_disabled-trailing-icon-opacity);--md-filled-field-error-active-indicator-color: var(--_error-active-indicator-color);--md-filled-field-error-content-color: var(--_error-input-text-color);--md-filled-field-error-focus-active-indicator-color: var(--_error-focus-active-indicator-color);--md-filled-field-error-focus-content-color: var(--_error-focus-input-text-color);--md-filled-field-error-focus-label-text-color: var(--_error-focus-label-text-color);--md-filled-field-error-focus-leading-content-color: var(--_error-focus-leading-icon-color);--md-filled-field-error-focus-supporting-text-color: var(--_error-focus-supporting-text-color);--md-filled-field-error-focus-trailing-content-color: var(--_error-focus-trailing-icon-color);--md-filled-field-error-hover-active-indicator-color: var(--_error-hover-active-indicator-color);--md-filled-field-error-hover-content-color: var(--_error-hover-input-text-color);--md-filled-field-error-hover-label-text-color: var(--_error-hover-label-text-color);--md-filled-field-error-hover-leading-content-color: var(--_error-hover-leading-icon-color);--md-filled-field-error-hover-state-layer-color: var(--_error-hover-state-layer-color);--md-filled-field-error-hover-state-layer-opacity: var(--_error-hover-state-layer-opacity);--md-filled-field-error-hover-supporting-text-color: var(--_error-hover-supporting-text-color);--md-filled-field-error-hover-trailing-content-color: var(--_error-hover-trailing-icon-color);--md-filled-field-error-label-text-color: var(--_error-label-text-color);--md-filled-field-error-leading-content-color: var(--_error-leading-icon-color);--md-filled-field-error-supporting-text-color: var(--_error-supporting-text-color);--md-filled-field-error-trailing-content-color: var(--_error-trailing-icon-color);--md-filled-field-focus-active-indicator-color: var(--_focus-active-indicator-color);--md-filled-field-focus-active-indicator-height: var(--_focus-active-indicator-height);--md-filled-field-focus-content-color: var(--_focus-input-text-color);--md-filled-field-focus-label-text-color: var(--_focus-label-text-color);--md-filled-field-focus-leading-content-color: var(--_focus-leading-icon-color);--md-filled-field-focus-supporting-text-color: var(--_focus-supporting-text-color);--md-filled-field-focus-trailing-content-color: var(--_focus-trailing-icon-color);--md-filled-field-hover-active-indicator-color: var(--_hover-active-indicator-color);--md-filled-field-hover-active-indicator-height: var(--_hover-active-indicator-height);--md-filled-field-hover-content-color: var(--_hover-input-text-color);--md-filled-field-hover-label-text-color: var(--_hover-label-text-color);--md-filled-field-hover-leading-content-color: var(--_hover-leading-icon-color);--md-filled-field-hover-state-layer-color: var(--_hover-state-layer-color);--md-filled-field-hover-state-layer-opacity: var(--_hover-state-layer-opacity);--md-filled-field-hover-supporting-text-color: var(--_hover-supporting-text-color);--md-filled-field-hover-trailing-content-color: var(--_hover-trailing-icon-color);--md-filled-field-label-text-color: var(--_label-text-color);--md-filled-field-label-text-font: var(--_label-text-font);--md-filled-field-label-text-line-height: var(--_label-text-line-height);--md-filled-field-label-text-populated-line-height: var(--_label-text-populated-line-height);--md-filled-field-label-text-populated-size: var(--_label-text-populated-size);--md-filled-field-label-text-size: var(--_label-text-size);--md-filled-field-label-text-weight: var(--_label-text-weight);--md-filled-field-leading-content-color: var(--_leading-icon-color);--md-filled-field-leading-space: var(--_leading-space);--md-filled-field-supporting-text-color: var(--_supporting-text-color);--md-filled-field-supporting-text-font: var(--_supporting-text-font);--md-filled-field-supporting-text-line-height: var(--_supporting-text-line-height);--md-filled-field-supporting-text-size: var(--_supporting-text-size);--md-filled-field-supporting-text-weight: var(--_supporting-text-weight);--md-filled-field-top-space: var(--_top-space);--md-filled-field-trailing-content-color: var(--_trailing-icon-color);--md-filled-field-trailing-space: var(--_trailing-space);--md-filled-field-with-label-bottom-space: var(--_with-label-bottom-space);--md-filled-field-with-label-top-space: var(--_with-label-top-space);--md-filled-field-with-leading-content-leading-space: var(--_with-leading-icon-leading-space);--md-filled-field-with-trailing-content-trailing-space: var(--_with-trailing-icon-trailing-space)}
`;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Va=t=>t.strings===void 0,Ga={},Ka=(t,e=Ga)=>t._$AH=e;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ui=vi(class extends bi{constructor(t){if(super(t),t.type!==ne.PROPERTY&&t.type!==ne.ATTRIBUTE&&t.type!==ne.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Va(t))throw Error("`live` bindings can only contain a single expression")}render(t){return t}update(t,[e]){if(e===Y||e===l)return e;const i=t.element,r=t.name;if(t.type===ne.PROPERTY){if(e===i[r])return Y}else if(t.type===ne.BOOLEAN_ATTRIBUTE){if(!!e===i.hasAttribute(r))return Y}else if(t.type===ne.ATTRIBUTE&&i.getAttribute(r)===e+"")return Y;return Ka(t),e}});/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const pr="important",Ya=" !"+pr,ji=vi(class extends bi{constructor(t){var e;if(super(t),t.type!==ne.ATTRIBUTE||t.name!=="style"||((e=t.strings)==null?void 0:e.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,i)=>{const r=t[i];return r==null?e:e+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${r};`},"")}update(t,[e]){const{style:i}=t.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(e)),this.render(e);for(const r of this.ft)e[r]==null&&(this.ft.delete(r),r.includes("-")?i.removeProperty(r):i[r]=null);for(const r in e){const a=e[r];if(a!=null){this.ft.add(r);const s=typeof a=="string"&&a.endsWith(Ya);r.includes("-")||s?i.setProperty(r,s?a.slice(0,-11):a,s?pr:""):i[r]=a}}return Y}});/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Wa={fromAttribute(t){return t??""},toAttribute(t){return t||null}};/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function wi(t,e){e.bubbles&&(!t.shadowRoot||e.composed)&&e.stopPropagation();const i=Reflect.construct(e.constructor,[e.type,e]),r=t.dispatchEvent(i);return r||e.preventDefault(),r}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Ht=Symbol("createValidator"),qt=Symbol("getValidityAnchor"),Ct=Symbol("privateValidator"),te=Symbol("privateSyncValidity"),Xe=Symbol("privateCustomValidationMessage");function Ja(t){var e;class i extends t{constructor(){super(...arguments),this[e]=""}get validity(){return this[te](),this[U].validity}get validationMessage(){return this[te](),this[U].validationMessage}get willValidate(){return this[te](),this[U].willValidate}checkValidity(){return this[te](),this[U].checkValidity()}reportValidity(){return this[te](),this[U].reportValidity()}setCustomValidity(a){this[Xe]=a,this[te]()}requestUpdate(a,s,n){super.requestUpdate(a,s,n),this[te]()}firstUpdated(a){super.firstUpdated(a),this[te]()}[(e=Xe,te)](){this[Ct]||(this[Ct]=this[Ht]());const{validity:a,validationMessage:s}=this[Ct].getValidity(),n=!!this[Xe],p=this[Xe]||s;this[U].setValidity({...a,customError:n},p,this[qt]()??void 0)}[Ht](){throw new Error("Implement [createValidator]")}[qt](){throw new Error("Implement [getValidityAnchor]")}}return i}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const dt=Symbol("getFormValue"),Hi=Symbol("getFormState");function Xa(t){class e extends t{get form(){return this[U].form}get labels(){return this[U].labels}get name(){return this.getAttribute("name")??""}set name(r){this.setAttribute("name",r)}get disabled(){return this.hasAttribute("disabled")}set disabled(r){this.toggleAttribute("disabled",r)}attributeChangedCallback(r,a,s){if(r==="name"||r==="disabled"){const n=r==="disabled"?a!==null:a;this.requestUpdate(r,n);return}super.attributeChangedCallback(r,a,s)}requestUpdate(r,a,s){super.requestUpdate(r,a,s),this[U].setFormValue(this[dt](),this[Hi]())}[dt](){throw new Error("Implement [getFormValue]")}[Hi](){return this[dt]()}formDisabledCallback(r){this.disabled=r}}return e.formAssociated=!0,d([m({noAccessor:!0})],e.prototype,"name",null),d([m({type:Boolean,noAccessor:!0})],e.prototype,"disabled",null),e}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Vt=Symbol("onReportValidity"),Ze=Symbol("privateCleanupFormListeners"),Qe=Symbol("privateDoNotReportInvalid"),et=Symbol("privateIsSelfReportingValidity"),tt=Symbol("privateCallOnReportValidity");function Za(t){var e,i,r;class a extends t{constructor(...n){super(...n),this[e]=new AbortController,this[i]=!1,this[r]=!1,this.addEventListener("invalid",p=>{this[Qe]||!p.isTrusted||this.addEventListener("invalid",()=>{this[tt](p)},{once:!0})},{capture:!0})}checkValidity(){this[Qe]=!0;const n=super.checkValidity();return this[Qe]=!1,n}reportValidity(){this[et]=!0;const n=super.reportValidity();return n&&this[tt](null),this[et]=!1,n}[(e=Ze,i=Qe,r=et,tt)](n){const p=n==null?void 0:n.defaultPrevented;p||(this[Vt](n),!(!p&&(n==null?void 0:n.defaultPrevented)))||(this[et]||to(this[U].form,this))&&this.focus()}[Vt](n){throw new Error("Implement [onReportValidity]")}formAssociatedCallback(n){super.formAssociatedCallback&&super.formAssociatedCallback(n),this[Ze].abort(),n&&(this[Ze]=new AbortController,Qa(this,n,()=>{this[tt](null)},this[Ze].signal))}}return a}function Qa(t,e,i,r){const a=eo(e);let s=!1,n,p=!1;a.addEventListener("before",()=>{p=!0,n=new AbortController,s=!1,t.addEventListener("invalid",()=>{s=!0},{signal:n.signal})},{signal:r}),a.addEventListener("after",()=>{p=!1,n==null||n.abort(),!s&&i()},{signal:r}),e.addEventListener("submit",()=>{p||i()},{signal:r})}const zt=new WeakMap;function eo(t){if(!zt.has(t)){const e=new EventTarget;zt.set(t,e);for(const i of["reportValidity","requestSubmit"]){const r=t[i];t[i]=function(){e.dispatchEvent(new Event("before"));const a=Reflect.apply(r,this,arguments);return e.dispatchEvent(new Event("after")),a}}}return zt.get(t)}function to(t,e){if(!t)return!0;let i;for(const r of t.elements)if(r.matches(":invalid")){i=r;break}return i===e}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class io{constructor(e){this.getCurrentState=e,this.currentValidity={validity:{},validationMessage:""}}getValidity(){const e=this.getCurrentState();if(!(!this.prevState||!this.equals(this.prevState,e)))return this.currentValidity;const{validity:r,validationMessage:a}=this.computeValidity(e);return this.prevState=this.copy(e),this.currentValidity={validationMessage:a,validity:{badInput:r.badInput,customError:r.customError,patternMismatch:r.patternMismatch,rangeOverflow:r.rangeOverflow,rangeUnderflow:r.rangeUnderflow,stepMismatch:r.stepMismatch,tooLong:r.tooLong,tooShort:r.tooShort,typeMismatch:r.typeMismatch,valueMissing:r.valueMissing}},this.currentValidity}}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class ro extends io{computeValidity({state:e,renderedControl:i}){let r=i;Pe(e)&&!r?(r=this.inputControl||document.createElement("input"),this.inputControl=r):r||(r=this.textAreaControl||document.createElement("textarea"),this.textAreaControl=r);const a=Pe(e)?r:null;if(a&&(a.type=e.type),r.value!==e.value&&(r.value=e.value),r.required=e.required,a){const s=e;s.pattern?a.pattern=s.pattern:a.removeAttribute("pattern"),s.min?a.min=s.min:a.removeAttribute("min"),s.max?a.max=s.max:a.removeAttribute("max"),s.step?a.step=s.step:a.removeAttribute("step")}return(e.minLength??-1)>-1?r.setAttribute("minlength",String(e.minLength)):r.removeAttribute("minlength"),(e.maxLength??-1)>-1?r.setAttribute("maxlength",String(e.maxLength)):r.removeAttribute("maxlength"),{validity:r.validity,validationMessage:r.validationMessage}}equals({state:e},{state:i}){const r=e.type===i.type&&e.value===i.value&&e.required===i.required&&e.minLength===i.minLength&&e.maxLength===i.maxLength;return!Pe(e)||!Pe(i)?r:r&&e.pattern===i.pattern&&e.min===i.min&&e.max===i.max&&e.step===i.step}copy({state:e}){return{state:Pe(e)?this.copyInput(e):this.copyTextArea(e),renderedControl:null}}copyInput(e){const{type:i,pattern:r,min:a,max:s,step:n}=e;return{...this.copySharedState(e),type:i,pattern:r,min:a,max:s,step:n}}copyTextArea(e){return{...this.copySharedState(e),type:e.type}}copySharedState({value:e,required:i,minLength:r,maxLength:a}){return{value:e,required:i,minLength:r,maxLength:a}}}function Pe(t){return t.type!=="textarea"}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const ao=he(Za(Ja(Xa(gi(k)))));class $ extends ao{constructor(){super(...arguments),this.error=!1,this.errorText="",this.label="",this.noAsterisk=!1,this.required=!1,this.value="",this.prefixText="",this.suffixText="",this.hasLeadingIcon=!1,this.hasTrailingIcon=!1,this.supportingText="",this.textDirection="",this.rows=2,this.cols=20,this.inputMode="",this.max="",this.maxLength=-1,this.min="",this.minLength=-1,this.noSpinner=!1,this.pattern="",this.placeholder="",this.readOnly=!1,this.multiple=!1,this.step="",this.type="text",this.autocomplete="",this.dirty=!1,this.focused=!1,this.nativeError=!1,this.nativeErrorText=""}get selectionDirection(){return this.getInputOrTextarea().selectionDirection}set selectionDirection(e){this.getInputOrTextarea().selectionDirection=e}get selectionEnd(){return this.getInputOrTextarea().selectionEnd}set selectionEnd(e){this.getInputOrTextarea().selectionEnd=e}get selectionStart(){return this.getInputOrTextarea().selectionStart}set selectionStart(e){this.getInputOrTextarea().selectionStart=e}get valueAsNumber(){const e=this.getInput();return e?e.valueAsNumber:NaN}set valueAsNumber(e){const i=this.getInput();i&&(i.valueAsNumber=e,this.value=i.value)}get valueAsDate(){const e=this.getInput();return e?e.valueAsDate:null}set valueAsDate(e){const i=this.getInput();i&&(i.valueAsDate=e,this.value=i.value)}get hasError(){return this.error||this.nativeError}select(){this.getInputOrTextarea().select()}setRangeText(...e){this.getInputOrTextarea().setRangeText(...e),this.value=this.getInputOrTextarea().value}setSelectionRange(e,i,r){this.getInputOrTextarea().setSelectionRange(e,i,r)}showPicker(){const e=this.getInput();e&&e.showPicker()}stepDown(e){const i=this.getInput();i&&(i.stepDown(e),this.value=i.value)}stepUp(e){const i=this.getInput();i&&(i.stepUp(e),this.value=i.value)}reset(){this.dirty=!1,this.value=this.getAttribute("value")??"",this.nativeError=!1,this.nativeErrorText=""}attributeChangedCallback(e,i,r){e==="value"&&this.dirty||super.attributeChangedCallback(e,i,r)}render(){const e={disabled:this.disabled,error:!this.disabled&&this.hasError,textarea:this.type==="textarea","no-spinner":this.noSpinner};return o`
      <span class="text-field ${W(e)}">
        ${this.renderField()}
      </span>
    `}updated(e){const i=this.getInputOrTextarea().value;this.value!==i&&(this.value=i)}renderField(){return xi`<${this.fieldTag}
      class="field"
      count=${this.value.length}
      ?disabled=${this.disabled}
      ?error=${this.hasError}
      error-text=${this.getErrorText()}
      ?focused=${this.focused}
      ?has-end=${this.hasTrailingIcon}
      ?has-start=${this.hasLeadingIcon}
      label=${this.label}
      ?no-asterisk=${this.noAsterisk}
      max=${this.maxLength}
      ?populated=${!!this.value}
      ?required=${this.required}
      ?resizable=${this.type==="textarea"}
      supporting-text=${this.supportingText}
    >
      ${this.renderLeadingIcon()}
      ${this.renderInputOrTextarea()}
      ${this.renderTrailingIcon()}
      <div id="description" slot="aria-describedby"></div>
      <slot name="container" slot="container"></slot>
    </${this.fieldTag}>`}renderLeadingIcon(){return o`
      <span class="icon leading" slot="start">
        <slot name="leading-icon" @slotchange=${this.handleIconChange}></slot>
      </span>
    `}renderTrailingIcon(){return o`
      <span class="icon trailing" slot="end">
        <slot name="trailing-icon" @slotchange=${this.handleIconChange}></slot>
      </span>
    `}renderInputOrTextarea(){const e={direction:this.textDirection},i=this.ariaLabel||this.label||l,r=this.autocomplete,a=(this.maxLength??-1)>-1,s=(this.minLength??-1)>-1;if(this.type==="textarea")return o`
        <textarea
          class="input"
          style=${ji(e)}
          aria-describedby="description"
          aria-invalid=${this.hasError}
          aria-label=${i}
          autocomplete=${r||l}
          name=${this.name||l}
          ?disabled=${this.disabled}
          maxlength=${a?this.maxLength:l}
          minlength=${s?this.minLength:l}
          placeholder=${this.placeholder||l}
          ?readonly=${this.readOnly}
          ?required=${this.required}
          rows=${this.rows}
          cols=${this.cols}
          .value=${Ui(this.value)}
          @change=${this.redispatchEvent}
          @focus=${this.handleFocusChange}
          @blur=${this.handleFocusChange}
          @input=${this.handleInput}
          @select=${this.redispatchEvent}></textarea>
      `;const n=this.renderPrefix(),p=this.renderSuffix(),h=this.inputMode;return o`
      <div class="input-wrapper">
        ${n}
        <input
          class="input"
          style=${ji(e)}
          aria-describedby="description"
          aria-invalid=${this.hasError}
          aria-label=${i}
          autocomplete=${r||l}
          name=${this.name||l}
          ?disabled=${this.disabled}
          inputmode=${h||l}
          max=${this.max||l}
          maxlength=${a?this.maxLength:l}
          min=${this.min||l}
          minlength=${s?this.minLength:l}
          pattern=${this.pattern||l}
          placeholder=${this.placeholder||l}
          ?readonly=${this.readOnly}
          ?required=${this.required}
          ?multiple=${this.multiple}
          step=${this.step||l}
          type=${this.type}
          .value=${Ui(this.value)}
          @change=${this.redispatchEvent}
          @focus=${this.handleFocusChange}
          @blur=${this.handleFocusChange}
          @input=${this.handleInput}
          @select=${this.redispatchEvent} />
        ${p}
      </div>
    `}renderPrefix(){return this.renderAffix(this.prefixText,!1)}renderSuffix(){return this.renderAffix(this.suffixText,!0)}renderAffix(e,i){return e?o`<span class="${W({suffix:i,prefix:!i})}">${e}</span>`:l}getErrorText(){return this.error?this.errorText:this.nativeErrorText}handleFocusChange(){var e;this.focused=((e=this.inputOrTextarea)==null?void 0:e.matches(":focus"))??!1}handleInput(e){this.dirty=!0,this.value=e.target.value}redispatchEvent(e){wi(this,e)}getInputOrTextarea(){return this.inputOrTextarea||(this.connectedCallback(),this.scheduleUpdate()),this.isUpdatePending&&this.scheduleUpdate(),this.inputOrTextarea}getInput(){return this.type==="textarea"?null:this.getInputOrTextarea()}handleIconChange(){this.hasLeadingIcon=this.leadingIcons.length>0,this.hasTrailingIcon=this.trailingIcons.length>0}[dt](){return this.value}formResetCallback(){this.reset()}formStateRestoreCallback(e){this.value=e}focus(){this.getInputOrTextarea().focus()}[Ht](){return new ro(()=>({state:this,renderedControl:this.inputOrTextarea}))}[qt](){return this.inputOrTextarea}[Vt](e){var r;e==null||e.preventDefault();const i=this.getErrorText();this.nativeError=!!e,this.nativeErrorText=this.validationMessage,i===this.getErrorText()&&((r=this.field)==null||r.reannounceError())}}$.shadowRootOptions={...k.shadowRootOptions,delegatesFocus:!0};d([m({type:Boolean,reflect:!0})],$.prototype,"error",void 0);d([m({attribute:"error-text"})],$.prototype,"errorText",void 0);d([m()],$.prototype,"label",void 0);d([m({type:Boolean,attribute:"no-asterisk"})],$.prototype,"noAsterisk",void 0);d([m({type:Boolean,reflect:!0})],$.prototype,"required",void 0);d([m()],$.prototype,"value",void 0);d([m({attribute:"prefix-text"})],$.prototype,"prefixText",void 0);d([m({attribute:"suffix-text"})],$.prototype,"suffixText",void 0);d([m({type:Boolean,attribute:"has-leading-icon"})],$.prototype,"hasLeadingIcon",void 0);d([m({type:Boolean,attribute:"has-trailing-icon"})],$.prototype,"hasTrailingIcon",void 0);d([m({attribute:"supporting-text"})],$.prototype,"supportingText",void 0);d([m({attribute:"text-direction"})],$.prototype,"textDirection",void 0);d([m({type:Number})],$.prototype,"rows",void 0);d([m({type:Number})],$.prototype,"cols",void 0);d([m({reflect:!0})],$.prototype,"inputMode",void 0);d([m()],$.prototype,"max",void 0);d([m({type:Number})],$.prototype,"maxLength",void 0);d([m()],$.prototype,"min",void 0);d([m({type:Number})],$.prototype,"minLength",void 0);d([m({type:Boolean,attribute:"no-spinner"})],$.prototype,"noSpinner",void 0);d([m()],$.prototype,"pattern",void 0);d([m({reflect:!0,converter:Wa})],$.prototype,"placeholder",void 0);d([m({type:Boolean,reflect:!0})],$.prototype,"readOnly",void 0);d([m({type:Boolean,reflect:!0})],$.prototype,"multiple",void 0);d([m()],$.prototype,"step",void 0);d([m({reflect:!0})],$.prototype,"type",void 0);d([m({reflect:!0})],$.prototype,"autocomplete",void 0);d([c()],$.prototype,"dirty",void 0);d([c()],$.prototype,"focused",void 0);d([c()],$.prototype,"nativeError",void 0);d([c()],$.prototype,"nativeErrorText",void 0);d([S(".input")],$.prototype,"inputOrTextarea",void 0);d([S(".field")],$.prototype,"field",void 0);d([pe({slot:"leading-icon"})],$.prototype,"leadingIcons",void 0);d([pe({slot:"trailing-icon"})],$.prototype,"trailingIcons",void 0);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class oo extends ${constructor(){super(...arguments),this.fieldTag=re`md-filled-field`}}/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const hr=y`:host{display:inline-flex;outline:none;resize:both;text-align:start;-webkit-tap-highlight-color:rgba(0,0,0,0)}.text-field,.field{width:100%}.text-field{display:inline-flex}.field{cursor:text}.disabled .field{cursor:default}.text-field,.textarea .field{resize:inherit}slot[name=container]{border-radius:inherit}.icon{color:currentColor;display:flex;align-items:center;justify-content:center;fill:currentColor;position:relative}.icon ::slotted(*){display:flex;position:absolute}[has-start] .icon.leading{font-size:var(--_leading-icon-size);height:var(--_leading-icon-size);width:var(--_leading-icon-size)}[has-end] .icon.trailing{font-size:var(--_trailing-icon-size);height:var(--_trailing-icon-size);width:var(--_trailing-icon-size)}.input-wrapper{display:flex}.input-wrapper>*{all:inherit;padding:0}.input{caret-color:var(--_caret-color);overflow-x:hidden;text-align:inherit}.input::placeholder{color:currentColor;opacity:1}.input::-webkit-calendar-picker-indicator{display:none}.input::-webkit-search-decoration,.input::-webkit-search-cancel-button{display:none}@media(forced-colors: active){.input{background:none}}.no-spinner .input::-webkit-inner-spin-button,.no-spinner .input::-webkit-outer-spin-button{display:none}.no-spinner .input[type=number]{-moz-appearance:textfield}:focus-within .input{caret-color:var(--_focus-caret-color)}.error:focus-within .input{caret-color:var(--_error-focus-caret-color)}.text-field:not(.disabled) .prefix{color:var(--_input-text-prefix-color)}.text-field:not(.disabled) .suffix{color:var(--_input-text-suffix-color)}.text-field:not(.disabled) .input::placeholder{color:var(--_input-text-placeholder-color)}.prefix,.suffix{text-wrap:nowrap;width:min-content}.prefix{padding-inline-end:var(--_input-text-prefix-trailing-space)}.suffix{padding-inline-start:var(--_input-text-suffix-leading-space)}
`;/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let Gt=class extends oo{constructor(){super(...arguments),this.fieldTag=re`md-filled-field`}};Gt.styles=[hr,qa];Gt=d([C("md-filled-text-field")],Gt);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class so extends E{renderOutline(e){return o`
      <div class="outline">
        <div class="outline-start"></div>
        <div class="outline-notch">
          <div class="outline-panel-inactive"></div>
          <div class="outline-panel-active"></div>
          <div class="outline-label">${e}</div>
        </div>
        <div class="outline-end"></div>
      </div>
    `}}/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const no=y`@layer styles{:host{--_bottom-space: var(--md-outlined-field-bottom-space, 16px);--_content-color: var(--md-outlined-field-content-color, var(--md-sys-color-on-surface, #1d1b20));--_content-font: var(--md-outlined-field-content-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_content-line-height: var(--md-outlined-field-content-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_content-size: var(--md-outlined-field-content-size, var(--md-sys-typescale-body-large-size, 1rem));--_content-space: var(--md-outlined-field-content-space, 16px);--_content-weight: var(--md-outlined-field-content-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_disabled-content-color: var(--md-outlined-field-disabled-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-content-opacity: var(--md-outlined-field-disabled-content-opacity, 0.38);--_disabled-label-text-color: var(--md-outlined-field-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-outlined-field-disabled-label-text-opacity, 0.38);--_disabled-leading-content-color: var(--md-outlined-field-disabled-leading-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-leading-content-opacity: var(--md-outlined-field-disabled-leading-content-opacity, 0.38);--_disabled-outline-color: var(--md-outlined-field-disabled-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-outline-opacity: var(--md-outlined-field-disabled-outline-opacity, 0.12);--_disabled-outline-width: var(--md-outlined-field-disabled-outline-width, 1px);--_disabled-supporting-text-color: var(--md-outlined-field-disabled-supporting-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-supporting-text-opacity: var(--md-outlined-field-disabled-supporting-text-opacity, 0.38);--_disabled-trailing-content-color: var(--md-outlined-field-disabled-trailing-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-trailing-content-opacity: var(--md-outlined-field-disabled-trailing-content-opacity, 0.38);--_error-content-color: var(--md-outlined-field-error-content-color, var(--md-sys-color-on-surface, #1d1b20));--_error-focus-content-color: var(--md-outlined-field-error-focus-content-color, var(--md-sys-color-on-surface, #1d1b20));--_error-focus-label-text-color: var(--md-outlined-field-error-focus-label-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-leading-content-color: var(--md-outlined-field-error-focus-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-focus-outline-color: var(--md-outlined-field-error-focus-outline-color, var(--md-sys-color-error, #b3261e));--_error-focus-supporting-text-color: var(--md-outlined-field-error-focus-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-trailing-content-color: var(--md-outlined-field-error-focus-trailing-content-color, var(--md-sys-color-error, #b3261e));--_error-hover-content-color: var(--md-outlined-field-error-hover-content-color, var(--md-sys-color-on-surface, #1d1b20));--_error-hover-label-text-color: var(--md-outlined-field-error-hover-label-text-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-leading-content-color: var(--md-outlined-field-error-hover-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-hover-outline-color: var(--md-outlined-field-error-hover-outline-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-supporting-text-color: var(--md-outlined-field-error-hover-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-hover-trailing-content-color: var(--md-outlined-field-error-hover-trailing-content-color, var(--md-sys-color-on-error-container, #410e0b));--_error-label-text-color: var(--md-outlined-field-error-label-text-color, var(--md-sys-color-error, #b3261e));--_error-leading-content-color: var(--md-outlined-field-error-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-outline-color: var(--md-outlined-field-error-outline-color, var(--md-sys-color-error, #b3261e));--_error-supporting-text-color: var(--md-outlined-field-error-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-trailing-content-color: var(--md-outlined-field-error-trailing-content-color, var(--md-sys-color-error, #b3261e));--_focus-content-color: var(--md-outlined-field-focus-content-color, var(--md-sys-color-on-surface, #1d1b20));--_focus-label-text-color: var(--md-outlined-field-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_focus-leading-content-color: var(--md-outlined-field-focus-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-outline-color: var(--md-outlined-field-focus-outline-color, var(--md-sys-color-primary, #6750a4));--_focus-outline-width: var(--md-outlined-field-focus-outline-width, 3px);--_focus-supporting-text-color: var(--md-outlined-field-focus-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-trailing-content-color: var(--md-outlined-field-focus-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-content-color: var(--md-outlined-field-hover-content-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-label-text-color: var(--md-outlined-field-hover-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-leading-content-color: var(--md-outlined-field-hover-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-outline-color: var(--md-outlined-field-hover-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-outline-width: var(--md-outlined-field-hover-outline-width, 1px);--_hover-supporting-text-color: var(--md-outlined-field-hover-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-trailing-content-color: var(--md-outlined-field-hover-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-color: var(--md-outlined-field-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-font: var(--md-outlined-field-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-outlined-field-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_label-text-padding-bottom: var(--md-outlined-field-label-text-padding-bottom, 8px);--_label-text-populated-line-height: var(--md-outlined-field-label-text-populated-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_label-text-populated-size: var(--md-outlined-field-label-text-populated-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_label-text-size: var(--md-outlined-field-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_label-text-weight: var(--md-outlined-field-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_leading-content-color: var(--md-outlined-field-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_leading-space: var(--md-outlined-field-leading-space, 16px);--_outline-color: var(--md-outlined-field-outline-color, var(--md-sys-color-outline, #79747e));--_outline-label-padding: var(--md-outlined-field-outline-label-padding, 4px);--_outline-width: var(--md-outlined-field-outline-width, 1px);--_supporting-text-color: var(--md-outlined-field-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_supporting-text-font: var(--md-outlined-field-supporting-text-font, var(--md-sys-typescale-body-small-font, var(--md-ref-typeface-plain, Roboto)));--_supporting-text-leading-space: var(--md-outlined-field-supporting-text-leading-space, 16px);--_supporting-text-line-height: var(--md-outlined-field-supporting-text-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_supporting-text-size: var(--md-outlined-field-supporting-text-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_supporting-text-top-space: var(--md-outlined-field-supporting-text-top-space, 4px);--_supporting-text-trailing-space: var(--md-outlined-field-supporting-text-trailing-space, 16px);--_supporting-text-weight: var(--md-outlined-field-supporting-text-weight, var(--md-sys-typescale-body-small-weight, var(--md-ref-typeface-weight-regular, 400)));--_top-space: var(--md-outlined-field-top-space, 16px);--_trailing-content-color: var(--md-outlined-field-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_trailing-space: var(--md-outlined-field-trailing-space, 16px);--_with-leading-content-leading-space: var(--md-outlined-field-with-leading-content-leading-space, 12px);--_with-trailing-content-trailing-space: var(--md-outlined-field-with-trailing-content-trailing-space, 12px);--_container-shape-start-start: var(--md-outlined-field-container-shape-start-start, var(--md-outlined-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-start-end: var(--md-outlined-field-container-shape-start-end, var(--md-outlined-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-end-end: var(--md-outlined-field-container-shape-end-end, var(--md-outlined-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-end-start: var(--md-outlined-field-container-shape-end-start, var(--md-outlined-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)))}.outline{border-color:var(--_outline-color);border-radius:inherit;display:flex;pointer-events:none;height:100%;position:absolute;width:100%;z-index:1}.outline-start::before,.outline-start::after,.outline-panel-inactive::before,.outline-panel-inactive::after,.outline-panel-active::before,.outline-panel-active::after,.outline-end::before,.outline-end::after{border:inherit;content:"";inset:0;position:absolute}.outline-start,.outline-end{border:inherit;border-radius:inherit;box-sizing:border-box;position:relative}.outline-start::before,.outline-start::after,.outline-end::before,.outline-end::after{border-bottom-style:solid;border-top-style:solid}.outline-start::after,.outline-end::after{opacity:0;transition:opacity 150ms cubic-bezier(0.2, 0, 0, 1)}.focused .outline-start::after,.focused .outline-end::after{opacity:1}.outline-start::before,.outline-start::after{border-inline-start-style:solid;border-inline-end-style:none;border-start-start-radius:inherit;border-start-end-radius:0;border-end-start-radius:inherit;border-end-end-radius:0;margin-inline-end:var(--_outline-label-padding)}.outline-end{flex-grow:1;margin-inline-start:calc(-1*var(--_outline-label-padding))}.outline-end::before,.outline-end::after{border-inline-start-style:none;border-inline-end-style:solid;border-start-start-radius:0;border-start-end-radius:inherit;border-end-start-radius:0;border-end-end-radius:inherit}.outline-notch{align-items:flex-start;border:inherit;display:flex;margin-inline-start:calc(-1*var(--_outline-label-padding));margin-inline-end:var(--_outline-label-padding);max-width:calc(100% - var(--_leading-space) - var(--_trailing-space));padding:0 var(--_outline-label-padding);position:relative}.no-label .outline-notch{display:none}.outline-panel-inactive,.outline-panel-active{border:inherit;border-bottom-style:solid;inset:0;position:absolute}.outline-panel-inactive::before,.outline-panel-inactive::after,.outline-panel-active::before,.outline-panel-active::after{border-top-style:solid;border-bottom:none;bottom:auto;transform:scaleX(1);transition:transform 150ms cubic-bezier(0.2, 0, 0, 1)}.outline-panel-inactive::before,.outline-panel-active::before{right:50%;transform-origin:top left}.outline-panel-inactive::after,.outline-panel-active::after{left:50%;transform-origin:top right}.populated .outline-panel-inactive::before,.populated .outline-panel-inactive::after,.populated .outline-panel-active::before,.populated .outline-panel-active::after,.focused .outline-panel-inactive::before,.focused .outline-panel-inactive::after,.focused .outline-panel-active::before,.focused .outline-panel-active::after{transform:scaleX(0)}.outline-panel-active{opacity:0;transition:opacity 150ms cubic-bezier(0.2, 0, 0, 1)}.focused .outline-panel-active{opacity:1}.outline-label{display:flex;max-width:100%;transform:translateY(calc(-100% + var(--_label-text-padding-bottom)))}.outline-start,.field:not(.with-start) .content ::slotted(*){padding-inline-start:max(var(--_leading-space),max(var(--_container-shape-start-start),var(--_container-shape-end-start)) + var(--_outline-label-padding))}.field:not(.with-start) .label-wrapper{margin-inline-start:max(var(--_leading-space),max(var(--_container-shape-start-start),var(--_container-shape-end-start)) + var(--_outline-label-padding))}.field:not(.with-end) .content ::slotted(*){padding-inline-end:max(var(--_trailing-space),max(var(--_container-shape-start-end),var(--_container-shape-end-end)))}.field:not(.with-end) .label-wrapper{margin-inline-end:max(var(--_trailing-space),max(var(--_container-shape-start-end),var(--_container-shape-end-end)))}.outline-start::before,.outline-end::before,.outline-panel-inactive,.outline-panel-inactive::before,.outline-panel-inactive::after{border-width:var(--_outline-width)}:hover .outline{border-color:var(--_hover-outline-color);color:var(--_hover-outline-color)}:hover .outline-start::before,:hover .outline-end::before,:hover .outline-panel-inactive,:hover .outline-panel-inactive::before,:hover .outline-panel-inactive::after{border-width:var(--_hover-outline-width)}.focused .outline{border-color:var(--_focus-outline-color);color:var(--_focus-outline-color)}.outline-start::after,.outline-end::after,.outline-panel-active,.outline-panel-active::before,.outline-panel-active::after{border-width:var(--_focus-outline-width)}.disabled .outline{border-color:var(--_disabled-outline-color);color:var(--_disabled-outline-color)}.disabled .outline-start,.disabled .outline-end,.disabled .outline-panel-inactive{opacity:var(--_disabled-outline-opacity)}.disabled .outline-start::before,.disabled .outline-end::before,.disabled .outline-panel-inactive,.disabled .outline-panel-inactive::before,.disabled .outline-panel-inactive::after{border-width:var(--_disabled-outline-width)}.error .outline{border-color:var(--_error-outline-color);color:var(--_error-outline-color)}.error:hover .outline{border-color:var(--_error-hover-outline-color);color:var(--_error-hover-outline-color)}.error.focused .outline{border-color:var(--_error-focus-outline-color);color:var(--_error-focus-outline-color)}.resizable .container{bottom:var(--_focus-outline-width);inset-inline-end:var(--_focus-outline-width);clip-path:inset(var(--_focus-outline-width) 0 0 var(--_focus-outline-width))}.resizable .container>*{top:var(--_focus-outline-width);inset-inline-start:var(--_focus-outline-width)}.resizable .container:dir(rtl){clip-path:inset(var(--_focus-outline-width) var(--_focus-outline-width) 0 0)}}@layer hcm{@media(forced-colors: active){.disabled .outline{border-color:GrayText;color:GrayText}.disabled :is(.outline-start,.outline-end,.outline-panel-inactive){opacity:1}}}
`;/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let Kt=class extends so{};Kt.styles=[cr,no];Kt=d([C("md-outlined-field")],Kt);/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const lo=y`:host{--_caret-color: var(--md-outlined-text-field-caret-color, var(--md-sys-color-primary, #6750a4));--_disabled-input-text-color: var(--md-outlined-text-field-disabled-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-input-text-opacity: var(--md-outlined-text-field-disabled-input-text-opacity, 0.38);--_disabled-label-text-color: var(--md-outlined-text-field-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-outlined-text-field-disabled-label-text-opacity, 0.38);--_disabled-leading-icon-color: var(--md-outlined-text-field-disabled-leading-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-leading-icon-opacity: var(--md-outlined-text-field-disabled-leading-icon-opacity, 0.38);--_disabled-outline-color: var(--md-outlined-text-field-disabled-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-outline-opacity: var(--md-outlined-text-field-disabled-outline-opacity, 0.12);--_disabled-outline-width: var(--md-outlined-text-field-disabled-outline-width, 1px);--_disabled-supporting-text-color: var(--md-outlined-text-field-disabled-supporting-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-supporting-text-opacity: var(--md-outlined-text-field-disabled-supporting-text-opacity, 0.38);--_disabled-trailing-icon-color: var(--md-outlined-text-field-disabled-trailing-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-trailing-icon-opacity: var(--md-outlined-text-field-disabled-trailing-icon-opacity, 0.38);--_error-focus-caret-color: var(--md-outlined-text-field-error-focus-caret-color, var(--md-sys-color-error, #b3261e));--_error-focus-input-text-color: var(--md-outlined-text-field-error-focus-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_error-focus-label-text-color: var(--md-outlined-text-field-error-focus-label-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-leading-icon-color: var(--md-outlined-text-field-error-focus-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-focus-outline-color: var(--md-outlined-text-field-error-focus-outline-color, var(--md-sys-color-error, #b3261e));--_error-focus-supporting-text-color: var(--md-outlined-text-field-error-focus-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-trailing-icon-color: var(--md-outlined-text-field-error-focus-trailing-icon-color, var(--md-sys-color-error, #b3261e));--_error-hover-input-text-color: var(--md-outlined-text-field-error-hover-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_error-hover-label-text-color: var(--md-outlined-text-field-error-hover-label-text-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-leading-icon-color: var(--md-outlined-text-field-error-hover-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-hover-outline-color: var(--md-outlined-text-field-error-hover-outline-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-supporting-text-color: var(--md-outlined-text-field-error-hover-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-hover-trailing-icon-color: var(--md-outlined-text-field-error-hover-trailing-icon-color, var(--md-sys-color-on-error-container, #410e0b));--_error-input-text-color: var(--md-outlined-text-field-error-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_error-label-text-color: var(--md-outlined-text-field-error-label-text-color, var(--md-sys-color-error, #b3261e));--_error-leading-icon-color: var(--md-outlined-text-field-error-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-outline-color: var(--md-outlined-text-field-error-outline-color, var(--md-sys-color-error, #b3261e));--_error-supporting-text-color: var(--md-outlined-text-field-error-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-trailing-icon-color: var(--md-outlined-text-field-error-trailing-icon-color, var(--md-sys-color-error, #b3261e));--_focus-input-text-color: var(--md-outlined-text-field-focus-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_focus-label-text-color: var(--md-outlined-text-field-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_focus-leading-icon-color: var(--md-outlined-text-field-focus-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-outline-color: var(--md-outlined-text-field-focus-outline-color, var(--md-sys-color-primary, #6750a4));--_focus-outline-width: var(--md-outlined-text-field-focus-outline-width, 3px);--_focus-supporting-text-color: var(--md-outlined-text-field-focus-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-trailing-icon-color: var(--md-outlined-text-field-focus-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-input-text-color: var(--md-outlined-text-field-hover-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-label-text-color: var(--md-outlined-text-field-hover-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-leading-icon-color: var(--md-outlined-text-field-hover-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-outline-color: var(--md-outlined-text-field-hover-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-outline-width: var(--md-outlined-text-field-hover-outline-width, 1px);--_hover-supporting-text-color: var(--md-outlined-text-field-hover-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-trailing-icon-color: var(--md-outlined-text-field-hover-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-color: var(--md-outlined-text-field-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_input-text-font: var(--md-outlined-text-field-input-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_input-text-line-height: var(--md-outlined-text-field-input-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_input-text-placeholder-color: var(--md-outlined-text-field-input-text-placeholder-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-prefix-color: var(--md-outlined-text-field-input-text-prefix-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-size: var(--md-outlined-text-field-input-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_input-text-suffix-color: var(--md-outlined-text-field-input-text-suffix-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-weight: var(--md-outlined-text-field-input-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_label-text-color: var(--md-outlined-text-field-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-font: var(--md-outlined-text-field-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-outlined-text-field-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_label-text-populated-line-height: var(--md-outlined-text-field-label-text-populated-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_label-text-populated-size: var(--md-outlined-text-field-label-text-populated-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_label-text-size: var(--md-outlined-text-field-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_label-text-weight: var(--md-outlined-text-field-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_leading-icon-color: var(--md-outlined-text-field-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_leading-icon-size: var(--md-outlined-text-field-leading-icon-size, 24px);--_outline-color: var(--md-outlined-text-field-outline-color, var(--md-sys-color-outline, #79747e));--_outline-width: var(--md-outlined-text-field-outline-width, 1px);--_supporting-text-color: var(--md-outlined-text-field-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_supporting-text-font: var(--md-outlined-text-field-supporting-text-font, var(--md-sys-typescale-body-small-font, var(--md-ref-typeface-plain, Roboto)));--_supporting-text-line-height: var(--md-outlined-text-field-supporting-text-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_supporting-text-size: var(--md-outlined-text-field-supporting-text-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_supporting-text-weight: var(--md-outlined-text-field-supporting-text-weight, var(--md-sys-typescale-body-small-weight, var(--md-ref-typeface-weight-regular, 400)));--_trailing-icon-color: var(--md-outlined-text-field-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_trailing-icon-size: var(--md-outlined-text-field-trailing-icon-size, 24px);--_container-shape-start-start: var(--md-outlined-text-field-container-shape-start-start, var(--md-outlined-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-start-end: var(--md-outlined-text-field-container-shape-start-end, var(--md-outlined-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-end-end: var(--md-outlined-text-field-container-shape-end-end, var(--md-outlined-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-end-start: var(--md-outlined-text-field-container-shape-end-start, var(--md-outlined-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_icon-input-space: var(--md-outlined-text-field-icon-input-space, 16px);--_leading-space: var(--md-outlined-text-field-leading-space, 16px);--_trailing-space: var(--md-outlined-text-field-trailing-space, 16px);--_top-space: var(--md-outlined-text-field-top-space, 16px);--_bottom-space: var(--md-outlined-text-field-bottom-space, 16px);--_input-text-prefix-trailing-space: var(--md-outlined-text-field-input-text-prefix-trailing-space, 2px);--_input-text-suffix-leading-space: var(--md-outlined-text-field-input-text-suffix-leading-space, 2px);--_focus-caret-color: var(--md-outlined-text-field-focus-caret-color, var(--md-sys-color-primary, #6750a4));--_with-leading-icon-leading-space: var(--md-outlined-text-field-with-leading-icon-leading-space, 12px);--_with-trailing-icon-trailing-space: var(--md-outlined-text-field-with-trailing-icon-trailing-space, 12px);--md-outlined-field-bottom-space: var(--_bottom-space);--md-outlined-field-container-shape-end-end: var(--_container-shape-end-end);--md-outlined-field-container-shape-end-start: var(--_container-shape-end-start);--md-outlined-field-container-shape-start-end: var(--_container-shape-start-end);--md-outlined-field-container-shape-start-start: var(--_container-shape-start-start);--md-outlined-field-content-color: var(--_input-text-color);--md-outlined-field-content-font: var(--_input-text-font);--md-outlined-field-content-line-height: var(--_input-text-line-height);--md-outlined-field-content-size: var(--_input-text-size);--md-outlined-field-content-space: var(--_icon-input-space);--md-outlined-field-content-weight: var(--_input-text-weight);--md-outlined-field-disabled-content-color: var(--_disabled-input-text-color);--md-outlined-field-disabled-content-opacity: var(--_disabled-input-text-opacity);--md-outlined-field-disabled-label-text-color: var(--_disabled-label-text-color);--md-outlined-field-disabled-label-text-opacity: var(--_disabled-label-text-opacity);--md-outlined-field-disabled-leading-content-color: var(--_disabled-leading-icon-color);--md-outlined-field-disabled-leading-content-opacity: var(--_disabled-leading-icon-opacity);--md-outlined-field-disabled-outline-color: var(--_disabled-outline-color);--md-outlined-field-disabled-outline-opacity: var(--_disabled-outline-opacity);--md-outlined-field-disabled-outline-width: var(--_disabled-outline-width);--md-outlined-field-disabled-supporting-text-color: var(--_disabled-supporting-text-color);--md-outlined-field-disabled-supporting-text-opacity: var(--_disabled-supporting-text-opacity);--md-outlined-field-disabled-trailing-content-color: var(--_disabled-trailing-icon-color);--md-outlined-field-disabled-trailing-content-opacity: var(--_disabled-trailing-icon-opacity);--md-outlined-field-error-content-color: var(--_error-input-text-color);--md-outlined-field-error-focus-content-color: var(--_error-focus-input-text-color);--md-outlined-field-error-focus-label-text-color: var(--_error-focus-label-text-color);--md-outlined-field-error-focus-leading-content-color: var(--_error-focus-leading-icon-color);--md-outlined-field-error-focus-outline-color: var(--_error-focus-outline-color);--md-outlined-field-error-focus-supporting-text-color: var(--_error-focus-supporting-text-color);--md-outlined-field-error-focus-trailing-content-color: var(--_error-focus-trailing-icon-color);--md-outlined-field-error-hover-content-color: var(--_error-hover-input-text-color);--md-outlined-field-error-hover-label-text-color: var(--_error-hover-label-text-color);--md-outlined-field-error-hover-leading-content-color: var(--_error-hover-leading-icon-color);--md-outlined-field-error-hover-outline-color: var(--_error-hover-outline-color);--md-outlined-field-error-hover-supporting-text-color: var(--_error-hover-supporting-text-color);--md-outlined-field-error-hover-trailing-content-color: var(--_error-hover-trailing-icon-color);--md-outlined-field-error-label-text-color: var(--_error-label-text-color);--md-outlined-field-error-leading-content-color: var(--_error-leading-icon-color);--md-outlined-field-error-outline-color: var(--_error-outline-color);--md-outlined-field-error-supporting-text-color: var(--_error-supporting-text-color);--md-outlined-field-error-trailing-content-color: var(--_error-trailing-icon-color);--md-outlined-field-focus-content-color: var(--_focus-input-text-color);--md-outlined-field-focus-label-text-color: var(--_focus-label-text-color);--md-outlined-field-focus-leading-content-color: var(--_focus-leading-icon-color);--md-outlined-field-focus-outline-color: var(--_focus-outline-color);--md-outlined-field-focus-outline-width: var(--_focus-outline-width);--md-outlined-field-focus-supporting-text-color: var(--_focus-supporting-text-color);--md-outlined-field-focus-trailing-content-color: var(--_focus-trailing-icon-color);--md-outlined-field-hover-content-color: var(--_hover-input-text-color);--md-outlined-field-hover-label-text-color: var(--_hover-label-text-color);--md-outlined-field-hover-leading-content-color: var(--_hover-leading-icon-color);--md-outlined-field-hover-outline-color: var(--_hover-outline-color);--md-outlined-field-hover-outline-width: var(--_hover-outline-width);--md-outlined-field-hover-supporting-text-color: var(--_hover-supporting-text-color);--md-outlined-field-hover-trailing-content-color: var(--_hover-trailing-icon-color);--md-outlined-field-label-text-color: var(--_label-text-color);--md-outlined-field-label-text-font: var(--_label-text-font);--md-outlined-field-label-text-line-height: var(--_label-text-line-height);--md-outlined-field-label-text-populated-line-height: var(--_label-text-populated-line-height);--md-outlined-field-label-text-populated-size: var(--_label-text-populated-size);--md-outlined-field-label-text-size: var(--_label-text-size);--md-outlined-field-label-text-weight: var(--_label-text-weight);--md-outlined-field-leading-content-color: var(--_leading-icon-color);--md-outlined-field-leading-space: var(--_leading-space);--md-outlined-field-outline-color: var(--_outline-color);--md-outlined-field-outline-width: var(--_outline-width);--md-outlined-field-supporting-text-color: var(--_supporting-text-color);--md-outlined-field-supporting-text-font: var(--_supporting-text-font);--md-outlined-field-supporting-text-line-height: var(--_supporting-text-line-height);--md-outlined-field-supporting-text-size: var(--_supporting-text-size);--md-outlined-field-supporting-text-weight: var(--_supporting-text-weight);--md-outlined-field-top-space: var(--_top-space);--md-outlined-field-trailing-content-color: var(--_trailing-icon-color);--md-outlined-field-trailing-space: var(--_trailing-space);--md-outlined-field-with-leading-content-leading-space: var(--_with-leading-icon-leading-space);--md-outlined-field-with-trailing-content-trailing-space: var(--_with-trailing-icon-trailing-space)}
`;/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class co extends ${constructor(){super(...arguments),this.fieldTag=re`md-outlined-field`}}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let Yt=class extends co{constructor(){super(...arguments),this.fieldTag=re`md-outlined-field`}};Yt.styles=[hr,lo];Yt=d([C("md-outlined-text-field")],Yt);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const po=he(k);class Ge extends po{constructor(){super(...arguments),this.value=0,this.max=1,this.indeterminate=!1,this.fourColor=!1}render(){const{ariaLabel:e}=this;return o`
      <div
        class="progress ${W(this.getRenderClasses())}"
        role="progressbar"
        aria-label="${e||l}"
        aria-valuemin="0"
        aria-valuemax=${this.max}
        aria-valuenow=${this.indeterminate?l:this.value}
        >${this.renderIndicator()}</div
      >
    `}getRenderClasses(){return{indeterminate:this.indeterminate,"four-color":this.fourColor}}}d([m({type:Number})],Ge.prototype,"value",void 0);d([m({type:Number})],Ge.prototype,"max",void 0);d([m({type:Boolean})],Ge.prototype,"indeterminate",void 0);d([m({type:Boolean,attribute:"four-color"})],Ge.prototype,"fourColor",void 0);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class ho extends Ge{renderIndicator(){return this.indeterminate?this.renderIndeterminateContainer():this.renderDeterminateContainer()}renderDeterminateContainer(){const e=(1-this.value/this.max)*100;return o`
      <svg viewBox="0 0 4800 4800">
        <circle class="track" pathLength="100"></circle>
        <circle
          class="active-track"
          pathLength="100"
          stroke-dashoffset=${e}></circle>
      </svg>
    `}renderIndeterminateContainer(){return o` <div class="spinner">
      <div class="left">
        <div class="circle"></div>
      </div>
      <div class="right">
        <div class="circle"></div>
      </div>
    </div>`}}/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const uo=y`:host{--_active-indicator-color: var(--md-circular-progress-active-indicator-color, var(--md-sys-color-primary, #6750a4));--_active-indicator-width: var(--md-circular-progress-active-indicator-width, 10);--_four-color-active-indicator-four-color: var(--md-circular-progress-four-color-active-indicator-four-color, var(--md-sys-color-tertiary-container, #ffd8e4));--_four-color-active-indicator-one-color: var(--md-circular-progress-four-color-active-indicator-one-color, var(--md-sys-color-primary, #6750a4));--_four-color-active-indicator-three-color: var(--md-circular-progress-four-color-active-indicator-three-color, var(--md-sys-color-tertiary, #7d5260));--_four-color-active-indicator-two-color: var(--md-circular-progress-four-color-active-indicator-two-color, var(--md-sys-color-primary-container, #eaddff));--_size: var(--md-circular-progress-size, 48px);display:inline-flex;vertical-align:middle;width:var(--_size);height:var(--_size);position:relative;align-items:center;justify-content:center;contain:strict;content-visibility:auto}.progress{flex:1;align-self:stretch;margin:4px}.progress,.spinner,.left,.right,.circle,svg,.track,.active-track{position:absolute;inset:0}svg{transform:rotate(-90deg)}circle{cx:50%;cy:50%;r:calc(50%*(1 - var(--_active-indicator-width)/100));stroke-width:calc(var(--_active-indicator-width)*1%);stroke-dasharray:100;fill:rgba(0,0,0,0)}.active-track{transition:stroke-dashoffset 500ms cubic-bezier(0, 0, 0.2, 1);stroke:var(--_active-indicator-color)}.track{stroke:rgba(0,0,0,0)}.progress.indeterminate{animation:linear infinite linear-rotate;animation-duration:1568.2352941176ms}.spinner{animation:infinite both rotate-arc;animation-duration:5332ms;animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1)}.left{overflow:hidden;inset:0 50% 0 0}.right{overflow:hidden;inset:0 0 0 50%}.circle{box-sizing:border-box;border-radius:50%;border:solid calc(var(--_active-indicator-width)/100*(var(--_size) - 8px));border-color:var(--_active-indicator-color) var(--_active-indicator-color) rgba(0,0,0,0) rgba(0,0,0,0);animation:expand-arc;animation-iteration-count:infinite;animation-fill-mode:both;animation-duration:1333ms,5332ms;animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1)}.four-color .circle{animation-name:expand-arc,four-color}.left .circle{rotate:135deg;inset:0 -100% 0 0}.right .circle{rotate:100deg;inset:0 0 0 -100%;animation-delay:-666.5ms,0ms}@media(forced-colors: active){.active-track{stroke:CanvasText}.circle{border-color:CanvasText CanvasText Canvas Canvas}}@keyframes expand-arc{0%{transform:rotate(265deg)}50%{transform:rotate(130deg)}100%{transform:rotate(265deg)}}@keyframes rotate-arc{12.5%{transform:rotate(135deg)}25%{transform:rotate(270deg)}37.5%{transform:rotate(405deg)}50%{transform:rotate(540deg)}62.5%{transform:rotate(675deg)}75%{transform:rotate(810deg)}87.5%{transform:rotate(945deg)}100%{transform:rotate(1080deg)}}@keyframes linear-rotate{to{transform:rotate(360deg)}}@keyframes four-color{0%{border-top-color:var(--_four-color-active-indicator-one-color);border-right-color:var(--_four-color-active-indicator-one-color)}15%{border-top-color:var(--_four-color-active-indicator-one-color);border-right-color:var(--_four-color-active-indicator-one-color)}25%{border-top-color:var(--_four-color-active-indicator-two-color);border-right-color:var(--_four-color-active-indicator-two-color)}40%{border-top-color:var(--_four-color-active-indicator-two-color);border-right-color:var(--_four-color-active-indicator-two-color)}50%{border-top-color:var(--_four-color-active-indicator-three-color);border-right-color:var(--_four-color-active-indicator-three-color)}65%{border-top-color:var(--_four-color-active-indicator-three-color);border-right-color:var(--_four-color-active-indicator-three-color)}75%{border-top-color:var(--_four-color-active-indicator-four-color);border-right-color:var(--_four-color-active-indicator-four-color)}90%{border-top-color:var(--_four-color-active-indicator-four-color);border-right-color:var(--_four-color-active-indicator-four-color)}100%{border-top-color:var(--_four-color-active-indicator-one-color);border-right-color:var(--_four-color-active-indicator-one-color)}}
`;/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let Wt=class extends ho{};Wt.styles=[uo];Wt=d([C("md-circular-progress")],Wt);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class vt extends k{constructor(){super(...arguments),this.inset=!1,this.insetStart=!1,this.insetEnd=!1}}d([m({type:Boolean,reflect:!0})],vt.prototype,"inset",void 0);d([m({type:Boolean,reflect:!0,attribute:"inset-start"})],vt.prototype,"insetStart",void 0);d([m({type:Boolean,reflect:!0,attribute:"inset-end"})],vt.prototype,"insetEnd",void 0);/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const mo=y`:host{box-sizing:border-box;color:var(--md-divider-color, var(--md-sys-color-outline-variant, #cac4d0));display:flex;height:var(--md-divider-thickness, 1px);width:100%}:host([inset]),:host([inset-start]){padding-inline-start:16px}:host([inset]),:host([inset-end]){padding-inline-end:16px}:host::before{background:currentColor;content:"";height:100%;width:100%}@media(forced-colors: active){:host::before{background:CanvasText}}
`;/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let Jt=class extends vt{};Jt.styles=[mo];Jt=d([C("md-divider")],Jt);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const fo={dialog:[[[{transform:"translateY(-50px)"},{transform:"translateY(0)"}],{duration:500,easing:we.EMPHASIZED}]],scrim:[[[{opacity:0},{opacity:.32}],{duration:500,easing:"linear"}]],container:[[[{opacity:0},{opacity:1}],{duration:50,easing:"linear",pseudoElement:"::before"}],[[{height:"35%"},{height:"100%"}],{duration:500,easing:we.EMPHASIZED,pseudoElement:"::before"}]],headline:[[[{opacity:0},{opacity:0,offset:.2},{opacity:1}],{duration:250,easing:"linear",fill:"forwards"}]],content:[[[{opacity:0},{opacity:0,offset:.2},{opacity:1}],{duration:250,easing:"linear",fill:"forwards"}]],actions:[[[{opacity:0},{opacity:0,offset:.5},{opacity:1}],{duration:300,easing:"linear",fill:"forwards"}]]},vo={dialog:[[[{transform:"translateY(0)"},{transform:"translateY(-50px)"}],{duration:150,easing:we.EMPHASIZED_ACCELERATE}]],scrim:[[[{opacity:.32},{opacity:0}],{duration:150,easing:"linear"}]],container:[[[{height:"100%"},{height:"35%"}],{duration:150,easing:we.EMPHASIZED_ACCELERATE,pseudoElement:"::before"}],[[{opacity:"1"},{opacity:"0"}],{delay:100,duration:50,easing:"linear",pseudoElement:"::before"}]],headline:[[[{opacity:1},{opacity:0}],{duration:100,easing:"linear",fill:"forwards"}]],content:[[[{opacity:1},{opacity:0}],{duration:100,easing:"linear",fill:"forwards"}]],actions:[[[{opacity:1},{opacity:0}],{duration:100,easing:"linear",fill:"forwards"}]]};/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const bo=he(k);class P extends bo{get open(){return this.isOpen}set open(e){e!==this.isOpen&&(this.isOpen=e,e?(this.setAttribute("open",""),this.show()):(this.removeAttribute("open"),this.close()))}constructor(){super(),this.quick=!1,this.returnValue="",this.noFocusTrap=!1,this.getOpenAnimation=()=>fo,this.getCloseAnimation=()=>vo,this.isOpen=!1,this.isOpening=!1,this.isConnectedPromise=this.getIsConnectedPromise(),this.isAtScrollTop=!1,this.isAtScrollBottom=!1,this.nextClickIsFromContent=!1,this.hasHeadline=!1,this.hasActions=!1,this.hasIcon=!1,this.escapePressedWithoutCancel=!1,this.treewalker=document.createTreeWalker(this,NodeFilter.SHOW_ELEMENT),this.addEventListener("submit",this.handleSubmit)}async show(){var r;this.isOpening=!0,await this.isConnectedPromise,await this.updateComplete;const e=this.dialog;if(e.open||!this.isOpening){this.isOpening=!1;return}if(!this.dispatchEvent(new Event("open",{cancelable:!0}))){this.open=!1,this.isOpening=!1;return}e.showModal(),this.open=!0,this.scroller&&(this.scroller.scrollTop=0),(r=this.querySelector("[autofocus]"))==null||r.focus(),await this.animateDialog(this.getOpenAnimation()),this.dispatchEvent(new Event("opened")),this.isOpening=!1}async close(e=this.returnValue){if(this.isOpening=!1,!this.isConnected){this.open=!1;return}await this.updateComplete;const i=this.dialog;if(!i.open||this.isOpening){this.open=!1;return}const r=this.returnValue;if(this.returnValue=e,!this.dispatchEvent(new Event("close",{cancelable:!0}))){this.returnValue=r;return}await this.animateDialog(this.getCloseAnimation()),i.close(e),this.open=!1,this.dispatchEvent(new Event("closed"))}connectedCallback(){super.connectedCallback(),this.isConnectedPromiseResolve()}disconnectedCallback(){super.disconnectedCallback(),this.isConnectedPromise=this.getIsConnectedPromise()}render(){const e=this.open&&!(this.isAtScrollTop&&this.isAtScrollBottom),i={"has-headline":this.hasHeadline,"has-actions":this.hasActions,"has-icon":this.hasIcon,scrollable:e,"show-top-divider":e&&!this.isAtScrollTop,"show-bottom-divider":e&&!this.isAtScrollBottom},r=this.open&&!this.noFocusTrap,a=o`
      <div
        class="focus-trap"
        tabindex="0"
        aria-hidden="true"
        @focus=${this.handleFocusTrapFocus}></div>
    `,{ariaLabel:s}=this;return o`
      <div class="scrim"></div>
      <dialog
        class=${W(i)}
        aria-label=${s||l}
        aria-labelledby=${this.hasHeadline?"headline":l}
        role=${this.type==="alert"?"alertdialog":l}
        @cancel=${this.handleCancel}
        @click=${this.handleDialogClick}
        @close=${this.handleClose}
        @keydown=${this.handleKeydown}
        .returnValue=${this.returnValue||l}>
        ${r?a:l}
        <div class="container" @click=${this.handleContentClick}>
          <div class="headline">
            <div class="icon" aria-hidden="true">
              <slot name="icon" @slotchange=${this.handleIconChange}></slot>
            </div>
            <h2 id="headline" aria-hidden=${!this.hasHeadline||l}>
              <slot
                name="headline"
                @slotchange=${this.handleHeadlineChange}></slot>
            </h2>
            <md-divider></md-divider>
          </div>
          <div class="scroller">
            <div class="content">
              <div class="top anchor"></div>
              <slot name="content"></slot>
              <div class="bottom anchor"></div>
            </div>
          </div>
          <div class="actions">
            <md-divider></md-divider>
            <slot name="actions" @slotchange=${this.handleActionsChange}></slot>
          </div>
        </div>
        ${r?a:l}
      </dialog>
    `}firstUpdated(){this.intersectionObserver=new IntersectionObserver(e=>{for(const i of e)this.handleAnchorIntersection(i)},{root:this.scroller}),this.intersectionObserver.observe(this.topAnchor),this.intersectionObserver.observe(this.bottomAnchor)}handleDialogClick(){if(this.nextClickIsFromContent){this.nextClickIsFromContent=!1;return}this.dispatchEvent(new Event("cancel",{cancelable:!0}))&&this.close()}handleContentClick(){this.nextClickIsFromContent=!0}handleSubmit(e){const i=e.target,{submitter:r}=e;i.getAttribute("method")!=="dialog"||!r||this.close(r.getAttribute("value")??this.returnValue)}handleCancel(e){if(e.target!==this.dialog)return;this.escapePressedWithoutCancel=!1;const i=!wi(this,e);e.preventDefault(),!i&&this.close()}handleClose(){var e;this.escapePressedWithoutCancel&&(this.escapePressedWithoutCancel=!1,(e=this.dialog)==null||e.dispatchEvent(new Event("cancel",{cancelable:!0})))}handleKeydown(e){e.key==="Escape"&&(this.escapePressedWithoutCancel=!0,setTimeout(()=>{this.escapePressedWithoutCancel=!1}))}async animateDialog(e){var ve;if((ve=this.cancelAnimations)==null||ve.abort(),this.cancelAnimations=new AbortController,this.quick)return;const{dialog:i,scrim:r,container:a,headline:s,content:n,actions:p}=this;if(!i||!r||!a||!s||!n||!p)return;const{container:h,dialog:f,scrim:v,headline:u,content:g,actions:z}=e,G=[[i,f??[]],[r,v??[]],[a,h??[]],[s,u??[]],[n,g??[]],[p,z??[]]],fe=[];for(const[X,Ce]of G)for(const Nr of Ce){const Ci=X.animate(...Nr);this.cancelAnimations.signal.addEventListener("abort",()=>{Ci.cancel()}),fe.push(Ci)}await Promise.all(fe.map(X=>X.finished.catch(()=>{})))}handleHeadlineChange(e){const i=e.target;this.hasHeadline=i.assignedElements().length>0}handleActionsChange(e){const i=e.target;this.hasActions=i.assignedElements().length>0}handleIconChange(e){const i=e.target;this.hasIcon=i.assignedElements().length>0}handleAnchorIntersection(e){const{target:i,isIntersecting:r}=e;i===this.topAnchor&&(this.isAtScrollTop=r),i===this.bottomAnchor&&(this.isAtScrollBottom=r)}getIsConnectedPromise(){return new Promise(e=>{this.isConnectedPromiseResolve=e})}handleFocusTrapFocus(e){var u;const[i,r]=this.getFirstAndLastFocusableChildren();if(!i||!r){(u=this.dialog)==null||u.focus();return}const a=e.target===this.firstFocusTrap,s=!a,n=e.relatedTarget===i,p=e.relatedTarget===r,h=!n&&!p;if(s&&p||a&&h){i.focus();return}if(a&&n||s&&h){r.focus();return}}getFirstAndLastFocusableChildren(){if(!this.treewalker)return[null,null];let e=null,i=null;for(this.treewalker.currentNode=this.treewalker.root;this.treewalker.nextNode();){const r=this.treewalker.currentNode;go(r)&&(e||(e=r),i=r)}return[e,i]}}d([m({type:Boolean})],P.prototype,"open",null);d([m({type:Boolean})],P.prototype,"quick",void 0);d([m({attribute:!1})],P.prototype,"returnValue",void 0);d([m()],P.prototype,"type",void 0);d([m({type:Boolean,attribute:"no-focus-trap"})],P.prototype,"noFocusTrap",void 0);d([S("dialog")],P.prototype,"dialog",void 0);d([S(".scrim")],P.prototype,"scrim",void 0);d([S(".container")],P.prototype,"container",void 0);d([S(".headline")],P.prototype,"headline",void 0);d([S(".content")],P.prototype,"content",void 0);d([S(".actions")],P.prototype,"actions",void 0);d([c()],P.prototype,"isAtScrollTop",void 0);d([c()],P.prototype,"isAtScrollBottom",void 0);d([S(".scroller")],P.prototype,"scroller",void 0);d([S(".top.anchor")],P.prototype,"topAnchor",void 0);d([S(".bottom.anchor")],P.prototype,"bottomAnchor",void 0);d([S(".focus-trap")],P.prototype,"firstFocusTrap",void 0);d([c()],P.prototype,"hasHeadline",void 0);d([c()],P.prototype,"hasActions",void 0);d([c()],P.prototype,"hasIcon",void 0);function go(t){var s;const e=":is(button,input,select,textarea,object,:is(a,area)[href],[tabindex],[contenteditable=true])",i=":not(:disabled,[disabled])";return t.matches(e+i+':not([tabindex^="-"])')?!0:!t.localName.includes("-")||!t.matches(i)?!1:((s=t.shadowRoot)==null?void 0:s.delegatesFocus)??!1}/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const yo=y`:host{border-start-start-radius:var(--md-dialog-container-shape-start-start, var(--md-dialog-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));border-start-end-radius:var(--md-dialog-container-shape-start-end, var(--md-dialog-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));border-end-end-radius:var(--md-dialog-container-shape-end-end, var(--md-dialog-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));border-end-start-radius:var(--md-dialog-container-shape-end-start, var(--md-dialog-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));display:contents;margin:auto;max-height:min(560px,100% - 48px);max-width:min(560px,100% - 48px);min-height:140px;min-width:280px;position:fixed;height:fit-content;width:fit-content}dialog{background:rgba(0,0,0,0);border:none;border-radius:inherit;flex-direction:column;height:inherit;margin:inherit;max-height:inherit;max-width:inherit;min-height:inherit;min-width:inherit;outline:none;overflow:visible;padding:0;width:inherit}dialog[open]{display:flex}::backdrop{background:none}.scrim{background:var(--md-sys-color-scrim, #000);display:none;inset:0;opacity:32%;pointer-events:none;position:fixed;z-index:1}:host([open]) .scrim{display:flex}h2{all:unset;align-self:stretch}.headline{align-items:center;color:var(--md-dialog-headline-color, var(--md-sys-color-on-surface, #1d1b20));display:flex;flex-direction:column;font-family:var(--md-dialog-headline-font, var(--md-sys-typescale-headline-small-font, var(--md-ref-typeface-brand, Roboto)));font-size:var(--md-dialog-headline-size, var(--md-sys-typescale-headline-small-size, 1.5rem));line-height:var(--md-dialog-headline-line-height, var(--md-sys-typescale-headline-small-line-height, 2rem));font-weight:var(--md-dialog-headline-weight, var(--md-sys-typescale-headline-small-weight, var(--md-ref-typeface-weight-regular, 400)));position:relative}slot[name=headline]::slotted(*){align-items:center;align-self:stretch;box-sizing:border-box;display:flex;gap:8px;padding:24px 24px 0}.icon{display:flex}slot[name=icon]::slotted(*){color:var(--md-dialog-icon-color, var(--md-sys-color-secondary, #625b71));fill:currentColor;font-size:var(--md-dialog-icon-size, 24px);margin-top:24px;height:var(--md-dialog-icon-size, 24px);width:var(--md-dialog-icon-size, 24px)}.has-icon slot[name=headline]::slotted(*){justify-content:center;padding-top:16px}.scrollable slot[name=headline]::slotted(*){padding-bottom:16px}.scrollable.has-headline slot[name=content]::slotted(*){padding-top:8px}.container{border-radius:inherit;display:flex;flex-direction:column;flex-grow:1;overflow:hidden;position:relative;transform-origin:top}.container::before{background:var(--md-dialog-container-color, var(--md-sys-color-surface-container-high, #ece6f0));border-radius:inherit;content:"";inset:0;position:absolute}.scroller{display:flex;flex:1;flex-direction:column;overflow:hidden;z-index:1}.scrollable .scroller{overflow-y:scroll}.content{color:var(--md-dialog-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));font-family:var(--md-dialog-supporting-text-font, var(--md-sys-typescale-body-medium-font, var(--md-ref-typeface-plain, Roboto)));font-size:var(--md-dialog-supporting-text-size, var(--md-sys-typescale-body-medium-size, 0.875rem));line-height:var(--md-dialog-supporting-text-line-height, var(--md-sys-typescale-body-medium-line-height, 1.25rem));flex:1;font-weight:var(--md-dialog-supporting-text-weight, var(--md-sys-typescale-body-medium-weight, var(--md-ref-typeface-weight-regular, 400)));height:min-content;position:relative}slot[name=content]::slotted(*){box-sizing:border-box;padding:24px}.anchor{position:absolute}.top.anchor{top:0}.bottom.anchor{bottom:0}.actions{position:relative}slot[name=actions]::slotted(*){box-sizing:border-box;display:flex;gap:8px;justify-content:flex-end;padding:16px 24px 24px}.has-actions slot[name=content]::slotted(*){padding-bottom:8px}md-divider{display:none;position:absolute}.has-headline.show-top-divider .headline md-divider,.has-actions.show-bottom-divider .actions md-divider{display:flex}.headline md-divider{bottom:0}.actions md-divider{top:0}@media(forced-colors: active){dialog{outline:2px solid WindowText}}
`;/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let Xt=class extends P{};Xt.styles=[yo];Xt=d([C("md-dialog")],Xt);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const xo=he(k);class oe extends xo{get rippleDisabled(){return this.disabled||this.softDisabled}constructor(){super(),this.disabled=!1,this.softDisabled=!1,this.alwaysFocusable=!1,this.label="",this.hasIcon=!1,this.addEventListener("click",this.handleClick.bind(this))}focus(e){this.disabled&&!this.alwaysFocusable||super.focus(e)}render(){return o`
      <div class="container ${W(this.getContainerClasses())}">
        ${this.renderContainerContent()}
      </div>
    `}updated(e){e.has("disabled")&&e.get("disabled")!==void 0&&this.dispatchEvent(new Event("update-focus",{bubbles:!0}))}getContainerClasses(){return{disabled:this.disabled||this.softDisabled,"has-icon":this.hasIcon}}renderContainerContent(){return o`
      ${this.renderOutline()}
      <md-focus-ring part="focus-ring" for=${this.primaryId}></md-focus-ring>
      <md-ripple
        for=${this.primaryId}
        ?disabled=${this.rippleDisabled}></md-ripple>
      ${this.renderPrimaryAction(this.renderPrimaryContent())}
    `}renderOutline(){return o`<span class="outline"></span>`}renderLeadingIcon(){return o`<slot name="icon" @slotchange=${this.handleIconChange}></slot>`}renderPrimaryContent(){return o`
      <span class="leading icon" aria-hidden="true">
        ${this.renderLeadingIcon()}
      </span>
      <span class="label">
        <span class="label-text" id="label">
          ${this.label?this.label:o`<slot></slot>`}
        </span>
      </span>
      <span class="touch"></span>
    `}handleIconChange(e){const i=e.target;this.hasIcon=i.assignedElements({flatten:!0}).length>0}handleClick(e){if(this.softDisabled||this.disabled&&this.alwaysFocusable){e.stopImmediatePropagation(),e.preventDefault();return}}}oe.shadowRootOptions={...k.shadowRootOptions,delegatesFocus:!0};d([m({type:Boolean,reflect:!0})],oe.prototype,"disabled",void 0);d([m({type:Boolean,attribute:"soft-disabled",reflect:!0})],oe.prototype,"softDisabled",void 0);d([m({type:Boolean,attribute:"always-focusable"})],oe.prototype,"alwaysFocusable",void 0);d([m()],oe.prototype,"label",void 0);d([m({type:Boolean,reflect:!0,attribute:"has-icon"})],oe.prototype,"hasIcon",void 0);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class ur extends k{get chips(){return this.childElements.filter(e=>e instanceof oe)}constructor(){super(),this.internals=this.attachInternals(),this.addEventListener("focusin",this.updateTabIndices.bind(this)),this.addEventListener("update-focus",this.updateTabIndices.bind(this)),this.addEventListener("keydown",this.handleKeyDown.bind(this)),this.internals.role="toolbar"}render(){return o`<slot @slotchange=${this.updateTabIndices}></slot>`}handleKeyDown(e){const i=e.key==="ArrowLeft",r=e.key==="ArrowRight",a=e.key==="Home",s=e.key==="End";if(!i&&!r&&!a&&!s)return;const{chips:n}=this;if(n.length<2)return;if(e.preventDefault(),a||s){const g=a?0:n.length-1;n[g].focus({trailing:s}),this.updateTabIndices();return}const h=getComputedStyle(this).direction==="rtl"?i:r,f=n.find(g=>g.matches(":focus-within"));if(!f){(h?n[0]:n[n.length-1]).focus({trailing:!h}),this.updateTabIndices();return}const v=n.indexOf(f);let u=h?v+1:v-1;for(;u!==v;){u>=n.length?u=0:u<0&&(u=n.length-1);const g=n[u];if(g.disabled&&!g.alwaysFocusable){h?u++:u--;continue}g.focus({trailing:!h}),this.updateTabIndices();break}}updateTabIndices(){const{chips:e}=this;let i;for(const r of e){const a=r.alwaysFocusable||!r.disabled;if(r.matches(":focus-within")&&a){i=r;continue}a&&!i&&(i=r),r.tabIndex=-1}i&&(i.tabIndex=0)}}d([pe()],ur.prototype,"childElements",void 0);/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const wo=y`:host{display:flex;flex-wrap:wrap;gap:8px}
`;/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let Zt=class extends ur{};Zt.styles=[wo];Zt=d([C("md-chip-set")],Zt);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Ke extends oe{constructor(){super(...arguments),this.elevated=!1,this.href="",this.download="",this.target=""}get primaryId(){return this.href?"link":"button"}get rippleDisabled(){return!this.href&&(this.disabled||this.softDisabled)}getContainerClasses(){return{...super.getContainerClasses(),disabled:!this.href&&(this.disabled||this.softDisabled),elevated:this.elevated,link:!!this.href}}renderPrimaryAction(e){const{ariaLabel:i}=this;return this.href?o`
        <a
          class="primary action"
          id="link"
          aria-label=${i||l}
          href=${this.href}
          download=${this.download||l}
          target=${this.target||l}
          >${e}</a
        >
      `:o`
      <button
        class="primary action"
        id="button"
        aria-label=${i||l}
        aria-disabled=${this.softDisabled||l}
        ?disabled=${this.disabled&&!this.alwaysFocusable}
        type="button"
        >${e}</button
      >
    `}renderOutline(){return this.elevated?o`<md-elevation part="elevation"></md-elevation>`:super.renderOutline()}}d([m({type:Boolean})],Ke.prototype,"elevated",void 0);d([m()],Ke.prototype,"href",void 0);d([m()],Ke.prototype,"download",void 0);d([m()],Ke.prototype,"target",void 0);/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const _o=y`:host{--_container-height: var(--md-assist-chip-container-height, 32px);--_disabled-label-text-color: var(--md-assist-chip-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-assist-chip-disabled-label-text-opacity, 0.38);--_elevated-container-color: var(--md-assist-chip-elevated-container-color, var(--md-sys-color-surface-container-low, #f7f2fa));--_elevated-container-elevation: var(--md-assist-chip-elevated-container-elevation, 1);--_elevated-container-shadow-color: var(--md-assist-chip-elevated-container-shadow-color, var(--md-sys-color-shadow, #000));--_elevated-disabled-container-color: var(--md-assist-chip-elevated-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));--_elevated-disabled-container-elevation: var(--md-assist-chip-elevated-disabled-container-elevation, 0);--_elevated-disabled-container-opacity: var(--md-assist-chip-elevated-disabled-container-opacity, 0.12);--_elevated-focus-container-elevation: var(--md-assist-chip-elevated-focus-container-elevation, 1);--_elevated-hover-container-elevation: var(--md-assist-chip-elevated-hover-container-elevation, 2);--_elevated-pressed-container-elevation: var(--md-assist-chip-elevated-pressed-container-elevation, 1);--_focus-label-text-color: var(--md-assist-chip-focus-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-label-text-color: var(--md-assist-chip-hover-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-state-layer-color: var(--md-assist-chip-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-state-layer-opacity: var(--md-assist-chip-hover-state-layer-opacity, 0.08);--_label-text-color: var(--md-assist-chip-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_label-text-font: var(--md-assist-chip-label-text-font, var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-assist-chip-label-text-line-height, var(--md-sys-typescale-label-large-line-height, 1.25rem));--_label-text-size: var(--md-assist-chip-label-text-size, var(--md-sys-typescale-label-large-size, 0.875rem));--_label-text-weight: var(--md-assist-chip-label-text-weight, var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)));--_pressed-label-text-color: var(--md-assist-chip-pressed-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_pressed-state-layer-color: var(--md-assist-chip-pressed-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_pressed-state-layer-opacity: var(--md-assist-chip-pressed-state-layer-opacity, 0.12);--_disabled-outline-color: var(--md-assist-chip-disabled-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-outline-opacity: var(--md-assist-chip-disabled-outline-opacity, 0.12);--_focus-outline-color: var(--md-assist-chip-focus-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_outline-color: var(--md-assist-chip-outline-color, var(--md-sys-color-outline, #79747e));--_outline-width: var(--md-assist-chip-outline-width, 1px);--_disabled-leading-icon-color: var(--md-assist-chip-disabled-leading-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-leading-icon-opacity: var(--md-assist-chip-disabled-leading-icon-opacity, 0.38);--_focus-leading-icon-color: var(--md-assist-chip-focus-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_hover-leading-icon-color: var(--md-assist-chip-hover-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_leading-icon-color: var(--md-assist-chip-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-size: var(--md-assist-chip-icon-size, 18px);--_pressed-leading-icon-color: var(--md-assist-chip-pressed-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_container-shape-start-start: var(--md-assist-chip-container-shape-start-start, var(--md-assist-chip-container-shape, var(--md-sys-shape-corner-small, 8px)));--_container-shape-start-end: var(--md-assist-chip-container-shape-start-end, var(--md-assist-chip-container-shape, var(--md-sys-shape-corner-small, 8px)));--_container-shape-end-end: var(--md-assist-chip-container-shape-end-end, var(--md-assist-chip-container-shape, var(--md-sys-shape-corner-small, 8px)));--_container-shape-end-start: var(--md-assist-chip-container-shape-end-start, var(--md-assist-chip-container-shape, var(--md-sys-shape-corner-small, 8px)));--_leading-space: var(--md-assist-chip-leading-space, 16px);--_trailing-space: var(--md-assist-chip-trailing-space, 16px);--_icon-label-space: var(--md-assist-chip-icon-label-space, 8px);--_with-leading-icon-leading-space: var(--md-assist-chip-with-leading-icon-leading-space, 8px)}@media(forced-colors: active){.link .outline{border-color:ActiveText}}
`;/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const mr=y`.elevated{--md-elevation-level: var(--_elevated-container-elevation);--md-elevation-shadow-color: var(--_elevated-container-shadow-color)}.elevated::before{background:var(--_elevated-container-color)}.elevated:hover{--md-elevation-level: var(--_elevated-hover-container-elevation)}.elevated:focus-within{--md-elevation-level: var(--_elevated-focus-container-elevation)}.elevated:active{--md-elevation-level: var(--_elevated-pressed-container-elevation)}.elevated.disabled{--md-elevation-level: var(--_elevated-disabled-container-elevation)}.elevated.disabled::before{background:var(--_elevated-disabled-container-color);opacity:var(--_elevated-disabled-container-opacity)}@media(forced-colors: active){.elevated md-elevation{border:1px solid CanvasText}.elevated.disabled md-elevation{border-color:GrayText}}
`;/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const fr=y`:host{border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end);display:inline-flex;height:var(--_container-height);cursor:pointer;-webkit-tap-highlight-color:rgba(0,0,0,0);--md-ripple-hover-color: var(--_hover-state-layer-color);--md-ripple-hover-opacity: var(--_hover-state-layer-opacity);--md-ripple-pressed-color: var(--_pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_pressed-state-layer-opacity)}:host(:is([disabled],[soft-disabled])){pointer-events:none}:host([touch-target=wrapper]){margin:max(0px,(48px - var(--_container-height))/2) 0}md-focus-ring{--md-focus-ring-shape-start-start: var(--_container-shape-start-start);--md-focus-ring-shape-start-end: var(--_container-shape-start-end);--md-focus-ring-shape-end-end: var(--_container-shape-end-end);--md-focus-ring-shape-end-start: var(--_container-shape-end-start)}.container{border-radius:inherit;box-sizing:border-box;display:flex;height:100%;position:relative;width:100%}.container::before{border-radius:inherit;content:"";inset:0;pointer-events:none;position:absolute}.container:not(.disabled){cursor:pointer}.container.disabled{pointer-events:none}.cell{display:flex}.action{align-items:baseline;appearance:none;background:none;border:none;border-radius:inherit;display:flex;outline:none;padding:0;position:relative;text-decoration:none}.primary.action{min-width:0;padding-inline-start:var(--_leading-space);padding-inline-end:var(--_trailing-space)}.has-icon .primary.action{padding-inline-start:var(--_with-leading-icon-leading-space)}.touch{height:48px;inset:50% 0 0;position:absolute;transform:translateY(-50%);width:100%}:host([touch-target=none]) .touch{display:none}.outline{border:var(--_outline-width) solid var(--_outline-color);border-radius:inherit;inset:0;pointer-events:none;position:absolute}:where(:focus) .outline{border-color:var(--_focus-outline-color)}:where(.disabled) .outline{border-color:var(--_disabled-outline-color);opacity:var(--_disabled-outline-opacity)}md-ripple{border-radius:inherit}.label,.icon,.touch{z-index:1}.label{align-items:center;color:var(--_label-text-color);display:flex;font-family:var(--_label-text-font);font-size:var(--_label-text-size);font-weight:var(--_label-text-weight);height:100%;line-height:var(--_label-text-line-height);overflow:hidden;user-select:none}.label-text{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}:where(:hover) .label{color:var(--_hover-label-text-color)}:where(:focus) .label{color:var(--_focus-label-text-color)}:where(:active) .label{color:var(--_pressed-label-text-color)}:where(.disabled) .label{color:var(--_disabled-label-text-color);opacity:var(--_disabled-label-text-opacity)}.icon{align-self:center;display:flex;fill:currentColor;position:relative}.icon ::slotted(:first-child){font-size:var(--_icon-size);height:var(--_icon-size);width:var(--_icon-size)}.leading.icon{color:var(--_leading-icon-color)}.leading.icon ::slotted(*),.leading.icon svg{margin-inline-end:var(--_icon-label-space)}:where(:hover) .leading.icon{color:var(--_hover-leading-icon-color)}:where(:focus) .leading.icon{color:var(--_focus-leading-icon-color)}:where(:active) .leading.icon{color:var(--_pressed-leading-icon-color)}:where(.disabled) .leading.icon{color:var(--_disabled-leading-icon-color);opacity:var(--_disabled-leading-icon-opacity)}@media(forced-colors: active){:where(.disabled) :is(.label,.outline,.leading.icon){color:GrayText;opacity:1}}a,button{text-transform:inherit}a,button:not(:disabled,[aria-disabled=true]){cursor:inherit}
`;/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let Qt=class extends Ke{};Qt.styles=[fr,mr,_o];Qt=d([C("md-assist-chip")],Qt);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const it="aria-label-remove";class $o extends oe{get ariaLabelRemove(){if(this.hasAttribute(it))return this.getAttribute(it);const{ariaLabel:e}=this;return e||this.label?`Remove ${e||this.label}`:null}set ariaLabelRemove(e){const i=this.ariaLabelRemove;e!==i&&(e===null?this.removeAttribute(it):this.setAttribute(it,e),this.requestUpdate())}constructor(){super(),this.handleTrailingActionFocus=this.handleTrailingActionFocus.bind(this),this.addEventListener("keydown",this.handleKeyDown.bind(this))}focus(e){if((this.alwaysFocusable||!this.disabled)&&(e!=null&&e.trailing)&&this.trailingAction){this.trailingAction.focus(e);return}super.focus(e)}renderContainerContent(){return o`
      ${super.renderContainerContent()}
      ${this.renderTrailingAction(this.handleTrailingActionFocus)}
    `}handleKeyDown(e){var f,v;const i=e.key==="ArrowLeft",r=e.key==="ArrowRight";if(!i&&!r||!this.primaryAction||!this.trailingAction)return;const s=getComputedStyle(this).direction==="rtl"?i:r,n=(f=this.primaryAction)==null?void 0:f.matches(":focus-within"),p=(v=this.trailingAction)==null?void 0:v.matches(":focus-within");if(s&&p||!s&&n)return;e.preventDefault(),e.stopPropagation(),(s?this.trailingAction:this.primaryAction).focus()}handleTrailingActionFocus(){const{primaryAction:e,trailingAction:i}=this;!e||!i||(e.tabIndex=-1,i.addEventListener("focusout",()=>{e.tabIndex=0},{once:!0}))}}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function ko({ariaLabel:t,disabled:e,focusListener:i,tabbable:r=!1}){return o`
    <span id="remove-label" hidden aria-hidden="true">Remove</span>
    <button
      class="trailing action"
      aria-label=${t||l}
      aria-labelledby=${t?l:"remove-label label"}
      tabindex=${r?l:-1}
      @click=${Co}
      @focus=${i}>
      <md-focus-ring part="trailing-focus-ring"></md-focus-ring>
      <md-ripple ?disabled=${e}></md-ripple>
      <span class="trailing icon" aria-hidden="true">
        <slot name="remove-trailing-icon">
          <svg viewBox="0 96 960 960">
            <path
              d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z" />
          </svg>
        </slot>
      </span>
      <span class="touch"></span>
    </button>
  `}function Co(t){this.disabled||this.softDisabled||(t.stopPropagation(),!this.dispatchEvent(new Event("remove",{cancelable:!0})))||this.remove()}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class $e extends $o{constructor(){super(...arguments),this.elevated=!1,this.removable=!1,this.selected=!1,this.hasSelectedIcon=!1}get primaryId(){return"button"}getContainerClasses(){return{...super.getContainerClasses(),elevated:this.elevated,selected:this.selected,"has-trailing":this.removable,"has-icon":this.hasIcon||this.selected}}renderPrimaryAction(e){const{ariaLabel:i}=this;return o`
      <button
        class="primary action"
        id="button"
        aria-label=${i||l}
        aria-pressed=${this.selected}
        aria-disabled=${this.softDisabled||l}
        ?disabled=${this.disabled&&!this.alwaysFocusable}
        @click=${this.handleClickOnChild}
        >${e}</button
      >
    `}renderLeadingIcon(){return this.selected?o`
      <slot name="selected-icon">
        <svg class="checkmark" viewBox="0 0 18 18" aria-hidden="true">
          <path
            d="M6.75012 12.1274L3.62262 8.99988L2.55762 10.0574L6.75012 14.2499L15.7501 5.24988L14.6926 4.19238L6.75012 12.1274Z" />
        </svg>
      </slot>
    `:super.renderLeadingIcon()}renderTrailingAction(e){return this.removable?ko({focusListener:e,ariaLabel:this.ariaLabelRemove,disabled:this.disabled||this.softDisabled}):l}renderOutline(){return this.elevated?o`<md-elevation part="elevation"></md-elevation>`:super.renderOutline()}handleClickOnChild(e){if(this.disabled||this.softDisabled)return;const i=this.selected;if(this.selected=!this.selected,!wi(this,e)){this.selected=i;return}}}d([m({type:Boolean})],$e.prototype,"elevated",void 0);d([m({type:Boolean})],$e.prototype,"removable",void 0);d([m({type:Boolean,reflect:!0})],$e.prototype,"selected",void 0);d([m({type:Boolean,reflect:!0,attribute:"has-selected-icon"})],$e.prototype,"hasSelectedIcon",void 0);d([S(".primary.action")],$e.prototype,"primaryAction",void 0);d([S(".trailing.action")],$e.prototype,"trailingAction",void 0);/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const zo=y`:host{--_container-height: var(--md-filter-chip-container-height, 32px);--_disabled-label-text-color: var(--md-filter-chip-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-filter-chip-disabled-label-text-opacity, 0.38);--_elevated-container-elevation: var(--md-filter-chip-elevated-container-elevation, 1);--_elevated-container-shadow-color: var(--md-filter-chip-elevated-container-shadow-color, var(--md-sys-color-shadow, #000));--_elevated-disabled-container-color: var(--md-filter-chip-elevated-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));--_elevated-disabled-container-elevation: var(--md-filter-chip-elevated-disabled-container-elevation, 0);--_elevated-disabled-container-opacity: var(--md-filter-chip-elevated-disabled-container-opacity, 0.12);--_elevated-focus-container-elevation: var(--md-filter-chip-elevated-focus-container-elevation, 1);--_elevated-hover-container-elevation: var(--md-filter-chip-elevated-hover-container-elevation, 2);--_elevated-pressed-container-elevation: var(--md-filter-chip-elevated-pressed-container-elevation, 1);--_elevated-selected-container-color: var(--md-filter-chip-elevated-selected-container-color, var(--md-sys-color-secondary-container, #e8def8));--_label-text-font: var(--md-filter-chip-label-text-font, var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-filter-chip-label-text-line-height, var(--md-sys-typescale-label-large-line-height, 1.25rem));--_label-text-size: var(--md-filter-chip-label-text-size, var(--md-sys-typescale-label-large-size, 0.875rem));--_label-text-weight: var(--md-filter-chip-label-text-weight, var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)));--_selected-focus-label-text-color: var(--md-filter-chip-selected-focus-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-hover-label-text-color: var(--md-filter-chip-selected-hover-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-hover-state-layer-color: var(--md-filter-chip-selected-hover-state-layer-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-hover-state-layer-opacity: var(--md-filter-chip-selected-hover-state-layer-opacity, 0.08);--_selected-label-text-color: var(--md-filter-chip-selected-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-pressed-label-text-color: var(--md-filter-chip-selected-pressed-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-pressed-state-layer-color: var(--md-filter-chip-selected-pressed-state-layer-color, var(--md-sys-color-on-surface-variant, #49454f));--_selected-pressed-state-layer-opacity: var(--md-filter-chip-selected-pressed-state-layer-opacity, 0.12);--_elevated-container-color: var(--md-filter-chip-elevated-container-color, var(--md-sys-color-surface-container-low, #f7f2fa));--_disabled-outline-color: var(--md-filter-chip-disabled-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-outline-opacity: var(--md-filter-chip-disabled-outline-opacity, 0.12);--_disabled-selected-container-color: var(--md-filter-chip-disabled-selected-container-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-selected-container-opacity: var(--md-filter-chip-disabled-selected-container-opacity, 0.12);--_focus-outline-color: var(--md-filter-chip-focus-outline-color, var(--md-sys-color-on-surface-variant, #49454f));--_outline-color: var(--md-filter-chip-outline-color, var(--md-sys-color-outline, #79747e));--_outline-width: var(--md-filter-chip-outline-width, 1px);--_selected-container-color: var(--md-filter-chip-selected-container-color, var(--md-sys-color-secondary-container, #e8def8));--_selected-outline-width: var(--md-filter-chip-selected-outline-width, 0px);--_focus-label-text-color: var(--md-filter-chip-focus-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-label-text-color: var(--md-filter-chip-hover-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-color: var(--md-filter-chip-hover-state-layer-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-opacity: var(--md-filter-chip-hover-state-layer-opacity, 0.08);--_label-text-color: var(--md-filter-chip-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-label-text-color: var(--md-filter-chip-pressed-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-state-layer-color: var(--md-filter-chip-pressed-state-layer-color, var(--md-sys-color-on-secondary-container, #1d192b));--_pressed-state-layer-opacity: var(--md-filter-chip-pressed-state-layer-opacity, 0.12);--_icon-size: var(--md-filter-chip-icon-size, 18px);--_disabled-leading-icon-color: var(--md-filter-chip-disabled-leading-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-leading-icon-opacity: var(--md-filter-chip-disabled-leading-icon-opacity, 0.38);--_selected-focus-leading-icon-color: var(--md-filter-chip-selected-focus-leading-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-hover-leading-icon-color: var(--md-filter-chip-selected-hover-leading-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-leading-icon-color: var(--md-filter-chip-selected-leading-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-pressed-leading-icon-color: var(--md-filter-chip-selected-pressed-leading-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_focus-leading-icon-color: var(--md-filter-chip-focus-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_hover-leading-icon-color: var(--md-filter-chip-hover-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_leading-icon-color: var(--md-filter-chip-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_pressed-leading-icon-color: var(--md-filter-chip-pressed-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_disabled-trailing-icon-color: var(--md-filter-chip-disabled-trailing-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-trailing-icon-opacity: var(--md-filter-chip-disabled-trailing-icon-opacity, 0.38);--_selected-focus-trailing-icon-color: var(--md-filter-chip-selected-focus-trailing-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-hover-trailing-icon-color: var(--md-filter-chip-selected-hover-trailing-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-pressed-trailing-icon-color: var(--md-filter-chip-selected-pressed-trailing-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-trailing-icon-color: var(--md-filter-chip-selected-trailing-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_focus-trailing-icon-color: var(--md-filter-chip-focus-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-trailing-icon-color: var(--md-filter-chip-hover-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-trailing-icon-color: var(--md-filter-chip-pressed-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_trailing-icon-color: var(--md-filter-chip-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_container-shape-start-start: var(--md-filter-chip-container-shape-start-start, var(--md-filter-chip-container-shape, var(--md-sys-shape-corner-small, 8px)));--_container-shape-start-end: var(--md-filter-chip-container-shape-start-end, var(--md-filter-chip-container-shape, var(--md-sys-shape-corner-small, 8px)));--_container-shape-end-end: var(--md-filter-chip-container-shape-end-end, var(--md-filter-chip-container-shape, var(--md-sys-shape-corner-small, 8px)));--_container-shape-end-start: var(--md-filter-chip-container-shape-end-start, var(--md-filter-chip-container-shape, var(--md-sys-shape-corner-small, 8px)));--_leading-space: var(--md-filter-chip-leading-space, 16px);--_trailing-space: var(--md-filter-chip-trailing-space, 16px);--_icon-label-space: var(--md-filter-chip-icon-label-space, 8px);--_with-leading-icon-leading-space: var(--md-filter-chip-with-leading-icon-leading-space, 8px);--_with-trailing-icon-trailing-space: var(--md-filter-chip-with-trailing-icon-trailing-space, 8px)}.selected.elevated::before{background:var(--_elevated-selected-container-color)}.checkmark{height:var(--_icon-size);width:var(--_icon-size)}.disabled .checkmark{opacity:var(--_disabled-leading-icon-opacity)}@media(forced-colors: active){.disabled .checkmark{opacity:1}}
`;/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const To=y`.selected{--md-ripple-hover-color: var(--_selected-hover-state-layer-color);--md-ripple-hover-opacity: var(--_selected-hover-state-layer-opacity);--md-ripple-pressed-color: var(--_selected-pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_selected-pressed-state-layer-opacity)}:where(.selected)::before{background:var(--_selected-container-color)}:where(.selected) .outline{border-width:var(--_selected-outline-width)}:where(.selected.disabled)::before{background:var(--_disabled-selected-container-color);opacity:var(--_disabled-selected-container-opacity)}:where(.selected) .label{color:var(--_selected-label-text-color)}:where(.selected:hover) .label{color:var(--_selected-hover-label-text-color)}:where(.selected:focus) .label{color:var(--_selected-focus-label-text-color)}:where(.selected:active) .label{color:var(--_selected-pressed-label-text-color)}:where(.selected) .leading.icon{color:var(--_selected-leading-icon-color)}:where(.selected:hover) .leading.icon{color:var(--_selected-hover-leading-icon-color)}:where(.selected:focus) .leading.icon{color:var(--_selected-focus-leading-icon-color)}:where(.selected:active) .leading.icon{color:var(--_selected-pressed-leading-icon-color)}@media(forced-colors: active){:where(.selected:not(.elevated))::before{border:1px solid CanvasText}:where(.selected) .outline{border-width:1px}}
`;/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const So=y`.trailing.action{align-items:center;justify-content:center;padding-inline-start:var(--_icon-label-space);padding-inline-end:var(--_with-trailing-icon-trailing-space)}.trailing.action :is(md-ripple,md-focus-ring){border-radius:50%;height:calc(1.3333333333*var(--_icon-size));width:calc(1.3333333333*var(--_icon-size))}.trailing.action md-focus-ring{inset:unset}.has-trailing .primary.action{padding-inline-end:0}.trailing.icon{color:var(--_trailing-icon-color);height:var(--_icon-size);width:var(--_icon-size)}:where(:hover) .trailing.icon{color:var(--_hover-trailing-icon-color)}:where(:focus) .trailing.icon{color:var(--_focus-trailing-icon-color)}:where(:active) .trailing.icon{color:var(--_pressed-trailing-icon-color)}:where(.disabled) .trailing.icon{color:var(--_disabled-trailing-icon-color);opacity:var(--_disabled-trailing-icon-opacity)}:where(.selected) .trailing.icon{color:var(--_selected-trailing-icon-color)}:where(.selected:hover) .trailing.icon{color:var(--_selected-hover-trailing-icon-color)}:where(.selected:focus) .trailing.icon{color:var(--_selected-focus-trailing-icon-color)}:where(.selected:active) .trailing.icon{color:var(--_selected-pressed-trailing-icon-color)}@media(forced-colors: active){.trailing.icon{color:ButtonText}:where(.disabled) .trailing.icon{color:GrayText;opacity:1}}
`;/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let ei=class extends $e{};ei.styles=[fr,mr,So,To,zo];ei=d([C("md-filter-chip")],ei);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Ao=he(k);class Ye extends Ao{constructor(){super(...arguments),this.size="medium",this.label="",this.lowered=!1}render(){const{ariaLabel:e}=this;return o`
      <button
        class="fab ${W(this.getRenderClasses())}"
        aria-label=${e||l}>
        <md-elevation part="elevation"></md-elevation>
        <md-focus-ring part="focus-ring"></md-focus-ring>
        <md-ripple class="ripple"></md-ripple>
        ${this.renderTouchTarget()} ${this.renderIcon()} ${this.renderLabel()}
      </button>
    `}getRenderClasses(){const e=!!this.label;return{lowered:this.lowered,small:this.size==="small"&&!e,large:this.size==="large"&&!e,extended:e}}renderTouchTarget(){return o`<div class="touch-target"></div>`}renderLabel(){return this.label?o`<span class="label">${this.label}</span>`:""}renderIcon(){const{ariaLabel:e}=this;return o`<span class="icon">
      <slot
        name="icon"
        aria-hidden=${e||this.label?"true":l}>
        <span></span>
      </slot>
    </span>`}}Ye.shadowRootOptions={mode:"open",delegatesFocus:!0};d([m({reflect:!0})],Ye.prototype,"size",void 0);d([m()],Ye.prototype,"label",void 0);d([m({type:Boolean})],Ye.prototype,"lowered",void 0);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class vr extends Ye{constructor(){super(...arguments),this.variant="surface"}getRenderClasses(){return{...super.getRenderClasses(),primary:this.variant==="primary",secondary:this.variant==="secondary",tertiary:this.variant==="tertiary"}}}d([m()],vr.prototype,"variant",void 0);/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Io=y`:host{--_container-color: var(--md-fab-container-color, var(--md-sys-color-surface-container-high, #ece6f0));--_container-elevation: var(--md-fab-container-elevation, 3);--_container-height: var(--md-fab-container-height, 56px);--_container-shadow-color: var(--md-fab-container-shadow-color, var(--md-sys-color-shadow, #000));--_container-width: var(--md-fab-container-width, 56px);--_focus-container-elevation: var(--md-fab-focus-container-elevation, 3);--_focus-icon-color: var(--md-fab-focus-icon-color, var(--md-sys-color-primary, #6750a4));--_hover-container-elevation: var(--md-fab-hover-container-elevation, 4);--_hover-icon-color: var(--md-fab-hover-icon-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-color: var(--md-fab-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-opacity: var(--md-fab-hover-state-layer-opacity, 0.08);--_icon-color: var(--md-fab-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-size: var(--md-fab-icon-size, 24px);--_lowered-container-color: var(--md-fab-lowered-container-color, var(--md-sys-color-surface-container-low, #f7f2fa));--_lowered-container-elevation: var(--md-fab-lowered-container-elevation, 1);--_lowered-focus-container-elevation: var(--md-fab-lowered-focus-container-elevation, 1);--_lowered-hover-container-elevation: var(--md-fab-lowered-hover-container-elevation, 2);--_lowered-pressed-container-elevation: var(--md-fab-lowered-pressed-container-elevation, 1);--_pressed-container-elevation: var(--md-fab-pressed-container-elevation, 3);--_pressed-icon-color: var(--md-fab-pressed-icon-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-color: var(--md-fab-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-opacity: var(--md-fab-pressed-state-layer-opacity, 0.12);--_focus-label-text-color: var(--md-fab-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_hover-label-text-color: var(--md-fab-hover-label-text-color, var(--md-sys-color-primary, #6750a4));--_label-text-color: var(--md-fab-label-text-color, var(--md-sys-color-primary, #6750a4));--_label-text-font: var(--md-fab-label-text-font, var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-fab-label-text-line-height, var(--md-sys-typescale-label-large-line-height, 1.25rem));--_label-text-size: var(--md-fab-label-text-size, var(--md-sys-typescale-label-large-size, 0.875rem));--_label-text-weight: var(--md-fab-label-text-weight, var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)));--_large-container-height: var(--md-fab-large-container-height, 96px);--_large-container-width: var(--md-fab-large-container-width, 96px);--_large-icon-size: var(--md-fab-large-icon-size, 36px);--_pressed-label-text-color: var(--md-fab-pressed-label-text-color, var(--md-sys-color-primary, #6750a4));--_primary-container-color: var(--md-fab-primary-container-color, var(--md-sys-color-primary-container, #eaddff));--_primary-focus-icon-color: var(--md-fab-primary-focus-icon-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-focus-label-text-color: var(--md-fab-primary-focus-label-text-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-hover-icon-color: var(--md-fab-primary-hover-icon-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-hover-label-text-color: var(--md-fab-primary-hover-label-text-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-hover-state-layer-color: var(--md-fab-primary-hover-state-layer-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-icon-color: var(--md-fab-primary-icon-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-label-text-color: var(--md-fab-primary-label-text-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-pressed-icon-color: var(--md-fab-primary-pressed-icon-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-pressed-label-text-color: var(--md-fab-primary-pressed-label-text-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-pressed-state-layer-color: var(--md-fab-primary-pressed-state-layer-color, var(--md-sys-color-on-primary-container, #21005d));--_secondary-container-color: var(--md-fab-secondary-container-color, var(--md-sys-color-secondary-container, #e8def8));--_secondary-focus-icon-color: var(--md-fab-secondary-focus-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-focus-label-text-color: var(--md-fab-secondary-focus-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-hover-icon-color: var(--md-fab-secondary-hover-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-hover-label-text-color: var(--md-fab-secondary-hover-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-hover-state-layer-color: var(--md-fab-secondary-hover-state-layer-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-icon-color: var(--md-fab-secondary-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-label-text-color: var(--md-fab-secondary-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-pressed-icon-color: var(--md-fab-secondary-pressed-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-pressed-label-text-color: var(--md-fab-secondary-pressed-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-pressed-state-layer-color: var(--md-fab-secondary-pressed-state-layer-color, var(--md-sys-color-on-secondary-container, #1d192b));--_small-container-height: var(--md-fab-small-container-height, 40px);--_small-container-width: var(--md-fab-small-container-width, 40px);--_small-icon-size: var(--md-fab-small-icon-size, 24px);--_tertiary-container-color: var(--md-fab-tertiary-container-color, var(--md-sys-color-tertiary-container, #ffd8e4));--_tertiary-focus-icon-color: var(--md-fab-tertiary-focus-icon-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-focus-label-text-color: var(--md-fab-tertiary-focus-label-text-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-hover-icon-color: var(--md-fab-tertiary-hover-icon-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-hover-label-text-color: var(--md-fab-tertiary-hover-label-text-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-hover-state-layer-color: var(--md-fab-tertiary-hover-state-layer-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-icon-color: var(--md-fab-tertiary-icon-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-label-text-color: var(--md-fab-tertiary-label-text-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-pressed-icon-color: var(--md-fab-tertiary-pressed-icon-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-pressed-label-text-color: var(--md-fab-tertiary-pressed-label-text-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-pressed-state-layer-color: var(--md-fab-tertiary-pressed-state-layer-color, var(--md-sys-color-on-tertiary-container, #31111d));--_container-shape-start-start: var(--md-fab-container-shape-start-start, var(--md-fab-container-shape, var(--md-sys-shape-corner-large, 16px)));--_container-shape-start-end: var(--md-fab-container-shape-start-end, var(--md-fab-container-shape, var(--md-sys-shape-corner-large, 16px)));--_container-shape-end-end: var(--md-fab-container-shape-end-end, var(--md-fab-container-shape, var(--md-sys-shape-corner-large, 16px)));--_container-shape-end-start: var(--md-fab-container-shape-end-start, var(--md-fab-container-shape, var(--md-sys-shape-corner-large, 16px)));--_large-container-shape-start-start: var(--md-fab-large-container-shape-start-start, var(--md-fab-large-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));--_large-container-shape-start-end: var(--md-fab-large-container-shape-start-end, var(--md-fab-large-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));--_large-container-shape-end-end: var(--md-fab-large-container-shape-end-end, var(--md-fab-large-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));--_large-container-shape-end-start: var(--md-fab-large-container-shape-end-start, var(--md-fab-large-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));--_small-container-shape-start-start: var(--md-fab-small-container-shape-start-start, var(--md-fab-small-container-shape, var(--md-sys-shape-corner-medium, 12px)));--_small-container-shape-start-end: var(--md-fab-small-container-shape-start-end, var(--md-fab-small-container-shape, var(--md-sys-shape-corner-medium, 12px)));--_small-container-shape-end-end: var(--md-fab-small-container-shape-end-end, var(--md-fab-small-container-shape, var(--md-sys-shape-corner-medium, 12px)));--_small-container-shape-end-start: var(--md-fab-small-container-shape-end-start, var(--md-fab-small-container-shape, var(--md-sys-shape-corner-medium, 12px)));cursor:pointer}:host([size=small][touch-target=wrapper]){margin:max(0px,48px - var(--_small-container-height))}.fab .icon ::slotted(*){color:var(--_icon-color)}.fab:focus{color:var(--_focus-icon-color)}.fab:hover{color:var(--_hover-icon-color)}.fab:active{color:var(--_pressed-icon-color)}.fab{cursor:inherit}.fab.primary{background-color:var(--_primary-container-color);--md-ripple-hover-color: var(--_primary-hover-state-layer-color);--md-ripple-pressed-color: var(--_primary-pressed-state-layer-color)}.fab.primary .icon ::slotted(*){color:var(--_primary-icon-color)}.fab.primary:focus{color:var(--_primary-focus-icon-color)}.fab.primary:hover{color:var(--_primary-hover-icon-color)}.fab.primary:active{color:var(--_primary-pressed-icon-color)}.fab.primary .label{color:var(--_primary-label-text-color)}.fab:hover .fab.primary .label{color:var(--_primary-hover-label-text-color)}.fab:focus .fab.primary .label{color:var(--_primary-focus-label-text-color)}.fab:active .fab.primary .label{color:var(--_primary-pressed-label-text-color)}.fab.secondary{background-color:var(--_secondary-container-color);--md-ripple-hover-color: var(--_secondary-hover-state-layer-color);--md-ripple-pressed-color: var(--_secondary-pressed-state-layer-color)}.fab.secondary .icon ::slotted(*){color:var(--_secondary-icon-color)}.fab.secondary:focus{color:var(--_secondary-focus-icon-color)}.fab.secondary:hover{color:var(--_secondary-hover-icon-color)}.fab.secondary:active{color:var(--_secondary-pressed-icon-color)}.fab.secondary .label{color:var(--_secondary-label-text-color)}.fab:hover .fab.secondary .label{color:var(--_secondary-hover-label-text-color)}.fab:focus .fab.secondary .label{color:var(--_secondary-focus-label-text-color)}.fab:active .fab.secondary .label{color:var(--_secondary-pressed-label-text-color)}.fab.tertiary{background-color:var(--_tertiary-container-color);--md-ripple-hover-color: var(--_tertiary-hover-state-layer-color);--md-ripple-pressed-color: var(--_tertiary-pressed-state-layer-color)}.fab.tertiary .icon ::slotted(*){color:var(--_tertiary-icon-color)}.fab.tertiary:focus{color:var(--_tertiary-focus-icon-color)}.fab.tertiary:hover{color:var(--_tertiary-hover-icon-color)}.fab.tertiary:active{color:var(--_tertiary-pressed-icon-color)}.fab.tertiary .label{color:var(--_tertiary-label-text-color)}.fab:hover .fab.tertiary .label{color:var(--_tertiary-hover-label-text-color)}.fab:focus .fab.tertiary .label{color:var(--_tertiary-focus-label-text-color)}.fab:active .fab.tertiary .label{color:var(--_tertiary-pressed-label-text-color)}.fab.extended slot span{padding-inline-start:4px}.fab.small{width:var(--_small-container-width);height:var(--_small-container-height)}.fab.small .icon ::slotted(*){width:var(--_small-icon-size);height:var(--_small-icon-size);font-size:var(--_small-icon-size)}.fab.small,.fab.small .ripple{border-start-start-radius:var(--_small-container-shape-start-start);border-start-end-radius:var(--_small-container-shape-start-end);border-end-start-radius:var(--_small-container-shape-end-start);border-end-end-radius:var(--_small-container-shape-end-end)}.fab.small md-focus-ring{--md-focus-ring-shape-start-start: var(--_small-container-shape-start-start);--md-focus-ring-shape-start-end: var(--_small-container-shape-start-end);--md-focus-ring-shape-end-end: var(--_small-container-shape-end-end);--md-focus-ring-shape-end-start: var(--_small-container-shape-end-start)}
`;/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Eo=y`@media(forced-colors: active){.fab{border:1px solid ButtonText}.fab.extended{padding-inline-start:15px;padding-inline-end:19px}md-focus-ring{--md-focus-ring-outward-offset: 3px}}
`;/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Lo=y`:host{--md-ripple-hover-opacity: var(--_hover-state-layer-opacity);--md-ripple-pressed-opacity: var(--_pressed-state-layer-opacity);display:inline-flex;-webkit-tap-highlight-color:rgba(0,0,0,0)}:host([size=medium][touch-target=wrapper]){margin:max(0px,48px - var(--_container-height))}:host([size=large][touch-target=wrapper]){margin:max(0px,48px - var(--_large-container-height))}.fab,.icon,.icon ::slotted(*){display:flex}.fab{align-items:center;justify-content:center;vertical-align:middle;padding:0;position:relative;height:var(--_container-height);transition-property:background-color;border-width:0px;outline:none;z-index:0;text-transform:inherit}.fab.extended{width:inherit;box-sizing:border-box;padding-inline-start:16px;padding-inline-end:20px}.fab:not(.extended){width:var(--_container-width)}.fab.large{width:var(--_large-container-width);height:var(--_large-container-height)}.fab.large .icon ::slotted(*){width:var(--_large-icon-size);height:var(--_large-icon-size);font-size:var(--_large-icon-size)}.fab.large,.fab.large .ripple{border-start-start-radius:var(--_large-container-shape-start-start);border-start-end-radius:var(--_large-container-shape-start-end);border-end-start-radius:var(--_large-container-shape-end-start);border-end-end-radius:var(--_large-container-shape-end-end)}.fab.large md-focus-ring{--md-focus-ring-shape-start-start: var(--_large-container-shape-start-start);--md-focus-ring-shape-start-end: var(--_large-container-shape-start-end);--md-focus-ring-shape-end-end: var(--_large-container-shape-end-end);--md-focus-ring-shape-end-start: var(--_large-container-shape-end-start)}.fab{--md-elevation-level: var(--_container-elevation);--md-elevation-shadow-color: var(--_container-shadow-color)}.fab:focus{--md-elevation-level: var(--_focus-container-elevation)}.fab:hover{--md-elevation-level: var(--_hover-container-elevation)}.fab:active{--md-elevation-level: var(--_pressed-container-elevation)}.fab.lowered{background-color:var(--_lowered-container-color);--md-elevation-level: var(--_lowered-container-elevation)}.fab.lowered:focus{--md-elevation-level: var(--_lowered-focus-container-elevation)}.fab.lowered:hover{--md-elevation-level: var(--_lowered-hover-container-elevation)}.fab.lowered:active{--md-elevation-level: var(--_lowered-pressed-container-elevation)}.fab{background-color:var(--_container-color);--md-ripple-hover-color: var(--_hover-state-layer-color);--md-ripple-pressed-color: var(--_pressed-state-layer-color)}.fab .label{color:var(--_label-text-color)}.fab:hover .fab .label{color:var(--_hover-label-text-color)}.fab:focus .fab .label{color:var(--_focus-label-text-color)}.fab:active .fab .label{color:var(--_pressed-label-text-color)}.label{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-family:var(--_label-text-font);font-size:var(--_label-text-size);line-height:var(--_label-text-line-height);font-weight:var(--_label-text-weight)}.fab.extended .icon ::slotted(*){margin-inline-end:12px}.ripple{overflow:hidden}.ripple,md-elevation{z-index:-1}.touch-target{position:absolute;top:50%;height:48px;left:50%;width:48px;transform:translate(-50%, -50%)}:host([touch-target=none]) .touch-target{display:none}md-elevation,.fab{transition-duration:280ms;transition-timing-function:cubic-bezier(0.2, 0, 0, 1)}.fab,.ripple{border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end)}md-focus-ring{--md-focus-ring-shape-start-start: var(--_container-shape-start-start);--md-focus-ring-shape-start-end: var(--_container-shape-start-end);--md-focus-ring-shape-end-end: var(--_container-shape-end-end);--md-focus-ring-shape-end-start: var(--_container-shape-end-start)}.icon ::slotted(*){width:var(--_icon-size);height:var(--_icon-size);font-size:var(--_icon-size)}
`;/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let ti=class extends vr{};ti.styles=[Lo,Io,Eo];ti=d([C("md-fab")],ti);/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Po extends k{render(){return o`<slot></slot>`}connectedCallback(){if(super.connectedCallback(),this.getAttribute("aria-hidden")==="false"){this.removeAttribute("aria-hidden");return}this.setAttribute("aria-hidden","true")}}/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Oo=y`:host{font-size:var(--md-icon-size, 24px);width:var(--md-icon-size, 24px);height:var(--md-icon-size, 24px);color:inherit;font-variation-settings:inherit;font-weight:400;font-family:var(--md-icon-font, Material Symbols Outlined);display:inline-flex;font-style:normal;place-items:center;place-content:center;line-height:1;overflow:hidden;letter-spacing:normal;text-transform:none;user-select:none;white-space:nowrap;word-wrap:normal;flex-shrink:0;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale}::slotted(svg){fill:currentColor}::slotted(*){height:100%;width:100%}
`;/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let ii=class extends Po{};ii.styles=[Oo];ii=d([C("md-icon")],ii);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function br(t,e=se){const i=yr(t,e);return i&&(i.tabIndex=0,i.focus()),i}function gr(t,e=se){const i=Do(t,e);return i&&(i.tabIndex=0,i.focus()),i}function Tt(t,e=se){for(let i=0;i<t.length;i++){const r=t[i];if(r.tabIndex===0&&e(r))return{item:r,index:i}}return null}function yr(t,e=se){for(const i of t)if(e(i))return i;return null}function Do(t,e=se){for(let i=t.length-1;i>=0;i--){const r=t[i];if(e(r))return r}return null}function Ro(t,e,i=se,r=!0){for(let a=1;a<t.length;a++){const s=(a+e)%t.length;if(s<e&&!r)return null;const n=t[s];if(i(n))return n}return t[e]?t[e]:null}function Mo(t,e,i=se,r=!0){for(let a=1;a<t.length;a++){const s=(e-a+t.length)%t.length;if(s>e&&!r)return null;const n=t[s];if(i(n))return n}return t[e]?t[e]:null}function qi(t,e,i=se,r=!0){if(e){const a=Ro(t,e.index,i,r);return a&&(a.tabIndex=0,a.focus()),a}else return br(t,i)}function Vi(t,e,i=se,r=!0){if(e){const a=Mo(t,e.index,i,r);return a&&(a.tabIndex=0,a.focus()),a}else return gr(t,i)}function Fo(){return new Event("request-activation",{bubbles:!0,composed:!0})}function se(t){return!t.disabled}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const ie={ArrowDown:"ArrowDown",ArrowLeft:"ArrowLeft",ArrowUp:"ArrowUp",ArrowRight:"ArrowRight",Home:"Home",End:"End"};class No{constructor(e){this.handleKeydown=v=>{const u=v.key;if(v.defaultPrevented||!this.isNavigableKey(u))return;const g=this.items;if(!g.length)return;const z=Tt(g,this.isActivatable);v.preventDefault();const G=this.isRtl(),fe=G?ie.ArrowRight:ie.ArrowLeft,ve=G?ie.ArrowLeft:ie.ArrowRight;let X=null;switch(u){case ie.ArrowDown:case ve:X=qi(g,z,this.isActivatable,this.wrapNavigation());break;case ie.ArrowUp:case fe:X=Vi(g,z,this.isActivatable,this.wrapNavigation());break;case ie.Home:X=br(g,this.isActivatable);break;case ie.End:X=gr(g,this.isActivatable);break}X&&z&&z.item!==X&&(z.item.tabIndex=-1)},this.onDeactivateItems=()=>{const v=this.items;for(const u of v)this.deactivateItem(u)},this.onRequestActivation=v=>{this.onDeactivateItems();const u=v.target;this.activateItem(u),u.focus()},this.onSlotchange=()=>{const v=this.items;let u=!1;for(const z of v){if(!z.disabled&&z.tabIndex>-1&&!u){u=!0,z.tabIndex=0;continue}z.tabIndex=-1}if(u)return;const g=yr(v,this.isActivatable);g&&(g.tabIndex=0)};const{isItem:i,getPossibleItems:r,isRtl:a,deactivateItem:s,activateItem:n,isNavigableKey:p,isActivatable:h,wrapNavigation:f}=e;this.isItem=i,this.getPossibleItems=r,this.isRtl=a,this.deactivateItem=s,this.activateItem=n,this.isNavigableKey=p,this.isActivatable=h,this.wrapNavigation=f??(()=>!0)}get items(){const e=this.getPossibleItems(),i=[];for(const r of e){if(this.isItem(r)){i.push(r);continue}const s=r.item;s&&this.isItem(s)&&i.push(s)}return i}activateNextItem(){const e=this.items,i=Tt(e,this.isActivatable);return i&&(i.item.tabIndex=-1),qi(e,i,this.isActivatable,this.wrapNavigation())}activatePreviousItem(){const e=this.items,i=Tt(e,this.isActivatable);return i&&(i.item.tabIndex=-1),Vi(e,i,this.isActivatable,this.wrapNavigation())}}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Bo=new Set(Object.values(ie));class xr extends k{get items(){return this.listController.items}constructor(){super(),this.listController=new No({isItem:e=>e.hasAttribute("md-list-item"),getPossibleItems:()=>this.slotItems,isRtl:()=>getComputedStyle(this).direction==="rtl",deactivateItem:e=>{e.tabIndex=-1},activateItem:e=>{e.tabIndex=0},isNavigableKey:e=>Bo.has(e),isActivatable:e=>!e.disabled&&e.type!=="text"}),this.internals=this.attachInternals(),this.internals.role="list",this.addEventListener("keydown",this.listController.handleKeydown)}render(){return o`
      <slot
        @deactivate-items=${this.listController.onDeactivateItems}
        @request-activation=${this.listController.onRequestActivation}
        @slotchange=${this.listController.onSlotchange}>
      </slot>
    `}activateNextItem(){return this.listController.activateNextItem()}activatePreviousItem(){return this.listController.activatePreviousItem()}}d([pe({flatten:!0})],xr.prototype,"slotItems",void 0);/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Uo=y`:host{background:var(--md-list-container-color, var(--md-sys-color-surface, #fef7ff));color:unset;display:flex;flex-direction:column;outline:none;padding:8px 0;position:relative}
`;/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let ri=class extends xr{};ri.styles=[Uo];ri=d([C("md-list")],ri);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class _i extends k{constructor(){super(...arguments),this.multiline=!1}render(){return o`
      <slot name="container"></slot>
      <slot class="non-text" name="start"></slot>
      <div class="text">
        <slot name="overline" @slotchange=${this.handleTextSlotChange}></slot>
        <slot
          class="default-slot"
          @slotchange=${this.handleTextSlotChange}></slot>
        <slot name="headline" @slotchange=${this.handleTextSlotChange}></slot>
        <slot
          name="supporting-text"
          @slotchange=${this.handleTextSlotChange}></slot>
      </div>
      <slot class="non-text" name="trailing-supporting-text"></slot>
      <slot class="non-text" name="end"></slot>
    `}handleTextSlotChange(){let e=!1,i=0;for(const r of this.textSlots)if(jo(r)&&(i+=1),i>1){e=!0;break}this.multiline=e}}d([m({type:Boolean,reflect:!0})],_i.prototype,"multiline",void 0);d([Zr(".text slot")],_i.prototype,"textSlots",void 0);function jo(t){var e;for(const i of t.assignedNodes({flatten:!0})){const r=i.nodeType===Node.ELEMENT_NODE,a=i.nodeType===Node.TEXT_NODE&&((e=i.textContent)==null?void 0:e.match(/\S/));if(r||a)return!0}return!1}/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Ho=y`:host{color:var(--md-sys-color-on-surface, #1d1b20);font-family:var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto));font-size:var(--md-sys-typescale-body-large-size, 1rem);font-weight:var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400));line-height:var(--md-sys-typescale-body-large-line-height, 1.5rem);align-items:center;box-sizing:border-box;display:flex;gap:16px;min-height:56px;overflow:hidden;padding:12px 16px;position:relative;text-overflow:ellipsis}:host([multiline]){min-height:72px}[name=overline]{color:var(--md-sys-color-on-surface-variant, #49454f);font-family:var(--md-sys-typescale-label-small-font, var(--md-ref-typeface-plain, Roboto));font-size:var(--md-sys-typescale-label-small-size, 0.6875rem);font-weight:var(--md-sys-typescale-label-small-weight, var(--md-ref-typeface-weight-medium, 500));line-height:var(--md-sys-typescale-label-small-line-height, 1rem)}[name=supporting-text]{color:var(--md-sys-color-on-surface-variant, #49454f);font-family:var(--md-sys-typescale-body-medium-font, var(--md-ref-typeface-plain, Roboto));font-size:var(--md-sys-typescale-body-medium-size, 0.875rem);font-weight:var(--md-sys-typescale-body-medium-weight, var(--md-ref-typeface-weight-regular, 400));line-height:var(--md-sys-typescale-body-medium-line-height, 1.25rem)}[name=trailing-supporting-text]{color:var(--md-sys-color-on-surface-variant, #49454f);font-family:var(--md-sys-typescale-label-small-font, var(--md-ref-typeface-plain, Roboto));font-size:var(--md-sys-typescale-label-small-size, 0.6875rem);font-weight:var(--md-sys-typescale-label-small-weight, var(--md-ref-typeface-weight-medium, 500));line-height:var(--md-sys-typescale-label-small-line-height, 1rem)}[name=container]::slotted(*){inset:0;position:absolute}.default-slot{display:inline}.default-slot,.text ::slotted(*){overflow:hidden;text-overflow:ellipsis}.text{display:flex;flex:1;flex-direction:column;overflow:hidden}
`;/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let ai=class extends _i{};ai.styles=[Ho];ai=d([C("md-item")],ai);/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const qo=he(k);class ue extends qo{constructor(){super(...arguments),this.disabled=!1,this.type="text",this.isListItem=!0,this.href="",this.target=""}get isDisabled(){return this.disabled&&this.type!=="link"}willUpdate(e){this.href&&(this.type="link"),super.willUpdate(e)}render(){return this.renderListItem(o`
      <md-item>
        <div slot="container">
          ${this.renderRipple()} ${this.renderFocusRing()}
        </div>
        <slot name="start" slot="start"></slot>
        <slot name="end" slot="end"></slot>
        ${this.renderBody()}
      </md-item>
    `)}renderListItem(e){const i=this.type==="link";let r;switch(this.type){case"link":r=re`a`;break;case"button":r=re`button`;break;default:case"text":r=re`li`;break}const a=this.type!=="text",s=i&&this.target?this.target:l;return xi`
      <${r}
        id="item"
        tabindex="${this.isDisabled||!a?-1:0}"
        ?disabled=${this.isDisabled}
        role="listitem"
        aria-selected=${this.ariaSelected||l}
        aria-checked=${this.ariaChecked||l}
        aria-expanded=${this.ariaExpanded||l}
        aria-haspopup=${this.ariaHasPopup||l}
        class="list-item ${W(this.getRenderClasses())}"
        href=${this.href||l}
        target=${s}
        @focus=${this.onFocus}
      >${e}</${r}>
    `}renderRipple(){return this.type==="text"?l:o` <md-ripple
      part="ripple"
      for="item"
      ?disabled=${this.isDisabled}></md-ripple>`}renderFocusRing(){return this.type==="text"?l:o` <md-focus-ring
      @visibility-changed=${this.onFocusRingVisibilityChanged}
      part="focus-ring"
      for="item"
      inward></md-focus-ring>`}onFocusRingVisibilityChanged(e){}getRenderClasses(){return{disabled:this.isDisabled}}renderBody(){return o`
      <slot></slot>
      <slot name="overline" slot="overline"></slot>
      <slot name="headline" slot="headline"></slot>
      <slot name="supporting-text" slot="supporting-text"></slot>
      <slot
        name="trailing-supporting-text"
        slot="trailing-supporting-text"></slot>
    `}onFocus(){this.tabIndex===-1&&this.dispatchEvent(Fo())}focus(){var e;(e=this.listItemRoot)==null||e.focus()}click(){if(!this.listItemRoot){super.click();return}this.listItemRoot.click()}}ue.shadowRootOptions={...k.shadowRootOptions,delegatesFocus:!0};d([m({type:Boolean,reflect:!0})],ue.prototype,"disabled",void 0);d([m({reflect:!0})],ue.prototype,"type",void 0);d([m({type:Boolean,attribute:"md-list-item",reflect:!0})],ue.prototype,"isListItem",void 0);d([m()],ue.prototype,"href",void 0);d([m()],ue.prototype,"target",void 0);d([S(".list-item")],ue.prototype,"listItemRoot",void 0);/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Vo=y`:host{display:flex;-webkit-tap-highlight-color:rgba(0,0,0,0);--md-ripple-hover-color: var(--md-list-item-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--md-ripple-hover-opacity: var(--md-list-item-hover-state-layer-opacity, 0.08);--md-ripple-pressed-color: var(--md-list-item-pressed-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--md-ripple-pressed-opacity: var(--md-list-item-pressed-state-layer-opacity, 0.12)}:host(:is([type=button]:not([disabled]),[type=link])){cursor:pointer}md-focus-ring{z-index:1;--md-focus-ring-shape: 8px}a,button,li{background:none;border:none;cursor:inherit;padding:0;margin:0;text-align:unset;text-decoration:none}.list-item{border-radius:inherit;display:flex;flex:1;max-width:inherit;min-width:inherit;outline:none;-webkit-tap-highlight-color:rgba(0,0,0,0);width:100%}.list-item.interactive{cursor:pointer}.list-item.disabled{opacity:var(--md-list-item-disabled-opacity, 0.3);pointer-events:none}[slot=container]{pointer-events:none}md-ripple{border-radius:inherit}md-item{border-radius:inherit;flex:1;height:100%;color:var(--md-list-item-label-text-color, var(--md-sys-color-on-surface, #1d1b20));font-family:var(--md-list-item-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));font-size:var(--md-list-item-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));line-height:var(--md-list-item-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));font-weight:var(--md-list-item-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));min-height:var(--md-list-item-one-line-container-height, 56px);padding-top:var(--md-list-item-top-space, 12px);padding-bottom:var(--md-list-item-bottom-space, 12px);padding-inline-start:var(--md-list-item-leading-space, 16px);padding-inline-end:var(--md-list-item-trailing-space, 16px)}md-item[multiline]{min-height:var(--md-list-item-two-line-container-height, 72px)}[slot=supporting-text]{color:var(--md-list-item-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));font-family:var(--md-list-item-supporting-text-font, var(--md-sys-typescale-body-medium-font, var(--md-ref-typeface-plain, Roboto)));font-size:var(--md-list-item-supporting-text-size, var(--md-sys-typescale-body-medium-size, 0.875rem));line-height:var(--md-list-item-supporting-text-line-height, var(--md-sys-typescale-body-medium-line-height, 1.25rem));font-weight:var(--md-list-item-supporting-text-weight, var(--md-sys-typescale-body-medium-weight, var(--md-ref-typeface-weight-regular, 400)))}[slot=trailing-supporting-text]{color:var(--md-list-item-trailing-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));font-family:var(--md-list-item-trailing-supporting-text-font, var(--md-sys-typescale-label-small-font, var(--md-ref-typeface-plain, Roboto)));font-size:var(--md-list-item-trailing-supporting-text-size, var(--md-sys-typescale-label-small-size, 0.6875rem));line-height:var(--md-list-item-trailing-supporting-text-line-height, var(--md-sys-typescale-label-small-line-height, 1rem));font-weight:var(--md-list-item-trailing-supporting-text-weight, var(--md-sys-typescale-label-small-weight, var(--md-ref-typeface-weight-medium, 500)))}:is([slot=start],[slot=end])::slotted(*){fill:currentColor}[slot=start]{color:var(--md-list-item-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f))}[slot=end]{color:var(--md-list-item-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f))}@media(forced-colors: active){.disabled slot{color:GrayText}.list-item.disabled{color:GrayText;opacity:1}}
`;/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let oi=class extends ue{};oi.styles=[Vo];oi=d([C("md-list-item")],oi);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const rt=Symbol("isFocusable"),St=Symbol("privateIsFocusable"),at=Symbol("externalTabIndex"),ot=Symbol("isUpdatingTabIndex"),st=Symbol("updateTabIndex");function Go(t){var e,i,r;class a extends t{constructor(){super(...arguments),this[e]=!0,this[i]=null,this[r]=!1}get[rt](){return this[St]}set[rt](n){this[rt]!==n&&(this[St]=n,this[st]())}connectedCallback(){super.connectedCallback(),this[st]()}attributeChangedCallback(n,p,h){if(n!=="tabindex"){super.attributeChangedCallback(n,p,h);return}if(this.requestUpdate("tabIndex",Number(p??-1)),!this[ot]){if(!this.hasAttribute("tabindex")){this[at]=null,this[st]();return}this[at]=this.tabIndex}}[(e=St,i=at,r=ot,st)](){const n=this[rt]?0:-1,p=this[at]??n;this[ot]=!0,this.tabIndex=p,this[ot]=!1}}return d([m({noAccessor:!0})],a.prototype,"tabIndex",void 0),a}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const wr=Symbol("animateIndicator"),Ko=Go(k);class Q extends Ko{get selected(){return this.active}set selected(e){this.active=e}constructor(){super(),this.isTab=!0,this.active=!1,this.hasIcon=!1,this.iconOnly=!1,this.fullWidthIndicator=!1,this.internals=this.attachInternals(),this.internals.role="tab",this.addEventListener("keydown",this.handleKeydown.bind(this))}render(){const e=o`<div class="indicator"></div>`;return o`<div
      class="button"
      role="presentation"
      @click=${this.handleContentClick}>
      <md-focus-ring part="focus-ring" inward .control=${this}></md-focus-ring>
      <md-elevation part="elevation"></md-elevation>
      <md-ripple .control=${this}></md-ripple>
      <div
        class="content ${W(this.getContentClasses())}"
        role="presentation">
        <slot name="icon" @slotchange=${this.handleIconSlotChange}></slot>
        <slot @slotchange=${this.handleSlotChange}></slot>
        ${this.fullWidthIndicator?l:e}
      </div>
      ${this.fullWidthIndicator?e:l}
    </div>`}getContentClasses(){return{"has-icon":this.hasIcon,"has-label":!this.iconOnly}}updated(){this.internals.ariaSelected=String(this.active)}async handleKeydown(e){await 0,!e.defaultPrevented&&(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),this.click())}handleContentClick(e){e.stopPropagation(),this.click()}[wr](e){if(!this.indicator)return;this.indicator.getAnimations().forEach(r=>{r.cancel()});const i=this.getKeyframes(e);i!==null&&this.indicator.animate(i,{duration:250,easing:we.EMPHASIZED})}getKeyframes(e){var u;const i=Yo();if(!this.active)return i?[{opacity:1},{transform:"none"}]:null;const r={},a=((u=e.indicator)==null?void 0:u.getBoundingClientRect())??{},s=a.left,n=a.width,p=this.indicator.getBoundingClientRect(),h=p.left,f=p.width,v=n/f;return!i&&s!==void 0&&h!==void 0&&!isNaN(v)?r.transform=`translateX(${(s-h).toFixed(4)}px) scaleX(${v.toFixed(4)})`:r.opacity=0,[r,{transform:"none"}]}handleSlotChange(){this.iconOnly=!1;for(const e of this.assignedDefaultNodes){const i=e.nodeType===Node.TEXT_NODE&&!!e.wholeText.match(/\S/);if(e.nodeType===Node.ELEMENT_NODE||i)return}this.iconOnly=!0}handleIconSlotChange(){this.hasIcon=this.assignedIcons.length>0}}d([m({type:Boolean,reflect:!0,attribute:"md-tab"})],Q.prototype,"isTab",void 0);d([m({type:Boolean,reflect:!0})],Q.prototype,"active",void 0);d([m({type:Boolean})],Q.prototype,"selected",null);d([m({type:Boolean,attribute:"has-icon"})],Q.prototype,"hasIcon",void 0);d([m({type:Boolean,attribute:"icon-only"})],Q.prototype,"iconOnly",void 0);d([S(".indicator")],Q.prototype,"indicator",void 0);d([c()],Q.prototype,"fullWidthIndicator",void 0);d([Qr({flatten:!0})],Q.prototype,"assignedDefaultNodes",void 0);d([pe({slot:"icon",flatten:!0})],Q.prototype,"assignedIcons",void 0);function Yo(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Ie extends k{get activeTab(){return this.tabs.find(e=>e.active)??null}set activeTab(e){e&&this.activateTab(e)}get activeTabIndex(){return this.tabs.findIndex(e=>e.active)}set activeTabIndex(e){const i=()=>{const r=this.tabs[e];r&&this.activateTab(r)};if(!this.slotElement){this.updateComplete.then(i);return}i()}get focusedTab(){return this.tabs.find(e=>e.matches(":focus-within"))}constructor(){super(),this.autoActivate=!1,this.internals=this.attachInternals(),this.internals.role="tablist",this.addEventListener("keydown",this.handleKeydown.bind(this)),this.addEventListener("keyup",this.handleKeyup.bind(this)),this.addEventListener("focusout",this.handleFocusout.bind(this))}async scrollToTab(e){await this.updateComplete;const{tabs:i}=this;if(e??(e=this.activeTab),!e||!i.includes(e)||!this.tabsScrollerElement)return;for(const g of this.tabs)await g.updateComplete;const r=e.offsetLeft,a=e.offsetWidth,s=this.scrollLeft,n=this.offsetWidth,p=48,h=r-p,f=r+a-n+p,v=Math.min(h,Math.max(f,s)),u=this.focusedTab?"auto":"instant";this.tabsScrollerElement.scrollTo({behavior:u,top:0,left:v})}render(){return o`
      <div class="tabs">
        <slot
          @slotchange=${this.handleSlotChange}
          @click=${this.handleTabClick}></slot>
      </div>
      <md-divider part="divider"></md-divider>
    `}async handleTabClick(e){const i=e.target;await 0,!(e.defaultPrevented||!Wo(i)||i.active)&&this.activateTab(i)}activateTab(e){const{tabs:i}=this,r=this.activeTab;if(!(!i.includes(e)||r===e)){for(const a of i)a.active=a===e;if(r){if(!this.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0}))){for(const s of i)s.active=s===r;return}e[wr](r)}this.updateFocusableTab(e),this.scrollToTab(e)}}updateFocusableTab(e){for(const i of this.tabs)i.tabIndex=i===e?0:-1}async handleKeydown(e){await 0;const i=e.key==="ArrowLeft",r=e.key==="ArrowRight",a=e.key==="Home",s=e.key==="End";if(e.defaultPrevented||!i&&!r&&!a&&!s)return;const{tabs:n}=this;if(n.length<2)return;e.preventDefault();let p;if(a||s)p=a?0:n.length-1;else{const v=getComputedStyle(this).direction==="rtl"?i:r,{focusedTab:u}=this;if(!u)p=v?0:n.length-1;else{const g=this.tabs.indexOf(u);p=v?g+1:g-1,p>=n.length?p=0:p<0&&(p=n.length-1)}}const h=n[p];h.focus(),this.autoActivate?this.activateTab(h):this.updateFocusableTab(h)}handleKeyup(){this.scrollToTab(this.focusedTab??this.activeTab)}handleFocusout(){if(this.matches(":focus-within"))return;const{activeTab:e}=this;e&&this.updateFocusableTab(e)}handleSlotChange(){const e=this.tabs[0];!this.activeTab&&e&&this.activateTab(e),this.scrollToTab(this.activeTab)}}d([pe({flatten:!0,selector:"[md-tab]"})],Ie.prototype,"tabs",void 0);d([m({type:Number,attribute:"active-tab-index"})],Ie.prototype,"activeTabIndex",null);d([m({type:Boolean,attribute:"auto-activate"})],Ie.prototype,"autoActivate",void 0);d([S(".tabs")],Ie.prototype,"tabsScrollerElement",void 0);d([S("slot")],Ie.prototype,"slotElement",void 0);function Wo(t){return t instanceof HTMLElement&&t.hasAttribute("md-tab")}/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Jo=y`:host{box-sizing:border-box;display:flex;flex-direction:column;overflow:auto;scroll-behavior:smooth;scrollbar-width:none;position:relative}:host([hidden]){display:none}:host::-webkit-scrollbar{display:none}.tabs{align-items:end;display:flex;height:100%;overflow:inherit;scroll-behavior:inherit;scrollbar-width:inherit;justify-content:space-between;width:100%}::slotted(*){flex:1}::slotted([active]){z-index:1}
`;/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let si=class extends Ie{};si.styles=[Jo];si=d([C("md-tabs")],si);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class _r extends Q{constructor(){super(...arguments),this.inlineIcon=!1}getContentClasses(){return{...super.getContentClasses(),stacked:!this.inlineIcon}}}d([m({type:Boolean,attribute:"inline-icon"})],_r.prototype,"inlineIcon",void 0);/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Xo=y`:host{--_active-indicator-color: var(--md-primary-tab-active-indicator-color, var(--md-sys-color-primary, #6750a4));--_active-indicator-height: var(--md-primary-tab-active-indicator-height, 3px);--_active-indicator-shape: var(--md-primary-tab-active-indicator-shape, 3px 3px 0px 0px);--_active-hover-state-layer-color: var(--md-primary-tab-active-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_active-hover-state-layer-opacity: var(--md-primary-tab-active-hover-state-layer-opacity, 0.08);--_active-pressed-state-layer-color: var(--md-primary-tab-active-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_active-pressed-state-layer-opacity: var(--md-primary-tab-active-pressed-state-layer-opacity, 0.12);--_container-color: var(--md-primary-tab-container-color, var(--md-sys-color-surface, #fef7ff));--_container-elevation: var(--md-primary-tab-container-elevation, 0);--_container-height: var(--md-primary-tab-container-height, 48px);--_with-icon-and-label-text-container-height: var(--md-primary-tab-with-icon-and-label-text-container-height, 64px);--_hover-state-layer-color: var(--md-primary-tab-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-state-layer-opacity: var(--md-primary-tab-hover-state-layer-opacity, 0.08);--_pressed-state-layer-color: var(--md-primary-tab-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-opacity: var(--md-primary-tab-pressed-state-layer-opacity, 0.12);--_active-focus-icon-color: var(--md-primary-tab-active-focus-icon-color, var(--md-sys-color-primary, #6750a4));--_active-hover-icon-color: var(--md-primary-tab-active-hover-icon-color, var(--md-sys-color-primary, #6750a4));--_active-icon-color: var(--md-primary-tab-active-icon-color, var(--md-sys-color-primary, #6750a4));--_active-pressed-icon-color: var(--md-primary-tab-active-pressed-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-size: var(--md-primary-tab-icon-size, 24px);--_focus-icon-color: var(--md-primary-tab-focus-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-icon-color: var(--md-primary-tab-hover-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_icon-color: var(--md-primary-tab-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-icon-color: var(--md-primary-tab-pressed-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_label-text-font: var(--md-primary-tab-label-text-font, var(--md-sys-typescale-title-small-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-primary-tab-label-text-line-height, var(--md-sys-typescale-title-small-line-height, 1.25rem));--_label-text-size: var(--md-primary-tab-label-text-size, var(--md-sys-typescale-title-small-size, 0.875rem));--_label-text-weight: var(--md-primary-tab-label-text-weight, var(--md-sys-typescale-title-small-weight, var(--md-ref-typeface-weight-medium, 500)));--_active-focus-label-text-color: var(--md-primary-tab-active-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_active-hover-label-text-color: var(--md-primary-tab-active-hover-label-text-color, var(--md-sys-color-primary, #6750a4));--_active-label-text-color: var(--md-primary-tab-active-label-text-color, var(--md-sys-color-primary, #6750a4));--_active-pressed-label-text-color: var(--md-primary-tab-active-pressed-label-text-color, var(--md-sys-color-primary, #6750a4));--_focus-label-text-color: var(--md-primary-tab-focus-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-label-text-color: var(--md-primary-tab-hover-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_label-text-color: var(--md-primary-tab-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-label-text-color: var(--md-primary-tab-pressed-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_container-shape-start-start: var(--md-primary-tab-container-shape-start-start, var(--md-primary-tab-container-shape, var(--md-sys-shape-corner-none, 0px)));--_container-shape-start-end: var(--md-primary-tab-container-shape-start-end, var(--md-primary-tab-container-shape, var(--md-sys-shape-corner-none, 0px)));--_container-shape-end-end: var(--md-primary-tab-container-shape-end-end, var(--md-primary-tab-container-shape, var(--md-sys-shape-corner-none, 0px)));--_container-shape-end-start: var(--md-primary-tab-container-shape-end-start, var(--md-primary-tab-container-shape, var(--md-sys-shape-corner-none, 0px)))}.content.stacked{flex-direction:column;gap:2px}.content.stacked.has-icon.has-label{height:var(--_with-icon-and-label-text-container-height)}
`;/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Zo=y`:host{display:inline-flex;align-items:center;justify-content:center;outline:none;padding:0 16px;position:relative;-webkit-tap-highlight-color:rgba(0,0,0,0);vertical-align:middle;user-select:none;font-family:var(--_label-text-font);font-size:var(--_label-text-size);line-height:var(--_label-text-line-height);font-weight:var(--_label-text-weight);color:var(--_label-text-color);z-index:0;--md-ripple-hover-color: var(--_hover-state-layer-color);--md-ripple-hover-opacity: var(--_hover-state-layer-opacity);--md-ripple-pressed-color: var(--_pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_pressed-state-layer-opacity);--md-elevation-level: var(--_container-elevation)}md-focus-ring{--md-focus-ring-shape: 8px}:host([active]) md-focus-ring{margin-bottom:calc(var(--_active-indicator-height) + 1px)}.button::before{background:var(--_container-color);content:"";inset:0;position:absolute;z-index:-1}.button::before,md-ripple,md-elevation{border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-end-radius:var(--_container-shape-end-end);border-end-start-radius:var(--_container-shape-end-start)}.content{position:relative;box-sizing:border-box;display:inline-flex;flex-direction:row;align-items:center;justify-content:center;height:var(--_container-height);gap:8px}.indicator{position:absolute;box-sizing:border-box;z-index:-1;transform-origin:bottom left;background:var(--_active-indicator-color);border-radius:var(--_active-indicator-shape);height:var(--_active-indicator-height);inset:auto 0 0 0;opacity:0}::slotted([slot=icon]){display:inline-flex;position:relative;writing-mode:horizontal-tb;fill:currentColor;color:var(--_icon-color);font-size:var(--_icon-size);width:var(--_icon-size);height:var(--_icon-size)}:host(:hover){color:var(--_hover-label-text-color);cursor:pointer}:host(:hover) ::slotted([slot=icon]){color:var(--_hover-icon-color)}:host(:focus){color:var(--_focus-label-text-color)}:host(:focus) ::slotted([slot=icon]){color:var(--_focus-icon-color)}:host(:active){color:var(--_pressed-label-text-color)}:host(:active) ::slotted([slot=icon]){color:var(--_pressed-icon-color)}:host([active]) .indicator{opacity:1}:host([active]){color:var(--_active-label-text-color);--md-ripple-hover-color: var(--_active-hover-state-layer-color);--md-ripple-hover-opacity: var(--_active-hover-state-layer-opacity);--md-ripple-pressed-color: var(--_active-pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_active-pressed-state-layer-opacity)}:host([active]) ::slotted([slot=icon]){color:var(--_active-icon-color)}:host([active]:hover){color:var(--_active-hover-label-text-color)}:host([active]:hover) ::slotted([slot=icon]){color:var(--_active-hover-icon-color)}:host([active]:focus){color:var(--_active-focus-label-text-color)}:host([active]:focus) ::slotted([slot=icon]){color:var(--_active-focus-icon-color)}:host([active]:active){color:var(--_active-pressed-label-text-color)}:host([active]:active) ::slotted([slot=icon]){color:var(--_active-pressed-icon-color)}:host,::slotted(*){white-space:nowrap}@media(forced-colors: active){.indicator{background:CanvasText}}
`;/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let ni=class extends _r{};ni.styles=[Zo,Xo];ni=d([C("md-primary-tab")],ni);/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Qo=y`@layer{.md-typescale-display-small,.md-typescale-display-small-prominent{font:var(--md-sys-typescale-display-small-weight, var(--md-ref-typeface-weight-regular, 400)) var(--md-sys-typescale-display-small-size, 2.25rem)/var(--md-sys-typescale-display-small-line-height, 2.75rem) var(--md-sys-typescale-display-small-font, var(--md-ref-typeface-brand, Roboto))}.md-typescale-display-medium,.md-typescale-display-medium-prominent{font:var(--md-sys-typescale-display-medium-weight, var(--md-ref-typeface-weight-regular, 400)) var(--md-sys-typescale-display-medium-size, 2.8125rem)/var(--md-sys-typescale-display-medium-line-height, 3.25rem) var(--md-sys-typescale-display-medium-font, var(--md-ref-typeface-brand, Roboto))}.md-typescale-display-large,.md-typescale-display-large-prominent{font:var(--md-sys-typescale-display-large-weight, var(--md-ref-typeface-weight-regular, 400)) var(--md-sys-typescale-display-large-size, 3.5625rem)/var(--md-sys-typescale-display-large-line-height, 4rem) var(--md-sys-typescale-display-large-font, var(--md-ref-typeface-brand, Roboto))}.md-typescale-headline-small,.md-typescale-headline-small-prominent{font:var(--md-sys-typescale-headline-small-weight, var(--md-ref-typeface-weight-regular, 400)) var(--md-sys-typescale-headline-small-size, 1.5rem)/var(--md-sys-typescale-headline-small-line-height, 2rem) var(--md-sys-typescale-headline-small-font, var(--md-ref-typeface-brand, Roboto))}.md-typescale-headline-medium,.md-typescale-headline-medium-prominent{font:var(--md-sys-typescale-headline-medium-weight, var(--md-ref-typeface-weight-regular, 400)) var(--md-sys-typescale-headline-medium-size, 1.75rem)/var(--md-sys-typescale-headline-medium-line-height, 2.25rem) var(--md-sys-typescale-headline-medium-font, var(--md-ref-typeface-brand, Roboto))}.md-typescale-headline-large,.md-typescale-headline-large-prominent{font:var(--md-sys-typescale-headline-large-weight, var(--md-ref-typeface-weight-regular, 400)) var(--md-sys-typescale-headline-large-size, 2rem)/var(--md-sys-typescale-headline-large-line-height, 2.5rem) var(--md-sys-typescale-headline-large-font, var(--md-ref-typeface-brand, Roboto))}.md-typescale-title-small,.md-typescale-title-small-prominent{font:var(--md-sys-typescale-title-small-weight, var(--md-ref-typeface-weight-medium, 500)) var(--md-sys-typescale-title-small-size, 0.875rem)/var(--md-sys-typescale-title-small-line-height, 1.25rem) var(--md-sys-typescale-title-small-font, var(--md-ref-typeface-plain, Roboto))}.md-typescale-title-medium,.md-typescale-title-medium-prominent{font:var(--md-sys-typescale-title-medium-weight, var(--md-ref-typeface-weight-medium, 500)) var(--md-sys-typescale-title-medium-size, 1rem)/var(--md-sys-typescale-title-medium-line-height, 1.5rem) var(--md-sys-typescale-title-medium-font, var(--md-ref-typeface-plain, Roboto))}.md-typescale-title-large,.md-typescale-title-large-prominent{font:var(--md-sys-typescale-title-large-weight, var(--md-ref-typeface-weight-regular, 400)) var(--md-sys-typescale-title-large-size, 1.375rem)/var(--md-sys-typescale-title-large-line-height, 1.75rem) var(--md-sys-typescale-title-large-font, var(--md-ref-typeface-brand, Roboto))}.md-typescale-body-small,.md-typescale-body-small-prominent{font:var(--md-sys-typescale-body-small-weight, var(--md-ref-typeface-weight-regular, 400)) var(--md-sys-typescale-body-small-size, 0.75rem)/var(--md-sys-typescale-body-small-line-height, 1rem) var(--md-sys-typescale-body-small-font, var(--md-ref-typeface-plain, Roboto))}.md-typescale-body-medium,.md-typescale-body-medium-prominent{font:var(--md-sys-typescale-body-medium-weight, var(--md-ref-typeface-weight-regular, 400)) var(--md-sys-typescale-body-medium-size, 0.875rem)/var(--md-sys-typescale-body-medium-line-height, 1.25rem) var(--md-sys-typescale-body-medium-font, var(--md-ref-typeface-plain, Roboto))}.md-typescale-body-large,.md-typescale-body-large-prominent{font:var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)) var(--md-sys-typescale-body-large-size, 1rem)/var(--md-sys-typescale-body-large-line-height, 1.5rem) var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto))}.md-typescale-label-small,.md-typescale-label-small-prominent{font:var(--md-sys-typescale-label-small-weight, var(--md-ref-typeface-weight-medium, 500)) var(--md-sys-typescale-label-small-size, 0.6875rem)/var(--md-sys-typescale-label-small-line-height, 1rem) var(--md-sys-typescale-label-small-font, var(--md-ref-typeface-plain, Roboto))}.md-typescale-label-medium,.md-typescale-label-medium-prominent{font:var(--md-sys-typescale-label-medium-weight, var(--md-ref-typeface-weight-medium, 500)) var(--md-sys-typescale-label-medium-size, 0.75rem)/var(--md-sys-typescale-label-medium-line-height, 1rem) var(--md-sys-typescale-label-medium-font, var(--md-ref-typeface-plain, Roboto))}.md-typescale-label-medium-prominent{font-weight:var(--md-sys-typescale-label-medium-weight-prominent, var(--md-ref-typeface-weight-bold, 700))}.md-typescale-label-large,.md-typescale-label-large-prominent{font:var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)) var(--md-sys-typescale-label-large-size, 0.875rem)/var(--md-sys-typescale-label-large-line-height, 1.25rem) var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto))}.md-typescale-label-large-prominent{font-weight:var(--md-sys-typescale-label-large-weight-prominent, var(--md-ref-typeface-weight-bold, 700))}}
`,es=`
  :root {
    color-scheme: dark;

    /* ── M3 tokens · dark (orange/tan) ───────────────────────────── */
    --md-sys-color-primary: #FFB77C;
    --md-sys-color-on-primary: #4E2600;
    --md-sys-color-primary-container: #6F3A0C;
    --md-sys-color-on-primary-container: #FFDCC2;
    --md-sys-color-secondary: #E4C0A4;
    --md-sys-color-on-secondary: #422B18;
    --md-sys-color-secondary-container: #5B412C;
    --md-sys-color-on-secondary-container: #FFDCC2;
    --md-sys-color-tertiary: #D2C78C;
    --md-sys-color-on-tertiary: #383010;

    --md-sys-color-surface: #191410;
    --md-sys-color-surface-dim: #191410;
    --md-sys-color-surface-bright: #413A34;
    --md-sys-color-surface-container-lowest: #130F0B;
    --md-sys-color-surface-container-low: #211B15;
    --md-sys-color-surface-container: #251F19;
    --md-sys-color-surface-container-high: #302A23;
    --md-sys-color-surface-container-highest: #3B342D;

    --md-sys-color-on-surface: #EFE0D5;
    --md-sys-color-on-surface-variant: #D7C3B4;
    --md-sys-color-outline: #9F8C7E;
    --md-sys-color-outline-variant: #52453A;
    --md-sys-color-error: #FFB4AB;
    --md-sys-color-on-error: #690005;
    --md-sys-color-background: #191410;
    --md-sys-color-on-background: #EFE0D5;
    --md-icon-font: 'Material Symbols Rounded';

    /* ── Raw shell palette (parallel to the M3 tokens above) ─────── */
    --oppai-bg: #191410;
    --oppai-nav: #211B15;
    --oppai-nav-hover: #2C2620;
    --oppai-surface: #251F19;
    --oppai-surface-2: #302A23;
    --oppai-accent: #5B412C;
    --oppai-on-accent: #FFDCC2;
    --oppai-primary: #FFB77C;
    --oppai-primary-bright: #FFD3B0;
    --oppai-primary-container: #6F3A0C;
    --oppai-on-primary: #4E2600;
    --oppai-text: #EFE0D5;
    --oppai-text-dim: #D7C3B4;
    --oppai-text-muted: #A8917F;
    --oppai-border: #2C2620;
    --oppai-border-strong: #52453A;
    --oppai-fav: #FFB4AB;
    --oppai-scrim: rgba(0, 0, 0, 0.55);

    /* Motion — Material 3 easing sets */
    --oppai-ease-emphasized: cubic-bezier(0.2, 0, 0, 1);
    --oppai-ease-standard: cubic-bezier(0.2, 0, 0, 1);
    --oppai-ease-spring: cubic-bezier(0.34, 1.4, 0.64, 1);

    --oppai-radius: 16px;
    font-family: "Roboto", system-ui, -apple-system, sans-serif;
  }

  :root[data-theme="light"] {
    color-scheme: light;

    /* ── M3 tokens · light (orange/tan) ──────────────────────────── */
    --md-sys-color-primary: #8F4C00;
    --md-sys-color-on-primary: #FFFFFF;
    --md-sys-color-primary-container: #FFDCC2;
    --md-sys-color-on-primary-container: #2E1500;
    --md-sys-color-secondary: #755847;
    --md-sys-color-on-secondary: #FFFFFF;
    --md-sys-color-secondary-container: #FFDCC2;
    --md-sys-color-on-secondary-container: #2A1707;
    --md-sys-color-tertiary: #6A5F30;

    --md-sys-color-surface: #FFF8F4;
    --md-sys-color-surface-dim: #E8D7CC;
    --md-sys-color-surface-bright: #FFF8F4;
    --md-sys-color-surface-container-lowest: #FFFFFF;
    --md-sys-color-surface-container-low: #FEF1E8;
    --md-sys-color-surface-container: #F8EBE1;
    --md-sys-color-surface-container-high: #F2E5DB;
    --md-sys-color-surface-container-highest: #ECE0D6;

    --md-sys-color-on-surface: #211A14;
    --md-sys-color-on-surface-variant: #52453A;
    --md-sys-color-outline: #857567;
    --md-sys-color-outline-variant: #D8C3B4;
    --md-sys-color-error: #BA1A1A;
    --md-sys-color-background: #FFF8F4;
    --md-sys-color-on-background: #211A14;

    /* ── Raw shell palette · light ───────────────────────────────── */
    --oppai-bg: #FFF8F4;
    --oppai-nav: #FEF1E8;
    --oppai-nav-hover: #F2E5DB;
    --oppai-surface: #F8EBE1;
    --oppai-surface-2: #F2E5DB;
    --oppai-accent: #FFDCC2;
    --oppai-on-accent: #2A1707;
    --oppai-primary: #8F4C00;
    --oppai-primary-bright: #8F4C00;
    --oppai-primary-container: #FFDCC2;
    --oppai-on-primary: #FFFFFF;
    --oppai-text: #211A14;
    --oppai-text-dim: #52453A;
    --oppai-text-muted: #857567;
    --oppai-border: #EADBCF;
    --oppai-border-strong: #D8C3B4;
    --oppai-fav: #BA1A1A;
    --oppai-scrim: rgba(60, 40, 24, 0.32);
  }

  * { box-sizing: border-box; }
  html, body { margin: 0; height: 100%; }
  body {
    background: var(--md-sys-color-background);
    color: var(--md-sys-color-on-surface);
    font-family: "Roboto", system-ui, -apple-system, sans-serif;
    transition: background 0.3s var(--oppai-ease-standard), color 0.3s var(--oppai-ease-standard);
  }
  ::-webkit-scrollbar { width: 8px; height: 8px; }
  ::-webkit-scrollbar-thumb { background: var(--oppai-border-strong); border-radius: 8px; }
  ::-webkit-scrollbar-track { background: transparent; }
`,me=y`
  .material-symbols-rounded {
    font-family: "Material Symbols Rounded";
    font-weight: normal;
    font-style: normal;
    font-variation-settings: "opsz" 24, "wght" 400, "FILL" 0, "GRAD" 0;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    font-feature-settings: "liga";
    -webkit-font-smoothing: antialiased;
    user-select: none;
  }
  .fill-icon {
    font-variation-settings: "opsz" 24, "wght" 500, "FILL" 1, "GRAD" 0;
  }
`,ee=y`
  @keyframes oppai-fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes oppai-fade-in-up {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes oppai-scale-in {
    from { opacity: 0; transform: scale(0.94) translateY(8px); }
    to { opacity: 1; transform: scale(1) translateY(0); }
  }
  @keyframes oppai-pop {
    0% { transform: scale(1); }
    40% { transform: scale(1.28); }
    100% { transform: scale(1); }
  }
  .anim-fade { animation: oppai-fade-in 0.28s var(--oppai-ease-standard) both; }
  .anim-rise { animation: oppai-fade-in-up 0.42s var(--oppai-ease-emphasized) both; }
  .anim-pop { animation: oppai-scale-in 0.32s var(--oppai-ease-spring) both; }
  @media (prefers-reduced-motion: reduce) {
    *, .anim-fade, .anim-rise, .anim-pop {
      animation: none !important;
      transition: none !important;
    }
  }
`,$r="oppai_theme";function $i(){const t=localStorage.getItem($r);return t==="light"||t==="dark"||t==="system"?t:"dark"}function ts(t){try{localStorage.setItem($r,t)}catch{}}function ki(t){const e=t==="light"||t==="system"&&window.matchMedia("(prefers-color-scheme: light)").matches;document.documentElement.dataset.theme=e?"light":""}function is(){window.matchMedia("(prefers-color-scheme: light)").addEventListener("change",()=>{$i()==="system"&&ki("system")})}y`
  .card {
    background: var(--md-sys-color-surface-container);
    border-radius: var(--oppai-radius);
    overflow: hidden;
  }
`;const li="oppai_token";function di(){return localStorage.getItem(li)}function ut(t){t?localStorage.setItem(li,t):localStorage.removeItem(li)}function Fe(t,e="error"){window.dispatchEvent(new CustomEvent("oppai-mascot",{detail:{message:t,tone:e}}))}async function x(t,e={},i=0){const r=new Headers(e.headers),a=di();a&&r.set("Authorization",`Bearer ${a}`),e.body&&!(e.body instanceof FormData)&&r.set("Content-Type","application/json");const s=i>0?new AbortController:null,n=s?setTimeout(()=>s.abort(),i):null;try{const p=await fetch(t,{...e,headers:r,signal:s==null?void 0:s.signal});if(p.status===401)throw t!=="/api/auth/login"&&(ut(null),window.dispatchEvent(new CustomEvent("oppai-logout")),Fe("Your session ended. Please sign in again.")),new Error("unauthorized");if(!p.ok){let h=p.statusText;try{const f=await p.json();f!=null&&f.error&&(h=f.error)}catch{}throw new Error(h)}return p.status===204?void 0:await p.json()}catch(p){if(s!=null&&s.signal.aborted){const h=new Error("Timed out — the site was too slow or unreachable.");throw t!=="/api/auth/login"&&Fe(h.message),h}throw t!=="/api/auth/login"&&p instanceof Error&&p.message!=="unauthorized"&&Fe(p.message||"Something went wrong."),p}finally{n&&clearTimeout(n)}}const b={health:()=>x("/api/health"),login:(t,e)=>x("/api/auth/login",{method:"POST",body:JSON.stringify({username:t,password:e,client:"web"})}),me:()=>x("/api/auth/me"),logout:()=>x("/api/auth/logout",{method:"POST"}),listMedia:(t="",e=60,i=0)=>{const r=new URLSearchParams;return t&&r.set("kind",t),r.set("limit",String(e)),r.set("offset",String(i)),x(`/api/media?${r}`)},getMedia:t=>x(`/api/media/${t}`),streamURL:t=>`/api/media/${t}/stream`,thumbURL:t=>`/api/media/${t}/thumb`,proxyURL:t=>`/api/scrape/proxy?url=${encodeURIComponent(t)}`,upload:(t,e)=>{const i=new FormData;return i.append("file",t),e&&i.append("title",e),x("/api/media",{method:"POST",body:i})},autotag:t=>x(`/api/media/${t}/autotag`,{method:"POST"}),comicInfo:t=>x(`/api/media/${t}/comic`),pageURL:(t,e)=>`/api/media/${t}/page/${e}`,getSettings:()=>x("/api/settings"),saveSettings:t=>x("/api/settings",{method:"PUT",body:JSON.stringify(t)}),stats:()=>x("/api/stats"),changePassword:(t,e)=>x("/api/auth/password",{method:"POST",body:JSON.stringify({current:t,new:e})}),updateMedia:(t,e)=>x(`/api/media/${t}`,{method:"PATCH",body:JSON.stringify(e)}),deleteMedia:t=>x(`/api/media/${t}`,{method:"DELETE"}),bulkMedia:(t,e,i)=>x("/api/media/bulk",{method:"POST",body:JSON.stringify({action:t,ids:e,patch:i??{}})}),scrape:t=>x("/api/scrape",{method:"POST",body:JSON.stringify({url:t})},45e3),scrapeBulk:t=>x("/api/scrape/bulk",{method:"POST",body:JSON.stringify({urls:t})},75e3),scrapeImport:t=>x("/api/scrape/import",{method:"POST",body:JSON.stringify(t)}),apkInfo:()=>x("/api/apk/info"),sources:()=>x("/api/sources"),browseSource:(t,e={})=>{const i=new URLSearchParams;return e.feed&&i.set("feed",e.feed),e.cursor&&i.set("cursor",e.cursor),e.q&&i.set("q",e.q),e.sort&&i.set("sort",e.sort),x(`/api/sources/${t}/browse?${i}`,{},45e3)},sourcePages:(t,e)=>x(`/api/sources/${encodeURIComponent(t)}/item/${encodeURIComponent(e)}/pages`,{},45e3),sourceComments:(t,e)=>x(`/api/sources/${encodeURIComponent(t)}/item/${encodeURIComponent(e)}/comments`,{},45e3),sourceStreamURL:t=>`/api/sources/stream?url=${encodeURIComponent(t)}`,saveFromSource:(t,e)=>x(`/api/sources/${encodeURIComponent(t)}/save`,{method:"POST",body:JSON.stringify(e)},15*6e4),imageGenStatus:()=>x("/api/imagegen/status",{},12e3),optimizePrompt:t=>x("/api/imagegen/prompt",{method:"POST",body:JSON.stringify({text:t})}),generate:t=>x("/api/imagegen/generate",{method:"POST",body:JSON.stringify(t)},10*6e4),genPreviewURL:t=>`/api/imagegen/preview/${encodeURIComponent(t)}`,saveGenerated:t=>x("/api/imagegen/save",{method:"POST",body:JSON.stringify(t)}),modelThumbURL:t=>`/api/imagegen/model-thumb?model=${encodeURIComponent(t)}`,setModelThumb:t=>x("/api/imagegen/model-thumb",{method:"PUT",body:JSON.stringify(t)}),chatStatus:()=>x("/api/chat/status",{},12e3),chat:(t,e)=>x("/api/chat",{method:"POST",body:JSON.stringify({mode:t,messages:e})},125e3),loraThumbURL:t=>`/api/imagegen/lora-thumb?name=${encodeURIComponent(t)}`,characters:()=>x("/api/imagegen/characters"),saveCharacter:t=>x("/api/imagegen/characters",{method:"POST",body:JSON.stringify(t)}),deleteCharacter:t=>x(`/api/imagegen/characters/${encodeURIComponent(t)}`,{method:"DELETE"}),characterThumbURL:t=>`/api/imagegen/characters/${encodeURIComponent(t)}/thumb`,modelMeta:t=>x(`/api/imagegen/model?name=${encodeURIComponent(t)}`,{},2e4),patchModelMeta:t=>x("/api/imagegen/model",{method:"PATCH",body:JSON.stringify(t)},25e3),galleryBoards:()=>x("/api/imagegen/gallery/boards",{},2e4),createGalleryBoard:t=>x("/api/imagegen/gallery/boards",{method:"POST",body:JSON.stringify({name:t})},2e4),galleryImages:(t,e=0,i=60)=>x(`/api/imagegen/gallery/images?board=${encodeURIComponent(t)}&offset=${e}&limit=${i}`,{},2e4),galleryThumbURL:t=>`/api/imagegen/gallery/image/${encodeURIComponent(t)}/thumb`,galleryFullURL:t=>`/api/imagegen/gallery/image/${encodeURIComponent(t)}`,deleteGalleryImage:t=>x(`/api/imagegen/gallery/image/${encodeURIComponent(t)}`,{method:"DELETE"}),saveGalleryImage:t=>x("/api/imagegen/gallery/save",{method:"POST",body:JSON.stringify(t)},9e4),civitaiSearch:(t={})=>{const e=new URLSearchParams;return t.q&&e.set("q",t.q),t.type&&e.set("type",t.type),t.sort&&e.set("sort",t.sort),t.cursor&&e.set("cursor",t.cursor),x(`/api/imagegen/civitai/search?${e}`,{},45e3)},civitaiImageURL:t=>`/api/imagegen/civitai/image?url=${encodeURIComponent(t)}`,civitaiInstall:t=>x("/api/imagegen/civitai/install",{method:"POST",body:JSON.stringify({url:t})},3e4),civitaiInstalls:()=>x("/api/imagegen/civitai/installs",{},2e4),libbyOutfits:()=>x("/api/libby/outfits"),saveLibbyOutfit:t=>x("/api/libby/outfits",{method:"POST",body:JSON.stringify(t)}),deleteLibbyOutfit:t=>x(`/api/libby/outfits/${encodeURIComponent(t)}`,{method:"DELETE"}),setLibbyEmotion:(t,e,i)=>x(`/api/libby/outfits/${encodeURIComponent(t)}/emotions/${encodeURIComponent(e)}`,{method:"PUT",body:JSON.stringify({imageData:i})}),deleteLibbyEmotion:(t,e)=>x(`/api/libby/outfits/${encodeURIComponent(t)}/emotions/${encodeURIComponent(e)}`,{method:"DELETE"}),libbyEmotionURL:(t,e)=>`/api/libby/outfits/${encodeURIComponent(t)}/emotions/${encodeURIComponent(e)}`},kr="oppai_hide_libby",ci="oppai_libby_outfit";function bt(){return localStorage.getItem(kr)==="1"}function rs(t){try{localStorage.setItem(kr,t?"1":"0")}catch{}window.dispatchEvent(new CustomEvent("oppai-libby-pref",{detail:{hidden:t}}))}function Cr(){return localStorage.getItem(ci)??""}function Gi(t){try{t?localStorage.setItem(ci,t):localStorage.removeItem(ci)}catch{}window.dispatchEvent(new CustomEvent("oppai-libby-pref",{detail:{outfit:t}}))}function zr(t){const e=Cr();return e?`/api/libby/outfits/${encodeURIComponent(e)}/emotions/${encodeURIComponent(t)}`:Tr(t)}function Tr(t){switch(t){case"happy":return"/mascot-happy.png";case"mischievous":return"/mascot-mischievous.png";case"surprised":return"/mascot-surprised.png";case"thinking":return"/mascot-thinking.png";default:return"/mascot.png"}}const Sr=o`
  <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
    <path fill="currentColor" fill-rule="evenodd" d="M248.79 202.75C241.99 205.36 234.02 203.88 227.23 207.25C232.74 212.7 238.24 218.16 243.75 223.61C248.93 222.7 253.79 221.68 259.12 222.23C275.19 223.91 288.52 236.22 290.8 252.31C291.65 258.33 289.87 263.49 288.92 269.25C297.53 277.58 306.14 285.91 314.75 294.24C319.55 292.66 324.48 288.29 328.56 285.31C336.24 279.7 355.63 264.75 359.75 256.85C357.42 251.81 349.38 245.47 345.25 241.51C328.91 225.87 308.81 213.57 287.1 207.2C282.65 205.9 277.87 204.6 273.25 204.06C269.99 203.67 266.48 203.74 263.35 202.75C262.3 196.37 262.26 174.4 265.23 168.95C269.38 161.35 278.78 155.81 286.08 151.79C306.44 140.57 330.55 132.62 353.75 129.98C365.91 128.59 377.94 126.6 390.25 126.49C394.03 126.45 400.93 124.83 402.71 129.51C404.19 133.39 403.02 139.61 403.03 143.75C403.03 154.75 403.03 165.75 403.03 176.75C403.03 214.25 403.04 251.75 403.03 289.25C403.02 301.08 403.01 312.92 403.03 324.75C403.03 328.47 404.42 335.11 400.86 337.6C397.08 340.23 386.89 338.61 382.25 338.71C368.12 339.01 354.2 339.66 340.28 342.14C320.39 345.69 301.88 353.2 284.49 363.27C279.59 366.11 274.99 369.77 270.57 373.32C268.37 375.08 266.24 377.65 263.75 378.89C262.27 376.96 263.21 364.83 263.21 361.75C263.19 350.33 263.17 338.92 263.22 327.5C263.24 322.34 262.32 316.27 263.4 311.25C270.81 309.75 278.22 308.25 285.63 306.75C280.34 301.52 275.04 296.29 269.75 291.06C262.81 291.98 256.4 293.34 249.34 291.8C234.72 288.62 223.66 276.85 221.21 262.15C220.06 255.3 222.47 250.1 222.86 243.75C214.49 235.57 206.12 227.39 197.75 219.21C193.28 220.61 189.03 224.28 185.15 226.89C174.55 233.99 159.34 246.13 152.28 256.75C156.09 263 163 268.47 168.44 273.31C184.26 287.39 202.26 299.16 222.48 305.75C227.85 307.5 233.67 309.06 239.28 309.87C242.46 310.34 245.84 310.14 248.9 311.2C248.9 333.72 248.9 356.23 248.9 378.75C245.9 377.81 243 374.3 240.42 372.33C235.16 368.34 229.73 364.6 224.1 361.17C208.2 351.49 189.88 345.69 171.67 342.17C157.08 339.34 142.11 338.31 127.25 338.59C123.4 338.66 112.88 340.21 110.35 336.93C107.8 333.61 109.13 327.21 109.14 323.25C109.14 311.25 109.08 299.25 109.15 287.25C109.37 250.25 109.2 213.25 109.13 176.25C109.12 165.25 109.13 154.25 109.14 143.25C109.14 139.38 107.93 133.23 109.39 129.64C111.39 124.72 119.14 126.37 123.25 126.52C136.57 127.02 149.78 128.38 162.89 130.8C185.38 134.94 208.77 140.63 228.38 152.84C235.06 157 244.67 162.69 247.79 170.4C250.03 175.95 249.28 196.1 248.79 202.75ZM188.81 185.14C184.53 186.2 182.77 191.54 185.2 195.06C189.11 200.72 199.68 209.47 204.98 214.76C232.26 241.93 258.92 269.89 286.82 296.41C294.76 303.96 302.04 312.25 310.15 319.61C313.46 322.62 317.86 324.65 321.55 320.79C324.49 317.71 323.32 313.84 320.62 311.15C312.86 303.42 305 295.73 297.11 288.13C270.03 262.08 244.18 234.72 217.27 208.48C211.03 202.4 204.89 196.18 198.75 189.99C195.96 187.17 193.23 184.03 188.81 185.14ZM242.89 388.25C239.88 388.8 235 386.29 231.95 385.3C225.25 383.12 218.1 381.48 211.18 380.16C197.78 377.61 184.34 376.21 170.75 375.12C161.31 374.36 151.99 374.57 142.83 371.84C135.32 369.6 128.91 364.79 123.97 358.79C122.75 357.31 120.22 354.68 120.33 352.75C122.81 351.37 126.43 351.59 129.25 351.33C137.9 350.53 147.1 350.61 155.75 351.4C185.38 354.1 223.44 363.47 242.89 388.25ZM391.12 352.75C389.88 360.29 376.46 368.65 369.91 371.21C360.47 374.91 350.23 374.47 340.25 375.14C326.51 376.08 312.83 377.42 299.33 380.16C292.82 381.48 286.26 383.32 279.93 385.23C276.86 386.16 272.08 388.87 269.1 388.25C289.12 363.15 326.86 353.51 357.25 351.31C365.54 350.71 373.97 350.77 382.25 351.38C384.87 351.58 388.99 351.28 391.12 352.75Z" />
  </svg>
`;var as=Object.defineProperty,os=Object.getOwnPropertyDescriptor,Ee=(t,e,i,r)=>{for(var a=r>1?void 0:r?os(e,i):e,s=t.length-1,n;s>=0;s--)(n=t[s])&&(a=(r?n(e,i,a):n(a))||a);return r&&a&&as(e,i,a),a};let ce=class extends k{constructor(){super(...arguments),this.error="",this.busy=!1,this.libbyMessage="Welcome! I'm Libby. I'll help if sign-in gives you trouble.",this.libbyTone="success",this.onLibby=t=>{this.libbyMessage=t.detail.message,this.libbyTone=t.detail.tone,this.libbyTimer&&clearTimeout(this.libbyTimer),this.libbyTimer=window.setTimeout(()=>{this.libbyMessage=""},5e3)},this.onKeydown=t=>{t.key==="Enter"&&!this.busy&&(t.preventDefault(),this.form.requestSubmit())}}connectedCallback(){super.connectedCallback(),window.addEventListener("oppai-mascot",this.onLibby),this.libbyTimer=window.setTimeout(()=>this.libbyMessage="",5e3)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("oppai-mascot",this.onLibby),this.libbyTimer&&clearTimeout(this.libbyTimer)}async submit(t){if(t.preventDefault(),this.busy)return;this.error="",this.busy=!0;const e=t.target,i=e.elements.namedItem("username").value,r=e.elements.namedItem("password").value;try{const a=await b.login(i,r);ut(a.token),Fe(`Welcome back, ${a.user.username}!`,"success"),this.dispatchEvent(new CustomEvent("logged-in",{detail:a.user,bubbles:!0,composed:!0}))}catch(a){this.error=a.message||"login failed",Fe(this.error==="unauthorized"?"That login didn't work. Check your username and password.":this.error)}finally{this.busy=!1}}render(){const t=bt()?null:o`<div class="libby ${this.libbyMessage?"talking":""} ${this.libbyTone}">
          ${this.libbyMessage?o`<div class="libby-speech" role=${this.libbyTone==="error"?"alert":"status"}>
            <span class="libby-name">LIBBY</span>
            <span class="libby-emotion">${this.libbyTone==="error"?"😟":"😊"}</span>${this.libbyMessage}
          </div>`:null}
          <img src="/mascot-lg.png" alt="Libby, the OppaiLib mascot" />
        </div>`;return o`
      ${t}
      <form class="card" @submit=${this.submit} @keydown=${this.onKeydown}>
        <span class="logo">${Sr}</span>
        <h1 class="brand">OppaiLib</h1>
        <p class="tagline">Your private media library</p>
        <md-filled-text-field label="Username" name="username" autofocus required></md-filled-text-field>
        <md-filled-text-field label="Password" name="password" type="password" required>
        </md-filled-text-field>
        <div class="err">${this.error}</div>
        <md-filled-button type="submit" ?disabled=${this.busy}>
          ${this.busy?"Signing in…":"Sign in"}
        </md-filled-button>
      </form>
    `}};ce.styles=[ee,y`
      :host {
        display: grid;
        place-items: center;
        min-height: 100vh;
        padding: 1rem;
        position: relative;
        overflow: hidden;
        background:
          radial-gradient(1200px 600px at 50% -10%, color-mix(in srgb, var(--md-sys-color-primary) 14%, transparent), transparent 70%),
          var(--md-sys-color-background);
      }

      /* The mascot is anchored to the bottom edge and bleeds off it — she has no legs,
         so any gap under her reads as a cut-off. She sits behind the card and must
         never swallow a click meant for the form. */
      .libby {
        position: absolute;
        right: 0;
        bottom: 0;
        height: min(78vh, 620px);
        aspect-ratio: 4 / 5;
        pointer-events: none;
        user-select: none;
        animation: oppai-fade-in-up 0.7s var(--oppai-ease-emphasized) both;
        animation-delay: 0.15s;
      }
      .libby img {
        display: block;
        height: 100%;
        width: 100%;
        transform-origin: 55% 100%;
        animation: libby-breathe 3.6s ease-in-out infinite;
      }
      .libby.talking img { animation: libby-talk .34s ease-in-out infinite alternate; }
      .libby.error img { animation: libby-worry .22s ease-in-out 4 alternate; filter: saturate(.82); }
      .libby-speech {
        position: absolute;
        right: 72%;
        top: 12%;
        width: min(260px, 42vw);
        padding: 11px 14px;
        border-radius: 18px 18px 4px 18px;
        background: var(--md-sys-color-surface-container-high);
        color: var(--md-sys-color-on-surface);
        border: 1px solid var(--md-sys-color-primary);
        box-shadow: 0 8px 28px rgba(0,0,0,.3);
        font: 500 14px/1.4 Roboto, system-ui, sans-serif;
      }
      .libby.error .libby-speech { border-color: var(--md-sys-color-error); }
      .libby-name { display: block; color: var(--md-sys-color-primary); font-size: 11px; font-weight: 700; }
      .libby-emotion { margin-right: 4px; }
      @keyframes libby-breathe { 50% { transform: translateY(-3px) rotate(.35deg); } }
      @keyframes libby-talk { from { transform: translateY(0) rotate(-.45deg); } to { transform: translateY(-5px) rotate(.65deg); } }
      @keyframes libby-worry { from { transform: rotate(-1deg); } to { transform: rotate(1deg) translateY(-2px); } }
      @media (max-width: 900px) {
        .libby {
          right: 50%;
          transform: translateX(50%);
          height: min(42vh, 360px);
          opacity: 0.78;
        }
        .libby-speech { right: 58%; top: -8%; }
      }

      .card {
        position: relative;
        background: var(--md-sys-color-surface-container);
        border: 1px solid var(--md-sys-color-outline-variant);
        border-radius: 28px;
        padding: 2.25rem 2rem;
        width: min(380px, 100%);
        display: flex;
        flex-direction: column;
        gap: 1rem;
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
        animation: oppai-scale-in 0.42s var(--oppai-ease-spring) both;
      }
      /* Above the mascot, and pulled up off the bottom edge she occupies. */
      @media (max-width: 900px) {
        .card { margin-bottom: 22vh; }
      }
      h1 {
        margin: 0 0 0.25rem;
        text-align: center;
        letter-spacing: 0.5px;
        font-weight: 600;
      }
      .brand { text-align: center; color: var(--md-sys-color-primary); }
      /* The mark takes its colour from here, which is what makes it themeable. */
      .logo {
        display: block;
        width: 84px;
        height: 84px;
        margin: 0 auto;
        color: var(--md-sys-color-primary);
      }
      .logo svg {
        width: 100%;
        height: 100%;
        display: block;
      }
      .tagline {
        text-align: center;
        margin: 0 0 0.5rem;
        font-size: 0.85rem;
        color: var(--md-sys-color-on-surface-variant);
      }
      md-filled-text-field { width: 100%; }
      md-filled-button { --md-filled-button-container-shape: 14px; }
      .err {
        color: var(--md-sys-color-error);
        font-size: 0.85rem;
        min-height: 1.2em;
        text-align: center;
      }
    `];Ee([c()],ce.prototype,"error",2);Ee([c()],ce.prototype,"busy",2);Ee([c()],ce.prototype,"libbyMessage",2);Ee([c()],ce.prototype,"libbyTone",2);Ee([S("form")],ce.prototype,"form",2);ce=Ee([C("oppai-login")],ce);const je=[];let ss=1;function De(){window.dispatchEvent(new CustomEvent("oppai-downloads",{detail:je.map(t=>({...t}))}))}function ns(){return je.map(t=>({...t}))}function Ar(t,e){const i={id:ss++,label:t,progress:.02,state:"running"};return je.unshift(i),De(),e(a=>{i.state==="running"&&(i.progress=Math.max(i.progress,Math.min(.98,a)),De())}).then(()=>{i.progress=1,i.state="done",De(),window.dispatchEvent(new CustomEvent("oppai-download-complete",{detail:{id:i.id}}))}).catch(a=>{i.state="error",i.error=a instanceof Error?a.message:"Download failed",De()}),i.id}function ls(t){const e=je.findIndex(i=>i.id===t);e>=0&&(je.splice(e,1),De())}function Ir(t){return t.composedPath().some(e=>e instanceof HTMLElement&&(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable))}const H={image:{label:"Photos",typeLabel:"PHOTO",icon:"photo_library",aspect:"4 / 3"},gif:{label:"GIFs",typeLabel:"GIF",icon:"animation",aspect:"1 / 1"},video:{label:"Videos",typeLabel:"VIDEO",icon:"movie",aspect:"16 / 9"},game:{label:"Games",typeLabel:"GAME",icon:"sports_esports",aspect:"3 / 4"},comic:{label:"Comics",typeLabel:"COMIC",icon:"auto_stories",aspect:"2 / 3"}},He=["image","gif","video","game","comic"],Ki=["linear-gradient(135deg, oklch(34% 0.06 60), oklch(22% 0.05 55))","linear-gradient(135deg, oklch(33% 0.07 45), oklch(21% 0.05 40))","linear-gradient(135deg, oklch(32% 0.07 30), oklch(20% 0.05 25))","linear-gradient(135deg, oklch(34% 0.055 75), oklch(22% 0.045 70))","linear-gradient(135deg, oklch(32% 0.06 20), oklch(20% 0.05 15))"];function Se(t){return Ki[Math.abs(t.id)%Ki.length]}function ds(t){return t.kind==="image"||t.kind==="gif"||!!t.hasThumb}function ct(t){const e=Math.max(0,Math.round(t)),i=Math.floor(e/60),r=e%60;return`${i}:${String(r).padStart(2,"0")}`}function Oe(t){if(!t)return"";const e=["B","KB","MB","GB","TB"];let i=t,r=0;for(;i>=1024&&r<e.length-1;)i/=1024,r++;return`${i<10&&r>0?i.toFixed(1):Math.round(i)} ${e[r]}`}function Er(t){switch(t.kind){case"video":case"gif":return t.duration?ct(t.duration):Oe(t.size);case"image":return t.width&&t.height?`${t.width}×${t.height}`:Oe(t.size);case"game":return Oe(t.size);case"comic":return t.pageCount?`${t.pageCount} pages`:Oe(t.size);default:return Oe(t.size)}}function cs(t){return t.tags&&t.tags.length?t.tags[0].name:H[t.kind].label.replace(/s$/,"")}const Lr="oppai_favorites";function ps(){try{const t=localStorage.getItem(Lr);return t?new Set(JSON.parse(t).filter(e=>typeof e=="number")):new Set}catch{return new Set}}function At(t){try{localStorage.setItem(Lr,JSON.stringify([...t]))}catch{}}const Pr="oppai_comic_fit",Or="oppai_comic_pos";function Dr(){return localStorage.getItem(Pr)==="width"?"width":"page"}function Rr(t){try{localStorage.setItem(Pr,t)}catch{}}function Mr(){try{const t=localStorage.getItem(Or);return t?JSON.parse(t):{}}catch{return{}}}function hs(t){const e=Mr()[String(t)];return typeof e=="number"&&e>=1?e:1}function us(t,e){try{const i=Mr();i[String(t)]=e,localStorage.setItem(Or,JSON.stringify(i))}catch{}}var ms=Object.defineProperty,fs=Object.getOwnPropertyDescriptor,D=(t,e,i,r)=>{for(var a=r>1?void 0:r?fs(e,i):e,s=t.length-1,n;s>=0;s--)(n=t[s])&&(a=(r?n(e,i,a):n(a))||a);return r&&a&&ms(e,i,a),a};let O=class extends k{constructor(){super(...arguments),this.favorite=!1,this.queue=[],this.full=null,this.activeTag=null,this.tagging=!1,this.editing=!1,this.saving=!1,this.editTitle="",this.editNotes="",this.editKind="image",this.editTags=[],this.newTag="",this.screenshot="",this.comic=null,this.page=1,this.fit=Dr(),this.onKey=t=>{var r;if(Ir(t))return;const e=this.full??this.media;if(e.kind==="comic"){this.onComicKey(t);return}if(e.kind!=="video")return;const i=this.videoEl();if(i)switch(t.key){case" ":case"k":t.preventDefault(),i.paused?i.play():i.pause();break;case"j":i.currentTime=Math.max(0,i.currentTime-10);break;case"l":i.currentTime=Math.min(i.duration||1/0,i.currentTime+10);break;case"m":i.muted=!i.muted;break;case"f":t.preventDefault(),document.fullscreenElement?document.exitFullscreen():(r=i.requestFullscreen)==null||r.call(i);break}},this.cancelEdit=()=>{this.editing=!1}}connectedCallback(){super.connectedCallback(),this.loadItem(),window.addEventListener("keydown",this.onKey)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this.onKey),this.clearMediaSession()}updated(t){if(t.has("media")){const e=t.get("media");e&&e.id!==this.media.id&&(this.editing=!1,this.activeTag=null,this.loadItem())}this.setupMediaSession()}loadItem(){const t=this.media;this.full=t,b.getMedia(t.id).then(e=>this.full=e).catch(()=>this.full=t),this.comic=null,t.kind==="comic"&&this.loadComic(t.id)}async loadComic(t){try{const e=await b.comicInfo(t);if(this.media.id!==t)return;this.comic=e,e.readable&&e.pages>0&&(this.page=Math.min(Math.max(hs(t),1),e.pages),this.preloadPage(t,this.page+1))}catch(e){if(this.media.id!==t)return;this.comic={readable:!1,pages:0,reason:e.message}}}preloadPage(t,e){var i;!((i=this.comic)!=null&&i.readable)||e<1||e>this.comic.pages||(new Image().src=b.pageURL(t,e))}goPage(t){var r,a;if(!((r=this.comic)!=null&&r.readable))return;const e=this.full??this.media,i=Math.min(Math.max(t,1),this.comic.pages);i!==this.page&&(this.page=i,us(e.id,i),this.preloadPage(e.id,i+1),this.fit==="width"&&((a=this.renderRoot.querySelector(".reader-stage"))==null||a.scrollIntoView({block:"start"})))}setFit(t){this.fit=t,Rr(t)}videoEl(){var t;return((t=this.renderRoot)==null?void 0:t.querySelector("video"))??null}onComicKey(t){var e;if((e=this.comic)!=null&&e.readable)switch(t.key){case"ArrowRight":case"PageDown":case" ":t.preventDefault(),this.goPage(this.page+1);break;case"ArrowLeft":case"PageUp":t.preventDefault(),this.goPage(this.page-1);break;case"Home":t.preventDefault(),this.goPage(1);break;case"End":t.preventDefault(),this.goPage(this.comic.pages);break}}emitNavigate(t){this.dispatchEvent(new CustomEvent("navigate",{detail:{dir:t},bubbles:!0,composed:!0}))}setupMediaSession(){const t=this.full??this.media;if(t.kind!=="video"||!("mediaSession"in navigator))return;const e=this.videoEl();if(!e)return;const i=navigator.mediaSession;try{i.metadata=new MediaMetadata({title:t.title,artist:"OppaiLib"})}catch{}const r=(a,s)=>{try{i.setActionHandler(a,s)}catch{}};r("play",()=>void e.play()),r("pause",()=>e.pause()),r("seekbackward",a=>{e.currentTime=Math.max(0,e.currentTime-(a.seekOffset??10))}),r("seekforward",a=>{e.currentTime=Math.min(e.duration||1/0,e.currentTime+(a.seekOffset??10))}),r("seekto",a=>{a.seekTime!=null&&(e.currentTime=a.seekTime)}),r("previoustrack",()=>this.emitNavigate(-1)),r("nexttrack",()=>this.emitNavigate(1))}clearMediaSession(){if(!("mediaSession"in navigator))return;const t=navigator.mediaSession,e=["play","pause","seekbackward","seekforward","seekto","previoustrack","nexttrack"];for(const i of e)try{t.setActionHandler(i,null)}catch{}t.metadata=null}toggleFav(){this.dispatchEvent(new CustomEvent("toggle-favorite",{bubbles:!0,composed:!0}))}async retag(){this.tagging=!0;try{const t=await b.autotag(this.media.id);this.full&&(this.full={...this.full,tags:t.tags}),this.activeTag=null,this.dispatchEvent(new CustomEvent("changed",{bubbles:!0,composed:!0}))}catch(t){console.error("autotag",t)}finally{this.tagging=!1}}hasTimeline(t){var i;const e=this.full??this.media;return e.kind==="video"&&!!e.duration&&!!((i=t.moments)!=null&&i.length)}toggleTagTimeline(t){this.hasTimeline(t)&&(this.activeTag=this.activeTag===t.id?null:t.id)}seekTo(t){const e=this.videoEl();e&&(e.currentTime=t,e.play())}renderTimeline(t){var r;if(t.kind!=="video"||!t.duration)return l;const e=(t.tags??[]).find(a=>a.id===this.activeTag);if(!((r=e==null?void 0:e.moments)!=null&&r.length))return l;const i=t.duration;return o`
      <div class="timeline">
        <div class="rail">
          ${e.moments.map(a=>o`<button
              class="marker"
              style="left:${Math.min(100,a/i*100)}%"
              title="Jump to ${ct(a)}"
              aria-label="Jump to ${ct(a)}"
              @click=${()=>this.seekTo(a)}
            ></button>`)}
        </div>
        <div class="rail-legend">
          <span class="material-symbols-rounded" style="font-size:16px;">auto_awesome</span>
          <span
            >“${e.name}” detected at ${e.moments.map(a=>ct(a)).join(", ")} — click a
            marker to jump.</span
          >
        </div>
      </div>
    `}startEdit(){const t=this.full??this.media;this.editTitle=t.title,this.editNotes=t.notes??"",this.editKind=t.kind,this.editTags=(t.tags??[]).map(e=>e.name),this.newTag="",this.editing=!0}removeEditTag(t){this.editTags=this.editTags.filter(e=>e!==t)}commitNewTag(){const t=this.newTag.trim();t&&!this.editTags.includes(t)&&(this.editTags=[...this.editTags,t]),this.newTag=""}onTagKeydown(t){(t.key==="Enter"||t.key===",")&&(t.preventDefault(),this.commitNewTag())}async saveEdit(){const t=this.full??this.media;this.commitNewTag();const e=(t.tags??[]).map(a=>a.name),i=this.editTags.filter(a=>!e.includes(a)),r=e.filter(a=>!this.editTags.includes(a));this.saving=!0;try{const a=await b.updateMedia(t.id,{title:this.editTitle,notes:this.editNotes,kind:this.editKind,addTags:i,removeTags:r});this.full=a,this.editing=!1,this.dispatchEvent(new CustomEvent("changed",{bubbles:!0,composed:!0}))}catch(a){console.error("save edit",a)}finally{this.saving=!1}}async doDelete(){const t=this.full??this.media;if(confirm(`Delete "${t.title}"? This cannot be undone.`))try{await b.deleteMedia(t.id),this.dispatchEvent(new CustomEvent("deleted",{detail:{id:t.id},bubbles:!0,composed:!0}))}catch(e){console.error("delete",e)}}renderEdit(){return o`
      <div class="edit">
        <div>
          <label>Title</label>
          <input
            .value=${this.editTitle}
            @input=${t=>this.editTitle=t.target.value}
          />
        </div>
        <div>
          <label>Type</label>
          <select
            .value=${this.editKind}
            @change=${t=>this.editKind=t.target.value}
          >
            ${He.map(t=>o`<option value=${t} ?selected=${t===this.editKind}>${H[t].label}</option>`)}
          </select>
        </div>
        <div>
          <label>Notes</label>
          <textarea
            .value=${this.editNotes}
            @input=${t=>this.editNotes=t.target.value}
          ></textarea>
        </div>
        <div>
          <label>Tags</label>
          <div class="tag-edit">
            ${this.editTags.map(t=>o`<span class="tag-pill"
                >${t}
                <button title="Remove" @click=${()=>this.removeEditTag(t)}>
                  <span class="material-symbols-rounded" style="font-size:16px;">close</span>
                </button></span
              >`)}
            <input
              class="tag-add"
              placeholder="Add tag…"
              .value=${this.newTag}
              @input=${t=>this.newTag=t.target.value}
              @keydown=${this.onTagKeydown}
              @blur=${()=>this.commitNewTag()}
            />
          </div>
        </div>
        <div class="edit-actions">
          <button class="btn-primary" @click=${this.saveEdit} ?disabled=${this.saving}>
            <span class="material-symbols-rounded" style="font-size:20px;">save</span>
            ${this.saving?"Saving…":"Save"}
          </button>
          <button class="btn-outline" @click=${this.cancelEdit} ?disabled=${this.saving}>Cancel</button>
        </div>
      </div>
    `}favIcon(){return o`<span
      class="material-symbols-rounded fill-icon"
      style="font-size:22px; color:${this.favorite?"var(--oppai-fav)":"var(--oppai-text)"};"
      >${this.favorite?"favorite":"favorite_border"}</span
    >`}render(){const t=this.full??this.media,e=b.streamURL(t.id);return o`
      <div class="wrap">
        ${this.renderStage(t,e)}
        ${t.kind==="video"?this.renderUpNext(t):l}
        ${this.renderTimeline(t)}
        ${t.kind==="game"?l:this.renderMeta(t)}
      </div>
      ${this.screenshot?o`<button class="shot-lightbox" aria-label="Close screenshot" @click=${()=>this.screenshot=""}>
            <img src=${b.proxyURL(this.screenshot)} alt="Full-size game screenshot" />
          </button>`:l}
    `}renderUpNext(t){const e=this.queue.filter(r=>r.kind==="video");if(e.some(r=>r.id===t.id)||e.unshift(t),e.length<2)return l;const i=e.findIndex(r=>r.id===t.id);return o`
      <div class="upnext">
        <div class="upnext-label">Videos</div>
        <div class="strip">
          ${e.map((r,a)=>o`
              <button
                class="strip-item ${r.id===t.id?"on":""}"
                title=${r.title}
                aria-current=${r.id===t.id}
                @click=${()=>this.jumpTo(r.id)}
              >
                ${r.hasThumb?o`<img src=${b.thumbURL(r.id)} loading="lazy" alt=${r.title} />`:o`<span class="strip-blank" style="background:${Se(r)};"></span>`}
                ${r.kind==="video"?o`<span class="strip-play material-symbols-rounded">play_circle</span>`:l}
                ${a===i+1?o`<span class="strip-next">Next</span>`:l}
              </button>
            `)}
        </div>
      </div>
    `}jumpTo(t){t!==this.media.id&&this.dispatchEvent(new CustomEvent("jump",{detail:{id:t},bubbles:!0,composed:!0}))}renderStage(t,e){switch(t.kind){case"video":const i=t.width&&t.height?t.width/t.height:1.7777777777777777;return o`<div
          class="stage video-stage"
          style="aspect-ratio:${i}; width:100%; max-width:${76*i}vh; background:${Se(t)};"
        >
          <video
            src=${e}
            poster=${t.hasThumb?b.thumbURL(t.id):l}
            controls
            autoplay
            playsinline
            preload="metadata"
          ></video>
        </div>`;case"gif":case"image":return o`<div class="stage-fit">
          <img src=${e} alt=${t.title} />
        </div>`;case"comic":return this.renderComic(t);case"game":return this.renderGame(t,e);default:return l}}renderComic(t){return o`
      <div class="reader">
        ${this.comic===null?o`<div class="reader-fallback" style="background:${Se(t)};">
              <span class="mono" style="color:#fff;">OPENING…</span>
            </div>`:this.comic.readable?this.renderReader(t,this.comic):this.renderComicFallback(t,this.comic)}
      </div>
    `}renderReader(t,e){const i=this.page<=1,r=this.page>=e.pages;return o`
      <div class="reader-stage">
        <img
          class="page-img ${this.fit==="width"?"fit-width":"fit-page"}"
          src=${b.pageURL(t.id,this.page)}
          alt="Page ${this.page} of ${t.title}"
        />
        <button
          class="turn prev"
          title="Previous page"
          ?disabled=${i}
          @click=${()=>this.goPage(this.page-1)}
        >
          ${i?l:o`<span class="material-symbols-rounded" style="font-size:28px;">chevron_left</span>`}
        </button>
        <button
          class="turn next"
          title="Next page"
          ?disabled=${r}
          @click=${()=>this.goPage(this.page+1)}
        >
          ${r?l:o`<span class="material-symbols-rounded" style="font-size:28px;">chevron_right</span>`}
        </button>
      </div>

      <div class="reader-bar">
        <button class="round-btn" title="Previous page" ?disabled=${i} @click=${()=>this.goPage(this.page-1)}>
          <span class="material-symbols-rounded" style="font-size:22px;">chevron_left</span>
        </button>
        <input
          type="range"
          min="1"
          max=${e.pages}
          .value=${String(this.page)}
          @input=${a=>this.goPage(Number(a.target.value))}
          aria-label="Page"
        />
        <span class="mono">${this.page} / ${e.pages}</span>
        <button class="round-btn" title="Next page" ?disabled=${r} @click=${()=>this.goPage(this.page+1)}>
          <span class="material-symbols-rounded" style="font-size:22px;">chevron_right</span>
        </button>
        <button
          class="round-btn"
          title=${this.fit==="width"?"Fit whole page":"Fit to width"}
          @click=${()=>this.setFit(this.fit==="width"?"page":"width")}
        >
          <span class="material-symbols-rounded" style="font-size:22px;"
            >${this.fit==="width"?"fit_screen":"fit_width"}</span
          >
        </button>
      </div>
    `}renderComicFallback(t,e){return o`
      <div class="reader-fallback" style="background:${Se(t)};">
        <span class="material-symbols-rounded" style="font-size:40px; color:#fff;">auto_stories</span>
        <span class="mono" style="color:#fff;">CAN'T READ IN APP</span>
        <span style="font-size:12px; color:rgba(255,255,255,0.75);">
          ${e.reason??"Unsupported archive."} Only .cbz / .zip comics can be paged through here.
        </span>
        <a href=${b.streamURL(t.id)} download style="color:#fff; font-size:12px; font-weight:600; margin-top:6px;"
          >Download the file</a
        >
      </div>
    `}renderGame(t,e){const i=t.download?this.hostOf(t.download):"";return o`
      <div class="game">
        <div class="game-cover" style="background:${Se(t)};">
          ${t.hasThumb?o`<img
                src=${b.thumbURL(t.id)}
                alt=${t.title}
                style="width:100%; height:100%; object-fit:cover;"
              />`:o`<span class="material-symbols-rounded" style="font-size:48px; color:#fff;">sports_esports</span>`}
        </div>
        <div style="flex:1; min-width:260px; padding-top:8px;">
          <div class="meta-head">
            <h2 class="meta-title">${t.title}</h2>
            ${this.renderActions(!1)}
          </div>
          ${this.editing?this.renderEdit():o`
                <div class="sub">${H.game.label.replace(/s$/,"")}</div>
                <div class="actions">
                  ${t.download?o`<a class="btn-primary" href=${t.download} target="_blank" rel="noreferrer">
                        <span class="material-symbols-rounded fill-icon" style="font-size:20px;">open_in_new</span>
                        ${i?`Get it on ${i}`:"Get it"}
                      </a>`:o`<a class="btn-primary" href=${e} download>
                        <span class="material-symbols-rounded fill-icon" style="font-size:20px;">download</span>
                        Download
                      </a>`}
                  <button class="btn-outline" @click=${this.toggleFav}>
                    <span
                      class="material-symbols-rounded"
                      style="font-size:20px; color:${this.favorite?"var(--oppai-fav)":"var(--oppai-text)"};"
                      >${this.favorite?"favorite":"favorite_border"}</span
                    >
                    Favorite
                  </button>
                </div>
                ${t.notes?o`<p class="desc">${t.notes}</p>`:o`<p class="desc">A title from your library.</p>`}
                ${this.renderTags(t)}
                ${t.gallery&&t.gallery.length?o`<div class="shots">
                      ${t.gallery.map(r=>o`<button
                        class="shot"
                        title="Open full-size screenshot"
                        @click=${()=>this.screenshot=r}
                      ><img loading="lazy" src=${b.proxyURL(r)} alt="screenshot" /></button>`)}
                    </div>`:l}
                ${t.source?o`<div class="meta-note">
                      Source:
                      <a href=${t.source} target="_blank" rel="noreferrer" style="color:var(--oppai-primary-bright);">link</a>
                    </div>`:l}
              `}
        </div>
      </div>
    `}hostOf(t){try{return new URL(t).hostname.replace(/^www\./,"")}catch{return""}}renderActions(t=!0){return o`
      ${t?o`<button class="icon-round" title="Auto-tag" @click=${this.retag} ?disabled=${this.tagging}>
            <span class="material-symbols-rounded" style="font-size:22px; color:var(--oppai-text-dim);"
              >${this.tagging?"hourglass_empty":"auto_awesome"}</span
            >
          </button>`:l}
      <button class="icon-round" title="Edit" @click=${()=>this.startEdit()}>
        <span class="material-symbols-rounded" style="font-size:22px; color:var(--oppai-text-dim);">edit</span>
      </button>
      <button class="icon-round" title="Delete" @click=${this.doDelete}>
        <span class="material-symbols-rounded" style="font-size:22px; color:var(--oppai-error, #f2b8b5);">delete</span>
      </button>
      <button class="icon-round" title="Favorite" @click=${this.toggleFav}>${this.favIcon()}</button>
    `}renderMeta(t){const e=H[t.kind];return o`
      <div class="meta">
        <div class="meta-head">
          <h2 class="meta-title">${t.title}</h2>
          ${this.renderActions()}
        </div>
        ${this.editing?this.renderEdit():o`
              <div class="chips">
                <span class="chip chip-accent">${Er(t)||e.label}</span>
                <span class="chip chip-muted">${e.typeLabel}</span>
              </div>
              ${this.renderTags(t)}
              ${t.notes?o`<p class="desc" style="margin-top:16px;">${t.notes}</p>`:l}
              ${t.source?o`<div class="meta-note">
                    Source:
                    <a href=${t.source} target="_blank" rel="noreferrer" style="color:var(--oppai-primary-bright);">link</a>
                  </div>`:l}
            `}
      </div>
    `}renderTags(t){const e=t.tags??[];if(e.length===0)return o`<div class="meta-note" style="margin-top:14px;">
        No tags yet — use the ✨ auto-tag button.
      </div>`;const i=e.some(r=>this.hasTimeline(r));return o`
      <div class="chips">
        ${e.map(r=>this.renderTagChip(r))}
      </div>
      ${i&&this.activeTag==null?o`<div class="meta-note" style="margin-top:10px;">
            Tap a ✨ tag to see where it appears in this video.
          </div>`:l}
    `}renderTagChip(t){const e=`${t.category}${t.source?" · "+t.source:""}`;if(!this.hasTimeline(t))return o`<span class="chip chip-muted" title=${e}>${t.name}</span>`;const i=this.activeTag===t.id,r=t.moments.length;return o`<button
      class="chip ${i?"on":"chip-muted"}"
      title="${e} · seen at ${r} point${r===1?"":"s"}"
      aria-pressed=${i}
      @click=${()=>this.toggleTagTimeline(t)}
    >
      <span class="material-symbols-rounded" style="font-size:14px;">auto_awesome</span>
      ${t.name}
    </button>`}};O.styles=[me,ee,y`
      :host {
        display: block;
      }
      .wrap {
        max-width: 1100px;
        margin: 0 auto;
        animation: oppai-fade-in-up 0.4s var(--oppai-ease-emphasized) both;
      }
      .round-btn,
      .icon-round,
      .btn-primary,
      .btn-outline {
        transition: transform 0.18s var(--oppai-ease-spring), filter 0.15s ease,
          background 0.2s ease;
      }
      .round-btn:hover:not([disabled]),
      .icon-round:hover,
      .btn-outline:hover {
        transform: translateY(-1px);
        filter: brightness(1.08);
      }
      .btn-primary:hover {
        transform: translateY(-1px);
        filter: brightness(1.05);
      }
      .btn-primary:active,
      .btn-outline:active,
      .icon-round:active {
        transform: scale(0.96);
      }
      .stage {
        border-radius: 20px;
        overflow: hidden;
        position: relative;
      }
      .stage video {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: contain;
        background: #000;
      }
      .video-stage { margin-inline: auto; max-height: 76vh; }
      /* Photos and GIFs are laid out around the image rather than inside a fixed
         frame: the picture keeps its own aspect ratio and the container shrinks
         to it, so nothing is letterboxed and no filler bars are drawn. */
      .stage-fit {
        display: flex;
        justify-content: center;
      }
      .stage-fit img {
        display: block;
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 76vh;
        border-radius: 20px;
      }
      .placeholder {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 8px;
        color: #fff;
      }
      .mono {
        font: 600 12px ui-monospace, monospace;
        color: var(--oppai-text-dim);
        letter-spacing: 1px;
      }

      /* Comic reader */
      .reader {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 14px;
      }
      .reader-stage {
        position: relative;
        width: 100%;
        display: flex;
        justify-content: center;
        min-height: 240px;
      }
      .page-img {
        display: block;
        width: auto;
        height: auto;
        border-radius: 12px;
      }
      .page-img.fit-page {
        max-width: 100%;
        max-height: 74vh;
      }
      .page-img.fit-width {
        width: 100%;
        max-width: 1000px;
      }
      /* Click the left/right of the page to turn it, like any reader. The zones
         sit over the image and only show their chevron on hover. */
      .turn {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 30%;
        border: none;
        background: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.18s ease;
      }
      .turn:hover:not([disabled]) {
        opacity: 1;
      }
      .turn[disabled] {
        cursor: default;
      }
      .turn.prev {
        left: 0;
        justify-content: flex-start;
      }
      .turn.next {
        right: 0;
        justify-content: flex-end;
      }
      .turn span {
        background: rgba(0, 0, 0, 0.45);
        border-radius: 50%;
        padding: 8px;
        color: #fff;
        backdrop-filter: blur(2px);
      }
      .reader-bar {
        display: flex;
        align-items: center;
        gap: 12px;
        width: 100%;
        max-width: 640px;
      }
      .reader-bar input[type="range"] {
        flex: 1;
        accent-color: var(--oppai-primary);
      }
      .reader-fallback {
        width: 340px;
        max-width: 60vw;
        aspect-ratio: 2 / 3;
        border-radius: 16px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 8px;
        text-align: center;
        padding: 0 20px;
      }
      .round-btn {
        width: 44px;
        height: 44px;
        border-radius: 22px;
        background: var(--oppai-surface-2);
        border: none;
        color: var(--oppai-text);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        flex-shrink: 0;
      }
      .game {
        display: flex;
        gap: 32px;
        flex-wrap: wrap;
      }
      .game-cover {
        width: 260px;
        aspect-ratio: 3 / 4;
        border-radius: 20px;
        overflow: hidden;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .game h2 {
        font-size: 26px;
        font-weight: 500;
        margin: 0 0 8px;
      }
      .sub {
        font-size: 13px;
        color: var(--oppai-text-muted);
        margin-bottom: 18px;
      }
      .actions {
        display: flex;
        gap: 12px;
        margin-bottom: 20px;
        flex-wrap: wrap;
      }
      .btn-primary {
        height: 44px;
        padding: 0 24px;
        border-radius: 22px;
        background: var(--oppai-primary);
        color: var(--oppai-on-primary);
        border: none;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
        text-decoration: none;
      }
      .btn-outline {
        height: 44px;
        padding: 0 20px;
        border-radius: 22px;
        background: none;
        color: var(--oppai-text);
        border: 1px solid var(--oppai-border-strong);
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .desc {
        font-size: 14px;
        line-height: 1.6;
        color: var(--oppai-text-dim);
        max-width: 640px;
      }
      .meta {
        margin-top: 24px;
      }
      .meta-head {
        display: flex;
        align-items: center;
        gap: 14px;
      }
      .meta-title {
        font-size: 24px;
        font-weight: 500;
        margin: 0;
        flex: 1;
      }
      .icon-round {
        width: 44px;
        height: 44px;
        border-radius: 22px;
        background: var(--oppai-surface-2);
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
      .chips {
        display: flex;
        gap: 8px;
        margin-top: 14px;
        flex-wrap: wrap;
      }
      .chip {
        font-size: 12px;
        font-weight: 500;
        padding: 6px 14px;
        border-radius: 14px;
      }
      .chip-accent {
        background: var(--oppai-accent);
        color: var(--oppai-on-accent);
      }
      .chip-muted {
        background: var(--oppai-surface-2);
        color: var(--oppai-text-dim);
      }
      /* A tag whose detections can be shown on the timeline. */
      button.chip {
        border: none;
        font: inherit;
        font-size: 12px;
        font-weight: 500;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 5px;
        transition: background 0.18s ease, color 0.18s ease, transform 0.18s var(--oppai-ease-spring);
      }
      button.chip:hover {
        transform: translateY(-1px);
      }
      button.chip.on {
        background: var(--oppai-accent);
        color: var(--oppai-on-accent);
      }

      /* Timeline of AI detections for the selected tag. */
      .timeline {
        margin-top: 12px;
        animation: oppai-fade-in 0.3s var(--oppai-ease-standard) both;
      }
      .rail {
        position: relative;
        height: 22px;
        border-radius: 11px;
        background: var(--oppai-surface-2);
        overflow: hidden;
      }
      .marker {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 8px;
        margin-left: -4px; /* centre the marker on its timestamp */
        padding: 0;
        border: none;
        border-radius: 4px;
        background: var(--oppai-accent);
        cursor: pointer;
        transition: transform 0.15s var(--oppai-ease-spring), filter 0.15s ease;
      }
      .marker:hover,
      .marker:focus-visible {
        transform: scaleX(1.6);
        filter: brightness(1.2);
        outline: none;
      }
      .rail-legend {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 12px;
        color: var(--oppai-text-muted);
        margin-top: 8px;
      }
      .meta-note {
        font-size: 12px;
        color: var(--oppai-text-muted);
        margin-top: 12px;
      }

      /* Edit form */
      .edit {
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        gap: 14px;
        max-width: 560px;
      }
      .edit label {
        font-size: 12px;
        font-weight: 600;
        color: var(--oppai-text-dim);
        display: block;
        margin-bottom: 6px;
      }
      .edit input,
      .edit textarea,
      .edit select {
        width: 100%;
        box-sizing: border-box;
        background: var(--oppai-surface-2);
        border: 1px solid var(--oppai-border-strong);
        border-radius: 12px;
        color: var(--oppai-text);
        font: inherit;
        font-size: 14px;
        padding: 10px 12px;
        outline: none;
      }
      .edit input:focus,
      .edit textarea:focus,
      .edit select:focus {
        border-color: var(--oppai-primary);
      }
      .edit textarea {
        resize: vertical;
        min-height: 72px;
      }
      .tag-edit {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        align-items: center;
      }
      .tag-pill {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        background: var(--oppai-surface-2);
        color: var(--oppai-text-dim);
        border-radius: 14px;
        padding: 6px 8px 6px 12px;
        font-size: 12px;
        font-weight: 500;
      }
      .tag-pill button {
        background: none;
        border: none;
        color: var(--oppai-text-muted);
        cursor: pointer;
        display: flex;
        padding: 0;
      }
      .tag-add {
        flex: 1;
        min-width: 120px;
      }
      .edit-actions {
        display: flex;
        gap: 10px;
        margin-top: 4px;
      }
      /* "Up next" — the rest of the queue as a scrubbable strip under the player.
         The gap is deliberately larger than it looks like it needs to be: the
         player's control bar is drawn *inside* the video, along its bottom edge, so
         the strip's top edge and the scrubber are only ever this far apart. At 14px
         reaching for the scrubber meant crossing the tiles — and the tiles lifted on
         hover, into the very gap you were aiming through. Hence both the clearance
         and the lift being a scale rather than a translate. */
      .upnext {
        margin-top: 32px;
      }
      .upnext-label {
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 0.4px;
        text-transform: uppercase;
        color: var(--oppai-text-muted);
        margin-bottom: 8px;
      }
      .strip {
        display: flex;
        gap: 10px;
        overflow-x: auto;
        scroll-snap-type: x proximity;
        padding-bottom: 6px;
        scrollbar-width: thin;
      }
      .strip-item {
        position: relative;
        flex: 0 0 auto;
        width: 140px;
        aspect-ratio: 16 / 10;
        border: 2px solid transparent;
        border-radius: 12px;
        overflow: hidden;
        padding: 0;
        background: var(--oppai-surface-2);
        cursor: pointer;
        scroll-snap-align: start;
        transition: transform 0.18s var(--oppai-ease-spring), border-color 0.18s ease;
      }
      .strip-item:hover {
        transform: scale(1.03);
      }
      .strip-item.on {
        border-color: var(--oppai-accent);
      }
      .strip-item img,
      .strip-blank {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .strip-play {
        position: absolute;
        inset: 0;
        display: grid;
        place-items: center;
        font-size: 30px;
        color: #fff;
        text-shadow: 0 0 8px rgba(0, 0, 0, 0.8);
      }
      .strip-next {
        position: absolute;
        left: 4px;
        bottom: 4px;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.3px;
        background: var(--oppai-accent);
        color: var(--oppai-on-accent);
        padding: 1px 6px;
        border-radius: 6px;
      }

      /* Game gallery */
      .shots {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
        gap: 10px;
        margin-top: 18px;
        max-width: 640px;
      }
      .shot {
        border: 0;
        padding: 0;
        background: none;
        cursor: zoom-in;
      }
      .shots img {
        width: 100%;
        aspect-ratio: 16 / 9;
        object-fit: cover;
        border-radius: 10px;
        background: var(--oppai-surface-2);
      }
      .shot-lightbox {
        position: fixed;
        inset: 0;
        z-index: 100;
        display: grid;
        place-items: center;
        padding: 24px;
        border: 0;
        background: rgba(0, 0, 0, 0.92);
        cursor: zoom-out;
      }
      .shot-lightbox img {
        display: block;
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
      }
    `];D([m({attribute:!1})],O.prototype,"media",2);D([m({type:Boolean})],O.prototype,"favorite",2);D([m({attribute:!1})],O.prototype,"queue",2);D([c()],O.prototype,"full",2);D([c()],O.prototype,"activeTag",2);D([c()],O.prototype,"tagging",2);D([c()],O.prototype,"editing",2);D([c()],O.prototype,"saving",2);D([c()],O.prototype,"editTitle",2);D([c()],O.prototype,"editNotes",2);D([c()],O.prototype,"editKind",2);D([c()],O.prototype,"editTags",2);D([c()],O.prototype,"newTag",2);D([c()],O.prototype,"screenshot",2);D([c()],O.prototype,"comic",2);D([c()],O.prototype,"page",2);D([c()],O.prototype,"fit",2);O=D([C("oppai-viewer")],O);var vs=Object.defineProperty,bs=Object.getOwnPropertyDescriptor,J=(t,e,i,r)=>{for(var a=r>1?void 0:r?bs(e,i):e,s=t.length-1,n;s>=0;s--)(n=t[s])&&(a=(r?n(e,i,a):n(a))||a);return r&&a&&vs(e,i,a),a};let q=class extends k{constructor(){super(...arguments),this.urls="",this.results=[],this.failures=[],this.chosen=new Set,this.busy=!1,this.phase="",this.fetchCount=0,this.error="",this.kind="image",this.kindTouched=!1,this.onUrlKeydown=t=>{t.key==="Enter"&&(t.ctrlKey||t.metaKey)&&(t.preventDefault(),this.fetch())}}open(){this.results=[],this.failures=[],this.chosen=new Set,this.error="",this.urls="",this.phase="",this.fetchCount=0,this.kind="image",this.kindTouched=!1,this.dialog.show()}get isGame(){return this.kind==="game"}get isComic(){return this.kind==="comic"}get urlList(){const t=new Set;return this.urls.split(/[\n,]/).map(e=>e.trim()).filter(e=>e&&!t.has(e)&&(t.add(e),!0))}get totalMedia(){return this.results.reduce((t,e)=>t+e.mediaUrls.length,0)}async fetch(){var e;const t=this.urlList;if(!(t.length===0||this.busy)){this.busy=!0,this.phase="fetching",this.fetchCount=t.length,this.error="",this.results=[],this.failures=[];try{const{items:i}=await b.scrapeBulk(t),r=new Set;for(const s of i)if(s.result){const n={...s.result,tags:s.result.tags??[],performers:s.result.performers??[],mediaUrls:s.result.mediaUrls??[],screenshots:s.result.screenshots??[],categorizedTags:s.result.categorizedTags??[]};this.results=[...this.results,n],n.mediaUrls.forEach(p=>r.add(p))}else this.failures=[...this.failures,{url:s.url,error:s.error||"failed"}];this.chosen=r;const a=(e=this.results.find(s=>s.kind))==null?void 0:e.kind;a&&(this.kind=a),this.kindTouched=!1,this.results.length===0&&this.failures.length>0&&(this.error="Nothing could be fetched from those links.")}catch(i){this.error=i.message}finally{this.busy=!1,this.phase=""}}}pickKind(t){this.kind=t,this.kindTouched=!0}toggle(t){const e=new Set(this.chosen);e.has(t)?e.delete(t):e.add(t),this.chosen=e}import(){if(this.busy||!this.isGame&&this.chosen.size===0||this.isGame&&this.results.length===0)return;this.error="";const t=[...this.results],e=new Set(this.chosen),i=this.kindTouched,r=this.kind,a=t.length===1?t[0].title||"Import":`${t.length} imports`;Ar(a,async s=>{let n=0,p=0;for(const h of t){const f=i?r:h.kind||r;if(f==="game"){const g=await b.scrapeImport({url:h.sourceUrl,title:h.title,tags:h.tags,categorizedTags:h.categorizedTags,kind:"game"});n+=g.count,s(++p/t.length);continue}const v=h.mediaUrls.filter(g=>e.has(g));if(v.length===0){s(++p/t.length);continue}const u=await b.scrapeImport({url:h.sourceUrl,mediaUrls:v,title:h.title,tags:h.tags,categorizedTags:h.categorizedTags,kind:f});n+=u.count,s(++p/t.length)}this.dispatchEvent(new CustomEvent("imported",{detail:{count:n},bubbles:!0,composed:!0}))}),this.dialog.close()}renderGroup(t){return o`
      <div class="group">
        <div class="meta"><strong>${t.title||"(untitled)"}</strong></div>
        ${t.description?o`<div class="meta">${t.description}</div>`:""}
        ${t.tags.length?o`<div class="tags">
              ${t.tags.map(e=>o`<md-filter-chip label=${e} selected></md-filter-chip>`)}
            </div>`:""}
        ${this.isGame?this.renderGameGroup(t):this.renderMediaGroup(t)}
        ${this.isComic?this.renderComicHint(t):""}
      </div>
    `}renderComicHint(t){const e=t.mediaUrls.filter(i=>this.chosen.has(i)).length;return e===0?o`<div class="game-hint">Select the pages to include.</div>`:e===1?o`<div class="game-hint">
        A single page imports as one file. Select more pages to bundle them into a comic.
      </div>`:o`<div class="game-hint">
      Imports as one <strong>comic</strong> entry — ${e} pages bundled into a CBZ, in the order
      shown. Deselect any covers or banners that aren't pages.
    </div>`}renderMediaGroup(t){return t.mediaUrls.length?o`<div class="previews">
          ${t.mediaUrls.map(e=>o`<div class="pv ${this.chosen.has(e)?"sel":""}" @click=${()=>this.toggle(e)}>
              <img src=${b.proxyURL(e)} loading="lazy" />
            </div>`)}
        </div>`:o`<div class="meta">No media found on that page.</div>`}renderGameGroup(t){var i,r;const e=t.cover||t.mediaUrls[0];return o`
      ${e?o`<div class="previews">
            <div class="pv sel"><img src=${b.proxyURL(e)} loading="lazy" /></div>
          </div>`:o`<div class="meta">No cover image found.</div>`}
      ${(i=t.screenshots)!=null&&i.length?o`<div class="shots">
            ${t.screenshots.slice(0,8).map(a=>o`<img src=${b.proxyURL(a)} loading="lazy" />`)}
          </div>`:""}
      <div class="game-hint">
        Imports as one <strong>game</strong> entry — cover art, description, tags${(r=t.screenshots)!=null&&r.length?`, ${t.screenshots.length} screenshot${t.screenshots.length===1?"":"s"}`:""} and a download link.
      </div>
    `}renderTypeRow(){return this.results.length===0?"":o`
      <div class="typerow">
        <span class="lbl">Import as</span>
        ${He.map(t=>o`<md-filter-chip
            label=${H[t].label}
            ?selected=${this.kind===t}
            @click=${()=>this.pickKind(t)}
          ></md-filter-chip>`)}
      </div>
    `}render(){return o`
      <md-dialog>
        <div slot="headline">Import from URL</div>
        <form slot="content" method="dialog" @submit=${t=>t.preventDefault()}>
          <div class="row">
            <md-outlined-text-field label="Page or media URL(s)" type="textarea" rows="3"
              .value=${this.urls}
              @input=${t=>this.urls=t.target.value}
              @keydown=${this.onUrlKeydown}></md-outlined-text-field>
            <md-filled-button type="button" @click=${this.fetch}
              ?disabled=${this.busy||this.urlList.length===0}>
              ${this.busy?"Fetching…":"Fetch"}
            </md-filled-button>
          </div>
          <p class="hint">
            One URL per line for bulk import. Direct image/video links (e.g. Discord CDN) work too.
            Press ${navigator.platform.startsWith("Mac")?"⌘":"Ctrl"}+Enter to fetch.
          </p>
          ${this.error?o`<div class="err">${this.error}</div>`:""}
          ${this.phase==="fetching"?o`<div class="progress">
                <md-circular-progress indeterminate></md-circular-progress>
                <span>Fetching ${this.fetchCount} link${this.fetchCount===1?"":"s"}… some sites can take a few seconds each.</span>
              </div>`:""}
          ${this.renderTypeRow()}
          ${this.results.map(t=>this.renderGroup(t))}
          ${this.failures.length?o`<div class="err">
                ${this.failures.length} link(s) failed:
                ${this.failures.map(t=>o`<div class="src">${t.url} — ${t.error}</div>`)}
              </div>`:""}
        </form>
        <div slot="actions">
          <md-text-button type="button" @click=${()=>this.dialog.close()}>Cancel</md-text-button>
          <md-filled-button type="button" @click=${this.import}
            ?disabled=${this.busy||(this.isGame?this.results.length===0:this.chosen.size===0)}>
            ${this.busy&&this.results.length?"Importing…":this.isGame?o`Import ${this.results.length===1?"game":`${this.results.length} games`}`:this.isComic?o`Import ${this.results.length===1?"comic":`${this.results.length} comics`}`:o`Import ${this.chosen.size||""}${this.totalMedia?` / ${this.totalMedia}`:""}`}
          </md-filled-button>
        </div>
      </md-dialog>
    `}};q.styles=[ee,y`
      md-dialog { max-width: 620px; }
      .row { display: flex; gap: .5rem; align-items: end; }
      md-outlined-text-field { flex: 1; }
      .hint { font-size: .78rem; opacity: .7; margin: .35rem 0 0; }
      .group { margin-top: 1rem; }
      .group + .group { border-top: 1px solid var(--md-sys-color-outline-variant); padding-top: 1rem; }
      .previews {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
        gap: 8px;
        margin-top: .5rem;
        animation: oppai-fade-in-up 0.32s var(--oppai-ease-emphasized) both;
      }
      .pv {
        position: relative;
        aspect-ratio: 1;
        border-radius: 10px;
        overflow: hidden;
        cursor: pointer;
        border: 2px solid transparent;
        transition: transform 0.18s var(--oppai-ease-spring), border-color 0.18s ease;
      }
      .pv:hover { transform: translateY(-2px) scale(1.03); }
      .pv.sel { border-color: var(--md-sys-color-primary); }
      .pv.sel::after {
        content: "check";
        font-family: "Material Symbols Rounded";
        font-feature-settings: "liga" 1;
        line-height: 1;
        position: absolute;
        top: 4px;
        right: 4px;
        font-size: 16px;
        color: var(--md-sys-color-on-primary);
        background: var(--md-sys-color-primary);
        border-radius: 50%;
        width: 20px;
        height: 20px;
        display: grid;
        place-items: center;
      }
      .pv img { width: 100%; height: 100%; object-fit: cover; }
      .src { font-size: .78rem; opacity: .6; word-break: break-all; }
      .meta {
        font-size: .85rem;
        opacity: .8;
        margin-top: .35rem;
        animation: oppai-fade-in 0.3s var(--oppai-ease-standard) both;
      }
      .err { color: var(--md-sys-color-error); font-size: .85rem; margin-top: .5rem; }
      .typerow { display: flex; gap: 6px; margin: .9rem 0 .3rem; flex-wrap: wrap; align-items: center; }
      .typerow .lbl { font-size: .8rem; opacity: .7; margin-right: 4px; }
      .shots { display: grid; grid-template-columns: repeat(auto-fill, minmax(90px, 1fr)); gap: 8px; margin-top: .5rem; }
      .shots img { width: 100%; aspect-ratio: 16/9; object-fit: cover; border-radius: 8px; }
      .game-hint { font-size: .8rem; opacity: .75; margin-top: .5rem; }
      .progress {
        display: flex;
        align-items: center;
        gap: .6rem;
        margin-top: .9rem;
        font-size: .85rem;
        opacity: .85;
      }
      .progress md-circular-progress { --md-circular-progress-size: 22px; }
      .tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: .5rem; }
    `];J([S("md-dialog")],q.prototype,"dialog",2);J([c()],q.prototype,"urls",2);J([c()],q.prototype,"results",2);J([c()],q.prototype,"failures",2);J([c()],q.prototype,"chosen",2);J([c()],q.prototype,"busy",2);J([c()],q.prototype,"phase",2);J([c()],q.prototype,"fetchCount",2);J([c()],q.prototype,"error",2);J([c()],q.prototype,"kind",2);J([c()],q.prototype,"kindTouched",2);q=J([C("oppai-scrape-dialog")],q);var gs=Object.defineProperty,ys=Object.getOwnPropertyDescriptor,L=(t,e,i,r)=>{for(var a=r>1?void 0:r?ys(e,i):e,s=t.length-1,n;s>=0;s--)(n=t[s])&&(a=(r?n(e,i,a):n(a))||a);return r&&a&&gs(e,i,a),a};const xs=[{id:"neutral",label:"Neutral",hint:"Login screen and error popups"},{id:"happy",label:"Happy",hint:"Chat · Sweet mode"},{id:"mischievous",label:"Mischievous",hint:"Chat · Playful mode"},{id:"surprised",label:"Surprised",hint:"Chat · Bold mode"},{id:"thinking",label:"Thinking",hint:"Chat · Roleplay mode"}];let A=class extends k{constructor(){super(...arguments),this.settings=null,this.info=null,this.stats=null,this.apk=null,this.loadError="",this.dirty=!1,this.saving=!1,this.saved=!1,this.theme=$i(),this.fit=Dr(),this.hideLibby=bt(),this.outfits=[],this.wornOutfit=Cr(),this.outfitDraft=null,this.outfitBusy=!1,this.pwCurrent="",this.pwNew="",this.pwConfirm="",this.pwBusy=!1,this.pwMsg="",this.pwErr=""}connectedCallback(){super.connectedCallback(),this.load(),this.loadOutfits()}async loadOutfits(){try{const t=await b.libbyOutfits();this.outfits=t.outfits,this.wornOutfit&&!t.outfits.some(e=>e.id===this.wornOutfit)&&(this.wornOutfit="",Gi(""))}catch{}}async load(){try{const[t,e]=await Promise.all([b.getSettings(),b.stats()]);this.settings=t.settings,this.info=t.readOnly,this.stats=e}catch(t){this.loadError=t.message}try{this.apk=await b.apkInfo()}catch{this.apk={available:!1}}}get canEdit(){var t;return!!((t=this.user)!=null&&t.isAdmin)}edit(t){!this.settings||!this.canEdit||(this.settings={...this.settings,...t},this.dirty=!0,this.saved=!1)}async save(){if(this.settings){this.saving=!0;try{const t=await b.saveSettings(this.settings);this.settings=t.settings,this.info=t.readOnly,this.dirty=!1,this.saved=!0}catch(t){this.loadError=t.message}finally{this.saving=!1}}}pickTheme(t){this.theme=t,ts(t),ki(t)}pickFit(t){this.fit=t,Rr(t)}async changePassword(){if(this.pwMsg="",this.pwErr="",this.pwNew!==this.pwConfirm){this.pwErr="The new passwords don't match.";return}if(this.pwNew.length<8){this.pwErr="Use at least 8 characters.";return}this.pwBusy=!0;try{await b.changePassword(this.pwCurrent,this.pwNew),this.pwMsg="Password changed.",this.pwCurrent=this.pwNew=this.pwConfirm=""}catch(t){this.pwErr=t.message}finally{this.pwBusy=!1}}render(){return o`
      <div class="wrap">
        ${this.loadError?o`<div class="banner error">
              <span class="material-symbols-rounded" style="font-size:18px;">error</span>
              ${this.loadError}
            </div>`:l}
        ${!this.canEdit&&this.settings?o`<div class="banner info">
              <span class="material-symbols-rounded" style="font-size:18px;">lock</span>
              Server settings are read-only — only an admin can change them.
            </div>`:l}
        ${this.renderAppearance()} ${this.renderLibby()} ${this.renderAI()} ${this.renderScraping()}
        ${this.dirty||this.saved?this.renderSaveBar():l} ${this.renderLibrary()}
        ${this.renderAndroid()} ${this.renderAccount()} ${this.renderAbout()}
      </div>
    `}renderSaveBar(){return o`
      <div class="savebar">
        <span class="grow">
          ${this.saved&&!this.dirty?"Settings saved — they're live now.":"You have unsaved changes."}
        </span>
        <button class="btn-primary" ?disabled=${this.saving||!this.dirty} @click=${this.save}>
          <span class="material-symbols-rounded" style="font-size:20px;">save</span>
          ${this.saving?"Saving…":"Save"}
        </button>
      </div>
    `}renderAndroid(){const t=this.apk;return o`
      <section class="card">
        <h3><span class="material-symbols-rounded">android</span>Android app</h3>
        <p class="card-sub">
          Install the companion app straight from this server — no app store, no
          sideloading from a third party.
        </p>

        ${t===null?o`<p class="field-help">Checking…</p>`:t.available?o`
                <div class="field">
                  <div class="field-text">
                    <div class="field-label">oppailib.apk</div>
                    <div class="field-help">
                      ${It(t.size??0)} · built
                      ${new Date((t.modified??0)*1e3).toLocaleDateString()}
                      ${t.sha256?o`<br /><span style="font-family:monospace; font-size:11px;"
                            >sha256 ${t.sha256.slice(0,16)}…</span
                          >`:l}
                    </div>
                  </div>
                  <div class="field-control">
                    <a href="/api/apk" download="oppailib.apk">
                      <button class="btn-primary">
                        <span class="material-symbols-rounded" style="font-size:20px;">download</span>
                        Download
                      </button>
                    </a>
                  </div>
                </div>

                <div class="field">
                  <div class="field-text">
                    <div class="field-label">Install on a phone</div>
                    <div class="field-help">
                      Open this page on the phone, sign in, and tap Download. Android
                      asks you to allow installing from the browser the first time.
                    </div>
                  </div>
                  <div class="field-control">
                    <code style="font-size:12px; opacity:0.8;">${location.origin}/api/apk</code>
                  </div>
                </div>
              `:o`<p class="field-help">
                No APK is bundled with this server build. Drop one at
                <code>/config/oppailib.apk</code>, or grab it from the Actions run that
                built this image.
              </p>`}
      </section>
    `}renderAppearance(){return o`
      <section class="card">
        <h3><span class="material-symbols-rounded">palette</span>Appearance</h3>
        <p class="card-sub">Per-device — applies as soon as you pick it.</p>

        <div class="field">
          <div class="field-text">
            <div class="field-label">Theme</div>
            <div class="field-help">"System" follows your OS light/dark setting.</div>
          </div>
          <div class="field-control seg">
            ${[["dark","Dark","dark_mode"],["light","Light","light_mode"],["system","System","contrast"]].map(([t,e,i])=>o`<button
                class=${this.theme===t?"on":""}
                @click=${()=>this.pickTheme(t)}
              >
                <span class="material-symbols-rounded" style="font-size:18px;">${i}</span>${e}
              </button>`)}
          </div>
        </div>

        <div class="field">
          <div class="field-text">
            <div class="field-label">Comic page size</div>
            <div class="field-help">
              How pages are sized in the reader. Fit page shows the whole page; fit width fills the
              column and scrolls.
            </div>
          </div>
          <div class="field-control seg">
            ${[["page","Fit page","fit_screen"],["width","Fit width","fit_width"]].map(([t,e,i])=>o`<button
                class=${this.fit===t?"on":""}
                @click=${()=>this.pickFit(t)}
              >
                <span class="material-symbols-rounded" style="font-size:18px;">${i}</span>${e}
              </button>`)}
          </div>
        </div>
      </section>
    `}renderLibby(){return o`
      <section class="card" style="animation-delay:30ms;">
        <h3><span class="material-symbols-rounded">face_3</span>Libby</h3>
        <p class="card-sub">Per-device — applies as soon as you pick it.</p>

        <div class="field">
          <div class="field-text">
            <div class="field-label">Hide Libby</div>
            <div class="field-help">
              Take the mascot off the login screen, error popups, and the Chat tab.
              Errors still show as plain messages, and Chat keeps working — just without
              the artwork.
            </div>
          </div>
          <div class="field-control">
            <button
              class="switch ${this.hideLibby?"on":""}"
              role="switch"
              aria-checked=${this.hideLibby?"true":"false"}
              aria-label="Hide Libby"
              @click=${()=>{this.hideLibby=!this.hideLibby,rs(this.hideLibby)}}
            ></button>
          </div>
        </div>

        <div class="field stack">
          <div class="field-text">
            <div class="field-label">Outfits</div>
            <div class="field-help">
              Dress Libby up: an outfit swaps her artwork, one image per emotion. Drop
              images onto the emotion slots in the editor; an emotion you leave empty
              falls back to the default art. Which outfit she wears is per-device.
            </div>
          </div>
          <div class="field-control" style="display:block;">
            <div class="outfit-row" style="border-top:none;">
              <span class="name">Default Libby</span>
              <button
                class="outfit-btn ${this.wornOutfit===""?"on":""}"
                @click=${()=>this.wearOutfit("")}
              >${this.wornOutfit===""?"Wearing":"Wear"}</button>
            </div>
            ${this.outfits.map(t=>o`<div class="outfit-row">
                <span class="name">${t.name}</span>
                <span class="meta">${t.emotions.length}/5 emotions</span>
                <button
                  class="outfit-btn ${this.wornOutfit===t.id?"on":""}"
                  @click=${()=>this.wearOutfit(this.wornOutfit===t.id?"":t.id)}
                >${this.wornOutfit===t.id?"Wearing":"Wear"}</button>
                <button class="outfit-btn" @click=${()=>this.openOutfitEditor(t)}>Edit</button>
              </div>`)}
            <div class="outfit-row" style="border-top:none; padding-top:12px;">
              <button
                class="outfit-btn"
                @click=${()=>this.outfitDraft={name:"",existing:[],staged:{}}}
              >
                <span class="material-symbols-rounded" style="font-size:14px; vertical-align:-2px;">add</span>
                New outfit
              </button>
            </div>
          </div>
        </div>
      </section>
      ${this.outfitDraft?this.renderOutfitEditor(this.outfitDraft):l}
    `}wearOutfit(t){this.wornOutfit=t,Gi(t)}openOutfitEditor(t){this.outfitDraft={id:t.id,name:t.name,existing:[...t.emotions],staged:{}}}stageEmotion(t,e){if(!e||!e.type.startsWith("image/")||!this.outfitDraft)return;const i=new FileReader;i.onload=()=>{this.outfitDraft&&(this.outfitDraft={...this.outfitDraft,staged:{...this.outfitDraft.staged,[t]:String(i.result)}})},i.readAsDataURL(e)}async saveOutfit(){const t=this.outfitDraft;if(!(!t||!t.name.trim()||this.outfitBusy)){this.outfitBusy=!0;try{const e=await b.saveLibbyOutfit({id:t.id,name:t.name.trim()});for(const[i,r]of Object.entries(t.staged))await b.setLibbyEmotion(e.id,i,r);this.outfitDraft=null,await this.loadOutfits()}catch(e){this.loadError=e.message}finally{this.outfitBusy=!1}}}async deleteOutfit(){const t=this.outfitDraft;if(!(!(t!=null&&t.id)||this.outfitBusy)&&confirm(`Delete the “${t.name}” outfit?`)){this.outfitBusy=!0;try{await b.deleteLibbyOutfit(t.id),this.wornOutfit===t.id&&this.wearOutfit(""),this.outfitDraft=null,await this.loadOutfits()}catch(e){this.loadError=e.message}finally{this.outfitBusy=!1}}}renderOutfitEditor(t){return o`
      <div class="outfit-overlay" @click=${e=>{e.target===e.currentTarget&&(this.outfitDraft=null)}}>
        <div class="outfit-dialog">
          <h3>${t.id?"Edit outfit":"New outfit"}</h3>
          <input
            type="text"
            placeholder="Outfit name (Summer dress, Maid, …)"
            .value=${t.name}
            @input=${e=>this.outfitDraft={...t,name:e.target.value}}
          />
          <div class="slots">
            ${xs.map(e=>{const i=t.staged[e.id],r=!i&&t.id&&t.existing.includes(e.id)?`/api/libby/outfits/${encodeURIComponent(t.id)}/emotions/${e.id}`:"";return o`
                <label
                  class="slot"
                  @dragover=${a=>{a.preventDefault(),a.currentTarget.classList.add("dragover")}}
                  @dragleave=${a=>a.currentTarget.classList.remove("dragover")}
                  @drop=${a=>{var s,n;a.preventDefault(),a.currentTarget.classList.remove("dragover"),this.stageEmotion(e.id,(n=(s=a.dataTransfer)==null?void 0:s.files)==null?void 0:n[0])}}
                >
                  ${i?o`<img src=${i} alt=${e.label} />`:r?o`<img src=${r} alt=${e.label} />`:o`<div class="drop-hint">Drop an image here<br />or click to browse</div>`}
                  <div class="slot-label">${e.label}</div>
                  <div class="slot-hint">${e.hint}</div>
                  <input
                    type="file"
                    accept="image/*"
                    style="display:none;"
                    @change=${a=>{var n;const s=a.target;this.stageEmotion(e.id,(n=s.files)==null?void 0:n[0]),s.value=""}}
                  />
                </label>
              `})}
          </div>
          <div class="outfit-actions">
            ${t.id?o`<button class="outfit-btn danger" ?disabled=${this.outfitBusy} @click=${()=>this.deleteOutfit()}>
                  Delete outfit
                </button>`:l}
            <button class="outfit-btn" @click=${()=>this.outfitDraft=null}>Cancel</button>
            <button
              class="btn-primary"
              ?disabled=${!t.name.trim()||this.outfitBusy}
              @click=${()=>this.saveOutfit()}
            >
              ${this.outfitBusy?"Saving…":"Save outfit"}
            </button>
          </div>
        </div>
      </div>
    `}renderAI(){const t=this.settings,e=this.info;return o`
      <section class="card" style="animation-delay:60ms;">
        <h3><span class="material-symbols-rounded">auto_awesome</span>AI auto-tagging</h3>
        <p class="card-sub">
          Tagging runs entirely on this box — no image ever leaves it. The heuristic tagger needs no
          model; a real classifier requires an ONNX build with a model in the model directory.
        </p>

        ${t?o`
              ${this.switchField("Enable auto-tagging","Master switch. Off means no tagging at all, including the ✨ button.",t.aiEnabled,i=>this.edit({aiEnabled:i}))}
              ${this.switchField("Tag on import","Tag new uploads and imports automatically. With this off, tagging only happens when you ask for it.",t.aiAutoTag,i=>this.edit({aiAutoTag:i}),!t.aiEnabled)}

              <div class="field">
                <div class="field-text">
                  <div class="field-label">Minimum confidence</div>
                  <div class="field-help">Suggestions the tagger is less sure of than this are dropped.</div>
                </div>
                <div class="field-control">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    .value=${String(t.aiMinScore)}
                    ?disabled=${!this.canEdit||!t.aiEnabled}
                    @input=${i=>this.edit({aiMinScore:Number(i.target.value)})}
                  />
                  <span class="value">${t.aiMinScore.toFixed(2)}</span>
                </div>
              </div>

              <div class="field">
                <div class="field-text">
                  <div class="field-label">Maximum tags per item</div>
                  <div class="field-help">Only the highest-scoring suggestions are kept (1–100).</div>
                </div>
                <div class="field-control">
                  <input
                    type="number"
                    min="1"
                    max="100"
                    .value=${String(t.aiMaxTags)}
                    ?disabled=${!this.canEdit||!t.aiEnabled}
                    @change=${i=>this.edit({aiMaxTags:Number(i.target.value)})}
                  />
                </div>
              </div>

              ${e?o`
                    ${this.readOnlyField("Active tagger","Chosen at startup.",e.aiTagger)}
                    ${this.readOnlyField("Inference device","OPPAI_AI_DEVICE — needs a restart to change.",e.aiDevice)}
                    ${this.readOnlyField("Model directory","OPPAI_AI_MODEL_DIR — needs a restart to change.",e.aiModelDir)}
                  `:l}
            `:o`<div class="field-help">Loading…</div>`}
      </section>
    `}renderScraping(){const t=this.settings;return o`
      <section class="card" style="animation-delay:120ms;">
        <h3><span class="material-symbols-rounded">travel_explore</span>Import &amp; scraping</h3>
        <p class="card-sub">How OppaiLib behaves toward the sites you import from.</p>

        ${t?o`
              ${this.switchField("Respect robots.txt","Skip URLs a site asks crawlers not to fetch.",t.scrapeRespectRobots,e=>this.edit({scrapeRespectRobots:e}))}

              <div class="field">
                <div class="field-text">
                  <div class="field-label">Delay between requests</div>
                  <div class="field-help">
                    Minimum gap between two requests to the same host, in milliseconds (250–60000).
                  </div>
                </div>
                <div class="field-control">
                  <input
                    type="number"
                    min="250"
                    max="60000"
                    step="250"
                    .value=${String(t.scrapeDelayMs)}
                    ?disabled=${!this.canEdit}
                    @change=${e=>this.edit({scrapeDelayMs:Number(e.target.value)})}
                  />
                  <span class="value">ms</span>
                </div>
              </div>

              <div class="field stack">
                <div class="field-text">
                  <div class="field-label">User agent</div>
                  <div class="field-help">
                    Sent with every scrape. The default impersonates a browser because many sites only
                    serve metadata to one; clear it back to that default by leaving it blank.
                  </div>
                </div>
                <div class="field-control">
                  <input
                    type="text"
                    .value=${t.scrapeUserAgent}
                    ?disabled=${!this.canEdit}
                    @change=${e=>this.edit({scrapeUserAgent:e.target.value})}
                  />
                </div>
              </div>

              <div class="field stack">
                <div class="field-text">
                  <div class="field-label">F95zone login</div>
                  <div class="field-help">
                    Most f95zone.to game threads are members-only. Sign in with your F95 account and
                    OppaiLib can fetch those when you scrape a thread URL. Leave blank to scrape only
                    public threads. Stored on your server; the password is never sent back to this page.
                  </div>
                </div>
                <div class="field-control">
                  <input
                    type="text"
                    autocomplete="off"
                    placeholder="F95 username"
                    .value=${t.f95Username}
                    ?disabled=${!this.canEdit}
                    @change=${e=>this.edit({f95Username:e.target.value})}
                  />
                </div>
                <div class="field-control">
                  <input
                    type="password"
                    autocomplete="new-password"
                    placeholder=${t.f95PasswordSet?"•••••••• (unchanged)":"F95 password"}
                    ?disabled=${!this.canEdit}
                    @change=${e=>this.edit({f95Password:e.target.value})}
                  />
                </div>
              </div>

              <div class="field stack">
                <div class="field-text">
                  <div class="field-label">Image generation</div>
                  <div class="field-help">
                    URL of a local image generator on your network — an InvokeAI server
                    (e.g. <code>http://192.168.1.10:9090</code>) or an Automatic1111 / SD.Next
                    one (e.g. <code>http://192.168.1.10:7860</code>). Which API it speaks is
                    detected automatically. Set it to turn on the <strong>Create</strong> tab;
                    leave blank to keep it off. Prompts stay on your own hardware — nothing is
                    sent to a cloud service.
                  </div>
                </div>
                <div class="field-control">
                  <input
                    type="text"
                    autocomplete="off"
                    placeholder="http://host:7860"
                    .value=${t.imageGenUrl}
                    ?disabled=${!this.canEdit}
                    @change=${e=>this.edit({imageGenUrl:e.target.value})}
                  />
                </div>
              </div>

              <div class="field stack">
                <div class="field-text">
                  <div class="field-label">Libby chat</div>
                  <div class="field-help">
                    OpenAI-compatible base URL and model for your local LLM, such as LM Studio,
                    llama.cpp, or Ollama's <code>/v1</code> bridge. OppaiLib appends
                    <code>/v1/chat/completions</code>. Both values are required to enable Chat.
                  </div>
                </div>
                <div class="field-control">
                  <input
                    type="text"
                    autocomplete="off"
                    placeholder="http://host:1234"
                    .value=${t.chatUrl}
                    ?disabled=${!this.canEdit}
                    @change=${e=>this.edit({chatUrl:e.target.value})}
                  />
                </div>
                <div class="field-control">
                  <input
                    type="text"
                    autocomplete="off"
                    placeholder="Local model name"
                    .value=${t.chatModel}
                    ?disabled=${!this.canEdit}
                    @change=${e=>this.edit({chatModel:e.target.value})}
                  />
                </div>
              </div>
            `:o`<div class="field-help">Loading…</div>`}
      </section>
    `}renderLibrary(){const t=this.stats;if(!t)return l;const e=new Map(t.kinds.map(i=>[i.kind,i]));return o`
      <section class="card" style="animation-delay:180ms;">
        <h3><span class="material-symbols-rounded">inventory_2</span>Library</h3>
        <p class="card-sub">
          ${t.items} ${t.items===1?"item":"items"} · ${It(t.bytes)} stored ·
          ${t.tags} ${t.tags===1?"tag":"tags"}
        </p>
        <div class="stat-grid">
          ${Object.keys(H).map(i=>{const r=e.get(i);return o`<div class="stat">
              <div class="stat-num">${(r==null?void 0:r.count)??0}</div>
              <div class="stat-label">${H[i].label} · ${It((r==null?void 0:r.bytes)??0)}</div>
            </div>`})}
        </div>
      </section>
    `}renderAccount(){var t,e;return o`
      <section class="card" style="animation-delay:240ms;">
        <h3><span class="material-symbols-rounded">account_circle</span>Account</h3>
        <p class="card-sub">
          Signed in as <strong>${(t=this.user)==null?void 0:t.username}</strong>${(e=this.user)!=null&&e.isAdmin?" (admin)":""}.
        </p>

        ${this.pwErr?o`<div class="banner error">
              <span class="material-symbols-rounded" style="font-size:18px;">error</span>${this.pwErr}
            </div>`:l}
        ${this.pwMsg?o`<div class="banner ok">
              <span class="material-symbols-rounded" style="font-size:18px;">check_circle</span>${this.pwMsg}
            </div>`:l}

        <div class="pw">
          <input
            type="password"
            placeholder="Current password"
            autocomplete="current-password"
            .value=${this.pwCurrent}
            @input=${i=>this.pwCurrent=i.target.value}
          />
          <input
            type="password"
            placeholder="New password (8+ characters)"
            autocomplete="new-password"
            .value=${this.pwNew}
            @input=${i=>this.pwNew=i.target.value}
          />
          <input
            type="password"
            placeholder="Confirm new password"
            autocomplete="new-password"
            .value=${this.pwConfirm}
            @input=${i=>this.pwConfirm=i.target.value}
          />
          <div>
            <button
              class="btn-primary"
              ?disabled=${this.pwBusy||!this.pwCurrent||!this.pwNew}
              @click=${this.changePassword}
            >
              <span class="material-symbols-rounded" style="font-size:20px;">key</span>
              ${this.pwBusy?"Changing…":"Change password"}
            </button>
          </div>
        </div>
      </section>
    `}renderAbout(){const t=this.info;return t?o`
      <section class="card" style="animation-delay:300ms;">
        <h3><span class="material-symbols-rounded">info</span>About this server</h3>
        <p class="card-sub">Set by environment variables; changing them needs a restart.</p>
        ${this.readOnlyField("Version","The running build.",t.version)}
        ${this.readOnlyField("Video thumbnails","Posters need ffmpeg on the server's PATH.",t.ffmpeg?"ffmpeg available":"ffmpeg missing — posters disabled")}
        ${this.readOnlyField("Media directory","Where encrypted blobs live.",t.mediaDir)}
        ${this.readOnlyField("Database","SQLite metadata store.",t.dbPath)}
        ${this.readOnlyField("Session length","How long a login stays valid.",`${t.sessionHours} hours`)}
      </section>
    `:l}switchField(t,e,i,r,a=!1){const s=!this.canEdit||a;return o`
      <div class="field">
        <div class="field-text">
          <div class="field-label">${t}</div>
          <div class="field-help">${e}</div>
        </div>
        <div class="field-control">
          <button
            class="switch ${i?"on":""}"
            role="switch"
            aria-checked=${i?"true":"false"}
            aria-label=${t}
            ?disabled=${s}
            @click=${()=>r(!i)}
          ></button>
        </div>
      </div>
    `}readOnlyField(t,e,i){return o`
      <div class="field">
        <div class="field-text">
          <div class="field-label">${t}</div>
          <div class="field-help">${e}</div>
        </div>
        <div class="field-control"><span class="ro">${i}</span></div>
      </div>
    `}};A.styles=[me,ee,y`
      :host {
        display: block;
      }
      .wrap {
        max-width: 780px;
        margin: 0 auto;
        padding-bottom: 40px;
      }
      .card {
        background: var(--oppai-surface);
        border: 1px solid var(--oppai-border);
        border-radius: 20px;
        padding: 22px 24px;
        margin-bottom: 20px;
        animation: oppai-fade-in-up 0.4s var(--oppai-ease-emphasized) both;
      }
      .card h3 {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 17px;
        font-weight: 500;
        margin: 0 0 4px;
      }
      .card h3 .material-symbols-rounded {
        font-size: 22px;
        color: var(--oppai-primary-bright);
      }
      .card-sub {
        font-size: 13px;
        color: var(--oppai-text-muted);
        margin: 0 0 18px;
      }
      .field {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 12px 0;
        border-top: 1px solid var(--oppai-border);
      }
      .field:first-of-type {
        border-top: none;
      }
      .field-text {
        flex: 1;
        min-width: 0;
      }
      .field-label {
        font-size: 14px;
        font-weight: 500;
      }
      .field-help {
        font-size: 12px;
        color: var(--oppai-text-muted);
        margin-top: 2px;
      }
      .field-control {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        gap: 10px;
      }
      /* Stacked variant for controls too wide to sit beside their label. */
      .field.stack {
        display: block;
      }
      .field.stack .field-control {
        margin-top: 10px;
      }

      input[type="text"],
      input[type="number"],
      input[type="password"] {
        background: var(--oppai-surface-2);
        border: 1px solid var(--oppai-border-strong);
        border-radius: 12px;
        color: var(--oppai-text);
        font: inherit;
        font-size: 14px;
        padding: 10px 12px;
        outline: none;
        width: 100%;
        box-sizing: border-box;
      }
      input:focus {
        border-color: var(--oppai-primary);
      }
      input[disabled] {
        opacity: 0.55;
      }
      input[type="number"] {
        width: 110px;
      }
      input[type="range"] {
        width: 160px;
        accent-color: var(--oppai-primary);
      }

      /* Switch */
      .switch {
        width: 52px;
        height: 30px;
        border-radius: 15px;
        border: none;
        background: var(--oppai-surface-2);
        position: relative;
        cursor: pointer;
        transition: background 0.2s ease;
        flex-shrink: 0;
      }
      .switch.on {
        background: var(--oppai-primary);
      }
      .switch[disabled] {
        opacity: 0.5;
        cursor: default;
      }
      .switch::after {
        content: "";
        position: absolute;
        top: 4px;
        left: 4px;
        width: 22px;
        height: 22px;
        border-radius: 11px;
        background: var(--oppai-text-muted);
        transition: transform 0.22s var(--oppai-ease-spring), background 0.2s ease;
      }
      .switch.on::after {
        transform: translateX(22px);
        background: var(--oppai-on-primary);
      }

      /* Segmented choice */
      .seg {
        display: flex;
        gap: 6px;
      }
      .seg button {
        height: 36px;
        padding: 0 14px;
        border-radius: 18px;
        border: 1px solid var(--oppai-border-strong);
        background: none;
        color: var(--oppai-text-dim);
        font: inherit;
        font-size: 13px;
        font-weight: 500;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .seg button.on {
        background: var(--oppai-accent);
        border-color: var(--oppai-accent);
        color: var(--oppai-on-accent);
      }

      .value {
        font: 600 13px ui-monospace, monospace;
        color: var(--oppai-text-dim);
        min-width: 40px;
        text-align: right;
      }
      .ro {
        font: 500 12px ui-monospace, monospace;
        color: var(--oppai-text-muted);
        word-break: break-all;
        text-align: right;
      }

      .btn-primary {
        height: 44px;
        padding: 0 24px;
        border-radius: 22px;
        background: var(--oppai-primary);
        color: var(--oppai-on-primary);
        border: none;
        font: inherit;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 8px;
      }
      .btn-primary[disabled] {
        opacity: 0.5;
        cursor: default;
      }

      .banner {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 13px;
        border-radius: 12px;
        padding: 10px 14px;
        margin-bottom: 20px;
      }
      .banner.info {
        background: var(--oppai-surface-2);
        color: var(--oppai-text-dim);
      }
      .banner.error {
        background: color-mix(in srgb, var(--oppai-fav) 18%, transparent);
        color: var(--oppai-fav);
      }
      .banner.ok {
        background: var(--oppai-primary-container);
        color: var(--oppai-primary-bright);
      }

      /* Sticky save bar for the server-side settings. */
      .savebar {
        position: sticky;
        bottom: 12px;
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        border-radius: 22px;
        background: var(--oppai-surface-2);
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.45);
        animation: oppai-scale-in 0.28s var(--oppai-ease-spring) both;
      }
      .savebar .grow {
        flex: 1;
        font-size: 13px;
        color: var(--oppai-text-dim);
      }

      .stat-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        gap: 12px;
      }
      .stat {
        background: var(--oppai-surface-2);
        border-radius: 14px;
        padding: 12px 14px;
      }
      .stat-num {
        font-size: 20px;
        font-weight: 500;
      }
      .stat-label {
        font-size: 12px;
        color: var(--oppai-text-muted);
        margin-top: 2px;
      }
      .pw {
        display: flex;
        flex-direction: column;
        gap: 12px;
        max-width: 360px;
      }
    `,y`
      .outfit-row {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 0;
        border-top: 1px solid var(--oppai-border);
        font-size: 14px;
      }
      .outfit-row .name {
        flex: 1;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .outfit-row .meta {
        font-size: 12px;
        color: var(--oppai-text-muted);
      }
      .outfit-btn {
        border: 1px solid var(--oppai-border-strong);
        background: transparent;
        color: var(--oppai-text-dim);
        border-radius: 999px;
        font: inherit;
        font-size: 12px;
        padding: 5px 12px;
        cursor: pointer;
      }
      .outfit-btn.on {
        background: var(--oppai-accent);
        color: var(--oppai-on-accent);
        border-color: var(--oppai-accent);
      }
      .outfit-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.55);
        display: grid;
        place-items: center;
        z-index: 50;
        padding: 20px;
      }
      .outfit-dialog {
        background: var(--oppai-surface);
        border: 1px solid var(--oppai-border);
        border-radius: 18px;
        padding: 18px;
        width: min(640px, 100%);
        max-height: 92vh;
        overflow-y: auto;
      }
      .outfit-dialog h3 {
        margin: 0 0 12px;
        font-size: 16px;
      }
      .slots {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 12px;
        margin-top: 14px;
      }
      .slot {
        border: 2px dashed var(--oppai-border-strong);
        border-radius: 14px;
        padding: 10px;
        text-align: center;
        cursor: pointer;
        transition: border-color 0.15s ease, background 0.15s ease;
      }
      .slot.dragover {
        border-color: var(--oppai-primary);
        background: var(--oppai-surface-2);
      }
      .slot img {
        width: 100%;
        aspect-ratio: 3 / 4;
        object-fit: contain;
        border-radius: 10px;
        background: var(--oppai-surface-2);
      }
      .slot .drop-hint {
        aspect-ratio: 3 / 4;
        display: grid;
        place-items: center;
        color: var(--oppai-text-muted);
        font-size: 12px;
        padding: 6px;
      }
      .slot .slot-label {
        font-size: 13px;
        font-weight: 600;
        margin-top: 6px;
      }
      .slot .slot-hint {
        font-size: 11px;
        color: var(--oppai-text-muted);
      }
      .outfit-actions {
        display: flex;
        gap: 8px;
        justify-content: flex-end;
        margin-top: 16px;
      }
      .outfit-actions .danger {
        margin-right: auto;
        color: var(--oppai-error, #f2b8b5);
      }
    `];L([m({attribute:!1})],A.prototype,"user",2);L([c()],A.prototype,"settings",2);L([c()],A.prototype,"info",2);L([c()],A.prototype,"stats",2);L([c()],A.prototype,"apk",2);L([c()],A.prototype,"loadError",2);L([c()],A.prototype,"dirty",2);L([c()],A.prototype,"saving",2);L([c()],A.prototype,"saved",2);L([c()],A.prototype,"theme",2);L([c()],A.prototype,"fit",2);L([c()],A.prototype,"hideLibby",2);L([c()],A.prototype,"outfits",2);L([c()],A.prototype,"wornOutfit",2);L([c()],A.prototype,"outfitDraft",2);L([c()],A.prototype,"outfitBusy",2);L([c()],A.prototype,"pwCurrent",2);L([c()],A.prototype,"pwNew",2);L([c()],A.prototype,"pwConfirm",2);L([c()],A.prototype,"pwBusy",2);L([c()],A.prototype,"pwMsg",2);L([c()],A.prototype,"pwErr",2);A=L([C("oppai-settings")],A);function It(t){if(!t)return"0 B";const e=["B","KB","MB","GB","TB"];let i=t,r=0;for(;i>=1024&&r<e.length-1;)i/=1024,r++;return`${i<10&&r>0?i.toFixed(1):Math.round(i)} ${e[r]}`}var ws=Object.defineProperty,_s=Object.getOwnPropertyDescriptor,I=(t,e,i,r)=>{for(var a=r>1?void 0:r?_s(e,i):e,s=t.length-1,n;s>=0;s--)(n=t[s])&&(a=(r?n(e,i,a):n(a))||a);return r&&a&&ws(e,i,a),a};let T=class extends k{constructor(){super(...arguments),this.sources=[],this.sourceId="",this.feedId="",this.container=null,this.sort="",this.query="",this.draft="",this.items=[],this.cursor="",this.loading=!1,this.loadingSources=!0,this.error="",this.active=null,this.pages=[],this.pageAt=0,this.saving=!1,this.toast="",this.commentsFor=null,this.comments=[],this.commentsLoading=!1,this.commentsError="",this.commentQuery="",this.threadQuery="",this.threadDraft="",this.reqId=0,this.leaveContainer=()=>{this.container=null,this.reset()},this.close=()=>{this.active=null,this.pages=[]},this.closeComments=()=>{this.commentsFor=null,this.comments=[],this.commentsError=""}}connectedCallback(){super.connectedCallback(),this.loadSources()}get source(){return this.sources.find(t=>t.id===this.sourceId)}get feed(){var t;return(t=this.source)==null?void 0:t.feeds.find(e=>e.id===this.feedId)}get isSearch(){var t;return!this.container&&((t=this.feed)==null?void 0:t.query)===!0}get activeFeed(){var t;return((t=this.container)==null?void 0:t.feedId)??this.feedId}get isFourChan(){return this.sourceId==="4chan"}async loadSources(){var t;try{const{sources:e}=await b.sources();this.sources=e;const i=e[0];i&&(this.sourceId=i.id,this.feedId=((t=i.feeds[0])==null?void 0:t.id)??"")}catch(e){this.error=e instanceof Error?e.message:"Couldn't reach the server"}finally{this.loadingSources=!1}this.sourceId&&this.load(!0)}async load(t){if(!this.sourceId||!t&&(this.loading||!this.cursor)||this.isSearch&&!this.query)return;const e=++this.reqId;this.loading=!0;try{const i=await b.browseSource(this.sourceId,{feed:this.activeFeed,cursor:t?void 0:this.cursor,q:this.container?void 0:this.query||void 0,sort:this.container?void 0:this.sort||void 0});if(e!==this.reqId)return;this.items=t?i.items:[...this.items,...i.items],this.cursor=i.cursor??"",this.error=""}catch(i){if(e!==this.reqId)return;this.error=i instanceof Error?i.message:"Couldn't load that feed"}finally{e===this.reqId&&(this.loading=!1)}}reset(){this.items=[],this.cursor="",this.error="",this.load(!0)}pickSource(t){var e,i;t!==this.sourceId&&(this.sourceId=t,this.feedId=((i=(e=this.sources.find(r=>r.id===t))==null?void 0:e.feeds[0])==null?void 0:i.id)??"",this.container=null,this.sort="",this.query="",this.draft="",this.reset())}pickFeed(t){var e,i;t===this.feedId&&!this.container||(this.feedId=t,this.container=null,this.sort="",((i=(e=this.source)==null?void 0:e.feeds.find(r=>r.id===t))==null?void 0:i.query)!==!0&&(this.query="",this.draft=""),this.reset())}addThread(t){var p;t.preventDefault();const e=this.threadDraft.trim(),i=e.match(/^(?:https?:\/\/)?(?:boards\.4chan\.org\/)?\/?([a-z0-9]+)\/?$/i);if(i){this.threadDraft="",this.pickFeed(i[1].toLowerCase());return}const r=e.match(/(?:boards\.4chan\.org\/)?([a-z0-9]+)\/(?:thread\/)?(\d+)/i)??e.match(/^\/?([a-z0-9]+):t?(\d+)$/i);if(!r){this.showToast("Enter a board such as /b/, or a 4chan thread URL");return}const a=r[1].toLowerCase(),s=r[2],n=`${a}:t${s}`;(p=this.source)!=null&&p.feeds.some(h=>h.id===a)&&(this.feedId=a),this.threadDraft="",this.openContainer({id:n,title:`/${a}/ thread No.${s}`,kind:"thread",thumbUrl:"",feedId:n,threadId:n})}pickSort(t){t!==this.sort&&(this.sort=t,this.reset())}openContainer(t){this.container=t,this.threadQuery="",this.reset()}submitSearch(t){t.preventDefault(),this.query=this.draft.trim(),this.container=null,this.reset()}async open(t){var e,i;if(this.active=t,this.pages=[],this.pageAt=0,t.kind==="comic")try{const{pages:r}=await b.sourcePages(this.sourceId,t.id);if(((e=this.active)==null?void 0:e.id)!==t.id)return;this.pages=r,this.warmPages(0)}catch(r){if(((i=this.active)==null?void 0:i.id)!==t.id)return;this.error=r instanceof Error?r.message:"Couldn't open that comic",this.active=null}}warmPages(t){for(let e=t;e<Math.min(t+$s,this.pages.length);e++)new Image().src=b.sourceStreamURL(this.pages[e])}goPage(t){const e=Math.min(Math.max(t,0),this.pages.length-1);e!==this.pageAt&&(this.pageAt=e,this.warmPages(e+1))}async openComments(t){var i,r,a;const e=t.threadId;if(e){this.commentsFor=t,this.comments=[],this.commentsError="",this.commentQuery="",this.commentsLoading=!0;try{const{comments:s}=await b.sourceComments(this.sourceId,e);if(((i=this.commentsFor)==null?void 0:i.id)!==t.id)return;this.comments=s}catch(s){if(((r=this.commentsFor)==null?void 0:r.id)!==t.id)return;this.commentsError=s instanceof Error?s.message:"Couldn't load the thread"}finally{((a=this.commentsFor)==null?void 0:a.id)===t.id&&(this.commentsLoading=!1)}}}save(t){if(!t||this.saving)return;const e=t.kind==="comic"||t.kind==="thread";this.saving=!0,Ar(t.title||"Source download",async i=>{try{i(.08),await b.saveFromSource(this.sourceId,{itemId:e?t.id:void 0,mediaUrl:e?void 0:t.mediaUrl,pageUrl:t.pageUrl,title:t.title,kind:e?"comic":t.kind}),i(1),this.dispatchEvent(new CustomEvent("imported",{bubbles:!0,composed:!0}))}finally{this.saving=!1}}),this.showToast(t.kind==="thread"?"Downloading thread in background":"Downloading in background")}showToast(t){this.toast=t,setTimeout(()=>{this.toast=""},2600)}renderTile(t,e){const i=t.kind==="thread",r=i?`${t.count??0}`:t.width&&t.height?`${t.width}×${t.height}`:"";return o`
      <button
        class="tile anim-rise"
        style="animation-delay:${Math.min(e,12)*45}ms;"
        @click=${()=>i?this.openContainer(t):this.open(t)}
        title=${t.title}
      >
        <div class="tile-media">
          ${t.thumbUrl?o`<img src=${b.sourceStreamURL(t.thumbUrl)} loading="lazy" alt=${t.title} />`:o`<div class="tile-blank">
                <span class="material-symbols-rounded" style="font-size:36px;">forum</span>
              </div>`}
          ${t.kind==="video"?o`<span class="play material-symbols-rounded" style="font-size:44px;">play_circle</span>`:l}
          ${r?o`<span class="tile-stat">
                ${i?o`<span class="material-symbols-rounded" style="font-size:13px;">image</span>`:l}
                ${r}
              </span>`:l}
        </div>
        <div class="tile-meta">
          <div class="tile-title">${t.title}</div>
          <div class="tile-tag">
            ${i?"Thread":t.kind==="comic"?"Gallery":t.kind}
          </div>
        </div>
      </button>
    `}renderOverlay(t){const e=t.kind==="comic",i=this.pages[this.pageAt];return o`
      <div class="overlay" @click=${r=>{r.target===r.currentTarget&&this.close()}}>
        <div class="obar">
          <button class="obtn" @click=${this.close}>
            <span class="material-symbols-rounded" style="font-size:18px;">arrow_back</span>Back
          </button>
          <span class="t">${t.title}</span>
          ${t.threadId?o`<button class="obtn" @click=${()=>this.openComments(t)}>
                <span class="material-symbols-rounded" style="font-size:18px;">forum</span>Comments
              </button>`:l}
          ${t.pageUrl?o`<a href=${t.pageUrl} target="_blank" rel="noopener noreferrer">
                <button class="obtn">
                  <span class="material-symbols-rounded" style="font-size:18px;">open_in_new</span>Source
                </button>
              </a>`:l}
          <button class="obtn" ?disabled=${this.saving} @click=${()=>this.save(t)}>
            <span class="material-symbols-rounded" style="font-size:18px;">download</span>
            ${this.saving?"Saving…":"Save to library"}
          </button>
        </div>

        <div class="ostage">
          ${e?i?o`<img src=${b.sourceStreamURL(i)} alt="Page ${this.pageAt+1}" />`:o`<md-circular-progress indeterminate></md-circular-progress>`:t.kind==="video"?o`<video
                  src=${b.sourceStreamURL(t.mediaUrl??"")}
                  controls
                  autoplay
                  loop
                  playsinline
                  preload="metadata"
                ></video>`:o`<img src=${b.sourceStreamURL(t.mediaUrl??t.thumbUrl)} alt=${t.title} />`}
        </div>

        ${t.kind==="video"?this.renderUpNext(t):l}

        ${e&&this.pages.length?o`
              <div class="pager">
                <button
                  class="obtn"
                  ?disabled=${this.pageAt===0}
                  @click=${()=>this.goPage(this.pageAt-1)}
                >
                  <span class="material-symbols-rounded" style="font-size:18px;">chevron_left</span>
                </button>
                <span>${this.pageAt+1} / ${this.pages.length}</span>
                <button
                  class="obtn"
                  ?disabled=${this.pageAt>=this.pages.length-1}
                  @click=${()=>this.goPage(this.pageAt+1)}
                >
                  <span class="material-symbols-rounded" style="font-size:18px;">chevron_right</span>
                </button>
              </div>
            `:l}
      </div>
    `}renderUpNext(t){const e=this.items.filter(r=>r.kind==="video");if(e.some(r=>r.id===t.id)||e.unshift(t),e.length<2)return l;const i=e.findIndex(r=>r.id===t.id);return o`
      <div class="upnext">
        <div class="upnext-label">Videos</div>
        <div class="strip">
          ${e.map((r,a)=>o`
              <button
                class="strip-item ${r.id===t.id?"on":""}"
                title=${r.title}
                aria-current=${r.id===t.id}
                @click=${()=>this.open(r)}
              >
                <img src=${b.sourceStreamURL(r.thumbUrl)} loading="lazy" alt=${r.title} />
                ${r.kind==="video"?o`<span class="strip-play material-symbols-rounded">play_circle</span>`:l}
                ${a===i+1?o`<span class="strip-next">Next</span>`:l}
              </button>
            `)}
        </div>
      </div>
    `}renderComments(t){const e=t.postNo,i=this.commentQuery.trim().toLowerCase(),r=i?this.comments.filter(a=>[String(a.no),a.name,a.subject,a.text].some(s=>(s??"").toLowerCase().includes(i))):this.comments;return o`
      <div
        class="overlay comments"
        @click=${a=>{a.target===a.currentTarget&&this.closeComments()}}
      >
        <div class="cpanel">
          <div class="chead">
            <span class="t">${t.title}</span>
            <button class="obtn" @click=${this.closeComments}>
              <span class="material-symbols-rounded" style="font-size:18px;">close</span>Close
            </button>
          </div>

          <div class="comment-search">
            <label class="searchbox">
              <span class="material-symbols-rounded" style="font-size:19px; color:var(--oppai-text-dim);">search</span>
              <input
                type="search"
                placeholder="Search this thread…"
                .value=${this.commentQuery}
                @input=${a=>this.commentQuery=a.target.value}
              />
            </label>
          </div>

          ${this.commentsLoading?o`<div class="cempty"><md-circular-progress indeterminate></md-circular-progress></div>`:this.commentsError?o`<div class="cempty">${this.commentsError}</div>`:r.length?o`<div class="clist">
                    ${r.map(a=>this.renderComment(a,a.no===e))}
                  </div>`:o`<div class="cempty">${i?"No matching posts.":"No posts in this thread."}</div>`}
        </div>
      </div>
    `}renderComment(t,e){return o`
      <article id=${`post-${t.no}`} class="cpost ${e?"here":""} ${t.op?"op":""}">
        <header class="cmeta">
          ${t.op?o`<span class="cbadge">OP</span>`:l}
          ${e?o`<span class="cbadge here-badge">This file</span>`:l}
          <span class="cname">${t.name||"Anonymous"}</span>
          <span class="cno">No.${t.no}</span>
          <span class="ctime">${ks(t.time)}</span>
        </header>
        ${t.subject?o`<div class="csub">${t.subject}</div>`:l}
        ${this.renderAttachment(t)}
        ${t.text?o`<div class="ctext">${Cs(t.text,i=>this.goToPost(i))}</div>`:l}
      </article>
    `}goToPost(t){this.commentQuery="",this.updateComplete.then(()=>{var e;(e=this.renderRoot.querySelector(`#post-${t}`))==null||e.scrollIntoView({behavior:"smooth",block:"center"})})}renderAttachment(t){if(!t.thumbUrl)return l;const e=t.kind==="video";return o`
      <button
        class="cattach"
        title=${e?"Play this video":"Open this file"}
        @click=${()=>this.openAttachment(t)}
      >
        <img class="cthumb" src=${b.sourceStreamURL(t.thumbUrl)} loading="lazy" alt="" />
        ${e?o`<span class="cplay material-symbols-rounded">play_circle</span>`:l}
      </button>
    `}openAttachment(t){var r;const i=(t.itemId?this.items.find(a=>a.id===t.itemId):void 0)??{id:t.itemId??`post-${t.no}`,title:t.subject||`No.${t.no}`,kind:t.kind??"image",thumbUrl:t.thumbUrl??"",mediaUrl:t.mediaUrl,threadId:(r=this.commentsFor)==null?void 0:r.threadId,postNo:t.no};this.closeComments(),this.open(i)}renderContainerHead(t){var e;return o`
      <div class="head">
        <h2 class="title">${t.title}</h2>
        <span class="count">
          ${this.items.length} ${this.items.length===1?"file":"files"}
        </span>
        <div class="head-actions">
          <button class="chip ghost" @click=${this.leaveContainer}>
            <span class="material-symbols-rounded" style="font-size:16px;">arrow_back</span>
            Back to ${((e=this.feed)==null?void 0:e.label)??"the board"}
          </button>
          ${t.threadId?o`<button class="chip ghost" @click=${()=>this.openComments(t)}>
                <span class="material-symbols-rounded" style="font-size:16px;">forum</span>
                Comments
              </button>`:l}
          <button class="chip ghost" ?disabled=${this.saving} @click=${()=>this.save(t)}>
            <span class="material-symbols-rounded" style="font-size:16px;">download</span>
            ${this.saving?"Saving…":"Save whole thread"}
          </button>
        </div>
      </div>
      <div class="thread-tools">
        <label class="searchbox">
          <span class="material-symbols-rounded" style="font-size:20px; color:var(--oppai-text-dim);">search</span>
          <input
            type="search"
            placeholder="Search files in this thread…"
            .value=${this.threadQuery}
            @input=${i=>this.threadQuery=i.target.value}
          />
        </label>
      </div>
    `}render(){var a,s,n,p,h,f,v;if(this.loadingSources)return o`<div class="empty"><md-circular-progress indeterminate></md-circular-progress></div>`;if(!this.sources.length)return o`<div class="empty">No remote sources are configured.</div>`;const t=((a=this.feed)==null?void 0:a.sorts)??[],e=this.container,i=this.threadQuery.trim().toLowerCase(),r=e&&i?this.items.filter(u=>[u.title,String(u.postNo??""),u.kind].some(g=>g.toLowerCase().includes(i))):this.items;return o`
      ${e?this.renderContainerHead(e):o`
            <div class="head">
              <h2 class="title">${((s=this.source)==null?void 0:s.name)??"Browse"}</h2>
              <span class="count">${this.items.length?`${this.items.length} shown`:""}</span>
            </div>

            ${this.sources.length>1?o`<div class="chips tight">
                  ${this.sources.map(u=>o`<button
                      class="chip"
                      aria-pressed=${u.id===this.sourceId}
                      @click=${()=>this.pickSource(u.id)}
                    >${u.name}</button>`)}
                </div>`:l}

            ${this.isFourChan?o`<div class="thread-tools">
                  <select
                    class="feed-select"
                    aria-label="4chan board"
                    @change=${u=>this.pickFeed(u.target.value)}
                  >
                    ${(((n=this.source)==null?void 0:n.feeds)??[]).map(u=>o`<option value=${u.id} ?selected=${u.id===this.feedId}>${u.label}</option>`)}
					${(p=this.source)!=null&&p.feeds.some(u=>u.id===this.feedId)?l:o`<option value=${this.feedId} selected>/${this.feedId}/ — Custom board</option>`}
                  </select>
                  <form class="thread-tools add-thread" @submit=${this.addThread}>
                    <label class="searchbox">
                      <span class="material-symbols-rounded" style="font-size:20px; color:var(--oppai-text-dim);">add_link</span>
                      <input
                        placeholder="Type /b/ or paste a thread URL"
                        .value=${this.threadDraft}
                        @input=${u=>this.threadDraft=u.target.value}
                      />
                    </label>
                    <button class="chip" type="submit">Open</button>
                  </form>
                </div>`:o`<div class="chips ${this.isSearch?"tight":""}">
                  ${(((h=this.source)==null?void 0:h.feeds)??[]).map(u=>o`<button
                      class="chip"
                      aria-pressed=${u.id===this.feedId}
                      @click=${()=>this.pickFeed(u.id)}
                    >${u.label}</button>`)}
                </div>`}

            ${this.isSearch?o`
                  <form class="searchbar" @submit=${this.submitSearch}>
                    <label class="searchbox">
                      <span class="material-symbols-rounded" style="font-size:20px; color:var(--oppai-text-dim);"
                        >search</span
                      >
                      <input
                        type="search"
                        placeholder="Search ${((f=this.source)==null?void 0:f.name)??""}…"
                        .value=${this.draft}
                        @input=${u=>{this.draft=u.target.value}}
                      />
                    </label>
                    <button class="chip" type="submit">Search</button>
                  </form>
                  ${t.length?o`<div class="chips tight">
                        ${t.map(u=>o`<button
                            class="chip"
                            aria-pressed=${u.id===(this.sort||t[0].id)}
                            @click=${()=>this.pickSort(u.id)}
                          >${u.label}</button>`)}
                      </div>`:l}
                `:l}
          `}

      ${this.error&&!this.items.length?o`<div class="empty">
            <span class="material-symbols-rounded" style="font-size:40px; display:block; margin-bottom:12px;"
              >cloud_off</span
            >
            <div style="font-size:14px;">${this.error}</div>
          </div>`:this.isSearch&&!this.query?o`<div class="empty">
              <span class="material-symbols-rounded" style="font-size:40px; display:block; margin-bottom:12px;"
                >search</span
              >
              <div style="font-size:14px;">Search ${((v=this.source)==null?void 0:v.name)??""} to see results.</div>
            </div>`:this.loading&&!this.items.length?o`<div class="empty"><md-circular-progress indeterminate></md-circular-progress></div>`:r.length?o`
                  <div class="grid">${r.map((u,g)=>this.renderTile(u,g))}</div>
                  ${this.cursor?o`<div class="more">
                        <button class="chip" ?disabled=${this.loading} @click=${()=>this.load(!1)}>
                          ${this.loading?"Loading…":"Load more"}
                        </button>
                      </div>`:l}
                `:o`<div class="empty">
                  <span class="material-symbols-rounded" style="font-size:40px; display:block; margin-bottom:12px;"
                    >search_off</span
                  >
                  <div style="font-size:14px;">
                    ${e?i?o`Nothing in this thread matched “${this.threadQuery.trim()}”.`:"Nothing left in this thread — it may have 404'd.":this.query?o`Nothing matched “${this.query}”.`:"Nothing on this feed."}
                  </div>
                </div>`}

      ${this.active?this.renderOverlay(this.active):l}
      ${this.commentsFor?this.renderComments(this.commentsFor):l}
      ${this.toast?o`<div class="toast">${this.toast}</div>`:l}
    `}};T.styles=[me,ee,y`
      :host {
        display: block;
        color: var(--oppai-text);
      }

      /* Header — mirrors the library's grid head. */
      .head {
        display: flex;
        align-items: baseline;
        gap: 12px;
        margin-bottom: 6px;
      }
      .title {
        font-size: 26px;
        font-weight: 400;
        margin: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .count {
        font-size: 13px;
        color: var(--oppai-text-muted);
        white-space: nowrap;
      }
      .head-actions {
        margin-left: auto;
        display: flex;
        gap: 8px;
      }

      /* Chips — same shape as the library's filter chips. */
      .chips {
        display: flex;
        gap: 8px;
        margin: 18px 0 24px;
        flex-wrap: wrap;
      }
      .chips.tight {
        margin: 0 0 18px;
      }
      .chip {
        height: 36px;
        padding: 0 16px;
        border-radius: 18px;
        font-size: 13px;
        font-weight: 500;
        font-family: inherit;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 6px;
        background: transparent;
        color: var(--oppai-text-dim);
        border: 1px solid var(--oppai-border-strong);
        transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
      }
      .chip:hover {
        background: var(--oppai-nav-hover);
      }
      .chip[aria-pressed="true"] {
        background: var(--oppai-accent);
        color: var(--oppai-on-accent);
        border-color: var(--oppai-accent);
      }
      .chip:disabled {
        opacity: 0.5;
        cursor: default;
      }
      .chip.ghost {
        color: var(--oppai-primary-bright);
        border-color: var(--oppai-border-strong);
      }
      .feed-select {
        min-width: 190px;
        height: 40px;
        padding: 0 38px 0 14px;
        border-radius: 12px;
        border: 1px solid var(--oppai-border-strong);
        background: var(--oppai-surface-2);
        color: var(--oppai-text);
        font: inherit;
        cursor: pointer;
      }
      .thread-tools {
        display: flex;
        gap: 10px;
        align-items: center;
        margin: 14px 0 22px;
        flex-wrap: wrap;
      }
      .thread-tools .searchbox { max-width: 420px; }
      .add-thread { margin-left: auto; margin-top: 0; margin-bottom: 0; }

      /* Search */
      .searchbar {
        display: flex;
        gap: 10px;
        align-items: center;
        margin-bottom: 20px;
      }
      .searchbox {
        flex: 1;
        max-width: 520px;
        height: 44px;
        background: var(--oppai-surface-2);
        border-radius: 22px;
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 0 16px;
      }
      .searchbox input {
        flex: 1;
        background: none;
        border: none;
        outline: none;
        color: var(--oppai-text);
        font: inherit;
        font-size: 14px;
      }
      .searchbox input::placeholder {
        color: var(--oppai-text-muted);
      }

      /* Grid + tiles — the library's tile, with the remote item's badges. */
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 22px;
      }
      .tile {
        cursor: pointer;
        border: none;
        padding: 0;
        background: none;
        text-align: left;
        font: inherit;
        color: inherit;
      }
      .tile-media {
        position: relative;
        width: 100%;
        aspect-ratio: 3 / 4;
        border-radius: 16px;
        overflow: hidden;
        background: var(--oppai-surface-2);
        transition: transform 0.28s var(--oppai-ease-emphasized),
          box-shadow 0.28s var(--oppai-ease-emphasized);
      }
      .tile:hover .tile-media {
        transform: translateY(-4px) scale(1.02);
        box-shadow: 0 12px 28px rgba(0, 0, 0, 0.4);
      }
      .tile:active .tile-media {
        transform: translateY(-1px) scale(0.99);
      }
      .tile-media img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.4s var(--oppai-ease-emphasized);
      }
      .tile:hover .tile-media img {
        transform: scale(1.06);
      }
      .tile-blank {
        position: absolute;
        inset: 0;
        display: grid;
        place-items: center;
        color: var(--oppai-text-muted);
      }
      .tile-stat {
        position: absolute;
        bottom: 6px;
        right: 8px;
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 11px;
        font-weight: 600;
        color: #fff;
        background: rgba(0, 0, 0, 0.5);
        padding: 2px 6px;
        border-radius: 6px;
      }
      .play {
        position: absolute;
        inset: 0;
        display: grid;
        place-items: center;
        color: #fff;
        text-shadow: 0 0 8px rgba(0, 0, 0, 0.8);
        opacity: 0.85;
      }
      .tile-meta {
        padding: 10px 2px 0;
      }
      .tile-title {
        font-size: 13px;
        font-weight: 500;
        color: var(--oppai-text);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .tile-tag {
        font-size: 12px;
        color: var(--oppai-text-muted);
        margin-top: 2px;
      }

      .empty {
        text-align: center;
        padding: 80px 0;
        color: var(--oppai-text-muted);
      }
      .more {
        display: grid;
        place-items: center;
        padding: 28px;
      }

      /* Preview overlay */
      .overlay {
        position: fixed;
        inset: 0;
        z-index: 50;
        background: rgba(0, 0, 0, 0.92);
        display: flex;
        flex-direction: column;
        animation: oppai-fade-in 0.2s var(--oppai-ease-standard) both;
      }
      .obar {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        color: #fff;
      }
      .obar .t {
        flex: 1;
        font-size: 14px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .obtn {
        background: rgba(255, 255, 255, 0.12);
        color: #fff;
        border: none;
        border-radius: 20px;
        height: 36px;
        padding: 0 16px;
        font: inherit;
        font-size: 13px;
        font-weight: 500;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }
      .obtn:hover {
        background: rgba(255, 255, 255, 0.2);
      }
      .obtn:disabled {
        opacity: 0.5;
        cursor: default;
      }
      .ostage {
        flex: 1;
        display: grid;
        place-items: center;
        overflow: auto;
        padding: 8px;
        min-height: 0;
      }
      .ostage img,
      .ostage video {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
      }
      .pager {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 16px;
        color: #fff;
        padding: 12px;
        font-size: 13px;
      }

      /* "Up next" — the rest of the feed as a scrubbable strip under the player.

         The rigid flex basis and the top padding are both about the scrubber. The
         player's controls are drawn inside the video along its bottom edge, so the
         strip's top edge is the only thing between them and the pointer — and as a
         shrinkable flex item the strip could be squeezed right up against the video on a
         short viewport. It keeps its size; the stage gives way instead. */
      .upnext {
        flex: 0 0 auto;
        padding: 24px 16px 14px;
        color: #fff;
      }
      .upnext-label {
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 0.4px;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.7);
        margin-bottom: 8px;
      }
      .strip {
        display: flex;
        gap: 10px;
        overflow-x: auto;
        scroll-snap-type: x proximity;
        padding-bottom: 6px;
        /* A thin rail: this is a filmstrip, not a second grid. */
        scrollbar-width: thin;
        scrollbar-color: rgba(255, 255, 255, 0.35) transparent;
      }
      .strip::-webkit-scrollbar {
        height: 6px;
      }
      .strip::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.35);
        border-radius: 3px;
      }
      .strip-item {
        position: relative;
        flex: 0 0 auto;
        width: 128px;
        aspect-ratio: 16 / 10;
        border: 2px solid transparent;
        border-radius: 10px;
        overflow: hidden;
        padding: 0;
        background: var(--oppai-surface-2);
        cursor: pointer;
        scroll-snap-align: start;
        transition: transform 0.18s var(--oppai-ease-spring), border-color 0.18s ease;
      }
      .strip-item:hover {
        transform: scale(1.03);
      }
      .strip-item.on {
        border-color: var(--oppai-accent);
      }
      .strip-item img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .strip-play {
        position: absolute;
        inset: 0;
        display: grid;
        place-items: center;
        font-size: 28px;
        color: #fff;
        text-shadow: 0 0 8px rgba(0, 0, 0, 0.8);
      }
      .strip-next {
        position: absolute;
        left: 4px;
        bottom: 4px;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.3px;
        background: var(--oppai-accent);
        color: var(--oppai-on-accent);
        padding: 1px 6px;
        border-radius: 6px;
      }

      /* Comments — the thread the file was posted in. */
      .comments {
        justify-content: flex-end;
        align-items: stretch;
        flex-direction: row;
        z-index: 55;
      }
      .cpanel {
        width: min(460px, 100%);
        background: var(--oppai-surface);
        display: flex;
        flex-direction: column;
        box-shadow: -12px 0 40px rgba(0, 0, 0, 0.5);
        animation: oppai-fade-in 0.2s var(--oppai-ease-standard) both;
      }
      .chead {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 14px 16px;
        border-bottom: 1px solid var(--oppai-border-strong);
      }
      .chead .t {
        flex: 1;
        font-size: 14px;
        font-weight: 500;
        color: var(--oppai-text);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .chead .obtn {
        background: var(--oppai-surface-2);
        color: var(--oppai-text);
      }
      .clist {
        flex: 1;
        overflow-y: auto;
        padding: 8px 12px 20px;
      }
      .cempty {
        flex: 1;
        display: grid;
        place-items: center;
        color: var(--oppai-text-muted);
        font-size: 14px;
        padding: 40px 20px;
        text-align: center;
      }
      .cpost {
        border-radius: 12px;
        padding: 10px 12px;
        margin-top: 8px;
        background: var(--oppai-surface-2);
      }
      .cpost.op {
        background: var(--oppai-nav-hover);
      }
      /* The post the open file came from. Without this the list is a wall of
         anonymous text with no way to find your place in it. */
      .cpost.here {
        outline: 2px solid var(--oppai-accent);
      }
      .cmeta {
        display: flex;
        align-items: center;
        gap: 6px;
        flex-wrap: wrap;
        font-size: 11px;
        color: var(--oppai-text-muted);
        margin-bottom: 6px;
      }
      .cname {
        font-weight: 600;
        color: var(--oppai-primary-bright);
      }
      .cbadge {
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.3px;
        background: var(--oppai-surface);
        color: var(--oppai-text-dim);
        padding: 1px 6px;
        border-radius: 6px;
      }
      .cbadge.here-badge {
        background: var(--oppai-accent);
        color: var(--oppai-on-accent);
      }
      .csub {
        font-size: 13px;
        font-weight: 600;
        color: var(--oppai-text);
        margin-bottom: 4px;
      }
      /* A post's own upload. It is a button, not a link: the file is already something
         this app can play, and sending a .webm out to a raw browser tab was throwing
         away the viewer, the thread it belongs to, and the way back. */
      .cattach {
        position: relative;
        display: block;
        padding: 0;
        border: none;
        background: none;
        cursor: pointer;
        margin: 4px 0 6px;
        border-radius: 8px;
        line-height: 0;
        transition: transform 0.18s var(--oppai-ease-spring);
      }
      .cattach:hover {
        transform: scale(1.02);
      }
      .cthumb {
        max-width: 140px;
        border-radius: 8px;
        display: block;
      }
      .cplay {
        position: absolute;
        inset: 0;
        display: grid;
        place-items: center;
        font-size: 34px;
        color: #fff;
        text-shadow: 0 0 8px rgba(0, 0, 0, 0.8);
        pointer-events: none;
      }
      .ctext {
        font-size: 13px;
        line-height: 1.5;
        color: var(--oppai-text-dim);
        white-space: pre-wrap;
        overflow-wrap: anywhere;
      }
      /* Greentext is green; a quote points at another post. Flattening both into plain
         text would lose what the post is actually saying. */
      .cgreen {
        color: #789922;
      }
      .cquote {
        color: var(--oppai-primary-bright);
      }
      button.cquote {
        border: 0;
        padding: 0;
        background: none;
        font: inherit;
        cursor: pointer;
        text-decoration: underline;
        text-underline-offset: 2px;
      }
      .comment-search { padding: 10px 12px 2px; }
      .comment-search .searchbox { max-width: none; height: 40px; }

      .toast {
        position: fixed;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--oppai-surface-2);
        color: var(--oppai-text);
        padding: 12px 20px;
        border-radius: 12px;
        z-index: 60;
        box-shadow: 0 8px 28px rgba(0, 0, 0, 0.45);
        animation: oppai-fade-in-up 0.28s var(--oppai-ease-emphasized) both;
      }
      @media (max-width: 600px) {
        .head { align-items: flex-start; flex-wrap: wrap; }
        .head-actions { width: 100%; margin-left: 0; flex-wrap: wrap; }
        .cthumb { width: min(240px, 72vw); max-width: 100%; }
        .thread-tools { align-items: stretch; }
        .thread-tools .searchbox { max-width: none; width: 100%; }
        .add-thread { margin-left: 0; width: 100%; }
      }
    `];I([c()],T.prototype,"sources",2);I([c()],T.prototype,"sourceId",2);I([c()],T.prototype,"feedId",2);I([c()],T.prototype,"container",2);I([c()],T.prototype,"sort",2);I([c()],T.prototype,"query",2);I([c()],T.prototype,"draft",2);I([c()],T.prototype,"items",2);I([c()],T.prototype,"cursor",2);I([c()],T.prototype,"loading",2);I([c()],T.prototype,"loadingSources",2);I([c()],T.prototype,"error",2);I([c()],T.prototype,"active",2);I([c()],T.prototype,"pages",2);I([c()],T.prototype,"pageAt",2);I([c()],T.prototype,"saving",2);I([c()],T.prototype,"toast",2);I([c()],T.prototype,"commentsFor",2);I([c()],T.prototype,"comments",2);I([c()],T.prototype,"commentsLoading",2);I([c()],T.prototype,"commentsError",2);I([c()],T.prototype,"commentQuery",2);I([c()],T.prototype,"threadQuery",2);I([c()],T.prototype,"threadDraft",2);T=I([C("oppai-browse")],T);const $s=3;function ks(t){return t?new Date(t*1e3).toLocaleString(void 0,{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"}):""}function Cs(t,e){return t.split(`
`).map(i=>{const r=!/^>>\d+/.test(i)&&i.startsWith(">"),a=i.split(/(>>\d+)/g);return o`<div class=${r?"cgreen":""}>${a.map(s=>{const n=s.match(/^>>(\d+)$/);return n?o`<button class="cquote" @click=${()=>e(Number(n[1]))}>${s}</button>`:s})}</div>`})}var zs=Object.defineProperty,Ts=Object.getOwnPropertyDescriptor,Z=(t,e,i,r)=>{for(var a=r>1?void 0:r?Ts(e,i):e,s=t.length-1,n;s>=0;s--)(n=t[s])&&(a=(r?n(e,i,a):n(a))||a);return r&&a&&zs(e,i,a),a};const Ss=40;let K=class extends k{constructor(){super(...arguments),this.boards=[],this.board="none",this.items=[],this.total=0,this.loading=!1,this.error="",this.expanded=null,this.busy=!1,this.newBoard="",this.savedNames=new Set}connectedCallback(){super.connectedCallback(),this.refresh()}async refresh(){this.error="";try{const t=await b.galleryBoards();this.boards=t.boards,!this.boards.some(e=>e.id===this.board)&&this.boards.length&&(this.board=this.boards[0].id)}catch(t){this.error=t.message;return}await this.loadPage(!0)}async loadPage(t){if(!this.loading){this.loading=!0;try{const e=t?0:this.items.length,i=await b.galleryImages(this.board,e,Ss);this.items=t?i.items:[...this.items,...i.items],this.total=i.total}catch(e){this.error=e.message}finally{this.loading=!1}}}pickBoard(t){this.board!==t&&(this.board=t,this.items=[],this.loadPage(!0))}async createBoard(){const t=this.newBoard.trim();if(!(!t||this.busy)){this.busy=!0,this.error="";try{const e=await b.createGalleryBoard(t);this.newBoard="",await this.refresh(),this.pickBoard(e.id),this.dispatchEvent(new CustomEvent("boards-changed",{bubbles:!0,composed:!0}))}catch(e){this.error=e.message}finally{this.busy=!1}}}async deleteImage(t){var e;if(!this.busy&&confirm("Delete this image from InvokeAI's gallery?")){this.busy=!0;try{await b.deleteGalleryImage(t.name),this.items=this.items.filter(i=>i.name!==t.name),this.total=Math.max(0,this.total-1),this.boards=this.boards.map(i=>i.id===this.board?{...i,count:Math.max(0,i.count-1)}:i),((e=this.expanded)==null?void 0:e.name)===t.name&&(this.expanded=null)}catch(i){this.error=i.message}finally{this.busy=!1}}}async saveToLibrary(t){if(!(this.busy||this.savedNames.has(t.name))){this.busy=!0;try{await b.saveGalleryImage({name:t.name}),this.savedNames=new Set(this.savedNames).add(t.name),this.dispatchEvent(new CustomEvent("imported",{bubbles:!0,composed:!0}))}catch(e){this.error=e.message}finally{this.busy=!1}}}render(){const t=this.boards.find(e=>e.id===this.board);return o`
      <div class="panel">
        <div class="head">
          <span class="material-symbols-rounded" style="font-size:18px;">photo_library</span>
          Invoke gallery
          <span class="count">${t?`${this.total||t.count} images`:""}</span>
        </div>
        ${this.boards.length?o`<div class="boards">
              ${this.boards.map(e=>o`<button class="board ${e.id===this.board?"on":""}"
                  @click=${()=>this.pickBoard(e.id)}>${e.name}${e.count?` · ${e.count}`:""}</button>`)}
            </div>`:l}
        <div class="new-board">
          <input maxlength="300" placeholder="New Invoke gallery" .value=${this.newBoard}
            @input=${e=>this.newBoard=e.target.value}
            @keydown=${e=>{e.key==="Enter"&&this.createBoard()}} />
          <button ?disabled=${this.busy||!this.newBoard.trim()} @click=${()=>this.createBoard()}>Create</button>
        </div>
        ${this.error?o`<div class="err">${this.error}</div>`:l}
        ${this.items.length?o`<div class="grid">
              ${this.items.map(e=>o`
                  <button class="tile" title=${e.name} @click=${()=>this.expanded=e}>
                    <img src=${b.galleryThumbURL(e.name)} alt="Generated image" loading="lazy" />
                    <span
                      class="del"
                      role="button"
                      title="Delete from InvokeAI"
                      @click=${i=>{i.stopPropagation(),this.deleteImage(e)}}
                    >
                      <span class="material-symbols-rounded" style="font-size:14px;">delete</span>
                    </span>
                  </button>
                `)}
            </div>`:this.loading?l:o`<div class="note">Nothing here yet — generated images land in this gallery.</div>`}
        ${this.loading?o`<div class="note">Loading…</div>`:l}
        ${!this.loading&&this.items.length<this.total?o`<button class="more" @click=${()=>this.loadPage(!1)}>
              Load more (${this.total-this.items.length} left)
            </button>`:l}
      </div>
      ${this.expanded?this.renderExpanded(this.expanded):l}
    `}renderExpanded(t){const e=this.savedNames.has(t.name);return o`
      <div class="overlay" @click=${i=>{i.target===i.currentTarget&&(this.expanded=null)}}>
        <img src=${b.galleryFullURL(t.name)} alt="Generated image" />
        <div class="overlay-actions">
          <button class="obtn primary" ?disabled=${this.busy||e} @click=${()=>this.saveToLibrary(t)}>
            <span class="material-symbols-rounded" style="font-size:17px;">${e?"check":"save"}</span>
            ${e?"In library":"Save to library"}
          </button>
          <button class="obtn danger" ?disabled=${this.busy} @click=${()=>this.deleteImage(t)}>
            <span class="material-symbols-rounded" style="font-size:17px;">delete</span> Delete
          </button>
          <button class="obtn" @click=${()=>this.expanded=null}>
            <span class="material-symbols-rounded" style="font-size:17px;">close</span> Close
          </button>
        </div>
      </div>
    `}};K.styles=[me,ee,y`
      :host {
        display: block;
        color: var(--oppai-text);
      }
      .panel {
        background: var(--oppai-surface-2);
        border-radius: 14px;
        padding: 12px;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .head {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 13px;
        font-weight: 600;
        letter-spacing: 0.3px;
      }
      .head .count {
        margin-left: auto;
        font-weight: 400;
        font-size: 12px;
        color: var(--oppai-text-muted);
      }
      .boards {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
      }
      .new-board {
        display: flex;
        gap: 6px;
      }
      .new-board input {
        min-width: 0;
        flex: 1;
        border: 1px solid var(--oppai-border-strong);
        border-radius: 9px;
        background: var(--oppai-surface);
        color: var(--oppai-text);
        font: inherit;
        font-size: 12px;
        padding: 7px 9px;
      }
      .new-board button {
        border: none;
        border-radius: 9px;
        background: var(--oppai-primary);
        color: var(--oppai-on-primary);
        font: inherit;
        padding: 7px 10px;
        cursor: pointer;
      }
      .board {
        border: 1px solid var(--oppai-border-strong);
        background: transparent;
        color: var(--oppai-text-dim);
        border-radius: 999px;
        font: inherit;
        font-size: 12px;
        padding: 4px 10px;
        cursor: pointer;
      }
      .board.on {
        background: var(--oppai-accent);
        color: var(--oppai-on-accent);
        border-color: var(--oppai-accent);
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(84px, 1fr));
        gap: 8px;
      }
      .tile {
        position: relative;
        border: none;
        padding: 0;
        border-radius: 10px;
        overflow: hidden;
        cursor: pointer;
        background: var(--oppai-surface);
        aspect-ratio: 1;
      }
      .tile img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
      .tile .del {
        position: absolute;
        top: 3px;
        right: 3px;
        width: 22px;
        height: 22px;
        border: none;
        border-radius: 11px;
        background: rgba(0, 0, 0, 0.55);
        color: #fff;
        display: none;
        place-items: center;
        cursor: pointer;
      }
      .tile:hover .del {
        display: grid;
      }
      .note {
        font-size: 12px;
        color: var(--oppai-text-muted);
      }
      .more {
        border: 1px dashed var(--oppai-border-strong);
        background: none;
        color: var(--oppai-text-dim);
        border-radius: 10px;
        font: inherit;
        font-size: 13px;
        padding: 8px;
        cursor: pointer;
      }
      .err {
        font-size: 12px;
        color: var(--oppai-error, #f2b8b5);
      }

      /* Expanded (lightbox) overlay. */
      .overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.82);
        z-index: 70;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 14px;
        padding: 20px;
      }
      .overlay img {
        max-width: min(96vw, 1400px);
        max-height: 82vh;
        object-fit: contain;
        border-radius: 10px;
      }
      .overlay-actions {
        display: flex;
        gap: 10px;
      }
      .obtn {
        border: none;
        border-radius: 10px;
        background: var(--oppai-surface-2);
        color: var(--oppai-text);
        font: inherit;
        font-size: 13px;
        font-weight: 600;
        padding: 10px 16px;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }
      .obtn.primary {
        background: var(--oppai-primary);
        color: var(--oppai-on-primary);
      }
      .obtn.danger {
        color: var(--oppai-error, #f2b8b5);
      }
      .obtn:disabled {
        opacity: 0.55;
        cursor: default;
      }
    `];Z([c()],K.prototype,"boards",2);Z([c()],K.prototype,"board",2);Z([c()],K.prototype,"items",2);Z([c()],K.prototype,"total",2);Z([c()],K.prototype,"loading",2);Z([c()],K.prototype,"error",2);Z([c()],K.prototype,"expanded",2);Z([c()],K.prototype,"busy",2);Z([c()],K.prototype,"newBoard",2);Z([c()],K.prototype,"savedNames",2);K=Z([C("oppai-invoke-gallery")],K);var As=Object.defineProperty,Is=Object.getOwnPropertyDescriptor,V=(t,e,i,r)=>{for(var a=r>1?void 0:r?Is(e,i):e,s=t.length-1,n;s>=0;s--)(n=t[s])&&(a=(r?n(e,i,a):n(a))||a);return r&&a&&As(e,i,a),a};let F=class extends k{constructor(){super(...arguments),this.q="",this.type="",this.sort="",this.items=[],this.cursor="",this.loading=!1,this.error="",this.detail=null,this.versionId=0,this.shownImage="",this.jobs=[],this.installing=!1,this.zoomed=""}connectedCallback(){super.connectedCallback(),this.search(!0),this.pollJobs(),this.jobTimer=window.setInterval(()=>void this.pollJobs(),5e3)}disconnectedCallback(){super.disconnectedCallback(),this.jobTimer&&clearInterval(this.jobTimer)}async pollJobs(){try{const t=await b.civitaiInstalls();this.jobs=t.jobs.filter(e=>e.status!=="cancelled").slice(0,5)}catch{}}async search(t){if(!this.loading){this.loading=!0,this.error="";try{const e=await b.civitaiSearch({q:this.q||void 0,type:this.type||void 0,sort:this.sort||void 0,cursor:t?void 0:this.cursor||void 0});this.items=t?e.items:[...this.items,...e.items],this.cursor=e.nextCursor??""}catch(e){this.error=e.message}finally{this.loading=!1}}}openDetail(t){this.detail=t;const e=t.versions[0];this.versionId=(e==null?void 0:e.id)??0,this.shownImage=(e==null?void 0:e.images[0])??""}currentVersion(){var t;return(t=this.detail)==null?void 0:t.versions.find(e=>e.id===this.versionId)}async install(t){if(!(this.installing||!t.downloadUrl)){this.installing=!0,this.error="";try{await b.civitaiInstall(t.downloadUrl),await this.pollJobs()}catch(e){this.error=e.message}finally{this.installing=!1}}}jobLabel(t){return t.status==="downloading"&&t.totalBytes?`downloading ${Math.round((t.bytes??0)/t.totalBytes*100)}%`:t.status}render(){return o`
      <div class="wrap">
        <div class="topbar">
          <h2><span class="material-symbols-rounded">travel_explore</span> Civitai</h2>
          <button class="close" @click=${()=>this.dispatchEvent(new CustomEvent("close"))}>
            <span class="material-symbols-rounded" style="font-size:17px;">close</span> Back to studio
          </button>
        </div>
        <div class="controls">
          <input
            type="search"
            placeholder="Search models…"
            .value=${this.q}
            @input=${t=>this.q=t.target.value}
            @keydown=${t=>{t.key==="Enter"&&this.search(!0)}}
          />
          ${[{id:"",label:"All"},{id:"checkpoint",label:"Checkpoints"},{id:"lora",label:"LoRAs"}].map(t=>o`<button class="chip ${this.type===t.id?"on":""}"
              @click=${()=>{this.type=t.id,this.search(!0)}}>${t.label}</button>`)}
          <select
            .value=${this.sort}
            @change=${t=>{this.sort=t.target.value,this.search(!0)}}
          >
            <option value="">Most downloaded</option>
            <option value="rated">Highest rated</option>
            <option value="newest">Newest</option>
          </select>
        </div>
        ${this.jobs.length?o`<div class="jobs">
              ${this.jobs.map(t=>o`<div class="job">
                  <span class="material-symbols-rounded" style="font-size:15px;">download</span>
                  <span class="st ${t.status}">${this.jobLabel(t)}</span>
                  <span style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${t.error||t.source}</span>
                </div>`)}
            </div>`:l}
        ${this.error?o`<div class="err">${this.error}</div>`:l}
        <div class="grid">
          ${this.items.map(t=>{var i,r;const e=(i=t.versions[0])==null?void 0:i.images[0];return o`
              <button class="card" @click=${()=>this.openDetail(t)}>
                ${e?o`<img src=${b.civitaiImageURL(e)} alt=${t.name} loading="lazy" />`:o`<div class="noimg"><span class="material-symbols-rounded" style="font-size:34px;">image</span></div>`}
                <div class="meta">
                  <div class="name">${t.name}</div>
                  <div class="sub">
                    <span>${t.type}</span>
                    ${(r=t.versions[0])!=null&&r.base?o`<span>${t.versions[0].base}</span>`:l}
                    <span>⤓ ${Et(t.downloads)}</span>
                  </div>
                </div>
              </button>
            `})}
        </div>
        ${this.loading?o`<div class="note">Searching Civitai…</div>`:this.items.length?this.cursor?o`<button class="more" @click=${()=>this.search(!1)}>Load more</button>`:l:o`<div class="note">No models matched. Try another search.</div>`}
      </div>
      ${this.detail?this.renderDetail(this.detail):l}
      ${this.zoomed?o`<div class="zoom" @click=${()=>this.zoomed=""}>
            <img src=${b.civitaiImageURL(this.zoomed)} alt="Preview" />
          </div>`:l}
    `}renderDetail(t){const e=this.currentVersion();return o`
      <div class="overlay" @click=${i=>{i.target===i.currentTarget&&(this.detail=null)}}>
        <div class="detail">
          <div>
            ${this.shownImage?o`<img class="big" src=${b.civitaiImageURL(this.shownImage)} alt=${t.name}
                  @click=${()=>this.zoomed=this.shownImage} />`:o`<div class="big" style="display:grid; place-items:center;">
                  <span class="material-symbols-rounded" style="font-size:40px; color:var(--oppai-text-muted);">image</span>
                </div>`}
            ${e&&e.images.length>1?o`<div class="thumbs">
                  ${e.images.map(i=>o`<img src=${b.civitaiImageURL(i)} class=${i===this.shownImage?"on":""}
                      alt="Preview" @click=${()=>this.shownImage=i} />`)}
                </div>`:l}
          </div>
          <div>
            <h3>${t.name}</h3>
            <div class="sub">
              ${t.type}${t.creator?` · by ${t.creator}`:""} · ⤓ ${Et(t.downloads)} · ♥ ${Et(t.likes)}
            </div>
            ${t.versions.length>1?o`<div class="vlabel">Version</div>
                  <div class="versions">
                    ${t.versions.map(i=>o`<button class="chip ${i.id===this.versionId?"on":""}"
                        @click=${()=>{this.versionId=i.id,this.shownImage=i.images[0]??""}}>${i.name}<span style="opacity:.7;"> · ${i.base}</span></button>`)}
                  </div>`:l}
            ${e!=null&&e.trainedWords.length?o`<div class="vlabel">Trigger words</div>
                  <div class="words">${e.trainedWords.join(", ")}</div>`:l}
            ${e?o`<button class="install" ?disabled=${this.installing||!e.downloadUrl} @click=${()=>this.install(e)}>
                  <span class="material-symbols-rounded" style="font-size:18px;">download</span>
                  Install to InvokeAI${e.sizeMB?` (${Es(e.sizeMB)})`:""}
                </button>`:l}
            <div class="sub" style="margin-top:10px;">
              InvokeAI downloads the file itself; progress appears in the strip on the search page.
            </div>
          </div>
        </div>
      </div>
    `}};F.styles=[me,ee,y`
      :host {
        position: fixed;
        inset: 0;
        z-index: 65;
        display: block;
        background: var(--oppai-bg, #141218);
        color: var(--oppai-text);
        overflow-y: auto;
      }
      .wrap {
        max-width: 1240px;
        margin: 0 auto;
        padding: 18px 16px 60px;
      }
      .topbar {
        display: flex;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;
        position: sticky;
        top: 0;
        background: var(--oppai-bg, #141218);
        padding: 8px 0 12px;
        z-index: 2;
      }
      .topbar h2 {
        margin: 0;
        font-size: 17px;
        display: inline-flex;
        align-items: center;
        gap: 8px;
      }
      .close {
        margin-left: auto;
        border: none;
        background: var(--oppai-surface-2);
        color: var(--oppai-text);
        border-radius: 10px;
        font: inherit;
        padding: 8px 14px;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }
      .controls {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        align-items: center;
        margin-bottom: 14px;
      }
      input[type="search"] {
        flex: 1;
        min-width: 200px;
        background: var(--oppai-surface);
        border: 1px solid var(--oppai-border-strong);
        border-radius: 12px;
        color: var(--oppai-text);
        font: inherit;
        font-size: 14px;
        padding: 9px 12px;
        outline: none;
      }
      input[type="search"]:focus {
        border-color: var(--oppai-primary);
      }
      .chip {
        border: 1px solid var(--oppai-border-strong);
        background: transparent;
        color: var(--oppai-text-dim);
        border-radius: 999px;
        font: inherit;
        font-size: 13px;
        padding: 6px 13px;
        cursor: pointer;
      }
      .chip.on {
        background: var(--oppai-accent);
        color: var(--oppai-on-accent);
        border-color: var(--oppai-accent);
      }
      select {
        background: var(--oppai-surface);
        border: 1px solid var(--oppai-border-strong);
        border-radius: 10px;
        color: var(--oppai-text);
        font: inherit;
        font-size: 13px;
        padding: 7px 10px;
      }
      .jobs {
        background: var(--oppai-surface-2);
        border-radius: 12px;
        padding: 10px 12px;
        margin-bottom: 14px;
        font-size: 12px;
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .job {
        display: flex;
        gap: 8px;
        align-items: center;
        color: var(--oppai-text-dim);
      }
      .job .st {
        font-weight: 600;
      }
      .job .st.error { color: var(--oppai-error, #f2b8b5); }
      .job .st.completed { color: var(--oppai-primary-bright); }
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        gap: 14px;
      }
      .card {
        border: none;
        padding: 0;
        text-align: left;
        background: var(--oppai-surface-2);
        border-radius: 14px;
        overflow: hidden;
        cursor: pointer;
        color: var(--oppai-text);
        font: inherit;
        transition: transform 0.18s var(--oppai-ease-spring);
      }
      .card:hover {
        transform: translateY(-2px);
      }
      .card img,
      .card .noimg {
        width: 100%;
        aspect-ratio: 3 / 4;
        object-fit: cover;
        display: block;
        background: var(--oppai-surface);
      }
      .card .noimg {
        display: grid;
        place-items: center;
        color: var(--oppai-text-muted);
      }
      .card .meta {
        padding: 8px 10px 10px;
      }
      .card .name {
        font-size: 13px;
        font-weight: 600;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .card .sub {
        font-size: 11px;
        color: var(--oppai-text-muted);
        margin-top: 3px;
        display: flex;
        gap: 8px;
      }
      .more {
        margin-top: 16px;
        width: 100%;
        border: 1px dashed var(--oppai-border-strong);
        background: none;
        color: var(--oppai-text-dim);
        border-radius: 12px;
        font: inherit;
        font-size: 14px;
        padding: 12px;
        cursor: pointer;
      }
      .note {
        color: var(--oppai-text-muted);
        font-size: 13px;
        padding: 30px 0;
        text-align: center;
      }
      .err {
        color: var(--oppai-error, #f2b8b5);
        font-size: 13px;
        margin-bottom: 12px;
      }

      /* Detail overlay. */
      .overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.65);
        z-index: 80;
        display: grid;
        place-items: center;
        padding: 18px;
      }
      .detail {
        background: var(--oppai-surface-2);
        border-radius: 18px;
        width: min(880px, 100%);
        max-height: 92vh;
        overflow-y: auto;
        padding: 18px;
        display: grid;
        grid-template-columns: minmax(0, 320px) minmax(0, 1fr);
        gap: 16px;
      }
      @media (max-width: 720px) {
        .detail {
          grid-template-columns: minmax(0, 1fr);
        }
      }
      .detail .big {
        width: 100%;
        border-radius: 12px;
        background: var(--oppai-surface);
        aspect-ratio: 3 / 4;
        object-fit: cover;
        cursor: zoom-in;
      }
      .thumbs {
        display: flex;
        gap: 6px;
        margin-top: 8px;
        flex-wrap: wrap;
      }
      .thumbs img {
        width: 52px;
        height: 68px;
        object-fit: cover;
        border-radius: 8px;
        cursor: pointer;
        opacity: 0.7;
      }
      .thumbs img.on {
        opacity: 1;
        outline: 2px solid var(--oppai-accent);
      }
      .detail h3 {
        margin: 0 0 4px;
        font-size: 17px;
      }
      .detail .sub {
        font-size: 12px;
        color: var(--oppai-text-muted);
        margin-bottom: 12px;
      }
      .vlabel {
        font-size: 12px;
        font-weight: 600;
        color: var(--oppai-text-dim);
        margin: 10px 0 6px;
      }
      .versions {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }
      .words {
        font-size: 12px;
        color: var(--oppai-text-dim);
        background: var(--oppai-surface);
        border-radius: 10px;
        padding: 8px 10px;
        margin-top: 10px;
        word-break: break-word;
      }
      .install {
        margin-top: 14px;
        border: none;
        border-radius: 12px;
        background: var(--oppai-primary);
        color: var(--oppai-on-primary);
        font: inherit;
        font-size: 14px;
        font-weight: 600;
        padding: 12px 18px;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 8px;
      }
      .install:disabled {
        opacity: 0.6;
        cursor: default;
      }
      /* Zoomed image on top of everything. */
      .zoom {
        position: fixed;
        inset: 0;
        z-index: 90;
        background: rgba(0, 0, 0, 0.88);
        display: grid;
        place-items: center;
        cursor: zoom-out;
      }
      .zoom img {
        max-width: 96vw;
        max-height: 94vh;
        object-fit: contain;
      }
    `];V([c()],F.prototype,"q",2);V([c()],F.prototype,"type",2);V([c()],F.prototype,"sort",2);V([c()],F.prototype,"items",2);V([c()],F.prototype,"cursor",2);V([c()],F.prototype,"loading",2);V([c()],F.prototype,"error",2);V([c()],F.prototype,"detail",2);V([c()],F.prototype,"versionId",2);V([c()],F.prototype,"shownImage",2);V([c()],F.prototype,"jobs",2);V([c()],F.prototype,"installing",2);V([c()],F.prototype,"zoomed",2);F=V([C("oppai-civitai")],F);function Et(t){return t>=1e6?`${(t/1e6).toFixed(1)}M`:t>=1e3?`${(t/1e3).toFixed(1)}k`:String(t)}function Es(t){return t>=1024?`${(t/1024).toFixed(1)} GB`:`${t} MB`}var Ls=Object.defineProperty,Ps=Object.getOwnPropertyDescriptor,_=(t,e,i,r)=>{for(var a=r>1?void 0:r?Ps(e,i):e,s=t.length-1,n;s>=0;s--)(n=t[s])&&(a=(r?n(e,i,a):n(a))||a);return r&&a&&Ls(e,i,a),a};function Yi(){const t=window;return t.SpeechRecognition??t.webkitSpeechRecognition??null}const Os=[{label:"Portrait",hint:"512×768",w:512,h:768},{label:"Square",hint:"512×512",w:512,h:512},{label:"Landscape",hint:"768×512",w:768,h:512},{label:"Tall",hint:"640×960",w:640,h:960},{label:"XL Portrait",hint:"832×1216",w:832,h:1216},{label:"XL Square",hint:"1024×1024",w:1024,h:1024},{label:"XL Landscape",hint:"1216×832",w:1216,h:832}],Ds=[{id:"",label:"Default (Euler a)"},...[["ddim","DDIM"],["ddpm","DDPM"],["deis","DEIS"],["deis_k","DEIS Karras"],["dpmpp_2s","DPM++ 2S"],["dpmpp_2s_k","DPM++ 2S Karras"],["dpmpp_2m","DPM++ 2M"],["dpmpp_2m_k","DPM++ 2M Karras"],["dpmpp_2m_sde","DPM++ 2M SDE"],["dpmpp_2m_sde_k","DPM++ 2M SDE Karras"],["dpmpp_3m","DPM++ 3M"],["dpmpp_3m_k","DPM++ 3M Karras"],["dpmpp_sde","DPM++ SDE"],["dpmpp_sde_k","DPM++ SDE Karras"],["er_sde","ER-SDE"],["euler","Euler"],["euler_k","Euler Karras"],["euler_a","Euler Ancestral"],["heun","Heun"],["heun_k","Heun Karras"],["kdpm_2","KDPM 2"],["kdpm_2_k","KDPM 2 Karras"],["kdpm_2_a","KDPM 2 Ancestral"],["kdpm_2_a_k","KDPM 2 Ancestral Karras"],["lcm","LCM"],["lms","LMS"],["lms_k","LMS Karras"],["pndm","PNDM"],["tcd","TCD"],["unipc","UniPC"],["unipc_k","UniPC Karras"]].map(([t,e])=>({id:t,label:e}))];let w=class extends k{constructor(){super(...arguments),this.status=null,this.checkpoint="",this.vae="",this.templateId="",this.selectedLoras={},this.selectedTriggers=[],this.loraPage=0,this.characters=[],this.selectedChars=[],this.charDraft=null,this.charBusy=!1,this.open={models:!0},this.speech="",this.listening=!1,this.optimizing=!1,this.prompt="",this.negative="",this.showOptions=!1,this.width=512,this.height=768,this.steps=25,this.cfg=7,this.cfgRescale=0,this.clipSkip=0,this.seamlessX=!1,this.seamlessY=!1,this.vaePrecision="fp32",this.cpuNoise=!0,this.board="none",this.scheduler="",this.count=1,this.seed=-1,this.generating=!1,this.shots=[],this.error="",this.toast="",this.thumbVersion=0,this.failedThumbs=new Set,this.expandedShot=null,this.metaDraft=null,this.metaBusy=!1,this.metaTriggerText="",this.civitaiOpen=!1,this.recognition=null}connectedCallback(){super.connectedCallback(),this.loadStatus(),this.loadCharacters()}disconnectedCallback(){super.disconnectedCallback(),this.stopListening()}async loadStatus(){var t;this.status=null,this.error="";try{const e=await b.imageGenStatus();this.status=e,!this.checkpoint&&e.models&&e.models.length&&this.pickModel(e.models[0]),(t=e.boards)!=null&&t.length&&!e.boards.some(i=>i.id===this.board)&&(this.board=e.boards[0].id)}catch(e){this.status={enabled:!0,reachable:!1,error:e.message}}}async loadCharacters(){try{const t=await b.characters();this.characters=t.characters;const e=new Set(t.characters.map(i=>i.id));this.selectedChars=this.selectedChars.filter(i=>e.has(i))}catch{}}pickModel(t){this.checkpoint=t.title;const e=t.defaults;e&&(e.steps&&(this.steps=e.steps),e.cfgScale&&(this.cfg=e.cfgScale),e.cfgRescale!==void 0&&(this.cfgRescale=e.cfgRescale),e.scheduler&&(this.scheduler=e.scheduler),e.width&&(this.width=e.width),e.height&&(this.height=e.height),e.vae&&(this.vae=e.vae),e.vaePrecision&&(this.vaePrecision=e.vaePrecision))}get speechSupported(){return Yi()!=null}toggleListening(){if(this.listening){this.stopListening();return}const t=Yi();if(!t)return;const e=new t;e.lang=navigator.language||"en-US",e.continuous=!1,e.interimResults=!0,e.onresult=i=>{let r="";for(let a=0;a<i.results.length;a++)r+=i.results[a][0].transcript;this.speech=r},e.onerror=i=>{this.error=i.error==="not-allowed"?"Microphone permission was denied.":`Speech error: ${i.error}`,this.stopListening()},e.onend=()=>{this.listening=!1,this.speech.trim()&&this.optimize(this.speech)},this.recognition=e,this.listening=!0,this.error="";try{e.start()}catch{this.listening=!1}}stopListening(){if(this.listening=!1,this.recognition){try{this.recognition.stop()}catch{}this.recognition=null}}async optimize(t){this.optimizing=!0;try{const{prompt:e,negativePrompt:i}=await b.optimizePrompt(t);this.prompt=e,this.negative||(this.negative=i)}catch(e){this.error=e.message}finally{this.optimizing=!1}}assemblePrompts(){var s,n;const t=[this.prompt.trim(),...this.selectedTriggers],e=[this.negative.trim()];for(const p of this.selectedChars){const h=this.characters.find(f=>f.id===p);h&&(h.prompt.trim()&&t.push(h.prompt.trim()),(s=h.negativePrompt)!=null&&s.trim()&&e.push(h.negativePrompt.trim()))}let i=t.filter(Boolean).join(", "),r=e.filter(Boolean).join(", ");const a=(((n=this.status)==null?void 0:n.templates)??[]).find(p=>p.id===this.templateId);return a&&(a.prompt.includes("{prompt}")?i=a.prompt.replaceAll("{prompt}",i):a.prompt.trim()&&(i=`${i}, ${a.prompt.trim()}`),a.negativePrompt.includes("{prompt}")?r=a.negativePrompt.replaceAll("{prompt}",r):a.negativePrompt.trim()&&(r=r?`${r}, ${a.negativePrompt.trim()}`:a.negativePrompt.trim())),{prompt:i,negative:r}}async generate(){var i;if(this.generating||!this.prompt.trim())return;const{prompt:t,negative:e}=this.assemblePrompts();this.generating=!0,this.error="";try{const r=await b.generate({prompt:t,negativePrompt:e||void 0,checkpoint:this.checkpoint||void 0,vae:this.vae||void 0,sampler:this.scheduler||void 0,steps:this.steps,width:this.width,height:this.height,cfgScale:this.cfg,cfgRescale:this.cfgRescale,clipSkip:this.clipSkip,seamlessX:this.seamlessX,seamlessY:this.seamlessY,vaePrecision:this.vaePrecision,cpuNoise:this.cpuNoise,board:this.board,count:this.count,seed:this.seed,loras:Object.entries(this.selectedLoras).map(([a,s])=>({name:a,weight:s}))});this.shots=[...r.images.map(a=>({...a,saved:!1})),...this.shots],(i=this.galleryPanel)==null||i.refresh()}catch(r){this.error=r.message}finally{this.generating=!1}}async save(t){if(!t.saved)try{const e=this.prompt.trim().slice(0,80)||"Generated image";await b.saveGenerated({id:t.id,title:e}),this.shots=this.shots.map(i=>i.id===t.id?{...i,saved:!0}:i),this.showToast("Saved to library"),this.dispatchEvent(new CustomEvent("imported",{bubbles:!0,composed:!0}))}catch(e){this.showToast(e.message)}}bumpThumbs(){this.bumpThumbs(),this.failedThumbs=new Set}renderArt(t,e,i){return this.failedThumbs.has(t)?o`<div class="card-blank">
        <span class="material-symbols-rounded" style="font-size:34px;">${i}</span>
      </div>`:o`<img
      class="card-art"
      src=${t}
      alt=${e}
      loading="lazy"
      @error=${()=>{this.failedThumbs=new Set(this.failedThumbs).add(t)}}
    />`}async useAsModelThumb(t){if(!this.checkpoint){this.showToast("Pick a model first");return}try{await b.setModelThumb({model:this.checkpoint,previewId:t.id}),this.bumpThumbs(),this.showToast("Model preview synced to InvokeAI")}catch(e){this.showToast(e.message)}}async openMetaEditor(t){this.metaBusy=!0;try{const e=await b.modelMeta(t);this.metaDraft=e,this.metaTriggerText=e.triggerPhrases.join(", ")}catch(e){this.showToast(e.message)}finally{this.metaBusy=!1}}setMetaDefaults(t){const e=this.metaDraft;e&&(this.metaDraft={...e,defaults:{...e.defaults??{},...t}})}async saveMeta(){const t=this.metaDraft;if(!(!t||this.metaBusy)){this.metaBusy=!0;try{await b.patchModelMeta({key:t.key,name:t.name,description:t.description??"",triggerPhrases:this.metaTriggerText.split(",").map(e=>e.trim()).filter(Boolean),defaults:t.defaults}),this.metaDraft=null,this.showToast("Model updated"),await this.loadStatus()}catch(e){this.showToast(e.message)}finally{this.metaBusy=!1}}}toggleLora(t){var i,r,a,s,n;const e={...this.selectedLoras};if(t in e){delete e[t];const p=new Set(((r=(((i=this.status)==null?void 0:i.loras)??[]).find(f=>f.name===t))==null?void 0:r.triggerPhrases)??[]),h=new Set((((a=this.status)==null?void 0:a.loras)??[]).filter(f=>f.name in e).flatMap(f=>f.triggerPhrases??[]));this.selectedTriggers=this.selectedTriggers.filter(f=>!p.has(f)||h.has(f))}else{const p=(n=(((s=this.status)==null?void 0:s.loras)??[]).find(h=>h.name===t))==null?void 0:n.weight;e[t]=p&&Number.isFinite(p)?p:1}this.selectedLoras=e}toggleTrigger(t){this.selectedTriggers=this.selectedTriggers.includes(t)?this.selectedTriggers.filter(e=>e!==t):[...this.selectedTriggers,t]}toggleCharacter(t){this.selectedChars=this.selectedChars.includes(t)?this.selectedChars.filter(e=>e!==t):[...this.selectedChars,t]}toggleSection(t){this.open={...this.open,[t]:!this.open[t]}}onCharThumbFile(t){var a;const e=t.target,i=(a=e.files)==null?void 0:a[0];if(e.value="",!i||!this.charDraft)return;const r=new FileReader;r.onload=()=>{this.charDraft&&(this.charDraft={...this.charDraft,imageData:String(r.result)})},r.readAsDataURL(i)}async saveCharacter(){const t=this.charDraft;if(!(!t||!t.name.trim()||this.charBusy)){this.charBusy=!0;try{await b.saveCharacter({id:t.id,name:t.name.trim(),prompt:t.prompt,negativePrompt:t.negativePrompt,imageData:t.imageData}),this.charDraft=null,this.bumpThumbs(),await this.loadCharacters(),this.showToast("Character saved")}catch(e){this.showToast(e.message)}finally{this.charBusy=!1}}}async deleteCharacter(){const t=this.charDraft;if(!(!(t!=null&&t.id)||this.charBusy)&&confirm(`Delete “${t.name}” from the character library?`)){this.charBusy=!0;try{await b.deleteCharacter(t.id),this.charDraft=null,await this.loadCharacters(),this.showToast("Character deleted")}catch(e){this.showToast(e.message)}finally{this.charBusy=!1}}}showToast(t){this.toast=t,setTimeout(()=>this.toast="",2600)}render(){return o`<div class="wrap">${this.renderBody()}</div>
      ${this.charDraft?this.renderCharEditor(this.charDraft):l}
      ${this.metaDraft?this.renderMetaEditor(this.metaDraft):l}
      ${this.expandedShot?this.renderLightbox(this.expandedShot):l}
      ${this.toast?o`<div class="toast">${this.toast}</div>`:l}`}renderLightbox(t){var i;const e=this.shots.find(r=>r.id===t.id)??t;return o`
      <div class="lightbox" @click=${r=>{r.target===r.currentTarget&&(this.expandedShot=null)}}>
        <img src=${b.genPreviewURL(e.id)} alt="Generated image" />
        <div class="row">
          <button class="btn primary" ?disabled=${e.saved} @click=${()=>this.save(e)}>
            <span class="material-symbols-rounded" style="font-size:17px;">${e.saved?"check":"save"}</span>
            ${e.saved?"Saved":"Save to library"}
          </button>
          ${((i=this.status)==null?void 0:i.backend)==="invokeai"?o`<button class="btn" @click=${()=>this.useAsModelThumb(e)}>
            <span class="material-symbols-rounded" style="font-size:17px;">photo_camera</span> Sync model preview
          </button>`:l}
          <button class="btn" @click=${()=>this.expandedShot=null}>
            <span class="material-symbols-rounded" style="font-size:17px;">close</span> Close
          </button>
        </div>
      </div>
    `}renderMetaEditor(t){var r;const e=t.defaults??{},i=t.type==="lora";return o`
      <div class="overlay" @click=${a=>{a.target===a.currentTarget&&(this.metaDraft=null)}}>
        <div class="dialog">
          <h3>Edit ${i?"LoRA":"model"} — synced with InvokeAI</h3>
          <div>
            <label class="field">Name</label>
            <input type="text" .value=${t.name}
              @input=${a=>this.metaDraft={...t,name:a.target.value}} />
          </div>
          <div>
            <label class="field">Description</label>
            <textarea .value=${t.description??""}
              @input=${a=>this.metaDraft={...t,description:a.target.value}}></textarea>
          </div>
          <div>
            <label class="field">Trigger phrases (comma-separated)</label>
            <input type="text" .value=${this.metaTriggerText} placeholder="my-style, detailed face"
              @input=${a=>this.metaTriggerText=a.target.value} />
          </div>
          ${i?o`<div>
                <label class="field">Recommended weight</label>
                <input class="num" type="number" min="-2" max="2" step="0.05"
                  .value=${String(e.weight??"")} placeholder="1"
                  @input=${a=>this.setMetaDefaults({weight:Number(a.target.value)||0})} />
              </div>`:o`
                <div class="meta-grid">
                  <div>
                    <label class="field">Steps</label>
                    <input class="num" type="number" min="1" max="80" .value=${String(e.steps??"")}
                      @input=${a=>this.setMetaDefaults({steps:Number(a.target.value)||0})} />
                  </div>
                  <div>
                    <label class="field">CFG scale</label>
                    <input class="num" type="number" min="1" max="30" step="0.5" .value=${String(e.cfgScale??"")}
                      @input=${a=>this.setMetaDefaults({cfgScale:Number(a.target.value)||0})} />
                  </div>
                  <div>
                    <label class="field">CFG rescale</label>
                    <input class="num" type="number" min="0" max="0.99" step="0.05"
                      .value=${String(e.cfgRescale??"")}
                      @input=${a=>this.setMetaDefaults({cfgRescale:Number(a.target.value)||0})} />
                  </div>
                  <div>
                    <label class="field">Width</label>
                    <input class="num" type="number" min="64" max="2048" step="8" .value=${String(e.width??"")}
                      @input=${a=>this.setMetaDefaults({width:Number(a.target.value)||0})} />
                  </div>
                  <div>
                    <label class="field">Height</label>
                    <input class="num" type="number" min="64" max="2048" step="8" .value=${String(e.height??"")}
                      @input=${a=>this.setMetaDefaults({height:Number(a.target.value)||0})} />
                  </div>
                  <div class="full">
                    <label class="field">Scheduler</label>
                    <select class="num" .value=${e.scheduler??""}
                      @change=${a=>this.setMetaDefaults({scheduler:a.target.value})}>
                      <option value="">No preference</option>
                      ${["euler_a","euler","dpmpp_2m","dpmpp_2m_k","dpmpp_2m_sde_k","dpmpp_sde_k","unipc"].map(a=>o`<option value=${a} ?selected=${a===e.scheduler}>${a}</option>`)}
                    </select>
                  </div>
                  <div class="full">
                    <label class="field">Default VAE</label>
                    <select class="num" .value=${e.vae??""}
                      @change=${a=>this.setMetaDefaults({vae:a.target.value})}>
                      <option value="">Model's own</option>
                      ${(((r=this.status)==null?void 0:r.vaes)??[]).map(a=>o`<option value=${a.key} ?selected=${a.key===e.vae}>${a.name}</option>`)}
                    </select>
                  </div>
                  <div class="full">
                    <label class="field">VAE precision</label>
                    <select class="num" .value=${e.vaePrecision??""}
                      @change=${a=>this.setMetaDefaults({vaePrecision:a.target.value})}>
                      <option value="">No preference</option>
                      <option value="fp32">fp32</option>
                      <option value="fp16">fp16</option>
                    </select>
                  </div>
                </div>
              `}
          <div class="dialog-actions">
            <button class="btn" @click=${()=>this.metaDraft=null}>Cancel</button>
            <button class="btn primary" ?disabled=${this.metaBusy||!t.name.trim()} @click=${()=>this.saveMeta()}>
              Save
            </button>
          </div>
        </div>
      </div>
    `}renderBody(){const t=this.status;if(t===null)return o`<div class="empty"><md-circular-progress indeterminate></md-circular-progress></div>`;if(!t.enabled)return o`<div class="empty">
        <span class="material-symbols-rounded">auto_awesome</span>
        <div style="font-size:15px; margin-bottom:6px;">Image generation isn't set up yet.</div>
        <div style="font-size:13px;">
          Add the URL of your local InvokeAI or Automatic1111 / SD.Next server under
          <strong>Settings → Image generation</strong>, then come back here.
        </div>
      </div>`;if(!t.reachable)return o`<div class="empty">
        <span class="material-symbols-rounded">cloud_off</span>
        <div style="font-size:15px; margin-bottom:6px;">Can't reach the image generator.</div>
        <div style="font-size:13px; margin-bottom:14px;">${t.error??"It didn't answer."}</div>
        <button class="chip" @click=${()=>this.loadStatus()}>Retry</button>
      </div>`;const e=t.backend==="invokeai";return o`
      <div class="layout">
        <aside class="side">
          ${this.renderModelSection(t.models??[])}
          ${this.renderLoraSection(t.loras??[],t.loraError)}
          ${this.renderVaeSection(t.vaes??[])}
          ${this.renderSettingsSection(e,t.boards??[])}
          ${this.renderTemplateSection(t.templates??[])}
          ${this.renderCharacterSection()}
        </aside>
        <div>
          ${e?o`<div class="topline">
                <div class="spacer"></div>
                <button class="ghost" @click=${()=>this.civitaiOpen=!0}>
                  <span class="material-symbols-rounded" style="font-size:17px;">travel_explore</span>
                  Browse Civitai
                </button>
              </div>`:l}
          ${this.renderResults()}
          ${this.error?o`<div class="banner">${this.error}</div>`:l}
          ${this.renderPrompt()}
        </div>
        ${e?o`<aside class="right">
              <oppai-invoke-gallery @boards-changed=${()=>this.loadStatus()}></oppai-invoke-gallery>
            </aside>`:l}
      </div>
      ${this.civitaiOpen?o`<oppai-civitai @close=${()=>this.onCivitaiClose()}></oppai-civitai>`:l}
    `}onCivitaiClose(){this.civitaiOpen=!1,this.loadStatus()}section(t,e,i,r){const a=!!this.open[t];return o`
      <div class="sec">
        <button class="sec-head" @click=${()=>this.toggleSection(t)}>
          <span class="material-symbols-rounded" style="font-size:18px;"
            >${a?"expand_more":"chevron_right"}</span
          >
          ${e}
          <span class="count">${i}</span>
        </button>
        ${a?o`<div class="sec-body">${r}</div>`:l}
      </div>
    `}renderModelSection(t){if(!t.length)return this.section("models","Models","0",o`<div class="sec-note">
          Connected, but the generator lists no checkpoints. Add a model to it and reload.
        </div>`);const e=o`
      <div class="cards">
        ${t.map(i=>{const r=i.title===this.checkpoint,a=`${b.modelThumbURL(i.title)}&v=${this.thumbVersion}`;return o`
            <div class="card-wrap">
              <button class="card ${r?"on":""}" title=${i.title} @click=${()=>this.pickModel(i)}>
                ${this.renderArt(a,i.model_name,"texture")}
                <div class="card-name">${i.model_name}${i.base?o`<span class="row-sub">${i.base}</span>`:l}</div>
              </button>
              <button class="card-edit left" title="Edit model settings" @click=${()=>this.openMetaEditor(i.title)}>
                <span class="material-symbols-rounded" style="font-size:15px;">edit</span>
              </button>
            </div>
          `})}
      </div>
    `;return this.section("models","Models",String(t.length),e)}renderLoraSection(t,e){if(!t.length)return this.section("loras","LoRAs","0",o`<div class="sec-note">
          ${e?`LoRAs aren't available from this generator: ${e}`:"No LoRAs installed."}
        </div>`);const i=Math.ceil(t.length/6),r=Math.min(this.loraPage,i-1),a=t.slice(r*6,r*6+6),s=o`
      <div class="cards">
        ${a.map(n=>{const p=n.name in this.selectedLoras,h=`${b.loraThumbURL(n.name)}&v=${this.thumbVersion}`;return o`
            <div class="card-wrap">
              <button class="card ${p?"on":""}" title=${n.name} @click=${()=>this.toggleLora(n.name)}>
                ${this.renderArt(h,n.alias||n.name,"style")}
                <div class="card-name">${n.alias||n.name}</div>
              </button>
              <button class="card-edit left" title="Edit LoRA settings" @click=${()=>this.openMetaEditor(n.name)}>
                <span class="material-symbols-rounded" style="font-size:15px;">edit</span>
              </button>
              ${p?o`<input class="lora-weight" type="number" min="-2" max="2" step="0.05"
                aria-label=${`${n.alias||n.name} weight`}
                .value=${String(this.selectedLoras[n.name])}
                @input=${f=>{const v=Number(f.target.value);this.selectedLoras={...this.selectedLoras,[n.name]:Number.isFinite(v)?Math.max(-2,Math.min(2,v)):1}}} />`:l}
            </div>
          `})}
      </div>
      ${i>1?o`<div class="pager">
        <button ?disabled=${r===0} @click=${()=>this.loraPage=r-1}>Previous</button>
        <span>${r+1} / ${i}</span>
        <button ?disabled=${r>=i-1} @click=${()=>this.loraPage=r+1}>Next</button>
      </div>`:l}
    `;return this.section("loras","LoRAs",String(Object.keys(this.selectedLoras).length||t.length),s)}renderVaeSection(t){const e=t.length?o`
          <div class="rows">
            <button class="row-pick ${this.vae===""?"on":""}" @click=${()=>this.vae=""}>
              Model default
            </button>
            ${t.map(i=>o`<button
                class="row-pick ${this.vae===i.key?"on":""}"
                @click=${()=>this.vae=this.vae===i.key?"":i.key}
              >
                ${i.name}
                ${i.base?o`<span class="row-sub">${i.base}</span>`:l}
              </button>`)}
          </div>
        `:o`<div class="sec-note">The generator lists no standalone VAEs; the model's own is used.</div>`;return this.section("vaes","VAEs",this.vae?"1 picked":"default",e)}renderSettingsSection(t,e){const i=o`
      <div class="settings">
        <div class="full">
          <label class="field">Scheduler</label>
          <select
            class="num"
            .value=${this.scheduler}
            @change=${r=>this.scheduler=r.target.value}
          >
            ${Ds.map(r=>o`<option value=${r.id} ?selected=${r.id===this.scheduler}>${r.label}</option>`)}
          </select>
        </div>
        <div>
          <label class="field">Steps</label>
          <input class="num" type="number" min="1" max="80" .value=${String(this.steps)}
            @input=${r=>this.steps=ze(r.target.value,1,80,25)} />
        </div>
        <div>
          <label class="field">CFG scale</label>
          <input class="num" type="number" min="1" max="30" step="0.5" .value=${String(this.cfg)}
            @input=${r=>this.cfg=Wi(r.target.value,1,30,7)} />
        </div>
        ${t?o`
          <div>
            <label class="field">CFG rescale</label>
            <input class="num" type="number" min="0" max="0.99" step="0.05" .value=${String(this.cfgRescale)}
              @input=${r=>this.cfgRescale=Wi(r.target.value,0,.99,0)} />
          </div>
          <div>
            <label class="field">CLIP skip</label>
            <input class="num" type="number" min="0" max="12" .value=${String(this.clipSkip)}
              @input=${r=>this.clipSkip=ze(r.target.value,0,12,0)} />
          </div>
        `:l}
        <div>
          <label class="field">Count</label>
          <input class="num" type="number" min="1" max="8" .value=${String(this.count)}
            @input=${r=>this.count=ze(r.target.value,1,8,1)} />
        </div>
        <div>
          <label class="field">Seed (-1 random)</label>
          <input class="num" type="number" .value=${String(this.seed)}
            @input=${r=>this.seed=ze(r.target.value,-1,2147483648,-1)} />
        </div>
        ${t?o`
          <div class="full">
            <label class="field">Add generations to gallery</label>
            <select class="num" .value=${this.board}
              @change=${r=>this.board=r.target.value}>
              ${e.map(r=>o`<option value=${r.id}>${r.name}</option>`)}
            </select>
          </div>
          <div>
            <label class="field">VAE precision</label>
            <select class="num" .value=${this.vaePrecision}
              @change=${r=>this.vaePrecision=r.target.value}>
              <option value="fp32">fp32 (safe)</option>
              <option value="fp16">fp16 (faster)</option>
            </select>
          </div>
          <label class="switch-row"><input type="checkbox" .checked=${this.cpuNoise}
            @change=${r=>this.cpuNoise=r.target.checked} /> CPU noise</label>
          <label class="switch-row"><input type="checkbox" .checked=${this.seamlessX}
            @change=${r=>this.seamlessX=r.target.checked} /> Seamless X</label>
          <label class="switch-row"><input type="checkbox" .checked=${this.seamlessY}
            @change=${r=>this.seamlessY=r.target.checked} /> Seamless Y</label>
        `:l}
      </div>
    `;return this.section("settings","Model settings",`${this.steps} steps`,i)}renderTemplateSection(t){const e=t.length?o`
          <div class="rows">
            ${t.map(r=>o`<button
                class="row-pick ${this.templateId===r.id?"on":""}"
                title=${r.prompt}
                @click=${()=>this.templateId=this.templateId===r.id?"":r.id}
              >
                ${r.name}
                <span class="row-sub">${r.prompt}</span>
              </button>`)}
          </div>
        `:o`<div class="sec-note">
          No templates on the generator. In InvokeAI they're called style presets; add some there and reload.
        </div>`,i=t.find(r=>r.id===this.templateId);return this.section("templates","Invoke templates",i?i.name:"none",e)}renderCharacterSection(){const t=o`
      ${this.characters.length?o`<div class="cards">
            ${this.characters.map(i=>{const r=this.selectedChars.includes(i.id),a=`${b.characterThumbURL(i.id)}?v=${this.thumbVersion}`;return o`
                <div class="card-wrap">
                  <button class="card ${r?"on":""}" title=${i.prompt} @click=${()=>this.toggleCharacter(i.id)}>
                    ${i.hasThumb?this.renderArt(a,i.name,"person"):o`<div class="card-blank">
                          <span class="material-symbols-rounded" style="font-size:34px;">person</span>
                        </div>`}
                    <div class="card-name">${i.name}</div>
                  </button>
                  <button
                    class="card-edit"
                    title="Edit ${i.name}"
                    @click=${()=>this.charDraft={id:i.id,name:i.name,prompt:i.prompt,negativePrompt:i.negativePrompt??""}}
                  >
                    <span class="material-symbols-rounded" style="font-size:15px;">edit</span>
                  </button>
                </div>
              `})}
          </div>`:o`<div class="sec-note">
            Save the people you keep drawing: a character bundles a prompt fragment and a
            portrait, and clicking one adds them to the next generation.
          </div>`}
      <button
        class="side-add"
        @click=${()=>this.charDraft={name:"",prompt:"",negativePrompt:""}}
      >
        <span class="material-symbols-rounded" style="font-size:17px;">person_add</span> New character
      </button>
    `,e=this.selectedChars.length;return this.section("characters","Characters",e?`${e} picked`:String(this.characters.length),t)}renderCharEditor(t){var i;const e=t.imageData??(t.id&&((i=this.characters.find(r=>r.id===t.id))!=null&&i.hasThumb)?`${b.characterThumbURL(t.id)}?v=${this.thumbVersion}`:void 0);return o`
      <div class="overlay" @click=${r=>{r.target===r.currentTarget&&(this.charDraft=null)}}>
        <div class="dialog">
          <h3>${t.id?"Edit character":"New character"}</h3>
          <div>
            <label class="field">Name</label>
            <input type="text" .value=${t.name} placeholder="Rin"
              @input=${r=>this.charDraft={...t,name:r.target.value}} />
          </div>
          <div>
            <label class="field">Prompt fragment</label>
            <textarea .value=${t.prompt} placeholder="1girl, red hair, green eyes, …"
              @input=${r=>this.charDraft={...t,prompt:r.target.value}}></textarea>
          </div>
          <div>
            <label class="field">Negative fragment (optional)</label>
            <textarea .value=${t.negativePrompt} placeholder="blonde, …"
              @input=${r=>this.charDraft={...t,negativePrompt:r.target.value}}></textarea>
          </div>
          <div class="dialog-thumb">
            ${e?o`<img src=${e} alt="Thumbnail" />`:o`<div class="card-blank" style="width:72px; height:96px; aspect-ratio:auto; border-radius:10px;">
                  <span class="material-symbols-rounded">person</span>
                </div>`}
            <label class="btn">
              Choose thumbnail…
              <input class="hidden-file" type="file" accept="image/*" @change=${r=>this.onCharThumbFile(r)} />
            </label>
          </div>
          <div class="dialog-actions">
            ${t.id?o`<button class="btn danger" ?disabled=${this.charBusy} @click=${()=>this.deleteCharacter()}>
                  Delete
                </button>`:l}
            <button class="btn" @click=${()=>this.charDraft=null}>Cancel</button>
            <button class="btn primary" ?disabled=${!t.name.trim()||this.charBusy} @click=${()=>this.saveCharacter()}>
              Save
            </button>
          </div>
        </div>
      </div>
    `}renderPrompt(){var e;const t=[...new Set((((e=this.status)==null?void 0:e.loras)??[]).filter(i=>i.name in this.selectedLoras).flatMap(i=>i.triggerPhrases??[]))];return o`
      <div class="prompt-card">
        <div class="speech-row">
          ${this.speechSupported?o`<button
                class="mic ${this.listening?"live":""}"
                title=${this.listening?"Stop":"Speak your idea"}
                @click=${()=>this.toggleListening()}
              >
                <span class="material-symbols-rounded">${this.listening?"stop":"mic"}</span>
              </button>`:l}
          <div class="speech-hint">
            ${this.listening?this.speech||"Listening…":this.optimizing?"Turning that into a prompt…":this.speechSupported?"Tap the mic and describe the image, or type below.":"Type a prompt below. (Speech isn't supported in this browser.)"}
          </div>
        </div>

        <div>
          <label class="field">Prompt</label>
          <textarea
            .value=${this.prompt}
            placeholder="masterpiece, best quality, …"
            @input=${i=>this.prompt=i.target.value}
          ></textarea>
          ${t.length?o`
            <div class="sec-note" style="margin-top:8px;">LoRA trigger phrases</div>
            <div class="chips">
              ${t.map(i=>o`<button
                class="chip ${this.selectedTriggers.includes(i)?"on":""}"
                title="Add or remove this trigger from the generated prompt"
                @click=${()=>this.toggleTrigger(i)}>${i}</button>`)}
            </div>
          `:l}
        </div>

        <button class="adv-toggle" @click=${()=>this.showOptions=!this.showOptions}>
          <span class="material-symbols-rounded" style="font-size:18px;"
            >${this.showOptions?"expand_less":"tune"}</span
          >
          ${this.showOptions?"Hide options":"Options"}
        </button>

        ${this.showOptions?this.renderPromptOptions():l}
      </div>

      <button class="generate" ?disabled=${this.generating||!this.prompt.trim()} @click=${()=>this.generate()}>
        ${this.generating?o`<md-circular-progress indeterminate style="--md-circular-progress-size:22px;"></md-circular-progress> Generating…`:o`<span class="material-symbols-rounded">auto_awesome</span> Generate`}
      </button>
    `}renderPromptOptions(){return o`
      <div>
        <label class="field">Negative prompt</label>
        <textarea
          .value=${this.negative}
          placeholder="lowres, bad anatomy, …"
          @input=${t=>this.negative=t.target.value}
        ></textarea>
      </div>
      <div>
        <label class="field">Resolution</label>
        <div class="chips">
          ${Os.map(t=>{const e=t.w===this.width&&t.h===this.height;return o`<button
              class="chip ${e?"on":""}"
              @click=${()=>{this.width=t.w,this.height=t.h}}
            >${t.label}<span class="hint">${t.hint}</span></button>`})}
        </div>
      </div>
      <div class="custom-size">
        <div>
          <label class="field">Width</label>
          <input class="num" type="number" min="64" max="2048" step="8" .value=${String(this.width)}
            @input=${t=>this.width=ze(t.target.value,64,2048,512)} />
        </div>
        <span class="material-symbols-rounded" style="margin-top:22px; color:var(--oppai-text-muted);">close</span>
        <div>
          <label class="field">Height</label>
          <input class="num" type="number" min="64" max="2048" step="8" .value=${String(this.height)}
            @input=${t=>this.height=ze(t.target.value,64,2048,768)} />
        </div>
      </div>
    `}renderResults(){return this.shots.length?o`
      <div class="section-label">Results</div>
      <div class="results">
        ${this.shots.map(t=>{var e;return o`
            <div class="shot">
              <img
                src=${b.genPreviewURL(t.id)}
                alt="Generated image"
                loading="lazy"
                style="cursor: zoom-in;"
                title="Expand"
                @click=${()=>this.expandedShot=t}
              />
              <div class="shot-actions">
                <button class="act primary" ?disabled=${t.saved} @click=${()=>this.save(t)}>
                  <span class="material-symbols-rounded" style="font-size:16px;"
                    >${t.saved?"check":"save"}</span
                  >
                  ${t.saved?"Saved":"Save"}
                </button>
                ${((e=this.status)==null?void 0:e.backend)==="invokeai"?o`<button class="act"
                  title="Set as this model's preview in InvokeAI" @click=${()=>this.useAsModelThumb(t)}>
                  <span class="material-symbols-rounded" style="font-size:16px;">photo_camera</span>
                </button>`:l}
              </div>
            </div>
          `})}
      </div>
      <div class="banner">
        Save copies an image into the library. InvokeAI also keeps its own gallery copy of
        everything generated — see the Invoke gallery panel to browse or delete those.
      </div>
    `:l}};w.styles=[me,ee,y`
      :host {
        display: block;
        color: var(--oppai-text);
      }
      .wrap {
        max-width: 1240px;
        margin: 0 auto;
        padding-bottom: 40px;
      }
      .layout {
        display: grid;
        grid-template-columns: 300px minmax(0, 1fr) 300px;
        gap: 20px;
        align-items: start;
      }
      @media (max-width: 1220px) {
        .layout {
          grid-template-columns: 300px minmax(0, 1fr);
        }
        /* The gallery drops under the main column rather than vanishing. */
        .layout > .right {
          grid-column: 2;
        }
      }
      @media (max-width: 940px) {
        .layout {
          grid-template-columns: minmax(0, 1fr);
        }
        .layout > .right {
          grid-column: 1;
        }
      }
      .empty {
        text-align: center;
        padding: 70px 20px;
        color: var(--oppai-text-muted);
      }
      .empty .material-symbols-rounded {
        font-size: 44px;
        display: block;
        margin-bottom: 12px;
      }

      /* Sidebar: stacked, collapsible sections. */
      .side {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .sec {
        background: var(--oppai-surface-2);
        border-radius: 14px;
        overflow: hidden;
      }
      .sec-head {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 8px;
        border: none;
        background: none;
        color: var(--oppai-text);
        font: inherit;
        font-size: 13px;
        font-weight: 600;
        letter-spacing: 0.3px;
        padding: 12px 14px;
        cursor: pointer;
        text-align: left;
      }
      .sec-head .count {
        margin-left: auto;
        font-weight: 400;
        font-size: 12px;
        color: var(--oppai-text-muted);
      }
      .sec-body {
        padding: 0 12px 12px;
      }
      .sec-note {
        font-size: 12px;
        color: var(--oppai-text-muted);
        padding: 0 2px 4px;
      }

      /* Picker cards (models, LoRAs, characters) — a 2-up grid in the sidebar. */
      .cards {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 10px;
      }
      .card-wrap {
        position: relative;
        min-width: 0;
        max-width: 100%;
      }
      .card {
        width: 100%;
        border: 2px solid transparent;
        border-radius: 12px;
        overflow: hidden;
        background: var(--oppai-surface);
        cursor: pointer;
        padding: 0;
        text-align: left;
        transition: transform 0.18s var(--oppai-ease-spring), border-color 0.18s ease;
        min-width: 0;
        max-width: 100%;
      }
      .card:hover {
        transform: translateY(-2px);
      }
      .card.on {
        border-color: var(--oppai-accent);
      }
      .card-art {
        width: 100%;
        aspect-ratio: 3 / 4;
        object-fit: cover;
        display: block;
        background: var(--oppai-surface-3, var(--oppai-surface-2));
      }
      .card-blank {
        width: 100%;
        aspect-ratio: 3 / 4;
        display: grid;
        place-items: center;
        color: var(--oppai-text-muted);
        background: var(--oppai-surface-3, var(--oppai-surface-2));
      }
      .card-name {
        font-size: 11px;
        padding: 6px 8px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .card-edit {
        position: absolute;
        top: 4px;
        right: 4px;
        width: 26px;
        height: 26px;
        border-radius: 13px;
        border: none;
        background: rgba(0, 0, 0, 0.55);
        color: #fff;
        display: grid;
        place-items: center;
        cursor: pointer;
      }
      .card-edit.left {
        right: auto;
        left: 4px;
      }
      .lora-weight {
        width: 100%;
        box-sizing: border-box;
        margin-top: 5px;
        padding: 5px 7px;
        border: 1px solid var(--oppai-border-strong);
        border-radius: 8px;
        background: var(--oppai-surface);
        color: var(--oppai-text);
      }
      .pager {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        margin-top: 10px;
        font-size: 12px;
        color: var(--oppai-text-muted);
      }
      .pager button {
        border: 1px solid var(--oppai-border-strong);
        border-radius: 8px;
        background: var(--oppai-surface);
        color: var(--oppai-text);
        padding: 6px 9px;
        cursor: pointer;
      }
      .pager button:disabled { opacity: 0.4; cursor: default; }
      .switch-row {
        display: flex;
        align-items: center;
        gap: 8px;
        min-height: 34px;
        font-size: 12px;
        color: var(--oppai-text-dim);
      }

      /* Compact settings rows in the sidebar. */
      .settings {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
      }
      .settings .full {
        grid-column: 1 / -1;
      }
      label.field {
        font-size: 12px;
        font-weight: 600;
        color: var(--oppai-text-dim);
        display: block;
        margin-bottom: 6px;
      }
      .num,
      select.num {
        width: 100%;
        box-sizing: border-box;
        background: var(--oppai-surface);
        border: 1px solid var(--oppai-border-strong);
        border-radius: 10px;
        color: var(--oppai-text);
        font: inherit;
        font-size: 13px;
        padding: 8px 10px;
        outline: none;
      }

      /* Template / VAE rows. */
      .rows {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .row-pick {
        border: 1px solid var(--oppai-border-strong);
        background: var(--oppai-surface);
        color: var(--oppai-text);
        border-radius: 10px;
        font: inherit;
        font-size: 13px;
        text-align: left;
        padding: 8px 10px;
        cursor: pointer;
      }
      .row-pick.on {
        border-color: var(--oppai-accent);
        background: var(--oppai-accent);
        color: var(--oppai-on-accent);
      }
      .row-sub {
        display: block;
        font-size: 11px;
        opacity: 0.75;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .side-add {
        margin-top: 10px;
        width: 100%;
        height: 36px;
        border: 1px dashed var(--oppai-border-strong);
        border-radius: 10px;
        background: none;
        color: var(--oppai-text-dim);
        font: inherit;
        font-size: 13px;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
      }

      /* Prompt block. */
      .prompt-card {
        background: var(--oppai-surface-2);
        border-radius: 18px;
        padding: 14px;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .speech-row {
        display: flex;
        gap: 10px;
        align-items: center;
      }
      .mic {
        flex: 0 0 auto;
        width: 46px;
        height: 46px;
        border-radius: 23px;
        border: none;
        cursor: pointer;
        background: var(--oppai-primary);
        color: var(--oppai-on-primary);
        display: grid;
        place-items: center;
        transition: transform 0.15s var(--oppai-ease-spring), filter 0.15s ease;
      }
      .mic.live {
        background: var(--oppai-error, #f2b8b5);
        color: #000;
        animation: oppai-pulse 1.1s ease-in-out infinite;
      }
      @keyframes oppai-pulse {
        0%, 100% { filter: brightness(1); }
        50% { filter: brightness(1.35); }
      }
      .speech-hint {
        font-size: 13px;
        color: var(--oppai-text-muted);
        flex: 1;
      }
      textarea {
        width: 100%;
        box-sizing: border-box;
        background: var(--oppai-surface);
        border: 1px solid var(--oppai-border-strong);
        border-radius: 12px;
        color: var(--oppai-text);
        font: inherit;
        font-size: 14px;
        padding: 10px 12px;
        resize: vertical;
        min-height: 64px;
        outline: none;
      }
      textarea:focus {
        border-color: var(--oppai-primary);
      }
      .adv-toggle {
        background: none;
        border: none;
        color: var(--oppai-primary-bright);
        font: inherit;
        font-size: 13px;
        cursor: pointer;
        padding: 0;
        display: inline-flex;
        align-items: center;
        gap: 4px;
      }
      .chips {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }
      .chip {
        min-height: 34px;
        padding: 4px 14px;
        border-radius: 17px;
        font-size: 13px;
        font-family: inherit;
        cursor: pointer;
        background: transparent;
        color: var(--oppai-text-dim);
        border: 1px solid var(--oppai-border-strong);
        text-align: center;
      }
      .chip.on {
        background: var(--oppai-accent);
        color: var(--oppai-on-accent);
        border-color: var(--oppai-accent);
      }
      .chip .hint {
        display: block;
        font-size: 10px;
        opacity: 0.75;
      }
      .custom-size {
        display: flex;
        gap: 10px;
        align-items: center;
      }
      .custom-size .num {
        width: 90px;
      }
      .generate {
        margin-top: 16px;
        height: 50px;
        width: 100%;
        border: none;
        border-radius: 25px;
        background: var(--oppai-primary);
        color: var(--oppai-on-primary);
        font-size: 15px;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
      }
      .generate:disabled {
        opacity: 0.6;
        cursor: default;
      }

      /* Results. */
      .results {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 16px;
        margin-top: 14px;
      }
      .shot {
        border-radius: 16px;
        overflow: hidden;
        background: var(--oppai-surface-2);
        position: relative;
      }
      .shot img {
        width: 100%;
        display: block;
        aspect-ratio: 3 / 4;
        object-fit: cover;
        background: #000;
      }
      .shot-actions {
        display: flex;
        gap: 6px;
        padding: 8px;
      }
      .act {
        flex: 1;
        height: 36px;
        border: none;
        border-radius: 10px;
        background: var(--oppai-surface-3, var(--oppai-surface));
        color: var(--oppai-text);
        font: inherit;
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
      }
      .act.primary {
        background: var(--oppai-primary);
        color: var(--oppai-on-primary);
      }
      .act:disabled {
        opacity: 0.55;
        cursor: default;
      }
      .banner {
        background: var(--oppai-surface-2);
        border: 1px solid var(--oppai-border-strong);
        border-radius: 12px;
        padding: 12px 14px;
        font-size: 13px;
        color: var(--oppai-text-dim);
        margin-top: 12px;
      }
      .section-label {
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 0.4px;
        text-transform: uppercase;
        color: var(--oppai-text-muted);
        margin: 22px 0 10px;
      }
      .toast {
        position: fixed;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--oppai-surface-2);
        color: var(--oppai-text);
        padding: 12px 20px;
        border-radius: 12px;
        z-index: 60;
        box-shadow: 0 8px 28px rgba(0, 0, 0, 0.45);
        animation: oppai-fade-in-up 0.28s var(--oppai-ease-emphasized) both;
      }
      .hidden-file {
        display: none;
      }

      /* Character editor dialog. */
      .overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.55);
        display: grid;
        place-items: center;
        z-index: 50;
        padding: 20px;
      }
      .dialog {
        background: var(--oppai-surface-2);
        border-radius: 18px;
        padding: 18px;
        width: min(440px, 100%);
        max-height: 90vh;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .dialog h3 {
        margin: 0;
        font-size: 16px;
      }
      .dialog input[type="text"] {
        width: 100%;
        box-sizing: border-box;
        background: var(--oppai-surface);
        border: 1px solid var(--oppai-border-strong);
        border-radius: 10px;
        color: var(--oppai-text);
        font: inherit;
        font-size: 14px;
        padding: 9px 11px;
        outline: none;
      }
      .dialog-thumb {
        display: flex;
        gap: 12px;
        align-items: center;
      }
      .dialog-thumb img {
        width: 72px;
        height: 96px;
        object-fit: cover;
        border-radius: 10px;
        background: var(--oppai-surface);
      }
      .dialog-actions {
        display: flex;
        gap: 8px;
        justify-content: flex-end;
      }
      .dialog-actions .danger {
        margin-right: auto;
        color: var(--oppai-error, #f2b8b5);
      }
      .btn {
        border: none;
        border-radius: 10px;
        background: var(--oppai-surface-3, var(--oppai-surface));
        color: var(--oppai-text);
        font: inherit;
        font-size: 13px;
        font-weight: 600;
        padding: 9px 14px;
        cursor: pointer;
      }
      .btn.primary {
        background: var(--oppai-primary);
        color: var(--oppai-on-primary);
      }
      .btn:disabled {
        opacity: 0.55;
        cursor: default;
      }

      /* Result lightbox. */
      .lightbox {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.85);
        z-index: 60;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 14px;
        padding: 20px;
      }
      .lightbox img {
        max-width: min(96vw, 1400px);
        max-height: 82vh;
        object-fit: contain;
        border-radius: 10px;
      }
      .lightbox .row {
        display: flex;
        gap: 10px;
      }

      /* Model/LoRA edit dialog fields. */
      .meta-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
      }
      .meta-grid .full {
        grid-column: 1 / -1;
      }
      .topline {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 14px;
      }
      .topline .spacer {
        flex: 1;
      }
      .ghost {
        border: 1px solid var(--oppai-border-strong);
        background: transparent;
        color: var(--oppai-text-dim);
        border-radius: 12px;
        font: inherit;
        font-size: 13px;
        padding: 8px 14px;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }
    `];_([c()],w.prototype,"status",2);_([c()],w.prototype,"checkpoint",2);_([c()],w.prototype,"vae",2);_([c()],w.prototype,"templateId",2);_([c()],w.prototype,"selectedLoras",2);_([c()],w.prototype,"selectedTriggers",2);_([c()],w.prototype,"loraPage",2);_([c()],w.prototype,"characters",2);_([c()],w.prototype,"selectedChars",2);_([c()],w.prototype,"charDraft",2);_([c()],w.prototype,"charBusy",2);_([c()],w.prototype,"open",2);_([c()],w.prototype,"speech",2);_([c()],w.prototype,"listening",2);_([c()],w.prototype,"optimizing",2);_([c()],w.prototype,"prompt",2);_([c()],w.prototype,"negative",2);_([c()],w.prototype,"showOptions",2);_([c()],w.prototype,"width",2);_([c()],w.prototype,"height",2);_([c()],w.prototype,"steps",2);_([c()],w.prototype,"cfg",2);_([c()],w.prototype,"cfgRescale",2);_([c()],w.prototype,"clipSkip",2);_([c()],w.prototype,"seamlessX",2);_([c()],w.prototype,"seamlessY",2);_([c()],w.prototype,"vaePrecision",2);_([c()],w.prototype,"cpuNoise",2);_([c()],w.prototype,"board",2);_([c()],w.prototype,"scheduler",2);_([c()],w.prototype,"count",2);_([c()],w.prototype,"seed",2);_([c()],w.prototype,"generating",2);_([c()],w.prototype,"shots",2);_([c()],w.prototype,"error",2);_([c()],w.prototype,"toast",2);_([c()],w.prototype,"thumbVersion",2);_([c()],w.prototype,"failedThumbs",2);_([c()],w.prototype,"expandedShot",2);_([c()],w.prototype,"metaDraft",2);_([c()],w.prototype,"metaBusy",2);_([c()],w.prototype,"metaTriggerText",2);_([c()],w.prototype,"civitaiOpen",2);_([S("oppai-invoke-gallery")],w.prototype,"galleryPanel",2);w=_([C("oppai-imagegen")],w);function ze(t,e,i,r){const a=Number(t);return Number.isFinite(a)?Math.min(i,Math.max(e,Math.round(a))):r}function Wi(t,e,i,r){const a=Number(t);return Number.isFinite(a)?Math.min(i,Math.max(e,a)):r}var Rs=Object.defineProperty,Ms=Object.getOwnPropertyDescriptor,ke=(t,e,i,r)=>{for(var a=r>1?void 0:r?Ms(e,i):e,s=t.length-1,n;s>=0;s--)(n=t[s])&&(a=(r?n(e,i,a):n(a))||a);return r&&a&&Rs(e,i,a),a};const Ji=[{id:"sweet",label:"Sweet",emotion:"happy"},{id:"playful",label:"Playful",emotion:"mischievous"},{id:"bold",label:"Bold",emotion:"surprised"},{id:"roleplay",label:"Roleplay",emotion:"thinking"}];let ae=class extends k{constructor(){super(...arguments),this.status=null,this.mode="sweet",this.messages=[],this.draft="",this.busy=!1,this.error=""}connectedCallback(){super.connectedCallback(),this.load()}async load(){try{this.status=await b.chatStatus()}catch(t){this.error=t.message}}setMode(t){this.mode=t}onKey(t){t.key==="Enter"&&!t.shiftKey&&(t.preventDefault(),this.send())}async send(){var i,r;const t=this.draft.trim();if(!t||this.busy||!((i=this.status)!=null&&i.enabled))return;const e=[...this.messages,{role:"user",content:t}];this.messages=e,this.draft="",this.busy=!0,this.error="";try{const a=await b.chat(this.mode,e);this.messages=[...e,{role:"assistant",content:a.message}],await this.updateComplete,(r=this.renderRoot.querySelector(".messages"))==null||r.scrollTo({top:1e9,behavior:"smooth"})}catch(a){this.error=a.message}finally{this.busy=!1}}render(){var a,s,n,p,h,f;const t=((a=Ji.find(v=>v.id===this.mode))==null?void 0:a.emotion)??"neutral",e=zr(t),i=Tr(t),r=bt();return o`<div class="layout">
      <aside class="libby"><div><div class="name">Libby</div>
        <div class="model">${(s=this.status)!=null&&s.enabled?this.status.model:"Local LLM not configured"}</div>
        <div class="modes">${Ji.map(v=>o`<button class="mode ${v.id===this.mode?"on":""}"
          @click=${()=>this.setMode(v.id)}>${v.label}</button>`)}</div></div>
        ${r?l:o`<img src=${e} alt="Libby"
          @error=${v=>{const u=v.target;u.src.endsWith(i)||(u.src=i)}} />`}
      </aside>
      <section class="chat"><div class="messages">
        ${(n=this.status)!=null&&n.enabled?l:o`<div class="empty">Configure a local OpenAI-compatible URL and model in Settings to chat with Libby.</div>`}
        ${(p=this.status)!=null&&p.enabled&&!this.messages.length?o`<div class="empty">Libby is ready. Pick a mode and say what’s on your mind.</div>`:l}
        ${this.messages.map(v=>o`<div class="bubble ${v.role}">${v.content}</div>`)}
        ${this.busy?o`<div class="bubble assistant">Libby is thinking…</div>`:l}
      </div>${this.error?o`<div class="error">${this.error}</div>`:l}
      <form @submit=${v=>{v.preventDefault(),this.send()}}>
        <textarea placeholder="Message Libby…" .value=${this.draft} ?disabled=${!((h=this.status)!=null&&h.enabled)||this.busy}
          @input=${v=>this.draft=v.target.value} @keydown=${this.onKey}></textarea>
        <button class="send" title="Send" ?disabled=${!this.draft.trim()||this.busy||!((f=this.status)!=null&&f.enabled)}>
          <span class="material-symbols-rounded">send</span></button>
      </form></section>
    </div>`}};ae.styles=[me,ee,y`
    :host { display:block; height:100%; }
    .layout { max-width:920px; height:calc(100vh - 120px); margin:auto; display:grid;
      grid-template-columns:230px 1fr; gap:18px; }
    .libby, .chat { background:var(--oppai-surface); border:1px solid var(--oppai-border);
      border-radius:20px; overflow:hidden; }
    .libby { display:flex; flex-direction:column; padding:18px; }
    .libby img { width:100%; min-height:0; flex:1; object-fit:contain; object-position:bottom; }
    .name { font-size:20px; font-weight:650; }
    .model { font-size:12px; color:var(--oppai-text-muted); margin-top:3px; overflow:hidden; text-overflow:ellipsis; }
    .modes { display:grid; grid-template-columns:1fr 1fr; gap:7px; margin-top:14px; }
    button { font:inherit; cursor:pointer; }
    .mode { border:1px solid var(--oppai-border-strong); border-radius:999px; padding:7px;
      background:transparent; color:var(--oppai-text-dim); }
    .mode.on { color:var(--oppai-primary-bright); background:var(--oppai-primary-container); border-color:var(--oppai-primary); }
    .chat { display:flex; flex-direction:column; }
    .messages { flex:1; overflow:auto; padding:20px; display:flex; flex-direction:column; gap:12px; }
    .bubble { max-width:78%; padding:11px 14px; border-radius:16px; white-space:pre-wrap; line-height:1.45; }
    .assistant { align-self:flex-start; background:var(--oppai-surface-2); border-bottom-left-radius:4px; }
    .user { align-self:flex-end; background:var(--oppai-primary-container); color:var(--oppai-primary-bright); border-bottom-right-radius:4px; }
    .empty { margin:auto; text-align:center; color:var(--oppai-text-muted); max-width:360px; }
    form { display:flex; gap:10px; padding:14px; border-top:1px solid var(--oppai-border); }
    textarea { flex:1; resize:none; min-height:44px; max-height:130px; box-sizing:border-box;
      border:1px solid var(--oppai-border-strong); border-radius:14px; padding:11px 13px;
      background:var(--oppai-surface-2); color:var(--oppai-text); font:inherit; outline:none; }
    textarea:focus { border-color:var(--oppai-primary); }
    .send { width:46px; border:0; border-radius:14px; background:var(--oppai-primary); color:var(--oppai-on-primary); }
    .send:disabled { opacity:.5; cursor:default; }
    .error { color:var(--md-sys-color-error); font-size:13px; padding:0 16px 10px; }
    @media(max-width:700px) { .layout { grid-template-columns:1fr; height:auto; }
      .libby { min-height:190px; flex-direction:row; gap:12px; } .libby img { width:130px; order:-1; }
      .chat { min-height:55vh; } }
  `];ke([c()],ae.prototype,"status",2);ke([c()],ae.prototype,"mode",2);ke([c()],ae.prototype,"messages",2);ke([c()],ae.prototype,"draft",2);ke([c()],ae.prototype,"busy",2);ke([c()],ae.prototype,"error",2);ae=ke([C("oppai-chat")],ae);var Fs=Object.defineProperty,Ns=Object.getOwnPropertyDescriptor,j=(t,e,i,r)=>{for(var a=r>1?void 0:r?Ns(e,i):e,s=t.length-1,n;s>=0;s--)(n=t[s])&&(a=(r?n(e,i,a):n(a))||a);return r&&a&&Fs(e,i,a),a};const Bs=[{id:"home",label:"Home",icon:"home"},...He.map(t=>({id:t,label:H[t].label,icon:H[t].icon})),{id:"favorites",label:"Favorites",icon:"favorite"},{id:"browse",label:"Browse",icon:"explore"},{id:"imagegen",label:"Create",icon:"auto_awesome"},{id:"chat",label:"Chat",icon:"chat_bubble"}];function Us(t){const e=(t.tags??[]).flatMap(i=>[i.name,i.category]);return[t.title,t.notes??"",...e].join(`
`).toLowerCase()}function js(t,e){if(e.length===0)return!0;const i=Us(t);return e.every(r=>i.includes(r))}let R=class extends k{constructor(){super(...arguments),this.items=[],this.loading=!1,this.section="home",this.selectedId=null,this.search="",this.filters={},this.favorites=ps(),this.uploadOpen=!1,this.dragActive=!1,this.selectMode=!1,this.selected=new Set,this.busy=!1,this.downloads=ns(),this.viewerList=[],this.onDownloads=t=>{this.downloads=t.detail},this.onDownloadComplete=()=>this.refresh(),this.onKey=t=>{var i;if(this.selectedId==null||this.uploadOpen||Ir(t))return;const e=((i=this.items.find(r=>r.id===this.selectedId))==null?void 0:i.kind)==="comic";switch(t.key){case"ArrowRight":if(e)return;t.preventDefault(),this.stepItem(1);break;case"ArrowLeft":if(e)return;t.preventDefault(),this.stepItem(-1);break;case"Escape":this.closeItem();break}},this.stepItem=t=>{if(this.selectedId==null)return;const e=this.viewerList.indexOf(this.selectedId);if(e<0)return;const i=e+t;i<0||i>=this.viewerList.length||(this.selectedId=this.viewerList[i])},this.closeItem=()=>{this.selectedId=null},this.toggleSelectMode=()=>{this.selectMode=!this.selectMode,this.selectMode||(this.selected=new Set)},this.toggleUpload=()=>{this.uploadOpen=!this.uploadOpen,this.dragActive=!1}}connectedCallback(){super.connectedCallback(),this.refresh(),window.addEventListener("keydown",this.onKey),window.addEventListener("oppai-downloads",this.onDownloads),window.addEventListener("oppai-download-complete",this.onDownloadComplete)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this.onKey),window.removeEventListener("oppai-downloads",this.onDownloads),window.removeEventListener("oppai-download-complete",this.onDownloadComplete)}async refresh(){this.loading=!0;try{const e=[];for(let i=0;;i+=200){const a=(await b.listMedia("",200,i)).items??[];if(e.push(...a),a.length<200)break}this.items=e}finally{this.loading=!1}}selectSection(t){this.section=t,this.selectedId=null,this.search=""}openItem(t,e){e&&e.length?this.viewerList=e.map(i=>i.id):this.viewerList.includes(t)||(this.viewerList=[t]),this.selectedId=t}onSearchInput(t){this.search=t.target.value,this.selectedId=null}clearSearch(){this.search=""}setFilter(t,e){this.filters={...this.filters,[t]:e}}toggleFavorite(t,e){e==null||e.stopPropagation();const i=new Set(this.favorites);i.has(t)?i.delete(t):i.add(t),this.favorites=i,At(i)}exitSelect(){this.selectMode=!1,this.selected=new Set}toggleSelected(t,e){e==null||e.stopPropagation();const i=new Set(this.selected);i.has(t)?i.delete(t):i.add(t),this.selected=i}async bulkDelete(){const t=[...this.selected];if(t.length&&confirm(`Delete ${t.length} item${t.length===1?"":"s"}? This cannot be undone.`)){this.busy=!0;try{await b.bulkMedia("delete",t);const e=new Set(this.favorites);t.forEach(i=>e.delete(i)),this.favorites=e,At(e),this.exitSelect(),await this.refresh()}catch(e){console.error("bulk delete",e)}finally{this.busy=!1}}}async bulkTags(t){const e=[...this.selected];if(!e.length)return;const i=prompt(t==="add"?"Add tags (comma-separated):":"Remove tags (comma-separated):");if(i==null)return;const r=i.split(",").map(a=>a.trim()).filter(Boolean);if(r.length){this.busy=!0;try{await b.bulkMedia("update",e,t==="add"?{addTags:r}:{removeTags:r}),await this.refresh()}catch(a){console.error("bulk tags",a)}finally{this.busy=!1}}}async bulkChangeKind(){const t=[...this.selected];if(!t.length)return;const e=prompt("Change type to (video, gif, image, comic, game):");if(e==null)return;const i=e.trim().toLowerCase();if(!He.includes(i)){alert(`Unknown type "${i}".`);return}this.busy=!0;try{await b.bulkMedia("update",t,{kind:i}),this.exitSelect(),await this.refresh()}catch(r){console.error("bulk kind",r)}finally{this.busy=!1}}bulkFavorite(){const t=new Set(this.favorites);this.selected.forEach(e=>t.add(e)),this.favorites=t,At(t),this.exitSelect()}logout(){this.dispatchEvent(new CustomEvent("logout",{bubbles:!0,composed:!0}))}browse(){var t;(t=this.renderRoot.querySelector("#file"))==null||t.click()}async onFiles(t){const e=Array.from(t);if(e.length){this.uploadOpen=!1;for(const i of e)try{await b.upload(i)}catch(r){console.error("upload",r)}this.refresh()}}onFileInput(t){const e=t.target;e.files&&this.onFiles(e.files),e.value=""}onDrop(t){var e,i;t.preventDefault(),this.dragActive=!1,(i=(e=t.dataTransfer)==null?void 0:e.files)!=null&&i.length&&this.onFiles(t.dataTransfer.files)}openScrape(){var t;this.uploadOpen=!1,(t=this.renderRoot.querySelector("oppai-scrape-dialog"))==null||t.open()}itemsForKind(t){return this.items.filter(e=>e.kind===t)}get viewerQueue(){return this.viewerList.map(t=>this.items.find(e=>e.id===t)).filter(t=>t!=null)}render(){var g;const t=this.search.trim().length>0,e=this.selectedId!=null,i=!e&&this.section==="settings"&&!t,r=!e&&this.section==="browse"&&!t,a=!e&&this.section==="imagegen"&&!t,s=!e&&this.section==="chat"&&!t,n=!e&&this.section==="favorites"&&!t,p=!e&&this.section==="home"&&!t&&!n,h=!e&&t,f=!e&&!p&&!n&&!h&&!i&&!r&&!a&&!s,v=e?this.items.find(z=>z.id===this.selectedId)??null:null;let u="Library";return e?u=v?v.title:"Library":h?u="Search results":i?u="Settings":r?u="Browse sources":a?u="Create":s?u="Chat with Libby":n?u="Favorites":p?u="Library":u=((g=H[this.section])==null?void 0:g.label)??"Library",o`
      ${this.renderNav()}
      <div class="main-col">
        ${this.renderHeader(u,t,e,i)}
        <main>
          ${p?this.renderHome():l}
          ${i?o`<oppai-settings .user=${this.user}></oppai-settings>`:l}
          ${r?o`<oppai-browse @imported=${()=>this.refresh()}></oppai-browse>`:l}
          ${a?o`<oppai-imagegen @imported=${()=>this.refresh()}></oppai-imagegen>`:l}
          ${s?o`<oppai-chat></oppai-chat>`:l}
          ${f||n||h?this.renderGrid(f,n,h):l}
          ${e&&v?o`<oppai-viewer
                .media=${v}
                .queue=${this.viewerQueue}
                .favorite=${this.favorites.has(v.id)}
                @toggle-favorite=${()=>this.toggleFavorite(v.id)}
                @navigate=${z=>this.stepItem(z.detail.dir)}
                @jump=${z=>this.selectedId=z.detail.id}
                @changed=${()=>this.refresh()}
                @deleted=${()=>{this.closeItem(),this.refresh()}}
              ></oppai-viewer>`:l}
          ${e&&!v?o`<div class="empty">Item not found.</div>`:l}
        </main>
      </div>
      ${this.renderUpload()}
      ${this.renderBulkBar()}
      ${this.renderDownloads()}
      <oppai-scrape-dialog @imported=${()=>this.refresh()}></oppai-scrape-dialog>
      <input id="file" type="file" multiple @change=${this.onFileInput} />
    `}renderDownloads(){return this.downloads.length===0?l:o`<aside class="download-area" aria-label="Downloads">
      <div class="download-heading">Downloads</div>
      ${this.downloads.slice(0,5).map(t=>o`
        <div class="download-row">
          <div class="download-ring" style=${`--p:${t.progress}`}>
            <span class="material-symbols-rounded">${t.state==="done"?"check":t.state==="error"?"error":"download"}</span>
          </div>
          <div class="download-copy">
            <div class="download-title">${t.label}</div>
            <div class="download-status">${t.state==="running"?`${Math.round(t.progress*100)}% · running in background`:t.state==="done"?"Complete":t.error||"Failed"}</div>
          </div>
          ${t.state!=="running"?o`<button class="download-dismiss" title="Dismiss" @click=${()=>ls(t.id)}>
            <span class="material-symbols-rounded">close</span>
          </button>`:l}
        </div>`)}
    </aside>`}renderBulkBar(){if(!this.selectMode||this.selected.size===0)return l;const t=this.selected.size;return o`
      <div class="bulk-bar">
        <span class="bulk-count">${t} selected</span>
        <button class="bulk-btn" ?disabled=${this.busy} @click=${()=>this.bulkTags("add")}>
          <span class="material-symbols-rounded" style="font-size:18px;">sell</span>Add tags
        </button>
        <button class="bulk-btn" ?disabled=${this.busy} @click=${()=>this.bulkTags("remove")}>
          <span class="material-symbols-rounded" style="font-size:18px;">label_off</span>Remove tags
        </button>
        <button class="bulk-btn" ?disabled=${this.busy} @click=${this.bulkChangeKind}>
          <span class="material-symbols-rounded" style="font-size:18px;">category</span>Type
        </button>
        <button class="bulk-btn" ?disabled=${this.busy} @click=${this.bulkFavorite}>
          <span class="material-symbols-rounded" style="font-size:18px;">favorite</span>Favorite
        </button>
        <button class="bulk-btn danger" ?disabled=${this.busy} @click=${this.bulkDelete}>
          <span class="material-symbols-rounded" style="font-size:18px;">delete</span>Delete
        </button>
        <button class="bulk-btn" @click=${()=>this.exitSelect()}>
          <span class="material-symbols-rounded" style="font-size:18px;">close</span>
        </button>
      </div>
    `}renderNav(){var i,r;const t=(((i=this.user)==null?void 0:i.username)??"?").slice(0,2).toUpperCase(),e=this.section==="settings"&&this.selectedId==null;return o`
      <nav>
        <button class="logo" title="OppaiLib" @click=${()=>this.selectSection("home")}>
          ${Sr}
        </button>
        <button class="add-btn" title="Add media" @click=${this.toggleUpload}>
          <span class="material-symbols-rounded" style="font-size:26px;">add</span>
        </button>

        <div class="nav-list">
          ${Bs.map(a=>{const s=this.section===a.id&&this.selectedId==null;return o`
              <button class="nav-item" @click=${()=>this.selectSection(a.id)}>
                <span
                  class="nav-pill"
                  style="background:${s?"var(--oppai-primary-container)":"transparent"};"
                >
                  <span
                    class="material-symbols-rounded ${s?"fill-icon":""}"
                    style="font-size:22px; color:${s?"var(--oppai-primary-bright)":"var(--oppai-text-dim)"};"
                    >${a.icon}</span
                  >
                </span>
                <span class="nav-label" style="color:${s?"var(--oppai-text)":"var(--oppai-text-muted)"};"
                  >${a.label}</span
                >
              </button>
            `})}
        </div>

        <div style="flex:1;"></div>

        <button
          class="icon-btn"
          title="Settings"
          @click=${()=>this.selectSection("settings")}
          style="width:48px; height:48px; border-radius:24px; background:${e?"var(--oppai-primary-container)":"var(--oppai-surface-2)"}; color:${e?"var(--oppai-primary-bright)":"var(--oppai-text-dim)"};"
        >
          <span class="material-symbols-rounded ${e?"fill-icon":""}" style="font-size:22px;"
            >settings</span
          >
        </button>
        <button
          class="icon-btn"
          title="Sign out (${(r=this.user)==null?void 0:r.username})"
          @click=${this.logout}
          style="width:40px; height:40px; border-radius:20px; background:var(--oppai-accent); color:var(--oppai-on-accent); font-size:13px; font-weight:600;"
        >
          ${t}
        </button>
      </nav>
    `}renderHeader(t,e,i,r=!1){return o`
      <header>
        ${i?o`<button
              class="icon-btn"
              title="Back"
              @click=${this.closeItem}
              style="width:40px; height:40px; border-radius:20px; background:none; color:var(--oppai-text); flex-shrink:0;"
            >
              <span class="material-symbols-rounded" style="font-size:24px;">arrow_back</span>
            </button>`:l}

        <h1 class="h-title">${t}</h1>

        <div class="searchbox">
          <span class="material-symbols-rounded" style="font-size:20px; color:var(--oppai-text-dim);">search</span>
          <input
            .value=${this.search}
            @input=${this.onSearchInput}
            placeholder="Search titles, tags, notes..."
          />
          ${e?o`<button
                class="icon-btn"
                @click=${this.clearSearch}
                style="background:none; color:var(--oppai-text-dim);"
              >
                <span class="material-symbols-rounded" style="font-size:18px;">close</span>
              </button>`:l}
        </div>

        <div style="flex:1;"></div>

        ${!i&&!r?o`<button
              class="filters-btn header-toggle ${this.selectMode?"on":""}"
              title="Select multiple"
              @click=${this.toggleSelectMode}
            >
              <span class="material-symbols-rounded" style="font-size:18px;"
                >${this.selectMode?"check_circle":"check_box_outline_blank"}</span
              >
              <span style="font-size:13px; font-weight:500;">Select</span>
            </button>`:l}
        ${r?l:o`<button class="filters-btn">
              <span class="material-symbols-rounded" style="font-size:18px;">tune</span>
              <span style="font-size:13px; font-weight:500;">Filters</span>
            </button>`}
      </header>
    `}renderHome(){const t=new Date().getHours(),e=t<12?"Good morning":t<18?"Good afternoon":"Good evening",i=He.map(r=>({kind:r,label:H[r].label,icon:H[r].icon,items:this.itemsForKind(r).slice(0,12)})).filter(r=>r.items.length>0);return this.loading&&this.items.length===0?o`<div class="empty">Loading your library…</div>`:i.length===0?o`<div>
        <h2 class="greeting">${e}</h2>
        <p class="greeting-sub">Your library is empty — add media or import from a URL.</p>
        <div class="empty">
          <span class="material-symbols-rounded" style="font-size:40px; display:block; margin-bottom:12px;"
            >library_add</span
          >
          <div style="font-size:14px;">Nothing here yet.</div>
        </div>
      </div>`:o`
      <div>
        <h2 class="greeting anim-rise">${e}</h2>
        <p class="greeting-sub anim-rise" style="animation-delay:40ms;">
          Here's what's new across your library
        </p>
        ${i.map((r,a)=>o`
            <section class="row anim-rise" style="animation-delay:${80+a*70}ms;">
              <div class="row-head">
                <span class="material-symbols-rounded" style="font-size:22px; color:var(--oppai-primary-bright);"
                  >${r.icon}</span
                >
                <h3 class="row-title">${r.label}</h3>
                <button class="see-all" @click=${()=>this.selectSection(r.kind)}>
                  See all
                  <span class="material-symbols-rounded" style="font-size:16px;">chevron_right</span>
                </button>
              </div>
              <div class="row-scroll">
                ${r.items.map(s=>this.renderTile(s,"200px",void 0,r.items))}
              </div>
            </section>
          `)}
      </div>
    `}renderGrid(t,e,i){var p;let r="",a=[],s=[];if(e)r="Favorites",a=this.items.filter(h=>this.favorites.has(h.id));else if(i){r="Search results";const h=this.search.trim().toLowerCase().split(/\s+/).filter(Boolean);a=this.items.filter(f=>js(f,h))}else{const h=this.section;r=((p=H[h])==null?void 0:p.label)??"";const f=this.itemsForKind(h),v=Array.from(new Set(f.flatMap(g=>(g.tags??[]).map(z=>z.name)))).slice(0,8),u=this.filters[h]??"All";s=["All",...v].map(g=>({label:g,active:u===g})),a=u==="All"?f:f.filter(g=>(g.tags??[]).some(z=>z.name===u))}const n=`${a.length} ${a.length===1?"item":"items"}`;return o`
      <div>
        <div class="grid-head">
          <h2 class="grid-title">${r}</h2>
          <span class="grid-count">${n}</span>
        </div>

        ${t&&s.length>1?o`<div class="chips">
              ${s.map(h=>o`<button
                  class="chip"
                  @click=${()=>this.setFilter(this.section,h.label)}
                  style="background:${h.active?"var(--oppai-accent)":"transparent"}; color:${h.active?"var(--oppai-on-accent)":"var(--oppai-text-dim)"}; border:1px solid ${h.active?"var(--oppai-accent)":"var(--oppai-border-strong)"};"
                >
                  ${h.active?o`<span class="material-symbols-rounded" style="font-size:16px;">check</span>`:l}
                  ${h.label}
                </button>`)}
            </div>`:o`<div style="height:24px;"></div>`}

        ${a.length===0?o`<div class="empty">
              <span class="material-symbols-rounded" style="font-size:40px; display:block; margin-bottom:12px;"
                >${e?"favorite_border":"search_off"}</span
              >
              <div style="font-size:14px;">
                ${e?"No favorites yet. Tap the heart on any item.":"No items match your search or filter."}
              </div>
            </div>`:o`<div class="grid">
              ${a.map((h,f)=>this.renderTile(h,"100%",f,a))}
            </div>`}
      </div>
    `}renderTile(t,e,i,r){const a=H[t.kind],s=this.favorites.has(t.id),n=Er(t),p=i!=null?"anim-rise":"",h=i!=null?`animation-delay:${Math.min(i,12)*45}ms;`:"",f=this.selected.has(t.id),v=`tile ${p} ${this.selectMode?"selecting":""} ${f?"selected":""}`;return o`
      <div
        class=${v}
        @click=${()=>this.selectMode?this.toggleSelected(t.id):this.openItem(t.id,r)}
        style="flex-shrink:0; width:${e}; ${h}"
      >
        <div
          class="tile-media"
          style="width:100%; aspect-ratio:${a.aspect}; background:${Se(t)};"
        >
          ${ds(t)?o`<img loading="lazy" src=${b.thumbURL(t.id)} alt=${t.title} />`:o`<div class="tile-overlay">
                <span class="material-symbols-rounded" style="font-size:30px; color:#fff;"
                  >${a.icon}</span
                >
                <span class="type-label">${a.typeLabel}</span>
              </div>`}
          ${this.selectMode?o`<div class="select-check ${f?"on":""}">
                ${f?o`<span class="material-symbols-rounded">check</span>`:l}
              </div>`:o`<button
                class="fav-btn ${s?"is-fav":""}"
                @click=${u=>this.toggleFavorite(t.id,u)}
              >
                <span
                  class="material-symbols-rounded fill-icon"
                  style="font-size:18px; color:${s?"var(--oppai-fav)":"rgba(255,255,255,0.9)"};"
                  >${s?"favorite":"favorite_border"}</span
                >
              </button>`}
          ${n?o`<span class="tile-stat">${n}</span>`:l}
        </div>
        <div class="tile-meta">
          <div class="tile-title">${t.title}</div>
          <div class="tile-tag">${cs(t)}</div>
        </div>
      </div>
    `}renderUpload(){return this.uploadOpen?o`
      <div class="scrim" @click=${this.toggleUpload}>
        <div class="dialog" @click=${t=>t.stopPropagation()}>
          <h2>Upload media</h2>
          <div
            class="dropzone ${this.dragActive?"drag":""}"
            @click=${this.browse}
            @dragover=${t=>{t.preventDefault(),this.dragActive=!0}}
            @dragleave=${()=>this.dragActive=!1}
            @drop=${this.onDrop}
          >
            <span class="material-symbols-rounded" style="font-size:36px; display:block; margin-bottom:10px;"
              >upload_file</span
            >
            <div style="font-size:14px;">Drag files here, or click to browse</div>
            <div style="font-size:12px; color:var(--oppai-text-muted); margin-top:4px;">
              Photos, GIFs, videos, games, comics
            </div>
          </div>
          <button class="link-btn" @click=${this.openScrape}>or import from a URL</button>
          <div class="dialog-actions">
            <button class="btn-text" @click=${this.toggleUpload}>Cancel</button>
            <button class="btn-filled" @click=${this.browse}>Choose files</button>
          </div>
        </div>
      </div>
    `:l}};R.styles=[me,ee,y`
      :host {
        display: flex;
        width: 100vw;
        height: 100vh;
        background: var(--oppai-bg);
        color: var(--oppai-text);
        overflow: hidden;
        position: relative;
        font-family: "Roboto", system-ui, sans-serif;
      }
      button {
        font-family: inherit;
      }
      input::placeholder {
        color: var(--oppai-text-muted);
      }

      /* Nav rail */
      nav {
        width: 96px;
        flex-shrink: 0;
        height: 100%;
        background: var(--oppai-nav);
        border-right: 1px solid var(--oppai-surface-2);
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px 0 16px;
        gap: 20px;
      }
      /* The mark, inlined so it takes currentColor and follows the theme. */
      .logo {
        width: 44px;
        height: 44px;
        padding: 0;
        border: none;
        background: none;
        cursor: pointer;
        color: var(--oppai-primary);
        transition: transform 0.22s var(--oppai-ease-spring), color 0.2s ease;
      }
      .logo:hover {
        transform: scale(1.08);
        color: var(--oppai-primary-bright);
      }
      .logo svg {
        width: 100%;
        height: 100%;
        display: block;
      }
      .add-btn {
        width: 56px;
        height: 56px;
        border-radius: 16px;
        background: var(--oppai-primary-container);
        border: none;
        color: var(--oppai-primary-bright);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
        transition: transform 0.2s var(--oppai-ease-spring), filter 0.15s ease,
          box-shadow 0.2s ease;
      }
      .add-btn:hover {
        filter: brightness(1.1);
        transform: translateY(-2px) rotate(90deg);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.45);
      }
      .add-btn:active {
        transform: scale(0.94) rotate(90deg);
      }
      .add-btn span {
        transition: transform 0.2s var(--oppai-ease-spring);
      }
      .nav-list {
        display: flex;
        flex-direction: column;
        gap: 6px;
        width: 100%;
        align-items: center;
      }
      .nav-item {
        background: none;
        border: none;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        padding: 0;
        width: 64px;
      }
      .nav-pill {
        width: 56px;
        height: 32px;
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.22s var(--oppai-ease-emphasized),
          transform 0.22s var(--oppai-ease-spring);
      }
      .nav-item:hover .nav-pill {
        background: var(--oppai-nav-hover);
      }
      .nav-item:active .nav-pill {
        transform: scale(0.9);
      }
      .nav-pill span {
        transition: color 0.2s ease;
      }
      .nav-label {
        transition: color 0.2s ease;
      }
      .nav-label {
        font-size: 11px;
        font-weight: 500;
        letter-spacing: 0.2px;
      }
      .icon-btn {
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }

      /* Layout */
      .main-col {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        height: 100%;
      }
      header {
        height: 72px;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 0 28px;
        border-bottom: 1px solid var(--oppai-border);
      }
      .h-title {
        font-size: 20px;
        font-weight: 500;
        margin: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 280px;
        flex-shrink: 0;
      }
      .searchbox {
        flex: 1;
        max-width: 520px;
        height: 44px;
        background: var(--oppai-surface-2);
        border-radius: 22px;
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 0 16px;
      }
      .searchbox input {
        flex: 1;
        background: none;
        border: none;
        outline: none;
        color: var(--oppai-text);
        font-size: 14px;
      }
      .filters-btn {
        background: none;
        border: 1px solid var(--oppai-border-strong);
        border-radius: 20px;
        height: 40px;
        padding: 0 14px;
        display: flex;
        align-items: center;
        gap: 6px;
        color: var(--oppai-text-dim);
        cursor: pointer;
        flex-shrink: 0;
      }
      main {
        flex: 1;
        overflow-y: auto;
        padding: 28px 32px 60px;
      }

      /* Home */
      .greeting {
        font-size: 28px;
        font-weight: 400;
        margin: 0 0 4px;
      }
      .greeting-sub {
        font-size: 14px;
        color: var(--oppai-text-dim);
        margin: 0 0 32px;
      }
      .row {
        margin-bottom: 36px;
      }
      .row-head {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 14px;
      }
      .row-title {
        font-size: 18px;
        font-weight: 500;
        margin: 0;
        flex: 1;
      }
      .see-all {
        background: none;
        border: none;
        color: var(--oppai-primary-bright);
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 2px;
      }
      .row-scroll {
        display: flex;
        gap: 16px;
        overflow-x: auto;
        padding-bottom: 8px;
      }

      /* Grid */
      .grid-head {
        display: flex;
        align-items: baseline;
        gap: 12px;
        margin-bottom: 6px;
      }
      .grid-title {
        font-size: 26px;
        font-weight: 400;
        margin: 0;
      }
      .grid-count {
        font-size: 13px;
        color: var(--oppai-text-muted);
      }
      .chips {
        display: flex;
        gap: 8px;
        margin: 18px 0 24px;
        flex-wrap: wrap;
      }
      .chip {
        height: 36px;
        padding: 0 16px;
        border-radius: 18px;
        font-size: 13px;
        font-weight: 500;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 22px;
      }
      .empty {
        text-align: center;
        padding: 80px 0;
        color: var(--oppai-text-muted);
      }

      /* Tiles */
      .tile {
        cursor: pointer;
      }
      .tile-media {
        position: relative;
        border-radius: 16px;
        overflow: hidden;
        transition: transform 0.28s var(--oppai-ease-emphasized),
          box-shadow 0.28s var(--oppai-ease-emphasized);
        will-change: transform;
      }
      .tile:hover .tile-media {
        transform: translateY(-4px) scale(1.02);
        box-shadow: 0 12px 28px rgba(0, 0, 0, 0.4);
      }
      .tile:active .tile-media {
        transform: translateY(-1px) scale(0.99);
      }
      .tile-media img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.4s var(--oppai-ease-emphasized);
      }
      .tile:hover .tile-media img {
        transform: scale(1.06);
      }
      .tile-overlay {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 6px;
        opacity: 0.55;
      }
      .type-label {
        font: 600 10px ui-monospace, monospace;
        color: #fff;
        letter-spacing: 1px;
      }
      .fav-btn {
        position: absolute;
        top: 8px;
        right: 8px;
        width: 32px;
        height: 32px;
        border-radius: 16px;
        background: rgba(0, 0, 0, 0.4);
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        opacity: 0;
        transform: scale(0.8);
        transition: opacity 0.2s ease, transform 0.2s var(--oppai-ease-spring),
          background 0.2s ease;
        backdrop-filter: blur(2px);
      }
      .tile:hover .fav-btn,
      .fav-btn.is-fav {
        opacity: 1;
        transform: scale(1);
      }
      .fav-btn:hover {
        background: rgba(0, 0, 0, 0.6);
      }
      .fav-btn:active .material-symbols-rounded {
        animation: oppai-pop 0.35s var(--oppai-ease-spring);
      }
      .tile-stat {
        position: absolute;
        bottom: 6px;
        right: 8px;
        font-size: 11px;
        font-weight: 600;
        color: #fff;
        background: rgba(0, 0, 0, 0.5);
        padding: 2px 6px;
        border-radius: 6px;
      }
      .tile-meta {
        padding: 10px 2px 0;
      }
      .tile-title {
        font-size: 13px;
        font-weight: 500;
        color: var(--oppai-text);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .tile-tag {
        font-size: 12px;
        color: var(--oppai-text-muted);
        margin-top: 2px;
      }

      /* Upload dialog */
      .scrim {
        position: absolute;
        inset: 0;
        background: var(--oppai-scrim);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 20;
        animation: oppai-fade-in 0.2s var(--oppai-ease-standard) both;
      }
      .dialog {
        width: 480px;
        max-width: calc(100vw - 32px);
        background: var(--oppai-surface-2);
        border-radius: 28px;
        padding: 28px;
        box-shadow: 0 16px 48px rgba(0, 0, 0, 0.5);
        animation: oppai-scale-in 0.32s var(--oppai-ease-spring) both;
      }
      .dialog h2 {
        font-size: 20px;
        font-weight: 500;
        margin: 0 0 20px;
      }
      .dropzone {
        border: 1.5px dashed var(--oppai-border-strong);
        border-radius: 16px;
        padding: 40px 20px;
        text-align: center;
        color: var(--oppai-text-dim);
        cursor: pointer;
        transition: border-color 0.12s ease, background 0.12s ease;
      }
      .dropzone.drag {
        border-color: var(--oppai-primary);
        background: color-mix(in srgb, var(--oppai-primary) 12%, transparent);
      }
      .dialog-actions {
        display: flex;
        justify-content: flex-end;
        gap: 8px;
        margin-top: 24px;
      }
      .btn-text {
        height: 40px;
        padding: 0 20px;
        border-radius: 20px;
        background: none;
        border: none;
        color: var(--oppai-primary-bright);
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
      }
      .btn-filled {
        height: 40px;
        padding: 0 20px;
        border-radius: 20px;
        background: var(--oppai-primary);
        border: none;
        color: var(--oppai-on-primary);
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
      }
      .link-btn {
        display: block;
        margin: 14px auto 0;
        background: none;
        border: none;
        color: var(--oppai-primary-bright);
        font-size: 13px;
        cursor: pointer;
      }
      input[type="file"] {
        display: none;
      }

      /* Selection mode */
      .tile.selecting .tile-media {
        transform: none;
      }
      .tile.selected .tile-media {
        outline: 3px solid var(--oppai-primary);
        outline-offset: 2px;
      }
      .select-check {
        position: absolute;
        top: 8px;
        left: 8px;
        width: 26px;
        height: 26px;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.5);
        border: 2px solid #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2;
        backdrop-filter: blur(2px);
      }
      .select-check.on {
        background: var(--oppai-primary);
        border-color: var(--oppai-primary);
      }
      .select-check .material-symbols-rounded {
        font-size: 18px;
        color: #fff;
      }
      .bulk-bar {
        position: absolute;
        left: 50%;
        bottom: 24px;
        transform: translateX(-50%);
        z-index: 25;
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 12px 10px 18px;
        border-radius: 28px;
        background: var(--oppai-surface-2);
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
        animation: oppai-scale-in 0.28s var(--oppai-ease-spring) both;
      }
      .bulk-count {
        font-size: 14px;
        font-weight: 600;
        margin-right: 6px;
        white-space: nowrap;
      }
      .bulk-btn {
        height: 40px;
        padding: 0 14px;
        border-radius: 20px;
        background: none;
        border: none;
        color: var(--oppai-text);
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .bulk-btn:hover {
        background: var(--oppai-surface);
      }
      .bulk-btn.danger {
        color: var(--oppai-error, #f2b8b5);
      }
      .bulk-btn[disabled] {
        opacity: 0.5;
        cursor: default;
      }
      .download-area {
        position: absolute; right: 22px; bottom: 86px; z-index: 24;
        width: min(360px, calc(100vw - 44px)); padding: 12px;
        border: 1px solid var(--oppai-border); border-radius: 18px;
        background: color-mix(in srgb, var(--oppai-surface-2) 94%, transparent);
        box-shadow: 0 14px 44px rgba(0, 0, 0, .48); backdrop-filter: blur(16px);
        animation: oppai-scale-in .24s var(--oppai-ease-spring) both;
      }
      .download-heading { font-size: 12px; font-weight: 700; opacity: .72; padding: 0 4px 7px; }
      .download-row { display: flex; align-items: center; gap: 11px; min-height: 48px; padding: 5px 4px; }
      .download-row + .download-row { border-top: 1px solid var(--oppai-border); }
      .download-ring {
        width: 36px; height: 36px; flex: 0 0 36px; border-radius: 50%;
        display: grid; place-items: center; color: var(--oppai-primary-bright);
        background: conic-gradient(var(--oppai-primary) calc(var(--p) * 1turn), var(--oppai-border) 0);
        transition: background .8s linear; position: relative;
      }
      .download-ring::before { content: ""; position: absolute; inset: 3px; border-radius: 50%; background: var(--oppai-surface-2); }
      .download-ring span { position: relative; z-index: 1; font-size: 19px; }
      .download-copy { min-width: 0; flex: 1; }
      .download-title { font-size: 13px; font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .download-status { font-size: 11px; opacity: .68; margin-top: 2px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .download-dismiss { border: 0; background: none; color: inherit; opacity: .66; cursor: pointer; padding: 5px; }
      .header-toggle.on {
        background: var(--oppai-primary-container);
        color: var(--oppai-primary-bright);
        border-color: var(--oppai-primary);
      }
    `];j([m({attribute:!1})],R.prototype,"user",2);j([c()],R.prototype,"items",2);j([c()],R.prototype,"loading",2);j([c()],R.prototype,"section",2);j([c()],R.prototype,"selectedId",2);j([c()],R.prototype,"search",2);j([c()],R.prototype,"filters",2);j([c()],R.prototype,"favorites",2);j([c()],R.prototype,"uploadOpen",2);j([c()],R.prototype,"dragActive",2);j([c()],R.prototype,"selectMode",2);j([c()],R.prototype,"selected",2);j([c()],R.prototype,"busy",2);j([c()],R.prototype,"downloads",2);R=j([C("oppai-library")],R);var Hs=Object.defineProperty,qs=Object.getOwnPropertyDescriptor,We=(t,e,i,r)=>{for(var a=r>1?void 0:r?qs(e,i):e,s=t.length-1,n;s>=0;s--)(n=t[s])&&(a=(r?n(e,i,a):n(a))||a);return r&&a&&Hs(e,i,a),a};const Vs=6e4;let _e=class extends k{constructor(){super(...arguments),this.user=null,this.ready=!1,this.mascotMessage="",this.mascotTone="success",this.onMascot=t=>{t.detail.tone==="error"&&(this.mascotMessage=t.detail.message,this.mascotTone=t.detail.tone,this.mascotTimer&&clearTimeout(this.mascotTimer),this.mascotTimer=window.setTimeout(()=>this.mascotMessage="",5e3))},this.onLibbyPref=()=>this.requestUpdate(),this.onLogout=()=>{this.user=null,this.stopProbe()},this.onVisible=()=>{document.visibilityState==="visible"&&this.user&&this.probe()}}connectedCallback(){super.connectedCallback(),window.addEventListener("oppai-logout",this.onLogout),window.addEventListener("oppai-mascot",this.onMascot),window.addEventListener("oppai-libby-pref",this.onLibbyPref),document.addEventListener("visibilitychange",this.onVisible),this.bootstrap()}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("oppai-logout",this.onLogout),window.removeEventListener("oppai-mascot",this.onMascot),window.removeEventListener("oppai-libby-pref",this.onLibbyPref),document.removeEventListener("visibilitychange",this.onVisible),this.stopProbe(),this.mascotTimer&&clearTimeout(this.mascotTimer)}async bootstrap(){if(di())try{this.user=await b.me(),this.startProbe()}catch{ut(null)}this.ready=!0}async probe(){if(di())try{await b.me()}catch{}}startProbe(){this.stopProbe(),this.probeTimer=window.setInterval(()=>void this.probe(),Vs)}stopProbe(){this.probeTimer&&(clearInterval(this.probeTimer),this.probeTimer=void 0)}onLoggedIn(t){this.mascotMessage="",this.user=t.detail,this.startProbe()}async logout(){try{await b.logout()}catch{}ut(null),this.user=null,this.stopProbe()}render(){const t=bt(),e=this.mascotMessage?o`<div class="mascot-talk ${this.mascotTone} ${t?"plain":""}">
          <div class="speech" role=${this.mascotTone==="error"?"alert":"status"}>
            ${t?null:o`<span class="libby-name">LIBBY · 😟</span>`}${this.mascotMessage}
          </div>
          ${t?null:o`<img src=${zr("neutral")} alt="Libby"
                @error=${i=>{const r=i.target;r.src.endsWith("/mascot.png")||(r.src="/mascot.png")}} />`}
        </div>`:null;return this.ready?this.user?o`<oppai-library
      .user=${this.user}
      @logout=${this.logout}
    ></oppai-library>${e}`:o`<oppai-login @logged-in=${this.onLoggedIn}></oppai-login>`:o`<div class="center"><md-circular-progress indeterminate></md-circular-progress></div>${e}`}};_e.styles=y`
    :host { display: block; min-height: 100vh; }
    .center { display: grid; place-items: center; height: 100vh; }
    .mascot-talk {
      position: fixed;
      right: 18px;
      bottom: 0;
      z-index: 200;
      display: flex;
      align-items: flex-end;
      pointer-events: none;
      animation: pop-in 0.3s ease-out both;
    }
    .mascot-talk img {
      width: min(210px, 34vw);
      max-height: 38vh;
      object-fit: contain;
      object-position: bottom;
      transform-origin: 55% 100%;
      animation: libby-talk .34s ease-in-out infinite alternate;
    }
    .speech {
      max-width: min(300px, 58vw);
      margin: 0 -18px 120px 0;
      padding: 12px 16px;
      border-radius: 18px 18px 4px 18px;
      background: var(--md-sys-color-surface-container-high);
      color: var(--md-sys-color-on-surface);
      border: 1px solid var(--md-sys-color-outline-variant);
      box-shadow: 0 8px 28px rgba(0,0,0,.35);
      font: 500 14px/1.4 Roboto, system-ui, sans-serif;
    }
    .mascot-talk.error .speech { border-color: var(--md-sys-color-error); }
    /* Libby hidden: the bubble alone, tucked to the corner without the mascot's footprint. */
    .mascot-talk.plain .speech { margin: 0 0 18px 0; }
    .libby-name { display: block; color: var(--md-sys-color-error); font-size: 11px; font-weight: 700; }
    @keyframes pop-in { from { opacity: 0; transform: translateY(24px) scale(.94); } }
    @keyframes libby-talk { from { transform: rotate(-.5deg); } to { transform: translateY(-5px) rotate(.65deg); } }
    @media (max-width: 600px) {
      .mascot-talk img { width: 150px; }
      .speech { margin-bottom: 100px; }
    }
  `;We([c()],_e.prototype,"user",2);We([c()],_e.prototype,"ready",2);We([c()],_e.prototype,"mascotMessage",2);We([c()],_e.prototype,"mascotTone",2);_e=We([C("oppai-app")],_e);const Fr=document.createElement("style");Fr.textContent=es;document.head.appendChild(Fr);document.adoptedStyleSheets=[...document.adoptedStyleSheets,Qo.styleSheet];ki($i());is();
