export const settings = {
  lang: {
    type: 'select',
    value: '',
    label: '',
    name: 'lang',
    options: [
      { value: 'it', displayValue: 'Ita' },
      { value: 'en', displayValue: 'Eng' }
    ]
  },
  theme: {
    type: 'select',
    value: '',
    label: 'Theme',
    name: 'theme',
    options: [
      { value: 'light', displayValue: 'Light' },
      { value: 'dark', displayValue: 'Dark' }
    ]
  },
  audio: {
    type: 'select',
    value: '',
    label: 'Alarm Sound',
    name: 'audio',
    options: [
      { value: 'water', displayValue: 'Water' },
      { value: 'buzzer', displayValue: 'Buzzer' },
      { value: 'digital', displayValue: 'Digital' },
      { value: 'mechanical', displayValue: 'Mechanical' }
    ]
  },
  showOnTitle: {
    type: 'checkbox',
    value: 'showOnTitle',
    label: 'Show timer on tab title?',
    name: 'showOnTitle',
    checked: true,
  }
}
