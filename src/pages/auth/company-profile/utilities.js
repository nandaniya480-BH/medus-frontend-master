export const companyProfileCategories = [
  {
    category: 'Unternehmensprofil',
    icon: 'fa-solid fa-hospital',
  },
  {
    category: 'Inserat Erstellen',
    icon: 'fa-solid fa-newspaper',
  },
  {
    category: 'Inserate & Personal Emfpehlungen',
    icon: 'fa-solid fa-rectangle-list',
  },
  {
    category: 'Kosten',
    icon: 'fa-solid fa-file-invoice',
  },
  {
    category: 'Mein Account',
    icon: 'fa-solid fa-gear',
  },
  {
    category: 'Support',
    icon: 'fa-solid fa-envelope',
  },
  // {
  //   category: 'Abmelden',
  //   icon: 'fa-solid fa-right-from-bracket',
  // },
];

export const companySizes = [
  { value: '1', label: '0-10' },
  { value: '2', label: '10-50' },
  { value: '3', label: '50-250' },
  { value: '4', label: '250+' },
];

export const formInitialState = {
  job_title: '',
  ort: '',
  name: '',
  workload_from: '0',
  workload_to: '100',
  position: '',
  work_time: '',
  work_experience: null,
  selected_work_experiences: null,
  job_category_id: '',
  job_subcategory_id: '',
  job_subcategories: [],
  is_subcategory_disabled: true,
  kanton: '',
  kantone_id: '',
  plz: '',
  plz_id: '',
  start_date: '',
  by_arrangement: 0,
  job_content: '',
  job_description: 'Job description',
  c_person_name: '',
  c_person_last_name: '',
  c_person_email: '',
  c_person_phone: '',
  c_person_fax: '',
  employer_description: '',
  job_file: '',
  job_url: '',
  apply_form_url: '',
  contract_type_id: null,
  contract_type: {},
  educations: [],
  selected_educations: null,
  languages: [],
  soft_skills: [],
  selected_soft_skills: [],
  prices: [],
  step_wizard: 1,
};
