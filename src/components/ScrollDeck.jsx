import { useEffect, useRef, useState, useCallback } from 'react';
import DeckSection from './DeckSection';
import Header from './Header';

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export default function ScrollDeck({ sections }) {
  const deckRef = useRef(null);
  const sectionRefs = useRef([]);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  activeIndexRef.current = activeIndex;

  const scrollToIndex = useCallback((index) => {
    const nextIndex = clamp(index, 0, sections.length - 1);
    const sectionNode = sectionRefs.current[nextIndex];

    if (!sectionNode) {
      return;
    }

    setActiveIndex(nextIndex);
    sectionNode.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }, [sections.length]);

  useEffect(() => {
    sectionRefs.current = sectionRefs.current.slice(0, sections.length);
  }, [sections.length]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const deckNode = deckRef.current;
    if (!deckNode) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

        if (!mostVisible) {
          return;
        }

        const nextIndex = Number(mostVisible.target.dataset.index);

        if (!Number.isNaN(nextIndex)) {
          setActiveIndex(nextIndex);
        }
      },
      {
        root: deckNode,
        threshold: [0.35, 0.5, 0.68, 0.86]
      }
    );

    sectionRefs.current.forEach((sectionNode) => {
      if (sectionNode) {
        observer.observe(sectionNode);
      }
    });

    return () => observer.disconnect();
  }, [sections]);

  useEffect(() => {
    const deckNode = deckRef.current;
    if (!deckNode || typeof window === 'undefined') {
      return undefined;
    }

    const finePointerQuery = window.matchMedia('(pointer: fine)');
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (!finePointerQuery.matches) {
      return undefined;
    }

    let locked = false;
    let unlockTimer = 0;

    const doScrollToIndex = (index) => {
      scrollToIndex(index);
    };

    const unlock = () => {
      locked = false;
    };

    const onWheel = (event) => {
      // Allow normal scrolling when not in snap mode or if near top/bottom
      if (Math.abs(event.deltaY) < 18) {
        return;
      }

      // Don't hijack scroll if user is navigating with nav
      if (event.target.closest('.site-header__nav')) {
        return;
      }

      event.preventDefault();

      if (locked) {
        return;
      }

      locked = true;

      const direction = event.deltaY > 0 ? 1 : -1;
      doScrollToIndex(activeIndexRef.current + direction);

      unlockTimer = window.setTimeout(unlock, reducedMotionQuery.matches ? 180 : 720);
    };

    const onKeyDown = (event) => {
      // Don't hijack if user is in an input
      if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        return;
      }

      if (event.key === 'ArrowDown' || event.key === 'PageDown' || event.key === ' ') {
        event.preventDefault();
        doScrollToIndex(activeIndexRef.current + 1);
      }

      if (event.key === 'ArrowUp' || event.key === 'PageUp') {
        event.preventDefault();
        doScrollToIndex(activeIndexRef.current - 1);
      }

      if (event.key === 'Home') {
        event.preventDefault();
        doScrollToIndex(0);
      }

      if (event.key === 'End') {
        event.preventDefault();
        doScrollToIndex(sections.length - 1);
      }
    };

    deckNode.addEventListener('wheel', onWheel, { passive: false });
    deckNode.addEventListener('keydown', onKeyDown);

    return () => {
      window.clearTimeout(unlockTimer);
      deckNode.removeEventListener('wheel', onWheel);
      deckNode.removeEventListener('keydown', onKeyDown);
    };
  }, [sections, scrollToIndex]);

  const registerSection = (index) => (node) => {
    sectionRefs.current[index] = node;
  };

  const handleScrollToTop = () => {
    scrollToIndex(0);
  };

  return (
    <div className="deck-shell">
      <Header 
        sections={sections} 
        activeIndex={activeIndex} 
        onNavigate={scrollToIndex}
      />

      <aside className="deck-progress" aria-hidden="true">
        <span className="deck-progress__value">{String(activeIndex + 1).padStart(2, '0')}</span>
        <span className="deck-progress__divider" />
        <span className="deck-progress__total">{String(sections.length).padStart(2, '0')}</span>
      </aside>

      <button 
        className={`scroll-to-top ${showScrollTop ? 'scroll-to-top--visible' : ''}`}
        onClick={handleScrollToTop}
        aria-label="Scroll to top"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>

      <main className="scroll-deck" ref={deckRef} tabIndex={0}>
        {sections.map((section, index) => (
          <DeckSection
            key={section.id}
            index={index}
            isActive={index === activeIndex}
            registerSection={registerSection(index)}
            section={section}
          />
        ))}
      </main>
    </div>
  );
}
