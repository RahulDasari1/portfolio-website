function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

/* Continuous marquee for featured logos */
(function(){
  const wrapper = document.querySelector('.customer-logos');
  if (!wrapper) return;
  const track = wrapper.querySelector('.track');
  if (!track) return;

  function setupMarquee(){
    if (!track.dataset.cloned){
      // duplicate content for seamless loop
      track.innerHTML = track.innerHTML + track.innerHTML;
      track.dataset.cloned = '1';
    }

    // give browser a moment to layout images
    requestAnimationFrame(()=>{
      // half width is the original content width (after duplication)
      const totalWidth = track.scrollWidth;
      const half = (totalWidth / 2) || totalWidth;
      // force a 4s duration for the marquee (faster, consistent speed)
      const durationSec = 18;
      wrapper.classList.add('marquee');
      wrapper.style.setProperty('--marquee-duration', durationSec + 's');
      // set translate distance in pixels so animation moves exactly one copy
      wrapper.style.setProperty('--marquee-translate', Math.round(half) + 'px');
    });
  }

  // initialize on load and recalc on resize
  if (document.readyState === 'complete') setupMarquee(); else window.addEventListener('load', setupMarquee);
  let resizeTimer = null;
  window.addEventListener('resize', ()=>{ clearTimeout(resizeTimer); resizeTimer = setTimeout(setupMarquee, 250); });
})();
