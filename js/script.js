console.log("Animations running");

// HERO animation (runs immediately)
gsap.from(".hero h1", {
  y: 80,
  opacity: 0,
  duration: 1.2,
  ease: "power3.out"
});

gsap.from(".hero button", {
  scale: 0.8,
  opacity: 0,
  duration: 0.6,
  delay: 0.5
});

// EVENTS animation (scroll)
gsap.utils.toArray(".event").forEach((el, i) => {
  gsap.from(el, {
    y: 60,
    opacity: 0,
    duration: 0.8,
    delay: i * 0.2,
    scrollTrigger: {
      trigger: el,
      start: "top 85%"
    }
  });
});
