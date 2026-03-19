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

        links.appendChild(child);
      });

      nav.appendChild(links);
    }

    let brand = nav.querySelector(".oa-brand-lockup");

    if (!(brand instanceof HTMLElement)) {
      brand = document.createElement("div");
      brand.className = "oa-brand-lockup";
      brand.innerHTML = [
        `<span class="oa-brand-rule oa-brand-rule-left" aria-hidden="true"></span>`,
        `<div class="oa-brand-stack">`,
        `<span class="oa-brand-name">${brandName}</span>`,
        `<span class="oa-brand-line">${brandLine}</span>`,
        `</div>`,
        `<span class="oa-brand-rule oa-brand-rule-right" aria-hidden="true"></span>`
      ].join("");
      nav.insertBefore(brand, links);
    }

    const menuItems = Array.from(nav.querySelectorAll("a[role='menuitem']"));

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

        if (Math.abs(event.deltaY) < 8) {
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
        }, reduceMotion.matches ? 120 : 700);
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

          if (parentRect.height > 180) {
            break;
          }

          target = parent;
        }

        target.classList.add("oa-hide-section-brand");
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
