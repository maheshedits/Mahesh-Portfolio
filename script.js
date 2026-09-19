/* =========================================================
   MAHESH PORTFOLIO — JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     SMOOTH CURSOR GLOW
  ======================================================= */

  const cursorGlow = document.querySelector(".cursor-glow");

  if (cursorGlow && window.matchMedia("(pointer: fine)").matches) {

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let glowX = mouseX;
    let glowY = mouseY;

    window.addEventListener("mousemove", (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      cursorGlow.style.opacity = "1";
    }, { passive: true });

    window.addEventListener("mouseleave", () => {
      cursorGlow.style.opacity = "0";
    });

    function animateCursor() {

      /* Smooth interpolation — no laggy CSS left/top updates */
      glowX += (mouseX - glowX) * 0.16;
      glowY += (mouseY - glowY) * 0.16;

      cursorGlow.style.transform =
        `translate3d(${glowX}px, ${glowY}px, 0) translate(-50%, -50%)`;

      requestAnimationFrame(animateCursor);
    }

    animateCursor();
  }


  /* =======================================================
     SCROLL REVEAL
  ======================================================= */

  const revealItems = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }

      });

    },
    {
      threshold: 0.12
    }
  );

  revealItems.forEach((item) => {
    revealObserver.observe(item);
  });


  /* =======================================================
     SKILL BAR ANIMATION
  ======================================================= */

  const skillPanel = document.querySelector(".skills-panel");

  if (skillPanel) {

    const skillObserver = new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            skillPanel.classList.add("visible");

            skillPanel.querySelectorAll(".skill-bar span").forEach((bar) => {
              bar.style.setProperty(
                "--skill-width",
                bar.dataset.width
              );
            });

            skillObserver.unobserve(skillPanel);
          }

        });

      },
      {
        threshold: 0.2
      }
    );

    skillObserver.observe(skillPanel);
  }


  /* =======================================================
     WORK FILTERS
  ======================================================= */

  const filterButtons = document.querySelectorAll(".filter");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

      filterButtons.forEach((btn) => {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      const filter = button.dataset.filter;

      projectCards.forEach((card) => {

        const category = card.dataset.category;

        if (filter === "all" || category === filter) {
          card.style.display = "";
        } else {
          card.style.display = "none";
        }

      });

    });

  });


  /* =======================================================
     PROJECT VIDEO MODAL
  ======================================================= */

  const modal = document.getElementById("videoModal");
  const iframe = document.getElementById("videoFrame");
  const modalTitle = document.getElementById("videoModalTitle");

  const closeVideoButtons =
    document.querySelectorAll("[data-close-video]");

  function openVideo(videoId, title) {

    if (!modal || !iframe) return;

    modalTitle.textContent = title;

    iframe.src =
      `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";
  }

  function closeVideo() {

    if (!modal || !iframe) return;

    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");

    iframe.src = "";

    document.body.style.overflow = "";
  }

  projectCards.forEach((card) => {

    card.addEventListener("click", () => {

      const videoId = card.dataset.video;
      const title = card.dataset.title;

      if (videoId) {
        openVideo(videoId, title);
      }

    });

  });

  closeVideoButtons.forEach((button) => {
    button.addEventListener("click", closeVideo);
  });

  document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
      closeVideo();
    }

  });


  /* =======================================================
     HERO VIDEO SOUND
  ======================================================= */

  const heroVideo = document.getElementById("heroVideo");
  const soundToggle = document.getElementById("soundToggle");

  if (heroVideo && soundToggle) {

    soundToggle.addEventListener("click", () => {

      heroVideo.muted = !heroVideo.muted;

      if (heroVideo.muted) {
        soundToggle.textContent = "SOUND OFF";
      } else {
        soundToggle.textContent = "SOUND ON";
      }

    });

  }


  /* =======================================================
     CONTACT FORM
  ======================================================= */

  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {

    contactForm.addEventListener("submit", () => {

      const button = contactForm.querySelector(".submit-button");

      if (button) {
        button.innerHTML = "SENDING... <span>↗</span>";
      }

    });

  }


  /* =======================================================
     NAV ACTIVE FEEL
  ======================================================= */

  const navLinks = document.querySelectorAll(".nav nav a");

  navLinks.forEach((link) => {

    link.addEventListener("click", () => {

      navLinks.forEach((item) => {
        item.classList.remove("active");
      });

      link.classList.add("active");

    });

  });

});
