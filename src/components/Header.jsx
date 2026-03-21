import { useState, useEffect } from 'react';

export default function Header({ sections, activeIndex, onNavigate }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (index) => {
    onNavigate(index);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`site-header ${isScrolled ? 'site-header--scrolled' : ''}`}>
      <div className="site-header__container">
        <a 
          href="#" 
          className="site-header__logo"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick(0);
          }}
        >
          <img 
            src="/images/logo.png" 
            alt="Orchid Assembly" 
            className="site-header__logo-img"
          />
          <span className="site-header__logo-text">ORCHID ASSEMBLY</span>
        </a>

        <nav className={`site-header__nav ${isMobileMenuOpen ? 'site-header__nav--open' : ''}`}>
          {sections.map((section, index) => (
            <button
              key={section.id}
              className={`site-header__nav-item ${index === activeIndex ? 'site-header__nav-item--active' : ''}`}
              onClick={() => handleNavClick(index)}
            >
              {section.navLabel || section.topLabel || section.kicker}
            </button>
          ))}
        </nav>

        <button 
          className={`site-header__mobile-toggle ${isMobileMenuOpen ? 'site-header__mobile-toggle--open' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
