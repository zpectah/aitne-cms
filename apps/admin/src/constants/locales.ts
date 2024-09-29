interface Locales {
  [p: string]: { label: string; format: { datetime: string; date: string; time: string } };
}

const locales: Locales = {
  en: {
    label: 'English',
    format: {
      datetime: 'YYYY-MM-DD hh:mm',
      date: 'YYYY-MM-DD',
      time: 'hh:mm',
    },
  },
  cs: {
    label: 'Čeština',
    format: {
      datetime: 'DD.MM.YYYY',
      date: 'DD.MM.YYYY hh:mm',
      time: 'hh:mm',
    },
  },
  sk: {
    label: 'Slovenčina',
    format: {
      datetime: 'DD.MM.YYYY',
      date: 'DD.MM.YYYY hh:mm',
      time: 'hh:mm',
    },
  },
};

export default locales;
