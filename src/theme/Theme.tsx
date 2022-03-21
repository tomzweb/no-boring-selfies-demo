export const Theme = {
  fontSize: {
    small: 14,
    medium: 20,
    large: 30,
    larger: 40,
    max: 60,
  },
  fontWeight: {
    light: '300',
    medium: '500',
    bold: '900',
  },
  spacing: {
    tiny: 2,
    small: 5,
    medium: 10,
    large: 20,
    larger: 30,
  },
  borderRadius: {
    small: 5,
    medium: 10,
    large: 20,
    full: 9999,
  },
  colors: {
    white: '#ffffff',
    greyLightest: '#f0f0f0',
    greyLight: '#a4a4a4',
    grey: '#4e4e4e',
    greyDark: '#343434',
    greyDarkest: '#242424',
    black: '#000000',
    pink: '#fc9096',
    blue: '#54c8f3',
    blueDark: '#3c9aa5',
  },
};

export type FontWeight =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';
