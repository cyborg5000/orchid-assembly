function formatYear(year) {
  if (year.length !== 4) {
    return [year];
  }

  return [year.slice(0, 2), year.slice(2)];
}

function HeroSection({ section }) {
  return (
    <div className="hero-grid">
      <div className="hero-stage" aria-hidden="true">
        <div className="hero-stage__lights">
          {section.artSlots.beams.map((beam) => (
            <span
              className={`hero-stage__beam ${beam.className}`}
              key={beam.label}
              title={beam.label}
            />
          ))}
        </div>

        <div className="hero-stage__rig" />

        <div className="hero-stage__screens">
          {section.artSlots.screens.map((screen) => (
            <div className={`hero-stage__screen ${screen.className}`} key={screen.label}>
              <span className="hero-stage__screen-label">{screen.label}</span>
            </div>
          ))}
        </div>

        <div className="hero-stage__apron" />
        <div className="hero-stage__runway" />
        <div className="hero-stage__crowd" />
      </div>

      <div className="hero-copy">
        <span className="hero-copy__label deck-animate">{section.kicker}</span>
        <h1 className="hero-copy__headline deck-animate deck-animate--delay-1">
          <span>{section.headlineTop}</span>
          <span className="hero-copy__headline-accent">{section.headlineBottom}</span>
        </h1>
        <p className="hero-copy__support deck-animate deck-animate--delay-2">{section.support}</p>
        <span className="hero-copy__prompt deck-animate deck-animate--delay-3">{section.prompt}</span>
      </div>
    </div>
  );
}

function StatementSection({ section }) {
  return (
    <div className="statement-layout">
      <div className="statement-art deck-animate">
        <div className="statement-art__halo" />
        {section.artSlots.showCrosshair !== false ? (
          <>
            <div className="statement-art__crosshair-horizontal" />
            <div className="statement-art__crosshair-vertical" />
          </>
        ) : null}

        <div
          className={`statement-art__mark${section.artSlots.showBadge === false ? ' statement-art__mark--clean' : ''}`}
          data-label={section.artSlots.brandMark}
        >
          <img
            alt={section.artSlots.logoAlt ?? section.artSlots.brandMark}
            className="statement-art__logo"
            src={section.artSlots.logoSrc}
          />

          {section.artSlots.showCircuits !== false ? (
            <div className="statement-art__circuit" aria-hidden="true">
              {section.artSlots.circuits.map((circuit) => (
                <span
                  className={`statement-art__circuit-line ${circuit.className}`}
                  key={circuit.label}
                  title={circuit.label}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <div className="statement-copy">
        <span className="statement-copy__lead deck-animate">{section.kicker}</span>
        <h2 className="statement-copy__headline deck-animate deck-animate--delay-1">
          <span>{section.headlineTop}</span>
          <span className="statement-copy__headline-emphasis">{section.headlineBottom}</span>
        </h2>
        <p className="statement-copy__support deck-animate deck-animate--delay-2">
          {section.support}
        </p>
        <p className="statement-copy__note deck-animate deck-animate--delay-2">{section.note}</p>
        <div className="statement-copy__slots deck-animate deck-animate--delay-3">
          {section.artSlots.placeholders.map((placeholder) => (
            <span className="statement-copy__slot" key={placeholder}>
              {placeholder}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function renderSectionContent(section) {
  if (section.variant === 'hero') {
    return <HeroSection section={section} />;
  }

  if (section.variant === 'statement') {
    return <StatementSection section={section} />;
  }

  return null;
}

export default function DeckSection({ index, isActive, registerSection, section }) {
  const yearParts = formatYear(section.year);

  return (
    <section
      aria-label={section.ariaLabel}
      className={`deck-section deck-section--${section.variant}${isActive ? ' is-active' : ''}`}
      data-index={index}
      ref={registerSection}
    >
      <div className="deck-section__backdrop" />
      <div className="deck-section__noise" />
      <div className="deck-section__vignette" />

      <div className="deck-section__frame">
        <header className="deck-section__chrome">
          <div className="deck-section__eyebrow deck-animate">
            <span className="deck-section__eyebrow-text">{section.topLabel}</span>
            <span className="deck-section__eyebrow-accent">{section.topAccent}</span>
          </div>

          <div className="deck-section__brand deck-animate deck-animate--delay-1">
            <div className="deck-section__brand-copy">
              <span className="deck-section__brand-title">{section.brand}</span>
              <span className="deck-section__tagline">{section.tagline}</span>
            </div>
          </div>

          <div className="deck-section__year deck-animate deck-animate--delay-2" aria-label={section.year}>
            {yearParts.map((part) => (
              <span key={part}>{part}</span>
            ))}
          </div>
        </header>

        <div className="deck-section__content">{renderSectionContent(section)}</div>

        <footer className="deck-section__footer deck-animate deck-animate--slow deck-animate--delay-3">
          <span className="deck-section__footer-mark" />
          <span>{section.footer}</span>
        </footer>
      </div>
    </section>
  );
}
