const sharedChrome = {
  brand: 'ORCHID ASSEMBLY',
  footer: '© 2025. orchid assembly. all rights reserved.',
  tagline: 'IMMERSIVE EXPERIENCES. MEASURABLE IMPACT.',
  topAccent: 'DECK',
  topLabel: 'credential //',
  year: '2026'
};

const sections = [
  {
    ...sharedChrome,
    ariaLabel: 'Brand statement section',
    artSlots: {
      brandMark: 'orchid logo',
      circuits: [
        { className: 'statement-art__circuit-line--1', label: 'connector placeholder 1' },
        { className: 'statement-art__circuit-line--2', label: 'connector placeholder 2' },
        { className: 'statement-art__circuit-line--3', label: 'connector placeholder 3' },
        { className: 'statement-art__circuit-line--4', label: 'connector placeholder 4' },
        { className: 'statement-art__circuit-line--5', label: 'connector placeholder 5' },
        { className: 'statement-art__circuit-line--6', label: 'connector placeholder 6' }
      ],
      logoAlt: 'Orchid Assembly logo',
      logoSrc: '/images/logo.png',
      showBadge: false,
      showCircuits: false,
      showCrosshair: false,
      placeholders: ['logo slot', 'icon slot', 'accent element slot']
    },
    headlineBottom: 'Measurable Impact.',
    headlineTop: 'Immersive Experiences.',
    id: 'immersive-impact',
    kicker: 'Brand story layer',
    note: 'These placeholder chips are where your real logo, icons, and ornamental assets can plug in later.',
    support:
      'The second section turns the reference into a reusable statement layout, with atmospheric gradients, a stylized placeholder mark, and active-state reveal choreography.',
    theme: 'orchid',
    variant: 'statement'
  },
  {
    ...sharedChrome,
    ariaLabel: 'Opening hero section',
    artSlots: {
      beams: [
        { className: 'hero-stage__beam--1', label: 'light beam placeholder 1' },
        { className: 'hero-stage__beam--2', label: 'light beam placeholder 2' },
        { className: 'hero-stage__beam--3', label: 'light beam placeholder 3' },
        { className: 'hero-stage__beam--4', label: 'light beam placeholder 4' },
        { className: 'hero-stage__beam--5', label: 'light beam placeholder 5' },
        { className: 'hero-stage__beam--6', label: 'light beam placeholder 6' },
        { className: 'hero-stage__beam--7', label: 'light beam placeholder 7' },
        { className: 'hero-stage__beam--8', label: 'light beam placeholder 8' }
      ],
      screens: [
        { className: 'hero-stage__screen--left', label: 'side screen placeholder' },
        { className: 'hero-stage__screen--center', label: 'main stage screen placeholder' },
        { className: 'hero-stage__screen--right', label: 'side screen placeholder' }
      ]
    },
    headlineBottom: 'BEGIN!',
    headlineTop: 'LET THE SHOW',
    id: 'show-begin',
    kicker: 'Opening sequence',
    prompt: 'Scroll to move through the credential deck',
    support:
      'A cinematic first section with coded beams, stage screens, and editable typography so later assets can drop into place without rebuilding the layout.',
    theme: 'stage',
    variant: 'hero'
  }
];

export default sections;
