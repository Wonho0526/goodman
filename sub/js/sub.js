/* ===== 서브페이지 공통 ===== */
const initSubCommon = () => {
  const initEnlargementTabs = () => {
    const subPage = document.querySelector(".sub-page");
    const subVisual = subPage?.querySelector(".sub-visual");

    if (!subPage || !subVisual || subPage.querySelector(".enlargement-tabs")) {
      return;
    }

    const tabs = [
      { href: "./enlargement.html", label: "음경확대" },
      { href: "./glans.html", label: "귀두확대" },
      { href: "./length.html", label: "길이연장" },
      { href: "./package.html", label: "복합수술 패키지" },
      { href: "./silicone.html", label: "실리콘보형물수술" },
    ];
    const currentFile = window.location.pathname.split("/").pop();
    const activeTab = tabs.find((tab) => tab.href.replace("./", "") === currentFile);

    if (!activeTab) {
      return;
    }

    const nav = document.createElement("nav");
    nav.className = "enlargement-tabs";
    nav.setAttribute("aria-label", "남성확대 메뉴");

    const inner = document.createElement("div");
    inner.className = "container inner enlargement-tabs__inner";

    tabs.forEach((tab) => {
      const link = document.createElement("a");
      link.href = tab.href;
      link.textContent = tab.label;

      if (tab === activeTab) {
        link.setAttribute("aria-current", "page");
      }

      inner.append(link);
    });

    nav.append(inner);
    subVisual.insertAdjacentElement("afterend", nav);
  };

  initEnlargementTabs();

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
};

/* ===== 페이지 전환: 의료진 소개 ===== */
const initStaffPage = () => {
  if (!document.querySelector(".staff-page")) {
    return;
  }
};

/* ===== 페이지 전환: 둘러보기 ===== */
const initTourPage = () => {
  if (!document.querySelector(".tour-page")) {
    return;
  }

  const tabButtons = Array.from(document.querySelectorAll("[data-tour-tab]"));
  const tabPanels = Array.from(document.querySelectorAll("[data-tour-panel]"));

  const activateTab = (targetName) => {
    tabButtons.forEach((button) => {
      const isActive = button.dataset.tourTab === targetName;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-selected", String(isActive));
    });

    tabPanels.forEach((panel) => {
      const isActive = panel.dataset.tourPanel === targetName;
      panel.classList.toggle("is-active", isActive);
      panel.hidden = !isActive;
    });
  };

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activateTab(button.dataset.tourTab);
    });
  });

  document.querySelectorAll("[data-gallery]").forEach((gallery) => {
    const slides = Array.from(gallery.querySelectorAll("[data-slide]"));
    const thumbs = Array.from(gallery.querySelectorAll("[data-thumb]"));
    const currentLabel = gallery.querySelector("[data-gallery-current]");
    const totalLabel = gallery.querySelector("[data-gallery-total]");
    const prevButton = gallery.querySelector("[data-gallery-prev]");
    const nextButton = gallery.querySelector("[data-gallery-next]");
    let currentIndex = 0;

    if (totalLabel) {
      totalLabel.textContent = String(slides.length).padStart(2, "0");
    }

    const setActiveSlide = (index) => {
      currentIndex = (index + slides.length) % slides.length;

      slides.forEach((slide, slideIndex) => {
        slide.classList.toggle("is-active", slideIndex === currentIndex);
      });

      thumbs.forEach((thumb, thumbIndex) => {
        const isActive = thumbIndex === currentIndex;
        thumb.classList.toggle("is-active", isActive);
        thumb.setAttribute("aria-current", isActive ? "true" : "false");

        if (isActive) {
          thumb.scrollIntoView({
            block: "nearest",
            inline: "nearest",
          });
        }
      });

      if (currentLabel) {
        currentLabel.textContent = String(currentIndex + 1).padStart(2, "0");
      }
    };

    thumbs.forEach((thumb) => {
      thumb.addEventListener("click", () => {
        setActiveSlide(Number(thumb.dataset.thumb));
      });
    });

    prevButton?.addEventListener("click", () => {
      setActiveSlide(currentIndex - 1);
    });

    nextButton?.addEventListener("click", () => {
      setActiveSlide(currentIndex + 1);
    });

    setActiveSlide(0);
  });
};

/* ===== 페이지 전환: 음경확대 ===== */
const initEnlargementPage = () => {
  if (!document.querySelector(".enlargement-page")) {
    return;
  }

  document.querySelectorAll("[data-why-slider]").forEach((slider) => {
    const track = slider.querySelector("[data-why-track]");
    const slides = Array.from(track?.querySelectorAll("article") || []);
    const progress = slider.querySelector("[data-why-progress]");

    if (!track || slides.length === 0) {
      return;
    }

    let isDragging = false;
    let dragStartX = 0;
    let dragStartScrollLeft = 0;

    const getActiveIndex = () => {
      const scrollLeft = track.scrollLeft;
      return slides.reduce((closestIndex, slide, index) => {
        const currentLeft = slide.offsetLeft - slides[0].offsetLeft;
        const closestLeft = slides[closestIndex].offsetLeft - slides[0].offsetLeft;
        const currentDistance = Math.abs(currentLeft - scrollLeft);
        const closestDistance = Math.abs(closestLeft - scrollLeft);
        return currentDistance < closestDistance ? index : closestIndex;
      }, 0);
    };

    const updateSliderState = () => {
      const maxScroll = track.scrollWidth - track.clientWidth;
      const activeIndex = getActiveIndex();

      if (progress) {
        progress.style.width = maxScroll <= 1 ? "100%" : `${((activeIndex + 1) / slides.length) * 100}%`;
      }
    };

    const endDrag = (event) => {
      if (!isDragging) {
        return;
      }

      isDragging = false;
      track.classList.remove("is-dragging");

      if (event?.pointerId !== undefined && track.hasPointerCapture?.(event.pointerId)) {
        track.releasePointerCapture(event.pointerId);
      }

      updateSliderState();
    };

    track.addEventListener("pointerdown", (event) => {
      if (event.button !== undefined && event.button !== 0) {
        return;
      }

      isDragging = true;
      dragStartX = event.clientX;
      dragStartScrollLeft = track.scrollLeft;
      track.classList.add("is-dragging");
      track.setPointerCapture?.(event.pointerId);
    });

    track.addEventListener("pointermove", (event) => {
      if (!isDragging) {
        return;
      }

      event.preventDefault();
      track.scrollLeft = dragStartScrollLeft - (event.clientX - dragStartX);
    });

    track.addEventListener("pointerup", endDrag);
    track.addEventListener("pointercancel", endDrag);
    track.addEventListener("lostpointercapture", endDrag);

    track.addEventListener("scroll", () => {
      window.requestAnimationFrame(updateSliderState);
    });

    window.addEventListener("resize", updateSliderState);
    updateSliderState();
  });
};

/* ===== 페이지 전환: 귀두확대 ===== */
const initGlansPage = () => {
  if (!document.querySelector(".glans-page")) {
    return;
  }
};

/* ===== 페이지 전환: 길이연장 ===== */
const initLengthPage = () => {
  if (!document.querySelector(".length-page")) {
    return;
  }
};

/* ===== 페이지 전환: 복합수술 패키지 ===== */
const initPackagePage = () => {
  if (!document.querySelector(".package-page")) {
    return;
  }
};

/* ===== 페이지 전환: 실리콘 보형물 수술 ===== */
const initSiliconePage = () => {
  if (!document.querySelector(".silicone-page")) {
    return;
  }
};

/* ===== 페이지 전환: 조루증이란 ===== */
const initPrematurePage = () => {
  if (!document.querySelector(".premature-page")) {
    return;
  }
};

initSubCommon();
initStaffPage();
initTourPage();
initEnlargementPage();
initGlansPage();
initLengthPage();
initPackagePage();
initSiliconePage();
initPrematurePage();
