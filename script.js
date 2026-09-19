/* =====================================================
   MAHESH PORTFOLIO
   MAIN JAVASCRIPT
===================================================== */


/* =====================================================
   SMOOTH CURSOR GLOW
===================================================== */

const cursorGlow = document.querySelector(".cursor-glow");

if (
  cursorGlow &&
  window.matchMedia("(pointer: fine)").matches
) {

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  let currentX = mouseX;
  let currentY = mouseY;

  window.addEventListener("mousemove", (event) => {

    mouseX = event.clientX;
    mouseY = event.clientY;

  });

  function animateCursor() {

    currentX += (mouseX - currentX) * 0.18;
    currentY += (mouseY - currentY) * 0.18;

    cursorGlow.style.transform =
      `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;

    requestAnimationFrame(animateCursor);

  }

  animateCursor();

}


/* =====================================================
   REVEAL ANIMATIONS
===================================================== */

const revealElements =
  document.querySelectorAll(".reveal");

const revealObserver =
  new IntersectionObserver(
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


revealElements.forEach((element) => {

  revealObserver.observe(element);

});


/* =====================================================
   SKILL BAR ANIMATION
===================================================== */

const skillBars =
  document.querySelectorAll(".skill-bar span");


const skillObserver =
  new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          const bar = entry.target;

          const width =
            bar.getAttribute("data-width");

          bar.style.setProperty(
            "--skill-width",
            width
          );

          requestAnimationFrame(() => {

            bar.classList.add("animate");

          });

          skillObserver.unobserve(bar);

        }

      });

    },
    {
      threshold: 0.35
    }
  );


skillBars.forEach((bar) => {

  skillObserver.observe(bar);

});


/* =====================================================
   PROJECT FILTERS
===================================================== */

const filterButtons =
  document.querySelectorAll(".filter");

const projectCards =
  document.querySelectorAll(".project-card");


filterButtons.forEach((button) => {

  button.addEventListener("click", () => {

    const filter =
      button.getAttribute("data-filter");


    filterButtons.forEach((item) => {

      item.classList.remove("active");

    });


    button.classList.add("active");


    projectCards.forEach((card) => {

      const category =
        card.getAttribute("data-category");


      if (
        filter === "all" ||
        category === filter
      ) {

        card.classList.remove("hidden");

        requestAnimationFrame(() => {

          card.style.opacity = "1";
          card.style.transform = "translateY(0)";

        });

      } else {

        card.classList.add("hidden");

      }

    });

  });

});


/* =====================================================
   PROJECT VIDEO MODAL
===================================================== */

const videoModal =
  document.getElementById("videoModal");

const videoFrame =
  document.getElementById("videoFrame");

const videoModalTitle =
  document.getElementById("videoModalTitle");

const closeVideoButtons =
  document.querySelectorAll("[data-close-video]");


const projectCardsWithVideo =
  document.querySelectorAll(
    ".project-card[data-video]"
  );


function openVideo(videoId, title) {

  if (!videoModal || !videoFrame) {
    return;
  }


  videoModalTitle.textContent =
    title || "Project";


  videoFrame.src =
    `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;


  videoModal.classList.add("active");

  videoModal.setAttribute(
    "aria-hidden",
    "false"
  );


  document.body.style.overflow = "hidden";

}


function closeVideo() {

  if (!videoModal || !videoFrame) {
    return;
  }


  videoModal.classList.remove("active");

  videoModal.setAttribute(
    "aria-hidden",
    "true"
  );


  videoFrame.src = "";

  document.body.style.overflow = "";

}


projectCardsWithVideo.forEach((card) => {

  card.addEventListener("click", () => {

    const videoId =
      card.getAttribute("data-video");

    const title =
      card.getAttribute("data-title");

    openVideo(videoId, title);

  });

});


closeVideoButtons.forEach((button) => {

  button.addEventListener(
    "click",
    closeVideo
  );

});


document.addEventListener(
  "keydown",
  (event) => {

    if (event.key === "Escape") {

      closeVideo();

    }

  }
);


/* =====================================================
   HERO VIDEO SOUND
===================================================== */

const heroVideo =
  document.getElementById("heroVideo");

const soundToggle =
  document.getElementById("soundToggle");


if (heroVideo && soundToggle) {

  soundToggle.addEventListener(
    "click",
    () => {

      heroVideo.muted =
        !heroVideo.muted;


      if (heroVideo.muted) {

        soundToggle.textContent =
          "SOUND OFF";

        soundToggle.setAttribute(
          "aria-label",
          "Turn sound on"
        );

      } else {

        soundToggle.textContent =
          "SOUND ON";

        soundToggle.setAttribute(
          "aria-label",
          "Turn sound off"
        );

      }

    }
  );

}


/* =====================================================
   SMOOTH NAVIGATION
===================================================== */

document
  .querySelectorAll('a[href^="#"]')
  .forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetId =
        link.getAttribute("href");

      if (
        !targetId ||
        targetId === "#"
      ) {
        return;
      }


      const target =
        document.querySelector(targetId);


      if (!target) {
        return;
      }


      event.preventDefault();


      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });


/* =====================================================
   IMAGE FALLBACK
===================================================== */

const portrait =
  document.querySelector(".portrait-frame img");


if (portrait) {

  portrait.addEventListener(
    "error",
    () => {

      portrait.style.display = "none";

    }
  );

}


/* =====================================================
   CONTACT FORM UX
===================================================== */

const contactForm =
  document.querySelector(".contact-form");


if (contactForm) {

  contactForm.addEventListener(
    "submit",
    () => {

      const button =
        contactForm.querySelector(
          ".submit-button"
        );


      if (button) {

        button.innerHTML =
          "Sending enquiry <span>↗</span>";

      }

    }
  );

}


/* =====================================================
   HERO VIDEO AUTOPLAY FALLBACK
===================================================== */

if (heroVideo) {

  heroVideo.play().catch(() => {

    // Browser blocked autoplay.
    // Video will still work after user interaction.

  });

}
