const cureCardPhotos = [
  {
    src: "./assets/cure-photo-01.png",
    alt: "정관 및 포경 수술 진료실",
  },
  {
    src: "./assets/cure-photo-02.png",
    alt: "남성 확대 상담",
  },
  {
    src: "./assets/cure-photo-03.png",
    alt: "발기부전 상담",
  },
  {
    src: "./assets/cure-photo-04.png",
    alt: "조루증 상담",
  },
  {
    src: "./assets/cure-photo-05.png",
    alt: "웨딩 검진 검사실",
  },
];

document.querySelectorAll(".cure-wheel .cure_box").forEach((card, index) => {
  const photo = cureCardPhotos[index];

  if (!photo || card.querySelector(".cure_box__visual")) {
    return;
  }

  const visual = document.createElement("figure");
  const image = document.createElement("img");

  visual.className = "cure_box__visual";
  image.src = photo.src;
  image.alt = photo.alt;
  image.loading = "lazy";
  image.decoding = "async";

  visual.appendChild(image);
  card.appendChild(visual);
});

if (window.Swiper) {
  new Swiper(".hero-slider", {
    effect: "fade",
    loop: true,
    speed: 700,
    autoplay: {
      delay: 5200,
      disableOnInteraction: false,
    },
    fadeEffect: {
      crossFade: true,
    },
    pagination: {
      el: ".hero-dots",
      bulletElement: "button",
      clickable: true,
    },
  });

  const treatmentCopySwiper = new Swiper(".treatment-copy-swiper", {
    effect: "fade",
    allowTouchMove: false,
    fadeEffect: {
      crossFade: true,
    },
  });

  new Swiper(".treatment-image-swiper", {
    slidesPerView: "auto",
    spaceBetween: 30,
    loop: true,
    speed: 550,
    slideToClickedSlide: true,
    autoplay: {
      delay: 4800,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".treatment-dots",
      bulletElement: "button",
      clickable: true,
    },
    navigation: {
      prevEl: ".treatment-control--prev",
      nextEl: ".treatment-control--next",
    },
    on: {
      slideChange(swiper) {
        treatmentCopySwiper.slideTo(swiper.realIndex);
      },
    },
  });

  new Swiper(".trust-slider", {
    slidesPerView: 1.1,
    spaceBetween: 50,
    loop: true,
    speed: 550,
    grabCursor: true,
    autoplay: {
      delay: 5200,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".trust-dots",
      bulletElement: "button",
      clickable: true,
    },
    navigation: {
      prevEl: ".trust-control--prev",
      nextEl: ".trust-control--next",
    },
  });

  new Swiper(".tour-slider", {
    slidesPerView: "auto",
    centeredSlides: true,
    spaceBetween: 60,
    loop: true,
    speed: 560,
    grabCursor: true,
    pagination: {
      el: ".tour-dots",
      bulletElement: "button",
      clickable: true,
    },
    breakpoints: {
      0: {
        spaceBetween: 18,
      },
      821: {
        spaceBetween: 30,
      },
      1200: {
        spaceBetween: 60,
      },
    },
  });
}

if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  const cureSection = document.querySelector(".cure-wheel");
  const cureCards = gsap.utils.toArray(".cure-wheel .cure_box");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (cureSection && cureCards.length > 1) {
    const cureMedia = gsap.matchMedia();

    cureMedia.add("(min-width: 821px)", () => {
      if (prefersReducedMotion.matches) {
        return;
      }

      cureSection.classList.add("is-layer-ready");

      gsap.set(cureCards, {
        zIndex: (index) => cureCards.length + index,
        yPercent: (index) => (index === 0 ? 0 : 108),
        scale: (index) => (index === 0 ? 1 : 0.96),
      });

      const cureTimeline = gsap.timeline({
        defaults: {
          ease: "none",
        },
        scrollTrigger: {
          trigger: cureSection,
          start: "top top",
          end: () => `+=${window.innerHeight * (cureCards.length - 1)}`,
          pin: true,
          scrub: 0.85,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      cureCards.forEach((card, index) => {
        if (index === 0) {
          return;
        }

        const previousCard = cureCards[index - 1];

        cureTimeline.to(
          card,
          {
            yPercent: 0,
            scale: 1,
            duration: 1,
          },
          index - 1
        );

        cureTimeline.to(
          previousCard,
          {
            yPercent: -8,
            scale: 0.92,
            duration: 1,
          },
          index - 1
        );
      });

      return () => {
        cureTimeline.kill();
        cureSection.classList.remove("is-layer-ready");
        gsap.set(cureCards, {
          clearProps: "all",
        });
      };
    });
  }
}

const privacyModal = document.querySelector("#privacy-modal");
const privacyOpenButton = document.querySelector("[data-privacy-open]");
const privacyCloseButtons = document.querySelectorAll("[data-privacy-close]");

if (privacyModal && privacyOpenButton) {
  const openPrivacyModal = () => {
    privacyModal.classList.add("is-open");
    privacyModal.setAttribute("aria-hidden", "false");
    privacyModal.querySelector("[data-privacy-close]")?.focus();
  };

  const closePrivacyModal = () => {
    privacyModal.classList.remove("is-open");
    privacyModal.setAttribute("aria-hidden", "true");
    privacyOpenButton.focus();
  };

  privacyOpenButton.addEventListener("click", openPrivacyModal);

  privacyCloseButtons.forEach((button) => {
    button.addEventListener("click", closePrivacyModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && privacyModal.classList.contains("is-open")) {
      closePrivacyModal();
    }
  });
}

const scrollTopButton = document.querySelector("[data-scroll-top]");

if (scrollTopButton) {
  scrollTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

const floatingConsult = document.querySelector(".floating-consult");
const consultToggleButton = document.querySelector("[data-consult-toggle]");
const mobileConsultMedia = window.matchMedia("(max-width: 820px)");

if (floatingConsult && consultToggleButton) {
  const consultFocusableFields = Array.from(
    floatingConsult.querySelectorAll("input, select, textarea, button")
  ).filter((field) => field !== consultToggleButton);

  const setConsultOpen = (isOpen) => {
    if (mobileConsultMedia.matches) {
      consultToggleButton.removeAttribute("tabindex");
    } else {
      consultToggleButton.setAttribute("tabindex", "-1");
    }

    floatingConsult.classList.toggle("is-open", isOpen);
    document.body.classList.toggle("consult-open", isOpen && mobileConsultMedia.matches);
    consultToggleButton.setAttribute("aria-expanded", String(isOpen));

    consultFocusableFields.forEach((field) => {
      if (mobileConsultMedia.matches && !isOpen) {
        field.setAttribute("tabindex", "-1");
      } else {
        field.removeAttribute("tabindex");
      }
    });
  };

  consultToggleButton.addEventListener("click", () => {
    if (!mobileConsultMedia.matches) {
      return;
    }

    setConsultOpen(!floatingConsult.classList.contains("is-open"));
  });

  mobileConsultMedia.addEventListener("change", () => {
    setConsultOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && floatingConsult.classList.contains("is-open")) {
      setConsultOpen(false);
    }
  });

  setConsultOpen(false);
}

document.querySelectorAll(".quick-menu a[href='#']").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
  });
});
