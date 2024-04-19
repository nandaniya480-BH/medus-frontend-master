export const formInputs = {
  first_name: {
    key: 'first_name',
    leftIcon: 'fas fa-user',
    name: 'first_name',
    placeholder: 'Vorname (Pflichtfeld)',
    type: 'text',
    border: 'borderless',
  },
  last_name: {
    key: 'last_name',
    leftIcon: 'fas fa-user',
    name: 'last_name',
    placeholder: 'Nachname (Pflichtfeld)',
    type: 'text',
    border: 'borderless',
  },
  name: {
    key: 'name',
    leftIcon: 'fas fa-user',
    name: 'name',
    placeholder: 'Firmenname (Pflichtfeld)',
    type: 'text',
    border: 'borderless',
  },
  email: {
    key: 'email',
    leftIcon: 'fas fa-envelope',
    placeholder: 'Email',
    type: 'email',
    name: 'email',
    border: 'borderless',
  },
  password: {
    key: 'password',
    leftIcon: 'fas fa-lock',
    name: 'password',
    placeholder: 'Password',
    type: 'password',
    border: 'borderless',
    rightIcon: 'fas fa-eye',
  },
  confirm_password: {
    key: 'confirm_password',
    leftIcon: 'fas fa-lock',
    name: 'confirm_password',
    placeholder: 'Password bestätigen',
    type: 'password',
    border: 'borderless',
    rightIcon: 'fas fa-eye',
  },
};

export const formRules = {
  first_name: {
    required: {
      value: true,
      message: 'Bitte Vorname eingeben',
    },
    minLength: {
      value: 2,
      message: 'Vorname muss mindestens 2 Zeichen beinhalten',
    },
  },
  last_name: {
    required: {
      value: true,
      message: 'Bitte Nachname eingeben',
    },
    minLength: {
      value: 2,
      message: 'Nachname muss mindestens 2 Zeichen beinhalten',
    },
  },
  name: {
    required: {
      value: true,
      message: 'Bitte Firmennamen eingeben',
    },
    minLength: {
      value: 2,
      message: 'Firmenname muss mindestens 2 Zeichen beinhalten',
    },
  },
  email: {
    required: {
      value: true,
      message: 'Bitte E-mail eingeben',
    },
    pattern: {
      value: /^\S+@\S+$/i,
      message: 'Bitte geben Sie eine gültige E-mail Adresse ein',
    },
  },
  password: {
    required: {
      value: true,
      message: 'Bitte Passwort eingeben',
    },
    minLength: {
      value: 8,
      message: 'Das Passwort muss mindestens 8 Zeichen beinhalten',
    },
  },
  confirm_password: {
    required: {
      value: true,
      message: 'Bitte Passwort bestätigen',
    },
  },
};
