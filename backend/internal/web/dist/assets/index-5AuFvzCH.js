(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function i(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(r){if(r.ep)return;r.ep=!0;const o=i(r);fetch(r.href,o)}})();function p(t,e,i,a){var r=arguments.length,o=r<3?e:a===null?a=Object.getOwnPropertyDescriptor(e,i):a,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(t,e,i,a);else for(var c=t.length-1;c>=0;c--)(n=t[c])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const I=t=>(e,i)=>{i!==void 0?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const yt=globalThis,Ci=yt.ShadowRoot&&(yt.ShadyCSS===void 0||yt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ii=Symbol(),Gi=new WeakMap;let wa=class{constructor(e,i,a){if(this._$cssResult$=!0,a!==Ii)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=i}get styleSheet(){let e=this.o;const i=this.t;if(Ci&&e===void 0){const a=i!==void 0&&i.length===1;a&&(e=Gi.get(i)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),a&&Gi.set(i,e))}return e}toString(){return this.cssText}};const br=t=>new wa(typeof t=="string"?t:t+"",void 0,Ii),_=(t,...e)=>{const i=t.length===1?t[0]:e.reduce((a,r,o)=>a+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+t[o+1],t[0]);return new wa(i,t,Ii)},yr=(t,e)=>{if(Ci)t.adoptedStyleSheets=e.map(i=>i instanceof CSSStyleSheet?i:i.styleSheet);else for(const i of e){const a=document.createElement("style"),r=yt.litNonce;r!==void 0&&a.setAttribute("nonce",r),a.textContent=i.cssText,t.appendChild(a)}},Wi=Ci?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let i="";for(const a of e.cssRules)i+=a.cssText;return br(i)})(t):t;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:xr,defineProperty:wr,getOwnPropertyDescriptor:_r,getOwnPropertyNames:$r,getOwnPropertySymbols:kr,getPrototypeOf:Cr}=Object,xe=globalThis,qi=xe.trustedTypes,Ir=qi?qi.emptyScript:"",Lt=xe.reactiveElementPolyfillSupport,Ge=(t,e)=>t,$t={toAttribute(t,e){switch(e){case Boolean:t=t?Ir:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=t!==null;break;case Number:i=t===null?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch{i=null}}return i}},Ti=(t,e)=>!xr(t,e),Ki={attribute:!0,type:String,converter:$t,reflect:!1,useDefault:!1,hasChanged:Ti};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),xe.litPropertyMetadata??(xe.litPropertyMetadata=new WeakMap);let Me=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,i=Ki){if(i.state&&(i.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((i=Object.create(i)).wrapped=!0),this.elementProperties.set(e,i),!i.noAccessor){const a=Symbol(),r=this.getPropertyDescriptor(e,a,i);r!==void 0&&wr(this.prototype,e,r)}}static getPropertyDescriptor(e,i,a){const{get:r,set:o}=_r(this.prototype,e)??{get(){return this[i]},set(n){this[i]=n}};return{get:r,set(n){const c=r==null?void 0:r.call(this);o==null||o.call(this,n),this.requestUpdate(e,c,a)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Ki}static _$Ei(){if(this.hasOwnProperty(Ge("elementProperties")))return;const e=Cr(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Ge("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Ge("properties"))){const i=this.properties,a=[...$r(i),...kr(i)];for(const r of a)this.createProperty(r,i[r])}const e=this[Symbol.metadata];if(e!==null){const i=litPropertyMetadata.get(e);if(i!==void 0)for(const[a,r]of i)this.elementProperties.set(a,r)}this._$Eh=new Map;for(const[i,a]of this.elementProperties){const r=this._$Eu(i,a);r!==void 0&&this._$Eh.set(r,i)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const i=[];if(Array.isArray(e)){const a=new Set(e.flat(1/0).reverse());for(const r of a)i.unshift(Wi(r))}else e!==void 0&&i.push(Wi(e));return i}static _$Eu(e,i){const a=i.attribute;return a===!1?void 0:typeof a=="string"?a:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(i=>this.enableUpdating=i),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(i=>i(this))}addController(e){var i;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((i=e.hostConnected)==null||i.call(e))}removeController(e){var i;(i=this._$EO)==null||i.delete(e)}_$E_(){const e=new Map,i=this.constructor.elementProperties;for(const a of i.keys())this.hasOwnProperty(a)&&(e.set(a,this[a]),delete this[a]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return yr(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(i=>{var a;return(a=i.hostConnected)==null?void 0:a.call(i)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(i=>{var a;return(a=i.hostDisconnected)==null?void 0:a.call(i)})}attributeChangedCallback(e,i,a){this._$AK(e,a)}_$ET(e,i){var o;const a=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,a);if(r!==void 0&&a.reflect===!0){const n=(((o=a.converter)==null?void 0:o.toAttribute)!==void 0?a.converter:$t).toAttribute(i,a.type);this._$Em=e,n==null?this.removeAttribute(r):this.setAttribute(r,n),this._$Em=null}}_$AK(e,i){var o,n;const a=this.constructor,r=a._$Eh.get(e);if(r!==void 0&&this._$Em!==r){const c=a.getPropertyOptions(r),h=typeof c.converter=="function"?{fromAttribute:c.converter}:((o=c.converter)==null?void 0:o.fromAttribute)!==void 0?c.converter:$t;this._$Em=r;const f=h.fromAttribute(i,c.type);this[r]=f??((n=this._$Ej)==null?void 0:n.get(r))??f,this._$Em=null}}requestUpdate(e,i,a,r=!1,o){var n;if(e!==void 0){const c=this.constructor;if(r===!1&&(o=this[e]),a??(a=c.getPropertyOptions(e)),!((a.hasChanged??Ti)(o,i)||a.useDefault&&a.reflect&&o===((n=this._$Ej)==null?void 0:n.get(e))&&!this.hasAttribute(c._$Eu(e,a))))return;this.C(e,i,a)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,i,{useDefault:a,reflect:r,wrapped:o},n){a&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,n??i??this[e]),o!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||a||(i=void 0),this._$AL.set(e,i)),r===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(i){Promise.reject(i)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var a;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[o,n]of this._$Ep)this[o]=n;this._$Ep=void 0}const r=this.constructor.elementProperties;if(r.size>0)for(const[o,n]of r){const{wrapped:c}=n,h=this[o];c!==!0||this._$AL.has(o)||h===void 0||this.C(o,void 0,n,h)}}let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),(a=this._$EO)==null||a.forEach(r=>{var o;return(o=r.hostUpdate)==null?void 0:o.call(r)}),this.update(i)):this._$EM()}catch(r){throw e=!1,this._$EM(),r}e&&this._$AE(i)}willUpdate(e){}_$AE(e){var i;(i=this._$EO)==null||i.forEach(a=>{var r;return(r=a.hostUpdated)==null?void 0:r.call(a)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(i=>this._$ET(i,this[i]))),this._$EM()}updated(e){}firstUpdated(e){}};Me.elementStyles=[],Me.shadowRootOptions={mode:"open"},Me[Ge("elementProperties")]=new Map,Me[Ge("finalized")]=new Map,Lt==null||Lt({ReactiveElement:Me}),(xe.reactiveElementVersions??(xe.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Tr={attribute:!0,type:String,converter:$t,reflect:!1,hasChanged:Ti},Sr=(t=Tr,e,i)=>{const{kind:a,metadata:r}=i;let o=globalThis.litPropertyMetadata.get(r);if(o===void 0&&globalThis.litPropertyMetadata.set(r,o=new Map),a==="setter"&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),a==="accessor"){const{name:n}=i;return{set(c){const h=e.get.call(this);e.set.call(this,c),this.requestUpdate(n,h,t,!0,c)},init(c){return c!==void 0&&this.C(n,void 0,t,c),c}}}if(a==="setter"){const{name:n}=i;return function(c){const h=this[n];e.call(this,c),this.requestUpdate(n,h,t,!0,c)}}throw Error("Unsupported decorator location: "+a)};function m(t){return(e,i)=>typeof i=="object"?Sr(t,e,i):((a,r,o)=>{const n=r.hasOwnProperty(o);return r.constructor.createProperty(o,a),n?Object.getOwnPropertyDescriptor(r,o):void 0})(t,e,i)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function d(t){return m({...t,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const St=(t,e,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(t,e,i),i);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function S(t,e){return(i,a,r)=>{const o=n=>{var c;return((c=n.renderRoot)==null?void 0:c.querySelector(t))??null};return St(i,a,{get(){return o(this)}})}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let zr;function Ar(t){return(e,i)=>St(e,i,{get(){return(this.renderRoot??zr??(zr=document.createDocumentFragment())).querySelectorAll(t)}})}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function we(t){return(e,i)=>{const{slot:a,selector:r}=t??{},o="slot"+(a?`[name=${a}]`:":not([name])");return St(e,i,{get(){var h;const n=(h=this.renderRoot)==null?void 0:h.querySelector(o),c=(n==null?void 0:n.assignedElements(t))??[];return r===void 0?c:c.filter(f=>f.matches(r))}})}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Er(t){return(e,i)=>{const{slot:a}=t??{},r="slot"+(a?`[name=${a}]`:":not([name])");return St(e,i,{get(){var n;const o=(n=this.renderRoot)==null?void 0:n.querySelector(r);return(o==null?void 0:o.assignedNodes(t))??[]}})}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const We=globalThis,Vi=t=>t,kt=We.trustedTypes,Yi=kt?kt.createPolicy("lit-html",{createHTML:t=>t}):void 0,_a="$lit$",be=`lit$${Math.random().toFixed(9).slice(2)}$`,$a="?"+be,Lr=`<${$a}>`,Ee=document,Ke=()=>Ee.createComment(""),Ve=t=>t===null||typeof t!="object"&&typeof t!="function",Si=Array.isArray,Dr=t=>Si(t)||typeof(t==null?void 0:t[Symbol.iterator])=="function",Dt=`[ 	
\f\r]`,Be=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ji=/-->/g,Xi=/>/g,Ie=RegExp(`>|${Dt}(?:([^\\s"'>=/]+)(${Dt}*=${Dt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Zi=/'/g,Qi=/"/g,ka=/^(?:script|style|textarea|title)$/i,Or=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),s=Or(1),ee=Symbol.for("lit-noChange"),l=Symbol.for("lit-nothing"),ea=new WeakMap,Se=Ee.createTreeWalker(Ee,129);function Ca(t,e){if(!Si(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Yi!==void 0?Yi.createHTML(e):e}const Pr=(t,e)=>{const i=t.length-1,a=[];let r,o=e===2?"<svg>":e===3?"<math>":"",n=Be;for(let c=0;c<i;c++){const h=t[c];let f,g,u=-1,y=0;for(;y<h.length&&(n.lastIndex=y,g=n.exec(h),g!==null);)y=n.lastIndex,n===Be?g[1]==="!--"?n=Ji:g[1]!==void 0?n=Xi:g[2]!==void 0?(ka.test(g[2])&&(r=RegExp("</"+g[2],"g")),n=Ie):g[3]!==void 0&&(n=Ie):n===Ie?g[0]===">"?(n=r??Be,u=-1):g[1]===void 0?u=-2:(u=n.lastIndex-g[2].length,f=g[1],n=g[3]===void 0?Ie:g[3]==='"'?Qi:Zi):n===Qi||n===Zi?n=Ie:n===Ji||n===Xi?n=Be:(n=Ie,r=void 0);const $=n===Ie&&t[c+1].startsWith("/>")?" ":"";o+=n===Be?h+Lr:u>=0?(a.push(f),h.slice(0,u)+_a+h.slice(u)+be+$):h+be+(u===-2?c:$)}return[Ca(t,o+(t[i]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),a]};class Ye{constructor({strings:e,_$litType$:i},a){let r;this.parts=[];let o=0,n=0;const c=e.length-1,h=this.parts,[f,g]=Pr(e,i);if(this.el=Ye.createElement(f,a),Se.currentNode=this.el.content,i===2||i===3){const u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(r=Se.nextNode())!==null&&h.length<c;){if(r.nodeType===1){if(r.hasAttributes())for(const u of r.getAttributeNames())if(u.endsWith(_a)){const y=g[n++],$=r.getAttribute(u).split(be),O=/([.?@])?(.*)/.exec(y);h.push({type:1,index:o,name:O[2],strings:$,ctor:O[1]==="."?Rr:O[1]==="?"?Fr:O[1]==="@"?Nr:zt}),r.removeAttribute(u)}else u.startsWith(be)&&(h.push({type:6,index:o}),r.removeAttribute(u));if(ka.test(r.tagName)){const u=r.textContent.split(be),y=u.length-1;if(y>0){r.textContent=kt?kt.emptyScript:"";for(let $=0;$<y;$++)r.append(u[$],Ke()),Se.nextNode(),h.push({type:2,index:++o});r.append(u[y],Ke())}}}else if(r.nodeType===8)if(r.data===$a)h.push({type:2,index:o});else{let u=-1;for(;(u=r.data.indexOf(be,u+1))!==-1;)h.push({type:7,index:o}),u+=be.length-1}o++}}static createElement(e,i){const a=Ee.createElement("template");return a.innerHTML=e,a}}function Fe(t,e,i=t,a){var n,c;if(e===ee)return e;let r=a!==void 0?(n=i._$Co)==null?void 0:n[a]:i._$Cl;const o=Ve(e)?void 0:e._$litDirective$;return(r==null?void 0:r.constructor)!==o&&((c=r==null?void 0:r._$AO)==null||c.call(r,!1),o===void 0?r=void 0:(r=new o(t),r._$AT(t,i,a)),a!==void 0?(i._$Co??(i._$Co=[]))[a]=r:i._$Cl=r),r!==void 0&&(e=Fe(t,r._$AS(t,e.values),r,a)),e}class Mr{constructor(e,i){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:i},parts:a}=this._$AD,r=((e==null?void 0:e.creationScope)??Ee).importNode(i,!0);Se.currentNode=r;let o=Se.nextNode(),n=0,c=0,h=a[0];for(;h!==void 0;){if(n===h.index){let f;h.type===2?f=new Qe(o,o.nextSibling,this,e):h.type===1?f=new h.ctor(o,h.name,h.strings,this,e):h.type===6&&(f=new Br(o,this,e)),this._$AV.push(f),h=a[++c]}n!==(h==null?void 0:h.index)&&(o=Se.nextNode(),n++)}return Se.currentNode=Ee,r}p(e){let i=0;for(const a of this._$AV)a!==void 0&&(a.strings!==void 0?(a._$AI(e,a,i),i+=a.strings.length-2):a._$AI(e[i])),i++}}class Qe{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,i,a,r){this.type=2,this._$AH=l,this._$AN=void 0,this._$AA=e,this._$AB=i,this._$AM=a,this.options=r,this._$Cv=(r==null?void 0:r.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const i=this._$AM;return i!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=i.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,i=this){e=Fe(this,e,i),Ve(e)?e===l||e==null||e===""?(this._$AH!==l&&this._$AR(),this._$AH=l):e!==this._$AH&&e!==ee&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Dr(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==l&&Ve(this._$AH)?this._$AA.nextSibling.data=e:this.T(Ee.createTextNode(e)),this._$AH=e}$(e){var o;const{values:i,_$litType$:a}=e,r=typeof a=="number"?this._$AC(e):(a.el===void 0&&(a.el=Ye.createElement(Ca(a.h,a.h[0]),this.options)),a);if(((o=this._$AH)==null?void 0:o._$AD)===r)this._$AH.p(i);else{const n=new Mr(r,this),c=n.u(this.options);n.p(i),this.T(c),this._$AH=n}}_$AC(e){let i=ea.get(e.strings);return i===void 0&&ea.set(e.strings,i=new Ye(e)),i}k(e){Si(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let a,r=0;for(const o of e)r===i.length?i.push(a=new Qe(this.O(Ke()),this.O(Ke()),this,this.options)):a=i[r],a._$AI(o),r++;r<i.length&&(this._$AR(a&&a._$AB.nextSibling,r),i.length=r)}_$AR(e=this._$AA.nextSibling,i){var a;for((a=this._$AP)==null?void 0:a.call(this,!1,!0,i);e!==this._$AB;){const r=Vi(e).nextSibling;Vi(e).remove(),e=r}}setConnected(e){var i;this._$AM===void 0&&(this._$Cv=e,(i=this._$AP)==null||i.call(this,e))}}class zt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,i,a,r,o){this.type=1,this._$AH=l,this._$AN=void 0,this.element=e,this.name=i,this._$AM=r,this.options=o,a.length>2||a[0]!==""||a[1]!==""?(this._$AH=Array(a.length-1).fill(new String),this.strings=a):this._$AH=l}_$AI(e,i=this,a,r){const o=this.strings;let n=!1;if(o===void 0)e=Fe(this,e,i,0),n=!Ve(e)||e!==this._$AH&&e!==ee,n&&(this._$AH=e);else{const c=e;let h,f;for(e=o[0],h=0;h<o.length-1;h++)f=Fe(this,c[a+h],i,h),f===ee&&(f=this._$AH[h]),n||(n=!Ve(f)||f!==this._$AH[h]),f===l?e=l:e!==l&&(e+=(f??"")+o[h+1]),this._$AH[h]=f}n&&!r&&this.j(e)}j(e){e===l?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Rr extends zt{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===l?void 0:e}}class Fr extends zt{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==l)}}class Nr extends zt{constructor(e,i,a,r,o){super(e,i,a,r,o),this.type=5}_$AI(e,i=this){if((e=Fe(this,e,i,0)??l)===ee)return;const a=this._$AH,r=e===l&&a!==l||e.capture!==a.capture||e.once!==a.once||e.passive!==a.passive,o=e!==l&&(a===l||r);r&&this.element.removeEventListener(this.name,this,a),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var i;typeof this._$AH=="function"?this._$AH.call(((i=this.options)==null?void 0:i.host)??this.element,e):this._$AH.handleEvent(e)}}class Br{constructor(e,i,a){this.element=e,this.type=6,this._$AN=void 0,this._$AM=i,this.options=a}get _$AU(){return this._$AM._$AU}_$AI(e){Fe(this,e)}}const Ot=We.litHtmlPolyfillSupport;Ot==null||Ot(Ye,Qe),(We.litHtmlVersions??(We.litHtmlVersions=[])).push("3.3.3");const Ia=(t,e,i)=>{const a=(i==null?void 0:i.renderBefore)??e;let r=a._$litPart$;if(r===void 0){const o=(i==null?void 0:i.renderBefore)??null;a._$litPart$=r=new Qe(e.insertBefore(Ke(),o),o,void 0,i??{})}return r._$AI(t),r};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ze=globalThis;let C=class extends Me{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var i;const e=super.createRenderRoot();return(i=this.renderOptions).renderBefore??(i.renderBefore=e.firstChild),e}update(e){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Ia(i,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return ee}};var xa;C._$litElement$=!0,C.finalized=!0,(xa=ze.litElementHydrateSupport)==null||xa.call(ze,{LitElement:C});const Pt=ze.litElementPolyfillSupport;Pt==null||Pt({LitElement:C});(ze.litElementVersions??(ze.litElementVersions=[])).push("4.2.2");/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Ur extends C{connectedCallback(){super.connectedCallback(),this.setAttribute("aria-hidden","true")}render(){return s`<span class="shadow"></span>`}}/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Hr=_`:host,.shadow,.shadow::before,.shadow::after{border-radius:inherit;inset:0;position:absolute;transition-duration:inherit;transition-property:inherit;transition-timing-function:inherit}:host{display:flex;pointer-events:none;transition-property:box-shadow,opacity}.shadow::before,.shadow::after{content:"";transition-property:box-shadow,opacity;--_level: var(--md-elevation-level, 0);--_shadow-color: var(--md-elevation-shadow-color, var(--md-sys-color-shadow, #000))}.shadow::before{box-shadow:0px calc(1px*(clamp(0,var(--_level),1) + clamp(0,var(--_level) - 3,1) + 2*clamp(0,var(--_level) - 4,1))) calc(1px*(2*clamp(0,var(--_level),1) + clamp(0,var(--_level) - 2,1) + clamp(0,var(--_level) - 4,1))) 0px var(--_shadow-color);opacity:.3}.shadow::after{box-shadow:0px calc(1px*(clamp(0,var(--_level),1) + clamp(0,var(--_level) - 1,1) + 2*clamp(0,var(--_level) - 2,3))) calc(1px*(3*clamp(0,var(--_level),2) + 2*clamp(0,var(--_level) - 2,3))) calc(1px*(clamp(0,var(--_level),4) + 2*clamp(0,var(--_level) - 4,1))) var(--_shadow-color);opacity:.15}
`;/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let qt=class extends Ur{};qt.styles=[Hr];qt=p([I("md-elevation")],qt);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Ta=Symbol("attachableController");let xt;xt=new MutationObserver(t=>{var e;for(const i of t)(e=i.target[Ta])==null||e.hostConnected()});class Sa{get htmlFor(){return this.host.getAttribute("for")}set htmlFor(e){e===null?this.host.removeAttribute("for"):this.host.setAttribute("for",e)}get control(){return this.host.hasAttribute("for")?!this.htmlFor||!this.host.isConnected?null:this.host.getRootNode().querySelector(`#${this.htmlFor}`):this.currentControl||this.host.parentElement}set control(e){e?this.attach(e):this.detach()}constructor(e,i){this.host=e,this.onControlChange=i,this.currentControl=null,e.addController(this),e[Ta]=this,xt==null||xt.observe(e,{attributeFilter:["for"]})}attach(e){e!==this.currentControl&&(this.setCurrentControl(e),this.host.removeAttribute("for"))}detach(){this.setCurrentControl(null),this.host.setAttribute("for","")}hostConnected(){this.setCurrentControl(this.control)}hostDisconnected(){this.setCurrentControl(null)}setCurrentControl(e){this.onControlChange(this.currentControl,e),this.currentControl=e}}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const jr=["focusin","focusout","pointerdown"];class zi extends C{constructor(){super(...arguments),this.visible=!1,this.inward=!1,this.attachableController=new Sa(this,this.onControlChange.bind(this))}get htmlFor(){return this.attachableController.htmlFor}set htmlFor(e){this.attachableController.htmlFor=e}get control(){return this.attachableController.control}set control(e){this.attachableController.control=e}attach(e){this.attachableController.attach(e)}detach(){this.attachableController.detach()}connectedCallback(){super.connectedCallback(),this.setAttribute("aria-hidden","true")}handleEvent(e){var i;if(!e[ta]){switch(e.type){default:return;case"focusin":this.visible=((i=this.control)==null?void 0:i.matches(":focus-visible"))??!1;break;case"focusout":case"pointerdown":this.visible=!1;break}e[ta]=!0}}onControlChange(e,i){for(const a of jr)e==null||e.removeEventListener(a,this),i==null||i.addEventListener(a,this)}update(e){e.has("visible")&&this.dispatchEvent(new Event("visibility-changed")),super.update(e)}}p([m({type:Boolean,reflect:!0})],zi.prototype,"visible",void 0);p([m({type:Boolean,reflect:!0})],zi.prototype,"inward",void 0);const ta=Symbol("handledByFocusRing");/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Gr=_`:host{animation-delay:0s,calc(var(--md-focus-ring-duration, 600ms)*.25);animation-duration:calc(var(--md-focus-ring-duration, 600ms)*.25),calc(var(--md-focus-ring-duration, 600ms)*.75);animation-timing-function:cubic-bezier(0.2, 0, 0, 1);box-sizing:border-box;color:var(--md-focus-ring-color, var(--md-sys-color-secondary, #625b71));display:none;pointer-events:none;position:absolute}:host([visible]){display:flex}:host(:not([inward])){animation-name:outward-grow,outward-shrink;border-end-end-radius:calc(var(--md-focus-ring-shape-end-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));border-end-start-radius:calc(var(--md-focus-ring-shape-end-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));border-start-end-radius:calc(var(--md-focus-ring-shape-start-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));border-start-start-radius:calc(var(--md-focus-ring-shape-start-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));inset:calc(-1*var(--md-focus-ring-outward-offset, 2px));outline:var(--md-focus-ring-width, 3px) solid currentColor}:host([inward]){animation-name:inward-grow,inward-shrink;border-end-end-radius:calc(var(--md-focus-ring-shape-end-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border-end-start-radius:calc(var(--md-focus-ring-shape-end-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border-start-end-radius:calc(var(--md-focus-ring-shape-start-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border-start-start-radius:calc(var(--md-focus-ring-shape-start-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border:var(--md-focus-ring-width, 3px) solid currentColor;inset:var(--md-focus-ring-inward-offset, 0px)}@keyframes outward-grow{from{outline-width:0}to{outline-width:var(--md-focus-ring-active-width, 8px)}}@keyframes outward-shrink{from{outline-width:var(--md-focus-ring-active-width, 8px)}}@keyframes inward-grow{from{border-width:0}to{border-width:var(--md-focus-ring-active-width, 8px)}}@keyframes inward-shrink{from{border-width:var(--md-focus-ring-active-width, 8px)}}@media(prefers-reduced-motion){:host{animation:none}}
`;/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let Kt=class extends zi{};Kt.styles=[Gr];Kt=p([I("md-focus-ring")],Kt);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ge={ATTRIBUTE:1,PROPERTY:3,BOOLEAN_ATTRIBUTE:4},Ai=t=>(...e)=>({_$litDirective$:t,values:e});let Ei=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,i,a){this._$Ct=e,this._$AM=i,this._$Ci=a}_$AS(e,i){return this.update(e,i)}update(e,i){return this.render(...i)}};/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const te=Ai(class extends Ei{constructor(t){var e;if(super(t),t.type!==ge.ATTRIBUTE||t.name!=="class"||((e=t.strings)==null?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){var a,r;if(this.st===void 0){this.st=new Set,t.strings!==void 0&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(o=>o!=="")));for(const o in e)e[o]&&!((a=this.nt)!=null&&a.has(o))&&this.st.add(o);return this.render(e)}const i=t.element.classList;for(const o of this.st)o in e||(i.remove(o),this.st.delete(o));for(const o in e){const n=!!e[o];n===this.st.has(o)||(r=this.nt)!=null&&r.has(o)||(n?(i.add(o),this.st.add(o)):(i.remove(o),this.st.delete(o)))}return ee}});/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Le={STANDARD:"cubic-bezier(0.2, 0, 0, 1)",EMPHASIZED:"cubic-bezier(.3,0,0,1)",EMPHASIZED_ACCELERATE:"cubic-bezier(.3,0,.8,.15)"};/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Wr=450,ia=225,qr=.2,Kr=10,Vr=75,Yr=.35,Jr="::after",Xr="forwards";var W;(function(t){t[t.INACTIVE=0]="INACTIVE",t[t.TOUCH_DELAY=1]="TOUCH_DELAY",t[t.HOLDING=2]="HOLDING",t[t.WAITING_FOR_CLICK=3]="WAITING_FOR_CLICK"})(W||(W={}));const Zr=["click","contextmenu","pointercancel","pointerdown","pointerenter","pointerleave","pointerup"],Qr=150,Mt=window.matchMedia("(forced-colors: active)");class et extends C{constructor(){super(...arguments),this.disabled=!1,this.hovered=!1,this.pressed=!1,this.rippleSize="",this.rippleScale="",this.initialSize=0,this.state=W.INACTIVE,this.attachableController=new Sa(this,this.onControlChange.bind(this))}get htmlFor(){return this.attachableController.htmlFor}set htmlFor(e){this.attachableController.htmlFor=e}get control(){return this.attachableController.control}set control(e){this.attachableController.control=e}attach(e){this.attachableController.attach(e)}detach(){this.attachableController.detach()}connectedCallback(){super.connectedCallback(),this.setAttribute("aria-hidden","true")}render(){const e={hovered:this.hovered,pressed:this.pressed};return s`<div class="surface ${te(e)}"></div>`}update(e){e.has("disabled")&&this.disabled&&(this.hovered=!1,this.pressed=!1),super.update(e)}handlePointerenter(e){this.shouldReactToEvent(e)&&(this.hovered=!0)}handlePointerleave(e){this.shouldReactToEvent(e)&&(this.hovered=!1,this.state!==W.INACTIVE&&this.endPressAnimation())}handlePointerup(e){if(this.shouldReactToEvent(e)){if(this.state===W.HOLDING){this.state=W.WAITING_FOR_CLICK;return}if(this.state===W.TOUCH_DELAY){this.state=W.WAITING_FOR_CLICK,this.startPressAnimation(this.rippleStartEvent);return}}}async handlePointerdown(e){if(this.shouldReactToEvent(e)){if(this.rippleStartEvent=e,!this.isTouch(e)){this.state=W.WAITING_FOR_CLICK,this.startPressAnimation(e);return}this.state=W.TOUCH_DELAY,await new Promise(i=>{setTimeout(i,Qr)}),this.state===W.TOUCH_DELAY&&(this.state=W.HOLDING,this.startPressAnimation(e))}}handleClick(){if(!this.disabled){if(this.state===W.WAITING_FOR_CLICK){this.endPressAnimation();return}this.state===W.INACTIVE&&(this.startPressAnimation(),this.endPressAnimation())}}handlePointercancel(e){this.shouldReactToEvent(e)&&this.endPressAnimation()}handleContextmenu(){this.disabled||this.endPressAnimation()}determineRippleSize(){const{height:e,width:i}=this.getBoundingClientRect(),a=Math.max(e,i),r=Math.max(Yr*a,Vr),o=this.currentCSSZoom??1,n=Math.floor(a*qr/o),h=Math.sqrt(i**2+e**2)+Kr;this.initialSize=n;const f=(h+r)/n;this.rippleScale=`${f/o}`,this.rippleSize=`${n}px`}getNormalizedPointerEventCoords(e){const{scrollX:i,scrollY:a}=window,{left:r,top:o}=this.getBoundingClientRect(),n=i+r,c=a+o,{pageX:h,pageY:f}=e,g=this.currentCSSZoom??1;return{x:(h-n)/g,y:(f-c)/g}}getTranslationCoordinates(e){const{height:i,width:a}=this.getBoundingClientRect(),r=this.currentCSSZoom??1,o={x:(a/r-this.initialSize)/2,y:(i/r-this.initialSize)/2};let n;return e instanceof PointerEvent?n=this.getNormalizedPointerEventCoords(e):n={x:a/r/2,y:i/r/2},n={x:n.x-this.initialSize/2,y:n.y-this.initialSize/2},{startPoint:n,endPoint:o}}startPressAnimation(e){var n;if(!this.mdRoot)return;this.pressed=!0,(n=this.growAnimation)==null||n.cancel(),this.determineRippleSize();const{startPoint:i,endPoint:a}=this.getTranslationCoordinates(e),r=`${i.x}px, ${i.y}px`,o=`${a.x}px, ${a.y}px`;this.growAnimation=this.mdRoot.animate({top:[0,0],left:[0,0],height:[this.rippleSize,this.rippleSize],width:[this.rippleSize,this.rippleSize],transform:[`translate(${r}) scale(1)`,`translate(${o}) scale(${this.rippleScale})`]},{pseudoElement:Jr,duration:Wr,easing:Le.STANDARD,fill:Xr})}async endPressAnimation(){this.rippleStartEvent=void 0,this.state=W.INACTIVE;const e=this.growAnimation;let i=1/0;if(typeof(e==null?void 0:e.currentTime)=="number"?i=e.currentTime:e!=null&&e.currentTime&&(i=e.currentTime.to("ms").value),i>=ia){this.pressed=!1;return}await new Promise(a=>{setTimeout(a,ia-i)}),this.growAnimation===e&&(this.pressed=!1)}shouldReactToEvent(e){if(this.disabled||!e.isPrimary||this.rippleStartEvent&&this.rippleStartEvent.pointerId!==e.pointerId)return!1;if(e.type==="pointerenter"||e.type==="pointerleave")return!this.isTouch(e);const i=e.buttons===1;return this.isTouch(e)||i}isTouch({pointerType:e}){return e==="touch"}async handleEvent(e){if(!(Mt!=null&&Mt.matches))switch(e.type){case"click":this.handleClick();break;case"contextmenu":this.handleContextmenu();break;case"pointercancel":this.handlePointercancel(e);break;case"pointerdown":await this.handlePointerdown(e);break;case"pointerenter":this.handlePointerenter(e);break;case"pointerleave":this.handlePointerleave(e);break;case"pointerup":this.handlePointerup(e);break}}onControlChange(e,i){for(const a of Zr)e==null||e.removeEventListener(a,this),i==null||i.addEventListener(a,this)}}p([m({type:Boolean,reflect:!0})],et.prototype,"disabled",void 0);p([d()],et.prototype,"hovered",void 0);p([d()],et.prototype,"pressed",void 0);p([S(".surface")],et.prototype,"mdRoot",void 0);/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const eo=_`:host{display:flex;margin:auto;pointer-events:none}:host([disabled]){display:none}@media(forced-colors: active){:host{display:none}}:host,.surface{border-radius:inherit;position:absolute;inset:0;overflow:hidden}.surface{-webkit-tap-highlight-color:rgba(0,0,0,0)}.surface::before,.surface::after{content:"";opacity:0;position:absolute}.surface::before{background-color:var(--md-ripple-hover-color, var(--md-sys-color-on-surface, #1d1b20));inset:0;transition:opacity 15ms linear,background-color 15ms linear}.surface::after{background:radial-gradient(closest-side, var(--md-ripple-pressed-color, var(--md-sys-color-on-surface, #1d1b20)) max(100% - 70px, 65%), transparent 100%);transform-origin:center center;transition:opacity 375ms linear}.hovered::before{background-color:var(--md-ripple-hover-color, var(--md-sys-color-on-surface, #1d1b20));opacity:var(--md-ripple-hover-opacity, 0.08)}.pressed::after{opacity:var(--md-ripple-pressed-opacity, 0.12);transition-duration:105ms}
`;/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let Vt=class extends et{};Vt.styles=[eo];Vt=p([I("md-ripple")],Vt);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const za=["role","ariaAtomic","ariaAutoComplete","ariaBusy","ariaChecked","ariaColCount","ariaColIndex","ariaColSpan","ariaCurrent","ariaDisabled","ariaExpanded","ariaHasPopup","ariaHidden","ariaInvalid","ariaKeyShortcuts","ariaLabel","ariaLevel","ariaLive","ariaModal","ariaMultiLine","ariaMultiSelectable","ariaOrientation","ariaPlaceholder","ariaPosInSet","ariaPressed","ariaReadOnly","ariaRequired","ariaRoleDescription","ariaRowCount","ariaRowIndex","ariaRowSpan","ariaSelected","ariaSetSize","ariaSort","ariaValueMax","ariaValueMin","ariaValueNow","ariaValueText"],to=za.map(Aa);function Rt(t){return to.includes(t)}function Aa(t){return t.replace("aria","aria-").replace(/Elements?/g,"").toLowerCase()}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const rt=Symbol("privateIgnoreAttributeChangesFor");function _e(t){var e;class i extends t{constructor(){super(...arguments),this[e]=new Set}attributeChangedCallback(r,o,n){if(!Rt(r)){super.attributeChangedCallback(r,o,n);return}if(this[rt].has(r))return;this[rt].add(r),this.removeAttribute(r),this[rt].delete(r);const c=Jt(r);n===null?delete this.dataset[c]:this.dataset[c]=n,this.requestUpdate(Jt(r),o)}getAttribute(r){return Rt(r)?super.getAttribute(Yt(r)):super.getAttribute(r)}removeAttribute(r){super.removeAttribute(r),Rt(r)&&(super.removeAttribute(Yt(r)),this.requestUpdate())}}return e=rt,io(i),i}function io(t){for(const e of za){const i=Aa(e),a=Yt(i),r=Jt(i);t.createProperty(e,{attribute:i,noAccessor:!0}),t.createProperty(Symbol(a),{attribute:a,noAccessor:!0}),Object.defineProperty(t.prototype,e,{configurable:!0,enumerable:!0,get(){return this.dataset[r]??null},set(o){const n=this.dataset[r]??null;o!==n&&(o===null?delete this.dataset[r]:this.dataset[r]=o,this.requestUpdate(e,n))}})}}function Yt(t){return`data-${t}`}function Jt(t){return t.replace(/-\w/,e=>e[1].toUpperCase())}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const q=Symbol("internals"),Ft=Symbol("privateInternals");function Li(t){class e extends t{get[q](){return this[Ft]||(this[Ft]=this.attachInternals()),this[Ft]}}return e}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function Ea(t){t.addInitializer(e=>{const i=e;i.addEventListener("click",async a=>{const{type:r,[q]:o}=i,{form:n}=o;if(!(!n||r==="button")&&(await new Promise(c=>{setTimeout(c)}),!a.defaultPrevented)){if(r==="reset"){n.reset();return}n.addEventListener("submit",c=>{Object.defineProperty(c,"submitter",{configurable:!0,enumerable:!0,get:()=>i})},{capture:!0,once:!0}),o.setFormValue(i.value),n.requestSubmit()}})})}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function ao(t){const e=new MouseEvent("click",{bubbles:!0});return t.dispatchEvent(e),e}function ro(t){return t.currentTarget!==t.target||t.composedPath()[0]!==t.target||t.target.disabled?!1:!oo(t)}function oo(t){const e=Xt;return e&&(t.preventDefault(),t.stopImmediatePropagation()),so(),e}let Xt=!1;async function so(){Xt=!0,await null,Xt=!1}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const no=_e(Li(C));class B extends no{get name(){return this.getAttribute("name")??""}set name(e){this.setAttribute("name",e)}get form(){return this[q].form}constructor(){super(),this.disabled=!1,this.softDisabled=!1,this.href="",this.download="",this.target="",this.trailingIcon=!1,this.hasIcon=!1,this.type="submit",this.value="",this.addEventListener("click",this.handleClick.bind(this))}focus(){var e;(e=this.buttonElement)==null||e.focus()}blur(){var e;(e=this.buttonElement)==null||e.blur()}render(){var r;const e=this.disabled||this.softDisabled,i=this.href?this.renderLink():this.renderButton(),a=this.href?"link":"button";return s`
      ${(r=this.renderElevationOrOutline)==null?void 0:r.call(this)}
      <div class="background"></div>
      <md-focus-ring part="focus-ring" for=${a}></md-focus-ring>
      <md-ripple
        part="ripple"
        for=${a}
        ?disabled="${e}"></md-ripple>
      ${i}
    `}renderButton(){const{ariaLabel:e,ariaHasPopup:i,ariaExpanded:a}=this;return s`<button
      id="button"
      class="button"
      ?disabled=${this.disabled}
      aria-disabled=${this.softDisabled||l}
      aria-label="${e||l}"
      aria-haspopup="${i||l}"
      aria-expanded="${a||l}">
      ${this.renderContent()}
    </button>`}renderLink(){const{ariaLabel:e,ariaHasPopup:i,ariaExpanded:a}=this;return s`<a
      id="link"
      class="button"
      aria-label="${e||l}"
      aria-haspopup="${i||l}"
      aria-expanded="${a||l}"
      aria-disabled=${this.disabled||this.softDisabled||l}
      tabindex="${this.disabled&&!this.softDisabled?-1:l}"
      href=${this.href}
      download=${this.download||l}
      target=${this.target||l}
      >${this.renderContent()}
    </a>`}renderContent(){const e=s`<slot
      name="icon"
      @slotchange="${this.handleSlotChange}"></slot>`;return s`
      <span class="touch"></span>
      ${this.trailingIcon?l:e}
      <span class="label"><slot></slot></span>
      ${this.trailingIcon?e:l}
    `}handleClick(e){if(this.softDisabled||this.disabled&&this.href){e.stopImmediatePropagation(),e.preventDefault();return}!ro(e)||!this.buttonElement||(this.focus(),ao(this.buttonElement))}handleSlotChange(){this.hasIcon=this.assignedIcons.length>0}}Ea(B);B.formAssociated=!0;B.shadowRootOptions={mode:"open",delegatesFocus:!0};p([m({type:Boolean,reflect:!0})],B.prototype,"disabled",void 0);p([m({type:Boolean,attribute:"soft-disabled",reflect:!0})],B.prototype,"softDisabled",void 0);p([m()],B.prototype,"href",void 0);p([m()],B.prototype,"download",void 0);p([m()],B.prototype,"target",void 0);p([m({type:Boolean,attribute:"trailing-icon",reflect:!0})],B.prototype,"trailingIcon",void 0);p([m({type:Boolean,attribute:"has-icon",reflect:!0})],B.prototype,"hasIcon",void 0);p([m()],B.prototype,"type",void 0);p([m({reflect:!0})],B.prototype,"value",void 0);p([S(".button")],B.prototype,"buttonElement",void 0);p([we({slot:"icon",flatten:!0})],B.prototype,"assignedIcons",void 0);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class lo extends B{renderElevationOrOutline(){return s`<md-elevation part="elevation"></md-elevation>`}}/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const co=_`:host{--_container-color: var(--md-filled-button-container-color, var(--md-sys-color-primary, #6750a4));--_container-elevation: var(--md-filled-button-container-elevation, 0);--_container-height: var(--md-filled-button-container-height, 40px);--_container-shadow-color: var(--md-filled-button-container-shadow-color, var(--md-sys-color-shadow, #000));--_disabled-container-color: var(--md-filled-button-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-container-elevation: var(--md-filled-button-disabled-container-elevation, 0);--_disabled-container-opacity: var(--md-filled-button-disabled-container-opacity, 0.12);--_disabled-label-text-color: var(--md-filled-button-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-filled-button-disabled-label-text-opacity, 0.38);--_focus-container-elevation: var(--md-filled-button-focus-container-elevation, 0);--_focus-label-text-color: var(--md-filled-button-focus-label-text-color, var(--md-sys-color-on-primary, #fff));--_hover-container-elevation: var(--md-filled-button-hover-container-elevation, 1);--_hover-label-text-color: var(--md-filled-button-hover-label-text-color, var(--md-sys-color-on-primary, #fff));--_hover-state-layer-color: var(--md-filled-button-hover-state-layer-color, var(--md-sys-color-on-primary, #fff));--_hover-state-layer-opacity: var(--md-filled-button-hover-state-layer-opacity, 0.08);--_label-text-color: var(--md-filled-button-label-text-color, var(--md-sys-color-on-primary, #fff));--_label-text-font: var(--md-filled-button-label-text-font, var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-filled-button-label-text-line-height, var(--md-sys-typescale-label-large-line-height, 1.25rem));--_label-text-size: var(--md-filled-button-label-text-size, var(--md-sys-typescale-label-large-size, 0.875rem));--_label-text-weight: var(--md-filled-button-label-text-weight, var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)));--_pressed-container-elevation: var(--md-filled-button-pressed-container-elevation, 0);--_pressed-label-text-color: var(--md-filled-button-pressed-label-text-color, var(--md-sys-color-on-primary, #fff));--_pressed-state-layer-color: var(--md-filled-button-pressed-state-layer-color, var(--md-sys-color-on-primary, #fff));--_pressed-state-layer-opacity: var(--md-filled-button-pressed-state-layer-opacity, 0.12);--_disabled-icon-color: var(--md-filled-button-disabled-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-icon-opacity: var(--md-filled-button-disabled-icon-opacity, 0.38);--_focus-icon-color: var(--md-filled-button-focus-icon-color, var(--md-sys-color-on-primary, #fff));--_hover-icon-color: var(--md-filled-button-hover-icon-color, var(--md-sys-color-on-primary, #fff));--_icon-color: var(--md-filled-button-icon-color, var(--md-sys-color-on-primary, #fff));--_icon-size: var(--md-filled-button-icon-size, 18px);--_pressed-icon-color: var(--md-filled-button-pressed-icon-color, var(--md-sys-color-on-primary, #fff));--_container-shape-start-start: var(--md-filled-button-container-shape-start-start, var(--md-filled-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-start-end: var(--md-filled-button-container-shape-start-end, var(--md-filled-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-end: var(--md-filled-button-container-shape-end-end, var(--md-filled-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-start: var(--md-filled-button-container-shape-end-start, var(--md-filled-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_leading-space: var(--md-filled-button-leading-space, 24px);--_trailing-space: var(--md-filled-button-trailing-space, 24px);--_with-leading-icon-leading-space: var(--md-filled-button-with-leading-icon-leading-space, 16px);--_with-leading-icon-trailing-space: var(--md-filled-button-with-leading-icon-trailing-space, 24px);--_with-trailing-icon-leading-space: var(--md-filled-button-with-trailing-icon-leading-space, 24px);--_with-trailing-icon-trailing-space: var(--md-filled-button-with-trailing-icon-trailing-space, 16px)}
`;/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const po=_`md-elevation{transition-duration:280ms}:host(:is([disabled],[soft-disabled])) md-elevation{transition:none}md-elevation{--md-elevation-level: var(--_container-elevation);--md-elevation-shadow-color: var(--_container-shadow-color)}:host(:focus-within) md-elevation{--md-elevation-level: var(--_focus-container-elevation)}:host(:hover) md-elevation{--md-elevation-level: var(--_hover-container-elevation)}:host(:active) md-elevation{--md-elevation-level: var(--_pressed-container-elevation)}:host(:is([disabled],[soft-disabled])) md-elevation{--md-elevation-level: var(--_disabled-container-elevation)}
`;/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Di=_`:host{border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end);box-sizing:border-box;cursor:pointer;display:inline-flex;gap:8px;min-height:var(--_container-height);outline:none;padding-block:calc((var(--_container-height) - max(var(--_label-text-line-height),var(--_icon-size)))/2);padding-inline-start:var(--_leading-space);padding-inline-end:var(--_trailing-space);place-content:center;place-items:center;position:relative;font-family:var(--_label-text-font);font-size:var(--_label-text-size);line-height:var(--_label-text-line-height);font-weight:var(--_label-text-weight);text-overflow:ellipsis;text-wrap:nowrap;user-select:none;-webkit-tap-highlight-color:rgba(0,0,0,0);vertical-align:top;--md-ripple-hover-color: var(--_hover-state-layer-color);--md-ripple-pressed-color: var(--_pressed-state-layer-color);--md-ripple-hover-opacity: var(--_hover-state-layer-opacity);--md-ripple-pressed-opacity: var(--_pressed-state-layer-opacity)}md-focus-ring{--md-focus-ring-shape-start-start: var(--_container-shape-start-start);--md-focus-ring-shape-start-end: var(--_container-shape-start-end);--md-focus-ring-shape-end-end: var(--_container-shape-end-end);--md-focus-ring-shape-end-start: var(--_container-shape-end-start)}:host(:is([disabled],[soft-disabled])){cursor:default;pointer-events:none}.button{border-radius:inherit;cursor:inherit;display:inline-flex;align-items:center;justify-content:center;border:none;outline:none;-webkit-appearance:none;vertical-align:middle;background:rgba(0,0,0,0);text-decoration:none;min-width:calc(64px - var(--_leading-space) - var(--_trailing-space));width:100%;z-index:0;height:100%;font:inherit;color:var(--_label-text-color);padding:0;gap:inherit;text-transform:inherit}.button::-moz-focus-inner{padding:0;border:0}:host(:hover) .button{color:var(--_hover-label-text-color)}:host(:focus-within) .button{color:var(--_focus-label-text-color)}:host(:active) .button{color:var(--_pressed-label-text-color)}.background{background:var(--_container-color);border-radius:inherit;inset:0;position:absolute}.label{overflow:hidden}:is(.button,.label,.label slot),.label ::slotted(*){text-overflow:inherit}:host(:is([disabled],[soft-disabled])) .label{color:var(--_disabled-label-text-color);opacity:var(--_disabled-label-text-opacity)}:host(:is([disabled],[soft-disabled])) .background{background:var(--_disabled-container-color);opacity:var(--_disabled-container-opacity)}@media(forced-colors: active){.background{border:1px solid CanvasText}:host(:is([disabled],[soft-disabled])){--_disabled-icon-color: GrayText;--_disabled-icon-opacity: 1;--_disabled-container-opacity: 1;--_disabled-label-text-color: GrayText;--_disabled-label-text-opacity: 1}}:host([has-icon]:not([trailing-icon])){padding-inline-start:var(--_with-leading-icon-leading-space);padding-inline-end:var(--_with-leading-icon-trailing-space)}:host([has-icon][trailing-icon]){padding-inline-start:var(--_with-trailing-icon-leading-space);padding-inline-end:var(--_with-trailing-icon-trailing-space)}::slotted([slot=icon]){display:inline-flex;position:relative;writing-mode:horizontal-tb;fill:currentColor;flex-shrink:0;color:var(--_icon-color);font-size:var(--_icon-size);inline-size:var(--_icon-size);block-size:var(--_icon-size)}:host(:hover) ::slotted([slot=icon]){color:var(--_hover-icon-color)}:host(:focus-within) ::slotted([slot=icon]){color:var(--_focus-icon-color)}:host(:active) ::slotted([slot=icon]){color:var(--_pressed-icon-color)}:host(:is([disabled],[soft-disabled])) ::slotted([slot=icon]){color:var(--_disabled-icon-color);opacity:var(--_disabled-icon-opacity)}.touch{position:absolute;top:50%;height:48px;left:0;right:0;transform:translateY(-50%)}:host([touch-target=wrapper]){margin:max(0px,(48px - var(--_container-height))/2) 0}:host([touch-target=none]) .touch{display:none}
`;/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let Zt=class extends lo{};Zt.styles=[Di,po,co];Zt=p([I("md-filled-button")],Zt);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class ho extends B{}/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const uo=_`:host{--_container-height: var(--md-text-button-container-height, 40px);--_disabled-label-text-color: var(--md-text-button-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-text-button-disabled-label-text-opacity, 0.38);--_focus-label-text-color: var(--md-text-button-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_hover-label-text-color: var(--md-text-button-hover-label-text-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-color: var(--md-text-button-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-opacity: var(--md-text-button-hover-state-layer-opacity, 0.08);--_label-text-color: var(--md-text-button-label-text-color, var(--md-sys-color-primary, #6750a4));--_label-text-font: var(--md-text-button-label-text-font, var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-text-button-label-text-line-height, var(--md-sys-typescale-label-large-line-height, 1.25rem));--_label-text-size: var(--md-text-button-label-text-size, var(--md-sys-typescale-label-large-size, 0.875rem));--_label-text-weight: var(--md-text-button-label-text-weight, var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)));--_pressed-label-text-color: var(--md-text-button-pressed-label-text-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-color: var(--md-text-button-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-opacity: var(--md-text-button-pressed-state-layer-opacity, 0.12);--_disabled-icon-color: var(--md-text-button-disabled-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-icon-opacity: var(--md-text-button-disabled-icon-opacity, 0.38);--_focus-icon-color: var(--md-text-button-focus-icon-color, var(--md-sys-color-primary, #6750a4));--_hover-icon-color: var(--md-text-button-hover-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-color: var(--md-text-button-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-size: var(--md-text-button-icon-size, 18px);--_pressed-icon-color: var(--md-text-button-pressed-icon-color, var(--md-sys-color-primary, #6750a4));--_container-shape-start-start: var(--md-text-button-container-shape-start-start, var(--md-text-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-start-end: var(--md-text-button-container-shape-start-end, var(--md-text-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-end: var(--md-text-button-container-shape-end-end, var(--md-text-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-start: var(--md-text-button-container-shape-end-start, var(--md-text-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_leading-space: var(--md-text-button-leading-space, 12px);--_trailing-space: var(--md-text-button-trailing-space, 12px);--_with-leading-icon-leading-space: var(--md-text-button-with-leading-icon-leading-space, 12px);--_with-leading-icon-trailing-space: var(--md-text-button-with-leading-icon-trailing-space, 16px);--_with-trailing-icon-leading-space: var(--md-text-button-with-trailing-icon-leading-space, 16px);--_with-trailing-icon-trailing-space: var(--md-text-button-with-trailing-icon-trailing-space, 12px);--_container-color: none;--_disabled-container-color: none;--_disabled-container-opacity: 0}
`;/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let Qt=class extends ho{};Qt.styles=[Di,uo];Qt=p([I("md-text-button")],Qt);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class mo extends B{renderElevationOrOutline(){return s`<div class="outline"></div>`}}/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const vo=_`:host{--_container-height: var(--md-outlined-button-container-height, 40px);--_disabled-label-text-color: var(--md-outlined-button-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-outlined-button-disabled-label-text-opacity, 0.38);--_disabled-outline-color: var(--md-outlined-button-disabled-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-outline-opacity: var(--md-outlined-button-disabled-outline-opacity, 0.12);--_focus-label-text-color: var(--md-outlined-button-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_hover-label-text-color: var(--md-outlined-button-hover-label-text-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-color: var(--md-outlined-button-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-opacity: var(--md-outlined-button-hover-state-layer-opacity, 0.08);--_label-text-color: var(--md-outlined-button-label-text-color, var(--md-sys-color-primary, #6750a4));--_label-text-font: var(--md-outlined-button-label-text-font, var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-outlined-button-label-text-line-height, var(--md-sys-typescale-label-large-line-height, 1.25rem));--_label-text-size: var(--md-outlined-button-label-text-size, var(--md-sys-typescale-label-large-size, 0.875rem));--_label-text-weight: var(--md-outlined-button-label-text-weight, var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)));--_outline-color: var(--md-outlined-button-outline-color, var(--md-sys-color-outline, #79747e));--_outline-width: var(--md-outlined-button-outline-width, 1px);--_pressed-label-text-color: var(--md-outlined-button-pressed-label-text-color, var(--md-sys-color-primary, #6750a4));--_pressed-outline-color: var(--md-outlined-button-pressed-outline-color, var(--md-sys-color-outline, #79747e));--_pressed-state-layer-color: var(--md-outlined-button-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-opacity: var(--md-outlined-button-pressed-state-layer-opacity, 0.12);--_disabled-icon-color: var(--md-outlined-button-disabled-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-icon-opacity: var(--md-outlined-button-disabled-icon-opacity, 0.38);--_focus-icon-color: var(--md-outlined-button-focus-icon-color, var(--md-sys-color-primary, #6750a4));--_hover-icon-color: var(--md-outlined-button-hover-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-color: var(--md-outlined-button-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-size: var(--md-outlined-button-icon-size, 18px);--_pressed-icon-color: var(--md-outlined-button-pressed-icon-color, var(--md-sys-color-primary, #6750a4));--_container-shape-start-start: var(--md-outlined-button-container-shape-start-start, var(--md-outlined-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-start-end: var(--md-outlined-button-container-shape-start-end, var(--md-outlined-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-end: var(--md-outlined-button-container-shape-end-end, var(--md-outlined-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-start: var(--md-outlined-button-container-shape-end-start, var(--md-outlined-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_leading-space: var(--md-outlined-button-leading-space, 24px);--_trailing-space: var(--md-outlined-button-trailing-space, 24px);--_with-leading-icon-leading-space: var(--md-outlined-button-with-leading-icon-leading-space, 16px);--_with-leading-icon-trailing-space: var(--md-outlined-button-with-leading-icon-trailing-space, 24px);--_with-trailing-icon-leading-space: var(--md-outlined-button-with-trailing-icon-leading-space, 24px);--_with-trailing-icon-trailing-space: var(--md-outlined-button-with-trailing-icon-trailing-space, 16px);--_container-color: none;--_disabled-container-color: none;--_disabled-container-opacity: 0}.outline{inset:0;border-style:solid;position:absolute;box-sizing:border-box;border-color:var(--_outline-color);border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end)}:host(:active) .outline{border-color:var(--_pressed-outline-color)}:host(:is([disabled],[soft-disabled])) .outline{border-color:var(--_disabled-outline-color);opacity:var(--_disabled-outline-opacity)}@media(forced-colors: active){:host(:is([disabled],[soft-disabled])) .background{border-color:GrayText}:host(:is([disabled],[soft-disabled])) .outline{opacity:1}}.outline,md-ripple{border-width:var(--_outline-width)}md-ripple{inline-size:calc(100% - 2*var(--_outline-width));block-size:calc(100% - 2*var(--_outline-width));border-style:solid;border-color:rgba(0,0,0,0)}
`;/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let ei=class extends mo{};ei.styles=[Di,vo];ei=p([I("md-outlined-button")],ei);/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const La=Symbol.for(""),fo=t=>{if((t==null?void 0:t.r)===La)return t==null?void 0:t._$litStatic$},pe=(t,...e)=>({_$litStatic$:e.reduce((i,a,r)=>i+(o=>{if(o._$litStatic$!==void 0)return o._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${o}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)})(a)+t[r+1],t[0]),r:La}),aa=new Map,go=t=>(e,...i)=>{const a=i.length;let r,o;const n=[],c=[];let h,f=0,g=!1;for(;f<a;){for(h=e[f];f<a&&(o=i[f],(r=fo(o))!==void 0);)h+=r+e[++f],g=!0;f!==a&&c.push(o),n.push(h),f++}if(f===a&&n.push(e[a]),g){const u=n.join("$$lit$$");(e=aa.get(u))===void 0&&(n.raw=n,aa.set(u,e=n)),i=c}return t(e,...i)},Oi=go(s);/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function ra(t,e=!0){return e&&getComputedStyle(t).getPropertyValue("direction").trim()==="rtl"}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const bo=_e(Li(C));class j extends bo{get name(){return this.getAttribute("name")??""}set name(e){this.setAttribute("name",e)}get form(){return this[q].form}get labels(){return this[q].labels}constructor(){super(),this.disabled=!1,this.softDisabled=!1,this.flipIconInRtl=!1,this.href="",this.download="",this.target="",this.ariaLabelSelected="",this.toggle=!1,this.selected=!1,this.type="submit",this.value="",this.flipIcon=ra(this,this.flipIconInRtl),this.addEventListener("click",this.handleClick.bind(this))}willUpdate(){this.href&&(this.disabled=!1,this.softDisabled=!1)}render(){const e=this.href?pe`div`:pe`button`,{ariaLabel:i,ariaHasPopup:a,ariaExpanded:r}=this,o=i&&this.ariaLabelSelected,n=this.toggle?this.selected:l;let c=l;return this.href||(c=o&&this.selected?this.ariaLabelSelected:i),Oi`<${e}
        class="icon-button ${te(this.getRenderClasses())}"
        id="button"
        aria-label="${c||l}"
        aria-haspopup="${!this.href&&a||l}"
        aria-expanded="${!this.href&&r||l}"
        aria-pressed="${n}"
        aria-disabled=${!this.href&&this.softDisabled||l}
        ?disabled="${!this.href&&this.disabled}"
        @click="${this.handleClickOnChild}">
        ${this.renderFocusRing()}
        ${this.renderRipple()}
        ${this.selected?l:this.renderIcon()}
        ${this.selected?this.renderSelectedIcon():l}
        ${this.href?this.renderLink():this.renderTouchTarget()}
  </${e}>`}renderLink(){const{ariaLabel:e}=this;return s`
      <a
        class="link"
        id="link"
        href="${this.href}"
        download="${this.download||l}"
        target="${this.target||l}"
        aria-label="${e||l}">
        ${this.renderTouchTarget()}
      </a>
    `}getRenderClasses(){return{"flip-icon":this.flipIcon,selected:this.toggle&&this.selected}}renderIcon(){return s`<span class="icon"><slot></slot></span>`}renderSelectedIcon(){return s`<span class="icon icon--selected"
      ><slot name="selected"><slot></slot></slot
    ></span>`}renderTouchTarget(){return s`<span class="touch"></span>`}renderFocusRing(){return s`<md-focus-ring
      part="focus-ring"
      for=${this.href?"link":"button"}></md-focus-ring>`}renderRipple(){const e=!this.href&&(this.disabled||this.softDisabled);return s`<md-ripple
      for=${this.href?"link":l}
      ?disabled="${e}"></md-ripple>`}connectedCallback(){this.flipIcon=ra(this,this.flipIconInRtl),super.connectedCallback()}handleClick(e){if(!this.href&&this.softDisabled){e.stopImmediatePropagation(),e.preventDefault();return}}async handleClickOnChild(e){await 0,!(!this.toggle||this.disabled||this.softDisabled||e.defaultPrevented)&&(this.selected=!this.selected,this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0})))}}Ea(j);j.formAssociated=!0;j.shadowRootOptions={mode:"open",delegatesFocus:!0};p([m({type:Boolean,reflect:!0})],j.prototype,"disabled",void 0);p([m({type:Boolean,attribute:"soft-disabled",reflect:!0})],j.prototype,"softDisabled",void 0);p([m({type:Boolean,attribute:"flip-icon-in-rtl"})],j.prototype,"flipIconInRtl",void 0);p([m()],j.prototype,"href",void 0);p([m()],j.prototype,"download",void 0);p([m()],j.prototype,"target",void 0);p([m({attribute:"aria-label-selected"})],j.prototype,"ariaLabelSelected",void 0);p([m({type:Boolean})],j.prototype,"toggle",void 0);p([m({type:Boolean,reflect:!0})],j.prototype,"selected",void 0);p([m()],j.prototype,"type",void 0);p([m({reflect:!0})],j.prototype,"value",void 0);p([d()],j.prototype,"flipIcon",void 0);/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const yo=_`:host{display:inline-flex;outline:none;-webkit-tap-highlight-color:rgba(0,0,0,0);height:var(--_container-height);width:var(--_container-width);justify-content:center}:host([touch-target=wrapper]){margin:max(0px,(48px - var(--_container-height))/2) max(0px,(48px - var(--_container-width))/2)}md-focus-ring{--md-focus-ring-shape-start-start: var(--_container-shape-start-start);--md-focus-ring-shape-start-end: var(--_container-shape-start-end);--md-focus-ring-shape-end-end: var(--_container-shape-end-end);--md-focus-ring-shape-end-start: var(--_container-shape-end-start)}:host(:is([disabled],[soft-disabled])){pointer-events:none}.icon-button{place-items:center;background:none;border:none;box-sizing:border-box;cursor:pointer;display:flex;place-content:center;outline:none;padding:0;position:relative;text-decoration:none;user-select:none;z-index:0;flex:1;border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end)}.icon ::slotted(*){font-size:var(--_icon-size);height:var(--_icon-size);width:var(--_icon-size);font-weight:inherit}md-ripple{z-index:-1;border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end)}.flip-icon .icon{transform:scaleX(-1)}.icon{display:inline-flex}.link{display:grid;height:100%;outline:none;place-items:center;position:absolute;width:100%}.touch{position:absolute;height:max(48px,100%);width:max(48px,100%)}:host([touch-target=none]) .touch{display:none}@media(forced-colors: active){:host(:is([disabled],[soft-disabled])){--_disabled-icon-color: GrayText;--_disabled-icon-opacity: 1}}
`;/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const xo=_`:host{--_disabled-icon-color: var(--md-icon-button-disabled-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-icon-opacity: var(--md-icon-button-disabled-icon-opacity, 0.38);--_icon-size: var(--md-icon-button-icon-size, 24px);--_selected-focus-icon-color: var(--md-icon-button-selected-focus-icon-color, var(--md-sys-color-primary, #6750a4));--_selected-hover-icon-color: var(--md-icon-button-selected-hover-icon-color, var(--md-sys-color-primary, #6750a4));--_selected-hover-state-layer-color: var(--md-icon-button-selected-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_selected-hover-state-layer-opacity: var(--md-icon-button-selected-hover-state-layer-opacity, 0.08);--_selected-icon-color: var(--md-icon-button-selected-icon-color, var(--md-sys-color-primary, #6750a4));--_selected-pressed-icon-color: var(--md-icon-button-selected-pressed-icon-color, var(--md-sys-color-primary, #6750a4));--_selected-pressed-state-layer-color: var(--md-icon-button-selected-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_selected-pressed-state-layer-opacity: var(--md-icon-button-selected-pressed-state-layer-opacity, 0.12);--_state-layer-height: var(--md-icon-button-state-layer-height, 40px);--_state-layer-shape: var(--md-icon-button-state-layer-shape, var(--md-sys-shape-corner-full, 9999px));--_state-layer-width: var(--md-icon-button-state-layer-width, 40px);--_focus-icon-color: var(--md-icon-button-focus-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-icon-color: var(--md-icon-button-hover-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-color: var(--md-icon-button-hover-state-layer-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-opacity: var(--md-icon-button-hover-state-layer-opacity, 0.08);--_icon-color: var(--md-icon-button-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-icon-color: var(--md-icon-button-pressed-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-state-layer-color: var(--md-icon-button-pressed-state-layer-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-state-layer-opacity: var(--md-icon-button-pressed-state-layer-opacity, 0.12);--_container-shape-start-start: 0;--_container-shape-start-end: 0;--_container-shape-end-end: 0;--_container-shape-end-start: 0;--_container-height: 0;--_container-width: 0;height:var(--_state-layer-height);width:var(--_state-layer-width)}:host([touch-target=wrapper]){margin:max(0px,(48px - var(--_state-layer-height))/2) max(0px,(48px - var(--_state-layer-width))/2)}md-focus-ring{--md-focus-ring-shape-start-start: var(--_state-layer-shape);--md-focus-ring-shape-start-end: var(--_state-layer-shape);--md-focus-ring-shape-end-end: var(--_state-layer-shape);--md-focus-ring-shape-end-start: var(--_state-layer-shape)}.standard{background-color:rgba(0,0,0,0);color:var(--_icon-color);--md-ripple-hover-color: var(--_hover-state-layer-color);--md-ripple-hover-opacity: var(--_hover-state-layer-opacity);--md-ripple-pressed-color: var(--_pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_pressed-state-layer-opacity)}.standard:hover{color:var(--_hover-icon-color)}.standard:focus{color:var(--_focus-icon-color)}.standard:active{color:var(--_pressed-icon-color)}.standard:is(:disabled,[aria-disabled=true]){color:var(--_disabled-icon-color)}md-ripple{border-radius:var(--_state-layer-shape)}.standard:is(:disabled,[aria-disabled=true]){opacity:var(--_disabled-icon-opacity)}.selected:not(:disabled,[aria-disabled=true]){color:var(--_selected-icon-color)}.selected:not(:disabled,[aria-disabled=true]):hover{color:var(--_selected-hover-icon-color)}.selected:not(:disabled,[aria-disabled=true]):focus{color:var(--_selected-focus-icon-color)}.selected:not(:disabled,[aria-disabled=true]):active{color:var(--_selected-pressed-icon-color)}.selected{--md-ripple-hover-color: var(--_selected-hover-state-layer-color);--md-ripple-hover-opacity: var(--_selected-hover-state-layer-opacity);--md-ripple-pressed-color: var(--_selected-pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_selected-pressed-state-layer-opacity)}
`;/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let ti=class extends j{getRenderClasses(){return{...super.getRenderClasses(),standard:!0}}};ti.styles=[yo,xo];ti=p([I("md-icon-button")],ti);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class E extends C{constructor(){super(...arguments),this.disabled=!1,this.error=!1,this.focused=!1,this.label="",this.noAsterisk=!1,this.populated=!1,this.required=!1,this.resizable=!1,this.supportingText="",this.errorText="",this.count=-1,this.max=-1,this.hasStart=!1,this.hasEnd=!1,this.isAnimating=!1,this.refreshErrorAlert=!1,this.disableTransitions=!1}get counterText(){const e=this.count??-1,i=this.max??-1;return e<0||i<=0?"":`${e} / ${i}`}get supportingOrErrorText(){return this.error&&this.errorText?this.errorText:this.supportingText}reannounceError(){this.refreshErrorAlert=!0}update(e){e.has("disabled")&&e.get("disabled")!==void 0&&(this.disableTransitions=!0),this.disabled&&this.focused&&(e.set("focused",!0),this.focused=!1),this.animateLabelIfNeeded({wasFocused:e.get("focused"),wasPopulated:e.get("populated")}),super.update(e)}render(){var o,n,c,h;const e=this.renderLabel(!0),i=this.renderLabel(!1),a=(o=this.renderOutline)==null?void 0:o.call(this,e),r={disabled:this.disabled,"disable-transitions":this.disableTransitions,error:this.error&&!this.disabled,focused:this.focused,"with-start":this.hasStart,"with-end":this.hasEnd,populated:this.populated,resizable:this.resizable,required:this.required,"no-label":!this.label};return s`
      <div class="field ${te(r)}">
        <div class="container-overflow">
          ${(n=this.renderBackground)==null?void 0:n.call(this)}
          <slot name="container"></slot>
          ${(c=this.renderStateLayer)==null?void 0:c.call(this)} ${(h=this.renderIndicator)==null?void 0:h.call(this)} ${a}
          <div class="container">
            <div class="start">
              <slot name="start"></slot>
            </div>
            <div class="middle">
              <div class="label-wrapper">
                ${i} ${a?l:e}
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
    `}updated(e){(e.has("supportingText")||e.has("errorText")||e.has("count")||e.has("max"))&&this.updateSlottedAriaDescribedBy(),this.refreshErrorAlert&&requestAnimationFrame(()=>{this.refreshErrorAlert=!1}),this.disableTransitions&&requestAnimationFrame(()=>{this.disableTransitions=!1})}renderSupportingText(){const{supportingOrErrorText:e,counterText:i}=this;if(!e&&!i)return l;const a=s`<span>${e}</span>`,r=i?s`<span class="counter">${i}</span>`:l,n=this.error&&this.errorText&&!this.refreshErrorAlert?"alert":l;return s`
      <div class="supporting-text" role=${n}>${a}${r}</div>
      <slot
        name="aria-describedby"
        @slotchange=${this.updateSlottedAriaDescribedBy}></slot>
    `}updateSlottedAriaDescribedBy(){for(const e of this.slottedAriaDescribedBy)Ia(s`${this.supportingOrErrorText} ${this.counterText}`,e),e.setAttribute("hidden","")}renderLabel(e){if(!this.label)return l;let i;e?i=this.focused||this.populated||this.isAnimating:i=!this.focused&&!this.populated&&!this.isAnimating;const a={hidden:!i,floating:e,resting:!e},r=`${this.label}${this.required&&!this.noAsterisk?"*":""}`;return s`
      <span class="label ${te(a)}" aria-hidden=${!i}
        >${r}</span
      >
    `}animateLabelIfNeeded({wasFocused:e,wasPopulated:i}){var o,n,c;if(!this.label)return;e??(e=this.focused),i??(i=this.populated);const a=e||i,r=this.focused||this.populated;a!==r&&(this.isAnimating=!0,(o=this.labelAnimation)==null||o.cancel(),this.labelAnimation=(n=this.floatingLabelEl)==null?void 0:n.animate(this.getLabelKeyframes(),{duration:150,easing:Le.STANDARD}),(c=this.labelAnimation)==null||c.addEventListener("finish",()=>{this.isAnimating=!1}))}getLabelKeyframes(){const{floatingLabelEl:e,restingLabelEl:i}=this;if(!e||!i)return[];const{x:a,y:r,height:o}=e.getBoundingClientRect(),{x:n,y:c,height:h}=i.getBoundingClientRect(),f=e.scrollWidth,g=i.scrollWidth,u=g/f,y=n-a,$=c-r+Math.round((h-o*u)/2),O=`translateX(${y}px) translateY(${$}px) scale(${u})`,ae="translateX(0) translateY(0) scale(1)",re=i.clientWidth,fe=g>re?`${re/u}px`:"";return this.focused||this.populated?[{transform:O,width:fe},{transform:ae,width:fe}]:[{transform:ae,width:fe},{transform:O,width:fe}]}getSurfacePositionClientRect(){return this.containerEl.getBoundingClientRect()}}p([m({type:Boolean})],E.prototype,"disabled",void 0);p([m({type:Boolean})],E.prototype,"error",void 0);p([m({type:Boolean})],E.prototype,"focused",void 0);p([m()],E.prototype,"label",void 0);p([m({type:Boolean,attribute:"no-asterisk"})],E.prototype,"noAsterisk",void 0);p([m({type:Boolean})],E.prototype,"populated",void 0);p([m({type:Boolean})],E.prototype,"required",void 0);p([m({type:Boolean})],E.prototype,"resizable",void 0);p([m({attribute:"supporting-text"})],E.prototype,"supportingText",void 0);p([m({attribute:"error-text"})],E.prototype,"errorText",void 0);p([m({type:Number})],E.prototype,"count",void 0);p([m({type:Number})],E.prototype,"max",void 0);p([m({type:Boolean,attribute:"has-start"})],E.prototype,"hasStart",void 0);p([m({type:Boolean,attribute:"has-end"})],E.prototype,"hasEnd",void 0);p([we({slot:"aria-describedby"})],E.prototype,"slottedAriaDescribedBy",void 0);p([d()],E.prototype,"isAnimating",void 0);p([d()],E.prototype,"refreshErrorAlert",void 0);p([d()],E.prototype,"disableTransitions",void 0);p([S(".label.floating")],E.prototype,"floatingLabelEl",void 0);p([S(".label.resting")],E.prototype,"restingLabelEl",void 0);p([S(".container")],E.prototype,"containerEl",void 0);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class wo extends E{renderBackground(){return s` <div class="background"></div> `}renderStateLayer(){return s` <div class="state-layer"></div> `}renderIndicator(){return s`<div class="active-indicator"></div>`}}/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const _o=_`@layer styles{:host{--_active-indicator-color: var(--md-filled-field-active-indicator-color, var(--md-sys-color-on-surface-variant, #49454f));--_active-indicator-height: var(--md-filled-field-active-indicator-height, 1px);--_bottom-space: var(--md-filled-field-bottom-space, 16px);--_container-color: var(--md-filled-field-container-color, var(--md-sys-color-surface-container-highest, #e6e0e9));--_content-color: var(--md-filled-field-content-color, var(--md-sys-color-on-surface, #1d1b20));--_content-font: var(--md-filled-field-content-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_content-line-height: var(--md-filled-field-content-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_content-size: var(--md-filled-field-content-size, var(--md-sys-typescale-body-large-size, 1rem));--_content-space: var(--md-filled-field-content-space, 16px);--_content-weight: var(--md-filled-field-content-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_disabled-active-indicator-color: var(--md-filled-field-disabled-active-indicator-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-active-indicator-height: var(--md-filled-field-disabled-active-indicator-height, 1px);--_disabled-active-indicator-opacity: var(--md-filled-field-disabled-active-indicator-opacity, 0.38);--_disabled-container-color: var(--md-filled-field-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-container-opacity: var(--md-filled-field-disabled-container-opacity, 0.04);--_disabled-content-color: var(--md-filled-field-disabled-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-content-opacity: var(--md-filled-field-disabled-content-opacity, 0.38);--_disabled-label-text-color: var(--md-filled-field-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-filled-field-disabled-label-text-opacity, 0.38);--_disabled-leading-content-color: var(--md-filled-field-disabled-leading-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-leading-content-opacity: var(--md-filled-field-disabled-leading-content-opacity, 0.38);--_disabled-supporting-text-color: var(--md-filled-field-disabled-supporting-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-supporting-text-opacity: var(--md-filled-field-disabled-supporting-text-opacity, 0.38);--_disabled-trailing-content-color: var(--md-filled-field-disabled-trailing-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-trailing-content-opacity: var(--md-filled-field-disabled-trailing-content-opacity, 0.38);--_error-active-indicator-color: var(--md-filled-field-error-active-indicator-color, var(--md-sys-color-error, #b3261e));--_error-content-color: var(--md-filled-field-error-content-color, var(--md-sys-color-on-surface, #1d1b20));--_error-focus-active-indicator-color: var(--md-filled-field-error-focus-active-indicator-color, var(--md-sys-color-error, #b3261e));--_error-focus-content-color: var(--md-filled-field-error-focus-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-focus-label-text-color: var(--md-filled-field-error-focus-label-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-leading-content-color: var(--md-filled-field-error-focus-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-focus-supporting-text-color: var(--md-filled-field-error-focus-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-trailing-content-color: var(--md-filled-field-error-focus-trailing-content-color, var(--md-sys-color-error, #b3261e));--_error-hover-active-indicator-color: var(--md-filled-field-error-hover-active-indicator-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-content-color: var(--md-filled-field-error-hover-content-color, var(--md-sys-color-on-surface, #1d1b20));--_error-hover-label-text-color: var(--md-filled-field-error-hover-label-text-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-leading-content-color: var(--md-filled-field-error-hover-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-hover-state-layer-color: var(--md-filled-field-error-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_error-hover-state-layer-opacity: var(--md-filled-field-error-hover-state-layer-opacity, 0.08);--_error-hover-supporting-text-color: var(--md-filled-field-error-hover-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-hover-trailing-content-color: var(--md-filled-field-error-hover-trailing-content-color, var(--md-sys-color-on-error-container, #410e0b));--_error-label-text-color: var(--md-filled-field-error-label-text-color, var(--md-sys-color-error, #b3261e));--_error-leading-content-color: var(--md-filled-field-error-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-supporting-text-color: var(--md-filled-field-error-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-trailing-content-color: var(--md-filled-field-error-trailing-content-color, var(--md-sys-color-error, #b3261e));--_focus-active-indicator-color: var(--md-filled-field-focus-active-indicator-color, var(--md-sys-color-primary, #6750a4));--_focus-active-indicator-height: var(--md-filled-field-focus-active-indicator-height, 3px);--_focus-content-color: var(--md-filled-field-focus-content-color, var(--md-sys-color-on-surface, #1d1b20));--_focus-label-text-color: var(--md-filled-field-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_focus-leading-content-color: var(--md-filled-field-focus-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-supporting-text-color: var(--md-filled-field-focus-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-trailing-content-color: var(--md-filled-field-focus-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-active-indicator-color: var(--md-filled-field-hover-active-indicator-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-active-indicator-height: var(--md-filled-field-hover-active-indicator-height, 1px);--_hover-content-color: var(--md-filled-field-hover-content-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-label-text-color: var(--md-filled-field-hover-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-leading-content-color: var(--md-filled-field-hover-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-color: var(--md-filled-field-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-state-layer-opacity: var(--md-filled-field-hover-state-layer-opacity, 0.08);--_hover-supporting-text-color: var(--md-filled-field-hover-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-trailing-content-color: var(--md-filled-field-hover-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-color: var(--md-filled-field-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-font: var(--md-filled-field-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-filled-field-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_label-text-populated-line-height: var(--md-filled-field-label-text-populated-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_label-text-populated-size: var(--md-filled-field-label-text-populated-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_label-text-size: var(--md-filled-field-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_label-text-weight: var(--md-filled-field-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_leading-content-color: var(--md-filled-field-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_leading-space: var(--md-filled-field-leading-space, 16px);--_supporting-text-color: var(--md-filled-field-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_supporting-text-font: var(--md-filled-field-supporting-text-font, var(--md-sys-typescale-body-small-font, var(--md-ref-typeface-plain, Roboto)));--_supporting-text-leading-space: var(--md-filled-field-supporting-text-leading-space, 16px);--_supporting-text-line-height: var(--md-filled-field-supporting-text-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_supporting-text-size: var(--md-filled-field-supporting-text-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_supporting-text-top-space: var(--md-filled-field-supporting-text-top-space, 4px);--_supporting-text-trailing-space: var(--md-filled-field-supporting-text-trailing-space, 16px);--_supporting-text-weight: var(--md-filled-field-supporting-text-weight, var(--md-sys-typescale-body-small-weight, var(--md-ref-typeface-weight-regular, 400)));--_top-space: var(--md-filled-field-top-space, 16px);--_trailing-content-color: var(--md-filled-field-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_trailing-space: var(--md-filled-field-trailing-space, 16px);--_with-label-bottom-space: var(--md-filled-field-with-label-bottom-space, 8px);--_with-label-top-space: var(--md-filled-field-with-label-top-space, 8px);--_with-leading-content-leading-space: var(--md-filled-field-with-leading-content-leading-space, 12px);--_with-trailing-content-trailing-space: var(--md-filled-field-with-trailing-content-trailing-space, 12px);--_container-shape-start-start: var(--md-filled-field-container-shape-start-start, var(--md-filled-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-start-end: var(--md-filled-field-container-shape-start-end, var(--md-filled-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-end-end: var(--md-filled-field-container-shape-end-end, var(--md-filled-field-container-shape, var(--md-sys-shape-corner-none, 0px)));--_container-shape-end-start: var(--md-filled-field-container-shape-end-start, var(--md-filled-field-container-shape, var(--md-sys-shape-corner-none, 0px)))}.background,.state-layer{border-radius:inherit;inset:0;pointer-events:none;position:absolute}.background{background:var(--_container-color)}.state-layer{visibility:hidden}.field:not(.disabled):hover .state-layer{visibility:visible}.label.floating{position:absolute;top:var(--_with-label-top-space)}.field:not(.with-start) .label-wrapper{margin-inline-start:var(--_leading-space)}.field:not(.with-end) .label-wrapper{margin-inline-end:var(--_trailing-space)}.active-indicator{inset:auto 0 0 0;pointer-events:none;position:absolute;width:100%;z-index:1}.active-indicator::before,.active-indicator::after{border-bottom:var(--_active-indicator-height) solid var(--_active-indicator-color);inset:auto 0 0 0;content:"";position:absolute;width:100%}.active-indicator::after{opacity:0;transition:opacity 150ms cubic-bezier(0.2, 0, 0, 1)}.focused .active-indicator::after{opacity:1}.field:not(.with-start) .content ::slotted(*){padding-inline-start:var(--_leading-space)}.field:not(.with-end) .content ::slotted(*){padding-inline-end:var(--_trailing-space)}.field:not(.no-label) .content ::slotted(:not(textarea)){padding-bottom:var(--_with-label-bottom-space);padding-top:calc(var(--_with-label-top-space) + var(--_label-text-populated-line-height))}.field:not(.no-label) .content ::slotted(textarea){margin-bottom:var(--_with-label-bottom-space);margin-top:calc(var(--_with-label-top-space) + var(--_label-text-populated-line-height))}:hover .active-indicator::before{border-bottom-color:var(--_hover-active-indicator-color);border-bottom-width:var(--_hover-active-indicator-height)}.active-indicator::after{border-bottom-color:var(--_focus-active-indicator-color);border-bottom-width:var(--_focus-active-indicator-height)}:hover .state-layer{background:var(--_hover-state-layer-color);opacity:var(--_hover-state-layer-opacity)}.disabled .active-indicator::before{border-bottom-color:var(--_disabled-active-indicator-color);border-bottom-width:var(--_disabled-active-indicator-height);opacity:var(--_disabled-active-indicator-opacity)}.disabled .background{background:var(--_disabled-container-color);opacity:var(--_disabled-container-opacity)}.error .active-indicator::before{border-bottom-color:var(--_error-active-indicator-color)}.error:hover .active-indicator::before{border-bottom-color:var(--_error-hover-active-indicator-color)}.error:hover .state-layer{background:var(--_error-hover-state-layer-color);opacity:var(--_error-hover-state-layer-opacity)}.error .active-indicator::after{border-bottom-color:var(--_error-focus-active-indicator-color)}.resizable .container{bottom:var(--_focus-active-indicator-height);clip-path:inset(var(--_focus-active-indicator-height) 0 0 0)}.resizable .container>*{top:var(--_focus-active-indicator-height)}}@layer hcm{@media(forced-colors: active){.disabled .active-indicator::before{border-color:GrayText;opacity:1}}}
`;/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Da=_`:host{display:inline-flex;resize:both}.field{display:flex;flex:1;flex-direction:column;writing-mode:horizontal-tb;max-width:100%}.container-overflow{border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-end-radius:var(--_container-shape-end-end);border-end-start-radius:var(--_container-shape-end-start);display:flex;height:100%;position:relative}.container{align-items:center;border-radius:inherit;display:flex;flex:1;max-height:100%;min-height:100%;min-width:min-content;position:relative}.field,.container-overflow{resize:inherit}.resizable:not(.disabled) .container{resize:inherit;overflow:hidden}.disabled{pointer-events:none}slot[name=container]{border-radius:inherit}slot[name=container]::slotted(*){border-radius:inherit;inset:0;pointer-events:none;position:absolute}@layer styles{.start,.middle,.end{display:flex;box-sizing:border-box;height:100%;position:relative}.start{color:var(--_leading-content-color)}.end{color:var(--_trailing-content-color)}.start,.end{align-items:center;justify-content:center}.with-start .start{margin-inline:var(--_with-leading-content-leading-space) var(--_content-space)}.with-end .end{margin-inline:var(--_content-space) var(--_with-trailing-content-trailing-space)}.middle{align-items:stretch;align-self:baseline;flex:1}.content{color:var(--_content-color);display:flex;flex:1;opacity:0;transition:opacity 83ms cubic-bezier(0.2, 0, 0, 1)}.no-label .content,.focused .content,.populated .content{opacity:1;transition-delay:67ms}:is(.disabled,.disable-transitions) .content{transition:none}.content ::slotted(*){all:unset;color:currentColor;font-family:var(--_content-font);font-size:var(--_content-size);line-height:var(--_content-line-height);font-weight:var(--_content-weight);width:100%;overflow-wrap:revert;white-space:revert}.content ::slotted(:not(textarea)){padding-top:var(--_top-space);padding-bottom:var(--_bottom-space)}.content ::slotted(textarea){margin-top:var(--_top-space);margin-bottom:var(--_bottom-space)}:hover .content{color:var(--_hover-content-color)}:hover .start{color:var(--_hover-leading-content-color)}:hover .end{color:var(--_hover-trailing-content-color)}.focused .content{color:var(--_focus-content-color)}.focused .start{color:var(--_focus-leading-content-color)}.focused .end{color:var(--_focus-trailing-content-color)}.disabled .content{color:var(--_disabled-content-color)}.disabled.no-label .content,.disabled.focused .content,.disabled.populated .content{opacity:var(--_disabled-content-opacity)}.disabled .start{color:var(--_disabled-leading-content-color);opacity:var(--_disabled-leading-content-opacity)}.disabled .end{color:var(--_disabled-trailing-content-color);opacity:var(--_disabled-trailing-content-opacity)}.error .content{color:var(--_error-content-color)}.error .start{color:var(--_error-leading-content-color)}.error .end{color:var(--_error-trailing-content-color)}.error:hover .content{color:var(--_error-hover-content-color)}.error:hover .start{color:var(--_error-hover-leading-content-color)}.error:hover .end{color:var(--_error-hover-trailing-content-color)}.error.focused .content{color:var(--_error-focus-content-color)}.error.focused .start{color:var(--_error-focus-leading-content-color)}.error.focused .end{color:var(--_error-focus-trailing-content-color)}}@layer hcm{@media(forced-colors: active){.disabled :is(.start,.content,.end){color:GrayText;opacity:1}}}@layer styles{.label{box-sizing:border-box;color:var(--_label-text-color);overflow:hidden;max-width:100%;text-overflow:ellipsis;white-space:nowrap;z-index:1;font-family:var(--_label-text-font);font-size:var(--_label-text-size);line-height:var(--_label-text-line-height);font-weight:var(--_label-text-weight);width:min-content}.label-wrapper{inset:0;pointer-events:none;position:absolute}.label.resting{position:absolute;top:var(--_top-space)}.label.floating{font-size:var(--_label-text-populated-size);line-height:var(--_label-text-populated-line-height);transform-origin:top left}.label.hidden{opacity:0}.no-label .label{display:none}.label-wrapper{inset:0;position:absolute;text-align:initial}:hover .label{color:var(--_hover-label-text-color)}.focused .label{color:var(--_focus-label-text-color)}.disabled .label{color:var(--_disabled-label-text-color)}.disabled .label:not(.hidden){opacity:var(--_disabled-label-text-opacity)}.error .label{color:var(--_error-label-text-color)}.error:hover .label{color:var(--_error-hover-label-text-color)}.error.focused .label{color:var(--_error-focus-label-text-color)}}@layer hcm{@media(forced-colors: active){.disabled .label:not(.hidden){color:GrayText;opacity:1}}}@layer styles{.supporting-text{color:var(--_supporting-text-color);display:flex;font-family:var(--_supporting-text-font);font-size:var(--_supporting-text-size);line-height:var(--_supporting-text-line-height);font-weight:var(--_supporting-text-weight);gap:16px;justify-content:space-between;padding-inline-start:var(--_supporting-text-leading-space);padding-inline-end:var(--_supporting-text-trailing-space);padding-top:var(--_supporting-text-top-space)}.supporting-text :nth-child(2){flex-shrink:0}:hover .supporting-text{color:var(--_hover-supporting-text-color)}.focus .supporting-text{color:var(--_focus-supporting-text-color)}.disabled .supporting-text{color:var(--_disabled-supporting-text-color);opacity:var(--_disabled-supporting-text-opacity)}.error .supporting-text{color:var(--_error-supporting-text-color)}.error:hover .supporting-text{color:var(--_error-hover-supporting-text-color)}.error.focus .supporting-text{color:var(--_error-focus-supporting-text-color)}}@layer hcm{@media(forced-colors: active){.disabled .supporting-text{color:GrayText;opacity:1}}}
`;/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let ii=class extends wo{};ii.styles=[Da,_o];ii=p([I("md-filled-field")],ii);/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const $o=_`:host{--_active-indicator-color: var(--md-filled-text-field-active-indicator-color, var(--md-sys-color-on-surface-variant, #49454f));--_active-indicator-height: var(--md-filled-text-field-active-indicator-height, 1px);--_caret-color: var(--md-filled-text-field-caret-color, var(--md-sys-color-primary, #6750a4));--_container-color: var(--md-filled-text-field-container-color, var(--md-sys-color-surface-container-highest, #e6e0e9));--_disabled-active-indicator-color: var(--md-filled-text-field-disabled-active-indicator-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-active-indicator-height: var(--md-filled-text-field-disabled-active-indicator-height, 1px);--_disabled-active-indicator-opacity: var(--md-filled-text-field-disabled-active-indicator-opacity, 0.38);--_disabled-container-color: var(--md-filled-text-field-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-container-opacity: var(--md-filled-text-field-disabled-container-opacity, 0.04);--_disabled-input-text-color: var(--md-filled-text-field-disabled-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-input-text-opacity: var(--md-filled-text-field-disabled-input-text-opacity, 0.38);--_disabled-label-text-color: var(--md-filled-text-field-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-filled-text-field-disabled-label-text-opacity, 0.38);--_disabled-leading-icon-color: var(--md-filled-text-field-disabled-leading-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-leading-icon-opacity: var(--md-filled-text-field-disabled-leading-icon-opacity, 0.38);--_disabled-supporting-text-color: var(--md-filled-text-field-disabled-supporting-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-supporting-text-opacity: var(--md-filled-text-field-disabled-supporting-text-opacity, 0.38);--_disabled-trailing-icon-color: var(--md-filled-text-field-disabled-trailing-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-trailing-icon-opacity: var(--md-filled-text-field-disabled-trailing-icon-opacity, 0.38);--_error-active-indicator-color: var(--md-filled-text-field-error-active-indicator-color, var(--md-sys-color-error, #b3261e));--_error-focus-active-indicator-color: var(--md-filled-text-field-error-focus-active-indicator-color, var(--md-sys-color-error, #b3261e));--_error-focus-caret-color: var(--md-filled-text-field-error-focus-caret-color, var(--md-sys-color-error, #b3261e));--_error-focus-input-text-color: var(--md-filled-text-field-error-focus-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_error-focus-label-text-color: var(--md-filled-text-field-error-focus-label-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-leading-icon-color: var(--md-filled-text-field-error-focus-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-focus-supporting-text-color: var(--md-filled-text-field-error-focus-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-trailing-icon-color: var(--md-filled-text-field-error-focus-trailing-icon-color, var(--md-sys-color-error, #b3261e));--_error-hover-active-indicator-color: var(--md-filled-text-field-error-hover-active-indicator-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-input-text-color: var(--md-filled-text-field-error-hover-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_error-hover-label-text-color: var(--md-filled-text-field-error-hover-label-text-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-leading-icon-color: var(--md-filled-text-field-error-hover-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-hover-state-layer-color: var(--md-filled-text-field-error-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_error-hover-state-layer-opacity: var(--md-filled-text-field-error-hover-state-layer-opacity, 0.08);--_error-hover-supporting-text-color: var(--md-filled-text-field-error-hover-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-hover-trailing-icon-color: var(--md-filled-text-field-error-hover-trailing-icon-color, var(--md-sys-color-on-error-container, #410e0b));--_error-input-text-color: var(--md-filled-text-field-error-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_error-label-text-color: var(--md-filled-text-field-error-label-text-color, var(--md-sys-color-error, #b3261e));--_error-leading-icon-color: var(--md-filled-text-field-error-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-supporting-text-color: var(--md-filled-text-field-error-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-trailing-icon-color: var(--md-filled-text-field-error-trailing-icon-color, var(--md-sys-color-error, #b3261e));--_focus-active-indicator-color: var(--md-filled-text-field-focus-active-indicator-color, var(--md-sys-color-primary, #6750a4));--_focus-active-indicator-height: var(--md-filled-text-field-focus-active-indicator-height, 3px);--_focus-input-text-color: var(--md-filled-text-field-focus-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_focus-label-text-color: var(--md-filled-text-field-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_focus-leading-icon-color: var(--md-filled-text-field-focus-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-supporting-text-color: var(--md-filled-text-field-focus-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-trailing-icon-color: var(--md-filled-text-field-focus-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-active-indicator-color: var(--md-filled-text-field-hover-active-indicator-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-active-indicator-height: var(--md-filled-text-field-hover-active-indicator-height, 1px);--_hover-input-text-color: var(--md-filled-text-field-hover-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-label-text-color: var(--md-filled-text-field-hover-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-leading-icon-color: var(--md-filled-text-field-hover-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-color: var(--md-filled-text-field-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-state-layer-opacity: var(--md-filled-text-field-hover-state-layer-opacity, 0.08);--_hover-supporting-text-color: var(--md-filled-text-field-hover-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-trailing-icon-color: var(--md-filled-text-field-hover-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-color: var(--md-filled-text-field-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_input-text-font: var(--md-filled-text-field-input-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_input-text-line-height: var(--md-filled-text-field-input-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_input-text-placeholder-color: var(--md-filled-text-field-input-text-placeholder-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-prefix-color: var(--md-filled-text-field-input-text-prefix-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-size: var(--md-filled-text-field-input-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_input-text-suffix-color: var(--md-filled-text-field-input-text-suffix-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-weight: var(--md-filled-text-field-input-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_label-text-color: var(--md-filled-text-field-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-font: var(--md-filled-text-field-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-filled-text-field-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_label-text-populated-line-height: var(--md-filled-text-field-label-text-populated-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_label-text-populated-size: var(--md-filled-text-field-label-text-populated-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_label-text-size: var(--md-filled-text-field-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_label-text-weight: var(--md-filled-text-field-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_leading-icon-color: var(--md-filled-text-field-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_leading-icon-size: var(--md-filled-text-field-leading-icon-size, 24px);--_supporting-text-color: var(--md-filled-text-field-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_supporting-text-font: var(--md-filled-text-field-supporting-text-font, var(--md-sys-typescale-body-small-font, var(--md-ref-typeface-plain, Roboto)));--_supporting-text-line-height: var(--md-filled-text-field-supporting-text-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_supporting-text-size: var(--md-filled-text-field-supporting-text-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_supporting-text-weight: var(--md-filled-text-field-supporting-text-weight, var(--md-sys-typescale-body-small-weight, var(--md-ref-typeface-weight-regular, 400)));--_trailing-icon-color: var(--md-filled-text-field-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_trailing-icon-size: var(--md-filled-text-field-trailing-icon-size, 24px);--_container-shape-start-start: var(--md-filled-text-field-container-shape-start-start, var(--md-filled-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-start-end: var(--md-filled-text-field-container-shape-start-end, var(--md-filled-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-end-end: var(--md-filled-text-field-container-shape-end-end, var(--md-filled-text-field-container-shape, var(--md-sys-shape-corner-none, 0px)));--_container-shape-end-start: var(--md-filled-text-field-container-shape-end-start, var(--md-filled-text-field-container-shape, var(--md-sys-shape-corner-none, 0px)));--_icon-input-space: var(--md-filled-text-field-icon-input-space, 16px);--_leading-space: var(--md-filled-text-field-leading-space, 16px);--_trailing-space: var(--md-filled-text-field-trailing-space, 16px);--_top-space: var(--md-filled-text-field-top-space, 16px);--_bottom-space: var(--md-filled-text-field-bottom-space, 16px);--_input-text-prefix-trailing-space: var(--md-filled-text-field-input-text-prefix-trailing-space, 2px);--_input-text-suffix-leading-space: var(--md-filled-text-field-input-text-suffix-leading-space, 2px);--_with-label-top-space: var(--md-filled-text-field-with-label-top-space, 8px);--_with-label-bottom-space: var(--md-filled-text-field-with-label-bottom-space, 8px);--_focus-caret-color: var(--md-filled-text-field-focus-caret-color, var(--md-sys-color-primary, #6750a4));--_with-leading-icon-leading-space: var(--md-filled-text-field-with-leading-icon-leading-space, 12px);--_with-trailing-icon-trailing-space: var(--md-filled-text-field-with-trailing-icon-trailing-space, 12px);--md-filled-field-active-indicator-color: var(--_active-indicator-color);--md-filled-field-active-indicator-height: var(--_active-indicator-height);--md-filled-field-bottom-space: var(--_bottom-space);--md-filled-field-container-color: var(--_container-color);--md-filled-field-container-shape-end-end: var(--_container-shape-end-end);--md-filled-field-container-shape-end-start: var(--_container-shape-end-start);--md-filled-field-container-shape-start-end: var(--_container-shape-start-end);--md-filled-field-container-shape-start-start: var(--_container-shape-start-start);--md-filled-field-content-color: var(--_input-text-color);--md-filled-field-content-font: var(--_input-text-font);--md-filled-field-content-line-height: var(--_input-text-line-height);--md-filled-field-content-size: var(--_input-text-size);--md-filled-field-content-space: var(--_icon-input-space);--md-filled-field-content-weight: var(--_input-text-weight);--md-filled-field-disabled-active-indicator-color: var(--_disabled-active-indicator-color);--md-filled-field-disabled-active-indicator-height: var(--_disabled-active-indicator-height);--md-filled-field-disabled-active-indicator-opacity: var(--_disabled-active-indicator-opacity);--md-filled-field-disabled-container-color: var(--_disabled-container-color);--md-filled-field-disabled-container-opacity: var(--_disabled-container-opacity);--md-filled-field-disabled-content-color: var(--_disabled-input-text-color);--md-filled-field-disabled-content-opacity: var(--_disabled-input-text-opacity);--md-filled-field-disabled-label-text-color: var(--_disabled-label-text-color);--md-filled-field-disabled-label-text-opacity: var(--_disabled-label-text-opacity);--md-filled-field-disabled-leading-content-color: var(--_disabled-leading-icon-color);--md-filled-field-disabled-leading-content-opacity: var(--_disabled-leading-icon-opacity);--md-filled-field-disabled-supporting-text-color: var(--_disabled-supporting-text-color);--md-filled-field-disabled-supporting-text-opacity: var(--_disabled-supporting-text-opacity);--md-filled-field-disabled-trailing-content-color: var(--_disabled-trailing-icon-color);--md-filled-field-disabled-trailing-content-opacity: var(--_disabled-trailing-icon-opacity);--md-filled-field-error-active-indicator-color: var(--_error-active-indicator-color);--md-filled-field-error-content-color: var(--_error-input-text-color);--md-filled-field-error-focus-active-indicator-color: var(--_error-focus-active-indicator-color);--md-filled-field-error-focus-content-color: var(--_error-focus-input-text-color);--md-filled-field-error-focus-label-text-color: var(--_error-focus-label-text-color);--md-filled-field-error-focus-leading-content-color: var(--_error-focus-leading-icon-color);--md-filled-field-error-focus-supporting-text-color: var(--_error-focus-supporting-text-color);--md-filled-field-error-focus-trailing-content-color: var(--_error-focus-trailing-icon-color);--md-filled-field-error-hover-active-indicator-color: var(--_error-hover-active-indicator-color);--md-filled-field-error-hover-content-color: var(--_error-hover-input-text-color);--md-filled-field-error-hover-label-text-color: var(--_error-hover-label-text-color);--md-filled-field-error-hover-leading-content-color: var(--_error-hover-leading-icon-color);--md-filled-field-error-hover-state-layer-color: var(--_error-hover-state-layer-color);--md-filled-field-error-hover-state-layer-opacity: var(--_error-hover-state-layer-opacity);--md-filled-field-error-hover-supporting-text-color: var(--_error-hover-supporting-text-color);--md-filled-field-error-hover-trailing-content-color: var(--_error-hover-trailing-icon-color);--md-filled-field-error-label-text-color: var(--_error-label-text-color);--md-filled-field-error-leading-content-color: var(--_error-leading-icon-color);--md-filled-field-error-supporting-text-color: var(--_error-supporting-text-color);--md-filled-field-error-trailing-content-color: var(--_error-trailing-icon-color);--md-filled-field-focus-active-indicator-color: var(--_focus-active-indicator-color);--md-filled-field-focus-active-indicator-height: var(--_focus-active-indicator-height);--md-filled-field-focus-content-color: var(--_focus-input-text-color);--md-filled-field-focus-label-text-color: var(--_focus-label-text-color);--md-filled-field-focus-leading-content-color: var(--_focus-leading-icon-color);--md-filled-field-focus-supporting-text-color: var(--_focus-supporting-text-color);--md-filled-field-focus-trailing-content-color: var(--_focus-trailing-icon-color);--md-filled-field-hover-active-indicator-color: var(--_hover-active-indicator-color);--md-filled-field-hover-active-indicator-height: var(--_hover-active-indicator-height);--md-filled-field-hover-content-color: var(--_hover-input-text-color);--md-filled-field-hover-label-text-color: var(--_hover-label-text-color);--md-filled-field-hover-leading-content-color: var(--_hover-leading-icon-color);--md-filled-field-hover-state-layer-color: var(--_hover-state-layer-color);--md-filled-field-hover-state-layer-opacity: var(--_hover-state-layer-opacity);--md-filled-field-hover-supporting-text-color: var(--_hover-supporting-text-color);--md-filled-field-hover-trailing-content-color: var(--_hover-trailing-icon-color);--md-filled-field-label-text-color: var(--_label-text-color);--md-filled-field-label-text-font: var(--_label-text-font);--md-filled-field-label-text-line-height: var(--_label-text-line-height);--md-filled-field-label-text-populated-line-height: var(--_label-text-populated-line-height);--md-filled-field-label-text-populated-size: var(--_label-text-populated-size);--md-filled-field-label-text-size: var(--_label-text-size);--md-filled-field-label-text-weight: var(--_label-text-weight);--md-filled-field-leading-content-color: var(--_leading-icon-color);--md-filled-field-leading-space: var(--_leading-space);--md-filled-field-supporting-text-color: var(--_supporting-text-color);--md-filled-field-supporting-text-font: var(--_supporting-text-font);--md-filled-field-supporting-text-line-height: var(--_supporting-text-line-height);--md-filled-field-supporting-text-size: var(--_supporting-text-size);--md-filled-field-supporting-text-weight: var(--_supporting-text-weight);--md-filled-field-top-space: var(--_top-space);--md-filled-field-trailing-content-color: var(--_trailing-icon-color);--md-filled-field-trailing-space: var(--_trailing-space);--md-filled-field-with-label-bottom-space: var(--_with-label-bottom-space);--md-filled-field-with-label-top-space: var(--_with-label-top-space);--md-filled-field-with-leading-content-leading-space: var(--_with-leading-icon-leading-space);--md-filled-field-with-trailing-content-trailing-space: var(--_with-trailing-icon-trailing-space)}
`;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ko=t=>t.strings===void 0,Co={},Io=(t,e=Co)=>t._$AH=e;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const oa=Ai(class extends Ei{constructor(t){if(super(t),t.type!==ge.PROPERTY&&t.type!==ge.ATTRIBUTE&&t.type!==ge.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!ko(t))throw Error("`live` bindings can only contain a single expression")}render(t){return t}update(t,[e]){if(e===ee||e===l)return e;const i=t.element,a=t.name;if(t.type===ge.PROPERTY){if(e===i[a])return ee}else if(t.type===ge.BOOLEAN_ATTRIBUTE){if(!!e===i.hasAttribute(a))return ee}else if(t.type===ge.ATTRIBUTE&&i.getAttribute(a)===e+"")return ee;return Io(t),e}});/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Oa="important",To=" !"+Oa,sa=Ai(class extends Ei{constructor(t){var e;if(super(t),t.type!==ge.ATTRIBUTE||t.name!=="style"||((e=t.strings)==null?void 0:e.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,i)=>{const a=t[i];return a==null?e:e+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${a};`},"")}update(t,[e]){const{style:i}=t.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(e)),this.render(e);for(const a of this.ft)e[a]==null&&(this.ft.delete(a),a.includes("-")?i.removeProperty(a):i[a]=null);for(const a in e){const r=e[a];if(r!=null){this.ft.add(a);const o=typeof r=="string"&&r.endsWith(To);a.includes("-")||o?i.setProperty(a,o?r.slice(0,-11):r,o?Oa:""):i[a]=r}}return ee}});/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const So={fromAttribute(t){return t??""},toAttribute(t){return t||null}};/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function Pi(t,e){e.bubbles&&(!t.shadowRoot||e.composed)&&e.stopPropagation();const i=Reflect.construct(e.constructor,[e.type,e]),a=t.dispatchEvent(i);return a||e.preventDefault(),a}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const ai=Symbol("createValidator"),ri=Symbol("getValidityAnchor"),Nt=Symbol("privateValidator"),le=Symbol("privateSyncValidity"),ot=Symbol("privateCustomValidationMessage");function zo(t){var e;class i extends t{constructor(){super(...arguments),this[e]=""}get validity(){return this[le](),this[q].validity}get validationMessage(){return this[le](),this[q].validationMessage}get willValidate(){return this[le](),this[q].willValidate}checkValidity(){return this[le](),this[q].checkValidity()}reportValidity(){return this[le](),this[q].reportValidity()}setCustomValidity(r){this[ot]=r,this[le]()}requestUpdate(r,o,n){super.requestUpdate(r,o,n),this[le]()}firstUpdated(r){super.firstUpdated(r),this[le]()}[(e=ot,le)](){this[Nt]||(this[Nt]=this[ai]());const{validity:r,validationMessage:o}=this[Nt].getValidity(),n=!!this[ot],c=this[ot]||o;this[q].setValidity({...r,customError:n},c,this[ri]()??void 0)}[ai](){throw new Error("Implement [createValidator]")}[ri](){throw new Error("Implement [getValidityAnchor]")}}return i}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const wt=Symbol("getFormValue"),na=Symbol("getFormState");function Ao(t){class e extends t{get form(){return this[q].form}get labels(){return this[q].labels}get name(){return this.getAttribute("name")??""}set name(a){this.setAttribute("name",a)}get disabled(){return this.hasAttribute("disabled")}set disabled(a){this.toggleAttribute("disabled",a)}attributeChangedCallback(a,r,o){if(a==="name"||a==="disabled"){const n=a==="disabled"?r!==null:r;this.requestUpdate(a,n);return}super.attributeChangedCallback(a,r,o)}requestUpdate(a,r,o){super.requestUpdate(a,r,o),this[q].setFormValue(this[wt](),this[na]())}[wt](){throw new Error("Implement [getFormValue]")}[na](){return this[wt]()}formDisabledCallback(a){this.disabled=a}}return e.formAssociated=!0,p([m({noAccessor:!0})],e.prototype,"name",null),p([m({type:Boolean,noAccessor:!0})],e.prototype,"disabled",null),e}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const oi=Symbol("onReportValidity"),st=Symbol("privateCleanupFormListeners"),nt=Symbol("privateDoNotReportInvalid"),lt=Symbol("privateIsSelfReportingValidity"),dt=Symbol("privateCallOnReportValidity");function Eo(t){var e,i,a;class r extends t{constructor(...n){super(...n),this[e]=new AbortController,this[i]=!1,this[a]=!1,this.addEventListener("invalid",c=>{this[nt]||!c.isTrusted||this.addEventListener("invalid",()=>{this[dt](c)},{once:!0})},{capture:!0})}checkValidity(){this[nt]=!0;const n=super.checkValidity();return this[nt]=!1,n}reportValidity(){this[lt]=!0;const n=super.reportValidity();return n&&this[dt](null),this[lt]=!1,n}[(e=st,i=nt,a=lt,dt)](n){const c=n==null?void 0:n.defaultPrevented;c||(this[oi](n),!(!c&&(n==null?void 0:n.defaultPrevented)))||(this[lt]||Oo(this[q].form,this))&&this.focus()}[oi](n){throw new Error("Implement [onReportValidity]")}formAssociatedCallback(n){super.formAssociatedCallback&&super.formAssociatedCallback(n),this[st].abort(),n&&(this[st]=new AbortController,Lo(this,n,()=>{this[dt](null)},this[st].signal))}}return r}function Lo(t,e,i,a){const r=Do(e);let o=!1,n,c=!1;r.addEventListener("before",()=>{c=!0,n=new AbortController,o=!1,t.addEventListener("invalid",()=>{o=!0},{signal:n.signal})},{signal:a}),r.addEventListener("after",()=>{c=!1,n==null||n.abort(),!o&&i()},{signal:a}),e.addEventListener("submit",()=>{c||i()},{signal:a})}const Bt=new WeakMap;function Do(t){if(!Bt.has(t)){const e=new EventTarget;Bt.set(t,e);for(const i of["reportValidity","requestSubmit"]){const a=t[i];t[i]=function(){e.dispatchEvent(new Event("before"));const r=Reflect.apply(a,this,arguments);return e.dispatchEvent(new Event("after")),r}}}return Bt.get(t)}function Oo(t,e){if(!t)return!0;let i;for(const a of t.elements)if(a.matches(":invalid")){i=a;break}return i===e}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Po{constructor(e){this.getCurrentState=e,this.currentValidity={validity:{},validationMessage:""}}getValidity(){const e=this.getCurrentState();if(!(!this.prevState||!this.equals(this.prevState,e)))return this.currentValidity;const{validity:a,validationMessage:r}=this.computeValidity(e);return this.prevState=this.copy(e),this.currentValidity={validationMessage:r,validity:{badInput:a.badInput,customError:a.customError,patternMismatch:a.patternMismatch,rangeOverflow:a.rangeOverflow,rangeUnderflow:a.rangeUnderflow,stepMismatch:a.stepMismatch,tooLong:a.tooLong,tooShort:a.tooShort,typeMismatch:a.typeMismatch,valueMissing:a.valueMissing}},this.currentValidity}}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Mo extends Po{computeValidity({state:e,renderedControl:i}){let a=i;Ue(e)&&!a?(a=this.inputControl||document.createElement("input"),this.inputControl=a):a||(a=this.textAreaControl||document.createElement("textarea"),this.textAreaControl=a);const r=Ue(e)?a:null;if(r&&(r.type=e.type),a.value!==e.value&&(a.value=e.value),a.required=e.required,r){const o=e;o.pattern?r.pattern=o.pattern:r.removeAttribute("pattern"),o.min?r.min=o.min:r.removeAttribute("min"),o.max?r.max=o.max:r.removeAttribute("max"),o.step?r.step=o.step:r.removeAttribute("step")}return(e.minLength??-1)>-1?a.setAttribute("minlength",String(e.minLength)):a.removeAttribute("minlength"),(e.maxLength??-1)>-1?a.setAttribute("maxlength",String(e.maxLength)):a.removeAttribute("maxlength"),{validity:a.validity,validationMessage:a.validationMessage}}equals({state:e},{state:i}){const a=e.type===i.type&&e.value===i.value&&e.required===i.required&&e.minLength===i.minLength&&e.maxLength===i.maxLength;return!Ue(e)||!Ue(i)?a:a&&e.pattern===i.pattern&&e.min===i.min&&e.max===i.max&&e.step===i.step}copy({state:e}){return{state:Ue(e)?this.copyInput(e):this.copyTextArea(e),renderedControl:null}}copyInput(e){const{type:i,pattern:a,min:r,max:o,step:n}=e;return{...this.copySharedState(e),type:i,pattern:a,min:r,max:o,step:n}}copyTextArea(e){return{...this.copySharedState(e),type:e.type}}copySharedState({value:e,required:i,minLength:a,maxLength:r}){return{value:e,required:i,minLength:a,maxLength:r}}}function Ue(t){return t.type!=="textarea"}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Ro=_e(Eo(zo(Ao(Li(C)))));class k extends Ro{constructor(){super(...arguments),this.error=!1,this.errorText="",this.label="",this.noAsterisk=!1,this.required=!1,this.value="",this.prefixText="",this.suffixText="",this.hasLeadingIcon=!1,this.hasTrailingIcon=!1,this.supportingText="",this.textDirection="",this.rows=2,this.cols=20,this.inputMode="",this.max="",this.maxLength=-1,this.min="",this.minLength=-1,this.noSpinner=!1,this.pattern="",this.placeholder="",this.readOnly=!1,this.multiple=!1,this.step="",this.type="text",this.autocomplete="",this.dirty=!1,this.focused=!1,this.nativeError=!1,this.nativeErrorText=""}get selectionDirection(){return this.getInputOrTextarea().selectionDirection}set selectionDirection(e){this.getInputOrTextarea().selectionDirection=e}get selectionEnd(){return this.getInputOrTextarea().selectionEnd}set selectionEnd(e){this.getInputOrTextarea().selectionEnd=e}get selectionStart(){return this.getInputOrTextarea().selectionStart}set selectionStart(e){this.getInputOrTextarea().selectionStart=e}get valueAsNumber(){const e=this.getInput();return e?e.valueAsNumber:NaN}set valueAsNumber(e){const i=this.getInput();i&&(i.valueAsNumber=e,this.value=i.value)}get valueAsDate(){const e=this.getInput();return e?e.valueAsDate:null}set valueAsDate(e){const i=this.getInput();i&&(i.valueAsDate=e,this.value=i.value)}get hasError(){return this.error||this.nativeError}select(){this.getInputOrTextarea().select()}setRangeText(...e){this.getInputOrTextarea().setRangeText(...e),this.value=this.getInputOrTextarea().value}setSelectionRange(e,i,a){this.getInputOrTextarea().setSelectionRange(e,i,a)}showPicker(){const e=this.getInput();e&&e.showPicker()}stepDown(e){const i=this.getInput();i&&(i.stepDown(e),this.value=i.value)}stepUp(e){const i=this.getInput();i&&(i.stepUp(e),this.value=i.value)}reset(){this.dirty=!1,this.value=this.getAttribute("value")??"",this.nativeError=!1,this.nativeErrorText=""}attributeChangedCallback(e,i,a){e==="value"&&this.dirty||super.attributeChangedCallback(e,i,a)}render(){const e={disabled:this.disabled,error:!this.disabled&&this.hasError,textarea:this.type==="textarea","no-spinner":this.noSpinner};return s`
      <span class="text-field ${te(e)}">
        ${this.renderField()}
      </span>
    `}updated(e){const i=this.getInputOrTextarea().value;this.value!==i&&(this.value=i)}renderField(){return Oi`<${this.fieldTag}
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
    </${this.fieldTag}>`}renderLeadingIcon(){return s`
      <span class="icon leading" slot="start">
        <slot name="leading-icon" @slotchange=${this.handleIconChange}></slot>
      </span>
    `}renderTrailingIcon(){return s`
      <span class="icon trailing" slot="end">
        <slot name="trailing-icon" @slotchange=${this.handleIconChange}></slot>
      </span>
    `}renderInputOrTextarea(){const e={direction:this.textDirection},i=this.ariaLabel||this.label||l,a=this.autocomplete,r=(this.maxLength??-1)>-1,o=(this.minLength??-1)>-1;if(this.type==="textarea")return s`
        <textarea
          class="input"
          style=${sa(e)}
          aria-describedby="description"
          aria-invalid=${this.hasError}
          aria-label=${i}
          autocomplete=${a||l}
          name=${this.name||l}
          ?disabled=${this.disabled}
          maxlength=${r?this.maxLength:l}
          minlength=${o?this.minLength:l}
          placeholder=${this.placeholder||l}
          ?readonly=${this.readOnly}
          ?required=${this.required}
          rows=${this.rows}
          cols=${this.cols}
          .value=${oa(this.value)}
          @change=${this.redispatchEvent}
          @focus=${this.handleFocusChange}
          @blur=${this.handleFocusChange}
          @input=${this.handleInput}
          @select=${this.redispatchEvent}></textarea>
      `;const n=this.renderPrefix(),c=this.renderSuffix(),h=this.inputMode;return s`
      <div class="input-wrapper">
        ${n}
        <input
          class="input"
          style=${sa(e)}
          aria-describedby="description"
          aria-invalid=${this.hasError}
          aria-label=${i}
          autocomplete=${a||l}
          name=${this.name||l}
          ?disabled=${this.disabled}
          inputmode=${h||l}
          max=${this.max||l}
          maxlength=${r?this.maxLength:l}
          min=${this.min||l}
          minlength=${o?this.minLength:l}
          pattern=${this.pattern||l}
          placeholder=${this.placeholder||l}
          ?readonly=${this.readOnly}
          ?required=${this.required}
          ?multiple=${this.multiple}
          step=${this.step||l}
          type=${this.type}
          .value=${oa(this.value)}
          @change=${this.redispatchEvent}
          @focus=${this.handleFocusChange}
          @blur=${this.handleFocusChange}
          @input=${this.handleInput}
          @select=${this.redispatchEvent} />
        ${c}
      </div>
    `}renderPrefix(){return this.renderAffix(this.prefixText,!1)}renderSuffix(){return this.renderAffix(this.suffixText,!0)}renderAffix(e,i){return e?s`<span class="${te({suffix:i,prefix:!i})}">${e}</span>`:l}getErrorText(){return this.error?this.errorText:this.nativeErrorText}handleFocusChange(){var e;this.focused=((e=this.inputOrTextarea)==null?void 0:e.matches(":focus"))??!1}handleInput(e){this.dirty=!0,this.value=e.target.value}redispatchEvent(e){Pi(this,e)}getInputOrTextarea(){return this.inputOrTextarea||(this.connectedCallback(),this.scheduleUpdate()),this.isUpdatePending&&this.scheduleUpdate(),this.inputOrTextarea}getInput(){return this.type==="textarea"?null:this.getInputOrTextarea()}handleIconChange(){this.hasLeadingIcon=this.leadingIcons.length>0,this.hasTrailingIcon=this.trailingIcons.length>0}[wt](){return this.value}formResetCallback(){this.reset()}formStateRestoreCallback(e){this.value=e}focus(){this.getInputOrTextarea().focus()}[ai](){return new Mo(()=>({state:this,renderedControl:this.inputOrTextarea}))}[ri](){return this.inputOrTextarea}[oi](e){var a;e==null||e.preventDefault();const i=this.getErrorText();this.nativeError=!!e,this.nativeErrorText=this.validationMessage,i===this.getErrorText()&&((a=this.field)==null||a.reannounceError())}}k.shadowRootOptions={...C.shadowRootOptions,delegatesFocus:!0};p([m({type:Boolean,reflect:!0})],k.prototype,"error",void 0);p([m({attribute:"error-text"})],k.prototype,"errorText",void 0);p([m()],k.prototype,"label",void 0);p([m({type:Boolean,attribute:"no-asterisk"})],k.prototype,"noAsterisk",void 0);p([m({type:Boolean,reflect:!0})],k.prototype,"required",void 0);p([m()],k.prototype,"value",void 0);p([m({attribute:"prefix-text"})],k.prototype,"prefixText",void 0);p([m({attribute:"suffix-text"})],k.prototype,"suffixText",void 0);p([m({type:Boolean,attribute:"has-leading-icon"})],k.prototype,"hasLeadingIcon",void 0);p([m({type:Boolean,attribute:"has-trailing-icon"})],k.prototype,"hasTrailingIcon",void 0);p([m({attribute:"supporting-text"})],k.prototype,"supportingText",void 0);p([m({attribute:"text-direction"})],k.prototype,"textDirection",void 0);p([m({type:Number})],k.prototype,"rows",void 0);p([m({type:Number})],k.prototype,"cols",void 0);p([m({reflect:!0})],k.prototype,"inputMode",void 0);p([m()],k.prototype,"max",void 0);p([m({type:Number})],k.prototype,"maxLength",void 0);p([m()],k.prototype,"min",void 0);p([m({type:Number})],k.prototype,"minLength",void 0);p([m({type:Boolean,attribute:"no-spinner"})],k.prototype,"noSpinner",void 0);p([m()],k.prototype,"pattern",void 0);p([m({reflect:!0,converter:So})],k.prototype,"placeholder",void 0);p([m({type:Boolean,reflect:!0})],k.prototype,"readOnly",void 0);p([m({type:Boolean,reflect:!0})],k.prototype,"multiple",void 0);p([m()],k.prototype,"step",void 0);p([m({reflect:!0})],k.prototype,"type",void 0);p([m({reflect:!0})],k.prototype,"autocomplete",void 0);p([d()],k.prototype,"dirty",void 0);p([d()],k.prototype,"focused",void 0);p([d()],k.prototype,"nativeError",void 0);p([d()],k.prototype,"nativeErrorText",void 0);p([S(".input")],k.prototype,"inputOrTextarea",void 0);p([S(".field")],k.prototype,"field",void 0);p([we({slot:"leading-icon"})],k.prototype,"leadingIcons",void 0);p([we({slot:"trailing-icon"})],k.prototype,"trailingIcons",void 0);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Fo extends k{constructor(){super(...arguments),this.fieldTag=pe`md-filled-field`}}/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Pa=_`:host{display:inline-flex;outline:none;resize:both;text-align:start;-webkit-tap-highlight-color:rgba(0,0,0,0)}.text-field,.field{width:100%}.text-field{display:inline-flex}.field{cursor:text}.disabled .field{cursor:default}.text-field,.textarea .field{resize:inherit}slot[name=container]{border-radius:inherit}.icon{color:currentColor;display:flex;align-items:center;justify-content:center;fill:currentColor;position:relative}.icon ::slotted(*){display:flex;position:absolute}[has-start] .icon.leading{font-size:var(--_leading-icon-size);height:var(--_leading-icon-size);width:var(--_leading-icon-size)}[has-end] .icon.trailing{font-size:var(--_trailing-icon-size);height:var(--_trailing-icon-size);width:var(--_trailing-icon-size)}.input-wrapper{display:flex}.input-wrapper>*{all:inherit;padding:0}.input{caret-color:var(--_caret-color);overflow-x:hidden;text-align:inherit}.input::placeholder{color:currentColor;opacity:1}.input::-webkit-calendar-picker-indicator{display:none}.input::-webkit-search-decoration,.input::-webkit-search-cancel-button{display:none}@media(forced-colors: active){.input{background:none}}.no-spinner .input::-webkit-inner-spin-button,.no-spinner .input::-webkit-outer-spin-button{display:none}.no-spinner .input[type=number]{-moz-appearance:textfield}:focus-within .input{caret-color:var(--_focus-caret-color)}.error:focus-within .input{caret-color:var(--_error-focus-caret-color)}.text-field:not(.disabled) .prefix{color:var(--_input-text-prefix-color)}.text-field:not(.disabled) .suffix{color:var(--_input-text-suffix-color)}.text-field:not(.disabled) .input::placeholder{color:var(--_input-text-placeholder-color)}.prefix,.suffix{text-wrap:nowrap;width:min-content}.prefix{padding-inline-end:var(--_input-text-prefix-trailing-space)}.suffix{padding-inline-start:var(--_input-text-suffix-leading-space)}
`;/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let si=class extends Fo{constructor(){super(...arguments),this.fieldTag=pe`md-filled-field`}};si.styles=[Pa,$o];si=p([I("md-filled-text-field")],si);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class No extends E{renderOutline(e){return s`
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
 */const Bo=_`@layer styles{:host{--_bottom-space: var(--md-outlined-field-bottom-space, 16px);--_content-color: var(--md-outlined-field-content-color, var(--md-sys-color-on-surface, #1d1b20));--_content-font: var(--md-outlined-field-content-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_content-line-height: var(--md-outlined-field-content-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_content-size: var(--md-outlined-field-content-size, var(--md-sys-typescale-body-large-size, 1rem));--_content-space: var(--md-outlined-field-content-space, 16px);--_content-weight: var(--md-outlined-field-content-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_disabled-content-color: var(--md-outlined-field-disabled-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-content-opacity: var(--md-outlined-field-disabled-content-opacity, 0.38);--_disabled-label-text-color: var(--md-outlined-field-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-outlined-field-disabled-label-text-opacity, 0.38);--_disabled-leading-content-color: var(--md-outlined-field-disabled-leading-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-leading-content-opacity: var(--md-outlined-field-disabled-leading-content-opacity, 0.38);--_disabled-outline-color: var(--md-outlined-field-disabled-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-outline-opacity: var(--md-outlined-field-disabled-outline-opacity, 0.12);--_disabled-outline-width: var(--md-outlined-field-disabled-outline-width, 1px);--_disabled-supporting-text-color: var(--md-outlined-field-disabled-supporting-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-supporting-text-opacity: var(--md-outlined-field-disabled-supporting-text-opacity, 0.38);--_disabled-trailing-content-color: var(--md-outlined-field-disabled-trailing-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-trailing-content-opacity: var(--md-outlined-field-disabled-trailing-content-opacity, 0.38);--_error-content-color: var(--md-outlined-field-error-content-color, var(--md-sys-color-on-surface, #1d1b20));--_error-focus-content-color: var(--md-outlined-field-error-focus-content-color, var(--md-sys-color-on-surface, #1d1b20));--_error-focus-label-text-color: var(--md-outlined-field-error-focus-label-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-leading-content-color: var(--md-outlined-field-error-focus-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-focus-outline-color: var(--md-outlined-field-error-focus-outline-color, var(--md-sys-color-error, #b3261e));--_error-focus-supporting-text-color: var(--md-outlined-field-error-focus-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-trailing-content-color: var(--md-outlined-field-error-focus-trailing-content-color, var(--md-sys-color-error, #b3261e));--_error-hover-content-color: var(--md-outlined-field-error-hover-content-color, var(--md-sys-color-on-surface, #1d1b20));--_error-hover-label-text-color: var(--md-outlined-field-error-hover-label-text-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-leading-content-color: var(--md-outlined-field-error-hover-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-hover-outline-color: var(--md-outlined-field-error-hover-outline-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-supporting-text-color: var(--md-outlined-field-error-hover-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-hover-trailing-content-color: var(--md-outlined-field-error-hover-trailing-content-color, var(--md-sys-color-on-error-container, #410e0b));--_error-label-text-color: var(--md-outlined-field-error-label-text-color, var(--md-sys-color-error, #b3261e));--_error-leading-content-color: var(--md-outlined-field-error-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-outline-color: var(--md-outlined-field-error-outline-color, var(--md-sys-color-error, #b3261e));--_error-supporting-text-color: var(--md-outlined-field-error-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-trailing-content-color: var(--md-outlined-field-error-trailing-content-color, var(--md-sys-color-error, #b3261e));--_focus-content-color: var(--md-outlined-field-focus-content-color, var(--md-sys-color-on-surface, #1d1b20));--_focus-label-text-color: var(--md-outlined-field-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_focus-leading-content-color: var(--md-outlined-field-focus-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-outline-color: var(--md-outlined-field-focus-outline-color, var(--md-sys-color-primary, #6750a4));--_focus-outline-width: var(--md-outlined-field-focus-outline-width, 3px);--_focus-supporting-text-color: var(--md-outlined-field-focus-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-trailing-content-color: var(--md-outlined-field-focus-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-content-color: var(--md-outlined-field-hover-content-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-label-text-color: var(--md-outlined-field-hover-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-leading-content-color: var(--md-outlined-field-hover-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-outline-color: var(--md-outlined-field-hover-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-outline-width: var(--md-outlined-field-hover-outline-width, 1px);--_hover-supporting-text-color: var(--md-outlined-field-hover-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-trailing-content-color: var(--md-outlined-field-hover-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-color: var(--md-outlined-field-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-font: var(--md-outlined-field-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-outlined-field-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_label-text-padding-bottom: var(--md-outlined-field-label-text-padding-bottom, 8px);--_label-text-populated-line-height: var(--md-outlined-field-label-text-populated-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_label-text-populated-size: var(--md-outlined-field-label-text-populated-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_label-text-size: var(--md-outlined-field-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_label-text-weight: var(--md-outlined-field-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_leading-content-color: var(--md-outlined-field-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_leading-space: var(--md-outlined-field-leading-space, 16px);--_outline-color: var(--md-outlined-field-outline-color, var(--md-sys-color-outline, #79747e));--_outline-label-padding: var(--md-outlined-field-outline-label-padding, 4px);--_outline-width: var(--md-outlined-field-outline-width, 1px);--_supporting-text-color: var(--md-outlined-field-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_supporting-text-font: var(--md-outlined-field-supporting-text-font, var(--md-sys-typescale-body-small-font, var(--md-ref-typeface-plain, Roboto)));--_supporting-text-leading-space: var(--md-outlined-field-supporting-text-leading-space, 16px);--_supporting-text-line-height: var(--md-outlined-field-supporting-text-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_supporting-text-size: var(--md-outlined-field-supporting-text-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_supporting-text-top-space: var(--md-outlined-field-supporting-text-top-space, 4px);--_supporting-text-trailing-space: var(--md-outlined-field-supporting-text-trailing-space, 16px);--_supporting-text-weight: var(--md-outlined-field-supporting-text-weight, var(--md-sys-typescale-body-small-weight, var(--md-ref-typeface-weight-regular, 400)));--_top-space: var(--md-outlined-field-top-space, 16px);--_trailing-content-color: var(--md-outlined-field-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_trailing-space: var(--md-outlined-field-trailing-space, 16px);--_with-leading-content-leading-space: var(--md-outlined-field-with-leading-content-leading-space, 12px);--_with-trailing-content-trailing-space: var(--md-outlined-field-with-trailing-content-trailing-space, 12px);--_container-shape-start-start: var(--md-outlined-field-container-shape-start-start, var(--md-outlined-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-start-end: var(--md-outlined-field-container-shape-start-end, var(--md-outlined-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-end-end: var(--md-outlined-field-container-shape-end-end, var(--md-outlined-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-end-start: var(--md-outlined-field-container-shape-end-start, var(--md-outlined-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)))}.outline{border-color:var(--_outline-color);border-radius:inherit;display:flex;pointer-events:none;height:100%;position:absolute;width:100%;z-index:1}.outline-start::before,.outline-start::after,.outline-panel-inactive::before,.outline-panel-inactive::after,.outline-panel-active::before,.outline-panel-active::after,.outline-end::before,.outline-end::after{border:inherit;content:"";inset:0;position:absolute}.outline-start,.outline-end{border:inherit;border-radius:inherit;box-sizing:border-box;position:relative}.outline-start::before,.outline-start::after,.outline-end::before,.outline-end::after{border-bottom-style:solid;border-top-style:solid}.outline-start::after,.outline-end::after{opacity:0;transition:opacity 150ms cubic-bezier(0.2, 0, 0, 1)}.focused .outline-start::after,.focused .outline-end::after{opacity:1}.outline-start::before,.outline-start::after{border-inline-start-style:solid;border-inline-end-style:none;border-start-start-radius:inherit;border-start-end-radius:0;border-end-start-radius:inherit;border-end-end-radius:0;margin-inline-end:var(--_outline-label-padding)}.outline-end{flex-grow:1;margin-inline-start:calc(-1*var(--_outline-label-padding))}.outline-end::before,.outline-end::after{border-inline-start-style:none;border-inline-end-style:solid;border-start-start-radius:0;border-start-end-radius:inherit;border-end-start-radius:0;border-end-end-radius:inherit}.outline-notch{align-items:flex-start;border:inherit;display:flex;margin-inline-start:calc(-1*var(--_outline-label-padding));margin-inline-end:var(--_outline-label-padding);max-width:calc(100% - var(--_leading-space) - var(--_trailing-space));padding:0 var(--_outline-label-padding);position:relative}.no-label .outline-notch{display:none}.outline-panel-inactive,.outline-panel-active{border:inherit;border-bottom-style:solid;inset:0;position:absolute}.outline-panel-inactive::before,.outline-panel-inactive::after,.outline-panel-active::before,.outline-panel-active::after{border-top-style:solid;border-bottom:none;bottom:auto;transform:scaleX(1);transition:transform 150ms cubic-bezier(0.2, 0, 0, 1)}.outline-panel-inactive::before,.outline-panel-active::before{right:50%;transform-origin:top left}.outline-panel-inactive::after,.outline-panel-active::after{left:50%;transform-origin:top right}.populated .outline-panel-inactive::before,.populated .outline-panel-inactive::after,.populated .outline-panel-active::before,.populated .outline-panel-active::after,.focused .outline-panel-inactive::before,.focused .outline-panel-inactive::after,.focused .outline-panel-active::before,.focused .outline-panel-active::after{transform:scaleX(0)}.outline-panel-active{opacity:0;transition:opacity 150ms cubic-bezier(0.2, 0, 0, 1)}.focused .outline-panel-active{opacity:1}.outline-label{display:flex;max-width:100%;transform:translateY(calc(-100% + var(--_label-text-padding-bottom)))}.outline-start,.field:not(.with-start) .content ::slotted(*){padding-inline-start:max(var(--_leading-space),max(var(--_container-shape-start-start),var(--_container-shape-end-start)) + var(--_outline-label-padding))}.field:not(.with-start) .label-wrapper{margin-inline-start:max(var(--_leading-space),max(var(--_container-shape-start-start),var(--_container-shape-end-start)) + var(--_outline-label-padding))}.field:not(.with-end) .content ::slotted(*){padding-inline-end:max(var(--_trailing-space),max(var(--_container-shape-start-end),var(--_container-shape-end-end)))}.field:not(.with-end) .label-wrapper{margin-inline-end:max(var(--_trailing-space),max(var(--_container-shape-start-end),var(--_container-shape-end-end)))}.outline-start::before,.outline-end::before,.outline-panel-inactive,.outline-panel-inactive::before,.outline-panel-inactive::after{border-width:var(--_outline-width)}:hover .outline{border-color:var(--_hover-outline-color);color:var(--_hover-outline-color)}:hover .outline-start::before,:hover .outline-end::before,:hover .outline-panel-inactive,:hover .outline-panel-inactive::before,:hover .outline-panel-inactive::after{border-width:var(--_hover-outline-width)}.focused .outline{border-color:var(--_focus-outline-color);color:var(--_focus-outline-color)}.outline-start::after,.outline-end::after,.outline-panel-active,.outline-panel-active::before,.outline-panel-active::after{border-width:var(--_focus-outline-width)}.disabled .outline{border-color:var(--_disabled-outline-color);color:var(--_disabled-outline-color)}.disabled .outline-start,.disabled .outline-end,.disabled .outline-panel-inactive{opacity:var(--_disabled-outline-opacity)}.disabled .outline-start::before,.disabled .outline-end::before,.disabled .outline-panel-inactive,.disabled .outline-panel-inactive::before,.disabled .outline-panel-inactive::after{border-width:var(--_disabled-outline-width)}.error .outline{border-color:var(--_error-outline-color);color:var(--_error-outline-color)}.error:hover .outline{border-color:var(--_error-hover-outline-color);color:var(--_error-hover-outline-color)}.error.focused .outline{border-color:var(--_error-focus-outline-color);color:var(--_error-focus-outline-color)}.resizable .container{bottom:var(--_focus-outline-width);inset-inline-end:var(--_focus-outline-width);clip-path:inset(var(--_focus-outline-width) 0 0 var(--_focus-outline-width))}.resizable .container>*{top:var(--_focus-outline-width);inset-inline-start:var(--_focus-outline-width)}.resizable .container:dir(rtl){clip-path:inset(var(--_focus-outline-width) var(--_focus-outline-width) 0 0)}}@layer hcm{@media(forced-colors: active){.disabled .outline{border-color:GrayText;color:GrayText}.disabled :is(.outline-start,.outline-end,.outline-panel-inactive){opacity:1}}}
`;/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let ni=class extends No{};ni.styles=[Da,Bo];ni=p([I("md-outlined-field")],ni);/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Uo=_`:host{--_caret-color: var(--md-outlined-text-field-caret-color, var(--md-sys-color-primary, #6750a4));--_disabled-input-text-color: var(--md-outlined-text-field-disabled-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-input-text-opacity: var(--md-outlined-text-field-disabled-input-text-opacity, 0.38);--_disabled-label-text-color: var(--md-outlined-text-field-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-outlined-text-field-disabled-label-text-opacity, 0.38);--_disabled-leading-icon-color: var(--md-outlined-text-field-disabled-leading-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-leading-icon-opacity: var(--md-outlined-text-field-disabled-leading-icon-opacity, 0.38);--_disabled-outline-color: var(--md-outlined-text-field-disabled-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-outline-opacity: var(--md-outlined-text-field-disabled-outline-opacity, 0.12);--_disabled-outline-width: var(--md-outlined-text-field-disabled-outline-width, 1px);--_disabled-supporting-text-color: var(--md-outlined-text-field-disabled-supporting-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-supporting-text-opacity: var(--md-outlined-text-field-disabled-supporting-text-opacity, 0.38);--_disabled-trailing-icon-color: var(--md-outlined-text-field-disabled-trailing-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-trailing-icon-opacity: var(--md-outlined-text-field-disabled-trailing-icon-opacity, 0.38);--_error-focus-caret-color: var(--md-outlined-text-field-error-focus-caret-color, var(--md-sys-color-error, #b3261e));--_error-focus-input-text-color: var(--md-outlined-text-field-error-focus-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_error-focus-label-text-color: var(--md-outlined-text-field-error-focus-label-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-leading-icon-color: var(--md-outlined-text-field-error-focus-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-focus-outline-color: var(--md-outlined-text-field-error-focus-outline-color, var(--md-sys-color-error, #b3261e));--_error-focus-supporting-text-color: var(--md-outlined-text-field-error-focus-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-trailing-icon-color: var(--md-outlined-text-field-error-focus-trailing-icon-color, var(--md-sys-color-error, #b3261e));--_error-hover-input-text-color: var(--md-outlined-text-field-error-hover-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_error-hover-label-text-color: var(--md-outlined-text-field-error-hover-label-text-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-leading-icon-color: var(--md-outlined-text-field-error-hover-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-hover-outline-color: var(--md-outlined-text-field-error-hover-outline-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-supporting-text-color: var(--md-outlined-text-field-error-hover-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-hover-trailing-icon-color: var(--md-outlined-text-field-error-hover-trailing-icon-color, var(--md-sys-color-on-error-container, #410e0b));--_error-input-text-color: var(--md-outlined-text-field-error-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_error-label-text-color: var(--md-outlined-text-field-error-label-text-color, var(--md-sys-color-error, #b3261e));--_error-leading-icon-color: var(--md-outlined-text-field-error-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-outline-color: var(--md-outlined-text-field-error-outline-color, var(--md-sys-color-error, #b3261e));--_error-supporting-text-color: var(--md-outlined-text-field-error-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-trailing-icon-color: var(--md-outlined-text-field-error-trailing-icon-color, var(--md-sys-color-error, #b3261e));--_focus-input-text-color: var(--md-outlined-text-field-focus-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_focus-label-text-color: var(--md-outlined-text-field-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_focus-leading-icon-color: var(--md-outlined-text-field-focus-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-outline-color: var(--md-outlined-text-field-focus-outline-color, var(--md-sys-color-primary, #6750a4));--_focus-outline-width: var(--md-outlined-text-field-focus-outline-width, 3px);--_focus-supporting-text-color: var(--md-outlined-text-field-focus-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-trailing-icon-color: var(--md-outlined-text-field-focus-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-input-text-color: var(--md-outlined-text-field-hover-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-label-text-color: var(--md-outlined-text-field-hover-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-leading-icon-color: var(--md-outlined-text-field-hover-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-outline-color: var(--md-outlined-text-field-hover-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-outline-width: var(--md-outlined-text-field-hover-outline-width, 1px);--_hover-supporting-text-color: var(--md-outlined-text-field-hover-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-trailing-icon-color: var(--md-outlined-text-field-hover-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-color: var(--md-outlined-text-field-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_input-text-font: var(--md-outlined-text-field-input-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_input-text-line-height: var(--md-outlined-text-field-input-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_input-text-placeholder-color: var(--md-outlined-text-field-input-text-placeholder-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-prefix-color: var(--md-outlined-text-field-input-text-prefix-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-size: var(--md-outlined-text-field-input-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_input-text-suffix-color: var(--md-outlined-text-field-input-text-suffix-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-weight: var(--md-outlined-text-field-input-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_label-text-color: var(--md-outlined-text-field-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-font: var(--md-outlined-text-field-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-outlined-text-field-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_label-text-populated-line-height: var(--md-outlined-text-field-label-text-populated-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_label-text-populated-size: var(--md-outlined-text-field-label-text-populated-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_label-text-size: var(--md-outlined-text-field-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_label-text-weight: var(--md-outlined-text-field-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_leading-icon-color: var(--md-outlined-text-field-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_leading-icon-size: var(--md-outlined-text-field-leading-icon-size, 24px);--_outline-color: var(--md-outlined-text-field-outline-color, var(--md-sys-color-outline, #79747e));--_outline-width: var(--md-outlined-text-field-outline-width, 1px);--_supporting-text-color: var(--md-outlined-text-field-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_supporting-text-font: var(--md-outlined-text-field-supporting-text-font, var(--md-sys-typescale-body-small-font, var(--md-ref-typeface-plain, Roboto)));--_supporting-text-line-height: var(--md-outlined-text-field-supporting-text-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_supporting-text-size: var(--md-outlined-text-field-supporting-text-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_supporting-text-weight: var(--md-outlined-text-field-supporting-text-weight, var(--md-sys-typescale-body-small-weight, var(--md-ref-typeface-weight-regular, 400)));--_trailing-icon-color: var(--md-outlined-text-field-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_trailing-icon-size: var(--md-outlined-text-field-trailing-icon-size, 24px);--_container-shape-start-start: var(--md-outlined-text-field-container-shape-start-start, var(--md-outlined-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-start-end: var(--md-outlined-text-field-container-shape-start-end, var(--md-outlined-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-end-end: var(--md-outlined-text-field-container-shape-end-end, var(--md-outlined-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-end-start: var(--md-outlined-text-field-container-shape-end-start, var(--md-outlined-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_icon-input-space: var(--md-outlined-text-field-icon-input-space, 16px);--_leading-space: var(--md-outlined-text-field-leading-space, 16px);--_trailing-space: var(--md-outlined-text-field-trailing-space, 16px);--_top-space: var(--md-outlined-text-field-top-space, 16px);--_bottom-space: var(--md-outlined-text-field-bottom-space, 16px);--_input-text-prefix-trailing-space: var(--md-outlined-text-field-input-text-prefix-trailing-space, 2px);--_input-text-suffix-leading-space: var(--md-outlined-text-field-input-text-suffix-leading-space, 2px);--_focus-caret-color: var(--md-outlined-text-field-focus-caret-color, var(--md-sys-color-primary, #6750a4));--_with-leading-icon-leading-space: var(--md-outlined-text-field-with-leading-icon-leading-space, 12px);--_with-trailing-icon-trailing-space: var(--md-outlined-text-field-with-trailing-icon-trailing-space, 12px);--md-outlined-field-bottom-space: var(--_bottom-space);--md-outlined-field-container-shape-end-end: var(--_container-shape-end-end);--md-outlined-field-container-shape-end-start: var(--_container-shape-end-start);--md-outlined-field-container-shape-start-end: var(--_container-shape-start-end);--md-outlined-field-container-shape-start-start: var(--_container-shape-start-start);--md-outlined-field-content-color: var(--_input-text-color);--md-outlined-field-content-font: var(--_input-text-font);--md-outlined-field-content-line-height: var(--_input-text-line-height);--md-outlined-field-content-size: var(--_input-text-size);--md-outlined-field-content-space: var(--_icon-input-space);--md-outlined-field-content-weight: var(--_input-text-weight);--md-outlined-field-disabled-content-color: var(--_disabled-input-text-color);--md-outlined-field-disabled-content-opacity: var(--_disabled-input-text-opacity);--md-outlined-field-disabled-label-text-color: var(--_disabled-label-text-color);--md-outlined-field-disabled-label-text-opacity: var(--_disabled-label-text-opacity);--md-outlined-field-disabled-leading-content-color: var(--_disabled-leading-icon-color);--md-outlined-field-disabled-leading-content-opacity: var(--_disabled-leading-icon-opacity);--md-outlined-field-disabled-outline-color: var(--_disabled-outline-color);--md-outlined-field-disabled-outline-opacity: var(--_disabled-outline-opacity);--md-outlined-field-disabled-outline-width: var(--_disabled-outline-width);--md-outlined-field-disabled-supporting-text-color: var(--_disabled-supporting-text-color);--md-outlined-field-disabled-supporting-text-opacity: var(--_disabled-supporting-text-opacity);--md-outlined-field-disabled-trailing-content-color: var(--_disabled-trailing-icon-color);--md-outlined-field-disabled-trailing-content-opacity: var(--_disabled-trailing-icon-opacity);--md-outlined-field-error-content-color: var(--_error-input-text-color);--md-outlined-field-error-focus-content-color: var(--_error-focus-input-text-color);--md-outlined-field-error-focus-label-text-color: var(--_error-focus-label-text-color);--md-outlined-field-error-focus-leading-content-color: var(--_error-focus-leading-icon-color);--md-outlined-field-error-focus-outline-color: var(--_error-focus-outline-color);--md-outlined-field-error-focus-supporting-text-color: var(--_error-focus-supporting-text-color);--md-outlined-field-error-focus-trailing-content-color: var(--_error-focus-trailing-icon-color);--md-outlined-field-error-hover-content-color: var(--_error-hover-input-text-color);--md-outlined-field-error-hover-label-text-color: var(--_error-hover-label-text-color);--md-outlined-field-error-hover-leading-content-color: var(--_error-hover-leading-icon-color);--md-outlined-field-error-hover-outline-color: var(--_error-hover-outline-color);--md-outlined-field-error-hover-supporting-text-color: var(--_error-hover-supporting-text-color);--md-outlined-field-error-hover-trailing-content-color: var(--_error-hover-trailing-icon-color);--md-outlined-field-error-label-text-color: var(--_error-label-text-color);--md-outlined-field-error-leading-content-color: var(--_error-leading-icon-color);--md-outlined-field-error-outline-color: var(--_error-outline-color);--md-outlined-field-error-supporting-text-color: var(--_error-supporting-text-color);--md-outlined-field-error-trailing-content-color: var(--_error-trailing-icon-color);--md-outlined-field-focus-content-color: var(--_focus-input-text-color);--md-outlined-field-focus-label-text-color: var(--_focus-label-text-color);--md-outlined-field-focus-leading-content-color: var(--_focus-leading-icon-color);--md-outlined-field-focus-outline-color: var(--_focus-outline-color);--md-outlined-field-focus-outline-width: var(--_focus-outline-width);--md-outlined-field-focus-supporting-text-color: var(--_focus-supporting-text-color);--md-outlined-field-focus-trailing-content-color: var(--_focus-trailing-icon-color);--md-outlined-field-hover-content-color: var(--_hover-input-text-color);--md-outlined-field-hover-label-text-color: var(--_hover-label-text-color);--md-outlined-field-hover-leading-content-color: var(--_hover-leading-icon-color);--md-outlined-field-hover-outline-color: var(--_hover-outline-color);--md-outlined-field-hover-outline-width: var(--_hover-outline-width);--md-outlined-field-hover-supporting-text-color: var(--_hover-supporting-text-color);--md-outlined-field-hover-trailing-content-color: var(--_hover-trailing-icon-color);--md-outlined-field-label-text-color: var(--_label-text-color);--md-outlined-field-label-text-font: var(--_label-text-font);--md-outlined-field-label-text-line-height: var(--_label-text-line-height);--md-outlined-field-label-text-populated-line-height: var(--_label-text-populated-line-height);--md-outlined-field-label-text-populated-size: var(--_label-text-populated-size);--md-outlined-field-label-text-size: var(--_label-text-size);--md-outlined-field-label-text-weight: var(--_label-text-weight);--md-outlined-field-leading-content-color: var(--_leading-icon-color);--md-outlined-field-leading-space: var(--_leading-space);--md-outlined-field-outline-color: var(--_outline-color);--md-outlined-field-outline-width: var(--_outline-width);--md-outlined-field-supporting-text-color: var(--_supporting-text-color);--md-outlined-field-supporting-text-font: var(--_supporting-text-font);--md-outlined-field-supporting-text-line-height: var(--_supporting-text-line-height);--md-outlined-field-supporting-text-size: var(--_supporting-text-size);--md-outlined-field-supporting-text-weight: var(--_supporting-text-weight);--md-outlined-field-top-space: var(--_top-space);--md-outlined-field-trailing-content-color: var(--_trailing-icon-color);--md-outlined-field-trailing-space: var(--_trailing-space);--md-outlined-field-with-leading-content-leading-space: var(--_with-leading-icon-leading-space);--md-outlined-field-with-trailing-content-trailing-space: var(--_with-trailing-icon-trailing-space)}
`;/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Ho extends k{constructor(){super(...arguments),this.fieldTag=pe`md-outlined-field`}}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let li=class extends Ho{constructor(){super(...arguments),this.fieldTag=pe`md-outlined-field`}};li.styles=[Pa,Uo];li=p([I("md-outlined-text-field")],li);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const jo=_e(C);class tt extends jo{constructor(){super(...arguments),this.value=0,this.max=1,this.indeterminate=!1,this.fourColor=!1}render(){const{ariaLabel:e}=this;return s`
      <div
        class="progress ${te(this.getRenderClasses())}"
        role="progressbar"
        aria-label="${e||l}"
        aria-valuemin="0"
        aria-valuemax=${this.max}
        aria-valuenow=${this.indeterminate?l:this.value}
        >${this.renderIndicator()}</div
      >
    `}getRenderClasses(){return{indeterminate:this.indeterminate,"four-color":this.fourColor}}}p([m({type:Number})],tt.prototype,"value",void 0);p([m({type:Number})],tt.prototype,"max",void 0);p([m({type:Boolean})],tt.prototype,"indeterminate",void 0);p([m({type:Boolean,attribute:"four-color"})],tt.prototype,"fourColor",void 0);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Go extends tt{renderIndicator(){return this.indeterminate?this.renderIndeterminateContainer():this.renderDeterminateContainer()}renderDeterminateContainer(){const e=(1-this.value/this.max)*100;return s`
      <svg viewBox="0 0 4800 4800">
        <circle class="track" pathLength="100"></circle>
        <circle
          class="active-track"
          pathLength="100"
          stroke-dashoffset=${e}></circle>
      </svg>
    `}renderIndeterminateContainer(){return s` <div class="spinner">
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
 */const Wo=_`:host{--_active-indicator-color: var(--md-circular-progress-active-indicator-color, var(--md-sys-color-primary, #6750a4));--_active-indicator-width: var(--md-circular-progress-active-indicator-width, 10);--_four-color-active-indicator-four-color: var(--md-circular-progress-four-color-active-indicator-four-color, var(--md-sys-color-tertiary-container, #ffd8e4));--_four-color-active-indicator-one-color: var(--md-circular-progress-four-color-active-indicator-one-color, var(--md-sys-color-primary, #6750a4));--_four-color-active-indicator-three-color: var(--md-circular-progress-four-color-active-indicator-three-color, var(--md-sys-color-tertiary, #7d5260));--_four-color-active-indicator-two-color: var(--md-circular-progress-four-color-active-indicator-two-color, var(--md-sys-color-primary-container, #eaddff));--_size: var(--md-circular-progress-size, 48px);display:inline-flex;vertical-align:middle;width:var(--_size);height:var(--_size);position:relative;align-items:center;justify-content:center;contain:strict;content-visibility:auto}.progress{flex:1;align-self:stretch;margin:4px}.progress,.spinner,.left,.right,.circle,svg,.track,.active-track{position:absolute;inset:0}svg{transform:rotate(-90deg)}circle{cx:50%;cy:50%;r:calc(50%*(1 - var(--_active-indicator-width)/100));stroke-width:calc(var(--_active-indicator-width)*1%);stroke-dasharray:100;fill:rgba(0,0,0,0)}.active-track{transition:stroke-dashoffset 500ms cubic-bezier(0, 0, 0.2, 1);stroke:var(--_active-indicator-color)}.track{stroke:rgba(0,0,0,0)}.progress.indeterminate{animation:linear infinite linear-rotate;animation-duration:1568.2352941176ms}.spinner{animation:infinite both rotate-arc;animation-duration:5332ms;animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1)}.left{overflow:hidden;inset:0 50% 0 0}.right{overflow:hidden;inset:0 0 0 50%}.circle{box-sizing:border-box;border-radius:50%;border:solid calc(var(--_active-indicator-width)/100*(var(--_size) - 8px));border-color:var(--_active-indicator-color) var(--_active-indicator-color) rgba(0,0,0,0) rgba(0,0,0,0);animation:expand-arc;animation-iteration-count:infinite;animation-fill-mode:both;animation-duration:1333ms,5332ms;animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1)}.four-color .circle{animation-name:expand-arc,four-color}.left .circle{rotate:135deg;inset:0 -100% 0 0}.right .circle{rotate:100deg;inset:0 0 0 -100%;animation-delay:-666.5ms,0ms}@media(forced-colors: active){.active-track{stroke:CanvasText}.circle{border-color:CanvasText CanvasText Canvas Canvas}}@keyframes expand-arc{0%{transform:rotate(265deg)}50%{transform:rotate(130deg)}100%{transform:rotate(265deg)}}@keyframes rotate-arc{12.5%{transform:rotate(135deg)}25%{transform:rotate(270deg)}37.5%{transform:rotate(405deg)}50%{transform:rotate(540deg)}62.5%{transform:rotate(675deg)}75%{transform:rotate(810deg)}87.5%{transform:rotate(945deg)}100%{transform:rotate(1080deg)}}@keyframes linear-rotate{to{transform:rotate(360deg)}}@keyframes four-color{0%{border-top-color:var(--_four-color-active-indicator-one-color);border-right-color:var(--_four-color-active-indicator-one-color)}15%{border-top-color:var(--_four-color-active-indicator-one-color);border-right-color:var(--_four-color-active-indicator-one-color)}25%{border-top-color:var(--_four-color-active-indicator-two-color);border-right-color:var(--_four-color-active-indicator-two-color)}40%{border-top-color:var(--_four-color-active-indicator-two-color);border-right-color:var(--_four-color-active-indicator-two-color)}50%{border-top-color:var(--_four-color-active-indicator-three-color);border-right-color:var(--_four-color-active-indicator-three-color)}65%{border-top-color:var(--_four-color-active-indicator-three-color);border-right-color:var(--_four-color-active-indicator-three-color)}75%{border-top-color:var(--_four-color-active-indicator-four-color);border-right-color:var(--_four-color-active-indicator-four-color)}90%{border-top-color:var(--_four-color-active-indicator-four-color);border-right-color:var(--_four-color-active-indicator-four-color)}100%{border-top-color:var(--_four-color-active-indicator-one-color);border-right-color:var(--_four-color-active-indicator-one-color)}}
`;/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let di=class extends Go{};di.styles=[Wo];di=p([I("md-circular-progress")],di);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class At extends C{constructor(){super(...arguments),this.inset=!1,this.insetStart=!1,this.insetEnd=!1}}p([m({type:Boolean,reflect:!0})],At.prototype,"inset",void 0);p([m({type:Boolean,reflect:!0,attribute:"inset-start"})],At.prototype,"insetStart",void 0);p([m({type:Boolean,reflect:!0,attribute:"inset-end"})],At.prototype,"insetEnd",void 0);/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const qo=_`:host{box-sizing:border-box;color:var(--md-divider-color, var(--md-sys-color-outline-variant, #cac4d0));display:flex;height:var(--md-divider-thickness, 1px);width:100%}:host([inset]),:host([inset-start]){padding-inline-start:16px}:host([inset]),:host([inset-end]){padding-inline-end:16px}:host::before{background:currentColor;content:"";height:100%;width:100%}@media(forced-colors: active){:host::before{background:CanvasText}}
`;/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let ci=class extends At{};ci.styles=[qo];ci=p([I("md-divider")],ci);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Ko={dialog:[[[{transform:"translateY(-50px)"},{transform:"translateY(0)"}],{duration:500,easing:Le.EMPHASIZED}]],scrim:[[[{opacity:0},{opacity:.32}],{duration:500,easing:"linear"}]],container:[[[{opacity:0},{opacity:1}],{duration:50,easing:"linear",pseudoElement:"::before"}],[[{height:"35%"},{height:"100%"}],{duration:500,easing:Le.EMPHASIZED,pseudoElement:"::before"}]],headline:[[[{opacity:0},{opacity:0,offset:.2},{opacity:1}],{duration:250,easing:"linear",fill:"forwards"}]],content:[[[{opacity:0},{opacity:0,offset:.2},{opacity:1}],{duration:250,easing:"linear",fill:"forwards"}]],actions:[[[{opacity:0},{opacity:0,offset:.5},{opacity:1}],{duration:300,easing:"linear",fill:"forwards"}]]},Vo={dialog:[[[{transform:"translateY(0)"},{transform:"translateY(-50px)"}],{duration:150,easing:Le.EMPHASIZED_ACCELERATE}]],scrim:[[[{opacity:.32},{opacity:0}],{duration:150,easing:"linear"}]],container:[[[{height:"100%"},{height:"35%"}],{duration:150,easing:Le.EMPHASIZED_ACCELERATE,pseudoElement:"::before"}],[[{opacity:"1"},{opacity:"0"}],{delay:100,duration:50,easing:"linear",pseudoElement:"::before"}]],headline:[[[{opacity:1},{opacity:0}],{duration:100,easing:"linear",fill:"forwards"}]],content:[[[{opacity:1},{opacity:0}],{duration:100,easing:"linear",fill:"forwards"}]],actions:[[[{opacity:1},{opacity:0}],{duration:100,easing:"linear",fill:"forwards"}]]};/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Yo=_e(C);class P extends Yo{get open(){return this.isOpen}set open(e){e!==this.isOpen&&(this.isOpen=e,e?(this.setAttribute("open",""),this.show()):(this.removeAttribute("open"),this.close()))}constructor(){super(),this.quick=!1,this.returnValue="",this.noFocusTrap=!1,this.getOpenAnimation=()=>Ko,this.getCloseAnimation=()=>Vo,this.isOpen=!1,this.isOpening=!1,this.isConnectedPromise=this.getIsConnectedPromise(),this.isAtScrollTop=!1,this.isAtScrollBottom=!1,this.nextClickIsFromContent=!1,this.hasHeadline=!1,this.hasActions=!1,this.hasIcon=!1,this.escapePressedWithoutCancel=!1,this.treewalker=document.createTreeWalker(this,NodeFilter.SHOW_ELEMENT),this.addEventListener("submit",this.handleSubmit)}async show(){var a;this.isOpening=!0,await this.isConnectedPromise,await this.updateComplete;const e=this.dialog;if(e.open||!this.isOpening){this.isOpening=!1;return}if(!this.dispatchEvent(new Event("open",{cancelable:!0}))){this.open=!1,this.isOpening=!1;return}e.showModal(),this.open=!0,this.scroller&&(this.scroller.scrollTop=0),(a=this.querySelector("[autofocus]"))==null||a.focus(),await this.animateDialog(this.getOpenAnimation()),this.dispatchEvent(new Event("opened")),this.isOpening=!1}async close(e=this.returnValue){if(this.isOpening=!1,!this.isConnected){this.open=!1;return}await this.updateComplete;const i=this.dialog;if(!i.open||this.isOpening){this.open=!1;return}const a=this.returnValue;if(this.returnValue=e,!this.dispatchEvent(new Event("close",{cancelable:!0}))){this.returnValue=a;return}await this.animateDialog(this.getCloseAnimation()),i.close(e),this.open=!1,this.dispatchEvent(new Event("closed"))}connectedCallback(){super.connectedCallback(),this.isConnectedPromiseResolve()}disconnectedCallback(){super.disconnectedCallback(),this.isConnectedPromise=this.getIsConnectedPromise()}render(){const e=this.open&&!(this.isAtScrollTop&&this.isAtScrollBottom),i={"has-headline":this.hasHeadline,"has-actions":this.hasActions,"has-icon":this.hasIcon,scrollable:e,"show-top-divider":e&&!this.isAtScrollTop,"show-bottom-divider":e&&!this.isAtScrollBottom},a=this.open&&!this.noFocusTrap,r=s`
      <div
        class="focus-trap"
        tabindex="0"
        aria-hidden="true"
        @focus=${this.handleFocusTrapFocus}></div>
    `,{ariaLabel:o}=this;return s`
      <div class="scrim"></div>
      <dialog
        class=${te(i)}
        aria-label=${o||l}
        aria-labelledby=${this.hasHeadline?"headline":l}
        role=${this.type==="alert"?"alertdialog":l}
        @cancel=${this.handleCancel}
        @click=${this.handleDialogClick}
        @close=${this.handleClose}
        @keydown=${this.handleKeydown}
        .returnValue=${this.returnValue||l}>
        ${a?r:l}
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
        ${a?r:l}
      </dialog>
    `}firstUpdated(){this.intersectionObserver=new IntersectionObserver(e=>{for(const i of e)this.handleAnchorIntersection(i)},{root:this.scroller}),this.intersectionObserver.observe(this.topAnchor),this.intersectionObserver.observe(this.bottomAnchor)}handleDialogClick(){if(this.nextClickIsFromContent){this.nextClickIsFromContent=!1;return}this.dispatchEvent(new Event("cancel",{cancelable:!0}))&&this.close()}handleContentClick(){this.nextClickIsFromContent=!0}handleSubmit(e){const i=e.target,{submitter:a}=e;i.getAttribute("method")!=="dialog"||!a||this.close(a.getAttribute("value")??this.returnValue)}handleCancel(e){if(e.target!==this.dialog)return;this.escapePressedWithoutCancel=!1;const i=!Pi(this,e);e.preventDefault(),!i&&this.close()}handleClose(){var e;this.escapePressedWithoutCancel&&(this.escapePressedWithoutCancel=!1,(e=this.dialog)==null||e.dispatchEvent(new Event("cancel",{cancelable:!0})))}handleKeydown(e){e.key==="Escape"&&(this.escapePressedWithoutCancel=!0,setTimeout(()=>{this.escapePressedWithoutCancel=!1}))}async animateDialog(e){var re;if((re=this.cancelAnimations)==null||re.abort(),this.cancelAnimations=new AbortController,this.quick)return;const{dialog:i,scrim:a,container:r,headline:o,content:n,actions:c}=this;if(!i||!a||!r||!o||!n||!c)return;const{container:h,dialog:f,scrim:g,headline:u,content:y,actions:$}=e,O=[[i,f??[]],[a,g??[]],[r,h??[]],[o,u??[]],[n,y??[]],[c,$??[]]],ae=[];for(const[X,fe]of O)for(const gr of fe){const ji=X.animate(...gr);this.cancelAnimations.signal.addEventListener("abort",()=>{ji.cancel()}),ae.push(ji)}await Promise.all(ae.map(X=>X.finished.catch(()=>{})))}handleHeadlineChange(e){const i=e.target;this.hasHeadline=i.assignedElements().length>0}handleActionsChange(e){const i=e.target;this.hasActions=i.assignedElements().length>0}handleIconChange(e){const i=e.target;this.hasIcon=i.assignedElements().length>0}handleAnchorIntersection(e){const{target:i,isIntersecting:a}=e;i===this.topAnchor&&(this.isAtScrollTop=a),i===this.bottomAnchor&&(this.isAtScrollBottom=a)}getIsConnectedPromise(){return new Promise(e=>{this.isConnectedPromiseResolve=e})}handleFocusTrapFocus(e){var u;const[i,a]=this.getFirstAndLastFocusableChildren();if(!i||!a){(u=this.dialog)==null||u.focus();return}const r=e.target===this.firstFocusTrap,o=!r,n=e.relatedTarget===i,c=e.relatedTarget===a,h=!n&&!c;if(o&&c||r&&h){i.focus();return}if(r&&n||o&&h){a.focus();return}}getFirstAndLastFocusableChildren(){if(!this.treewalker)return[null,null];let e=null,i=null;for(this.treewalker.currentNode=this.treewalker.root;this.treewalker.nextNode();){const a=this.treewalker.currentNode;Jo(a)&&(e||(e=a),i=a)}return[e,i]}}p([m({type:Boolean})],P.prototype,"open",null);p([m({type:Boolean})],P.prototype,"quick",void 0);p([m({attribute:!1})],P.prototype,"returnValue",void 0);p([m()],P.prototype,"type",void 0);p([m({type:Boolean,attribute:"no-focus-trap"})],P.prototype,"noFocusTrap",void 0);p([S("dialog")],P.prototype,"dialog",void 0);p([S(".scrim")],P.prototype,"scrim",void 0);p([S(".container")],P.prototype,"container",void 0);p([S(".headline")],P.prototype,"headline",void 0);p([S(".content")],P.prototype,"content",void 0);p([S(".actions")],P.prototype,"actions",void 0);p([d()],P.prototype,"isAtScrollTop",void 0);p([d()],P.prototype,"isAtScrollBottom",void 0);p([S(".scroller")],P.prototype,"scroller",void 0);p([S(".top.anchor")],P.prototype,"topAnchor",void 0);p([S(".bottom.anchor")],P.prototype,"bottomAnchor",void 0);p([S(".focus-trap")],P.prototype,"firstFocusTrap",void 0);p([d()],P.prototype,"hasHeadline",void 0);p([d()],P.prototype,"hasActions",void 0);p([d()],P.prototype,"hasIcon",void 0);function Jo(t){var o;const e=":is(button,input,select,textarea,object,:is(a,area)[href],[tabindex],[contenteditable=true])",i=":not(:disabled,[disabled])";return t.matches(e+i+':not([tabindex^="-"])')?!0:!t.localName.includes("-")||!t.matches(i)?!1:((o=t.shadowRoot)==null?void 0:o.delegatesFocus)??!1}/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Xo=_`:host{border-start-start-radius:var(--md-dialog-container-shape-start-start, var(--md-dialog-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));border-start-end-radius:var(--md-dialog-container-shape-start-end, var(--md-dialog-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));border-end-end-radius:var(--md-dialog-container-shape-end-end, var(--md-dialog-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));border-end-start-radius:var(--md-dialog-container-shape-end-start, var(--md-dialog-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));display:contents;margin:auto;max-height:min(560px,100% - 48px);max-width:min(560px,100% - 48px);min-height:140px;min-width:280px;position:fixed;height:fit-content;width:fit-content}dialog{background:rgba(0,0,0,0);border:none;border-radius:inherit;flex-direction:column;height:inherit;margin:inherit;max-height:inherit;max-width:inherit;min-height:inherit;min-width:inherit;outline:none;overflow:visible;padding:0;width:inherit}dialog[open]{display:flex}::backdrop{background:none}.scrim{background:var(--md-sys-color-scrim, #000);display:none;inset:0;opacity:32%;pointer-events:none;position:fixed;z-index:1}:host([open]) .scrim{display:flex}h2{all:unset;align-self:stretch}.headline{align-items:center;color:var(--md-dialog-headline-color, var(--md-sys-color-on-surface, #1d1b20));display:flex;flex-direction:column;font-family:var(--md-dialog-headline-font, var(--md-sys-typescale-headline-small-font, var(--md-ref-typeface-brand, Roboto)));font-size:var(--md-dialog-headline-size, var(--md-sys-typescale-headline-small-size, 1.5rem));line-height:var(--md-dialog-headline-line-height, var(--md-sys-typescale-headline-small-line-height, 2rem));font-weight:var(--md-dialog-headline-weight, var(--md-sys-typescale-headline-small-weight, var(--md-ref-typeface-weight-regular, 400)));position:relative}slot[name=headline]::slotted(*){align-items:center;align-self:stretch;box-sizing:border-box;display:flex;gap:8px;padding:24px 24px 0}.icon{display:flex}slot[name=icon]::slotted(*){color:var(--md-dialog-icon-color, var(--md-sys-color-secondary, #625b71));fill:currentColor;font-size:var(--md-dialog-icon-size, 24px);margin-top:24px;height:var(--md-dialog-icon-size, 24px);width:var(--md-dialog-icon-size, 24px)}.has-icon slot[name=headline]::slotted(*){justify-content:center;padding-top:16px}.scrollable slot[name=headline]::slotted(*){padding-bottom:16px}.scrollable.has-headline slot[name=content]::slotted(*){padding-top:8px}.container{border-radius:inherit;display:flex;flex-direction:column;flex-grow:1;overflow:hidden;position:relative;transform-origin:top}.container::before{background:var(--md-dialog-container-color, var(--md-sys-color-surface-container-high, #ece6f0));border-radius:inherit;content:"";inset:0;position:absolute}.scroller{display:flex;flex:1;flex-direction:column;overflow:hidden;z-index:1}.scrollable .scroller{overflow-y:scroll}.content{color:var(--md-dialog-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));font-family:var(--md-dialog-supporting-text-font, var(--md-sys-typescale-body-medium-font, var(--md-ref-typeface-plain, Roboto)));font-size:var(--md-dialog-supporting-text-size, var(--md-sys-typescale-body-medium-size, 0.875rem));line-height:var(--md-dialog-supporting-text-line-height, var(--md-sys-typescale-body-medium-line-height, 1.25rem));flex:1;font-weight:var(--md-dialog-supporting-text-weight, var(--md-sys-typescale-body-medium-weight, var(--md-ref-typeface-weight-regular, 400)));height:min-content;position:relative}slot[name=content]::slotted(*){box-sizing:border-box;padding:24px}.anchor{position:absolute}.top.anchor{top:0}.bottom.anchor{bottom:0}.actions{position:relative}slot[name=actions]::slotted(*){box-sizing:border-box;display:flex;gap:8px;justify-content:flex-end;padding:16px 24px 24px}.has-actions slot[name=content]::slotted(*){padding-bottom:8px}md-divider{display:none;position:absolute}.has-headline.show-top-divider .headline md-divider,.has-actions.show-bottom-divider .actions md-divider{display:flex}.headline md-divider{bottom:0}.actions md-divider{top:0}@media(forced-colors: active){dialog{outline:2px solid WindowText}}
`;/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let pi=class extends P{};pi.styles=[Xo];pi=p([I("md-dialog")],pi);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Zo=_e(C);class ue extends Zo{get rippleDisabled(){return this.disabled||this.softDisabled}constructor(){super(),this.disabled=!1,this.softDisabled=!1,this.alwaysFocusable=!1,this.label="",this.hasIcon=!1,this.addEventListener("click",this.handleClick.bind(this))}focus(e){this.disabled&&!this.alwaysFocusable||super.focus(e)}render(){return s`
      <div class="container ${te(this.getContainerClasses())}">
        ${this.renderContainerContent()}
      </div>
    `}updated(e){e.has("disabled")&&e.get("disabled")!==void 0&&this.dispatchEvent(new Event("update-focus",{bubbles:!0}))}getContainerClasses(){return{disabled:this.disabled||this.softDisabled,"has-icon":this.hasIcon}}renderContainerContent(){return s`
      ${this.renderOutline()}
      <md-focus-ring part="focus-ring" for=${this.primaryId}></md-focus-ring>
      <md-ripple
        for=${this.primaryId}
        ?disabled=${this.rippleDisabled}></md-ripple>
      ${this.renderPrimaryAction(this.renderPrimaryContent())}
    `}renderOutline(){return s`<span class="outline"></span>`}renderLeadingIcon(){return s`<slot name="icon" @slotchange=${this.handleIconChange}></slot>`}renderPrimaryContent(){return s`
      <span class="leading icon" aria-hidden="true">
        ${this.renderLeadingIcon()}
      </span>
      <span class="label">
        <span class="label-text" id="label">
          ${this.label?this.label:s`<slot></slot>`}
        </span>
      </span>
      <span class="touch"></span>
    `}handleIconChange(e){const i=e.target;this.hasIcon=i.assignedElements({flatten:!0}).length>0}handleClick(e){if(this.softDisabled||this.disabled&&this.alwaysFocusable){e.stopImmediatePropagation(),e.preventDefault();return}}}ue.shadowRootOptions={...C.shadowRootOptions,delegatesFocus:!0};p([m({type:Boolean,reflect:!0})],ue.prototype,"disabled",void 0);p([m({type:Boolean,attribute:"soft-disabled",reflect:!0})],ue.prototype,"softDisabled",void 0);p([m({type:Boolean,attribute:"always-focusable"})],ue.prototype,"alwaysFocusable",void 0);p([m()],ue.prototype,"label",void 0);p([m({type:Boolean,reflect:!0,attribute:"has-icon"})],ue.prototype,"hasIcon",void 0);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Ma extends C{get chips(){return this.childElements.filter(e=>e instanceof ue)}constructor(){super(),this.internals=this.attachInternals(),this.addEventListener("focusin",this.updateTabIndices.bind(this)),this.addEventListener("update-focus",this.updateTabIndices.bind(this)),this.addEventListener("keydown",this.handleKeyDown.bind(this)),this.internals.role="toolbar"}render(){return s`<slot @slotchange=${this.updateTabIndices}></slot>`}handleKeyDown(e){const i=e.key==="ArrowLeft",a=e.key==="ArrowRight",r=e.key==="Home",o=e.key==="End";if(!i&&!a&&!r&&!o)return;const{chips:n}=this;if(n.length<2)return;if(e.preventDefault(),r||o){const y=r?0:n.length-1;n[y].focus({trailing:o}),this.updateTabIndices();return}const h=getComputedStyle(this).direction==="rtl"?i:a,f=n.find(y=>y.matches(":focus-within"));if(!f){(h?n[0]:n[n.length-1]).focus({trailing:!h}),this.updateTabIndices();return}const g=n.indexOf(f);let u=h?g+1:g-1;for(;u!==g;){u>=n.length?u=0:u<0&&(u=n.length-1);const y=n[u];if(y.disabled&&!y.alwaysFocusable){h?u++:u--;continue}y.focus({trailing:!h}),this.updateTabIndices();break}}updateTabIndices(){const{chips:e}=this;let i;for(const a of e){const r=a.alwaysFocusable||!a.disabled;if(a.matches(":focus-within")&&r){i=a;continue}r&&!i&&(i=a),a.tabIndex=-1}i&&(i.tabIndex=0)}}p([we()],Ma.prototype,"childElements",void 0);/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Qo=_`:host{display:flex;flex-wrap:wrap;gap:8px}
`;/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let hi=class extends Ma{};hi.styles=[Qo];hi=p([I("md-chip-set")],hi);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class it extends ue{constructor(){super(...arguments),this.elevated=!1,this.href="",this.download="",this.target=""}get primaryId(){return this.href?"link":"button"}get rippleDisabled(){return!this.href&&(this.disabled||this.softDisabled)}getContainerClasses(){return{...super.getContainerClasses(),disabled:!this.href&&(this.disabled||this.softDisabled),elevated:this.elevated,link:!!this.href}}renderPrimaryAction(e){const{ariaLabel:i}=this;return this.href?s`
        <a
          class="primary action"
          id="link"
          aria-label=${i||l}
          href=${this.href}
          download=${this.download||l}
          target=${this.target||l}
          >${e}</a
        >
      `:s`
      <button
        class="primary action"
        id="button"
        aria-label=${i||l}
        aria-disabled=${this.softDisabled||l}
        ?disabled=${this.disabled&&!this.alwaysFocusable}
        type="button"
        >${e}</button
      >
    `}renderOutline(){return this.elevated?s`<md-elevation part="elevation"></md-elevation>`:super.renderOutline()}}p([m({type:Boolean})],it.prototype,"elevated",void 0);p([m()],it.prototype,"href",void 0);p([m()],it.prototype,"download",void 0);p([m()],it.prototype,"target",void 0);/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const es=_`:host{--_container-height: var(--md-assist-chip-container-height, 32px);--_disabled-label-text-color: var(--md-assist-chip-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-assist-chip-disabled-label-text-opacity, 0.38);--_elevated-container-color: var(--md-assist-chip-elevated-container-color, var(--md-sys-color-surface-container-low, #f7f2fa));--_elevated-container-elevation: var(--md-assist-chip-elevated-container-elevation, 1);--_elevated-container-shadow-color: var(--md-assist-chip-elevated-container-shadow-color, var(--md-sys-color-shadow, #000));--_elevated-disabled-container-color: var(--md-assist-chip-elevated-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));--_elevated-disabled-container-elevation: var(--md-assist-chip-elevated-disabled-container-elevation, 0);--_elevated-disabled-container-opacity: var(--md-assist-chip-elevated-disabled-container-opacity, 0.12);--_elevated-focus-container-elevation: var(--md-assist-chip-elevated-focus-container-elevation, 1);--_elevated-hover-container-elevation: var(--md-assist-chip-elevated-hover-container-elevation, 2);--_elevated-pressed-container-elevation: var(--md-assist-chip-elevated-pressed-container-elevation, 1);--_focus-label-text-color: var(--md-assist-chip-focus-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-label-text-color: var(--md-assist-chip-hover-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-state-layer-color: var(--md-assist-chip-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-state-layer-opacity: var(--md-assist-chip-hover-state-layer-opacity, 0.08);--_label-text-color: var(--md-assist-chip-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_label-text-font: var(--md-assist-chip-label-text-font, var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-assist-chip-label-text-line-height, var(--md-sys-typescale-label-large-line-height, 1.25rem));--_label-text-size: var(--md-assist-chip-label-text-size, var(--md-sys-typescale-label-large-size, 0.875rem));--_label-text-weight: var(--md-assist-chip-label-text-weight, var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)));--_pressed-label-text-color: var(--md-assist-chip-pressed-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_pressed-state-layer-color: var(--md-assist-chip-pressed-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_pressed-state-layer-opacity: var(--md-assist-chip-pressed-state-layer-opacity, 0.12);--_disabled-outline-color: var(--md-assist-chip-disabled-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-outline-opacity: var(--md-assist-chip-disabled-outline-opacity, 0.12);--_focus-outline-color: var(--md-assist-chip-focus-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_outline-color: var(--md-assist-chip-outline-color, var(--md-sys-color-outline, #79747e));--_outline-width: var(--md-assist-chip-outline-width, 1px);--_disabled-leading-icon-color: var(--md-assist-chip-disabled-leading-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-leading-icon-opacity: var(--md-assist-chip-disabled-leading-icon-opacity, 0.38);--_focus-leading-icon-color: var(--md-assist-chip-focus-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_hover-leading-icon-color: var(--md-assist-chip-hover-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_leading-icon-color: var(--md-assist-chip-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-size: var(--md-assist-chip-icon-size, 18px);--_pressed-leading-icon-color: var(--md-assist-chip-pressed-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_container-shape-start-start: var(--md-assist-chip-container-shape-start-start, var(--md-assist-chip-container-shape, var(--md-sys-shape-corner-small, 8px)));--_container-shape-start-end: var(--md-assist-chip-container-shape-start-end, var(--md-assist-chip-container-shape, var(--md-sys-shape-corner-small, 8px)));--_container-shape-end-end: var(--md-assist-chip-container-shape-end-end, var(--md-assist-chip-container-shape, var(--md-sys-shape-corner-small, 8px)));--_container-shape-end-start: var(--md-assist-chip-container-shape-end-start, var(--md-assist-chip-container-shape, var(--md-sys-shape-corner-small, 8px)));--_leading-space: var(--md-assist-chip-leading-space, 16px);--_trailing-space: var(--md-assist-chip-trailing-space, 16px);--_icon-label-space: var(--md-assist-chip-icon-label-space, 8px);--_with-leading-icon-leading-space: var(--md-assist-chip-with-leading-icon-leading-space, 8px)}@media(forced-colors: active){.link .outline{border-color:ActiveText}}
`;/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Ra=_`.elevated{--md-elevation-level: var(--_elevated-container-elevation);--md-elevation-shadow-color: var(--_elevated-container-shadow-color)}.elevated::before{background:var(--_elevated-container-color)}.elevated:hover{--md-elevation-level: var(--_elevated-hover-container-elevation)}.elevated:focus-within{--md-elevation-level: var(--_elevated-focus-container-elevation)}.elevated:active{--md-elevation-level: var(--_elevated-pressed-container-elevation)}.elevated.disabled{--md-elevation-level: var(--_elevated-disabled-container-elevation)}.elevated.disabled::before{background:var(--_elevated-disabled-container-color);opacity:var(--_elevated-disabled-container-opacity)}@media(forced-colors: active){.elevated md-elevation{border:1px solid CanvasText}.elevated.disabled md-elevation{border-color:GrayText}}
`;/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Fa=_`:host{border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end);display:inline-flex;height:var(--_container-height);cursor:pointer;-webkit-tap-highlight-color:rgba(0,0,0,0);--md-ripple-hover-color: var(--_hover-state-layer-color);--md-ripple-hover-opacity: var(--_hover-state-layer-opacity);--md-ripple-pressed-color: var(--_pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_pressed-state-layer-opacity)}:host(:is([disabled],[soft-disabled])){pointer-events:none}:host([touch-target=wrapper]){margin:max(0px,(48px - var(--_container-height))/2) 0}md-focus-ring{--md-focus-ring-shape-start-start: var(--_container-shape-start-start);--md-focus-ring-shape-start-end: var(--_container-shape-start-end);--md-focus-ring-shape-end-end: var(--_container-shape-end-end);--md-focus-ring-shape-end-start: var(--_container-shape-end-start)}.container{border-radius:inherit;box-sizing:border-box;display:flex;height:100%;position:relative;width:100%}.container::before{border-radius:inherit;content:"";inset:0;pointer-events:none;position:absolute}.container:not(.disabled){cursor:pointer}.container.disabled{pointer-events:none}.cell{display:flex}.action{align-items:baseline;appearance:none;background:none;border:none;border-radius:inherit;display:flex;outline:none;padding:0;position:relative;text-decoration:none}.primary.action{min-width:0;padding-inline-start:var(--_leading-space);padding-inline-end:var(--_trailing-space)}.has-icon .primary.action{padding-inline-start:var(--_with-leading-icon-leading-space)}.touch{height:48px;inset:50% 0 0;position:absolute;transform:translateY(-50%);width:100%}:host([touch-target=none]) .touch{display:none}.outline{border:var(--_outline-width) solid var(--_outline-color);border-radius:inherit;inset:0;pointer-events:none;position:absolute}:where(:focus) .outline{border-color:var(--_focus-outline-color)}:where(.disabled) .outline{border-color:var(--_disabled-outline-color);opacity:var(--_disabled-outline-opacity)}md-ripple{border-radius:inherit}.label,.icon,.touch{z-index:1}.label{align-items:center;color:var(--_label-text-color);display:flex;font-family:var(--_label-text-font);font-size:var(--_label-text-size);font-weight:var(--_label-text-weight);height:100%;line-height:var(--_label-text-line-height);overflow:hidden;user-select:none}.label-text{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}:where(:hover) .label{color:var(--_hover-label-text-color)}:where(:focus) .label{color:var(--_focus-label-text-color)}:where(:active) .label{color:var(--_pressed-label-text-color)}:where(.disabled) .label{color:var(--_disabled-label-text-color);opacity:var(--_disabled-label-text-opacity)}.icon{align-self:center;display:flex;fill:currentColor;position:relative}.icon ::slotted(:first-child){font-size:var(--_icon-size);height:var(--_icon-size);width:var(--_icon-size)}.leading.icon{color:var(--_leading-icon-color)}.leading.icon ::slotted(*),.leading.icon svg{margin-inline-end:var(--_icon-label-space)}:where(:hover) .leading.icon{color:var(--_hover-leading-icon-color)}:where(:focus) .leading.icon{color:var(--_focus-leading-icon-color)}:where(:active) .leading.icon{color:var(--_pressed-leading-icon-color)}:where(.disabled) .leading.icon{color:var(--_disabled-leading-icon-color);opacity:var(--_disabled-leading-icon-opacity)}@media(forced-colors: active){:where(.disabled) :is(.label,.outline,.leading.icon){color:GrayText;opacity:1}}a,button{text-transform:inherit}a,button:not(:disabled,[aria-disabled=true]){cursor:inherit}
`;/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let ui=class extends it{};ui.styles=[Fa,Ra,es];ui=p([I("md-assist-chip")],ui);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const ct="aria-label-remove";class ts extends ue{get ariaLabelRemove(){if(this.hasAttribute(ct))return this.getAttribute(ct);const{ariaLabel:e}=this;return e||this.label?`Remove ${e||this.label}`:null}set ariaLabelRemove(e){const i=this.ariaLabelRemove;e!==i&&(e===null?this.removeAttribute(ct):this.setAttribute(ct,e),this.requestUpdate())}constructor(){super(),this.handleTrailingActionFocus=this.handleTrailingActionFocus.bind(this),this.addEventListener("keydown",this.handleKeyDown.bind(this))}focus(e){if((this.alwaysFocusable||!this.disabled)&&(e!=null&&e.trailing)&&this.trailingAction){this.trailingAction.focus(e);return}super.focus(e)}renderContainerContent(){return s`
      ${super.renderContainerContent()}
      ${this.renderTrailingAction(this.handleTrailingActionFocus)}
    `}handleKeyDown(e){var f,g;const i=e.key==="ArrowLeft",a=e.key==="ArrowRight";if(!i&&!a||!this.primaryAction||!this.trailingAction)return;const o=getComputedStyle(this).direction==="rtl"?i:a,n=(f=this.primaryAction)==null?void 0:f.matches(":focus-within"),c=(g=this.trailingAction)==null?void 0:g.matches(":focus-within");if(o&&c||!o&&n)return;e.preventDefault(),e.stopPropagation(),(o?this.trailingAction:this.primaryAction).focus()}handleTrailingActionFocus(){const{primaryAction:e,trailingAction:i}=this;!e||!i||(e.tabIndex=-1,i.addEventListener("focusout",()=>{e.tabIndex=0},{once:!0}))}}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function is({ariaLabel:t,disabled:e,focusListener:i,tabbable:a=!1}){return s`
    <span id="remove-label" hidden aria-hidden="true">Remove</span>
    <button
      class="trailing action"
      aria-label=${t||l}
      aria-labelledby=${t?l:"remove-label label"}
      tabindex=${a?l:-1}
      @click=${as}
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
  `}function as(t){this.disabled||this.softDisabled||(t.stopPropagation(),!this.dispatchEvent(new Event("remove",{cancelable:!0})))||this.remove()}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class De extends ts{constructor(){super(...arguments),this.elevated=!1,this.removable=!1,this.selected=!1,this.hasSelectedIcon=!1}get primaryId(){return"button"}getContainerClasses(){return{...super.getContainerClasses(),elevated:this.elevated,selected:this.selected,"has-trailing":this.removable,"has-icon":this.hasIcon||this.selected}}renderPrimaryAction(e){const{ariaLabel:i}=this;return s`
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
    `}renderLeadingIcon(){return this.selected?s`
      <slot name="selected-icon">
        <svg class="checkmark" viewBox="0 0 18 18" aria-hidden="true">
          <path
            d="M6.75012 12.1274L3.62262 8.99988L2.55762 10.0574L6.75012 14.2499L15.7501 5.24988L14.6926 4.19238L6.75012 12.1274Z" />
        </svg>
      </slot>
    `:super.renderLeadingIcon()}renderTrailingAction(e){return this.removable?is({focusListener:e,ariaLabel:this.ariaLabelRemove,disabled:this.disabled||this.softDisabled}):l}renderOutline(){return this.elevated?s`<md-elevation part="elevation"></md-elevation>`:super.renderOutline()}handleClickOnChild(e){if(this.disabled||this.softDisabled)return;const i=this.selected;if(this.selected=!this.selected,!Pi(this,e)){this.selected=i;return}}}p([m({type:Boolean})],De.prototype,"elevated",void 0);p([m({type:Boolean})],De.prototype,"removable",void 0);p([m({type:Boolean,reflect:!0})],De.prototype,"selected",void 0);p([m({type:Boolean,reflect:!0,attribute:"has-selected-icon"})],De.prototype,"hasSelectedIcon",void 0);p([S(".primary.action")],De.prototype,"primaryAction",void 0);p([S(".trailing.action")],De.prototype,"trailingAction",void 0);/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const rs=_`:host{--_container-height: var(--md-filter-chip-container-height, 32px);--_disabled-label-text-color: var(--md-filter-chip-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-filter-chip-disabled-label-text-opacity, 0.38);--_elevated-container-elevation: var(--md-filter-chip-elevated-container-elevation, 1);--_elevated-container-shadow-color: var(--md-filter-chip-elevated-container-shadow-color, var(--md-sys-color-shadow, #000));--_elevated-disabled-container-color: var(--md-filter-chip-elevated-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));--_elevated-disabled-container-elevation: var(--md-filter-chip-elevated-disabled-container-elevation, 0);--_elevated-disabled-container-opacity: var(--md-filter-chip-elevated-disabled-container-opacity, 0.12);--_elevated-focus-container-elevation: var(--md-filter-chip-elevated-focus-container-elevation, 1);--_elevated-hover-container-elevation: var(--md-filter-chip-elevated-hover-container-elevation, 2);--_elevated-pressed-container-elevation: var(--md-filter-chip-elevated-pressed-container-elevation, 1);--_elevated-selected-container-color: var(--md-filter-chip-elevated-selected-container-color, var(--md-sys-color-secondary-container, #e8def8));--_label-text-font: var(--md-filter-chip-label-text-font, var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-filter-chip-label-text-line-height, var(--md-sys-typescale-label-large-line-height, 1.25rem));--_label-text-size: var(--md-filter-chip-label-text-size, var(--md-sys-typescale-label-large-size, 0.875rem));--_label-text-weight: var(--md-filter-chip-label-text-weight, var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)));--_selected-focus-label-text-color: var(--md-filter-chip-selected-focus-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-hover-label-text-color: var(--md-filter-chip-selected-hover-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-hover-state-layer-color: var(--md-filter-chip-selected-hover-state-layer-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-hover-state-layer-opacity: var(--md-filter-chip-selected-hover-state-layer-opacity, 0.08);--_selected-label-text-color: var(--md-filter-chip-selected-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-pressed-label-text-color: var(--md-filter-chip-selected-pressed-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-pressed-state-layer-color: var(--md-filter-chip-selected-pressed-state-layer-color, var(--md-sys-color-on-surface-variant, #49454f));--_selected-pressed-state-layer-opacity: var(--md-filter-chip-selected-pressed-state-layer-opacity, 0.12);--_elevated-container-color: var(--md-filter-chip-elevated-container-color, var(--md-sys-color-surface-container-low, #f7f2fa));--_disabled-outline-color: var(--md-filter-chip-disabled-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-outline-opacity: var(--md-filter-chip-disabled-outline-opacity, 0.12);--_disabled-selected-container-color: var(--md-filter-chip-disabled-selected-container-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-selected-container-opacity: var(--md-filter-chip-disabled-selected-container-opacity, 0.12);--_focus-outline-color: var(--md-filter-chip-focus-outline-color, var(--md-sys-color-on-surface-variant, #49454f));--_outline-color: var(--md-filter-chip-outline-color, var(--md-sys-color-outline, #79747e));--_outline-width: var(--md-filter-chip-outline-width, 1px);--_selected-container-color: var(--md-filter-chip-selected-container-color, var(--md-sys-color-secondary-container, #e8def8));--_selected-outline-width: var(--md-filter-chip-selected-outline-width, 0px);--_focus-label-text-color: var(--md-filter-chip-focus-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-label-text-color: var(--md-filter-chip-hover-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-color: var(--md-filter-chip-hover-state-layer-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-opacity: var(--md-filter-chip-hover-state-layer-opacity, 0.08);--_label-text-color: var(--md-filter-chip-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-label-text-color: var(--md-filter-chip-pressed-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-state-layer-color: var(--md-filter-chip-pressed-state-layer-color, var(--md-sys-color-on-secondary-container, #1d192b));--_pressed-state-layer-opacity: var(--md-filter-chip-pressed-state-layer-opacity, 0.12);--_icon-size: var(--md-filter-chip-icon-size, 18px);--_disabled-leading-icon-color: var(--md-filter-chip-disabled-leading-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-leading-icon-opacity: var(--md-filter-chip-disabled-leading-icon-opacity, 0.38);--_selected-focus-leading-icon-color: var(--md-filter-chip-selected-focus-leading-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-hover-leading-icon-color: var(--md-filter-chip-selected-hover-leading-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-leading-icon-color: var(--md-filter-chip-selected-leading-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-pressed-leading-icon-color: var(--md-filter-chip-selected-pressed-leading-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_focus-leading-icon-color: var(--md-filter-chip-focus-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_hover-leading-icon-color: var(--md-filter-chip-hover-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_leading-icon-color: var(--md-filter-chip-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_pressed-leading-icon-color: var(--md-filter-chip-pressed-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_disabled-trailing-icon-color: var(--md-filter-chip-disabled-trailing-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-trailing-icon-opacity: var(--md-filter-chip-disabled-trailing-icon-opacity, 0.38);--_selected-focus-trailing-icon-color: var(--md-filter-chip-selected-focus-trailing-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-hover-trailing-icon-color: var(--md-filter-chip-selected-hover-trailing-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-pressed-trailing-icon-color: var(--md-filter-chip-selected-pressed-trailing-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-trailing-icon-color: var(--md-filter-chip-selected-trailing-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_focus-trailing-icon-color: var(--md-filter-chip-focus-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-trailing-icon-color: var(--md-filter-chip-hover-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-trailing-icon-color: var(--md-filter-chip-pressed-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_trailing-icon-color: var(--md-filter-chip-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_container-shape-start-start: var(--md-filter-chip-container-shape-start-start, var(--md-filter-chip-container-shape, var(--md-sys-shape-corner-small, 8px)));--_container-shape-start-end: var(--md-filter-chip-container-shape-start-end, var(--md-filter-chip-container-shape, var(--md-sys-shape-corner-small, 8px)));--_container-shape-end-end: var(--md-filter-chip-container-shape-end-end, var(--md-filter-chip-container-shape, var(--md-sys-shape-corner-small, 8px)));--_container-shape-end-start: var(--md-filter-chip-container-shape-end-start, var(--md-filter-chip-container-shape, var(--md-sys-shape-corner-small, 8px)));--_leading-space: var(--md-filter-chip-leading-space, 16px);--_trailing-space: var(--md-filter-chip-trailing-space, 16px);--_icon-label-space: var(--md-filter-chip-icon-label-space, 8px);--_with-leading-icon-leading-space: var(--md-filter-chip-with-leading-icon-leading-space, 8px);--_with-trailing-icon-trailing-space: var(--md-filter-chip-with-trailing-icon-trailing-space, 8px)}.selected.elevated::before{background:var(--_elevated-selected-container-color)}.checkmark{height:var(--_icon-size);width:var(--_icon-size)}.disabled .checkmark{opacity:var(--_disabled-leading-icon-opacity)}@media(forced-colors: active){.disabled .checkmark{opacity:1}}
`;/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const os=_`.selected{--md-ripple-hover-color: var(--_selected-hover-state-layer-color);--md-ripple-hover-opacity: var(--_selected-hover-state-layer-opacity);--md-ripple-pressed-color: var(--_selected-pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_selected-pressed-state-layer-opacity)}:where(.selected)::before{background:var(--_selected-container-color)}:where(.selected) .outline{border-width:var(--_selected-outline-width)}:where(.selected.disabled)::before{background:var(--_disabled-selected-container-color);opacity:var(--_disabled-selected-container-opacity)}:where(.selected) .label{color:var(--_selected-label-text-color)}:where(.selected:hover) .label{color:var(--_selected-hover-label-text-color)}:where(.selected:focus) .label{color:var(--_selected-focus-label-text-color)}:where(.selected:active) .label{color:var(--_selected-pressed-label-text-color)}:where(.selected) .leading.icon{color:var(--_selected-leading-icon-color)}:where(.selected:hover) .leading.icon{color:var(--_selected-hover-leading-icon-color)}:where(.selected:focus) .leading.icon{color:var(--_selected-focus-leading-icon-color)}:where(.selected:active) .leading.icon{color:var(--_selected-pressed-leading-icon-color)}@media(forced-colors: active){:where(.selected:not(.elevated))::before{border:1px solid CanvasText}:where(.selected) .outline{border-width:1px}}
`;/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const ss=_`.trailing.action{align-items:center;justify-content:center;padding-inline-start:var(--_icon-label-space);padding-inline-end:var(--_with-trailing-icon-trailing-space)}.trailing.action :is(md-ripple,md-focus-ring){border-radius:50%;height:calc(1.3333333333*var(--_icon-size));width:calc(1.3333333333*var(--_icon-size))}.trailing.action md-focus-ring{inset:unset}.has-trailing .primary.action{padding-inline-end:0}.trailing.icon{color:var(--_trailing-icon-color);height:var(--_icon-size);width:var(--_icon-size)}:where(:hover) .trailing.icon{color:var(--_hover-trailing-icon-color)}:where(:focus) .trailing.icon{color:var(--_focus-trailing-icon-color)}:where(:active) .trailing.icon{color:var(--_pressed-trailing-icon-color)}:where(.disabled) .trailing.icon{color:var(--_disabled-trailing-icon-color);opacity:var(--_disabled-trailing-icon-opacity)}:where(.selected) .trailing.icon{color:var(--_selected-trailing-icon-color)}:where(.selected:hover) .trailing.icon{color:var(--_selected-hover-trailing-icon-color)}:where(.selected:focus) .trailing.icon{color:var(--_selected-focus-trailing-icon-color)}:where(.selected:active) .trailing.icon{color:var(--_selected-pressed-trailing-icon-color)}@media(forced-colors: active){.trailing.icon{color:ButtonText}:where(.disabled) .trailing.icon{color:GrayText;opacity:1}}
`;/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let mi=class extends De{};mi.styles=[Fa,Ra,ss,os,rs];mi=p([I("md-filter-chip")],mi);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const ns=_e(C);class at extends ns{constructor(){super(...arguments),this.size="medium",this.label="",this.lowered=!1}render(){const{ariaLabel:e}=this;return s`
      <button
        class="fab ${te(this.getRenderClasses())}"
        aria-label=${e||l}>
        <md-elevation part="elevation"></md-elevation>
        <md-focus-ring part="focus-ring"></md-focus-ring>
        <md-ripple class="ripple"></md-ripple>
        ${this.renderTouchTarget()} ${this.renderIcon()} ${this.renderLabel()}
      </button>
    `}getRenderClasses(){const e=!!this.label;return{lowered:this.lowered,small:this.size==="small"&&!e,large:this.size==="large"&&!e,extended:e}}renderTouchTarget(){return s`<div class="touch-target"></div>`}renderLabel(){return this.label?s`<span class="label">${this.label}</span>`:""}renderIcon(){const{ariaLabel:e}=this;return s`<span class="icon">
      <slot
        name="icon"
        aria-hidden=${e||this.label?"true":l}>
        <span></span>
      </slot>
    </span>`}}at.shadowRootOptions={mode:"open",delegatesFocus:!0};p([m({reflect:!0})],at.prototype,"size",void 0);p([m()],at.prototype,"label",void 0);p([m({type:Boolean})],at.prototype,"lowered",void 0);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Na extends at{constructor(){super(...arguments),this.variant="surface"}getRenderClasses(){return{...super.getRenderClasses(),primary:this.variant==="primary",secondary:this.variant==="secondary",tertiary:this.variant==="tertiary"}}}p([m()],Na.prototype,"variant",void 0);/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const ls=_`:host{--_container-color: var(--md-fab-container-color, var(--md-sys-color-surface-container-high, #ece6f0));--_container-elevation: var(--md-fab-container-elevation, 3);--_container-height: var(--md-fab-container-height, 56px);--_container-shadow-color: var(--md-fab-container-shadow-color, var(--md-sys-color-shadow, #000));--_container-width: var(--md-fab-container-width, 56px);--_focus-container-elevation: var(--md-fab-focus-container-elevation, 3);--_focus-icon-color: var(--md-fab-focus-icon-color, var(--md-sys-color-primary, #6750a4));--_hover-container-elevation: var(--md-fab-hover-container-elevation, 4);--_hover-icon-color: var(--md-fab-hover-icon-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-color: var(--md-fab-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-opacity: var(--md-fab-hover-state-layer-opacity, 0.08);--_icon-color: var(--md-fab-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-size: var(--md-fab-icon-size, 24px);--_lowered-container-color: var(--md-fab-lowered-container-color, var(--md-sys-color-surface-container-low, #f7f2fa));--_lowered-container-elevation: var(--md-fab-lowered-container-elevation, 1);--_lowered-focus-container-elevation: var(--md-fab-lowered-focus-container-elevation, 1);--_lowered-hover-container-elevation: var(--md-fab-lowered-hover-container-elevation, 2);--_lowered-pressed-container-elevation: var(--md-fab-lowered-pressed-container-elevation, 1);--_pressed-container-elevation: var(--md-fab-pressed-container-elevation, 3);--_pressed-icon-color: var(--md-fab-pressed-icon-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-color: var(--md-fab-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-opacity: var(--md-fab-pressed-state-layer-opacity, 0.12);--_focus-label-text-color: var(--md-fab-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_hover-label-text-color: var(--md-fab-hover-label-text-color, var(--md-sys-color-primary, #6750a4));--_label-text-color: var(--md-fab-label-text-color, var(--md-sys-color-primary, #6750a4));--_label-text-font: var(--md-fab-label-text-font, var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-fab-label-text-line-height, var(--md-sys-typescale-label-large-line-height, 1.25rem));--_label-text-size: var(--md-fab-label-text-size, var(--md-sys-typescale-label-large-size, 0.875rem));--_label-text-weight: var(--md-fab-label-text-weight, var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)));--_large-container-height: var(--md-fab-large-container-height, 96px);--_large-container-width: var(--md-fab-large-container-width, 96px);--_large-icon-size: var(--md-fab-large-icon-size, 36px);--_pressed-label-text-color: var(--md-fab-pressed-label-text-color, var(--md-sys-color-primary, #6750a4));--_primary-container-color: var(--md-fab-primary-container-color, var(--md-sys-color-primary-container, #eaddff));--_primary-focus-icon-color: var(--md-fab-primary-focus-icon-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-focus-label-text-color: var(--md-fab-primary-focus-label-text-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-hover-icon-color: var(--md-fab-primary-hover-icon-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-hover-label-text-color: var(--md-fab-primary-hover-label-text-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-hover-state-layer-color: var(--md-fab-primary-hover-state-layer-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-icon-color: var(--md-fab-primary-icon-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-label-text-color: var(--md-fab-primary-label-text-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-pressed-icon-color: var(--md-fab-primary-pressed-icon-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-pressed-label-text-color: var(--md-fab-primary-pressed-label-text-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-pressed-state-layer-color: var(--md-fab-primary-pressed-state-layer-color, var(--md-sys-color-on-primary-container, #21005d));--_secondary-container-color: var(--md-fab-secondary-container-color, var(--md-sys-color-secondary-container, #e8def8));--_secondary-focus-icon-color: var(--md-fab-secondary-focus-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-focus-label-text-color: var(--md-fab-secondary-focus-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-hover-icon-color: var(--md-fab-secondary-hover-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-hover-label-text-color: var(--md-fab-secondary-hover-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-hover-state-layer-color: var(--md-fab-secondary-hover-state-layer-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-icon-color: var(--md-fab-secondary-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-label-text-color: var(--md-fab-secondary-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-pressed-icon-color: var(--md-fab-secondary-pressed-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-pressed-label-text-color: var(--md-fab-secondary-pressed-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-pressed-state-layer-color: var(--md-fab-secondary-pressed-state-layer-color, var(--md-sys-color-on-secondary-container, #1d192b));--_small-container-height: var(--md-fab-small-container-height, 40px);--_small-container-width: var(--md-fab-small-container-width, 40px);--_small-icon-size: var(--md-fab-small-icon-size, 24px);--_tertiary-container-color: var(--md-fab-tertiary-container-color, var(--md-sys-color-tertiary-container, #ffd8e4));--_tertiary-focus-icon-color: var(--md-fab-tertiary-focus-icon-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-focus-label-text-color: var(--md-fab-tertiary-focus-label-text-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-hover-icon-color: var(--md-fab-tertiary-hover-icon-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-hover-label-text-color: var(--md-fab-tertiary-hover-label-text-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-hover-state-layer-color: var(--md-fab-tertiary-hover-state-layer-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-icon-color: var(--md-fab-tertiary-icon-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-label-text-color: var(--md-fab-tertiary-label-text-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-pressed-icon-color: var(--md-fab-tertiary-pressed-icon-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-pressed-label-text-color: var(--md-fab-tertiary-pressed-label-text-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-pressed-state-layer-color: var(--md-fab-tertiary-pressed-state-layer-color, var(--md-sys-color-on-tertiary-container, #31111d));--_container-shape-start-start: var(--md-fab-container-shape-start-start, var(--md-fab-container-shape, var(--md-sys-shape-corner-large, 16px)));--_container-shape-start-end: var(--md-fab-container-shape-start-end, var(--md-fab-container-shape, var(--md-sys-shape-corner-large, 16px)));--_container-shape-end-end: var(--md-fab-container-shape-end-end, var(--md-fab-container-shape, var(--md-sys-shape-corner-large, 16px)));--_container-shape-end-start: var(--md-fab-container-shape-end-start, var(--md-fab-container-shape, var(--md-sys-shape-corner-large, 16px)));--_large-container-shape-start-start: var(--md-fab-large-container-shape-start-start, var(--md-fab-large-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));--_large-container-shape-start-end: var(--md-fab-large-container-shape-start-end, var(--md-fab-large-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));--_large-container-shape-end-end: var(--md-fab-large-container-shape-end-end, var(--md-fab-large-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));--_large-container-shape-end-start: var(--md-fab-large-container-shape-end-start, var(--md-fab-large-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));--_small-container-shape-start-start: var(--md-fab-small-container-shape-start-start, var(--md-fab-small-container-shape, var(--md-sys-shape-corner-medium, 12px)));--_small-container-shape-start-end: var(--md-fab-small-container-shape-start-end, var(--md-fab-small-container-shape, var(--md-sys-shape-corner-medium, 12px)));--_small-container-shape-end-end: var(--md-fab-small-container-shape-end-end, var(--md-fab-small-container-shape, var(--md-sys-shape-corner-medium, 12px)));--_small-container-shape-end-start: var(--md-fab-small-container-shape-end-start, var(--md-fab-small-container-shape, var(--md-sys-shape-corner-medium, 12px)));cursor:pointer}:host([size=small][touch-target=wrapper]){margin:max(0px,48px - var(--_small-container-height))}.fab .icon ::slotted(*){color:var(--_icon-color)}.fab:focus{color:var(--_focus-icon-color)}.fab:hover{color:var(--_hover-icon-color)}.fab:active{color:var(--_pressed-icon-color)}.fab{cursor:inherit}.fab.primary{background-color:var(--_primary-container-color);--md-ripple-hover-color: var(--_primary-hover-state-layer-color);--md-ripple-pressed-color: var(--_primary-pressed-state-layer-color)}.fab.primary .icon ::slotted(*){color:var(--_primary-icon-color)}.fab.primary:focus{color:var(--_primary-focus-icon-color)}.fab.primary:hover{color:var(--_primary-hover-icon-color)}.fab.primary:active{color:var(--_primary-pressed-icon-color)}.fab.primary .label{color:var(--_primary-label-text-color)}.fab:hover .fab.primary .label{color:var(--_primary-hover-label-text-color)}.fab:focus .fab.primary .label{color:var(--_primary-focus-label-text-color)}.fab:active .fab.primary .label{color:var(--_primary-pressed-label-text-color)}.fab.secondary{background-color:var(--_secondary-container-color);--md-ripple-hover-color: var(--_secondary-hover-state-layer-color);--md-ripple-pressed-color: var(--_secondary-pressed-state-layer-color)}.fab.secondary .icon ::slotted(*){color:var(--_secondary-icon-color)}.fab.secondary:focus{color:var(--_secondary-focus-icon-color)}.fab.secondary:hover{color:var(--_secondary-hover-icon-color)}.fab.secondary:active{color:var(--_secondary-pressed-icon-color)}.fab.secondary .label{color:var(--_secondary-label-text-color)}.fab:hover .fab.secondary .label{color:var(--_secondary-hover-label-text-color)}.fab:focus .fab.secondary .label{color:var(--_secondary-focus-label-text-color)}.fab:active .fab.secondary .label{color:var(--_secondary-pressed-label-text-color)}.fab.tertiary{background-color:var(--_tertiary-container-color);--md-ripple-hover-color: var(--_tertiary-hover-state-layer-color);--md-ripple-pressed-color: var(--_tertiary-pressed-state-layer-color)}.fab.tertiary .icon ::slotted(*){color:var(--_tertiary-icon-color)}.fab.tertiary:focus{color:var(--_tertiary-focus-icon-color)}.fab.tertiary:hover{color:var(--_tertiary-hover-icon-color)}.fab.tertiary:active{color:var(--_tertiary-pressed-icon-color)}.fab.tertiary .label{color:var(--_tertiary-label-text-color)}.fab:hover .fab.tertiary .label{color:var(--_tertiary-hover-label-text-color)}.fab:focus .fab.tertiary .label{color:var(--_tertiary-focus-label-text-color)}.fab:active .fab.tertiary .label{color:var(--_tertiary-pressed-label-text-color)}.fab.extended slot span{padding-inline-start:4px}.fab.small{width:var(--_small-container-width);height:var(--_small-container-height)}.fab.small .icon ::slotted(*){width:var(--_small-icon-size);height:var(--_small-icon-size);font-size:var(--_small-icon-size)}.fab.small,.fab.small .ripple{border-start-start-radius:var(--_small-container-shape-start-start);border-start-end-radius:var(--_small-container-shape-start-end);border-end-start-radius:var(--_small-container-shape-end-start);border-end-end-radius:var(--_small-container-shape-end-end)}.fab.small md-focus-ring{--md-focus-ring-shape-start-start: var(--_small-container-shape-start-start);--md-focus-ring-shape-start-end: var(--_small-container-shape-start-end);--md-focus-ring-shape-end-end: var(--_small-container-shape-end-end);--md-focus-ring-shape-end-start: var(--_small-container-shape-end-start)}
`;/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const ds=_`@media(forced-colors: active){.fab{border:1px solid ButtonText}.fab.extended{padding-inline-start:15px;padding-inline-end:19px}md-focus-ring{--md-focus-ring-outward-offset: 3px}}
`;/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const cs=_`:host{--md-ripple-hover-opacity: var(--_hover-state-layer-opacity);--md-ripple-pressed-opacity: var(--_pressed-state-layer-opacity);display:inline-flex;-webkit-tap-highlight-color:rgba(0,0,0,0)}:host([size=medium][touch-target=wrapper]){margin:max(0px,48px - var(--_container-height))}:host([size=large][touch-target=wrapper]){margin:max(0px,48px - var(--_large-container-height))}.fab,.icon,.icon ::slotted(*){display:flex}.fab{align-items:center;justify-content:center;vertical-align:middle;padding:0;position:relative;height:var(--_container-height);transition-property:background-color;border-width:0px;outline:none;z-index:0;text-transform:inherit}.fab.extended{width:inherit;box-sizing:border-box;padding-inline-start:16px;padding-inline-end:20px}.fab:not(.extended){width:var(--_container-width)}.fab.large{width:var(--_large-container-width);height:var(--_large-container-height)}.fab.large .icon ::slotted(*){width:var(--_large-icon-size);height:var(--_large-icon-size);font-size:var(--_large-icon-size)}.fab.large,.fab.large .ripple{border-start-start-radius:var(--_large-container-shape-start-start);border-start-end-radius:var(--_large-container-shape-start-end);border-end-start-radius:var(--_large-container-shape-end-start);border-end-end-radius:var(--_large-container-shape-end-end)}.fab.large md-focus-ring{--md-focus-ring-shape-start-start: var(--_large-container-shape-start-start);--md-focus-ring-shape-start-end: var(--_large-container-shape-start-end);--md-focus-ring-shape-end-end: var(--_large-container-shape-end-end);--md-focus-ring-shape-end-start: var(--_large-container-shape-end-start)}.fab{--md-elevation-level: var(--_container-elevation);--md-elevation-shadow-color: var(--_container-shadow-color)}.fab:focus{--md-elevation-level: var(--_focus-container-elevation)}.fab:hover{--md-elevation-level: var(--_hover-container-elevation)}.fab:active{--md-elevation-level: var(--_pressed-container-elevation)}.fab.lowered{background-color:var(--_lowered-container-color);--md-elevation-level: var(--_lowered-container-elevation)}.fab.lowered:focus{--md-elevation-level: var(--_lowered-focus-container-elevation)}.fab.lowered:hover{--md-elevation-level: var(--_lowered-hover-container-elevation)}.fab.lowered:active{--md-elevation-level: var(--_lowered-pressed-container-elevation)}.fab{background-color:var(--_container-color);--md-ripple-hover-color: var(--_hover-state-layer-color);--md-ripple-pressed-color: var(--_pressed-state-layer-color)}.fab .label{color:var(--_label-text-color)}.fab:hover .fab .label{color:var(--_hover-label-text-color)}.fab:focus .fab .label{color:var(--_focus-label-text-color)}.fab:active .fab .label{color:var(--_pressed-label-text-color)}.label{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-family:var(--_label-text-font);font-size:var(--_label-text-size);line-height:var(--_label-text-line-height);font-weight:var(--_label-text-weight)}.fab.extended .icon ::slotted(*){margin-inline-end:12px}.ripple{overflow:hidden}.ripple,md-elevation{z-index:-1}.touch-target{position:absolute;top:50%;height:48px;left:50%;width:48px;transform:translate(-50%, -50%)}:host([touch-target=none]) .touch-target{display:none}md-elevation,.fab{transition-duration:280ms;transition-timing-function:cubic-bezier(0.2, 0, 0, 1)}.fab,.ripple{border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end)}md-focus-ring{--md-focus-ring-shape-start-start: var(--_container-shape-start-start);--md-focus-ring-shape-start-end: var(--_container-shape-start-end);--md-focus-ring-shape-end-end: var(--_container-shape-end-end);--md-focus-ring-shape-end-start: var(--_container-shape-end-start)}.icon ::slotted(*){width:var(--_icon-size);height:var(--_icon-size);font-size:var(--_icon-size)}
`;/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let vi=class extends Na{};vi.styles=[cs,ls,ds];vi=p([I("md-fab")],vi);/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class ps extends C{render(){return s`<slot></slot>`}connectedCallback(){if(super.connectedCallback(),this.getAttribute("aria-hidden")==="false"){this.removeAttribute("aria-hidden");return}this.setAttribute("aria-hidden","true")}}/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const hs=_`:host{font-size:var(--md-icon-size, 24px);width:var(--md-icon-size, 24px);height:var(--md-icon-size, 24px);color:inherit;font-variation-settings:inherit;font-weight:400;font-family:var(--md-icon-font, Material Symbols Outlined);display:inline-flex;font-style:normal;place-items:center;place-content:center;line-height:1;overflow:hidden;letter-spacing:normal;text-transform:none;user-select:none;white-space:nowrap;word-wrap:normal;flex-shrink:0;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale}::slotted(svg){fill:currentColor}::slotted(*){height:100%;width:100%}
`;/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let fi=class extends ps{};fi.styles=[hs];fi=p([I("md-icon")],fi);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function Ba(t,e=me){const i=Ha(t,e);return i&&(i.tabIndex=0,i.focus()),i}function Ua(t,e=me){const i=us(t,e);return i&&(i.tabIndex=0,i.focus()),i}function Ut(t,e=me){for(let i=0;i<t.length;i++){const a=t[i];if(a.tabIndex===0&&e(a))return{item:a,index:i}}return null}function Ha(t,e=me){for(const i of t)if(e(i))return i;return null}function us(t,e=me){for(let i=t.length-1;i>=0;i--){const a=t[i];if(e(a))return a}return null}function ms(t,e,i=me,a=!0){for(let r=1;r<t.length;r++){const o=(r+e)%t.length;if(o<e&&!a)return null;const n=t[o];if(i(n))return n}return t[e]?t[e]:null}function vs(t,e,i=me,a=!0){for(let r=1;r<t.length;r++){const o=(e-r+t.length)%t.length;if(o>e&&!a)return null;const n=t[o];if(i(n))return n}return t[e]?t[e]:null}function la(t,e,i=me,a=!0){if(e){const r=ms(t,e.index,i,a);return r&&(r.tabIndex=0,r.focus()),r}else return Ba(t,i)}function da(t,e,i=me,a=!0){if(e){const r=vs(t,e.index,i,a);return r&&(r.tabIndex=0,r.focus()),r}else return Ua(t,i)}function fs(){return new Event("request-activation",{bubbles:!0,composed:!0})}function me(t){return!t.disabled}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const de={ArrowDown:"ArrowDown",ArrowLeft:"ArrowLeft",ArrowUp:"ArrowUp",ArrowRight:"ArrowRight",Home:"Home",End:"End"};class gs{constructor(e){this.handleKeydown=g=>{const u=g.key;if(g.defaultPrevented||!this.isNavigableKey(u))return;const y=this.items;if(!y.length)return;const $=Ut(y,this.isActivatable);g.preventDefault();const O=this.isRtl(),ae=O?de.ArrowRight:de.ArrowLeft,re=O?de.ArrowLeft:de.ArrowRight;let X=null;switch(u){case de.ArrowDown:case re:X=la(y,$,this.isActivatable,this.wrapNavigation());break;case de.ArrowUp:case ae:X=da(y,$,this.isActivatable,this.wrapNavigation());break;case de.Home:X=Ba(y,this.isActivatable);break;case de.End:X=Ua(y,this.isActivatable);break}X&&$&&$.item!==X&&($.item.tabIndex=-1)},this.onDeactivateItems=()=>{const g=this.items;for(const u of g)this.deactivateItem(u)},this.onRequestActivation=g=>{this.onDeactivateItems();const u=g.target;this.activateItem(u),u.focus()},this.onSlotchange=()=>{const g=this.items;let u=!1;for(const $ of g){if(!$.disabled&&$.tabIndex>-1&&!u){u=!0,$.tabIndex=0;continue}$.tabIndex=-1}if(u)return;const y=Ha(g,this.isActivatable);y&&(y.tabIndex=0)};const{isItem:i,getPossibleItems:a,isRtl:r,deactivateItem:o,activateItem:n,isNavigableKey:c,isActivatable:h,wrapNavigation:f}=e;this.isItem=i,this.getPossibleItems=a,this.isRtl=r,this.deactivateItem=o,this.activateItem=n,this.isNavigableKey=c,this.isActivatable=h,this.wrapNavigation=f??(()=>!0)}get items(){const e=this.getPossibleItems(),i=[];for(const a of e){if(this.isItem(a)){i.push(a);continue}const o=a.item;o&&this.isItem(o)&&i.push(o)}return i}activateNextItem(){const e=this.items,i=Ut(e,this.isActivatable);return i&&(i.item.tabIndex=-1),la(e,i,this.isActivatable,this.wrapNavigation())}activatePreviousItem(){const e=this.items,i=Ut(e,this.isActivatable);return i&&(i.item.tabIndex=-1),da(e,i,this.isActivatable,this.wrapNavigation())}}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const bs=new Set(Object.values(de));class ja extends C{get items(){return this.listController.items}constructor(){super(),this.listController=new gs({isItem:e=>e.hasAttribute("md-list-item"),getPossibleItems:()=>this.slotItems,isRtl:()=>getComputedStyle(this).direction==="rtl",deactivateItem:e=>{e.tabIndex=-1},activateItem:e=>{e.tabIndex=0},isNavigableKey:e=>bs.has(e),isActivatable:e=>!e.disabled&&e.type!=="text"}),this.internals=this.attachInternals(),this.internals.role="list",this.addEventListener("keydown",this.listController.handleKeydown)}render(){return s`
      <slot
        @deactivate-items=${this.listController.onDeactivateItems}
        @request-activation=${this.listController.onRequestActivation}
        @slotchange=${this.listController.onSlotchange}>
      </slot>
    `}activateNextItem(){return this.listController.activateNextItem()}activatePreviousItem(){return this.listController.activatePreviousItem()}}p([we({flatten:!0})],ja.prototype,"slotItems",void 0);/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const ys=_`:host{background:var(--md-list-container-color, var(--md-sys-color-surface, #fef7ff));color:unset;display:flex;flex-direction:column;outline:none;padding:8px 0;position:relative}
`;/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let gi=class extends ja{};gi.styles=[ys];gi=p([I("md-list")],gi);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Mi extends C{constructor(){super(...arguments),this.multiline=!1}render(){return s`
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
    `}handleTextSlotChange(){let e=!1,i=0;for(const a of this.textSlots)if(xs(a)&&(i+=1),i>1){e=!0;break}this.multiline=e}}p([m({type:Boolean,reflect:!0})],Mi.prototype,"multiline",void 0);p([Ar(".text slot")],Mi.prototype,"textSlots",void 0);function xs(t){var e;for(const i of t.assignedNodes({flatten:!0})){const a=i.nodeType===Node.ELEMENT_NODE,r=i.nodeType===Node.TEXT_NODE&&((e=i.textContent)==null?void 0:e.match(/\S/));if(a||r)return!0}return!1}/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const ws=_`:host{color:var(--md-sys-color-on-surface, #1d1b20);font-family:var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto));font-size:var(--md-sys-typescale-body-large-size, 1rem);font-weight:var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400));line-height:var(--md-sys-typescale-body-large-line-height, 1.5rem);align-items:center;box-sizing:border-box;display:flex;gap:16px;min-height:56px;overflow:hidden;padding:12px 16px;position:relative;text-overflow:ellipsis}:host([multiline]){min-height:72px}[name=overline]{color:var(--md-sys-color-on-surface-variant, #49454f);font-family:var(--md-sys-typescale-label-small-font, var(--md-ref-typeface-plain, Roboto));font-size:var(--md-sys-typescale-label-small-size, 0.6875rem);font-weight:var(--md-sys-typescale-label-small-weight, var(--md-ref-typeface-weight-medium, 500));line-height:var(--md-sys-typescale-label-small-line-height, 1rem)}[name=supporting-text]{color:var(--md-sys-color-on-surface-variant, #49454f);font-family:var(--md-sys-typescale-body-medium-font, var(--md-ref-typeface-plain, Roboto));font-size:var(--md-sys-typescale-body-medium-size, 0.875rem);font-weight:var(--md-sys-typescale-body-medium-weight, var(--md-ref-typeface-weight-regular, 400));line-height:var(--md-sys-typescale-body-medium-line-height, 1.25rem)}[name=trailing-supporting-text]{color:var(--md-sys-color-on-surface-variant, #49454f);font-family:var(--md-sys-typescale-label-small-font, var(--md-ref-typeface-plain, Roboto));font-size:var(--md-sys-typescale-label-small-size, 0.6875rem);font-weight:var(--md-sys-typescale-label-small-weight, var(--md-ref-typeface-weight-medium, 500));line-height:var(--md-sys-typescale-label-small-line-height, 1rem)}[name=container]::slotted(*){inset:0;position:absolute}.default-slot{display:inline}.default-slot,.text ::slotted(*){overflow:hidden;text-overflow:ellipsis}.text{display:flex;flex:1;flex-direction:column;overflow:hidden}
`;/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let bi=class extends Mi{};bi.styles=[ws];bi=p([I("md-item")],bi);/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const _s=_e(C);class $e extends _s{constructor(){super(...arguments),this.disabled=!1,this.type="text",this.isListItem=!0,this.href="",this.target=""}get isDisabled(){return this.disabled&&this.type!=="link"}willUpdate(e){this.href&&(this.type="link"),super.willUpdate(e)}render(){return this.renderListItem(s`
      <md-item>
        <div slot="container">
          ${this.renderRipple()} ${this.renderFocusRing()}
        </div>
        <slot name="start" slot="start"></slot>
        <slot name="end" slot="end"></slot>
        ${this.renderBody()}
      </md-item>
    `)}renderListItem(e){const i=this.type==="link";let a;switch(this.type){case"link":a=pe`a`;break;case"button":a=pe`button`;break;default:case"text":a=pe`li`;break}const r=this.type!=="text",o=i&&this.target?this.target:l;return Oi`
      <${a}
        id="item"
        tabindex="${this.isDisabled||!r?-1:0}"
        ?disabled=${this.isDisabled}
        role="listitem"
        aria-selected=${this.ariaSelected||l}
        aria-checked=${this.ariaChecked||l}
        aria-expanded=${this.ariaExpanded||l}
        aria-haspopup=${this.ariaHasPopup||l}
        class="list-item ${te(this.getRenderClasses())}"
        href=${this.href||l}
        target=${o}
        @focus=${this.onFocus}
      >${e}</${a}>
    `}renderRipple(){return this.type==="text"?l:s` <md-ripple
      part="ripple"
      for="item"
      ?disabled=${this.isDisabled}></md-ripple>`}renderFocusRing(){return this.type==="text"?l:s` <md-focus-ring
      @visibility-changed=${this.onFocusRingVisibilityChanged}
      part="focus-ring"
      for="item"
      inward></md-focus-ring>`}onFocusRingVisibilityChanged(e){}getRenderClasses(){return{disabled:this.isDisabled}}renderBody(){return s`
      <slot></slot>
      <slot name="overline" slot="overline"></slot>
      <slot name="headline" slot="headline"></slot>
      <slot name="supporting-text" slot="supporting-text"></slot>
      <slot
        name="trailing-supporting-text"
        slot="trailing-supporting-text"></slot>
    `}onFocus(){this.tabIndex===-1&&this.dispatchEvent(fs())}focus(){var e;(e=this.listItemRoot)==null||e.focus()}click(){if(!this.listItemRoot){super.click();return}this.listItemRoot.click()}}$e.shadowRootOptions={...C.shadowRootOptions,delegatesFocus:!0};p([m({type:Boolean,reflect:!0})],$e.prototype,"disabled",void 0);p([m({reflect:!0})],$e.prototype,"type",void 0);p([m({type:Boolean,attribute:"md-list-item",reflect:!0})],$e.prototype,"isListItem",void 0);p([m()],$e.prototype,"href",void 0);p([m()],$e.prototype,"target",void 0);p([S(".list-item")],$e.prototype,"listItemRoot",void 0);/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const $s=_`:host{display:flex;-webkit-tap-highlight-color:rgba(0,0,0,0);--md-ripple-hover-color: var(--md-list-item-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--md-ripple-hover-opacity: var(--md-list-item-hover-state-layer-opacity, 0.08);--md-ripple-pressed-color: var(--md-list-item-pressed-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--md-ripple-pressed-opacity: var(--md-list-item-pressed-state-layer-opacity, 0.12)}:host(:is([type=button]:not([disabled]),[type=link])){cursor:pointer}md-focus-ring{z-index:1;--md-focus-ring-shape: 8px}a,button,li{background:none;border:none;cursor:inherit;padding:0;margin:0;text-align:unset;text-decoration:none}.list-item{border-radius:inherit;display:flex;flex:1;max-width:inherit;min-width:inherit;outline:none;-webkit-tap-highlight-color:rgba(0,0,0,0);width:100%}.list-item.interactive{cursor:pointer}.list-item.disabled{opacity:var(--md-list-item-disabled-opacity, 0.3);pointer-events:none}[slot=container]{pointer-events:none}md-ripple{border-radius:inherit}md-item{border-radius:inherit;flex:1;height:100%;color:var(--md-list-item-label-text-color, var(--md-sys-color-on-surface, #1d1b20));font-family:var(--md-list-item-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));font-size:var(--md-list-item-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));line-height:var(--md-list-item-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));font-weight:var(--md-list-item-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));min-height:var(--md-list-item-one-line-container-height, 56px);padding-top:var(--md-list-item-top-space, 12px);padding-bottom:var(--md-list-item-bottom-space, 12px);padding-inline-start:var(--md-list-item-leading-space, 16px);padding-inline-end:var(--md-list-item-trailing-space, 16px)}md-item[multiline]{min-height:var(--md-list-item-two-line-container-height, 72px)}[slot=supporting-text]{color:var(--md-list-item-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));font-family:var(--md-list-item-supporting-text-font, var(--md-sys-typescale-body-medium-font, var(--md-ref-typeface-plain, Roboto)));font-size:var(--md-list-item-supporting-text-size, var(--md-sys-typescale-body-medium-size, 0.875rem));line-height:var(--md-list-item-supporting-text-line-height, var(--md-sys-typescale-body-medium-line-height, 1.25rem));font-weight:var(--md-list-item-supporting-text-weight, var(--md-sys-typescale-body-medium-weight, var(--md-ref-typeface-weight-regular, 400)))}[slot=trailing-supporting-text]{color:var(--md-list-item-trailing-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));font-family:var(--md-list-item-trailing-supporting-text-font, var(--md-sys-typescale-label-small-font, var(--md-ref-typeface-plain, Roboto)));font-size:var(--md-list-item-trailing-supporting-text-size, var(--md-sys-typescale-label-small-size, 0.6875rem));line-height:var(--md-list-item-trailing-supporting-text-line-height, var(--md-sys-typescale-label-small-line-height, 1rem));font-weight:var(--md-list-item-trailing-supporting-text-weight, var(--md-sys-typescale-label-small-weight, var(--md-ref-typeface-weight-medium, 500)))}:is([slot=start],[slot=end])::slotted(*){fill:currentColor}[slot=start]{color:var(--md-list-item-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f))}[slot=end]{color:var(--md-list-item-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f))}@media(forced-colors: active){.disabled slot{color:GrayText}.list-item.disabled{color:GrayText;opacity:1}}
`;/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let yi=class extends $e{};yi.styles=[$s];yi=p([I("md-list-item")],yi);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const pt=Symbol("isFocusable"),Ht=Symbol("privateIsFocusable"),ht=Symbol("externalTabIndex"),ut=Symbol("isUpdatingTabIndex"),mt=Symbol("updateTabIndex");function ks(t){var e,i,a;class r extends t{constructor(){super(...arguments),this[e]=!0,this[i]=null,this[a]=!1}get[pt](){return this[Ht]}set[pt](n){this[pt]!==n&&(this[Ht]=n,this[mt]())}connectedCallback(){super.connectedCallback(),this[mt]()}attributeChangedCallback(n,c,h){if(n!=="tabindex"){super.attributeChangedCallback(n,c,h);return}if(this.requestUpdate("tabIndex",Number(c??-1)),!this[ut]){if(!this.hasAttribute("tabindex")){this[ht]=null,this[mt]();return}this[ht]=this.tabIndex}}[(e=Ht,i=ht,a=ut,mt)](){const n=this[pt]?0:-1,c=this[ht]??n;this[ut]=!0,this.tabIndex=c,this[ut]=!1}}return p([m({noAccessor:!0})],r.prototype,"tabIndex",void 0),r}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Ga=Symbol("animateIndicator"),Cs=ks(C);class se extends Cs{get selected(){return this.active}set selected(e){this.active=e}constructor(){super(),this.isTab=!0,this.active=!1,this.hasIcon=!1,this.iconOnly=!1,this.fullWidthIndicator=!1,this.internals=this.attachInternals(),this.internals.role="tab",this.addEventListener("keydown",this.handleKeydown.bind(this))}render(){const e=s`<div class="indicator"></div>`;return s`<div
      class="button"
      role="presentation"
      @click=${this.handleContentClick}>
      <md-focus-ring part="focus-ring" inward .control=${this}></md-focus-ring>
      <md-elevation part="elevation"></md-elevation>
      <md-ripple .control=${this}></md-ripple>
      <div
        class="content ${te(this.getContentClasses())}"
        role="presentation">
        <slot name="icon" @slotchange=${this.handleIconSlotChange}></slot>
        <slot @slotchange=${this.handleSlotChange}></slot>
        ${this.fullWidthIndicator?l:e}
      </div>
      ${this.fullWidthIndicator?e:l}
    </div>`}getContentClasses(){return{"has-icon":this.hasIcon,"has-label":!this.iconOnly}}updated(){this.internals.ariaSelected=String(this.active)}async handleKeydown(e){await 0,!e.defaultPrevented&&(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),this.click())}handleContentClick(e){e.stopPropagation(),this.click()}[Ga](e){if(!this.indicator)return;this.indicator.getAnimations().forEach(a=>{a.cancel()});const i=this.getKeyframes(e);i!==null&&this.indicator.animate(i,{duration:250,easing:Le.EMPHASIZED})}getKeyframes(e){var u;const i=Is();if(!this.active)return i?[{opacity:1},{transform:"none"}]:null;const a={},r=((u=e.indicator)==null?void 0:u.getBoundingClientRect())??{},o=r.left,n=r.width,c=this.indicator.getBoundingClientRect(),h=c.left,f=c.width,g=n/f;return!i&&o!==void 0&&h!==void 0&&!isNaN(g)?a.transform=`translateX(${(o-h).toFixed(4)}px) scaleX(${g.toFixed(4)})`:a.opacity=0,[a,{transform:"none"}]}handleSlotChange(){this.iconOnly=!1;for(const e of this.assignedDefaultNodes){const i=e.nodeType===Node.TEXT_NODE&&!!e.wholeText.match(/\S/);if(e.nodeType===Node.ELEMENT_NODE||i)return}this.iconOnly=!0}handleIconSlotChange(){this.hasIcon=this.assignedIcons.length>0}}p([m({type:Boolean,reflect:!0,attribute:"md-tab"})],se.prototype,"isTab",void 0);p([m({type:Boolean,reflect:!0})],se.prototype,"active",void 0);p([m({type:Boolean})],se.prototype,"selected",null);p([m({type:Boolean,attribute:"has-icon"})],se.prototype,"hasIcon",void 0);p([m({type:Boolean,attribute:"icon-only"})],se.prototype,"iconOnly",void 0);p([S(".indicator")],se.prototype,"indicator",void 0);p([d()],se.prototype,"fullWidthIndicator",void 0);p([Er({flatten:!0})],se.prototype,"assignedDefaultNodes",void 0);p([we({slot:"icon",flatten:!0})],se.prototype,"assignedIcons",void 0);function Is(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Ne extends C{get activeTab(){return this.tabs.find(e=>e.active)??null}set activeTab(e){e&&this.activateTab(e)}get activeTabIndex(){return this.tabs.findIndex(e=>e.active)}set activeTabIndex(e){const i=()=>{const a=this.tabs[e];a&&this.activateTab(a)};if(!this.slotElement){this.updateComplete.then(i);return}i()}get focusedTab(){return this.tabs.find(e=>e.matches(":focus-within"))}constructor(){super(),this.autoActivate=!1,this.internals=this.attachInternals(),this.internals.role="tablist",this.addEventListener("keydown",this.handleKeydown.bind(this)),this.addEventListener("keyup",this.handleKeyup.bind(this)),this.addEventListener("focusout",this.handleFocusout.bind(this))}async scrollToTab(e){await this.updateComplete;const{tabs:i}=this;if(e??(e=this.activeTab),!e||!i.includes(e)||!this.tabsScrollerElement)return;for(const y of this.tabs)await y.updateComplete;const a=e.offsetLeft,r=e.offsetWidth,o=this.scrollLeft,n=this.offsetWidth,c=48,h=a-c,f=a+r-n+c,g=Math.min(h,Math.max(f,o)),u=this.focusedTab?"auto":"instant";this.tabsScrollerElement.scrollTo({behavior:u,top:0,left:g})}render(){return s`
      <div class="tabs">
        <slot
          @slotchange=${this.handleSlotChange}
          @click=${this.handleTabClick}></slot>
      </div>
      <md-divider part="divider"></md-divider>
    `}async handleTabClick(e){const i=e.target;await 0,!(e.defaultPrevented||!Ts(i)||i.active)&&this.activateTab(i)}activateTab(e){const{tabs:i}=this,a=this.activeTab;if(!(!i.includes(e)||a===e)){for(const r of i)r.active=r===e;if(a){if(!this.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0}))){for(const o of i)o.active=o===a;return}e[Ga](a)}this.updateFocusableTab(e),this.scrollToTab(e)}}updateFocusableTab(e){for(const i of this.tabs)i.tabIndex=i===e?0:-1}async handleKeydown(e){await 0;const i=e.key==="ArrowLeft",a=e.key==="ArrowRight",r=e.key==="Home",o=e.key==="End";if(e.defaultPrevented||!i&&!a&&!r&&!o)return;const{tabs:n}=this;if(n.length<2)return;e.preventDefault();let c;if(r||o)c=r?0:n.length-1;else{const g=getComputedStyle(this).direction==="rtl"?i:a,{focusedTab:u}=this;if(!u)c=g?0:n.length-1;else{const y=this.tabs.indexOf(u);c=g?y+1:y-1,c>=n.length?c=0:c<0&&(c=n.length-1)}}const h=n[c];h.focus(),this.autoActivate?this.activateTab(h):this.updateFocusableTab(h)}handleKeyup(){this.scrollToTab(this.focusedTab??this.activeTab)}handleFocusout(){if(this.matches(":focus-within"))return;const{activeTab:e}=this;e&&this.updateFocusableTab(e)}handleSlotChange(){const e=this.tabs[0];!this.activeTab&&e&&this.activateTab(e),this.scrollToTab(this.activeTab)}}p([we({flatten:!0,selector:"[md-tab]"})],Ne.prototype,"tabs",void 0);p([m({type:Number,attribute:"active-tab-index"})],Ne.prototype,"activeTabIndex",null);p([m({type:Boolean,attribute:"auto-activate"})],Ne.prototype,"autoActivate",void 0);p([S(".tabs")],Ne.prototype,"tabsScrollerElement",void 0);p([S("slot")],Ne.prototype,"slotElement",void 0);function Ts(t){return t instanceof HTMLElement&&t.hasAttribute("md-tab")}/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Ss=_`:host{box-sizing:border-box;display:flex;flex-direction:column;overflow:auto;scroll-behavior:smooth;scrollbar-width:none;position:relative}:host([hidden]){display:none}:host::-webkit-scrollbar{display:none}.tabs{align-items:end;display:flex;height:100%;overflow:inherit;scroll-behavior:inherit;scrollbar-width:inherit;justify-content:space-between;width:100%}::slotted(*){flex:1}::slotted([active]){z-index:1}
`;/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let xi=class extends Ne{};xi.styles=[Ss];xi=p([I("md-tabs")],xi);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Wa extends se{constructor(){super(...arguments),this.inlineIcon=!1}getContentClasses(){return{...super.getContentClasses(),stacked:!this.inlineIcon}}}p([m({type:Boolean,attribute:"inline-icon"})],Wa.prototype,"inlineIcon",void 0);/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const zs=_`:host{--_active-indicator-color: var(--md-primary-tab-active-indicator-color, var(--md-sys-color-primary, #6750a4));--_active-indicator-height: var(--md-primary-tab-active-indicator-height, 3px);--_active-indicator-shape: var(--md-primary-tab-active-indicator-shape, 3px 3px 0px 0px);--_active-hover-state-layer-color: var(--md-primary-tab-active-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_active-hover-state-layer-opacity: var(--md-primary-tab-active-hover-state-layer-opacity, 0.08);--_active-pressed-state-layer-color: var(--md-primary-tab-active-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_active-pressed-state-layer-opacity: var(--md-primary-tab-active-pressed-state-layer-opacity, 0.12);--_container-color: var(--md-primary-tab-container-color, var(--md-sys-color-surface, #fef7ff));--_container-elevation: var(--md-primary-tab-container-elevation, 0);--_container-height: var(--md-primary-tab-container-height, 48px);--_with-icon-and-label-text-container-height: var(--md-primary-tab-with-icon-and-label-text-container-height, 64px);--_hover-state-layer-color: var(--md-primary-tab-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-state-layer-opacity: var(--md-primary-tab-hover-state-layer-opacity, 0.08);--_pressed-state-layer-color: var(--md-primary-tab-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-opacity: var(--md-primary-tab-pressed-state-layer-opacity, 0.12);--_active-focus-icon-color: var(--md-primary-tab-active-focus-icon-color, var(--md-sys-color-primary, #6750a4));--_active-hover-icon-color: var(--md-primary-tab-active-hover-icon-color, var(--md-sys-color-primary, #6750a4));--_active-icon-color: var(--md-primary-tab-active-icon-color, var(--md-sys-color-primary, #6750a4));--_active-pressed-icon-color: var(--md-primary-tab-active-pressed-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-size: var(--md-primary-tab-icon-size, 24px);--_focus-icon-color: var(--md-primary-tab-focus-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-icon-color: var(--md-primary-tab-hover-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_icon-color: var(--md-primary-tab-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-icon-color: var(--md-primary-tab-pressed-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_label-text-font: var(--md-primary-tab-label-text-font, var(--md-sys-typescale-title-small-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-primary-tab-label-text-line-height, var(--md-sys-typescale-title-small-line-height, 1.25rem));--_label-text-size: var(--md-primary-tab-label-text-size, var(--md-sys-typescale-title-small-size, 0.875rem));--_label-text-weight: var(--md-primary-tab-label-text-weight, var(--md-sys-typescale-title-small-weight, var(--md-ref-typeface-weight-medium, 500)));--_active-focus-label-text-color: var(--md-primary-tab-active-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_active-hover-label-text-color: var(--md-primary-tab-active-hover-label-text-color, var(--md-sys-color-primary, #6750a4));--_active-label-text-color: var(--md-primary-tab-active-label-text-color, var(--md-sys-color-primary, #6750a4));--_active-pressed-label-text-color: var(--md-primary-tab-active-pressed-label-text-color, var(--md-sys-color-primary, #6750a4));--_focus-label-text-color: var(--md-primary-tab-focus-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-label-text-color: var(--md-primary-tab-hover-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_label-text-color: var(--md-primary-tab-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-label-text-color: var(--md-primary-tab-pressed-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_container-shape-start-start: var(--md-primary-tab-container-shape-start-start, var(--md-primary-tab-container-shape, var(--md-sys-shape-corner-none, 0px)));--_container-shape-start-end: var(--md-primary-tab-container-shape-start-end, var(--md-primary-tab-container-shape, var(--md-sys-shape-corner-none, 0px)));--_container-shape-end-end: var(--md-primary-tab-container-shape-end-end, var(--md-primary-tab-container-shape, var(--md-sys-shape-corner-none, 0px)));--_container-shape-end-start: var(--md-primary-tab-container-shape-end-start, var(--md-primary-tab-container-shape, var(--md-sys-shape-corner-none, 0px)))}.content.stacked{flex-direction:column;gap:2px}.content.stacked.has-icon.has-label{height:var(--_with-icon-and-label-text-container-height)}
`;/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const As=_`:host{display:inline-flex;align-items:center;justify-content:center;outline:none;padding:0 16px;position:relative;-webkit-tap-highlight-color:rgba(0,0,0,0);vertical-align:middle;user-select:none;font-family:var(--_label-text-font);font-size:var(--_label-text-size);line-height:var(--_label-text-line-height);font-weight:var(--_label-text-weight);color:var(--_label-text-color);z-index:0;--md-ripple-hover-color: var(--_hover-state-layer-color);--md-ripple-hover-opacity: var(--_hover-state-layer-opacity);--md-ripple-pressed-color: var(--_pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_pressed-state-layer-opacity);--md-elevation-level: var(--_container-elevation)}md-focus-ring{--md-focus-ring-shape: 8px}:host([active]) md-focus-ring{margin-bottom:calc(var(--_active-indicator-height) + 1px)}.button::before{background:var(--_container-color);content:"";inset:0;position:absolute;z-index:-1}.button::before,md-ripple,md-elevation{border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-end-radius:var(--_container-shape-end-end);border-end-start-radius:var(--_container-shape-end-start)}.content{position:relative;box-sizing:border-box;display:inline-flex;flex-direction:row;align-items:center;justify-content:center;height:var(--_container-height);gap:8px}.indicator{position:absolute;box-sizing:border-box;z-index:-1;transform-origin:bottom left;background:var(--_active-indicator-color);border-radius:var(--_active-indicator-shape);height:var(--_active-indicator-height);inset:auto 0 0 0;opacity:0}::slotted([slot=icon]){display:inline-flex;position:relative;writing-mode:horizontal-tb;fill:currentColor;color:var(--_icon-color);font-size:var(--_icon-size);width:var(--_icon-size);height:var(--_icon-size)}:host(:hover){color:var(--_hover-label-text-color);cursor:pointer}:host(:hover) ::slotted([slot=icon]){color:var(--_hover-icon-color)}:host(:focus){color:var(--_focus-label-text-color)}:host(:focus) ::slotted([slot=icon]){color:var(--_focus-icon-color)}:host(:active){color:var(--_pressed-label-text-color)}:host(:active) ::slotted([slot=icon]){color:var(--_pressed-icon-color)}:host([active]) .indicator{opacity:1}:host([active]){color:var(--_active-label-text-color);--md-ripple-hover-color: var(--_active-hover-state-layer-color);--md-ripple-hover-opacity: var(--_active-hover-state-layer-opacity);--md-ripple-pressed-color: var(--_active-pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_active-pressed-state-layer-opacity)}:host([active]) ::slotted([slot=icon]){color:var(--_active-icon-color)}:host([active]:hover){color:var(--_active-hover-label-text-color)}:host([active]:hover) ::slotted([slot=icon]){color:var(--_active-hover-icon-color)}:host([active]:focus){color:var(--_active-focus-label-text-color)}:host([active]:focus) ::slotted([slot=icon]){color:var(--_active-focus-icon-color)}:host([active]:active){color:var(--_active-pressed-label-text-color)}:host([active]:active) ::slotted([slot=icon]){color:var(--_active-pressed-icon-color)}:host,::slotted(*){white-space:nowrap}@media(forced-colors: active){.indicator{background:CanvasText}}
`;/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let wi=class extends Wa{};wi.styles=[As,zs];wi=p([I("md-primary-tab")],wi);/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Es=_`@layer{.md-typescale-display-small,.md-typescale-display-small-prominent{font:var(--md-sys-typescale-display-small-weight, var(--md-ref-typeface-weight-regular, 400)) var(--md-sys-typescale-display-small-size, 2.25rem)/var(--md-sys-typescale-display-small-line-height, 2.75rem) var(--md-sys-typescale-display-small-font, var(--md-ref-typeface-brand, Roboto))}.md-typescale-display-medium,.md-typescale-display-medium-prominent{font:var(--md-sys-typescale-display-medium-weight, var(--md-ref-typeface-weight-regular, 400)) var(--md-sys-typescale-display-medium-size, 2.8125rem)/var(--md-sys-typescale-display-medium-line-height, 3.25rem) var(--md-sys-typescale-display-medium-font, var(--md-ref-typeface-brand, Roboto))}.md-typescale-display-large,.md-typescale-display-large-prominent{font:var(--md-sys-typescale-display-large-weight, var(--md-ref-typeface-weight-regular, 400)) var(--md-sys-typescale-display-large-size, 3.5625rem)/var(--md-sys-typescale-display-large-line-height, 4rem) var(--md-sys-typescale-display-large-font, var(--md-ref-typeface-brand, Roboto))}.md-typescale-headline-small,.md-typescale-headline-small-prominent{font:var(--md-sys-typescale-headline-small-weight, var(--md-ref-typeface-weight-regular, 400)) var(--md-sys-typescale-headline-small-size, 1.5rem)/var(--md-sys-typescale-headline-small-line-height, 2rem) var(--md-sys-typescale-headline-small-font, var(--md-ref-typeface-brand, Roboto))}.md-typescale-headline-medium,.md-typescale-headline-medium-prominent{font:var(--md-sys-typescale-headline-medium-weight, var(--md-ref-typeface-weight-regular, 400)) var(--md-sys-typescale-headline-medium-size, 1.75rem)/var(--md-sys-typescale-headline-medium-line-height, 2.25rem) var(--md-sys-typescale-headline-medium-font, var(--md-ref-typeface-brand, Roboto))}.md-typescale-headline-large,.md-typescale-headline-large-prominent{font:var(--md-sys-typescale-headline-large-weight, var(--md-ref-typeface-weight-regular, 400)) var(--md-sys-typescale-headline-large-size, 2rem)/var(--md-sys-typescale-headline-large-line-height, 2.5rem) var(--md-sys-typescale-headline-large-font, var(--md-ref-typeface-brand, Roboto))}.md-typescale-title-small,.md-typescale-title-small-prominent{font:var(--md-sys-typescale-title-small-weight, var(--md-ref-typeface-weight-medium, 500)) var(--md-sys-typescale-title-small-size, 0.875rem)/var(--md-sys-typescale-title-small-line-height, 1.25rem) var(--md-sys-typescale-title-small-font, var(--md-ref-typeface-plain, Roboto))}.md-typescale-title-medium,.md-typescale-title-medium-prominent{font:var(--md-sys-typescale-title-medium-weight, var(--md-ref-typeface-weight-medium, 500)) var(--md-sys-typescale-title-medium-size, 1rem)/var(--md-sys-typescale-title-medium-line-height, 1.5rem) var(--md-sys-typescale-title-medium-font, var(--md-ref-typeface-plain, Roboto))}.md-typescale-title-large,.md-typescale-title-large-prominent{font:var(--md-sys-typescale-title-large-weight, var(--md-ref-typeface-weight-regular, 400)) var(--md-sys-typescale-title-large-size, 1.375rem)/var(--md-sys-typescale-title-large-line-height, 1.75rem) var(--md-sys-typescale-title-large-font, var(--md-ref-typeface-brand, Roboto))}.md-typescale-body-small,.md-typescale-body-small-prominent{font:var(--md-sys-typescale-body-small-weight, var(--md-ref-typeface-weight-regular, 400)) var(--md-sys-typescale-body-small-size, 0.75rem)/var(--md-sys-typescale-body-small-line-height, 1rem) var(--md-sys-typescale-body-small-font, var(--md-ref-typeface-plain, Roboto))}.md-typescale-body-medium,.md-typescale-body-medium-prominent{font:var(--md-sys-typescale-body-medium-weight, var(--md-ref-typeface-weight-regular, 400)) var(--md-sys-typescale-body-medium-size, 0.875rem)/var(--md-sys-typescale-body-medium-line-height, 1.25rem) var(--md-sys-typescale-body-medium-font, var(--md-ref-typeface-plain, Roboto))}.md-typescale-body-large,.md-typescale-body-large-prominent{font:var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)) var(--md-sys-typescale-body-large-size, 1rem)/var(--md-sys-typescale-body-large-line-height, 1.5rem) var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto))}.md-typescale-label-small,.md-typescale-label-small-prominent{font:var(--md-sys-typescale-label-small-weight, var(--md-ref-typeface-weight-medium, 500)) var(--md-sys-typescale-label-small-size, 0.6875rem)/var(--md-sys-typescale-label-small-line-height, 1rem) var(--md-sys-typescale-label-small-font, var(--md-ref-typeface-plain, Roboto))}.md-typescale-label-medium,.md-typescale-label-medium-prominent{font:var(--md-sys-typescale-label-medium-weight, var(--md-ref-typeface-weight-medium, 500)) var(--md-sys-typescale-label-medium-size, 0.75rem)/var(--md-sys-typescale-label-medium-line-height, 1rem) var(--md-sys-typescale-label-medium-font, var(--md-ref-typeface-plain, Roboto))}.md-typescale-label-medium-prominent{font-weight:var(--md-sys-typescale-label-medium-weight-prominent, var(--md-ref-typeface-weight-bold, 700))}.md-typescale-label-large,.md-typescale-label-large-prominent{font:var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)) var(--md-sys-typescale-label-large-size, 0.875rem)/var(--md-sys-typescale-label-large-line-height, 1.25rem) var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto))}.md-typescale-label-large-prominent{font-weight:var(--md-sys-typescale-label-large-weight-prominent, var(--md-ref-typeface-weight-bold, 700))}}
`,Ls=`
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
`,ke=_`
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
`,ne=_`
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
`,qa="oppai_theme";function Ri(){const t=localStorage.getItem(qa);return t==="light"||t==="dark"||t==="system"?t:"dark"}function Ds(t){try{localStorage.setItem(qa,t)}catch{}}function Fi(t){const e=t==="light"||t==="system"&&window.matchMedia("(prefers-color-scheme: light)").matches;document.documentElement.dataset.theme=e?"light":""}function Os(){window.matchMedia("(prefers-color-scheme: light)").addEventListener("change",()=>{Ri()==="system"&&Fi("system")})}_`
  .card {
    background: var(--md-sys-color-surface-container);
    border-radius: var(--oppai-radius);
    overflow: hidden;
  }
`;const _i="oppai_token";function $i(){return localStorage.getItem(_i)}function Ct(t){t?localStorage.setItem(_i,t):localStorage.removeItem(_i)}function H(t,e="error",i={}){window.dispatchEvent(new CustomEvent("oppai-mascot",{detail:{message:t,tone:e,...i}}))}async function b(t,e={},i=0){const a=new Headers(e.headers),r=$i();r&&a.set("Authorization",`Bearer ${r}`),e.body&&!(e.body instanceof FormData)&&a.set("Content-Type","application/json");const o=i>0?new AbortController:null,n=o?setTimeout(()=>o.abort(),i):null;try{const c=await fetch(t,{...e,headers:a,signal:o==null?void 0:o.signal});if(c.status===401)throw t!=="/api/auth/login"&&(Ct(null),window.dispatchEvent(new CustomEvent("oppai-logout")),H("Your session ended. Please sign in again.")),new Error("unauthorized");if(!c.ok){let h=c.statusText;try{const f=await c.json();f!=null&&f.error&&(h=f.error)}catch{}throw new Error(h)}return c.status===204?void 0:await c.json()}catch(c){if(o!=null&&o.signal.aborted){const h=new Error("Timed out — the site was too slow or unreachable.");throw t!=="/api/auth/login"&&H(h.message),h}throw t!=="/api/auth/login"&&c instanceof Error&&c.message!=="unauthorized"&&H(c.message||"Something went wrong."),c}finally{n&&clearTimeout(n)}}const v={health:()=>b("/api/health"),login:(t,e)=>b("/api/auth/login",{method:"POST",body:JSON.stringify({username:t,password:e,client:"web"})}),me:()=>b("/api/auth/me"),logout:()=>b("/api/auth/logout",{method:"POST"}),listMedia:(t="",e=60,i=0)=>{const a=new URLSearchParams;return t&&a.set("kind",t),a.set("limit",String(e)),a.set("offset",String(i)),b(`/api/media?${a}`)},getMedia:t=>b(`/api/media/${t}`),streamURL:t=>`/api/media/${t}/stream`,thumbURL:t=>`/api/media/${t}/thumb`,proxyURL:t=>`/api/scrape/proxy?url=${encodeURIComponent(t)}`,upload:(t,e)=>{const i=new FormData;return i.append("file",t),e&&i.append("title",e),b("/api/media",{method:"POST",body:i})},autotag:t=>b(`/api/media/${t}/autotag`,{method:"POST"}),scanImage:t=>b("/api/ai/scan-image",{method:"POST",body:JSON.stringify({imageData:t})},6e4),comicInfo:t=>b(`/api/media/${t}/comic`),pageURL:(t,e)=>`/api/media/${t}/page/${e}`,getSettings:()=>b("/api/settings"),saveSettings:t=>b("/api/settings",{method:"PUT",body:JSON.stringify(t)}),stats:()=>b("/api/stats"),changePassword:(t,e)=>b("/api/auth/password",{method:"POST",body:JSON.stringify({current:t,new:e})}),updateMedia:(t,e)=>b(`/api/media/${t}`,{method:"PATCH",body:JSON.stringify(e)}),deleteMedia:t=>b(`/api/media/${t}`,{method:"DELETE"}),bulkMedia:(t,e,i)=>b("/api/media/bulk",{method:"POST",body:JSON.stringify({action:t,ids:e,patch:i??{}})}),scrape:t=>b("/api/scrape",{method:"POST",body:JSON.stringify({url:t})},45e3),scrapeBulk:t=>b("/api/scrape/bulk",{method:"POST",body:JSON.stringify({urls:t})},75e3),scrapeImport:t=>b("/api/scrape/import",{method:"POST",body:JSON.stringify(t)}),apkInfo:()=>b("/api/apk/info"),sources:()=>b("/api/sources"),browseSource:(t,e={})=>{const i=new URLSearchParams;return e.feed&&i.set("feed",e.feed),e.cursor&&i.set("cursor",e.cursor),e.q&&i.set("q",e.q),e.sort&&i.set("sort",e.sort),b(`/api/sources/${t}/browse?${i}`,{},45e3)},sourcePages:(t,e)=>b(`/api/sources/${encodeURIComponent(t)}/item/${encodeURIComponent(e)}/pages`,{},45e3),sourceComments:(t,e)=>b(`/api/sources/${encodeURIComponent(t)}/item/${encodeURIComponent(e)}/comments`,{},45e3),sourceStreamURL:t=>`/api/sources/stream?url=${encodeURIComponent(t)}`,saveFromSource:(t,e)=>b(`/api/sources/${encodeURIComponent(t)}/save`,{method:"POST",body:JSON.stringify(e)},15*6e4),imageGenStatus:()=>b("/api/imagegen/status",{},12e3),booruTags:t=>b(`/api/imagegen/tags?q=${encodeURIComponent(t)}`),gameGallery:t=>b(`/api/media/${t}/gallery`),uploadGameGallery:(t,e)=>{const i=new FormData;return i.append("file",e),b(`/api/media/${t}/gallery`,{method:"POST",body:i})},removeGameGallery:(t,e)=>b(`/api/media/${t}/gallery/${e}`,{method:"DELETE"}),optimizePrompt:t=>b("/api/imagegen/prompt",{method:"POST",body:JSON.stringify({text:t})}),generate:t=>b("/api/imagegen/generate",{method:"POST",body:JSON.stringify(t)},10*6e4),genPreviewURL:t=>`/api/imagegen/preview/${encodeURIComponent(t)}`,saveGenerated:t=>b("/api/imagegen/save",{method:"POST",body:JSON.stringify(t)}),modelThumbURL:t=>`/api/imagegen/model-thumb?model=${encodeURIComponent(t)}`,setModelThumb:t=>b("/api/imagegen/model-thumb",{method:"PUT",body:JSON.stringify(t)}),chatStatus:()=>b("/api/chat/status",{},12e3),chat:(t,e,i="neutral",a=1,r={},o="libby")=>b("/api/chat",{method:"POST",body:JSON.stringify({mode:t,messages:e,emotion:i,intensity:a,options:r,characterId:o})},125e3),chatWorkspace:()=>b("/api/chat/workspace"),chatModels:()=>b("/api/chat/models",{},2e4),loadChatModel:(t,e={})=>b("/api/chat/models/load",{method:"POST",body:JSON.stringify({modelName:t,args:e})},10*6e4),unloadChatModel:()=>b("/api/chat/models/unload",{method:"POST"},13e4),saveChatWorkspace:t=>b("/api/chat/workspace",{method:"PUT",body:JSON.stringify(t)}),uploadChatImage:t=>b("/api/chat/images",{method:"POST",body:JSON.stringify(t)},12e4),deleteChatImage:t=>b(`/api/chat/images/${encodeURIComponent(t)}`,{method:"DELETE"}),chatImageURL:t=>`/api/chat/images/${encodeURIComponent(t)}`,loraThumbURL:t=>`/api/imagegen/lora-thumb?name=${encodeURIComponent(t)}`,characters:()=>b("/api/imagegen/characters"),saveCharacter:t=>b("/api/imagegen/characters",{method:"POST",body:JSON.stringify(t)}),deleteCharacter:t=>b(`/api/imagegen/characters/${encodeURIComponent(t)}`,{method:"DELETE"}),characterThumbURL:t=>`/api/imagegen/characters/${encodeURIComponent(t)}/thumb`,modelMeta:t=>b(`/api/imagegen/model?name=${encodeURIComponent(t)}`,{},2e4),patchModelMeta:t=>b("/api/imagegen/model",{method:"PATCH",body:JSON.stringify(t)},25e3),galleryBoards:()=>b("/api/imagegen/gallery/boards",{},2e4),createGalleryBoard:t=>b("/api/imagegen/gallery/boards",{method:"POST",body:JSON.stringify({name:t})},2e4),deleteGalleryBoard:t=>b(`/api/imagegen/gallery/boards/${encodeURIComponent(t)}`,{method:"DELETE"},2e4),galleryImages:(t,e=0,i=60)=>b(`/api/imagegen/gallery/images?board=${encodeURIComponent(t)}&offset=${e}&limit=${i}`,{},2e4),galleryThumbURL:t=>`/api/imagegen/gallery/image/${encodeURIComponent(t)}/thumb`,galleryFullURL:t=>`/api/imagegen/gallery/image/${encodeURIComponent(t)}`,deleteGalleryImage:t=>b(`/api/imagegen/gallery/image/${encodeURIComponent(t)}`,{method:"DELETE"}),deleteGalleryImages:t=>b("/api/imagegen/gallery/delete",{method:"POST",body:JSON.stringify({names:t})},4e4),addGalleryImagesToBoard:(t,e)=>b("/api/imagegen/gallery/board",{method:"POST",body:JSON.stringify({board:t,names:e})},4e4),saveGalleryImage:t=>b("/api/imagegen/gallery/save",{method:"POST",body:JSON.stringify(t)},9e4),civitaiSearch:(t={})=>{const e=new URLSearchParams;return t.q&&e.set("q",t.q),t.type&&e.set("type",t.type),t.category&&e.set("category",t.category),t.sort&&e.set("sort",t.sort),t.cursor&&e.set("cursor",t.cursor),b(`/api/imagegen/civitai/search?${e}`,{},45e3)},civitaiCategories:()=>b("/api/imagegen/civitai/categories",{},3e4),civitaiImageURL:t=>`/api/imagegen/civitai/image?url=${encodeURIComponent(t)}`,civitaiInstall:t=>b("/api/imagegen/civitai/install",{method:"POST",body:JSON.stringify({url:t})},3e4),civitaiInstalls:()=>b("/api/imagegen/civitai/installs",{},2e4),libbyOutfits:()=>b("/api/libby/outfits"),saveLibbyOutfit:t=>b("/api/libby/outfits",{method:"POST",body:JSON.stringify(t)}),deleteLibbyOutfit:t=>b(`/api/libby/outfits/${encodeURIComponent(t)}`,{method:"DELETE"}),setLibbyEmotion:(t,e,i,a=0)=>b(`/api/libby/outfits/${encodeURIComponent(t)}/emotions/${encodeURIComponent(e)}${a?`?level=${a}`:""}`,{method:"PUT",body:JSON.stringify({imageData:i})}),deleteLibbyEmotion:(t,e,i=0)=>b(`/api/libby/outfits/${encodeURIComponent(t)}/emotions/${encodeURIComponent(e)}${i?`?level=${i}`:""}`,{method:"DELETE"}),libbyEmotionURL:(t,e,i=0)=>`/api/libby/outfits/${encodeURIComponent(t)}/emotions/${encodeURIComponent(e)}${i?`?level=${i}`:""}`},Ka="oppai_hide_libby",ki="oppai_libby_outfit";function Et(){return localStorage.getItem(Ka)==="1"}function Ps(t){try{localStorage.setItem(Ka,t?"1":"0")}catch{}window.dispatchEvent(new CustomEvent("oppai-libby-pref",{detail:{hidden:t}}))}function Ni(){return localStorage.getItem(ki)??""}function ca(t){try{t?localStorage.setItem(ki,t):localStorage.removeItem(ki)}catch{}window.dispatchEvent(new CustomEvent("oppai-libby-pref",{detail:{outfit:t}}))}const pa={1:{neutral:"/Libby_New/Calm/neutral.png",happy:"/Libby_New/Calm/happy.png",mischievous:"/Libby_New/Calm/Mischievous.png",surprised:"/Libby_New/Calm/suprised.png",thinking:"/Libby_New/Calm/Thinking.png"},2:{neutral:"/Libby_New/Warm/warm neutral.png",happy:"/Libby_New/Warm/warm happy.png",mischievous:"/Libby_New/Warm/warm Mischievous.png",surprised:"/Libby_New/Warm/warm suprised.png",thinking:"/Libby_New/Warm/warm thinking.png"},3:{neutral:"/Libby_New/flirty/Flirty Neutral.png",happy:"/Libby_New/flirty/Flirty Happy.png",mischievous:"/Libby_New/flirty/Flirty Mis.png",surprised:"/Libby_New/flirty/Flirty Suprised.png",thinking:"/Libby_New/flirty/Flirty Thinking.png"},4:{neutral:"/Libby_New/heated/heated Neutral.png",happy:"/Libby_New/heated/heated Happy.png",mischievous:"/Libby_New/heated/heated mis.png",surprised:"/Libby_New/heated/heated suprised.png",thinking:"/Libby_New/heated/heated thinking.png"},5:{neutral:"/Libby_New/Peak/Peak Neutral.png",happy:"/Libby_New/Peak/Peak Happy.png",mischievous:"/Libby_New/Peak/Peak Mis.png",surprised:"/Libby_New/Peak/Peak Suprise.png",thinking:"/Libby_New/Peak/Peak Thinking.png"}};function ha(t,e=1){const i=ye(t);return pa[ve(e)][i]??pa[1].neutral}const Va=["neutral","happy","mischievous","surprised","thinking"];function ye(t){let e=(t??"").trim().toLowerCase();return e==="default"&&(e="neutral"),(e==="sad"||e==="worried")&&(e="thinking"),e==="horniness"&&(e="mischievous"),Va.includes(e)?e:"neutral"}function ve(t){return Math.max(1,Math.min(5,Math.round(Number(t)||1)))}function Bi(t,e,i=Ni()){const a=ye(t),r=ve(e),o=[];if(i&&i!=="default"){const n=`/api/libby/outfits/${encodeURIComponent(i)}/emotions/${encodeURIComponent(a)}`;for(let c=r-1;c>=1;c--)o.push(`${n}?level=${c}`);o.push(n)}return o.push(ha(a,r),ha("neutral",r),"/mascot.png"),[...new Set(o)]}function Ya(t){const e=t.toLowerCase();return/timed? out|unreachable|network|offline|couldn.t reach|connection/.test(e)?{emotion:"thinking",intensity:4}:/unauthori[sz]ed|session ended|sign in|password|login/.test(e)?{emotion:"thinking",intensity:3}:/invalid|missing|required|not found|doesn.t exist/.test(e)?{emotion:"thinking",intensity:2}:/failed|error|couldn.t|can.t/.test(e)?{emotion:"surprised",intensity:3}:{emotion:"thinking",intensity:2}}function Ui(t,e){const i=Number(t.dataset.fallbackIndex||"0")+1;i>=e.length||(t.dataset.fallbackIndex=String(i),t.src=e[i])}const Ja="oppai_libby_intensity",Xa="oppai_libby_progress",Za="oppai_libby_progression_multiplier",Je=5,Hi=[.25,.5,1,2];function Qa(){const t=Number(localStorage.getItem(Za)??"0.5");return Hi.includes(t)?t:.5}function Ms(t){const e=Hi.includes(t)?t:.5;return localStorage.setItem(Za,String(e)),window.dispatchEvent(new CustomEvent("oppai-libby-progression",{detail:{multiplier:e}})),e}function It(t,e){const i=Math.max(1,Math.min(Je,t+e*Qa()));return{progress:i,intensity:Math.max(1,Math.min(Je,Math.floor(i+1e-6)))}}function er(){const t=Number(sessionStorage.getItem(Xa));if(Number.isFinite(t)&&t>=1&&t<=Je)return t;const e=Number(sessionStorage.getItem(Ja)??"1");return Number.isFinite(e)?Math.max(1,Math.min(Je,e)):1}function Ae(){return It(er(),0).intensity}function vt(t){const e=Math.max(1,Math.min(Je,Math.round(t)));return tr(e,e)}function Rs(t=1){const e=It(er(),t);return tr(e.progress,e.intensity)}function tr(t,e){try{sessionStorage.setItem(Xa,String(t)),sessionStorage.setItem(Ja,String(e))}catch{}return window.dispatchEvent(new CustomEvent("oppai-libby-meter",{detail:{intensity:e,progress:t}})),e}const ua=new Map;function qe(t,e){if(!e.length)return"";if(e.length===1)return e[0];const i=ua.get(t),a=e.filter(o=>o!==i),r=a[Math.floor(Math.random()*a.length)];return ua.set(t,r),r}function ir(t,e){return t[ve(e)-1]??t[0]}function Fs(t){const e=ve(t);return e>=5||e>=3?"mischievous":"happy"}const Ns={import:[["Saved to your library.","Tucked away safely.","Filed. Nice pick."],["Ooh, good one. Saved.","That one's a keeper — saved.","Added. I like your taste."],["Mmh, saving that one for later…","Ooh. Adding that to the collection.","That's going somewhere special."],["Ohh, you're building a *collection*, aren't you?","Saved. My, my.","Mmh — you know exactly what you like."],["Nngh — yes. That one. Saved.","You keep this up and I won't be any use to you.","Saved… I need a minute."]],save:[["Kept it.","In the library now.","Done — it's yours."],["Saved that one for you.","Ooh, keeping it? Good.","That one earned its place."],["Mmh, that one's mine too now.","Saved. I might peek at it later.","Ooh, filing that away…"],["Ohh, keeping *that*? Bold.","Saved. You've got a type.","Mmh. Straight to the good shelf."],["That one's going to live in my head. Saved.","Ngh — saved, saved, fine.","You're doing this on purpose."]],generate:[["There you go.","Fresh out of the oven.","All done — take a look."],["Ooh, that came out nice.","Not bad at all. Have a look.","There — I think you'll like it."],["Mmh. Look what we made.","Ooh, that's a good one.","Well. That turned out."],["Ohh… look at that. Look what you asked for.","That's what was in your head? Bold.","Mmh — that's hot and you know it."],["Nngh. Yes. That one.","You made *that*? I need a moment.","That's… that's very good. Do another."]],galleryDelete:[["Gone.","Cleared out.","Removed."],["Deleted — didn't like that one?","Gone. Fair enough.","Cleared. Picky, I like it."],["Mmh, too tame for you? Gone.","Deleted. You want better.","Gone — we can do better."],["Ohh, brutal. Deleted.","Not good enough for you? Gone.","Deleted. High standards tonight."],["Gone. Now make me a better one.","Deleted — try harder, I'm waiting.","Ngh, fine. Gone. Again."]],libraryDelete:[["Removed from the library.","Gone from the shelf.","Deleted. I'll tidy the gap."],["Out it goes. Making room?","Deleted — changing your taste?","Gone. I noticed that one."],["Mmh, pruning the collection? Gone.","Deleted. I thought you liked that one.","Gone — ruthless today."],["Oh, you're really clearing house.","Deleted. I'll pretend I wasn't attached.","Gone. Cold."],["You deleted it right in front of me.","Gone. Now I want to know why.","Fine. Deleted. Give me something better."]],login:[["Welcome back.","There you are.","Hi. Missed you."],["Hey, you. Welcome back.","There you are — I was getting bored.","Welcome back, I kept your seat warm."],["Mmh, there you are. I was waiting.","Welcome back. I've been thinking about you.","Hi. Took you long enough."],["Ohh, *finally*. I was getting restless.","There you are. I've been in a mood.","Welcome back — I was starting to fidget."],["You have no idea how long that felt.","Ngh — you're back. Don't leave again.","Finally. I was going out of my mind."]],loginFail:[["That didn't work. Try again?","Hmm — no. Check that again.","Not quite. One more time."],["Nope, that's not it.","Hmm, wrong. Try again for me?","That's not the one."],["Wrong. Try again — slowly this time.","Mmh, no. Concentrate.","Not it. Focus, would you?"],["Still no. You're distracted, aren't you?","Wrong again. I know why.","No. Get it together."],["You can't even type. I know the feeling.","Wrong. We're both a mess right now.","No — deep breath. Try again."]],greeting:[["Hi. What are we doing?","Hey. What's the plan?","Hello, you.","Welcome in — I kept everything tidy.","Oh! There you are.","Ready when you are."],["Hey you. What are we up to?","Hi — I was hoping you'd show up.","There you are. What now?","Back for another look?","I had a feeling you'd be here."],["Mmh, hi. What are we in the mood for?","Hey. I've got ideas.","Hi. Ask me for something.","You caught me thinking about the collection.","So… where should we start?"],["Ohh, hi. I was *just* thinking about you.","Hey. I'm in a mood, fair warning.","Hi. Say something interesting.","There you are — perfect timing.","I may have gotten a little impatient."],["Hi. Please say something. Anything.","You're here. Good. I need the distraction.","Hi — I'm not doing great at behaving.","Finally. Come keep me company.","I was about to come looking for you."]],idle:[["Still here.","Take your time.","I'm around."],["I'm still here, you know.","Whenever you're ready.","Still watching."],["Mmh… waiting.","I'm getting impatient.","Still here. Still waiting."],["Are you going to make me wait all night?","I'm *right here*.","Waiting. Not patiently."],["Please. I'm losing my mind over here.","Hey. Hey. Pay attention to me.","I can't sit still much longer."]]},Bs={import:["happy","happy","mischievous","mischievous","mischievous"],save:["happy","happy","mischievous","mischievous","mischievous"],generate:["happy","happy","mischievous","surprised","mischievous"],galleryDelete:["thinking","thinking","mischievous","mischievous","mischievous"],libraryDelete:["thinking","thinking","surprised","surprised","mischievous"],login:["happy","happy","mischievous","mischievous","mischievous"],loginFail:["thinking","thinking","thinking","mischievous","thinking"],greeting:["happy","happy","mischievous","mischievous","mischievous"],idle:["thinking","thinking","mischievous","thinking","mischievous"]};function Z(t,e={}){const i=ve(e.intensity??Ae()),a=e.count??1;let r=qe(`react:${t}:${i}`,ir(Ns[t],i));a>1&&(t==="import"||t==="save")&&(r=i>=4?qe(`react:${t}:many:${i}`,[`${a} of them? Ohh, you've been busy.`,`All ${a}. Greedy. I like it.`,`${a} at once — you're going to wear me out.`]):qe(`react:${t}:many:${i}`,[`Saved all ${a}.`,`${a} added to your library.`,`${a} more for the shelf.`]));const o=Bs[t];return{message:r,intensity:i,emotion:o?o[i-1]:Fs(i)}}const Us={sweet:0,playful:1,bold:1,roleplay:1},ar=[{intent:"greeting",test:/^(hi|hey|hello|yo|sup|good (morning|evening|afternoon))\b/i},{intent:"howAreYou",test:/how (are|r) (you|u)|how's it going|how are things|you ok|you okay/i},{intent:"compliment",test:/\b(you'?re |ur )?(cute|pretty|beautiful|gorgeous|hot|sexy|adorable|lovely|amazing|the best)\b/i},{intent:"flirt",test:/\b(kiss|touch|horny|turn(ed)? (me|you) on|naked|bed|undress|want you|need you|fuck|sex|moan|tease|dirty)\b/i},{intent:"thanks",test:/\b(thanks|thank you|ty|cheers|appreciate)\b/i},{intent:"bye",test:/\b(bye|goodnight|good night|see (you|ya)|later|gtg|i'?m off)\b/i},{intent:"aboutHer",test:/\b(who are you|what are you|your name|about you|libby)\b/i},{intent:"aboutLibrary",test:/\b(librar|collection|tags?|videos?|images?|gallery|scrape|import)\b/i},{intent:"help",test:/\b(help|how do i|how can i|what can you do|commands?)\b/i},{intent:"sad",test:/\b(sad|tired|lonely|depressed|rough day|stressed|exhausted|down)\b/i},{intent:"yesNo",test:/^(yes|no|yeah|nah|yep|nope|sure|ok|okay)\b/i},{intent:"question",test:/\?\s*$/}],Hs={greeting:[["Hi. What's on your mind?","Hey there. Good to see you.","Hello. How's your day going?"],["Hey you. I was hoping you'd say something.","Hi — you've got my attention.","There you are. Talk to me."],["Mmh, hi. I've been waiting for you to start.","Hey. I'm in a talkative mood.","Hi. Ask me something interesting."],["Ohh, hi. You caught me thinking about you.","Hey. Fair warning: I'm in a mood.","Hi. Don't be shy with me."],["Hi. Please keep talking, I need it.","You're here. Finally. Say something.","Hi — I'm not going to be subtle tonight."]],howAreYou:[["I'm good, thanks for asking. You?","Content. Yourself?","Doing fine. How about you?"],["Better now that you're talking to me.","Good — bit restless. You?","Pretty good. You've improved it."],["Warm. A little distracted. You?","Mmh… good. Better than good.","I'm — fine. Mostly fine."],["Honestly? Wound up. Don't ask why.","Not calm. Not even a little.","I'm having a time of it, since you asked."],["Ngh — I'm a mess and it's your fault.","Bad. In a good way. Very bad.","Don't ask me that right now."]],compliment:[["That's sweet of you. Thank you.","Oh — thank you.","You're kind. I'll take it."],["Mm, flatterer. Keep going.","You're good at this, aren't you?","Ohh, thank you. Say more."],["Mmh. You know what that does to me.","Careful, I'll start believing you.","That got me. Say it again."],["Ohh, you're not playing fair.","You *know* what you're doing.","Say that again. Slower."],["Nngh — stop. Don't stop. Both.","You can't just *say* that to me.","That's not fair and I love it."]],flirt:[["My, we're forward. Easy, now.","Ahem. Let's warm up first.","Bold opener. I'll allow it."],["Mm. You've got my attention now.","Ooh. Is that where we're going?","Careful — I'll play along."],["Mmh, now you're speaking my language.","Ohh, keep going. I'm listening.","That's more like it."],["Ohh. Yes. Say more of that.","You're going to be the end of me.","Mmh — don't you dare stop there."],["Nngh — yes. Please. More.","I can't think straight. Keep talking.","You've completely undone me."]],thanks:[["Any time.","Of course.","That's what I'm here for."],["Any time. I like being useful to you.","Of course — ask me for more.","Happy to. Really."],["Mmh, you can thank me properly later.","Any time. I mean it.","For you? Always."],["Ohh, I can think of better thanks.","Any time — and I'll collect on that.","You owe me one."],["Thank me later. Properly.","Ngh — you're welcome, you're welcome.","Just keep talking to me."]],bye:[["Night. Sleep well.","See you soon.","Take care of yourself."],["Don't be a stranger.","Come back soon, alright?","See you. I'll be here."],["Mmh, don't leave me like this.","Come back to me soon.","Fine. But hurry back."],["Ohh, you're leaving *now*?","That's cruel timing, you know.","Go on then. I'll be here. Waiting."],["No. Stay. Please?","You can't leave me like this.","Ngh. Fine. Go. Hurry back."]],aboutHer:[["I'm Libby — I keep your library company.","Libby. I live here, more or less.","I'm Libby, your librarian."],["Libby. I keep your collection, and you company.","I'm Libby — the one who knows what you like.","Libby. Your librarian, mostly."],["Libby. I've seen everything you've saved, you know.","I'm Libby — and I've read your whole collection.","Libby. I know your taste better than you do."],["Libby. I know exactly what you like, and it shows.","I'm the one who's seen every single thing you saved.","Libby — and I have opinions about your collection."],["Libby. And I've been thinking about your collection all day.","I'm Libby, and I'm not okay right now.","Libby — ask me something else, I'm distracted."]],aboutLibrary:[["Your library's right there — browse, search, or scrape something new.","Everything's tagged and searchable. Go dig.","Ask the search bar; it knows more than I do."],["I've been keeping it tidy for you. Go look.","It's all in there, waiting. Search away.","Your collection's in good shape, if I say so."],["Mmh, your collection has a *theme*, you know that?","I've read every tag in there. You're predictable.","Your library says a lot about you."],["Ohh, I could tell you what your tags say about you.","Your collection is filthy and I mean that kindly.","I know exactly which ones you go back to."],["Your library is the reason I'm like this.","I've been in your collection all day. It shows.","Don't send me back in there right now."]],help:[["Browse, search, generate images, or scrape a link — pick one.","Try the image studio, or drop a URL into scrape.","Search, browse, or make something new."],["Try the image studio — that's the fun one.","Scrape a link, or let's make something.","Ask me for something specific, I'm better at that."],["Mmh, let's make something. The image studio's waiting.","Give me a prompt and let's see what happens.","I'd rather make something than explain things."],["Ohh, let's skip the manual and go make something.","Ask me for something *fun* instead.","Prompt me. I dare you."],["I can't concentrate on instructions right now. Ask me something else.","Take me to the image studio instead.","Ngh — just tell me what you want."]],sad:[["That sounds heavy. I'm here.","I'm sorry. Want to talk about it?","Rough one, huh? Sit with me a bit."],["Come here. Tell me about it.","That's not fair on you. I'm listening.","I've got you. Talk."],["Come here. Let me look after you.","I'll keep you company through it.","You don't have to carry that alone."],["Come here. I'll take your mind off it.","Let me distract you. I'm good at that.","I can think of a few cures for that."],["Come here. I'll make you forget the whole day.","Let me take care of you. Properly.","Forget it for a bit. I'll help."]],yesNo:[["Alright then.","Fair enough.","Noted."],["Mm. Go on.","Alright — and?","That's it? Say more."],["Mmh. Elaborate.","That's not enough words for me.","Come on. More than that."],["Ohh, don't go quiet on me now.","One word? Cruel.","More. I want more than that."],["Words. Please. More of them.","Don't leave me hanging like that.","You can do better than one word."]],question:[["Good question. What do you think?","Hmm. Tell me more first.","I'd need more than that to answer."],["Ooh, curious tonight. Go on.","Depends. What are you really asking?","Hmm — say more and I'll answer."],["Mmh. Ask me the thing you actually want to ask.","You're circling something. Out with it.","Try that again, but honestly."],["Ohh, ask me the real question.","You're being coy. I'm not.","Say what you mean."],["Just ask me. I'll say yes.","Whatever it is — yes.","Ask me properly and find out."]],chatter:[["Mm. Go on.","I'm listening.","Tell me more."],["Ooh, go on then.","I'm with you. Keep going.","And? Don't stop there."],["Mmh, keep talking. I like this.","Go on — you have my full attention.","More of that, please."],["Ohh, you have all of my attention now.","Keep going. Please keep going.","Don't stop, I'm enjoying this."],["Keep talking. I need the sound of you.","Ngh — more. Anything. Keep going.","Don't stop now, not now."]]},js={greeting:["happy","happy","mischievous","mischievous","mischievous"],howAreYou:["happy","happy","thinking","mischievous","mischievous"],compliment:["happy","happy","mischievous","surprised","mischievous"],flirt:["surprised","mischievous","mischievous","mischievous","mischievous"],thanks:["happy","happy","mischievous","mischievous","mischievous"],bye:["thinking","thinking","thinking","thinking","mischievous"],aboutHer:["happy","happy","mischievous","mischievous","mischievous"],aboutLibrary:["thinking","happy","mischievous","mischievous","mischievous"],help:["thinking","thinking","mischievous","mischievous","mischievous"],sad:["thinking","thinking","thinking","mischievous","mischievous"],yesNo:["thinking","thinking","mischievous","mischievous","mischievous"],question:["thinking","thinking","mischievous","mischievous","mischievous"],chatter:["neutral","happy","mischievous","mischievous","mischievous"]},Tt={sweet:["","",""," I'm glad you're here."," No rush, either."],playful:["",""," Your turn."," Don't make me come get you."," Try to keep up."],bold:["",""," I'm not going to pretend otherwise."," I'd rather be blunt with you."," Say the word."],roleplay:["",""," *she leans in*"," *she watches you closely*"," *she shifts, restless*"]};function Gs(t){for(const e of ar)if(e.test.test(t))return e.intent;return"chatter"}function rr(t,e){if(/\b(calm down|behave|slow down|cool it|stop|not now|later)\b/i.test(t))return-1;const i=Us[e]??0,a=ar.find(r=>r.intent==="flirt").test.test(t);return i+(a?1:0)}function Ws(t,e,i,a,r=!0){const o=ve(a+(r?rr(t,e):0)),n=Gs(t.trim()),c=qe(`reply:${n}:${o}`,ir(Hs[n],o)),h=qe(`tail:${e}:${o}`,["",(Tt[e]??Tt.sweet)[o-1]??""]),f=ye(i),g=js[n][o-1],u=f!=="neutral"&&Va.includes(f)&&n==="chatter"?f:g;return{message:(c+h).trim(),emotion:u,intensity:o}}function qs(t,e=Ae()){const i=Z("greeting",{intensity:e}),a=(Tt[t]??Tt.sweet)[ve(e)-1]??"";return{...i,message:(i.message+a).trim()}}const or=s`
  <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
    <path fill="currentColor" fill-rule="evenodd" d="M248.79 202.75C241.99 205.36 234.02 203.88 227.23 207.25C232.74 212.7 238.24 218.16 243.75 223.61C248.93 222.7 253.79 221.68 259.12 222.23C275.19 223.91 288.52 236.22 290.8 252.31C291.65 258.33 289.87 263.49 288.92 269.25C297.53 277.58 306.14 285.91 314.75 294.24C319.55 292.66 324.48 288.29 328.56 285.31C336.24 279.7 355.63 264.75 359.75 256.85C357.42 251.81 349.38 245.47 345.25 241.51C328.91 225.87 308.81 213.57 287.1 207.2C282.65 205.9 277.87 204.6 273.25 204.06C269.99 203.67 266.48 203.74 263.35 202.75C262.3 196.37 262.26 174.4 265.23 168.95C269.38 161.35 278.78 155.81 286.08 151.79C306.44 140.57 330.55 132.62 353.75 129.98C365.91 128.59 377.94 126.6 390.25 126.49C394.03 126.45 400.93 124.83 402.71 129.51C404.19 133.39 403.02 139.61 403.03 143.75C403.03 154.75 403.03 165.75 403.03 176.75C403.03 214.25 403.04 251.75 403.03 289.25C403.02 301.08 403.01 312.92 403.03 324.75C403.03 328.47 404.42 335.11 400.86 337.6C397.08 340.23 386.89 338.61 382.25 338.71C368.12 339.01 354.2 339.66 340.28 342.14C320.39 345.69 301.88 353.2 284.49 363.27C279.59 366.11 274.99 369.77 270.57 373.32C268.37 375.08 266.24 377.65 263.75 378.89C262.27 376.96 263.21 364.83 263.21 361.75C263.19 350.33 263.17 338.92 263.22 327.5C263.24 322.34 262.32 316.27 263.4 311.25C270.81 309.75 278.22 308.25 285.63 306.75C280.34 301.52 275.04 296.29 269.75 291.06C262.81 291.98 256.4 293.34 249.34 291.8C234.72 288.62 223.66 276.85 221.21 262.15C220.06 255.3 222.47 250.1 222.86 243.75C214.49 235.57 206.12 227.39 197.75 219.21C193.28 220.61 189.03 224.28 185.15 226.89C174.55 233.99 159.34 246.13 152.28 256.75C156.09 263 163 268.47 168.44 273.31C184.26 287.39 202.26 299.16 222.48 305.75C227.85 307.5 233.67 309.06 239.28 309.87C242.46 310.34 245.84 310.14 248.9 311.2C248.9 333.72 248.9 356.23 248.9 378.75C245.9 377.81 243 374.3 240.42 372.33C235.16 368.34 229.73 364.6 224.1 361.17C208.2 351.49 189.88 345.69 171.67 342.17C157.08 339.34 142.11 338.31 127.25 338.59C123.4 338.66 112.88 340.21 110.35 336.93C107.8 333.61 109.13 327.21 109.14 323.25C109.14 311.25 109.08 299.25 109.15 287.25C109.37 250.25 109.2 213.25 109.13 176.25C109.12 165.25 109.13 154.25 109.14 143.25C109.14 139.38 107.93 133.23 109.39 129.64C111.39 124.72 119.14 126.37 123.25 126.52C136.57 127.02 149.78 128.38 162.89 130.8C185.38 134.94 208.77 140.63 228.38 152.84C235.06 157 244.67 162.69 247.79 170.4C250.03 175.95 249.28 196.1 248.79 202.75ZM188.81 185.14C184.53 186.2 182.77 191.54 185.2 195.06C189.11 200.72 199.68 209.47 204.98 214.76C232.26 241.93 258.92 269.89 286.82 296.41C294.76 303.96 302.04 312.25 310.15 319.61C313.46 322.62 317.86 324.65 321.55 320.79C324.49 317.71 323.32 313.84 320.62 311.15C312.86 303.42 305 295.73 297.11 288.13C270.03 262.08 244.18 234.72 217.27 208.48C211.03 202.4 204.89 196.18 198.75 189.99C195.96 187.17 193.23 184.03 188.81 185.14ZM242.89 388.25C239.88 388.8 235 386.29 231.95 385.3C225.25 383.12 218.1 381.48 211.18 380.16C197.78 377.61 184.34 376.21 170.75 375.12C161.31 374.36 151.99 374.57 142.83 371.84C135.32 369.6 128.91 364.79 123.97 358.79C122.75 357.31 120.22 354.68 120.33 352.75C122.81 351.37 126.43 351.59 129.25 351.33C137.9 350.53 147.1 350.61 155.75 351.4C185.38 354.1 223.44 363.47 242.89 388.25ZM391.12 352.75C389.88 360.29 376.46 368.65 369.91 371.21C360.47 374.91 350.23 374.47 340.25 375.14C326.51 376.08 312.83 377.42 299.33 380.16C292.82 381.48 286.26 383.32 279.93 385.23C276.86 386.16 272.08 388.87 269.1 388.25C289.12 363.15 326.86 353.51 357.25 351.31C365.54 350.71 373.97 350.77 382.25 351.38C384.87 351.58 388.99 351.28 391.12 352.75Z" />
  </svg>
`;var Ks=Object.defineProperty,Vs=Object.getOwnPropertyDescriptor,Ce=(t,e,i,a)=>{for(var r=a>1?void 0:a?Vs(e,i):e,o=t.length-1,n;o>=0;o--)(n=t[o])&&(r=(a?n(e,i,r):n(r))||r);return a&&r&&Ks(e,i,r),r};const Ys=Z("greeting",{intensity:Ae()}),ma=["happy","neutral","thinking","mischievous","surprised"];let oe=class extends C{constructor(){super(...arguments),this.error="",this.busy=!1,this.libbyMessage=Ys.message,this.libbyTone="success",this.libbyEmotion=ma[Math.floor(Math.random()*ma.length)],this.libbyIntensity=Ae(),this.onLibby=t=>{this.libbyMessage=t.detail.message,this.libbyTone=t.detail.tone;const e=t.detail.tone==="error"?Ya(t.detail.message):{emotion:"happy",intensity:1};this.libbyEmotion=ye(t.detail.emotion??e.emotion),this.libbyIntensity=ve(t.detail.intensity??e.intensity),this.libbyTimer&&clearTimeout(this.libbyTimer),this.libbyTimer=window.setTimeout(()=>{this.libbyMessage=""},5e3)},this.onKeydown=t=>{t.key==="Enter"&&!this.busy&&(t.preventDefault(),this.form.requestSubmit())}}connectedCallback(){super.connectedCallback(),window.addEventListener("oppai-mascot",this.onLibby),this.libbyTimer=window.setTimeout(()=>this.libbyMessage="",5e3)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("oppai-mascot",this.onLibby),this.libbyTimer&&clearTimeout(this.libbyTimer)}async submit(t){if(t.preventDefault(),this.busy)return;this.error="",this.busy=!0;const e=t.target,i=e.elements.namedItem("username").value,a=e.elements.namedItem("password").value;try{const r=await v.login(i,a);Ct(r.token);const o=Z("login");H(`${o.message.replace(/\.$/,"")}, ${r.user.username}.`,"success",{emotion:o.emotion,intensity:o.intensity}),this.dispatchEvent(new CustomEvent("logged-in",{detail:r.user,bubbles:!0,composed:!0}))}catch(r){if(this.error=r.message||"login failed",this.error==="unauthorized"){const o=Z("loginFail");H(o.message,"error",{emotion:o.emotion,intensity:o.intensity})}else H(this.error)}finally{this.busy=!1}}render(){const t=Bi(this.libbyEmotion,this.libbyIntensity),e=Et()?null:s`<div class="libby ${this.libbyMessage?"talking":""} ${this.libbyTone}">
          ${this.libbyMessage?s`<div class="libby-speech" role=${this.libbyTone==="error"?"alert":"status"}>
            <span class="libby-name">LIBBY</span>${this.libbyMessage}
          </div>`:null}
          <img src=${t[0]} data-fallback-index="0" alt=${`Libby feeling ${this.libbyEmotion}`}
            @error=${i=>Ui(i.target,t)} />
        </div>`;return s`
      ${e}
      <form class="card" @submit=${this.submit} @keydown=${this.onKeydown}>
        <span class="logo">${or}</span>
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
    `}};oe.styles=[ne,_`
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
        width: min(48vw, 540px);
        height: min(82vh, 720px);
        pointer-events: none;
        user-select: none;
      }
      .libby img {
        display: block;
        height: 100%;
        width: 100%;
        object-fit: contain;
        object-position: right bottom;
      }
      .libby.error img { filter: saturate(.82); }
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
      @media (max-width: 900px) {
        .libby {
          right: 50%;
          transform: translateX(50%);
          width: min(88vw, 390px);
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
    `];Ce([d()],oe.prototype,"error",2);Ce([d()],oe.prototype,"busy",2);Ce([d()],oe.prototype,"libbyMessage",2);Ce([d()],oe.prototype,"libbyTone",2);Ce([d()],oe.prototype,"libbyEmotion",2);Ce([d()],oe.prototype,"libbyIntensity",2);Ce([S("form")],oe.prototype,"form",2);oe=Ce([I("oppai-login")],oe);const Xe=[];let Js=1;function je(){window.dispatchEvent(new CustomEvent("oppai-downloads",{detail:Xe.map(t=>({...t}))}))}function Xs(){return Xe.map(t=>({...t}))}function sr(t,e){const i={id:Js++,label:t,progress:.02,state:"running"};return Xe.unshift(i),je(),e(r=>{i.state==="running"&&(i.progress=Math.max(i.progress,Math.min(.98,r)),je())}).then(()=>{i.progress=1,i.state="done",je(),window.dispatchEvent(new CustomEvent("oppai-download-complete",{detail:{id:i.id}}))}).catch(r=>{i.state="error",i.error=r instanceof Error?r.message:"Download failed",je()}),i.id}function Zs(t){const e=Xe.findIndex(i=>i.id===t);e>=0&&(Xe.splice(e,1),je())}function nr(t){return t.composedPath().some(e=>e instanceof HTMLElement&&(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable))}const Y={image:{label:"Photos",typeLabel:"PHOTO",icon:"photo_library",aspect:"4 / 3"},gif:{label:"GIFs",typeLabel:"GIF",icon:"animation",aspect:"1 / 1"},video:{label:"Videos",typeLabel:"VIDEO",icon:"movie",aspect:"16 / 9"},game:{label:"Games",typeLabel:"GAME",icon:"sports_esports",aspect:"3 / 4"},comic:{label:"Comics",typeLabel:"COMIC",icon:"auto_stories",aspect:"2 / 3"}},Ze=["image","gif","video","game","comic"],va=["linear-gradient(135deg, oklch(34% 0.06 60), oklch(22% 0.05 55))","linear-gradient(135deg, oklch(33% 0.07 45), oklch(21% 0.05 40))","linear-gradient(135deg, oklch(32% 0.07 30), oklch(20% 0.05 25))","linear-gradient(135deg, oklch(34% 0.055 75), oklch(22% 0.045 70))","linear-gradient(135deg, oklch(32% 0.06 20), oklch(20% 0.05 15))"];function Re(t){return va[Math.abs(t.id)%va.length]}function Qs(t){return t.kind==="image"||t.kind==="gif"||!!t.hasThumb}function _t(t){const e=Math.max(0,Math.round(t)),i=Math.floor(e/60),a=e%60;return`${i}:${String(a).padStart(2,"0")}`}function He(t){if(!t)return"";const e=["B","KB","MB","GB","TB"];let i=t,a=0;for(;i>=1024&&a<e.length-1;)i/=1024,a++;return`${i<10&&a>0?i.toFixed(1):Math.round(i)} ${e[a]}`}function lr(t){switch(t.kind){case"video":case"gif":return t.duration?_t(t.duration):He(t.size);case"image":return t.width&&t.height?`${t.width}×${t.height}`:He(t.size);case"game":return He(t.size);case"comic":return t.pageCount?`${t.pageCount} pages`:He(t.size);default:return He(t.size)}}function en(t){return t.tags&&t.tags.length?t.tags[0].name:Y[t.kind].label.replace(/s$/,"")}const dr="oppai_favorites";function tn(){try{const t=localStorage.getItem(dr);return t?new Set(JSON.parse(t).filter(e=>typeof e=="number")):new Set}catch{return new Set}}function jt(t){try{localStorage.setItem(dr,JSON.stringify([...t]))}catch{}}const cr="oppai_comic_fit",pr="oppai_comic_pos";function hr(){return localStorage.getItem(cr)==="width"?"width":"page"}function ur(t){try{localStorage.setItem(cr,t)}catch{}}function mr(){try{const t=localStorage.getItem(pr);return t?JSON.parse(t):{}}catch{return{}}}function an(t){const e=mr()[String(t)];return typeof e=="number"&&e>=1?e:1}function rn(t,e){try{const i=mr();i[String(t)]=e,localStorage.setItem(pr,JSON.stringify(i))}catch{}}var on=Object.defineProperty,sn=Object.getOwnPropertyDescriptor,M=(t,e,i,a)=>{for(var r=a>1?void 0:a?sn(e,i):e,o=t.length-1,n;o>=0;o--)(n=t[o])&&(r=(a?n(e,i,r):n(r))||r);return a&&r&&on(e,i,r),r};let D=class extends C{constructor(){super(...arguments),this.favorite=!1,this.queue=[],this.full=null,this.activeTag=null,this.tagging=!1,this.editing=!1,this.saving=!1,this.editTitle="",this.editNotes="",this.editKind="image",this.editTags=[],this.newTag="",this.screenshot="",this.userGallery=[],this.galleryUploading=!1,this.comic=null,this.page=1,this.fit=hr(),this.onKey=t=>{var a;if(nr(t))return;const e=this.full??this.media;if(e.kind==="comic"){this.onComicKey(t);return}if(e.kind!=="video")return;const i=this.videoEl();if(i)switch(t.key){case" ":case"k":t.preventDefault(),i.paused?i.play():i.pause();break;case"j":i.currentTime=Math.max(0,i.currentTime-10);break;case"l":i.currentTime=Math.min(i.duration||1/0,i.currentTime+10);break;case"m":i.muted=!i.muted;break;case"f":t.preventDefault(),document.fullscreenElement?document.exitFullscreen():(a=i.requestFullscreen)==null||a.call(i);break}},this.cancelEdit=()=>{this.editing=!1}}connectedCallback(){super.connectedCallback(),this.loadItem(),window.addEventListener("keydown",this.onKey)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this.onKey),this.clearMediaSession()}updated(t){if(t.has("media")){const e=t.get("media");e&&e.id!==this.media.id&&(this.editing=!1,this.activeTag=null,this.loadItem())}this.setupMediaSession()}loadItem(){const t=this.media;this.full=t,v.getMedia(t.id).then(e=>this.full=e).catch(()=>this.full=t),this.comic=null,t.kind==="comic"&&this.loadComic(t.id),this.userGallery=[],t.kind==="game"&&this.loadGameGallery(t.id)}async loadGameGallery(t){try{const e=await v.gameGallery(t);this.media.id===t&&(this.userGallery=e.items)}catch{this.userGallery=[]}}async uploadGameGallery(t,e){const i=t.target,a=[...i.files??[]];if(i.value="",!(!a.length||this.galleryUploading)){this.galleryUploading=!0;try{for(const r of a)this.userGallery=[...this.userGallery,await v.uploadGameGallery(e,r)]}finally{this.galleryUploading=!1}}}async removeGameGallery(t,e){await v.removeGameGallery(t,e),this.userGallery=this.userGallery.filter(i=>i.id!==e)}async loadComic(t){try{const e=await v.comicInfo(t);if(this.media.id!==t)return;this.comic=e,e.readable&&e.pages>0&&(this.page=Math.min(Math.max(an(t),1),e.pages),this.preloadPage(t,this.page+1))}catch(e){if(this.media.id!==t)return;this.comic={readable:!1,pages:0,reason:e.message}}}preloadPage(t,e){var i;!((i=this.comic)!=null&&i.readable)||e<1||e>this.comic.pages||(new Image().src=v.pageURL(t,e))}goPage(t){var a,r;if(!((a=this.comic)!=null&&a.readable))return;const e=this.full??this.media,i=Math.min(Math.max(t,1),this.comic.pages);i!==this.page&&(this.page=i,rn(e.id,i),this.preloadPage(e.id,i+1),this.fit==="width"&&((r=this.renderRoot.querySelector(".reader-stage"))==null||r.scrollIntoView({block:"start"})))}setFit(t){this.fit=t,ur(t)}videoEl(){var t;return((t=this.renderRoot)==null?void 0:t.querySelector("video"))??null}onComicKey(t){var e;if((e=this.comic)!=null&&e.readable)switch(t.key){case"ArrowRight":case"PageDown":case" ":t.preventDefault(),this.goPage(this.page+1);break;case"ArrowLeft":case"PageUp":t.preventDefault(),this.goPage(this.page-1);break;case"Home":t.preventDefault(),this.goPage(1);break;case"End":t.preventDefault(),this.goPage(this.comic.pages);break}}emitNavigate(t){this.dispatchEvent(new CustomEvent("navigate",{detail:{dir:t},bubbles:!0,composed:!0}))}setupMediaSession(){const t=this.full??this.media;if(t.kind!=="video"||!("mediaSession"in navigator))return;const e=this.videoEl();if(!e)return;const i=navigator.mediaSession;try{i.metadata=new MediaMetadata({title:t.title,artist:"OppaiLib"})}catch{}const a=(r,o)=>{try{i.setActionHandler(r,o)}catch{}};a("play",()=>void e.play()),a("pause",()=>e.pause()),a("seekbackward",r=>{e.currentTime=Math.max(0,e.currentTime-(r.seekOffset??10))}),a("seekforward",r=>{e.currentTime=Math.min(e.duration||1/0,e.currentTime+(r.seekOffset??10))}),a("seekto",r=>{r.seekTime!=null&&(e.currentTime=r.seekTime)}),a("previoustrack",()=>this.emitNavigate(-1)),a("nexttrack",()=>this.emitNavigate(1))}clearMediaSession(){if(!("mediaSession"in navigator))return;const t=navigator.mediaSession,e=["play","pause","seekbackward","seekforward","seekto","previoustrack","nexttrack"];for(const i of e)try{t.setActionHandler(i,null)}catch{}t.metadata=null}toggleFav(){this.dispatchEvent(new CustomEvent("toggle-favorite",{bubbles:!0,composed:!0}))}async retag(){this.tagging=!0;try{const t=await v.autotag(this.media.id);this.full&&(this.full={...this.full,tags:t.tags}),this.activeTag=null,this.dispatchEvent(new CustomEvent("changed",{bubbles:!0,composed:!0})),H(t.tags.length?`Tags refreshed — ${t.tags.length} found.`:"Tagging finished, but nothing cleared your confidence threshold.","success")}catch(t){console.error("autotag",t),H(`Auto-tagging failed: ${t.message}`,"error")}finally{this.tagging=!1}}hasTimeline(t){var i;const e=this.full??this.media;return e.kind==="video"&&!!e.duration&&!!((i=t.moments)!=null&&i.length)}toggleTagTimeline(t){this.hasTimeline(t)&&(this.activeTag=this.activeTag===t.id?null:t.id)}seekTo(t){const e=this.videoEl();e&&(e.currentTime=t,e.play())}renderTimeline(t){var a;if(t.kind!=="video"||!t.duration)return l;const e=(t.tags??[]).find(r=>r.id===this.activeTag);if(!((a=e==null?void 0:e.moments)!=null&&a.length))return l;const i=t.duration;return s`
      <div class="timeline">
        <div class="rail">
          ${e.moments.map(r=>s`<button
              class="marker"
              style="left:${Math.min(100,r/i*100)}%"
              title="Jump to ${_t(r)}"
              aria-label="Jump to ${_t(r)}"
              @click=${()=>this.seekTo(r)}
            ></button>`)}
        </div>
        <div class="rail-legend">
          <span class="material-symbols-rounded" style="font-size:16px;">auto_awesome</span>
          <span
            >“${e.name}” detected at ${e.moments.map(r=>_t(r)).join(", ")} — click a
            marker to jump.</span
          >
        </div>
      </div>
    `}startEdit(){const t=this.full??this.media;this.editTitle=t.title,this.editNotes=t.notes??"",this.editKind=t.kind,this.editTags=(t.tags??[]).map(e=>e.name),this.newTag="",this.editing=!0}removeEditTag(t){this.editTags=this.editTags.filter(e=>e!==t)}commitNewTag(){const t=this.newTag.trim();t&&!this.editTags.includes(t)&&(this.editTags=[...this.editTags,t]),this.newTag=""}onTagKeydown(t){(t.key==="Enter"||t.key===",")&&(t.preventDefault(),this.commitNewTag())}async saveEdit(){const t=this.full??this.media;this.commitNewTag();const e=(t.tags??[]).map(r=>r.name),i=this.editTags.filter(r=>!e.includes(r)),a=e.filter(r=>!this.editTags.includes(r));this.saving=!0;try{const r=await v.updateMedia(t.id,{title:this.editTitle,notes:this.editNotes,kind:this.editKind,addTags:i,removeTags:a});this.full=r,this.editing=!1,this.dispatchEvent(new CustomEvent("changed",{bubbles:!0,composed:!0}))}catch(r){console.error("save edit",r)}finally{this.saving=!1}}async doDelete(){const t=this.full??this.media;if(confirm(`Delete "${t.title}"? This cannot be undone.`))try{await v.deleteMedia(t.id);const e=Z("libraryDelete");H(e.message,"success",{emotion:e.emotion,intensity:e.intensity}),this.dispatchEvent(new CustomEvent("deleted",{detail:{id:t.id},bubbles:!0,composed:!0}))}catch(e){console.error("delete",e)}}renderEdit(){return s`
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
            ${Ze.map(t=>s`<option value=${t} ?selected=${t===this.editKind}>${Y[t].label}</option>`)}
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
            ${this.editTags.map(t=>s`<span class="tag-pill"
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
    `}favIcon(){return s`<span
      class="material-symbols-rounded fill-icon"
      style="font-size:22px; color:${this.favorite?"var(--oppai-fav)":"var(--oppai-text)"};"
      >${this.favorite?"favorite":"favorite_border"}</span
    >`}render(){const t=this.full??this.media,e=v.streamURL(t.id);return s`
      <div class="wrap">
        ${this.renderStage(t,e)}
        ${t.kind==="video"?this.renderUpNext(t):l}
        ${this.renderTimeline(t)}
        ${t.kind==="game"?l:this.renderMeta(t)}
      </div>
      ${this.screenshot?s`<button class="shot-lightbox" aria-label="Close screenshot" @click=${()=>this.screenshot=""}>
            <img src=${this.screenshot} alt="Full-size game screenshot" />
          </button>`:l}
    `}renderUpNext(t){const e=this.queue.filter(a=>a.kind==="video");if(e.some(a=>a.id===t.id)||e.unshift(t),e.length<2)return l;const i=e.findIndex(a=>a.id===t.id);return s`
      <div class="upnext">
        <div class="upnext-label">Videos</div>
        <div class="strip">
          ${e.map((a,r)=>s`
              <button
                class="strip-item ${a.id===t.id?"on":""}"
                title=${a.title}
                aria-current=${a.id===t.id}
                @click=${()=>this.jumpTo(a.id)}
              >
                ${a.hasThumb?s`<img src=${v.thumbURL(a.id)} loading="lazy" alt=${a.title} />`:s`<span class="strip-blank" style="background:${Re(a)};"></span>`}
                ${a.kind==="video"?s`<span class="strip-play material-symbols-rounded">play_circle</span>`:l}
                ${r===i+1?s`<span class="strip-next">Next</span>`:l}
              </button>
            `)}
        </div>
      </div>
    `}jumpTo(t){t!==this.media.id&&this.dispatchEvent(new CustomEvent("jump",{detail:{id:t},bubbles:!0,composed:!0}))}renderStage(t,e){switch(t.kind){case"video":const i=t.width&&t.height?t.width/t.height:1.7777777777777777;return s`<div
          class="stage video-stage"
          style="aspect-ratio:${i}; width:100%; max-width:${76*i}vh; background:${Re(t)};"
        >
          <video
            src=${e}
            poster=${t.hasThumb?v.thumbURL(t.id):l}
            controls
            autoplay
            playsinline
            preload="metadata"
          ></video>
        </div>`;case"gif":case"image":return s`<div class="stage-fit">
          <img src=${e} alt=${t.title} />
        </div>`;case"comic":return this.renderComic(t);case"game":return this.renderGame(t,e);default:return l}}renderComic(t){return s`
      <div class="reader">
        ${this.comic===null?s`<div class="reader-fallback" style="background:${Re(t)};">
              <span class="mono" style="color:#fff;">OPENING…</span>
            </div>`:this.comic.readable?this.renderReader(t,this.comic):this.renderComicFallback(t,this.comic)}
      </div>
    `}renderReader(t,e){const i=this.page<=1,a=this.page>=e.pages;return s`
      <div class="reader-stage">
        <img
          class="page-img ${this.fit==="width"?"fit-width":"fit-page"}"
          src=${v.pageURL(t.id,this.page)}
          alt="Page ${this.page} of ${t.title}"
        />
        <button
          class="turn prev"
          title="Previous page"
          ?disabled=${i}
          @click=${()=>this.goPage(this.page-1)}
        >
          ${i?l:s`<span class="material-symbols-rounded" style="font-size:28px;">chevron_left</span>`}
        </button>
        <button
          class="turn next"
          title="Next page"
          ?disabled=${a}
          @click=${()=>this.goPage(this.page+1)}
        >
          ${a?l:s`<span class="material-symbols-rounded" style="font-size:28px;">chevron_right</span>`}
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
          @input=${r=>this.goPage(Number(r.target.value))}
          aria-label="Page"
        />
        <span class="mono">${this.page} / ${e.pages}</span>
        <button class="round-btn" title="Next page" ?disabled=${a} @click=${()=>this.goPage(this.page+1)}>
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
    `}renderComicFallback(t,e){return s`
      <div class="reader-fallback" style="background:${Re(t)};">
        <span class="material-symbols-rounded" style="font-size:40px; color:#fff;">auto_stories</span>
        <span class="mono" style="color:#fff;">CAN'T READ IN APP</span>
        <span style="font-size:12px; color:rgba(255,255,255,0.75);">
          ${e.reason??"Unsupported archive."} Only .cbz / .zip comics can be paged through here.
        </span>
        <a href=${v.streamURL(t.id)} download style="color:#fff; font-size:12px; font-weight:600; margin-top:6px;"
          >Download the file</a
        >
      </div>
    `}renderGame(t,e){const i=t.download?this.hostOf(t.download):"";return s`
      <div class="game">
        <div class="game-cover" style="background:${Re(t)};">
          ${t.hasThumb?s`<img
                src=${v.thumbURL(t.id)}
                alt=${t.title}
                style="width:100%; height:100%; object-fit:cover;"
              />`:s`<span class="material-symbols-rounded" style="font-size:48px; color:#fff;">sports_esports</span>`}
        </div>
        <div style="flex:1; min-width:260px; padding-top:8px;">
          <div class="meta-head">
            <h2 class="meta-title">${t.title}</h2>
            ${this.renderActions(!1)}
          </div>
          ${this.editing?this.renderEdit():s`
                <div class="sub">${Y.game.label.replace(/s$/,"")}</div>
                <div class="actions">
                  ${t.download?s`<a class="btn-primary" href=${t.download} target="_blank" rel="noreferrer">
                        <span class="material-symbols-rounded fill-icon" style="font-size:20px;">open_in_new</span>
                        ${i?`Get it on ${i}`:"Get it"}
                      </a>`:s`<a class="btn-primary" href=${e} download>
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
                ${t.notes?s`<p class="desc">${t.notes}</p>`:s`<p class="desc">A title from your library.</p>`}
                ${this.renderTags(t)}
                ${t.gallery&&t.gallery.length?s`<div class="shots">
                      ${t.gallery.map(a=>s`<button
                        class="shot"
                        title="Open full-size screenshot"
                        @click=${()=>this.screenshot=v.proxyURL(a)}
                      ><img loading="lazy" src=${v.proxyURL(a)} alt="screenshot" /></button>`)}
                    </div>`:l}
                <div class="section-label">User gallery</div>
                <div class="shots">
                  ${this.userGallery.map(a=>s`<div class="shot user-shot">
                    ${a.kind==="video"?s`<video controls preload="metadata" src=${v.streamURL(a.id)}></video>`:s`<button class="shot" title="Open full-size upload"
                          @click=${()=>this.screenshot=v.streamURL(a.id)}>
                          <img loading="lazy" src=${v.thumbURL(a.id)} alt=${a.title} />
                        </button>`}
                    <button class="remove-shot" title="Remove from game gallery"
                      @click=${()=>void this.removeGameGallery(t.id,a.id)}>×</button>
                  </div>`)}
                </div>
                <label class="btn-outline gallery-upload">
                  <span class="material-symbols-rounded">add_photo_alternate</span>
                  ${this.galleryUploading?"Uploading…":"Add photos or videos"}
                  <input type="file" accept="image/*,video/*" multiple hidden ?disabled=${this.galleryUploading}
                    @change=${a=>void this.uploadGameGallery(a,t.id)} />
                </label>
                ${t.source?s`<div class="meta-note">
                      Source:
                      <a href=${t.source} target="_blank" rel="noreferrer" style="color:var(--oppai-primary-bright);">link</a>
                    </div>`:l}
              `}
        </div>
      </div>
    `}hostOf(t){try{return new URL(t).hostname.replace(/^www\./,"")}catch{return""}}renderActions(t=!0){return s`
      ${t?s`<button class="icon-round" title="Auto-tag" @click=${this.retag} ?disabled=${this.tagging}>
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
    `}renderMeta(t){const e=Y[t.kind];return s`
      <div class="meta">
        <div class="meta-head">
          <h2 class="meta-title">${t.title}</h2>
          ${this.renderActions()}
        </div>
        ${this.editing?this.renderEdit():s`
              <div class="chips">
                <span class="chip chip-accent">${lr(t)||e.label}</span>
                <span class="chip chip-muted">${e.typeLabel}</span>
              </div>
              ${this.renderTags(t)}
              ${t.notes?s`<p class="desc" style="margin-top:16px;">${t.notes}</p>`:l}
              ${t.source?s`<div class="meta-note">
                    Source:
                    <a href=${t.source} target="_blank" rel="noreferrer" style="color:var(--oppai-primary-bright);">link</a>
                  </div>`:l}
            `}
      </div>
    `}renderTags(t){const e=t.tags??[];if(e.length===0)return s`<div class="meta-note" style="margin-top:14px;">
        No tags yet — use the ✨ auto-tag button.
      </div>`;const i=e.some(a=>this.hasTimeline(a));return s`
      <div class="chips">
        ${e.map(a=>this.renderTagChip(a))}
      </div>
      ${i&&this.activeTag==null?s`<div class="meta-note" style="margin-top:10px;">
            Tap a ✨ tag to see where it appears in this video.
          </div>`:l}
    `}renderTagChip(t){const e=`${t.category}${t.source?" · "+t.source:""}`;if(!this.hasTimeline(t))return s`<span class="chip chip-muted" title=${e}>${t.name}</span>`;const i=this.activeTag===t.id,a=t.moments.length;return s`<button
      class="chip ${i?"on":"chip-muted"}"
      title="${e} · seen at ${a} point${a===1?"":"s"}"
      aria-pressed=${i}
      @click=${()=>this.toggleTagTimeline(t)}
    >
      <span class="material-symbols-rounded" style="font-size:14px;">auto_awesome</span>
      ${t.name}
    </button>`}};D.styles=[ke,ne,_`
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
      .gallery-upload { margin-top:12px; display:inline-flex; align-items:center; gap:6px; cursor:pointer; }
      .user-shot { position:relative; }
      .user-shot video { width:100%; height:100%; object-fit:cover; background:#000; }
      .remove-shot { position:absolute; right:4px; top:4px; border:0; border-radius:50%; color:#fff;
        background:rgba(0,0,0,.7); width:26px; height:26px; cursor:pointer; }
    `];M([m({attribute:!1})],D.prototype,"media",2);M([m({type:Boolean})],D.prototype,"favorite",2);M([m({attribute:!1})],D.prototype,"queue",2);M([d()],D.prototype,"full",2);M([d()],D.prototype,"activeTag",2);M([d()],D.prototype,"tagging",2);M([d()],D.prototype,"editing",2);M([d()],D.prototype,"saving",2);M([d()],D.prototype,"editTitle",2);M([d()],D.prototype,"editNotes",2);M([d()],D.prototype,"editKind",2);M([d()],D.prototype,"editTags",2);M([d()],D.prototype,"newTag",2);M([d()],D.prototype,"screenshot",2);M([d()],D.prototype,"userGallery",2);M([d()],D.prototype,"galleryUploading",2);M([d()],D.prototype,"comic",2);M([d()],D.prototype,"page",2);M([d()],D.prototype,"fit",2);D=M([I("oppai-viewer")],D);var nn=Object.defineProperty,ln=Object.getOwnPropertyDescriptor,ie=(t,e,i,a)=>{for(var r=a>1?void 0:a?ln(e,i):e,o=t.length-1,n;o>=0;o--)(n=t[o])&&(r=(a?n(e,i,r):n(r))||r);return a&&r&&nn(e,i,r),r};let J=class extends C{constructor(){super(...arguments),this.urls="",this.results=[],this.failures=[],this.chosen=new Set,this.busy=!1,this.phase="",this.fetchCount=0,this.error="",this.kind="image",this.kindTouched=!1,this.onUrlKeydown=t=>{t.key==="Enter"&&(t.ctrlKey||t.metaKey)&&(t.preventDefault(),this.fetch())}}open(){this.results=[],this.failures=[],this.chosen=new Set,this.error="",this.urls="",this.phase="",this.fetchCount=0,this.kind="image",this.kindTouched=!1,this.dialog.show()}get isGame(){return this.kind==="game"}get isComic(){return this.kind==="comic"}get urlList(){const t=new Set;return this.urls.split(/[\n,]/).map(e=>e.trim()).filter(e=>e&&!t.has(e)&&(t.add(e),!0))}get totalMedia(){return this.results.reduce((t,e)=>t+e.mediaUrls.length,0)}async fetch(){var e;const t=this.urlList;if(!(t.length===0||this.busy)){this.busy=!0,this.phase="fetching",this.fetchCount=t.length,this.error="",this.results=[],this.failures=[];try{const{items:i}=await v.scrapeBulk(t),a=new Set;for(const o of i)if(o.result){const n={...o.result,tags:o.result.tags??[],performers:o.result.performers??[],mediaUrls:o.result.mediaUrls??[],screenshots:o.result.screenshots??[],categorizedTags:o.result.categorizedTags??[]};this.results=[...this.results,n],n.mediaUrls.forEach(c=>a.add(c))}else this.failures=[...this.failures,{url:o.url,error:o.error||"failed"}];this.chosen=a;const r=(e=this.results.find(o=>o.kind))==null?void 0:e.kind;r&&(this.kind=r),this.kindTouched=!1,this.results.length===0&&this.failures.length>0&&(this.error="Nothing could be fetched from those links.")}catch(i){this.error=i.message}finally{this.busy=!1,this.phase=""}}}pickKind(t){this.kind=t,this.kindTouched=!0}toggle(t){const e=new Set(this.chosen);e.has(t)?e.delete(t):e.add(t),this.chosen=e}import(){if(this.busy||!this.isGame&&this.chosen.size===0||this.isGame&&this.results.length===0)return;this.error="";const t=[...this.results],e=new Set(this.chosen),i=this.kindTouched,a=this.kind,r=t.length===1?t[0].title||"Import":`${t.length} imports`;sr(r,async o=>{let n=0,c=0;for(const h of t){const f=i?a:h.kind||a;if(f==="game"){const y=await v.scrapeImport({url:h.sourceUrl,title:h.title,tags:h.tags,categorizedTags:h.categorizedTags,kind:"game"});n+=y.count,o(++c/t.length);continue}const g=h.mediaUrls.filter(y=>e.has(y));if(g.length===0){o(++c/t.length);continue}const u=await v.scrapeImport({url:h.sourceUrl,mediaUrls:g,title:h.title,tags:h.tags,categorizedTags:h.categorizedTags,kind:f});n+=u.count,o(++c/t.length)}this.dispatchEvent(new CustomEvent("imported",{detail:{count:n},bubbles:!0,composed:!0}))}),this.dialog.close()}renderGroup(t){return s`
      <div class="group">
        <div class="meta"><strong>${t.title||"(untitled)"}</strong></div>
        ${t.description?s`<div class="meta">${t.description}</div>`:""}
        ${t.tags.length?s`<div class="tags">
              ${t.tags.map(e=>s`<md-filter-chip label=${e} selected></md-filter-chip>`)}
            </div>`:""}
        ${this.isGame?this.renderGameGroup(t):this.renderMediaGroup(t)}
        ${this.isComic?this.renderComicHint(t):""}
      </div>
    `}renderComicHint(t){const e=t.mediaUrls.filter(i=>this.chosen.has(i)).length;return e===0?s`<div class="game-hint">Select the pages to include.</div>`:e===1?s`<div class="game-hint">
        A single page imports as one file. Select more pages to bundle them into a comic.
      </div>`:s`<div class="game-hint">
      Imports as one <strong>comic</strong> entry — ${e} pages bundled into a CBZ, in the order
      shown. Deselect any covers or banners that aren't pages.
    </div>`}renderMediaGroup(t){return t.mediaUrls.length?s`<div class="previews">
          ${t.mediaUrls.map(e=>s`<div class="pv ${this.chosen.has(e)?"sel":""}" @click=${()=>this.toggle(e)}>
              <img src=${v.proxyURL(e)} loading="lazy" />
            </div>`)}
        </div>`:s`<div class="meta">No media found on that page.</div>`}renderGameGroup(t){var i,a;const e=t.cover||t.mediaUrls[0];return s`
      ${e?s`<div class="previews">
            <div class="pv sel"><img src=${v.proxyURL(e)} loading="lazy" /></div>
          </div>`:s`<div class="meta">No cover image found.</div>`}
      ${(i=t.screenshots)!=null&&i.length?s`<div class="shots">
            ${t.screenshots.slice(0,8).map(r=>s`<img src=${v.proxyURL(r)} loading="lazy" />`)}
          </div>`:""}
      <div class="game-hint">
        Imports as one <strong>game</strong> entry — cover art, description, tags${(a=t.screenshots)!=null&&a.length?`, ${t.screenshots.length} screenshot${t.screenshots.length===1?"":"s"}`:""} and a download link.
      </div>
    `}renderTypeRow(){return this.results.length===0?"":s`
      <div class="typerow">
        <span class="lbl">Import as</span>
        ${Ze.map(t=>s`<md-filter-chip
            label=${Y[t].label}
            ?selected=${this.kind===t}
            @click=${()=>this.pickKind(t)}
          ></md-filter-chip>`)}
      </div>
    `}render(){return s`
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
          ${this.error?s`<div class="err">${this.error}</div>`:""}
          ${this.phase==="fetching"?s`<div class="progress">
                <md-circular-progress indeterminate></md-circular-progress>
                <span>Fetching ${this.fetchCount} link${this.fetchCount===1?"":"s"}… some sites can take a few seconds each.</span>
              </div>`:""}
          ${this.renderTypeRow()}
          ${this.results.map(t=>this.renderGroup(t))}
          ${this.failures.length?s`<div class="err">
                ${this.failures.length} link(s) failed:
                ${this.failures.map(t=>s`<div class="src">${t.url} — ${t.error}</div>`)}
              </div>`:""}
        </form>
        <div slot="actions">
          <md-text-button type="button" @click=${()=>this.dialog.close()}>Cancel</md-text-button>
          <md-filled-button type="button" @click=${this.import}
            ?disabled=${this.busy||(this.isGame?this.results.length===0:this.chosen.size===0)}>
            ${this.busy&&this.results.length?"Importing…":this.isGame?s`Import ${this.results.length===1?"game":`${this.results.length} games`}`:this.isComic?s`Import ${this.results.length===1?"comic":`${this.results.length} comics`}`:s`Import ${this.chosen.size||""}${this.totalMedia?` / ${this.totalMedia}`:""}`}
          </md-filled-button>
        </div>
      </md-dialog>
    `}};J.styles=[ne,_`
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
    `];ie([S("md-dialog")],J.prototype,"dialog",2);ie([d()],J.prototype,"urls",2);ie([d()],J.prototype,"results",2);ie([d()],J.prototype,"failures",2);ie([d()],J.prototype,"chosen",2);ie([d()],J.prototype,"busy",2);ie([d()],J.prototype,"phase",2);ie([d()],J.prototype,"fetchCount",2);ie([d()],J.prototype,"error",2);ie([d()],J.prototype,"kind",2);ie([d()],J.prototype,"kindTouched",2);J=ie([I("oppai-scrape-dialog")],J);var dn=Object.defineProperty,cn=Object.getOwnPropertyDescriptor,L=(t,e,i,a)=>{for(var r=a>1?void 0:a?cn(e,i):e,o=t.length-1,n;o>=0;o--)(n=t[o])&&(r=(a?n(e,i,r):n(r))||r);return a&&r&&dn(e,i,r),r};const pn=[{id:"neutral",label:"Neutral",hint:"Login screen and error popups"},{id:"happy",label:"Happy",hint:"Chat · Sweet mode"},{id:"mischievous",label:"Mischievous",hint:"Chat · Playful mode"},{id:"surprised",label:"Surprised",hint:"Chat · Bold mode"},{id:"thinking",label:"Thinking",hint:"Chat · Roleplay mode"}],fa=["Calm","Warm","Flirty","Heated","Peak"],ft=(t,e)=>`${t}:${e}`;let z=class extends C{constructor(){super(...arguments),this.settings=null,this.info=null,this.stats=null,this.apk=null,this.loadError="",this.dirty=!1,this.saving=!1,this.saved=!1,this.theme=Ri(),this.fit=hr(),this.hideLibby=Et(),this.outfits=[],this.wornOutfit=Ni(),this.outfitDraft=null,this.outfitBusy=!1,this.pwCurrent="",this.pwNew="",this.pwConfirm="",this.pwBusy=!1,this.pwMsg="",this.pwErr=""}connectedCallback(){super.connectedCallback(),this.load(),this.loadOutfits()}async loadOutfits(){try{const t=await v.libbyOutfits();this.outfits=t.outfits,this.wornOutfit&&!t.outfits.some(e=>e.id===this.wornOutfit)&&(this.wornOutfit="",ca(""))}catch{}}async load(){try{const[t,e]=await Promise.all([v.getSettings(),v.stats()]);this.settings=t.settings,this.info=t.readOnly,this.stats=e}catch(t){this.loadError=t.message}try{this.apk=await v.apkInfo()}catch{this.apk={available:!1}}}get canEdit(){var t;return!!((t=this.user)!=null&&t.isAdmin)}edit(t){!this.settings||!this.canEdit||(this.settings={...this.settings,...t},this.dirty=!0,this.saved=!1)}async save(){if(this.settings){this.saving=!0;try{const t=await v.saveSettings(this.settings);this.settings=t.settings,this.info=t.readOnly,this.dirty=!1,this.saved=!0}catch(t){this.loadError=t.message}finally{this.saving=!1}}}pickTheme(t){this.theme=t,Ds(t),Fi(t)}pickFit(t){this.fit=t,ur(t)}async changePassword(){if(this.pwMsg="",this.pwErr="",this.pwNew!==this.pwConfirm){this.pwErr="The new passwords don't match.";return}if(this.pwNew.length<8){this.pwErr="Use at least 8 characters.";return}this.pwBusy=!0;try{await v.changePassword(this.pwCurrent,this.pwNew),this.pwMsg="Password changed.",this.pwCurrent=this.pwNew=this.pwConfirm=""}catch(t){this.pwErr=t.message}finally{this.pwBusy=!1}}render(){return s`
      <div class="wrap">
        ${this.loadError?s`<div class="banner error">
              <span class="material-symbols-rounded" style="font-size:18px;">error</span>
              ${this.loadError}
            </div>`:l}
        ${!this.canEdit&&this.settings?s`<div class="banner info">
              <span class="material-symbols-rounded" style="font-size:18px;">lock</span>
              Server settings are read-only — only an admin can change them.
            </div>`:l}
        ${this.renderAppearance()} ${this.renderLibby()} ${this.renderAI()} ${this.renderScraping()}
        ${this.dirty||this.saved?this.renderSaveBar():l} ${this.renderLibrary()}
        ${this.renderAndroid()} ${this.renderAccount()} ${this.renderAbout()}
      </div>
    `}renderSaveBar(){return s`
      <div class="savebar">
        <span class="grow">
          ${this.saved&&!this.dirty?"Settings saved — they're live now.":"You have unsaved changes."}
        </span>
        <button class="btn-primary" ?disabled=${this.saving||!this.dirty} @click=${this.save}>
          <span class="material-symbols-rounded" style="font-size:20px;">save</span>
          ${this.saving?"Saving…":"Save"}
        </button>
      </div>
    `}renderAndroid(){const t=this.apk;return s`
      <section class="card">
        <h3><span class="material-symbols-rounded">android</span>Android app</h3>
        <p class="card-sub">
          Install the companion app straight from this server — no app store, no
          sideloading from a third party.
        </p>

        ${t===null?s`<p class="field-help">Checking…</p>`:t.available?s`
                <div class="field">
                  <div class="field-text">
                    <div class="field-label">oppailib.apk</div>
                    <div class="field-help">
                      ${Gt(t.size??0)} · built
                      ${new Date((t.modified??0)*1e3).toLocaleDateString()}
                      ${t.sha256?s`<br /><span style="font-family:monospace; font-size:11px;"
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
              `:s`<p class="field-help">
                No APK is bundled with this server build. Drop one at
                <code>/config/oppailib.apk</code>, or grab it from the Actions run that
                built this image.
              </p>`}
      </section>
    `}renderAppearance(){return s`
      <section class="card">
        <h3><span class="material-symbols-rounded">palette</span>Appearance</h3>
        <p class="card-sub">Per-device — applies as soon as you pick it.</p>

        <div class="field">
          <div class="field-text">
            <div class="field-label">Theme</div>
            <div class="field-help">"System" follows your OS light/dark setting.</div>
          </div>
          <div class="field-control seg">
            ${[["dark","Dark","dark_mode"],["light","Light","light_mode"],["system","System","contrast"]].map(([t,e,i])=>s`<button
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
            ${[["page","Fit page","fit_screen"],["width","Fit width","fit_width"]].map(([t,e,i])=>s`<button
                class=${this.fit===t?"on":""}
                @click=${()=>this.pickFit(t)}
              >
                <span class="material-symbols-rounded" style="font-size:18px;">${i}</span>${e}
              </button>`)}
          </div>
        </div>
      </section>
    `}renderLibby(){return s`
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
              @click=${()=>{this.hideLibby=!this.hideLibby,Ps(this.hideLibby)}}
            ></button>
          </div>
        </div>

        <div class="field">
          <div class="field-text">
            <div class="field-label">Mood progression speed</div>
            <div class="field-help">
              Controls how quickly normal app activity moves Libby between tiers. Chat tabs keep
              their own progress. Manual mood changes still apply immediately.
            </div>
          </div>
          <div class="field-control seg">
            ${Hi.map(t=>s`<button
              class=${Qa()===t?"on":""}
              @click=${()=>{Ms(t),this.requestUpdate()}}
            >${t}×</button>`)}
          </div>
        </div>

        <div class="field stack">
          <div class="field-text">
            <div class="field-label">Outfits</div>
            <div class="field-help">
              Dress Libby up: an outfit swaps her artwork, one image per emotion — and
              per horniness tier, if you want her look to change as the meter climbs.
              Drop images onto the emotion slots in the editor; a tier or emotion you
              leave empty falls back to the calmer art. Which outfit she wears is
              per-device.
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
            ${this.outfits.map(t=>s`<div class="outfit-row">
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
                @click=${()=>this.outfitDraft={name:"",existing:[],staged:{},level:0}}
              >
                <span class="material-symbols-rounded" style="font-size:14px; vertical-align:-2px;">add</span>
                New outfit
              </button>
            </div>
          </div>
        </div>
      </section>
      ${this.outfitDraft?this.renderOutfitEditor(this.outfitDraft):l}
    `}wearOutfit(t){this.wornOutfit=t,ca(t)}openOutfitEditor(t){const e=[];if(t.emotionLevels)for(const[i,a]of Object.entries(t.emotionLevels))for(const r of a)e.push(ft(i,r));else for(const i of t.emotions)e.push(ft(i,0));this.outfitDraft={id:t.id,name:t.name,existing:e,staged:{},level:0}}stageEmotion(t,e){if(!e||!e.type.startsWith("image/")||!this.outfitDraft)return;const i=ft(t,this.outfitDraft.level),a=new FileReader;a.onload=()=>{this.outfitDraft&&(this.outfitDraft={...this.outfitDraft,staged:{...this.outfitDraft.staged,[i]:String(a.result)}})},a.readAsDataURL(e)}async saveOutfit(){const t=this.outfitDraft;if(!(!t||!t.name.trim()||this.outfitBusy)){this.outfitBusy=!0;try{const e=await v.saveLibbyOutfit({id:t.id,name:t.name.trim()});for(const[i,a]of Object.entries(t.staged)){const[r,o]=i.split(":");await v.setLibbyEmotion(e.id,r,a,Number(o))}this.outfitDraft=null,await this.loadOutfits()}catch(e){this.loadError=e.message}finally{this.outfitBusy=!1}}}async deleteOutfit(){const t=this.outfitDraft;if(!(!(t!=null&&t.id)||this.outfitBusy)&&confirm(`Delete the “${t.name}” outfit?`)){this.outfitBusy=!0;try{await v.deleteLibbyOutfit(t.id);const e=Z("libraryDelete");H(e.message,"success",{emotion:e.emotion,intensity:e.intensity}),this.wornOutfit===t.id&&this.wearOutfit(""),this.outfitDraft=null,await this.loadOutfits()}catch(e){this.loadError=e.message}finally{this.outfitBusy=!1}}}renderOutfitEditor(t){return s`
      <div class="outfit-overlay" @click=${e=>{e.target===e.currentTarget&&(this.outfitDraft=null)}}>
        <div class="outfit-dialog">
          <h3>${t.id?"Edit outfit":"New outfit"}</h3>
          <input
            type="text"
            placeholder="Outfit name (Summer dress, Maid, …)"
            .value=${t.name}
            @input=${e=>this.outfitDraft={...t,name:e.target.value}}
          />
          <div class="tier-tabs">
            ${fa.map((e,i)=>s`<button
                class="tier-tab ${t.level===i?"on":""}"
                @click=${()=>this.outfitDraft={...t,level:i}}
                title="Shown as the horniness meter reaches this tier"
              >${e}</button>`)}
          </div>
          <p class="tier-note">
            ${t.level===0?"Baseline art — worn when the meter is low, and the fallback for any tier you leave empty.":`Shown as Libby’s horniness meter climbs into the “${fa[t.level]}” range.`}
          </p>
          <div class="slots">
            ${pn.map(e=>{const i=ft(e.id,t.level),a=t.staged[i],r=!a&&t.id&&t.existing.includes(i)?v.libbyEmotionURL(t.id,e.id,t.level):"";return s`
                <label
                  class="slot"
                  @dragover=${o=>{o.preventDefault(),o.currentTarget.classList.add("dragover")}}
                  @dragleave=${o=>o.currentTarget.classList.remove("dragover")}
                  @drop=${o=>{var n,c;o.preventDefault(),o.currentTarget.classList.remove("dragover"),this.stageEmotion(e.id,(c=(n=o.dataTransfer)==null?void 0:n.files)==null?void 0:c[0])}}
                >
                  ${a?s`<img src=${a} alt=${e.label} />`:r?s`<img src=${r} alt=${e.label} />`:s`<div class="drop-hint">Drop an image here<br />or click to browse</div>`}
                  <div class="slot-label">${e.label}</div>
                  <div class="slot-hint">${e.hint}</div>
                  <input
                    type="file"
                    accept="image/*"
                    style="display:none;"
                    @change=${o=>{var c;const n=o.target;this.stageEmotion(e.id,(c=n.files)==null?void 0:c[0]),n.value=""}}
                  />
                </label>
              `})}
          </div>
          <div class="outfit-actions">
            ${t.id?s`<button class="outfit-btn danger" ?disabled=${this.outfitBusy} @click=${()=>this.deleteOutfit()}>
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
    `}renderAI(){const t=this.settings,e=this.info;return s`
      <section class="card" style="animation-delay:60ms;">
        <h3><span class="material-symbols-rounded">auto_awesome</span>AI auto-tagging</h3>
        <p class="card-sub">
          Tagging runs entirely on this box — no image ever leaves it. The heuristic tagger needs no
          model; a real classifier requires an ONNX build with a model in the model directory.
        </p>

        ${t?s`
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

              ${e?s`
                    ${this.readOnlyField("Active tagger","Chosen at startup.",e.aiTagger)}
                    ${this.readOnlyField("Inference device","OPPAI_AI_DEVICE — needs a restart to change.",e.aiDevice)}
                    ${this.readOnlyField("Model directory","OPPAI_AI_MODEL_DIR — needs a restart to change.",e.aiModelDir)}
                  `:l}
            `:s`<div class="field-help">Loading…</div>`}
      </section>
    `}renderScraping(){const t=this.settings;return s`
      <section class="card" style="animation-delay:120ms;">
        <h3><span class="material-symbols-rounded">travel_explore</span>Import &amp; scraping</h3>
        <p class="card-sub">How OppaiLib behaves toward the sites you import from.</p>

        ${t?s`
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
                  <div class="field-label">Civitai API</div>
                  <div class="field-help">
                    Catalogue API base and optional token. The public mirror works without a token;
                    use <code>https://civitai.com/api/v1</code> with your key for authenticated access.
                    The key is stored on this server and is never sent back to the browser.
                  </div>
                </div>
                <div class="field-control">
                  <input type="text" autocomplete="off" placeholder="https://civitai.red/api/v1"
                    .value=${t.civitaiApiUrl} ?disabled=${!this.canEdit}
                    @change=${e=>this.edit({civitaiApiUrl:e.target.value})} />
                </div>
                <div class="field-control">
                  <input type="password" autocomplete="new-password"
                    placeholder=${t.civitaiKeySet?"•••••••• (unchanged)":"Civitai API key (optional)"}
                    ?disabled=${!this.canEdit}
                    @change=${e=>this.edit({civitaiApiKey:e.target.value})} />
                </div>
                ${t.civitaiKeySet?s`<div class="field-control">
                  <button type="button" class="btn-inline" ?disabled=${!this.canEdit}
                    @click=${()=>this.edit({civitaiApiKey:"",civitaiKeySet:!1})}>Clear saved key</button>
                </div>`:l}
              </div>

              <div class="field stack">
                <div class="field-text">
                  <div class="field-label">Rule34.xxx API</div>
                  <div class="field-help">
                    The authenticated JSON API makes browsing faster and supplies original media URLs,
                    dimensions, and reliable video types. Find the user id and API key in your Rule34 account options.
                    The key is write-only.
                  </div>
                </div>
                <div class="field-control">
                  <input type="text" inputmode="numeric" autocomplete="off" placeholder="Rule34 user id"
                    .value=${t.rule34UserId} ?disabled=${!this.canEdit}
                    @change=${e=>this.edit({rule34UserId:e.target.value})} />
                </div>
                <div class="field-control">
                  <input type="password" autocomplete="new-password"
                    placeholder=${t.rule34ApiKeySet?"•••••••• (unchanged)":"Rule34 API key"}
                    ?disabled=${!this.canEdit}
                    @change=${e=>this.edit({rule34ApiKey:e.target.value})} />
                </div>
                ${t.rule34ApiKeySet?s`<div class="field-control">
                  <button type="button" class="btn-inline" ?disabled=${!this.canEdit}
                    @click=${()=>this.edit({rule34ApiKey:"",rule34ApiKeySet:!1})}>Clear saved key</button>
                </div>`:l}
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
                    OpenAI-compatible API base URL for your local LLM, such as
                    <code>http://host:5000/v1</code>. The model name is an optional fallback;
                    OppaiLib detects the model actually loaded by text-generation-webui.
                    Load and unload models in that backend's own WebUI—OppaiLib never changes its model lifecycle.
                  </div>
                </div>
                <div class="field-control">
                  <input
                    type="text"
                    autocomplete="off"
                    placeholder="http://host:5000/v1"
                    .value=${t.chatUrl}
                    ?disabled=${!this.canEdit}
                    @change=${e=>this.edit({chatUrl:e.target.value})}
                  />
                </div>
                <div class="field-control">
                  <input
                    type="text"
                    autocomplete="off"
                    placeholder="Optional fallback model name"
                    .value=${t.chatModel}
                    ?disabled=${!this.canEdit}
                    @change=${e=>this.edit({chatModel:e.target.value})}
                  />
                </div>
                <div class="field-control">
                  <input
                    type="password"
                    autocomplete="new-password"
                    placeholder=${t.chatApiKeySet?"API key saved — enter to replace":"API key (optional)"}
                    .value=${t.chatApiKey}
                    ?disabled=${!this.canEdit}
                    @change=${e=>this.edit({chatApiKey:e.target.value})}
                  />
                </div>
              </div>
            `:s`<div class="field-help">Loading…</div>`}
      </section>
    `}renderLibrary(){const t=this.stats;if(!t)return l;const e=new Map(t.kinds.map(i=>[i.kind,i]));return s`
      <section class="card" style="animation-delay:180ms;">
        <h3><span class="material-symbols-rounded">inventory_2</span>Library</h3>
        <p class="card-sub">
          ${t.items} ${t.items===1?"item":"items"} · ${Gt(t.bytes)} stored ·
          ${t.tags} ${t.tags===1?"tag":"tags"}
        </p>
        <div class="stat-grid">
          ${Object.keys(Y).map(i=>{const a=e.get(i);return s`<div class="stat">
              <div class="stat-num">${(a==null?void 0:a.count)??0}</div>
              <div class="stat-label">${Y[i].label} · ${Gt((a==null?void 0:a.bytes)??0)}</div>
            </div>`})}
        </div>
      </section>
    `}renderAccount(){var t,e;return s`
      <section class="card" style="animation-delay:240ms;">
        <h3><span class="material-symbols-rounded">account_circle</span>Account</h3>
        <p class="card-sub">
          Signed in as <strong>${(t=this.user)==null?void 0:t.username}</strong>${(e=this.user)!=null&&e.isAdmin?" (admin)":""}.
        </p>

        ${this.pwErr?s`<div class="banner error">
              <span class="material-symbols-rounded" style="font-size:18px;">error</span>${this.pwErr}
            </div>`:l}
        ${this.pwMsg?s`<div class="banner ok">
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
    `}renderAbout(){const t=this.info;return t?s`
      <section class="card" style="animation-delay:300ms;">
        <h3><span class="material-symbols-rounded">info</span>About this server</h3>
        <p class="card-sub">Set by environment variables; changing them needs a restart.</p>
        ${this.readOnlyField("Version","The running build.",t.version)}
        ${this.readOnlyField("Video thumbnails","Posters need ffmpeg on the server's PATH.",t.ffmpeg?"ffmpeg available":"ffmpeg missing — posters disabled")}
        ${this.readOnlyField("Media directory","Where encrypted blobs live.",t.mediaDir)}
        ${this.readOnlyField("Database","SQLite metadata store.",t.dbPath)}
        ${this.readOnlyField("Session length","How long a login stays valid.",`${t.sessionHours} hours`)}
      </section>
    `:l}switchField(t,e,i,a,r=!1){const o=!this.canEdit||r;return s`
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
            ?disabled=${o}
            @click=${()=>a(!i)}
          ></button>
        </div>
      </div>
    `}readOnlyField(t,e,i){return s`
      <div class="field">
        <div class="field-text">
          <div class="field-label">${t}</div>
          <div class="field-help">${e}</div>
        </div>
        <div class="field-control"><span class="ro">${i}</span></div>
      </div>
    `}};z.styles=[ke,ne,_`
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
      .btn-inline {
        border: 1px solid var(--oppai-border-strong);
        border-radius: 10px;
        background: transparent;
        color: var(--oppai-text-dim);
        font: inherit;
        font-size: 12px;
        padding: 7px 10px;
        cursor: pointer;
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
    `,_`
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
      /* Horniness tier picker across the top of the editor. */
      .tier-tabs {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
        margin-top: 12px;
      }
      .tier-tab {
        border: 1px solid var(--oppai-border-strong);
        background: transparent;
        color: var(--oppai-text-dim);
        border-radius: 999px;
        font: inherit;
        font-size: 12px;
        padding: 5px 12px;
        cursor: pointer;
      }
      .tier-tab.on {
        background: var(--oppai-primary);
        color: var(--oppai-on-primary);
        border-color: var(--oppai-primary);
      }
      .tier-note {
        margin: 8px 0 0;
        font-size: 12px;
        color: var(--oppai-text-muted);
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
    `];L([m({attribute:!1})],z.prototype,"user",2);L([d()],z.prototype,"settings",2);L([d()],z.prototype,"info",2);L([d()],z.prototype,"stats",2);L([d()],z.prototype,"apk",2);L([d()],z.prototype,"loadError",2);L([d()],z.prototype,"dirty",2);L([d()],z.prototype,"saving",2);L([d()],z.prototype,"saved",2);L([d()],z.prototype,"theme",2);L([d()],z.prototype,"fit",2);L([d()],z.prototype,"hideLibby",2);L([d()],z.prototype,"outfits",2);L([d()],z.prototype,"wornOutfit",2);L([d()],z.prototype,"outfitDraft",2);L([d()],z.prototype,"outfitBusy",2);L([d()],z.prototype,"pwCurrent",2);L([d()],z.prototype,"pwNew",2);L([d()],z.prototype,"pwConfirm",2);L([d()],z.prototype,"pwBusy",2);L([d()],z.prototype,"pwMsg",2);L([d()],z.prototype,"pwErr",2);z=L([I("oppai-settings")],z);function Gt(t){if(!t)return"0 B";const e=["B","KB","MB","GB","TB"];let i=t,a=0;for(;i>=1024&&a<e.length-1;)i/=1024,a++;return`${i<10&&a>0?i.toFixed(1):Math.round(i)} ${e[a]}`}var hn=Object.defineProperty,un=Object.getOwnPropertyDescriptor,A=(t,e,i,a)=>{for(var r=a>1?void 0:a?un(e,i):e,o=t.length-1,n;o>=0;o--)(n=t[o])&&(r=(a?n(e,i,r):n(r))||r);return a&&r&&hn(e,i,r),r};let T=class extends C{constructor(){super(...arguments),this.sources=[],this.sourceId="",this.feedId="",this.container=null,this.sort="",this.query="",this.draft="",this.items=[],this.cursor="",this.loading=!1,this.loadingSources=!0,this.error="",this.active=null,this.pages=[],this.pageAt=0,this.saving=!1,this.toast="",this.commentsFor=null,this.comments=[],this.commentsLoading=!1,this.commentsError="",this.commentQuery="",this.threadQuery="",this.threadDraft="",this.reqId=0,this.leaveContainer=()=>{this.container=null,this.reset()},this.close=()=>{this.active=null,this.pages=[]},this.closeComments=()=>{this.commentsFor=null,this.comments=[],this.commentsError=""}}connectedCallback(){super.connectedCallback(),this.loadSources()}get source(){return this.sources.find(t=>t.id===this.sourceId)}get feed(){var t;return(t=this.source)==null?void 0:t.feeds.find(e=>e.id===this.feedId)}get isSearch(){var t;return!this.container&&((t=this.feed)==null?void 0:t.query)===!0}get activeFeed(){var t;return((t=this.container)==null?void 0:t.feedId)??this.feedId}get isFourChan(){return this.sourceId==="4chan"}async loadSources(){var t;try{const{sources:e}=await v.sources();this.sources=e;const i=e[0];i&&(this.sourceId=i.id,this.feedId=((t=i.feeds[0])==null?void 0:t.id)??"")}catch(e){this.error=e instanceof Error?e.message:"Couldn't reach the server"}finally{this.loadingSources=!1}this.sourceId&&this.load(!0)}async load(t){if(!this.sourceId||!t&&(this.loading||!this.cursor)||this.isSearch&&!this.query)return;const e=++this.reqId;this.loading=!0;try{const i=await v.browseSource(this.sourceId,{feed:this.activeFeed,cursor:t?void 0:this.cursor,q:this.container?void 0:this.query||void 0,sort:this.container?void 0:this.sort||void 0});if(e!==this.reqId)return;this.items=t?i.items:[...this.items,...i.items],this.cursor=i.cursor??"",this.error=""}catch(i){if(e!==this.reqId)return;this.error=i instanceof Error?i.message:"Couldn't load that feed"}finally{e===this.reqId&&(this.loading=!1)}}reset(){this.items=[],this.cursor="",this.error="",this.load(!0)}pickSource(t){var e,i;t!==this.sourceId&&(this.sourceId=t,this.feedId=((i=(e=this.sources.find(a=>a.id===t))==null?void 0:e.feeds[0])==null?void 0:i.id)??"",this.container=null,this.sort="",this.query="",this.draft="",this.reset())}pickFeed(t){var e,i;t===this.feedId&&!this.container||(this.feedId=t,this.container=null,this.sort="",((i=(e=this.source)==null?void 0:e.feeds.find(a=>a.id===t))==null?void 0:i.query)!==!0&&(this.query="",this.draft=""),this.reset())}addThread(t){var c;t.preventDefault();const e=this.threadDraft.trim(),i=e.match(/^(?:https?:\/\/)?(?:boards\.4chan\.org\/)?\/?([a-z0-9]+)\/?$/i);if(i){this.threadDraft="",this.pickFeed(i[1].toLowerCase());return}const a=e.match(/(?:boards\.4chan\.org\/)?([a-z0-9]+)\/(?:thread\/)?(\d+)/i)??e.match(/^\/?([a-z0-9]+):t?(\d+)$/i);if(!a){this.showToast("Enter a board such as /b/, or a 4chan thread URL");return}const r=a[1].toLowerCase(),o=a[2],n=`${r}:t${o}`;(c=this.source)!=null&&c.feeds.some(h=>h.id===r)&&(this.feedId=r),this.threadDraft="",this.openContainer({id:n,title:`/${r}/ thread No.${o}`,kind:"thread",thumbUrl:"",feedId:n,threadId:n})}pickSort(t){t!==this.sort&&(this.sort=t,this.reset())}openContainer(t){this.container=t,this.threadQuery="",this.reset()}submitSearch(t){t.preventDefault(),this.query=this.draft.trim(),this.container=null,this.reset()}async open(t){var e,i;if(this.active=t,this.pages=[],this.pageAt=0,t.kind==="comic")try{const{pages:a}=await v.sourcePages(this.sourceId,t.id);if(((e=this.active)==null?void 0:e.id)!==t.id)return;this.pages=a,this.warmPages(0)}catch(a){if(((i=this.active)==null?void 0:i.id)!==t.id)return;this.error=a instanceof Error?a.message:"Couldn't open that comic",this.active=null}}warmPages(t){for(let e=t;e<Math.min(t+mn,this.pages.length);e++)new Image().src=v.sourceStreamURL(this.pages[e])}goPage(t){const e=Math.min(Math.max(t,0),this.pages.length-1);e!==this.pageAt&&(this.pageAt=e,this.warmPages(e+1))}async openComments(t){var i,a,r;const e=t.threadId;if(e){this.commentsFor=t,this.comments=[],this.commentsError="",this.commentQuery="",this.commentsLoading=!0;try{const{comments:o}=await v.sourceComments(this.sourceId,e);if(((i=this.commentsFor)==null?void 0:i.id)!==t.id)return;this.comments=o}catch(o){if(((a=this.commentsFor)==null?void 0:a.id)!==t.id)return;this.commentsError=o instanceof Error?o.message:"Couldn't load the thread"}finally{((r=this.commentsFor)==null?void 0:r.id)===t.id&&(this.commentsLoading=!1)}}}save(t){if(!t||this.saving)return;const e=t.kind==="comic"||t.kind==="thread";this.saving=!0,sr(t.title||"Source download",async i=>{try{i(.08),await v.saveFromSource(this.sourceId,{itemId:e?t.id:void 0,mediaUrl:e?void 0:t.mediaUrl,pageUrl:t.pageUrl,title:t.title,kind:e?"comic":t.kind,tags:t.tags}),i(1),this.dispatchEvent(new CustomEvent("imported",{bubbles:!0,composed:!0}))}finally{this.saving=!1}}),this.showToast(t.kind==="thread"?"Downloading thread in background":"Downloading in background")}showToast(t){this.toast=t,setTimeout(()=>{this.toast=""},2600)}renderTile(t,e){const i=t.kind==="thread",a=i?`${t.count??0}`:t.width&&t.height?`${t.width}×${t.height}`:"";return s`
      <button
        class="tile anim-rise"
        style="animation-delay:${Math.min(e,12)*45}ms;"
        @click=${()=>i?this.openContainer(t):this.open(t)}
        title=${t.title}
      >
        <div class="tile-media">
          ${t.thumbUrl?s`<img src=${v.sourceStreamURL(t.thumbUrl)} loading="lazy" alt=${t.title} />`:s`<div class="tile-blank">
                <span class="material-symbols-rounded" style="font-size:36px;">forum</span>
              </div>`}
          ${t.kind==="video"?s`<span class="play material-symbols-rounded" style="font-size:44px;">play_circle</span>`:l}
          ${a?s`<span class="tile-stat">
                ${i?s`<span class="material-symbols-rounded" style="font-size:13px;">image</span>`:l}
                ${a}
              </span>`:l}
        </div>
        <div class="tile-meta">
          <div class="tile-title">${t.title}</div>
          <div class="tile-tag">
            ${i?"Thread":t.kind==="comic"?"Gallery":t.kind}
          </div>
        </div>
      </button>
    `}renderOverlay(t){const e=t.kind==="comic",i=this.pages[this.pageAt];return s`
      <div class="overlay" @click=${a=>{a.target===a.currentTarget&&this.close()}}>
        <div class="obar">
          <button class="obtn" @click=${this.close}>
            <span class="material-symbols-rounded" style="font-size:18px;">arrow_back</span>Back
          </button>
          <span class="t">${t.title}</span>
          ${t.threadId?s`<button class="obtn" @click=${()=>this.openComments(t)}>
                <span class="material-symbols-rounded" style="font-size:18px;">forum</span>Comments
              </button>`:l}
          ${t.pageUrl?s`<a href=${t.pageUrl} target="_blank" rel="noopener noreferrer">
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
          ${e?i?s`<img src=${v.sourceStreamURL(i)} alt="Page ${this.pageAt+1}" />`:s`<md-circular-progress indeterminate></md-circular-progress>`:t.kind==="video"?s`<video
                  src=${v.sourceStreamURL(t.mediaUrl??"")}
                  controls
                  autoplay
                  loop
                  playsinline
                  preload="metadata"
                ></video>`:s`<img src=${v.sourceStreamURL(t.mediaUrl??t.thumbUrl)} alt=${t.title} />`}
        </div>

        ${t.kind==="video"?this.renderUpNext(t):l}

        ${e&&this.pages.length?s`
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
    `}renderUpNext(t){const e=this.items.filter(a=>a.kind==="video");if(e.some(a=>a.id===t.id)||e.unshift(t),e.length<2)return l;const i=e.findIndex(a=>a.id===t.id);return s`
      <div class="upnext">
        <div class="upnext-label">Videos</div>
        <div class="strip">
          ${e.map((a,r)=>s`
              <button
                class="strip-item ${a.id===t.id?"on":""}"
                title=${a.title}
                aria-current=${a.id===t.id}
                @click=${()=>this.open(a)}
              >
                <img src=${v.sourceStreamURL(a.thumbUrl)} loading="lazy" alt=${a.title} />
                ${a.kind==="video"?s`<span class="strip-play material-symbols-rounded">play_circle</span>`:l}
                ${r===i+1?s`<span class="strip-next">Next</span>`:l}
              </button>
            `)}
        </div>
      </div>
    `}renderComments(t){const e=t.postNo,i=this.commentQuery.trim().toLowerCase(),a=i?this.comments.filter(r=>[String(r.no),r.name,r.subject,r.text].some(o=>(o??"").toLowerCase().includes(i))):this.comments;return s`
      <div
        class="overlay comments"
        @click=${r=>{r.target===r.currentTarget&&this.closeComments()}}
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
                @input=${r=>this.commentQuery=r.target.value}
              />
            </label>
          </div>

          ${this.commentsLoading?s`<div class="cempty"><md-circular-progress indeterminate></md-circular-progress></div>`:this.commentsError?s`<div class="cempty">${this.commentsError}</div>`:a.length?s`<div class="clist">
                    ${a.map(r=>this.renderComment(r,r.no===e))}
                  </div>`:s`<div class="cempty">${i?"No matching posts.":"No posts in this thread."}</div>`}
        </div>
      </div>
    `}renderComment(t,e){return s`
      <article id=${`post-${t.no}`} class="cpost ${e?"here":""} ${t.op?"op":""}">
        <header class="cmeta">
          ${t.op?s`<span class="cbadge">OP</span>`:l}
          ${e?s`<span class="cbadge here-badge">This file</span>`:l}
          <span class="cname">${t.name||"Anonymous"}</span>
          <span class="cno">No.${t.no}</span>
          <span class="ctime">${vn(t.time)}</span>
        </header>
        ${t.subject?s`<div class="csub">${t.subject}</div>`:l}
        ${this.renderAttachment(t)}
        ${t.text?s`<div class="ctext">${fn(t.text,i=>this.goToPost(i))}</div>`:l}
      </article>
    `}goToPost(t){this.commentQuery="",this.updateComplete.then(()=>{var e;(e=this.renderRoot.querySelector(`#post-${t}`))==null||e.scrollIntoView({behavior:"smooth",block:"center"})})}renderAttachment(t){if(!t.thumbUrl)return l;const e=t.kind==="video";return s`
      <button
        class="cattach"
        title=${e?"Play this video":"Open this file"}
        @click=${()=>this.openAttachment(t)}
      >
        <img class="cthumb" src=${v.sourceStreamURL(t.thumbUrl)} loading="lazy" alt="" />
        ${e?s`<span class="cplay material-symbols-rounded">play_circle</span>`:l}
      </button>
    `}openAttachment(t){var a;const i=(t.itemId?this.items.find(r=>r.id===t.itemId):void 0)??{id:t.itemId??`post-${t.no}`,title:t.subject||`No.${t.no}`,kind:t.kind??"image",thumbUrl:t.thumbUrl??"",mediaUrl:t.mediaUrl,threadId:(a=this.commentsFor)==null?void 0:a.threadId,postNo:t.no};this.closeComments(),this.open(i)}renderContainerHead(t){var e;return s`
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
          ${t.threadId?s`<button class="chip ghost" @click=${()=>this.openComments(t)}>
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
    `}render(){var r,o,n,c,h,f,g;if(this.loadingSources)return s`<div class="empty"><md-circular-progress indeterminate></md-circular-progress></div>`;if(!this.sources.length)return s`<div class="empty">No remote sources are configured.</div>`;const t=((r=this.feed)==null?void 0:r.sorts)??[],e=this.container,i=this.threadQuery.trim().toLowerCase(),a=e&&i?this.items.filter(u=>[u.title,String(u.postNo??""),u.kind].some(y=>y.toLowerCase().includes(i))):this.items;return s`
      ${e?this.renderContainerHead(e):s`
            <div class="head">
              <h2 class="title">${((o=this.source)==null?void 0:o.name)??"Browse"}</h2>
              <span class="count">${this.items.length?`${this.items.length} shown`:""}</span>
            </div>

            ${this.sources.length>1?s`<div class="chips tight">
                  ${this.sources.map(u=>s`<button
                      class="chip"
                      aria-pressed=${u.id===this.sourceId}
                      @click=${()=>this.pickSource(u.id)}
                    >${u.name}</button>`)}
                </div>`:l}

            ${this.isFourChan?s`<div class="thread-tools">
                  <select
                    class="feed-select"
                    aria-label="4chan board"
                    @change=${u=>this.pickFeed(u.target.value)}
                  >
                    ${(((n=this.source)==null?void 0:n.feeds)??[]).map(u=>s`<option value=${u.id} ?selected=${u.id===this.feedId}>${u.label}</option>`)}
					${(c=this.source)!=null&&c.feeds.some(u=>u.id===this.feedId)?l:s`<option value=${this.feedId} selected>/${this.feedId}/ — Custom board</option>`}
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
                </div>`:s`<div class="chips ${this.isSearch?"tight":""}">
                  ${(((h=this.source)==null?void 0:h.feeds)??[]).map(u=>s`<button
                      class="chip"
                      aria-pressed=${u.id===this.feedId}
                      @click=${()=>this.pickFeed(u.id)}
                    >${u.label}</button>`)}
                </div>`}

            ${this.isSearch?s`
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
                  ${t.length?s`<div class="chips tight">
                        ${t.map(u=>s`<button
                            class="chip"
                            aria-pressed=${u.id===(this.sort||t[0].id)}
                            @click=${()=>this.pickSort(u.id)}
                          >${u.label}</button>`)}
                      </div>`:l}
                `:l}
          `}

      ${this.error&&!this.items.length?s`<div class="empty">
            <span class="material-symbols-rounded" style="font-size:40px; display:block; margin-bottom:12px;"
              >cloud_off</span
            >
            <div style="font-size:14px;">${this.error}</div>
          </div>`:this.isSearch&&!this.query?s`<div class="empty">
              <span class="material-symbols-rounded" style="font-size:40px; display:block; margin-bottom:12px;"
                >search</span
              >
              <div style="font-size:14px;">Search ${((g=this.source)==null?void 0:g.name)??""} to see results.</div>
            </div>`:this.loading&&!this.items.length?s`<div class="empty"><md-circular-progress indeterminate></md-circular-progress></div>`:a.length?s`
                  <div class="grid">${a.map((u,y)=>this.renderTile(u,y))}</div>
                  ${this.cursor?s`<div class="more">
                        <button class="chip" ?disabled=${this.loading} @click=${()=>this.load(!1)}>
                          ${this.loading?"Loading…":"Load more"}
                        </button>
                      </div>`:l}
                `:s`<div class="empty">
                  <span class="material-symbols-rounded" style="font-size:40px; display:block; margin-bottom:12px;"
                    >search_off</span
                  >
                  <div style="font-size:14px;">
                    ${e?i?s`Nothing in this thread matched “${this.threadQuery.trim()}”.`:"Nothing left in this thread — it may have 404'd.":this.query?s`Nothing matched “${this.query}”.`:"Nothing on this feed."}
                  </div>
                </div>`}

      ${this.active?this.renderOverlay(this.active):l}
      ${this.commentsFor?this.renderComments(this.commentsFor):l}
      ${this.toast?s`<div class="toast">${this.toast}</div>`:l}
    `}};T.styles=[ke,ne,_`
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
    `];A([d()],T.prototype,"sources",2);A([d()],T.prototype,"sourceId",2);A([d()],T.prototype,"feedId",2);A([d()],T.prototype,"container",2);A([d()],T.prototype,"sort",2);A([d()],T.prototype,"query",2);A([d()],T.prototype,"draft",2);A([d()],T.prototype,"items",2);A([d()],T.prototype,"cursor",2);A([d()],T.prototype,"loading",2);A([d()],T.prototype,"loadingSources",2);A([d()],T.prototype,"error",2);A([d()],T.prototype,"active",2);A([d()],T.prototype,"pages",2);A([d()],T.prototype,"pageAt",2);A([d()],T.prototype,"saving",2);A([d()],T.prototype,"toast",2);A([d()],T.prototype,"commentsFor",2);A([d()],T.prototype,"comments",2);A([d()],T.prototype,"commentsLoading",2);A([d()],T.prototype,"commentsError",2);A([d()],T.prototype,"commentQuery",2);A([d()],T.prototype,"threadQuery",2);A([d()],T.prototype,"threadDraft",2);T=A([I("oppai-browse")],T);const mn=3;function vn(t){return t?new Date(t*1e3).toLocaleString(void 0,{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"}):""}function fn(t,e){return t.split(`
`).map(i=>{const a=!/^>>\d+/.test(i)&&i.startsWith(">"),r=i.split(/(>>\d+)/g);return s`<div class=${a?"cgreen":""}>${r.map(o=>{const n=o.match(/^>>(\d+)$/);return n?s`<button class="cquote" @click=${()=>e(Number(n[1]))}>${o}</button>`:o})}</div>`})}var gn=Object.defineProperty,bn=Object.getOwnPropertyDescriptor,Q=(t,e,i,a)=>{for(var r=a>1?void 0:a?bn(e,i):e,o=t.length-1,n;o>=0;o--)(n=t[o])&&(r=(a?n(e,i,r):n(r))||r);return a&&r&&gn(e,i,r),r};const yn=40;let K=class extends C{constructor(){super(...arguments),this.boards=[],this.board="none",this.items=[],this.total=0,this.loading=!1,this.error="",this.expanded=null,this.busy=!1,this.newBoard="",this.savedNames=new Set,this.selecting=!1,this.selected=new Set}connectedCallback(){super.connectedCallback(),this.refresh()}get selectedBoard(){return this.board}announceBoard(){this.dispatchEvent(new CustomEvent("board-changed",{detail:{board:this.board},bubbles:!0,composed:!0}))}async refresh(){this.error="";try{const t=await v.galleryBoards();this.boards=t.boards,!this.boards.some(e=>e.id===this.board)&&this.boards.length&&(this.board=this.boards[0].id),this.announceBoard()}catch(t){this.error=t.message;return}await this.loadPage(!0)}async loadPage(t){if(!this.loading){this.loading=!0;try{const e=t?0:this.items.length,i=await v.galleryImages(this.board,e,yn);this.items=t?i.items:[...this.items,...i.items],this.total=i.total}catch(e){this.error=e.message}finally{this.loading=!1}}}pickBoard(t){this.board!==t&&(this.board=t,this.items=[],this.announceBoard(),this.loadPage(!0))}async createBoard(){const t=this.newBoard.trim();if(!(!t||this.busy)){this.busy=!0,this.error="";try{const e=await v.createGalleryBoard(t);this.newBoard="",await this.refresh(),this.pickBoard(e.id),this.dispatchEvent(new CustomEvent("boards-changed",{bubbles:!0,composed:!0}))}catch(e){this.error=e.message}finally{this.busy=!1}}}async deleteBoard(){const t=this.boards.find(e=>e.id===this.board);if(!(!t||t.id==="none"||this.busy)&&confirm(`Delete the “${t.name}” gallery? Its images move back to Uncategorized.`)){this.busy=!0,this.error="";try{await v.deleteGalleryBoard(t.id);const e=Z("galleryDelete");H(e.message,"success",{emotion:e.emotion,intensity:e.intensity}),this.board="none",this.items=[],await this.refresh(),this.dispatchEvent(new CustomEvent("boards-changed",{bubbles:!0,composed:!0}))}catch(e){this.error=e.message}finally{this.busy=!1}}}async deleteImage(t){var e;if(!this.busy){this.busy=!0;try{await v.deleteGalleryImage(t.name);const i=Z("galleryDelete");H(i.message,"success",{emotion:i.emotion,intensity:i.intensity}),this.items=this.items.filter(a=>a.name!==t.name),this.total=Math.max(0,this.total-1),this.boards=this.boards.map(a=>a.id===this.board?{...a,count:Math.max(0,a.count-1)}:a),((e=this.expanded)==null?void 0:e.name)===t.name&&(this.expanded=null)}catch(i){this.error=i.message}finally{this.busy=!1}}}async saveToLibrary(t){if(!(this.busy||this.savedNames.has(t.name))){this.busy=!0;try{await v.saveGalleryImage({name:t.name}),this.savedNames=new Set(this.savedNames).add(t.name),this.dispatchEvent(new CustomEvent("imported",{bubbles:!0,composed:!0}))}catch(e){this.error=e.message}finally{this.busy=!1}}}toggleSelecting(){this.selecting=!this.selecting,this.selecting||(this.selected=new Set)}toggleSelected(t){const e=new Set(this.selected);e.has(t)?e.delete(t):e.add(t),this.selected=e}async deleteSelected(){const t=[...this.selected];if(!(!t.length||this.busy)){this.busy=!0;try{await v.deleteGalleryImages(t);const e=Z("galleryDelete",{count:t.length});H(e.message,"success",{emotion:e.emotion,intensity:e.intensity});const i=this.selected;this.items=this.items.filter(a=>!i.has(a.name)),this.total=Math.max(0,this.total-t.length),this.boards=this.boards.map(a=>a.id===this.board?{...a,count:Math.max(0,a.count-t.length)}:a),this.selected=new Set,this.selecting=!1}catch(e){this.error=e.message}finally{this.busy=!1}}}async addSelectedToBoard(t){const e=[...this.selected];if(!(!e.length||!t||t===this.board||this.busy)){this.busy=!0;try{await v.addGalleryImagesToBoard(t,e);const i=this.selected;this.items=this.items.filter(a=>!i.has(a.name)),this.total=Math.max(0,this.total-e.length),this.selected=new Set,this.selecting=!1,await this.refresh()}catch(i){this.error=i.message}finally{this.busy=!1}}}render(){const t=this.boards.find(e=>e.id===this.board);return s`
      <div class="panel">
        <div class="head">
          <span class="material-symbols-rounded" style="font-size:18px;">photo_library</span>
          Invoke gallery
          <span class="count">${t?`${this.total||t.count} images`:""}</span>
          ${this.items.length?s`<button class="sel-toggle ${this.selecting?"on":""}"
                @click=${()=>this.toggleSelecting()}>
                ${this.selecting?"Done":"Select"}
              </button>`:l}
        </div>
        ${this.selecting?s`<div class="sel-bar">
              <span class="sel-count">${this.selected.size} selected</span>
              <select class="sel-move" aria-label="Move to gallery" .value=${""}
                ?disabled=${this.busy||!this.selected.size}
                @change=${e=>{const i=e.target;this.addSelectedToBoard(i.value),i.value=""}}>
                <option value="">Add to gallery…</option>
                ${this.boards.filter(e=>e.id!==this.board).map(e=>s`<option value=${e.id}>${e.name}</option>`)}
              </select>
              <button class="sel-del" ?disabled=${this.busy||!this.selected.size}
                @click=${()=>this.deleteSelected()}>
                <span class="material-symbols-rounded" style="font-size:15px; vertical-align:-3px;">delete</span>
                Delete
              </button>
            </div>`:l}
        ${this.boards.length?s`
              <select class="board-select" aria-label="Gallery" .value=${this.board}
                @change=${e=>this.pickBoard(e.target.value)}>
                ${this.boards.map(e=>s`<option value=${e.id}>${e.name}${e.count?` · ${e.count}`:""}</option>`)}
              </select>
              ${this.boards.length<=6?s`<div class="boards">
                ${this.boards.map(e=>s`<button class="board ${e.id===this.board?"on":""}"
                    @click=${()=>this.pickBoard(e.id)}>${e.name}${e.count?` · ${e.count}`:""}</button>`)}
              </div>`:l}
              ${this.board!=="none"?s`<button class="board-del" ?disabled=${this.busy}
                    title="Delete this gallery (its images move to Uncategorized)"
                    @click=${()=>this.deleteBoard()}>
                    <span class="material-symbols-rounded" style="font-size:15px; vertical-align:-3px;">delete</span>
                    Delete gallery
                  </button>`:l}
            `:l}
        <div class="note">New generations are filed into ${(t==null?void 0:t.name)??"this gallery"}.</div>
        <div class="new-board">
          <input maxlength="300" placeholder="New Invoke gallery" .value=${this.newBoard}
            @input=${e=>this.newBoard=e.target.value}
            @keydown=${e=>{e.key==="Enter"&&this.createBoard()}} />
          <button ?disabled=${this.busy||!this.newBoard.trim()} @click=${()=>this.createBoard()}>Create</button>
        </div>
        ${this.error?s`<div class="err">${this.error}</div>`:l}
        ${this.items.length?s`<div class="grid">
              ${this.items.map(e=>{const i=this.selected.has(e.name);return s`
                  <button
                    class="tile ${this.selecting?"selectable":""} ${i?"picked":""}"
                    title=${e.name}
                    @click=${()=>this.selecting?this.toggleSelected(e.name):this.expanded=e}
                  >
                    <img src=${v.galleryThumbURL(e.name)} alt="Generated image" loading="lazy" />
                    ${this.selecting?s`<span class="check">
                          <span class="material-symbols-rounded" style="font-size:15px;">
                            ${i?"check_circle":"radio_button_unchecked"}
                          </span>
                        </span>`:s`<span
                          class="del"
                          role="button"
                          title="Delete from InvokeAI"
                          @click=${a=>{a.stopPropagation(),this.deleteImage(e)}}
                        >
                          <span class="material-symbols-rounded" style="font-size:14px;">delete</span>
                        </span>`}
                  </button>
                `})}
            </div>`:this.loading?l:s`<div class="note">Nothing here yet — generated images land in this gallery.</div>`}
        ${this.loading?s`<div class="note">Loading…</div>`:l}
        ${!this.loading&&this.items.length<this.total?s`<button class="more" @click=${()=>this.loadPage(!1)}>
              Load more (${this.total-this.items.length} left)
            </button>`:l}
      </div>
      ${this.expanded?this.renderExpanded(this.expanded):l}
    `}renderExpanded(t){const e=this.savedNames.has(t.name);return s`
      <div class="overlay" @click=${i=>{i.target===i.currentTarget&&(this.expanded=null)}}>
        <img src=${v.galleryFullURL(t.name)} alt="Generated image" />
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
    `}};K.styles=[ke,ne,_`
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
      .board-select {
        width: 100%;
        box-sizing: border-box;
        border: 1px solid var(--oppai-border-strong);
        border-radius: 10px;
        background: var(--oppai-surface);
        color: var(--oppai-text);
        font: inherit;
        font-size: 12px;
        padding: 8px 10px;
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
      .board-del {
        margin-top: 6px;
        border: 1px solid var(--oppai-border-strong);
        background: transparent;
        color: var(--oppai-error, #f2b8b5);
        border-radius: 9px;
        font: inherit;
        font-size: 12px;
        padding: 5px 10px;
        cursor: pointer;
      }
      .board-del:disabled {
        opacity: 0.5;
        cursor: default;
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
      .tile.picked {
        outline: 2px solid var(--oppai-primary);
        outline-offset: -2px;
      }
      .tile.picked img {
        opacity: 0.8;
      }
      /* The selection tick sits where the delete button would; always visible in
         select mode so tapping a tile toggles it. */
      .tile .check {
        position: absolute;
        top: 3px;
        left: 3px;
        width: 22px;
        height: 22px;
        border-radius: 11px;
        background: rgba(0, 0, 0, 0.55);
        color: #fff;
        display: grid;
        place-items: center;
      }
      .tile.picked .check {
        background: var(--oppai-primary);
        color: var(--oppai-on-primary);
      }
      /* Head "Select" toggle and the selection action bar. */
      .sel-toggle {
        margin-left: 8px;
        border: 1px solid var(--oppai-border-strong);
        background: transparent;
        color: var(--oppai-text-dim);
        border-radius: 999px;
        font: inherit;
        font-size: 12px;
        padding: 3px 10px;
        cursor: pointer;
      }
      .sel-toggle.on {
        background: var(--oppai-primary);
        color: var(--oppai-on-primary);
        border-color: var(--oppai-primary);
      }
      .sel-bar {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
      }
      .sel-count {
        font-size: 12px;
        color: var(--oppai-text-muted);
      }
      .sel-move {
        border: 1px solid var(--oppai-border-strong);
        border-radius: 9px;
        background: var(--oppai-surface);
        color: var(--oppai-text);
        font: inherit;
        font-size: 12px;
        padding: 6px 8px;
      }
      .sel-move:disabled {
        opacity: 0.5;
      }
      .sel-del {
        margin-left: auto;
        border: none;
        border-radius: 9px;
        background: var(--oppai-surface);
        color: var(--oppai-error, #f2b8b5);
        font: inherit;
        font-size: 12px;
        font-weight: 600;
        padding: 6px 12px;
        cursor: pointer;
      }
      .sel-del:disabled {
        opacity: 0.5;
        cursor: default;
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
    `];Q([d()],K.prototype,"boards",2);Q([d()],K.prototype,"board",2);Q([d()],K.prototype,"items",2);Q([d()],K.prototype,"total",2);Q([d()],K.prototype,"loading",2);Q([d()],K.prototype,"error",2);Q([d()],K.prototype,"expanded",2);Q([d()],K.prototype,"busy",2);Q([d()],K.prototype,"newBoard",2);Q([d()],K.prototype,"savedNames",2);Q([d()],K.prototype,"selecting",2);Q([d()],K.prototype,"selected",2);K=Q([I("oppai-invoke-gallery")],K);var xn=Object.defineProperty,wn=Object.getOwnPropertyDescriptor,G=(t,e,i,a)=>{for(var r=a>1?void 0:a?wn(e,i):e,o=t.length-1,n;o>=0;o--)(n=t[o])&&(r=(a?n(e,i,r):n(r))||r);return a&&r&&xn(e,i,r),r};let F=class extends C{constructor(){super(...arguments),this.q="",this.type="",this.sort="",this.category="",this.categories=[],this.items=[],this.cursor="",this.loading=!1,this.error="",this.detail=null,this.versionId=0,this.shownImage="",this.jobs=[],this.installing=!1,this.zoomed=""}connectedCallback(){super.connectedCallback(),this.search(!0),this.loadCategories(),this.pollJobs(),this.jobTimer=window.setInterval(()=>void this.pollJobs(),5e3)}async loadCategories(){try{this.categories=(await v.civitaiCategories()).categories}catch{this.categories=[]}}disconnectedCallback(){super.disconnectedCallback(),this.jobTimer&&clearInterval(this.jobTimer)}async pollJobs(){try{const t=await v.civitaiInstalls();this.jobs=t.jobs.filter(e=>e.status!=="cancelled").slice(0,5)}catch{}}async search(t){if(!this.loading){this.loading=!0,this.error="";try{const e=await v.civitaiSearch({q:this.q||void 0,type:this.type||void 0,category:this.category||void 0,sort:this.sort||void 0,cursor:t?void 0:this.cursor||void 0});this.items=t?e.items:[...this.items,...e.items],this.cursor=e.nextCursor??""}catch(e){this.error=e.message}finally{this.loading=!1}}}openDetail(t){this.detail=t;const e=t.versions[0];this.versionId=(e==null?void 0:e.id)??0,this.shownImage=(e==null?void 0:e.images[0])??""}currentVersion(){var t;return(t=this.detail)==null?void 0:t.versions.find(e=>e.id===this.versionId)}async install(t){if(!(this.installing||!t.downloadUrl)){this.installing=!0,this.error="";try{await v.civitaiInstall(t.downloadUrl),await this.pollJobs()}catch(e){this.error=e.message}finally{this.installing=!1}}}jobLabel(t){return t.status==="downloading"&&t.totalBytes?`downloading ${Math.round((t.bytes??0)/t.totalBytes*100)}%`:t.status}render(){return s`
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
          ${[{id:"",label:"All"},{id:"checkpoint",label:"Checkpoints"},{id:"lora",label:"LoRAs"}].map(t=>s`<button class="chip ${this.type===t.id?"on":""}"
              @click=${()=>{this.type=t.id,this.search(!0)}}>${t.label}</button>`)}
          <select
            .value=${this.sort}
            @change=${t=>{this.sort=t.target.value,this.search(!0)}}
          >
            <option value="">Most downloaded</option>
            <option value="rated">Highest rated</option>
            <option value="newest">Newest</option>
          </select>
          <select
            aria-label="Category"
            .value=${this.category}
            @change=${t=>{this.category=t.target.value,this.search(!0)}}
          >
            <option value="">All categories</option>
            ${this.categories.map(t=>s`<option value=${t.name}>${t.name} (${gt(t.count)})</option>`)}
          </select>
        </div>
        ${this.jobs.length?s`<div class="jobs">
              ${this.jobs.map(t=>s`<div class="job">
                  <span class="material-symbols-rounded" style="font-size:15px;">download</span>
                  <span class="st ${t.status}">${this.jobLabel(t)}</span>
                  <span style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${t.error||t.source}</span>
                </div>`)}
            </div>`:l}
        ${this.error?s`<div class="err">${this.error}</div>`:l}
        <div class="grid">
          ${this.items.map(t=>{var i,a;const e=(i=t.versions[0])==null?void 0:i.images[0];return s`
              <button class="card" @click=${()=>this.openDetail(t)}>
                ${e?s`<img src=${v.civitaiImageURL(e)} alt=${t.name} loading="lazy" />`:s`<div class="noimg"><span class="material-symbols-rounded" style="font-size:34px;">image</span></div>`}
                <div class="meta">
                  <div class="name">${t.name}</div>
                  <div class="sub">
                    <span>${t.type}</span>
                    ${(a=t.versions[0])!=null&&a.base?s`<span>${t.versions[0].base}</span>`:l}
                    <span>⤓ ${gt(t.downloads)}</span>
                  </div>
                </div>
              </button>
            `})}
        </div>
        ${this.loading?s`<div class="note">Searching Civitai…</div>`:this.items.length?this.cursor?s`<button class="more" @click=${()=>this.search(!1)}>Load more</button>`:l:s`<div class="note">No models matched. Try another search.</div>`}
      </div>
      ${this.detail?this.renderDetail(this.detail):l}
      ${this.zoomed?s`<div class="zoom" @click=${()=>this.zoomed=""}>
            <img src=${v.civitaiImageURL(this.zoomed)} alt="Preview" />
          </div>`:l}
    `}renderDetail(t){const e=this.currentVersion();return s`
      <div class="overlay" @click=${i=>{i.target===i.currentTarget&&(this.detail=null)}}>
        <div class="detail">
          <div>
            ${this.shownImage?s`<img class="big" src=${v.civitaiImageURL(this.shownImage)} alt=${t.name}
                  @click=${()=>this.zoomed=this.shownImage} />`:s`<div class="big" style="display:grid; place-items:center;">
                  <span class="material-symbols-rounded" style="font-size:40px; color:var(--oppai-text-muted);">image</span>
                </div>`}
            ${e&&e.images.length>1?s`<div class="thumbs">
                  ${e.images.map(i=>s`<img src=${v.civitaiImageURL(i)} class=${i===this.shownImage?"on":""}
                      alt="Preview" @click=${()=>this.shownImage=i} />`)}
                </div>`:l}
          </div>
          <div>
            <h3>${t.name}</h3>
            <div class="sub">
              ${t.type}${t.creator?` · by ${t.creator}`:""} · ⤓ ${gt(t.downloads)} · ♥ ${gt(t.likes)}
            </div>
            ${t.versions.length>1?s`<div class="vlabel">Version</div>
                  <div class="versions">
                    ${t.versions.map(i=>s`<button class="chip ${i.id===this.versionId?"on":""}"
                        @click=${()=>{this.versionId=i.id,this.shownImage=i.images[0]??""}}>${i.name}<span style="opacity:.7;"> · ${i.base}</span></button>`)}
                  </div>`:l}
            ${e!=null&&e.trainedWords.length?s`<div class="vlabel">Trigger words</div>
                  <div class="words">${e.trainedWords.join(", ")}</div>`:l}
            ${e?s`<button class="install" ?disabled=${this.installing||!e.downloadUrl} @click=${()=>this.install(e)}>
                  <span class="material-symbols-rounded" style="font-size:18px;">download</span>
                  Install to InvokeAI${e.sizeMB?` (${_n(e.sizeMB)})`:""}
                </button>`:l}
            <div class="sub" style="margin-top:10px;">
              InvokeAI downloads the file itself; progress appears in the strip on the search page.
            </div>
          </div>
        </div>
      </div>
    `}};F.styles=[ke,ne,_`
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
    `];G([d()],F.prototype,"q",2);G([d()],F.prototype,"type",2);G([d()],F.prototype,"sort",2);G([d()],F.prototype,"category",2);G([d()],F.prototype,"categories",2);G([d()],F.prototype,"items",2);G([d()],F.prototype,"cursor",2);G([d()],F.prototype,"loading",2);G([d()],F.prototype,"error",2);G([d()],F.prototype,"detail",2);G([d()],F.prototype,"versionId",2);G([d()],F.prototype,"shownImage",2);G([d()],F.prototype,"jobs",2);G([d()],F.prototype,"installing",2);G([d()],F.prototype,"zoomed",2);F=G([I("oppai-civitai")],F);function gt(t){return t>=1e6?`${(t/1e6).toFixed(1)}M`:t>=1e3?`${(t/1e3).toFixed(1)}k`:String(t)}function _n(t){return t>=1024?`${(t/1024).toFixed(1)} GB`:`${t} MB`}var $n=Object.defineProperty,kn=Object.getOwnPropertyDescriptor,w=(t,e,i,a)=>{for(var r=a>1?void 0:a?kn(e,i):e,o=t.length-1,n;o>=0;o--)(n=t[o])&&(r=(a?n(e,i,r):n(r))||r);return a&&r&&$n(e,i,r),r};function ga(){const t=window;return t.SpeechRecognition??t.webkitSpeechRecognition??null}const Cn=[{label:"Portrait",hint:"512×768",w:512,h:768},{label:"Square",hint:"512×512",w:512,h:512},{label:"Landscape",hint:"768×512",w:768,h:512},{label:"Tall",hint:"640×960",w:640,h:960},{label:"XL Portrait",hint:"832×1216",w:832,h:1216},{label:"XL Square",hint:"1024×1024",w:1024,h:1024},{label:"XL Landscape",hint:"1216×832",w:1216,h:832}],In=[{id:"",label:"Default (Euler a)"},...[["ddim","DDIM"],["ddpm","DDPM"],["deis","DEIS"],["deis_k","DEIS Karras"],["dpmpp_2s","DPM++ 2S"],["dpmpp_2s_k","DPM++ 2S Karras"],["dpmpp_2m","DPM++ 2M"],["dpmpp_2m_k","DPM++ 2M Karras"],["dpmpp_2m_sde","DPM++ 2M SDE"],["dpmpp_2m_sde_k","DPM++ 2M SDE Karras"],["dpmpp_3m","DPM++ 3M"],["dpmpp_3m_k","DPM++ 3M Karras"],["dpmpp_sde","DPM++ SDE"],["dpmpp_sde_k","DPM++ SDE Karras"],["er_sde","ER-SDE"],["euler","Euler"],["euler_k","Euler Karras"],["euler_a","Euler Ancestral"],["heun","Heun"],["heun_k","Heun Karras"],["kdpm_2","KDPM 2"],["kdpm_2_k","KDPM 2 Karras"],["kdpm_2_a","KDPM 2 Ancestral"],["kdpm_2_a_k","KDPM 2 Ancestral Karras"],["lcm","LCM"],["lms","LMS"],["lms_k","LMS Karras"],["pndm","PNDM"],["tcd","TCD"],["unipc","UniPC"],["unipc_k","UniPC Karras"]].map(([t,e])=>({id:t,label:e}))];let x=class extends C{constructor(){super(...arguments),this.status=null,this.checkpoint="",this.vae="",this.templateId="",this.showBuiltInTemplates=!1,this.selectedLoras={},this.selectedTriggers=[],this.loraPage=0,this.characters=[],this.selectedChars=[],this.charDraft=null,this.charBusy=!1,this.scanBusy=!1,this.open={models:!0},this.speech="",this.listening=!1,this.optimizing=!1,this.prompt="",this.tagSuggestions=[],this.tagCorrection="",this.negative="",this.showOptions=!1,this.width=512,this.height=768,this.steps=25,this.cfg=7,this.cfgRescale=0,this.clipSkip=0,this.seamlessX=!1,this.seamlessY=!1,this.vaePrecision="fp32",this.cpuNoise=!0,this.board="none",this.scheduler="",this.count=1,this.seed=-1,this.detailerEnabled=!1,this.detailerModel="face_yolov8n.pt",this.detailerPrompt="",this.detailerNegative="",this.detailerConfidence=.3,this.detailerDenoise=.4,this.detailerMaskBlur=4,this.generating=!1,this.shots=[],this.error="",this.toast="",this.thumbVersion=0,this.failedThumbs=new Set,this.expandedShot=null,this.metaDraft=null,this.metaBusy=!1,this.metaTriggerText="",this.civitaiOpen=!1,this.recognition=null}connectedCallback(){super.connectedCallback(),this.loadStatus(),this.loadCharacters()}disconnectedCallback(){super.disconnectedCallback(),this.stopListening()}async loadStatus(){this.status=null,this.error="";try{const t=await v.imageGenStatus();this.status=t,!this.checkpoint&&t.models&&t.models.length&&this.pickModel(t.models[0])}catch(t){this.status={enabled:!0,reachable:!1,error:t.message}}}async loadCharacters(){try{const t=await v.characters();this.characters=t.characters;const e=new Set(t.characters.map(i=>i.id));this.selectedChars=this.selectedChars.filter(i=>e.has(i))}catch{}}pickModel(t){this.checkpoint=t.title;const e=t.defaults;e&&(e.steps&&(this.steps=e.steps),e.cfgScale&&(this.cfg=e.cfgScale),e.cfgRescale!==void 0&&(this.cfgRescale=e.cfgRescale),e.scheduler&&(this.scheduler=e.scheduler),e.width&&(this.width=e.width),e.height&&(this.height=e.height),e.vae&&(this.vae=e.vae),this.vaePrecision="fp32")}get speechSupported(){return ga()!=null}toggleListening(){if(this.listening){this.stopListening();return}const t=ga();if(!t)return;const e=new t;e.lang=navigator.language||"en-US",e.continuous=!1,e.interimResults=!0,e.onresult=i=>{let a="";for(let r=0;r<i.results.length;r++)a+=i.results[r][0].transcript;this.speech=a},e.onerror=i=>{this.error=i.error==="not-allowed"?"Microphone permission was denied.":`Speech error: ${i.error}`,this.stopListening()},e.onend=()=>{this.listening=!1,this.speech.trim()&&this.optimize(this.speech)},this.recognition=e,this.listening=!0,this.error="";try{e.start()}catch{this.listening=!1}}stopListening(){if(this.listening=!1,this.recognition){try{this.recognition.stop()}catch{}this.recognition=null}}async optimize(t){this.optimizing=!0;try{const{prompt:e,negativePrompt:i}=await v.optimizePrompt(t);this.prompt=e,this.negative||(this.negative=i)}catch(e){this.error=e.message}finally{this.optimizing=!1}}assemblePrompts(){var o,n;const t=[this.prompt.trim(),...this.selectedTriggers],e=[this.negative.trim()];for(const c of this.selectedChars){const h=this.characters.find(f=>f.id===c);h&&(h.prompt.trim()&&t.push(h.prompt.trim()),(o=h.negativePrompt)!=null&&o.trim()&&e.push(h.negativePrompt.trim()))}let i=t.filter(Boolean).join(", "),a=e.filter(Boolean).join(", ");const r=(((n=this.status)==null?void 0:n.templates)??[]).find(c=>c.id===this.templateId);return r&&(r.prompt.includes("{prompt}")?i=r.prompt.replaceAll("{prompt}",i):r.prompt.trim()&&(i=`${i}, ${r.prompt.trim()}`),r.negativePrompt.includes("{prompt}")?a=r.negativePrompt.replaceAll("{prompt}",a):r.negativePrompt.trim()&&(a=a?`${a}, ${r.negativePrompt.trim()}`:r.negativePrompt.trim())),{prompt:i,negative:a}}async generate(){var i,a;if(this.generating||!this.prompt.trim())return;const{prompt:t,negative:e}=this.assemblePrompts();this.generating=!0,this.error="";try{const r=await v.generate({prompt:t,negativePrompt:e||void 0,checkpoint:this.checkpoint||void 0,vae:this.vae||void 0,sampler:this.scheduler||void 0,steps:this.steps,width:this.width,height:this.height,cfgScale:this.cfg,cfgRescale:this.cfgRescale,clipSkip:this.clipSkip,seamlessX:this.seamlessX,seamlessY:this.seamlessY,vaePrecision:this.vaePrecision,cpuNoise:this.cpuNoise,board:this.board,count:this.count,seed:this.seed,loras:Object.entries(this.selectedLoras).map(([o,n])=>({name:o,weight:n})),detailer:(i=this.status)!=null&&i.detailerAvailable&&this.detailerEnabled?{enabled:!0,model:this.detailerModel,prompt:this.detailerPrompt||void 0,negativePrompt:this.detailerNegative||void 0,confidence:this.detailerConfidence,denoise:this.detailerDenoise,maskBlur:this.detailerMaskBlur}:void 0});this.shots=r.images.map(o=>({...o,saved:!1})),(a=this.galleryPanel)==null||a.refresh()}catch(r){this.error=r.message}finally{this.generating=!1}}async save(t){if(!t.saved)try{const e=this.prompt.trim().slice(0,80)||"Generated image";await v.saveGenerated({id:t.id,title:e}),this.shots=this.shots.map(i=>i.id===t.id?{...i,saved:!0}:i),this.showToast("Saved to library"),this.dispatchEvent(new CustomEvent("imported",{bubbles:!0,composed:!0}))}catch(e){this.showToast(e.message)}}bumpThumbs(){this.thumbVersion++,this.failedThumbs=new Set}renderArt(t,e,i){return this.failedThumbs.has(t)?s`<div class="card-blank">
        <span class="material-symbols-rounded" style="font-size:34px;">${i}</span>
      </div>`:s`<img
      class="card-art"
      src=${t}
      alt=${e}
      loading="lazy"
      @error=${()=>{this.failedThumbs=new Set(this.failedThumbs).add(t)}}
    />`}async useAsModelThumb(t){if(!this.checkpoint){this.showToast("Pick a model first");return}try{await v.setModelThumb({model:this.checkpoint,previewId:t.id}),this.bumpThumbs(),this.showToast("Model preview synced to InvokeAI")}catch(e){this.showToast(e.message)}}async openMetaEditor(t){this.metaBusy=!0;try{const e=await v.modelMeta(t);this.metaDraft=e,this.metaTriggerText=e.triggerPhrases.join(", ")}catch(e){this.showToast(e.message)}finally{this.metaBusy=!1}}setMetaDefaults(t){const e=this.metaDraft;e&&(this.metaDraft={...e,defaults:{...e.defaults??{},...t}})}async saveMeta(){const t=this.metaDraft;if(!(!t||this.metaBusy)){this.metaBusy=!0;try{await v.patchModelMeta({key:t.key,name:t.name,description:t.description??"",triggerPhrases:this.metaTriggerText.split(",").map(e=>e.trim()).filter(Boolean),defaults:t.defaults}),this.metaDraft=null,this.showToast("Model updated"),await this.loadStatus()}catch(e){this.showToast(e.message)}finally{this.metaBusy=!1}}}toggleLora(t){var i,a,r,o,n;const e={...this.selectedLoras};if(t in e){delete e[t];const c=new Set(((a=(((i=this.status)==null?void 0:i.loras)??[]).find(f=>f.name===t))==null?void 0:a.triggerPhrases)??[]),h=new Set((((r=this.status)==null?void 0:r.loras)??[]).filter(f=>f.name in e).flatMap(f=>f.triggerPhrases??[]));this.selectedTriggers=this.selectedTriggers.filter(f=>!c.has(f)||h.has(f))}else{const c=(n=(((o=this.status)==null?void 0:o.loras)??[]).find(h=>h.name===t))==null?void 0:n.weight;e[t]=c&&Number.isFinite(c)?c:1}this.selectedLoras=e}toggleTrigger(t){this.selectedTriggers=this.selectedTriggers.includes(t)?this.selectedTriggers.filter(e=>e!==t):[...this.selectedTriggers,t]}toggleCharacter(t){this.selectedChars=this.selectedChars.includes(t)?this.selectedChars.filter(e=>e!==t):[...this.selectedChars,t]}toggleSection(t){this.open={...this.open,[t]:!this.open[t]}}onCharThumbFile(t){var r;const e=t.target,i=(r=e.files)==null?void 0:r[0];if(e.value="",!i||!this.charDraft)return;const a=new FileReader;a.onload=()=>{this.charDraft&&(this.charDraft={...this.charDraft,imageData:String(a.result)})},a.readAsDataURL(i)}onCharScanFile(t){var r;const e=t.target,i=(r=e.files)==null?void 0:r[0];if(e.value="",!i||!this.charDraft||this.scanBusy)return;const a=new FileReader;a.onload=()=>void this.scanCharImage(String(a.result)),a.readAsDataURL(i)}async scanCharImage(t){if(!(!this.charDraft||this.scanBusy)){this.scanBusy=!0;try{const i=(await v.scanImage(t)).tags.filter(h=>h.category!=="rating").map(h=>h.tag.replace(/_/g," ").trim()).filter(Boolean),a=this.charDraft;if(!a)return;const r=a.prompt.trim(),o=new Set(r.split(",").map(h=>h.trim().toLowerCase()).filter(Boolean)),n=i.filter(h=>!o.has(h.toLowerCase()));if(!n.length){this.showToast("No new tags found");return}const c=r?`${r}, ${n.join(", ")}`:n.join(", ");this.charDraft={...a,prompt:c},this.showToast(`Added ${n.length} tag${n.length===1?"":"s"}`)}catch(e){this.showToast(e.message)}finally{this.scanBusy=!1}}}async saveCharacter(){const t=this.charDraft;if(!(!t||!t.name.trim()||this.charBusy)){this.charBusy=!0;try{await v.saveCharacter({id:t.id,name:t.name.trim(),prompt:t.prompt,negativePrompt:t.negativePrompt,imageData:t.imageData}),this.charDraft=null,this.bumpThumbs(),await this.loadCharacters(),this.showToast("Character saved")}catch(e){this.showToast(e.message)}finally{this.charBusy=!1}}}async deleteCharacter(){const t=this.charDraft;if(!(!(t!=null&&t.id)||this.charBusy)&&confirm(`Delete “${t.name}” from the character library?`)){this.charBusy=!0;try{await v.deleteCharacter(t.id);const e=Z("libraryDelete");H(e.message,"success",{emotion:e.emotion,intensity:e.intensity}),this.charDraft=null,await this.loadCharacters(),this.showToast("Character deleted")}catch(e){this.showToast(e.message)}finally{this.charBusy=!1}}}showToast(t){this.toast=t,setTimeout(()=>this.toast="",2600)}render(){return s`<div class="wrap">${this.renderBody()}</div>
      ${this.charDraft?this.renderCharEditor(this.charDraft):l}
      ${this.metaDraft?this.renderMetaEditor(this.metaDraft):l}
      ${this.expandedShot?this.renderLightbox(this.expandedShot):l}
      ${this.toast?s`<div class="toast">${this.toast}</div>`:l}`}renderLightbox(t){var i;const e=this.shots.find(a=>a.id===t.id)??t;return s`
      <div class="lightbox" @click=${a=>{a.target===a.currentTarget&&(this.expandedShot=null)}}>
        <img src=${v.genPreviewURL(e.id)} alt="Generated image" />
        <div class="row">
          <button class="btn primary" ?disabled=${e.saved} @click=${()=>this.save(e)}>
            <span class="material-symbols-rounded" style="font-size:17px;">${e.saved?"check":"save"}</span>
            ${e.saved?"Saved":"Save to library"}
          </button>
          ${((i=this.status)==null?void 0:i.backend)==="invokeai"?s`<button class="btn" @click=${()=>this.useAsModelThumb(e)}>
            <span class="material-symbols-rounded" style="font-size:17px;">photo_camera</span> Sync model preview
          </button>`:l}
          <button class="btn" @click=${()=>this.expandedShot=null}>
            <span class="material-symbols-rounded" style="font-size:17px;">close</span> Close
          </button>
        </div>
      </div>
    `}renderMetaEditor(t){var a;const e=t.defaults??{},i=t.type==="lora";return s`
      <div class="overlay" @click=${r=>{r.target===r.currentTarget&&(this.metaDraft=null)}}>
        <div class="dialog">
          <h3>Edit ${i?"LoRA":"model"} — synced with InvokeAI</h3>
          <div>
            <label class="field">Name</label>
            <input type="text" .value=${t.name}
              @input=${r=>this.metaDraft={...t,name:r.target.value}} />
          </div>
          <div>
            <label class="field">Description</label>
            <textarea .value=${t.description??""}
              @input=${r=>this.metaDraft={...t,description:r.target.value}}></textarea>
          </div>
          <div>
            <label class="field">Trigger phrases (comma-separated)</label>
            <input type="text" .value=${this.metaTriggerText} placeholder="my-style, detailed face"
              @input=${r=>this.metaTriggerText=r.target.value} />
          </div>
          ${i?s`<div>
                <label class="field">Recommended weight</label>
                <input class="num" type="number" min="-2" max="2" step="0.05"
                  .value=${String(e.weight??"")} placeholder="1"
                  @input=${r=>this.setMetaDefaults({weight:Number(r.target.value)||0})} />
              </div>`:s`
                <div class="meta-grid">
                  <div>
                    <label class="field">Steps</label>
                    <input class="num" type="number" min="1" max="80" .value=${String(e.steps??"")}
                      @input=${r=>this.setMetaDefaults({steps:Number(r.target.value)||0})} />
                  </div>
                  <div>
                    <label class="field">CFG scale</label>
                    <input class="num" type="number" min="1" max="30" step="0.5" .value=${String(e.cfgScale??"")}
                      @input=${r=>this.setMetaDefaults({cfgScale:Number(r.target.value)||0})} />
                  </div>
                  <div>
                    <label class="field">CFG rescale</label>
                    <input class="num" type="number" min="0" max="0.99" step="0.05"
                      .value=${String(e.cfgRescale??"")}
                      @input=${r=>this.setMetaDefaults({cfgRescale:Number(r.target.value)||0})} />
                  </div>
                  <div>
                    <label class="field">Width</label>
                    <input class="num" type="number" min="64" max="2048" step="8" .value=${String(e.width??"")}
                      @input=${r=>this.setMetaDefaults({width:Number(r.target.value)||0})} />
                  </div>
                  <div>
                    <label class="field">Height</label>
                    <input class="num" type="number" min="64" max="2048" step="8" .value=${String(e.height??"")}
                      @input=${r=>this.setMetaDefaults({height:Number(r.target.value)||0})} />
                  </div>
                  <div class="full">
                    <label class="field">Scheduler</label>
                    <select class="num" .value=${e.scheduler??""}
                      @change=${r=>this.setMetaDefaults({scheduler:r.target.value})}>
                      <option value="">No preference</option>
                      ${["euler_a","euler","dpmpp_2m","dpmpp_2m_k","dpmpp_2m_sde_k","dpmpp_sde_k","unipc"].map(r=>s`<option value=${r} ?selected=${r===e.scheduler}>${r}</option>`)}
                    </select>
                  </div>
                  <div class="full">
                    <label class="field">Default VAE</label>
                    <select class="num" .value=${e.vae??""}
                      @change=${r=>this.setMetaDefaults({vae:r.target.value})}>
                      <option value="">Model's own</option>
                      ${(((a=this.status)==null?void 0:a.vaes)??[]).map(r=>s`<option value=${r.key} ?selected=${r.key===e.vae}>${r.name}</option>`)}
                    </select>
                  </div>
                  <div class="full">
                    <label class="field">VAE precision</label>
                    <select class="num" .value=${e.vaePrecision??""}
                      @change=${r=>this.setMetaDefaults({vaePrecision:r.target.value})}>
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
    `}renderBody(){const t=this.status;if(t===null)return s`<div class="empty"><md-circular-progress indeterminate></md-circular-progress></div>`;if(!t.enabled)return s`<div class="empty">
        <span class="material-symbols-rounded">auto_awesome</span>
        <div style="font-size:15px; margin-bottom:6px;">Image generation isn't set up yet.</div>
        <div style="font-size:13px;">
          Add the URL of your local InvokeAI or Automatic1111 / SD.Next server under
          <strong>Settings → Image generation</strong>, then come back here.
        </div>
      </div>`;if(!t.reachable)return s`<div class="empty">
        <span class="material-symbols-rounded">cloud_off</span>
        <div style="font-size:15px; margin-bottom:6px;">Can't reach the image generator.</div>
        <div style="font-size:13px; margin-bottom:14px;">${t.error??"It didn't answer."}</div>
        <button class="chip" @click=${()=>this.loadStatus()}>Retry</button>
      </div>`;const e=t.backend==="invokeai";return s`
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
          ${e?s`<div class="topline">
                <div class="spacer"></div>
                <button class="ghost" @click=${()=>this.civitaiOpen=!0}>
                  <span class="material-symbols-rounded" style="font-size:17px;">travel_explore</span>
                  Browse Civitai
                </button>
              </div>`:l}
          ${this.renderResults()}
          ${this.error?s`<div class="banner">${this.error}</div>`:l}
          ${this.renderPrompt()}
        </div>
        ${e?s`<aside class="right">
              <oppai-invoke-gallery
                @boards-changed=${()=>this.loadStatus()}
                @board-changed=${i=>this.board=i.detail.board}
              ></oppai-invoke-gallery>
            </aside>`:l}
      </div>
      ${this.civitaiOpen?s`<oppai-civitai @close=${()=>this.onCivitaiClose()}></oppai-civitai>`:l}
    `}onCivitaiClose(){this.civitaiOpen=!1,this.loadStatus()}section(t,e,i,a){const r=!!this.open[t];return s`
      <div class="sec">
        <button class="sec-head" @click=${()=>this.toggleSection(t)}>
          <span class="material-symbols-rounded" style="font-size:18px;"
            >${r?"expand_more":"chevron_right"}</span
          >
          ${e}
          <span class="count">${i}</span>
        </button>
        ${r?s`<div class="sec-body">${a}</div>`:l}
      </div>
    `}renderModelSection(t){if(!t.length)return this.section("models","Models","0",s`<div class="sec-note">
          Connected, but the generator lists no checkpoints. Add a model to it and reload.
        </div>`);const e=s`
      <div class="cards">
        ${t.map(i=>{const a=i.title===this.checkpoint,r=`${v.modelThumbURL(i.title)}&v=${this.thumbVersion}`;return s`
            <div class="card-wrap">
              <button class="card ${a?"on":""}" title=${i.title} @click=${()=>this.pickModel(i)}>
                ${this.renderArt(r,i.model_name,"texture")}
                <div class="card-name">${i.model_name}${i.base?s`<span class="row-sub">${i.base}</span>`:l}</div>
              </button>
              <button class="card-edit left" title="Edit model settings" @click=${()=>this.openMetaEditor(i.title)}>
                <span class="material-symbols-rounded" style="font-size:15px;">edit</span>
              </button>
            </div>
          `})}
      </div>
    `;return this.section("models","Models",String(t.length),e)}renderLoraSection(t,e){if(!t.length)return this.section("loras","LoRAs","0",s`<div class="sec-note">
          ${e?`LoRAs aren't available from this generator: ${e}`:"No LoRAs installed."}
        </div>`);const i=Math.ceil(t.length/6),a=Math.min(this.loraPage,i-1),r=t.slice(a*6,a*6+6),o=s`
      <div class="cards">
        ${r.map(n=>{const c=n.name in this.selectedLoras,h=`${v.loraThumbURL(n.name)}&v=${this.thumbVersion}`;return s`
            <div class="card-wrap">
              <button class="card ${c?"on":""}" title=${n.name} @click=${()=>this.toggleLora(n.name)}>
                ${this.renderArt(h,n.alias||n.name,"style")}
                <div class="card-name">${n.alias||n.name}</div>
              </button>
              <button class="card-edit left" title="Edit LoRA settings" @click=${()=>this.openMetaEditor(n.name)}>
                <span class="material-symbols-rounded" style="font-size:15px;">edit</span>
              </button>
              ${c?s`<input class="lora-weight" type="number" min="-2" max="2" step="0.05"
                aria-label=${`${n.alias||n.name} weight`}
                .value=${String(this.selectedLoras[n.name])}
                @input=${f=>{const g=Number(f.target.value);this.selectedLoras={...this.selectedLoras,[n.name]:Number.isFinite(g)?Math.max(-2,Math.min(2,g)):1}}} />`:l}
            </div>
          `})}
      </div>
      ${i>1?s`<div class="pager">
        <button ?disabled=${a===0} @click=${()=>this.loraPage=a-1}>Previous</button>
        <span>${a+1} / ${i}</span>
        <button ?disabled=${a>=i-1} @click=${()=>this.loraPage=a+1}>Next</button>
      </div>`:l}
    `;return this.section("loras","LoRAs",String(Object.keys(this.selectedLoras).length||t.length),o)}renderVaeSection(t){const e=t.length?s`
          <div class="rows">
            <button class="row-pick ${this.vae===""?"on":""}" @click=${()=>this.vae=""}>
              Model default
            </button>
            ${t.map(i=>s`<button
                class="row-pick ${this.vae===i.key?"on":""}"
                @click=${()=>this.vae=this.vae===i.key?"":i.key}
              >
                ${i.name}
                ${i.base?s`<span class="row-sub">${i.base}</span>`:l}
              </button>`)}
          </div>
        `:s`<div class="sec-note">The generator lists no standalone VAEs; the model's own is used.</div>`;return this.section("vaes","VAEs",this.vae?"1 picked":"default",e)}renderSettingsSection(t,e){var a,r;const i=s`
      <div class="settings">
        <div class="full">
          <label class="field">Scheduler</label>
          <select
            class="num"
            .value=${this.scheduler}
            @change=${o=>this.scheduler=o.target.value}
          >
            ${In.map(o=>s`<option value=${o.id} ?selected=${o.id===this.scheduler}>${o.label}</option>`)}
          </select>
        </div>
        <div>
          <label class="field">Steps</label>
          <input class="num" type="number" min="1" max="80" .value=${String(this.steps)}
            @input=${o=>this.steps=Te(o.target.value,1,80,25)} />
        </div>
        <div>
          <label class="field">CFG scale</label>
          <input class="num" type="number" min="1" max="30" step="0.5" .value=${String(this.cfg)}
            @input=${o=>this.cfg=bt(o.target.value,1,30,7)} />
        </div>
        ${t?s`
          <div>
            <label class="field">CFG rescale</label>
            <input class="num" type="number" min="0" max="0.99" step="0.05" .value=${String(this.cfgRescale)}
              @input=${o=>this.cfgRescale=bt(o.target.value,0,.99,0)} />
          </div>
          <div>
            <label class="field">CLIP skip</label>
            <input class="num" type="number" min="0" max="12" .value=${String(this.clipSkip)}
              @input=${o=>this.clipSkip=Te(o.target.value,0,12,0)} />
          </div>
        `:l}
        <div>
          <label class="field">Count</label>
          <input class="num" type="number" min="1" max="8" .value=${String(this.count)}
            @input=${o=>this.count=Te(o.target.value,1,8,1)} />
        </div>
        <div>
          <label class="field">Seed (-1 random)</label>
          <input class="num" type="number" .value=${String(this.seed)}
            @input=${o=>this.seed=Te(o.target.value,-1,2147483648,-1)} />
        </div>
        ${t?s`
          <!-- Which gallery a generation lands in is no longer a second setting here:
               it follows whichever gallery the Invoke gallery panel has open, so the
               place you're looking at is the place new images appear. -->
          <div class="full" style="font-size:12px; color:var(--oppai-text-muted);">
            Generations are added to <b>${((a=e.find(o=>o.id===this.board))==null?void 0:a.name)??"the open gallery"}</b> —
            switch galleries in the Invoke gallery panel.
          </div>
          <label class="switch-row"><input type="checkbox" .checked=${this.cpuNoise}
            @change=${o=>this.cpuNoise=o.target.checked} /> CPU noise</label>
          <label class="switch-row"><input type="checkbox" .checked=${this.seamlessX}
            @change=${o=>this.seamlessX=o.target.checked} /> Seamless X</label>
          <label class="switch-row"><input type="checkbox" .checked=${this.seamlessY}
            @change=${o=>this.seamlessY=o.target.checked} /> Seamless Y</label>
        `:l}
        ${(r=this.status)!=null&&r.detailerAvailable?s`
          <label class="switch-row full"><input type="checkbox" .checked=${this.detailerEnabled}
            @change=${o=>this.detailerEnabled=o.target.checked} />
            ADetailer face/hand pass</label>
          ${this.detailerEnabled?s`
            <div class="full">
              <label class="field">ADetailer detector</label>
              <select class="num" .value=${this.detailerModel}
                @change=${o=>this.detailerModel=o.target.value}>
                <option value="face_yolov8n.pt">Face (fast)</option>
                <option value="face_yolov8s.pt">Face (accurate)</option>
                <option value="hand_yolov8n.pt">Hands</option>
                <option value="person_yolov8n-seg.pt">Person</option>
                <option value="mediapipe_face_full">MediaPipe face</option>
              </select>
            </div>
            <div class="full">
              <label class="field">Detail prompt (blank reuses prompt)</label>
              <input class="num" .value=${this.detailerPrompt}
                @input=${o=>this.detailerPrompt=o.target.value} />
            </div>
            <div class="full">
              <label class="field">Detail negative prompt</label>
              <input class="num" .value=${this.detailerNegative}
                @input=${o=>this.detailerNegative=o.target.value} />
            </div>
            <div>
              <label class="field">Confidence</label>
              <input class="num" type="number" min="0.05" max="1" step="0.05" .value=${String(this.detailerConfidence)}
                @input=${o=>this.detailerConfidence=bt(o.target.value,.05,1,.3)} />
            </div>
            <div>
              <label class="field">Denoise</label>
              <input class="num" type="number" min="0.05" max="1" step="0.05" .value=${String(this.detailerDenoise)}
                @input=${o=>this.detailerDenoise=bt(o.target.value,.05,1,.4)} />
            </div>
            <div>
              <label class="field">Mask blur</label>
              <input class="num" type="number" min="0" max="64" .value=${String(this.detailerMaskBlur)}
                @input=${o=>this.detailerMaskBlur=Te(o.target.value,0,64,4)} />
            </div>
          `:l}
        `:l}
      </div>
    `;return this.section("settings","Model settings",`${this.steps} steps`,i)}renderTemplateSection(t){const e=t.filter(n=>n.builtIn).length,i=this.showBuiltInTemplates?t:t.filter(n=>!n.builtIn),a=i.length?s`
          <div class="rows">
            ${i.map(n=>s`<button
                class="row-pick ${this.templateId===n.id?"on":""}"
                title=${n.prompt}
                @click=${()=>this.templateId=this.templateId===n.id?"":n.id}
              >
                ${n.name}
                <span class="row-sub">${n.prompt}</span>
              </button>`)}
          </div>
        `:s`<div class="sec-note">
          ${t.length?"No templates you created. Built-in presets are hidden — turn them on below.":"No templates on the generator. In InvokeAI they're called style presets; add some there and reload."}
        </div>`,r=s`
      ${a}
      ${e?s`<button
            class="link-toggle"
            @click=${()=>this.showBuiltInTemplates=!this.showBuiltInTemplates}
          >
            ${this.showBuiltInTemplates?"Hide built-in presets":`Show built-in presets (${e})`}
          </button>`:l}
    `,o=t.find(n=>n.id===this.templateId);return this.section("templates","Invoke templates",o?o.name:"none",r)}renderCharacterSection(){const t=s`
      ${this.characters.length?s`<div class="cards">
            ${this.characters.map(i=>{const a=this.selectedChars.includes(i.id),r=`${v.characterThumbURL(i.id)}?v=${this.thumbVersion}`;return s`
                <div class="card-wrap">
                  <button class="card ${a?"on":""}" title=${i.prompt} @click=${()=>this.toggleCharacter(i.id)}>
                    ${i.hasThumb?this.renderArt(r,i.name,"person"):s`<div class="card-blank">
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
          </div>`:s`<div class="sec-note">
            Save the people you keep drawing: a character bundles a prompt fragment and a
            portrait, and clicking one adds them to the next generation.
          </div>`}
      <button
        class="side-add"
        @click=${()=>this.charDraft={name:"",prompt:"",negativePrompt:""}}
      >
        <span class="material-symbols-rounded" style="font-size:17px;">person_add</span> New character
      </button>
    `,e=this.selectedChars.length;return this.section("characters","Characters",e?`${e} picked`:String(this.characters.length),t)}renderCharEditor(t){var i;const e=t.imageData??(t.id&&((i=this.characters.find(a=>a.id===t.id))!=null&&i.hasThumb)?`${v.characterThumbURL(t.id)}?v=${this.thumbVersion}`:void 0);return s`
      <div class="overlay" @click=${a=>{a.target===a.currentTarget&&(this.charDraft=null)}}>
        <div class="dialog">
          <h3>${t.id?"Edit character":"New character"}</h3>
          <div>
            <label class="field">Name</label>
            <input type="text" .value=${t.name} placeholder="Rin"
              @input=${a=>this.charDraft={...t,name:a.target.value}} />
          </div>
          <div>
            <label class="field">Prompt fragment</label>
            <textarea .value=${t.prompt} placeholder="1girl, red hair, green eyes, …"
              @input=${a=>this.charDraft={...t,prompt:a.target.value}}></textarea>
          </div>
          <div>
            <label class="field">Negative fragment (optional)</label>
            <textarea .value=${t.negativePrompt} placeholder="blonde, …"
              @input=${a=>this.charDraft={...t,negativePrompt:a.target.value}}></textarea>
          </div>
          <div class="dialog-thumb">
            ${e?s`<img src=${e} alt="Thumbnail" />`:s`<div class="card-blank" style="width:72px; height:96px; aspect-ratio:auto; border-radius:10px;">
                  <span class="material-symbols-rounded">person</span>
                </div>`}
            <label class="btn">
              Choose thumbnail…
              <input class="hidden-file" type="file" accept="image/*" @change=${a=>this.onCharThumbFile(a)} />
            </label>
            <label class="btn ${this.scanBusy?"disabled":""}"
              title="Read booru tags off an image and add them to the prompt">
              <span class="material-symbols-rounded" style="font-size:16px; vertical-align:-3px;">
                ${this.scanBusy?"hourglass_top":"auto_awesome"}
              </span>
              ${this.scanBusy?"Scanning…":"Scan image for tags"}
              <input class="hidden-file" type="file" accept="image/*"
                ?disabled=${this.scanBusy}
                @change=${a=>this.onCharScanFile(a)} />
            </label>
          </div>
          <div class="dialog-actions">
            ${t.id?s`<button class="btn danger" ?disabled=${this.charBusy} @click=${()=>this.deleteCharacter()}>
                  Delete
                </button>`:l}
            <button class="btn" @click=${()=>this.charDraft=null}>Cancel</button>
            <button class="btn primary" ?disabled=${!t.name.trim()||this.charBusy} @click=${()=>this.saveCharacter()}>
              Save
            </button>
          </div>
        </div>
      </div>
    `}renderPrompt(){var e;const t=[...new Set((((e=this.status)==null?void 0:e.loras)??[]).filter(i=>i.name in this.selectedLoras).flatMap(i=>i.triggerPhrases??[]))];return s`
      <div class="prompt-card">
        <div class="speech-row">
          ${this.speechSupported?s`<button
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
            @input=${i=>{this.prompt=i.target.value,this.updateTagSuggestions()}}
          ></textarea>
          ${this.tagCorrection?s`<div class="sec-note">Did you mean
            <button class="chip" @click=${()=>this.applySuggestedTag(this.tagCorrection)}>${this.tagCorrection}</button>?
          </div>`:l}
          ${this.tagSuggestions.length?s`<div class="chips">
            ${this.tagSuggestions.map(i=>s`<button class="chip" @click=${()=>this.applySuggestedTag(i)}>${i}</button>`)}
          </div>`:l}
          ${t.length?s`
            <div class="sec-note" style="margin-top:8px;">LoRA trigger phrases</div>
            <div class="chips">
              ${t.map(i=>s`<button
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
        ${this.generating?s`<md-circular-progress indeterminate style="--md-circular-progress-size:22px;"></md-circular-progress> Generating…`:s`<span class="material-symbols-rounded">auto_awesome</span> Generate`}
      </button>
    `}async updateTagSuggestions(){var e;const t=((e=this.prompt.split(",").at(-1))==null?void 0:e.trim())??"";if(t.length<2){this.tagSuggestions=[],this.tagCorrection="";return}try{const i=await v.booruTags(t);this.tagSuggestions=i.suggestions,this.tagCorrection=i.correction??""}catch{this.tagSuggestions=[],this.tagCorrection=""}}applySuggestedTag(t){const e=this.prompt.split(",");e[e.length-1]=` ${t}`,this.prompt=e.join(",").trimStart()+", ",this.tagSuggestions=[],this.tagCorrection=""}renderPromptOptions(){return s`
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
          ${Cn.map(t=>{const e=t.w===this.width&&t.h===this.height;return s`<button
              class="chip ${e?"on":""}"
              @click=${()=>{this.width=t.w,this.height=t.h}}
            >${t.label}<span class="hint">${t.hint}</span></button>`})}
        </div>
      </div>
      <div class="custom-size">
        <div>
          <label class="field">Width</label>
          <input class="num" type="number" min="64" max="2048" step="8" .value=${String(this.width)}
            @input=${t=>this.width=Te(t.target.value,64,2048,512)} />
        </div>
        <span class="material-symbols-rounded" style="margin-top:22px; color:var(--oppai-text-muted);">close</span>
        <div>
          <label class="field">Height</label>
          <input class="num" type="number" min="64" max="2048" step="8" .value=${String(this.height)}
            @input=${t=>this.height=Te(t.target.value,64,2048,768)} />
        </div>
      </div>
    `}renderResults(){return this.shots.length?s`
      <div class="section-label">Latest creation</div>
      <div class="results">
        ${this.shots.map(t=>{var e;return s`
            <div class="shot">
              <img
                src=${v.genPreviewURL(t.id)}
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
                ${((e=this.status)==null?void 0:e.backend)==="invokeai"?s`<button class="act"
                  title="Set as this model's preview in InvokeAI" @click=${()=>this.useAsModelThumb(t)}>
                  <span class="material-symbols-rounded" style="font-size:16px;">photo_camera</span>
                </button>`:l}
              </div>
            </div>
          `})}
      </div>
      <div class="banner">
        Only your latest creation shows here. Everything you generate is kept in the Invoke
        gallery panel — browse, save, or delete earlier ones there. Save copies an image
        into the library.
      </div>
    `:l}};x.styles=[ke,ne,_`
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
      /* A quiet text-button used for reveal toggles (e.g. showing built-in presets). */
      .link-toggle {
        align-self: flex-start;
        margin-top: 6px;
        border: none;
        background: none;
        padding: 2px;
        font: inherit;
        font-size: 12px;
        color: var(--oppai-primary-bright);
        cursor: pointer;
      }
      .link-toggle:hover {
        text-decoration: underline;
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
    `];w([d()],x.prototype,"status",2);w([d()],x.prototype,"checkpoint",2);w([d()],x.prototype,"vae",2);w([d()],x.prototype,"templateId",2);w([d()],x.prototype,"showBuiltInTemplates",2);w([d()],x.prototype,"selectedLoras",2);w([d()],x.prototype,"selectedTriggers",2);w([d()],x.prototype,"loraPage",2);w([d()],x.prototype,"characters",2);w([d()],x.prototype,"selectedChars",2);w([d()],x.prototype,"charDraft",2);w([d()],x.prototype,"charBusy",2);w([d()],x.prototype,"scanBusy",2);w([d()],x.prototype,"open",2);w([d()],x.prototype,"speech",2);w([d()],x.prototype,"listening",2);w([d()],x.prototype,"optimizing",2);w([d()],x.prototype,"prompt",2);w([d()],x.prototype,"tagSuggestions",2);w([d()],x.prototype,"tagCorrection",2);w([d()],x.prototype,"negative",2);w([d()],x.prototype,"showOptions",2);w([d()],x.prototype,"width",2);w([d()],x.prototype,"height",2);w([d()],x.prototype,"steps",2);w([d()],x.prototype,"cfg",2);w([d()],x.prototype,"cfgRescale",2);w([d()],x.prototype,"clipSkip",2);w([d()],x.prototype,"seamlessX",2);w([d()],x.prototype,"seamlessY",2);w([d()],x.prototype,"vaePrecision",2);w([d()],x.prototype,"cpuNoise",2);w([d()],x.prototype,"board",2);w([d()],x.prototype,"scheduler",2);w([d()],x.prototype,"count",2);w([d()],x.prototype,"seed",2);w([d()],x.prototype,"detailerEnabled",2);w([d()],x.prototype,"detailerModel",2);w([d()],x.prototype,"detailerPrompt",2);w([d()],x.prototype,"detailerNegative",2);w([d()],x.prototype,"detailerConfidence",2);w([d()],x.prototype,"detailerDenoise",2);w([d()],x.prototype,"detailerMaskBlur",2);w([d()],x.prototype,"generating",2);w([d()],x.prototype,"shots",2);w([d()],x.prototype,"error",2);w([d()],x.prototype,"toast",2);w([d()],x.prototype,"thumbVersion",2);w([d()],x.prototype,"failedThumbs",2);w([d()],x.prototype,"expandedShot",2);w([d()],x.prototype,"metaDraft",2);w([d()],x.prototype,"metaBusy",2);w([d()],x.prototype,"metaTriggerText",2);w([d()],x.prototype,"civitaiOpen",2);w([S("oppai-invoke-gallery")],x.prototype,"galleryPanel",2);x=w([I("oppai-imagegen")],x);function Te(t,e,i,a){const r=Number(t);return Number.isFinite(r)?Math.min(i,Math.max(e,Math.round(r))):a}function bt(t,e,i,a){const r=Number(t);return Number.isFinite(r)?Math.min(i,Math.max(e,r)):a}var Tn=Object.defineProperty,Sn=Object.getOwnPropertyDescriptor,U=(t,e,i,a)=>{for(var r=a>1?void 0:a?Sn(e,i):e,o=t.length-1,n;o>=0;o--)(n=t[o])&&(r=(a?n(e,i,r):n(r))||r);return a&&r&&Tn(e,i,r),r};const Pe=[{id:"sweet",label:"sweet",emotion:"happy",topic:"Soft, warm, and unhurried."},{id:"playful",label:"playful",emotion:"mischievous",topic:"Teasing and quick on their feet."},{id:"bold",label:"bold",emotion:"surprised",topic:"Blunt, uninhibited, and direct."},{id:"roleplay",label:"roleplay",emotion:"thinking",topic:"In character, in scene, in detail."}],ce=()=>crypto.randomUUID().replaceAll("-",""),Wt=t=>new Date(t).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"}),ba=()=>({temperature:.8,top_p:.95,repetition_penalty:1.1,max_tokens:400});function zn(){return{profile:{displayName:"",persona:""},characters:[],conversations:[],images:[]}}function ya(t,e,i){const a=t==null?void 0:t[e];return typeof a=="number"&&Number.isFinite(a)?a:i}function vr(t,e){const i=t.data&&typeof t.data=="object"?t.data:t,a=(r,o="")=>typeof i[r]=="string"?i[r]:o;return{id:ce(),name:a("name",e),description:a("description"),personality:a("personality"),scenario:a("scenario"),firstMessage:a("first_mes",a("firstMessage")),exampleDialogue:a("mes_example",a("exampleDialogue")),systemPrompt:a("system_prompt",a("systemPrompt")),creatorNotes:a("creator_notes",a("creatorNotes")),promptWeight:1,defaultMode:"roleplay"}}async function An(t){if(!t.name.toLowerCase().endsWith(".png"))return null;const e=new Uint8Array(await t.arrayBuffer()),i=new DataView(e.buffer);let a=8;for(;a+12<=e.length;){const r=i.getUint32(a),o=new TextDecoder().decode(e.subarray(a+4,a+8));if(a+12+r>e.length)break;if(o==="tEXt"){const n=new TextDecoder().decode(e.subarray(a+8,a+8+r)),c=n.indexOf("\0");if(c>0&&n.slice(0,c)==="chara"){const h=new TextDecoder().decode(Uint8Array.from(atob(n.slice(c+1)),f=>f.charCodeAt(0)));return vr(JSON.parse(h),t.name.replace(/\.png$/i,""))}}a+=r+12}return null}function En(t){const e=/(\*\*[^*\n]+\*\*|\*[^*\n]+\*|~~[^~\n]+~~|`[^`\n]+`|"[^"\n]+")/g,i=t.split(e);return s`${i.map(a=>a.startsWith("**")&&a.endsWith("**")?s`<strong class="action">${a.slice(2,-2)}</strong>`:a.startsWith("*")&&a.endsWith("*")?s`<em>${a.slice(1,-1)}</em>`:a.startsWith("~~")&&a.endsWith("~~")?s`<s>${a.slice(2,-2)}</s>`:a.startsWith("`")&&a.endsWith("`")?s`<code>${a.slice(1,-1)}</code>`:a.startsWith('"')&&a.endsWith('"')?s`<span class="speech">${a}</span>`:a)}`}let R=class extends C{constructor(){super(...arguments),this.status=null,this.workspace=zn(),this.characterID="libby",this.conversationID="",this.draft="",this.busy=!1,this.loading=!0,this.settingsOpen=!1,this.editorTab="character",this.notice="",this.noticeError=!1,this.imageTags="",this.models=null,this.mobileNavOpen=!1,this.saveTimer=0,this.idleTimer=0,this.noticeTimer=0,this.armIdle=()=>{window.clearTimeout(this.idleTimer),this.characterID==="libby"&&(this.idleTimer=window.setTimeout(()=>{if(this.busy||document.visibilityState!=="visible")return this.armIdle();const t=this.activeConversation;if(!t)return;const e=Z("idle",{intensity:t.intensity});t.emotion=e.emotion,t.messages.push({id:ce(),role:"assistant",content:e.message,at:Date.now()}),t.updatedAt=Date.now(),this.touchWorkspace(),this.scrollToEnd(),this.armIdle()},6e4))}}connectedCallback(){super.connectedCallback(),this.load()}disconnectedCallback(){var t;super.disconnectedCallback(),window.clearTimeout(this.saveTimer),window.clearTimeout(this.idleTimer),window.clearTimeout(this.noticeTimer),(t=this.resize)==null||t.disconnect()}firstUpdated(){this.resize=new ResizeObserver(()=>void this.scrollToEnd(!1)),this.log&&this.resize.observe(this.log)}get activeCharacter(){return this.workspace.characters.find(t=>t.id===this.characterID)??this.workspace.characters[0]}get activeConversation(){return this.workspace.conversations.find(t=>t.id===this.conversationID)}conversationsFor(t=this.characterID){return this.workspace.conversations.filter(e=>e.characterId===t).sort((e,i)=>i.updatedAt-e.updatedAt)}async load(){var t;try{const[e,i]=await Promise.all([v.chatStatus(),v.chatWorkspace()]);this.status=e,this.workspace=i,this.characterID=((t=i.characters[0])==null?void 0:t.id)??"libby";const a=this.conversationsFor(this.characterID)[0];a?this.activateConversation(a.id):this.newConversation(!1),e.modelBackend&&this.refreshModels(!0)}catch(e){this.say(e.message,!0)}finally{this.loading=!1}}say(t,e=!1){this.notice=t,this.noticeError=e,window.clearTimeout(this.noticeTimer),this.noticeTimer=window.setTimeout(()=>this.notice="",4200)}async refreshModels(t=!1){try{const[e,i]=await Promise.all([v.chatModels(),v.chatStatus()]);this.models=e,this.status=i,t||this.say(i.enabled?`Connected to ${i.model||"the loaded model"}.`:i.message||"No model is loaded.",!i.enabled)}catch(e){t||this.say(e.message,!0)}}touchWorkspace(){this.workspace={...this.workspace,characters:[...this.workspace.characters],conversations:[...this.workspace.conversations],images:[...this.workspace.images]},window.clearTimeout(this.saveTimer),this.saveTimer=window.setTimeout(()=>void this.saveWorkspace(),450)}async saveWorkspace(){window.clearTimeout(this.saveTimer);try{this.workspace=await v.saveChatWorkspace(this.workspace)}catch(t){this.say(`Couldn't save chat: ${t.message}`,!0)}}async scrollToEnd(t=!0){await this.updateComplete,requestAnimationFrame(()=>{this.log&&this.log.scrollTo({top:this.log.scrollHeight,behavior:t?"smooth":"auto"})})}activateCharacter(t){this.characterID=t,this.mobileNavOpen=!1;const e=this.conversationsFor(t)[0];e?this.activateConversation(e.id):this.newConversation()}activateConversation(t){const e=this.workspace.conversations.find(i=>i.id===t);e&&(this.conversationID=t,this.characterID=e.characterId,this.mobileNavOpen=!1,vt(e.intensity),this.armIdle(),this.scrollToEnd(!1))}newConversation(t=!0){var n,c;const e=this.activeCharacter;if(!e)return;const i=Date.now();let a=((n=e.firstMessage)==null?void 0:n.trim())??"",r=ye((c=Pe.find(h=>h.id===e.defaultMode))==null?void 0:c.emotion);if(e.id==="libby"&&!a){const h=qs(e.defaultMode,Ae());a=h.message,r=h.emotion}const o={id:ce(),characterId:e.id,title:"New conversation",mode:e.defaultMode||"sweet",emotion:r,intensity:e.id==="libby"?Ae():1,progress:e.id==="libby"?Ae():1,options:ba(),messages:a?[{id:ce(),role:"assistant",content:a,at:i}]:[],createdAt:i,updatedAt:i};this.workspace.conversations.push(o),this.conversationID=o.id,this.mobileNavOpen=!1,this.touchWorkspace(),t&&this.say(`Started a new chat with ${e.name}.`),this.armIdle(),this.scrollToEnd(!1)}clearConversation(){const t=this.activeConversation;!t||!confirm("Clear every message in this conversation?")||(t.messages=[],t.title="New conversation",t.updatedAt=Date.now(),this.touchWorkspace(),this.say("Conversation cleared."))}deleteConversation(t){if(!confirm("Delete this conversation?"))return;this.workspace.conversations=this.workspace.conversations.filter(i=>i.id!==t);const e=this.conversationsFor()[0];e?this.conversationID=e.id:this.newConversation(!1),this.touchWorkspace()}updateConversation(t){const e=this.activeConversation;e&&(Object.assign(e,t,{updatedAt:Date.now()}),t.intensity!=null&&(e.progress=t.intensity,vt(t.intensity)),this.touchWorkspace())}updateOption(t,e){const i=this.activeConversation;i&&(i.options={...i.options??{},[t]:e},i.updatedAt=Date.now(),this.touchWorkspace())}onKey(t){t.key==="Enter"&&!t.shiftKey&&(t.preventDefault(),this.send())}async send(){var r,o,n,c,h,f,g,u,y;const t=this.draft.trim(),e=this.activeConversation,i=this.activeCharacter;if(!t||!e||!i||this.busy)return;const a={id:ce(),role:"user",content:t,at:Date.now()};if(e.messages.push(a),e.updatedAt=Date.now(),e.title==="New conversation"&&(e.title=t.slice(0,42)),this.draft="",this.busy=!0,this.notice="",this.touchWorkspace(),this.armIdle(),this.scrollToEnd(),!((r=this.status)!=null&&r.enabled)&&((o=this.status)!=null&&o.configured||(n=this.status)!=null&&n.modelBackend))try{this.status=await v.chatStatus()}catch{}if(!((c=this.status)!=null&&c.enabled)){if(i.id!=="libby"){this.busy=!1,this.say(((h=this.status)==null?void 0:h.message)||"Load a model in text-generation-webui, then refresh backend status.",!0);return}const $=It(e.progress??e.intensity,rr(t,e.mode)),O=Ws(t,e.mode,ye(e.emotion),$.intensity,!1);await new Promise(ae=>setTimeout(ae,350+Math.random()*450)),e.emotion=O.emotion,e.progress=$.progress,e.intensity=vt($.intensity),e.messages.push({id:ce(),role:"assistant",content:O.message,at:Date.now()}),e.updatedAt=Date.now(),this.busy=!1,this.touchWorkspace(),this.scrollToEnd();return}try{const $=e.messages.map(({role:X,content:fe})=>({role:X,content:fe})),O=await v.chat(e.mode,$,e.emotion,e.intensity,e.options,i.id);e.emotion=ye(O.emotion??e.emotion);const ae=ve(O.intensity??e.intensity),re=It(e.progress??e.intensity,ae-e.intensity);e.progress=re.progress,e.intensity=vt(re.intensity),e.messages.push({id:ce(),role:"assistant",content:O.message,at:Date.now(),imageId:O.imageId||void 0}),e.updatedAt=Date.now(),this.touchWorkspace(),this.scrollToEnd()}catch($){if((f=this.status)!=null&&f.configured||(g=this.status)!=null&&g.modelBackend)try{this.status=await v.chatStatus()}catch{}this.say(!((u=this.status)!=null&&u.enabled)&&((y=this.status)!=null&&y.message)?this.status.message:$.message,!0)}finally{this.busy=!1}}editMessage(t){var a;const e=(a=prompt("Edit message",t.content))==null?void 0:a.trim();if(!e||e===t.content)return;t.content=e;const i=this.activeConversation;i&&(i.updatedAt=Date.now()),this.touchWorkspace()}deleteMessage(t){const e=this.activeConversation;e&&(e.messages=e.messages.filter(i=>i.id!==t),e.updatedAt=Date.now(),this.touchWorkspace())}updateCharacter(t,e){const i=this.activeCharacter;i&&(i[t]=e,this.touchWorkspace())}addCharacter(){const t={id:ce(),name:"New friend",promptWeight:1,defaultMode:"sweet",firstMessage:"Hey! It's nice to meet you."};this.workspace.characters.push(t),this.characterID=t.id,this.touchWorkspace(),this.newConversation(!1),this.settingsOpen=!0,this.editorTab="character"}deleteCharacter(){var i;const t=this.activeCharacter;if(!t||t.builtIn||!confirm(`Remove ${t.name} and all of their conversations?`))return;this.workspace.characters=this.workspace.characters.filter(a=>a.id!==t.id),this.workspace.conversations=this.workspace.conversations.filter(a=>a.characterId!==t.id),this.characterID=((i=this.workspace.characters[0])==null?void 0:i.id)??"libby";const e=this.conversationsFor()[0];e?this.conversationID=e.id:this.newConversation(!1),this.touchWorkspace()}async importCard(t){var i;const e=(i=t.target.files)==null?void 0:i[0];if(e)try{if(e.type.startsWith("image/")){const r=await An(e)??{id:ce(),name:e.name.replace(/\.[^.]+$/,"")||"New friend",promptWeight:1,defaultMode:"sweet"};this.workspace.characters.push(r),this.characterID=r.id,await this.saveWorkspace();const o=await v.uploadChatImage({characterId:r.id,name:`${r.name} avatar`,imageData:await this.readDataURL(e),tags:["portrait"]});this.workspace.images.push(o),r.avatarImageId=o.id,this.touchWorkspace(),this.newConversation(!1),this.say("Friend added and image scanned.");return}const a=vr(JSON.parse(await e.text()),e.name.replace(/\.json$/i,""));this.workspace.characters.push(a),this.characterID=a.id,this.touchWorkspace(),this.newConversation(!1),this.say(`${a.name} joined your friends.`)}catch(a){this.say(`Couldn't import card: ${a.message}`,!0)}finally{t.target.value=""}}readDataURL(t){return new Promise((e,i)=>{const a=new FileReader;a.onload=()=>e(String(a.result)),a.onerror=()=>i(a.error),a.readAsDataURL(t)})}async uploadImage(t){var a;const e=(a=t.target.files)==null?void 0:a[0],i=this.activeCharacter;if(!(!e||!i))try{this.say("Scanning image locally…");const r=this.imageTags.split(",").map(n=>n.trim()).filter(Boolean),o=await v.uploadChatImage({characterId:i.id,name:e.name,imageData:await this.readDataURL(e),tags:r});this.workspace.images.push(o),i.avatarImageId||(i.avatarImageId=o.id),this.imageTags="",this.touchWorkspace(),this.say(`Image scanned: ${o.tags.join(", ")||"no content tags found"}.`)}catch(r){this.say(r.message,!0)}finally{t.target.value=""}}async deleteImage(t){if(confirm(`Delete ${t.name}?`))try{await v.deleteChatImage(t.id),this.workspace.images=this.workspace.images.filter(i=>i.id!==t.id);const e=this.activeCharacter;(e==null?void 0:e.avatarImageId)===t.id&&(e.avatarImageId=""),this.touchWorkspace()}catch(e){this.say(e.message,!0)}}avatar(t,e){if(t.avatarImageId)return s`<span class=${e}><img src=${v.chatImageURL(t.avatarImageId)} alt="" /></span>`;if(t.id==="libby"&&!Et()){const i=this.activeConversation,a=Bi(ye(i==null?void 0:i.emotion),(i==null?void 0:i.intensity)??1,Ni());return s`<span class=${e}><img src=${a[0]} data-fallback-index="0" alt="Libby" @error=${r=>Ui(r.target,a)} /></span>`}return s`<span class="${e} initial">${t.name.slice(0,2).toUpperCase()}</span>`}renderRail(){return s`<nav class="rail" aria-label="Friends">
      ${this.workspace.characters.map((t,e)=>s`
        ${e===1?s`<span class="rail-sep"></span>`:l}
        <button class="guild ${t.id===this.characterID?"on":""}" title=${t.name} @click=${()=>this.activateCharacter(t.id)}>
          ${this.avatar(t,"member-avatar")}
        </button>`)}
      <button class="guild" title="Add a friend" @click=${this.addCharacter}><span class="material-symbols-rounded">add</span></button>
    </nav>`}renderSidebar(){var i,a,r;const t=this.activeCharacter,e=this.workspace.profile.displayName||((i=this.user)==null?void 0:i.username)||"You";return s`<aside class="side">
      <div class="side-head"><div class="side-title"><strong>${(t==null?void 0:t.name)??"Chat"}</strong><span>Choose a conversation</span></div><button title="Start a new conversation" aria-label="Start a new conversation" @click=${()=>this.newConversation()}><span class="material-symbols-rounded">add_comment</span></button></div>
      <div class="cat"><span>Conversations · ${this.conversationsFor().length}</span><button title="New conversation" @click=${()=>this.newConversation()}>+</button></div>
      <div class="convos">${this.conversationsFor().map(o=>s`
        <div class="convo-wrap ${o.id===this.conversationID?"on":""}">
          <button class="convo" @click=${()=>this.activateConversation(o.id)} aria-current=${o.id===this.conversationID?"page":"false"}>
            <span class="convo-icon material-symbols-rounded" style="font-size:18px">forum</span><span class="convo-title">${o.title}</span>
            <span class="convo-meta">${o.messages.length} messages · ${Wt(o.updatedAt)}</span>
          </button>
          <button class="convo-delete" title="Delete conversation" aria-label="Delete ${o.title}" @click=${()=>this.deleteConversation(o.id)}><span class="material-symbols-rounded" style="font-size:16px">delete</span></button>
        </div>`)}
      </div>
      <div class="side-foot">${this.workspace.profile.avatarImageId?s`<span class="me-avatar"><img src=${v.chatImageURL(this.workspace.profile.avatarImageId)} alt="" /></span>`:s`<span class="me-avatar initial">${e.slice(0,2).toUpperCase()}</span>`}
        <div class="me-copy"><div class="me-name">${e}</div><div class="me-sub"><span class="status-dot ${(a=this.status)!=null&&a.enabled?"online":""}"></span>${(r=this.status)!=null&&r.enabled?`Model: ${this.status.model}`:(t==null?void 0:t.id)==="libby"?"Libby local replies":"Model offline"}</div></div>
        <button class="icon-btn" title="Profile" @click=${()=>{this.settingsOpen=!0,this.editorTab="profile"}}><span class="material-symbols-rounded">manage_accounts</span></button>
      </div>
    </aside>`}renderSettings(){const t=this.activeCharacter,e=this.activeConversation;return!t||!e?l:s`<section class="settings">
      <div class="settings-head"><strong>Chat settings<span>Changes sync between WebUI and Android</span></strong><button class="icon-btn" title="Close settings" aria-label="Close settings" @click=${()=>this.settingsOpen=!1}><span class="material-symbols-rounded">close</span></button></div>
      <div class="tabs">${["character","generation","images","profile"].map(i=>s`
        <button class="tab ${this.editorTab===i?"on":""}" @click=${()=>this.editorTab=i}>${i}</button>`)}</div>
      ${this.editorTab==="character"?this.renderCharacterPanel(t):l}
      ${this.editorTab==="generation"?this.renderGenerationPanel(e):l}
      ${this.editorTab==="images"?this.renderImagesPanel(t):l}
      ${this.editorTab==="profile"?this.renderProfilePanel():l}
    </section>`}field(t,e,i,a=1){return s`<label>${t}${a>1?s`<textarea class="field" rows=${a} .value=${i} @change=${r=>this.updateCharacter(e,r.target.value)}></textarea>`:s`<input class="field" .value=${i} @change=${r=>this.updateCharacter(e,r.target.value)} />`}</label>`}renderCharacterPanel(t){return s`<div class="panel">
      <div class="grid">${this.field("Name","name",t.name)}<label>Default mode<select .value=${t.defaultMode} @change=${e=>this.updateCharacter("defaultMode",e.target.value)}>${Pe.map(e=>s`<option value=${e.id}>${e.label}</option>`)}</select></label></div>
      ${this.field("Description","description",t.description??"",2)}
      <div class="grid">${this.field("Personality","personality",t.personality??"",3)}${this.field("Scenario","scenario",t.scenario??"",3)}</div>
      ${this.field("First message","firstMessage",t.firstMessage??"",2)}
      ${this.field("System prompt / card instructions","systemPrompt",t.systemPrompt??"",3)}
      ${this.field("Example dialogue","exampleDialogue",t.exampleDialogue??"",3)}
      ${this.field("Creator notes (not sent to model)","creatorNotes",t.creatorNotes??"",2)}
      <label>Character-card weight <span class="range"><input type="range" min="0.1" max="2" step="0.05" .value=${String(t.promptWeight||1)} @input=${e=>this.updateCharacter("promptWeight",Number(e.target.value))}/><output>${(t.promptWeight||1).toFixed(2)}</output></span></label>
      <div class="panel-actions"><button class="primary" @click=${()=>void this.saveWorkspace()}>Save card</button><label class="secondary file">Import SillyTavern JSON or portrait<input type="file" accept="application/json,.json,image/*" @change=${this.importCard}/></label>${t.builtIn?s`<span class="empty">Libby's built-in card is editable.</span>`:s`<button class="danger" @click=${this.deleteCharacter}>Remove friend</button>`}</div>
    </div>`}renderGenerationPanel(t){var i,a,r;const e=(o,n,c,h,f,g)=>s`<label>${o}<span class="range"><input type="range" min=${c} max=${h} step=${f} .value=${String(ya(t.options,n,g))} @input=${u=>this.updateOption(n,Number(u.target.value))}/><output>${ya(t.options,n,g)}</output></span></label>`;return s`<div class="panel">
      <label>Text-generation backend<div class="panel-actions"><strong>${((i=this.models)==null?void 0:i.loaded)||((a=this.status)==null?void 0:a.model)||"No model loaded"}</strong><button class="secondary" @click=${()=>void this.refreshModels()}>Refresh status</button></div></label>
      <div class="empty">Load or unload models in text-generation-webui’s own WebUI. OppaiLib deliberately keeps model management read-only so it cannot destabilize the Docker container.</div>
      ${(r=this.models)!=null&&r.models.length?s`<label>Models visible to the backend<select disabled><option>${this.models.models.join(" · ")}</option></select></label>`:l}
      <div class="grid">
      <label>Conversation mode<select .value=${t.mode} @change=${o=>this.updateConversation({mode:o.target.value})}>${Pe.map(o=>s`<option value=${o.id}>${o.label}</option>`)}</select></label>
      <label>Displayed emotion<select .value=${t.emotion} @change=${o=>this.updateConversation({emotion:o.target.value})}>${["neutral","happy","mischievous","surprised","thinking"].map(o=>s`<option>${o}</option>`)}</select></label>
      ${e("Temperature","temperature",0,2,.05,.8)}${e("Top P","top_p",.05,1,.05,.95)}
      ${e("Repetition penalty","repetition_penalty",1,2,.05,1.1)}${e("Max reply tokens","max_tokens",64,2048,32,400)}
      <label>Horniness / intensity <span class="range"><input type="range" min="1" max="5" step="1" .value=${String(t.intensity)} @input=${o=>this.updateConversation({intensity:Number(o.target.value)})}/><output>${t.intensity}/5</output></span></label>
    </div>
    <label>Advanced API options<textarea class="field" rows="5" .value=${JSON.stringify(t.options??{},null,2)} @change=${o=>{try{const n=JSON.parse(o.target.value);this.updateConversation({options:n})}catch{this.say("Advanced options must be valid JSON.",!0)}}}></textarea></label>
    <div class="panel-actions"><button class="primary" @click=${()=>void this.saveWorkspace()}>Save for this conversation</button><button class="secondary" @click=${()=>{t.options=ba(),this.touchWorkspace()}}>Reset controls</button></div></div>`}renderImagesPanel(t){const e=this.workspace.images.filter(i=>i.characterId===t.id);return s`<div class="panel"><p class="empty">Images are scanned locally. A character may attach one when its tags match the current exchange.</p>
      <div class="grid"><label>Extra matching tags<input class="field" placeholder="beach, happy, bedroom" .value=${this.imageTags} @input=${i=>this.imageTags=i.target.value}/></label>
      <label class="secondary file" style="align-self:end;text-align:center">Upload and scan image<input type="file" accept="image/png,image/jpeg,image/webp,image/gif" @change=${this.uploadImage}/></label></div>
      <div class="image-grid">${e.map(i=>s`<article class="image-card"><img src=${v.chatImageURL(i.id)} alt=${i.name}/><button title="Delete" @click=${()=>void this.deleteImage(i)}>×</button><div><b>${i.name}</b><br/>${i.tags.join(", ")||"No tags"}${t.avatarImageId===i.id?s`<br/><b>Avatar</b>`:l}<br/><button class="secondary" @click=${()=>this.updateCharacter("avatarImageId",i.id)}>Use avatar</button></div></article>`)}</div>
      ${e.length?l:s`<div class="empty">No images for ${t.name} yet.</div>`}
    </div>`}renderProfilePanel(){const t=this.workspace.profile;return s`<div class="panel"><p class="empty">This profile is shared by WebUI and APK and is included in character context.</p>
      <label>Display name<input class="field" .value=${t.displayName} @change=${e=>{t.displayName=e.target.value,this.touchWorkspace()}}/></label>
      <label>Your persona<textarea class="field" rows="5" placeholder="How friends should know and address you…" .value=${t.persona} @change=${e=>{t.persona=e.target.value,this.touchWorkspace()}}></textarea></label>
      <div class="panel-actions"><button class="primary" @click=${()=>void this.saveWorkspace()}>Save profile</button></div></div>`}renderEntry(t,e){var n;const i=this.activeCharacter;if(!i)return l;const a=(e==null?void 0:e.role)===t.role&&t.at-e.at<5*6e4,r=t.role==="assistant",o=r?i.name:this.workspace.profile.displayName||((n=this.user)==null?void 0:n.username)||"You";return s`<article class="row ${a?"":"first"} ${r?"from-friend":"from-user"}">${a?s`<span class="stamp">${Wt(t.at)}</span>`:r?this.avatar(i,"avatar"):s`<span class="avatar initial">${o.slice(0,2).toUpperCase()}</span>`}
      <div class="message">${a?l:s`<div class="who"><span class="author ${r?"friend":""}">${o}</span>${r?s`<span class="bot">BOT</span>`:l}<span class="when">Today at ${Wt(t.at)}</span></div>`}<div class="text">${En(t.content)}</div>${t.imageId?s`<img class="sent-image" src=${v.chatImageURL(t.imageId)} alt="Image sent by ${o}"/>`:l}</div>
      <span class="message-actions"><button title="Copy" @click=${()=>void navigator.clipboard.writeText(t.content)}><span class="material-symbols-rounded" style="font-size:16px">content_copy</span></button><button title="Edit" @click=${()=>this.editMessage(t)}><span class="material-symbols-rounded" style="font-size:16px">edit</span></button><button title="Delete" @click=${()=>this.deleteMessage(t.id)}><span class="material-symbols-rounded" style="font-size:16px">delete</span></button></span>
    </article>`}render(){var a,r,o;const t=this.activeCharacter,e=this.activeConversation;if(this.loading)return s`<div class="client"><section class="main" style="grid-column:1/-1;place-items:center;display:grid"><md-circular-progress indeterminate></md-circular-progress></section></div>`;if(!t||!e)return s`<div class="client"><section class="main" style="grid-column:1/-1;padding:24px">Chat workspace is unavailable.</section></div>`;const i=Pe.find(n=>n.id===e.mode)??Pe[0];return s`<div class="client ${this.mobileNavOpen?"nav-open":""}" @pointerdown=${this.armIdle}><button class="nav-scrim" aria-label="Close chat navigation" @click=${()=>this.mobileNavOpen=!1}></button>${this.renderRail()}${this.renderSidebar()}
      <main class="main"><header class="top"><button class="icon-btn mobile-nav" title="Friends and conversations" aria-label="Open friends and conversations" @click=${()=>this.mobileNavOpen=!0}><span class="material-symbols-rounded">menu</span></button>${this.avatar(t,"top-avatar")}<span class="top-title"><span class="name">${t.name}</span><span class="topic">${(a=this.status)!=null&&a.enabled?this.status.model:t.id==="libby"?"Local replies":"Model offline"} · ${i.topic}</span></span><select class="quick-mode" aria-label="Conversation mode" title="Conversation mode" .value=${e.mode} @change=${n=>this.updateConversation({mode:n.target.value})}>${Pe.map(n=>s`<option value=${n.id}>${n.label}</option>`)}</select><span class="top-actions"><button class="icon-btn" title="New conversation" aria-label="New conversation" @click=${()=>this.newConversation()}><span class="material-symbols-rounded">add_comment</span></button><button class="icon-btn destructive-action" title="Clear messages" aria-label="Clear messages" @click=${this.clearConversation}><span class="material-symbols-rounded">delete_sweep</span></button><button class="icon-btn ${this.settingsOpen?"on":""}" title="Chat settings" aria-label="Chat settings" @click=${()=>this.settingsOpen=!this.settingsOpen}><span class="material-symbols-rounded">tune</span></button></span></header>
        ${this.settingsOpen?this.renderSettings():l}
        ${(r=this.status)!=null&&r.modelBackend&&!this.status.enabled?s`<div class="backend-state" role="status"><strong>Text generation offline.</strong> ${this.status.message||"Load a model in text-generation-webui, then refresh status."}</div>`:l}
        <section class="log"><div class="intro">${this.avatar(t,"round")}<h2>${t.name}</h2><p>${t.description||`This is the beginning of your conversation with ${t.name}.`}${(o=this.status)!=null&&o.enabled?` Running on ${this.status.model}.`:t.id==="libby"?" Libby is using built-in local replies.":" Connect a local model to start chatting."}</p></div>
          ${e.messages.map((n,c)=>this.renderEntry(n,e.messages[c-1]))}${this.busy?s`<div class="typing"><b>${t.name}</b> is typing…</div>`:l}
        </section>${this.notice?s`<div class="notice ${this.noticeError?"error":""}" role=${this.noticeError?"alert":"status"}>${this.notice}</div>`:l}
        <form class="composer-form" @submit=${n=>{n.preventDefault(),this.send()}}><div class="composer"><textarea rows="1" aria-label=${`Message ${t.name}`} placeholder=${`Message ${t.name}…`} .value=${this.draft} @input=${n=>this.draft=n.target.value} @keydown=${this.onKey} ?disabled=${this.busy}></textarea><button class="icon-btn" type="submit" title="Send message" aria-label="Send message" ?disabled=${!this.draft.trim()||this.busy}><span class="material-symbols-rounded">send</span></button></div><div class="format-help"><span>"speech" · **action** · *emphasis* · ~~strike~~ · &#96;code&#96;</span><span class="send-help"></span></div></form>
      </main>
    </div>`}};R.styles=[ke,ne,_`
    :host { display:block; height:100%; color:var(--md-sys-color-on-surface); font:400 15px/1.375 "gg sans","Noto Sans",Roboto,system-ui,sans-serif;
      --rail:var(--md-sys-color-surface-container-lowest); --side:var(--md-sys-color-surface-container-low);
      --main:var(--md-sys-color-surface); --hover:var(--md-sys-color-surface-container-high);
      --input:var(--md-sys-color-surface-container-highest); --muted:var(--md-sys-color-on-surface-variant);
      --line:var(--md-sys-color-outline-variant); --accent:var(--md-sys-color-primary); --on-accent:var(--md-sys-color-on-primary); }
    button,input,textarea,select { font:inherit; }
    button { color:inherit; }
    .client { position:relative; display:grid; grid-template-columns:64px 272px minmax(0,1fr); height:calc(100dvh - 112px); min-height:580px;
      border:1px solid var(--line); border-radius:18px; overflow:hidden; background:var(--main); box-shadow:0 18px 52px rgba(0,0,0,.12); }
    .rail { background:var(--rail); padding:12px 0; display:flex; flex-direction:column; align-items:center; gap:8px; overflow-y:auto; border-right:1px solid var(--line); }
    .guild { position:relative; width:44px; height:44px; flex:0 0 44px; border:0; border-radius:50%; background:var(--input); display:grid;
      place-items:center; overflow:hidden; cursor:pointer; transition:.15s; }
    .guild:hover,.guild.on { border-radius:14px; background:var(--accent); }
    .guild.on::before { content:""; position:absolute; left:0; width:4px; height:30px; border-radius:0 4px 4px 0; background:var(--md-sys-color-on-surface); }
    .guild img,.avatar img,.member-avatar img { width:100%; height:100%; object-fit:cover; object-position:top center; }
    .initial { font-weight:700; color:var(--on-accent); background:var(--accent); }
    .rail-sep { width:32px; height:2px; background:var(--line); }
    .side { min-width:0; display:flex; flex-direction:column; background:var(--side); }
    .side-head,.top { min-height:56px; flex:0 0 56px; display:flex; align-items:center; border-bottom:1px solid var(--line); }
    .side-head { padding:0 12px 0 16px; gap:8px; }
    .side-title { min-width:0; flex:1; }.side-title strong,.side-title span { display:block; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
    .side-title span { color:var(--muted); font-size:11px; margin-top:1px; }
    .side-head button,.icon-btn { border:0; background:transparent; border-radius:5px; padding:5px; display:grid; place-items:center; cursor:pointer; color:var(--muted); }
    .side-head button:hover,.icon-btn:hover,.icon-btn.on { background:var(--hover); color:var(--md-sys-color-on-surface); }
    .cat { padding:17px 12px 7px 16px; color:var(--muted); font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.06em; display:flex; }
    .cat button { margin-left:auto; border:0; background:transparent; cursor:pointer; color:var(--muted); }
    .convos { overflow-y:auto; min-height:0; }
    .convo-wrap { display:flex; align-items:center; margin:2px 8px; border-radius:9px; color:var(--muted); }
    .convo-wrap:hover,.convo-wrap.on { color:var(--md-sys-color-on-surface); background:var(--hover); }
    .convo { min-width:0; flex:1; padding:9px 8px; border:0; background:transparent; color:inherit; display:grid; grid-template-columns:22px minmax(0,1fr);
      gap:1px 7px; cursor:pointer; text-align:left; }
    .convo-icon { grid-row:1/3; align-self:center; }.convo-title { font-weight:600; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .convo-meta { color:var(--muted); font-size:10px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .convo-delete { opacity:0; margin-right:4px; border:0; border-radius:6px; padding:5px; background:transparent; color:var(--muted); cursor:pointer; }
    .convo-wrap:hover .convo-delete,.convo-wrap:focus-within .convo-delete { opacity:1; }.convo-delete:hover { color:var(--md-sys-color-error); background:var(--main); }
    .side-foot { margin-top:auto; background:var(--rail); padding:8px; display:flex; align-items:center; gap:8px; }
    .me-avatar { width:32px; height:32px; border-radius:50%; display:grid; place-items:center; }
    .me-copy { min-width:0; flex:1; } .me-name { font-size:13px; font-weight:650; overflow:hidden; text-overflow:ellipsis; }
    .me-sub { font-size:11px; color:var(--muted); display:flex; align-items:center; gap:5px; }.status-dot { width:7px; height:7px; border-radius:50%; background:#8a8f98; }.status-dot.online { background:#35c46a; }
    .main { display:flex; min-width:0; min-height:0; flex-direction:column; background:var(--main); position:relative; }
    .top { padding:0 10px 0 14px; gap:10px; }.mobile-nav { display:none!important; }
    .top-avatar { width:34px; height:34px; flex:0 0 34px; border-radius:50%; overflow:hidden; display:grid; place-items:center; }
    .top-title { min-width:0; }.top .name { display:block; font-weight:700; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }.topic { display:block; color:var(--muted); font-size:11px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .quick-mode { width:auto; max-width:124px; margin-left:auto; border-radius:999px; padding:6px 28px 6px 10px; font-size:12px; font-weight:650; background-color:var(--input); }
    .top-actions { display:flex; }
    .log { min-height:0; flex:1 1 0; overflow-y:auto; overflow-anchor:auto; padding:12px 0 20px; scroll-behavior:smooth; }
    .intro { margin:8px 16px 16px; padding:18px; border:1px solid var(--line); border-radius:14px; background:linear-gradient(135deg,var(--side),transparent); display:grid; grid-template-columns:56px minmax(0,1fr); gap:0 13px; align-items:center; }
    .intro .round { grid-row:1/3; width:56px; height:56px; border-radius:50%; background:var(--input); display:grid; place-items:center; overflow:hidden; }
    .intro .round img { width:100%; height:100%; object-fit:cover; }.intro h2 { font-size:20px; margin:0 0 3px; }.intro p { color:var(--muted); margin:0; font-size:13px; }
    .row { display:grid; grid-template-columns:56px minmax(0,1fr); padding:2px 44px 2px 0; position:relative; }
    .row.first { margin-top:15px; }.row:hover { background:color-mix(in srgb,var(--md-sys-color-on-surface) 5%,transparent); }
    .avatar { grid-column:1; justify-self:center; width:40px; height:40px; border-radius:50%; overflow:hidden; display:grid; place-items:center; margin-top:2px; }
    .stamp { grid-column:1; justify-self:end; opacity:0; color:var(--muted); font-size:10px; padding-right:4px; line-height:22px; }.row:hover .stamp { opacity:1; }
    .message { grid-column:2; min-width:0; }.who { display:flex; align-items:baseline; gap:7px; }.author { font-weight:550; }.author.friend { color:var(--accent); }
    .bot { color:var(--on-accent); background:var(--accent); padding:1px 4px; border-radius:3px; font-size:9px; font-weight:700; }.when { color:var(--muted); font-size:11px; }
    .text { white-space:pre-wrap; overflow-wrap:anywhere; }.text .action { font-style:italic; font-weight:700; color:color-mix(in srgb,var(--accent) 72%,var(--md-sys-color-on-surface)); }
    .text .speech { color:var(--md-sys-color-on-surface); }.text code { background:var(--input); padding:1px 4px; border-radius:3px; }.text s { opacity:.7; }
    .sent-image { display:block; max-width:min(460px,100%); max-height:420px; border-radius:8px; margin-top:7px; object-fit:contain; background:var(--input); }
    .message-actions { opacity:0; position:absolute; right:8px; top:-8px; display:flex; border:1px solid var(--line); border-radius:5px; overflow:hidden; background:var(--side); }
    .row:hover .message-actions { opacity:1; }.message-actions button { border:0; background:transparent; padding:4px; cursor:pointer; color:var(--muted); }.message-actions button:hover { color:inherit; background:var(--hover); }
    .typing { padding:6px 16px 0 56px; color:var(--muted); font-size:13px; }.typing b { color:var(--md-sys-color-on-surface); }
    .notice { margin:4px 16px 8px; padding:9px 12px; border-left:3px solid var(--accent); background:var(--side); border-radius:7px; font-size:13px; }
    .notice.error { border-color:var(--md-sys-color-error); color:var(--md-sys-color-error); }
    .backend-state { padding:9px 16px; border-bottom:1px solid var(--line); background:var(--side); color:var(--muted); font-size:12px; }
    .backend-state strong { color:var(--md-sys-color-error); }
    form.composer-form { padding:0 16px 14px; }.composer { display:flex; align-items:flex-end; gap:9px; background:var(--input); border:1px solid transparent; border-radius:14px; padding:10px 12px; }
    .composer:focus-within { border-color:var(--accent); box-shadow:0 0 0 2px color-mix(in srgb,var(--accent) 18%,transparent); }
    .composer textarea { resize:none; border:0; outline:0; background:transparent; color:inherit; max-height:140px; min-height:22px; line-height:22px; flex:1; padding:0; }
    .composer button { align-self:flex-end; }.format-help { color:var(--muted); font-size:10px; padding:5px 4px 0; display:flex; justify-content:space-between; }.send-help::after { content:"Enter to send · Shift+Enter for a new line"; }
    .members { min-width:0; background:var(--side); padding:12px 8px; overflow-y:auto; }.member { display:flex; align-items:center; gap:9px; padding:6px 8px; border-radius:5px; }
    .member:hover { background:var(--hover); }.member-avatar { width:34px; height:34px; border-radius:50%; overflow:hidden; display:grid; place-items:center; }
    .member-name { font-size:13px; font-weight:650; color:var(--accent); }.member-status { font-size:11px; color:var(--muted); }
    .settings { position:absolute; inset:56px 0 0 0; z-index:5; overflow:auto; background:var(--side); box-shadow:0 10px 28px rgba(0,0,0,.28); }
    .settings-head { position:sticky; top:0; z-index:2; display:flex; align-items:center; gap:8px; padding:12px 16px 8px; background:var(--side); }.settings-head strong { flex:1; font-size:17px; }.settings-head span { display:block; color:var(--muted); font-size:11px; font-weight:400; }
    .tabs { position:sticky; top:55px; z-index:2; display:flex; gap:3px; padding:0 12px; border-bottom:1px solid var(--line); background:var(--side); overflow-x:auto; }.tab { border:0; background:transparent; color:var(--muted); padding:9px 10px; cursor:pointer; border-bottom:2px solid transparent; text-transform:capitalize; }
    .tab.on { color:inherit; border-color:var(--accent); }.panel { padding:14px 16px 18px; display:grid; gap:11px; }.grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
    label { display:grid; gap:4px; color:var(--muted); font-size:11px; font-weight:650; text-transform:uppercase; }.field,select { box-sizing:border-box; width:100%; color:var(--md-sys-color-on-surface);
      background:var(--input); border:1px solid var(--line); border-radius:5px; padding:8px; outline:0; text-transform:none; font-weight:400; }
    textarea.field { min-height:66px; resize:vertical; }.range { display:grid; grid-template-columns:1fr 48px; gap:8px; align-items:center; }.range input { accent-color:var(--accent); }.range output { text-align:right; color:inherit; }
    .panel-actions { display:flex; flex-wrap:wrap; gap:7px; }.primary,.secondary,.danger { border:1px solid var(--line); border-radius:5px; padding:7px 11px; cursor:pointer; background:transparent; }
    .primary { background:var(--accent); border-color:var(--accent); color:var(--on-accent); }.danger { color:var(--md-sys-color-error); }.file { position:relative; overflow:hidden; }.file input { position:absolute; inset:0; opacity:0; cursor:pointer; }
    .image-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(120px,1fr)); gap:9px; }.image-card { background:var(--input); border-radius:7px; overflow:hidden; position:relative; }
    .image-card img { width:100%; height:110px; object-fit:cover; }.image-card div { padding:6px; font-size:11px; overflow-wrap:anywhere; }.image-card button { position:absolute; right:4px; top:4px; border:0; border-radius:50%; background:rgba(0,0,0,.7); color:white; cursor:pointer; }
    .empty { color:var(--muted); font-size:13px; }.nav-scrim { display:none; }
    @media(max-width:900px){.client{grid-template-columns:60px 236px minmax(0,1fr)}.side-head{padding-left:12px}}
    @media(max-width:700px){
      :host{height:auto}.client{display:block;height:calc(100dvh - 72px);min-height:520px;border:0;border-radius:0;box-shadow:none}.main{height:100%}
      .rail,.side{display:none;position:absolute;top:0;bottom:0;z-index:12}.client.nav-open .rail{display:flex;left:0;width:60px}.client.nav-open .side{display:flex;left:60px;width:min(286px,calc(100% - 60px))}
      .client.nav-open .nav-scrim{display:block;position:absolute;inset:0;z-index:11;border:0;background:rgba(0,0,0,.55)}
      .mobile-nav{display:grid!important}.top{padding-left:4px;gap:7px}.quick-mode{max-width:96px;padding-left:8px}.topic{max-width:130px}.grid{grid-template-columns:1fr}
      .row{grid-template-columns:48px minmax(0,1fr);padding-right:12px}.avatar{width:34px;height:34px}.typing{padding-left:48px}.destructive-action{display:none}.format-help{display:none}
      .intro{margin:6px 10px 12px;padding:13px}.settings{inset:56px 0 0}.panel{padding-left:12px;padding-right:12px}.message-actions{opacity:1;position:static;grid-column:2;justify-self:end;margin-top:3px;border:0;background:transparent}
    }
  `];U([m({attribute:!1})],R.prototype,"user",2);U([d()],R.prototype,"status",2);U([d()],R.prototype,"workspace",2);U([d()],R.prototype,"characterID",2);U([d()],R.prototype,"conversationID",2);U([d()],R.prototype,"draft",2);U([d()],R.prototype,"busy",2);U([d()],R.prototype,"loading",2);U([d()],R.prototype,"settingsOpen",2);U([d()],R.prototype,"editorTab",2);U([d()],R.prototype,"notice",2);U([d()],R.prototype,"noticeError",2);U([d()],R.prototype,"imageTags",2);U([d()],R.prototype,"models",2);U([d()],R.prototype,"mobileNavOpen",2);U([S(".log")],R.prototype,"log",2);R=U([I("oppai-chat")],R);var Ln=Object.defineProperty,Dn=Object.getOwnPropertyDescriptor,V=(t,e,i,a)=>{for(var r=a>1?void 0:a?Dn(e,i):e,o=t.length-1,n;o>=0;o--)(n=t[o])&&(r=(a?n(e,i,r):n(r))||r);return a&&r&&Ln(e,i,r),r};const On=[{id:"home",label:"Home",icon:"home"},...Ze.map(t=>({id:t,label:Y[t].label,icon:Y[t].icon})),{id:"favorites",label:"Favorites",icon:"favorite"},{id:"browse",label:"Browse",icon:"explore"},{id:"imagegen",label:"Create",icon:"auto_awesome"},{id:"chat",label:"Chat",icon:"chat_bubble"}];function Pn(t){const e=(t.tags??[]).flatMap(i=>[i.name,i.category]);return[t.title,t.notes??"",...e].join(`
`).toLowerCase()}function Mn(t,e){if(e.length===0)return!0;const i=Pn(t);return e.every(a=>i.includes(a))}let N=class extends C{constructor(){super(...arguments),this.items=[],this.loading=!1,this.section="home",this.selectedId=null,this.search="",this.filters={},this.favorites=tn(),this.uploadOpen=!1,this.dragActive=!1,this.selectMode=!1,this.selected=new Set,this.busy=!1,this.downloads=Xs(),this.viewerList=[],this.onDownloads=t=>{this.downloads=t.detail},this.onDownloadComplete=()=>this.refresh(),this.onKey=t=>{var i;if(this.selectedId==null||this.uploadOpen||nr(t))return;const e=((i=this.items.find(a=>a.id===this.selectedId))==null?void 0:i.kind)==="comic";switch(t.key){case"ArrowRight":if(e)return;t.preventDefault(),this.stepItem(1);break;case"ArrowLeft":if(e)return;t.preventDefault(),this.stepItem(-1);break;case"Escape":this.closeItem();break}},this.stepItem=t=>{if(this.selectedId==null)return;const e=this.viewerList.indexOf(this.selectedId);if(e<0)return;const i=e+t;i<0||i>=this.viewerList.length||(this.selectedId=this.viewerList[i])},this.closeItem=()=>{this.selectedId=null},this.toggleSelectMode=()=>{this.selectMode=!this.selectMode,this.selectMode||(this.selected=new Set)},this.toggleUpload=()=>{this.uploadOpen=!this.uploadOpen,this.dragActive=!1}}connectedCallback(){super.connectedCallback(),this.refresh(),window.addEventListener("keydown",this.onKey),window.addEventListener("oppai-downloads",this.onDownloads),window.addEventListener("oppai-download-complete",this.onDownloadComplete)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this.onKey),window.removeEventListener("oppai-downloads",this.onDownloads),window.removeEventListener("oppai-download-complete",this.onDownloadComplete)}async refresh(){this.loading=!0;try{const e=[];for(let i=0;;i+=200){const r=(await v.listMedia("",200,i)).items??[];if(e.push(...r),r.length<200)break}this.items=e}finally{this.loading=!1}}selectSection(t){this.section=t,this.selectedId=null,this.search=""}openItem(t,e){e&&e.length?this.viewerList=e.map(i=>i.id):this.viewerList.includes(t)||(this.viewerList=[t]),this.selectedId=t}onSearchInput(t){this.search=t.target.value,this.selectedId=null}clearSearch(){this.search=""}setFilter(t,e){this.filters={...this.filters,[t]:e}}toggleFavorite(t,e){e==null||e.stopPropagation();const i=new Set(this.favorites);i.has(t)?i.delete(t):i.add(t),this.favorites=i,jt(i)}exitSelect(){this.selectMode=!1,this.selected=new Set}toggleSelected(t,e){e==null||e.stopPropagation();const i=new Set(this.selected);i.has(t)?i.delete(t):i.add(t),this.selected=i}async bulkDelete(){const t=[...this.selected];if(t.length&&confirm(`Delete ${t.length} item${t.length===1?"":"s"}? This cannot be undone.`)){this.busy=!0;try{await v.bulkMedia("delete",t);const e=Z("libraryDelete",{count:t.length});H(e.message,"success",{emotion:e.emotion,intensity:e.intensity});const i=new Set(this.favorites);t.forEach(a=>i.delete(a)),this.favorites=i,jt(i),this.exitSelect(),await this.refresh()}catch(e){console.error("bulk delete",e)}finally{this.busy=!1}}}async bulkTags(t){const e=[...this.selected];if(!e.length)return;const i=prompt(t==="add"?"Add tags (comma-separated):":"Remove tags (comma-separated):");if(i==null)return;const a=i.split(",").map(r=>r.trim()).filter(Boolean);if(a.length){this.busy=!0;try{await v.bulkMedia("update",e,t==="add"?{addTags:a}:{removeTags:a}),await this.refresh()}catch(r){console.error("bulk tags",r)}finally{this.busy=!1}}}async bulkChangeKind(){const t=[...this.selected];if(!t.length)return;const e=prompt("Change type to (video, gif, image, comic, game):");if(e==null)return;const i=e.trim().toLowerCase();if(!Ze.includes(i)){alert(`Unknown type "${i}".`);return}this.busy=!0;try{await v.bulkMedia("update",t,{kind:i}),this.exitSelect(),await this.refresh()}catch(a){console.error("bulk kind",a)}finally{this.busy=!1}}bulkFavorite(){const t=new Set(this.favorites);this.selected.forEach(e=>t.add(e)),this.favorites=t,jt(t),this.exitSelect()}logout(){this.dispatchEvent(new CustomEvent("logout",{bubbles:!0,composed:!0}))}browse(){var t;(t=this.renderRoot.querySelector("#file"))==null||t.click()}async onFiles(t){const e=Array.from(t);if(e.length){this.uploadOpen=!1;for(const i of e)try{await v.upload(i)}catch(a){console.error("upload",a)}this.refresh()}}onFileInput(t){const e=t.target;e.files&&this.onFiles(e.files),e.value=""}onDrop(t){var e,i;t.preventDefault(),this.dragActive=!1,(i=(e=t.dataTransfer)==null?void 0:e.files)!=null&&i.length&&this.onFiles(t.dataTransfer.files)}openScrape(){var t;this.uploadOpen=!1,(t=this.renderRoot.querySelector("oppai-scrape-dialog"))==null||t.open()}itemsForKind(t){return this.items.filter(e=>e.kind===t)}get viewerQueue(){return this.viewerList.map(t=>this.items.find(e=>e.id===t)).filter(t=>t!=null)}render(){var y;const t=this.search.trim().length>0,e=this.selectedId!=null,i=!e&&this.section==="settings"&&!t,a=!e&&this.section==="browse"&&!t,r=!e&&this.section==="imagegen"&&!t,o=!e&&this.section==="chat"&&!t,n=!e&&this.section==="favorites"&&!t,c=!e&&this.section==="home"&&!t&&!n,h=!e&&t,f=!e&&!c&&!n&&!h&&!i&&!a&&!r&&!o,g=e?this.items.find($=>$.id===this.selectedId)??null:null;let u="Library";return e?u=g?g.title:"Library":h?u="Search results":i?u="Settings":a?u="Browse sources":r?u="Create":o?u="Chat with Libby":n?u="Favorites":c?u="Library":u=((y=Y[this.section])==null?void 0:y.label)??"Library",s`
      ${this.renderNav()}
      <div class="main-col">
        ${this.renderHeader(u,t,e,i)}
        <main>
          ${c?this.renderHome():l}
          ${i?s`<oppai-settings .user=${this.user}></oppai-settings>`:l}
          ${a?s`<oppai-browse @imported=${()=>this.refresh()}></oppai-browse>`:l}
          ${r?s`<oppai-imagegen @imported=${()=>this.refresh()}></oppai-imagegen>`:l}
          ${o?s`<oppai-chat .user=${this.user}></oppai-chat>`:l}
          ${f||n||h?this.renderGrid(f,n,h):l}
          ${e&&g?s`<oppai-viewer
                .media=${g}
                .queue=${this.viewerQueue}
                .favorite=${this.favorites.has(g.id)}
                @toggle-favorite=${()=>this.toggleFavorite(g.id)}
                @navigate=${$=>this.stepItem($.detail.dir)}
                @jump=${$=>this.selectedId=$.detail.id}
                @changed=${()=>this.refresh()}
                @deleted=${()=>{this.closeItem(),this.refresh()}}
              ></oppai-viewer>`:l}
          ${e&&!g?s`<div class="empty">Item not found.</div>`:l}
        </main>
      </div>
      ${this.renderUpload()}
      ${this.renderBulkBar()}
      ${this.renderDownloads()}
      <oppai-scrape-dialog @imported=${()=>this.refresh()}></oppai-scrape-dialog>
      <input id="file" type="file" multiple @change=${this.onFileInput} />
    `}renderDownloads(){return this.downloads.length===0?l:s`<aside class="download-area" aria-label="Downloads">
      <div class="download-heading">Downloads</div>
      ${this.downloads.slice(0,5).map(t=>s`
        <div class="download-row">
          <div class="download-ring" style=${`--p:${t.progress}`}>
            <span class="material-symbols-rounded">${t.state==="done"?"check":t.state==="error"?"error":"download"}</span>
          </div>
          <div class="download-copy">
            <div class="download-title">${t.label}</div>
            <div class="download-status">${t.state==="running"?`${Math.round(t.progress*100)}% · running in background`:t.state==="done"?"Complete":t.error||"Failed"}</div>
          </div>
          ${t.state!=="running"?s`<button class="download-dismiss" title="Dismiss" @click=${()=>Zs(t.id)}>
            <span class="material-symbols-rounded">close</span>
          </button>`:l}
        </div>`)}
    </aside>`}renderBulkBar(){if(!this.selectMode||this.selected.size===0)return l;const t=this.selected.size;return s`
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
    `}renderNav(){var i,a;const t=(((i=this.user)==null?void 0:i.username)??"?").slice(0,2).toUpperCase(),e=this.section==="settings"&&this.selectedId==null;return s`
      <nav>
        <button class="logo" title="OppaiLib" @click=${()=>this.selectSection("home")}>
          ${or}
        </button>
        <button class="add-btn" title="Add media" @click=${this.toggleUpload}>
          <span class="material-symbols-rounded" style="font-size:26px;">add</span>
        </button>

        <div class="nav-list">
          ${On.map(r=>{const o=this.section===r.id&&this.selectedId==null;return s`
              <button class="nav-item" @click=${()=>this.selectSection(r.id)}>
                <span
                  class="nav-pill"
                  style="background:${o?"var(--oppai-primary-container)":"transparent"};"
                >
                  <span
                    class="material-symbols-rounded ${o?"fill-icon":""}"
                    style="font-size:22px; color:${o?"var(--oppai-primary-bright)":"var(--oppai-text-dim)"};"
                    >${r.icon}</span
                  >
                </span>
                <span class="nav-label" style="color:${o?"var(--oppai-text)":"var(--oppai-text-muted)"};"
                  >${r.label}</span
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
          title="Sign out (${(a=this.user)==null?void 0:a.username})"
          @click=${this.logout}
          style="width:40px; height:40px; border-radius:20px; background:var(--oppai-accent); color:var(--oppai-on-accent); font-size:13px; font-weight:600;"
        >
          ${t}
        </button>
      </nav>
    `}renderHeader(t,e,i,a=!1){return s`
      <header>
        ${i?s`<button
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
          ${e?s`<button
                class="icon-btn"
                @click=${this.clearSearch}
                style="background:none; color:var(--oppai-text-dim);"
              >
                <span class="material-symbols-rounded" style="font-size:18px;">close</span>
              </button>`:l}
        </div>

        <div style="flex:1;"></div>

        ${!i&&!a?s`<button
              class="filters-btn header-toggle ${this.selectMode?"on":""}"
              title="Select multiple"
              @click=${this.toggleSelectMode}
            >
              <span class="material-symbols-rounded" style="font-size:18px;"
                >${this.selectMode?"check_circle":"check_box_outline_blank"}</span
              >
              <span style="font-size:13px; font-weight:500;">Select</span>
            </button>`:l}
        ${a?l:s`<button class="filters-btn">
              <span class="material-symbols-rounded" style="font-size:18px;">tune</span>
              <span style="font-size:13px; font-weight:500;">Filters</span>
            </button>`}
      </header>
    `}renderHome(){const t=new Date().getHours(),e=t<12?"Good morning":t<18?"Good afternoon":"Good evening",i=Ze.map(a=>({kind:a,label:Y[a].label,icon:Y[a].icon,items:this.itemsForKind(a).slice(0,12)})).filter(a=>a.items.length>0);return this.loading&&this.items.length===0?s`<div class="empty">Loading your library…</div>`:i.length===0?s`<div>
        <h2 class="greeting">${e}</h2>
        <p class="greeting-sub">Your library is empty — add media or import from a URL.</p>
        <div class="empty">
          <span class="material-symbols-rounded" style="font-size:40px; display:block; margin-bottom:12px;"
            >library_add</span
          >
          <div style="font-size:14px;">Nothing here yet.</div>
        </div>
      </div>`:s`
      <div>
        <h2 class="greeting anim-rise">${e}</h2>
        <p class="greeting-sub anim-rise" style="animation-delay:40ms;">
          Here's what's new across your library
        </p>
        ${i.map((a,r)=>s`
            <section class="row anim-rise" style="animation-delay:${80+r*70}ms;">
              <div class="row-head">
                <span class="material-symbols-rounded" style="font-size:22px; color:var(--oppai-primary-bright);"
                  >${a.icon}</span
                >
                <h3 class="row-title">${a.label}</h3>
                <button class="see-all" @click=${()=>this.selectSection(a.kind)}>
                  See all
                  <span class="material-symbols-rounded" style="font-size:16px;">chevron_right</span>
                </button>
              </div>
              <div class="row-scroll">
                ${a.items.map(o=>this.renderTile(o,"200px",void 0,a.items))}
              </div>
            </section>
          `)}
      </div>
    `}renderGrid(t,e,i){var c;let a="",r=[],o=[];if(e)a="Favorites",r=this.items.filter(h=>this.favorites.has(h.id));else if(i){a="Search results";const h=this.search.trim().toLowerCase().split(/\s+/).filter(Boolean);r=this.items.filter(f=>Mn(f,h))}else{const h=this.section;a=((c=Y[h])==null?void 0:c.label)??"";const f=this.itemsForKind(h),g=Array.from(new Set(f.flatMap(y=>(y.tags??[]).map($=>$.name)))).slice(0,8),u=this.filters[h]??"All";o=["All",...g].map(y=>({label:y,active:u===y})),r=u==="All"?f:f.filter(y=>(y.tags??[]).some($=>$.name===u))}const n=`${r.length} ${r.length===1?"item":"items"}`;return s`
      <div>
        <div class="grid-head">
          <h2 class="grid-title">${a}</h2>
          <span class="grid-count">${n}</span>
        </div>

        ${t&&o.length>1?s`<div class="chips">
              ${o.map(h=>s`<button
                  class="chip"
                  @click=${()=>this.setFilter(this.section,h.label)}
                  style="background:${h.active?"var(--oppai-accent)":"transparent"}; color:${h.active?"var(--oppai-on-accent)":"var(--oppai-text-dim)"}; border:1px solid ${h.active?"var(--oppai-accent)":"var(--oppai-border-strong)"};"
                >
                  ${h.active?s`<span class="material-symbols-rounded" style="font-size:16px;">check</span>`:l}
                  ${h.label}
                </button>`)}
            </div>`:s`<div style="height:24px;"></div>`}

        ${r.length===0?s`<div class="empty">
              <span class="material-symbols-rounded" style="font-size:40px; display:block; margin-bottom:12px;"
                >${e?"favorite_border":"search_off"}</span
              >
              <div style="font-size:14px;">
                ${e?"No favorites yet. Tap the heart on any item.":"No items match your search or filter."}
              </div>
            </div>`:s`<div class="grid">
              ${r.map((h,f)=>this.renderTile(h,"100%",f,r))}
            </div>`}
      </div>
    `}renderTile(t,e,i,a){const r=Y[t.kind],o=this.favorites.has(t.id),n=lr(t),c=i!=null?"anim-rise":"",h=i!=null?`animation-delay:${Math.min(i,12)*45}ms;`:"",f=this.selected.has(t.id),g=`tile ${c} ${this.selectMode?"selecting":""} ${f?"selected":""}`;return s`
      <div
        class=${g}
        @click=${()=>this.selectMode?this.toggleSelected(t.id):this.openItem(t.id,a)}
        style="flex-shrink:0; width:${e}; ${h}"
      >
        <div
          class="tile-media"
          style="width:100%; aspect-ratio:${r.aspect}; background:${Re(t)};"
        >
          ${Qs(t)?s`<img loading="lazy" src=${v.thumbURL(t.id)} alt=${t.title} />`:s`<div class="tile-overlay">
                <span class="material-symbols-rounded" style="font-size:30px; color:#fff;"
                  >${r.icon}</span
                >
                <span class="type-label">${r.typeLabel}</span>
              </div>`}
          ${this.selectMode?s`<div class="select-check ${f?"on":""}">
                ${f?s`<span class="material-symbols-rounded">check</span>`:l}
              </div>`:s`<button
                class="fav-btn ${o?"is-fav":""}"
                @click=${u=>this.toggleFavorite(t.id,u)}
              >
                <span
                  class="material-symbols-rounded fill-icon"
                  style="font-size:18px; color:${o?"var(--oppai-fav)":"rgba(255,255,255,0.9)"};"
                  >${o?"favorite":"favorite_border"}</span
                >
              </button>`}
          ${n?s`<span class="tile-stat">${n}</span>`:l}
        </div>
        <div class="tile-meta">
          <div class="tile-title">${t.title}</div>
          <div class="tile-tag">${en(t)}</div>
        </div>
      </div>
    `}renderUpload(){return this.uploadOpen?s`
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
    `:l}};N.styles=[ke,ne,_`
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
    `];V([m({attribute:!1})],N.prototype,"user",2);V([d()],N.prototype,"items",2);V([d()],N.prototype,"loading",2);V([d()],N.prototype,"section",2);V([d()],N.prototype,"selectedId",2);V([d()],N.prototype,"search",2);V([d()],N.prototype,"filters",2);V([d()],N.prototype,"favorites",2);V([d()],N.prototype,"uploadOpen",2);V([d()],N.prototype,"dragActive",2);V([d()],N.prototype,"selectMode",2);V([d()],N.prototype,"selected",2);V([d()],N.prototype,"busy",2);V([d()],N.prototype,"downloads",2);N=V([I("oppai-library")],N);var Rn=Object.defineProperty,Fn=Object.getOwnPropertyDescriptor,Oe=(t,e,i,a)=>{for(var r=a>1?void 0:a?Fn(e,i):e,o=t.length-1,n;o>=0;o--)(n=t[o])&&(r=(a?n(e,i,r):n(r))||r);return a&&r&&Rn(e,i,r),r};const Nn=6e4;let he=class extends C{constructor(){super(...arguments),this.user=null,this.ready=!1,this.mascotMessage="",this.mascotTone="success",this.mascotEmotion="",this.mascotIntensity=0,this.onMascot=t=>{const e=t.detail;this.mascotMessage=e.message,this.mascotTone=e.tone,this.mascotEmotion=e.emotion??"",this.mascotIntensity=e.intensity??0,this.mascotTimer&&clearTimeout(this.mascotTimer),this.mascotTimer=window.setTimeout(()=>this.mascotMessage="",5e3)},this.onImported=t=>{var r;const e=Math.max(1,((r=t.detail)==null?void 0:r.count)??1),i=Rs(e>1?2:1),a=Z("import",{intensity:i,count:e});H(a.message,"success",{emotion:a.emotion,intensity:a.intensity})},this.onLibbyPref=()=>this.requestUpdate(),this.onLogout=()=>{this.user=null,this.stopProbe()},this.onVisible=()=>{document.visibilityState==="visible"&&this.user&&this.probe()}}connectedCallback(){super.connectedCallback(),window.addEventListener("oppai-logout",this.onLogout),window.addEventListener("oppai-mascot",this.onMascot),window.addEventListener("oppai-libby-pref",this.onLibbyPref),window.addEventListener("imported",this.onImported),document.addEventListener("visibilitychange",this.onVisible),this.bootstrap()}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("oppai-logout",this.onLogout),window.removeEventListener("oppai-mascot",this.onMascot),window.removeEventListener("oppai-libby-pref",this.onLibbyPref),window.removeEventListener("imported",this.onImported),document.removeEventListener("visibilitychange",this.onVisible),this.stopProbe(),this.mascotTimer&&clearTimeout(this.mascotTimer)}async bootstrap(){if($i())try{this.user=await v.me(),this.startProbe()}catch{Ct(null)}this.ready=!0}async probe(){if($i())try{await v.me()}catch{}}startProbe(){this.stopProbe(),this.probeTimer=window.setInterval(()=>void this.probe(),Nn)}stopProbe(){this.probeTimer&&(clearInterval(this.probeTimer),this.probeTimer=void 0)}onLoggedIn(t){this.mascotMessage="",this.user=t.detail,this.startProbe()}async logout(){try{await v.logout()}catch{}Ct(null),this.user=null,this.stopProbe()}render(){const t=Et(),e=this.mascotEmotion?{emotion:this.mascotEmotion,intensity:this.mascotIntensity||1}:Ya(this.mascotMessage),i=Bi(e.emotion,e.intensity),a=this.mascotMessage?s`<div class="mascot-talk ${this.mascotTone} ${t?"plain":""}">
          <div class="speech" role=${this.mascotTone==="error"?"alert":"status"}>
            ${t?null:s`<span class="libby-name">LIBBY</span>`}${this.mascotMessage}
          </div>
          ${t?null:s`<img src=${i[0]} data-fallback-index="0" alt=${`Libby feeling ${e.emotion}`}
              @error=${r=>Ui(r.target,i)} />`}
        </div>`:null;return this.ready?this.user?s`<oppai-library
      .user=${this.user}
      @logout=${this.logout}
    ></oppai-library>${a}`:s`<oppai-login @logged-in=${this.onLoggedIn}></oppai-login>`:s`<div class="center"><md-circular-progress indeterminate></md-circular-progress></div>${a}`}};he.styles=_`
    :host { display: block; min-height: 100vh; }
    .center { display: grid; place-items: center; height: 100vh; }
    .mascot-talk {
      position: fixed;
      right: 18px;
      top: 72px;
      z-index: 200;
      display: flex;
      align-items: flex-start;
      pointer-events: none;
      animation: pop-in 0.3s ease-out both;
    }
    .mascot-talk img {
      order: -1;
      width: 42px;
      height: 42px;
      border-radius: 50%;
      object-fit: cover;
      object-position: top center;
      background: var(--md-sys-color-surface-container-highest);
    }
    .speech {
      max-width: min(300px, 58vw);
      margin: 0 0 0 9px;
      padding: 9px 12px;
      border-radius: 4px 14px 14px 14px;
      background: var(--md-sys-color-surface-container-high);
      color: var(--md-sys-color-on-surface);
      border: 1px solid var(--md-sys-color-outline-variant);
      box-shadow: 0 8px 28px rgba(0,0,0,.35);
      font: 500 14px/1.4 Roboto, system-ui, sans-serif;
    }
    .mascot-talk.error .speech { border-color: var(--md-sys-color-error); }
    /* Libby hidden: the bubble alone, tucked to the corner without the mascot's footprint. */
    .mascot-talk.plain .speech { margin: 0; }
    .libby-name { display: block; color: var(--md-sys-color-primary); font-size: 11px; font-weight: 700; }
    @keyframes pop-in { from { opacity: 0; transform: translateY(24px) scale(.94); } }
    @media (max-width: 600px) {
      .mascot-talk { top: 64px; right: 10px; }
      .mascot-talk img { width: 36px; height: 36px; }
      .speech { max-width: 70vw; }
    }
  `;Oe([d()],he.prototype,"user",2);Oe([d()],he.prototype,"ready",2);Oe([d()],he.prototype,"mascotMessage",2);Oe([d()],he.prototype,"mascotTone",2);Oe([d()],he.prototype,"mascotEmotion",2);Oe([d()],he.prototype,"mascotIntensity",2);he=Oe([I("oppai-app")],he);const fr=document.createElement("style");fr.textContent=Ls;document.head.appendChild(fr);document.adoptedStyleSheets=[...document.adoptedStyleSheets,Es.styleSheet];Fi(Ri());Os();
