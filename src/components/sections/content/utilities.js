import jobImg from '../../../assets/img/company_placeholder.png';

export const carouselSettings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  initialSlide: 0,
  arrows: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

export const carouselDummyData = [
  {
    id: 'id-1',
    image: {
      image: jobImg,
      text: 'fasdf',
    },
    color: 'red',
    location: 'Zürich',
    date: '19-02-2023',
    employementType: 'Festanstellung',
    pensum: '80% - 100%',
    description:
      'Yesterday, this was an essential fabric and its news reader app Paper. It is design-focused wool called out...',
    title: 'Kontaktlinsenspezialist/in 100% für die Augenklinik 1',
    link: { to: '/job/1' },
  },
  {
    id: 'id-2',
    image: {
      image: jobImg,
      text: 'fasdf',
    },
    color: 'red',
    location: 'Zürich',
    date: '19-02-2023',
    employementType: 'Festanstellung',
    pensum: '80% - 100%',
    description:
      'Yesterday, this was an essential fabric and its news reader app Paper. It is design-focused wool called out...',
    title: 'Kontaktlinsenspezialist/in 100% für die Augenklinik',
    link: { to: '/job/1' },
  },
  {
    id: 'id-3',
    image: {
      image: jobImg,
      text: 'fasdf',
    },
    color: 'red',
    location: 'Zürich',
    date: '19-02-2023',
    employementType: 'Festanstellung',
    pensum: '80% - 100%',
    description:
      'Yesterday, this was an essential fabric and its news reader app Paper. It is design-focused wool called out...',
    title: 'Kontaktlinsenspezialist/in 100% für die Augenklinik',
    link: { to: '/job/1' },
  },
  {
    id: 'id-4',
    image: {
      image: jobImg,
      text: 'fasdf',
    },
    color: 'red',
    location: 'Zürich',
    date: '19-02-2023',
    employementType: 'Festanstellung',
    pensum: '80% - 100%',
    description:
      'Yesterday, this was an essential fabric and its news reader app Paper. It is design-focused wool called out...',
    title: 'Kontaktlinsenspezialist/in 100% für die Augenklinik',
    link: { to: '/job/1' },
  },
  {
    id: 'id-4',
    image: {
      image: jobImg,
      text: 'fasdf',
    },
    color: 'red',
    location: 'Zürich',
    date: '19-02-2023',
    employementType: 'Festanstellung',
    pensum: '80% - 100%',
    description:
      'Yesterday, this was an essential fabric and its news reader app Paper. It is design-focused wool called out...',
    title: 'Kontaktlinsenspezialist/in 100% für die Augenklinik',
    link: { to: '/job/1' },
  },
];
