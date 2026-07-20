(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function r(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(o){if(o.ep)return;o.ep=!0;const a=r(o);fetch(o.href,a)}})();function l(t,e,r,i){var o=arguments.length,a=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,r):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")a=Reflect.decorate(t,e,r,i);else for(var c=t.length-1;c>=0;c--)(s=t[c])&&(a=(o<3?s(a):o>3?s(e,r,a):s(e,r))||a);return o>3&&a&&Object.defineProperty(e,r,a),a}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const k=t=>(e,r)=>{r!==void 0?r.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const at=globalThis,nr=at.ShadowRoot&&(at.ShadyCSS===void 0||at.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,lr=Symbol(),kr=new WeakMap;let Wr=class{constructor(e,r,i){if(this._$cssResult$=!0,i!==lr)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=r}get styleSheet(){let e=this.o;const r=this.t;if(nr&&e===void 0){const i=r!==void 0&&r.length===1;i&&(e=kr.get(r)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&kr.set(r,e))}return e}toString(){return this.cssText}};const Oi=t=>new Wr(typeof t=="string"?t:t+"",void 0,lr),y=(t,...e)=>{const r=t.length===1?t[0]:e.reduce((i,o,a)=>i+(s=>{if(s._$cssResult$===!0)return s.cssText;if(typeof s=="number")return s;throw Error("Value passed to 'css' function must be a 'css' function result: "+s+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+t[a+1],t[0]);return new Wr(r,t,lr)},Pi=(t,e)=>{if(nr)t.adoptedStyleSheets=e.map(r=>r instanceof CSSStyleSheet?r:r.styleSheet);else for(const r of e){const i=document.createElement("style"),o=at.litNonce;o!==void 0&&i.setAttribute("nonce",o),i.textContent=r.cssText,t.appendChild(i)}},Cr=nr?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let r="";for(const i of e.cssRules)r+=i.cssText;return Oi(r)})(t):t;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Mi,defineProperty:Di,getOwnPropertyDescriptor:Ni,getOwnPropertyNames:Ui,getOwnPropertySymbols:Bi,getPrototypeOf:ji}=Object,le=globalThis,Tr=le.trustedTypes,Gi=Tr?Tr.emptyScript:"",vt=le.reactiveElementPolyfillSupport,Fe=(t,e)=>t,dt={toAttribute(t,e){switch(e){case Boolean:t=t?Gi:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let r=t;switch(e){case Boolean:r=t!==null;break;case Number:r=t===null?null:Number(t);break;case Object:case Array:try{r=JSON.parse(t)}catch{r=null}}return r}},dr=(t,e)=>!Mi(t,e),zr={attribute:!0,type:String,converter:dt,reflect:!1,useDefault:!1,hasChanged:dr};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),le.litPropertyMetadata??(le.litPropertyMetadata=new WeakMap);let $e=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,r=zr){if(r.state&&(r.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((r=Object.create(r)).wrapped=!0),this.elementProperties.set(e,r),!r.noAccessor){const i=Symbol(),o=this.getPropertyDescriptor(e,i,r);o!==void 0&&Di(this.prototype,e,o)}}static getPropertyDescriptor(e,r,i){const{get:o,set:a}=Ni(this.prototype,e)??{get(){return this[r]},set(s){this[r]=s}};return{get:o,set(s){const c=o==null?void 0:o.call(this);a==null||a.call(this,s),this.requestUpdate(e,c,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??zr}static _$Ei(){if(this.hasOwnProperty(Fe("elementProperties")))return;const e=ji(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Fe("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Fe("properties"))){const r=this.properties,i=[...Ui(r),...Bi(r)];for(const o of i)this.createProperty(o,r[o])}const e=this[Symbol.metadata];if(e!==null){const r=litPropertyMetadata.get(e);if(r!==void 0)for(const[i,o]of r)this.elementProperties.set(i,o)}this._$Eh=new Map;for(const[r,i]of this.elementProperties){const o=this._$Eu(r,i);o!==void 0&&this._$Eh.set(o,r)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const r=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const o of i)r.unshift(Cr(o))}else e!==void 0&&r.push(Cr(e));return r}static _$Eu(e,r){const i=r.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(r=>this.enableUpdating=r),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(r=>r(this))}addController(e){var r;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((r=e.hostConnected)==null||r.call(e))}removeController(e){var r;(r=this._$EO)==null||r.delete(e)}_$E_(){const e=new Map,r=this.constructor.elementProperties;for(const i of r.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Pi(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(r=>{var i;return(i=r.hostConnected)==null?void 0:i.call(r)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(r=>{var i;return(i=r.hostDisconnected)==null?void 0:i.call(r)})}attributeChangedCallback(e,r,i){this._$AK(e,i)}_$ET(e,r){var a;const i=this.constructor.elementProperties.get(e),o=this.constructor._$Eu(e,i);if(o!==void 0&&i.reflect===!0){const s=(((a=i.converter)==null?void 0:a.toAttribute)!==void 0?i.converter:dt).toAttribute(r,i.type);this._$Em=e,s==null?this.removeAttribute(o):this.setAttribute(o,s),this._$Em=null}}_$AK(e,r){var a,s;const i=this.constructor,o=i._$Eh.get(e);if(o!==void 0&&this._$Em!==o){const c=i.getPropertyOptions(o),h=typeof c.converter=="function"?{fromAttribute:c.converter}:((a=c.converter)==null?void 0:a.fromAttribute)!==void 0?c.converter:dt;this._$Em=o;const v=h.fromAttribute(r,c.type);this[o]=v??((s=this._$Ej)==null?void 0:s.get(o))??v,this._$Em=null}}requestUpdate(e,r,i,o=!1,a){var s;if(e!==void 0){const c=this.constructor;if(o===!1&&(a=this[e]),i??(i=c.getPropertyOptions(e)),!((i.hasChanged??dr)(a,r)||i.useDefault&&i.reflect&&a===((s=this._$Ej)==null?void 0:s.get(e))&&!this.hasAttribute(c._$Eu(e,i))))return;this.C(e,r,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,r,{useDefault:i,reflect:o,wrapped:a},s){i&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,s??r??this[e]),a!==!0||s!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(r=void 0),this._$AL.set(e,r)),o===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(r){Promise.reject(r)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[a,s]of this._$Ep)this[a]=s;this._$Ep=void 0}const o=this.constructor.elementProperties;if(o.size>0)for(const[a,s]of o){const{wrapped:c}=s,h=this[a];c!==!0||this._$AL.has(a)||h===void 0||this.C(a,void 0,s,h)}}let e=!1;const r=this._$AL;try{e=this.shouldUpdate(r),e?(this.willUpdate(r),(i=this._$EO)==null||i.forEach(o=>{var a;return(a=o.hostUpdate)==null?void 0:a.call(o)}),this.update(r)):this._$EM()}catch(o){throw e=!1,this._$EM(),o}e&&this._$AE(r)}willUpdate(e){}_$AE(e){var r;(r=this._$EO)==null||r.forEach(i=>{var o;return(o=i.hostUpdated)==null?void 0:o.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(r=>this._$ET(r,this[r]))),this._$EM()}updated(e){}firstUpdated(e){}};$e.elementStyles=[],$e.shadowRootOptions={mode:"open"},$e[Fe("elementProperties")]=new Map,$e[Fe("finalized")]=new Map,vt==null||vt({ReactiveElement:$e}),(le.reactiveElementVersions??(le.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Hi={attribute:!0,type:String,converter:dt,reflect:!1,hasChanged:dr},qi=(t=Hi,e,r)=>{const{kind:i,metadata:o}=r;let a=globalThis.litPropertyMetadata.get(o);if(a===void 0&&globalThis.litPropertyMetadata.set(o,a=new Map),i==="setter"&&((t=Object.create(t)).wrapped=!0),a.set(r.name,t),i==="accessor"){const{name:s}=r;return{set(c){const h=e.get.call(this);e.set.call(this,c),this.requestUpdate(s,h,t,!0,c)},init(c){return c!==void 0&&this.C(s,void 0,t,c),c}}}if(i==="setter"){const{name:s}=r;return function(c){const h=this[s];e.call(this,c),this.requestUpdate(s,h,t,!0,c)}}throw Error("Unsupported decorator location: "+i)};function u(t){return(e,r)=>typeof r=="object"?qi(t,e,r):((i,o,a)=>{const s=o.hasOwnProperty(a);return o.constructor.createProperty(a,i),s?Object.getOwnPropertyDescriptor(o,a):void 0})(t,e,r)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function p(t){return u({...t,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ht=(t,e,r)=>(r.configurable=!0,r.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(t,e,r),r);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function z(t,e){return(r,i,o)=>{const a=s=>{var c;return((c=s.renderRoot)==null?void 0:c.querySelector(t))??null};return ht(r,i,{get(){return a(this)}})}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let Vi;function Ki(t){return(e,r)=>ht(e,r,{get(){return(this.renderRoot??Vi??(Vi=document.createDocumentFragment())).querySelectorAll(t)}})}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function de(t){return(e,r)=>{const{slot:i,selector:o}=t??{},a="slot"+(i?`[name=${i}]`:":not([name])");return ht(e,r,{get(){var h;const s=(h=this.renderRoot)==null?void 0:h.querySelector(a),c=(s==null?void 0:s.assignedElements(t))??[];return o===void 0?c:c.filter(v=>v.matches(o))}})}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Wi(t){return(e,r)=>{const{slot:i}=t??{},o="slot"+(i?`[name=${i}]`:":not([name])");return ht(e,r,{get(){var s;const a=(s=this.renderRoot)==null?void 0:s.querySelector(o);return(a==null?void 0:a.assignedNodes(t))??[]}})}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Re=globalThis,Ar=t=>t,ct=Re.trustedTypes,Sr=ct?ct.createPolicy("lit-html",{createHTML:t=>t}):void 0,Yr="$lit$",ne=`lit$${Math.random().toFixed(9).slice(2)}$`,Zr="?"+ne,Yi=`<${Zr}>`,ye=document,Pe=()=>ye.createComment(""),Me=t=>t===null||typeof t!="object"&&typeof t!="function",cr=Array.isArray,Zi=t=>cr(t)||typeof(t==null?void 0:t[Symbol.iterator])=="function",ft=`[ 	
\f\r]`,Se=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ir=/-->/g,Er=/>/g,fe=RegExp(`>|${ft}(?:([^\\s"'>=/]+)(${ft}*=${ft}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Lr=/'/g,Fr=/"/g,Jr=/^(?:script|style|textarea|title)$/i,Ji=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),n=Ji(1),q=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),Rr=new WeakMap,ge=ye.createTreeWalker(ye,129);function Xr(t,e){if(!cr(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Sr!==void 0?Sr.createHTML(e):e}const Xi=(t,e)=>{const r=t.length-1,i=[];let o,a=e===2?"<svg>":e===3?"<math>":"",s=Se;for(let c=0;c<r;c++){const h=t[c];let v,f,m=-1,b=0;for(;b<h.length&&(s.lastIndex=b,f=s.exec(h),f!==null);)b=s.lastIndex,s===Se?f[1]==="!--"?s=Ir:f[1]!==void 0?s=Er:f[2]!==void 0?(Jr.test(f[2])&&(o=RegExp("</"+f[2],"g")),s=fe):f[3]!==void 0&&(s=fe):s===fe?f[0]===">"?(s=o??Se,m=-1):f[1]===void 0?m=-2:(m=s.lastIndex-f[2].length,v=f[1],s=f[3]===void 0?fe:f[3]==='"'?Fr:Lr):s===Fr||s===Lr?s=fe:s===Ir||s===Er?s=Se:(s=fe,o=void 0);const $=s===fe&&t[c+1].startsWith("/>")?" ":"";a+=s===Se?h+Yi:m>=0?(i.push(v),h.slice(0,m)+Yr+h.slice(m)+ne+$):h+ne+(m===-2?c:$)}return[Xr(t,a+(t[r]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]};class De{constructor({strings:e,_$litType$:r},i){let o;this.parts=[];let a=0,s=0;const c=e.length-1,h=this.parts,[v,f]=Xi(e,r);if(this.el=De.createElement(v,i),ge.currentNode=this.el.content,r===2||r===3){const m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(o=ge.nextNode())!==null&&h.length<c;){if(o.nodeType===1){if(o.hasAttributes())for(const m of o.getAttributeNames())if(m.endsWith(Yr)){const b=f[s++],$=o.getAttribute(m).split(ne),H=/([.?@])?(.*)/.exec(b);h.push({type:1,index:a,name:H[2],strings:$,ctor:H[1]==="."?eo:H[1]==="?"?to:H[1]==="@"?ro:ut}),o.removeAttribute(m)}else m.startsWith(ne)&&(h.push({type:6,index:a}),o.removeAttribute(m));if(Jr.test(o.tagName)){const m=o.textContent.split(ne),b=m.length-1;if(b>0){o.textContent=ct?ct.emptyScript:"";for(let $=0;$<b;$++)o.append(m[$],Pe()),ge.nextNode(),h.push({type:2,index:++a});o.append(m[b],Pe())}}}else if(o.nodeType===8)if(o.data===Zr)h.push({type:2,index:a});else{let m=-1;for(;(m=o.data.indexOf(ne,m+1))!==-1;)h.push({type:7,index:a}),m+=ne.length-1}a++}}static createElement(e,r){const i=ye.createElement("template");return i.innerHTML=e,i}}function Ce(t,e,r=t,i){var s,c;if(e===q)return e;let o=i!==void 0?(s=r._$Co)==null?void 0:s[i]:r._$Cl;const a=Me(e)?void 0:e._$litDirective$;return(o==null?void 0:o.constructor)!==a&&((c=o==null?void 0:o._$AO)==null||c.call(o,!1),a===void 0?o=void 0:(o=new a(t),o._$AT(t,r,i)),i!==void 0?(r._$Co??(r._$Co=[]))[i]=o:r._$Cl=o),o!==void 0&&(e=Ce(t,o._$AS(t,e.values),o,i)),e}class Qi{constructor(e,r){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:r},parts:i}=this._$AD,o=((e==null?void 0:e.creationScope)??ye).importNode(r,!0);ge.currentNode=o;let a=ge.nextNode(),s=0,c=0,h=i[0];for(;h!==void 0;){if(s===h.index){let v;h.type===2?v=new je(a,a.nextSibling,this,e):h.type===1?v=new h.ctor(a,h.name,h.strings,this,e):h.type===6&&(v=new io(a,this,e)),this._$AV.push(v),h=i[++c]}s!==(h==null?void 0:h.index)&&(a=ge.nextNode(),s++)}return ge.currentNode=ye,o}p(e){let r=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,r),r+=i.strings.length-2):i._$AI(e[r])),r++}}class je{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,r,i,o){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=e,this._$AB=r,this._$AM=i,this.options=o,this._$Cv=(o==null?void 0:o.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const r=this._$AM;return r!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=r.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,r=this){e=Ce(this,e,r),Me(e)?e===d||e==null||e===""?(this._$AH!==d&&this._$AR(),this._$AH=d):e!==this._$AH&&e!==q&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Zi(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==d&&Me(this._$AH)?this._$AA.nextSibling.data=e:this.T(ye.createTextNode(e)),this._$AH=e}$(e){var a;const{values:r,_$litType$:i}=e,o=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=De.createElement(Xr(i.h,i.h[0]),this.options)),i);if(((a=this._$AH)==null?void 0:a._$AD)===o)this._$AH.p(r);else{const s=new Qi(o,this),c=s.u(this.options);s.p(r),this.T(c),this._$AH=s}}_$AC(e){let r=Rr.get(e.strings);return r===void 0&&Rr.set(e.strings,r=new De(e)),r}k(e){cr(this._$AH)||(this._$AH=[],this._$AR());const r=this._$AH;let i,o=0;for(const a of e)o===r.length?r.push(i=new je(this.O(Pe()),this.O(Pe()),this,this.options)):i=r[o],i._$AI(a),o++;o<r.length&&(this._$AR(i&&i._$AB.nextSibling,o),r.length=o)}_$AR(e=this._$AA.nextSibling,r){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,r);e!==this._$AB;){const o=Ar(e).nextSibling;Ar(e).remove(),e=o}}setConnected(e){var r;this._$AM===void 0&&(this._$Cv=e,(r=this._$AP)==null||r.call(this,e))}}class ut{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,r,i,o,a){this.type=1,this._$AH=d,this._$AN=void 0,this.element=e,this.name=r,this._$AM=o,this.options=a,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=d}_$AI(e,r=this,i,o){const a=this.strings;let s=!1;if(a===void 0)e=Ce(this,e,r,0),s=!Me(e)||e!==this._$AH&&e!==q,s&&(this._$AH=e);else{const c=e;let h,v;for(e=a[0],h=0;h<a.length-1;h++)v=Ce(this,c[i+h],r,h),v===q&&(v=this._$AH[h]),s||(s=!Me(v)||v!==this._$AH[h]),v===d?e=d:e!==d&&(e+=(v??"")+a[h+1]),this._$AH[h]=v}s&&!o&&this.j(e)}j(e){e===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class eo extends ut{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===d?void 0:e}}class to extends ut{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==d)}}class ro extends ut{constructor(e,r,i,o,a){super(e,r,i,o,a),this.type=5}_$AI(e,r=this){if((e=Ce(this,e,r,0)??d)===q)return;const i=this._$AH,o=e===d&&i!==d||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,a=e!==d&&(i===d||o);o&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var r;typeof this._$AH=="function"?this._$AH.call(((r=this.options)==null?void 0:r.host)??this.element,e):this._$AH.handleEvent(e)}}class io{constructor(e,r,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=r,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Ce(this,e)}}const gt=Re.litHtmlPolyfillSupport;gt==null||gt(De,je),(Re.litHtmlVersions??(Re.litHtmlVersions=[])).push("3.3.3");const Qr=(t,e,r)=>{const i=(r==null?void 0:r.renderBefore)??e;let o=i._$litPart$;if(o===void 0){const a=(r==null?void 0:r.renderBefore)??null;i._$litPart$=o=new je(e.insertBefore(Pe(),a),a,void 0,r??{})}return o._$AI(t),o};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const be=globalThis;let _=class extends $e{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var r;const e=super.createRenderRoot();return(r=this.renderOptions).renderBefore??(r.renderBefore=e.firstChild),e}update(e){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Qr(r,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return q}};var Kr;_._$litElement$=!0,_.finalized=!0,(Kr=be.litElementHydrateSupport)==null||Kr.call(be,{LitElement:_});const bt=be.litElementPolyfillSupport;bt==null||bt({LitElement:_});(be.litElementVersions??(be.litElementVersions=[])).push("4.2.2");/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class oo extends _{connectedCallback(){super.connectedCallback(),this.setAttribute("aria-hidden","true")}render(){return n`<span class="shadow"></span>`}}/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const ao=y`:host,.shadow,.shadow::before,.shadow::after{border-radius:inherit;inset:0;position:absolute;transition-duration:inherit;transition-property:inherit;transition-timing-function:inherit}:host{display:flex;pointer-events:none;transition-property:box-shadow,opacity}.shadow::before,.shadow::after{content:"";transition-property:box-shadow,opacity;--_level: var(--md-elevation-level, 0);--_shadow-color: var(--md-elevation-shadow-color, var(--md-sys-color-shadow, #000))}.shadow::before{box-shadow:0px calc(1px*(clamp(0,var(--_level),1) + clamp(0,var(--_level) - 3,1) + 2*clamp(0,var(--_level) - 4,1))) calc(1px*(2*clamp(0,var(--_level),1) + clamp(0,var(--_level) - 2,1) + clamp(0,var(--_level) - 4,1))) 0px var(--_shadow-color);opacity:.3}.shadow::after{box-shadow:0px calc(1px*(clamp(0,var(--_level),1) + clamp(0,var(--_level) - 1,1) + 2*clamp(0,var(--_level) - 2,3))) calc(1px*(3*clamp(0,var(--_level),2) + 2*clamp(0,var(--_level) - 2,3))) calc(1px*(clamp(0,var(--_level),4) + 2*clamp(0,var(--_level) - 4,1))) var(--_shadow-color);opacity:.15}
`;/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let St=class extends oo{};St.styles=[ao];St=l([k("md-elevation")],St);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const ei=Symbol("attachableController");let st;st=new MutationObserver(t=>{var e;for(const r of t)(e=r.target[ei])==null||e.hostConnected()});class ti{get htmlFor(){return this.host.getAttribute("for")}set htmlFor(e){e===null?this.host.removeAttribute("for"):this.host.setAttribute("for",e)}get control(){return this.host.hasAttribute("for")?!this.htmlFor||!this.host.isConnected?null:this.host.getRootNode().querySelector(`#${this.htmlFor}`):this.currentControl||this.host.parentElement}set control(e){e?this.attach(e):this.detach()}constructor(e,r){this.host=e,this.onControlChange=r,this.currentControl=null,e.addController(this),e[ei]=this,st==null||st.observe(e,{attributeFilter:["for"]})}attach(e){e!==this.currentControl&&(this.setCurrentControl(e),this.host.removeAttribute("for"))}detach(){this.setCurrentControl(null),this.host.setAttribute("for","")}hostConnected(){this.setCurrentControl(this.control)}hostDisconnected(){this.setCurrentControl(null)}setCurrentControl(e){this.onControlChange(this.currentControl,e),this.currentControl=e}}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const so=["focusin","focusout","pointerdown"];class pr extends _{constructor(){super(...arguments),this.visible=!1,this.inward=!1,this.attachableController=new ti(this,this.onControlChange.bind(this))}get htmlFor(){return this.attachableController.htmlFor}set htmlFor(e){this.attachableController.htmlFor=e}get control(){return this.attachableController.control}set control(e){this.attachableController.control=e}attach(e){this.attachableController.attach(e)}detach(){this.attachableController.detach()}connectedCallback(){super.connectedCallback(),this.setAttribute("aria-hidden","true")}handleEvent(e){var r;if(!e[Or]){switch(e.type){default:return;case"focusin":this.visible=((r=this.control)==null?void 0:r.matches(":focus-visible"))??!1;break;case"focusout":case"pointerdown":this.visible=!1;break}e[Or]=!0}}onControlChange(e,r){for(const i of so)e==null||e.removeEventListener(i,this),r==null||r.addEventListener(i,this)}update(e){e.has("visible")&&this.dispatchEvent(new Event("visibility-changed")),super.update(e)}}l([u({type:Boolean,reflect:!0})],pr.prototype,"visible",void 0);l([u({type:Boolean,reflect:!0})],pr.prototype,"inward",void 0);const Or=Symbol("handledByFocusRing");/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const no=y`:host{animation-delay:0s,calc(var(--md-focus-ring-duration, 600ms)*.25);animation-duration:calc(var(--md-focus-ring-duration, 600ms)*.25),calc(var(--md-focus-ring-duration, 600ms)*.75);animation-timing-function:cubic-bezier(0.2, 0, 0, 1);box-sizing:border-box;color:var(--md-focus-ring-color, var(--md-sys-color-secondary, #625b71));display:none;pointer-events:none;position:absolute}:host([visible]){display:flex}:host(:not([inward])){animation-name:outward-grow,outward-shrink;border-end-end-radius:calc(var(--md-focus-ring-shape-end-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));border-end-start-radius:calc(var(--md-focus-ring-shape-end-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));border-start-end-radius:calc(var(--md-focus-ring-shape-start-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));border-start-start-radius:calc(var(--md-focus-ring-shape-start-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));inset:calc(-1*var(--md-focus-ring-outward-offset, 2px));outline:var(--md-focus-ring-width, 3px) solid currentColor}:host([inward]){animation-name:inward-grow,inward-shrink;border-end-end-radius:calc(var(--md-focus-ring-shape-end-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border-end-start-radius:calc(var(--md-focus-ring-shape-end-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border-start-end-radius:calc(var(--md-focus-ring-shape-start-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border-start-start-radius:calc(var(--md-focus-ring-shape-start-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border:var(--md-focus-ring-width, 3px) solid currentColor;inset:var(--md-focus-ring-inward-offset, 0px)}@keyframes outward-grow{from{outline-width:0}to{outline-width:var(--md-focus-ring-active-width, 8px)}}@keyframes outward-shrink{from{outline-width:var(--md-focus-ring-active-width, 8px)}}@keyframes inward-grow{from{border-width:0}to{border-width:var(--md-focus-ring-active-width, 8px)}}@keyframes inward-shrink{from{border-width:var(--md-focus-ring-active-width, 8px)}}@media(prefers-reduced-motion){:host{animation:none}}
`;/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let It=class extends pr{};It.styles=[no];It=l([k("md-focus-ring")],It);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const se={ATTRIBUTE:1,PROPERTY:3,BOOLEAN_ATTRIBUTE:4},hr=t=>(...e)=>({_$litDirective$:t,values:e});let ur=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,r,i){this._$Ct=e,this._$AM=r,this._$Ci=i}_$AS(e,r){return this.update(e,r)}update(e,r){return this.render(...r)}};/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const V=hr(class extends ur{constructor(t){var e;if(super(t),t.type!==se.ATTRIBUTE||t.name!=="class"||((e=t.strings)==null?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){var i,o;if(this.st===void 0){this.st=new Set,t.strings!==void 0&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(a=>a!=="")));for(const a in e)e[a]&&!((i=this.nt)!=null&&i.has(a))&&this.st.add(a);return this.render(e)}const r=t.element.classList;for(const a of this.st)a in e||(r.remove(a),this.st.delete(a));for(const a in e){const s=!!e[a];s===this.st.has(a)||(o=this.nt)!=null&&o.has(a)||(s?(r.add(a),this.st.add(a)):(r.remove(a),this.st.delete(a)))}return q}});/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const xe={STANDARD:"cubic-bezier(0.2, 0, 0, 1)",EMPHASIZED:"cubic-bezier(.3,0,0,1)",EMPHASIZED_ACCELERATE:"cubic-bezier(.3,0,.8,.15)"};/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const lo=450,Pr=225,co=.2,po=10,ho=75,uo=.35,mo="::after",vo="forwards";var N;(function(t){t[t.INACTIVE=0]="INACTIVE",t[t.TOUCH_DELAY=1]="TOUCH_DELAY",t[t.HOLDING=2]="HOLDING",t[t.WAITING_FOR_CLICK=3]="WAITING_FOR_CLICK"})(N||(N={}));const fo=["click","contextmenu","pointercancel","pointerdown","pointerenter","pointerleave","pointerup"],go=150,yt=window.matchMedia("(forced-colors: active)");class Ge extends _{constructor(){super(...arguments),this.disabled=!1,this.hovered=!1,this.pressed=!1,this.rippleSize="",this.rippleScale="",this.initialSize=0,this.state=N.INACTIVE,this.attachableController=new ti(this,this.onControlChange.bind(this))}get htmlFor(){return this.attachableController.htmlFor}set htmlFor(e){this.attachableController.htmlFor=e}get control(){return this.attachableController.control}set control(e){this.attachableController.control=e}attach(e){this.attachableController.attach(e)}detach(){this.attachableController.detach()}connectedCallback(){super.connectedCallback(),this.setAttribute("aria-hidden","true")}render(){const e={hovered:this.hovered,pressed:this.pressed};return n`<div class="surface ${V(e)}"></div>`}update(e){e.has("disabled")&&this.disabled&&(this.hovered=!1,this.pressed=!1),super.update(e)}handlePointerenter(e){this.shouldReactToEvent(e)&&(this.hovered=!0)}handlePointerleave(e){this.shouldReactToEvent(e)&&(this.hovered=!1,this.state!==N.INACTIVE&&this.endPressAnimation())}handlePointerup(e){if(this.shouldReactToEvent(e)){if(this.state===N.HOLDING){this.state=N.WAITING_FOR_CLICK;return}if(this.state===N.TOUCH_DELAY){this.state=N.WAITING_FOR_CLICK,this.startPressAnimation(this.rippleStartEvent);return}}}async handlePointerdown(e){if(this.shouldReactToEvent(e)){if(this.rippleStartEvent=e,!this.isTouch(e)){this.state=N.WAITING_FOR_CLICK,this.startPressAnimation(e);return}this.state=N.TOUCH_DELAY,await new Promise(r=>{setTimeout(r,go)}),this.state===N.TOUCH_DELAY&&(this.state=N.HOLDING,this.startPressAnimation(e))}}handleClick(){if(!this.disabled){if(this.state===N.WAITING_FOR_CLICK){this.endPressAnimation();return}this.state===N.INACTIVE&&(this.startPressAnimation(),this.endPressAnimation())}}handlePointercancel(e){this.shouldReactToEvent(e)&&this.endPressAnimation()}handleContextmenu(){this.disabled||this.endPressAnimation()}determineRippleSize(){const{height:e,width:r}=this.getBoundingClientRect(),i=Math.max(e,r),o=Math.max(uo*i,ho),a=this.currentCSSZoom??1,s=Math.floor(i*co/a),h=Math.sqrt(r**2+e**2)+po;this.initialSize=s;const v=(h+o)/s;this.rippleScale=`${v/a}`,this.rippleSize=`${s}px`}getNormalizedPointerEventCoords(e){const{scrollX:r,scrollY:i}=window,{left:o,top:a}=this.getBoundingClientRect(),s=r+o,c=i+a,{pageX:h,pageY:v}=e,f=this.currentCSSZoom??1;return{x:(h-s)/f,y:(v-c)/f}}getTranslationCoordinates(e){const{height:r,width:i}=this.getBoundingClientRect(),o=this.currentCSSZoom??1,a={x:(i/o-this.initialSize)/2,y:(r/o-this.initialSize)/2};let s;return e instanceof PointerEvent?s=this.getNormalizedPointerEventCoords(e):s={x:i/o/2,y:r/o/2},s={x:s.x-this.initialSize/2,y:s.y-this.initialSize/2},{startPoint:s,endPoint:a}}startPressAnimation(e){var s;if(!this.mdRoot)return;this.pressed=!0,(s=this.growAnimation)==null||s.cancel(),this.determineRippleSize();const{startPoint:r,endPoint:i}=this.getTranslationCoordinates(e),o=`${r.x}px, ${r.y}px`,a=`${i.x}px, ${i.y}px`;this.growAnimation=this.mdRoot.animate({top:[0,0],left:[0,0],height:[this.rippleSize,this.rippleSize],width:[this.rippleSize,this.rippleSize],transform:[`translate(${o}) scale(1)`,`translate(${a}) scale(${this.rippleScale})`]},{pseudoElement:mo,duration:lo,easing:xe.STANDARD,fill:vo})}async endPressAnimation(){this.rippleStartEvent=void 0,this.state=N.INACTIVE;const e=this.growAnimation;let r=1/0;if(typeof(e==null?void 0:e.currentTime)=="number"?r=e.currentTime:e!=null&&e.currentTime&&(r=e.currentTime.to("ms").value),r>=Pr){this.pressed=!1;return}await new Promise(i=>{setTimeout(i,Pr-r)}),this.growAnimation===e&&(this.pressed=!1)}shouldReactToEvent(e){if(this.disabled||!e.isPrimary||this.rippleStartEvent&&this.rippleStartEvent.pointerId!==e.pointerId)return!1;if(e.type==="pointerenter"||e.type==="pointerleave")return!this.isTouch(e);const r=e.buttons===1;return this.isTouch(e)||r}isTouch({pointerType:e}){return e==="touch"}async handleEvent(e){if(!(yt!=null&&yt.matches))switch(e.type){case"click":this.handleClick();break;case"contextmenu":this.handleContextmenu();break;case"pointercancel":this.handlePointercancel(e);break;case"pointerdown":await this.handlePointerdown(e);break;case"pointerenter":this.handlePointerenter(e);break;case"pointerleave":this.handlePointerleave(e);break;case"pointerup":this.handlePointerup(e);break}}onControlChange(e,r){for(const i of fo)e==null||e.removeEventListener(i,this),r==null||r.addEventListener(i,this)}}l([u({type:Boolean,reflect:!0})],Ge.prototype,"disabled",void 0);l([p()],Ge.prototype,"hovered",void 0);l([p()],Ge.prototype,"pressed",void 0);l([z(".surface")],Ge.prototype,"mdRoot",void 0);/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const bo=y`:host{display:flex;margin:auto;pointer-events:none}:host([disabled]){display:none}@media(forced-colors: active){:host{display:none}}:host,.surface{border-radius:inherit;position:absolute;inset:0;overflow:hidden}.surface{-webkit-tap-highlight-color:rgba(0,0,0,0)}.surface::before,.surface::after{content:"";opacity:0;position:absolute}.surface::before{background-color:var(--md-ripple-hover-color, var(--md-sys-color-on-surface, #1d1b20));inset:0;transition:opacity 15ms linear,background-color 15ms linear}.surface::after{background:radial-gradient(closest-side, var(--md-ripple-pressed-color, var(--md-sys-color-on-surface, #1d1b20)) max(100% - 70px, 65%), transparent 100%);transform-origin:center center;transition:opacity 375ms linear}.hovered::before{background-color:var(--md-ripple-hover-color, var(--md-sys-color-on-surface, #1d1b20));opacity:var(--md-ripple-hover-opacity, 0.08)}.pressed::after{opacity:var(--md-ripple-pressed-opacity, 0.12);transition-duration:105ms}
`;/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let Et=class extends Ge{};Et.styles=[bo];Et=l([k("md-ripple")],Et);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const ri=["role","ariaAtomic","ariaAutoComplete","ariaBusy","ariaChecked","ariaColCount","ariaColIndex","ariaColSpan","ariaCurrent","ariaDisabled","ariaExpanded","ariaHasPopup","ariaHidden","ariaInvalid","ariaKeyShortcuts","ariaLabel","ariaLevel","ariaLive","ariaModal","ariaMultiLine","ariaMultiSelectable","ariaOrientation","ariaPlaceholder","ariaPosInSet","ariaPressed","ariaReadOnly","ariaRequired","ariaRoleDescription","ariaRowCount","ariaRowIndex","ariaRowSpan","ariaSelected","ariaSetSize","ariaSort","ariaValueMax","ariaValueMin","ariaValueNow","ariaValueText"],yo=ri.map(ii);function xt(t){return yo.includes(t)}function ii(t){return t.replace("aria","aria-").replace(/Elements?/g,"").toLowerCase()}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Ke=Symbol("privateIgnoreAttributeChangesFor");function ce(t){var e;class r extends t{constructor(){super(...arguments),this[e]=new Set}attributeChangedCallback(o,a,s){if(!xt(o)){super.attributeChangedCallback(o,a,s);return}if(this[Ke].has(o))return;this[Ke].add(o),this.removeAttribute(o),this[Ke].delete(o);const c=Ft(o);s===null?delete this.dataset[c]:this.dataset[c]=s,this.requestUpdate(Ft(o),a)}getAttribute(o){return xt(o)?super.getAttribute(Lt(o)):super.getAttribute(o)}removeAttribute(o){super.removeAttribute(o),xt(o)&&(super.removeAttribute(Lt(o)),this.requestUpdate())}}return e=Ke,xo(r),r}function xo(t){for(const e of ri){const r=ii(e),i=Lt(r),o=Ft(r);t.createProperty(e,{attribute:r,noAccessor:!0}),t.createProperty(Symbol(i),{attribute:i,noAccessor:!0}),Object.defineProperty(t.prototype,e,{configurable:!0,enumerable:!0,get(){return this.dataset[o]??null},set(a){const s=this.dataset[o]??null;a!==s&&(a===null?delete this.dataset[o]:this.dataset[o]=a,this.requestUpdate(e,s))}})}}function Lt(t){return`data-${t}`}function Ft(t){return t.replace(/-\w/,e=>e[1].toUpperCase())}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const U=Symbol("internals"),wt=Symbol("privateInternals");function mr(t){class e extends t{get[U](){return this[wt]||(this[wt]=this.attachInternals()),this[wt]}}return e}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function oi(t){t.addInitializer(e=>{const r=e;r.addEventListener("click",async i=>{const{type:o,[U]:a}=r,{form:s}=a;if(!(!s||o==="button")&&(await new Promise(c=>{setTimeout(c)}),!i.defaultPrevented)){if(o==="reset"){s.reset();return}s.addEventListener("submit",c=>{Object.defineProperty(c,"submitter",{configurable:!0,enumerable:!0,get:()=>r})},{capture:!0,once:!0}),a.setFormValue(r.value),s.requestSubmit()}})})}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function wo(t){const e=new MouseEvent("click",{bubbles:!0});return t.dispatchEvent(e),e}function _o(t){return t.currentTarget!==t.target||t.composedPath()[0]!==t.target||t.target.disabled?!1:!$o(t)}function $o(t){const e=Rt;return e&&(t.preventDefault(),t.stopImmediatePropagation()),ko(),e}let Rt=!1;async function ko(){Rt=!0,await null,Rt=!1}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Co=ce(mr(_));class M extends Co{get name(){return this.getAttribute("name")??""}set name(e){this.setAttribute("name",e)}get form(){return this[U].form}constructor(){super(),this.disabled=!1,this.softDisabled=!1,this.href="",this.download="",this.target="",this.trailingIcon=!1,this.hasIcon=!1,this.type="submit",this.value="",this.addEventListener("click",this.handleClick.bind(this))}focus(){var e;(e=this.buttonElement)==null||e.focus()}blur(){var e;(e=this.buttonElement)==null||e.blur()}render(){var o;const e=this.disabled||this.softDisabled,r=this.href?this.renderLink():this.renderButton(),i=this.href?"link":"button";return n`
      ${(o=this.renderElevationOrOutline)==null?void 0:o.call(this)}
      <div class="background"></div>
      <md-focus-ring part="focus-ring" for=${i}></md-focus-ring>
      <md-ripple
        part="ripple"
        for=${i}
        ?disabled="${e}"></md-ripple>
      ${r}
    `}renderButton(){const{ariaLabel:e,ariaHasPopup:r,ariaExpanded:i}=this;return n`<button
      id="button"
      class="button"
      ?disabled=${this.disabled}
      aria-disabled=${this.softDisabled||d}
      aria-label="${e||d}"
      aria-haspopup="${r||d}"
      aria-expanded="${i||d}">
      ${this.renderContent()}
    </button>`}renderLink(){const{ariaLabel:e,ariaHasPopup:r,ariaExpanded:i}=this;return n`<a
      id="link"
      class="button"
      aria-label="${e||d}"
      aria-haspopup="${r||d}"
      aria-expanded="${i||d}"
      aria-disabled=${this.disabled||this.softDisabled||d}
      tabindex="${this.disabled&&!this.softDisabled?-1:d}"
      href=${this.href}
      download=${this.download||d}
      target=${this.target||d}
      >${this.renderContent()}
    </a>`}renderContent(){const e=n`<slot
      name="icon"
      @slotchange="${this.handleSlotChange}"></slot>`;return n`
      <span class="touch"></span>
      ${this.trailingIcon?d:e}
      <span class="label"><slot></slot></span>
      ${this.trailingIcon?e:d}
    `}handleClick(e){if(this.softDisabled||this.disabled&&this.href){e.stopImmediatePropagation(),e.preventDefault();return}!_o(e)||!this.buttonElement||(this.focus(),wo(this.buttonElement))}handleSlotChange(){this.hasIcon=this.assignedIcons.length>0}}oi(M);M.formAssociated=!0;M.shadowRootOptions={mode:"open",delegatesFocus:!0};l([u({type:Boolean,reflect:!0})],M.prototype,"disabled",void 0);l([u({type:Boolean,attribute:"soft-disabled",reflect:!0})],M.prototype,"softDisabled",void 0);l([u()],M.prototype,"href",void 0);l([u()],M.prototype,"download",void 0);l([u()],M.prototype,"target",void 0);l([u({type:Boolean,attribute:"trailing-icon",reflect:!0})],M.prototype,"trailingIcon",void 0);l([u({type:Boolean,attribute:"has-icon",reflect:!0})],M.prototype,"hasIcon",void 0);l([u()],M.prototype,"type",void 0);l([u({reflect:!0})],M.prototype,"value",void 0);l([z(".button")],M.prototype,"buttonElement",void 0);l([de({slot:"icon",flatten:!0})],M.prototype,"assignedIcons",void 0);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class To extends M{renderElevationOrOutline(){return n`<md-elevation part="elevation"></md-elevation>`}}/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const zo=y`:host{--_container-color: var(--md-filled-button-container-color, var(--md-sys-color-primary, #6750a4));--_container-elevation: var(--md-filled-button-container-elevation, 0);--_container-height: var(--md-filled-button-container-height, 40px);--_container-shadow-color: var(--md-filled-button-container-shadow-color, var(--md-sys-color-shadow, #000));--_disabled-container-color: var(--md-filled-button-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-container-elevation: var(--md-filled-button-disabled-container-elevation, 0);--_disabled-container-opacity: var(--md-filled-button-disabled-container-opacity, 0.12);--_disabled-label-text-color: var(--md-filled-button-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-filled-button-disabled-label-text-opacity, 0.38);--_focus-container-elevation: var(--md-filled-button-focus-container-elevation, 0);--_focus-label-text-color: var(--md-filled-button-focus-label-text-color, var(--md-sys-color-on-primary, #fff));--_hover-container-elevation: var(--md-filled-button-hover-container-elevation, 1);--_hover-label-text-color: var(--md-filled-button-hover-label-text-color, var(--md-sys-color-on-primary, #fff));--_hover-state-layer-color: var(--md-filled-button-hover-state-layer-color, var(--md-sys-color-on-primary, #fff));--_hover-state-layer-opacity: var(--md-filled-button-hover-state-layer-opacity, 0.08);--_label-text-color: var(--md-filled-button-label-text-color, var(--md-sys-color-on-primary, #fff));--_label-text-font: var(--md-filled-button-label-text-font, var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-filled-button-label-text-line-height, var(--md-sys-typescale-label-large-line-height, 1.25rem));--_label-text-size: var(--md-filled-button-label-text-size, var(--md-sys-typescale-label-large-size, 0.875rem));--_label-text-weight: var(--md-filled-button-label-text-weight, var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)));--_pressed-container-elevation: var(--md-filled-button-pressed-container-elevation, 0);--_pressed-label-text-color: var(--md-filled-button-pressed-label-text-color, var(--md-sys-color-on-primary, #fff));--_pressed-state-layer-color: var(--md-filled-button-pressed-state-layer-color, var(--md-sys-color-on-primary, #fff));--_pressed-state-layer-opacity: var(--md-filled-button-pressed-state-layer-opacity, 0.12);--_disabled-icon-color: var(--md-filled-button-disabled-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-icon-opacity: var(--md-filled-button-disabled-icon-opacity, 0.38);--_focus-icon-color: var(--md-filled-button-focus-icon-color, var(--md-sys-color-on-primary, #fff));--_hover-icon-color: var(--md-filled-button-hover-icon-color, var(--md-sys-color-on-primary, #fff));--_icon-color: var(--md-filled-button-icon-color, var(--md-sys-color-on-primary, #fff));--_icon-size: var(--md-filled-button-icon-size, 18px);--_pressed-icon-color: var(--md-filled-button-pressed-icon-color, var(--md-sys-color-on-primary, #fff));--_container-shape-start-start: var(--md-filled-button-container-shape-start-start, var(--md-filled-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-start-end: var(--md-filled-button-container-shape-start-end, var(--md-filled-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-end: var(--md-filled-button-container-shape-end-end, var(--md-filled-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-start: var(--md-filled-button-container-shape-end-start, var(--md-filled-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_leading-space: var(--md-filled-button-leading-space, 24px);--_trailing-space: var(--md-filled-button-trailing-space, 24px);--_with-leading-icon-leading-space: var(--md-filled-button-with-leading-icon-leading-space, 16px);--_with-leading-icon-trailing-space: var(--md-filled-button-with-leading-icon-trailing-space, 24px);--_with-trailing-icon-leading-space: var(--md-filled-button-with-trailing-icon-leading-space, 24px);--_with-trailing-icon-trailing-space: var(--md-filled-button-with-trailing-icon-trailing-space, 16px)}
`;/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Ao=y`md-elevation{transition-duration:280ms}:host(:is([disabled],[soft-disabled])) md-elevation{transition:none}md-elevation{--md-elevation-level: var(--_container-elevation);--md-elevation-shadow-color: var(--_container-shadow-color)}:host(:focus-within) md-elevation{--md-elevation-level: var(--_focus-container-elevation)}:host(:hover) md-elevation{--md-elevation-level: var(--_hover-container-elevation)}:host(:active) md-elevation{--md-elevation-level: var(--_pressed-container-elevation)}:host(:is([disabled],[soft-disabled])) md-elevation{--md-elevation-level: var(--_disabled-container-elevation)}
`;/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const vr=y`:host{border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end);box-sizing:border-box;cursor:pointer;display:inline-flex;gap:8px;min-height:var(--_container-height);outline:none;padding-block:calc((var(--_container-height) - max(var(--_label-text-line-height),var(--_icon-size)))/2);padding-inline-start:var(--_leading-space);padding-inline-end:var(--_trailing-space);place-content:center;place-items:center;position:relative;font-family:var(--_label-text-font);font-size:var(--_label-text-size);line-height:var(--_label-text-line-height);font-weight:var(--_label-text-weight);text-overflow:ellipsis;text-wrap:nowrap;user-select:none;-webkit-tap-highlight-color:rgba(0,0,0,0);vertical-align:top;--md-ripple-hover-color: var(--_hover-state-layer-color);--md-ripple-pressed-color: var(--_pressed-state-layer-color);--md-ripple-hover-opacity: var(--_hover-state-layer-opacity);--md-ripple-pressed-opacity: var(--_pressed-state-layer-opacity)}md-focus-ring{--md-focus-ring-shape-start-start: var(--_container-shape-start-start);--md-focus-ring-shape-start-end: var(--_container-shape-start-end);--md-focus-ring-shape-end-end: var(--_container-shape-end-end);--md-focus-ring-shape-end-start: var(--_container-shape-end-start)}:host(:is([disabled],[soft-disabled])){cursor:default;pointer-events:none}.button{border-radius:inherit;cursor:inherit;display:inline-flex;align-items:center;justify-content:center;border:none;outline:none;-webkit-appearance:none;vertical-align:middle;background:rgba(0,0,0,0);text-decoration:none;min-width:calc(64px - var(--_leading-space) - var(--_trailing-space));width:100%;z-index:0;height:100%;font:inherit;color:var(--_label-text-color);padding:0;gap:inherit;text-transform:inherit}.button::-moz-focus-inner{padding:0;border:0}:host(:hover) .button{color:var(--_hover-label-text-color)}:host(:focus-within) .button{color:var(--_focus-label-text-color)}:host(:active) .button{color:var(--_pressed-label-text-color)}.background{background:var(--_container-color);border-radius:inherit;inset:0;position:absolute}.label{overflow:hidden}:is(.button,.label,.label slot),.label ::slotted(*){text-overflow:inherit}:host(:is([disabled],[soft-disabled])) .label{color:var(--_disabled-label-text-color);opacity:var(--_disabled-label-text-opacity)}:host(:is([disabled],[soft-disabled])) .background{background:var(--_disabled-container-color);opacity:var(--_disabled-container-opacity)}@media(forced-colors: active){.background{border:1px solid CanvasText}:host(:is([disabled],[soft-disabled])){--_disabled-icon-color: GrayText;--_disabled-icon-opacity: 1;--_disabled-container-opacity: 1;--_disabled-label-text-color: GrayText;--_disabled-label-text-opacity: 1}}:host([has-icon]:not([trailing-icon])){padding-inline-start:var(--_with-leading-icon-leading-space);padding-inline-end:var(--_with-leading-icon-trailing-space)}:host([has-icon][trailing-icon]){padding-inline-start:var(--_with-trailing-icon-leading-space);padding-inline-end:var(--_with-trailing-icon-trailing-space)}::slotted([slot=icon]){display:inline-flex;position:relative;writing-mode:horizontal-tb;fill:currentColor;flex-shrink:0;color:var(--_icon-color);font-size:var(--_icon-size);inline-size:var(--_icon-size);block-size:var(--_icon-size)}:host(:hover) ::slotted([slot=icon]){color:var(--_hover-icon-color)}:host(:focus-within) ::slotted([slot=icon]){color:var(--_focus-icon-color)}:host(:active) ::slotted([slot=icon]){color:var(--_pressed-icon-color)}:host(:is([disabled],[soft-disabled])) ::slotted([slot=icon]){color:var(--_disabled-icon-color);opacity:var(--_disabled-icon-opacity)}.touch{position:absolute;top:50%;height:48px;left:0;right:0;transform:translateY(-50%)}:host([touch-target=wrapper]){margin:max(0px,(48px - var(--_container-height))/2) 0}:host([touch-target=none]) .touch{display:none}
`;/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let Ot=class extends To{};Ot.styles=[vr,Ao,zo];Ot=l([k("md-filled-button")],Ot);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class So extends M{}/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Io=y`:host{--_container-height: var(--md-text-button-container-height, 40px);--_disabled-label-text-color: var(--md-text-button-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-text-button-disabled-label-text-opacity, 0.38);--_focus-label-text-color: var(--md-text-button-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_hover-label-text-color: var(--md-text-button-hover-label-text-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-color: var(--md-text-button-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-opacity: var(--md-text-button-hover-state-layer-opacity, 0.08);--_label-text-color: var(--md-text-button-label-text-color, var(--md-sys-color-primary, #6750a4));--_label-text-font: var(--md-text-button-label-text-font, var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-text-button-label-text-line-height, var(--md-sys-typescale-label-large-line-height, 1.25rem));--_label-text-size: var(--md-text-button-label-text-size, var(--md-sys-typescale-label-large-size, 0.875rem));--_label-text-weight: var(--md-text-button-label-text-weight, var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)));--_pressed-label-text-color: var(--md-text-button-pressed-label-text-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-color: var(--md-text-button-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-opacity: var(--md-text-button-pressed-state-layer-opacity, 0.12);--_disabled-icon-color: var(--md-text-button-disabled-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-icon-opacity: var(--md-text-button-disabled-icon-opacity, 0.38);--_focus-icon-color: var(--md-text-button-focus-icon-color, var(--md-sys-color-primary, #6750a4));--_hover-icon-color: var(--md-text-button-hover-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-color: var(--md-text-button-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-size: var(--md-text-button-icon-size, 18px);--_pressed-icon-color: var(--md-text-button-pressed-icon-color, var(--md-sys-color-primary, #6750a4));--_container-shape-start-start: var(--md-text-button-container-shape-start-start, var(--md-text-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-start-end: var(--md-text-button-container-shape-start-end, var(--md-text-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-end: var(--md-text-button-container-shape-end-end, var(--md-text-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-start: var(--md-text-button-container-shape-end-start, var(--md-text-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_leading-space: var(--md-text-button-leading-space, 12px);--_trailing-space: var(--md-text-button-trailing-space, 12px);--_with-leading-icon-leading-space: var(--md-text-button-with-leading-icon-leading-space, 12px);--_with-leading-icon-trailing-space: var(--md-text-button-with-leading-icon-trailing-space, 16px);--_with-trailing-icon-leading-space: var(--md-text-button-with-trailing-icon-leading-space, 16px);--_with-trailing-icon-trailing-space: var(--md-text-button-with-trailing-icon-trailing-space, 12px);--_container-color: none;--_disabled-container-color: none;--_disabled-container-opacity: 0}
`;/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let Pt=class extends So{};Pt.styles=[vr,Io];Pt=l([k("md-text-button")],Pt);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Eo extends M{renderElevationOrOutline(){return n`<div class="outline"></div>`}}/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Lo=y`:host{--_container-height: var(--md-outlined-button-container-height, 40px);--_disabled-label-text-color: var(--md-outlined-button-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-outlined-button-disabled-label-text-opacity, 0.38);--_disabled-outline-color: var(--md-outlined-button-disabled-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-outline-opacity: var(--md-outlined-button-disabled-outline-opacity, 0.12);--_focus-label-text-color: var(--md-outlined-button-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_hover-label-text-color: var(--md-outlined-button-hover-label-text-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-color: var(--md-outlined-button-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-opacity: var(--md-outlined-button-hover-state-layer-opacity, 0.08);--_label-text-color: var(--md-outlined-button-label-text-color, var(--md-sys-color-primary, #6750a4));--_label-text-font: var(--md-outlined-button-label-text-font, var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-outlined-button-label-text-line-height, var(--md-sys-typescale-label-large-line-height, 1.25rem));--_label-text-size: var(--md-outlined-button-label-text-size, var(--md-sys-typescale-label-large-size, 0.875rem));--_label-text-weight: var(--md-outlined-button-label-text-weight, var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)));--_outline-color: var(--md-outlined-button-outline-color, var(--md-sys-color-outline, #79747e));--_outline-width: var(--md-outlined-button-outline-width, 1px);--_pressed-label-text-color: var(--md-outlined-button-pressed-label-text-color, var(--md-sys-color-primary, #6750a4));--_pressed-outline-color: var(--md-outlined-button-pressed-outline-color, var(--md-sys-color-outline, #79747e));--_pressed-state-layer-color: var(--md-outlined-button-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-opacity: var(--md-outlined-button-pressed-state-layer-opacity, 0.12);--_disabled-icon-color: var(--md-outlined-button-disabled-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-icon-opacity: var(--md-outlined-button-disabled-icon-opacity, 0.38);--_focus-icon-color: var(--md-outlined-button-focus-icon-color, var(--md-sys-color-primary, #6750a4));--_hover-icon-color: var(--md-outlined-button-hover-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-color: var(--md-outlined-button-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-size: var(--md-outlined-button-icon-size, 18px);--_pressed-icon-color: var(--md-outlined-button-pressed-icon-color, var(--md-sys-color-primary, #6750a4));--_container-shape-start-start: var(--md-outlined-button-container-shape-start-start, var(--md-outlined-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-start-end: var(--md-outlined-button-container-shape-start-end, var(--md-outlined-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-end: var(--md-outlined-button-container-shape-end-end, var(--md-outlined-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-start: var(--md-outlined-button-container-shape-end-start, var(--md-outlined-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_leading-space: var(--md-outlined-button-leading-space, 24px);--_trailing-space: var(--md-outlined-button-trailing-space, 24px);--_with-leading-icon-leading-space: var(--md-outlined-button-with-leading-icon-leading-space, 16px);--_with-leading-icon-trailing-space: var(--md-outlined-button-with-leading-icon-trailing-space, 24px);--_with-trailing-icon-leading-space: var(--md-outlined-button-with-trailing-icon-leading-space, 24px);--_with-trailing-icon-trailing-space: var(--md-outlined-button-with-trailing-icon-trailing-space, 16px);--_container-color: none;--_disabled-container-color: none;--_disabled-container-opacity: 0}.outline{inset:0;border-style:solid;position:absolute;box-sizing:border-box;border-color:var(--_outline-color);border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end)}:host(:active) .outline{border-color:var(--_pressed-outline-color)}:host(:is([disabled],[soft-disabled])) .outline{border-color:var(--_disabled-outline-color);opacity:var(--_disabled-outline-opacity)}@media(forced-colors: active){:host(:is([disabled],[soft-disabled])) .background{border-color:GrayText}:host(:is([disabled],[soft-disabled])) .outline{opacity:1}}.outline,md-ripple{border-width:var(--_outline-width)}md-ripple{inline-size:calc(100% - 2*var(--_outline-width));block-size:calc(100% - 2*var(--_outline-width));border-style:solid;border-color:rgba(0,0,0,0)}
`;/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let Mt=class extends Eo{};Mt.styles=[vr,Lo];Mt=l([k("md-outlined-button")],Mt);/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ai=Symbol.for(""),Fo=t=>{if((t==null?void 0:t.r)===ai)return t==null?void 0:t._$litStatic$},re=(t,...e)=>({_$litStatic$:e.reduce((r,i,o)=>r+(a=>{if(a._$litStatic$!==void 0)return a._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${a}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)})(i)+t[o+1],t[0]),r:ai}),Mr=new Map,Ro=t=>(e,...r)=>{const i=r.length;let o,a;const s=[],c=[];let h,v=0,f=!1;for(;v<i;){for(h=e[v];v<i&&(a=r[v],(o=Fo(a))!==void 0);)h+=o+e[++v],f=!0;v!==i&&c.push(a),s.push(h),v++}if(v===i&&s.push(e[i]),f){const m=s.join("$$lit$$");(e=Mr.get(m))===void 0&&(s.raw=s,Mr.set(m,e=s)),r=c}return t(e,...r)},fr=Ro(n);/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function Dr(t,e=!0){return e&&getComputedStyle(t).getPropertyValue("direction").trim()==="rtl"}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Oo=ce(mr(_));class D extends Oo{get name(){return this.getAttribute("name")??""}set name(e){this.setAttribute("name",e)}get form(){return this[U].form}get labels(){return this[U].labels}constructor(){super(),this.disabled=!1,this.softDisabled=!1,this.flipIconInRtl=!1,this.href="",this.download="",this.target="",this.ariaLabelSelected="",this.toggle=!1,this.selected=!1,this.type="submit",this.value="",this.flipIcon=Dr(this,this.flipIconInRtl),this.addEventListener("click",this.handleClick.bind(this))}willUpdate(){this.href&&(this.disabled=!1,this.softDisabled=!1)}render(){const e=this.href?re`div`:re`button`,{ariaLabel:r,ariaHasPopup:i,ariaExpanded:o}=this,a=r&&this.ariaLabelSelected,s=this.toggle?this.selected:d;let c=d;return this.href||(c=a&&this.selected?this.ariaLabelSelected:r),fr`<${e}
        class="icon-button ${V(this.getRenderClasses())}"
        id="button"
        aria-label="${c||d}"
        aria-haspopup="${!this.href&&i||d}"
        aria-expanded="${!this.href&&o||d}"
        aria-pressed="${s}"
        aria-disabled=${!this.href&&this.softDisabled||d}
        ?disabled="${!this.href&&this.disabled}"
        @click="${this.handleClickOnChild}">
        ${this.renderFocusRing()}
        ${this.renderRipple()}
        ${this.selected?d:this.renderIcon()}
        ${this.selected?this.renderSelectedIcon():d}
        ${this.href?this.renderLink():this.renderTouchTarget()}
  </${e}>`}renderLink(){const{ariaLabel:e}=this;return n`
      <a
        class="link"
        id="link"
        href="${this.href}"
        download="${this.download||d}"
        target="${this.target||d}"
        aria-label="${e||d}">
        ${this.renderTouchTarget()}
      </a>
    `}getRenderClasses(){return{"flip-icon":this.flipIcon,selected:this.toggle&&this.selected}}renderIcon(){return n`<span class="icon"><slot></slot></span>`}renderSelectedIcon(){return n`<span class="icon icon--selected"
      ><slot name="selected"><slot></slot></slot
    ></span>`}renderTouchTarget(){return n`<span class="touch"></span>`}renderFocusRing(){return n`<md-focus-ring
      part="focus-ring"
      for=${this.href?"link":"button"}></md-focus-ring>`}renderRipple(){const e=!this.href&&(this.disabled||this.softDisabled);return n`<md-ripple
      for=${this.href?"link":d}
      ?disabled="${e}"></md-ripple>`}connectedCallback(){this.flipIcon=Dr(this,this.flipIconInRtl),super.connectedCallback()}handleClick(e){if(!this.href&&this.softDisabled){e.stopImmediatePropagation(),e.preventDefault();return}}async handleClickOnChild(e){await 0,!(!this.toggle||this.disabled||this.softDisabled||e.defaultPrevented)&&(this.selected=!this.selected,this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0})))}}oi(D);D.formAssociated=!0;D.shadowRootOptions={mode:"open",delegatesFocus:!0};l([u({type:Boolean,reflect:!0})],D.prototype,"disabled",void 0);l([u({type:Boolean,attribute:"soft-disabled",reflect:!0})],D.prototype,"softDisabled",void 0);l([u({type:Boolean,attribute:"flip-icon-in-rtl"})],D.prototype,"flipIconInRtl",void 0);l([u()],D.prototype,"href",void 0);l([u()],D.prototype,"download",void 0);l([u()],D.prototype,"target",void 0);l([u({attribute:"aria-label-selected"})],D.prototype,"ariaLabelSelected",void 0);l([u({type:Boolean})],D.prototype,"toggle",void 0);l([u({type:Boolean,reflect:!0})],D.prototype,"selected",void 0);l([u()],D.prototype,"type",void 0);l([u({reflect:!0})],D.prototype,"value",void 0);l([p()],D.prototype,"flipIcon",void 0);/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Po=y`:host{display:inline-flex;outline:none;-webkit-tap-highlight-color:rgba(0,0,0,0);height:var(--_container-height);width:var(--_container-width);justify-content:center}:host([touch-target=wrapper]){margin:max(0px,(48px - var(--_container-height))/2) max(0px,(48px - var(--_container-width))/2)}md-focus-ring{--md-focus-ring-shape-start-start: var(--_container-shape-start-start);--md-focus-ring-shape-start-end: var(--_container-shape-start-end);--md-focus-ring-shape-end-end: var(--_container-shape-end-end);--md-focus-ring-shape-end-start: var(--_container-shape-end-start)}:host(:is([disabled],[soft-disabled])){pointer-events:none}.icon-button{place-items:center;background:none;border:none;box-sizing:border-box;cursor:pointer;display:flex;place-content:center;outline:none;padding:0;position:relative;text-decoration:none;user-select:none;z-index:0;flex:1;border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end)}.icon ::slotted(*){font-size:var(--_icon-size);height:var(--_icon-size);width:var(--_icon-size);font-weight:inherit}md-ripple{z-index:-1;border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end)}.flip-icon .icon{transform:scaleX(-1)}.icon{display:inline-flex}.link{display:grid;height:100%;outline:none;place-items:center;position:absolute;width:100%}.touch{position:absolute;height:max(48px,100%);width:max(48px,100%)}:host([touch-target=none]) .touch{display:none}@media(forced-colors: active){:host(:is([disabled],[soft-disabled])){--_disabled-icon-color: GrayText;--_disabled-icon-opacity: 1}}
`;/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Mo=y`:host{--_disabled-icon-color: var(--md-icon-button-disabled-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-icon-opacity: var(--md-icon-button-disabled-icon-opacity, 0.38);--_icon-size: var(--md-icon-button-icon-size, 24px);--_selected-focus-icon-color: var(--md-icon-button-selected-focus-icon-color, var(--md-sys-color-primary, #6750a4));--_selected-hover-icon-color: var(--md-icon-button-selected-hover-icon-color, var(--md-sys-color-primary, #6750a4));--_selected-hover-state-layer-color: var(--md-icon-button-selected-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_selected-hover-state-layer-opacity: var(--md-icon-button-selected-hover-state-layer-opacity, 0.08);--_selected-icon-color: var(--md-icon-button-selected-icon-color, var(--md-sys-color-primary, #6750a4));--_selected-pressed-icon-color: var(--md-icon-button-selected-pressed-icon-color, var(--md-sys-color-primary, #6750a4));--_selected-pressed-state-layer-color: var(--md-icon-button-selected-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_selected-pressed-state-layer-opacity: var(--md-icon-button-selected-pressed-state-layer-opacity, 0.12);--_state-layer-height: var(--md-icon-button-state-layer-height, 40px);--_state-layer-shape: var(--md-icon-button-state-layer-shape, var(--md-sys-shape-corner-full, 9999px));--_state-layer-width: var(--md-icon-button-state-layer-width, 40px);--_focus-icon-color: var(--md-icon-button-focus-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-icon-color: var(--md-icon-button-hover-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-color: var(--md-icon-button-hover-state-layer-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-opacity: var(--md-icon-button-hover-state-layer-opacity, 0.08);--_icon-color: var(--md-icon-button-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-icon-color: var(--md-icon-button-pressed-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-state-layer-color: var(--md-icon-button-pressed-state-layer-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-state-layer-opacity: var(--md-icon-button-pressed-state-layer-opacity, 0.12);--_container-shape-start-start: 0;--_container-shape-start-end: 0;--_container-shape-end-end: 0;--_container-shape-end-start: 0;--_container-height: 0;--_container-width: 0;height:var(--_state-layer-height);width:var(--_state-layer-width)}:host([touch-target=wrapper]){margin:max(0px,(48px - var(--_state-layer-height))/2) max(0px,(48px - var(--_state-layer-width))/2)}md-focus-ring{--md-focus-ring-shape-start-start: var(--_state-layer-shape);--md-focus-ring-shape-start-end: var(--_state-layer-shape);--md-focus-ring-shape-end-end: var(--_state-layer-shape);--md-focus-ring-shape-end-start: var(--_state-layer-shape)}.standard{background-color:rgba(0,0,0,0);color:var(--_icon-color);--md-ripple-hover-color: var(--_hover-state-layer-color);--md-ripple-hover-opacity: var(--_hover-state-layer-opacity);--md-ripple-pressed-color: var(--_pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_pressed-state-layer-opacity)}.standard:hover{color:var(--_hover-icon-color)}.standard:focus{color:var(--_focus-icon-color)}.standard:active{color:var(--_pressed-icon-color)}.standard:is(:disabled,[aria-disabled=true]){color:var(--_disabled-icon-color)}md-ripple{border-radius:var(--_state-layer-shape)}.standard:is(:disabled,[aria-disabled=true]){opacity:var(--_disabled-icon-opacity)}.selected:not(:disabled,[aria-disabled=true]){color:var(--_selected-icon-color)}.selected:not(:disabled,[aria-disabled=true]):hover{color:var(--_selected-hover-icon-color)}.selected:not(:disabled,[aria-disabled=true]):focus{color:var(--_selected-focus-icon-color)}.selected:not(:disabled,[aria-disabled=true]):active{color:var(--_selected-pressed-icon-color)}.selected{--md-ripple-hover-color: var(--_selected-hover-state-layer-color);--md-ripple-hover-opacity: var(--_selected-hover-state-layer-opacity);--md-ripple-pressed-color: var(--_selected-pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_selected-pressed-state-layer-opacity)}
`;/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let Dt=class extends D{getRenderClasses(){return{...super.getRenderClasses(),standard:!0}}};Dt.styles=[Po,Mo];Dt=l([k("md-icon-button")],Dt);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class I extends _{constructor(){super(...arguments),this.disabled=!1,this.error=!1,this.focused=!1,this.label="",this.noAsterisk=!1,this.populated=!1,this.required=!1,this.resizable=!1,this.supportingText="",this.errorText="",this.count=-1,this.max=-1,this.hasStart=!1,this.hasEnd=!1,this.isAnimating=!1,this.refreshErrorAlert=!1,this.disableTransitions=!1}get counterText(){const e=this.count??-1,r=this.max??-1;return e<0||r<=0?"":`${e} / ${r}`}get supportingOrErrorText(){return this.error&&this.errorText?this.errorText:this.supportingText}reannounceError(){this.refreshErrorAlert=!0}update(e){e.has("disabled")&&e.get("disabled")!==void 0&&(this.disableTransitions=!0),this.disabled&&this.focused&&(e.set("focused",!0),this.focused=!1),this.animateLabelIfNeeded({wasFocused:e.get("focused"),wasPopulated:e.get("populated")}),super.update(e)}render(){var a,s,c,h;const e=this.renderLabel(!0),r=this.renderLabel(!1),i=(a=this.renderOutline)==null?void 0:a.call(this,e),o={disabled:this.disabled,"disable-transitions":this.disableTransitions,error:this.error&&!this.disabled,focused:this.focused,"with-start":this.hasStart,"with-end":this.hasEnd,populated:this.populated,resizable:this.resizable,required:this.required,"no-label":!this.label};return n`
      <div class="field ${V(o)}">
        <div class="container-overflow">
          ${(s=this.renderBackground)==null?void 0:s.call(this)}
          <slot name="container"></slot>
          ${(c=this.renderStateLayer)==null?void 0:c.call(this)} ${(h=this.renderIndicator)==null?void 0:h.call(this)} ${i}
          <div class="container">
            <div class="start">
              <slot name="start"></slot>
            </div>
            <div class="middle">
              <div class="label-wrapper">
                ${r} ${i?d:e}
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
    `}updated(e){(e.has("supportingText")||e.has("errorText")||e.has("count")||e.has("max"))&&this.updateSlottedAriaDescribedBy(),this.refreshErrorAlert&&requestAnimationFrame(()=>{this.refreshErrorAlert=!1}),this.disableTransitions&&requestAnimationFrame(()=>{this.disableTransitions=!1})}renderSupportingText(){const{supportingOrErrorText:e,counterText:r}=this;if(!e&&!r)return d;const i=n`<span>${e}</span>`,o=r?n`<span class="counter">${r}</span>`:d,s=this.error&&this.errorText&&!this.refreshErrorAlert?"alert":d;return n`
      <div class="supporting-text" role=${s}>${i}${o}</div>
      <slot
        name="aria-describedby"
        @slotchange=${this.updateSlottedAriaDescribedBy}></slot>
    `}updateSlottedAriaDescribedBy(){for(const e of this.slottedAriaDescribedBy)Qr(n`${this.supportingOrErrorText} ${this.counterText}`,e),e.setAttribute("hidden","")}renderLabel(e){if(!this.label)return d;let r;e?r=this.focused||this.populated||this.isAnimating:r=!this.focused&&!this.populated&&!this.isAnimating;const i={hidden:!r,floating:e,resting:!e},o=`${this.label}${this.required&&!this.noAsterisk?"*":""}`;return n`
      <span class="label ${V(i)}" aria-hidden=${!r}
        >${o}</span
      >
    `}animateLabelIfNeeded({wasFocused:e,wasPopulated:r}){var a,s,c;if(!this.label)return;e??(e=this.focused),r??(r=this.populated);const i=e||r,o=this.focused||this.populated;i!==o&&(this.isAnimating=!0,(a=this.labelAnimation)==null||a.cancel(),this.labelAnimation=(s=this.floatingLabelEl)==null?void 0:s.animate(this.getLabelKeyframes(),{duration:150,easing:xe.STANDARD}),(c=this.labelAnimation)==null||c.addEventListener("finish",()=>{this.isAnimating=!1}))}getLabelKeyframes(){const{floatingLabelEl:e,restingLabelEl:r}=this;if(!e||!r)return[];const{x:i,y:o,height:a}=e.getBoundingClientRect(),{x:s,y:c,height:h}=r.getBoundingClientRect(),v=e.scrollWidth,f=r.scrollWidth,m=f/v,b=s-i,$=c-o+Math.round((h-a*m)/2),H=`translateX(${b}px) translateY(${$}px) scale(${m})`,me="translateX(0) translateY(0) scale(1)",ve=r.clientWidth,_e=f>ve?`${ve/m}px`:"";return this.focused||this.populated?[{transform:H,width:_e},{transform:me,width:_e}]:[{transform:me,width:_e},{transform:H,width:_e}]}getSurfacePositionClientRect(){return this.containerEl.getBoundingClientRect()}}l([u({type:Boolean})],I.prototype,"disabled",void 0);l([u({type:Boolean})],I.prototype,"error",void 0);l([u({type:Boolean})],I.prototype,"focused",void 0);l([u()],I.prototype,"label",void 0);l([u({type:Boolean,attribute:"no-asterisk"})],I.prototype,"noAsterisk",void 0);l([u({type:Boolean})],I.prototype,"populated",void 0);l([u({type:Boolean})],I.prototype,"required",void 0);l([u({type:Boolean})],I.prototype,"resizable",void 0);l([u({attribute:"supporting-text"})],I.prototype,"supportingText",void 0);l([u({attribute:"error-text"})],I.prototype,"errorText",void 0);l([u({type:Number})],I.prototype,"count",void 0);l([u({type:Number})],I.prototype,"max",void 0);l([u({type:Boolean,attribute:"has-start"})],I.prototype,"hasStart",void 0);l([u({type:Boolean,attribute:"has-end"})],I.prototype,"hasEnd",void 0);l([de({slot:"aria-describedby"})],I.prototype,"slottedAriaDescribedBy",void 0);l([p()],I.prototype,"isAnimating",void 0);l([p()],I.prototype,"refreshErrorAlert",void 0);l([p()],I.prototype,"disableTransitions",void 0);l([z(".label.floating")],I.prototype,"floatingLabelEl",void 0);l([z(".label.resting")],I.prototype,"restingLabelEl",void 0);l([z(".container")],I.prototype,"containerEl",void 0);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Do extends I{renderBackground(){return n` <div class="background"></div> `}renderStateLayer(){return n` <div class="state-layer"></div> `}renderIndicator(){return n`<div class="active-indicator"></div>`}}/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const No=y`@layer styles{:host{--_active-indicator-color: var(--md-filled-field-active-indicator-color, var(--md-sys-color-on-surface-variant, #49454f));--_active-indicator-height: var(--md-filled-field-active-indicator-height, 1px);--_bottom-space: var(--md-filled-field-bottom-space, 16px);--_container-color: var(--md-filled-field-container-color, var(--md-sys-color-surface-container-highest, #e6e0e9));--_content-color: var(--md-filled-field-content-color, var(--md-sys-color-on-surface, #1d1b20));--_content-font: var(--md-filled-field-content-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_content-line-height: var(--md-filled-field-content-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_content-size: var(--md-filled-field-content-size, var(--md-sys-typescale-body-large-size, 1rem));--_content-space: var(--md-filled-field-content-space, 16px);--_content-weight: var(--md-filled-field-content-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_disabled-active-indicator-color: var(--md-filled-field-disabled-active-indicator-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-active-indicator-height: var(--md-filled-field-disabled-active-indicator-height, 1px);--_disabled-active-indicator-opacity: var(--md-filled-field-disabled-active-indicator-opacity, 0.38);--_disabled-container-color: var(--md-filled-field-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-container-opacity: var(--md-filled-field-disabled-container-opacity, 0.04);--_disabled-content-color: var(--md-filled-field-disabled-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-content-opacity: var(--md-filled-field-disabled-content-opacity, 0.38);--_disabled-label-text-color: var(--md-filled-field-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-filled-field-disabled-label-text-opacity, 0.38);--_disabled-leading-content-color: var(--md-filled-field-disabled-leading-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-leading-content-opacity: var(--md-filled-field-disabled-leading-content-opacity, 0.38);--_disabled-supporting-text-color: var(--md-filled-field-disabled-supporting-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-supporting-text-opacity: var(--md-filled-field-disabled-supporting-text-opacity, 0.38);--_disabled-trailing-content-color: var(--md-filled-field-disabled-trailing-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-trailing-content-opacity: var(--md-filled-field-disabled-trailing-content-opacity, 0.38);--_error-active-indicator-color: var(--md-filled-field-error-active-indicator-color, var(--md-sys-color-error, #b3261e));--_error-content-color: var(--md-filled-field-error-content-color, var(--md-sys-color-on-surface, #1d1b20));--_error-focus-active-indicator-color: var(--md-filled-field-error-focus-active-indicator-color, var(--md-sys-color-error, #b3261e));--_error-focus-content-color: var(--md-filled-field-error-focus-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-focus-label-text-color: var(--md-filled-field-error-focus-label-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-leading-content-color: var(--md-filled-field-error-focus-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-focus-supporting-text-color: var(--md-filled-field-error-focus-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-trailing-content-color: var(--md-filled-field-error-focus-trailing-content-color, var(--md-sys-color-error, #b3261e));--_error-hover-active-indicator-color: var(--md-filled-field-error-hover-active-indicator-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-content-color: var(--md-filled-field-error-hover-content-color, var(--md-sys-color-on-surface, #1d1b20));--_error-hover-label-text-color: var(--md-filled-field-error-hover-label-text-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-leading-content-color: var(--md-filled-field-error-hover-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-hover-state-layer-color: var(--md-filled-field-error-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_error-hover-state-layer-opacity: var(--md-filled-field-error-hover-state-layer-opacity, 0.08);--_error-hover-supporting-text-color: var(--md-filled-field-error-hover-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-hover-trailing-content-color: var(--md-filled-field-error-hover-trailing-content-color, var(--md-sys-color-on-error-container, #410e0b));--_error-label-text-color: var(--md-filled-field-error-label-text-color, var(--md-sys-color-error, #b3261e));--_error-leading-content-color: var(--md-filled-field-error-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-supporting-text-color: var(--md-filled-field-error-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-trailing-content-color: var(--md-filled-field-error-trailing-content-color, var(--md-sys-color-error, #b3261e));--_focus-active-indicator-color: var(--md-filled-field-focus-active-indicator-color, var(--md-sys-color-primary, #6750a4));--_focus-active-indicator-height: var(--md-filled-field-focus-active-indicator-height, 3px);--_focus-content-color: var(--md-filled-field-focus-content-color, var(--md-sys-color-on-surface, #1d1b20));--_focus-label-text-color: var(--md-filled-field-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_focus-leading-content-color: var(--md-filled-field-focus-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-supporting-text-color: var(--md-filled-field-focus-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-trailing-content-color: var(--md-filled-field-focus-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-active-indicator-color: var(--md-filled-field-hover-active-indicator-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-active-indicator-height: var(--md-filled-field-hover-active-indicator-height, 1px);--_hover-content-color: var(--md-filled-field-hover-content-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-label-text-color: var(--md-filled-field-hover-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-leading-content-color: var(--md-filled-field-hover-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-color: var(--md-filled-field-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-state-layer-opacity: var(--md-filled-field-hover-state-layer-opacity, 0.08);--_hover-supporting-text-color: var(--md-filled-field-hover-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-trailing-content-color: var(--md-filled-field-hover-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-color: var(--md-filled-field-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-font: var(--md-filled-field-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-filled-field-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_label-text-populated-line-height: var(--md-filled-field-label-text-populated-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_label-text-populated-size: var(--md-filled-field-label-text-populated-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_label-text-size: var(--md-filled-field-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_label-text-weight: var(--md-filled-field-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_leading-content-color: var(--md-filled-field-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_leading-space: var(--md-filled-field-leading-space, 16px);--_supporting-text-color: var(--md-filled-field-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_supporting-text-font: var(--md-filled-field-supporting-text-font, var(--md-sys-typescale-body-small-font, var(--md-ref-typeface-plain, Roboto)));--_supporting-text-leading-space: var(--md-filled-field-supporting-text-leading-space, 16px);--_supporting-text-line-height: var(--md-filled-field-supporting-text-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_supporting-text-size: var(--md-filled-field-supporting-text-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_supporting-text-top-space: var(--md-filled-field-supporting-text-top-space, 4px);--_supporting-text-trailing-space: var(--md-filled-field-supporting-text-trailing-space, 16px);--_supporting-text-weight: var(--md-filled-field-supporting-text-weight, var(--md-sys-typescale-body-small-weight, var(--md-ref-typeface-weight-regular, 400)));--_top-space: var(--md-filled-field-top-space, 16px);--_trailing-content-color: var(--md-filled-field-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_trailing-space: var(--md-filled-field-trailing-space, 16px);--_with-label-bottom-space: var(--md-filled-field-with-label-bottom-space, 8px);--_with-label-top-space: var(--md-filled-field-with-label-top-space, 8px);--_with-leading-content-leading-space: var(--md-filled-field-with-leading-content-leading-space, 12px);--_with-trailing-content-trailing-space: var(--md-filled-field-with-trailing-content-trailing-space, 12px);--_container-shape-start-start: var(--md-filled-field-container-shape-start-start, var(--md-filled-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-start-end: var(--md-filled-field-container-shape-start-end, var(--md-filled-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-end-end: var(--md-filled-field-container-shape-end-end, var(--md-filled-field-container-shape, var(--md-sys-shape-corner-none, 0px)));--_container-shape-end-start: var(--md-filled-field-container-shape-end-start, var(--md-filled-field-container-shape, var(--md-sys-shape-corner-none, 0px)))}.background,.state-layer{border-radius:inherit;inset:0;pointer-events:none;position:absolute}.background{background:var(--_container-color)}.state-layer{visibility:hidden}.field:not(.disabled):hover .state-layer{visibility:visible}.label.floating{position:absolute;top:var(--_with-label-top-space)}.field:not(.with-start) .label-wrapper{margin-inline-start:var(--_leading-space)}.field:not(.with-end) .label-wrapper{margin-inline-end:var(--_trailing-space)}.active-indicator{inset:auto 0 0 0;pointer-events:none;position:absolute;width:100%;z-index:1}.active-indicator::before,.active-indicator::after{border-bottom:var(--_active-indicator-height) solid var(--_active-indicator-color);inset:auto 0 0 0;content:"";position:absolute;width:100%}.active-indicator::after{opacity:0;transition:opacity 150ms cubic-bezier(0.2, 0, 0, 1)}.focused .active-indicator::after{opacity:1}.field:not(.with-start) .content ::slotted(*){padding-inline-start:var(--_leading-space)}.field:not(.with-end) .content ::slotted(*){padding-inline-end:var(--_trailing-space)}.field:not(.no-label) .content ::slotted(:not(textarea)){padding-bottom:var(--_with-label-bottom-space);padding-top:calc(var(--_with-label-top-space) + var(--_label-text-populated-line-height))}.field:not(.no-label) .content ::slotted(textarea){margin-bottom:var(--_with-label-bottom-space);margin-top:calc(var(--_with-label-top-space) + var(--_label-text-populated-line-height))}:hover .active-indicator::before{border-bottom-color:var(--_hover-active-indicator-color);border-bottom-width:var(--_hover-active-indicator-height)}.active-indicator::after{border-bottom-color:var(--_focus-active-indicator-color);border-bottom-width:var(--_focus-active-indicator-height)}:hover .state-layer{background:var(--_hover-state-layer-color);opacity:var(--_hover-state-layer-opacity)}.disabled .active-indicator::before{border-bottom-color:var(--_disabled-active-indicator-color);border-bottom-width:var(--_disabled-active-indicator-height);opacity:var(--_disabled-active-indicator-opacity)}.disabled .background{background:var(--_disabled-container-color);opacity:var(--_disabled-container-opacity)}.error .active-indicator::before{border-bottom-color:var(--_error-active-indicator-color)}.error:hover .active-indicator::before{border-bottom-color:var(--_error-hover-active-indicator-color)}.error:hover .state-layer{background:var(--_error-hover-state-layer-color);opacity:var(--_error-hover-state-layer-opacity)}.error .active-indicator::after{border-bottom-color:var(--_error-focus-active-indicator-color)}.resizable .container{bottom:var(--_focus-active-indicator-height);clip-path:inset(var(--_focus-active-indicator-height) 0 0 0)}.resizable .container>*{top:var(--_focus-active-indicator-height)}}@layer hcm{@media(forced-colors: active){.disabled .active-indicator::before{border-color:GrayText;opacity:1}}}
`;/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const si=y`:host{display:inline-flex;resize:both}.field{display:flex;flex:1;flex-direction:column;writing-mode:horizontal-tb;max-width:100%}.container-overflow{border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-end-radius:var(--_container-shape-end-end);border-end-start-radius:var(--_container-shape-end-start);display:flex;height:100%;position:relative}.container{align-items:center;border-radius:inherit;display:flex;flex:1;max-height:100%;min-height:100%;min-width:min-content;position:relative}.field,.container-overflow{resize:inherit}.resizable:not(.disabled) .container{resize:inherit;overflow:hidden}.disabled{pointer-events:none}slot[name=container]{border-radius:inherit}slot[name=container]::slotted(*){border-radius:inherit;inset:0;pointer-events:none;position:absolute}@layer styles{.start,.middle,.end{display:flex;box-sizing:border-box;height:100%;position:relative}.start{color:var(--_leading-content-color)}.end{color:var(--_trailing-content-color)}.start,.end{align-items:center;justify-content:center}.with-start .start{margin-inline:var(--_with-leading-content-leading-space) var(--_content-space)}.with-end .end{margin-inline:var(--_content-space) var(--_with-trailing-content-trailing-space)}.middle{align-items:stretch;align-self:baseline;flex:1}.content{color:var(--_content-color);display:flex;flex:1;opacity:0;transition:opacity 83ms cubic-bezier(0.2, 0, 0, 1)}.no-label .content,.focused .content,.populated .content{opacity:1;transition-delay:67ms}:is(.disabled,.disable-transitions) .content{transition:none}.content ::slotted(*){all:unset;color:currentColor;font-family:var(--_content-font);font-size:var(--_content-size);line-height:var(--_content-line-height);font-weight:var(--_content-weight);width:100%;overflow-wrap:revert;white-space:revert}.content ::slotted(:not(textarea)){padding-top:var(--_top-space);padding-bottom:var(--_bottom-space)}.content ::slotted(textarea){margin-top:var(--_top-space);margin-bottom:var(--_bottom-space)}:hover .content{color:var(--_hover-content-color)}:hover .start{color:var(--_hover-leading-content-color)}:hover .end{color:var(--_hover-trailing-content-color)}.focused .content{color:var(--_focus-content-color)}.focused .start{color:var(--_focus-leading-content-color)}.focused .end{color:var(--_focus-trailing-content-color)}.disabled .content{color:var(--_disabled-content-color)}.disabled.no-label .content,.disabled.focused .content,.disabled.populated .content{opacity:var(--_disabled-content-opacity)}.disabled .start{color:var(--_disabled-leading-content-color);opacity:var(--_disabled-leading-content-opacity)}.disabled .end{color:var(--_disabled-trailing-content-color);opacity:var(--_disabled-trailing-content-opacity)}.error .content{color:var(--_error-content-color)}.error .start{color:var(--_error-leading-content-color)}.error .end{color:var(--_error-trailing-content-color)}.error:hover .content{color:var(--_error-hover-content-color)}.error:hover .start{color:var(--_error-hover-leading-content-color)}.error:hover .end{color:var(--_error-hover-trailing-content-color)}.error.focused .content{color:var(--_error-focus-content-color)}.error.focused .start{color:var(--_error-focus-leading-content-color)}.error.focused .end{color:var(--_error-focus-trailing-content-color)}}@layer hcm{@media(forced-colors: active){.disabled :is(.start,.content,.end){color:GrayText;opacity:1}}}@layer styles{.label{box-sizing:border-box;color:var(--_label-text-color);overflow:hidden;max-width:100%;text-overflow:ellipsis;white-space:nowrap;z-index:1;font-family:var(--_label-text-font);font-size:var(--_label-text-size);line-height:var(--_label-text-line-height);font-weight:var(--_label-text-weight);width:min-content}.label-wrapper{inset:0;pointer-events:none;position:absolute}.label.resting{position:absolute;top:var(--_top-space)}.label.floating{font-size:var(--_label-text-populated-size);line-height:var(--_label-text-populated-line-height);transform-origin:top left}.label.hidden{opacity:0}.no-label .label{display:none}.label-wrapper{inset:0;position:absolute;text-align:initial}:hover .label{color:var(--_hover-label-text-color)}.focused .label{color:var(--_focus-label-text-color)}.disabled .label{color:var(--_disabled-label-text-color)}.disabled .label:not(.hidden){opacity:var(--_disabled-label-text-opacity)}.error .label{color:var(--_error-label-text-color)}.error:hover .label{color:var(--_error-hover-label-text-color)}.error.focused .label{color:var(--_error-focus-label-text-color)}}@layer hcm{@media(forced-colors: active){.disabled .label:not(.hidden){color:GrayText;opacity:1}}}@layer styles{.supporting-text{color:var(--_supporting-text-color);display:flex;font-family:var(--_supporting-text-font);font-size:var(--_supporting-text-size);line-height:var(--_supporting-text-line-height);font-weight:var(--_supporting-text-weight);gap:16px;justify-content:space-between;padding-inline-start:var(--_supporting-text-leading-space);padding-inline-end:var(--_supporting-text-trailing-space);padding-top:var(--_supporting-text-top-space)}.supporting-text :nth-child(2){flex-shrink:0}:hover .supporting-text{color:var(--_hover-supporting-text-color)}.focus .supporting-text{color:var(--_focus-supporting-text-color)}.disabled .supporting-text{color:var(--_disabled-supporting-text-color);opacity:var(--_disabled-supporting-text-opacity)}.error .supporting-text{color:var(--_error-supporting-text-color)}.error:hover .supporting-text{color:var(--_error-hover-supporting-text-color)}.error.focus .supporting-text{color:var(--_error-focus-supporting-text-color)}}@layer hcm{@media(forced-colors: active){.disabled .supporting-text{color:GrayText;opacity:1}}}
`;/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let Nt=class extends Do{};Nt.styles=[si,No];Nt=l([k("md-filled-field")],Nt);/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Uo=y`:host{--_active-indicator-color: var(--md-filled-text-field-active-indicator-color, var(--md-sys-color-on-surface-variant, #49454f));--_active-indicator-height: var(--md-filled-text-field-active-indicator-height, 1px);--_caret-color: var(--md-filled-text-field-caret-color, var(--md-sys-color-primary, #6750a4));--_container-color: var(--md-filled-text-field-container-color, var(--md-sys-color-surface-container-highest, #e6e0e9));--_disabled-active-indicator-color: var(--md-filled-text-field-disabled-active-indicator-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-active-indicator-height: var(--md-filled-text-field-disabled-active-indicator-height, 1px);--_disabled-active-indicator-opacity: var(--md-filled-text-field-disabled-active-indicator-opacity, 0.38);--_disabled-container-color: var(--md-filled-text-field-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-container-opacity: var(--md-filled-text-field-disabled-container-opacity, 0.04);--_disabled-input-text-color: var(--md-filled-text-field-disabled-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-input-text-opacity: var(--md-filled-text-field-disabled-input-text-opacity, 0.38);--_disabled-label-text-color: var(--md-filled-text-field-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-filled-text-field-disabled-label-text-opacity, 0.38);--_disabled-leading-icon-color: var(--md-filled-text-field-disabled-leading-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-leading-icon-opacity: var(--md-filled-text-field-disabled-leading-icon-opacity, 0.38);--_disabled-supporting-text-color: var(--md-filled-text-field-disabled-supporting-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-supporting-text-opacity: var(--md-filled-text-field-disabled-supporting-text-opacity, 0.38);--_disabled-trailing-icon-color: var(--md-filled-text-field-disabled-trailing-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-trailing-icon-opacity: var(--md-filled-text-field-disabled-trailing-icon-opacity, 0.38);--_error-active-indicator-color: var(--md-filled-text-field-error-active-indicator-color, var(--md-sys-color-error, #b3261e));--_error-focus-active-indicator-color: var(--md-filled-text-field-error-focus-active-indicator-color, var(--md-sys-color-error, #b3261e));--_error-focus-caret-color: var(--md-filled-text-field-error-focus-caret-color, var(--md-sys-color-error, #b3261e));--_error-focus-input-text-color: var(--md-filled-text-field-error-focus-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_error-focus-label-text-color: var(--md-filled-text-field-error-focus-label-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-leading-icon-color: var(--md-filled-text-field-error-focus-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-focus-supporting-text-color: var(--md-filled-text-field-error-focus-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-trailing-icon-color: var(--md-filled-text-field-error-focus-trailing-icon-color, var(--md-sys-color-error, #b3261e));--_error-hover-active-indicator-color: var(--md-filled-text-field-error-hover-active-indicator-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-input-text-color: var(--md-filled-text-field-error-hover-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_error-hover-label-text-color: var(--md-filled-text-field-error-hover-label-text-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-leading-icon-color: var(--md-filled-text-field-error-hover-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-hover-state-layer-color: var(--md-filled-text-field-error-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_error-hover-state-layer-opacity: var(--md-filled-text-field-error-hover-state-layer-opacity, 0.08);--_error-hover-supporting-text-color: var(--md-filled-text-field-error-hover-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-hover-trailing-icon-color: var(--md-filled-text-field-error-hover-trailing-icon-color, var(--md-sys-color-on-error-container, #410e0b));--_error-input-text-color: var(--md-filled-text-field-error-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_error-label-text-color: var(--md-filled-text-field-error-label-text-color, var(--md-sys-color-error, #b3261e));--_error-leading-icon-color: var(--md-filled-text-field-error-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-supporting-text-color: var(--md-filled-text-field-error-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-trailing-icon-color: var(--md-filled-text-field-error-trailing-icon-color, var(--md-sys-color-error, #b3261e));--_focus-active-indicator-color: var(--md-filled-text-field-focus-active-indicator-color, var(--md-sys-color-primary, #6750a4));--_focus-active-indicator-height: var(--md-filled-text-field-focus-active-indicator-height, 3px);--_focus-input-text-color: var(--md-filled-text-field-focus-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_focus-label-text-color: var(--md-filled-text-field-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_focus-leading-icon-color: var(--md-filled-text-field-focus-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-supporting-text-color: var(--md-filled-text-field-focus-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-trailing-icon-color: var(--md-filled-text-field-focus-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-active-indicator-color: var(--md-filled-text-field-hover-active-indicator-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-active-indicator-height: var(--md-filled-text-field-hover-active-indicator-height, 1px);--_hover-input-text-color: var(--md-filled-text-field-hover-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-label-text-color: var(--md-filled-text-field-hover-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-leading-icon-color: var(--md-filled-text-field-hover-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-color: var(--md-filled-text-field-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-state-layer-opacity: var(--md-filled-text-field-hover-state-layer-opacity, 0.08);--_hover-supporting-text-color: var(--md-filled-text-field-hover-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-trailing-icon-color: var(--md-filled-text-field-hover-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-color: var(--md-filled-text-field-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_input-text-font: var(--md-filled-text-field-input-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_input-text-line-height: var(--md-filled-text-field-input-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_input-text-placeholder-color: var(--md-filled-text-field-input-text-placeholder-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-prefix-color: var(--md-filled-text-field-input-text-prefix-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-size: var(--md-filled-text-field-input-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_input-text-suffix-color: var(--md-filled-text-field-input-text-suffix-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-weight: var(--md-filled-text-field-input-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_label-text-color: var(--md-filled-text-field-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-font: var(--md-filled-text-field-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-filled-text-field-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_label-text-populated-line-height: var(--md-filled-text-field-label-text-populated-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_label-text-populated-size: var(--md-filled-text-field-label-text-populated-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_label-text-size: var(--md-filled-text-field-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_label-text-weight: var(--md-filled-text-field-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_leading-icon-color: var(--md-filled-text-field-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_leading-icon-size: var(--md-filled-text-field-leading-icon-size, 24px);--_supporting-text-color: var(--md-filled-text-field-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_supporting-text-font: var(--md-filled-text-field-supporting-text-font, var(--md-sys-typescale-body-small-font, var(--md-ref-typeface-plain, Roboto)));--_supporting-text-line-height: var(--md-filled-text-field-supporting-text-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_supporting-text-size: var(--md-filled-text-field-supporting-text-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_supporting-text-weight: var(--md-filled-text-field-supporting-text-weight, var(--md-sys-typescale-body-small-weight, var(--md-ref-typeface-weight-regular, 400)));--_trailing-icon-color: var(--md-filled-text-field-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_trailing-icon-size: var(--md-filled-text-field-trailing-icon-size, 24px);--_container-shape-start-start: var(--md-filled-text-field-container-shape-start-start, var(--md-filled-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-start-end: var(--md-filled-text-field-container-shape-start-end, var(--md-filled-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-end-end: var(--md-filled-text-field-container-shape-end-end, var(--md-filled-text-field-container-shape, var(--md-sys-shape-corner-none, 0px)));--_container-shape-end-start: var(--md-filled-text-field-container-shape-end-start, var(--md-filled-text-field-container-shape, var(--md-sys-shape-corner-none, 0px)));--_icon-input-space: var(--md-filled-text-field-icon-input-space, 16px);--_leading-space: var(--md-filled-text-field-leading-space, 16px);--_trailing-space: var(--md-filled-text-field-trailing-space, 16px);--_top-space: var(--md-filled-text-field-top-space, 16px);--_bottom-space: var(--md-filled-text-field-bottom-space, 16px);--_input-text-prefix-trailing-space: var(--md-filled-text-field-input-text-prefix-trailing-space, 2px);--_input-text-suffix-leading-space: var(--md-filled-text-field-input-text-suffix-leading-space, 2px);--_with-label-top-space: var(--md-filled-text-field-with-label-top-space, 8px);--_with-label-bottom-space: var(--md-filled-text-field-with-label-bottom-space, 8px);--_focus-caret-color: var(--md-filled-text-field-focus-caret-color, var(--md-sys-color-primary, #6750a4));--_with-leading-icon-leading-space: var(--md-filled-text-field-with-leading-icon-leading-space, 12px);--_with-trailing-icon-trailing-space: var(--md-filled-text-field-with-trailing-icon-trailing-space, 12px);--md-filled-field-active-indicator-color: var(--_active-indicator-color);--md-filled-field-active-indicator-height: var(--_active-indicator-height);--md-filled-field-bottom-space: var(--_bottom-space);--md-filled-field-container-color: var(--_container-color);--md-filled-field-container-shape-end-end: var(--_container-shape-end-end);--md-filled-field-container-shape-end-start: var(--_container-shape-end-start);--md-filled-field-container-shape-start-end: var(--_container-shape-start-end);--md-filled-field-container-shape-start-start: var(--_container-shape-start-start);--md-filled-field-content-color: var(--_input-text-color);--md-filled-field-content-font: var(--_input-text-font);--md-filled-field-content-line-height: var(--_input-text-line-height);--md-filled-field-content-size: var(--_input-text-size);--md-filled-field-content-space: var(--_icon-input-space);--md-filled-field-content-weight: var(--_input-text-weight);--md-filled-field-disabled-active-indicator-color: var(--_disabled-active-indicator-color);--md-filled-field-disabled-active-indicator-height: var(--_disabled-active-indicator-height);--md-filled-field-disabled-active-indicator-opacity: var(--_disabled-active-indicator-opacity);--md-filled-field-disabled-container-color: var(--_disabled-container-color);--md-filled-field-disabled-container-opacity: var(--_disabled-container-opacity);--md-filled-field-disabled-content-color: var(--_disabled-input-text-color);--md-filled-field-disabled-content-opacity: var(--_disabled-input-text-opacity);--md-filled-field-disabled-label-text-color: var(--_disabled-label-text-color);--md-filled-field-disabled-label-text-opacity: var(--_disabled-label-text-opacity);--md-filled-field-disabled-leading-content-color: var(--_disabled-leading-icon-color);--md-filled-field-disabled-leading-content-opacity: var(--_disabled-leading-icon-opacity);--md-filled-field-disabled-supporting-text-color: var(--_disabled-supporting-text-color);--md-filled-field-disabled-supporting-text-opacity: var(--_disabled-supporting-text-opacity);--md-filled-field-disabled-trailing-content-color: var(--_disabled-trailing-icon-color);--md-filled-field-disabled-trailing-content-opacity: var(--_disabled-trailing-icon-opacity);--md-filled-field-error-active-indicator-color: var(--_error-active-indicator-color);--md-filled-field-error-content-color: var(--_error-input-text-color);--md-filled-field-error-focus-active-indicator-color: var(--_error-focus-active-indicator-color);--md-filled-field-error-focus-content-color: var(--_error-focus-input-text-color);--md-filled-field-error-focus-label-text-color: var(--_error-focus-label-text-color);--md-filled-field-error-focus-leading-content-color: var(--_error-focus-leading-icon-color);--md-filled-field-error-focus-supporting-text-color: var(--_error-focus-supporting-text-color);--md-filled-field-error-focus-trailing-content-color: var(--_error-focus-trailing-icon-color);--md-filled-field-error-hover-active-indicator-color: var(--_error-hover-active-indicator-color);--md-filled-field-error-hover-content-color: var(--_error-hover-input-text-color);--md-filled-field-error-hover-label-text-color: var(--_error-hover-label-text-color);--md-filled-field-error-hover-leading-content-color: var(--_error-hover-leading-icon-color);--md-filled-field-error-hover-state-layer-color: var(--_error-hover-state-layer-color);--md-filled-field-error-hover-state-layer-opacity: var(--_error-hover-state-layer-opacity);--md-filled-field-error-hover-supporting-text-color: var(--_error-hover-supporting-text-color);--md-filled-field-error-hover-trailing-content-color: var(--_error-hover-trailing-icon-color);--md-filled-field-error-label-text-color: var(--_error-label-text-color);--md-filled-field-error-leading-content-color: var(--_error-leading-icon-color);--md-filled-field-error-supporting-text-color: var(--_error-supporting-text-color);--md-filled-field-error-trailing-content-color: var(--_error-trailing-icon-color);--md-filled-field-focus-active-indicator-color: var(--_focus-active-indicator-color);--md-filled-field-focus-active-indicator-height: var(--_focus-active-indicator-height);--md-filled-field-focus-content-color: var(--_focus-input-text-color);--md-filled-field-focus-label-text-color: var(--_focus-label-text-color);--md-filled-field-focus-leading-content-color: var(--_focus-leading-icon-color);--md-filled-field-focus-supporting-text-color: var(--_focus-supporting-text-color);--md-filled-field-focus-trailing-content-color: var(--_focus-trailing-icon-color);--md-filled-field-hover-active-indicator-color: var(--_hover-active-indicator-color);--md-filled-field-hover-active-indicator-height: var(--_hover-active-indicator-height);--md-filled-field-hover-content-color: var(--_hover-input-text-color);--md-filled-field-hover-label-text-color: var(--_hover-label-text-color);--md-filled-field-hover-leading-content-color: var(--_hover-leading-icon-color);--md-filled-field-hover-state-layer-color: var(--_hover-state-layer-color);--md-filled-field-hover-state-layer-opacity: var(--_hover-state-layer-opacity);--md-filled-field-hover-supporting-text-color: var(--_hover-supporting-text-color);--md-filled-field-hover-trailing-content-color: var(--_hover-trailing-icon-color);--md-filled-field-label-text-color: var(--_label-text-color);--md-filled-field-label-text-font: var(--_label-text-font);--md-filled-field-label-text-line-height: var(--_label-text-line-height);--md-filled-field-label-text-populated-line-height: var(--_label-text-populated-line-height);--md-filled-field-label-text-populated-size: var(--_label-text-populated-size);--md-filled-field-label-text-size: var(--_label-text-size);--md-filled-field-label-text-weight: var(--_label-text-weight);--md-filled-field-leading-content-color: var(--_leading-icon-color);--md-filled-field-leading-space: var(--_leading-space);--md-filled-field-supporting-text-color: var(--_supporting-text-color);--md-filled-field-supporting-text-font: var(--_supporting-text-font);--md-filled-field-supporting-text-line-height: var(--_supporting-text-line-height);--md-filled-field-supporting-text-size: var(--_supporting-text-size);--md-filled-field-supporting-text-weight: var(--_supporting-text-weight);--md-filled-field-top-space: var(--_top-space);--md-filled-field-trailing-content-color: var(--_trailing-icon-color);--md-filled-field-trailing-space: var(--_trailing-space);--md-filled-field-with-label-bottom-space: var(--_with-label-bottom-space);--md-filled-field-with-label-top-space: var(--_with-label-top-space);--md-filled-field-with-leading-content-leading-space: var(--_with-leading-icon-leading-space);--md-filled-field-with-trailing-content-trailing-space: var(--_with-trailing-icon-trailing-space)}
`;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Bo=t=>t.strings===void 0,jo={},Go=(t,e=jo)=>t._$AH=e;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Nr=hr(class extends ur{constructor(t){if(super(t),t.type!==se.PROPERTY&&t.type!==se.ATTRIBUTE&&t.type!==se.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Bo(t))throw Error("`live` bindings can only contain a single expression")}render(t){return t}update(t,[e]){if(e===q||e===d)return e;const r=t.element,i=t.name;if(t.type===se.PROPERTY){if(e===r[i])return q}else if(t.type===se.BOOLEAN_ATTRIBUTE){if(!!e===r.hasAttribute(i))return q}else if(t.type===se.ATTRIBUTE&&r.getAttribute(i)===e+"")return q;return Go(t),e}});/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ni="important",Ho=" !"+ni,Ur=hr(class extends ur{constructor(t){var e;if(super(t),t.type!==se.ATTRIBUTE||t.name!=="style"||((e=t.strings)==null?void 0:e.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,r)=>{const i=t[r];return i==null?e:e+`${r=r.includes("-")?r:r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`},"")}update(t,[e]){const{style:r}=t.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(e)),this.render(e);for(const i of this.ft)e[i]==null&&(this.ft.delete(i),i.includes("-")?r.removeProperty(i):r[i]=null);for(const i in e){const o=e[i];if(o!=null){this.ft.add(i);const a=typeof o=="string"&&o.endsWith(Ho);i.includes("-")||a?r.setProperty(i,a?o.slice(0,-11):o,a?ni:""):r[i]=o}}return q}});/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const qo={fromAttribute(t){return t??""},toAttribute(t){return t||null}};/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function gr(t,e){e.bubbles&&(!t.shadowRoot||e.composed)&&e.stopPropagation();const r=Reflect.construct(e.constructor,[e.type,e]),i=t.dispatchEvent(r);return i||e.preventDefault(),i}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Ut=Symbol("createValidator"),Bt=Symbol("getValidityAnchor"),_t=Symbol("privateValidator"),ee=Symbol("privateSyncValidity"),We=Symbol("privateCustomValidationMessage");function Vo(t){var e;class r extends t{constructor(){super(...arguments),this[e]=""}get validity(){return this[ee](),this[U].validity}get validationMessage(){return this[ee](),this[U].validationMessage}get willValidate(){return this[ee](),this[U].willValidate}checkValidity(){return this[ee](),this[U].checkValidity()}reportValidity(){return this[ee](),this[U].reportValidity()}setCustomValidity(o){this[We]=o,this[ee]()}requestUpdate(o,a,s){super.requestUpdate(o,a,s),this[ee]()}firstUpdated(o){super.firstUpdated(o),this[ee]()}[(e=We,ee)](){this[_t]||(this[_t]=this[Ut]());const{validity:o,validationMessage:a}=this[_t].getValidity(),s=!!this[We],c=this[We]||a;this[U].setValidity({...o,customError:s},c,this[Bt]()??void 0)}[Ut](){throw new Error("Implement [createValidator]")}[Bt](){throw new Error("Implement [getValidityAnchor]")}}return r}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const nt=Symbol("getFormValue"),Br=Symbol("getFormState");function Ko(t){class e extends t{get form(){return this[U].form}get labels(){return this[U].labels}get name(){return this.getAttribute("name")??""}set name(i){this.setAttribute("name",i)}get disabled(){return this.hasAttribute("disabled")}set disabled(i){this.toggleAttribute("disabled",i)}attributeChangedCallback(i,o,a){if(i==="name"||i==="disabled"){const s=i==="disabled"?o!==null:o;this.requestUpdate(i,s);return}super.attributeChangedCallback(i,o,a)}requestUpdate(i,o,a){super.requestUpdate(i,o,a),this[U].setFormValue(this[nt](),this[Br]())}[nt](){throw new Error("Implement [getFormValue]")}[Br](){return this[nt]()}formDisabledCallback(i){this.disabled=i}}return e.formAssociated=!0,l([u({noAccessor:!0})],e.prototype,"name",null),l([u({type:Boolean,noAccessor:!0})],e.prototype,"disabled",null),e}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const jt=Symbol("onReportValidity"),Ye=Symbol("privateCleanupFormListeners"),Ze=Symbol("privateDoNotReportInvalid"),Je=Symbol("privateIsSelfReportingValidity"),Xe=Symbol("privateCallOnReportValidity");function Wo(t){var e,r,i;class o extends t{constructor(...s){super(...s),this[e]=new AbortController,this[r]=!1,this[i]=!1,this.addEventListener("invalid",c=>{this[Ze]||!c.isTrusted||this.addEventListener("invalid",()=>{this[Xe](c)},{once:!0})},{capture:!0})}checkValidity(){this[Ze]=!0;const s=super.checkValidity();return this[Ze]=!1,s}reportValidity(){this[Je]=!0;const s=super.reportValidity();return s&&this[Xe](null),this[Je]=!1,s}[(e=Ye,r=Ze,i=Je,Xe)](s){const c=s==null?void 0:s.defaultPrevented;c||(this[jt](s),!(!c&&(s==null?void 0:s.defaultPrevented)))||(this[Je]||Jo(this[U].form,this))&&this.focus()}[jt](s){throw new Error("Implement [onReportValidity]")}formAssociatedCallback(s){super.formAssociatedCallback&&super.formAssociatedCallback(s),this[Ye].abort(),s&&(this[Ye]=new AbortController,Yo(this,s,()=>{this[Xe](null)},this[Ye].signal))}}return o}function Yo(t,e,r,i){const o=Zo(e);let a=!1,s,c=!1;o.addEventListener("before",()=>{c=!0,s=new AbortController,a=!1,t.addEventListener("invalid",()=>{a=!0},{signal:s.signal})},{signal:i}),o.addEventListener("after",()=>{c=!1,s==null||s.abort(),!a&&r()},{signal:i}),e.addEventListener("submit",()=>{c||r()},{signal:i})}const $t=new WeakMap;function Zo(t){if(!$t.has(t)){const e=new EventTarget;$t.set(t,e);for(const r of["reportValidity","requestSubmit"]){const i=t[r];t[r]=function(){e.dispatchEvent(new Event("before"));const o=Reflect.apply(i,this,arguments);return e.dispatchEvent(new Event("after")),o}}}return $t.get(t)}function Jo(t,e){if(!t)return!0;let r;for(const i of t.elements)if(i.matches(":invalid")){r=i;break}return r===e}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Xo{constructor(e){this.getCurrentState=e,this.currentValidity={validity:{},validationMessage:""}}getValidity(){const e=this.getCurrentState();if(!(!this.prevState||!this.equals(this.prevState,e)))return this.currentValidity;const{validity:i,validationMessage:o}=this.computeValidity(e);return this.prevState=this.copy(e),this.currentValidity={validationMessage:o,validity:{badInput:i.badInput,customError:i.customError,patternMismatch:i.patternMismatch,rangeOverflow:i.rangeOverflow,rangeUnderflow:i.rangeUnderflow,stepMismatch:i.stepMismatch,tooLong:i.tooLong,tooShort:i.tooShort,typeMismatch:i.typeMismatch,valueMissing:i.valueMissing}},this.currentValidity}}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Qo extends Xo{computeValidity({state:e,renderedControl:r}){let i=r;Ie(e)&&!i?(i=this.inputControl||document.createElement("input"),this.inputControl=i):i||(i=this.textAreaControl||document.createElement("textarea"),this.textAreaControl=i);const o=Ie(e)?i:null;if(o&&(o.type=e.type),i.value!==e.value&&(i.value=e.value),i.required=e.required,o){const a=e;a.pattern?o.pattern=a.pattern:o.removeAttribute("pattern"),a.min?o.min=a.min:o.removeAttribute("min"),a.max?o.max=a.max:o.removeAttribute("max"),a.step?o.step=a.step:o.removeAttribute("step")}return(e.minLength??-1)>-1?i.setAttribute("minlength",String(e.minLength)):i.removeAttribute("minlength"),(e.maxLength??-1)>-1?i.setAttribute("maxlength",String(e.maxLength)):i.removeAttribute("maxlength"),{validity:i.validity,validationMessage:i.validationMessage}}equals({state:e},{state:r}){const i=e.type===r.type&&e.value===r.value&&e.required===r.required&&e.minLength===r.minLength&&e.maxLength===r.maxLength;return!Ie(e)||!Ie(r)?i:i&&e.pattern===r.pattern&&e.min===r.min&&e.max===r.max&&e.step===r.step}copy({state:e}){return{state:Ie(e)?this.copyInput(e):this.copyTextArea(e),renderedControl:null}}copyInput(e){const{type:r,pattern:i,min:o,max:a,step:s}=e;return{...this.copySharedState(e),type:r,pattern:i,min:o,max:a,step:s}}copyTextArea(e){return{...this.copySharedState(e),type:e.type}}copySharedState({value:e,required:r,minLength:i,maxLength:o}){return{value:e,required:r,minLength:i,maxLength:o}}}function Ie(t){return t.type!=="textarea"}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const ea=ce(Wo(Vo(Ko(mr(_)))));class w extends ea{constructor(){super(...arguments),this.error=!1,this.errorText="",this.label="",this.noAsterisk=!1,this.required=!1,this.value="",this.prefixText="",this.suffixText="",this.hasLeadingIcon=!1,this.hasTrailingIcon=!1,this.supportingText="",this.textDirection="",this.rows=2,this.cols=20,this.inputMode="",this.max="",this.maxLength=-1,this.min="",this.minLength=-1,this.noSpinner=!1,this.pattern="",this.placeholder="",this.readOnly=!1,this.multiple=!1,this.step="",this.type="text",this.autocomplete="",this.dirty=!1,this.focused=!1,this.nativeError=!1,this.nativeErrorText=""}get selectionDirection(){return this.getInputOrTextarea().selectionDirection}set selectionDirection(e){this.getInputOrTextarea().selectionDirection=e}get selectionEnd(){return this.getInputOrTextarea().selectionEnd}set selectionEnd(e){this.getInputOrTextarea().selectionEnd=e}get selectionStart(){return this.getInputOrTextarea().selectionStart}set selectionStart(e){this.getInputOrTextarea().selectionStart=e}get valueAsNumber(){const e=this.getInput();return e?e.valueAsNumber:NaN}set valueAsNumber(e){const r=this.getInput();r&&(r.valueAsNumber=e,this.value=r.value)}get valueAsDate(){const e=this.getInput();return e?e.valueAsDate:null}set valueAsDate(e){const r=this.getInput();r&&(r.valueAsDate=e,this.value=r.value)}get hasError(){return this.error||this.nativeError}select(){this.getInputOrTextarea().select()}setRangeText(...e){this.getInputOrTextarea().setRangeText(...e),this.value=this.getInputOrTextarea().value}setSelectionRange(e,r,i){this.getInputOrTextarea().setSelectionRange(e,r,i)}showPicker(){const e=this.getInput();e&&e.showPicker()}stepDown(e){const r=this.getInput();r&&(r.stepDown(e),this.value=r.value)}stepUp(e){const r=this.getInput();r&&(r.stepUp(e),this.value=r.value)}reset(){this.dirty=!1,this.value=this.getAttribute("value")??"",this.nativeError=!1,this.nativeErrorText=""}attributeChangedCallback(e,r,i){e==="value"&&this.dirty||super.attributeChangedCallback(e,r,i)}render(){const e={disabled:this.disabled,error:!this.disabled&&this.hasError,textarea:this.type==="textarea","no-spinner":this.noSpinner};return n`
      <span class="text-field ${V(e)}">
        ${this.renderField()}
      </span>
    `}updated(e){const r=this.getInputOrTextarea().value;this.value!==r&&(this.value=r)}renderField(){return fr`<${this.fieldTag}
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
    </${this.fieldTag}>`}renderLeadingIcon(){return n`
      <span class="icon leading" slot="start">
        <slot name="leading-icon" @slotchange=${this.handleIconChange}></slot>
      </span>
    `}renderTrailingIcon(){return n`
      <span class="icon trailing" slot="end">
        <slot name="trailing-icon" @slotchange=${this.handleIconChange}></slot>
      </span>
    `}renderInputOrTextarea(){const e={direction:this.textDirection},r=this.ariaLabel||this.label||d,i=this.autocomplete,o=(this.maxLength??-1)>-1,a=(this.minLength??-1)>-1;if(this.type==="textarea")return n`
        <textarea
          class="input"
          style=${Ur(e)}
          aria-describedby="description"
          aria-invalid=${this.hasError}
          aria-label=${r}
          autocomplete=${i||d}
          name=${this.name||d}
          ?disabled=${this.disabled}
          maxlength=${o?this.maxLength:d}
          minlength=${a?this.minLength:d}
          placeholder=${this.placeholder||d}
          ?readonly=${this.readOnly}
          ?required=${this.required}
          rows=${this.rows}
          cols=${this.cols}
          .value=${Nr(this.value)}
          @change=${this.redispatchEvent}
          @focus=${this.handleFocusChange}
          @blur=${this.handleFocusChange}
          @input=${this.handleInput}
          @select=${this.redispatchEvent}></textarea>
      `;const s=this.renderPrefix(),c=this.renderSuffix(),h=this.inputMode;return n`
      <div class="input-wrapper">
        ${s}
        <input
          class="input"
          style=${Ur(e)}
          aria-describedby="description"
          aria-invalid=${this.hasError}
          aria-label=${r}
          autocomplete=${i||d}
          name=${this.name||d}
          ?disabled=${this.disabled}
          inputmode=${h||d}
          max=${this.max||d}
          maxlength=${o?this.maxLength:d}
          min=${this.min||d}
          minlength=${a?this.minLength:d}
          pattern=${this.pattern||d}
          placeholder=${this.placeholder||d}
          ?readonly=${this.readOnly}
          ?required=${this.required}
          ?multiple=${this.multiple}
          step=${this.step||d}
          type=${this.type}
          .value=${Nr(this.value)}
          @change=${this.redispatchEvent}
          @focus=${this.handleFocusChange}
          @blur=${this.handleFocusChange}
          @input=${this.handleInput}
          @select=${this.redispatchEvent} />
        ${c}
      </div>
    `}renderPrefix(){return this.renderAffix(this.prefixText,!1)}renderSuffix(){return this.renderAffix(this.suffixText,!0)}renderAffix(e,r){return e?n`<span class="${V({suffix:r,prefix:!r})}">${e}</span>`:d}getErrorText(){return this.error?this.errorText:this.nativeErrorText}handleFocusChange(){var e;this.focused=((e=this.inputOrTextarea)==null?void 0:e.matches(":focus"))??!1}handleInput(e){this.dirty=!0,this.value=e.target.value}redispatchEvent(e){gr(this,e)}getInputOrTextarea(){return this.inputOrTextarea||(this.connectedCallback(),this.scheduleUpdate()),this.isUpdatePending&&this.scheduleUpdate(),this.inputOrTextarea}getInput(){return this.type==="textarea"?null:this.getInputOrTextarea()}handleIconChange(){this.hasLeadingIcon=this.leadingIcons.length>0,this.hasTrailingIcon=this.trailingIcons.length>0}[nt](){return this.value}formResetCallback(){this.reset()}formStateRestoreCallback(e){this.value=e}focus(){this.getInputOrTextarea().focus()}[Ut](){return new Qo(()=>({state:this,renderedControl:this.inputOrTextarea}))}[Bt](){return this.inputOrTextarea}[jt](e){var i;e==null||e.preventDefault();const r=this.getErrorText();this.nativeError=!!e,this.nativeErrorText=this.validationMessage,r===this.getErrorText()&&((i=this.field)==null||i.reannounceError())}}w.shadowRootOptions={..._.shadowRootOptions,delegatesFocus:!0};l([u({type:Boolean,reflect:!0})],w.prototype,"error",void 0);l([u({attribute:"error-text"})],w.prototype,"errorText",void 0);l([u()],w.prototype,"label",void 0);l([u({type:Boolean,attribute:"no-asterisk"})],w.prototype,"noAsterisk",void 0);l([u({type:Boolean,reflect:!0})],w.prototype,"required",void 0);l([u()],w.prototype,"value",void 0);l([u({attribute:"prefix-text"})],w.prototype,"prefixText",void 0);l([u({attribute:"suffix-text"})],w.prototype,"suffixText",void 0);l([u({type:Boolean,attribute:"has-leading-icon"})],w.prototype,"hasLeadingIcon",void 0);l([u({type:Boolean,attribute:"has-trailing-icon"})],w.prototype,"hasTrailingIcon",void 0);l([u({attribute:"supporting-text"})],w.prototype,"supportingText",void 0);l([u({attribute:"text-direction"})],w.prototype,"textDirection",void 0);l([u({type:Number})],w.prototype,"rows",void 0);l([u({type:Number})],w.prototype,"cols",void 0);l([u({reflect:!0})],w.prototype,"inputMode",void 0);l([u()],w.prototype,"max",void 0);l([u({type:Number})],w.prototype,"maxLength",void 0);l([u()],w.prototype,"min",void 0);l([u({type:Number})],w.prototype,"minLength",void 0);l([u({type:Boolean,attribute:"no-spinner"})],w.prototype,"noSpinner",void 0);l([u()],w.prototype,"pattern",void 0);l([u({reflect:!0,converter:qo})],w.prototype,"placeholder",void 0);l([u({type:Boolean,reflect:!0})],w.prototype,"readOnly",void 0);l([u({type:Boolean,reflect:!0})],w.prototype,"multiple",void 0);l([u()],w.prototype,"step",void 0);l([u({reflect:!0})],w.prototype,"type",void 0);l([u({reflect:!0})],w.prototype,"autocomplete",void 0);l([p()],w.prototype,"dirty",void 0);l([p()],w.prototype,"focused",void 0);l([p()],w.prototype,"nativeError",void 0);l([p()],w.prototype,"nativeErrorText",void 0);l([z(".input")],w.prototype,"inputOrTextarea",void 0);l([z(".field")],w.prototype,"field",void 0);l([de({slot:"leading-icon"})],w.prototype,"leadingIcons",void 0);l([de({slot:"trailing-icon"})],w.prototype,"trailingIcons",void 0);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class ta extends w{constructor(){super(...arguments),this.fieldTag=re`md-filled-field`}}/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const li=y`:host{display:inline-flex;outline:none;resize:both;text-align:start;-webkit-tap-highlight-color:rgba(0,0,0,0)}.text-field,.field{width:100%}.text-field{display:inline-flex}.field{cursor:text}.disabled .field{cursor:default}.text-field,.textarea .field{resize:inherit}slot[name=container]{border-radius:inherit}.icon{color:currentColor;display:flex;align-items:center;justify-content:center;fill:currentColor;position:relative}.icon ::slotted(*){display:flex;position:absolute}[has-start] .icon.leading{font-size:var(--_leading-icon-size);height:var(--_leading-icon-size);width:var(--_leading-icon-size)}[has-end] .icon.trailing{font-size:var(--_trailing-icon-size);height:var(--_trailing-icon-size);width:var(--_trailing-icon-size)}.input-wrapper{display:flex}.input-wrapper>*{all:inherit;padding:0}.input{caret-color:var(--_caret-color);overflow-x:hidden;text-align:inherit}.input::placeholder{color:currentColor;opacity:1}.input::-webkit-calendar-picker-indicator{display:none}.input::-webkit-search-decoration,.input::-webkit-search-cancel-button{display:none}@media(forced-colors: active){.input{background:none}}.no-spinner .input::-webkit-inner-spin-button,.no-spinner .input::-webkit-outer-spin-button{display:none}.no-spinner .input[type=number]{-moz-appearance:textfield}:focus-within .input{caret-color:var(--_focus-caret-color)}.error:focus-within .input{caret-color:var(--_error-focus-caret-color)}.text-field:not(.disabled) .prefix{color:var(--_input-text-prefix-color)}.text-field:not(.disabled) .suffix{color:var(--_input-text-suffix-color)}.text-field:not(.disabled) .input::placeholder{color:var(--_input-text-placeholder-color)}.prefix,.suffix{text-wrap:nowrap;width:min-content}.prefix{padding-inline-end:var(--_input-text-prefix-trailing-space)}.suffix{padding-inline-start:var(--_input-text-suffix-leading-space)}
`;/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let Gt=class extends ta{constructor(){super(...arguments),this.fieldTag=re`md-filled-field`}};Gt.styles=[li,Uo];Gt=l([k("md-filled-text-field")],Gt);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class ra extends I{renderOutline(e){return n`
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
 */const ia=y`@layer styles{:host{--_bottom-space: var(--md-outlined-field-bottom-space, 16px);--_content-color: var(--md-outlined-field-content-color, var(--md-sys-color-on-surface, #1d1b20));--_content-font: var(--md-outlined-field-content-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_content-line-height: var(--md-outlined-field-content-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_content-size: var(--md-outlined-field-content-size, var(--md-sys-typescale-body-large-size, 1rem));--_content-space: var(--md-outlined-field-content-space, 16px);--_content-weight: var(--md-outlined-field-content-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_disabled-content-color: var(--md-outlined-field-disabled-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-content-opacity: var(--md-outlined-field-disabled-content-opacity, 0.38);--_disabled-label-text-color: var(--md-outlined-field-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-outlined-field-disabled-label-text-opacity, 0.38);--_disabled-leading-content-color: var(--md-outlined-field-disabled-leading-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-leading-content-opacity: var(--md-outlined-field-disabled-leading-content-opacity, 0.38);--_disabled-outline-color: var(--md-outlined-field-disabled-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-outline-opacity: var(--md-outlined-field-disabled-outline-opacity, 0.12);--_disabled-outline-width: var(--md-outlined-field-disabled-outline-width, 1px);--_disabled-supporting-text-color: var(--md-outlined-field-disabled-supporting-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-supporting-text-opacity: var(--md-outlined-field-disabled-supporting-text-opacity, 0.38);--_disabled-trailing-content-color: var(--md-outlined-field-disabled-trailing-content-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-trailing-content-opacity: var(--md-outlined-field-disabled-trailing-content-opacity, 0.38);--_error-content-color: var(--md-outlined-field-error-content-color, var(--md-sys-color-on-surface, #1d1b20));--_error-focus-content-color: var(--md-outlined-field-error-focus-content-color, var(--md-sys-color-on-surface, #1d1b20));--_error-focus-label-text-color: var(--md-outlined-field-error-focus-label-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-leading-content-color: var(--md-outlined-field-error-focus-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-focus-outline-color: var(--md-outlined-field-error-focus-outline-color, var(--md-sys-color-error, #b3261e));--_error-focus-supporting-text-color: var(--md-outlined-field-error-focus-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-trailing-content-color: var(--md-outlined-field-error-focus-trailing-content-color, var(--md-sys-color-error, #b3261e));--_error-hover-content-color: var(--md-outlined-field-error-hover-content-color, var(--md-sys-color-on-surface, #1d1b20));--_error-hover-label-text-color: var(--md-outlined-field-error-hover-label-text-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-leading-content-color: var(--md-outlined-field-error-hover-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-hover-outline-color: var(--md-outlined-field-error-hover-outline-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-supporting-text-color: var(--md-outlined-field-error-hover-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-hover-trailing-content-color: var(--md-outlined-field-error-hover-trailing-content-color, var(--md-sys-color-on-error-container, #410e0b));--_error-label-text-color: var(--md-outlined-field-error-label-text-color, var(--md-sys-color-error, #b3261e));--_error-leading-content-color: var(--md-outlined-field-error-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-outline-color: var(--md-outlined-field-error-outline-color, var(--md-sys-color-error, #b3261e));--_error-supporting-text-color: var(--md-outlined-field-error-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-trailing-content-color: var(--md-outlined-field-error-trailing-content-color, var(--md-sys-color-error, #b3261e));--_focus-content-color: var(--md-outlined-field-focus-content-color, var(--md-sys-color-on-surface, #1d1b20));--_focus-label-text-color: var(--md-outlined-field-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_focus-leading-content-color: var(--md-outlined-field-focus-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-outline-color: var(--md-outlined-field-focus-outline-color, var(--md-sys-color-primary, #6750a4));--_focus-outline-width: var(--md-outlined-field-focus-outline-width, 3px);--_focus-supporting-text-color: var(--md-outlined-field-focus-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-trailing-content-color: var(--md-outlined-field-focus-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-content-color: var(--md-outlined-field-hover-content-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-label-text-color: var(--md-outlined-field-hover-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-leading-content-color: var(--md-outlined-field-hover-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-outline-color: var(--md-outlined-field-hover-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-outline-width: var(--md-outlined-field-hover-outline-width, 1px);--_hover-supporting-text-color: var(--md-outlined-field-hover-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-trailing-content-color: var(--md-outlined-field-hover-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-color: var(--md-outlined-field-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-font: var(--md-outlined-field-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-outlined-field-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_label-text-padding-bottom: var(--md-outlined-field-label-text-padding-bottom, 8px);--_label-text-populated-line-height: var(--md-outlined-field-label-text-populated-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_label-text-populated-size: var(--md-outlined-field-label-text-populated-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_label-text-size: var(--md-outlined-field-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_label-text-weight: var(--md-outlined-field-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_leading-content-color: var(--md-outlined-field-leading-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_leading-space: var(--md-outlined-field-leading-space, 16px);--_outline-color: var(--md-outlined-field-outline-color, var(--md-sys-color-outline, #79747e));--_outline-label-padding: var(--md-outlined-field-outline-label-padding, 4px);--_outline-width: var(--md-outlined-field-outline-width, 1px);--_supporting-text-color: var(--md-outlined-field-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_supporting-text-font: var(--md-outlined-field-supporting-text-font, var(--md-sys-typescale-body-small-font, var(--md-ref-typeface-plain, Roboto)));--_supporting-text-leading-space: var(--md-outlined-field-supporting-text-leading-space, 16px);--_supporting-text-line-height: var(--md-outlined-field-supporting-text-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_supporting-text-size: var(--md-outlined-field-supporting-text-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_supporting-text-top-space: var(--md-outlined-field-supporting-text-top-space, 4px);--_supporting-text-trailing-space: var(--md-outlined-field-supporting-text-trailing-space, 16px);--_supporting-text-weight: var(--md-outlined-field-supporting-text-weight, var(--md-sys-typescale-body-small-weight, var(--md-ref-typeface-weight-regular, 400)));--_top-space: var(--md-outlined-field-top-space, 16px);--_trailing-content-color: var(--md-outlined-field-trailing-content-color, var(--md-sys-color-on-surface-variant, #49454f));--_trailing-space: var(--md-outlined-field-trailing-space, 16px);--_with-leading-content-leading-space: var(--md-outlined-field-with-leading-content-leading-space, 12px);--_with-trailing-content-trailing-space: var(--md-outlined-field-with-trailing-content-trailing-space, 12px);--_container-shape-start-start: var(--md-outlined-field-container-shape-start-start, var(--md-outlined-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-start-end: var(--md-outlined-field-container-shape-start-end, var(--md-outlined-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-end-end: var(--md-outlined-field-container-shape-end-end, var(--md-outlined-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-end-start: var(--md-outlined-field-container-shape-end-start, var(--md-outlined-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)))}.outline{border-color:var(--_outline-color);border-radius:inherit;display:flex;pointer-events:none;height:100%;position:absolute;width:100%;z-index:1}.outline-start::before,.outline-start::after,.outline-panel-inactive::before,.outline-panel-inactive::after,.outline-panel-active::before,.outline-panel-active::after,.outline-end::before,.outline-end::after{border:inherit;content:"";inset:0;position:absolute}.outline-start,.outline-end{border:inherit;border-radius:inherit;box-sizing:border-box;position:relative}.outline-start::before,.outline-start::after,.outline-end::before,.outline-end::after{border-bottom-style:solid;border-top-style:solid}.outline-start::after,.outline-end::after{opacity:0;transition:opacity 150ms cubic-bezier(0.2, 0, 0, 1)}.focused .outline-start::after,.focused .outline-end::after{opacity:1}.outline-start::before,.outline-start::after{border-inline-start-style:solid;border-inline-end-style:none;border-start-start-radius:inherit;border-start-end-radius:0;border-end-start-radius:inherit;border-end-end-radius:0;margin-inline-end:var(--_outline-label-padding)}.outline-end{flex-grow:1;margin-inline-start:calc(-1*var(--_outline-label-padding))}.outline-end::before,.outline-end::after{border-inline-start-style:none;border-inline-end-style:solid;border-start-start-radius:0;border-start-end-radius:inherit;border-end-start-radius:0;border-end-end-radius:inherit}.outline-notch{align-items:flex-start;border:inherit;display:flex;margin-inline-start:calc(-1*var(--_outline-label-padding));margin-inline-end:var(--_outline-label-padding);max-width:calc(100% - var(--_leading-space) - var(--_trailing-space));padding:0 var(--_outline-label-padding);position:relative}.no-label .outline-notch{display:none}.outline-panel-inactive,.outline-panel-active{border:inherit;border-bottom-style:solid;inset:0;position:absolute}.outline-panel-inactive::before,.outline-panel-inactive::after,.outline-panel-active::before,.outline-panel-active::after{border-top-style:solid;border-bottom:none;bottom:auto;transform:scaleX(1);transition:transform 150ms cubic-bezier(0.2, 0, 0, 1)}.outline-panel-inactive::before,.outline-panel-active::before{right:50%;transform-origin:top left}.outline-panel-inactive::after,.outline-panel-active::after{left:50%;transform-origin:top right}.populated .outline-panel-inactive::before,.populated .outline-panel-inactive::after,.populated .outline-panel-active::before,.populated .outline-panel-active::after,.focused .outline-panel-inactive::before,.focused .outline-panel-inactive::after,.focused .outline-panel-active::before,.focused .outline-panel-active::after{transform:scaleX(0)}.outline-panel-active{opacity:0;transition:opacity 150ms cubic-bezier(0.2, 0, 0, 1)}.focused .outline-panel-active{opacity:1}.outline-label{display:flex;max-width:100%;transform:translateY(calc(-100% + var(--_label-text-padding-bottom)))}.outline-start,.field:not(.with-start) .content ::slotted(*){padding-inline-start:max(var(--_leading-space),max(var(--_container-shape-start-start),var(--_container-shape-end-start)) + var(--_outline-label-padding))}.field:not(.with-start) .label-wrapper{margin-inline-start:max(var(--_leading-space),max(var(--_container-shape-start-start),var(--_container-shape-end-start)) + var(--_outline-label-padding))}.field:not(.with-end) .content ::slotted(*){padding-inline-end:max(var(--_trailing-space),max(var(--_container-shape-start-end),var(--_container-shape-end-end)))}.field:not(.with-end) .label-wrapper{margin-inline-end:max(var(--_trailing-space),max(var(--_container-shape-start-end),var(--_container-shape-end-end)))}.outline-start::before,.outline-end::before,.outline-panel-inactive,.outline-panel-inactive::before,.outline-panel-inactive::after{border-width:var(--_outline-width)}:hover .outline{border-color:var(--_hover-outline-color);color:var(--_hover-outline-color)}:hover .outline-start::before,:hover .outline-end::before,:hover .outline-panel-inactive,:hover .outline-panel-inactive::before,:hover .outline-panel-inactive::after{border-width:var(--_hover-outline-width)}.focused .outline{border-color:var(--_focus-outline-color);color:var(--_focus-outline-color)}.outline-start::after,.outline-end::after,.outline-panel-active,.outline-panel-active::before,.outline-panel-active::after{border-width:var(--_focus-outline-width)}.disabled .outline{border-color:var(--_disabled-outline-color);color:var(--_disabled-outline-color)}.disabled .outline-start,.disabled .outline-end,.disabled .outline-panel-inactive{opacity:var(--_disabled-outline-opacity)}.disabled .outline-start::before,.disabled .outline-end::before,.disabled .outline-panel-inactive,.disabled .outline-panel-inactive::before,.disabled .outline-panel-inactive::after{border-width:var(--_disabled-outline-width)}.error .outline{border-color:var(--_error-outline-color);color:var(--_error-outline-color)}.error:hover .outline{border-color:var(--_error-hover-outline-color);color:var(--_error-hover-outline-color)}.error.focused .outline{border-color:var(--_error-focus-outline-color);color:var(--_error-focus-outline-color)}.resizable .container{bottom:var(--_focus-outline-width);inset-inline-end:var(--_focus-outline-width);clip-path:inset(var(--_focus-outline-width) 0 0 var(--_focus-outline-width))}.resizable .container>*{top:var(--_focus-outline-width);inset-inline-start:var(--_focus-outline-width)}.resizable .container:dir(rtl){clip-path:inset(var(--_focus-outline-width) var(--_focus-outline-width) 0 0)}}@layer hcm{@media(forced-colors: active){.disabled .outline{border-color:GrayText;color:GrayText}.disabled :is(.outline-start,.outline-end,.outline-panel-inactive){opacity:1}}}
`;/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let Ht=class extends ra{};Ht.styles=[si,ia];Ht=l([k("md-outlined-field")],Ht);/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const oa=y`:host{--_caret-color: var(--md-outlined-text-field-caret-color, var(--md-sys-color-primary, #6750a4));--_disabled-input-text-color: var(--md-outlined-text-field-disabled-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-input-text-opacity: var(--md-outlined-text-field-disabled-input-text-opacity, 0.38);--_disabled-label-text-color: var(--md-outlined-text-field-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-outlined-text-field-disabled-label-text-opacity, 0.38);--_disabled-leading-icon-color: var(--md-outlined-text-field-disabled-leading-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-leading-icon-opacity: var(--md-outlined-text-field-disabled-leading-icon-opacity, 0.38);--_disabled-outline-color: var(--md-outlined-text-field-disabled-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-outline-opacity: var(--md-outlined-text-field-disabled-outline-opacity, 0.12);--_disabled-outline-width: var(--md-outlined-text-field-disabled-outline-width, 1px);--_disabled-supporting-text-color: var(--md-outlined-text-field-disabled-supporting-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-supporting-text-opacity: var(--md-outlined-text-field-disabled-supporting-text-opacity, 0.38);--_disabled-trailing-icon-color: var(--md-outlined-text-field-disabled-trailing-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-trailing-icon-opacity: var(--md-outlined-text-field-disabled-trailing-icon-opacity, 0.38);--_error-focus-caret-color: var(--md-outlined-text-field-error-focus-caret-color, var(--md-sys-color-error, #b3261e));--_error-focus-input-text-color: var(--md-outlined-text-field-error-focus-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_error-focus-label-text-color: var(--md-outlined-text-field-error-focus-label-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-leading-icon-color: var(--md-outlined-text-field-error-focus-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-focus-outline-color: var(--md-outlined-text-field-error-focus-outline-color, var(--md-sys-color-error, #b3261e));--_error-focus-supporting-text-color: var(--md-outlined-text-field-error-focus-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-trailing-icon-color: var(--md-outlined-text-field-error-focus-trailing-icon-color, var(--md-sys-color-error, #b3261e));--_error-hover-input-text-color: var(--md-outlined-text-field-error-hover-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_error-hover-label-text-color: var(--md-outlined-text-field-error-hover-label-text-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-leading-icon-color: var(--md-outlined-text-field-error-hover-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-hover-outline-color: var(--md-outlined-text-field-error-hover-outline-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-supporting-text-color: var(--md-outlined-text-field-error-hover-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-hover-trailing-icon-color: var(--md-outlined-text-field-error-hover-trailing-icon-color, var(--md-sys-color-on-error-container, #410e0b));--_error-input-text-color: var(--md-outlined-text-field-error-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_error-label-text-color: var(--md-outlined-text-field-error-label-text-color, var(--md-sys-color-error, #b3261e));--_error-leading-icon-color: var(--md-outlined-text-field-error-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-outline-color: var(--md-outlined-text-field-error-outline-color, var(--md-sys-color-error, #b3261e));--_error-supporting-text-color: var(--md-outlined-text-field-error-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-trailing-icon-color: var(--md-outlined-text-field-error-trailing-icon-color, var(--md-sys-color-error, #b3261e));--_focus-input-text-color: var(--md-outlined-text-field-focus-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_focus-label-text-color: var(--md-outlined-text-field-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_focus-leading-icon-color: var(--md-outlined-text-field-focus-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-outline-color: var(--md-outlined-text-field-focus-outline-color, var(--md-sys-color-primary, #6750a4));--_focus-outline-width: var(--md-outlined-text-field-focus-outline-width, 3px);--_focus-supporting-text-color: var(--md-outlined-text-field-focus-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-trailing-icon-color: var(--md-outlined-text-field-focus-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-input-text-color: var(--md-outlined-text-field-hover-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-label-text-color: var(--md-outlined-text-field-hover-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-leading-icon-color: var(--md-outlined-text-field-hover-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-outline-color: var(--md-outlined-text-field-hover-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-outline-width: var(--md-outlined-text-field-hover-outline-width, 1px);--_hover-supporting-text-color: var(--md-outlined-text-field-hover-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-trailing-icon-color: var(--md-outlined-text-field-hover-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-color: var(--md-outlined-text-field-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_input-text-font: var(--md-outlined-text-field-input-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_input-text-line-height: var(--md-outlined-text-field-input-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_input-text-placeholder-color: var(--md-outlined-text-field-input-text-placeholder-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-prefix-color: var(--md-outlined-text-field-input-text-prefix-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-size: var(--md-outlined-text-field-input-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_input-text-suffix-color: var(--md-outlined-text-field-input-text-suffix-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-weight: var(--md-outlined-text-field-input-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_label-text-color: var(--md-outlined-text-field-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-font: var(--md-outlined-text-field-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-outlined-text-field-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_label-text-populated-line-height: var(--md-outlined-text-field-label-text-populated-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_label-text-populated-size: var(--md-outlined-text-field-label-text-populated-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_label-text-size: var(--md-outlined-text-field-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_label-text-weight: var(--md-outlined-text-field-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_leading-icon-color: var(--md-outlined-text-field-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_leading-icon-size: var(--md-outlined-text-field-leading-icon-size, 24px);--_outline-color: var(--md-outlined-text-field-outline-color, var(--md-sys-color-outline, #79747e));--_outline-width: var(--md-outlined-text-field-outline-width, 1px);--_supporting-text-color: var(--md-outlined-text-field-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_supporting-text-font: var(--md-outlined-text-field-supporting-text-font, var(--md-sys-typescale-body-small-font, var(--md-ref-typeface-plain, Roboto)));--_supporting-text-line-height: var(--md-outlined-text-field-supporting-text-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_supporting-text-size: var(--md-outlined-text-field-supporting-text-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_supporting-text-weight: var(--md-outlined-text-field-supporting-text-weight, var(--md-sys-typescale-body-small-weight, var(--md-ref-typeface-weight-regular, 400)));--_trailing-icon-color: var(--md-outlined-text-field-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_trailing-icon-size: var(--md-outlined-text-field-trailing-icon-size, 24px);--_container-shape-start-start: var(--md-outlined-text-field-container-shape-start-start, var(--md-outlined-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-start-end: var(--md-outlined-text-field-container-shape-start-end, var(--md-outlined-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-end-end: var(--md-outlined-text-field-container-shape-end-end, var(--md-outlined-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_container-shape-end-start: var(--md-outlined-text-field-container-shape-end-start, var(--md-outlined-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_icon-input-space: var(--md-outlined-text-field-icon-input-space, 16px);--_leading-space: var(--md-outlined-text-field-leading-space, 16px);--_trailing-space: var(--md-outlined-text-field-trailing-space, 16px);--_top-space: var(--md-outlined-text-field-top-space, 16px);--_bottom-space: var(--md-outlined-text-field-bottom-space, 16px);--_input-text-prefix-trailing-space: var(--md-outlined-text-field-input-text-prefix-trailing-space, 2px);--_input-text-suffix-leading-space: var(--md-outlined-text-field-input-text-suffix-leading-space, 2px);--_focus-caret-color: var(--md-outlined-text-field-focus-caret-color, var(--md-sys-color-primary, #6750a4));--_with-leading-icon-leading-space: var(--md-outlined-text-field-with-leading-icon-leading-space, 12px);--_with-trailing-icon-trailing-space: var(--md-outlined-text-field-with-trailing-icon-trailing-space, 12px);--md-outlined-field-bottom-space: var(--_bottom-space);--md-outlined-field-container-shape-end-end: var(--_container-shape-end-end);--md-outlined-field-container-shape-end-start: var(--_container-shape-end-start);--md-outlined-field-container-shape-start-end: var(--_container-shape-start-end);--md-outlined-field-container-shape-start-start: var(--_container-shape-start-start);--md-outlined-field-content-color: var(--_input-text-color);--md-outlined-field-content-font: var(--_input-text-font);--md-outlined-field-content-line-height: var(--_input-text-line-height);--md-outlined-field-content-size: var(--_input-text-size);--md-outlined-field-content-space: var(--_icon-input-space);--md-outlined-field-content-weight: var(--_input-text-weight);--md-outlined-field-disabled-content-color: var(--_disabled-input-text-color);--md-outlined-field-disabled-content-opacity: var(--_disabled-input-text-opacity);--md-outlined-field-disabled-label-text-color: var(--_disabled-label-text-color);--md-outlined-field-disabled-label-text-opacity: var(--_disabled-label-text-opacity);--md-outlined-field-disabled-leading-content-color: var(--_disabled-leading-icon-color);--md-outlined-field-disabled-leading-content-opacity: var(--_disabled-leading-icon-opacity);--md-outlined-field-disabled-outline-color: var(--_disabled-outline-color);--md-outlined-field-disabled-outline-opacity: var(--_disabled-outline-opacity);--md-outlined-field-disabled-outline-width: var(--_disabled-outline-width);--md-outlined-field-disabled-supporting-text-color: var(--_disabled-supporting-text-color);--md-outlined-field-disabled-supporting-text-opacity: var(--_disabled-supporting-text-opacity);--md-outlined-field-disabled-trailing-content-color: var(--_disabled-trailing-icon-color);--md-outlined-field-disabled-trailing-content-opacity: var(--_disabled-trailing-icon-opacity);--md-outlined-field-error-content-color: var(--_error-input-text-color);--md-outlined-field-error-focus-content-color: var(--_error-focus-input-text-color);--md-outlined-field-error-focus-label-text-color: var(--_error-focus-label-text-color);--md-outlined-field-error-focus-leading-content-color: var(--_error-focus-leading-icon-color);--md-outlined-field-error-focus-outline-color: var(--_error-focus-outline-color);--md-outlined-field-error-focus-supporting-text-color: var(--_error-focus-supporting-text-color);--md-outlined-field-error-focus-trailing-content-color: var(--_error-focus-trailing-icon-color);--md-outlined-field-error-hover-content-color: var(--_error-hover-input-text-color);--md-outlined-field-error-hover-label-text-color: var(--_error-hover-label-text-color);--md-outlined-field-error-hover-leading-content-color: var(--_error-hover-leading-icon-color);--md-outlined-field-error-hover-outline-color: var(--_error-hover-outline-color);--md-outlined-field-error-hover-supporting-text-color: var(--_error-hover-supporting-text-color);--md-outlined-field-error-hover-trailing-content-color: var(--_error-hover-trailing-icon-color);--md-outlined-field-error-label-text-color: var(--_error-label-text-color);--md-outlined-field-error-leading-content-color: var(--_error-leading-icon-color);--md-outlined-field-error-outline-color: var(--_error-outline-color);--md-outlined-field-error-supporting-text-color: var(--_error-supporting-text-color);--md-outlined-field-error-trailing-content-color: var(--_error-trailing-icon-color);--md-outlined-field-focus-content-color: var(--_focus-input-text-color);--md-outlined-field-focus-label-text-color: var(--_focus-label-text-color);--md-outlined-field-focus-leading-content-color: var(--_focus-leading-icon-color);--md-outlined-field-focus-outline-color: var(--_focus-outline-color);--md-outlined-field-focus-outline-width: var(--_focus-outline-width);--md-outlined-field-focus-supporting-text-color: var(--_focus-supporting-text-color);--md-outlined-field-focus-trailing-content-color: var(--_focus-trailing-icon-color);--md-outlined-field-hover-content-color: var(--_hover-input-text-color);--md-outlined-field-hover-label-text-color: var(--_hover-label-text-color);--md-outlined-field-hover-leading-content-color: var(--_hover-leading-icon-color);--md-outlined-field-hover-outline-color: var(--_hover-outline-color);--md-outlined-field-hover-outline-width: var(--_hover-outline-width);--md-outlined-field-hover-supporting-text-color: var(--_hover-supporting-text-color);--md-outlined-field-hover-trailing-content-color: var(--_hover-trailing-icon-color);--md-outlined-field-label-text-color: var(--_label-text-color);--md-outlined-field-label-text-font: var(--_label-text-font);--md-outlined-field-label-text-line-height: var(--_label-text-line-height);--md-outlined-field-label-text-populated-line-height: var(--_label-text-populated-line-height);--md-outlined-field-label-text-populated-size: var(--_label-text-populated-size);--md-outlined-field-label-text-size: var(--_label-text-size);--md-outlined-field-label-text-weight: var(--_label-text-weight);--md-outlined-field-leading-content-color: var(--_leading-icon-color);--md-outlined-field-leading-space: var(--_leading-space);--md-outlined-field-outline-color: var(--_outline-color);--md-outlined-field-outline-width: var(--_outline-width);--md-outlined-field-supporting-text-color: var(--_supporting-text-color);--md-outlined-field-supporting-text-font: var(--_supporting-text-font);--md-outlined-field-supporting-text-line-height: var(--_supporting-text-line-height);--md-outlined-field-supporting-text-size: var(--_supporting-text-size);--md-outlined-field-supporting-text-weight: var(--_supporting-text-weight);--md-outlined-field-top-space: var(--_top-space);--md-outlined-field-trailing-content-color: var(--_trailing-icon-color);--md-outlined-field-trailing-space: var(--_trailing-space);--md-outlined-field-with-leading-content-leading-space: var(--_with-leading-icon-leading-space);--md-outlined-field-with-trailing-content-trailing-space: var(--_with-trailing-icon-trailing-space)}
`;/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class aa extends w{constructor(){super(...arguments),this.fieldTag=re`md-outlined-field`}}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let qt=class extends aa{constructor(){super(...arguments),this.fieldTag=re`md-outlined-field`}};qt.styles=[li,oa];qt=l([k("md-outlined-text-field")],qt);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const sa=ce(_);class He extends sa{constructor(){super(...arguments),this.value=0,this.max=1,this.indeterminate=!1,this.fourColor=!1}render(){const{ariaLabel:e}=this;return n`
      <div
        class="progress ${V(this.getRenderClasses())}"
        role="progressbar"
        aria-label="${e||d}"
        aria-valuemin="0"
        aria-valuemax=${this.max}
        aria-valuenow=${this.indeterminate?d:this.value}
        >${this.renderIndicator()}</div
      >
    `}getRenderClasses(){return{indeterminate:this.indeterminate,"four-color":this.fourColor}}}l([u({type:Number})],He.prototype,"value",void 0);l([u({type:Number})],He.prototype,"max",void 0);l([u({type:Boolean})],He.prototype,"indeterminate",void 0);l([u({type:Boolean,attribute:"four-color"})],He.prototype,"fourColor",void 0);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class na extends He{renderIndicator(){return this.indeterminate?this.renderIndeterminateContainer():this.renderDeterminateContainer()}renderDeterminateContainer(){const e=(1-this.value/this.max)*100;return n`
      <svg viewBox="0 0 4800 4800">
        <circle class="track" pathLength="100"></circle>
        <circle
          class="active-track"
          pathLength="100"
          stroke-dashoffset=${e}></circle>
      </svg>
    `}renderIndeterminateContainer(){return n` <div class="spinner">
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
 */const la=y`:host{--_active-indicator-color: var(--md-circular-progress-active-indicator-color, var(--md-sys-color-primary, #6750a4));--_active-indicator-width: var(--md-circular-progress-active-indicator-width, 10);--_four-color-active-indicator-four-color: var(--md-circular-progress-four-color-active-indicator-four-color, var(--md-sys-color-tertiary-container, #ffd8e4));--_four-color-active-indicator-one-color: var(--md-circular-progress-four-color-active-indicator-one-color, var(--md-sys-color-primary, #6750a4));--_four-color-active-indicator-three-color: var(--md-circular-progress-four-color-active-indicator-three-color, var(--md-sys-color-tertiary, #7d5260));--_four-color-active-indicator-two-color: var(--md-circular-progress-four-color-active-indicator-two-color, var(--md-sys-color-primary-container, #eaddff));--_size: var(--md-circular-progress-size, 48px);display:inline-flex;vertical-align:middle;width:var(--_size);height:var(--_size);position:relative;align-items:center;justify-content:center;contain:strict;content-visibility:auto}.progress{flex:1;align-self:stretch;margin:4px}.progress,.spinner,.left,.right,.circle,svg,.track,.active-track{position:absolute;inset:0}svg{transform:rotate(-90deg)}circle{cx:50%;cy:50%;r:calc(50%*(1 - var(--_active-indicator-width)/100));stroke-width:calc(var(--_active-indicator-width)*1%);stroke-dasharray:100;fill:rgba(0,0,0,0)}.active-track{transition:stroke-dashoffset 500ms cubic-bezier(0, 0, 0.2, 1);stroke:var(--_active-indicator-color)}.track{stroke:rgba(0,0,0,0)}.progress.indeterminate{animation:linear infinite linear-rotate;animation-duration:1568.2352941176ms}.spinner{animation:infinite both rotate-arc;animation-duration:5332ms;animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1)}.left{overflow:hidden;inset:0 50% 0 0}.right{overflow:hidden;inset:0 0 0 50%}.circle{box-sizing:border-box;border-radius:50%;border:solid calc(var(--_active-indicator-width)/100*(var(--_size) - 8px));border-color:var(--_active-indicator-color) var(--_active-indicator-color) rgba(0,0,0,0) rgba(0,0,0,0);animation:expand-arc;animation-iteration-count:infinite;animation-fill-mode:both;animation-duration:1333ms,5332ms;animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1)}.four-color .circle{animation-name:expand-arc,four-color}.left .circle{rotate:135deg;inset:0 -100% 0 0}.right .circle{rotate:100deg;inset:0 0 0 -100%;animation-delay:-666.5ms,0ms}@media(forced-colors: active){.active-track{stroke:CanvasText}.circle{border-color:CanvasText CanvasText Canvas Canvas}}@keyframes expand-arc{0%{transform:rotate(265deg)}50%{transform:rotate(130deg)}100%{transform:rotate(265deg)}}@keyframes rotate-arc{12.5%{transform:rotate(135deg)}25%{transform:rotate(270deg)}37.5%{transform:rotate(405deg)}50%{transform:rotate(540deg)}62.5%{transform:rotate(675deg)}75%{transform:rotate(810deg)}87.5%{transform:rotate(945deg)}100%{transform:rotate(1080deg)}}@keyframes linear-rotate{to{transform:rotate(360deg)}}@keyframes four-color{0%{border-top-color:var(--_four-color-active-indicator-one-color);border-right-color:var(--_four-color-active-indicator-one-color)}15%{border-top-color:var(--_four-color-active-indicator-one-color);border-right-color:var(--_four-color-active-indicator-one-color)}25%{border-top-color:var(--_four-color-active-indicator-two-color);border-right-color:var(--_four-color-active-indicator-two-color)}40%{border-top-color:var(--_four-color-active-indicator-two-color);border-right-color:var(--_four-color-active-indicator-two-color)}50%{border-top-color:var(--_four-color-active-indicator-three-color);border-right-color:var(--_four-color-active-indicator-three-color)}65%{border-top-color:var(--_four-color-active-indicator-three-color);border-right-color:var(--_four-color-active-indicator-three-color)}75%{border-top-color:var(--_four-color-active-indicator-four-color);border-right-color:var(--_four-color-active-indicator-four-color)}90%{border-top-color:var(--_four-color-active-indicator-four-color);border-right-color:var(--_four-color-active-indicator-four-color)}100%{border-top-color:var(--_four-color-active-indicator-one-color);border-right-color:var(--_four-color-active-indicator-one-color)}}
`;/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let Vt=class extends na{};Vt.styles=[la];Vt=l([k("md-circular-progress")],Vt);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class mt extends _{constructor(){super(...arguments),this.inset=!1,this.insetStart=!1,this.insetEnd=!1}}l([u({type:Boolean,reflect:!0})],mt.prototype,"inset",void 0);l([u({type:Boolean,reflect:!0,attribute:"inset-start"})],mt.prototype,"insetStart",void 0);l([u({type:Boolean,reflect:!0,attribute:"inset-end"})],mt.prototype,"insetEnd",void 0);/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const da=y`:host{box-sizing:border-box;color:var(--md-divider-color, var(--md-sys-color-outline-variant, #cac4d0));display:flex;height:var(--md-divider-thickness, 1px);width:100%}:host([inset]),:host([inset-start]){padding-inline-start:16px}:host([inset]),:host([inset-end]){padding-inline-end:16px}:host::before{background:currentColor;content:"";height:100%;width:100%}@media(forced-colors: active){:host::before{background:CanvasText}}
`;/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let Kt=class extends mt{};Kt.styles=[da];Kt=l([k("md-divider")],Kt);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const ca={dialog:[[[{transform:"translateY(-50px)"},{transform:"translateY(0)"}],{duration:500,easing:xe.EMPHASIZED}]],scrim:[[[{opacity:0},{opacity:.32}],{duration:500,easing:"linear"}]],container:[[[{opacity:0},{opacity:1}],{duration:50,easing:"linear",pseudoElement:"::before"}],[[{height:"35%"},{height:"100%"}],{duration:500,easing:xe.EMPHASIZED,pseudoElement:"::before"}]],headline:[[[{opacity:0},{opacity:0,offset:.2},{opacity:1}],{duration:250,easing:"linear",fill:"forwards"}]],content:[[[{opacity:0},{opacity:0,offset:.2},{opacity:1}],{duration:250,easing:"linear",fill:"forwards"}]],actions:[[[{opacity:0},{opacity:0,offset:.5},{opacity:1}],{duration:300,easing:"linear",fill:"forwards"}]]},pa={dialog:[[[{transform:"translateY(0)"},{transform:"translateY(-50px)"}],{duration:150,easing:xe.EMPHASIZED_ACCELERATE}]],scrim:[[[{opacity:.32},{opacity:0}],{duration:150,easing:"linear"}]],container:[[[{height:"100%"},{height:"35%"}],{duration:150,easing:xe.EMPHASIZED_ACCELERATE,pseudoElement:"::before"}],[[{opacity:"1"},{opacity:"0"}],{delay:100,duration:50,easing:"linear",pseudoElement:"::before"}]],headline:[[[{opacity:1},{opacity:0}],{duration:100,easing:"linear",fill:"forwards"}]],content:[[[{opacity:1},{opacity:0}],{duration:100,easing:"linear",fill:"forwards"}]],actions:[[[{opacity:1},{opacity:0}],{duration:100,easing:"linear",fill:"forwards"}]]};/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const ha=ce(_);class L extends ha{get open(){return this.isOpen}set open(e){e!==this.isOpen&&(this.isOpen=e,e?(this.setAttribute("open",""),this.show()):(this.removeAttribute("open"),this.close()))}constructor(){super(),this.quick=!1,this.returnValue="",this.noFocusTrap=!1,this.getOpenAnimation=()=>ca,this.getCloseAnimation=()=>pa,this.isOpen=!1,this.isOpening=!1,this.isConnectedPromise=this.getIsConnectedPromise(),this.isAtScrollTop=!1,this.isAtScrollBottom=!1,this.nextClickIsFromContent=!1,this.hasHeadline=!1,this.hasActions=!1,this.hasIcon=!1,this.escapePressedWithoutCancel=!1,this.treewalker=document.createTreeWalker(this,NodeFilter.SHOW_ELEMENT),this.addEventListener("submit",this.handleSubmit)}async show(){var i;this.isOpening=!0,await this.isConnectedPromise,await this.updateComplete;const e=this.dialog;if(e.open||!this.isOpening){this.isOpening=!1;return}if(!this.dispatchEvent(new Event("open",{cancelable:!0}))){this.open=!1,this.isOpening=!1;return}e.showModal(),this.open=!0,this.scroller&&(this.scroller.scrollTop=0),(i=this.querySelector("[autofocus]"))==null||i.focus(),await this.animateDialog(this.getOpenAnimation()),this.dispatchEvent(new Event("opened")),this.isOpening=!1}async close(e=this.returnValue){if(this.isOpening=!1,!this.isConnected){this.open=!1;return}await this.updateComplete;const r=this.dialog;if(!r.open||this.isOpening){this.open=!1;return}const i=this.returnValue;if(this.returnValue=e,!this.dispatchEvent(new Event("close",{cancelable:!0}))){this.returnValue=i;return}await this.animateDialog(this.getCloseAnimation()),r.close(e),this.open=!1,this.dispatchEvent(new Event("closed"))}connectedCallback(){super.connectedCallback(),this.isConnectedPromiseResolve()}disconnectedCallback(){super.disconnectedCallback(),this.isConnectedPromise=this.getIsConnectedPromise()}render(){const e=this.open&&!(this.isAtScrollTop&&this.isAtScrollBottom),r={"has-headline":this.hasHeadline,"has-actions":this.hasActions,"has-icon":this.hasIcon,scrollable:e,"show-top-divider":e&&!this.isAtScrollTop,"show-bottom-divider":e&&!this.isAtScrollBottom},i=this.open&&!this.noFocusTrap,o=n`
      <div
        class="focus-trap"
        tabindex="0"
        aria-hidden="true"
        @focus=${this.handleFocusTrapFocus}></div>
    `,{ariaLabel:a}=this;return n`
      <div class="scrim"></div>
      <dialog
        class=${V(r)}
        aria-label=${a||d}
        aria-labelledby=${this.hasHeadline?"headline":d}
        role=${this.type==="alert"?"alertdialog":d}
        @cancel=${this.handleCancel}
        @click=${this.handleDialogClick}
        @close=${this.handleClose}
        @keydown=${this.handleKeydown}
        .returnValue=${this.returnValue||d}>
        ${i?o:d}
        <div class="container" @click=${this.handleContentClick}>
          <div class="headline">
            <div class="icon" aria-hidden="true">
              <slot name="icon" @slotchange=${this.handleIconChange}></slot>
            </div>
            <h2 id="headline" aria-hidden=${!this.hasHeadline||d}>
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
        ${i?o:d}
      </dialog>
    `}firstUpdated(){this.intersectionObserver=new IntersectionObserver(e=>{for(const r of e)this.handleAnchorIntersection(r)},{root:this.scroller}),this.intersectionObserver.observe(this.topAnchor),this.intersectionObserver.observe(this.bottomAnchor)}handleDialogClick(){if(this.nextClickIsFromContent){this.nextClickIsFromContent=!1;return}this.dispatchEvent(new Event("cancel",{cancelable:!0}))&&this.close()}handleContentClick(){this.nextClickIsFromContent=!0}handleSubmit(e){const r=e.target,{submitter:i}=e;r.getAttribute("method")!=="dialog"||!i||this.close(i.getAttribute("value")??this.returnValue)}handleCancel(e){if(e.target!==this.dialog)return;this.escapePressedWithoutCancel=!1;const r=!gr(this,e);e.preventDefault(),!r&&this.close()}handleClose(){var e;this.escapePressedWithoutCancel&&(this.escapePressedWithoutCancel=!1,(e=this.dialog)==null||e.dispatchEvent(new Event("cancel",{cancelable:!0})))}handleKeydown(e){e.key==="Escape"&&(this.escapePressedWithoutCancel=!0,setTimeout(()=>{this.escapePressedWithoutCancel=!1}))}async animateDialog(e){var ve;if((ve=this.cancelAnimations)==null||ve.abort(),this.cancelAnimations=new AbortController,this.quick)return;const{dialog:r,scrim:i,container:o,headline:a,content:s,actions:c}=this;if(!r||!i||!o||!a||!s||!c)return;const{container:h,dialog:v,scrim:f,headline:m,content:b,actions:$}=e,H=[[r,v??[]],[i,f??[]],[o,h??[]],[a,m??[]],[s,b??[]],[c,$??[]]],me=[];for(const[Y,_e]of H)for(const Ri of _e){const $r=Y.animate(...Ri);this.cancelAnimations.signal.addEventListener("abort",()=>{$r.cancel()}),me.push($r)}await Promise.all(me.map(Y=>Y.finished.catch(()=>{})))}handleHeadlineChange(e){const r=e.target;this.hasHeadline=r.assignedElements().length>0}handleActionsChange(e){const r=e.target;this.hasActions=r.assignedElements().length>0}handleIconChange(e){const r=e.target;this.hasIcon=r.assignedElements().length>0}handleAnchorIntersection(e){const{target:r,isIntersecting:i}=e;r===this.topAnchor&&(this.isAtScrollTop=i),r===this.bottomAnchor&&(this.isAtScrollBottom=i)}getIsConnectedPromise(){return new Promise(e=>{this.isConnectedPromiseResolve=e})}handleFocusTrapFocus(e){var m;const[r,i]=this.getFirstAndLastFocusableChildren();if(!r||!i){(m=this.dialog)==null||m.focus();return}const o=e.target===this.firstFocusTrap,a=!o,s=e.relatedTarget===r,c=e.relatedTarget===i,h=!s&&!c;if(a&&c||o&&h){r.focus();return}if(o&&s||a&&h){i.focus();return}}getFirstAndLastFocusableChildren(){if(!this.treewalker)return[null,null];let e=null,r=null;for(this.treewalker.currentNode=this.treewalker.root;this.treewalker.nextNode();){const i=this.treewalker.currentNode;ua(i)&&(e||(e=i),r=i)}return[e,r]}}l([u({type:Boolean})],L.prototype,"open",null);l([u({type:Boolean})],L.prototype,"quick",void 0);l([u({attribute:!1})],L.prototype,"returnValue",void 0);l([u()],L.prototype,"type",void 0);l([u({type:Boolean,attribute:"no-focus-trap"})],L.prototype,"noFocusTrap",void 0);l([z("dialog")],L.prototype,"dialog",void 0);l([z(".scrim")],L.prototype,"scrim",void 0);l([z(".container")],L.prototype,"container",void 0);l([z(".headline")],L.prototype,"headline",void 0);l([z(".content")],L.prototype,"content",void 0);l([z(".actions")],L.prototype,"actions",void 0);l([p()],L.prototype,"isAtScrollTop",void 0);l([p()],L.prototype,"isAtScrollBottom",void 0);l([z(".scroller")],L.prototype,"scroller",void 0);l([z(".top.anchor")],L.prototype,"topAnchor",void 0);l([z(".bottom.anchor")],L.prototype,"bottomAnchor",void 0);l([z(".focus-trap")],L.prototype,"firstFocusTrap",void 0);l([p()],L.prototype,"hasHeadline",void 0);l([p()],L.prototype,"hasActions",void 0);l([p()],L.prototype,"hasIcon",void 0);function ua(t){var a;const e=":is(button,input,select,textarea,object,:is(a,area)[href],[tabindex],[contenteditable=true])",r=":not(:disabled,[disabled])";return t.matches(e+r+':not([tabindex^="-"])')?!0:!t.localName.includes("-")||!t.matches(r)?!1:((a=t.shadowRoot)==null?void 0:a.delegatesFocus)??!1}/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const ma=y`:host{border-start-start-radius:var(--md-dialog-container-shape-start-start, var(--md-dialog-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));border-start-end-radius:var(--md-dialog-container-shape-start-end, var(--md-dialog-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));border-end-end-radius:var(--md-dialog-container-shape-end-end, var(--md-dialog-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));border-end-start-radius:var(--md-dialog-container-shape-end-start, var(--md-dialog-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));display:contents;margin:auto;max-height:min(560px,100% - 48px);max-width:min(560px,100% - 48px);min-height:140px;min-width:280px;position:fixed;height:fit-content;width:fit-content}dialog{background:rgba(0,0,0,0);border:none;border-radius:inherit;flex-direction:column;height:inherit;margin:inherit;max-height:inherit;max-width:inherit;min-height:inherit;min-width:inherit;outline:none;overflow:visible;padding:0;width:inherit}dialog[open]{display:flex}::backdrop{background:none}.scrim{background:var(--md-sys-color-scrim, #000);display:none;inset:0;opacity:32%;pointer-events:none;position:fixed;z-index:1}:host([open]) .scrim{display:flex}h2{all:unset;align-self:stretch}.headline{align-items:center;color:var(--md-dialog-headline-color, var(--md-sys-color-on-surface, #1d1b20));display:flex;flex-direction:column;font-family:var(--md-dialog-headline-font, var(--md-sys-typescale-headline-small-font, var(--md-ref-typeface-brand, Roboto)));font-size:var(--md-dialog-headline-size, var(--md-sys-typescale-headline-small-size, 1.5rem));line-height:var(--md-dialog-headline-line-height, var(--md-sys-typescale-headline-small-line-height, 2rem));font-weight:var(--md-dialog-headline-weight, var(--md-sys-typescale-headline-small-weight, var(--md-ref-typeface-weight-regular, 400)));position:relative}slot[name=headline]::slotted(*){align-items:center;align-self:stretch;box-sizing:border-box;display:flex;gap:8px;padding:24px 24px 0}.icon{display:flex}slot[name=icon]::slotted(*){color:var(--md-dialog-icon-color, var(--md-sys-color-secondary, #625b71));fill:currentColor;font-size:var(--md-dialog-icon-size, 24px);margin-top:24px;height:var(--md-dialog-icon-size, 24px);width:var(--md-dialog-icon-size, 24px)}.has-icon slot[name=headline]::slotted(*){justify-content:center;padding-top:16px}.scrollable slot[name=headline]::slotted(*){padding-bottom:16px}.scrollable.has-headline slot[name=content]::slotted(*){padding-top:8px}.container{border-radius:inherit;display:flex;flex-direction:column;flex-grow:1;overflow:hidden;position:relative;transform-origin:top}.container::before{background:var(--md-dialog-container-color, var(--md-sys-color-surface-container-high, #ece6f0));border-radius:inherit;content:"";inset:0;position:absolute}.scroller{display:flex;flex:1;flex-direction:column;overflow:hidden;z-index:1}.scrollable .scroller{overflow-y:scroll}.content{color:var(--md-dialog-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));font-family:var(--md-dialog-supporting-text-font, var(--md-sys-typescale-body-medium-font, var(--md-ref-typeface-plain, Roboto)));font-size:var(--md-dialog-supporting-text-size, var(--md-sys-typescale-body-medium-size, 0.875rem));line-height:var(--md-dialog-supporting-text-line-height, var(--md-sys-typescale-body-medium-line-height, 1.25rem));flex:1;font-weight:var(--md-dialog-supporting-text-weight, var(--md-sys-typescale-body-medium-weight, var(--md-ref-typeface-weight-regular, 400)));height:min-content;position:relative}slot[name=content]::slotted(*){box-sizing:border-box;padding:24px}.anchor{position:absolute}.top.anchor{top:0}.bottom.anchor{bottom:0}.actions{position:relative}slot[name=actions]::slotted(*){box-sizing:border-box;display:flex;gap:8px;justify-content:flex-end;padding:16px 24px 24px}.has-actions slot[name=content]::slotted(*){padding-bottom:8px}md-divider{display:none;position:absolute}.has-headline.show-top-divider .headline md-divider,.has-actions.show-bottom-divider .actions md-divider{display:flex}.headline md-divider{bottom:0}.actions md-divider{top:0}@media(forced-colors: active){dialog{outline:2px solid WindowText}}
`;/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let Wt=class extends L{};Wt.styles=[ma];Wt=l([k("md-dialog")],Wt);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const va=ce(_);class ie extends va{get rippleDisabled(){return this.disabled||this.softDisabled}constructor(){super(),this.disabled=!1,this.softDisabled=!1,this.alwaysFocusable=!1,this.label="",this.hasIcon=!1,this.addEventListener("click",this.handleClick.bind(this))}focus(e){this.disabled&&!this.alwaysFocusable||super.focus(e)}render(){return n`
      <div class="container ${V(this.getContainerClasses())}">
        ${this.renderContainerContent()}
      </div>
    `}updated(e){e.has("disabled")&&e.get("disabled")!==void 0&&this.dispatchEvent(new Event("update-focus",{bubbles:!0}))}getContainerClasses(){return{disabled:this.disabled||this.softDisabled,"has-icon":this.hasIcon}}renderContainerContent(){return n`
      ${this.renderOutline()}
      <md-focus-ring part="focus-ring" for=${this.primaryId}></md-focus-ring>
      <md-ripple
        for=${this.primaryId}
        ?disabled=${this.rippleDisabled}></md-ripple>
      ${this.renderPrimaryAction(this.renderPrimaryContent())}
    `}renderOutline(){return n`<span class="outline"></span>`}renderLeadingIcon(){return n`<slot name="icon" @slotchange=${this.handleIconChange}></slot>`}renderPrimaryContent(){return n`
      <span class="leading icon" aria-hidden="true">
        ${this.renderLeadingIcon()}
      </span>
      <span class="label">
        <span class="label-text" id="label">
          ${this.label?this.label:n`<slot></slot>`}
        </span>
      </span>
      <span class="touch"></span>
    `}handleIconChange(e){const r=e.target;this.hasIcon=r.assignedElements({flatten:!0}).length>0}handleClick(e){if(this.softDisabled||this.disabled&&this.alwaysFocusable){e.stopImmediatePropagation(),e.preventDefault();return}}}ie.shadowRootOptions={..._.shadowRootOptions,delegatesFocus:!0};l([u({type:Boolean,reflect:!0})],ie.prototype,"disabled",void 0);l([u({type:Boolean,attribute:"soft-disabled",reflect:!0})],ie.prototype,"softDisabled",void 0);l([u({type:Boolean,attribute:"always-focusable"})],ie.prototype,"alwaysFocusable",void 0);l([u()],ie.prototype,"label",void 0);l([u({type:Boolean,reflect:!0,attribute:"has-icon"})],ie.prototype,"hasIcon",void 0);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class di extends _{get chips(){return this.childElements.filter(e=>e instanceof ie)}constructor(){super(),this.internals=this.attachInternals(),this.addEventListener("focusin",this.updateTabIndices.bind(this)),this.addEventListener("update-focus",this.updateTabIndices.bind(this)),this.addEventListener("keydown",this.handleKeyDown.bind(this)),this.internals.role="toolbar"}render(){return n`<slot @slotchange=${this.updateTabIndices}></slot>`}handleKeyDown(e){const r=e.key==="ArrowLeft",i=e.key==="ArrowRight",o=e.key==="Home",a=e.key==="End";if(!r&&!i&&!o&&!a)return;const{chips:s}=this;if(s.length<2)return;if(e.preventDefault(),o||a){const b=o?0:s.length-1;s[b].focus({trailing:a}),this.updateTabIndices();return}const h=getComputedStyle(this).direction==="rtl"?r:i,v=s.find(b=>b.matches(":focus-within"));if(!v){(h?s[0]:s[s.length-1]).focus({trailing:!h}),this.updateTabIndices();return}const f=s.indexOf(v);let m=h?f+1:f-1;for(;m!==f;){m>=s.length?m=0:m<0&&(m=s.length-1);const b=s[m];if(b.disabled&&!b.alwaysFocusable){h?m++:m--;continue}b.focus({trailing:!h}),this.updateTabIndices();break}}updateTabIndices(){const{chips:e}=this;let r;for(const i of e){const o=i.alwaysFocusable||!i.disabled;if(i.matches(":focus-within")&&o){r=i;continue}o&&!r&&(r=i),i.tabIndex=-1}r&&(r.tabIndex=0)}}l([de()],di.prototype,"childElements",void 0);/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const fa=y`:host{display:flex;flex-wrap:wrap;gap:8px}
`;/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let Yt=class extends di{};Yt.styles=[fa];Yt=l([k("md-chip-set")],Yt);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class qe extends ie{constructor(){super(...arguments),this.elevated=!1,this.href="",this.download="",this.target=""}get primaryId(){return this.href?"link":"button"}get rippleDisabled(){return!this.href&&(this.disabled||this.softDisabled)}getContainerClasses(){return{...super.getContainerClasses(),disabled:!this.href&&(this.disabled||this.softDisabled),elevated:this.elevated,link:!!this.href}}renderPrimaryAction(e){const{ariaLabel:r}=this;return this.href?n`
        <a
          class="primary action"
          id="link"
          aria-label=${r||d}
          href=${this.href}
          download=${this.download||d}
          target=${this.target||d}
          >${e}</a
        >
      `:n`
      <button
        class="primary action"
        id="button"
        aria-label=${r||d}
        aria-disabled=${this.softDisabled||d}
        ?disabled=${this.disabled&&!this.alwaysFocusable}
        type="button"
        >${e}</button
      >
    `}renderOutline(){return this.elevated?n`<md-elevation part="elevation"></md-elevation>`:super.renderOutline()}}l([u({type:Boolean})],qe.prototype,"elevated",void 0);l([u()],qe.prototype,"href",void 0);l([u()],qe.prototype,"download",void 0);l([u()],qe.prototype,"target",void 0);/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const ga=y`:host{--_container-height: var(--md-assist-chip-container-height, 32px);--_disabled-label-text-color: var(--md-assist-chip-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-assist-chip-disabled-label-text-opacity, 0.38);--_elevated-container-color: var(--md-assist-chip-elevated-container-color, var(--md-sys-color-surface-container-low, #f7f2fa));--_elevated-container-elevation: var(--md-assist-chip-elevated-container-elevation, 1);--_elevated-container-shadow-color: var(--md-assist-chip-elevated-container-shadow-color, var(--md-sys-color-shadow, #000));--_elevated-disabled-container-color: var(--md-assist-chip-elevated-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));--_elevated-disabled-container-elevation: var(--md-assist-chip-elevated-disabled-container-elevation, 0);--_elevated-disabled-container-opacity: var(--md-assist-chip-elevated-disabled-container-opacity, 0.12);--_elevated-focus-container-elevation: var(--md-assist-chip-elevated-focus-container-elevation, 1);--_elevated-hover-container-elevation: var(--md-assist-chip-elevated-hover-container-elevation, 2);--_elevated-pressed-container-elevation: var(--md-assist-chip-elevated-pressed-container-elevation, 1);--_focus-label-text-color: var(--md-assist-chip-focus-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-label-text-color: var(--md-assist-chip-hover-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-state-layer-color: var(--md-assist-chip-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-state-layer-opacity: var(--md-assist-chip-hover-state-layer-opacity, 0.08);--_label-text-color: var(--md-assist-chip-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_label-text-font: var(--md-assist-chip-label-text-font, var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-assist-chip-label-text-line-height, var(--md-sys-typescale-label-large-line-height, 1.25rem));--_label-text-size: var(--md-assist-chip-label-text-size, var(--md-sys-typescale-label-large-size, 0.875rem));--_label-text-weight: var(--md-assist-chip-label-text-weight, var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)));--_pressed-label-text-color: var(--md-assist-chip-pressed-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_pressed-state-layer-color: var(--md-assist-chip-pressed-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_pressed-state-layer-opacity: var(--md-assist-chip-pressed-state-layer-opacity, 0.12);--_disabled-outline-color: var(--md-assist-chip-disabled-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-outline-opacity: var(--md-assist-chip-disabled-outline-opacity, 0.12);--_focus-outline-color: var(--md-assist-chip-focus-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_outline-color: var(--md-assist-chip-outline-color, var(--md-sys-color-outline, #79747e));--_outline-width: var(--md-assist-chip-outline-width, 1px);--_disabled-leading-icon-color: var(--md-assist-chip-disabled-leading-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-leading-icon-opacity: var(--md-assist-chip-disabled-leading-icon-opacity, 0.38);--_focus-leading-icon-color: var(--md-assist-chip-focus-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_hover-leading-icon-color: var(--md-assist-chip-hover-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_leading-icon-color: var(--md-assist-chip-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-size: var(--md-assist-chip-icon-size, 18px);--_pressed-leading-icon-color: var(--md-assist-chip-pressed-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_container-shape-start-start: var(--md-assist-chip-container-shape-start-start, var(--md-assist-chip-container-shape, var(--md-sys-shape-corner-small, 8px)));--_container-shape-start-end: var(--md-assist-chip-container-shape-start-end, var(--md-assist-chip-container-shape, var(--md-sys-shape-corner-small, 8px)));--_container-shape-end-end: var(--md-assist-chip-container-shape-end-end, var(--md-assist-chip-container-shape, var(--md-sys-shape-corner-small, 8px)));--_container-shape-end-start: var(--md-assist-chip-container-shape-end-start, var(--md-assist-chip-container-shape, var(--md-sys-shape-corner-small, 8px)));--_leading-space: var(--md-assist-chip-leading-space, 16px);--_trailing-space: var(--md-assist-chip-trailing-space, 16px);--_icon-label-space: var(--md-assist-chip-icon-label-space, 8px);--_with-leading-icon-leading-space: var(--md-assist-chip-with-leading-icon-leading-space, 8px)}@media(forced-colors: active){.link .outline{border-color:ActiveText}}
`;/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const ci=y`.elevated{--md-elevation-level: var(--_elevated-container-elevation);--md-elevation-shadow-color: var(--_elevated-container-shadow-color)}.elevated::before{background:var(--_elevated-container-color)}.elevated:hover{--md-elevation-level: var(--_elevated-hover-container-elevation)}.elevated:focus-within{--md-elevation-level: var(--_elevated-focus-container-elevation)}.elevated:active{--md-elevation-level: var(--_elevated-pressed-container-elevation)}.elevated.disabled{--md-elevation-level: var(--_elevated-disabled-container-elevation)}.elevated.disabled::before{background:var(--_elevated-disabled-container-color);opacity:var(--_elevated-disabled-container-opacity)}@media(forced-colors: active){.elevated md-elevation{border:1px solid CanvasText}.elevated.disabled md-elevation{border-color:GrayText}}
`;/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const pi=y`:host{border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end);display:inline-flex;height:var(--_container-height);cursor:pointer;-webkit-tap-highlight-color:rgba(0,0,0,0);--md-ripple-hover-color: var(--_hover-state-layer-color);--md-ripple-hover-opacity: var(--_hover-state-layer-opacity);--md-ripple-pressed-color: var(--_pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_pressed-state-layer-opacity)}:host(:is([disabled],[soft-disabled])){pointer-events:none}:host([touch-target=wrapper]){margin:max(0px,(48px - var(--_container-height))/2) 0}md-focus-ring{--md-focus-ring-shape-start-start: var(--_container-shape-start-start);--md-focus-ring-shape-start-end: var(--_container-shape-start-end);--md-focus-ring-shape-end-end: var(--_container-shape-end-end);--md-focus-ring-shape-end-start: var(--_container-shape-end-start)}.container{border-radius:inherit;box-sizing:border-box;display:flex;height:100%;position:relative;width:100%}.container::before{border-radius:inherit;content:"";inset:0;pointer-events:none;position:absolute}.container:not(.disabled){cursor:pointer}.container.disabled{pointer-events:none}.cell{display:flex}.action{align-items:baseline;appearance:none;background:none;border:none;border-radius:inherit;display:flex;outline:none;padding:0;position:relative;text-decoration:none}.primary.action{min-width:0;padding-inline-start:var(--_leading-space);padding-inline-end:var(--_trailing-space)}.has-icon .primary.action{padding-inline-start:var(--_with-leading-icon-leading-space)}.touch{height:48px;inset:50% 0 0;position:absolute;transform:translateY(-50%);width:100%}:host([touch-target=none]) .touch{display:none}.outline{border:var(--_outline-width) solid var(--_outline-color);border-radius:inherit;inset:0;pointer-events:none;position:absolute}:where(:focus) .outline{border-color:var(--_focus-outline-color)}:where(.disabled) .outline{border-color:var(--_disabled-outline-color);opacity:var(--_disabled-outline-opacity)}md-ripple{border-radius:inherit}.label,.icon,.touch{z-index:1}.label{align-items:center;color:var(--_label-text-color);display:flex;font-family:var(--_label-text-font);font-size:var(--_label-text-size);font-weight:var(--_label-text-weight);height:100%;line-height:var(--_label-text-line-height);overflow:hidden;user-select:none}.label-text{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}:where(:hover) .label{color:var(--_hover-label-text-color)}:where(:focus) .label{color:var(--_focus-label-text-color)}:where(:active) .label{color:var(--_pressed-label-text-color)}:where(.disabled) .label{color:var(--_disabled-label-text-color);opacity:var(--_disabled-label-text-opacity)}.icon{align-self:center;display:flex;fill:currentColor;position:relative}.icon ::slotted(:first-child){font-size:var(--_icon-size);height:var(--_icon-size);width:var(--_icon-size)}.leading.icon{color:var(--_leading-icon-color)}.leading.icon ::slotted(*),.leading.icon svg{margin-inline-end:var(--_icon-label-space)}:where(:hover) .leading.icon{color:var(--_hover-leading-icon-color)}:where(:focus) .leading.icon{color:var(--_focus-leading-icon-color)}:where(:active) .leading.icon{color:var(--_pressed-leading-icon-color)}:where(.disabled) .leading.icon{color:var(--_disabled-leading-icon-color);opacity:var(--_disabled-leading-icon-opacity)}@media(forced-colors: active){:where(.disabled) :is(.label,.outline,.leading.icon){color:GrayText;opacity:1}}a,button{text-transform:inherit}a,button:not(:disabled,[aria-disabled=true]){cursor:inherit}
`;/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let Zt=class extends qe{};Zt.styles=[pi,ci,ga];Zt=l([k("md-assist-chip")],Zt);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Qe="aria-label-remove";class ba extends ie{get ariaLabelRemove(){if(this.hasAttribute(Qe))return this.getAttribute(Qe);const{ariaLabel:e}=this;return e||this.label?`Remove ${e||this.label}`:null}set ariaLabelRemove(e){const r=this.ariaLabelRemove;e!==r&&(e===null?this.removeAttribute(Qe):this.setAttribute(Qe,e),this.requestUpdate())}constructor(){super(),this.handleTrailingActionFocus=this.handleTrailingActionFocus.bind(this),this.addEventListener("keydown",this.handleKeyDown.bind(this))}focus(e){if((this.alwaysFocusable||!this.disabled)&&(e!=null&&e.trailing)&&this.trailingAction){this.trailingAction.focus(e);return}super.focus(e)}renderContainerContent(){return n`
      ${super.renderContainerContent()}
      ${this.renderTrailingAction(this.handleTrailingActionFocus)}
    `}handleKeyDown(e){var v,f;const r=e.key==="ArrowLeft",i=e.key==="ArrowRight";if(!r&&!i||!this.primaryAction||!this.trailingAction)return;const a=getComputedStyle(this).direction==="rtl"?r:i,s=(v=this.primaryAction)==null?void 0:v.matches(":focus-within"),c=(f=this.trailingAction)==null?void 0:f.matches(":focus-within");if(a&&c||!a&&s)return;e.preventDefault(),e.stopPropagation(),(a?this.trailingAction:this.primaryAction).focus()}handleTrailingActionFocus(){const{primaryAction:e,trailingAction:r}=this;!e||!r||(e.tabIndex=-1,r.addEventListener("focusout",()=>{e.tabIndex=0},{once:!0}))}}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function ya({ariaLabel:t,disabled:e,focusListener:r,tabbable:i=!1}){return n`
    <span id="remove-label" hidden aria-hidden="true">Remove</span>
    <button
      class="trailing action"
      aria-label=${t||d}
      aria-labelledby=${t?d:"remove-label label"}
      tabindex=${i?d:-1}
      @click=${xa}
      @focus=${r}>
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
  `}function xa(t){this.disabled||this.softDisabled||(t.stopPropagation(),!this.dispatchEvent(new Event("remove",{cancelable:!0})))||this.remove()}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class we extends ba{constructor(){super(...arguments),this.elevated=!1,this.removable=!1,this.selected=!1,this.hasSelectedIcon=!1}get primaryId(){return"button"}getContainerClasses(){return{...super.getContainerClasses(),elevated:this.elevated,selected:this.selected,"has-trailing":this.removable,"has-icon":this.hasIcon||this.selected}}renderPrimaryAction(e){const{ariaLabel:r}=this;return n`
      <button
        class="primary action"
        id="button"
        aria-label=${r||d}
        aria-pressed=${this.selected}
        aria-disabled=${this.softDisabled||d}
        ?disabled=${this.disabled&&!this.alwaysFocusable}
        @click=${this.handleClickOnChild}
        >${e}</button
      >
    `}renderLeadingIcon(){return this.selected?n`
      <slot name="selected-icon">
        <svg class="checkmark" viewBox="0 0 18 18" aria-hidden="true">
          <path
            d="M6.75012 12.1274L3.62262 8.99988L2.55762 10.0574L6.75012 14.2499L15.7501 5.24988L14.6926 4.19238L6.75012 12.1274Z" />
        </svg>
      </slot>
    `:super.renderLeadingIcon()}renderTrailingAction(e){return this.removable?ya({focusListener:e,ariaLabel:this.ariaLabelRemove,disabled:this.disabled||this.softDisabled}):d}renderOutline(){return this.elevated?n`<md-elevation part="elevation"></md-elevation>`:super.renderOutline()}handleClickOnChild(e){if(this.disabled||this.softDisabled)return;const r=this.selected;if(this.selected=!this.selected,!gr(this,e)){this.selected=r;return}}}l([u({type:Boolean})],we.prototype,"elevated",void 0);l([u({type:Boolean})],we.prototype,"removable",void 0);l([u({type:Boolean,reflect:!0})],we.prototype,"selected",void 0);l([u({type:Boolean,reflect:!0,attribute:"has-selected-icon"})],we.prototype,"hasSelectedIcon",void 0);l([z(".primary.action")],we.prototype,"primaryAction",void 0);l([z(".trailing.action")],we.prototype,"trailingAction",void 0);/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const wa=y`:host{--_container-height: var(--md-filter-chip-container-height, 32px);--_disabled-label-text-color: var(--md-filter-chip-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-filter-chip-disabled-label-text-opacity, 0.38);--_elevated-container-elevation: var(--md-filter-chip-elevated-container-elevation, 1);--_elevated-container-shadow-color: var(--md-filter-chip-elevated-container-shadow-color, var(--md-sys-color-shadow, #000));--_elevated-disabled-container-color: var(--md-filter-chip-elevated-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));--_elevated-disabled-container-elevation: var(--md-filter-chip-elevated-disabled-container-elevation, 0);--_elevated-disabled-container-opacity: var(--md-filter-chip-elevated-disabled-container-opacity, 0.12);--_elevated-focus-container-elevation: var(--md-filter-chip-elevated-focus-container-elevation, 1);--_elevated-hover-container-elevation: var(--md-filter-chip-elevated-hover-container-elevation, 2);--_elevated-pressed-container-elevation: var(--md-filter-chip-elevated-pressed-container-elevation, 1);--_elevated-selected-container-color: var(--md-filter-chip-elevated-selected-container-color, var(--md-sys-color-secondary-container, #e8def8));--_label-text-font: var(--md-filter-chip-label-text-font, var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-filter-chip-label-text-line-height, var(--md-sys-typescale-label-large-line-height, 1.25rem));--_label-text-size: var(--md-filter-chip-label-text-size, var(--md-sys-typescale-label-large-size, 0.875rem));--_label-text-weight: var(--md-filter-chip-label-text-weight, var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)));--_selected-focus-label-text-color: var(--md-filter-chip-selected-focus-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-hover-label-text-color: var(--md-filter-chip-selected-hover-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-hover-state-layer-color: var(--md-filter-chip-selected-hover-state-layer-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-hover-state-layer-opacity: var(--md-filter-chip-selected-hover-state-layer-opacity, 0.08);--_selected-label-text-color: var(--md-filter-chip-selected-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-pressed-label-text-color: var(--md-filter-chip-selected-pressed-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-pressed-state-layer-color: var(--md-filter-chip-selected-pressed-state-layer-color, var(--md-sys-color-on-surface-variant, #49454f));--_selected-pressed-state-layer-opacity: var(--md-filter-chip-selected-pressed-state-layer-opacity, 0.12);--_elevated-container-color: var(--md-filter-chip-elevated-container-color, var(--md-sys-color-surface-container-low, #f7f2fa));--_disabled-outline-color: var(--md-filter-chip-disabled-outline-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-outline-opacity: var(--md-filter-chip-disabled-outline-opacity, 0.12);--_disabled-selected-container-color: var(--md-filter-chip-disabled-selected-container-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-selected-container-opacity: var(--md-filter-chip-disabled-selected-container-opacity, 0.12);--_focus-outline-color: var(--md-filter-chip-focus-outline-color, var(--md-sys-color-on-surface-variant, #49454f));--_outline-color: var(--md-filter-chip-outline-color, var(--md-sys-color-outline, #79747e));--_outline-width: var(--md-filter-chip-outline-width, 1px);--_selected-container-color: var(--md-filter-chip-selected-container-color, var(--md-sys-color-secondary-container, #e8def8));--_selected-outline-width: var(--md-filter-chip-selected-outline-width, 0px);--_focus-label-text-color: var(--md-filter-chip-focus-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-label-text-color: var(--md-filter-chip-hover-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-color: var(--md-filter-chip-hover-state-layer-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-state-layer-opacity: var(--md-filter-chip-hover-state-layer-opacity, 0.08);--_label-text-color: var(--md-filter-chip-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-label-text-color: var(--md-filter-chip-pressed-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-state-layer-color: var(--md-filter-chip-pressed-state-layer-color, var(--md-sys-color-on-secondary-container, #1d192b));--_pressed-state-layer-opacity: var(--md-filter-chip-pressed-state-layer-opacity, 0.12);--_icon-size: var(--md-filter-chip-icon-size, 18px);--_disabled-leading-icon-color: var(--md-filter-chip-disabled-leading-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-leading-icon-opacity: var(--md-filter-chip-disabled-leading-icon-opacity, 0.38);--_selected-focus-leading-icon-color: var(--md-filter-chip-selected-focus-leading-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-hover-leading-icon-color: var(--md-filter-chip-selected-hover-leading-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-leading-icon-color: var(--md-filter-chip-selected-leading-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-pressed-leading-icon-color: var(--md-filter-chip-selected-pressed-leading-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_focus-leading-icon-color: var(--md-filter-chip-focus-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_hover-leading-icon-color: var(--md-filter-chip-hover-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_leading-icon-color: var(--md-filter-chip-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_pressed-leading-icon-color: var(--md-filter-chip-pressed-leading-icon-color, var(--md-sys-color-primary, #6750a4));--_disabled-trailing-icon-color: var(--md-filter-chip-disabled-trailing-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-trailing-icon-opacity: var(--md-filter-chip-disabled-trailing-icon-opacity, 0.38);--_selected-focus-trailing-icon-color: var(--md-filter-chip-selected-focus-trailing-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-hover-trailing-icon-color: var(--md-filter-chip-selected-hover-trailing-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-pressed-trailing-icon-color: var(--md-filter-chip-selected-pressed-trailing-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_selected-trailing-icon-color: var(--md-filter-chip-selected-trailing-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_focus-trailing-icon-color: var(--md-filter-chip-focus-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-trailing-icon-color: var(--md-filter-chip-hover-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-trailing-icon-color: var(--md-filter-chip-pressed-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_trailing-icon-color: var(--md-filter-chip-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_container-shape-start-start: var(--md-filter-chip-container-shape-start-start, var(--md-filter-chip-container-shape, var(--md-sys-shape-corner-small, 8px)));--_container-shape-start-end: var(--md-filter-chip-container-shape-start-end, var(--md-filter-chip-container-shape, var(--md-sys-shape-corner-small, 8px)));--_container-shape-end-end: var(--md-filter-chip-container-shape-end-end, var(--md-filter-chip-container-shape, var(--md-sys-shape-corner-small, 8px)));--_container-shape-end-start: var(--md-filter-chip-container-shape-end-start, var(--md-filter-chip-container-shape, var(--md-sys-shape-corner-small, 8px)));--_leading-space: var(--md-filter-chip-leading-space, 16px);--_trailing-space: var(--md-filter-chip-trailing-space, 16px);--_icon-label-space: var(--md-filter-chip-icon-label-space, 8px);--_with-leading-icon-leading-space: var(--md-filter-chip-with-leading-icon-leading-space, 8px);--_with-trailing-icon-trailing-space: var(--md-filter-chip-with-trailing-icon-trailing-space, 8px)}.selected.elevated::before{background:var(--_elevated-selected-container-color)}.checkmark{height:var(--_icon-size);width:var(--_icon-size)}.disabled .checkmark{opacity:var(--_disabled-leading-icon-opacity)}@media(forced-colors: active){.disabled .checkmark{opacity:1}}
`;/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const _a=y`.selected{--md-ripple-hover-color: var(--_selected-hover-state-layer-color);--md-ripple-hover-opacity: var(--_selected-hover-state-layer-opacity);--md-ripple-pressed-color: var(--_selected-pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_selected-pressed-state-layer-opacity)}:where(.selected)::before{background:var(--_selected-container-color)}:where(.selected) .outline{border-width:var(--_selected-outline-width)}:where(.selected.disabled)::before{background:var(--_disabled-selected-container-color);opacity:var(--_disabled-selected-container-opacity)}:where(.selected) .label{color:var(--_selected-label-text-color)}:where(.selected:hover) .label{color:var(--_selected-hover-label-text-color)}:where(.selected:focus) .label{color:var(--_selected-focus-label-text-color)}:where(.selected:active) .label{color:var(--_selected-pressed-label-text-color)}:where(.selected) .leading.icon{color:var(--_selected-leading-icon-color)}:where(.selected:hover) .leading.icon{color:var(--_selected-hover-leading-icon-color)}:where(.selected:focus) .leading.icon{color:var(--_selected-focus-leading-icon-color)}:where(.selected:active) .leading.icon{color:var(--_selected-pressed-leading-icon-color)}@media(forced-colors: active){:where(.selected:not(.elevated))::before{border:1px solid CanvasText}:where(.selected) .outline{border-width:1px}}
`;/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const $a=y`.trailing.action{align-items:center;justify-content:center;padding-inline-start:var(--_icon-label-space);padding-inline-end:var(--_with-trailing-icon-trailing-space)}.trailing.action :is(md-ripple,md-focus-ring){border-radius:50%;height:calc(1.3333333333*var(--_icon-size));width:calc(1.3333333333*var(--_icon-size))}.trailing.action md-focus-ring{inset:unset}.has-trailing .primary.action{padding-inline-end:0}.trailing.icon{color:var(--_trailing-icon-color);height:var(--_icon-size);width:var(--_icon-size)}:where(:hover) .trailing.icon{color:var(--_hover-trailing-icon-color)}:where(:focus) .trailing.icon{color:var(--_focus-trailing-icon-color)}:where(:active) .trailing.icon{color:var(--_pressed-trailing-icon-color)}:where(.disabled) .trailing.icon{color:var(--_disabled-trailing-icon-color);opacity:var(--_disabled-trailing-icon-opacity)}:where(.selected) .trailing.icon{color:var(--_selected-trailing-icon-color)}:where(.selected:hover) .trailing.icon{color:var(--_selected-hover-trailing-icon-color)}:where(.selected:focus) .trailing.icon{color:var(--_selected-focus-trailing-icon-color)}:where(.selected:active) .trailing.icon{color:var(--_selected-pressed-trailing-icon-color)}@media(forced-colors: active){.trailing.icon{color:ButtonText}:where(.disabled) .trailing.icon{color:GrayText;opacity:1}}
`;/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let Jt=class extends we{};Jt.styles=[pi,ci,$a,_a,wa];Jt=l([k("md-filter-chip")],Jt);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const ka=ce(_);class Ve extends ka{constructor(){super(...arguments),this.size="medium",this.label="",this.lowered=!1}render(){const{ariaLabel:e}=this;return n`
      <button
        class="fab ${V(this.getRenderClasses())}"
        aria-label=${e||d}>
        <md-elevation part="elevation"></md-elevation>
        <md-focus-ring part="focus-ring"></md-focus-ring>
        <md-ripple class="ripple"></md-ripple>
        ${this.renderTouchTarget()} ${this.renderIcon()} ${this.renderLabel()}
      </button>
    `}getRenderClasses(){const e=!!this.label;return{lowered:this.lowered,small:this.size==="small"&&!e,large:this.size==="large"&&!e,extended:e}}renderTouchTarget(){return n`<div class="touch-target"></div>`}renderLabel(){return this.label?n`<span class="label">${this.label}</span>`:""}renderIcon(){const{ariaLabel:e}=this;return n`<span class="icon">
      <slot
        name="icon"
        aria-hidden=${e||this.label?"true":d}>
        <span></span>
      </slot>
    </span>`}}Ve.shadowRootOptions={mode:"open",delegatesFocus:!0};l([u({reflect:!0})],Ve.prototype,"size",void 0);l([u()],Ve.prototype,"label",void 0);l([u({type:Boolean})],Ve.prototype,"lowered",void 0);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class hi extends Ve{constructor(){super(...arguments),this.variant="surface"}getRenderClasses(){return{...super.getRenderClasses(),primary:this.variant==="primary",secondary:this.variant==="secondary",tertiary:this.variant==="tertiary"}}}l([u()],hi.prototype,"variant",void 0);/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Ca=y`:host{--_container-color: var(--md-fab-container-color, var(--md-sys-color-surface-container-high, #ece6f0));--_container-elevation: var(--md-fab-container-elevation, 3);--_container-height: var(--md-fab-container-height, 56px);--_container-shadow-color: var(--md-fab-container-shadow-color, var(--md-sys-color-shadow, #000));--_container-width: var(--md-fab-container-width, 56px);--_focus-container-elevation: var(--md-fab-focus-container-elevation, 3);--_focus-icon-color: var(--md-fab-focus-icon-color, var(--md-sys-color-primary, #6750a4));--_hover-container-elevation: var(--md-fab-hover-container-elevation, 4);--_hover-icon-color: var(--md-fab-hover-icon-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-color: var(--md-fab-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-opacity: var(--md-fab-hover-state-layer-opacity, 0.08);--_icon-color: var(--md-fab-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-size: var(--md-fab-icon-size, 24px);--_lowered-container-color: var(--md-fab-lowered-container-color, var(--md-sys-color-surface-container-low, #f7f2fa));--_lowered-container-elevation: var(--md-fab-lowered-container-elevation, 1);--_lowered-focus-container-elevation: var(--md-fab-lowered-focus-container-elevation, 1);--_lowered-hover-container-elevation: var(--md-fab-lowered-hover-container-elevation, 2);--_lowered-pressed-container-elevation: var(--md-fab-lowered-pressed-container-elevation, 1);--_pressed-container-elevation: var(--md-fab-pressed-container-elevation, 3);--_pressed-icon-color: var(--md-fab-pressed-icon-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-color: var(--md-fab-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-opacity: var(--md-fab-pressed-state-layer-opacity, 0.12);--_focus-label-text-color: var(--md-fab-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_hover-label-text-color: var(--md-fab-hover-label-text-color, var(--md-sys-color-primary, #6750a4));--_label-text-color: var(--md-fab-label-text-color, var(--md-sys-color-primary, #6750a4));--_label-text-font: var(--md-fab-label-text-font, var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-fab-label-text-line-height, var(--md-sys-typescale-label-large-line-height, 1.25rem));--_label-text-size: var(--md-fab-label-text-size, var(--md-sys-typescale-label-large-size, 0.875rem));--_label-text-weight: var(--md-fab-label-text-weight, var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)));--_large-container-height: var(--md-fab-large-container-height, 96px);--_large-container-width: var(--md-fab-large-container-width, 96px);--_large-icon-size: var(--md-fab-large-icon-size, 36px);--_pressed-label-text-color: var(--md-fab-pressed-label-text-color, var(--md-sys-color-primary, #6750a4));--_primary-container-color: var(--md-fab-primary-container-color, var(--md-sys-color-primary-container, #eaddff));--_primary-focus-icon-color: var(--md-fab-primary-focus-icon-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-focus-label-text-color: var(--md-fab-primary-focus-label-text-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-hover-icon-color: var(--md-fab-primary-hover-icon-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-hover-label-text-color: var(--md-fab-primary-hover-label-text-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-hover-state-layer-color: var(--md-fab-primary-hover-state-layer-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-icon-color: var(--md-fab-primary-icon-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-label-text-color: var(--md-fab-primary-label-text-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-pressed-icon-color: var(--md-fab-primary-pressed-icon-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-pressed-label-text-color: var(--md-fab-primary-pressed-label-text-color, var(--md-sys-color-on-primary-container, #21005d));--_primary-pressed-state-layer-color: var(--md-fab-primary-pressed-state-layer-color, var(--md-sys-color-on-primary-container, #21005d));--_secondary-container-color: var(--md-fab-secondary-container-color, var(--md-sys-color-secondary-container, #e8def8));--_secondary-focus-icon-color: var(--md-fab-secondary-focus-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-focus-label-text-color: var(--md-fab-secondary-focus-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-hover-icon-color: var(--md-fab-secondary-hover-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-hover-label-text-color: var(--md-fab-secondary-hover-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-hover-state-layer-color: var(--md-fab-secondary-hover-state-layer-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-icon-color: var(--md-fab-secondary-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-label-text-color: var(--md-fab-secondary-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-pressed-icon-color: var(--md-fab-secondary-pressed-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-pressed-label-text-color: var(--md-fab-secondary-pressed-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_secondary-pressed-state-layer-color: var(--md-fab-secondary-pressed-state-layer-color, var(--md-sys-color-on-secondary-container, #1d192b));--_small-container-height: var(--md-fab-small-container-height, 40px);--_small-container-width: var(--md-fab-small-container-width, 40px);--_small-icon-size: var(--md-fab-small-icon-size, 24px);--_tertiary-container-color: var(--md-fab-tertiary-container-color, var(--md-sys-color-tertiary-container, #ffd8e4));--_tertiary-focus-icon-color: var(--md-fab-tertiary-focus-icon-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-focus-label-text-color: var(--md-fab-tertiary-focus-label-text-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-hover-icon-color: var(--md-fab-tertiary-hover-icon-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-hover-label-text-color: var(--md-fab-tertiary-hover-label-text-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-hover-state-layer-color: var(--md-fab-tertiary-hover-state-layer-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-icon-color: var(--md-fab-tertiary-icon-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-label-text-color: var(--md-fab-tertiary-label-text-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-pressed-icon-color: var(--md-fab-tertiary-pressed-icon-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-pressed-label-text-color: var(--md-fab-tertiary-pressed-label-text-color, var(--md-sys-color-on-tertiary-container, #31111d));--_tertiary-pressed-state-layer-color: var(--md-fab-tertiary-pressed-state-layer-color, var(--md-sys-color-on-tertiary-container, #31111d));--_container-shape-start-start: var(--md-fab-container-shape-start-start, var(--md-fab-container-shape, var(--md-sys-shape-corner-large, 16px)));--_container-shape-start-end: var(--md-fab-container-shape-start-end, var(--md-fab-container-shape, var(--md-sys-shape-corner-large, 16px)));--_container-shape-end-end: var(--md-fab-container-shape-end-end, var(--md-fab-container-shape, var(--md-sys-shape-corner-large, 16px)));--_container-shape-end-start: var(--md-fab-container-shape-end-start, var(--md-fab-container-shape, var(--md-sys-shape-corner-large, 16px)));--_large-container-shape-start-start: var(--md-fab-large-container-shape-start-start, var(--md-fab-large-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));--_large-container-shape-start-end: var(--md-fab-large-container-shape-start-end, var(--md-fab-large-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));--_large-container-shape-end-end: var(--md-fab-large-container-shape-end-end, var(--md-fab-large-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));--_large-container-shape-end-start: var(--md-fab-large-container-shape-end-start, var(--md-fab-large-container-shape, var(--md-sys-shape-corner-extra-large, 28px)));--_small-container-shape-start-start: var(--md-fab-small-container-shape-start-start, var(--md-fab-small-container-shape, var(--md-sys-shape-corner-medium, 12px)));--_small-container-shape-start-end: var(--md-fab-small-container-shape-start-end, var(--md-fab-small-container-shape, var(--md-sys-shape-corner-medium, 12px)));--_small-container-shape-end-end: var(--md-fab-small-container-shape-end-end, var(--md-fab-small-container-shape, var(--md-sys-shape-corner-medium, 12px)));--_small-container-shape-end-start: var(--md-fab-small-container-shape-end-start, var(--md-fab-small-container-shape, var(--md-sys-shape-corner-medium, 12px)));cursor:pointer}:host([size=small][touch-target=wrapper]){margin:max(0px,48px - var(--_small-container-height))}.fab .icon ::slotted(*){color:var(--_icon-color)}.fab:focus{color:var(--_focus-icon-color)}.fab:hover{color:var(--_hover-icon-color)}.fab:active{color:var(--_pressed-icon-color)}.fab{cursor:inherit}.fab.primary{background-color:var(--_primary-container-color);--md-ripple-hover-color: var(--_primary-hover-state-layer-color);--md-ripple-pressed-color: var(--_primary-pressed-state-layer-color)}.fab.primary .icon ::slotted(*){color:var(--_primary-icon-color)}.fab.primary:focus{color:var(--_primary-focus-icon-color)}.fab.primary:hover{color:var(--_primary-hover-icon-color)}.fab.primary:active{color:var(--_primary-pressed-icon-color)}.fab.primary .label{color:var(--_primary-label-text-color)}.fab:hover .fab.primary .label{color:var(--_primary-hover-label-text-color)}.fab:focus .fab.primary .label{color:var(--_primary-focus-label-text-color)}.fab:active .fab.primary .label{color:var(--_primary-pressed-label-text-color)}.fab.secondary{background-color:var(--_secondary-container-color);--md-ripple-hover-color: var(--_secondary-hover-state-layer-color);--md-ripple-pressed-color: var(--_secondary-pressed-state-layer-color)}.fab.secondary .icon ::slotted(*){color:var(--_secondary-icon-color)}.fab.secondary:focus{color:var(--_secondary-focus-icon-color)}.fab.secondary:hover{color:var(--_secondary-hover-icon-color)}.fab.secondary:active{color:var(--_secondary-pressed-icon-color)}.fab.secondary .label{color:var(--_secondary-label-text-color)}.fab:hover .fab.secondary .label{color:var(--_secondary-hover-label-text-color)}.fab:focus .fab.secondary .label{color:var(--_secondary-focus-label-text-color)}.fab:active .fab.secondary .label{color:var(--_secondary-pressed-label-text-color)}.fab.tertiary{background-color:var(--_tertiary-container-color);--md-ripple-hover-color: var(--_tertiary-hover-state-layer-color);--md-ripple-pressed-color: var(--_tertiary-pressed-state-layer-color)}.fab.tertiary .icon ::slotted(*){color:var(--_tertiary-icon-color)}.fab.tertiary:focus{color:var(--_tertiary-focus-icon-color)}.fab.tertiary:hover{color:var(--_tertiary-hover-icon-color)}.fab.tertiary:active{color:var(--_tertiary-pressed-icon-color)}.fab.tertiary .label{color:var(--_tertiary-label-text-color)}.fab:hover .fab.tertiary .label{color:var(--_tertiary-hover-label-text-color)}.fab:focus .fab.tertiary .label{color:var(--_tertiary-focus-label-text-color)}.fab:active .fab.tertiary .label{color:var(--_tertiary-pressed-label-text-color)}.fab.extended slot span{padding-inline-start:4px}.fab.small{width:var(--_small-container-width);height:var(--_small-container-height)}.fab.small .icon ::slotted(*){width:var(--_small-icon-size);height:var(--_small-icon-size);font-size:var(--_small-icon-size)}.fab.small,.fab.small .ripple{border-start-start-radius:var(--_small-container-shape-start-start);border-start-end-radius:var(--_small-container-shape-start-end);border-end-start-radius:var(--_small-container-shape-end-start);border-end-end-radius:var(--_small-container-shape-end-end)}.fab.small md-focus-ring{--md-focus-ring-shape-start-start: var(--_small-container-shape-start-start);--md-focus-ring-shape-start-end: var(--_small-container-shape-start-end);--md-focus-ring-shape-end-end: var(--_small-container-shape-end-end);--md-focus-ring-shape-end-start: var(--_small-container-shape-end-start)}
`;/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Ta=y`@media(forced-colors: active){.fab{border:1px solid ButtonText}.fab.extended{padding-inline-start:15px;padding-inline-end:19px}md-focus-ring{--md-focus-ring-outward-offset: 3px}}
`;/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const za=y`:host{--md-ripple-hover-opacity: var(--_hover-state-layer-opacity);--md-ripple-pressed-opacity: var(--_pressed-state-layer-opacity);display:inline-flex;-webkit-tap-highlight-color:rgba(0,0,0,0)}:host([size=medium][touch-target=wrapper]){margin:max(0px,48px - var(--_container-height))}:host([size=large][touch-target=wrapper]){margin:max(0px,48px - var(--_large-container-height))}.fab,.icon,.icon ::slotted(*){display:flex}.fab{align-items:center;justify-content:center;vertical-align:middle;padding:0;position:relative;height:var(--_container-height);transition-property:background-color;border-width:0px;outline:none;z-index:0;text-transform:inherit}.fab.extended{width:inherit;box-sizing:border-box;padding-inline-start:16px;padding-inline-end:20px}.fab:not(.extended){width:var(--_container-width)}.fab.large{width:var(--_large-container-width);height:var(--_large-container-height)}.fab.large .icon ::slotted(*){width:var(--_large-icon-size);height:var(--_large-icon-size);font-size:var(--_large-icon-size)}.fab.large,.fab.large .ripple{border-start-start-radius:var(--_large-container-shape-start-start);border-start-end-radius:var(--_large-container-shape-start-end);border-end-start-radius:var(--_large-container-shape-end-start);border-end-end-radius:var(--_large-container-shape-end-end)}.fab.large md-focus-ring{--md-focus-ring-shape-start-start: var(--_large-container-shape-start-start);--md-focus-ring-shape-start-end: var(--_large-container-shape-start-end);--md-focus-ring-shape-end-end: var(--_large-container-shape-end-end);--md-focus-ring-shape-end-start: var(--_large-container-shape-end-start)}.fab{--md-elevation-level: var(--_container-elevation);--md-elevation-shadow-color: var(--_container-shadow-color)}.fab:focus{--md-elevation-level: var(--_focus-container-elevation)}.fab:hover{--md-elevation-level: var(--_hover-container-elevation)}.fab:active{--md-elevation-level: var(--_pressed-container-elevation)}.fab.lowered{background-color:var(--_lowered-container-color);--md-elevation-level: var(--_lowered-container-elevation)}.fab.lowered:focus{--md-elevation-level: var(--_lowered-focus-container-elevation)}.fab.lowered:hover{--md-elevation-level: var(--_lowered-hover-container-elevation)}.fab.lowered:active{--md-elevation-level: var(--_lowered-pressed-container-elevation)}.fab{background-color:var(--_container-color);--md-ripple-hover-color: var(--_hover-state-layer-color);--md-ripple-pressed-color: var(--_pressed-state-layer-color)}.fab .label{color:var(--_label-text-color)}.fab:hover .fab .label{color:var(--_hover-label-text-color)}.fab:focus .fab .label{color:var(--_focus-label-text-color)}.fab:active .fab .label{color:var(--_pressed-label-text-color)}.label{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-family:var(--_label-text-font);font-size:var(--_label-text-size);line-height:var(--_label-text-line-height);font-weight:var(--_label-text-weight)}.fab.extended .icon ::slotted(*){margin-inline-end:12px}.ripple{overflow:hidden}.ripple,md-elevation{z-index:-1}.touch-target{position:absolute;top:50%;height:48px;left:50%;width:48px;transform:translate(-50%, -50%)}:host([touch-target=none]) .touch-target{display:none}md-elevation,.fab{transition-duration:280ms;transition-timing-function:cubic-bezier(0.2, 0, 0, 1)}.fab,.ripple{border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end)}md-focus-ring{--md-focus-ring-shape-start-start: var(--_container-shape-start-start);--md-focus-ring-shape-start-end: var(--_container-shape-start-end);--md-focus-ring-shape-end-end: var(--_container-shape-end-end);--md-focus-ring-shape-end-start: var(--_container-shape-end-start)}.icon ::slotted(*){width:var(--_icon-size);height:var(--_icon-size);font-size:var(--_icon-size)}
`;/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let Xt=class extends hi{};Xt.styles=[za,Ca,Ta];Xt=l([k("md-fab")],Xt);/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Aa extends _{render(){return n`<slot></slot>`}connectedCallback(){if(super.connectedCallback(),this.getAttribute("aria-hidden")==="false"){this.removeAttribute("aria-hidden");return}this.setAttribute("aria-hidden","true")}}/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Sa=y`:host{font-size:var(--md-icon-size, 24px);width:var(--md-icon-size, 24px);height:var(--md-icon-size, 24px);color:inherit;font-variation-settings:inherit;font-weight:400;font-family:var(--md-icon-font, Material Symbols Outlined);display:inline-flex;font-style:normal;place-items:center;place-content:center;line-height:1;overflow:hidden;letter-spacing:normal;text-transform:none;user-select:none;white-space:nowrap;word-wrap:normal;flex-shrink:0;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale}::slotted(svg){fill:currentColor}::slotted(*){height:100%;width:100%}
`;/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let Qt=class extends Aa{};Qt.styles=[Sa];Qt=l([k("md-icon")],Qt);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function ui(t,e=oe){const r=vi(t,e);return r&&(r.tabIndex=0,r.focus()),r}function mi(t,e=oe){const r=Ia(t,e);return r&&(r.tabIndex=0,r.focus()),r}function kt(t,e=oe){for(let r=0;r<t.length;r++){const i=t[r];if(i.tabIndex===0&&e(i))return{item:i,index:r}}return null}function vi(t,e=oe){for(const r of t)if(e(r))return r;return null}function Ia(t,e=oe){for(let r=t.length-1;r>=0;r--){const i=t[r];if(e(i))return i}return null}function Ea(t,e,r=oe,i=!0){for(let o=1;o<t.length;o++){const a=(o+e)%t.length;if(a<e&&!i)return null;const s=t[a];if(r(s))return s}return t[e]?t[e]:null}function La(t,e,r=oe,i=!0){for(let o=1;o<t.length;o++){const a=(e-o+t.length)%t.length;if(a>e&&!i)return null;const s=t[a];if(r(s))return s}return t[e]?t[e]:null}function jr(t,e,r=oe,i=!0){if(e){const o=Ea(t,e.index,r,i);return o&&(o.tabIndex=0,o.focus()),o}else return ui(t,r)}function Gr(t,e,r=oe,i=!0){if(e){const o=La(t,e.index,r,i);return o&&(o.tabIndex=0,o.focus()),o}else return mi(t,r)}function Fa(){return new Event("request-activation",{bubbles:!0,composed:!0})}function oe(t){return!t.disabled}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const te={ArrowDown:"ArrowDown",ArrowLeft:"ArrowLeft",ArrowUp:"ArrowUp",ArrowRight:"ArrowRight",Home:"Home",End:"End"};class Ra{constructor(e){this.handleKeydown=f=>{const m=f.key;if(f.defaultPrevented||!this.isNavigableKey(m))return;const b=this.items;if(!b.length)return;const $=kt(b,this.isActivatable);f.preventDefault();const H=this.isRtl(),me=H?te.ArrowRight:te.ArrowLeft,ve=H?te.ArrowLeft:te.ArrowRight;let Y=null;switch(m){case te.ArrowDown:case ve:Y=jr(b,$,this.isActivatable,this.wrapNavigation());break;case te.ArrowUp:case me:Y=Gr(b,$,this.isActivatable,this.wrapNavigation());break;case te.Home:Y=ui(b,this.isActivatable);break;case te.End:Y=mi(b,this.isActivatable);break}Y&&$&&$.item!==Y&&($.item.tabIndex=-1)},this.onDeactivateItems=()=>{const f=this.items;for(const m of f)this.deactivateItem(m)},this.onRequestActivation=f=>{this.onDeactivateItems();const m=f.target;this.activateItem(m),m.focus()},this.onSlotchange=()=>{const f=this.items;let m=!1;for(const $ of f){if(!$.disabled&&$.tabIndex>-1&&!m){m=!0,$.tabIndex=0;continue}$.tabIndex=-1}if(m)return;const b=vi(f,this.isActivatable);b&&(b.tabIndex=0)};const{isItem:r,getPossibleItems:i,isRtl:o,deactivateItem:a,activateItem:s,isNavigableKey:c,isActivatable:h,wrapNavigation:v}=e;this.isItem=r,this.getPossibleItems=i,this.isRtl=o,this.deactivateItem=a,this.activateItem=s,this.isNavigableKey=c,this.isActivatable=h,this.wrapNavigation=v??(()=>!0)}get items(){const e=this.getPossibleItems(),r=[];for(const i of e){if(this.isItem(i)){r.push(i);continue}const a=i.item;a&&this.isItem(a)&&r.push(a)}return r}activateNextItem(){const e=this.items,r=kt(e,this.isActivatable);return r&&(r.item.tabIndex=-1),jr(e,r,this.isActivatable,this.wrapNavigation())}activatePreviousItem(){const e=this.items,r=kt(e,this.isActivatable);return r&&(r.item.tabIndex=-1),Gr(e,r,this.isActivatable,this.wrapNavigation())}}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Oa=new Set(Object.values(te));class fi extends _{get items(){return this.listController.items}constructor(){super(),this.listController=new Ra({isItem:e=>e.hasAttribute("md-list-item"),getPossibleItems:()=>this.slotItems,isRtl:()=>getComputedStyle(this).direction==="rtl",deactivateItem:e=>{e.tabIndex=-1},activateItem:e=>{e.tabIndex=0},isNavigableKey:e=>Oa.has(e),isActivatable:e=>!e.disabled&&e.type!=="text"}),this.internals=this.attachInternals(),this.internals.role="list",this.addEventListener("keydown",this.listController.handleKeydown)}render(){return n`
      <slot
        @deactivate-items=${this.listController.onDeactivateItems}
        @request-activation=${this.listController.onRequestActivation}
        @slotchange=${this.listController.onSlotchange}>
      </slot>
    `}activateNextItem(){return this.listController.activateNextItem()}activatePreviousItem(){return this.listController.activatePreviousItem()}}l([de({flatten:!0})],fi.prototype,"slotItems",void 0);/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Pa=y`:host{background:var(--md-list-container-color, var(--md-sys-color-surface, #fef7ff));color:unset;display:flex;flex-direction:column;outline:none;padding:8px 0;position:relative}
`;/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let er=class extends fi{};er.styles=[Pa];er=l([k("md-list")],er);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class br extends _{constructor(){super(...arguments),this.multiline=!1}render(){return n`
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
    `}handleTextSlotChange(){let e=!1,r=0;for(const i of this.textSlots)if(Ma(i)&&(r+=1),r>1){e=!0;break}this.multiline=e}}l([u({type:Boolean,reflect:!0})],br.prototype,"multiline",void 0);l([Ki(".text slot")],br.prototype,"textSlots",void 0);function Ma(t){var e;for(const r of t.assignedNodes({flatten:!0})){const i=r.nodeType===Node.ELEMENT_NODE,o=r.nodeType===Node.TEXT_NODE&&((e=r.textContent)==null?void 0:e.match(/\S/));if(i||o)return!0}return!1}/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Da=y`:host{color:var(--md-sys-color-on-surface, #1d1b20);font-family:var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto));font-size:var(--md-sys-typescale-body-large-size, 1rem);font-weight:var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400));line-height:var(--md-sys-typescale-body-large-line-height, 1.5rem);align-items:center;box-sizing:border-box;display:flex;gap:16px;min-height:56px;overflow:hidden;padding:12px 16px;position:relative;text-overflow:ellipsis}:host([multiline]){min-height:72px}[name=overline]{color:var(--md-sys-color-on-surface-variant, #49454f);font-family:var(--md-sys-typescale-label-small-font, var(--md-ref-typeface-plain, Roboto));font-size:var(--md-sys-typescale-label-small-size, 0.6875rem);font-weight:var(--md-sys-typescale-label-small-weight, var(--md-ref-typeface-weight-medium, 500));line-height:var(--md-sys-typescale-label-small-line-height, 1rem)}[name=supporting-text]{color:var(--md-sys-color-on-surface-variant, #49454f);font-family:var(--md-sys-typescale-body-medium-font, var(--md-ref-typeface-plain, Roboto));font-size:var(--md-sys-typescale-body-medium-size, 0.875rem);font-weight:var(--md-sys-typescale-body-medium-weight, var(--md-ref-typeface-weight-regular, 400));line-height:var(--md-sys-typescale-body-medium-line-height, 1.25rem)}[name=trailing-supporting-text]{color:var(--md-sys-color-on-surface-variant, #49454f);font-family:var(--md-sys-typescale-label-small-font, var(--md-ref-typeface-plain, Roboto));font-size:var(--md-sys-typescale-label-small-size, 0.6875rem);font-weight:var(--md-sys-typescale-label-small-weight, var(--md-ref-typeface-weight-medium, 500));line-height:var(--md-sys-typescale-label-small-line-height, 1rem)}[name=container]::slotted(*){inset:0;position:absolute}.default-slot{display:inline}.default-slot,.text ::slotted(*){overflow:hidden;text-overflow:ellipsis}.text{display:flex;flex:1;flex-direction:column;overflow:hidden}
`;/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let tr=class extends br{};tr.styles=[Da];tr=l([k("md-item")],tr);/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Na=ce(_);class pe extends Na{constructor(){super(...arguments),this.disabled=!1,this.type="text",this.isListItem=!0,this.href="",this.target=""}get isDisabled(){return this.disabled&&this.type!=="link"}willUpdate(e){this.href&&(this.type="link"),super.willUpdate(e)}render(){return this.renderListItem(n`
      <md-item>
        <div slot="container">
          ${this.renderRipple()} ${this.renderFocusRing()}
        </div>
        <slot name="start" slot="start"></slot>
        <slot name="end" slot="end"></slot>
        ${this.renderBody()}
      </md-item>
    `)}renderListItem(e){const r=this.type==="link";let i;switch(this.type){case"link":i=re`a`;break;case"button":i=re`button`;break;default:case"text":i=re`li`;break}const o=this.type!=="text",a=r&&this.target?this.target:d;return fr`
      <${i}
        id="item"
        tabindex="${this.isDisabled||!o?-1:0}"
        ?disabled=${this.isDisabled}
        role="listitem"
        aria-selected=${this.ariaSelected||d}
        aria-checked=${this.ariaChecked||d}
        aria-expanded=${this.ariaExpanded||d}
        aria-haspopup=${this.ariaHasPopup||d}
        class="list-item ${V(this.getRenderClasses())}"
        href=${this.href||d}
        target=${a}
        @focus=${this.onFocus}
      >${e}</${i}>
    `}renderRipple(){return this.type==="text"?d:n` <md-ripple
      part="ripple"
      for="item"
      ?disabled=${this.isDisabled}></md-ripple>`}renderFocusRing(){return this.type==="text"?d:n` <md-focus-ring
      @visibility-changed=${this.onFocusRingVisibilityChanged}
      part="focus-ring"
      for="item"
      inward></md-focus-ring>`}onFocusRingVisibilityChanged(e){}getRenderClasses(){return{disabled:this.isDisabled}}renderBody(){return n`
      <slot></slot>
      <slot name="overline" slot="overline"></slot>
      <slot name="headline" slot="headline"></slot>
      <slot name="supporting-text" slot="supporting-text"></slot>
      <slot
        name="trailing-supporting-text"
        slot="trailing-supporting-text"></slot>
    `}onFocus(){this.tabIndex===-1&&this.dispatchEvent(Fa())}focus(){var e;(e=this.listItemRoot)==null||e.focus()}click(){if(!this.listItemRoot){super.click();return}this.listItemRoot.click()}}pe.shadowRootOptions={..._.shadowRootOptions,delegatesFocus:!0};l([u({type:Boolean,reflect:!0})],pe.prototype,"disabled",void 0);l([u({reflect:!0})],pe.prototype,"type",void 0);l([u({type:Boolean,attribute:"md-list-item",reflect:!0})],pe.prototype,"isListItem",void 0);l([u()],pe.prototype,"href",void 0);l([u()],pe.prototype,"target",void 0);l([z(".list-item")],pe.prototype,"listItemRoot",void 0);/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Ua=y`:host{display:flex;-webkit-tap-highlight-color:rgba(0,0,0,0);--md-ripple-hover-color: var(--md-list-item-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--md-ripple-hover-opacity: var(--md-list-item-hover-state-layer-opacity, 0.08);--md-ripple-pressed-color: var(--md-list-item-pressed-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--md-ripple-pressed-opacity: var(--md-list-item-pressed-state-layer-opacity, 0.12)}:host(:is([type=button]:not([disabled]),[type=link])){cursor:pointer}md-focus-ring{z-index:1;--md-focus-ring-shape: 8px}a,button,li{background:none;border:none;cursor:inherit;padding:0;margin:0;text-align:unset;text-decoration:none}.list-item{border-radius:inherit;display:flex;flex:1;max-width:inherit;min-width:inherit;outline:none;-webkit-tap-highlight-color:rgba(0,0,0,0);width:100%}.list-item.interactive{cursor:pointer}.list-item.disabled{opacity:var(--md-list-item-disabled-opacity, 0.3);pointer-events:none}[slot=container]{pointer-events:none}md-ripple{border-radius:inherit}md-item{border-radius:inherit;flex:1;height:100%;color:var(--md-list-item-label-text-color, var(--md-sys-color-on-surface, #1d1b20));font-family:var(--md-list-item-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));font-size:var(--md-list-item-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));line-height:var(--md-list-item-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));font-weight:var(--md-list-item-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));min-height:var(--md-list-item-one-line-container-height, 56px);padding-top:var(--md-list-item-top-space, 12px);padding-bottom:var(--md-list-item-bottom-space, 12px);padding-inline-start:var(--md-list-item-leading-space, 16px);padding-inline-end:var(--md-list-item-trailing-space, 16px)}md-item[multiline]{min-height:var(--md-list-item-two-line-container-height, 72px)}[slot=supporting-text]{color:var(--md-list-item-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));font-family:var(--md-list-item-supporting-text-font, var(--md-sys-typescale-body-medium-font, var(--md-ref-typeface-plain, Roboto)));font-size:var(--md-list-item-supporting-text-size, var(--md-sys-typescale-body-medium-size, 0.875rem));line-height:var(--md-list-item-supporting-text-line-height, var(--md-sys-typescale-body-medium-line-height, 1.25rem));font-weight:var(--md-list-item-supporting-text-weight, var(--md-sys-typescale-body-medium-weight, var(--md-ref-typeface-weight-regular, 400)))}[slot=trailing-supporting-text]{color:var(--md-list-item-trailing-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));font-family:var(--md-list-item-trailing-supporting-text-font, var(--md-sys-typescale-label-small-font, var(--md-ref-typeface-plain, Roboto)));font-size:var(--md-list-item-trailing-supporting-text-size, var(--md-sys-typescale-label-small-size, 0.6875rem));line-height:var(--md-list-item-trailing-supporting-text-line-height, var(--md-sys-typescale-label-small-line-height, 1rem));font-weight:var(--md-list-item-trailing-supporting-text-weight, var(--md-sys-typescale-label-small-weight, var(--md-ref-typeface-weight-medium, 500)))}:is([slot=start],[slot=end])::slotted(*){fill:currentColor}[slot=start]{color:var(--md-list-item-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f))}[slot=end]{color:var(--md-list-item-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f))}@media(forced-colors: active){.disabled slot{color:GrayText}.list-item.disabled{color:GrayText;opacity:1}}
`;/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let rr=class extends pe{};rr.styles=[Ua];rr=l([k("md-list-item")],rr);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const et=Symbol("isFocusable"),Ct=Symbol("privateIsFocusable"),tt=Symbol("externalTabIndex"),rt=Symbol("isUpdatingTabIndex"),it=Symbol("updateTabIndex");function Ba(t){var e,r,i;class o extends t{constructor(){super(...arguments),this[e]=!0,this[r]=null,this[i]=!1}get[et](){return this[Ct]}set[et](s){this[et]!==s&&(this[Ct]=s,this[it]())}connectedCallback(){super.connectedCallback(),this[it]()}attributeChangedCallback(s,c,h){if(s!=="tabindex"){super.attributeChangedCallback(s,c,h);return}if(this.requestUpdate("tabIndex",Number(c??-1)),!this[rt]){if(!this.hasAttribute("tabindex")){this[tt]=null,this[it]();return}this[tt]=this.tabIndex}}[(e=Ct,r=tt,i=rt,it)](){const s=this[et]?0:-1,c=this[tt]??s;this[rt]=!0,this.tabIndex=c,this[rt]=!1}}return l([u({noAccessor:!0})],o.prototype,"tabIndex",void 0),o}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const gi=Symbol("animateIndicator"),ja=Ba(_);class X extends ja{get selected(){return this.active}set selected(e){this.active=e}constructor(){super(),this.isTab=!0,this.active=!1,this.hasIcon=!1,this.iconOnly=!1,this.fullWidthIndicator=!1,this.internals=this.attachInternals(),this.internals.role="tab",this.addEventListener("keydown",this.handleKeydown.bind(this))}render(){const e=n`<div class="indicator"></div>`;return n`<div
      class="button"
      role="presentation"
      @click=${this.handleContentClick}>
      <md-focus-ring part="focus-ring" inward .control=${this}></md-focus-ring>
      <md-elevation part="elevation"></md-elevation>
      <md-ripple .control=${this}></md-ripple>
      <div
        class="content ${V(this.getContentClasses())}"
        role="presentation">
        <slot name="icon" @slotchange=${this.handleIconSlotChange}></slot>
        <slot @slotchange=${this.handleSlotChange}></slot>
        ${this.fullWidthIndicator?d:e}
      </div>
      ${this.fullWidthIndicator?e:d}
    </div>`}getContentClasses(){return{"has-icon":this.hasIcon,"has-label":!this.iconOnly}}updated(){this.internals.ariaSelected=String(this.active)}async handleKeydown(e){await 0,!e.defaultPrevented&&(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),this.click())}handleContentClick(e){e.stopPropagation(),this.click()}[gi](e){if(!this.indicator)return;this.indicator.getAnimations().forEach(i=>{i.cancel()});const r=this.getKeyframes(e);r!==null&&this.indicator.animate(r,{duration:250,easing:xe.EMPHASIZED})}getKeyframes(e){var m;const r=Ga();if(!this.active)return r?[{opacity:1},{transform:"none"}]:null;const i={},o=((m=e.indicator)==null?void 0:m.getBoundingClientRect())??{},a=o.left,s=o.width,c=this.indicator.getBoundingClientRect(),h=c.left,v=c.width,f=s/v;return!r&&a!==void 0&&h!==void 0&&!isNaN(f)?i.transform=`translateX(${(a-h).toFixed(4)}px) scaleX(${f.toFixed(4)})`:i.opacity=0,[i,{transform:"none"}]}handleSlotChange(){this.iconOnly=!1;for(const e of this.assignedDefaultNodes){const r=e.nodeType===Node.TEXT_NODE&&!!e.wholeText.match(/\S/);if(e.nodeType===Node.ELEMENT_NODE||r)return}this.iconOnly=!0}handleIconSlotChange(){this.hasIcon=this.assignedIcons.length>0}}l([u({type:Boolean,reflect:!0,attribute:"md-tab"})],X.prototype,"isTab",void 0);l([u({type:Boolean,reflect:!0})],X.prototype,"active",void 0);l([u({type:Boolean})],X.prototype,"selected",null);l([u({type:Boolean,attribute:"has-icon"})],X.prototype,"hasIcon",void 0);l([u({type:Boolean,attribute:"icon-only"})],X.prototype,"iconOnly",void 0);l([z(".indicator")],X.prototype,"indicator",void 0);l([p()],X.prototype,"fullWidthIndicator",void 0);l([Wi({flatten:!0})],X.prototype,"assignedDefaultNodes",void 0);l([de({slot:"icon",flatten:!0})],X.prototype,"assignedIcons",void 0);function Ga(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class ze extends _{get activeTab(){return this.tabs.find(e=>e.active)??null}set activeTab(e){e&&this.activateTab(e)}get activeTabIndex(){return this.tabs.findIndex(e=>e.active)}set activeTabIndex(e){const r=()=>{const i=this.tabs[e];i&&this.activateTab(i)};if(!this.slotElement){this.updateComplete.then(r);return}r()}get focusedTab(){return this.tabs.find(e=>e.matches(":focus-within"))}constructor(){super(),this.autoActivate=!1,this.internals=this.attachInternals(),this.internals.role="tablist",this.addEventListener("keydown",this.handleKeydown.bind(this)),this.addEventListener("keyup",this.handleKeyup.bind(this)),this.addEventListener("focusout",this.handleFocusout.bind(this))}async scrollToTab(e){await this.updateComplete;const{tabs:r}=this;if(e??(e=this.activeTab),!e||!r.includes(e)||!this.tabsScrollerElement)return;for(const b of this.tabs)await b.updateComplete;const i=e.offsetLeft,o=e.offsetWidth,a=this.scrollLeft,s=this.offsetWidth,c=48,h=i-c,v=i+o-s+c,f=Math.min(h,Math.max(v,a)),m=this.focusedTab?"auto":"instant";this.tabsScrollerElement.scrollTo({behavior:m,top:0,left:f})}render(){return n`
      <div class="tabs">
        <slot
          @slotchange=${this.handleSlotChange}
          @click=${this.handleTabClick}></slot>
      </div>
      <md-divider part="divider"></md-divider>
    `}async handleTabClick(e){const r=e.target;await 0,!(e.defaultPrevented||!Ha(r)||r.active)&&this.activateTab(r)}activateTab(e){const{tabs:r}=this,i=this.activeTab;if(!(!r.includes(e)||i===e)){for(const o of r)o.active=o===e;if(i){if(!this.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0}))){for(const a of r)a.active=a===i;return}e[gi](i)}this.updateFocusableTab(e),this.scrollToTab(e)}}updateFocusableTab(e){for(const r of this.tabs)r.tabIndex=r===e?0:-1}async handleKeydown(e){await 0;const r=e.key==="ArrowLeft",i=e.key==="ArrowRight",o=e.key==="Home",a=e.key==="End";if(e.defaultPrevented||!r&&!i&&!o&&!a)return;const{tabs:s}=this;if(s.length<2)return;e.preventDefault();let c;if(o||a)c=o?0:s.length-1;else{const f=getComputedStyle(this).direction==="rtl"?r:i,{focusedTab:m}=this;if(!m)c=f?0:s.length-1;else{const b=this.tabs.indexOf(m);c=f?b+1:b-1,c>=s.length?c=0:c<0&&(c=s.length-1)}}const h=s[c];h.focus(),this.autoActivate?this.activateTab(h):this.updateFocusableTab(h)}handleKeyup(){this.scrollToTab(this.focusedTab??this.activeTab)}handleFocusout(){if(this.matches(":focus-within"))return;const{activeTab:e}=this;e&&this.updateFocusableTab(e)}handleSlotChange(){const e=this.tabs[0];!this.activeTab&&e&&this.activateTab(e),this.scrollToTab(this.activeTab)}}l([de({flatten:!0,selector:"[md-tab]"})],ze.prototype,"tabs",void 0);l([u({type:Number,attribute:"active-tab-index"})],ze.prototype,"activeTabIndex",null);l([u({type:Boolean,attribute:"auto-activate"})],ze.prototype,"autoActivate",void 0);l([z(".tabs")],ze.prototype,"tabsScrollerElement",void 0);l([z("slot")],ze.prototype,"slotElement",void 0);function Ha(t){return t instanceof HTMLElement&&t.hasAttribute("md-tab")}/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const qa=y`:host{box-sizing:border-box;display:flex;flex-direction:column;overflow:auto;scroll-behavior:smooth;scrollbar-width:none;position:relative}:host([hidden]){display:none}:host::-webkit-scrollbar{display:none}.tabs{align-items:end;display:flex;height:100%;overflow:inherit;scroll-behavior:inherit;scrollbar-width:inherit;justify-content:space-between;width:100%}::slotted(*){flex:1}::slotted([active]){z-index:1}
`;/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let ir=class extends ze{};ir.styles=[qa];ir=l([k("md-tabs")],ir);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class bi extends X{constructor(){super(...arguments),this.inlineIcon=!1}getContentClasses(){return{...super.getContentClasses(),stacked:!this.inlineIcon}}}l([u({type:Boolean,attribute:"inline-icon"})],bi.prototype,"inlineIcon",void 0);/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Va=y`:host{--_active-indicator-color: var(--md-primary-tab-active-indicator-color, var(--md-sys-color-primary, #6750a4));--_active-indicator-height: var(--md-primary-tab-active-indicator-height, 3px);--_active-indicator-shape: var(--md-primary-tab-active-indicator-shape, 3px 3px 0px 0px);--_active-hover-state-layer-color: var(--md-primary-tab-active-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_active-hover-state-layer-opacity: var(--md-primary-tab-active-hover-state-layer-opacity, 0.08);--_active-pressed-state-layer-color: var(--md-primary-tab-active-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_active-pressed-state-layer-opacity: var(--md-primary-tab-active-pressed-state-layer-opacity, 0.12);--_container-color: var(--md-primary-tab-container-color, var(--md-sys-color-surface, #fef7ff));--_container-elevation: var(--md-primary-tab-container-elevation, 0);--_container-height: var(--md-primary-tab-container-height, 48px);--_with-icon-and-label-text-container-height: var(--md-primary-tab-with-icon-and-label-text-container-height, 64px);--_hover-state-layer-color: var(--md-primary-tab-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-state-layer-opacity: var(--md-primary-tab-hover-state-layer-opacity, 0.08);--_pressed-state-layer-color: var(--md-primary-tab-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-opacity: var(--md-primary-tab-pressed-state-layer-opacity, 0.12);--_active-focus-icon-color: var(--md-primary-tab-active-focus-icon-color, var(--md-sys-color-primary, #6750a4));--_active-hover-icon-color: var(--md-primary-tab-active-hover-icon-color, var(--md-sys-color-primary, #6750a4));--_active-icon-color: var(--md-primary-tab-active-icon-color, var(--md-sys-color-primary, #6750a4));--_active-pressed-icon-color: var(--md-primary-tab-active-pressed-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-size: var(--md-primary-tab-icon-size, 24px);--_focus-icon-color: var(--md-primary-tab-focus-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-icon-color: var(--md-primary-tab-hover-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_icon-color: var(--md-primary-tab-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-icon-color: var(--md-primary-tab-pressed-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_label-text-font: var(--md-primary-tab-label-text-font, var(--md-sys-typescale-title-small-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-primary-tab-label-text-line-height, var(--md-sys-typescale-title-small-line-height, 1.25rem));--_label-text-size: var(--md-primary-tab-label-text-size, var(--md-sys-typescale-title-small-size, 0.875rem));--_label-text-weight: var(--md-primary-tab-label-text-weight, var(--md-sys-typescale-title-small-weight, var(--md-ref-typeface-weight-medium, 500)));--_active-focus-label-text-color: var(--md-primary-tab-active-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_active-hover-label-text-color: var(--md-primary-tab-active-hover-label-text-color, var(--md-sys-color-primary, #6750a4));--_active-label-text-color: var(--md-primary-tab-active-label-text-color, var(--md-sys-color-primary, #6750a4));--_active-pressed-label-text-color: var(--md-primary-tab-active-pressed-label-text-color, var(--md-sys-color-primary, #6750a4));--_focus-label-text-color: var(--md-primary-tab-focus-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_hover-label-text-color: var(--md-primary-tab-hover-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_label-text-color: var(--md-primary-tab-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_pressed-label-text-color: var(--md-primary-tab-pressed-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_container-shape-start-start: var(--md-primary-tab-container-shape-start-start, var(--md-primary-tab-container-shape, var(--md-sys-shape-corner-none, 0px)));--_container-shape-start-end: var(--md-primary-tab-container-shape-start-end, var(--md-primary-tab-container-shape, var(--md-sys-shape-corner-none, 0px)));--_container-shape-end-end: var(--md-primary-tab-container-shape-end-end, var(--md-primary-tab-container-shape, var(--md-sys-shape-corner-none, 0px)));--_container-shape-end-start: var(--md-primary-tab-container-shape-end-start, var(--md-primary-tab-container-shape, var(--md-sys-shape-corner-none, 0px)))}.content.stacked{flex-direction:column;gap:2px}.content.stacked.has-icon.has-label{height:var(--_with-icon-and-label-text-container-height)}
`;/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Ka=y`:host{display:inline-flex;align-items:center;justify-content:center;outline:none;padding:0 16px;position:relative;-webkit-tap-highlight-color:rgba(0,0,0,0);vertical-align:middle;user-select:none;font-family:var(--_label-text-font);font-size:var(--_label-text-size);line-height:var(--_label-text-line-height);font-weight:var(--_label-text-weight);color:var(--_label-text-color);z-index:0;--md-ripple-hover-color: var(--_hover-state-layer-color);--md-ripple-hover-opacity: var(--_hover-state-layer-opacity);--md-ripple-pressed-color: var(--_pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_pressed-state-layer-opacity);--md-elevation-level: var(--_container-elevation)}md-focus-ring{--md-focus-ring-shape: 8px}:host([active]) md-focus-ring{margin-bottom:calc(var(--_active-indicator-height) + 1px)}.button::before{background:var(--_container-color);content:"";inset:0;position:absolute;z-index:-1}.button::before,md-ripple,md-elevation{border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-end-radius:var(--_container-shape-end-end);border-end-start-radius:var(--_container-shape-end-start)}.content{position:relative;box-sizing:border-box;display:inline-flex;flex-direction:row;align-items:center;justify-content:center;height:var(--_container-height);gap:8px}.indicator{position:absolute;box-sizing:border-box;z-index:-1;transform-origin:bottom left;background:var(--_active-indicator-color);border-radius:var(--_active-indicator-shape);height:var(--_active-indicator-height);inset:auto 0 0 0;opacity:0}::slotted([slot=icon]){display:inline-flex;position:relative;writing-mode:horizontal-tb;fill:currentColor;color:var(--_icon-color);font-size:var(--_icon-size);width:var(--_icon-size);height:var(--_icon-size)}:host(:hover){color:var(--_hover-label-text-color);cursor:pointer}:host(:hover) ::slotted([slot=icon]){color:var(--_hover-icon-color)}:host(:focus){color:var(--_focus-label-text-color)}:host(:focus) ::slotted([slot=icon]){color:var(--_focus-icon-color)}:host(:active){color:var(--_pressed-label-text-color)}:host(:active) ::slotted([slot=icon]){color:var(--_pressed-icon-color)}:host([active]) .indicator{opacity:1}:host([active]){color:var(--_active-label-text-color);--md-ripple-hover-color: var(--_active-hover-state-layer-color);--md-ripple-hover-opacity: var(--_active-hover-state-layer-opacity);--md-ripple-pressed-color: var(--_active-pressed-state-layer-color);--md-ripple-pressed-opacity: var(--_active-pressed-state-layer-opacity)}:host([active]) ::slotted([slot=icon]){color:var(--_active-icon-color)}:host([active]:hover){color:var(--_active-hover-label-text-color)}:host([active]:hover) ::slotted([slot=icon]){color:var(--_active-hover-icon-color)}:host([active]:focus){color:var(--_active-focus-label-text-color)}:host([active]:focus) ::slotted([slot=icon]){color:var(--_active-focus-icon-color)}:host([active]:active){color:var(--_active-pressed-label-text-color)}:host([active]:active) ::slotted([slot=icon]){color:var(--_active-pressed-icon-color)}:host,::slotted(*){white-space:nowrap}@media(forced-colors: active){.indicator{background:CanvasText}}
`;/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let or=class extends bi{};or.styles=[Ka,Va];or=l([k("md-primary-tab")],or);/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Wa=y`@layer{.md-typescale-display-small,.md-typescale-display-small-prominent{font:var(--md-sys-typescale-display-small-weight, var(--md-ref-typeface-weight-regular, 400)) var(--md-sys-typescale-display-small-size, 2.25rem)/var(--md-sys-typescale-display-small-line-height, 2.75rem) var(--md-sys-typescale-display-small-font, var(--md-ref-typeface-brand, Roboto))}.md-typescale-display-medium,.md-typescale-display-medium-prominent{font:var(--md-sys-typescale-display-medium-weight, var(--md-ref-typeface-weight-regular, 400)) var(--md-sys-typescale-display-medium-size, 2.8125rem)/var(--md-sys-typescale-display-medium-line-height, 3.25rem) var(--md-sys-typescale-display-medium-font, var(--md-ref-typeface-brand, Roboto))}.md-typescale-display-large,.md-typescale-display-large-prominent{font:var(--md-sys-typescale-display-large-weight, var(--md-ref-typeface-weight-regular, 400)) var(--md-sys-typescale-display-large-size, 3.5625rem)/var(--md-sys-typescale-display-large-line-height, 4rem) var(--md-sys-typescale-display-large-font, var(--md-ref-typeface-brand, Roboto))}.md-typescale-headline-small,.md-typescale-headline-small-prominent{font:var(--md-sys-typescale-headline-small-weight, var(--md-ref-typeface-weight-regular, 400)) var(--md-sys-typescale-headline-small-size, 1.5rem)/var(--md-sys-typescale-headline-small-line-height, 2rem) var(--md-sys-typescale-headline-small-font, var(--md-ref-typeface-brand, Roboto))}.md-typescale-headline-medium,.md-typescale-headline-medium-prominent{font:var(--md-sys-typescale-headline-medium-weight, var(--md-ref-typeface-weight-regular, 400)) var(--md-sys-typescale-headline-medium-size, 1.75rem)/var(--md-sys-typescale-headline-medium-line-height, 2.25rem) var(--md-sys-typescale-headline-medium-font, var(--md-ref-typeface-brand, Roboto))}.md-typescale-headline-large,.md-typescale-headline-large-prominent{font:var(--md-sys-typescale-headline-large-weight, var(--md-ref-typeface-weight-regular, 400)) var(--md-sys-typescale-headline-large-size, 2rem)/var(--md-sys-typescale-headline-large-line-height, 2.5rem) var(--md-sys-typescale-headline-large-font, var(--md-ref-typeface-brand, Roboto))}.md-typescale-title-small,.md-typescale-title-small-prominent{font:var(--md-sys-typescale-title-small-weight, var(--md-ref-typeface-weight-medium, 500)) var(--md-sys-typescale-title-small-size, 0.875rem)/var(--md-sys-typescale-title-small-line-height, 1.25rem) var(--md-sys-typescale-title-small-font, var(--md-ref-typeface-plain, Roboto))}.md-typescale-title-medium,.md-typescale-title-medium-prominent{font:var(--md-sys-typescale-title-medium-weight, var(--md-ref-typeface-weight-medium, 500)) var(--md-sys-typescale-title-medium-size, 1rem)/var(--md-sys-typescale-title-medium-line-height, 1.5rem) var(--md-sys-typescale-title-medium-font, var(--md-ref-typeface-plain, Roboto))}.md-typescale-title-large,.md-typescale-title-large-prominent{font:var(--md-sys-typescale-title-large-weight, var(--md-ref-typeface-weight-regular, 400)) var(--md-sys-typescale-title-large-size, 1.375rem)/var(--md-sys-typescale-title-large-line-height, 1.75rem) var(--md-sys-typescale-title-large-font, var(--md-ref-typeface-brand, Roboto))}.md-typescale-body-small,.md-typescale-body-small-prominent{font:var(--md-sys-typescale-body-small-weight, var(--md-ref-typeface-weight-regular, 400)) var(--md-sys-typescale-body-small-size, 0.75rem)/var(--md-sys-typescale-body-small-line-height, 1rem) var(--md-sys-typescale-body-small-font, var(--md-ref-typeface-plain, Roboto))}.md-typescale-body-medium,.md-typescale-body-medium-prominent{font:var(--md-sys-typescale-body-medium-weight, var(--md-ref-typeface-weight-regular, 400)) var(--md-sys-typescale-body-medium-size, 0.875rem)/var(--md-sys-typescale-body-medium-line-height, 1.25rem) var(--md-sys-typescale-body-medium-font, var(--md-ref-typeface-plain, Roboto))}.md-typescale-body-large,.md-typescale-body-large-prominent{font:var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)) var(--md-sys-typescale-body-large-size, 1rem)/var(--md-sys-typescale-body-large-line-height, 1.5rem) var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto))}.md-typescale-label-small,.md-typescale-label-small-prominent{font:var(--md-sys-typescale-label-small-weight, var(--md-ref-typeface-weight-medium, 500)) var(--md-sys-typescale-label-small-size, 0.6875rem)/var(--md-sys-typescale-label-small-line-height, 1rem) var(--md-sys-typescale-label-small-font, var(--md-ref-typeface-plain, Roboto))}.md-typescale-label-medium,.md-typescale-label-medium-prominent{font:var(--md-sys-typescale-label-medium-weight, var(--md-ref-typeface-weight-medium, 500)) var(--md-sys-typescale-label-medium-size, 0.75rem)/var(--md-sys-typescale-label-medium-line-height, 1rem) var(--md-sys-typescale-label-medium-font, var(--md-ref-typeface-plain, Roboto))}.md-typescale-label-medium-prominent{font-weight:var(--md-sys-typescale-label-medium-weight-prominent, var(--md-ref-typeface-weight-bold, 700))}.md-typescale-label-large,.md-typescale-label-large-prominent{font:var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)) var(--md-sys-typescale-label-large-size, 0.875rem)/var(--md-sys-typescale-label-large-line-height, 1.25rem) var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto))}.md-typescale-label-large-prominent{font-weight:var(--md-sys-typescale-label-large-weight-prominent, var(--md-ref-typeface-weight-bold, 700))}}
`,Ya=`
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
`,Ae=y`
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
`,he=y`
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
`,yi="oppai_theme";function yr(){const t=localStorage.getItem(yi);return t==="light"||t==="dark"||t==="system"?t:"dark"}function Za(t){try{localStorage.setItem(yi,t)}catch{}}function xr(t){const e=t==="light"||t==="system"&&window.matchMedia("(prefers-color-scheme: light)").matches;document.documentElement.dataset.theme=e?"light":""}function Ja(){window.matchMedia("(prefers-color-scheme: light)").addEventListener("change",()=>{yr()==="system"&&xr("system")})}y`
  .card {
    background: var(--md-sys-color-surface-container);
    border-radius: var(--oppai-radius);
    overflow: hidden;
  }
`;const ar="oppai_token";function sr(){return localStorage.getItem(ar)}function pt(t){t?localStorage.setItem(ar,t):localStorage.removeItem(ar)}function Oe(t,e="error",r={}){window.dispatchEvent(new CustomEvent("oppai-mascot",{detail:{message:t,tone:e,...r}}))}async function x(t,e={},r=0){const i=new Headers(e.headers),o=sr();o&&i.set("Authorization",`Bearer ${o}`),e.body&&!(e.body instanceof FormData)&&i.set("Content-Type","application/json");const a=r>0?new AbortController:null,s=a?setTimeout(()=>a.abort(),r):null;try{const c=await fetch(t,{...e,headers:i,signal:a==null?void 0:a.signal});if(c.status===401)throw t!=="/api/auth/login"&&(pt(null),window.dispatchEvent(new CustomEvent("oppai-logout")),Oe("Your session ended. Please sign in again.")),new Error("unauthorized");if(!c.ok){let h=c.statusText;try{const v=await c.json();v!=null&&v.error&&(h=v.error)}catch{}throw new Error(h)}return c.status===204?void 0:await c.json()}catch(c){if(a!=null&&a.signal.aborted){const h=new Error("Timed out — the site was too slow or unreachable.");throw t!=="/api/auth/login"&&Oe(h.message),h}throw t!=="/api/auth/login"&&c instanceof Error&&c.message!=="unauthorized"&&Oe(c.message||"Something went wrong."),c}finally{s&&clearTimeout(s)}}const g={health:()=>x("/api/health"),login:(t,e)=>x("/api/auth/login",{method:"POST",body:JSON.stringify({username:t,password:e,client:"web"})}),me:()=>x("/api/auth/me"),logout:()=>x("/api/auth/logout",{method:"POST"}),listMedia:(t="",e=60,r=0)=>{const i=new URLSearchParams;return t&&i.set("kind",t),i.set("limit",String(e)),i.set("offset",String(r)),x(`/api/media?${i}`)},getMedia:t=>x(`/api/media/${t}`),streamURL:t=>`/api/media/${t}/stream`,thumbURL:t=>`/api/media/${t}/thumb`,proxyURL:t=>`/api/scrape/proxy?url=${encodeURIComponent(t)}`,upload:(t,e)=>{const r=new FormData;return r.append("file",t),e&&r.append("title",e),x("/api/media",{method:"POST",body:r})},autotag:t=>x(`/api/media/${t}/autotag`,{method:"POST"}),comicInfo:t=>x(`/api/media/${t}/comic`),pageURL:(t,e)=>`/api/media/${t}/page/${e}`,getSettings:()=>x("/api/settings"),saveSettings:t=>x("/api/settings",{method:"PUT",body:JSON.stringify(t)}),stats:()=>x("/api/stats"),changePassword:(t,e)=>x("/api/auth/password",{method:"POST",body:JSON.stringify({current:t,new:e})}),updateMedia:(t,e)=>x(`/api/media/${t}`,{method:"PATCH",body:JSON.stringify(e)}),deleteMedia:t=>x(`/api/media/${t}`,{method:"DELETE"}),bulkMedia:(t,e,r)=>x("/api/media/bulk",{method:"POST",body:JSON.stringify({action:t,ids:e,patch:r??{}})}),scrape:t=>x("/api/scrape",{method:"POST",body:JSON.stringify({url:t})},45e3),scrapeBulk:t=>x("/api/scrape/bulk",{method:"POST",body:JSON.stringify({urls:t})},75e3),scrapeImport:t=>x("/api/scrape/import",{method:"POST",body:JSON.stringify(t)}),apkInfo:()=>x("/api/apk/info"),sources:()=>x("/api/sources"),browseSource:(t,e={})=>{const r=new URLSearchParams;return e.feed&&r.set("feed",e.feed),e.cursor&&r.set("cursor",e.cursor),e.q&&r.set("q",e.q),e.sort&&r.set("sort",e.sort),x(`/api/sources/${t}/browse?${r}`,{},45e3)},sourcePages:(t,e)=>x(`/api/sources/${encodeURIComponent(t)}/item/${encodeURIComponent(e)}/pages`,{},45e3),sourceComments:(t,e)=>x(`/api/sources/${encodeURIComponent(t)}/item/${encodeURIComponent(e)}/comments`,{},45e3),sourceStreamURL:t=>`/api/sources/stream?url=${encodeURIComponent(t)}`,saveFromSource:(t,e)=>x(`/api/sources/${encodeURIComponent(t)}/save`,{method:"POST",body:JSON.stringify(e)},15*6e4),imageGenStatus:()=>x("/api/imagegen/status",{},12e3),booruTags:t=>x(`/api/imagegen/tags?q=${encodeURIComponent(t)}`),characters:()=>x("/api/imagegen/characters"),createCharacter:(t,e)=>{const r=new FormData;return r.append("name",t),r.append("file",e),x("/api/imagegen/characters",{method:"POST",body:r},125e3)},gameGallery:t=>x(`/api/media/${t}/gallery`),uploadGameGallery:(t,e)=>{const r=new FormData;return r.append("file",e),x(`/api/media/${t}/gallery`,{method:"POST",body:r})},removeGameGallery:(t,e)=>x(`/api/media/${t}/gallery/${e}`,{method:"DELETE"}),deleteCharacter:t=>x(`/api/imagegen/characters/${t}`,{method:"DELETE"}),characterImageURL:t=>`/api/imagegen/characters/${t}/image`,optimizePrompt:t=>x("/api/imagegen/prompt",{method:"POST",body:JSON.stringify({text:t})}),generate:t=>x("/api/imagegen/generate",{method:"POST",body:JSON.stringify(t)},10*6e4),genPreviewURL:t=>`/api/imagegen/preview/${encodeURIComponent(t)}`,saveGenerated:t=>x("/api/imagegen/save",{method:"POST",body:JSON.stringify(t)}),modelThumbURL:t=>`/api/imagegen/model-thumb?model=${encodeURIComponent(t)}`,setModelThumb:t=>x("/api/imagegen/model-thumb",{method:"PUT",body:JSON.stringify(t)}),chatStatus:()=>x("/api/chat/status",{},12e3),chat:(t,e,r="default",i=1)=>x("/api/chat",{method:"POST",body:JSON.stringify({mode:t,messages:e,emotion:r,intensity:i})},125e3),loraThumbURL:t=>`/api/imagegen/lora-thumb?name=${encodeURIComponent(t)}`,setLoraThumb:t=>x("/api/imagegen/lora-thumb",{method:"PUT",body:JSON.stringify(t)})},xi=n`
  <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
    <path fill="currentColor" fill-rule="evenodd" d="M248.79 202.75C241.99 205.36 234.02 203.88 227.23 207.25C232.74 212.7 238.24 218.16 243.75 223.61C248.93 222.7 253.79 221.68 259.12 222.23C275.19 223.91 288.52 236.22 290.8 252.31C291.65 258.33 289.87 263.49 288.92 269.25C297.53 277.58 306.14 285.91 314.75 294.24C319.55 292.66 324.48 288.29 328.56 285.31C336.24 279.7 355.63 264.75 359.75 256.85C357.42 251.81 349.38 245.47 345.25 241.51C328.91 225.87 308.81 213.57 287.1 207.2C282.65 205.9 277.87 204.6 273.25 204.06C269.99 203.67 266.48 203.74 263.35 202.75C262.3 196.37 262.26 174.4 265.23 168.95C269.38 161.35 278.78 155.81 286.08 151.79C306.44 140.57 330.55 132.62 353.75 129.98C365.91 128.59 377.94 126.6 390.25 126.49C394.03 126.45 400.93 124.83 402.71 129.51C404.19 133.39 403.02 139.61 403.03 143.75C403.03 154.75 403.03 165.75 403.03 176.75C403.03 214.25 403.04 251.75 403.03 289.25C403.02 301.08 403.01 312.92 403.03 324.75C403.03 328.47 404.42 335.11 400.86 337.6C397.08 340.23 386.89 338.61 382.25 338.71C368.12 339.01 354.2 339.66 340.28 342.14C320.39 345.69 301.88 353.2 284.49 363.27C279.59 366.11 274.99 369.77 270.57 373.32C268.37 375.08 266.24 377.65 263.75 378.89C262.27 376.96 263.21 364.83 263.21 361.75C263.19 350.33 263.17 338.92 263.22 327.5C263.24 322.34 262.32 316.27 263.4 311.25C270.81 309.75 278.22 308.25 285.63 306.75C280.34 301.52 275.04 296.29 269.75 291.06C262.81 291.98 256.4 293.34 249.34 291.8C234.72 288.62 223.66 276.85 221.21 262.15C220.06 255.3 222.47 250.1 222.86 243.75C214.49 235.57 206.12 227.39 197.75 219.21C193.28 220.61 189.03 224.28 185.15 226.89C174.55 233.99 159.34 246.13 152.28 256.75C156.09 263 163 268.47 168.44 273.31C184.26 287.39 202.26 299.16 222.48 305.75C227.85 307.5 233.67 309.06 239.28 309.87C242.46 310.34 245.84 310.14 248.9 311.2C248.9 333.72 248.9 356.23 248.9 378.75C245.9 377.81 243 374.3 240.42 372.33C235.16 368.34 229.73 364.6 224.1 361.17C208.2 351.49 189.88 345.69 171.67 342.17C157.08 339.34 142.11 338.31 127.25 338.59C123.4 338.66 112.88 340.21 110.35 336.93C107.8 333.61 109.13 327.21 109.14 323.25C109.14 311.25 109.08 299.25 109.15 287.25C109.37 250.25 109.2 213.25 109.13 176.25C109.12 165.25 109.13 154.25 109.14 143.25C109.14 139.38 107.93 133.23 109.39 129.64C111.39 124.72 119.14 126.37 123.25 126.52C136.57 127.02 149.78 128.38 162.89 130.8C185.38 134.94 208.77 140.63 228.38 152.84C235.06 157 244.67 162.69 247.79 170.4C250.03 175.95 249.28 196.1 248.79 202.75ZM188.81 185.14C184.53 186.2 182.77 191.54 185.2 195.06C189.11 200.72 199.68 209.47 204.98 214.76C232.26 241.93 258.92 269.89 286.82 296.41C294.76 303.96 302.04 312.25 310.15 319.61C313.46 322.62 317.86 324.65 321.55 320.79C324.49 317.71 323.32 313.84 320.62 311.15C312.86 303.42 305 295.73 297.11 288.13C270.03 262.08 244.18 234.72 217.27 208.48C211.03 202.4 204.89 196.18 198.75 189.99C195.96 187.17 193.23 184.03 188.81 185.14ZM242.89 388.25C239.88 388.8 235 386.29 231.95 385.3C225.25 383.12 218.1 381.48 211.18 380.16C197.78 377.61 184.34 376.21 170.75 375.12C161.31 374.36 151.99 374.57 142.83 371.84C135.32 369.6 128.91 364.79 123.97 358.79C122.75 357.31 120.22 354.68 120.33 352.75C122.81 351.37 126.43 351.59 129.25 351.33C137.9 350.53 147.1 350.61 155.75 351.4C185.38 354.1 223.44 363.47 242.89 388.25ZM391.12 352.75C389.88 360.29 376.46 368.65 369.91 371.21C360.47 374.91 350.23 374.47 340.25 375.14C326.51 376.08 312.83 377.42 299.33 380.16C292.82 381.48 286.26 383.32 279.93 385.23C276.86 386.16 272.08 388.87 269.1 388.25C289.12 363.15 326.86 353.51 357.25 351.31C365.54 350.71 373.97 350.77 382.25 351.38C384.87 351.58 388.99 351.28 391.12 352.75Z" />
  </svg>
`,wi=["default","happy","sad","worried","surprised","thinking","mischievous","horniness"],Xa={default:"🙂",happy:"😊",sad:"😢",worried:"😟",surprised:"😮",thinking:"🤔",mischievous:"😏",horniness:"🥵"},Hr={happy:"/mascot-happy.png",worried:"/mascot-thinking.png",surprised:"/mascot-surprised.png",thinking:"/mascot-thinking.png",mischievous:"/mascot-mischievous.png",horniness:"/mascot-mischievous.png"};function Te(t){const e=(t??"").trim().toLowerCase();return wi.includes(e)?e:"default"}function Ne(t){return Math.max(1,Math.min(5,Math.round(Number(t)||1)))}function _i(t){return Xa[Te(t)]}function wr(t,e,r="default"){const i=Te(t),o=Ne(e),a=r.trim().toLowerCase().replace(/[^a-z0-9_-]+/g,"-")||"default",s=[`/libby/${a}/${i}-${o}.gif`,`/libby/${a}/${i}-${o}.png`,`/libby/${a}/${i}.gif`,`/libby/${a}/${i}.png`];return Hr[i]&&s.push(Hr[i]),s.push("/mascot.png"),[...new Set(s)]}function $i(t){const e=t.toLowerCase();return/timed? out|unreachable|network|offline|couldn.t reach|connection/.test(e)?{emotion:"worried",intensity:4}:/unauthori[sz]ed|session ended|sign in|password|login/.test(e)?{emotion:"sad",intensity:3}:/invalid|missing|required|not found|doesn.t exist/.test(e)?{emotion:"thinking",intensity:2}:/failed|error|couldn.t|can.t/.test(e)?{emotion:"surprised",intensity:3}:{emotion:"worried",intensity:2}}function _r(t,e){const i=Number(t.dataset.fallbackIndex||"0")+1;i>=e.length||(t.dataset.fallbackIndex=String(i),t.src=e[i])}var Qa=Object.defineProperty,es=Object.getOwnPropertyDescriptor,ae=(t,e,r,i)=>{for(var o=i>1?void 0:i?es(e,r):e,a=t.length-1,s;a>=0;a--)(s=t[a])&&(o=(i?s(e,r,o):s(o))||o);return i&&o&&Qa(e,r,o),o};let Z=class extends _{constructor(){super(...arguments),this.error="",this.busy=!1,this.libbyMessage="Welcome! I'm Libby. I'll help if sign-in gives you trouble.",this.libbyTone="success",this.libbyEmotion="happy",this.libbyIntensity=1,this.libbyOutfit="default",this.onLibby=t=>{this.libbyMessage=t.detail.message,this.libbyTone=t.detail.tone;const e=t.detail.tone==="error"?$i(t.detail.message):{emotion:"happy",intensity:1};this.libbyEmotion=Te(t.detail.emotion??e.emotion),this.libbyIntensity=Ne(t.detail.intensity??e.intensity),this.libbyOutfit=t.detail.outfit||"default",this.libbyTimer&&clearTimeout(this.libbyTimer),this.libbyTimer=window.setTimeout(()=>{this.libbyMessage=""},5e3)},this.onKeydown=t=>{t.key==="Enter"&&!this.busy&&(t.preventDefault(),this.form.requestSubmit())}}connectedCallback(){super.connectedCallback(),window.addEventListener("oppai-mascot",this.onLibby),this.libbyTimer=window.setTimeout(()=>this.libbyMessage="",5e3)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("oppai-mascot",this.onLibby),this.libbyTimer&&clearTimeout(this.libbyTimer)}async submit(t){if(t.preventDefault(),this.busy)return;this.error="",this.busy=!0;const e=t.target,r=e.elements.namedItem("username").value,i=e.elements.namedItem("password").value;try{const o=await g.login(r,i);pt(o.token),Oe(`Welcome back, ${o.user.username}!`,"success"),this.dispatchEvent(new CustomEvent("logged-in",{detail:o.user,bubbles:!0,composed:!0}))}catch(o){this.error=o.message||"login failed",Oe(this.error==="unauthorized"?"That login didn't work. Check your username and password.":this.error)}finally{this.busy=!1}}render(){const t=wr(this.libbyEmotion,this.libbyIntensity,this.libbyOutfit);return n`
      <div class="libby ${this.libbyMessage?"talking":""} ${this.libbyTone}">
        ${this.libbyMessage?n`<div class="libby-speech" role=${this.libbyTone==="error"?"alert":"status"}>
          <span class="libby-name">LIBBY</span>
          <span class="libby-emotion">${_i(this.libbyEmotion)}</span>${this.libbyMessage}
        </div>`:null}
        <img src=${t[0]} data-fallback-index="0" alt=${`Libby feeling ${this.libbyEmotion}`}
          @error=${e=>_r(e.target,t)} />
      </div>
      <form class="card" @submit=${this.submit} @keydown=${this.onKeydown}>
        <span class="logo">${xi}</span>
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
    `}};Z.styles=[he,y`
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
      }
      .libby img {
        display: block;
        height: 100%;
        width: 100%;
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
      .libby-emotion { margin-right: 4px; }
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
    `];ae([p()],Z.prototype,"error",2);ae([p()],Z.prototype,"busy",2);ae([p()],Z.prototype,"libbyMessage",2);ae([p()],Z.prototype,"libbyTone",2);ae([p()],Z.prototype,"libbyEmotion",2);ae([p()],Z.prototype,"libbyIntensity",2);ae([p()],Z.prototype,"libbyOutfit",2);ae([z("form")],Z.prototype,"form",2);Z=ae([k("oppai-login")],Z);const Ue=[];let ts=1;function Le(){window.dispatchEvent(new CustomEvent("oppai-downloads",{detail:Ue.map(t=>({...t}))}))}function rs(){return Ue.map(t=>({...t}))}function ki(t,e){const r={id:ts++,label:t,progress:.02,state:"running"};return Ue.unshift(r),Le(),e(o=>{r.state==="running"&&(r.progress=Math.max(r.progress,Math.min(.98,o)),Le())}).then(()=>{r.progress=1,r.state="done",Le(),window.dispatchEvent(new CustomEvent("oppai-download-complete",{detail:{id:r.id}}))}).catch(o=>{r.state="error",r.error=o instanceof Error?o.message:"Download failed",Le()}),r.id}function is(t){const e=Ue.findIndex(r=>r.id===t);e>=0&&(Ue.splice(e,1),Le())}function Ci(t){return t.composedPath().some(e=>e instanceof HTMLElement&&(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable))}const j={image:{label:"Photos",typeLabel:"PHOTO",icon:"photo_library",aspect:"4 / 3"},gif:{label:"GIFs",typeLabel:"GIF",icon:"animation",aspect:"1 / 1"},video:{label:"Videos",typeLabel:"VIDEO",icon:"movie",aspect:"16 / 9"},game:{label:"Games",typeLabel:"GAME",icon:"sports_esports",aspect:"3 / 4"},comic:{label:"Comics",typeLabel:"COMIC",icon:"auto_stories",aspect:"2 / 3"}},Be=["image","gif","video","game","comic"],qr=["linear-gradient(135deg, oklch(34% 0.06 60), oklch(22% 0.05 55))","linear-gradient(135deg, oklch(33% 0.07 45), oklch(21% 0.05 40))","linear-gradient(135deg, oklch(32% 0.07 30), oklch(20% 0.05 25))","linear-gradient(135deg, oklch(34% 0.055 75), oklch(22% 0.045 70))","linear-gradient(135deg, oklch(32% 0.06 20), oklch(20% 0.05 15))"];function ke(t){return qr[Math.abs(t.id)%qr.length]}function os(t){return t.kind==="image"||t.kind==="gif"||!!t.hasThumb}function lt(t){const e=Math.max(0,Math.round(t)),r=Math.floor(e/60),i=e%60;return`${r}:${String(i).padStart(2,"0")}`}function Ee(t){if(!t)return"";const e=["B","KB","MB","GB","TB"];let r=t,i=0;for(;r>=1024&&i<e.length-1;)r/=1024,i++;return`${r<10&&i>0?r.toFixed(1):Math.round(r)} ${e[i]}`}function Ti(t){switch(t.kind){case"video":case"gif":return t.duration?lt(t.duration):Ee(t.size);case"image":return t.width&&t.height?`${t.width}×${t.height}`:Ee(t.size);case"game":return Ee(t.size);case"comic":return t.pageCount?`${t.pageCount} pages`:Ee(t.size);default:return Ee(t.size)}}function as(t){return t.tags&&t.tags.length?t.tags[0].name:j[t.kind].label.replace(/s$/,"")}const zi="oppai_favorites";function ss(){try{const t=localStorage.getItem(zi);return t?new Set(JSON.parse(t).filter(e=>typeof e=="number")):new Set}catch{return new Set}}function Tt(t){try{localStorage.setItem(zi,JSON.stringify([...t]))}catch{}}const Ai="oppai_comic_fit",Si="oppai_comic_pos";function Ii(){return localStorage.getItem(Ai)==="width"?"width":"page"}function Ei(t){try{localStorage.setItem(Ai,t)}catch{}}function Li(){try{const t=localStorage.getItem(Si);return t?JSON.parse(t):{}}catch{return{}}}function ns(t){const e=Li()[String(t)];return typeof e=="number"&&e>=1?e:1}function ls(t,e){try{const r=Li();r[String(t)]=e,localStorage.setItem(Si,JSON.stringify(r))}catch{}}var ds=Object.defineProperty,cs=Object.getOwnPropertyDescriptor,R=(t,e,r,i)=>{for(var o=i>1?void 0:i?cs(e,r):e,a=t.length-1,s;a>=0;a--)(s=t[a])&&(o=(i?s(e,r,o):s(o))||o);return i&&o&&ds(e,r,o),o};let E=class extends _{constructor(){super(...arguments),this.favorite=!1,this.queue=[],this.full=null,this.activeTag=null,this.tagging=!1,this.editing=!1,this.saving=!1,this.editTitle="",this.editNotes="",this.editKind="image",this.editTags=[],this.newTag="",this.screenshot="",this.userGallery=[],this.galleryUploading=!1,this.comic=null,this.page=1,this.fit=Ii(),this.onKey=t=>{var i;if(Ci(t))return;const e=this.full??this.media;if(e.kind==="comic"){this.onComicKey(t);return}if(e.kind!=="video")return;const r=this.videoEl();if(r)switch(t.key){case" ":case"k":t.preventDefault(),r.paused?r.play():r.pause();break;case"j":r.currentTime=Math.max(0,r.currentTime-10);break;case"l":r.currentTime=Math.min(r.duration||1/0,r.currentTime+10);break;case"m":r.muted=!r.muted;break;case"f":t.preventDefault(),document.fullscreenElement?document.exitFullscreen():(i=r.requestFullscreen)==null||i.call(r);break}},this.cancelEdit=()=>{this.editing=!1}}connectedCallback(){super.connectedCallback(),this.loadItem(),window.addEventListener("keydown",this.onKey)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this.onKey),this.clearMediaSession()}updated(t){if(t.has("media")){const e=t.get("media");e&&e.id!==this.media.id&&(this.editing=!1,this.activeTag=null,this.loadItem())}this.setupMediaSession()}loadItem(){const t=this.media;this.full=t,g.getMedia(t.id).then(e=>this.full=e).catch(()=>this.full=t),this.comic=null,t.kind==="comic"&&this.loadComic(t.id),this.userGallery=[],t.kind==="game"&&this.loadGameGallery(t.id)}async loadGameGallery(t){try{const e=await g.gameGallery(t);this.media.id===t&&(this.userGallery=e.items)}catch{this.userGallery=[]}}async uploadGameGallery(t,e){const r=t.target,i=[...r.files??[]];if(r.value="",!(!i.length||this.galleryUploading)){this.galleryUploading=!0;try{for(const o of i)this.userGallery=[...this.userGallery,await g.uploadGameGallery(e,o)]}finally{this.galleryUploading=!1}}}async removeGameGallery(t,e){await g.removeGameGallery(t,e),this.userGallery=this.userGallery.filter(r=>r.id!==e)}async loadComic(t){try{const e=await g.comicInfo(t);if(this.media.id!==t)return;this.comic=e,e.readable&&e.pages>0&&(this.page=Math.min(Math.max(ns(t),1),e.pages),this.preloadPage(t,this.page+1))}catch(e){if(this.media.id!==t)return;this.comic={readable:!1,pages:0,reason:e.message}}}preloadPage(t,e){var r;!((r=this.comic)!=null&&r.readable)||e<1||e>this.comic.pages||(new Image().src=g.pageURL(t,e))}goPage(t){var i,o;if(!((i=this.comic)!=null&&i.readable))return;const e=this.full??this.media,r=Math.min(Math.max(t,1),this.comic.pages);r!==this.page&&(this.page=r,ls(e.id,r),this.preloadPage(e.id,r+1),this.fit==="width"&&((o=this.renderRoot.querySelector(".reader-stage"))==null||o.scrollIntoView({block:"start"})))}setFit(t){this.fit=t,Ei(t)}videoEl(){var t;return((t=this.renderRoot)==null?void 0:t.querySelector("video"))??null}onComicKey(t){var e;if((e=this.comic)!=null&&e.readable)switch(t.key){case"ArrowRight":case"PageDown":case" ":t.preventDefault(),this.goPage(this.page+1);break;case"ArrowLeft":case"PageUp":t.preventDefault(),this.goPage(this.page-1);break;case"Home":t.preventDefault(),this.goPage(1);break;case"End":t.preventDefault(),this.goPage(this.comic.pages);break}}emitNavigate(t){this.dispatchEvent(new CustomEvent("navigate",{detail:{dir:t},bubbles:!0,composed:!0}))}setupMediaSession(){const t=this.full??this.media;if(t.kind!=="video"||!("mediaSession"in navigator))return;const e=this.videoEl();if(!e)return;const r=navigator.mediaSession;try{r.metadata=new MediaMetadata({title:t.title,artist:"OppaiLib"})}catch{}const i=(o,a)=>{try{r.setActionHandler(o,a)}catch{}};i("play",()=>void e.play()),i("pause",()=>e.pause()),i("seekbackward",o=>{e.currentTime=Math.max(0,e.currentTime-(o.seekOffset??10))}),i("seekforward",o=>{e.currentTime=Math.min(e.duration||1/0,e.currentTime+(o.seekOffset??10))}),i("seekto",o=>{o.seekTime!=null&&(e.currentTime=o.seekTime)}),i("previoustrack",()=>this.emitNavigate(-1)),i("nexttrack",()=>this.emitNavigate(1))}clearMediaSession(){if(!("mediaSession"in navigator))return;const t=navigator.mediaSession,e=["play","pause","seekbackward","seekforward","seekto","previoustrack","nexttrack"];for(const r of e)try{t.setActionHandler(r,null)}catch{}t.metadata=null}toggleFav(){this.dispatchEvent(new CustomEvent("toggle-favorite",{bubbles:!0,composed:!0}))}async retag(){this.tagging=!0;try{const t=await g.autotag(this.media.id);this.full&&(this.full={...this.full,tags:t.tags}),this.activeTag=null,this.dispatchEvent(new CustomEvent("changed",{bubbles:!0,composed:!0}))}catch(t){console.error("autotag",t)}finally{this.tagging=!1}}hasTimeline(t){var r;const e=this.full??this.media;return e.kind==="video"&&!!e.duration&&!!((r=t.moments)!=null&&r.length)}toggleTagTimeline(t){this.hasTimeline(t)&&(this.activeTag=this.activeTag===t.id?null:t.id)}seekTo(t){const e=this.videoEl();e&&(e.currentTime=t,e.play())}renderTimeline(t){var i;if(t.kind!=="video"||!t.duration)return d;const e=(t.tags??[]).find(o=>o.id===this.activeTag);if(!((i=e==null?void 0:e.moments)!=null&&i.length))return d;const r=t.duration;return n`
      <div class="timeline">
        <div class="rail">
          ${e.moments.map(o=>n`<button
              class="marker"
              style="left:${Math.min(100,o/r*100)}%"
              title="Jump to ${lt(o)}"
              aria-label="Jump to ${lt(o)}"
              @click=${()=>this.seekTo(o)}
            ></button>`)}
        </div>
        <div class="rail-legend">
          <span class="material-symbols-rounded" style="font-size:16px;">auto_awesome</span>
          <span
            >“${e.name}” detected at ${e.moments.map(o=>lt(o)).join(", ")} — click a
            marker to jump.</span
          >
        </div>
      </div>
    `}startEdit(){const t=this.full??this.media;this.editTitle=t.title,this.editNotes=t.notes??"",this.editKind=t.kind,this.editTags=(t.tags??[]).map(e=>e.name),this.newTag="",this.editing=!0}removeEditTag(t){this.editTags=this.editTags.filter(e=>e!==t)}commitNewTag(){const t=this.newTag.trim();t&&!this.editTags.includes(t)&&(this.editTags=[...this.editTags,t]),this.newTag=""}onTagKeydown(t){(t.key==="Enter"||t.key===",")&&(t.preventDefault(),this.commitNewTag())}async saveEdit(){const t=this.full??this.media;this.commitNewTag();const e=(t.tags??[]).map(o=>o.name),r=this.editTags.filter(o=>!e.includes(o)),i=e.filter(o=>!this.editTags.includes(o));this.saving=!0;try{const o=await g.updateMedia(t.id,{title:this.editTitle,notes:this.editNotes,kind:this.editKind,addTags:r,removeTags:i});this.full=o,this.editing=!1,this.dispatchEvent(new CustomEvent("changed",{bubbles:!0,composed:!0}))}catch(o){console.error("save edit",o)}finally{this.saving=!1}}async doDelete(){const t=this.full??this.media;if(confirm(`Delete "${t.title}"? This cannot be undone.`))try{await g.deleteMedia(t.id),this.dispatchEvent(new CustomEvent("deleted",{detail:{id:t.id},bubbles:!0,composed:!0}))}catch(e){console.error("delete",e)}}renderEdit(){return n`
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
            ${Be.map(t=>n`<option value=${t} ?selected=${t===this.editKind}>${j[t].label}</option>`)}
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
            ${this.editTags.map(t=>n`<span class="tag-pill"
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
    `}favIcon(){return n`<span
      class="material-symbols-rounded fill-icon"
      style="font-size:22px; color:${this.favorite?"var(--oppai-fav)":"var(--oppai-text)"};"
      >${this.favorite?"favorite":"favorite_border"}</span
    >`}render(){const t=this.full??this.media,e=g.streamURL(t.id);return n`
      <div class="wrap">
        ${this.renderStage(t,e)}
        ${t.kind==="video"?this.renderUpNext(t):d}
        ${this.renderTimeline(t)}
        ${t.kind==="game"?d:this.renderMeta(t)}
      </div>
      ${this.screenshot?n`<button class="shot-lightbox" aria-label="Close screenshot" @click=${()=>this.screenshot=""}>
            <img src=${this.screenshot} alt="Full-size game screenshot" />
          </button>`:d}
    `}renderUpNext(t){const e=this.queue.filter(i=>i.kind==="video");if(e.some(i=>i.id===t.id)||e.unshift(t),e.length<2)return d;const r=e.findIndex(i=>i.id===t.id);return n`
      <div class="upnext">
        <div class="upnext-label">Videos</div>
        <div class="strip">
          ${e.map((i,o)=>n`
              <button
                class="strip-item ${i.id===t.id?"on":""}"
                title=${i.title}
                aria-current=${i.id===t.id}
                @click=${()=>this.jumpTo(i.id)}
              >
                ${i.hasThumb?n`<img src=${g.thumbURL(i.id)} loading="lazy" alt=${i.title} />`:n`<span class="strip-blank" style="background:${ke(i)};"></span>`}
                ${i.kind==="video"?n`<span class="strip-play material-symbols-rounded">play_circle</span>`:d}
                ${o===r+1?n`<span class="strip-next">Next</span>`:d}
              </button>
            `)}
        </div>
      </div>
    `}jumpTo(t){t!==this.media.id&&this.dispatchEvent(new CustomEvent("jump",{detail:{id:t},bubbles:!0,composed:!0}))}renderStage(t,e){switch(t.kind){case"video":const r=t.width&&t.height?t.width/t.height:1.7777777777777777;return n`<div
          class="stage video-stage"
          style="aspect-ratio:${r}; width:100%; max-width:${76*r}vh; background:${ke(t)};"
        >
          <video
            src=${e}
            poster=${t.hasThumb?g.thumbURL(t.id):d}
            controls
            autoplay
            playsinline
            preload="metadata"
          ></video>
        </div>`;case"gif":case"image":return n`<div class="stage-fit">
          <img src=${e} alt=${t.title} />
        </div>`;case"comic":return this.renderComic(t);case"game":return this.renderGame(t,e);default:return d}}renderComic(t){return n`
      <div class="reader">
        ${this.comic===null?n`<div class="reader-fallback" style="background:${ke(t)};">
              <span class="mono" style="color:#fff;">OPENING…</span>
            </div>`:this.comic.readable?this.renderReader(t,this.comic):this.renderComicFallback(t,this.comic)}
      </div>
    `}renderReader(t,e){const r=this.page<=1,i=this.page>=e.pages;return n`
      <div class="reader-stage">
        <img
          class="page-img ${this.fit==="width"?"fit-width":"fit-page"}"
          src=${g.pageURL(t.id,this.page)}
          alt="Page ${this.page} of ${t.title}"
        />
        <button
          class="turn prev"
          title="Previous page"
          ?disabled=${r}
          @click=${()=>this.goPage(this.page-1)}
        >
          ${r?d:n`<span class="material-symbols-rounded" style="font-size:28px;">chevron_left</span>`}
        </button>
        <button
          class="turn next"
          title="Next page"
          ?disabled=${i}
          @click=${()=>this.goPage(this.page+1)}
        >
          ${i?d:n`<span class="material-symbols-rounded" style="font-size:28px;">chevron_right</span>`}
        </button>
      </div>

      <div class="reader-bar">
        <button class="round-btn" title="Previous page" ?disabled=${r} @click=${()=>this.goPage(this.page-1)}>
          <span class="material-symbols-rounded" style="font-size:22px;">chevron_left</span>
        </button>
        <input
          type="range"
          min="1"
          max=${e.pages}
          .value=${String(this.page)}
          @input=${o=>this.goPage(Number(o.target.value))}
          aria-label="Page"
        />
        <span class="mono">${this.page} / ${e.pages}</span>
        <button class="round-btn" title="Next page" ?disabled=${i} @click=${()=>this.goPage(this.page+1)}>
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
    `}renderComicFallback(t,e){return n`
      <div class="reader-fallback" style="background:${ke(t)};">
        <span class="material-symbols-rounded" style="font-size:40px; color:#fff;">auto_stories</span>
        <span class="mono" style="color:#fff;">CAN'T READ IN APP</span>
        <span style="font-size:12px; color:rgba(255,255,255,0.75);">
          ${e.reason??"Unsupported archive."} Only .cbz / .zip comics can be paged through here.
        </span>
        <a href=${g.streamURL(t.id)} download style="color:#fff; font-size:12px; font-weight:600; margin-top:6px;"
          >Download the file</a
        >
      </div>
    `}renderGame(t,e){const r=t.download?this.hostOf(t.download):"";return n`
      <div class="game">
        <div class="game-cover" style="background:${ke(t)};">
          ${t.hasThumb?n`<img
                src=${g.thumbURL(t.id)}
                alt=${t.title}
                style="width:100%; height:100%; object-fit:cover;"
              />`:n`<span class="material-symbols-rounded" style="font-size:48px; color:#fff;">sports_esports</span>`}
        </div>
        <div style="flex:1; min-width:260px; padding-top:8px;">
          <div class="meta-head">
            <h2 class="meta-title">${t.title}</h2>
            ${this.renderActions(!1)}
          </div>
          ${this.editing?this.renderEdit():n`
                <div class="sub">${j.game.label.replace(/s$/,"")}</div>
                <div class="actions">
                  ${t.download?n`<a class="btn-primary" href=${t.download} target="_blank" rel="noreferrer">
                        <span class="material-symbols-rounded fill-icon" style="font-size:20px;">open_in_new</span>
                        ${r?`Get it on ${r}`:"Get it"}
                      </a>`:n`<a class="btn-primary" href=${e} download>
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
                ${t.notes?n`<p class="desc">${t.notes}</p>`:n`<p class="desc">A title from your library.</p>`}
                ${this.renderTags(t)}
                ${t.gallery&&t.gallery.length?n`<div class="shots">
                      ${t.gallery.map(i=>n`<button
                        class="shot"
                        title="Open full-size screenshot"
                        @click=${()=>this.screenshot=g.proxyURL(i)}
                      ><img loading="lazy" src=${g.proxyURL(i)} alt="screenshot" /></button>`)}
                    </div>`:d}
                <div class="section-label">User gallery</div>
                <div class="shots">
                  ${this.userGallery.map(i=>n`<div class="shot user-shot">
                    ${i.kind==="video"?n`<video controls preload="metadata" src=${g.streamURL(i.id)}></video>`:n`<button class="shot" title="Open full-size upload"
                          @click=${()=>this.screenshot=g.streamURL(i.id)}>
                          <img loading="lazy" src=${g.thumbURL(i.id)} alt=${i.title} />
                        </button>`}
                    <button class="remove-shot" title="Remove from game gallery"
                      @click=${()=>void this.removeGameGallery(t.id,i.id)}>×</button>
                  </div>`)}
                </div>
                <label class="btn-outline gallery-upload">
                  <span class="material-symbols-rounded">add_photo_alternate</span>
                  ${this.galleryUploading?"Uploading…":"Add photos or videos"}
                  <input type="file" accept="image/*,video/*" multiple hidden ?disabled=${this.galleryUploading}
                    @change=${i=>void this.uploadGameGallery(i,t.id)} />
                </label>
                ${t.source?n`<div class="meta-note">
                      Source:
                      <a href=${t.source} target="_blank" rel="noreferrer" style="color:var(--oppai-primary-bright);">link</a>
                    </div>`:d}
              `}
        </div>
      </div>
    `}hostOf(t){try{return new URL(t).hostname.replace(/^www\./,"")}catch{return""}}renderActions(t=!0){return n`
      ${t?n`<button class="icon-round" title="Auto-tag" @click=${this.retag} ?disabled=${this.tagging}>
            <span class="material-symbols-rounded" style="font-size:22px; color:var(--oppai-text-dim);"
              >${this.tagging?"hourglass_empty":"auto_awesome"}</span
            >
          </button>`:d}
      <button class="icon-round" title="Edit" @click=${()=>this.startEdit()}>
        <span class="material-symbols-rounded" style="font-size:22px; color:var(--oppai-text-dim);">edit</span>
      </button>
      <button class="icon-round" title="Delete" @click=${this.doDelete}>
        <span class="material-symbols-rounded" style="font-size:22px; color:var(--oppai-error, #f2b8b5);">delete</span>
      </button>
      <button class="icon-round" title="Favorite" @click=${this.toggleFav}>${this.favIcon()}</button>
    `}renderMeta(t){const e=j[t.kind];return n`
      <div class="meta">
        <div class="meta-head">
          <h2 class="meta-title">${t.title}</h2>
          ${this.renderActions()}
        </div>
        ${this.editing?this.renderEdit():n`
              <div class="chips">
                <span class="chip chip-accent">${Ti(t)||e.label}</span>
                <span class="chip chip-muted">${e.typeLabel}</span>
              </div>
              ${this.renderTags(t)}
              ${t.notes?n`<p class="desc" style="margin-top:16px;">${t.notes}</p>`:d}
              ${t.source?n`<div class="meta-note">
                    Source:
                    <a href=${t.source} target="_blank" rel="noreferrer" style="color:var(--oppai-primary-bright);">link</a>
                  </div>`:d}
            `}
      </div>
    `}renderTags(t){const e=t.tags??[];if(e.length===0)return n`<div class="meta-note" style="margin-top:14px;">
        No tags yet — use the ✨ auto-tag button.
      </div>`;const r=e.some(i=>this.hasTimeline(i));return n`
      <div class="chips">
        ${e.map(i=>this.renderTagChip(i))}
      </div>
      ${r&&this.activeTag==null?n`<div class="meta-note" style="margin-top:10px;">
            Tap a ✨ tag to see where it appears in this video.
          </div>`:d}
    `}renderTagChip(t){const e=`${t.category}${t.source?" · "+t.source:""}`;if(!this.hasTimeline(t))return n`<span class="chip chip-muted" title=${e}>${t.name}</span>`;const r=this.activeTag===t.id,i=t.moments.length;return n`<button
      class="chip ${r?"on":"chip-muted"}"
      title="${e} · seen at ${i} point${i===1?"":"s"}"
      aria-pressed=${r}
      @click=${()=>this.toggleTagTimeline(t)}
    >
      <span class="material-symbols-rounded" style="font-size:14px;">auto_awesome</span>
      ${t.name}
    </button>`}};E.styles=[Ae,he,y`
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
    `];R([u({attribute:!1})],E.prototype,"media",2);R([u({type:Boolean})],E.prototype,"favorite",2);R([u({attribute:!1})],E.prototype,"queue",2);R([p()],E.prototype,"full",2);R([p()],E.prototype,"activeTag",2);R([p()],E.prototype,"tagging",2);R([p()],E.prototype,"editing",2);R([p()],E.prototype,"saving",2);R([p()],E.prototype,"editTitle",2);R([p()],E.prototype,"editNotes",2);R([p()],E.prototype,"editKind",2);R([p()],E.prototype,"editTags",2);R([p()],E.prototype,"newTag",2);R([p()],E.prototype,"screenshot",2);R([p()],E.prototype,"userGallery",2);R([p()],E.prototype,"galleryUploading",2);R([p()],E.prototype,"comic",2);R([p()],E.prototype,"page",2);R([p()],E.prototype,"fit",2);E=R([k("oppai-viewer")],E);var ps=Object.defineProperty,hs=Object.getOwnPropertyDescriptor,W=(t,e,r,i)=>{for(var o=i>1?void 0:i?hs(e,r):e,a=t.length-1,s;a>=0;a--)(s=t[a])&&(o=(i?s(e,r,o):s(o))||o);return i&&o&&ps(e,r,o),o};let G=class extends _{constructor(){super(...arguments),this.urls="",this.results=[],this.failures=[],this.chosen=new Set,this.busy=!1,this.phase="",this.fetchCount=0,this.error="",this.kind="image",this.kindTouched=!1,this.onUrlKeydown=t=>{t.key==="Enter"&&(t.ctrlKey||t.metaKey)&&(t.preventDefault(),this.fetch())}}open(){this.results=[],this.failures=[],this.chosen=new Set,this.error="",this.urls="",this.phase="",this.fetchCount=0,this.kind="image",this.kindTouched=!1,this.dialog.show()}get isGame(){return this.kind==="game"}get isComic(){return this.kind==="comic"}get urlList(){const t=new Set;return this.urls.split(/[\n,]/).map(e=>e.trim()).filter(e=>e&&!t.has(e)&&(t.add(e),!0))}get totalMedia(){return this.results.reduce((t,e)=>t+e.mediaUrls.length,0)}async fetch(){var e;const t=this.urlList;if(!(t.length===0||this.busy)){this.busy=!0,this.phase="fetching",this.fetchCount=t.length,this.error="",this.results=[],this.failures=[];try{const{items:r}=await g.scrapeBulk(t),i=new Set;for(const a of r)if(a.result){const s={...a.result,tags:a.result.tags??[],performers:a.result.performers??[],mediaUrls:a.result.mediaUrls??[],screenshots:a.result.screenshots??[],categorizedTags:a.result.categorizedTags??[]};this.results=[...this.results,s],s.mediaUrls.forEach(c=>i.add(c))}else this.failures=[...this.failures,{url:a.url,error:a.error||"failed"}];this.chosen=i;const o=(e=this.results.find(a=>a.kind))==null?void 0:e.kind;o&&(this.kind=o),this.kindTouched=!1,this.results.length===0&&this.failures.length>0&&(this.error="Nothing could be fetched from those links.")}catch(r){this.error=r.message}finally{this.busy=!1,this.phase=""}}}pickKind(t){this.kind=t,this.kindTouched=!0}toggle(t){const e=new Set(this.chosen);e.has(t)?e.delete(t):e.add(t),this.chosen=e}import(){if(this.busy||!this.isGame&&this.chosen.size===0||this.isGame&&this.results.length===0)return;this.error="";const t=[...this.results],e=new Set(this.chosen),r=this.kindTouched,i=this.kind,o=t.length===1?t[0].title||"Import":`${t.length} imports`;ki(o,async a=>{let s=0,c=0;for(const h of t){const v=r?i:h.kind||i;if(v==="game"){const b=await g.scrapeImport({url:h.sourceUrl,title:h.title,tags:h.tags,categorizedTags:h.categorizedTags,kind:"game"});s+=b.count,a(++c/t.length);continue}const f=h.mediaUrls.filter(b=>e.has(b));if(f.length===0){a(++c/t.length);continue}const m=await g.scrapeImport({url:h.sourceUrl,mediaUrls:f,title:h.title,tags:h.tags,categorizedTags:h.categorizedTags,kind:v});s+=m.count,a(++c/t.length)}this.dispatchEvent(new CustomEvent("imported",{detail:{count:s},bubbles:!0,composed:!0}))}),this.dialog.close()}renderGroup(t){return n`
      <div class="group">
        <div class="meta"><strong>${t.title||"(untitled)"}</strong></div>
        ${t.description?n`<div class="meta">${t.description}</div>`:""}
        ${t.tags.length?n`<div class="tags">
              ${t.tags.map(e=>n`<md-filter-chip label=${e} selected></md-filter-chip>`)}
            </div>`:""}
        ${this.isGame?this.renderGameGroup(t):this.renderMediaGroup(t)}
        ${this.isComic?this.renderComicHint(t):""}
      </div>
    `}renderComicHint(t){const e=t.mediaUrls.filter(r=>this.chosen.has(r)).length;return e===0?n`<div class="game-hint">Select the pages to include.</div>`:e===1?n`<div class="game-hint">
        A single page imports as one file. Select more pages to bundle them into a comic.
      </div>`:n`<div class="game-hint">
      Imports as one <strong>comic</strong> entry — ${e} pages bundled into a CBZ, in the order
      shown. Deselect any covers or banners that aren't pages.
    </div>`}renderMediaGroup(t){return t.mediaUrls.length?n`<div class="previews">
          ${t.mediaUrls.map(e=>n`<div class="pv ${this.chosen.has(e)?"sel":""}" @click=${()=>this.toggle(e)}>
              <img src=${g.proxyURL(e)} loading="lazy" />
            </div>`)}
        </div>`:n`<div class="meta">No media found on that page.</div>`}renderGameGroup(t){var r,i;const e=t.cover||t.mediaUrls[0];return n`
      ${e?n`<div class="previews">
            <div class="pv sel"><img src=${g.proxyURL(e)} loading="lazy" /></div>
          </div>`:n`<div class="meta">No cover image found.</div>`}
      ${(r=t.screenshots)!=null&&r.length?n`<div class="shots">
            ${t.screenshots.slice(0,8).map(o=>n`<img src=${g.proxyURL(o)} loading="lazy" />`)}
          </div>`:""}
      <div class="game-hint">
        Imports as one <strong>game</strong> entry — cover art, description, tags${(i=t.screenshots)!=null&&i.length?`, ${t.screenshots.length} screenshot${t.screenshots.length===1?"":"s"}`:""} and a download link.
      </div>
    `}renderTypeRow(){return this.results.length===0?"":n`
      <div class="typerow">
        <span class="lbl">Import as</span>
        ${Be.map(t=>n`<md-filter-chip
            label=${j[t].label}
            ?selected=${this.kind===t}
            @click=${()=>this.pickKind(t)}
          ></md-filter-chip>`)}
      </div>
    `}render(){return n`
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
          ${this.error?n`<div class="err">${this.error}</div>`:""}
          ${this.phase==="fetching"?n`<div class="progress">
                <md-circular-progress indeterminate></md-circular-progress>
                <span>Fetching ${this.fetchCount} link${this.fetchCount===1?"":"s"}… some sites can take a few seconds each.</span>
              </div>`:""}
          ${this.renderTypeRow()}
          ${this.results.map(t=>this.renderGroup(t))}
          ${this.failures.length?n`<div class="err">
                ${this.failures.length} link(s) failed:
                ${this.failures.map(t=>n`<div class="src">${t.url} — ${t.error}</div>`)}
              </div>`:""}
        </form>
        <div slot="actions">
          <md-text-button type="button" @click=${()=>this.dialog.close()}>Cancel</md-text-button>
          <md-filled-button type="button" @click=${this.import}
            ?disabled=${this.busy||(this.isGame?this.results.length===0:this.chosen.size===0)}>
            ${this.busy&&this.results.length?"Importing…":this.isGame?n`Import ${this.results.length===1?"game":`${this.results.length} games`}`:this.isComic?n`Import ${this.results.length===1?"comic":`${this.results.length} comics`}`:n`Import ${this.chosen.size||""}${this.totalMedia?` / ${this.totalMedia}`:""}`}
          </md-filled-button>
        </div>
      </md-dialog>
    `}};G.styles=[he,y`
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
    `];W([z("md-dialog")],G.prototype,"dialog",2);W([p()],G.prototype,"urls",2);W([p()],G.prototype,"results",2);W([p()],G.prototype,"failures",2);W([p()],G.prototype,"chosen",2);W([p()],G.prototype,"busy",2);W([p()],G.prototype,"phase",2);W([p()],G.prototype,"fetchCount",2);W([p()],G.prototype,"error",2);W([p()],G.prototype,"kind",2);W([p()],G.prototype,"kindTouched",2);G=W([k("oppai-scrape-dialog")],G);var us=Object.defineProperty,ms=Object.getOwnPropertyDescriptor,O=(t,e,r,i)=>{for(var o=i>1?void 0:i?ms(e,r):e,a=t.length-1,s;a>=0;a--)(s=t[a])&&(o=(i?s(e,r,o):s(o))||o);return i&&o&&us(e,r,o),o};let F=class extends _{constructor(){super(...arguments),this.settings=null,this.info=null,this.stats=null,this.apk=null,this.loadError="",this.dirty=!1,this.saving=!1,this.saved=!1,this.theme=yr(),this.fit=Ii(),this.pwCurrent="",this.pwNew="",this.pwConfirm="",this.pwBusy=!1,this.pwMsg="",this.pwErr=""}connectedCallback(){super.connectedCallback(),this.load()}async load(){try{const[t,e]=await Promise.all([g.getSettings(),g.stats()]);this.settings=t.settings,this.info=t.readOnly,this.stats=e}catch(t){this.loadError=t.message}try{this.apk=await g.apkInfo()}catch{this.apk={available:!1}}}get canEdit(){var t;return!!((t=this.user)!=null&&t.isAdmin)}edit(t){!this.settings||!this.canEdit||(this.settings={...this.settings,...t},this.dirty=!0,this.saved=!1)}async save(){if(this.settings){this.saving=!0;try{const t=await g.saveSettings(this.settings);this.settings=t.settings,this.info=t.readOnly,this.dirty=!1,this.saved=!0}catch(t){this.loadError=t.message}finally{this.saving=!1}}}pickTheme(t){this.theme=t,Za(t),xr(t)}pickFit(t){this.fit=t,Ei(t)}async changePassword(){if(this.pwMsg="",this.pwErr="",this.pwNew!==this.pwConfirm){this.pwErr="The new passwords don't match.";return}if(this.pwNew.length<8){this.pwErr="Use at least 8 characters.";return}this.pwBusy=!0;try{await g.changePassword(this.pwCurrent,this.pwNew),this.pwMsg="Password changed.",this.pwCurrent=this.pwNew=this.pwConfirm=""}catch(t){this.pwErr=t.message}finally{this.pwBusy=!1}}render(){return n`
      <div class="wrap">
        ${this.loadError?n`<div class="banner error">
              <span class="material-symbols-rounded" style="font-size:18px;">error</span>
              ${this.loadError}
            </div>`:d}
        ${!this.canEdit&&this.settings?n`<div class="banner info">
              <span class="material-symbols-rounded" style="font-size:18px;">lock</span>
              Server settings are read-only — only an admin can change them.
            </div>`:d}
        ${this.renderAppearance()} ${this.renderAI()} ${this.renderScraping()}
        ${this.dirty||this.saved?this.renderSaveBar():d} ${this.renderLibrary()}
        ${this.renderAndroid()} ${this.renderAccount()} ${this.renderAbout()}
      </div>
    `}renderSaveBar(){return n`
      <div class="savebar">
        <span class="grow">
          ${this.saved&&!this.dirty?"Settings saved — they're live now.":"You have unsaved changes."}
        </span>
        <button class="btn-primary" ?disabled=${this.saving||!this.dirty} @click=${this.save}>
          <span class="material-symbols-rounded" style="font-size:20px;">save</span>
          ${this.saving?"Saving…":"Save"}
        </button>
      </div>
    `}renderAndroid(){const t=this.apk;return n`
      <section class="card">
        <h3><span class="material-symbols-rounded">android</span>Android app</h3>
        <p class="card-sub">
          Install the companion app straight from this server — no app store, no
          sideloading from a third party.
        </p>

        ${t===null?n`<p class="field-help">Checking…</p>`:t.available?n`
                <div class="field">
                  <div class="field-text">
                    <div class="field-label">oppailib.apk</div>
                    <div class="field-help">
                      ${zt(t.size??0)} · built
                      ${new Date((t.modified??0)*1e3).toLocaleDateString()}
                      ${t.sha256?n`<br /><span style="font-family:monospace; font-size:11px;"
                            >sha256 ${t.sha256.slice(0,16)}…</span
                          >`:d}
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
              `:n`<p class="field-help">
                No APK is bundled with this server build. Drop one at
                <code>/config/oppailib.apk</code>, or grab it from the Actions run that
                built this image.
              </p>`}
      </section>
    `}renderAppearance(){return n`
      <section class="card">
        <h3><span class="material-symbols-rounded">palette</span>Appearance</h3>
        <p class="card-sub">Per-device — applies as soon as you pick it.</p>

        <div class="field">
          <div class="field-text">
            <div class="field-label">Theme</div>
            <div class="field-help">"System" follows your OS light/dark setting.</div>
          </div>
          <div class="field-control seg">
            ${[["dark","Dark","dark_mode"],["light","Light","light_mode"],["system","System","contrast"]].map(([t,e,r])=>n`<button
                class=${this.theme===t?"on":""}
                @click=${()=>this.pickTheme(t)}
              >
                <span class="material-symbols-rounded" style="font-size:18px;">${r}</span>${e}
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
            ${[["page","Fit page","fit_screen"],["width","Fit width","fit_width"]].map(([t,e,r])=>n`<button
                class=${this.fit===t?"on":""}
                @click=${()=>this.pickFit(t)}
              >
                <span class="material-symbols-rounded" style="font-size:18px;">${r}</span>${e}
              </button>`)}
          </div>
        </div>
      </section>
    `}renderAI(){const t=this.settings,e=this.info;return n`
      <section class="card" style="animation-delay:60ms;">
        <h3><span class="material-symbols-rounded">auto_awesome</span>AI auto-tagging</h3>
        <p class="card-sub">
          Tagging runs entirely on this box — no image ever leaves it. The heuristic tagger needs no
          model; a real classifier requires an ONNX build with a model in the model directory.
        </p>

        ${t?n`
              ${this.switchField("Enable auto-tagging","Master switch. Off means no tagging at all, including the ✨ button.",t.aiEnabled,r=>this.edit({aiEnabled:r}))}
              ${this.switchField("Tag on import","Tag new uploads and imports automatically. With this off, tagging only happens when you ask for it.",t.aiAutoTag,r=>this.edit({aiAutoTag:r}),!t.aiEnabled)}

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
                    @input=${r=>this.edit({aiMinScore:Number(r.target.value)})}
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
                    @change=${r=>this.edit({aiMaxTags:Number(r.target.value)})}
                  />
                </div>
              </div>

              ${e?n`
                    ${this.readOnlyField("Active tagger","Chosen at startup.",e.aiTagger)}
                    ${this.readOnlyField("Inference device","OPPAI_AI_DEVICE — needs a restart to change.",e.aiDevice)}
                    ${this.readOnlyField("Model directory","OPPAI_AI_MODEL_DIR — needs a restart to change.",e.aiModelDir)}
                  `:d}
            `:n`<div class="field-help">Loading…</div>`}
      </section>
    `}renderScraping(){const t=this.settings;return n`
      <section class="card" style="animation-delay:120ms;">
        <h3><span class="material-symbols-rounded">travel_explore</span>Import &amp; scraping</h3>
        <p class="card-sub">How OppaiLib behaves toward the sites you import from.</p>

        ${t?n`
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
                    URL of a local Automatic1111 / SD.Next server on your network (the one that
                    exposes <code>/sdapi/v1</code>), e.g. <code>http://192.168.1.10:7860</code>.
                    Set it to turn on the <strong>Create</strong> tab; leave blank to keep it off.
                    Prompts stay on your own hardware — nothing is sent to a cloud service.
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
            `:n`<div class="field-help">Loading…</div>`}
      </section>
    `}renderLibrary(){const t=this.stats;if(!t)return d;const e=new Map(t.kinds.map(r=>[r.kind,r]));return n`
      <section class="card" style="animation-delay:180ms;">
        <h3><span class="material-symbols-rounded">inventory_2</span>Library</h3>
        <p class="card-sub">
          ${t.items} ${t.items===1?"item":"items"} · ${zt(t.bytes)} stored ·
          ${t.tags} ${t.tags===1?"tag":"tags"}
        </p>
        <div class="stat-grid">
          ${Object.keys(j).map(r=>{const i=e.get(r);return n`<div class="stat">
              <div class="stat-num">${(i==null?void 0:i.count)??0}</div>
              <div class="stat-label">${j[r].label} · ${zt((i==null?void 0:i.bytes)??0)}</div>
            </div>`})}
        </div>
      </section>
    `}renderAccount(){var t,e;return n`
      <section class="card" style="animation-delay:240ms;">
        <h3><span class="material-symbols-rounded">account_circle</span>Account</h3>
        <p class="card-sub">
          Signed in as <strong>${(t=this.user)==null?void 0:t.username}</strong>${(e=this.user)!=null&&e.isAdmin?" (admin)":""}.
        </p>

        ${this.pwErr?n`<div class="banner error">
              <span class="material-symbols-rounded" style="font-size:18px;">error</span>${this.pwErr}
            </div>`:d}
        ${this.pwMsg?n`<div class="banner ok">
              <span class="material-symbols-rounded" style="font-size:18px;">check_circle</span>${this.pwMsg}
            </div>`:d}

        <div class="pw">
          <input
            type="password"
            placeholder="Current password"
            autocomplete="current-password"
            .value=${this.pwCurrent}
            @input=${r=>this.pwCurrent=r.target.value}
          />
          <input
            type="password"
            placeholder="New password (8+ characters)"
            autocomplete="new-password"
            .value=${this.pwNew}
            @input=${r=>this.pwNew=r.target.value}
          />
          <input
            type="password"
            placeholder="Confirm new password"
            autocomplete="new-password"
            .value=${this.pwConfirm}
            @input=${r=>this.pwConfirm=r.target.value}
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
    `}renderAbout(){const t=this.info;return t?n`
      <section class="card" style="animation-delay:300ms;">
        <h3><span class="material-symbols-rounded">info</span>About this server</h3>
        <p class="card-sub">Set by environment variables; changing them needs a restart.</p>
        ${this.readOnlyField("Version","The running build.",t.version)}
        ${this.readOnlyField("Video thumbnails","Posters need ffmpeg on the server's PATH.",t.ffmpeg?"ffmpeg available":"ffmpeg missing — posters disabled")}
        ${this.readOnlyField("Media directory","Where encrypted blobs live.",t.mediaDir)}
        ${this.readOnlyField("Database","SQLite metadata store.",t.dbPath)}
        ${this.readOnlyField("Session length","How long a login stays valid.",`${t.sessionHours} hours`)}
      </section>
    `:d}switchField(t,e,r,i,o=!1){const a=!this.canEdit||o;return n`
      <div class="field">
        <div class="field-text">
          <div class="field-label">${t}</div>
          <div class="field-help">${e}</div>
        </div>
        <div class="field-control">
          <button
            class="switch ${r?"on":""}"
            role="switch"
            aria-checked=${r?"true":"false"}
            aria-label=${t}
            ?disabled=${a}
            @click=${()=>i(!r)}
          ></button>
        </div>
      </div>
    `}readOnlyField(t,e,r){return n`
      <div class="field">
        <div class="field-text">
          <div class="field-label">${t}</div>
          <div class="field-help">${e}</div>
        </div>
        <div class="field-control"><span class="ro">${r}</span></div>
      </div>
    `}};F.styles=[Ae,he,y`
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
    `];O([u({attribute:!1})],F.prototype,"user",2);O([p()],F.prototype,"settings",2);O([p()],F.prototype,"info",2);O([p()],F.prototype,"stats",2);O([p()],F.prototype,"apk",2);O([p()],F.prototype,"loadError",2);O([p()],F.prototype,"dirty",2);O([p()],F.prototype,"saving",2);O([p()],F.prototype,"saved",2);O([p()],F.prototype,"theme",2);O([p()],F.prototype,"fit",2);O([p()],F.prototype,"pwCurrent",2);O([p()],F.prototype,"pwNew",2);O([p()],F.prototype,"pwConfirm",2);O([p()],F.prototype,"pwBusy",2);O([p()],F.prototype,"pwMsg",2);O([p()],F.prototype,"pwErr",2);F=O([k("oppai-settings")],F);function zt(t){if(!t)return"0 B";const e=["B","KB","MB","GB","TB"];let r=t,i=0;for(;r>=1024&&i<e.length-1;)r/=1024,i++;return`${r<10&&i>0?r.toFixed(1):Math.round(r)} ${e[i]}`}var vs=Object.defineProperty,fs=Object.getOwnPropertyDescriptor,A=(t,e,r,i)=>{for(var o=i>1?void 0:i?fs(e,r):e,a=t.length-1,s;a>=0;a--)(s=t[a])&&(o=(i?s(e,r,o):s(o))||o);return i&&o&&vs(e,r,o),o};let C=class extends _{constructor(){super(...arguments),this.sources=[],this.sourceId="",this.feedId="",this.container=null,this.sort="",this.query="",this.draft="",this.items=[],this.cursor="",this.loading=!1,this.loadingSources=!0,this.error="",this.active=null,this.pages=[],this.pageAt=0,this.saving=!1,this.toast="",this.commentsFor=null,this.comments=[],this.commentsLoading=!1,this.commentsError="",this.commentQuery="",this.threadQuery="",this.threadDraft="",this.reqId=0,this.leaveContainer=()=>{this.container=null,this.reset()},this.close=()=>{this.active=null,this.pages=[]},this.closeComments=()=>{this.commentsFor=null,this.comments=[],this.commentsError=""}}connectedCallback(){super.connectedCallback(),this.loadSources()}get source(){return this.sources.find(t=>t.id===this.sourceId)}get feed(){var t;return(t=this.source)==null?void 0:t.feeds.find(e=>e.id===this.feedId)}get isSearch(){var t;return!this.container&&((t=this.feed)==null?void 0:t.query)===!0}get activeFeed(){var t;return((t=this.container)==null?void 0:t.feedId)??this.feedId}get isFourChan(){return this.sourceId==="4chan"}async loadSources(){var t;try{const{sources:e}=await g.sources();this.sources=e;const r=e[0];r&&(this.sourceId=r.id,this.feedId=((t=r.feeds[0])==null?void 0:t.id)??"")}catch(e){this.error=e instanceof Error?e.message:"Couldn't reach the server"}finally{this.loadingSources=!1}this.sourceId&&this.load(!0)}async load(t){if(!this.sourceId||!t&&(this.loading||!this.cursor)||this.isSearch&&!this.query)return;const e=++this.reqId;this.loading=!0;try{const r=await g.browseSource(this.sourceId,{feed:this.activeFeed,cursor:t?void 0:this.cursor,q:this.container?void 0:this.query||void 0,sort:this.container?void 0:this.sort||void 0});if(e!==this.reqId)return;this.items=t?r.items:[...this.items,...r.items],this.cursor=r.cursor??"",this.error=""}catch(r){if(e!==this.reqId)return;this.error=r instanceof Error?r.message:"Couldn't load that feed"}finally{e===this.reqId&&(this.loading=!1)}}reset(){this.items=[],this.cursor="",this.error="",this.load(!0)}pickSource(t){var e,r;t!==this.sourceId&&(this.sourceId=t,this.feedId=((r=(e=this.sources.find(i=>i.id===t))==null?void 0:e.feeds[0])==null?void 0:r.id)??"",this.container=null,this.sort="",this.query="",this.draft="",this.reset())}pickFeed(t){var e,r;t===this.feedId&&!this.container||(this.feedId=t,this.container=null,this.sort="",((r=(e=this.source)==null?void 0:e.feeds.find(i=>i.id===t))==null?void 0:r.query)!==!0&&(this.query="",this.draft=""),this.reset())}addThread(t){var c;t.preventDefault();const e=this.threadDraft.trim(),r=e.match(/^(?:https?:\/\/)?(?:boards\.4chan\.org\/)?\/?([a-z0-9]+)\/?$/i);if(r){this.threadDraft="",this.pickFeed(r[1].toLowerCase());return}const i=e.match(/(?:boards\.4chan\.org\/)?([a-z0-9]+)\/(?:thread\/)?(\d+)/i)??e.match(/^\/?([a-z0-9]+):t?(\d+)$/i);if(!i){this.showToast("Enter a board such as /b/, or a 4chan thread URL");return}const o=i[1].toLowerCase(),a=i[2],s=`${o}:t${a}`;(c=this.source)!=null&&c.feeds.some(h=>h.id===o)&&(this.feedId=o),this.threadDraft="",this.openContainer({id:s,title:`/${o}/ thread No.${a}`,kind:"thread",thumbUrl:"",feedId:s,threadId:s})}pickSort(t){t!==this.sort&&(this.sort=t,this.reset())}openContainer(t){this.container=t,this.threadQuery="",this.reset()}submitSearch(t){t.preventDefault(),this.query=this.draft.trim(),this.container=null,this.reset()}async open(t){var e,r;if(this.active=t,this.pages=[],this.pageAt=0,t.kind==="comic")try{const{pages:i}=await g.sourcePages(this.sourceId,t.id);if(((e=this.active)==null?void 0:e.id)!==t.id)return;this.pages=i,this.warmPages(0)}catch(i){if(((r=this.active)==null?void 0:r.id)!==t.id)return;this.error=i instanceof Error?i.message:"Couldn't open that comic",this.active=null}}warmPages(t){for(let e=t;e<Math.min(t+gs,this.pages.length);e++)new Image().src=g.sourceStreamURL(this.pages[e])}goPage(t){const e=Math.min(Math.max(t,0),this.pages.length-1);e!==this.pageAt&&(this.pageAt=e,this.warmPages(e+1))}async openComments(t){var r,i,o;const e=t.threadId;if(e){this.commentsFor=t,this.comments=[],this.commentsError="",this.commentQuery="",this.commentsLoading=!0;try{const{comments:a}=await g.sourceComments(this.sourceId,e);if(((r=this.commentsFor)==null?void 0:r.id)!==t.id)return;this.comments=a}catch(a){if(((i=this.commentsFor)==null?void 0:i.id)!==t.id)return;this.commentsError=a instanceof Error?a.message:"Couldn't load the thread"}finally{((o=this.commentsFor)==null?void 0:o.id)===t.id&&(this.commentsLoading=!1)}}}save(t){if(!t||this.saving)return;const e=t.kind==="comic"||t.kind==="thread";this.saving=!0,ki(t.title||"Source download",async r=>{try{r(.08),await g.saveFromSource(this.sourceId,{itemId:e?t.id:void 0,mediaUrl:e?void 0:t.mediaUrl,pageUrl:t.pageUrl,title:t.title,kind:e?"comic":t.kind}),r(1),this.dispatchEvent(new CustomEvent("imported",{bubbles:!0,composed:!0}))}finally{this.saving=!1}}),this.showToast(t.kind==="thread"?"Downloading thread in background":"Downloading in background")}showToast(t){this.toast=t,setTimeout(()=>{this.toast=""},2600)}renderTile(t,e){const r=t.kind==="thread",i=r?`${t.count??0}`:t.width&&t.height?`${t.width}×${t.height}`:"";return n`
      <button
        class="tile anim-rise"
        style="animation-delay:${Math.min(e,12)*45}ms;"
        @click=${()=>r?this.openContainer(t):this.open(t)}
        title=${t.title}
      >
        <div class="tile-media">
          ${t.thumbUrl?n`<img src=${g.sourceStreamURL(t.thumbUrl)} loading="lazy" alt=${t.title} />`:n`<div class="tile-blank">
                <span class="material-symbols-rounded" style="font-size:36px;">forum</span>
              </div>`}
          ${t.kind==="video"?n`<span class="play material-symbols-rounded" style="font-size:44px;">play_circle</span>`:d}
          ${i?n`<span class="tile-stat">
                ${r?n`<span class="material-symbols-rounded" style="font-size:13px;">image</span>`:d}
                ${i}
              </span>`:d}
        </div>
        <div class="tile-meta">
          <div class="tile-title">${t.title}</div>
          <div class="tile-tag">
            ${r?"Thread":t.kind==="comic"?"Gallery":t.kind}
          </div>
        </div>
      </button>
    `}renderOverlay(t){const e=t.kind==="comic",r=this.pages[this.pageAt];return n`
      <div class="overlay" @click=${i=>{i.target===i.currentTarget&&this.close()}}>
        <div class="obar">
          <button class="obtn" @click=${this.close}>
            <span class="material-symbols-rounded" style="font-size:18px;">arrow_back</span>Back
          </button>
          <span class="t">${t.title}</span>
          ${t.threadId?n`<button class="obtn" @click=${()=>this.openComments(t)}>
                <span class="material-symbols-rounded" style="font-size:18px;">forum</span>Comments
              </button>`:d}
          ${t.pageUrl?n`<a href=${t.pageUrl} target="_blank" rel="noopener noreferrer">
                <button class="obtn">
                  <span class="material-symbols-rounded" style="font-size:18px;">open_in_new</span>Source
                </button>
              </a>`:d}
          <button class="obtn" ?disabled=${this.saving} @click=${()=>this.save(t)}>
            <span class="material-symbols-rounded" style="font-size:18px;">download</span>
            ${this.saving?"Saving…":"Save to library"}
          </button>
        </div>

        <div class="ostage">
          ${e?r?n`<img src=${g.sourceStreamURL(r)} alt="Page ${this.pageAt+1}" />`:n`<md-circular-progress indeterminate></md-circular-progress>`:t.kind==="video"?n`<video
                  src=${g.sourceStreamURL(t.mediaUrl??"")}
                  controls
                  autoplay
                  loop
                  playsinline
                  preload="metadata"
                ></video>`:n`<img src=${g.sourceStreamURL(t.mediaUrl??t.thumbUrl)} alt=${t.title} />`}
        </div>

        ${t.kind==="video"?this.renderUpNext(t):d}

        ${e&&this.pages.length?n`
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
            `:d}
      </div>
    `}renderUpNext(t){const e=this.items.filter(i=>i.kind==="video");if(e.some(i=>i.id===t.id)||e.unshift(t),e.length<2)return d;const r=e.findIndex(i=>i.id===t.id);return n`
      <div class="upnext">
        <div class="upnext-label">Videos</div>
        <div class="strip">
          ${e.map((i,o)=>n`
              <button
                class="strip-item ${i.id===t.id?"on":""}"
                title=${i.title}
                aria-current=${i.id===t.id}
                @click=${()=>this.open(i)}
              >
                <img src=${g.sourceStreamURL(i.thumbUrl)} loading="lazy" alt=${i.title} />
                ${i.kind==="video"?n`<span class="strip-play material-symbols-rounded">play_circle</span>`:d}
                ${o===r+1?n`<span class="strip-next">Next</span>`:d}
              </button>
            `)}
        </div>
      </div>
    `}renderComments(t){const e=t.postNo,r=this.commentQuery.trim().toLowerCase(),i=r?this.comments.filter(o=>[String(o.no),o.name,o.subject,o.text].some(a=>(a??"").toLowerCase().includes(r))):this.comments;return n`
      <div
        class="overlay comments"
        @click=${o=>{o.target===o.currentTarget&&this.closeComments()}}
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
                @input=${o=>this.commentQuery=o.target.value}
              />
            </label>
          </div>

          ${this.commentsLoading?n`<div class="cempty"><md-circular-progress indeterminate></md-circular-progress></div>`:this.commentsError?n`<div class="cempty">${this.commentsError}</div>`:i.length?n`<div class="clist">
                    ${i.map(o=>this.renderComment(o,o.no===e))}
                  </div>`:n`<div class="cempty">${r?"No matching posts.":"No posts in this thread."}</div>`}
        </div>
      </div>
    `}renderComment(t,e){return n`
      <article id=${`post-${t.no}`} class="cpost ${e?"here":""} ${t.op?"op":""}">
        <header class="cmeta">
          ${t.op?n`<span class="cbadge">OP</span>`:d}
          ${e?n`<span class="cbadge here-badge">This file</span>`:d}
          <span class="cname">${t.name||"Anonymous"}</span>
          <span class="cno">No.${t.no}</span>
          <span class="ctime">${bs(t.time)}</span>
        </header>
        ${t.subject?n`<div class="csub">${t.subject}</div>`:d}
        ${this.renderAttachment(t)}
        ${t.text?n`<div class="ctext">${ys(t.text,r=>this.goToPost(r))}</div>`:d}
      </article>
    `}goToPost(t){this.commentQuery="",this.updateComplete.then(()=>{var e;(e=this.renderRoot.querySelector(`#post-${t}`))==null||e.scrollIntoView({behavior:"smooth",block:"center"})})}renderAttachment(t){if(!t.thumbUrl)return d;const e=t.kind==="video";return n`
      <button
        class="cattach"
        title=${e?"Play this video":"Open this file"}
        @click=${()=>this.openAttachment(t)}
      >
        <img class="cthumb" src=${g.sourceStreamURL(t.thumbUrl)} loading="lazy" alt="" />
        ${e?n`<span class="cplay material-symbols-rounded">play_circle</span>`:d}
      </button>
    `}openAttachment(t){var i;const r=(t.itemId?this.items.find(o=>o.id===t.itemId):void 0)??{id:t.itemId??`post-${t.no}`,title:t.subject||`No.${t.no}`,kind:t.kind??"image",thumbUrl:t.thumbUrl??"",mediaUrl:t.mediaUrl,threadId:(i=this.commentsFor)==null?void 0:i.threadId,postNo:t.no};this.closeComments(),this.open(r)}renderContainerHead(t){var e;return n`
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
          ${t.threadId?n`<button class="chip ghost" @click=${()=>this.openComments(t)}>
                <span class="material-symbols-rounded" style="font-size:16px;">forum</span>
                Comments
              </button>`:d}
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
            @input=${r=>this.threadQuery=r.target.value}
          />
        </label>
      </div>
    `}render(){var o,a,s,c,h,v,f;if(this.loadingSources)return n`<div class="empty"><md-circular-progress indeterminate></md-circular-progress></div>`;if(!this.sources.length)return n`<div class="empty">No remote sources are configured.</div>`;const t=((o=this.feed)==null?void 0:o.sorts)??[],e=this.container,r=this.threadQuery.trim().toLowerCase(),i=e&&r?this.items.filter(m=>[m.title,String(m.postNo??""),m.kind].some(b=>b.toLowerCase().includes(r))):this.items;return n`
      ${e?this.renderContainerHead(e):n`
            <div class="head">
              <h2 class="title">${((a=this.source)==null?void 0:a.name)??"Browse"}</h2>
              <span class="count">${this.items.length?`${this.items.length} shown`:""}</span>
            </div>

            ${this.sources.length>1?n`<div class="chips tight">
                  ${this.sources.map(m=>n`<button
                      class="chip"
                      aria-pressed=${m.id===this.sourceId}
                      @click=${()=>this.pickSource(m.id)}
                    >${m.name}</button>`)}
                </div>`:d}

            ${this.isFourChan?n`<div class="thread-tools">
                  <select
                    class="feed-select"
                    aria-label="4chan board"
                    @change=${m=>this.pickFeed(m.target.value)}
                  >
                    ${(((s=this.source)==null?void 0:s.feeds)??[]).map(m=>n`<option value=${m.id} ?selected=${m.id===this.feedId}>${m.label}</option>`)}
					${(c=this.source)!=null&&c.feeds.some(m=>m.id===this.feedId)?d:n`<option value=${this.feedId} selected>/${this.feedId}/ — Custom board</option>`}
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
                </div>`:n`<div class="chips ${this.isSearch?"tight":""}">
                  ${(((h=this.source)==null?void 0:h.feeds)??[]).map(m=>n`<button
                      class="chip"
                      aria-pressed=${m.id===this.feedId}
                      @click=${()=>this.pickFeed(m.id)}
                    >${m.label}</button>`)}
                </div>`}

            ${this.isSearch?n`
                  <form class="searchbar" @submit=${this.submitSearch}>
                    <label class="searchbox">
                      <span class="material-symbols-rounded" style="font-size:20px; color:var(--oppai-text-dim);"
                        >search</span
                      >
                      <input
                        type="search"
                        placeholder="Search ${((v=this.source)==null?void 0:v.name)??""}…"
                        .value=${this.draft}
                        @input=${m=>{this.draft=m.target.value}}
                      />
                    </label>
                    <button class="chip" type="submit">Search</button>
                  </form>
                  ${t.length?n`<div class="chips tight">
                        ${t.map(m=>n`<button
                            class="chip"
                            aria-pressed=${m.id===(this.sort||t[0].id)}
                            @click=${()=>this.pickSort(m.id)}
                          >${m.label}</button>`)}
                      </div>`:d}
                `:d}
          `}

      ${this.error&&!this.items.length?n`<div class="empty">
            <span class="material-symbols-rounded" style="font-size:40px; display:block; margin-bottom:12px;"
              >cloud_off</span
            >
            <div style="font-size:14px;">${this.error}</div>
          </div>`:this.isSearch&&!this.query?n`<div class="empty">
              <span class="material-symbols-rounded" style="font-size:40px; display:block; margin-bottom:12px;"
                >search</span
              >
              <div style="font-size:14px;">Search ${((f=this.source)==null?void 0:f.name)??""} to see results.</div>
            </div>`:this.loading&&!this.items.length?n`<div class="empty"><md-circular-progress indeterminate></md-circular-progress></div>`:i.length?n`
                  <div class="grid">${i.map((m,b)=>this.renderTile(m,b))}</div>
                  ${this.cursor?n`<div class="more">
                        <button class="chip" ?disabled=${this.loading} @click=${()=>this.load(!1)}>
                          ${this.loading?"Loading…":"Load more"}
                        </button>
                      </div>`:d}
                `:n`<div class="empty">
                  <span class="material-symbols-rounded" style="font-size:40px; display:block; margin-bottom:12px;"
                    >search_off</span
                  >
                  <div style="font-size:14px;">
                    ${e?r?n`Nothing in this thread matched “${this.threadQuery.trim()}”.`:"Nothing left in this thread — it may have 404'd.":this.query?n`Nothing matched “${this.query}”.`:"Nothing on this feed."}
                  </div>
                </div>`}

      ${this.active?this.renderOverlay(this.active):d}
      ${this.commentsFor?this.renderComments(this.commentsFor):d}
      ${this.toast?n`<div class="toast">${this.toast}</div>`:d}
    `}};C.styles=[Ae,he,y`
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
    `];A([p()],C.prototype,"sources",2);A([p()],C.prototype,"sourceId",2);A([p()],C.prototype,"feedId",2);A([p()],C.prototype,"container",2);A([p()],C.prototype,"sort",2);A([p()],C.prototype,"query",2);A([p()],C.prototype,"draft",2);A([p()],C.prototype,"items",2);A([p()],C.prototype,"cursor",2);A([p()],C.prototype,"loading",2);A([p()],C.prototype,"loadingSources",2);A([p()],C.prototype,"error",2);A([p()],C.prototype,"active",2);A([p()],C.prototype,"pages",2);A([p()],C.prototype,"pageAt",2);A([p()],C.prototype,"saving",2);A([p()],C.prototype,"toast",2);A([p()],C.prototype,"commentsFor",2);A([p()],C.prototype,"comments",2);A([p()],C.prototype,"commentsLoading",2);A([p()],C.prototype,"commentsError",2);A([p()],C.prototype,"commentQuery",2);A([p()],C.prototype,"threadQuery",2);A([p()],C.prototype,"threadDraft",2);C=A([k("oppai-browse")],C);const gs=3;function bs(t){return t?new Date(t*1e3).toLocaleString(void 0,{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"}):""}function ys(t,e){return t.split(`
`).map(r=>{const i=!/^>>\d+/.test(r)&&r.startsWith(">"),o=r.split(/(>>\d+)/g);return n`<div class=${i?"cgreen":""}>${o.map(a=>{const s=a.match(/^>>(\d+)$/);return s?n`<button class="cquote" @click=${()=>e(Number(s[1]))}>${a}</button>`:a})}</div>`})}var xs=Object.defineProperty,ws=Object.getOwnPropertyDescriptor,S=(t,e,r,i)=>{for(var o=i>1?void 0:i?ws(e,r):e,a=t.length-1,s;a>=0;a--)(s=t[a])&&(o=(i?s(e,r,o):s(o))||o);return i&&o&&xs(e,r,o),o};function Vr(){const t=window;return t.SpeechRecognition??t.webkitSpeechRecognition??null}const At=[{id:"portrait",label:"Portrait",w:512,h:768},{id:"square",label:"Square",w:640,h:640},{id:"landscape",label:"Landscape",w:768,h:512}];let T=class extends _{constructor(){super(...arguments),this.status=null,this.checkpoint="",this.selectedLoras={},this.characters=[],this.selectedCharacters=new Set,this.newCharacterName="",this.analyzingCharacter=!1,this.tagSuggestions=[],this.speech="",this.listening=!1,this.optimizing=!1,this.prompt="",this.negative="",this.showAdvanced=!1,this.sizeId="portrait",this.steps=25,this.cfg=7,this.count=1,this.seed=-1,this.generating=!1,this.shots=[],this.error="",this.toast="",this.thumbVersion=0,this.recognition=null}connectedCallback(){super.connectedCallback(),this.loadStatus(),this.loadCharacters()}async loadCharacters(){try{this.characters=(await g.characters()).characters}catch{this.characters=[]}}disconnectedCallback(){super.disconnectedCallback(),this.stopListening()}async loadStatus(){this.status=null,this.error="";try{const t=await g.imageGenStatus();this.status=t,!this.checkpoint&&t.models&&t.models.length&&(this.checkpoint=t.models[0].title)}catch(t){this.status={enabled:!0,reachable:!1,error:t.message}}}get speechSupported(){return Vr()!=null}toggleListening(){if(this.listening){this.stopListening();return}const t=Vr();if(!t)return;const e=new t;e.lang=navigator.language||"en-US",e.continuous=!1,e.interimResults=!0,e.onresult=r=>{let i="";for(let o=0;o<r.results.length;o++)i+=r.results[o][0].transcript;this.speech=i},e.onerror=r=>{this.error=r.error==="not-allowed"?"Microphone permission was denied.":`Speech error: ${r.error}`,this.stopListening()},e.onend=()=>{this.listening=!1,this.speech.trim()&&this.optimize(this.speech)},this.recognition=e,this.listening=!0,this.error="";try{e.start()}catch{this.listening=!1}}stopListening(){if(this.listening=!1,this.recognition){try{this.recognition.stop()}catch{}this.recognition=null}}async optimize(t){this.optimizing=!0;try{const{prompt:e,negativePrompt:r}=await g.optimizePrompt(t);this.prompt=e,this.negative||(this.negative=r)}catch(e){this.error=e.message}finally{this.optimizing=!1}}async generate(){if(this.generating||!this.prompt.trim())return;const t=At.find(e=>e.id===this.sizeId)??At[0];this.generating=!0,this.error="";try{const e=this.characters.filter(o=>this.selectedCharacters.has(o.id)).flatMap(o=>o.tags),r=[...new Set([this.prompt.trim(),...e].filter(Boolean))].join(", "),i=await g.generate({prompt:r,negativePrompt:this.negative.trim()||void 0,checkpoint:this.checkpoint||void 0,steps:this.steps,width:t.w,height:t.h,cfgScale:this.cfg,count:this.count,seed:this.seed,loras:Object.entries(this.selectedLoras).map(([o,a])=>({name:o,weight:a}))});this.shots=[...i.images.map(o=>({...o,saved:!1})),...this.shots]}catch(e){this.error=e.message}finally{this.generating=!1}}async save(t){if(!t.saved)try{const e=this.prompt.trim().slice(0,80)||"Generated image";await g.saveGenerated({id:t.id,title:e}),this.shots=this.shots.map(r=>r.id===t.id?{...r,saved:!0}:r),this.showToast("Saved to library"),this.dispatchEvent(new CustomEvent("imported",{bubbles:!0,composed:!0}))}catch(e){this.showToast(e.message)}}async useAsModelThumb(t){if(!this.checkpoint){this.showToast("Pick a model first");return}try{await g.setModelThumb({model:this.checkpoint,previewId:t.id}),this.thumbVersion++,this.showToast("Set as model preview")}catch(e){this.showToast(e.message)}}onUploadThumb(t,e){var a;const r=e.target,i=(a=r.files)==null?void 0:a[0];if(r.value="",!i)return;const o=new FileReader;o.onload=async()=>{try{await g.setModelThumb({model:t,imageData:String(o.result)}),this.thumbVersion++,this.showToast("Model preview updated")}catch(s){this.showToast(s.message)}},o.readAsDataURL(i)}onUploadLoraThumb(t,e){var a;const r=e.target,i=(a=r.files)==null?void 0:a[0];if(r.value="",!i)return;const o=new FileReader;o.onload=async()=>{try{await g.setLoraThumb({model:t,imageData:String(o.result)}),this.thumbVersion++,this.showToast("LoRA preview updated")}catch(s){this.showToast(s.message)}},o.readAsDataURL(i)}toggleLora(t){const e={...this.selectedLoras};t in e?delete e[t]:e[t]=1,this.selectedLoras=e}toggleCharacter(t){const e=new Set(this.selectedCharacters);e.has(t)?e.delete(t):e.add(t),this.selectedCharacters=e}async onCharacterPicture(t){var o;const e=t.target,r=(o=e.files)==null?void 0:o[0];e.value="";const i=this.newCharacterName.trim();if(!(!r||!i||this.analyzingCharacter)){this.analyzingCharacter=!0;try{const a=await g.createCharacter(i,r);this.characters=[a,...this.characters],this.selectedCharacters=new Set([...this.selectedCharacters,a.id]),this.newCharacterName="",this.showToast(a.tags.length?`Character created with ${a.tags.length} appearance tags`:"Character created; the active tagger found no appearance tags")}catch(a){this.showToast(a.message)}finally{this.analyzingCharacter=!1}}}currentTagFragment(){var t;return((t=this.prompt.split(",").at(-1))==null?void 0:t.trim())??""}async suggestTags(){const t=this.currentTagFragment();if(t.length<2||t.startsWith("<lora:")){this.tagSuggestions=[];return}try{this.tagSuggestions=(await g.booruTags(t)).suggestions}catch{this.tagSuggestions=[]}}applyTag(t){const e=this.prompt.split(",");e[e.length-1]=` ${t}`,this.prompt=e.join(",").replace(/^\s+/,""),this.tagSuggestions=[]}async correctLastTag(){const t=this.currentTagFragment();if(!(t.length<3||t.startsWith("<lora:")))try{const e=await g.booruTags(t);e.correction&&this.applyTag(e.correction)}catch{}}showToast(t){this.toast=t,setTimeout(()=>this.toast="",2600)}render(){return n`<div class="wrap">${this.renderBody()}</div>
      ${this.toast?n`<div class="toast">${this.toast}</div>`:d}`}renderBody(){const t=this.status;return t===null?n`<div class="empty"><md-circular-progress indeterminate></md-circular-progress></div>`:t.enabled?t.reachable?n`
      ${this.renderModels(t.models??[])}
      ${this.renderLoras(t.loras??[],t.loraError)}
      ${this.renderCharacters()}
      ${this.renderPrompt()}
      ${this.error?n`<div class="banner">${this.error}</div>`:d}
      ${this.renderResults()}
    `:n`<div class="empty">
        <span class="material-symbols-rounded">cloud_off</span>
        <div style="font-size:15px; margin-bottom:6px;">Can't reach the image generator.</div>
        <div style="font-size:13px; margin-bottom:14px;">${t.error??"It didn't answer."}</div>
        <button class="chip" @click=${()=>this.loadStatus()}>Retry</button>
      </div>`:n`<div class="empty">
        <span class="material-symbols-rounded">auto_awesome</span>
        <div style="font-size:15px; margin-bottom:6px;">Image generation isn't set up yet.</div>
        <div style="font-size:13px;">
          Add the URL of your local Automatic1111 / SD.Next server under
          <strong>Settings → Image generation</strong>, then come back here.
        </div>
      </div>`}renderModels(t){return t.length?n`
      <div class="section-label">Model</div>
      <div class="models">
        ${t.map(e=>{const r=e.title===this.checkpoint,i=`${g.modelThumbURL(e.title)}&v=${this.thumbVersion}`;return n`
            <div class="model-wrap">
              <button
                class="model ${r?"on":""}"
                title=${e.title}
                @click=${()=>this.checkpoint=e.title}
              >
                <img
                  class="model-art"
                  src=${i}
                  alt=${e.model_name}
                  @error=${o=>o.target.style.visibility="hidden"}
                />
                <div class="model-name">${e.model_name}</div>
              </button>
              <label class="model-edit" title="Upload a preview for this model">
                <span class="material-symbols-rounded" style="font-size:15px;">photo_camera</span>
                <input
                  class="hidden-file"
                  type="file"
                  accept="image/*"
                  @change=${o=>this.onUploadThumb(e.title,o)}
                />
              </label>
            </div>
          `})}
      </div>
    `:n`<div class="banner">
        Connected, but the generator lists no checkpoints. Add a model to it and hit Retry.
      </div>`}renderLoras(t,e){return t.length?n`
      <div class="section-label">LoRAs</div>
      <div class="models">
        ${t.map(r=>{const i=r.name in this.selectedLoras,o=`${g.loraThumbURL(r.name)}&v=${this.thumbVersion}`;return n`
            <div class="model-wrap">
              <button class="model ${i?"on":""}" title=${r.name} @click=${()=>this.toggleLora(r.name)}>
                <img class="model-art" src=${o} alt=${r.alias||r.name}
                  @error=${a=>a.target.style.visibility="hidden"} />
                <div class="model-name">${r.alias||r.name}</div>
              </button>
              <label class="model-edit" title="Upload a preview for this LoRA">
                <span class="material-symbols-rounded" style="font-size:15px;">photo_camera</span>
                <input class="hidden-file" type="file" accept="image/*"
                  @change=${a=>this.onUploadLoraThumb(r.name,a)} />
              </label>
              ${i?n`<input class="lora-weight" type="number" min="-2" max="2" step="0.05"
                aria-label=${`${r.alias||r.name} weight`}
                .value=${String(this.selectedLoras[r.name])}
                @input=${a=>{const s=Number(a.target.value);this.selectedLoras={...this.selectedLoras,[r.name]:Number.isFinite(s)?Math.max(-2,Math.min(2,s)):1}}} />`:d}
            </div>
          `})}
      </div>
    `:e?n`<div class="banner">LoRAs aren't available from this generator: ${e}</div>`:d}renderCharacters(){return n`
      <div class="section-label">Characters</div>
      <div class="models">
        ${this.characters.map(t=>n`
          <div class="model-wrap">
            <button class="model ${this.selectedCharacters.has(t.id)?"on":""}"
              @click=${()=>this.toggleCharacter(t.id)} title=${t.tags.join(", ")}>
              <img class="model-art" src=${g.characterImageURL(t.id)} alt=${t.name} />
              <div class="model-name">${t.name}</div>
              <div class="character-tags">${t.tags.join(", ")||"No appearance tags"}</div>
            </button>
          </div>`)}
        <div class="character-add">
          <input type="text" placeholder="Character name" .value=${this.newCharacterName}
            @input=${t=>this.newCharacterName=t.target.value} />
          <label class="chip">
            ${this.analyzingCharacter?"Analyzing locally…":"Upload reference picture"}
            <input class="hidden-file" type="file" accept="image/*"
              ?disabled=${!this.newCharacterName.trim()||this.analyzingCharacter}
              @change=${t=>this.onCharacterPicture(t)} />
          </label>
          <small>Only appearance tags are kept; scene objects and actions are ignored.</small>
        </div>
      </div>`}renderPrompt(){return n`
      <div class="section-label">Prompt</div>
      <div class="prompt-card">
        <div class="speech-row">
          ${this.speechSupported?n`<button
                class="mic ${this.listening?"live":""}"
                title=${this.listening?"Stop":"Speak your idea"}
                @click=${()=>this.toggleListening()}
              >
                <span class="material-symbols-rounded">${this.listening?"stop":"mic"}</span>
              </button>`:d}
          <div class="speech-hint">
            ${this.listening?this.speech||"Listening…":this.optimizing?"Turning that into a prompt…":this.speechSupported?"Tap the mic and describe the image, or type below.":"Type a prompt below. (Speech isn't supported in this browser.)"}
          </div>
        </div>

        <div>
          <label class="field">Prompt</label>
          <textarea
            .value=${this.prompt}
            placeholder="masterpiece, best quality, …"
            @input=${t=>{this.prompt=t.target.value,this.suggestTags()}}
            @blur=${()=>void this.correctLastTag()}
          ></textarea>
          ${this.tagSuggestions.length?n`<div class="tag-suggestions" aria-label="Booru tag suggestions">
            ${this.tagSuggestions.map(t=>n`<button @mousedown=${e=>e.preventDefault()}
              @click=${()=>this.applyTag(t)}>${t}</button>`)}
          </div>`:d}
        </div>

        <button class="adv-toggle" @click=${()=>this.showAdvanced=!this.showAdvanced}>
          <span class="material-symbols-rounded" style="font-size:18px;"
            >${this.showAdvanced?"expand_less":"tune"}</span
          >
          ${this.showAdvanced?"Hide options":"Options"}
        </button>

        ${this.showAdvanced?this.renderAdvanced():d}
      </div>

      <button class="generate" ?disabled=${this.generating||!this.prompt.trim()} @click=${()=>this.generate()}>
        ${this.generating?n`<md-circular-progress indeterminate style="--md-circular-progress-size:22px;"></md-circular-progress> Generating…`:n`<span class="material-symbols-rounded">auto_awesome</span> Generate`}
      </button>
    `}renderAdvanced(){return n`
      <div>
        <label class="field">Negative prompt</label>
        <textarea
          .value=${this.negative}
          placeholder="lowres, bad anatomy, …"
          @input=${t=>this.negative=t.target.value}
        ></textarea>
      </div>
      <div>
        <label class="field">Shape</label>
        <div class="chips">
          ${At.map(t=>n`<button
              class="chip ${t.id===this.sizeId?"on":""}"
              @click=${()=>this.sizeId=t.id}
            >${t.label}</button>`)}
        </div>
      </div>
      <div class="adv">
        <div>
          <label class="field">Steps</label>
          <input
            class="num"
            type="number"
            min="1"
            max="80"
            .value=${String(this.steps)}
            @input=${t=>this.steps=ot(t.target.value,1,80,25)}
          />
        </div>
        <div>
          <label class="field">CFG scale</label>
          <input
            class="num"
            type="number"
            min="1"
            max="30"
            step="0.5"
            .value=${String(this.cfg)}
            @input=${t=>this.cfg=ot(t.target.value,1,30,7)}
          />
        </div>
        <div>
          <label class="field">Count</label>
          <input
            class="num"
            type="number"
            min="1"
            max="8"
            .value=${String(this.count)}
            @input=${t=>this.count=ot(t.target.value,1,8,1)}
          />
        </div>
        <div>
          <label class="field">Seed (-1 random)</label>
          <input
            class="num"
            type="number"
            .value=${String(this.seed)}
            @input=${t=>this.seed=ot(t.target.value,-1,2**31,-1)}
          />
        </div>
      </div>
    `}renderResults(){return this.shots.length?n`
      <div class="section-label">Results</div>
      <div class="results">
        ${this.shots.map(t=>n`
            <div class="shot">
              <img src=${g.genPreviewURL(t.id)} alt="Generated image" loading="lazy" />
              <div class="shot-actions">
                <button class="act primary" ?disabled=${t.saved} @click=${()=>this.save(t)}>
                  <span class="material-symbols-rounded" style="font-size:16px;"
                    >${t.saved?"check":"save"}</span
                  >
                  ${t.saved?"Saved":"Save"}
                </button>
                <button class="act" title="Use as this model's preview" @click=${()=>this.useAsModelThumb(t)}>
                  <span class="material-symbols-rounded" style="font-size:16px;">photo_camera</span>
                </button>
              </div>
            </div>
          `)}
      </div>
      <div class="banner">
        Generated images live only here until you Save one — leaving this page drops the rest.
      </div>
    `:d}};T.styles=[Ae,he,y`
      :host {
        display: block;
        color: var(--oppai-text);
      }
      .wrap {
        max-width: 1000px;
        margin: 0 auto;
        padding-bottom: 40px;
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
      .section-label {
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 0.4px;
        text-transform: uppercase;
        color: var(--oppai-text-muted);
        margin: 22px 0 10px;
      }

      /* Model picker — a strip of checkpoint cards with their previews. */
      .models {
        display: flex;
        gap: 12px;
        overflow-x: auto;
        padding-bottom: 8px;
        scrollbar-width: thin;
      }
      .model-wrap {
        position: relative;
        flex: 0 0 auto;
        width: 116px;
      }
      .model {
        width: 100%;
        border: 2px solid transparent;
        border-radius: 14px;
        overflow: hidden;
        background: var(--oppai-surface-2);
        cursor: pointer;
        padding: 0;
        text-align: left;
        transition: transform 0.18s var(--oppai-ease-spring), border-color 0.18s ease;
      }
      .model:hover {
        transform: translateY(-2px);
      }
      .model.on {
        border-color: var(--oppai-accent);
      }
      .model-art {
        width: 100%;
        aspect-ratio: 3 / 4;
        object-fit: cover;
        display: block;
        background: var(--oppai-surface-3, var(--oppai-surface-2));
      }
      .model-blank {
        width: 100%;
        aspect-ratio: 3 / 4;
        display: grid;
        place-items: center;
        color: var(--oppai-text-muted);
      }
      .model-name {
        font-size: 11px;
        padding: 6px 8px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .model-edit {
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
      .character-add { width:180px; display:flex; flex-direction:column; gap:7px; flex:0 0 auto; }
      .character-add input[type="text"] { width:100%; box-sizing:border-box; padding:9px; border-radius:9px;
        border:1px solid var(--oppai-border-strong); background:var(--oppai-surface); color:var(--oppai-text); }
      .character-tags { font-size:10px; color:var(--oppai-text-muted); padding:0 7px 7px; max-height:32px; overflow:hidden; }
      .tag-suggestions { display:flex; flex-wrap:wrap; gap:6px; margin-top:8px; }
      .tag-suggestions button { border:1px solid var(--oppai-border); border-radius:999px; padding:5px 9px;
        color:var(--oppai-text-dim); background:var(--oppai-surface); cursor:pointer; }

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
      label.field {
        font-size: 12px;
        font-weight: 600;
        color: var(--oppai-text-dim);
        display: block;
        margin-bottom: 6px;
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
      .adv {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 12px;
      }
      .chips {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }
      .chip {
        height: 34px;
        padding: 0 14px;
        border-radius: 17px;
        font-size: 13px;
        font-family: inherit;
        cursor: pointer;
        background: transparent;
        color: var(--oppai-text-dim);
        border: 1px solid var(--oppai-border-strong);
      }
      .chip.on {
        background: var(--oppai-accent);
        color: var(--oppai-on-accent);
        border-color: var(--oppai-accent);
      }
      .num {
        width: 100%;
        box-sizing: border-box;
        background: var(--oppai-surface);
        border: 1px solid var(--oppai-border-strong);
        border-radius: 10px;
        color: var(--oppai-text);
        font: inherit;
        padding: 8px 10px;
        outline: none;
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
    `];S([p()],T.prototype,"status",2);S([p()],T.prototype,"checkpoint",2);S([p()],T.prototype,"selectedLoras",2);S([p()],T.prototype,"characters",2);S([p()],T.prototype,"selectedCharacters",2);S([p()],T.prototype,"newCharacterName",2);S([p()],T.prototype,"analyzingCharacter",2);S([p()],T.prototype,"tagSuggestions",2);S([p()],T.prototype,"speech",2);S([p()],T.prototype,"listening",2);S([p()],T.prototype,"optimizing",2);S([p()],T.prototype,"prompt",2);S([p()],T.prototype,"negative",2);S([p()],T.prototype,"showAdvanced",2);S([p()],T.prototype,"sizeId",2);S([p()],T.prototype,"steps",2);S([p()],T.prototype,"cfg",2);S([p()],T.prototype,"count",2);S([p()],T.prototype,"seed",2);S([p()],T.prototype,"generating",2);S([p()],T.prototype,"shots",2);S([p()],T.prototype,"error",2);S([p()],T.prototype,"toast",2);S([p()],T.prototype,"thumbVersion",2);T=S([k("oppai-imagegen")],T);function ot(t,e,r,i){const o=Number(t);return Number.isFinite(o)?Math.min(r,Math.max(e,Math.round(o))):i}var _s=Object.defineProperty,$s=Object.getOwnPropertyDescriptor,Q=(t,e,r,i)=>{for(var o=i>1?void 0:i?$s(e,r):e,a=t.length-1,s;a>=0;a--)(s=t[a])&&(o=(i?s(e,r,o):s(o))||o);return i&&o&&_s(e,r,o),o};const ks=[{id:"sweet",label:"Sweet",reaction:"/mascot-happy.png"},{id:"playful",label:"Playful",reaction:"/mascot-mischievous.png"},{id:"bold",label:"Bold",reaction:"/mascot-surprised.png"},{id:"roleplay",label:"Roleplay",reaction:"/mascot-thinking.png"}];let K=class extends _{constructor(){super(...arguments),this.status=null,this.mode="sweet",this.emotion="happy",this.intensity=1,this.outfit="default",this.messages=[],this.draft="",this.busy=!1,this.error=""}connectedCallback(){super.connectedCallback(),this.load()}async load(){try{this.status=await g.chatStatus()}catch(t){this.error=t.message}}setMode(t){this.mode=t}onKey(t){t.key==="Enter"&&!t.shiftKey&&(t.preventDefault(),this.send())}async send(){var r,i;const t=this.draft.trim();if(!t||this.busy||!((r=this.status)!=null&&r.enabled))return;const e=[...this.messages,{role:"user",content:t}];this.messages=e,this.draft="",this.busy=!0,this.error="";try{const o=await g.chat(this.mode,e,this.emotion,this.intensity);this.emotion=Te(o.emotion??this.emotion),this.intensity=Ne(o.intensity??this.intensity),this.messages=[...e,{role:"assistant",content:o.message}],await this.updateComplete,(i=this.renderRoot.querySelector(".messages"))==null||i.scrollTo({top:1e9,behavior:"smooth"})}catch(o){this.error=o.message}finally{this.busy=!1}}render(){var e,r,i,o,a;const t=wr(this.emotion,this.intensity,this.outfit);return n`<div class="layout">
      <aside class="libby"><div><div class="name">Libby</div>
        <div class="model">${(e=this.status)!=null&&e.enabled?this.status.model:"Local LLM not configured"}</div>
        <div class="modes">${ks.map(s=>n`<button class="mode ${s.id===this.mode?"on":""}"
          @click=${()=>this.setMode(s.id)}>${s.label}</button>`)}</div></div>
        <div class="emotion-row">
          <label>Emotion</label>
          <select .value=${this.emotion} @change=${s=>this.emotion=Te(s.target.value)}>
            ${wi.map(s=>n`<option value=${s}>${s==="horniness"?"Horniness":s[0].toUpperCase()+s.slice(1)}</option>`)}
          </select>
          <label>Intensity ${this.intensity}/5</label>
          <input type="range" min="1" max="5" .value=${String(this.intensity)}
            @input=${s=>this.intensity=Ne(Number(s.target.value))} />
          <label>Outfit</label>
          <select .value=${this.outfit} @change=${s=>this.outfit=s.target.value}>
            ${["default","casual","sleepwear","beach"].map(s=>n`<option value=${s}>${s[0].toUpperCase()+s.slice(1)}</option>`)}
          </select>
        </div>
        <img src=${t[0]} data-fallback-index="0" alt=${`Libby feeling ${this.emotion}`}
          @error=${s=>_r(s.target,t)} />
      </aside>
      <section class="chat"><div class="messages">
        ${(r=this.status)!=null&&r.enabled?d:n`<div class="empty">Configure a local OpenAI-compatible URL and model in Settings to chat with Libby.</div>`}
        ${(i=this.status)!=null&&i.enabled&&!this.messages.length?n`<div class="empty">Libby is ready. Pick a mode and say what’s on your mind.</div>`:d}
        ${this.messages.map(s=>n`<div class="bubble ${s.role}">${s.content}</div>`)}
        ${this.busy?n`<div class="bubble assistant">Libby is thinking…</div>`:d}
      </div>${this.error?n`<div class="error">${this.error}</div>`:d}
      <form @submit=${s=>{s.preventDefault(),this.send()}}>
        <textarea placeholder="Message Libby…" .value=${this.draft} ?disabled=${!((o=this.status)!=null&&o.enabled)||this.busy}
          @input=${s=>this.draft=s.target.value} @keydown=${this.onKey}></textarea>
        <button class="send" title="Send" ?disabled=${!this.draft.trim()||this.busy||!((a=this.status)!=null&&a.enabled)}>
          <span class="material-symbols-rounded">send</span></button>
      </form></section>
    </div>`}};K.styles=[Ae,he,y`
    :host { display:block; height:100%; }
    .layout { max-width:920px; height:calc(100vh - 120px); margin:auto; display:grid;
      grid-template-columns:230px 1fr; gap:18px; }
    .libby, .chat { background:var(--oppai-surface); border:1px solid var(--oppai-border);
      border-radius:20px; overflow:hidden; }
    .libby { display:flex; flex-direction:column; padding:18px; }
    .libby img { width:100%; min-height:0; flex:1; object-fit:contain; object-position:bottom; }
    .name { font-size:20px; font-weight:650; }
    .model { font-size:12px; color:var(--oppai-text-muted); margin-top:3px; overflow:hidden; text-overflow:ellipsis; }
    .emotion-row { display:grid; gap:5px; margin-top:12px; }
    select, input[type="range"] { width:100%; box-sizing:border-box; accent-color:var(--oppai-primary); }
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
  `];Q([p()],K.prototype,"status",2);Q([p()],K.prototype,"mode",2);Q([p()],K.prototype,"emotion",2);Q([p()],K.prototype,"intensity",2);Q([p()],K.prototype,"outfit",2);Q([p()],K.prototype,"messages",2);Q([p()],K.prototype,"draft",2);Q([p()],K.prototype,"busy",2);Q([p()],K.prototype,"error",2);K=Q([k("oppai-chat")],K);var Cs=Object.defineProperty,Ts=Object.getOwnPropertyDescriptor,B=(t,e,r,i)=>{for(var o=i>1?void 0:i?Ts(e,r):e,a=t.length-1,s;a>=0;a--)(s=t[a])&&(o=(i?s(e,r,o):s(o))||o);return i&&o&&Cs(e,r,o),o};const zs=[{id:"home",label:"Home",icon:"home"},...Be.map(t=>({id:t,label:j[t].label,icon:j[t].icon})),{id:"favorites",label:"Favorites",icon:"favorite"},{id:"browse",label:"Browse",icon:"explore"},{id:"imagegen",label:"Create",icon:"auto_awesome"},{id:"chat",label:"Chat",icon:"chat_bubble"}];function As(t){const e=(t.tags??[]).flatMap(r=>[r.name,r.category]);return[t.title,t.notes??"",...e].join(`
`).toLowerCase()}function Ss(t,e){if(e.length===0)return!0;const r=As(t);return e.every(i=>r.includes(i))}let P=class extends _{constructor(){super(...arguments),this.items=[],this.loading=!1,this.section="home",this.selectedId=null,this.search="",this.filters={},this.favorites=ss(),this.uploadOpen=!1,this.dragActive=!1,this.selectMode=!1,this.selected=new Set,this.busy=!1,this.downloads=rs(),this.viewerList=[],this.onDownloads=t=>{this.downloads=t.detail},this.onDownloadComplete=()=>this.refresh(),this.onKey=t=>{var r;if(this.selectedId==null||this.uploadOpen||Ci(t))return;const e=((r=this.items.find(i=>i.id===this.selectedId))==null?void 0:r.kind)==="comic";switch(t.key){case"ArrowRight":if(e)return;t.preventDefault(),this.stepItem(1);break;case"ArrowLeft":if(e)return;t.preventDefault(),this.stepItem(-1);break;case"Escape":this.closeItem();break}},this.stepItem=t=>{if(this.selectedId==null)return;const e=this.viewerList.indexOf(this.selectedId);if(e<0)return;const r=e+t;r<0||r>=this.viewerList.length||(this.selectedId=this.viewerList[r])},this.closeItem=()=>{this.selectedId=null},this.toggleSelectMode=()=>{this.selectMode=!this.selectMode,this.selectMode||(this.selected=new Set)},this.toggleUpload=()=>{this.uploadOpen=!this.uploadOpen,this.dragActive=!1}}connectedCallback(){super.connectedCallback(),this.refresh(),window.addEventListener("keydown",this.onKey),window.addEventListener("oppai-downloads",this.onDownloads),window.addEventListener("oppai-download-complete",this.onDownloadComplete)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this.onKey),window.removeEventListener("oppai-downloads",this.onDownloads),window.removeEventListener("oppai-download-complete",this.onDownloadComplete)}async refresh(){this.loading=!0;try{const e=[];for(let r=0;;r+=200){const o=(await g.listMedia("",200,r)).items??[];if(e.push(...o),o.length<200)break}this.items=e}finally{this.loading=!1}}selectSection(t){this.section=t,this.selectedId=null,this.search=""}openItem(t,e){e&&e.length?this.viewerList=e.map(r=>r.id):this.viewerList.includes(t)||(this.viewerList=[t]),this.selectedId=t}onSearchInput(t){this.search=t.target.value,this.selectedId=null}clearSearch(){this.search=""}setFilter(t,e){this.filters={...this.filters,[t]:e}}toggleFavorite(t,e){e==null||e.stopPropagation();const r=new Set(this.favorites);r.has(t)?r.delete(t):r.add(t),this.favorites=r,Tt(r)}exitSelect(){this.selectMode=!1,this.selected=new Set}toggleSelected(t,e){e==null||e.stopPropagation();const r=new Set(this.selected);r.has(t)?r.delete(t):r.add(t),this.selected=r}async bulkDelete(){const t=[...this.selected];if(t.length&&confirm(`Delete ${t.length} item${t.length===1?"":"s"}? This cannot be undone.`)){this.busy=!0;try{await g.bulkMedia("delete",t);const e=new Set(this.favorites);t.forEach(r=>e.delete(r)),this.favorites=e,Tt(e),this.exitSelect(),await this.refresh()}catch(e){console.error("bulk delete",e)}finally{this.busy=!1}}}async bulkTags(t){const e=[...this.selected];if(!e.length)return;const r=prompt(t==="add"?"Add tags (comma-separated):":"Remove tags (comma-separated):");if(r==null)return;const i=r.split(",").map(o=>o.trim()).filter(Boolean);if(i.length){this.busy=!0;try{await g.bulkMedia("update",e,t==="add"?{addTags:i}:{removeTags:i}),await this.refresh()}catch(o){console.error("bulk tags",o)}finally{this.busy=!1}}}async bulkChangeKind(){const t=[...this.selected];if(!t.length)return;const e=prompt("Change type to (video, gif, image, comic, game):");if(e==null)return;const r=e.trim().toLowerCase();if(!Be.includes(r)){alert(`Unknown type "${r}".`);return}this.busy=!0;try{await g.bulkMedia("update",t,{kind:r}),this.exitSelect(),await this.refresh()}catch(i){console.error("bulk kind",i)}finally{this.busy=!1}}bulkFavorite(){const t=new Set(this.favorites);this.selected.forEach(e=>t.add(e)),this.favorites=t,Tt(t),this.exitSelect()}logout(){this.dispatchEvent(new CustomEvent("logout",{bubbles:!0,composed:!0}))}browse(){var t;(t=this.renderRoot.querySelector("#file"))==null||t.click()}async onFiles(t){const e=Array.from(t);if(e.length){this.uploadOpen=!1;for(const r of e)try{await g.upload(r)}catch(i){console.error("upload",i)}this.refresh()}}onFileInput(t){const e=t.target;e.files&&this.onFiles(e.files),e.value=""}onDrop(t){var e,r;t.preventDefault(),this.dragActive=!1,(r=(e=t.dataTransfer)==null?void 0:e.files)!=null&&r.length&&this.onFiles(t.dataTransfer.files)}openScrape(){var t;this.uploadOpen=!1,(t=this.renderRoot.querySelector("oppai-scrape-dialog"))==null||t.open()}itemsForKind(t){return this.items.filter(e=>e.kind===t)}get viewerQueue(){return this.viewerList.map(t=>this.items.find(e=>e.id===t)).filter(t=>t!=null)}render(){var b;const t=this.search.trim().length>0,e=this.selectedId!=null,r=!e&&this.section==="settings"&&!t,i=!e&&this.section==="browse"&&!t,o=!e&&this.section==="imagegen"&&!t,a=!e&&this.section==="chat"&&!t,s=!e&&this.section==="favorites"&&!t,c=!e&&this.section==="home"&&!t&&!s,h=!e&&t,v=!e&&!c&&!s&&!h&&!r&&!i&&!o&&!a,f=e?this.items.find($=>$.id===this.selectedId)??null:null;let m="Library";return e?m=f?f.title:"Library":h?m="Search results":r?m="Settings":i?m="Browse sources":o?m="Create":a?m="Chat with Libby":s?m="Favorites":c?m="Library":m=((b=j[this.section])==null?void 0:b.label)??"Library",n`
      ${this.renderNav()}
      <div class="main-col">
        ${this.renderHeader(m,t,e,r)}
        <main>
          ${c?this.renderHome():d}
          ${r?n`<oppai-settings .user=${this.user}></oppai-settings>`:d}
          ${i?n`<oppai-browse @imported=${()=>this.refresh()}></oppai-browse>`:d}
          ${o?n`<oppai-imagegen @imported=${()=>this.refresh()}></oppai-imagegen>`:d}
          ${a?n`<oppai-chat></oppai-chat>`:d}
          ${v||s||h?this.renderGrid(v,s,h):d}
          ${e&&f?n`<oppai-viewer
                .media=${f}
                .queue=${this.viewerQueue}
                .favorite=${this.favorites.has(f.id)}
                @toggle-favorite=${()=>this.toggleFavorite(f.id)}
                @navigate=${$=>this.stepItem($.detail.dir)}
                @jump=${$=>this.selectedId=$.detail.id}
                @changed=${()=>this.refresh()}
                @deleted=${()=>{this.closeItem(),this.refresh()}}
              ></oppai-viewer>`:d}
          ${e&&!f?n`<div class="empty">Item not found.</div>`:d}
        </main>
      </div>
      ${this.renderUpload()}
      ${this.renderBulkBar()}
      ${this.renderDownloads()}
      <oppai-scrape-dialog @imported=${()=>this.refresh()}></oppai-scrape-dialog>
      <input id="file" type="file" multiple @change=${this.onFileInput} />
    `}renderDownloads(){return this.downloads.length===0?d:n`<aside class="download-area" aria-label="Downloads">
      <div class="download-heading">Downloads</div>
      ${this.downloads.slice(0,5).map(t=>n`
        <div class="download-row">
          <div class="download-ring" style=${`--p:${t.progress}`}>
            <span class="material-symbols-rounded">${t.state==="done"?"check":t.state==="error"?"error":"download"}</span>
          </div>
          <div class="download-copy">
            <div class="download-title">${t.label}</div>
            <div class="download-status">${t.state==="running"?`${Math.round(t.progress*100)}% · running in background`:t.state==="done"?"Complete":t.error||"Failed"}</div>
          </div>
          ${t.state!=="running"?n`<button class="download-dismiss" title="Dismiss" @click=${()=>is(t.id)}>
            <span class="material-symbols-rounded">close</span>
          </button>`:d}
        </div>`)}
    </aside>`}renderBulkBar(){if(!this.selectMode||this.selected.size===0)return d;const t=this.selected.size;return n`
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
    `}renderNav(){var r,i;const t=(((r=this.user)==null?void 0:r.username)??"?").slice(0,2).toUpperCase(),e=this.section==="settings"&&this.selectedId==null;return n`
      <nav>
        <button class="logo" title="OppaiLib" @click=${()=>this.selectSection("home")}>
          ${xi}
        </button>
        <button class="add-btn" title="Add media" @click=${this.toggleUpload}>
          <span class="material-symbols-rounded" style="font-size:26px;">add</span>
        </button>

        <div class="nav-list">
          ${zs.map(o=>{const a=this.section===o.id&&this.selectedId==null;return n`
              <button class="nav-item" @click=${()=>this.selectSection(o.id)}>
                <span
                  class="nav-pill"
                  style="background:${a?"var(--oppai-primary-container)":"transparent"};"
                >
                  <span
                    class="material-symbols-rounded ${a?"fill-icon":""}"
                    style="font-size:22px; color:${a?"var(--oppai-primary-bright)":"var(--oppai-text-dim)"};"
                    >${o.icon}</span
                  >
                </span>
                <span class="nav-label" style="color:${a?"var(--oppai-text)":"var(--oppai-text-muted)"};"
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
          style="width:48px; height:48px; border-radius:24px; background:${e?"var(--oppai-primary-container)":"var(--oppai-surface-2)"}; color:${e?"var(--oppai-primary-bright)":"var(--oppai-text-dim)"};"
        >
          <span class="material-symbols-rounded ${e?"fill-icon":""}" style="font-size:22px;"
            >settings</span
          >
        </button>
        <button
          class="icon-btn"
          title="Sign out (${(i=this.user)==null?void 0:i.username})"
          @click=${this.logout}
          style="width:40px; height:40px; border-radius:20px; background:var(--oppai-accent); color:var(--oppai-on-accent); font-size:13px; font-weight:600;"
        >
          ${t}
        </button>
      </nav>
    `}renderHeader(t,e,r,i=!1){return n`
      <header>
        ${r?n`<button
              class="icon-btn"
              title="Back"
              @click=${this.closeItem}
              style="width:40px; height:40px; border-radius:20px; background:none; color:var(--oppai-text); flex-shrink:0;"
            >
              <span class="material-symbols-rounded" style="font-size:24px;">arrow_back</span>
            </button>`:d}

        <h1 class="h-title">${t}</h1>

        <div class="searchbox">
          <span class="material-symbols-rounded" style="font-size:20px; color:var(--oppai-text-dim);">search</span>
          <input
            .value=${this.search}
            @input=${this.onSearchInput}
            placeholder="Search titles, tags, notes..."
          />
          ${e?n`<button
                class="icon-btn"
                @click=${this.clearSearch}
                style="background:none; color:var(--oppai-text-dim);"
              >
                <span class="material-symbols-rounded" style="font-size:18px;">close</span>
              </button>`:d}
        </div>

        <div style="flex:1;"></div>

        ${!r&&!i?n`<button
              class="filters-btn header-toggle ${this.selectMode?"on":""}"
              title="Select multiple"
              @click=${this.toggleSelectMode}
            >
              <span class="material-symbols-rounded" style="font-size:18px;"
                >${this.selectMode?"check_circle":"check_box_outline_blank"}</span
              >
              <span style="font-size:13px; font-weight:500;">Select</span>
            </button>`:d}
        ${i?d:n`<button class="filters-btn">
              <span class="material-symbols-rounded" style="font-size:18px;">tune</span>
              <span style="font-size:13px; font-weight:500;">Filters</span>
            </button>`}
      </header>
    `}renderHome(){const t=new Date().getHours(),e=t<12?"Good morning":t<18?"Good afternoon":"Good evening",r=Be.map(i=>({kind:i,label:j[i].label,icon:j[i].icon,items:this.itemsForKind(i).slice(0,12)})).filter(i=>i.items.length>0);return this.loading&&this.items.length===0?n`<div class="empty">Loading your library…</div>`:r.length===0?n`<div>
        <h2 class="greeting">${e}</h2>
        <p class="greeting-sub">Your library is empty — add media or import from a URL.</p>
        <div class="empty">
          <span class="material-symbols-rounded" style="font-size:40px; display:block; margin-bottom:12px;"
            >library_add</span
          >
          <div style="font-size:14px;">Nothing here yet.</div>
        </div>
      </div>`:n`
      <div>
        <h2 class="greeting anim-rise">${e}</h2>
        <p class="greeting-sub anim-rise" style="animation-delay:40ms;">
          Here's what's new across your library
        </p>
        ${r.map((i,o)=>n`
            <section class="row anim-rise" style="animation-delay:${80+o*70}ms;">
              <div class="row-head">
                <span class="material-symbols-rounded" style="font-size:22px; color:var(--oppai-primary-bright);"
                  >${i.icon}</span
                >
                <h3 class="row-title">${i.label}</h3>
                <button class="see-all" @click=${()=>this.selectSection(i.kind)}>
                  See all
                  <span class="material-symbols-rounded" style="font-size:16px;">chevron_right</span>
                </button>
              </div>
              <div class="row-scroll">
                ${i.items.map(a=>this.renderTile(a,"200px",void 0,i.items))}
              </div>
            </section>
          `)}
      </div>
    `}renderGrid(t,e,r){var c;let i="",o=[],a=[];if(e)i="Favorites",o=this.items.filter(h=>this.favorites.has(h.id));else if(r){i="Search results";const h=this.search.trim().toLowerCase().split(/\s+/).filter(Boolean);o=this.items.filter(v=>Ss(v,h))}else{const h=this.section;i=((c=j[h])==null?void 0:c.label)??"";const v=this.itemsForKind(h),f=Array.from(new Set(v.flatMap(b=>(b.tags??[]).map($=>$.name)))).slice(0,8),m=this.filters[h]??"All";a=["All",...f].map(b=>({label:b,active:m===b})),o=m==="All"?v:v.filter(b=>(b.tags??[]).some($=>$.name===m))}const s=`${o.length} ${o.length===1?"item":"items"}`;return n`
      <div>
        <div class="grid-head">
          <h2 class="grid-title">${i}</h2>
          <span class="grid-count">${s}</span>
        </div>

        ${t&&a.length>1?n`<div class="chips">
              ${a.map(h=>n`<button
                  class="chip"
                  @click=${()=>this.setFilter(this.section,h.label)}
                  style="background:${h.active?"var(--oppai-accent)":"transparent"}; color:${h.active?"var(--oppai-on-accent)":"var(--oppai-text-dim)"}; border:1px solid ${h.active?"var(--oppai-accent)":"var(--oppai-border-strong)"};"
                >
                  ${h.active?n`<span class="material-symbols-rounded" style="font-size:16px;">check</span>`:d}
                  ${h.label}
                </button>`)}
            </div>`:n`<div style="height:24px;"></div>`}

        ${o.length===0?n`<div class="empty">
              <span class="material-symbols-rounded" style="font-size:40px; display:block; margin-bottom:12px;"
                >${e?"favorite_border":"search_off"}</span
              >
              <div style="font-size:14px;">
                ${e?"No favorites yet. Tap the heart on any item.":"No items match your search or filter."}
              </div>
            </div>`:n`<div class="grid">
              ${o.map((h,v)=>this.renderTile(h,"100%",v,o))}
            </div>`}
      </div>
    `}renderTile(t,e,r,i){const o=j[t.kind],a=this.favorites.has(t.id),s=Ti(t),c=r!=null?"anim-rise":"",h=r!=null?`animation-delay:${Math.min(r,12)*45}ms;`:"",v=this.selected.has(t.id),f=`tile ${c} ${this.selectMode?"selecting":""} ${v?"selected":""}`;return n`
      <div
        class=${f}
        @click=${()=>this.selectMode?this.toggleSelected(t.id):this.openItem(t.id,i)}
        style="flex-shrink:0; width:${e}; ${h}"
      >
        <div
          class="tile-media"
          style="width:100%; aspect-ratio:${o.aspect}; background:${ke(t)};"
        >
          ${os(t)?n`<img loading="lazy" src=${g.thumbURL(t.id)} alt=${t.title} />`:n`<div class="tile-overlay">
                <span class="material-symbols-rounded" style="font-size:30px; color:#fff;"
                  >${o.icon}</span
                >
                <span class="type-label">${o.typeLabel}</span>
              </div>`}
          ${this.selectMode?n`<div class="select-check ${v?"on":""}">
                ${v?n`<span class="material-symbols-rounded">check</span>`:d}
              </div>`:n`<button
                class="fav-btn ${a?"is-fav":""}"
                @click=${m=>this.toggleFavorite(t.id,m)}
              >
                <span
                  class="material-symbols-rounded fill-icon"
                  style="font-size:18px; color:${a?"var(--oppai-fav)":"rgba(255,255,255,0.9)"};"
                  >${a?"favorite":"favorite_border"}</span
                >
              </button>`}
          ${s?n`<span class="tile-stat">${s}</span>`:d}
        </div>
        <div class="tile-meta">
          <div class="tile-title">${t.title}</div>
          <div class="tile-tag">${as(t)}</div>
        </div>
      </div>
    `}renderUpload(){return this.uploadOpen?n`
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
    `:d}};P.styles=[Ae,he,y`
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
    `];B([u({attribute:!1})],P.prototype,"user",2);B([p()],P.prototype,"items",2);B([p()],P.prototype,"loading",2);B([p()],P.prototype,"section",2);B([p()],P.prototype,"selectedId",2);B([p()],P.prototype,"search",2);B([p()],P.prototype,"filters",2);B([p()],P.prototype,"favorites",2);B([p()],P.prototype,"uploadOpen",2);B([p()],P.prototype,"dragActive",2);B([p()],P.prototype,"selectMode",2);B([p()],P.prototype,"selected",2);B([p()],P.prototype,"busy",2);B([p()],P.prototype,"downloads",2);P=B([k("oppai-library")],P);var Is=Object.defineProperty,Es=Object.getOwnPropertyDescriptor,ue=(t,e,r,i)=>{for(var o=i>1?void 0:i?Es(e,r):e,a=t.length-1,s;a>=0;a--)(s=t[a])&&(o=(i?s(e,r,o):s(o))||o);return i&&o&&Is(e,r,o),o};const Ls=6e4;let J=class extends _{constructor(){super(...arguments),this.user=null,this.ready=!1,this.mascotMessage="",this.mascotTone="success",this.mascotEmotion="default",this.mascotIntensity=1,this.mascotOutfit="default",this.onMascot=t=>{if(t.detail.tone!=="error")return;this.mascotMessage=t.detail.message,this.mascotTone=t.detail.tone;const e=$i(t.detail.message);this.mascotEmotion=Te(t.detail.emotion??e.emotion),this.mascotIntensity=Ne(t.detail.intensity??e.intensity),this.mascotOutfit=t.detail.outfit||"default",this.mascotTimer&&clearTimeout(this.mascotTimer),this.mascotTimer=window.setTimeout(()=>this.mascotMessage="",5e3)},this.onLogout=()=>{this.user=null,this.stopProbe()},this.onVisible=()=>{document.visibilityState==="visible"&&this.user&&this.probe()}}connectedCallback(){super.connectedCallback(),window.addEventListener("oppai-logout",this.onLogout),window.addEventListener("oppai-mascot",this.onMascot),document.addEventListener("visibilitychange",this.onVisible),this.bootstrap()}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("oppai-logout",this.onLogout),window.removeEventListener("oppai-mascot",this.onMascot),document.removeEventListener("visibilitychange",this.onVisible),this.stopProbe(),this.mascotTimer&&clearTimeout(this.mascotTimer)}async bootstrap(){if(sr())try{this.user=await g.me(),this.startProbe()}catch{pt(null)}this.ready=!0}async probe(){if(sr())try{await g.me()}catch{}}startProbe(){this.stopProbe(),this.probeTimer=window.setInterval(()=>void this.probe(),Ls)}stopProbe(){this.probeTimer&&(clearInterval(this.probeTimer),this.probeTimer=void 0)}onLoggedIn(t){this.mascotMessage="",this.user=t.detail,this.startProbe()}async logout(){try{await g.logout()}catch{}pt(null),this.user=null,this.stopProbe()}render(){const t=wr(this.mascotEmotion,this.mascotIntensity,this.mascotOutfit),e=this.mascotMessage?n`<div class="mascot-talk ${this.mascotTone}">
          <div class="speech" role=${this.mascotTone==="error"?"alert":"status"}>
            <span class="libby-name">LIBBY · ${_i(this.mascotEmotion)} · ${this.mascotEmotion} ${this.mascotIntensity}</span>${this.mascotMessage}
          </div>
          <img src=${t[0]} data-fallback-index="0" alt=${`Libby feeling ${this.mascotEmotion}`}
            @error=${r=>_r(r.target,t)} />
        </div>`:null;return this.ready?this.user?n`<oppai-library
      .user=${this.user}
      @logout=${this.logout}
    ></oppai-library>${e}`:n`<oppai-login @logged-in=${this.onLoggedIn}></oppai-login>`:n`<div class="center"><md-circular-progress indeterminate></md-circular-progress></div>${e}`}};J.styles=y`
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
    }
    .mascot-talk img {
      width: min(210px, 34vw);
      max-height: 38vh;
      object-fit: contain;
      object-position: bottom;
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
    .libby-name { display: block; color: var(--md-sys-color-error); font-size: 11px; font-weight: 700; }
    @media (max-width: 600px) {
      .mascot-talk img { width: 150px; }
      .speech { margin-bottom: 100px; }
    }
  `;ue([p()],J.prototype,"user",2);ue([p()],J.prototype,"ready",2);ue([p()],J.prototype,"mascotMessage",2);ue([p()],J.prototype,"mascotTone",2);ue([p()],J.prototype,"mascotEmotion",2);ue([p()],J.prototype,"mascotIntensity",2);ue([p()],J.prototype,"mascotOutfit",2);J=ue([k("oppai-app")],J);const Fi=document.createElement("style");Fi.textContent=Ya;document.head.appendChild(Fi);document.adoptedStyleSheets=[...document.adoptedStyleSheets,Wa.styleSheet];xr(yr());Ja();
