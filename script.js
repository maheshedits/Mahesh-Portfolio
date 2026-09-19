document.addEventListener("DOMContentLoaded", () => {

  /* SMOOTH CURSOR GLOW */
  const glow = document.querySelector(".cursor-glow");

  if (glow && window.matchMedia("(pointer:fine)").matches) {
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    window.addEventListener("mousemove", (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      glow.style.opacity = "1";
    }, { passive:true });

    window.addEventListener("mouseleave", () => {
      glow.style.opacity = "0";
    });

    const tick = () => {
      currentX += (targetX - currentX) * 0.20;
      currentY += (targetY - currentY) * 0.20;

      glow.style.transform =
        `translate3d(${currentX}px,${currentY}px,0) translate(-50%,-50%)`;

      requestAnimationFrame(tick);
    };

    tick();
  }


  /* SCROLL REVEAL */
  const reveals = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold:0.12 });

  reveals.forEach((item) => revealObserver.observe(item));


  /* SKILL BARS */
  const skillsPanel = document.querySelector(".skills-panel");

  if (skillsPanel) {
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          skillsPanel.classList.add("visible");

          skillsPanel.querySelectorAll(".skill-bar span").forEach((bar) => {
            bar.style.setProperty("--skill-width", bar.dataset.width);
          });

          skillObserver.unobserve(skillsPanel);
        }
      });
    }, { threshold:0.2 });

    skillObserver.observe(skillsPanel);
  }


  /* FILTERS */
  const buttons = document.querySelectorAll(".filter");
  const cards = document.querySelectorAll(".project-card");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      button.classList.add("active");

      const filter = button.dataset.filter;

      cards.forEach((card) => {
        card.style.display =
          filter === "all" || card.dataset.category === filter
            ? ""
            : "none";
      });
    });
  });


  /* PROJECT VIDEO MODAL */
  const modal = document.getElementById("videoModal");
  const iframe = document.getElementById("videoFrame");
  const title = document.getElementById("videoModalTitle");

  const close = () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden","true");
    iframe.src = "";
    document.body.style.overflow = "";
  };

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const id = card.dataset.video;
      if (!id) return;

      title.textContent = card.dataset.title || "";
      iframe.src = `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;

      modal.classList.add("open");
      modal.setAttribute("aria-hidden","false");
      document.body.style.overflow = "hidden";
    });
  });

  document.querySelectorAll("[data-close-video]").forEach((item) => {
    item.addEventListener("click", close);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });


  /* HERO VIDEO SOUND */
  const heroVideo = document.getElementById("heroVideo");
  const soundButton = document.getElementById("soundToggle");

  if (heroVideo && soundButton) {
    soundButton.addEventListener("click", () => {
      heroVideo.muted = !heroVideo.muted;
      soundButton.textContent = heroVideo.muted ? "SOUND OFF" : "SOUND ON";
    });
  }


  /* FORM */
  const form = document.querySelector(".contact-form");

  if (form) {
    form.addEventListener("submit", () => {
      const submit = form.querySelector(".submit-button");
      if (submit) submit.innerHTML = "SENDING... <span>↗</span>";
    });
  }

});
