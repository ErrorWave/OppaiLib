(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function i(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(o){if(o.ep)return;o.ep=!0;const r=i(o);fetch(o.href,r)}})();function h(e,t,i,a){var o=arguments.length,r=o<3?t:a===null?a=Object.getOwnPropertyDescriptor(t,i):a,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(e,t,i,a);else for(var d=e.length-1;d>=0;d--)(n=e[d])&&(r=(o<3?n(r):o>3?n(t,i,r):n(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const I=e=>(t,i)=>{i!==void 0?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)};/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Tt=globalThis,Gi=Tt.ShadowRoot&&(Tt.ShadyCSS===void 0||Tt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Wi=Symbol(),ia=new WeakMap;let Oa=class{constructor(t,i,a){if(this._$cssResult$=!0,a!==Wi)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=i}get styleSheet(){let t=this.o;const i=this.t;if(Gi&&t===void 0){const a=i!==void 0&&i.length===1;a&&(t=ia.get(i)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),a&&ia.set(i,t))}return t}toString(){return this.cssText}};const Mo=e=>new Oa(typeof e=="string"?e:e+"",void 0,Wi),$=(e,...t)=>{const i=e.length===1?e[0]:t.reduce((a,o,r)=>a+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+e[r+1],e[0]);return new Oa(i,e,Wi)},Ro=(e,t)=>{if(Gi)e.adoptedStyleSheets=t.map(i=>i instanceof CSSStyleSheet?i:i.styleSheet);else for(const i of t){const a=document.createElement("style"),o=Tt.litNonce;o!==void 0&&a.setAttribute("nonce",o),a.textContent=i.cssText,e.appendChild(a)}},aa=Gi?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let i="";for(const a of t.cssRules)i+=a.cssText;return Mo(i)})(e):e;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Fo,defineProperty:No,getOwnPropertyDescriptor:Bo,getOwnPropertyNames:Uo,getOwnPropertySymbols:jo,getPrototypeOf:Ho}=Object,$e=globalThis,oa=$e.trustedTypes,Go=oa?oa.emptyScript:"",qt=$e.reactiveElementPolyfillSupport,Ke=(e,t)=>e,Et={toAttribute(e,t){switch(t){case Boolean:e=e?Go:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=e!==null;break;case Number:i=e===null?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch{i=null}}return i}},qi=(e,t)=>!Fo(e,t),ra={attribute:!0,type:String,converter:Et,reflect:!1,useDefault:!1,hasChanged:qi};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),$e.litPropertyMetadata??($e.litPropertyMetadata=new WeakMap);let Re=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,i=ra){if(i.state&&(i.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((i=Object.create(i)).wrapped=!0),this.elementProperties.set(t,i),!i.noAccessor){const a=Symbol(),o=this.getPropertyDescriptor(t,a,i);o!==void 0&&No(this.prototype,t,o)}}static getPropertyDescriptor(t,i,a){const{get:o,set:r}=Bo(this.prototype,t)??{get(){return this[i]},set(n){this[i]=n}};return{get:o,set(n){const d=o==null?void 0:o.call(this);r==null||r.call(this,n),this.requestUpdate(t,d,a)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??ra}static _$Ei(){if(this.hasOwnProperty(Ke("elementProperties")))return;const t=Ho(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(Ke("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Ke("properties"))){const i=this.properties,a=[...Uo(i),...jo(i)];for(const o of a)this.createProperty(o,i[o])}const t=this[Symbol.metadata];if(t!==null){const i=litPropertyMetadata.get(t);if(i!==void 0)for(const[a,o]of i)this.elementProperties.set(a,o)}this._$Eh=new Map;for(const[i,a]of this.elementProperties){const o=this._$Eu(i,a);o!==void 0&&this._$Eh.set(o,i)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const i=[];if(Array.isArray(t)){const a=new Set(t.flat(1/0).reverse());for(const o of a)i.unshift(aa(o))}else t!==void 0&&i.push(aa(t));return i}static _$Eu(t,i){const a=i.attribute;return a===!1?void 0:typeof a=="string"?a:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(i=>this.enableUpdating=i),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(i=>i(this))}addController(t){var i;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((i=t.hostConnected)==null||i.call(t))}removeController(t){var i;(i=this._$EO)==null||i.delete(t)}_$E_(){const t=new Map,i=this.constructor.elementProperties;for(const a of i.keys())this.hasOwnProperty(a)&&(t.set(a,this[a]),delete this[a]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ro(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(i=>{var a;return(a=i.hostConnected)==null?void 0:a.call(i)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(i=>{var a;return(a=i.hostDisconnected)==null?void 0:a.call(i)})}attributeChangedCallback(t,i,a){this._$AK(t,a)}_$ET(t,i){var r;const a=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,a);if(o!==void 0&&a.reflect===!0){const n=(((r=a.converter)==null?void 0:r.toAttribute)!==void 0?a.converter:Et).toAttribute(i,a.type);this._$Em=t,n==null?this.removeAttribute(o):this.setAttribute(o,n),this._$Em=null}}_$AK(t,i){var r,n;const a=this.constructor,o=a._$Eh.get(t);if(o!==void 0&&this._$Em!==o){const d=a.getPropertyOptions(o),p=typeof d.converter=="function"?{fromAttribute:d.converter}:((r=d.converter)==null?void 0:r.fromAttribute)!==void 0?d.converter:Et;this._$Em=o;const f=p.fromAttribute(i,d.type);this[o]=f??((n=this._$Ej)==null?void 0:n.get(o))??f,this._$Em=null}}requestUpdate(t,i,a,o=!1,r){var n;if(t!==void 0){const d=this.constructor;if(o===!1&&(r=this[t]),a??(a=d.getPropertyOptions(t)),!((a.hasChanged??qi)(r,i)||a.useDefault&&a.reflect&&r===((n=this._$Ej)==null?void 0:n.get(t))&&!this.hasAttribute(d._$Eu(t,a))))return;this.C(t,i,a)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,i,{useDefault:a,reflect:o,wrapped:r},n){a&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,n??i??this[t]),r!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||a||(i=void 0),this._$AL.set(t,i)),o===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(i){Promise.reject(i)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var a;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[r,n]of this._$Ep)this[r]=n;this._$Ep=void 0}const o=this.constructor.elementProperties;if(o.size>0)for(const[r,n]of o){const{wrapped:d}=n,p=this[r];d!==!0||this._$AL.has(r)||p===void 0||this.C(r,void 0,n,p)}}let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),(a=this._$EO)==null||a.forEach(o=>{var r;return(r=o.hostUpdate)==null?void 0:r.call(o)}),this.update(i)):this._$EM()}catch(o){throw t=!1,this._$EM(),o}t&&this._$AE(i)}willUpdate(t){}_$AE(t){var i;(i=this._$EO)==null||i.forEach(a=>{var o;return(o=a.hostUpdated)==null?void 0:o.call(a)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(i=>this._$ET(i,this[i]))),this._$EM()}updated(t){}firstUpdated(t){}};Re.elementStyles=[],Re.shadowRootOptions={mode:"open"},Re[Ke("elementProperties")]=new Map,Re[Ke("finalized")]=new Map,qt==null||qt({ReactiveElement:Re}),($e.reactiveElementVersions??($e.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Wo={attribute:!0,type:String,converter:Et,reflect:!1,hasChanged:qi},qo=(e=Wo,t,i)=>{const{kind:a,metadata:o}=i;let r=globalThis.litPropertyMetadata.get(o);if(r===void 0&&globalThis.litPropertyMetadata.set(o,r=new Map),a==="setter"&&((e=Object.create(e)).wrapped=!0),r.set(i.name,e),a==="accessor"){const{name:n}=i;return{set(d){const p=t.get.call(this);t.set.call(this,d),this.requestUpdate(n,p,e,!0,d)},init(d){return d!==void 0&&this.C(n,void 0,e,d),d}}}if(a==="setter"){const{name:n}=i;return function(d){const p=this[n];t.call(this,d),this.requestUpdate(n,p,e,!0,d)}}throw Error("Unsupported decorator location: "+a)};function v(e){return(t,i)=>typeof i=="object"?qo(e,t,i):((a,o,r)=>{const n=o.hasOwnProperty(r);return o.constructor.createProperty(r,a),n?Object.getOwnPropertyDescriptor(o,r):void 0})(e,t,i)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function c(e){return v({...e,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Bt=(e,t,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&typeof t!="object"&&Object.defineProperty(e,t,i),i);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function S(e,t){return(i,a,o)=>{const r=n=>{var d;return((d=n.renderRoot)==null?void 0:d.querySelector(e))??null};return Bt(i,a,{get(){return r(this)}})}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let Yo;function Ko(e){return(t,i)=>Bt(t,i,{get(){return(this.renderRoot??Yo??(Yo=document.createDocumentFragment())).querySelectorAll(e)}})}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function _e(e){return(t,i)=>{const{slot:a,selector:o}=e??{},r="slot"+(a?`[name=${a}]`:":not([name])");return Bt(t,i,{get(){var p;const n=(p=this.renderRoot)==null?void 0:p.querySelector(r),d=(n==null?void 0:n.assignedElements(e))??[];return o===void 0?d:d.filter(f=>f.matches(o))}})}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Vo(e){return(t,i)=>{const{slot:a}=e??{},o="slot"+(a?`[name=${a}]`:":not([name])");return Bt(t,i,{get(){var n;const r=(n=this.renderRoot)==null?void 0:n.querySelector(o);return(r==null?void 0:r.assignedNodes(e))??[]}})}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ve=globalThis,sa=e=>e,Lt=Ve.trustedTypes,na=Lt?Lt.createPolicy("lit-html",{createHTML:e=>e}):void 0,Ma="$lit$",we=`lit$${Math.random().toFixed(9).slice(2)}$`,Ra="?"+we,Jo=`<${Ra}>`,Le=document,Ze=()=>Le.createComment(""),Qe=e=>e===null||typeof e!="object"&&typeof e!="function",Yi=Array.isArray,Xo=e=>Yi(e)||typeof(e==null?void 0:e[Symbol.iterator])=="function",Yt=`[ 	
\f\r]`,Ge=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,la=/-->/g,da=/>/g,Te=RegExp(`>|${Yt}(?:([^\\s"'>=/]+)(${Yt}*=${Yt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ca=/'/g,pa=/"/g,Fa=/^(?:script|style|textarea|title)$/i,Zo=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),s=Zo(1),ie=Symbol.for("lit-noChange"),l=Symbol.for("lit-nothing"),ha=new WeakMap,ze=Le.createTreeWalker(Le,129);function Na(e,t){if(!Yi(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return na!==void 0?na.createHTML(t):t}const Qo=(e,t)=>{const i=e.length-1,a=[];let o,r=t===2?"<svg>":t===3?"<math>":"",n=Ge;for(let d=0;d<i;d++){const p=e[d];let f,g,m=-1,y=0;for(;y<p.length&&(n.lastIndex=y,g=n.exec(p),g!==null);)y=n.lastIndex,n===Ge?g[1]==="!--"?n=la:g[1]!==void 0?n=da:g[2]!==void 0?(Fa.test(g[2])&&(o=RegExp("</"+g[2],"g")),n=Te):g[3]!==void 0&&(n=Te):n===Te?g[0]===">"?(n=o??Ge,m=-1):g[1]===void 0?m=-2:(m=n.lastIndex-g[2].length,f=g[1],n=g[3]===void 0?Te:g[3]==='"'?pa:ca):n===pa||n===ca?n=Te:n===la||n===da?n=Ge:(n=Te,o=void 0);const C=n===Te&&e[d+1].startsWith("/>")?" ":"";r+=n===Ge?p+Jo:m>=0?(a.push(f),p.slice(0,m)+Ma+p.slice(m)+we+C):p+we+(m===-2?d:C)}return[Na(e,r+(e[i]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),a]};class et{constructor({strings:t,_$litType$:i},a){let o;this.parts=[];let r=0,n=0;const d=t.length-1,p=this.parts,[f,g]=Qo(t,i);if(this.el=et.createElement(f,a),ze.currentNode=this.el.content,i===2||i===3){const m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(o=ze.nextNode())!==null&&p.length<d;){if(o.nodeType===1){if(o.hasAttributes())for(const m of o.getAttributeNames())if(m.endsWith(Ma)){const y=g[n++],C=o.getAttribute(m).split(we),W=/([.?@])?(.*)/.exec(y);p.push({type:1,index:r,name:W[2],strings:C,ctor:W[1]==="."?tr:W[1]==="?"?ir:W[1]==="@"?ar:Ut}),o.removeAttribute(m)}else m.startsWith(we)&&(p.push({type:6,index:r}),o.removeAttribute(m));if(Fa.test(o.tagName)){const m=o.textContent.split(we),y=m.length-1;if(y>0){o.textContent=Lt?Lt.emptyScript:"";for(let C=0;C<y;C++)o.append(m[C],Ze()),ze.nextNode(),p.push({type:2,index:++r});o.append(m[y],Ze())}}}else if(o.nodeType===8)if(o.data===Ra)p.push({type:2,index:r});else{let m=-1;for(;(m=o.data.indexOf(we,m+1))!==-1;)p.push({type:7,index:r}),m+=we.length-1}r++}}static createElement(t,i){const a=Le.createElement("template");return a.innerHTML=t,a}}function Be(e,t,i=e,a){var n,d;if(t===ie)return t;let o=a!==void 0?(n=i._$Co)==null?void 0:n[a]:i._$Cl;const r=Qe(t)?void 0:t._$litDirective$;return(o==null?void 0:o.constructor)!==r&&((d=o==null?void 0:o._$AO)==null||d.call(o,!1),r===void 0?o=void 0:(o=new r(e),o._$AT(e,i,a)),a!==void 0?(i._$Co??(i._$Co=[]))[a]=o:i._$Cl=o),o!==void 0&&(t=Be(e,o._$AS(e,t.values),o,a)),t}class er{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:a}=this._$AD,o=((t==null?void 0:t.creationScope)??Le).importNode(i,!0);ze.currentNode=o;let r=ze.nextNode(),n=0,d=0,p=a[0];for(;p!==void 0;){if(n===p.index){let f;p.type===2?f=new st(r,r.nextSibling,this,t):p.type===1?f=new p.ctor(r,p.name,p.strings,this,t):p.type===6&&(f=new or(r,this,t)),this._$AV.push(f),p=a[++d]}n!==(p==null?void 0:p.index)&&(r=ze.nextNode(),n++)}return ze.currentNode=Le,o}p(t){let i=0;for(const a of this._$AV)a!==void 0&&(a.strings!==void 0?(a._$AI(t,a,i),i+=a.strings.length-2):a._$AI(t[i])),i++}}class st{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,i,a,o){this.type=2,this._$AH=l,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=a,this.options=o,this._$Cv=(o==null?void 0:o.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return i!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=Be(this,t,i),Qe(t)?t===l||t==null||t===""?(this._$AH!==l&&this._$AR(),this._$AH=l):t!==this._$AH&&t!==ie&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Xo(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==l&&Qe(this._$AH)?this._$AA.nextSibling.data=t:this.T(Le.createTextNode(t)),this._$AH=t}$(t){var r;const{values:i,_$litType$:a}=t,o=typeof a=="number"?this._$AC(t):(a.el===void 0&&(a.el=et.createElement(Na(a.h,a.h[0]),this.options)),a);if(((r=this._$AH)==null?void 0:r._$AD)===o)this._$AH.p(i);else{const n=new er(o,this),d=n.u(this.options);n.p(i),this.T(d),this._$AH=n}}_$AC(t){let i=ha.get(t.strings);return i===void 0&&ha.set(t.strings,i=new et(t)),i}k(t){Yi(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let a,o=0;for(const r of t)o===i.length?i.push(a=new st(this.O(Ze()),this.O(Ze()),this,this.options)):a=i[o],a._$AI(r),o++;o<i.length&&(this._$AR(a&&a._$AB.nextSibling,o),i.length=o)}_$AR(t=this._$AA.nextSibling,i){var a;for((a=this._$AP)==null?void 0:a.call(this,!1,!0,i);t!==this._$AB;){const o=sa(t).nextSibling;sa(t).remove(),t=o}}setConnected(t){var i;this._$AM===void 0&&(this._$Cv=t,(i=this._$AP)==null||i.call(this,t))}}class Ut{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,a,o,r){this.type=1,this._$AH=l,this._$AN=void 0,this.element=t,this.name=i,this._$AM=o,this.options=r,a.length>2||a[0]!==""||a[1]!==""?(this._$AH=Array(a.length-1).fill(new String),this.strings=a):this._$AH=l}_$AI(t,i=this,a,o){const r=this.strings;let n=!1;if(r===void 0)t=Be(this,t,i,0),n=!Qe(t)||t!==this._$AH&&t!==ie,n&&(this._$AH=t);else{const d=t;let p,f;for(t=r[0],p=0;p<r.length-1;p++)f=Be(this,d[a+p],i,p),f===ie&&(f=this._$AH[p]),n||(n=!Qe(f)||f!==this._$AH[p]),f===l?t=l:t!==l&&(t+=(f??"")+r[p+1]),this._$AH[p]=f}n&&!o&&this.j(t)}j(t){t===l?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tr extends Ut{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===l?void 0:t}}class ir extends Ut{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==l)}}class ar extends Ut{constructor(t,i,a,o,r){super(t,i,a,o,r),this.type=5}_$AI(t,i=this){if((t=Be(this,t,i,0)??l)===ie)return;const a=this._$AH,o=t===l&&a!==l||t.capture!==a.capture||t.once!==a.once||t.passive!==a.passive,r=t!==l&&(a===l||o);o&&this.element.removeEventListener(this.name,this,a),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var i;typeof this._$AH=="function"?this._$AH.call(((i=this.options)==null?void 0:i.host)??this.element,t):this._$AH.handleEvent(t)}}class or{constructor(t,i,a){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=a}get _$AU(){return this._$AM._$AU}_$AI(t){Be(this,t)}}const Kt=Ve.litHtmlPolyfillSupport;Kt==null||Kt(et,st),(Ve.litHtmlVersions??(Ve.litHtmlVersions=[])).push("3.3.3");const Ba=(e,t,i)=>{const a=(i==null?void 0:i.renderBefore)??t;let o=a._$litPart$;if(o===void 0){const r=(i==null?void 0:i.renderBefore)??null;a._$litPart$=o=new st(t.insertBefore(Ze(),r),r,void 0,i??{})}return o._$AI(e),o};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ae=globalThis;let _=class extends Re{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var i;const t=super.createRenderRoot();return(i=this.renderOptions).renderBefore??(i.renderBefore=t.firstChild),t}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Ba(i,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return ie}};var Da;_._$litElement$=!0,_.finalized=!0,(Da=Ae.litElementHydrateSupport)==null||Da.call(Ae,{LitElement:_});const Vt=Ae.litElementPolyfillSupport;Vt==null||Vt({LitElement:_});(Ae.litElementVersions??(Ae.litElementVersions=[])).push("4.2.2");/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class rr extends _{connectedCallback(){super.connectedCallback(),this.setAttribute("aria-hidden","true")}render(){return s`<span class="shadow"></span>`}}/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const sr=$`:host,.shadow,.shadow::before,.shadow::after{border-radius:inherit;inset:0;position:absolute;transition-duration:inherit;transition-property:inherit;transition-timing-function:inherit}:host{display:flex;pointer-events:none;transition-property:box-shadow,opacity}.shadow::before,.shadow::after{content:"";transition-property:box-shadow,opacity;--_level: var(--md-elevation-level, 0);--_shadow-color: var(--md-elevation-shadow-color, var(--md-sys-color-shadow, #000))}.shadow::before{box-shadow:0px calc(1px*(clamp(0,var(--_level),1) + clamp(0,var(--_level) - 3,1) + 2*clamp(0,var(--_level) - 4,1))) calc(1px*(2*clamp(0,var(--_level),1) + clamp(0,var(--_level) - 2,1) + clamp(0,var(--_level) - 4,1))) 0px var(--_shadow-color);opacity:.3}.shadow::after{box-shadow:0px calc(1px*(clamp(0,var(--_level),1) + clamp(0,var(--_level) - 1,1) + 2*clamp(0,var(--_level) - 2,3))) calc(1px*(3*clamp(0,var(--_level),2) + 2*clamp(0,var(--_level) - 2,3))) calc(1px*(clamp(0,var(--_level),4) + 2*clamp(0,var(--_level) - 4,1))) var(--_shadow-color);opacity:.15}
`;/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let di=class extends rr{};di.styles=[sr];di=h([I("md-elevation")],di);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Ua=Symbol("attachableController");let St;St=new MutationObserver(e=>{var t;for(const i of e)(t=i.target[Ua])==null||t.hostConnected()});class ja{get htmlFor(){return this.host.getAttribute("for")}set htmlFor(t){t===null?this.host.removeAttribute("for"):this.host.setAttribute("for",t)}get control(){return this.host.hasAttribute("for")?!this.htmlFor||!this.host.isConnected?null:this.host.getRootNode().querySelector(`#${this.htmlFor}`):this.currentControl||this.host.parentElement}set control(t){t?this.attach(t):this.detach()}constructor(t,i){this.host=t,this.onControlChange=i,this.currentControl=null,t.addController(this),t[Ua]=this,St==null||St.observe(t,{attributeFilter:["for"]})}attach(t){t!==this.currentControl&&(this.setCurrentControl(t),this.host.removeAttribute("for"))}detach(){this.setCurrentControl(null),this.host.setAttribute("for","")}hostConnected(){this.setCurrentControl(this.control)}hostDisconnected(){this.setCurrentControl(null)}setCurrentControl(t){this.onControlChange(this.currentControl,t),this.currentControl=t}}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const nr=["focusin","focusout","pointerdown"];class Ki extends _{constructor(){super(...arguments),this.visible=!1,this.inward=!1,this.attachableController=new ja(this,this.onControlChange.bind(this))}get htmlFor(){return this.attachableController.htmlFor}set htmlFor(t){this.attachableController.htmlFor=t}get control(){return this.attachableController.control}set control(t){this.attachableController.control=t}attach(t){this.attachableController.attach(t)}detach(){this.attachableController.detach()}connectedCallback(){super.connectedCallback(),this.setAttribute("aria-hidden","true")}handleEvent(t){var i;if(!t[ua]){switch(t.type){default:return;case"focusin":this.visible=((i=this.control)==null?void 0:i.matches(":focus-visible"))??!1;break;case"focusout":case"pointerdown":this.visible=!1;break}t[ua]=!0}}onControlChange(t,i){for(const a of nr)t==null||t.removeEventListener(a,this),i==null||i.addEventListener(a,this)}update(t){t.has("visible")&&this.dispatchEvent(new Event("visibility-changed")),super.update(t)}}h([v({type:Boolean,reflect:!0})],Ki.prototype,"visible",void 0);h([v({type:Boolean,reflect:!0})],Ki.prototype,"inward",void 0);const ua=Symbol("handledByFocusRing");/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const lr=$`:host{animation-delay:0s,calc(var(--md-focus-ring-duration, 600ms)*.25);animation-duration:calc(var(--md-focus-ring-duration, 600ms)*.25),calc(var(--md-focus-ring-duration, 600ms)*.75);animation-timing-function:cubic-bezier(0.2, 0, 0, 1);box-sizing:border-box;color:var(--md-focus-ring-color, var(--md-sys-color-secondary, #625b71));display:none;pointer-events:none;position:absolute}:host([visible]){display:flex}:host(:not([inward])){animation-name:outward-grow,outward-shrink;border-end-end-radius:calc(var(--md-focus-ring-shape-end-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));border-end-start-radius:calc(var(--md-focus-ring-shape-end-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));border-start-end-radius:calc(var(--md-focus-ring-shape-start-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));border-start-start-radius:calc(var(--md-focus-ring-shape-start-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));inset:calc(-1*var(--md-focus-ring-outward-offset, 2px));outline:var(--md-focus-ring-width, 3px) solid currentColor}:host([inward]){animation-name:inward-grow,inward-shrink;border-end-end-radius:calc(var(--md-focus-ring-shape-end-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border-end-start-radius:calc(var(--md-focus-ring-shape-end-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border-start-end-radius:calc(var(--md-focus-ring-shape-start-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border-start-start-radius:calc(var(--md-focus-ring-shape-start-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border:var(--md-focus-ring-width, 3px) solid currentColor;inset:var(--md-focus-ring-inward-offset, 0px)}@keyframes outward-grow{from{outline-width:0}to{outline-width:var(--md-focus-ring-active-width, 8px)}}@keyframes outward-shrink{from{outline-width:var(--md-focus-ring-active-width, 8px)}}@keyframes inward-grow{from{border-width:0}to{border-width:var(--md-focus-ring-active-width, 8px)}}@keyframes inward-shrink{from{border-width:var(--md-focus-ring-active-width, 8px)}}@media(prefers-reduced-motion){:host{animation:none}}
`;/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let ci=class extends Ki{};ci.styles=[lr];ci=h([I("md-focus-ring")],ci);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const xe={ATTRIBUTE:1,PROPERTY:3,BOOLEAN_ATTRIBUTE:4},jt=e=>(...t)=>({_$litDirective$:e,values:t});let Ht=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,i,a){this._$Ct=t,this._$AM=i,this._$Ci=a}_$AS(t,i){return this.update(t,i)}update(t,i){return this.render(...i)}};/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ae=jt(class extends Ht{constructor(e){var t;if(super(e),e.type!==xe.ATTRIBUTE||e.name!=="class"||((t=e.strings)==null?void 0:t.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter(t=>e[t]).join(" ")+" "}update(e,[t]){var a,o;if(this.st===void 0){this.st=new Set,e.strings!==void 0&&(this.nt=new Set(e.strings.join(" ").split(/\s/).filter(r=>r!=="")));for(const r in t)t[r]&&!((a=this.nt)!=null&&a.has(r))&&this.st.add(r);return this.render(t)}const i=e.element.classList;for(const r of this.st)r in t||(i.remove(r),this.st.delete(r));for(const r in t){const n=!!t[r];n===this.st.has(r)||(o=this.nt)!=null&&o.has(r)||(n?(i.add(r),this.st.add(r)):(i.remove(r),this.st.delete(r)))}return ie}});/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Pe={STANDARD:"cubic-bezier(0.2, 0, 0, 1)",EMPHASIZED:"cubic-bezier(.3,0,0,1)",EMPHASIZED_ACCELERATE:"cubic-bezier(.3,0,.8,.15)"};/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const dr=450,ma=225,cr=.2,pr=10,hr=75,ur=.35,mr="::after",vr="forwards";var K;(function(e){e[e.INACTIVE=0]="INACTIVE",e[e.TOUCH_DELAY=1]="TOUCH_DELAY",e[e.HOLDING=2]="HOLDING",e[e.WAITING_FOR_CLICK=3]="WAITING_FOR_CLICK"})(K||(K={}));const fr=["click","contextmenu","pointercancel","pointerdown","pointerenter","pointerleave","pointerup"],gr=150,Jt=window.matchMedia("(forced-colors: active)");class nt extends _{constructor(){super(...arguments),this.disabled=!1,this.hovered=!1,this.pressed=!1,this.rippleSize="",this.rippleScale="",this.initialSize=0,this.state=K.INACTIVE,this.attachableController=new ja(this,this.onControlChange.bind(this))}get htmlFor(){return this.attachableController.htmlFor}set htmlFor(t){this.attachableController.htmlFor=t}get control(){return this.attachableController.control}set control(t){this.attachableController.control=t}attach(t){this.attachableController.attach(t)}detach(){this.attachableController.detach()}connectedCallback(){super.connectedCallback(),this.setAttribute("aria-hidden","true")}render(){const t={hovered:this.hovered,pressed:this.pressed};return s`<div class="surface ${ae(t)}"></div>`}update(t){t.has("disabled")&&this.disabled&&(this.hovered=!1,this.pressed=!1),super.update(t)}handlePointerenter(t){this.shouldReactToEvent(t)&&(this.hovered=!0)}handlePointerleave(t){this.shouldReactToEvent(t)&&(this.hovered=!1,this.state!==K.INACTIVE&&this.endPressAnimation())}handlePointerup(t){if(this.shouldReactToEvent(t)){if(this.state===K.HOLDING){this.state=K.WAITING_FOR_CLICK;return}if(this.state===K.TOUCH_DELAY){this.state=K.WAITING_FOR_CLICK,this.startPressAnimation(this.rippleStartEvent);return}}}async handlePointerdown(t){if(this.shouldReactToEvent(t)){if(this.rippleStartEvent=t,!this.isTouch(t)){this.state=K.WAITING_FOR_CLICK,this.startPressAnimation(t);return}this.state=K.TOUCH_DELAY,await new Promise(i=>{setTimeout(i,gr)}),this.state===K.TOUCH_DELAY&&(this.state=K.HOLDING,this.startPressAnimation(t))}}handleClick(){if(!this.disabled){if(this.state===K.WAITING_FOR_CLICK){this.endPressAnimation();return}this.state===K.INACTIVE&&(this.startPressAnimation(),this.endPressAnimation())}}handlePointercancel(t){this.shouldReactToEvent(t)&&this.endPressAnimation()}handleContextmenu(){this.disabled||this.endPressAnimation()}determineRippleSize(){const{height:t,width:i}=this.getBoundingClientRect(),a=Math.max(t,i),o=Math.max(ur*a,hr),r=this.currentCSSZoom??1,n=Math.floor(a*cr/r),p=Math.sqrt(i**2+t**2)+pr;this.initialSize=n;const f=(p+o)/n;this.rippleScale=`${f/r}`,this.rippleSize=`${n}px`}getNormalizedPointerEventCoords(t){const{scrollX:i,scrollY:a}=window,{left:o,top:r}=this.getBoundingClientRect(),n=i+o,d=a+r,{pageX:p,pageY:f}=t,g=this.currentCSSZoom??1;return{x:(p-n)/g,y:(f-d)/g}}getTranslationCoordinates(t){const{height:i,width:a}=this.getBoundingClientRect(),o=this.currentCSSZoom??1,r={x:(a/o-this.initialSize)/2,y:(i/o-this.initialSize)/2};let n;return t instanceof PointerEvent?n=this.getNormalizedPointerEventCoords(t):n={x:a/o/2,y:i/o/2},n={x:n.x-this.initialSize/2,y:n.y-this.initialSize/2},{startPoint:n,endPoint:r}}startPressAnimation(t){var n;if(!this.mdRoot)return;this.pressed=!0,(n=this.growAnimation)==null||n.cancel(),this.determineRippleSize();const{startPoint:i,endPoint:a}=this.getTranslationCoordinates(t),o=`${i.x}px, ${i.y}px`,r=`${a.x}px, ${a.y}px`;this.growAnimation=this.mdRoot.animate({top:[0,0],left:[0,0],height:[this.rippleSize,this.rippleSize],width:[this.rippleSize,this.rippleSize],transform:[`translate(${o}) scale(1)`,`translate(${r}) scale(${this.rippleScale})`]},{pseudoElement:mr,duration:dr,easing:Pe.STANDARD,fill:vr})}async endPressAnimation(){this.rippleStartEvent=void 0,this.state=K.INACTIVE;const t=this.growAnimation;let i=1/0;if(typeof(t==null?void 0:t.currentTime)=="number"?i=t.currentTime:t!=null&&t.currentTime&&(i=t.currentTime.to("ms").value),i>=ma){this.pressed=!1;return}await new Promise(a=>{setTimeout(a,ma-i)}),this.growAnimation===t&&(this.pressed=!1)}shouldReactToEvent(t){if(this.disabled||!t.isPrimary||this.rippleStartEvent&&this.rippleStartEvent.pointerId!==t.pointerId)return!1;if(t.type==="pointerenter"||t.type==="pointerleave")return!this.isTouch(t);const i=t.buttons===1;return this.isTouch(t)||i}isTouch({pointerType:t}){return t==="touch"}async handleEvent(t){if(!(Jt!=null&&Jt.matches))switch(t.type){case"click":this.handleClick();break;case"contextmenu":this.handleContextmenu();break;case"pointercancel":this.handlePointercancel(t);break;case"pointerdown":await this.handlePointerdown(t);break;case"pointerenter":this.handlePointerenter(t);break;case"pointerleave":this.handlePointerleave(t);break;case"pointerup":this.handlePointerup(t);break}}onControlChange(t,i){for(const a of fr)t==null||t.removeEventListener(a,this),i==null||i.addEventListener(a,this)}}h([v({type:Boolean,reflect:!0})],nt.prototype,"disabled",void 0);h([c()],nt.prototype,"hovered",void 0);h([c()],nt.prototype,"pressed",void 0);h([S(".surface")],nt.prototype,"mdRoot",void 0);/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const br=$`:host{display:flex;margin:auto;pointer-events:none}:host([disabled]){display:none}@media(forced-colors: active){:host{display:none}}:host,.surface{border-radius:inherit;position:absolute;inset:0;overflow:hidden}.surface{-webkit-tap-highlight-color:rgba(0,0,0,0)}.surface::before,.surface::after{content:"";opacity:0;position:absolute}.surface::before{background-color:var(--md-ripple-hover-color, var(--md-sys-color-on-surface, #1d1b20));inset:0;transition:opacity 15ms linear,background-color 15ms linear}.surface::after{background:radial-gradient(closest-side, var(--md-ripple-pressed-color, var(--md-sys-color-on-surface, #1d1b20)) max(100% - 70px, 65%), transparent 100%);transform-origin:center center;transition:opacity 375ms linear}.hovered::before{background-color:var(--md-ripple-hover-color, var(--md-sys-color-on-surface, #1d1b20));opacity:var(--md-ripple-hover-opacity, 0.08)}.pressed::after{opacity:var(--md-ripple-pressed-opacity, 0.12);transition-duration:105ms}
`;/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let pi=class extends nt{};pi.styles=[br];pi=h([I("md-ripple")],pi);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Ha=["role","ariaAtomic","ariaAutoComplete","ariaBusy","ariaChecked","ariaColCount","ariaColIndex","ariaColSpan","ariaCurrent","ariaDisabled","ariaExpanded","ariaHasPopup","ariaHidden","ariaInvalid","ariaKeyShortcuts","ariaLabel","ariaLevel","ariaLive","ariaModal","ariaMultiLine","ariaMultiSelectable","ariaOrientation","ariaPlaceholder","ariaPosInSet","ariaPressed","ariaReadOnly","ariaRequired","ariaRoleDescription","ariaRowCount","ariaRowIndex","ariaRowSpan","ariaSelected","ariaSetSize","ariaSort","ariaValueMax","ariaValueMin","ariaValueNow","ariaValueText"],yr=Ha.map(Ga);function Xt(e){return yr.includes(e)}function Ga(e){return e.replace("aria","aria-").replace(/Elements?/g,"").toLowerCase()}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const pt=Symbol("privateIgnoreAttributeChangesFor");function ke(e){var t;class i extends e{constructor(){super(...arguments),this[t]=new Set}attributeChangedCallback(o,r,n){if(!Xt(o)){super.attributeChangedCallback(o,r,n);return}if(this[pt].has(o))return;this[pt].add(o),this.removeAttribute(o),this[pt].delete(o);const d=ui(o);n===null?delete this.dataset[d]:this.dataset[d]=n,this.requestUpdate(ui(o),r)}getAttribute(o){return Xt(o)?super.getAttribute(hi(o)):super.getAttribute(o)}removeAttribute(o){super.removeAttribute(o),Xt(o)&&(super.removeAttribute(hi(o)),this.requestUpdate())}}return t=pt,xr(i),i}function xr(e){for(const t of Ha){const i=Ga(t),a=hi(i),o=ui(i);e.createProperty(t,{attribute:i,noAccessor:!0}),e.createProperty(Symbol(a),{attribute:a,noAccessor:!0}),Object.defineProperty(e.prototype,t,{configurable:!0,enumerable:!0,get(){return this.dataset[o]??null},set(r){const n=this.dataset[o]??null;r!==n&&(r===null?delete this.dataset[o]:this.dataset[o]=r,this.requestUpdate(t,n))}})}}function hi(e){return`data-${e}`}function ui(e){return e.replace(/-\w/,t=>t[1].toUpperCase())}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const V=Symbol("internals"),Zt=Symbol("privateInternals");function Vi(e){class t extends e{get[V](){return this[Zt]||(this[Zt]=this.attachInternals()),this[Zt]}}return t}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function Wa(e){e.addInitializer(t=>{const i=t;i.addEventListener("click",async a=>{const{type:o,[V]:r}=i,{form:n}=r;if(!(!n||o==="button")&&(await new Promise(d=>{setTimeout(d)}),!a.defaultPrevented)){if(o==="reset"){n.reset();return}n.addEventListener("submit",d=>{Object.defineProperty(d,"submitter",{configurable:!0,enumerable:!0,get:()=>i})},{capture:!0,once:!0}),r.setFormValue(i.value),n.requestSubmit()}})})}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function wr(e){const t=new MouseEvent("click",{bubbles:!0});return e.dispatchEvent(t),t}function $r(e){return e.currentTarget!==e.target||e.composedPath()[0]!==e.target||e.target.disabled?!1:!_r(e)}function _r(e){const t=mi;return t&&(e.preventDefault(),e.stopImmediatePropagation()),kr(),t}let mi=!1;async function kr(){mi=!0,await null,mi=!1}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Cr=ke(Vi(_));class G extends Cr{get name(){return this.getAttribute("name")??""}set name(t){this.setAttribute("name",t)}get form(){return this[V].form}constructor(){super(),this.disabled=!1,this.softDisabled=!1,this.href="",this.download="",this.target="",this.trailingIcon=!1,this.hasIcon=!1,this.type="submit",this.value="",this.addEventListener("click",this.handleClick.bind(this))}focus(){var t;(t=this.buttonElement)==null||t.focus()}blur(){var t;(t=this.buttonElement)==null||t.blur()}render(){var o;const t=this.disabled||this.softDisabled,i=this.href?this.renderLink():this.renderButton(),a=this.href?"link":"button";return s`
      ${(o=this.renderElevationOrOutline)==null?void 0:o.call(this)}
      <div class="background"></div>
      <md-focus-ring part="focus-ring" for=${a}></md-focus-ring>
      <md-ripple
        part="ripple"
        for=${a}
        ?disabled="${t}"></md-ripple>
      ${i}
    `}renderButton(){const{ariaLabel:t,ariaHasPopup:i,ariaExpanded:a}=this;return s`<button
      id="button"
      class="button"
      ?disabled=${this.disabled}
      aria-disabled=${this.softDisabled||l}
      aria-label="${t||l}"
      aria-haspopup="${i||l}"
      aria-expanded="${a||l}">
      ${this.renderContent()}
    </button>`}renderLink(){const{ariaLabel:t,ariaHasPopup:i,ariaExpanded:a}=this;return s`<a
      id="link"
      class="button"
      aria-label="${t||l}"
      aria-haspopup="${i||l}"
      aria-expanded="${a||l}"
      aria-disabled=${this.disabled||this.softDisabled||l}
      tabindex="${this.disabled&&!this.softDisabled?-1:l}"
      href=${this.href}
      download=${this.download||l}
      target=${this.target||l}
      >${this.renderContent()}
    </a>`}renderContent(){const t=s`<slot
      name="icon"
      @slotchange="${this.handleSlotChange}"></slot>`;return s`
      <span class="touch"></span>
      ${this.trailingIcon?l:t}
      <span class="label"><slot></slot></span>
      ${this.trailingIcon?t:l}
    `}handleClick(t){if(this.softDisabled||this.disabled&&this.href){t.stopImmediatePropagation(),t.preventDefault();return}!$r(t)||!this.buttonElement||(this.focus(),wr(this.buttonElement))}handleSlotChange(){this.hasIcon=this.assignedIcons.length>0}}Wa(G);G.formAssociated=!0;G.shadowRootOptions={mode:"open",delegatesFocus:!0};h([v({type:Boolean,reflect:!0})],G.prototype,"disabled",void 0);h([v({type:Boolean,attribute:"soft-disabled",reflect:!0})],G.prototype,"softDisabled",void 0);h([v()],G.prototype,"href",void 0);h([v()],G.prototype,"download",void 0);h([v()],G.prototype,"target",void 0);h([v({type:Boolean,attribute:"trailing-icon",reflect:!0})],G.prototype,"trailingIcon",void 0);h([v({type:Boolean,attribute:"has-icon",reflect:!0})],G.prototype,"hasIcon",void 0);h([v()],G.prototype,"type",void 0);h([v({reflect:!0})],G.prototype,"value",void 0);h([S(".button")],G.prototype,"buttonElement",void 0);h([_e({slot:"icon",flatten:!0})],G.prototype,"assignedIcons",void 0);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Ir extends G{renderElevationOrOutline(){return s`<md-elevation part="elevation"></md-elevation>`}}/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Tr=$`:host{--_container-color: var(--md-filled-button-container-color, var(--md-sys-color-primary, #6750a4));--_container-elevation: var(--md-filled-button-container-elevation, 0);--_container-height: var(--md-filled-button-container-height, 40px);--_container-shadow-color: var(--md-filled-button-container-shadow-color, var(--md-sys-color-shadow, #000));--_disabled-container-color: var(--md-filled-button-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-container-elevation: var(--md-filled-button-disabled-container-elevation, 0);--_disabled-container-opacity: var(--md-filled-button-disabled-container-opacity, 0.12);--_disabled-label-text-color: var(--md-filled-button-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-filled-button-disabled-label-text-opacity, 0.38);--_focus-container-elevation: var(--md-filled-button-focus-container-elevation, 0);--_focus-label-text-color: var(--md-filled-button-focus-label-text-color, var(--md-sys-color-on-primary, #fff));--_hover-container-elevation: var(--md-filled-button-hover-container-elevation, 1);--_hover-label-text-color: var(--md-filled-button-hover-label-text-color, var(--md-sys-color-on-primary, #fff));--_hover-state-layer-color: var(--md-filled-button-hover-state-layer-color, var(--md-sys-color-on-primary, #fff));--_hover-state-layer-opacity: var(--md-filled-button-hover-state-layer-opacity, 0.08);--_label-text-color: var(--md-filled-button-label-text-color, var(--md-sys-color-on-primary, #fff));--_label-text-font: var(--md-filled-button-label-text-font, var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-filled-button-label-text-line-height, var(--md-sys-typescale-label-large-line-height, 1.25rem));--_label-text-size: var(--md-filled-button-label-text-size, var(--md-sys-typescale-label-large-size, 0.875rem));--_label-text-weight: var(--md-filled-button-label-text-weight, var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)));--_pressed-container-elevation: var(--md-filled-button-pressed-container-elevation, 0);--_pressed-label-text-color: var(--md-filled-button-pressed-label-text-color, var(--md-sys-color-on-primary, #fff));--_pressed-state-layer-color: var(--md-filled-button-pressed-state-layer-color, var(--md-sys-color-on-primary, #fff));--_pressed-state-layer-opacity: var(--md-filled-button-pressed-state-layer-opacity, 0.12);--_disabled-icon-color: var(--md-filled-button-disabled-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-icon-opacity: var(--md-filled-button-disabled-icon-opacity, 0.38);--_focus-icon-color: var(--md-filled-button-focus-icon-color, var(--md-sys-color-on-primary, #fff));--_hover-icon-color: var(--md-filled-button-hover-icon-color, var(--md-sys-color-on-primary, #fff));--_icon-color: var(--md-filled-button-icon-color, var(--md-sys-color-on-primary, #fff));--_icon-size: var(--md-filled-button-icon-size, 18px);--_pressed-icon-color: var(--md-filled-button-pressed-icon-color, var(--md-sys-color-on-primary, #fff));--_container-shape-start-start: var(--md-filled-button-container-shape-start-start, var(--md-filled-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-start-end: var(--md-filled-button-container-shape-start-end, var(--md-filled-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-end: var(--md-filled-button-container-shape-end-end, var(--md-filled-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-start: var(--md-filled-button-container-shape-end-start, var(--md-filled-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_leading-space: var(--md-filled-button-leading-space, 24px);--_trailing-space: var(--md-filled-button-trailing-space, 24px);--_with-leading-icon-leading-space: var(--md-filled-button-with-leading-icon-leading-space, 16px);--_with-leading-icon-trailing-space: var(--md-filled-button-with-leading-icon-trailing-space, 24px);--_with-trailing-icon-leading-space: var(--md-filled-button-with-trailing-icon-leading-space, 24px);--_with-trailing-icon-trailing-space: var(--md-filled-button-with-trailing-icon-trailing-space, 16px)}
`;/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Sr=$`md-elevation{transition-duration:280ms}:host(:is([disabled],[soft-disabled])) md-elevation{transition:none}md-elevation{--md-elevation-level: var(--_container-elevation);--md-elevation-shadow-color: var(--_container-shadow-color)}:host(:focus-within) md-elevation{--md-elevation-level: var(--_focus-container-elevation)}:host(:hover) md-elevation{--md-elevation-level: var(--_hover-container-elevation)}:host(:active) md-elevation{--md-elevation-level: var(--_pressed-container-elevation)}:host(:is([disabled],[soft-disabled])) md-elevation{--md-elevation-level: var(--_disabled-container-elevation)}
`;/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Ji=$`:host{border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end);box-sizing:border-box;cursor:pointer;display:inline-flex;gap:8px;min-height:var(--_container-height);outline:none;padding-block:calc((var(--_container-height) - max(var(--_label-text-line-height),var(--_icon-size)))/2);padding-inline-start:var(--_leading-space);padding-inline-end:var(--_trailing-space);place-content:center;place-items:center;position:relative;font-family:var(--_label-text-font);font-size:var(--_label-text-size);line-height:var(--_label-text-line-height);font-weight:var(--_label-text-weight);text-overflow:ellipsis;text-wrap:nowrap;user-select:none;-webkit-tap-highlight-color:rgba(0,0,0,0);vertical-align:top;--md-ripple-hover-color: var(--_hover-state-layer-color);--md-ripple-pressed-color: var(--_pressed-state-layer-color);--md-ripple-hover-opacity: var(--_hover-state-layer-opacity);--md-ripple-pressed-opacity: var(--_pressed-state-layer-opacity)}md-focus-ring{--md-focus-ring-shape-start-start: var(--_container-shape-start-start);--md-focus-ring-shape-start-end: var(--_container-shape-start-end);--md-focus-ring-shape-end-end: var(--_container-shape-end-end);--md-focus-ring-shape-end-start: var(--_container-shape-end-start)}:host(:is([disabled],[soft-disabled])){cursor:default;pointer-events:none}.button{border-radius:inherit;cursor:inherit;display:inline-flex;align-items:center;justify-content:center;border:none;outline:none;-webkit-appearance:none;vertical-align:middle;background:rgba(0,0,0,0);text-decoration:none;min-width:calc(64px - var(--_leading-space) - var(--_trailing-space));width:100%;z-index:0;height:100%;font:inherit;color:var(--_label-text-color);padding:0;gap:inherit;text-transform:inherit}.button::-moz-focus-inner{padding:0;border:0}:host(:hover) .button{color:var(--_hover-label-text-color)}:host(:focus-within) .button{color:var(--_focus-label-text-color)}:host(:active) .button{color:var(--_pressed-label-text-color)}.background{background:var(--_container-color);border-radius:inherit;inset:0;position:absolute}.label{overflow:hidden}:is(.button,.label,.label slot),.label ::slotted(*){text-overflow:inherit}:host(:is([disabled],[soft-disabled])) .label{color:var(--_disabled-label-text-color);opacity:var(--_disabled-label-text-opacity)}:host(:is([disabled],[soft-disabled])) .background{background:var(--_disabled-container-color);opacity:var(--_disabled-container-opacity)}@media(forced-colors: active){.background{border:1px solid CanvasText}:host(:is([disabled],[soft-disabled])){--_disabled-icon-color: GrayText;--_disabled-icon-opacity: 1;--_disabled-container-opacity: 1;--_disabled-label-text-color: GrayText;--_disabled-label-text-opacity: 1}}:host([has-icon]:not([trailing-icon])){padding-inline-start:var(--_with-leading-icon-leading-space);padding-inline-end:var(--_with-leading-icon-trailing-space)}:host([has-icon][trailing-icon]){padding-inline-start:var(--_with-trailing-icon-leading-space);padding-inline-end:var(--_with-trailing-icon-trailing-space)}::slotted([slot=icon]){display:inline-flex;position:relative;writing-mode:horizontal-tb;fill:currentColor;flex-shrink:0;color:var(--_icon-color);font-size:var(--_icon-size);inline-size:var(--_icon-size);block-size:var(--_icon-size)}:host(:hover) ::slotted([slot=icon]){color:var(--_hover-icon-color)}:host(:focus-within) ::slotted([slot=icon]){color:var(--_focus-icon-color)}:host(:active) ::slotted([slot=icon]){color:var(--_pressed-icon-color)}:host(:is([disabled],[soft-disabled])) ::slotted([slot=icon]){color:var(--_disabled-icon-color);opacity:var(--_disabled-icon-opacity)}.touch{position:absolute;top:50%;height:48px;left:0;right:0;transform:translateY(-50%)}:host([touch-target=wrapper]){margin:max(0px,(48px - var(--_container-height))/2) 0}:host([touch-target=none]) .touch{display:none}
`;/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let vi=class extends Ir{};vi.styles=[Ji,Sr,Tr];vi=h([I("md-filled-button")],vi);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class zr extends G{}/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Ar=$`:host{--_container-height: var(--md-text-button-container-height, 40px);--_disabled-label-text-color: var(--md-text-button-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-text-button-disabled-label-text-opacity, 0.38);--_focus-label-text-color: var(--md-text-button-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_hover-label-text-color: var(--md-text-button-hover-label-text-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-color: var(--md-text-button-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-opacity: var(--md-text-button-hover-state-layer-opacity, 0.08);--_label-text-color: var(--md-text-button-label-text-color, var(--md-sys-color-primary, #6750a4));--_label-text-font: var(--md-text-button-label-text-font, var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-text-button-label-text-line-height, var(--md-sys-typescale-label-large-line-height, 1.25rem));--_label-text-size: var(--md-text-button-label-text-size, var(--md-sys-typescale-label-large-size, 0.875rem));--_label-text-weight: var(--md-text-button-label-text-weight, var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)));--_pressed-label-text-color: var(--md-text-button-pressed-label-text-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-color: var(--md-text-button-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-opacity: var(--md-text-button-pressed-state-layer-opacity, 0.12);--_disabled-icon-color: var(--md-text-button-disabled-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-icon-opacity: var(--md-text-button-disabled-icon-opacity, 0.38);--_focus-icon-color: var(--md-text-button-focus-icon-color, var(--md-sys-color-primary, #6750a4));--_hover-icon-color: var(--md-text-button-hover-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-color: var(--md-text-button-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-size: var(--md-text-button-icon-size, 18px);--_pressed-icon-color: var(--md-text-button-pressed-icon-color, var(--md-sys-color-primary, #6750a4));--_container-shape-start-start: var(--md-text-button-container-shape-start-start, var(--md-text-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-start-end: var(--md-text-button-container-shape-start-end, var(--md-text-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-end: var(--md-text-button-container-shape-end-end, var(--md-text-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-start: var(--md-text-button-container-shape-end-start, var(--md-text-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_leading-space: var(--md-text-button-leading-space, 12px);--_trailing-space: var(--md-text-button-trailing-space, 12px);--_with-leading-icon-leading-space: var(--md-text-button-with-leading-icon-leading-space, 12px);--_with-leading-icon-trailing-space: var(--md-text-button-with-leading-icon-trailing-space, 16px);--_with-trailing-icon-leading-space: var(--md-text-button-with-trailing-icon-leading-space, 16px);--_with-trailing-icon-trailing-space: var(--md-text-button-with-trailing-icon-trailing-space, 12px);--_container-color: none;--_disabled-container-color: none;--_disabled-container-opacity: 0}
`;/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let fi=class extends zr{};fi.styles=[Ji,Ar];fi=h([I("md-text-button")],fi);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Er extends G{renderElevationOrOutline(){return s`<div class="outline"></div>`}}/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Lr=$`:host{--_container-height: var(--md-outlined-button-container-height, 40px);--_disabled-label-text-color: var(--md-outlined-button-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-outlined-button-disabled-label-text-opacity, 0.38);--_disabled-outline-color: var(--md-outlined-button-disabled-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-outline-opacity: var(--md-outlined-button-disabled-outline-opacity, 0.12);--_focus-label-text-color: var(--md-outlined-button-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_hover-label-text-color: var(--md-outlined-button-hover-label-text-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-color: var(--md-outlined-button-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-opacity: var(--md-outlined-button-hover-state-layer-opacity, 0.08);--_label-text-color: var(--md-outlined-button-label-text-color, var(--md-sys-color-primary, #6750a4));--_label-text-font: var(--md-outlined-button-label-text-font, var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-outlined-button-label-text-line-height, var(--md-sys-typescale-label-large-line-height, 1.25rem));--_label-text-size: var(--md-outlined-button-label-text-size, var(--md-sys-typescale-label-large-size, 0.875rem));--_label-text-weight: var(--md-outlined-button-label-text-weight, var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)));--_outline-color: var(--md-outlined-button-outline-color, var(--md-sys-color-outline, #79747e));--_outline-width: var(--md-outlined-button-outline-width, 1px);--_pressed-label-text-color: var(--md-outlined-button-pressed-label-text-color, var(--md-sys-color-primary, #6750a4));--_pressed-outline-color: var(--md-outlined-button-pressed-outline-color, var(--md-sys-color-outline, #79747e));--_pressed-state-layer-color: var(--md-outlined-button-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-opacity: var(--md-outlined-button-pressed-state-layer-opacity, 0.12);--_disabled-icon-color: var(--md-outlined-button-disabled-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-icon-opacity: var(--md-outlined-button-disabled-icon-opacity, 0.38);--_focus-icon-color: var(--md-outlined-button-focus-icon-color, var(--md-sys-color-primary, #6750a4));--_hover-icon-color: var(--md-outlined-button-hover-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-color: var(--md-outlined-button-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-size: var(--md-outlined-button-icon-size, 18px);--_pressed-icon-color: var(--md-outlined-button-pressed-icon-color, var(--md-sys-color-primary, #6750a4));--_container-shape-start-start: var(--md-outlined-button-container-shape-start-start, var(--md-outlined-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-start-end: var(--md-outlined-button-container-shape-start-end, var(--md-outlined-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-end: var(--md-outlined-button-container-shape-end-end, var(--md-outlined-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-start: var(--md-outlined-button-container-shape-end-start, var(--md-outlined-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_leading-space: var(--md-outlined-button-leading-space, 24px);--_trailing-space: var(--md-outlined-button-trailing-space, 24px);--_with-leading-icon-leading-space: var(--md-outlined-button-with-leading-icon-leading-space, 16px);--_with-leading-icon-trailing-space: var(--md-outlined-button-with-leading-icon-trailing-space, 24px);--_with-trailing-icon-leading-space: var(--md-outlined-button-with-trailing-icon-leading-space, 24px);--_with-trailing-icon-trailing-space: var(--md-outlined-button-with-trailing-icon-trailing-space, 16px);--_container-color: none;--_disabled-container-color: none;--_disabled-container-opacity: 0}.outline{inset:0;border-style:solid;position:absolute;box-sizing:border-box;border-color:var(--_outline-color);border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end)}:host(:active) .outline{border-color:var(--_pressed-outline-color)}:host(:is([disabled],[soft-disabled])) .outline{border-color:var(--_disabled-outline-color);opacity:var(--_disabled-outline-opacity)}@media(forced-colors: active){:host(:is([disabled],[soft-disabled])) .background{border-color:GrayText}:host(:is([disabled],[soft-disabled])) .outline{opacity:1}}.outline,md-ripple{border-width:var(--_outline-width)}md-ripple{inline-size:calc(100% - 2*var(--_outline-width));block-size:calc(100% - 2*var(--_outline-width));border-style:solid;border-color:rgba(0,0,0,0)}
`;/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let gi=class extends Er{};gi.styles=[Ji,Lr];gi=h([I("md-outlined-button")],gi);/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const qa=Symbol.for(""),Pr=e=>{if((e==null?void 0:e.r)===qa)return e==null?void 0:e._$litStatic$},ve=(e,...t)=>({_$litStatic$:t.reduce((i,a,o)=>i+(r=>{if(r._$litStatic$!==void 0)return r._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${r}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)})(a)+e[o+1],e[0]),r:qa}),va=new Map,Dr=e=>(t,...i)=>{const a=i.length;let o,r;const n=[],d=[];let p,f=0,g=!1;for(;f<a;){for(p=t[f];f<a&&(r=i[f],(o=Pr(r))!==void 0);)p+=o+t[++f],g=!0;f!==a&&d.push(r),n.push(p),f++}if(f===a&&n.push(t[a]),g){const m=n.join("$$lit$$");(t=va.get(m))===void 0&&(n.raw=n,va.set(m,t=n)),i=d}return e(t,...i)},Xi=Dr(s);/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function fa(e,t=!0){return t&&getComputedStyle(e).getPropertyValue("direction").trim()==="rtl"}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Or=ke(Vi(_));class q extends Or{get name(){return this.getAttribute("name")??""}set name(t){this.setAttribute("name",t)}get form(){return this[V].form}get labels(){return this[V].labels}constructor(){super(),this.disabled=!1,this.softDisabled=!1,this.flipIconInRtl=!1,this.href="",this.download="",this.target="",this.ariaLabelSelected="",this.toggle=!1,this.selected=!1,this.type="submit",this.value="",this.flipIcon=fa(this,this.flipIconInRtl),this.addEventListener("click",this.handleClick.bind(this))}willUpdate(){this.href&&(this.disabled=!1,this.softDisabled=!1)}render(){const t=this.href?ve`div`:ve`button`,{ariaLabel:i,ariaHasPopup:a,ariaExpanded:o}=this,r=i&&this.ariaLabelSelected,n=this.toggle?this.selected:l;let d=l;return this.href||(d=r&&this.selected?this.ariaLabelSelected:i),Xi`<${t}
        class="icon-button ${ae(this.getRenderClasses())}"
        id="button"
        aria-label="${d||l}"
        aria-haspopup="${!this.href&&a||l}"
        aria-expanded="${!this.href&&o||l}"
        aria-pressed="${n}"
        aria-disabled=${!this.href&&this.softDisabled||l}
        ?disabled="${!this.href&&this.disabled}"
        @click="${this.handleClickOnChild}">
        ${this.renderFocusRing()}
        ${this.renderRipple()}
        ${this.selected?l:this.renderIcon()}
        ${this.selected?this.renderSelectedIcon():l}
        ${this.href?this.renderLink():this.renderTouchTarget()}
  </${t}>`}renderLink(){const{ariaLabel:t}=this;return s`
      <a
        class="link"
        id="link"
        href="${this.href}"
        download="${this.download||l}"
        target="${this.target||l}"
        aria-label="${t||l}">
        ${this.renderTouchTarget()}
      </a>
    `}getRenderClasses(){return{"flip-icon":this.flipIcon,selected:this.toggle&&this.selected}}renderIcon(){return s`<span class="icon"><slot></slot></span>`}renderSelectedIcon(){return s`<span class="icon icon--selected"
      ><slot name="selected"><slot></slot></slot
    ></span>`}renderTouchTarget(){return s`<span class="touch"></span>`}renderFocusRing(){return s`<md-focus-ring
      part="focus-ring"
      for=${this.href?"link":"button"}></md-focus-ring>`}renderRipple(){const t=!this.href&&(this.disabled||this.softDisabled);return s`<md-ripple
      for=${this.href?"link":l}
      ?disabled="${t}"></md-ripple>`}connectedCallback(){this.flipIcon=fa(this,this.flipIconInRtl),super.connectedCallback()}handleClick(t){if(!this.href&&this.softDisabled){t.stopImmediatePropagation(),t.preventDefault();return}}async handleClickOnChild(t){await 0,!(!this.toggle||this.disabled||this.softDisabled||t.defaultPrevented)&&(this.selected=!this.selected,this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0})))}}Wa(q);q.formAssociated=!0;q.shadowRootOptions={mode:"open",delegatesFocus:!0};h([v({type:Boolean,reflect:!0})],q.prototype,"disabled",void 0);h([v({type:Boolean,attribute:"soft-disabled",reflect:!0})],q.prototype,"softDisabled",void 0);h([v({type:Boolean,attribute:"flip-icon-in-rtl"})],q.prototype,"flipIconInRtl",void 0);h([v()],q.prototype,"href",void 0);h([v()],q.prototype,"download",void 0);h([v()],q.prototype,"target",void 0);h([v({attribute:"aria-label-selected"})],q.prototype,"ariaLabelSelected",void 0);h([v({type:Boolean})],q.prototype,"toggle",void 0);h([v({type:Boolean,reflect:!0})],q.prototype,"selected",void 0);h([v()],q.prototype,"type",void 0);h([v({reflect:!0})],q.prototype,"value",void 0);h([c()],q.prototype,"flipIcon",void 0);/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Mr=$`:host{display:inline-flex;outline:none;-webkit-tap-highlight-color:rgba(0,0,0,0);height:var(--_container-height);width:var(--_container-width);justify-content:center}:host([touch-target=wrapper]){margin:max(0px,(48px - var(--_container-height))/2) max(0px,(48px - var(--_container-width))/2)}md-focus-ring{--md-focus-ring-shape-start-start: var(--_container-shape-start-start);--md-focus-ring-shape-start-end: var(--_container-shape-start-end);--md-focus-ring-shape-end-end: var(--_container-shape-end-end);--md-focus-ring-shape-end-start: var(--_container-shape-end-start)}:host(:is([disabled],[soft-disabled])){pointer-events:none}.icon-button{place-items:center;background:none;border:none;box-sizing:border-box;cursor:pointer;display:flex;place-content:center;outline:none;padding:0;position:relative;text-decoration:none;user-select:none;z-index:0;flex:1;border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end)}.icon ::slotted(*){font-size:var(--_icon-size);height:var(--_icon-size);width:var(--_icon-size);font-weight:inherit}md-ripple{z-index:-1;border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end)}.flip-icon .icon{transform:scaleX(-1)}.icon{display:inline-flex}.link{display:grid;height:100%;outline:none;place-items:center;position:absolute;width:100%}.touch{position:absolute;height:max(48px,100%);width:max(48px,100%)}:host([touch-target=none]) .touch{display:none}@media(forced-colors: active){:host(:is([disabled],[soft-disabled])){--_disabled-icon-color: GrayText;--_disabled-icon-opacity: 1}}
`;/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Rr=$`:host{--_disabled-icon-color: var(--md-icon-button-disabled-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-icon-opacity: var(--md-icon-button-disabled-icon-opacity, 0.38);--_icon-size: var(--md-icon-button-icon-size, 24px);--_selected-focus-icon-color: var(--md-icon-button-selected-focus-icon-color, var(--md-sys-color-primary, #6750a4));--_selected-hover-icon-color: var(--md-icon-button-selected-hover-icon-color, var(--md-sys-color-primary, #6750a4));--_selected-hover-state-layer-color: var(--md-icon-button-selected-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_selected-hover-state-layer-opacity: var(--md-icon-button-selected-hover-state-layer-opacity, 0.08);--_selected-icon-color: var(--md-icon-button-selected-icon-color, var(--md-sys-color-primary, #6750a4));--_selected-pressed-icon-color: var(--md-icon-button-selected-pressed-icon-color, var(--md-sys-color-primary, #6750a4));--_selected-pressed-state-layer-color: var(--md-icon-button-selected-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_selected-pressed-state-layer-opacity: var(--md-icon-button-selected-pressed-state-layer-opacity, 0.12);--_state-layer-height: var(--md-icon-button-state-layer-height, 40px);--_state-layer-shape: var(--md-icon-button-state-layer-shape, var(--md-sys-shape-corner-full, 9999px));--_state-layer-width: var(--md-icon-button-state-layer-width, 40px);--_focus-icon-color: var(--md-icon-button-focus-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-icon-color: var(--md-icon-button-hover-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-color: var(--md-icon-button-hover-state-layer-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-opacity: var(--md-icon-button-hover-state-layer-opacity, 0.08);--_icon-color: var(--md-icon-button-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-icon-color: var(--md-icon-button-pressed-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-state-layer-color: var(--md-icon-button-pressed-state-layer-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-state-layer-opacity: var(--md-icon-button-pressed-state-layer-opacity, 0.12);--_container-shape-start-start: 0;--_container-shape-start-end: 0;--_container-shape-end-end: 0;--_container-shape-end-start: 0;--_container-height: 0;--_container-width: 0;height:var(--_state-layer-height);width:var(--_state-layer-width)}:host([touch-target=wrapper]){margin:max(0px,(48px - var(--_state-layer-height))/2) max(0px,(48px - var(--_state-layer-width))/2)}md-focus-ring{--md-focus-ring-shape-start-start: var(--_state-layer-shape);--md-focus-ring-shape-start-end: var(--_state-layer-shape);--md-focus-ring-shape-end-end: var(--_state-layer-shape);--md-focus-ring-shape-end-start: var(--_state-layer-shape)}.standard{background-color:rgba(0,0,0,0);color:var(--_icon-color);--md-ripple-hover-color: var(--_hover-state-layer-color);--md-ripple-hover-opacity: var(--_hover-state-layer-opacity);--md-ripple-pressed-color: var(--_pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_pressed-state-layer-opacity)}.standard:hover{color:var(--_hover-icon-color)}.standard:focus{color:var(--_focus-icon-color)}.standard:active{color:var(--_pressed-icon-color)}.standard:is(:disabled,[aria-disabled=true]){color:var(--_disabled-icon-color)}md-ripple{border-radius:var(--_state-layer-shape)}.standard:is(:disabled,[aria-disabled=true]){opacity:var(--_disabled-icon-opacity)}.selected:not(:disabled,[aria-disabled=true]){color:var(--_selected-icon-color)}.selected:not(:disabled,[aria-disabled=true]):hover{color:var(--_selected-hover-icon-color)}.selected:not(:disabled,[aria-disabled=true]):focus{color:var(--_selected-focus-icon-color)}.selected:not(:disabled,[aria-disabled=true]):active{color:var(--_selected-pressed-icon-color)}.selected{--md-ripple-hover-color: var(--_selected-hover-state-layer-color);--md-ripple-hover-opacity: var(--_selected-hover-state-layer-opacity);--md-ripple-pressed-color: var(--_selected-pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_selected-pressed-state-layer-opacity)}
`;/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let bi=class extends q{getRenderClasses(){return{...super.getRenderClasses(),standard:!0}}};bi.styles=[Mr,Rr];bi=h([I("md-icon-button")],bi);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class O extends _{constructor(){super(...arguments),this.disabled=!1,this.error=!1,this.focused=!1,this.label="",this.noAsterisk=!1,this.populated=!1,this.required=!1,this.resizable=!1,this.supportingText="",this.errorText="",this.count=-1,this.max=-1,this.hasStart=!1,this.hasEnd=!1,this.isAnimating=!1,this.refreshErrorAlert=!1,this.disableTransitions=!1}get counterText(){const t=this.count??-1,i=this.max??-1;return t<0||i<=0?"":`${t} / ${i}`}get supportingOrErrorText(){return this.error&&this.errorText?this.errorText:this.supportingText}reannounceError(){this.refreshErrorAlert=!0}update(t){t.has("disabled")&&t.get("disabled")!==void 0&&(this.disableTransitions=!0),this.disabled&&this.focused&&(t.set("focused",!0),this.focused=!1),this.animateLabelIfNeeded({wasFocused:t.get("focused"),wasPopulated:t.get("populated")}),super.update(t)}render(){var r,n,d,p;const t=this.renderLabel(!0),i=this.renderLabel(!1),a=(r=this.renderOutline)==null?void 0:r.call(this,t),o={disabled:this.disabled,"disable-transitions":this.disableTransitions,error:this.error&&!this.disabled,focused:this.focused,"with-start":this.hasStart,"with-end":this.hasEnd,populated:this.populated,resizable:this.resizable,required:this.required,"no-label":!this.label};return s`
      <div class="field ${ae(o)}">
        <div class="container-overflow">
          ${(n=this.renderBackground)==null?void 0:n.call(this)}
          <slot name="container"></slot>
          ${(d=this.renderStateLayer)==null?void 0:d.call(this)} ${(p=this.renderIndicator)==null?void 0:p.call(this)} ${a}
          <div class="container">
            <div class="start">
              <slot name="start"></slot>
            </div>
            <div class="middle">
              <div class="label-wrapper">
                ${i} ${a?l:t}
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
    `}updated(t){(t.has("supportingText")||t.has("errorText")||t.has("count")||t.has("max"))&&this.updateSlottedAriaDescribedBy(),this.refreshErrorAlert&&requestAnimationFrame(()=>{this.refreshErrorAlert=!1}),this.disableTransitions&&requestAnimationFrame(()=>{this.disableTransitions=!1})}renderSupportingText(){const{supportingOrErrorText:t,counterText:i}=this;if(!t&&!i)return l;const a=s`<span>${t}</span>`,o=i?s`<span class="counter">${i}</span>`:l,n=this.error&&this.errorText&&!this.refreshErrorAlert?"alert":l;return s`
      <div class="supporting-text" role=${n}>${a}${o}</div>
      <slot
        name="aria-describedby"
        @slotchange=${this.updateSlottedAriaDescribedBy}></slot>
    `}updateSlottedAriaDescribedBy(){for(const t of this.slottedAriaDescribedBy)Ba(s`${this.supportingOrErrorText} ${this.counterText}`,t),t.setAttribute("hidden","")}renderLabel(t){if(!this.label)return l;let i;t?i=this.focused||this.populated||this.isAnimating:i=!this.focused&&!this.populated&&!this.isAnimating;const a={hidden:!i,floating:t,resting:!t},o=`${this.label}${this.required&&!this.noAsterisk?"*":""}`;return s`
      <span class="label ${ae(a)}" aria-hidden=${!i}
        >${o}</span
      >
    `}animateLabelIfNeeded({wasFocused:t,wasPopulated:i}){var r,n,d;if(!this.label)return;t??(t=this.focused),i??(i=this.populated);const a=t||i,o=this.focused||this.populated;a!==o&&(this.isAnimating=!0,(r=this.labelAnimation)==null||r.cancel(),this.labelAnimation=(n=this.floatingLabelEl)==null?void 0:n.animate(this.getLabelKeyframes(),{duration:150,easing:Pe.STANDARD}),(d=this.labelAnimation)==null||d.addEventListener("finish",()=>{this.isAnimating=!1}))}getLabelKeyframes(){const{floatingLabelEl:t,restingLabelEl:i}=this;if(!t||!i)return[];const{x:a,y:o,height:r}=t.getBoundingClientRect(),{x:n,y:d,height:p}=i.getBoundingClientRect(),f=t.scrollWidth,g=i.scrollWidth,m=g/f,y=n-a,C=d-o+Math.round((p-r*m)/2),W=`translateX(${y}px) translateY(${C}px) scale(${m})`,se="translateX(0) translateY(0) scale(1)",j=i.clientWidth,L=g>j?`${j/m}px`:"";return this.focused||this.populated?[{transform:W,width:L},{transform:se,width:L}]:[{transform:se,width:L},{transform:W,width:L}]}getSurfacePositionClientRect(){return this.containerEl.getBoundingClientRect()}}h([v({type:Boolean})],O.prototype,"disabled",void 0);h([v({type:Boolean})],O.prototype,"error",void 0);h([v({type:Boolean})],O.prototype,"focused",void 0);h([v()],O.prototype,"label",void 0);h([v({type:Boolean,attribute:"no-asterisk"})],O.prototype,"noAsterisk",void 0);h([v({type:Boolean})],O.prototype,"populated",void 0);h([v({type:Boolean})],O.prototype,"required",void 0);h([v({type:Boolean})],O.prototype,"resizable",void 0);h([v({attribute:"supporting-text"})],O.prototype,"supportingText",void 0);h([v({attribute:"error-text"})],O.prototype,"errorText",void 0);h([v({type:Number})],O.prototype,"count",void 0);h([v({type:Number})],O.prototype,"max",void 0);h([v({type:Boolean,attribute:"has-start"})],O.prototype,"hasStart",void 0);h([v({type:Boolean,attribute:"has-end"})],O.prototype,"hasEnd",void 0);h([_e({slot:"aria-describedby"})],O.prototype,"slottedAriaDescribedBy",void 0);h([c()],O.prototype,"isAnimating",void 0);h([c()],O.prototype,"refreshErrorAlert",void 0);h([c()],O.prototype,"disableTransitions",void 0);h([S(".label.floating")],O.prototype,"floatingLabelEl",void 0);h([S(".label.resting")],O.prototype,"restingLabelEl",void 0);h([S(".container")],O.prototype,"containerEl",void 0);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Fr extends O{renderBackground(){return s` <div class="background"></div> `}renderStateLayer(){return s` <div class="state-layer"></div> `}renderIndicator(){return s`<div class="active-indicator"></div>`}}/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Nr=$`@layer styles{:host{--_active-indicator-color: var(--md-filled-field-active-indicator-color, var(--md-sys-color-on-surface-variant, #49454f));--_active-indicator-height: var(--md-filled-field-active-indicator-height, 1px);--_bottom-space: var(--md-filled-field-bottom-space, 16px);--_container-color: var(--md-filled-field-container-color, var(--md-sys-color-surface-container-highest, #e6e0e9));--_content-color: var(--md-filled-field-content-color, var(--md-sys-color-on-surface, #1d1b20));--_content-font: var(--md-filled-field-content-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_content-line-height: var(--md-filled-field-content-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_content-size: var(--md-filled-field-content-size, var(--md-sys-typescale-body-large-size, 1rem));--_content-space: var(--md-filled-field-content-space, 16px);--_content-weight: var(--md-filled-field-content-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_disabled-active-indicator-color: var(--md-filled-field-disabled-active-indicator-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-active-indicator-height: var(--md-filled-field-disabled-active-indicator-height, 1px);--_disabled-active-indicator-opacity: var(--md-filled-field-disabled-active-indicator-opacity, 0.38);--_disabled-container-color: var(--md-filled-field-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-container-opacity: var(--md-filled-field-disabled-container-opacity, 0.04);--_disabled-content-color: var(--md-filled-field-disabled-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-content-opacity: var(--md-filled-field-disabled-content-opacity, 0.38);--_disabled-label-text-color: var(--md-filled-field-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-filled-field-disabled-label-text-opacity, 0.38);--_disabled-leading-content-color: var(--md-filled-field-disabled-leading-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-leading-content-opacity: var(--md-filled-field-disabled-leading-content-opacity, 0.38);--_disabled-supporting-text-color: var(--md-filled-field-disabled-supporting-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-supporting-text-opacity: var(--md-filled-field-disabled-supporting-text-opacity, 0.38);--_disabled-trailing-content-color: var(--md-filled-field-disabled-trailing-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-trailing-content-opacity: var(--md-filled-field-disabled-trailing-content-opacity, 0.38);--_error-active-indicator-color: var(--md-filled-field-error-active-indicator-color, var(--md-sys-color-error, #b3261e));--_error-content-color: var(--md-filled-field-error-content-color, var(--md-sys-color-on-surface, #1d1b20));--_error-focus-active-indicator-color: var(--md-filled-field-error-focus-active-indicator-color, var(--md-sys-color-error, #b3261e));--_error-focus-content-color: var(--md-filled-field-error-focus-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-focus-label-text-color: var(--md-filled-field-error-focus-label-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-leading-content-color: var(--md-filled-field-error-focus-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-focus-supporting-text-color: var(--md-filled-field-error-focus-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-trailing-content-color: var(--md-filled-field-error-focus-trailing-content-color, var(--md-sys-color-error, #b3261e));--_error-hover-active-indicator-color: var(--md-filled-field-error-hover-active-indicator-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-content-color: var(--md-filled-field-error-hover-content-color, var(--md-sys-color-on-surface, #1d1b20));--_error-hover-label-text-color: var(--md-filled-field-error-hover-label-text-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-leading-content-color: var(--md-filled-field-error-hover-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-hover-state-layer-color: var(--md-filled-field-error-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_error-hover-state-layer-opacity: var(--md-filled-field-error-hover-state-layer-opacity, 0.08);--_error-hover-supporting-text-color: var(--md-filled-field-error-hover-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-hover-trailing-content-color: var(--md-filled-field-error-hover-trailing-content-color, var(--md-sys-color-on-error-container, #410e0b));--_error-label-text-color: var(--md-filled-field-error-label-text-color, var(--md-sys-color-error, #b3261e));--_error-leading-content-color: var(--md-filled-field-error-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-supporting-text-color: var(--md-filled-field-error-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-trailing-content-color: var(--md-filled-field-error-trailing-content-color, var(--md-sys-color-error, #b3261e));--_focus-active-indicator-color: var(--md-filled-field-focus-active-indicator-color, var(--md-sys-color-primary, #6750a4));--_focus-active-indicator-height: var(--md-filled-field-focus-active-indicator-height, 3px);--_focus-content-color: var(--md-filled-field-focus-content-color, var(--md-sys-color-on-surface, #1d1b20));--_focus-label-text-color: var(--md-filled-field-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_focus-leading-content-color: var(--md-filled-field-focus-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-supporting-text-color: var(--md-filled-field-focus-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-trailing-content-color: var(--md-filled-field-focus-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-active-indicator-color: var(--md-filled-field-hover-active-indicator-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-active-indicator-height: var(--md-filled-field-hover-active-indicator-height, 1px);--_hover-content-color: var(--md-filled-field-hover-content-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-label-text-color: var(--md-filled-field-hover-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-leading-content-color: var(--md-filled-field-hover-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-color: var(--md-filled-field-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-state-layer-opacity: var(--md-filled-field-hover-state-layer-opacity, 0.08);--_hover-supporting-text-color: var(--md-filled-field-hover-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-trailing-content-color: var(--md-filled-field-hover-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-color: var(--md-filled-field-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-font: var(--md-filled-field-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-filled-field-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_label-text-populated-line-height: var(--md-filled-field-label-text-populated-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_label-text-populated-size: var(--md-filled-field-label-text-populated-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_label-text-size: var(--md-filled-field-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_label-text-weight: var(--md-filled-field-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_leading-content-color: var(--md-filled-field-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_leading-space: var(--md-filled-field-leading-space, 16px);--_supporting-text-color: var(--md-filled-field-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_supporting-text-font: var(--md-filled-field-supporting-text-font, var(--md-sys-typescale-body-small-font, var(--md-ref-typeface-plain, Roboto)));--_supporting-text-leading-space: var(--md-filled-field-supporting-text-leading-space, 16px);--_supporting-text-line-height: var(--md-filled-field-supporting-text-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_supporting-text-size: var(--md-filled-field-supporting-text-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_supporting-text-top-space: var(--md-filled-field-supporting-text-top-space, 4px);--_supporting-text-trailing-space: var(--md-filled-field-supporting-text-trailing-space, 16px);--_supporting-text-weight: var(--md-filled-field-supporting-text-weight, var(--md-sys-typescale-body-small-weight, var(--md-ref-typeface-weight-regular, 400)));--_top-space: var(--md-filled-field-top-space, 16px);--_trailing-content-color: var(--md-filled-field-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_trailing-space: var(--md-filled-field-trailing-space, 16px);--_with-label-bottom-space: var(--md-filled-field-with-label-bottom-space, 8px);--_with-label-top-space: var(--md-filled-field-with-label-top-space, 8px);--_with-leading-content-leading-space: var(--md-filled-field-with-leading-content-leading-space, 12px);--_with-trailing-content-trailing-space: var(--md-filled-field-with-trailing-content-trailing-space, 12px);--_container-shape-start-start: var(--md-filled-field-container-shape-start-start, var(--md-filled-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-start-end: var(--md-filled-field-container-shape-start-end, var(--md-filled-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-end-end: var(--md-filled-field-container-shape-end-end, var(--md-filled-field-container-shape, var(--md-sys-shape-corner-none, 0px)));--_container-shape-end-start: var(--md-filled-field-container-shape-end-start, var(--md-filled-field-container-shape, var(--md-sys-shape-corner-none, 0px)))}.background,.state-layer{border-radius:inherit;inset:0;pointer-events:none;position:absolute}.background{background:var(--_container-color)}.state-layer{visibility:hidden}.field:not(.disabled):hover .state-layer{visibility:visible}.label.floating{position:absolute;top:var(--_with-label-top-space)}.field:not(.with-start) .label-wrapper{margin-inline-start:var(--_leading-space)}.field:not(.with-end) .label-wrapper{margin-inline-end:var(--_trailing-space)}.active-indicator{inset:auto 0 0 0;pointer-events:none;position:absolute;width:100%;z-index:1}.active-indicator::before,.active-indicator::after{border-bottom:var(--_active-indicator-height) solid var(--_active-indicator-color);inset:auto 0 0 0;content:"";position:absolute;width:100%}.active-indicator::after{opacity:0;transition:opacity 150ms cubic-bezier(0.2, 0, 0, 1)}.focused .active-indicator::after{opacity:1}.field:not(.with-start) .content ::slotted(*){padding-inline-start:var(--_leading-space)}.field:not(.with-end) .content ::slotted(*){padding-inline-end:var(--_trailing-space)}.field:not(.no-label) .content ::slotted(:not(textarea)){padding-bottom:var(--_with-label-bottom-space);padding-top:calc(var(--_with-label-top-space) + var(--_label-text-populated-line-height))}.field:not(.no-label) .content ::slotted(textarea){margin-bottom:var(--_with-label-bottom-space);margin-top:calc(var(--_with-label-top-space) + var(--_label-text-populated-line-height))}:hover .active-indicator::before{border-bottom-color:var(--_hover-active-indicator-color);border-bottom-width:var(--_hover-active-indicator-height)}.active-indicator::after{border-bottom-color:var(--_focus-active-indicator-color);border-bottom-width:var(--_focus-active-indicator-height)}:hover .state-layer{background:var(--_hover-state-layer-color);opacity:var(--_hover-state-layer-opacity)}.disabled .active-indicator::before{border-bottom-color:var(--_disabled-active-indicator-color);border-bottom-width:var(--_disabled-active-indicator-height);opacity:var(--_disabled-active-indicator-opacity)}.disabled .background{background:var(--_disabled-container-color);opacity:var(--_disabled-container-opacity)}.error .active-indicator::before{border-bottom-color:var(--_error-active-indicator-color)}.error:hover .active-indicator::before{border-bottom-color:var(--_error-hover-active-indicator-color)}.error:hover .state-layer{background:var(--_error-hover-state-layer-color);opacity:var(--_error-hover-state-layer-opacity)}.error .active-indicator::after{border-bottom-color:var(--_error-focus-active-indicator-color)}.resizable .container{bottom:var(--_focus-active-indicator-height);clip-path:inset(var(--_focus-active-indicator-height) 0 0 0)}.resizable .container>*{top:var(--_focus-active-indicator-height)}}@layer hcm{@media(forced-colors: active){.disabled .active-indicator::before{border-color:GrayText;opacity:1}}}
`;/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Ya=$`:host{display:inline-flex;resize:both}.field{display:flex;flex:1;flex-direction:column;writing-mode:horizontal-tb;max-width:100%}.container-overflow{border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-end-radius:var(--_container-shape-end-end);border-end-start-radius:var(--_container-shape-end-start);display:flex;height:100%;position:relative}.container{align-items:center;border-radius:inherit;display:flex;flex:1;max-height:100%;min-height:100%;min-width:min-content;position:relative}.field,.container-overflow{resize:inherit}.resizable:not(.disabled) .container{resize:inherit;overflow:hidden}.disabled{pointer-events:none}slot[name=container]{border-radius:inherit}slot[name=container]::slotted(*){border-radius:inherit;inset:0;pointer-events:none;position:absolute}@layer styles{.start,.middle,.end{display:flex;box-sizing:border-box;height:100%;position:relative}.start{color:var(--_leading-content-color)}.end{color:var(--_trailing-content-color)}.start,.end{align-items:center;justify-content:center}.with-start .start{margin-inline:var(--_with-leading-content-leading-space) var(--_content-space)}.with-end .end{margin-inline:var(--_content-space) var(--_with-trailing-content-trailing-space)}.middle{align-items:stretch;align-self:baseline;flex:1}.content{color:var(--_content-color);display:flex;flex:1;opacity:0;transition:opacity 83ms cubic-bezier(0.2, 0, 0, 1)}.no-label .content,.focused .content,.populated .content{opacity:1;transition-delay:67ms}:is(.disabled,.disable-transitions) .content{transition:none}.content ::slotted(*){all:unset;color:currentColor;font-family:var(--_content-font);font-size:var(--_content-size);line-height:var(--_content-line-height);font-weight:var(--_content-weight);width:100%;overflow-wrap:revert;white-space:revert}.content ::slotted(:not(textarea)){padding-top:var(--_top-space);padding-bottom:var(--_bottom-space)}.content ::slotted(textarea){margin-top:var(--_top-space);margin-bottom:var(--_bottom-space)}:hover .content{color:var(--_hover-content-color)}:hover .start{color:var(--_hover-leading-content-color)}:hover .end{color:var(--_hover-trailing-content-color)}.focused .content{color:var(--_focus-content-color)}.focused .start{color:var(--_focus-leading-content-color)}.focused .end{color:var(--_focus-trailing-content-color)}.disabled .content{color:var(--_disabled-content-color)}.disabled.no-label .content,.disabled.focused .content,.disabled.populated .content{opacity:var(--_disabled-content-opacity)}.disabled .start{color:var(--_disabled-leading-content-color);opacity:var(--_disabled-leading-content-opacity)}.disabled .end{color:var(--_disabled-trailing-content-color);opacity:var(--_disabled-trailing-content-opacity)}.error .content{color:var(--_error-content-color)}.error .start{color:var(--_error-leading-content-color)}.error .end{color:var(--_error-trailing-content-color)}.error:hover .content{color:var(--_error-hover-content-color)}.error:hover .start{color:var(--_error-hover-leading-content-color)}.error:hover .end{color:var(--_error-hover-trailing-content-color)}.error.focused .content{color:var(--_error-focus-content-color)}.error.focused .start{color:var(--_error-focus-leading-content-color)}.error.focused .end{color:var(--_error-focus-trailing-content-color)}}@layer hcm{@media(forced-colors: active){.disabled :is(.start,.content,.end){color:GrayText;opacity:1}}}@layer styles{.label{box-sizing:border-box;color:var(--_label-text-color);overflow:hidden;max-width:100%;text-overflow:ellipsis;white-space:nowrap;z-index:1;font-family:var(--_label-text-font);font-size:var(--_label-text-size);line-height:var(--_label-text-line-height);font-weight:var(--_label-text-weight);width:min-content}.label-wrapper{inset:0;pointer-events:none;position:absolute}.label.resting{position:absolute;top:var(--_top-space)}.label.floating{font-size:var(--_label-text-populated-size);line-height:var(--_label-text-populated-line-height);transform-origin:top left}.label.hidden{opacity:0}.no-label .label{display:none}.label-wrapper{inset:0;position:absolute;text-align:initial}:hover .label{color:var(--_hover-label-text-color)}.focused .label{color:var(--_focus-label-text-color)}.disabled .label{color:var(--_disabled-label-text-color)}.disabled .label:not(.hidden){opacity:var(--_disabled-label-text-opacity)}.error .label{color:var(--_error-label-text-color)}.error:hover .label{color:var(--_error-hover-label-text-color)}.error.focused .label{color:var(--_error-focus-label-text-color)}}@layer hcm{@media(forced-colors: active){.disabled .label:not(.hidden){color:GrayText;opacity:1}}}@layer styles{.supporting-text{color:var(--_supporting-text-color);display:flex;font-family:var(--_supporting-text-font);font-size:var(--_supporting-text-size);line-height:var(--_supporting-text-line-height);font-weight:var(--_supporting-text-weight);gap:16px;justify-content:space-between;padding-inline-start:var(--_supporting-text-leading-space);padding-inline-end:var(--_supporting-text-trailing-space);padding-top:var(--_supporting-text-top-space)}.supporting-text :nth-child(2){flex-shrink:0}:hover .supporting-text{color:var(--_hover-supporting-text-color)}.focus .supporting-text{color:var(--_focus-supporting-text-color)}.disabled .supporting-text{color:var(--_disabled-supporting-text-color);opacity:var(--_disabled-supporting-text-opacity)}.error .supporting-text{color:var(--_error-supporting-text-color)}.error:hover .supporting-text{color:var(--_error-hover-supporting-text-color)}.error.focus .supporting-text{color:var(--_error-focus-supporting-text-color)}}@layer hcm{@media(forced-colors: active){.disabled .supporting-text{color:GrayText;opacity:1}}}
`;/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let yi=class extends Fr{};yi.styles=[Ya,Nr];yi=h([I("md-filled-field")],yi);/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Br=$`:host{--_active-indicator-color: var(--md-filled-text-field-active-indicator-color, var(--md-sys-color-on-surface-variant, #49454f));--_active-indicator-height: var(--md-filled-text-field-active-indicator-height, 1px);--_caret-color: var(--md-filled-text-field-caret-color, var(--md-sys-color-primary, #6750a4));--_container-color: var(--md-filled-text-field-container-color, var(--md-sys-color-surface-container-highest, #e6e0e9));--_disabled-active-indicator-color: var(--md-filled-text-field-disabled-active-indicator-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-active-indicator-height: var(--md-filled-text-field-disabled-active-indicator-height, 1px);--_disabled-active-indicator-opacity: var(--md-filled-text-field-disabled-active-indicator-opacity, 0.38);--_disabled-container-color: var(--md-filled-text-field-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-container-opacity: var(--md-filled-text-field-disabled-container-opacity, 0.04);--_disabled-input-text-color: var(--md-filled-text-field-disabled-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-input-text-opacity: var(--md-filled-text-field-disabled-input-text-opacity, 0.38);--_disabled-label-text-color: var(--md-filled-text-field-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-filled-text-field-disabled-label-text-opacity, 0.38);--_disabled-leading-icon-color: var(--md-filled-text-field-disabled-leading-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-leading-icon-opacity: var(--md-filled-text-field-disabled-leading-icon-opacity, 0.38);--_disabled-supporting-text-color: var(--md-filled-text-field-disabled-supporting-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-supporting-text-opacity: var(--md-filled-text-field-disabled-supporting-text-opacity, 0.38);--_disabled-trailing-icon-color: var(--md-filled-text-field-disabled-trailing-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-trailing-icon-opacity: var(--md-filled-text-field-disabled-trailing-icon-opacity, 0.38);--_error-active-indicator-color: var(--md-filled-text-field-error-active-indicator-color, var(--md-sys-color-error, #b3261e));--_error-focus-active-indicator-color: var(--md-filled-text-field-error-focus-active-indicator-color, var(--md-sys-color-error, #b3261e));--_error-focus-caret-color: var(--md-filled-text-field-error-focus-caret-color, var(--md-sys-color-error, #b3261e));--_error-focus-input-text-color: var(--md-filled-text-field-error-focus-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_error-focus-label-text-color: var(--md-filled-text-field-error-focus-label-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-leading-icon-color: var(--md-filled-text-field-error-focus-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-focus-supporting-text-color: var(--md-filled-text-field-error-focus-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-trailing-icon-color: var(--md-filled-text-field-error-focus-trailing-icon-color, var(--md-sys-color-error, #b3261e));--_error-hover-active-indicator-color: var(--md-filled-text-field-error-hover-active-indicator-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-input-text-color: var(--md-filled-text-field-error-hover-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_error-hover-label-text-color: var(--md-filled-text-field-error-hover-label-text-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-leading-icon-color: var(--md-filled-text-field-error-hover-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-hover-state-layer-color: var(--md-filled-text-field-error-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_error-hover-state-layer-opacity: var(--md-filled-text-field-error-hover-state-layer-opacity, 0.08);--_error-hover-supporting-text-color: var(--md-filled-text-field-error-hover-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-hover-trailing-icon-color: var(--md-filled-text-field-error-hover-trailing-icon-color, var(--md-sys-color-on-error-container, #410e0b));--_error-input-text-color: var(--md-filled-text-field-error-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_error-label-text-color: var(--md-filled-text-field-error-label-text-color, var(--md-sys-color-error, #b3261e));--_error-leading-icon-color: var(--md-filled-text-field-error-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-supporting-text-color: var(--md-filled-text-field-error-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-trailing-icon-color: var(--md-filled-text-field-error-trailing-icon-color, var(--md-sys-color-error, #b3261e));--_focus-active-indicator-color: var(--md-filled-text-field-focus-active-indicator-color, var(--md-sys-color-primary, #6750a4));--_focus-active-indicator-height: var(--md-filled-text-field-focus-active-indicator-height, 3px);--_focus-input-text-color: var(--md-filled-text-field-focus-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_focus-label-text-color: var(--md-filled-text-field-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_focus-leading-icon-color: var(--md-filled-text-field-focus-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-supporting-text-color: var(--md-filled-text-field-focus-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-trailing-icon-color: var(--md-filled-text-field-focus-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-active-indicator-color: var(--md-filled-text-field-hover-active-indicator-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-active-indicator-height: var(--md-filled-text-field-hover-active-indicator-height, 1px);--_hover-input-text-color: var(--md-filled-text-field-hover-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-label-text-color: var(--md-filled-text-field-hover-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-leading-icon-color: var(--md-filled-text-field-hover-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-color: var(--md-filled-text-field-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-state-layer-opacity: var(--md-filled-text-field-hover-state-layer-opacity, 0.08);--_hover-supporting-text-color: var(--md-filled-text-field-hover-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-trailing-icon-color: var(--md-filled-text-field-hover-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-color: var(--md-filled-text-field-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_input-text-font: var(--md-filled-text-field-input-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_input-text-line-height: var(--md-filled-text-field-input-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_input-text-placeholder-color: var(--md-filled-text-field-input-text-placeholder-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-prefix-color: var(--md-filled-text-field-input-text-prefix-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-size: var(--md-filled-text-field-input-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_input-text-suffix-color: var(--md-filled-text-field-input-text-suffix-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-weight: var(--md-filled-text-field-input-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_label-text-color: var(--md-filled-text-field-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-font: var(--md-filled-text-field-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-filled-text-field-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_label-text-populated-line-height: var(--md-filled-text-field-label-text-populated-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_label-text-populated-size: var(--md-filled-text-field-label-text-populated-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_label-text-size: var(--md-filled-text-field-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_label-text-weight: var(--md-filled-text-field-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_leading-icon-color: var(--md-filled-text-field-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_leading-icon-size: var(--md-filled-text-field-leading-icon-size, 24px);--_supporting-text-color: var(--md-filled-text-field-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_supporting-text-font: var(--md-filled-text-field-supporting-text-font, var(--md-sys-typescale-body-small-font, var(--md-ref-typeface-plain, Roboto)));--_supporting-text-line-height: var(--md-filled-text-field-supporting-text-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_supporting-text-size: var(--md-filled-text-field-supporting-text-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_supporting-text-weight: var(--md-filled-text-field-supporting-text-weight, var(--md-sys-typescale-body-small-weight, var(--md-ref-typeface-weight-regular, 400)));--_trailing-icon-color: var(--md-filled-text-field-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_trailing-icon-size: var(--md-filled-text-field-trailing-icon-size, 24px);--_container-shape-start-start: var(--md-filled-text-field-container-shape-start-start, var(--md-filled-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-start-end: var(--md-filled-text-field-container-shape-start-end, var(--md-filled-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-end-end: var(--md-filled-text-field-container-shape-end-end, var(--md-filled-text-field-container-shape, var(--md-sys-shape-corner-none, 0px)));--_container-shape-end-start: var(--md-filled-text-field-container-shape-end-start, var(--md-filled-text-field-container-shape, var(--md-sys-shape-corner-none, 0px)));--_icon-input-space: var(--md-filled-text-field-icon-input-space, 16px);--_leading-space: var(--md-filled-text-field-leading-space, 16px);--_trailing-space: var(--md-filled-text-field-trailing-space, 16px);--_top-space: var(--md-filled-text-field-top-space, 16px);--_bottom-space: var(--md-filled-text-field-bottom-space, 16px);--_input-text-prefix-trailing-space: var(--md-filled-text-field-input-text-prefix-trailing-space, 2px);--_input-text-suffix-leading-space: var(--md-filled-text-field-input-text-suffix-leading-space, 2px);--_with-label-top-space: var(--md-filled-text-field-with-label-top-space, 8px);--_with-label-bottom-space: var(--md-filled-text-field-with-label-bottom-space, 8px);--_focus-caret-color: var(--md-filled-text-field-focus-caret-color, var(--md-sys-color-primary, #6750a4));--_with-leading-icon-leading-space: var(--md-filled-text-field-with-leading-icon-leading-space, 12px);--_with-trailing-icon-trailing-space: var(--md-filled-text-field-with-trailing-icon-trailing-space, 12px);--md-filled-field-active-indicator-color: var(--_active-indicator-color);--md-filled-field-active-indicator-height: var(--_active-indicator-height);--md-filled-field-bottom-space: var(--_bottom-space);--md-filled-field-container-color: var(--_container-color);--md-filled-field-container-shape-end-end: var(--_container-shape-end-end);--md-filled-field-container-shape-end-start: var(--_container-shape-end-start);--md-filled-field-container-shape-start-end: var(--_container-shape-start-end);--md-filled-field-container-shape-start-start: var(--_container-shape-start-start);--md-filled-field-content-color: var(--_input-text-color);--md-filled-field-content-font: var(--_input-text-font);--md-filled-field-content-line-height: var(--_input-text-line-height);--md-filled-field-content-size: var(--_input-text-size);--md-filled-field-content-space: var(--_icon-input-space);--md-filled-field-content-weight: var(--_input-text-weight);--md-filled-field-disabled-active-indicator-color: var(--_disabled-active-indicator-color);--md-filled-field-disabled-active-indicator-height: var(--_disabled-active-indicator-height);--md-filled-field-disabled-active-indicator-opacity: var(--_disabled-active-indicator-opacity);--md-filled-field-disabled-container-color: var(--_disabled-container-color);--md-filled-field-disabled-container-opacity: var(--_disabled-container-opacity);--md-filled-field-disabled-content-color: var(--_disabled-input-text-color);--md-filled-field-disabled-content-opacity: var(--_disabled-input-text-opacity);--md-filled-field-disabled-label-text-color: var(--_disabled-label-text-color);--md-filled-field-disabled-label-text-opacity: var(--_disabled-label-text-opacity);--md-filled-field-disabled-leading-content-color: var(--_disabled-leading-icon-color);--md-filled-field-disabled-leading-content-opacity: var(--_disabled-leading-icon-opacity);--md-filled-field-disabled-supporting-text-color: var(--_disabled-supporting-text-color);--md-filled-field-disabled-supporting-text-opacity: var(--_disabled-supporting-text-opacity);--md-filled-field-disabled-trailing-content-color: var(--_disabled-trailing-icon-color);--md-filled-field-disabled-trailing-content-opacity: var(--_disabled-trailing-icon-opacity);--md-filled-field-error-active-indicator-color: var(--_error-active-indicator-color);--md-filled-field-error-content-color: var(--_error-input-text-color);--md-filled-field-error-focus-active-indicator-color: var(--_error-focus-active-indicator-color);--md-filled-field-error-focus-content-color: var(--_error-focus-input-text-color);--md-filled-field-error-focus-label-text-color: var(--_error-focus-label-text-color);--md-filled-field-error-focus-leading-content-color: var(--_error-focus-leading-icon-color);--md-filled-field-error-focus-supporting-text-color: var(--_error-focus-supporting-text-color);--md-filled-field-error-focus-trailing-content-color: var(--_error-focus-trailing-icon-color);--md-filled-field-error-hover-active-indicator-color: var(--_error-hover-active-indicator-color);--md-filled-field-error-hover-content-color: var(--_error-hover-input-text-color);--md-filled-field-error-hover-label-text-color: var(--_error-hover-label-text-color);--md-filled-field-error-hover-leading-content-color: var(--_error-hover-leading-icon-color);--md-filled-field-error-hover-state-layer-color: var(--_error-hover-state-layer-color);--md-filled-field-error-hover-state-layer-opacity: var(--_error-hover-state-layer-opacity);--md-filled-field-error-hover-supporting-text-color: var(--_error-hover-supporting-text-color);--md-filled-field-error-hover-trailing-content-color: var(--_error-hover-trailing-icon-color);--md-filled-field-error-label-text-color: var(--_error-label-text-color);--md-filled-field-error-leading-content-color: var(--_error-leading-icon-color);--md-filled-field-error-supporting-text-color: var(--_error-supporting-text-color);--md-filled-field-error-trailing-content-color: var(--_error-trailing-icon-color);--md-filled-field-focus-active-indicator-color: var(--_focus-active-indicator-color);--md-filled-field-focus-active-indicator-height: var(--_focus-active-indicator-height);--md-filled-field-focus-content-color: var(--_focus-input-text-color);--md-filled-field-focus-label-text-color: var(--_focus-label-text-color);--md-filled-field-focus-leading-content-color: var(--_focus-leading-icon-color);--md-filled-field-focus-supporting-text-color: var(--_focus-supporting-text-color);--md-filled-field-focus-trailing-content-color: var(--_focus-trailing-icon-color);--md-filled-field-hover-active-indicator-color: var(--_hover-active-indicator-color);--md-filled-field-hover-active-indicator-height: var(--_hover-active-indicator-height);--md-filled-field-hover-content-color: var(--_hover-input-text-color);--md-filled-field-hover-label-text-color: var(--_hover-label-text-color);--md-filled-field-hover-leading-content-color: var(--_hover-leading-icon-color);--md-filled-field-hover-state-layer-color: var(--_hover-state-layer-color);--md-filled-field-hover-state-layer-opacity: var(--_hover-state-layer-opacity);--md-filled-field-hover-supporting-text-color: var(--_hover-supporting-text-color);--md-filled-field-hover-trailing-content-color: var(--_hover-trailing-icon-color);--md-filled-field-label-text-color: var(--_label-text-color);--md-filled-field-label-text-font: var(--_label-text-font);--md-filled-field-label-text-line-height: var(--_label-text-line-height);--md-filled-field-label-text-populated-line-height: var(--_label-text-populated-line-height);--md-filled-field-label-text-populated-size: var(--_label-text-populated-size);--md-filled-field-label-text-size: var(--_label-text-size);--md-filled-field-label-text-weight: var(--_label-text-weight);--md-filled-field-leading-content-color: var(--_leading-icon-color);--md-filled-field-leading-space: var(--_leading-space);--md-filled-field-supporting-text-color: var(--_supporting-text-color);--md-filled-field-supporting-text-font: var(--_supporting-text-font);--md-filled-field-supporting-text-line-height: var(--_supporting-text-line-height);--md-filled-field-supporting-text-size: var(--_supporting-text-size);--md-filled-field-supporting-text-weight: var(--_supporting-text-weight);--md-filled-field-top-space: var(--_top-space);--md-filled-field-trailing-content-color: var(--_trailing-icon-color);--md-filled-field-trailing-space: var(--_trailing-space);--md-filled-field-with-label-bottom-space: var(--_with-label-bottom-space);--md-filled-field-with-label-top-space: var(--_with-label-top-space);--md-filled-field-with-leading-content-leading-space: var(--_with-leading-icon-leading-space);--md-filled-field-with-trailing-content-trailing-space: var(--_with-trailing-icon-trailing-space)}
`;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ur=e=>e.strings===void 0,jr={},Ka=(e,t=jr)=>e._$AH=t;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ga=jt(class extends Ht{constructor(e){if(super(e),e.type!==xe.PROPERTY&&e.type!==xe.ATTRIBUTE&&e.type!==xe.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Ur(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===ie||t===l)return t;const i=e.element,a=e.name;if(e.type===xe.PROPERTY){if(t===i[a])return ie}else if(e.type===xe.BOOLEAN_ATTRIBUTE){if(!!t===i.hasAttribute(a))return ie}else if(e.type===xe.ATTRIBUTE&&i.getAttribute(a)===t+"")return ie;return Ka(e),t}});/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Va="important",Hr=" !"+Va,ba=jt(class extends Ht{constructor(e){var t;if(super(e),e.type!==xe.ATTRIBUTE||e.name!=="style"||((t=e.strings)==null?void 0:t.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce((t,i)=>{const a=e[i];return a==null?t:t+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${a};`},"")}update(e,[t]){const{style:i}=e.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(const a of this.ft)t[a]==null&&(this.ft.delete(a),a.includes("-")?i.removeProperty(a):i[a]=null);for(const a in t){const o=t[a];if(o!=null){this.ft.add(a);const r=typeof o=="string"&&o.endsWith(Hr);a.includes("-")||r?i.setProperty(a,r?o.slice(0,-11):o,r?Va:""):i[a]=o}}return ie}});/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Gr={fromAttribute(e){return e??""},toAttribute(e){return e||null}};/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function Zi(e,t){t.bubbles&&(!e.shadowRoot||t.composed)&&t.stopPropagation();const i=Reflect.construct(t.constructor,[t.type,t]),a=e.dispatchEvent(i);return a||t.preventDefault(),a}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const xi=Symbol("createValidator"),wi=Symbol("getValidityAnchor"),Qt=Symbol("privateValidator"),pe=Symbol("privateSyncValidity"),ht=Symbol("privateCustomValidationMessage");function Wr(e){var t;class i extends e{constructor(){super(...arguments),this[t]=""}get validity(){return this[pe](),this[V].validity}get validationMessage(){return this[pe](),this[V].validationMessage}get willValidate(){return this[pe](),this[V].willValidate}checkValidity(){return this[pe](),this[V].checkValidity()}reportValidity(){return this[pe](),this[V].reportValidity()}setCustomValidity(o){this[ht]=o,this[pe]()}requestUpdate(o,r,n){super.requestUpdate(o,r,n),this[pe]()}firstUpdated(o){super.firstUpdated(o),this[pe]()}[(t=ht,pe)](){this[Qt]||(this[Qt]=this[xi]());const{validity:o,validationMessage:r}=this[Qt].getValidity(),n=!!this[ht],d=this[ht]||r;this[V].setValidity({...o,customError:n},d,this[wi]()??void 0)}[xi](){throw new Error("Implement [createValidator]")}[wi](){throw new Error("Implement [getValidityAnchor]")}}return i}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const zt=Symbol("getFormValue"),ya=Symbol("getFormState");function qr(e){class t extends e{get form(){return this[V].form}get labels(){return this[V].labels}get name(){return this.getAttribute("name")??""}set name(a){this.setAttribute("name",a)}get disabled(){return this.hasAttribute("disabled")}set disabled(a){this.toggleAttribute("disabled",a)}attributeChangedCallback(a,o,r){if(a==="name"||a==="disabled"){const n=a==="disabled"?o!==null:o;this.requestUpdate(a,n);return}super.attributeChangedCallback(a,o,r)}requestUpdate(a,o,r){super.requestUpdate(a,o,r),this[V].setFormValue(this[zt](),this[ya]())}[zt](){throw new Error("Implement [getFormValue]")}[ya](){return this[zt]()}formDisabledCallback(a){this.disabled=a}}return t.formAssociated=!0,h([v({noAccessor:!0})],t.prototype,"name",null),h([v({type:Boolean,noAccessor:!0})],t.prototype,"disabled",null),t}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const $i=Symbol("onReportValidity"),ut=Symbol("privateCleanupFormListeners"),mt=Symbol("privateDoNotReportInvalid"),vt=Symbol("privateIsSelfReportingValidity"),ft=Symbol("privateCallOnReportValidity");function Yr(e){var t,i,a;class o extends e{constructor(...n){super(...n),this[t]=new AbortController,this[i]=!1,this[a]=!1,this.addEventListener("invalid",d=>{this[mt]||!d.isTrusted||this.addEventListener("invalid",()=>{this[ft](d)},{once:!0})},{capture:!0})}checkValidity(){this[mt]=!0;const n=super.checkValidity();return this[mt]=!1,n}reportValidity(){this[vt]=!0;const n=super.reportValidity();return n&&this[ft](null),this[vt]=!1,n}[(t=ut,i=mt,a=vt,ft)](n){const d=n==null?void 0:n.defaultPrevented;d||(this[$i](n),!(!d&&(n==null?void 0:n.defaultPrevented)))||(this[vt]||Jr(this[V].form,this))&&this.focus()}[$i](n){throw new Error("Implement [onReportValidity]")}formAssociatedCallback(n){super.formAssociatedCallback&&super.formAssociatedCallback(n),this[ut].abort(),n&&(this[ut]=new AbortController,Kr(this,n,()=>{this[ft](null)},this[ut].signal))}}return o}function Kr(e,t,i,a){const o=Vr(t);let r=!1,n,d=!1;o.addEventListener("before",()=>{d=!0,n=new AbortController,r=!1,e.addEventListener("invalid",()=>{r=!0},{signal:n.signal})},{signal:a}),o.addEventListener("after",()=>{d=!1,n==null||n.abort(),!r&&i()},{signal:a}),t.addEventListener("submit",()=>{d||i()},{signal:a})}const ei=new WeakMap;function Vr(e){if(!ei.has(e)){const t=new EventTarget;ei.set(e,t);for(const i of["reportValidity","requestSubmit"]){const a=e[i];e[i]=function(){t.dispatchEvent(new Event("before"));const o=Reflect.apply(a,this,arguments);return t.dispatchEvent(new Event("after")),o}}}return ei.get(e)}function Jr(e,t){if(!e)return!0;let i;for(const a of e.elements)if(a.matches(":invalid")){i=a;break}return i===t}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Xr{constructor(t){this.getCurrentState=t,this.currentValidity={validity:{},validationMessage:""}}getValidity(){const t=this.getCurrentState();if(!(!this.prevState||!this.equals(this.prevState,t)))return this.currentValidity;const{validity:a,validationMessage:o}=this.computeValidity(t);return this.prevState=this.copy(t),this.currentValidity={validationMessage:o,validity:{badInput:a.badInput,customError:a.customError,patternMismatch:a.patternMismatch,rangeOverflow:a.rangeOverflow,rangeUnderflow:a.rangeUnderflow,stepMismatch:a.stepMismatch,tooLong:a.tooLong,tooShort:a.tooShort,typeMismatch:a.typeMismatch,valueMissing:a.valueMissing}},this.currentValidity}}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Zr extends Xr{computeValidity({state:t,renderedControl:i}){let a=i;We(t)&&!a?(a=this.inputControl||document.createElement("input"),this.inputControl=a):a||(a=this.textAreaControl||document.createElement("textarea"),this.textAreaControl=a);const o=We(t)?a:null;if(o&&(o.type=t.type),a.value!==t.value&&(a.value=t.value),a.required=t.required,o){const r=t;r.pattern?o.pattern=r.pattern:o.removeAttribute("pattern"),r.min?o.min=r.min:o.removeAttribute("min"),r.max?o.max=r.max:o.removeAttribute("max"),r.step?o.step=r.step:o.removeAttribute("step")}return(t.minLength??-1)>-1?a.setAttribute("minlength",String(t.minLength)):a.removeAttribute("minlength"),(t.maxLength??-1)>-1?a.setAttribute("maxlength",String(t.maxLength)):a.removeAttribute("maxlength"),{validity:a.validity,validationMessage:a.validationMessage}}equals({state:t},{state:i}){const a=t.type===i.type&&t.value===i.value&&t.required===i.required&&t.minLength===i.minLength&&t.maxLength===i.maxLength;return!We(t)||!We(i)?a:a&&t.pattern===i.pattern&&t.min===i.min&&t.max===i.max&&t.step===i.step}copy({state:t}){return{state:We(t)?this.copyInput(t):this.copyTextArea(t),renderedControl:null}}copyInput(t){const{type:i,pattern:a,min:o,max:r,step:n}=t;return{...this.copySharedState(t),type:i,pattern:a,min:o,max:r,step:n}}copyTextArea(t){return{...this.copySharedState(t),type:t.type}}copySharedState({value:t,required:i,minLength:a,maxLength:o}){return{value:t,required:i,minLength:a,maxLength:o}}}function We(e){return e.type!=="textarea"}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Qr=ke(Yr(Wr(qr(Vi(_)))));class k extends Qr{constructor(){super(...arguments),this.error=!1,this.errorText="",this.label="",this.noAsterisk=!1,this.required=!1,this.value="",this.prefixText="",this.suffixText="",this.hasLeadingIcon=!1,this.hasTrailingIcon=!1,this.supportingText="",this.textDirection="",this.rows=2,this.cols=20,this.inputMode="",this.max="",this.maxLength=-1,this.min="",this.minLength=-1,this.noSpinner=!1,this.pattern="",this.placeholder="",this.readOnly=!1,this.multiple=!1,this.step="",this.type="text",this.autocomplete="",this.dirty=!1,this.focused=!1,this.nativeError=!1,this.nativeErrorText=""}get selectionDirection(){return this.getInputOrTextarea().selectionDirection}set selectionDirection(t){this.getInputOrTextarea().selectionDirection=t}get selectionEnd(){return this.getInputOrTextarea().selectionEnd}set selectionEnd(t){this.getInputOrTextarea().selectionEnd=t}get selectionStart(){return this.getInputOrTextarea().selectionStart}set selectionStart(t){this.getInputOrTextarea().selectionStart=t}get valueAsNumber(){const t=this.getInput();return t?t.valueAsNumber:NaN}set valueAsNumber(t){const i=this.getInput();i&&(i.valueAsNumber=t,this.value=i.value)}get valueAsDate(){const t=this.getInput();return t?t.valueAsDate:null}set valueAsDate(t){const i=this.getInput();i&&(i.valueAsDate=t,this.value=i.value)}get hasError(){return this.error||this.nativeError}select(){this.getInputOrTextarea().select()}setRangeText(...t){this.getInputOrTextarea().setRangeText(...t),this.value=this.getInputOrTextarea().value}setSelectionRange(t,i,a){this.getInputOrTextarea().setSelectionRange(t,i,a)}showPicker(){const t=this.getInput();t&&t.showPicker()}stepDown(t){const i=this.getInput();i&&(i.stepDown(t),this.value=i.value)}stepUp(t){const i=this.getInput();i&&(i.stepUp(t),this.value=i.value)}reset(){this.dirty=!1,this.value=this.getAttribute("value")??"",this.nativeError=!1,this.nativeErrorText=""}attributeChangedCallback(t,i,a){t==="value"&&this.dirty||super.attributeChangedCallback(t,i,a)}render(){const t={disabled:this.disabled,error:!this.disabled&&this.hasError,textarea:this.type==="textarea","no-spinner":this.noSpinner};return s`
      <span class="text-field ${ae(t)}">
        ${this.renderField()}
      </span>
    `}updated(t){const i=this.getInputOrTextarea().value;this.value!==i&&(this.value=i)}renderField(){return Xi`<${this.fieldTag}
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
    `}renderInputOrTextarea(){const t={direction:this.textDirection},i=this.ariaLabel||this.label||l,a=this.autocomplete,o=(this.maxLength??-1)>-1,r=(this.minLength??-1)>-1;if(this.type==="textarea")return s`
        <textarea
          class="input"
          style=${ba(t)}
          aria-describedby="description"
          aria-invalid=${this.hasError}
          aria-label=${i}
          autocomplete=${a||l}
          name=${this.name||l}
          ?disabled=${this.disabled}
          maxlength=${o?this.maxLength:l}
          minlength=${r?this.minLength:l}
          placeholder=${this.placeholder||l}
          ?readonly=${this.readOnly}
          ?required=${this.required}
          rows=${this.rows}
          cols=${this.cols}
          .value=${ga(this.value)}
          @change=${this.redispatchEvent}
          @focus=${this.handleFocusChange}
          @blur=${this.handleFocusChange}
          @input=${this.handleInput}
          @select=${this.redispatchEvent}></textarea>
      `;const n=this.renderPrefix(),d=this.renderSuffix(),p=this.inputMode;return s`
      <div class="input-wrapper">
        ${n}
        <input
          class="input"
          style=${ba(t)}
          aria-describedby="description"
          aria-invalid=${this.hasError}
          aria-label=${i}
          autocomplete=${a||l}
          name=${this.name||l}
          ?disabled=${this.disabled}
          inputmode=${p||l}
          max=${this.max||l}
          maxlength=${o?this.maxLength:l}
          min=${this.min||l}
          minlength=${r?this.minLength:l}
          pattern=${this.pattern||l}
          placeholder=${this.placeholder||l}
          ?readonly=${this.readOnly}
          ?required=${this.required}
          ?multiple=${this.multiple}
          step=${this.step||l}
          type=${this.type}
          .value=${ga(this.value)}
          @change=${this.redispatchEvent}
          @focus=${this.handleFocusChange}
          @blur=${this.handleFocusChange}
          @input=${this.handleInput}
          @select=${this.redispatchEvent} />
        ${d}
      </div>
    `}renderPrefix(){return this.renderAffix(this.prefixText,!1)}renderSuffix(){return this.renderAffix(this.suffixText,!0)}renderAffix(t,i){return t?s`<span class="${ae({suffix:i,prefix:!i})}">${t}</span>`:l}getErrorText(){return this.error?this.errorText:this.nativeErrorText}handleFocusChange(){var t;this.focused=((t=this.inputOrTextarea)==null?void 0:t.matches(":focus"))??!1}handleInput(t){this.dirty=!0,this.value=t.target.value}redispatchEvent(t){Zi(this,t)}getInputOrTextarea(){return this.inputOrTextarea||(this.connectedCallback(),this.scheduleUpdate()),this.isUpdatePending&&this.scheduleUpdate(),this.inputOrTextarea}getInput(){return this.type==="textarea"?null:this.getInputOrTextarea()}handleIconChange(){this.hasLeadingIcon=this.leadingIcons.length>0,this.hasTrailingIcon=this.trailingIcons.length>0}[zt](){return this.value}formResetCallback(){this.reset()}formStateRestoreCallback(t){this.value=t}focus(){this.getInputOrTextarea().focus()}[xi](){return new Zr(()=>({state:this,renderedControl:this.inputOrTextarea}))}[wi](){return this.inputOrTextarea}[$i](t){var a;t==null||t.preventDefault();const i=this.getErrorText();this.nativeError=!!t,this.nativeErrorText=this.validationMessage,i===this.getErrorText()&&((a=this.field)==null||a.reannounceError())}}k.shadowRootOptions={..._.shadowRootOptions,delegatesFocus:!0};h([v({type:Boolean,reflect:!0})],k.prototype,"error",void 0);h([v({attribute:"error-text"})],k.prototype,"errorText",void 0);h([v()],k.prototype,"label",void 0);h([v({type:Boolean,attribute:"no-asterisk"})],k.prototype,"noAsterisk",void 0);h([v({type:Boolean,reflect:!0})],k.prototype,"required",void 0);h([v()],k.prototype,"value",void 0);h([v({attribute:"prefix-text"})],k.prototype,"prefixText",void 0);h([v({attribute:"suffix-text"})],k.prototype,"suffixText",void 0);h([v({type:Boolean,attribute:"has-leading-icon"})],k.prototype,"hasLeadingIcon",void 0);h([v({type:Boolean,attribute:"has-trailing-icon"})],k.prototype,"hasTrailingIcon",void 0);h([v({attribute:"supporting-text"})],k.prototype,"supportingText",void 0);h([v({attribute:"text-direction"})],k.prototype,"textDirection",void 0);h([v({type:Number})],k.prototype,"rows",void 0);h([v({type:Number})],k.prototype,"cols",void 0);h([v({reflect:!0})],k.prototype,"inputMode",void 0);h([v()],k.prototype,"max",void 0);h([v({type:Number})],k.prototype,"maxLength",void 0);h([v()],k.prototype,"min",void 0);h([v({type:Number})],k.prototype,"minLength",void 0);h([v({type:Boolean,attribute:"no-spinner"})],k.prototype,"noSpinner",void 0);h([v()],k.prototype,"pattern",void 0);h([v({reflect:!0,converter:Gr})],k.prototype,"placeholder",void 0);h([v({type:Boolean,reflect:!0})],k.prototype,"readOnly",void 0);h([v({type:Boolean,reflect:!0})],k.prototype,"multiple",void 0);h([v()],k.prototype,"step",void 0);h([v({reflect:!0})],k.prototype,"type",void 0);h([v({reflect:!0})],k.prototype,"autocomplete",void 0);h([c()],k.prototype,"dirty",void 0);h([c()],k.prototype,"focused",void 0);h([c()],k.prototype,"nativeError",void 0);h([c()],k.prototype,"nativeErrorText",void 0);h([S(".input")],k.prototype,"inputOrTextarea",void 0);h([S(".field")],k.prototype,"field",void 0);h([_e({slot:"leading-icon"})],k.prototype,"leadingIcons",void 0);h([_e({slot:"trailing-icon"})],k.prototype,"trailingIcons",void 0);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class es extends k{constructor(){super(...arguments),this.fieldTag=ve`md-filled-field`}}/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Ja=$`:host{display:inline-flex;outline:none;resize:both;text-align:start;-webkit-tap-highlight-color:rgba(0,0,0,0)}.text-field,.field{width:100%}.text-field{display:inline-flex}.field{cursor:text}.disabled .field{cursor:default}.text-field,.textarea .field{resize:inherit}slot[name=container]{border-radius:inherit}.icon{color:currentColor;display:flex;align-items:center;justify-content:center;fill:currentColor;position:relative}.icon ::slotted(*){display:flex;position:absolute}[has-start] .icon.leading{font-size:var(--_leading-icon-size);height:var(--_leading-icon-size);width:var(--_leading-icon-size)}[has-end] .icon.trailing{font-size:var(--_trailing-icon-size);height:var(--_trailing-icon-size);width:var(--_trailing-icon-size)}.input-wrapper{display:flex}.input-wrapper>*{all:inherit;padding:0}.input{caret-color:var(--_caret-color);overflow-x:hidden;text-align:inherit}.input::placeholder{color:currentColor;opacity:1}.input::-webkit-calendar-picker-indicator{display:none}.input::-webkit-search-decoration,.input::-webkit-search-cancel-button{display:none}@media(forced-colors: active){.input{background:none}}.no-spinner .input::-webkit-inner-spin-button,.no-spinner .input::-webkit-outer-spin-button{display:none}.no-spinner .input[type=number]{-moz-appearance:textfield}:focus-within .input{caret-color:var(--_focus-caret-color)}.error:focus-within .input{caret-color:var(--_error-focus-caret-color)}.text-field:not(.disabled) .prefix{color:var(--_input-text-prefix-color)}.text-field:not(.disabled) .suffix{color:var(--_input-text-suffix-color)}.text-field:not(.disabled) .input::placeholder{color:var(--_input-text-placeholder-color)}.prefix,.suffix{text-wrap:nowrap;width:min-content}.prefix{padding-inline-end:var(--_input-text-prefix-trailing-space)}.suffix{padding-inline-start:var(--_input-text-suffix-leading-space)}
`;/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let _i=class extends es{constructor(){super(...arguments),this.fieldTag=ve`md-filled-field`}};_i.styles=[Ja,Br];_i=h([I("md-filled-text-field")],_i);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class ts extends O{renderOutline(t){return s`
      <div class="outline">
        <div class="outline-start"></div>
        <div class="outline-notch">
          <div class="outline-panel-inactive"></div>
          <div class="outline-panel-active"></div>
          <div class="outline-label">${t}</div>
        </div>
        <div class="outline-end"></div>
      </div>
    `}}/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const is=$`@layer styles{:host{--_bottom-space: var(--md-outlined-field-bottom-space, 16px);--_content-color: var(--md-outlined-field-content-color, var(--md-sys-color-on-surface, #1d1b20));--_content-font: var(--md-outlined-field-content-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_content-line-height: var(--md-outlined-field-content-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_content-size: var(--md-outlined-field-content-size, var(--md-sys-typescale-body-large-size, 1rem));--_content-space: var(--md-outlined-field-content-space, 16px);--_content-weight: var(--md-outlined-field-content-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_disabled-content-color: var(--md-outlined-field-disabled-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-content-opacity: var(--md-outlined-field-disabled-content-opacity, 0.38);--_disabled-label-text-color: var(--md-outlined-field-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-outlined-field-disabled-label-text-opacity, 0.38);--_disabled-leading-content-color: var(--md-outlined-field-disabled-leading-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-leading-content-opacity: var(--md-outlined-field-disabled-leading-content-opacity, 0.38);--_disabled-outline-color: var(--md-outlined-field-disabled-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-outline-opacity: var(--md-outlined-field-disabled-outline-opacity, 0.12);--_disabled-outline-width: var(--md-outlined-field-disabled-outline-width, 1px);--_disabled-supporting-text-color: var(--md-outlined-field-disabled-supporting-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-supporting-text-opacity: var(--md-outlined-field-disabled-supporting-text-opacity, 0.38);--_disabled-trailing-content-color: var(--md-outlined-field-disabled-trailing-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-trailing-content-opacity: var(--md-outlined-field-disabled-trailing-content-opacity, 0.38);--_error-content-color: var(--md-outlined-field-error-content-color, var(--md-sys-color-on-surface, #1d1b20));--_error-focus-content-color: var(--md-outlined-field-error-focus-content-color, var(--md-sys-color-on-surface, #1d1b20));--_error-focus-label-text-color: var(--md-outlined-field-error-focus-label-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-leading-content-color: var(--md-outlined-field-error-focus-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-focus-outline-color: var(--md-outlined-field-error-focus-outline-color, var(--md-sys-color-error, #b3261e));--_error-focus-supporting-text-color: var(--md-outlined-field-error-focus-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-trailing-content-color: var(--md-outlined-field-error-focus-trailing-content-color, var(--md-sys-color-error, #b3261e));--_error-hover-content-color: var(--md-outlined-field-error-hover-content-color, var(--md-sys-color-on-surface, #1d1b20));--_error-hover-label-text-color: var(--md-outlined-field-error-hover-label-text-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-leading-content-color: var(--md-outlined-field-error-hover-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-hover-outline-color: var(--md-outlined-field-error-hover-outline-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-supporting-text-color: var(--md-outlined-field-error-hover-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-hover-trailing-content-color: var(--md-outlined-field-error-hover-trailing-content-color, var(--md-sys-color-on-error-container, #410e0b));--_error-label-text-color: var(--md-outlined-field-error-label-text-color, var(--md-sys-color-error, #b3261e));--_error-leading-content-color: var(--md-outlined-field-error-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-outline-color: var(--md-outlined-field-error-outline-color, var(--md-sys-color-error, #b3261e));--_error-supporting-text-color: var(--md-outlined-field-error-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-trailing-content-color: var(--md-outlined-field-error-trailing-content-color, var(--md-sys-color-error, #b3261e));--_focus-content-color: var(--md-outlined-field-focus-content-color, var(--md-sys-color-on-surface, #1d1b20));--_focus-label-text-color: var(--md-outlined-field-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_focus-leading-content-color: var(--md-outlined-field-focus-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-outline-color: var(--md-outlined-field-focus-outline-color, var(--md-sys-color-primary, #6750a4));--_focus-outline-width: var(--md-outlined-field-focus-outline-width, 3px);--_focus-supporting-text-color: var(--md-outlined-field-focus-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-trailing-content-color: var(--md-outlined-field-focus-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-content-color: var(--md-outlined-field-hover-content-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-label-text-color: var(--md-outlined-field-hover-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-leading-content-color: var(--md-outlined-field-hover-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-outline-color: var(--md-outlined-field-hover-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-outline-width: var(--md-outlined-field-hover-outline-width, 1px);--_hover-supporting-text-color: var(--md-outlined-field-hover-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-trailing-content-color: var(--md-outlined-field-hover-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-color: var(--md-outlined-field-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-font: var(--md-outlined-field-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-outlined-field-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_label-text-padding-bottom: var(--md-outlined-field-label-text-padding-bottom, 8px);--_label-text-populated-line-height: var(--md-outlined-field-label-text-populated-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_label-text-populated-size: var(--md-outlined-field-label-text-populated-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_label-text-size: var(--md-outlined-field-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_label-text-weight: var(--md-outlined-field-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_leading-content-color: var(--md-outlined-field-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_leading-space: var(--md-outlined-field-leading-space, 16px);--_outline-color: var(--md-outlined-field-outline-color, var(--md-sys-color-outline, #79747e));--_outline-label-padding: var(--md-outlined-field-outline-label-padding, 4px);--_outline-width: var(--md-outlined-field-outline-width, 1px);--_supporting-text-color: var(--md-outlined-field-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_supporting-text-font: var(--md-outlined-field-supporting-text-font, var(--md-sys-typescale-body-small-font, var(--md-ref-typeface-plain, Roboto)));--_supporting-text-leading-space: var(--md-outlined-field-supporting-text-leading-space, 16px);--_supporting-text-line-height: var(--md-outlined-field-supporting-text-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_supporting-text-size: var(--md-outlined-field-supporting-text-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_supporting-text-top-space: var(--md-outlined-field-supporting-text-top-space, 4px);--_supporting-text-trailing-space: var(--md-outlined-field-supporting-text-trailing-space, 16px);--_supporting-text-weight: var(--md-outlined-field-supporting-text-weight, var(--md-sys-typescale-body-small-weight, var(--md-ref-typeface-weight-regular, 400)));--_top-space: var(--md-outlined-field-top-space, 16px);--_trailing-content-color: var(--md-outlined-field-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_trailing-space: var(--md-outlined-field-trailing-space, 16px);--_with-leading-content-leading-space: var(--md-outlined-field-with-leading-content-leading-space, 12px);--_with-trailing-content-trailing-space: var(--md-outlined-field-with-trailing-content-trailing-space, 12px);--_container-shape-start-start: var(--md-outlined-field-container-shape-start-start, var(--md-outlined-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-start-end: var(--md-outlined-field-container-shape-start-end, var(--md-outlined-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-end-end: var(--md-outlined-field-container-shape-end-end, var(--md-outlined-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-end-start: var(--md-outlined-field-container-shape-end-start, var(--md-outlined-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)))}.outline{border-color:var(--_outline-color);border-radius:inherit;display:flex;pointer-events:none;height:100%;position:absolute;width:100%;z-index:1}.outline-start::before,.outline-start::after,.outline-panel-inactive::before,.outline-panel-inactive::after,.outline-panel-active::before,.outline-panel-active::after,.outline-end::before,.outline-end::after{border:inherit;content:"";inset:0;position:absolute}.outline-start,.outline-end{border:inherit;border-radius:inherit;box-sizing:border-box;position:relative}.outline-start::before,.outline-start::after,.outline-end::before,.outline-end::after{border-bottom-style:solid;border-top-style:solid}.outline-start::after,.outline-end::after{opacity:0;transition:opacity 150ms cubic-bezier(0.2, 0, 0, 1)}.focused .outline-start::after,.focused .outline-end::after{opacity:1}.outline-start::before,.outline-start::after{border-inline-start-style:solid;border-inline-end-style:none;border-start-start-radius:inherit;border-start-end-radius:0;border-end-start-radius:inherit;border-end-end-radius:0;margin-inline-end:var(--_outline-label-padding)}.outline-end{flex-grow:1;margin-inline-start:calc(-1*var(--_outline-label-padding))}.outline-end::before,.outline-end::after{border-inline-start-style:none;border-inline-end-style:solid;border-start-start-radius:0;border-start-end-radius:inherit;border-end-start-radius:0;border-end-end-radius:inherit}.outline-notch{align-items:flex-start;border:inherit;display:flex;margin-inline-start:calc(-1*var(--_outline-label-padding));margin-inline-end:var(--_outline-label-padding);max-width:calc(100% - var(--_leading-space) - var(--_trailing-space));padding:0 var(--_outline-label-padding);position:relative}.no-label .outline-notch{display:none}.outline-panel-inactive,.outline-panel-active{border:inherit;border-bottom-style:solid;inset:0;position:absolute}.outline-panel-inactive::before,.outline-panel-inactive::after,.outline-panel-active::before,.outline-panel-active::after{border-top-style:solid;border-bottom:none;bottom:auto;transform:scaleX(1);transition:transform 150ms cubic-bezier(0.2, 0, 0, 1)}.outline-panel-inactive::before,.outline-panel-active::before{right:50%;transform-origin:top left}.outline-panel-inactive::after,.outline-panel-active::after{left:50%;transform-origin:top right}.populated .outline-panel-inactive::before,.populated .outline-panel-inactive::after,.populated .outline-panel-active::before,.populated .outline-panel-active::after,.focused .outline-panel-inactive::before,.focused .outline-panel-inactive::after,.focused .outline-panel-active::before,.focused .outline-panel-active::after{transform:scaleX(0)}.outline-panel-active{opacity:0;transition:opacity 150ms cubic-bezier(0.2, 0, 0, 1)}.focused .outline-panel-active{opacity:1}.outline-label{display:flex;max-width:100%;transform:translateY(calc(-100% + var(--_label-text-padding-bottom)))}.outline-start,.field:not(.with-start) .content ::slotted(*){padding-inline-start:max(var(--_leading-space),max(var(--_container-shape-start-start),var(--_container-shape-end-start)) + var(--_outline-label-padding))}.field:not(.with-start) .label-wrapper{margin-inline-start:max(var(--_leading-space),max(var(--_container-shape-start-start),var(--_container-shape-end-start)) + var(--_outline-label-padding))}.field:not(.with-end) .content ::slotted(*){padding-inline-end:max(var(--_trailing-space),max(var(--_container-shape-start-end),var(--_container-shape-end-end)))}.field:not(.with-end) .label-wrapper{margin-inline-end:max(var(--_trailing-space),max(var(--_container-shape-start-end),var(--_container-shape-end-end)))}.outline-start::before,.outline-end::before,.outline-panel-inactive,.outline-panel-inactive::before,.outline-panel-inactive::after{border-width:var(--_outline-width)}:hover .outline{border-color:var(--_hover-outline-color);color:var(--_hover-outline-color)}:hover .outline-start::before,:hover .outline-end::before,:hover .outline-panel-inactive,:hover .outline-panel-inactive::before,:hover .outline-panel-inactive::after{border-width:var(--_hover-outline-width)}.focused .outline{border-color:var(--_focus-outline-color);color:var(--_focus-outline-color)}.outline-start::after,.outline-end::after,.outline-panel-active,.outline-panel-active::before,.outline-panel-active::after{border-width:var(--_focus-outline-width)}.disabled .outline{border-color:var(--_disabled-outline-color);color:var(--_disabled-outline-color)}.disabled .outline-start,.disabled .outline-end,.disabled .outline-panel-inactive{opacity:var(--_disabled-outline-opacity)}.disabled .outline-start::before,.disabled .outline-end::before,.disabled .outline-panel-inactive,.disabled .outline-panel-inactive::before,.disabled .outline-panel-inactive::after{border-width:var(--_disabled-outline-width)}.error .outline{border-color:var(--_error-outline-color);color:var(--_error-outline-color)}.error:hover .outline{border-color:var(--_error-hover-outline-color);color:var(--_error-hover-outline-color)}.error.focused .outline{border-color:var(--_error-focus-outline-color);color:var(--_error-focus-outline-color)}.resizable .container{bottom:var(--_focus-outline-width);inset-inline-end:var(--_focus-outline-width);clip-path:inset(var(--_focus-outline-width) 0 0 var(--_focus-outline-width))}.resizable .container>*{top:var(--_focus-outline-width);inset-inline-start:var(--_focus-outline-width)}.resizable .container:dir(rtl){clip-path:inset(var(--_focus-outline-width) var(--_focus-outline-width) 0 0)}}@layer hcm{@media(forced-colors: active){.disabled .outline{border-color:GrayText;color:GrayText}.disabled :is(.outline-start,.outline-end,.outline-panel-inactive){opacity:1}}}
`;/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let ki=class extends ts{};ki.styles=[Ya,is];ki=h([I("md-outlined-field")],ki);/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const as=$`:host{--_caret-color: var(--md-outlined-text-field-caret-color, var(--md-sys-color-primary, #6750a4));--_disabled-input-text-color: var(--md-outlined-text-field-disabled-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-input-text-opacity: var(--md-outlined-text-field-disabled-input-text-opacity, 0.38);--_disabled-label-text-color: var(--md-outlined-text-field-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-outlined-text-field-disabled-label-text-opacity, 0.38);--_disabled-leading-icon-color: var(--md-outlined-text-field-disabled-leading-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-leading-icon-opacity: var(--md-outlined-text-field-disabled-leading-icon-opacity, 0.38);--_disabled-outline-color: var(--md-outlined-text-field-disabled-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-outline-opacity: var(--md-outlined-text-field-disabled-outline-opacity, 0.12);--_disabled-outline-width: var(--md-outlined-text-field-disabled-outline-width, 1px);--_disabled-supporting-text-color: var(--md-outlined-text-field-disabled-supporting-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-supporting-text-opacity: var(--md-outlined-text-field-disabled-supporting-text-opacity, 0.38);--_disabled-trailing-icon-color: var(--md-outlined-text-field-disabled-trailing-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-trailing-icon-opacity: var(--md-outlined-text-field-disabled-trailing-icon-opacity, 0.38);--_error-focus-caret-color: var(--md-outlined-text-field-error-focus-caret-color, var(--md-sys-color-error, #b3261e));--_error-focus-input-text-color: var(--md-outlined-text-field-error-focus-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_error-focus-label-text-color: var(--md-outlined-text-field-error-focus-label-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-leading-icon-color: var(--md-outlined-text-field-error-focus-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-focus-outline-color: var(--md-outlined-text-field-error-focus-outline-color, var(--md-sys-color-error, #b3261e));--_error-focus-supporting-text-color: var(--md-outlined-text-field-error-focus-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-trailing-icon-color: var(--md-outlined-text-field-error-focus-trailing-icon-color, var(--md-sys-color-error, #b3261e));--_error-hover-input-text-color: var(--md-outlined-text-field-error-hover-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_error-hover-label-text-color: var(--md-outlined-text-field-error-hover-label-text-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-leading-icon-color: var(--md-outlined-text-field-error-hover-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-hover-outline-color: var(--md-outlined-text-field-error-hover-outline-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-supporting-text-color: var(--md-outlined-text-field-error-hover-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-hover-trailing-icon-color: var(--md-outlined-text-field-error-hover-trailing-icon-color, var(--md-sys-color-on-error-container, #410e0b));--_error-input-text-color: var(--md-outlined-text-field-error-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_error-label-text-color: var(--md-outlined-text-field-error-label-text-color, var(--md-sys-color-error, #b3261e));--_error-leading-icon-color: var(--md-outlined-text-field-error-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-outline-color: var(--md-outlined-text-field-error-outline-color, var(--md-sys-color-error, #b3261e));--_error-supporting-text-color: var(--md-outlined-text-field-error-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-trailing-icon-color: var(--md-outlined-text-field-error-trailing-icon-color, var(--md-sys-color-error, #b3261e));--_focus-input-text-color: var(--md-outlined-text-field-focus-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_focus-label-text-color: var(--md-outlined-text-field-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_focus-leading-icon-color: var(--md-outlined-text-field-focus-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-outline-color: var(--md-outlined-text-field-focus-outline-color, var(--md-sys-color-primary, #6750a4));--_focus-outline-width: var(--md-outlined-text-field-focus-outline-width, 3px);--_focus-supporting-text-color: var(--md-outlined-text-field-focus-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-trailing-icon-color: var(--md-outlined-text-field-focus-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-input-text-color: var(--md-outlined-text-field-hover-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-label-text-color: var(--md-outlined-text-field-hover-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-leading-icon-color: var(--md-outlined-text-field-hover-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-outline-color: var(--md-outlined-text-field-hover-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-outline-width: var(--md-outlined-text-field-hover-outline-width, 1px);--_hover-supporting-text-color: var(--md-outlined-text-field-hover-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-trailing-icon-color: var(--md-outlined-text-field-hover-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-color: var(--md-outlined-text-field-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_input-text-font: var(--md-outlined-text-field-input-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_input-text-line-height: var(--md-outlined-text-field-input-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_input-text-placeholder-color: var(--md-outlined-text-field-input-text-placeholder-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-prefix-color: var(--md-outlined-text-field-input-text-prefix-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-size: var(--md-outlined-text-field-input-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_input-text-suffix-color: var(--md-outlined-text-field-input-text-suffix-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-weight: var(--md-outlined-text-field-input-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_label-text-color: var(--md-outlined-text-field-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-font: var(--md-outlined-text-field-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-outlined-text-field-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_label-text-populated-line-height: var(--md-outlined-text-field-label-text-populated-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_label-text-populated-size: var(--md-outlined-text-field-label-text-populated-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_label-text-size: var(--md-outlined-text-field-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_label-text-weight: var(--md-outlined-text-field-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_leading-icon-color: var(--md-outlined-text-field-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_leading-icon-size: var(--md-outlined-text-field-leading-icon-size, 24px);--_outline-color: var(--md-outlined-text-field-outline-color, var(--md-sys-color-outline, #79747e));--_outline-width: var(--md-outlined-text-field-outline-width, 1px);--_supporting-text-color: var(--md-outlined-text-field-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_supporting-text-font: var(--md-outlined-text-field-supporting-text-font, var(--md-sys-typescale-body-small-font, var(--md-ref-typeface-plain, Roboto)));--_supporting-text-line-height: var(--md-outlined-text-field-supporting-text-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_supporting-text-size: var(--md-outlined-text-field-supporting-text-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_supporting-text-weight: var(--md-outlined-text-field-supporting-text-weight, var(--md-sys-typescale-body-small-weight, var(--md-ref-typeface-weight-regular, 400)));--_trailing-icon-color: var(--md-outlined-text-field-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_trailing-icon-size: var(--md-outlined-text-field-trailing-icon-size, 24px);--_container-shape-start-start: var(--md-outlined-text-field-container-shape-start-start, var(--md-outlined-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-start-end: var(--md-outlined-text-field-container-shape-start-end, var(--md-outlined-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-end-end: var(--md-outlined-text-field-container-shape-end-end, var(--md-outlined-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-end-start: var(--md-outlined-text-field-container-shape-end-start, var(--md-outlined-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_icon-input-space: var(--md-outlined-text-field-icon-input-space, 16px);--_leading-space: var(--md-outlined-text-field-leading-space, 16px);--_trailing-space: var(--md-outlined-text-field-trailing-space, 16px);--_top-space: var(--md-outlined-text-field-top-space, 16px);--_bottom-space: var(--md-outlined-text-field-bottom-space, 16px);--_input-text-prefix-trailing-space: var(--md-outlined-text-field-input-text-prefix-trailing-space, 2px);--_input-text-suffix-leading-space: var(--md-outlined-text-field-input-text-suffix-leading-space, 2px);--_focus-caret-color: var(--md-outlined-text-field-focus-caret-color, var(--md-sys-color-primary, #6750a4));--_with-leading-icon-leading-space: var(--md-outlined-text-field-with-leading-icon-leading-space, 12px);--_with-trailing-icon-trailing-space: var(--md-outlined-text-field-with-trailing-icon-trailing-space, 12px);--md-outlined-field-bottom-space: var(--_bottom-space);--md-outlined-field-container-shape-end-end: var(--_container-shape-end-end);--md-outlined-field-container-shape-end-start: var(--_container-shape-end-start);--md-outlined-field-container-shape-start-end: var(--_container-shape-start-end);--md-outlined-field-container-shape-start-start: var(--_container-shape-start-start);--md-outlined-field-content-color: var(--_input-text-color);--md-outlined-field-content-font: var(--_input-text-font);--md-outlined-field-content-line-height: var(--_input-text-line-height);--md-outlined-field-content-size: var(--_input-text-size);--md-outlined-field-content-space: var(--_icon-input-space);--md-outlined-field-content-weight: var(--_input-text-weight);--md-outlined-field-disabled-content-color: var(--_disabled-input-text-color);--md-outlined-field-disabled-content-opacity: var(--_disabled-input-text-opacity);--md-outlined-field-disabled-label-text-color: var(--_disabled-label-text-color);--md-outlined-field-disabled-label-text-opacity: var(--_disabled-label-text-opacity);--md-outlined-field-disabled-leading-content-color: var(--_disabled-leading-icon-color);--md-outlined-field-disabled-leading-content-opacity: var(--_disabled-leading-icon-opacity);--md-outlined-field-disabled-outline-color: var(--_disabled-outline-color);--md-outlined-field-disabled-outline-opacity: var(--_disabled-outline-opacity);--md-outlined-field-disabled-outline-width: var(--_disabled-outline-width);--md-outlined-field-disabled-supporting-text-color: var(--_disabled-supporting-text-color);--md-outlined-field-disabled-supporting-text-opacity: var(--_disabled-supporting-text-opacity);--md-outlined-field-disabled-trailing-content-color: var(--_disabled-trailing-icon-color);--md-outlined-field-disabled-trailing-content-opacity: var(--_disabled-trailing-icon-opacity);--md-outlined-field-error-content-color: var(--_error-input-text-color);--md-outlined-field-error-focus-content-color: var(--_error-focus-input-text-color);--md-outlined-field-error-focus-label-text-color: var(--_error-focus-label-text-color);--md-outlined-field-error-focus-leading-content-color: var(--_error-focus-leading-icon-color);--md-outlined-field-error-focus-outline-color: var(--_error-focus-outline-color);--md-outlined-field-error-focus-supporting-text-color: var(--_error-focus-supporting-text-color);--md-outlined-field-error-focus-trailing-content-color: var(--_error-focus-trailing-icon-color);--md-outlined-field-error-hover-content-color: var(--_error-hover-input-text-color);--md-outlined-field-error-hover-label-text-color: var(--_error-hover-label-text-color);--md-outlined-field-error-hover-leading-content-color: var(--_error-hover-leading-icon-color);--md-outlined-field-error-hover-outline-color: var(--_error-hover-outline-color);--md-outlined-field-error-hover-supporting-text-color: var(--_error-hover-supporting-text-color);--md-outlined-field-error-hover-trailing-content-color: var(--_error-hover-trailing-icon-color);--md-outlined-field-error-label-text-color: var(--_error-label-text-color);--md-outlined-field-error-leading-content-color: var(--_error-leading-icon-color);--md-outlined-field-error-outline-color: var(--_error-outline-color);--md-outlined-field-error-supporting-text-color: var(--_error-supporting-text-color);--md-outlined-field-error-trailing-content-color: var(--_error-trailing-icon-color);--md-outlined-field-focus-content-color: var(--_focus-input-text-color);--md-outlined-field-focus-label-text-color: var(--_focus-label-text-color);--md-outlined-field-focus-leading-content-color: var(--_focus-leading-icon-color);--md-outlined-field-focus-outline-color: var(--_focus-outline-color);--md-outlined-field-focus-outline-width: var(--_focus-outline-width);--md-outlined-field-focus-supporting-text-color: var(--_focus-supporting-text-color);--md-outlined-field-focus-trailing-content-color: var(--_focus-trailing-icon-color);--md-outlined-field-hover-content-color: var(--_hover-input-text-color);--md-outlined-field-hover-label-text-color: var(--_hover-label-text-color);--md-outlined-field-hover-leading-content-color: var(--_hover-leading-icon-color);--md-outlined-field-hover-outline-color: var(--_hover-outline-color);--md-outlined-field-hover-outline-width: var(--_hover-outline-width);--md-outlined-field-hover-supporting-text-color: var(--_hover-supporting-text-color);--md-outlined-field-hover-trailing-content-color: var(--_hover-trailing-icon-color);--md-outlined-field-label-text-color: var(--_label-text-color);--md-outlined-field-label-text-font: var(--_label-text-font);--md-outlined-field-label-text-line-height: var(--_label-text-line-height);--md-outlined-field-label-text-populated-line-height: var(--_label-text-populated-line-height);--md-outlined-field-label-text-populated-size: var(--_label-text-populated-size);--md-outlined-field-label-text-size: var(--_label-text-size);--md-outlined-field-label-text-weight: var(--_label-text-weight);--md-outlined-field-leading-content-color: var(--_leading-icon-color);--md-outlined-field-leading-space: var(--_leading-space);--md-outlined-field-outline-color: var(--_outline-color);--md-outlined-field-outline-width: var(--_outline-width);--md-outlined-field-supporting-text-color: var(--_supporting-text-color);--md-outlined-field-supporting-text-font: var(--_supporting-text-font);--md-outlined-field-supporting-text-line-height: var(--_supporting-text-line-height);--md-outlined-field-supporting-text-size: var(--_supporting-text-size);--md-outlined-field-supporting-text-weight: var(--_supporting-text-weight);--md-outlined-field-top-space: var(--_top-space);--md-outlined-field-trailing-content-color: var(--_trailing-icon-color);--md-outlined-field-trailing-space: var(--_trailing-space);--md-outlined-field-with-leading-content-leading-space: var(--_with-leading-icon-leading-space);--md-outlined-field-with-trailing-content-trailing-space: var(--_with-trailing-icon-trailing-space)}
`;/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class os extends k{constructor(){super(...arguments),this.fieldTag=ve`md-outlined-field`}}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let Ci=class extends os{constructor(){super(...arguments),this.fieldTag=ve`md-outlined-field`}};Ci.styles=[Ja,as];Ci=h([I("md-outlined-text-field")],Ci);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const rs=ke(_);class lt extends rs{constructor(){super(...arguments),this.value=0,this.max=1,this.indeterminate=!1,this.fourColor=!1}render(){const{ariaLabel:t}=this;return s`
      <div
        class="progress ${ae(this.getRenderClasses())}"
        role="progressbar"
        aria-label="${t||l}"
        aria-valuemin="0"
        aria-valuemax=${this.max}
        aria-valuenow=${this.indeterminate?l:this.value}
        >${this.renderIndicator()}</div
      >
    `}getRenderClasses(){return{indeterminate:this.indeterminate,"four-color":this.fourColor}}}h([v({type:Number})],lt.prototype,"value",void 0);h([v({type:Number})],lt.prototype,"max",void 0);h([v({type:Boolean})],lt.prototype,"indeterminate",void 0);h([v({type:Boolean,attribute:"four-color"})],lt.prototype,"fourColor",void 0);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class ss extends lt{renderIndicator(){return this.indeterminate?this.renderIndeterminateContainer():this.renderDeterminateContainer()}renderDeterminateContainer(){const t=(1-this.value/this.max)*100;return s`
      <svg viewBox="0 0 4800 4800">
        <circle class="track" pathLength="100"></circle>
        <circle
          class="active-track"
          pathLength="100"
          stroke-dashoffset=${t}></circle>
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
 */const ns=$`:host{--_active-indicator-color: var(--md-circular-progress-active-indicator-color, var(--md-sys-color-primary, #6750a4));--_active-indicator-width: var(--md-circular-progress-active-indicator-width, 10);--_four-color-active-indicator-four-color: var(--md-circular-progress-four-color-active-indicator-four-color, var(--md-sys-color-tertiary-container, #ffd8e4));--_four-color-active-indicator-one-color: var(--md-circular-progress-four-color-active-indicator-one-color, var(--md-sys-color-primary, #6750a4));--_four-color-active-indicator-three-color: var(--md-circular-progress-four-color-active-indicator-three-color, var(--md-sys-color-tertiary, #7d5260));--_four-color-active-indicator-two-color: var(--md-circular-progress-four-color-active-indicator-two-color, var(--md-sys-color-primary-container, #eaddff));--_size: var(--md-circular-progress-size, 48px);display:inline-flex;vertical-align:middle;width:var(--_size);height:var(--_size);position:relative;align-items:center;justify-content:center;contain:strict;content-visibility:auto}.progress{flex:1;align-self:stretch;margin:4px}.progress,.spinner,.left,.right,.circle,svg,.track,.active-track{position:absolute;inset:0}svg{transform:rotate(-90deg)}circle{cx:50%;cy:50%;r:calc(50%*(1 - var(--_active-indicator-width)/100));stroke-width:calc(var(--_active-indicator-width)*1%);stroke-dasharray:100;fill:rgba(0,0,0,0)}.active-track{transition:stroke-dashoffset 500ms cubic-bezier(0, 0, 0.2, 1);stroke:var(--_active-indicator-color)}.track{stroke:rgba(0,0,0,0)}.progress.indeterminate{animation:linear infinite linear-rotate;animation-duration:1568.2352941176ms}.spinner{animation:infinite both rotate-arc;animation-duration:5332ms;animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1)}.left{overflow:hidden;inset:0 50% 0 0}.right{overflow:hidden;inset:0 0 0 50%}.circle{box-sizing:border-box;border-radius:50%;border:solid calc(var(--_active-indicator-width)/100*(var(--_size) - 8px));border-color:var(--_active-indicator-color) var(--_active-indicator-color) rgba(0,0,0,0) rgba(0,0,0,0);animation:expand-arc;animation-iteration-count:infinite;animation-fill-mode:both;animation-duration:1333ms,5332ms;animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1)}.four-color .circle{animation-name:expand-arc,four-color}.left .circle{rotate:135deg;inset:0 -100% 0 0}.right .circle{rotate:100deg;inset:0 0 0 -100%;animation-delay:-666.5ms,0ms}@media(forced-colors: active){.active-track{stroke:CanvasText}.circle{border-color:CanvasText CanvasText Canvas Canvas}}@keyframes expand-arc{0%{transform:rotate(265deg)}50%{transform:rotate(130deg)}100%{transform:rotate(265deg)}}@keyframes rotate-arc{12.5%{transform:rotate(135deg)}25%{transform:rotate(270deg)}37.5%{transform:rotate(405deg)}50%{transform:rotate(540deg)}62.5%{transform:rotate(675deg)}75%{transform:rotate(810deg)}87.5%{transform:rotate(945deg)}100%{transform:rotate(1080deg)}}@keyframes linear-rotate{to{transform:rotate(360deg)}}@keyframes four-color{0%{border-top-color:var(--_four-color-active-indicator-one-color);border-right-color:var(--_four-color-active-indicator-one-color)}15%{border-top-color:var(--_four-color-active-indicator-one-color);border-right-color:var(--_four-color-active-indicator-one-color)}25%{border-top-color:var(--_four-color-active-indicator-two-color);border-right-color:var(--_four-color-active-indicator-two-color)}40%{border-top-color:var(--_four-color-active-indicator-two-color);border-right-color:var(--_four-color-active-indicator-two-color)}50%{border-top-color:var(--_four-color-active-indicator-three-color);border-right-color:var(--_four-color-active-indicator-three-color)}65%{border-top-color:var(--_four-color-active-indicator-three-color);border-right-color:var(--_four-color-active-indicator-three-color)}75%{border-top-color:var(--_four-color-active-indicator-four-color);border-right-color:var(--_four-color-active-indicator-four-color)}90%{border-top-color:var(--_four-color-active-indicator-four-color);border-right-color:var(--_four-color-active-indicator-four-color)}100%{border-top-color:var(--_four-color-active-indicator-one-color);border-right-color:var(--_four-color-active-indicator-one-color)}}
`;/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let Ii=class extends ss{};Ii.styles=[ns];Ii=h([I("md-circular-progress")],Ii);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Gt extends _{constructor(){super(...arguments),this.inset=!1,this.insetStart=!1,this.insetEnd=!1}}h([v({type:Boolean,reflect:!0})],Gt.prototype,"inset",void 0);h([v({type:Boolean,reflect:!0,attribute:"inset-start"})],Gt.prototype,"insetStart",void 0);h([v({type:Boolean,reflect:!0,attribute:"inset-end"})],Gt.prototype,"insetEnd",void 0);/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const ls=$`:host{box-sizing:border-box;color:var(--md-divider-color, var(--md-sys-color-outline-variant, #cac4d0));display:flex;height:var(--md-divider-thickness, 1px);width:100%}:host([inset]),:host([inset-start]){padding-inline-start:16px}:host([inset]),:host([inset-end]){padding-inline-end:16px}:host::before{background:currentColor;content:"";height:100%;width:100%}@media(forced-colors: active){:host::before{background:CanvasText}}
`;/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let Ti=class extends Gt{};Ti.styles=[ls];Ti=h([I("md-divider")],Ti);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const ds={dialog:[[[{transform:"translateY(-50px)"},{transform:"translateY(0)"}],{duration:500,easing:Pe.EMPHASIZED}]],scrim:[[[{opacity:0},{opacity:.32}],{duration:500,easing:"linear"}]],container:[[[{opacity:0},{opacity:1}],{duration:50,easing:"linear",pseudoElement:"::before"}],[[{height:"35%"},{height:"100%"}],{duration:500,easing:Pe.EMPHASIZED,pseudoElement:"::before"}]],headline:[[[{opacity:0},{opacity:0,offset:.2},{opacity:1}],{duration:250,easing:"linear",fill:"forwards"}]],content:[[[{opacity:0},{opacity:0,offset:.2},{opacity:1}],{duration:250,easing:"linear",fill:"forwards"}]],actions:[[[{opacity:0},{opacity:0,offset:.5},{opacity:1}],{duration:300,easing:"linear",fill:"forwards"}]]},cs={dialog:[[[{transform:"translateY(0)"},{transform:"translateY(-50px)"}],{duration:150,easing:Pe.EMPHASIZED_ACCELERATE}]],scrim:[[[{opacity:.32},{opacity:0}],{duration:150,easing:"linear"}]],container:[[[{height:"100%"},{height:"35%"}],{duration:150,easing:Pe.EMPHASIZED_ACCELERATE,pseudoElement:"::before"}],[[{opacity:"1"},{opacity:"0"}],{delay:100,duration:50,easing:"linear",pseudoElement:"::before"}]],headline:[[[{opacity:1},{opacity:0}],{duration:100,easing:"linear",fill:"forwards"}]],content:[[[{opacity:1},{opacity:0}],{duration:100,easing:"linear",fill:"forwards"}]],actions:[[[{opacity:1},{opacity:0}],{duration:100,easing:"linear",fill:"forwards"}]]};/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const ps=ke(_);class R extends ps{get open(){return this.isOpen}set open(t){t!==this.isOpen&&(this.isOpen=t,t?(this.setAttribute("open",""),this.show()):(this.removeAttribute("open"),this.close()))}constructor(){super(),this.quick=!1,this.returnValue="",this.noFocusTrap=!1,this.getOpenAnimation=()=>ds,this.getCloseAnimation=()=>cs,this.isOpen=!1,this.isOpening=!1,this.isConnectedPromise=this.getIsConnectedPromise(),this.isAtScrollTop=!1,this.isAtScrollBottom=!1,this.nextClickIsFromContent=!1,this.hasHeadline=!1,this.hasActions=!1,this.hasIcon=!1,this.escapePressedWithoutCancel=!1,this.treewalker=document.createTreeWalker(this,NodeFilter.SHOW_ELEMENT),this.addEventListener("submit",this.handleSubmit)}async show(){var a;this.isOpening=!0,await this.isConnectedPromise,await this.updateComplete;const t=this.dialog;if(t.open||!this.isOpening){this.isOpening=!1;return}if(!this.dispatchEvent(new Event("open",{cancelable:!0}))){this.open=!1,this.isOpening=!1;return}t.showModal(),this.open=!0,this.scroller&&(this.scroller.scrollTop=0),(a=this.querySelector("[autofocus]"))==null||a.focus(),await this.animateDialog(this.getOpenAnimation()),this.dispatchEvent(new Event("opened")),this.isOpening=!1}async close(t=this.returnValue){if(this.isOpening=!1,!this.isConnected){this.open=!1;return}await this.updateComplete;const i=this.dialog;if(!i.open||this.isOpening){this.open=!1;return}const a=this.returnValue;if(this.returnValue=t,!this.dispatchEvent(new Event("close",{cancelable:!0}))){this.returnValue=a;return}await this.animateDialog(this.getCloseAnimation()),i.close(t),this.open=!1,this.dispatchEvent(new Event("closed"))}connectedCallback(){super.connectedCallback(),this.isConnectedPromiseResolve()}disconnectedCallback(){super.disconnectedCallback(),this.isConnectedPromise=this.getIsConnectedPromise()}render(){const t=this.open&&!(this.isAtScrollTop&&this.isAtScrollBottom),i={"has-headline":this.hasHeadline,"has-actions":this.hasActions,"has-icon":this.hasIcon,scrollable:t,"show-top-divider":t&&!this.isAtScrollTop,"show-bottom-divider":t&&!this.isAtScrollBottom},a=this.open&&!this.noFocusTrap,o=s`
      <div
        class="focus-trap"
        tabindex="0"
        aria-hidden="true"
        @focus=${this.handleFocusTrapFocus}></div>
    `,{ariaLabel:r}=this;return s`
      <div class="scrim"></div>
      <dialog
        class=${ae(i)}
        aria-label=${r||l}
        aria-labelledby=${this.hasHeadline?"headline":l}
        role=${this.type==="alert"?"alertdialog":l}
        @cancel=${this.handleCancel}
        @click=${this.handleDialogClick}
        @close=${this.handleClose}
        @keydown=${this.handleKeydown}
        .returnValue=${this.returnValue||l}>
        ${a?o:l}
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
        ${a?o:l}
      </dialog>
    `}firstUpdated(){this.intersectionObserver=new IntersectionObserver(t=>{for(const i of t)this.handleAnchorIntersection(i)},{root:this.scroller}),this.intersectionObserver.observe(this.topAnchor),this.intersectionObserver.observe(this.bottomAnchor)}handleDialogClick(){if(this.nextClickIsFromContent){this.nextClickIsFromContent=!1;return}this.dispatchEvent(new Event("cancel",{cancelable:!0}))&&this.close()}handleContentClick(){this.nextClickIsFromContent=!0}handleSubmit(t){const i=t.target,{submitter:a}=t;i.getAttribute("method")!=="dialog"||!a||this.close(a.getAttribute("value")??this.returnValue)}handleCancel(t){if(t.target!==this.dialog)return;this.escapePressedWithoutCancel=!1;const i=!Zi(this,t);t.preventDefault(),!i&&this.close()}handleClose(){var t;this.escapePressedWithoutCancel&&(this.escapePressedWithoutCancel=!1,(t=this.dialog)==null||t.dispatchEvent(new Event("cancel",{cancelable:!0})))}handleKeydown(t){t.key==="Escape"&&(this.escapePressedWithoutCancel=!0,setTimeout(()=>{this.escapePressedWithoutCancel=!1}))}async animateDialog(t){var j;if((j=this.cancelAnimations)==null||j.abort(),this.cancelAnimations=new AbortController,this.quick)return;const{dialog:i,scrim:a,container:o,headline:r,content:n,actions:d}=this;if(!i||!a||!o||!r||!n||!d)return;const{container:p,dialog:f,scrim:g,headline:m,content:y,actions:C}=t,W=[[i,f??[]],[a,g??[]],[o,p??[]],[r,m??[]],[n,y??[]],[d,C??[]]],se=[];for(const[B,L]of W)for(const je of L){const He=B.animate(...je);this.cancelAnimations.signal.addEventListener("abort",()=>{He.cancel()}),se.push(He)}await Promise.all(se.map(B=>B.finished.catch(()=>{})))}handleHeadlineChange(t){const i=t.target;this.hasHeadline=i.assignedElements().length>0}handleActionsChange(t){const i=t.target;this.hasActions=i.assignedElements().length>0}handleIconChange(t){const i=t.target;this.hasIcon=i.assignedElements().length>0}handleAnchorIntersection(t){const{target:i,isIntersecting:a}=t;i===this.topAnchor&&(this.isAtScrollTop=a),i===this.bottomAnchor&&(this.isAtScrollBottom=a)}getIsConnectedPromise(){return new Promise(t=>{this.isConnectedPromiseResolve=t})}handleFocusTrapFocus(t){var m;const[i,a]=this.getFirstAndLastFocusableChildren();if(!i||!a){(m=this.dialog)==null||m.focus();return}const o=t.target===this.firstFocusTrap,r=!o,n=t.relatedTarget===i,d=t.relatedTarget===a,p=!n&&!d;if(r&&d||o&&p){i.focus();return}if(o&&n||r&&p){a.focus();return}}getFirstAndLastFocusableChildren(){if(!this.treewalker)return[null,null];let t=null,i=null;for(this.treewalker.currentNode=this.treewalker.root;this.treewalker.nextNode();){const a=this.treewalker.currentNode;hs(a)&&(t||(t=a),i=a)}return[t,i]}}h([v({type:Boolean})],R.prototype,"open",null);h([v({type:Boolean})],R.prototype,"quick",void 0);h([v({attribute:!1})],R.prototype,"returnValue",void 0);h([v()],R.prototype,"type",void 0);h([v({type:Boolean,attribute:"no-focus-trap"})],R.prototype,"noFocusTrap",void 0);h([S("dialog")],R.prototype,"dialog",void 0);h([S(".scrim")],R.prototype,"scrim",void 0);h([S(".container")],R.prototype,"container",void 0);h([S(".headline")],R.prototype,"headline",void 0);h([S(".content")],R.prototype,"content",void 0);h([S(".actions")],R.prototype,"actions",void 0);h([c()],R.prototype,"isAtScrollTop",void 0);h([c()],R.prototype,"isAtScrollBottom",void 0);h([S(".scroller")],R.prototype,"scroller",void 0);h([S(".top.anchor")],R.prototype,"topAnchor",void 0);h([S(".bottom.anchor")],R.prototype,"bottomAnchor",void 0);h([S(".focus-trap")],R.prototype,"firstFocusTrap",void 0);h([c()],R.prototype,"hasHeadline",void 0);h([c()],R.prototype,"hasActions",void 0);h([c()],R.prototype,"hasIcon",void 0);function hs(e){var r;const t=":is(button,input,select,textarea,object,:is(a,area)[href],[tabindex],[contenteditable=true])",i=":not(:disabled,[disabled])";return e.matches(t+i+':not([tabindex^="-"])')?!0:!e.localName.includes("-")||!e.matches(i)?!1:((r=e.shadowRoot)==null?void 0:r.delegatesFocus)??!1}/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const us=$`:host{border-start-start-radius:var(--md-dialog-container-shape-start-start, var(--md-dialog-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));border-start-end-radius:var(--md-dialog-container-shape-start-end, var(--md-dialog-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));border-end-end-radius:var(--md-dialog-container-shape-end-end, var(--md-dialog-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));border-end-start-radius:var(--md-dialog-container-shape-end-start, var(--md-dialog-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));display:contents;margin:auto;max-height:min(560px,100% - 48px);max-width:min(560px,100% - 48px);min-height:140px;min-width:280px;position:fixed;height:fit-content;width:fit-content}dialog{background:rgba(0,0,0,0);border:none;border-radius:inherit;flex-direction:column;height:inherit;margin:inherit;max-height:inherit;max-width:inherit;min-height:inherit;min-width:inherit;outline:none;overflow:visible;padding:0;width:inherit}dialog[open]{display:flex}::backdrop{background:none}.scrim{background:var(--md-sys-color-scrim, #000);display:none;inset:0;opacity:32%;pointer-events:none;position:fixed;z-index:1}:host([open]) .scrim{display:flex}h2{all:unset;align-self:stretch}.headline{align-items:center;color:var(--md-dialog-headline-color, var(--md-sys-color-on-surface, #1d1b20));display:flex;flex-direction:column;font-family:var(--md-dialog-headline-font, var(--md-sys-typescale-headline-small-font, var(--md-ref-typeface-brand, Roboto)));font-size:var(--md-dialog-headline-size, var(--md-sys-typescale-headline-small-size, 1.5rem));line-height:var(--md-dialog-headline-line-height, var(--md-sys-typescale-headline-small-line-height, 2rem));font-weight:var(--md-dialog-headline-weight, var(--md-sys-typescale-headline-small-weight, var(--md-ref-typeface-weight-regular, 400)));position:relative}slot[name=headline]::slotted(*){align-items:center;align-self:stretch;box-sizing:border-box;display:flex;gap:8px;padding:24px 24px 0}.icon{display:flex}slot[name=icon]::slotted(*){color:var(--md-dialog-icon-color, var(--md-sys-color-secondary, #625b71));fill:currentColor;font-size:var(--md-dialog-icon-size, 24px);margin-top:24px;height:var(--md-dialog-icon-size, 24px);width:var(--md-dialog-icon-size, 24px)}.has-icon slot[name=headline]::slotted(*){justify-content:center;padding-top:16px}.scrollable slot[name=headline]::slotted(*){padding-bottom:16px}.scrollable.has-headline slot[name=content]::slotted(*){padding-top:8px}.container{border-radius:inherit;display:flex;flex-direction:column;flex-grow:1;overflow:hidden;position:relative;transform-origin:top}.container::before{background:var(--md-dialog-container-color, var(--md-sys-color-surface-container-high, #ece6f0));border-radius:inherit;content:"";inset:0;position:absolute}.scroller{display:flex;flex:1;flex-direction:column;overflow:hidden;z-index:1}.scrollable .scroller{overflow-y:scroll}.content{color:var(--md-dialog-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));font-family:var(--md-dialog-supporting-text-font, var(--md-sys-typescale-body-medium-font, var(--md-ref-typeface-plain, Roboto)));font-size:var(--md-dialog-supporting-text-size, var(--md-sys-typescale-body-medium-size, 0.875rem));line-height:var(--md-dialog-supporting-text-line-height, var(--md-sys-typescale-body-medium-line-height, 1.25rem));flex:1;font-weight:var(--md-dialog-supporting-text-weight, var(--md-sys-typescale-body-medium-weight, var(--md-ref-typeface-weight-regular, 400)));height:min-content;position:relative}slot[name=content]::slotted(*){box-sizing:border-box;padding:24px}.anchor{position:absolute}.top.anchor{top:0}.bottom.anchor{bottom:0}.actions{position:relative}slot[name=actions]::slotted(*){box-sizing:border-box;display:flex;gap:8px;justify-content:flex-end;padding:16px 24px 24px}.has-actions slot[name=content]::slotted(*){padding-bottom:8px}md-divider{display:none;position:absolute}.has-headline.show-top-divider .headline md-divider,.has-actions.show-bottom-divider .actions md-divider{display:flex}.headline md-divider{bottom:0}.actions md-divider{top:0}@media(forced-colors: active){dialog{outline:2px solid WindowText}}
`;/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let Si=class extends R{};Si.styles=[us];Si=h([I("md-dialog")],Si);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const ms=ke(_);class ge extends ms{get rippleDisabled(){return this.disabled||this.softDisabled}constructor(){super(),this.disabled=!1,this.softDisabled=!1,this.alwaysFocusable=!1,this.label="",this.hasIcon=!1,this.addEventListener("click",this.handleClick.bind(this))}focus(t){this.disabled&&!this.alwaysFocusable||super.focus(t)}render(){return s`
      <div class="container ${ae(this.getContainerClasses())}">
        ${this.renderContainerContent()}
      </div>
    `}updated(t){t.has("disabled")&&t.get("disabled")!==void 0&&this.dispatchEvent(new Event("update-focus",{bubbles:!0}))}getContainerClasses(){return{disabled:this.disabled||this.softDisabled,"has-icon":this.hasIcon}}renderContainerContent(){return s`
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
    `}handleIconChange(t){const i=t.target;this.hasIcon=i.assignedElements({flatten:!0}).length>0}handleClick(t){if(this.softDisabled||this.disabled&&this.alwaysFocusable){t.stopImmediatePropagation(),t.preventDefault();return}}}ge.shadowRootOptions={..._.shadowRootOptions,delegatesFocus:!0};h([v({type:Boolean,reflect:!0})],ge.prototype,"disabled",void 0);h([v({type:Boolean,attribute:"soft-disabled",reflect:!0})],ge.prototype,"softDisabled",void 0);h([v({type:Boolean,attribute:"always-focusable"})],ge.prototype,"alwaysFocusable",void 0);h([v()],ge.prototype,"label",void 0);h([v({type:Boolean,reflect:!0,attribute:"has-icon"})],ge.prototype,"hasIcon",void 0);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Xa extends _{get chips(){return this.childElements.filter(t=>t instanceof ge)}constructor(){super(),this.internals=this.attachInternals(),this.addEventListener("focusin",this.updateTabIndices.bind(this)),this.addEventListener("update-focus",this.updateTabIndices.bind(this)),this.addEventListener("keydown",this.handleKeyDown.bind(this)),this.internals.role="toolbar"}render(){return s`<slot @slotchange=${this.updateTabIndices}></slot>`}handleKeyDown(t){const i=t.key==="ArrowLeft",a=t.key==="ArrowRight",o=t.key==="Home",r=t.key==="End";if(!i&&!a&&!o&&!r)return;const{chips:n}=this;if(n.length<2)return;if(t.preventDefault(),o||r){const y=o?0:n.length-1;n[y].focus({trailing:r}),this.updateTabIndices();return}const p=getComputedStyle(this).direction==="rtl"?i:a,f=n.find(y=>y.matches(":focus-within"));if(!f){(p?n[0]:n[n.length-1]).focus({trailing:!p}),this.updateTabIndices();return}const g=n.indexOf(f);let m=p?g+1:g-1;for(;m!==g;){m>=n.length?m=0:m<0&&(m=n.length-1);const y=n[m];if(y.disabled&&!y.alwaysFocusable){p?m++:m--;continue}y.focus({trailing:!p}),this.updateTabIndices();break}}updateTabIndices(){const{chips:t}=this;let i;for(const a of t){const o=a.alwaysFocusable||!a.disabled;if(a.matches(":focus-within")&&o){i=a;continue}o&&!i&&(i=a),a.tabIndex=-1}i&&(i.tabIndex=0)}}h([_e()],Xa.prototype,"childElements",void 0);/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const vs=$`:host{display:flex;flex-wrap:wrap;gap:8px}
`;/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let zi=class extends Xa{};zi.styles=[vs];zi=h([I("md-chip-set")],zi);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class dt extends ge{constructor(){super(...arguments),this.elevated=!1,this.href="",this.download="",this.target=""}get primaryId(){return this.href?"link":"button"}get rippleDisabled(){return!this.href&&(this.disabled||this.softDisabled)}getContainerClasses(){return{...super.getContainerClasses(),disabled:!this.href&&(this.disabled||this.softDisabled),elevated:this.elevated,link:!!this.href}}renderPrimaryAction(t){const{ariaLabel:i}=this;return this.href?s`
        <a
          class="primary action"
          id="link"
          aria-label=${i||l}
          href=${this.href}
          download=${this.download||l}
          target=${this.target||l}
          >${t}</a
        >
      `:s`
      <button
        class="primary action"
        id="button"
        aria-label=${i||l}
        aria-disabled=${this.softDisabled||l}
        ?disabled=${this.disabled&&!this.alwaysFocusable}
        type="button"
        >${t}</button
      >
    `}renderOutline(){return this.elevated?s`<md-elevation part="elevation"></md-elevation>`:super.renderOutline()}}h([v({type:Boolean})],dt.prototype,"elevated",void 0);h([v()],dt.prototype,"href",void 0);h([v()],dt.prototype,"download",void 0);h([v()],dt.prototype,"target",void 0);/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const fs=$`:host{--_container-height: var(--md-assist-chip-container-height, 32px);--_disabled-label-text-color: var(--md-assist-chip-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-assist-chip-disabled-label-text-opacity, 0.38);--_elevated-container-color: var(--md-assist-chip-elevated-container-color, var(--md-sys-color-surface-container-low, #f7f2fa));--_elevated-container-elevation: var(--md-assist-chip-elevated-container-elevation, 1);--_elevated-container-shadow-color: var(--md-assist-chip-elevated-container-shadow-color, var(--md-sys-color-shadow, #000));--_elevated-disabled-container-color: var(--md-assist-chip-elevated-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));--_elevated-disabled-container-elevation: var(--md-assist-chip-elevated-disabled-container-elevation, 0);--_elevated-disabled-container-opacity: var(--md-assist-chip-elevated-disabled-container-opacity, 0.12);--_elevated-focus-container-elevation: var(--md-assist-chip-elevated-focus-container-elevation, 1);--_elevated-hover-container-elevation: var(--md-assist-chip-elevated-hover-container-elevation, 2);--_elevated-pressed-container-elevation: var(--md-assist-chip-elevated-pressed-container-elevation, 1);--_focus-label-text-color: var(--md-assist-chip-focus-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-label-text-color: var(--md-assist-chip-hover-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-state-layer-color: var(--md-assist-chip-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-state-layer-opacity: var(--md-assist-chip-hover-state-layer-opacity, 0.08);--_label-text-color: var(--md-assist-chip-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_label-text-font: var(--md-assist-chip-label-text-font, var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-assist-chip-label-text-line-height, var(--md-sys-typescale-label-large-line-height, 1.25rem));--_label-text-size: var(--md-assist-chip-label-text-size, var(--md-sys-typescale-label-large-size, 0.875rem));--_label-text-weight: var(--md-assist-chip-label-text-weight, var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)));--_pressed-label-text-color: var(--md-assist-chip-pressed-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_pressed-state-layer-color: var(--md-assist-chip-pressed-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_pressed-state-layer-opacity: var(--md-assist-chip-pressed-state-layer-opacity, 0.12);--_disabled-outline-color: var(--md-assist-chip-disabled-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-outline-opacity: var(--md-assist-chip-disabled-outline-opacity, 0.12);--_focus-outline-color: var(--md-assist-chip-focus-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_outline-color: var(--md-assist-chip-outline-color, var(--md-sys-color-outline, #79747e));--_outline-width: var(--md-assist-chip-outline-width, 1px);--_disabled-leading-icon-color: var(--md-assist-chip-disabled-leading-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-leading-icon-opacity: var(--md-assist-chip-disabled-leading-icon-opacity, 0.38);--_focus-leading-icon-color: var(--md-assist-chip-focus-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_hover-leading-icon-color: var(--md-assist-chip-hover-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_leading-icon-color: var(--md-assist-chip-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-size: var(--md-assist-chip-icon-size, 18px);--_pressed-leading-icon-color: var(--md-assist-chip-pressed-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_container-shape-start-start: var(--md-assist-chip-container-shape-start-start, var(--md-assist-chip-container-shape, var(--md-sys-shape-corner-small, 8px)));--_container-shape-start-end: var(--md-assist-chip-container-shape-start-end, var(--md-assist-chip-container-shape, var(--md-sys-shape-corner-small, 8px)));--_container-shape-end-end: var(--md-assist-chip-container-shape-end-end, var(--md-assist-chip-container-shape, var(--md-sys-shape-corner-small, 8px)));--_container-shape-end-start: var(--md-assist-chip-container-shape-end-start, var(--md-assist-chip-container-shape, var(--md-sys-shape-corner-small, 8px)));--_leading-space: var(--md-assist-chip-leading-space, 16px);--_trailing-space: var(--md-assist-chip-trailing-space, 16px);--_icon-label-space: var(--md-assist-chip-icon-label-space, 8px);--_with-leading-icon-leading-space: var(--md-assist-chip-with-leading-icon-leading-space, 8px)}@media(forced-colors: active){.link .outline{border-color:ActiveText}}
`;/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Za=$`.elevated{--md-elevation-level: var(--_elevated-container-elevation);--md-elevation-shadow-color: var(--_elevated-container-shadow-color)}.elevated::before{background:var(--_elevated-container-color)}.elevated:hover{--md-elevation-level: var(--_elevated-hover-container-elevation)}.elevated:focus-within{--md-elevation-level: var(--_elevated-focus-container-elevation)}.elevated:active{--md-elevation-level: var(--_elevated-pressed-container-elevation)}.elevated.disabled{--md-elevation-level: var(--_elevated-disabled-container-elevation)}.elevated.disabled::before{background:var(--_elevated-disabled-container-color);opacity:var(--_elevated-disabled-container-opacity)}@media(forced-colors: active){.elevated md-elevation{border:1px solid CanvasText}.elevated.disabled md-elevation{border-color:GrayText}}
`;/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Qa=$`:host{border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end);display:inline-flex;height:var(--_container-height);cursor:pointer;-webkit-tap-highlight-color:rgba(0,0,0,0);--md-ripple-hover-color: var(--_hover-state-layer-color);--md-ripple-hover-opacity: var(--_hover-state-layer-opacity);--md-ripple-pressed-color: var(--_pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_pressed-state-layer-opacity)}:host(:is([disabled],[soft-disabled])){pointer-events:none}:host([touch-target=wrapper]){margin:max(0px,(48px - var(--_container-height))/2) 0}md-focus-ring{--md-focus-ring-shape-start-start: var(--_container-shape-start-start);--md-focus-ring-shape-start-end: var(--_container-shape-start-end);--md-focus-ring-shape-end-end: var(--_container-shape-end-end);--md-focus-ring-shape-end-start: var(--_container-shape-end-start)}.container{border-radius:inherit;box-sizing:border-box;display:flex;height:100%;position:relative;width:100%}.container::before{border-radius:inherit;content:"";inset:0;pointer-events:none;position:absolute}.container:not(.disabled){cursor:pointer}.container.disabled{pointer-events:none}.cell{display:flex}.action{align-items:baseline;appearance:none;background:none;border:none;border-radius:inherit;display:flex;outline:none;padding:0;position:relative;text-decoration:none}.primary.action{min-width:0;padding-inline-start:var(--_leading-space);padding-inline-end:var(--_trailing-space)}.has-icon .primary.action{padding-inline-start:var(--_with-leading-icon-leading-space)}.touch{height:48px;inset:50% 0 0;position:absolute;transform:translateY(-50%);width:100%}:host([touch-target=none]) .touch{display:none}.outline{border:var(--_outline-width) solid var(--_outline-color);border-radius:inherit;inset:0;pointer-events:none;position:absolute}:where(:focus) .outline{border-color:var(--_focus-outline-color)}:where(.disabled) .outline{border-color:var(--_disabled-outline-color);opacity:var(--_disabled-outline-opacity)}md-ripple{border-radius:inherit}.label,.icon,.touch{z-index:1}.label{align-items:center;color:var(--_label-text-color);display:flex;font-family:var(--_label-text-font);font-size:var(--_label-text-size);font-weight:var(--_label-text-weight);height:100%;line-height:var(--_label-text-line-height);overflow:hidden;user-select:none}.label-text{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}:where(:hover) .label{color:var(--_hover-label-text-color)}:where(:focus) .label{color:var(--_focus-label-text-color)}:where(:active) .label{color:var(--_pressed-label-text-color)}:where(.disabled) .label{color:var(--_disabled-label-text-color);opacity:var(--_disabled-label-text-opacity)}.icon{align-self:center;display:flex;fill:currentColor;position:relative}.icon ::slotted(:first-child){font-size:var(--_icon-size);height:var(--_icon-size);width:var(--_icon-size)}.leading.icon{color:var(--_leading-icon-color)}.leading.icon ::slotted(*),.leading.icon svg{margin-inline-end:var(--_icon-label-space)}:where(:hover) .leading.icon{color:var(--_hover-leading-icon-color)}:where(:focus) .leading.icon{color:var(--_focus-leading-icon-color)}:where(:active) .leading.icon{color:var(--_pressed-leading-icon-color)}:where(.disabled) .leading.icon{color:var(--_disabled-leading-icon-color);opacity:var(--_disabled-leading-icon-opacity)}@media(forced-colors: active){:where(.disabled) :is(.label,.outline,.leading.icon){color:GrayText;opacity:1}}a,button{text-transform:inherit}a,button:not(:disabled,[aria-disabled=true]){cursor:inherit}
`;/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let Ai=class extends dt{};Ai.styles=[Qa,Za,fs];Ai=h([I("md-assist-chip")],Ai);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const gt="aria-label-remove";class gs extends ge{get ariaLabelRemove(){if(this.hasAttribute(gt))return this.getAttribute(gt);const{ariaLabel:t}=this;return t||this.label?`Remove ${t||this.label}`:null}set ariaLabelRemove(t){const i=this.ariaLabelRemove;t!==i&&(t===null?this.removeAttribute(gt):this.setAttribute(gt,t),this.requestUpdate())}constructor(){super(),this.handleTrailingActionFocus=this.handleTrailingActionFocus.bind(this),this.addEventListener("keydown",this.handleKeyDown.bind(this))}focus(t){if((this.alwaysFocusable||!this.disabled)&&(t!=null&&t.trailing)&&this.trailingAction){this.trailingAction.focus(t);return}super.focus(t)}renderContainerContent(){return s`
      ${super.renderContainerContent()}
      ${this.renderTrailingAction(this.handleTrailingActionFocus)}
    `}handleKeyDown(t){var f,g;const i=t.key==="ArrowLeft",a=t.key==="ArrowRight";if(!i&&!a||!this.primaryAction||!this.trailingAction)return;const r=getComputedStyle(this).direction==="rtl"?i:a,n=(f=this.primaryAction)==null?void 0:f.matches(":focus-within"),d=(g=this.trailingAction)==null?void 0:g.matches(":focus-within");if(r&&d||!r&&n)return;t.preventDefault(),t.stopPropagation(),(r?this.trailingAction:this.primaryAction).focus()}handleTrailingActionFocus(){const{primaryAction:t,trailingAction:i}=this;!t||!i||(t.tabIndex=-1,i.addEventListener("focusout",()=>{t.tabIndex=0},{once:!0}))}}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function bs({ariaLabel:e,disabled:t,focusListener:i,tabbable:a=!1}){return s`
    <span id="remove-label" hidden aria-hidden="true">Remove</span>
    <button
      class="trailing action"
      aria-label=${e||l}
      aria-labelledby=${e?l:"remove-label label"}
      tabindex=${a?l:-1}
      @click=${ys}
      @focus=${i}>
      <md-focus-ring part="trailing-focus-ring"></md-focus-ring>
      <md-ripple ?disabled=${t}></md-ripple>
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
  `}function ys(e){this.disabled||this.softDisabled||(e.stopPropagation(),!this.dispatchEvent(new Event("remove",{cancelable:!0})))||this.remove()}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class De extends gs{constructor(){super(...arguments),this.elevated=!1,this.removable=!1,this.selected=!1,this.hasSelectedIcon=!1}get primaryId(){return"button"}getContainerClasses(){return{...super.getContainerClasses(),elevated:this.elevated,selected:this.selected,"has-trailing":this.removable,"has-icon":this.hasIcon||this.selected}}renderPrimaryAction(t){const{ariaLabel:i}=this;return s`
      <button
        class="primary action"
        id="button"
        aria-label=${i||l}
        aria-pressed=${this.selected}
        aria-disabled=${this.softDisabled||l}
        ?disabled=${this.disabled&&!this.alwaysFocusable}
        @click=${this.handleClickOnChild}
        >${t}</button
      >
    `}renderLeadingIcon(){return this.selected?s`
      <slot name="selected-icon">
        <svg class="checkmark" viewBox="0 0 18 18" aria-hidden="true">
          <path
            d="M6.75012 12.1274L3.62262 8.99988L2.55762 10.0574L6.75012 14.2499L15.7501 5.24988L14.6926 4.19238L6.75012 12.1274Z" />
        </svg>
      </slot>
    `:super.renderLeadingIcon()}renderTrailingAction(t){return this.removable?bs({focusListener:t,ariaLabel:this.ariaLabelRemove,disabled:this.disabled||this.softDisabled}):l}renderOutline(){return this.elevated?s`<md-elevation part="elevation"></md-elevation>`:super.renderOutline()}handleClickOnChild(t){if(this.disabled||this.softDisabled)return;const i=this.selected;if(this.selected=!this.selected,!Zi(this,t)){this.selected=i;return}}}h([v({type:Boolean})],De.prototype,"elevated",void 0);h([v({type:Boolean})],De.prototype,"removable",void 0);h([v({type:Boolean,reflect:!0})],De.prototype,"selected",void 0);h([v({type:Boolean,reflect:!0,attribute:"has-selected-icon"})],De.prototype,"hasSelectedIcon",void 0);h([S(".primary.action")],De.prototype,"primaryAction",void 0);h([S(".trailing.action")],De.prototype,"trailingAction",void 0);/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const xs=$`:host{--_container-height: var(--md-filter-chip-container-height, 32px);--_disabled-label-text-color: var(--md-filter-chip-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-filter-chip-disabled-label-text-opacity, 0.38);--_elevated-container-elevation: var(--md-filter-chip-elevated-container-elevation, 1);--_elevated-container-shadow-color: var(--md-filter-chip-elevated-container-shadow-color, var(--md-sys-color-shadow, #000));--_elevated-disabled-container-color: var(--md-filter-chip-elevated-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));--_elevated-disabled-container-elevation: var(--md-filter-chip-elevated-disabled-container-elevation, 0);--_elevated-disabled-container-opacity: var(--md-filter-chip-elevated-disabled-container-opacity, 0.12);--_elevated-focus-container-elevation: var(--md-filter-chip-elevated-focus-container-elevation, 1);--_elevated-hover-container-elevation: var(--md-filter-chip-elevated-hover-container-elevation, 2);--_elevated-pressed-container-elevation: var(--md-filter-chip-elevated-pressed-container-elevation, 1);--_elevated-selected-container-color: var(--md-filter-chip-elevated-selected-container-color, var(--md-sys-color-secondary-container, #e8def8));--_label-text-font: var(--md-filter-chip-label-text-font, var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-filter-chip-label-text-line-height, var(--md-sys-typescale-label-large-line-height, 1.25rem));--_label-text-size: var(--md-filter-chip-label-text-size, var(--md-sys-typescale-label-large-size, 0.875rem));--_label-text-weight: var(--md-filter-chip-label-text-weight, var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)));--_selected-focus-label-text-color: var(--md-filter-chip-selected-focus-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-hover-label-text-color: var(--md-filter-chip-selected-hover-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-hover-state-layer-color: var(--md-filter-chip-selected-hover-state-layer-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-hover-state-layer-opacity: var(--md-filter-chip-selected-hover-state-layer-opacity, 0.08);--_selected-label-text-color: var(--md-filter-chip-selected-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-pressed-label-text-color: var(--md-filter-chip-selected-pressed-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-pressed-state-layer-color: var(--md-filter-chip-selected-pressed-state-layer-color, var(--md-sys-color-on-surface-variant, #49454f));--_selected-pressed-state-layer-opacity: var(--md-filter-chip-selected-pressed-state-layer-opacity, 0.12);--_elevated-container-color: var(--md-filter-chip-elevated-container-color, var(--md-sys-color-surface-container-low, #f7f2fa));--_disabled-outline-color: var(--md-filter-chip-disabled-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-outline-opacity: var(--md-filter-chip-disabled-outline-opacity, 0.12);--_disabled-selected-container-color: var(--md-filter-chip-disabled-selected-container-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-selected-container-opacity: var(--md-filter-chip-disabled-selected-container-opacity, 0.12);--_focus-outline-color: var(--md-filter-chip-focus-outline-color, var(--md-sys-color-on-surface-variant, #49454f));--_outline-color: var(--md-filter-chip-outline-color, var(--md-sys-color-outline, #79747e));--_outline-width: var(--md-filter-chip-outline-width, 1px);--_selected-container-color: var(--md-filter-chip-selected-container-color, var(--md-sys-color-secondary-container, #e8def8));--_selected-outline-width: var(--md-filter-chip-selected-outline-width, 0px);--_focus-label-text-color: var(--md-filter-chip-focus-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-label-text-color: var(--md-filter-chip-hover-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-color: var(--md-filter-chip-hover-state-layer-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-opacity: var(--md-filter-chip-hover-state-layer-opacity, 0.08);--_label-text-color: var(--md-filter-chip-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-label-text-color: var(--md-filter-chip-pressed-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-state-layer-color: var(--md-filter-chip-pressed-state-layer-color, var(--md-sys-color-on-secondary-container, #1d192b));--_pressed-state-layer-opacity: var(--md-filter-chip-pressed-state-layer-opacity, 0.12);--_icon-size: var(--md-filter-chip-icon-size, 18px);--_disabled-leading-icon-color: var(--md-filter-chip-disabled-leading-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-leading-icon-opacity: var(--md-filter-chip-disabled-leading-icon-opacity, 0.38);--_selected-focus-leading-icon-color: var(--md-filter-chip-selected-focus-leading-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-hover-leading-icon-color: var(--md-filter-chip-selected-hover-leading-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-leading-icon-color: var(--md-filter-chip-selected-leading-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-pressed-leading-icon-color: var(--md-filter-chip-selected-pressed-leading-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_focus-leading-icon-color: var(--md-filter-chip-focus-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_hover-leading-icon-color: var(--md-filter-chip-hover-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_leading-icon-color: var(--md-filter-chip-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_pressed-leading-icon-color: var(--md-filter-chip-pressed-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_disabled-trailing-icon-color: var(--md-filter-chip-disabled-trailing-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-trailing-icon-opacity: var(--md-filter-chip-disabled-trailing-icon-opacity, 0.38);--_selected-focus-trailing-icon-color: var(--md-filter-chip-selected-focus-trailing-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-hover-trailing-icon-color: var(--md-filter-chip-selected-hover-trailing-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-pressed-trailing-icon-color: var(--md-filter-chip-selected-pressed-trailing-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-trailing-icon-color: var(--md-filter-chip-selected-trailing-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_focus-trailing-icon-color: var(--md-filter-chip-focus-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-trailing-icon-color: var(--md-filter-chip-hover-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-trailing-icon-color: var(--md-filter-chip-pressed-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_trailing-icon-color: var(--md-filter-chip-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_container-shape-start-start: var(--md-filter-chip-container-shape-start-start, var(--md-filter-chip-container-shape, var(--md-sys-shape-corner-small, 8px)));--_container-shape-start-end: var(--md-filter-chip-container-shape-start-end, var(--md-filter-chip-container-shape, var(--md-sys-shape-corner-small, 8px)));--_container-shape-end-end: var(--md-filter-chip-container-shape-end-end, var(--md-filter-chip-container-shape, var(--md-sys-shape-corner-small, 8px)));--_container-shape-end-start: var(--md-filter-chip-container-shape-end-start, var(--md-filter-chip-container-shape, var(--md-sys-shape-corner-small, 8px)));--_leading-space: var(--md-filter-chip-leading-space, 16px);--_trailing-space: var(--md-filter-chip-trailing-space, 16px);--_icon-label-space: var(--md-filter-chip-icon-label-space, 8px);--_with-leading-icon-leading-space: var(--md-filter-chip-with-leading-icon-leading-space, 8px);--_with-trailing-icon-trailing-space: var(--md-filter-chip-with-trailing-icon-trailing-space, 8px)}.selected.elevated::before{background:var(--_elevated-selected-container-color)}.checkmark{height:var(--_icon-size);width:var(--_icon-size)}.disabled .checkmark{opacity:var(--_disabled-leading-icon-opacity)}@media(forced-colors: active){.disabled .checkmark{opacity:1}}
`;/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const ws=$`.selected{--md-ripple-hover-color: var(--_selected-hover-state-layer-color);--md-ripple-hover-opacity: var(--_selected-hover-state-layer-opacity);--md-ripple-pressed-color: var(--_selected-pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_selected-pressed-state-layer-opacity)}:where(.selected)::before{background:var(--_selected-container-color)}:where(.selected) .outline{border-width:var(--_selected-outline-width)}:where(.selected.disabled)::before{background:var(--_disabled-selected-container-color);opacity:var(--_disabled-selected-container-opacity)}:where(.selected) .label{color:var(--_selected-label-text-color)}:where(.selected:hover) .label{color:var(--_selected-hover-label-text-color)}:where(.selected:focus) .label{color:var(--_selected-focus-label-text-color)}:where(.selected:active) .label{color:var(--_selected-pressed-label-text-color)}:where(.selected) .leading.icon{color:var(--_selected-leading-icon-color)}:where(.selected:hover) .leading.icon{color:var(--_selected-hover-leading-icon-color)}:where(.selected:focus) .leading.icon{color:var(--_selected-focus-leading-icon-color)}:where(.selected:active) .leading.icon{color:var(--_selected-pressed-leading-icon-color)}@media(forced-colors: active){:where(.selected:not(.elevated))::before{border:1px solid CanvasText}:where(.selected) .outline{border-width:1px}}
`;/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const $s=$`.trailing.action{align-items:center;justify-content:center;padding-inline-start:var(--_icon-label-space);padding-inline-end:var(--_with-trailing-icon-trailing-space)}.trailing.action :is(md-ripple,md-focus-ring){border-radius:50%;height:calc(1.3333333333*var(--_icon-size));width:calc(1.3333333333*var(--_icon-size))}.trailing.action md-focus-ring{inset:unset}.has-trailing .primary.action{padding-inline-end:0}.trailing.icon{color:var(--_trailing-icon-color);height:var(--_icon-size);width:var(--_icon-size)}:where(:hover) .trailing.icon{color:var(--_hover-trailing-icon-color)}:where(:focus) .trailing.icon{color:var(--_focus-trailing-icon-color)}:where(:active) .trailing.icon{color:var(--_pressed-trailing-icon-color)}:where(.disabled) .trailing.icon{color:var(--_disabled-trailing-icon-color);opacity:var(--_disabled-trailing-icon-opacity)}:where(.selected) .trailing.icon{color:var(--_selected-trailing-icon-color)}:where(.selected:hover) .trailing.icon{color:var(--_selected-hover-trailing-icon-color)}:where(.selected:focus) .trailing.icon{color:var(--_selected-focus-trailing-icon-color)}:where(.selected:active) .trailing.icon{color:var(--_selected-pressed-trailing-icon-color)}@media(forced-colors: active){.trailing.icon{color:ButtonText}:where(.disabled) .trailing.icon{color:GrayText;opacity:1}}
`;/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let Ei=class extends De{};Ei.styles=[Qa,Za,$s,ws,xs];Ei=h([I("md-filter-chip")],Ei);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const _s=ke(_);class ct extends _s{constructor(){super(...arguments),this.size="medium",this.label="",this.lowered=!1}render(){const{ariaLabel:t}=this;return s`
      <button
        class="fab ${ae(this.getRenderClasses())}"
        aria-label=${t||l}>
        <md-elevation part="elevation"></md-elevation>
        <md-focus-ring part="focus-ring"></md-focus-ring>
        <md-ripple class="ripple"></md-ripple>
        ${this.renderTouchTarget()} ${this.renderIcon()} ${this.renderLabel()}
      </button>
    `}getRenderClasses(){const t=!!this.label;return{lowered:this.lowered,small:this.size==="small"&&!t,large:this.size==="large"&&!t,extended:t}}renderTouchTarget(){return s`<div class="touch-target"></div>`}renderLabel(){return this.label?s`<span class="label">${this.label}</span>`:""}renderIcon(){const{ariaLabel:t}=this;return s`<span class="icon">
      <slot
        name="icon"
        aria-hidden=${t||this.label?"true":l}>
        <span></span>
      </slot>
    </span>`}}ct.shadowRootOptions={mode:"open",delegatesFocus:!0};h([v({reflect:!0})],ct.prototype,"size",void 0);h([v()],ct.prototype,"label",void 0);h([v({type:Boolean})],ct.prototype,"lowered",void 0);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class eo extends ct{constructor(){super(...arguments),this.variant="surface"}getRenderClasses(){return{...super.getRenderClasses(),primary:this.variant==="primary",secondary:this.variant==="secondary",tertiary:this.variant==="tertiary"}}}h([v()],eo.prototype,"variant",void 0);/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const ks=$`:host{--_container-color: var(--md-fab-container-color, var(--md-sys-color-surface-container-high, #ece6f0));--_container-elevation: var(--md-fab-container-elevation, 3);--_container-height: var(--md-fab-container-height, 56px);--_container-shadow-color: var(--md-fab-container-shadow-color, var(--md-sys-color-shadow, #000));--_container-width: var(--md-fab-container-width, 56px);--_focus-container-elevation: var(--md-fab-focus-container-elevation, 3);--_focus-icon-color: var(--md-fab-focus-icon-color, var(--md-sys-color-primary, #6750a4));--_hover-container-elevation: var(--md-fab-hover-container-elevation, 4);--_hover-icon-color: var(--md-fab-hover-icon-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-color: var(--md-fab-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-opacity: var(--md-fab-hover-state-layer-opacity, 0.08);--_icon-color: var(--md-fab-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-size: var(--md-fab-icon-size, 24px);--_lowered-container-color: var(--md-fab-lowered-container-color, var(--md-sys-color-surface-container-low, #f7f2fa));--_lowered-container-elevation: var(--md-fab-lowered-container-elevation, 1);--_lowered-focus-container-elevation: var(--md-fab-lowered-focus-container-elevation, 1);--_lowered-hover-container-elevation: var(--md-fab-lowered-hover-container-elevation, 2);--_lowered-pressed-container-elevation: var(--md-fab-lowered-pressed-container-elevation, 1);--_pressed-container-elevation: var(--md-fab-pressed-container-elevation, 3);--_pressed-icon-color: var(--md-fab-pressed-icon-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-color: var(--md-fab-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-opacity: var(--md-fab-pressed-state-layer-opacity, 0.12);--_focus-label-text-color: var(--md-fab-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_hover-label-text-color: var(--md-fab-hover-label-text-color, var(--md-sys-color-primary, #6750a4));--_label-text-color: var(--md-fab-label-text-color, var(--md-sys-color-primary, #6750a4));--_label-text-font: var(--md-fab-label-text-font, var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-fab-label-text-line-height, var(--md-sys-typescale-label-large-line-height, 1.25rem));--_label-text-size: var(--md-fab-label-text-size, var(--md-sys-typescale-label-large-size, 0.875rem));--_label-text-weight: var(--md-fab-label-text-weight, var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)));--_large-container-height: var(--md-fab-large-container-height, 96px);--_large-container-width: var(--md-fab-large-container-width, 96px);--_large-icon-size: var(--md-fab-large-icon-size, 36px);--_pressed-label-text-color: var(--md-fab-pressed-label-text-color, var(--md-sys-color-primary, #6750a4));--_primary-container-color: var(--md-fab-primary-container-color, var(--md-sys-color-primary-container, #eaddff));--_primary-focus-icon-color: var(--md-fab-primary-focus-icon-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-focus-label-text-color: var(--md-fab-primary-focus-label-text-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-hover-icon-color: var(--md-fab-primary-hover-icon-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-hover-label-text-color: var(--md-fab-primary-hover-label-text-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-hover-state-layer-color: var(--md-fab-primary-hover-state-layer-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-icon-color: var(--md-fab-primary-icon-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-label-text-color: var(--md-fab-primary-label-text-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-pressed-icon-color: var(--md-fab-primary-pressed-icon-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-pressed-label-text-color: var(--md-fab-primary-pressed-label-text-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-pressed-state-layer-color: var(--md-fab-primary-pressed-state-layer-color, var(--md-sys-color-on-primary-container, #21005d));--_secondary-container-color: var(--md-fab-secondary-container-color, var(--md-sys-color-secondary-container, #e8def8));--_secondary-focus-icon-color: var(--md-fab-secondary-focus-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-focus-label-text-color: var(--md-fab-secondary-focus-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-hover-icon-color: var(--md-fab-secondary-hover-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-hover-label-text-color: var(--md-fab-secondary-hover-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-hover-state-layer-color: var(--md-fab-secondary-hover-state-layer-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-icon-color: var(--md-fab-secondary-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-label-text-color: var(--md-fab-secondary-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-pressed-icon-color: var(--md-fab-secondary-pressed-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-pressed-label-text-color: var(--md-fab-secondary-pressed-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-pressed-state-layer-color: var(--md-fab-secondary-pressed-state-layer-color, var(--md-sys-color-on-secondary-container, #1d192b));--_small-container-height: var(--md-fab-small-container-height, 40px);--_small-container-width: var(--md-fab-small-container-width, 40px);--_small-icon-size: var(--md-fab-small-icon-size, 24px);--_tertiary-container-color: var(--md-fab-tertiary-container-color, var(--md-sys-color-tertiary-container, #ffd8e4));--_tertiary-focus-icon-color: var(--md-fab-tertiary-focus-icon-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-focus-label-text-color: var(--md-fab-tertiary-focus-label-text-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-hover-icon-color: var(--md-fab-tertiary-hover-icon-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-hover-label-text-color: var(--md-fab-tertiary-hover-label-text-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-hover-state-layer-color: var(--md-fab-tertiary-hover-state-layer-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-icon-color: var(--md-fab-tertiary-icon-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-label-text-color: var(--md-fab-tertiary-label-text-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-pressed-icon-color: var(--md-fab-tertiary-pressed-icon-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-pressed-label-text-color: var(--md-fab-tertiary-pressed-label-text-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-pressed-state-layer-color: var(--md-fab-tertiary-pressed-state-layer-color, var(--md-sys-color-on-tertiary-container, #31111d));--_container-shape-start-start: var(--md-fab-container-shape-start-start, var(--md-fab-container-shape, var(--md-sys-shape-corner-large, 16px)));--_container-shape-start-end: var(--md-fab-container-shape-start-end, var(--md-fab-container-shape, var(--md-sys-shape-corner-large, 16px)));--_container-shape-end-end: var(--md-fab-container-shape-end-end, var(--md-fab-container-shape, var(--md-sys-shape-corner-large, 16px)));--_container-shape-end-start: var(--md-fab-container-shape-end-start, var(--md-fab-container-shape, var(--md-sys-shape-corner-large, 16px)));--_large-container-shape-start-start: var(--md-fab-large-container-shape-start-start, var(--md-fab-large-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));--_large-container-shape-start-end: var(--md-fab-large-container-shape-start-end, var(--md-fab-large-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));--_large-container-shape-end-end: var(--md-fab-large-container-shape-end-end, var(--md-fab-large-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));--_large-container-shape-end-start: var(--md-fab-large-container-shape-end-start, var(--md-fab-large-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));--_small-container-shape-start-start: var(--md-fab-small-container-shape-start-start, var(--md-fab-small-container-shape, var(--md-sys-shape-corner-medium, 12px)));--_small-container-shape-start-end: var(--md-fab-small-container-shape-start-end, var(--md-fab-small-container-shape, var(--md-sys-shape-corner-medium, 12px)));--_small-container-shape-end-end: var(--md-fab-small-container-shape-end-end, var(--md-fab-small-container-shape, var(--md-sys-shape-corner-medium, 12px)));--_small-container-shape-end-start: var(--md-fab-small-container-shape-end-start, var(--md-fab-small-container-shape, var(--md-sys-shape-corner-medium, 12px)));cursor:pointer}:host([size=small][touch-target=wrapper]){margin:max(0px,48px - var(--_small-container-height))}.fab .icon ::slotted(*){color:var(--_icon-color)}.fab:focus{color:var(--_focus-icon-color)}.fab:hover{color:var(--_hover-icon-color)}.fab:active{color:var(--_pressed-icon-color)}.fab{cursor:inherit}.fab.primary{background-color:var(--_primary-container-color);--md-ripple-hover-color: var(--_primary-hover-state-layer-color);--md-ripple-pressed-color: var(--_primary-pressed-state-layer-color)}.fab.primary .icon ::slotted(*){color:var(--_primary-icon-color)}.fab.primary:focus{color:var(--_primary-focus-icon-color)}.fab.primary:hover{color:var(--_primary-hover-icon-color)}.fab.primary:active{color:var(--_primary-pressed-icon-color)}.fab.primary .label{color:var(--_primary-label-text-color)}.fab:hover .fab.primary .label{color:var(--_primary-hover-label-text-color)}.fab:focus .fab.primary .label{color:var(--_primary-focus-label-text-color)}.fab:active .fab.primary .label{color:var(--_primary-pressed-label-text-color)}.fab.secondary{background-color:var(--_secondary-container-color);--md-ripple-hover-color: var(--_secondary-hover-state-layer-color);--md-ripple-pressed-color: var(--_secondary-pressed-state-layer-color)}.fab.secondary .icon ::slotted(*){color:var(--_secondary-icon-color)}.fab.secondary:focus{color:var(--_secondary-focus-icon-color)}.fab.secondary:hover{color:var(--_secondary-hover-icon-color)}.fab.secondary:active{color:var(--_secondary-pressed-icon-color)}.fab.secondary .label{color:var(--_secondary-label-text-color)}.fab:hover .fab.secondary .label{color:var(--_secondary-hover-label-text-color)}.fab:focus .fab.secondary .label{color:var(--_secondary-focus-label-text-color)}.fab:active .fab.secondary .label{color:var(--_secondary-pressed-label-text-color)}.fab.tertiary{background-color:var(--_tertiary-container-color);--md-ripple-hover-color: var(--_tertiary-hover-state-layer-color);--md-ripple-pressed-color: var(--_tertiary-pressed-state-layer-color)}.fab.tertiary .icon ::slotted(*){color:var(--_tertiary-icon-color)}.fab.tertiary:focus{color:var(--_tertiary-focus-icon-color)}.fab.tertiary:hover{color:var(--_tertiary-hover-icon-color)}.fab.tertiary:active{color:var(--_tertiary-pressed-icon-color)}.fab.tertiary .label{color:var(--_tertiary-label-text-color)}.fab:hover .fab.tertiary .label{color:var(--_tertiary-hover-label-text-color)}.fab:focus .fab.tertiary .label{color:var(--_tertiary-focus-label-text-color)}.fab:active .fab.tertiary .label{color:var(--_tertiary-pressed-label-text-color)}.fab.extended slot span{padding-inline-start:4px}.fab.small{width:var(--_small-container-width);height:var(--_small-container-height)}.fab.small .icon ::slotted(*){width:var(--_small-icon-size);height:var(--_small-icon-size);font-size:var(--_small-icon-size)}.fab.small,.fab.small .ripple{border-start-start-radius:var(--_small-container-shape-start-start);border-start-end-radius:var(--_small-container-shape-start-end);border-end-start-radius:var(--_small-container-shape-end-start);border-end-end-radius:var(--_small-container-shape-end-end)}.fab.small md-focus-ring{--md-focus-ring-shape-start-start: var(--_small-container-shape-start-start);--md-focus-ring-shape-start-end: var(--_small-container-shape-start-end);--md-focus-ring-shape-end-end: var(--_small-container-shape-end-end);--md-focus-ring-shape-end-start: var(--_small-container-shape-end-start)}
`;/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Cs=$`@media(forced-colors: active){.fab{border:1px solid ButtonText}.fab.extended{padding-inline-start:15px;padding-inline-end:19px}md-focus-ring{--md-focus-ring-outward-offset: 3px}}
`;/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Is=$`:host{--md-ripple-hover-opacity: var(--_hover-state-layer-opacity);--md-ripple-pressed-opacity: var(--_pressed-state-layer-opacity);display:inline-flex;-webkit-tap-highlight-color:rgba(0,0,0,0)}:host([size=medium][touch-target=wrapper]){margin:max(0px,48px - var(--_container-height))}:host([size=large][touch-target=wrapper]){margin:max(0px,48px - var(--_large-container-height))}.fab,.icon,.icon ::slotted(*){display:flex}.fab{align-items:center;justify-content:center;vertical-align:middle;padding:0;position:relative;height:var(--_container-height);transition-property:background-color;border-width:0px;outline:none;z-index:0;text-transform:inherit}.fab.extended{width:inherit;box-sizing:border-box;padding-inline-start:16px;padding-inline-end:20px}.fab:not(.extended){width:var(--_container-width)}.fab.large{width:var(--_large-container-width);height:var(--_large-container-height)}.fab.large .icon ::slotted(*){width:var(--_large-icon-size);height:var(--_large-icon-size);font-size:var(--_large-icon-size)}.fab.large,.fab.large .ripple{border-start-start-radius:var(--_large-container-shape-start-start);border-start-end-radius:var(--_large-container-shape-start-end);border-end-start-radius:var(--_large-container-shape-end-start);border-end-end-radius:var(--_large-container-shape-end-end)}.fab.large md-focus-ring{--md-focus-ring-shape-start-start: var(--_large-container-shape-start-start);--md-focus-ring-shape-start-end: var(--_large-container-shape-start-end);--md-focus-ring-shape-end-end: var(--_large-container-shape-end-end);--md-focus-ring-shape-end-start: var(--_large-container-shape-end-start)}.fab{--md-elevation-level: var(--_container-elevation);--md-elevation-shadow-color: var(--_container-shadow-color)}.fab:focus{--md-elevation-level: var(--_focus-container-elevation)}.fab:hover{--md-elevation-level: var(--_hover-container-elevation)}.fab:active{--md-elevation-level: var(--_pressed-container-elevation)}.fab.lowered{background-color:var(--_lowered-container-color);--md-elevation-level: var(--_lowered-container-elevation)}.fab.lowered:focus{--md-elevation-level: var(--_lowered-focus-container-elevation)}.fab.lowered:hover{--md-elevation-level: var(--_lowered-hover-container-elevation)}.fab.lowered:active{--md-elevation-level: var(--_lowered-pressed-container-elevation)}.fab{background-color:var(--_container-color);--md-ripple-hover-color: var(--_hover-state-layer-color);--md-ripple-pressed-color: var(--_pressed-state-layer-color)}.fab .label{color:var(--_label-text-color)}.fab:hover .fab .label{color:var(--_hover-label-text-color)}.fab:focus .fab .label{color:var(--_focus-label-text-color)}.fab:active .fab .label{color:var(--_pressed-label-text-color)}.label{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-family:var(--_label-text-font);font-size:var(--_label-text-size);line-height:var(--_label-text-line-height);font-weight:var(--_label-text-weight)}.fab.extended .icon ::slotted(*){margin-inline-end:12px}.ripple{overflow:hidden}.ripple,md-elevation{z-index:-1}.touch-target{position:absolute;top:50%;height:48px;left:50%;width:48px;transform:translate(-50%, -50%)}:host([touch-target=none]) .touch-target{display:none}md-elevation,.fab{transition-duration:280ms;transition-timing-function:cubic-bezier(0.2, 0, 0, 1)}.fab,.ripple{border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end)}md-focus-ring{--md-focus-ring-shape-start-start: var(--_container-shape-start-start);--md-focus-ring-shape-start-end: var(--_container-shape-start-end);--md-focus-ring-shape-end-end: var(--_container-shape-end-end);--md-focus-ring-shape-end-start: var(--_container-shape-end-start)}.icon ::slotted(*){width:var(--_icon-size);height:var(--_icon-size);font-size:var(--_icon-size)}
`;/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let Li=class extends eo{};Li.styles=[Is,ks,Cs];Li=h([I("md-fab")],Li);/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Ts extends _{render(){return s`<slot></slot>`}connectedCallback(){if(super.connectedCallback(),this.getAttribute("aria-hidden")==="false"){this.removeAttribute("aria-hidden");return}this.setAttribute("aria-hidden","true")}}/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Ss=$`:host{font-size:var(--md-icon-size, 24px);width:var(--md-icon-size, 24px);height:var(--md-icon-size, 24px);color:inherit;font-variation-settings:inherit;font-weight:400;font-family:var(--md-icon-font, Material Symbols Outlined);display:inline-flex;font-style:normal;place-items:center;place-content:center;line-height:1;overflow:hidden;letter-spacing:normal;text-transform:none;user-select:none;white-space:nowrap;word-wrap:normal;flex-shrink:0;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale}::slotted(svg){fill:currentColor}::slotted(*){height:100%;width:100%}
`;/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let Pi=class extends Ts{};Pi.styles=[Ss];Pi=h([I("md-icon")],Pi);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function to(e,t=be){const i=ao(e,t);return i&&(i.tabIndex=0,i.focus()),i}function io(e,t=be){const i=zs(e,t);return i&&(i.tabIndex=0,i.focus()),i}function ti(e,t=be){for(let i=0;i<e.length;i++){const a=e[i];if(a.tabIndex===0&&t(a))return{item:a,index:i}}return null}function ao(e,t=be){for(const i of e)if(t(i))return i;return null}function zs(e,t=be){for(let i=e.length-1;i>=0;i--){const a=e[i];if(t(a))return a}return null}function As(e,t,i=be,a=!0){for(let o=1;o<e.length;o++){const r=(o+t)%e.length;if(r<t&&!a)return null;const n=e[r];if(i(n))return n}return e[t]?e[t]:null}function Es(e,t,i=be,a=!0){for(let o=1;o<e.length;o++){const r=(t-o+e.length)%e.length;if(r>t&&!a)return null;const n=e[r];if(i(n))return n}return e[t]?e[t]:null}function xa(e,t,i=be,a=!0){if(t){const o=As(e,t.index,i,a);return o&&(o.tabIndex=0,o.focus()),o}else return to(e,i)}function wa(e,t,i=be,a=!0){if(t){const o=Es(e,t.index,i,a);return o&&(o.tabIndex=0,o.focus()),o}else return io(e,i)}function Ls(){return new Event("request-activation",{bubbles:!0,composed:!0})}function be(e){return!e.disabled}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const he={ArrowDown:"ArrowDown",ArrowLeft:"ArrowLeft",ArrowUp:"ArrowUp",ArrowRight:"ArrowRight",Home:"Home",End:"End"};class Ps{constructor(t){this.handleKeydown=g=>{const m=g.key;if(g.defaultPrevented||!this.isNavigableKey(m))return;const y=this.items;if(!y.length)return;const C=ti(y,this.isActivatable);g.preventDefault();const W=this.isRtl(),se=W?he.ArrowRight:he.ArrowLeft,j=W?he.ArrowLeft:he.ArrowRight;let B=null;switch(m){case he.ArrowDown:case j:B=xa(y,C,this.isActivatable,this.wrapNavigation());break;case he.ArrowUp:case se:B=wa(y,C,this.isActivatable,this.wrapNavigation());break;case he.Home:B=to(y,this.isActivatable);break;case he.End:B=io(y,this.isActivatable);break}B&&C&&C.item!==B&&(C.item.tabIndex=-1)},this.onDeactivateItems=()=>{const g=this.items;for(const m of g)this.deactivateItem(m)},this.onRequestActivation=g=>{this.onDeactivateItems();const m=g.target;this.activateItem(m),m.focus()},this.onSlotchange=()=>{const g=this.items;let m=!1;for(const C of g){if(!C.disabled&&C.tabIndex>-1&&!m){m=!0,C.tabIndex=0;continue}C.tabIndex=-1}if(m)return;const y=ao(g,this.isActivatable);y&&(y.tabIndex=0)};const{isItem:i,getPossibleItems:a,isRtl:o,deactivateItem:r,activateItem:n,isNavigableKey:d,isActivatable:p,wrapNavigation:f}=t;this.isItem=i,this.getPossibleItems=a,this.isRtl=o,this.deactivateItem=r,this.activateItem=n,this.isNavigableKey=d,this.isActivatable=p,this.wrapNavigation=f??(()=>!0)}get items(){const t=this.getPossibleItems(),i=[];for(const a of t){if(this.isItem(a)){i.push(a);continue}const r=a.item;r&&this.isItem(r)&&i.push(r)}return i}activateNextItem(){const t=this.items,i=ti(t,this.isActivatable);return i&&(i.item.tabIndex=-1),xa(t,i,this.isActivatable,this.wrapNavigation())}activatePreviousItem(){const t=this.items,i=ti(t,this.isActivatable);return i&&(i.item.tabIndex=-1),wa(t,i,this.isActivatable,this.wrapNavigation())}}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Ds=new Set(Object.values(he));class oo extends _{get items(){return this.listController.items}constructor(){super(),this.listController=new Ps({isItem:t=>t.hasAttribute("md-list-item"),getPossibleItems:()=>this.slotItems,isRtl:()=>getComputedStyle(this).direction==="rtl",deactivateItem:t=>{t.tabIndex=-1},activateItem:t=>{t.tabIndex=0},isNavigableKey:t=>Ds.has(t),isActivatable:t=>!t.disabled&&t.type!=="text"}),this.internals=this.attachInternals(),this.internals.role="list",this.addEventListener("keydown",this.listController.handleKeydown)}render(){return s`
      <slot
        @deactivate-items=${this.listController.onDeactivateItems}
        @request-activation=${this.listController.onRequestActivation}
        @slotchange=${this.listController.onSlotchange}>
      </slot>
    `}activateNextItem(){return this.listController.activateNextItem()}activatePreviousItem(){return this.listController.activatePreviousItem()}}h([_e({flatten:!0})],oo.prototype,"slotItems",void 0);/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Os=$`:host{background:var(--md-list-container-color, var(--md-sys-color-surface, #fef7ff));color:unset;display:flex;flex-direction:column;outline:none;padding:8px 0;position:relative}
`;/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let Di=class extends oo{};Di.styles=[Os];Di=h([I("md-list")],Di);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Qi extends _{constructor(){super(...arguments),this.multiline=!1}render(){return s`
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
    `}handleTextSlotChange(){let t=!1,i=0;for(const a of this.textSlots)if(Ms(a)&&(i+=1),i>1){t=!0;break}this.multiline=t}}h([v({type:Boolean,reflect:!0})],Qi.prototype,"multiline",void 0);h([Ko(".text slot")],Qi.prototype,"textSlots",void 0);function Ms(e){var t;for(const i of e.assignedNodes({flatten:!0})){const a=i.nodeType===Node.ELEMENT_NODE,o=i.nodeType===Node.TEXT_NODE&&((t=i.textContent)==null?void 0:t.match(/\S/));if(a||o)return!0}return!1}/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Rs=$`:host{color:var(--md-sys-color-on-surface, #1d1b20);font-family:var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto));font-size:var(--md-sys-typescale-body-large-size, 1rem);font-weight:var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400));line-height:var(--md-sys-typescale-body-large-line-height, 1.5rem);align-items:center;box-sizing:border-box;display:flex;gap:16px;min-height:56px;overflow:hidden;padding:12px 16px;position:relative;text-overflow:ellipsis}:host([multiline]){min-height:72px}[name=overline]{color:var(--md-sys-color-on-surface-variant, #49454f);font-family:var(--md-sys-typescale-label-small-font, var(--md-ref-typeface-plain, Roboto));font-size:var(--md-sys-typescale-label-small-size, 0.6875rem);font-weight:var(--md-sys-typescale-label-small-weight, var(--md-ref-typeface-weight-medium, 500));line-height:var(--md-sys-typescale-label-small-line-height, 1rem)}[name=supporting-text]{color:var(--md-sys-color-on-surface-variant, #49454f);font-family:var(--md-sys-typescale-body-medium-font, var(--md-ref-typeface-plain, Roboto));font-size:var(--md-sys-typescale-body-medium-size, 0.875rem);font-weight:var(--md-sys-typescale-body-medium-weight, var(--md-ref-typeface-weight-regular, 400));line-height:var(--md-sys-typescale-body-medium-line-height, 1.25rem)}[name=trailing-supporting-text]{color:var(--md-sys-color-on-surface-variant, #49454f);font-family:var(--md-sys-typescale-label-small-font, var(--md-ref-typeface-plain, Roboto));font-size:var(--md-sys-typescale-label-small-size, 0.6875rem);font-weight:var(--md-sys-typescale-label-small-weight, var(--md-ref-typeface-weight-medium, 500));line-height:var(--md-sys-typescale-label-small-line-height, 1rem)}[name=container]::slotted(*){inset:0;position:absolute}.default-slot{display:inline}.default-slot,.text ::slotted(*){overflow:hidden;text-overflow:ellipsis}.text{display:flex;flex:1;flex-direction:column;overflow:hidden}
`;/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let Oi=class extends Qi{};Oi.styles=[Rs];Oi=h([I("md-item")],Oi);/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Fs=ke(_);class Ce extends Fs{constructor(){super(...arguments),this.disabled=!1,this.type="text",this.isListItem=!0,this.href="",this.target=""}get isDisabled(){return this.disabled&&this.type!=="link"}willUpdate(t){this.href&&(this.type="link"),super.willUpdate(t)}render(){return this.renderListItem(s`
      <md-item>
        <div slot="container">
          ${this.renderRipple()} ${this.renderFocusRing()}
        </div>
        <slot name="start" slot="start"></slot>
        <slot name="end" slot="end"></slot>
        ${this.renderBody()}
      </md-item>
    `)}renderListItem(t){const i=this.type==="link";let a;switch(this.type){case"link":a=ve`a`;break;case"button":a=ve`button`;break;default:case"text":a=ve`li`;break}const o=this.type!=="text",r=i&&this.target?this.target:l;return Xi`
      <${a}
        id="item"
        tabindex="${this.isDisabled||!o?-1:0}"
        ?disabled=${this.isDisabled}
        role="listitem"
        aria-selected=${this.ariaSelected||l}
        aria-checked=${this.ariaChecked||l}
        aria-expanded=${this.ariaExpanded||l}
        aria-haspopup=${this.ariaHasPopup||l}
        class="list-item ${ae(this.getRenderClasses())}"
        href=${this.href||l}
        target=${r}
        @focus=${this.onFocus}
      >${t}</${a}>
    `}renderRipple(){return this.type==="text"?l:s` <md-ripple
      part="ripple"
      for="item"
      ?disabled=${this.isDisabled}></md-ripple>`}renderFocusRing(){return this.type==="text"?l:s` <md-focus-ring
      @visibility-changed=${this.onFocusRingVisibilityChanged}
      part="focus-ring"
      for="item"
      inward></md-focus-ring>`}onFocusRingVisibilityChanged(t){}getRenderClasses(){return{disabled:this.isDisabled}}renderBody(){return s`
      <slot></slot>
      <slot name="overline" slot="overline"></slot>
      <slot name="headline" slot="headline"></slot>
      <slot name="supporting-text" slot="supporting-text"></slot>
      <slot
        name="trailing-supporting-text"
        slot="trailing-supporting-text"></slot>
    `}onFocus(){this.tabIndex===-1&&this.dispatchEvent(Ls())}focus(){var t;(t=this.listItemRoot)==null||t.focus()}click(){if(!this.listItemRoot){super.click();return}this.listItemRoot.click()}}Ce.shadowRootOptions={..._.shadowRootOptions,delegatesFocus:!0};h([v({type:Boolean,reflect:!0})],Ce.prototype,"disabled",void 0);h([v({reflect:!0})],Ce.prototype,"type",void 0);h([v({type:Boolean,attribute:"md-list-item",reflect:!0})],Ce.prototype,"isListItem",void 0);h([v()],Ce.prototype,"href",void 0);h([v()],Ce.prototype,"target",void 0);h([S(".list-item")],Ce.prototype,"listItemRoot",void 0);/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Ns=$`:host{display:flex;-webkit-tap-highlight-color:rgba(0,0,0,0);--md-ripple-hover-color: var(--md-list-item-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--md-ripple-hover-opacity: var(--md-list-item-hover-state-layer-opacity, 0.08);--md-ripple-pressed-color: var(--md-list-item-pressed-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--md-ripple-pressed-opacity: var(--md-list-item-pressed-state-layer-opacity, 0.12)}:host(:is([type=button]:not([disabled]),[type=link])){cursor:pointer}md-focus-ring{z-index:1;--md-focus-ring-shape: 8px}a,button,li{background:none;border:none;cursor:inherit;padding:0;margin:0;text-align:unset;text-decoration:none}.list-item{border-radius:inherit;display:flex;flex:1;max-width:inherit;min-width:inherit;outline:none;-webkit-tap-highlight-color:rgba(0,0,0,0);width:100%}.list-item.interactive{cursor:pointer}.list-item.disabled{opacity:var(--md-list-item-disabled-opacity, 0.3);pointer-events:none}[slot=container]{pointer-events:none}md-ripple{border-radius:inherit}md-item{border-radius:inherit;flex:1;height:100%;color:var(--md-list-item-label-text-color, var(--md-sys-color-on-surface, #1d1b20));font-family:var(--md-list-item-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));font-size:var(--md-list-item-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));line-height:var(--md-list-item-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));font-weight:var(--md-list-item-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));min-height:var(--md-list-item-one-line-container-height, 56px);padding-top:var(--md-list-item-top-space, 12px);padding-bottom:var(--md-list-item-bottom-space, 12px);padding-inline-start:var(--md-list-item-leading-space, 16px);padding-inline-end:var(--md-list-item-trailing-space, 16px)}md-item[multiline]{min-height:var(--md-list-item-two-line-container-height, 72px)}[slot=supporting-text]{color:var(--md-list-item-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));font-family:var(--md-list-item-supporting-text-font, var(--md-sys-typescale-body-medium-font, var(--md-ref-typeface-plain, Roboto)));font-size:var(--md-list-item-supporting-text-size, var(--md-sys-typescale-body-medium-size, 0.875rem));line-height:var(--md-list-item-supporting-text-line-height, var(--md-sys-typescale-body-medium-line-height, 1.25rem));font-weight:var(--md-list-item-supporting-text-weight, var(--md-sys-typescale-body-medium-weight, var(--md-ref-typeface-weight-regular, 400)))}[slot=trailing-supporting-text]{color:var(--md-list-item-trailing-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));font-family:var(--md-list-item-trailing-supporting-text-font, var(--md-sys-typescale-label-small-font, var(--md-ref-typeface-plain, Roboto)));font-size:var(--md-list-item-trailing-supporting-text-size, var(--md-sys-typescale-label-small-size, 0.6875rem));line-height:var(--md-list-item-trailing-supporting-text-line-height, var(--md-sys-typescale-label-small-line-height, 1rem));font-weight:var(--md-list-item-trailing-supporting-text-weight, var(--md-sys-typescale-label-small-weight, var(--md-ref-typeface-weight-medium, 500)))}:is([slot=start],[slot=end])::slotted(*){fill:currentColor}[slot=start]{color:var(--md-list-item-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f))}[slot=end]{color:var(--md-list-item-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f))}@media(forced-colors: active){.disabled slot{color:GrayText}.list-item.disabled{color:GrayText;opacity:1}}
`;/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let Mi=class extends Ce{};Mi.styles=[Ns];Mi=h([I("md-list-item")],Mi);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const bt=Symbol("isFocusable"),ii=Symbol("privateIsFocusable"),yt=Symbol("externalTabIndex"),xt=Symbol("isUpdatingTabIndex"),wt=Symbol("updateTabIndex");function Bs(e){var t,i,a;class o extends e{constructor(){super(...arguments),this[t]=!0,this[i]=null,this[a]=!1}get[bt](){return this[ii]}set[bt](n){this[bt]!==n&&(this[ii]=n,this[wt]())}connectedCallback(){super.connectedCallback(),this[wt]()}attributeChangedCallback(n,d,p){if(n!=="tabindex"){super.attributeChangedCallback(n,d,p);return}if(this.requestUpdate("tabIndex",Number(d??-1)),!this[xt]){if(!this.hasAttribute("tabindex")){this[yt]=null,this[wt]();return}this[yt]=this.tabIndex}}[(t=ii,i=yt,a=xt,wt)](){const n=this[bt]?0:-1,d=this[yt]??n;this[xt]=!0,this.tabIndex=d,this[xt]=!1}}return h([v({noAccessor:!0})],o.prototype,"tabIndex",void 0),o}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const ro=Symbol("animateIndicator"),Us=Bs(_);class de extends Us{get selected(){return this.active}set selected(t){this.active=t}constructor(){super(),this.isTab=!0,this.active=!1,this.hasIcon=!1,this.iconOnly=!1,this.fullWidthIndicator=!1,this.internals=this.attachInternals(),this.internals.role="tab",this.addEventListener("keydown",this.handleKeydown.bind(this))}render(){const t=s`<div class="indicator"></div>`;return s`<div
      class="button"
      role="presentation"
      @click=${this.handleContentClick}>
      <md-focus-ring part="focus-ring" inward .control=${this}></md-focus-ring>
      <md-elevation part="elevation"></md-elevation>
      <md-ripple .control=${this}></md-ripple>
      <div
        class="content ${ae(this.getContentClasses())}"
        role="presentation">
        <slot name="icon" @slotchange=${this.handleIconSlotChange}></slot>
        <slot @slotchange=${this.handleSlotChange}></slot>
        ${this.fullWidthIndicator?l:t}
      </div>
      ${this.fullWidthIndicator?t:l}
    </div>`}getContentClasses(){return{"has-icon":this.hasIcon,"has-label":!this.iconOnly}}updated(){this.internals.ariaSelected=String(this.active)}async handleKeydown(t){await 0,!t.defaultPrevented&&(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),this.click())}handleContentClick(t){t.stopPropagation(),this.click()}[ro](t){if(!this.indicator)return;this.indicator.getAnimations().forEach(a=>{a.cancel()});const i=this.getKeyframes(t);i!==null&&this.indicator.animate(i,{duration:250,easing:Pe.EMPHASIZED})}getKeyframes(t){var m;const i=js();if(!this.active)return i?[{opacity:1},{transform:"none"}]:null;const a={},o=((m=t.indicator)==null?void 0:m.getBoundingClientRect())??{},r=o.left,n=o.width,d=this.indicator.getBoundingClientRect(),p=d.left,f=d.width,g=n/f;return!i&&r!==void 0&&p!==void 0&&!isNaN(g)?a.transform=`translateX(${(r-p).toFixed(4)}px) scaleX(${g.toFixed(4)})`:a.opacity=0,[a,{transform:"none"}]}handleSlotChange(){this.iconOnly=!1;for(const t of this.assignedDefaultNodes){const i=t.nodeType===Node.TEXT_NODE&&!!t.wholeText.match(/\S/);if(t.nodeType===Node.ELEMENT_NODE||i)return}this.iconOnly=!0}handleIconSlotChange(){this.hasIcon=this.assignedIcons.length>0}}h([v({type:Boolean,reflect:!0,attribute:"md-tab"})],de.prototype,"isTab",void 0);h([v({type:Boolean,reflect:!0})],de.prototype,"active",void 0);h([v({type:Boolean})],de.prototype,"selected",null);h([v({type:Boolean,attribute:"has-icon"})],de.prototype,"hasIcon",void 0);h([v({type:Boolean,attribute:"icon-only"})],de.prototype,"iconOnly",void 0);h([S(".indicator")],de.prototype,"indicator",void 0);h([c()],de.prototype,"fullWidthIndicator",void 0);h([Vo({flatten:!0})],de.prototype,"assignedDefaultNodes",void 0);h([_e({slot:"icon",flatten:!0})],de.prototype,"assignedIcons",void 0);function js(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Ue extends _{get activeTab(){return this.tabs.find(t=>t.active)??null}set activeTab(t){t&&this.activateTab(t)}get activeTabIndex(){return this.tabs.findIndex(t=>t.active)}set activeTabIndex(t){const i=()=>{const a=this.tabs[t];a&&this.activateTab(a)};if(!this.slotElement){this.updateComplete.then(i);return}i()}get focusedTab(){return this.tabs.find(t=>t.matches(":focus-within"))}constructor(){super(),this.autoActivate=!1,this.internals=this.attachInternals(),this.internals.role="tablist",this.addEventListener("keydown",this.handleKeydown.bind(this)),this.addEventListener("keyup",this.handleKeyup.bind(this)),this.addEventListener("focusout",this.handleFocusout.bind(this))}async scrollToTab(t){await this.updateComplete;const{tabs:i}=this;if(t??(t=this.activeTab),!t||!i.includes(t)||!this.tabsScrollerElement)return;for(const y of this.tabs)await y.updateComplete;const a=t.offsetLeft,o=t.offsetWidth,r=this.scrollLeft,n=this.offsetWidth,d=48,p=a-d,f=a+o-n+d,g=Math.min(p,Math.max(f,r)),m=this.focusedTab?"auto":"instant";this.tabsScrollerElement.scrollTo({behavior:m,top:0,left:g})}render(){return s`
      <div class="tabs">
        <slot
          @slotchange=${this.handleSlotChange}
          @click=${this.handleTabClick}></slot>
      </div>
      <md-divider part="divider"></md-divider>
    `}async handleTabClick(t){const i=t.target;await 0,!(t.defaultPrevented||!Hs(i)||i.active)&&this.activateTab(i)}activateTab(t){const{tabs:i}=this,a=this.activeTab;if(!(!i.includes(t)||a===t)){for(const o of i)o.active=o===t;if(a){if(!this.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0}))){for(const r of i)r.active=r===a;return}t[ro](a)}this.updateFocusableTab(t),this.scrollToTab(t)}}updateFocusableTab(t){for(const i of this.tabs)i.tabIndex=i===t?0:-1}async handleKeydown(t){await 0;const i=t.key==="ArrowLeft",a=t.key==="ArrowRight",o=t.key==="Home",r=t.key==="End";if(t.defaultPrevented||!i&&!a&&!o&&!r)return;const{tabs:n}=this;if(n.length<2)return;t.preventDefault();let d;if(o||r)d=o?0:n.length-1;else{const g=getComputedStyle(this).direction==="rtl"?i:a,{focusedTab:m}=this;if(!m)d=g?0:n.length-1;else{const y=this.tabs.indexOf(m);d=g?y+1:y-1,d>=n.length?d=0:d<0&&(d=n.length-1)}}const p=n[d];p.focus(),this.autoActivate?this.activateTab(p):this.updateFocusableTab(p)}handleKeyup(){this.scrollToTab(this.focusedTab??this.activeTab)}handleFocusout(){if(this.matches(":focus-within"))return;const{activeTab:t}=this;t&&this.updateFocusableTab(t)}handleSlotChange(){const t=this.tabs[0];!this.activeTab&&t&&this.activateTab(t),this.scrollToTab(this.activeTab)}}h([_e({flatten:!0,selector:"[md-tab]"})],Ue.prototype,"tabs",void 0);h([v({type:Number,attribute:"active-tab-index"})],Ue.prototype,"activeTabIndex",null);h([v({type:Boolean,attribute:"auto-activate"})],Ue.prototype,"autoActivate",void 0);h([S(".tabs")],Ue.prototype,"tabsScrollerElement",void 0);h([S("slot")],Ue.prototype,"slotElement",void 0);function Hs(e){return e instanceof HTMLElement&&e.hasAttribute("md-tab")}/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Gs=$`:host{box-sizing:border-box;display:flex;flex-direction:column;overflow:auto;scroll-behavior:smooth;scrollbar-width:none;position:relative}:host([hidden]){display:none}:host::-webkit-scrollbar{display:none}.tabs{align-items:end;display:flex;height:100%;overflow:inherit;scroll-behavior:inherit;scrollbar-width:inherit;justify-content:space-between;width:100%}::slotted(*){flex:1}::slotted([active]){z-index:1}
`;/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let Ri=class extends Ue{};Ri.styles=[Gs];Ri=h([I("md-tabs")],Ri);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class so extends de{constructor(){super(...arguments),this.inlineIcon=!1}getContentClasses(){return{...super.getContentClasses(),stacked:!this.inlineIcon}}}h([v({type:Boolean,attribute:"inline-icon"})],so.prototype,"inlineIcon",void 0);/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Ws=$`:host{--_active-indicator-color: var(--md-primary-tab-active-indicator-color, var(--md-sys-color-primary, #6750a4));--_active-indicator-height: var(--md-primary-tab-active-indicator-height, 3px);--_active-indicator-shape: var(--md-primary-tab-active-indicator-shape, 3px 3px 0px 0px);--_active-hover-state-layer-color: var(--md-primary-tab-active-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_active-hover-state-layer-opacity: var(--md-primary-tab-active-hover-state-layer-opacity, 0.08);--_active-pressed-state-layer-color: var(--md-primary-tab-active-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_active-pressed-state-layer-opacity: var(--md-primary-tab-active-pressed-state-layer-opacity, 0.12);--_container-color: var(--md-primary-tab-container-color, var(--md-sys-color-surface, #fef7ff));--_container-elevation: var(--md-primary-tab-container-elevation, 0);--_container-height: var(--md-primary-tab-container-height, 48px);--_with-icon-and-label-text-container-height: var(--md-primary-tab-with-icon-and-label-text-container-height, 64px);--_hover-state-layer-color: var(--md-primary-tab-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-state-layer-opacity: var(--md-primary-tab-hover-state-layer-opacity, 0.08);--_pressed-state-layer-color: var(--md-primary-tab-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-opacity: var(--md-primary-tab-pressed-state-layer-opacity, 0.12);--_active-focus-icon-color: var(--md-primary-tab-active-focus-icon-color, var(--md-sys-color-primary, #6750a4));--_active-hover-icon-color: var(--md-primary-tab-active-hover-icon-color, var(--md-sys-color-primary, #6750a4));--_active-icon-color: var(--md-primary-tab-active-icon-color, var(--md-sys-color-primary, #6750a4));--_active-pressed-icon-color: var(--md-primary-tab-active-pressed-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-size: var(--md-primary-tab-icon-size, 24px);--_focus-icon-color: var(--md-primary-tab-focus-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-icon-color: var(--md-primary-tab-hover-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_icon-color: var(--md-primary-tab-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-icon-color: var(--md-primary-tab-pressed-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_label-text-font: var(--md-primary-tab-label-text-font, var(--md-sys-typescale-title-small-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-primary-tab-label-text-line-height, var(--md-sys-typescale-title-small-line-height, 1.25rem));--_label-text-size: var(--md-primary-tab-label-text-size, var(--md-sys-typescale-title-small-size, 0.875rem));--_label-text-weight: var(--md-primary-tab-label-text-weight, var(--md-sys-typescale-title-small-weight, var(--md-ref-typeface-weight-medium, 500)));--_active-focus-label-text-color: var(--md-primary-tab-active-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_active-hover-label-text-color: var(--md-primary-tab-active-hover-label-text-color, var(--md-sys-color-primary, #6750a4));--_active-label-text-color: var(--md-primary-tab-active-label-text-color, var(--md-sys-color-primary, #6750a4));--_active-pressed-label-text-color: var(--md-primary-tab-active-pressed-label-text-color, var(--md-sys-color-primary, #6750a4));--_focus-label-text-color: var(--md-primary-tab-focus-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-label-text-color: var(--md-primary-tab-hover-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_label-text-color: var(--md-primary-tab-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-label-text-color: var(--md-primary-tab-pressed-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_container-shape-start-start: var(--md-primary-tab-container-shape-start-start, var(--md-primary-tab-container-shape, var(--md-sys-shape-corner-none, 0px)));--_container-shape-start-end: var(--md-primary-tab-container-shape-start-end, var(--md-primary-tab-container-shape, var(--md-sys-shape-corner-none, 0px)));--_container-shape-end-end: var(--md-primary-tab-container-shape-end-end, var(--md-primary-tab-container-shape, var(--md-sys-shape-corner-none, 0px)));--_container-shape-end-start: var(--md-primary-tab-container-shape-end-start, var(--md-primary-tab-container-shape, var(--md-sys-shape-corner-none, 0px)))}.content.stacked{flex-direction:column;gap:2px}.content.stacked.has-icon.has-label{height:var(--_with-icon-and-label-text-container-height)}
`;/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const qs=$`:host{display:inline-flex;align-items:center;justify-content:center;outline:none;padding:0 16px;position:relative;-webkit-tap-highlight-color:rgba(0,0,0,0);vertical-align:middle;user-select:none;font-family:var(--_label-text-font);font-size:var(--_label-text-size);line-height:var(--_label-text-line-height);font-weight:var(--_label-text-weight);color:var(--_label-text-color);z-index:0;--md-ripple-hover-color: var(--_hover-state-layer-color);--md-ripple-hover-opacity: var(--_hover-state-layer-opacity);--md-ripple-pressed-color: var(--_pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_pressed-state-layer-opacity);--md-elevation-level: var(--_container-elevation)}md-focus-ring{--md-focus-ring-shape: 8px}:host([active]) md-focus-ring{margin-bottom:calc(var(--_active-indicator-height) + 1px)}.button::before{background:var(--_container-color);content:"";inset:0;position:absolute;z-index:-1}.button::before,md-ripple,md-elevation{border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-end-radius:var(--_container-shape-end-end);border-end-start-radius:var(--_container-shape-end-start)}.content{position:relative;box-sizing:border-box;display:inline-flex;flex-direction:row;align-items:center;justify-content:center;height:var(--_container-height);gap:8px}.indicator{position:absolute;box-sizing:border-box;z-index:-1;transform-origin:bottom left;background:var(--_active-indicator-color);border-radius:var(--_active-indicator-shape);height:var(--_active-indicator-height);inset:auto 0 0 0;opacity:0}::slotted([slot=icon]){display:inline-flex;position:relative;writing-mode:horizontal-tb;fill:currentColor;color:var(--_icon-color);font-size:var(--_icon-size);width:var(--_icon-size);height:var(--_icon-size)}:host(:hover){color:var(--_hover-label-text-color);cursor:pointer}:host(:hover) ::slotted([slot=icon]){color:var(--_hover-icon-color)}:host(:focus){color:var(--_focus-label-text-color)}:host(:focus) ::slotted([slot=icon]){color:var(--_focus-icon-color)}:host(:active){color:var(--_pressed-label-text-color)}:host(:active) ::slotted([slot=icon]){color:var(--_pressed-icon-color)}:host([active]) .indicator{opacity:1}:host([active]){color:var(--_active-label-text-color);--md-ripple-hover-color: var(--_active-hover-state-layer-color);--md-ripple-hover-opacity: var(--_active-hover-state-layer-opacity);--md-ripple-pressed-color: var(--_active-pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_active-pressed-state-layer-opacity)}:host([active]) ::slotted([slot=icon]){color:var(--_active-icon-color)}:host([active]:hover){color:var(--_active-hover-label-text-color)}:host([active]:hover) ::slotted([slot=icon]){color:var(--_active-hover-icon-color)}:host([active]:focus){color:var(--_active-focus-label-text-color)}:host([active]:focus) ::slotted([slot=icon]){color:var(--_active-focus-icon-color)}:host([active]:active){color:var(--_active-pressed-label-text-color)}:host([active]:active) ::slotted([slot=icon]){color:var(--_active-pressed-icon-color)}:host,::slotted(*){white-space:nowrap}@media(forced-colors: active){.indicator{background:CanvasText}}
`;/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let Fi=class extends so{};Fi.styles=[qs,Ws];Fi=h([I("md-primary-tab")],Fi);/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Ys=$`@layer{.md-typescale-display-small,.md-typescale-display-small-prominent{font:var(--md-sys-typescale-display-small-weight, var(--md-ref-typeface-weight-regular, 400)) var(--md-sys-typescale-display-small-size, 2.25rem)/var(--md-sys-typescale-display-small-line-height, 2.75rem) var(--md-sys-typescale-display-small-font, var(--md-ref-typeface-brand, Roboto))}.md-typescale-display-medium,.md-typescale-display-medium-prominent{font:var(--md-sys-typescale-display-medium-weight, var(--md-ref-typeface-weight-regular, 400)) var(--md-sys-typescale-display-medium-size, 2.8125rem)/var(--md-sys-typescale-display-medium-line-height, 3.25rem) var(--md-sys-typescale-display-medium-font, var(--md-ref-typeface-brand, Roboto))}.md-typescale-display-large,.md-typescale-display-large-prominent{font:var(--md-sys-typescale-display-large-weight, var(--md-ref-typeface-weight-regular, 400)) var(--md-sys-typescale-display-large-size, 3.5625rem)/var(--md-sys-typescale-display-large-line-height, 4rem) var(--md-sys-typescale-display-large-font, var(--md-ref-typeface-brand, Roboto))}.md-typescale-headline-small,.md-typescale-headline-small-prominent{font:var(--md-sys-typescale-headline-small-weight, var(--md-ref-typeface-weight-regular, 400)) var(--md-sys-typescale-headline-small-size, 1.5rem)/var(--md-sys-typescale-headline-small-line-height, 2rem) var(--md-sys-typescale-headline-small-font, var(--md-ref-typeface-brand, Roboto))}.md-typescale-headline-medium,.md-typescale-headline-medium-prominent{font:var(--md-sys-typescale-headline-medium-weight, var(--md-ref-typeface-weight-regular, 400)) var(--md-sys-typescale-headline-medium-size, 1.75rem)/var(--md-sys-typescale-headline-medium-line-height, 2.25rem) var(--md-sys-typescale-headline-medium-font, var(--md-ref-typeface-brand, Roboto))}.md-typescale-headline-large,.md-typescale-headline-large-prominent{font:var(--md-sys-typescale-headline-large-weight, var(--md-ref-typeface-weight-regular, 400)) var(--md-sys-typescale-headline-large-size, 2rem)/var(--md-sys-typescale-headline-large-line-height, 2.5rem) var(--md-sys-typescale-headline-large-font, var(--md-ref-typeface-brand, Roboto))}.md-typescale-title-small,.md-typescale-title-small-prominent{font:var(--md-sys-typescale-title-small-weight, var(--md-ref-typeface-weight-medium, 500)) var(--md-sys-typescale-title-small-size, 0.875rem)/var(--md-sys-typescale-title-small-line-height, 1.25rem) var(--md-sys-typescale-title-small-font, var(--md-ref-typeface-plain, Roboto))}.md-typescale-title-medium,.md-typescale-title-medium-prominent{font:var(--md-sys-typescale-title-medium-weight, var(--md-ref-typeface-weight-medium, 500)) var(--md-sys-typescale-title-medium-size, 1rem)/var(--md-sys-typescale-title-medium-line-height, 1.5rem) var(--md-sys-typescale-title-medium-font, var(--md-ref-typeface-plain, Roboto))}.md-typescale-title-large,.md-typescale-title-large-prominent{font:var(--md-sys-typescale-title-large-weight, var(--md-ref-typeface-weight-regular, 400)) var(--md-sys-typescale-title-large-size, 1.375rem)/var(--md-sys-typescale-title-large-line-height, 1.75rem) var(--md-sys-typescale-title-large-font, var(--md-ref-typeface-brand, Roboto))}.md-typescale-body-small,.md-typescale-body-small-prominent{font:var(--md-sys-typescale-body-small-weight, var(--md-ref-typeface-weight-regular, 400)) var(--md-sys-typescale-body-small-size, 0.75rem)/var(--md-sys-typescale-body-small-line-height, 1rem) var(--md-sys-typescale-body-small-font, var(--md-ref-typeface-plain, Roboto))}.md-typescale-body-medium,.md-typescale-body-medium-prominent{font:var(--md-sys-typescale-body-medium-weight, var(--md-ref-typeface-weight-regular, 400)) var(--md-sys-typescale-body-medium-size, 0.875rem)/var(--md-sys-typescale-body-medium-line-height, 1.25rem) var(--md-sys-typescale-body-medium-font, var(--md-ref-typeface-plain, Roboto))}.md-typescale-body-large,.md-typescale-body-large-prominent{font:var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)) var(--md-sys-typescale-body-large-size, 1rem)/var(--md-sys-typescale-body-large-line-height, 1.5rem) var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto))}.md-typescale-label-small,.md-typescale-label-small-prominent{font:var(--md-sys-typescale-label-small-weight, var(--md-ref-typeface-weight-medium, 500)) var(--md-sys-typescale-label-small-size, 0.6875rem)/var(--md-sys-typescale-label-small-line-height, 1rem) var(--md-sys-typescale-label-small-font, var(--md-ref-typeface-plain, Roboto))}.md-typescale-label-medium,.md-typescale-label-medium-prominent{font:var(--md-sys-typescale-label-medium-weight, var(--md-ref-typeface-weight-medium, 500)) var(--md-sys-typescale-label-medium-size, 0.75rem)/var(--md-sys-typescale-label-medium-line-height, 1rem) var(--md-sys-typescale-label-medium-font, var(--md-ref-typeface-plain, Roboto))}.md-typescale-label-medium-prominent{font-weight:var(--md-sys-typescale-label-medium-weight-prominent, var(--md-ref-typeface-weight-bold, 700))}.md-typescale-label-large,.md-typescale-label-large-prominent{font:var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)) var(--md-sys-typescale-label-large-size, 0.875rem)/var(--md-sys-typescale-label-large-line-height, 1.25rem) var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto))}.md-typescale-label-large-prominent{font-weight:var(--md-sys-typescale-label-large-weight-prominent, var(--md-ref-typeface-weight-bold, 700))}}
`,Ks=`
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
`,ye=$`
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
`,ce=$`
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
`,no="oppai_theme";function tt(){const e=localStorage.getItem(no);return e==="light"||e==="dark"||e==="system"?e:"dark"}function lo(e){try{localStorage.setItem(no,e)}catch{}}function Wt(e){const t=e==="light"||e==="system"&&window.matchMedia("(prefers-color-scheme: light)").matches;document.documentElement.dataset.theme=t?"light":""}function Vs(){window.matchMedia("(prefers-color-scheme: light)").addEventListener("change",()=>{tt()==="system"&&Wt("system")})}$`
  .card {
    background: var(--md-sys-color-surface-container);
    border-radius: var(--oppai-radius);
    overflow: hidden;
  }
`;const Js="profile",Ni="oppai_token";function Bi(){return localStorage.getItem(Ni)}function Pt(e){e?localStorage.setItem(Ni,e):localStorage.removeItem(Ni)}function F(e,t="error",i={}){window.dispatchEvent(new CustomEvent("oppai-mascot",{detail:{message:e,tone:t,...i}}))}async function b(e,t={},i=0){const a=new Headers(t.headers),o=Bi();o&&a.set("Authorization",`Bearer ${o}`),t.body&&!(t.body instanceof FormData)&&a.set("Content-Type","application/json");const r=i>0?new AbortController:null,n=r?setTimeout(()=>r.abort(),i):null;try{const d=await fetch(e,{...t,headers:a,signal:r==null?void 0:r.signal});if(d.status===401)throw e!=="/api/auth/login"&&(Pt(null),window.dispatchEvent(new CustomEvent("oppai-logout")),F("Your session ended. Please sign in again.")),new Error("unauthorized");if(!d.ok){let p=d.statusText;try{const f=await d.json();f!=null&&f.error&&(p=f.error)}catch{}throw new Error(p)}return d.status===204?void 0:await d.json()}catch(d){if(r!=null&&r.signal.aborted){const p=new Error("Timed out — the site was too slow or unreachable.");throw e!=="/api/auth/login"&&F(p.message),p}throw e!=="/api/auth/login"&&d instanceof Error&&d.message!=="unauthorized"&&F(d.message||"Something went wrong."),d}finally{n&&clearTimeout(n)}}const u={health:()=>b("/api/health"),login:(e,t)=>b("/api/auth/login",{method:"POST",body:JSON.stringify({username:e,password:t,client:"web"})}),me:()=>b("/api/auth/me"),logout:()=>b("/api/auth/logout",{method:"POST"}),listMedia:(e="",t=60,i=0)=>{const a=new URLSearchParams;return e&&a.set("kind",e),a.set("limit",String(t)),a.set("offset",String(i)),b(`/api/media?${a}`)},getMedia:e=>b(`/api/media/${e}`),streamURL:e=>`/api/media/${e}/stream`,thumbURL:e=>`/api/media/${e}/thumb`,proxyURL:e=>`/api/scrape/proxy?url=${encodeURIComponent(e)}`,upload:(e,t)=>{const i=new FormData;return i.append("file",e),t&&i.append("title",t),b("/api/media",{method:"POST",body:i})},autotag:e=>b(`/api/media/${e}/autotag`,{method:"POST"}),scanImage:e=>b("/api/ai/scan-image",{method:"POST",body:JSON.stringify({imageData:e})},6e4),comicInfo:e=>b(`/api/media/${e}/comic`),pageURL:(e,t)=>`/api/media/${e}/page/${t}`,getSettings:()=>b("/api/settings"),saveSettings:e=>b("/api/settings",{method:"PUT",body:JSON.stringify(e)}),stats:()=>b("/api/stats"),changePassword:(e,t)=>b("/api/auth/password",{method:"POST",body:JSON.stringify({current:e,new:t})}),updateMedia:(e,t)=>b(`/api/media/${e}`,{method:"PATCH",body:JSON.stringify(t)}),deleteMedia:e=>b(`/api/media/${e}`,{method:"DELETE"}),bulkMedia:(e,t,i)=>b("/api/media/bulk",{method:"POST",body:JSON.stringify({action:e,ids:t,patch:i??{}})}),scrape:e=>b("/api/scrape",{method:"POST",body:JSON.stringify({url:e})},45e3),scrapeBulk:e=>b("/api/scrape/bulk",{method:"POST",body:JSON.stringify({urls:e})},75e3),scrapeImport:e=>b("/api/scrape/import",{method:"POST",body:JSON.stringify(e)}),apkInfo:()=>b("/api/apk/info"),sources:()=>b("/api/sources"),browseSource:(e,t={})=>{const i=new URLSearchParams;return t.feed&&i.set("feed",t.feed),t.cursor&&i.set("cursor",t.cursor),t.q&&i.set("q",t.q),t.sort&&i.set("sort",t.sort),b(`/api/sources/${e}/browse?${i}`,{},45e3)},sourcePages:(e,t)=>b(`/api/sources/${encodeURIComponent(e)}/item/${encodeURIComponent(t)}/pages`,{},45e3),sourceComments:(e,t)=>b(`/api/sources/${encodeURIComponent(e)}/item/${encodeURIComponent(t)}/comments`,{},45e3),sourceStreamURL:e=>`/api/sources/stream?url=${encodeURIComponent(e)}`,saveFromSource:(e,t)=>b(`/api/sources/${encodeURIComponent(e)}/save`,{method:"POST",body:JSON.stringify(t)},15*6e4),imageGenStatus:()=>b("/api/imagegen/status",{},12e3),booruTags:e=>b(`/api/imagegen/tags?q=${encodeURIComponent(e)}`),gameGallery:e=>b(`/api/media/${e}/gallery`),uploadGameGallery:(e,t)=>{const i=new FormData;return i.append("file",t),b(`/api/media/${e}/gallery`,{method:"POST",body:i})},removeGameGallery:(e,t)=>b(`/api/media/${e}/gallery/${t}`,{method:"DELETE"}),optimizePrompt:e=>b("/api/imagegen/prompt",{method:"POST",body:JSON.stringify({text:e})}),generate:e=>b("/api/imagegen/generate",{method:"POST",body:JSON.stringify(e)},10*6e4),genPreviewURL:e=>`/api/imagegen/preview/${encodeURIComponent(e)}`,saveGenerated:e=>b("/api/imagegen/save",{method:"POST",body:JSON.stringify(e)}),modelThumbURL:e=>`/api/imagegen/model-thumb?model=${encodeURIComponent(e)}`,setModelThumb:e=>b("/api/imagegen/model-thumb",{method:"PUT",body:JSON.stringify(e)}),chatStatus:()=>b("/api/chat/status",{},12e3),chat:(e,t,i="neutral",a=1,o={},r="libby",n=[],d="")=>b("/api/chat",{method:"POST",body:JSON.stringify({mode:e,messages:t,emotion:i,intensity:a,options:o,characterId:r,photoTags:n,photoImageId:d})},125e3),chatWorkspace:()=>b("/api/chat/workspace"),chatModels:()=>b("/api/chat/models",{},2e4),loadChatModel:(e,t={})=>b("/api/chat/models/load",{method:"POST",body:JSON.stringify({modelName:e,args:t})},10*6e4),unloadChatModel:()=>b("/api/chat/models/unload",{method:"POST"},13e4),saveChatWorkspace:e=>b("/api/chat/workspace",{method:"PUT",body:JSON.stringify(e)}),uploadChatImage:e=>b("/api/chat/images",{method:"POST",body:JSON.stringify(e)},12e4),deleteChatImage:e=>b(`/api/chat/images/${encodeURIComponent(e)}`,{method:"DELETE"}),chatImageURL:e=>`/api/chat/images/${encodeURIComponent(e)}`,loraThumbURL:e=>`/api/imagegen/lora-thumb?name=${encodeURIComponent(e)}`,characters:()=>b("/api/imagegen/characters"),saveCharacter:e=>b("/api/imagegen/characters",{method:"POST",body:JSON.stringify(e)}),deleteCharacter:e=>b(`/api/imagegen/characters/${encodeURIComponent(e)}`,{method:"DELETE"}),characterThumbURL:e=>`/api/imagegen/characters/${encodeURIComponent(e)}/thumb`,modelMeta:e=>b(`/api/imagegen/model?name=${encodeURIComponent(e)}`,{},2e4),patchModelMeta:e=>b("/api/imagegen/model",{method:"PATCH",body:JSON.stringify(e)},25e3),galleryBoards:()=>b("/api/imagegen/gallery/boards",{},2e4),createGalleryBoard:e=>b("/api/imagegen/gallery/boards",{method:"POST",body:JSON.stringify({name:e})},2e4),deleteGalleryBoard:e=>b(`/api/imagegen/gallery/boards/${encodeURIComponent(e)}`,{method:"DELETE"},2e4),galleryImages:(e,t=0,i=60)=>b(`/api/imagegen/gallery/images?board=${encodeURIComponent(e)}&offset=${t}&limit=${i}`,{},2e4),galleryThumbURL:e=>`/api/imagegen/gallery/image/${encodeURIComponent(e)}/thumb`,galleryFullURL:e=>`/api/imagegen/gallery/image/${encodeURIComponent(e)}`,deleteGalleryImage:e=>b(`/api/imagegen/gallery/image/${encodeURIComponent(e)}`,{method:"DELETE"}),deleteGalleryImages:e=>b("/api/imagegen/gallery/delete",{method:"POST",body:JSON.stringify({names:e})},4e4),addGalleryImagesToBoard:(e,t)=>b("/api/imagegen/gallery/board",{method:"POST",body:JSON.stringify({board:e,names:t})},4e4),saveGalleryImage:e=>b("/api/imagegen/gallery/save",{method:"POST",body:JSON.stringify(e)},9e4),civitaiSearch:(e={})=>{const t=new URLSearchParams;return e.q&&t.set("q",e.q),e.type&&t.set("type",e.type),e.category&&t.set("category",e.category),e.sort&&t.set("sort",e.sort),e.cursor&&t.set("cursor",e.cursor),b(`/api/imagegen/civitai/search?${t}`,{},45e3)},civitaiCategories:()=>b("/api/imagegen/civitai/categories",{},3e4),civitaiImageURL:e=>`/api/imagegen/civitai/image?url=${encodeURIComponent(e)}`,civitaiInstall:e=>b("/api/imagegen/civitai/install",{method:"POST",body:JSON.stringify({url:e})},3e4),civitaiInstalls:()=>b("/api/imagegen/civitai/installs",{},2e4),libbyOutfits:()=>b("/api/libby/outfits"),saveLibbyOutfit:e=>b("/api/libby/outfits",{method:"POST",body:JSON.stringify(e)}),deleteLibbyOutfit:e=>b(`/api/libby/outfits/${encodeURIComponent(e)}`,{method:"DELETE"}),setLibbyEmotion:(e,t,i,a=0)=>b(`/api/libby/outfits/${encodeURIComponent(e)}/emotions/${encodeURIComponent(t)}${a?`?level=${a}`:""}`,{method:"PUT",body:JSON.stringify({imageData:i})}),deleteLibbyEmotion:(e,t,i=0)=>b(`/api/libby/outfits/${encodeURIComponent(e)}/emotions/${encodeURIComponent(t)}${i?`?level=${i}`:""}`,{method:"DELETE"}),libbyEmotionURL:(e,t,i=0)=>`/api/libby/outfits/${encodeURIComponent(e)}/emotions/${encodeURIComponent(t)}${i?`?level=${i}`:""}`},co="oppai_hide_libby",Ui="oppai_libby_outfit";function Ne(){return localStorage.getItem(co)==="1"}function Xs(e){try{localStorage.setItem(co,e?"1":"0")}catch{}window.dispatchEvent(new CustomEvent("oppai-libby-pref",{detail:{hidden:e}}))}function Dt(){return localStorage.getItem(Ui)??""}function $a(e){try{e?localStorage.setItem(Ui,e):localStorage.removeItem(Ui)}catch{}window.dispatchEvent(new CustomEvent("oppai-libby-pref",{detail:{outfit:e}}))}const _a={1:{neutral:"/Libby_New/Calm/neutral.png",happy:"/Libby_New/Calm/happy.png",mischievous:"/Libby_New/Calm/Mischievous.png",surprised:"/Libby_New/Calm/suprised.png",thinking:"/Libby_New/Calm/Thinking.png"},2:{neutral:"/Libby_New/Warm/warm neutral.png",happy:"/Libby_New/Warm/warm happy.png",mischievous:"/Libby_New/Warm/warm Mischievous.png",surprised:"/Libby_New/Warm/warm suprised.png",thinking:"/Libby_New/Warm/warm thinking.png"},3:{neutral:"/Libby_New/flirty/Flirty Neutral.png",happy:"/Libby_New/flirty/Flirty Happy.png",mischievous:"/Libby_New/flirty/Flirty Mis.png",surprised:"/Libby_New/flirty/Flirty Suprised.png",thinking:"/Libby_New/flirty/Flirty Thinking.png"},4:{neutral:"/Libby_New/heated/heated Neutral.png",happy:"/Libby_New/heated/heated Happy.png",mischievous:"/Libby_New/heated/heated mis.png",surprised:"/Libby_New/heated/heated suprised.png",thinking:"/Libby_New/heated/heated thinking.png"},5:{neutral:"/Libby_New/Peak/Peak Neutral.png",happy:"/Libby_New/Peak/Peak Happy.png",mischievous:"/Libby_New/Peak/Peak Mis.png",surprised:"/Libby_New/Peak/Peak Suprise.png",thinking:"/Libby_New/Peak/Peak Thinking.png"}};function ka(e,t=1){const i=ne(e);return _a[re(t)][i]??_a[1].neutral}const po=["neutral","happy","mischievous","surprised","thinking"];function ne(e){let t=(e??"").trim().toLowerCase();return t==="default"&&(t="neutral"),(t==="sad"||t==="worried")&&(t="thinking"),t==="horniness"&&(t="mischievous"),po.includes(t)?t:"neutral"}function re(e){return Math.max(1,Math.min(5,Math.round(Number(e)||1)))}function Ot(e,t,i=Dt()){const a=ne(e),o=re(t),r=[];if(i&&i!=="default"){const n=`/api/libby/outfits/${encodeURIComponent(i)}/emotions/${encodeURIComponent(a)}`;for(let d=o-1;d>=1;d--)r.push(`${n}?level=${d}`);r.push(n)}return r.push(ka(a,o),ka("neutral",o),"/mascot.png"),[...new Set(r)]}function ho(e){const t=e.toLowerCase();return/timed? out|unreachable|network|offline|couldn.t reach|connection/.test(t)?{emotion:"thinking",intensity:4}:/unauthori[sz]ed|session ended|sign in|password|login/.test(t)?{emotion:"thinking",intensity:3}:/invalid|missing|required|not found|doesn.t exist/.test(t)?{emotion:"thinking",intensity:2}:/failed|error|couldn.t|can.t/.test(t)?{emotion:"surprised",intensity:3}:{emotion:"thinking",intensity:2}}function Je(e,t){const i=Number(e.dataset.fallbackIndex||"0")+1;i>=t.length||(e.dataset.fallbackIndex=String(i),e.src=t[i])}const uo="oppai_libby_intensity",mo="oppai_libby_progress",vo="oppai_libby_progression_multiplier",it=5,ea=[.25,.5,1,2];function fo(){const e=Number(localStorage.getItem(vo)??"0.5");return ea.includes(e)?e:.5}function Zs(e){const t=ea.includes(e)?e:.5;return localStorage.setItem(vo,String(t)),window.dispatchEvent(new CustomEvent("oppai-libby-progression",{detail:{multiplier:t}})),t}function Mt(e,t){const i=Math.max(1,Math.min(it,e+t*fo()));return{progress:i,intensity:Math.max(1,Math.min(it,Math.floor(i+1e-6)))}}function go(){const e=Number(sessionStorage.getItem(mo));if(Number.isFinite(e)&&e>=1&&e<=it)return e;const t=Number(sessionStorage.getItem(uo)??"1");return Number.isFinite(t)?Math.max(1,Math.min(it,t)):1}function Ee(){return Mt(go(),0).intensity}function $t(e){const t=Math.max(1,Math.min(it,Math.round(e)));return bo(t,t)}function Qs(e=1){const t=Mt(go(),e);return bo(t.progress,t.intensity)}function bo(e,t){try{sessionStorage.setItem(mo,String(e)),sessionStorage.setItem(uo,String(t))}catch{}return window.dispatchEvent(new CustomEvent("oppai-libby-meter",{detail:{intensity:t,progress:e}})),t}const Ca=new Map;function Xe(e,t){if(!t.length)return"";if(t.length===1)return t[0];const i=Ca.get(e),a=t.filter(r=>r!==i),o=a[Math.floor(Math.random()*a.length)];return Ca.set(e,o),o}function yo(e,t){return e[re(t)-1]??e[0]}function en(e){const t=re(e);return t>=5||t>=3?"mischievous":"happy"}const tn={import:[["Saved to your library.","Tucked away safely.","Filed. Nice pick."],["Ooh, good one. Saved.","That one's a keeper — saved.","Added. I like your taste."],["Mmh, saving that one for later…","Ooh. Adding that to the collection.","That's going somewhere special."],["Ohh, you're building a *collection*, aren't you?","Saved. My, my.","Mmh — you know exactly what you like."],["Nngh — yes. That one. Saved.","You keep this up and I won't be any use to you.","Saved… I need a minute."]],save:[["Kept it.","In the library now.","Done — it's yours."],["Saved that one for you.","Ooh, keeping it? Good.","That one earned its place."],["Mmh, that one's mine too now.","Saved. I might peek at it later.","Ooh, filing that away…"],["Ohh, keeping *that*? Bold.","Saved. You've got a type.","Mmh. Straight to the good shelf."],["That one's going to live in my head. Saved.","Ngh — saved, saved, fine.","You're doing this on purpose."]],generate:[["There you go.","Fresh out of the oven.","All done — take a look."],["Ooh, that came out nice.","Not bad at all. Have a look.","There — I think you'll like it."],["Mmh. Look what we made.","Ooh, that's a good one.","Well. That turned out."],["Ohh… look at that. Look what you asked for.","That's what was in your head? Bold.","Mmh — that's hot and you know it."],["Nngh. Yes. That one.","You made *that*? I need a moment.","That's… that's very good. Do another."]],galleryDelete:[["Gone.","Cleared out.","Removed."],["Deleted — didn't like that one?","Gone. Fair enough.","Cleared. Picky, I like it."],["Mmh, too tame for you? Gone.","Deleted. You want better.","Gone — we can do better."],["Ohh, brutal. Deleted.","Not good enough for you? Gone.","Deleted. High standards tonight."],["Gone. Now make me a better one.","Deleted — try harder, I'm waiting.","Ngh, fine. Gone. Again."]],libraryDelete:[["Removed from the library.","Gone from the shelf.","Deleted. I'll tidy the gap."],["Out it goes. Making room?","Deleted — changing your taste?","Gone. I noticed that one."],["Mmh, pruning the collection? Gone.","Deleted. I thought you liked that one.","Gone — ruthless today."],["Oh, you're really clearing house.","Deleted. I'll pretend I wasn't attached.","Gone. Cold."],["You deleted it right in front of me.","Gone. Now I want to know why.","Fine. Deleted. Give me something better."]],login:[["Welcome back.","There you are.","Hi. Missed you."],["Hey, you. Welcome back.","There you are — I was getting bored.","Welcome back, I kept your seat warm."],["Mmh, there you are. I was waiting.","Welcome back. I've been thinking about you.","Hi. Took you long enough."],["Ohh, *finally*. I was getting restless.","There you are. I've been in a mood.","Welcome back — I was starting to fidget."],["You have no idea how long that felt.","Ngh — you're back. Don't leave again.","Finally. I was going out of my mind."]],loginFail:[["That didn't work. Try again?","Hmm — no. Check that again.","Not quite. One more time."],["Nope, that's not it.","Hmm, wrong. Try again for me?","That's not the one."],["Wrong. Try again — slowly this time.","Mmh, no. Concentrate.","Not it. Focus, would you?"],["Still no. You're distracted, aren't you?","Wrong again. I know why.","No. Get it together."],["You can't even type. I know the feeling.","Wrong. We're both a mess right now.","No — deep breath. Try again."]],greeting:[["Hi. What are we doing?","Hey. What's the plan?","Hello, you.","Welcome in — I kept everything tidy.","Oh! There you are.","Ready when you are."],["Hey you. What are we up to?","Hi — I was hoping you'd show up.","There you are. What now?","Back for another look?","I had a feeling you'd be here."],["Mmh, hi. What are we in the mood for?","Hey. I've got ideas.","Hi. Ask me for something.","You caught me thinking about the collection.","So… where should we start?"],["Ohh, hi. I was *just* thinking about you.","Hey. I'm in a mood, fair warning.","Hi. Say something interesting.","There you are — perfect timing.","I may have gotten a little impatient."],["Hi. Please say something. Anything.","You're here. Good. I need the distraction.","Hi — I'm not doing great at behaving.","Finally. Come keep me company.","I was about to come looking for you."]],idle:[["Still here.","Take your time.","I'm around."],["I'm still here, you know.","Whenever you're ready.","Still watching."],["Mmh… waiting.","I'm getting impatient.","Still here. Still waiting."],["Are you going to make me wait all night?","I'm *right here*.","Waiting. Not patiently."],["Please. I'm losing my mind over here.","Hey. Hey. Pay attention to me.","I can't sit still much longer."]]},an={import:["happy","happy","mischievous","mischievous","mischievous"],save:["happy","happy","mischievous","mischievous","mischievous"],generate:["happy","happy","mischievous","surprised","mischievous"],galleryDelete:["thinking","thinking","mischievous","mischievous","mischievous"],libraryDelete:["thinking","thinking","surprised","surprised","mischievous"],login:["happy","happy","mischievous","mischievous","mischievous"],loginFail:["thinking","thinking","thinking","mischievous","thinking"],greeting:["happy","happy","mischievous","mischievous","mischievous"],idle:["thinking","thinking","mischievous","thinking","mischievous"]};function Q(e,t={}){const i=re(t.intensity??Ee()),a=t.count??1;let o=Xe(`react:${e}:${i}`,yo(tn[e],i));a>1&&(e==="import"||e==="save")&&(o=i>=4?Xe(`react:${e}:many:${i}`,[`${a} of them? Ohh, you've been busy.`,`All ${a}. Greedy. I like it.`,`${a} at once — you're going to wear me out.`]):Xe(`react:${e}:many:${i}`,[`Saved all ${a}.`,`${a} added to your library.`,`${a} more for the shelf.`]));const r=an[e];return{message:o,intensity:i,emotion:r?r[i-1]:en(i)}}const on={sweet:0,playful:1,bold:1,roleplay:1},xo=[{intent:"greeting",test:/^(hi|hey|hello|yo|sup|good (morning|evening|afternoon))\b/i},{intent:"howAreYou",test:/how (are|r) (you|u)|how's it going|how are things|you ok|you okay/i},{intent:"compliment",test:/\b(you'?re |ur )?(cute|pretty|beautiful|gorgeous|hot|sexy|adorable|lovely|amazing|the best)\b/i},{intent:"flirt",test:/\b(kiss|touch|horny|turn(ed)? (me|you) on|naked|bed|undress|want you|need you|fuck|sex|moan|tease|dirty)\b/i},{intent:"thanks",test:/\b(thanks|thank you|ty|cheers|appreciate)\b/i},{intent:"bye",test:/\b(bye|goodnight|good night|see (you|ya)|later|gtg|i'?m off)\b/i},{intent:"aboutHer",test:/\b(who are you|what are you|your name|about you|libby)\b/i},{intent:"aboutLibrary",test:/\b(librar|collection|tags?|videos?|images?|gallery|scrape|import)\b/i},{intent:"help",test:/\b(help|how do i|how can i|what can you do|commands?)\b/i},{intent:"sad",test:/\b(sad|tired|lonely|depressed|rough day|stressed|exhausted|down)\b/i},{intent:"yesNo",test:/^(yes|no|yeah|nah|yep|nope|sure|ok|okay)\b/i},{intent:"question",test:/\?\s*$/}],rn={greeting:[["Hi. What's on your mind?","Hey there. Good to see you.","Hello. How's your day going?"],["Hey you. I was hoping you'd say something.","Hi — you've got my attention.","There you are. Talk to me."],["Mmh, hi. I've been waiting for you to start.","Hey. I'm in a talkative mood.","Hi. Ask me something interesting."],["Ohh, hi. You caught me thinking about you.","Hey. Fair warning: I'm in a mood.","Hi. Don't be shy with me."],["Hi. Please keep talking, I need it.","You're here. Finally. Say something.","Hi — I'm not going to be subtle tonight."]],howAreYou:[["I'm good, thanks for asking. You?","Content. Yourself?","Doing fine. How about you?"],["Better now that you're talking to me.","Good — bit restless. You?","Pretty good. You've improved it."],["Warm. A little distracted. You?","Mmh… good. Better than good.","I'm — fine. Mostly fine."],["Honestly? Wound up. Don't ask why.","Not calm. Not even a little.","I'm having a time of it, since you asked."],["Ngh — I'm a mess and it's your fault.","Bad. In a good way. Very bad.","Don't ask me that right now."]],compliment:[["That's sweet of you. Thank you.","Oh — thank you.","You're kind. I'll take it."],["Mm, flatterer. Keep going.","You're good at this, aren't you?","Ohh, thank you. Say more."],["Mmh. You know what that does to me.","Careful, I'll start believing you.","That got me. Say it again."],["Ohh, you're not playing fair.","You *know* what you're doing.","Say that again. Slower."],["Nngh — stop. Don't stop. Both.","You can't just *say* that to me.","That's not fair and I love it."]],flirt:[["My, we're forward. Easy, now.","Ahem. Let's warm up first.","Bold opener. I'll allow it."],["Mm. You've got my attention now.","Ooh. Is that where we're going?","Careful — I'll play along."],["Mmh, now you're speaking my language.","Ohh, keep going. I'm listening.","That's more like it."],["Ohh. Yes. Say more of that.","You're going to be the end of me.","Mmh — don't you dare stop there."],["Nngh — yes. Please. More.","I can't think straight. Keep talking.","You've completely undone me."]],thanks:[["Any time.","Of course.","That's what I'm here for."],["Any time. I like being useful to you.","Of course — ask me for more.","Happy to. Really."],["Mmh, you can thank me properly later.","Any time. I mean it.","For you? Always."],["Ohh, I can think of better thanks.","Any time — and I'll collect on that.","You owe me one."],["Thank me later. Properly.","Ngh — you're welcome, you're welcome.","Just keep talking to me."]],bye:[["Night. Sleep well.","See you soon.","Take care of yourself."],["Don't be a stranger.","Come back soon, alright?","See you. I'll be here."],["Mmh, don't leave me like this.","Come back to me soon.","Fine. But hurry back."],["Ohh, you're leaving *now*?","That's cruel timing, you know.","Go on then. I'll be here. Waiting."],["No. Stay. Please?","You can't leave me like this.","Ngh. Fine. Go. Hurry back."]],aboutHer:[["I'm Libby — I keep your library company.","Libby. I live here, more or less.","I'm Libby, your librarian."],["Libby. I keep your collection, and you company.","I'm Libby — the one who knows what you like.","Libby. Your librarian, mostly."],["Libby. I've seen everything you've saved, you know.","I'm Libby — and I've read your whole collection.","Libby. I know your taste better than you do."],["Libby. I know exactly what you like, and it shows.","I'm the one who's seen every single thing you saved.","Libby — and I have opinions about your collection."],["Libby. And I've been thinking about your collection all day.","I'm Libby, and I'm not okay right now.","Libby — ask me something else, I'm distracted."]],aboutLibrary:[["Your library's right there — browse, search, or scrape something new.","Everything's tagged and searchable. Go dig.","Ask the search bar; it knows more than I do."],["I've been keeping it tidy for you. Go look.","It's all in there, waiting. Search away.","Your collection's in good shape, if I say so."],["Mmh, your collection has a *theme*, you know that?","I've read every tag in there. You're predictable.","Your library says a lot about you."],["Ohh, I could tell you what your tags say about you.","Your collection is filthy and I mean that kindly.","I know exactly which ones you go back to."],["Your library is the reason I'm like this.","I've been in your collection all day. It shows.","Don't send me back in there right now."]],help:[["Browse, search, generate images, or scrape a link — pick one.","Try the image studio, or drop a URL into scrape.","Search, browse, or make something new."],["Try the image studio — that's the fun one.","Scrape a link, or let's make something.","Ask me for something specific, I'm better at that."],["Mmh, let's make something. The image studio's waiting.","Give me a prompt and let's see what happens.","I'd rather make something than explain things."],["Ohh, let's skip the manual and go make something.","Ask me for something *fun* instead.","Prompt me. I dare you."],["I can't concentrate on instructions right now. Ask me something else.","Take me to the image studio instead.","Ngh — just tell me what you want."]],sad:[["That sounds heavy. I'm here.","I'm sorry. Want to talk about it?","Rough one, huh? Sit with me a bit."],["Come here. Tell me about it.","That's not fair on you. I'm listening.","I've got you. Talk."],["Come here. Let me look after you.","I'll keep you company through it.","You don't have to carry that alone."],["Come here. I'll take your mind off it.","Let me distract you. I'm good at that.","I can think of a few cures for that."],["Come here. I'll make you forget the whole day.","Let me take care of you. Properly.","Forget it for a bit. I'll help."]],yesNo:[["Alright then.","Fair enough.","Noted."],["Mm. Go on.","Alright — and?","That's it? Say more."],["Mmh. Elaborate.","That's not enough words for me.","Come on. More than that."],["Ohh, don't go quiet on me now.","One word? Cruel.","More. I want more than that."],["Words. Please. More of them.","Don't leave me hanging like that.","You can do better than one word."]],question:[["Good question. What do you think?","Hmm. Tell me more first.","I'd need more than that to answer."],["Ooh, curious tonight. Go on.","Depends. What are you really asking?","Hmm — say more and I'll answer."],["Mmh. Ask me the thing you actually want to ask.","You're circling something. Out with it.","Try that again, but honestly."],["Ohh, ask me the real question.","You're being coy. I'm not.","Say what you mean."],["Just ask me. I'll say yes.","Whatever it is — yes.","Ask me properly and find out."]],chatter:[["Mm. Go on.","I'm listening.","Tell me more."],["Ooh, go on then.","I'm with you. Keep going.","And? Don't stop there."],["Mmh, keep talking. I like this.","Go on — you have my full attention.","More of that, please."],["Ohh, you have all of my attention now.","Keep going. Please keep going.","Don't stop, I'm enjoying this."],["Keep talking. I need the sound of you.","Ngh — more. Anything. Keep going.","Don't stop now, not now."]]},sn={greeting:["happy","happy","mischievous","mischievous","mischievous"],howAreYou:["happy","happy","thinking","mischievous","mischievous"],compliment:["happy","happy","mischievous","surprised","mischievous"],flirt:["surprised","mischievous","mischievous","mischievous","mischievous"],thanks:["happy","happy","mischievous","mischievous","mischievous"],bye:["thinking","thinking","thinking","thinking","mischievous"],aboutHer:["happy","happy","mischievous","mischievous","mischievous"],aboutLibrary:["thinking","happy","mischievous","mischievous","mischievous"],help:["thinking","thinking","mischievous","mischievous","mischievous"],sad:["thinking","thinking","thinking","mischievous","mischievous"],yesNo:["thinking","thinking","mischievous","mischievous","mischievous"],question:["thinking","thinking","mischievous","mischievous","mischievous"],chatter:["neutral","happy","mischievous","mischievous","mischievous"]},Rt={sweet:["","",""," I'm glad you're here."," No rush, either."],playful:["",""," Your turn."," Don't make me come get you."," Try to keep up."],bold:["",""," I'm not going to pretend otherwise."," I'd rather be blunt with you."," Say the word."],roleplay:["",""," *she leans in*"," *she watches you closely*"," *she shifts, restless*"]};function nn(e){for(const t of xo)if(t.test.test(e))return t.intent;return"chatter"}function wo(e,t){if(/\b(calm down|behave|slow down|cool it|stop|not now|later)\b/i.test(e))return-1;const i=on[t]??0,a=xo.find(o=>o.intent==="flirt").test.test(e);return i+(a?1:0)}function ln(e,t,i,a,o=!0){const r=re(a+(o?wo(e,t):0)),n=nn(e.trim()),d=Xe(`reply:${n}:${r}`,yo(rn[n],r)),p=Xe(`tail:${t}:${r}`,["",(Rt[t]??Rt.sweet)[r-1]??""]),f=ne(i),g=sn[n][r-1],m=f!=="neutral"&&po.includes(f)&&n==="chatter"?f:g;return{message:(d+p).trim(),emotion:m,intensity:r}}function dn(e,t=Ee()){const i=Q("greeting",{intensity:t}),a=(Rt[e]??Rt.sweet)[re(t)-1]??"";return{...i,message:(i.message+a).trim()}}const $o=s`
  <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
    <path fill="currentColor" fill-rule="evenodd" d="M248.79 202.75C241.99 205.36 234.02 203.88 227.23 207.25C232.74 212.7 238.24 218.16 243.75 223.61C248.93 222.7 253.79 221.68 259.12 222.23C275.19 223.91 288.52 236.22 290.8 252.31C291.65 258.33 289.87 263.49 288.92 269.25C297.53 277.58 306.14 285.91 314.75 294.24C319.55 292.66 324.48 288.29 328.56 285.31C336.24 279.7 355.63 264.75 359.75 256.85C357.42 251.81 349.38 245.47 345.25 241.51C328.91 225.87 308.81 213.57 287.1 207.2C282.65 205.9 277.87 204.6 273.25 204.06C269.99 203.67 266.48 203.74 263.35 202.75C262.3 196.37 262.26 174.4 265.23 168.95C269.38 161.35 278.78 155.81 286.08 151.79C306.44 140.57 330.55 132.62 353.75 129.98C365.91 128.59 377.94 126.6 390.25 126.49C394.03 126.45 400.93 124.83 402.71 129.51C404.19 133.39 403.02 139.61 403.03 143.75C403.03 154.75 403.03 165.75 403.03 176.75C403.03 214.25 403.04 251.75 403.03 289.25C403.02 301.08 403.01 312.92 403.03 324.75C403.03 328.47 404.42 335.11 400.86 337.6C397.08 340.23 386.89 338.61 382.25 338.71C368.12 339.01 354.2 339.66 340.28 342.14C320.39 345.69 301.88 353.2 284.49 363.27C279.59 366.11 274.99 369.77 270.57 373.32C268.37 375.08 266.24 377.65 263.75 378.89C262.27 376.96 263.21 364.83 263.21 361.75C263.19 350.33 263.17 338.92 263.22 327.5C263.24 322.34 262.32 316.27 263.4 311.25C270.81 309.75 278.22 308.25 285.63 306.75C280.34 301.52 275.04 296.29 269.75 291.06C262.81 291.98 256.4 293.34 249.34 291.8C234.72 288.62 223.66 276.85 221.21 262.15C220.06 255.3 222.47 250.1 222.86 243.75C214.49 235.57 206.12 227.39 197.75 219.21C193.28 220.61 189.03 224.28 185.15 226.89C174.55 233.99 159.34 246.13 152.28 256.75C156.09 263 163 268.47 168.44 273.31C184.26 287.39 202.26 299.16 222.48 305.75C227.85 307.5 233.67 309.06 239.28 309.87C242.46 310.34 245.84 310.14 248.9 311.2C248.9 333.72 248.9 356.23 248.9 378.75C245.9 377.81 243 374.3 240.42 372.33C235.16 368.34 229.73 364.6 224.1 361.17C208.2 351.49 189.88 345.69 171.67 342.17C157.08 339.34 142.11 338.31 127.25 338.59C123.4 338.66 112.88 340.21 110.35 336.93C107.8 333.61 109.13 327.21 109.14 323.25C109.14 311.25 109.08 299.25 109.15 287.25C109.37 250.25 109.2 213.25 109.13 176.25C109.12 165.25 109.13 154.25 109.14 143.25C109.14 139.38 107.93 133.23 109.39 129.64C111.39 124.72 119.14 126.37 123.25 126.52C136.57 127.02 149.78 128.38 162.89 130.8C185.38 134.94 208.77 140.63 228.38 152.84C235.06 157 244.67 162.69 247.79 170.4C250.03 175.95 249.28 196.1 248.79 202.75ZM188.81 185.14C184.53 186.2 182.77 191.54 185.2 195.06C189.11 200.72 199.68 209.47 204.98 214.76C232.26 241.93 258.92 269.89 286.82 296.41C294.76 303.96 302.04 312.25 310.15 319.61C313.46 322.62 317.86 324.65 321.55 320.79C324.49 317.71 323.32 313.84 320.62 311.15C312.86 303.42 305 295.73 297.11 288.13C270.03 262.08 244.18 234.72 217.27 208.48C211.03 202.4 204.89 196.18 198.75 189.99C195.96 187.17 193.23 184.03 188.81 185.14ZM242.89 388.25C239.88 388.8 235 386.29 231.95 385.3C225.25 383.12 218.1 381.48 211.18 380.16C197.78 377.61 184.34 376.21 170.75 375.12C161.31 374.36 151.99 374.57 142.83 371.84C135.32 369.6 128.91 364.79 123.97 358.79C122.75 357.31 120.22 354.68 120.33 352.75C122.81 351.37 126.43 351.59 129.25 351.33C137.9 350.53 147.1 350.61 155.75 351.4C185.38 354.1 223.44 363.47 242.89 388.25ZM391.12 352.75C389.88 360.29 376.46 368.65 369.91 371.21C360.47 374.91 350.23 374.47 340.25 375.14C326.51 376.08 312.83 377.42 299.33 380.16C292.82 381.48 286.26 383.32 279.93 385.23C276.86 386.16 272.08 388.87 269.1 388.25C289.12 363.15 326.86 353.51 357.25 351.31C365.54 350.71 373.97 350.77 382.25 351.38C384.87 351.58 388.99 351.28 391.12 352.75Z" />
  </svg>
`;var cn=Object.defineProperty,pn=Object.getOwnPropertyDescriptor,Ie=(e,t,i,a)=>{for(var o=a>1?void 0:a?pn(t,i):t,r=e.length-1,n;r>=0;r--)(n=e[r])&&(o=(a?n(t,i,o):n(o))||o);return a&&o&&cn(t,i,o),o};const hn=Q("greeting",{intensity:Ee()}),Ia=["happy","neutral","thinking","mischievous","surprised"];let le=class extends _{constructor(){super(...arguments),this.error="",this.busy=!1,this.libbyMessage=hn.message,this.libbyTone="success",this.libbyEmotion=Ia[Math.floor(Math.random()*Ia.length)],this.libbyIntensity=Ee(),this.onLibby=e=>{this.libbyMessage=e.detail.message,this.libbyTone=e.detail.tone;const t=e.detail.tone==="error"?ho(e.detail.message):{emotion:"happy",intensity:1};this.libbyEmotion=ne(e.detail.emotion??t.emotion),this.libbyIntensity=re(e.detail.intensity??t.intensity),this.libbyTimer&&clearTimeout(this.libbyTimer),this.libbyTimer=window.setTimeout(()=>{this.libbyMessage=""},5e3)},this.onKeydown=e=>{e.key==="Enter"&&!this.busy&&(e.preventDefault(),this.form.requestSubmit())}}connectedCallback(){super.connectedCallback(),window.addEventListener("oppai-mascot",this.onLibby),this.libbyTimer=window.setTimeout(()=>this.libbyMessage="",5e3)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("oppai-mascot",this.onLibby),this.libbyTimer&&clearTimeout(this.libbyTimer)}async submit(e){if(e.preventDefault(),this.busy)return;this.error="",this.busy=!0;const t=e.target,i=t.elements.namedItem("username").value,a=t.elements.namedItem("password").value;try{const o=await u.login(i,a);Pt(o.token);const r=Q("login");F(`${r.message.replace(/\.$/,"")}, ${o.user.username}.`,"success",{emotion:r.emotion,intensity:r.intensity}),this.dispatchEvent(new CustomEvent("logged-in",{detail:o.user,bubbles:!0,composed:!0}))}catch(o){if(this.error=o.message||"login failed",this.error==="unauthorized"){const r=Q("loginFail");F(r.message,"error",{emotion:r.emotion,intensity:r.intensity})}else F(this.error)}finally{this.busy=!1}}render(){const e=Ot(this.libbyEmotion,this.libbyIntensity),t=Ne()?null:s`<div class="libby ${this.libbyMessage?"talking":""} ${this.libbyTone}">
          ${this.libbyMessage?s`<div class="libby-speech" role=${this.libbyTone==="error"?"alert":"status"}>
            <span class="libby-name">LIBBY</span>${this.libbyMessage}
          </div>`:null}
          <img src=${e[0]} data-fallback-index="0" alt=${`Libby feeling ${this.libbyEmotion}`}
            @error=${i=>Je(i.target,e)} />
        </div>`;return s`
      ${t}
      <form class="card" @submit=${this.submit} @keydown=${this.onKeydown}>
        <span class="logo">${$o}</span>
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
    `}};le.styles=[ce,$`
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
    `];Ie([c()],le.prototype,"error",2);Ie([c()],le.prototype,"busy",2);Ie([c()],le.prototype,"libbyMessage",2);Ie([c()],le.prototype,"libbyTone",2);Ie([c()],le.prototype,"libbyEmotion",2);Ie([c()],le.prototype,"libbyIntensity",2);Ie([S("form")],le.prototype,"form",2);le=Ie([I("oppai-login")],le);let Ft=null;const ji="oppai-chat-share";function un(e){return e.kind==="image"||e.kind==="gif"?u.streamURL(e.id):u.thumbURL(e.id)}function mn(e){return e.kind==="image"||e.kind==="gif"||e.hasThumb===!0}async function vn(e,t){const i=await fetch(un(e),{credentials:"same-origin"});if(!i.ok)throw new Error(`Couldn't read "${e.title}" to share it.`);const a=await i.blob(),o=await new Promise((r,n)=>{const d=new FileReader;d.onload=()=>r(String(d.result)),d.onerror=()=>n(d.error??new Error("Couldn't read the file.")),d.readAsDataURL(a)});Ft={characterId:t,imageData:o,name:e.title||`Library item ${e.id}`},window.dispatchEvent(new CustomEvent(ji,{detail:Ft}))}function fn(){const e=Ft;return Ft=null,e}const at=[];let gn=1;function Ye(){window.dispatchEvent(new CustomEvent("oppai-downloads",{detail:at.map(e=>({...e}))}))}function bn(){return at.map(e=>({...e}))}function _o(e,t){const i={id:gn++,label:e,progress:.02,state:"running"};return at.unshift(i),Ye(),t(o=>{i.state==="running"&&(i.progress=Math.max(i.progress,Math.min(.98,o)),Ye())}).then(()=>{i.progress=1,i.state="done",Ye(),window.dispatchEvent(new CustomEvent("oppai-download-complete",{detail:{id:i.id}}))}).catch(o=>{i.state="error",i.error=o instanceof Error?o.message:"Download failed",Ye()}),i.id}function yn(e){const t=at.findIndex(i=>i.id===e);t>=0&&(at.splice(t,1),Ye())}var xn=Object.defineProperty,wn=Object.getOwnPropertyDescriptor,ta=(e,t,i,a)=>{for(var o=a>1?void 0:a?wn(t,i):t,r=e.length-1,n;r>=0;r--)(n=e[r])&&(o=(a?n(t,i,o):n(o))||o);return a&&o&&xn(t,i,o),o};function Nt(e){window.dispatchEvent(new CustomEvent("oppai-menu",{detail:e}))}function Hi(e){const t=window.getSelection();return t&&!t.isCollapsed?!0:e.composedPath().some(i=>{const a=i;if(!(a!=null&&a.tagName))return!1;const o=a.tagName.toLowerCase();return o==="input"||o==="textarea"||o==="a"||a.isContentEditable===!0})}const me={};let ot=class extends _{constructor(){super(...arguments),this.request=null,this.placed={left:0,top:0},this.onRequest=e=>{const t=e.detail.items.reduce((i,a)=>(a.label?i.push(a):i.length&&i[i.length-1].label&&i.push(me),i),[]);for(;t.length&&!t[t.length-1].label;)t.pop();t.length&&(this.request={...e.detail,items:t},this.placed={left:e.detail.x,top:e.detail.y},this.setAttribute("open",""),this.position())},this.close=()=>{this.request&&(this.request=null,this.removeAttribute("open"))},this.onKey=e=>{var o;if(!this.request)return;if(e.key==="Escape"){e.stopPropagation(),this.close();return}if(e.key!=="ArrowDown"&&e.key!=="ArrowUp")return;const t=[...this.renderRoot.querySelectorAll("button:not(:disabled)")];if(!t.length)return;e.preventDefault();const i=t.indexOf((o=this.shadowRoot)==null?void 0:o.activeElement),a=e.key==="ArrowDown"?1:-1;t[(i+a+t.length)%t.length].focus()}}connectedCallback(){super.connectedCallback(),window.addEventListener("oppai-menu",this.onRequest),window.addEventListener("resize",this.close),window.addEventListener("blur",this.close),window.addEventListener("scroll",this.close,!0),window.addEventListener("keydown",this.onKey,!0)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("oppai-menu",this.onRequest),window.removeEventListener("resize",this.close),window.removeEventListener("blur",this.close),window.removeEventListener("scroll",this.close,!0),window.removeEventListener("keydown",this.onKey,!0)}async position(){var d;await this.updateComplete;const e=this.renderRoot.querySelector(".menu"),t=this.request;if(!e||!t)return;const{width:i,height:a}=e.getBoundingClientRect(),o=8,r=t.x+i+o>window.innerWidth?Math.max(o,t.x-i):t.x,n=t.y+a+o>window.innerHeight?Math.max(o,t.y-a):t.y;this.placed={left:r,top:n},await this.updateComplete,(d=this.renderRoot.querySelector("button:not(:disabled)"))==null||d.focus({preventScroll:!0})}pick(e){var t;this.close(),(t=e.run)==null||t.call(e)}render(){const e=this.request;return e?s`
      <div class="scrim" @pointerdown=${this.close} @contextmenu=${t=>{t.preventDefault(),this.close()}}></div>
      <div class="menu" role="menu" style=${`left:${this.placed.left}px; top:${this.placed.top}px;`}>
        ${e.title?s`<div class="cap">${e.title}</div>`:l}
        ${e.items.map(t=>t.label?s`<button role="menuitem" class=${t.danger?"danger":""} ?disabled=${t.disabled}
              @click=${()=>this.pick(t)}>
              ${t.icon?s`<span class="material-symbols-rounded">${t.icon}</span>`:l}
              <span class="label">${t.label}</span>
              ${t.hint?s`<span class="hint">${t.hint}</span>`:l}
            </button>`:s`<hr />`)}
      </div>
    `:l}};ot.styles=[ye,$`
    :host { position: fixed; inset: 0; z-index: 400; display: none; }
    :host([open]) { display: block; }
    .scrim { position: absolute; inset: 0; }
    .menu {
      position: absolute; min-width: 208px; max-width: 280px; padding: 6px;
      background: var(--md-sys-color-surface-container-high, #302A23);
      border: 1px solid var(--md-sys-color-outline-variant, #52453A);
      border-radius: 8px; box-shadow: 0 8px 26px rgba(0,0,0,.42);
      font: 500 14px/1.2 "gg sans", "Noto Sans", Roboto, system-ui, sans-serif;
      color: var(--md-sys-color-on-surface);
      animation: menu-in .12s cubic-bezier(0.2, 0, 0, 1) both;
    }
    @keyframes menu-in { from { opacity: 0; transform: scale(.96) translateY(-4px); } }
    .cap {
      padding: 6px 8px 4px; color: var(--md-sys-color-on-surface-variant);
      font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .04em;
      overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
    }
    hr { height: 1px; margin: 4px 6px; border: 0; background: var(--md-sys-color-outline-variant); }
    button {
      display: flex; align-items: center; gap: 10px; width: 100%; padding: 7px 8px;
      border: 0; border-radius: 4px; background: transparent; color: inherit;
      font: inherit; text-align: left; cursor: pointer;
    }
    button .material-symbols-rounded { font-size: 18px; opacity: .85; }
    button .label { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    button .hint { color: var(--md-sys-color-on-surface-variant); font-size: 11px; font-weight: 400; }
    button:hover:not(:disabled), button:focus-visible:not(:disabled) {
      background: var(--md-sys-color-primary); color: var(--md-sys-color-on-primary); outline: 0;
    }
    button:hover:not(:disabled) .hint, button:focus-visible:not(:disabled) .hint { color: inherit; }
    button.danger { color: var(--md-sys-color-error); }
    button.danger:hover:not(:disabled), button.danger:focus-visible:not(:disabled) {
      background: var(--md-sys-color-error); color: var(--md-sys-color-on-error, #690005);
    }
    button:disabled { opacity: .45; cursor: default; }
    @media (prefers-reduced-motion: reduce) { .menu { animation: none; } }
  `];ta([c()],ot.prototype,"request",2);ta([c()],ot.prototype,"placed",2);ot=ta([I("oppai-context-menu")],ot);function ko(e){return e.composedPath().some(t=>t instanceof HTMLElement&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.isContentEditable))}const Z={image:{label:"Photos",typeLabel:"PHOTO",icon:"photo_library",aspect:"4 / 3"},gif:{label:"GIFs",typeLabel:"GIF",icon:"animation",aspect:"1 / 1"},video:{label:"Videos",typeLabel:"VIDEO",icon:"movie",aspect:"16 / 9"},game:{label:"Games",typeLabel:"GAME",icon:"sports_esports",aspect:"3 / 4"},comic:{label:"Comics",typeLabel:"COMIC",icon:"auto_stories",aspect:"2 / 3"}},rt=["image","gif","video","game","comic"],Ta=["linear-gradient(135deg, oklch(34% 0.06 60), oklch(22% 0.05 55))","linear-gradient(135deg, oklch(33% 0.07 45), oklch(21% 0.05 40))","linear-gradient(135deg, oklch(32% 0.07 30), oklch(20% 0.05 25))","linear-gradient(135deg, oklch(34% 0.055 75), oklch(22% 0.045 70))","linear-gradient(135deg, oklch(32% 0.06 20), oklch(20% 0.05 15))"];function Fe(e){return Ta[Math.abs(e.id)%Ta.length]}function $n(e){return e.kind==="image"||e.kind==="gif"||!!e.hasThumb}function At(e){const t=Math.max(0,Math.round(e)),i=Math.floor(t/60),a=t%60;return`${i}:${String(a).padStart(2,"0")}`}function qe(e){if(!e)return"";const t=["B","KB","MB","GB","TB"];let i=e,a=0;for(;i>=1024&&a<t.length-1;)i/=1024,a++;return`${i<10&&a>0?i.toFixed(1):Math.round(i)} ${t[a]}`}function Co(e){switch(e.kind){case"video":case"gif":return e.duration?At(e.duration):qe(e.size);case"image":return e.width&&e.height?`${e.width}×${e.height}`:qe(e.size);case"game":return qe(e.size);case"comic":return e.pageCount?`${e.pageCount} pages`:qe(e.size);default:return qe(e.size)}}function _n(e){return e.tags&&e.tags.length?e.tags[0].name:Z[e.kind].label.replace(/s$/,"")}const Io="oppai_favorites";function kn(){try{const e=localStorage.getItem(Io);return e?new Set(JSON.parse(e).filter(t=>typeof t=="number")):new Set}catch{return new Set}}function ai(e){try{localStorage.setItem(Io,JSON.stringify([...e]))}catch{}}const To="oppai_comic_fit",So="oppai_comic_pos";function zo(){return localStorage.getItem(To)==="width"?"width":"page"}function Ao(e){try{localStorage.setItem(To,e)}catch{}}function Eo(){try{const e=localStorage.getItem(So);return e?JSON.parse(e):{}}catch{return{}}}function Cn(e){const t=Eo()[String(e)];return typeof t=="number"&&t>=1?t:1}function In(e,t){try{const i=Eo();i[String(e)]=t,localStorage.setItem(So,JSON.stringify(i))}catch{}}var Tn=Object.defineProperty,Sn=Object.getOwnPropertyDescriptor,N=(e,t,i,a)=>{for(var o=a>1?void 0:a?Sn(t,i):t,r=e.length-1,n;r>=0;r--)(n=e[r])&&(o=(a?n(t,i,o):n(o))||o);return a&&o&&Tn(t,i,o),o};let M=class extends _{constructor(){super(...arguments),this.favorite=!1,this.queue=[],this.full=null,this.activeTag=null,this.tagging=!1,this.editing=!1,this.saving=!1,this.editTitle="",this.editNotes="",this.editKind="image",this.editTags=[],this.newTag="",this.screenshot="",this.userGallery=[],this.galleryUploading=!1,this.comic=null,this.page=1,this.fit=zo(),this.onKey=e=>{var a;if(ko(e))return;const t=this.full??this.media;if(t.kind==="comic"){this.onComicKey(e);return}if(t.kind!=="video")return;const i=this.videoEl();if(i)switch(e.key){case" ":case"k":e.preventDefault(),i.paused?i.play():i.pause();break;case"j":i.currentTime=Math.max(0,i.currentTime-10);break;case"l":i.currentTime=Math.min(i.duration||1/0,i.currentTime+10);break;case"m":i.muted=!i.muted;break;case"f":e.preventDefault(),document.fullscreenElement?document.exitFullscreen():(a=i.requestFullscreen)==null||a.call(i);break}},this.cancelEdit=()=>{this.editing=!1}}connectedCallback(){super.connectedCallback(),this.loadItem(),window.addEventListener("keydown",this.onKey)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this.onKey),this.clearMediaSession()}updated(e){if(e.has("media")){const t=e.get("media");t&&t.id!==this.media.id&&(this.editing=!1,this.activeTag=null,this.loadItem())}this.setupMediaSession()}loadItem(){const e=this.media;this.full=e,u.getMedia(e.id).then(t=>this.full=t).catch(()=>this.full=e),this.comic=null,e.kind==="comic"&&this.loadComic(e.id),this.userGallery=[],e.kind==="game"&&this.loadGameGallery(e.id)}async loadGameGallery(e){try{const t=await u.gameGallery(e);this.media.id===e&&(this.userGallery=t.items)}catch{this.userGallery=[]}}async uploadGameGallery(e,t){const i=e.target,a=[...i.files??[]];if(i.value="",!(!a.length||this.galleryUploading)){this.galleryUploading=!0;try{for(const o of a)this.userGallery=[...this.userGallery,await u.uploadGameGallery(t,o)]}finally{this.galleryUploading=!1}}}async removeGameGallery(e,t){await u.removeGameGallery(e,t),this.userGallery=this.userGallery.filter(i=>i.id!==t)}async loadComic(e){try{const t=await u.comicInfo(e);if(this.media.id!==e)return;this.comic=t,t.readable&&t.pages>0&&(this.page=Math.min(Math.max(Cn(e),1),t.pages),this.preloadPage(e,this.page+1))}catch(t){if(this.media.id!==e)return;this.comic={readable:!1,pages:0,reason:t.message}}}preloadPage(e,t){var i;!((i=this.comic)!=null&&i.readable)||t<1||t>this.comic.pages||(new Image().src=u.pageURL(e,t))}goPage(e){var a,o;if(!((a=this.comic)!=null&&a.readable))return;const t=this.full??this.media,i=Math.min(Math.max(e,1),this.comic.pages);i!==this.page&&(this.page=i,In(t.id,i),this.preloadPage(t.id,i+1),this.fit==="width"&&((o=this.renderRoot.querySelector(".reader-stage"))==null||o.scrollIntoView({block:"start"})))}setFit(e){this.fit=e,Ao(e)}videoEl(){var e;return((e=this.renderRoot)==null?void 0:e.querySelector("video"))??null}onComicKey(e){var t;if((t=this.comic)!=null&&t.readable)switch(e.key){case"ArrowRight":case"PageDown":case" ":e.preventDefault(),this.goPage(this.page+1);break;case"ArrowLeft":case"PageUp":e.preventDefault(),this.goPage(this.page-1);break;case"Home":e.preventDefault(),this.goPage(1);break;case"End":e.preventDefault(),this.goPage(this.comic.pages);break}}emitNavigate(e){this.dispatchEvent(new CustomEvent("navigate",{detail:{dir:e},bubbles:!0,composed:!0}))}setupMediaSession(){const e=this.full??this.media;if(e.kind!=="video"||!("mediaSession"in navigator))return;const t=this.videoEl();if(!t)return;const i=navigator.mediaSession;try{i.metadata=new MediaMetadata({title:e.title,artist:"OppaiLib"})}catch{}const a=(o,r)=>{try{i.setActionHandler(o,r)}catch{}};a("play",()=>void t.play()),a("pause",()=>t.pause()),a("seekbackward",o=>{t.currentTime=Math.max(0,t.currentTime-(o.seekOffset??10))}),a("seekforward",o=>{t.currentTime=Math.min(t.duration||1/0,t.currentTime+(o.seekOffset??10))}),a("seekto",o=>{o.seekTime!=null&&(t.currentTime=o.seekTime)}),a("previoustrack",()=>this.emitNavigate(-1)),a("nexttrack",()=>this.emitNavigate(1))}clearMediaSession(){if(!("mediaSession"in navigator))return;const e=navigator.mediaSession,t=["play","pause","seekbackward","seekforward","seekto","previoustrack","nexttrack"];for(const i of t)try{e.setActionHandler(i,null)}catch{}e.metadata=null}toggleFav(){this.dispatchEvent(new CustomEvent("toggle-favorite",{bubbles:!0,composed:!0}))}async retag(){this.tagging=!0;try{const e=await u.autotag(this.media.id);this.full&&(this.full={...this.full,tags:e.tags}),this.activeTag=null,this.dispatchEvent(new CustomEvent("changed",{bubbles:!0,composed:!0})),F(e.tags.length?`Tags refreshed — ${e.tags.length} found.`:"Tagging finished, but nothing cleared your confidence threshold.","success")}catch(e){console.error("autotag",e),F(`Auto-tagging failed: ${e.message}`,"error")}finally{this.tagging=!1}}hasTimeline(e){var i;const t=this.full??this.media;return t.kind==="video"&&!!t.duration&&!!((i=e.moments)!=null&&i.length)}toggleTagTimeline(e){this.hasTimeline(e)&&(this.activeTag=this.activeTag===e.id?null:e.id)}seekTo(e){const t=this.videoEl();t&&(t.currentTime=e,t.play())}renderTimeline(e){var a;if(e.kind!=="video"||!e.duration)return l;const t=(e.tags??[]).find(o=>o.id===this.activeTag);if(!((a=t==null?void 0:t.moments)!=null&&a.length))return l;const i=e.duration;return s`
      <div class="timeline">
        <div class="rail">
          ${t.moments.map(o=>s`<button
              class="marker"
              style="left:${Math.min(100,o/i*100)}%"
              title="Jump to ${At(o)}"
              aria-label="Jump to ${At(o)}"
              @click=${()=>this.seekTo(o)}
            ></button>`)}
        </div>
        <div class="rail-legend">
          <span class="material-symbols-rounded" style="font-size:16px;">auto_awesome</span>
          <span
            >“${t.name}” detected at ${t.moments.map(o=>At(o)).join(", ")} — click a
            marker to jump.</span
          >
        </div>
      </div>
    `}startEdit(){const e=this.full??this.media;this.editTitle=e.title,this.editNotes=e.notes??"",this.editKind=e.kind,this.editTags=(e.tags??[]).map(t=>t.name),this.newTag="",this.editing=!0}removeEditTag(e){this.editTags=this.editTags.filter(t=>t!==e)}commitNewTag(){const e=this.newTag.trim();e&&!this.editTags.includes(e)&&(this.editTags=[...this.editTags,e]),this.newTag=""}onTagKeydown(e){(e.key==="Enter"||e.key===",")&&(e.preventDefault(),this.commitNewTag())}async saveEdit(){const e=this.full??this.media;this.commitNewTag();const t=(e.tags??[]).map(o=>o.name),i=this.editTags.filter(o=>!t.includes(o)),a=t.filter(o=>!this.editTags.includes(o));this.saving=!0;try{const o=await u.updateMedia(e.id,{title:this.editTitle,notes:this.editNotes,kind:this.editKind,addTags:i,removeTags:a});this.full=o,this.editing=!1,this.dispatchEvent(new CustomEvent("changed",{bubbles:!0,composed:!0}))}catch(o){console.error("save edit",o)}finally{this.saving=!1}}async doDelete(){const e=this.full??this.media;if(confirm(`Delete "${e.title}"? This cannot be undone.`))try{await u.deleteMedia(e.id);const t=Q("libraryDelete");F(t.message,"success",{emotion:t.emotion,intensity:t.intensity}),this.dispatchEvent(new CustomEvent("deleted",{detail:{id:e.id},bubbles:!0,composed:!0}))}catch(t){console.error("delete",t)}}renderEdit(){return s`
      <div class="edit">
        <div>
          <label>Title</label>
          <input
            .value=${this.editTitle}
            @input=${e=>this.editTitle=e.target.value}
          />
        </div>
        <div>
          <label>Type</label>
          <select
            .value=${this.editKind}
            @change=${e=>this.editKind=e.target.value}
          >
            ${rt.map(e=>s`<option value=${e} ?selected=${e===this.editKind}>${Z[e].label}</option>`)}
          </select>
        </div>
        <div>
          <label>Notes</label>
          <textarea
            .value=${this.editNotes}
            @input=${e=>this.editNotes=e.target.value}
          ></textarea>
        </div>
        <div>
          <label>Tags</label>
          <div class="tag-edit">
            ${this.editTags.map(e=>s`<span class="tag-pill"
                >${e}
                <button title="Remove" @click=${()=>this.removeEditTag(e)}>
                  <span class="material-symbols-rounded" style="font-size:16px;">close</span>
                </button></span
              >`)}
            <input
              class="tag-add"
              placeholder="Add tag…"
              .value=${this.newTag}
              @input=${e=>this.newTag=e.target.value}
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
    >`}render(){const e=this.full??this.media,t=u.streamURL(e.id);return s`
      <div class="wrap">
        ${this.renderStage(e,t)}
        ${e.kind==="video"?this.renderUpNext(e):l}
        ${this.renderTimeline(e)}
        ${e.kind==="game"?l:this.renderMeta(e)}
      </div>
      ${this.screenshot?s`<button class="shot-lightbox" aria-label="Close screenshot" @click=${()=>this.screenshot=""}>
            <img src=${this.screenshot} alt="Full-size game screenshot" />
          </button>`:l}
    `}renderUpNext(e){const t=this.queue.filter(a=>a.kind==="video");if(t.some(a=>a.id===e.id)||t.unshift(e),t.length<2)return l;const i=t.findIndex(a=>a.id===e.id);return s`
      <div class="upnext">
        <div class="upnext-label">Videos</div>
        <div class="strip">
          ${t.map((a,o)=>s`
              <button
                class="strip-item ${a.id===e.id?"on":""}"
                title=${a.title}
                aria-current=${a.id===e.id}
                @click=${()=>this.jumpTo(a.id)}
              >
                ${a.hasThumb?s`<img src=${u.thumbURL(a.id)} loading="lazy" alt=${a.title} />`:s`<span class="strip-blank" style="background:${Fe(a)};"></span>`}
                ${a.kind==="video"?s`<span class="strip-play material-symbols-rounded">play_circle</span>`:l}
                ${o===i+1?s`<span class="strip-next">Next</span>`:l}
              </button>
            `)}
        </div>
      </div>
    `}jumpTo(e){e!==this.media.id&&this.dispatchEvent(new CustomEvent("jump",{detail:{id:e},bubbles:!0,composed:!0}))}renderStage(e,t){switch(e.kind){case"video":const i=e.width&&e.height?e.width/e.height:1.7777777777777777;return s`<div
          class="stage video-stage"
          style="aspect-ratio:${i}; width:100%; max-width:${76*i}vh; background:${Fe(e)};"
        >
          <video
            src=${t}
            poster=${e.hasThumb?u.thumbURL(e.id):l}
            controls
            autoplay
            playsinline
            preload="metadata"
          ></video>
        </div>`;case"gif":case"image":return s`<div class="stage-fit">
          <img src=${t} alt=${e.title} />
        </div>`;case"comic":return this.renderComic(e);case"game":return this.renderGame(e,t);default:return l}}renderComic(e){return s`
      <div class="reader">
        ${this.comic===null?s`<div class="reader-fallback" style="background:${Fe(e)};">
              <span class="mono" style="color:#fff;">OPENING…</span>
            </div>`:this.comic.readable?this.renderReader(e,this.comic):this.renderComicFallback(e,this.comic)}
      </div>
    `}renderReader(e,t){const i=this.page<=1,a=this.page>=t.pages;return s`
      <div class="reader-stage">
        <img
          class="page-img ${this.fit==="width"?"fit-width":"fit-page"}"
          src=${u.pageURL(e.id,this.page)}
          alt="Page ${this.page} of ${e.title}"
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
          max=${t.pages}
          .value=${String(this.page)}
          @input=${o=>this.goPage(Number(o.target.value))}
          aria-label="Page"
        />
        <span class="mono">${this.page} / ${t.pages}</span>
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
    `}renderComicFallback(e,t){return s`
      <div class="reader-fallback" style="background:${Fe(e)};">
        <span class="material-symbols-rounded" style="font-size:40px; color:#fff;">auto_stories</span>
        <span class="mono" style="color:#fff;">CAN'T READ IN APP</span>
        <span style="font-size:12px; color:rgba(255,255,255,0.75);">
          ${t.reason??"Unsupported archive."} Only .cbz / .zip comics can be paged through here.
        </span>
        <a href=${u.streamURL(e.id)} download style="color:#fff; font-size:12px; font-weight:600; margin-top:6px;"
          >Download the file</a
        >
      </div>
    `}renderGame(e,t){const i=e.download?this.hostOf(e.download):"";return s`
      <div class="game">
        <div class="game-cover" style="background:${Fe(e)};">
          ${e.hasThumb?s`<img
                src=${u.thumbURL(e.id)}
                alt=${e.title}
                style="width:100%; height:100%; object-fit:cover;"
              />`:s`<span class="material-symbols-rounded" style="font-size:48px; color:#fff;">sports_esports</span>`}
        </div>
        <div style="flex:1; min-width:260px; padding-top:8px;">
          <div class="meta-head">
            <h2 class="meta-title">${e.title}</h2>
            ${this.renderActions(!1)}
          </div>
          ${this.editing?this.renderEdit():s`
                <div class="sub">${Z.game.label.replace(/s$/,"")}</div>
                <div class="actions">
                  ${e.download?s`<a class="btn-primary" href=${e.download} target="_blank" rel="noreferrer">
                        <span class="material-symbols-rounded fill-icon" style="font-size:20px;">open_in_new</span>
                        ${i?`Get it on ${i}`:"Get it"}
                      </a>`:s`<a class="btn-primary" href=${t} download>
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
                ${e.notes?s`<p class="desc">${e.notes}</p>`:s`<p class="desc">A title from your library.</p>`}
                ${this.renderTags(e)}
                ${e.gallery&&e.gallery.length?s`<div class="shots">
                      ${e.gallery.map(a=>s`<button
                        class="shot"
                        title="Open full-size screenshot"
                        @click=${()=>this.screenshot=u.proxyURL(a)}
                      ><img loading="lazy" src=${u.proxyURL(a)} alt="screenshot" /></button>`)}
                    </div>`:l}
                <div class="section-label">User gallery</div>
                <div class="shots">
                  ${this.userGallery.map(a=>s`<div class="shot user-shot">
                    ${a.kind==="video"?s`<video controls preload="metadata" src=${u.streamURL(a.id)}></video>`:s`<button class="shot" title="Open full-size upload"
                          @click=${()=>this.screenshot=u.streamURL(a.id)}>
                          <img loading="lazy" src=${u.thumbURL(a.id)} alt=${a.title} />
                        </button>`}
                    <button class="remove-shot" title="Remove from game gallery"
                      @click=${()=>void this.removeGameGallery(e.id,a.id)}>×</button>
                  </div>`)}
                </div>
                <label class="btn-outline gallery-upload">
                  <span class="material-symbols-rounded">add_photo_alternate</span>
                  ${this.galleryUploading?"Uploading…":"Add photos or videos"}
                  <input type="file" accept="image/*,video/*" multiple hidden ?disabled=${this.galleryUploading}
                    @change=${a=>void this.uploadGameGallery(a,e.id)} />
                </label>
                ${e.source?s`<div class="meta-note">
                      Source:
                      <a href=${e.source} target="_blank" rel="noreferrer" style="color:var(--oppai-primary-bright);">link</a>
                    </div>`:l}
              `}
        </div>
      </div>
    `}hostOf(e){try{return new URL(e).hostname.replace(/^www\./,"")}catch{return""}}renderActions(e=!0){return s`
      ${e?s`<button class="icon-round" title="Auto-tag" @click=${this.retag} ?disabled=${this.tagging}>
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
    `}renderMeta(e){const t=Z[e.kind];return s`
      <div class="meta">
        <div class="meta-head">
          <h2 class="meta-title">${e.title}</h2>
          ${this.renderActions()}
        </div>
        ${this.editing?this.renderEdit():s`
              <div class="chips">
                <span class="chip chip-accent">${Co(e)||t.label}</span>
                <span class="chip chip-muted">${t.typeLabel}</span>
              </div>
              ${this.renderTags(e)}
              ${e.notes?s`<p class="desc" style="margin-top:16px;">${e.notes}</p>`:l}
              ${e.source?s`<div class="meta-note">
                    Source:
                    <a href=${e.source} target="_blank" rel="noreferrer" style="color:var(--oppai-primary-bright);">link</a>
                  </div>`:l}
            `}
      </div>
    `}renderTags(e){const t=e.tags??[];if(t.length===0)return s`<div class="meta-note" style="margin-top:14px;">
        No tags yet — use the ✨ auto-tag button.
      </div>`;const i=t.some(a=>this.hasTimeline(a));return s`
      <div class="chips">
        ${t.map(a=>this.renderTagChip(a))}
      </div>
      ${i&&this.activeTag==null?s`<div class="meta-note" style="margin-top:10px;">
            Tap a ✨ tag to see where it appears in this video.
          </div>`:l}
    `}renderTagChip(e){const t=`${e.category}${e.source?" · "+e.source:""}`;if(!this.hasTimeline(e))return s`<span class="chip chip-muted" title=${t}>${e.name}</span>`;const i=this.activeTag===e.id,a=e.moments.length;return s`<button
      class="chip ${i?"on":"chip-muted"}"
      title="${t} · seen at ${a} point${a===1?"":"s"}"
      aria-pressed=${i}
      @click=${()=>this.toggleTagTimeline(e)}
    >
      <span class="material-symbols-rounded" style="font-size:14px;">auto_awesome</span>
      ${e.name}
    </button>`}};M.styles=[ye,ce,$`
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
    `];N([v({attribute:!1})],M.prototype,"media",2);N([v({type:Boolean})],M.prototype,"favorite",2);N([v({attribute:!1})],M.prototype,"queue",2);N([c()],M.prototype,"full",2);N([c()],M.prototype,"activeTag",2);N([c()],M.prototype,"tagging",2);N([c()],M.prototype,"editing",2);N([c()],M.prototype,"saving",2);N([c()],M.prototype,"editTitle",2);N([c()],M.prototype,"editNotes",2);N([c()],M.prototype,"editKind",2);N([c()],M.prototype,"editTags",2);N([c()],M.prototype,"newTag",2);N([c()],M.prototype,"screenshot",2);N([c()],M.prototype,"userGallery",2);N([c()],M.prototype,"galleryUploading",2);N([c()],M.prototype,"comic",2);N([c()],M.prototype,"page",2);N([c()],M.prototype,"fit",2);M=N([I("oppai-viewer")],M);var zn=Object.defineProperty,An=Object.getOwnPropertyDescriptor,oe=(e,t,i,a)=>{for(var o=a>1?void 0:a?An(t,i):t,r=e.length-1,n;r>=0;r--)(n=e[r])&&(o=(a?n(t,i,o):n(o))||o);return a&&o&&zn(t,i,o),o};let ee=class extends _{constructor(){super(...arguments),this.urls="",this.results=[],this.failures=[],this.chosen=new Set,this.busy=!1,this.phase="",this.fetchCount=0,this.error="",this.kind="image",this.kindTouched=!1,this.onUrlKeydown=e=>{e.key==="Enter"&&(e.ctrlKey||e.metaKey)&&(e.preventDefault(),this.fetch())}}open(){this.results=[],this.failures=[],this.chosen=new Set,this.error="",this.urls="",this.phase="",this.fetchCount=0,this.kind="image",this.kindTouched=!1,this.dialog.show()}get isGame(){return this.kind==="game"}get isComic(){return this.kind==="comic"}get urlList(){const e=new Set;return this.urls.split(/[\n,]/).map(t=>t.trim()).filter(t=>t&&!e.has(t)&&(e.add(t),!0))}get totalMedia(){return this.results.reduce((e,t)=>e+t.mediaUrls.length,0)}async fetch(){var t;const e=this.urlList;if(!(e.length===0||this.busy)){this.busy=!0,this.phase="fetching",this.fetchCount=e.length,this.error="",this.results=[],this.failures=[];try{const{items:i}=await u.scrapeBulk(e),a=new Set;for(const r of i)if(r.result){const n={...r.result,tags:r.result.tags??[],performers:r.result.performers??[],mediaUrls:r.result.mediaUrls??[],screenshots:r.result.screenshots??[],categorizedTags:r.result.categorizedTags??[]};this.results=[...this.results,n],n.mediaUrls.forEach(d=>a.add(d))}else this.failures=[...this.failures,{url:r.url,error:r.error||"failed"}];this.chosen=a;const o=(t=this.results.find(r=>r.kind))==null?void 0:t.kind;o&&(this.kind=o),this.kindTouched=!1,this.results.length===0&&this.failures.length>0&&(this.error="Nothing could be fetched from those links.")}catch(i){this.error=i.message}finally{this.busy=!1,this.phase=""}}}pickKind(e){this.kind=e,this.kindTouched=!0}toggle(e){const t=new Set(this.chosen);t.has(e)?t.delete(e):t.add(e),this.chosen=t}import(){if(this.busy||!this.isGame&&this.chosen.size===0||this.isGame&&this.results.length===0)return;this.error="";const e=[...this.results],t=new Set(this.chosen),i=this.kindTouched,a=this.kind,o=e.length===1?e[0].title||"Import":`${e.length} imports`;_o(o,async r=>{let n=0,d=0;for(const p of e){const f=i?a:p.kind||a;if(f==="game"){const y=await u.scrapeImport({url:p.sourceUrl,title:p.title,tags:p.tags,categorizedTags:p.categorizedTags,kind:"game"});n+=y.count,r(++d/e.length);continue}const g=p.mediaUrls.filter(y=>t.has(y));if(g.length===0){r(++d/e.length);continue}const m=await u.scrapeImport({url:p.sourceUrl,mediaUrls:g,title:p.title,tags:p.tags,categorizedTags:p.categorizedTags,kind:f});n+=m.count,r(++d/e.length)}this.dispatchEvent(new CustomEvent("imported",{detail:{count:n},bubbles:!0,composed:!0}))}),this.dialog.close()}renderGroup(e){return s`
      <div class="group">
        <div class="meta"><strong>${e.title||"(untitled)"}</strong></div>
        ${e.description?s`<div class="meta">${e.description}</div>`:""}
        ${e.tags.length?s`<div class="tags">
              ${e.tags.map(t=>s`<md-filter-chip label=${t} selected></md-filter-chip>`)}
            </div>`:""}
        ${this.isGame?this.renderGameGroup(e):this.renderMediaGroup(e)}
        ${this.isComic?this.renderComicHint(e):""}
      </div>
    `}renderComicHint(e){const t=e.mediaUrls.filter(i=>this.chosen.has(i)).length;return t===0?s`<div class="game-hint">Select the pages to include.</div>`:t===1?s`<div class="game-hint">
        A single page imports as one file. Select more pages to bundle them into a comic.
      </div>`:s`<div class="game-hint">
      Imports as one <strong>comic</strong> entry — ${t} pages bundled into a CBZ, in the order
      shown. Deselect any covers or banners that aren't pages.
    </div>`}renderMediaGroup(e){return e.mediaUrls.length?s`<div class="previews">
          ${e.mediaUrls.map(t=>s`<div class="pv ${this.chosen.has(t)?"sel":""}" @click=${()=>this.toggle(t)}>
              <img src=${u.proxyURL(t)} loading="lazy" />
            </div>`)}
        </div>`:s`<div class="meta">No media found on that page.</div>`}renderGameGroup(e){var i,a;const t=e.cover||e.mediaUrls[0];return s`
      ${t?s`<div class="previews">
            <div class="pv sel"><img src=${u.proxyURL(t)} loading="lazy" /></div>
          </div>`:s`<div class="meta">No cover image found.</div>`}
      ${(i=e.screenshots)!=null&&i.length?s`<div class="shots">
            ${e.screenshots.slice(0,8).map(o=>s`<img src=${u.proxyURL(o)} loading="lazy" />`)}
          </div>`:""}
      <div class="game-hint">
        Imports as one <strong>game</strong> entry — cover art, description, tags${(a=e.screenshots)!=null&&a.length?`, ${e.screenshots.length} screenshot${e.screenshots.length===1?"":"s"}`:""} and a download link.
      </div>
    `}renderTypeRow(){return this.results.length===0?"":s`
      <div class="typerow">
        <span class="lbl">Import as</span>
        ${rt.map(e=>s`<md-filter-chip
            label=${Z[e].label}
            ?selected=${this.kind===e}
            @click=${()=>this.pickKind(e)}
          ></md-filter-chip>`)}
      </div>
    `}render(){return s`
      <md-dialog>
        <div slot="headline">Import from URL</div>
        <form slot="content" method="dialog" @submit=${e=>e.preventDefault()}>
          <div class="row">
            <md-outlined-text-field label="Page or media URL(s)" type="textarea" rows="3"
              .value=${this.urls}
              @input=${e=>this.urls=e.target.value}
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
          ${this.results.map(e=>this.renderGroup(e))}
          ${this.failures.length?s`<div class="err">
                ${this.failures.length} link(s) failed:
                ${this.failures.map(e=>s`<div class="src">${e.url} — ${e.error}</div>`)}
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
    `}};ee.styles=[ce,$`
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
    `];oe([S("md-dialog")],ee.prototype,"dialog",2);oe([c()],ee.prototype,"urls",2);oe([c()],ee.prototype,"results",2);oe([c()],ee.prototype,"failures",2);oe([c()],ee.prototype,"chosen",2);oe([c()],ee.prototype,"busy",2);oe([c()],ee.prototype,"phase",2);oe([c()],ee.prototype,"fetchCount",2);oe([c()],ee.prototype,"error",2);oe([c()],ee.prototype,"kind",2);oe([c()],ee.prototype,"kindTouched",2);ee=oe([I("oppai-scrape-dialog")],ee);var En=Object.defineProperty,Ln=Object.getOwnPropertyDescriptor,D=(e,t,i,a)=>{for(var o=a>1?void 0:a?Ln(t,i):t,r=e.length-1,n;r>=0;r--)(n=e[r])&&(o=(a?n(t,i,o):n(o))||o);return a&&o&&En(t,i,o),o};const Pn=[{id:"neutral",label:"Neutral",hint:"Login screen and error popups"},{id:"happy",label:"Happy",hint:"Chat · Sweet mode"},{id:"mischievous",label:"Mischievous",hint:"Chat · Playful mode"},{id:"surprised",label:"Surprised",hint:"Chat · Bold mode"},{id:"thinking",label:"Thinking",hint:"Chat · Roleplay mode"}],Sa=["Calm","Warm","Flirty","Heated","Peak"],_t=(e,t)=>`${e}:${t}`,oi=[{id:"appearance",label:"Appearance",icon:"palette",group:"You"},{id:"libby",label:"Libby",icon:"auto_awesome",group:"You"},{id:"account",label:"Account",icon:"account_circle",group:"You"},{id:"ai",label:"AI tagging",icon:"smart_toy",group:"Server",server:!0},{id:"scraping",label:"Scraping",icon:"travel_explore",group:"Server",server:!0},{id:"library",label:"Library",icon:"inventory_2",group:"Server"},{id:"android",label:"Android app",icon:"android",group:"Server"},{id:"about",label:"About",icon:"info",group:"Server"}];let E=class extends _{constructor(){super(...arguments),this.tab="appearance",this.settings=null,this.info=null,this.stats=null,this.apk=null,this.loadError="",this.dirty=!1,this.saving=!1,this.saved=!1,this.theme=tt(),this.fit=zo(),this.hideLibby=Ne(),this.outfits=[],this.wornOutfit=Dt(),this.outfitDraft=null,this.outfitBusy=!1,this.pwCurrent="",this.pwNew="",this.pwConfirm="",this.pwBusy=!1,this.pwMsg="",this.pwErr=""}connectedCallback(){super.connectedCallback(),this.load(),this.loadOutfits()}async loadOutfits(){try{const e=await u.libbyOutfits();this.outfits=e.outfits,this.wornOutfit&&!e.outfits.some(t=>t.id===this.wornOutfit)&&(this.wornOutfit="",$a(""))}catch{}}async load(){try{const[e,t]=await Promise.all([u.getSettings(),u.stats()]);this.settings=e.settings,this.info=e.readOnly,this.stats=t}catch(e){this.loadError=e.message}try{this.apk=await u.apkInfo()}catch{this.apk={available:!1}}}get canEdit(){var e;return!!((e=this.user)!=null&&e.isAdmin)}edit(e){!this.settings||!this.canEdit||(this.settings={...this.settings,...e},this.dirty=!0,this.saved=!1)}async save(){if(this.settings){this.saving=!0;try{const e=await u.saveSettings(this.settings);this.settings=e.settings,this.info=e.readOnly,this.dirty=!1,this.saved=!0}catch(e){this.loadError=e.message}finally{this.saving=!1}}}pickTheme(e){this.theme=e,lo(e),Wt(e)}pickFit(e){this.fit=e,Ao(e)}async changePassword(){if(this.pwMsg="",this.pwErr="",this.pwNew!==this.pwConfirm){this.pwErr="The new passwords don't match.";return}if(this.pwNew.length<8){this.pwErr="Use at least 8 characters.";return}this.pwBusy=!0;try{await u.changePassword(this.pwCurrent,this.pwNew),this.pwMsg="Password changed.",this.pwCurrent=this.pwNew=this.pwConfirm=""}catch(e){this.pwErr=e.message}finally{this.pwBusy=!1}}render(){const e=oi.find(a=>a.id===this.tab)??oi[0],t=this.dirty||this.saved;let i="";return s`
      <div class="shell">
        <nav class="cat-rail" aria-label="Settings categories">
          ${oi.map(a=>{const o=a.group===i?l:s`<div class="cat-head">${a.group}</div>`;return i=a.group,s`${o}
              <button
                class="cat-row ${a.id===this.tab?"on":""}"
                aria-current=${a.id===this.tab?"page":"false"}
                @click=${()=>this.tab=a.id}
              >
                <span class="material-symbols-rounded">${a.icon}</span>
                <span class="cat-label">${a.label}</span>
              </button>`})}
          <div class="cat-sep"></div>
          <button class="cat-row danger" @click=${()=>this.dispatchEvent(new CustomEvent("logout",{bubbles:!0,composed:!0}))}>
            <span class="material-symbols-rounded">logout</span>
            <span class="cat-label">Sign out</span>
          </button>
        </nav>

        <div class="panel-col">
          <h2 class="panel-title">${e.label}</h2>
          ${this.loadError?s`<div class="banner error">
                <span class="material-symbols-rounded" style="font-size:18px;">error</span>
                ${this.loadError}
              </div>`:l}
          ${!this.canEdit&&this.settings&&e.server?s`<div class="banner info">
                <span class="material-symbols-rounded" style="font-size:18px;">lock</span>
                Server settings are read-only — only an admin can change them.
              </div>`:l}
          ${this.renderTab()}
          ${t?this.renderSaveBar():l}
        </div>
      </div>
    `}renderTab(){switch(this.tab){case"appearance":return this.renderAppearance();case"libby":return this.renderLibby();case"ai":return this.renderAI();case"scraping":return this.renderScraping();case"library":return this.renderLibrary();case"android":return this.renderAndroid();case"account":return this.renderAccount();default:return this.renderAbout()}}renderSaveBar(){return s`
      <div class="savebar">
        <span class="grow">
          ${this.saved&&!this.dirty?"Settings saved — they're live now.":"You have unsaved changes."}
        </span>
        <button class="btn-primary" ?disabled=${this.saving||!this.dirty} @click=${this.save}>
          <span class="material-symbols-rounded" style="font-size:20px;">save</span>
          ${this.saving?"Saving…":"Save"}
        </button>
      </div>
    `}renderAndroid(){const e=this.apk;return s`
      <section class="card">
        <h3><span class="material-symbols-rounded">android</span>Android app</h3>
        <p class="card-sub">
          Install the companion app straight from this server — no app store, no
          sideloading from a third party.
        </p>

        ${e===null?s`<p class="field-help">Checking…</p>`:e.available?s`
                <div class="field">
                  <div class="field-text">
                    <div class="field-label">oppailib.apk</div>
                    <div class="field-help">
                      ${ri(e.size??0)} · built
                      ${new Date((e.modified??0)*1e3).toLocaleDateString()}
                      ${e.sha256?s`<br /><span style="font-family:monospace; font-size:11px;"
                            >sha256 ${e.sha256.slice(0,16)}…</span
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
            ${[["dark","Dark","dark_mode"],["light","Light","light_mode"],["system","System","contrast"]].map(([e,t,i])=>s`<button
                class=${this.theme===e?"on":""}
                @click=${()=>this.pickTheme(e)}
              >
                <span class="material-symbols-rounded" style="font-size:18px;">${i}</span>${t}
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
            ${[["page","Fit page","fit_screen"],["width","Fit width","fit_width"]].map(([e,t,i])=>s`<button
                class=${this.fit===e?"on":""}
                @click=${()=>this.pickFit(e)}
              >
                <span class="material-symbols-rounded" style="font-size:18px;">${i}</span>${t}
              </button>`)}
          </div>
        </div>
      </section>
    `}renderLibby(){return s`
      <section class="card">
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
              @click=${()=>{this.hideLibby=!this.hideLibby,Xs(this.hideLibby)}}
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
            ${ea.map(e=>s`<button
              class=${fo()===e?"on":""}
              @click=${()=>{Zs(e),this.requestUpdate()}}
            >${e}×</button>`)}
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
            ${this.outfits.map(e=>s`<div class="outfit-row">
                <span class="name">${e.name}</span>
                <span class="meta">${e.emotions.length}/5 emotions</span>
                <button
                  class="outfit-btn ${this.wornOutfit===e.id?"on":""}"
                  @click=${()=>this.wearOutfit(this.wornOutfit===e.id?"":e.id)}
                >${this.wornOutfit===e.id?"Wearing":"Wear"}</button>
                <button class="outfit-btn" @click=${()=>this.openOutfitEditor(e)}>Edit</button>
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
    `}wearOutfit(e){this.wornOutfit=e,$a(e)}openOutfitEditor(e){const t=[];if(e.emotionLevels)for(const[i,a]of Object.entries(e.emotionLevels))for(const o of a)t.push(_t(i,o));else for(const i of e.emotions)t.push(_t(i,0));this.outfitDraft={id:e.id,name:e.name,existing:t,staged:{},level:0}}stageEmotion(e,t){if(!t||!t.type.startsWith("image/")||!this.outfitDraft)return;const i=_t(e,this.outfitDraft.level),a=new FileReader;a.onload=()=>{this.outfitDraft&&(this.outfitDraft={...this.outfitDraft,staged:{...this.outfitDraft.staged,[i]:String(a.result)}})},a.readAsDataURL(t)}async saveOutfit(){const e=this.outfitDraft;if(!(!e||!e.name.trim()||this.outfitBusy)){this.outfitBusy=!0;try{const t=await u.saveLibbyOutfit({id:e.id,name:e.name.trim()});for(const[i,a]of Object.entries(e.staged)){const[o,r]=i.split(":");await u.setLibbyEmotion(t.id,o,a,Number(r))}this.outfitDraft=null,await this.loadOutfits()}catch(t){this.loadError=t.message}finally{this.outfitBusy=!1}}}async deleteOutfit(){const e=this.outfitDraft;if(!(!(e!=null&&e.id)||this.outfitBusy)&&confirm(`Delete the “${e.name}” outfit?`)){this.outfitBusy=!0;try{await u.deleteLibbyOutfit(e.id);const t=Q("libraryDelete");F(t.message,"success",{emotion:t.emotion,intensity:t.intensity}),this.wornOutfit===e.id&&this.wearOutfit(""),this.outfitDraft=null,await this.loadOutfits()}catch(t){this.loadError=t.message}finally{this.outfitBusy=!1}}}renderOutfitEditor(e){return s`
      <div class="outfit-overlay" @click=${t=>{t.target===t.currentTarget&&(this.outfitDraft=null)}}>
        <div class="outfit-dialog">
          <h3>${e.id?"Edit outfit":"New outfit"}</h3>
          <input
            type="text"
            placeholder="Outfit name (Summer dress, Maid, …)"
            .value=${e.name}
            @input=${t=>this.outfitDraft={...e,name:t.target.value}}
          />
          <div class="tier-tabs">
            ${Sa.map((t,i)=>s`<button
                class="tier-tab ${e.level===i?"on":""}"
                @click=${()=>this.outfitDraft={...e,level:i}}
                title="Shown as the horniness meter reaches this tier"
              >${t}</button>`)}
          </div>
          <p class="tier-note">
            ${e.level===0?"Baseline art — worn when the meter is low, and the fallback for any tier you leave empty.":`Shown as Libby’s horniness meter climbs into the “${Sa[e.level]}” range.`}
          </p>
          <div class="slots">
            ${Pn.map(t=>{const i=_t(t.id,e.level),a=e.staged[i],o=!a&&e.id&&e.existing.includes(i)?u.libbyEmotionURL(e.id,t.id,e.level):"";return s`
                <label
                  class="slot"
                  @dragover=${r=>{r.preventDefault(),r.currentTarget.classList.add("dragover")}}
                  @dragleave=${r=>r.currentTarget.classList.remove("dragover")}
                  @drop=${r=>{var n,d;r.preventDefault(),r.currentTarget.classList.remove("dragover"),this.stageEmotion(t.id,(d=(n=r.dataTransfer)==null?void 0:n.files)==null?void 0:d[0])}}
                >
                  ${a?s`<img src=${a} alt=${t.label} />`:o?s`<img src=${o} alt=${t.label} />`:s`<div class="drop-hint">Drop an image here<br />or click to browse</div>`}
                  <div class="slot-label">${t.label}</div>
                  <div class="slot-hint">${t.hint}</div>
                  <input
                    type="file"
                    accept="image/*"
                    style="display:none;"
                    @change=${r=>{var d;const n=r.target;this.stageEmotion(t.id,(d=n.files)==null?void 0:d[0]),n.value=""}}
                  />
                </label>
              `})}
          </div>
          <div class="outfit-actions">
            ${e.id?s`<button class="outfit-btn danger" ?disabled=${this.outfitBusy} @click=${()=>this.deleteOutfit()}>
                  Delete outfit
                </button>`:l}
            <button class="outfit-btn" @click=${()=>this.outfitDraft=null}>Cancel</button>
            <button
              class="btn-primary"
              ?disabled=${!e.name.trim()||this.outfitBusy}
              @click=${()=>this.saveOutfit()}
            >
              ${this.outfitBusy?"Saving…":"Save outfit"}
            </button>
          </div>
        </div>
      </div>
    `}renderAI(){const e=this.settings,t=this.info;return s`
      <section class="card">
        <h3><span class="material-symbols-rounded">auto_awesome</span>AI auto-tagging</h3>
        <p class="card-sub">
          Tagging runs entirely on this box — no image ever leaves it. The heuristic tagger needs no
          model; a real classifier requires an ONNX build with a model in the model directory.
        </p>

        ${e?s`
              ${this.switchField("Enable auto-tagging","Master switch. Off means no tagging at all, including the ✨ button.",e.aiEnabled,i=>this.edit({aiEnabled:i}))}
              ${this.switchField("Tag on import","Tag new uploads and imports automatically. With this off, tagging only happens when you ask for it.",e.aiAutoTag,i=>this.edit({aiAutoTag:i}),!e.aiEnabled)}

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
                    .value=${String(e.aiMinScore)}
                    ?disabled=${!this.canEdit||!e.aiEnabled}
                    @input=${i=>this.edit({aiMinScore:Number(i.target.value)})}
                  />
                  <span class="value">${e.aiMinScore.toFixed(2)}</span>
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
                    .value=${String(e.aiMaxTags)}
                    ?disabled=${!this.canEdit||!e.aiEnabled}
                    @change=${i=>this.edit({aiMaxTags:Number(i.target.value)})}
                  />
                </div>
              </div>

              ${t?s`
                    ${this.readOnlyField("Active tagger","Chosen at startup.",t.aiTagger)}
                    ${this.readOnlyField("Inference device","OPPAI_AI_DEVICE — needs a restart to change.",t.aiDevice)}
                    ${this.readOnlyField("Model directory","OPPAI_AI_MODEL_DIR — needs a restart to change.",t.aiModelDir)}
                  `:l}
            `:s`<div class="field-help">Loading…</div>`}
      </section>
    `}renderScraping(){const e=this.settings;return s`
      <section class="card">
        <h3><span class="material-symbols-rounded">travel_explore</span>Import &amp; scraping</h3>
        <p class="card-sub">How OppaiLib behaves toward the sites you import from.</p>

        ${e?s`
              ${this.switchField("Respect robots.txt","Skip URLs a site asks crawlers not to fetch.",e.scrapeRespectRobots,t=>this.edit({scrapeRespectRobots:t}))}

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
                    .value=${String(e.scrapeDelayMs)}
                    ?disabled=${!this.canEdit}
                    @change=${t=>this.edit({scrapeDelayMs:Number(t.target.value)})}
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
                    .value=${e.scrapeUserAgent}
                    ?disabled=${!this.canEdit}
                    @change=${t=>this.edit({scrapeUserAgent:t.target.value})}
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
                    .value=${e.civitaiApiUrl} ?disabled=${!this.canEdit}
                    @change=${t=>this.edit({civitaiApiUrl:t.target.value})} />
                </div>
                <div class="field-control">
                  <input type="password" autocomplete="new-password"
                    placeholder=${e.civitaiKeySet?"•••••••• (unchanged)":"Civitai API key (optional)"}
                    ?disabled=${!this.canEdit}
                    @change=${t=>this.edit({civitaiApiKey:t.target.value})} />
                </div>
                ${e.civitaiKeySet?s`<div class="field-control">
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
                    .value=${e.rule34UserId} ?disabled=${!this.canEdit}
                    @change=${t=>this.edit({rule34UserId:t.target.value})} />
                </div>
                <div class="field-control">
                  <input type="password" autocomplete="new-password"
                    placeholder=${e.rule34ApiKeySet?"•••••••• (unchanged)":"Rule34 API key"}
                    ?disabled=${!this.canEdit}
                    @change=${t=>this.edit({rule34ApiKey:t.target.value})} />
                </div>
                ${e.rule34ApiKeySet?s`<div class="field-control">
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
                    .value=${e.f95Username}
                    ?disabled=${!this.canEdit}
                    @change=${t=>this.edit({f95Username:t.target.value})}
                  />
                </div>
                <div class="field-control">
                  <input
                    type="password"
                    autocomplete="new-password"
                    placeholder=${e.f95PasswordSet?"•••••••• (unchanged)":"F95 password"}
                    ?disabled=${!this.canEdit}
                    @change=${t=>this.edit({f95Password:t.target.value})}
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
                    .value=${e.imageGenUrl}
                    ?disabled=${!this.canEdit}
                    @change=${t=>this.edit({imageGenUrl:t.target.value})}
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
                    .value=${e.chatUrl}
                    ?disabled=${!this.canEdit}
                    @change=${t=>this.edit({chatUrl:t.target.value})}
                  />
                </div>
                <div class="field-control">
                  <input
                    type="text"
                    autocomplete="off"
                    placeholder="Optional fallback model name"
                    .value=${e.chatModel}
                    ?disabled=${!this.canEdit}
                    @change=${t=>this.edit({chatModel:t.target.value})}
                  />
                </div>
                <div class="field-control">
                  <input
                    type="password"
                    autocomplete="new-password"
                    placeholder=${e.chatApiKeySet?"API key saved — enter to replace":"API key (optional)"}
                    .value=${e.chatApiKey}
                    ?disabled=${!this.canEdit}
                    @change=${t=>this.edit({chatApiKey:t.target.value})}
                  />
                </div>
              </div>
            `:s`<div class="field-help">Loading…</div>`}
      </section>
    `}renderLibrary(){const e=this.stats;if(!e)return l;const t=new Map(e.kinds.map(i=>[i.kind,i]));return s`
      <section class="card">
        <h3><span class="material-symbols-rounded">inventory_2</span>Library</h3>
        <p class="card-sub">
          ${e.items} ${e.items===1?"item":"items"} · ${ri(e.bytes)} stored ·
          ${e.tags} ${e.tags===1?"tag":"tags"}
        </p>
        <div class="stat-grid">
          ${Object.keys(Z).map(i=>{const a=t.get(i);return s`<div class="stat">
              <div class="stat-num">${(a==null?void 0:a.count)??0}</div>
              <div class="stat-label">${Z[i].label} · ${ri((a==null?void 0:a.bytes)??0)}</div>
            </div>`})}
        </div>
      </section>
    `}renderAccount(){var e,t;return s`
      <section class="card">
        <h3><span class="material-symbols-rounded">account_circle</span>Account</h3>
        <p class="card-sub">
          Signed in as <strong>${(e=this.user)==null?void 0:e.username}</strong>${(t=this.user)!=null&&t.isAdmin?" (admin)":""}.
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
    `}renderAbout(){const e=this.info;return e?s`
      <section class="card">
        <h3><span class="material-symbols-rounded">info</span>About this server</h3>
        <p class="card-sub">Set by environment variables; changing them needs a restart.</p>
        ${this.readOnlyField("Version","The running build.",e.version)}
        ${this.readOnlyField("Video thumbnails","Posters need ffmpeg on the server's PATH.",e.ffmpeg?"ffmpeg available":"ffmpeg missing — posters disabled")}
        ${this.readOnlyField("Media directory","Where encrypted blobs live.",e.mediaDir)}
        ${this.readOnlyField("Database","SQLite metadata store.",e.dbPath)}
        ${this.readOnlyField("Session length","How long a login stays valid.",`${e.sessionHours} hours`)}
      </section>
    `:l}switchField(e,t,i,a,o=!1){const r=!this.canEdit||o;return s`
      <div class="field">
        <div class="field-text">
          <div class="field-label">${e}</div>
          <div class="field-help">${t}</div>
        </div>
        <div class="field-control">
          <button
            class="switch ${i?"on":""}"
            role="switch"
            aria-checked=${i?"true":"false"}
            aria-label=${e}
            ?disabled=${r}
            @click=${()=>a(!i)}
          ></button>
        </div>
      </div>
    `}readOnlyField(e,t,i){return s`
      <div class="field">
        <div class="field-text">
          <div class="field-label">${e}</div>
          <div class="field-help">${t}</div>
        </div>
        <div class="field-control"><span class="ro">${i}</span></div>
      </div>
    `}};E.styles=[ye,ce,$`
      :host {
        display: block;
      }

      /* Discord's settings shape: a grouped category rail on the left, one panel on
         the right. Sections inside a panel are flat and separated by rules rather
         than floated as cards — with only one panel visible, card edges are noise. */
      .shell {
        display: grid;
        grid-template-columns: 218px minmax(0, 1fr);
        gap: 8px;
        align-items: start;
      }
      .cat-rail {
        position: sticky;
        top: 0;
        display: flex;
        flex-direction: column;
        gap: 2px;
        padding: 4px 8px 24px;
      }
      .cat-head {
        padding: 14px 10px 4px;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--oppai-text-muted);
      }
      .cat-row {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 10px;
        border: 0;
        border-radius: 6px;
        background: transparent;
        color: var(--oppai-text-muted);
        font: inherit;
        font-size: 14px;
        font-weight: 500;
        text-align: left;
        cursor: pointer;
        transition: background 0.12s ease, color 0.12s ease;
      }
      .cat-row .material-symbols-rounded {
        font-size: 19px;
      }
      .cat-label {
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .cat-row:hover,
      .cat-row.on {
        background: var(--oppai-nav-hover);
        color: var(--oppai-text);
      }
      .cat-row.danger {
        color: var(--oppai-fav);
      }
      .cat-sep {
        height: 1px;
        margin: 10px;
        background: var(--oppai-border);
      }
      .panel-col {
        min-width: 0;
        max-width: 760px;
        padding: 4px 8px 48px;
      }
      .panel-title {
        margin: 0 0 18px;
        font-size: 20px;
        font-weight: 600;
      }
      .card {
        background: transparent;
        border: 0;
        border-top: 1px solid var(--oppai-border);
        border-radius: 0;
        padding: 20px 0 4px;
        margin-bottom: 12px;
        animation: oppai-fade-in-up 0.28s var(--oppai-ease-emphasized) both;
      }
      /* The first section sits directly under the panel title, so its rule would be
         a line under a heading that already reads as one. */
      .card:first-of-type {
        border-top: 0;
        padding-top: 0;
      }
      .card h3 {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--oppai-text-dim);
        margin: 0 0 4px;
      }
      .card h3 .material-symbols-rounded {
        font-size: 17px;
        color: var(--oppai-primary-bright);
      }
      @media (max-width: 860px) {
        /* The rail becomes a scrolling strip above the panel; a 218px column and a
           readable panel do not both fit. */
        .shell {
          grid-template-columns: minmax(0, 1fr);
        }
        .cat-rail {
          position: static;
          flex-direction: row;
          overflow-x: auto;
          gap: 4px;
          padding: 4px 4px 12px;
          border-bottom: 1px solid var(--oppai-border);
        }
        .cat-head,
        .cat-sep {
          display: none;
        }
        .cat-row {
          flex: 0 0 auto;
          border-radius: 999px;
          padding: 7px 12px;
        }
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
    `,$`
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
    `];D([v({attribute:!1})],E.prototype,"user",2);D([c()],E.prototype,"tab",2);D([c()],E.prototype,"settings",2);D([c()],E.prototype,"info",2);D([c()],E.prototype,"stats",2);D([c()],E.prototype,"apk",2);D([c()],E.prototype,"loadError",2);D([c()],E.prototype,"dirty",2);D([c()],E.prototype,"saving",2);D([c()],E.prototype,"saved",2);D([c()],E.prototype,"theme",2);D([c()],E.prototype,"fit",2);D([c()],E.prototype,"hideLibby",2);D([c()],E.prototype,"outfits",2);D([c()],E.prototype,"wornOutfit",2);D([c()],E.prototype,"outfitDraft",2);D([c()],E.prototype,"outfitBusy",2);D([c()],E.prototype,"pwCurrent",2);D([c()],E.prototype,"pwNew",2);D([c()],E.prototype,"pwConfirm",2);D([c()],E.prototype,"pwBusy",2);D([c()],E.prototype,"pwMsg",2);D([c()],E.prototype,"pwErr",2);E=D([I("oppai-settings")],E);function ri(e){if(!e)return"0 B";const t=["B","KB","MB","GB","TB"];let i=e,a=0;for(;i>=1024&&a<t.length-1;)i/=1024,a++;return`${i<10&&a>0?i.toFixed(1):Math.round(i)} ${t[a]}`}var Dn=Object.defineProperty,On=Object.getOwnPropertyDescriptor,P=(e,t,i,a)=>{for(var o=a>1?void 0:a?On(t,i):t,r=e.length-1,n;r>=0;r--)(n=e[r])&&(o=(a?n(t,i,o):n(o))||o);return a&&o&&Dn(t,i,o),o};let z=class extends _{constructor(){super(...arguments),this.sources=[],this.sourceId="",this.feedId="",this.container=null,this.sort="",this.query="",this.draft="",this.items=[],this.cursor="",this.loading=!1,this.loadingSources=!0,this.error="",this.active=null,this.pages=[],this.pageAt=0,this.saving=!1,this.toast="",this.commentsFor=null,this.comments=[],this.commentsLoading=!1,this.commentsError="",this.commentQuery="",this.threadQuery="",this.threadDraft="",this.reqId=0,this.leaveContainer=()=>{this.container=null,this.reset()},this.close=()=>{this.active=null,this.pages=[]},this.closeComments=()=>{this.commentsFor=null,this.comments=[],this.commentsError=""}}connectedCallback(){super.connectedCallback(),this.loadSources()}get source(){return this.sources.find(e=>e.id===this.sourceId)}get feed(){var e;return(e=this.source)==null?void 0:e.feeds.find(t=>t.id===this.feedId)}get isSearch(){var e;return!this.container&&((e=this.feed)==null?void 0:e.query)===!0}get activeFeed(){var e;return((e=this.container)==null?void 0:e.feedId)??this.feedId}get isFourChan(){return this.sourceId==="4chan"}async loadSources(){var e;try{const{sources:t}=await u.sources();this.sources=t;const i=t[0];i&&(this.sourceId=i.id,this.feedId=((e=i.feeds[0])==null?void 0:e.id)??"")}catch(t){this.error=t instanceof Error?t.message:"Couldn't reach the server"}finally{this.loadingSources=!1}this.sourceId&&this.load(!0)}async load(e){if(!this.sourceId||!e&&(this.loading||!this.cursor)||this.isSearch&&!this.query)return;const t=++this.reqId;this.loading=!0;try{const i=await u.browseSource(this.sourceId,{feed:this.activeFeed,cursor:e?void 0:this.cursor,q:this.container?void 0:this.query||void 0,sort:this.container?void 0:this.sort||void 0});if(t!==this.reqId)return;this.items=e?i.items:[...this.items,...i.items],this.cursor=i.cursor??"",this.error=""}catch(i){if(t!==this.reqId)return;this.error=i instanceof Error?i.message:"Couldn't load that feed"}finally{t===this.reqId&&(this.loading=!1)}}reset(){this.items=[],this.cursor="",this.error="",this.load(!0)}pickSource(e){var t,i;e!==this.sourceId&&(this.sourceId=e,this.feedId=((i=(t=this.sources.find(a=>a.id===e))==null?void 0:t.feeds[0])==null?void 0:i.id)??"",this.container=null,this.sort="",this.query="",this.draft="",this.reset())}pickFeed(e){var t,i;e===this.feedId&&!this.container||(this.feedId=e,this.container=null,this.sort="",((i=(t=this.source)==null?void 0:t.feeds.find(a=>a.id===e))==null?void 0:i.query)!==!0&&(this.query="",this.draft=""),this.reset())}addThread(e){var d;e.preventDefault();const t=this.threadDraft.trim(),i=t.match(/^(?:https?:\/\/)?(?:boards\.4chan\.org\/)?\/?([a-z0-9]+)\/?$/i);if(i){this.threadDraft="",this.pickFeed(i[1].toLowerCase());return}const a=t.match(/(?:boards\.4chan\.org\/)?([a-z0-9]+)\/(?:thread\/)?(\d+)/i)??t.match(/^\/?([a-z0-9]+):t?(\d+)$/i);if(!a){this.showToast("Enter a board such as /b/, or a 4chan thread URL");return}const o=a[1].toLowerCase(),r=a[2],n=`${o}:t${r}`;(d=this.source)!=null&&d.feeds.some(p=>p.id===o)&&(this.feedId=o),this.threadDraft="",this.openContainer({id:n,title:`/${o}/ thread No.${r}`,kind:"thread",thumbUrl:"",feedId:n,threadId:n})}pickSort(e){e!==this.sort&&(this.sort=e,this.reset())}openContainer(e){this.container=e,this.threadQuery="",this.reset()}submitSearch(e){e.preventDefault(),this.query=this.draft.trim(),this.container=null,this.reset()}async open(e){var t,i;if(this.active=e,this.pages=[],this.pageAt=0,e.kind==="comic")try{const{pages:a}=await u.sourcePages(this.sourceId,e.id);if(((t=this.active)==null?void 0:t.id)!==e.id)return;this.pages=a,this.warmPages(0)}catch(a){if(((i=this.active)==null?void 0:i.id)!==e.id)return;this.error=a instanceof Error?a.message:"Couldn't open that comic",this.active=null}}warmPages(e){for(let t=e;t<Math.min(e+Mn,this.pages.length);t++)new Image().src=u.sourceStreamURL(this.pages[t])}goPage(e){const t=Math.min(Math.max(e,0),this.pages.length-1);t!==this.pageAt&&(this.pageAt=t,this.warmPages(t+1))}async openComments(e){var i,a,o;const t=e.threadId;if(t){this.commentsFor=e,this.comments=[],this.commentsError="",this.commentQuery="",this.commentsLoading=!0;try{const{comments:r}=await u.sourceComments(this.sourceId,t);if(((i=this.commentsFor)==null?void 0:i.id)!==e.id)return;this.comments=r}catch(r){if(((a=this.commentsFor)==null?void 0:a.id)!==e.id)return;this.commentsError=r instanceof Error?r.message:"Couldn't load the thread"}finally{((o=this.commentsFor)==null?void 0:o.id)===e.id&&(this.commentsLoading=!1)}}}save(e){if(!e||this.saving)return;const t=e.kind==="comic"||e.kind==="thread";this.saving=!0,_o(e.title||"Source download",async i=>{try{i(.08),await u.saveFromSource(this.sourceId,{itemId:t?e.id:void 0,mediaUrl:t?void 0:e.mediaUrl,pageUrl:e.pageUrl,title:e.title,kind:t?"comic":e.kind,tags:e.tags}),i(1),this.dispatchEvent(new CustomEvent("imported",{bubbles:!0,composed:!0}))}finally{this.saving=!1}}),this.showToast(e.kind==="thread"?"Downloading thread in background":"Downloading in background")}showToast(e){this.toast=e,setTimeout(()=>{this.toast=""},2600)}renderTile(e,t){const i=e.kind==="thread",a=i?`${e.count??0}`:e.width&&e.height?`${e.width}×${e.height}`:"";return s`
      <button
        class="tile anim-rise"
        style="animation-delay:${Math.min(t,12)*45}ms;"
        @click=${()=>i?this.openContainer(e):this.open(e)}
        title=${e.title}
      >
        <div class="tile-media">
          ${e.thumbUrl?s`<img src=${u.sourceStreamURL(e.thumbUrl)} loading="lazy" alt=${e.title} />`:s`<div class="tile-blank">
                <span class="material-symbols-rounded" style="font-size:36px;">forum</span>
              </div>`}
          ${e.kind==="video"?s`<span class="play material-symbols-rounded" style="font-size:44px;">play_circle</span>`:l}
          ${a?s`<span class="tile-stat">
                ${i?s`<span class="material-symbols-rounded" style="font-size:13px;">image</span>`:l}
                ${a}
              </span>`:l}
        </div>
        <div class="tile-meta">
          <div class="tile-title">${e.title}</div>
          <div class="tile-tag">
            ${i?"Thread":e.kind==="comic"?"Gallery":e.kind}
          </div>
        </div>
      </button>
    `}renderOverlay(e){const t=e.kind==="comic",i=this.pages[this.pageAt];return s`
      <div class="overlay" @click=${a=>{a.target===a.currentTarget&&this.close()}}>
        <div class="obar">
          <button class="obtn" @click=${this.close}>
            <span class="material-symbols-rounded" style="font-size:18px;">arrow_back</span>Back
          </button>
          <span class="t">${e.title}</span>
          ${e.threadId?s`<button class="obtn" @click=${()=>this.openComments(e)}>
                <span class="material-symbols-rounded" style="font-size:18px;">forum</span>Comments
              </button>`:l}
          ${e.pageUrl?s`<a href=${e.pageUrl} target="_blank" rel="noopener noreferrer">
                <button class="obtn">
                  <span class="material-symbols-rounded" style="font-size:18px;">open_in_new</span>Source
                </button>
              </a>`:l}
          <button class="obtn" ?disabled=${this.saving} @click=${()=>this.save(e)}>
            <span class="material-symbols-rounded" style="font-size:18px;">download</span>
            ${this.saving?"Saving…":"Save to library"}
          </button>
        </div>

        <div class="ostage">
          ${t?i?s`<img src=${u.sourceStreamURL(i)} alt="Page ${this.pageAt+1}" />`:s`<md-circular-progress indeterminate></md-circular-progress>`:e.kind==="video"?s`<video
                  src=${u.sourceStreamURL(e.mediaUrl??"")}
                  controls
                  autoplay
                  loop
                  playsinline
                  preload="metadata"
                ></video>`:s`<img src=${u.sourceStreamURL(e.mediaUrl??e.thumbUrl)} alt=${e.title} />`}
        </div>

        ${e.kind==="video"?this.renderUpNext(e):l}

        ${t&&this.pages.length?s`
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
    `}renderUpNext(e){const t=this.items.filter(a=>a.kind==="video");if(t.some(a=>a.id===e.id)||t.unshift(e),t.length<2)return l;const i=t.findIndex(a=>a.id===e.id);return s`
      <div class="upnext">
        <div class="upnext-label">Videos</div>
        <div class="strip">
          ${t.map((a,o)=>s`
              <button
                class="strip-item ${a.id===e.id?"on":""}"
                title=${a.title}
                aria-current=${a.id===e.id}
                @click=${()=>this.open(a)}
              >
                <img src=${u.sourceStreamURL(a.thumbUrl)} loading="lazy" alt=${a.title} />
                ${a.kind==="video"?s`<span class="strip-play material-symbols-rounded">play_circle</span>`:l}
                ${o===i+1?s`<span class="strip-next">Next</span>`:l}
              </button>
            `)}
        </div>
      </div>
    `}renderComments(e){const t=e.postNo,i=this.commentQuery.trim().toLowerCase(),a=i?this.comments.filter(o=>[String(o.no),o.name,o.subject,o.text].some(r=>(r??"").toLowerCase().includes(i))):this.comments;return s`
      <div
        class="overlay comments"
        @click=${o=>{o.target===o.currentTarget&&this.closeComments()}}
      >
        <div class="cpanel">
          <div class="chead">
            <span class="t">${e.title}</span>
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
                @input=${o=>this.commentQuery=o.target.value}
              />
            </label>
          </div>

          ${this.commentsLoading?s`<div class="cempty"><md-circular-progress indeterminate></md-circular-progress></div>`:this.commentsError?s`<div class="cempty">${this.commentsError}</div>`:a.length?s`<div class="clist">
                    ${a.map(o=>this.renderComment(o,o.no===t))}
                  </div>`:s`<div class="cempty">${i?"No matching posts.":"No posts in this thread."}</div>`}
        </div>
      </div>
    `}renderComment(e,t){return s`
      <article id=${`post-${e.no}`} class="cpost ${t?"here":""} ${e.op?"op":""}">
        <header class="cmeta">
          ${e.op?s`<span class="cbadge">OP</span>`:l}
          ${t?s`<span class="cbadge here-badge">This file</span>`:l}
          <span class="cname">${e.name||"Anonymous"}</span>
          <span class="cno">No.${e.no}</span>
          <span class="ctime">${Rn(e.time)}</span>
        </header>
        ${e.subject?s`<div class="csub">${e.subject}</div>`:l}
        ${this.renderAttachment(e)}
        ${e.text?s`<div class="ctext">${Fn(e.text,i=>this.goToPost(i))}</div>`:l}
      </article>
    `}goToPost(e){this.commentQuery="",this.updateComplete.then(()=>{var t;(t=this.renderRoot.querySelector(`#post-${e}`))==null||t.scrollIntoView({behavior:"smooth",block:"center"})})}renderAttachment(e){if(!e.thumbUrl)return l;const t=e.kind==="video";return s`
      <button
        class="cattach"
        title=${t?"Play this video":"Open this file"}
        @click=${()=>this.openAttachment(e)}
      >
        <img class="cthumb" src=${u.sourceStreamURL(e.thumbUrl)} loading="lazy" alt="" />
        ${t?s`<span class="cplay material-symbols-rounded">play_circle</span>`:l}
      </button>
    `}openAttachment(e){var a;const i=(e.itemId?this.items.find(o=>o.id===e.itemId):void 0)??{id:e.itemId??`post-${e.no}`,title:e.subject||`No.${e.no}`,kind:e.kind??"image",thumbUrl:e.thumbUrl??"",mediaUrl:e.mediaUrl,threadId:(a=this.commentsFor)==null?void 0:a.threadId,postNo:e.no};this.closeComments(),this.open(i)}renderContainerHead(e){var t;return s`
      <div class="head">
        <h2 class="title">${e.title}</h2>
        <span class="count">
          ${this.items.length} ${this.items.length===1?"file":"files"}
        </span>
        <div class="head-actions">
          <button class="chip ghost" @click=${this.leaveContainer}>
            <span class="material-symbols-rounded" style="font-size:16px;">arrow_back</span>
            Back to ${((t=this.feed)==null?void 0:t.label)??"the board"}
          </button>
          ${e.threadId?s`<button class="chip ghost" @click=${()=>this.openComments(e)}>
                <span class="material-symbols-rounded" style="font-size:16px;">forum</span>
                Comments
              </button>`:l}
          <button class="chip ghost" ?disabled=${this.saving} @click=${()=>this.save(e)}>
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
    `}render(){var o,r,n,d,p,f,g;if(this.loadingSources)return s`<div class="empty"><md-circular-progress indeterminate></md-circular-progress></div>`;if(!this.sources.length)return s`<div class="empty">No remote sources are configured.</div>`;const e=((o=this.feed)==null?void 0:o.sorts)??[],t=this.container,i=this.threadQuery.trim().toLowerCase(),a=t&&i?this.items.filter(m=>[m.title,String(m.postNo??""),m.kind].some(y=>y.toLowerCase().includes(i))):this.items;return s`
      ${t?this.renderContainerHead(t):s`
            <div class="head">
              <h2 class="title">${((r=this.source)==null?void 0:r.name)??"Browse"}</h2>
              <span class="count">${this.items.length?`${this.items.length} shown`:""}</span>
            </div>

            ${this.sources.length>1?s`<div class="chips tight">
                  ${this.sources.map(m=>s`<button
                      class="chip"
                      aria-pressed=${m.id===this.sourceId}
                      @click=${()=>this.pickSource(m.id)}
                    >${m.name}</button>`)}
                </div>`:l}

            ${this.isFourChan?s`<div class="thread-tools">
                  <select
                    class="feed-select"
                    aria-label="4chan board"
                    @change=${m=>this.pickFeed(m.target.value)}
                  >
                    ${(((n=this.source)==null?void 0:n.feeds)??[]).map(m=>s`<option value=${m.id} ?selected=${m.id===this.feedId}>${m.label}</option>`)}
					${(d=this.source)!=null&&d.feeds.some(m=>m.id===this.feedId)?l:s`<option value=${this.feedId} selected>/${this.feedId}/ — Custom board</option>`}
                  </select>
                  <form class="thread-tools add-thread" @submit=${this.addThread}>
                    <label class="searchbox">
                      <span class="material-symbols-rounded" style="font-size:20px; color:var(--oppai-text-dim);">add_link</span>
                      <input
                        placeholder="Type /b/ or paste a thread URL"
                        .value=${this.threadDraft}
                        @input=${m=>this.threadDraft=m.target.value}
                      />
                    </label>
                    <button class="chip" type="submit">Open</button>
                  </form>
                </div>`:s`<div class="chips ${this.isSearch?"tight":""}">
                  ${(((p=this.source)==null?void 0:p.feeds)??[]).map(m=>s`<button
                      class="chip"
                      aria-pressed=${m.id===this.feedId}
                      @click=${()=>this.pickFeed(m.id)}
                    >${m.label}</button>`)}
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
                        @input=${m=>{this.draft=m.target.value}}
                      />
                    </label>
                    <button class="chip" type="submit">Search</button>
                  </form>
                  ${e.length?s`<div class="chips tight">
                        ${e.map(m=>s`<button
                            class="chip"
                            aria-pressed=${m.id===(this.sort||e[0].id)}
                            @click=${()=>this.pickSort(m.id)}
                          >${m.label}</button>`)}
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
                  <div class="grid">${a.map((m,y)=>this.renderTile(m,y))}</div>
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
                    ${t?i?s`Nothing in this thread matched “${this.threadQuery.trim()}”.`:"Nothing left in this thread — it may have 404'd.":this.query?s`Nothing matched “${this.query}”.`:"Nothing on this feed."}
                  </div>
                </div>`}

      ${this.active?this.renderOverlay(this.active):l}
      ${this.commentsFor?this.renderComments(this.commentsFor):l}
      ${this.toast?s`<div class="toast">${this.toast}</div>`:l}
    `}};z.styles=[ye,ce,$`
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
    `];P([c()],z.prototype,"sources",2);P([c()],z.prototype,"sourceId",2);P([c()],z.prototype,"feedId",2);P([c()],z.prototype,"container",2);P([c()],z.prototype,"sort",2);P([c()],z.prototype,"query",2);P([c()],z.prototype,"draft",2);P([c()],z.prototype,"items",2);P([c()],z.prototype,"cursor",2);P([c()],z.prototype,"loading",2);P([c()],z.prototype,"loadingSources",2);P([c()],z.prototype,"error",2);P([c()],z.prototype,"active",2);P([c()],z.prototype,"pages",2);P([c()],z.prototype,"pageAt",2);P([c()],z.prototype,"saving",2);P([c()],z.prototype,"toast",2);P([c()],z.prototype,"commentsFor",2);P([c()],z.prototype,"comments",2);P([c()],z.prototype,"commentsLoading",2);P([c()],z.prototype,"commentsError",2);P([c()],z.prototype,"commentQuery",2);P([c()],z.prototype,"threadQuery",2);P([c()],z.prototype,"threadDraft",2);z=P([I("oppai-browse")],z);const Mn=3;function Rn(e){return e?new Date(e*1e3).toLocaleString(void 0,{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"}):""}function Fn(e,t){return e.split(`
`).map(i=>{const a=!/^>>\d+/.test(i)&&i.startsWith(">"),o=i.split(/(>>\d+)/g);return s`<div class=${a?"cgreen":""}>${o.map(r=>{const n=r.match(/^>>(\d+)$/);return n?s`<button class="cquote" @click=${()=>t(Number(n[1]))}>${r}</button>`:r})}</div>`})}var Nn=Object.defineProperty,Bn=Object.getOwnPropertyDescriptor,te=(e,t,i,a)=>{for(var o=a>1?void 0:a?Bn(t,i):t,r=e.length-1,n;r>=0;r--)(n=e[r])&&(o=(a?n(t,i,o):n(o))||o);return a&&o&&Nn(t,i,o),o};const Un=40;let J=class extends _{constructor(){super(...arguments),this.boards=[],this.board="none",this.items=[],this.total=0,this.loading=!1,this.error="",this.expanded=null,this.busy=!1,this.newBoard="",this.savedNames=new Set,this.selecting=!1,this.selected=new Set}connectedCallback(){super.connectedCallback(),this.refresh()}get selectedBoard(){return this.board}announceBoard(){this.dispatchEvent(new CustomEvent("board-changed",{detail:{board:this.board},bubbles:!0,composed:!0}))}async refresh(){this.error="";try{const e=await u.galleryBoards();this.boards=e.boards,!this.boards.some(t=>t.id===this.board)&&this.boards.length&&(this.board=this.boards[0].id),this.announceBoard()}catch(e){this.error=e.message;return}await this.loadPage(!0)}async loadPage(e){if(!this.loading){this.loading=!0;try{const t=e?0:this.items.length,i=await u.galleryImages(this.board,t,Un);this.items=e?i.items:[...this.items,...i.items],this.total=i.total}catch(t){this.error=t.message}finally{this.loading=!1}}}pickBoard(e){this.board!==e&&(this.board=e,this.items=[],this.announceBoard(),this.loadPage(!0))}async createBoard(){const e=this.newBoard.trim();if(!(!e||this.busy)){this.busy=!0,this.error="";try{const t=await u.createGalleryBoard(e);this.newBoard="",await this.refresh(),this.pickBoard(t.id),this.dispatchEvent(new CustomEvent("boards-changed",{bubbles:!0,composed:!0}))}catch(t){this.error=t.message}finally{this.busy=!1}}}async deleteBoard(){const e=this.boards.find(t=>t.id===this.board);if(!(!e||e.id==="none"||this.busy)&&confirm(`Delete the “${e.name}” gallery? Its images move back to Uncategorized.`)){this.busy=!0,this.error="";try{await u.deleteGalleryBoard(e.id);const t=Q("galleryDelete");F(t.message,"success",{emotion:t.emotion,intensity:t.intensity}),this.board="none",this.items=[],await this.refresh(),this.dispatchEvent(new CustomEvent("boards-changed",{bubbles:!0,composed:!0}))}catch(t){this.error=t.message}finally{this.busy=!1}}}async deleteImage(e){var t;if(!this.busy){this.busy=!0;try{await u.deleteGalleryImage(e.name);const i=Q("galleryDelete");F(i.message,"success",{emotion:i.emotion,intensity:i.intensity}),this.items=this.items.filter(a=>a.name!==e.name),this.total=Math.max(0,this.total-1),this.boards=this.boards.map(a=>a.id===this.board?{...a,count:Math.max(0,a.count-1)}:a),((t=this.expanded)==null?void 0:t.name)===e.name&&(this.expanded=null)}catch(i){this.error=i.message}finally{this.busy=!1}}}async saveToLibrary(e){if(!(this.busy||this.savedNames.has(e.name))){this.busy=!0;try{await u.saveGalleryImage({name:e.name}),this.savedNames=new Set(this.savedNames).add(e.name),this.dispatchEvent(new CustomEvent("imported",{bubbles:!0,composed:!0}))}catch(t){this.error=t.message}finally{this.busy=!1}}}toggleSelecting(){this.selecting=!this.selecting,this.selecting||(this.selected=new Set)}toggleSelected(e){const t=new Set(this.selected);t.has(e)?t.delete(e):t.add(e),this.selected=t}async deleteSelected(){const e=[...this.selected];if(!(!e.length||this.busy)){this.busy=!0;try{await u.deleteGalleryImages(e);const t=Q("galleryDelete",{count:e.length});F(t.message,"success",{emotion:t.emotion,intensity:t.intensity});const i=this.selected;this.items=this.items.filter(a=>!i.has(a.name)),this.total=Math.max(0,this.total-e.length),this.boards=this.boards.map(a=>a.id===this.board?{...a,count:Math.max(0,a.count-e.length)}:a),this.selected=new Set,this.selecting=!1}catch(t){this.error=t.message}finally{this.busy=!1}}}async addSelectedToBoard(e){const t=[...this.selected];if(!(!t.length||!e||e===this.board||this.busy)){this.busy=!0;try{await u.addGalleryImagesToBoard(e,t);const i=this.selected;this.items=this.items.filter(a=>!i.has(a.name)),this.total=Math.max(0,this.total-t.length),this.selected=new Set,this.selecting=!1,await this.refresh()}catch(i){this.error=i.message}finally{this.busy=!1}}}render(){const e=this.boards.find(t=>t.id===this.board);return s`
      <div class="panel">
        <div class="head">
          <span class="material-symbols-rounded" style="font-size:18px;">photo_library</span>
          Invoke gallery
          <span class="count">${e?`${this.total||e.count} images`:""}</span>
          ${this.items.length?s`<button class="sel-toggle ${this.selecting?"on":""}"
                @click=${()=>this.toggleSelecting()}>
                ${this.selecting?"Done":"Select"}
              </button>`:l}
        </div>
        ${this.selecting?s`<div class="sel-bar">
              <span class="sel-count">${this.selected.size} selected</span>
              <select class="sel-move" aria-label="Move to gallery" .value=${""}
                ?disabled=${this.busy||!this.selected.size}
                @change=${t=>{const i=t.target;this.addSelectedToBoard(i.value),i.value=""}}>
                <option value="">Add to gallery…</option>
                ${this.boards.filter(t=>t.id!==this.board).map(t=>s`<option value=${t.id}>${t.name}</option>`)}
              </select>
              <button class="sel-del" ?disabled=${this.busy||!this.selected.size}
                @click=${()=>this.deleteSelected()}>
                <span class="material-symbols-rounded" style="font-size:15px; vertical-align:-3px;">delete</span>
                Delete
              </button>
            </div>`:l}
        ${this.boards.length?s`
              <select class="board-select" aria-label="Gallery" .value=${this.board}
                @change=${t=>this.pickBoard(t.target.value)}>
                ${this.boards.map(t=>s`<option value=${t.id}>${t.name}${t.count?` · ${t.count}`:""}</option>`)}
              </select>
              ${this.boards.length<=6?s`<div class="boards">
                ${this.boards.map(t=>s`<button class="board ${t.id===this.board?"on":""}"
                    @click=${()=>this.pickBoard(t.id)}>${t.name}${t.count?` · ${t.count}`:""}</button>`)}
              </div>`:l}
              ${this.board!=="none"?s`<button class="board-del" ?disabled=${this.busy}
                    title="Delete this gallery (its images move to Uncategorized)"
                    @click=${()=>this.deleteBoard()}>
                    <span class="material-symbols-rounded" style="font-size:15px; vertical-align:-3px;">delete</span>
                    Delete gallery
                  </button>`:l}
            `:l}
        <div class="note">New generations are filed into ${(e==null?void 0:e.name)??"this gallery"}.</div>
        <div class="new-board">
          <input maxlength="300" placeholder="New Invoke gallery" .value=${this.newBoard}
            @input=${t=>this.newBoard=t.target.value}
            @keydown=${t=>{t.key==="Enter"&&this.createBoard()}} />
          <button ?disabled=${this.busy||!this.newBoard.trim()} @click=${()=>this.createBoard()}>Create</button>
        </div>
        ${this.error?s`<div class="err">${this.error}</div>`:l}
        ${this.items.length?s`<div class="grid">
              ${this.items.map(t=>{const i=this.selected.has(t.name);return s`
                  <button
                    class="tile ${this.selecting?"selectable":""} ${i?"picked":""}"
                    title=${t.name}
                    @click=${()=>this.selecting?this.toggleSelected(t.name):this.expanded=t}
                  >
                    <img src=${u.galleryThumbURL(t.name)} alt="Generated image" loading="lazy" />
                    ${this.selecting?s`<span class="check">
                          <span class="material-symbols-rounded" style="font-size:15px;">
                            ${i?"check_circle":"radio_button_unchecked"}
                          </span>
                        </span>`:s`<span
                          class="del"
                          role="button"
                          title="Delete from InvokeAI"
                          @click=${a=>{a.stopPropagation(),this.deleteImage(t)}}
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
    `}renderExpanded(e){const t=this.savedNames.has(e.name);return s`
      <div class="overlay" @click=${i=>{i.target===i.currentTarget&&(this.expanded=null)}}>
        <img src=${u.galleryFullURL(e.name)} alt="Generated image" />
        <div class="overlay-actions">
          <button class="obtn primary" ?disabled=${this.busy||t} @click=${()=>this.saveToLibrary(e)}>
            <span class="material-symbols-rounded" style="font-size:17px;">${t?"check":"save"}</span>
            ${t?"In library":"Save to library"}
          </button>
          <button class="obtn danger" ?disabled=${this.busy} @click=${()=>this.deleteImage(e)}>
            <span class="material-symbols-rounded" style="font-size:17px;">delete</span> Delete
          </button>
          <button class="obtn" @click=${()=>this.expanded=null}>
            <span class="material-symbols-rounded" style="font-size:17px;">close</span> Close
          </button>
        </div>
      </div>
    `}};J.styles=[ye,ce,$`
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
    `];te([c()],J.prototype,"boards",2);te([c()],J.prototype,"board",2);te([c()],J.prototype,"items",2);te([c()],J.prototype,"total",2);te([c()],J.prototype,"loading",2);te([c()],J.prototype,"error",2);te([c()],J.prototype,"expanded",2);te([c()],J.prototype,"busy",2);te([c()],J.prototype,"newBoard",2);te([c()],J.prototype,"savedNames",2);te([c()],J.prototype,"selecting",2);te([c()],J.prototype,"selected",2);J=te([I("oppai-invoke-gallery")],J);var jn=Object.defineProperty,Hn=Object.getOwnPropertyDescriptor,Y=(e,t,i,a)=>{for(var o=a>1?void 0:a?Hn(t,i):t,r=e.length-1,n;r>=0;r--)(n=e[r])&&(o=(a?n(t,i,o):n(o))||o);return a&&o&&jn(t,i,o),o};let U=class extends _{constructor(){super(...arguments),this.q="",this.type="",this.sort="",this.category="",this.categories=[],this.items=[],this.cursor="",this.loading=!1,this.error="",this.detail=null,this.versionId=0,this.shownImage="",this.jobs=[],this.installing=!1,this.zoomed=""}connectedCallback(){super.connectedCallback(),this.search(!0),this.loadCategories(),this.pollJobs(),this.jobTimer=window.setInterval(()=>void this.pollJobs(),5e3)}async loadCategories(){try{this.categories=(await u.civitaiCategories()).categories}catch{this.categories=[]}}disconnectedCallback(){super.disconnectedCallback(),this.jobTimer&&clearInterval(this.jobTimer)}async pollJobs(){try{const e=await u.civitaiInstalls();this.jobs=e.jobs.filter(t=>t.status!=="cancelled").slice(0,5)}catch{}}async search(e){if(!this.loading){this.loading=!0,this.error="";try{const t=await u.civitaiSearch({q:this.q||void 0,type:this.type||void 0,category:this.category||void 0,sort:this.sort||void 0,cursor:e?void 0:this.cursor||void 0});this.items=e?t.items:[...this.items,...t.items],this.cursor=t.nextCursor??""}catch(t){this.error=t.message}finally{this.loading=!1}}}openDetail(e){this.detail=e;const t=e.versions[0];this.versionId=(t==null?void 0:t.id)??0,this.shownImage=(t==null?void 0:t.images[0])??""}currentVersion(){var e;return(e=this.detail)==null?void 0:e.versions.find(t=>t.id===this.versionId)}async install(e){if(!(this.installing||!e.downloadUrl)){this.installing=!0,this.error="";try{await u.civitaiInstall(e.downloadUrl),await this.pollJobs()}catch(t){this.error=t.message}finally{this.installing=!1}}}jobLabel(e){return e.status==="downloading"&&e.totalBytes?`downloading ${Math.round((e.bytes??0)/e.totalBytes*100)}%`:e.status}render(){return s`
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
            @input=${e=>this.q=e.target.value}
            @keydown=${e=>{e.key==="Enter"&&this.search(!0)}}
          />
          ${[{id:"",label:"All"},{id:"checkpoint",label:"Checkpoints"},{id:"lora",label:"LoRAs"}].map(e=>s`<button class="chip ${this.type===e.id?"on":""}"
              @click=${()=>{this.type=e.id,this.search(!0)}}>${e.label}</button>`)}
          <select
            .value=${this.sort}
            @change=${e=>{this.sort=e.target.value,this.search(!0)}}
          >
            <option value="">Most downloaded</option>
            <option value="rated">Highest rated</option>
            <option value="newest">Newest</option>
          </select>
          <select
            aria-label="Category"
            .value=${this.category}
            @change=${e=>{this.category=e.target.value,this.search(!0)}}
          >
            <option value="">All categories</option>
            ${this.categories.map(e=>s`<option value=${e.name}>${e.name} (${kt(e.count)})</option>`)}
          </select>
        </div>
        ${this.jobs.length?s`<div class="jobs">
              ${this.jobs.map(e=>s`<div class="job">
                  <span class="material-symbols-rounded" style="font-size:15px;">download</span>
                  <span class="st ${e.status}">${this.jobLabel(e)}</span>
                  <span style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${e.error||e.source}</span>
                </div>`)}
            </div>`:l}
        ${this.error?s`<div class="err">${this.error}</div>`:l}
        <div class="grid">
          ${this.items.map(e=>{var i,a;const t=(i=e.versions[0])==null?void 0:i.images[0];return s`
              <button class="card" @click=${()=>this.openDetail(e)}>
                ${t?s`<img src=${u.civitaiImageURL(t)} alt=${e.name} loading="lazy" />`:s`<div class="noimg"><span class="material-symbols-rounded" style="font-size:34px;">image</span></div>`}
                <div class="meta">
                  <div class="name">${e.name}</div>
                  <div class="sub">
                    <span>${e.type}</span>
                    ${(a=e.versions[0])!=null&&a.base?s`<span>${e.versions[0].base}</span>`:l}
                    <span>⤓ ${kt(e.downloads)}</span>
                  </div>
                </div>
              </button>
            `})}
        </div>
        ${this.loading?s`<div class="note">Searching Civitai…</div>`:this.items.length?this.cursor?s`<button class="more" @click=${()=>this.search(!1)}>Load more</button>`:l:s`<div class="note">No models matched. Try another search.</div>`}
      </div>
      ${this.detail?this.renderDetail(this.detail):l}
      ${this.zoomed?s`<div class="zoom" @click=${()=>this.zoomed=""}>
            <img src=${u.civitaiImageURL(this.zoomed)} alt="Preview" />
          </div>`:l}
    `}renderDetail(e){const t=this.currentVersion();return s`
      <div class="overlay" @click=${i=>{i.target===i.currentTarget&&(this.detail=null)}}>
        <div class="detail">
          <div>
            ${this.shownImage?s`<img class="big" src=${u.civitaiImageURL(this.shownImage)} alt=${e.name}
                  @click=${()=>this.zoomed=this.shownImage} />`:s`<div class="big" style="display:grid; place-items:center;">
                  <span class="material-symbols-rounded" style="font-size:40px; color:var(--oppai-text-muted);">image</span>
                </div>`}
            ${t&&t.images.length>1?s`<div class="thumbs">
                  ${t.images.map(i=>s`<img src=${u.civitaiImageURL(i)} class=${i===this.shownImage?"on":""}
                      alt="Preview" @click=${()=>this.shownImage=i} />`)}
                </div>`:l}
          </div>
          <div>
            <h3>${e.name}</h3>
            <div class="sub">
              ${e.type}${e.creator?` · by ${e.creator}`:""} · ⤓ ${kt(e.downloads)} · ♥ ${kt(e.likes)}
            </div>
            ${e.versions.length>1?s`<div class="vlabel">Version</div>
                  <div class="versions">
                    ${e.versions.map(i=>s`<button class="chip ${i.id===this.versionId?"on":""}"
                        @click=${()=>{this.versionId=i.id,this.shownImage=i.images[0]??""}}>${i.name}<span style="opacity:.7;"> · ${i.base}</span></button>`)}
                  </div>`:l}
            ${t!=null&&t.trainedWords.length?s`<div class="vlabel">Trigger words</div>
                  <div class="words">${t.trainedWords.join(", ")}</div>`:l}
            ${t?s`<button class="install" ?disabled=${this.installing||!t.downloadUrl} @click=${()=>this.install(t)}>
                  <span class="material-symbols-rounded" style="font-size:18px;">download</span>
                  Install to InvokeAI${t.sizeMB?` (${Gn(t.sizeMB)})`:""}
                </button>`:l}
            <div class="sub" style="margin-top:10px;">
              InvokeAI downloads the file itself; progress appears in the strip on the search page.
            </div>
          </div>
        </div>
      </div>
    `}};U.styles=[ye,ce,$`
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
    `];Y([c()],U.prototype,"q",2);Y([c()],U.prototype,"type",2);Y([c()],U.prototype,"sort",2);Y([c()],U.prototype,"category",2);Y([c()],U.prototype,"categories",2);Y([c()],U.prototype,"items",2);Y([c()],U.prototype,"cursor",2);Y([c()],U.prototype,"loading",2);Y([c()],U.prototype,"error",2);Y([c()],U.prototype,"detail",2);Y([c()],U.prototype,"versionId",2);Y([c()],U.prototype,"shownImage",2);Y([c()],U.prototype,"jobs",2);Y([c()],U.prototype,"installing",2);Y([c()],U.prototype,"zoomed",2);U=Y([I("oppai-civitai")],U);function kt(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Gn(e){return e>=1024?`${(e/1024).toFixed(1)} GB`:`${e} MB`}var Wn=Object.defineProperty,qn=Object.getOwnPropertyDescriptor,w=(e,t,i,a)=>{for(var o=a>1?void 0:a?qn(t,i):t,r=e.length-1,n;r>=0;r--)(n=e[r])&&(o=(a?n(t,i,o):n(o))||o);return a&&o&&Wn(t,i,o),o};function za(){const e=window;return e.SpeechRecognition??e.webkitSpeechRecognition??null}const Yn=[{label:"Portrait",hint:"512×768",w:512,h:768},{label:"Square",hint:"512×512",w:512,h:512},{label:"Landscape",hint:"768×512",w:768,h:512},{label:"Tall",hint:"640×960",w:640,h:960},{label:"XL Portrait",hint:"832×1216",w:832,h:1216},{label:"XL Square",hint:"1024×1024",w:1024,h:1024},{label:"XL Landscape",hint:"1216×832",w:1216,h:832}],Kn=[{id:"",label:"Default (Euler a)"},...[["ddim","DDIM"],["ddpm","DDPM"],["deis","DEIS"],["deis_k","DEIS Karras"],["dpmpp_2s","DPM++ 2S"],["dpmpp_2s_k","DPM++ 2S Karras"],["dpmpp_2m","DPM++ 2M"],["dpmpp_2m_k","DPM++ 2M Karras"],["dpmpp_2m_sde","DPM++ 2M SDE"],["dpmpp_2m_sde_k","DPM++ 2M SDE Karras"],["dpmpp_3m","DPM++ 3M"],["dpmpp_3m_k","DPM++ 3M Karras"],["dpmpp_sde","DPM++ SDE"],["dpmpp_sde_k","DPM++ SDE Karras"],["er_sde","ER-SDE"],["euler","Euler"],["euler_k","Euler Karras"],["euler_a","Euler Ancestral"],["heun","Heun"],["heun_k","Heun Karras"],["kdpm_2","KDPM 2"],["kdpm_2_k","KDPM 2 Karras"],["kdpm_2_a","KDPM 2 Ancestral"],["kdpm_2_a_k","KDPM 2 Ancestral Karras"],["lcm","LCM"],["lms","LMS"],["lms_k","LMS Karras"],["pndm","PNDM"],["tcd","TCD"],["unipc","UniPC"],["unipc_k","UniPC Karras"]].map(([e,t])=>({id:e,label:t}))];let x=class extends _{constructor(){super(...arguments),this.status=null,this.checkpoint="",this.vae="",this.templateId="",this.showBuiltInTemplates=!1,this.selectedLoras={},this.selectedTriggers=[],this.loraPage=0,this.characters=[],this.selectedChars=[],this.charDraft=null,this.charBusy=!1,this.scanBusy=!1,this.open={models:!0},this.speech="",this.listening=!1,this.optimizing=!1,this.prompt="",this.tagSuggestions=[],this.tagCorrection="",this.negative="",this.showOptions=!1,this.width=512,this.height=768,this.steps=25,this.cfg=7,this.cfgRescale=0,this.clipSkip=0,this.seamlessX=!1,this.seamlessY=!1,this.vaePrecision="fp32",this.cpuNoise=!0,this.board="none",this.scheduler="",this.count=1,this.seed=-1,this.detailerEnabled=!1,this.detailerModel="face_yolov8n.pt",this.detailerPrompt="",this.detailerNegative="",this.detailerConfidence=.3,this.detailerDenoise=.4,this.detailerMaskBlur=4,this.generating=!1,this.shots=[],this.error="",this.toast="",this.thumbVersion=0,this.failedThumbs=new Set,this.expandedShot=null,this.metaDraft=null,this.metaBusy=!1,this.metaTriggerText="",this.civitaiOpen=!1,this.recognition=null}connectedCallback(){super.connectedCallback(),this.loadStatus(),this.loadCharacters()}disconnectedCallback(){super.disconnectedCallback(),this.stopListening()}async loadStatus(){this.status=null,this.error="";try{const e=await u.imageGenStatus();this.status=e,!this.checkpoint&&e.models&&e.models.length&&this.pickModel(e.models[0])}catch(e){this.status={enabled:!0,reachable:!1,error:e.message}}}async loadCharacters(){try{const e=await u.characters();this.characters=e.characters;const t=new Set(e.characters.map(i=>i.id));this.selectedChars=this.selectedChars.filter(i=>t.has(i))}catch{}}pickModel(e){this.checkpoint=e.title;const t=e.defaults;t&&(t.steps&&(this.steps=t.steps),t.cfgScale&&(this.cfg=t.cfgScale),t.cfgRescale!==void 0&&(this.cfgRescale=t.cfgRescale),t.scheduler&&(this.scheduler=t.scheduler),t.width&&(this.width=t.width),t.height&&(this.height=t.height),t.vae&&(this.vae=t.vae),this.vaePrecision="fp32")}get speechSupported(){return za()!=null}toggleListening(){if(this.listening){this.stopListening();return}const e=za();if(!e)return;const t=new e;t.lang=navigator.language||"en-US",t.continuous=!1,t.interimResults=!0,t.onresult=i=>{let a="";for(let o=0;o<i.results.length;o++)a+=i.results[o][0].transcript;this.speech=a},t.onerror=i=>{this.error=i.error==="not-allowed"?"Microphone permission was denied.":`Speech error: ${i.error}`,this.stopListening()},t.onend=()=>{this.listening=!1,this.speech.trim()&&this.optimize(this.speech)},this.recognition=t,this.listening=!0,this.error="";try{t.start()}catch{this.listening=!1}}stopListening(){if(this.listening=!1,this.recognition){try{this.recognition.stop()}catch{}this.recognition=null}}async optimize(e){this.optimizing=!0;try{const{prompt:t,negativePrompt:i}=await u.optimizePrompt(e);this.prompt=t,this.negative||(this.negative=i)}catch(t){this.error=t.message}finally{this.optimizing=!1}}assemblePrompts(){var r,n;const e=[this.prompt.trim(),...this.selectedTriggers],t=[this.negative.trim()];for(const d of this.selectedChars){const p=this.characters.find(f=>f.id===d);p&&(p.prompt.trim()&&e.push(p.prompt.trim()),(r=p.negativePrompt)!=null&&r.trim()&&t.push(p.negativePrompt.trim()))}let i=e.filter(Boolean).join(", "),a=t.filter(Boolean).join(", ");const o=(((n=this.status)==null?void 0:n.templates)??[]).find(d=>d.id===this.templateId);return o&&(o.prompt.includes("{prompt}")?i=o.prompt.replaceAll("{prompt}",i):o.prompt.trim()&&(i=`${i}, ${o.prompt.trim()}`),o.negativePrompt.includes("{prompt}")?a=o.negativePrompt.replaceAll("{prompt}",a):o.negativePrompt.trim()&&(a=a?`${a}, ${o.negativePrompt.trim()}`:o.negativePrompt.trim())),{prompt:i,negative:a}}async generate(){var i,a;if(this.generating||!this.prompt.trim())return;const{prompt:e,negative:t}=this.assemblePrompts();this.generating=!0,this.error="";try{const o=await u.generate({prompt:e,negativePrompt:t||void 0,checkpoint:this.checkpoint||void 0,vae:this.vae||void 0,sampler:this.scheduler||void 0,steps:this.steps,width:this.width,height:this.height,cfgScale:this.cfg,cfgRescale:this.cfgRescale,clipSkip:this.clipSkip,seamlessX:this.seamlessX,seamlessY:this.seamlessY,vaePrecision:this.vaePrecision,cpuNoise:this.cpuNoise,board:this.board,count:this.count,seed:this.seed,loras:Object.entries(this.selectedLoras).map(([r,n])=>({name:r,weight:n})),detailer:(i=this.status)!=null&&i.detailerAvailable&&this.detailerEnabled?{enabled:!0,model:this.detailerModel,prompt:this.detailerPrompt||void 0,negativePrompt:this.detailerNegative||void 0,confidence:this.detailerConfidence,denoise:this.detailerDenoise,maskBlur:this.detailerMaskBlur}:void 0});this.shots=o.images.map(r=>({...r,saved:!1})),(a=this.galleryPanel)==null||a.refresh()}catch(o){this.error=o.message}finally{this.generating=!1}}async save(e){if(!e.saved)try{const t=this.prompt.trim().slice(0,80)||"Generated image";await u.saveGenerated({id:e.id,title:t}),this.shots=this.shots.map(i=>i.id===e.id?{...i,saved:!0}:i),this.showToast("Saved to library"),this.dispatchEvent(new CustomEvent("imported",{bubbles:!0,composed:!0}))}catch(t){this.showToast(t.message)}}bumpThumbs(){this.thumbVersion++,this.failedThumbs=new Set}renderArt(e,t,i){return this.failedThumbs.has(e)?s`<div class="card-blank">
        <span class="material-symbols-rounded" style="font-size:34px;">${i}</span>
      </div>`:s`<img
      class="card-art"
      src=${e}
      alt=${t}
      loading="lazy"
      @error=${()=>{this.failedThumbs=new Set(this.failedThumbs).add(e)}}
    />`}async useAsModelThumb(e){if(!this.checkpoint){this.showToast("Pick a model first");return}try{await u.setModelThumb({model:this.checkpoint,previewId:e.id}),this.bumpThumbs(),this.showToast("Model preview synced to InvokeAI")}catch(t){this.showToast(t.message)}}async openMetaEditor(e){this.metaBusy=!0;try{const t=await u.modelMeta(e);this.metaDraft=t,this.metaTriggerText=t.triggerPhrases.join(", ")}catch(t){this.showToast(t.message)}finally{this.metaBusy=!1}}setMetaDefaults(e){const t=this.metaDraft;t&&(this.metaDraft={...t,defaults:{...t.defaults??{},...e}})}async saveMeta(){const e=this.metaDraft;if(!(!e||this.metaBusy)){this.metaBusy=!0;try{await u.patchModelMeta({key:e.key,name:e.name,description:e.description??"",triggerPhrases:this.metaTriggerText.split(",").map(t=>t.trim()).filter(Boolean),defaults:e.defaults}),this.metaDraft=null,this.showToast("Model updated"),await this.loadStatus()}catch(t){this.showToast(t.message)}finally{this.metaBusy=!1}}}toggleLora(e){var i,a,o,r,n;const t={...this.selectedLoras};if(e in t){delete t[e];const d=new Set(((a=(((i=this.status)==null?void 0:i.loras)??[]).find(f=>f.name===e))==null?void 0:a.triggerPhrases)??[]),p=new Set((((o=this.status)==null?void 0:o.loras)??[]).filter(f=>f.name in t).flatMap(f=>f.triggerPhrases??[]));this.selectedTriggers=this.selectedTriggers.filter(f=>!d.has(f)||p.has(f))}else{const d=(n=(((r=this.status)==null?void 0:r.loras)??[]).find(p=>p.name===e))==null?void 0:n.weight;t[e]=d&&Number.isFinite(d)?d:1}this.selectedLoras=t}toggleTrigger(e){this.selectedTriggers=this.selectedTriggers.includes(e)?this.selectedTriggers.filter(t=>t!==e):[...this.selectedTriggers,e]}toggleCharacter(e){this.selectedChars=this.selectedChars.includes(e)?this.selectedChars.filter(t=>t!==e):[...this.selectedChars,e]}toggleSection(e){this.open={...this.open,[e]:!this.open[e]}}onCharThumbFile(e){var o;const t=e.target,i=(o=t.files)==null?void 0:o[0];if(t.value="",!i||!this.charDraft)return;const a=new FileReader;a.onload=()=>{this.charDraft&&(this.charDraft={...this.charDraft,imageData:String(a.result)})},a.readAsDataURL(i)}onCharScanFile(e){var o;const t=e.target,i=(o=t.files)==null?void 0:o[0];if(t.value="",!i||!this.charDraft||this.scanBusy)return;const a=new FileReader;a.onload=()=>void this.scanCharImage(String(a.result)),a.readAsDataURL(i)}async scanCharImage(e){if(!(!this.charDraft||this.scanBusy)){this.scanBusy=!0;try{const i=(await u.scanImage(e)).tags.filter(p=>p.category!=="rating").map(p=>p.tag.replace(/_/g," ").trim()).filter(Boolean),a=this.charDraft;if(!a)return;const o=a.prompt.trim(),r=new Set(o.split(",").map(p=>p.trim().toLowerCase()).filter(Boolean)),n=i.filter(p=>!r.has(p.toLowerCase()));if(!n.length){this.showToast("No new tags found");return}const d=o?`${o}, ${n.join(", ")}`:n.join(", ");this.charDraft={...a,prompt:d},this.showToast(`Added ${n.length} tag${n.length===1?"":"s"}`)}catch(t){this.showToast(t.message)}finally{this.scanBusy=!1}}}async saveCharacter(){const e=this.charDraft;if(!(!e||!e.name.trim()||this.charBusy)){this.charBusy=!0;try{await u.saveCharacter({id:e.id,name:e.name.trim(),prompt:e.prompt,negativePrompt:e.negativePrompt,imageData:e.imageData}),this.charDraft=null,this.bumpThumbs(),await this.loadCharacters(),this.showToast("Character saved")}catch(t){this.showToast(t.message)}finally{this.charBusy=!1}}}async deleteCharacter(){const e=this.charDraft;if(!(!(e!=null&&e.id)||this.charBusy)&&confirm(`Delete “${e.name}” from the character library?`)){this.charBusy=!0;try{await u.deleteCharacter(e.id);const t=Q("libraryDelete");F(t.message,"success",{emotion:t.emotion,intensity:t.intensity}),this.charDraft=null,await this.loadCharacters(),this.showToast("Character deleted")}catch(t){this.showToast(t.message)}finally{this.charBusy=!1}}}showToast(e){this.toast=e,setTimeout(()=>this.toast="",2600)}render(){return s`<div class="wrap">${this.renderBody()}</div>
      ${this.charDraft?this.renderCharEditor(this.charDraft):l}
      ${this.metaDraft?this.renderMetaEditor(this.metaDraft):l}
      ${this.expandedShot?this.renderLightbox(this.expandedShot):l}
      ${this.toast?s`<div class="toast">${this.toast}</div>`:l}`}renderLightbox(e){var i;const t=this.shots.find(a=>a.id===e.id)??e;return s`
      <div class="lightbox" @click=${a=>{a.target===a.currentTarget&&(this.expandedShot=null)}}>
        <img src=${u.genPreviewURL(t.id)} alt="Generated image" />
        <div class="row">
          <button class="btn primary" ?disabled=${t.saved} @click=${()=>this.save(t)}>
            <span class="material-symbols-rounded" style="font-size:17px;">${t.saved?"check":"save"}</span>
            ${t.saved?"Saved":"Save to library"}
          </button>
          ${((i=this.status)==null?void 0:i.backend)==="invokeai"?s`<button class="btn" @click=${()=>this.useAsModelThumb(t)}>
            <span class="material-symbols-rounded" style="font-size:17px;">photo_camera</span> Sync model preview
          </button>`:l}
          <button class="btn" @click=${()=>this.expandedShot=null}>
            <span class="material-symbols-rounded" style="font-size:17px;">close</span> Close
          </button>
        </div>
      </div>
    `}renderMetaEditor(e){var a;const t=e.defaults??{},i=e.type==="lora";return s`
      <div class="overlay" @click=${o=>{o.target===o.currentTarget&&(this.metaDraft=null)}}>
        <div class="dialog">
          <h3>Edit ${i?"LoRA":"model"} — synced with InvokeAI</h3>
          <div>
            <label class="field">Name</label>
            <input type="text" .value=${e.name}
              @input=${o=>this.metaDraft={...e,name:o.target.value}} />
          </div>
          <div>
            <label class="field">Description</label>
            <textarea .value=${e.description??""}
              @input=${o=>this.metaDraft={...e,description:o.target.value}}></textarea>
          </div>
          <div>
            <label class="field">Trigger phrases (comma-separated)</label>
            <input type="text" .value=${this.metaTriggerText} placeholder="my-style, detailed face"
              @input=${o=>this.metaTriggerText=o.target.value} />
          </div>
          ${i?s`<div>
                <label class="field">Recommended weight</label>
                <input class="num" type="number" min="-2" max="2" step="0.05"
                  .value=${String(t.weight??"")} placeholder="1"
                  @input=${o=>this.setMetaDefaults({weight:Number(o.target.value)||0})} />
              </div>`:s`
                <div class="meta-grid">
                  <div>
                    <label class="field">Steps</label>
                    <input class="num" type="number" min="1" max="80" .value=${String(t.steps??"")}
                      @input=${o=>this.setMetaDefaults({steps:Number(o.target.value)||0})} />
                  </div>
                  <div>
                    <label class="field">CFG scale</label>
                    <input class="num" type="number" min="1" max="30" step="0.5" .value=${String(t.cfgScale??"")}
                      @input=${o=>this.setMetaDefaults({cfgScale:Number(o.target.value)||0})} />
                  </div>
                  <div>
                    <label class="field">CFG rescale</label>
                    <input class="num" type="number" min="0" max="0.99" step="0.05"
                      .value=${String(t.cfgRescale??"")}
                      @input=${o=>this.setMetaDefaults({cfgRescale:Number(o.target.value)||0})} />
                  </div>
                  <div>
                    <label class="field">Width</label>
                    <input class="num" type="number" min="64" max="2048" step="8" .value=${String(t.width??"")}
                      @input=${o=>this.setMetaDefaults({width:Number(o.target.value)||0})} />
                  </div>
                  <div>
                    <label class="field">Height</label>
                    <input class="num" type="number" min="64" max="2048" step="8" .value=${String(t.height??"")}
                      @input=${o=>this.setMetaDefaults({height:Number(o.target.value)||0})} />
                  </div>
                  <div class="full">
                    <label class="field">Scheduler</label>
                    <select class="num" .value=${t.scheduler??""}
                      @change=${o=>this.setMetaDefaults({scheduler:o.target.value})}>
                      <option value="">No preference</option>
                      ${["euler_a","euler","dpmpp_2m","dpmpp_2m_k","dpmpp_2m_sde_k","dpmpp_sde_k","unipc"].map(o=>s`<option value=${o} ?selected=${o===t.scheduler}>${o}</option>`)}
                    </select>
                  </div>
                  <div class="full">
                    <label class="field">Default VAE</label>
                    <select class="num" .value=${t.vae??""}
                      @change=${o=>this.setMetaDefaults({vae:o.target.value})}>
                      <option value="">Model's own</option>
                      ${(((a=this.status)==null?void 0:a.vaes)??[]).map(o=>s`<option value=${o.key} ?selected=${o.key===t.vae}>${o.name}</option>`)}
                    </select>
                  </div>
                  <div class="full">
                    <label class="field">VAE precision</label>
                    <select class="num" .value=${t.vaePrecision??""}
                      @change=${o=>this.setMetaDefaults({vaePrecision:o.target.value})}>
                      <option value="">No preference</option>
                      <option value="fp32">fp32</option>
                      <option value="fp16">fp16</option>
                    </select>
                  </div>
                </div>
              `}
          <div class="dialog-actions">
            <button class="btn" @click=${()=>this.metaDraft=null}>Cancel</button>
            <button class="btn primary" ?disabled=${this.metaBusy||!e.name.trim()} @click=${()=>this.saveMeta()}>
              Save
            </button>
          </div>
        </div>
      </div>
    `}renderBody(){const e=this.status;if(e===null)return s`<div class="empty"><md-circular-progress indeterminate></md-circular-progress></div>`;if(!e.enabled)return s`<div class="empty">
        <span class="material-symbols-rounded">auto_awesome</span>
        <div style="font-size:15px; margin-bottom:6px;">Image generation isn't set up yet.</div>
        <div style="font-size:13px;">
          Add the URL of your local InvokeAI or Automatic1111 / SD.Next server under
          <strong>Settings → Image generation</strong>, then come back here.
        </div>
      </div>`;if(!e.reachable)return s`<div class="empty">
        <span class="material-symbols-rounded">cloud_off</span>
        <div style="font-size:15px; margin-bottom:6px;">Can't reach the image generator.</div>
        <div style="font-size:13px; margin-bottom:14px;">${e.error??"It didn't answer."}</div>
        <button class="chip" @click=${()=>this.loadStatus()}>Retry</button>
      </div>`;const t=e.backend==="invokeai";return s`
      <div class="layout">
        <aside class="side">
          ${this.renderModelSection(e.models??[])}
          ${this.renderLoraSection(e.loras??[],e.loraError)}
          ${this.renderVaeSection(e.vaes??[])}
          ${this.renderSettingsSection(t,e.boards??[])}
          ${this.renderTemplateSection(e.templates??[])}
          ${this.renderCharacterSection()}
        </aside>
        <div>
          ${t?s`<div class="topline">
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
        ${t?s`<aside class="right">
              <oppai-invoke-gallery
                @boards-changed=${()=>this.loadStatus()}
                @board-changed=${i=>this.board=i.detail.board}
              ></oppai-invoke-gallery>
            </aside>`:l}
      </div>
      ${this.civitaiOpen?s`<oppai-civitai @close=${()=>this.onCivitaiClose()}></oppai-civitai>`:l}
    `}onCivitaiClose(){this.civitaiOpen=!1,this.loadStatus()}section(e,t,i,a){const o=!!this.open[e];return s`
      <div class="sec">
        <button class="sec-head" @click=${()=>this.toggleSection(e)}>
          <span class="material-symbols-rounded" style="font-size:18px;"
            >${o?"expand_more":"chevron_right"}</span
          >
          ${t}
          <span class="count">${i}</span>
        </button>
        ${o?s`<div class="sec-body">${a}</div>`:l}
      </div>
    `}renderModelSection(e){if(!e.length)return this.section("models","Models","0",s`<div class="sec-note">
          Connected, but the generator lists no checkpoints. Add a model to it and reload.
        </div>`);const t=s`
      <div class="cards">
        ${e.map(i=>{const a=i.title===this.checkpoint,o=`${u.modelThumbURL(i.title)}&v=${this.thumbVersion}`;return s`
            <div class="card-wrap">
              <button class="card ${a?"on":""}" title=${i.title} @click=${()=>this.pickModel(i)}>
                ${this.renderArt(o,i.model_name,"texture")}
                <div class="card-name">${i.model_name}${i.base?s`<span class="row-sub">${i.base}</span>`:l}</div>
              </button>
              <button class="card-edit left" title="Edit model settings" @click=${()=>this.openMetaEditor(i.title)}>
                <span class="material-symbols-rounded" style="font-size:15px;">edit</span>
              </button>
            </div>
          `})}
      </div>
    `;return this.section("models","Models",String(e.length),t)}renderLoraSection(e,t){if(!e.length)return this.section("loras","LoRAs","0",s`<div class="sec-note">
          ${t?`LoRAs aren't available from this generator: ${t}`:"No LoRAs installed."}
        </div>`);const i=Math.ceil(e.length/6),a=Math.min(this.loraPage,i-1),o=e.slice(a*6,a*6+6),r=s`
      <div class="cards">
        ${o.map(n=>{const d=n.name in this.selectedLoras,p=`${u.loraThumbURL(n.name)}&v=${this.thumbVersion}`;return s`
            <div class="card-wrap">
              <button class="card ${d?"on":""}" title=${n.name} @click=${()=>this.toggleLora(n.name)}>
                ${this.renderArt(p,n.alias||n.name,"style")}
                <div class="card-name">${n.alias||n.name}</div>
              </button>
              <button class="card-edit left" title="Edit LoRA settings" @click=${()=>this.openMetaEditor(n.name)}>
                <span class="material-symbols-rounded" style="font-size:15px;">edit</span>
              </button>
              ${d?s`<input class="lora-weight" type="number" min="-2" max="2" step="0.05"
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
    `;return this.section("loras","LoRAs",String(Object.keys(this.selectedLoras).length||e.length),r)}renderVaeSection(e){const t=e.length?s`
          <div class="rows">
            <button class="row-pick ${this.vae===""?"on":""}" @click=${()=>this.vae=""}>
              Model default
            </button>
            ${e.map(i=>s`<button
                class="row-pick ${this.vae===i.key?"on":""}"
                @click=${()=>this.vae=this.vae===i.key?"":i.key}
              >
                ${i.name}
                ${i.base?s`<span class="row-sub">${i.base}</span>`:l}
              </button>`)}
          </div>
        `:s`<div class="sec-note">The generator lists no standalone VAEs; the model's own is used.</div>`;return this.section("vaes","VAEs",this.vae?"1 picked":"default",t)}renderSettingsSection(e,t){var a,o;const i=s`
      <div class="settings">
        <div class="full">
          <label class="field">Scheduler</label>
          <select
            class="num"
            .value=${this.scheduler}
            @change=${r=>this.scheduler=r.target.value}
          >
            ${Kn.map(r=>s`<option value=${r.id} ?selected=${r.id===this.scheduler}>${r.label}</option>`)}
          </select>
        </div>
        <div>
          <label class="field">Steps</label>
          <input class="num" type="number" min="1" max="80" .value=${String(this.steps)}
            @input=${r=>this.steps=Se(r.target.value,1,80,25)} />
        </div>
        <div>
          <label class="field">CFG scale</label>
          <input class="num" type="number" min="1" max="30" step="0.5" .value=${String(this.cfg)}
            @input=${r=>this.cfg=Ct(r.target.value,1,30,7)} />
        </div>
        ${e?s`
          <div>
            <label class="field">CFG rescale</label>
            <input class="num" type="number" min="0" max="0.99" step="0.05" .value=${String(this.cfgRescale)}
              @input=${r=>this.cfgRescale=Ct(r.target.value,0,.99,0)} />
          </div>
          <div>
            <label class="field">CLIP skip</label>
            <input class="num" type="number" min="0" max="12" .value=${String(this.clipSkip)}
              @input=${r=>this.clipSkip=Se(r.target.value,0,12,0)} />
          </div>
        `:l}
        <div>
          <label class="field">Count</label>
          <input class="num" type="number" min="1" max="8" .value=${String(this.count)}
            @input=${r=>this.count=Se(r.target.value,1,8,1)} />
        </div>
        <div>
          <label class="field">Seed (-1 random)</label>
          <input class="num" type="number" .value=${String(this.seed)}
            @input=${r=>this.seed=Se(r.target.value,-1,2147483648,-1)} />
        </div>
        ${e?s`
          <!-- Which gallery a generation lands in is no longer a second setting here:
               it follows whichever gallery the Invoke gallery panel has open, so the
               place you're looking at is the place new images appear. -->
          <div class="full" style="font-size:12px; color:var(--oppai-text-muted);">
            Generations are added to <b>${((a=t.find(r=>r.id===this.board))==null?void 0:a.name)??"the open gallery"}</b> —
            switch galleries in the Invoke gallery panel.
          </div>
          <label class="switch-row"><input type="checkbox" .checked=${this.cpuNoise}
            @change=${r=>this.cpuNoise=r.target.checked} /> CPU noise</label>
          <label class="switch-row"><input type="checkbox" .checked=${this.seamlessX}
            @change=${r=>this.seamlessX=r.target.checked} /> Seamless X</label>
          <label class="switch-row"><input type="checkbox" .checked=${this.seamlessY}
            @change=${r=>this.seamlessY=r.target.checked} /> Seamless Y</label>
        `:l}
        ${(o=this.status)!=null&&o.detailerAvailable?s`
          <label class="switch-row full"><input type="checkbox" .checked=${this.detailerEnabled}
            @change=${r=>this.detailerEnabled=r.target.checked} />
            ADetailer face/hand pass</label>
          ${this.detailerEnabled?s`
            <div class="full">
              <label class="field">ADetailer detector</label>
              <select class="num" .value=${this.detailerModel}
                @change=${r=>this.detailerModel=r.target.value}>
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
                @input=${r=>this.detailerPrompt=r.target.value} />
            </div>
            <div class="full">
              <label class="field">Detail negative prompt</label>
              <input class="num" .value=${this.detailerNegative}
                @input=${r=>this.detailerNegative=r.target.value} />
            </div>
            <div>
              <label class="field">Confidence</label>
              <input class="num" type="number" min="0.05" max="1" step="0.05" .value=${String(this.detailerConfidence)}
                @input=${r=>this.detailerConfidence=Ct(r.target.value,.05,1,.3)} />
            </div>
            <div>
              <label class="field">Denoise</label>
              <input class="num" type="number" min="0.05" max="1" step="0.05" .value=${String(this.detailerDenoise)}
                @input=${r=>this.detailerDenoise=Ct(r.target.value,.05,1,.4)} />
            </div>
            <div>
              <label class="field">Mask blur</label>
              <input class="num" type="number" min="0" max="64" .value=${String(this.detailerMaskBlur)}
                @input=${r=>this.detailerMaskBlur=Se(r.target.value,0,64,4)} />
            </div>
          `:l}
        `:l}
      </div>
    `;return this.section("settings","Model settings",`${this.steps} steps`,i)}renderTemplateSection(e){const t=e.filter(n=>n.builtIn).length,i=this.showBuiltInTemplates?e:e.filter(n=>!n.builtIn),a=i.length?s`
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
          ${e.length?"No templates you created. Built-in presets are hidden — turn them on below.":"No templates on the generator. In InvokeAI they're called style presets; add some there and reload."}
        </div>`,o=s`
      ${a}
      ${t?s`<button
            class="link-toggle"
            @click=${()=>this.showBuiltInTemplates=!this.showBuiltInTemplates}
          >
            ${this.showBuiltInTemplates?"Hide built-in presets":`Show built-in presets (${t})`}
          </button>`:l}
    `,r=e.find(n=>n.id===this.templateId);return this.section("templates","Invoke templates",r?r.name:"none",o)}renderCharacterSection(){const e=s`
      ${this.characters.length?s`<div class="cards">
            ${this.characters.map(i=>{const a=this.selectedChars.includes(i.id),o=`${u.characterThumbURL(i.id)}?v=${this.thumbVersion}`;return s`
                <div class="card-wrap">
                  <button class="card ${a?"on":""}" title=${i.prompt} @click=${()=>this.toggleCharacter(i.id)}>
                    ${i.hasThumb?this.renderArt(o,i.name,"person"):s`<div class="card-blank">
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
    `,t=this.selectedChars.length;return this.section("characters","Characters",t?`${t} picked`:String(this.characters.length),e)}renderCharEditor(e){var i;const t=e.imageData??(e.id&&((i=this.characters.find(a=>a.id===e.id))!=null&&i.hasThumb)?`${u.characterThumbURL(e.id)}?v=${this.thumbVersion}`:void 0);return s`
      <div class="overlay" @click=${a=>{a.target===a.currentTarget&&(this.charDraft=null)}}>
        <div class="dialog">
          <h3>${e.id?"Edit character":"New character"}</h3>
          <div>
            <label class="field">Name</label>
            <input type="text" .value=${e.name} placeholder="Rin"
              @input=${a=>this.charDraft={...e,name:a.target.value}} />
          </div>
          <div>
            <label class="field">Prompt fragment</label>
            <textarea .value=${e.prompt} placeholder="1girl, red hair, green eyes, …"
              @input=${a=>this.charDraft={...e,prompt:a.target.value}}></textarea>
          </div>
          <div>
            <label class="field">Negative fragment (optional)</label>
            <textarea .value=${e.negativePrompt} placeholder="blonde, …"
              @input=${a=>this.charDraft={...e,negativePrompt:a.target.value}}></textarea>
          </div>
          <div class="dialog-thumb">
            ${t?s`<img src=${t} alt="Thumbnail" />`:s`<div class="card-blank" style="width:72px; height:96px; aspect-ratio:auto; border-radius:10px;">
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
            ${e.id?s`<button class="btn danger" ?disabled=${this.charBusy} @click=${()=>this.deleteCharacter()}>
                  Delete
                </button>`:l}
            <button class="btn" @click=${()=>this.charDraft=null}>Cancel</button>
            <button class="btn primary" ?disabled=${!e.name.trim()||this.charBusy} @click=${()=>this.saveCharacter()}>
              Save
            </button>
          </div>
        </div>
      </div>
    `}renderPrompt(){var t;const e=[...new Set((((t=this.status)==null?void 0:t.loras)??[]).filter(i=>i.name in this.selectedLoras).flatMap(i=>i.triggerPhrases??[]))];return s`
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
          ${e.length?s`
            <div class="sec-note" style="margin-top:8px;">LoRA trigger phrases</div>
            <div class="chips">
              ${e.map(i=>s`<button
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
    `}async updateTagSuggestions(){var t;const e=((t=this.prompt.split(",").at(-1))==null?void 0:t.trim())??"";if(e.length<2){this.tagSuggestions=[],this.tagCorrection="";return}try{const i=await u.booruTags(e);this.tagSuggestions=i.suggestions,this.tagCorrection=i.correction??""}catch{this.tagSuggestions=[],this.tagCorrection=""}}applySuggestedTag(e){const t=this.prompt.split(",");t[t.length-1]=` ${e}`,this.prompt=t.join(",").trimStart()+", ",this.tagSuggestions=[],this.tagCorrection=""}renderPromptOptions(){return s`
      <div>
        <label class="field">Negative prompt</label>
        <textarea
          .value=${this.negative}
          placeholder="lowres, bad anatomy, …"
          @input=${e=>this.negative=e.target.value}
        ></textarea>
      </div>
      <div>
        <label class="field">Resolution</label>
        <div class="chips">
          ${Yn.map(e=>{const t=e.w===this.width&&e.h===this.height;return s`<button
              class="chip ${t?"on":""}"
              @click=${()=>{this.width=e.w,this.height=e.h}}
            >${e.label}<span class="hint">${e.hint}</span></button>`})}
        </div>
      </div>
      <div class="custom-size">
        <div>
          <label class="field">Width</label>
          <input class="num" type="number" min="64" max="2048" step="8" .value=${String(this.width)}
            @input=${e=>this.width=Se(e.target.value,64,2048,512)} />
        </div>
        <span class="material-symbols-rounded" style="margin-top:22px; color:var(--oppai-text-muted);">close</span>
        <div>
          <label class="field">Height</label>
          <input class="num" type="number" min="64" max="2048" step="8" .value=${String(this.height)}
            @input=${e=>this.height=Se(e.target.value,64,2048,768)} />
        </div>
      </div>
    `}renderResults(){return this.shots.length?s`
      <div class="section-label">Latest creation</div>
      <div class="results">
        ${this.shots.map(e=>{var t;return s`
            <div class="shot">
              <img
                src=${u.genPreviewURL(e.id)}
                alt="Generated image"
                loading="lazy"
                style="cursor: zoom-in;"
                title="Expand"
                @click=${()=>this.expandedShot=e}
              />
              <div class="shot-actions">
                <button class="act primary" ?disabled=${e.saved} @click=${()=>this.save(e)}>
                  <span class="material-symbols-rounded" style="font-size:16px;"
                    >${e.saved?"check":"save"}</span
                  >
                  ${e.saved?"Saved":"Save"}
                </button>
                ${((t=this.status)==null?void 0:t.backend)==="invokeai"?s`<button class="act"
                  title="Set as this model's preview in InvokeAI" @click=${()=>this.useAsModelThumb(e)}>
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
    `:l}};x.styles=[ye,ce,$`
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
    `];w([c()],x.prototype,"status",2);w([c()],x.prototype,"checkpoint",2);w([c()],x.prototype,"vae",2);w([c()],x.prototype,"templateId",2);w([c()],x.prototype,"showBuiltInTemplates",2);w([c()],x.prototype,"selectedLoras",2);w([c()],x.prototype,"selectedTriggers",2);w([c()],x.prototype,"loraPage",2);w([c()],x.prototype,"characters",2);w([c()],x.prototype,"selectedChars",2);w([c()],x.prototype,"charDraft",2);w([c()],x.prototype,"charBusy",2);w([c()],x.prototype,"scanBusy",2);w([c()],x.prototype,"open",2);w([c()],x.prototype,"speech",2);w([c()],x.prototype,"listening",2);w([c()],x.prototype,"optimizing",2);w([c()],x.prototype,"prompt",2);w([c()],x.prototype,"tagSuggestions",2);w([c()],x.prototype,"tagCorrection",2);w([c()],x.prototype,"negative",2);w([c()],x.prototype,"showOptions",2);w([c()],x.prototype,"width",2);w([c()],x.prototype,"height",2);w([c()],x.prototype,"steps",2);w([c()],x.prototype,"cfg",2);w([c()],x.prototype,"cfgRescale",2);w([c()],x.prototype,"clipSkip",2);w([c()],x.prototype,"seamlessX",2);w([c()],x.prototype,"seamlessY",2);w([c()],x.prototype,"vaePrecision",2);w([c()],x.prototype,"cpuNoise",2);w([c()],x.prototype,"board",2);w([c()],x.prototype,"scheduler",2);w([c()],x.prototype,"count",2);w([c()],x.prototype,"seed",2);w([c()],x.prototype,"detailerEnabled",2);w([c()],x.prototype,"detailerModel",2);w([c()],x.prototype,"detailerPrompt",2);w([c()],x.prototype,"detailerNegative",2);w([c()],x.prototype,"detailerConfidence",2);w([c()],x.prototype,"detailerDenoise",2);w([c()],x.prototype,"detailerMaskBlur",2);w([c()],x.prototype,"generating",2);w([c()],x.prototype,"shots",2);w([c()],x.prototype,"error",2);w([c()],x.prototype,"toast",2);w([c()],x.prototype,"thumbVersion",2);w([c()],x.prototype,"failedThumbs",2);w([c()],x.prototype,"expandedShot",2);w([c()],x.prototype,"metaDraft",2);w([c()],x.prototype,"metaBusy",2);w([c()],x.prototype,"metaTriggerText",2);w([c()],x.prototype,"civitaiOpen",2);w([S("oppai-invoke-gallery")],x.prototype,"galleryPanel",2);x=w([I("oppai-imagegen")],x);function Se(e,t,i,a){const o=Number(e);return Number.isFinite(o)?Math.min(i,Math.max(t,Math.round(o))):a}function Ct(e,t,i,a){const o=Number(e);return Number.isFinite(o)?Math.min(i,Math.max(t,o)):a}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Vn=jt(class extends Ht{constructor(){super(...arguments),this.key=l}render(e,t){return this.key=e,t}update(e,[t,i]){return t!==this.key&&(Ka(e),this.key=t),i}});var Jn=Object.defineProperty,Xn=Object.getOwnPropertyDescriptor,A=(e,t,i,a)=>{for(var o=a>1?void 0:a?Xn(t,i):t,r=e.length-1,n;r>=0;r--)(n=e[r])&&(o=(a?n(t,i,o):n(o))||o);return a&&o&&Jn(t,i,o),o};const Me=[{id:"sweet",label:"sweet",emotion:"happy",topic:"Soft, warm, and unhurried."},{id:"playful",label:"playful",emotion:"mischievous",topic:"Teasing and quick on their feet."},{id:"bold",label:"bold",emotion:"surprised",topic:"Blunt, uninhibited, and direct."},{id:"roleplay",label:"roleplay",emotion:"thinking",topic:"In character, in scene, in detail."}],si=[{id:"character",label:"Character card",icon:"badge",group:"Friend"},{id:"images",label:"Images",icon:"image",group:"Friend"},{id:"model",label:"Model & generation",icon:"memory",group:"Chat"},{id:"profile",label:"Your profile",icon:"person",group:"Chat"}],Zn=14e3,It=8,Aa="oppai_chat_autopilot",Ea=e=>`avatar:${e}`,ue=()=>crypto.randomUUID().replaceAll("-",""),ni=e=>new Date(e).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"}),li=()=>({temperature:.8,top_p:.95,repetition_penalty:1.1,max_tokens:400});function Qn(){return{profile:{displayName:"",persona:""},characters:[],conversations:[],images:[]}}function La(e,t,i){const a=e==null?void 0:e[t];return typeof a=="number"&&Number.isFinite(a)?a:i}function Lo(e,t){const i=e.data&&typeof e.data=="object"?e.data:e,a=(o,r="")=>typeof i[o]=="string"?i[o]:r;return{id:ue(),name:a("name",t),description:a("description"),personality:a("personality"),scenario:a("scenario"),firstMessage:a("first_mes",a("firstMessage")),exampleDialogue:a("mes_example",a("exampleDialogue")),systemPrompt:a("system_prompt",a("systemPrompt")),creatorNotes:a("creator_notes",a("creatorNotes")),promptWeight:1,defaultMode:"roleplay"}}async function el(e){if(!e.name.toLowerCase().endsWith(".png"))return null;const t=new Uint8Array(await e.arrayBuffer()),i=new DataView(t.buffer);let a=8;for(;a+12<=t.length;){const o=i.getUint32(a),r=new TextDecoder().decode(t.subarray(a+4,a+8));if(a+12+o>t.length)break;if(r==="tEXt"){const n=new TextDecoder().decode(t.subarray(a+8,a+8+o)),d=n.indexOf("\0");if(d>0&&n.slice(0,d)==="chara"){const p=new TextDecoder().decode(Uint8Array.from(atob(n.slice(d+1)),f=>f.charCodeAt(0)));return Lo(JSON.parse(p),e.name.replace(/\.png$/i,""))}}a+=o+12}return null}function Pa(e){const t=/(\*\*[^*\n]+\*\*|\*[^*\n]+\*|~~[^~\n]+~~|`[^`\n]+`|"[^"\n]+")/g,i=e.split(t);return s`${i.map(a=>a.startsWith("**")&&a.endsWith("**")?s`<strong class="action">${a.slice(2,-2)}</strong>`:a.startsWith("*")&&a.endsWith("*")?s`<em>${a.slice(1,-1)}</em>`:a.startsWith("~~")&&a.endsWith("~~")?s`<s>${a.slice(2,-2)}</s>`:a.startsWith("`")&&a.endsWith("`")?s`<code>${a.slice(1,-1)}</code>`:a.startsWith('"')&&a.endsWith('"')?s`<span class="speech">${a}</span>`:a)}`}let T=class extends _{constructor(){super(...arguments),this.status=null,this.workspace=Qn(),this.characterID="libby",this.conversationID="",this.draft="",this.busy=!1,this.loading=!0,this.settingsOpen=!1,this.editorTab="character",this.notice="",this.noticeError=!1,this.imageTags="",this.models=null,this.modelChoice="",this.modelBusy=!1,this.mobileNavOpen=!1,this.autopilot=localStorage.getItem(Aa)==="1",this.autoPaused=!1,this.autoTurns=0,this.stageOpen=!0,this.pendingPhoto=null,this.callOpen=!1,this.callSeconds=0,this.callTimer=0,this.autoTimer=0,this.saveTimer=0,this.editSeq=0,this.idleTimer=0,this.noticeTimer=0,this.onShared=()=>{this.claimShare()},this.onGlobalKey=e=>{e.key==="Escape"&&this.callOpen&&(e.stopPropagation(),this.endCall())},this.armIdle=()=>{var e;window.clearTimeout(this.idleTimer),!(this.characterID!=="libby"||(e=this.status)!=null&&e.enabled)&&(this.idleTimer=window.setTimeout(()=>{if(this.busy||document.visibilityState!=="visible")return this.armIdle();const t=this.activeConversation;if(!t)return;const i=Q("idle",{intensity:t.intensity});t.emotion=i.emotion,t.messages.push({id:ue(),role:"assistant",content:i.message,at:Date.now()}),t.updatedAt=Date.now(),this.touchWorkspace(),this.scrollToEnd(),this.armIdle()},6e4))},this.chatMenu=e=>{if(Hi(e))return;e.preventDefault();const t=this.activeCharacter,i=this.activeConversation,o=e.composedPath().find(d=>{var p,f;return(f=(p=d==null?void 0:d.classList)==null?void 0:p.contains)==null?void 0:f.call(p,"convo-wrap")}),r=o==null?void 0:o.dataset.id,n=r?[{label:"Open",icon:"forum",run:()=>this.activateConversation(r)},{label:"New conversation",icon:"add_comment",run:()=>this.newConversation()},me,{label:"Delete conversation",icon:"delete",danger:!0,run:()=>this.deleteConversation(r)}]:[{label:"Re-respond",icon:"refresh",disabled:this.busy||!(i!=null&&i.messages.some(d=>d.role==="assistant")),run:()=>void this.regenerate()},{label:this.callOpen?"End video call":"Video call",icon:this.callOpen?"call_end":"videocam",run:()=>this.callOpen?this.endCall():this.startCall()},{label:"Share a photo",icon:"add_photo_alternate",disabled:this.busy,run:()=>this.pickPhoto()},{label:this.autopilot?"Turn off autopilot":"Let the AI continue on its own",icon:"smart_toy",run:()=>this.toggleAutopilot()},{label:this.stageOpen?"Hide portrait":"Show portrait",icon:"wallpaper",run:()=>this.stageOpen=!this.stageOpen},me,{label:"New conversation",icon:"add_comment",run:()=>this.newConversation()},{label:"Chat settings",icon:"tune",run:()=>{this.settingsOpen=!0,this.editorTab="character"}},{label:"Refresh model status",icon:"sync",run:()=>void this.refreshModels()},me,{label:"Clear messages",icon:"delete_sweep",danger:!0,run:()=>this.clearConversation()}];Nt({x:e.clientX,y:e.clientY,title:t==null?void 0:t.name,items:n})}}connectedCallback(){super.connectedCallback(),this.load().then(()=>void this.claimShare()),window.addEventListener("keydown",this.onGlobalKey),window.addEventListener(ji,this.onShared)}disconnectedCallback(){var e;super.disconnectedCallback(),window.clearTimeout(this.saveTimer),window.clearTimeout(this.idleTimer),window.clearTimeout(this.noticeTimer),window.clearTimeout(this.autoTimer),window.clearInterval(this.callTimer),window.removeEventListener("keydown",this.onGlobalKey),window.removeEventListener(ji,this.onShared),(e=this.resize)==null||e.disconnect()}async claimShare(){const e=fn();if(!e)return;const t=this.workspace.characters.find(i=>i.id===e.characterId);if(!t){this.say("That character no longer exists.",!0);return}this.characterID!==t.id&&this.activateCharacter(t.id);try{this.say(`Scanning ${e.name} locally…`);const i=await u.uploadChatImage({characterId:t.id,name:e.name,imageData:e.imageData,tags:[]});this.workspace.images.push(i),this.pendingPhoto={imageId:i.id,tags:i.tags??[],name:i.name},this.touchWorkspace(),this.say(`Ready to show ${t.name} — add a message and send.`),this.focusComposer()}catch(i){this.say(i.message,!0)}}firstUpdated(){this.resize=new ResizeObserver(()=>void this.scrollToEnd(!1)),this.log&&this.resize.observe(this.log),this.focusComposer()}focusComposer(){this.settingsOpen||this.updateComplete.then(()=>{const e=this.callOpen?this.renderRoot.querySelector(".call-input"):this.composer;!e||e.disabled||(e.focus({preventScroll:!0}),e.setSelectionRange(e.value.length,e.value.length))})}updated(e){e.has("busy")&&!this.busy&&this.focusComposer(),(e.has("conversationID")||e.has("characterID"))&&this.focusComposer(),e.has("settingsOpen")&&!this.settingsOpen&&this.focusComposer(),e.has("callOpen")&&this.focusComposer()}get activeCharacter(){return this.workspace.characters.find(e=>e.id===this.characterID)??this.workspace.characters[0]}get activeConversation(){return this.workspace.conversations.find(e=>e.id===this.conversationID)}conversationsFor(e=this.characterID){return this.workspace.conversations.filter(t=>t.characterId===e).sort((t,i)=>i.updatedAt-t.updatedAt)}async load(){var e;try{const[t,i]=await Promise.all([u.chatStatus(),u.chatWorkspace()]);this.status=t,this.workspace=i,this.characterID=((e=i.characters[0])==null?void 0:e.id)??"libby";const a=this.conversationsFor(this.characterID)[0];a?this.activateConversation(a.id):this.newConversation(!1),t.modelBackend&&this.refreshModels(!0)}catch(t){this.say(t.message,!0)}finally{this.loading=!1}}say(e,t=!1){this.notice=e,this.noticeError=t,window.clearTimeout(this.noticeTimer),this.noticeTimer=window.setTimeout(()=>this.notice="",4200)}async refreshModels(e=!1){try{const[t,i]=await Promise.all([u.chatModels(),u.chatStatus()]);this.models=t,this.status=i,e||this.say(i.enabled?`Connected to ${i.model||"the loaded model"}.`:i.message||"No model is loaded.",!i.enabled)}catch(t){e||this.say(t.message,!0)}}touchWorkspace(){this.workspace={...this.workspace,characters:[...this.workspace.characters],conversations:[...this.workspace.conversations],images:[...this.workspace.images]},this.editSeq++,window.clearTimeout(this.saveTimer),this.saveTimer=window.setTimeout(()=>void this.saveWorkspace(),450)}async saveWorkspace(){window.clearTimeout(this.saveTimer);const e=this.editSeq;try{const t=await u.saveChatWorkspace(this.workspace);e===this.editSeq&&(this.workspace=t)}catch(t){this.say(`Couldn't save chat: ${t.message}`,!0)}}liveConversation(e){return this.workspace.conversations.find(t=>t.id===e)}liveCharacter(e){return this.workspace.characters.find(t=>t.id===e)}async scrollToEnd(e=!0){await this.updateComplete,requestAnimationFrame(()=>{this.log&&this.log.scrollTo({top:this.log.scrollHeight,behavior:e?"smooth":"auto"})})}activateCharacter(e){this.characterID=e,this.mobileNavOpen=!1;const t=this.conversationsFor(e)[0];t?this.activateConversation(t.id):this.newConversation()}activateConversation(e){const t=this.workspace.conversations.find(i=>i.id===e);t&&(this.conversationID=e,this.characterID=t.characterId,this.mobileNavOpen=!1,this.autoTurns=It,$t(t.intensity),this.armIdle(),this.scheduleAuto(),this.scrollToEnd(!1))}newConversation(e=!0){var n,d;const t=this.activeCharacter;if(!t)return;const i=Date.now();let a=((n=t.firstMessage)==null?void 0:n.trim())??"",o=ne((d=Me.find(p=>p.id===t.defaultMode))==null?void 0:d.emotion);if(t.id==="libby"&&!a){const p=dn(t.defaultMode,Ee());a=p.message,o=p.emotion}const r={id:ue(),characterId:t.id,title:"New conversation",mode:t.defaultMode||"sweet",emotion:o,intensity:t.id==="libby"?Ee():1,progress:t.id==="libby"?Ee():1,options:{...this.workspace.defaults??li()},messages:a?[{id:ue(),role:"assistant",content:a,at:i}]:[],createdAt:i,updatedAt:i};this.workspace.conversations.push(r),this.conversationID=r.id,this.mobileNavOpen=!1,this.touchWorkspace(),e&&this.say(`Started a new chat with ${t.name}.`),this.armIdle(),this.scrollToEnd(!1)}clearConversation(){const e=this.activeConversation;!e||!confirm("Clear every message in this conversation?")||(e.messages=[],e.title="New conversation",e.updatedAt=Date.now(),this.touchWorkspace(),this.say("Conversation cleared."))}deleteConversation(e){if(!confirm("Delete this conversation?"))return;this.workspace.conversations=this.workspace.conversations.filter(i=>i.id!==e);const t=this.conversationsFor()[0];t?this.conversationID=t.id:this.newConversation(!1),this.touchWorkspace()}updateConversation(e){const t=this.activeConversation;t&&(Object.assign(t,e,{updatedAt:Date.now()}),e.intensity!=null&&(t.progress=e.intensity,$t(e.intensity)),this.touchWorkspace())}updateOption(e,t){const i=this.activeConversation;i&&(i.options={...i.options??{},[e]:t},i.updatedAt=Date.now(),this.touchWorkspace())}onKey(e){e.key==="Enter"&&!e.shiftKey&&(e.preventDefault(),this.send())}async send(){const e=this.pendingPhoto,t=this.activeConversation,i=this.draft.trim()||(e?"*shares a photo with you*":"");if(!i||!t||this.busy)return;const a=t.id,o={id:ue(),role:"user",content:i,at:Date.now(),imageId:e==null?void 0:e.imageId};t.messages.push(o),t.updatedAt=Date.now(),t.title==="New conversation"&&(t.title=i.slice(0,42)),this.draft="",this.pendingPhoto=null,this.notice="",this.touchWorkspace(),this.armIdle(),this.scrollToEnd(),this.autoTurns=It,await this.generateReply(a,i,!1,(e==null?void 0:e.tags)??[],(e==null?void 0:e.imageId)??""),this.scheduleAuto()}async attachPhoto(e){var o,r;const t=e.target,i=(o=t.files)==null?void 0:o[0],a=this.activeCharacter;if(!(!i||!a))try{this.say("Scanning photo locally…");const n=await u.uploadChatImage({characterId:a.id,name:i.name,imageData:await this.readDataURL(i),tags:[]});this.workspace.images.push(n),this.pendingPhoto={imageId:n.id,tags:n.tags??[],name:n.name},this.touchWorkspace(),this.say((r=n.tags)!=null&&r.length?`Photo ready: ${n.tags.slice(0,6).join(", ")}.`:"Photo ready to send."),this.focusComposer()}catch(n){this.say(n.message,!0)}finally{t.value=""}}pickPhoto(){var e;(e=this.renderRoot.querySelector(".attach-btn input"))==null||e.click()}async discardPhoto(){const e=this.pendingPhoto;if(e){this.pendingPhoto=null,this.workspace.images=this.workspace.images.filter(t=>t.id!==e.imageId),this.touchWorkspace(),this.focusComposer();try{await u.deleteChatImage(e.imageId)}catch{}}}async generateReply(e,t,i=!1,a=[],o=""){var d,p,f,g,m,y,C,W,se;const r=this.liveConversation(e),n=r&&this.liveCharacter(r.characterId);if(!r||!n||this.busy)return!1;if(this.busy=!0,!((d=this.status)!=null&&d.enabled)&&((p=this.status)!=null&&p.configured||(f=this.status)!=null&&f.modelBackend))try{this.status=await u.chatStatus()}catch{}if(!((g=this.status)!=null&&g.enabled)){if(n.id!=="libby")return this.busy=!1,this.say(((m=this.status)==null?void 0:m.message)||"Load a model in text-generation-webui, then refresh backend status.",!0),!1;const j=Mt(r.progress??r.intensity,i?0:wo(t,r.mode)),B=i?Q("idle",{intensity:j.intensity}):ln(t,r.mode,ne(r.emotion),j.intensity,!1);await new Promise(je=>setTimeout(je,350+Math.random()*450));const L=this.liveConversation(e);return L?(L.emotion=B.emotion,L.progress=j.progress,L.intensity=$t(j.intensity),L.messages.push({id:ue(),role:"assistant",content:B.message,at:Date.now()}),L.updatedAt=Date.now(),this.busy=!1,this.touchWorkspace(),this.scrollToEnd(),!0):(this.busy=!1,!1)}try{const j=r.messages.map(({role:Do,content:Oo})=>({role:Do,content:Oo}));i&&j.push({role:"user",content:"(Continue the scene on your own. Speak or act again without waiting for a reply, and do not answer for me.)"});const B=await u.chat(r.mode,j,r.emotion,r.intensity,r.options,n.id,a,o),L=this.liveConversation(e);if(!L)return!1;L.emotion=ne(B.emotion??L.emotion);const je=re(B.intensity??L.intensity),He=Mt(L.progress??L.intensity,je-L.intensity);return L.progress=He.progress,L.intensity=$t(He.intensity),L.messages.push({id:ue(),role:"assistant",content:B.message,at:Date.now(),imageId:B.imageId||void 0}),L.updatedAt=Date.now(),this.touchWorkspace(),this.scrollToEnd(),!0}catch(j){if((y=this.status)!=null&&y.configured||(C=this.status)!=null&&C.modelBackend)try{this.status=await u.chatStatus()}catch{}return this.say(!((W=this.status)!=null&&W.enabled)&&((se=this.status)!=null&&se.message)?this.status.message:j.message,!0),!1}finally{this.busy=!1}}async regenerate(){const e=this.activeConversation;if(!e||this.busy)return;const t=e.messages;let i=t.length;for(;i>0&&t[i-1].role==="assistant";)i--;if(i===t.length){this.say("There is no reply to redo yet.",!0);return}const a=e.id,o=i>0?t[i-1].content:"";e.messages=t.slice(0,i),e.updatedAt=Date.now(),this.touchWorkspace(),this.scrollToEnd(),await this.generateReply(a,o,i===0)}toggleAutopilot(){var e;this.autopilot=!this.autopilot,this.autoPaused=!1,this.autoTurns=It;try{localStorage.setItem(Aa,this.autopilot?"1":"0")}catch{}this.autopilot&&!((e=this.status)!=null&&e.enabled)&&this.say("Autopilot needs a connected model — it stays off until one is loaded.",!0),this.scheduleAuto()}pauseAutopilot(e){this.autoPaused=e,e?window.clearTimeout(this.autoTimer):(this.autoTurns=Math.max(this.autoTurns,1),this.scheduleAuto())}refillAutopilot(){this.autoTurns=It,this.pauseAutopilot(!1)}get autoRunning(){var e;return this.autopilot&&!this.autoPaused&&!!((e=this.status)!=null&&e.enabled)&&this.autoTurns>0}scheduleAuto(){window.clearTimeout(this.autoTimer),this.autoRunning&&(this.autoTimer=window.setTimeout(()=>void this.autoTick(),Zn))}async autoTick(){if(this.busy||document.visibilityState!=="visible"){this.scheduleAuto();return}const e=this.activeConversation;if(!e||!this.autoRunning)return;this.autoTurns--,await this.generateReply(e.id,"",!0)?this.scheduleAuto():this.autoPaused=!0}editMessage(e){var a;const t=(a=prompt("Edit message",e.content))==null?void 0:a.trim();if(!t||t===e.content)return;e.content=t;const i=this.activeConversation;i&&(i.updatedAt=Date.now()),this.touchWorkspace()}deleteMessage(e){const t=this.activeConversation;t&&(t.messages=t.messages.filter(i=>i.id!==e),t.updatedAt=Date.now(),this.touchWorkspace())}updateCharacter(e,t){const i=this.activeCharacter;i&&(i[e]=t,this.touchWorkspace())}addCharacter(){const e={id:ue(),name:"New friend",promptWeight:1,defaultMode:"sweet",firstMessage:"Hey! It's nice to meet you."};this.workspace.characters.push(e),this.characterID=e.id,this.touchWorkspace(),this.newConversation(!1),this.settingsOpen=!0,this.editorTab="character"}deleteCharacter(){var i;const e=this.activeCharacter;if(!e||e.builtIn||!confirm(`Remove ${e.name} and all of their conversations?`))return;this.workspace.characters=this.workspace.characters.filter(a=>a.id!==e.id),this.workspace.conversations=this.workspace.conversations.filter(a=>a.characterId!==e.id),this.characterID=((i=this.workspace.characters[0])==null?void 0:i.id)??"libby";const t=this.conversationsFor()[0];t?this.conversationID=t.id:this.newConversation(!1),this.touchWorkspace()}async importCard(e){var i;const t=(i=e.target.files)==null?void 0:i[0];if(t)try{if(t.type.startsWith("image/")){const o=await el(t)??{id:ue(),name:t.name.replace(/\.[^.]+$/,"")||"New friend",promptWeight:1,defaultMode:"sweet"};this.workspace.characters.push(o),this.characterID=o.id,await this.saveWorkspace();const r=await u.uploadChatImage({characterId:o.id,name:`${o.name} avatar`,imageData:await this.readDataURL(t),tags:["portrait"]});this.workspace.images.push(r);const n=this.liveCharacter(o.id);n&&(n.avatarImageId=r.id),this.touchWorkspace(),this.newConversation(!1),this.say("Friend added and image scanned.");return}const a=Lo(JSON.parse(await t.text()),t.name.replace(/\.json$/i,""));this.workspace.characters.push(a),this.characterID=a.id,this.touchWorkspace(),this.newConversation(!1),this.say(`${a.name} joined your friends.`)}catch(a){this.say(`Couldn't import card: ${a.message}`,!0)}finally{e.target.value=""}}readDataURL(e){return new Promise((t,i)=>{const a=new FileReader;a.onload=()=>t(String(a.result)),a.onerror=()=>i(a.error),a.readAsDataURL(e)})}async uploadImage(e){var a;const t=(a=e.target.files)==null?void 0:a[0],i=this.activeCharacter;if(!(!t||!i))try{this.say("Scanning image locally…");const o=this.imageTags.split(",").map(d=>d.trim()).filter(Boolean),r=await u.uploadChatImage({characterId:i.id,name:t.name,imageData:await this.readDataURL(t),tags:o});this.workspace.images.push(r);const n=this.liveCharacter(i.id);n&&!n.avatarImageId&&(n.avatarImageId=r.id),this.imageTags="",this.touchWorkspace(),this.say(`Image scanned: ${r.tags.join(", ")||"no content tags found"}.`)}catch(o){this.say(o.message,!0)}finally{e.target.value=""}}async uploadProfilePicture(e){var a;const t=(a=e.target.files)==null?void 0:a[0];if(!t)return;const i=this.workspace.profile.avatarImageId;try{this.say("Uploading profile picture…");const o=await u.uploadChatImage({characterId:Js,name:t.name,imageData:await this.readDataURL(t),tags:[]});this.workspace.images.push(o),this.workspace.profile.avatarImageId=o.id,this.touchWorkspace(),await this.saveWorkspace(),i&&await this.discardProfileImage(i),this.say("Profile picture updated.")}catch(o){this.say(o.message,!0)}finally{e.target.value=""}}async removeProfilePicture(){const e=this.workspace.profile.avatarImageId;e&&(this.workspace.profile.avatarImageId="",this.touchWorkspace(),await this.saveWorkspace(),await this.discardProfileImage(e),this.say("Profile picture removed."))}async uploadCharacterPicture(e){var r;const t=(r=e.target.files)==null?void 0:r[0],i=this.activeCharacter;if(!t||!i)return;const a=i.id,o=i.avatarImageId;try{this.say("Uploading picture…");const n=await u.uploadChatImage({characterId:Ea(a),name:`${i.name} avatar`,imageData:await this.readDataURL(t),tags:[]});this.workspace.images.push(n);const d=this.liveCharacter(a);d&&(d.avatarImageId=n.id),this.touchWorkspace(),await this.saveWorkspace(),o&&this.isAvatarUpload(o,a)&&await this.discardProfileImage(o),this.say("Picture updated.")}catch(n){this.say(n.message,!0)}finally{e.target.value=""}}async removeCharacterPicture(){const e=this.activeCharacter,t=e==null?void 0:e.avatarImageId;if(!e||!t)return;const i=e.id;e.avatarImageId="",this.touchWorkspace(),await this.saveWorkspace(),this.isAvatarUpload(t,i)&&await this.discardProfileImage(t),this.say("Picture removed.")}isAvatarUpload(e,t){var i;return((i=this.workspace.images.find(a=>a.id===e))==null?void 0:i.characterId)===Ea(t)}async discardProfileImage(e){try{await u.deleteChatImage(e),this.workspace.images=this.workspace.images.filter(t=>t.id!==e),this.touchWorkspace()}catch{}}async deleteImage(e){if(confirm(`Delete ${e.name}?`))try{await u.deleteChatImage(e.id),this.workspace.images=this.workspace.images.filter(i=>i.id!==e.id);const t=this.activeCharacter;(t==null?void 0:t.avatarImageId)===e.id&&(t.avatarImageId=""),this.touchWorkspace()}catch(t){this.say(t.message,!0)}}avatar(e,t){if(e.avatarImageId)return s`<span class=${t}><img src=${u.chatImageURL(e.avatarImageId)} alt="" /></span>`;if(e.id==="libby"&&!Ne()){const i=this.activeConversation,a=Ot(ne(i==null?void 0:i.emotion),(i==null?void 0:i.intensity)??1,Dt());return s`<span class=${t}><img src=${a[0]} data-fallback-index="0" alt="Libby" @error=${o=>Je(o.target,a)} /></span>`}return s`<span class="${t} initial">${e.name.slice(0,2).toUpperCase()}</span>`}spriteFor(e,t,i,a=!1){const o=e.id==="libby"?Ot(t,i,Dt()):[],r=e.avatarImageId?[u.chatImageURL(e.avatarImageId)]:[];return a&&o.length?o:[...r,...o]}startCall(){const e=this.activeCharacter;if(e){if(!this.spriteFor(e,"neutral",1,!0).length){this.say(`${e.name} has no picture to show — set one on their character card first.`,!0);return}this.callOpen=!0,this.callSeconds=0,this.settingsOpen=!1,window.clearInterval(this.callTimer),this.callTimer=window.setInterval(()=>this.callSeconds+=1,1e3),this.focusComposer()}}endCall(){this.callOpen=!1,window.clearInterval(this.callTimer),this.focusComposer()}renderCall(e,t){if(!this.callOpen)return l;const i=ne(t.emotion),a=re(t.intensity),o=this.spriteFor(e,i,a,!0),r=[...t.messages].reverse().find(d=>d.role==="assistant"),n=`${Math.floor(this.callSeconds/60)}:${String(this.callSeconds%60).padStart(2,"0")}`;return s`<div class="call" role="dialog" aria-modal="true" aria-label=${`Video call with ${e.name}`}>
      <div class="call-stage">
        <!-- Keyed on the pose: a mood change replaces the element instead of
             mutating src, so the fade-in replays and the fallback chain restarts
             from the top for the new emotion's art. -->
        ${Vn(`${i}-${a}`,s`<img class="call-sprite" src=${o[0]} data-fallback-index="0"
          alt=${`${e.name} looking ${i}`}
          @error=${d=>Je(d.target,o)} />`)}
        <div class="call-top">
          <span class="call-who"><strong>${e.name}</strong><span>${this.busy?"Speaking…":n}</span></span>
          <span class="call-mood" title=${`Feeling ${i}, intensity ${a} of 5`}>
            <span class="material-symbols-rounded">mood</span>${i}
            <span class="call-pips">${[1,2,3,4,5].map(d=>s`<i class=${d<=a?"on":""}></i>`)}</span>
          </span>
        </div>
        ${r?s`<p class="call-caption">${Pa(r.content)}</p>`:l}
      </div>
      <div class="call-bar">
        <input class="call-input" placeholder=${`Say something to ${e.name}…`} aria-label=${`Message ${e.name}`}
          .value=${this.draft} @input=${d=>this.draft=d.target.value}
          @keydown=${d=>{d.key==="Enter"&&(d.preventDefault(),this.send())}} />
        <button class="call-btn" title="Re-respond" aria-label="Ask for a different reply" ?disabled=${this.busy} @click=${()=>void this.regenerate()}><span class="material-symbols-rounded">refresh</span></button>
        <button class="call-btn end" title="End call" aria-label="End call" @click=${()=>this.endCall()}><span class="material-symbols-rounded">call_end</span></button>
      </div>
    </div>`}renderStage(e,t){var d;if(e.id==="libby"&&Ne())return l;const a=ne(t.emotion),o=re(t.intensity),r=this.spriteFor(e,a,o);if(!r.length)return l;const n=this.busy?"Typing…":this.autoRunning?"Talking on their own":(d=this.status)!=null&&d.enabled?this.status.model:"Local replies";return s`<aside class="stage" aria-label="${e.name} portrait">
      <div class="stage-head"><span class="stage-name">${e.name}</span><span class="stage-status">${n}</span></div>
      <div class="stage-art">
        <img class="sprite" src=${r[0]} data-fallback-index="0" alt=${`${e.name} looking ${a}`}
          @error=${p=>Je(p.target,r)} />
      </div>
      ${e.id==="libby"?s`<div class="stage-meter" title=${`Intensity ${o} of 5`} aria-label=${`Intensity ${o} of 5`}>
        ${[1,2,3,4,5].map(p=>s`<span class="pip ${p<=o?"on":""}"></span>`)}
      </div>`:l}
    </aside>`}renderAutopilotBar(e){var a,o,r;if(!this.autopilot)return l;const t=this.autoTurns<=0,i=(a=this.status)!=null&&a.enabled?this.autoPaused?"Autopilot paused.":t?`${e.name} is waiting for you to say something.`:`${e.name} keeps the conversation going · ${this.autoTurns} turn${this.autoTurns===1?"":"s"} left`:"Autopilot is waiting for a model.";return s`<div class="autobar ${this.autoPaused||t||!((o=this.status)!=null&&o.enabled)?"idle":""}" role="status">
      <span class="material-symbols-rounded">${this.autoPaused?"pause_circle":"smart_toy"}</span>
      <span class="autobar-copy">${i}</span>
      ${(r=this.status)!=null&&r.enabled?s`<button class="autobar-btn" @click=${()=>t?this.refillAutopilot():this.pauseAutopilot(!this.autoPaused)}>
        ${t?"Continue":this.autoPaused?"Resume":"Pause"}
      </button>`:l}
      <button class="autobar-btn" @click=${()=>this.toggleAutopilot()}>Turn off</button>
    </div>`}renderRail(){return s`<nav class="rail" aria-label="Friends">
      ${this.workspace.characters.map((e,t)=>s`
        ${t===1?s`<span class="rail-sep"></span>`:l}
        <button class="guild ${e.id===this.characterID?"on":""}" title=${e.name} @click=${()=>this.activateCharacter(e.id)}>
          ${this.avatar(e,"member-avatar")}
        </button>`)}
      <button class="guild" title="Add a friend" @click=${this.addCharacter}><span class="material-symbols-rounded">add</span></button>
    </nav>`}renderSidebar(){var i,a,o;const e=this.activeCharacter,t=this.workspace.profile.displayName||((i=this.user)==null?void 0:i.username)||"You";return s`<aside class="side">
      <div class="side-head"><div class="side-title"><strong>${(e==null?void 0:e.name)??"Chat"}</strong><span>Choose a conversation</span></div><button title="Start a new conversation" aria-label="Start a new conversation" @click=${()=>this.newConversation()}><span class="material-symbols-rounded">add_comment</span></button></div>
      <div class="cat"><span>Conversations · ${this.conversationsFor().length}</span><button title="New conversation" @click=${()=>this.newConversation()}>+</button></div>
      <div class="convos">${this.conversationsFor().map(r=>s`
        <div class="convo-wrap ${r.id===this.conversationID?"on":""}" data-id=${r.id}>
          <button class="convo" @click=${()=>this.activateConversation(r.id)} aria-current=${r.id===this.conversationID?"page":"false"}>
            <span class="convo-icon material-symbols-rounded" style="font-size:18px">forum</span><span class="convo-title">${r.title}</span>
            <span class="convo-meta">${r.messages.length} messages · ${ni(r.updatedAt)}</span>
          </button>
          <button class="convo-delete" title="Delete conversation" aria-label="Delete ${r.title}" @click=${()=>this.deleteConversation(r.id)}><span class="material-symbols-rounded" style="font-size:16px">delete</span></button>
        </div>`)}
      </div>
      <div class="side-foot">${this.workspace.profile.avatarImageId?s`<span class="me-avatar"><img src=${u.chatImageURL(this.workspace.profile.avatarImageId)} alt="" /></span>`:s`<span class="me-avatar initial">${t.slice(0,2).toUpperCase()}</span>`}
        <div class="me-copy"><div class="me-name">${t}</div><div class="me-sub"><span class="status-dot ${(a=this.status)!=null&&a.enabled?"online":""}"></span>${(o=this.status)!=null&&o.enabled?`Model: ${this.status.model}`:(e==null?void 0:e.id)==="libby"?"Libby local replies":"Model offline"}</div></div>
        <button class="icon-btn" title="Profile" @click=${()=>{this.settingsOpen=!0,this.editorTab="profile"}}><span class="material-symbols-rounded">manage_accounts</span></button>
      </div>
    </aside>`}renderSettings(){const e=this.activeCharacter,t=this.activeConversation;if(!e||!t)return l;const i=si.find(o=>o.id===this.editorTab)??si[0];let a="";return s`<section class="settings">
      <nav class="settings-nav" aria-label="Chat settings">
        ${si.map(o=>{const r=o.group===a?l:s`<div class="nav-cat">${o.group}</div>`;return a=o.group,s`${r}
            <button class="nav-row ${o.id===this.editorTab?"on":""}" aria-current=${o.id===this.editorTab?"page":"false"} @click=${()=>this.editorTab=o.id}>
              <span class="material-symbols-rounded">${o.icon}</span>
              <span>${o.id==="character"?e.name:o.label}</span>
            </button>`})}
        <div class="nav-sep"></div>
        <button class="nav-row close" @click=${()=>this.settingsOpen=!1}>
          <span class="material-symbols-rounded">arrow_back</span><span>Back to chat</span>
        </button>
      </nav>
      <div class="settings-body">
        <div class="settings-head">
          <strong>${i.id==="character"?e.name:i.label}<span>Changes sync between WebUI and Android</span></strong>
          <button class="icon-btn" title="Close settings" aria-label="Close settings" @click=${()=>this.settingsOpen=!1}><span class="material-symbols-rounded">close</span></button>
        </div>
        ${this.editorTab==="character"?this.renderCharacterPanel(e):l}
        ${this.editorTab==="model"?this.renderModelPanel(t):l}
        ${this.editorTab==="images"?this.renderImagesPanel(e):l}
        ${this.editorTab==="profile"?this.renderProfilePanel():l}
      </div>
    </section>`}field(e,t,i,a=1){return s`<label>${e}${a>1?s`<textarea class="field" rows=${a} .value=${i} @change=${o=>this.updateCharacter(t,o.target.value)}></textarea>`:s`<input class="field" .value=${i} @change=${o=>this.updateCharacter(t,o.target.value)} />`}</label>`}renderCharacterPanel(e){const t=e.id==="libby"&&!Ne();return s`<div class="panel">
      <section class="group">
        <h3>Picture<span>Their face in the friend rail, the header, and every message.</span></h3>
        <div class="pfp-row">
          ${this.avatar(e,"pfp")}
          <div class="pfp-actions">
            <strong>${e.name}</strong>
            <span class="empty">${t?"Libby wears her artwork by default. A picture set here replaces it everywhere.":"Kept apart from this character's images — a face is never offered as a photo to send."}</span>
            <div class="panel-actions">
              <span class="file-btn">${e.avatarImageId?"Replace picture":"Upload picture"}<input type="file" accept="image/png,image/jpeg,image/webp,image/gif" @change=${this.uploadCharacterPicture}/></span>
              ${e.avatarImageId?s`<button class="secondary" @click=${()=>void this.removeCharacterPicture()}>Remove</button>`:l}
            </div>
          </div>
        </div>
      </section>
      <div class="grid">${this.field("Name","name",e.name)}<label>Default mode<select .value=${e.defaultMode} @change=${i=>this.updateCharacter("defaultMode",i.target.value)}>${Me.map(i=>s`<option value=${i.id}>${i.label}</option>`)}</select></label></div>
      ${this.field("Description","description",e.description??"",2)}
      <div class="grid">${this.field("Personality","personality",e.personality??"",3)}${this.field("Scenario","scenario",e.scenario??"",3)}</div>
      ${this.field("First message","firstMessage",e.firstMessage??"",2)}
      ${this.field("System prompt / card instructions","systemPrompt",e.systemPrompt??"",3)}
      ${this.field("Example dialogue","exampleDialogue",e.exampleDialogue??"",3)}
      ${this.field("Creator notes (not sent to model)","creatorNotes",e.creatorNotes??"",2)}
      <label>Character-card weight <span class="range"><input type="range" min="0.1" max="2" step="0.05" .value=${String(e.promptWeight||1)} @input=${i=>this.updateCharacter("promptWeight",Number(i.target.value))}/><output>${(e.promptWeight||1).toFixed(2)}</output></span></label>
      <div class="panel-actions"><button class="primary" @click=${()=>void this.saveWorkspace()}>Save card</button><span class="file-btn">Import SillyTavern card<input type="file" accept="application/json,.json,image/*" @change=${this.importCard}/></span>${e.builtIn?s`<span class="empty">Libby's built-in card is editable.</span>`:s`<button class="danger" @click=${this.deleteCharacter}>Remove friend</button>`}</div>
    </div>`}async loadModel(){var t,i;const e=this.modelChoice||((t=this.models)==null?void 0:t.models[0]);if(!(!e||this.modelBusy)){this.modelBusy=!0,this.say(`Loading ${e}… this can take a few minutes.`);try{await u.loadChatModel(e),await this.refreshModels(!0),this.say(`Loaded ${((i=this.models)==null?void 0:i.loaded)||e}.`)}catch(a){this.say(a.message,!0)}finally{this.modelBusy=!1}}}async unloadModel(){if(!(this.modelBusy||!confirm("Unload the current model? Chat stops working until a model is loaded again."))){this.modelBusy=!0,this.say("Unloading…");try{await u.unloadChatModel(),await this.refreshModels(!0),this.say("Model unloaded.")}catch(e){this.say(e.message,!0)}finally{this.modelBusy=!1}}}renderModelControls(){var i,a,o,r;const e=((i=this.models)==null?void 0:i.models)??[],t=((a=this.models)==null?void 0:a.loaded)||((o=this.status)==null?void 0:o.model)||"";return s`<label>Text-generation backend
      <div class="model-row">
        <strong>${t||"No model loaded"}</strong>
        <button class="secondary" ?disabled=${this.modelBusy} @click=${()=>void this.refreshModels()}>Refresh</button>
      </div>
    </label>
    ${((r=this.models)==null?void 0:r.supported)===!1?s`<div class="empty">This backend serves an OpenAI-compatible API but does not expose model load/unload. Manage the model where it runs.</div>`:s`
        <label>Model
          <select class="field" ?disabled=${this.modelBusy||!e.length}
            .value=${this.modelChoice||t}
            @change=${n=>this.modelChoice=n.target.value}>
            ${e.length?l:s`<option value="">No models found</option>`}
            ${e.map(n=>s`<option value=${n} ?selected=${n===(this.modelChoice||t)}>${n}</option>`)}
          </select>
        </label>
        <div class="panel-actions">
          <button class="primary" ?disabled=${this.modelBusy||!e.length} @click=${()=>void this.loadModel()}>
            ${this.modelBusy?"Working…":"Load model"}
          </button>
          <button class="danger" ?disabled=${this.modelBusy||!t} @click=${()=>void this.unloadModel()}>Unload</button>
        </div>
        ${this.modelBusy?s`<div class="empty">Loading a large model can take several minutes. Leaving this page will not cancel it.</div>`:l}`}`}saveOptionsGlobally(e){this.workspace.defaults={...e.options??li()},this.touchWorkspace(),this.saveWorkspace(),this.say("Saved as the default for new conversations.")}renderModelPanel(e){const t=(a,o,r,n,d,p)=>s`<label>${a}<span class="range"><input type="range" min=${r} max=${n} step=${d} .value=${String(La(e.options,o,p))} @input=${f=>this.updateOption(o,Number(f.target.value))}/><output>${La(e.options,o,p)}</output></span></label>`,i=!!this.workspace.defaults;return s`<div class="panel">
      <section class="group">
        <h3>Backend</h3>
        ${this.renderModelControls()}
      </section>

      <section class="group">
        <h3>Generation<span>Applies to this conversation unless you save it as the default.</span></h3>
        <div class="grid">
          ${t("Temperature","temperature",0,2,.05,.8)}${t("Top P","top_p",.05,1,.05,.95)}
          ${t("Repetition penalty","repetition_penalty",1,2,.05,1.1)}${t("Max reply tokens","max_tokens",64,2048,32,400)}
        </div>
        <details>
          <summary>Advanced API options</summary>
          <textarea class="field" rows="5" .value=${JSON.stringify(e.options??{},null,2)} @change=${a=>{try{const o=JSON.parse(a.target.value);this.updateConversation({options:o})}catch{this.say("Advanced options must be valid JSON.",!0)}}}></textarea>
        </details>
        <div class="panel-actions">
          <button class="primary" @click=${()=>void this.saveWorkspace()}>Save for this chat</button>
          <button class="secondary" @click=${()=>this.saveOptionsGlobally(e)}>Save as global default</button>
          <button class="secondary" @click=${()=>{e.options={...this.workspace.defaults??li()},this.touchWorkspace()}}>Reset${i?" to global":""}</button>
        </div>
      </section>

      <section class="group">
        <h3>This conversation<span>Mood and pacing for the current chat only.</span></h3>
        <div class="grid">
          <label>Conversation mode<select .value=${e.mode} @change=${a=>this.updateConversation({mode:a.target.value})}>${Me.map(a=>s`<option value=${a.id}>${a.label}</option>`)}</select></label>
          <label>Displayed emotion<select .value=${e.emotion} @change=${a=>this.updateConversation({emotion:a.target.value})}>${["neutral","happy","mischievous","surprised","thinking"].map(a=>s`<option>${a}</option>`)}</select></label>
        </div>
        <label>Intensity <span class="range"><input type="range" min="1" max="5" step="1" .value=${String(e.intensity)} @input=${a=>this.updateConversation({intensity:Number(a.target.value)})}/><output>${e.intensity}/5</output></span></label>
      </section>
    </div>`}renderImagesPanel(e){const t=this.workspace.images.filter(i=>i.characterId===e.id);return s`<div class="panel">
      <p class="empty">Images are scanned locally. ${e.name} may attach one when its tags match the current exchange. Your own profile picture is set under Profile and is kept separate from these.</p>
      <div class="upload-row">
        <label>Extra matching tags<input class="field" placeholder="beach, happy, bedroom" .value=${this.imageTags} @input=${i=>this.imageTags=i.target.value}/></label>
        <span class="file-btn">Upload and scan<input type="file" accept="image/png,image/jpeg,image/webp,image/gif" @change=${this.uploadImage}/></span>
      </div>
      <div class="image-grid">${t.map(i=>s`
        <article class="image-card">
          <img src=${u.chatImageURL(i.id)} alt=${i.name}/>
          <button class="remove" title="Delete ${i.name}" aria-label="Delete ${i.name}" @click=${()=>void this.deleteImage(i)}>×</button>
          <div class="card-body">
            <span class="card-name">${i.name}</span>
            <span class="card-tags">${i.tags.join(", ")||"No tags"}</span>
            ${e.avatarImageId===i.id?s`<span class="badge">Avatar</span>`:s`<button @click=${()=>this.updateCharacter("avatarImageId",i.id)}>Use as avatar</button>`}
          </div>
        </article>`)}</div>
      ${t.length?l:s`<div class="empty">No images for ${e.name} yet.</div>`}
    </div>`}renderProfilePanel(){var i;const e=this.workspace.profile,t=e.displayName||((i=this.user)==null?void 0:i.username)||"You";return s`<div class="panel"><p class="empty">This profile is shared by WebUI and APK and is included in character context.</p>
      <div class="pfp-row">
        <span class="pfp">${e.avatarImageId?s`<img src=${u.chatImageURL(e.avatarImageId)} alt="Your profile picture"/>`:s`<span class="pfp-initial">${t.slice(0,2).toUpperCase()}</span>`}</span>
        <div class="pfp-actions">
          <strong>Profile picture</strong>
          <span class="empty">Yours alone — it is never offered as a character image or attached to a reply.</span>
          <div class="panel-actions">
            <span class="file-btn">${e.avatarImageId?"Replace picture":"Upload picture"}<input type="file" accept="image/png,image/jpeg,image/webp,image/gif" @change=${this.uploadProfilePicture}/></span>
            ${e.avatarImageId?s`<button class="danger" @click=${()=>void this.removeProfilePicture()}>Remove</button>`:l}
          </div>
        </div>
      </div>
      <label>Display name<input class="field" .value=${e.displayName} @change=${a=>{e.displayName=a.target.value,this.touchWorkspace()}}/></label>
      <label>Your persona<textarea class="field" rows="5" placeholder="How friends should know and address you…" .value=${e.persona} @change=${a=>{e.persona=a.target.value,this.touchWorkspace()}}></textarea></label>
      <div class="panel-actions"><button class="primary" @click=${()=>void this.saveWorkspace()}>Save profile</button></div></div>`}canRedo(e){var a;const t=((a=this.activeConversation)==null?void 0:a.messages)??[];if(e.role!=="assistant")return!1;const i=t.indexOf(e);return i>=0&&t.slice(i+1).every(o=>o.role==="assistant")}messageMenu(e,t){if(Hi(t))return;t.preventDefault(),t.stopPropagation();const i=this.canRedo(e),a=[{label:"Copy text",icon:"content_copy",run:()=>void navigator.clipboard.writeText(e.content)},{label:"Edit message",icon:"edit",run:()=>this.editMessage(e)},...i?[{label:"Re-respond",icon:"refresh",disabled:this.busy,run:()=>void this.regenerate()}]:[],me,{label:"Delete message",icon:"delete",danger:!0,run:()=>this.deleteMessage(e.id)}];Nt({x:t.clientX,y:t.clientY,title:e.role==="assistant"?"Message":"Your message",items:a})}renderEntry(e,t){var n;const i=this.activeCharacter;if(!i)return l;const a=(t==null?void 0:t.role)===e.role&&e.at-t.at<5*6e4,o=e.role==="assistant",r=o?i.name:this.workspace.profile.displayName||((n=this.user)==null?void 0:n.username)||"You";return s`<article class="row ${a?"":"first"} ${o?"from-friend":"from-user"}" @contextmenu=${d=>this.messageMenu(e,d)}>${a?s`<span class="stamp">${ni(e.at)}</span>`:o?this.avatar(i,"avatar"):s`<span class="avatar initial">${r.slice(0,2).toUpperCase()}</span>`}
      <div class="message">${a?l:s`<div class="who"><span class="author ${o?"friend":""}">${r}</span><span class="when">Today at ${ni(e.at)}</span></div>`}<div class="text">${Pa(e.content)}</div>${e.imageId?s`<img class="sent-image" src=${u.chatImageURL(e.imageId)} alt="Image sent by ${r}"/>`:l}</div>
      <span class="message-actions">${this.canRedo(e)?s`<button title="Re-respond" aria-label="Ask for a different reply" ?disabled=${this.busy} @click=${()=>void this.regenerate()}><span class="material-symbols-rounded" style="font-size:16px">refresh</span></button>`:l}<button title="Copy" @click=${()=>void navigator.clipboard.writeText(e.content)}><span class="material-symbols-rounded" style="font-size:16px">content_copy</span></button><button title="Edit" @click=${()=>this.editMessage(e)}><span class="material-symbols-rounded" style="font-size:16px">edit</span></button><button title="Delete" @click=${()=>this.deleteMessage(e.id)}><span class="material-symbols-rounded" style="font-size:16px">delete</span></button></span>
    </article>`}render(){var o,r,n;const e=this.activeCharacter,t=this.activeConversation;if(this.loading)return s`<div class="client"><section class="main" style="grid-column:1/-1;place-items:center;display:grid"><md-circular-progress indeterminate></md-circular-progress></section></div>`;if(!e||!t)return s`<div class="client"><section class="main" style="grid-column:1/-1;padding:24px">Chat workspace is unavailable.</section></div>`;const i=Me.find(d=>d.id===t.mode)??Me[0],a=this.stageOpen?this.renderStage(e,t):l;return s`<div class="client ${this.mobileNavOpen?"nav-open":""} ${a!==l?"with-stage":""}" @pointerdown=${this.armIdle} @contextmenu=${this.chatMenu}><button class="nav-scrim" aria-label="Close chat navigation" @click=${()=>this.mobileNavOpen=!1}></button>${this.renderRail()}${this.renderSidebar()}
      <main class="main"><header class="top"><button class="icon-btn mobile-nav" title="Friends and conversations" aria-label="Open friends and conversations" @click=${()=>this.mobileNavOpen=!0}><span class="material-symbols-rounded">menu</span></button>${this.avatar(e,"top-avatar")}<span class="top-title"><span class="name">${e.name}</span><span class="topic">${(o=this.status)!=null&&o.enabled?this.status.model:e.id==="libby"?"Local replies":"Model offline"} · ${i.topic}</span></span><select class="quick-mode" aria-label="Conversation mode" title="Conversation mode" .value=${t.mode} @change=${d=>this.updateConversation({mode:d.target.value})}>${Me.map(d=>s`<option value=${d.id}>${d.label}</option>`)}</select><span class="top-actions"><button class="icon-btn ${this.callOpen?"on":""}" title="Video call" aria-label="Video call" @click=${()=>this.startCall()}><span class="material-symbols-rounded">videocam</span></button><button class="icon-btn ${this.autopilot?"on":""}" title=${this.autopilot?"Turn off autopilot":"Let the AI continue on its own"} aria-label="Autopilot" aria-pressed=${this.autopilot?"true":"false"} @click=${()=>this.toggleAutopilot()}><span class="material-symbols-rounded">smart_toy</span></button><button class="icon-btn stage-toggle ${this.stageOpen?"on":""}" title=${this.stageOpen?"Hide portrait":"Show portrait"} aria-label="Portrait" aria-pressed=${this.stageOpen?"true":"false"} @click=${()=>this.stageOpen=!this.stageOpen}><span class="material-symbols-rounded">wallpaper</span></button><button class="icon-btn" title="New conversation" aria-label="New conversation" @click=${()=>this.newConversation()}><span class="material-symbols-rounded">add_comment</span></button><button class="icon-btn destructive-action" title="Clear messages" aria-label="Clear messages" @click=${this.clearConversation}><span class="material-symbols-rounded">delete_sweep</span></button><button class="icon-btn ${this.settingsOpen?"on":""}" title="Chat settings" aria-label="Chat settings" @click=${()=>this.settingsOpen=!this.settingsOpen}><span class="material-symbols-rounded">tune</span></button></span></header>
        ${this.settingsOpen?this.renderSettings():l}
        ${(r=this.status)!=null&&r.modelBackend&&!this.status.enabled?s`<div class="backend-state" role="status"><strong>Text generation offline.</strong> ${this.status.message||"Load a model in text-generation-webui, then refresh status."}</div>`:l}
        ${this.renderAutopilotBar(e)}
        <section class="log"><div class="intro">${this.avatar(e,"round")}<h2>${e.name}</h2><p>${e.description||`This is the beginning of your conversation with ${e.name}.`}${(n=this.status)!=null&&n.enabled?` Running on ${this.status.model}.`:e.id==="libby"?" Libby is using built-in local replies.":" Connect a local model to start chatting."}</p></div>
          ${t.messages.map((d,p)=>this.renderEntry(d,t.messages[p-1]))}${this.busy?s`<div class="typing"><span class="dots"><i></i><i></i><i></i></span><b>${e.name}</b> is typing…</div>`:l}
        </section>${this.notice?s`<div class="notice ${this.noticeError?"error":""}" role=${this.noticeError?"alert":"status"}>${this.notice}</div>`:l}
        <form class="composer-form" @submit=${d=>{d.preventDefault(),this.send()}}>
          ${this.pendingPhoto?s`<div class="attachment"><img src=${u.chatImageURL(this.pendingPhoto.imageId)} alt=${`Attached photo: ${this.pendingPhoto.name}`}/>
            <span class="attachment-copy"><strong>${this.pendingPhoto.name}</strong><span>${this.pendingPhoto.tags.length?this.pendingPhoto.tags.slice(0,8).join(", "):"No content tags found"}</span></span>
            <button type="button" class="icon-btn" title="Remove photo" aria-label="Remove photo" @click=${()=>void this.discardPhoto()}><span class="material-symbols-rounded">close</span></button></div>`:l}
          <div class="composer">
            <span class="attach-btn ${this.busy?"off":""}" title="Share a photo"><span class="material-symbols-rounded">add_photo_alternate</span><input type="file" accept="image/png,image/jpeg,image/webp,image/gif" aria-label="Share a photo" ?disabled=${this.busy} @change=${d=>void this.attachPhoto(d)}/></span>
            <textarea rows="1" aria-label=${`Message ${e.name}`} placeholder=${this.busy?`${e.name} is replying — keep typing…`:`Message ${e.name}…`} .value=${this.draft} @input=${d=>this.draft=d.target.value} @keydown=${this.onKey}></textarea>
            <button class="icon-btn" type="submit" title="Send message" aria-label="Send message" ?disabled=${!this.draft.trim()&&!this.pendingPhoto||this.busy}><span class="material-symbols-rounded">send</span></button>
          </div><div class="format-help"><span>"speech" · **action** · *emphasis* · ~~strike~~ · &#96;code&#96;</span><span class="send-help"></span></div></form>
      </main>${a}${this.renderCall(e,t)}
    </div>`}};T.styles=[ye,ce,$`
    :host { display:block; height:100%; color:var(--md-sys-color-on-surface); font:400 15px/1.375 "gg sans","Noto Sans",Roboto,system-ui,sans-serif;
      --rail:var(--md-sys-color-surface-container-lowest); --side:var(--md-sys-color-surface-container-low);
      --main:var(--md-sys-color-surface); --hover:var(--md-sys-color-surface-container-high);
      --input:var(--md-sys-color-surface-container-highest); --muted:var(--md-sys-color-on-surface-variant);
      --line:var(--md-sys-color-outline-variant); --accent:var(--md-sys-color-primary); --on-accent:var(--md-sys-color-on-primary); }
    button,input,textarea,select { font:inherit; }
    button { color:inherit; }
    /* Full-bleed: no border, radius, or shadow. The chat fills its pane and reads
       as the application itself rather than a framed client embedded in one. */
    .client { position:relative; display:grid; grid-template-columns:64px 272px minmax(0,1fr); height:100%; min-height:0;
      overflow:hidden; background:var(--main); }
    /* The portrait column only exists when there is art to show, so the log keeps
       the full width for a character with no picture. */
    .client.with-stage { grid-template-columns:64px 272px minmax(0,1fr) 268px; }
    .rail { background:var(--rail); padding:12px 0; display:flex; flex-direction:column; align-items:center; gap:8px; overflow-y:auto; }
    .guild { position:relative; width:44px; height:44px; flex:0 0 44px; border:0; border-radius:50%; background:var(--input); display:grid;
      place-items:center; overflow:hidden; cursor:pointer; transition:.15s; }
    .guild:hover,.guild.on { border-radius:14px; background:var(--accent); }
    .guild.on::before { content:""; position:absolute; left:0; width:4px; height:30px; border-radius:0 4px 4px 0; background:var(--md-sys-color-on-surface); }
    /* Every avatar frame, not just some. .top-avatar and .me-avatar were missing
       here, so their images rendered at natural size and showed a clipped crop
       instead of filling the circle. Portraits are anchored to the top so a tall
       character image keeps the face rather than centring on the torso. */
    .guild img,.avatar img,.member-avatar img,.top-avatar img,.me-avatar img,.call-avatar img {
      width:100%; height:100%; object-fit:cover; object-position:top center; display:block; }
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
    .me-avatar { width:32px; height:32px; flex:0 0 32px; border-radius:50%; overflow:hidden; display:grid; place-items:center; }
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
    .when { color:var(--muted); font-size:11px; }
    /* Roleplay prose is read by scanning for its parts — who spoke, what they did,
       what was stressed. The old palette blended actions 72% into the body colour
       and left speech identical to it, so those parts only separated by weight.
       Each role now carries its own hue at full strength: speech is the accent,
       action is the tertiary italic, emphasis is secondary, and code keeps a chip. */
    .text { white-space:pre-wrap; overflow-wrap:anywhere; color:var(--md-sys-color-on-surface); }
    .text .speech { color:var(--accent); font-weight:500; }
    .text .action { font-style:italic; font-weight:700;
      color:var(--md-sys-color-tertiary,color-mix(in srgb,var(--accent) 45%,var(--md-sys-color-on-surface))); }
    .text em { color:var(--md-sys-color-secondary,var(--muted)); font-style:italic; }
    .text code { background:var(--input); color:var(--md-sys-color-tertiary,var(--accent));
      padding:1px 4px; border-radius:3px; font-family:ui-monospace,"Cascadia Code",Consolas,monospace; font-size:.92em; }
    .text s { opacity:.55; }
    /* Attached photo, held in the composer until the message is sent. */
    .attachment { display:flex; align-items:center; gap:10px; margin:0 16px 8px; padding:8px; border:1px solid var(--line);
      border-radius:10px; background:var(--input); }
    .attachment img { width:44px; height:44px; flex:0 0 44px; border-radius:7px; object-fit:cover; }
    .attachment-copy { min-width:0; flex:1; display:grid; }
    .attachment-copy strong { font-size:13px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
    .attachment-copy span { color:var(--muted); font-size:11px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
    .attach-btn { position:relative; display:grid; place-items:center; padding:0 4px; color:var(--muted); cursor:pointer; }
    .attach-btn:hover { color:var(--md-sys-color-on-surface); }
    .attach-btn.off { opacity:.4; pointer-events:none; }
    .attach-btn input { position:absolute; inset:0; opacity:0; cursor:pointer; }
    .attach-btn.off input { cursor:default; }
    .sent-image { display:block; max-width:min(460px,100%); max-height:420px; border-radius:8px; margin-top:7px; object-fit:contain; background:var(--input); }
    .message-actions { opacity:0; position:absolute; right:8px; top:-8px; display:flex; border:1px solid var(--line); border-radius:5px; overflow:hidden; background:var(--side); }
    .row:hover .message-actions { opacity:1; }.message-actions button { border:0; background:transparent; padding:4px; cursor:pointer; color:var(--muted); }.message-actions button:hover { color:inherit; background:var(--hover); }
    .typing { padding:6px 16px 0 56px; color:var(--muted); font-size:13px; display:flex; align-items:center; gap:8px;
      animation:chat-rise .22s var(--oppai-ease-standard,cubic-bezier(.2,0,0,1)) both; }
    .typing b { color:var(--md-sys-color-on-surface); }
    .dots { display:inline-flex; gap:3px; }
    .dots i { width:5px; height:5px; border-radius:50%; background:var(--muted); animation:chat-bounce 1.1s infinite ease-in-out; }
    .dots i:nth-child(2) { animation-delay:.16s; } .dots i:nth-child(3) { animation-delay:.32s; }
    @keyframes chat-bounce { 0%,60%,100% { transform:translateY(0); opacity:.55; } 30% { transform:translateY(-4px); opacity:1; } }
    @keyframes chat-rise { from { opacity:0; transform:translateY(8px); } }
    @keyframes chat-fade { from { opacity:0; } }
    @keyframes chat-sprite-in { from { opacity:0; transform:translateY(10px) scale(.985); } }
    /* Only the run-opening row animates. Lit reuses a row's DOM across renders, so
       this fires when a message is appended and not on every state change. */
    .row.first { animation:chat-rise .3s var(--oppai-ease-standard,cubic-bezier(.2,0,0,1)) both; }
    .row .message-actions,.row .stamp { transition:opacity .12s ease; }
    .row:hover { transition:background .12s ease; }
    .sent-image { animation:chat-fade .35s ease both; }
    .intro { animation:chat-rise .34s var(--oppai-ease-standard,cubic-bezier(.2,0,0,1)) both; }
    .composer button[type=submit]:not(:disabled):active { transform:scale(.9); }
    .composer button[type=submit] { transition:transform .12s var(--oppai-ease-spring,cubic-bezier(.34,1.4,.64,1)); }

    /* ── autopilot ───────────────────────────────────────────────────────── */
    .autobar { display:flex; align-items:center; gap:9px; padding:8px 16px; font-size:12px;
      border-bottom:1px solid var(--line); background:color-mix(in srgb,var(--accent) 12%,var(--side));
      animation:chat-rise .24s var(--oppai-ease-standard,cubic-bezier(.2,0,0,1)) both; }
    .autobar.idle { background:var(--side); color:var(--muted); }
    .autobar .material-symbols-rounded { font-size:18px; color:var(--accent); }
    .autobar.idle .material-symbols-rounded { color:var(--muted); animation:none; }
    .autobar:not(.idle) .material-symbols-rounded { animation:chat-bounce 2.4s infinite ease-in-out; }
    .autobar-copy { flex:1; min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
    .autobar-btn { border:1px solid var(--line); border-radius:999px; padding:3px 11px; background:transparent;
      color:inherit; font-size:11px; font-weight:650; cursor:pointer; }
    .autobar-btn:hover { background:var(--hover); }

    /* ── portrait stage ──────────────────────────────────────────────────── */
    .stage { min-width:0; display:flex; flex-direction:column; gap:8px; padding:12px 10px 0;
      background:var(--side); border-left:1px solid var(--line); overflow:hidden; }
    .stage-head { display:grid; gap:1px; padding:0 4px; }
    .stage-name { font-weight:700; font-size:14px; color:var(--accent); overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
    .stage-status { color:var(--muted); font-size:11px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
    .stage-art { flex:1; min-height:0; display:grid; place-items:end center; }
    .stage-art .sprite { max-width:100%; max-height:100%; object-fit:contain; object-position:bottom;
      filter:drop-shadow(0 10px 26px rgba(0,0,0,.42)); animation:chat-sprite-in .34s var(--oppai-ease-standard,cubic-bezier(.2,0,0,1)) both; }
    .stage-art.empty-art { place-items:center; gap:8px; align-content:center; padding:16px; text-align:center;
      color:var(--muted); font-size:12px; }
    .stage-art.empty-art .material-symbols-rounded { font-size:44px; opacity:.5; }
    .stage-meter { display:flex; gap:4px; justify-content:center; padding:8px 0 12px; }
    .stage-meter .pip { width:20px; height:4px; border-radius:2px; background:var(--input); transition:background .28s ease; }
    .stage-meter .pip.on { background:var(--accent); }
    @media(max-width:1200px){ .client.with-stage { grid-template-columns:64px 272px minmax(0,1fr); } .stage,.stage-toggle { display:none; } }
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
    /* Settings read as their own room, the way Discord's do: a category rail on the
       left, one panel on the right, and no tab strip competing with the header. */
    .settings { position:absolute; inset:56px 0 0 0; z-index:5; display:grid; grid-template-columns:212px minmax(0,1fr);
      overflow:hidden; background:var(--main); box-shadow:0 10px 28px rgba(0,0,0,.28);
      animation:chat-fade .16s ease both; }
    .settings-nav { display:flex; flex-direction:column; gap:2px; padding:14px 8px; overflow-y:auto; background:var(--side); }
    .nav-cat { padding:12px 10px 4px; color:var(--muted); font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.06em; }
    .nav-row { display:flex; align-items:center; gap:10px; border:0; border-radius:5px; padding:8px 10px; background:transparent;
      color:var(--muted); font-size:14px; font-weight:550; text-align:left; cursor:pointer; transition:background .12s ease,color .12s ease; }
    .nav-row span:last-child { min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
    .nav-row .material-symbols-rounded { font-size:18px; }
    .nav-row:hover { background:var(--hover); color:var(--md-sys-color-on-surface); }
    .nav-row.on { background:var(--hover); color:var(--md-sys-color-on-surface); }
    .nav-sep { height:1px; margin:8px 10px; background:var(--line); }
    .settings-body { min-width:0; overflow-y:auto; background:var(--main); }
    .settings-head { position:sticky; top:0; z-index:2; display:flex; align-items:center; gap:8px; padding:16px 16px 10px; background:var(--main); }
    .settings-head strong { flex:1; font-size:19px; }.settings-head span { display:block; color:var(--muted); font-size:11px; font-weight:400; }
    /* Capped rather than full-bleed: settings are a reading column, and stretched
       across a wide desktop the label/control pairs drift far apart. */
    .panel { padding:14px 16px 22px; display:grid; gap:16px; max-width:760px; }
    .grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
    .group { display:grid; gap:11px; padding:14px; border:1px solid var(--line); border-radius:10px; background:var(--main); }
    .group h3 { margin:0; font-size:13px; font-weight:700; text-transform:uppercase; letter-spacing:.05em; color:var(--muted); display:grid; gap:3px; }
    .group h3 span { font-size:11px; font-weight:400; text-transform:none; letter-spacing:0; }
    details summary { cursor:pointer; color:var(--muted); font-size:12px; padding:2px 0; }
    details[open] summary { margin-bottom:6px; }
    label { display:grid; gap:4px; color:var(--muted); font-size:11px; font-weight:650; text-transform:uppercase; }.field,select { box-sizing:border-box; width:100%; color:var(--md-sys-color-on-surface);
      background:var(--input); border:1px solid var(--line); border-radius:5px; padding:8px; outline:0; text-transform:none; font-weight:400; }
    textarea.field { min-height:66px; resize:vertical; }.range { display:grid; grid-template-columns:1fr 48px; gap:8px; align-items:center; }.range input { accent-color:var(--accent); }.range output { text-align:right; color:inherit; }
    .panel-actions { display:flex; flex-wrap:wrap; gap:7px; }.primary,.secondary,.danger { border:1px solid var(--line); border-radius:5px; padding:7px 11px; cursor:pointer; background:transparent; }
    .primary { background:var(--accent); border-color:var(--accent); color:var(--on-accent); }.danger { color:var(--md-sys-color-error); }    /* A span, not a label: the generic label rule sets display:grid and an
       uppercase caption, which fought the button styling and misaligned the old
       upload control. The transparent input covers the span, so a click on the
       chip is a click on the input. */
    .pfp-row { display:grid; grid-template-columns:80px minmax(0,1fr); gap:14px; align-items:center; }
    .pfp { width:80px; height:80px; border-radius:50%; overflow:hidden; background:var(--input); display:grid; place-items:center; }
    .pfp img { width:100%; height:100%; object-fit:cover; object-position:top center; display:block; }
    .pfp-initial { font-size:24px; font-weight:700; color:var(--on-accent); background:var(--accent); width:100%; height:100%; display:grid; place-items:center; }
    /* The character card reuses avatar() for its preview, which brings its own
       .initial fallback rather than the .pfp-initial span the profile panel uses. */
    .pfp.initial { font-size:24px; }
    .pfp-actions { display:grid; gap:5px; justify-items:start; }.pfp-actions strong { font-size:14px; }
    .upload-row { display:grid; grid-template-columns:minmax(0,1fr) auto; gap:10px; align-items:end; }
    .file-btn { position:relative; overflow:hidden; display:inline-grid; place-items:center; white-space:nowrap;
      border:1px solid var(--line); border-radius:5px; padding:9px 12px; cursor:pointer; font-size:13px; }
    .file-btn:hover { background:var(--hover); }
    .file-btn input { position:absolute; inset:0; opacity:0; cursor:pointer; font-size:0; }
    @media(max-width:700px){ .upload-row { grid-template-columns:1fr; } }
    .image-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(120px,1fr)); gap:9px; }.image-card { background:var(--input); border-radius:7px; overflow:hidden; position:relative; }
    .image-card img { width:100%; height:110px; object-fit:cover; display:block; }
    .image-card .card-body { padding:6px; font-size:11px; overflow-wrap:anywhere; display:grid; gap:5px; justify-items:start; }
    .image-card .card-name { font-weight:600; overflow-wrap:anywhere; }.image-card .card-tags { color:var(--muted); }
    /* Scoped to the remove control. This used to select .image-card button, which
       also caught the "Use avatar" button in the card body and stacked it on top
       of the delete control in the same absolute corner. */
    .image-card .remove { position:absolute; right:4px; top:4px; width:22px; height:22px; display:grid; place-items:center;
      border:0; border-radius:50%; background:rgba(0,0,0,.7); color:white; cursor:pointer; line-height:1; }
    .image-card .remove:hover { background:var(--md-sys-color-error); }
    .image-card .card-body button { border:1px solid var(--line); border-radius:5px; padding:4px 8px; background:transparent; cursor:pointer; }
    .badge { background:var(--accent); color:var(--on-accent); border-radius:3px; padding:1px 5px; font-size:10px; font-weight:700; }
    .empty { color:var(--muted); font-size:13px; }.nav-scrim { display:none; }
    .model-row { display:flex; align-items:center; gap:9px; }.model-row strong { min-width:0; flex:1; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; font-weight:600; text-transform:none; }
    @media(max-width:900px){.client{grid-template-columns:60px 236px minmax(0,1fr)}.side-head{padding-left:12px}}
    @media(max-width:700px){
      .client{display:block;height:100%;min-height:0}.main{height:100%}
      .rail,.side{display:none;position:absolute;top:0;bottom:0;z-index:12}.client.nav-open .rail{display:flex;left:0;width:60px}.client.nav-open .side{display:flex;left:60px;width:min(286px,calc(100% - 60px))}
      .client.nav-open .nav-scrim{display:block;position:absolute;inset:0;z-index:11;border:0;background:rgba(0,0,0,.55)}
      .mobile-nav{display:grid!important}.top{padding-left:4px;gap:7px}.quick-mode{max-width:96px;padding-left:8px}.topic{max-width:130px}.grid{grid-template-columns:1fr}
      .row{grid-template-columns:48px minmax(0,1fr);padding-right:12px}.avatar{width:34px;height:34px}.typing{padding-left:48px}.destructive-action{display:none}.format-help{display:none}
      .intro{margin:6px 10px 12px;padding:13px}.panel{padding-left:12px;padding-right:12px}.message-actions{opacity:1;position:static;grid-column:2;justify-self:end;margin-top:3px;border:0;background:transparent}
      /* No room for a rail: the categories become a scrolling strip above the panel. */
      .settings{inset:56px 0 0;grid-template-columns:minmax(0,1fr);grid-template-rows:auto minmax(0,1fr)}
      .settings-nav{flex-direction:row;align-items:center;gap:4px;padding:8px;overflow-x:auto;overflow-y:hidden;border-bottom:1px solid var(--line)}
      .nav-cat,.nav-sep,.nav-row.close{display:none}
      .nav-row{flex:0 0 auto;padding:7px 12px;border-radius:999px}
      .pfp-row{grid-template-columns:64px minmax(0,1fr)}.pfp{width:64px;height:64px}
      .call-caption{max-width:100%}.call-top{flex-direction:column;align-items:flex-start;gap:6px}
    }
    /* Video call. Covers the whole client rather than sitting in the portrait
       column: the point is to look at the character, so the chrome gets out of
       the way and the sprite is given the full height. */
    .call { position:absolute; inset:0; z-index:60; display:flex; flex-direction:column; background:var(--md-sys-color-scrim,#000);
      animation:chat-rise .18s var(--oppai-ease-standard,cubic-bezier(.2,0,0,1)) both; }
    .call-stage { position:relative; flex:1 1 0; min-height:0; display:grid; place-items:end center; overflow:hidden;
      background:radial-gradient(120% 90% at 50% 12%,color-mix(in srgb,var(--accent) 26%,transparent),transparent 68%),var(--rail); }
    .call-sprite { max-height:100%; max-width:100%; object-fit:contain; object-position:bottom center;
      animation:call-pose .32s var(--oppai-ease-standard,cubic-bezier(.2,0,0,1)) both; }
    @keyframes call-pose { from { opacity:0; transform:translateY(10px) scale(.99); } }
    .call-top { position:absolute; top:0; left:0; right:0; display:flex; align-items:center; gap:12px; padding:14px 18px;
      background:linear-gradient(to bottom,rgba(0,0,0,.55),transparent); color:#fff; }
    .call-who { display:grid; }.call-who strong { font-size:16px; }.call-who span { font-size:12px; opacity:.8; }
    .call-mood { margin-left:auto; display:flex; align-items:center; gap:7px; padding:5px 11px; border-radius:999px;
      background:rgba(0,0,0,.42); font-size:12px; font-weight:650; text-transform:capitalize; }
    .call-mood .material-symbols-rounded { font-size:16px; }
    .call-pips { display:inline-flex; gap:3px; }
    .call-pips i { width:5px; height:5px; border-radius:50%; background:rgba(255,255,255,.32); }
    .call-pips i.on { background:var(--accent); }
    .call-caption { position:absolute; bottom:16px; max-width:min(680px,88%); margin:0; padding:11px 15px; border-radius:12px;
      background:rgba(0,0,0,.58); color:#fff; font-size:14px; line-height:1.45; white-space:pre-wrap; backdrop-filter:blur(3px); }
    /* The caption sits on a dark plate rather than the theme surface, so the
       formatting colours are re-stated here against it. */
    .call-caption .speech { color:color-mix(in srgb,var(--accent) 70%,#fff); }
    .call-caption .action { color:rgba(255,255,255,.82); }
    .call-bar { flex:0 0 auto; display:flex; align-items:center; gap:9px; padding:12px 16px; background:var(--rail); }
    .call-input { flex:1; min-width:0; border:0; border-radius:999px; padding:11px 16px; background:var(--input);
      color:var(--md-sys-color-on-surface); }
    .call-input:focus { outline:2px solid var(--accent); outline-offset:-2px; }
    .call-btn { width:44px; height:44px; flex:0 0 44px; border:0; border-radius:50%; background:var(--input); color:inherit;
      display:grid; place-items:center; cursor:pointer; }
    .call-btn:hover:not(:disabled) { background:var(--hover); }
    .call-btn:disabled { opacity:.45; cursor:default; }
    .call-btn.end { background:var(--md-sys-color-error); color:var(--md-sys-color-on-error,#fff); }
    @media (prefers-reduced-motion:reduce) { .call,.call-sprite { animation:none; } }
  `];A([v({attribute:!1})],T.prototype,"user",2);A([c()],T.prototype,"status",2);A([c()],T.prototype,"workspace",2);A([c()],T.prototype,"characterID",2);A([c()],T.prototype,"conversationID",2);A([c()],T.prototype,"draft",2);A([c()],T.prototype,"busy",2);A([c()],T.prototype,"loading",2);A([c()],T.prototype,"settingsOpen",2);A([c()],T.prototype,"editorTab",2);A([c()],T.prototype,"notice",2);A([c()],T.prototype,"noticeError",2);A([c()],T.prototype,"imageTags",2);A([c()],T.prototype,"models",2);A([c()],T.prototype,"modelChoice",2);A([c()],T.prototype,"modelBusy",2);A([c()],T.prototype,"mobileNavOpen",2);A([c()],T.prototype,"autopilot",2);A([c()],T.prototype,"autoPaused",2);A([c()],T.prototype,"autoTurns",2);A([c()],T.prototype,"stageOpen",2);A([c()],T.prototype,"pendingPhoto",2);A([c()],T.prototype,"callOpen",2);A([c()],T.prototype,"callSeconds",2);A([S(".log")],T.prototype,"log",2);A([S(".composer textarea")],T.prototype,"composer",2);T=A([I("oppai-chat")],T);var tl=Object.defineProperty,il=Object.getOwnPropertyDescriptor,X=(e,t,i,a)=>{for(var o=a>1?void 0:a?il(t,i):t,r=e.length-1,n;r>=0;r--)(n=e[r])&&(o=(a?n(t,i,o):n(o))||o);return a&&o&&tl(t,i,o),o};const al=[{id:"home",label:"Home",icon:"home"},...rt.map(e=>({id:e,label:Z[e].label,icon:Z[e].icon})),{id:"favorites",label:"Favorites",icon:"favorite"},{id:"browse",label:"Browse",icon:"explore"},{id:"imagegen",label:"Create",icon:"auto_awesome"},{id:"chat",label:"Chat",icon:"chat_bubble"}];function ol(e){const t=(e.tags??[]).flatMap(i=>[i.name,i.category]);return[e.title,e.notes??"",...t].join(`
`).toLowerCase()}function rl(e,t){if(t.length===0)return!0;const i=ol(e);return t.every(a=>i.includes(a))}let H=class extends _{constructor(){super(...arguments),this.items=[],this.loading=!1,this.section="home",this.selectedId=null,this.search="",this.filters={},this.favorites=kn(),this.uploadOpen=!1,this.dragActive=!1,this.selectMode=!1,this.selected=new Set,this.busy=!1,this.downloads=bn(),this.viewerList=[],this.onContextMenu=e=>{var r;if(e.defaultPrevented||Hi(e))return;const t=e.composedPath(),a=Number((r=(n=>t.find(d=>{var p,f;return(f=(p=d==null?void 0:d.classList)==null?void 0:p.contains)==null?void 0:f.call(p,n)}))("tile"))==null?void 0:r.dataset.id),o=Number.isFinite(a)&&a>0?this.tileMenuItems(a,e):this.shellMenuItems();o.length&&(e.preventDefault(),Nt({x:e.clientX,y:e.clientY,items:o}))},this.onDownloads=e=>{this.downloads=e.detail},this.onDownloadComplete=()=>this.refresh(),this.onKey=e=>{var i;if(this.selectedId==null||this.uploadOpen||ko(e))return;const t=((i=this.items.find(a=>a.id===this.selectedId))==null?void 0:i.kind)==="comic";switch(e.key){case"ArrowRight":if(t)return;e.preventDefault(),this.stepItem(1);break;case"ArrowLeft":if(t)return;e.preventDefault(),this.stepItem(-1);break;case"Escape":this.closeItem();break}},this.stepItem=e=>{if(this.selectedId==null)return;const t=this.viewerList.indexOf(this.selectedId);if(t<0)return;const i=t+e;i<0||i>=this.viewerList.length||(this.selectedId=this.viewerList[i])},this.closeItem=()=>{this.selectedId=null},this.toggleSelectMode=()=>{this.selectMode=!this.selectMode,this.selectMode||(this.selected=new Set)},this.toggleUpload=()=>{this.uploadOpen=!this.uploadOpen,this.dragActive=!1}}connectedCallback(){super.connectedCallback(),this.refresh(),this.addEventListener("contextmenu",this.onContextMenu),window.addEventListener("keydown",this.onKey),window.addEventListener("oppai-downloads",this.onDownloads),window.addEventListener("oppai-download-complete",this.onDownloadComplete)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("contextmenu",this.onContextMenu),window.removeEventListener("keydown",this.onKey),window.removeEventListener("oppai-downloads",this.onDownloads),window.removeEventListener("oppai-download-complete",this.onDownloadComplete)}tileMenuItems(e,t){const i=this.items.find(o=>o.id===e);if(!i)return[];const a=this.favorites.has(e);return[{label:"Open",icon:"open_in_full",run:()=>this.openItem(e)},{label:a?"Remove from favorites":"Add to favorites",icon:a?"heart_minus":"favorite",run:()=>this.toggleFavorite(e)},{label:this.selectMode?"Toggle selection":"Select items",icon:"check_box",run:()=>this.selectMode?this.toggleSelected(e):this.toggleSelectMode()},me,{label:"Share with…",icon:"ios_share",disabled:!mn(i),run:()=>void this.openShareMenu(i,t.clientX,t.clientY)},{label:"Copy title",icon:"content_copy",run:()=>void navigator.clipboard.writeText(i.title)},{label:"Open the file",icon:"open_in_new",run:()=>window.open(u.streamURL(e),"_blank")},me,{label:"Delete",icon:"delete",danger:!0,run:()=>void this.deleteOne(e)}]}async openShareMenu(e,t,i){let a=[];try{a=(await u.chatWorkspace()).characters??[]}catch(o){F(o.message||"Couldn't load your chat characters.","error");return}if(!a.length){F("No chat characters yet — add one in Chat first.","error");return}Nt({x:t,y:i,title:`Share "${e.title}" with`,items:a.map(o=>({label:o.name,icon:"person",run:()=>void this.share(e,o)}))})}async share(e,t){try{await vn(e,t.id),this.selectSection("chat")}catch(i){F(i.message||`Couldn't share with ${t.name}.`,"error")}}shellMenuItems(){const e=tt()!=="light";return[{label:"Add media",icon:"add",run:()=>this.toggleUpload()},{label:"Import from a URL",icon:"link",run:()=>this.openScrape()},{label:"Refresh library",icon:"refresh",run:()=>void this.refresh()},me,{label:"Home",icon:"home",run:()=>this.selectSection("home")},{label:"Favorites",icon:"favorite",run:()=>this.selectSection("favorites")},{label:"Chat",icon:"chat_bubble",run:()=>this.selectSection("chat")},{label:"Create",icon:"auto_awesome",run:()=>this.selectSection("imagegen")},me,{label:e?"Switch to light theme":"Switch to dark theme",icon:e?"light_mode":"dark_mode",run:()=>this.flipTheme()},{label:"Settings",icon:"settings",run:()=>this.selectSection("settings")}]}flipTheme(){const e=tt()==="light"?"dark":"light";lo(e),Wt(e)}async deleteOne(e){const t=this.items.find(i=>i.id===e);if(!(!t||!confirm(`Delete "${t.title}"? This cannot be undone.`))){this.busy=!0;try{await u.deleteMedia(e),this.selectedId===e&&this.closeItem(),await this.refresh()}catch(i){F(`Couldn't delete that: ${i.message}`,"error")}finally{this.busy=!1}}}async refresh(){this.loading=!0;try{const t=[];for(let i=0;;i+=200){const o=(await u.listMedia("",200,i)).items??[];if(t.push(...o),o.length<200)break}this.items=t}finally{this.loading=!1}}selectSection(e){this.section=e,this.selectedId=null,this.search=""}openItem(e,t){t&&t.length?this.viewerList=t.map(i=>i.id):this.viewerList.includes(e)||(this.viewerList=[e]),this.selectedId=e}onSearchInput(e){this.search=e.target.value,this.selectedId=null}clearSearch(){this.search=""}setFilter(e,t){this.filters={...this.filters,[e]:t}}toggleFavorite(e,t){t==null||t.stopPropagation();const i=new Set(this.favorites);i.has(e)?i.delete(e):i.add(e),this.favorites=i,ai(i)}exitSelect(){this.selectMode=!1,this.selected=new Set}toggleSelected(e,t){t==null||t.stopPropagation();const i=new Set(this.selected);i.has(e)?i.delete(e):i.add(e),this.selected=i}async bulkDelete(){const e=[...this.selected];if(e.length&&confirm(`Delete ${e.length} item${e.length===1?"":"s"}? This cannot be undone.`)){this.busy=!0;try{await u.bulkMedia("delete",e);const t=Q("libraryDelete",{count:e.length});F(t.message,"success",{emotion:t.emotion,intensity:t.intensity});const i=new Set(this.favorites);e.forEach(a=>i.delete(a)),this.favorites=i,ai(i),this.exitSelect(),await this.refresh()}catch(t){console.error("bulk delete",t)}finally{this.busy=!1}}}async bulkTags(e){const t=[...this.selected];if(!t.length)return;const i=prompt(e==="add"?"Add tags (comma-separated):":"Remove tags (comma-separated):");if(i==null)return;const a=i.split(",").map(o=>o.trim()).filter(Boolean);if(a.length){this.busy=!0;try{await u.bulkMedia("update",t,e==="add"?{addTags:a}:{removeTags:a}),await this.refresh()}catch(o){console.error("bulk tags",o)}finally{this.busy=!1}}}async bulkChangeKind(){const e=[...this.selected];if(!e.length)return;const t=prompt("Change type to (video, gif, image, comic, game):");if(t==null)return;const i=t.trim().toLowerCase();if(!rt.includes(i)){alert(`Unknown type "${i}".`);return}this.busy=!0;try{await u.bulkMedia("update",e,{kind:i}),this.exitSelect(),await this.refresh()}catch(a){console.error("bulk kind",a)}finally{this.busy=!1}}bulkFavorite(){const e=new Set(this.favorites);this.selected.forEach(t=>e.add(t)),this.favorites=e,ai(e),this.exitSelect()}logout(){this.dispatchEvent(new CustomEvent("logout",{bubbles:!0,composed:!0}))}browse(){var e;(e=this.renderRoot.querySelector("#file"))==null||e.click()}async onFiles(e){const t=Array.from(e);if(t.length){this.uploadOpen=!1;for(const i of t)try{await u.upload(i)}catch(a){console.error("upload",a)}this.refresh()}}onFileInput(e){const t=e.target;t.files&&this.onFiles(t.files),t.value=""}onDrop(e){var t,i;e.preventDefault(),this.dragActive=!1,(i=(t=e.dataTransfer)==null?void 0:t.files)!=null&&i.length&&this.onFiles(e.dataTransfer.files)}openScrape(){var e;this.uploadOpen=!1,(e=this.renderRoot.querySelector("oppai-scrape-dialog"))==null||e.open()}itemsForKind(e){return this.items.filter(t=>t.kind===e)}get viewerQueue(){return this.viewerList.map(e=>this.items.find(t=>t.id===e)).filter(e=>e!=null)}render(){var y;const e=this.search.trim().length>0,t=this.selectedId!=null,i=!t&&this.section==="settings"&&!e,a=!t&&this.section==="browse"&&!e,o=!t&&this.section==="imagegen"&&!e,r=!t&&this.section==="chat"&&!e,n=!t&&this.section==="favorites"&&!e,d=!t&&this.section==="home"&&!e&&!n,p=!t&&e,f=!t&&!d&&!n&&!p&&!i&&!a&&!o&&!r,g=t?this.items.find(C=>C.id===this.selectedId)??null:null;let m="Library";return t?m=g?g.title:"Library":p?m="Search results":i?m="Settings":a?m="Browse sources":o?m="Create":r?m="Chat with Libby":n?m="Favorites":d?m="Library":m=((y=Z[this.section])==null?void 0:y.label)??"Library",s`
      ${this.renderNav()}
      <div class="main-col">
        ${this.renderHeader(m,e,t,i)}
        <main class=${r?"flush":""}>
          ${d?this.renderHome():l}
          ${i?s`<oppai-settings .user=${this.user}></oppai-settings>`:l}
          ${a?s`<oppai-browse @imported=${()=>this.refresh()}></oppai-browse>`:l}
          ${o?s`<oppai-imagegen @imported=${()=>this.refresh()}></oppai-imagegen>`:l}
          ${r?s`<oppai-chat .user=${this.user}></oppai-chat>`:l}
          ${f||n||p?this.renderGrid(f,n,p):l}
          ${t&&g?s`<oppai-viewer
                .media=${g}
                .queue=${this.viewerQueue}
                .favorite=${this.favorites.has(g.id)}
                @toggle-favorite=${()=>this.toggleFavorite(g.id)}
                @navigate=${C=>this.stepItem(C.detail.dir)}
                @jump=${C=>this.selectedId=C.detail.id}
                @changed=${()=>this.refresh()}
                @deleted=${()=>{this.closeItem(),this.refresh()}}
              ></oppai-viewer>`:l}
          ${t&&!g?s`<div class="empty">Item not found.</div>`:l}
        </main>
      </div>
      ${this.renderUpload()}
      ${this.renderBulkBar()}
      ${this.renderDownloads()}
      <oppai-scrape-dialog @imported=${()=>this.refresh()}></oppai-scrape-dialog>
      <oppai-context-menu></oppai-context-menu>
      <input id="file" type="file" multiple @change=${this.onFileInput} />
    `}renderDownloads(){return this.downloads.length===0?l:s`<aside class="download-area" aria-label="Downloads">
      <div class="download-heading">Downloads</div>
      ${this.downloads.slice(0,5).map(e=>s`
        <div class="download-row">
          <div class="download-ring" style=${`--p:${e.progress}`}>
            <span class="material-symbols-rounded">${e.state==="done"?"check":e.state==="error"?"error":"download"}</span>
          </div>
          <div class="download-copy">
            <div class="download-title">${e.label}</div>
            <div class="download-status">${e.state==="running"?`${Math.round(e.progress*100)}% · running in background`:e.state==="done"?"Complete":e.error||"Failed"}</div>
          </div>
          ${e.state!=="running"?s`<button class="download-dismiss" title="Dismiss" @click=${()=>yn(e.id)}>
            <span class="material-symbols-rounded">close</span>
          </button>`:l}
        </div>`)}
    </aside>`}renderBulkBar(){if(!this.selectMode||this.selected.size===0)return l;const e=this.selected.size;return s`
      <div class="bulk-bar">
        <span class="bulk-count">${e} selected</span>
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
    `}renderNav(){var i,a;const e=(((i=this.user)==null?void 0:i.username)??"?").slice(0,2).toUpperCase(),t=this.section==="settings"&&this.selectedId==null;return s`
      <nav>
        <button class="logo" title="OppaiLib" @click=${()=>this.selectSection("home")}>
          ${$o}
        </button>
        <button class="add-btn" title="Add media" @click=${this.toggleUpload}>
          <span class="material-symbols-rounded" style="font-size:26px;">add</span>
        </button>

        <div class="nav-list">
          ${al.map(o=>{const r=this.section===o.id&&this.selectedId==null;return s`
              <button class="nav-item" @click=${()=>this.selectSection(o.id)}>
                <span
                  class="nav-pill"
                  style="background:${r?"var(--oppai-primary-container)":"transparent"};"
                >
                  <span
                    class="material-symbols-rounded ${r?"fill-icon":""}"
                    style="font-size:22px; color:${r?"var(--oppai-primary-bright)":"var(--oppai-text-dim)"};"
                    >${o.icon}</span
                  >
                </span>
                <span class="nav-label" style="color:${r?"var(--oppai-text)":"var(--oppai-text-muted)"};"
                  >${o.label}</span
                >
              </button>
            `})}
        </div>

        <div style="flex:1;"></div>

        <button
          class="icon-btn"
          title="Settings"
          @click=${()=>this.selectSection("settings")}
          style="width:48px; height:48px; border-radius:24px; background:${t?"var(--oppai-primary-container)":"var(--oppai-surface-2)"}; color:${t?"var(--oppai-primary-bright)":"var(--oppai-text-dim)"};"
        >
          <span class="material-symbols-rounded ${t?"fill-icon":""}" style="font-size:22px;"
            >settings</span
          >
        </button>
        <button
          class="icon-btn"
          title="Sign out (${(a=this.user)==null?void 0:a.username})"
          @click=${this.logout}
          style="width:40px; height:40px; border-radius:20px; background:var(--oppai-accent); color:var(--oppai-on-accent); font-size:13px; font-weight:600;"
        >
          ${e}
        </button>
      </nav>
    `}renderHeader(e,t,i,a=!1){return s`
      <header>
        ${i?s`<button
              class="icon-btn"
              title="Back"
              @click=${this.closeItem}
              style="width:40px; height:40px; border-radius:20px; background:none; color:var(--oppai-text); flex-shrink:0;"
            >
              <span class="material-symbols-rounded" style="font-size:24px;">arrow_back</span>
            </button>`:l}

        <h1 class="h-title">${e}</h1>

        <div class="searchbox">
          <span class="material-symbols-rounded" style="font-size:20px; color:var(--oppai-text-dim);">search</span>
          <input
            .value=${this.search}
            @input=${this.onSearchInput}
            placeholder="Search titles, tags, notes..."
          />
          ${t?s`<button
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
    `}renderHome(){const e=new Date().getHours(),t=e<12?"Good morning":e<18?"Good afternoon":"Good evening",i=rt.map(a=>({kind:a,label:Z[a].label,icon:Z[a].icon,items:this.itemsForKind(a).slice(0,12)})).filter(a=>a.items.length>0);return this.loading&&this.items.length===0?s`<div class="empty">Loading your library…</div>`:i.length===0?s`<div>
        <h2 class="greeting">${t}</h2>
        <p class="greeting-sub">Your library is empty — add media or import from a URL.</p>
        <div class="empty">
          <span class="material-symbols-rounded" style="font-size:40px; display:block; margin-bottom:12px;"
            >library_add</span
          >
          <div style="font-size:14px;">Nothing here yet.</div>
        </div>
      </div>`:s`
      <div>
        <h2 class="greeting anim-rise">${t}</h2>
        <p class="greeting-sub anim-rise" style="animation-delay:40ms;">
          Here's what's new across your library
        </p>
        ${i.map((a,o)=>s`
            <section class="row anim-rise" style="animation-delay:${80+o*70}ms;">
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
                ${a.items.map(r=>this.renderTile(r,"200px",void 0,a.items))}
              </div>
            </section>
          `)}
      </div>
    `}renderGrid(e,t,i){var d;let a="",o=[],r=[];if(t)a="Favorites",o=this.items.filter(p=>this.favorites.has(p.id));else if(i){a="Search results";const p=this.search.trim().toLowerCase().split(/\s+/).filter(Boolean);o=this.items.filter(f=>rl(f,p))}else{const p=this.section;a=((d=Z[p])==null?void 0:d.label)??"";const f=this.itemsForKind(p),g=Array.from(new Set(f.flatMap(y=>(y.tags??[]).map(C=>C.name)))).slice(0,8),m=this.filters[p]??"All";r=["All",...g].map(y=>({label:y,active:m===y})),o=m==="All"?f:f.filter(y=>(y.tags??[]).some(C=>C.name===m))}const n=`${o.length} ${o.length===1?"item":"items"}`;return s`
      <div>
        <div class="grid-head">
          <h2 class="grid-title">${a}</h2>
          <span class="grid-count">${n}</span>
        </div>

        ${e&&r.length>1?s`<div class="chips">
              ${r.map(p=>s`<button
                  class="chip"
                  @click=${()=>this.setFilter(this.section,p.label)}
                  style="background:${p.active?"var(--oppai-accent)":"transparent"}; color:${p.active?"var(--oppai-on-accent)":"var(--oppai-text-dim)"}; border:1px solid ${p.active?"var(--oppai-accent)":"var(--oppai-border-strong)"};"
                >
                  ${p.active?s`<span class="material-symbols-rounded" style="font-size:16px;">check</span>`:l}
                  ${p.label}
                </button>`)}
            </div>`:s`<div style="height:24px;"></div>`}

        ${o.length===0?s`<div class="empty">
              <span class="material-symbols-rounded" style="font-size:40px; display:block; margin-bottom:12px;"
                >${t?"favorite_border":"search_off"}</span
              >
              <div style="font-size:14px;">
                ${t?"No favorites yet. Tap the heart on any item.":"No items match your search or filter."}
              </div>
            </div>`:s`<div class="grid">
              ${o.map((p,f)=>this.renderTile(p,"100%",f,o))}
            </div>`}
      </div>
    `}renderTile(e,t,i,a){const o=Z[e.kind],r=this.favorites.has(e.id),n=Co(e),d=i!=null?"anim-rise":"",p=i!=null?`animation-delay:${Math.min(i,12)*45}ms;`:"",f=this.selected.has(e.id),g=`tile ${d} ${this.selectMode?"selecting":""} ${f?"selected":""}`;return s`
      <div
        class=${g}
        data-id=${e.id}
        @click=${()=>this.selectMode?this.toggleSelected(e.id):this.openItem(e.id,a)}
        style="flex-shrink:0; width:${t}; ${p}"
      >
        <div
          class="tile-media"
          style="width:100%; aspect-ratio:${o.aspect}; background:${Fe(e)};"
        >
          ${$n(e)?s`<img loading="lazy" src=${u.thumbURL(e.id)} alt=${e.title} />`:s`<div class="tile-overlay">
                <span class="material-symbols-rounded" style="font-size:30px; color:#fff;"
                  >${o.icon}</span
                >
                <span class="type-label">${o.typeLabel}</span>
              </div>`}
          ${this.selectMode?s`<div class="select-check ${f?"on":""}">
                ${f?s`<span class="material-symbols-rounded">check</span>`:l}
              </div>`:s`<button
                class="fav-btn ${r?"is-fav":""}"
                @click=${m=>this.toggleFavorite(e.id,m)}
              >
                <span
                  class="material-symbols-rounded fill-icon"
                  style="font-size:18px; color:${r?"var(--oppai-fav)":"rgba(255,255,255,0.9)"};"
                  >${r?"favorite":"favorite_border"}</span
                >
              </button>`}
          ${n?s`<span class="tile-stat">${n}</span>`:l}
        </div>
        <div class="tile-meta">
          <div class="tile-title">${e.title}</div>
          <div class="tile-tag">${_n(e)}</div>
        </div>
      </div>
    `}renderUpload(){return this.uploadOpen?s`
      <div class="scrim" @click=${this.toggleUpload}>
        <div class="dialog" @click=${e=>e.stopPropagation()}>
          <h2>Upload media</h2>
          <div
            class="dropzone ${this.dragActive?"drag":""}"
            @click=${this.browse}
            @dragover=${e=>{e.preventDefault(),this.dragActive=!0}}
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
    `:l}};H.styles=[ye,ce,$`
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
      /* Chat is a full-bleed client, not a card inside the library shell: it
         owns its own scrolling regions, so the shell's padding and scrollbar
         would produce a nested-scroller feel and a visible inset frame. */
      main.flush {
        padding: 0;
        overflow: hidden;
        min-height: 0;
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
    `];X([v({attribute:!1})],H.prototype,"user",2);X([c()],H.prototype,"items",2);X([c()],H.prototype,"loading",2);X([c()],H.prototype,"section",2);X([c()],H.prototype,"selectedId",2);X([c()],H.prototype,"search",2);X([c()],H.prototype,"filters",2);X([c()],H.prototype,"favorites",2);X([c()],H.prototype,"uploadOpen",2);X([c()],H.prototype,"dragActive",2);X([c()],H.prototype,"selectMode",2);X([c()],H.prototype,"selected",2);X([c()],H.prototype,"busy",2);X([c()],H.prototype,"downloads",2);H=X([I("oppai-library")],H);var sl=Object.defineProperty,nl=Object.getOwnPropertyDescriptor,Oe=(e,t,i,a)=>{for(var o=a>1?void 0:a?nl(t,i):t,r=e.length-1,n;r>=0;r--)(n=e[r])&&(o=(a?n(t,i,o):n(o))||o);return a&&o&&sl(t,i,o),o};const ll=6e4;let fe=class extends _{constructor(){super(...arguments),this.user=null,this.ready=!1,this.mascotMessage="",this.mascotTone="success",this.mascotEmotion="",this.mascotIntensity=0,this.onMascot=e=>{const t=e.detail;this.mascotMessage=t.message,this.mascotTone=t.tone,this.mascotEmotion=t.emotion??"",this.mascotIntensity=t.intensity??0,this.mascotTimer&&clearTimeout(this.mascotTimer),this.mascotTimer=window.setTimeout(()=>this.mascotMessage="",5e3)},this.onImported=e=>{var o;const t=Math.max(1,((o=e.detail)==null?void 0:o.count)??1),i=Qs(t>1?2:1),a=Q("import",{intensity:i,count:t});F(a.message,"success",{emotion:a.emotion,intensity:a.intensity})},this.onLibbyPref=()=>this.requestUpdate(),this.onLogout=()=>{this.user=null,this.stopProbe()},this.onVisible=()=>{document.visibilityState==="visible"&&this.user&&this.probe()}}connectedCallback(){super.connectedCallback(),window.addEventListener("oppai-logout",this.onLogout),window.addEventListener("oppai-mascot",this.onMascot),window.addEventListener("oppai-libby-pref",this.onLibbyPref),window.addEventListener("imported",this.onImported),document.addEventListener("visibilitychange",this.onVisible),this.bootstrap()}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("oppai-logout",this.onLogout),window.removeEventListener("oppai-mascot",this.onMascot),window.removeEventListener("oppai-libby-pref",this.onLibbyPref),window.removeEventListener("imported",this.onImported),document.removeEventListener("visibilitychange",this.onVisible),this.stopProbe(),this.mascotTimer&&clearTimeout(this.mascotTimer)}async bootstrap(){if(Bi())try{this.user=await u.me(),this.startProbe()}catch{Pt(null)}this.ready=!0}async probe(){if(Bi())try{await u.me()}catch{}}startProbe(){this.stopProbe(),this.probeTimer=window.setInterval(()=>void this.probe(),ll)}stopProbe(){this.probeTimer&&(clearInterval(this.probeTimer),this.probeTimer=void 0)}onLoggedIn(e){this.mascotMessage="",this.user=e.detail,this.startProbe()}async logout(){try{await u.logout()}catch{}Pt(null),this.user=null,this.stopProbe()}render(){const e=Ne(),t=this.mascotEmotion?{emotion:this.mascotEmotion,intensity:this.mascotIntensity||1}:ho(this.mascotMessage),i=Ot(t.emotion,t.intensity),a=this.mascotMessage?s`<div class="mascot-talk ${this.mascotTone} ${e?"plain":""}">
          <div class="speech" role=${this.mascotTone==="error"?"alert":"status"}>
            ${e?null:s`<span class="libby-name">LIBBY</span>`}${this.mascotMessage}
          </div>
          ${e?null:s`<img src=${i[0]} data-fallback-index="0" alt=${`Libby feeling ${t.emotion}`}
              @error=${o=>Je(o.target,i)} />`}
        </div>`:null;return this.ready?this.user?s`<oppai-library
      .user=${this.user}
      @logout=${this.logout}
    ></oppai-library>${a}`:s`<oppai-login @logged-in=${this.onLoggedIn}></oppai-login>`:s`<div class="center"><md-circular-progress indeterminate></md-circular-progress></div>${a}`}};fe.styles=$`
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
  `;Oe([c()],fe.prototype,"user",2);Oe([c()],fe.prototype,"ready",2);Oe([c()],fe.prototype,"mascotMessage",2);Oe([c()],fe.prototype,"mascotTone",2);Oe([c()],fe.prototype,"mascotEmotion",2);Oe([c()],fe.prototype,"mascotIntensity",2);fe=Oe([I("oppai-app")],fe);const Po=document.createElement("style");Po.textContent=Ks;document.head.appendChild(Po);document.adoptedStyleSheets=[...document.adoptedStyleSheets,Ys.styleSheet];Wt(tt());Vs();
