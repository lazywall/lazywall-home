(function(){
 var m=document.getElementById('menu'),b=document.getElementById('burger');
 if(m&&b){b.onclick=function(){m.classList.toggle('open')}}
 document.querySelectorAll('a[href^="#"]').forEach(function(a){a.target='_self'});
 // tell the parent page (Bandzoogle) how tall this page is
 function sendH(){try{var f=document.querySelector('footer');var h=Math.ceil(f.getBoundingClientRect().bottom+window.scrollY);parent.postMessage({lazywallHeight:h},'*')}catch(e){}}
 addEventListener('load',sendH);addEventListener('resize',sendH);
 if(window.ResizeObserver){new ResizeObserver(sendH).observe(document.body)}
 // YouTube facades: any .yt[data-id]
 document.querySelectorAll('.yt').forEach(function(el){
  if(!el.querySelector('.play'))el.innerHTML='<div class="play"></div>';
  el.onclick=function(){var f=document.createElement('iframe');f.src='https://www.youtube-nocookie.com/embed/'+el.dataset.id+'?autoplay=1&rel=0';f.allow='autoplay; encrypted-media; picture-in-picture';f.allowFullscreen=true;el.innerHTML='';el.appendChild(f);el.onclick=null;el.style.cursor='default'};
  // best thumbnail: try maxres, then sd, then hq. YouTube serves a tiny (<=120px) grey placeholder when a size does not exist.
  var base='https://img.youtube.com/vi/'+el.dataset.id+'/',sizes=['maxresdefault','sddefault','hqdefault'];
  (function tryNext(i){
   var im=new Image(),n=sizes[i];
   im.onload=function(){if(im.naturalWidth>300||i===sizes.length-1)el.style.backgroundImage='url('+base+n+'.jpg)';else tryNext(i+1)};
   im.onerror=function(){if(i<sizes.length-1)tryNext(i+1)};
   im.src=base+n+'.jpg';
  })(0);
 });
 var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target)}})},{threshold:.1});
 document.querySelectorAll('.rv').forEach(function(e){io.observe(e)});
})();
