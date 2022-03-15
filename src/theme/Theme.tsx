export const Theme = {
  fontSize: {
    small: 14,
    medium: 20,
    large: 36,
    larger: 48,
  },
  fontWeight: {
    light: '300',
    medium: '500',
    bold: '900',
  },
  spacing: {
    small: 5,
    medium: 10,
    large: 20,
  },
  borderRadius: {
    small: 5,
    medium: 10,
    large: 20,
  },
  colors: {
    greyLightest: '#dcdcdc',
    greyLight: '#a4a4a4',
    grey: '#4e4e4e',
    greyDark: '#343434',
    greyDarkest: '#242424',
    pink: '#ffb6bb',
    blue: '#54c8f3',
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
