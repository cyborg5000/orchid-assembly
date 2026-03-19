(() => {
  const matches = [
    { text: "Immersive Experiences, Measurable Impact.", className: "oa-hero-title" },
    { text: "IMMERSIVE EXPERIENCES, MEASURABLE IMPACT.", className: "oa-hero-kicker" },
    { text: "LET THE SHOW BEGIN!", className: "oa-stage-title" },
    { text: "ORCHID ASSEMBLY", className: "oa-wordmark" },
    { text: "20", className: "oa-year-chip" },
    { text: "26", className: "oa-year-chip" }
  ];

  const normalize = value => (value || "").replace(/\s+/g, " ").trim();

  const brandName = "Orchid Assembly";
  const brandLine = "Immersive Experiences, Measurable Impact.";
  const headerLogoAsset = "/header-logo.png";
  const brandTargets = new Set([
    normalize(brandName),
    normalize(brandName.toUpperCase()),
    normalize(brandLine),
    normalize(brandLine.toUpperCase())
  ]);

  const smallestMatch = (element, target) => {
    if (!(element instanceof HTMLElement)) {
      return false;
    }

    if (normalize(element.textContent) !== target) {
      return false;
    }

    return !Array.from(element.children).some(child => normalize(child.textContent) === target);
  };

  const findFirstSectionBrandLogo = scope => {
    const viewportCenter = window.innerWidth / 2;
    const candidates = Array.from(scope.querySelectorAll("section.rGeu6w, .oa-deck-section"))
      .filter(section => section instanceof HTMLElement)
      .flatMap(section => {
        const sectionTop = section.getBoundingClientRect().top;

        return Array.from(section.querySelectorAll("img")).map(image => {
          if (!(image instanceof HTMLImageElement)) {
            return null;
          }

          const rect = image.getBoundingClientRect();
          const src = image.currentSrc || image.getAttribute("src");

          return {
            image,
            rect,
            src,
            sectionTop,
            relativeTop: rect.top - sectionTop,
            centerDelta: Math.abs(rect.left + rect.width / 2 - viewportCenter)
          };
        });
      })
      .filter(Boolean)
      .filter(({ src, rect, relativeTop }) => {
        if (!src) {
          return false;
        }

        return (
          rect.width >= 180 &&
          rect.width <= 360 &&
          rect.height >= 24 &&
          rect.height <= 96 &&
          relativeTop >= 36 &&
          relativeTop <= 180 &&
          rect.left >= window.innerWidth * 0.24 &&
          rect.right <= window.innerWidth * 0.76
        );
      })
      .sort((a, b) => a.rect.top - b.rect.top || a.centerDelta - b.centerDelta || b.rect.width - a.rect.width);

    return candidates[0] || null;
  };

  const ensureNavHeader = scope => {
    const nav = scope.querySelector("nav.jDe9Eg, nav");

    if (!(nav instanceof HTMLElement)) {
      return;
    }

    nav.classList.add("oa-site-header");

    let links = nav.querySelector(".oa-nav-links");

    if (!(links instanceof HTMLElement)) {
      links = document.createElement("div");
      links.className = "oa-nav-links";

      Array.from(nav.children).forEach(child => {
        if (!(child instanceof HTMLElement)) {
          return;
        }

        if (child.classList.contains("oa-brand-lockup") || child === links) {
          return;
        }

        const isMenuItem = child.matches("a[role='menuitem']");

        if (!isMenuItem) {
          links.appendChild(child);
        }
      });

      nav.appendChild(links);
    }

    let leftSide = nav.querySelector(".oa-nav-side-left");

    if (!(leftSide instanceof HTMLElement)) {
      leftSide = document.createElement("div");
      leftSide.className = "oa-nav-side oa-nav-side-left";
      nav.insertBefore(leftSide, links);
    }

    let rightSide = nav.querySelector(".oa-nav-side-right");

    if (!(rightSide instanceof HTMLElement)) {
      rightSide = document.createElement("div");
      rightSide.className = "oa-nav-side oa-nav-side-right";
      nav.insertBefore(rightSide, links);
    }

    let brand = nav.querySelector(".oa-brand-lockup");

    if (!(brand instanceof HTMLElement)) {
      brand = document.createElement("div");
      brand.className = "oa-brand-lockup";
      nav.insertBefore(brand, links);
    }

    brand.classList.add("oa-brand-lockup--image");
    brand.classList.remove("oa-brand-lockup--pending");
    brand.innerHTML = [
      `<span class="oa-brand-rule oa-brand-rule-left" aria-hidden="true"></span>`,
      `<div class="oa-brand-logo-frame">`,
      `<img class="oa-brand-logo" src="${headerLogoAsset}" alt="Orchid Assembly" />`,
      `</div>`,
      `<span class="oa-brand-rule oa-brand-rule-right" aria-hidden="true"></span>`
    ].join("");

    const menuItems = Array.from(nav.querySelectorAll("a[role='menuitem']"));

    if (menuItems.length) {
      const lengths = menuItems.map(item => normalize(item.textContent).length);
      const total = lengths.reduce((sum, value) => sum + value, 0);
      let running = 0;
      let splitIndex = Math.max(1, Math.floor(menuItems.length / 2));

      for (let index = 0; index < lengths.length; index += 1) {
        running += lengths[index];

        if (running >= total / 2) {
          splitIndex = Math.min(menuItems.length - 1, index + 1);
          break;
        }
      }

      leftSide.replaceChildren(...menuItems.slice(0, splitIndex));
      rightSide.replaceChildren(...menuItems.slice(splitIndex));
    }

    if (!menuItems.some(item => item.getAttribute("aria-current") === "page") && menuItems[0]) {
      menuItems[0].setAttribute("aria-current", "page");
    }
  };

  const setupDeck = scope => {
    const scroller = scope.querySelector(".ZRRuDw");

    if (!(scroller instanceof HTMLElement)) {
      return;
    }

    scroller.classList.add("oa-scroll-shell");

    const sections = Array.from(scroller.querySelectorAll("section.rGeu6w"));

    if (!sections.length) {
      return;
    }

    sections.forEach((section, index) => {
      section.classList.add("oa-deck-section");
      section.dataset.oaSectionIndex = String(index);

      section.style.setProperty("display", "flex", "important");
      section.style.setProperty("align-items", "center", "important");
      section.style.setProperty("justify-content", "center", "important");
      section.style.setProperty("overflow", "hidden", "important");
      section.style.setProperty("background", "var(--oa-ink)", "important");

      if (section.firstElementChild instanceof HTMLElement) {
        section.firstElementChild.classList.add("oa-deck-frame");
        section.firstElementChild.style.setProperty("width", "100%", "important");
        section.firstElementChild.style.setProperty("margin", "auto 0", "important");
        section.firstElementChild.style.setProperty("position", "relative", "important");
      }
    });

    if (scroller.dataset.oaDeckReady === "true") {
      return;
    }

    scroller.dataset.oaDeckReady = "true";

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer:fine)");
    let locked = false;
    let unlockTimer = 0;

    const sectionOffsets = () =>
      sections.map(section =>
        Math.round(section.getBoundingClientRect().top - scroller.getBoundingClientRect().top + scroller.scrollTop)
      );

    const closestIndex = () => {
      const offsets = sectionOffsets();
      let bestIndex = 0;
      let bestDistance = Number.POSITIVE_INFINITY;

      offsets.forEach((offset, index) => {
        const distance = Math.abs(offset - scroller.scrollTop);

        if (distance < bestDistance) {
          bestDistance = distance;
          bestIndex = index;
        }
      });

      return bestIndex;
    };

    const jumpTo = index => {
      const offsets = sectionOffsets();
      const target = offsets[Math.max(0, Math.min(offsets.length - 1, index))];

      scroller.scrollTo({
        top: target,
        behavior: reduceMotion.matches ? "auto" : "smooth"
      });
    };

    scroller.addEventListener(
      "wheel",
      event => {
        if (!finePointer.matches) {
          return;
        }

        if (Math.abs(event.deltaY) < 4) {
          return;
        }

        event.preventDefault();

        if (locked) {
          return;
        }

        const current = closestIndex();
        const direction = event.deltaY > 0 ? 1 : -1;
        const next = Math.max(0, Math.min(sections.length - 1, current + direction));

        if (next === current) {
          return;
        }

        locked = true;
        jumpTo(next);
        window.clearTimeout(unlockTimer);
        unlockTimer = window.setTimeout(() => {
          locked = false;
        }, reduceMotion.matches ? 120 : 520);
      },
      { passive: false }
    );
  };

  const hideSectionBrandRepeats = scope => {
    scope.querySelectorAll("section.rGeu6w").forEach(section => {
      section.querySelectorAll("*").forEach(element => {
        if (!(element instanceof HTMLElement) || element.closest(".oa-brand-lockup")) {
          return;
        }

        const text = normalize(element.textContent);

        if (!brandTargets.has(text)) {
          return;
        }

        let target = element;

        while (
          target.parentElement &&
          target.parentElement !== section &&
          target.parentElement instanceof HTMLElement
        ) {
          const parent = target.parentElement;
          const parentRect = parent.getBoundingClientRect();
          const sectionRect = section.getBoundingClientRect();

          if (parentRect.height > 260 || parentRect.width > sectionRect.width * 0.95) {
            break;
          }

          target = parent;
        }

        target.classList.add("oa-hide-section-brand");
      });

      const sectionTop = section.getBoundingClientRect().top;
      const viewportCenter = window.innerWidth / 2;
      const imageCandidates = Array.from(section.querySelectorAll("img"))
        .map(image => {
          if (!(image instanceof HTMLImageElement)) {
            return null;
          }

          const rect = image.getBoundingClientRect();
          const src = image.currentSrc || image.getAttribute("src");

          return {
            image,
            rect,
            src,
            relativeTop: rect.top - sectionTop,
            centerDelta: Math.abs(rect.left + rect.width / 2 - viewportCenter)
          };
        })
        .filter(Boolean);

      const logo = imageCandidates
        .filter(({ src, rect, relativeTop }) => {
          if (!src) {
            return false;
          }

          return (
            rect.width >= 180 &&
            rect.width <= 360 &&
            rect.height >= 24 &&
            rect.height <= 96 &&
            relativeTop >= 36 &&
            relativeTop <= 180 &&
            rect.left >= window.innerWidth * 0.24 &&
            rect.right <= window.innerWidth * 0.76
          );
        })
        .sort((a, b) => a.centerDelta - b.centerDelta || b.rect.width - a.rect.width)[0];

      if (!logo) {
        return;
      }

      logo.image.classList.add("oa-suppress-section-brand-asset");

      const logoMidY = logo.rect.top + logo.rect.height / 2;

      imageCandidates
        .filter(({ image, rect }) => {
          if (image === logo.image) {
            return false;
          }

          return (
            rect.height <= 6 &&
            rect.width >= 100 &&
            rect.width <= 360 &&
            Math.abs(rect.top + rect.height / 2 - logoMidY) <= 20 &&
            (rect.right < logo.rect.left - 24 || rect.left > logo.rect.right + 24)
          );
        })
        .forEach(({ image }) => {
          image.classList.add("oa-suppress-section-brand-asset");
        });
    });
  };

  const annotate = () => {
    const scope = document.querySelector("#root") || document.body;

    if (!scope) {
      return;
    }

    const main = scope.querySelector("main");

    if (main instanceof HTMLElement) {
      main.classList.add("oa-main-shell");
    }

    scope.querySelectorAll("nav a[role='menuitem']").forEach((element, index) => {
      element.classList.add("oa-nav-link");
      element.style.setProperty("--oa-link-index", String(index));
    });

    scope.querySelectorAll("[role='switch']").forEach(element => {
      element.classList.add("oa-menu-toggle");
    });

    scope.querySelectorAll(".ZRRuDw").forEach(element => {
      element.classList.add("oa-scroll-shell");
    });

    ensureNavHeader(scope);
    setupDeck(scope);
    hideSectionBrandRepeats(scope);

    const elements = Array.from(scope.querySelectorAll("*"));

    matches.forEach(({ text, className }) => {
      const target = normalize(text);

      elements.forEach(element => {
        if (element.closest(".oa-brand-lockup")) {
          return;
        }

        if (smallestMatch(element, target)) {
          element.classList.add(className);
        }
      });
    });
  };

  const queueAnnotate = () => window.requestAnimationFrame(annotate);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", queueAnnotate, { once: true });
  } else {
    queueAnnotate();
  }

  window.addEventListener("load", queueAnnotate, { once: true });

  const observer = new MutationObserver(queueAnnotate);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.setTimeout(() => observer.disconnect(), 5000);
})();
