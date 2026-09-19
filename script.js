document.addEventListener("DOMContentLoaded", () => {


  /* =========================
     SCROLL REVEAL
  ========================== */

  const revealElements =
    document.querySelectorAll(".reveal");

  const revealObserver =
    new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

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



  /* =========================
     PROJECT FILTERS
  ========================== */

  const filters =
    document.querySelectorAll(".filter");

  const projects =
    document.querySelectorAll(".project-card");


  filters.forEach((filter) => {

    filter.addEventListener("click", () => {

      const category =
        filter.dataset.filter;


      filters.forEach((button) => {
        button.classList.remove("active");
      });

      filter.classList.add("active");


      projects.forEach((project) => {

        const projectCategory =
          project.dataset.category;


        if (
          category === "all" ||
          projectCategory === category
        ) {

          project.style.display = "";

          setTimeout(() => {
            project.style.opacity = "1";
            project.style.transform =
              "translateY(0)";
          }, 30);

        } else {

          project.style.opacity = "0";
          project.style.transform =
            "translateY(15px)";

          setTimeout(() => {
            project.style.display = "none";
          }, 250);

        }

      });

    });

  });



  /* =========================
     VIDEO MODAL
  ========================== */

  const videoModal =
    document.getElementById("videoModal");

  const videoFrame =
    document.getElementById("videoFrame");

  const videoTitle =
    document.getElementById("videoModalTitle");

  const closeButtons =
    document.querySelectorAll("[data-close-video]");


  projects.forEach((project) => {

    project.addEventListener("click", () => {

      const videoId =
        project.dataset.video;

      const title =
        project.dataset.title;


      if (!videoId) return;


      videoTitle.textContent = title;


      videoFrame.src =
        `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;


      videoModal.classList.add("active");

      videoModal.setAttribute(
        "aria-hidden",
        "false"
      );

      document.body.style.overflow = "hidden";

    });

  });


  const closeVideo = () => {

    videoModal.classList.remove("active");

    videoModal.setAttribute(
      "aria-hidden",
      "true"
    );

    videoFrame.src = "";

    document.body.style.overflow = "";

  };


  closeButtons.forEach((button) => {

    button.addEventListener(
      "click",
      closeVideo
    );

  });


  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "Escape" &&
        videoModal.classList.contains("active")
      ) {

        closeVideo();

      }

    }
  );



  /* =========================
     HERO VIDEO SOUND
  ========================== */

  const heroVideo =
    document.getElementById("heroVideo");

  const soundButton =
    document.getElementById("soundButton");


  if (heroVideo && soundButton) {

    soundButton.addEventListener(
      "click",
      () => {

        heroVideo.muted =
          !heroVideo.muted;


        if (heroVideo.muted) {

          soundButton.textContent =
            "SOUND OFF";

        } else {

          soundButton.textContent =
            "SOUND ON";

        }

      }
    );

  }



  /* =========================
     SKILL BAR ANIMATION
  ========================== */

  const skillBars =
    document.querySelectorAll(
      ".skill-bar span"
    );


  const skillObserver =
    new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (
            entry.isIntersecting
          ) {

            const bar =
              entry.target;

            const width =
              bar.dataset.width;


            setTimeout(() => {

              bar.style.width =
                `${width}%`;

            }, 150);


            observer.unobserve(bar);

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



  /* =========================
     SMOOTH NAVIGATION
  ========================== */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {

      link.addEventListener(
        "click",
        (event) => {

          const targetId =
            link.getAttribute("href");

          if (
            !targetId ||
            targetId === "#"
          ) {
            return;
          }


          const target =
            document.querySelector(
              targetId
            );


          if (target) {

            event.preventDefault();

            target.scrollIntoView({
              behavior: "smooth",
              block: "start"
            });

          }

        }
      );

    });



  /* =========================
     CURSOR GLOW
  ========================== */

  const cursorGlow =
    document.createElement("div");

  cursorGlow.className =
    "cursor-glow";

  document.body.appendChild(
    cursorGlow
  );


  document.addEventListener(
    "mousemove",
    (event) => {

      cursorGlow.style.left =
        `${event.clientX}px`;

      cursorGlow.style.top =
        `${event.clientY}px`;

    }
  );

});
