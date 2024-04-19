export const footerProps = {
  title: 'medus.work',
  description: 'Das Stellenportal für Fachkräfte im Gesundheitswesen.',
  copyright: `Copyright © ${new Date().getFullYear()} medus.work`,
  contacts: [
    {
      icon: 'fa-solid fa-globe mt-1 mr-1',
      text: 'medus.work',
    },
    {
      icon: 'fa-solid fa-envelope mt-1 mr-1',
      text: 'info@medus.work',
    },
    {
      icon: 'fa-solid fa-location-pin mt-1 mr-1',
      text: 'Zürich',
    },
  ],
  socials: [],
  links: [
    {
      name: 'Nützliche Links',
      items: [
        {
          to: '/jobs',
          children: 'Jobs',
        },
        {
          to: '/login',
          children: 'Anmelden / Registrieren',
        },
        {
          to: '/about-us',
          children: 'Für Arbeitnehmer / Arbeitgeber',
        },
      ],
    },
    {
      name: 'ANDERE RESSOURCEN',
      items: [
        {
          to: '/about-us',
          children: 'Über medUS',
        },
        {
          to: '/tipps',
          children: 'Tipps',
        },
        {
          to: '/agb',
          children: 'AGB / Datenschutzerklärung',
        },
        {
          to: '/impressum',
          children: 'Impressum',
        },
      ],
    },
  ],
};
