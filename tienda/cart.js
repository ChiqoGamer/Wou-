(function(){var DEFT=[[2,10],[3,15],[4,20]];
var DOT={'Negro y agua':'linear-gradient(135deg,#111 50%,#4FD8C4 50%)','Gris y rosa':'linear-gradient(135deg,#A9ACA8 50%,#E5398F 50%)','Negro y gris':'linear-gradient(135deg,#111 50%,#A9ACA8 50%)','Negro y verde':'linear-gradient(135deg,#111 50%,#9BF609 50%)','Gris':'#A9ACA8','Beige':'#D8C3A3'};
function pr(){return window.__wouPrice&&window.__wouPrice.get&&window.__wouPrice.get()||{}}
function tiers(){var g=pr(),t=(g.r&&g.r.T&&g.r.T.length&&g.r.T)||(g.t&&g.t.T&&g.t.T.length&&g.t.T)||DEFT;return t.slice().sort(function(a,b){return a[0]-b[0]})}
function cuotas(){var g=pr(),a=g.r||g.t;return a&&a.N>1?a.N:3}
function fmt(v){return '$'+Math.round(v).toLocaleString('es-AR')}
function setT(el,t){if(el&&el.textContent!==t)el.textContent=t}
var CAR=[[/correo argentino cl[aá]sico|correo arg clasico/i,'Correo Argentino Clásico','clasico'],[/correo argentino expreso|correo arg expreso/i,'Correo Argentino Expreso','expreso'],[/andreani/i,'Andreani','andreani'],[/\boca\b/i,'OCA','oca']];
function carOf(t){t=(t||'').replace(/[-_]/g,' ');for(var i=0;i<CAR.length;i++)if(CAR[i][0].test(t))return CAR[i];return null}
function nameLi(li,c,clone){if(!c)return;var t='Retiro en sucursal · '+c[1];var n=li.querySelector('[data-component="option.name"],.wck-oname')||li.querySelector('.shipping-option-details > div');if(!n)return;if(clone){n.removeAttribute('data-component');n.classList.add('wck-oname');if(n.textContent.trim()!==t)n.textContent=t;return}var tn=[].filter.call(n.childNodes,function(x){return x.nodeType===3&&x.nodeValue.trim()})[0];if(tn){if(tn.nodeValue.trim()!==t)tn.nodeValue=' '+t+' '}else n.insertBefore(document.createTextNode(t+' '),n.firstChild)}
function splitPick(m){m.querySelectorAll('li.js-shipping-list-item').forEach(function(li){if(li.hasAttribute('data-wck-clone'))return;var inp=li.querySelector('input.js-pickup-option');if(!inp)return;var code=inp.getAttribute('data-code')||'',own=carOf(code);
 var ul=li.querySelector('ul.shipping-suboption-list');if(li.__wsp||!ul||!ul.children.length){nameLi(li,own);return}li.__wsp=1;
 var kids=[].slice.call(ul.children),keys=[],groups=[],by={};
 kids.forEach(function(x){var c=carOf(x.textContent),k=c?c[2]:'otro';keys.push(k);if(!by[k]){by[k]={c:c,k:k};groups.push(by[k])}x.textContent=x.textContent.replace(/^\s*env[ií]o nube\s*-\s*.*?\ba sucursal\s*-\s*/i,'')});
 var main=(own&&by[own[2]])||groups[0];
 if(groups.length>1){var after=li;groups.forEach(function(g,gi){if(g===main)return;var cl=li.cloneNode(true),suf='-w'+gi;cl.setAttribute('data-wck-clone','1');
   cl.querySelectorAll('[id]').forEach(function(e){e.id=e.id+suf});
   cl.querySelectorAll('[data-target],[data-modal-url],[data-url],[data-component^="selected_suboption"]').forEach(function(e){['data-target','data-modal-url','data-url','data-component'].forEach(function(at){var v=e.getAttribute(at);if(v&&/selected_suboption|pickup-modal/.test(v))e.setAttribute(at,v+suf)})});
   var cu=cl.querySelector('ul.shipping-suboption-list');[].slice.call(cu.children).forEach(function(x,i){if(keys[i]!==g.k)x.remove()});
   var ci=cl.querySelector('input');if(ci){ci.checked=false;var lb=cl.querySelector('label');lb&&lb.classList.remove('selected')}
   nameLi(cl,g.c,true);after.parentNode.insertBefore(cl,after.nextSibling);after=cl});
  kids.forEach(function(x,i){if(keys[i]!==main.k)x.remove()})}
 nameLi(li,main.c||own)})}
function run(){var m=document.getElementById('modal-cart');if(!m)return;var form=m.querySelector('.modal-form')||m,body=m.querySelector('.modal-body'),head=m.querySelector('.modal-header');if(!body||!head)return;
 var items=[].slice.call(m.querySelectorAll('.js-cart-item')),n=0;items.forEach(function(it){var i=it.querySelector('.js-cart-quantity-input');n+=i?(parseInt(i.value,10)||0):1});
 var title=m.querySelector('.modal-title'),badge=title&&title.querySelector('.wck-n');
 if(title&&!badge){title.textContent='Tu carrito';badge=document.createElement('span');badge.className='wck-n';title.appendChild(badge)}
 if(badge){setT(badge,String(n));badge.style.display=n?'':'none'}
 var strip=m.querySelector('.wck-strip');if(!strip){strip=document.createElement('div');strip.className='wck-strip';strip.innerHTML='<span></span><button type="button">+ Sumar otra</button>';head.parentNode.insertBefore(strip,head.nextSibling);
  strip.querySelector('button').addEventListener('click',function(){var p=m.querySelector('.js-cart-item .js-cart-quantity-plus');if(p)p.click()})}
 var T=tiers(),nx=T.filter(function(t){return t[0]>n})[0],top=!nx,msg=n?(nx?'Sumá '+(nx[0]-n)+' más y llevás '+nx[1]+'% OFF en todo':'¡Tenés el máximo descuento: '+T[T.length-1][1]+'% OFF!'):'';
 strip.hidden=!n;setT(strip.querySelector('span'),msg);if(strip.classList.contains('top')!==top)strip.classList.toggle('top',top);var sb=strip.querySelector('button');if((sb.style.display==='none')!==top)sb.style.display=top?'none':'';
 m.querySelectorAll('.cart-item-variant').forEach(function(v){if(v.__w===v.textContent)return;var t=v.textContent.replace(/^\s*\(|\)\s*$/g,'').split(',').map(function(x){return x.trim()}).filter(function(x){return x&&!/^[uú]nico$/i.test(x)}).join(' · ');v.innerHTML='';var i=document.createElement('i');i.style.background=DOT[t]||'#C8CCC2';v.appendChild(i);v.appendChild(document.createTextNode(t));v.__w=v.textContent});
 m.querySelectorAll('[data-component="option.name"]').forEach(function(o){var tn=[].filter.call(o.childNodes,function(x){return x.nodeType===3&&/Env[ií]o Nube\s*-\s*/.test(x.nodeValue)})[0];if(tn)tn.nodeValue=tn.nodeValue.replace(/Env[ií]o Nube\s*-\s*/,'')});
 var w=document.createTreeWalker(m,NodeFilter.SHOW_TEXT,null),x;while(x=w.nextNode()){if(/\$\s?[\d.]+,00\b/.test(x.nodeValue))x.nodeValue=x.nodeValue.replace(/\$\s?([\d.]+),00\b/g,'$$$1')}
 var foot=m.querySelector('.wck-foot');if(!foot){foot=document.createElement('div');foot.className='wck-foot';form.appendChild(foot)}
 var sub=m.querySelector('.cart-subtotals-container'),sw=sub&&sub.closest('.js-visible-on-cart-filled'),sbm=m.querySelector('.js-ajax-cart-submit'),sbw=sbm&&sbm.closest('.js-visible-on-cart-filled');
 [sw,sbw].forEach(function(b){if(b&&b.parentNode!==foot)foot.appendChild(b)});
 foot.style.display=n?'':'none';
 var tot=m.querySelector('.js-cart-total'),cu=foot.querySelector('.wck-cu');if(tot){if(!cu){cu=document.createElement('div');cu.className='wck-cu';var tc=tot.closest('.js-cart-total-container')||tot.parentNode;tc.parentNode.insertBefore(cu,tc.nextSibling)}var v=parseFloat((tot.textContent||'').replace(/[^\d,]/g,'').replace(',','.'))||0,N=cuotas();setT(cu,v&&N>1?'o '+N+' cuotas sin interés de '+fmt(v/N):'')}
 var L=[[/^\s*Subtotal\s*\(sin env[ií]o\):?\s*$/,'Subtotal'],[/^\s*Costo de env[ií]o:?\s*$/,'Envío'],[/^\s*Total:\s*$/,'Total'],[/^\s*Retirar por\s*$/,'Retiro en sucursal']];m.querySelectorAll('.cart-totals-row > span:first-child, .shipping-options-heading span').forEach(function(e){if(e.children.length)return;L.forEach(function(r){if(r[0].test(e.textContent))setT(e,r[1])})});
 m.querySelectorAll('.js-total-promotions-detail-row').forEach(function(r){var e=r.querySelector('.cart-promotion-detail')||r.firstElementChild;if(!e)return;var p=(e.textContent.match(/(\d+)\s*%\s*OFF/i)||[])[1];if(p)setT(e,'Descuento por cantidad ('+p+'%)')});
 splitPick(m);
 var em=m.querySelector('.js-empty-ajax-cart');if(em&&!em.querySelector('.wck-empty')){var d=document.createElement('div');d.className='wck-empty';d.innerHTML='<div class="wck-empty-ic"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0B0C0A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 4h2l2.4 11.2a1 1 0 0 0 1 .8h9.2a1 1 0 0 0 1-.8L21 8H6.2"/><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/></svg></div><h3>Tu carrito está vacío</h3><p>Elegí tu rodillera o tobillera y volvé acá.</p><a class="wck-go" href="/productos/">Ver productos</a><div class="wck-links"><a href="/productos/rodillera-wouufit/">Rodillera</a><a href="/productos/tobillera-deportiva-wouu/">Tobillera</a></div><small></small>';em.appendChild(d);
  d.querySelector('.wck-go').addEventListener('click',function(e){if(location.pathname!=='/')return;var t=document.getElementById((innerWidth>=768?'d-':'m-')+'productos')||document.getElementById((innerWidth>=768?'d-':'m-')+'rodillera');if(!t)return;e.preventDefault();var c=m.querySelector('.js-modal-close-private');if(c)c.click();setTimeout(function(){t.scrollIntoView({behavior:'smooth',block:'start'})},250)})}
 var es=m.querySelector('.wck-empty small');if(es){var N2=cuotas();setT(es,'Envío gratis a todo el país'+(N2>1?' · '+N2+' cuotas sin interés':''))}
 var cs=m.querySelector('.cart-continue-shopping a');if(cs)setT(cs,'Seguir comprando')}
var q=0;function sch(){if(!q)q=setTimeout(function(){q=0;try{run()}catch(e){}},40)}
function start(){run();var m=document.getElementById('modal-cart');if(m)try{new MutationObserver(sch).observe(m,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['value','class']})}catch(e){}m&&m.addEventListener('input',sch);document.addEventListener('wou:prices',sch)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start()})();