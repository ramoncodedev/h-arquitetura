(()=>{
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
/* nav */
const nav=$('#nav'),menu=$('#menu'),mb=$('#mb');
mb.onclick=()=>{const o=menu.classList.toggle('on');mb.textContent=o?'Fechar':'Menu';nav.classList.toggle('sc',o||scrollY>40)};
$$('#menu a').forEach(a=>a.onclick=()=>{menu.classList.remove('on');mb.textContent='Menu'});
/* hero: letra por letra */
const ht=$('#ht');ht.setAttribute('aria-label',ht.textContent);
ht.innerHTML=[...ht.textContent].map((c,i)=>c===' '?' ':`<span class="ch" aria-hidden="true" style="animation-delay:${.15+i*.045}s">${c}</span>`).join('');
/* palavras que acendem no scroll */
const wEls=$$('[data-words]').map(el=>{const t=el.textContent.trim().split(/\s+/);el.innerHTML=t.map(w=>`<span class="word">${w}</span>`).join(' ');return {el,w:[...el.children]}});
const light=()=>{const vh=innerHeight;wEls.forEach(({el,w})=>{const r=el.getBoundingClientRect();const start=vh*.92,end=vh*.42;const p=Math.min(1,Math.max(0,(start-r.top)/(start-end+r.height*.6)));const k=p*w.length;w.forEach((s,i)=>{const o=Math.min(1,Math.max(0,k-i));s.style.opacity=rm?1:(.28+.72*o).toFixed(2)})})};
/* texto digitado (seção sobre) */
$$('[data-type]').forEach(el=>{el.innerHTML=el.textContent.trim().split(/\s+/).map((w,i)=>`<span class="word" style="--i:${i}">${w}</span>`).join(' ')});
const ab=$('.about');if(ab){const ai=new IntersectionObserver(es=>{if(es[0].isIntersecting){ab.classList.add('in');ai.disconnect()}},{rootMargin:'0px 0px -22% 0px'});ai.observe(ab)}
/* painéis de projeto: a janela mostra a mesma foto, alinhada ao fundo */
const syncWin=()=>{const p=$('.pj'),c=$('.pcard');if(!p||!c)return;const r=document.documentElement.style;r.setProperty('--pw',p.clientWidth+'px');r.setProperty('--ph',p.clientHeight+'px');r.setProperty('--cw',c.clientWidth+'px')};
addEventListener('resize',syncWin);syncWin();
const pio=new IntersectionObserver(es=>es.forEach(e=>{e.target.classList.toggle('in',e.isIntersecting&&e.intersectionRatio>.35)}),{threshold:[0,.35,.6]});
$$('.pj').forEach(p=>pio.observe(p));
/* reveal */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -6% 0px'});
$$('.rv').forEach(e=>io.observe(e));
/* contadores */
const cio=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;cio.unobserve(e.target);const n=+e.target.dataset.n,t0=performance.now(),d=1600;const f=t=>{const p=Math.min(1,(t-t0)/d),v=Math.round(n*(1-Math.pow(1-p,4)));e.target.textContent='+'+v;if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f)}),{threshold:.6});
$$('[data-n]').forEach(e=>cio.observe(e));
/* scroll loop */
const hero=$('.hero'),ph=$$('[data-par]'),cta=$('.cta .bg'),cards=$$('.pc');
const tick=()=>{
nav.classList.toggle('sc',scrollY>40||menu.classList.contains('on'));
light();
if(hero&&!rm){const hp=Math.min(1,Math.max(0,scrollY/innerHeight));hero.style.setProperty('--d',(.52+.38*hp).toFixed(3));const hi=hero.querySelector('.hero__in');hi.style.transform=`translateY(${(hp*-60).toFixed(1)}px)`;hi.style.opacity=(1-hp*1.15).toFixed(2);hero.querySelector('.hero__bg img').style.marginTop=`${(hp*-40).toFixed(1)}px`}

if(!rm){ph.forEach(i=>{const r=i.parentElement.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)return;i.style.transform=`translateY(${((r.top+r.height/2-innerHeight/2)*-.06).toFixed(1)}px)`});
if(cta){const r=cta.parentElement.getBoundingClientRect();if(r.bottom>0&&r.top<innerHeight)cta.style.transform=`translateY(${((r.top+r.height/2-innerHeight/2)*-.1).toFixed(1)}px)`}
cards.forEach((c,i)=>{const n=cards[i+1];if(!n){c.style.transform='';return}const nr=n.getBoundingClientRect(),top=150,d=Math.max(0,Math.min(1,(c.offsetHeight*1.0+top-nr.top)/(c.offsetHeight)));c.style.transform=`scale(${(1-.05*d).toFixed(3)})`;c.style.opacity=(1-.35*d).toFixed(2)})}
};
addEventListener('scroll',()=>requestAnimationFrame(tick),{passive:true});addEventListener('resize',tick);tick();
/* acordeão */
$$('.it > button').forEach(b=>b.onclick=()=>{const it=b.parentElement,g=it.parentElement,was=it.classList.contains('on');[...g.children].forEach(x=>x.classList.remove('on'));if(!was)it.classList.add('on')});
/* comparador */
const cmp=$('#cmp');if(cmp){const set=x=>{const r=cmp.getBoundingClientRect(),p=Math.max(0,Math.min(100,(x-r.left)/r.width*100));cmp.style.setProperty('--p',p+'%');cmp.setAttribute('aria-valuenow',Math.round(p))};let dn=false;
cmp.addEventListener('pointerdown',e=>{dn=true;cmp.setPointerCapture(e.pointerId);set(e.clientX)});cmp.addEventListener('pointermove',e=>{if(dn)set(e.clientX)});cmp.addEventListener('pointerup',()=>dn=false);
cmp.addEventListener('keydown',e=>{const v=+cmp.getAttribute('aria-valuenow');if(e.key==='ArrowLeft'||e.key==='ArrowRight'){const r=cmp.getBoundingClientRect();set(r.left+r.width*(v+(e.key==='ArrowLeft'?-4:4))/100)}});
let auto=true;const io2=new IntersectionObserver(es=>{if(es[0].isIntersecting&&auto&&!rm){auto=false;const r=cmp.getBoundingClientRect(),t0=performance.now();const f=t=>{const p=Math.min(1,(t-t0)/1800),e=1-Math.pow(1-p,3);set(r.left+r.width*(.5+.18*Math.sin(e*Math.PI*2)));if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f)}},{threshold:.5});io2.observe(cmp)}
/* whatsapp */
const wa='https://wa.me/554792902127?text='+encodeURIComponent('Olá! Vim pelo site da H+ Arquitetura & Co e gostaria de solicitar um orçamento.');
$$('[data-wa]').forEach(a=>{a.href=a.dataset.msg?'https://wa.me/554792902127?text='+encodeURIComponent(a.dataset.msg):wa;a.target='_blank';a.rel='noopener'});
/* marca gigante ajustada à largura */
const mk=$('#mark'),fit=()=>{mk.style.fontSize='100px';const w=mk.parentElement.clientWidth-60;mk.style.fontSize=(100*w/mk.scrollWidth)+'px'};
document.fonts.ready.then(fit);addEventListener('resize',fit);
$('#ano').textContent=new Date().getFullYear();


})();
