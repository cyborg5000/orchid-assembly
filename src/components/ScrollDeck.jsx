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
    
    // Update URL hash without triggering scroll
    const sectionId = sections[nextIndex]?.id;
    if (sectionId) {
      window.history.pushState(null, '', `#${sectionId}`);
    }
    
    sectionNode.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }, [sections]);

  // Handle initial hash on mount
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const index = sections.findIndex(s => s.id === hash);
      if (index !== -1) {
        setTimeout(() => scrollToIndex(index), 100);
      }
    }
  }, []);

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

  // Use IntersectionObserver on window for reliable section detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            const nextIndex = Number(entry.target.dataset.index);
            if (!Number.isNaN(nextIndex) && nextIndex !== activeIndexRef.current) {
              setActiveIndex(nextIndex);
              const sectionId = sections[nextIndex]?.id;
              if (sectionId) {
                window.history.replaceState(null, '', `#${sectionId}`);
              }
            }
          }
        });
      },
      {
        threshold: [0.3, 0.5, 0.7]
      }
    );

    sectionRefs.current.forEach((sectionNode) => {
      if (sectionNode) {
        observer.observe(sectionNode);
      }
    });

    return () => observer.disconnect();
  }, [sections]);

  // Keyboard navigation
  useEffect(() => {
    const deckNode = deckRef.current;
    if (!deckNode) return;

    const onKeyDown = (event) => {
      // Don't hijack if user is in an input
      if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        return;
      }

      if (event.key === 'ArrowDown' || event.key === 'PageDown' || event.key === ' ') {
        event.preventDefault();
        scrollToIndex(activeIndexRef.current + 1);
      }

      if (event.key === 'ArrowUp' || event.key === 'PageUp') {
        event.preventDefault();
        scrollToIndex(activeIndexRef.current - 1);
      }

      if (event.key === 'Home') {
        event.preventDefault();
        scrollToIndex(0);
      }

      if (event.key === 'End') {
        event.preventDefault();
        scrollToIndex(sections.length - 1);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [scrollToIndex, sections.length]);

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
