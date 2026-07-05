(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function t(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(i){if(i.ep)return;i.ep=!0;const a=t(i);fetch(i.href,a)}})();function l(r,e,t,o){var i=arguments.length,a=i<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,t):o,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")a=Reflect.decorate(r,e,t,o);else for(var n=r.length-1;n>=0;n--)(s=r[n])&&(a=(i<3?s(a):i>3?s(e,t,a):s(e,t))||a);return i>3&&a&&Object.defineProperty(e,t,a),a}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const _=r=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(r,e)}):customElements.define(r,e)};/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Be=globalThis,Bt=Be.ShadowRoot&&(Be.ShadyCSS===void 0||Be.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ut=Symbol(),er=new WeakMap;let wr=class{constructor(e,t,o){if(this._$cssResult$=!0,o!==Ut)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(Bt&&e===void 0){const o=t!==void 0&&t.length===1;o&&(e=er.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),o&&er.set(t,e))}return e}toString(){return this.cssText}};const eo=r=>new wr(typeof r=="string"?r:r+"",void 0,Ut),m=(r,...e)=>{const t=r.length===1?r[0]:e.reduce((o,i,a)=>o+(s=>{if(s._$cssResult$===!0)return s.cssText;if(typeof s=="number")return s;throw Error("Value passed to 'css' function must be a 'css' function result: "+s+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[a+1],r[0]);return new wr(t,r,Ut)},to=(r,e)=>{if(Bt)r.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const o=document.createElement("style"),i=Be.litNonce;i!==void 0&&o.setAttribute("nonce",i),o.textContent=t.cssText,r.appendChild(o)}},tr=Bt?r=>r:r=>r instanceof CSSStyleSheet?(e=>{let t="";for(const o of e.cssRules)t+=o.cssText;return eo(t)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:ro,defineProperty:oo,getOwnPropertyDescriptor:io,getOwnPropertyNames:ao,getOwnPropertySymbols:so,getPrototypeOf:lo}=Object,Y=globalThis,rr=Y.trustedTypes,no=rr?rr.emptyScript:"",Xe=Y.reactiveElementPolyfillSupport,be=(r,e)=>r,Ve={toAttribute(r,e){switch(e){case Boolean:r=r?no:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,e){let t=r;switch(e){case Boolean:t=r!==null;break;case Number:t=r===null?null:Number(r);break;case Object:case Array:try{t=JSON.parse(r)}catch{t=null}}return t}},Ht=(r,e)=>!ro(r,e),or={attribute:!0,type:String,converter:Ve,reflect:!1,useDefault:!1,hasChanged:Ht};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),Y.litPropertyMetadata??(Y.litPropertyMetadata=new WeakMap);let de=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=or){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const o=Symbol(),i=this.getPropertyDescriptor(e,o,t);i!==void 0&&oo(this.prototype,e,i)}}static getPropertyDescriptor(e,t,o){const{get:i,set:a}=io(this.prototype,e)??{get(){return this[t]},set(s){this[t]=s}};return{get:i,set(s){const n=i==null?void 0:i.call(this);a==null||a.call(this,s),this.requestUpdate(e,n,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??or}static _$Ei(){if(this.hasOwnProperty(be("elementProperties")))return;const e=lo(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(be("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(be("properties"))){const t=this.properties,o=[...ao(t),...so(t)];for(const i of o)this.createProperty(i,t[i])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[o,i]of t)this.elementProperties.set(o,i)}this._$Eh=new Map;for(const[t,o]of this.elementProperties){const i=this._$Eu(t,o);i!==void 0&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const o=new Set(e.flat(1/0).reverse());for(const i of o)t.unshift(tr(i))}else e!==void 0&&t.push(tr(e));return t}static _$Eu(e,t){const o=t.attribute;return o===!1?void 0:typeof o=="string"?o:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const o of t.keys())this.hasOwnProperty(o)&&(e.set(o,this[o]),delete this[o]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return to(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var o;return(o=t.hostConnected)==null?void 0:o.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var o;return(o=t.hostDisconnected)==null?void 0:o.call(t)})}attributeChangedCallback(e,t,o){this._$AK(e,o)}_$ET(e,t){var a;const o=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,o);if(i!==void 0&&o.reflect===!0){const s=(((a=o.converter)==null?void 0:a.toAttribute)!==void 0?o.converter:Ve).toAttribute(t,o.type);this._$Em=e,s==null?this.removeAttribute(i):this.setAttribute(i,s),this._$Em=null}}_$AK(e,t){var a,s;const o=this.constructor,i=o._$Eh.get(e);if(i!==void 0&&this._$Em!==i){const n=o.getPropertyOptions(i),c=typeof n.converter=="function"?{fromAttribute:n.converter}:((a=n.converter)==null?void 0:a.fromAttribute)!==void 0?n.converter:Ve;this._$Em=i;const u=c.fromAttribute(t,n.type);this[i]=u??((s=this._$Ej)==null?void 0:s.get(i))??u,this._$Em=null}}requestUpdate(e,t,o,i=!1,a){var s;if(e!==void 0){const n=this.constructor;if(i===!1&&(a=this[e]),o??(o=n.getPropertyOptions(e)),!((o.hasChanged??Ht)(a,t)||o.useDefault&&o.reflect&&a===((s=this._$Ej)==null?void 0:s.get(e))&&!this.hasAttribute(n._$Eu(e,o))))return;this.C(e,t,o)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:o,reflect:i,wrapped:a},s){o&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,s??t??this[e]),a!==!0||s!==void 0)||(this._$AL.has(e)||(this.hasUpdated||o||(t=void 0),this._$AL.set(e,t)),i===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var o;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[a,s]of this._$Ep)this[a]=s;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[a,s]of i){const{wrapped:n}=s,c=this[a];n!==!0||this._$AL.has(a)||c===void 0||this.C(a,void 0,s,c)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(o=this._$EO)==null||o.forEach(i=>{var a;return(a=i.hostUpdate)==null?void 0:a.call(i)}),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(o=>{var i;return(i=o.hostUpdated)==null?void 0:i.call(o)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};de.elementStyles=[],de.shadowRootOptions={mode:"open"},de[be("elementProperties")]=new Map,de[be("finalized")]=new Map,Xe==null||Xe({ReactiveElement:de}),(Y.reactiveElementVersions??(Y.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const co={attribute:!0,type:String,converter:Ve,reflect:!1,hasChanged:Ht},po=(r=co,e,t)=>{const{kind:o,metadata:i}=t;let a=globalThis.litPropertyMetadata.get(i);if(a===void 0&&globalThis.litPropertyMetadata.set(i,a=new Map),o==="setter"&&((r=Object.create(r)).wrapped=!0),a.set(t.name,r),o==="accessor"){const{name:s}=t;return{set(n){const c=e.get.call(this);e.set.call(this,n),this.requestUpdate(s,c,r,!0,n)},init(n){return n!==void 0&&this.C(s,void 0,r,n),n}}}if(o==="setter"){const{name:s}=t;return function(n){const c=this[s];e.call(this,n),this.requestUpdate(s,c,r,!0,n)}}throw Error("Unsupported decorator location: "+o)};function p(r){return(e,t)=>typeof t=="object"?po(r,e,t):((o,i,a)=>{const s=i.hasOwnProperty(a);return i.constructor.createProperty(a,o),s?Object.getOwnPropertyDescriptor(i,a):void 0})(r,e,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function g(r){return p({...r,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ke=(r,e,t)=>(t.configurable=!0,t.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(r,e,t),t);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function $(r,e){return(t,o,i)=>{const a=s=>{var n;return((n=s.renderRoot)==null?void 0:n.querySelector(r))??null};return Ke(t,o,{get(){return a(this)}})}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let ho;function uo(r){return(e,t)=>Ke(e,t,{get(){return(this.renderRoot??ho??(ho=document.createDocumentFragment())).querySelectorAll(r)}})}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Z(r){return(e,t)=>{const{slot:o,selector:i}=r??{},a="slot"+(o?`[name=${o}]`:":not([name])");return Ke(e,t,{get(){var c;const s=(c=this.renderRoot)==null?void 0:c.querySelector(a),n=(s==null?void 0:s.assignedElements(r))??[];return i===void 0?n:n.filter(u=>u.matches(i))}})}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function vo(r){return(e,t)=>{const{slot:o}=r??{},i="slot"+(o?`[name=${o}]`:":not([name])");return Ke(e,t,{get(){var s;const a=(s=this.renderRoot)==null?void 0:s.querySelector(i);return(a==null?void 0:a.assignedNodes(r))??[]}})}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ge=globalThis,ir=r=>r,je=ge.trustedTypes,ar=je?je.createPolicy("lit-html",{createHTML:r=>r}):void 0,$r="$lit$",W=`lit$${Math.random().toFixed(9).slice(2)}$`,Cr="?"+W,fo=`<${Cr}>`,ie=document,ye=()=>ie.createComment(""),xe=r=>r===null||typeof r!="object"&&typeof r!="function",Vt=Array.isArray,mo=r=>Vt(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",Je=`[ 	
\f\r]`,ve=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,sr=/-->/g,lr=/>/g,te=RegExp(`>|${Je}(?:([^\\s"'>=/]+)(${Je}*=${Je}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),nr=/'/g,dr=/"/g,Ar=/^(?:script|style|textarea|title)$/i,bo=r=>(e,...t)=>({_$litType$:r,strings:e,values:t}),d=bo(1),R=Symbol.for("lit-noChange"),h=Symbol.for("lit-nothing"),cr=new WeakMap,re=ie.createTreeWalker(ie,129);function kr(r,e){if(!Vt(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return ar!==void 0?ar.createHTML(e):e}const go=(r,e)=>{const t=r.length-1,o=[];let i,a=e===2?"<svg>":e===3?"<math>":"",s=ve;for(let n=0;n<t;n++){const c=r[n];let u,f,v=-1,b=0;for(;b<c.length&&(s.lastIndex=b,f=s.exec(c),f!==null);)b=s.lastIndex,s===ve?f[1]==="!--"?s=sr:f[1]!==void 0?s=lr:f[2]!==void 0?(Ar.test(f[2])&&(i=RegExp("</"+f[2],"g")),s=te):f[3]!==void 0&&(s=te):s===te?f[0]===">"?(s=i??ve,v=-1):f[1]===void 0?v=-2:(v=s.lastIndex-f[2].length,u=f[1],s=f[3]===void 0?te:f[3]==='"'?dr:nr):s===dr||s===nr?s=te:s===sr||s===lr?s=ve:(s=te,i=void 0);const w=s===te&&r[n+1].startsWith("/>")?" ":"";a+=s===ve?c+fo:v>=0?(o.push(u),c.slice(0,v)+$r+c.slice(v)+W+w):c+W+(v===-2?n:w)}return[kr(r,a+(r[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),o]};class _e{constructor({strings:e,_$litType$:t},o){let i;this.parts=[];let a=0,s=0;const n=e.length-1,c=this.parts,[u,f]=go(e,t);if(this.el=_e.createElement(u,o),re.currentNode=this.el.content,t===2||t===3){const v=this.el.content.firstChild;v.replaceWith(...v.childNodes)}for(;(i=re.nextNode())!==null&&c.length<n;){if(i.nodeType===1){if(i.hasAttributes())for(const v of i.getAttributeNames())if(v.endsWith($r)){const b=f[s++],w=i.getAttribute(v).split(W),F=/([.?@])?(.*)/.exec(b);c.push({type:1,index:a,name:F[2],strings:w,ctor:F[1]==="."?xo:F[1]==="?"?_o:F[1]==="@"?wo:Ge}),i.removeAttribute(v)}else v.startsWith(W)&&(c.push({type:6,index:a}),i.removeAttribute(v));if(Ar.test(i.tagName)){const v=i.textContent.split(W),b=v.length-1;if(b>0){i.textContent=je?je.emptyScript:"";for(let w=0;w<b;w++)i.append(v[w],ye()),re.nextNode(),c.push({type:2,index:++a});i.append(v[b],ye())}}}else if(i.nodeType===8)if(i.data===Cr)c.push({type:2,index:a});else{let v=-1;for(;(v=i.data.indexOf(W,v+1))!==-1;)c.push({type:7,index:a}),v+=W.length-1}a++}}static createElement(e,t){const o=ie.createElement("template");return o.innerHTML=e,o}}function pe(r,e,t=r,o){var s,n;if(e===R)return e;let i=o!==void 0?(s=t._$Co)==null?void 0:s[o]:t._$Cl;const a=xe(e)?void 0:e._$litDirective$;return(i==null?void 0:i.constructor)!==a&&((n=i==null?void 0:i._$AO)==null||n.call(i,!1),a===void 0?i=void 0:(i=new a(r),i._$AT(r,t,o)),o!==void 0?(t._$Co??(t._$Co=[]))[o]=i:t._$Cl=i),i!==void 0&&(e=pe(r,i._$AS(r,e.values),i,o)),e}class yo{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:o}=this._$AD,i=((e==null?void 0:e.creationScope)??ie).importNode(t,!0);re.currentNode=i;let a=re.nextNode(),s=0,n=0,c=o[0];for(;c!==void 0;){if(s===c.index){let u;c.type===2?u=new $e(a,a.nextSibling,this,e):c.type===1?u=new c.ctor(a,c.name,c.strings,this,e):c.type===6&&(u=new $o(a,this,e)),this._$AV.push(u),c=o[++n]}s!==(c==null?void 0:c.index)&&(a=re.nextNode(),s++)}return re.currentNode=ie,i}p(e){let t=0;for(const o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(e,o,t),t+=o.strings.length-2):o._$AI(e[t])),t++}}class $e{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,o,i){this.type=2,this._$AH=h,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=o,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=pe(this,e,t),xe(e)?e===h||e==null||e===""?(this._$AH!==h&&this._$AR(),this._$AH=h):e!==this._$AH&&e!==R&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):mo(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==h&&xe(this._$AH)?this._$AA.nextSibling.data=e:this.T(ie.createTextNode(e)),this._$AH=e}$(e){var a;const{values:t,_$litType$:o}=e,i=typeof o=="number"?this._$AC(e):(o.el===void 0&&(o.el=_e.createElement(kr(o.h,o.h[0]),this.options)),o);if(((a=this._$AH)==null?void 0:a._$AD)===i)this._$AH.p(t);else{const s=new yo(i,this),n=s.u(this.options);s.p(t),this.T(n),this._$AH=s}}_$AC(e){let t=cr.get(e.strings);return t===void 0&&cr.set(e.strings,t=new _e(e)),t}k(e){Vt(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let o,i=0;for(const a of e)i===t.length?t.push(o=new $e(this.O(ye()),this.O(ye()),this,this.options)):o=t[i],o._$AI(a),i++;i<t.length&&(this._$AR(o&&o._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){var o;for((o=this._$AP)==null?void 0:o.call(this,!1,!0,t);e!==this._$AB;){const i=ir(e).nextSibling;ir(e).remove(),e=i}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class Ge{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,o,i,a){this.type=1,this._$AH=h,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=a,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=h}_$AI(e,t=this,o,i){const a=this.strings;let s=!1;if(a===void 0)e=pe(this,e,t,0),s=!xe(e)||e!==this._$AH&&e!==R,s&&(this._$AH=e);else{const n=e;let c,u;for(e=a[0],c=0;c<a.length-1;c++)u=pe(this,n[o+c],t,c),u===R&&(u=this._$AH[c]),s||(s=!xe(u)||u!==this._$AH[c]),u===h?e=h:e!==h&&(e+=(u??"")+a[c+1]),this._$AH[c]=u}s&&!i&&this.j(e)}j(e){e===h?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class xo extends Ge{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===h?void 0:e}}class _o extends Ge{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==h)}}class wo extends Ge{constructor(e,t,o,i,a){super(e,t,o,i,a),this.type=5}_$AI(e,t=this){if((e=pe(this,e,t,0)??h)===R)return;const o=this._$AH,i=e===h&&o!==h||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,a=e!==h&&(o===h||i);i&&this.element.removeEventListener(this.name,this,o),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class $o{constructor(e,t,o){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(e){pe(this,e)}}const Qe=ge.litHtmlPolyfillSupport;Qe==null||Qe(_e,$e),(ge.litHtmlVersions??(ge.litHtmlVersions=[])).push("3.3.3");const Er=(r,e,t)=>{const o=(t==null?void 0:t.renderBefore)??e;let i=o._$litPart$;if(i===void 0){const a=(t==null?void 0:t.renderBefore)??null;o._$litPart$=i=new $e(e.insertBefore(ye(),a),a,void 0,t??{})}return i._$AI(r),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const oe=globalThis;let x=class extends de{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Er(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return R}};var _r;x._$litElement$=!0,x.finalized=!0,(_r=oe.litElementHydrateSupport)==null||_r.call(oe,{LitElement:x});const et=oe.litElementPolyfillSupport;et==null||et({LitElement:x});(oe.litElementVersions??(oe.litElementVersions=[])).push("4.2.2");/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Co extends x{connectedCallback(){super.connectedCallback(),this.setAttribute("aria-hidden","true")}render(){return d`<span class="shadow"></span>`}}/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Ao=m`:host,.shadow,.shadow::before,.shadow::after{border-radius:inherit;inset:0;position:absolute;transition-duration:inherit;transition-property:inherit;transition-timing-function:inherit}:host{display:flex;pointer-events:none;transition-property:box-shadow,opacity}.shadow::before,.shadow::after{content:"";transition-property:box-shadow,opacity;--_level: var(--md-elevation-level, 0);--_shadow-color: var(--md-elevation-shadow-color, var(--md-sys-color-shadow, #000))}.shadow::before{box-shadow:0px calc(1px*(clamp(0,var(--_level),1) + clamp(0,var(--_level) - 3,1) + 2*clamp(0,var(--_level) - 4,1))) calc(1px*(2*clamp(0,var(--_level),1) + clamp(0,var(--_level) - 2,1) + clamp(0,var(--_level) - 4,1))) 0px var(--_shadow-color);opacity:.3}.shadow::after{box-shadow:0px calc(1px*(clamp(0,var(--_level),1) + clamp(0,var(--_level) - 1,1) + 2*clamp(0,var(--_level) - 2,3))) calc(1px*(3*clamp(0,var(--_level),2) + 2*clamp(0,var(--_level) - 2,3))) calc(1px*(clamp(0,var(--_level),4) + 2*clamp(0,var(--_level) - 4,1))) var(--_shadow-color);opacity:.15}
`;/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let nt=class extends Co{};nt.styles=[Ao];nt=l([_("md-elevation")],nt);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Ir=Symbol("attachableController");let Ue;Ue=new MutationObserver(r=>{var e;for(const t of r)(e=t.target[Ir])==null||e.hostConnected()});class zr{get htmlFor(){return this.host.getAttribute("for")}set htmlFor(e){e===null?this.host.removeAttribute("for"):this.host.setAttribute("for",e)}get control(){return this.host.hasAttribute("for")?!this.htmlFor||!this.host.isConnected?null:this.host.getRootNode().querySelector(`#${this.htmlFor}`):this.currentControl||this.host.parentElement}set control(e){e?this.attach(e):this.detach()}constructor(e,t){this.host=e,this.onControlChange=t,this.currentControl=null,e.addController(this),e[Ir]=this,Ue==null||Ue.observe(e,{attributeFilter:["for"]})}attach(e){e!==this.currentControl&&(this.setCurrentControl(e),this.host.removeAttribute("for"))}detach(){this.setCurrentControl(null),this.host.setAttribute("for","")}hostConnected(){this.setCurrentControl(this.control)}hostDisconnected(){this.setCurrentControl(null)}setCurrentControl(e){this.onControlChange(this.currentControl,e),this.currentControl=e}}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const ko=["focusin","focusout","pointerdown"];class jt extends x{constructor(){super(...arguments),this.visible=!1,this.inward=!1,this.attachableController=new zr(this,this.onControlChange.bind(this))}get htmlFor(){return this.attachableController.htmlFor}set htmlFor(e){this.attachableController.htmlFor=e}get control(){return this.attachableController.control}set control(e){this.attachableController.control=e}attach(e){this.attachableController.attach(e)}detach(){this.attachableController.detach()}connectedCallback(){super.connectedCallback(),this.setAttribute("aria-hidden","true")}handleEvent(e){var t;if(!e[pr]){switch(e.type){default:return;case"focusin":this.visible=((t=this.control)==null?void 0:t.matches(":focus-visible"))??!1;break;case"focusout":case"pointerdown":this.visible=!1;break}e[pr]=!0}}onControlChange(e,t){for(const o of ko)e==null||e.removeEventListener(o,this),t==null||t.addEventListener(o,this)}update(e){e.has("visible")&&this.dispatchEvent(new Event("visibility-changed")),super.update(e)}}l([p({type:Boolean,reflect:!0})],jt.prototype,"visible",void 0);l([p({type:Boolean,reflect:!0})],jt.prototype,"inward",void 0);const pr=Symbol("handledByFocusRing");/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Eo=m`:host{animation-delay:0s,calc(var(--md-focus-ring-duration, 600ms)*.25);animation-duration:calc(var(--md-focus-ring-duration, 600ms)*.25),calc(var(--md-focus-ring-duration, 600ms)*.75);animation-timing-function:cubic-bezier(0.2, 0, 0, 1);box-sizing:border-box;color:var(--md-focus-ring-color, var(--md-sys-color-secondary, #625b71));display:none;pointer-events:none;position:absolute}:host([visible]){display:flex}:host(:not([inward])){animation-name:outward-grow,outward-shrink;border-end-end-radius:calc(var(--md-focus-ring-shape-end-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));border-end-start-radius:calc(var(--md-focus-ring-shape-end-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));border-start-end-radius:calc(var(--md-focus-ring-shape-start-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));border-start-start-radius:calc(var(--md-focus-ring-shape-start-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));inset:calc(-1*var(--md-focus-ring-outward-offset, 2px));outline:var(--md-focus-ring-width, 3px) solid currentColor}:host([inward]){animation-name:inward-grow,inward-shrink;border-end-end-radius:calc(var(--md-focus-ring-shape-end-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border-end-start-radius:calc(var(--md-focus-ring-shape-end-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border-start-end-radius:calc(var(--md-focus-ring-shape-start-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border-start-start-radius:calc(var(--md-focus-ring-shape-start-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border:var(--md-focus-ring-width, 3px) solid currentColor;inset:var(--md-focus-ring-inward-offset, 0px)}@keyframes outward-grow{from{outline-width:0}to{outline-width:var(--md-focus-ring-active-width, 8px)}}@keyframes outward-shrink{from{outline-width:var(--md-focus-ring-active-width, 8px)}}@keyframes inward-grow{from{border-width:0}to{border-width:var(--md-focus-ring-active-width, 8px)}}@keyframes inward-shrink{from{border-width:var(--md-focus-ring-active-width, 8px)}}@media(prefers-reduced-motion){:host{animation:none}}
`;/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let dt=class extends jt{};dt.styles=[Eo];dt=l([_("md-focus-ring")],dt);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const G={ATTRIBUTE:1,PROPERTY:3,BOOLEAN_ATTRIBUTE:4},qt=r=>(...e)=>({_$litDirective$:r,values:e});let Kt=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,o){this._$Ct=e,this._$AM=t,this._$Ci=o}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const L=qt(class extends Kt{constructor(r){var e;if(super(r),r.type!==G.ATTRIBUTE||r.name!=="class"||((e=r.strings)==null?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(r){return" "+Object.keys(r).filter(e=>r[e]).join(" ")+" "}update(r,[e]){var o,i;if(this.st===void 0){this.st=new Set,r.strings!==void 0&&(this.nt=new Set(r.strings.join(" ").split(/\s/).filter(a=>a!=="")));for(const a in e)e[a]&&!((o=this.nt)!=null&&o.has(a))&&this.st.add(a);return this.render(e)}const t=r.element.classList;for(const a of this.st)a in e||(t.remove(a),this.st.delete(a));for(const a in e){const s=!!e[a];s===this.st.has(a)||(i=this.nt)!=null&&i.has(a)||(s?(t.add(a),this.st.add(a)):(t.remove(a),this.st.delete(a)))}return R}});/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const ae={STANDARD:"cubic-bezier(0.2, 0, 0, 1)",EMPHASIZED:"cubic-bezier(.3,0,0,1)",EMPHASIZED_ACCELERATE:"cubic-bezier(.3,0,.8,.15)"};/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Io=450,hr=225,zo=.2,To=10,So=75,Fo=.35,Ro="::after",Lo="forwards";var I;(function(r){r[r.INACTIVE=0]="INACTIVE",r[r.TOUCH_DELAY=1]="TOUCH_DELAY",r[r.HOLDING=2]="HOLDING",r[r.WAITING_FOR_CLICK=3]="WAITING_FOR_CLICK"})(I||(I={}));const Oo=["click","contextmenu","pointercancel","pointerdown","pointerenter","pointerleave","pointerup"],Po=150,tt=window.matchMedia("(forced-colors: active)");class Ce extends x{constructor(){super(...arguments),this.disabled=!1,this.hovered=!1,this.pressed=!1,this.rippleSize="",this.rippleScale="",this.initialSize=0,this.state=I.INACTIVE,this.attachableController=new zr(this,this.onControlChange.bind(this))}get htmlFor(){return this.attachableController.htmlFor}set htmlFor(e){this.attachableController.htmlFor=e}get control(){return this.attachableController.control}set control(e){this.attachableController.control=e}attach(e){this.attachableController.attach(e)}detach(){this.attachableController.detach()}connectedCallback(){super.connectedCallback(),this.setAttribute("aria-hidden","true")}render(){const e={hovered:this.hovered,pressed:this.pressed};return d`<div class="surface ${L(e)}"></div>`}update(e){e.has("disabled")&&this.disabled&&(this.hovered=!1,this.pressed=!1),super.update(e)}handlePointerenter(e){this.shouldReactToEvent(e)&&(this.hovered=!0)}handlePointerleave(e){this.shouldReactToEvent(e)&&(this.hovered=!1,this.state!==I.INACTIVE&&this.endPressAnimation())}handlePointerup(e){if(this.shouldReactToEvent(e)){if(this.state===I.HOLDING){this.state=I.WAITING_FOR_CLICK;return}if(this.state===I.TOUCH_DELAY){this.state=I.WAITING_FOR_CLICK,this.startPressAnimation(this.rippleStartEvent);return}}}async handlePointerdown(e){if(this.shouldReactToEvent(e)){if(this.rippleStartEvent=e,!this.isTouch(e)){this.state=I.WAITING_FOR_CLICK,this.startPressAnimation(e);return}this.state=I.TOUCH_DELAY,await new Promise(t=>{setTimeout(t,Po)}),this.state===I.TOUCH_DELAY&&(this.state=I.HOLDING,this.startPressAnimation(e))}}handleClick(){if(!this.disabled){if(this.state===I.WAITING_FOR_CLICK){this.endPressAnimation();return}this.state===I.INACTIVE&&(this.startPressAnimation(),this.endPressAnimation())}}handlePointercancel(e){this.shouldReactToEvent(e)&&this.endPressAnimation()}handleContextmenu(){this.disabled||this.endPressAnimation()}determineRippleSize(){const{height:e,width:t}=this.getBoundingClientRect(),o=Math.max(e,t),i=Math.max(Fo*o,So),a=this.currentCSSZoom??1,s=Math.floor(o*zo/a),c=Math.sqrt(t**2+e**2)+To;this.initialSize=s;const u=(c+i)/s;this.rippleScale=`${u/a}`,this.rippleSize=`${s}px`}getNormalizedPointerEventCoords(e){const{scrollX:t,scrollY:o}=window,{left:i,top:a}=this.getBoundingClientRect(),s=t+i,n=o+a,{pageX:c,pageY:u}=e,f=this.currentCSSZoom??1;return{x:(c-s)/f,y:(u-n)/f}}getTranslationCoordinates(e){const{height:t,width:o}=this.getBoundingClientRect(),i=this.currentCSSZoom??1,a={x:(o/i-this.initialSize)/2,y:(t/i-this.initialSize)/2};let s;return e instanceof PointerEvent?s=this.getNormalizedPointerEventCoords(e):s={x:o/i/2,y:t/i/2},s={x:s.x-this.initialSize/2,y:s.y-this.initialSize/2},{startPoint:s,endPoint:a}}startPressAnimation(e){var s;if(!this.mdRoot)return;this.pressed=!0,(s=this.growAnimation)==null||s.cancel(),this.determineRippleSize();const{startPoint:t,endPoint:o}=this.getTranslationCoordinates(e),i=`${t.x}px, ${t.y}px`,a=`${o.x}px, ${o.y}px`;this.growAnimation=this.mdRoot.animate({top:[0,0],left:[0,0],height:[this.rippleSize,this.rippleSize],width:[this.rippleSize,this.rippleSize],transform:[`translate(${i}) scale(1)`,`translate(${a}) scale(${this.rippleScale})`]},{pseudoElement:Ro,duration:Io,easing:ae.STANDARD,fill:Lo})}async endPressAnimation(){this.rippleStartEvent=void 0,this.state=I.INACTIVE;const e=this.growAnimation;let t=1/0;if(typeof(e==null?void 0:e.currentTime)=="number"?t=e.currentTime:e!=null&&e.currentTime&&(t=e.currentTime.to("ms").value),t>=hr){this.pressed=!1;return}await new Promise(o=>{setTimeout(o,hr-t)}),this.growAnimation===e&&(this.pressed=!1)}shouldReactToEvent(e){if(this.disabled||!e.isPrimary||this.rippleStartEvent&&this.rippleStartEvent.pointerId!==e.pointerId)return!1;if(e.type==="pointerenter"||e.type==="pointerleave")return!this.isTouch(e);const t=e.buttons===1;return this.isTouch(e)||t}isTouch({pointerType:e}){return e==="touch"}async handleEvent(e){if(!(tt!=null&&tt.matches))switch(e.type){case"click":this.handleClick();break;case"contextmenu":this.handleContextmenu();break;case"pointercancel":this.handlePointercancel(e);break;case"pointerdown":await this.handlePointerdown(e);break;case"pointerenter":this.handlePointerenter(e);break;case"pointerleave":this.handlePointerleave(e);break;case"pointerup":this.handlePointerup(e);break}}onControlChange(e,t){for(const o of Oo)e==null||e.removeEventListener(o,this),t==null||t.addEventListener(o,this)}}l([p({type:Boolean,reflect:!0})],Ce.prototype,"disabled",void 0);l([g()],Ce.prototype,"hovered",void 0);l([g()],Ce.prototype,"pressed",void 0);l([$(".surface")],Ce.prototype,"mdRoot",void 0);/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Do=m`:host{display:flex;margin:auto;pointer-events:none}:host([disabled]){display:none}@media(forced-colors: active){:host{display:none}}:host,.surface{border-radius:inherit;position:absolute;inset:0;overflow:hidden}.surface{-webkit-tap-highlight-color:rgba(0,0,0,0)}.surface::before,.surface::after{content:"";opacity:0;position:absolute}.surface::before{background-color:var(--md-ripple-hover-color, var(--md-sys-color-on-surface, #1d1b20));inset:0;transition:opacity 15ms linear,background-color 15ms linear}.surface::after{background:radial-gradient(closest-side, var(--md-ripple-pressed-color, var(--md-sys-color-on-surface, #1d1b20)) max(100% - 70px, 65%), transparent 100%);transform-origin:center center;transition:opacity 375ms linear}.hovered::before{background-color:var(--md-ripple-hover-color, var(--md-sys-color-on-surface, #1d1b20));opacity:var(--md-ripple-hover-opacity, 0.08)}.pressed::after{opacity:var(--md-ripple-pressed-opacity, 0.12);transition-duration:105ms}
`;/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let ct=class extends Ce{};ct.styles=[Do];ct=l([_("md-ripple")],ct);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Tr=["role","ariaAtomic","ariaAutoComplete","ariaBusy","ariaChecked","ariaColCount","ariaColIndex","ariaColSpan","ariaCurrent","ariaDisabled","ariaExpanded","ariaHasPopup","ariaHidden","ariaInvalid","ariaKeyShortcuts","ariaLabel","ariaLevel","ariaLive","ariaModal","ariaMultiLine","ariaMultiSelectable","ariaOrientation","ariaPlaceholder","ariaPosInSet","ariaPressed","ariaReadOnly","ariaRequired","ariaRoleDescription","ariaRowCount","ariaRowIndex","ariaRowSpan","ariaSelected","ariaSetSize","ariaSort","ariaValueMax","ariaValueMin","ariaValueNow","ariaValueText"],Mo=Tr.map(Sr);function rt(r){return Mo.includes(r)}function Sr(r){return r.replace("aria","aria-").replace(/Elements?/g,"").toLowerCase()}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const ze=Symbol("privateIgnoreAttributeChangesFor");function X(r){var e;class t extends r{constructor(){super(...arguments),this[e]=new Set}attributeChangedCallback(i,a,s){if(!rt(i)){super.attributeChangedCallback(i,a,s);return}if(this[ze].has(i))return;this[ze].add(i),this.removeAttribute(i),this[ze].delete(i);const n=ht(i);s===null?delete this.dataset[n]:this.dataset[n]=s,this.requestUpdate(ht(i),a)}getAttribute(i){return rt(i)?super.getAttribute(pt(i)):super.getAttribute(i)}removeAttribute(i){super.removeAttribute(i),rt(i)&&(super.removeAttribute(pt(i)),this.requestUpdate())}}return e=ze,No(t),t}function No(r){for(const e of Tr){const t=Sr(e),o=pt(t),i=ht(t);r.createProperty(e,{attribute:t,noAccessor:!0}),r.createProperty(Symbol(o),{attribute:o,noAccessor:!0}),Object.defineProperty(r.prototype,e,{configurable:!0,enumerable:!0,get(){return this.dataset[i]??null},set(a){const s=this.dataset[i]??null;a!==s&&(a===null?delete this.dataset[i]:this.dataset[i]=a,this.requestUpdate(e,s))}})}}function pt(r){return`data-${r}`}function ht(r){return r.replace(/-\w/,e=>e[1].toUpperCase())}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const z=Symbol("internals"),ot=Symbol("privateInternals");function Gt(r){class e extends r{get[z](){return this[ot]||(this[ot]=this.attachInternals()),this[ot]}}return e}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function Fr(r){r.addInitializer(e=>{const t=e;t.addEventListener("click",async o=>{const{type:i,[z]:a}=t,{form:s}=a;if(!(!s||i==="button")&&(await new Promise(n=>{setTimeout(n)}),!o.defaultPrevented)){if(i==="reset"){s.reset();return}s.addEventListener("submit",n=>{Object.defineProperty(n,"submitter",{configurable:!0,enumerable:!0,get:()=>t})},{capture:!0,once:!0}),a.setFormValue(t.value),s.requestSubmit()}})})}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function Bo(r){const e=new MouseEvent("click",{bubbles:!0});return r.dispatchEvent(e),e}function Uo(r){return r.currentTarget!==r.target||r.composedPath()[0]!==r.target||r.target.disabled?!1:!Ho(r)}function Ho(r){const e=ut;return e&&(r.preventDefault(),r.stopImmediatePropagation()),Vo(),e}let ut=!1;async function Vo(){ut=!0,await null,ut=!1}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const jo=X(Gt(x));class k extends jo{get name(){return this.getAttribute("name")??""}set name(e){this.setAttribute("name",e)}get form(){return this[z].form}constructor(){super(),this.disabled=!1,this.softDisabled=!1,this.href="",this.download="",this.target="",this.trailingIcon=!1,this.hasIcon=!1,this.type="submit",this.value="",this.addEventListener("click",this.handleClick.bind(this))}focus(){var e;(e=this.buttonElement)==null||e.focus()}blur(){var e;(e=this.buttonElement)==null||e.blur()}render(){var i;const e=this.disabled||this.softDisabled,t=this.href?this.renderLink():this.renderButton(),o=this.href?"link":"button";return d`
      ${(i=this.renderElevationOrOutline)==null?void 0:i.call(this)}
      <div class="background"></div>
      <md-focus-ring part="focus-ring" for=${o}></md-focus-ring>
      <md-ripple
        part="ripple"
        for=${o}
        ?disabled="${e}"></md-ripple>
      ${t}
    `}renderButton(){const{ariaLabel:e,ariaHasPopup:t,ariaExpanded:o}=this;return d`<button
      id="button"
      class="button"
      ?disabled=${this.disabled}
      aria-disabled=${this.softDisabled||h}
      aria-label="${e||h}"
      aria-haspopup="${t||h}"
      aria-expanded="${o||h}">
      ${this.renderContent()}
    </button>`}renderLink(){const{ariaLabel:e,ariaHasPopup:t,ariaExpanded:o}=this;return d`<a
      id="link"
      class="button"
      aria-label="${e||h}"
      aria-haspopup="${t||h}"
      aria-expanded="${o||h}"
      aria-disabled=${this.disabled||this.softDisabled||h}
      tabindex="${this.disabled&&!this.softDisabled?-1:h}"
      href=${this.href}
      download=${this.download||h}
      target=${this.target||h}
      >${this.renderContent()}
    </a>`}renderContent(){const e=d`<slot
      name="icon"
      @slotchange="${this.handleSlotChange}"></slot>`;return d`
      <span class="touch"></span>
      ${this.trailingIcon?h:e}
      <span class="label"><slot></slot></span>
      ${this.trailingIcon?e:h}
    `}handleClick(e){if(this.softDisabled||this.disabled&&this.href){e.stopImmediatePropagation(),e.preventDefault();return}!Uo(e)||!this.buttonElement||(this.focus(),Bo(this.buttonElement))}handleSlotChange(){this.hasIcon=this.assignedIcons.length>0}}Fr(k);k.formAssociated=!0;k.shadowRootOptions={mode:"open",delegatesFocus:!0};l([p({type:Boolean,reflect:!0})],k.prototype,"disabled",void 0);l([p({type:Boolean,attribute:"soft-disabled",reflect:!0})],k.prototype,"softDisabled",void 0);l([p()],k.prototype,"href",void 0);l([p()],k.prototype,"download",void 0);l([p()],k.prototype,"target",void 0);l([p({type:Boolean,attribute:"trailing-icon",reflect:!0})],k.prototype,"trailingIcon",void 0);l([p({type:Boolean,attribute:"has-icon",reflect:!0})],k.prototype,"hasIcon",void 0);l([p()],k.prototype,"type",void 0);l([p({reflect:!0})],k.prototype,"value",void 0);l([$(".button")],k.prototype,"buttonElement",void 0);l([Z({slot:"icon",flatten:!0})],k.prototype,"assignedIcons",void 0);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class qo extends k{renderElevationOrOutline(){return d`<md-elevation part="elevation"></md-elevation>`}}/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Ko=m`:host{--_container-color: var(--md-filled-button-container-color, var(--md-sys-color-primary, #6750a4));--_container-elevation: var(--md-filled-button-container-elevation, 0);--_container-height: var(--md-filled-button-container-height, 40px);--_container-shadow-color: var(--md-filled-button-container-shadow-color, var(--md-sys-color-shadow, #000));--_disabled-container-color: var(--md-filled-button-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-container-elevation: var(--md-filled-button-disabled-container-elevation, 0);--_disabled-container-opacity: var(--md-filled-button-disabled-container-opacity, 0.12);--_disabled-label-text-color: var(--md-filled-button-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-filled-button-disabled-label-text-opacity, 0.38);--_focus-container-elevation: var(--md-filled-button-focus-container-elevation, 0);--_focus-label-text-color: var(--md-filled-button-focus-label-text-color, var(--md-sys-color-on-primary, #fff));--_hover-container-elevation: var(--md-filled-button-hover-container-elevation, 1);--_hover-label-text-color: var(--md-filled-button-hover-label-text-color, var(--md-sys-color-on-primary, #fff));--_hover-state-layer-color: var(--md-filled-button-hover-state-layer-color, var(--md-sys-color-on-primary, #fff));--_hover-state-layer-opacity: var(--md-filled-button-hover-state-layer-opacity, 0.08);--_label-text-color: var(--md-filled-button-label-text-color, var(--md-sys-color-on-primary, #fff));--_label-text-font: var(--md-filled-button-label-text-font, var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-filled-button-label-text-line-height, var(--md-sys-typescale-label-large-line-height, 1.25rem));--_label-text-size: var(--md-filled-button-label-text-size, var(--md-sys-typescale-label-large-size, 0.875rem));--_label-text-weight: var(--md-filled-button-label-text-weight, var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)));--_pressed-container-elevation: var(--md-filled-button-pressed-container-elevation, 0);--_pressed-label-text-color: var(--md-filled-button-pressed-label-text-color, var(--md-sys-color-on-primary, #fff));--_pressed-state-layer-color: var(--md-filled-button-pressed-state-layer-color, var(--md-sys-color-on-primary, #fff));--_pressed-state-layer-opacity: var(--md-filled-button-pressed-state-layer-opacity, 0.12);--_disabled-icon-color: var(--md-filled-button-disabled-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-icon-opacity: var(--md-filled-button-disabled-icon-opacity, 0.38);--_focus-icon-color: var(--md-filled-button-focus-icon-color, var(--md-sys-color-on-primary, #fff));--_hover-icon-color: var(--md-filled-button-hover-icon-color, var(--md-sys-color-on-primary, #fff));--_icon-color: var(--md-filled-button-icon-color, var(--md-sys-color-on-primary, #fff));--_icon-size: var(--md-filled-button-icon-size, 18px);--_pressed-icon-color: var(--md-filled-button-pressed-icon-color, var(--md-sys-color-on-primary, #fff));--_container-shape-start-start: var(--md-filled-button-container-shape-start-start, var(--md-filled-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-start-end: var(--md-filled-button-container-shape-start-end, var(--md-filled-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-end: var(--md-filled-button-container-shape-end-end, var(--md-filled-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-start: var(--md-filled-button-container-shape-end-start, var(--md-filled-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_leading-space: var(--md-filled-button-leading-space, 24px);--_trailing-space: var(--md-filled-button-trailing-space, 24px);--_with-leading-icon-leading-space: var(--md-filled-button-with-leading-icon-leading-space, 16px);--_with-leading-icon-trailing-space: var(--md-filled-button-with-leading-icon-trailing-space, 24px);--_with-trailing-icon-leading-space: var(--md-filled-button-with-trailing-icon-leading-space, 24px);--_with-trailing-icon-trailing-space: var(--md-filled-button-with-trailing-icon-trailing-space, 16px)}
`;/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Go=m`md-elevation{transition-duration:280ms}:host(:is([disabled],[soft-disabled])) md-elevation{transition:none}md-elevation{--md-elevation-level: var(--_container-elevation);--md-elevation-shadow-color: var(--_container-shadow-color)}:host(:focus-within) md-elevation{--md-elevation-level: var(--_focus-container-elevation)}:host(:hover) md-elevation{--md-elevation-level: var(--_hover-container-elevation)}:host(:active) md-elevation{--md-elevation-level: var(--_pressed-container-elevation)}:host(:is([disabled],[soft-disabled])) md-elevation{--md-elevation-level: var(--_disabled-container-elevation)}
`;/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Wt=m`:host{border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end);box-sizing:border-box;cursor:pointer;display:inline-flex;gap:8px;min-height:var(--_container-height);outline:none;padding-block:calc((var(--_container-height) - max(var(--_label-text-line-height),var(--_icon-size)))/2);padding-inline-start:var(--_leading-space);padding-inline-end:var(--_trailing-space);place-content:center;place-items:center;position:relative;font-family:var(--_label-text-font);font-size:var(--_label-text-size);line-height:var(--_label-text-line-height);font-weight:var(--_label-text-weight);text-overflow:ellipsis;text-wrap:nowrap;user-select:none;-webkit-tap-highlight-color:rgba(0,0,0,0);vertical-align:top;--md-ripple-hover-color: var(--_hover-state-layer-color);--md-ripple-pressed-color: var(--_pressed-state-layer-color);--md-ripple-hover-opacity: var(--_hover-state-layer-opacity);--md-ripple-pressed-opacity: var(--_pressed-state-layer-opacity)}md-focus-ring{--md-focus-ring-shape-start-start: var(--_container-shape-start-start);--md-focus-ring-shape-start-end: var(--_container-shape-start-end);--md-focus-ring-shape-end-end: var(--_container-shape-end-end);--md-focus-ring-shape-end-start: var(--_container-shape-end-start)}:host(:is([disabled],[soft-disabled])){cursor:default;pointer-events:none}.button{border-radius:inherit;cursor:inherit;display:inline-flex;align-items:center;justify-content:center;border:none;outline:none;-webkit-appearance:none;vertical-align:middle;background:rgba(0,0,0,0);text-decoration:none;min-width:calc(64px - var(--_leading-space) - var(--_trailing-space));width:100%;z-index:0;height:100%;font:inherit;color:var(--_label-text-color);padding:0;gap:inherit;text-transform:inherit}.button::-moz-focus-inner{padding:0;border:0}:host(:hover) .button{color:var(--_hover-label-text-color)}:host(:focus-within) .button{color:var(--_focus-label-text-color)}:host(:active) .button{color:var(--_pressed-label-text-color)}.background{background:var(--_container-color);border-radius:inherit;inset:0;position:absolute}.label{overflow:hidden}:is(.button,.label,.label slot),.label ::slotted(*){text-overflow:inherit}:host(:is([disabled],[soft-disabled])) .label{color:var(--_disabled-label-text-color);opacity:var(--_disabled-label-text-opacity)}:host(:is([disabled],[soft-disabled])) .background{background:var(--_disabled-container-color);opacity:var(--_disabled-container-opacity)}@media(forced-colors: active){.background{border:1px solid CanvasText}:host(:is([disabled],[soft-disabled])){--_disabled-icon-color: GrayText;--_disabled-icon-opacity: 1;--_disabled-container-opacity: 1;--_disabled-label-text-color: GrayText;--_disabled-label-text-opacity: 1}}:host([has-icon]:not([trailing-icon])){padding-inline-start:var(--_with-leading-icon-leading-space);padding-inline-end:var(--_with-leading-icon-trailing-space)}:host([has-icon][trailing-icon]){padding-inline-start:var(--_with-trailing-icon-leading-space);padding-inline-end:var(--_with-trailing-icon-trailing-space)}::slotted([slot=icon]){display:inline-flex;position:relative;writing-mode:horizontal-tb;fill:currentColor;flex-shrink:0;color:var(--_icon-color);font-size:var(--_icon-size);inline-size:var(--_icon-size);block-size:var(--_icon-size)}:host(:hover) ::slotted([slot=icon]){color:var(--_hover-icon-color)}:host(:focus-within) ::slotted([slot=icon]){color:var(--_focus-icon-color)}:host(:active) ::slotted([slot=icon]){color:var(--_pressed-icon-color)}:host(:is([disabled],[soft-disabled])) ::slotted([slot=icon]){color:var(--_disabled-icon-color);opacity:var(--_disabled-icon-opacity)}.touch{position:absolute;top:50%;height:48px;left:0;right:0;transform:translateY(-50%)}:host([touch-target=wrapper]){margin:max(0px,(48px - var(--_container-height))/2) 0}:host([touch-target=none]) .touch{display:none}
`;/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let vt=class extends qo{};vt.styles=[Wt,Go,Ko];vt=l([_("md-filled-button")],vt);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Wo extends k{}/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Yo=m`:host{--_container-height: var(--md-text-button-container-height, 40px);--_disabled-label-text-color: var(--md-text-button-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-text-button-disabled-label-text-opacity, 0.38);--_focus-label-text-color: var(--md-text-button-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_hover-label-text-color: var(--md-text-button-hover-label-text-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-color: var(--md-text-button-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-opacity: var(--md-text-button-hover-state-layer-opacity, 0.08);--_label-text-color: var(--md-text-button-label-text-color, var(--md-sys-color-primary, #6750a4));--_label-text-font: var(--md-text-button-label-text-font, var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-text-button-label-text-line-height, var(--md-sys-typescale-label-large-line-height, 1.25rem));--_label-text-size: var(--md-text-button-label-text-size, var(--md-sys-typescale-label-large-size, 0.875rem));--_label-text-weight: var(--md-text-button-label-text-weight, var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)));--_pressed-label-text-color: var(--md-text-button-pressed-label-text-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-color: var(--md-text-button-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-opacity: var(--md-text-button-pressed-state-layer-opacity, 0.12);--_disabled-icon-color: var(--md-text-button-disabled-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-icon-opacity: var(--md-text-button-disabled-icon-opacity, 0.38);--_focus-icon-color: var(--md-text-button-focus-icon-color, var(--md-sys-color-primary, #6750a4));--_hover-icon-color: var(--md-text-button-hover-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-color: var(--md-text-button-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-size: var(--md-text-button-icon-size, 18px);--_pressed-icon-color: var(--md-text-button-pressed-icon-color, var(--md-sys-color-primary, #6750a4));--_container-shape-start-start: var(--md-text-button-container-shape-start-start, var(--md-text-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-start-end: var(--md-text-button-container-shape-start-end, var(--md-text-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-end: var(--md-text-button-container-shape-end-end, var(--md-text-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-start: var(--md-text-button-container-shape-end-start, var(--md-text-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_leading-space: var(--md-text-button-leading-space, 12px);--_trailing-space: var(--md-text-button-trailing-space, 12px);--_with-leading-icon-leading-space: var(--md-text-button-with-leading-icon-leading-space, 12px);--_with-leading-icon-trailing-space: var(--md-text-button-with-leading-icon-trailing-space, 16px);--_with-trailing-icon-leading-space: var(--md-text-button-with-trailing-icon-leading-space, 16px);--_with-trailing-icon-trailing-space: var(--md-text-button-with-trailing-icon-trailing-space, 12px);--_container-color: none;--_disabled-container-color: none;--_disabled-container-opacity: 0}
`;/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let ft=class extends Wo{};ft.styles=[Wt,Yo];ft=l([_("md-text-button")],ft);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Zo extends k{renderElevationOrOutline(){return d`<div class="outline"></div>`}}/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Xo=m`:host{--_container-height: var(--md-outlined-button-container-height, 40px);--_disabled-label-text-color: var(--md-outlined-button-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-outlined-button-disabled-label-text-opacity, 0.38);--_disabled-outline-color: var(--md-outlined-button-disabled-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-outline-opacity: var(--md-outlined-button-disabled-outline-opacity, 0.12);--_focus-label-text-color: var(--md-outlined-button-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_hover-label-text-color: var(--md-outlined-button-hover-label-text-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-color: var(--md-outlined-button-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-opacity: var(--md-outlined-button-hover-state-layer-opacity, 0.08);--_label-text-color: var(--md-outlined-button-label-text-color, var(--md-sys-color-primary, #6750a4));--_label-text-font: var(--md-outlined-button-label-text-font, var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-outlined-button-label-text-line-height, var(--md-sys-typescale-label-large-line-height, 1.25rem));--_label-text-size: var(--md-outlined-button-label-text-size, var(--md-sys-typescale-label-large-size, 0.875rem));--_label-text-weight: var(--md-outlined-button-label-text-weight, var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)));--_outline-color: var(--md-outlined-button-outline-color, var(--md-sys-color-outline, #79747e));--_outline-width: var(--md-outlined-button-outline-width, 1px);--_pressed-label-text-color: var(--md-outlined-button-pressed-label-text-color, var(--md-sys-color-primary, #6750a4));--_pressed-outline-color: var(--md-outlined-button-pressed-outline-color, var(--md-sys-color-outline, #79747e));--_pressed-state-layer-color: var(--md-outlined-button-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-opacity: var(--md-outlined-button-pressed-state-layer-opacity, 0.12);--_disabled-icon-color: var(--md-outlined-button-disabled-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-icon-opacity: var(--md-outlined-button-disabled-icon-opacity, 0.38);--_focus-icon-color: var(--md-outlined-button-focus-icon-color, var(--md-sys-color-primary, #6750a4));--_hover-icon-color: var(--md-outlined-button-hover-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-color: var(--md-outlined-button-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-size: var(--md-outlined-button-icon-size, 18px);--_pressed-icon-color: var(--md-outlined-button-pressed-icon-color, var(--md-sys-color-primary, #6750a4));--_container-shape-start-start: var(--md-outlined-button-container-shape-start-start, var(--md-outlined-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-start-end: var(--md-outlined-button-container-shape-start-end, var(--md-outlined-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-end: var(--md-outlined-button-container-shape-end-end, var(--md-outlined-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-start: var(--md-outlined-button-container-shape-end-start, var(--md-outlined-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_leading-space: var(--md-outlined-button-leading-space, 24px);--_trailing-space: var(--md-outlined-button-trailing-space, 24px);--_with-leading-icon-leading-space: var(--md-outlined-button-with-leading-icon-leading-space, 16px);--_with-leading-icon-trailing-space: var(--md-outlined-button-with-leading-icon-trailing-space, 24px);--_with-trailing-icon-leading-space: var(--md-outlined-button-with-trailing-icon-leading-space, 24px);--_with-trailing-icon-trailing-space: var(--md-outlined-button-with-trailing-icon-trailing-space, 16px);--_container-color: none;--_disabled-container-color: none;--_disabled-container-opacity: 0}.outline{inset:0;border-style:solid;position:absolute;box-sizing:border-box;border-color:var(--_outline-color);border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end)}:host(:active) .outline{border-color:var(--_pressed-outline-color)}:host(:is([disabled],[soft-disabled])) .outline{border-color:var(--_disabled-outline-color);opacity:var(--_disabled-outline-opacity)}@media(forced-colors: active){:host(:is([disabled],[soft-disabled])) .background{border-color:GrayText}:host(:is([disabled],[soft-disabled])) .outline{opacity:1}}.outline,md-ripple{border-width:var(--_outline-width)}md-ripple{inline-size:calc(100% - 2*var(--_outline-width));block-size:calc(100% - 2*var(--_outline-width));border-style:solid;border-color:rgba(0,0,0,0)}
`;/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let mt=class extends Zo{};mt.styles=[Wt,Xo];mt=l([_("md-outlined-button")],mt);/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Rr=Symbol.for(""),Jo=r=>{if((r==null?void 0:r.r)===Rr)return r==null?void 0:r._$litStatic$},j=(r,...e)=>({_$litStatic$:e.reduce((t,o,i)=>t+(a=>{if(a._$litStatic$!==void 0)return a._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${a}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)})(o)+r[i+1],r[0]),r:Rr}),ur=new Map,Qo=r=>(e,...t)=>{const o=t.length;let i,a;const s=[],n=[];let c,u=0,f=!1;for(;u<o;){for(c=e[u];u<o&&(a=t[u],(i=Jo(a))!==void 0);)c+=i+e[++u],f=!0;u!==o&&n.push(a),s.push(c),u++}if(u===o&&s.push(e[o]),f){const v=s.join("$$lit$$");(e=ur.get(v))===void 0&&(s.raw=s,ur.set(v,e=s)),t=n}return r(e,...t)},Yt=Qo(d);/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function vr(r,e=!0){return e&&getComputedStyle(r).getPropertyValue("direction").trim()==="rtl"}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const ei=X(Gt(x));class E extends ei{get name(){return this.getAttribute("name")??""}set name(e){this.setAttribute("name",e)}get form(){return this[z].form}get labels(){return this[z].labels}constructor(){super(),this.disabled=!1,this.softDisabled=!1,this.flipIconInRtl=!1,this.href="",this.download="",this.target="",this.ariaLabelSelected="",this.toggle=!1,this.selected=!1,this.type="submit",this.value="",this.flipIcon=vr(this,this.flipIconInRtl),this.addEventListener("click",this.handleClick.bind(this))}willUpdate(){this.href&&(this.disabled=!1,this.softDisabled=!1)}render(){const e=this.href?j`div`:j`button`,{ariaLabel:t,ariaHasPopup:o,ariaExpanded:i}=this,a=t&&this.ariaLabelSelected,s=this.toggle?this.selected:h;let n=h;return this.href||(n=a&&this.selected?this.ariaLabelSelected:t),Yt`<${e}
        class="icon-button ${L(this.getRenderClasses())}"
        id="button"
        aria-label="${n||h}"
        aria-haspopup="${!this.href&&o||h}"
        aria-expanded="${!this.href&&i||h}"
        aria-pressed="${s}"
        aria-disabled=${!this.href&&this.softDisabled||h}
        ?disabled="${!this.href&&this.disabled}"
        @click="${this.handleClickOnChild}">
        ${this.renderFocusRing()}
        ${this.renderRipple()}
        ${this.selected?h:this.renderIcon()}
        ${this.selected?this.renderSelectedIcon():h}
        ${this.href?this.renderLink():this.renderTouchTarget()}
  </${e}>`}renderLink(){const{ariaLabel:e}=this;return d`
      <a
        class="link"
        id="link"
        href="${this.href}"
        download="${this.download||h}"
        target="${this.target||h}"
        aria-label="${e||h}">
        ${this.renderTouchTarget()}
      </a>
    `}getRenderClasses(){return{"flip-icon":this.flipIcon,selected:this.toggle&&this.selected}}renderIcon(){return d`<span class="icon"><slot></slot></span>`}renderSelectedIcon(){return d`<span class="icon icon--selected"
      ><slot name="selected"><slot></slot></slot
    ></span>`}renderTouchTarget(){return d`<span class="touch"></span>`}renderFocusRing(){return d`<md-focus-ring
      part="focus-ring"
      for=${this.href?"link":"button"}></md-focus-ring>`}renderRipple(){const e=!this.href&&(this.disabled||this.softDisabled);return d`<md-ripple
      for=${this.href?"link":h}
      ?disabled="${e}"></md-ripple>`}connectedCallback(){this.flipIcon=vr(this,this.flipIconInRtl),super.connectedCallback()}handleClick(e){if(!this.href&&this.softDisabled){e.stopImmediatePropagation(),e.preventDefault();return}}async handleClickOnChild(e){await 0,!(!this.toggle||this.disabled||this.softDisabled||e.defaultPrevented)&&(this.selected=!this.selected,this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0})))}}Fr(E);E.formAssociated=!0;E.shadowRootOptions={mode:"open",delegatesFocus:!0};l([p({type:Boolean,reflect:!0})],E.prototype,"disabled",void 0);l([p({type:Boolean,attribute:"soft-disabled",reflect:!0})],E.prototype,"softDisabled",void 0);l([p({type:Boolean,attribute:"flip-icon-in-rtl"})],E.prototype,"flipIconInRtl",void 0);l([p()],E.prototype,"href",void 0);l([p()],E.prototype,"download",void 0);l([p()],E.prototype,"target",void 0);l([p({attribute:"aria-label-selected"})],E.prototype,"ariaLabelSelected",void 0);l([p({type:Boolean})],E.prototype,"toggle",void 0);l([p({type:Boolean,reflect:!0})],E.prototype,"selected",void 0);l([p()],E.prototype,"type",void 0);l([p({reflect:!0})],E.prototype,"value",void 0);l([g()],E.prototype,"flipIcon",void 0);/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const ti=m`:host{display:inline-flex;outline:none;-webkit-tap-highlight-color:rgba(0,0,0,0);height:var(--_container-height);width:var(--_container-width);justify-content:center}:host([touch-target=wrapper]){margin:max(0px,(48px - var(--_container-height))/2) max(0px,(48px - var(--_container-width))/2)}md-focus-ring{--md-focus-ring-shape-start-start: var(--_container-shape-start-start);--md-focus-ring-shape-start-end: var(--_container-shape-start-end);--md-focus-ring-shape-end-end: var(--_container-shape-end-end);--md-focus-ring-shape-end-start: var(--_container-shape-end-start)}:host(:is([disabled],[soft-disabled])){pointer-events:none}.icon-button{place-items:center;background:none;border:none;box-sizing:border-box;cursor:pointer;display:flex;place-content:center;outline:none;padding:0;position:relative;text-decoration:none;user-select:none;z-index:0;flex:1;border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end)}.icon ::slotted(*){font-size:var(--_icon-size);height:var(--_icon-size);width:var(--_icon-size);font-weight:inherit}md-ripple{z-index:-1;border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end)}.flip-icon .icon{transform:scaleX(-1)}.icon{display:inline-flex}.link{display:grid;height:100%;outline:none;place-items:center;position:absolute;width:100%}.touch{position:absolute;height:max(48px,100%);width:max(48px,100%)}:host([touch-target=none]) .touch{display:none}@media(forced-colors: active){:host(:is([disabled],[soft-disabled])){--_disabled-icon-color: GrayText;--_disabled-icon-opacity: 1}}
`;/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const ri=m`:host{--_disabled-icon-color: var(--md-icon-button-disabled-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-icon-opacity: var(--md-icon-button-disabled-icon-opacity, 0.38);--_icon-size: var(--md-icon-button-icon-size, 24px);--_selected-focus-icon-color: var(--md-icon-button-selected-focus-icon-color, var(--md-sys-color-primary, #6750a4));--_selected-hover-icon-color: var(--md-icon-button-selected-hover-icon-color, var(--md-sys-color-primary, #6750a4));--_selected-hover-state-layer-color: var(--md-icon-button-selected-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_selected-hover-state-layer-opacity: var(--md-icon-button-selected-hover-state-layer-opacity, 0.08);--_selected-icon-color: var(--md-icon-button-selected-icon-color, var(--md-sys-color-primary, #6750a4));--_selected-pressed-icon-color: var(--md-icon-button-selected-pressed-icon-color, var(--md-sys-color-primary, #6750a4));--_selected-pressed-state-layer-color: var(--md-icon-button-selected-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_selected-pressed-state-layer-opacity: var(--md-icon-button-selected-pressed-state-layer-opacity, 0.12);--_state-layer-height: var(--md-icon-button-state-layer-height, 40px);--_state-layer-shape: var(--md-icon-button-state-layer-shape, var(--md-sys-shape-corner-full, 9999px));--_state-layer-width: var(--md-icon-button-state-layer-width, 40px);--_focus-icon-color: var(--md-icon-button-focus-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-icon-color: var(--md-icon-button-hover-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-color: var(--md-icon-button-hover-state-layer-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-opacity: var(--md-icon-button-hover-state-layer-opacity, 0.08);--_icon-color: var(--md-icon-button-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-icon-color: var(--md-icon-button-pressed-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-state-layer-color: var(--md-icon-button-pressed-state-layer-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-state-layer-opacity: var(--md-icon-button-pressed-state-layer-opacity, 0.12);--_container-shape-start-start: 0;--_container-shape-start-end: 0;--_container-shape-end-end: 0;--_container-shape-end-start: 0;--_container-height: 0;--_container-width: 0;height:var(--_state-layer-height);width:var(--_state-layer-width)}:host([touch-target=wrapper]){margin:max(0px,(48px - var(--_state-layer-height))/2) max(0px,(48px - var(--_state-layer-width))/2)}md-focus-ring{--md-focus-ring-shape-start-start: var(--_state-layer-shape);--md-focus-ring-shape-start-end: var(--_state-layer-shape);--md-focus-ring-shape-end-end: var(--_state-layer-shape);--md-focus-ring-shape-end-start: var(--_state-layer-shape)}.standard{background-color:rgba(0,0,0,0);color:var(--_icon-color);--md-ripple-hover-color: var(--_hover-state-layer-color);--md-ripple-hover-opacity: var(--_hover-state-layer-opacity);--md-ripple-pressed-color: var(--_pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_pressed-state-layer-opacity)}.standard:hover{color:var(--_hover-icon-color)}.standard:focus{color:var(--_focus-icon-color)}.standard:active{color:var(--_pressed-icon-color)}.standard:is(:disabled,[aria-disabled=true]){color:var(--_disabled-icon-color)}md-ripple{border-radius:var(--_state-layer-shape)}.standard:is(:disabled,[aria-disabled=true]){opacity:var(--_disabled-icon-opacity)}.selected:not(:disabled,[aria-disabled=true]){color:var(--_selected-icon-color)}.selected:not(:disabled,[aria-disabled=true]):hover{color:var(--_selected-hover-icon-color)}.selected:not(:disabled,[aria-disabled=true]):focus{color:var(--_selected-focus-icon-color)}.selected:not(:disabled,[aria-disabled=true]):active{color:var(--_selected-pressed-icon-color)}.selected{--md-ripple-hover-color: var(--_selected-hover-state-layer-color);--md-ripple-hover-opacity: var(--_selected-hover-state-layer-opacity);--md-ripple-pressed-color: var(--_selected-pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_selected-pressed-state-layer-opacity)}
`;/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let bt=class extends E{getRenderClasses(){return{...super.getRenderClasses(),standard:!0}}};bt.styles=[ti,ri];bt=l([_("md-icon-button")],bt);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class C extends x{constructor(){super(...arguments),this.disabled=!1,this.error=!1,this.focused=!1,this.label="",this.noAsterisk=!1,this.populated=!1,this.required=!1,this.resizable=!1,this.supportingText="",this.errorText="",this.count=-1,this.max=-1,this.hasStart=!1,this.hasEnd=!1,this.isAnimating=!1,this.refreshErrorAlert=!1,this.disableTransitions=!1}get counterText(){const e=this.count??-1,t=this.max??-1;return e<0||t<=0?"":`${e} / ${t}`}get supportingOrErrorText(){return this.error&&this.errorText?this.errorText:this.supportingText}reannounceError(){this.refreshErrorAlert=!0}update(e){e.has("disabled")&&e.get("disabled")!==void 0&&(this.disableTransitions=!0),this.disabled&&this.focused&&(e.set("focused",!0),this.focused=!1),this.animateLabelIfNeeded({wasFocused:e.get("focused"),wasPopulated:e.get("populated")}),super.update(e)}render(){var a,s,n,c;const e=this.renderLabel(!0),t=this.renderLabel(!1),o=(a=this.renderOutline)==null?void 0:a.call(this,e),i={disabled:this.disabled,"disable-transitions":this.disableTransitions,error:this.error&&!this.disabled,focused:this.focused,"with-start":this.hasStart,"with-end":this.hasEnd,populated:this.populated,resizable:this.resizable,required:this.required,"no-label":!this.label};return d`
      <div class="field ${L(i)}">
        <div class="container-overflow">
          ${(s=this.renderBackground)==null?void 0:s.call(this)}
          <slot name="container"></slot>
          ${(n=this.renderStateLayer)==null?void 0:n.call(this)} ${(c=this.renderIndicator)==null?void 0:c.call(this)} ${o}
          <div class="container">
            <div class="start">
              <slot name="start"></slot>
            </div>
            <div class="middle">
              <div class="label-wrapper">
                ${t} ${o?h:e}
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
    `}updated(e){(e.has("supportingText")||e.has("errorText")||e.has("count")||e.has("max"))&&this.updateSlottedAriaDescribedBy(),this.refreshErrorAlert&&requestAnimationFrame(()=>{this.refreshErrorAlert=!1}),this.disableTransitions&&requestAnimationFrame(()=>{this.disableTransitions=!1})}renderSupportingText(){const{supportingOrErrorText:e,counterText:t}=this;if(!e&&!t)return h;const o=d`<span>${e}</span>`,i=t?d`<span class="counter">${t}</span>`:h,s=this.error&&this.errorText&&!this.refreshErrorAlert?"alert":h;return d`
      <div class="supporting-text" role=${s}>${o}${i}</div>
      <slot
        name="aria-describedby"
        @slotchange=${this.updateSlottedAriaDescribedBy}></slot>
    `}updateSlottedAriaDescribedBy(){for(const e of this.slottedAriaDescribedBy)Er(d`${this.supportingOrErrorText} ${this.counterText}`,e),e.setAttribute("hidden","")}renderLabel(e){if(!this.label)return h;let t;e?t=this.focused||this.populated||this.isAnimating:t=!this.focused&&!this.populated&&!this.isAnimating;const o={hidden:!t,floating:e,resting:!e},i=`${this.label}${this.required&&!this.noAsterisk?"*":""}`;return d`
      <span class="label ${L(o)}" aria-hidden=${!t}
        >${i}</span
      >
    `}animateLabelIfNeeded({wasFocused:e,wasPopulated:t}){var a,s,n;if(!this.label)return;e??(e=this.focused),t??(t=this.populated);const o=e||t,i=this.focused||this.populated;o!==i&&(this.isAnimating=!0,(a=this.labelAnimation)==null||a.cancel(),this.labelAnimation=(s=this.floatingLabelEl)==null?void 0:s.animate(this.getLabelKeyframes(),{duration:150,easing:ae.STANDARD}),(n=this.labelAnimation)==null||n.addEventListener("finish",()=>{this.isAnimating=!1}))}getLabelKeyframes(){const{floatingLabelEl:e,restingLabelEl:t}=this;if(!e||!t)return[];const{x:o,y:i,height:a}=e.getBoundingClientRect(),{x:s,y:n,height:c}=t.getBoundingClientRect(),u=e.scrollWidth,f=t.scrollWidth,v=f/u,b=s-o,w=n-i+Math.round((c-a*v)/2),F=`translateX(${b}px) translateY(${w}px) scale(${v})`,Q="translateX(0) translateY(0) scale(1)",ee=t.clientWidth,ne=f>ee?`${ee/v}px`:"";return this.focused||this.populated?[{transform:F,width:ne},{transform:Q,width:ne}]:[{transform:Q,width:ne},{transform:F,width:ne}]}getSurfacePositionClientRect(){return this.containerEl.getBoundingClientRect()}}l([p({type:Boolean})],C.prototype,"disabled",void 0);l([p({type:Boolean})],C.prototype,"error",void 0);l([p({type:Boolean})],C.prototype,"focused",void 0);l([p()],C.prototype,"label",void 0);l([p({type:Boolean,attribute:"no-asterisk"})],C.prototype,"noAsterisk",void 0);l([p({type:Boolean})],C.prototype,"populated",void 0);l([p({type:Boolean})],C.prototype,"required",void 0);l([p({type:Boolean})],C.prototype,"resizable",void 0);l([p({attribute:"supporting-text"})],C.prototype,"supportingText",void 0);l([p({attribute:"error-text"})],C.prototype,"errorText",void 0);l([p({type:Number})],C.prototype,"count",void 0);l([p({type:Number})],C.prototype,"max",void 0);l([p({type:Boolean,attribute:"has-start"})],C.prototype,"hasStart",void 0);l([p({type:Boolean,attribute:"has-end"})],C.prototype,"hasEnd",void 0);l([Z({slot:"aria-describedby"})],C.prototype,"slottedAriaDescribedBy",void 0);l([g()],C.prototype,"isAnimating",void 0);l([g()],C.prototype,"refreshErrorAlert",void 0);l([g()],C.prototype,"disableTransitions",void 0);l([$(".label.floating")],C.prototype,"floatingLabelEl",void 0);l([$(".label.resting")],C.prototype,"restingLabelEl",void 0);l([$(".container")],C.prototype,"containerEl",void 0);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class oi extends C{renderBackground(){return d` <div class="background"></div> `}renderStateLayer(){return d` <div class="state-layer"></div> `}renderIndicator(){return d`<div class="active-indicator"></div>`}}/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const ii=m`@layer styles{:host{--_active-indicator-color: var(--md-filled-field-active-indicator-color, var(--md-sys-color-on-surface-variant, #49454f));--_active-indicator-height: var(--md-filled-field-active-indicator-height, 1px);--_bottom-space: var(--md-filled-field-bottom-space, 16px);--_container-color: var(--md-filled-field-container-color, var(--md-sys-color-surface-container-highest, #e6e0e9));--_content-color: var(--md-filled-field-content-color, var(--md-sys-color-on-surface, #1d1b20));--_content-font: var(--md-filled-field-content-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_content-line-height: var(--md-filled-field-content-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_content-size: var(--md-filled-field-content-size, var(--md-sys-typescale-body-large-size, 1rem));--_content-space: var(--md-filled-field-content-space, 16px);--_content-weight: var(--md-filled-field-content-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_disabled-active-indicator-color: var(--md-filled-field-disabled-active-indicator-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-active-indicator-height: var(--md-filled-field-disabled-active-indicator-height, 1px);--_disabled-active-indicator-opacity: var(--md-filled-field-disabled-active-indicator-opacity, 0.38);--_disabled-container-color: var(--md-filled-field-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-container-opacity: var(--md-filled-field-disabled-container-opacity, 0.04);--_disabled-content-color: var(--md-filled-field-disabled-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-content-opacity: var(--md-filled-field-disabled-content-opacity, 0.38);--_disabled-label-text-color: var(--md-filled-field-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-filled-field-disabled-label-text-opacity, 0.38);--_disabled-leading-content-color: var(--md-filled-field-disabled-leading-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-leading-content-opacity: var(--md-filled-field-disabled-leading-content-opacity, 0.38);--_disabled-supporting-text-color: var(--md-filled-field-disabled-supporting-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-supporting-text-opacity: var(--md-filled-field-disabled-supporting-text-opacity, 0.38);--_disabled-trailing-content-color: var(--md-filled-field-disabled-trailing-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-trailing-content-opacity: var(--md-filled-field-disabled-trailing-content-opacity, 0.38);--_error-active-indicator-color: var(--md-filled-field-error-active-indicator-color, var(--md-sys-color-error, #b3261e));--_error-content-color: var(--md-filled-field-error-content-color, var(--md-sys-color-on-surface, #1d1b20));--_error-focus-active-indicator-color: var(--md-filled-field-error-focus-active-indicator-color, var(--md-sys-color-error, #b3261e));--_error-focus-content-color: var(--md-filled-field-error-focus-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-focus-label-text-color: var(--md-filled-field-error-focus-label-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-leading-content-color: var(--md-filled-field-error-focus-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-focus-supporting-text-color: var(--md-filled-field-error-focus-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-trailing-content-color: var(--md-filled-field-error-focus-trailing-content-color, var(--md-sys-color-error, #b3261e));--_error-hover-active-indicator-color: var(--md-filled-field-error-hover-active-indicator-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-content-color: var(--md-filled-field-error-hover-content-color, var(--md-sys-color-on-surface, #1d1b20));--_error-hover-label-text-color: var(--md-filled-field-error-hover-label-text-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-leading-content-color: var(--md-filled-field-error-hover-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-hover-state-layer-color: var(--md-filled-field-error-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_error-hover-state-layer-opacity: var(--md-filled-field-error-hover-state-layer-opacity, 0.08);--_error-hover-supporting-text-color: var(--md-filled-field-error-hover-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-hover-trailing-content-color: var(--md-filled-field-error-hover-trailing-content-color, var(--md-sys-color-on-error-container, #410e0b));--_error-label-text-color: var(--md-filled-field-error-label-text-color, var(--md-sys-color-error, #b3261e));--_error-leading-content-color: var(--md-filled-field-error-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-supporting-text-color: var(--md-filled-field-error-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-trailing-content-color: var(--md-filled-field-error-trailing-content-color, var(--md-sys-color-error, #b3261e));--_focus-active-indicator-color: var(--md-filled-field-focus-active-indicator-color, var(--md-sys-color-primary, #6750a4));--_focus-active-indicator-height: var(--md-filled-field-focus-active-indicator-height, 3px);--_focus-content-color: var(--md-filled-field-focus-content-color, var(--md-sys-color-on-surface, #1d1b20));--_focus-label-text-color: var(--md-filled-field-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_focus-leading-content-color: var(--md-filled-field-focus-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-supporting-text-color: var(--md-filled-field-focus-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-trailing-content-color: var(--md-filled-field-focus-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-active-indicator-color: var(--md-filled-field-hover-active-indicator-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-active-indicator-height: var(--md-filled-field-hover-active-indicator-height, 1px);--_hover-content-color: var(--md-filled-field-hover-content-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-label-text-color: var(--md-filled-field-hover-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-leading-content-color: var(--md-filled-field-hover-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-color: var(--md-filled-field-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-state-layer-opacity: var(--md-filled-field-hover-state-layer-opacity, 0.08);--_hover-supporting-text-color: var(--md-filled-field-hover-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-trailing-content-color: var(--md-filled-field-hover-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-color: var(--md-filled-field-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-font: var(--md-filled-field-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-filled-field-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_label-text-populated-line-height: var(--md-filled-field-label-text-populated-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_label-text-populated-size: var(--md-filled-field-label-text-populated-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_label-text-size: var(--md-filled-field-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_label-text-weight: var(--md-filled-field-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_leading-content-color: var(--md-filled-field-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_leading-space: var(--md-filled-field-leading-space, 16px);--_supporting-text-color: var(--md-filled-field-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_supporting-text-font: var(--md-filled-field-supporting-text-font, var(--md-sys-typescale-body-small-font, var(--md-ref-typeface-plain, Roboto)));--_supporting-text-leading-space: var(--md-filled-field-supporting-text-leading-space, 16px);--_supporting-text-line-height: var(--md-filled-field-supporting-text-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_supporting-text-size: var(--md-filled-field-supporting-text-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_supporting-text-top-space: var(--md-filled-field-supporting-text-top-space, 4px);--_supporting-text-trailing-space: var(--md-filled-field-supporting-text-trailing-space, 16px);--_supporting-text-weight: var(--md-filled-field-supporting-text-weight, var(--md-sys-typescale-body-small-weight, var(--md-ref-typeface-weight-regular, 400)));--_top-space: var(--md-filled-field-top-space, 16px);--_trailing-content-color: var(--md-filled-field-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_trailing-space: var(--md-filled-field-trailing-space, 16px);--_with-label-bottom-space: var(--md-filled-field-with-label-bottom-space, 8px);--_with-label-top-space: var(--md-filled-field-with-label-top-space, 8px);--_with-leading-content-leading-space: var(--md-filled-field-with-leading-content-leading-space, 12px);--_with-trailing-content-trailing-space: var(--md-filled-field-with-trailing-content-trailing-space, 12px);--_container-shape-start-start: var(--md-filled-field-container-shape-start-start, var(--md-filled-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-start-end: var(--md-filled-field-container-shape-start-end, var(--md-filled-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-end-end: var(--md-filled-field-container-shape-end-end, var(--md-filled-field-container-shape, var(--md-sys-shape-corner-none, 0px)));--_container-shape-end-start: var(--md-filled-field-container-shape-end-start, var(--md-filled-field-container-shape, var(--md-sys-shape-corner-none, 0px)))}.background,.state-layer{border-radius:inherit;inset:0;pointer-events:none;position:absolute}.background{background:var(--_container-color)}.state-layer{visibility:hidden}.field:not(.disabled):hover .state-layer{visibility:visible}.label.floating{position:absolute;top:var(--_with-label-top-space)}.field:not(.with-start) .label-wrapper{margin-inline-start:var(--_leading-space)}.field:not(.with-end) .label-wrapper{margin-inline-end:var(--_trailing-space)}.active-indicator{inset:auto 0 0 0;pointer-events:none;position:absolute;width:100%;z-index:1}.active-indicator::before,.active-indicator::after{border-bottom:var(--_active-indicator-height) solid var(--_active-indicator-color);inset:auto 0 0 0;content:"";position:absolute;width:100%}.active-indicator::after{opacity:0;transition:opacity 150ms cubic-bezier(0.2, 0, 0, 1)}.focused .active-indicator::after{opacity:1}.field:not(.with-start) .content ::slotted(*){padding-inline-start:var(--_leading-space)}.field:not(.with-end) .content ::slotted(*){padding-inline-end:var(--_trailing-space)}.field:not(.no-label) .content ::slotted(:not(textarea)){padding-bottom:var(--_with-label-bottom-space);padding-top:calc(var(--_with-label-top-space) + var(--_label-text-populated-line-height))}.field:not(.no-label) .content ::slotted(textarea){margin-bottom:var(--_with-label-bottom-space);margin-top:calc(var(--_with-label-top-space) + var(--_label-text-populated-line-height))}:hover .active-indicator::before{border-bottom-color:var(--_hover-active-indicator-color);border-bottom-width:var(--_hover-active-indicator-height)}.active-indicator::after{border-bottom-color:var(--_focus-active-indicator-color);border-bottom-width:var(--_focus-active-indicator-height)}:hover .state-layer{background:var(--_hover-state-layer-color);opacity:var(--_hover-state-layer-opacity)}.disabled .active-indicator::before{border-bottom-color:var(--_disabled-active-indicator-color);border-bottom-width:var(--_disabled-active-indicator-height);opacity:var(--_disabled-active-indicator-opacity)}.disabled .background{background:var(--_disabled-container-color);opacity:var(--_disabled-container-opacity)}.error .active-indicator::before{border-bottom-color:var(--_error-active-indicator-color)}.error:hover .active-indicator::before{border-bottom-color:var(--_error-hover-active-indicator-color)}.error:hover .state-layer{background:var(--_error-hover-state-layer-color);opacity:var(--_error-hover-state-layer-opacity)}.error .active-indicator::after{border-bottom-color:var(--_error-focus-active-indicator-color)}.resizable .container{bottom:var(--_focus-active-indicator-height);clip-path:inset(var(--_focus-active-indicator-height) 0 0 0)}.resizable .container>*{top:var(--_focus-active-indicator-height)}}@layer hcm{@media(forced-colors: active){.disabled .active-indicator::before{border-color:GrayText;opacity:1}}}
`;/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Lr=m`:host{display:inline-flex;resize:both}.field{display:flex;flex:1;flex-direction:column;writing-mode:horizontal-tb;max-width:100%}.container-overflow{border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-end-radius:var(--_container-shape-end-end);border-end-start-radius:var(--_container-shape-end-start);display:flex;height:100%;position:relative}.container{align-items:center;border-radius:inherit;display:flex;flex:1;max-height:100%;min-height:100%;min-width:min-content;position:relative}.field,.container-overflow{resize:inherit}.resizable:not(.disabled) .container{resize:inherit;overflow:hidden}.disabled{pointer-events:none}slot[name=container]{border-radius:inherit}slot[name=container]::slotted(*){border-radius:inherit;inset:0;pointer-events:none;position:absolute}@layer styles{.start,.middle,.end{display:flex;box-sizing:border-box;height:100%;position:relative}.start{color:var(--_leading-content-color)}.end{color:var(--_trailing-content-color)}.start,.end{align-items:center;justify-content:center}.with-start .start{margin-inline:var(--_with-leading-content-leading-space) var(--_content-space)}.with-end .end{margin-inline:var(--_content-space) var(--_with-trailing-content-trailing-space)}.middle{align-items:stretch;align-self:baseline;flex:1}.content{color:var(--_content-color);display:flex;flex:1;opacity:0;transition:opacity 83ms cubic-bezier(0.2, 0, 0, 1)}.no-label .content,.focused .content,.populated .content{opacity:1;transition-delay:67ms}:is(.disabled,.disable-transitions) .content{transition:none}.content ::slotted(*){all:unset;color:currentColor;font-family:var(--_content-font);font-size:var(--_content-size);line-height:var(--_content-line-height);font-weight:var(--_content-weight);width:100%;overflow-wrap:revert;white-space:revert}.content ::slotted(:not(textarea)){padding-top:var(--_top-space);padding-bottom:var(--_bottom-space)}.content ::slotted(textarea){margin-top:var(--_top-space);margin-bottom:var(--_bottom-space)}:hover .content{color:var(--_hover-content-color)}:hover .start{color:var(--_hover-leading-content-color)}:hover .end{color:var(--_hover-trailing-content-color)}.focused .content{color:var(--_focus-content-color)}.focused .start{color:var(--_focus-leading-content-color)}.focused .end{color:var(--_focus-trailing-content-color)}.disabled .content{color:var(--_disabled-content-color)}.disabled.no-label .content,.disabled.focused .content,.disabled.populated .content{opacity:var(--_disabled-content-opacity)}.disabled .start{color:var(--_disabled-leading-content-color);opacity:var(--_disabled-leading-content-opacity)}.disabled .end{color:var(--_disabled-trailing-content-color);opacity:var(--_disabled-trailing-content-opacity)}.error .content{color:var(--_error-content-color)}.error .start{color:var(--_error-leading-content-color)}.error .end{color:var(--_error-trailing-content-color)}.error:hover .content{color:var(--_error-hover-content-color)}.error:hover .start{color:var(--_error-hover-leading-content-color)}.error:hover .end{color:var(--_error-hover-trailing-content-color)}.error.focused .content{color:var(--_error-focus-content-color)}.error.focused .start{color:var(--_error-focus-leading-content-color)}.error.focused .end{color:var(--_error-focus-trailing-content-color)}}@layer hcm{@media(forced-colors: active){.disabled :is(.start,.content,.end){color:GrayText;opacity:1}}}@layer styles{.label{box-sizing:border-box;color:var(--_label-text-color);overflow:hidden;max-width:100%;text-overflow:ellipsis;white-space:nowrap;z-index:1;font-family:var(--_label-text-font);font-size:var(--_label-text-size);line-height:var(--_label-text-line-height);font-weight:var(--_label-text-weight);width:min-content}.label-wrapper{inset:0;pointer-events:none;position:absolute}.label.resting{position:absolute;top:var(--_top-space)}.label.floating{font-size:var(--_label-text-populated-size);line-height:var(--_label-text-populated-line-height);transform-origin:top left}.label.hidden{opacity:0}.no-label .label{display:none}.label-wrapper{inset:0;position:absolute;text-align:initial}:hover .label{color:var(--_hover-label-text-color)}.focused .label{color:var(--_focus-label-text-color)}.disabled .label{color:var(--_disabled-label-text-color)}.disabled .label:not(.hidden){opacity:var(--_disabled-label-text-opacity)}.error .label{color:var(--_error-label-text-color)}.error:hover .label{color:var(--_error-hover-label-text-color)}.error.focused .label{color:var(--_error-focus-label-text-color)}}@layer hcm{@media(forced-colors: active){.disabled .label:not(.hidden){color:GrayText;opacity:1}}}@layer styles{.supporting-text{color:var(--_supporting-text-color);display:flex;font-family:var(--_supporting-text-font);font-size:var(--_supporting-text-size);line-height:var(--_supporting-text-line-height);font-weight:var(--_supporting-text-weight);gap:16px;justify-content:space-between;padding-inline-start:var(--_supporting-text-leading-space);padding-inline-end:var(--_supporting-text-trailing-space);padding-top:var(--_supporting-text-top-space)}.supporting-text :nth-child(2){flex-shrink:0}:hover .supporting-text{color:var(--_hover-supporting-text-color)}.focus .supporting-text{color:var(--_focus-supporting-text-color)}.disabled .supporting-text{color:var(--_disabled-supporting-text-color);opacity:var(--_disabled-supporting-text-opacity)}.error .supporting-text{color:var(--_error-supporting-text-color)}.error:hover .supporting-text{color:var(--_error-hover-supporting-text-color)}.error.focus .supporting-text{color:var(--_error-focus-supporting-text-color)}}@layer hcm{@media(forced-colors: active){.disabled .supporting-text{color:GrayText;opacity:1}}}
`;/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let gt=class extends oi{};gt.styles=[Lr,ii];gt=l([_("md-filled-field")],gt);/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const ai=m`:host{--_active-indicator-color: var(--md-filled-text-field-active-indicator-color, var(--md-sys-color-on-surface-variant, #49454f));--_active-indicator-height: var(--md-filled-text-field-active-indicator-height, 1px);--_caret-color: var(--md-filled-text-field-caret-color, var(--md-sys-color-primary, #6750a4));--_container-color: var(--md-filled-text-field-container-color, var(--md-sys-color-surface-container-highest, #e6e0e9));--_disabled-active-indicator-color: var(--md-filled-text-field-disabled-active-indicator-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-active-indicator-height: var(--md-filled-text-field-disabled-active-indicator-height, 1px);--_disabled-active-indicator-opacity: var(--md-filled-text-field-disabled-active-indicator-opacity, 0.38);--_disabled-container-color: var(--md-filled-text-field-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-container-opacity: var(--md-filled-text-field-disabled-container-opacity, 0.04);--_disabled-input-text-color: var(--md-filled-text-field-disabled-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-input-text-opacity: var(--md-filled-text-field-disabled-input-text-opacity, 0.38);--_disabled-label-text-color: var(--md-filled-text-field-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-filled-text-field-disabled-label-text-opacity, 0.38);--_disabled-leading-icon-color: var(--md-filled-text-field-disabled-leading-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-leading-icon-opacity: var(--md-filled-text-field-disabled-leading-icon-opacity, 0.38);--_disabled-supporting-text-color: var(--md-filled-text-field-disabled-supporting-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-supporting-text-opacity: var(--md-filled-text-field-disabled-supporting-text-opacity, 0.38);--_disabled-trailing-icon-color: var(--md-filled-text-field-disabled-trailing-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-trailing-icon-opacity: var(--md-filled-text-field-disabled-trailing-icon-opacity, 0.38);--_error-active-indicator-color: var(--md-filled-text-field-error-active-indicator-color, var(--md-sys-color-error, #b3261e));--_error-focus-active-indicator-color: var(--md-filled-text-field-error-focus-active-indicator-color, var(--md-sys-color-error, #b3261e));--_error-focus-caret-color: var(--md-filled-text-field-error-focus-caret-color, var(--md-sys-color-error, #b3261e));--_error-focus-input-text-color: var(--md-filled-text-field-error-focus-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_error-focus-label-text-color: var(--md-filled-text-field-error-focus-label-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-leading-icon-color: var(--md-filled-text-field-error-focus-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-focus-supporting-text-color: var(--md-filled-text-field-error-focus-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-trailing-icon-color: var(--md-filled-text-field-error-focus-trailing-icon-color, var(--md-sys-color-error, #b3261e));--_error-hover-active-indicator-color: var(--md-filled-text-field-error-hover-active-indicator-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-input-text-color: var(--md-filled-text-field-error-hover-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_error-hover-label-text-color: var(--md-filled-text-field-error-hover-label-text-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-leading-icon-color: var(--md-filled-text-field-error-hover-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-hover-state-layer-color: var(--md-filled-text-field-error-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_error-hover-state-layer-opacity: var(--md-filled-text-field-error-hover-state-layer-opacity, 0.08);--_error-hover-supporting-text-color: var(--md-filled-text-field-error-hover-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-hover-trailing-icon-color: var(--md-filled-text-field-error-hover-trailing-icon-color, var(--md-sys-color-on-error-container, #410e0b));--_error-input-text-color: var(--md-filled-text-field-error-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_error-label-text-color: var(--md-filled-text-field-error-label-text-color, var(--md-sys-color-error, #b3261e));--_error-leading-icon-color: var(--md-filled-text-field-error-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-supporting-text-color: var(--md-filled-text-field-error-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-trailing-icon-color: var(--md-filled-text-field-error-trailing-icon-color, var(--md-sys-color-error, #b3261e));--_focus-active-indicator-color: var(--md-filled-text-field-focus-active-indicator-color, var(--md-sys-color-primary, #6750a4));--_focus-active-indicator-height: var(--md-filled-text-field-focus-active-indicator-height, 3px);--_focus-input-text-color: var(--md-filled-text-field-focus-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_focus-label-text-color: var(--md-filled-text-field-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_focus-leading-icon-color: var(--md-filled-text-field-focus-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-supporting-text-color: var(--md-filled-text-field-focus-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-trailing-icon-color: var(--md-filled-text-field-focus-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-active-indicator-color: var(--md-filled-text-field-hover-active-indicator-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-active-indicator-height: var(--md-filled-text-field-hover-active-indicator-height, 1px);--_hover-input-text-color: var(--md-filled-text-field-hover-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-label-text-color: var(--md-filled-text-field-hover-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-leading-icon-color: var(--md-filled-text-field-hover-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-color: var(--md-filled-text-field-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-state-layer-opacity: var(--md-filled-text-field-hover-state-layer-opacity, 0.08);--_hover-supporting-text-color: var(--md-filled-text-field-hover-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-trailing-icon-color: var(--md-filled-text-field-hover-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-color: var(--md-filled-text-field-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_input-text-font: var(--md-filled-text-field-input-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_input-text-line-height: var(--md-filled-text-field-input-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_input-text-placeholder-color: var(--md-filled-text-field-input-text-placeholder-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-prefix-color: var(--md-filled-text-field-input-text-prefix-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-size: var(--md-filled-text-field-input-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_input-text-suffix-color: var(--md-filled-text-field-input-text-suffix-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-weight: var(--md-filled-text-field-input-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_label-text-color: var(--md-filled-text-field-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-font: var(--md-filled-text-field-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-filled-text-field-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_label-text-populated-line-height: var(--md-filled-text-field-label-text-populated-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_label-text-populated-size: var(--md-filled-text-field-label-text-populated-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_label-text-size: var(--md-filled-text-field-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_label-text-weight: var(--md-filled-text-field-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_leading-icon-color: var(--md-filled-text-field-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_leading-icon-size: var(--md-filled-text-field-leading-icon-size, 24px);--_supporting-text-color: var(--md-filled-text-field-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_supporting-text-font: var(--md-filled-text-field-supporting-text-font, var(--md-sys-typescale-body-small-font, var(--md-ref-typeface-plain, Roboto)));--_supporting-text-line-height: var(--md-filled-text-field-supporting-text-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_supporting-text-size: var(--md-filled-text-field-supporting-text-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_supporting-text-weight: var(--md-filled-text-field-supporting-text-weight, var(--md-sys-typescale-body-small-weight, var(--md-ref-typeface-weight-regular, 400)));--_trailing-icon-color: var(--md-filled-text-field-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_trailing-icon-size: var(--md-filled-text-field-trailing-icon-size, 24px);--_container-shape-start-start: var(--md-filled-text-field-container-shape-start-start, var(--md-filled-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-start-end: var(--md-filled-text-field-container-shape-start-end, var(--md-filled-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-end-end: var(--md-filled-text-field-container-shape-end-end, var(--md-filled-text-field-container-shape, var(--md-sys-shape-corner-none, 0px)));--_container-shape-end-start: var(--md-filled-text-field-container-shape-end-start, var(--md-filled-text-field-container-shape, var(--md-sys-shape-corner-none, 0px)));--_icon-input-space: var(--md-filled-text-field-icon-input-space, 16px);--_leading-space: var(--md-filled-text-field-leading-space, 16px);--_trailing-space: var(--md-filled-text-field-trailing-space, 16px);--_top-space: var(--md-filled-text-field-top-space, 16px);--_bottom-space: var(--md-filled-text-field-bottom-space, 16px);--_input-text-prefix-trailing-space: var(--md-filled-text-field-input-text-prefix-trailing-space, 2px);--_input-text-suffix-leading-space: var(--md-filled-text-field-input-text-suffix-leading-space, 2px);--_with-label-top-space: var(--md-filled-text-field-with-label-top-space, 8px);--_with-label-bottom-space: var(--md-filled-text-field-with-label-bottom-space, 8px);--_focus-caret-color: var(--md-filled-text-field-focus-caret-color, var(--md-sys-color-primary, #6750a4));--_with-leading-icon-leading-space: var(--md-filled-text-field-with-leading-icon-leading-space, 12px);--_with-trailing-icon-trailing-space: var(--md-filled-text-field-with-trailing-icon-trailing-space, 12px);--md-filled-field-active-indicator-color: var(--_active-indicator-color);--md-filled-field-active-indicator-height: var(--_active-indicator-height);--md-filled-field-bottom-space: var(--_bottom-space);--md-filled-field-container-color: var(--_container-color);--md-filled-field-container-shape-end-end: var(--_container-shape-end-end);--md-filled-field-container-shape-end-start: var(--_container-shape-end-start);--md-filled-field-container-shape-start-end: var(--_container-shape-start-end);--md-filled-field-container-shape-start-start: var(--_container-shape-start-start);--md-filled-field-content-color: var(--_input-text-color);--md-filled-field-content-font: var(--_input-text-font);--md-filled-field-content-line-height: var(--_input-text-line-height);--md-filled-field-content-size: var(--_input-text-size);--md-filled-field-content-space: var(--_icon-input-space);--md-filled-field-content-weight: var(--_input-text-weight);--md-filled-field-disabled-active-indicator-color: var(--_disabled-active-indicator-color);--md-filled-field-disabled-active-indicator-height: var(--_disabled-active-indicator-height);--md-filled-field-disabled-active-indicator-opacity: var(--_disabled-active-indicator-opacity);--md-filled-field-disabled-container-color: var(--_disabled-container-color);--md-filled-field-disabled-container-opacity: var(--_disabled-container-opacity);--md-filled-field-disabled-content-color: var(--_disabled-input-text-color);--md-filled-field-disabled-content-opacity: var(--_disabled-input-text-opacity);--md-filled-field-disabled-label-text-color: var(--_disabled-label-text-color);--md-filled-field-disabled-label-text-opacity: var(--_disabled-label-text-opacity);--md-filled-field-disabled-leading-content-color: var(--_disabled-leading-icon-color);--md-filled-field-disabled-leading-content-opacity: var(--_disabled-leading-icon-opacity);--md-filled-field-disabled-supporting-text-color: var(--_disabled-supporting-text-color);--md-filled-field-disabled-supporting-text-opacity: var(--_disabled-supporting-text-opacity);--md-filled-field-disabled-trailing-content-color: var(--_disabled-trailing-icon-color);--md-filled-field-disabled-trailing-content-opacity: var(--_disabled-trailing-icon-opacity);--md-filled-field-error-active-indicator-color: var(--_error-active-indicator-color);--md-filled-field-error-content-color: var(--_error-input-text-color);--md-filled-field-error-focus-active-indicator-color: var(--_error-focus-active-indicator-color);--md-filled-field-error-focus-content-color: var(--_error-focus-input-text-color);--md-filled-field-error-focus-label-text-color: var(--_error-focus-label-text-color);--md-filled-field-error-focus-leading-content-color: var(--_error-focus-leading-icon-color);--md-filled-field-error-focus-supporting-text-color: var(--_error-focus-supporting-text-color);--md-filled-field-error-focus-trailing-content-color: var(--_error-focus-trailing-icon-color);--md-filled-field-error-hover-active-indicator-color: var(--_error-hover-active-indicator-color);--md-filled-field-error-hover-content-color: var(--_error-hover-input-text-color);--md-filled-field-error-hover-label-text-color: var(--_error-hover-label-text-color);--md-filled-field-error-hover-leading-content-color: var(--_error-hover-leading-icon-color);--md-filled-field-error-hover-state-layer-color: var(--_error-hover-state-layer-color);--md-filled-field-error-hover-state-layer-opacity: var(--_error-hover-state-layer-opacity);--md-filled-field-error-hover-supporting-text-color: var(--_error-hover-supporting-text-color);--md-filled-field-error-hover-trailing-content-color: var(--_error-hover-trailing-icon-color);--md-filled-field-error-label-text-color: var(--_error-label-text-color);--md-filled-field-error-leading-content-color: var(--_error-leading-icon-color);--md-filled-field-error-supporting-text-color: var(--_error-supporting-text-color);--md-filled-field-error-trailing-content-color: var(--_error-trailing-icon-color);--md-filled-field-focus-active-indicator-color: var(--_focus-active-indicator-color);--md-filled-field-focus-active-indicator-height: var(--_focus-active-indicator-height);--md-filled-field-focus-content-color: var(--_focus-input-text-color);--md-filled-field-focus-label-text-color: var(--_focus-label-text-color);--md-filled-field-focus-leading-content-color: var(--_focus-leading-icon-color);--md-filled-field-focus-supporting-text-color: var(--_focus-supporting-text-color);--md-filled-field-focus-trailing-content-color: var(--_focus-trailing-icon-color);--md-filled-field-hover-active-indicator-color: var(--_hover-active-indicator-color);--md-filled-field-hover-active-indicator-height: var(--_hover-active-indicator-height);--md-filled-field-hover-content-color: var(--_hover-input-text-color);--md-filled-field-hover-label-text-color: var(--_hover-label-text-color);--md-filled-field-hover-leading-content-color: var(--_hover-leading-icon-color);--md-filled-field-hover-state-layer-color: var(--_hover-state-layer-color);--md-filled-field-hover-state-layer-opacity: var(--_hover-state-layer-opacity);--md-filled-field-hover-supporting-text-color: var(--_hover-supporting-text-color);--md-filled-field-hover-trailing-content-color: var(--_hover-trailing-icon-color);--md-filled-field-label-text-color: var(--_label-text-color);--md-filled-field-label-text-font: var(--_label-text-font);--md-filled-field-label-text-line-height: var(--_label-text-line-height);--md-filled-field-label-text-populated-line-height: var(--_label-text-populated-line-height);--md-filled-field-label-text-populated-size: var(--_label-text-populated-size);--md-filled-field-label-text-size: var(--_label-text-size);--md-filled-field-label-text-weight: var(--_label-text-weight);--md-filled-field-leading-content-color: var(--_leading-icon-color);--md-filled-field-leading-space: var(--_leading-space);--md-filled-field-supporting-text-color: var(--_supporting-text-color);--md-filled-field-supporting-text-font: var(--_supporting-text-font);--md-filled-field-supporting-text-line-height: var(--_supporting-text-line-height);--md-filled-field-supporting-text-size: var(--_supporting-text-size);--md-filled-field-supporting-text-weight: var(--_supporting-text-weight);--md-filled-field-top-space: var(--_top-space);--md-filled-field-trailing-content-color: var(--_trailing-icon-color);--md-filled-field-trailing-space: var(--_trailing-space);--md-filled-field-with-label-bottom-space: var(--_with-label-bottom-space);--md-filled-field-with-label-top-space: var(--_with-label-top-space);--md-filled-field-with-leading-content-leading-space: var(--_with-leading-icon-leading-space);--md-filled-field-with-trailing-content-trailing-space: var(--_with-trailing-icon-trailing-space)}
`;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const si=r=>r.strings===void 0,li={},ni=(r,e=li)=>r._$AH=e;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const fr=qt(class extends Kt{constructor(r){if(super(r),r.type!==G.PROPERTY&&r.type!==G.ATTRIBUTE&&r.type!==G.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!si(r))throw Error("`live` bindings can only contain a single expression")}render(r){return r}update(r,[e]){if(e===R||e===h)return e;const t=r.element,o=r.name;if(r.type===G.PROPERTY){if(e===t[o])return R}else if(r.type===G.BOOLEAN_ATTRIBUTE){if(!!e===t.hasAttribute(o))return R}else if(r.type===G.ATTRIBUTE&&t.getAttribute(o)===e+"")return R;return ni(r),e}});/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Or="important",di=" !"+Or,mr=qt(class extends Kt{constructor(r){var e;if(super(r),r.type!==G.ATTRIBUTE||r.name!=="style"||((e=r.strings)==null?void 0:e.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(r){return Object.keys(r).reduce((e,t)=>{const o=r[t];return o==null?e:e+`${t=t.includes("-")?t:t.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${o};`},"")}update(r,[e]){const{style:t}=r.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(e)),this.render(e);for(const o of this.ft)e[o]==null&&(this.ft.delete(o),o.includes("-")?t.removeProperty(o):t[o]=null);for(const o in e){const i=e[o];if(i!=null){this.ft.add(o);const a=typeof i=="string"&&i.endsWith(di);o.includes("-")||a?t.setProperty(o,a?i.slice(0,-11):i,a?Or:""):t[o]=i}}return R}});/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const ci={fromAttribute(r){return r??""},toAttribute(r){return r||null}};/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function Zt(r,e){e.bubbles&&(!r.shadowRoot||e.composed)&&e.stopPropagation();const t=Reflect.construct(e.constructor,[e.type,e]),o=r.dispatchEvent(t);return o||e.preventDefault(),o}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const yt=Symbol("createValidator"),xt=Symbol("getValidityAnchor"),it=Symbol("privateValidator"),H=Symbol("privateSyncValidity"),Te=Symbol("privateCustomValidationMessage");function pi(r){var e;class t extends r{constructor(){super(...arguments),this[e]=""}get validity(){return this[H](),this[z].validity}get validationMessage(){return this[H](),this[z].validationMessage}get willValidate(){return this[H](),this[z].willValidate}checkValidity(){return this[H](),this[z].checkValidity()}reportValidity(){return this[H](),this[z].reportValidity()}setCustomValidity(i){this[Te]=i,this[H]()}requestUpdate(i,a,s){super.requestUpdate(i,a,s),this[H]()}firstUpdated(i){super.firstUpdated(i),this[H]()}[(e=Te,H)](){this[it]||(this[it]=this[yt]());const{validity:i,validationMessage:a}=this[it].getValidity(),s=!!this[Te],n=this[Te]||a;this[z].setValidity({...i,customError:s},n,this[xt]()??void 0)}[yt](){throw new Error("Implement [createValidator]")}[xt](){throw new Error("Implement [getValidityAnchor]")}}return t}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const He=Symbol("getFormValue"),br=Symbol("getFormState");function hi(r){class e extends r{get form(){return this[z].form}get labels(){return this[z].labels}get name(){return this.getAttribute("name")??""}set name(o){this.setAttribute("name",o)}get disabled(){return this.hasAttribute("disabled")}set disabled(o){this.toggleAttribute("disabled",o)}attributeChangedCallback(o,i,a){if(o==="name"||o==="disabled"){const s=o==="disabled"?i!==null:i;this.requestUpdate(o,s);return}super.attributeChangedCallback(o,i,a)}requestUpdate(o,i,a){super.requestUpdate(o,i,a),this[z].setFormValue(this[He](),this[br]())}[He](){throw new Error("Implement [getFormValue]")}[br](){return this[He]()}formDisabledCallback(o){this.disabled=o}}return e.formAssociated=!0,l([p({noAccessor:!0})],e.prototype,"name",null),l([p({type:Boolean,noAccessor:!0})],e.prototype,"disabled",null),e}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const _t=Symbol("onReportValidity"),Se=Symbol("privateCleanupFormListeners"),Fe=Symbol("privateDoNotReportInvalid"),Re=Symbol("privateIsSelfReportingValidity"),Le=Symbol("privateCallOnReportValidity");function ui(r){var e,t,o;class i extends r{constructor(...s){super(...s),this[e]=new AbortController,this[t]=!1,this[o]=!1,this.addEventListener("invalid",n=>{this[Fe]||!n.isTrusted||this.addEventListener("invalid",()=>{this[Le](n)},{once:!0})},{capture:!0})}checkValidity(){this[Fe]=!0;const s=super.checkValidity();return this[Fe]=!1,s}reportValidity(){this[Re]=!0;const s=super.reportValidity();return s&&this[Le](null),this[Re]=!1,s}[(e=Se,t=Fe,o=Re,Le)](s){const n=s==null?void 0:s.defaultPrevented;n||(this[_t](s),!(!n&&(s==null?void 0:s.defaultPrevented)))||(this[Re]||mi(this[z].form,this))&&this.focus()}[_t](s){throw new Error("Implement [onReportValidity]")}formAssociatedCallback(s){super.formAssociatedCallback&&super.formAssociatedCallback(s),this[Se].abort(),s&&(this[Se]=new AbortController,vi(this,s,()=>{this[Le](null)},this[Se].signal))}}return i}function vi(r,e,t,o){const i=fi(e);let a=!1,s,n=!1;i.addEventListener("before",()=>{n=!0,s=new AbortController,a=!1,r.addEventListener("invalid",()=>{a=!0},{signal:s.signal})},{signal:o}),i.addEventListener("after",()=>{n=!1,s==null||s.abort(),!a&&t()},{signal:o}),e.addEventListener("submit",()=>{n||t()},{signal:o})}const at=new WeakMap;function fi(r){if(!at.has(r)){const e=new EventTarget;at.set(r,e);for(const t of["reportValidity","requestSubmit"]){const o=r[t];r[t]=function(){e.dispatchEvent(new Event("before"));const i=Reflect.apply(o,this,arguments);return e.dispatchEvent(new Event("after")),i}}}return at.get(r)}function mi(r,e){if(!r)return!0;let t;for(const o of r.elements)if(o.matches(":invalid")){t=o;break}return t===e}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class bi{constructor(e){this.getCurrentState=e,this.currentValidity={validity:{},validationMessage:""}}getValidity(){const e=this.getCurrentState();if(!(!this.prevState||!this.equals(this.prevState,e)))return this.currentValidity;const{validity:o,validationMessage:i}=this.computeValidity(e);return this.prevState=this.copy(e),this.currentValidity={validationMessage:i,validity:{badInput:o.badInput,customError:o.customError,patternMismatch:o.patternMismatch,rangeOverflow:o.rangeOverflow,rangeUnderflow:o.rangeUnderflow,stepMismatch:o.stepMismatch,tooLong:o.tooLong,tooShort:o.tooShort,typeMismatch:o.typeMismatch,valueMissing:o.valueMissing}},this.currentValidity}}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class gi extends bi{computeValidity({state:e,renderedControl:t}){let o=t;fe(e)&&!o?(o=this.inputControl||document.createElement("input"),this.inputControl=o):o||(o=this.textAreaControl||document.createElement("textarea"),this.textAreaControl=o);const i=fe(e)?o:null;if(i&&(i.type=e.type),o.value!==e.value&&(o.value=e.value),o.required=e.required,i){const a=e;a.pattern?i.pattern=a.pattern:i.removeAttribute("pattern"),a.min?i.min=a.min:i.removeAttribute("min"),a.max?i.max=a.max:i.removeAttribute("max"),a.step?i.step=a.step:i.removeAttribute("step")}return(e.minLength??-1)>-1?o.setAttribute("minlength",String(e.minLength)):o.removeAttribute("minlength"),(e.maxLength??-1)>-1?o.setAttribute("maxlength",String(e.maxLength)):o.removeAttribute("maxlength"),{validity:o.validity,validationMessage:o.validationMessage}}equals({state:e},{state:t}){const o=e.type===t.type&&e.value===t.value&&e.required===t.required&&e.minLength===t.minLength&&e.maxLength===t.maxLength;return!fe(e)||!fe(t)?o:o&&e.pattern===t.pattern&&e.min===t.min&&e.max===t.max&&e.step===t.step}copy({state:e}){return{state:fe(e)?this.copyInput(e):this.copyTextArea(e),renderedControl:null}}copyInput(e){const{type:t,pattern:o,min:i,max:a,step:s}=e;return{...this.copySharedState(e),type:t,pattern:o,min:i,max:a,step:s}}copyTextArea(e){return{...this.copySharedState(e),type:e.type}}copySharedState({value:e,required:t,minLength:o,maxLength:i}){return{value:e,required:t,minLength:o,maxLength:i}}}function fe(r){return r.type!=="textarea"}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const yi=X(ui(pi(hi(Gt(x)))));class y extends yi{constructor(){super(...arguments),this.error=!1,this.errorText="",this.label="",this.noAsterisk=!1,this.required=!1,this.value="",this.prefixText="",this.suffixText="",this.hasLeadingIcon=!1,this.hasTrailingIcon=!1,this.supportingText="",this.textDirection="",this.rows=2,this.cols=20,this.inputMode="",this.max="",this.maxLength=-1,this.min="",this.minLength=-1,this.noSpinner=!1,this.pattern="",this.placeholder="",this.readOnly=!1,this.multiple=!1,this.step="",this.type="text",this.autocomplete="",this.dirty=!1,this.focused=!1,this.nativeError=!1,this.nativeErrorText=""}get selectionDirection(){return this.getInputOrTextarea().selectionDirection}set selectionDirection(e){this.getInputOrTextarea().selectionDirection=e}get selectionEnd(){return this.getInputOrTextarea().selectionEnd}set selectionEnd(e){this.getInputOrTextarea().selectionEnd=e}get selectionStart(){return this.getInputOrTextarea().selectionStart}set selectionStart(e){this.getInputOrTextarea().selectionStart=e}get valueAsNumber(){const e=this.getInput();return e?e.valueAsNumber:NaN}set valueAsNumber(e){const t=this.getInput();t&&(t.valueAsNumber=e,this.value=t.value)}get valueAsDate(){const e=this.getInput();return e?e.valueAsDate:null}set valueAsDate(e){const t=this.getInput();t&&(t.valueAsDate=e,this.value=t.value)}get hasError(){return this.error||this.nativeError}select(){this.getInputOrTextarea().select()}setRangeText(...e){this.getInputOrTextarea().setRangeText(...e),this.value=this.getInputOrTextarea().value}setSelectionRange(e,t,o){this.getInputOrTextarea().setSelectionRange(e,t,o)}showPicker(){const e=this.getInput();e&&e.showPicker()}stepDown(e){const t=this.getInput();t&&(t.stepDown(e),this.value=t.value)}stepUp(e){const t=this.getInput();t&&(t.stepUp(e),this.value=t.value)}reset(){this.dirty=!1,this.value=this.getAttribute("value")??"",this.nativeError=!1,this.nativeErrorText=""}attributeChangedCallback(e,t,o){e==="value"&&this.dirty||super.attributeChangedCallback(e,t,o)}render(){const e={disabled:this.disabled,error:!this.disabled&&this.hasError,textarea:this.type==="textarea","no-spinner":this.noSpinner};return d`
      <span class="text-field ${L(e)}">
        ${this.renderField()}
      </span>
    `}updated(e){const t=this.getInputOrTextarea().value;this.value!==t&&(this.value=t)}renderField(){return Yt`<${this.fieldTag}
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
    </${this.fieldTag}>`}renderLeadingIcon(){return d`
      <span class="icon leading" slot="start">
        <slot name="leading-icon" @slotchange=${this.handleIconChange}></slot>
      </span>
    `}renderTrailingIcon(){return d`
      <span class="icon trailing" slot="end">
        <slot name="trailing-icon" @slotchange=${this.handleIconChange}></slot>
      </span>
    `}renderInputOrTextarea(){const e={direction:this.textDirection},t=this.ariaLabel||this.label||h,o=this.autocomplete,i=(this.maxLength??-1)>-1,a=(this.minLength??-1)>-1;if(this.type==="textarea")return d`
        <textarea
          class="input"
          style=${mr(e)}
          aria-describedby="description"
          aria-invalid=${this.hasError}
          aria-label=${t}
          autocomplete=${o||h}
          name=${this.name||h}
          ?disabled=${this.disabled}
          maxlength=${i?this.maxLength:h}
          minlength=${a?this.minLength:h}
          placeholder=${this.placeholder||h}
          ?readonly=${this.readOnly}
          ?required=${this.required}
          rows=${this.rows}
          cols=${this.cols}
          .value=${fr(this.value)}
          @change=${this.redispatchEvent}
          @focus=${this.handleFocusChange}
          @blur=${this.handleFocusChange}
          @input=${this.handleInput}
          @select=${this.redispatchEvent}></textarea>
      `;const s=this.renderPrefix(),n=this.renderSuffix(),c=this.inputMode;return d`
      <div class="input-wrapper">
        ${s}
        <input
          class="input"
          style=${mr(e)}
          aria-describedby="description"
          aria-invalid=${this.hasError}
          aria-label=${t}
          autocomplete=${o||h}
          name=${this.name||h}
          ?disabled=${this.disabled}
          inputmode=${c||h}
          max=${this.max||h}
          maxlength=${i?this.maxLength:h}
          min=${this.min||h}
          minlength=${a?this.minLength:h}
          pattern=${this.pattern||h}
          placeholder=${this.placeholder||h}
          ?readonly=${this.readOnly}
          ?required=${this.required}
          ?multiple=${this.multiple}
          step=${this.step||h}
          type=${this.type}
          .value=${fr(this.value)}
          @change=${this.redispatchEvent}
          @focus=${this.handleFocusChange}
          @blur=${this.handleFocusChange}
          @input=${this.handleInput}
          @select=${this.redispatchEvent} />
        ${n}
      </div>
    `}renderPrefix(){return this.renderAffix(this.prefixText,!1)}renderSuffix(){return this.renderAffix(this.suffixText,!0)}renderAffix(e,t){return e?d`<span class="${L({suffix:t,prefix:!t})}">${e}</span>`:h}getErrorText(){return this.error?this.errorText:this.nativeErrorText}handleFocusChange(){var e;this.focused=((e=this.inputOrTextarea)==null?void 0:e.matches(":focus"))??!1}handleInput(e){this.dirty=!0,this.value=e.target.value}redispatchEvent(e){Zt(this,e)}getInputOrTextarea(){return this.inputOrTextarea||(this.connectedCallback(),this.scheduleUpdate()),this.isUpdatePending&&this.scheduleUpdate(),this.inputOrTextarea}getInput(){return this.type==="textarea"?null:this.getInputOrTextarea()}handleIconChange(){this.hasLeadingIcon=this.leadingIcons.length>0,this.hasTrailingIcon=this.trailingIcons.length>0}[He](){return this.value}formResetCallback(){this.reset()}formStateRestoreCallback(e){this.value=e}focus(){this.getInputOrTextarea().focus()}[yt](){return new gi(()=>({state:this,renderedControl:this.inputOrTextarea}))}[xt](){return this.inputOrTextarea}[_t](e){var o;e==null||e.preventDefault();const t=this.getErrorText();this.nativeError=!!e,this.nativeErrorText=this.validationMessage,t===this.getErrorText()&&((o=this.field)==null||o.reannounceError())}}y.shadowRootOptions={...x.shadowRootOptions,delegatesFocus:!0};l([p({type:Boolean,reflect:!0})],y.prototype,"error",void 0);l([p({attribute:"error-text"})],y.prototype,"errorText",void 0);l([p()],y.prototype,"label",void 0);l([p({type:Boolean,attribute:"no-asterisk"})],y.prototype,"noAsterisk",void 0);l([p({type:Boolean,reflect:!0})],y.prototype,"required",void 0);l([p()],y.prototype,"value",void 0);l([p({attribute:"prefix-text"})],y.prototype,"prefixText",void 0);l([p({attribute:"suffix-text"})],y.prototype,"suffixText",void 0);l([p({type:Boolean,attribute:"has-leading-icon"})],y.prototype,"hasLeadingIcon",void 0);l([p({type:Boolean,attribute:"has-trailing-icon"})],y.prototype,"hasTrailingIcon",void 0);l([p({attribute:"supporting-text"})],y.prototype,"supportingText",void 0);l([p({attribute:"text-direction"})],y.prototype,"textDirection",void 0);l([p({type:Number})],y.prototype,"rows",void 0);l([p({type:Number})],y.prototype,"cols",void 0);l([p({reflect:!0})],y.prototype,"inputMode",void 0);l([p()],y.prototype,"max",void 0);l([p({type:Number})],y.prototype,"maxLength",void 0);l([p()],y.prototype,"min",void 0);l([p({type:Number})],y.prototype,"minLength",void 0);l([p({type:Boolean,attribute:"no-spinner"})],y.prototype,"noSpinner",void 0);l([p()],y.prototype,"pattern",void 0);l([p({reflect:!0,converter:ci})],y.prototype,"placeholder",void 0);l([p({type:Boolean,reflect:!0})],y.prototype,"readOnly",void 0);l([p({type:Boolean,reflect:!0})],y.prototype,"multiple",void 0);l([p()],y.prototype,"step",void 0);l([p({reflect:!0})],y.prototype,"type",void 0);l([p({reflect:!0})],y.prototype,"autocomplete",void 0);l([g()],y.prototype,"dirty",void 0);l([g()],y.prototype,"focused",void 0);l([g()],y.prototype,"nativeError",void 0);l([g()],y.prototype,"nativeErrorText",void 0);l([$(".input")],y.prototype,"inputOrTextarea",void 0);l([$(".field")],y.prototype,"field",void 0);l([Z({slot:"leading-icon"})],y.prototype,"leadingIcons",void 0);l([Z({slot:"trailing-icon"})],y.prototype,"trailingIcons",void 0);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class xi extends y{constructor(){super(...arguments),this.fieldTag=j`md-filled-field`}}/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Pr=m`:host{display:inline-flex;outline:none;resize:both;text-align:start;-webkit-tap-highlight-color:rgba(0,0,0,0)}.text-field,.field{width:100%}.text-field{display:inline-flex}.field{cursor:text}.disabled .field{cursor:default}.text-field,.textarea .field{resize:inherit}slot[name=container]{border-radius:inherit}.icon{color:currentColor;display:flex;align-items:center;justify-content:center;fill:currentColor;position:relative}.icon ::slotted(*){display:flex;position:absolute}[has-start] .icon.leading{font-size:var(--_leading-icon-size);height:var(--_leading-icon-size);width:var(--_leading-icon-size)}[has-end] .icon.trailing{font-size:var(--_trailing-icon-size);height:var(--_trailing-icon-size);width:var(--_trailing-icon-size)}.input-wrapper{display:flex}.input-wrapper>*{all:inherit;padding:0}.input{caret-color:var(--_caret-color);overflow-x:hidden;text-align:inherit}.input::placeholder{color:currentColor;opacity:1}.input::-webkit-calendar-picker-indicator{display:none}.input::-webkit-search-decoration,.input::-webkit-search-cancel-button{display:none}@media(forced-colors: active){.input{background:none}}.no-spinner .input::-webkit-inner-spin-button,.no-spinner .input::-webkit-outer-spin-button{display:none}.no-spinner .input[type=number]{-moz-appearance:textfield}:focus-within .input{caret-color:var(--_focus-caret-color)}.error:focus-within .input{caret-color:var(--_error-focus-caret-color)}.text-field:not(.disabled) .prefix{color:var(--_input-text-prefix-color)}.text-field:not(.disabled) .suffix{color:var(--_input-text-suffix-color)}.text-field:not(.disabled) .input::placeholder{color:var(--_input-text-placeholder-color)}.prefix,.suffix{text-wrap:nowrap;width:min-content}.prefix{padding-inline-end:var(--_input-text-prefix-trailing-space)}.suffix{padding-inline-start:var(--_input-text-suffix-leading-space)}
`;/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let wt=class extends xi{constructor(){super(...arguments),this.fieldTag=j`md-filled-field`}};wt.styles=[Pr,ai];wt=l([_("md-filled-text-field")],wt);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class _i extends C{renderOutline(e){return d`
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
 */const wi=m`@layer styles{:host{--_bottom-space: var(--md-outlined-field-bottom-space, 16px);--_content-color: var(--md-outlined-field-content-color, var(--md-sys-color-on-surface, #1d1b20));--_content-font: var(--md-outlined-field-content-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_content-line-height: var(--md-outlined-field-content-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_content-size: var(--md-outlined-field-content-size, var(--md-sys-typescale-body-large-size, 1rem));--_content-space: var(--md-outlined-field-content-space, 16px);--_content-weight: var(--md-outlined-field-content-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_disabled-content-color: var(--md-outlined-field-disabled-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-content-opacity: var(--md-outlined-field-disabled-content-opacity, 0.38);--_disabled-label-text-color: var(--md-outlined-field-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-outlined-field-disabled-label-text-opacity, 0.38);--_disabled-leading-content-color: var(--md-outlined-field-disabled-leading-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-leading-content-opacity: var(--md-outlined-field-disabled-leading-content-opacity, 0.38);--_disabled-outline-color: var(--md-outlined-field-disabled-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-outline-opacity: var(--md-outlined-field-disabled-outline-opacity, 0.12);--_disabled-outline-width: var(--md-outlined-field-disabled-outline-width, 1px);--_disabled-supporting-text-color: var(--md-outlined-field-disabled-supporting-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-supporting-text-opacity: var(--md-outlined-field-disabled-supporting-text-opacity, 0.38);--_disabled-trailing-content-color: var(--md-outlined-field-disabled-trailing-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-trailing-content-opacity: var(--md-outlined-field-disabled-trailing-content-opacity, 0.38);--_error-content-color: var(--md-outlined-field-error-content-color, var(--md-sys-color-on-surface, #1d1b20));--_error-focus-content-color: var(--md-outlined-field-error-focus-content-color, var(--md-sys-color-on-surface, #1d1b20));--_error-focus-label-text-color: var(--md-outlined-field-error-focus-label-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-leading-content-color: var(--md-outlined-field-error-focus-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-focus-outline-color: var(--md-outlined-field-error-focus-outline-color, var(--md-sys-color-error, #b3261e));--_error-focus-supporting-text-color: var(--md-outlined-field-error-focus-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-trailing-content-color: var(--md-outlined-field-error-focus-trailing-content-color, var(--md-sys-color-error, #b3261e));--_error-hover-content-color: var(--md-outlined-field-error-hover-content-color, var(--md-sys-color-on-surface, #1d1b20));--_error-hover-label-text-color: var(--md-outlined-field-error-hover-label-text-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-leading-content-color: var(--md-outlined-field-error-hover-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-hover-outline-color: var(--md-outlined-field-error-hover-outline-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-supporting-text-color: var(--md-outlined-field-error-hover-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-hover-trailing-content-color: var(--md-outlined-field-error-hover-trailing-content-color, var(--md-sys-color-on-error-container, #410e0b));--_error-label-text-color: var(--md-outlined-field-error-label-text-color, var(--md-sys-color-error, #b3261e));--_error-leading-content-color: var(--md-outlined-field-error-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-outline-color: var(--md-outlined-field-error-outline-color, var(--md-sys-color-error, #b3261e));--_error-supporting-text-color: var(--md-outlined-field-error-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-trailing-content-color: var(--md-outlined-field-error-trailing-content-color, var(--md-sys-color-error, #b3261e));--_focus-content-color: var(--md-outlined-field-focus-content-color, var(--md-sys-color-on-surface, #1d1b20));--_focus-label-text-color: var(--md-outlined-field-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_focus-leading-content-color: var(--md-outlined-field-focus-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-outline-color: var(--md-outlined-field-focus-outline-color, var(--md-sys-color-primary, #6750a4));--_focus-outline-width: var(--md-outlined-field-focus-outline-width, 3px);--_focus-supporting-text-color: var(--md-outlined-field-focus-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-trailing-content-color: var(--md-outlined-field-focus-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-content-color: var(--md-outlined-field-hover-content-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-label-text-color: var(--md-outlined-field-hover-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-leading-content-color: var(--md-outlined-field-hover-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-outline-color: var(--md-outlined-field-hover-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-outline-width: var(--md-outlined-field-hover-outline-width, 1px);--_hover-supporting-text-color: var(--md-outlined-field-hover-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-trailing-content-color: var(--md-outlined-field-hover-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-color: var(--md-outlined-field-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-font: var(--md-outlined-field-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-outlined-field-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_label-text-padding-bottom: var(--md-outlined-field-label-text-padding-bottom, 8px);--_label-text-populated-line-height: var(--md-outlined-field-label-text-populated-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_label-text-populated-size: var(--md-outlined-field-label-text-populated-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_label-text-size: var(--md-outlined-field-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_label-text-weight: var(--md-outlined-field-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_leading-content-color: var(--md-outlined-field-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_leading-space: var(--md-outlined-field-leading-space, 16px);--_outline-color: var(--md-outlined-field-outline-color, var(--md-sys-color-outline, #79747e));--_outline-label-padding: var(--md-outlined-field-outline-label-padding, 4px);--_outline-width: var(--md-outlined-field-outline-width, 1px);--_supporting-text-color: var(--md-outlined-field-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_supporting-text-font: var(--md-outlined-field-supporting-text-font, var(--md-sys-typescale-body-small-font, var(--md-ref-typeface-plain, Roboto)));--_supporting-text-leading-space: var(--md-outlined-field-supporting-text-leading-space, 16px);--_supporting-text-line-height: var(--md-outlined-field-supporting-text-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_supporting-text-size: var(--md-outlined-field-supporting-text-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_supporting-text-top-space: var(--md-outlined-field-supporting-text-top-space, 4px);--_supporting-text-trailing-space: var(--md-outlined-field-supporting-text-trailing-space, 16px);--_supporting-text-weight: var(--md-outlined-field-supporting-text-weight, var(--md-sys-typescale-body-small-weight, var(--md-ref-typeface-weight-regular, 400)));--_top-space: var(--md-outlined-field-top-space, 16px);--_trailing-content-color: var(--md-outlined-field-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_trailing-space: var(--md-outlined-field-trailing-space, 16px);--_with-leading-content-leading-space: var(--md-outlined-field-with-leading-content-leading-space, 12px);--_with-trailing-content-trailing-space: var(--md-outlined-field-with-trailing-content-trailing-space, 12px);--_container-shape-start-start: var(--md-outlined-field-container-shape-start-start, var(--md-outlined-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-start-end: var(--md-outlined-field-container-shape-start-end, var(--md-outlined-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-end-end: var(--md-outlined-field-container-shape-end-end, var(--md-outlined-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-end-start: var(--md-outlined-field-container-shape-end-start, var(--md-outlined-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)))}.outline{border-color:var(--_outline-color);border-radius:inherit;display:flex;pointer-events:none;height:100%;position:absolute;width:100%;z-index:1}.outline-start::before,.outline-start::after,.outline-panel-inactive::before,.outline-panel-inactive::after,.outline-panel-active::before,.outline-panel-active::after,.outline-end::before,.outline-end::after{border:inherit;content:"";inset:0;position:absolute}.outline-start,.outline-end{border:inherit;border-radius:inherit;box-sizing:border-box;position:relative}.outline-start::before,.outline-start::after,.outline-end::before,.outline-end::after{border-bottom-style:solid;border-top-style:solid}.outline-start::after,.outline-end::after{opacity:0;transition:opacity 150ms cubic-bezier(0.2, 0, 0, 1)}.focused .outline-start::after,.focused .outline-end::after{opacity:1}.outline-start::before,.outline-start::after{border-inline-start-style:solid;border-inline-end-style:none;border-start-start-radius:inherit;border-start-end-radius:0;border-end-start-radius:inherit;border-end-end-radius:0;margin-inline-end:var(--_outline-label-padding)}.outline-end{flex-grow:1;margin-inline-start:calc(-1*var(--_outline-label-padding))}.outline-end::before,.outline-end::after{border-inline-start-style:none;border-inline-end-style:solid;border-start-start-radius:0;border-start-end-radius:inherit;border-end-start-radius:0;border-end-end-radius:inherit}.outline-notch{align-items:flex-start;border:inherit;display:flex;margin-inline-start:calc(-1*var(--_outline-label-padding));margin-inline-end:var(--_outline-label-padding);max-width:calc(100% - var(--_leading-space) - var(--_trailing-space));padding:0 var(--_outline-label-padding);position:relative}.no-label .outline-notch{display:none}.outline-panel-inactive,.outline-panel-active{border:inherit;border-bottom-style:solid;inset:0;position:absolute}.outline-panel-inactive::before,.outline-panel-inactive::after,.outline-panel-active::before,.outline-panel-active::after{border-top-style:solid;border-bottom:none;bottom:auto;transform:scaleX(1);transition:transform 150ms cubic-bezier(0.2, 0, 0, 1)}.outline-panel-inactive::before,.outline-panel-active::before{right:50%;transform-origin:top left}.outline-panel-inactive::after,.outline-panel-active::after{left:50%;transform-origin:top right}.populated .outline-panel-inactive::before,.populated .outline-panel-inactive::after,.populated .outline-panel-active::before,.populated .outline-panel-active::after,.focused .outline-panel-inactive::before,.focused .outline-panel-inactive::after,.focused .outline-panel-active::before,.focused .outline-panel-active::after{transform:scaleX(0)}.outline-panel-active{opacity:0;transition:opacity 150ms cubic-bezier(0.2, 0, 0, 1)}.focused .outline-panel-active{opacity:1}.outline-label{display:flex;max-width:100%;transform:translateY(calc(-100% + var(--_label-text-padding-bottom)))}.outline-start,.field:not(.with-start) .content ::slotted(*){padding-inline-start:max(var(--_leading-space),max(var(--_container-shape-start-start),var(--_container-shape-end-start)) + var(--_outline-label-padding))}.field:not(.with-start) .label-wrapper{margin-inline-start:max(var(--_leading-space),max(var(--_container-shape-start-start),var(--_container-shape-end-start)) + var(--_outline-label-padding))}.field:not(.with-end) .content ::slotted(*){padding-inline-end:max(var(--_trailing-space),max(var(--_container-shape-start-end),var(--_container-shape-end-end)))}.field:not(.with-end) .label-wrapper{margin-inline-end:max(var(--_trailing-space),max(var(--_container-shape-start-end),var(--_container-shape-end-end)))}.outline-start::before,.outline-end::before,.outline-panel-inactive,.outline-panel-inactive::before,.outline-panel-inactive::after{border-width:var(--_outline-width)}:hover .outline{border-color:var(--_hover-outline-color);color:var(--_hover-outline-color)}:hover .outline-start::before,:hover .outline-end::before,:hover .outline-panel-inactive,:hover .outline-panel-inactive::before,:hover .outline-panel-inactive::after{border-width:var(--_hover-outline-width)}.focused .outline{border-color:var(--_focus-outline-color);color:var(--_focus-outline-color)}.outline-start::after,.outline-end::after,.outline-panel-active,.outline-panel-active::before,.outline-panel-active::after{border-width:var(--_focus-outline-width)}.disabled .outline{border-color:var(--_disabled-outline-color);color:var(--_disabled-outline-color)}.disabled .outline-start,.disabled .outline-end,.disabled .outline-panel-inactive{opacity:var(--_disabled-outline-opacity)}.disabled .outline-start::before,.disabled .outline-end::before,.disabled .outline-panel-inactive,.disabled .outline-panel-inactive::before,.disabled .outline-panel-inactive::after{border-width:var(--_disabled-outline-width)}.error .outline{border-color:var(--_error-outline-color);color:var(--_error-outline-color)}.error:hover .outline{border-color:var(--_error-hover-outline-color);color:var(--_error-hover-outline-color)}.error.focused .outline{border-color:var(--_error-focus-outline-color);color:var(--_error-focus-outline-color)}.resizable .container{bottom:var(--_focus-outline-width);inset-inline-end:var(--_focus-outline-width);clip-path:inset(var(--_focus-outline-width) 0 0 var(--_focus-outline-width))}.resizable .container>*{top:var(--_focus-outline-width);inset-inline-start:var(--_focus-outline-width)}.resizable .container:dir(rtl){clip-path:inset(var(--_focus-outline-width) var(--_focus-outline-width) 0 0)}}@layer hcm{@media(forced-colors: active){.disabled .outline{border-color:GrayText;color:GrayText}.disabled :is(.outline-start,.outline-end,.outline-panel-inactive){opacity:1}}}
`;/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let $t=class extends _i{};$t.styles=[Lr,wi];$t=l([_("md-outlined-field")],$t);/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const $i=m`:host{--_caret-color: var(--md-outlined-text-field-caret-color, var(--md-sys-color-primary, #6750a4));--_disabled-input-text-color: var(--md-outlined-text-field-disabled-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-input-text-opacity: var(--md-outlined-text-field-disabled-input-text-opacity, 0.38);--_disabled-label-text-color: var(--md-outlined-text-field-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-outlined-text-field-disabled-label-text-opacity, 0.38);--_disabled-leading-icon-color: var(--md-outlined-text-field-disabled-leading-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-leading-icon-opacity: var(--md-outlined-text-field-disabled-leading-icon-opacity, 0.38);--_disabled-outline-color: var(--md-outlined-text-field-disabled-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-outline-opacity: var(--md-outlined-text-field-disabled-outline-opacity, 0.12);--_disabled-outline-width: var(--md-outlined-text-field-disabled-outline-width, 1px);--_disabled-supporting-text-color: var(--md-outlined-text-field-disabled-supporting-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-supporting-text-opacity: var(--md-outlined-text-field-disabled-supporting-text-opacity, 0.38);--_disabled-trailing-icon-color: var(--md-outlined-text-field-disabled-trailing-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-trailing-icon-opacity: var(--md-outlined-text-field-disabled-trailing-icon-opacity, 0.38);--_error-focus-caret-color: var(--md-outlined-text-field-error-focus-caret-color, var(--md-sys-color-error, #b3261e));--_error-focus-input-text-color: var(--md-outlined-text-field-error-focus-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_error-focus-label-text-color: var(--md-outlined-text-field-error-focus-label-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-leading-icon-color: var(--md-outlined-text-field-error-focus-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-focus-outline-color: var(--md-outlined-text-field-error-focus-outline-color, var(--md-sys-color-error, #b3261e));--_error-focus-supporting-text-color: var(--md-outlined-text-field-error-focus-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-trailing-icon-color: var(--md-outlined-text-field-error-focus-trailing-icon-color, var(--md-sys-color-error, #b3261e));--_error-hover-input-text-color: var(--md-outlined-text-field-error-hover-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_error-hover-label-text-color: var(--md-outlined-text-field-error-hover-label-text-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-leading-icon-color: var(--md-outlined-text-field-error-hover-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-hover-outline-color: var(--md-outlined-text-field-error-hover-outline-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-supporting-text-color: var(--md-outlined-text-field-error-hover-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-hover-trailing-icon-color: var(--md-outlined-text-field-error-hover-trailing-icon-color, var(--md-sys-color-on-error-container, #410e0b));--_error-input-text-color: var(--md-outlined-text-field-error-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_error-label-text-color: var(--md-outlined-text-field-error-label-text-color, var(--md-sys-color-error, #b3261e));--_error-leading-icon-color: var(--md-outlined-text-field-error-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-outline-color: var(--md-outlined-text-field-error-outline-color, var(--md-sys-color-error, #b3261e));--_error-supporting-text-color: var(--md-outlined-text-field-error-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-trailing-icon-color: var(--md-outlined-text-field-error-trailing-icon-color, var(--md-sys-color-error, #b3261e));--_focus-input-text-color: var(--md-outlined-text-field-focus-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_focus-label-text-color: var(--md-outlined-text-field-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_focus-leading-icon-color: var(--md-outlined-text-field-focus-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-outline-color: var(--md-outlined-text-field-focus-outline-color, var(--md-sys-color-primary, #6750a4));--_focus-outline-width: var(--md-outlined-text-field-focus-outline-width, 3px);--_focus-supporting-text-color: var(--md-outlined-text-field-focus-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-trailing-icon-color: var(--md-outlined-text-field-focus-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-input-text-color: var(--md-outlined-text-field-hover-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-label-text-color: var(--md-outlined-text-field-hover-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-leading-icon-color: var(--md-outlined-text-field-hover-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-outline-color: var(--md-outlined-text-field-hover-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-outline-width: var(--md-outlined-text-field-hover-outline-width, 1px);--_hover-supporting-text-color: var(--md-outlined-text-field-hover-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-trailing-icon-color: var(--md-outlined-text-field-hover-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-color: var(--md-outlined-text-field-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_input-text-font: var(--md-outlined-text-field-input-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_input-text-line-height: var(--md-outlined-text-field-input-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_input-text-placeholder-color: var(--md-outlined-text-field-input-text-placeholder-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-prefix-color: var(--md-outlined-text-field-input-text-prefix-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-size: var(--md-outlined-text-field-input-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_input-text-suffix-color: var(--md-outlined-text-field-input-text-suffix-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-weight: var(--md-outlined-text-field-input-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_label-text-color: var(--md-outlined-text-field-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-font: var(--md-outlined-text-field-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-outlined-text-field-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_label-text-populated-line-height: var(--md-outlined-text-field-label-text-populated-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_label-text-populated-size: var(--md-outlined-text-field-label-text-populated-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_label-text-size: var(--md-outlined-text-field-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_label-text-weight: var(--md-outlined-text-field-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_leading-icon-color: var(--md-outlined-text-field-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_leading-icon-size: var(--md-outlined-text-field-leading-icon-size, 24px);--_outline-color: var(--md-outlined-text-field-outline-color, var(--md-sys-color-outline, #79747e));--_outline-width: var(--md-outlined-text-field-outline-width, 1px);--_supporting-text-color: var(--md-outlined-text-field-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_supporting-text-font: var(--md-outlined-text-field-supporting-text-font, var(--md-sys-typescale-body-small-font, var(--md-ref-typeface-plain, Roboto)));--_supporting-text-line-height: var(--md-outlined-text-field-supporting-text-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_supporting-text-size: var(--md-outlined-text-field-supporting-text-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_supporting-text-weight: var(--md-outlined-text-field-supporting-text-weight, var(--md-sys-typescale-body-small-weight, var(--md-ref-typeface-weight-regular, 400)));--_trailing-icon-color: var(--md-outlined-text-field-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_trailing-icon-size: var(--md-outlined-text-field-trailing-icon-size, 24px);--_container-shape-start-start: var(--md-outlined-text-field-container-shape-start-start, var(--md-outlined-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-start-end: var(--md-outlined-text-field-container-shape-start-end, var(--md-outlined-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-end-end: var(--md-outlined-text-field-container-shape-end-end, var(--md-outlined-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-end-start: var(--md-outlined-text-field-container-shape-end-start, var(--md-outlined-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_icon-input-space: var(--md-outlined-text-field-icon-input-space, 16px);--_leading-space: var(--md-outlined-text-field-leading-space, 16px);--_trailing-space: var(--md-outlined-text-field-trailing-space, 16px);--_top-space: var(--md-outlined-text-field-top-space, 16px);--_bottom-space: var(--md-outlined-text-field-bottom-space, 16px);--_input-text-prefix-trailing-space: var(--md-outlined-text-field-input-text-prefix-trailing-space, 2px);--_input-text-suffix-leading-space: var(--md-outlined-text-field-input-text-suffix-leading-space, 2px);--_focus-caret-color: var(--md-outlined-text-field-focus-caret-color, var(--md-sys-color-primary, #6750a4));--_with-leading-icon-leading-space: var(--md-outlined-text-field-with-leading-icon-leading-space, 12px);--_with-trailing-icon-trailing-space: var(--md-outlined-text-field-with-trailing-icon-trailing-space, 12px);--md-outlined-field-bottom-space: var(--_bottom-space);--md-outlined-field-container-shape-end-end: var(--_container-shape-end-end);--md-outlined-field-container-shape-end-start: var(--_container-shape-end-start);--md-outlined-field-container-shape-start-end: var(--_container-shape-start-end);--md-outlined-field-container-shape-start-start: var(--_container-shape-start-start);--md-outlined-field-content-color: var(--_input-text-color);--md-outlined-field-content-font: var(--_input-text-font);--md-outlined-field-content-line-height: var(--_input-text-line-height);--md-outlined-field-content-size: var(--_input-text-size);--md-outlined-field-content-space: var(--_icon-input-space);--md-outlined-field-content-weight: var(--_input-text-weight);--md-outlined-field-disabled-content-color: var(--_disabled-input-text-color);--md-outlined-field-disabled-content-opacity: var(--_disabled-input-text-opacity);--md-outlined-field-disabled-label-text-color: var(--_disabled-label-text-color);--md-outlined-field-disabled-label-text-opacity: var(--_disabled-label-text-opacity);--md-outlined-field-disabled-leading-content-color: var(--_disabled-leading-icon-color);--md-outlined-field-disabled-leading-content-opacity: var(--_disabled-leading-icon-opacity);--md-outlined-field-disabled-outline-color: var(--_disabled-outline-color);--md-outlined-field-disabled-outline-opacity: var(--_disabled-outline-opacity);--md-outlined-field-disabled-outline-width: var(--_disabled-outline-width);--md-outlined-field-disabled-supporting-text-color: var(--_disabled-supporting-text-color);--md-outlined-field-disabled-supporting-text-opacity: var(--_disabled-supporting-text-opacity);--md-outlined-field-disabled-trailing-content-color: var(--_disabled-trailing-icon-color);--md-outlined-field-disabled-trailing-content-opacity: var(--_disabled-trailing-icon-opacity);--md-outlined-field-error-content-color: var(--_error-input-text-color);--md-outlined-field-error-focus-content-color: var(--_error-focus-input-text-color);--md-outlined-field-error-focus-label-text-color: var(--_error-focus-label-text-color);--md-outlined-field-error-focus-leading-content-color: var(--_error-focus-leading-icon-color);--md-outlined-field-error-focus-outline-color: var(--_error-focus-outline-color);--md-outlined-field-error-focus-supporting-text-color: var(--_error-focus-supporting-text-color);--md-outlined-field-error-focus-trailing-content-color: var(--_error-focus-trailing-icon-color);--md-outlined-field-error-hover-content-color: var(--_error-hover-input-text-color);--md-outlined-field-error-hover-label-text-color: var(--_error-hover-label-text-color);--md-outlined-field-error-hover-leading-content-color: var(--_error-hover-leading-icon-color);--md-outlined-field-error-hover-outline-color: var(--_error-hover-outline-color);--md-outlined-field-error-hover-supporting-text-color: var(--_error-hover-supporting-text-color);--md-outlined-field-error-hover-trailing-content-color: var(--_error-hover-trailing-icon-color);--md-outlined-field-error-label-text-color: var(--_error-label-text-color);--md-outlined-field-error-leading-content-color: var(--_error-leading-icon-color);--md-outlined-field-error-outline-color: var(--_error-outline-color);--md-outlined-field-error-supporting-text-color: var(--_error-supporting-text-color);--md-outlined-field-error-trailing-content-color: var(--_error-trailing-icon-color);--md-outlined-field-focus-content-color: var(--_focus-input-text-color);--md-outlined-field-focus-label-text-color: var(--_focus-label-text-color);--md-outlined-field-focus-leading-content-color: var(--_focus-leading-icon-color);--md-outlined-field-focus-outline-color: var(--_focus-outline-color);--md-outlined-field-focus-outline-width: var(--_focus-outline-width);--md-outlined-field-focus-supporting-text-color: var(--_focus-supporting-text-color);--md-outlined-field-focus-trailing-content-color: var(--_focus-trailing-icon-color);--md-outlined-field-hover-content-color: var(--_hover-input-text-color);--md-outlined-field-hover-label-text-color: var(--_hover-label-text-color);--md-outlined-field-hover-leading-content-color: var(--_hover-leading-icon-color);--md-outlined-field-hover-outline-color: var(--_hover-outline-color);--md-outlined-field-hover-outline-width: var(--_hover-outline-width);--md-outlined-field-hover-supporting-text-color: var(--_hover-supporting-text-color);--md-outlined-field-hover-trailing-content-color: var(--_hover-trailing-icon-color);--md-outlined-field-label-text-color: var(--_label-text-color);--md-outlined-field-label-text-font: var(--_label-text-font);--md-outlined-field-label-text-line-height: var(--_label-text-line-height);--md-outlined-field-label-text-populated-line-height: var(--_label-text-populated-line-height);--md-outlined-field-label-text-populated-size: var(--_label-text-populated-size);--md-outlined-field-label-text-size: var(--_label-text-size);--md-outlined-field-label-text-weight: var(--_label-text-weight);--md-outlined-field-leading-content-color: var(--_leading-icon-color);--md-outlined-field-leading-space: var(--_leading-space);--md-outlined-field-outline-color: var(--_outline-color);--md-outlined-field-outline-width: var(--_outline-width);--md-outlined-field-supporting-text-color: var(--_supporting-text-color);--md-outlined-field-supporting-text-font: var(--_supporting-text-font);--md-outlined-field-supporting-text-line-height: var(--_supporting-text-line-height);--md-outlined-field-supporting-text-size: var(--_supporting-text-size);--md-outlined-field-supporting-text-weight: var(--_supporting-text-weight);--md-outlined-field-top-space: var(--_top-space);--md-outlined-field-trailing-content-color: var(--_trailing-icon-color);--md-outlined-field-trailing-space: var(--_trailing-space);--md-outlined-field-with-leading-content-leading-space: var(--_with-leading-icon-leading-space);--md-outlined-field-with-trailing-content-trailing-space: var(--_with-trailing-icon-trailing-space)}
`;/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Ci extends y{constructor(){super(...arguments),this.fieldTag=j`md-outlined-field`}}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let Ct=class extends Ci{constructor(){super(...arguments),this.fieldTag=j`md-outlined-field`}};Ct.styles=[Pr,$i];Ct=l([_("md-outlined-text-field")],Ct);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Ai=X(x);class Ae extends Ai{constructor(){super(...arguments),this.value=0,this.max=1,this.indeterminate=!1,this.fourColor=!1}render(){const{ariaLabel:e}=this;return d`
      <div
        class="progress ${L(this.getRenderClasses())}"
        role="progressbar"
        aria-label="${e||h}"
        aria-valuemin="0"
        aria-valuemax=${this.max}
        aria-valuenow=${this.indeterminate?h:this.value}
        >${this.renderIndicator()}</div
      >
    `}getRenderClasses(){return{indeterminate:this.indeterminate,"four-color":this.fourColor}}}l([p({type:Number})],Ae.prototype,"value",void 0);l([p({type:Number})],Ae.prototype,"max",void 0);l([p({type:Boolean})],Ae.prototype,"indeterminate",void 0);l([p({type:Boolean,attribute:"four-color"})],Ae.prototype,"fourColor",void 0);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class ki extends Ae{renderIndicator(){return this.indeterminate?this.renderIndeterminateContainer():this.renderDeterminateContainer()}renderDeterminateContainer(){const e=(1-this.value/this.max)*100;return d`
      <svg viewBox="0 0 4800 4800">
        <circle class="track" pathLength="100"></circle>
        <circle
          class="active-track"
          pathLength="100"
          stroke-dashoffset=${e}></circle>
      </svg>
    `}renderIndeterminateContainer(){return d` <div class="spinner">
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
 */const Ei=m`:host{--_active-indicator-color: var(--md-circular-progress-active-indicator-color, var(--md-sys-color-primary, #6750a4));--_active-indicator-width: var(--md-circular-progress-active-indicator-width, 10);--_four-color-active-indicator-four-color: var(--md-circular-progress-four-color-active-indicator-four-color, var(--md-sys-color-tertiary-container, #ffd8e4));--_four-color-active-indicator-one-color: var(--md-circular-progress-four-color-active-indicator-one-color, var(--md-sys-color-primary, #6750a4));--_four-color-active-indicator-three-color: var(--md-circular-progress-four-color-active-indicator-three-color, var(--md-sys-color-tertiary, #7d5260));--_four-color-active-indicator-two-color: var(--md-circular-progress-four-color-active-indicator-two-color, var(--md-sys-color-primary-container, #eaddff));--_size: var(--md-circular-progress-size, 48px);display:inline-flex;vertical-align:middle;width:var(--_size);height:var(--_size);position:relative;align-items:center;justify-content:center;contain:strict;content-visibility:auto}.progress{flex:1;align-self:stretch;margin:4px}.progress,.spinner,.left,.right,.circle,svg,.track,.active-track{position:absolute;inset:0}svg{transform:rotate(-90deg)}circle{cx:50%;cy:50%;r:calc(50%*(1 - var(--_active-indicator-width)/100));stroke-width:calc(var(--_active-indicator-width)*1%);stroke-dasharray:100;fill:rgba(0,0,0,0)}.active-track{transition:stroke-dashoffset 500ms cubic-bezier(0, 0, 0.2, 1);stroke:var(--_active-indicator-color)}.track{stroke:rgba(0,0,0,0)}.progress.indeterminate{animation:linear infinite linear-rotate;animation-duration:1568.2352941176ms}.spinner{animation:infinite both rotate-arc;animation-duration:5332ms;animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1)}.left{overflow:hidden;inset:0 50% 0 0}.right{overflow:hidden;inset:0 0 0 50%}.circle{box-sizing:border-box;border-radius:50%;border:solid calc(var(--_active-indicator-width)/100*(var(--_size) - 8px));border-color:var(--_active-indicator-color) var(--_active-indicator-color) rgba(0,0,0,0) rgba(0,0,0,0);animation:expand-arc;animation-iteration-count:infinite;animation-fill-mode:both;animation-duration:1333ms,5332ms;animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1)}.four-color .circle{animation-name:expand-arc,four-color}.left .circle{rotate:135deg;inset:0 -100% 0 0}.right .circle{rotate:100deg;inset:0 0 0 -100%;animation-delay:-666.5ms,0ms}@media(forced-colors: active){.active-track{stroke:CanvasText}.circle{border-color:CanvasText CanvasText Canvas Canvas}}@keyframes expand-arc{0%{transform:rotate(265deg)}50%{transform:rotate(130deg)}100%{transform:rotate(265deg)}}@keyframes rotate-arc{12.5%{transform:rotate(135deg)}25%{transform:rotate(270deg)}37.5%{transform:rotate(405deg)}50%{transform:rotate(540deg)}62.5%{transform:rotate(675deg)}75%{transform:rotate(810deg)}87.5%{transform:rotate(945deg)}100%{transform:rotate(1080deg)}}@keyframes linear-rotate{to{transform:rotate(360deg)}}@keyframes four-color{0%{border-top-color:var(--_four-color-active-indicator-one-color);border-right-color:var(--_four-color-active-indicator-one-color)}15%{border-top-color:var(--_four-color-active-indicator-one-color);border-right-color:var(--_four-color-active-indicator-one-color)}25%{border-top-color:var(--_four-color-active-indicator-two-color);border-right-color:var(--_four-color-active-indicator-two-color)}40%{border-top-color:var(--_four-color-active-indicator-two-color);border-right-color:var(--_four-color-active-indicator-two-color)}50%{border-top-color:var(--_four-color-active-indicator-three-color);border-right-color:var(--_four-color-active-indicator-three-color)}65%{border-top-color:var(--_four-color-active-indicator-three-color);border-right-color:var(--_four-color-active-indicator-three-color)}75%{border-top-color:var(--_four-color-active-indicator-four-color);border-right-color:var(--_four-color-active-indicator-four-color)}90%{border-top-color:var(--_four-color-active-indicator-four-color);border-right-color:var(--_four-color-active-indicator-four-color)}100%{border-top-color:var(--_four-color-active-indicator-one-color);border-right-color:var(--_four-color-active-indicator-one-color)}}
`;/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let At=class extends ki{};At.styles=[Ei];At=l([_("md-circular-progress")],At);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class We extends x{constructor(){super(...arguments),this.inset=!1,this.insetStart=!1,this.insetEnd=!1}}l([p({type:Boolean,reflect:!0})],We.prototype,"inset",void 0);l([p({type:Boolean,reflect:!0,attribute:"inset-start"})],We.prototype,"insetStart",void 0);l([p({type:Boolean,reflect:!0,attribute:"inset-end"})],We.prototype,"insetEnd",void 0);/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Ii=m`:host{box-sizing:border-box;color:var(--md-divider-color, var(--md-sys-color-outline-variant, #cac4d0));display:flex;height:var(--md-divider-thickness, 1px);width:100%}:host([inset]),:host([inset-start]){padding-inline-start:16px}:host([inset]),:host([inset-end]){padding-inline-end:16px}:host::before{background:currentColor;content:"";height:100%;width:100%}@media(forced-colors: active){:host::before{background:CanvasText}}
`;/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let kt=class extends We{};kt.styles=[Ii];kt=l([_("md-divider")],kt);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const zi={dialog:[[[{transform:"translateY(-50px)"},{transform:"translateY(0)"}],{duration:500,easing:ae.EMPHASIZED}]],scrim:[[[{opacity:0},{opacity:.32}],{duration:500,easing:"linear"}]],container:[[[{opacity:0},{opacity:1}],{duration:50,easing:"linear",pseudoElement:"::before"}],[[{height:"35%"},{height:"100%"}],{duration:500,easing:ae.EMPHASIZED,pseudoElement:"::before"}]],headline:[[[{opacity:0},{opacity:0,offset:.2},{opacity:1}],{duration:250,easing:"linear",fill:"forwards"}]],content:[[[{opacity:0},{opacity:0,offset:.2},{opacity:1}],{duration:250,easing:"linear",fill:"forwards"}]],actions:[[[{opacity:0},{opacity:0,offset:.5},{opacity:1}],{duration:300,easing:"linear",fill:"forwards"}]]},Ti={dialog:[[[{transform:"translateY(0)"},{transform:"translateY(-50px)"}],{duration:150,easing:ae.EMPHASIZED_ACCELERATE}]],scrim:[[[{opacity:.32},{opacity:0}],{duration:150,easing:"linear"}]],container:[[[{height:"100%"},{height:"35%"}],{duration:150,easing:ae.EMPHASIZED_ACCELERATE,pseudoElement:"::before"}],[[{opacity:"1"},{opacity:"0"}],{delay:100,duration:50,easing:"linear",pseudoElement:"::before"}]],headline:[[[{opacity:1},{opacity:0}],{duration:100,easing:"linear",fill:"forwards"}]],content:[[[{opacity:1},{opacity:0}],{duration:100,easing:"linear",fill:"forwards"}]],actions:[[[{opacity:1},{opacity:0}],{duration:100,easing:"linear",fill:"forwards"}]]};/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Si=X(x);class A extends Si{get open(){return this.isOpen}set open(e){e!==this.isOpen&&(this.isOpen=e,e?(this.setAttribute("open",""),this.show()):(this.removeAttribute("open"),this.close()))}constructor(){super(),this.quick=!1,this.returnValue="",this.noFocusTrap=!1,this.getOpenAnimation=()=>zi,this.getCloseAnimation=()=>Ti,this.isOpen=!1,this.isOpening=!1,this.isConnectedPromise=this.getIsConnectedPromise(),this.isAtScrollTop=!1,this.isAtScrollBottom=!1,this.nextClickIsFromContent=!1,this.hasHeadline=!1,this.hasActions=!1,this.hasIcon=!1,this.escapePressedWithoutCancel=!1,this.treewalker=document.createTreeWalker(this,NodeFilter.SHOW_ELEMENT),this.addEventListener("submit",this.handleSubmit)}async show(){var o;this.isOpening=!0,await this.isConnectedPromise,await this.updateComplete;const e=this.dialog;if(e.open||!this.isOpening){this.isOpening=!1;return}if(!this.dispatchEvent(new Event("open",{cancelable:!0}))){this.open=!1,this.isOpening=!1;return}e.showModal(),this.open=!0,this.scroller&&(this.scroller.scrollTop=0),(o=this.querySelector("[autofocus]"))==null||o.focus(),await this.animateDialog(this.getOpenAnimation()),this.dispatchEvent(new Event("opened")),this.isOpening=!1}async close(e=this.returnValue){if(this.isOpening=!1,!this.isConnected){this.open=!1;return}await this.updateComplete;const t=this.dialog;if(!t.open||this.isOpening){this.open=!1;return}const o=this.returnValue;if(this.returnValue=e,!this.dispatchEvent(new Event("close",{cancelable:!0}))){this.returnValue=o;return}await this.animateDialog(this.getCloseAnimation()),t.close(e),this.open=!1,this.dispatchEvent(new Event("closed"))}connectedCallback(){super.connectedCallback(),this.isConnectedPromiseResolve()}disconnectedCallback(){super.disconnectedCallback(),this.isConnectedPromise=this.getIsConnectedPromise()}render(){const e=this.open&&!(this.isAtScrollTop&&this.isAtScrollBottom),t={"has-headline":this.hasHeadline,"has-actions":this.hasActions,"has-icon":this.hasIcon,scrollable:e,"show-top-divider":e&&!this.isAtScrollTop,"show-bottom-divider":e&&!this.isAtScrollBottom},o=this.open&&!this.noFocusTrap,i=d`
      <div
        class="focus-trap"
        tabindex="0"
        aria-hidden="true"
        @focus=${this.handleFocusTrapFocus}></div>
    `,{ariaLabel:a}=this;return d`
      <div class="scrim"></div>
      <dialog
        class=${L(t)}
        aria-label=${a||h}
        aria-labelledby=${this.hasHeadline?"headline":h}
        role=${this.type==="alert"?"alertdialog":h}
        @cancel=${this.handleCancel}
        @click=${this.handleDialogClick}
        @close=${this.handleClose}
        @keydown=${this.handleKeydown}
        .returnValue=${this.returnValue||h}>
        ${o?i:h}
        <div class="container" @click=${this.handleContentClick}>
          <div class="headline">
            <div class="icon" aria-hidden="true">
              <slot name="icon" @slotchange=${this.handleIconChange}></slot>
            </div>
            <h2 id="headline" aria-hidden=${!this.hasHeadline||h}>
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
        ${o?i:h}
      </dialog>
    `}firstUpdated(){this.intersectionObserver=new IntersectionObserver(e=>{for(const t of e)this.handleAnchorIntersection(t)},{root:this.scroller}),this.intersectionObserver.observe(this.topAnchor),this.intersectionObserver.observe(this.bottomAnchor)}handleDialogClick(){if(this.nextClickIsFromContent){this.nextClickIsFromContent=!1;return}this.dispatchEvent(new Event("cancel",{cancelable:!0}))&&this.close()}handleContentClick(){this.nextClickIsFromContent=!0}handleSubmit(e){const t=e.target,{submitter:o}=e;t.getAttribute("method")!=="dialog"||!o||this.close(o.getAttribute("value")??this.returnValue)}handleCancel(e){if(e.target!==this.dialog)return;this.escapePressedWithoutCancel=!1;const t=!Zt(this,e);e.preventDefault(),!t&&this.close()}handleClose(){var e;this.escapePressedWithoutCancel&&(this.escapePressedWithoutCancel=!1,(e=this.dialog)==null||e.dispatchEvent(new Event("cancel",{cancelable:!0})))}handleKeydown(e){e.key==="Escape"&&(this.escapePressedWithoutCancel=!0,setTimeout(()=>{this.escapePressedWithoutCancel=!1}))}async animateDialog(e){var ee;if((ee=this.cancelAnimations)==null||ee.abort(),this.cancelAnimations=new AbortController,this.quick)return;const{dialog:t,scrim:o,container:i,headline:a,content:s,actions:n}=this;if(!t||!o||!i||!a||!s||!n)return;const{container:c,dialog:u,scrim:f,headline:v,content:b,actions:w}=e,F=[[t,u??[]],[o,f??[]],[i,c??[]],[a,v??[]],[s,b??[]],[n,w??[]]],Q=[];for(const[D,ne]of F)for(const Qr of ne){const Qt=D.animate(...Qr);this.cancelAnimations.signal.addEventListener("abort",()=>{Qt.cancel()}),Q.push(Qt)}await Promise.all(Q.map(D=>D.finished.catch(()=>{})))}handleHeadlineChange(e){const t=e.target;this.hasHeadline=t.assignedElements().length>0}handleActionsChange(e){const t=e.target;this.hasActions=t.assignedElements().length>0}handleIconChange(e){const t=e.target;this.hasIcon=t.assignedElements().length>0}handleAnchorIntersection(e){const{target:t,isIntersecting:o}=e;t===this.topAnchor&&(this.isAtScrollTop=o),t===this.bottomAnchor&&(this.isAtScrollBottom=o)}getIsConnectedPromise(){return new Promise(e=>{this.isConnectedPromiseResolve=e})}handleFocusTrapFocus(e){var v;const[t,o]=this.getFirstAndLastFocusableChildren();if(!t||!o){(v=this.dialog)==null||v.focus();return}const i=e.target===this.firstFocusTrap,a=!i,s=e.relatedTarget===t,n=e.relatedTarget===o,c=!s&&!n;if(a&&n||i&&c){t.focus();return}if(i&&s||a&&c){o.focus();return}}getFirstAndLastFocusableChildren(){if(!this.treewalker)return[null,null];let e=null,t=null;for(this.treewalker.currentNode=this.treewalker.root;this.treewalker.nextNode();){const o=this.treewalker.currentNode;Fi(o)&&(e||(e=o),t=o)}return[e,t]}}l([p({type:Boolean})],A.prototype,"open",null);l([p({type:Boolean})],A.prototype,"quick",void 0);l([p({attribute:!1})],A.prototype,"returnValue",void 0);l([p()],A.prototype,"type",void 0);l([p({type:Boolean,attribute:"no-focus-trap"})],A.prototype,"noFocusTrap",void 0);l([$("dialog")],A.prototype,"dialog",void 0);l([$(".scrim")],A.prototype,"scrim",void 0);l([$(".container")],A.prototype,"container",void 0);l([$(".headline")],A.prototype,"headline",void 0);l([$(".content")],A.prototype,"content",void 0);l([$(".actions")],A.prototype,"actions",void 0);l([g()],A.prototype,"isAtScrollTop",void 0);l([g()],A.prototype,"isAtScrollBottom",void 0);l([$(".scroller")],A.prototype,"scroller",void 0);l([$(".top.anchor")],A.prototype,"topAnchor",void 0);l([$(".bottom.anchor")],A.prototype,"bottomAnchor",void 0);l([$(".focus-trap")],A.prototype,"firstFocusTrap",void 0);l([g()],A.prototype,"hasHeadline",void 0);l([g()],A.prototype,"hasActions",void 0);l([g()],A.prototype,"hasIcon",void 0);function Fi(r){var a;const e=":is(button,input,select,textarea,object,:is(a,area)[href],[tabindex],[contenteditable=true])",t=":not(:disabled,[disabled])";return r.matches(e+t+':not([tabindex^="-"])')?!0:!r.localName.includes("-")||!r.matches(t)?!1:((a=r.shadowRoot)==null?void 0:a.delegatesFocus)??!1}/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Ri=m`:host{border-start-start-radius:var(--md-dialog-container-shape-start-start, var(--md-dialog-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));border-start-end-radius:var(--md-dialog-container-shape-start-end, var(--md-dialog-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));border-end-end-radius:var(--md-dialog-container-shape-end-end, var(--md-dialog-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));border-end-start-radius:var(--md-dialog-container-shape-end-start, var(--md-dialog-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));display:contents;margin:auto;max-height:min(560px,100% - 48px);max-width:min(560px,100% - 48px);min-height:140px;min-width:280px;position:fixed;height:fit-content;width:fit-content}dialog{background:rgba(0,0,0,0);border:none;border-radius:inherit;flex-direction:column;height:inherit;margin:inherit;max-height:inherit;max-width:inherit;min-height:inherit;min-width:inherit;outline:none;overflow:visible;padding:0;width:inherit}dialog[open]{display:flex}::backdrop{background:none}.scrim{background:var(--md-sys-color-scrim, #000);display:none;inset:0;opacity:32%;pointer-events:none;position:fixed;z-index:1}:host([open]) .scrim{display:flex}h2{all:unset;align-self:stretch}.headline{align-items:center;color:var(--md-dialog-headline-color, var(--md-sys-color-on-surface, #1d1b20));display:flex;flex-direction:column;font-family:var(--md-dialog-headline-font, var(--md-sys-typescale-headline-small-font, var(--md-ref-typeface-brand, Roboto)));font-size:var(--md-dialog-headline-size, var(--md-sys-typescale-headline-small-size, 1.5rem));line-height:var(--md-dialog-headline-line-height, var(--md-sys-typescale-headline-small-line-height, 2rem));font-weight:var(--md-dialog-headline-weight, var(--md-sys-typescale-headline-small-weight, var(--md-ref-typeface-weight-regular, 400)));position:relative}slot[name=headline]::slotted(*){align-items:center;align-self:stretch;box-sizing:border-box;display:flex;gap:8px;padding:24px 24px 0}.icon{display:flex}slot[name=icon]::slotted(*){color:var(--md-dialog-icon-color, var(--md-sys-color-secondary, #625b71));fill:currentColor;font-size:var(--md-dialog-icon-size, 24px);margin-top:24px;height:var(--md-dialog-icon-size, 24px);width:var(--md-dialog-icon-size, 24px)}.has-icon slot[name=headline]::slotted(*){justify-content:center;padding-top:16px}.scrollable slot[name=headline]::slotted(*){padding-bottom:16px}.scrollable.has-headline slot[name=content]::slotted(*){padding-top:8px}.container{border-radius:inherit;display:flex;flex-direction:column;flex-grow:1;overflow:hidden;position:relative;transform-origin:top}.container::before{background:var(--md-dialog-container-color, var(--md-sys-color-surface-container-high, #ece6f0));border-radius:inherit;content:"";inset:0;position:absolute}.scroller{display:flex;flex:1;flex-direction:column;overflow:hidden;z-index:1}.scrollable .scroller{overflow-y:scroll}.content{color:var(--md-dialog-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));font-family:var(--md-dialog-supporting-text-font, var(--md-sys-typescale-body-medium-font, var(--md-ref-typeface-plain, Roboto)));font-size:var(--md-dialog-supporting-text-size, var(--md-sys-typescale-body-medium-size, 0.875rem));line-height:var(--md-dialog-supporting-text-line-height, var(--md-sys-typescale-body-medium-line-height, 1.25rem));flex:1;font-weight:var(--md-dialog-supporting-text-weight, var(--md-sys-typescale-body-medium-weight, var(--md-ref-typeface-weight-regular, 400)));height:min-content;position:relative}slot[name=content]::slotted(*){box-sizing:border-box;padding:24px}.anchor{position:absolute}.top.anchor{top:0}.bottom.anchor{bottom:0}.actions{position:relative}slot[name=actions]::slotted(*){box-sizing:border-box;display:flex;gap:8px;justify-content:flex-end;padding:16px 24px 24px}.has-actions slot[name=content]::slotted(*){padding-bottom:8px}md-divider{display:none;position:absolute}.has-headline.show-top-divider .headline md-divider,.has-actions.show-bottom-divider .actions md-divider{display:flex}.headline md-divider{bottom:0}.actions md-divider{top:0}@media(forced-colors: active){dialog{outline:2px solid WindowText}}
`;/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let Et=class extends A{};Et.styles=[Ri];Et=l([_("md-dialog")],Et);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Li=X(x);class q extends Li{get rippleDisabled(){return this.disabled||this.softDisabled}constructor(){super(),this.disabled=!1,this.softDisabled=!1,this.alwaysFocusable=!1,this.label="",this.hasIcon=!1,this.addEventListener("click",this.handleClick.bind(this))}focus(e){this.disabled&&!this.alwaysFocusable||super.focus(e)}render(){return d`
      <div class="container ${L(this.getContainerClasses())}">
        ${this.renderContainerContent()}
      </div>
    `}updated(e){e.has("disabled")&&e.get("disabled")!==void 0&&this.dispatchEvent(new Event("update-focus",{bubbles:!0}))}getContainerClasses(){return{disabled:this.disabled||this.softDisabled,"has-icon":this.hasIcon}}renderContainerContent(){return d`
      ${this.renderOutline()}
      <md-focus-ring part="focus-ring" for=${this.primaryId}></md-focus-ring>
      <md-ripple
        for=${this.primaryId}
        ?disabled=${this.rippleDisabled}></md-ripple>
      ${this.renderPrimaryAction(this.renderPrimaryContent())}
    `}renderOutline(){return d`<span class="outline"></span>`}renderLeadingIcon(){return d`<slot name="icon" @slotchange=${this.handleIconChange}></slot>`}renderPrimaryContent(){return d`
      <span class="leading icon" aria-hidden="true">
        ${this.renderLeadingIcon()}
      </span>
      <span class="label">
        <span class="label-text" id="label">
          ${this.label?this.label:d`<slot></slot>`}
        </span>
      </span>
      <span class="touch"></span>
    `}handleIconChange(e){const t=e.target;this.hasIcon=t.assignedElements({flatten:!0}).length>0}handleClick(e){if(this.softDisabled||this.disabled&&this.alwaysFocusable){e.stopImmediatePropagation(),e.preventDefault();return}}}q.shadowRootOptions={...x.shadowRootOptions,delegatesFocus:!0};l([p({type:Boolean,reflect:!0})],q.prototype,"disabled",void 0);l([p({type:Boolean,attribute:"soft-disabled",reflect:!0})],q.prototype,"softDisabled",void 0);l([p({type:Boolean,attribute:"always-focusable"})],q.prototype,"alwaysFocusable",void 0);l([p()],q.prototype,"label",void 0);l([p({type:Boolean,reflect:!0,attribute:"has-icon"})],q.prototype,"hasIcon",void 0);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Dr extends x{get chips(){return this.childElements.filter(e=>e instanceof q)}constructor(){super(),this.internals=this.attachInternals(),this.addEventListener("focusin",this.updateTabIndices.bind(this)),this.addEventListener("update-focus",this.updateTabIndices.bind(this)),this.addEventListener("keydown",this.handleKeyDown.bind(this)),this.internals.role="toolbar"}render(){return d`<slot @slotchange=${this.updateTabIndices}></slot>`}handleKeyDown(e){const t=e.key==="ArrowLeft",o=e.key==="ArrowRight",i=e.key==="Home",a=e.key==="End";if(!t&&!o&&!i&&!a)return;const{chips:s}=this;if(s.length<2)return;if(e.preventDefault(),i||a){const b=i?0:s.length-1;s[b].focus({trailing:a}),this.updateTabIndices();return}const c=getComputedStyle(this).direction==="rtl"?t:o,u=s.find(b=>b.matches(":focus-within"));if(!u){(c?s[0]:s[s.length-1]).focus({trailing:!c}),this.updateTabIndices();return}const f=s.indexOf(u);let v=c?f+1:f-1;for(;v!==f;){v>=s.length?v=0:v<0&&(v=s.length-1);const b=s[v];if(b.disabled&&!b.alwaysFocusable){c?v++:v--;continue}b.focus({trailing:!c}),this.updateTabIndices();break}}updateTabIndices(){const{chips:e}=this;let t;for(const o of e){const i=o.alwaysFocusable||!o.disabled;if(o.matches(":focus-within")&&i){t=o;continue}i&&!t&&(t=o),o.tabIndex=-1}t&&(t.tabIndex=0)}}l([Z()],Dr.prototype,"childElements",void 0);/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Oi=m`:host{display:flex;flex-wrap:wrap;gap:8px}
`;/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let It=class extends Dr{};It.styles=[Oi];It=l([_("md-chip-set")],It);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class ke extends q{constructor(){super(...arguments),this.elevated=!1,this.href="",this.download="",this.target=""}get primaryId(){return this.href?"link":"button"}get rippleDisabled(){return!this.href&&(this.disabled||this.softDisabled)}getContainerClasses(){return{...super.getContainerClasses(),disabled:!this.href&&(this.disabled||this.softDisabled),elevated:this.elevated,link:!!this.href}}renderPrimaryAction(e){const{ariaLabel:t}=this;return this.href?d`
        <a
          class="primary action"
          id="link"
          aria-label=${t||h}
          href=${this.href}
          download=${this.download||h}
          target=${this.target||h}
          >${e}</a
        >
      `:d`
      <button
        class="primary action"
        id="button"
        aria-label=${t||h}
        aria-disabled=${this.softDisabled||h}
        ?disabled=${this.disabled&&!this.alwaysFocusable}
        type="button"
        >${e}</button
      >
    `}renderOutline(){return this.elevated?d`<md-elevation part="elevation"></md-elevation>`:super.renderOutline()}}l([p({type:Boolean})],ke.prototype,"elevated",void 0);l([p()],ke.prototype,"href",void 0);l([p()],ke.prototype,"download",void 0);l([p()],ke.prototype,"target",void 0);/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Pi=m`:host{--_container-height: var(--md-assist-chip-container-height, 32px);--_disabled-label-text-color: var(--md-assist-chip-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-assist-chip-disabled-label-text-opacity, 0.38);--_elevated-container-color: var(--md-assist-chip-elevated-container-color, var(--md-sys-color-surface-container-low, #f7f2fa));--_elevated-container-elevation: var(--md-assist-chip-elevated-container-elevation, 1);--_elevated-container-shadow-color: var(--md-assist-chip-elevated-container-shadow-color, var(--md-sys-color-shadow, #000));--_elevated-disabled-container-color: var(--md-assist-chip-elevated-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));--_elevated-disabled-container-elevation: var(--md-assist-chip-elevated-disabled-container-elevation, 0);--_elevated-disabled-container-opacity: var(--md-assist-chip-elevated-disabled-container-opacity, 0.12);--_elevated-focus-container-elevation: var(--md-assist-chip-elevated-focus-container-elevation, 1);--_elevated-hover-container-elevation: var(--md-assist-chip-elevated-hover-container-elevation, 2);--_elevated-pressed-container-elevation: var(--md-assist-chip-elevated-pressed-container-elevation, 1);--_focus-label-text-color: var(--md-assist-chip-focus-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-label-text-color: var(--md-assist-chip-hover-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-state-layer-color: var(--md-assist-chip-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-state-layer-opacity: var(--md-assist-chip-hover-state-layer-opacity, 0.08);--_label-text-color: var(--md-assist-chip-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_label-text-font: var(--md-assist-chip-label-text-font, var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-assist-chip-label-text-line-height, var(--md-sys-typescale-label-large-line-height, 1.25rem));--_label-text-size: var(--md-assist-chip-label-text-size, var(--md-sys-typescale-label-large-size, 0.875rem));--_label-text-weight: var(--md-assist-chip-label-text-weight, var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)));--_pressed-label-text-color: var(--md-assist-chip-pressed-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_pressed-state-layer-color: var(--md-assist-chip-pressed-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_pressed-state-layer-opacity: var(--md-assist-chip-pressed-state-layer-opacity, 0.12);--_disabled-outline-color: var(--md-assist-chip-disabled-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-outline-opacity: var(--md-assist-chip-disabled-outline-opacity, 0.12);--_focus-outline-color: var(--md-assist-chip-focus-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_outline-color: var(--md-assist-chip-outline-color, var(--md-sys-color-outline, #79747e));--_outline-width: var(--md-assist-chip-outline-width, 1px);--_disabled-leading-icon-color: var(--md-assist-chip-disabled-leading-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-leading-icon-opacity: var(--md-assist-chip-disabled-leading-icon-opacity, 0.38);--_focus-leading-icon-color: var(--md-assist-chip-focus-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_hover-leading-icon-color: var(--md-assist-chip-hover-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_leading-icon-color: var(--md-assist-chip-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-size: var(--md-assist-chip-icon-size, 18px);--_pressed-leading-icon-color: var(--md-assist-chip-pressed-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_container-shape-start-start: var(--md-assist-chip-container-shape-start-start, var(--md-assist-chip-container-shape, var(--md-sys-shape-corner-small, 8px)));--_container-shape-start-end: var(--md-assist-chip-container-shape-start-end, var(--md-assist-chip-container-shape, var(--md-sys-shape-corner-small, 8px)));--_container-shape-end-end: var(--md-assist-chip-container-shape-end-end, var(--md-assist-chip-container-shape, var(--md-sys-shape-corner-small, 8px)));--_container-shape-end-start: var(--md-assist-chip-container-shape-end-start, var(--md-assist-chip-container-shape, var(--md-sys-shape-corner-small, 8px)));--_leading-space: var(--md-assist-chip-leading-space, 16px);--_trailing-space: var(--md-assist-chip-trailing-space, 16px);--_icon-label-space: var(--md-assist-chip-icon-label-space, 8px);--_with-leading-icon-leading-space: var(--md-assist-chip-with-leading-icon-leading-space, 8px)}@media(forced-colors: active){.link .outline{border-color:ActiveText}}
`;/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Mr=m`.elevated{--md-elevation-level: var(--_elevated-container-elevation);--md-elevation-shadow-color: var(--_elevated-container-shadow-color)}.elevated::before{background:var(--_elevated-container-color)}.elevated:hover{--md-elevation-level: var(--_elevated-hover-container-elevation)}.elevated:focus-within{--md-elevation-level: var(--_elevated-focus-container-elevation)}.elevated:active{--md-elevation-level: var(--_elevated-pressed-container-elevation)}.elevated.disabled{--md-elevation-level: var(--_elevated-disabled-container-elevation)}.elevated.disabled::before{background:var(--_elevated-disabled-container-color);opacity:var(--_elevated-disabled-container-opacity)}@media(forced-colors: active){.elevated md-elevation{border:1px solid CanvasText}.elevated.disabled md-elevation{border-color:GrayText}}
`;/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Nr=m`:host{border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end);display:inline-flex;height:var(--_container-height);cursor:pointer;-webkit-tap-highlight-color:rgba(0,0,0,0);--md-ripple-hover-color: var(--_hover-state-layer-color);--md-ripple-hover-opacity: var(--_hover-state-layer-opacity);--md-ripple-pressed-color: var(--_pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_pressed-state-layer-opacity)}:host(:is([disabled],[soft-disabled])){pointer-events:none}:host([touch-target=wrapper]){margin:max(0px,(48px - var(--_container-height))/2) 0}md-focus-ring{--md-focus-ring-shape-start-start: var(--_container-shape-start-start);--md-focus-ring-shape-start-end: var(--_container-shape-start-end);--md-focus-ring-shape-end-end: var(--_container-shape-end-end);--md-focus-ring-shape-end-start: var(--_container-shape-end-start)}.container{border-radius:inherit;box-sizing:border-box;display:flex;height:100%;position:relative;width:100%}.container::before{border-radius:inherit;content:"";inset:0;pointer-events:none;position:absolute}.container:not(.disabled){cursor:pointer}.container.disabled{pointer-events:none}.cell{display:flex}.action{align-items:baseline;appearance:none;background:none;border:none;border-radius:inherit;display:flex;outline:none;padding:0;position:relative;text-decoration:none}.primary.action{min-width:0;padding-inline-start:var(--_leading-space);padding-inline-end:var(--_trailing-space)}.has-icon .primary.action{padding-inline-start:var(--_with-leading-icon-leading-space)}.touch{height:48px;inset:50% 0 0;position:absolute;transform:translateY(-50%);width:100%}:host([touch-target=none]) .touch{display:none}.outline{border:var(--_outline-width) solid var(--_outline-color);border-radius:inherit;inset:0;pointer-events:none;position:absolute}:where(:focus) .outline{border-color:var(--_focus-outline-color)}:where(.disabled) .outline{border-color:var(--_disabled-outline-color);opacity:var(--_disabled-outline-opacity)}md-ripple{border-radius:inherit}.label,.icon,.touch{z-index:1}.label{align-items:center;color:var(--_label-text-color);display:flex;font-family:var(--_label-text-font);font-size:var(--_label-text-size);font-weight:var(--_label-text-weight);height:100%;line-height:var(--_label-text-line-height);overflow:hidden;user-select:none}.label-text{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}:where(:hover) .label{color:var(--_hover-label-text-color)}:where(:focus) .label{color:var(--_focus-label-text-color)}:where(:active) .label{color:var(--_pressed-label-text-color)}:where(.disabled) .label{color:var(--_disabled-label-text-color);opacity:var(--_disabled-label-text-opacity)}.icon{align-self:center;display:flex;fill:currentColor;position:relative}.icon ::slotted(:first-child){font-size:var(--_icon-size);height:var(--_icon-size);width:var(--_icon-size)}.leading.icon{color:var(--_leading-icon-color)}.leading.icon ::slotted(*),.leading.icon svg{margin-inline-end:var(--_icon-label-space)}:where(:hover) .leading.icon{color:var(--_hover-leading-icon-color)}:where(:focus) .leading.icon{color:var(--_focus-leading-icon-color)}:where(:active) .leading.icon{color:var(--_pressed-leading-icon-color)}:where(.disabled) .leading.icon{color:var(--_disabled-leading-icon-color);opacity:var(--_disabled-leading-icon-opacity)}@media(forced-colors: active){:where(.disabled) :is(.label,.outline,.leading.icon){color:GrayText;opacity:1}}a,button{text-transform:inherit}a,button:not(:disabled,[aria-disabled=true]){cursor:inherit}
`;/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let zt=class extends ke{};zt.styles=[Nr,Mr,Pi];zt=l([_("md-assist-chip")],zt);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Oe="aria-label-remove";class Di extends q{get ariaLabelRemove(){if(this.hasAttribute(Oe))return this.getAttribute(Oe);const{ariaLabel:e}=this;return e||this.label?`Remove ${e||this.label}`:null}set ariaLabelRemove(e){const t=this.ariaLabelRemove;e!==t&&(e===null?this.removeAttribute(Oe):this.setAttribute(Oe,e),this.requestUpdate())}constructor(){super(),this.handleTrailingActionFocus=this.handleTrailingActionFocus.bind(this),this.addEventListener("keydown",this.handleKeyDown.bind(this))}focus(e){if((this.alwaysFocusable||!this.disabled)&&(e!=null&&e.trailing)&&this.trailingAction){this.trailingAction.focus(e);return}super.focus(e)}renderContainerContent(){return d`
      ${super.renderContainerContent()}
      ${this.renderTrailingAction(this.handleTrailingActionFocus)}
    `}handleKeyDown(e){var u,f;const t=e.key==="ArrowLeft",o=e.key==="ArrowRight";if(!t&&!o||!this.primaryAction||!this.trailingAction)return;const a=getComputedStyle(this).direction==="rtl"?t:o,s=(u=this.primaryAction)==null?void 0:u.matches(":focus-within"),n=(f=this.trailingAction)==null?void 0:f.matches(":focus-within");if(a&&n||!a&&s)return;e.preventDefault(),e.stopPropagation(),(a?this.trailingAction:this.primaryAction).focus()}handleTrailingActionFocus(){const{primaryAction:e,trailingAction:t}=this;!e||!t||(e.tabIndex=-1,t.addEventListener("focusout",()=>{e.tabIndex=0},{once:!0}))}}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function Mi({ariaLabel:r,disabled:e,focusListener:t,tabbable:o=!1}){return d`
    <span id="remove-label" hidden aria-hidden="true">Remove</span>
    <button
      class="trailing action"
      aria-label=${r||h}
      aria-labelledby=${r?h:"remove-label label"}
      tabindex=${o?h:-1}
      @click=${Ni}
      @focus=${t}>
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
  `}function Ni(r){this.disabled||this.softDisabled||(r.stopPropagation(),!this.dispatchEvent(new Event("remove",{cancelable:!0})))||this.remove()}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class le extends Di{constructor(){super(...arguments),this.elevated=!1,this.removable=!1,this.selected=!1,this.hasSelectedIcon=!1}get primaryId(){return"button"}getContainerClasses(){return{...super.getContainerClasses(),elevated:this.elevated,selected:this.selected,"has-trailing":this.removable,"has-icon":this.hasIcon||this.selected}}renderPrimaryAction(e){const{ariaLabel:t}=this;return d`
      <button
        class="primary action"
        id="button"
        aria-label=${t||h}
        aria-pressed=${this.selected}
        aria-disabled=${this.softDisabled||h}
        ?disabled=${this.disabled&&!this.alwaysFocusable}
        @click=${this.handleClickOnChild}
        >${e}</button
      >
    `}renderLeadingIcon(){return this.selected?d`
      <slot name="selected-icon">
        <svg class="checkmark" viewBox="0 0 18 18" aria-hidden="true">
          <path
            d="M6.75012 12.1274L3.62262 8.99988L2.55762 10.0574L6.75012 14.2499L15.7501 5.24988L14.6926 4.19238L6.75012 12.1274Z" />
        </svg>
      </slot>
    `:super.renderLeadingIcon()}renderTrailingAction(e){return this.removable?Mi({focusListener:e,ariaLabel:this.ariaLabelRemove,disabled:this.disabled||this.softDisabled}):h}renderOutline(){return this.elevated?d`<md-elevation part="elevation"></md-elevation>`:super.renderOutline()}handleClickOnChild(e){if(this.disabled||this.softDisabled)return;const t=this.selected;if(this.selected=!this.selected,!Zt(this,e)){this.selected=t;return}}}l([p({type:Boolean})],le.prototype,"elevated",void 0);l([p({type:Boolean})],le.prototype,"removable",void 0);l([p({type:Boolean,reflect:!0})],le.prototype,"selected",void 0);l([p({type:Boolean,reflect:!0,attribute:"has-selected-icon"})],le.prototype,"hasSelectedIcon",void 0);l([$(".primary.action")],le.prototype,"primaryAction",void 0);l([$(".trailing.action")],le.prototype,"trailingAction",void 0);/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Bi=m`:host{--_container-height: var(--md-filter-chip-container-height, 32px);--_disabled-label-text-color: var(--md-filter-chip-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-filter-chip-disabled-label-text-opacity, 0.38);--_elevated-container-elevation: var(--md-filter-chip-elevated-container-elevation, 1);--_elevated-container-shadow-color: var(--md-filter-chip-elevated-container-shadow-color, var(--md-sys-color-shadow, #000));--_elevated-disabled-container-color: var(--md-filter-chip-elevated-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));--_elevated-disabled-container-elevation: var(--md-filter-chip-elevated-disabled-container-elevation, 0);--_elevated-disabled-container-opacity: var(--md-filter-chip-elevated-disabled-container-opacity, 0.12);--_elevated-focus-container-elevation: var(--md-filter-chip-elevated-focus-container-elevation, 1);--_elevated-hover-container-elevation: var(--md-filter-chip-elevated-hover-container-elevation, 2);--_elevated-pressed-container-elevation: var(--md-filter-chip-elevated-pressed-container-elevation, 1);--_elevated-selected-container-color: var(--md-filter-chip-elevated-selected-container-color, var(--md-sys-color-secondary-container, #e8def8));--_label-text-font: var(--md-filter-chip-label-text-font, var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-filter-chip-label-text-line-height, var(--md-sys-typescale-label-large-line-height, 1.25rem));--_label-text-size: var(--md-filter-chip-label-text-size, var(--md-sys-typescale-label-large-size, 0.875rem));--_label-text-weight: var(--md-filter-chip-label-text-weight, var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)));--_selected-focus-label-text-color: var(--md-filter-chip-selected-focus-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-hover-label-text-color: var(--md-filter-chip-selected-hover-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-hover-state-layer-color: var(--md-filter-chip-selected-hover-state-layer-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-hover-state-layer-opacity: var(--md-filter-chip-selected-hover-state-layer-opacity, 0.08);--_selected-label-text-color: var(--md-filter-chip-selected-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-pressed-label-text-color: var(--md-filter-chip-selected-pressed-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-pressed-state-layer-color: var(--md-filter-chip-selected-pressed-state-layer-color, var(--md-sys-color-on-surface-variant, #49454f));--_selected-pressed-state-layer-opacity: var(--md-filter-chip-selected-pressed-state-layer-opacity, 0.12);--_elevated-container-color: var(--md-filter-chip-elevated-container-color, var(--md-sys-color-surface-container-low, #f7f2fa));--_disabled-outline-color: var(--md-filter-chip-disabled-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-outline-opacity: var(--md-filter-chip-disabled-outline-opacity, 0.12);--_disabled-selected-container-color: var(--md-filter-chip-disabled-selected-container-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-selected-container-opacity: var(--md-filter-chip-disabled-selected-container-opacity, 0.12);--_focus-outline-color: var(--md-filter-chip-focus-outline-color, var(--md-sys-color-on-surface-variant, #49454f));--_outline-color: var(--md-filter-chip-outline-color, var(--md-sys-color-outline, #79747e));--_outline-width: var(--md-filter-chip-outline-width, 1px);--_selected-container-color: var(--md-filter-chip-selected-container-color, var(--md-sys-color-secondary-container, #e8def8));--_selected-outline-width: var(--md-filter-chip-selected-outline-width, 0px);--_focus-label-text-color: var(--md-filter-chip-focus-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-label-text-color: var(--md-filter-chip-hover-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-color: var(--md-filter-chip-hover-state-layer-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-opacity: var(--md-filter-chip-hover-state-layer-opacity, 0.08);--_label-text-color: var(--md-filter-chip-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-label-text-color: var(--md-filter-chip-pressed-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-state-layer-color: var(--md-filter-chip-pressed-state-layer-color, var(--md-sys-color-on-secondary-container, #1d192b));--_pressed-state-layer-opacity: var(--md-filter-chip-pressed-state-layer-opacity, 0.12);--_icon-size: var(--md-filter-chip-icon-size, 18px);--_disabled-leading-icon-color: var(--md-filter-chip-disabled-leading-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-leading-icon-opacity: var(--md-filter-chip-disabled-leading-icon-opacity, 0.38);--_selected-focus-leading-icon-color: var(--md-filter-chip-selected-focus-leading-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-hover-leading-icon-color: var(--md-filter-chip-selected-hover-leading-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-leading-icon-color: var(--md-filter-chip-selected-leading-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-pressed-leading-icon-color: var(--md-filter-chip-selected-pressed-leading-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_focus-leading-icon-color: var(--md-filter-chip-focus-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_hover-leading-icon-color: var(--md-filter-chip-hover-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_leading-icon-color: var(--md-filter-chip-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_pressed-leading-icon-color: var(--md-filter-chip-pressed-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_disabled-trailing-icon-color: var(--md-filter-chip-disabled-trailing-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-trailing-icon-opacity: var(--md-filter-chip-disabled-trailing-icon-opacity, 0.38);--_selected-focus-trailing-icon-color: var(--md-filter-chip-selected-focus-trailing-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-hover-trailing-icon-color: var(--md-filter-chip-selected-hover-trailing-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-pressed-trailing-icon-color: var(--md-filter-chip-selected-pressed-trailing-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-trailing-icon-color: var(--md-filter-chip-selected-trailing-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_focus-trailing-icon-color: var(--md-filter-chip-focus-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-trailing-icon-color: var(--md-filter-chip-hover-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-trailing-icon-color: var(--md-filter-chip-pressed-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_trailing-icon-color: var(--md-filter-chip-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_container-shape-start-start: var(--md-filter-chip-container-shape-start-start, var(--md-filter-chip-container-shape, var(--md-sys-shape-corner-small, 8px)));--_container-shape-start-end: var(--md-filter-chip-container-shape-start-end, var(--md-filter-chip-container-shape, var(--md-sys-shape-corner-small, 8px)));--_container-shape-end-end: var(--md-filter-chip-container-shape-end-end, var(--md-filter-chip-container-shape, var(--md-sys-shape-corner-small, 8px)));--_container-shape-end-start: var(--md-filter-chip-container-shape-end-start, var(--md-filter-chip-container-shape, var(--md-sys-shape-corner-small, 8px)));--_leading-space: var(--md-filter-chip-leading-space, 16px);--_trailing-space: var(--md-filter-chip-trailing-space, 16px);--_icon-label-space: var(--md-filter-chip-icon-label-space, 8px);--_with-leading-icon-leading-space: var(--md-filter-chip-with-leading-icon-leading-space, 8px);--_with-trailing-icon-trailing-space: var(--md-filter-chip-with-trailing-icon-trailing-space, 8px)}.selected.elevated::before{background:var(--_elevated-selected-container-color)}.checkmark{height:var(--_icon-size);width:var(--_icon-size)}.disabled .checkmark{opacity:var(--_disabled-leading-icon-opacity)}@media(forced-colors: active){.disabled .checkmark{opacity:1}}
`;/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Ui=m`.selected{--md-ripple-hover-color: var(--_selected-hover-state-layer-color);--md-ripple-hover-opacity: var(--_selected-hover-state-layer-opacity);--md-ripple-pressed-color: var(--_selected-pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_selected-pressed-state-layer-opacity)}:where(.selected)::before{background:var(--_selected-container-color)}:where(.selected) .outline{border-width:var(--_selected-outline-width)}:where(.selected.disabled)::before{background:var(--_disabled-selected-container-color);opacity:var(--_disabled-selected-container-opacity)}:where(.selected) .label{color:var(--_selected-label-text-color)}:where(.selected:hover) .label{color:var(--_selected-hover-label-text-color)}:where(.selected:focus) .label{color:var(--_selected-focus-label-text-color)}:where(.selected:active) .label{color:var(--_selected-pressed-label-text-color)}:where(.selected) .leading.icon{color:var(--_selected-leading-icon-color)}:where(.selected:hover) .leading.icon{color:var(--_selected-hover-leading-icon-color)}:where(.selected:focus) .leading.icon{color:var(--_selected-focus-leading-icon-color)}:where(.selected:active) .leading.icon{color:var(--_selected-pressed-leading-icon-color)}@media(forced-colors: active){:where(.selected:not(.elevated))::before{border:1px solid CanvasText}:where(.selected) .outline{border-width:1px}}
`;/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Hi=m`.trailing.action{align-items:center;justify-content:center;padding-inline-start:var(--_icon-label-space);padding-inline-end:var(--_with-trailing-icon-trailing-space)}.trailing.action :is(md-ripple,md-focus-ring){border-radius:50%;height:calc(1.3333333333*var(--_icon-size));width:calc(1.3333333333*var(--_icon-size))}.trailing.action md-focus-ring{inset:unset}.has-trailing .primary.action{padding-inline-end:0}.trailing.icon{color:var(--_trailing-icon-color);height:var(--_icon-size);width:var(--_icon-size)}:where(:hover) .trailing.icon{color:var(--_hover-trailing-icon-color)}:where(:focus) .trailing.icon{color:var(--_focus-trailing-icon-color)}:where(:active) .trailing.icon{color:var(--_pressed-trailing-icon-color)}:where(.disabled) .trailing.icon{color:var(--_disabled-trailing-icon-color);opacity:var(--_disabled-trailing-icon-opacity)}:where(.selected) .trailing.icon{color:var(--_selected-trailing-icon-color)}:where(.selected:hover) .trailing.icon{color:var(--_selected-hover-trailing-icon-color)}:where(.selected:focus) .trailing.icon{color:var(--_selected-focus-trailing-icon-color)}:where(.selected:active) .trailing.icon{color:var(--_selected-pressed-trailing-icon-color)}@media(forced-colors: active){.trailing.icon{color:ButtonText}:where(.disabled) .trailing.icon{color:GrayText;opacity:1}}
`;/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let Tt=class extends le{};Tt.styles=[Nr,Mr,Hi,Ui,Bi];Tt=l([_("md-filter-chip")],Tt);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Vi=X(x);class Ee extends Vi{constructor(){super(...arguments),this.size="medium",this.label="",this.lowered=!1}render(){const{ariaLabel:e}=this;return d`
      <button
        class="fab ${L(this.getRenderClasses())}"
        aria-label=${e||h}>
        <md-elevation part="elevation"></md-elevation>
        <md-focus-ring part="focus-ring"></md-focus-ring>
        <md-ripple class="ripple"></md-ripple>
        ${this.renderTouchTarget()} ${this.renderIcon()} ${this.renderLabel()}
      </button>
    `}getRenderClasses(){const e=!!this.label;return{lowered:this.lowered,small:this.size==="small"&&!e,large:this.size==="large"&&!e,extended:e}}renderTouchTarget(){return d`<div class="touch-target"></div>`}renderLabel(){return this.label?d`<span class="label">${this.label}</span>`:""}renderIcon(){const{ariaLabel:e}=this;return d`<span class="icon">
      <slot
        name="icon"
        aria-hidden=${e||this.label?"true":h}>
        <span></span>
      </slot>
    </span>`}}Ee.shadowRootOptions={mode:"open",delegatesFocus:!0};l([p({reflect:!0})],Ee.prototype,"size",void 0);l([p()],Ee.prototype,"label",void 0);l([p({type:Boolean})],Ee.prototype,"lowered",void 0);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Br extends Ee{constructor(){super(...arguments),this.variant="surface"}getRenderClasses(){return{...super.getRenderClasses(),primary:this.variant==="primary",secondary:this.variant==="secondary",tertiary:this.variant==="tertiary"}}}l([p()],Br.prototype,"variant",void 0);/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const ji=m`:host{--_container-color: var(--md-fab-container-color, var(--md-sys-color-surface-container-high, #ece6f0));--_container-elevation: var(--md-fab-container-elevation, 3);--_container-height: var(--md-fab-container-height, 56px);--_container-shadow-color: var(--md-fab-container-shadow-color, var(--md-sys-color-shadow, #000));--_container-width: var(--md-fab-container-width, 56px);--_focus-container-elevation: var(--md-fab-focus-container-elevation, 3);--_focus-icon-color: var(--md-fab-focus-icon-color, var(--md-sys-color-primary, #6750a4));--_hover-container-elevation: var(--md-fab-hover-container-elevation, 4);--_hover-icon-color: var(--md-fab-hover-icon-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-color: var(--md-fab-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-opacity: var(--md-fab-hover-state-layer-opacity, 0.08);--_icon-color: var(--md-fab-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-size: var(--md-fab-icon-size, 24px);--_lowered-container-color: var(--md-fab-lowered-container-color, var(--md-sys-color-surface-container-low, #f7f2fa));--_lowered-container-elevation: var(--md-fab-lowered-container-elevation, 1);--_lowered-focus-container-elevation: var(--md-fab-lowered-focus-container-elevation, 1);--_lowered-hover-container-elevation: var(--md-fab-lowered-hover-container-elevation, 2);--_lowered-pressed-container-elevation: var(--md-fab-lowered-pressed-container-elevation, 1);--_pressed-container-elevation: var(--md-fab-pressed-container-elevation, 3);--_pressed-icon-color: var(--md-fab-pressed-icon-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-color: var(--md-fab-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-opacity: var(--md-fab-pressed-state-layer-opacity, 0.12);--_focus-label-text-color: var(--md-fab-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_hover-label-text-color: var(--md-fab-hover-label-text-color, var(--md-sys-color-primary, #6750a4));--_label-text-color: var(--md-fab-label-text-color, var(--md-sys-color-primary, #6750a4));--_label-text-font: var(--md-fab-label-text-font, var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-fab-label-text-line-height, var(--md-sys-typescale-label-large-line-height, 1.25rem));--_label-text-size: var(--md-fab-label-text-size, var(--md-sys-typescale-label-large-size, 0.875rem));--_label-text-weight: var(--md-fab-label-text-weight, var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)));--_large-container-height: var(--md-fab-large-container-height, 96px);--_large-container-width: var(--md-fab-large-container-width, 96px);--_large-icon-size: var(--md-fab-large-icon-size, 36px);--_pressed-label-text-color: var(--md-fab-pressed-label-text-color, var(--md-sys-color-primary, #6750a4));--_primary-container-color: var(--md-fab-primary-container-color, var(--md-sys-color-primary-container, #eaddff));--_primary-focus-icon-color: var(--md-fab-primary-focus-icon-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-focus-label-text-color: var(--md-fab-primary-focus-label-text-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-hover-icon-color: var(--md-fab-primary-hover-icon-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-hover-label-text-color: var(--md-fab-primary-hover-label-text-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-hover-state-layer-color: var(--md-fab-primary-hover-state-layer-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-icon-color: var(--md-fab-primary-icon-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-label-text-color: var(--md-fab-primary-label-text-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-pressed-icon-color: var(--md-fab-primary-pressed-icon-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-pressed-label-text-color: var(--md-fab-primary-pressed-label-text-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-pressed-state-layer-color: var(--md-fab-primary-pressed-state-layer-color, var(--md-sys-color-on-primary-container, #21005d));--_secondary-container-color: var(--md-fab-secondary-container-color, var(--md-sys-color-secondary-container, #e8def8));--_secondary-focus-icon-color: var(--md-fab-secondary-focus-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-focus-label-text-color: var(--md-fab-secondary-focus-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-hover-icon-color: var(--md-fab-secondary-hover-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-hover-label-text-color: var(--md-fab-secondary-hover-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-hover-state-layer-color: var(--md-fab-secondary-hover-state-layer-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-icon-color: var(--md-fab-secondary-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-label-text-color: var(--md-fab-secondary-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-pressed-icon-color: var(--md-fab-secondary-pressed-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-pressed-label-text-color: var(--md-fab-secondary-pressed-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-pressed-state-layer-color: var(--md-fab-secondary-pressed-state-layer-color, var(--md-sys-color-on-secondary-container, #1d192b));--_small-container-height: var(--md-fab-small-container-height, 40px);--_small-container-width: var(--md-fab-small-container-width, 40px);--_small-icon-size: var(--md-fab-small-icon-size, 24px);--_tertiary-container-color: var(--md-fab-tertiary-container-color, var(--md-sys-color-tertiary-container, #ffd8e4));--_tertiary-focus-icon-color: var(--md-fab-tertiary-focus-icon-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-focus-label-text-color: var(--md-fab-tertiary-focus-label-text-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-hover-icon-color: var(--md-fab-tertiary-hover-icon-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-hover-label-text-color: var(--md-fab-tertiary-hover-label-text-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-hover-state-layer-color: var(--md-fab-tertiary-hover-state-layer-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-icon-color: var(--md-fab-tertiary-icon-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-label-text-color: var(--md-fab-tertiary-label-text-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-pressed-icon-color: var(--md-fab-tertiary-pressed-icon-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-pressed-label-text-color: var(--md-fab-tertiary-pressed-label-text-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-pressed-state-layer-color: var(--md-fab-tertiary-pressed-state-layer-color, var(--md-sys-color-on-tertiary-container, #31111d));--_container-shape-start-start: var(--md-fab-container-shape-start-start, var(--md-fab-container-shape, var(--md-sys-shape-corner-large, 16px)));--_container-shape-start-end: var(--md-fab-container-shape-start-end, var(--md-fab-container-shape, var(--md-sys-shape-corner-large, 16px)));--_container-shape-end-end: var(--md-fab-container-shape-end-end, var(--md-fab-container-shape, var(--md-sys-shape-corner-large, 16px)));--_container-shape-end-start: var(--md-fab-container-shape-end-start, var(--md-fab-container-shape, var(--md-sys-shape-corner-large, 16px)));--_large-container-shape-start-start: var(--md-fab-large-container-shape-start-start, var(--md-fab-large-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));--_large-container-shape-start-end: var(--md-fab-large-container-shape-start-end, var(--md-fab-large-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));--_large-container-shape-end-end: var(--md-fab-large-container-shape-end-end, var(--md-fab-large-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));--_large-container-shape-end-start: var(--md-fab-large-container-shape-end-start, var(--md-fab-large-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));--_small-container-shape-start-start: var(--md-fab-small-container-shape-start-start, var(--md-fab-small-container-shape, var(--md-sys-shape-corner-medium, 12px)));--_small-container-shape-start-end: var(--md-fab-small-container-shape-start-end, var(--md-fab-small-container-shape, var(--md-sys-shape-corner-medium, 12px)));--_small-container-shape-end-end: var(--md-fab-small-container-shape-end-end, var(--md-fab-small-container-shape, var(--md-sys-shape-corner-medium, 12px)));--_small-container-shape-end-start: var(--md-fab-small-container-shape-end-start, var(--md-fab-small-container-shape, var(--md-sys-shape-corner-medium, 12px)));cursor:pointer}:host([size=small][touch-target=wrapper]){margin:max(0px,48px - var(--_small-container-height))}.fab .icon ::slotted(*){color:var(--_icon-color)}.fab:focus{color:var(--_focus-icon-color)}.fab:hover{color:var(--_hover-icon-color)}.fab:active{color:var(--_pressed-icon-color)}.fab{cursor:inherit}.fab.primary{background-color:var(--_primary-container-color);--md-ripple-hover-color: var(--_primary-hover-state-layer-color);--md-ripple-pressed-color: var(--_primary-pressed-state-layer-color)}.fab.primary .icon ::slotted(*){color:var(--_primary-icon-color)}.fab.primary:focus{color:var(--_primary-focus-icon-color)}.fab.primary:hover{color:var(--_primary-hover-icon-color)}.fab.primary:active{color:var(--_primary-pressed-icon-color)}.fab.primary .label{color:var(--_primary-label-text-color)}.fab:hover .fab.primary .label{color:var(--_primary-hover-label-text-color)}.fab:focus .fab.primary .label{color:var(--_primary-focus-label-text-color)}.fab:active .fab.primary .label{color:var(--_primary-pressed-label-text-color)}.fab.secondary{background-color:var(--_secondary-container-color);--md-ripple-hover-color: var(--_secondary-hover-state-layer-color);--md-ripple-pressed-color: var(--_secondary-pressed-state-layer-color)}.fab.secondary .icon ::slotted(*){color:var(--_secondary-icon-color)}.fab.secondary:focus{color:var(--_secondary-focus-icon-color)}.fab.secondary:hover{color:var(--_secondary-hover-icon-color)}.fab.secondary:active{color:var(--_secondary-pressed-icon-color)}.fab.secondary .label{color:var(--_secondary-label-text-color)}.fab:hover .fab.secondary .label{color:var(--_secondary-hover-label-text-color)}.fab:focus .fab.secondary .label{color:var(--_secondary-focus-label-text-color)}.fab:active .fab.secondary .label{color:var(--_secondary-pressed-label-text-color)}.fab.tertiary{background-color:var(--_tertiary-container-color);--md-ripple-hover-color: var(--_tertiary-hover-state-layer-color);--md-ripple-pressed-color: var(--_tertiary-pressed-state-layer-color)}.fab.tertiary .icon ::slotted(*){color:var(--_tertiary-icon-color)}.fab.tertiary:focus{color:var(--_tertiary-focus-icon-color)}.fab.tertiary:hover{color:var(--_tertiary-hover-icon-color)}.fab.tertiary:active{color:var(--_tertiary-pressed-icon-color)}.fab.tertiary .label{color:var(--_tertiary-label-text-color)}.fab:hover .fab.tertiary .label{color:var(--_tertiary-hover-label-text-color)}.fab:focus .fab.tertiary .label{color:var(--_tertiary-focus-label-text-color)}.fab:active .fab.tertiary .label{color:var(--_tertiary-pressed-label-text-color)}.fab.extended slot span{padding-inline-start:4px}.fab.small{width:var(--_small-container-width);height:var(--_small-container-height)}.fab.small .icon ::slotted(*){width:var(--_small-icon-size);height:var(--_small-icon-size);font-size:var(--_small-icon-size)}.fab.small,.fab.small .ripple{border-start-start-radius:var(--_small-container-shape-start-start);border-start-end-radius:var(--_small-container-shape-start-end);border-end-start-radius:var(--_small-container-shape-end-start);border-end-end-radius:var(--_small-container-shape-end-end)}.fab.small md-focus-ring{--md-focus-ring-shape-start-start: var(--_small-container-shape-start-start);--md-focus-ring-shape-start-end: var(--_small-container-shape-start-end);--md-focus-ring-shape-end-end: var(--_small-container-shape-end-end);--md-focus-ring-shape-end-start: var(--_small-container-shape-end-start)}
`;/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const qi=m`@media(forced-colors: active){.fab{border:1px solid ButtonText}.fab.extended{padding-inline-start:15px;padding-inline-end:19px}md-focus-ring{--md-focus-ring-outward-offset: 3px}}
`;/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Ki=m`:host{--md-ripple-hover-opacity: var(--_hover-state-layer-opacity);--md-ripple-pressed-opacity: var(--_pressed-state-layer-opacity);display:inline-flex;-webkit-tap-highlight-color:rgba(0,0,0,0)}:host([size=medium][touch-target=wrapper]){margin:max(0px,48px - var(--_container-height))}:host([size=large][touch-target=wrapper]){margin:max(0px,48px - var(--_large-container-height))}.fab,.icon,.icon ::slotted(*){display:flex}.fab{align-items:center;justify-content:center;vertical-align:middle;padding:0;position:relative;height:var(--_container-height);transition-property:background-color;border-width:0px;outline:none;z-index:0;text-transform:inherit}.fab.extended{width:inherit;box-sizing:border-box;padding-inline-start:16px;padding-inline-end:20px}.fab:not(.extended){width:var(--_container-width)}.fab.large{width:var(--_large-container-width);height:var(--_large-container-height)}.fab.large .icon ::slotted(*){width:var(--_large-icon-size);height:var(--_large-icon-size);font-size:var(--_large-icon-size)}.fab.large,.fab.large .ripple{border-start-start-radius:var(--_large-container-shape-start-start);border-start-end-radius:var(--_large-container-shape-start-end);border-end-start-radius:var(--_large-container-shape-end-start);border-end-end-radius:var(--_large-container-shape-end-end)}.fab.large md-focus-ring{--md-focus-ring-shape-start-start: var(--_large-container-shape-start-start);--md-focus-ring-shape-start-end: var(--_large-container-shape-start-end);--md-focus-ring-shape-end-end: var(--_large-container-shape-end-end);--md-focus-ring-shape-end-start: var(--_large-container-shape-end-start)}.fab{--md-elevation-level: var(--_container-elevation);--md-elevation-shadow-color: var(--_container-shadow-color)}.fab:focus{--md-elevation-level: var(--_focus-container-elevation)}.fab:hover{--md-elevation-level: var(--_hover-container-elevation)}.fab:active{--md-elevation-level: var(--_pressed-container-elevation)}.fab.lowered{background-color:var(--_lowered-container-color);--md-elevation-level: var(--_lowered-container-elevation)}.fab.lowered:focus{--md-elevation-level: var(--_lowered-focus-container-elevation)}.fab.lowered:hover{--md-elevation-level: var(--_lowered-hover-container-elevation)}.fab.lowered:active{--md-elevation-level: var(--_lowered-pressed-container-elevation)}.fab{background-color:var(--_container-color);--md-ripple-hover-color: var(--_hover-state-layer-color);--md-ripple-pressed-color: var(--_pressed-state-layer-color)}.fab .label{color:var(--_label-text-color)}.fab:hover .fab .label{color:var(--_hover-label-text-color)}.fab:focus .fab .label{color:var(--_focus-label-text-color)}.fab:active .fab .label{color:var(--_pressed-label-text-color)}.label{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-family:var(--_label-text-font);font-size:var(--_label-text-size);line-height:var(--_label-text-line-height);font-weight:var(--_label-text-weight)}.fab.extended .icon ::slotted(*){margin-inline-end:12px}.ripple{overflow:hidden}.ripple,md-elevation{z-index:-1}.touch-target{position:absolute;top:50%;height:48px;left:50%;width:48px;transform:translate(-50%, -50%)}:host([touch-target=none]) .touch-target{display:none}md-elevation,.fab{transition-duration:280ms;transition-timing-function:cubic-bezier(0.2, 0, 0, 1)}.fab,.ripple{border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end)}md-focus-ring{--md-focus-ring-shape-start-start: var(--_container-shape-start-start);--md-focus-ring-shape-start-end: var(--_container-shape-start-end);--md-focus-ring-shape-end-end: var(--_container-shape-end-end);--md-focus-ring-shape-end-start: var(--_container-shape-end-start)}.icon ::slotted(*){width:var(--_icon-size);height:var(--_icon-size);font-size:var(--_icon-size)}
`;/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let St=class extends Br{};St.styles=[Ki,ji,qi];St=l([_("md-fab")],St);/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Gi extends x{render(){return d`<slot></slot>`}connectedCallback(){if(super.connectedCallback(),this.getAttribute("aria-hidden")==="false"){this.removeAttribute("aria-hidden");return}this.setAttribute("aria-hidden","true")}}/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Wi=m`:host{font-size:var(--md-icon-size, 24px);width:var(--md-icon-size, 24px);height:var(--md-icon-size, 24px);color:inherit;font-variation-settings:inherit;font-weight:400;font-family:var(--md-icon-font, Material Symbols Outlined);display:inline-flex;font-style:normal;place-items:center;place-content:center;line-height:1;overflow:hidden;letter-spacing:normal;text-transform:none;user-select:none;white-space:nowrap;word-wrap:normal;flex-shrink:0;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale}::slotted(svg){fill:currentColor}::slotted(*){height:100%;width:100%}
`;/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let Ft=class extends Gi{};Ft.styles=[Wi];Ft=l([_("md-icon")],Ft);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function Ur(r,e=K){const t=Vr(r,e);return t&&(t.tabIndex=0,t.focus()),t}function Hr(r,e=K){const t=Yi(r,e);return t&&(t.tabIndex=0,t.focus()),t}function st(r,e=K){for(let t=0;t<r.length;t++){const o=r[t];if(o.tabIndex===0&&e(o))return{item:o,index:t}}return null}function Vr(r,e=K){for(const t of r)if(e(t))return t;return null}function Yi(r,e=K){for(let t=r.length-1;t>=0;t--){const o=r[t];if(e(o))return o}return null}function Zi(r,e,t=K,o=!0){for(let i=1;i<r.length;i++){const a=(i+e)%r.length;if(a<e&&!o)return null;const s=r[a];if(t(s))return s}return r[e]?r[e]:null}function Xi(r,e,t=K,o=!0){for(let i=1;i<r.length;i++){const a=(e-i+r.length)%r.length;if(a>e&&!o)return null;const s=r[a];if(t(s))return s}return r[e]?r[e]:null}function gr(r,e,t=K,o=!0){if(e){const i=Zi(r,e.index,t,o);return i&&(i.tabIndex=0,i.focus()),i}else return Ur(r,t)}function yr(r,e,t=K,o=!0){if(e){const i=Xi(r,e.index,t,o);return i&&(i.tabIndex=0,i.focus()),i}else return Hr(r,t)}function Ji(){return new Event("request-activation",{bubbles:!0,composed:!0})}function K(r){return!r.disabled}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const V={ArrowDown:"ArrowDown",ArrowLeft:"ArrowLeft",ArrowUp:"ArrowUp",ArrowRight:"ArrowRight",Home:"Home",End:"End"};class Qi{constructor(e){this.handleKeydown=f=>{const v=f.key;if(f.defaultPrevented||!this.isNavigableKey(v))return;const b=this.items;if(!b.length)return;const w=st(b,this.isActivatable);f.preventDefault();const F=this.isRtl(),Q=F?V.ArrowRight:V.ArrowLeft,ee=F?V.ArrowLeft:V.ArrowRight;let D=null;switch(v){case V.ArrowDown:case ee:D=gr(b,w,this.isActivatable,this.wrapNavigation());break;case V.ArrowUp:case Q:D=yr(b,w,this.isActivatable,this.wrapNavigation());break;case V.Home:D=Ur(b,this.isActivatable);break;case V.End:D=Hr(b,this.isActivatable);break}D&&w&&w.item!==D&&(w.item.tabIndex=-1)},this.onDeactivateItems=()=>{const f=this.items;for(const v of f)this.deactivateItem(v)},this.onRequestActivation=f=>{this.onDeactivateItems();const v=f.target;this.activateItem(v),v.focus()},this.onSlotchange=()=>{const f=this.items;let v=!1;for(const w of f){if(!w.disabled&&w.tabIndex>-1&&!v){v=!0,w.tabIndex=0;continue}w.tabIndex=-1}if(v)return;const b=Vr(f,this.isActivatable);b&&(b.tabIndex=0)};const{isItem:t,getPossibleItems:o,isRtl:i,deactivateItem:a,activateItem:s,isNavigableKey:n,isActivatable:c,wrapNavigation:u}=e;this.isItem=t,this.getPossibleItems=o,this.isRtl=i,this.deactivateItem=a,this.activateItem=s,this.isNavigableKey=n,this.isActivatable=c,this.wrapNavigation=u??(()=>!0)}get items(){const e=this.getPossibleItems(),t=[];for(const o of e){if(this.isItem(o)){t.push(o);continue}const a=o.item;a&&this.isItem(a)&&t.push(a)}return t}activateNextItem(){const e=this.items,t=st(e,this.isActivatable);return t&&(t.item.tabIndex=-1),gr(e,t,this.isActivatable,this.wrapNavigation())}activatePreviousItem(){const e=this.items,t=st(e,this.isActivatable);return t&&(t.item.tabIndex=-1),yr(e,t,this.isActivatable,this.wrapNavigation())}}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const ea=new Set(Object.values(V));class jr extends x{get items(){return this.listController.items}constructor(){super(),this.listController=new Qi({isItem:e=>e.hasAttribute("md-list-item"),getPossibleItems:()=>this.slotItems,isRtl:()=>getComputedStyle(this).direction==="rtl",deactivateItem:e=>{e.tabIndex=-1},activateItem:e=>{e.tabIndex=0},isNavigableKey:e=>ea.has(e),isActivatable:e=>!e.disabled&&e.type!=="text"}),this.internals=this.attachInternals(),this.internals.role="list",this.addEventListener("keydown",this.listController.handleKeydown)}render(){return d`
      <slot
        @deactivate-items=${this.listController.onDeactivateItems}
        @request-activation=${this.listController.onRequestActivation}
        @slotchange=${this.listController.onSlotchange}>
      </slot>
    `}activateNextItem(){return this.listController.activateNextItem()}activatePreviousItem(){return this.listController.activatePreviousItem()}}l([Z({flatten:!0})],jr.prototype,"slotItems",void 0);/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const ta=m`:host{background:var(--md-list-container-color, var(--md-sys-color-surface, #fef7ff));color:unset;display:flex;flex-direction:column;outline:none;padding:8px 0;position:relative}
`;/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let Rt=class extends jr{};Rt.styles=[ta];Rt=l([_("md-list")],Rt);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Xt extends x{constructor(){super(...arguments),this.multiline=!1}render(){return d`
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
    `}handleTextSlotChange(){let e=!1,t=0;for(const o of this.textSlots)if(ra(o)&&(t+=1),t>1){e=!0;break}this.multiline=e}}l([p({type:Boolean,reflect:!0})],Xt.prototype,"multiline",void 0);l([uo(".text slot")],Xt.prototype,"textSlots",void 0);function ra(r){var e;for(const t of r.assignedNodes({flatten:!0})){const o=t.nodeType===Node.ELEMENT_NODE,i=t.nodeType===Node.TEXT_NODE&&((e=t.textContent)==null?void 0:e.match(/\S/));if(o||i)return!0}return!1}/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const oa=m`:host{color:var(--md-sys-color-on-surface, #1d1b20);font-family:var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto));font-size:var(--md-sys-typescale-body-large-size, 1rem);font-weight:var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400));line-height:var(--md-sys-typescale-body-large-line-height, 1.5rem);align-items:center;box-sizing:border-box;display:flex;gap:16px;min-height:56px;overflow:hidden;padding:12px 16px;position:relative;text-overflow:ellipsis}:host([multiline]){min-height:72px}[name=overline]{color:var(--md-sys-color-on-surface-variant, #49454f);font-family:var(--md-sys-typescale-label-small-font, var(--md-ref-typeface-plain, Roboto));font-size:var(--md-sys-typescale-label-small-size, 0.6875rem);font-weight:var(--md-sys-typescale-label-small-weight, var(--md-ref-typeface-weight-medium, 500));line-height:var(--md-sys-typescale-label-small-line-height, 1rem)}[name=supporting-text]{color:var(--md-sys-color-on-surface-variant, #49454f);font-family:var(--md-sys-typescale-body-medium-font, var(--md-ref-typeface-plain, Roboto));font-size:var(--md-sys-typescale-body-medium-size, 0.875rem);font-weight:var(--md-sys-typescale-body-medium-weight, var(--md-ref-typeface-weight-regular, 400));line-height:var(--md-sys-typescale-body-medium-line-height, 1.25rem)}[name=trailing-supporting-text]{color:var(--md-sys-color-on-surface-variant, #49454f);font-family:var(--md-sys-typescale-label-small-font, var(--md-ref-typeface-plain, Roboto));font-size:var(--md-sys-typescale-label-small-size, 0.6875rem);font-weight:var(--md-sys-typescale-label-small-weight, var(--md-ref-typeface-weight-medium, 500));line-height:var(--md-sys-typescale-label-small-line-height, 1rem)}[name=container]::slotted(*){inset:0;position:absolute}.default-slot{display:inline}.default-slot,.text ::slotted(*){overflow:hidden;text-overflow:ellipsis}.text{display:flex;flex:1;flex-direction:column;overflow:hidden}
`;/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let Lt=class extends Xt{};Lt.styles=[oa];Lt=l([_("md-item")],Lt);/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const ia=X(x);class J extends ia{constructor(){super(...arguments),this.disabled=!1,this.type="text",this.isListItem=!0,this.href="",this.target=""}get isDisabled(){return this.disabled&&this.type!=="link"}willUpdate(e){this.href&&(this.type="link"),super.willUpdate(e)}render(){return this.renderListItem(d`
      <md-item>
        <div slot="container">
          ${this.renderRipple()} ${this.renderFocusRing()}
        </div>
        <slot name="start" slot="start"></slot>
        <slot name="end" slot="end"></slot>
        ${this.renderBody()}
      </md-item>
    `)}renderListItem(e){const t=this.type==="link";let o;switch(this.type){case"link":o=j`a`;break;case"button":o=j`button`;break;default:case"text":o=j`li`;break}const i=this.type!=="text",a=t&&this.target?this.target:h;return Yt`
      <${o}
        id="item"
        tabindex="${this.isDisabled||!i?-1:0}"
        ?disabled=${this.isDisabled}
        role="listitem"
        aria-selected=${this.ariaSelected||h}
        aria-checked=${this.ariaChecked||h}
        aria-expanded=${this.ariaExpanded||h}
        aria-haspopup=${this.ariaHasPopup||h}
        class="list-item ${L(this.getRenderClasses())}"
        href=${this.href||h}
        target=${a}
        @focus=${this.onFocus}
      >${e}</${o}>
    `}renderRipple(){return this.type==="text"?h:d` <md-ripple
      part="ripple"
      for="item"
      ?disabled=${this.isDisabled}></md-ripple>`}renderFocusRing(){return this.type==="text"?h:d` <md-focus-ring
      @visibility-changed=${this.onFocusRingVisibilityChanged}
      part="focus-ring"
      for="item"
      inward></md-focus-ring>`}onFocusRingVisibilityChanged(e){}getRenderClasses(){return{disabled:this.isDisabled}}renderBody(){return d`
      <slot></slot>
      <slot name="overline" slot="overline"></slot>
      <slot name="headline" slot="headline"></slot>
      <slot name="supporting-text" slot="supporting-text"></slot>
      <slot
        name="trailing-supporting-text"
        slot="trailing-supporting-text"></slot>
    `}onFocus(){this.tabIndex===-1&&this.dispatchEvent(Ji())}focus(){var e;(e=this.listItemRoot)==null||e.focus()}click(){if(!this.listItemRoot){super.click();return}this.listItemRoot.click()}}J.shadowRootOptions={...x.shadowRootOptions,delegatesFocus:!0};l([p({type:Boolean,reflect:!0})],J.prototype,"disabled",void 0);l([p({reflect:!0})],J.prototype,"type",void 0);l([p({type:Boolean,attribute:"md-list-item",reflect:!0})],J.prototype,"isListItem",void 0);l([p()],J.prototype,"href",void 0);l([p()],J.prototype,"target",void 0);l([$(".list-item")],J.prototype,"listItemRoot",void 0);/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const aa=m`:host{display:flex;-webkit-tap-highlight-color:rgba(0,0,0,0);--md-ripple-hover-color: var(--md-list-item-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--md-ripple-hover-opacity: var(--md-list-item-hover-state-layer-opacity, 0.08);--md-ripple-pressed-color: var(--md-list-item-pressed-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--md-ripple-pressed-opacity: var(--md-list-item-pressed-state-layer-opacity, 0.12)}:host(:is([type=button]:not([disabled]),[type=link])){cursor:pointer}md-focus-ring{z-index:1;--md-focus-ring-shape: 8px}a,button,li{background:none;border:none;cursor:inherit;padding:0;margin:0;text-align:unset;text-decoration:none}.list-item{border-radius:inherit;display:flex;flex:1;max-width:inherit;min-width:inherit;outline:none;-webkit-tap-highlight-color:rgba(0,0,0,0);width:100%}.list-item.interactive{cursor:pointer}.list-item.disabled{opacity:var(--md-list-item-disabled-opacity, 0.3);pointer-events:none}[slot=container]{pointer-events:none}md-ripple{border-radius:inherit}md-item{border-radius:inherit;flex:1;height:100%;color:var(--md-list-item-label-text-color, var(--md-sys-color-on-surface, #1d1b20));font-family:var(--md-list-item-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));font-size:var(--md-list-item-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));line-height:var(--md-list-item-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));font-weight:var(--md-list-item-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));min-height:var(--md-list-item-one-line-container-height, 56px);padding-top:var(--md-list-item-top-space, 12px);padding-bottom:var(--md-list-item-bottom-space, 12px);padding-inline-start:var(--md-list-item-leading-space, 16px);padding-inline-end:var(--md-list-item-trailing-space, 16px)}md-item[multiline]{min-height:var(--md-list-item-two-line-container-height, 72px)}[slot=supporting-text]{color:var(--md-list-item-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));font-family:var(--md-list-item-supporting-text-font, var(--md-sys-typescale-body-medium-font, var(--md-ref-typeface-plain, Roboto)));font-size:var(--md-list-item-supporting-text-size, var(--md-sys-typescale-body-medium-size, 0.875rem));line-height:var(--md-list-item-supporting-text-line-height, var(--md-sys-typescale-body-medium-line-height, 1.25rem));font-weight:var(--md-list-item-supporting-text-weight, var(--md-sys-typescale-body-medium-weight, var(--md-ref-typeface-weight-regular, 400)))}[slot=trailing-supporting-text]{color:var(--md-list-item-trailing-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));font-family:var(--md-list-item-trailing-supporting-text-font, var(--md-sys-typescale-label-small-font, var(--md-ref-typeface-plain, Roboto)));font-size:var(--md-list-item-trailing-supporting-text-size, var(--md-sys-typescale-label-small-size, 0.6875rem));line-height:var(--md-list-item-trailing-supporting-text-line-height, var(--md-sys-typescale-label-small-line-height, 1rem));font-weight:var(--md-list-item-trailing-supporting-text-weight, var(--md-sys-typescale-label-small-weight, var(--md-ref-typeface-weight-medium, 500)))}:is([slot=start],[slot=end])::slotted(*){fill:currentColor}[slot=start]{color:var(--md-list-item-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f))}[slot=end]{color:var(--md-list-item-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f))}@media(forced-colors: active){.disabled slot{color:GrayText}.list-item.disabled{color:GrayText;opacity:1}}
`;/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let Ot=class extends J{};Ot.styles=[aa];Ot=l([_("md-list-item")],Ot);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Pe=Symbol("isFocusable"),lt=Symbol("privateIsFocusable"),De=Symbol("externalTabIndex"),Me=Symbol("isUpdatingTabIndex"),Ne=Symbol("updateTabIndex");function sa(r){var e,t,o;class i extends r{constructor(){super(...arguments),this[e]=!0,this[t]=null,this[o]=!1}get[Pe](){return this[lt]}set[Pe](s){this[Pe]!==s&&(this[lt]=s,this[Ne]())}connectedCallback(){super.connectedCallback(),this[Ne]()}attributeChangedCallback(s,n,c){if(s!=="tabindex"){super.attributeChangedCallback(s,n,c);return}if(this.requestUpdate("tabIndex",Number(n??-1)),!this[Me]){if(!this.hasAttribute("tabindex")){this[De]=null,this[Ne]();return}this[De]=this.tabIndex}}[(e=lt,t=De,o=Me,Ne)](){const s=this[Pe]?0:-1,n=this[De]??s;this[Me]=!0,this.tabIndex=n,this[Me]=!1}}return l([p({noAccessor:!0})],i.prototype,"tabIndex",void 0),i}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const qr=Symbol("animateIndicator"),la=sa(x);class B extends la{get selected(){return this.active}set selected(e){this.active=e}constructor(){super(),this.isTab=!0,this.active=!1,this.hasIcon=!1,this.iconOnly=!1,this.fullWidthIndicator=!1,this.internals=this.attachInternals(),this.internals.role="tab",this.addEventListener("keydown",this.handleKeydown.bind(this))}render(){const e=d`<div class="indicator"></div>`;return d`<div
      class="button"
      role="presentation"
      @click=${this.handleContentClick}>
      <md-focus-ring part="focus-ring" inward .control=${this}></md-focus-ring>
      <md-elevation part="elevation"></md-elevation>
      <md-ripple .control=${this}></md-ripple>
      <div
        class="content ${L(this.getContentClasses())}"
        role="presentation">
        <slot name="icon" @slotchange=${this.handleIconSlotChange}></slot>
        <slot @slotchange=${this.handleSlotChange}></slot>
        ${this.fullWidthIndicator?h:e}
      </div>
      ${this.fullWidthIndicator?e:h}
    </div>`}getContentClasses(){return{"has-icon":this.hasIcon,"has-label":!this.iconOnly}}updated(){this.internals.ariaSelected=String(this.active)}async handleKeydown(e){await 0,!e.defaultPrevented&&(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),this.click())}handleContentClick(e){e.stopPropagation(),this.click()}[qr](e){if(!this.indicator)return;this.indicator.getAnimations().forEach(o=>{o.cancel()});const t=this.getKeyframes(e);t!==null&&this.indicator.animate(t,{duration:250,easing:ae.EMPHASIZED})}getKeyframes(e){var v;const t=na();if(!this.active)return t?[{opacity:1},{transform:"none"}]:null;const o={},i=((v=e.indicator)==null?void 0:v.getBoundingClientRect())??{},a=i.left,s=i.width,n=this.indicator.getBoundingClientRect(),c=n.left,u=n.width,f=s/u;return!t&&a!==void 0&&c!==void 0&&!isNaN(f)?o.transform=`translateX(${(a-c).toFixed(4)}px) scaleX(${f.toFixed(4)})`:o.opacity=0,[o,{transform:"none"}]}handleSlotChange(){this.iconOnly=!1;for(const e of this.assignedDefaultNodes){const t=e.nodeType===Node.TEXT_NODE&&!!e.wholeText.match(/\S/);if(e.nodeType===Node.ELEMENT_NODE||t)return}this.iconOnly=!0}handleIconSlotChange(){this.hasIcon=this.assignedIcons.length>0}}l([p({type:Boolean,reflect:!0,attribute:"md-tab"})],B.prototype,"isTab",void 0);l([p({type:Boolean,reflect:!0})],B.prototype,"active",void 0);l([p({type:Boolean})],B.prototype,"selected",null);l([p({type:Boolean,attribute:"has-icon"})],B.prototype,"hasIcon",void 0);l([p({type:Boolean,attribute:"icon-only"})],B.prototype,"iconOnly",void 0);l([$(".indicator")],B.prototype,"indicator",void 0);l([g()],B.prototype,"fullWidthIndicator",void 0);l([vo({flatten:!0})],B.prototype,"assignedDefaultNodes",void 0);l([Z({slot:"icon",flatten:!0})],B.prototype,"assignedIcons",void 0);function na(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class ue extends x{get activeTab(){return this.tabs.find(e=>e.active)??null}set activeTab(e){e&&this.activateTab(e)}get activeTabIndex(){return this.tabs.findIndex(e=>e.active)}set activeTabIndex(e){const t=()=>{const o=this.tabs[e];o&&this.activateTab(o)};if(!this.slotElement){this.updateComplete.then(t);return}t()}get focusedTab(){return this.tabs.find(e=>e.matches(":focus-within"))}constructor(){super(),this.autoActivate=!1,this.internals=this.attachInternals(),this.internals.role="tablist",this.addEventListener("keydown",this.handleKeydown.bind(this)),this.addEventListener("keyup",this.handleKeyup.bind(this)),this.addEventListener("focusout",this.handleFocusout.bind(this))}async scrollToTab(e){await this.updateComplete;const{tabs:t}=this;if(e??(e=this.activeTab),!e||!t.includes(e)||!this.tabsScrollerElement)return;for(const b of this.tabs)await b.updateComplete;const o=e.offsetLeft,i=e.offsetWidth,a=this.scrollLeft,s=this.offsetWidth,n=48,c=o-n,u=o+i-s+n,f=Math.min(c,Math.max(u,a)),v=this.focusedTab?"auto":"instant";this.tabsScrollerElement.scrollTo({behavior:v,top:0,left:f})}render(){return d`
      <div class="tabs">
        <slot
          @slotchange=${this.handleSlotChange}
          @click=${this.handleTabClick}></slot>
      </div>
      <md-divider part="divider"></md-divider>
    `}async handleTabClick(e){const t=e.target;await 0,!(e.defaultPrevented||!da(t)||t.active)&&this.activateTab(t)}activateTab(e){const{tabs:t}=this,o=this.activeTab;if(!(!t.includes(e)||o===e)){for(const i of t)i.active=i===e;if(o){if(!this.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0}))){for(const a of t)a.active=a===o;return}e[qr](o)}this.updateFocusableTab(e),this.scrollToTab(e)}}updateFocusableTab(e){for(const t of this.tabs)t.tabIndex=t===e?0:-1}async handleKeydown(e){await 0;const t=e.key==="ArrowLeft",o=e.key==="ArrowRight",i=e.key==="Home",a=e.key==="End";if(e.defaultPrevented||!t&&!o&&!i&&!a)return;const{tabs:s}=this;if(s.length<2)return;e.preventDefault();let n;if(i||a)n=i?0:s.length-1;else{const f=getComputedStyle(this).direction==="rtl"?t:o,{focusedTab:v}=this;if(!v)n=f?0:s.length-1;else{const b=this.tabs.indexOf(v);n=f?b+1:b-1,n>=s.length?n=0:n<0&&(n=s.length-1)}}const c=s[n];c.focus(),this.autoActivate?this.activateTab(c):this.updateFocusableTab(c)}handleKeyup(){this.scrollToTab(this.focusedTab??this.activeTab)}handleFocusout(){if(this.matches(":focus-within"))return;const{activeTab:e}=this;e&&this.updateFocusableTab(e)}handleSlotChange(){const e=this.tabs[0];!this.activeTab&&e&&this.activateTab(e),this.scrollToTab(this.activeTab)}}l([Z({flatten:!0,selector:"[md-tab]"})],ue.prototype,"tabs",void 0);l([p({type:Number,attribute:"active-tab-index"})],ue.prototype,"activeTabIndex",null);l([p({type:Boolean,attribute:"auto-activate"})],ue.prototype,"autoActivate",void 0);l([$(".tabs")],ue.prototype,"tabsScrollerElement",void 0);l([$("slot")],ue.prototype,"slotElement",void 0);function da(r){return r instanceof HTMLElement&&r.hasAttribute("md-tab")}/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const ca=m`:host{box-sizing:border-box;display:flex;flex-direction:column;overflow:auto;scroll-behavior:smooth;scrollbar-width:none;position:relative}:host([hidden]){display:none}:host::-webkit-scrollbar{display:none}.tabs{align-items:end;display:flex;height:100%;overflow:inherit;scroll-behavior:inherit;scrollbar-width:inherit;justify-content:space-between;width:100%}::slotted(*){flex:1}::slotted([active]){z-index:1}
`;/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let Pt=class extends ue{};Pt.styles=[ca];Pt=l([_("md-tabs")],Pt);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Kr extends B{constructor(){super(...arguments),this.inlineIcon=!1}getContentClasses(){return{...super.getContentClasses(),stacked:!this.inlineIcon}}}l([p({type:Boolean,attribute:"inline-icon"})],Kr.prototype,"inlineIcon",void 0);/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const pa=m`:host{--_active-indicator-color: var(--md-primary-tab-active-indicator-color, var(--md-sys-color-primary, #6750a4));--_active-indicator-height: var(--md-primary-tab-active-indicator-height, 3px);--_active-indicator-shape: var(--md-primary-tab-active-indicator-shape, 3px 3px 0px 0px);--_active-hover-state-layer-color: var(--md-primary-tab-active-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_active-hover-state-layer-opacity: var(--md-primary-tab-active-hover-state-layer-opacity, 0.08);--_active-pressed-state-layer-color: var(--md-primary-tab-active-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_active-pressed-state-layer-opacity: var(--md-primary-tab-active-pressed-state-layer-opacity, 0.12);--_container-color: var(--md-primary-tab-container-color, var(--md-sys-color-surface, #fef7ff));--_container-elevation: var(--md-primary-tab-container-elevation, 0);--_container-height: var(--md-primary-tab-container-height, 48px);--_with-icon-and-label-text-container-height: var(--md-primary-tab-with-icon-and-label-text-container-height, 64px);--_hover-state-layer-color: var(--md-primary-tab-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-state-layer-opacity: var(--md-primary-tab-hover-state-layer-opacity, 0.08);--_pressed-state-layer-color: var(--md-primary-tab-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-opacity: var(--md-primary-tab-pressed-state-layer-opacity, 0.12);--_active-focus-icon-color: var(--md-primary-tab-active-focus-icon-color, var(--md-sys-color-primary, #6750a4));--_active-hover-icon-color: var(--md-primary-tab-active-hover-icon-color, var(--md-sys-color-primary, #6750a4));--_active-icon-color: var(--md-primary-tab-active-icon-color, var(--md-sys-color-primary, #6750a4));--_active-pressed-icon-color: var(--md-primary-tab-active-pressed-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-size: var(--md-primary-tab-icon-size, 24px);--_focus-icon-color: var(--md-primary-tab-focus-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-icon-color: var(--md-primary-tab-hover-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_icon-color: var(--md-primary-tab-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-icon-color: var(--md-primary-tab-pressed-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_label-text-font: var(--md-primary-tab-label-text-font, var(--md-sys-typescale-title-small-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-primary-tab-label-text-line-height, var(--md-sys-typescale-title-small-line-height, 1.25rem));--_label-text-size: var(--md-primary-tab-label-text-size, var(--md-sys-typescale-title-small-size, 0.875rem));--_label-text-weight: var(--md-primary-tab-label-text-weight, var(--md-sys-typescale-title-small-weight, var(--md-ref-typeface-weight-medium, 500)));--_active-focus-label-text-color: var(--md-primary-tab-active-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_active-hover-label-text-color: var(--md-primary-tab-active-hover-label-text-color, var(--md-sys-color-primary, #6750a4));--_active-label-text-color: var(--md-primary-tab-active-label-text-color, var(--md-sys-color-primary, #6750a4));--_active-pressed-label-text-color: var(--md-primary-tab-active-pressed-label-text-color, var(--md-sys-color-primary, #6750a4));--_focus-label-text-color: var(--md-primary-tab-focus-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-label-text-color: var(--md-primary-tab-hover-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_label-text-color: var(--md-primary-tab-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-label-text-color: var(--md-primary-tab-pressed-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_container-shape-start-start: var(--md-primary-tab-container-shape-start-start, var(--md-primary-tab-container-shape, var(--md-sys-shape-corner-none, 0px)));--_container-shape-start-end: var(--md-primary-tab-container-shape-start-end, var(--md-primary-tab-container-shape, var(--md-sys-shape-corner-none, 0px)));--_container-shape-end-end: var(--md-primary-tab-container-shape-end-end, var(--md-primary-tab-container-shape, var(--md-sys-shape-corner-none, 0px)));--_container-shape-end-start: var(--md-primary-tab-container-shape-end-start, var(--md-primary-tab-container-shape, var(--md-sys-shape-corner-none, 0px)))}.content.stacked{flex-direction:column;gap:2px}.content.stacked.has-icon.has-label{height:var(--_with-icon-and-label-text-container-height)}
`;/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const ha=m`:host{display:inline-flex;align-items:center;justify-content:center;outline:none;padding:0 16px;position:relative;-webkit-tap-highlight-color:rgba(0,0,0,0);vertical-align:middle;user-select:none;font-family:var(--_label-text-font);font-size:var(--_label-text-size);line-height:var(--_label-text-line-height);font-weight:var(--_label-text-weight);color:var(--_label-text-color);z-index:0;--md-ripple-hover-color: var(--_hover-state-layer-color);--md-ripple-hover-opacity: var(--_hover-state-layer-opacity);--md-ripple-pressed-color: var(--_pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_pressed-state-layer-opacity);--md-elevation-level: var(--_container-elevation)}md-focus-ring{--md-focus-ring-shape: 8px}:host([active]) md-focus-ring{margin-bottom:calc(var(--_active-indicator-height) + 1px)}.button::before{background:var(--_container-color);content:"";inset:0;position:absolute;z-index:-1}.button::before,md-ripple,md-elevation{border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-end-radius:var(--_container-shape-end-end);border-end-start-radius:var(--_container-shape-end-start)}.content{position:relative;box-sizing:border-box;display:inline-flex;flex-direction:row;align-items:center;justify-content:center;height:var(--_container-height);gap:8px}.indicator{position:absolute;box-sizing:border-box;z-index:-1;transform-origin:bottom left;background:var(--_active-indicator-color);border-radius:var(--_active-indicator-shape);height:var(--_active-indicator-height);inset:auto 0 0 0;opacity:0}::slotted([slot=icon]){display:inline-flex;position:relative;writing-mode:horizontal-tb;fill:currentColor;color:var(--_icon-color);font-size:var(--_icon-size);width:var(--_icon-size);height:var(--_icon-size)}:host(:hover){color:var(--_hover-label-text-color);cursor:pointer}:host(:hover) ::slotted([slot=icon]){color:var(--_hover-icon-color)}:host(:focus){color:var(--_focus-label-text-color)}:host(:focus) ::slotted([slot=icon]){color:var(--_focus-icon-color)}:host(:active){color:var(--_pressed-label-text-color)}:host(:active) ::slotted([slot=icon]){color:var(--_pressed-icon-color)}:host([active]) .indicator{opacity:1}:host([active]){color:var(--_active-label-text-color);--md-ripple-hover-color: var(--_active-hover-state-layer-color);--md-ripple-hover-opacity: var(--_active-hover-state-layer-opacity);--md-ripple-pressed-color: var(--_active-pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_active-pressed-state-layer-opacity)}:host([active]) ::slotted([slot=icon]){color:var(--_active-icon-color)}:host([active]:hover){color:var(--_active-hover-label-text-color)}:host([active]:hover) ::slotted([slot=icon]){color:var(--_active-hover-icon-color)}:host([active]:focus){color:var(--_active-focus-label-text-color)}:host([active]:focus) ::slotted([slot=icon]){color:var(--_active-focus-icon-color)}:host([active]:active){color:var(--_active-pressed-label-text-color)}:host([active]:active) ::slotted([slot=icon]){color:var(--_active-pressed-icon-color)}:host,::slotted(*){white-space:nowrap}@media(forced-colors: active){.indicator{background:CanvasText}}
`;/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let Dt=class extends Kr{};Dt.styles=[ha,pa];Dt=l([_("md-primary-tab")],Dt);/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const ua=m`@layer{.md-typescale-display-small,.md-typescale-display-small-prominent{font:var(--md-sys-typescale-display-small-weight, var(--md-ref-typeface-weight-regular, 400)) var(--md-sys-typescale-display-small-size, 2.25rem)/var(--md-sys-typescale-display-small-line-height, 2.75rem) var(--md-sys-typescale-display-small-font, var(--md-ref-typeface-brand, Roboto))}.md-typescale-display-medium,.md-typescale-display-medium-prominent{font:var(--md-sys-typescale-display-medium-weight, var(--md-ref-typeface-weight-regular, 400)) var(--md-sys-typescale-display-medium-size, 2.8125rem)/var(--md-sys-typescale-display-medium-line-height, 3.25rem) var(--md-sys-typescale-display-medium-font, var(--md-ref-typeface-brand, Roboto))}.md-typescale-display-large,.md-typescale-display-large-prominent{font:var(--md-sys-typescale-display-large-weight, var(--md-ref-typeface-weight-regular, 400)) var(--md-sys-typescale-display-large-size, 3.5625rem)/var(--md-sys-typescale-display-large-line-height, 4rem) var(--md-sys-typescale-display-large-font, var(--md-ref-typeface-brand, Roboto))}.md-typescale-headline-small,.md-typescale-headline-small-prominent{font:var(--md-sys-typescale-headline-small-weight, var(--md-ref-typeface-weight-regular, 400)) var(--md-sys-typescale-headline-small-size, 1.5rem)/var(--md-sys-typescale-headline-small-line-height, 2rem) var(--md-sys-typescale-headline-small-font, var(--md-ref-typeface-brand, Roboto))}.md-typescale-headline-medium,.md-typescale-headline-medium-prominent{font:var(--md-sys-typescale-headline-medium-weight, var(--md-ref-typeface-weight-regular, 400)) var(--md-sys-typescale-headline-medium-size, 1.75rem)/var(--md-sys-typescale-headline-medium-line-height, 2.25rem) var(--md-sys-typescale-headline-medium-font, var(--md-ref-typeface-brand, Roboto))}.md-typescale-headline-large,.md-typescale-headline-large-prominent{font:var(--md-sys-typescale-headline-large-weight, var(--md-ref-typeface-weight-regular, 400)) var(--md-sys-typescale-headline-large-size, 2rem)/var(--md-sys-typescale-headline-large-line-height, 2.5rem) var(--md-sys-typescale-headline-large-font, var(--md-ref-typeface-brand, Roboto))}.md-typescale-title-small,.md-typescale-title-small-prominent{font:var(--md-sys-typescale-title-small-weight, var(--md-ref-typeface-weight-medium, 500)) var(--md-sys-typescale-title-small-size, 0.875rem)/var(--md-sys-typescale-title-small-line-height, 1.25rem) var(--md-sys-typescale-title-small-font, var(--md-ref-typeface-plain, Roboto))}.md-typescale-title-medium,.md-typescale-title-medium-prominent{font:var(--md-sys-typescale-title-medium-weight, var(--md-ref-typeface-weight-medium, 500)) var(--md-sys-typescale-title-medium-size, 1rem)/var(--md-sys-typescale-title-medium-line-height, 1.5rem) var(--md-sys-typescale-title-medium-font, var(--md-ref-typeface-plain, Roboto))}.md-typescale-title-large,.md-typescale-title-large-prominent{font:var(--md-sys-typescale-title-large-weight, var(--md-ref-typeface-weight-regular, 400)) var(--md-sys-typescale-title-large-size, 1.375rem)/var(--md-sys-typescale-title-large-line-height, 1.75rem) var(--md-sys-typescale-title-large-font, var(--md-ref-typeface-brand, Roboto))}.md-typescale-body-small,.md-typescale-body-small-prominent{font:var(--md-sys-typescale-body-small-weight, var(--md-ref-typeface-weight-regular, 400)) var(--md-sys-typescale-body-small-size, 0.75rem)/var(--md-sys-typescale-body-small-line-height, 1rem) var(--md-sys-typescale-body-small-font, var(--md-ref-typeface-plain, Roboto))}.md-typescale-body-medium,.md-typescale-body-medium-prominent{font:var(--md-sys-typescale-body-medium-weight, var(--md-ref-typeface-weight-regular, 400)) var(--md-sys-typescale-body-medium-size, 0.875rem)/var(--md-sys-typescale-body-medium-line-height, 1.25rem) var(--md-sys-typescale-body-medium-font, var(--md-ref-typeface-plain, Roboto))}.md-typescale-body-large,.md-typescale-body-large-prominent{font:var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)) var(--md-sys-typescale-body-large-size, 1rem)/var(--md-sys-typescale-body-large-line-height, 1.5rem) var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto))}.md-typescale-label-small,.md-typescale-label-small-prominent{font:var(--md-sys-typescale-label-small-weight, var(--md-ref-typeface-weight-medium, 500)) var(--md-sys-typescale-label-small-size, 0.6875rem)/var(--md-sys-typescale-label-small-line-height, 1rem) var(--md-sys-typescale-label-small-font, var(--md-ref-typeface-plain, Roboto))}.md-typescale-label-medium,.md-typescale-label-medium-prominent{font:var(--md-sys-typescale-label-medium-weight, var(--md-ref-typeface-weight-medium, 500)) var(--md-sys-typescale-label-medium-size, 0.75rem)/var(--md-sys-typescale-label-medium-line-height, 1rem) var(--md-sys-typescale-label-medium-font, var(--md-ref-typeface-plain, Roboto))}.md-typescale-label-medium-prominent{font-weight:var(--md-sys-typescale-label-medium-weight-prominent, var(--md-ref-typeface-weight-bold, 700))}.md-typescale-label-large,.md-typescale-label-large-prominent{font:var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)) var(--md-sys-typescale-label-large-size, 0.875rem)/var(--md-sys-typescale-label-large-line-height, 1.25rem) var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto))}.md-typescale-label-large-prominent{font-weight:var(--md-sys-typescale-label-large-weight-prominent, var(--md-ref-typeface-weight-bold, 700))}}
`,va=`
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
`,Gr=m`
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
`,Ye=m`
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
`;m`
  .card {
    background: var(--md-sys-color-surface-container);
    border-radius: var(--oppai-radius);
    overflow: hidden;
  }
`;const Mt="oppai_token";function Wr(){return localStorage.getItem(Mt)}function qe(r){r?localStorage.setItem(Mt,r):localStorage.removeItem(Mt)}async function M(r,e={},t=0){const o=new Headers(e.headers),i=Wr();i&&o.set("Authorization",`Bearer ${i}`),e.body&&!(e.body instanceof FormData)&&o.set("Content-Type","application/json");const a=t>0?new AbortController:null,s=a?setTimeout(()=>a.abort(),t):null;let n;try{n=await fetch(r,{...e,headers:o,signal:a==null?void 0:a.signal})}catch(c){throw a!=null&&a.signal.aborted?new Error("Timed out — the site was too slow or unreachable."):c}finally{s&&clearTimeout(s)}if(n.status===401)throw qe(null),window.dispatchEvent(new CustomEvent("oppai-logout")),new Error("unauthorized");if(!n.ok){let c=n.statusText;try{const u=await n.json();u!=null&&u.error&&(c=u.error)}catch{}throw new Error(c)}if(n.status!==204)return n.json()}const T={health:()=>M("/api/health"),login:(r,e)=>M("/api/auth/login",{method:"POST",body:JSON.stringify({username:r,password:e})}),me:()=>M("/api/auth/me"),logout:()=>M("/api/auth/logout",{method:"POST"}),listMedia:(r="",e=60,t=0)=>{const o=new URLSearchParams;return r&&o.set("kind",r),o.set("limit",String(e)),o.set("offset",String(t)),M(`/api/media?${o}`)},getMedia:r=>M(`/api/media/${r}`),streamURL:r=>`/api/media/${r}/stream`,thumbURL:r=>`/api/media/${r}/thumb`,proxyURL:r=>`/api/scrape/proxy?url=${encodeURIComponent(r)}`,upload:(r,e)=>{const t=new FormData;return t.append("file",r),e&&t.append("title",e),M("/api/media",{method:"POST",body:t})},autotag:r=>M(`/api/media/${r}/autotag`,{method:"POST"}),scrape:r=>M("/api/scrape",{method:"POST",body:JSON.stringify({url:r})},45e3),scrapeBulk:r=>M("/api/scrape/bulk",{method:"POST",body:JSON.stringify({urls:r})},75e3),scrapeImport:r=>M("/api/scrape/import",{method:"POST",body:JSON.stringify(r)})};var fa=Object.defineProperty,ma=Object.getOwnPropertyDescriptor,Ze=(r,e,t,o)=>{for(var i=o>1?void 0:o?ma(e,t):e,a=r.length-1,s;a>=0;a--)(s=r[a])&&(i=(o?s(e,t,i):s(i))||i);return o&&i&&fa(e,t,i),i};let he=class extends x{constructor(){super(...arguments),this.error="",this.busy=!1,this.onKeydown=r=>{r.key==="Enter"&&!this.busy&&(r.preventDefault(),this.form.requestSubmit())}}async submit(r){if(r.preventDefault(),this.busy)return;this.error="",this.busy=!0;const e=r.target,t=e.elements.namedItem("username").value,o=e.elements.namedItem("password").value;try{const i=await T.login(t,o);qe(i.token),this.dispatchEvent(new CustomEvent("logged-in",{detail:i.user,bubbles:!0,composed:!0}))}catch(i){this.error=i.message||"login failed"}finally{this.busy=!1}}render(){return d`
      <form class="card" @submit=${this.submit} @keydown=${this.onKeydown}>
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
    `}};he.styles=[Ye,m`
      :host {
        display: grid;
        place-items: center;
        min-height: 100vh;
        padding: 1rem;
        background:
          radial-gradient(1200px 600px at 50% -10%, color-mix(in srgb, var(--md-sys-color-primary) 14%, transparent), transparent 70%),
          var(--md-sys-color-background);
      }
      .card {
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
      h1 {
        margin: 0 0 0.25rem;
        text-align: center;
        letter-spacing: 0.5px;
        font-weight: 600;
      }
      .brand { text-align: center; color: var(--md-sys-color-primary); }
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
    `];Ze([g()],he.prototype,"error",2);Ze([g()],he.prototype,"busy",2);Ze([$("form")],he.prototype,"form",2);he=Ze([_("oppai-login")],he);function Yr(r){return r.composedPath().some(e=>e instanceof HTMLElement&&(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable))}const N={image:{label:"Photos",typeLabel:"PHOTO",icon:"photo_library",aspect:"4 / 3"},gif:{label:"GIFs",typeLabel:"GIF",icon:"animation",aspect:"1 / 1"},video:{label:"Videos",typeLabel:"VIDEO",icon:"movie",aspect:"16 / 9"},game:{label:"Games",typeLabel:"GAME",icon:"sports_esports",aspect:"3 / 4"},comic:{label:"Comics",typeLabel:"COMIC",icon:"auto_stories",aspect:"2 / 3"}},Zr=["image","gif","video","game","comic"],xr=["linear-gradient(135deg, oklch(34% 0.06 60), oklch(22% 0.05 55))","linear-gradient(135deg, oklch(33% 0.07 45), oklch(21% 0.05 40))","linear-gradient(135deg, oklch(32% 0.07 30), oklch(20% 0.05 25))","linear-gradient(135deg, oklch(34% 0.055 75), oklch(22% 0.045 70))","linear-gradient(135deg, oklch(32% 0.06 20), oklch(20% 0.05 15))"];function ce(r){return xr[Math.abs(r.id)%xr.length]}function ba(r){return r.kind==="image"||r.kind==="gif"||!!r.hasThumb}function ga(r){const e=Math.max(0,Math.round(r)),t=Math.floor(e/60),o=e%60;return`${t}:${String(o).padStart(2,"0")}`}function me(r){if(!r)return"";const e=["B","KB","MB","GB","TB"];let t=r,o=0;for(;t>=1024&&o<e.length-1;)t/=1024,o++;return`${t<10&&o>0?t.toFixed(1):Math.round(t)} ${e[o]}`}function Nt(r){switch(r.kind){case"video":case"gif":return r.duration?ga(r.duration):me(r.size);case"image":return r.width&&r.height?`${r.width}×${r.height}`:me(r.size);case"game":return me(r.size);case"comic":return r.pageCount?`${r.pageCount} pages`:me(r.size);default:return me(r.size)}}function ya(r){return r.tags&&r.tags.length?r.tags[0].name:N[r.kind].label.replace(/s$/,"")}const Xr="oppai_favorites";function xa(){try{const r=localStorage.getItem(Xr);return r?new Set(JSON.parse(r).filter(e=>typeof e=="number")):new Set}catch{return new Set}}function _a(r){try{localStorage.setItem(Xr,JSON.stringify([...r]))}catch{}}var wa=Object.defineProperty,$a=Object.getOwnPropertyDescriptor,Ie=(r,e,t,o)=>{for(var i=o>1?void 0:o?$a(e,t):e,a=r.length-1,s;a>=0;a--)(s=r[a])&&(i=(o?s(e,t,i):s(i))||i);return o&&i&&wa(e,t,i),i};let se=class extends x{constructor(){super(...arguments),this.favorite=!1,this.full=null,this.tagging=!1,this.onKey=r=>{var o;if((this.full??this.media).kind!=="video"||Yr(r))return;const t=this.videoEl();if(t)switch(r.key){case" ":case"k":r.preventDefault(),t.paused?t.play():t.pause();break;case"j":t.currentTime=Math.max(0,t.currentTime-10);break;case"l":t.currentTime=Math.min(t.duration||1/0,t.currentTime+10);break;case"m":t.muted=!t.muted;break;case"f":r.preventDefault(),document.fullscreenElement?document.exitFullscreen():(o=t.requestFullscreen)==null||o.call(t);break}}}connectedCallback(){super.connectedCallback(),this.full=this.media,T.getMedia(this.media.id).then(r=>this.full=r).catch(()=>this.full=this.media),window.addEventListener("keydown",this.onKey)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this.onKey),this.clearMediaSession()}updated(r){if(r.has("media")){const e=r.get("media");e&&e.id!==this.media.id&&(this.full=this.media,T.getMedia(this.media.id).then(t=>this.full=t).catch(()=>this.full=this.media))}this.setupMediaSession()}videoEl(){var r;return((r=this.renderRoot)==null?void 0:r.querySelector("video"))??null}emitNavigate(r){this.dispatchEvent(new CustomEvent("navigate",{detail:{dir:r},bubbles:!0,composed:!0}))}setupMediaSession(){const r=this.full??this.media;if(r.kind!=="video"||!("mediaSession"in navigator))return;const e=this.videoEl();if(!e)return;const t=navigator.mediaSession;try{t.metadata=new MediaMetadata({title:r.title,artist:"OppaiLib"})}catch{}const o=(i,a)=>{try{t.setActionHandler(i,a)}catch{}};o("play",()=>void e.play()),o("pause",()=>e.pause()),o("seekbackward",i=>{e.currentTime=Math.max(0,e.currentTime-(i.seekOffset??10))}),o("seekforward",i=>{e.currentTime=Math.min(e.duration||1/0,e.currentTime+(i.seekOffset??10))}),o("seekto",i=>{i.seekTime!=null&&(e.currentTime=i.seekTime)}),o("previoustrack",()=>this.emitNavigate(-1)),o("nexttrack",()=>this.emitNavigate(1))}clearMediaSession(){if(!("mediaSession"in navigator))return;const r=navigator.mediaSession,e=["play","pause","seekbackward","seekforward","seekto","previoustrack","nexttrack"];for(const t of e)try{r.setActionHandler(t,null)}catch{}r.metadata=null}toggleFav(){this.dispatchEvent(new CustomEvent("toggle-favorite",{bubbles:!0,composed:!0}))}async retag(){this.tagging=!0;try{const r=await T.autotag(this.media.id);this.full&&(this.full={...this.full,tags:r.tags}),this.dispatchEvent(new CustomEvent("changed",{bubbles:!0,composed:!0}))}catch(r){console.error("autotag",r)}finally{this.tagging=!1}}favIcon(){return d`<span
      class="material-symbols-rounded fill-icon"
      style="font-size:22px; color:${this.favorite?"var(--oppai-fav)":"var(--oppai-text)"};"
      >${this.favorite?"favorite":"favorite_border"}</span
    >`}render(){const r=this.full??this.media,e=T.streamURL(r.id);return d`
      <div class="wrap">
        ${this.renderStage(r,e)}
        ${r.kind==="game"?h:this.renderMeta(r)}
      </div>
    `}renderStage(r,e){switch(r.kind){case"video":return d`<div class="stage" style="aspect-ratio:16/9; background:${ce(r)};">
          <video
            src=${e}
            poster=${r.hasThumb?T.thumbURL(r.id):h}
            controls
            autoplay
            playsinline
            preload="metadata"
          ></video>
        </div>`;case"gif":return d`<div class="stage" style="aspect-ratio:16/9; background:${ce(r)};">
          <img src=${e} alt=${r.title} />
        </div>`;case"image":return d`<div
          class="stage"
          style="max-height:64vh; background:${ce(r)}; display:flex; align-items:center; justify-content:center;"
        >
          <img src=${e} alt=${r.title} style="max-height:64vh;" />
        </div>`;case"comic":return this.renderComic(r);case"game":return this.renderGame(r,e);default:return h}}renderComic(r){const e=r.pageCount??"?";return d`
      <div class="reader">
        <button class="round-btn" disabled title="Previous page">
          <span class="material-symbols-rounded" style="font-size:22px;">chevron_left</span>
        </button>
        <div class="reader-page" style="background:${ce(r)};">
          <span class="material-symbols-rounded" style="font-size:40px; color:#fff;">auto_stories</span>
          <span class="mono">PAGE 1 OF ${e}</span>
          <a href=${T.streamURL(r.id)} download style="color:var(--oppai-primary-bright); font-size:12px; margin-top:6px;"
            >Download to read</a
          >
        </div>
        <button class="round-btn" disabled title="Next page">
          <span class="material-symbols-rounded" style="font-size:22px;">chevron_right</span>
        </button>
      </div>
      ${this.renderMeta(r)}
    `}renderGame(r,e){return d`
      <div class="game">
        <div class="game-cover" style="background:${ce(r)};">
          <span class="material-symbols-rounded" style="font-size:48px; color:#fff;">sports_esports</span>
        </div>
        <div style="flex:1; min-width:260px; padding-top:8px;">
          <h2>${r.title}</h2>
          <div class="sub">${N.game.label.replace(/s$/,"")} · ${Nt(r)}</div>
          <div class="actions">
            <a class="btn-primary" href=${e} download>
              <span class="material-symbols-rounded fill-icon" style="font-size:20px;">download</span>
              Download
            </a>
            <button class="btn-outline" @click=${this.toggleFav}>
              <span
                class="material-symbols-rounded"
                style="font-size:20px; color:${this.favorite?"var(--oppai-fav)":"var(--oppai-text)"};"
                >${this.favorite?"favorite":"favorite_border"}</span
              >
              Favorite
            </button>
          </div>
          <p class="desc">
            A locally-installed title from your library. Download to play, or add it to your
            favorites collection for quick access later.
          </p>
          ${this.renderTags(r)}
        </div>
      </div>
    `}renderMeta(r){const e=N[r.kind];return d`
      <div class="meta">
        <div class="meta-head">
          <h2 class="meta-title">${r.title}</h2>
          <button class="icon-round" title="Auto-tag" @click=${this.retag} ?disabled=${this.tagging}>
            <span class="material-symbols-rounded" style="font-size:22px; color:var(--oppai-text-dim);"
              >${this.tagging?"hourglass_empty":"auto_awesome"}</span
            >
          </button>
          <button class="icon-round" title="Favorite" @click=${this.toggleFav}>${this.favIcon()}</button>
        </div>
        <div class="chips">
          <span class="chip chip-accent">${Nt(r)||e.label}</span>
          <span class="chip chip-muted">${e.typeLabel}</span>
        </div>
        ${this.renderTags(r)}
        ${r.source?d`<div class="meta-note">
              Source: <a href=${r.source} target="_blank" rel="noreferrer" style="color:var(--oppai-primary-bright);">link</a>
            </div>`:h}
        <p class="desc" style="margin-top:16px;">
          Part of your personal library. Streamed directly from your OppaiLib server — no
          re-encoding, no external uploads.
        </p>
      </div>
    `}renderTags(r){const e=r.tags??[];return e.length===0?d`<div class="meta-note" style="margin-top:14px;">
        No tags yet — use the ✨ auto-tag button.
      </div>`:d`<div class="chips">
      ${e.map(t=>d`<span
          class="chip chip-muted"
          title="${t.category}${t.source?" · "+t.source:""}"
          >${t.name}</span
        >`)}
    </div>`}};se.styles=[Gr,Ye,m`
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
      .stage video,
      .stage img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: contain;
        background: #000;
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
        color: #fff;
        letter-spacing: 1px;
      }
      .reader {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 24px;
      }
      .reader-page {
        width: 340px;
        max-width: 60vw;
        aspect-ratio: 2 / 3;
        border-radius: 16px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 8px;
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
      .meta-note {
        font-size: 12px;
        color: var(--oppai-text-muted);
        margin-top: 12px;
      }
    `];Ie([p({attribute:!1})],se.prototype,"media",2);Ie([p({type:Boolean})],se.prototype,"favorite",2);Ie([g()],se.prototype,"full",2);Ie([g()],se.prototype,"tagging",2);se=Ie([_("oppai-viewer")],se);var Ca=Object.defineProperty,Aa=Object.getOwnPropertyDescriptor,U=(r,e,t,o)=>{for(var i=o>1?void 0:o?Aa(e,t):e,a=r.length-1,s;a>=0;a--)(s=r[a])&&(i=(o?s(e,t,i):s(i))||i);return o&&i&&Ca(e,t,i),i};let O=class extends x{constructor(){super(...arguments),this.urls="",this.results=[],this.failures=[],this.chosen=new Set,this.busy=!1,this.phase="",this.fetchCount=0,this.error="",this.onUrlKeydown=r=>{r.key==="Enter"&&(r.ctrlKey||r.metaKey)&&(r.preventDefault(),this.fetch())}}open(){this.results=[],this.failures=[],this.chosen=new Set,this.error="",this.urls="",this.phase="",this.fetchCount=0,this.dialog.show()}get urlList(){const r=new Set;return this.urls.split(/[\n,]/).map(e=>e.trim()).filter(e=>e&&!r.has(e)&&(r.add(e),!0))}get totalMedia(){return this.results.reduce((r,e)=>r+e.mediaUrls.length,0)}async fetch(){const r=this.urlList;if(!(r.length===0||this.busy)){this.busy=!0,this.phase="fetching",this.fetchCount=r.length,this.error="",this.results=[],this.failures=[];try{const{items:e}=await T.scrapeBulk(r),t=new Set;for(const o of e)o.result?(this.results=[...this.results,o.result],o.result.mediaUrls.forEach(i=>t.add(i))):this.failures=[...this.failures,{url:o.url,error:o.error||"failed"}];this.chosen=t,this.results.length===0&&this.failures.length>0&&(this.error="Nothing could be fetched from those links.")}catch(e){this.error=e.message}finally{this.busy=!1,this.phase=""}}}toggle(r){const e=new Set(this.chosen);e.has(r)?e.delete(r):e.add(r),this.chosen=e}async import(){if(this.chosen.size===0||this.busy)return;this.busy=!0,this.phase="importing",this.error="";let r=0;try{for(const e of this.results){const t=e.mediaUrls.filter(i=>this.chosen.has(i));if(t.length===0)continue;const o=await T.scrapeImport({url:e.sourceUrl,mediaUrls:t,title:e.title,tags:e.tags});r+=o.count}this.dispatchEvent(new CustomEvent("imported",{detail:{count:r},bubbles:!0,composed:!0})),this.dialog.close()}catch(e){this.error=e.message}finally{this.busy=!1,this.phase=""}}renderGroup(r){return d`
      <div class="group">
        <div class="meta"><strong>${r.title||"(untitled)"}</strong></div>
        ${r.description?d`<div class="meta">${r.description}</div>`:""}
        ${r.tags.length?d`<div class="tags">
              ${r.tags.map(e=>d`<md-filter-chip label=${e} selected></md-filter-chip>`)}
            </div>`:""}
        ${r.mediaUrls.length?d`<div class="previews">
              ${r.mediaUrls.map(e=>d`<div class="pv ${this.chosen.has(e)?"sel":""}" @click=${()=>this.toggle(e)}>
                  <img src=${T.proxyURL(e)} loading="lazy" />
                </div>`)}
            </div>`:d`<div class="meta">No media found on that page.</div>`}
      </div>
    `}render(){return d`
      <md-dialog>
        <div slot="headline">Import from URL</div>
        <form slot="content" method="dialog" @submit=${r=>r.preventDefault()}>
          <div class="row">
            <md-outlined-text-field label="Page or media URL(s)" type="textarea" rows="3"
              .value=${this.urls}
              @input=${r=>this.urls=r.target.value}
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
          ${this.error?d`<div class="err">${this.error}</div>`:""}
          ${this.phase==="fetching"?d`<div class="progress">
                <md-circular-progress indeterminate></md-circular-progress>
                <span>Fetching ${this.fetchCount} link${this.fetchCount===1?"":"s"}… some sites can take a few seconds each.</span>
              </div>`:""}
          ${this.results.map(r=>this.renderGroup(r))}
          ${this.failures.length?d`<div class="err">
                ${this.failures.length} link(s) failed:
                ${this.failures.map(r=>d`<div class="src">${r.url} — ${r.error}</div>`)}
              </div>`:""}
        </form>
        <div slot="actions">
          <md-text-button type="button" @click=${()=>this.dialog.close()}>Cancel</md-text-button>
          <md-filled-button type="button" @click=${this.import}
            ?disabled=${this.busy||this.chosen.size===0}>
            ${this.busy&&this.results.length?"Importing…":d`Import ${this.chosen.size||""}${this.totalMedia?` / ${this.totalMedia}`:""}`}
          </md-filled-button>
        </div>
      </md-dialog>
    `}};O.styles=[Ye,m`
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
    `];U([$("md-dialog")],O.prototype,"dialog",2);U([g()],O.prototype,"urls",2);U([g()],O.prototype,"results",2);U([g()],O.prototype,"failures",2);U([g()],O.prototype,"chosen",2);U([g()],O.prototype,"busy",2);U([g()],O.prototype,"phase",2);U([g()],O.prototype,"fetchCount",2);U([g()],O.prototype,"error",2);O=U([_("oppai-scrape-dialog")],O);var ka=Object.defineProperty,Ea=Object.getOwnPropertyDescriptor,P=(r,e,t,o)=>{for(var i=o>1?void 0:o?Ea(e,t):e,a=r.length-1,s;a>=0;a--)(s=r[a])&&(i=(o?s(e,t,i):s(i))||i);return o&&i&&ka(e,t,i),i};const Ia=[{id:"home",label:"Home",icon:"home"},...Zr.map(r=>({id:r,label:N[r].label,icon:N[r].icon})),{id:"favorites",label:"Favorites",icon:"favorite"}];let S=class extends x{constructor(){super(...arguments),this.items=[],this.loading=!1,this.section="home",this.selectedId=null,this.search="",this.filters={},this.favorites=xa(),this.uploadOpen=!1,this.dragActive=!1,this.theme="dark",this.viewerList=[],this.onKey=r=>{if(!(this.selectedId==null||this.uploadOpen)&&!Yr(r))switch(r.key){case"ArrowRight":r.preventDefault(),this.stepItem(1);break;case"ArrowLeft":r.preventDefault(),this.stepItem(-1);break;case"Escape":this.closeItem();break}},this.stepItem=r=>{if(this.selectedId==null)return;const e=this.viewerList.indexOf(this.selectedId);if(e<0)return;const t=e+r;t<0||t>=this.viewerList.length||(this.selectedId=this.viewerList[t])},this.closeItem=()=>{this.selectedId=null},this.toggleUpload=()=>{this.uploadOpen=!this.uploadOpen,this.dragActive=!1}}connectedCallback(){super.connectedCallback(),this.refresh(),window.addEventListener("keydown",this.onKey)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this.onKey)}async refresh(){this.loading=!0;try{const r=await T.listMedia("",500,0);this.items=r.items??[]}finally{this.loading=!1}}selectSection(r){this.section=r,this.selectedId=null,this.search=""}openItem(r,e){e&&e.length?this.viewerList=e.map(t=>t.id):this.viewerList.includes(r)||(this.viewerList=[r]),this.selectedId=r}onSearchInput(r){this.search=r.target.value,this.selectedId=null}clearSearch(){this.search=""}setFilter(r,e){this.filters={...this.filters,[r]:e}}toggleFavorite(r,e){e==null||e.stopPropagation();const t=new Set(this.favorites);t.has(r)?t.delete(r):t.add(r),this.favorites=t,_a(t)}toggleTheme(){this.theme=this.theme==="dark"?"light":"dark",document.documentElement.dataset.theme=this.theme==="light"?"light":""}logout(){this.dispatchEvent(new CustomEvent("logout",{bubbles:!0,composed:!0}))}browse(){var r;(r=this.renderRoot.querySelector("#file"))==null||r.click()}async onFiles(r){const e=Array.from(r);if(e.length){this.uploadOpen=!1;for(const t of e)try{await T.upload(t)}catch(o){console.error("upload",o)}this.refresh()}}onFileInput(r){const e=r.target;e.files&&this.onFiles(e.files),e.value=""}onDrop(r){var e,t;r.preventDefault(),this.dragActive=!1,(t=(e=r.dataTransfer)==null?void 0:e.files)!=null&&t.length&&this.onFiles(r.dataTransfer.files)}openScrape(){var r;this.uploadOpen=!1,(r=this.renderRoot.querySelector("oppai-scrape-dialog"))==null||r.open()}itemsForKind(r){return this.items.filter(e=>e.kind===r)}render(){var c;const r=this.search.trim().length>0,e=this.selectedId!=null,t=!e&&this.section==="favorites"&&!r,o=!e&&this.section==="home"&&!r&&!t,i=!e&&r,a=!e&&!o&&!t&&!i,s=e?this.items.find(u=>u.id===this.selectedId)??null:null;let n="Library";return e?n=s?s.title:"Library":i?n="Search results":t?n="Favorites":o?n="Library":n=((c=N[this.section])==null?void 0:c.label)??"Library",d`
      ${this.renderNav()}
      <div class="main-col">
        ${this.renderHeader(n,r,e)}
        <main>
          ${o?this.renderHome():h}
          ${a||t||i?this.renderGrid(a,t,i):h}
          ${e&&s?d`<oppai-viewer
                .media=${s}
                .favorite=${this.favorites.has(s.id)}
                @toggle-favorite=${()=>this.toggleFavorite(s.id)}
                @navigate=${u=>this.stepItem(u.detail.dir)}
                @changed=${()=>this.refresh()}
              ></oppai-viewer>`:h}
          ${e&&!s?d`<div class="empty">Item not found.</div>`:h}
        </main>
      </div>
      ${this.renderUpload()}
      <oppai-scrape-dialog @imported=${()=>this.refresh()}></oppai-scrape-dialog>
      <input id="file" type="file" multiple @change=${this.onFileInput} />
    `}renderNav(){var e,t;const r=(((e=this.user)==null?void 0:e.username)??"?").slice(0,2).toUpperCase();return d`
      <nav>
        <button class="add-btn" title="Add media" @click=${this.toggleUpload}>
          <span class="material-symbols-rounded" style="font-size:26px;">add</span>
        </button>

        <div class="nav-list">
          ${Ia.map(o=>{const i=this.section===o.id&&this.selectedId==null;return d`
              <button class="nav-item" @click=${()=>this.selectSection(o.id)}>
                <span
                  class="nav-pill"
                  style="background:${i?"var(--oppai-primary-container)":"transparent"};"
                >
                  <span
                    class="material-symbols-rounded ${i?"fill-icon":""}"
                    style="font-size:22px; color:${i?"var(--oppai-primary-bright)":"var(--oppai-text-dim)"};"
                    >${o.icon}</span
                  >
                </span>
                <span class="nav-label" style="color:${i?"var(--oppai-text)":"var(--oppai-text-muted)"};"
                  >${o.label}</span
                >
              </button>
            `})}
        </div>

        <div style="flex:1;"></div>

        <button
          class="icon-btn"
          title="Toggle theme"
          @click=${this.toggleTheme}
          style="width:48px; height:48px; border-radius:24px; background:var(--oppai-surface-2); color:var(--oppai-text-dim);"
        >
          <span class="material-symbols-rounded" style="font-size:22px;">settings</span>
        </button>
        <button
          class="icon-btn"
          title="Sign out (${(t=this.user)==null?void 0:t.username})"
          @click=${this.logout}
          style="width:40px; height:40px; border-radius:20px; background:var(--oppai-accent); color:var(--oppai-on-accent); font-size:13px; font-weight:600;"
        >
          ${r}
        </button>
      </nav>
    `}renderHeader(r,e,t){return d`
      <header>
        ${t?d`<button
              class="icon-btn"
              title="Back"
              @click=${this.closeItem}
              style="width:40px; height:40px; border-radius:20px; background:none; color:var(--oppai-text); flex-shrink:0;"
            >
              <span class="material-symbols-rounded" style="font-size:24px;">arrow_back</span>
            </button>`:h}

        <h1 class="h-title">${r}</h1>

        <div class="searchbox">
          <span class="material-symbols-rounded" style="font-size:20px; color:var(--oppai-text-dim);">search</span>
          <input
            .value=${this.search}
            @input=${this.onSearchInput}
            placeholder="Search photos, videos, games, comics..."
          />
          ${e?d`<button
                class="icon-btn"
                @click=${this.clearSearch}
                style="background:none; color:var(--oppai-text-dim);"
              >
                <span class="material-symbols-rounded" style="font-size:18px;">close</span>
              </button>`:h}
        </div>

        <div style="flex:1;"></div>

        <button class="filters-btn">
          <span class="material-symbols-rounded" style="font-size:18px;">tune</span>
          <span style="font-size:13px; font-weight:500;">Filters</span>
        </button>
      </header>
    `}renderHome(){const r=new Date().getHours(),e=r<12?"Good morning":r<18?"Good afternoon":"Good evening",t=Zr.map(o=>({kind:o,label:N[o].label,icon:N[o].icon,items:this.itemsForKind(o).slice(0,12)})).filter(o=>o.items.length>0);return this.loading&&this.items.length===0?d`<div class="empty">Loading your library…</div>`:t.length===0?d`<div>
        <h2 class="greeting">${e}</h2>
        <p class="greeting-sub">Your library is empty — add media or import from a URL.</p>
        <div class="empty">
          <span class="material-symbols-rounded" style="font-size:40px; display:block; margin-bottom:12px;"
            >library_add</span
          >
          <div style="font-size:14px;">Nothing here yet.</div>
        </div>
      </div>`:d`
      <div>
        <h2 class="greeting anim-rise">${e}</h2>
        <p class="greeting-sub anim-rise" style="animation-delay:40ms;">
          Here's what's new across your library
        </p>
        ${t.map((o,i)=>d`
            <section class="row anim-rise" style="animation-delay:${80+i*70}ms;">
              <div class="row-head">
                <span class="material-symbols-rounded" style="font-size:22px; color:var(--oppai-primary-bright);"
                  >${o.icon}</span
                >
                <h3 class="row-title">${o.label}</h3>
                <button class="see-all" @click=${()=>this.selectSection(o.kind)}>
                  See all
                  <span class="material-symbols-rounded" style="font-size:16px;">chevron_right</span>
                </button>
              </div>
              <div class="row-scroll">
                ${o.items.map(a=>this.renderTile(a,"200px",void 0,o.items))}
              </div>
            </section>
          `)}
      </div>
    `}renderGrid(r,e,t){var n;let o="",i=[],a=[];if(e)o="Favorites",i=this.items.filter(c=>this.favorites.has(c.id));else if(t){o="Search results";const c=this.search.trim().toLowerCase();i=this.items.filter(u=>u.title.toLowerCase().includes(c)||(u.tags??[]).some(f=>f.name.toLowerCase().includes(c)))}else{const c=this.section;o=((n=N[c])==null?void 0:n.label)??"";const u=this.itemsForKind(c),f=Array.from(new Set(u.flatMap(b=>(b.tags??[]).map(w=>w.name)))).slice(0,8),v=this.filters[c]??"All";a=["All",...f].map(b=>({label:b,active:v===b})),i=v==="All"?u:u.filter(b=>(b.tags??[]).some(w=>w.name===v))}const s=`${i.length} ${i.length===1?"item":"items"}`;return d`
      <div>
        <div class="grid-head">
          <h2 class="grid-title">${o}</h2>
          <span class="grid-count">${s}</span>
        </div>

        ${r&&a.length>1?d`<div class="chips">
              ${a.map(c=>d`<button
                  class="chip"
                  @click=${()=>this.setFilter(this.section,c.label)}
                  style="background:${c.active?"var(--oppai-accent)":"transparent"}; color:${c.active?"var(--oppai-on-accent)":"var(--oppai-text-dim)"}; border:1px solid ${c.active?"var(--oppai-accent)":"var(--oppai-border-strong)"};"
                >
                  ${c.active?d`<span class="material-symbols-rounded" style="font-size:16px;">check</span>`:h}
                  ${c.label}
                </button>`)}
            </div>`:d`<div style="height:24px;"></div>`}

        ${i.length===0?d`<div class="empty">
              <span class="material-symbols-rounded" style="font-size:40px; display:block; margin-bottom:12px;"
                >${e?"favorite_border":"search_off"}</span
              >
              <div style="font-size:14px;">
                ${e?"No favorites yet. Tap the heart on any item.":"No items match your search or filter."}
              </div>
            </div>`:d`<div class="grid">
              ${i.map((c,u)=>this.renderTile(c,"100%",u,i))}
            </div>`}
      </div>
    `}renderTile(r,e,t,o){const i=N[r.kind],a=this.favorites.has(r.id),s=Nt(r),n=t!=null?"anim-rise":"",c=t!=null?`animation-delay:${Math.min(t,12)*45}ms;`:"";return d`
      <div
        class="tile ${n}"
        @click=${()=>this.openItem(r.id,o)}
        style="flex-shrink:0; width:${e}; ${c}"
      >
        <div
          class="tile-media"
          style="width:100%; aspect-ratio:${i.aspect}; background:${ce(r)};"
        >
          ${ba(r)?d`<img loading="lazy" src=${T.thumbURL(r.id)} alt=${r.title} />`:d`<div class="tile-overlay">
                <span class="material-symbols-rounded" style="font-size:30px; color:#fff;"
                  >${i.icon}</span
                >
                <span class="type-label">${i.typeLabel}</span>
              </div>`}
          <button
            class="fav-btn ${a?"is-fav":""}"
            @click=${u=>this.toggleFavorite(r.id,u)}
          >
            <span
              class="material-symbols-rounded fill-icon"
              style="font-size:18px; color:${a?"var(--oppai-fav)":"rgba(255,255,255,0.9)"};"
              >${a?"favorite":"favorite_border"}</span
            >
          </button>
          ${s?d`<span class="tile-stat">${s}</span>`:h}
        </div>
        <div class="tile-meta">
          <div class="tile-title">${r.title}</div>
          <div class="tile-tag">${ya(r)}</div>
        </div>
      </div>
    `}renderUpload(){return this.uploadOpen?d`
      <div class="scrim" @click=${this.toggleUpload}>
        <div class="dialog" @click=${r=>r.stopPropagation()}>
          <h2>Upload media</h2>
          <div
            class="dropzone ${this.dragActive?"drag":""}"
            @click=${this.browse}
            @dragover=${r=>{r.preventDefault(),this.dragActive=!0}}
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
    `:h}};S.styles=[Gr,Ye,m`
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
    `];P([p({attribute:!1})],S.prototype,"user",2);P([g()],S.prototype,"items",2);P([g()],S.prototype,"loading",2);P([g()],S.prototype,"section",2);P([g()],S.prototype,"selectedId",2);P([g()],S.prototype,"search",2);P([g()],S.prototype,"filters",2);P([g()],S.prototype,"favorites",2);P([g()],S.prototype,"uploadOpen",2);P([g()],S.prototype,"dragActive",2);P([g()],S.prototype,"theme",2);S=P([_("oppai-library")],S);var za=Object.defineProperty,Ta=Object.getOwnPropertyDescriptor,Jt=(r,e,t,o)=>{for(var i=o>1?void 0:o?Ta(e,t):e,a=r.length-1,s;a>=0;a--)(s=r[a])&&(i=(o?s(e,t,i):s(i))||i);return o&&i&&za(e,t,i),i};let we=class extends x{constructor(){super(...arguments),this.user=null,this.ready=!1,this.onLogout=()=>{this.user=null}}connectedCallback(){super.connectedCallback(),window.addEventListener("oppai-logout",this.onLogout),this.bootstrap()}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("oppai-logout",this.onLogout)}async bootstrap(){if(Wr())try{this.user=await T.me()}catch{qe(null)}this.ready=!0}onLoggedIn(r){this.user=r.detail}async logout(){try{await T.logout()}catch{}qe(null),this.user=null}render(){return this.ready?this.user?d`<oppai-library
      .user=${this.user}
      @logout=${this.logout}
    ></oppai-library>`:d`<oppai-login @logged-in=${this.onLoggedIn}></oppai-login>`:d`<div class="center"><md-circular-progress indeterminate></md-circular-progress></div>`}};we.styles=m`
    :host { display: block; min-height: 100vh; }
    .center { display: grid; place-items: center; height: 100vh; }
  `;Jt([g()],we.prototype,"user",2);Jt([g()],we.prototype,"ready",2);we=Jt([_("oppai-app")],we);const Jr=document.createElement("style");Jr.textContent=va;document.head.appendChild(Jr);document.adoptedStyleSheets=[...document.adoptedStyleSheets,ua.styleSheet];
